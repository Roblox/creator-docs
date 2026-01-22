---
title: Makeup
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
---

<Alert severity ='warning'>
This feature is currently in beta. Enable it through **File** ⟩ **Beta Features** ⟩ **Avatar Makeup**. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>
**Makeup** is a cosmetic look available for Roblox characters that allows additional expression, allowing you to add elements like eyeshadow, lipstick, scars, glitter, and blush. This feature uses a combination of specialized facial textures and optional eyebrow and eyelash mesh assets.

<center>
<figure>
<img src="../assets/makeup/Makeup-Full-Render.png" width="55%" />
<figcaption><center>A character model head, with a smokey eye effect, natural lipstick, and cheek and forehead adornments. <br />You can [download](#resources) this template and a test place file.</center></figcaption>
</figure>
</center>

## Components of makeup

Makeup is made up of multiple textures baked into a `Class.Decal` that you can apply to a face of a character. There are three primary regions of the face (eyes, lips, face/cheeks) that you can apply textures to. Each region has some overlapping surfaces with other regions.

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

You can quickly apply any makeup `Decal` objects and accessories by dragging them from the imported reference head into the appropriate character's `Makeup` or `Accessories` folder.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Imported-DataModel.png" /><figcaption>On import, the decals are automatically generated within the **imported model**.</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Character-Folders.png" /><figcaption>In the demo place, move the generated decals into the character's **Makeup folder** to apply makeup.</figcaption></figure>
</GridContainer>

<Alert severity = 'warning'>
Makeup assets intended for the Marketplace can include up to 6 total decals, comprised of any combination of regions.
</Alert>

### Makeup template

The makeup template resource, available in the [Makeup Beta downloadable resource](#resources) is a 3D model asset that allows creators to quickly import premade makeup assets into their own 3D modeling tools where you can modify, create, and preview your own makeup assets.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Makeup-Full-Render.png" /><figcaption>Reference template render</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Blender-Datamodel.png" /><figcaption>Reference template data model</figcaption></figure>
</GridContainer>

The makeup template includes the following:

- Target head mesh object and target head cage mesh object.
- Eye region mesh, fully linked to reference PBR textures
- Lip region mesh, fully linked to reference PBR textures
- Multiple face region mesh objects, fully linked to reference PBR textures
- Eyebrows and eyelash mesh objects.

For a general workflow on authoring makeup using the template, see [the makeup creation process](#creation-process).

## Creation process

<Alert severity ='info'>
Makeup is currently in beta. Check out the DevForum announcement for the latest information on additional features, tools, and details regarding creating or implementing makeup.
</Alert>

<GridContainer numColumns="3">
  <figure><img src="../assets/makeup/Creation-Steps-1.png" /><figcaption>Download the 3D reference template head and texture templates applicable to your workflow.</figcaption></figure>
  <figure><img src="../assets/makeup/Creation-Steps-2.png" /><figcaption>Modify the texture images in the tools of your choice.</figcaption></figure>
  <figure><img src="../assets/makeup/Creation-Steps-3.png" /><figcaption>In Blender/Maya, replace the textures in the template with your new textures and export. </figcaption></figure>
</GridContainer>

While you can easily swap decal images in Studio to make a quick change to a character's makeup, the following instructions is a best practice for implementing PBR-based textures into Roblox makeup at scale. This process requires:

- The [Makeup test place and template files](#resources)
- A 3D modeling tool such as [Blender](https://www.blender.org/) or [Maya](https://www.autodesk.com/products/maya/overview)
- Any PBR texturing software, such as [Substance Painter](https://www.adobe.com/products/substance3d/apps/painter.html), [Materialize](http://boundingboxsoftware.com/materialize/index.php), or plugins like [Ucupaint](https://extensions.blender.org/add-ons/ucupaint/) (Blender).

<Alert severity ='warning'>
This process assumes a proficiency in 3D modeling software such as Blender or Maya and understand how to update, replace, export, save, and alter materials within your modeling tool and any additional texturing software or plugins.

As always with 3D art and creation workflows, there are many ways to achieve a specific goal and that is no different for makeup and your own PBR publishing flow.
</Alert>

1. Download a [reference template head](#resources) and open it in the general modeling software of your choice.
   1. You can choose between a **reference mesh** and **reference cage** templates. The authoring flow is the same between these two, but **reference mesh** may be easier for artists to visualize the applicable region of the makeup texture.
2. Using your texturing tools or an image editing software, modify the texture images associated with the different regions: `TransferTexture_Eyes`, `TransferTexture_Face`, or `TransferTexture_Lips`.
3. When you've created your new texture images, use Blender or Maya to replace the existing file textures in the template.
4. Export the entire template file as a `.fbx`or `.gltf`. See [Export specifications](../art/modeling/export-requirements.md) for additional export instructions from Maya or Blender.
5. [Import](./import.md) the template file into Studio. Studio should automatically detect your mesh object names and associated textures and generate `Decal` objects.

   <img src="../assets/makeup/Imported-DataModel.png" />
  
6. Apply any makeup decals or eyebrow and eyelash accessories to characters in the test place by dropping makeup assets in the appropriate character's `Makeup` or `Accessories` folder.

   <img src="../assets/makeup/Makeup-Character-Folders.png" />

7. Press Play, and navigate to the character with new makeup assets to preview.

## Resources

The following are downloadable resources. See [Template heads](#template-heads) for required 3D models to import makeup assets with. See [Template textures](#template-textures) for additional image and project files available for your convenience and refernece.

### Template heads

<Grid container alignItems="stretch" style={{}}>
  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
<center>Blender template reference files</center>
<figure>
<center> <img src="../assets/makeup/resources/Blender-Thumbnail.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of Blender assets, including multiple reference heads pre-configured for testing in the Makeup test place or for authoring your own makeup. <br /><br />Includes both Cage and Reference Mesh Head templates.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Blender.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>

<center>Maya template reference files</center>
<figure>
<center> <img src="../assets/makeup/resources/Maya-Thumbnail.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of Maya assets, including multiple reference heads pre-configured for testing in the Makeup test place or for authoring your own makeup. <br /><br />Includes both Cage and Reference Mesh Head templates.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Maya.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>

<center>FBX / GLTF template reference files</center>
<figure>
<center> <img src="../assets/makeup/resources/Fbx-Thumbnail.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of `.fbx` and `.gltf` assets, including multiple reference heads pre-configured for testing in the Makeup test place or for authoring your own makeup. <br /><br />Includes both Cage and Reference Mesh Head templates.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Fbx-Gltf.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Download</Button>
</CardActions>

</Card>
</Grid>

</Grid>

### Template textures

<Grid container alignItems="stretch" style={{}}>
  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
        <center>Photoshop / GIMP texture images</center>
        <figure>
          <center>
            <img src="../assets/makeup/resources/Photoshop-Thumbnail.png" width="100%" />
          </center>
        </figure>
        <figure>
          A comprehensive `.zip` folder texture images for use in Photoshop or your preferred image editor.
          <br />
          When you are finished making changes to these texture images, swap out the textures in the template head using Blender/Maya and import the reference head with new textures into Studio.
        </figure>
      </CardContent>
      <CardActions style={{ width: '100%' }}>
        <Button
          href="../assets/makeup/resources/Makeup-Textures-Photoshop_Gimp.zip"
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          style={{ marginBottom: '4px' }}
        >
          Download
        </Button>
      </CardActions>
    </Card>
  </Grid>

  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
        <center>Substance Painter files</center>
        <figure>
          <center>
            <img src="../assets/makeup/resources/Substance-Thumbnail.png" width="100%" />
          </center>
        </figure>
        <figure>
          A comprehensive `.zip` folder texture files for use in Substance Painter, an industry-standard PBR authoring software.
          <br />
          When you are finished making changes to these texture images, swap out the textures in the template head using Blender/Maya and import the reference head with new textures into Studio.
        </figure>
      </CardContent>
      <CardActions style={{ width: '100%' }}>
        <Button
          href="../assets/makeup/resources/Makeup-Textures-SubstancePainter.zip"
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          style={{ marginBottom: '4px' }}
        >
          Download
        </Button>
      </CardActions>
    </Card>
  </Grid>
</Grid>
