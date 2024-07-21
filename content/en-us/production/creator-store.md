---
title: Creator Store
description: The Creator Store is where you can find all assets for public use in your experiences.
---

The **Creator Store** features assets made by Roblox and the Roblox community for the community to use within their experiences, including models, images, meshes, audio, fonts, videos, and plugins.

You can create and distribute models, images, meshes, plugins, and audio sound effects under 10 seconds to the Creator Store for others to use as long as you are the original creator, and it adheres to Roblox's [Community Rules][CommunityRulesURL] and [Terms&nbsp;of&nbsp;Use][TermsUseURL]. If you have a [seller account](./selling-on-creator-store.md), you can also sell your plugins to other creators.

<Alert severity="warning">
To maintain community safety, Roblox may terminate accounts that publish spam or assets with malicious or obfuscated code.
</Alert>

## Asset Moderation

Roblox performs both human and automated asset moderation on a proactive and reactive basis to ensure assets adhere to the [Community Rules][CommunityRulesURL], [Terms&nbsp;of&nbsp;Use][TermsUseURL], and [Digital Millennium Copyright Act](../production/publishing/dmca-guidelines.md) (DMCA). If any asset violates these moderation policies, such as including discriminatory or adult content, the moderation team flags and removes the asset to protect users from harmful or non-compliant content. This process generally happens within a few hours after you upload the asset.

In addition, the Creator Store **restricts** use of the following practices to ensure asset safety:

- **Obscuring engine features within scripts**, including LuaVMs, `Global.LuaGlobals.getfenv()`, and `Global.LuaGlobals.setfenv()`.
- **Requiring remote assets,** including `Global.RobloxGlobals.require(assetId)`, `Global.LuaGlobals.loadstring()`, `Class.InsertService:LoadAsset()`, and `Class.ModuleScript.LinkedSource`. Assets that may look useful on the surface could load another "virus" asset at runtime.
- **Including obfuscated code**. For publicly-shared assets, it's important for creators to understand what they are putting into their experiences. If code is obfuscated, creators cannot trust that the script is only doing what it should be doing.

<Alert severity="info">
These policies only apply to assets on the Creator Store, **not** private models or scripts inside experiences.
</Alert>

## Opening Creator Store

To open the Creator Store:

1. Navigate to the [View](../studio/view-tab.md) tab of Studio's menu bar.

   <img src="../assets/studio/general/Toolbar-View-Tab.png" width="876" alt="View tab indicated in Studio toolbar" />

2. Select **Toolbox**. The [Toolbox](../projects/assets/toolbox.md) window displays with the **Creator Store** tab open.

   <img src="../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

## Finding Assets

With millions of assets available, it's helpful to narrow the search results to find exactly what you are looking for. To find a specific asset:

1. In the top-left corner within the **Creator Store** tab, select the filter dropdown and choose an asset filter category.

2. **(Optional)** In the top-right corner, select the filter icon. The **All Views** and **Creator** filter display.

   1. To view an individual creator's assets, enter a specific creator's username within the **Search for users** field.
   2. Click the **Apply** button.

3. In the **Search** field, type what you want to find and select the search icon.

The Creator Store curates a selection of assets according to your filters.

<img src="../assets/studio/toolbox/Model-Search-Example.png" width="360" />

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

To add an asset to your experience from the [Toolbox](../projects/assets/toolbox.md), click it or drag‑and‑drop it into the 3D viewport.

