---
title: Platform-integrated chat
description: Opt in to platform-integrated TextChatService so Roblox delivers and renders chat messages with TextChannelWindow.
---

<Alert severity="info">
Starting in May 2027, platform-integrated chat will be required for all games. The unsupported APIs will be deprecated, and custom chat will have to use the new `Class.TextChatService` features.
</Alert>

<Alert severity="warning">
When you enable platform-integrated chat, custom chat features must move to Roblox's native systems (`Class.TextChatCommand|TextChatCommands`, `Class.TextChannelWindow`, [Quick Words](./quick-words.md)). Message content is also no longer accessible in code.
</Alert>

**Platform-integrated chat** gives every player consistent access to safety tools such as reporting and muting, and lets chat features like [Quick Words](./quick-words.md) roll out reliably across all games. It also replaces the current prefix system, so roles associated with users render consistently and are safe for all ages.

Nothing in your game changes until you [enable platform-integrated chat](#enable-platform-integrated-chat) in Studio. After you enable it:

- Roblox delivers and renders chat in the default window or a `Class.TextChannelWindow` you place in your UI. Custom chat UIs can no longer render messages themselves.
- Player message text isn't accessible to your code. You can't read, log, or export it. APIs that previously returned message text now return an empty string (`""`) instead of `nil`, so your scripts keep running but receive no content.

<Alert severity="warning">
Commands triggered from chat must use `Class.TextChatCommand`.
</Alert>

## Unsupported APIs

When platform-integrated chat is enabled, the following APIs return `""` (empty string, not `nil`) and log a warning:

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Unsupported APIs</th>
      <th>What to use instead</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Chat messages and display</td>
      <td>`Class.TextChatMessage.Text`, `Class.TextChatMessage.Translation`</td>
      <td>Migrate your custom chat GUI to `Class.TextChannelWindow`. Set `Class.TextChannelWindow.Target|Target` to a `Class.TextChannel`. Users can send and receive messages automatically.</td>
    </tr>
    <tr>
      <td>Chat prefixes</td>
      <td>`Class.TextChatMessage.PrefixText`</td>
      <td>Not supported. If your game requires prefixes, don't enable platform-integrated chat yet.</td>
    </tr>
    <tr>
      <td>Presets / chat wheels</td>
      <td>`Class.TextChannel:SendAsync()`</td>
      <td>Use [Quick Words](./quick-words.md) creator customization to add relevant phrases to chat.</td>
    </tr>
    <tr>
      <td>Moderation / admin commands</td>
      <td>`Class.TextChatService.OnIncomingMessage|OnIncomingMessage`, `Class.Player.Chatted`</td>
      <td>Use `Class.TextChatCommand` for chat-triggered commands. Use read-only chat to view all chats for moderation during live events.</td>
    </tr>
  </tbody>
</table>

## Enable platform-integrated chat

To enable platform-integrated chat in Studio:

1. Open the [Explorer](../studio/explorer.md) window.
2. Select `Class.TextChatService`.
3. In the [Properties](../studio/properties.md) panel, find `Class.TextChatService.PlatformIntegratedChat|PlatformIntegratedChat`.
4. Set it to **Enabled**.

With the update enabled, the unsupported APIs listed earlier return empty strings and log warnings. You can set the property back to **Disabled** at any time to revert.

You can only change this property in Studio, not from a script.

## Create a TextChannelWindow

To create a `Class.TextChannelWindow`:

1. Create a `Class.ScreenGui` in `Class.StarterGui`.
2. Add a `Class.TextChannelWindow` instance as a child of the `Class.ScreenGui`.
3. Set the `Class.GuiObject.Size|Size` and `Class.GuiObject.Position|Position` properties to place the window where you want it.
4. Set the `Class.TextChannelWindow.Target|Target` property to the `Class.TextChannel` you want the window to display.

Each `Class.TextChannelWindow` binds to a single `Class.TextChannel`. To show multiple channels together, create a `Class.TextChannelWindow` for each channel and apply your own show/hide logic. The Global channel isn't available as a target for a custom window.

The following code sample creates a custom chat window that displays the `RBXGeneral` channel:

```lua title="LocalScript in StarterGui"
local TextChatService = game:GetService("TextChatService")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "TextChannelWindowDemo"
screenGui.Parent = script.Parent

local myTextChannelWindow = Instance.new("TextChannelWindow")
myTextChannelWindow.Size = UDim2.new(0, 400, 0, 300)
myTextChannelWindow.Position = UDim2.new(0, 10, 0, 10)
myTextChannelWindow.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
myTextChannelWindow.BackgroundTransparency = 0.5

local targetChannelName = "RBXGeneral"
local targetChannel = TextChatService:WaitForChild("TextChannels"):WaitForChild(targetChannelName)

if targetChannel and targetChannel:IsA("TextChannel") then
	myTextChannelWindow.Target = targetChannel
end

myTextChannelWindow.Parent = screenGui
```

## Show a custom channel only in its own window

By default, the default chat window renders messages from every `Class.TextChannel`, so a channel you show in a custom `Class.TextChannelWindow` also appears in the default window.

To show a custom channel only in its own window:

1. In the Explorer, select `Class.ChatWindowConfiguration` under `Class.TextChatService`.
2. In the **Properties** panel, set `Class.ChatWindowConfiguration.TextChannelDisplayMode|TextChannelDisplayMode` to **DefaultTextChannels**.
3. For each custom channel, create a `Class.TextChannelWindow` and set its `Class.TextChannelWindow.Target|Target` to that channel.

The following example shows a custom Guild channel that appears only in its own window:

```lua title="LocalScript in StarterPlayerScripts"
-- Prerequisite: TextChannelDisplayMode is set to DefaultTextChannels in Studio.
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")
local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")

-- Scripts can read the property at runtime, but can't change it.
local config = TextChatService.ChatWindowConfiguration
if config.TextChannelDisplayMode ~= Enum.TextChannelDisplayMode.DefaultTextChannels then
	warn("Guild messages will also appear in the default chat window.")
end

local guildChannel = TextChatService:WaitForChild("TextChannels"):WaitForChild("Guild")

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "GuildChat"
screenGui.Parent = playerGui

local guildWindow = Instance.new("TextChannelWindow")
guildWindow.Size = UDim2.new(0, 400, 0, 300)
guildWindow.Target = guildChannel
guildWindow.Parent = screenGui
```

Keep these behaviors in mind:

- You can set `Class.ChatWindowConfiguration.TextChannelDisplayMode|TextChannelDisplayMode` only in Studio or from a plugin. Scripts can read it at runtime but can't change it.
- The property exists only on `Class.ChatWindowConfiguration`. `Class.TextChannelWindow` doesn't need it because it already shows a single channel through `Class.TextChannelWindow.Target|Target`.
- Channels created at runtime follow the current mode when they appear. Default channels created at runtime, such as Team and Whisper, still appear in the default window.

## Migrate chat-triggered admin commands

Whether you need to update your admin commands depends on how they are triggered:

- Commands triggered from chat must use `Class.TextChatCommand`.
- Command handling that reads raw chat text no longer works. This includes `Class.TextChatService.MessageReceived|MessageReceived`, `Class.Player.Chatted|Chatted`, or anything else that inspects `Class.TextChatMessage` content.

To migrate:

1. Identify admin commands in your game that currently parse raw chat messages.
2. Create a `Class.TextChatCommand` for each command.
3. Define the command's trigger keyword and callback logic.
4. Remove any code that reads `Class.TextChatMessage.Text|Text` or listens to `Class.Player.Chatted|Chatted` for command handling.

For an example, see [Custom text chat commands](./examples/custom-text-chat-commands.md).

## FAQ

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Will anything change if I do nothing?</Typography>
</AccordionSummary>
<AccordionDetails>
Nothing changes in your game unless you set `Class.TextChatService.PlatformIntegratedChat|PlatformIntegratedChat` to **Enabled**.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does this affect signs, boards, notes, or other in-world text players can write?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Policy for those surfaces is unchanged: they can't be used for two-way communication between players, they need rate limiting of at least 1 minute, and they are subject to moderation.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Does this affect comment systems, message boards, or mail in my game?</Typography>
</AccordionSummary>
<AccordionDetails>
No. This update covers `Class.TextChatService` only.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Can I still record and pull chat logs as a game admin?</Typography>
</AccordionSummary>
<AccordionDetails>
No. When `Class.TextChatService.PlatformIntegratedChat|PlatformIntegratedChat` is **Enabled**, no API returns player message content on the client or server. Moderators in your game can still use read-only chat permissions to view chat. Players can also rely on Roblox's abuse reporting and on safety tools such as muting and blocking.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant='buttonLarge'>Do I need to change anything if I use the default Roblox chat?</Typography>
</AccordionSummary>
<AccordionDetails>
No. If your game uses the default Roblox chat with no customizations, you don't need to take action and shouldn't see a change.
</AccordionDetails>
</BaseAccordion>
