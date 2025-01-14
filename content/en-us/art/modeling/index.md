---
title: Custom meshes
description: External modeling is the use of a third-party modeling software to create custom meshes.
---

**Custom meshes** are 3D objects that enhance the visual appeal and uniqueness of your environment and characters. In Studio, custom meshes are represented as `Class.MeshPart` objects, and you can use them to create assets like characters, clothing, environment props, and cosmetics. To create a custom mesh, you must use a third-party modeling application, such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview), to design and model the asset before importing the 3D object into Studio.

Many 3D assets, like characters, are made up of several meshes and are represented in Studio as a single `Class.Model`. See [Models](../../parts/models.md) for more information.

In Roblox, custom 3D assets generally fall under three types of applications:

- **Generic meshes or models** you can use for environmental props, buildings, characters, and decoration within an experience.
- **Avatar models** for users or non-player characters (NPCs).
- **Accessory models** that character models can equip and wear, like clothing and cosmetics.

If you meet certain account requirements, you can publish and sell your avatar-ready models on the Marketplace and earn a commission for each sale. For more information, see [Roblox avatars](../../avatar/index.md).

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/modeling/surface-appearance/Layered-Clothing-Example.png" alt="A Roblox avatar wearing a glossy puffy jacket and jeans"/>
    <figcaption>Create custom accessories, clothing, and characters that anyone can wear and use</figcaption>
  </figure>
  <figure>
    <img src="../../assets/modeling/meshes/Beyond-The-Dark-Example.png" alt="A floating alien creature in space, from the Beyond The Dark experience"/>
    <figcaption>Design a custom character unique to your experience</figcaption>
  </figure>
  <figure>
    <img src="../../assets/modeling/meshes/Mystery-of-Duvall-Example.png" alt="A cluttered interior room with a candle in the forefront and spooky interior lighting from the Mystery of Duvall Drive experience"/>
    <figcaption>Use custom meshes and models to give your environments ambiance and depth</figcaption>
  </figure>
</GridContainer>

## Supported meshes

Roblox supports many types of custom meshes, as long as they adhere to the [general mesh specifications](../../art/modeling/specifications.md). A basic custom mesh consists of at least one mesh object and one texture:

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/art/Basic-Mesh-Example.png" alt="A plain white tree mesh without a texture"/>
    <figcaption>A mesh object sets the shape and geometry of the 3D object</figcaption>
  </figure>
  <figure>
    <img src="../../assets/art/Basic-Texture-Example.png" alt="Various color maps used to apply textures to the tree bark, and inner, middle, and outer leaves"/>
    <figcaption>A texture image map applies a surface appearance and color</figcaption>
  </figure>
  <figure>
    <img src="../../assets/art/Basic-Mesh-Combined-Example.png" alt="The tree mesh and the image maps combined to create a single tree"/>
    <figcaption>The mesh and texture combine to make a unique custom 3D object</figcaption>
  </figure>
</GridContainer>

