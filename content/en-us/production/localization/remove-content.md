---
title: Remove content
description: Learn how to manually add, edit, and remove entries to your experience's cloud localization table.
---

If you find source content that is wrong or no longer needed in your localization, you can remove this content by either clearing all entries collected using Automatic Text Capture (ATC) or manually removing source content. When you remove source content, you also remove any associated translations.

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
