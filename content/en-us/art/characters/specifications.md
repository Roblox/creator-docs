---
title: Character Specifications
description: Character Specification lists the specific technical requirements for custom characters created outside of Studio.
---

Character models require a specific set of components and configuration standards to ensure all avatar features work as expected. Check that your model meets the following modeling specifications and guidelines before exporting to ensure Studio compatibility.

When ready to export, see [Export Requirements](../../art/characters/export-settings.md) for mesh export settings for Blender and Maya.

## Geometry

Avatar character models are made up of 15 separate mesh objects and require additional geometry requirements to import into Studio and publish successfully. In addition to the body [types](#body-scale), [parts](#body-parts), and [budget](#triangle-budgets) specifications, ensure that your models also fulfill the following general requirements when modeling:

- **Watertight** - All geometry must be watertight without exposed holes or backfaces. Meshes used as outer cages do not need to be watertight.
- **No N-gons** - Model your assets in quads where possible.
- **Transformations** - All translation, rotation, and scale values must be frozen and pivots set to `0`, `0`, `0`.
- **Orientation** - Characters must face positive Z and stand up in positive Y.
- **Pose** - Before exporting, set your character to an I-Pose when possible.

### Body Scale

Roblox supports 3 standards of body scales: **Normal**, **Slender**, and **Classic**. These standards allow developers to create experiences and spaces with consistent body sizes for standardizing movement and interaction. While the minimum sizes for each body scale is the same, each body scale has a unique maximum total body size, as well as a range for each body asset.

<center>
<figure>
   <img src="../../assets/art/Body-Scale-Diagram.png" width = "60%"/>
<figcaption>
A visualization of how Roblox combines the 15 body parts into 6 distinct assets.
</figcaption>
</figure>
</center>

<Alert severity='warning'>
Since body assets partially overlap with each other, the total body dimensions do not represent the sum of the avatar's asset dimensions. The total body dimension is the most important factor of each body scale to ensure a standard avatar size and scale.
</Alert>

#### Normal

<center>
<figure>
   <img src="../../assets/art/resources/Body-Scale-Rthro-Normal.png" width = "60%"/>
<figcaption>
A Rthro Normal body scale [downloadable mannequin](../../avatar/resources.md#references).
</figcaption>
</figure>
</center>

In the [3D Importer](../../art/modeling/3d-importer.md#avatar-general), use **Rig Type** > **Rthro** to import your model as a Normal body scale.

<br />

<GridContainer numColumns="2">
<figure>
<figcaption><center>Minimum (in studs)</center></figcaption>
<table>
<thead>
  <tr>
    <th>Part</th>
    <th>X (width)</th>
    <th>Y (height)</th>
    <th>Z (depth)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Head</td>
    <td>.5</td>
    <td>.5</td>
    <td>.5</td>
  </tr>
  <tr>
    <td>Arm</td>
    <td>.25</td>
    <td>1.5</td>
    <td>.25</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>1</td>
    <td>2</td>
    <td>.7</td>
  </tr>
  <tr>
    <td>Leg</td>
    <td>.25</td>
    <td>2</td>
    <td>.5</td>
  </tr>
  <tr>
    <td>**Total**</td>
    <td>**1.5**</td>
    <td>**4.5**</td>
    <td>**.7**</td>
  </tr>
</tbody>
</table>
</figure>
<figure>
<figcaption><center>Maximum (in studs)</center></figcaption>
<table>
<thead>
  <tr>
    <th>Part</th>
    <th>X (width)</th>
    <th>Y (height)</th>
    <th>Z (depth)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Head</td>
    <td>3</td>
    <td>2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Arm</td>
    <td>2</td>
    <td>4.5</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>4</td>
    <td>3</td>
    <td>2.25</td>
  </tr>
  <tr>
    <td>Leg</td>
    <td>1.5</td>
    <td>3</td>
    <td>2</td>
  </tr>
  <tr>
    <td>**Total**</td>
    <td>**8**</td>
    <td>**8**</td>
    <td>**2.25**</td>
  </tr>
</tbody>
</table>
</figure>
</GridContainer>

#### Slender

<center>
<figure>
   <img src="../../assets/art/resources/Body-Scale-Rthro-Slender.png" width = "60%"/>
<figcaption>
A Rthro Slender (Narrow) body scale [downloadable mannequin](../../avatar/resources.md#references).
</figcaption>
</figure>
</center>

In the [3D Importer](../../art/modeling/3d-importer.md#avatar-general), use **Rig Type** > **Rthro Narrow** to import your model as a Slender body scale.

<br />

<GridContainer numColumns="2">
<figure>
<figcaption><center>Minimum (in studs)</center></figcaption>
<table>
<thead>
  <tr>
    <th>Part</th>
    <th>X (width)</th>
    <th>Y (height)</th>
    <th>Z (depth)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Head</td>
    <td>.5</td>
    <td>.5</td>
    <td>.5</td>
  </tr>
  <tr>
    <td>Arm</td>
    <td>.25</td>
    <td>1.5</td>
    <td>.25</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>1</td>
    <td>2</td>
    <td>.7</td>
  </tr>
  <tr>
    <td>Leg</td>
    <td>.25</td>
    <td>2</td>
    <td>.5</td>
  </tr>
  <tr>
    <td>**Total**</td>
    <td>**1.5**</td>
    <td>**4.5**</td>
    <td>**.7**</td>
  </tr>
</tbody>
</table>
</figure>
<figure>
<figcaption><center>Maximum (in studs)</center></figcaption>
<table>
<thead>
  <tr>
    <th>Part</th>
    <th>X (width)</th>
    <th>Y (height)</th>
    <th>Z (depth)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Head</td>
    <td>2</td>
    <td>2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Arm</td>
    <td>1.5</td>
    <td>4</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>2.5</td>
    <td>3</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Leg</td>
    <td>1.5</td>
    <td>3</td>
    <td>2</td>
  </tr>
  <tr>
    <td>**Total**</td>
    <td>**5.5**</td>
    <td>**8**</td>
    <td>**2**</td>
  </tr>
</tbody>
</table>
</figure>
</GridContainer>

#### Classic

<center>
<figure>
   <img src="../../assets/art/resources/Body-Scale-Classic.png" width = "60%"/>
<figcaption>
A Classic body scale [downloadable mannequin](../../avatar/resources.md#references).
</figcaption>
</figure>
</center>

In the [3D Importer](../../art/modeling/3d-importer.md#avatar-general), use **Rig Type** > **Default** to import your model as a Classic body scale.

<br />

<GridContainer numColumns="2">
<figure>
<figcaption><center>Minimum (in studs)</center></figcaption>
<table>
<thead>
  <tr>
    <th>Part</th>
    <th>X (width)</th>
    <th>Y (height)</th>
    <th>Z (depth)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Head</td>
    <td>.5</td>
    <td>.5</td>
    <td>.5</td>
  </tr>
  <tr>
    <td>Arm</td>
    <td>.25</td>
    <td>1.5</td>
    <td>.25</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>1</td>
    <td>2</td>
    <td>.7</td>
  </tr>
  <tr>
    <td>Leg</td>
    <td>.25</td>
    <td>2</td>
    <td>.5</td>
  </tr>
  <tr>
    <td>**Total**</td>
    <td>**1.5**</td>
    <td>**4.5**</td>
    <td>**.7**</td>
  </tr>
</tbody>
</table>
</figure>
<figure>
<figcaption><center>Maximum (in studs)</center></figcaption>
<table>
<thead>
  <tr>
    <th>Part</th>
    <th>X (width)</th>
    <th>Y (height)</th>
    <th>Z (depth)</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Head</td>
    <td>1.5</td>
    <td>1.75</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Arm</td>
    <td>2</td>
    <td>3</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>3.5</td>
    <td>3.25</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Leg</td>
    <td>1.5</td>
    <td>2.75</td>
    <td>2</td>
  </tr>
  <tr>
    <td>**Total**</td>
    <td>**7.5**</td>
    <td>**7.75**</td>
    <td>**2**</td>
  </tr>
</tbody>
</table>
</figure>
</GridContainer>

### Triangle Budgets

Although model geometries are typically created using quads, the Roblox engine converts imported assets into tris. Each asset of your character model must not exceed our maximum tri budget. To quickly get the number of expected tris in your third-party modeling application, you can double the number of quads in your model.

<Alert severity = 'info'>When character models are uploaded to Studio and created into assets for the Marketplace, the body is split into 6 individual assets: **DynamicHead**, **Torso**, **LeftArm**, **RightArm**, **LeftLeg**, **RightLeg**.</Alert>

<table>
<thead>
  <tr>
    <th>Asset Type</th>
    <th>Included Mesh Objects</th>
    <th>Maximum Triangles</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>DynamicHead</td>
    <td>Head</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>Torso</td>
    <td>UpperTorso, LowerTorso</td>
    <td>1750</td>
  </tr>
  <tr>
    <td>LeftArm </td>
    <td>LeftUpperArm, LeftLowerArm, LeftHand</td>
    <td>1248</td>
  </tr>
  <tr>
    <td>Right Arm</td>
    <td>RightUpperArm, RightLowerArm, RightHand</td>
    <td>1248</td>
  </tr>
  <tr>
    <td>LeftLeg </td>
    <td>LeftUpperLeg, LeftLowerLeg, LeftFoot</td>
    <td>1248</td>
  </tr>
  <tr>
    <td>Right Leg</td>
    <td>RightUpperLeg, RightLowerLeg, RightFoot</td>
    <td>1248</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>Head, UpperTorso, LowerTorso, LeftUpperArm, LeftLowerArm, LeftHand, RightUpperArm, RightLowerArm, RightHand, LeftUpperLeg, LeftLowerLeg, LeftFoot, RightUpperLeg, RightLowerLeg, RightFoot</td>
    <td>10,742</td>
  </tr>
</tbody>
</table>

### Body Parts

See the following specifications for the individual mesh objects that make up a character model:

- **Naming Convention** - Limbs must all be specifically named:
  - UpperTorso_Geo
  - LowerTorso_Geo
  - LeftUpperArm_Geo
  - LeftLowerArm_Geo
  - LeftHand_Geo
  - RightUpperArm_Geo
  - RightLowerArm_Geo
  - RightHand_Geo
  - LeftUpperLeg_Geo
  - LeftLowerLeg_Geo
  - LeftFoot_Geo
  - RightUpperLeg_Geo
  - RightLowerLeg_Geo
  - RightFoot_Geo
  - Head_Geo
- **Caps** - Limbs must be capped, so that they form a full watertight mesh when separated from the body. Caps can be rounded or flat depending on design.

   <img src="../../assets/modeling/meshes/Modeling-Requirements-Caps.png" width="600" />

### Face Accessories

Face accessories, such as hair, eyebrows, and eyelashes are unique accessories that you can bundle with an avatar body upload. At this time, eyebrows and eyelashes can not be uploaded as standalone accessories and must be bundled with an avatar body. See [Accessory Specifications](../accessories/specifications.md#face-accessories) for additional information on face accessories.

### Visibility

To ensure that avatar sizes are visually consistent, you must standardize body part visibility with the following requirements:

- **Opacity** - Body parts must be fully opaque.
- **Bounding Boxes** - Body part assets must take up a significant visible portion of their bounding box in a front, side, and back view.
  - Body parts, such as Torso, Left Arm, Right Leg, must take up at least 50% of body part's bounding box.
  - The head part must take up at least 35% of the mesh's bounding box.
    <GridContainer numColumns="2">
      <figure>
        <img src="../../assets/art/avatar/Valid-Visibility.png" />
        <figcaption>An acceptable head mesh example that takes up a majority of the bounding box in the front view</figcaption>
      </figure>
      <figure>
        <img src="../../assets/art/avatar/Invalid-Visibility.png" />
        <figcaption>A non-acceptable head mesh example that does not take up the appropriate amount of bounding box space in the front view</figcaption>
      </figure>
    </GridContainer>

## Attachments

Attachments are points on the humanoid model where various accessories can be attached or equipped. In general, attachment points should halfway overlap the character model's mesh part.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/Collar-Attachment-1.png" />
      <figcaption>Incorrect placement of collar attachments</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/Collar-Attachment-2.png" />
      <figcaption>Correct placement of collar attachments</figcaption>
    </figure>
  </GridContainer>

Each attachments must also follow a specific naming convention and positional consistency:

<table>
<thead>
  <tr>
    <th>Mesh Part</th>
    <th>Attachment Name</th>
    <th>Details</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="4">Head</td>
    <td>FaceCenter_Att</td>
    <td>Anywhere within mesh bounding box</td>
  </tr>
  <tr>
    <td>FaceFront_Att</td>
    <td>Front half of mesh bounding box</td>
  </tr>
  <tr>
    <td>Hat_Att</td>
    <td>Top half of mesh bounding box, can overlap with Hair_Att</td>
  </tr>
  <tr>
    <td>Hair_Att</td>
    <td>Top half of mesh bounding box, can overlap with Hat_Att</td>
  </tr>
  <tr>
    <td rowspan="5">UpperTorso</td>
    <td>LeftCollar_Att</td>
    <td>Left top half of mesh bounding box</td>
  </tr>
  <tr>
    <td>RightCollar_Att</td>
    <td>Right top half of mesh bounding box</td>
  </tr>
  <tr>
    <td>Neck_Att</td>
    <td>Top half of mesh bounding box</td>
  </tr>
  <tr>
    <td>BodyBack_Att</td>
    <td>Back half of mesh bounding box</td>
  </tr>
  <tr>
    <td>BodyFront_Att</td>
    <td>Front half of mesh bounding box</td>
  </tr>
  <tr>
    <td rowspan="4">LowerTorso</td>
    <td>Root_Att</td>
    <td>Must set to `0`, `0`, `0` position</td>
  </tr>
  <tr>
    <td>WaistFront_Att</td>
    <td>Front half of mesh bounding box, can overlap with WaistCenter_Att</td>
  </tr>
  <tr>
    <td>WaistBack_Att</td>
    <td>Back half of mesh bounding box</td>
  </tr>
  <tr>
    <td>WaistCenter_Att</td>
    <td>Anywhere in mesh bounding box, can overlap with WaistFront_Att</td>
  </tr>
  <tr>
    <td>RightUpperArm</td>
    <td>RightShoulder_Att</td>
    <td>Top half of mesh bounding box</td>
  </tr>
  <tr>
    <td>RightHand</td>
    <td>RightGrip_Att</td>
    <td>Anywhere in mesh bounding box, must set the rotation of the RightGrip_Att to `90`, `0`, `0`</td>
  </tr>
  <tr>
    <td>LeftUpperArm</td>
    <td>LeftShoulder_Att</td>
    <td>Top half of mesh bounding box</td>
  </tr>
  <tr>
    <td>LeftHand</td>
    <td>LeftGrip_Att</td>
    <td>Anywhere in mesh bounding box, must set the rotation of the LeftGrip_Att to `90`, `0`, `0`</td>
  </tr>
  <tr>
    <td>RightFoot</td>
    <td>RightFoot_Att</td>
    <td>Anywhere in mesh bounding box</td>
  </tr>
  <tr>
    <td>LeftFoot</td>
    <td>LeftFoot_Att</td>
    <td>Anywhere in mesh bounding box</td>
  </tr>
</tbody>
</table>

## Rigging

Unlike generic rigs, humanoid models require a specific hierarchy and naming conventions for the internal bone or joint structure.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/animation/importing-custom-3d-rigs/Birdcaller-Imported.jpeg" />
    <figcaption>Humanoid rig model</figcaption>
  </figure>
  <figure>
    <img src="../../assets/animation/importing-custom-3d-rigs/Rig-Hierarchy-Birdcaller-Blender-Bones.png" width="75%" />
    <figcaption>Humanoid rig bone structure (Blender)</figcaption>
  </figure>
</GridContainer>

See the following requirements for humanoid rigging:

- **Rig Hierarchy** - Humanoid rigs require a specific bone hierarchy and naming convention:

  - Root
  - HumanoidRootPart
  - LowerTorso
  - UpperTorso
  - Head (representing the base of the neck)
  - LeftUpperArm
  - LeftLowerArm
  - LeftHand
  - RightUpperArm
  - RightLowerArm
  - RightHand
  - LeftUpperLeg
  - LeftLowerLeg
  - LeftFoot
  - RightUpperLeg
  - RightLowerLeg
  - RightFoot

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/skinned-meshes/Rig-Hierarchy-Blender.png" />
      <figcaption>Blender rig hierarchy</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/skinned-meshes/Rig-Hierarchy-Maya.png" />
      <figcaption>Maya rig hierarchy</figcaption>
    </figure>
  </GridContainer>

- **LowerTorso and Root** - The LowerTorso and Root bone or joint position must be set to `0`, `0`, `0`.
- **Pose** - Export your character model in an I-Pose for the best Studio compatibility. The LeftUpperArm and RightUpperArm bones can be exported with rotation values to meet this requirement.

## Skinning

Roblox supports skinning for rigged meshes. See [Rigging and Skinning](../../art/modeling/rigging.md) for more details on implementing skinned meshes in your experience.

See the following requirements for skinning:

- **Max Influences** - A vertex can not be influenced by more than 4 bones or joints.
- **No Root Influences** - Do not apply influences to the Root bone or joint.
- **Symmetry** - When possible, maintain symmetry when applying influences to a rig.

## Facial Animations

Roblox supports facial animation on character heads and can support more than 50 base poses. If you are creating an avatar character, it must, at minimum, include the following 17 [FACS reference poses](../../art/characters/facial-animation/facs-poses-reference.md) to support avatar chat:

- EyesLookDown
- EyesLookLeft
- EyesLookRight
- EyesLookUp
- JawDrop
- LeftEyeClosed
- LeftLipCornerPuller
- LeftLipStretcher
- LeftLowerLipDepressor
- LeftUpperLipRaiser
- LipsTogether
- Pucker
- RightEyeClosed
- RightLipCornerPuller
- RightLipStretcher
- RightLowerLipDepressor
- RightUpperLipRaiser

While the 17 poses are a minimum requirement, it's recommended to include as many facial poses as possible in your asset to improve expressiveness and facial animation fidelity for facial animation and avatar chat.

## Textures

Avatar characters must follow Roblox's [texture specifications](../../art/modeling/texture-specifications.md). Characters created for the Marketplace can take advantage of [custom skin tones](#custom-skin-tone) which use alpha layers allow users to select their own base color.

### Custom Skin Tone

When texturing an avatar character model where the user can set their own skin tone, set the exposed skin areas as transparent so a default color or texture is not baked into the texture. When rendering, the Studio engine applies the transparent layer on top without any layer effects. This step applies mostly to human-like characters with exposed skin that you intend users to customize.

The following are examples of skin tone shading for the face, and you can apply this process with any part of an avatar with exposed skin:

<GridContainer numColumns="2">
<figure>
  <img src="../../assets/modeling/meshes/mesh-requirements/Face-Tone-Transparent.png" />
</figure>
<figure>
  - Use 100% opacity for areas not related to a customized skin tone, such as eyes and brows.
  - When applying shading, use black at low opacity and adjust opacity when needed.
  - For areas that are partially translucent, such as shading contours or certain cosmetic features, leave some transparency for partial visibility of the skin tone.
  - You should consistently test out how various colors layers can interact with your shading.
</figure>
</GridContainer>

<GridContainer numColumns="4">
  <figure>
  <img src="../../assets/modeling/meshes/mesh-requirements/Face-Tone-Beige.png" />
  <figcaption>Beige</figcaption>
  </figure>
  <figure>
  <img src="../../assets/modeling/meshes/mesh-requirements/Face-Tone-Blue.png" />
  <figcaption>Blue</figcaption>
  </figure>
  <figure>
  <img src="../../assets/modeling/meshes/mesh-requirements/Face-Tone-Brown.png" />
  <figcaption>Brown</figcaption>
  </figure>
  <figure>
  <img src="../../assets/modeling/meshes/mesh-requirements/Face-Tone-Pink.png" />
  <figcaption>Pink</figcaption>
  </figure>
</GridContainer>

## Outer Cages

Outer cages are non-rendered meshes that Roblox uses to define the outer surfaces of a body part using a `Class.WrapTarget` instance. Outer cages on your character model allow your character to wear layerable accessories, such as clothing.

For general use, see the following requirements for adding inner and outer cage meshes to your model:

- **Naming Conventions** - The inner and outer cage must be named after the primary mesh object with **\_InnerCage** and **\_OuterCage** affixed.

   <img src="../../assets/accessories/lc-blender-selecting-cage-in-outlier.png" />

- **Outer Cage** - Models, such as a playable character, that aren't expected deform but are the target of meshes that will stretch over it, only require an Outer Cage.
- **Vertices and UV Map** - Don't delete vertices or alter the UVs on the Outer Cages as this can cause errors when importing in Studio or when equipping onto a character. Use the Roblox provided templates for the cage meshes to ensure compatibility with other layered assets.
- **Symmetry and consistency** - Keep each face (the space between vertices) consistently sized and retain symmetry wherever possible. Use symmetry tools in your modeling software whenever possible.

## Marketplace Requirements

Along with the other technical requirements listed, your items must meet the following additional specifications before uploading them to the Marketplace to sell:

- Ensure that your items adhere to the [Marketplace Program Guidelines](../../art/marketplace/marketplace-policy.md).
- Whenever possible, ensure that your items adhere to the following modeling requirements:
  - [Custom Mesh Specifications](../../art/modeling/specifications.md)
  - Any applicable [avatar specifications](../../art/characters/specifications.md)
- Object `Class.MeshPart.Material|Material` is set to `Plastic`.
- Object `Class.MeshPart.Transparency|Transparency` is set to `0`.
- Object `Class.MeshPart.VertexColor|VertexColor` is the default `1, 1, 1`.
- If your head includes separate eyelash and eyebrow assets, you must add them to your character model as `Class.Accessory` objects.
  - See [accessory specifications](../../art/accessories/specifications.md) for additional technical requirements.
- Your `Class.Model` instance doesn't contain extraneous objects, like `Class.Script` or additional `Class.Part` instances.
