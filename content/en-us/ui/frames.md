---
title: Frames
description: Frames are containers for GuiObjects.
---

Frames are `Class.GuiObject|GuiObjects` that act as containers for other `Class.GuiObject|GuiObjects`. You can use them for UI that either displays on a [user's screen](../ui/on-screen-containers.md) or on a [surface](../ui/in-experience-containers.md) within your experience.

When you manipulate frames, you also manipulate the `Class.GuiObject|GuiObjects` they contain. For example, if you change the position of a `Class.Frame` object with a child [TextLabel](./labels.md#textlabel), you also change the position of the [TextLabel](./labels.md#textlabel). In addition, all frames are also `Class.GuiObject|GuiObjects`, so you can customize their properties, such as `Class.GuiObject.BackgroundColor3|BackgroundColor3`, `Class.GuiObject.BorderMode|BorderMode`, `Class.GuiObject.Transparency|Transparency`, and `Class.GuiObject.Rotation|Rotation`, to fit the aesthetics of your experience.

<img src="../assets/ui/container-frames/Frame-Example.jpg" width="800" />

## Frame Types

### Frame

A `Class.Frame` is a plain, empty rectangle. If you parent `Class.GuiObject|GuiObjects` to the `Class.Frame`, they display within the rectangle. Aside from its common use as a container, you can also use a `Class.Frame` for background design on a screen. For example, to visually separate other UI elements, you can scale a `Class.Frame` to be thin and long until it becomes a line, or create multiple Frames with different `Class.GuiObject.BackgroundColor3|BackgroundColor3` properties.

<img src="../assets/ui/container-frames/Frame-Screen-Empty.jpg" width="800" />

### ScrollingFrame

A `Class.ScrollingFrame` is a frame made up of two elements: a customizable **canvas** and **scroll bar**. This type of frame lets you display a lot of information for a user to reference in a confined space, and it's useful for menus and lists, such as:

- A list of inventory items.
- A list of players within the experience.
- A terms and conditions dialog.
- An accessibility settings menu.

<img src="../assets/ui/container-frames/ScrollingFrame-Example.jpg" width="800" />

You can set the position and size of a `Class.ScrollingFrame` through its respective `Class.GuiObject.Position|Position` and `Class.GuiObject.Size|Size` properties. Note that the scrollbar takes up a portion of the `Class.ScrollingFrame`'s size.

#### Canvas

The **canvas** is the area inside of a `Class.ScrollingFrame` that is able to contain other `Class.GuiObject|GuiObjects`. If one of the dimensions of the canvas is wider than the overall size of the `Class.ScrollingFrame`, the scroll bar is visible, otherwise it is hidden.

The `Class.ScrollingFrame.CanvasSize|CanvasSize` property determines how large of area you can scroll through, not the size of the `Class.ScrollingFrame` itself. If you need to know how big the actual viewing area is in a `Class.ScrollingFrame`, you can access it using the read-only property `Class.ScrollingFrame.AbsoluteWindowSize`.

The `Class.ScrollingFrame.CanvasPosition|CanvasPosition` property determines your default position within the canvas in pixels, and it sets the scroll bar position accordingly. Note that this property doesn't do anything when the scroll bar isn't visible.

#### Scroll Bar

The **scroll bar** displays your position within the content of the `Class.ScrollingFrame` that isn't visible. There are two types of scroll bars: a vertical scroll bar and a horizontal scroll bar. A vertical scroll bar allows you to scroll up and down, while a horizontal scroll bar allows you to scroll left and right.

Using the `Class.ScrollingFrame.VerticalScrollBarPosition|VerticalScrollBarPosition` property, you can switch a vertical scroll bar's position either to the left or right of the canvas.

Scroll bars are made up of three images:

- **Top** - An image that displays on top of the scroll bar's thumb.
- **Middle** - An image that displays **as the thumb** of the scroll bar.
- **Bottom** - An image that displays on the bottom of the scroll bar's thumb.

You can customize these images through a scroll bar's respective `Class.ScrollingFrame.TopImage|TopImage`, `Class.ScrollingFrame.MidImage|MidImage`, and `Class.ScrollingFrame.BottomImage|BottomImage` properties. Note that a vertical and a horizontal scroll bar use the same images, but the horizontal scroll bar rotates the images from the vertical scroll bar by 90 degrees counterclockwise.

Each image scales based on the `Class.ScrollingFrame.ScrollBarThickness|ScrollBarThickness` property, which changes the width of a vertical scroll bar or the height of a horizontal scroll bar. This property also determines the width and height of the top and bottom scroll bar images, as well as the thickness of the middle image. However, a middle image's length scales based on both the size of the `Class.ScrollingFrame` and the canvas.

### VideoFrame

A `Class.VideoFrame` is a frame that renders a moving video image. Adding a video to a user's screen or a part can add new depth to your experience, such as adding a video to a television screen model.

<video src="../assets/ui/container-frames/VideoFrame-Demo.mp4" controls
width="800" />

### ViewportFrame

A `Class.ViewportFrame` is a frame that uses a camera to render 3D objects. This type of frame is a great way to display 3D objects and models in a 2D space, such as:

- A minimap of your experience directly in the corner of a user's screen.
- Models of items in a menu.
- Rotating objects that a character has equipped.

## Creating Frames

The process for creating a frame is similar for all frame types. You just need to specify the [frame type](#frame-types) when you insert it into the `Class.ScreenGui` or `Class.SurfaceGui` object.

To add a frame to a screen:

1. In the **Explorer** window, select **StarterGui** and add a **ScreenGui**.

   1. Hover over **StarterGui** and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **ScreenGui**.

2. Select the new **ScreenGui** and add a frame.

   1. Hover over **ScreenGui** and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a frame.

To add a frame to the face of a part:

1. In the **Explorer** window, select a part and add a **SurfaceGui**.

   1. Hover over the part and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **ScreenGui**.

2. Select the new **SurfaceGui** and add a frame.

   1. Hover over **SurfaceGui** and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a frame.

   <Alert severity="warning">
   If you don't see the frame, try <a href="../parts/textures-decals.md#choosing-a-face">choosing a different face</a> in the <b>Face</b> property of the <b>SurfaceGui</b>.
   </Alert>

## Inserting Videos into VideoFrames

Before you insert a video into a `Class.VideoFrame`, you need to have the asset ID of the video you would like to play.

To insert a video into a VideoFrame:

1. In the **Creator Marketplace**, get the asset ID of the video you want to insert into a VideoFrame.

   1. Navigate to the **View** tab and select **Toolbox**. The Toolbox window displays.
   1. In the top-left corner within the **Marketplace** tab, select the filter dropdown and choose **Videos**.
   1. (Optional) In the top-right corner of each tile, click the **Inspect** icon to preview the video and see its dimensions.
   1. Right-click on the video asset you want. A pop-up menu displays.
   1. Select **Copy Asset ID**.

2. In the **Explorer** window, select a **VideoFrame** instance.

3. In the **Properties** window, paste an asset ID into the **Video** property.

4. Customize any applicable video property to suit your needs:

   - If you want the video to play as soon as a user starts the experience, enable the **Playing** property checkbox.

   - If you want the video to loop, enable the **Looped** property checkbox.

   - If you want to make the video louder, set a higher value in the **Volume** property.

   - If you want the video to start from a different point other than the
     beginning of the video, set a value in seconds in the **TimePosition**
     property. For example, if you set this property to 2, the video will start
     from 2 seconds after the beginning of the video.

## Controlling Object Movement in ViewportFrames

3D objects that users view through a `Class.ViewportFrame` can either move with their camera, remain static, or rotate within the `Class.ViewportFrame`.

### With Camera

If you want the 3D object to move with the camera:

1. Position your view within your experience so that the object you want to see within the ViewportFrame is visible.

2. [Add a **ViewportFrame** to your screen](#creating-frames).

3. Select the **ViewportFrame**.

4. In the **Properties** window, assign the **CurrentCamera** property to the camera:

   1. Select the **CurrentCamera** property. Your cursor changes.

   1. In the **Explorer** window, select your **camera**.

5. In the **Explorer** window, select the object that you want to see within the ViewportFrame, then parent it to the ViewportFrame. If you still want to see the object within your experience, you must duplicate it in the **Workspace**, then parent the duplicate object to the ViewportFrame.

When you move your camera, the object will also move within the `Class.ViewportFrame`.

<Alert severity="error">
  When you want to update the view of your `Class.ViewportFrame`, be sure to update the camera, <b>not</b> the objects within the view.
</Alert>

### Static

If you want the 3D object to remain static:

1. Position your view within your experience so that the object is in the position you want to see within the ViewportFrame.

2. In the **Explorer** window, duplicate the **camera**.

3. Rename the camera object.

4. Select the **ViewportFrame**.

5. In the **Properties** window, assign the **CurrentCamera** property to the new camera:

   1. Select the **CurrentCamera** property. Your cursor changes.

   1. In the **Explorer** window, select the new **camera**.

### Rotation

If you want a 3D object, such as a [`part`](../parts/index.md), to rotate on its own within the `Class.ViewportFrame`:

1. [Add a **ViewportFrame** to your screen](#creating-frames).

2. Select the **ViewportFrame** and add a **part** and a **LocalScript**. The **LocalScript** displays.

   1. Hover over StarterGui and click the &CirclePlus; button. A contextual menu displays.

   1. From the menu, insert a **part** and a **LocalScript**.

3. Copy and paste the following code sample into the LocalScript:

```lua
local viewportFrame = script.Parent

-- Parameters to play with
local cameraDistance = 10
local cameraFieldOfView = 50
local objectPitchAngle = 40
local objectRotationSpeed = 100

-- Viewport camera initialization
local viewportCamera = Instance.new("Camera")
viewportCamera.FieldOfView = cameraFieldOfView
viewportCamera.Parent = viewportFrame
viewportFrame.CurrentCamera = viewportCamera

-- Viewport object initialization
local object = viewportFrame.Part
object.CFrame = CFrame.new(0, 0, 0)*CFrame.Angles(math.rad(objectPitchAngle), 0, 0)

-- Update loop
game:GetService("RunService").Heartbeat:Connect(function()
	local t = os.clock()
	viewportCamera.CFrame = CFrame.Angles(0, math.rad(t*objectRotationSpeed), 0) * CFrame.new(0, 0, cameraDistance)
end)
```
