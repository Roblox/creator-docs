---
title: Character Specifications
description: Character Specification lists the specific technical requirements for custom characters created outside of Studio.
---

Character models require a specific set of components and configuration standards to ensure all avatar features work as expected. Check that your model meets the following modeling specifications and guidelines before exporting to ensure Studio compatibility.

When ready to export, see [Export Requirements](../../art/characters/export-settings.md) for mesh export settings for Blender and Maya.

## Geometry

Avatar character models are made up of 15 separate mesh objects and require additional geometry requirements to import into Studio and publish successfully. In addition to the body [types](#body-types), [parts](#body-parts), and [budget](#triangle-budgets) specifications, ensure that your models also fulfill the following general requirements when modeling:

- **Watertight** - All geometry must be watertight without exposed holes or backfaces. Meshes used as outer cages do not need to be watertight.
- **No N-gons** - Model your assets in quads where possible.
- **Transformations** - All translation, rotation, and scale values must be frozen and pivots set to `0`, `0`, `0`.
- **Orientation** - Characters must face positive Z and stand up in positive Y.
- **Pose** - Before exporting, set your character to an I-Pose when possible.

### Body Types

Roblox supports 3 standards of body types: **Normal**, **Slender**, and **Classic**. These standards allow developers to create experiences and spaces with consistent body sizes for standardizing movement and interaction. While the minimum sizes for each body type is the same, each body type has a unique maximum total body size, as well as a range for each body asset.

<center>
<figure>
   <img src="../../assets/art/Body-Scale-Diagram.png" width = "60%"/>
<figcaption>
A visualization of how Roblox combines the 15 body parts into 6 distinct assets.
</figcaption>
</figure>
</center>

<Alert severity='warning'>
Since body assets partially overlap with each other, the total body dimensions do not represent the sum of the avatar's asset dimensions. The total body dimension is the most important factor of each body type to ensure a standard avatar size and scale.
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

In the [3D Importer](../../art/modeling/3d-importer.md#avatar-general), use **Rig Type** > **Rthro** to import your model as a Normal body type.

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

In the [3D Importer](../../art/modeling/3d-importer.md#avatar-general), use **Rig Type** > **Rthro Narrow** to import your model as a Slender body type.

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

In the [3D Importer](../../art/modeling/3d-importer.md#avatar-general), use **Rig Type** > **Default** to import your model as a Classic body type.

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

Basic textures can be imported with a `.fbx` file in Studio or imported separately as an image and applied to a mesh as a Texture ID.

You can also use `Class.SurfaceAppearance` for advanced textures. `Class.SurfaceAppearance` will override a mesh's existing TextureID and can be used for additional texturing options, such as Physically Based Rendering (PBR).

See the following requirements for basic textures:

- **File Formats** - File formats for textures that are uploaded separately in Studio must be submitted as a `.png`, `.jpg`, `.tga`, or `.bmp`.

### UV Mapping

Textures use UV mapping, a 3D modeling process to project a 3D model's surface to a 2D image, or UV Atlas. See the following requirements for UV mapping, especially if you're manually editing or optimizing your UV atlas:

- **Single UV Set** - Use a single UV set for each component, such as a humanoid or accessory. Studio doesn't allow for multiple UV sets.
- **Coordinates** - All UVs must be created within a 0:1 space.
- **Overlaps** - Overlapping UVs are allowed.
- **Maximum Texture Resolution** - Roblox supports up to 1024x1024 pixel spaces for texture maps. See [Optimizations](#optimizations) for more details on efficiently texturing your assets.

#### Optimizations

Studio's UV compositor allows you to pack and size your UVs to best suit your needs because it can detect and repackage UVs for performance and storage efficiency. The compositor looks to each component of the model, such as a character (arms, legs, torso, head), and repackages and loads the UVs as needed when in-experience changes occur, such as swapping body parts.

Especially with character models and other advanced models, optimizing your UV layouts can help prevent texture issues, save loading time, and improve performance. Keep in mind the following best practices for optimizing your UV islands for Roblox's UV compositor:

- **Pixel space** - Studio's texture compositor repacks UVs by breaking up the following pixel spaces:

  - **1024x1024** pixel space into **64x64 16 pixel** blocks.
  - **512x512** pixel space into **32x32 16 pixel** blocks.
  - **256x256** pixel space into **16x16 16 pixel** blocks.

  <GridContainer numColumns="3">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_1024.png" width = "100%"/>
      <figcaption>1024x1024 UV example</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_512.png" width = "100%"/>
      <figcaption>512x512 UV example</figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV_Grid_256.png" width="100%" />
      <figcaption>256x256 UV Example</figcaption>
    </figure>
  </GridContainer>

- **Avoid Sharing 16 Pixel Blocks** - To maximize your UV space and the resolution of your model, keep all UV Islands within these 16 pixel blocks when possible, and do not let two UV islands share the same 16 pixel block.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Layout-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Inefficient UV Layout</AlertTitle>
      UV islands share blocks in the same 16 px grid. The compositor treats this as one large group.
      </Alert>
      </figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Layout-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Optimized UV Layout</AlertTitle>
      UV islands are near each other, but do not share any blocks on the 16 px grid. The compositor treats these as separate groups.
      </Alert>
      </figcaption>
    </figure>
  </GridContainer>

- **Use Smaller Islands** - When possible, use smaller islands to simplify layout and packing. This can help prevent a UV island for one body part incorrectly applying to another as the compositor can't differentiate the islands.

  <GridContainer numColumns="2">
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Island-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Inefficient UV Island</AlertTitle>
      Several UV islands overlap into other island spaces on the 16 px grid. The compositor treats them as a single large object and may not optimize efficiently.
    </Alert>
      </figcaption>
    </figure>
    <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/UV-Island-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Optimized UV Islands</AlertTitle>
      By using smaller islands, none of the UV islands overlap on 16 px blocks. The compositor can easily identify them as smaller block groups to repack efficiently.
      </Alert>
      </figcaption>
    </figure>
  </GridContainer>

By optimizing your UV layouts, you can prevent unexpected texture conflicts, save space, and improve performance. The following is an example of how Studio's compositor can process the same character body UV layouts with and without optimizations:

 <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/Compositor-Example-Poor.png" width = "100%"/>
      <figcaption>
      <Alert severity='error'>
      <AlertTitle>Texture Repacking with Inefficient UV</AlertTitle>The islands share too many of the same 16 px blocks and causes the compositor to combine many islands as one. In this example, the compositor incorrectly packs the island for the torso area by including several other islands as well.
      </Alert>
      </figcaption>
  </figure>

  <figure>
      <img src="../../assets/modeling/meshes/mesh-requirements/Compositor-Example-Optimized.png" width="100%" />
      <figcaption>
      <Alert severity='success'>
      <AlertTitle>Texture Repacking with Optimized UV</AlertTitle>The islands do not share any 16 px blocks and allows the compositor to correctly identify each island. This ensures that the compositor correctly packs the island specifically for the required part and prevents unnecessary UV space from being saved and repacked.
      </Alert>
      </figcaption>
  </figure>

### SurfaceAppearance

You can add a [Surface Appearance](../../art/modeling/surface-appearance.md) to your mesh in Studio to add advanced texture options, such as PBR, for additional realism or detail. The `Class.SurfaceAppearance` instance uses UV mapping, a form of texture mapping, to accurately map up to 4 2D images onto the mesh object.

See the following requirements for SurfaceAppearance assets:

- **Texture files** - Ensuring your textures follow consistent conventions optimizes assets for tools like the [3D Importer](../../art/modeling/3d-importer.md) and helps with organization. When possible, texture files should include the appropriate name affix and follow the appropriate image details:
   <table>
  <thead>
    <tr>
      <th>Texture Type</th>
      <th>Texture Schema Suffix</th>
      <th>Texture image details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Albedo</td>
      <td>_ALB</td>
      <td>RGB</td>
    </tr>
    <tr>
      <td>Metalness</td>
      <td>_MET</td>
      <td>Single Channel Greyscale</td>
    </tr>
    <tr>
      <td>Normal</td>
      <td>_NOR</td>
      <td>RGB - Roblox only supports **OpenGL format - Tangent Space** normal maps.</td>
    </tr>
    <tr>
      <td>Roughness</td>
      <td>_RGH</td>
      <td>Single Channel Greyscale</td>
    </tr>
  </tbody>
  </table>

- **PBR Texture Budget** - Use an appropriate texture map size based on the asset you are texturing to optimize for visual quality and performance. As a general guideline, each asset should have a texture resolution of 256x256 for every 2x2x2 unit space the asset occupies. If larger than a 2x2x2 cube, use the next highest resolution. The following are some baseline texture sizing examples:

   <table>
  <thead>
    <tr>
      <th>Recommended Map Size</th>
      <th>Approximate Asset Size (unit cube)</th>
      <th>Example Assets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>64x64 - 128x128</td>
      <td>1x1x1</td>
      <td>Jewelry, sunglasses, eyebrows, mustaches</td>
    </tr>
    <tr>
      <td>1024x1024 (maximum)</td>
      <td>8x8x8</td>
      <td>Avatar characters</td>
    </tr>
  </tbody>
  </table>

   <Alert severity = 'info'>
   When rendering many textures at the same time, Roblox may down-res textures to optimize for performance.
   </Alert>

- **Substance Painter** - If possible, create your final PBR texture using Substance Painter and ensure that the mesh maps are created without errors.

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
