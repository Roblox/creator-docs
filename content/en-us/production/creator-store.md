---
title: Creator Store
description: The Creator Store is where you can find all assets for public use in your experiences.
---

import ToolboxFindUse from '../includes/studio/toolbox-find-use.md'

The **Creator Store** features assets made by Roblox and the Roblox community for the community to use within their experiences, including models, images, meshes, audio, fonts, videos, and plugins.

You can create and [distribute](#distribute-and-sell-assets) models, images, meshes, plugins, and audio files to the Creator Store for others to use as long as you are the original creator, and it adheres to Roblox's [Community Rules][CommunityRulesURL] and [Terms of Use][TermsUseURL]. If you have a [seller account](./sell-on-creator-store.md), you can also sell your plugins and models to other creators.

<Alert severity="warning">
To maintain community safety, Roblox may terminate accounts that publish spam or assets with malicious or obfuscated code.
</Alert>

## Asset moderation

Roblox performs both human and automated asset moderation on a proactive and reactive basis to ensure assets adhere to the [Community Rules][CommunityRulesURL], [Terms of Use][TermsUseURL], and [Digital Millennium Copyright Act](../production/publishing/dmca-guidelines.md) (DMCA). If any asset violates these moderation policies, such as including discriminatory or adult content, the moderation team flags and removes the asset to protect users from harmful or non-compliant content. This process generally happens within a few hours after you upload the asset.

In addition, the Creator Store **restricts** use of the following practices to ensure asset safety:

- **Obscuring engine features within scripts**, including LuaVMs, `Global.LuaGlobals.getfenv()`, and `Global.LuaGlobals.setfenv()`.
- **Requiring remote assets,** including `Global.RobloxGlobals.require(assetId)`, `Global.LuaGlobals.loadstring()`, `Class.InsertService:LoadAsset()`, `Class.AssetService:LoadAssetAsync()`, and `Class.ModuleScript.LinkedSource`. Assets that may look useful on the surface could load another "virus" asset at runtime.
- **Including obfuscated code**. For publicly-shared assets, it's important for creators to understand what they are putting into their experiences. If code is obfuscated, creators cannot trust that the script is only doing what it should be doing.
- **Extremely large scripts**. Assets with unnecessarily large scripts, including multiple repeat lines or large strings that are unused, especially if they cause rendering issues in editors.

<Alert severity="info">
These policies only apply to assets on the Creator Store, **not** private models or scripts inside experiences.
</Alert>

## Open the Creator Store

The Creator Store is available on the [web](https://create.roblox.com/store/) and directly inside Studio's [Toolbox](../projects/assets/toolbox.md). To open it in Studio, select **Toolbox** from the **Window** menu. The **Creator Store** tab is shown by default.

<img src="../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

## Find and use assets

With millions of assets available, it's helpful to narrow the search results to find exactly what you are looking for. To browse and use assets:

<ToolboxFindUse components={props.components} />

## Verify your account

In addition to being able to distribute more of each asset type, verifying your account ensures that you are eligible to distribute audio assets and that your assets are visible to creators, as the default option for discoverability for assets on the Creator Store is reserved for verified accounts. In order to verify your account, you must:

- Be at least 13 years of age.
- Have a government-issued photo ID with your picture on it, such as a driver's license, passport, or residency permit.
- Have a mobile device with a camera that can take photos of your face and ID.

For information on how to verify your account either through a government-issued ID or through a phone number, see [account verification](../production/publishing/account-verification.md).

Verification status for group-owned assets is based on the user that last updated the asset.

<Alert severity="warning">

**Phone number verification is not sufficient** to sell priced assets on the Creator Store. To sell priced assets, you need to verify with a [government ID](./publishing/account-verification.md#verify-through-government-id) and create a seller account. For more information, see [Sell on the Creator Store](./sell-on-creator-store.md).

</Alert>

## Distribute and sell assets

Distributing to the Creator Store is the only way to make your assets publicly available to all users to use within their own experiences in Studio. You can distribute any mesh or image that you have imported through the [Asset Manager](../projects/assets/manager.md), or any [model](../parts/models.md), [plugin](../studio/plugins.md), or [audio assets](../audio/assets.md) that you have uploaded to your inventory.

Every asset that you import must adhere to the [Community Rules][CommunityRulesURL] and [Terms&nbsp;of&nbsp;Use][TermsUseURL], and respect the [DMCA guidelines](../production/publishing/dmca-guidelines.md) regarding copyright. If you suspect a rights violation involving your asset, you can submit the content for removal using the [Rights Manager](../production/publishing/rights-manager.md).

In addition, there are limits on the number of assets you can distribute per 30 days, depending on whether you've [verified your account](../production/publishing/account-verification.md):

<table>
<thead>
  <tr>
    <th></th>
    <th>Mesh assets</th>
    <th>Image assets</th>
		<th>Model assets</th>
		<th>Audio assets</th>
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

Eligible creators can also choose to [sell](./sell-on-creator-store.md) plugins and models on the Creator Store for **United States Dollars** (USD). Roblox offers a market-leading revenue share for these sales, as only taxes and payment processing fees are deducted. For more information, see [Sell on the Creator Store](./sell-on-creator-store.md).

### Through Creator Dashboard

To distribute an asset through the [Creator Dashboard](https://create.roblox.com/dashboard/creations):

1. In the horizontal navigation, select [Development Items](https://create.roblox.com/dashboard/creations?activeTab=Model). All assets you have [previously imported](../projects/assets/manager.md#asset-import) display within their respective category.
1. Select the asset that you want to distribute. The asset's **Configure** page displays.
1. In the **Configure** ⟩ **Distribution** section, toggle on **Distribute on Creator Store**.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> If you have a [seller account](./sell-on-creator-store.md) and are distributing a plugin or model, set a price in USD for the asset in the **USD Pricing** field. If you keep the default value of **Free**, the asset will be free to all creators.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> If you are [ID or phone verified](../production/publishing/account-verification.md), add up to 5 supplementary thumbnails for your asset.
1. Click the **Save** button.
1. If you are distributing an audio asset for the first time, enable all legal agreements, then click the **Submit** button. The asset will become public and visible to everyone within the Creator Store, provided it adheres to the [moderation rules](#asset-moderation).

### Through Studio

You can upload assets directly in Studio from the [Toolbox](../projects/assets/toolbox.md) or [Explorer](../studio/explorer.md) window. However, you must complete the process on the [Creator Dashboard](#through-creator-dashboard) to list an asset for sale on the Creator Store, distribute audio assets, or set a [USD price](./sell-on-creator-store.md) for a plugin or model.

<Tabs>
<TabItem label="Toolbox">
Assuming the asset is in your [inventory](../projects/assets/toolbox.md#inventory) and you want to distribute it in the Creator Store:

1. In the [Toolbox](../projects/assets/toolbox.md), select the **Creations** tab. All assets you have [previously imported](../projects/assets/manager.md#asset-import) display within the chosen category.

   <img src="../assets/studio/toolbox/Creations-Tab.png" width="360" />

2. Right-click the asset you'd like to distribute and select **Edit Asset**.
3. In the **Asset Configuration** window that opens, confirm and/or update asset details such as **Title** and **Description**.
4. Click **Save**. Once the asset has uploaded, click the dashboard link formatted as `https://create.roblox.com/dashboard/creations/store/.../configure`.
5. In the browser window that opens, follow the instructions [through the Creator Dashboard](#through-creator-dashboard).

</TabItem>
<TabItem label="Explorer">
To upload an asset from the [Explorer](../studio/explorer.md) and distribute it in the Creator Store:

1. In the **Explorer** window, right-click the asset you'd like to distribute and select **Save&nbsp;/&nbsp;Export** ⟩ **Save&nbsp;to&nbsp;Roblox...** from the contextual menu.
2. In the **Asset Configuration** window that opens, confirm and/or update asset details such as **Title** and **Description**. Additionally:

   - For **Content Type**, make sure **Development Item** is selected.
   - For **Asset Category**, select **Model**.

3. If you need to **overwrite** a previously-uploaded asset with a new version, click **Overwrite an existing asset...** in the bottom-left of the configuration window.
4. Click **Save**. Once the asset has uploaded, click the dashboard link formatted as `https://create.roblox.com/dashboard/creations/store/.../configure`.
5. In the browser window that opens, follow the instructions [through the Creator Dashboard](#through-creator-dashboard).

</TabItem>
</Tabs>

[CommunityRulesURL]: https://en.help.roblox.com/hc/articles/203313410
[TermsUseURL]: https://en.help.roblox.com/hc/articles/115004647846
