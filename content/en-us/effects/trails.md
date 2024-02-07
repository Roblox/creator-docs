---
title: Trails
description: Trails create visual motion effects as an object moves through space.
---

A `Class.Trail` is an object that creates a trail between and behind two `Class.Attachment` objects as they move through space. Trails are useful to help players visualize movement, such as a sword slashing through the air, projectiles flying to their target, or footprints walking away.

<video src="../assets/lighting-and-effects/trail/Showcase.mp4" controls width="100%"></video>

After you [create a trail](#creating-a-trail), you can:

- Add a [texture](#texture) to create interesting visuals.
- Set a constant or gradient [color](#color) and/or [transparency](#transparency).
- Modify a trail's [lifetime](#lifetime).
- Specify the texture's [length and mode](#texture-lengthmode) to affect how it scales, repeats, and moves along with the trail's attachments.

## Creating a Trail

Before you begin to create a trail, it's useful to toggle on visibility of attachments so you can more easily discern how their spacing affects the trail's width.

1. In the menu bar, navigate to the [Model](../studio/model-tab.md) tab, then the **Constraints** section.
2. If it's not currently enabled, toggle on **Constraint Details**.

   <img src="../assets/studio/general/Model-Tab-Constraint-Details.png" width="740" alt="Constraint Details toggle indicated in Model tab" />

The following video demonstrates how attachments that are closer to each other create a trail with a smaller width:

<video src="../assets/lighting-and-effects/trail/Attachment-Width-Between.mp4" controls width="800"></video>

To create a trail on a given part:

1. In the [Explorer](../studio/explorer.md) window, insert two `Class.Attachment|Attachments` and a `Class.Trail` into the part.

   1. Hover over the part and click the **&CirclePlus;** button. A contextual menu displays.
   2. From the menu, insert two **Attachments** and one **Trail**.

      <img src="../assets/studio/explorer/Part-Trail-Setup.png" width="320" />

2. Select the new **Trail** object and assign its attachments. Ensure you assign each attachment property to a different `Class.Attachment`.

   1. In the [Properties](../studio/properties.md) window, select the **Attachment0** property. Your cursor changes.
   2. In the [Explorer](../studio/explorer.md) window, select the first attachment you created.
   3. Back in the [Properties](../studio/properties.md) window, select the **Attachment1** property. Your cursor changes.
   4. In the [Explorer](../studio/explorer.md) window, select the second attachment you created.

3. Using the [Move](../parts/index.md#moving-parts) tool, position both attachments within the part according to how wide you want the trail to be.
4. To see the trail, move the part in any direction and the trail will
   follow.

## Customizing Trails

### Texture

The `Class.Trail.Texture|Texture` property renders a texture across the length of the trail. You can set a trail's `Class.Trail.Texture|Texture` property to any asset ID. For more information, including how to add or import your own textures, see [Importing Assets](../projects/assets/manager.md#importing-assets).

<video src="../assets/lighting-and-effects/trail/Textures.mp4" controls width="800"></video>

### Color

The `Class.Trail.Color|Color` property tints the trail's texture to either a specific hue or a `Datatype.ColorSequence`. The video below shows how a constant color compares with a gradient color across the trail's [lifetime](#lifetime).

<video src="../assets/lighting-and-effects/trail/Color-Static-Gradient.mp4" controls width="800"></video>

<Tabs>
<TabItem label="Constant Color">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Trail`.
2. In the [Properties](../studio/properties.md) window, select the **Color** property. You can either:

   1. Click on the color square to open the **Colors** pop-up window and select a color.
   2. Input three numbers into the RGB color value field.

   <img src="../assets/studio/properties/Color-Input-Options.png" width="320" />

</TabItem>
<TabItem label="Color Gradient">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Trail`.
1. In the [Properties](../studio/properties.md) window, click inside the **Color** property field and click the **&ctdot;** button.

   <img src="../assets/studio/properties/Color-Open-Sequence.png" width="320" alt="Button to open color sequence popup" />

   In the color sequence popup, each triangle on the bottom axis is a
   **keypoint** that determines the color value of the trail at that
   point in its lifetime.

	 <img src="../assets/studio/general/ColorSequence-White-Keypoints-Labeled.png" width="640" alt="Keypoints labeled in color sequence popup" />

1. Click the keypoint at the start of the color sequence, click the
   small square next to **Color**, and select a color from the popup window.

	 <img src="../assets/studio/general/ColorSequence-Red-White.png" width="640" alt="Color sequence popup from red to white" />

1. If you want the trail to change color near the end of its lifetime, click the keypoint at the end of the color sequence, click the small square next to **Color**, and select a color from the popup window.

   <img src="../assets/studio/general/ColorSequence-Red-Purple.png" width="640" alt="Color sequence popup from red to purple" />

1. If desired, you can:

   - Add another keypoint by clicking anywhere on the graph.
   - Make a color change sooner or later within the gradient by dragging an intermediary keypoint to a new position.
   - Delete an intermediary keypoint by selecting it and clicking the **Delete** button.
   - Reset the entire sequence by clicking the **Reset** button.

</TabItem>
</Tabs>

### Transparency

The `Class.Trail.Transparency|Transparency` property sets the transparency of the trail's segments over its `Class.Trail.Lifetime|Lifetime`. It can be a consistent value or a `Datatype.NumberSequence` with ranges from **0** (totally opaque) to **1** (fully clear).

<Tabs>
<TabItem label="Constant Opacity">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Trail`.
2. In the [Properties](../studio/properties.md) window, select the **Transparency** property.
3. Input the desired opacity for the trail.

</TabItem>
<TabItem label="Number Sequence">

1. In the [Explorer](../studio/explorer.md) window, select the `Class.Trail`.
1. In the [Properties](../studio/properties.md) window, click inside the **Transparency** property field and click the **&ctdot;** button.

   <img src="../assets/studio/properties/Transparency-Open-Sequence.png" width="320" alt="Button to open number sequence popup" />

   In the number sequence popup, each square at the start and end of the graph is a **keypoint** that determines the opacity value of the trail at that
   point along its span. By default, the graph defaults to a straight line and the trail is of consistent opacity.

   <img src="../assets/studio/general/NumberSequence-0.5-0.5-Keypoints-Labeled.png" width="746" alt="Keypoints labeled in number sequence popup" />

1. Perform any of the following actions:

   - To change the opacity at a point, click on a keypoint and either
     drag it up or down, or enter a value in the **Value** field.
   - To insert a new keypoint, click on any point in the graph.
   - To delete a keypoint, select it and click the **Delete** button.
   - Reset the entire sequence by clicking the **Reset** button.

   <img src="../assets/studio/general/NumberSequence-0-1-0.png" width="746" alt="Number sequence popup from 0 to 1 to 0" />

</TabItem>
</Tabs>

### Lifetime

The `Class.Trail.Lifetime|Lifetime` property allows you to set the duration of the trail in seconds. When you decrease the value of this property, the trail moves through the space more quickly and consequently cuts down the length of the trail. This can provide the object with a faster, more animated visual
appearance.

<figure>
<video src="../assets/lighting-and-effects/trail/Lifetime.mp4" controls width="800"></video>
<figcaption>Trail with lifetime of 0.5 (left) vs. trail with lifetime of 3.0 (right)</figcaption>
</figure>

### Texture Length/Mode

A trail's `Class.Trail.TextureLength|TextureLength` and `Class.Trail.TextureMode|TextureMode` determine how its [texture](#texture) scales, repeats, and moves along with the trail's attachments.

<Tabs>
<TabItem label="Scaling and Repetition">

When `Class.Trail.TextureMode|TextureMode` is set to `Enum.TextureMode.Wrap` or `Enum.TextureMode.Static`, the `Class.Trail.TextureLength|TextureLength` property sets the length of the texture as it repeats across the trail's length.

<img src="../assets/engine-api/enums/TextureMode/Wrap-Static.png" width="720" alt="TextureMode diagram with Wrap mode" />

When `Class.Trail.TextureMode|TextureMode` is set to `Enum.TextureMode.Stretch`, the texture will repeat `Class.Trail.TextureLength|TextureLength` times across the trail's overall length.

<img src="../assets/engine-api/enums/TextureMode/Stretch.png" width="720" alt="TextureMode diagram with Stretch mode" />

</TabItem>
<TabItem label="Movement">

The `Class.Trail.TextureMode|TextureMode` property also affects the **movement** of the trail's texture as follows:

- If set to `Enum.TextureMode.Stretch`, the texture will stretch out based on the lifetime of the trail, and shrink inwards if the trail's attachments stop moving.

- If set to `Enum.TextureMode.Wrap`, the texture will be tiled as the length of the trail changes, but the textures will remain stationary relative to their attachments.

- If set to `Enum.TextureMode.Static`, the texture will be rolled out as the attachments move, and they will remain in place until their lifetime is met. This setting is ideal for trail textures that should appear "stamped" where rendered, such as paw prints or tire tracks.

</TabItem>
</Tabs>

### Facing

A trail is a 2D projection existing in 3D space, meaning that it may not be visible from every angle. The `Class.Trail.FaceCamera|FaceCamera` property, when set to `true`, ensures that the trail always faces the `Class.Workspace.CurrentCamera|CurrentCamera`, regardless of its orientation.
