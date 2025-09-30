---
title: Use heads in Studio
description: If you have a model with a live head, you can import the model into Studio, equip face accessories, and create and save animations.
---

You can import character models with animatable heads into Studio and use the automatically generated `Class.FaceControls` instance to pose or animate the face.

To set up heads with facial animation in your experience:

1. [Import a model with an animatable head](../../../art/characters/testing/studio.md#import). You can either create your own or use one of the provided reference model files.
2. (Optional) [Import face accessories](#import-face-accessories) you want to deform with the facial expressions of your head. You can either create your own or use one of the provided reference accessory files.
3. [Animate the head](#animate-heads) in the **Animation Editor** by either adding in individual animation tracks, or by using the **Face Animation Editor**.

If you want to experiment with pre-made heads before [making your own](../../../art/characters/facial-animation/create-basic-heads.md), Roblox has a reference experience you can access to see how heads interact with Studio's interface, as well as two reference models and accessories you can import directly into your own experience:

<table>
  <thead>
    <tr>
      <th>Reference files</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Head Animation In-Experience Editor](../../../assets/avatar/dynamic-heads/reference-files/Dynamic-Head-Editor.rbxl)</td>
      <td>A reference experience that allows you to preview a Goblin and Blocky head with various accessories using an editor.</td>
    </tr>
    <tr>
      <td>[Head Schema Reference](../../../assets/avatar/dynamic-heads/reference-files/Dynamic-Head-Schema.rbxl)</td>
      <td>A reference experience with a head Blocky model with `Class.FaceControls`.</td>
    </tr>
    <tr>
      <td>[Goblin Character Model](../../../assets/avatar/dynamic-heads/reference-files/GoblinCharacter.zip)</td>
      <td>A Goblin character model with an animatable head.</td>
    </tr>
    <tr>
      <td>[Blocky Character Model](../../../assets/avatar/dynamic-heads/reference-files/BlockyCharacter.fbx)</td>
      <td>A Blocky character model with an animatable head.</td>
    </tr>
    <tr>
      <td>[Blocky Face Accessories and Clothing](../../../assets/avatar/dynamic-heads/reference-files/Blocky-Face-Accessories.zip)</td>
      <td>A `.zip` file of Blocky-specific accessories, including:<ul><li>Angled Eyebrows</li><li>Round Eyebrows</li><li>Straight Eyebrows</li><li>Long Eyelashes</li><li>Short Eyelashes</li><li>Long Ducktail Beard</li><li>Mutton Chops Beard and Hair</li><li>Shirt and Pants</li></ul></td>
    </tr>
  </tbody>
</table>

## Import face accessories

You can import and equip face accessories that you want to deform with the facial expressions of your head. For example, when you import and equip eyebrows as a face accessory, you can animate the eyebrows to move with the character's eyes.

By default, when you import a face accessory, it imports as a `Class.MeshPart` object. Using the [Accessory Fitting Tool](../../../art/accessories/accessory-fitting-tool.md) (AFT), you can convert the `Class.MeshPart` into an `Class.Accessory` instance that is compatible with the head.

To import a face accessory:

1. From Studio's **File** menu, use the [3D Importer](../../../art/modeling/3d-importer.md) to import the custom model into the workspace.

   <img src="../../../assets/avatar/dynamic-heads/using-dynamic-heads-in-studio/Importing-Facial-Accessory-Final-Result.jpg" width="80%" />

2. Using the AFT, convert the `Class.MeshPart` into an `Class.Accessory` instance.

   1. In the toolbar's **Avatar** tab, click **Accessory** to open the AFT.
   2. In the **Explorer** window, select the **MeshPart** you imported as a face accessory. Its name displays in the **Part** field.
   3. Click the **Next** button.
   4. In the **Clothing** category, select **Face**, then click the **Next** button.
   5. (Optional) In the **Edit** panel, use the adjustment options to ensure the accessory fits your model.
   6. In the **Preview** panel, preview the new facial accessory on your head, then click the **Next** button. The tool transforms the `Class.MeshPart` into an `Class.Accessory` instance, and it displays in the **Explorer** window.

You can preview the accessory on your imported model by making the `Class.Accessory` instance a child of your character `Class.Model`. You can only equip character-specific face accessories with their designed character.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/avatar/dynamic-heads/using-dynamic-heads-in-studio/Facial-Accessory-In-Viewport.jpg" />
    <figcaption>Equipped accessory in viewport</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/avatar/dynamic-heads/using-dynamic-heads-in-studio/Facial-Accessory-In-Property-Panel.jpg" />
    <figcaption>Equipped Accessory in Explorer</figcaption>
  </figure>
</GridContainer>

You can also save the `Class.Accessory` instance to your toolbox and use the asset ID at any time in your experiences. For information on equipping accessories by applying a `Class.HumanoidDescription`, see [Customize characters with humanoid description](../../../characters/appearance.md#set-multiple-accessories).

### AutoSkin property

You can enable the `Class.WrapLayer.AutoSkin` property in the accessory's `Class.WrapLayer` instance to apply the skinning of the head to the face accessory. This allows a face accessory to fit and follow a character's expressions without having to apply any skinning influences to it during the 3D modeling process.

The following options are available for the `Class.WrapLayer.AutoSkin` property:

- **Disabled**: Disables the Automatic Skinning Transfer process. This is the default value.
- **EnabledOverride**: Enables the Auto-Skin Transfer process and allows Studio to override any existing skinning information found on the accessory. Choose this setting when you want to set or replace the existing skinning of an accessory using the Auto-Skin Transfer version.
- **EnabledPreserve**: Enables the Automatic Skinning Transfer process but **doesn't** allow it to override any existing skinning information found on the accessory. Choose this setting when you want to preserve and maintain any existing skinning of an accessory. If there isn't any skinning to maintain, the Auto-Skin Transfer creates new skinning automatically.

## Animate heads

Animatable head `Class.MeshPart|MeshParts` include a `Class.FaceControls` instance which allows you to access your facial pose properties.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/avatar/dynamic-heads/using-dynamic-heads-in-studio/FaceControls-In-Explorer.jpg" />
    <figcaption>FaceControls in Explorer</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/avatar/dynamic-heads/using-dynamic-heads-in-studio/FaceControls-In-Property-Panel.jpg" />
    <figcaption>FaceControls Property Panel</figcaption>
  </figure>
</GridContainer>

You can adjust these properties in the **Animation Editor** to animate your head. For more information, see [Animate heads](../../../art/characters/facial-animation/animate-heads.md).

## Troubleshooting

When importing custom head models, the [Output window](../../../studio/output.md) displays an error or warning message if there were any issues during the configuration process.

### Error messages

Error messages indicate a failure to properly import a model with a head. Reference the following table for a summary of all head error messages and troubleshooting tips:

<table>
  <thead>
    <tr>
      <th>Error message</th>
      <th>Troubleshooting</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Failed importing head with facial animation.</td>
      <td>The <kbd>.fbx</kbd> file is corrupted.</td>
    </tr>
    <tr>
      <td>Found more than one joint named X.  All joints must have unique names.</td>
      <td>Ensure that every joint that you import has a unique name.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Correctives can be for at most 3 control names.</td>
      <td>Studio found a corrective with more than 3 corrective poses.  This isn't supported, so you need to delete the corrective.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Unrecognized FACS control name X.</td>
      <td>X is an unrecognized FACS pose name.  Ensure that X is renamed to one of the [standard FACS poses](../../../art/characters/facial-animation/facs-poses-reference.md).</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Invalid corrective name X: Neutral cannot be part of a corrective.</td>
      <td>X is an invalid corrective name.  Ensure you are following the correct naming format for correctives.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Found duplicate FACS control name X for corrective Y.</td>
      <td>X is an invalid corrective name. You can only include a base pose that is listed as part of a corrective once in the corrective name.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Couldn't parse the frame number in Extra Attribute named X.</td>
      <td>You must name any extra attributes "Frame0", "Frame1", etc.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Empty value found for Extra Attribute named X.</td>
      <td>The extra attribute X has no value.  Add a base pose name or corrective, or delete the extra attribute.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Duplicate control name found.</td>
      <td>You set a FACS pose or corrective to multiple frames.  Ensure that each FACS pose or corrective is set to only a single frame.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Head_Geo has no Extra Attributes that map FACS controls to animation frames.</td>
      <td>The "Head_Geo" mesh in the FBX file must have extra attributes in order to animate facial expressions.  The imported avatar will not animate facial expressions.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: No frame was set to "Neutral" in animation.</td>
      <td>Must have one frame set to "Neutral" in the animation timeline.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: X has not been specified. This is needed for corrective Y.</td>
      <td>All base poses for a corrective must be set in the extra attributes.  For example, if the <kbd>Funneler_JawDrop</kbd> corrective is set, then there <b>must</b> be poses for <kbd>Funneler</kbd> and <kbd>JawDrop</kbd> alone.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: Missing key frame X for Y.</td>
      <td>There is an extra attribute "FrameX" set to Y, but the animation timeline has no frame X.</td>
    </tr>
    <tr>
      <td>Failed importing head with facial animation: No joints were found under DynamicHead.</td>
      <td>The <kbd>.fbx</kbd> file doesn't have any joints under the RootFaceJoint joint.</td>
    </tr>
    <tr>
      <td>Could not load FACS control data.</td>
      <td>There are corrupted joint parameters in the <kbd>.fbx</kbd> file.</td>
    </tr>
  </tbody>
</table>

### Warning messages

Warning messages indicate a potential issue with an imported head model. Reference the following table for a summary of all head warning messages and troubleshooting tips:

<table>
  <thead>
    <tr>
      <th>Error message</th>
      <th>Troubleshooting</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>You have corrective X, but missing corrective Y to support it.  This may cause odd deformations.</td>
      <td>You set a 3-corrective without setting the base 2-corrective.  The imported head will animate, but there might be strange deformations.</td>
    </tr>
    <tr>
      <td>Skipping attribute X: Y</td>
      <td>Studio found an extra attribute named X, but since it didn't match the format of "Frame#", it was ignored.</td>
    </tr>
    <tr>
      <td>Control X is nearly identical to Neutral.</td>
      <td>The pose for X is very similar to Neutral.  Studio reports this in case this was a mistake, but the import will be successful as long as there are no other failures.</td>
    </tr>
    <tr>
      <td>Found only N base poses. Your character may not be able to express itself.</td>
      <td>You only defined a subset of base poses in the <kbd>.fbx</kbd> file.  The import will still be successful as long as there are no other failures.</td>
    </tr>
  </tbody>
</table>
