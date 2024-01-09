---
title: Animation Editor
description: Animation Editor allows you to design and publish custom animations on rigs.
---

The **Animation Editor** plugin allows you to design and publish custom
animations on rigs.

A rig is an object with individual sections connected by joints. You can
move these joints to [create poses](#creating-poses), and
the Animation Editor will smoothly animate the rig from pose-to-pose. As
long as all moving parts are connected with
`Class.Motor6D`
objects, you can use the Animation Editor for both human and non-human
rigs.

## Interface

<img src="../assets/animation/animation-editor/Editor-Sections-Labeled.png"
   width="80%" />

### Media and Playback Controls

<table>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Animation-Name.png"
   width="100%" /></td>
    <td>The name of the animation.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-File-Menu.png"
   width="100%" /></td>
    <td>
      Opens a contextual menu with the following menu items:
      <ul>
        <li>**Load**</li>
        <li>**Save**</li>
        <li>**Save As **</li>
        <li>**Import **</li>
        <li>**Export**</li>
        <li>**Create New**</li>
        <li>**Set Animation Priority**</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-First-Key.png"
   width="100%" /></td>
    <td>Moves the scrubber to the first key.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Previous-Key.png"
   width="100%" /></td>
    <td>Moves the scrubber to the previous key.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Preview-Reverse.png"
   width="100%" /></td>
    <td>Previews the animation in reverse.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Pause.png"
   width="100%" /></td>
    <td>Pauses the animation.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Preview.png"
   width="100%" /></td>
    <td>Previews the animation.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Next-Key.png"
   width="100%" /></td>
    <td>Moves the scrubber to the next key.</td>
  </tr>
    <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Last-Key.png"
   width="100%" /></td>
    <td>Moves the scrubber to the last key.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Looping.png"
   width="100%" /></td>
    <td>Toggles looping for the animation.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Controls-Position-Indicator.png"
   width="100%" /></td>
    <td>The **position indicator** that displays the timeline unit for the position of the scrubber in **seconds:frames**.</td>
  </tr>
</table>

### Timeline

<table>
  <tr>
    <td><img src="../assets/animation/animation-editor/Timeline-Scrubber-Bar.png"
   width="100%" /></td>
    <td>A scrubber that marks the current frame position.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Timeline-Time-Units.png"
   width="100%" /></td>
    <td>Time units that allow you to move the scrubber to a precise time unit.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Timeline-Keyframe.png"
   width="100%" /></td>
    <td>A keyframe that marks the change in position or orientation of a part.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Timeline-Expand-Contract.png"
   width="100%" /></td>
    <td>Either expands or contracts the time unit marks.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Timeline-Options-Menu.png"
   width="100%" /></td>
    <td>
      Opens a contextual menu with the following menu items:
      <ul>
        <li>**Timeline Unit**</li>
        <li>**Frame Rate: 30fps **</li>
        <li>**Show <a href="../animation/events.md">Animation Events</a>**</li>
        <li>**Snap To Keys**</li>
    </ul>
    </td>
  </tr>
  </table>

### Track List

<table>
  <tr>
    <td><img src="../assets/animation/animation-editor/Track-List-Rig-Name.png"
   width="100%" /></td>
    <td>The name of the rig.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Track-List-IK-Button.png"
   width="100%" /></td>
    <td>Opens the **Manage IK** window.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Track-List-Add-Tracks.png"
   width="100%" /></td>
    <td>Opens a contextual menu of additional tracks you can add to the track list. </td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Track-List-Track-Name.png"
   width="100%" /></td>
    <td>The track displaying the name, position, and rotation of the part that
    has been moved or rotated to a new position or orientation.</td>
  </tr>
  <tr>
    <td><img src="../assets/animation/animation-editor/Track-List-Track-Options.png"
   width="100%" /></td>
    <td>
      Opens a contextual menu with the following menu items:
        <ul>
            <li>**Add Keyframe**</li>
            <li>**Delete Track**</li>
        </ul>
    </td>
  </tr>
</table>

## Opening the Animation Editor

To create an animation within Studio, you will first need to open the
Animation Editor.

To open the Animation Editor:

1. In the menu bar, navigate to the **Avatar** tab.
2. In the **Animations** section, click on the **Animation Editor**.
   The **Animation Editor** window displays.

   <img src="../assets/studio/general/Avatar-Tab-Animation-Editor.png" width="760" />

## Creating an Animation

Before you create an animation, you should have a rig within your
experience. If you don't have a rig available, insert a pre-built
rig with the [Rig Builder](../studio/rig-builder.md) plugin. The pre-built rigs have all of the basic parts and mechanisms to
build a character animation.

<img src="../assets/studio/general/Avatar-Tab-Rig-Builder.png" width="760" />

After the Animation Editor is
[open](#opening-the-animation-editor), you can create a new animation for a rig:

1. Select the rig you want to create an animation for. A dialog
   displays.

   <img
   src="../assets/animation/animation-editor/Create-Animation-Dialog.png"
   width="380" />

2. In the **Animation Name** field, enter a new animation name, then
   click the **Create** button. The Animation Editor window displays
   the [media and playback controls](#media-and-playback-controls), [timeline](#timeline), and [track list](#track-list).

From here, you can begin [creating poses](#creating-poses)
for your rig and experiment with animation settings, such as [looping
the animation](#looping-an-animation) or [setting its
priority](#setting-a-priority).

## Creating Poses

A **pose** is when you move and/or rotate parts of a rig (hands, feet,
torso, etc.) to specific positions. After you create multiple poses, the
Animation Editor will run between them with a defined
easing setting to smoothly animate the
rig from pose-to-pose.

For example, consider a simple animation where a humanoid character turns
to look 45° to the left. This animation involves two poses:

- The initial position looking forward.
- The turned position looking left.

<video src="../assets/animation/animation-editor/Animation-Poses.mp4" controls width="80%"></video>

To create a pose:

1. In the Animation Editor window, navigate to the timeline, then
   click-and-move the **scrubber** to the frame position where you
   want to set the pose. By default, Roblox represents timeline units as
   **seconds:frames** and animations run at 30 frames per second, so
   0:15 indicates ½ second.

   <img src="../assets/animation/animation-editor/Scrubber-0-15.png"
   width="500" />

2. In the **viewport**, hover your mouse over the **rig** and click on
   a part to select it.
3. Move and/or rotate the part to a new orientation. A **new track**
   displays in the track list, and a new **keyframe** displays on the
   timeline.

   <img src="../assets/animation/animation-editor/Track-Keyframe-Added.png" width="700" />

   <Alert severity="info" variant="standard">
   When you're creating poses, you can toggle between **Move** and **Rotate**
   modes by pressing <kbd>Ctrl</kbd><kbd>2</kbd> or <kbd>Ctrl</kbd><kbd>4</kbd>,
   respectively (<kbd>⌘</kbd><kbd>2</kbd> or <kbd>⌘</kbd><kbd>4</kbd>
   on Mac). These modes work exactly like moving and rotating base objects, including the snap settings and incremental values located in the **Snap to Grid** section of the **Model** tab.
   </Alert>

4. Continue moving or rotating parts until you get the desired pose.
   Whenever you adjust a specific part, a **new keyframe** displays
   on the **timeline** for that part at that specific frame position.
5. When you're ready to preview the animation, you can either:

   - Navigate to the **Media and Playback Controls**, then click the
     **Play** button.

   <img src="../assets/animation/animation-editor/Controls-Preview.png"width="330" />

   - Or press the **Spacebar**.

  <Alert severity="info" variant="standard">
      By default, the timeline displays a duration of 1 second (30 frames), but
      the animation's actual duration is determined by the final keyframe. To
      add more time to the timeline, enter a new value in the right-side box of
      the position indicator.
  </Alert>

## Keyframes

Once you [create basic poses](#creating-poses) for a rig,
fine-tuning individual keyframes can significantly improve the final
animation.

### Adding Keyframes

Whenever you change a part's position or orientation, a new keyframe
displays on the timeline. You can also add keyframes to a timeline
through the following methods.

To add a keyframe for a single part of the rig:

1. Navigate to the **timeline**, then move the **scrubber** to a new
   position.
2. In the **track list**, navigate to the part's **track** and click
   the **&ctdot;** button. A contextual menu displays.

   <img
   src="../assets/animation/animation-editor/Track-List-Track-Options.png"
   width="330" />

3. Select **Add Keyframe**.

To add a keyframe for multiple parts of the rig:

1. Navigate to the **timeline**, then right-click in the dark region
   above the tracks. A pop-up menu displays.

   <img
   src="../assets/animation/animation-editor/Add-Multiple-Keyframes.png"
   width="500" />

2. Select **Add Keyframe Here**.

Note that the keyframes insert at the frame position closest to where you click,
not at the position of the scrubber.

### Moving Keyframes

You can increase or decrease the amount of time between keyframes by moving
either individual keyframes or every keyframe in a frame position.

To move a single keyframe:

1. Navigate to the **timeline** and click on any **gray keyframe**.
   Both the **gray keyframe** and the **white keyframe** are now
   surrounded with a blue border.

   <img
   src="../assets/animation/animation-editor/Select-Single-Keyframe.png"
   width="500" />

2. Click-and-drag it to a new frame position.

To move every keyframe in a frame position:

1. Navigate to the **timeline** and click on the **white keyframe** in
   the dark region above the tracks. Every keyframe in the frame
   position is now surrounded with a blue border.

   <img
   src="../assets/animation/animation-editor/Select-Multiple-Keyframes.png"
   width="500" />

2. Click-and-drag it to a new frame position.

### Duplicating Keyframes

You can duplicate either a specific keyframe or multiple keyframes for
multiple parts into a new position in the timeline. This is particularly
useful for when you want to

To duplicate one or more keyframes:

1. Navigate to the **timeline** and select one or more keyframes. Every selected keyframe is now surrounded by a blue border.
1. Press <kbd>Ctrl</kbd><kbd>C</kbd> (<kbd>⌘</kbd><kbd>C</kbd>). Every selected keyframe copies to your clipboard.
1. Move the **scrubber** to a new frame position.
1. Press <kbd>Ctrl</kbd><kbd>V</kbd> (<kbd>⌘</kbd><kbd>V</kbd>). The keyframe(s) paste into the new frame position.

### Deleting Keyframes

To delete one or more keyframes, select the keyframe(s), then press
**Delete** or **Backspace**.

### Optimizing Keyframes

Animators can often generate many keyframes during the course of animation, especially when using various animation tools and features. To help reduce the number of unnecessary keyframes and make it easier to animate on the timeline, the Animation Editor provides tools for [automatic](#automatic-optimization) and [on-demand](#on-demand-optimization) keyframe optimization.

#### Automatic Optimization

The Animation Editor automatically detects and removes unnecessary keyframes when creating [facial animations](../art/characters/facial-animation/animating-heads.md) and when [promoting a keyframe animation to a curve animation](../animation/curve-editor.md#opening-the-curve-editor).

If 3 or more consecutive keyframes have the same value in a track, the animation editor removes the intermediary keyframes and keeps only the first and last keyframes.

If the track only contains keyframes with default values, such as an `Datatype.CFrame.identity|Identity Cframe`, or a `0` value for a curve animation, the entire track is removed from the animation.

#### On-Demand Optimization

<img
    alt="Optimize Keyframes"
    src="../assets/animation/animation-editor/Optimization-Preview.png"
    width="90%" />

During animating, you can use the Animation Editor's **Keyframe Optimization** tool to quickly reduce the number of unnecessary keyframes. Keyframe Optimization prioritizes the least impactful keyframes first. You can adjust the number of keyframes using the slider.

While using the slider, you can preview the animation and scrub through the timeline to check your animation but you can not perform editing operations, such as changing keyframe values or adding tracks.

To access the **Optimize Keyframes** tool:

1. In the **Animation Editor**, click ****&ctdot;**** button and select **Optimize Keyframes**. A dialog box with a slider displays.

   <img
    alt="Optimize Keyframes"
    src="../assets/animation/animation-editor/Optimize-Keyframes.png"
    width="20%" />

2. Move the slider to the desired number of keyframes. You can preview and playback the animation to verify the optimization.

   <img
    alt="Optimize Keyframes"
    src="../assets/animation/animation-editor/Optimization-Slider.png"
    width="40%" />

3. Click **OK** when complete.

### Easing

For each keyframe in the [Animation Editor](../animation/editor.md), you can choose both an
[easing style](#easing-style) and an [easing direction](#easing-direction).

#### Easing Style

**Easing style** is the rate at which an animation moves between different frame
positions within the animation. By default, a part will move and/or rotate from
one keyframe to the next in an even, steady motion known as **linear easing**.
In the following video, linear easing makes the character's turning animation
appear stiff and robotic.

<figure>
<video src="../assets/animation/animation-editor/Easing-Linear.mp4" controls width="100%"></video>
<figcaption>Linear easing</figcaption>
</figure>

While that may look appropriate for some motions, compare the following video
where **cubic easing** makes the animation of the character's motion appear more
natural.

<figure>
<video src="../assets/animation/animation-editor/Easing-Cubic.mp4" controls width="100%"></video>
<figcaption>Cubic easing</figcaption>
</figure>

To change the easing style for one or more keyframes:

1. Navigate to the **timeline** and select one or more keyframes. Every selected
   keyframe is now surrounded by a blue border.
2. Right-click on a **keyframe with a border**. A pop-up menu displays.
3. Hover over **Easing Style**, then choose from the following options:

   - **Linear** - Moves at a constant speed.
   - **Constant** - Removes interpolation between the selected keyframe and
     next keyframe. The animation will "snap" from keyframe to keyframe.
   - **Cubic** - Eases in or out with cubic interpolation.
   - **Elastic** - Moves as if the object is attached to a rubber band.
   - **Bounce** - Moves as if the start or end position of the tween is bouncy.

#### Easing Direction

**Easing direction** defines which end of the animation movement is affected by
the [easing style](#easing-style). By default, the motion is slower at the
beginning and faster toward the end of the animation.

To change the easing direction for one or more keyframes:

1. Navigate to the **timeline** and select one or more keyframes. Every selected
   keyframe is now surrounded by a blue border.
1. Right-click on a **keyframe with a border**. A pop-up menu displays.
1. Hover over **Easing Direction**, then choose from the following options:

   - **Out** - The motion will be faster at the beginning and slower toward the
     end.
   - **InOut** - **In** and **Out** on the same tween, with **In** at the
     beginning and **Out** taking effect halfway through.
   - **In** - The motion will be slower at the beginning and faster toward the
     end.

## Looping an Animation

To make an animation automatically loop, navigate to the [Media and
Playback Controls](#media-and-playback-controls) and click
the **Looping** button.

<img src="../assets/animation/animation-editor/Controls-Looping.png"
   width="330" />

<Alert severity="info" variant="standard">
    A looping animation doesn't interpolate between the final
    keyframes and first keyframes. To make the animation loop smoothly,
    <a href="#duplicating-keyframes">duplicate</a> the first
    keyframes and use them as the final keyframes.
</Alert>

## Setting a Priority

An animation's **priority** dictates when it will play in an
experience. For example, if you play an animation with a higher priority
than another animation that's already playing, the new animation will
override the old. For example, a "jump" animation should take priority over an "idle" animation so that a character doesn't perform both at the same time.

Roblox uses seven levels of priority, ordered here from highest to lowest:

<br />
<Grid container spacing={0} alignItems="center">
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Highest.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Action4**</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Higher.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Action3**</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-High.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Action2**</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Neutral.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Action**</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Low.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Movement**</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Lower.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Idle**</p>
	</Grid>
	<Grid item xs={1}>
		<center><img src="../assets/misc/Arrow-Lowest.png" width="40" /></center>
	</Grid>
	<Grid item xs={11}>
		<p>**Core**</p>
	</Grid>
</Grid><br />

To set an animation to a different priority:

1. Navigate to the [Media and Playback Controls](#media-and-playback-controls)
   and click the **&ctdot;** button. A
   contextual menu displays.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png"
   width="330" />

2. Hover over **Set Animation Priority**, then choose your desired
   priority setting.

## Saving an Animation

When you save an animation, Studio saves it as a
`Class.KeyframeSequence` object in `Class.ServerStorage` and adds a reference to your rig object. Saving your animation is meant to preserve your animation progress and work. If you intend to use an animation, [export it](#exporting-an-animation) before referencing the published animation in your experience.

To save an animation:

1. Navigate to the [Media and Playback Controls](#media-and-playback-controls)
   and click the **&ctdot;** button. A
   contextual menu displays.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png"
   width="330" />

2. Select **Save** or **Save As** to save the animation with a reference added to the **AnimSaves** object.

   <img src="../assets/animation/animation-editor/Saved-Animation.png"
   width="320" />

### Accessing Local Data

Roblox saves animation data locally to `Class.ServerStorage` to preserve your animation work. In most cases, your experience shouldn't directly access this local data and instead should reference a published animation.

In the rare cases that your experience requires accessing local data, reference the value of the `Class.ObjectValue` in your rig's AnimSaves folder rather than directly accessing the `Class.ServerStorage`. See the following examples:

```lua title="Access local animation data"
local myAnim = myRig.AnimSaves.Value.myAnimation
-- Accesses your local animation data with the value reference in your rig
```

```lua title="Incorrectly access local data"
local myAnim = ServerStorage.RBX_ANIMSAVES.myRig.myAnimation
-- Can conflict with other rigs sharing the same name
```

<Alert severity = 'warning'>
Since local data is stored in `Class.ServerStorage`, it doesn't replicate and isn't available from clients. If your clients need access to that data, you must move the `Class.KeyframeSequence` or `Class.CurveAnimation` objects and their descendants to `Class.ReplicatedStorage`.
</Alert>

### Migrating Legacy Data

The Animation Editor previously stored animation objects directly within a rig, not within `Class.ServerStorage`. If your experience references legacy animation objects in a rig, you can migrate this data to `Class.ServerStorage` using the animation migration tool, allowing you to [access local animation data](#accessing-local-data) in the same way.

To migrate your legacy animation data:

1. With the Animation Editor, select a rig with older animations that aren't saved in `Class.ServerStorage`. A migration window displays.

   <img src="../assets/animation/animation-editor/Migrate-Animations.png" width = "65%" />

2. Select **Delete**, **Migrate**, or **Ignore** for each detected animation.

   - **Delete**: Delete animations that are already published or no longer being used.
   - **Migrate**: Migrate animations that are still in progress or that haven't yet been published.
   - **Ignore**: Ignore animations if you have yet to update your experience's code to [access local data](#accessing-local-data) from `Class.ServerStorage`. Once updated, migrate these animations.

3. Press **OK** when complete.

## Exporting an Animation

When you export an animation to Studio, it becomes available for use in
all experiences. This means that you only need to create an animation
once, then you can reuse it as many times as you want.

<Alert severity="warning">
 If your animation will be used for a **default** Roblox character animation like jumping or running, ensure that you rename the final keyframe as outlined in the first step below.
</Alert>

To export an animation:

1. **(Important)** If the animation will be used to [replace a default character animation](../animation/using.md#replacing-default-animations) like running or jumping, rename the final keyframe **End** as follows:

   1. Right-click the final white keyframe symbol in the upper bar region and choose **Rename&nbsp;Key&nbsp;Keyframe** from the
   contextual menu.

      <img src="../assets/animation/animation-editor/Select-Final-Keyframe.png" width="500" />

   2. Type **End** (case-sensitive) into the input field.
   3. Click the **Save** button.

2. Navigate to the [Media and Playback Controls](#media-and-playback-controls)
   and click the **&ctdot;** button.

   <img src="../assets/animation/animation-editor/Controls-File-Menu.png"
   width="330" />

3. Select **Publish to Roblox** from the contextual menu.
4. In the **Asset Configuration** window, enter an animation title and optional description.
5. **(Important)** If the animation will be used in any [group-owned](../projects/groups.md) experience, select the group from the **Creator** field.
6. Click the **Submit** button.

Once the upload is complete, you can copy the animation's asset ID
from the [Toolbox](../projects/assets/toolbox.md) for scripting custom animations or to replace default character animations, as outlined in [Using Animations](../animation/using.md).

1. Click the **Inventory** tab and select **My Animations** from the dropdown menu.

   <img src="../assets/studio/toolbox/Inventory-My-Animations.png" width="360" />

2. Right-click the desired animation and select **Copy Asset ID** from the contextual menu.
3. See [Using Animations](../animation/using.md) for instructions on how to play the animation from a script or use the animation as a default character animation.
