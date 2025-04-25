---
title: In-experience UI containers
description: In-experience UI containers hold SurfaceGuis, BillboardGuis, and GuiObjects that you want to display in the 3D space.
---

In-experience UI containers hold `Class.GuiObject|GuiObjects` that you want to display within your experience's 3D world.

- A `Class.SurfaceGui` allows for the rendering of UI objects onto a part's surface in the 3D world while also allowing for basic user interaction to occur.
- A `Class.BillboardGui` is a container for UI objects to appear in the 3D space but always face the camera.

<video src="../assets/ui/in-experience/Showcase.mp4" controls width="100%"></video>

## Surface UI

Similar to `Class.Decal|Decals` and `Class.Texture|Textures`, UI objects such as `Class.TextLabel|TextLabels` and `Class.ImageLabel|ImageLabels` parented to a `Class.SurfaceGui` face the same direction as the surface they're on, editable through the `Class.SurfaceGui.Face` property.

<img src="../assets/ui/in-experience/SurfaceGui-Diagram.jpg" width="800" alt="SurfaceGui on a 3D part in the place with an ImageLabel child to depict a screen console." />

To apply a `Class.SurfaceGui` to an in-experience `Class.BasePart`, simply parent it to that part and set the `Class.SurfaceGui.Face` property. Child UI objects then appear on that face of the parent part.

<Grid container spacing={2} alignItems="top">
	<Grid item>
		<img src="../assets/studio/explorer/Part-SurfaceGui-ImageLabel.png" width="320" />
	</Grid>
	<Grid item>
		<img src="../assets/studio/properties/SurfaceGui-Face-Top.png" width="320" />
	</Grid>
</Grid>

Alternatively, you can place the `Class.SurfaceGui` inside a container like `Class.StarterGui` and then set its `Class.SurfaceGui.Adornee|Adornee` property to any `Class.BasePart`, as well as the target `Class.SurfaceGui.Face|Face`. Setting `Class.SurfaceGui.Adornee|Adornee` overrides direct parent association, allowing for more flexibility in placement since it can be set from a script during runtime.

<Grid container spacing={2} alignItems="top">
	<Grid item>
		<img src="../assets/studio/explorer/StarterGui-SurfaceGui.png" width="320" />
	</Grid>
	<Grid item>
		<img src="../assets/studio/properties/SurfaceGui-Adornee-Face.png" width="320" />
	</Grid>
</Grid>

<Alert severity="warning">
Interactive UI elements like `Class.ImageButton|ImageButtons` and `Class.TextButton|TextButtons` inside a `Class.SurfaceGui` will only receive user input if they are parented to the player's `Class.PlayerGui`, typically via placing the `Class.SurfaceGui` inside `Class.StarterGui` as noted above. Additionally, the part's `Class.BasePart.CanQuery|CanQuery` property must be `true` for the interactive UI element to receive input.
</Alert>

<Alert severity="success">
To assist in choosing the correct face for a `Class.SurfaceGui`, right-click the target part and select **Show&nbsp;Orientation&nbsp;Indicator**. This displays a blue circle with an **F** and a line attached to the object's `Enum.NormalId.Front|Front` face, and a green arrow that points in the direction of the object's `Enum.NormalId.Top|Top` face.
</Alert>

### Size and position

The "canvas" of a `Class.SurfaceGui` occupies the entire `Class.SurfaceGui.Face|Face` of the parent or `Class.SurfaceGui.Adornee|Adornee` part. As a best practice, it's recommended that you use **scale** values for the [size](../ui/position-and-size.md#size) and [position](../ui/position-and-size.md#position) of child UI objects like `Class.ImageLabel|ImageLabels`. You can also apply a `Class.UIAspectRatioConstraint` to children of the `Class.SurfaceGui` to maintain their desired aspect ratio regardless of the face's size.

<video src="../assets/ui/in-experience/SurfaceGui-Sizing.mp4" controls width="90%"></video>

