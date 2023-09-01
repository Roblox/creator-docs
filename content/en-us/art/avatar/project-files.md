---
title: Avatar Project Files and References
description: Download various character-related project files and reference files.
---

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
    <td>A skinned R15 character created from the <a href="../../art/modeling/skinning-a-humanoid-model.md">Skinning a Humanoid Model</a> guide. Since this reference model doesn't yet have [inner and outer cage mesh data](../../art/avatar/specifications.md#inner-and-outer-cages), this model can't equip layered clothing or accessories.</td>
  </tr>
  <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/Fish-Person.zip" download>Fish-Person.zip</a></td>
    <td>A rigged and skinned humanoid character model with a full body cage, facial animation rig, and associated PBR texture maps.</td>
  </tr>
    <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/BlockyCharacter.fbx" download>Blocky.fbx</a></td>
    <td>A Blocky character model with an [animateable head](../../art/avatar/facial-animation/index.md) and a full body cage.</td>
  </tr>
    <tr>
    <td><a href="../../assets/avatar/dynamic-heads/reference-files/GoblinCharacter.fbx" download>Goblin.fbx</a></td>
    <td>A Goblin character model with an [animateable head](../../art/avatar/facial-animation/index.md) and a full body cage.</td>
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

If you are creating character models, you can choose from a variety of starting templates that best match your final design and save time on creating the [avatar components](../../art/avatar/index.md#components-of-an-avatar). See [Creating with Templates](../../art/avatar/creating/index.md#template-files) for important information on using these template files.

Each `.zip` contains a `.blend`, `.fbx`, and PBR texture `.png` files for that template model. If using Blender or following the [template creation guides](../../art/avatar/creating/index.md), use the `.blend` project.

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
  Single body: <a href="../../assets/art/reference-files/SemiRealisticMale.zip">SemiRealisticMale.zip</a>
  </figure>
  </GridContainer>
  </TabItem>
  <TabItem label="Anime">
  <GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/templates/Anime-Head-Templates.png"/><figcaption><center>Anime</center></figcaption></figure>
  <figure>
   Single body: <a href="../../assets/art/reference-files/AnimeFemale.zip">AnimeFemale.zip</a>  
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