- If the asset is a model, mesh, image, video, or audio file, it displays in the [Explorer](../studio/explorer.md) window. Assets with 3D content also display in the 3D viewport.
- If the asset is a plugin, it displays in the [Plugins](../studio/plugins-tab.md) tab of the menu bar.
- If the asset is a font, it displays in your font library within user interface elements such as [text labels](../ui/labels.md) or [buttons](../ui/buttons.md), as well as your [inventory](../projects/assets/toolbox.md#inventory).

<Alert severity="info">
Some assets include scripts that perform specific actions, such as animating at runtime or triggering a sound. If you want to use an asset without allowing any of its scripts to run, right-click the object in the [Explorer](../studio/explorer.md) window and select **Disable&nbsp;Scripts** from the context menu.
</Alert>

## Verifying Your Account

In addition to being able to distribute more of each asset type, verifying your account ensures that you are eligible to distribute audio assets under 10 seconds, and that your assets are visible to creators, as the default option for discoverability for assets on the Creator Store is reserved for verified accounts. In order to verify your account, you must:

- Be at least 13 years of age.
- Have a government-issued photo ID with your picture on it, such as a driver's license, passport, or residency permit.
- Have a mobile device with a camera that can take photos of your face and ID.

For information on how to verify your account either through a government-issued ID or through a phone number, see [Account Verification](../production/publishing/account-verification.md).

<Alert severity="warning">

**Phone number verification is not sufficient** to sell priced assets on the Creator Store. To sell priced assets, you need to verify with a [government ID](account-verification.md#verifying-through-government-id) and create a seller account. For more information, see [Selling on the Creator Store](./selling-on-creator-store.md).

</Alert>

## Distributing and Selling Assets

Distributing to the Creator Store is the only way to make your assets publicly available to all users to use within their own experiences in Studio. You can distribute any mesh or image that you have imported through the [Asset Manager](../projects/assets/manager.md), or any [model](../parts/models.md), [plugin](../studio/plugins.md), or [audio asset](../sound/assets.md) sound effect under 10 seconds that you have uploaded to your inventory.

Every asset that you import must adhere to the [Community Rules][CommunityRulesURL] and [Terms&nbsp;of&nbsp;Use][TermsUseURL], and respect the [DMCA Guidelines](../production/publishing/dmca-guidelines.md) regarding copyright. In addition, there are limits on the number of assets you can distribute per 30 days, depending on whether you've [verified your account](../production/publishing/account-verification.md):

<table>
<thead>
  <tr>
    <th></th>
    <th>Mesh Assets</th>
    <th>Image Assets</th>
		<th>Model Assets</th>
		<th>Audio Assets</th>
		<th>Plugins</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Verified account</td>
    <td>200</td>
    <td>200</td>
		<td>200</td>
		<th>100</th>
		<td>10</td>
  </tr>
  <tr>
    <td>Unverified account</td>
    <td>10</td>
    <td>10</td>
		<td>10</td>
		<th>10</th>
		<td>2</td>
  </tr>
</tbody>
</table>

You can also choose to **sell** plugins on the Creator Store for **United States Dollars**. Roblox offers a market-leading revenue share for these sales, as only taxes and payment processing fees are deducted. Note that you can only set USD pricing for plugins through the Creator Dashboard. For more information, see [Selling on the Creator Store](./selling-on-creator-store.md).

### Through Creator Dashboard

To distribute an asset through the [Creator Dashboard](https://create.roblox.com/dashboard/creations):

1. In the horizontal navigation, select [Development Items](https://create.roblox.com/dashboard/creations?activeTab=Model). All assets you have [previously imported](../projects/assets/manager.md#importing-assets) display within their respective category.
1. Select the asset that you want to distribute. The asset's **Configure** page displays.
1. In the **Settings** section, enable the **Distribute on Creator Store** toggle.
1. **(Optional)** If you have a [seller account](./selling-on-creator-store.md) and are distributing a plugin, set a price in USD for the asset in the **USD Pricing** field. If you keep the default value of **Free**, the asset will be free to all creators.
1. **(Optional)** If you are [ID or phone verified](../production/publishing/account-verification.md), add up to 5 supplementary thumbnails for your asset.
1. Click the **Save** button.
1. If you are distributing an audio asset for the first time, enable all legal agreements, then click the **Submit** button.

The asset will become public and visible to everyone within the Creator Store, provided it adheres to the [moderation rules](#asset-moderation).

### Through Studio

You can upload assets directly in Studio from the [Toolbox](../projects/assets/toolbox.md) or [Explorer](../studio/explorer.md) window. However, you must complete the process on the [Creator Dashboard](#through-creator-dashboard) to list an asset for sale on the Creator Store, distribute audio assets under 10 seconds, or set a [USD price](./selling-on-creator-store.md) for a plugin.

<Tabs>
<TabItem label="Toolbox">
Assuming the asset is in your [inventory](../projects/assets/toolbox.md#inventory) and you want to distribute it in the Creator Store:

1. In the [Toolbox](../projects/assets/toolbox.md), select the **Creations** tab. All assets you have [previously imported](../projects/assets/manager.md#importing-assets) display within the chosen category.

   <img src="../assets/studio/toolbox/Creations-Tab.png" width="360" />

2. Right-click the asset you'd like to distribute and select **Edit Asset**.
3. In the **Asset Configuration** window that opens, confirm and/or update asset details such as **Title** and **Description**.
4. Click **Save**. Once the asset has uploaded, click the dashboard link formatted as `https://create.roblox.com/dashboard/creations/store/.../configure`.
5. In the browser window that opens, follow the instructions above in [Through Creator Dashboard](#through-creator-dashboard).

</TabItem>
<TabItem label="Explorer">
To upload an asset from the [Explorer](../studio/explorer.md) and distribute it in the Creator Store:

1. In the [Explorer](../studio/explorer.md) hierarchy, right-click the asset you'd like to distribute and select **Save to Roblox...** from the context menu.
2. In the **Asset Configuration** window that opens, confirm and/or update asset details such as **Title** and **Description**. Additionally:

   - For **Content Type**, make sure **Development Item** is selected.
   - For **Asset Category**, select **Model**.

3. If you need to **overwrite** a previously-uploaded asset with a new version, click **Overwrite an existing asset...** in the bottom-left of the configuration window.
4. Click **Save**. Once the asset has uploaded, click the dashboard link formatted as `https://create.roblox.com/dashboard/creations/store/.../configure`.
5. In the browser window that opens, follow the instructions above in [Through Creator Dashboard](#through-creator-dashboard).

</TabItem>
</Tabs>

[CommunityRulesURL]: https://en.help.roblox.com/hc/articles/203313410
[TermsUseURL]: https://en.help.roblox.com/hc/articles/115004647846
