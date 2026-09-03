---
title: Test character bodies
description: Verify the important aspects of your character model in Blender and in Studio.
---

To ensure your character bodies for avatars can move, interact with objects in the 3D space, and wear cosmetics, clothing, and accessories, it's important to periodically test their components in both your third-party modeling tool and in Studio as you iterate on their design. By testing often, you can save yourself a lot of time in having to rework time-intensive processes like rigging, skinning, and caging.

Whether you are using a [template character](../resources.md#templates) or [project file](../resources.md#project-files) as a basis for your character body, reference the following tables for common tests and resources you can use throughout the creation process to comprehensively quality check each component of your character models.

<Tabs>
  <TabItem label="Blender Tests">

  <Alert severity = 'info'>
  You can apply the following workflows with any 3D modeling software, though certain interfaces and instructions may differ between platforms. For more information, see [Test character bodies in Blender](./test-blender.md).
  </Alert>

<table>
<thead>
  <tr>
    <th style={{width:"40%"}}>Component</th>
    <th>Testing recommendations</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><img src="../../assets/art/avatar/Component-Body-Parts.png" /> <br /><center>**Body Parts**</center></td>
    <td>When modeling, confirm that your character's geometry follows Roblox's [geometry specifications](./specifications.md#geometry).</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/Component-Texture-Map.png" /> <br /><center>**Textures**</center></td>
    <td>When texturing, confirm that your character's textures follow Roblox's [texture specifications](./specifications.md#textures). </td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/Component-Rigging.png" /> <br /><center>**Rigging**</center></td>
    <td>Use Blender's [posing tools](./test-blender.md#skinning-data) to check the rigging and skinning quality of your character's body.<br /></td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/Component-Facial-Animation-Data.png" /> <br /><center>**Face Animation**</center></td>
    <td>Confirm that your character's [FACS data](./test-blender.md#facial-animation-data) is present and correctly configured.</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/Component-Cage-Mesh.png" /> <br /><center>**Cage Mesh**</center></td>
    <td>Manually verify that your cage meshes completely and tightly cover your character model and follow Roblox's [outer cage specifications](./specifications.md#outer-cages).</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/Component-Attachments.png" /> <br /><center>**Attachments**</center></td>
    <td>Manually verify that your attachment points are correctly positioned and follow Roblox's [attachment specifications](./specifications.md#attachments).</td>
  </tr>
</tbody>
</table>
  </TabItem>
  <TabItem label="Studio Tests">

  <Alert severity = 'info'>
  Roblox provides an uncopylocked testing place file that includes quick access to various environments and testing features. For more information, see [Test character bodies in Studio](./test-studio.md).
  </Alert>

<table>
<thead>
  <tr>
    <th style={{width:"40%"}}>Component</th>
    <th>Testing recommendations</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><img src="../../assets/art/avatar/basic-creation/Testing-Emotes.png" /> <br /><center>**Body Parts**</center></td>
    <td>Test how your character's body parts [move and animate](./test-studio.md#movement-and-animation) in the 3D space.</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/basic-creation/Testing-Skin-Tone.png" /> <br /><center>**Textures**</center></td>
    <td>Test how your character looks in [various lighting environments and skin tone colors](./test-studio.md#lighting-and-color).</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/basic-creation/Testing-Outdoor-Environment.png" /> <br /><center>**Rigging**</center></td>
    <td>Use [animations and testing environments](./test-studio.md#movement-and-animation) to verify your character's rigging, skinning, and movement quality.</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/basic-creation/Testing-Face-Animation.png" /> <br /><center>**Face Animation**</center></td>
    <td>[Cycle through various facial animations](./test-studio.md#movement-and-animation) to ensure your character can perform common expressions.</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/basic-creation/Testing-Clothing-Try-On.png" /> <br /><center>**Cage Mesh**</center></td>
    <td>[Equip various clothing items](./test-studio.md#clothing-and-accessories) to check for fit and for any unexpected cosmetic issues.</td>
  </tr>
  <tr>
    <td><img src="../../assets/art/avatar/basic-creation/Testing-Clothing.png" /> <br /><center>**Attachments**</center></td>
    <td>[Equip various accessory items](./test-studio.md#clothing-and-accessories) to verify rigid accessory placement and orientation.</td>
  </tr>
</tbody>
</table>
</TabItem>
</Tabs>
