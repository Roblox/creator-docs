---
title: Classic clothing
description: Classic clothing are decals you can apply to a classic character model's surface. You can create classic clothing items on Roblox and upload them to the Marketplace.
---

<Alert severity="warning">
Many user-generated avatars on the Marketplace do not support 2D classic clothing. For information on creating modern 3D cosmetics, including rigid accessories and clothing items, see [Get started](./index.md).
</Alert>

<Grid container spacing={2} style={{ marginBottom: 24, width: '100%' }}>
<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/r_unfGZT5Ps"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
Create and sell your first 2D classic clothing item.
</Typography>
</Grid>
</Grid>

<Grid item xs={6} style={{ padding: 16 }}>
<Grid item container wrap="nowrap" direction="column" style={{ gap: 8, flex: 1 }}>

<div
className="container"
style={{ position: "relative", paddingBottom: "56.25%", height: 0, marginBottom: 12 }} >
<iframe
src="https://www.youtube-nocookie.com/embed/EUDSIUmLjxA"
title="YouTube video player"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowFullScreen
style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} ></iframe>
</div>
<Typography variant="body1">
A high-level overview of avatar items on Roblox.
</Typography>

</Grid>
</Grid>
</Grid>

**Classic clothing** are 2D assets that wrap around specific areas of the avatar's body, such as their front torso for t-shirts or their torso and legs for pants. This is the most basic type of avatar item to create and sell on the [Marketplace](https://www.roblox.com/catalog) as you just need an image editor and web browser for the creation process.

To create classic clothing items:

