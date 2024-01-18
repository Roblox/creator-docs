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

Automatic Text Capture (ATC) captures text strings from UI elements in your experience and adds them to your translation table. Once added, you can enable translations per language and Roblox's automatic translation will generate translated text on those captured strings.

<Alert severity="warning">
In Studio, ATC will only work in **Team Test** mode and not in **Play Solo** mode.
</Alert>

You can enable automatic string capture with the following steps:

1. In localization settings, navigate to **Settings**.
2. Enable **Capture text from experience UI while users play**.

   <img src="../../assets/localization/Portal-Enable-ATC.png"
   width="800" />

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

### Daily Updates

ATC also checks your experience on a daily basis for new strings and strings that no longer exist, such as usernames or strings related to a past event. The tool updates the localization table and adds or removes entries accordingly. The ATC only removes auto-scraped strings with automatic translations and ignores strings that were manually added or that have manual translations.

If you do not want ATC to perform daily updates, navigate to your localization settings and disable the second ATC toggle:

<img src="../../assets/localization/Portal-Enable-ATC-Auto.png" width="100%" />

## Enabling Translations

Once strings are captured to your localization table, follow these steps to enable translated content:

1. In your experience's localization page, navigate to **Settings**.
2. Enable **Use Translated Content**.

   <img src="../../assets/localization/Portal-Use-Translated-Content.png"
   width="800" />

3. Navigate to the **Languages** tab.
4. Enable any supported languages for automatic translations.

   - **Experience Information** refers to the name and description of your experience.
   - **Experience Strings & Products** refers to the text that appears within your experience.

   <img src="../../assets/localization/Portal-Automatic-Translation.png"
     width="800" />

<Alert severity="info">
Roblox has initial and monthly quotas for automatic translation. The quotas determine how many string entries you can translate per language. The initial quota determines to how many string entries you can translate via automatic translations when you localize your experience for the first time. After you use up the initial quota, any subsequent translations come from your monthly quota, which resets every month.
</Alert>

## Supported Languages

Roblox supports automatic translation with the following languages:

<table>
<thead>
  <tr>
    <th>Currently Supported Languages for automatic translation</th>
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
