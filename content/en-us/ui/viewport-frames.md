---
title: Viewport frames
description: ViewportFrames use a camera to render 3D objects into a 2D viewport.
---

A `Class.ViewportFrame` uses a camera to render 3D objects into a 2D viewport. Ideal use cases include:

- A minimap of your experience directly in the corner of a user's screen.
- 3D models of items in an inventory menu.
- Rotating objects that a character has equipped.

## Viewport configurations

3D objects that users view through a `Class.ViewportFrame` can either move with their camera, remain static, or rotate within the `Class.ViewportFrame`. This object can also include a `Class.Sky` child as a cubemap for reflections.

<Tabs>
<TabItem label="With Camera">

If you want a 3D object to move with the camera:

1. Position your camera view within the experience so that the object you want to see within the frame is visible.
2. Add a new `Class.ViewportFrame` to the [screen](../ui/on-screen-containers.md) and then make sure it's selected in the **Explorer**.
3. In the **Properties** window, assign the `Class.ViewportFrame.CurrentCamera|CurrentCamera` property to the camera:

	 1. Select the `Class.ViewportFrame.CurrentCamera|CurrentCamera` property. Your cursor changes.
	 2. In the **Explorer** window, click on the top-level `Class.Camera` object.

4. Parent the desired 3D object to the new `Class.ViewportFrame`. Note that if you still want to see the object within your experience, you must duplicate it in the `Class.Workspace` and then parent the **duplicate** object to the `Class.ViewportFrame`.

When you move your camera, the object will also move within the `Class.ViewportFrame`.

<Alert severity="warning">
When you want to update the view of your `Class.ViewportFrame`, be sure to update the camera, **not** the objects within the view.
</Alert>

</TabItem>
<TabItem label="Static">

If you want the 3D object to remain static:

1. Position your camera view within the experience so that the object you want to see is in the exact position you want to see it within the frame.
2. In the **Explorer** window, duplicate the top-level `Class.Camera` object, then rename it to an identifiable name like `ViewportCam`.
3. Add a new `Class.ViewportFrame` to the [screen](../ui/on-screen-containers.md) and then make sure it's selected in the **Explorer**.
4. In the **Properties** window, assign the frame's `Class.ViewportFrame.CurrentCamera|CurrentCamera` property to the **duplicated** camera:

	 1. Select the `Class.ViewportFrame.CurrentCamera|CurrentCamera` property. Your cursor changes.
	 2. In the **Explorer** window, click on the duplicated camera object.

5. Parent the desired 3D object to the new `Class.ViewportFrame`. Note that if you still want to see the object within your experience, you must duplicate it in the `Class.Workspace` and then parent the **duplicate** object to the `Class.ViewportFrame`.

</TabItem>
<TabItem label="Rotation">

If you want a 3D object such as a `Class.BasePart` to rotate on its own within the frame:

1. Add a new `Class.ViewportFrame` to the [screen](../ui/on-screen-containers.md).
2. In the **Explorer** window, drag the desired `Class.BasePart` into the new `Class.ViewportFrame`.
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
	viewportFrame.CurrentCamera = viewportCamera
	viewportCamera.Parent = viewportFrame

	-- Viewport object initialization
	local object = viewportFrame:FindFirstChildWhichIsA("BasePart")
	if object then
		object.CFrame = CFrame.new(0, 0, 0) * CFrame.Angles(math.rad(objectPitchAngle), 0, 0)

		-- Update loop
		local t = 0
		RunService.PostSimulation:Connect(function(delta)
			t += delta
			viewportCamera.CFrame = CFrame.Angles(0, math.rad(t * objectRotationSpeed), 0) * CFrame.new(0, 0, cameraDistance)
		end)
	else
		warn("3D object not found as child of viewport frame")
	end
	```

</TabItem>
<TabItem label="Skybox Reflections">

`Class.ViewportFrame|ViewportFrames` can use a `Class.Sky` child as a cubemap for reflections, in which case only the `Class.Sky` object's six `Skybox[…]` properties are used. Assuming these properties are valid, lighting inside the `Class.ViewportFrame` acts similarly to when `Class.Lighting.EnvironmentSpecularScale` and `Class.Lighting.EnvironmentDiffuseScale` are both set to `1`.

To implement skybox cubemap reflections:

1. Insert a `Class.Sky` object as a direct child of the `Class.ViewportFrame`.
1. Set the `Class.Sky` object's six texture properties (`Class.Sky.SkyboxBk|SkyboxBk`, `Class.Sky.SkyboxDn|SkyboxDn`, `Class.Sky.SkyboxFt|SkyboxFt`, `Class.Sky.SkyboxLf|SkyboxLf`, `Class.Sky.SkyboxRt|SkyboxRt`, `Class.Sky.SkyboxUp|SkyboxUp`).
1. For `Class.Part|Parts` that should appear within the frame, set their `Class.BasePart.Reflectance|Reflectance` property greater than 0, or use a reflectant material like `Enum.Material.Glass|Glass` or `Enum.Material.Foil|Foil`. For `Class.MeshPart|MeshParts` that should appear within the frame, apply a `Class.SurfaceAppearance` with a properly-configured `Class.SurfaceAppearance.MetalnessMap|MetalnessMap`.

</TabItem>
</Tabs>

## Lighting and appearance

Lighting within a `Class.ViewportFrame` is controlled through three properties:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Class.ViewportFrame.Ambient|Ambient`</td>
      <td>Determines the overall lighting hue applied to the area within the viewport frame. Defaults to <Typography noWrap>`Datatype.Color3.fromRGB(200, 200, 200)`</Typography> (ghost grey).</td>
    </tr>
    <tr>
      <td>`Class.ViewportFrame.LightDirection|LightDirection`</td>
      <td>A `Datatype.Vector3` representing the direction of the light source from position <Typography noWrap>`(0, 0, 0)`</Typography>. Defaults to <Typography noWrap>`(-1, -1, -1)`</Typography>.</td>
    </tr>
    <tr>
      <td>`Class.ViewportFrame.LightColor|LightColor`</td>
      <td>Color of the directional light. Defaults to <Typography noWrap>`Datatype.Color3.fromRGB(140, 140, 140)`</Typography> (silver).</td>
    </tr>
  </tbody>
</table>

Additionally, you can adjust the overall rendered appearance of the viewport throuugh the following properties:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Class.ViewportFrame.ImageColor3|ImageColor3`</td>
      <td>Changes the image color/tint without modification of the rendered object. The default colorization value is <Typography noWrap>`Datatype.Color3.new(1, 1, 1)`</Typography> (white) at which no color modification occurs.</td>
    </tr>
    <tr>
      <td>`Class.ViewportFrame.ImageTransparency|ImageTransparency`</td>
      <td>Changes the image transparency without modification of the rendered object. A value of `0` (default) is completely opaque and a value of `1` is completely transparent (invisible).</td>
    </tr>
  </tbody>
</table>
