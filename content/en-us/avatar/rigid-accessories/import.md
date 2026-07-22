---
title: Import rigid accessories
description: Use the Importer to add third-party models to Studio before using the Accessory Fitting Tool to convert the model to an Accessory.
---

Studio's Importer lets you import 3D assets into your projects, such as character bodies, makeup, and rigid accessories. The following instructions detail how to import a rigid accessory `.fbx` or `.gltf` file into Studio as a `Model` object and convert it into an `Accessory` object that you can use in your games, upload to the Marketplace, or share with other creators.

<Alert severity ='info'>
If your `.fbx` or `.gltf` file is a single mesh, you can use the [Avatar Setup](../../avatar-setup/) tool to automatically partition the mesh into the appropriate 15 body parts necessary for an avatar character body.
</Alert>

While the Importer provides object previews and error-checking to ensure that your creation meets Roblox's [general 3D requirements](../../art/modeling/specifications.md), it's important to ensure that your character model also meets Roblox's [rigid accessory specifications](./specifications.md) to use or sell this asset as an avatar-ready rigid accessory, otherwise you can encounter errors at different points in the workflow.

## Import accessories

To import your asset as a rigid accessory:

1. In the **Home** tab, click the **Import** button to open the 3D Importer. A file browser opens.
1. Select your rigid accessory's `.fbx` or `.gltf` file. The 3D Importer loads a preview of the rigid accessory.

      <img src="../../assets/art/accessories/creating-rigid/Import-Rigid-Accessory.png" width = "80%"/>

1. Select **Import**. The asset populates in your workspace as a `Class.Model` with the appropriate textures applied as a `Class.SurfaceAppearance` or `Class.MeshPart.TextureID`.

<BaseAccordion>
<AccordionSummary>Textures didn't load correctly?</AccordionSummary>
<AccordionDetails>
If your textures didn't load correctly, you can import them manually using the [Asset Manager](../../projects/assets/manager.md):

1. In the **Asset Manager**, click the **Import** button. If you are unable to access the Asset Manager, save and publish your game first.
1. Upload your image files.
1. After moderation clears your images, select the `Class.MeshPart` parented within your imported `Class.Model`, then add a `Class.SurfaceAppearance` child to your `Class.MeshPart`.

   <img src="../../assets/art/accessories/creating-rigid/Adding-Surface-Appearance-Bow.png" />

1. Select the `Class.SurfaceAppearance` object, then in the **Properties** window, click each property value and assign the appropriate texture image from the asset dropdown:

   1. Set the **ColorMap** to the **\_ALB** texture image.
   1. Set the **MetalnessMap** to the **\_MTL** texture image.
   1. Set the **NormalMap** to the **\_NOR** texture image.
   1. Set the **RoughnessMap** to the **\_RGH** texture image.

   <img src="../../assets/art/accessories/creating-rigid/Surface-Appearance-Asset-Dropdown-Bow.png" />

</AccordionDetails>
</BaseAccordion>

## Convert rigid accessories

After importing your asset into Studio, you can begin **fitting** your imported object to a mannequin and **converting** the `Class.Model` object into a `Class.Accessory`. When fitting and converting your accessory it's important to use the [Accessory Fitting Tool](../accessory-fitting-tool.md) (AFT) to correctly preview the placement and apply the correct configurations to your accessory.

To fit and generate your accessory:

1. In the toolbar's **Avatar** tab, click **Accessory** to open the AFT. The **Accessory Fitting Tool** panel displays.
1. In the panel,

   1. Select the **Part** field, then in the **Explorer** window, select the accessory `Class.MeshPart` object.
   1. Back in the panel, click the **Next** button. The **Asset Type** page displays.

   <img src="../../assets/art/accessories/creating-rigid/AFT-Select-Mesh-Bow.png" />

1. In the **Asset Type** page,

   1. Set asset type to **Accessory**, then use the dropdown menu to choose the location of where you want the rigid accessory to attach to a character's body.
   1. Set body type to the [body scale](./specifications.md#body-scale) you determined while sculpting and sizing of the asset during the creation process, then click the **Next** button. A preview panel displays with a default character wearing your rigid accessory.

   <img src="../../assets/art/accessories/creating-rigid/AFT-Select-Type-Bow.png" />

1. Select one of the humanoid characters as a mannequin:

   1. In the **Avatars** section, select a humanoid character body.
   1. In the preview panel, deselect the previous selection. Your character body selection displays in the preview window.

      <img src="../../assets/art/accessories/creating-rigid/AFT-Add-Avatar-Panel-Bow.png" />

1. Using both the AFT preview window and the viewport, adjust the position, scale, and rotation of the rigid accessory.

   1. Use the AFT preview window and your mannequin as an accurate preview of how your asset fits on the character. The clothing mannequin in the viewport does not accurately portray how rigid accessories attach.
   1. In the viewport, use the **Move**, **Scale**, and **Rotate** tools to adjust the positioning of your rigid accessory.
   1. If you accidentally select something else, click back into the AFT panel to reselect the accessory and resume your adjustments using the transformation tools.

      <video controls src="../../assets/art/accessories/creating-rigid/Fitting-Mask.mp4" width="100%"></video>

1. After previewing and fitting your asset, click the **Generate MeshPart Accessory** button.

After successful fitting and converting, your 3D model populates in your project as an `Class.Accessory`. With this `Class.Accessory` object, you can perform any of the following:

- Begin the process of [uploading and publishing](../../marketplace/publish-to-marketplace.md#upload-an-asset) the rigid accessory to the Marketplace.

- Use the rigid accessory in your current game by equipping it to character models with [HumanoidDescription](../../characters/appearance.md#manually-modify-appearance), or by dragging and dropping the rigid accessory under the appropriate character `Class.Model` object.

- Save the rigid accessory to your [Toolbox](../../projects/assets/toolbox.md) or make it public on the [Creator Store](../../production/creator-store.md) to use within any of your games or share with other creators.
