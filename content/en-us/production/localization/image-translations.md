---
title: Image translations
description: Automatically translate images containing text in your game while matching the style of the original text.
---

<Alert severity="warning">
Image translation is currently in beta. Functionality and availability are subject to change.
</Alert>

**Image translation** automatically translates images containing text in your game, matching the style of the original text as closely as possible. This lets you localize signs, UI graphics, and other text-in-image content without manually creating a version for every supported language.

## How image translation works

Roblox's image translation system is trained to match the font size, style, and color of the original text as closely as possible in the translated image. Any non-text elements in the image remain exactly the same.

For example, the following signs keep their original color, font style, and layout in both the source and translated image:

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/localization/Image-Translation-Example-Cash-English.png" />
    <figcaption>English (Source)</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Image-Translation-Example-Cash-Korean.png" />
    <figcaption>Korean</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Image-Translation-Example-Ice-Cream-English.png" />
    <figcaption>English (Source)</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Image-Translation-Example-Ice-Cream-Spanish.png" />
    <figcaption>Spanish</figcaption>
  </figure>
</GridContainer>

We don't yet support all languages for image translation. Only the following languages are currently supported:

- French
- German
- Indonesian
- Italian
- Korean
- Portuguese
- Spanish

Automatic image translation is not turned on by default. You can enable it in your experience's localization settings in Creator Hub, as described in the following section.

## Enable automatic image translation

To start translating images in your game, enable the following three settings in your experience's localization settings.

1. Navigate to the **Languages** tab and enable image translation for each language you want to support.

   <img src="../../assets/localization/Image-Translation-Enable-Per-Language.png"
   width="800" alt="The Localization Languages section showing the option to turn on auto translation for experience images for a language." />

2. Navigate to the **Settings** tab and enable **Automatic Image Capture**. This allows Roblox to automatically detect which images in your game contain text and need to be translated.

   Once enabled, Roblox adds eligible images to your localization table when players encounter them in your game. Image translation isn't immediate — it can take up to a few days for images to be captured and for translations to be generated.

   <img src="../../assets/localization/Image-Translation-Automatic-Image-Capture.png"
   width="800" alt="The Localization Settings section highlighting the Automatic Image Capture toggle." />

3. In the **Settings** tab, enable **Use Translated Content** for images to show translated images to players live. If you want to preview translated images in Creator Hub before players see them, leave this setting off until you've reviewed the translations and are ready for them to be displayed.

   <img src="../../assets/localization/Image-Translation-Use-Translated-Content.png"
   width="800" alt="The Localization Settings section highlighting the Enable translated image in experience toggle." />

## Manage translated images

Images that have been added to your localization table appear in the **Images** tab of the Translation page. To get there, navigate to your game's localization page and select **Translate**.

<img src="../../assets/localization/Image-Translation-Translate-Button.png"
width="800" alt="The Localization Languages section highlighting the Translate button." />

Select the **Images** tab to see a side-by-side comparison of the source and translated image for each entry in your localization table.

<img src="../../assets/localization/Image-Translation-Images-Tab.png"
width="800" alt="The Translation page Images tab showing a side-by-side comparison of a source image and its translated image." />

If there's a translation you don't like, you can disable it by turning off the `Class.GuiBase2d.AutoLocalize|AutoLocalize` property for that image in Studio. You can also leave feedback on a translation you don't like by clicking the icon at the bottom right of the translated image.

<img src="../../assets/localization/Image-Translation-Feedback-Icon.png"
width="800" alt="The Translation page Images tab highlighting the feedback icon in the bottom right of a translated image." />
