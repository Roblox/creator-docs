---
title: Avatar Setup
description: The Avatar Setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

import BetaAlert from '../../includes/beta-features/beta-alert.md'

<BetaAlert betaName="Avatar Auto-Setup Beta" leadIn="The auto-setup feature of this tool is currently in beta through " leadOut="." components={props.components} />

The **Avatar Setup** tool, accessible from the [Avatar](../../studio/avatar-tab.md) tab, allows you to auto-setup avatar meshes, preview animations, clothing, skin tones, and test avatar character bodies directly in Studio. In the future, Marketplace creators can also begin the uploading and validation process from this tool to quickly publish their assets.

<img src="../../assets/studio/general/Avatar-Tab-Avatar-Setup.png" width="760" alt="Avatar Preview button indicated in Avatar tab" />

## Avatar Auto-Setup

The **Auto-Setup** feature converts a single-mesh body model into a finished avatar model with all the advanced components that allow characters to interact with the world and express themselves.

Creating these [avatar components](../characters/index.md#components-of-an-avatar), including tasks like rigging, skinning, facial animation, and more, often require hours or days to configure in a third-party modeling tool such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview). Using the Avatar Auto-Setup tool, you can input a simple single-mesh character body and create a Marketplace-ready avatar model within minutes.

<GridContainer numColumns="2">
<figure>
    <img src="../../assets/avatar/avatar-setup/Avatar-Setup-Example-A.png" />
    <figcaption>The Avatar Auto-Setup Tool converting a single mesh body to a Marketplace-ready avatar.</figcaption>
</figure>
<figure>
    <img src="../../assets/avatar/avatar-setup/Avatar-Setup-Example-B.png" />
    <figcaption>Using the various Avatar Setup features, test out skin tones, animations, rigid and layered clothing, and more.</figcaption>
</figure>
</GridContainer>

The avatar auto-setup performs the following on a submitted character model:

- **Rigging** - adds an R15 armature to your body model to enable movement and animation.
- **Skinning** - adds weights and influences to various surfaces of your mesh, ensuring an organic and natural flexibility during movement.
- **Facial animation** - generates the FACS poses, facial rigging, skinning, and animation data required for facial animation and avatar chat.
- **Caging** - adds the outer cage mesh to your avatar, enabling it to wear layered clothing.
- **Partitioning** - separates the single body mesh into the appropriate R15 parts.
- **Creating attachments** - adds the appropriate attachment points enabling the character to wear rigid accessories.

## How Auto-Setup Works

The Auto-Setup tool utilizes machine learning (ML) models that handles the rigging, skinning, and caging application. After creating the rigging, skinning, and caging data, the tool applies body partitioning and attachment point generation using a geometry-based solution. If existing components, such as bones, cages, attachments, or animation, are already included in the imported `Class.Model`, the Auto-Setup tool removes them and generates new components.

The ML models train on a dataset consisting of hundreds of different body shapes and styles. The tool performs best with human-like body models that are similar to those used for training and becomes more inconsistent for body models that diverge from the training set.

See the following examples for the types of bodies and styles that work best with Auto-Setup:

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

Roblox intends to continue releasing updated versions of the auto setup ML models over time. When uploading an avatar body asset, Studio gives you the option to add your input model as part of a dataset for additional training and improvements as well as provide feedback on the quality of the auto-setup output.

### Model Requirements

For best results, Avatar Auto-Setup expects the input body model to follow a specific set of requirements. These requirements may require using a third-party modeling tool to adjust your current character mesh, as they are different from the traditional [avatar character requirements](../characters/specifications.md). As the Auto-Setup tool improves, some of these requirements may lift.

<Alert severity = 'error'>
Many existing [downloadable resources](../../avatar/resources.md) for avatar bodies do not follow the auto-setup requirements below. Existing avatar references may need modification to ensure the asset follows the auto-setup models. See the specific [Auto-Setup References](../../avatar/resources.md#auto-setup-references) for assets that were created for Auto-Setup requirements.
</Alert>

The full requirements for the input body model are as follows:

1. **Single mesh** - The body must be a single mesh with 6 merged components:

   1. **1 main head and body** - Singly connected, watertight, manifold mesh.
   2. **5 distinct head components** - While the entire input model must be a single mesh, the following head components are required:

      1. **2 eyes** - Heads must include 2 connected eyebags containing half-sphere eyes that do not share any vertices with the head component.
      2. **3 mouthparts** - Heads must include a connected mouthbag that houses the **upper teeth**, **lower teeth**, and **tongue**.
         1. Each of these mouthparts must be singly connected and not share any vertices with each other or with the head mesh.

    <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-1.png" alt ="" />
    </figure>
    <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-2.png" alt ="" />
    </figure>
    </GridContainer>

2. **Head geometry must not share vertices** - Eyeballs, teeth, and tongue must be part of the model without sharing vertices with the body mesh.

   <GridContainer numColumns="2">
     <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-3.png" alt ="" />
     </figure>
     <figure>
      <img src="../../assets/avatar/avatar-setup/Mouthparts-4.png" alt ="" />
     </figure>
     </GridContainer>

3. **\_Geo affix** - The asset name must end with a "\_Geo".
4. **Within triangle budget** - The total body mesh resolution must be within 10,742 triangles. Use the following guidance to ensure each part doesn't exceed expected polycounts:

   <table>
    <thead>
      <tr>
        <th>Body Part Grouping</th>
        <th>Maximum Triangles</th>
        <th>Maximum Quads</th>
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
   - The setup tool segments and adds [caps](../characters/specifications.md#body-parts) to the character limbs which may add to your total polycount. If your character model is close to the polycount limit, the additional geometry may cause validation failures.

5. **Humanoid shape** - The body must follow a general humanoid shape, with two arms, two legs, a torso, and a head.
6. **A-pose** - The body should form an upright A-pose.
   1. Bodies with I-pose or T-pose may produce lower quality results.
   2. Ensure that no limbs obscure or overlap each other from the front view.
7. **Negative Z Axis** - The body front should face the negative Z axis.
8. **Symmetrical** - The body should be left and right symmetrical.
   1. Asymmetrical bodies may still work on a case-to-case basis. Position the center of the body with the Y-axis to improve the accuracy of the result.
9. **Watertight** - Ensure the model is watertight in all regions with the exception of the eyes and mouth. Watertight means that there are no holes in the mesh and no back faces are exposed.
10. **No accessories** - Do not include accessories, including face accessories, like hair, eyebrows, beards, and eyelashes.
11. **Distinct neck area** - Keep the neck distinct and not merged with the shoulders or upper torso.
12. **Includes texture** - The input model should include a base textureID or SurfaceAppearance object ([PBR textures](../modeling/surface-appearance.md)).
13. **Follows Marketplace and Community Policy** - The model must conform to Roblox's [Marketplace Policy](../../marketplace/marketplace-policy.md) and [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

#### Examples of Non-Supported Models

The following are common examples of models that may not yield expected results with auto-setup:

<BaseAccordion>
<AccordionSummary>
<Typography>Non-Supported Model Examples</Typography>

</AccordionSummary>
<AccordionDetails>
<table>
<tbody>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Assymetry.png" alt=""/><figcaption>**Asymmetry** &mdash; Setup tool expects symmetry with limbs.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/I-pose.png" alt=""/><figcaption>**I-pose** &mdash; Setup tool expects A-Pose.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Non-Contiguous.png" alt=""/><figcaption>**Non-contiguous mesh** &mdash; Setup tool expects the body mesh to be completely contiguous.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src=".**./../assets/avatar/avatar-setup/No-Neck.png" alt=""/><figcaption>**No neck** - Setup tool expects a neck connecting a head to the torso.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Long-Neck.png" alt=""/><figcaption>**Out of proportion limbs** &mdash; Setup tool expects a more realistic humanoid-style character model.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../../assets/avatar/avatar-setup/Non-Proportional-Limbs.png" alt=""/><figcaption>**Out of proportion limbs** &mdash; Setup tool expects a more realistic humanoid-style character model.</figcaption></figure></center>
    </td>
  </tr>
</tbody>
</table>
</AccordionDetails>
</BaseAccordion>

### Importing Models

Studio supports `.gltf`, `.fbx`, and `.obj` models using the 3D Importer. If you are exporting your model from a third-party tool, see [Export Settings](../characters/export-settings.md) for export configurations. For an asset that meets all of these model requirements, [download an example model](../../avatar/resources.md#auto-setup-references) to use as a reference and testing.

<Alert severity ='warning'>
To prevent uploading an incomplete asset to the Roblox servers, disable the **Upload to Roblox** option in the 3D Importer to only add the character mesh locally before using the Auto-Setup feature.

To save time in the future, you can save this import profile using the **...** dropdown in the top-right of the 3D Importer window.
</Alert>

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

### Running Auto-Setup

When your project has the appropriate `Class.Model` in your workspace, you can begin the auto setup process.

1. With the Model selected, navigate to the **Avatar tab** and select **Avatar Setup**.
2. In the Avatar Setup panel, click the blue **Set Up Avatar** button. This process can take several minutes.
   <img src="../../assets/avatar/avatar-setup/Auto-Setup-Start.png" alt=""/>

3. Once complete, a `Class.Model` of your avatar populates in your workspace.
   1. Review any warnings or errors. You may need to readjust your mesh in a third-party modeling software to resolve some issues.
      1. Common errors you may need to resolve with external software:
         1. Increase/decrease size of avatar mesh. This might require adjusting export scale settings in your third-party modeling software to ensure a 1 cm to 1 stud parity.
         2. Reduce poly count if you're exceeding the maximum.
   2. Use the various [auto setup tools](#testing-interface) to verify the components of your avatar before saving the `Class.Model` to your Toolbox or uploading to the Marketplace.

## Testing Interface

After the auto-setup is complete, the avatar populates in the preview window. It's important to test that your avatar components have correctly generated by testing out different clothing, rigid accessories, and animations. If you discover any issues, you may need to update your base input model in your third-party modeling software and retry the auto-setup process.

<GridContainer numColumns='2'>
<figure><img src="../../assets/avatar/avatar-setup/Testing-Interface.png" alt="" width = "100%"/></figure>
<figure>Once an avatar is added to the tool, four tabs appear on the left side of the panel: <ul><li>[Check Body](#check-body)</li> <li>[Check Face](#check-face)</li> <li>[Test in Experience](#test-in-experience)</li> <li>[Publish](#publish)</li></ul></figure>
</GridContainer>

### Check Body

The **Check Body** interface contains tabs for Animations, Clothing, Accessories, and Body assets, such as skin-tone and swapping body parts. Clicking a subtab like Shirts, Waist, or Skin reveals a selection column along the left side of the window for testing various cosmetics and visuals.

<img src="../../assets/avatar/avatar-setup/Skin-Tone-Selector.png" alt="" width = "60%"/>

#### Equipping Items

Selected items are equipped on the avatar and are added to the currently equipped column on the right side. Selected animations begin playing as a preview of how they'll look in a running experience.

To unequip an item, click it again in the selection column, press the **X** button at the top right of the equipped item, or right-click the asset in the Equipped column and select **Unequip**. You can also drag and order the various equipped accessories to set the worn order.

#### Adding Items

The add item button allows you to add custom assets to the tool's palette for testing.

To add an item to the palette:

1. Select a valid **Accessory** or **Body Part** asset from the Explorer or 3D workspace.
2. Click the add item button at the bottom of the selection column along the left side of the window.

   <img src="../../assets/avatar/avatar-setup/Add-Object.png" alt=""width = "20%"/>

3. The item appears in the appropriate section and subsection of the Check Body interface, such as **Accessories** → **Hair**.

### Check Face

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

### Test in Experience

The **Test in Experience** button starts playtesting the experience with the previewed avatar. Any changes made in the Avatar Setup preview tools, such as equipped clothing or accessories, or modifications, such as skin tone or body part swaps, do not transfer over to the playable character model in this mode.

### Publish

<Alert severity = 'warning'>
The Publish feature is disabled during the Auto-Setup beta. Assets created with the Avatar Setup tool can be used in experience and for testing purposes.
</Alert>

The **Publish** button opens the publish asset dialog, with an option to upload the avatar and any accessory items to the Marketplace

When selecting the Publish option, you can upload the asset to the Marketplace, where you can sell the item paying an upload fee, clearing moderation, and publishing the asset to the catalog.

The upload option opens the following prompt which goes through additional validation checks before uploading to the moderation queue.

For additional resources on the publishing process and Marketplace, see the following:

- [Publishing to the Marketplace](../../marketplace/publishing-to-marketplace.md)
- [Marketplace Fees and Commissions](../../marketplace/marketplace-fees-and-commissions.md)
- [Marketplace Policy](../../marketplace/marketplace-policy.md)
