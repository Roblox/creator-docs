---
title: Client-Side Chat Modules
description: Client-side chat modules allow you to extend and customize the deprecated legacy chat.
comments: |
  1. This guide is intentionally not available in the nav list, but still searchable for users who want to use the legacy chat system.
---

<Alert severity="error">
  This guide covers client-side chat modules of the legacy chat system, which is deprecated and no longer onboarding new users in favor of `Class.TextChatService` with easier and more modern chat settings. If you are using the default chat system powered by `Class.TextChatService`, see <a href="../../chat/in-experience-text-chat.md">In-Experience Text Chat</a>.
</Alert>

You can use the following chat modules to support client-side behaviors of the [Legacy Chat System](../../chat/legacy/legacy-chat-system.md#message-creator-modules).

## ChatWindow

The **ChatWindow** is the main chat module of the Legacy Chat System's client side.

### Methods

#### AddChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Adds a [ChatChannelUI](#chatchannelui) with the given `channelName` to the window.
- **Returns:** [ChatChannelUI](#chatchannelui)

#### RemoveChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Removes a [ChatChannelUI](#chatchannelui) with the given `channelName` from the window.
- **Returns:** void

#### GetChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Get the [ChatChannelUI](#chatchannelui) with the given `channelName` if it exists.
- **Returns:** [ChatChannelUI](#chatchannelui) or `nil`

#### GetCurrentChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Returns the current [ChatChannelUI](#chatchannelui).
- **Returns:** [ChatChannelUI](#chatchannelui)

#### SwitchCurrentChannel

- **Parameters:** `Library.string`: `channelName`
- **Description:** Switches the current channel to the [ChatChannelUI](#chatchannelui) with the given `channelName` if it exists.
- **Returns:** void

#### GetVisible

- **Parameters:** None
- **Description:** Returns whether the window is visible or not. Note: this refers to the chat UI in general; when the chat window fades to transparent due to inactivity, the window is still considered visible.
- **Returns:** [bool](../../luau/booleans.md)

#### SetVisible

- **Parameters:** [bool](../../luau/booleans.md): `visible`
- **Description:** Sets the visibility of the chat window.
- **Returns:** void

#### FadeOutBackground

- **Parameters:** [float](../../luau/numbers.md#float): `duration`
- **Description:** Fades out the background over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeInBackground

- **Parameters:** [float](../../luau/numbers.md#float): `duration`
- **Description:** Fades in the background over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeOutText

- **Parameters:** [float](../../luau/numbers.md#float): `duration`
- **Description:** Fades out the text over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeInText

- **Parameters:** [float](../../luau/numbers.md#float): `duration`
- **Description:** Fades in the text over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

## ChatBar

The **ChatBar** handles client-side text entry for the Lua Chat System. There are two key components of the ChatBar:

- **ChatBar** , a `TextBox` , where the player inputs messages and commands (highlighted in orange)
- **MessageMode** , a `TextLabel` , which can display information about the message being sent (highlighted in green)

### Methods

#### GetTextBox

- **Parameters:** None
- **Description:** Returns the `TextBox` of the chat bar.
- **Returns:** `TextBox`

#### GetMessageModeTextLabel

- **Parameters:** None
- **Description:** Returns the MessageMode `TextLabel`.
- **Returns:** `TextLabel`

#### IsFocused

- **Parameters:** None
- **Description:** Returns whether the chat bar's `TextBox` is in focus (player is typing in box). Equivalent to calling `TextBox:IsFocused` on the result of GetTextBox.
- **Returns:** [bool](../../luau/booleans.md)

#### CaptureFocus

- **Parameters:** None
- **Description:** Forces the client to focus on the `TextBox` of the chat bar. Equivalent to calling `TextBox:CaptureFocus` on the result of GetTextBox.
- **Returns:** void

#### ReleaseFocus

- **Parameters:** [bool](../../luau/booleans.md): `submitted = false`
- **Description:** Releases the focus of the chat bar `TextBox`. If `submitted` is true, this will behave as if the player pressed Enter to submit the message.
- **Returns:** void

#### ResetText

- **Parameters:** None
- **Description:** Sets the `Text` of the chat bar `TextBox` to the empty string.
- **Returns:** void

#### SetTextBoxText

- **Parameters:** `Library.string`: `text`
- **Description:** Sets the `Text` of the chat bar `TextBox` to the given `text`.
- **Returns:** void

#### GetTextBoxText

- **Parameters:** None
- **Description:** Returns the text in the chat bar `TextBox.Text`.
- **Returns:** `Library.string`

#### SetTextLabelText

- **Parameters:** `Library.string`: `text`
- **Description:** Sets the `Text` of the MessageMode `TextLabel` to the given `text`.
- **Returns:** void

#### GetEnabled

- **Parameters:** None
- **Description:** Returns whether the chat bar is `Visible`.
- **Returns:** [bool](../../luau/booleans.md)

#### SetEnabled

- **Parameters:** [bool](../../luau/booleans.md): `enabled`
- **Description:** Sets whether the chat bar is `Visible`.
- **Returns:** void

#### SetTextSize

- **Parameters:** [int](../../luau/numbers.md#int): `textSize`
- **Description:** Sets the `TextSize` of both the chat bar's `TextBox` and MessageMode `TextLabel`.
- **Returns:** void

#### ResetSize

- **Parameters:** None
- **Description:** Resets the size of the chat bar to one line of text.
- **Returns:** void

#### SetChannelTarget

- **Parameters:** `Library.string`: `channelName`
- **Description:** Sets the target [ChatChannelUI](#chatchannelui) given its `channelName` to which the chat bar should submit messages.
- **Returns:** void

#### FadeOutBackground

- **Parameters:** [float](../../luau/numbers.md#float): `duration` `duration`
- **Description:** Fades out the background over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeInBackground

- **Parameters:** [float](../../luau/numbers.md#float): `duration` `duration`
- **Description:** Fades in the background over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeOutText

- **Parameters:** [float](../../luau/numbers.md#float): `duration` `duration`
- **Description:** Fades out the text over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeInText

- **Parameters:** [float](../../luau/numbers.md#float): `duration` `duration`
- **Description:** Fades in the text over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

## ChatChannelUI

The **ChatChannelUI** is the client-side version of [ChatChannel](../../chat/legacy/server-side-chat-modules.md#chatchannel). It receives [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage) from the server and passes them on to the [ChatMessageLogDisplay](#chatmessagelogdisplay). associated with it.

### Methods

#### AddMessageToChannel

- **Parameters:** [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage)

- **Description:** Adds a chat message received from the server to the [ChatMessageLogDisplay](#chatmessagelogdisplay).
- **Returns:** void

#### RemoveLastMessageFromChannel

- **Parameters:** None
- **Description:** Removes the oldest [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage) found in the [ChatMessageLogDisplay](#chatmessagelogdisplay).
- **Returns:** void

#### ClearMessageLog

- **Parameters:** None
- **Description:** Removes all [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage) in the [ChatMessageLogDisplay](#chatmessagelogdisplay).
- **Returns:** void

## ChatMessageLogDisplay

The **ChatMessageLogDisplay** manages the rendering of [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage) in a [ChatChannelUI](#chatchannelui).

### Methods

#### AddMessage

- **Parameters:** [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage) `message`
- **Description:** Adds a `message` to the message log display.
- **Returns:** void

#### RemoveLastMessage

- **Parameters:** None
- **Description:** Removes the oldest [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage) in the message log display.
- **Returns:** void

#### ReorderAllMessages

- **Parameters:** None
- **Description:** Re-sorts all of the message displays in ascending order, relative to the size of the message display. This should be called if the message log display is resized.
- **Returns:** void

#### Clear

- **Parameters:** None
- **Description:** Removes all [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage) from the message log display.
- **Returns:** void

#### FadeOutText

- **Parameters:** [float](../../luau/numbers.md#float) `duration`
- **Description:** Fades out the text over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

#### FadeInText

- **Parameters:** [float](../../luau/numbers.md#float) `duration`
- **Description:** Fades in the text over the given `duration` in seconds. Note: later calls to control fading in/out will override earlier calls.
- **Returns:** void

## ChatCustomState

The **ChatCustomState** is an **interface** of callbacks used when creating a custom chat state in the chat bar.

Whisper chat and team chat use ChatCustomState to indicate to the player where their message will be sent.

### Callbacks

#### TextUpdated

- **Parameters:** None
- **Description:** Called when the text in the chat bar is updated.
- **Returns:** void

#### GetMessage

- **Parameters:** None
- **Description:** Called in order to retrieve the text of the message as it would be written as a single command. This is used in the case that the server needs to process the command as text, rather than the visualized state of the command.
- **Returns:** `Library.string`

#### ProcessCompletedMessage

- **Parameters:** None
- **Description:** Called when the player submits the message that is being processed by the custom state. This should return true if the message should not be displayed or sent to the server.
- **Returns:** [bool](../../luau/booleans.md)

#### Destroy

- **Parameters:** None
- **Description:** Called as the [ChatBar](#chatbar) is being reset back to its original state prior to the custom state modification.
- **Returns:** void

## ChatSettings

The **ChatSettings** is a dictionary of settings for the client-side of the Lua Chat System. They are stored in a `ModuleScript` named _ChatSettings_ , which can be found inside of the `Chat` game service, under the `Folder` named _ClientChatModules_ . The module may be required and its properties can be changed during run-time.

To change a setting, require this module using a `LocalScript` in the following manner:

```lua
-- Require the ChatSettings module (wait for it to load)
local Chat = game:GetService("Chat")
local ClientChatModules = Chat:WaitForChild("ClientChatModules")
local ChatSettings = require(ClientChatModules:WaitForChild("ChatSettings"))
-- Change settings like you would with any other table.
ChatSettings.MaximumMessageLength = 100
```

### Chat Behavior Settings

#### WindowDraggable

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `false`
- **Description:** Determines whether the [ChatWindow](#chatwindow) is `Draggable`.

#### WindowResizable

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `false`
- **Description:** Determines whether the [ChatWindow](#chatwindow) can be resized by the player

#### GamepadNavigationEnabled

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `false`
- **Description:** Determines whether gamepads can navigate chat UI.

#### ShowUserOwnFilteredMessage

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `true`
- **Description:** Determines whether players should see the filtered version of their chat messages, or the original content they typed in.

#### ChatOnWithTopBarOff

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `false`
- **Description:** Determines whether the chat UI is enabled even if the topbar is disabled.

#### BubbleChatEnabled

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `game:GetService("Players").BubbleChat`
- **Description:** Determines whether bubble chat is enabled.

#### ClassicChatEnabled

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `game:GetService("Players").ClassicChat`
- **Description:** Determines whether classic chat is enabled.

### Chat Text Size Settings

#### ChatWindowTextSize

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `18`
- **Description:** Determines the size of the text in the [ChatWindow](#chatwindow).

#### ChatBarTextSize

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `18`
- **Description:** Determines the size of the text in the [ChatBar](#chatbar).

#### ChatWindowTextSizePhone

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `14`
- **Description:** Determines the size of the text in the [ChatWindow](#chatwindow) for phones.

#### ChatBarTextSizePhone

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `14`
- **Description:** Determines the size of the text in the [ChatBar](#chatbar) for phones.

### Font Settings

#### DefaultFont

- **Type:** `Enum.Font`
- **Default:** `Enum.Font.SourceSansBold`
- **Description:** Determines the default `Font` of the [ChatWindow](#chatwindow).

#### ChatBarFont

- **Type:** `Enum.Font`
- **Default:** `Enum.Font.SourceSansBold`
- **Description:** Determines the default `Font` of the [ChatBar](#chatbar) `TextBox`.

### Color Settings

#### BackGroundColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.new(0, 0, 0)`
- **Description:** Determines the `BackgroundColor3` of the [ChatWindow](#chatwindow).

#### DefaultMessageColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.new(1, 1, 1)`
- **Description:** Determines the default `TextColor3` of [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage)in the [ChatWindow](#chatwindow).

#### DefaultNameColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.new(1, 1, 1)`
- **Description:** Determines the default `TextColor3` of speaker names of [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage)in the [ChatWindow](#chatwindow).

#### ChatBarBackGroundColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.new(0, 0, 0)`
- **Description:** Determines the `BackgroundColor3` of the [ChatBar](#chatbar).

#### ChatBarBoxColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.new(1, 1, 1)`
- **Description:** Determines the `BackgroundColor3` of the [ChatBar](#chatbar) `TextBox`.

#### ChatBarTextColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.new(0, 0, 0)`
- **Description:** Determines the `TextColor3` of the [ChatBar](#chatbar).

#### ErrorMessageTextColor

- **Type:** `Datatype.Color3`
- **Default:** `Color3.fromRGB(245, 50, 50)`
- **Description:** Determines the `TextColor3` of error messages.

### Window Settings

#### MinimumWindowSize

- **Type:** `Datatype.UDim2`
- **Default:** `UDim2.new(0.3, 0, 0.25, 0)`
- **Description:** Determines the smallest possible size of the [ChatWindow](#chatwindow) (given that **WindowResizable** is enabled).

#### MaximumWindowSize

- **Type:** `Datatype.UDim2`
- **Default:** `UDim2.new(1, 0, 1, 0)`
- **Description:** Determines the largest possible size of the [ChatWindow](#chatwindow) (given that **WindowResizable** is enabled).
- **Notes:** If this is changed to be greater than the full screen size, strange things start to happen with size/position bounds checking.

#### DefaultWindowPosition

- **Type:** `Datatype.UDim2`
- **Default:** `UDim2.new(0, 0, 0, 0)`
- **Description:** Determines the default position of the [ChatWindow](#chatwindow).

#### DefaultWindowSizePhone

- **Type:** `Datatype.UDim2`
- **Default:** `UDim2.new(0.5, 0, 0.5, (7 * 2) + (5 * 2))`
- **Description:** Determines the default size of the [ChatWindow](#chatwindow) on phones.

#### DefaultWindowSizeTablet

- **Type:** `Datatype.UDim2`
- **Default:** `UDim2.new(0.4, 0, 0.3, (7 * 2) + (5 * 2))`
- **Description:** Determines the default size of the [ChatWindow](#chatwindow) on tables.

#### DefaultWindowSizeDesktop

- **Type:** `Datatype.UDim2`
- **Default:** `UDim2.new(0.3, 0, 0.25, (7 * 2) + (5 * 2))`
- **Description:** Determines the default size of the [ChatWindow](#chatwindow) on desktop.

### Fade Out and In Settings

#### ChatWindowBackgroundFadeOutTime

- **Type:** [float](../../luau/numbers.md#float) (seconds)
- **Default:** `0.5`
- **Description:** Determines how long fading out the [ChatWindow](#chatwindow) background should take.

#### ChatWindowTextFadeOutTime

- **Type:** [float](../../luau/numbers.md#float) (seconds)
- **Default:** `30`
- **Description:** Determines how long fading out the [ChatWindow](#chatwindow) text should take.

#### ChatDefaultFadeDuration

- **Type:** [float](../../luau/numbers.md#float) (seconds)
- **Default:** `0.8`
- **Description:** Determines how long fading out chat UI elements should take.

#### ChatShouldFadeInFromNewInformation

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `false`
- **Description:** Determines whether the chat should fade in when receiving new messages.

#### ChatAnimationFPS

- **Type:** [float](../../luau/numbers.md#float)
- **Default:** `20.0`
- **Description:** Determines the framerate of fading animations in the chat UI.

### Channel Settings

#### GeneralChannelName

- **Type:** `Library.string`
- **Default:** `"All"`
- **Description:** Determines the name of the default channel.

#### EchoMessagesInGeneralChannel

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `true`
- **Description:** Determines whether messages to channels other than the default channel ought to be echoed into the default channel.

#### MaxChannelNameLength

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `12`
- **Description:** Determines the maximum length of a channel name before it is truncated.

#### MessageHistoryLengthPerChannel

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `50`
- **Description:** Determines the maximum number of [ChatMessage](../../chat/legacy/server-side-chat-modules.md#chatmessage) that can be displayed in a chat channel.

#### ShowJoinAndLeaveHelpText

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `false`
- **Description:** Determines whether the help text for joining/leaving channels is shown.

### Message Settings

#### MaximumMessageLength

- **Type:** [int](../../luau/numbers.md#int)
- **Default:** `200`
- **Description:** Determines the maximum length of [ChatMessages](../../chat/legacy/server-side-chat-modules.md#chatmessage).

#### DisallowedWhiteSpace

- **Type:** array\<`Library.string`>
- **Default:** `{"\n", "\r", "\t", "\v", "\f"}`
- **Description:** Determines the whitespace characters that are disallowed.

#### ClickOnPlayerNameToWhisper

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `true`
- **Description:** Determines whether the player can click on another player's name to engage in a whisper chat with them.

#### ClickOnChannelNameToSetMainChannel

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `true`
- **Description:** Determines whether the player can click on a channel's tab to set it as their main channel.

### Miscellaneous Settings

#### WhisperCommandAutoCompletePlayerNames

- **Type:** [bool](../../luau/booleans.md)
- **Default:** `true`
- **Description:** Determines whether the whisper command should auto-complete player names.

### Events

#### SettingsChanged

- **Parameters:** `Library.string` `settingName` , Variant `newValue`
- **Description:** Fires when a setting with the given `settingName` is changed to `newValue`.
