---
title: Automatic Translation
description: Roblox's easy to use automatic translation features allow you to quickly begin supporting various language translations on any experience.
---

**Automatic translation** is a tool that automatically collects and translates strings in your experience. This tool is available on any experience and allows you to immediately begin displaying translated strings in your experience and broadening your potential audience.

## How Automatic Translation Works

Automatic translation works by first [collecting strings](#enable-automatic-text-capture) encountered within the experience, either through testing or playing. Once these strings are captured, Roblox automatically translates the strings on your experience's localization table.

After collecting these strings, you can [enable translations](#enabling-translations) for your experience to automatically display the captured strings for users who have their default language settings set to the translated language.

Automatic translation only provides automated translations for blank entries on the localization table and doesn't override any existing translations, including any [custom translations](../localization/custom-translations.md) made by a developer or translator. For example, if you manually clear a translation for an entry, the tool assumes that you don't want to translate that entry.

## Enable Automatic Text Capture

Automatic Text Capture (ATC) captures text strings from UI elements in your experience and adds them to your translation table. When enabled, the ATC tool adds text from UI elements encountered by users within your experience or during Studio testing.

ATC evaluates over time which strings should be added to your translation table, so it may take up to a few days for new strings to appear in Translator Portal after users encounter them.

To enable Automatic Text Capture:

1. In localization settings, navigate to **Settings**.
2. Enable **Capture text from experience UI while users play**.

   <img src="../../assets/localization/Portal-Enable-ATC.png"
   width="800" alt="The Localization Settings section highlighting the toggle for Capture text from Experience UI while users play."/>

ATC adds text strings to the localization table within 1-2 minutes of encountering the text in the experience. If you do not want ATC to collect a certain text string, such as a name or unique text entry, disable the `Class.GuiBase2d.AutoLocalize|AutoLocalize` property of the text object.

<Alert severity="info">
ATC can not capture some experience objects. These objects may require special handling with <a href="./localizing-with-scripting.md">localization scripts</a>. The current exemptions are:
<ul>
<li>The default Roblox leaderboards and chat </li>
<li>Items or tools owned by a player </li>
<li>Images with embedded text</li>
<li>Badge names and descriptions pulled from the platform</li>
<li>Game Pass names and descriptions pulled from the platform.</li>
</ul>
</Alert>

### Automatic Cleanup

ATC also checks your experience for strings that no longer exist, such as usernames or strings related to a past event. By default, the tool will remove these stale entries when it identifies them. Only auto-scraped strings with automatic translations will be removed; strings that were manually added or that have manual translations will not be impacted.

If you do not want ATC to clean up your localization table, navigate to your localization settings and disable the second ATC toggle:

<img src="../../assets/localization/Portal-Enable-ATC-Auto.png" width="100%" alt="The Localization Settings section highlighting the toggle for enabling Roblox to remove stale entries." />

## Enabling Translations

Once strings are captured to your localization table, follow these steps to enable translated content:

1. In your experience's localization page, navigate to **Settings**.
2. Enable **Use Translated Content**.

   <img src="../../assets/localization/Portal-Use-Translated-Content.png"
   width="800" alt="The Localization Settings section highlighting the toggle for enabling Roblox to use translated content in the experience." />

3. Navigate to the **Languages** tab.
4. Enable any supported languages for automatic translations.

   - **Experience Information** refers to the name and description of your experience.
   - **Experience Strings & Products** refers to the text that appears within your experience.

   <img src="../../assets/localization/Portal-Automatic-Translation.png"
     width="800" alt="The Localization Languages section highlighting the per-language toggles for automatic translation." />

### Automatic Translation Quotas

Roblox has initial and monthly quotas for automatic translation. The initial quota determines how many string entries you can translate when you localize your experience for the first time. After you use up the initial quota, any subsequent translations come from your monthly quota, which resets every month.

You can track your automatic translation quota usage on your experience's localization page:

<img src="../../assets/localization/Automatic-Translation-Quotas.png"
     width="800" alt="The Localization Languages section depicting the Automatic Translation Quotas at the top of the page, including the date of the monthly quota renewal." />

Quotas are calculated on a **per-character** and **per-language basis**. For example, translating the source string "hello" into all 15 automatic translation-supported languages will count as 5 x 15 = 75 characters towards your quota.

### Automatic Translation Updates

As the automatic translation tool improves, more accurate translations may become available for existing strings. When these updates become available, Roblox refreshes any automatic translations. Automatic translation updates will appear in your translation history.

<img src="../../assets/localization/Update-Log.png"
     width="800" alt="A translation history log displays at the bottom of each translation entry."/>

If you have a specific translation that you want to remain unchanged, you can lock the entry to ensure it will not be impacted by any updates.

<img src="../../assets/localization/Lock-Translations.png"
     width="800" alt="A 'Lock translation from automatic updates' toggle is accessible below the translation entry field in each translation entry."/>

<Alert severity = 'warning'>
By locking an entry, you are approving the translation and turning it into a manual entry. This means it will not be impacted by any automatic translation updates, including safety-related updates. If, in the future, it is discovered that the translation violates policy, your experience will still be subject to moderation.
</Alert>

By default, manually added strings and strings with manual translations are locked. If you unlock an entry, it will be impacted by both automatic translation updates and ATC if it is enabled. If you want to generate a new automatic translation for a previously changed or cleared translation, unlock the entry.

## Supported Languages

Roblox supports automatic translation between the languages listed below. Currently, Roblox Translate will always assume that source strings are in the [experience source language](./index.md#setting-source-language).

<table>
<thead>
  <tr>
    <th>Currently Supported Languages for Automatic Translation</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Chinese - Simplified</td>
  </tr>
  <tr>
    <td>Chinese - Traditional</td>
  </tr>
   <tr>
    <td>English</td>
  </tr>
  <tr>
    <td>French</td>
  </tr>
  <tr>
    <td>German</td>
  </tr>
  <tr>
    <td>Indonesian</td>
  </tr>
  <tr>
    <td>Italian</td>
  </tr>
  <tr>
    <td>Japanese</td>
  </tr>
  <tr>
    <td>Korean</td>
  </tr>
  <tr>
    <td>Portuguese</td>
  </tr>
  <tr>
    <td>Russian</td>
  </tr>
  <tr>
    <td>Spanish</td>
  </tr>
  <tr>
    <td>Thai</td>
  </tr>
  <tr>
    <td>Turkish</td>
  </tr>
  <tr>
    <td>Polish</td>
  </tr>
  <tr>
    <td>Vietnamese</td>
  </tr>
</tbody>
</table>
