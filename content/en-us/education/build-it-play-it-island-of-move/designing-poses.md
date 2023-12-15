---
title: Designing Poses
description: Learn how to make animations in Roblox Studio with step by step tutorials in this one hour challenge. Design a pose for an animation.
next: /education/build-it-play-it-island-of-move/adding-animations
prev: /education/build-it-play-it-island-of-move/animations-and-feedback
---

Now that the animation is set up, it's time to start creating poses. A key pose is an important point of motion, such as the moment a player jumps or begins to swing a tool. Animations can have one or more key poses.

When thinking of your own animation, imagine breaking it down into a set of key poses. For this example, we'll guide you how to create a celebration jump with these poses. Your own animation may have more or less.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_jumpAnimationStills_01.jpg" />
    <figcaption>Neutral</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_jumpAnimationStills_2.jpg" />
    <figcaption>Crouch</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_jumpAnimationStills_3.jpg" />
    <figcaption>Leap</figcaption>
  </figure>
</GridContainer>

The process of animating involves moving and rotating avatar parts to create key poses. When the animation runs, Studio connects the poses into a smooth motion.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showOverallAnimationTimelapse_optimized.mp4" width="100%"></video>

## Setting a Neutral Pose

Used at the start and end of this animation, the **neutral** pose shows the player at rest. So that the animation begins with the player at rest, add a keyframe at the start. In the process of animating, keyframes store information on how parts are positioned.

1. In the Animation Editor timeline, right click on the first track and select Add Keyframe Here. This creates keyframes for each part of the player.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/addKeyframes.gif" />

## Creating the Second Pose

The second pose shows anticipation as the player crouches before leaping. Depending on your animation, the second pose may be different.

1. Make sure the rig is selected. Then, click on the top bar to set the animation time to a third of the length (e.g. 0:09).

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_clickFrame2.png" />

2. Use the **Rotate** tool to start posing the rig. One way animators pose is to start with parts connected to the torso, like the shoulder. Then, move out to parts like the hand.

   <video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showRotateArms_web.mp4" width="100%"></video>

   <Alert severity="info">
   Instead of clicking parts on the model, you may find it helpful to select them in the Animation Editor hierarchy. This is especially true for smaller parts like hands.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_selectPartHierarchy.png" />
   </Alert>

3. For this animation, the player will crouch before jumping. If you're doing a different pose, your rig may need to be moved differently. To move the rig:

   - Switch to the Move tool by pressing <kbd>R</kbd>.
   - Click the LowerTorso part (either in the rig or animation hierarchy) and position the body slightly down. Moving this part moves the entire rig.

   <video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showMoveBody.mp4" width="100%"></video>

   <Alert severity="warning">
   **Only** move the lower torso. Moving any part other than the LowerTorso will cause body parts to become disconnected from the rig.
   </Alert>

4. Continue to pose the rig, switching between Move and Rotate by pressing <kbd>R</kbd>.

   <video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showPose2TimeLapse_optimized.mp4" width="100%"></video>

## Creating the Third Pose

The next set of keyframes will be near the middle, showing the most extreme motion of the animation. In this animation, the avatar will be at the highest point of their jump.

1. Set the animation time to the middle by clicking on the top bar.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_clickFrame3.png" />

    <Alert severity="info">
    Exact times can be typed in the first box in the position indicator.

    <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_showDurationCurrent.png" />

    </Alert>

2. Animate the pose using Rotate and Move like below. As you work, exaggerate movement (spread arms out wider, twist the head, etc) to make the animation more clear and exciting.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_showFrame3_front.jpg" />
       <figcaption>Front View</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_showFrame3_side.jpg" />
       <figcaption>Side Angle View</figcaption>
     </figure>
   </GridContainer>

## Adding the Last Pose

For the last pose, copy the first pose and paste it at the end. While you could customize the last neutral pose, this is a quick way of returning the animation to its starting point so it loops smoothly.

1. Select the top keyframe in the timeline for the first pose. Be sure to select all keyframes at that point, then copy them (<kbd>Ctrl</kbd> + <kbd>C</kbd> or <kbd>⌘</kbd> + <kbd>C</kbd>).

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_selectFirstFrame.png" />

2. Move to the end of the animation (1:00 in the example) by clicking on the timeline or entering that value in the first box of the position indicator.

3. Paste the keyframes (<kbd>Ctrl</kbd> + <kbd>V</kbd> or <kbd>⌘</kbd> + <kbd>V</kbd>).

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_showLastFrames.png" />

## Testing the Animation

Seeing an animation play more than once can make it easier to spot changes you want to make.

1. Toggle **Looping** on to ensure the animation playback loops.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_clickLooping.png" />

2. Press **Play**.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_clickPlay.png" />

   <video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showFinalVictoryPose_simple.mp4" width="100%"></video>

## Improving and Exporting

With the keyframes created, take time to make the animation more satisfying by adding or fine-tuning frames. Below are some optional ways to improve animations.

### Adding More Poses

Extra poses can add subtle details that make an animation go from "just okay" to "looking great." Incorporate extra poses to exaggerate a motion, show anticipation, or communicate a character's personality.

For example, carefully watch the video below a few times. Notice how the animation on the right has more poses, which leads to a greater range of expression.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showImprovedAnimationMoreFrames_improved_optimized.mp4" width="100%"></video>

### Moving Keyframes

Smooth out actions or make them feel more realistic by adjusting when keyframes happen.

1. Click a keyframe. You can either select an entire pose or individual parts.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_selectKeyframeExamples_single.png" />
       <figcaption>Selecting individual parts</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_selectKeyframeExamples_selectAll.png" />
       <figcaption>Selecting an entire pose</figcaption>
     </figure>
   </GridContainer>

2. Drag the keyframe(s) left or right into a new position. In the video below, notice how moving the animation allows it to feel more "snappy".

   <video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/showChangeFrameDifference_opt.mp4" width="100%"></video>

## Exporting the Animation

Once finished, export the animation so it can be added in-game.

1. Click the <code>...</code> button in the upper-left section of the animation editor window.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_clickOptions.png" />

2. Then, select **Export**. Follow the dialog boxes.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_showExportedAnimation.png" />

   <Alert severity="info">
   If you make any further changes to your animation, remember to Export it again to see the most up to date version.
   </Alert>

You've made your first animation! Time to get that in-game.
