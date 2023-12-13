---
title: Legacy Chat System
description: Explains how to use and fork the deprecated Legacy Chat System for your experience on Roblox.
comments: |
  1. This guide is intentionally not available in the nav list, but still searchable for users who want to use the legacy chat system.
---

<Alert severity="error">
  This guide covers basics of the legacy chat system, which is deprecated and no longer onboarding new users in favor of `Class.TextChatService` with easier and more modern chat settings. If you are using the default chat system powered by `Class.TextChatService`, see <a href="../../chat/customizing-in-experience-text-chat.md">In-Experience Text Chat</a>.
</Alert>

You can set up the **Legacy Chat System** to enable users to quickly and easily communicate using text on different platforms.

## Hierarchy

The chat system uses the [client-server model](../../projects/client-server.md). Server-side chat module components [ChatChannel](../../chat/legacy/server-side-chat-modules.md#chatchannel) and [ChatSpeaker](../../chat/legacy/server-side-chat-modules.md#chatspeaker) management is handled by the [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) on the server, while the client is responsible for input and the display of messages. Communication between the server and clients is handled automatically using `Class.RemoteEvent|RemoteEvents`.

The `Class.Chat` engine service itself is the essential storage unit for the chat system: when a Roblox place loads (either in Client or in Studio when running or playing), all of the components of the chat system are automatically loaded into `Class.Chat` service if `Class.Chat.LoadDefaultChat` is true. Legacy Chat System loads the following hierarchy:

- **ChatModules** - This `Class.Folder` is a collection of modules that are required by the **ChatServiceRunner**. All of the contents of this folder are required by the script and are used to create custom behavior on the server.
- **ClientChatModules** - This folder contains various `Class.ModuleScript` s required by the **ChatScript**.
  - **CommandModules** - Contains modules used to implement client-side chat commands.
  - **MessageCreatorModules** - Contains modules used to handle and format messages.
  - **ChatConstants** - Contains constants shared by the server and client.
  - **ChatSettings** - Stores various settings to configure different aspects of the [ChatWindow](../../chat/legacy/client-side-chat-modules.md#chatwindow).
- **ChatLocalization** - Data structure that stores text translations.
- **ChatServiceRunner** - This `Class.Script` runs the server component of the chat. In general this does not need to be modified to create custom chat behavior and functionality. When the experience runs this gets cloned automatically into the `Class.ServerScriptService`.
  `InsertDefaultModules` with value true, adding a **ChatModules** folder to your experience will automatically disable whisper chat and colored names.
- **BubbleChat** - Displays user chat messages above their in-game avatar (if enabled).
- **ChatScript** - This `Class.LocalScript` runs the client component of the chat. Like ChatServiceRunner, this should not need to be modified to customize chat. When the game runs this gets cloned automatically to the `Class.StarterPlayerScripts` .

If a **ChatModules** Folder already exists in the `Class.Chat` engine service, the default chat modules (which implement whisper chat, colored names among other features) won't be inserted. To force insertion of default chat modules, insert a `Class.BoolValue` named **InsertDefaultModules** with `Class.BoolValue.Value` as `true` into the folder.

## Modifying (Forking) the Lua Chat System

To modify or customize the Chat system, you must first make a copy of the hierarchy above.

1. Run the experience using the **Play** button (F5).
2. **Select and copy** (Ctrl+C) the objects that were added to `Class.Chat`.
3. Stop the experience using the **Stop** button (Shift+F5).
4. Select `Class.Chat` and **paste-into** (Ctrl+Shift+V) the copied objects (they must be parented to `Class.Chat` as they were while the experience was running).

Make sure that `Class.Chat.LoadDefaultChat` is Enabled.

<Alert severity="warning">
When making a copy of ("forking") the current Lua Chat System version in this manner, your version will no longer change if the system is updated by Roblox. This gives you strict control over your experience's chat, but your version won't get bug fixes or other updates.
</Alert>

## Chat Workflow

Before making modules to customize the chat, it is important to understand the workflow that a chat message goes through. Along with sending text messages, there are various commands built into the chat system, so every message has to be checked to see if they need to be interpreted as a command or just a text message. Even text messages can be modified and filtered in the process.

After a user has focus in the chat input and enters a character, several checks are made right away on the Client. If the character is **Escape** the input box closes and no actions are taken. If the character is anything other than **Enter** the text gets passed through **In-Progress** command processors. These are used to evaluate the text to see if any action needs to be taken. For example, when a user starts whispering with the `/whisper` command, as soon as a user name has been entered after the command, the input box changes to indicate that the user is now entering in a whisper channel.

On the client side of chat, there are two types of processors: [In-Progress](#in-progress-commands) and [Completed](#completed-message-commands). **In-Progress** evaluates after every character has been typed, and **Completed** only evaluates when the user has finished typing and has hit **Enter**.

When the user finishes typing and hits **Enter** the text, their input is sent through several more command processors. If an **In-Progress** command made a custom chat state, the chat checks the state to see if a final command should be executed and if the message should continue on. If the message is allowed to continue, then the text is sent through another set of processors called **Completed** processors. If any of these processors return true, the message stops being sent. Otherwise, the message is sent to the server.

Once the message reaches the server, it goes through another set of command processors. Just like the "Completed" processors on the client, if any of these processors return true, then the message stops executing. Otherwise the message gets passed through a set of filters (including the default Roblox chat filter). Once all of this is done the message is sent to all of the Channels and appropriate Speakers.

## Server Modules

Modules put into ChatModules can be used for a variety of purposes. These modules can be used to manage chat channels and speakers, add filter and command functions, run chatbots, or anything else that needs to be handled on the server. To interact with the chat system, each module is passed a [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) object.

<Alert severity="info">
For spec on server-side chat module components such as **ChatSpeaker** and **ChatChannel**, see [Server-Side Chat Modules](../../chat/legacy/server-side-chat-modules.md).
</Alert>

When the **ChatServiceRunner** starts up, it requires each module inside of **ChatModules**. It expects each module to return a function as it then calls each of the modules in turn, passing in it's [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) object to each function. Regardless of what the module is intended to do (running a bot, adding a filter function, etc), it needs to follow this form in order to work.

```lua title='Sample Module Framework'
local function Run(ChatService)
	-- Code goes here
end

return Run
```

### Adding Channels

One of the simplest things a **ChatModule** can do is to manage Channels. Channel objects can be created with the AddChannel function of [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice). Note that the channel object only needs to be used when calling members of that channel (such as its properties and functions). When referring to channels from the context of [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) or [ChatSpeakers](../../chat/legacy/server-side-chat-modules.md#chatspeaker), the channel's name is used to reference it.

```lua
local function Run(ChatService)
	local myChannel = ChatService:AddChannel("MyChannel")
end

return Run
```

### Basic Channel Configuration

Channels have several properties that can be used to slightly modify them. For example, this module creates a channel and sets the Welcome Message and causes users to automatically join the channel when they enter the experience.

```lua
local function Run(ChatService)
	local myChannel = ChatService:AddChannel("MyChannel")

-- Set the message that is shown when a user joins the channel
	myChannel.WelcomeMessage = "Welcome to my channel!"
	-- Causes players to automatically join the channel when they enter the game
	myChannel.AutoJoin = true
end

return Run
```

### Channel Events

Channels have several events that can be subscribed to. These events fire when a [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage) is posted to the Channel, when a [ChatSpeaker](../../chat/legacy/server-side-chat-modules.md#chatspeaker) leaves or joins, or when a Speaker is muted or unmuted. For example, this module will create a Channel with the name `MyChannel`. Whenever a speaker joins or leaves the channel, a system message will be sent to all of the speakers in the channel informing them of the event.

```lua
local function Run(ChatService)
	local myChannel = ChatService:AddChannel("MyChannel")

	local function onSpeakerJoined(speakerName)
		myChannel:SendSystemMessage(speakerName .. " has joined the channel.")
	end

	local function onSpeakerLeft(speakerName)
		myChannel:SendSystemMessage(speakerName .. " has left the channel.")
	end

	myChannel.SpeakerJoined:Connect(onSpeakerJoined)
	myChannel.SpeakerLeft:Connect(onSpeakerLeft)
end

return Run
```

### Command Functions

Another powerful thing that **ChatModules** can do are chat commands. When a message is sent to the server, the chat will send the message through each command function that has been registered to the [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) and relevant Channel. These functions are sent the speaker, message, and channel that the message is being sent to. The function can take any action that it needs to and then return true or false. If the function returns true, then the message stops being processed by the chat system. It will not be sent to any more command functions nor will it be displayed in the chat window. If the function returns false, then the message continues through all of the other command functions. If none of the command functions returns true, the message will then be sent through filters and then will be displayed.

Command Functions are often used to implement [Admin Commands](../../chat/legacy/admin-commands.md), which are text commands that certain users can use to manipulate the experience state through specific text said in the chat.

In this example a **ChatModule** is used to create a `Class.Part` if a user types `/part` in the chat. Note that this function returns true if a Part was created which will stop the message from proceeding and no message will be displayed. If a part is not created, this function needs to return false so that the message can continue working through the system.

```lua
local function Run(ChatService)
	local function createPart(speakerName, message, channelName)
		if string.sub(message, 1, 5) == "/part" then
			local newPart = Instance.new("Part")
			newPart.Parent = workspace
			return true
		end
		return false
	end

	ChatService:RegisterProcessCommandsFunction("createPart", createPart)
end

return Run
```

Both [ChatChannels](../../chat/legacy/server-side-chat-modules.md#chatchannel) and [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) itself can have chat commands. **ChatService** command processors will run on every message that is sent to the server, while Channel commands will only run if the message was sent to the channel the command is registered to.

### Filter Functions

Messages that are not stopped by a Command Function will go through all of the filter functions that are registered to the [ChatService](../../chat/legacy/server-side-chat-modules.md#chatservice) and relevant Channels. Each filter function is passed the speaker, message object, and channel name. Any changes made to the message object will persist and each following filter function will see the updated message. Note that unlike a command function, filter functions do not need to return a value.

In this example, a simple filter function is registered to make every message appear in lowercase.

```lua
local function Run(ChatService)
	local function makeLowercase(sender, messageObject, channelName)
		messageObject.Message = string.lower(messageObject.Message)
	end

	ChatService:RegisterFilterMessageFunction("makeLowercase", makeLowercase)
end

return Run
```

## Client Modules

Modules put into ClientChatModules can be used to make custom behavior for clients. These modules are divided into two different folders: CommandModules and MessageCreatorModules.

<Alert severity="info">
For spec on client-side chat module components such as **ChatWindow** and **ChatBar**, see [Client-Side Chat Modules](../../chat/legacy/client-side-chat-modules.md).
</Alert>

### Command Modules

CommandModules work very similarly to modules on the server that register [Command functions](#command-functions). These modules define functions that will fire after the user has entered in text. That text can be read and the command can either let the message through to the server or stop the progress of the message. The main difference is that CommandModules can be evaluated either when the user has hit **Enter**, or after every character as they are typed. Commands that are evaluated at the end of the message are tagged with **COMPLETED_MESSAGE_PROCESSOR** , commands that are evaluated after each character are tagged with **IN_PROGRESS_MESSAGE_PROCESSOR** .

In both types of commands, the module must return a dictionary that says what type of processor the command should use, and what function to execute when the processor is called. For example, a **Completed Message Processor** should take the form:

```lua
local util = require(script.Parent:WaitForChild("Util"))

function ProcessMessage(message, ChatWindow, ChatSettings)

end

return {
	[util.KEY_COMMAND_PROCESSOR_TYPE] = util.COMPLETED_MESSAGE_PROCESSOR,
	[util.KEY_PROCESSOR_FUNCTION] = ProcessMessage
}
```

Note that the **KEY_COMMAND_PROCESSOR_TYPE** enum is defined in the **Util** `Class.ModuleScript` inside of the **CommandModules** folder. It is recommended to always require this module in
Command Modules.

#### Completed Message Commands

Completed Message Commands are evaluated when the user has finished typing and has hit "Enter". The function of the processor is passed the [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage) object, the client's [ChatWindow](../../chat/legacy/client-side-chat-modules.md#chatwindow) , and the [ChatSettings](../../chat/legacy/client-side-chat-modules.md#chatsettings) table. If the function returns true, then the message stops being processed and will not be sent to the server. Otherwise it will be sent through all of the other processors and eventually to the server if none of the other processors stop it.

For example, the following processor will remove the oldest message in the current channel if the user enters the command `/last`.

```lua
local util = require(script.Parent:WaitForChild("Util"))

function ProcessMessage(message, ChatWindow, ChatSettings)
	if string.sub(message, 1, 5) == "/last" then
		local currentChannel = ChatWindow:GetCurrentChannel()
		if currentChannel then
			currentChannel:RemoveLastMessageFromChannel()
		end
		return true
	end
	return false
end

return {
	[util.KEY_COMMAND_PROCESSOR_TYPE] = util.COMPLETED_MESSAGE_PROCESSOR,
	[util.KEY_PROCESSOR_FUNCTION] = ProcessMessage
}
```

#### In-Progress Commands

**In-progress commands** are evaluated every time a user types a character into the chat input. For example, the following code plays a clack after every keypress to make it sound like the user is typing on a typewriter:

```lua
local util = require(script.Parent:WaitForChild("Util"))
local keyEffect = Instance.new("Sound")
keyEffect.SoundId = "rbxassetid://12221976"
keyEffect.Parent = script

function ProcessMessage(message, ChatWindow, ChatBar, ChatSettings)
	keyEffect:Play()
end

return {
	[util.KEY_COMMAND_PROCESSOR_TYPE] = util.IN_PROGRESS_MESSAGE_PROCESSOR,
	[util.KEY_PROCESSOR_FUNCTION] = ProcessMessage
}
```

##### Custom State

In Progress Commands are often used to make a custom state for the chat to send messages to specific users instead of just the current channel. For example, the Whisper and Team chat systems use In Progress Commands to see if the user has typed "/whisper" or "/team" respectively, and will send the finished message to only the appropriate users.

A custom chat state overrides all other commands, either in-progress or completed. It will remain this way until ChatBar.ResetCustomState is called, which will remove the custom state and revert back to normal chat behavior.

A custom state is expected to be table with the following functions:

- **TextUpdated** - called when the text in the input box changes.
- **GetMessage** - called after the user has finished entering the message and hits **Enter**. This function is expected to return a string.
- **ProcessCompletedMessage** - called as the message is being processed. A custom state processor will always fire before the Completed Message processors. Like other processors this function should return true if the message should stop being sent, otherwise it should return false.
- **Destroy** - called after the message has been sent. Should be used to clean up anything setup by the custom state

In order to use a Custom State, the **ProcessMessage** function of the Command Module must return the state. A basic custom state would take the following form:

```lua
local util = require(script.Parent:WaitForChild("Util"))

local oneLineState = {}
oneLineState.__index = oneLineState

function oneLineState:TextUpdated()
	local text = self.TextBox.Text
	local length = string.len(text)
	if length > 20 then
		local chopLength = length - 20
		local addToPrefix = string.sub(text, 1, chopLength)
		self.Prefix = self.Prefix .. addToPrefix
		self.TextBox.Text = string.sub(text, chopLength + 1)
	end
end

function oneLineState:GetMessage()
	local fullString = self.Prefix .. self.TextBox.Text
	return fullString
end

function oneLineState:ProcessCompletedMessage()
	return false
end

function oneLineState:Destroy()
	self.Destroyed = true
end

function oneLineState.new(ChatWindow, ChatBar, ChatSettings)
	local obj = {}
	setmetatable(obj, oneLineState)

	obj.Destroyed = false
	obj.ChatWindow = ChatWindow
	obj.ChatBar = ChatBar
	obj.ChatSettings = ChatSettings
	obj.TextBox = ChatBar:GetTextBox()
	obj.MessageModeLabel = ChatBar:GetMessageModeTextLabel()

	obj.Prefix = ""

	return obj
end

local function ProcessMessage(message, ChatWindow, ChatBar, ChatSettings)
	return oneLineState.new(ChatWindow, ChatBar, ChatSettings)
end

return {
	[util.KEY_COMMAND_PROCESSOR_TYPE] = util.IN_PROGRESS_MESSAGE_PROCESSOR,
	[util.KEY_PROCESSOR_FUNCTION] = ProcessMessage
}
```

One of the chief advantages of using a custom state is that a module can edit the chat bar and its containing text while the user is typing both in terms of function and looks, and then easily reset it afterwards (once a message is sent a custom state is automatically removed and everything is reset back to normal). For example, this code sets up a custom state that only allows 20 characters to be shown in the textbox at a time. If the user keeps typing, characters at the beginning of the string are temporarily removed. When the user sends the message, all of the removed characters are added back to the message.

```lua
local util = require(script.Parent:WaitForChild("Util"))

local oneLineState = {}
oneLineState.__index = oneLineState

function oneLineState:TextUpdated()
	local text = self.TextBox.Text
	local length = string.len(text)
	if length > 20 then
		local chopLength = length - 20
		local addToPrefix = string.sub(text, 1, chopLength)
		self.Prefix = self.Prefix .. addToPrefix
		self.TextBox.Text = string.sub(text, chopLength + 1)
	end
end

function oneLineState:GetMessage()
	local fullString = self.Prefix .. self.TextBox.Text
	return fullString
end

function oneLineState:ProcessCompletedMessage()
	return false
end

function oneLineState:Destroy()
	self.Destroyed = true
end

function oneLineState.new(ChatWindow, ChatBar, ChatSettings)
	local obj = {}
	setmetatable(obj, oneLineState)

	obj.Destroyed = false
	obj.ChatWindow = ChatWindow
	obj.ChatBar = ChatBar
	obj.ChatSettings = ChatSettings
	obj.TextBox = ChatBar:GetTextBox()
	obj.MessageModeLabel = ChatBar:GetMessageModeTextLabel()

	obj.Prefix = ""

	return obj
end

local function ProcessMessage(message, ChatWindow, ChatBar, ChatSettings)
	return oneLineState.new(ChatWindow, ChatBar, ChatSettings)
end

return {
	[util.KEY_COMMAND_PROCESSOR_TYPE] = util.IN_PROGRESS_MESSAGE_PROCESSOR,
	[util.KEY_PROCESSOR_FUNCTION] = ProcessMessage
}
```

As mentioned before, once a message has been sent any custom state is removed and the chat is restored to normal. If it is needed to reset a custom state before sending the message, the state can be reset with `ChatBar:ResetCustomState()`. Note that this will remove focus from the chat bar's text box as well.

### Message Creator Modules

The other type of module that can be used on in the client component of the chat is a Message Creator module. This type of module is used to create the GUI elements in the chat window to display the message. Each type of Message Creator defines a new message type so different messages can be created with different formatting. Moreover, more GUI elements can be added to the display of messages this way which allows for images, buttons, etc.

Message Modules require setup in several different locations. For each message type, there must be a ModuleScript inside of MessageCreatorModules. Also, the ModuleScript ChatConstants needs to be edited to include the new message type. Last, Message Creators are only used if a server component of chat creates a new message with the given message type. This means that typically a **ChatModule** is also created (or an existing one edited) to use a new Message Creator.

To illustrate the structure and setup of a Message Creator, the following example will go through making a bot that says the time every 5 seconds, and the message that is sent gets a red background.

To start, the **ChatConstants** `Class.ModuleScript` needs to add a field for the new type of message.

```lua
-- ChatConstants
local module = {}

---[[ Message Types ]]
module.MessageTypeDefault = "Message"
module.MessageTypeSystem = "System"
module.MessageTypeMeCommand = "MeCommand"
module.MessageTypeWelcome = "Welcome"
module.MessageTypeSetCore = "SetCore"
module.MessageTypeWhisper = "Whisper"
module.MessageTypeTime = "Time"

module.MajorVersion = 0
module.MinorVersion = 2

return module
```

The bot itself is created in a new **ChatModule** on the server. Note that a filter function is used to add the new message type to the messages that the bot sends.

```lua
-- New ModuleScript to be placed in ChatModules
local Chat = game:GetService("Chat")
local ReplicatedModules = Chat:WaitForChild("ClientChatModules")
local ChatConstants = require(ReplicatedModules:WaitForChild("ChatConstants"))

local function Run(ChatService)
	local timeBot = ChatService:AddSpeaker("TimeBot")
	timeBot:JoinChannel("All")

	local function addMessageType(speaker, messageObject, channelName)
		if speaker == "TimeBot" then
			messageObject.MessageType = ChatConstants.MessageTypeTime
		end
	end

	ChatService:RegisterFilterMessageFunction("TimeBotFilter", addMessageType)

	task.spawn(function()
		while task.wait(5) do
			timeBot:SayMessage("The current time is: " .. os.time(), "All", {})
		end
	end)
end

return Run
```

Last, a Message Creator module must be made. This module must return a dictionary with two elements: the type of the message, indexed with **KEY_MESSAGE_TYPE** , and the function to call when creating the message GUI elements, indexed with **KEY_CREATOR_FUNCTION** .

The function stored by **KEY_CREATOR_FUNCTION** needs to return a dictionary with several components. First, it needs to include a `Class.Frame` and `Class.TextLabel`, which will be displayed in the chat window. These can be created with the function `util:CreateBaseMessage`. The dictionary also needs to include a function to run if the text of the message updates. When messages first appear in the client, they have blank placeholder text while the message is being processed and filtered, so message objects like this need to handle what happens when they get a call to update. Next, the dictionary needs to include a function to determine the height of the frame. This function often calls the `util:GetMessageHeight` function. Last, the dictionary needs to include several functions that define how the elements should fade when the window fades. There is another utility function for this: util:CreateFadeFunctions.

```lua
-- new ModuleScript to be included in MessageCreatorModules
local messageCreatorModules = script.Parent
local util = require(messageCreatorModules:WaitForChild("Util"))
local clientChatModules = messageCreatorModules.Parent

local ChatSettings = require(clientChatModules:WaitForChild("ChatSettings"))
local ChatConstants = require(clientChatModules:WaitForChild("ChatConstants"))


local function CreateMessageLabel(messageData, channelName)
	-- Create the GUI objects for the Frame and TextLabel to hold the message
	local BaseFrame, BaseMessage = util:CreateBaseMessage("", ChatSettings.DefaultFont, ChatSettings.ChatWindowTextSize, ChatSettings.DefaultMessageColor)

	-- Change the background of the Frame to red
	BaseFrame.BackgroundColor3 = Color3.new(1,0,0)
	BaseFrame.BackgroundTransparency = 0

	-- Handle updating placeholder message text
	local function UpdateTextFunction(messageObject)
        if messageObject.IsFiltered then
		   BaseMessage.Text = messageObject.Message
        end
	end
	UpdateTextFunction(messageData)

	-- Use util function to determine height of frame
	local function GetHeightFunction(xSize)
		return util:GetMessageHeight(BaseMessage, BaseFrame, xSize)
	end

	-- Create fade functions that are called when the chat window fades
	local FadeParameters = {}
	FadeParameters[BaseMessage] = {
		TextTransparency = {FadedIn = 0, FadedOut = 1},
		TextStrokeTransparency = {FadedIn = 0.75, FadedOut = 1}
	}
	local FadeInFunction, FadeOutFunction, UpdateAnimFunction = util:CreateFadeFunctions(FadeParameters)

	-- Return dictionary that defines the message label
	return {
		[util.KEY_BASE_FRAME] = BaseFrame,
		[util.KEY_BASE_MESSAGE] = BaseMessage,
		[util.KEY_UPDATE_TEXT_FUNC] = UpdateTextFunction,
		[util.KEY_GET_HEIGHT] = GetHeightFunction,
		[util.KEY_FADE_IN] = FadeInFunction,
		[util.KEY_FADE_OUT] = FadeOutFunction,
		[util.KEY_UPDATE_ANIMATION] = UpdateAnimFunction
	}
end

return {
	[util.KEY_MESSAGE_TYPE] = ChatConstants.MessageTypeTime,
	[util.KEY_CREATOR_FUNCTION] = CreateMessageLabel
}
```
