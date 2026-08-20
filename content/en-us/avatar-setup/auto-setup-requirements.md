---
title: Avatar Setup specifications
description: The Avatar Setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
keywords:
  - Layered clothing
  - Layerable accessories
  - Layered clothing accessories
  - Rigid accessories
---

[Avatar Setup](./index.md) supports the automatic conversion of basic custom models to Roblox-ready bodies, rigid accessories, and layered accessories. By [bundling](#bundle-multiple-assets) your models together, you can automatically setup multiple custom models into avatar items for use in-game or for upload to the Marketplace.

## Character bodies

Avatar Setup can attempt to process a 3D model into a Roblox-ready character body model. This is one of the most common use cases for Avatar Setup and can help you save time by automating the rigging, caging, and other configurations required to make a Roblox-ready avatar character that you can upload to the Marketplace.

Avatar assets like [rigid accessories](#rigid-accessories) and [layered accessories](#layered-accessories) may require processing with a base body. Avatar Setup is able to use this base body as a mannequin, creating more accurate attachment points and other components to ensure a better fit. If converting rigid or layered accessories, you must [bundle](#bundle-multiple-assets) them with a base body for fitting.

### Supported inputs

Avatar Setup detects the following partial avatar body inputs:

<table><thead>
  <tr>
    <th><b>Reference Image</b></th>
    <th><b>Avatar Setup support</b></th>
  </tr></thead>
<tbody>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-None-Rigged.png"/></td>
    <td><Alert severity = 'success'>A single or multiple mesh body with **no rigging**.</Alert>The most common input is a single mesh object that doesn't include rigging data or other components. The input character body must meet Avatar Setup's [model requirements](#character-bodies).<br /><br /> In this case, Avatar Setup creates the rest of the avatar components automatically.</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-Body-Rigged.png"/></td>
    <td><Alert severity = "success">A single or multiple mesh body with **only body rigging**.</Alert>If the provided meshes include a compatible [standard](../avatar/character-bodies/specifications.md#standard-rigs) rigging armature, Avatar Setup uses the provided rig and creates a facial rig and all other components.<br /><br /> The input character body rig must follow Roblox's [rigging configuration requirements](../avatar/character-bodies/specifications.md#rigging), otherwise Avatar Setup creates a brand new rig for you.</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-Head-Rigged.png"/><br /></td>
    <td><Alert severity = "success">A multiple mesh with **only facial rigging**.</Alert>If you intend to use your own custom facial rigging, set the FaceRootJoint (and all child bones) as a child of the [standard](../avatar/character-bodies/specifications.md#standard-rigs) rigging armature's head joint. For more information, see the optional [rig requirements](#rig-requirements).</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-All-Rigged.png"/><br /></td>
    <td><Alert severity = "success">A **single mesh** body with **both body and facial rigging**.</Alert>If the character body's rigging armature, facial rig, and appropriate FACS data are included, Avatar Setup preserves that data and only generates the missing Roblox-specific components. **Character bodies comprised of multiple meshes are not supported for this input.**<br /><br />For more information, see the optional [rig requirements](#rig-requirements).</td>
  </tr>
</tbody></table>

### Mesh requirements

To achieve the best results when converting a model to a Roblox-ready avatar character body, it's important to configure your base model so the tool can properly generate avatar components.

<Alert severity = 'error'>
Many existing [downloadable resources](../avatar/resources.md) for avatar character bodies do not follow the Avatar Setup requirements below. Existing avatar references may need modification to ensure the asset follows the Avatar Setup models.<br /> <br />See the specific [character reference models](./index.md#run-avatar-setup) for assets that were created for Avatar Setup requirements.
</Alert>

The full requirements for the input character body model are as follows:

1. **Single or multiple mesh** — In most cases, Avatar Setup accepts character bodies comprised of 1 or more meshes. If your character body includes multiple meshes, the tool automatically recombines all selected meshes as a single mesh, then decimates the combined parts to the appropriate [body part](../avatar/character-bodies/specifications.md#body-parts) structure.

   <Alert severity = 'info'>
   When you provide the standard 15 body part meshes that adhere to the required body part naming conventions, Avatar Setup attempts to place joints according to the user-partitioned body parts.
   </Alert>

2. **5 distinct head components** — Whether you are using a single or multi-mesh character body model, the following head components are required:

   - **2 eyes** — Heads must include 2 connected eyebags containing half-sphere eyes that do not share any vertices with the head component.
   - **3 mouthparts** — Heads must include a connected mouthbag that houses the **upper teeth**, **lower teeth**, and **tongue**. Each of these mouthparts must be singly connected and not share any vertices with each other or with the head mesh.

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

4. **Within triangle budget** — The total character body mesh resolution must be within 10,742 triangles. Use the following guidance to ensure each part doesn't exceed expected polycounts:

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

   <Alert severity = 'warning'>
   Avatar Setup segments and adds [caps](../avatar/character-bodies/specifications.md#body-parts) to the character's limbs, which may add to your total polycount. If your character body model is close to the polycount limit, the additional geometry may cause validation failures.
   </Alert>

5. **Humanoid shape** — The character body must follow a general humanoid shape, with two arms, two legs, a torso, and a head.
6. **A-pose or T-Pose** — The character body should form an upright A-pose or T-Pose.
   - Character bodies with I-pose may yield lower quality results.
   - Ensure that no limbs obscure or overlap each other from the front view.
7. **Negative Z Axis** — The character body's front should face the negative Z axis.
8. **Symmetrical** — Asymmetrical character bodies may work on a case-to-case basis. Position the center of the body with the Y-axis to improve the accuracy of the result. If your asymmetrical model experiences setup issues, try using a more symmetrical version.
9. **Watertight** — Ensure the model is watertight in all regions with the exception of the eyes and mouth. Watertight means that there are no holes in the mesh and no back faces are exposed.
10. **No accessories** — Do not include any accessories, including face accessories, such as hair, eyebrows, beards, and eyelashes.
11. **Distinct neck area** — Keep the neck distinct and not merged with the shoulders or upper torso.
12. **Includes texture** — Models should include one or more texture maps. If the input character body includes multiple textures, the tool bakes the textures to a single map. This applies to [PBR textures](../art/modeling/surface-appearance.md) where the four textures are baked — one for each albedo, normal, metalness and roughness.
13. **Follows Community Standards and Marketplace policies** — The model must conform to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Marketplace policies](../marketplace/marketplace-policy.md).

### Rig requirements

<Alert severity = 'info'>
You do **not** need to include a custom rigging armature with your character body to use Avatar Setup. If you provide the standard 15 [body part](../avatar/character-bodies/specifications.md#body-parts) meshes that adhere to the required body part naming conventions **without a rig**, Avatar Setup attempts to generate joints according to the user-partitioned body parts.
</Alert>

To ensure that Avatar Setup uses your **own custom body rig** instead of generating you a new one:

- Ensure that your bones (Blender) or joints (Maya) meet [Roblox's rigging armature requirements](../avatar/character-bodies/specifications.md#rigging), and double-check naming conventions and hierarchy.
- Body rigs should not include additional bones beyond the [standard](../avatar/character-bodies/specifications.md#standard-rigs) rigging armature, and facial rigs (no bone limit) should be correctly parented to a `RootFaceJoint`.

To ensure that Avatar Setup uses your **own custom face rig with FACS data**:

- A [standard](../avatar/character-bodies/specifications.md#standard-rigs) rigging armature is required when submitting custom facial rigs and facial animation data. Review [supported character body inputs](#character-bodies) to ensure you are submitting a supported body input and facial rig combination.
- Facial rig must include a `RootFaceJoint` bone (usually [mapped](../art/characters/facial-animation/create-basic-heads.md#map) as `DynamicHead`) whose parent is the `Head` joint of the standard rigging armature.
- All the other facial animation joints are descendants of the `RootFaceJoint`, and not direct children of the `Head` joint.
- Animations need to be provided for the [17 required poses](../avatar/character-bodies/specifications.md#facial-animations), at minimum.
- Neutral animation must map to frame `0`.
- Since the head is part of the single mesh with the body, the facial animation mappings must be included with the single character body mesh:

  - The mapping between animation frames and facial poses are stored in the extra attributes / custom properties of the provided single mesh.
  - The name of the root face joint is stored in the extra attributes / custom properties of the single mesh, mapping `RootFaceJoint` to the corresponding name (usually `DynamicHead`).

### Examples of non-supported bodies

The following are common examples of bodies that may not yield expected results with Avatar Setup:

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

## Rigid accessories

<Alert severity = 'warning'>
You must [bundle](#bundle-multiple-assets) your rigid and layered accessory models with a base body to utilize Avatar Setup. For more information, see [supported inputs](#supported-inputs-1).
</Alert>

Avatar Setup can convert models into rigid accessories and configure their scale type and attachment point requirements.

To convert a mesh model into a rigid accessory:

1. Fit the model onto a base body in Studio or your 3D modeling software.
2. [Bundle](#bundle-multiple-assets) the assets together in a single `Class.Folder`.
3. Use **Avatar Setup** on your folder of assets.

During this process, you can designate individual meshes or models as rigid accessories, layered accessories, or body parts. After conversion, a prompt displays allowing you to select the specific **Asset Type**.

For best results, ensure your models adhere to Roblox's [rigid accessory geometry specifications](../avatar/rigid-accessories/specifications.md#geometry-and-budgets).

### Supported inputs

Rigid accessory meshes must be bundled with a character body for Avatar Setup to configure correctly. See the following supported inputs for rigid accessory meshes:

<table><thead>
  <tr>
    <th>Input object</th>
    <th>Avatar Setup generates</th>
  </tr></thead>
<tbody>
  <tr>
    <td>
    <ul>
      <li>`Folder` [bundle](#bundle-multiple-assets) containing:</li>
      <ul>
        <li>`Class.Model` containing fully or partially configured character body </li>
        <li>`Class.Model` containing accessory mesh object (this is the object created when importing a custom 3D object)</li>
      </ul>
    </ul>
    </td>
    <td>`Class.Accessory` containing layered accessory mesh, `BodyPartScaleType`, and attachment points</td>
  </tr>
</tbody>
</table>

## Layered accessories

Avatar Setup can convert models into layered accessories and add in rigging and caging data that normally requires manual configuration in a separate software.

To convert a mesh model into an accessory using Avatar Setup:

1. Fit the model onto a base character body in Studio or your 3D modeling software.
2. (Optional) For best results, [bundle](#bundle-multiple-assets) the assets together in a single `Class.Folder`.
3. Use **Avatar Setup** on your folder of assets.

During this process, you will be able to designate individual meshes or models as rigid accessories, layered accessories, or body parts. After conversion, a prompt displays allowing you to select the specific **Asset Type**.

For best results, ensure your models adhere to Roblox's [layered clothing geometry specifications](../avatar/layered-accessories/specifications.md#geometry-and-budgets).

### Supported inputs

Avatar Setup can configure layered accessory models to a layered clothing `Class.Accessory` complete with caging and rigging data. While Avatar Setup can configure models without a bundled body, you may find better results if you include a base character body for setup.

<table><thead>
  <tr>
    <th>Input object</th>
    <th>Avatar Setup generates</th>
  </tr></thead>
<tbody>
  <tr>
    <td>`Class.Model` containing layered accessory mesh object with no additional components (this is the object created when importing a custom 3D object)   </td>
    <td>
        <ul>
          <li>`Class.Accessory` containing layered accessory mesh and the following generated components:</li>
          <ul>
            <li>Inner and outer cage data</li>
            <li>Attachment points</li>
          </ul>
        </ul>
    <Alert severity = 'warning'>Without an accompanying character body asset, Avatar Setup makes a best effort for generating cage data.</Alert>
    </td>
  </tr>
  <tr>
    <td>
    <ul>
      <li>`Folder` [bundle](#bundle-multiple-assets) containing:</li>
      <ul>
        <li>`Class.Model` containing fully or partially configured character body </li>
        <li>`Class.Model` containing accessory mesh object (this is the object created when importing a custom 3D object)</li>
      </ul>
    </ul>
    </td>
    <td>
        <ul>
          <li>`Class.Accessory` containing clothing mesh and the following generated components:</li>
          <ul>
            <li>Inner and outer cage data</li>
            <li>Attachment points</li>
          </ul>
        </ul>
    </td>
  </tr>

</tbody>
</table>

## Bundle multiple assets

Avatar Setup can process multiple rigid or layered accessory models with a single character body model. To submit multiple models in the **Avatar Setup** tool, parent your models within a single folder.

<figure>
<center><img src="../assets/avatar/avatar-setup/Folder-Hierarchy.png"/></center>
<center><figcaption>A `Folder` containing the various `Model` objects ready to be processed by Avatar Setup into a character body, rigid accessory, and layered accessory assets.</figcaption></center>
</figure>

To parent your objects to folder:

1. In the **Explorer** window, hold <kbd>Shift</kbd> and select the `Class.Model` objects you intend to process with Avatar Setup. Ensure you are selecting a [supported base character body](#character-bodies) as one of the `Class.Model` objects.
2. Right-click and select **Group as Folder**.
3. Select the `Class.Folder` and then select the **Avatar Setup** tool to begin processing.

<Alert severity = 'warning'>
You must bundle your rigid and layered accessory models with a base character body to utilize Avatar Setup.
</Alert>
