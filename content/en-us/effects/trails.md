---
title: Trails
description: Trails create visual motion effects as an object moves through space.
---

A `Class.Trail` is an object that creates a trail between and behind two `Class.Attachment` objects `Class.Trail.Attachment0` and `Class.Trail.Attachment1` that are associated with a part as it moves through a space. After you [create a trail](#creating-a-trail), you can:

- Add a [texture](#texture) to create interesting visuals.
- Set a constant or gradient [color](#color).
- Modify a trail's
  [lifetime](#lifetime).

Trails are useful to help users visualize movement, such as a sword slashing through the
air, projectiles flying to their target, or footprints walking away.

<video src="../assets/lighting-and-effects/trail/Showcase.mp4" controls width="100%"></video>

## Creating a Trail

Before you begin to create a trail, make sure you are able to
view attachments.

1. In the menu bar, navigate to the **Model** tab, then the
   **Constraints** section.
2. If it is not currently enabled, click **Constraint Details**.

   <img src="../assets/studio/general/Model-Tab-Constraint-Details.png" width="740" alt="Constraint Details toggle indicated in Model tab" />

It is important to view attachments because they determine the width of a trail. The follow video demonstrates how attachments that are closer to each other create a trail with a smaller width:

<video src="../assets/lighting-and-effects/trail/Attachment-Width-Between.mp4" controls width="100%"></video>

In order for a trail to work properly, it must be a descendant of the
Workspace. It is common practice to either store the trail in a part
containing the effect's attachments, or as a child of a folder in the
Workspace with other effects objects.

To create a trail on a given part:

1. In the **Explorer** window, insert two attachments and a trail into
   the part.

   1. Hover over the part and click the **&CirclePlus;** button. A contextual menu displays.

   1. From the menu, insert two **Attachments** and one **Trail**.

   <img
   src="../assets/lighting-and-effects/trail/Explorer-Trail-Setup-Example.png"
   width="320" />

2. Select the **Trail**.
3. In the **Properties** window, assign the attachments to the trail.

   1. Select the `Class.Trail.Attachment0` property. Your cursor changes.

   1. In the **Explorer** window, select the first **Attachment** you created.

   1. Select the `Class.Trail.Attachment1` property. Your cursor changes.

   1. In the **Explorer** window, select the second **Attachment** you
      created. **Ensure you assign each attachment property to a
      different attachment**.

   <img
   src="../assets/lighting-and-effects/trail/Properties-Trail-Attachments.png"
   width="320" />

4. Using the **Move** tool, position both attachments with the part
   according to how wide you want the trail to be.

5. To see the trail, move the part in any direction and the trail will
   follow.

## Customizing Trails

### Texture

The
`Class.Trail.Texture|Texture`
property renders a texture across the length of the trail. You can set a
trail's
`Class.Trail.Texture|Texture`
property to any asset ID. For more information, including how to add or import your own textures, see
[Textures and Decals](../parts/textures-decals.md).

<video src="../assets/lighting-and-effects/trail/Textures.mp4" controls width="100%"></video>

### Lifetime

The
`Class.Trail.Lifetime|Lifetime`
property allows you to set the duration of the trail in seconds. When
you decrease the value of this property, the trail moves through the
space more quickly and consequently cuts down the length of the trail. This can provide the object with a faster, more animated visual
appearance.

<figure>
<video src="../assets/lighting-and-effects/trail/Lifetime.mp4" controls width="100%"></video>
<figcaption>The trail on the left has a **Lifetime** value of **0.5** and the trail on the right has a **Lifetime** value of **3**</figcaption>
</figure>

### Color

The
`Class.Trail.Color|Color`
property tints the trail's texture to either a specific hue or a
`Datatype.ColorSequence`.
A color sequence changes the trail's color across its
[lifetime](#lifetime).

<figure>
<video src="../assets/lighting-and-effects/trail/Color-Static-Gradient.mp4" controls width="100%"></video>
<figcaption>The trail on the left has a constant color while the trail on the right has a color sequence</figcaption>
</figure>

#### Constant Color

To set a trail to a specific hue:

1. In the **Explorer** window, select the **Trail**.
2. In the **Properties** window, select the **Color** property.
3. You can either:

   1. Click on the color square to open the **Colors**
      pop-up window and select a color.

   1. Input three numbers into the RGB color value field.

   <img src="../assets/studio/properties/Color-Input-Options.png" width="320" />

#### Color Sequence

To open a trail's color sequence:

1. In the **Explorer** window, select the **Trail**.
2. In the **Properties** window, select the **Color** property.
3. Click the **&hellip;** button. A color sequence pop-up
   displays. By default, the color sequence is all white.

   <img
   src="../assets/lighting-and-effects/beam/Open-Color-ColorSequence-Window.png"
   width="320" />

   <img src="../assets/studio/general/ColorSequence-White.png" width="626" />

Each triangle on the bottom axis of the color sequence is a **keypoint**
that determines the color value of the property at that point within the
trail's [lifetime](#lifetime).

To edit a trail's color sequence:

1. Click the **keypoint** at the start of the color sequence, then click the
   small square next to **Color** to open the colors pop-up
   window and select the color you want at the start of the beam.

   <img src="../assets/studio/general/ColorSequence-Red-White.png" width="626"
       />

2. If you want the beam to change color near the end of the beam, click the
   **keypoint** at the end of the color sequence, then click the small square
   next to **Color** to open the colors pop-up
   window and select a color.

   <img src="../assets/studio/general/ColorSequence-Red-Purple.png" width="626"
   />

3. If needed, you can:

   - Add another keypoint by clicking anywhere on the graph.

   - Drag any existing keypoints to a new position. This is useful if you want a
     color to change sooner or later within the gradient.

   - Delete a keypoint by selecting it, then the **Delete** button.

   - Reset the sequence by selecting the **Reset** button.

   <img
   src="../assets/studio/general/ColorSequence-Red-Cyan-Purple.png"
   width="626" />
