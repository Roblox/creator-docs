---
title: Avatar Project Files and References
description: Download various character-related project files and reference files.
---

<Alert severity = 'info'>
See [Resources](../../avatar/resources.md) for a complete list of avatar-related downloadable content.
</Alert>

## Project Files

The following `.fbx`, `.blend`, and `.ma` project files are available to use as examples, boilerplate, or reference:

<Tabs>
  <TabItem label="Models">
  <table>
<thead>
  <tr>
    <th>Filename</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/skinned-meshes/Lola.fbx" download>Lola.fbx</a></td>
    <td>A skinned R15 character created from the <a href="../../art/modeling/skinning-a-humanoid-model.md">Skinning a Humanoid Model</a> guide. Since this reference model doesn't yet have [inner and outer cage mesh data](../../art/characters/specifications.md#inner-and-outer-cages), this model can't equip layered clothing or accessories.</td>
  </tr>
  <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/Fish-Person.zip" download>Fish-Person.zip</a></td>
    <td>A rigged and skinned humanoid character model with a full body cage, facial animation rig, and associated PBR texture maps.</td>
  </tr>
    <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/BlockyCharacter.fbx" download>Blocky.fbx</a></td>
    <td>A Blocky character model with an [animatable head](../../art/characters/facial-animation/index.md) and a full body cage.</td>
  </tr>
    <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/GoblinCharacter.fbx" download>Goblin.fbx</a></td>
    <td>A Goblin character model with an [animatable head](../../art/characters/facial-animation/index.md) and a full body cage.</td>
  </tr>
    <tr>
    <td><a href="../../assets/art/reference-files/ClassicMannequin.fbx" download>ClassicMannequin.fbx</a></td>
    <td>A [Classic body](../../art/characters/specifications.md#classic) type blank mannequin to use in Studio or your modeling application.</td>
  </tr>
  <tr>
    <td><a href="../../assets/art/reference-files/ClassicMannequin_With-Cages.fbx" download>ClassicMannequin_With-Cages</a></td>
    <td>A [Classic](../../art/characters/specifications.md#classic) body type blank mannequin with **body cages** to use in Studio or your modeling application for clothing design. Due to unconfigured cage objects, this file may not import correctly into Studio until modified.</td>
  </tr>
  <tr>
    <td><a href="../../assets/art/reference-files/RthroMannequin.fbx" download>RthroMannequin.fbx</a></td>
    <td>An [Rthro Normal](../../art/characters/specifications.md#normal) body type blank mannequin to use in Studio or your modeling application.</td>
  </tr>
  <tr>
    <td><a href="../../assets/art/reference-files/RthroMannequin_With-Cages.fbx" download>RthroMannequin_With-Cages.fbx</a></td>
    <td>An [Rthro Normal](../../art/characters/specifications.md#normal) body type blank mannequin with **body cages** to use in Studio or your modeling application for clothing design to use in Studio or your modeling application. Due to unconfigured cage objects, this file may not import correctly into Studio until modified.</td>
  </tr>
  <tr>
    <td><a href="../../assets/art/reference-files/RthroSlenderMannequin.fbx" download>RthroSlenderMannequin.fbx</a></td>
    <td>An [Rthro Slender](../../art/characters/specifications.md#slender) body type blank mannequin to use in Studio or your modeling application.</td>
  </tr>
  <tr>
    <td><a href="../../assets/art/reference-files/RthroSlenderMannequin_With-Cages.fbx" download>RthroSlenderMannequin_With-Cages.fbx</a></td>
    <td>An [Rthro Slender](../../art/characters/specifications.md#slender) body type blank mannequin with **body cages** to use in Studio or your modeling application to use in Studio or your modeling application for clothing design. Due to unconfigured cage objects, this file may not import correctly into Studio until modified.</td>
  </tr>
</tbody>
</table>
  </TabItem>
  <TabItem label="Blender">
  <table>
  <thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.blend" download>Rig_and_Attachments_Template.blend</a></td>
    <td>Starting armature rig template for Blender. Contains an armature with correct R15 naming conventions and attachment points. Use this template for rigging bodies and clothing items.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Body_Cage_Template.blend" download>Body_Cage_Template.blend</a></td>
    <td>Starting template for Blender, includes individual body part cages for each 15 humanoid parts. Use this template for caging your avatar bodies. <br /> <br /> <Alert severity='info'>To save time, edit the full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part meshes. When importing the `.fbx` into Studio, you can remove this helper mesh.</Alert></td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Combined-Template.blend" download>Combined-Template.blend</a></td>
    <td>Template file containing all content from previous templates, includes rig skeleton, body cages, attachment points. Use this template to rig and cage bodies and accessories.</td>
  </tr>
</tbody>
</table>

  </TabItem>
  <TabItem label="Maya">
  <table>
<thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.ma" download>Rig_and_Attachments_Template.ma</a></td>
    <td>Starting armature rig template for Maya. Contains an armature with correct R15 naming conventions and attachment points. Use this template for creating bodies and clothing items.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Body_Cage_Template.ma" download>Body_Cage_Template.ma</a></td>
    <td>Starting template for Maya, includes individual body part cages for each 15 humanoid parts. Use this template for caging your avatar bodies. <br /> <br /> <Alert severity='info'>To save time, edit the full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part meshes. When importing the `.fbx` into Studio, you can remove this helper mesh.</Alert></td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Combined-Template.ma" download>Combined-Template.ma</a></td>
    <td>Template file containing all content from previous templates, includes rig skeleton, body cages, attachment points. Use this template to rig and cage bodies and accessories.</td>
  </tr>

</tbody>
</table>

  </TabItem>
  <TabItem label="General">
  <Alert severity = 'warning'>
  The following `.fbx` files were exported from Maya for use in modeling applications. If you are using Blender or Maya in your workflow, use the specific template files for those programs instead of the following files.
  </Alert>
    <table>
<thead>
  <tr>
    <th><b>File</b></th>
    <th><b>Description</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Rig_and_Attachments_Template.fbx" download>Rig_and_Attachments_Template.fbx</a></td>
    <td>Starting armature rig template for general modeling software. Contains an armature with correct R15 naming conventions and attachment points. Use this template for creating bodies and clothing items.</td>
  </tr>
  <tr>
    <td><a href="../../assets/modeling/meshes/reference-files/Body_Cage_Template.fbx" download>Body_Cage_Template.fbx</a></td>
    <td>Starting template for general modeling software, includes individual body part cages for each 15 humanoid parts. Use this template for caging your avatar bodies. <br /> <br /> <Alert severity='info'>To save time, edit the full-body `std_cage_deformable` mesh to automatically apply vertex changes to the individual body-part meshes. When importing the `.fbx` into Studio, you can remove this helper mesh.</Alert></td>
  </tr>

</tbody>
</table>
  </TabItem>
</Tabs>

## Templates

If you are creating character models, you can choose from a variety of starting templates that best match your final design and save time on creating the [avatar components](../../art/characters/index.md#components-of-an-avatar). See [Creating with Templates](../../art/characters/creating/index.md#template-files) for important information on using these template files.

Each `.zip` contains a `.blend`, `.fbx`, and PBR texture `.png` files for that template model. If using Blender or following the [template creation guides](../../art/characters/creating/index.md), use the `.blend` project.

<Alert severity = 'warning'>
If you are using Roblox's avatar template files, you must perform the [cleanup steps](../../art/characters/creating/combining-head-geometry.md) in order for the assets to properly validate before publishing to the Marketplace.
</Alert>

<Tabs>
  <TabItem label="Head Shapes">
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Round-Head-Templates.png"/><figcaption><center>Round</center></figcaption></figure>
  <figure>
  <br /><br />
  Female: <a href="../../assets/art/reference-files/RoundFemale.zip">RoundFemale.zip</a> <br />
  Male: <a href="../../assets/art/reference-files/RoundMale.zip">RoundMale.zip</a>
  </figure>
  </GridContainer>
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Square-Head-Templates.png" /><figcaption><center>Square</center></figcaption></figure>
  <figure>
  <br /><br />
  Female: <a href="../../assets/art/reference-files/SquareFemale.zip">SquareFemale.zip</a> <br />
  Male: <a href="../../assets/art/reference-files/SquareMale.zip">SquareMale.zip</a>
  </figure>
  </GridContainer>
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Muzzle-Head-Templates.png" /><figcaption><center>Muzzle</center></figcaption></figure>
  <figure>
  <br /><br />
  Female: <a href="../../assets/art/reference-files/MuzzleFemale.zip">MuzzleFemale.zip</a> <br />
  Male: <a href="../../assets/art/reference-files/MuzzleMale.zip">MuzzleMale.zip</a>
  </figure>
  </GridContainer>
  </TabItem>

<TabItem label="Realistic">
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/SemiRealistic-Templates.png"/><figcaption><center>Realistic</center></figcaption></figure>
  <figure>
  Female: <a href="../../assets/art/reference-files/SemiRealisticFemale.zip">SemiRealisticFemale.zip</a> <br />
  Male: <a href="../../assets/art/reference-files/SemiRealisticMale.zip">SemiRealisticMale.zip</a>
  </figure>
  </GridContainer>
  </TabItem>
  <TabItem label="Anime">
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Anime-Templates.png"/><figcaption><center>Anime</center></figcaption></figure>
  <figure>
   Female: <a href="../../assets/art/reference-files/AnimeFemale.zip">AnimeFemale.zip</a> <br />
   Male: <a href="../../assets/art/reference-files/AnimeMale.zip">AnimeMale.zip</a>  
  </figure>
  </GridContainer>
  </TabItem>
    <TabItem label="Stylized">
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Stylized-Templates.png"/><figcaption><center>Stylized</center></figcaption></figure>
  <figure>
   Single body: <a href="../../assets/art/reference-files/StylizedHuman.zip">Stylized.zip</a>  
  </figure>
  </GridContainer>
  </TabItem>
  <TabItem label="Caricature">
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Caricature-Templates.png"/><figcaption><center>Caricature</center></figcaption></figure>
  <figure>
  Single body: <a href="../../assets/art/reference-files/Caricature.zip">Caricature.zip</a>
  </figure>
  </GridContainer>
  </TabItem>
</Tabs>
