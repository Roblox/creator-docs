---
title: Positioning and Sizing UI Objects
description: Explains the process of positioning, sizing, and ordering UI objects on a player's screen.
---

Unless UI objects are under control of a [layout structure](#layout-structures) or a [size modifier/constraint](../ui/size-modifiers.md), you have complete control over their [position](#position) and [size](#size). You can also set the Z‑index [layering](#zindex) order in which objects overlap.

## Core Properties

All `Class.GuiObject|GuiObjects` share a core set of properties to [position](#position), [size](#size), [anchor](#anchorpoint), and [layer](#zindex) them within an on‑screen or in‑experience container.

### Position

The `Class.GuiObject.Position` property is a `Datatype.UDim2` coordinate set that positions the object along the **X** and **Y** axes. A `Datatype.UDim2` is represented by both `Datatype.UDim.Scale|Scale` and `Datatype.UDim.Offset|Offset` values for each axis:

- **Scale** &mdash; Values that represent a **percentage** of the container's size along the corresponding axis, additive of any **Offset** values.
- **Offset** &mdash; Values that represent how many **pixels** to shift the object on the corresponding axis, additive of any **Scale** values.

<figure>
<img src="../assets/ui/general/UDim2-Components.png" width="334" />
</figure>

To edit the position of a selected `Class.GuiObject`, click the **Position** field in the [Properties](../studio/properties.md) window and enter a new `Datatype.UDim2` coordinate set.

<img src="../assets/studio/properties/GuiObject-Position.png" width="320" />

<img src="../assets/ui/layout-appearance/Positioning-With-AnchorPoint.jpg" width="800" />

<Alert severity="success">
Brackets and spaces are **optional** when entering a `Datatype.UDim2` in Studio&nbsp;&mdash; you can simply enter the four values separated by commas, for instance `0.25,40,0.1,20`, and Studio will infer the intended value set.

Studio also infers the intended value set when a single number is entered. For example, entering simply `0.5` will be converted to `{0.5, 0},{0.5, 0}` since `0.5` is likely a **Scale** value of 50%. Conversely, entering `20` will be converted to `{0, 20},{0, 20}` since `20` is likely an **Offset** value of 20 pixels and not a scale of 2000%.
</Alert>

### Size

The `Class.GuiObject.Size|Size` property is a `Datatype.UDim2` coordinate set that sizes the object along the **X** and **Y** axes. A `Datatype.UDim2` is represented by both `Datatype.UDim.Scale|Scale` and `Datatype.UDim.Offset|Offset` values for each axis:

- **Scale** &mdash; Values that represent a **percentage** of the container's size along the corresponding axis, additive to any **Offset** values.
- **Offset** &mdash; Values that represent the object's **pixel** size along the corresponding axis, additive to any **Scale** values.

To edit the size of a selected `Class.GuiObject`, click the **Size** field in the [Properties](../studio/properties.md) window and enter a new `Datatype.UDim2` coordinate set.

<img src="../assets/studio/properties/GuiObject-Size.png" width="320" />

<img src="../assets/ui/layout-appearance/Sizing-With-Scale.jpg" width="800" />

<Alert severity="success">
Brackets and spaces are **optional** when entering a `Datatype.UDim2` in Studio&nbsp;&mdash; you can simply enter the four values separated by commas, for instance `0.75,0,0.25,0`, and Studio will infer the intended value set.

Studio also infers the intended value set when a single number is entered. For example, entering simply `0.5` will be converted to `{0.5, 0},{0.5, 0}` since `0.5` is likely a **Scale** value of 50%. Conversely, entering `20` will be converted to `{0, 20},{0, 20}` since `20` is likely an **Offset** value of 20 pixels and not a scale of 2000%.
</Alert>

### AnchorPoint

The `Class.GuiObject.AnchorPoint|AnchorPoint` property defines the **origin point** from where the object changes [position](#position) and [size](#size). The default `Class.GuiObject.AnchorPoint|AnchorPoint` values are `(0, 0)` which places the anchor in the top‑left corner of the object.

`Class.GuiObject.AnchorPoint|AnchorPoint` values are a **fraction** from `0` to `1`, relative to the [size](#size) of the object, meaning an object with `Class.GuiObject.AnchorPoint|AnchorPoint` values of `(0.5, 0.5)` places the anchor point halfway (50%) through the object both horizontally and vertically, and any changes to its [position](#position) or [size](#size) both move and scale outward from this point.

<Grid container spacing={2}>
  <Grid item>
		<img src="../assets/ui/general/Anchor-Points.png" width="400" />
	</Grid>
	<Grid item>
		<img src="../assets/ui/general/Anchor-Point-Scaling.png" width="400" />
	</Grid>
</Grid>

To view and edit the anchor point of a selected `Class.GuiObject`:

1. In the [Properties](../studio/properties.md) window, click inside the **AnchorPoint** field.

   <img src="../assets/studio/properties/GuiObject-AnchorPoint.png" width="320" />

2. Enter a new `Datatype.Vector2` coordinate and press <kbd>Enter</kbd>.

	 <Alert severity="success">
	 Studio infers the intended value pair when a single number is entered. For example, entering simply `0.5` will be converted to `0.5, 0.5` for a center anchor point.
   </Alert>

### ZIndex

The `Class.GuiObject.ZIndex|ZIndex` property defines the layer order in which `Class.GuiObject|GuiObjects` render and overlap each other. If you want to create new rendering layers, you must set the `Class.GuiObject.ZIndex|ZIndex` property to different positive or negative integer values for each object.

For UI containers like `Class.ScreenGui`, the default `Class.ScreenGui.ZIndexBehavior|ZIndexBehavior` always renders children above their parents, and each child's `Class.GuiObject.ZIndex|ZIndex` is used to decide the order in which it renders over others.

To edit an object's `Class.GuiObject.ZIndex|ZIndex`, locate **ZIndex** in the [Properties](../studio/properties.md) window and enter a new integer value.

<img src="../assets/studio/properties/GuiObject-ZIndex.png" width="320" />

## Layout Structures

Layout structures let you quickly organize and display `Class.GuiObject|GuiObjects`, for example into a horizontal or vertical [list](../ui/list-flex-layouts.md), a [grid](../ui/grid-table-layouts.md#grid-layout) of equally‑sized tiles, a [page sequence](../ui/page-layouts.md), and more. Layouts typically override or influence the [position](#position)/[size](#size) of objects under their control.

<table>
<thead>
  <tr>
    <th>Layout</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>[List](../ui/grid-table-layouts.md#grid-layout)</td>
    <td>`Class.UIListLayout` positions sibling `Class.GuiObject|GuiObjects` into horizontal rows or vertical columns within their parent container.</td>
  </tr>
	<tr>
    <td>[Grid](../ui/grid-table-layouts.md#grid-layout)</td>
    <td>`Class.UIGridLayout` positions sibling `Class.GuiObject|GuiObjects` in a grid of uniform cells of the same size within their parent container.</td>
  </tr>
	<tr>
    <td>[Table](../ui/grid-table-layouts.md#table-layout)</td>
    <td>`Class.UITableLayout` positions sibling `Class.GuiObject|GuiObjects` and their children into table format.</td>
  </tr>
	<tr>
    <td>[Page](../ui/page-layouts.md)</td>
    <td>`Class.UIPageLayout` organizes its sibling `Class.GuiObject|GuiObjects` into unique pages that you can transition to through scripting.</td>
  </tr>
</tbody>
</table>

## Cross-Platform Factors

Roblox is inherently cross-platform as players can discover and join experiences on a PC, then later pick up their phone and continue where they left off. You should design your Roblox experiences to be accessible and enjoyable on **all** platforms that you choose to support, instead of optimizing for one platform and neglecting others.

### Reserved Zones

On mobile devices, the default controls occupy a portion of the bottom-left and bottom-right corners of the screen. When you design an experience's UI, avoid placing important info or virtual buttons in these zones.

<img src="../assets/ui/cross-platform-design/Reserved-Zones.jpg" width="840" />

<Alert severity="warning">
If your experience uses the default control setting of `Enum.DevTouchMovementMode|DevTouchMovementMode.UserChoice`, players on mobile devices will be able to choose their input from **Dynamic&nbsp;Thumbstick**, **Classic&nbsp;Thumbstick**, or **Tap&nbsp;to&nbsp;Move**, causing the on-screen controls and reserved zones to vary slightly. Remember to design your UI around this possibility.
</Alert>

### Thumb Zones

Most mobile players use two thumbs &mdash; one on the virtual thumbstick and one on the jump button. Depending on the physical size of the device and the player's hands, "reaching" too far from the bottom corners becomes uncomfortable or impossible, so you should avoid placing frequently‑used buttons outside of easy‑to‑reach zones.

<Grid container spacing={3} alignItems="flex-end">
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Thumb-Zones-Safe.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Button comfortably within reach of player's right thumb
</Alert>
</Grid>
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Thumb-Zones-Unsafe.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="error">
Button difficult to reach unless player stretches hand or thumb
</Alert>
</Grid>
</Grid>
<br />

Remember that comfortable thumb zones differ between phones and tablets because tablets have a larger screen. A button placed 30% below the screen's top edge is reachable on a phone but almost unreachable on a tablet.

<Grid container spacing={3} alignItems="flex-end">
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Adaptable-UI-Phone.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Button 30% from top edge of phone, within reach of player's thumb
</Alert>
</Grid>
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<img src="../assets/ui/cross-platform-design/Adaptable-UI-Tablet.png" width="90%" style={{marginBottom:"0px;"}} />
<Alert severity="error">
Button 30% from top edge of tablet, difficult to reach without stretching
</Alert>
</Grid>
</Grid>

A reliable approach on both phones and tablets is **relative** positioning of custom buttons near frequently‑used controls like the default jump button, placing them within easy reach.

<img src="../assets/ui/cross-platform-design/Custom-Buttons-Near-Jump.jpg" width="800" />

The following code, placed in a client-side script within `Class.StarterPlayerScripts`, fetches the position of the jump button and creates a placeholder [button](../ui/buttons.md) 20 pixels to its left.

```lua title='Client Script - Custom Button Near Jump Button'
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local PlayerGui = player.PlayerGui

if UserInputService.TouchEnabled then
	-- Get reference to the default jump button
	local TouchGui = PlayerGui:WaitForChild("TouchGui")
	local TouchControlFrame = TouchGui:WaitForChild("TouchControlFrame")
	local JumpButton = TouchControlFrame:WaitForChild("JumpButton")

	-- Place custom button to left of jump button
	local customButton = Instance.new("ImageButton")
	customButton.AnchorPoint = Vector2.new(1, 0)
	customButton.Size = UDim2.fromOffset(JumpButton.Size.X.Offset, JumpButton.Size.Y.Offset)
	customButton.Position = JumpButton.Position - UDim2.fromOffset(20, 0)
	customButton.Parent = TouchControlFrame
else
	warn("Device is not touch-enabled!")
end
```

### Context-Based UI

Screen space is limited on mobile devices, so you should show only the most vital information during active gameplay. For example, if your experience includes a special input action to open doors and treasure chests, it doesn't make sense to constantly show an "Open" button on the screen. Instead, use a [proximity prompt](../ui/proximity-prompts.md) or similar method to accept input only when the character approaches a door or chest.

<figure>
  <img src="../assets/ui/cross-platform-design/Context-UI-Custom-Button.jpg" width="800" />
  <figcaption>Custom button that you display only when character is near chest</figcaption>
</figure>
