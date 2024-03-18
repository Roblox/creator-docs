---
title: Creator Store
description: The Creator Store is where you can find all assets for public use in your experiences.
---

The **Creator Store** is where you can find all assets that are made by Roblox and the Roblox community for the Roblox community to use within their experiences, such as models, images, meshes, audio, fonts, videos, and plugins.

You can create and publish models, images, meshes, and plugins to the Creator Store for others to use as long as you are the original creator, and it adheres to Roblox's [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846). If you have a [seller account](./selling-on-the-creator-store.md), you can also sell your plugins to other creators.

<Alert severity="warning">
To maintain community safety, Roblox may terminate accounts that publish spam or assets with malicious or obfuscated code.
</Alert>

## Asset Moderation

Roblox performs both human and automated asset moderation on a proactive and reactive basis to ensure assets adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), and [Digital Millennium Copyright Act](../../production/publishing/dmca-guidelines.md) (DMCA). If any asset violates these moderation policies, such as including discriminatory or adult content, the Moderation team flags and removes the asset to protect users from harmful or non-compliant content. This process generally happens within a few hours after you upload the asset.

In addition, the Creator Store restricts use of the following practices to ensure asset safety:

- **Obscuring engine features within scripts**, including LuaVMs, `Global.LuaGlobals.getfenv`, and `Global.LuaGlobals.setfenv`.
- **Requiring remote assets,** including `Global.RobloxGlobals.require(assetId)`, `Global.LuaGlobals.loadstring`, `Class.InsertService.LoadAsset`, and `Class.ModuleScript.LinkedSource`. Assets that may look useful on the surface could load another "virus" asset at runtime.
- **Including obfuscated code**. For publicly-shared assets, it's important for creators to understand what they are putting into their experiences. If code is obfuscated, creators cannot trust that the script is only doing what it should be doing.

<Alert severity="info">
These requirements only apply to assets on the Creator Store, **not** private models or scripts inside experiences.
</Alert>

## Opening Creator Store

To open the Creator Store:

1. Navigate to the **View** tab of the menu bar in Studio.
2. Select **Toolbox**. The [Toolbox](../../projects/assets/toolbox.md) window displays with the **Creator Store** tab open.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

## Finding Assets

With millions of assets available, it's helpful to narrow the search results to find exactly what you are looking for. To find a specific asset:

1. In the top-left corner within the **Creator Store** tab, select the filter dropdown and choose an asset filter category.

2. **(Optional)** In the top-right corner, select the filter icon. The **All Views** and **Creator** filter display.

   1. To view an individual creator's assets, enter a specific creator's username within the **Search for users** field.
   2. Click the **Apply** button.

3. In the **Search** field, type what you want to find and select the search icon.

The Creator Store curates a selection of assets according to your filters.

<img src="../../assets/studio/toolbox/Model-Search-Example.png" width="360" />

### Community Ratings

In addition to the Creator Store's filters, you can view an asset's community approval when you hover over its tile. There are four asset community ratings:

- **Gray** - The asset has minimal data for the Creator Store to determine community confidence.
- **Red** - The asset has low community confidence.
- **Yellow** - The asset has moderate community confidence.
- **Green** - The asset has high community confidence.

### Trusted Reviews

Users can now leave reviews on Creator Store assets in addition to the currently available thumbs up or down ratings. To improve reliability and ensure authentic feedback, only users that acquire the asset are able to submit reviews. After submitting a review:

- Asset creators can respond to reviews, closing the feedback loop.
- The community can mark reviews as helpful for future users.

## Adding Assets to Experiences

To add assets to your experience from the Creator Store:

1. Find the asset you want to add to your experience.

2. Either click the asset or drag-and-drop it from the Toolbox into the viewport.

   - If your asset is a model or mesh, it displays both in the viewport and the **Explorer** window.
   - If your asset is an image, video, or audio file, it displays in the **Explorer** window.
   - If your asset is a plugin, it displays in the **Plugins** tab of the menu bar.
   - If your asset is a font, it displays in your font library within user interface elements, such as [labels](../../ui/labels.md) or [buttons](../../ui/buttons.md), as well as the **Inventory** tab of the [Toolbox](../../projects/assets/toolbox.md).

### Disabling Scripts

Some assets include scripts that allow the asset to perform specific actions, such as animating at runtime or triggering a sound when a user interacts with the asset. However, if you want to add an asset to your experience without allowing any of its scripts to trigger, you can disable the scripts within the asset.

To disable scripts:

1. In the **Explorer** window, right-click on the asset with scripts you want to disable. A contextual menu displays.

2. Select **Disable Scripts**.

## Publishing and Selling Assets

[Publishing assets](../../production/publishing/publishing-assets.md) to the Creator Store is the only way to make your assets publicly available to all creators to use within their own experiences in Studio. You can publish any mesh or image that you have imported through the [Asset Manager](../../projects/assets/manager.md), or any [model](../../parts/models.md) or [plugin](../../studio/plugins.md) that you have uploaded to your inventory.

<Alert severity="warning">

In the spring of 2024, creators will be able to sell plugins on the Creator Store for **United States Dollars** (USD) and receive a significantly higher revenue share, as Roblox will only deduct taxes and payment processing fees.

Any plugin **without USD pricing** will be **taken off sale** when USD pricing launches. If you have any plugins currently on sale for Robux, ensure you set up a seller account and add USD pricing for your plugins now. For more information, see [Selling on the Creator Store](../publishing/selling-on-the-creator-store.md).

</Alert>

## Verifying Your Account

In addition to being able to publish more of each asset type, verifying your account ensures that your assets are visible to creators, as the default option for discoverability for assets on the Creator Store is reserved for verified accounts. In order to verify your account, you must:

- Be at least 13 years of age.
- Have a government-issued photo ID with your picture on it, such as a driver's license, passport, or residency permit.
- Have a mobile device with a camera that can take photos of your face and ID.

For information on how to verify your account either through a government-issued ID or through a phone number, see [Account Verification](../../production/publishing/account-verification.md).

<Alert severity="warning">

**Phone number verification is no longer sufficient** to sell paid assets on the Creator Store. Even if your account is verified by phone number, you still need to verify with a [government ID](account-verification.md#verifying-through-government-id) and create a seller account ahead of the launch of USD pricing in the spring of 2024. For more information, see [Selling on the Creator Store](./selling-on-the-creator-store.md).

</Alert>
