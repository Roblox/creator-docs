---
title: Converting
description: Use the Accessory Fitting tool to convert a Model object to an Accessory.
prev: /art/accessories/creating/importing
---

With the `Class.Model` in your project, the last step in the process of clothing creation requires you to convert this object to a standard `Class.Accessory` that avatars can equip. Using the Accessory Fitting tool, convert the model object to a `Class.Accessory` that you can then use in your experience or publish to the Marketplace.

To generate the accessory object:

1. In the Avatar tab, select the **Accessory Fitting Tool**. The Accessory Fitting Tool panel displays on the left side of the workspace.
2. Select the `Class.Model` of the clothing item in the viewport. The tool's text field populates with the name of the object selected. Alternatively, you can select the object within the Explorer window.
3. Test out various sample characters, clothing, and animations. See [Testing Accessories](../../../art/accessories/accessory-fitting-tool.md#testing-accessories) for additional information.
   - If required, make minor cage adjustments using the editing features. Larger cage changes may require returning to your third-party modeling software and re-exporting the asset.
4. When ready to generate your accessory, click **Generate MeshPart Accessory**. The Accessory object with your model populates in your workspace.
   For additional information and documentation on the tool, see [Accessory Fitting Tool](../../../art/accessories/accessory-fitting-tool.md).

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/art/accessories/creating/Exporting-Clothing-in-Studio-Highlight.png" />
    <figcaption>Clothing accessory in Workspace</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/art/accessories/creating/Exporting-Accessory-Explorer.png" />
    <figcaption>Clothing accessory in Explorer</figcaption>
  </figure>
</GridContainer>

<Alert severity = 'success'>
Congratulations, you've completed your clothing tutorial. With this accessory, you can:

- Equip the accessory on an avatar-ready character by drag and dropping the accessory on an existing model, or using [HumanoidDescription](../../../characters/appearance.md#humanoiddescription).
- Save the accessory as an [avatar asset](../../../projects/assets/index.md#for-avatars) for use in an experience later.
- If you meet certain account requirements, you can [upload your asset](../../../art/marketplace/publishing-to-marketplace.md) for moderation and start selling it on the Marketplace.

</Alert>