### Occlusion mode

The `Class.SurfaceGui.AlwaysOnTop|AlwaysOnTop` property determines whether the `Class.SurfaceGui` will render over top of 3D content or be occluded by it. When set to `false` (default), the `Class.SurfaceGui` renders like other 3D content and is occluded by other 3D objects. When set to `true`, it always renders over top of 3D content and it is not influenced by [brightness/light](#brightness-and-light-influence) in the 3D environment.

### Brightness and light influence

`Class.SurfaceGui.Brightness|Brightness` and `Class.SurfaceGui.LightInfluence|LightInfluence` work in conjunction to determine how environmental light affects the UI content of the `Class.SurfaceGui`.

`Class.SurfaceGui.Brightness|Brightness` determines the factor by which emitted light is scaled in a range of `0` to `1000`, letting you match the `Class.SurfaceGui` to its environment. For instance, a video billboard can be brightened inside a dark room by increasing `Class.SurfaceGui.Brightness|Brightness` to `10`.

`Class.SurfaceGui.LightInfluence|LightInfluence` controls how much the `Class.SurfaceGui` is influenced by lighting in the place, in a range from `0` to `1`. Setting this to `1` means that surrounding lighting has complete control over the appearance, while setting it to `0` means that the lighting has no effect.

<Tabs>
<TabItem label="Brightness = 0">
<img src="../assets/ui/in-experience/SurfaceGui-Brightness-0.jpg" width="800" height="450" />
</TabItem>
<TabItem label="Brightness = 10">
<img src="../assets/ui/in-experience/SurfaceGui-Brightness-10.jpg" width="800" height="450" />
</TabItem>
</Tabs>

<Alert severity="warning">
Note that `Class.SurfaceGui.Brightness|Brightness` is inaccessible in Studio and has no effect when either `Class.SurfaceGui.LightInfluence|LightInfluence` is `1` or `Class.SurfaceGui.AlwaysOnTop|AlwaysOnTop` is `true`.
</Alert>

### Distance visibility

`Class.SurfaceGui.MaxDistance|MaxDistance` controls how far from the camera the `Class.SurfaceGui` will be displayed before it stops rendering. A value of `0` means there is no limit and it will render infinitely far away. The default value of `1000` works fine for most cases.

For `Class.SurfaceGui|SurfaceGuis` that appear outdoors, it's recommended that `Class.SurfaceGui.MaxDistance|MaxDistance` is high enough to ensure that the container's UI is sufficiently small on the screen when it appears or disappears, minimizing the sudden pop‑in/out effect.

### Display order

If multiple `Class.SurfaceGui` containers exist on the same face, you can layer them by Z‑index through their `Class.SurfaceGui.ZOffset|ZOffset` property (changing this does not visually "lift" or "sink" the container from the surface).

## Billboard UI

The `Class.BillboardGui` container displays UI objects in the 3D space but, unlike `Class.SurfaceGui`, children of a `Class.BillboardGui` always face the camera. This container is useful for displaying front‑facing info above in‑experience objects such as health meters or names above player characters, markers to guide players to an object in the 3D world, and more.

<img src="../assets/ui/in-experience/BillboardGui-Diagram.jpg" width="800" alt="BillboardGui with a TextLabel describing the screen console it floats above." />

To link a `Class.BillboardGui` to an in-experience `Class.BasePart` or `Class.Attachment`, simply parent it to that part or attachment and, if desired, adjust its [size/position](#size-and-position-1).

<Grid container spacing={2} alignItems="top">
	<Grid item>
		<img src="../assets/studio/explorer/Part-BillboardGui-ImageLabel.png" width="320" />
	</Grid>
	<Grid item>
		<img src="../assets/studio/explorer/Part-Attachment-BillboardGui-ImageLabel.png" width="320" />
	</Grid>
</Grid>

Alternatively, you can place the `Class.BillboardGui` inside a container like `Class.StarterGui` and then set its `Class.BillboardGui.Adornee|Adornee` property to any `Class.BasePart` or `Class.Attachment`. This method offers more flexibility in placement since `Class.BillboardGui.Adornee|Adornee` can be set from a script during runtime, for example to place a `Class.BillboardGui` over the head of player characters during runtime.

<Alert severity="warning">
Interactive UI elements like `Class.ImageButton|ImageButtons` and `Class.TextButton|TextButtons` inside a `Class.BillboardGui` will only receive user input if they are parented to the player's `Class.PlayerGui`, typically via placing the `Class.BillboardGui` inside `Class.StarterGui` as noted above.
</Alert>

### Size and position

For billboard sizing, the [scale](../ui/position-and-size.md#size) components of the `Class.BillboardGui.Size|Size` property set the billboard's stud size in 3D space. For example, a setting of <Typography noWrap>`{10, 0},{2, 0}`</Typography> <Typography noWrap>(`Datatype.UDim2.fromScale(10, 2)`)</Typography> forms a billboard with a 10:2 aspect ratio that scales larger or smaller depending on its distance from the camera.

For positioning, the `Class.BillboardGui.StudsOffset|StudsOffset` property shifts the billboard canvas on the **X** axis (left/right), **Y** axis (up/down), and **Z** axis (forward/back) relative to the camera.

<video src="../assets/ui/in-experience/BillboardGui-Sizing-Positioning.mp4" controls width="90%"></video>

<Alert severity="success">
When creating a size-scaled `Class.BillboardGui` that contains a `Class.TextLabel`, it's useful to enable the label's `Class.TextLabel.TextScaled|TextScaled` property so that its text scales along with the billboard canvas as the camera distance changes.
</Alert>

### Occlusion mode

The `Class.BillboardGui.AlwaysOnTop|AlwaysOnTop` property determines whether the `Class.BillboardGui` will render over top of 3D content or be occluded by it. When set to `false` (default), the `Class.BillboardGui` renders like other 3D content and is occluded by other 3D objects. When set to `true`, it always renders over top of 3D content and it is not influenced by [brightness/light](#brightness-and-light-influence-1) in the 3D environment.

### Brightness and light influence

`Class.BillboardGui.Brightness|Brightness` and `Class.BillboardGui.LightInfluence|LightInfluence` work in conjunction to determine how environmental light affects the UI content of the `Class.BillboardGui`.

`Class.BillboardGui.Brightness|Brightness` determines the factor by which emitted light is scaled in a range of `0` to `1000`, letting you match the `Class.BillboardGui` to its environment. For instance, a video billboard can be brightened inside a dark room by increasing `Class.BillboardGui.Brightness|Brightness` to `10`.

`Class.BillboardGui.LightInfluence|LightInfluence` controls how much the `Class.BillboardGui` is influenced by lighting in the place, in a range from `0` to `1`. Setting this to `1` means that surrounding lighting has complete control over the appearance, while setting it to `0` means that the lighting has no effect.

<Tabs>
<TabItem label="LightInfluence = 1">
<img src="../assets/ui/in-experience/BillboardGui-LightInfluence-1.jpg" width="800" height="450" />
</TabItem>
<TabItem label="LightInfluence = 0">
<img src="../assets/ui/in-experience/BillboardGui-LightInfluence-0.jpg" width="800" height="450" />
</TabItem>
</Tabs>

<Alert severity="warning">
Note that `Class.BillboardGui.Brightness|Brightness` is inaccessible in Studio and has no effect when either `Class.BillboardGui.LightInfluence|LightInfluence` is `1` or `Class.BillboardGui.AlwaysOnTop|AlwaysOnTop` is `true`.
</Alert>

### Distance visibility

`Class.BillboardGui.MaxDistance|MaxDistance` controls how far from the camera the `Class.BillboardGui` will be displayed before it stops rendering. A value of `0` or `inf` (default) means there is no limit and it will render infinitely far away.
