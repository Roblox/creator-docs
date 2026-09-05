---
title: Studio tests for character bodies
description: Verify the important aspects of your character model in a custom Studio test game.
---

After you complete your work and test your character bodies in your [third-party modeling tool](./test-blender.md), it's important to comprehensively test your character bodies in Studio too so that you can understand how they look and behave across the platform. Roblox provides two separate testing workflows:

- [Avatar Setup](../../avatar-setup/) - This all-in-one tool lets you preview and test various character body components, such as facial and full body animations, accessory fitting, and makeup looks.
- [Avatar test place](https://www.roblox.com/games/95623161111019/Avatar-Test-Place) - This game provides a wide variety of environmental and clothing tests to ensure that your character model and related components work correctly.

As you iterate on your avatar character bodies, try both workflows regularly and review any areas of concern. The following instructions provide guidance specifically for the Avatar test place.

## Configure test place

The **Avatar test place** includes several features in the interface and environment to quickly perform comprehensive tests of your avatar character bodies. To use the test place, you must save the game locally and configure settings to assist your testing workflow with your character model. To configure the test place:

1. Download the [Avatar test place](https://www.roblox.com/games/95623161111019/Avatar-Test-Place).

   <img src="../../assets/art/avatar/basic-creation/Testing-Avatar-Test-Place.png" width="90%" />

1. Import your custom character body. For detailed instructions, including how to manually import textures if they didn't load correctly, see [Import character bodies](./import.md).
1. Set your character model as the starting player character.

   1. In the **Explorer** window, rename your character model to **StarterCharacter**.
   1. Click and drag your character model to the **StarterPlayer** service. If a **StarterCharacter** model already exists, delete it.

   <img src="../../assets/art/avatar/basic-creation/Testing-StarterPlayer.png" width="40%"/>

1. Playtest the game and use the following UI buttons on the right side to open various testing tools and options:

<table>
<thead>
  <tr>
    <th><center>Button</center></th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
    <center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Face.png" width="57" height="60" /><br />Avatars and facial animation</center>
    </td>
    <td>Use this menu to swap between the custom avatar and control avatars. An additional button option allows you to loop through various facial animations to test your character's face expressions.</td>
  </tr>
  <tr>
    <td><center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Emote.png" width="53" height="56" /><br />Emotes and animations</center></td>
    <td>Use this menu to test various animations on your avatar character. </td>
  </tr>
  <tr>
    <td><center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Skin-Tone.png" width="54" height="53"/><br />Skin tone color palette</center></td>
    <td>Use this menu to select a new skin tone for your character. See <a href="../../art/characters/creating/blender-configurations.md#custom-skin-tones">Custom Skin Tones</a> for more details on this implementation with template character models. </td>
  </tr>
  <tr>
    <td><center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Clothing.png" width="53" height="53" /><br />Clothes and accessories</center></td>
    <td>Use this menu to select various clothing items to try on. </td>
  </tr>
  <tr>
    <td><center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Movement.png" width="48" height="53" /><br />Movement settings</center></td>
    <td>Use this menu to change movement settings for your character model, such as **jump height** and **walk speed**. </td>
  </tr>
  <tr>
    <td><center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Settings.png" width="48" height="59" /><br />Body proportion settings</center></td>
    <td>Use this menu to change various aspects of your character's body proportions.</td>
  </tr>
  <tr>
    <td><center><img src="../../assets/art/avatar/basic-creation/Testing-UI-Lighting.png" width="51" height="51" /><br />Lighting presets</center></td>
    <td>Use this menu to change the environment lighting to various presets, such as **Mountains - Sunset** or **Indoor - Midday**.</td>
  </tr>
</tbody>
</table>

## Test checklist

Review the following checklists to ensure that you are comprehensively testing each component of your avatar. You can use the Avatar menu to switch between your custom avatar and a control avatar to verify expected behavior.

### Movement and animation

<GridContainer numColumns="3">
  <figure><img src="../../assets/art/avatar/basic-creation/Testing-Emotes.png" /> <figcaption>Testing guitar animation emote</figcaption></figure>

  <figure><img src="../../assets/art/avatar/basic-creation/Testing-Water.png" /><figcaption>Testing water movement</figcaption></figure>

    <figure><img src="../../assets/art/avatar/basic-creation/Testing-Ramps.png" /><figcaption>Testing ramp movement</figcaption></figure>

</GridContainer>

Check the following for any anomalies:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>How to test</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Walking</td>
    <td>Move the character around the environment, ramps, and platforms.</td>
  </tr>
  <tr>
    <td>Sitting</td>
    <td>Move to any of the seats in the environment and press <kbd>E</kbd> to sit.</td>
  </tr>
  <tr>
    <td>Climbing</td>
    <td>Move to any of the trusses and ladders. Your character automatically begins climbing when nearby.</td>
  </tr>
  <tr>
    <td>Swimming</td>
    <td>Use the pool of water at the top of the ramp area to verify your swimming animation.</td>
  </tr>
  <tr>
    <td>Jumping</td>
    <td>Press <kbd>Space</kbd> to jump.</td>
  </tr>
  <tr>
    <td>Dying</td>
    <td>Use any of the death cubes to set your character to a ragdoll state and respawn.</td>
  </tr>
  <tr>
    <td>Facial Animation</td>
    <td>Use the **Face UI menu** to toggle a face animation cycle.</td>
  </tr>
  <tr>
    <td>Emotes and Animation</td>
    <td>Use the **Emote UI menu** to access and play the available emotes. </td>
  </tr>
</tbody>
</table>

If you see unexpected behavior with your character's movement, there may be issues with the rigging or skinning of your character body that require you to revisit your character's rigging and armature components in your 3D modeling software.

### Lighting and color

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/basic-creation/Testing-Skin-Tone.png" /> <figcaption>Testing skin tones</figcaption></figure>

  <figure><img src="../../assets/art/avatar/basic-creation/Testing-Lighting.png" /><figcaption>Testing environmental lighting</figcaption></figure>
</GridContainer>

Check the following for any anomalies:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>How to test</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Skin tone</td>
    <td>Use the **Skin Tone UI** menu to test various skin tones for texturing and lighting compatibility.</td>
  </tr>
  <tr>
    <td>Environmental lighting</td>
    <td>Use the **Lighting UI menu** and the environment to test how your character's textures display in various lighting conditions.</td>
  </tr>
</tbody>
</table>

If you see unexpected behavior with your character's appearance in various lighting and color selections, there may be issues with the texturing of your character body that require re-adjusting your character's texture components in your 3D modeling software.

### Clothing and accessories

<GridContainer numColumns="2">
  <figure><img src="../../assets/art/avatar/basic-creation/Testing-Clothing.png" /> <figcaption>Test a mix of clothing and accessories</figcaption></figure>

  <figure><img src="../../assets/art/avatar/basic-creation/Testing-Clothing-Try-On.png" /><figcaption>Use the UI menu or pedestals to equip or reset clothing and accessories</figcaption></figure>
</GridContainer>

Check the following for any anomalies:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>How to test</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Equipping accessories</td>
    <td>Use the **Clothes and Accessories UI menu** or environmental pedestals to equip rigid accessories to your character.</td>
  </tr>
  <tr>
    <td>Equipping clothing</td>
    <td>Use the **Clothes and Accessories UI menu** or environmental pedestals to equip layered accessories to your character, and test your clothing in motion and in animations to verify the fit.</td>
  </tr>
</tbody>
</table>

If you see unexpected behavior with your character equipping rigid or layered accessories, there may be issues with the caging or attachment points of your character body that require re-adjusting your character's cage mesh shapes or attachment objects in your 3D modeling software.

<Alert severity = 'warning'>
Clothes can layer in unconventional orders, such as a jacket worn below a t-shirt. You can reset the equipped clothing and try various combinations of clothing options and ordering.
</Alert>
