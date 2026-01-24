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

<h5 style={{marginTop: '36px'}}>Sources and ownership of the datasets</h5>

Roblox's generative AI systems made available to the public are trained on the following, with particular data sources varying for each system:

- Data from publicly accessible repositories under permissive licenses or released in the public domain
- Non-public data obtained from third-party providers via commercial arrangements
- Data from user activity on our platform and from our creators who have not opted-out from model training
- Data generated internally, including synthetic data
- Data provided by annotation services and other contractors

<h5 style={{marginTop: '36px'}}>Purpose and methodology of data collection, cleaning, processing, or modification</h5>

Roblox uses training data to develop or enhance its AI offerings to its creators. Data enables contextual understanding and generation with respect to language capabilities, as well as within virtual, 3D environments, including with respect to materials, textures, geometry, and structures, to enhance details, interactions, and relevance among objects.

Data is retained for only as long as it is beneficial for model improvement. Roblox regularly reviews and purges data.

<h5 style={{marginTop: '36px'}}>Data points included in the datasets, such as types, labels, and counters</h5>

Training data incorporates various types of (a) written and audio text including in a variety of languages; (b) visual content; and (c) annotations, rating, and preference data. The size of datasets varies by system type and version, but the amount of training can range up to over 3 million distinct assets.

<h5 style={{marginTop: '36px'}}>Licensing status, indicating whether datasets are copyright-protected, purchased, licensed, or in the public domain</h5>

Training data may include data subject to third party intellectual property rights. Third party data is derived from data repositories under (a) permissive licenses or released in the public domain; (b) third-party providers via commercial arrangements; and (c) our creators on our platform who have not opted-out from model training. Roblox conducts diligence on training data, including from third-party sources.

<h5 style={{marginTop: '36px'}}>Inclusion of personal or aggregate consumer information, as defined by the California Consumer Privacy Act</h5>

Roblox implements processes including filtering to exclude personal information from training generative AI systems available for public use. Creator data is also tokenized to ensure it is not associated with an individual. To the extent data may contain aggregate consumer information, Roblox does not use it to identify or target individuals. Creators on our platform can control their data sharing preferences, including opting-out of their content being used for training, and all users may request deletion of personal information generally.

<h5 style={{marginTop: '36px'}}>Cleaning, processing, or other modification of datasets by the developer and the respective purpose for each modification</h5>

Roblox employs various data processing techniques to enhance efficiency, quality, and safety, and to protect sensitive information, including deduplication, classification, and safety and privacy filtering.  

<h5 style={{marginTop: '36px'}}>Use of synthetic data in development and/or training of the system</h5>

Generated synthetic data is included in datasets used in development and training.

<h5 style={{marginTop: '36px'}}>Dates when datasets were first used and the time frame during which the data was collected</h5>

Roblox started compiling and using datasets for generative AI systems in 2023.  Such use is ongoing.

<h5 style={{marginTop: '36px'}}>Additional information</h5>

For additional information, refer to our model cards and research papers related to our published models.

This information is provided pursuant to California Civil Code Section 3111 (AB 2013) and is subject to update.

## Public Luau

Previously, Roblox launched a program that allowed you to share your scripts with Roblox, a public Luau dataset, or both. Roblox no longer uses the script data that was shared only with Roblox. Instead, you now decide if you want to share entire experiences, including their scripts.

The Luau public dataset is not affected by this change. You can set your sharing preferences on the Creator Hub in the **Public Luau** tab. For more details on the public dataset, see [Empower Luau creation](https://create.roblox.com/data-collection).
