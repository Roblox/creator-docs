---
title: Chat system guidelines
description: Guidelines for in-game text chat, editable text, developer-set text, and Quick Words, and how to keep each compliant.
---

**Chat** is any feature that lets players hold a back-and-forth conversation in under 60 seconds. To keep players safe, chat must go through `Class.TextChatService`, which applies privacy settings, age-based limits, text filtering, and abuse reporting automatically. If players can converse in your game outside `Class.TextChatService`, Roblox might take your game down.

Use this breakdown to decide how each text surface in your game must comply:

- **Chat (must use `Class.TextChatService`)**: Chat windows and chat bubbles over avatars, direct messages and team messages, custom chat systems, radios, phones and messaging UIs, admin tools that let players or admins message each other, and any text field that players can use to message each other in under 60 seconds.
- **Not chat (if it meets the requirements on this page)**: Player-editable text that other players can see, such as signs, bulletin boards, pet names, and name fields, as long as it has a one-minute rate limit per player and text filtering; preset phrases that players send from a fixed list for gameplay coordination; and developer-set text that players can't edit or reply to, such as menus, status updates, one-way announcements, and moderation logs.

## In-game text chat

In-game text chat is any message created in your game that one user sends to one or more other users and that allows back-and-forth conversation in under 60 seconds, including:

- Chat bubbles over an avatar's head
- Direct messages between users
- Chat window communication between users
- Team-specific messages

## Comply with text chat requirements

1. Integrate `Class.TextChatService` for all player-to-player chat, per the [Misusing Roblox Systems Community Standard](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). For information on migrating from the legacy chat system, see the [Roblox Developer Forum](https://devforum.roblox.com/t/migrate-to-textchatservice-removing-support-for-legacy-chat-and-custom-chat-systems/3237100) and [Migrate from legacy chat](./in-experience-text-chat.md#migrate-from-legacy-chat).
2. Don't circumvent `Class.TextChatService`, text filtering, or age-based limits. `Class.TextChatService` enforces these automatically.
3. Mark `Class.TextChannel|TextChannels` created for direct chat with `Class.TextChannel:SetDirectChatRequester()`.
4. Don't include any feature that lets a user send text to other users in under 60 seconds outside of `Class.TextChatService`.

If users repeatedly send messages that violate community standards, Roblox warns them and then temporarily prevents them from sending messages. For details, see [Text Chat Nudge FAQ](https://en.help.roblox.com/hc/en-us/articles/37541811348884-Text-Chat-Nudge-FAQ-s).

<Alert severity="info">
If Roblox takes your game down for a chat violation, remove or rate-limit the surface that lets players converse outside `Class.TextChatService`, then appeal and describe what you changed. Replies typically arrive within one to two weeks.
</Alert>

## UGC text and editable text

Some features let players edit text that other players can see, such as:

- An interface for a user to rename their pet or license plate
- Signs that players can enter and edit text on
- Comments or bulletin boards
- Editable text fields for in-game items and accessories

These surfaces are allowed, but they must not become a substitute for chat. Players might misuse them to chat by editing text repeatedly in quick succession, so editable text must meet the requirements in [Rate-limit and filter editable text](#rate-limit-and-filter-editable-text).

## Rate-limit and filter editable text

1. Filter player-written text with [text filtering](../ui/text-filtering.md) before your game displays it.
2. Rate-limit editable text that other players can see to at least one minute between submissions per player so it can't be used as makeshift chat. See [rate-limited text inputs](./examples/rate-limit-public-text-inputs.md) for an example.
3. Rate-limit comments on posts and bulletin boards to one minute per player, like other editable text. Don't let comments support a reply feature. Replies are a conversation and must meet the chat requirements.

<Alert severity="info">
Filtering text is required, but it isn't sufficient on its own. Filtering doesn't stop players from using a surface to talk to each other, so you still need the rate limit. Don't create any way for players to communicate outside `Class.TextChatService`.
</Alert>

## Developer-set text

**Developer-set text** is one-way text written and controlled by a game's developers, admins, or moderators to inform or guide players. Players can't alter it, and static text you write yourself doesn't need text filtering. Examples include:

- Text on menus created by developers, for example "Press any button to continue."
- Status updates from the game, for example "Two minutes remaining!"
- One-way announcements from the creator, including admin commands that only send one-way announcements
- Moderation audit logs or messages

If several users can use developer-set text, or admins use it to chat with each other, Roblox might moderate your game until those surfaces comply with the chat requirements or no longer allow real-time communication between users. Admin commands that let players reply, or that let admins chat with each other, count as chat.

## Use Quick Words for preset phrases

[Quick Words](./quick-words.md) are a limited set of approved phrases that players can use to coordinate gameplay. Players choose a phrase from the list and can't type their own text. By May 2027, any preset phrases that players can use, especially ones that appear in chat, must go through Quick Words and follow the [preset system guidelines](./preset-system-guidelines.md).

1. In [Creator Hub](https://create.roblox.com/dashboard/creations), select your game, then go to **Configure**&nbsp;⟩ **Chat**&nbsp;⟩ **Quick Words**.
2. Add up to three custom categories, with three to ten phrases in each. Your custom categories replace the default Roblox categories, but the **General** category stays available in every game.
3. Write phrases in English. Roblox translates them automatically based on each player's chat language setting.
4. Publish your phrases. Roblox reviews them against the content guidelines before they go live. If a phrase isn't approved, revise it and publish again.

## Respect privacy settings

Users can have different levels of access to communication features based on their [privacy and content maturity settings](https://www.roblox.com/my/account#!/privacy/Communication/ExperienceChat) or parental controls. Users might also have restrictions based on the app store they installed Roblox from or local law. `Class.TextChatService` applies all of these automatically.

To comply:

1. Mark every direct chat channel, meaning a private conversation between specific users, with `Class.TextChannel:SetDirectChatRequester()`, which applies the correct privacy settings.
2. Use `Class.TextChatService:CanUserChatAsync()` and `Class.TextChatService:CanUsersChatAsync()` to check whether players can chat, and update your UI to match, for example by hiding the chat button.
3. Use `Class.TextChatService:CanUsersDirectChatAsync()` to do the same for direct chat between specific users.
