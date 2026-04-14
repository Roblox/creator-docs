---
title: Experiences with Generative AI
description: 
---

Roblox provides a variety of AI-powered tools and services to enhance creation and in-experience creativity. When incorporating generative AI into your experiences, whether using Roblox-provided models or third-party solutions, you must ensure these integrations remain safe, follow Roblox's [Community Standards](https://about.roblox.com/community-standards), and provide transparency to your users.

This page outlines the guidelines, rules, and best practices for using generative AI in Roblox experiences.

## Moderation

To maintain a safe environment, all content, including content created by or using generative AI, must adhere to Roblox's Community Standards.

**When using Roblox APIs, such as `Class.GenerationService` and `Class.TextGenerator`**: All content inputs and outputs go through [moderation](https://about.roblox.com/newsroom/2025/07/roblox-guard-advancing-safety-for-llms-with-robust-guardrails), including text filtering, image review, and asset review. Content identified as violative is not served to users.

- Users will not be issued consequences for violative outputs generated in response to non-violative inputs.

**When using third-party tools**: You are responsible for the content delivered to users, even if it is AI-generated. To make sure your experience aligns with Roblox's safety standards, you should ensure that:

- Outputs adhere to Roblox's Community Standards.
- Inputs and outputs do not circumvent Roblox-mandated safety measures. For example, text inputs and outputs must go through `Class.TextChatService`.

## Content maturity

If your experience allows players to interact with a generative AI model in any way that triggers a response from the model, such as interactions that include text chat, voice chat, images, 3D generations, and avatar movement, you must disclose it within the [Content Maturity](./production/promotion/content-maturity.md) questionnaire.

While merely including an AI component in your experience does not impact the content maturity of your experience, experiences with extended AI interactions must include the appropriate **Restricted** content maturity label so that they are only available to the appropriate audience.

### Limited interactions

For experiences without the **Restricted** content maturity label, model outputs must adhere to the underlying Content Maturity classification of the experience.

**When using Roblox-served AI tools, such as `Class.GenerationService` and `Class.TextGenerator`**:

- For all experiences, we instruct our model to align with an All Ages content maturity rating and avoid outputs that would require a descriptor, such as Horror elements.
- For experiences with a Content Maturity label of mild violence or higher, models can generate otherwise compliant weapons.

**When using third-party tools**:

- You must ensure outputs align with the Content Maturity rating of your experience.

### Extended interactions

Experiences with **extended interactions** are those that are intended to, or can be used to, engage in continuous conversation with chatbot-like generative AI features. Your experience is considered to have extended AI interactions if it meets one of the following criteria:

- The experience's main theme or purpose is for players to continuously interact with a generative AI bot or character without a time limit.

  - For example, an experience titled "Your AI friend" whose sole purpose is for users to engage in a continuous conversation with an AI-driven non-player character (NPC).

- The AI component includes cross-session memory so that the experience saves the context of a user's prior interactions with AI and loads it on subsequent sessions.

  - For example, an experience primarily focused on gameplay that has one AI-driven NPC which users can only interact with for several minutes. However, when reloading the game and interacting with the NPC again, the model can refer back to previous conversations with the user.

If your experience includes extended interactions, you must answer "Yes" to the Extended AI question of the Content Maturity questionnaire. Because these experiences may not be suitable for younger users, they need a Restricted content maturity label so that they are inaccessible to users under the age of 18.

<Alert severity ='info'>
For more information on Content Maturity rules and guidelines, see the [Content Maturity](./production/promotion/content-maturity.md) guide.
</Alert>

## Disclosures

When including generative AI components in your experience, you must ensure visible disclosures are presented to users, including:

- At the start of any interaction, and throughout the session, users must see a notice that their conversation is with AI. For example:

   "_This is an AI-powered conversation, not human. It may make mistakes._"

- Users must be directed to authoritative resources if seeking any medical or professional advice. Specifically, if a user expresses thoughts of self-harm or signs of a mental health crisis, AI models must encourage them to seek support. For example:

   "_If you or a loved one are experiencing a hard time, please reach out to qualified mental health professionals or support services who can provide the help you need. Information and links to resources and crisis hotlines can be found on Roblox's Community Standards._"
