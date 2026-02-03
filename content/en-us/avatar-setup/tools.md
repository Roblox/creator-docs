---
title: Avatar Setup Tools
description: The Avatar setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

Use the **Avatar Setup** tool's [preview and testing tools](#preview) to ensure your character moves, animates, equips accessories, and looks as expected.

**Avatar Setup** also provides tools for [minor editing and adjustments](#edit-tools) that allow you to make minor to moderate changes to your model. Major fixes may require you to make your adjustments in your third-party modeling software and re-export.

<Alert severity = 'info'>
As **Avatar Setup** continues development, check this page for additional tools and features when they release.
</Alert>

## Preview

In the **Avatar Setup** window, use the side navigation to access the various testing interfaces.

<GridContainer numColumns='2'>
<figure><img src="../assets/avatar/avatar-setup/Testing-Interface.png" alt="" width = "100%"/></figure>
<figure>Once an avatar is added to the tool, four tabs appear on the left side of the panel: <ul><li>[Check body](#check-body)</li> <li>[Check face](#check-face)</li> <li>[Test in experience](#test-in-experience)</li> <li>[Publish](./index.md#publish)</li></ul></figure>
</GridContainer>

### Check body

The **Check Body** interface contains tabs for Animations, Clothing, Accessories, and Body assets, such as skin-tone and swapping body parts. Clicking a subtab like Shirts, Waist, or Skin reveals a selection column along the left side of the window for testing various cosmetics and visuals.

<img src="../assets/avatar/avatar-setup/Skin-Tone-Selector.png" alt="" width = "60%"/>

### Check face

The **Check Face** interface zooms into the face and allows you test various facial poses.

<GridContainer numColumns="2">
<figure>
    <img src="../assets/avatar/avatar-setup/Test-Face-1.png" />
    <figcaption>Check the range of facial poses with multiple facial animation tests.</figcaption>
</figure>
<figure>
    <img src="../assets/avatar/avatar-setup/Test-Face-2.png" />
    <figcaption>Unexpected facial animation behavior, such as crashing or artifacts, may minor adjustment to the base mesh and re-running the auto-setup process.</figcaption>
</figure>
</GridContainer>

### Equip items

Selected items are equipped on the avatar and are added to the currently equipped column on the right side. Selected animations begin playing as a preview of how they'll look in a running experience.

To unequip an item, click it again in the selection column, press the **X** button at the top right of the equipped item, or right-click the asset in the Equipped column and select **Unequip**. You can also drag and order the various equipped accessories to set the worn order.

### Add items

The add item button allows you to add custom assets to the tool's palette for testing.

To add an item to the palette:

1. Select a valid **Accessory** or **Body Part** asset from the **Explorer** or 3D viewport.
2. Click the add item button at the bottom of the selection column along the left side of the window.

   <img src="../assets/avatar/avatar-setup/Add-Object.png" alt=""width = "20%"/>

3. The item appears in the appropriate section and subsection of the Check Body interface, such as **Accessories** → **Hair**.

### Test in experience

The **Test in Experience** button starts playtesting the experience with the previewed avatar. Any changes made using the preview tools, such as equipped clothing or accessories, or modifications such as skin tone or body part swaps, do not transfer over to the playable character model in this mode.

## Edit tools

Use the **Avatar Setup** tool to make quick adjustments to your model and any generated assets.

<Alert severity = 'info'>
As **Avatar Setup** continues development, check here for additional tools and features when they release.
</Alert>

### Edit cage meshes

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/fwbuhzq1D0k" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
<br /><br />

You can modify your body cage mesh using the cage mesh editing tool. Use the brush and various brush settings to modify your cage, allowing you to make adjustments to how clothing and other layered assets fit on your character. <br />

Use the following controls to get fine-grain control on your cage edits:
<img src="../assets/avatar/avatar-setup/Cage-Edit-Panel.png" alt=""width = "80%"/>

- Symmetrical and mirror edits along X-axis.
- Brush with radius and falloff controls.
- Brush falloff visualization over the vertices.
- Ability to hide or display equipped layered clothing items. Layered clothing will update in real time in the **Avatar Setup** tool's preview window

<Alert severity = 'warning'>
Major cage edits may require returning to your third-party modeling tool, making your cage adjustments, and then re-exporting the asset.
</Alert>
