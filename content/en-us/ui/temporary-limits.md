---
title: Temporary text limits
description: Learn why Roblox temporarily limits text features in a game, what players see while a limit is active, and how to lift it.
---

Roblox temporarily limits text features in a game when it detects players holding conversations through a surface other than `Class.TextChatService`. This page explains how to tell if your game has been limited, what players see, and how to get the limit lifted.

<Alert severity="warning">
Any chat between players must go through `Class.TextChatService`. For the requirements that each type of text surface must meet, see [Chat system guidelines](../chat/guidelines.md).
</Alert>

## How temporary limits work

When Roblox detects conversations through a surface other than `Class.TextChatService`, it temporarily limits text features in the game. The limit lasts a minimum of 24 hours and requires a game update before Roblox lifts it. The limit can return if Roblox continues to observe players holding conversations outside of `Class.TextChatService`.

## Identify a temporary limit

When Roblox limits your game:

- Notifications and banners about the limit appear on the game's Creator Hub page.
- The game owner receives an email.

While the limit is active, any feature that collects text from players, passes it through [text filtering](./text-filtering.md), and shows that text to other players is rate-limited to one submission per player every 60 seconds.

## Player experience

If your game is limited, players who use text features more than once per 60 seconds see their text replaced with ⏱️⏱️⏱️ until they can submit text again.

For example, in a game where players hold signs:

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

## Lift a temporary limit

To lift a temporary text limit:

1. Find the surface players are using to hold conversations. Check every feature where players enter text that other players can see, such as signs, license plates, bulletin boards, pet and item names, comments, item trading windows, and admin tools.
2. Decide how to fix each surface:
   - If the feature is built for communication, send all conversations through `Class.TextChatService` in a `Class.TextChannel`. See `Class.TextChatService`.
   - If the feature isn't meant for communication, continue with the next steps.
3. Search your code for calls to `Class.TextService:FilterStringAsync()|FilterStringAsync()`, `Class.Chat:FilterStringForBroadcast()|FilterStringForBroadcast()`, or `Class.Chat:FilterStringForPlayerAsync()|FilterStringForPlayerAsync()` on player text to find where player text is used.
4. Remove the feature, or [rate-limit](#rate-limit-text-surfaces) it to one submission per player every 60 seconds.
5. Publish a new version of your root place.

Roblox lifts the limit in under 24 hours after you publish a new version of your root place. The banner on your Creator Hub page disappears, and text behavior returns to normal.

Roblox continues to monitor the game for conversations outside of `Class.TextChatService`. If it detects those conversations again, it applies the limit again. You might have missed a text feature the first time. Repeat the investigation and publish a new version.

## Rate-limit text surfaces

Prevent players from holding conversations outside of `Class.TextChatService`. Rate-limit every player-editable text surface to one submission per player every 60 seconds, and filter the text with `Class.TextService:FilterStringAsync()|FilterStringAsync()` before displaying it. At that rate, players can't hold a conversation through the surface, so Roblox doesn't detect it as chat. You can also remove or change the feature.

<Alert severity="warning">
Enforce the cooldown on the server. Players can bypass a timer that runs on the client.
</Alert>

For another example that applies the same 60-second server-side cooldown and text filtering to a community bulletin board, see [Rate-limited text inputs](../chat/examples/rate-limit-public-text-inputs.md). The following `Class.Script` adds a 60-second limit to a sign. It assumes a `Class.RemoteEvent` named `SubmitSignText` in `Class.ReplicatedStorage` that the client fires with the player's text:

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

	local now = os.clock()
	local last = lastSubmit[player]
	if last and now - last < COOLDOWN_SECONDS then
		return -- On cooldown: reject and tell the player how long to wait
	end
	lastSubmit[player] = now

	local success, filtered = pcall(function()
		return TextService:FilterStringAsync(text, player.UserId)
	end)
	if success then
		local safeText = filtered:GetNonChatStringForBroadcastAsync()
		-- Display safeText on the sign
	end
end)

Players.PlayerRemoving:Connect(function(player)
	lastSubmit[player] = nil
end)
```

## Takedowns

A temporary text limit isn't a takedown, and temporary limits largely replace takedowns as the consequence for this violation. However, Roblox can still take down games for repeated violations, or for openly promoting features such as uncontrolled or limitless chat.

If Roblox takes down your game for a `Class.TextChatService` violation:

1. Remove or rate-limit the surface that lets players converse outside of `Class.TextChatService`. See [Lift a temporary limit](#lift-a-temporary-limit) and [Rate-limit text surfaces](#rate-limit-text-surfaces).
2. Publish the change.
3. [Submit an appeal](https://www.roblox.com/report-appeals#/) that describes what you changed and what measures you're taking to prevent future violations. Replies typically arrive within one to two weeks.

## FAQ

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Will this limit be applied to all games?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Roblox only applies these temporary limits to certain games after it detects that players are holding conversations through a surface other than `Class.TextChatService`.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Should I appeal via Support channels?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Follow the guidance in [Lift a temporary limit](#lift-a-temporary-limit) and investigate your text features. The support team repeats the same guidance and asks you to publish a version update and wait 24 hours.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>How will I know if the limits are lifted?</Typography>
</AccordionSummary>
<AccordionDetails>
The banner on your game's Creator Hub page is removed, and text behavior goes back to normal.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Once the limit is removed, does that mean my game is approved going forward?</Typography>
</AccordionSummary>
<AccordionDetails>
Detection is based on player behavior patterns, and these patterns change over time. Roblox continues monitoring the game and detecting if players are holding conversations outside of `Class.TextChatService`. If such conversations are detected, the limit is applied again.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Unrelated text features in my game are limited. Why?</Typography>
</AccordionSummary>
<AccordionDetails>
Roblox detects and enforces at the game level, not the feature level. Your "hold a sign" feature might be the one used for conversations, while an unrelated feature such as making a playlist is limited as part of the game-wide text limit. Roblox can't apply limits for individual features of your game.
</AccordionDetails>
</BaseAccordion>
