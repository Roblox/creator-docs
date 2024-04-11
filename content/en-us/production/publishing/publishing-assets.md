---
title: Publishing Assets
description: Explains how to publish assets to the Creator Store.
---

**Publishing assets** to the [Creator Store](../../production/publishing/creator-store.md) is the only way to make your assets publicly available to all users to use within their own experiences in Studio. You can publish any mesh or image that you have imported through the [Asset Manager](../../projects/assets/manager.md), or any [model](../../parts/models.md) or [plugin](../../studio/plugins.md) that you have uploaded to your inventory.

Every asset that you import must adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), and respect the [DMCA Guidelines](../../production/publishing/dmca-guidelines.md) regarding copyright. In addition, there are limits on the number of assets you can publish per 30 days, depending on whether you've [verified your account](../../production/publishing/account-verification.md):

<table>
<thead>
  <tr>
    <th></th>
    <th>Mesh Assets</th>
    <th>Image Assets</th>
	<th>Model Assets</th>
	<th>Plugins</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Verified account</td>
    <td>200</td>
    <td>200</td>
	<td>200</td>
	<td>10</td>
  </tr>
  <tr>
    <td>Unverified account</td>
    <td>10</td>
    <td>10</td>
	<td>10</td>
	<td>2</td>
  </tr>
</tbody>
</table>

You can also choose to **sell** plugins on the Creator Store for **United States Dollars**. Roblox offers a market-leading revenue share for these sales, as only taxes and payment processing fees are deducted. Note that you can only set USD pricing for plugins through the Creator Dashboard. For more information, see [Selling on the Creator Store](../publishing/selling-on-the-creator-store.md).

## Through Creator Dashboard

Publishing assets through the [Creator Dashboard](https://create.roblox.com/dashboard/creations) is useful when you are doing multiple tasks in quick succession for an experience. It's also the only way to set a [USD price](./selling-on-the-creator-store.md) for a plugin.

To publish an asset through the dashboard:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

1. In the horizontal navigation, select [DEVELOPMENT ITEMS](https://create.roblox.com/dashboard/creations?activeTab=Model). All assets you have [previously imported](../../projects/assets/manager.md#importing-assets) display within their respective category.

1. Select the asset that you want to publish. The asset's **Configure** page displays.

1. In the **Settings** section, enable the **Distribute on Creator Store** toggle.

1. **(Optional)** If you have a [seller account](./selling-on-the-creator-store.md) and are publishing a plugin, set a price in USD for the asset in the **USD Pricing** field. If you keep the default value of **Free**, the asset will be free to all creators.

1. Click the **Save** button.

The asset is now public and visible to everyone within the [Creator Store](../../production/publishing/creator-store.md).

## Through Studio

You can publish assets directly in Studio from the **Toolbox** or **Explorer** window. However, it's not currently possible to set a USD price for an asset through these methods, only through the [Creator Dashboard](#through-creator-dashboard).

### From the Toolbox

If your asset is already in your [Toolbox Inventory](../../projects/assets/toolbox.md#inventory) and you just want to publish it to the Creator Store, you can publish it directly from Studio without needing to access the [Creator Dashboard](https://create.roblox.com/dashboard/creations). To publish an asset in the Toolbox:

1. Navigate to the **View** tab of the menu bar and select **Toolbox**. The **Toolbox** window displays.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

1. Click on the **Creations** tab.

   <img src="../../assets/studio/toolbox/Creations-Tab.png" width="360" />

1. Click the **category selector** dropdown and select the asset type you'd like to publish. All assets you have [previously imported](../../projects/assets/manager.md#importing-assets) display within the chosen category.

   <img src="../../assets/studio/toolbox/Inventory-Category-Selector.png" width="360" />

1. Right-click on your desired asset to publish and select **Edit Asset**. The **Asset Configuration** dialog displays.

1. **(Optional)** If you are [ID or phone verified](../../production/publishing/account-verification.md) and are publishing a plugin, click the **+** button to add up to 5 supplementary thumbnails for your asset.

1. Enable the **Distribute on Creator Store** toggle.

1. Click the **Submit** button.

The asset is now public and visible to everyone within the [Creator Store](../../production/publishing/creator-store.md).

### With the Explorer Window

You can publish any models you create in an open project from the [Explorer](../../studio/explorer.md) window. Assets that you publish using this method automatically appear in your [Toolbox Inventory](../../projects/assets/toolbox.md#inventory). To publish an asset in the Explorer:

1. In the **Explorer** window, right-click the asset you want to upload and select **Save to Roblox...**. The **Asset Configuration** dialog displays.

1. Enable the **Distribute on Creator Store** toggle.

1. Click the **Submit** button.

The asset is now public and visible to everyone within the [Creator Store](../../production/publishing/creator-store.md).

<Alert severity="info">

  If you need to overwrite an asset with a new version, click **Overwrite an existing asset...** in the bottom left of the Asset Configuration window.

</Alert>
