---
title: Temporary text limits
description: Learn why Roblox temporarily limits text features in a game, what players see while a limit is active, and how to lift it.
---

A **temporary text limit** restricts how often players can submit text in your game. Roblox applies one when it detects players holding conversations through a text surface other than `Class.TextChatService`, such as a sign or bulletin board. To lift the limit, find the surface players are using to converse, fix it, and publish a new version of your root place.

<Alert severity="warning">
All chat between players must go through `Class.TextChatService`. For the requirements that each type of text surface must meet, see [Chat system guidelines](../chat/guidelines.md).
</Alert>

## How limits work

A temporary text limit has the following behavior:

- It lasts a minimum of 24 hours, and it's lifted only after you publish an update to your game.
- It applies to the whole game, not to individual features. If players converse through one surface, every feature that shows player-submitted text to other players is limited.
- It can return. Roblox continues to monitor the game after the limit is lifted, and applies the limit again if it detects more conversations outside of `Class.TextChatService`.

When Roblox limits your game, notifications and a banner appear on the game's Creator Hub page, and the game owner receives an email.

## Player experience

While the limit is active, each player can submit text through any feature that [filters](text-filtering.md) their text and shows it to other players once every 60 seconds. If a player submits text again before 60 seconds pass, the text is replaced with ⏱️⏱️⏱️ until they can submit again.

For example, in a game where players hold signs, a player's sign shows the following:

<table>
<thead>
  <tr>
    <th>Timestamp</th>
    <th>Text the player submits</th>
    <th>Text the sign shows</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>1:00:00</td>
    <td>Hello</td>
    <td>Hello</td>
  </tr>
  <tr>
    <td>1:00:17</td>
    <td>I like rainy days</td>
    <td>⏱️⏱️⏱️</td>
  </tr>
  <tr>
    <td>1:02:00</td>
    <td>I like sunny days even more</td>
    <td>I like sunny days even more</td>
  </tr>
</tbody>
</table>

## Lift a limit

To lift a temporary text limit:

1. Find the surface players are using to converse. Check every feature where players enter text that other players can see, such as signs, license plates, bulletin boards, pet and item names, comments, trading windows, and admin tools. To locate these features in your code, search for calls to `Class.TextService:FilterStringAsync()|FilterStringAsync()`, `Class.Chat:FilterStringForBroadcast()|FilterStringForBroadcast()`, and `Class.Chat:FilterStringForPlayerAsync()|FilterStringForPlayerAsync()`.
2. Fix each surface you find:
   - If the feature is meant for communication, move it to a `Class.TextChannel` in `Class.TextChatService`.
   - If the feature isn't meant for communication, remove it, change it, or [rate-limit it](#rate-limit-text-surfaces) to one submission per player every 60 seconds.
3. Publish a new version of your root place.

Roblox lifts the limit in under 24 hours after you publish. The banner on your Creator Hub page disappears, and text features go back to normal.

If the limit returns, you might have missed a text surface. Repeat these steps and publish another new version.

## Rate-limit text surfaces

Rate-limiting a text surface to one submission per player every 60 seconds prevents players from holding a conversation through it, so Roblox doesn't detect it as chat. Combine the rate limit with [text filtering](text-filtering.md) before you display the text.

<Alert severity="warning">
Enforce the cooldown on the server. Players can bypass a timer that runs on the client.
</Alert>

The following `Class.Script` adds a 60-second cooldown to a sign. It assumes a `Class.RemoteEvent` named `SubmitSignText` in `Class.ReplicatedStorage` that the client fires with the player's text. For another example that applies the same cooldown to a community bulletin board, see [Rate-limited text inputs](../chat/examples/rate-limit-public-text-inputs.md).

```lua title="Server"
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TextService = game:GetService("TextService")

local COOLDOWN_SECONDS = 60
local lastSubmit = {}

local submitSignText = ReplicatedStorage:WaitForChild("SubmitSignText")

submitSignText.OnServerEvent:Connect(function(player, text)
	if typeof(text) ~= "string" or #text > 100 then
		return
	end

	-- Reject submissions during the cooldown
	local now = os.clock()
	local last = lastSubmit[player]
	if last and now - last < COOLDOWN_SECONDS then
		return
	end
	lastSubmit[player] = now

	local success, safeText = pcall(function()
		local filterResult = TextService:FilterStringAsync(text, player.UserId)
		return filterResult:GetNonChatStringForBroadcastAsync()
	end)
	if success then
		-- Display safeText on the sign
	end
end)

Players.PlayerRemoving:Connect(function(player)
	lastSubmit[player] = nil
end)
```

## Takedowns

Temporary text limits largely replace takedowns as the consequence for conversations outside of `Class.TextChatService`. However, Roblox can still take down games for repeated violations, or for openly promoting features such as uncontrolled or limitless chat.

If Roblox takes down your game for a `Class.TextChatService` violation:

1. Remove or rate-limit the surface that lets players converse outside of `Class.TextChatService`. For details, see [Lift a limit](#lift-a-limit).
2. Publish the change.
3. [Submit an appeal](https://www.roblox.com/report-appeals#/) that describes what you changed and how you're preventing future violations. Replies typically arrive within one to two weeks.

## FAQ

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does Roblox apply this limit to all games?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Roblox only applies temporary text limits to games where it detects players holding conversations through a surface other than `Class.TextChatService`.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Should I contact Support to lift the limit?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Follow the steps in [Lift a limit](#lift-a-limit). Support gives the same guidance: publish a new version of your game and wait 24 hours.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>After the limit is lifted, is my game approved going forward?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Detection is based on player behavior patterns, which change over time. Roblox continues to monitor your game and applies the limit again if it detects conversations outside of `Class.TextChatService`.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Why are unrelated text features in my game limited?</Typography>
</AccordionSummary>
<AccordionDetails>
Roblox detects and enforces limits at the game level, not the feature level. For example, players might use your sign feature to converse, but a playlist naming feature is also limited because the limit applies to the whole game.
</AccordionDetails>
</BaseAccordion>
