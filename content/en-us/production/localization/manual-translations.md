---
title: Manual translations
description: Learn how to manually add, edit, and remove entries to your experience's cloud localization table.
---

When localizing your content, you might need to manually modify your localization table to improve translation quality, add context for when a translation should be used, or even remove unused translation entries.

Whether you have translation entries automatically captured or manually added, all the translation entries are saved to the [cloud localization table](#cloud-localization-table). To modify the localization table, you can perform the following actions:

- [Add source content](./add-source-content.md) to the table, either manually or automatically.
- [Remove content](./remove-content.md) from the table, such as usernames or other strings that shouldn't be translated.
- [Add translations](./add-translations.md) to entries in the table for any supported languages set in your experience.

Before making any changes to your table, it's important to understand each field in the [cloud localization table](#cloud-localization-table) to prevent issues or conflicts.

## Cloud localization table

The localization table is the reference for all translations within your experience. It's important to understand each field of the localization table to effectively add or modify entries.

When populated, the table contains all user-facing content within your experience that requires translation along with any available translations for specific languages. You can [add source content](./add-source-content.md) and [add translations](./add-translations.md) to the Cloud Localization Table or [download and upload a `.csv` version of your table](./add-translations.md#with-file-upload). Only users who have edit permission for an experience can access an experience's localization table.

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
