---
title: Custom Translations
description: Use Roblox's various translation tools to modify your experience's translation table.
---

You can use Roblox's various translation tools to further customize your experience's localization. For many experiences in early-development, you can use [automatic translations](../../production/localization/automatic-translations.md) as a strong starting point for localization. However, larger and more popular experiences can significantly benefit from custom translations to ensure users of all backgrounds can seamlessly enjoy and participate in your experiences.

Custom translations cover a wide variety of workflows which may be more applicable for certain situations. See the following for various resources of the different ways you can customize and implement your translations and localization.

## Manually Editing Localization Table

You, or any assigned translators, can directly edit your experience's localization table. This includes adding context to indicate when to use a certain translation, adding additional languages, and removing extraneous entries. This can help refine your translations and prevent common automatic errors, such as incorrectly translating loan words or homonyms.

See [Manually Editing Localization Table](../../production/localization/manual-translations.md) for more information on modifying your localization table.

## Translating Dynamic Content

You can translate dynamic strings in your experience, such as text that references usernames, substrings, currencies, or time and dates, using localization parameters. For more information on applying dynamic translations, see [Translating Dynamic Content](../../production/localization/translating-dynamic-content.md).

## Localizing with Scripting

In some cases, such as localizing images and sounds, targeting individual
strings for context overrides, or switching languages dynamically, you may need
to script more advanced localization behavior. For more information on
localization scripting and using the `Class.LocalizationService`, see [Localizing with
Scripting](/production/localization/localizing-with-scripting).
