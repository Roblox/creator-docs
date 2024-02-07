---
title: Classic Clothing
description: Classic clothing are decals you can apply to a classic character model's surface. You can create classic clothing items on Roblox and upload them to the Marketplace.
---

<Alert severity="warning">
Modern user-generated avatars do not support classic clothing.
</Alert>

Classic clothing are a type of 2D cosmetic item that you can apply to the surface of a classic avatar character. You can [create](#creating) your own classic clothing items and sell them on the [Marketplace](https://www.roblox.com/catalog).

This guide covers the process of creating a classic clothes asset using the following steps:

1. Designing an image for a [T-shirt](#t-shirts) or [Shirts and Pants](#shirts-and-pants) using a third-party image processing program.
2. [Testing](#testing) the look of the classic clothes in Studio.
3. [Uploading](#uploading) the image assets to the Marketplace.

## Creating

The three types of classic clothing items are **T-shirts**, **Shirts**, and **Pants**. Each has different design and format requirements.

### T-shirts

T-shirts are square images applied to the front of an avatar's torso. To make a t-shirt, create a square image (such as 512×512 pixels) and then upload it to Roblox using the [Asset Manager](../../projects/assets/manager.md) to test in your own experience.

### Shirts and Pants

Classic shirts and pants are image assets that wrap around an avatar's body. To create shirts and pants, [download and unzip](../../assets/accessories/classic-clothing/Classic-Clothing-Templates.zip) the following clothing templates and draw your own art on top. Once completed, you can upload it to Roblox using the [Asset Manager](../../projects/assets/manager.md) to [test](#testing) in your own experience.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/classic-clothing/Template-Shirts-R15.png" />
    <figcaption><center> <a href="../../assets/accessories/classic-clothing/Classic-Clothing-Templates.zip" download>Shirt (Torso and Arms)</a></center></figcaption>

  </figure>
  <figure>
    <img src="../../assets/accessories/classic-clothing/Template-Pants-R15.png" />
    <figcaption><center> <a href = "../../assets/accessories/classic-clothing/Classic-Clothing-Templates.zip" download>Pants (Torso and Legs)</a></center></figcaption>
  </figure>
</GridContainer>

<br />

The following table includes sizes for each template part:

<table>
<thead>
  <tr>
    <th>Shape</th>
    <th>Pixel Size (width x height)</th>
    <th>Clothing Parts</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Large square</td>
    <td>128 &times; 128</td>
    <td><b>FRONT</b> and <b>BACK</b></td>
  </tr>
  <tr>
    <td>Tall rectangle</td>
    <td>64 &times; 128</td>
    <td>Sides of torso (<b>R</b>, <b>L</b>) <br /> Sides of arms and legs (<b>L</b>, <b>B</b>, <b>R</b>, <b>F</b>)</td>
  </tr>
  <tr>
    <td>Wide rectangle</td>
    <td>128 &times; 64</td>
    <td><b>UP</b> and <b>DOWN</b></td>
  </tr>
  <tr>
    <td>Small square</td>
    <td>64 &times; 64</td>
    <td>Top and bottom of arms and legs (<b>U</b>, <b>D</b>)</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
8-bit alpha channels can be used for transparent regions.
</Alert>

When applying clothing to R15 avatars in Roblox, some limits exist with the templates and may require some testing to get right, as shown in the following examples:

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/classic-clothing/Pants-Template-Good.jpg" />
    <figcaption>The shoe designs in this example are near the bottom of the leg regions (L, B, R, F) but don't extend too far up. This provides a distinct separation between the shoes and the bottom of the jeans.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/classic-clothing/Pants-Template-Bad.jpg" />
    <figcaption>The shoe designs in this example extend too far up the leg regions (L, B, R, F) which make them appear as if they're part of the pants. The same issue may occur near other joints on the avatar's body.</figcaption>
  </figure>
</GridContainer>

## Testing

To ensure the best quality results, you can test your clothes before uploading or selling. You can test your clothes without needing to pay any fees.

1. In Studio, open the [Avatar](../../studio/avatar-tab.md) tab and click **Rig Builder**.

   <img src="../../assets/studio/general/Avatar-Tab-Rig-Builder.png"
      width="760" />

2. Choose a rig type from the popup menu. This should drop an avatar mannequin in your workspace named **Dummy**.

   <img src="../../assets/accessories/classic-clothing/Dummy-Default.jpg"
   width="80%" />

3. In the Explorer window, hover over the **Dummy** object, click the **&CirclePlus;** button and insert either a **ShirtGraphic** (T-shirt), **Shirt**, or **Pants** object according to the clothing you want to test.

4. Locate and select the new **Shirt Graphic** or **Clothing** object parented under **Dummy**.

   <img src="../../assets/accessories/classic-clothing/Explorer-Dummy-Shirt-Graphic.png"
   width="320" />

   **Shirt Graphic** (T-shirt)

   <img src="../../assets/accessories/classic-clothing/Explorer-Dummy-Clothing.png"
   width="320" />

   **Clothing** (Shirt/Pants)

5. In the Properties window, locate the associated property as follows:

   <img src="../../assets/accessories/classic-clothing/Properties-Graphic.png"
   width="320" />

   **Graphic** (T-shirt)

   <img src="../../assets/accessories/classic-clothing/Properties-ShirtTemplate.png"
   width="320" />

   **ShirtTemplate** (Shirt)

   <img src="../../assets/accessories/classic-clothing/Properties-PantsTemplate.png"
   width="320" />

   **PantsTemplate** (Pants)

6. Click inside the property's row and select the image you uploaded to Roblox. This applies the clothing texture to the dummy character.

   <img src="../../assets/accessories/classic-clothing/Dummy-Clothed.jpg"
   width="80%" />

<Alert severity="info">
To make sure your clothing looks as good as possible on as many avatars as possible, make sure you test on a few different rig types. Some character rigs may not support classic clothing effectively.
</Alert>

## Uploading

After finalizing and testing your design, you can upload the clothing item to the [Marketplace](https://www.roblox.com/catalog) for a [fee](../../art/marketplace/marketplace-fees-and-commissions.md#classic-clothing). After Roblox reviews and uploads the item to the Marketplace, you will receive a [commission](../../art/marketplace/marketplace-fees-and-commissions.md#commissions) for all sales of your items.

To upload a custom clothing item:

1. Navigate to the [Upload Asset](https://create.roblox.com/dashboard/creations/upload?assetType=TShirt) page.
1. Select either **T-Shirt**, **Shirt**, or **Pants** from the asset type selector menu.
1. Click the small upload button to choose a valid image file from your computer.

   <img src="../../assets/creator-dashboard/Upload-Classic-Clothing.png" width="720" />

1. Enter a name and description for your clothing item.
1. Click the **UPLOAD** button at the bottom of the page. Once approved by Roblox, the item shows up as one of your creations and can be equipped or offered for sale to other Roblox players.
