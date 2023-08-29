---
title: Localization
description: An overview of localization tools you can use to make sure all users can understand and enjoy content within experiences.
---

Roblox users come from a variety of cultures around the world and speak
different languages. Using **localization** tools effectively makes sure all
users can understand and enjoy your experience as intended. Roblox's
localization tools allow content to easily be displayed to users in their own
language. You can conveniently access your localization tools in your
experience's [Localization Settings](#localization-settings).

<img src="../../assets/localization/Concept-Banner.jpg" width="80%" />

## Localization Settings

Your experience's localization settings page is the starting place for enabling
translations and accessing your localization tools. The localization page also includes
tools to start translating your experiences, add translation collaborators and
download translation analytics.

The localization page can be found on the Roblox website and is only available for published experiences. For more information on finding it and setting it up, see [Accessing Localization Settings](../../production/localization/accessing-localization-settings.md).

## Translating Experience Page Content

You can translate your experience page content, such as title and
description and products like badges and passes. Use the experience's localization page to add translations for experience page content for your supported languages. For more information on localizing experience page content, see [Translating Experience Page](../../production/localization/translating-experience-page-information.md).

## Translating In-Experience Content

You can automatically gather all the user-facing text in your experience with
the Automatic Text Capture Tool. Once source text strings are added on your localization table, you can add translations to the table through the localization page or using a bulk `.csv` upload. For more information on adding general translations to your experience, see [Translating In-Experience Content](../../production/localization/translating-in-experience-content.md).

### Working with Translators

Add Roblox users as translators for your experience to help you review and polish automatic translations or provide and edit manual translations.

You can download monthly analytics to track your translation coverage and the contribution of your translators. For more information on working with localization contributors, see [Working with Translators](../../production/localization/working-with-translators.md).

### Translating Dynamic Content

You can translate dynamic strings in your experience, such as text that references usernames, substrings, currencies, or time and dates, using localization parameters. For more information on applying dynamic translations, see [Translating Dynamic Content](../../production/localization/translating-dynamic-content.md).

### Localizing with Scripting

In some cases, such as localizing images and sounds, targeting individual
strings for context overrides, or switching languages dynamically, you may need
to script more advanced localization behavior. For more information on
localization scripting and using the `Class.LocalizationService`, see [Localizing with
Scripting](/production/localization/localizing-with-scripting).
