---
title: Highlighting Objects
description: Highlighting objects lets you call attention to specific objects within your experience.
---

`Class.Highlight` is a visual effect you can use to call attention to a specific object within your experience. Every highlight effect has two main components: an outline and an interior. The outline is a silhouette that surrounds the object, and the interior is a solid overlay that displays over the object's interior. You can customize both of these components independently to modify the highlight's visual appearance.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-1.jpg" width="95%" />
    <figcaption>Original Object</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/Overview-Yellow-Outline.jpg" width="96%" />
    <figcaption>Object with a yellow outline and black interior</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/Overview-Yellow-Interior.jpg" width="91%" />
    <figcaption>Object with a black outline and yellow interior</figcaption>
  </figure>
</GridContainer>

Useful applications of the highlight effect include:

- Providing visual feedback that an object is important and/or interactable.
- Making distant objects visible through objects that are closer to the user.
- Indicating the current position and status of other characters.

## Adding Highlights

As a performance limit, Studio only displays 31 simultaneous `Class.Highlight` instances on the client-side at a time. If you add more than this limit, the additional `Class.Highlight` instances are silently ignored.

### Parenting to Objects

To add a highlight to an object, you can parent a new `Class.Highlight` directly to the object you want to display the highlight:

1. In the **Explorer** window, hover over either a `Class.Model` or a `Class.BasePart`, then click the &CirclePlus; button. A contextual menu displays.
2. From the menu, insert a **Highlight**. The highlight displays on the object with its default property values that create a white outline and a red tint overlay.

   <img src="../assets/ui/highlighting-objects/Adding-Highlight.jpg" width="30%" />

### Setting the Adornee Property

Alternatively, you can place the `Class.Highlight` instance outside of a child/parent relationship either within the workspace, `Class.StarterPlayer`, `Class.StarterGui`, `Class.StarterPack`, or `Class.ReplicatedStorage`, then set its `Class.Highlight.Adornee` property to the `Class.Model` or `Class.BasePart` you want to display the highlight.

## Customizing Highlights

You can change the properties of a `Class.Highlight` instance to create interesting visual effects that properly highlight your objects in theme with your experience.

### OutlineColor

The `Class.Highlight.OutlineColor` property sets the `Datatype.Color3` value of the highlight's outline.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineColor-Red.jpg" width="90%" />
    <figcaption>OutlineColor = [255, 100, 50]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineColor-Green.jpg" width="94%" />
    <figcaption>OutlineColor = [0, 255, 125]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineColor-Blue.jpg" width="90%" />
    <figcaption>OutlineColor = [75, 150, 255]</figcaption>
  </figure>
</GridContainer>

### OutlineTransparency

The `Class.Highlight.OutlineTransparency` property sets the visibility of the highlight's outline to any value between the default value of `0` (fully visible) and `1` (invisible).

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-0.jpg" width="60%" />
    <figcaption>OutlineTransparency = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-1.jpg" width="55%" />
    <figcaption>OutlineTransparency = 1</figcaption>
  </figure>
</GridContainer>

### FillColor

The `Class.Highlight.FillColor` property sets the `Datatype.Color3` value of the highlight's interior.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/FillColor-Red.jpg" width="93%" />
    <figcaption>FillColor = [255, 100, 50]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillColor-Green.jpg" width="90%" />
    <figcaption>FillColor = [0, 255, 125]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillColor-Blue.jpg" width="90%" />
    <figcaption>FillColor = [75, 150, 255]</figcaption>
  </figure>
</GridContainer>

### FillTransparency

The `Class.Highlight.FillTransparency` property sets the visibility of the highlight's interior to any value between the default value of `0` (fully visible) and `1` (invisible). You can use this property to determine how much of the object's existing color you want users to see.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/FillTransparency-0.jpg" width="90%" />
    <figcaption>FillTransparency = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillTransparency-Half.jpg" width="90%" />
    <figcaption>FillTransparency = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillTransparency-1.jpg" width="92%" />
    <figcaption>FillTransparency = 1</figcaption>
  </figure>
</GridContainer>

### DepthMode

The `Class.Highlight.DepthMode` property controls how the effect displays with respect to other objects in the world. You can set this property to one of the following options:

- `Enum.HighlightDepthMode.AlwaysOnTop|AlwaysOnTop` - Allows the highlight to display regardless if there are objects between the camera and the highlighted object. This means the user is always able to see the highlight regardless of what is between the highlighted object and the camera.

- `Enum.HighlightDepthMode.Occluded|Occluded` - Hides the highlight if there are objects between the camera and the highlighted object. This means the user is only able to see the object if there are no obstructing objects between the highlighted object and the camera's view.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/highlighting-objects/DepthMode-AlwaysOnTop.jpg" width="60%" />
    <figcaption>DepthMode = AlwaysOnTop</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/DepthMode-Occluded.jpg" width="57%" />
    <figcaption>DepthMode = Occluded</figcaption>
  </figure>
</GridContainer>

### Enabled

The `Class.Highlight.Enabled` property allows you to quickly enable or disable the highlight **without any impact on performance**.

<Alert severity="warning">
   While a disabled `Class.Highlight` doesn't display, it still takes one of the 31 available `Class.Highlight` slots. If you plan to permanently disable a `Class.Highlight` instance, it's best to delete the highlight rather than disable it.
   </Alert>

## Performance Tips

While you have a lot of options to customize your `Class.Highlight` instances, we recommend keeping the following in mind to increase your experience's performance for all user devices:

- Adding or removing a `Class.Highlight` can cause a geometry rebuilding step that might lead to performance spikes and extra draw calls. If you want to change a `Class.Highlight` instance's appearance or temporarily hide/display it on an object, it's best to customize the properties of the `Class.Highlight` instance directly, as changing any property of the `Class.Highlight` instance is lightweight and doesn't impact performance.
- Roblox draws objects in a back to front order, which can cause problems if you embed objects with a child `Class.Highlight` inside other objects that also have children `Class.Highlight` instances. For this reason, it's best to keep objects with `Class.Highlight` instances outside of a parent/child relationship with other objects with `Class.Highlight` instances.

### Highlights for Low-End Devices

For low-end devices, Studio uses a fallback version that doesn't have high performance overheads. This version doesn't have the outline effect; instead, it creates an interior fill with a checker pattern to emulate the `Class.Highlight.FillTransparency` property.

<img src="../assets/ui/highlighting-objects/Fallback-Version-On-Trees.jpg" width="80%" />

<img src="../assets/ui/highlighting-objects/Low-End-Interior-Fill.jpg" width="80%" />
