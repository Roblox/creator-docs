---
title: Manually edit localization table
description: Learn how to manually add, edit, and remove entries to your experience's cloud localization table.
---

When localizing your content, you might need to manually modify your localization table to improve translation quality, add context for when a translation should be used, or even remove unused translation entries.

Whether you have translation entries automatically captured or manually added, all the translation entries are saved to the [cloud localization table](#cloud-localization-table). To modify the localization table, you can perform the following actions:

- [Add source content](#add-source-content) to the table, either manually or automatically.
- [Remove content](#remove-content-from-localization-table) from the table, such as usernames or other strings that shouldn't be translated.
- [Add translations](#add-translations) to entries in the table for any supported languages set in your experience.

Before making any changes to your table, it's important to understand each field in the [cloud localization table](#cloud-localization-table) to prevent issues or conflicts.

## Cloud localization table

The localization table is the reference for all translations within your experience. It's important to understand each field of the localization table to effectively add or modify entries.

When populated, the table contains all user-facing content within your experience that requires translation along with any available translations for specific languages. You can [add source content](#add-source-content) and [add translations](#with-file-upload) to the Cloud Localization Table or [download and upload a `.csv` version of your table](#with-file-upload). Only users who have edit permission for an experience can access an experience's localization table.

The localization table has the following columns:

<table>
<thead>
  <tr>
    <th>Column</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Source</td>
    <td>A required field containing the in-experience source text strings gathered by automatic text capture or manual entry. This is the source text that you intend to translate to other languages. Source text is required before you can add a translation and multiple entries can share the same Source, as long as they have unique **Context** fields. <br /> <br />If you are translating dynamic content, such as partial strings, the Source field must follow one of the supported parameter formats described in [Translate dynamic content](../../production/localization/translate-dynamic-content.md). </td>
  </tr>
  <tr>
    <td>Context</td>
    <td>
    An optional field containing a reference to the in-experience object containing the source text. You can use the Context field to specify which translation Roblox displays on an object. See <a href="../../production/localization/localize-with-scripting.md#use-context-overrides">Using Context Overrides</a> for more details. <br /> <br /> The Automatic Text Capture system does not auto-fill the Context field and instead populates the **Location** field with similar information.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>An optional field containing any additional information about an entry you may want to include as notes for translators. You can use this field to show manual translators where and when your experience uses a specific translation.</td>
  </tr>
  <tr>
    <td>Key</td>
    <td>
    An optional field for implementing `Class.Translator:FormatByKey()|key-based lookup` when using localization APIs. You can leave this field empty if you are not using <a href="./localize-with-scripting.md">localization APIs</a> for specific tasks, such as localizing images and sounds.
    </td>
  </tr>
  <tr>
    <td>Location</td>
    <td>
    A field that is auto-filled by the [Automatic Text Capture](#automatic-text-capture) system. It contains a reference to the in-experience object containing the source text which can help you or a translator identify where the string is being encountered in your experience. This field is either blank or populated by the Automatic Text Capture System. To manually add your own object reference, use the **Context** field.
    </td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
Some fields in the localization table must be unique to avoid unexpected behavior. Keep in mind the following:

- For all entries, the **Source** field must not be empty.
- No two entries can share the same **Source and Context** values.
- No two entries can share the same **Key**.

</Alert>

## Add source content

You must add source text to translate to the experience's localization table before you or any collaborators add translations. You can use [Automatic Text Capture](#automatic-text-capture) to collect text strings automatically as your experience is played by users or [manually add text sources](#manually-add-source-content).

See [Localizing images and sounds](./localize-with-scripting.md#localize-images-and-sounds) for instructions on localizing non-text content.

### Automatic Text Capture

The **Automatic Text Capture (ATC)** tool collects text strings that users encounter in your experience through GUI objects, such as `Class.TextLabel|TextLabels` or `Class.BillboardGui` and is usually the fastest way to collect translatable text from your experience. In many cases, the Automatic Text Capture tool is already enabled for [automatic translations](../localization/automatic-translations.md#enable-automatic-text-capture).

### Manually add source content

You can also add content manually. This is recommended if your experience contains text that doesn't appear during typical gameplay, like a complex conversation tree, which may take longer to collect via ATC. You can add entries to the table [in the localization page](#add-sources-with-localization-settings) or [with a `.csv` file upload](#add-sources-with-file-upload). It is recommended to use the `.csv` upload if you want to specify an entry's Key, Context, or Example fields.

<Alert severity ='warning'>
Entries in the localization table are case-sensitive.

For example, when using "hello" as a source value on the localization table, Roblox does not apply translations for "Hello" or "HELLO".
</Alert>

You can manually add image and sound asset IDs to the localization table with a `.csv` upload. For more information see [Localize images and sounds](./localize-with-scripting.md#localize-images-and-sounds).

#### Add sources with localization settings

You can add source content in the [localization page](../localization/index.md#localization-settings). This is ideal for making quick additions to your localization table.

To add source content through the localization page:

1. In your experience's localization page, click the **Translate** button on the top right.

   <img src="../../assets/localization/Portal-Translate.png"
   width="100%" />

2. Select the **Strings** tab.
3. Click **Add Entry**.
4. In the **Text to translate** field, input the source text and click **Save**.

   <img src="../../assets/localization/Portal-Add-Source-String.png"
   width="100%" />

5. If you are using key-based scripting to translate a string, input the key name in the **Key** field.
6. If the string has multiple meanings, such as a character's back and a back button, input the full path of the specific text object in the **Context** field.
7. Click **Save**.

#### Add sources with file upload

You can add source content to your localization table with a `.csv` upload. You can use this option when making large numbers of updates to your localization table.

To add source content through the `.csv` upload:

1. In Studio, open **Localization Tools** from the **Window**&nbsp;⟩ **Localization**
2. In the **Cloud Localization Table** section, select **Download** to save the `.csv`.
3. Open the `.csv` in your preferred spreadsheet editor.
4. Under the **Source** column, add source text and save. You can leave the other columns blank.

      <table>
   <thead>
     <tr>
       <th>Key</th>
       <th>Context </th>
       <th>Example</th>
       <th>Source</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td></td>
       <td></td>
       <td></td>
       <td>Options</td>
     </tr>
     <tr>
       <td></td>
       <td></td>
       <td></td>
       <td>Start</td>
     </tr>
   </tbody>
   </table>

5. In Studio, in the **Cloud Localization Table** section, select **Update** and upload the new `.csv` file.
6. Click **Confirm** on the **Confirm Upload** prompt to save the new entry to the cloud localization table.

## Remove content from localization table

If you find source content that is wrong or no longer needed in your localization, you can remove this content by either clearing all entries collected via ATC or manually removing source content. When you remove source content, you also remove any associated translations.

### Clear unmodified auto-captured entries

You might want to remove some auto-captured entries if the ATC tool collects strings that shouldn't be translated, such as usernames, user-generated names, or chat strings. This option only clears auto-captured entries that you haven't manually edited.

To clear unmodified auto-captured entries:

1. In your experience's localization page, click **Settings**.
2. Select which time period you would like to clear strings from in the dropdown list. This clears all entries that were auto-captured from the specified time period.
3. Click the **Clear** button.

   <img
   src="../../assets/localization/Portal-Clear-Strings.png"
   width="80%" />

### Manually remove source content

You can also remove entries manually. This is recommended if you have specific entries you want to remove or if the entries you want to remove were manually modified in any way, such as content that is added manually or ATC entries that have been manually edited.

To remove source content through the localization table on Creator Dashboard:

1. In your experience's localization page, click the **Translate** button on the top right.
2. Select **Game Strings**.
3. Click the entry you would like to remove in the **Strings** column.
4. Click the trash can icon to the right of the 'Text to translate' section.
5. Click the **Delete** button in the confirmation dialog.

   <img
   src="../../assets/localization/Portal-Manually-Remove.png"
   width="80%" />

To remove source content through a `.csv` upload:

1. In Studio, open **Localization Tools** from the **Window**&nbsp;⟩ **Localization** menu.
2. In the **Cloud Localization Table** section, select **Download** to save the `.csv`.
3. Open the `.csv` in your preferred spreadsheet editor.
4. Delete the entire row for any entries you would like to remove, and save.
5. In Studio, in the **Cloud Localization Table** section, select **Update** and upload the new `.csv` file.
6. Click **Confirm** on the **Confirm Upload** prompt to save the new entry to the cloud localization table.

## Add translations

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

#### Add experience information translations

You can modify experience information, such as the name, description, icon, and thumbnails, by updating the localization table:

1. In the localization settings page, click the **Translate** button on the top right.
2. In the **Target Languages** menu on the left, select the target language you want to add a translation to.
3. Select the **Information** tab at the top of the page.

   1. For Name and Description fields, input the desired translation and click **Save**.

      <img src="../../assets/localization/Portal-Adding-Information.png" width="100%"
      />

   2. For Icon and Thumbnails, use the Upload or Remove buttons to modify your localized images. You can upload up to 10 thumbnails per experience. When complete, click **Save**.

      <img src="../../assets/localization/Portal-Adding-Information-Thumbnail.png" width="100%"
      />

#### Add experience product translations

You can modify experience product details, such as developer [products](../../production/monetization/developer-products.md), [game passes](../../production/monetization/game-passes.md), and [badges](../../production/publishing/badges.md):

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
