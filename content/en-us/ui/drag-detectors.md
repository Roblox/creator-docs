---
title: Drag Detectors
description: Drag detectors instances encourage physical interaction with objects in an experience, such as opening doors and drawers, sliding a part around, and much more.
---

`Class.DragDetector` instances encourage physical interaction with objects in an experience, such as opening doors and drawers, sliding a part around, grabbing and tossing a bowling ball, pulling back and firing a slingshot, and much more. Key features include:

- Place a `Class.DragDetector` under any part or model to [make it draggable](#making-objects-draggable) via all inputs (mouse, touch, gamepad, and VR), all without a single line of code.
- Choose from many [drag styles](#drag-style), define how the object [responds to motion](#object-response-to-motion), and optionally apply [axis or movement limits](#axismovement-limits).
- Scripts can [respond to manipulation of dragged objects](#scripting-responses-to-clicking-and-dragging) to drive UI or make logical decisions, such as adjusting the light level in a room based on a sliding wall switch dimmer.
- Players can manipulate anchored parts or models and they'll stay exactly where you put them upon release.
- `Class.DragDetector|DragDetectors` work in Studio as long as you're **not** using the **Select**, **Move**, **Scale**, or **Rotate** tools, making it easier to test and adjust draggable objects while editing.

<figure>
<video src="../assets/ui/drag-detectors/Showcase.mp4" controls width="100%" alt="Drag detectors used in a variety of implementations in the 3D world"></video>
<figcaption>Drag detectors used in a variety of implementations in the 3D world</figcaption>
</figure>

## Making Objects Draggable

To make any part or model draggable, simply add a `Class.DragDetector` as a direct descendant.

1. In the [Explorer](../studio/explorer.md) window, hover over the `Class.Part`, `Class.MeshPart`, or `Class.Model` and click the &CirclePlus; button. A contextual menu displays.
1. From the menu, insert a **DragDetector**.

   <img src="../assets/ui/drag-detectors/DragDetector-New.png" width="320" />

1. By default, the object will now be draggable in the ground plane, but you can customize its `Class.DragDetector.DragStyle|DragStyle`, define how it [responds to motion](#object-response-to-motion), and optionally apply [axis or movement limits](#axismovement-limits).

## Customizing Drag Detectors

### Drag Style

`Class.DragDetector|DragDetectors` map cursor motion to virtual lines and planes to calculate proposed 3D motion. Through the `Class.DragDetector.DragStyle|DragStyle` property, you can choose from different mappings to suit your needs. For example, **TranslatePlane** produces translation in a virtual plane, whereas **RotateAxis** produces rotation about a virtual axis.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**TranslateLine**</td>
    <td>1D motion along the detector's `Class.DragDetector.Axis|Axis`, by default the world **Y** axis.</td>
  </tr>
  <tr>
    <td>**TranslatePlane**</td>
    <td>2D motion in the plane perpendicular to the detector's `Class.DragDetector.Axis|Axis`, by default the world **XZ** plane.</td>
  </tr>
	<tr>
    <td>**TranslatePlaneOrLine**</td>
    <td>2D motion in the plane perpendicular to the detector's `Class.DragDetector.Axis|Axis` and, when the [modifier](#modifier-input) is active, 1D motion along the detector's `Class.DragDetector.Axis|Axis`.</td>
  </tr>
	<tr>
    <td>**TranslateLineOrPlane**</td>
    <td>1D motion along the detector's `Class.DragDetector.Axis|Axis` and, when the [modifier](#modifier-input) is active, 2D motion in the plane perpendicular to the detector's `Class.DragDetector.Axis|Axis`.</td>
  </tr>
	<tr>
    <td>**TranslateViewPlane**</td>
    <td>2D motion in the plane perpendicular to the camera's view. In this mode, the plane is constantly updated, even while dragging, and will always face the camera's current view.</td>
  </tr>
	<tr>
    <td>**RotateAxis**</td>
    <td>Rotation about the detector's `Class.DragDetector.Axis|Axis`, by default the world **Y** axis.</td>
  </tr>
	<tr>
    <td>**RotateTrackball**</td>
    <td>Trackball rotation, further customized through the `Class.DragDetector.TrackballRadialPullFactor|TrackballRadialPullFactor` and `Class.DragDetector.TrackballRollFactor|TrackballRollFactor` properties.</td>
  </tr>
	<tr>
    <td>**BestForDevice**</td>
    <td>**TranslatePlaneOrLine** for mouse and gamepad; **TranslatePlane** for touch; **6DOF** for VR.</td>
  </tr>
	<tr>
    <td>**Scriptable**</td>
    <td>Calculates desired motion via a custom function provided through `Class.DragDetector:SetDragStyleFunction()|SetDragStyleFunction()`.</td>
  </tr>
</tbody>
</table>

### Drag Direction

By default, 3D motion and the associated `Class.DragDetector.DragStyle|DragStyle` map to world space. However, you may want to change the `Class.DragDetector.ReferenceInstance|ReferenceInstance`, `Class.DragDetector.Orientation|Orientation`, or `Class.DragDetector.Axis|Axis`, for example when building drag detectors into [models with adjustable parts](#anchored-models-with-adjustable-parts).

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
		<th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.DragDetector.ReferenceInstance|ReferenceInstance`</td>
    <td>An instance whose pivot provides the **reference frame** for the drag detector. The `Class.DragDetector.DragFrame|DragFrame` is expressed relative to this reference frame which may be retrieved via `Class.DragDetector:GetReferenceFrame()|GetReferenceFrame()`. If the reference frame is `nil`, translation will be in the direction of (or in the plane perpendicular to) the `Class.DragDetector.Axis|Axis` property in world space.</td>
		<td>`nil`</td>
  </tr>
  <tr>
    <td>`Class.DragDetector.Orientation|Orientation`</td>
    <td>Specifies the **YXZ** rotation of axes of motion relative to the reference frame (does not change the orientation of the reference frame itself). Linear translation and axial rotation will be on this reoriented **Y** axis, and planar translation in the **XZ** plane. Changing this value automatically updates `Class.DragDetector.Axis|Axis` and vice versa.</td>
		<td>(0,&nbsp;0,&nbsp;0)</td>
  </tr>
	<tr>
    <td>`Class.DragDetector.Axis|Axis`</td>
    <td>The primary axis of motion, expressed relative to the reference frame. Changing this value automatically updates `Class.DragDetector.Orientation|Orientation` and vice versa.</td>
		<td>(0,&nbsp;1,&nbsp;0)</td>
  </tr>
</tbody>
</table>

### Object Response to Motion

The `Class.DragDetector.ResponseStyle|ResponseStyle` property specifies how an object responds to the proposed motion, depending on whether the object is `Class.BasePart.Anchored|Anchored` or not.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Anchored Behavior</th>
		<th>Unanchored Behavior</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Geometric**</td>
    <td>Both inside the running experience and in Studio edit mode, the position/orientation of an anchored object will be updated to exactly reflect the proposed motion.</td>
		<td>For an unanchored object, behavior is the same as for an anchored object. However, in a running experience, the object will be anchored at the start of the drag and restored to unanchored upon drag release.</td>
  </tr>
  <tr>
    <td>**Physical**</td>
    <td>An anchored object will default to **Geometric** behavior, as it is not affected by forces.</td>
		<td>An unanchored object will be moved by [constraint forces](#physics-response) that attempt to bring it to the desired position and/or orientation given by the proposed motion. </td>
  </tr>
	<tr>
    <td>**Custom**</td>
    <td>The object will not move at all, but `Class.DragDetector.DragFrame|DragFrame` will still be updated and you can [respond to drag manipulation](#scripting-responses-to-clicking-and-dragging) however you'd like.</td>
		<td>(same as anchored)</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
Remember that `Class.DragDetector|DragDetectors` only work in Studio if you're **not** using the **Select**, **Move**, **Scale**, or **Rotate** tools.
</Alert>

### Axis/Movement Limits

By default, there are no limits to 3D motion beyond the inherent restrictions of the `Class.DragDetector.DragStyle|DragStyle`. If necessary, you can apply minimum and maximum limits to both translation and rotation. Note, however, that these are **not** constraints; they merely impede the drag detector's attempts to generate motion in order to remain within limits.

<table>
<thead>
  <tr>
    <th>Properties</th>
    <th>Description</th>
		<th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
		<p>`Class.DragDetector.MinDragTranslation|MinDragTranslation`</p>
		<p>`Class.DragDetector.MaxDragTranslation|MaxDragTranslation`</p>
    </td>
    <td>Limits to drag translation in each dimension. If MaxDragTranslation is greater than MinDragTranslation, translation will be clamped within that range.</td>
		<td>(0,&nbsp;0,&nbsp;0)</td>
  </tr>
  <tr>
    <td>
		<p>`Class.DragDetector.MinDragAngle|MinDragAngle`</p>
		<p>`Class.DragDetector.MaxDragAngle|MaxDragAngle`</p>
    </td>
    <td>Only relevant if `Class.DragDetector.DragStyle|DragStyle` is set to **RotateAxis**. If `Class.DragDetector.MaxDragAngle|MaxDragAngle` is greater than `Class.DragDetector.MinDragAngle|MinDragAngle`, rotation will be clamped within that range.</td>
		<td>0</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
When using axis/movement limits, you should always set the detector's `Class.DragDetector.ReferenceInstance|ReferenceInstance` so that the limits are relative to a dedicated reference frame. If you fail to establish the reference frame, each drag of the object will reset its limits to its own current world space position/orientation.
</Alert>

### Physics Response

Assuming a dragger's [response style](#object-response-to-motion) is set to **Physical** and it is applied to an unanchored object, that object will be moved by constraint forces that attempt to bring it to the position/orientation given by the proposed motion. You can further customize the physical response through the following properties:

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
		<th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.DragDetector.ApplyAtCenterOfMass|ApplyAtCenterOfMass`</td>
    <td>When false, drag force is applied at the point the user clicks on. When true, force is applied at the object's center of mass.</td>
		<td>false</td>
  </tr>
  <tr>
    <td>`Class.DragDetector.MaxForce|MaxForce`</td>
    <td>Maximum force applied for the object to reach its goal.</td>
		<td>10000000</td>
  </tr>
	<tr>
    <td>`Class.DragDetector.MaxTorque|MaxTorque`</td>
    <td>Maximum torque applied for the object to reach its goal.</td>
		<td>10000</td>
  </tr>
	<tr>
    <td>`Class.DragDetector.Responsiveness|Responsiveness`</td>
    <td>Higher values cause the object to reach its goal more rapidly.</td>
		<td>10</td>
  </tr>
</tbody>
</table>

### Modifier Input

Some `Class.DragDetector.DragStyle|DragStyle` modes allow users to hold down a **modifier** key/button to manipulate the dragged object in different ways. By default, the modifier is `Enum.KeyCode|LeftControl` on PC, `Enum.KeyCode|ButtonR1` on gamepad, or `Enum.KeyCode|ButtonL2` on VR. You can customize these modifiers through the `Class.DragDetector.KeyboardModeSwitchKeyCode|KeyboardModeSwitchKeyCode`, `Class.DragDetector.GamepadModeSwitchKeyCode|GamepadModeSwitchKeyCode`, or `Class.DragDetector.VRSwitchKeyCode|VRSwitchKeyCode` properties of the drag detector instance.

### Replication

When the `Class.DragDetector.RunLocally|RunLocally` property is false (default), the client interprets all input to produce data that it sends to the server to perform the drag. In this mode, all custom event signals and registered functions must be in server `Class.Script|Scripts`.

When the `Class.DragDetector.RunLocally|RunLocally` property is true, no events are replicated to the server. All custom event signals and registered functions must be in client `Class.LocalScript|LocalScripts` and you must use [remote events](../scripting/events/remote.md) to propagate necessary changes to the server.

## Scripting Responses to Clicking and Dragging

Through event signals, property changes, scripted `Class.DragDetector.DragStyle|DragStyle`, and custom functions, scripts can respond to the manipulation of dragged objects to drive UI or make logical decisions, such as adjusting the light level in a room based on a sliding wall switch dimmer.

### Event Signals

Through the following event signals, you can detect when a user starts, continues, and ends dragging an object.

<table>
<thead>
  <tr>
    <th>Event</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.DragDetector.DragStart|DragStart`</td>
    <td>Fires when a user starts dragging the object.</td>
  </tr>
  <tr>
    <td>`Class.DragDetector.DragContinue|DragContinue`</td>
    <td>Fires when a user continues dragging the object after `Class.DragDetector.DragStart|DragStart` has been initiated.</td>
  </tr>
	<tr>
    <td>`Class.DragDetector.DragEnd|DragEnd`</td>
    <td>Fires when a user stops dragging the object.</td>
  </tr>
</tbody>
</table>

```lua title='DragDetector - Event Signals' highlight='7,9,11,13,15,17'
local dragDetector = script.Parent.DragDetector

local highlight = Instance.new("Highlight")
highlight.Enabled = false
highlight.Parent = script.Parent

dragDetector.DragStart:Connect(function()
	highlight.Enabled = true
end)

dragDetector.DragContinue:Connect(function()

end)

dragDetector.DragEnd:Connect(function()
	highlight.Enabled = false
end)
```

### DragFrame Changes

In addition to [event signals](#event-signals), you can monitor changes to the detector's `Class.DragDetector.DragFrame|DragFrame` directly.

```lua title='DragDetector - DragFrame Changes' highlight='3,6'
local dragDetector = script.Parent.DragDetector

dragDetector:GetPropertyChangedSignal("DragFrame"):Connect(function()
	local currentDragTranslation = dragDetector.DragFrame.Position
	print(currentDragTranslation)
end)
```

### Scripted DragStyle

If you set a detector's `Class.DragDetector.DragStyle|DragStyle` to **Scriptable**, you can provide your own function that takes in a `Datatype.Ray` and returns a world space `Datatype.CFrame`. The detector will move the motion so that the dragged object goes to that custom location/orientation.

```lua title='DragDetector - Scripted DragStyle' highlight='2,7,31,32,34'
local dragDetector = script.Parent.DragDetector
dragDetector.DragStyle = Enum.DragDetectorDragStyle.Scriptable

local cachedHitPoint = Vector3.zero
local cachedHitNormal = Vector3.yAxis

local function followTheCursor(cursorRay)
	-- Exclude dragged object from raycast detection
	local raycastParams = RaycastParams.new()
	raycastParams.FilterDescendantsInstances = {dragDetector.Parent}
	raycastParams.FilterType = Enum.RaycastFilterType.Exclude

	local hitPoint = Vector3.zero
	local hitNormal = Vector3.yAxis

	local raycastResult = workspace:Raycast(cursorRay.Origin, cursorRay.Direction, raycastParams)
	if raycastResult then
		hitPoint = raycastResult.Position
		hitNormal = raycastResult.Normal.Unit
	else
		hitPoint = cachedHitPoint
		hitNormal = cachedHitNormal
	end

	cachedHitPoint = hitPoint
	cachedHitNormal = hitNormal

	local lookDir1 = hitNormal:Cross(Vector3.xAxis)
	local lookDir2 = hitNormal:Cross(Vector3.yAxis)
	local lookDir = if lookDir1.Magnitude > lookDir2.Magnitude then lookDir1.Unit else lookDir2.Unit
	return CFrame.lookAt(hitPoint, hitPoint + lookDir, hitNormal)
end

dragDetector:SetDragStyleFunction(followTheCursor)
```

### Custom Constraint Function

Drag detectors do not have built-in motion rules about grids and snapping, but you can register custom constraint functions to edit the detector's `Class.DragDetector.DragFrame|DragFrame` before it is applied. For example, you can keep motion on a grid by rounding positions to multiples of the grid increment, or simulate a chess game with rules of motion legal to each piece.

```lua title='DragDetector - Custom Constraint Function' highlight='4,14,27,28,30'
local dragDetector = script.Parent.DragDetector
local startPartPosition = nil

local SNAP_INCREMENT = 4

dragDetector.DragStart:Connect(function()
	startPartPosition = script.Parent.Position
end)

dragDetector.DragEnd:Connect(function()
	startPartPosition = nil
end)

local function snapToWorldGrid(proposedMotion)
	if startPartPosition == nil then
		return proposedMotion
	end
	local snapIncrement = math.floor(SNAP_INCREMENT)
	if snapIncrement < 1 then
		return proposedMotion
	end
	local newWorldPosition = startPartPosition + proposedMotion.Position
	local roundedX = math.floor(newWorldPosition.X / snapIncrement + 0.5) * snapIncrement
	local roundedY = math.floor(newWorldPosition.Y / snapIncrement + 0.5) * snapIncrement
	local roundedZ = math.floor(newWorldPosition.Z / snapIncrement + 0.5) * snapIncrement
	local newRoundedWorldPosition = Vector3.new(roundedX, roundedY, roundedZ)
	return proposedMotion.Rotation + (newRoundedWorldPosition - startPartPosition)
end

local connection = dragDetector:AddConstraintFunction(2, snapToWorldGrid)
-- When applicable, remove the constraint function by invoking connection:Disconnect()
```

## Example Usage

### Unanchored Physical Objects

A basic implementation of drag detectors is a tower balance game where players must carefully remove pieces and attempt to keep the tower upright. In the following tower structure, each piece has a child `Class.DragDetector` with a default `Class.DragDetector.DragStyle|DragStyle` of **TranslatePlane** so that players can pull the pieces outward but not upward or downward.

<video src="../assets/ui/drag-detectors/Balance-Tower.mp4" controls width="800" alt="Drag detectors placed on each piece of a tower balance game"></video>

### Anchored Models With Adjustable Parts

You can easily create and share models which are primarily anchored, but which have one or more child parts/models that players can drag. For example, the following desk has two drawers which players can open to inspect what's inside.

<video src="../assets/ui/drag-detectors/Desk-Drawers.mp4" controls width="800" alt="Drag detectors placed on the drawers of a desk to allow for opening/sliding"></video>

<Alert severity="warning">
When making children of models draggable, you should set the drag detector's `Class.DragDetector.ReferenceInstance|ReferenceInstance` to an object within the model that can serve as a dedicated reference frame, for example the desk's top surface. This establishes a consistent reference `Datatype.CFrame` for the style/direction of dragging, even if the model is rotated.
</Alert>

### Drag Detectors and Constraints

You can combine drag detectors with `Class.Constraint|Constraints`, for example a marionette puppet. In the following setup, the control handles are anchored, the body parts are unanchored, and constraints hold the marionette together. Moving the handles with the **TranslateViewPlane** `Class.DragDetector.DragStyle|DragStyle` makes the marionette dance, and the individual body parts may also be moved with drag detectors, all while the model retains its integrity.

<video src="../assets/ui/drag-detectors/Marionette.mp4" controls width="800" alt="Drag detectors placed on the handles of a marionette puppet"></video>

### 3D User Interfaces

3D user interfaces are easily achievable through drag detectors, such as adjusting the brightness of a `Class.SpotLight` based on a sliding switch dimmer. You can also detect the **X** and **Z** axes individually to control two different aspects of a 3D user interface, such as the `Class.ParticleEmitter.Size|Size`, `Class.ParticleEmitter.Speed|Speed`, and `Class.ParticleEmitter.Color|Color` of a `Class.ParticleEmitter`.

<video src="../assets/ui/drag-detectors/Color-Slider.mp4" controls width="800" alt="Drag detectors used in 3D user interface to control a particle emitter"></video>

```lua title='DragDetector - 3D User Interface'
local model = script.Parent
local slider = model.SliderPart
local originPart = model.OriginPart
local emitter = script.Parent.EmitterPart.ParticleEmitter

local dragDetector = slider.DragDetector
dragDetector.ReferenceInstance = originPart
dragDetector.MinDragTranslation = Vector3.zero
dragDetector.MaxDragTranslation = Vector3.new(10, 0, 10)

local dragRangeX = dragDetector.MaxDragTranslation.X - dragDetector.MinDragTranslation.X
local dragRangeZ = dragDetector.MaxDragTranslation.Z - dragDetector.MinDragTranslation.Z

local MIN_PARTICLE_SIZE = 1
local MAX_PARTICLE_SIZE = 1.5
local MIN_PARTICLE_SPEED = 2.5
local MAX_PARTICLE_SPEED = 5
local COLOR1 = Color3.fromRGB(255, 150, 0)
local COLOR2 = Color3.fromRGB(255, 0, 50)

local function updateParticles(emitter)
	local dragFactorX = (dragDetector.DragFrame.Position.X - dragDetector.MinDragTranslation.X) / dragRangeX
	local dragFactorZ = (dragDetector.DragFrame.Position.Z - dragDetector.MinDragTranslation.Z) / dragRangeZ

	-- Adjust particle size and speed based on drag detector X factor
	emitter.Size = NumberSequence.new{
		NumberSequenceKeypoint.new(0, 0),
		NumberSequenceKeypoint.new(0.1, MIN_PARTICLE_SIZE + ((MAX_PARTICLE_SIZE - MIN_PARTICLE_SIZE) * dragFactorX)),
		NumberSequenceKeypoint.new(1, 0)
	}
	local speed = MIN_PARTICLE_SPEED + ((MAX_PARTICLE_SPEED - MIN_PARTICLE_SPEED) * dragFactorX)
	emitter.Speed = NumberRange.new(speed, speed * 1.2)
	-- Adjust particle color based on drag detector Z factor
	local color = COLOR2:Lerp(COLOR1, dragFactorZ)
	emitter.Color = ColorSequence.new{
		ColorSequenceKeypoint.new(0, color),
		ColorSequenceKeypoint.new(1, color)
	}
end

dragDetector:GetPropertyChangedSignal("DragFrame"):Connect(function()
	updateParticles(emitter)
end)
```
