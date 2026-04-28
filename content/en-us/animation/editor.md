---
title: Animation Editor
description: Animation Editor allows you to design and publish custom animations on rigs.
---

The **Animation Editor**, accessible from Studio's **Avatar** tab or **Window**&nbsp;⟩ **Avatar** menu, allows you to design and publish custom animations on rigs. A rig is an object with individual sections connected by joints. You can move these joints to [create poses](#create-poses) and then smoothly animate the rig from pose to pose.

<img src="../assets/studio/general/Toolbar-Animation.png" width="800" alt="Animation Editor indicated in Studio's toolbar" />

## Interface

The editor's window is divided into three primary sections:

<figure>
<img src="../assets/animation/animation-editor/Editor-Sections-Labeled.png" width="840" />

<Tabs>
<TabItem label="Media / Playback Controls">
<img src="../assets/animation/animation-editor/Editor-Media-Playback.png" width="840" height="241" />

<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Animation name.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Media and playback options.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Position indicator which displays the timeline unit for the position of the scrubber in **seconds:frames**.
	</Grid>
</Grid>
</TabItem>
<TabItem label="Track List">
<img src="../assets/animation/animation-editor/Editor-Track-List.png" width="840" height="241" />

<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Name of rig.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Opens the **Manage IK** window.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Opens a contextual menu of additional tracks you can add to the track list.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-D-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Opens a contextual menu with options such as **Add&nbsp;Keyframe** and **Delete&nbsp;Track**.
	</Grid>
</Grid>
</TabItem>
<TabItem label="Timeline">
<img src="../assets/animation/animation-editor/Editor-Timeline.png" width="840" height="241" />

<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Scrubber that marks the current time and/or frame.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Time and/or frame units.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Opens a contextual menu of options including **Timeline&nbsp;Unit**, **Frame&nbsp;Rate**, toggling [Animation Events](./events.md) on/off, and more.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-D-Grey.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Draggers to expand or contract the time/frame unit marks.
	</Grid>
</Grid>
</TabItem>
</Tabs>
</figure>

## Create an animation

You can only create animations using **rigs**.

1. If you don't already have a rig in the workspace, insert a pre-built rig using the [Rig Generator](../studio/rig-builder.md) tool. The pre-built rigs have all of the basic parts and mechanisms to build a character animation.

   <img src="../assets/studio/general/Toolbar-Character.png" width="800" alt="Character button highlighted in Studio's toolbar." />

2. In the 3D viewport or the [Explorer](../studio/explorer.md), select the rig.

