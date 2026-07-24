---
title: Create avatar assets
description: Create avatar characters, cosmetics, clothing, and accessories to the Marketplace.

hideInPageNavigation: true
---

As an avatar creator, you can empower self-expression with your creativity and monetize your creations. Whether you're a 3D artist, character rigging specialist, animator, or someone with interest in character design, there are many pathways for you to create on Roblox, including:

- **Bodies** - Geometry, textures, rigging armature, attachment points, and cages that make up how a character renders and articulates in the 3D space.
- **Makeup** - Facial cosmetic items, such as traditional makeup art, face paint, or battle markings.
- **Accessories and clothing** - Equippable items that attach or wrap around the character's body.
- **Animations** - Full body emotes or facial expressions that express the character's personality.

Almost every custom avatar asset requires a combination of creative work in third-party image editing or 3D modeling software and Studio's built-in avatar customization and validation tooling. Let's explore your options.

## Third-party tools

There are a wide range of third-party tools available to create file types that you can import into Studio for avatar assets. The following are examples of popular third-party software that creators commonly use for their creative workflows.

<table>
<tbody>
 <tr>
   <td width="33%"><center><img src="../assets/landing/blender-logo.png" width="100%" /></center></td>
   <td width="33%"><center><img src="../assets/landing/maya-logo.png" width="55%" /></center></td>
   <td width="33%"><center><img src="../assets/landing/gimp-logo.png" width="80%" /></center></td>
 </tr>
 <tr>
   <td width="33%">[Blender](https://www.blender.org/) is a free, open-source 3D creation suite with a broad range of modeling, sculpting, texturing, rigging, and animation tools.</td>
   <td width="33%">[Autodesk Maya](https://www.autodesk.com/products/maya/overview) is a subscription-based industry standard toolset that covers the entire 3D production pipeline.</td>
   <td width="33%">[GNU Image Manipulation Program](https://www.gimp.org/) (GIMP) is a free, open-source image editor.</td>
 </tr>
</tbody>
</table>

## Studio tools

Once you have your custom image or 3D model file, Studio offers a full suite of tooling to convert the model or image file into Roblox-ready avatar assets that meet platform policies and technical standards. The following are all major tools you can use to create, test, and upload your assets to the Marketplace.

<table>
<thead>
 <tr>
   <th width="33%">**Importer**</th>
   <th width="33%">**Avatar Setup**</th>
   <th width="33%">**Automatic Skinning Transfer**</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td width="33%">The [Importer](../studio/importer.md) allows you to import 3D models, images, and other file types into Studio. It supports meshes for avatar items with PBR textures, rigging, skinning, and animation data.</td>
   <td width="33%">[Avatar Setup](../avatar-setup/index.md) automatically processes custom models into avatar assets. If the models don't have all essential components for publishing to the Marketplace, Avatar Setup generates them, such as partitions for your geometry, rigging armatures, skinning weights and influences, cages, facial animations, and attachments.</td>
   <td width="33%">[Automatic Skinning Transfer](../avatar/automatic-skinning-transfer.md) transfers or generates skinning data to layered accessories and facial rigid accessories. This allows the accessories to deform along the character it's attached to without you having to skin the accessory itself.</td>
 </tr>
</tbody>
</table>

<table>
<thead>
 <tr>
   <th width="33%">**Accessory Fitting Tool**</th>
   <th width="33%">**Animation Editor**</th>
   <th width="33%">**Adaptive Animation**</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td width="33%">The [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) (AFT) lets you test your custom models on multiple combinations of character bodies, animations, and accessories before generating the final `Class.Accessory` object.</td>
   <td width="33%">The [Animation Editor](../animation/editor.md) lets you import, design, and publish custom emotes for your rigging armatures.</td>
   <td width="33%">The [Adaptive Animation](../characters/adaptive-animation.md) system lets you customize, modify, and map the internal joints of your custom avatar characters for universal animation support across bodies with unique body types, rigs, and proportions.</td>
 </tr>
</tbody>
</table>

In addition, you can create and configure experiences to let players create avatar assets during runtime, either from base models that you provide or their own photos and prompts.

<table>
<thead>
 <tr>
   <th width="50%">**Avatar in-experience creation**</th>
   <th width="50%">**Photo-to-Avatar generation**</th>
 </tr>
</thead>
<tbody>
 <tr>
   <td width="50%">[Avatar in-experience creation](../avatar/in-experience-creation.md) lets players create, customize, and purchase avatar bodies in real time. When purchased, these custom bodies save directly to the player's Roblox inventory, allowing them to equip and wear the custom avatars in other experiences.</td>
   <td width="50%">[Photo-to-Avatar generation](../avatar/avatar-generation.md) lets players generate a fully functional avatar character using a photo and a text prompt.</td>
 </tr>
</tbody>
</table>