1. Decide on the [type of classic clothing](#types-of-classic-clothing) you'd like to create.
1. [Create](#create-classic-clothing) an image for your asset using an image editor of your choice.
1. [Test](#test-classic-clothing) your creation in Studio to ensure it looks as intended.
1. [Upload](#upload-classic-clothing) the image file to the Marketplace through a web browser.

## Types of classic clothing

There are three types of classic clothing: **T-shirts**, **Shirts**, and **Pants**. Each type of classic clothing has different design and format requirements.

<GridContainer numColumns="3">
<figure><img src="../assets/accessories/classic-clothing/Types-Tshirts.png" /><figcaption>T-shirts</figcaption></figure>
<figure><img src="../assets/accessories/classic-clothing/Types-Shirts.png" /><figcaption>Shirts</figcaption></figure>
<figure><img src="../assets/accessories/classic-clothing/Types-Pants.png" /><figcaption>Pants</figcaption></figure>
</GridContainer>

### T-shirts

T-shirts are a square image, such as 512x512 pixels. When properly configured, classic t-shirts display on the front torso of a blocky character.

### Shirts and pants

Classic shirts and pants are image assets that wrap around an avatar's body. Because classic shirts and pants have specific size requirements, download and modify the provided template files to begin creating these assets.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/accessories/classic-clothing/Template-Shirts-R15.png" />
    <figcaption><center> <a href="../assets/accessories/classic-clothing/Classic-Clothing-Templates.zip" download>Shirt (torso and arms)</a></center></figcaption>

  </figure>
  <figure>
    <img src="../assets/accessories/classic-clothing/Template-Pants-R15.png" />
    <figcaption><center> <a href = "../assets/accessories/classic-clothing/Classic-Clothing-Templates.zip" download>Pants (torso and legs)</a></center></figcaption>
  </figure>
</GridContainer>

<table>
<thead>
  <tr>
    <th>Shape</th>
    <th>Pixel size (width x height)</th>
    <th>Clothing parts</th>
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

## Create classic clothing

To begin creating classic clothing:

1. If you are creating a classic shirt or pants, [download and unzip](../assets/accessories/classic-clothing/Classic-Clothing-Templates.zip) the following clothing templates to use as a canvas for your art.
1. Modify the image in an image editor of your choice.
1. Export the image as a `.png` or `.jpg` before testing and uploading it in Studio.

When applying clothing to avatars in Roblox, some limits exist with the templates and may require some testing to get right, as shown in the following examples:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/accessories/classic-clothing/Pants-Template-Good.jpg" />
    <figcaption>The shoe designs in this example are near the bottom of the leg regions (L, B, R, F) but don't extend too far up. This provides a distinct separation between the shoes and the bottom of the jeans.</figcaption>
  </figure>
  <figure>
    <img src="../assets/accessories/classic-clothing/Pants-Template-Bad.jpg" />
    <figcaption>The shoe designs in this example extend too far up the leg regions (L, B, R, F) which make them appear as if they're part of the pants. The same issue may occur near other joints on the avatar's body.</figcaption>
  </figure>
</GridContainer>

## Test classic clothing

To ensure the best quality results, it's recommended to test your classic clothing in Studio before uploading or selling your asset on the Marketplace. The testing process does not require any fees.

To test your classic clothing:

1. From the toolbar's **Avatar** tab, click **Character**.
1. Choose a **Block Avatar** rig type from the popup menu. An avatar mannequin named **Rig** appears in the 3D workspace.

   <img src="../assets/accessories/classic-clothing/Block-Avatar-Default.jpg" width="800" />

1. In the **Explorer** window, hover over the **Rig** object, click the **&CirclePlus;** button and insert either a **ShirtGraphic** (T‑shirt), **Shirt**, or **Pants** object according to the clothing you want to test.

1. Locate and select the new **Shirt Graphic** or **Clothing** object parented under **Rig**.

   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/accessories/classic-clothing/ShirtGraphic.png" width="100%" />
       <figcaption>Shirt Graphic (T-shirt)</figcaption>
     </figure>
     <figure>
       <img src="../assets/accessories/classic-clothing/ShirtPants.png" width="100%" />
       <figcaption>Clothing object (Shirt/Pants)</figcaption>
     </figure>
   </GridContainer>

1. In the **Properties** window, locate the associated property as follows:

	 <table>
	 <thead>
	 <tr>
	   <th>Clothing Type</th>
	   <th>Parent Class</th>
	   <th>Property</th>
	 </tr>
	 </thead>
	 <tbody>
	 <tr>
	   <td>**T-Shirt**</td>
	   <td>`Class.ShirtGraphic`</td>
	   <td>`Class.ShirtGraphic.Graphic|Graphic`</td>
	 </tr>
	 <tr>
	   <td>**Shirt**</td>
	   <td>`Class.Shirt`</td>
	   <td>`Class.Shirt.ShirtTemplate|ShirtTemplate`</td>
	 </tr>
	 <tr>
	   <td>**Pants**</td>
	   <td>`Class.Pants`</td>
	   <td>`Class.Pants.PantsTemplate|PantsTemplate`</td>
	 </tr>
	 </tbody>
	 </table>

1. Click inside the property's row and select the image you uploaded to Roblox. This applies the clothing texture to the **Rig** character.

   <img src="../assets/accessories/classic-clothing/Block-Avatar-Dressed.jpg" width="800" />

## Upload classic clothing

After creating and testing your classic clothing design, as long as you meet the [creator requirements](../marketplace/marketplace-policy.md#creator-requirements), you can upload and sell your clothing item on the Marketplace for an [upload fee](../marketplace/marketplace-fees-and-commissions.md#upload-fees) of **80 Robux** per submission.

To upload a custom clothing item:

1. Navigate to your [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Navigate to **Avatar Items**, then select the **Classics** tab.
1. Drag and drop your image file into the upload box. Alternatively, you can click **Upload Asset** and upload your file on the next page.
1. On the **Upload Asset** page, set the **Asset Type** dropdown to **T-Shirt**, **Shirt**, or **Pants**.
1. Complete the **Name** and **Description** fields. These fields help users find your assets and allow you to organize your creations.
1. Click the **Upload** button at the bottom of the page.

## Manage classic clothing

To see your moderation status, place your item on sale, or modify your item settings:

1. Navigate to your [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Navigate to **Avatar Items**, then select the **Classics** tab.
1. Use the **Classic Type** dropdown to filter by the type of classic clothing creation.
1. Click on the asset to navigate to the asset's **Configure** page.
1. Modify the following fields:
   1. **Item Name** — The public-facing name of the asset.
   1. **Item Description** — The public-facing description of the asset.
   1. **On Sale** — When enabled, users can view and purchase this item on the Marketplace.
   1. **Set a price** — The value of Robux that the creation sells for on the Marketplace.
