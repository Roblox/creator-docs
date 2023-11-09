---
title: Avatar Preview
description: The Avatar Preview tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

The **Avatar Preview** tool, accessible from the [Avatar](../studio/avatar-tab.md) tab, previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.

<img src="../assets/studio/general/Avatar-Tab-Avatar-Preview.png" width="760" alt="Avatar Preview button indicated in Avatar tab" />

<Alert severity="success">
This feature is currently in beta and changes/upgrades should be anticipated. To use it, go to **Beta Features** and enable **UGC Bodies & Heads**.
</Alert>

## Selecting Avatar Rigs

To select an existing avatar rig inside the place, such as one created through the [Rig Builder](../studio/rig-builder.md) tool:

1. Open the **Avatar Preview** tool.

   <img src="../assets/studio/general/Avatar-Tab-Avatar-Preview.png" width="760" alt="Avatar Preview button indicated in Avatar tab" />

1. Choose a rig in either of the following ways:

   1. Select an existing avatar rig in the 3D workspace or [Explorer](../studio/explorer.md) hierarchy.

      <Grid container spacing={2}>
      <Grid item>
      <img src="../assets/studio/avatar-preview/Rig-Selected-3D-Workspace.jpg" width="350" alt="Rig selection panel in Avatar Preview tool" />
      </Grid>
      <Grid item>
      <img src="../assets/studio/avatar-preview/Rig-Selected-Explorer.png" width="320" alt="Rig selected in Explorer hierarchy" />
      </Grid>
      </Grid>

   2. Click the **Current Place** button inside the tool's window to view a selection panel of all rigs in the place.

      <figure>
      <img src="../assets/studio/avatar-preview/Current-Place-Rigs.png" width="700" alt="Rig selection panel in Avatar Preview tool" />
      <figcaption>Rig selection panel in Avatar Preview tool</figcaption>
      </figure>

## Interface Summary

