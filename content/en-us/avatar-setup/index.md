---
title: Avatar Setup
description: The Avatar Setup tool helps accelerate the avatar character, clothing, and accessory creation process by automatically processing custom models into avatar assets.
---

**Avatar Setup** helps accelerate the avatar character, clothing, and accessory creation process by automatically processing custom models into avatar assets. If your characters, accessories, and clothing don't have all essential components for publishing to the [Marketplace](https://www.roblox.com/catalog), Avatar Setup can perform the following for your 3D models:

- **Rigging** — Adds an R15 armature to your body model to enable movement and animation.
- **Skinning** — Adds weights and influences to various surfaces of your mesh, ensuring an organic and natural flexibility during movement.
- **Facial animation** — Generates the FACS poses, facial rigging, skinning, and animation data required for facial animation and avatar chat.
- **Caging** — Adds the required cages to your asset, enabling it to support layered clothing.
- **Partitioning** — Separates the body mesh into the appropriate R15 parts.
- **Creating attachments** — Adds the appropriate attachment points enabling the character to wear rigid accessories.

<img src="../assets/studio/general/Toolbar-Avatar-Setup.png" width="800" alt="Avatar Preview button indicated in Avatar tab" />

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/Hp9pr2FpZa8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> <br />

## Import a 3D asset

The [Importer](../studio/importer.md) tool allows you to import custom 3D assets that you made in third-party modeling tools like Blender or Maya directly into Studio. If your custom 3D assets don't include all essential avatar components for the Marketplace, Avatar Setup will add any missing components as it processes the assets.

To import a custom 3D asset using the Importer tool:

1. Navigate to the **Home** tab, then select **Import**. A file browser displays.
1. Select the `.fbx`, `.obj`, or `.gltf` model you want to import. After a few moments, the **Import Preview** window opens with a preview of your asset.
1. In the **File General** section, disable the **Upload To Roblox** option. This setting stops the asset from immediately saving to your Toolbox, preventing unwanted copies of similar assets.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> To create an import preset for this workflow,
   1. In the top-right of the **Import Preview** window, click the ⋯ dropdown.
   1. In the contextual menu, click **Save as New**.
