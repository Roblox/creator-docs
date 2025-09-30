---
title: Generate text
description: Use an LLM to generate text for NPC dialog, help systems, and more.
---

The text generation API lets you use a large language model (LLM) to generate text based on a system prompt from you and a user prompt from the player. The most common use of the API is for creating interactive non-player characters (NPCs).

For example, in a survival experience, your system prompt for a talking animal might be `"You are a very busy beaver. You end all statements by mentioning how you need to get back to work on your dam."`. Users could ask the beaver about water in the area, the size of a nearby forest, predators, etc.

The novelty of LLM responses can help create unique, delightful moments for players, but using the API effectively requires a bit of creativity and tuning. System prompts can be very extensive, so don't hesitate to include a long string with lots of detail.

## Generate text

Generating text from a user prompt generally requires at least two scripts: a server script to make the HTTP request and a client script to get user input and display the generated text. The following scripts are a minimalist example of this scenario that use a hard-coded user input and show the generated text in an NPC chat bubble.

For a more full-featured example, see the [demo experience](https://www.roblox.com/games/83607629882023/GenerateTextBaseplateTemplate). Click the **&ctdot;** button and **Edit in Studio**.

- The text generation API is an [Open Cloud API](../cloud/index.md), meaning that the request requires a [path](../cloud/reference/patterns.md), formed from your universe ID. You can find your universe ID in the overflow menu of the experience tile on the [Creator Hub](https://create.roblox.com/dashboard/creations).
- You must include the [Open Cloud client package](../production/promotion/experience-notifications.md#include-the-package) in your experience; the server script requires it.
- Requests are limited to 100 per second, per experience.
- The text generation API currently only supports RCC authentication. As a result, you must use [collaborative testing](../studio/testing-modes.md#collaborative-testing) to test the API within your experience.

```lua title="Client script"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TextChatService = game:GetService("TextChatService")
local ChatEvent = ReplicatedStorage:WaitForChild("ChatEvent")

ChatEvent.OnClientEvent:Connect(function(part, message)
  TextChatService:DisplayBubble(part, message)
  -- Optionally print for debug purposes
  print("LLM output: " .. message)
end)
```

```lua title="Server script in ServerScriptService"
-- Assumes the Open Cloud dev module is in ReplicatedStorage
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local oc = require(ReplicatedStorage.OpenCloud.V2)

local chatEvent = Instance.new("RemoteEvent")
chatEvent.Name = "ChatEvent"
chatEvent.Parent = ReplicatedStorage

-- Form the HTTP request
local requestLLM : oc.GenerateTextRequest = {
  path = oc:UniversePath("<your_universe_id>"),
  user_prompt = "Tell me about Roblox in under 200 characters.",
  system_prompt = "You're extremely polite.",
  context_token = "",
  max_tokens = 100,
  model= "default"
}

local resultLLM : oc.Result<oc.GenerateTextResponse> = oc:GenerateText(requestLLM)

local npc = workspace:WaitForChild("NPCDog") -- Replace with your NPC's name
local head = npc:WaitForChild("Head") -- Ensure your NPC has a Head part

-- Fire the event to display the chat bubble
chatEvent:FireAllClients(head, resultLLM.Response.generated_text)
```

## Text generation API reference

### Request parameters

| Parameter Name | Data Type | Description | Required |
| --- | --- | --- | --- |
| path | string | The path of the universe. Format: `universes/{universe_id}` | Yes |
| user_prompt | string | The prompt from the user that initiates the chat. This could be a question, statement, or command that the user wants the model to respond to. | No |
| system_prompt | string | The system prompt provides context to the model about its role, tone, or behavior during the conversation. This parameter can guide the model on how to respond, setting expectations like `"You are an assistant"` or `"Use a formal tone"`. | No |
| temperature | number | Controls the "creativity" or randomness of the model's responses. Values closer to 1 increase randomness, while values closer to 0 make the responses more focused and deterministic. Default: 0.8 | No |
| top_p | number | Helps the AI model narrow or expand the range of possible words to sample from while generating the next token. This setting narrows the token choices to only contain words that together make up a certain percentage of total likelihood (e.g. 90%). A lower `top_p` means the AI sticks to closer, more predictable choices, while a higher `top_p` opens the door to more diverse and creative responses. Default: 0.4 | No |
| max_tokens | number | The maximum number of tokens in the response generated by the model. This limits the length of the response, preventing overly long or incomplete answers. Default: 1000 | No |
| seed | number | Sets a fixed seed for the random number generator, allowing reproducible responses in cases where the same input parameters are used across multiple requests. By setting the same seed value, you can obtain identical results for debugging, testing, or evaluation purposes. | No |
| context_token | string | Prompt history context token. The context token contains a summarization of the previous prompt requests and responses in a conversation up to the current request. If no token is provided, a new token is generated and returned in the response. Providing a previously generated context token restores the conversation state into the current API request | No |
| model | string | The model and version to use to generate the response. Can be used to override the default model used for text generation. Currently, only the default model is available. | No |

### Response fields

| Field Name | Data Type | Description |
| --- | --- | --- |
| generated_text | string | The generated response. |
| context_token | string | A token containing the summarization of a previously passed context token and the current generated response. This token can be passed into subsequent requests to mantain the state of the current conversation. Subsequent requests generate new tokens with updated conversation state. Extracting the token and providing it maintains the ongoing conversation context. |
| model | string | The model and version that generated the response. |
