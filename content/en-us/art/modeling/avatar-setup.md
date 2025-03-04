---
title: Avatar Setup
description: The Avatar setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

The **Avatar Setup Tool** allows you to auto-setup avatar meshes, preview animations, clothing, skin tones, and test avatar character bodies directly in Studio. Marketplace creators can also begin the uploading and validation process from this tool to quickly publish their assets.

If a character model does not include all of Roblox's required [avatar components](../characters/index.md#components-of-an-avatar), the Avatar Setup tool **automatically generate these components** for you using [auto-setup](#auto-setup).

After auto-setup, or if a model already includes Roblox's required avatar components, the Avatar Setup tool previews the asset in the [test interface](#test-interface), where you can test different animations, clothes, accessories, body parts, and more.

<img src="../../assets/studio/general/Avatar-Tab-Avatar-Setup.png" width="760" alt="Avatar Preview button indicated in Avatar tab" />

<GridContainer numColumns="2">
<figure>
    <img src="../../assets/avatar/avatar-setup/Avatar-Setup-Example-A.png" />
    <figcaption>The [Avatar auto-setup](#avatar-auto-setup) function can convert a basic mesh body to a model with fully compatible avatar components.</figcaption>
</figure>
<figure>
    <img src="../../assets/avatar/avatar-setup/Avatar-Setup-Example-B.png" />
    <figcaption>Using additional Avatar setup features, you can [test](#testing-interface) out skin tones, animations, rigid and layered clothing, and more.</figcaption>
</figure>
</GridContainer>

## Auto-setup

The **auto-setup** feature converts a body model into a finished avatar model with all the advanced components that allow characters to interact with the world and express themselves. Auto-setup can perform the following on a submitted humanoid-shaped model:

- **Rigging** — Adds an R15 armature to your body model to enable movement and animation.
- **Skinning** — Adds weights and influences to various surfaces of your mesh, ensuring an organic and natural flexibility during movement.
- **Facial animation** — Generates the FACS poses, facial rigging, skinning, and animation data required for facial animation and avatar chat.
- **Caging** — Adds the outer cage mesh to your avatar, enabling it to wear layered clothing.
- **Partitioning** — Separates the body mesh into the appropriate R15 parts.
- **Creating attachments** — Adds the appropriate attachment points enabling the character to wear rigid accessories.

See the following examples for the types of bodies and styles that work best with auto-setup:

<GridContainer numColumns="3">
<figure>
    <img src="../../assets/avatar/avatar-setup/Inorganic-Model.png" />
    <Alert severity = 'error'>Robots and other characters that use stiff, artificial, and inorganic movement and body styles.</Alert>
</figure>
<figure>
    <img src="../../assets/avatar/avatar-setup/Non-Humanoid-1.png" />
    <Alert severity = 'error'>Animals, or other characters that use non-human, or overly exaggerated movements and body styles.</Alert>
</figure>
<figure>
    <img src="../../assets/avatar/avatar-setup/Supported-Model.png" />
    <Alert severity = 'success'>Humanoid characters that use realistic proportions. Some stylization and cartoon elements can still apply.</Alert>
</figure>
</GridContainer>

### How auto-setup works

The auto-setup tool utilizes machine learning (ML) models that handles the rigging, skinning, and caging application. After creating the rigging, skinning, and caging data, the tool applies body partitioning and attachment point generation using a geometry-based solution.

If existing non-rig components, such as cages, attachments, or animation, are already included in the imported `Class.Model`, the auto-setup tool removes them and generates new components. If the model includes a compatible R15 rig, the tool preserves the rigging and skinning data and does not overwrite this data.

The ML models train on a dataset consisting of hundreds of different body shapes and styles. The tool performs best with human-like body models that are similar to those used for training and becomes more inconsistent for body models that diverge from the training set.

Roblox intends to continue releasing updated versions of the auto-setup ML models over time. When uploading an avatar body asset, Studio gives you the option to add your input model as part of a dataset for additional training and improvements as well as provide feedback on the quality of the auto-setup output.

### Valid inputs

If the base mesh meets the [body model requirements](#body-model-requirements), auto-setup supports the following inputs:

<table><thead>
  <tr>
    <th><b>Reference Image</b></th>
    <th><b>Auto-setup support</b></th>
  </tr></thead>
<tbody>
  <tr>
    <td><img src="../../assets/avatar/avatar-setup/Partial-Inputs-None-Rigged.png"/></td>
    <td><Alert severity = 'success'>A full-body mesh object with **no rigging**.</Alert>This is the most common case where the input is the full-body mesh object doesn't include rigging data or other components. The input body must meet auto-setup's [model requirements](#body-model-requirements). <br /><br /> In this case, auto-setup creates the rest of the avatar components automatically.</td>
  </tr>
  <tr>
    <td><img src="../../assets/avatar/avatar-setup/Partial-Inputs-Body-Rigged.png"/></td>
    <td><Alert severity = "success">A full-body mesh with **only body rigging**.</Alert>If the full-body mesh includes a compatible R15 body rig, auto-setup uses the provided rig, and creates the facial rig and all other components. <br /><br /> The input body rig must follow Roblox's [rigging configuration](../characters/specifications.md#rigging), otherwise auto-setup creates a brand new rig for you.</td>
  </tr>
  <tr>
    <td><img src="../../assets/avatar/avatar-setup/Partial-Inputs-Head-Rigged.png"/><br /></td>
    <td><Alert severity = "error">A full-body mesh with **only facial rigging**.</Alert>At this time, auto-setup does not support cases where only a facial rig is present with the input model. <br /> <br /> If you intend to use your own custom facial rigging, you must also include an R15 rig and set the FaceRootJoint (and all child bones) as a child of the R15 head joint. For more information, see [optional rig requirements](#optional-rig-requirements). </td>
  </tr>
  <tr>
    <td><img src="../../assets/avatar/avatar-setup/Partial-Inputs-All-Rigged.png"/><br /></td>
    <td><Alert severity = "success">A full-body mesh with **both body and facial rigging**.</Alert>If the body rig, facial rig, and appropriate FACS data is included, auto-setup preserves that data and only generates the missing Roblox-specific components.<br /><br />For more information, see [optional rig requirements](#optional-rig-requirements).</td>
  </tr>
</tbody></table>

### Body model requirements

For best results, Avatar auto-setup expects the input body model to follow a specific set of requirements. These requirements may require using a third-party modeling tool to adjust your current character mesh, as they are different from the traditional [avatar character requirements](../characters/specifications.md). As the auto-setup tool improves, some of these requirements may lift.

<Alert severity = 'error'>
Many existing [downloadable resources](../../avatar/resources.md) for avatar bodies do not follow the auto-setup requirements below. Existing avatar references may need modification to ensure the asset follows the auto-setup models. See the specific [auto-setup references](../../avatar/resources.md#auto-setup-references) for assets that were created for auto-setup requirements.
</Alert>

The full requirements for the input body model are as follows:

1. **Single or multiple mesh** — Auto-setup accepts bodies comprised of 1 or more meshes. If your body includes multiple meshes, the tool automatically recombines all selected meshes as a single mesh, then decimates the combined parts to the appropriate R15 structure.
2. **5 distinct head components** — Whether you are using a single or multi-mesh character model, the following head components are required:

   1. **2 eyes** — Heads must include 2 connected eyebags containing half-sphere eyes that do not share any vertices with the head component.
   2. **3 mouthparts** — Heads must include a connected mouthbag that houses the **upper teeth**, **lower teeth**, and **tongue**.
      1. Each of these mouthparts must be singly connected and not share any vertices with each other or with the head mesh.

    <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-1.png" alt ="" />
    </figure>
    <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-2.png" alt ="" />
    </figure>
    </GridContainer>

3. **Head geometry must not share vertices** — Eyeballs, teeth, and tongue must be part of the model without sharing vertices with the body mesh.

   <GridContainer numColumns="2">
     <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-3.png" alt ="" />
     </figure>
     <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-4.png" alt ="" />
     </figure>
     </GridContainer>

4. **Within triangle budget** — The total body mesh resolution must be within 10,742 triangles. Use the following guidance to ensure each part doesn't exceed expected polycounts:

   <table>
    <thead>
      <tr>
        <th>Body part grouping</th>
        <th>Maximum triangles</th>
        <th>Maximum quads</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Head</td>
        <td>4000</td>
        <td>2000</td>
      </tr>
      <tr>
        <td>Arms</td>
        <td>1248 per arm</td>
        <td>624 per arm</td>
      </tr>
      <tr>
        <td>Legs</td>
        <td>1248 per leg</td>
        <td>624 per arm</td>
      </tr>
      <tr>
        <td>Torso</td>
        <td>1750</td>
        <td>875</td>
      </tr>
      <tr>
        <td>Total: </td>
        <td>10,742</td>
        <td>5495</td>
      </tr>
    </tbody>
    </table>

   1. The setup tool segments and adds [caps](../characters/specifications.md#body-parts) to the character limbs which may add to your total polycount. If your character model is close to the polycount limit, the additional geometry may cause validation failures.

5. **Humanoid shape** — The body must follow a general humanoid shape, with two arms, two legs, a torso, and a head.
6. **A-pose or T-Pose** — The body should form an upright A-pose or T-Pose.
   1. Bodies with I-pose may yield lower quality results.
   2. Ensure that no limbs obscure or overlap each other from the front view.
7. **Negative Z Axis** — The body front should face the negative Z axis.
8. **Symmetrical** — Asymmetrical bodies may work on a case-to-case basis. Position the center of the body with the Y-axis to improve the accuracy of the result.
   1. If your asymmetrical model experiences setup issues, try using a more symmetrical version.
9. **Watertight** — Ensure the model is watertight in all regions with the exception of the eyes and mouth. Watertight means that there are no holes in the mesh and no back faces are exposed.
10. **No accessories** — Do not include accessories, including face accessories, like hair, eyebrows, beards, and eyelashes.
11. **Distinct neck area** — Keep the neck distinct and not merged with the shoulders or upper torso.
12. **Includes texture** — Models should include one or more texture maps. If the input body includes multiple textures, the tool bakes the textures to a single map. This applies to [PBR textures](../modeling/surface-appearance.md) where the four textures are baked — one for each albedo, normal, metalness and roughness.
13. **Follows Marketplace and Community Policy** — The model must conform to Roblox's [Marketplace Policy](../../marketplace/marketplace-policy.md) and [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

#### Optional rig requirements

You can use your own custom body and face rig for your character model input. If auto-setup detects a [Roblox supported R15 rig](../characters/specifications.md#rigging), the original rigging data is preserved when generating avatar components.

If including custom facial animation data, adhere to the following:

1. Facial rig must include a `RootFaceJoint` bone (usually [mapped](../characters/facial-animation/create-basic-heads.md#map) as `DynamicHead`) whose parent is the `Head` joint of the R15 rig.
2. All the other facial animation joints are descendants of the `RootFaceJoint`, and not direct children of the `Head` joint.
3. Animations need to be provided for the [17 required poses](../characters/specifications.md#facial-animations), at minimum.
4. Neutral animation must map to frame `0`.
5. Since the head is part of the single mesh with the body, the facial animation mappings must be included with the single body mesh:
   1. The mapping between animation frames and facial poses are stored in the extra attributes / custom properties of the provided single mesh.
   2. The name of the root face joint is stored in the extra attributes / custom properties of the single mesh, mapping `RootFaceJoint` to the corresponding name (usually `DynamicHead`).

#### Examples of non-supported models

The following are common examples of models that may not yield expected results with auto-setup:

<BaseAccordion>
<AccordionSummary>
<Typography>Non-supported model examples</Typography>

</AccordionSummary>
<AccordionDetails>
<table>
<tbody>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Assymetry.png" alt=""/><figcaption>**Extreme asymmetry** &mdash; If you are having issues with an asymmetrical model, try using a more symmetrical version and make minor adjustments.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/I-pose.png" alt=""/><figcaption>**I-pose** &mdash; If you are experiencing issues with your model in an I-pose, try resubmitting with A-pose or T-pose.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Non-Contiguous.png" alt=""/><figcaption>**Non-contiguous mesh** &mdash; setup tool expects the body mesh to be completely contiguous.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/No-Neck.png" alt=""/><figcaption>**No neck** — setup tool expects a neck connecting a head to the torso.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Long-Neck.png" alt=""/><figcaption>**Out of proportion limbs** &mdash; setup tool expects a more realistic humanoid-style character model.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Non-Proportional-Limbs.png" alt=""/><figcaption>**Out of proportion limbs** &mdash; setup tool expects a more realistic humanoid-style character model.</figcaption></figure></center>
    </td>
  </tr>
</tbody>
</table>
</AccordionDetails>
</BaseAccordion>

### Import models

Studio supports `.gltf`, `.fbx`, and `.obj` models using the 3D Importer. If you are exporting your model from a third-party tool, see [Export Settings](../characters/export-settings.md) for export configurations.

For an asset that meets all of these model requirements, download one of the following auto-setup templates for your own reference and testing:

<Grid container alignItems='stretch' style={{margin: -6}}>

<Grid item XSmall={12} Medium={6} Large={4} style={{padding: 6}}>
<Card style={{height: '100%'}}>
<CardContent>

<center>Nature Girl - Auto-Setup</center>
<figure>
<center> <img src="../../assets/art/resources/Archer-Girl-Preview.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of an [Avatar auto-setup](../../art/modeling/avatar-setup.md#avatar-auto-setup) ready character model, including clothing and rigid accessory assets and PBR texture assets. <br /> <br />
This auto-setup template is not compatible with the traditional avatar creation workflow.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../../assets/art/reference-files/NatureArcherGirl-AutoSetup.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

<Grid item XSmall={12} Medium={6} Large={4} style={{padding: 6}}>
<Card style={{height: '100%'}}>
<CardContent>

<center>Stylish Male - Auto-Setup</center>
<figure>
<center> <img src="../../assets/art/resources/StylizedMale-Preview.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of an [Avatar auto-setup](../../art/modeling/avatar-setup.md#avatar-auto-setup) ready character model, including the base body and associated PBR textures. <br /> <br />
This auto-setup template is not compatible with the traditional avatar creation workflow.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../../assets/art/reference-files/StylizedMale-AutoSetup.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

</Grid> <br /> <br />

To import the model into Studio:

1. In Studio, navigate to the **Avatar tab** and select **3D Importer**.
2. In the file browser, select your model object.
3. When your model object loads in the 3D Import preview, disable the **Upload To Roblox** option.
   1. To save time in the future, click the **...** dropdown in the top-right of the 3D Importer window and **Save as New** to create an import profile for this workflow.
4. Verify the preview and any warnings or errors in your model object.
   1. See [3D Importer](../modeling/3d-importer.md) for additional information. Certain warnings and errors may require readjusting the model in a third-party software.
5. Select **Import** to add the `Class.Model` instance into your workspace.

   <Alert severity = 'warning'>
   When a new model is imported, it's also added to the moderation queue. If an avatar asset is moderated incorrectly, you will receive a moderation email with a link to appeal. This appeal takes up to 10 minutes to resolve.
   </Alert>

### Run auto-setup

When your project has the appropriate `Class.Model` in your workspace, you can begin the auto-setup process.

1. Select the model in the workspace.
   1. If you want to select only specific meshes of your model, navigate to the Explorer, expand the `Class.Model` object, and hold shift and click on the individual mesh objects.
2. With the Model selected, navigate to the **Avatar tab** and select **Avatar setup**.
3. In the Avatar setup panel, click the blue **Set Up Avatar** button. This process can take several minutes.
   <img src="../../assets/avatar/avatar-setup/Auto-Setup-Start.png" alt=""/>

4. Once complete, a `Class.Model` of your avatar populates in your workspace.

   1. Review any warnings or errors.

      1. If the body scale falls outside of the Marketplace ranges, the tool rescales the body to match requirements.
      2. Auto-setup highlights individual body parts that are not passing validation. You can use the scale tool in Studio to try to fix these validation errors. If the body part proportions fall outside of the supported range in Roblox, you may need to use third-party software to rescale the specific body parts.

      <img src="../../assets/avatar/avatar-setup/Auto-Setup-Scaling.png" alt=""/>

   2. Use the various [tools](#test-interface) to verify the components of your avatar before saving the `Class.Model` to your Toolbox or uploading to the Marketplace.

## Test interface

After auto-setup, or when using the tool with an avatar-ready character model, the character populates in the preview window. It's important to test that your avatar components have correctly generated by testing out different clothing, rigid accessories, and animations. If you discover any issues, you may need to update your base input model in your third-party modeling software and/or retry the auto-setup process.

<GridContainer numColumns='2'>
<figure><img src="../../assets/avatar/avatar-setup/Testing-Interface.png" alt="" width = "100%"/></figure>
<figure>Once an avatar is added to the tool, four tabs appear on the left side of the panel: <ul><li>[Check body](#check-body)</li> <li>[Check face](#check-face)</li> <li>[Test in experience](#test-in-experience)</li> <li>[Publish](#publish)</li></ul></figure>
</GridContainer>

### Check body

The **Check Body** interface contains tabs for Animations, Clothing, Accessories, and Body assets, such as skin-tone and swapping body parts. Clicking a subtab like Shirts, Waist, or Skin reveals a selection column along the left side of the window for testing various cosmetics and visuals.

<img src="../../assets/avatar/avatar-setup/Skin-Tone-Selector.png" alt="" width = "60%"/>

#### Equip items

Selected items are equipped on the avatar and are added to the currently equipped column on the right side. Selected animations begin playing as a preview of how they'll look in a running experience.

To unequip an item, click it again in the selection column, press the **X** button at the top right of the equipped item, or right-click the asset in the Equipped column and select **Unequip**. You can also drag and order the various equipped accessories to set the worn order.

#### Add items

The add item button allows you to add custom assets to the tool's palette for testing.

To add an item to the palette:

1. Select a valid **Accessory** or **Body Part** asset from the Explorer or 3D workspace.
2. Click the add item button at the bottom of the selection column along the left side of the window.

   <img src="../../assets/avatar/avatar-setup/Add-Object.png" alt=""width = "20%"/>

3. The item appears in the appropriate section and subsection of the Check Body interface, such as **Accessories** → **Hair**.

### Check face

The **Check Face** interface zooms into the face and allows you test various facial poses.

<GridContainer numColumns="2">
<figure>
    <img src="../../assets/avatar/avatar-setup/Test-Face-1.png" />
    <figcaption>Check the range of facial poses with multiple facial animation tests.</figcaption>
</figure>
<figure>
    <img src="../../assets/avatar/avatar-setup/Test-Face-2.png" />
    <figcaption>Unexpected facial animation behavior, such as crashing or artifacts, may minor adjustment to the base mesh and re-running the auto-setup process.</figcaption>
</figure>
</GridContainer>

### Test in experience

The **Test in Experience** button starts playtesting the experience with the previewed avatar. Any changes made in the Avatar setup preview tools, such as equipped clothing or accessories, or modifications, such as skin tone or body part swaps, do not transfer over to the playable character model in this mode.

### Publish

The **Publish** button opens the publish asset dialog, with an option to upload the avatar and any accessory items to the Marketplace

When selecting the Publish option, you can upload the asset to the Marketplace, where you can sell the item paying an upload fee, clearing moderation, and publishing the asset to the catalog.

The upload option opens the following prompt which goes through additional validation checks before uploading to the moderation queue.

For additional resources on the publishing process and Marketplace, see the following:

- [Publish to the Marketplace](../../marketplace/publish-to-marketplace.md)
- [Marketplace fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)
- [Marketplace policy](../../marketplace/marketplace-policy.md)
