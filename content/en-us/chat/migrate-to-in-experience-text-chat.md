---
title: Migrating from Legacy Chat to In-Experience Text Chat
description: Explains how to migrate from the Legacy Chat System to the more modern and safe In-Experience Text Chat system.
---

The [in-experience text chat system](../chat/in-experience-text-chat.md) offers simplified implementations and modern user interface (UI) of the same feature set as the [legacy chat system](../chat/legacy/legacy-chat-system.md), providing a more robust and flexible solution for supporting and extending chat in your experience. With this system, you no longer need to fork the chat system manually to add customization and chat commands. Instead, you can simply use engine API classes or the Studio settings to support your chat functionalities.

This guide assists you in migrating from the legacy chat system by providing alternative methods for implementing common chat functionalities and behaviors using the in-experience text chat system.

## Enabling Text Chat

When creating a new experience, the in-experience text chat system is automatically enabled as the default chat system. To switch the chat system of an existing experience from the legacy chat system to the in-experience text chat system:

1. In the [Explorer](../studio/explorer.md) window, select **TextChatService**.

1. In the [Properties](../studio/properties.md) window, find the **ChatVersion** dropdown and select **TextChatService**.

   <img src="../assets/players/in-experience-text-chat/TextChatService-ChatVersion.png" width="40%" />

## Basic Chat Functionalities

Though both systems share the same basic chat functionalities, the in-experience text chat system implementations are in general more sustainable and easier to iterate on.

<table>
  <thead>
    <tr>
      <th>Functionality</th>
      <th>Legacy Chat</th>
      <th>In-Experience Text Chat</th>
      <th>Differences</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Send a chat message</td>
      <td>`Class.Players:Chat()`</td>
      <td>`Class.TextChannel:SendAsync()`</td>
      <td>The `Class.TextChatService:SendAsync()` method supports more advanced chat features such as rich text formatting and message priority. It also includes built-in filtering to help prevent inappropriate messages from being sent.</td>
    </tr>
    <tr>
      <td>Implement messaging callbacks</td>
      <td>`Class.Chat:InvokeChatCallback()`, `Class.Chat:RegisterChatCallback()`</td>
      <td>`Class.TextChatService.SendingMessage`, `Class.TextChatService.OnIncomingMessage`</td>
      <td>The legacy chat system binds a function to chat system events for delivering messages. The two methods of the in-experience text chat system have more flexibilities and customization options.</td>
    </tr>
    <tr>
      <td>Add custom chat commands</td>
      <td>`ChatService/ChatCommand` module</td>
      <td>`Class.TextChatCommand`</td>
      <td>The in-experience text chat system has a dedicated class representing a text command for customization rather than using a legacy chat module.</td>
    </tr>
    <tr>
      <td>Display a system message</td>
      <td>Custom admin command library</td>
      <td>`Class.TextChannel:DisplaySystemMessage()`</td>
      <td></td>
    </tr>
    <tr>
      <td>Disable chat</td>
      <td>Game Settings in Studio and `ChatWindow/ChatSettings` module for hiding the chat window</td>
      <td>`Class.ChatWindowConfiguration.Enabled`</td>
    </tr>
  </tbody>
</table>

## Chat Message Filtering

The in-experience text chat system can automatically filter chat messages based on each user's account information, so you don't need to manually implement text filtering for all kinds of chat messages.

<table>
  <thead>
    <tr>
      <th>Functionality</th>
      <th>Legacy Chat</th>
      <th>In-Experience Text Chat</th>
      <th>Differences</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Filter message for individual user</td>
      <td>`Class.Chat:FilterStringAsync()`</td>
      <td rowspan="2">`Class.TextChannel:SendAsync()`</td>
      <td rowspan="2">No need to manually filter chat messages using the in-experience text chat system.</td>
    </tr>
    <tr>
      <td>Filter broadcasting messages</td>
      <td>`Class.Chat:FilterStringForBroadcast()`</td>
    </tr>
  </tbody>
</table>

## Chat Window and Bubble Chat

Both the chat window and bubble chat behavior and customization options of the in-experience text chat system are identical to those of the legacy chat system. As the legacy chat system only allows customization using chat modules or the `Class.Players` container, the in-experience text chat system provides dedicated classes, `Class.ChatWindowConfiguration` and `Class.BubbleChatConfiguration`, to manage all chat window and bubble chat properties respectively. Additionally, you can easily adjust and preview your bubble chat appearance and behavior properties using Studio settings instead of having to script them all.

<table>
  <thead>
    <tr>
      <th>Functionality</th>
      <th>Legacy Chat</th>
      <th>In-Experience Text Chat</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Enable chat window</td>
      <td>`Class.Chat.LoadDefaultChat`, `Class.Players.ClassicChat`</td>
      <td>`Class.ChatWindowConfiguration.Enabled`</td>
    </tr>
    <tr>
      <td>Enable bubble chat</td>
      <td>`Class.Chat.BubbleChatEnabled`, `Class.Players.BubbleChat`</td>
      <td>`Class.BubbleChatConfiguration.Enabled`</td>
    </tr>
    <tr>
      <td>Set chat window properties</td>
      <td>`Class.Players:SetChatStyle()`</td>
      <td>`Class.ChatWindowConfiguration`</td>
    </tr>
    <tr>
      <td>Set bubble chat properties</td>
      <td>`Class.Chat:SetBubbleChatSettings()`, `Class.Chat.BubbleChatSettingsChanged()`, `Class.Players.BubbleChat`, `Class.Players:SetChatStyle()`</td>
      <td>`Class.BubbleChatConfiguration`</td>
    </tr>
    <tr>
      <td>Enable NPC Bubbles</td>
      <td>`Class.Chat:Chat()`</td>
      <td>`Class.TextChatService:DisplayBubble()`</td>
    </tr>
  </tbody>
</table>
