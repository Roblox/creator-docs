---
title: Test classic clothing
description: How to test your classic clothing items before uploading them to the Marketplace.
---

<Alert severity="warning">
Current user-generated avatars on the Marketplace do not support 2D classic clothing. For information on creating modern 3D cosmetics, including rigid accessories and clothing items, see [Get started](../avatar/index.md).
</Alert>

To ensure the best quality results, you can test your classic clothing before uploading or selling. You can test your clothes without needing to pay any fees by using [Roblox Studio](../studio/setup.md).

1. From the toolbar's **Avatar** tab, click **Character**.
2. Choose a **Block Avatar** rig type from the popup menu. An avatar mannequin named **Rig** appears in the 3D workspace.

   <img src="../assets/accessories/classic-clothing/Block-Avatar-Default.jpg" width="800" />

3. In the **Explorer** window, hover over the **Rig** object, click the **&CirclePlus;** button and insert either a **ShirtGraphic** (T‑shirt), **Shirt**, or **Pants** object according to the clothing you want to test.

4. Locate and select the new **Shirt Graphic** or **Clothing** object parented under **Rig**.

   <Grid container spacing={3}>
   <Grid item>
	 <figure>
	 <img src="../assets/studio/explorer/Rig-Shirt-Graphic.png" width="320" />
	 <figcaption>Shirt Graphic (T-shirt)</figcaption>
	 </figure>
	 </Grid>
	 <Grid item>
	 <figure>
	 <img src="../assets/studio/explorer/Rig-Clothing.png" width="320" />
	 <figcaption>Clothing (Shirt/Pants)</figcaption>
	 </figure>
	 </Grid>
	 </Grid>

5. In the **Properties** window, locate the associated property as follows:

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

6. Click inside the property's row and select the image you uploaded to Roblox. This applies the clothing texture to the **Rig** character.

   <img src="../assets/accessories/classic-clothing/Block-Avatar-Dressed.jpg" width="800" />

<Alert severity="success">
After testing, you can [upload and sell](./upload-classic-clothing.md) your asset to the Marketplace.
</Alert>
