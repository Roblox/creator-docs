---
title: Trails
description: Trails create visual motion effects as an object moves through space.
---

A `Class.Trail` is an object that creates a trail between and behind two `Class.Attachment` objects as they move through space. After you [create a trail](#creating-a-trail), you can:

- Add a [texture](#texture) to create interesting visuals.
- Set a constant or gradient [color](#color).
- Modify a trail's [lifetime](#lifetime).

Trails are useful to help players visualize movement, such as a sword slashing through the air, projectiles flying to their target, or footprints walking away.

<video src="../assets/lighting-and-effects/trail/Showcase.mp4" controls width="100%"></video>

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

### Lifetime

The `Class.Trail.Lifetime|Lifetime` property allows you to set the duration of the trail in seconds. When you decrease the value of this property, the trail moves through the space more quickly and consequently cuts down the length of the trail. This can provide the object with a faster, more animated visual
appearance.

<figure>
<video src="../assets/lighting-and-effects/trail/Lifetime.mp4" controls width="800"></video>
<figcaption>Trail with lifetime of 0.5 (left) vs. trail with lifetime of 3.0 (right)</figcaption>
</figure>

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
