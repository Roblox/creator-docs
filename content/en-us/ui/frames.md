---
title: Frames
description: Frames are containers for GuiObjects.
---

Frames are `Class.GuiObject|GuiObjects` that act as containers for other `Class.GuiObject|GuiObjects`. You can use them for UI that either displays on a user's [screen](../ui/on-screen-containers.md) or on a [surface](../ui/in-experience-containers.md) within the experience.

When you manipulate frames, you also manipulate the `Class.GuiObject|GuiObjects` they contain. For example, if you change the position of a `Class.Frame` object with a child [TextLabel](./labels.md#textlabel), you also change the position of the [TextLabel](./labels.md#textlabel). In addition, all frames are also `Class.GuiObject|GuiObjects`, so you can customize their properties, such as `Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderMode|BorderMode`, `Class.GuiObject.Transparency|Transparency`, and `Class.GuiObject.Rotation|Rotation`, to fit the aesthetics of your experience.

<img src="../assets/ui/container-frames/Frame-Example.jpg" width="800" />

## Frame Types

There are three primary frame types, each serving a specific purpose in UI design.

### Frame

A `Class.Frame` is a plain, empty rectangle. If you parent `Class.GuiObject|GuiObjects` to the `Class.Frame`, they display within the rectangle. Aside from its common use as a container, you can also use a `Class.Frame` for background design on a screen. For example, to visually separate other UI elements, you can scale a `Class.Frame` to be thin and long until it becomes a line, or create multiple Frames with different `Class.GuiObject.BackgroundColor3|BackgroundColor3` properties.

<img src="../assets/ui/container-frames/Frame-Screen-Empty.jpg" width="800" />

### ScrollingFrame

A `Class.ScrollingFrame` is a frame made up of two elements: a customizable **canvas** and **scroll bar**. This type of frame lets you display a lot of information in a confined space, and it's useful for menus and lists.

<img src="../assets/ui/container-frames/ScrollingFrame-Example.jpg" width="800" />

You can set the position and size of a `Class.ScrollingFrame` through its respective `Class.GuiObject.Position|Position` and `Class.GuiObject.Size|Size` properties. Note that the scrollbar takes up a portion of the `Class.ScrollingFrame` size.

#### Canvas

The **canvas** is the area inside of a `Class.ScrollingFrame` that is able to contain other `Class.GuiObject|GuiObjects`. If one of the dimensions of the canvas is wider than the overall size of the `Class.ScrollingFrame`, the scroll bar is visible, otherwise it is hidden.

The `Class.ScrollingFrame.CanvasSize|CanvasSize` property determines how large of area you can scroll through, not the size of the `Class.ScrollingFrame` itself. If you need to know how big the actual viewing area is in a `Class.ScrollingFrame`, you can access it using the read-only property `Class.ScrollingFrame.AbsoluteWindowSize`.

The `Class.ScrollingFrame.CanvasPosition|CanvasPosition` property determines your default position within the canvas in pixels, and it sets the scroll bar position accordingly. Note that this property doesn't do anything when the scroll bar isn't visible.

#### Scroll Bar

The **scroll bar** displays your position within the content of the `Class.ScrollingFrame` that isn't visible. There are two types of scroll bars: a vertical scroll bar and a horizontal scroll bar. A vertical scroll bar allows you to scroll up and down, while a horizontal scroll bar allows you to scroll left and right.

Using the `Class.ScrollingFrame.VerticalScrollBarPosition|VerticalScrollBarPosition` property, you can switch a vertical scroll bar's position either to the left or right of the canvas.

Scroll bars are made up of three images:

- **Top** — An image that displays on top of the scroll bar's thumb.
- **Middle** — An image that displays as the **thumb** of the scroll bar.
- **Bottom** — An image that displays on the bottom of the scroll bar's thumb.

You can customize these images through a scroll bar's respective `Class.ScrollingFrame.TopImage|TopImage`, `Class.ScrollingFrame.MidImage|MidImage`, and `Class.ScrollingFrame.BottomImage|BottomImage` properties. Note that a vertical and a horizontal scroll bar use the same images, but the horizontal scroll bar rotates the images from the vertical scroll bar by 90 degrees counterclockwise.

Each image scales based on the `Class.ScrollingFrame.ScrollBarThickness|ScrollBarThickness` property, which changes the width of a vertical scroll bar or the height of a horizontal scroll bar. This property also determines the width and height of the top and bottom scroll bar images, as well as the thickness of the middle image. However, a middle image's length scales based on both the size of the `Class.ScrollingFrame` and the canvas.

### ViewportFrame

A `Class.ViewportFrame` is a frame that uses a camera to render 3D objects. This type of frame is a great way to display 3D objects and models in a 2D space, such as:

- A minimap of your experience directly in the corner of a user's screen.
- 3D models of items in an inventory menu.
- Rotating objects that a character has equipped.

3D objects that users view through a `Class.ViewportFrame` can either move with their camera, remain static, or rotate within the `Class.ViewportFrame`.

<Tabs>
<TabItem label="With Camera">

If you want the 3D object to move with the camera:

1. Position your camera view within the experience so that the object you want to see within the frame is visible.
1. Add a new **ViewportFrame** to the [screen](../ui/on-screen-containers.md) and then make sure it's selected in the [Explorer](../studio/explorer.md).
1. In the [Properties](../studio/properties.md) window, assign the **CurrentCamera** property to the camera:

   1. Select the **CurrentCamera** property. Your cursor changes.
   2. In the [Explorer](../studio/explorer.md) window, click on the top-level **Camera** object.

1. Parent the desired 3D object to the new `Class.ViewportFrame`. Note that if you still want to see the object within your experience, you must duplicate it in the **Workspace** and then parent the **duplicate** object to the `Class.ViewportFrame`.

When you move your camera, the object will also move within the `Class.ViewportFrame`.

<Alert severity="warning">
When you want to update the view of your `Class.ViewportFrame`, be sure to update the camera, **not** the objects within the view.
</Alert>

</TabItem>
<TabItem label="Static">

If you want the 3D object to remain static:

1. Position your camera view within the experience so that the object you want to see is in the exact position you want to see it within the frame.
1. In the [Explorer](../studio/explorer.md) window, duplicate the top-level **Camera** object, then rename it to an identifiable name like **ViewportCam**.
1. Add a new **ViewportFrame** to the [screen](../ui/on-screen-containers.md) and then make sure it's selected in the [Explorer](../studio/explorer.md).
1. In the [Properties](../studio/properties.md) window, assign the **CurrentCamera** property to the **duplicated** camera:

   1. Select the **CurrentCamera** property. Your cursor changes.
   2. In the [Explorer](../studio/explorer.md) window, click on the duplicated camera object.

1. Parent the desired 3D object to the new `Class.ViewportFrame`. Note that if you still want to see the object within your experience, you must duplicate it in the **Workspace** and then parent the **duplicate** object to the `Class.ViewportFrame`.

</TabItem>
<TabItem label="Rotation">

If you want a 3D object such as a `Class.BasePart` to rotate on its own within the frame:

1. Add a new **ViewportFrame** to the [screen](../ui/on-screen-containers.md).
2. In the [Explorer](../studio/explorer.md), drag the desired `Class.BasePart` into the new `Class.ViewportFrame`.
3. Insert a new `Class.LocalScript` into the `Class.ViewportFrame` and paste in the following code.

	```lua
	local RunService = game:GetService("RunService")

	local viewportFrame = script.Parent

	-- Parameters to experiment with
	local cameraDistance = 10
	local cameraFieldOfView = 50
	local objectPitchAngle = 40
	local objectRotationSpeed = 50

	-- Viewport camera initialization
	local viewportCamera = Instance.new("Camera")
	viewportCamera.FieldOfView = cameraFieldOfView
	viewportCamera.Parent = viewportFrame
	viewportFrame.CurrentCamera = viewportCamera

	-- Viewport object initialization
	local object = viewportFrame:FindFirstChildWhichIsA("BasePart")
	if object then
		object.CFrame = CFrame.new(0, 0, 0)*CFrame.Angles(math.rad(objectPitchAngle), 0, 0)

		-- Update loop
		local t = 0
		RunService.Heartbeat:Connect(function(delta)
			t += delta
			viewportCamera.CFrame = CFrame.Angles(0, math.rad(t * objectRotationSpeed), 0) * CFrame.new(0, 0, cameraDistance)
		end)
	else
		warn("3D object not found as child of viewport frame")
	end
	```

</TabItem>
</Tabs>
