---
title: Testing in Studio
comments:
description: Verify the important aspects of your character model in a custom Studio test experience.
prev: /art/avatar/testing/blender
---

Test your character model in Studio to understand how it looks and feels within a Roblox experience.

Roblox provides an [Avatar Test experience](https://www.roblox.com/games/13176231501/Avatar-Test-Place) that you can open in Studio and import your character model in. This experience provides a wide variety of environmental and clothing tests to ensure that your character model and related components work as expected.

## Setting up Test Experience

The following is the general testing process setting up the Avatar Test experience:

1. Download and open the [Avatar Test experience](https://www.roblox.com/games/13176231501/Avatar-Test-Place) in Studio.
2. Import your avatar model into Studio.
3. Set your model as the starter character.
4. Launch a playtest of the experience.

### Opening in Studio

In order to use the [Avatar Test experience](https://www.roblox.com/games/13176231501/Avatar-Test-Place), you must first download it from Roblox. You can save the experience locally and make any changes that may help your testing workflow. Roblox may update this experience periodically to add or improve features.

To download the Avatar Test experience:

1. Navigate to the [Avatar Test experience](https://www.roblox.com/games/13176231501/Avatar-Test-Place).
2. In the button next to the experience title, select **…** > **Edit**. The page navigates to the Studio launcher.

   <img src="../../../assets/art/avatar/basic-creation/Testing-Avatar-Test-Place.png" />
   <img src="../../../assets/art/avatar/basic-creation/Testing-Studio.png" />

### Importing

After you open the test experience in Studio, import your custom character model.

1. In the menu bar, navigate to **Avatar** > **Import 3D**. A file browser displays.

   <img src="../../../assets/art/avatar/basic-creation/Testing-3d-Importer.png" />

2. Select your custom character `.fbx` file.
3. Verify the following:

   1. With the highest level object selected, ensure **Rig Type** is set to R15.

      <img src="../../../assets/art/avatar/basic-creation/Testing-Rig-Type.png" />

   2. If using the template files, set **Rig Scale** to **Rthro**. Otherwise, use the appropriate rig scale for your [character body type](../../../art/characters/specifications.md#body-scale).
   3. Check for any red errors that may block import into Studio.
   4. Verify any yellow warnings that may indicate a quality issue with your avatar components.

    <Alert severity = 'warning'>
    The 3D Importer may incorrectly report some cage meshes as not watertight. You can ignore these warnings for those cage objects.
    </Alert>

4. Click **Import**. The character's model populates into the workspace.

  <Alert severity = 'warning'>
  If an error or warning message displays in the Output window, see [Troubleshooting](../../../art/characters/facial-animation/using-heads-in-studio.md#troubleshooting) for guidance on how to handle your specific error or warning message.
  </Alert>

### Adding SurfaceAppearance

If you exported your textures separately, or if the 3D Importer fails to pick up your PBR textures, you can add them manually.

To add individual image texture files:

1. Open the **Asset Toolbox**. You may need to publish your experience first.
2. **Bulk Upload** the image map assets to your Asset Toolbox.

   <img src="../../../assets/art/avatar/basic-creation/Testing-Asset-Upload.png" />

3. In the Explorer, expand the **Head_Geo** and check if a `Class.SurfaceAppearance` object exists.
   - If `Class.SurfaceAppearance` is present, continue to step 4.
   - If `Class.SurfaceAppearance` is not present, select the ⊕ next to the Head_Geo and add a `Class.SurfaceAppearance` object.
4. Set each property to the corresponding uploaded image map

   <img src="../../../assets/art/avatar/basic-creation/Testing-Surface-Appearance.png" />

5. Copy the `Class.SurfaceAppearance` with the populated image map with <kbd>Ctrl</kbd><kbd>C</kbd> (<kbd>⌘</kbd><kbd>C</kbd>).
6. Hold <kbd>Shift</kbd> and click all of your model's MeshParts to select all of your character's geometry.
7. Use <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>V</kbd> (<kbd>⌘</kbd><kbd>Shift</kbd><kbd>V</kbd>) to paste into all of the head geometries. An updated `Class.SurfaceAppearance` populates in each `Class.MeshPart` object.

   <img src="../../../assets/art/avatar/basic-creation/Testing-Surface-Appearance-Applied.png" />

### Setting Model as StarterPlayer

In order to play as the character during a playtest, rename and move the model instance:

1. In the Explorer, rename the character **model** as `StarterCharacter`.
2. In the Explorer, navigate to the `Class.StarterPlayer` directory. If a `StarterCharacter` model already exists, remove it.
3. Click and drag the model under the directory.

   <img src="../../../assets/art/avatar/basic-creation/Testing-StarterPlayer.png" />

After you rename and add your model, navigate to the **Test** > **Play** button to start a test session of the experience as the custom model.

## Using Test Experience

The Avatar Test experience includes several features in the interface and environment to quickly perform comprehensive tests of your avatar characters. You can use the [test checklist](#checklist) to ensure you are reviewing all the important aspects of your avatar character.

When playtesting the experience, use the following UI buttons on the right side to open various testing tools and options:

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
    <center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Face.png" width="57" height="60" /><br />Avatars and facial animation</center>
    </td>
    <td>Use this menu to swap between the custom avatar and control avatars. An additional button option allows you to loop through various facial animations to test your character's face expressions.</td>
  </tr>
  <tr>
    <td><center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Emote.png" width="53" height="56" /><br />Emotes and animations</center></td>
    <td>Use this menu to test various animations on your avatar character. </td>
  </tr>
  <tr>
    <td><center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Skin-Tone.png" width="54" height="53"/><br />Skin tone color palette</center></td>
    <td>Use this menu to select a new skin tone for your character. See <a href="../../../assets/art/avatar/basic-creation/Testing-UI-Emote.png">Custom Skin Tones</a> for more details on this implementation with template character models. </td>
  </tr>
  <tr>
    <td><center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Clothing.png" width="53" height="53" /><br />Clothes and accessories</center></td>
    <td>Use this menu to select various clothing items to try on. </td>
  </tr>
  <tr>
    <td><center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Movement.png" width="48" height="53" /><br />Movement settings</center></td>
    <td>Use this menu to change movement settings for your character model, such as **jump height** and **walk speed**. </td>
  </tr>
  <tr>
    <td><center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Settings.png" width="48" height="59" /><br />Body proportion settings</center></td>
    <td>Use this menu to change various aspects of your character's body proportions.</td>
  </tr>
  <tr>
    <td><center><img src="../../../assets/art/avatar/basic-creation/Testing-UI-Lighting.png" width="51" height="51" /><br />Lighting presets</center></td>
    <td>Use this menu to change the environment lighting to various presets, such as **Mountains - Sunset**, or **Indoor - Midday**.</td>
  </tr>
</tbody>
</table>

### Checklist

Use the following checklists to ensure that you are comprehensively testing each component of your avatar. Use the Avatar menu to switch between your custom avatar and a control avatar to verify expected behavior.

#### Movement and Animation

<GridContainer numColumns="3">
  <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Emotes.png" /> <figcaption>Testing guitar animation emote</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Water.png" /><figcaption>Testing water movement</figcaption></figure>

    <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Ramps.png" /><figcaption>Testing ramp movement</figcaption></figure>

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
    <td>Move to any of the trusses and ladders. Your character automatically begins climbing when near.</td>
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

If you see unexpected behavior with your character's movement, there may be some issues with the rigging or skinning of your character. It may require revisiting the rigging and armature components of your avatar model in your modeling application.

#### Lighting and Color

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Skin-Tone.png" /> <figcaption>Testing skin tones</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Lighting.png" /><figcaption>Testing environmental lighting</figcaption></figure>
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
    <td>Use the **Lighting UI menu** and the environment to check how your character's surface appearance displays in various conditions.</td>
  </tr>
</tbody>
</table>

If you see unexpected behavior with your character's appearance in various lighting and color selections, there may be some issues with the texturing of your character. It may require re-adjusting the texturing components of your avatar model in your modeling application.

#### Clothing and Accessories

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Clothing.png" /> <figcaption>Test a mix of clothing and accessories</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Testing-Clothing-Try-On.png" /><figcaption>Use the UI menu or pedestals to equip or reset clothing and accessories</figcaption></figure>
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
    <td>Use the **Clothes and Accessories UI menu** or environmental pedestals to equip rigid accessories to your character. Test your clothing in motion and in animations to verify the fit.</td>
  </tr>
</tbody>
</table>

If you see unexpected behavior with your character wearing clothes or equipping rigid accessories, there may be issues with the caging or attachment points of your character. You may need to re-adjust the cage mesh shapes or attachment objects of your avatar model in your modeling application.

<Alert severity = 'warning'>
Clothes can layer in unconventional orders, such as a jacket worn below a tshirt. You can reset the equipped clothing and try various combinations of clothing options and ordering.
</Alert>
