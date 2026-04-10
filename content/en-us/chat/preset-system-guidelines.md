---
title: Preset system guidelines
description: Guidelines for implementing preset systems that comply with Roblox Community Standards and Terms of Use.
---

Preset systems let users safely send predefined text to each other to coordinate gameplay. They can be implemented in a variety of ways, such as wheels that let users select and send presets publicly to one
another in-game.

These systems **_must not_** be used to enable unrestricted, real-time, two-way communication between players of different ages or to bypass platform safety systems. They are meant to:

- Support quick in-game coordination
- Reduce friction in common gameplay moments
- Preserve Roblox's existing safety and age-based communication protections

## Guidelines

If you want to implement this type of system, you must adhere to these guidelines, which are meant to help you comply with our [Community Standards](https://about.roblox.com/community-standards) and [Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use).

### Safety first

Preset systems must reinforce existing Roblox safety features – not work around them. If the preset system enables dynamic conversation, then it undermines platform safety and doesn't comply with our policies.

**Ask yourself**: Does this feature break, bypass, or circumvent any existing Roblox safety features by enabling free-form, two-way, directed, and dynamic conversation? If it does, the system must respect the requirements that users be age checked (through [Facial Age Estimation](https://about.roblox.com/age-estimation) or [ID-verification](../production/publishing/account-verification.md#verify-through-government-id)) and of a [similar age to chat](https://en.help.roblox.com/hc/en-us/articles/43611824582292-How-to-Chat-on-Roblox).

If the system you want to implement is purely to help players communicate in-game actions, confirmations, or basic reactions, you can use a preset system that lets users send presets to each other regardless of age or age check status.

### Intent, not conversation

Preset systems are for expressing immediate gameplay intent, not dialog. Each preset must stand alone and be complete without requiring a response unrelated to gameplay. General back and forth calls-to-action and replies such as "Help" followed by an "OK" are acceptable.

**Presets must:**

- Be relevant to the current game mode or scenario
- Avoid open-ended or socially exploratory language
- Ideally expire quickly or lose relevance outside the moment

**Presets must not:**

- Include slang that could carry hidden or evolving meanings
- Reference to real-world contact, identity, or relationships
- Involve emotional manipulation, social pressure, or content that would violate Roblox's Community Standards

**Examples**

- ✅ "Need help"
- ✅ "Defending this area"
- ✅ "Ready"
- ❌ "Why didn't you help me?"
- ❌ "Do you like me?"

### Limited, finite Scope

Preset systems must not gain meaning when combined, repeated, or sequenced. They should be tied to the current game context and lose relevance outside the moment. If players can use the wheel to "say anything, just slower," the design is not permitted.

**Examples**

- ✅ "Pass the ball"
- ✅ "Reloading"
- ✅ "Enemy nearby"
- ❌ "Where are you from?"
- ❌ "What are your socials?"

## Enforcement and review

All content and related features may be reviewed by Roblox to ensure compliance with our guidelines
and to protect users on the platform. This may include:

- Reviewing preset system content during experience review
- Requiring changes or removal if a system enables circumvention or otherwise violates Roblox's Community Standards
- Disabling preset system features that undermine platform safety goals
- Taking additional enforcement actions taken on your experience, account, or group

Creators are responsible for ensuring that all content and future updates continue to comply with these guidelines.

### Requirements

All preset systems and their features must adhere to the following requirements:

- All UI of presets must be properly labeled as **system preset** when displaying within chat
- All preset systems should be visually distinct from Roblox's native freeform chat
- Presets should not incorporate any end marks or terminal punctuation, such as exclamation marks, question marks, or periods, to prevent them from being confused with general chat messages
- All presets must go through `Class.TextService:FilterStringAsync()`
- Add a rate-limit (10 seconds per send)
- Limit the number of presets displayed to 12 or less for your Universe

### What is allowed

Preset systems may include:

- Tactical gameplay commands (e.g., "Attack", "Defend", "Hold Position")
- Cooperative commands (e.g., "Follow me", "Ready", "Wait")
- Sports/FPS-style callouts (e.g., "Reloading", "Cover me", "Nice shot")
- Neutral encouragement or game statements (e.g., "Well played", "Thanks")

These should always be finite, curated, and creator-controlled.

### What is not allowed

Preset systems may not be used to:

- Simulate free-form chat or conversation
- Compliment or flatter others with statements that don't relate to gameplay
- Enable back-and-forth dialogue across age groups
- Encode custom messages
- Circumvent chat, DM, or voice restrictions
- Replace or mirror unrestricted social features
- Questions or social questions

Examples of disallowed patterns:

- Alphabet wheels or number-based encoding
- Question/answer structures ("Why?", "Because")
- "Hi!" "Hello!" "How are you?" "What's up?"
