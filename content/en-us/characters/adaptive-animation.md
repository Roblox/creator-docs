---
title: Adaptive Animation
description: Set up your character rig to support universal sets of animations and emotes.
---

Roblox's **Adaptive Animation** system allows animations to play seamlessly between custom characters with unique body types, rigs, and proportions. This feature utilizes `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` objects within your character model so that you can customize, modify, and map the internal joints of your custom character for universal animation support.

After importing a character rig, you can access several Studio tools to help you remap your joints and set a baseline T-pose reference to better support animations. After configuring your rig, your custom character can playback any R15 animation, or any animation that has been published from a character with `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` objects.

<GridContainer numColumns="2">
  <figure>
  <img src="../assets/avatar/adaptive-animation/Import-Custom-Humanoid.png" />
  <figcaption>Seamlessly import custom characters into Studio as a `Custom Humanoid` rig type.</figcaption>
  </figure>
  <figure>
  <img src="../assets/avatar/adaptive-animation/Assign-Joints-A.png" width = "85%" />
  <figcaption>Modify and adjust the generated `Class.HumanoidRigDescription` to ensure compatibility with universal animations.</figcaption>
  </figure>
</GridContainer>

## Modify custom character rig

When importing a rig as a `Custom Humanoid`, Studio attempts to automatically configure the model's `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` objects. When necessary, you can use the joint assignment and T-pose tools to fine-tune or adjust the automated changes.

<Alert severity = 'info'>
You can follow along with your own custom character or the [reference character](../assets/art/reference-files/Snow.fbx) featured within this guide. The reference character is a modified version of Blender Studio's [Snow](https://studio.blender.org/characters/snow/v4/) character combined with Blender's [base mesh](https://www.blender.org/download/demo-files/) assets.
</Alert>

### Import model

Use the 3D Importer to import a character model with `Class.HumanoidRigDescription` and `Class.DigitsRigDescription` objects:

1. In the **Home** tab, click the **Import** button to open the 3D Importer. A file browser opens.
2. Select your rigged character's `.fbx` or `.gltf` file. The 3D Importer loads a preview of the character model.
3. In the **Rig General** section, set **Rig Type** to **Custom Humanoid**.
  <img src="../assets/avatar/adaptive-animation/Import-Custom-Humanoid.png" width = "70%" />
4. Select the **Import** button. The character displays in your workspace as a `Class.Model` containing a `Class.HumanoidRigDescription` object and a `Class.DigitsRigDescription` for each hand.

   <img src="../assets/avatar/adaptive-animation/Rig-DataModel.png" />

### Assign joints

Adaptive animation requires at least 15 of your character's joints to map to Roblox's [standardized 15 joints skeleton](../art/characters/specifications.md). While the automated import process attempts to make this assignment automatically, you can verify and reassign joints by using the joint assignment tool.

When you select your model's `Class.HumanoidRigDescription` or `Class.DigitsRigDescription` objects, the joint assignment tool's **visual picker** displays in the top right of the 3D viewport with a view of the standard Roblox skeleton. To assign joints, you can either click the joints in the 3D viewport or visual picker, then click the corresponding joint in the other view. When a joint is assigned, the joint icon **turns orange** in both the 3D viewport and the visual picker.

When using the joint assignment tool, the visual picker displays:

- All 15 standard joint assignments that you are required to assign to your character's rig as a filled-in gray circle.
- All additonal joint assignments that you are not required to assign to your character's rig as empty circle outlines. If your rig is compatible with these extra joints, you can assign them appropriately to help improve animation quality.

<GridContainer numColumns="2">
  <figure><img src="../assets/avatar/adaptive-animation/Assign-Joints-B.png" />
  <figcaption>Joints that are not assigned appear as a grey indicator on both the visual picker and the 3D viewport mannequins.</figcaption>
  </figure>
  <figure><img src="../assets/avatar/adaptive-animation/Assign-Joints-A.png" />
  <figcaption>When assigned, joint indicators turn orange in both the visual picker and the 3D viewport.</figcaption>
  </figure>
</GridContainer>

To access and use the joint assignment tool:

1. In the **Explorer** window, expand the model you just imported and select the child `Class.HumanoidRigDescription`. The Adaptive Animation toolbar displays with the joint assignment tool active, and your character's mesh objects become semi-translucent so you can view its internal joints.
1. In the 3D viewport, click a joint within the character's body, then in the visual picker, select the corresponding joint. The joint indicator turns orange to indicate that it has been assigned.
1. If your character's rig includes optional joints in its hands,
   1. Navigate back to the **Explorer** window, then select one of your model's child `Class.DigitsRigDescription` objects. The visual picker updates to display a view of your character's left or right hand.

      <img src="../assets/avatar/adaptive-animation/Hand-Rig-View.png" width = "20%" />

   1. Assign each optional joint by clicking a joint on the hand, then selecting the corresponding joint in the visual picker.
   1. Repeat this process for the character's other child `Class.DigitsRigDescription` object.

### Create t-pose

To ensure universal animation support, it's important to set up a standard T-pose configuration as a baseline reference for your character. The Adaptive Animation toolbar offers a T-pose mode with tooling to either automatically position your character to match T-pose requirements, or modify the position and rotation of your joints to ensure the best animation results.

<figure>
<GridContainer numColumns = "2">
<img src="../assets/avatar/adaptive-animation/Tpose-Rotation-A.png" width = "100%"/>
<img src="../assets/avatar/adaptive-animation/Tpose-Rotation-B.png" width = "100%"/>
</GridContainer>
<figcaption> <center>To move joints, select the joint while T-pose tooling is active, then use the multi-transform tool to apply a positional or rotational change.</center></figcaption>
</figure>

To create a T-pose using T-pose mode:

1. In the Adaptive Animation toolbar, select the **T-pose mode** button to switch to T-pose mode.

   <img src="../assets/avatar/adaptive-animation/T-pose-mode.png" />

1. Select the **Enforce T-pose** button to automatically position your character for T-pose requirements.

   <img src="../assets/avatar/adaptive-animation/Enforce-tpose.png" />

1. If you need to make adjustments to your character's T-pose,

   1. If you want to rotate both left and right limbs simultaneously, enable the left and right symmetry icon.

      <img src="../assets/avatar/adaptive-animation/Symmetry-Tool.png" />

   1. Select one of the upper arm joints near the shoulder. The joint turns blue to indicate that it is selected.
   1. Use the **Rotate** tool to rotate the joint into a T-pose.
   1. If necessary, position the legs and other areas of the body until your rig is in a T-pose.
1. To test your rig's T-pose,
   1. Navigate to the Adaptive Animation toolbar, then use the dropdown to select an animation.
   1. Press the play icon. If an animation doesn't animate correctly, you may need to remap or re-pose your character's rig.

<Alert severity = 'success'>
Once your character's rig is configured and saved, that character can [support playback](../animation/) of any R15 animation or animations published from a custom character with a `Class.HumanoidRigDescription`.
</Alert>
