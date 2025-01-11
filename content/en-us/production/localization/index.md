---
title: Localization
description: An overview of localization tools you can use to make sure all users can understand and enjoy content within experiences.
---

Roblox users come from a variety of cultures around the world and speak
different languages. Using **localization** tools effectively makes sure all
users can understand and enjoy your experience as intended. Any experience can immediately take advantage of Roblox's automatic localization tools instantly expand your potential audience. As your experience grows, use Roblox's various localization API tools, manual translator portals, and analytics, to ensure that users from around the world can fully participate and socialize in your experience.

<img src="../../assets/localization/Concept-Banner.jpg" width="80%" />

## Localization Settings

Your experience's localization settings is the starting place for enabling
translations and accessing your localization tools. You'll need to set your
[source](#setting-source-language) and [supported](#setting-supported-languages)
languages before starting any localization to a new language.

The localization page also includes tools to start translating your experiences, add translation collaborators and download translation analytics.

You can access your experience's localization settings through the Creator Dashboard main page:

1. Navigate to the [Creator Dashboard](https://create.roblox.com).
2. Hover over your experience and click **Manage Experience**.
3. In the left navigation, navigate to **Audience** → **Localization**.

You can also access your experience's localization settings in the on your [Creations](https://create.roblox.com/dashboard/creations) page:

1. Navigate to your Creator Dashboard [Creations](https://create.roblox.com/dashboard/creations).
2. In the Experiences tab, find your experience and select the **...** button.
3. Select **Configure Localization**.

   <img
   src="../../assets/localization/Experience-Page-Configure-Localization.png"
   width="400" />

A link to your experience's localization settings is also available in Studio. To find the link:

1. In the **File** menu, navigate to **Game Settings**.
2. In the **Localization** section, click the link indicated below to launch the
   localization settings in your default browser.

   <img
   src="../../assets/localization/Game-Settings-Configure-Localization.png"
   width="800" />

### Setting Source Language

Before you can start any localization, Roblox needs to know which language you
are translating from and which languages you are translating to.

The **source language** is the primary language that the
experience has been written in. Roblox currently only supports one source
language at a time. The default is set to **English**.

To set the **source** language:

1. In the localization settings, navigate to **Languages** and select the **Source Language** dropdown.

   <img
   src="../../assets/localization/Change-Source-Language-Dropdown.png"
   width="800" />

2. Select a language from the list.
3. Click **Confirm** to add the language.

### Setting Supported Languages

The **supported languages** are the languages you intend to provide translations
for. You can have multiple supported languages for your experience. See
[language codes](./language-codes.md) for a list of all languages Roblox supports.
To set the **supported** languages:

1. In the localization settings, navigate to
   **Languages** and select the **Source Language**.
2. In the **Supported Languages** section, click **Add Language** to add the
   languages you intend to localize to.

   <img src="../../assets/localization/Add-Languages.png" width="800" />

3. Click the input box and type in the language you would like to add, or select
   from the list of languages.

   <img src="../../assets/localization/Add-Languages-Menu.png" width="300" />

4. Click **Confirm** to add the language.

## Automatic Translations

Roblox's automatic translation tool is available on any experience and allows you to immediately begin localizing the strings in your experience and broadening your potential audience. In many cases, you can start making significant progress on your localization journey using automatic translations before adding [custom translations](#custom-translations) or working with [manual translators](#working-with-translators).

For more information on enabling automatic translations in your experience, see [Automatic Translations](../../production/localization/automatic-translations.md).

## Custom Translations

Apply various customizations to your translations to improve and expand your experience's localization. You, or any assigned translator, can manually add and modify translations to your experience's translation table. You can also access this table programmatically, allowing you to create contextual translations, switch out images or assets based on language, or even manually display translations from a different language.

For more information on custom translation use-cases, see [Translating In-Experience Content](../../production/localization/custom-translations.md).

## Working with Translators

Add Roblox users as translators for your experience to help you review and polish automatic translations or provide and edit manual translations.

You can download monthly analytics to track your translation coverage and the contribution of your translators. For more information on working with localization contributors, see [Working with Translators](../../production/localization/working-with-translators.md).
