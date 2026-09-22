---
title: Convert
description: Use the Accessory Fitting Tool to convert a Model object to an Accessory.
prev: /art/accessories/creating/importing
---

With the `Class.Model` in your project, the last step in the process of clothing creation requires you to convert this object to a standard `Class.Accessory` that avatars can equip. Using the [Accessory Fitting Tool](../../../avatar/accessory-fitting-tool.md) (AFT), convert the model object to a `Class.Accessory` that you can then use in your game or publish to the Marketplace.

To generate the accessory object:

1. In the **Avatar** tab, click **Accessory** to open the AFT. The **Accessory Fitting Tool** panel displays.
1. In the panel:

   1. Select the **Part** field, then in the **Explorer** window, select the layered accessory `Class.MeshPart` object.
   1. Back in the panel, click the **Next** button. The **Asset Type** page displays.

1. In the **Asset Type** page:

   1. Set asset type to **Clothing**, then use the dropdown menu to select the clothing type. This tutorial sets it to **Shirt**.
   1. Click the **Next** button. A preview panel displays with a default character wearing your layered accessory.

1. Test out various sample characters, clothing, and animations. If necessary, make minor cage adjustments using the editing features, or larger cage changes back in your third-party modeling software. For more information on this process, see [Accessory Fitting Tool - Test accessories](../../../avatar/accessory-fitting-tool.md#test-accessories).
1. After previewing your asset, click the **Generate MeshPart Accessory** button. Your 3D model populates in your project as an `Class.Accessory` object.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Exporting-Clothing-in-Studio-Highlight.png" />
    <figcaption>Clothing accessory in viewport</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Exporting-Accessory-Explorer.png" />
    <figcaption>Clothing accessory in Explorer</figcaption>
  </figure>
</GridContainer>

<Alert severity = 'success'>
Congratulations, you've completed the layered accessory tutorial. With your new `Class.Accessory`, you can perform any of the following:

- [Upload the accessory](../../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the accessory in your current game by equipping it to character models with a [`HumanoidDescription`](../../../characters/appearance.md#manually-modify-appearance), or by dragging and dropping the accessory under the appropriate character `Class.Model` object.
- Save the accessory to your [Toolbox](../../../projects/assets/toolbox.md) to share or use within any of your games.

</Alert>
