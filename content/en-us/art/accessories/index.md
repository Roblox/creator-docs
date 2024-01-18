---
title: Accessories
description: Accessories are objects like clothing or props that Roblox avatars can equip.
hideBreadcrumbs: true
---

<img src="../../assets/avatar/character-customization/Avatar-Banner.jpg" />

Accessories are cosmetic items that users can equip and wear on their avatar character, such as clothes, weapons, and props. Roblox users can obtain accessories and other cosmetic items from the [Marketplace](https://www.roblox.com/catalog). When joining most experiences, equipped cosmetic items load with the user's avatar character, allowing you to express yourself with a unique appearance wherever you go.

Roblox also supports [classic clothing](#classic-clothing), 2D images that can be applied to your character's surface.

## 3D Accessories

3D accessories are either layerable or rigid cosmetics that avatar characters can wear. Layerable accessories, or **layered clothing**, are accessories that stretch and fit over any body shape. **Rigid accessories** are accessories that attach to a specific location on an avatar and do not deform or stretch. In experiences, Roblox renders all 3D accessories as `Class.Accessory` objects that you can equip using [character customization](../../characters/appearance.md#humanoiddescription).

Custom accessories are first created in 3D modeling programs, such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview), before importing into Studio. To create a custom Roblox accessory for your own experience or to sell on the Marketplace, it's important to start with the following:

- A basic background with 3D modeling tools such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview).
- An understanding of the [components that make up an accessory](#components-of-an-accessory).
- An understanding of the general [accessory creation process](#creation-process).
- Review Roblox's official tutorials to create your own accessories:
  - [Rigid accessory creation tutorial](../../art/accessories/creating-rigid/index.md) - covers each process required for converting a 3D model to a rigid accessory and publishing it to the Marketplace.
  - [Clothing creation tutorial](../../art/accessories/creating/index.md) - a step-by-step process of creating your own avatar-ready clothing from scratch in Blender.
- [Additional tools, resources, and guides](#resources) provided by Roblox to standardize and expedite the creation process.

### Components of an Accessory

All accessory models are made up of the same base components of a [mesh object](#mesh-part), [textures](#textures), and [attachment](#attachments). Additional components are required if your accessory has layerable properties, such as clothing items like t-shirts, jackets, and pants.

When creating accessories, all of the components are created first in your modeling software, then converted to their appropriate Roblox Studio instance on import.

#### Mesh Part

<GridContainer numColumns="2">

<figure><img src="../../assets/art/accessories/Mesh-Example.png"/>  <figcaption>T-shirt clothing mesh object</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Mesh-Bow-Example.png" /><figcaption>Bow accessory mesh object</figcaption></figure>
</GridContainer>

All accessories require a single mesh object that represents the geometry of the accessory object. In Studio, this mesh object is represented as a `Class.MeshPart` nested under a single `Class.Model`

#### Textures

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Texture-Example.png" />  <figcaption>2D texture map for the t-shirt model</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Texture-Applied-Example.png" /><figcaption>T-shirt model with texture applied</figcaption></figure>
</GridContainer>

Textures are image files that define the surface appearance of your accessory. You can create textures within a texture painting program or a 3D modeling software. In Studio, textures images are imported as image assets and are set to `Class.MeshPart` objects by a child `Class.SurfaceAppearance` object or a `Class.MeshPart.TextureID` property.

#### Attachments

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Attachment-Example.png" />  <figcaption>Attachment geometry defines where the attachment connects with the character</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Attachment-Data-Model-Example.png" width="80%"/><figcaption>Geometry with the "_Att" suffix automatically convert to `Class.Attachment` objects in Studio</figcaption></figure>
</GridContainer>

Attachment points define where accessories attach to a character's body. For layered accessories, the attachment point is used to associate with the correct body part, in cases like dismemberment. In Studio, attachments are represented by `Class.Attachment` objects.

#### Layered Components

When creating clothing or other accessories that need to wrap or deform around characters and existing layered assets, additional [rigging](#rigging-armature) and [caging](#inner-and-outer-cages) components are required to create the layered effect.

##### Rigging Armature

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Rigging-Example.png" />  <figcaption>To ensure natural movement of the clothing item, it must be weighted to a character rig</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Rigging-Pose-Example.png" /><figcaption>When the rig is properly set up, the layered model can move and bend with the character rig</figcaption></figure>
</GridContainer>

A rigging armature defines how a layered asset can move with a character model. Using rigging and skinning techniques, you can set the areas of your clothes to move naturally with a character model's joints, such as ensuring a shirt sleeve correctly follows the movement of the elbow and shoulder. In Studio, this rigging and skinning data is saved to the mesh geometry.

##### Inner and Outer Cages

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/accessories/Inner-Cage-Example.png" />  <figcaption>The inner cage defines the inner surface of the clothing item where the clothes wrap over</figcaption></figure>

  <figure><img src="../../assets/art/accessories/Outer-Cage-Example.png" /><figcaption>The outer cage defines the outer surface of the clothing item where any additional clothes can wrap and layer over</figcaption></figure>
</GridContainer>

Cage meshes indicate the inner and outer surfaces of a layered accessory. The inside cage of a t-shirt defines how the t-shirt stretches and fits over a character body. The outer cage of a t-shirt defines how additional layered accessories fit over the t-shirt. In Studio, these cages are represented by `Class.WrapLayer` objects.

### Creation Process

When designing an accessory model, you must export all of the components as a single .fbx for import into Studio.

Since 3D creation isn't a linear process and always requires reiteration and testing, the process of creating an accessory can differ between individuals and various creation workflows.

Roblox provides various resources to aid in the accessory creation process, including modeling and caging kits, reference files, validation tools, and more. Using these resources can save a lot of creation time and help creators skip complex and time-consuming processes like rigging, skinning, and testing.

Depending on the type of asset you are creating, the creation process follows these high-level workflows:

<GridContainer numColumns="2">

  <figure>  <figcaption><center>Rigid Accessory Workflow</center></figcaption><img src="../../assets/art/accessories/Workflow-Rigid.png" />  </figure>

  <figure><figcaption><center>Layered Accessory Workflow</center></figcaption><img src="../../assets/art/accessories/Workflow-Layered.png" /></figure>
</GridContainer>

### Resources

There are a variety of resources available for creators of all backgrounds to get started with accessory creation.

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
    <td>Tutorials</td>
    <td>[Rigid Accessory Creation](../../art/accessories/creating-rigid/index.md) <br /><br />[Basic Clothing Creation](../../art/accessories/creating/index.md)</td>
  </tr>
  <tr>
    <td>Reference Files</td>
    <td>[Accessory and Clothing Reference Files](../../art/modeling/project-files.md)</td>
  </tr>
  <tr>
    <td>Technical Specs</td>
    <td>[.FBX Export Settings](../../art/modeling/export-requirements.md)<br /><br />[General Mesh Specifications](../../art/modeling/specifications.md)<br /><br />[Accessory Specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace Policy](../../art/marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Cosmetic Creation</td>
    <td>[Accessories Overview](../../art/accessories/specifications.md)<br /><br />[Layered Clothing Overview](../../art/accessories/index.md)<br /><br />[Creating Face Accessories](../../art/characters/facial-animation/creating-face-accessories.md)<br /><br />[Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md)<br /><br />[Accessory Specifications](../../art/accessories/specifications.md)<br /><br />[Marketplace Requirements](../../art/marketplace/marketplace-policy.md)</td>
  </tr>
  <tr>
    <td>Texturing</td>
    <td>[Texturing Requirements](../../art/modeling/texture-specifications.md)<br /><br />[PBR Textures](../../art/modeling/surface-appearance.md)</td>
  </tr>
  <tr>
    <td>Rigging and Skinning</td>
    <td>[Rigging and Skinning Overview](../../art/modeling/rigging.md)<br /><br />[Humanoid Rig Requirements](../../art/characters/specifications.md#rigging)<br /><br />[Rigging Facial Bones](../../art/characters/facial-animation/creating-basic-heads.md#rigging)<br /><br />[Auto Skin Transfer](../../art/accessories/automatic-skinning-transfer.md)<br /><br />[Skinning Facial Bones](../../art/characters/facial-animation/creating-basic-heads.md#skinning-face-bones)</td>
  </tr>
  <tr>
    <td>Testing and Validation</td>
    <td>[Calisthenics Tool](../../art/modeling/calisthenics-tool.md)<br /><br />[Clothing Validation Tool](../../art/accessories/validation-tool.md)</td>
  </tr>
  <tr>
    <td>Publishing and Marketplace</td>
    <td>[Uploading to Marketplace](../../art/marketplace/publishing-to-marketplace.md)<br /><br />[Marketplace Policy](../../art/marketplace/marketplace-policy.md)<br /><br />[Fees and Commissions](../../art/marketplace/marketplace-fees-and-commissions.md)</td>
  </tr>
</tbody>
</table>

## Classic Clothing

Classic clothing assets are 2D images that you can apply to the surface of an avatar body as t-shirts, shirts, or pants. You can design these assets in any image processing software, test the textures in Studio, and then upload the designs to the Marketplace to sell. See [Classic Clothing](../../art/accessories/classic-clothing.md) for more information on creating, uploading, and selling these assets.

<img src="../../assets/accessories/classic-clothing/Dummy-Clothed.jpg" width="80%" />
