---
title: AI data sharing
description: Understand AI data sharing policies and how to update your preferences.
---

Roblox has a suite of AI-powered solutions, including [Code Assist](studio/script-editor.md#code-assist), [Material Generator](studio/material-generator.md), [Assistant](assistant/guide.md), in-experience chat translation, [Texture Generator](studio/texture-generator.md), and [Avatar Setup](/avatar-setup/index.md). These tools help you quickly find information, accelerate the creation process, and complement your existing skillset.

To improve these tools and build new ones, Roblox uses data to train its generative AI models.

When you publish an experience in Studio, upload an avatar item, or upload a **paid** asset to the [Creator Store](production/creator-store.md), you have the option to share your data. The default choice in the user interface is based on a setting in the [Creator Hub](https://create.roblox.com/).

<img src="assets/misc/Data-Share-Dialog.png" alt="An image of the publish experience dialog showing the data sharing toggle." width="70%" />

- The data sharing setting is **off by default** for experiences, avatar items, and paid assets published prior to July 10, 2024.
- The data sharing setting is **on by default** for experiences, avatar items, and paid assets published on or after July 10, 2024.

You can change your default choice at any time and override it as desired whenever you publish.

<Alert severity="info">
Because they're distributed with the intent of others using them, **free** [Creator Store](production/creator-store.md) assets are shared by default, with no ability to disable sharing.
</Alert>

## Manage data sharing preferences

To set your global data sharing preferences:

1. On the [Creator Hub](https://create.roblox.com/), click your user name and **Settings**.
1. Select **Data Sharing**.
1. Enable or disable **Make sharing data the default option when publishing experiences**.
1. (Optional) Choose individual experiences, avatar items, and paid Creator Store assets to share or not share.

## How Roblox uses data

All data shared with Roblox is for AI-enhancement purposes only and is not shared with third parties. Data is processed and stored in accordance with strict security protocols, contains no personal information, is split into tokens (small snippets) for further anonymization, and is retained for only as long as it is beneficial for model improvement. Roblox regularly reviews and purges shared data.

If you share something and then later stop sharing it, Roblox will remove it from the training dataset within 30 days. Any AI models that were trained using your data will be updated within 365 days.

## Public Luau

Previously, Roblox launched a program that allowed you to share your scripts with Roblox, a public Luau dataset, or both. Roblox no longer uses the script data that was shared only with Roblox. Instead, you now decide if you want to share entire experiences, including their scripts.

The Luau public dataset is not affected by this change. You can set your sharing preferences on the Creator Hub in the **Public Luau** tab. For more details on the public dataset, see [Empower Luau creation](https://create.roblox.com/data-collection).
