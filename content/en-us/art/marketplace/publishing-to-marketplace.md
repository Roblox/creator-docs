---
title: Publishing to Marketplace
description: Explains how to publish user-generated content to the Marketplace.
---

In order to publish and sell assets on the Marketplace, your account or group must first meet [Roblox's Creator and Group requirements](#creator-and-group-requirements). Users who satisfy the requirements and have not hit their [publishing limits](#publishing-limits), can upload and sell their assets in the following general steps:

1. [Upload the asset](#uploading-an-asset) through Studio for validation and moderation.
2. [Publish the asset](#updating-an-asset) to the Marketplace after configuring metadata and Marketplace settings.

## Creator and Group Requirements

To upload, publish, and maintain existing content on-sale, Roblox requires users and groups to have [ID verification](../../production/publishing/vr-guidelines.md) and [Premium membership](https://www.roblox.com/premium/membership). At this time, only UGC Program members are eligible to upload and sell assets on the Marketplace.

See the following breakdown of the user and group requirements:

<table>
<thead>
  <tr>
    <th colspan="2"><center>Creator is able to…</center></th>
    <th>ID/Premium Requirements</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="3">Individually</td>
    <td>Upload content from Studio</td>
    <td>&mdash; ID Verification</td>
  </tr>
  <tr>
    <td>Publish content to the Marketplace</td>
    <td>&mdash; ID Verification<br />&mdash; Premium 1000/2200</td>
  </tr>
  <tr>
    <td>Keep existing content on-sale</td>
    <td>&mdash; ID Verification<br />&mdash; Premium 1000/2200</td>
  </tr>
  <tr>
    <td rowspan="3">As a Group</td>
    <td>Upload content from Studio</td>
    <td>Uploading user needs: <br /><br />&mdash; ID Verification<br />&mdash; Premium 1000/2200</td>
  </tr>
  <tr>
    <td>Publish content to the Marketplace</td>
    <td>Publishing user needs: <br /><br />&mdash; ID Verification<br /><br />&mdash; Premium 1000/2200<br /><br />Group owner needs:<br /><br />&mdash; Premium 1000/2200</td>
  </tr>
  <tr>
    <td>Keep existing content on-sale</td>
    <td>Group owner needs:<br /><br />&mdash; Premium 1000/2200</td>
  </tr>
</tbody>
</table>

<Alert severity = 'info'>
If you are an existing UGC program participant with Premium 450, you will be required to cancel your existing subscription and upgrade to maintain your marketplace privileges.
</Alert>

## Publishing Limits

There are limits on the number of assets you can upload to Roblox and enable for sale on the Marketplace:

<figure>
<table>
<thead>
  <tr>
    <th></th>
    <th>Limiteds</th>
    <th>Bodies or Heads</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Uploading and moderation</td>
    <td>N/A</td>
    <td>10 per day</td>

  </tr>
  <tr>
    <td>Enabling on sale<sup>&dagger;</sup></td>
    <td>1 per day</td>
    <td>N/A</td>

  </tr>
</tbody>
</table>
<figcaption><sup>&dagger;</sup>*For assets that can be taken off-sale, only the first time the asset is enabled for sale counts against this limit.*</figcaption>
</figure>

<Alert severity = 'info'>
The following publishing instructions apply to 3D accessories and clothing assets. See [Classic Clothing](../../art/accessories/classic-clothing.md) for information on uploading and selling classic 2D clothing.
</Alert>

## Uploading an Asset

When uploading your asset, Studio checks your asset for technical issues, such as an incorrect hierarchy or accessory structure. You can also add a [custom thumbnail](../../art/marketplace/custom-thumbnails.md) to your asset before uploading to customize how the item displays on the Marketplace.

- After uploading your asset, the item is placed in the moderation queue before you can enable it on sale. See [Moderation](../../art/marketplace/moderation.md) for additional information on this process.
- For details on upfront payments and fees when publishing assets to the marketplace, see [Fees and Commissions](../../art/marketplace/marketplace-fees-and-commissions.md).

<Alert severity = 'warning'>
You can't update or edit assets and thumbnails after uploading. You must test all of your assets thoroughly before uploading them to ensure they adhere to Roblox's [Marketplace Policy](../../art/marketplace/marketplace-policy.md).
</Alert>

To upload your asset:

1. In Studio, add the marketplace item to your workspace.
   - For accessories and clothing, the item must be an `Class.Accessory` object. For information on the required specifications, see [Accessory Specifications](../../art/accessories/specifications.md)
     - Upload clothing and accessories as an `Class.Accessory`. For information on converting your `Class.Model` into an `Class.Accessory`, see [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md).
   - For bodies and heads, the item must be a `Class.Model`. For information on the required specifications, see [Avatar Character Specifications](../../art/characters/specifications.md).
2. In the **Explorer** window, right click the object and select **Save to Roblox**.
3. In **Submit As**, select **Avatar Asset**.
4. In the **Asset type** dropdown menu, select the appropriate marketplace asset type. Validation begins upon selection.
   <Alert severity = 'info'>
   If you do not see this dropdown, your account may not have access to upload assets to the Marketplace. Currently only creators participating in the [UGC program](https://devforum.roblox.com/t/updates-and-changes-to-the-ugc-catalog-application/1974990) can sell items on the Marketplace at this time.
   </Alert>

   <GridContainer numColumns='2'>
   <figure>
       <img src="../../assets/publishing/marketplace/Publishing-Clothes.png" />
       <figcaption>Uploading a clothing accessory asset</figcaption>
   </figure>
   <figure>
       <img src="../../assets/publishing/marketplace/Publishing-Body.png"  />
       <figcaption>Uploading a body asset bundle</figcaption>
   </figure>
   </GridContainer>

5. Once validation completes successfully, an item description dialog displays. Fill out the following fields and follow [metadata best practices](../../production/publishing/publishing-experiences-and-places.md#metadata-best-practices) when possible.

   - **Title** - The name of your asset in the Marketplace.
   - **Description** - This description of your asset in the Marketplace.
   - **Tags** - You can add up to 5 tags from a preset list to each of your items to aid in discovery. Roblox already includes implicit tags related to the accessory type, such as **Hair**, **Back**, or **Shoulder**.
   - **Creator** - You can set your user or any associated groups as the creator of this asset. The creator can access the Marketplace asset to set prices, benefits, and access sales information.

6. Click **Submit** to pay any applicable upload fee and submit your asset for moderation approval.

After uploading the asset, you can find it in the **Creator Store** tab of the [Toolbox](../../projects/assets/toolbox.md) where you can view the current moderation status or edit the title and description.

### Troubleshooting

During the upload process, you may encounter issues that prevent an item from uploading. These may occur due to technical issues with the asset itself, or problems with the metadata of the asset, such as invalid ownership, or inappropriate text strings.

<GridContainer numColumns="2">
<figure>
For technical issues during the validation step, hover over the error to see the specific failure output. Most issues may require adjusting your model in your third-party modeling application and re-importing into Studio.

See the modeling specifications for [accessories](../../art/accessories/specifications.md) and [avatars](../../art/characters/specifications.md) for technical requirements.

</figure>

<figure>
<img
src="../../assets/publishing/marketplace/Error-Example.png"
width="400" />
<figcaption>An error that displays when a FaceControls object is not detected for head animation</figcaption>
</figure>

</GridContainer>

For other validation issues, keep in mind the following common uploading conflicts:

- Studio's text filter identifies inappropriate strings in the name or description.
- Roblox's automation flags your account for repeat actions. This may occur more often if you added tags to your item. Try submitting without tags and add them later once the item is published.
- Your item uses an `AssetID` or `TextureID` that belongs to an existing asset in the Marketplace, or doesn't belong to you or an appropriate group.
- Your item uses an `AssetID` or `TextureID` that is still pending moderation.

## Updating an Asset

You can configure the title, description, and tags of assets you publish in your [Creator Dashboard](https://create.roblox.com/creations). This page also allows you to enable the item for sale and set various sale-related options. When you are ready to submit changes to your asset, click **Save Changes** to confirm your changes.

<img
  src="../../assets/publishing/marketplace/Asset-Configure-Page.png"
  width="80%" />

<Alert severity = 'warning'>
You can't change or modify the asset or thumbnail after upload. If you discover that your item is broken or doesn't work as expected, you may need to remove the item from sale and re-publish a corrected asset.

If a Roblox update breaks an existing asset, [submit a help ticket](https://www.roblox.com/support) with a link to the broken item and an `.rbxm` of the correct version.
</Alert>

### Metadata

You can adjust the metadata for any of your creations at any time. Keep in mind that the metadata, such as the title and description, should follow [general best practices](../../production/publishing/publishing-experiences-and-places.md#metadata-best-practices) to avoid moderation and improve discoverability.

On the Configure page, you can update the following fields:

- **Title** - The name of your asset in the Marketplace.
- **Description** - The description of your asset in the Marketplace.
- **Tags** - You can add up to 5 tags from a preset list to each of your items to aid in discovery. Roblox already includes implicit tags related to the accessory type, such as **Hair**, **Back**, or **Shoulder**.
- **Open for Comments** - When enabled, users can comment on the public asset page for your creation.

### Marketplace Settings

After the asset clears initial moderation, you can enable the item for sale and set [price](#price), [limited status](#limited), [sales location](#sale-location), and [Premium benefits](#premium-benefits).

To set your item on sale and access Marketplace settings:

1. In your asset's Configure page, enable the **On Sale** toggle. Additional menu options display.
2. If applicable, update the fields for **Price**, **Limited**, **Sale Location**, and **Premium Benefits**.
3. When ready to publish, click **Publish**.

<img
  src="../../assets/publishing/marketplace/Asset-Configure-Page-Sale.png"
  width="80%" />

#### Price

When your item is ready to sell, you must set your price within the appropriate [price range](../../art/marketplace/marketplace-fees-and-commissions.md#price-ranges) for that asset type.

When setting a price, you can see the percentage breakdown of commissions in the dialog box. A similar breakdown on fees, when applicable, is provided at the bottom of the prompt. See [Marketplace Fees and Commissions](../../art/marketplace/marketplace-fees-and-commissions.md) for more information on the fees and commissions for Marketplace items.

#### Limited

Limited assets, or **Limiteds**, are assets that have a set quantity available for purchase. By enabling the Limited option for your asset, you can set the quantity of your creations which can give you more control over their scarcity. For information on pricing and payments, see [Limited Fees and Commissions](../../art/marketplace/marketplace-fees-and-commissions.md#limited-items). At this time, bodies and heads are not eligible as Limiteds.

<Alert severity = 'warning'>
After publishing Limiteds, you cannot change the asset's **Title**, **Description**, **Price**, **Resellable status**, or **Quantity**. You should ensure that your asset details are free of typos or mistakes before publishing a Limited.
</Alert>

To set your asset as limited:

1. Enable the **Limited** option next to the On Sale toggle. Additional menu options display.

   <img
   src="../../assets/publishing/marketplace/Asset-Configure-Page-Limited.png"
   width="80%" />

2. If you want to prevent users from reselling your Limited, disable the **Resellable** option. If disabled, you will not be eligible for [resell commissions](../../art/marketplace/marketplace-fees-and-commissions.md#reselling).
3. In the **Price** field, set the price for the item. You can set the price to **0** if you want the item to be free or set a price within the [Marketplace price ranges](../../art/marketplace/marketplace-fees-and-commissions.md#price-ranges).
4. In the **Quantity** field, set the number of assets that users can purchase.

##### Limit Copies Per User

If you are selling a Limited item, you can enable **Limit Copies Per User** to set the number of times a user can purchase this asset. This only affects the purchases from the original listing and users can still purchase additional copies of the same Limited asset from resellers. You can't change this setting after publishing.

Copy limits are based on ownership. If a user owns the maximum limit of copies in their inventory, they can no longer purchase the asset from the original listing. If the user no longer owns the maximum number of copies, they can purchase the copies from the original listing.

Limited assets on the Marketplace before the release of this setting don't include a copy limit.

#### Sale Location

The **Sale Location** option sets where you can sell your asset beyond the Marketplace. In some cases, you may want to limit the availability of your asset to certain experiences, or only the Marketplace.

Experiences that sell Marketplace items receive an additional [commission](../../art/marketplace/marketplace-fees-and-commissions.md) including transactions made through the [Inspect Menu](../../players/avatar-inspect-menu.md) or [through the API](../../players/avatar-editor.md) within an experience.

The following location options are available for **non-Limited** items:

<table>
<thead>
  <tr>
    <th>Location</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Marketplace and All Experiences</td>
    <td>Users can purchase this item in the Marketplace or any experiences that offer Marketplace purchases. This is the default setting.</td>
  </tr>
  <tr>
    <td>Marketplace and My Experiences</td>
    <td>Users can purchase this item in the Marketplace or any of the asset creator's experiences that offer Marketplace purchases.</td>
  </tr>
  <tr>
    <td>Marketplace only</td>
    <td>Users can only purchase this item in the Marketplace.</td>
  </tr>
</tbody>
</table>

The following location options are available for **Limiteds**:

<table>
<thead>
  <tr>
    <th>Location</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Marketplace and All Experiences</td>
    <td>Users can purchase this item in the Marketplace or any experiences that offer Marketplace purchases. This is the default setting.</td>
  </tr>
  <tr>
    <td>Experience By Place ID (API Only)</td>
    <td>Users can only purchase the original stock of this item in the experiences associated with the provided Place ID. Only one Place ID per experience is required and creators can update and change Place IDs at any time. <br /> <br />After saving a new Place ID, the experience owner needs to manually [enable the avatar item](../../production/monetization/avatar-items.md) for their experience.</td>
  </tr>
</tbody>
</table>

<Alert severity = 'error'>
    After publishing a Limited, you can only change the Location Setting from **Experience By Place ID** to **Marketplace and All Experiences**. This change can't be reverted after saving.
    </Alert>

#### Premium Benefits

The Premium benefit options allow you to provide exclusive items or discounts to Premium subscribers. All items with Premium exclusivity or discounts appear in the [Premium Marketplace category](https://www.roblox.com/catalog?Category=1&salesTypeFilter=3) and include a Premium logo in the item name. Premium benefits don't apply to [Limited assets](#limited).

The following Premium benefit options are available:

<table>
<thead>
  <tr>
    <th>**Premium benefit**</th>
    <th>**Description**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>No Premium benefit</td>
    <td> Roblox doesn't apply a Premium benefit to the sale of this item. This is the default setting.</td>
  </tr>
  <tr>
    <td>Exclusivity</td>
    <td>Only Premium subscribers can purchase the item.</td>
  </tr>
  <tr>
    <td>Discounts</td>
    <td>Premium subscribers can purchase this item for a **25%**, **50%**, or **75%** discount. <br />You can't set the premium price lower than the minimum [price range](../../art/marketplace/marketplace-fees-and-commissions.md#price-ranges) for the asset type. You receive [commissions](../../art/marketplace/marketplace-fees-and-commissions.md) relative to the final price spent on the item.</td>
  </tr>
</tbody>
</table>
