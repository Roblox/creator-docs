---
title: Usage Guidelines
description: Important guidelines for using the in-experience text chat feature.
comments: Eventually fold the key points of this page into other pages and remove.
---

In-experience text chat is any message created within your experience that originated from one user and is delivered to one or more other users, including:

- Chat bubbles over an avatar's head
- Direct messages between users
- Chat window communication between users
- Team-specific messages

For sending and delivery, these types of communications must each go through a `Class.TextChannel` instance. This ensures messages respect privacy settings, are visible to moderators, and are properly text filtered.

Certain text is **not** considered chat:

- Text on menus created by developers (for example, "Press any button to continue.")
- Status updates from the experience (for example, "Two minutes remaining!")
- Announcements from admin commands
- A user renaming their pet dog
- A user writing on a sign
- Moderation audit logs or messages
- Comments on posts in an experience

  <Alert severity="info">
  If the comments support a reply feature, these replies would be considered a conversation and thus subject to this policy.
  </Alert>

- Writing a post on a bulletin board
- Any user-generated text unrelated to a conversation

For communication shared by users that can be seen by other users, even if it doesn't need to go through `Class.TextChatService`, you must ensure it goes through a [text filter](../ui/text-filtering.md).

## Requirements

- All experiences that offer in-experience text chat for users must integrate `Class.TextChatService`, per the [Misusing Roblox Systems Community Standard](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).
  - Between 30 December 2024 and 30 April 2025, creators that use a custom chat solution not powered by `Class.TextChatService` or a modified or forked [Legacy Chat](legacy/legacy-chat-system.md) can continue to use their existing feature, but must also deploy the `Class.TextChatService:CanUserChatAsync()|CanUserChatAsync()` and `Class.TextChatService:CanUserDirectChatAsync()|CanUserDirectChatAsync()` methods in their experiences.
  - After 30 April 2025, all creators must use the `Class.TextChatService` API.
  - For more information on migrating, see the [Roblox developer forums](https://devforum.roblox.com/t/migrate-to-textchatservice-removing-support-for-legacy-chat-and-custom-chat-systems/3237100).
- All incoming text that originates from another user must first use [Text Filtering](../ui/text-filtering.md) before your experience displays it.
- Communication between users must respect user privacy settings.
  - `Class.TextChannel:SendAsync` handles basic privacy and parental settings automatically.
  - `Class.TextChannel:SetDirectChatRequester` must be used to mark `TextChannels` created for direct chat.
- In-experience communication should be [reportable for abuse](https://en.help.roblox.com/hc/en-us/articles/203312410-How-to-Report-Rule-Violations). `TextChannels` handle this automatically.
