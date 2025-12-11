---
title: Publish to Marketplace
description: Explains how to publish user-generated content to the Marketplace.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/swQW2VS9ZMA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br /><br />

In order to publish and sell assets on the Marketplace, your account or group must first meet [Roblox's Creator and Group requirements](../marketplace/marketplace-policy.md#creator-and-group-requirements). Users who satisfy the requirements and have not hit their [publishing limits](#upload-and-publish-limits), can upload and sell their assets in the following general steps:

1. [Upload the asset](#upload-an-asset) through Studio for validation and moderation.
2. [Publish the asset](#publish-an-asset) to the Marketplace after configuring metadata and Marketplace settings.

<Alert severity = 'info'>
  The following publishing instructions apply to 3D accessories and clothing assets. See [Classic clothing](../art/classic-clothing.md) for information on uploading and selling classic 2D clothing.
</Alert>

## Upload and publish limits

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
    <td>No limit</td>
    <td>No limit</td>

  </tr>
  <tr>
    <td>Publishing - Enabling on sale<sup>&dagger;</sup></td>
    <td>1 per day</td>
    <td>No limit</td>

  </tr>
</tbody>
</table>
<figcaption><sup>&dagger;</sup>*For assets that can be taken off-sale, only the first time the asset is enabled for sale counts against this limit.*</figcaption>
</figure>

## Upload an asset

When uploading your asset, Studio checks your asset for technical issues, such as an incorrect hierarchy or accessory structure. You can also add a [custom thumbnail](../marketplace/custom-thumbnails.md) to your asset before uploading to customize how the item displays on the Marketplace.

- After uploading your asset, the item is placed in the moderation queue before you can enable it on sale. See [Moderation](../marketplace/moderation.md) for more information on this process.
- For details on upfront payments and fees when publishing assets to the marketplace, see [Fees and commissions](../marketplace/marketplace-fees-and-commissions.md).

<Alert severity = 'warning'>
  You can't update or edit assets and thumbnails after uploading. You must test all of your assets thoroughly before uploading them to ensure they adhere to Roblox's [Marketplace policy](../marketplace/marketplace-policy.md).
</Alert>

To upload your asset:

1. In Studio, add the Marketplace item to your workspace.

   - For accessories and clothing, the item must be an `Class.Accessory` object. For information on the required specifications, see [Accessory specifications](../art/accessories/specifications.md)

     - Upload clothing and accessories as an `Class.Accessory`. For information on converting your `Class.Model` into an `Class.Accessory`, see [Accessory Fitting Tool](../art/accessories/accessory-fitting-tool.md).
     - If uploading shoes, each shoe must be their own accessory object:

       - Name the respective shoe accessories `LeftShoeAccessory` and `RightShoeAccessory`.
       - Select both left and right shoe accessories and right-click ⟩ **Group as a Model** before step 2.

     - For bodies and heads, the item must be a `Class.Model`. For information on the required specifications, see [Avatar character specifications](../art/characters/specifications.md).
       - You can add a default skin color to your body by adding a `Class.BodyColors` object to your model.

2. In the **Explorer** window, right-click the object and select **Save to Roblox**.
3. In **Submit As**, select **Avatar Asset**.
4. In the **Asset type** dropdown menu, select the appropriate marketplace asset type. Validation begins upon selection.
   <Alert severity = 'info'>
    If you don't see this dropdown, your account might not have access to upload assets to the Marketplace. For more information, see [Creator requirements](../marketplace/marketplace-policy.md#creator-requirements).
   </Alert>

   <GridContainer numColumns='2'>
   <figure>
       <img src="../assets/publishing/marketplace/Publishing-Clothes.png" />
       <figcaption>Uploading a clothing accessory asset</figcaption>
   </figure>
   <figure>
       <img src="../assets/publishing/marketplace/Publishing-Body.png"  />
       <figcaption>Uploading a body asset bundle</figcaption>
   </figure>
   </GridContainer>

5. Once validation completes successfully, an item description dialog displays. Fill out the following fields and follow [metadata best practices](../production/publishing/publish-experiences-and-places.md#publish-experiences) when possible.

   - **Title**: The name of your asset in the Marketplace.
   - **Description**: This description of your asset in the Marketplace.
   - **Tags**: You can add up to 5 tags from a preset list to each of your items to aid in discovery. Roblox already includes implicit tags related to the accessory type, such as **Hair**, **Back**, or **Shoulder**.
   - **Creator**: You can set your user or any associated groups as the creator of this asset. The creator can access the Marketplace asset to set prices, benefits, and access sales information.

6. Click **Submit** to pay any applicable upload fee and submit your asset for moderation approval.

After uploading the asset, you can find it in the **Creations** tab of the [Toolbox](../projects/assets/toolbox.md) in a pre-published state where you can view the current moderation status or edit the title and description.

<img src="../assets/publishing/marketplace/Creation-Page.png" alt="List of Hat assets on the Creator Hub with current status listed below each entry." width="80%" />

### Troubleshooting

During the upload process, you might encounter issues that prevent an item from uploading. These might occur due to technical issues with the asset itself, or problems with the metadata of the asset, such as invalid ownership, or inappropriate text strings.

<GridContainer numColumns="2">
<figure>
For technical issues during the validation step, hover over the error to see the specific failure output. Most issues may require adjusting your model in your third-party modeling application and re-importing into Studio.

See the modeling specifications for [accessories](../art/accessories/specifications.md) and [avatars](../art/characters/specifications.md) for technical requirements.

</figure>

<figure>
<img
src="../assets/publishing/marketplace/Error-Example.png"
width="400" alt="An example error indicating a missing FaceControls object from an Avatar Head."/>
<figcaption>An error that displays when a FaceControls object is not detected for head animation</figcaption>
</figure>

</GridContainer>

For other validation issues, keep in mind the following common uploading conflicts:

- Studio's text filter identifies inappropriate strings in the name or description.
- Roblox's automation flags your account for repeat actions. This may occur more often if you added tags to your item. Try submitting without tags and add them later once the item is published.
- Your item uses an `AssetID` or `TextureID` that belongs to an existing asset in the Marketplace, or doesn't belong to you or an appropriate group.
- Your item uses an `AssetID` or `TextureID` that is still pending moderation.

## Publish an asset

You can access uploaded assets in your [Creator Dashboard](https://create.roblox.com/dashboard/creations). Each item has a **Manage Item** page where you can modify metadata, configure sale-related settings, and publish your asset to the Marketplace.

<Alert severity = 'warning'>
  You can't change or modify the asset or thumbnail after upload. If you discover that your item is broken or doesn't work as expected, you might need to remove the item and re-upload a corrected asset.

  If a Roblox update breaks an existing asset, [submit a help ticket](https://www.roblox.com/support) with a link to the broken item and an `.rbxm` of the correct version.
</Alert>

Before publishing your asset, it's important to consider if you want to sell your asset as a Limited or Non-Limited item.

### Metadata

You can adjust the metadata for any of your creations at any time. Keep in mind that the metadata, such as the title and description, should follow [general best practices](../production/publishing/publish-experiences-and-places.md#publish-experiences) to avoid moderation and improve discoverability.

<img src="../assets/publishing/marketplace/Manage-Item-Page.png" alt="Manage Item page with example asset." width="80%" />

On the Manage Item page, you can update the following fields:

- **Title**: The name of your asset in the Marketplace. You can modify this after publishing.
- **Description**: The description of your asset in the Marketplace.
- **Tags**: You can add up to 5 tags from a preset list to each of your items to aid in discovery. Roblox already includes implicit tags related to the accessory type, such as **Hair**, **Back**, or **Shoulder**.

### Item attributes

In **Item Attributes** you can set the **Availability** of your asset as a **Non-Limited** or a **Limited** item. Each availability type changes the available item attribute fields you can modify.

- **Non-Limited** items allow for unlimited copies to be purchased.
- **Limited** items allow only a fixed quantity of items to be purchased, allowing you to sell a set number of exclusive or event-specific digital items.

<table>
<thead>
  <tr>
    <th>Item availability</th>
    <th>Sale properties</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Non-Limited**<br /></td>
    <td>&mdash; Unlimited copies available to purchase<br />&mdash; Can't limit number of copies per user<br />&mdash; Can't sell free items<br />&mdash; Can't resell</td>
  </tr>
  <tr>
    <td>**Limited**<br /></td>
    <td>&mdash; Limits total number of copies sold<br />&mdash; Can limit number of original copies per user<br />&mdash; Can sell free items, per-unit fee applies<br />&mdash; Resellable</td>
  </tr>
</tbody>
</table>

<Alert severity ='warning'>
Before selecting either option, familiarize yourself with the various [fee and commission structures](../marketplace/marketplace-fees-and-commissions.md) involved with different types of items and any applicable country policy limitations.
</Alert>

<img src="../assets/publishing/marketplace/Item-Attributes.png" alt="Item Attribute settings." width="80%" />

The following item attributes only apply if you set your asset as a Limited item:

- **Quantity**: set the number of assets that available on the Marketplace. The maximum quantity for paid Limiteds is 3000. Free limiteds do not have a quantity maximum.
- **Limit copies per user**: (Optional) Sets the number of times a user can purchase this asset.
  - Copy limits are based on ownership. If a user owns the maximum limit of copies in their inventory, they can no longer purchase the asset from the original listing. If the user no longer owns the maximum number of copies, they can purchase the copies from the original listing.
  - After publishing, you can only increase, but not decrease, this value.
- **Free Item**: Sets the selling price of this item to zero. Free Limiteds utilize a [per-unit fee structure](../marketplace/marketplace-fees-and-commissions.md#per-unit-fee).
- **Resellable**: If enabled, users can resell your limited item. If resold, you are eligible for [resell commissions](../marketplace/marketplace-fees-and-commissions.md#reselling). You can change the **Resellable status** on a published item. If enabled on an item, it can not be disabled in the future.
  - The resellable attribute is not available for accounts based in Japan.

<h5 style={{marginTop: '36px'}}>Limit copies per user</h5>

If you are selling a Limited item, you can enable **Limit Copies Per User** to set the number of times a user can purchase this asset. This only affects the purchases from the original listing and users can still purchase additional copies of the same Limited asset from resellers. You can't change this setting after publishing.

Copy limits are based on ownership. If a user owns the maximum limit of copies in their inventory, they can no longer purchase the asset from the original listing. If the user no longer owns the maximum number of copies, they can purchase the copies from the original listing.

### Pricing

In the pricing section, you can set various price settings. When listing your Marketplace item, you must set your price within the appropriate [dynamic price range](../marketplace/marketplace-fees-and-commissions.md#price-ranges) for that asset type.

<img src="../assets/publishing/marketplace/Pricing-Settings.png" alt="Price settings fields." width="90%" />

You can set two types of price controls based on the price floor:

- **Amount Above Price Floor (required)** is the amount of Robux that the item will be above the current price floor. For example, if the floor is 50 Robux and you input 5 Robux here, the price will be 55 Robux. You can also choose to set this value to zero if you want your item to always be priced at the floor price.
- **Do Not Price Below (optional)** is the lowest price a creator's item can go. It is optional and will always be respected. This input is helpful if you care about what the lowest price your item can be sold for. For example, if you input 200 Robux here, your item price will never drop below 200 Robux regardless of what the price floor is.

<Alert severity = 'info'>
If you had a Marketplace listing before the implementation of the dynamic price range, the following price controls now apply until changed:

- **Amount Above Price Floor** defaults to 0 Robux.
- **Do Not Price Below** defaults to the existing price of the item.
</Alert>

When setting a price, you can see the percentage breakdown of commissions in the dialog box. A similar breakdown on fees, when applicable, is provided at the bottom of the prompt. See [Marketplace fees and commissions](../marketplace/marketplace-fees-and-commissions.md) for more information on the fees and commissions for Marketplace items.

<h5 style={{marginTop: '36px'}}>Regional Pricing for Avatar items</h5>

Regional Pricing allows you to offer your item to users at region-specific prices. After you determine the item's global price, Roblox uses a variety of signals like a region's purchasing power, currency exchange rates, and local spending behavior to set the most appropriate price for the item region by region.

Regional Pricing is opted-in by default. You can opt-out any time. For more information, see [Regional Pricing](../production/monetization/regional-pricing.md).

### Sale location

The **Sale Location** option sets where you can sell your asset beyond the Marketplace. In some cases, you may want to limit the availability of your asset to certain experiences, or only the Marketplace.

<img src="../assets/publishing/marketplace/Sale-Location.png" alt="Sale location fields." width="80%" />

Experiences that sell Marketplace items receive an additional [commission](../marketplace/marketplace-fees-and-commissions.md) including transactions made through the [Inspect Menu](../players/avatar-inspect-menu.md) or [through the API](../players/avatar-editor.md) within an experience.

The following location options are available for all items:

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
    <td>Users can only purchase the original stock of this item in the experiences associated with the provided Place ID. Only one Place ID per experience is required and creators can update and change Place IDs at any time. <br /> <br />After saving a new Place ID, the experience owner must manually [enable the avatar item](../production/monetization/avatar-items.md) for their experience.</td>
  </tr>
</tbody>
</table>

### Publish item

When first publishing your asset, select the **Publish Item** button at the end of the form to pay the [publishing fee](../marketplace/marketplace-fees-and-commissions.md#publishing-advance) and list your item on sale.

### On sale toggle

<img src="../assets/publishing/marketplace/Sale-Toggle.png" alt="On-sale toggle at top-right of page." width="80%" />

You can disable the sale of a published asset by disabling the **On Sale** at the top of the **Manage Item** page.

After enabling an item for sale, you can take the item off-sale by disabling the toggle. A publishing fee is not required to re-enable.

<Alert severity = 'warning'>
To permanently archive your asset, see [Archive assets](./moderation.md#archive-assets).
</Alert>

### Schedule item sale

To schedule the sale of your asset in the **Manage Item** page, click **Schedule Sale** under the **On Sale** toggle and enter a **Sale Start** date and an optional **Sale End** date. If you don't enter an end date, the item is on sale indefinitely.

You can use scheduling to sell both Limited and Non-Limited assets.

You can schedule sales up to 30 days in advance.
