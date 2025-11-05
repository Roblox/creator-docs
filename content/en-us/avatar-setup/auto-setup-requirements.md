---
title: Auto-setup model requirements
description: The Avatar Setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

<Alert severity = 'warning'>
Auto-setup is currently in [active development](https://devforum.roblox.com/t/avatar-auto-setup-now-supports-clothing-and-accessories/3709128) with many improvements on the roadmap. Note that some inputs might work better than others and your results can vary over time as additional training and improvements are made.
</Alert>

[Auto-setup](./auto-setup.md) supports the automatic conversion of basic custom models to Roblox-ready bodies, rigid accessories, and layered clothing. By [bundling](#bundle-multiple-assets) your models together, you can automatically setup multiple custom models into avatar items for use in-experience or for upload to the Marketplace.

### Body

Auto-setup can attempt to process a 3D model into a Roblox-ready character model. This is one of the most common use-cases for auto-setup and can help you save time by automating the rigging, caging, and other configurations required to make a Roblox-ready avatar character.

At this time, avatar assets like [rigid accessories](#accessories) and [layered clothing](#layered-clothing) may require processing with a base body. Auto-setup is able to use this base body as a mannequin, creating more accurate attachment points and other components to ensure a better fit. If converting accessories or clothing, you must [bundle](#bundle-multiple-assets) them with a base body for fitting.

#### Supported inputs

Auto-setup detects the following partial avatar body inputs:

<table><thead>
  <tr>
    <th><b>Reference Image</b></th>
    <th><b>Auto-setup support</b></th>
  </tr></thead>
<tbody>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-None-Rigged.png"/></td>
    <td><Alert severity = 'success'>A single or multiple mesh body with **no rigging**.</Alert>The most common input is a single mesh object that doesn't include rigging data or other components. The input body must meet auto-setup's [model requirements](#body). <br /><br /> In this case, auto-setup creates the rest of the avatar components automatically.</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-Body-Rigged.png"/></td>
    <td><Alert severity = "success">A single or multiple mesh body with **only body rigging**.</Alert>If the provided meshes include a compatible R15 body rig, auto-setup uses the provided rig, and creates the facial rig and all other components. <br /><br /> The input body rig must follow Roblox's [rigging configuration](../art/characters/specifications.md#rigging), otherwise auto-setup creates a brand new rig for you.</td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-Head-Rigged.png"/><br /></td>
    <td><Alert severity = "success">A multiple mesh with **only facial rigging**.</Alert>If you intend to use your own custom facial rigging, set the FaceRootJoint (and all child bones) as a child of the R15 head joint. For more information, see [optional rig requirements](#rig-requirements-optional). </td>
  </tr>
  <tr>
    <td><img src="../assets/avatar/avatar-setup/Partial-Inputs-All-Rigged.png"/><br /></td>
    <td><Alert severity = "success">A **single mesh** body with **both body and facial rigging**.</Alert>If the body rig, facial rig, and appropriate FACS data is included, auto-setup preserves that data and only generates the missing Roblox-specific components. **Bodies comprised of multiple meshes are not supported for this input.**<br /><br />For more information, see [optional rig requirements](#rig-requirements-optional).</td>
  </tr>
</tbody></table>

#### Mesh requirements

To achieve the best results when converting a model to a Roblox-ready avatar character, it's important to configure your base model so the tool can properly generate avatar components with.

Note that Roblox is actively adding improvements to this tool and these requirements may lift in the future.

<Alert severity = 'error'>
Many existing [downloadable resources](../avatar/resources.md) for avatar bodies do not follow the auto-setup requirements below. Existing avatar references may need modification to ensure the asset follows the auto-setup models. <br /> <br />See the specific [auto-setup references](../avatar/resources.md#auto-setup-references) for assets that were created for auto-setup requirements.
</Alert>

The full requirements for the input body model are as follows:

1. **Single or multiple mesh** — In most cases, auto-setup accepts bodies comprising of 1 or more meshes. If your body includes multiple meshes, the tool automatically recombines all selected meshes as a single mesh, then decimates the combined parts to the appropriate R15 structure.
   1. If providing the standard 15 multiple meshes that adhere to the R15 character naming convention, auto-setup attempts to place joints according to the user-partitioned body parts.
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
9.  **Watertight** — Ensure the model is watertight in all regions with the exception of the eyes and mouth. Watertight means that there are no holes in the mesh and no back faces are exposed.
10. **No accessories** — Do not include accessories, including face accessories, like hair, eyebrows, beards, and eyelashes.
11. **Distinct neck area** — Keep the neck distinct and not merged with the shoulders or upper torso.
12. **Includes texture** — Models should include one or more texture maps. If the input body includes multiple textures, the tool bakes the textures to a single map. This applies to [PBR textures](../art/modeling/surface-appearance.md) where the four textures are baked — one for each albedo, normal, metalness and roughness.
13. **Follows Marketplace and Community Policy** — The model must conform to Roblox's [Marketplace Policy](../marketplace/marketplace-policy.md) and [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

#### Rig requirements (Optional)

You can use your own custom body and face rig for your character model input instead of allowing auto-setup to generate a new one.

<Alert severity = 'info'>
If you provide the standard 15 multiple meshes that adhere to the R15 character naming convention **without a rig**, auto-setup attempts to generate joints according to the user-partitioned body parts.
</Alert>

To ensure that auto-setup uses your **own custom body rig**:

- Ensure that your bones (Blender) or joints (Maya) meet [Roblox's avatar rigging requirements](../art/characters/specifications.md#rigging).
  - Double-check naming conventions and hierarchy.
- Body rigs should not include additional bones beyond the standard 15, and facial rigs (no bone limit) should be correctly parented to a RootFaceJoint.

To ensure that auto-setup uses your **own custom face rig and FACs data**:

- A supported R15 body rig is required when submitting custom facial rigs and facial animation data.
  - Review [supported body inputs](#body) to ensure you are submitting a supported body input and facial rig combination.
- Facial rig must include a `RootFaceJoint` bone (usually [mapped](../art/characters/facial-animation/create-basic-heads.md#map) as `DynamicHead`) whose parent is the `Head` joint of the R15 rig.
- All the other facial animation joints are descendants of the `RootFaceJoint`, and not direct children of the `Head` joint.
- Animations need to be provided for the [17 required poses](../art/characters/specifications.md#facial-animations), at minimum.
- Neutral animation must map to frame `0`.
- Since the head is part of the single mesh with the body, the facial animation mappings must be included with the single body mesh:

  - The mapping between animation frames and facial poses are stored in the extra attributes / custom properties of the provided single mesh.
  - The name of the root face joint is stored in the extra attributes / custom properties of the single mesh, mapping `RootFaceJoint` to the corresponding name (usually `DynamicHead`).

#### Examples of non-supported bodies

The following are common examples of bodies that may not yield expected results with auto-setup:

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

### Accessories

<Alert severity = 'warning'>
At this time, you must [bundle](#bundle-multiple-assets) your accessory and clothing models with a base body to utilize auto-setup. For more information, see [supported inputs](#supported-inputs-1).
</Alert>

Auto-setup can convert models into rigid accessories, configuring the scale type and attachment components required for rigid accessories.

To convert a mesh model into an accessory using auto-setup:

1. Fit the model onto a base body in Studio or your 3D modeling software.
2. [Bundle](#bundle-multiple-assets) the assets together in a single `Class.Folder`.
3. Use **Avatar Setup** to use auto-setup on your assets.

During this process, you will be able to designate individual meshes or models as rigid accessories, layered accessories, or body parts. After conversion, a prompt displays allowing you to select the specific **Asset Type**.

For best results, ensure your models adhere to Roblox's [accessory geometry specifications](../art/accessories/specifications.md#geometry-and-budgets).

#### Supported inputs

Rigid accessory meshes must be bundled with a body for auto-setup to configure. See the following supported inputs for rigid accessory meshes.

<table><thead>
  <tr>
    <th>Input object</th>
    <th>Auto setup generates</th>
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
    <td>`Class.Accessory` containing clothing mesh, `BodyPartScaleType`, and attachment points</td>
  </tr>
</tbody>
</table>

### Layered clothing

Auto-setup can convert models into clothing accessories, adding in rigging and caging data that normally requires manual configuration in a separate software.

To convert a mesh model into an accessory using auto-setup:

1. Fit the model onto a base body in Studio or your 3D modeling software.
2. (Optional - for best results) [Bundle](#bundle-multiple-assets) the assets together in a single `Class.Folder`.
3. Use Avatar Setup to use auto-setup on your assets.

During this process, you will be able to designate individual meshes or models as rigid accessories, layered accessories, or body parts. After conversion, a prompt displays allowing you to select the specific **Asset Type**.

For best results, ensure your models adhere to Roblox's [layered clothing geometry specifications](../art/accessories/clothing-specifications.md#geometry-and-budgets).

#### Supported inputs

Auto-setup can configure clothing models to a layered clothing `Class.Accessory` complete with caging and rigging data. While auto-setup can configure models without a bundled body, you may find better results if you include a base body for setup.

<table><thead>
  <tr>
    <th>Input object</th>
    <th>Auto setup generates</th>
  </tr></thead>
<tbody>
  <tr>
    <td>`Class.Model` containing clothing mesh object with no additional components (this is the object created when importing a custom 3D object)   </td>
    <td>
        <ul>
          <li>`Class.Accessory` containing clothing mesh and the following generated components:</li>
          <ul>
            <li>Inner and outer cage data</li>
            <li>Attachment points</li>
          </ul>
        </ul>
    <Alert severity = 'warning'>Without an accompanying body asset, auto setup makes a best effort for generating cage data.</Alert>
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

Auto-setup can process multiple accessory or clothing models with a single body model. To submit multiple models in the **Avatar Setup** tool, parent your models within a single folder.

<figure>
<center><img src="../assets/avatar/avatar-setup/Folder-Hierarchy.png"/></center>
<center><figcaption>A `Folder` containing the various `Model` objects ready to be processed by auto-setup into body, accessory, and clothing assets.</figcaption></center>
</figure>

To quickly parent your objects to folder:

1. In the **Explorer**, hold <kbd>Shift</kbd> and select the `Class.Model` objects you intend to process with auto-setup. Ensure you are selecting a [supported base body](#body) as one of the `Class.Model` objects.
2. Right-click and select **Group as Folder**.
3. Select the `Class.Folder` and then select the **Avatar Setup** tool to begin processing.

<Alert severity = 'warning'>
At this time, you must bundle your accessory and clothing models with a base body to utilize auto-setup.
</Alert>
