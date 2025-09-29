---
title: Use the Accessory Fitting Tool
description: Use the Accessory Fitting Tool to convert your model to an rigid accessory.
next: /art/accessories/creating-rigid/publishing
prev: /art/accessories/creating-rigid/importing
---

After importing your asset into Studio, you can begin **fitting** your imported object to a mannequin and **converting** the `Class.Model` object into a `Class.Accessory`. When fitting and converting your accessory it's important to use the [Accessory Fitting Tool](../../../art/accessories/accessory-fitting-tool.md) (AFT) to correctly preview the placement and apply the correct configurations to your accessory.

<video controls src="../../../assets/art/accessories/creating-rigid/Converting.mp4" width="100%"></video>

To fit and generate your accessory:

1. In the toolbar's **Avatar** tab, click **Accessory** to open the AFT.
2. In the new AFT panel, select the **Part** field and, in the workspace, select the accessory `Class.MeshPart` object in the workspace and press **Next**.

3. Set **type** of asset to **Back**. Press **Next** when complete.

4. Using both the AFT preview window and the workspace, adjust the position, scale, and rotation of the accessory.

   1. Use the AFT preview window and your mannequin as an accurate preview of how your asset fits on the character. The clothing mannequin in the workspace does not accurately portray how rigid accessories attach.
   2. In the workspace, use the **Move**, **Scale**, and **Rotate** tools to adjust the positioning of your rigid accessory.
   3. If you accidentally select something else, click back into the AFT panel to reselect the accessory and resume your adjustments using the transformation tools.

5. After previewing and fitting your asset, select the **dropdown** next to **Generate** button to select **Generate Legacy Accessory**. The accessory object populates in your viewport and in the **Explorer**.

   - For rigid accessories that you intend to sell on the Marketplace you must use the [generate legacy accessory](../accessory-fitting-tool.md#generate-legacy-accessory) option when creating your Marketplace accessories.

     <img src="../../../assets/accessories/accessory-fitting-tool/Generate-Legacy-Accessory.png" width ="60%" alt="A dropdown appears above the GenerateMeshPartAccessory when expanded, displaying a Generate Legacy Accessory option."/>

6. Test your accessory by equipping it to a character and using the **Avatar Setup** tool.

   <video controls src="../../../assets/art/accessories/creating-rigid/Testing.mp4" width="100%"></video>

<Alert severity = 'success'>
After successful fitting and converting, your 3D model should populate in your project as a `Class.Accessory`. With this `Class.Accessory` you can perform any of the following:

- [Upload the accessory](../../../art/accessories/creating-rigid/publishing.md) to the Marketplace.
- Use the accessory in your current experience by equipping it to character models with [HumanoidDescription](../../../characters/appearance.md#manually-modify-appearance), or by dragging and dropping the accessory under the appropriate character `Class.Model` object.
- Save the accessory to your [Toolbox](../../../projects/assets/toolbox.md) to share or use within any of your experiences.

</Alert>