Once an avatar is selected, four tabs appear on the left side of the window: [Check&nbsp;Body](#check-body), [Check&nbsp;Face](#check-face), [Test&nbsp;in&nbsp;Experience](#test-in-experience), and [Publish](#publish).

<figure>
<img src="../assets/studio/avatar-preview/General-Interface-Labeled.png" width="700" alt="Interface selector buttons labeled in Avatar Preview tool" />
</figure>

### Check Body

The **Check Body** interface contains tabs for testing **Animations**, **Clothing**, **Accessories**, and **Body**.&sup1; Clicking a subtab like **Shirts** or **Waist** reveals a selection column along the left side of the window for [equipping items](#equipping-items).

<figure>
<img src="../assets/studio/avatar-preview/Interface-Check-Body.jpg" width="700" alt="Accessories selector in Check Body interface of Avatar Preview tool" />
</figure>

<Alert severity="info">
From this interface, you can right‑click anywhere over the rig preview and select **Revert&nbsp;to&nbsp;Default** to revert all changes to a blank state, or deselect **Textured** to view a completely grayscale character.
</Alert>

<figure>
<figcaption>&sup1; Clothing and accessory support all [avatar accessories](../art/accessories/index.md#3d-accessories), including rigid accessories, such as basic shoulder accessories, as well as layered clothing, such as a jacket or shirt.</figcaption>
</figure>

#### Equipping Items

Selected items are equipped on the avatar and are added to the "equipped" column on the right side. Selected animations begin playing as a preview of how they'll look in a running experience.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/avatar-preview/Equipped-Items.jpg" width="514" alt="List of equipped items in Avatar Preview tool" />
    <figcaption>Equipped items</figcaption>
  </figure>
  <figure>
    <video controls src="../assets/studio/avatar-preview/Animation-Video.mp4" width="100%" alt="Video of avatar animating with various animations"></video>
    <figcaption>Animations playing on rig</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
To **unequip** any item, click it again in the selection column along the left side of the window, or right‑click it in the "equipped" column on the right side and select **Unequip&nbsp;Item**. You can also right‑click an item in the "equipped" column and select **Open&nbsp;[Category]** to jump to the item's category and see related items in the selection column.
</Alert>

#### Layering Clothing

For layered accessory items such as **Shirts** or **Jackets**, dragging them up or down in the "equipped" column changes their layering order. Layered clothing items are sorted to the top of the column.

<GridContainer numColumns="2">
	<figure>
    <img src="../assets/studio/avatar-preview/Layered-Clothing-Order-A.jpg" width="514" alt="Layered clothing ordered so that pants are over the jacket (jacket tucked into pants)" />
    <figcaption>Pants over jacket</figcaption>
  </figure>
	<figure>
    <img src="../assets/studio/avatar-preview/Layered-Clothing-Order-B.jpg" width="514" alt="Layered clothing ordered so that the jacket is over the pants" />
    <figcaption>Jacket over pants</figcaption>
  </figure>
</GridContainer>

### Check Face

The **Check Face** interface zooms into the face and allows you to animate between various facial poses. This interface only works for character heads which support [facial animation](../art/characters/facial-animation/index.md).

<figure>
<img src="../assets/studio/avatar-preview/Interface-Check-Face.jpg" width="700" alt="Check Face interface of Avatar Preview tool" />
</figure>

<table>
<thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Expressions**</td>
    <td>A range of basic expressions like "happy," "annoyed," and "surprised."</td>
  </tr>
  <tr>
    <td>**Dialogue**</td>
    <td>Simulated mouth animation of the character speaking.</td>
  </tr>
  <tr>
    <td>**Mouth ROM**</td>
    <td>ROM (Range of Movement) for the character's mouth.</td>
  </tr>
	<tr>
    <td>**Brows ROM**</td>
    <td>ROM for the character's eyebrows.</td>
  </tr>
	<tr>
    <td>**Eyes ROM**</td>
    <td>ROM for the character's eyes.</td>
  </tr>
	<tr>
    <td>**FACS**</td>
    <td>[FACS](../art/characters/facial-animation/facs-poses-reference.md) (Facial Action Coding System) poses for describing visually discernible facial movement.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
From this interface, you can right‑click anywhere over the head preview and select **Revert&nbsp;to&nbsp;Default** to revert all changes to a blank state, or deselect **Textured** to view a completely grayscale head.
</Alert>

### Test in Experience

The **Test in Experience** button starts playtesting the experience with the previewed avatar. It currently does not have any of the clothing you applied onto it, but eventually will.

<figure>
<img src="../assets/studio/avatar-preview/Interface-Test-In-Experience.jpg" width="700" alt="Test in Experience button indicated in Avatar Preview tool" />
</figure>

### Publish

The **Publish** button opens the publish asset dialog, with an option to distribute the avatar to the [Creator Marketplace](../production/publishing/creator-marketplace.md).

<figure>
<img src="../assets/studio/avatar-preview/Interface-Publish.jpg" width="700" alt="Publish button indicated in Avatar Preview tool" />
</figure>

## Adding Items

The **add item** button allows you to add custom assets to the tool's palette. For example, you can select a hair [accessory](../art/accessories/index.md) in the [Explorer](../studio/explorer.md) or 3D workspace, click the button, and the accessory will be added to the **Hair** subsection of **Accessories**, as well as be equipped on the avatar.

<figure>
<img src="../assets/studio/avatar-preview/Add-Item-Button.jpg" width="700" alt="Add Item button indicated in Avatar Preview tool" />
</figure>

<Alert severity="info">
If all you have is a standalone head `Class.Model`, you can add it as a custom item to any R15 character rig, such as those generated from the [Rig Builder](../studio/rig-builder.md).
</Alert>

<Alert severity="warning">
Currently, only [accessories](../art/accessories/index.md#3d-accessories) are supported for adding to the palette, with limited or no support for [animations](../animation/index.md), shoes, accessories without preexisting categories, and non‑head body parts. Increased support for these items will come in the future.
</Alert>

To add an item to the palette:

1. Select a valid instance from the [Explorer](../studio/explorer.md) or 3D workspace.

   <img src="../assets/studio/avatar-preview/Accessory-In-Explorer.png" width="320" alt="Accessory instance selected in Explorer hierarchy" />

1. Click the **add item** button at the bottom of the selection column along the left side of the window.

   <img src="../assets/studio/avatar-preview/Add-Item-Button.jpg" width="700" alt="Add Item button indicated in Avatar Preview tool" />

   The item appears in the appropriate section and subsection of the [Check&nbsp;Body](#check-body) interface, for example **Accessories**&nbsp;&rarr; **Hair**, and is equipped on the avatar.

   <img src="../assets/studio/avatar-preview/Accessory-In-Palette.jpg" width="700" alt="Accessory added to palette in Avatar Preview tool" />
