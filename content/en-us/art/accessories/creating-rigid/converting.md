---
title: Using the Accessory Fitting Tool
description: Use the Accessory Fitting tool to convert your model to an rigid accessory.
next: /art/accessories/creating-rigid/validation
prev: /art/accessories/creating-rigid/importing
---

After importing your asset into Studio, you can begin **fitting** your imported object to a mannequin and **converting** the `Class.Model` object into a `Class.Accessory`. When fitting and converting your accessory it's important to use the **Accessory Fitting Tool (AFT)** to correctly preview the placement and apply the correct configurations to your accessory.

To fit and generate your accessory:

1. In the **Avatar** tab, open the **Accessory Fitting Tool (AFT)**.
2. In the new AFT panel, select the **Part** field and, in the workspace, select the accessory `Class.MeshPart` object in the workspace and press **Next**.

   <img src="../../../assets/art/accessories/creating-rigid/AFT-Select-Mesh.png" />

3. On the Asset Type page, select the **type** of asset and the expected **body scale**. Press **Next** when complete.

   1. This tutorial uses a **Hat** asset with an **Proportions Normal** scale.
   2. Body scale is typically set based on the original sculpting and sizing of the asset. See [Body Scale](../../../art/accessories/body-scale.md) for additional information on rigid accessory scaling.

      <img src="../../../assets/art/accessories/creating-rigid/AFT-Select-Type.png" />

4. On the preview screen, select one of the humanoid characters as a mannequin:

   1. In the Avatars section, select a humanoid base body character.
   2. In the preview panel, deselect the previous selection. Only the humanoid body displays in the preview window.

      <img src="../../../assets/art/accessories/creating-rigid/AFT-Add-Avatar-Panel.png" />

5. Using both the AFT preview window and the workspace, adjust the position, scale, and rotation of the accessory.

   1. Use the **AFT preview window** and your mannequin as an accurate preview of how your asset fits on the character. The clothing mannequin in the workspace does not accurately portray how rigid accessories attach.
   2. In the workspace, use the **Move**, **Scale**, and **Rotate** tools in the workspace to adjust the positioning of your rigid accessory.
   3. If you accidentally select something else, click back into the AFT panel to reselect the accessory and resume your adjustments using the transformation tools.

      <video controls src="../../../assets/art/accessories/creating-rigid/Fitting-Mask.mp4" width="100%"></video>

6. After previewing and fitting your asset, select **Generate MeshPart Accessory** to create the Accessory and add it to your explorer.

<Alert severity = 'success'>
After successful fitting and converting, your 3D model should populate in your project as a `Class.Accessory`. With this `Class.Accessory` you can perform any of the following:

- [Upload the accessory](../../../art/accessories/creating-rigid/publishing.md) to the Marketplace. At this time, only UGC Program participants can sell user-generated content on the Marketplace.
- Use the accessory in your current experience by equipping it to character models with [HumanoidDescription](../../../characters/appearance.md#humanoiddescription), or by dragging and dropping the accessory under the appropriate character `Class.Model` object.
- Save the accessory to your [Toolbox](../../../projects/assets/toolbox.md) to share or use within any of your experiences.

</Alert>