Studio also supports meshes that include [rigging and skinning](#rigging-and-skinning) data, [PBR textures](#pbr-textures), and other [Studio-related objects](#studio-related-objects) like cage meshes and attachments. Many of these various components are required if you are creating avatar character models or accessories.

### Rigging and skinning

A **rigged mesh** is a mesh with an internal poseable skeleton rig and bone structure. Rigged meshes allow mesh surfaces to rotate and move where internal bone joints are placed within a model, such as a character's knee or elbow. Skinning a rigged mesh allows the mesh object to bend organically, imitating the natural way joints would move in real life.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../assets/modeling/skinned-meshes/Head-Rigid-Example.mp4"></video>
    <figcaption>Without skinning, the entire head mesh rotates on a single axis</figcaption>
  </figure>
  <figure>
    <video controls src="../../assets/modeling/skinned-meshes/Head-Skinned-Example.mp4"></video>
    <figcaption>With skinning, the head mesh bends naturally at the neck, and the bottom of the neck stays connected to the torso</figcaption>
  </figure>
</GridContainer>

For more information on rigging and skinning, see [Rigging and skinning](../../art/modeling/rigging.md).

### PBR textures

**Physically-Based rendering** (PBR) textures allow you to represent realistic shading and lighting by using multiple types of texture images, or **maps**, on a single object. Combining multiple texture maps can more accurately simulate color, roughness, and reflectivity in any lighting environment and can enhance the visual elements of your assets and environment.

<GridContainer numColumns="2">
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-Example-1.jpg" alt="A realistic looking leafy bush with shadows and depth."/>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-Example-3.jpg" alt="A realistic looking rock with moss on the top." />
</GridContainer>

For more information on PBR textures, see [PBR textures](../../art/modeling/surface-appearance.md).

### Studio-related objects

Studio automatically converts certain types of objects found in 3D modeling files as specific workspace objects in the experience. These are typically used when creating a character or accessory, and configuring these in your modeling software can sometimes be the primary way of correctly setting up these Studio objects.

The following objects are automatically created in Studio if they are detected by the importer:

- `Class.Attachment` - Created when Studio detects mesh objects that include `_Att` at the end of their name.
- `Class.WrapTarget` - Created when Studio detects mesh objects that include `_OuterCage` at the end of their name.
- `Class.WrapLayer` - Created when Studio detects a mesh object with `_InnerCage` and similarly named mesh object with `_OuterCage` at the end of their names.
- `Class.FaceControls` - Created when Studio detects an avatar character head and the appropriate facial animation data in the model.

## Resources

There are a variety of resources available for creators of all backgrounds to get started with custom meshes.

If you are interested in specific avatar creation topics, use the following table to find guides and resources that best match your needs:

<table>
<thead>
  <tr>
    <th>Topic</th>
    <th>Resources</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Reference files</td>
    <td>[Example models, project kits, and templates](../../art/modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical specs</td>
    <td>[.FBX export settings](../../art/modeling/export-requirements.md)<br /><br />[General mesh specifications](../../art/modeling/specifications.md)<br /><br />
    [Avatar specifications](../../art/characters/specifications.md)<br /><br />[Accessory specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Bodies and clothing creation</td>
    <td>[Accessories overview](../../art/accessories/index.md)<br /><br />[Bodies overview](../../art/characters/index.md)<br /><br />[Face accessory creation](../../art/characters/facial-animation/create-face-accessories.md)<br /><br />[Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md)<br /><br />[Accessory specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace requirements](../../marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texture specifications](../../art/modeling/texture-specifications.md)<br /><br />[PBR textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and skinning</td>
    <td>[Rigging and skinning overview](../../art/modeling/rigging.md)<br /><br />[Basic mesh rigging](../../art/modeling/rig-a-simple-mesh.md) <br /><br />[Facial bone rigging](../../art/characters/facial-animation/create-basic-heads.md#rigging)<br /><br />[Facial bone skinning](../../art/characters/facial-animation/create-basic-heads.md#skin-face-bones)<br /><br />[Avatar rigging requirements](../../art/characters/specifications.md#rigging)<br /><br />[Automatic skinning transfer](../../art/accessories/automatic-skinning-transfer.md)</td>
  </tr>

  <tr>
    <td>Facial animation and live heads</td>
    <td>[Basic head creation](../../art/characters/facial-animation/create-basic-heads.md)<br /><br />[Face accessory creation](../../art/characters/facial-animation/create-face-accessories.md)<br /><br />[FACS pose references](../../art/characters/facial-animation/facs-poses-reference.md)</td>
  </tr>
  <tr>
    <td>Testing and validation</td>
    <td>[Calisthenics Tool](../../art/modeling/calisthenics-tool.md)<br /><br />[Clothing Validation Tool](../../art/accessories/validation-tool.md)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Upload to Marketplace](../../marketplace/publish-to-marketplace.md)<br /><br />[Marketplace policy](../../marketplace/marketplace-policy.md)<br /><br />[Fees and commissions](../../marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>
