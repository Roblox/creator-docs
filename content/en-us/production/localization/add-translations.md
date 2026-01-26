---
title: Add translations
description: Learn how to manually add, edit, and remove entries to your experience's cloud localization table.
---

You can add translations to source entries on your experience's localization table using the [translator portal](#in-translator-portal) or [with a `.csv` file upload](#with-file-upload).

In some cases, strings may require real-time translation during gameplay, such as a timer, using units of measurement, or when displaying player names. You can add translation parameters to the localization table as placeholders for this type of content. See [Translate dynamic content](./translate-dynamic-content.md) for implementation details.

### In Translator Portal

Your experience's [Translator Portal](../localization/index.md#localization-settings) provides a direct way to provide translations for the collected strings. Users added as translators for your experience can access the Translator Portal.

#### Add string translations

To translate text through the localization page:

1. In the localization settings page, click the **Translate** button on the top right.
2. In the **Target Languages** menu on the left, select the target language you want to add a translation to.
3. Select the **Strings** tab at the top of the page.
4. In the Strings column, select the string you intend to translate.
5. In the **Text to translate** field, input the desired translation and click **Save**.

   <img src="../../assets/localization/Portal-Adding-String.png" width="100%"
   />

<Alert severity="info">
You cannot make edits to an existing source's <b>Key</b>, <b>Context</b> or <b>Example</b> fields through the localization settings page. To add or edit a source's <b>Key</b>, <b>Context,</b> or <b>Example</b> fields, you can remove and re-add the entry on the Localization page with these fields included, or make the edits directly with [file upload](#with-file-upload).
</Alert>

#### Add locale-specific translations

Some languages may have regional differences in terms or spelling, such as "soccer" and "football". These are considered locales within languages. Currently, Roblox supports adding translations for the following locales:

|Locale Name|Locale ID|
| --- | --- |
|English (United States)|en-us|
|English (United Kingdom)|en-gb|
|French (France)|fr-fr|
|French (Canada)|fr-ca|
|Portuguese (Brazil)|pt-br|
|Portuguese (Portugal)|pt-pt|
|Spanish (Spain)|es-es|
|Spanish (Mexico)|es-mx|

For languages that have Roblox-supported locales, you'll see subheadings under the parent language for global and locale-specific translations.

   <img src="../../assets/localization/Locale-Left-Nav.png" width="65%"
   />

Add translations that are universal for that language (not specific to a locale) to the "Global" section, and add locale-specific translations to the corresponding sections. If a locale-specific translation is present, it overrides what is in the "Global" section for users in that locale.

   <img src="../../assets/localization/Locale-Translation.png" width="100%"
   />

You can also add locale-specific translations for your experience source language if they are supported.

   <img src="../../assets/localization/Locale-Source.png" width="100%"
   />

<Alert severity = 'warning'>
If the source language of your experience is English, French, Portuguese, or Spanish, locale-specific translation overrides for experiences names and descriptions are not currently available for these locales:
- English (United States)
- French (France)
- Portuguese (Brazil)
- Spanish (Spain)
</Alert>

#### Add experience information translations

You can modify experience information, such as the name, description, icon, and thumbnails, by updating the localization table:

1. In the localization settings page, click the **Translate** button on the top right.
2. In the **Target Languages** menu on the left, select the target language you want to add a translation to.
3. Select the **Information** tab at the top of the page.

   1. For Name and Description fields, input the desired translation and click **Save**. Note that if you save an empty string here, it will be saved as a manual edit signaling that the text should not be translated. In this case, users in the target language will see the source string.

      <img src="../../assets/localization/Portal-Adding-Information.png" width="100%"
      />

   2. For Icon and Thumbnails, use the Upload or Remove buttons to modify your localized images. You can upload up to 10 thumbnails per experience. When complete, click **Save**.

      <img src="../../assets/localization/Portal-Adding-Information-Thumbnail.png" width="100%"
      />

#### Add experience product translations

You can modify experience product details, such as developer [products](../../production/monetization/developer-products.md), [passes](../../production/monetization/passes.md), and [badges](../../production/publishing/badges.md):

1. In the localization settings page, click the **Translate** button on the top right.
2. In the **Target Languages** menu on the left, select the target language you want to add a translation to.
3. Select the **Products** tab at the top of the page.
4. Input the desired translations for your experience product and click **Save**.

   <img src="../../assets/localization/Portal-Adding-Product.png" width="100%"
   />

### With file upload

Using Studio or Creator Hub, you can download, modify, and re-upload your localization table as a `.csv` spreadsheet. This is helpful when editing several translations at a time or when collaborating with translators outside of Roblox.

Using the file upload process, you can only modify in-experience string entries and translations. Unlike editing translations through your [Translator Portal](#in-translator-portal), modifying the `.csv` allows you to edit the additional **Key**, **Context**, and **Example** fields.

When modifying or adding translations with file upload, the following behavior applies to brand new or existing entries:

<table>
<thead>
  <tr>
    <th>**Does the entry already exist in the Cloud Localization Table?**</th>
    <th>**Changes made to CSV**</th>
    <th>**Expected behavior on upload**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>No</td>
    <td>Source string row added with one or more translations</td>
    <td>Entry is added, any translations present are added as a manual translation entry. Any translations missing for supported languages are eligible for <a href="../../production/localization/automatic-translations.md">automatic translation</a>.</td>
  </tr>
  <tr>
    <td>No</td>
    <td>Source string row added without translations</td>
    <td>Entry is added and is eligible for <a href="../../production/localization/automatic-translations.md">automatic translation</a>.</td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Translation added or modified.</td>
    <td>If the translation is different than the one in the existing Cloud Localization Table, translation updates to the one in the `.csv` file. <br /><br />If the original translation was automatically generated, the new translation is added and locked as a manual translation. You can regenerate automatic translation for this entry by <a href="../../production/localization/automatic-translations.md#automatic-translation-updates">unlocking the entry in Translator Portal.</a></td>
  </tr>
  <tr>
    <td>Yes</td>
    <td>Translation entry for a source string removed.</td>
    <td>Translation is deleted and locked as a manual translation. You can regenerate automatic translation for this entry by <a href="../../production/localization/automatic-translations.md#automatic-translation-updates">unlocking the entry in Translator Portal</a>.</td>
  </tr>

  <tr>
    <td>Yes</td>
    <td>Source string removed</td>
    <td>No change - entry will not be deleted. <br /><br />To delete an entry through `.csv`, either: <br />
     — In Creator Hub, use **Delete Table** and then **Upload CSV**.<br />
     — In Studio, use **Advanced** ⟩ **Replace** in the Cloud Localization Table section.</td>
  </tr>
</tbody>
</table>

<Alert severity = 'info'>
To begin adding a new supported language, you need to manually add the country code as a new column in the spreadsheet. See <a href="./language-codes.md">Language Codes</a> for a list of supported languages and country codes.
</Alert>

<Alert severity = 'warning'>
<AlertTitle>Ensure your spreadsheet meets the following requirements to prevent uploading or processing issues:</AlertTitle>
<br />

<ul>
<li>Max total entries: **10,000**</li>
<li>Max `.csv` file size: **2MB**</li>
<li>Max number of modified or added entries per `.csv` upload: **1,000**</li>
</ul>
</Alert>

#### With Creator Hub

To translate text using the `.csv` in Creator Hub:

1. In the Creator Hub, navigate to your experience settings page.
2. Navigate to **Localization** and switch to the **Table Management** tab.
3. Select **Download CSV** to save the `.csv` file locally.
4. Open the `.csv` in your preferred spreadsheet editor.
5. Add translations on the same row as the source text, under the column with the specific country code you are localizing to. Save when finished.
6. Select **Upload CSV** and upload the updated `.csv`.
7. Click **Confirm** on the prompt to save the new entries to the cloud localization table.

#### With Studio

To translate text using the `.csv` through Studio:

1. In Studio, open **Localization Tools** from the **Window**&nbsp;⟩ **Localization** menu.
2. In the **Cloud Localization Table** section, select **Download** to save the `.csv`.
3. Open the `.csv` in your preferred spreadsheet editor.
4. Add translations on the same row as the source text, under the column with the specific country code you are localizing to. **Save** when finished.
5. In the **Cloud Localization Table** section, select **Update** and upload the updated `.csv`.
6. Click **Confirm** on the prompt to save the new entries to the cloud localization table.
