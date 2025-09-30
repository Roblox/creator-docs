---
title: Curve Editor
description: Curve Editor is a curve-based animation editing interface that lets you see and modify a rig's position and orientation.
comments: There are some opportunities to improve or add images/videos in this doc. Also some opportunity to create a "Using Curve Editor" use-case based article that'll quickly get an animator up to speed on the curve editor UI without the math.
---

The **Curve Editor** is a curve-based animation editing interface within the [Animation Editor](../animation/editor.md) that allows you to see and modify how a rig's position and orientation changes between keyframes through color-coded curve graphs.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/animation/curve-editor/Dope-Sheet-Editor.png" />
    <figcaption>Dope Sheet Editor</figcaption>
  </figure>
  <figure>
    <img src="../assets/animation/curve-editor/Curve-Editor-Example.png" />
    <figcaption>Curve Editor</figcaption>
  </figure>
</GridContainer>

Instead of using the default Dope Sheet Editor timeline's method of manually moving the scrubber from one frame to another to see how a rig's position and orientation change over time, the Curve Editor lets you quickly reference position and orientation values of your selected tracks through the **position ruler** on the left side of the timeline and the **rotation ruler** on the right side of the timeline.

<img
  alt="Curve Editor Overview"
  src="../assets/animation/curve-editor/UI-Overview.png"
  width="600" />

While the **Animation Editor** displays a rig's orientation as three separate X, Y, and Z [Euler angles](https://en.wikipedia.org/wiki/Euler_angles) in the track list, Studio internally handles these X, Y, and Z angles for `Class.KeyframeSequence` as a single [quaternion](https://en.wikipedia.org/wiki/Quaternion) that represents the orientation of a specific part of the rig at a specific time. Quaternions allow Studio to configure changes in your rig's orientation using the shortest path possible between its starting orientation to its next orientation, but this might cause some animations to not appear as natural as you might like.

However, the Curve Editor allows you to work with Euler angles either globally or on a per-part basis, which allows you to define independent tracks for the X, Y and Z angles. This provides additional levels of control to make your animations more fluid and realistic.

## Set rotation type

<Alert severity="warning">
It's important to verify your rotation type **before you open the Curve Editor** because once you convert quaternions to Euler angle tracks, it's impossible to convert them back into quaternions.
</Alert>

