---
title: Working with Translators
description: Explains the benefit of working with a native speaker to assist with localization efforts.
---

When translating content in your experience to a language that you are not familiar with, it's beneficial to work with a native speaker of that language to add or review any translations. Use the following tools to manage translators for your experience:

- [Add other Roblox users or groups](#adding-translators) to help you translate your experience,
- [Access localization reports](#translation-analytics) to track the contributions and translation coverage of your Roblox translators.
- Share the `.csv` file of your localization table with a [Non-Roblox translator](#working-with-non-roblox-translators).

<Alert severity="warning">
Before working with any translators, make sure you set your <a href="../localization/index.md#setting-source-language">source</a> and <a href="../localization/index.md#setting-supported-languages">supported languages</a> in the experience's localization settings.
</Alert>

## Adding Translators

You can add Roblox users or groups as translators in your experience's [localization page](../localization/index.md#localization-settings). Adding Roblox users as translators allows you to leverage all the benefits of Roblox's translation tools such as managing group-level permissions and viewing translation analytics.

Any Roblox user or group with edit permissions for your experience can manage, edit, and review translations and translators. Translators can see your string entries and edit translations for any of your supported languages. Translators can not configure any localization settings, add or delete any localization table entries, or grant translator permissions to any users or groups.

To add a Roblox user or group as a translator:

1. Navigate to your experience's **Localization Page**.
2. Navigate to the **Translators** tab.

   <img
   src="../../assets/localization/Translators-Tab.png"
   width="80%" />

3. Click the **Invite Translators** button.
4. If adding an individual, select either by **Username** or by **User ID** under the options and select the correct user from the dropdown.

   <img
   src="../../assets/localization/Invite-User-As-Translator.png"
   width="80%" />

5. If adding a group, input the **group ID** and select the right group from the dropdown and the selected roles.
6. Click **Confirm** once you have selected the users or groups you want to add.

## Accessing the Translator Portal

All translators that you add to your experience can access the **Translator Portal**, a translator specific page that provides access to your experience's localization table.

In the Translator Portal, translators can edit translations for all supported languages, and see translation history, including the time the translation was added and the translation contributor.

To share a direct link to your experience's Translator Portal:

1. Navigate to the **Translators** tab.
2. Copy the link by clicking the **Share Link** button.
3. Send the link to any Roblox user with translator permissions so they can access the Translator Portal directly.

To access an experience's Translator Portal from the Creator Dashboard:

1. Navigate to the [Creator Dashboard](https://create.roblox.com).
2. Navigate to the Translator Portal via the left navigation.
3. Select the experience you want to translate, or search for it via the search bar.
   <img
   src="../../assets/localization/Translator-Portal.png"
   width="80%" />

## Translation Analytics

As translators add translations, Roblox compiles translation reports every two weeks that give you visibility into what your translation coverage looks like for each supported language and which translators have been contributing.

To download a translation report:

1. In your experience's localization page, click **Reports**.
2. Select a date range for the report in the dropdown.
3. Click **Download**.

   <img
   src="../../assets/localization/Translation-Reports.png"
   width="80%" />

## Working with Non-Roblox Translators

You can work with translators who do not have Roblox accounts by downloading your experience's localization table as a `.csv` and having your translators add directly to the spreadsheet file. Once your translators have added their contributions, you can re-upload the `.csv` file through Studio. When adding translations through this workflow, translation analytics does not capture translator contributions and detailed history.

See [Adding Translations With File Upload](../../production/localization/manual-translations.md#adding-translations-with-file-upload) for more information on downloading your experience's localization spreadsheet.