1. Verify the preview and any [warnings or errors](../studio/importer.md#warnings-and-errors) in your model. Certain warnings and errors may require readjusting the model in the third-party software you used to create the asset.
1. Click the **Import** button to add the model into your workspace. After a moment, it displays as a `Class.Model` object in the **Explorer** window.

<Alert severity = 'warning'>
When you import a new model into Studio, the system adds the model to the moderation queue. If your model is moderated, you will receive a moderation email with a link to appeal. This appeal can take up to 10 minutes to resolve.
</Alert>

## Run Avatar Setup

When your project has the appropriate `Class.Model` object in your workspace, you can run Avatar Setup to see if your 3D asset requires any additional avatar components before you can publish it to the Marketplace as a character body, accessory, or clothing item. Avatar Setup supports the conversion of the following 3D asset types from a base `Class.Model`:

<figure>
<table><thead>
  <tr>
    <th>Asset type</th>
    <th>Input object</th>
    <th>Output object</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Avatar body</td>
    <td>`Class.Model` containing one or more `Class.MeshPart` objects that meet Avatar Setup's supported [body inputs](./auto-setup-requirements.md#body).</td>
    <td>`Class.Model` parenting associated 15 `Class.MeshPart` objects and other expected [avatar components](../art/characters/index.md#components-of-an-avatar).</td>
  </tr>
  <tr>
    <td>Accessory</td>
    <td>`Class.Model` containing one or more `Class.MeshPart` objects that meet Avatar Setup's supported [accessory inputs](./auto-setup-requirements.md#accessories). <br /> <br />Must [bundle](./auto-setup-requirements.md#bundle-multiple-assets) with an avatar body `Class.Model` for Avatar Setup.</td>
    <td>`Class.Accessory` that includes all expected [rigid accessory components](../art/accessories/index.md#components-of-a-rigid-accessory).</td>
  </tr>
  <tr>
    <td>Layered clothing</td>
    <td>`Class.Model` containing one or more `Class.MeshPart` objects that meet Avatar Setup's supported [accessory inputs](./auto-setup-requirements.md#accessories-and-clothing). <br /> <br />Can optionally [bundle](./auto-setup-requirements.md#bundle-multiple-assets) with an avatar body `Class.Model` for Avatar Setup.</td>
    <td>`Class.Accessory` that includes all expected [layered accessory components](../art/accessories/layered-clothing.md#components-of-a-layered-clothing-accessory).</td>
  </tr>
  <tr>
    <td>Multiple accessories and clothing with single body</td>
    <td>`Folder` [bundle](./auto-setup-requirements.md#bundle-multiple-assets) containing one or more `Class.Model` that meet supported inputs for accessories, clothing, or body. <br /> <br />Must [bundle](./auto-setup-requirements.md#bundle-multiple-assets) with an avatar body `Class.Model` for Avatar Setup.</td>
    <td>`Class.Model` character body and any `Class.Accessory` equippable items. <br /> <br />All generated assets include expected avatar item components.</td>
  </tr>
</tbody>
</table>
</figure>

<Alert severity = 'info'>
For more in-depth information on supported input configurations, see the individual asset specifications on [Avatar Setup requirements](./auto-setup-requirements.md).
</Alert>

To run Avatar Setup:

1. In the **Explorer** window, select the model or specific meshes of the model. If you want to select multiple meshes at once, expand the `Class.Model` object, then hold shift and click on the individual mesh objects you want to process as avatar assets.

   <BaseAccordion>
   <AccordionSummary>
   <Typography variant='buttonLarge'>Reference models</Typography>
   </AccordionSummary>
   <AccordionDetails>
   For an asset that meets all of these model requirements, download one of the following Avatar Setup templates for your own reference and testing:

   <Grid container alignItems="stretch" style={{ margin: -6 }}>

   <Grid item XSmall={12} Medium={6} Large={4} style={{ padding: 6 }}>
   <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
   <CardContent style={{ flex: 1 }}>
   <center>Nature Girl</center>
   <figure>
   <center>
   <img
              src="../assets/art/resources/Archer-Girl-Preview.png"
              width="100%"
            />
   </center>
   </figure>
   <figure>
   A comprehensive <code>.zip</code> folder of an Avatar Setup ready character model, including clothing and rigid accessory assets and PBR texture assets.
   <br /><br />
   This template is not compatible with the traditional avatar creation workflow.
   </figure>
   </CardContent>
   <CardActions>
   <Button href="../assets/art/reference-files/NatureArcherGirl-AutoSetup.zip" fullWidth size="large" color="primary" variant="contained">Download</Button>
   </CardActions>
   </Card>
   </Grid>

   <Grid item XSmall={12} Medium={6} Large={4} style={{ padding: 6 }}>
   <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
   <CardContent style={{ flex: 1 }}>
   <center>Stylish Male</center>
   <figure>
   <center>
   <img
              src="../assets/art/resources/StylizedMale-Preview.png"
              width="100%"
            />
   </center>
   </figure>
   <figure>
   A comprehensive <code>.zip</code> folder of an Avatar Setup ready character model, including the base body and associated PBR textures.
   <br /><br />
   This template is not compatible with the traditional avatar creation workflow.
   </figure>
   </CardContent>
   <CardActions>
   <Button href="../assets/art/reference-files/StylizedMale-AutoSetup.zip" fullWidth size="large" color="primary" variant="contained">Download</Button>
   </CardActions>
   </Card>
   </Grid>

   </Grid>
   </AccordionDetails>
   </BaseAccordion>

1. With the model or meshes selected, navigate to the **Avatar** tab, then select **Avatar Setup**.
1. In the **Configure Models** section,
   1. Set **Preset** to the appropriate category.
      1. If you want to publish your assets to the Marketplace for users to purchase and use across Roblox, select **Platform Avatar**. This option generates a more restrictive setup that's necessary to pass validation and moderation.
      1. If you want to upload your assets to your inventory for non-player characters (NPCs) or starter player characters for your experiences, select **Development Avatar**. This option generates a less restrictive setup.

      <img src="../assets/avatar/avatar-setup/Configure-Models.png" width="50%" alt="" />

   1. Set **Type** for each asset to the correct asset type so that it moves and animates correctly in the 3D space.
      1. For character body geometry, select **Body**.
      1. For layered clothing assets, select **Layered**.
      1. For rigid accessory assets, select **Rigid**.
      1. For eyebrow and eyelash assets, select **Eye Layered**.

      <img src="../assets/avatar/avatar-setup/Set-Type.png" width="50%" alt="" />

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Near the bottom-left corner, click on the gear icon to configure specialty settings for your character model.
   1. If your character has a decal for its face and you want to enable the conversion of the texture into a [dynamic head](../art/characters/facial-animation/index.md), enable **Handle face as 2D decal**. This process allows you to preserve your creative intent while complying with Marketplace policy that requires all avatars to have dynamic heads.

      <BaseAccordion>
      <AccordionSummary>
      <Typography variant='buttonLarge'>Converting a decal into a dynamic head?</Typography>
      </AccordionSummary>
      <AccordionDetails>
      The process of converting a decal into a dynamic head infers eye and mouth regions from your existing texture, generates cages and FACS data, then maps the result onto a dynamic head template. For best results, review the following guidance:

      **Run Avatar Setup with the character's body and head**

         - If you only run Avatar Setup with the character's head, this speciality setting will fail.

      **Verify avatar face is front-facing**

         - Before you run Avatar Setup, verify that your character's face is facing the front and visible in the preview. Whenever you manually position your character's face, make sure you enable **Manually align front** in the Avatar Setup window's speciality settings.

      **Delete the `Class.FaceControls` object**

         - Avatar Setup retains your current face setup whenever it detects a `Class.FaceControls` object under your character's `Enum.BodyPart|Head` model. If one exists in your character, delete it from  before running Avatar Setup.

      **Use `Class.SurfaceAppearance` instead of `Class.MeshPart.TextureId|TextureID`**

         - When you have only `Class.MeshPart.TextureId|TextureID` or both `Class.MeshPart.TextureId|TextureID` and `Class.SurfaceAppearance` objects defined for your avatar, remove or replace the `Class.MeshPart.TextureId|TextureID` objects with `Class.SurfaceAppearance` objects for significant texture quality improvements when rendering.

      </AccordionDetails>
      </BaseAccordion>

   1. If your character includes a [higher-fidelity rig](../art/characters/specifications.md#higher-fidelity-rigs) with additional joints, enable **Create R15 with optional joints**.
   1. If you want to manually align the front direction of your character with the negative Z-axis in world space, enable **Manually Align Front**. While auto-setup does this automatically for you, it can sometimes fail to properly determine the front of your character.
   1. If you want to add a post-processing step to significantly improve the alignment of your character's head cage with the head model and its facial features, enable **Improve facial caging**. This is particularly important if you plan on using [makeup](../makeup/index.md) with your character.
   1. If you are importing a development avatar and want to skip the auto-decimation of input meshes with resolution above the triangle budgets required for the Marketplace, disable **Reduce triangle count**.

      <img src="../assets/avatar/avatar-setup/Gear-Icon.png" width="50%" alt="" />

1. Near the bottom-right corner, click the **Set Up** button.
   1. If your model requires auto-setup for missing avatar components, the tool begins processing your model. This can take several minutes. Once auto-setup is complete, the tool populates your avatar asset in the Avatar Setup window.
   1. If your model doesn't require auto-setup, the tool populates your avatar asset in the Avatar Setup window.

## Testing tools

After you successfully load your character into the Avatar Setup window, you can access various testing tools in the window's side navigation to ensure your character moves, animates, and equips clothing and accessories properly.

<img src="../assets/avatar/avatar-setup/Testing-Interface.png" width="70%" alt="" />

In each of these interfaces, you can see which items are currently equipped to your character on the right side of the Avatar Setup window. From here, you can:

- **Unequip items** by right-clicking on an equipped item, then selecting **Unequip Item** from the contextual menu.
- **Set the worn order** by dragging and ordering the various equipped accessories.

If you discover any issues that can't be resolved with Avatar Setup testing tools, you may need to update your character model using the third-party modeling software you used to create the asset, then retry the auto-setup process.

### Check Body

The **Check Body** interface contains various tabs for checking how your character model animates, emotes, wears clothing and accessories, and changes skin tone. To learn more about what you can do with this interface, click through the following tabs.

<img src="../assets/avatar/avatar-setup/Skin-Tone-Selector.png" alt="" width = "60%"/>

<Tabs>
<TabItem key = "1" label="Animations">

The **Animations** tab lets you test how your character animates and emotes using each [default animation](../animation/using.md#default-character-animations) that Roblox provides for every avatar, such as the walk, jump, and swim animation.

If you notice any issues with your character's body as it animates, you can either use Avatar Setup's editing tools or your favorite third-party 3D modeling application to adjust your character's rig until the animations play properly.

</TabItem>
<TabItem key = "2" label="Clothing">

The **Clothing** tab lets you try on various layered clothing on your character to see if your character's cage works properly for different avatar clothing types, such as shirts, jackets, pants, and shoes.

If you notice any areas on your character's body that don't interact with clothing as expected, you can either use Avatar Setup's [Cage Brush](#cage-brush) or your favorite third-party 3D modeling application to adjust your character's cage until the clothing fits properly.

</TabItem>
<TabItem key = "3" label="Accessories">

The **Accessories** tab lets you try on various accessories on your character to see if your character's [attachment points](../art/accessories/specifications.md#attachment-points) work properly on different areas of the character's body, such as the front, back, or shoulder of the character.

If you notice any areas on your character's body that don't interact with accessories as expected, you can either use Avatar Setup's [Attachment Tool](#attachment-tool) to adjust your character's attachment points until accessories attach properly.

</TabItem>
<TabItem key = "4" label="Body">

The **Body** tab lets you change your character's skin tone and swap body parts to test how the character changes visual appearance.

</TabItem>
</Tabs>

### Check Face

The **Check Face** interface zooms closer to the character's face and allows you to test various facial poses and cosmetics. To learn more about what you can do with this interface, click through the following tabs.

<GridContainer numColumns="2">
<figure>
    <img src="../assets/avatar/avatar-setup/Test-Face-1.png" />
    <figcaption>Check the range of facial poses with multiple facial animation tests.</figcaption>
</figure>
<figure>
    <img src="../assets/avatar/avatar-setup/Test-Face-2.png" />
    <figcaption>Unexpected facial animation behavior, such as crashing or artifacts, may require minor adjustment to the base mesh and re-running the auto-setup process.</figcaption>
</figure>
</GridContainer>

<Tabs>
<TabItem key = "1" label="Animations">

The **Animations** tab lets you test your character's facial animations and range of motion for different parts of the face, such as the character's eyeballs, eyebrows, and mouth.

If you notice any issues with your character's facial expressions, you can either use Avatar Setup's editing tools or your favorite third-party 3D modeling application to adjust your character until the animations play properly.

</TabItem>
<TabItem key = "2" label="Body">

The **Body** tab lets you change your character's skin tone and swap heads to test how the character changes visual appearance.

</TabItem>
<TabItem key = "3" label="Makeup">

The **Makeup** tab lets you test [makeup](../makeup/index.md) on your character's face. You can either test entire makeup looks or individual makeup components in various combinations.

If you want to upload your makeup as an entire look, click on the [Save](#publish-to-the-marketplace) navigation, then select **Create Makeup Look**.

</TabItem>
<TabItem key = "4" label="Accessories">

The **Accessories** tab lets you try on accessories on your character to see if your character's [attachment points](../art/accessories/specifications.md#attachment-points) work properly for hair, head, and face avatar accessories.

If you notice any areas on your character's body that don't interact with accessories as expected, you can either use Avatar Setup's [Attachment Tool](#attachment-tool) to adjust your character's attachment points until accessories attach properly.

</TabItem>
</Tabs>

### Test in Experience

The **Test in Experience** tab starts playtesting the experience with your character model. This button references your active [playtesting mode](../studio/testing-modes.md) and retains the changes you make in the Avatar Setup window.

### Add test items

In addition to the side navigation test tooling, you can add custom assets to the Avatar Setup's testing palette that are either active in your current project or by assetID. For more information on either method, review the tabs below.

<Tabs>
<TabItem key = "1" label="From Project">

To add a custom item that's active in your current project to the Avatar Setup testing palette:

1. In the **Explorer** window or viewport, select a valid accessory or body part asset.
1. In the **Avatar Setup** window, navigate to the **Check Body** or **Check Face** interface, then click the plus button at the bottom of the selection column along the left side of the window. The item appears in the appropriate section and subsection of the interface, such as Accessories → Hair.

   <img src="../assets/avatar/avatar-setup/Add-Object.png" alt=""width = "20%"/>

</TabItem>
<TabItem key = "2" label="By AssetID">
To add a custom item by assetID to the Avatar Setup testing palette:

1. In the **Avatar Setup** window, navigate to the **Check Body** or **Check Face** interface, then click the down-facing arrow button.
1. From the contextual menu, select **AssetID**. The item appears in the appropriate section and subsection of the interface, such as Accessories → Hair.

   <img src="../assets/avatar/avatar-setup/AssetID.png" alt=""width = "50%"/>

</TabItem>
</Tabs>

## Editing tools

In addition to the Avatar Setup window, you can use Avatar Setup's Attachment Tool and Cage Brush in the viewport to make minor to moderate adjustments to the character's attachment points and cage.

<img src="../assets/avatar/avatar-setup/Editing-Tools.png" alt=""width = "50%"/>

### Attachment Tool

The **Attachment Tool** displays all attachment points on the character's body. When you select an attachment point, the Move tool displays, allowing you to adjust the attachment point's position within the character's body.

<img src="../assets/avatar/avatar-setup/Active-Attachment.png" alt=""width = "50%"/>

### Cage Brush

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/fwbuhzq1D0k" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
<br /><br />

The Cage Brush lets you modify your character's body cage mesh and make adjustments to how clothing and other layered assets fit on your character. The following controls provide fine-grain control on your cage edits:

<img src="../assets/avatar/avatar-setup/Cage-Edit-Panel.png" alt=""width = "80%"/>

- Symmetrical and mirror edits along X-axis.
- Brush with radius and falloff controls.
- Brush falloff visualization over the vertices.
- Ability to hide or display equipped layered clothing items. Layered clothing will update in real time in the **Avatar Setup** tool's preview window.

<Alert severity = 'warning'>
Major cage edits may require returning to your third-party modeling tool, making your cage adjustments, and then re-exporting the asset.
</Alert>

## Publish to the Marketplace

The **Save** button opens the Asset Configuration dialog, allowing you to upload the avatar and any accessory items to your inventory or publish everything configured as platform avatar assets to the Marketplace.

<img src="../assets/avatar/avatar-setup/Save.png" alt=""width = "70%"/>

When publishing your assets to the Marketplace, you must pay an [upload fee](../marketplace/publish-to-marketplace.md#upload-an-asset) and pass moderation in order to add your assets to the catalog. For additional resources on the publishing process and Marketplace, see the following:

- [Publish to the Marketplace](../marketplace/publish-to-marketplace.md)
- [Marketplace fees and commissions](../marketplace/marketplace-fees-and-commissions.md)
- [Marketplace policy](../marketplace/marketplace-policy.md)