The **Animation Editor** automatically converts quaternions to Euler angles when you [open the Curve Editor](#open-the-curve-editor), but you can keep quaternion values by setting the rotation type to quaternions.

To set rotation type:

1. In the top-right corner of the **Animation Editor**, click the gear icon. A contextual menu displays.

   <img
   alt="Gear Icon"
   src="../assets/animation/curve-editor/Gear-Icon.png"
   width="600" />

2. Hover over **Default Rotation Type**, then select either **Euler Angles** or **Quaternions**. Your rotation type sets to your choice and becomes the default rotation type for future projects.

## Open the Curve Editor

You can switch the editor's timeline between the Dope Sheet Editor and the Curve Editor at any time.

To open the Curve Editor:

1. Open the [Animation Editor](../animation/editor.md#open-the-animation-editor).
2. (Optional) If you want to keep your orientation keyframe quaternion values, [set the rotation type](#set-rotation-type) to **quaternions**.
3. In the top-left corner of the **timeline**, click the **Curve Animation** icon. A pop-up window displays to confirm that your `Class.KeyframeSequence` clip will convert to a new CurveAnimation clip.

   <img
   alt="Opening Curve Editor"
   src="../assets/animation/curve-editor/Opening-Curve-Editor.png"
   width="800" />

4. Click the Confirm button. The timeline changes to the Curve Editor, and the Curve Editor icon changes to the Dope Sheet Editor icon. If you already had a keyframe within the timeline, your animation name changes to include a [CHANNELS] suffix.

   1. If you keep the default rotation type of Euler angles, the **Animation Editor** automatically converts any pre-existing quaternions to Euler angles following the Euler angles order setting.
      <img
      alt="Convert Euler Angles"
      src="../assets/animation/curve-editor/Convert-Euler-Angles.png"
      width="600" />

      <Alert severity="warning">
      Because `Class.KeyframeSequence|KeyframeSequences` work with quaternions and curve animations work with Euler angles by default, your animation might appear slightly different between keyframes, especially if any of your Euler angles approach [Gimbal lock](https://en.wikipedia.org/wiki/Gimbal_lock).
      </Alert>

   2. If you [set the rotation](#set-rotation-type) type to quaternions, the conversion to curves preserves the quaternions and the animation remains the same.

      <img
      alt="Curve Editor Overview"
      src="../assets/animation/curve-editor/Convert-Quaternion-Angles.png"
      width="600" />

## Interpolation

Interpolation is Studio's process of "filling in" position and orientation values between your keyframes. This allows the rig to seamlessly animate from one orientation or position to another instead of disjointedly jumping between keyframes. While Euler angle curves interpolate between the values of each keyframe, quaternion curves interpolate from `0` to `1` over a set time. To illustrate this, the following images display the same `Class.KeyframeSequence` after you open the Curve Editor with either a Euler angle or a quaternion [rotation type](#set-rotation-type):

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/animation/curve-editor/Euler-Angle-Curve.png" />
    <figcaption>Euler Angle Curve</figcaption>
  </figure>
  <figure>
    <img src="../assets/animation/curve-editor/Quaternion-Curve-Interpolation.png" />
    <figcaption>Quaternion Curve</figcaption>
  </figure>
</GridContainer>

For **Euler angle curves**, the height of each keyframe represents its orientation value over time. For example, the highest keyframe represents a rotation of about 120 degrees around the X axis, and the lowest keyframe represents a rotation of about -10 degrees. For **quaternion curves**, each segment represents orientation changing between keyframes, and the line displays the interpolation between them. In the previous example, the animation starts from orientation A, then interpolates linearly to orientation B. Once it is at B, the interpolation starts again from orientation B to orientation C, then continues with this pattern until the rig reaches its final orientation.

You can modify how the Curve Editor handles interpolation for both Euler angle curves and quaternion curves by [setting tangents](#set-tangents), [changing the interpolation mode](#change-interpolation-mode), or by [generating interpolation curves](#generate-interpolation-curves) between two or more keyframes.

### Set tangents

The Curve Editor provides **tangents**, or handles, that let you quickly adjust the interpolation either before or after a keyframe. Euler angle curves have a tangent both before and after the keyframe while quaternion curves have one tangent at the beginning and another at the end of a segment. The initial tangent controls the interpolation after the keyframe and the secondary tangent controls the interpolation before the keyframe. For example:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/animation/curve-editor/Euler-Angle-Curve-Tangents.png" />
    <figcaption>Euler Angle Curve Tangents</figcaption>
  </figure>
  <figure>
    <img src="../assets/animation/curve-editor/Quaternion-Curve-Tangents.png" />
    <figcaption>Quaternion Curve Tangents</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
For quaternion curve tangents, no matter how much you adjust each tangent, each segment always begins at `0` and ends at `1`. Although each segment of a quaternion curve graph is disconnected from subsequent segments, the two keyframes within the same frame always represent the same orientation.
</Alert>

Tangents change appearance when you set them to a new position. For example, when you manually set a tangent, the handle displays as a white circle, otherwise an unset tangent displays as a clear circle. For keyframes with two tangents, you can manually set either one or both tangents, and their appearance changes accordingly.

Tangents change appearance when you set them to a new position; an unset tangent displays as a clear circle, and a set tangent displays as a white circle. The **Animation Editor** automatically calculates the position for unset tangents based on the position of any set tangents. For instance, if you only set one tangent and leave the other unset, the unset tangent aligns with its opposite tangent:

<img
  alt="Tangent Image"
  src="../assets/animation/curve-editor/Tangent.png"
  width="320" />

However, if you don't set either tangent, both tangents automatically adjust based on their adjacent keyframes to produce a natural curve.

To set a tangent:

1. Click and drag the tangent in the direction you want to pull the curve. The curve adjusts based on the location of your cursor.
2. Release the tangent. The interpolation between keyframes adjusts accordingly.
3. (Optional) If you set one tangent and want to align the unset tangent horizontally, right-click the unset tangent, then select **Set Tangent to Zero** from the contextual menu.

#### Reset tangents

If you ever set a tangent to a new position and the resulting interpolation is undesirable, you can always use Auto-Tangent Mode to clear a tangent's value and reset it back to its default interpolation behavior.

To reset a tangent:

1. Right-click on a tangent. A contextual menu displays.
   <img
   alt="Set Tangent to Zero"
   src="../assets/animation/curve-editor/Set-Tangent-To-Zero.png"
   width="320" />

2. Select **Set Tangent To Zero**. The tangent resets to its default interpolation behavior.

### Change interpolation mode

Interpolation mode is the rate at which an animation moves between different keyframe positions within the animation. There are three interpolation modes available for curve animations:

- **Linear (default)** - Moves at a constant speed from one keyframe to another.
- **Constant** - Removes interpolation between the selected keyframe and next keyframe, causing the animation to "snap" from keyframe to keyframe.
- **Cubic** - Eases in and/or out of the animation. Cubic is the only mode that allows you to define tangents.

To change interpolation mode:

1. Right-click a keyframe. A contextual menu displays.
2. Hover over **Interpolation Mode**, then select either **Linear**, **Constant**, or **Cubic**. The interpolation mode changes the curve following the keyframe.

   <img
   alt="Interpolation Mode"
   src="../assets/animation/curve-editor/Interpolation-Mode.png"
   width="600" />

### Generate interpolation curves

For curve animations, bounce and elastic easing styles are not available as standard interpolations like they are for `Class.KeyframeSequence|KeyframeSequences`. However, when you convert a `Class.KeyframeSequence` to a curve animation, the **Animation Editor** automatically adds additional keyframes to your animation to keep the animation intact, and you can select two or more keyframes and generate an **interpolation curve** that removes and replaces any of their intermediate keyframes to mimic bounce and elastic easing behavior.

When generating an interpolation curve, you must select one of the following easing directions, which define which end of the animation movement is affected by the bounce or elastic easing style:

- **Out** - The motion is faster at the beginning and slower toward the end of the keyframe range.
- **In** - The motion is slower at the beginning and faster toward the end of the keyframe range.
- **InOut** - **In** and **Out** on the same tween, with **In** at the beginning and **Out** taking effect halfway through the keyframe range.

To generate interpolation curves:

1. Select two or more keyframes. Each keyframe you select highlights.
2. Right-click one of these keyframes. A contextual menu displays.
3. Hover over **Generate Curve**. Easing options display.
4. Hover over **Bounce** or **Elastic**, then select either **Out**, **InOut**, or **In**. An interpolation curve between your selected keyframes generates according to your settings.

   <img
   alt="Generate-Curve-Editor"
   src="../assets/animation/curve-editor/Generate-Curve-Editor.png"
   width="400" />

## Set Euler angles order

When you're working with Euler angles, Studio represents the X, Y, and Z axis through three channel values that follow a specific order to move your rig from its starting orientation to its next orientation. Each order is named after the [matrix multiplications](https://en.wikipedia.org/wiki/Matrix_multiplication) to get to the final orientation. For example, an XYZ order (X × Y × Z) means that the rig moves starting on the Z axis, then the Y axis, then the X axis. The **Animation Editor** defaults to this **XYZ order**, but you can change the order at any time.

How an animation changes when you set Euler angles order is dependent on **when** you change the order:

- If you load a `Class.KeyframeSequence` or a curve animation with a set quaternion rotation type then change the order, the new order doesn't affect the animation. This is because Studio uses quaternions to configure changes in your rig's orientation using the shortest path possible between its starting orientation to its next orientation. However, this method does affect how the quaternions of each keyframe transform into X, Y, and Z angles in the track list, which might visually affect the values within the timeline without affecting the animation itself.
- If you change the order of an existing Euler angle track, the animation might change since Studio preserves the values of each keyframe. This means that the ordered path Studio takes to change your rig's orientation from its starting orientation to its next orientation changes with the Euler angles order.

To set the Euler angles order:

1. In the top-right corner of the **Animation Editor**, click the gear icon. A contextual menu displays.

   <img
   alt="Gear Icon"
   src="../assets/animation/curve-editor/Gear-Icon.png"
   width="600" />

2. Hover over **Default Euler's Angles Order**, then select either **XYZ**, **XZY**, **YXZ**, **YZX**, **ZXY**, or **ZYX**. Your Euler angles order changes accordingly.
