---
title: Adaptive Animation 
description: Set up your character rig to support universal sets of animations and emotes.
---

<Alert severity = 'info'>
Adaptive Animation is currently in beta. Enable the beta by navigating to **File** > **Beta Features** and enable **Adaptive Animation**.
</Alert>

Roblox's **Adaptive Animation** system allows animations to play seamlessly between custom characters with unique body types, rigs, and proportions. This feature utilizes a `Class.HumanoidRigDescription` object within your character model that enables you to customize, modify, and map the internal joints of your custom character to enable universal animation support.

After importing an adaptive animation rig, you can access several Studio tools to help you remap your joints and set a baseline t-pose reference to better support animations. After configuring your rig, your custom character can playback any R15 animation, or any animation that has been published from a character with a `Class.HumanoidRigDescription`.

<GridContainer numColumns="2">
  <figure>
  <img src="../assets/avatar/adaptive-animation/Import-Custom-Humanoid.png" />
  <figcaption>Seamlessly import custom characters into Studio as a `Custom Humanoid` rig type.</figcaption>
  </figure>
  <figure>
  <img src="../assets/avatar/adaptive-animation/Assign-Joints-A.png" />
  <figcaption>Modify and adjust the generated `Class.HumanoidRigDescription` to ensure compatibility with universal animations.</figcaption>
  </figure>
</GridContainer>

## Modify custom character rig

The following instructions cover the process to [import](#import-model), [assign joints](#assign-joints), and [pose](#create-t-pose) a custom character using a non-standard Roblox rig. When importing a rig as a `Custom Humanoid`, Studio attempts to automatically configure the model's `Class.HumanoidRigDescription`. Use the joint assignment and t-pose tools to fine-tune or adjust the automated changes.

You can follow along this process with your own custom character, or the same [reference character](../assets/art/reference-files/Snow.fbx) used in this guide.

<Alert severity = 'info'>
This reference character is a modified version of Blender Studio's [Snow](https://studio.blender.org/characters/snow/v4/) character combined with Blender's [base mesh](https://www.blender.org/download/demo-files/) assets.
</Alert>

### Import model

Use the 3D Importer to import a character model with a HumanoidRigDescription:

1. Open the 3D Importer file browser by selecting **File** > **Import 3D**.
2. Select your rigged character model file.
   1. Only `.fbx` and `.glTF` formats support rigging data.
3. In Rig General, set **Rig Type** to `Custom Humanoid`.
  <img src="../assets/avatar/adaptive-animation/Import-Custom-Humanoid.png" width = "80%" />
4. Select Import. The character should appear in your workspace as a `Class.Model` containing a `Class.HumanoidRigDescription`.

### Assign joints

Adaptive animation requires at least 15 of your joints to map to Roblox's standardized 15 joints skeleton. While the automated import process attempts to make this assignment automatically, you can verify and reassign joints by selecting your model's `Class.HumanoidRigDescription` and accessing the joint assignment tool.

When using the joint assignment tool, a **visual picker** displays in the top right of the 3D viewport displaying the standard Roblox skeleton. To assign joints, you can either click the joints in the 3D viewport or visual picker, then click the corresponding joint in the other window. When a joint is assigned, the joint icon **changes to orange** in both the 3D viewport and the visual picker.

When using the tool, the following applies:

- The visual picker displays the 15 standard joint assignments as a filled-in circle.
  - All 15 standard joints on the visual picker require a joint assignment to your character rig.
- The visual picker displays several non-required joint assignments as empty circle outlines. If your rig is compatible with these extra joints, you can assign them appropriately to help improve animation quality.

<GridContainer numColumns="2">
  <figure><img src="../assets/avatar/adaptive-animation/Assign-Joints-B.png" />
  <figcaption>Joints that are not assigned appear as a grey indicator on both the visual picker and the 3D viewport mannequins.</figcaption>
  </figure>
  <figure><img src="../assets/avatar/adaptive-animation/Assign-Joints-A.png" />
  <figcaption>When assigned, joint indicators turn orange in both the visual picker and the 3D viewport.</figcaption>
  </figure>
</GridContainer>

To access and use the joint assignment tool:

1. In the Outliner, expand the model you just imported and select the child `Class.HumanoidRigDescription` object. Your character rig and tooling menu displays.
  <img src="../assets/avatar/adaptive-animation/HRD-Select.png" width = "60%" />
2. Select the **Edit** button in the 3D viewport.
3. Assign joints by clicking a joint on the body and selecting the corresponding joint in the visual picker. The joint indicator turns orange when assigned.
   1. Ensure that the 15 mandatory joints, indicated by filled-in circles in the visual picker, are assigned.

### Create t-pose

To ensure universal animation support, set up a standard t-pose configuration as a baseline reference for your character. When selecting your `Class.HumanoidRigDescription`, your model is automatically set to a t-pose, but you can use the t-pose tool to modify the position and rotation of your joints to ensure the best animation results.

<figure>
<GridContainer numColumns = "2">
<img src="../assets/avatar/adaptive-animation/Tpose-Rotation-A.png" width = "100%"/>
<img src="../assets/avatar/adaptive-animation/Tpose-Rotation-B.png" width = "100%"/>
</GridContainer>
<figcaption> <center>To move joints in the t-pose tool, select the joint and use the multi-transform tool to apply a positional or rotational change. </center></figcaption>
</figure>

To use the t-pose tool to move and rotate joints:

1. While in the joint assignment tool, select the **t-pose symbol** to switch to t-pose tool.
  <img src="../assets/avatar/adaptive-animation/Tool-Select.png" />
1. If moving both left and right limbs simultaneously, enable the left and right symmetry icon.
  <img src="../assets/avatar/adaptive-animation/Toolbar.png" />
1. Select one of the upper arm joints near the shoulder. Both left and right joints display as blue when selected.
   1. In some cases, you may also need to position the legs and other areas of the body.
  <img src="../assets/avatar/adaptive-animation/Tpose-Rotation-A.png" width = "60%"/>
1. Use the Rotate tool to move the character into a t-pose.
  <img src="../assets/avatar/adaptive-animation/Tpose-Rotation-B.png" width = "60%"/>
1. When complete, select **Done**.
1. In the HRD toolbar, use the dropdown to test and verify various animations. If animations look off, you may need to remap or re-pose your `Class.HumanoidRigDescription`.
  <img src="../assets/avatar/adaptive-animation/Test-Animation.png" width = "60%"/>

<Alert severity = 'success'>
Once your character's `Class.HumanoidRigDescription` is configured and saved, that character can [support playback](../animation/) of any R15 animation or animations published from a custom character with a `Class.HumanoidRigDescription`.
</Alert>
