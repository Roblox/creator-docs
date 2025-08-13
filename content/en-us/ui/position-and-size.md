---
title: Position and size UI objects
description: Explains the process of positioning, sizing, and ordering UI objects on a player's screen.
---

Unless UI objects are under control of a [layout structure](#layout-structures) or a [size modifier/constraint](../ui/size-modifiers.md), you have complete control over their [position](#position) and [size](#size). You can also set the Z‑index [layering](#zindex) order in which objects overlap.

## Core properties

All `Class.GuiObject|GuiObjects` share a core set of properties to [position](#position), [size](#size), [anchor](#anchorpoint), and [layer](#zindex) them within an on‑screen or in‑experience container.

### Position

The `Class.GuiObject.Position|Position` property is a `Datatype.UDim2` coordinate set that positions the object along the **X** and **Y** axes. A `Datatype.UDim2` is represented by both `Datatype.UDim.Scale|Scale` and `Datatype.UDim.Offset|Offset` values for each axis:

- `Datatype.UDim.Scale|Scale` values represent a **percentage** of the container's size along the corresponding axis, additive of any `Datatype.UDim.Offset|Offset` values.
- `Datatype.UDim.Offset|Offset` values represent how many **pixels** to shift the object on the corresponding axis, additive of any `Datatype.UDim.Scale|Scale` values.

<figure>
<img src="../assets/ui/misc/UDim2-Components.png" width="334" />
</figure>

To edit the position of a selected `Class.GuiObject`, click the **Position** field in the [Properties](../studio/properties.md) window and enter a new `Datatype.UDim2` coordinate set.

<img src="../assets/studio/properties/GuiObject-Position.png" width="320" />

<img src="../assets/ui/misc/Scale-Offset-Positioning.png" width="840" />

<Alert severity="success">
Brackets and spaces are **optional** when entering a `Datatype.UDim2` in Studio&nbsp;&mdash; you can simply enter the four values separated by commas, for instance `0.25,40,0.1,20`, and Studio will infer the intended value set.

Studio also infers the intended value set when a single number is entered. For example, entering simply `0.5` will be converted to <Typography noWrap>`{0.5, 0},{0.5, 0}`</Typography> since `0.5` is likely a **Scale** value of 50%. Conversely, entering `20` will be converted to <Typography noWrap>`{0, 20},{0, 20}`</Typography> since `20` is likely an **Offset** value of 20 pixels and not a scale of 2000%.
</Alert>

### Size

The `Class.GuiObject.Size|Size` property is a `Datatype.UDim2` coordinate set that sizes the object along the **X** and **Y** axes. A `Datatype.UDim2` is represented by both `Datatype.UDim.Scale|Scale` and `Datatype.UDim.Offset|Offset` values for each axis:

- **Scale** &mdash; Values that represent a **percentage** of the container's size along the corresponding axis, additive to any **Offset** values.
- **Offset** &mdash; Values that represent the object's **pixel** size along the corresponding axis, additive to any **Scale** values.

To edit the size of a selected `Class.GuiObject`, click the **Size** field in the [Properties](../studio/properties.md) window and enter a new `Datatype.UDim2` coordinate set.

<img src="../assets/studio/properties/GuiObject-Size.png" width="320" />

<img src="../assets/ui/misc/Scale-Sizing.png" width="840" />

<Alert severity="success">
Brackets and spaces are **optional** when entering a `Datatype.UDim2` in Studio&nbsp;&mdash; you can simply enter the four values separated by commas, for instance `0.75,0,0.25,0`, and Studio will infer the intended value set.

Studio also infers the intended value set when a single number is entered. For example, entering simply `0.5` will be converted to <Typography noWrap>`{0.5, 0},{0.5, 0}`</Typography> since `0.5` is likely a **Scale** value of 50%. Conversely, entering `20` will be converted to <Typography noWrap>`{0, 20},{0, 20}`</Typography> since `20` is likely an **Offset** value of 20 pixels and not a scale of 2000%.
</Alert>

### AnchorPoint

The `Class.GuiObject.AnchorPoint|AnchorPoint` property defines the **origin point** from where the object changes [position](#position) and [size](#size). The default `Class.GuiObject.AnchorPoint|AnchorPoint` values are <Typography noWrap>`(0, 0)`</Typography> which places the anchor in the top‑left corner of the object.

`Class.GuiObject.AnchorPoint|AnchorPoint` values are a **fraction** from `0` to `1`, relative to the [size](#size) of the object, meaning an object with `Class.GuiObject.AnchorPoint|AnchorPoint` values of <Typography noWrap>`(0.5, 0.5)`</Typography> places the anchor point halfway (50%) through the object both horizontally and vertically, and any changes to its [position](#position) or [size](#size) both move and scale outward from this point.

<Grid container spacing={2}>
  <Grid item>
		<img src="../assets/ui/misc/Anchor-Points.png" width="400" />
	</Grid>
	<Grid item>
		<img src="../assets/ui/misc/Anchor-Point-Scaling.png" width="400" />
	</Grid>
</Grid>

To view and edit the anchor point of a selected `Class.GuiObject`:

1. In the [Properties](../studio/properties.md) window, click inside the **AnchorPoint** field.

   <img src="../assets/studio/properties/GuiObject-AnchorPoint.png" width="320" />

2. Enter a new `Datatype.Vector2` coordinate and press <kbd>Enter</kbd>.

    <Alert severity="success">
    Studio infers the intended value pair when a single number is entered. For example, entering simply `0.5` will be converted to <Typography noWrap>`0.5, 0.5`</Typography> for a center anchor point.
   </Alert>

### ZIndex

The `Class.GuiObject.ZIndex|ZIndex` property defines the layer order in which `Class.GuiObject|GuiObjects` render and overlap each other. If you want to create new rendering layers, you must set the `Class.GuiObject.ZIndex|ZIndex` property to different positive or negative integer values for each object.

For UI containers like `Class.ScreenGui`, the default `Class.ScreenGui.ZIndexBehavior|ZIndexBehavior` always renders children above their parents, and each child's `Class.GuiObject.ZIndex|ZIndex` is used to decide the order in which it renders over others.

To edit an object's `Class.GuiObject.ZIndex|ZIndex`, locate **ZIndex** in the [Properties](../studio/properties.md) window and enter a new integer value.

<img src="../assets/studio/properties/GuiObject-ZIndex.png" width="320" />

## Layout structures

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

## Cross-platform factors

Roblox is inherently [cross‑platform](../projects/cross-platform.md), as players can discover and join experiences on their phone or tablet, then later continue where they left off on their PC or console. You should design your Roblox experiences to be accessible and enjoyable on **all** platforms that you choose to support, instead of optimizing for one platform and neglecting others.

### Reserved zones

On mobile devices, the default controls occupy a portion of the bottom-left and bottom-right corners of the screen. When you design an experience's UI, avoid placing important info or virtual buttons in these zones.

<img src="../assets/ui/misc/Touch-Reserved-Zones.png" width="840" />

### Thumb zones

Most mobile players use two thumbs &mdash; one on the virtual thumbstick and one on the jump button. Depending on the physical size of the device and the player's hands, reaching too far from the bottom corners becomes uncomfortable or impossible, so you should avoid placing frequently‑used buttons outside of easy‑to‑reach zones.

<Grid container spacing={3} alignItems="flex-end">
<Grid item XSmall={12} Medium={12} Large={12} XLarge={6} XXLarge={6}>
<img src="../assets/ui/misc/Thumb-Zones-Phone-Reachable.png" width="100%" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Button comfortably within reach of player's right thumb
</Alert>
</Grid>
<Grid item XSmall={12} Medium={12} Large={12} XLarge={6} XXLarge={6}>
<img src="../assets/ui/misc/Thumb-Zones-Phone-Non-Reachable.png" width="100%" style={{marginBottom:"0px;"}} />
<Alert severity="warning">
Button difficult to reach unless player stretches hand or thumb
</Alert>
</Grid>
</Grid>
<br />

Remember that comfortable thumb zones differ between phones and tablets because tablets have a larger screen. A button placed 40% below the screen's top edge is reachable on a phone but almost unreachable on a tablet.

<Grid container spacing={3} alignItems="flex-end">
<Grid item XSmall={12} Medium={12} Large={12} XLarge={6} XXLarge={6}>
<img src="../assets/ui/misc/Thumb-Zones-Tablet-Reachable.png" width="100%" style={{marginBottom:"0px;"}} />
<Alert severity="success">
Button 40% from top edge of phone, within reach of player's thumb
</Alert>
</Grid>
<Grid item XSmall={12} Medium={12} Large={12} XLarge={6} XXLarge={6}>
<img src="../assets/ui/misc/Thumb-Zones-Tablet-Non-Reachable.png" width="100%" style={{marginBottom:"0px;"}} />
<Alert severity="warning">
Button 40% from top edge of tablet, difficult to reach without stretching
</Alert>
</Grid>
</Grid>

A reliable approach on both phones and tablets is **relative** positioning of custom buttons near frequently‑used controls like the default jump button, placing them within easy reach.

<img src="../assets/ui/misc/Custom-Buttons-Near-Jump.png" width="840" />

The following code, placed in a client-side script within `Class.StarterPlayerScripts`, fetches the position of the jump button and creates a placeholder [button](../ui/buttons.md) 20 pixels to its left.

```lua title="Client Script - Custom Button Near Jump Button"
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

if UserInputService.TouchEnabled then
	-- Wait for jump button to be fully loaded
	while not (playerGui:FindFirstChild("JumpButton", true) and playerGui:FindFirstChild("JumpButton", true).IsLoaded) do
		task.wait()
	end
	local jumpButton = playerGui:FindFirstChild("JumpButton", true)

	-- Place new custom button to left of jump button
	local customButton = Instance.new("ImageButton")
	customButton.AnchorPoint = Vector2.new(1, 1)
	customButton.Size = UDim2.fromOffset(jumpButton.Size.X.Offset * 0.8, jumpButton.Size.Y.Offset * 0.8)
	customButton.Position = jumpButton.Position + UDim2.fromOffset(-20, jumpButton.Size.Y.Offset)
	customButton.Parent = jumpButton.Parent
else
	warn("Device is not touch-enabled or Studio is not emulating a touch-enabled device!")
end
```

### Context-based UI

Screen space is limited on mobile devices, so you should show only the most vital information during active gameplay. For example, if your experience includes a special input action to open doors and treasure chests, it doesn't make sense to constantly show an "open" button on the screen. Instead, use a [proximity prompt](../ui/proximity-prompts.md) or similar method to accept input only when the character approaches a door or chest.

<figure>
  <img src="../assets/ui/misc/Contextual-Button.png" width="840" />
  <figcaption>Custom button that you display only when character is near a door or chest</figcaption>
</figure>
