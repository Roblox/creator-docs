---
title: Highlighting objects
description: Highlighting objects lets you call attention to specific objects within your experience.
---

The `Class.Highlight` instance is a visual effect which you can use to call attention to a specific object within an experience. Every highlight effect has a silhouette **outline** that surrounds the object and a solid overlay
**interior** that displays over the object. You can customize both of these components independently to modify the highlight's visual appearance.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-1.jpg" alt="A tree mesh against a grey background." />
    <figcaption>Base object</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/Overview-Yellow-Outline.jpg" alt="The same tree mesh with a yellow outline and a black highlight interior." />
    <figcaption>Yellow outline and black interior</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/Overview-Yellow-Interior.jpg" alt="The same tree mesh with a black outline and a yellow highlight interior." />
    <figcaption>Black outline and yellow interior</figcaption>
  </figure>
</GridContainer>

Useful applications of the highlight effect include:

- Providing visual feedback that an object is important and/or interactable.
- Making distant objects visible through objects that are closer to the user.
- Indicating the current position and status of other characters.

## Add highlights

As a performance limit, Studio only displays 31 simultaneous `Class.Highlight` instances on the client-side at a time. If you add more than this limit, the additional `Class.Highlight` instances are silently ignored.

Note also that highlights on low-end devices may be more pixelated but will otherwise look the same as on other devices with any combination of settings.

### Parent to objects

To add a highlight effect to an object, you can parent a new `Class.Highlight` directly to the object.

1. In the **Explorer** window, hover over either a `Class.Model` or a `Class.BasePart`, then click the &CirclePlus; button. A contextual menu displays.
2. From the menu, insert a **Highlight**. The highlight displays on the object with its default property values that create a white outline and a red tint overlay.

   <img src="../assets/ui/highlighting-objects/Adding-Highlight.jpg" alt="" width="320" />

### Set the adornee

Alternatively, you can place the `Class.Highlight` instance outside of a child/parent relationship either within the workspace, `Class.StarterPlayer`, `Class.StarterGui`, `Class.StarterPack`, or `Class.ReplicatedStorage`, then set its `Class.Highlight.Adornee|Adornee` property to the `Class.Model` or `Class.BasePart` that you want to highlight.

## Customize highlights

You can change the properties of a `Class.Highlight` instance to create interesting visual effects that properly highlight objects in theme with your experience.

### OutlineColor

The `Class.Highlight.OutlineColor|OutlineColor` property sets the `Datatype.Color3` value of the highlight's outline.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineColor-Red.jpg" alt="A tree mesh with red outline." />
    <figcaption>OutlineColor = [255, 100, 50]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineColor-Green.jpg" alt="A tree mesh with green outline." />
    <figcaption>OutlineColor = [0, 255, 125]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineColor-Blue.jpg" alt="A tree mesh with blue outline." />
    <figcaption>OutlineColor = [75, 150, 255]</figcaption>
  </figure>
</GridContainer>

### OutlineTransparency

The `Class.Highlight.OutlineTransparency|OutlineTransparency` property sets the visibility of the highlight's outline to any value between the default value of **0** (opaque) and **1** (invisible).

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-0.jpg" alt="A tree mesh with black opaque outline."/>
    <figcaption>OutlineTransparency = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/OutlineTransparency-1.jpg" alt="A tree mesh with transparent outline." />
    <figcaption>OutlineTransparency = 1</figcaption>
  </figure>
</GridContainer>

### FillColor

The `Class.Highlight.FillColor|FillColor` property sets the `Datatype.Color3` value of the highlight's interior.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/FillColor-Red.jpg" alt="A tree mesh with a red fill." />
    <figcaption>FillColor = [255, 100, 50]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillColor-Green.jpg" alt="A tree mesh with a red fill." />
    <figcaption>FillColor = [0, 255, 125]</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillColor-Blue.jpg" alt="A tree mesh with a blue fill." />
    <figcaption>FillColor = [75, 150, 255]</figcaption>
  </figure>
</GridContainer>

### FillTransparency

The `Class.Highlight.FillTransparency|FillTransparency` property sets the visibility of the highlight's interior to any value between the default value of **0** (opaque) and **1** (invisible). You can use this property to determine how much of the object's existing color you want viewers to see.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/ui/highlighting-objects/FillTransparency-0.jpg" alt="A tree mesh with an opaque black fill." />
    <figcaption>FillTransparency = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillTransparency-Half.jpg" alt="A tree mesh with an semi-transparent black fill." />
    <figcaption>FillTransparency = 0.5</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/highlighting-objects/FillTransparency-1.jpg" alt="A tree mesh with a transparent black fill." />
    <figcaption>FillTransparency = 1</figcaption>
  </figure>
</GridContainer>

### DepthMode

The `Class.Highlight.DepthMode|DepthMode` property controls how the effect displays with respect to other objects in the world.

- `Enum.HighlightDepthMode.AlwaysOnTop|AlwaysOnTop` — Allows the highlight to display regardless if there are objects between the camera and the highlighted object. This means the viewer is always able to see the highlight regardless of what is between the highlighted object and the camera.

- `Enum.HighlightDepthMode.Occluded|Occluded` — Hides the highlight if there are objects between the camera and the highlighted object. This means the viewer is only able to see the object if there are no obstructing objects between the highlighted object and the camera's view.

<Tabs>
<TabItem label="AlwaysOnTop">
<img src="../assets/ui/highlighting-objects/DepthMode-AlwaysOnTop.jpg" alt="Two objects are behind pillars, but because their AlwayOnTop property is set to true, you can still see the objects and their highlight." width="800" height="450" />
</TabItem>
<TabItem label="Occluded">
<img src="../assets/ui/highlighting-objects/DepthMode-Occluded.jpg" alt="Two objects are behind pillars, but because their Occuluded property is set to true, you can only see the objects and their highlight in areas where they are unobstructed." width="800" height="450" />
</TabItem>
</Tabs>

### Enabled

The `Class.Highlight.Enabled|Enabled` property allows you to quickly enable or disable the highlight **without any impact on performance**.

<Alert severity="warning">
While a disabled `Class.Highlight` doesn't display, it still takes one of the 31 available `Class.Highlight` slots. If you plan to permanently disable a `Class.Highlight` instance, it's best to delete the highlight rather than disable it.
</Alert>

## Performance tips

While you have a lot of options to customize `Class.Highlight` instances, the following tips are recommended to increase your experience's performance on all devices:

- Adding or removing a `Class.Highlight` can cause a geometry rebuilding step that might lead to performance spikes and extra draw calls. If you want to change a `Class.Highlight` instance's appearance or temporarily hide/display it on an object, it's best to customize the properties of the `Class.Highlight` instance directly, as changing any property of the `Class.Highlight` instance is lightweight and doesn't impact performance.

- Roblox draws objects in a back to front order, which can cause problems if you embed objects with a child `Class.Highlight` inside other objects that also have children `Class.Highlight` instances. For this reason, it's best to keep objects with `Class.Highlight` instances outside of a parent/child relationship with other objects with `Class.Highlight` instances.

- The first `Class.Highlight` rendered on the screen incurs most of the performance cost (up to 1 millisecond of GPU time on mobile devices). For additional highlights beyond the first, you should not see a significant performance impact on any platform.

- On mobile devices, highlights are more costly on performance when they cover more of the screen. On other platforms, highlights have the same performance cost regardless of their screen coverage.

- On all platforms, highlights that are not visible on the screen (whether disabled or fully transparent) incur no performance cost.
