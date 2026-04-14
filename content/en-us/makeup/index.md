---
title: Makeup
description: Makeup is a cosmetic look made up of multiple facial textures and optional eyebrow and eyelashes.
---

**Makeup** is a cosmetic item that you can apply to a face of an avatar or non-playable character for additional creative expression, such as traditional makeup art (e.g., eyeshadow, lipstick, and blush), face paint, battle markings, and camouflage.

Makeup is made up of multiple specialized texture layers baked into a `Class.Decal` object, and each texture layer contains a unique makeup component like the lips or eyes region. Players can purchase makeup as a set on the [Marketplace](https://www.roblox.com/catalog) and apply it as a complete cohesive look, or swap out individual makeup components for others that match their own avatar's style.

<center>
<figure>
<img src="../assets/makeup/MakeupIntro-FullFace.png" width="24%" />
<figcaption>Complete look</figcaption>
</figure>
</center>

<GridContainer numColumns="3">
<center>
<figure>
<img src="../assets/makeup/MakeupIntro-Eyes.png" width="80%"/>
<figcaption>Eyes texture layer</figcaption>
</figure>
</center>
<center>
<figure>
<img src="../assets/makeup/MakeupIntro-Lips.png" width="80%"/>
<figcaption>Lip texture layer</figcaption>
</figure>
</center>
<center>
<figure>
<img src="../assets/makeup/MakeupIntro-Face.png" width="80%"/>
<figcaption>Face texture layer</figcaption>
</figure>
</center>
</GridContainer>

This guide provides several [makeup templates](#resources) that you can use within your creation process, such as:

- Template textures that you can use in 2D editing software to author makeup.
- Template heads that you can use to view and test your makeup before export.
- Reference experience you can use to import and test your makeup assets on characters with different skin tones and body types.

You can either use these templates as a pure reference to see how everything works, or you can use all of them at each step of the suggested creation process.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Makeup-Full-Render.png" width="93%" /><figcaption>Reference template render</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Blender-Datamodel.png" width="90%" /><figcaption>Reference template data model</figcaption></figure>
</GridContainer>

## Makeup components

You can apply textures to three primary regions of the face: the eyes region, lips region, and face region. Each region has overlapping surfaces with other regions to allow for seamless, continuous looks between makeup components.

<GridContainer numColumns="3">
  <figure><img src="../assets/makeup/Makeup-Eye-Region.png" /><figcaption>Eyes region</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Lips-Region.png" /><figcaption>Lips region</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Face-Region.png" /><figcaption>Face region</figcaption></figure>
</GridContainer>

In addition, you can include eyebrows and eyelashes with your makeup creations. Eyebrows and eyelashes are `Class.Model` objects that contain `Class.MeshPart` objects with skinning and caging data. This allows them to animate properly as the character's face changes expressions.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Makeup-Eye-Acc.png" /><figcaption>Eyebrow and eyelash mesh objects</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Eye-Accessory-Datamodel.png" /><figcaption>Eyebrow and eyelash data model</figcaption></figure>
</GridContainer>

When you import your makeup creation from your favorite third-party modeling software into the [reference experience](#reference-experience), Studio automatically detects mesh names, then generates the necessary `Class.Decal` objects under the imported model. You can then quickly apply your makeup `Class.Decal` objects and accessories by dragging them from the imported reference head into a character's **Makeup** or **Accessories** folder.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/Imported-DataModel.png" width="76%" /><figcaption>The imported model contains your makeup decals and face accessories</figcaption></figure>
  <figure><img src="../assets/makeup/Makeup-Character-Folders.png" /><figcaption>Your makeup displays at runtime when you drag your makeup assets into the correct folders</figcaption></figure>
</GridContainer>

<Alert severity = 'info'>
Makeup assets that you create for the [Marketplace](https://www.roblox.com/catalog) can include up to 6 total `Class.Decal` objects, comprised of any combination of regions.
</Alert>

## Creation process

<Alert severity ='warning'>
This process assumes that you are proficient in 3D modeling software, such as Blender or Maya, and that you understand how to update, replace, export, save, and alter materials within your modeling tool and any additional texturing software or plugins.
</Alert>

<GridContainer numColumns="3">
  <figure><img src="../assets/makeup/Creation-Steps-1.png" /><figcaption>Download the 3D reference template head and texture templates applicable to your workflow.</figcaption></figure>
  <figure><img src="../assets/makeup/Creation-Steps-2.png" /><figcaption>Modify the texture images in the tools of your choice.</figcaption></figure>
  <figure><img src="../assets/makeup/Creation-Steps-3.png" /><figcaption>In Blender or Maya, replace the textures in the template with your new textures and export. </figcaption></figure>
</GridContainer>

While you can easily swap `Class.Decal` objects in Studio to make a quick change to a character's makeup, the following instruction is best practice for implementing PBR-based textures into Roblox makeup at scale. This process requires:

- The [Makeup test place and template files](#resources)
- A 3D modeling tool such as [Blender](https://www.blender.org) or [Maya](https://www.autodesk.com/products/maya/overview)
- Any PBR texturing software, such as [Substance Painter](https://www.adobe.com/products/substance3d/apps/painter.html), [Materialize](http://boundingboxsoftware.com/materialize/index.php), or plugins like [Ucupaint](https://extensions.blender.org/add-ons/ucupaint/) (Blender).

As always with 3D art and creation workflows, there are many ways to achieve a specific goal, and the makeup and PBR publishing flow is no exception. It's recommended to try the workflow in this guide first, then adjust as necessary for your own creation requirements:

1. Download a [reference template head](#resources) and open it in the general modeling software of your choice.
2. Using your texturing tools or an image editing software, modify the texture images associated with the different regions: `TransferTexture_Eyes`, `TransferTexture_Face`, or `TransferTexture_Lips`.
3. When you've created your new texture images, use Blender or Maya to reassign the existing file textures in the template. For more information, see [Reassign textures](./reassign-textures.md).
4. Review [Face caging best practices](../art/characters/face-caging-best-practices.md) for guidance on how to adjust face cages so that your makeup displays correctly for your use case.
5. Export the entire template file as a `.fbx`or `.gltf`. All 3D modeling [export requirements](../art/modeling/export-requirements.md) apply, but there are a few makeup-specific settings you must configure:

   - If you are using Blender,
     1. In the export file brower window, navigate to the **Include** section, then enable the **Custom Properties** toggle for makeup UV data transfer data purposes.
     1. In the **Armature** section, enable **Only Deform Bones** to ensure your export file includes skinning data for eyebrows and eyelashes.

       <figure><img src="../assets/makeup/Blender-MakeupExport.png" /><figcaption>All necessary Blender export settings for makeup</figcaption></figure>

   - If you are using Maya, in the export file brower window, navigate to the **Deformed Models** section, then enable the **Skins** toggle to ensure your export file includes skinning data for eyebrows and eyelashes.

       <img src="../assets/makeup/Maya-MakeupExport.png" />  

6. [Import](./import.md) the template file into Studio. Studio automatically detects your mesh object names and associated textures and generate `Decal` objects.

   <img src="../assets/makeup/Imported-DataModel.png" width="30%" />
  
7. Apply any makeup decals or eyebrow and eyelash accessories to characters in the test place by dropping makeup assets in the appropriate character's `Makeup` or `Accessories` folder.

   <img src="../assets/makeup/Makeup-Character-Folders.png" width="35%" />

8. Click the **Play** button, then navigate to the character with new makeup assets to preview.

## Resources

The following are downloadable resources you can use within the creation process:

- See [Template textures](#template-textures) for image and project files you can use in 2D editing software like GIMP or Photoshop.
- See [Template heads](#template-heads) for required 3D models you can use to view and test your makeup assets.
- See [Reference experience](#reference-experience) to import and test your makeup assets into Studio

<Alert severity = 'info'>
For resources that include two templates, in almost every case **it's recommended to use the mesh template** to create makeup because:

- It's easier and more intuitive to use because it mimics applying makeup in the real world.
- It contains a higher fidelity mesh and UVs with minimal distortion.

Some creators prefer using the cage template because there is only one transfer when projecting the texture, while there are two transfers before projecting the texture for the mesh template. This can result in makeup transferring more accurately with less artifacts.
</Alert>

<Alert severity = 'warning'>
Be sure to review your options **before** starting to create makeup because you cannot start with one template, then transfer your makeup to the other.
</Alert>

### Template textures

When you are finished making changes to any of the following template texture images:

1. Export your new textures.

   <BaseAccordion>
   <AccordionSummary>
   <Typography variant="label1">Exporting from Photoshop</Typography>
   </AccordionSummary>
   <AccordionDetails>
   <iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/0se12PNhVCI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br /><br />

   <Alert severity = 'info'>
   The video presenter uses **File** > **Export** > **Layers to Files** to export each layer as its own `.png` file.
   </Alert>

   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary>
   <Typography variant="label1">Exporting from Substance Painter</Typography>
   </AccordionSummary>
   <AccordionDetails>
   <iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/g79GBh0AcXA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary>
   <Typography variant="label1">Exporting from Procreate</Typography>
   </AccordionSummary>
   <AccordionDetails>

   To export textures from Procreate:

     1. Navigate to the **Layers** pane, then hide everything but your first makeup component layer, such as your eyes, lips, or face layer.

        <img src="../assets/makeup/Procreate-ActiveLayer.jpg" width="50%" />

     1. With your makeup component layer active, navigate to the **Actions** menu > **Share** tab > **Share Textures - PNG** to save all of your makeup component's textures to a location on your device.

        <img src="../assets/makeup/Procreate-ShareTextures.jpg" width="50%" />
        <img src="../assets/makeup/Procreate-AllTextures.jpg" width="50%" />

     1. Delete all of the head, eyebrows, and eyelash textures.
        1. Open the location where you saved all of your makeup component's textures.
        1. Delete everything except for the following PBR textures:
           - `TransferTarget_FullHead_Mat-Color`
           - `TransferTarget_FullHead_Mat-Metallic`
           - `TransferTarget_FullHead_Mat-Roughness`
     1. Replace your makeup component's `TransferTarget_FullHead_Mat-Color` layer with a version that will export transparency in the output texture.
        1. Copy your active makeup component layer.
        1. Navigate to the **Gallery** > **Plus** icon > **Clipboard**. A new Procreate file displays with your makeup component layer.

           <img src="../assets/makeup/Procreate-Clipboard.png" width="50%" />

        1. In the **Layers** pane, disable the **Background color** layer. Your makeup component displays without a background.

           <img src="../assets/makeup/Procreate-HideBackground.png" width="50%" />

        1. With your makeup component layer active, navigate to the **Actions** menu > **Share** tab > **Share Image - PNG**.
        1. In the file browser, navigate to the location on your device with all of your makeup component's textures, then save/override the `TransferTarget_FullHead_Mat-Color` texture.
     1. Rename your makeup component's PBR textures appropriately so that you can easily reference each makeup component's PBR data when you reassign your textures in Blender or Maya. For example, if you are exporting texture maps for lips:
        - `Lips-Color`
        - `Lips-Metallic`
        - `Lips-Roughness`
     1. Repeat this process for every makeup component you want to import for your makeup look.

        <img src="../assets/makeup/Procreate-Final.png" width="35%" />

   </AccordionDetails>
   </BaseAccordion>

2. [Reassign the preset textures](./reassign-textures.md) in a [template head](#template-heads) with your new textures.
3. [Import the reference head](./import.md) with your new textures into Studio.

<Grid container alignItems="stretch" style={{}}>
  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
        <center>Photoshop / GIMP texture images</center>
        <figure>
          <center>
            <img src="../assets/makeup/resources/Photoshop-Thumbnail.png" width="100%" />
          </center>
          <center>
            <img src="../assets/makeup/resources/Photoshop-Thumbnail-Cage.png" width="100%" />
          </center>
        </figure>
        <figure>
          A comprehensive `.zip` folder with texture images for use in Photoshop or your preferred image editor.
        </figure>
      </CardContent>
      <CardActions style={{bottom: 0, width: '100%'}}>
      <Button href="../assets/makeup/resources/Makeup-Textures-Photoshop-Gimp-Mesh.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Mesh Template</Button>
      </CardActions>
      <CardActions style={{bottom: 0, width: '100%'}}>
      <Button href="../assets/makeup/resources/Makeup-Textures-Photoshop-Gimp-Cage.zip" fullWidth size='small' color='secondary' variant='contained' style={{marginBottom:"4px;"}}>Cage Template</Button>
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
          <center>
            <img src="../assets/makeup/resources/Substance-Thumbnail-Cage.png" width="100%" />
          </center>
        </figure>
        <figure>
          A comprehensive `.zip` folder with texture files for use in Substance Painter, an industry-standard PBR authoring software.
        </figure>
      </CardContent>
      <CardActions style={{bottom: 0, width: '100%'}}>
      <Button href="../assets/makeup/resources/Makeup-Textures-SubstancePainter-Mesh.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Mesh Template</Button>
      </CardActions>
      <CardActions style={{bottom: 0, width: '100%'}}>
      <Button href="../assets/makeup/resources/Makeup-Textures-SubstancePainter-Cage.zip" fullWidth size='small' color='secondary' variant='contained' style={{marginBottom:"4px;"}}>Cage Template</Button>
      </CardActions>
    </Card>
  </Grid>

  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
        <center>Procreate texture images</center>
        <figure>
          <center>
            <img src="../assets/makeup/resources/Procreate-Thumbnail.png" width="100%" />
          </center>
          <center>
            <img src="../assets/makeup/resources/Procreate-Thumbnail-Cage.png" width="100%" />
          </center>
        </figure>
        <figure>
          A comprehensive `.zip` folder with texture images for use in Procreate.
        </figure>
      </CardContent>
      <CardActions style={{bottom: 0, width: '100%'}}>
      <Button href="../assets/makeup/resources/Makeup-Textures-Procreate-Mesh.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Mesh Template</Button>
      </CardActions>
      <CardActions style={{bottom: 0, width: '100%'}}>
      <Button href="../assets/makeup/resources/Makeup-Textures-Procreate-Cage.zip" fullWidth size='small' color='secondary' variant='contained' style={{marginBottom:"4px;"}}>Cage Template</Button>
      </CardActions>
    </Card>
  </Grid>
</Grid>

### Template heads

Each template head includes:

- Target head mesh object or head cage mesh object
- Eye, lip, and multiple face region mesh objects, fully linked to reference PBR textures
- Eyebrows and eyelash mesh objects

<Alert severity = 'info'>
The Blender and Maya templates also include a facial region reference `.png` file that you can use to reference how your makeup assets fit into the eye, lips, and face/cheek regions.
</Alert>

<Grid container alignItems="stretch" style={{}}>
  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
<center>Blender template reference files</center>
<figure>
<center> <img src="../assets/makeup/resources/Blender-Thumbnail.png" width="100%" /> </center>
<center> <img src="../assets/makeup/resources/Blender-Thumbnail-Cage.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of Blender assets, including multiple reference heads pre-configured for testing in the Makeup test place or for authoring your own makeup.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Blender-Mesh.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Mesh Template</Button>
</CardActions>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Blender-Cage.zip" fullWidth size='small' color='secondary' variant='contained' style={{marginBottom:"4px;"}}>Cage Template</Button>
</CardActions>

</Card>
</Grid>

  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>

<center>Maya template reference files</center>
<figure>
<center> <img src="../assets/makeup/resources/Maya-Thumbnail.png" width="100%" /> </center>
<center> <img src="../assets/makeup/resources/Maya-Thumbnail-Cage.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of Maya assets, including multiple reference heads pre-configured for testing in the Makeup test place or for authoring your own makeup.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Maya-Mesh.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Mesh Template</Button>
</CardActions>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-Maya-Cage.zip" fullWidth size='small' color='secondary' variant='contained' style={{marginBottom:"4px;"}}>Cage Template</Button>
</CardActions>

</Card>
</Grid>

  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>

<center>FBX / GLTF template reference files</center>
<figure>
<center> <img src="../assets/makeup/resources/Fbx-Thumbnail.png" width="100%" /> </center>
<center> <img src="../assets/makeup/resources/Fbx-Thumbnail-Cage.png" width="100%" /> </center>
</figure>
<figure>
A comprehensive `.zip` folder of `.fbx` and `.gltf` assets, including heads with various example makeup looks that are ready to be implemented into Studio for testing purposes.
</figure>
</CardContent>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-FBX-GLTF-Mesh.zip" fullWidth size='large' color='primary' variant='contained' style={{marginBottom:"4px;"}}>Mesh Template</Button>
</CardActions>

<CardActions style={{bottom: 0, width: '100%'}}>
<Button href="../assets/makeup/resources/Makeup-Reference-FBX-GLTF-Cage.zip" fullWidth size='small' color='secondary' variant='contained' style={{marginBottom:"4px;"}}>Cage Template</Button>
</CardActions>

</Card>
</Grid>

</Grid>

### Reference experience

<Grid container alignItems="stretch" style={{}}>
  <Grid item xs={12} md={6} lg={4} style={{ padding: 6, display: 'flex' }}>
    <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flexGrow: 1 }}>
        <center>Reference place file (download)</center>
        <figure>
          <center>
            <img src="../assets/makeup/Makeup-Experience-Thumbnail.png" width="100%" />
          </center>
        </figure>
        <figure>
          At this time, you can only test makeup on the downloadable placefile.
          <br />
          In Github, select the download icon on the right-side to download the <code>MakeupBeta.zip</code> file.
        </figure>
      </CardContent>
      <CardActions style={{ width: '100%' }}>
        <Button
          href="https://github.com/Roblox/avatar/blob/main/Makeup/MakeupBeta.zip"
          fullWidth
          size="large"
          color="primary"
          variant="contained"
          style={{ marginBottom: '4px' }}
        >
          Github link
        </Button>
      </CardActions>
    </Card>
  </Grid>

</Grid>
