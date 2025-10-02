---
title: Makeup
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
hideBreadcrumbs: true
---

**Makeup** is a cosmetic look available for Roblox characters that allows additional expression, allowing you to add elements like eyeshadow, lipstick, scars, glitter, and blush. This feature uses a combination of specialized facial textures and optional eyebrow and eyelash mesh assets.

<Alert severity ='warning'>
Makeup is currently in beta and is not yet available for sale or implementation in-experience. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>

<center>
<figure>
<img src="../assets/makeup/Makeup-Full-Render.png" width="55%" />
<figcaption><center>A character model head, with a smokey eye effect, natural lipstick, and cheek and forehead adornments. <br />You can [download](https://github.com/Roblox/avatar/tree/main/Makeup) this template and a test place file.</center></figcaption>
</figure>
</center>

## Components of makeup

Makeup is made up of multiple textures baked into a `Class.Decal` that you can apply to a face of a character. There are three primary regions of the face (eyes, lips, face/cheeks) that you can apply textures to.

<GridContainer numColumns="3">
  <figure><img src="../assets/makeup/Makeup-Eye-Section.png" /><figcaption>Eye region</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Mouth-Section.png" /><figcaption>Lips region</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Face-Section.png" /><figcaption>Face/cheek region</figcaption></figure>
</GridContainer>

You can optionally include eyebrows and eyelashes with makeup. These are `Class.Model` containing `Class.MeshPart` objects with skinning and caging data.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Makeup-Eye-Acc.png" /><figcaption>Eyebrow and eyelash mesh objects</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Eye-Accessory-Datamodel.png" /><figcaption>Eyebrow and eyelash data model</figcaption></figure>
</GridContainer>

You can quickly apply any decals and optional models to characters in the test place by dropping those assets in the appropriate character's `Makeup` or `Accessories` folder.

<img src="../assets/makeup/Makeup-Character-Folders.png" width="55%" />

### Makeup template

The makeup template resource, available in the [Makeup Beta downloadable resource](https://github.com/Roblox/avatar/tree/main/Makeup) is a 3D model asset that allows creators to quickly import premade makeup assets into their own 3D modeling tools where you can modify, create, and preview your own makeup assets.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Makeup-Full-Render.png" /><figcaption>Reference template render</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Blender-Datamodel.png" /><figcaption>Reference template data model</figcaption></figure>
</GridContainer>

The makeup template includes the following:

- Target head mesh object and target head cage mesh object.
- Eye region mesh, fully linked to reference PBR textures
- Lip region mesh, fully linked to reference PBR textures
- Face region mesh, fully linked to reference PBR textures
- Eyebrows and eyelash mesh objects.

For a general workflow on authoring makeup using the template, see [the makeup creation process](#creation-process).

## Creation process

<Alert severity ='info'>
Makeup is currently in beta. Check out the DevForum announcement for the latest information on additional features, tools, and details regarding creating or implementing makeup.
</Alert>

<GridContainer numColumns="3">
  <figure><img src="../assets/makeup/Creation-Steps-1.png" /><figcaption>Download the 3D reference template head and texture templates applicable to your workflowe.</figcaption></figure>
  <figure><img src="../assets/makeup/Creation-Steps-2.png" /><figcaption>Modify the texture images in the tools of your choice.</figcaption></figure>
  <figure><img src="../assets/makeup/Creation-Steps-3.png" /><figcaption>In Blender/Maya, replace the textures in the template with your new textures and export. </figcaption></figure>
</GridContainer>

While you can easily swap decal images in Studio to make a quick change to a character's makeup, the following instructions is a best practice for implementing PBR-based textures into Roblox makeup at scale. This process requires:

- The [Makeup test place and template files](https://github.com/Roblox/avatar/tree/main/Makeup)
- A 3D modeling tool such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview)
- Any PBR texturing software, such as [Substance Painter](https://www.adobe.com/products/substance3d/apps/painter.html), [Materialize](http://boundingboxsoftware.com/materialize/index.php), or plugins like [Ucupaint](https://extensions.blender.org/add-ons/ucupaint/) (Blender).

<Alert severity ='warning'>
This process assumes a proficiency in 3D modeling software such as Blender or Maya and understand how to update, replace, export, save, and alter materials within your modeling tool and any additional texturing software or plugins.

As always with 3D art and creation workflows, there are many ways to achieve a specific goal and that is no different for makeup and your own PBR publishing flow.
</Alert>

1. Download a [reference template head](https://github.com/Roblox/avatar/tree/main/Makeup) and open it in the general modeling software of your choice.
   1. You can choose between a **reference mesh** and **reference cage** templates. The authoring flow is the same between these two, but **reference mesh** may be easier for artists to visualize the applicable region of the makeup texture.
2. Depending on your change, modify the textures associated with the different regions: `TransferTexture_Eyes`, `TransferTexture_Face`, or `TransferTexture_Lips`
   1. If you are authoring textures in a third-party texturing tool, you may need to export your mesh objects to import into your own tool.
3. When you've created your new texture images, update the existing file textures in the template to point to your newly created textures.
   1. Blender: Save any new textures files to your project using  **File** > **External Data** > **Pack Resources** before exporting or sharing your `.blend`.
4. Export the entire template file as a `.fbx`or `.gltf`. See [Export specifications](../art/modeling/export-requirements.md) for additional export instructions from Maya or Blender.
5. In the test place, [import](./import.md) the template file into Studio. Studio should automatically detect your mesh object names and associated textures and generate `Decal` objects. For more details, see [import into Studio](./import.md).
6. Apply any makeup decals or eyebrow and eyelash accessories to characters in the test place by dropping makeup assets in the appropriate character's `Makeup` or `Accessories` folder.
7. Press Play, and navigate to the character with new makeup assets to preview.