From here, you can begin [creating poses](#create-poses) for your rig and modifying the animation settings, such as [looping the animation](#loop-an-animation) or [setting its priority](#set-a-priority).

## Create poses

An animation consists of different **poses**, or specific positions and orientations of `Class.Bone` or `Class.MeshPart` objects within a rig. You can create poses by moving or rotating bones or meshes, such as the rig's hands, feet, or torso. After you create multiple poses on different positions of the timeline, the animation editor runs between them with your [easing settings](#easing) to smoothly animate the rig from pose-to-pose.

For example, a simple animation where a humanoid character turns
to look 45° to the left has two poses: The initial position looking forward, and the turned position looking left.

<figure>
<video src="../assets/animation/animation-editor/Animation-Poses.mp4" controls width="80%"></video>
</figure>

To create a pose:

1. In the [Explorer](../studio/explorer.md) window, select the rig and expand its child instances to access the bones or meshes.

2. In the 3D viewport or [Explorer](../studio/explorer.md), select a bone or mesh.

3. In the timeline, click-and-move the **scrubber** to the frame position where you want to set the pose. By default, Roblox represents timeline units as **seconds:frames** and animations run at 30 frames per second. For example, **0:15** indicates ½ second.

   <img src="../assets/animation/animation-editor/Scrubber-0-15.png" width="840" />

	 <Alert severity="info" variant="standard">
   By default, the timeline displays a duration of 1 second (1:00). To add more time to the timeline, enter a new value in the right-side box of the position indicator.
   </Alert>

4. Move or rotate the bone or mesh to a new orientation. For bones, you can rotate them to pose the rig along the created bone joints.

   <video controls src="../assets/modeling/skinned-meshes/Transform-Demo-Skinned.mp4" width="100%"></video>

	 Whenever you adjust a specific bone or mesh, a new track displays in the track list and a new **keyframe** displays on the timeline for that bone or mesh at that specific frame position.

	 <img src="../assets/animation/animation-editor/Track-Keyframe-Added.png" width="840" />

   <Alert severity="info" variant="standard">
   When creating poses, you can toggle between **Move** and **Rotate**
   modes by pressing <kbd>R</kbd>. These modes work exactly like moving and rotating base objects, including the snap settings and incremental values located in Studio's toolbar.
   </Alert>

5. When you're ready to preview the animation, click the **Play** button in the editor's playback controls or press the <kbd>Spacebar</kbd>.

## Keyframes

Once you [create basic poses](#create-poses) for a rig,
fine-tuning individual keyframes can significantly improve the final
animation. You can either:

- Operate on a specific track or keyframe by clicking or right-clicking on that track/keyframe.
- Operate on **all** tracks by clicking or right-clicking in the upper region of the track list.

<img src="../assets/animation/animation-editor/Editor-Keyframe-Operations.png" width="840" />

<table>
	<thead>
	  <tr>
	    <th>Operation</th>
	    <th>Workflow</th>
	  </tr>
  </thead>
	<tbody>
    <tr>
      <td>**Insert keyframe(s)**</td>
      <td>Right-click and select **Add Keyframe Here**. Note that the keyframe(s) insert at the time position closest to where you click, not at the position of the scrubber.</td>
    </tr>
    <tr>
      <td>**Move keyframe(s)**</td>
      <td>Select one or more keyframes and then drag them to a new time position.</td>
    </tr>
    <tr>
      <td>**Duplicate&nbsp;keyframe(s)**</td>
      <td>Select one or more keyframes and copy them (<kbd>Ctrl</kbd><kbd>C</kbd> or <kbd>⌘</kbd><kbd>C</kbd>). Then move the scrubber to the target time position and paste the copied frames (<kbd>Ctrl</kbd><kbd>V</kbd> or <kbd>⌘</kbd><kbd>V</kbd>).</td>
    </tr>
    <tr>
      <td>**Delete keyframe(s)**</td>
      <td>Select one or more keyframes and press <kbd>Delete</kbd> or <kbd>Backspace</kbd>.</td>
    </tr>
  </tbody>
</table>

### Easing

For each keyframe in the animation editor, you can choose both an
[easing style](#easing-style) and an [easing direction](#easing-direction).

#### Easing style

Easing **style** is the rate at which an animation moves between different frame
positions within the animation. By default, a part will move and/or rotate from
one keyframe to the next in an even, steady motion known as **linear easing**.
In the following video, linear easing makes the character's turning animation
appear stiff and robotic.

<figure>
<video src="../assets/animation/animation-editor/Easing-Linear.mp4" controls width="80%"></video>
<figcaption>Linear easing</figcaption>
</figure>

While that may look appropriate for some motions, compare the following video
where **cubic easing** makes the animation of the character's motion appear more
natural.

<figure>
<video src="../assets/animation/animation-editor/Easing-Cubic.mp4" controls width="80%"></video>
<figcaption>Cubic easing</figcaption>
</figure>

To change the easing style for one or more keyframes:

1. Select one or more keyframes. Every selected keyframe is now surrounded by a blue border.
2. Right-click on a keyframe with a border. A pop-up menu displays.
3. Hover over **Easing Style** and choose from the following options:

   - **Linear** — Moves at a constant speed.
   - **Constant** — Removes interpolation between the selected keyframe and
     next keyframe. The animation will "snap" from keyframe to keyframe.
   - **CubicV2** — Eases in or out with cubic interpolation.
   - **Elastic** — Moves as if the object is attached to a rubber band.
   - **Bounce** — Moves as if the start or end position of the tween is bouncy.

#### Easing direction

Easing **direction** defines which end of the animation movement is affected by
the [easing style](#easing-style). By default, the motion is slower at the
beginning and faster toward the end of the animation.

To change the easing direction for one or more keyframes:

1. Select one or more keyframes. Every selected keyframe is now surrounded by a blue border.
1. Right-click on a keyframe with a border. A pop-up menu displays.
1. Hover over **Easing Direction** and choose from the following options:

   - **In** — The motion will be slower at the beginning and faster toward the
     end.
   - **Out** — The motion will be faster at the beginning and slower toward the
     end.
   - **InOut** — **In** and **Out** on the same tween, with **In** at the
     beginning and **Out** taking effect halfway through.

### Optimize keyframes

Animators can often generate many keyframes during the course of animation, especially when using various animation tools and features. To help reduce the number of unnecessary keyframes and make it easier to animate on the timeline, the animation editor provides tools for [automatic](#automatic) and [on-demand](#on-demand) keyframe optimization.

#### Automatic

The animation editor automatically detects and removes unnecessary keyframes when creating [facial animations](../art/characters/facial-animation/animate-heads.md) and when [promoting a keyframe animation to a curve animation](../animation/curve-editor.md#open-the-curve-editor).

If 3 or more consecutive keyframes have the same value in a track, the editor removes the intermediary keyframes and keeps only the first and last keyframes.

If the track only contains keyframes with default values, such as an `Datatype.CFrame.identity|identity` coordinate frame, or a `0` value for a curve animation, the entire track is removed from the animation.

#### On-demand

During animating, you can use the editor's **Keyframe Optimization** tool to quickly reduce the number of unnecessary keyframes. Keyframe Optimization prioritizes the least impactful keyframes first. You can adjust the number of keyframes using the slider.

While using the slider, you can preview the animation and scrub through the timeline to check your animation but you can not perform editing operations, such as changing keyframe values or adding tracks.

To access the **Optimize Keyframes** tool:

1. From the editor's media/playback controls, click the **&ctdot;** button and select **Optimize Keyframes**.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png" width="680" />

2. In the popup window, move the slider to the desired number of keyframes. You can preview and play back the animation to verify the optimization.
3. Click **OK** when complete.

## Loop an animation

To make an animation automatically loop, navigate to the media/playback controls and click the **Looping** button.

<img src="../assets/animation/animation-editor/Controls-Looping.png" width="640" />

<Alert severity="info" variant="standard">
A looping animation doesn't interpolate between the final keyframes and first keyframes. To make the animation loop smoothly, duplicate the first keyframes and use them as the final keyframes.
</Alert>

## Set a priority

An animation's **priority** (`Enum.AnimationPriority`) dictates when it will play in an
experience. For example, if you play an animation with a higher priority
than another animation that's already playing, the new animation will
override the old. For example, a "jump" animation should take priority over an "idle" animation so that a character doesn't perform both at the same time.

Roblox uses seven levels of priority, ordered here from highest to lowest:

<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Highest.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Action4**
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Higher.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Action3**
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-High.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Action2**
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Neutral.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Action**
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Low.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Movement**
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Lower.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Idle**
	</Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Arrow-Lowest.png" width="50" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11}>
	**Core**
	</Grid>
</Grid>
<br />

To set an animation to a different priority:

1. Navigate to the editor's media/playback controls and click the **&ctdot;** button.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png" width="680" />

1. Hover over **Set Animation Priority** and choose the desired priority setting.

## Save an animation

When you save an animation, Studio saves it as a
`Class.KeyframeSequence` object in `Class.ServerStorage` and adds a reference to your rig object. Saving your animation is meant to preserve your animation progress and work. If you intend to use an animation, [export it](#export-an-animation) before referencing the published animation in your experience.

To save an animation:

1. Navigate to the editor's media/playback controls and click the **&ctdot;** button.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png" width="680" />

2. Select **Save** or **Save As** to save the animation in `Class.ServerStorage`.

   <img src="../assets/animation/animation-editor/Saved-Animation.png" width="320" />

<BaseAccordion>
<AccordionSummary><Typography variant="subtitle2">Accessing Local Animation Data</Typography></AccordionSummary>
<AccordionDetails>

Roblox saves animation data locally to `Class.ServerStorage` to preserve your animation work. In most cases, your experience shouldn't directly access this local data and instead should reference a published animation.

In the rare cases that your experience requires accessing local data, reference the value of the `Class.ObjectValue` in your rig's `AnimSaves` folder rather than directly accessing the `Class.ServerStorage`.

```lua title="Correctly Access Local Animation Data"
local rig = workspace.Rig

-- Access your local animation data with the value reference in your rig
local anim = rig.AnimSaves.Value.[SavedAnimation]
```

<Alert severity = 'warning'>
Since local data is stored in `Class.ServerStorage`, it doesn't replicate and isn't available from clients. If your clients need access to that data, you must move the `Class.KeyframeSequence` or `Class.CurveAnimation` objects and their descendants to `Class.ReplicatedStorage`.
</Alert>

</AccordionDetails>
</BaseAccordion>

## Export an animation

When you export an animation to Studio, it becomes available for use in
all experiences. This means that you only need to create an animation
once, then you can reuse it as many times as you want.

<Alert severity="warning">
 If your animation will be used for a **default** Roblox character animation like jumping or running, ensure that you rename the final keyframe as outlined in the first step below.
</Alert>

To export an animation:

1. <Chip label="IMPORTANT" size="small" variant="outlined" color="warning" /> If the animation will be used to [replace a default character animation](../animation/using.md#replace-default-animations) like running or jumping, rename the final keyframe `End` as follows:

   1. Right-click the final keyframe symbol in the upper bar region and choose **Rename&nbsp;Key&nbsp;Keyframe** from the
   contextual menu.

      <img src="../assets/animation/animation-editor/Select-Final-Keyframe.png" width="840" />

   2. Type `End` (**case-sensitive**) into the input field.
   3. Click the **Save** button.

2. Navigate to the editor's media/playback controls and click the **&ctdot;** button.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png" width="680" />

3. Select **Publish to Roblox** from the contextual menu.
4. In the **Asset Configuration** window, enter an animation title and optional description.
5. <Chip label="IMPORTANT" size="small" variant="outlined" color="warning" /> If the animation will be used in any [group-owned](../projects/groups.md) experience, select the group from the **Creator** field.
6. Click the **Submit** button.

Once the upload is complete, you can copy the animation's asset ID
from the [Toolbox](../projects/assets/toolbox.md) for scripting custom animations or to replace default character animations, as outlined in [Use animations](../animation/using.md).
