---
title: Automatic translation
description: Roblox's easy to use automatic translation features allow you to quickly begin supporting various language translations on any experience.
---

**Automatic translation** is a tool that automatically collects and translates strings in your experience. This tool is available on any experience and allows you to immediately begin displaying translated strings in your experience and broadening your potential audience.

## How automatic translation works

Automatic translation works by first [collecting strings](#enable-automatic-text-capture) encountered within the experience, either through testing or playing. Once these strings are captured, Roblox automatically translates the strings on your experience's localization table.

After collecting these strings, you can [enable translations](#enable-translations) for your experience to automatically display the captured strings for users who have their default language settings set to the translated language.

Automatic translation only provides automated translations for blank entries on the localization table and doesn't override any existing translations, including any [manual translations](../localization/manual-translations.md) made by a developer or translator. For example, if you manually clear a translation for an entry, the tool assumes that you don't want to translate that entry.

## Enable automatic text capture

Automatic Text Capture (ATC) captures text strings from UI elements in your experience and adds them to your translation table. When enabled, the ATC tool adds text from UI elements encountered by users within your experience or during Studio testing.

ATC evaluates over time which strings should be added to your translation table, so it may take up to a few days for new strings to appear in Translator Portal after users encounter them. If you require strings to be captured immediately, you can use the [Studio text capture process](#text-capture-in-studio).

ATC only captures text objects that have `Class.GuiBase2d.AutoLocalize|AutoLocalize` enabled. If you do not want ATC to collect a certain text string, such as a name or unique text entry, disable this property. Note that for `Class.TextBox` objects, only `Class.TextBox.PlaceholderText|PlaceholderText` is captured; the assumption is that strings in `Class.TextBox.Text|Text` were provided by the player.

To enable Automatic Text Capture:

1. In localization settings, navigate to **Settings**.
2. Enable **Capture text from experience UI while users play**.

   <img src="../../assets/localization/Portal-Enable-ATC.png"
   width="800" alt="The Localization Settings section highlighting the toggle for Capture text from Experience UI while users play."/>

<Alert severity="info">
ATC can not capture some experience objects. These objects may require special handling with <a href="./localize-with-scripting.md">localization scripts</a>. The current exemptions are:
<ul>
<li>The default Roblox leaderboards and chat</li>
<li>Items or tools owned by a player</li>
<li>Images with embedded text</li>
<li>Badge names and descriptions pulled from the platform</li>
<li>Pass names and descriptions pulled from the platform</li>
</ul>
</Alert>

### Text capture in Studio

There may be situations in which you need to immediately capture strings to your translation table. In these cases, you can use the text capture tool in Studio to capture strings while playtesting. These strings will be added to the localization table within 1–2 minutes of encountering them.

To enable text capture in Studio:

1. In Studio, open **Localization Tools** from the **Window**&nbsp;⟩ **Localization** menu.
2. Enable **Automatic Text Capture**.

   <img src="../../assets/localization/ATC-Studio-Enabled.png" width="45%" alt="The in-Studio localization tool showing ATC toggle enabled." />

Studio text capture stays on if you start and stop playtesting within the same Studio session, but must be enabled again when you start a new Studio session.

### Automatic cleanup

ATC also checks your experience for strings that no longer exist, such as usernames or strings related to a past event. By default, the tool will remove these stale entries when it identifies them. Only auto-scraped strings with automatic translations will be removed; strings that were manually added or that have manual translations will not be impacted.

If you do not want ATC to clean up your localization table, navigate to your localization settings and disable the second ATC toggle:

<img src="../../assets/localization/Portal-Enable-ATC-Auto.png" width="100%" alt="The Localization Settings section highlighting the toggle for enabling Roblox to remove stale entries." />

## Enable translations

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

### Automatic translation quotas

Roblox has initial and monthly quotas for automatic translation. The initial quota determines how many string entries you can translate when you localize your experience for the first time. After you use up the initial quota, any subsequent translations come from your monthly quota, which resets every month.

You can track your automatic translation quota usage on your experience's localization page:

<img src="../../assets/localization/Automatic-Translation-Quotas.png"
     width="800" alt="The Localization Languages section depicting the Automatic Translation Quotas at the top of the page, including the date of the monthly quota renewal." />

Quotas are calculated on a **per-character** and **per-language basis**. For example, translating the source string "hello" into all 15 automatic translation-supported languages will count as 5×15 (75) characters towards your quota.

### Automatic translation updates

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

## Supported languages

Roblox supports automatic translation between the languages listed below. Currently, Roblox Translate will always assume that source strings are in the [experience source language](./index.md#setting-source-language).

<table>
<thead>
  <tr>
    <th>Currently supported languages for automatic translation</th>
  </tr>
</thead>
<tbody>
    <tr>
    <td>Arabic</td>
  </tr>
  <tr>
    <td>Chinese (Simplified)</td>
  </tr>
  <tr>
    <td>Chinese (Traditional)</td>
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
    <td>Polish</td>
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
    <td>Vietnamese</td>
  </tr>
</tbody>
</table>
