---
title: Creating an Animation
description: The process for using the Animation Editor to create custom animations.
next: /tutorials/building/animation/scripting-avatar-animations
---

Roblox Studio features a built-in Animation Editor to design custom animations for in-game characters. To learn how to use the editor, you'll create an animation of a character doing a victory leap. Once finished, that animation can be played for any Roblox avatar.

<video controls muted>
    <source src="../../../assets/tutorials/creating-an-animation/intro-to-animations-victoryPoseFinal.mp4" />
</video>

## Animation Setup

Before animating, you'll create a poseable character rig and name a new animation file in the editor.

1. To create player animations, a character **rig** is needed. In the **Avatar** tab, click on **Rig Builder**.

   ![alt](../../../assets/tutorials/creating-an-animation/interface-image-buildRig.png)

2. In the popup, make sure **R15** is selected and then click **Rthro Normal**.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/creating-an-animation/creating-an-animation-rigSelect.png" />
     <img src="../../../assets/tutorials/creating-an-animation/creating-an-animation-rigCreated.jpg" />
   </GridContainer>

3. To open the Animation Editor, go to **Plugins** → **Animation Editor**.

   ![alt](../../../assets/tutorials/creating-an-animation/interface-image-openAnimationEditor.png)

4. Select the **rig**. Inside the Animation window, type in a name and click **Create**.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-nameAnimation.png)

## Create an Animation

The victory leap animation will be a series of **keyframes**, each one storing information for how parts are positioned. In total, the one second animation will have four keyframes for each pose of the leap.

<Grid container spacing={3}>
    <Grid item xs={3}>
    <img src="../../../assets/tutorials/creating-an-animation/ccs2020_t2_jumpAnimationStills_01.jpg" />
    <b>Neutral</b>
    </Grid>
    <Grid item xs={3}>
    <img src="../../../assets/tutorials/creating-an-animation/ccs2020_t2_jumpAnimationStills_2.jpg" />
    <b>Crouch</b>
    </Grid>
    <Grid item xs={3}>
    <img src="../../../assets/tutorials/creating-an-animation/ccs2020_t2_jumpAnimationStills_3.jpg" />
    <b>Leap</b>
    </Grid>
    <Grid item xs={3}>
    <img src="../../../assets/tutorials/creating-an-animation/ccs2020_t2_jumpAnimationStills_4.jpg" />
    <b>Land</b>
    </Grid>
</Grid>

### First Pose (Neutral)

The first pose will be the **neutral** pose with the character standing at rest. To start, you'll set keyframes to the rig's current pose.

1. Make sure the rig is selected. Then, in the Animation Editor, click the **+** button. Select **Add All** to include all the parts in the rig in the editor.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-clickAddAll.png)

2. Set the neutral pose by right clicking on the top bar beneath the timeline and selecting **Add Keyframe**. You'll see a set of diamonds (keyframes) appear.

   <video controls loop muted>
   <source src="../../../assets/tutorials/creating-an-animation/creating-an-animation-AddKeyframe.mp4" />
   </video>

3. Save the animation by clicking on the **...** button and select **Save**.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-clickMenuButton.png)

   <Alert severity="warning">
   Until an animation is exported, that animation is stored locally to the game place. Saving through the animation editor does not save the game itself.
   </Alert>

### Second Pose (Crouch)

The next pose will have the character posed to crouch before leaping up.

1. Click on the top bar to set the animation time to a third of the length (e.g. 0:09).

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-setToMidFrame.png)

2. Select different body parts and use the **Rotate** tool to pose the rig. One way animators pose is to start with parts connected to the torso, like the shoulder. Then, move out to parts like the hand.

   <video controls muted>
       <source src="../../../assets/tutorials/creating-an-animation/showRotateArms_web.mp4" />
   </video>

   <Alert severity="info">

   Instead of clicking parts on the model, you may find it helpful to select them in the Animation Editor hierarchy. This is especially true for smaller parts like hands.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-partHierarchy.png)

   </Alert>

3. To move the rig, switch to the **Move** tool by pressing <kbd>R</kbd>. Click the **LowerTorso** part (either in the rig or animation hierarchy) and position the body slightly down.

   <video controls muted>
    <source src="../../../assets/tutorials/creating-an-animation/showMoveBody.mp4" />
   </video>

4. Continue to pose the rig, switching between **Move** and **Rotate** by pressing <kbd>R</kbd>.

   <video controls muted>
    <source src="../../../assets/tutorials/creating-an-animation/showPose2TimeLapse_optimized.mp4" />
   </video>

### Third Pose (Leap)

1. Set the animation time to the middle by clicking on the top bar.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-setToThirdFrame.png)

   <Alert severity="info">

   Exact times can be typed in the first box in the position indicator.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-changeExactTime.png)

   </Alert>

2. Animate using **Rotate** and **Move** to create a pose like below.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-an-animation/bipi_t2_showFrame3_front.jpg" />
    <figcaption>Front View</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/creating-an-animation/bipi_t2_showFrame3_side.jpg" />
    <figcaption>Side Angle View</figcaption>
  </figure>
</GridContainer>

### Finish the Animation

To save time and transition between animation loops, the last pose will be a copied version of the first, neutral pose. Then, you can either leave the pose as is or tweak it to get a more interesting animation.

1. Select the top keyframe (diamond symbol) in the timeline for the first pose. Notice how keyframes for each part are selected. Once you select all keyframes, copy them <kbd>Ctrl</kbd><kbd>C</kbd> (<kbd>⌘</kbd><kbd>C</kbd>).

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-selectFirst.png)

2. Move to the **end** of the animation (1:00 in the example) by clicking on the timeline. Then paste the keyframes using <kbd>Ctrl</kbd><kbd>V</kbd> (<kbd>⌘</kbd><kbd>V</kbd>). If desired, take some time to adjust the pose to add more detail in the animation.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-pasteLastFrame.png)

3. With the animation done, toggle **Looping** on, then press **Play**.

   <video controls muted>
    <source src="../../../assets/tutorials/creating-an-animation/showFinalVictoryPose_simple.mp4" />
   </video>

## Export the Animation

A finished animation has to be exported to play it in games.

1. Click the **..** button in the upper-left section of the animation editor window.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-clickMenuButton.png)

2. Select **Export**. Follow the dialog boxes and click **Submit**.

   <video controls loop muted>
    <source src="../../../assets/tutorials/creating-an-animation/creating-an-animation-exportAnim.mp4" />
   </video>

3. Once the animation is exported, copy the ID by clicking the **Copy** icon. You should see a green "ID Copied!" text.

   ![alt](../../../assets/tutorials/creating-an-animation/creating-an-animation-exportCopy.png)

   <Alert severity="info">
   If you need to find an animation ID, follow the process below.

   1. Open the [Animations](https://www.roblox.com/develop?View=24) section of the Create page.
   2. Locate and click an exported animation.
   3. Copy its ID from the URL in your browser.

   ![alt](../../../assets/tutorials/creating-an-animation/ccs2020_t2_exportedAnimationWeb_alt.png)
   </Alert>

The copied ID can now be used in Roblox animations, as explored in the [Scripting Avatar Animations](../../../tutorials/building/animation/scripting-avatar-animations.md) course. Additionally, for more information about Animation see [the Animation guides](../../../animation/index.md).
