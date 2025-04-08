---
title: Auto-setup model requirements
description: The Avatar setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

Avatar auto-setup uses machine learning models and geometry-based solutions that handles the detection and implementation of rigging, skinning, caging, body partitioning and attachment point generation.

Due to the automated nature of this process, some inputs work better than others and your results may vary over time as additional training and improvements are made to the tool.

To prevent errors and achieve the best auto-setup results, make sure your asset is a [valid input](#valid-inputs) and the base mesh follows the [body model requirements](#body-model-requirements).

## Valid inputs

The Avatar Setup tool automatically detects the input of the selected mesh and performs different actions depending on the detected input.

- If the selected model contains all the required components for a Roblox avatar, the Avatar Setup tool immediately opens the selected model in the [test interface](./index.md#test-and-edit).
- If the selected model does not contain all the required components for a Roblox avatar, the Avatar Setup tool begins the auto-setup functionality depending on the input detected.

Auto-setup detects the following partial avatar body inputs:

<table><thead>
  <tr>
    <th><b>Reference Image</b></th>
    <th><b>Auto-setup support</b></th>
  </tr></thead>
<tbody>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-None-Rigged.png"/></td>
    <td><Alert severity = 'success'>A single or multiple mesh body with **no rigging**.</Alert>The most common input is a single mesh object that doesn't include rigging data or other components. The input body must meet auto-setup's [model requirements](#body-model-requirements). <br /><br /> In this case, auto-setup creates the rest of the avatar components automatically.</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-Body-Rigged.png"/></td>
    <td><Alert severity = "success">A single or multiple mesh body with **only body rigging**.</Alert>If the provided meshes include a compatible R15 body rig, auto-setup uses the provided rig, and creates the facial rig and all other components. <br /><br /> The input body rig must follow Roblox's [rigging configuration](../art/characters/specifications.md#rigging), otherwise auto-setup creates a brand new rig for you.</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-Head-Rigged.png"/><br /></td>
    <td><Alert severity = "error">A single or multiple mesh with **only facial rigging**.</Alert>At this time, auto-setup does not support cases where only a facial rig is present with the input model. <br /> <br /> If you intend to use your own custom facial rigging, you must also include an R15 rig and set the FaceRootJoint (and all child bones) as a child of the R15 head joint. For more information, see [optional rig requirements](#optional-rig-requirements). </td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-All-Rigged.png"/><br /></td>
    <td><Alert severity = "success">A single mesh body with **both body and facial rigging**.</Alert>If the body rig, facial rig, and appropriate FACS data is included, auto-setup preserves that data and only generates the missing Roblox-specific components. **Bodies comprised of multiple meshes are not supported for this input.**<br /><br />For more information, see [optional rig requirements](#optional-rig-requirements).</td>
  </tr>
</tbody></table>

## Body model requirements

For best results, auto-setup expects the input body model to follow a specific set of requirements. If you are using a pre-made custom asset, these requirements may require using a third-party modeling tool to adjust your character model. These requirements are different from the traditional [avatar character requirements](../art/characters/specifications.md). As the auto-setup tool improves, some of these requirements may lift.

<Alert severity = 'error'>
Many existing [downloadable resources](../avatar/resources.md) for avatar bodies do not follow the auto-setup requirements below. Existing avatar references may need modification to ensure the asset follows the auto-setup models. See the specific [auto-setup references](../avatar/resources.md#auto-setup-references) for assets that were created for auto-setup requirements.
</Alert>

The full requirements for the input body model are as follows:

1. **Single or multiple mesh** — In most cases, auto-setup accepts bodies comprising of 1 or more meshes. If your body includes multiple meshes, the tool automatically recombines all selected meshes as a single mesh, then decimates the combined parts to the appropriate R15 structure.
2. **5 distinct head components** — Whether you are using a single or multi-mesh character model, the following head components are required:

   1. **2 eyes** — Heads must include 2 connected eyebags containing half-sphere eyes that do not share any vertices with the head component.
   2. **3 mouthparts** — Heads must include a connected mouthbag that houses the **upper teeth**, **lower teeth**, and **tongue**.
      1. Each of these mouthparts must be singly connected and not share any vertices with each other or with the head mesh.

    <GridContainer numColumns="2">
    <figure>
      <img src="../assets/avatar/avatar-setup/Mouthparts-1.png" alt ="" />
    </figure>
    <figure>
      <img src="../assets/avatar/avatar-setup/Mouthparts-2.png" alt ="" />
    </figure>
    </GridContainer>

3. **Head geometry must not share vertices** — Eyeballs, teeth, and tongue must be part of the model without sharing vertices with the body mesh.

   <GridContainer numColumns="2">
     <figure>
      <img src="../assets/avatar/avatar-setup/Mouthparts-3.png" alt ="" />
     </figure>
     <figure>
      <img src="../assets/avatar/avatar-setup/Mouthparts-4.png" alt ="" />
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

   1. The setup tool segments and adds [caps](../art/characters/specifications.md#body-parts) to the character limbs which may add to your total polycount. If your character model is close to the polycount limit, the additional geometry may cause validation failures.

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
12. **Includes texture** — Models should include one or more texture maps. If the input body includes multiple textures, the tool bakes the textures to a single map. This applies to [PBR textures](../art/modeling/surface-appearance.md) where the four textures are baked — one for each albedo, normal, metalness and roughness.
13. **Follows Marketplace and Community Policy** — The model must conform to Roblox's [Marketplace Policy](../marketplace/marketplace-policy.md) and [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

### Optional rig requirements

You can use your own custom body and face rig for your character model input. If auto-setup detects a [Roblox supported R15 rig](../art/characters/specifications.md#rigging), the original rigging data is preserved when generating avatar components.

If your body mesh includes custom facial animation data, adhere to the following:

1. A supported R15 body rig is required when submitting custom facial rigs and facial animation data.
   1. This [specific input type](#valid-inputs) requires a single mesh body and does not support a multiple mesh body.
2. Facial rig must include a `RootFaceJoint` bone (usually [mapped](../art/characters/facial-animation/create-basic-heads.md#map) as `DynamicHead`) whose parent is the `Head` joint of the R15 rig.
3. All the other facial animation joints are descendants of the `RootFaceJoint`, and not direct children of the `Head` joint.
4. Animations need to be provided for the [17 required poses](../art/characters/specifications.md#facial-animations), at minimum.
5. Neutral animation must map to frame `0`.
6. Since the head is part of the single mesh with the body, the facial animation mappings must be included with the single body mesh:
   1. The mapping between animation frames and facial poses are stored in the extra attributes / custom properties of the provided single mesh.
   2. The name of the root face joint is stored in the extra attributes / custom properties of the single mesh, mapping `RootFaceJoint` to the corresponding name (usually `DynamicHead`).

### Examples of non-supported models

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
        <center><figure><img src="../assets/avatar/avatar-setup/Assymetry.png" alt=""/><figcaption>**Extreme asymmetry** &mdash; If you are having issues with an asymmetrical model, try using a more symmetrical version and make minor adjustments.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../assets/avatar/avatar-setup/I-pose.png" alt=""/><figcaption>**I-pose** &mdash; If you are experiencing issues with your model in an I-pose, try resubmitting with A-pose or T-pose.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../assets/avatar/avatar-setup/Non-Contiguous.png" alt=""/><figcaption>**Non-contiguous mesh** &mdash; setup tool expects the body mesh to be completely contiguous.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../assets/avatar/avatar-setup/No-Neck.png" alt=""/><figcaption>**No neck** — setup tool expects a neck connecting a head to the torso.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../assets/avatar/avatar-setup/Long-Neck.png" alt=""/><figcaption>**Out of proportion limbs** &mdash; setup tool expects a more realistic humanoid-style character model.</figcaption></figure></center>
    </td>
  </tr>
  <tr>
    <td>
        <center><figure><img src="../assets/avatar/avatar-setup/Non-Proportional-Limbs.png" alt=""/><figcaption>**Out of proportion limbs** &mdash; setup tool expects a more realistic humanoid-style character model.</figcaption></figure></center>
    </td>
  </tr>
</tbody>
</table>
</AccordionDetails>
</BaseAccordion>

## Reference Models

Studio supports `.gltf`, `.fbx`, and `.obj` models using the 3D Importer. If you are exporting your model from a third-party tool, see [Export Settings](../art/characters/export-settings.md) for export configurations.

For an asset that meets all of these model requirements, download one of the following auto-setup templates for your own reference and testing:

<Grid container alignItems='stretch' style={{margin: -6}}>

<Grid item XSmall={12} Medium={6} Large={4} style={{padding: 6}}>
<Card style={{height: '100%'}}>
<CardContent>

<center>Nature Girl - Auto-Setup</center>
<figure>
<center> <img src="../assets/art/resources/Archer-Girl-Preview.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of an [Avatar auto-setup](./auto-setup-requirements.md) ready character model, including clothing and rigid accessory assets and PBR texture assets. <br /> <br />
This auto-setup template is not compatible with the traditional avatar creation workflow.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/art/reference-files/NatureArcherGirl-AutoSetup.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

<Grid item XSmall={12} Medium={6} Large={4} style={{padding: 6}}>
<Card style={{height: '100%'}}>
<CardContent>

<center>Stylish Male - Auto-Setup</center>
<figure>
<center> <img src="../assets/art/resources/StylizedMale-Preview.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of an [Avatar auto-setup](./index.md) ready character model, including the base body and associated PBR textures. <br /> <br />
This auto-setup template is not compatible with the traditional avatar creation workflow.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/art/reference-files/StylizedMale-AutoSetup.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

</Grid> <br /> <br />
