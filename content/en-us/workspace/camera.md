---
title: Customize the camera
description: Explains how to configure an experience's camera settings.
---

Roblox's built-in camera powers a default **third person** mode and an optional **first person** mode, so you don't need to build your own following camera. For more customized scenarios, you can adjust the default properties in `Class.Camera` or replace it entirely like for over-the-shoulder, isometric, and weapon scoping views.

## Basic settings

You can configure common camera settings directly within Studio's `Class.StarterPlayer` object. These settings include [zoom distance](#zoom-distance) and various [camera](#camera-mode), [occlusion](#occlusion-mode), and [movement](#movement-mode) modes.

1. In the **Explorer** window, select the **StarterPlayer** object.

   <img src="../assets/studio/explorer/StarterPlayer.png" width="320" alt="StarterPlayer in Explorer" />

1. In the **Properties** window, scroll down to locate the **Camera** section. You can configure the following properties directly or through a script.

   <img src="../assets/studio/properties/StarterPlayer-Camera-Group.png" width="320" alt="Camera properties on StarterPlayer in Properties Window" />

### Zoom distance

Together, `Class.StarterPlayer.CameraMaxZoomDistance|CameraMaxZoomDistance` and `Class.StarterPlayer.CameraMinZoomDistance|CameraMinZoomDistance` set the range in which players can zoom the camera in respect to their player character. Setting a very high maximum such as 500 allows players to zoom the camera far out in space. If you want to lock the camera to a specific distance away from the character and prevent zooming, set both of these properties to the same value.

```lua title="LocalScript - Camera Zoom Range" highlight="5,6"
local Players = game:GetService("Players")

local player = Players.LocalPlayer

player.CameraMaxZoomDistance = 25
player.CameraMinZoomDistance = 50
```

### Camera mode

The `Class.StarterPlayer.CameraMode|CameraMode` property sets the overall behavior of the camera between two options:

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Classic**</td>
    <td>The classic Roblox third-person camera which can be zoomed into first-person. Allows players to zoom in and out (unless zoom is locked) and rotate the camera around their character.</td>
  </tr>
  <tr>
    <td>**LockFirstPerson**</td>
    <td>Locks the camera to first-person mode. When in this mode, all parts/elements of the player's character are invisible to them, except for equipped `Class.Tool|Tools`.</td>
  </tr>
</tbody>
</table>

### Occlusion mode

The `Class.StarterPlayer.DevCameraOcclusionMode|DevCameraOcclusionMode` property controls camera behavior when the player cannot see their character, such as when it's obscured by a `Class.BasePart`.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Zoom**</td>
    <td>If the player's character moves behind an object with `Class.BasePart.Transparency|Transparency` lower than 0.25, the camera zooms in very close to the character so that it can be seen. Once the character moves back into a viewable position, the camera zooms back out.</td>
  </tr>
  <tr>
    <td>**Invisicam**</td>
    <td>If the player's character moves behind an object with `Class.BasePart.Transparency|Transparency` lower than 0.75, the camera remains unmoved but the object becomes semi-transparent so that the character can be seen. Once the character moves back into a viewable position, the object returns to its normal opacity.</td>
  </tr>
</tbody>
</table>

<figure>
  <video controls src="../assets/workspace/camera/Camera-Occlusion.mp4" width="90%" alt="Camera occlusion mode: Zoom vs. Invisicam"></video>
  <figcaption>**Zoom** and **Invisicam** occlusion modes</figcaption>
</figure>

### Movement mode

The `Class.StarterPlayer.DevComputerCameraMovementMode|DevComputerCameraMovementMode` (computer) and `Class.StarterPlayer.DevTouchCameraMovementMode|DevTouchCameraMovementMode` (phone/tablet) determine how the player can move the camera around.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**UserChoice**</td>
    <td>The camera will move based on the player's in-experience camera settings.</td>
  </tr>
  <tr>
    <td>**Classic**</td>
    <td>The camera remains at its [zoom distance](#zoom-distance), tracking the player's character as it moves around the world. Players can also pitch the camera view up/down and orbit it around their character.</td>
  </tr>
  <tr>
    <td>**Follow**</td>
    <td>Similar to **Classic** but the camera may rotate slightly to face the player's character if they're moving in any direction that isn't parallel to the camera's facing direction.</td>
  </tr>
  <tr>
    <td>**Orbital**</td>
    <td>The camera remains at a fixed zoom distance and tracks the player's character as it moves around the world. Players can orbit the camera around their character but can't pitch the view up or down.</td>
  </tr>
  <tr>
    <td>**CameraToggle**</td>
    <td>Only functional on computers (not phones/tablets) through `Class.StarterPlayer.DevComputerCameraMovementMode|DevComputerCameraMovementMode`. When the player clicks the right mouse button, the camera toggles between **Classic** mode and a "free&nbsp;look" mode where moving the mouse looks around the world.</td>
  </tr>
</tbody>
</table>

## Script the camera

Each player [client](../projects/client-server.md) has its own `Class.Camera` object residing in the local `Class.Workspace`, accessible through the `Class.Workspace.CurrentCamera` property. You can override Roblox's default camera scripts by setting its `Class.Camera.CameraType|CameraType` to `Enum.CameraType|Scriptable` and then, most commonly, control the camera through the following properties.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.Camera.CFrame`</td>
    <td>The `Datatype.CFrame` of the camera. This is the most frequently used property for positioning and orienting a `Enum.CameraType|Scriptable` camera in an experience.</td>
  </tr>
  <tr>
    <td>`Class.Camera.FieldOfView`</td>
<td>The extent of the observable 3D space that can be seen on screen, measured between 1–120 degrees in the direction defined by `Class.Camera.FieldOfViewMode`. Default is 70.</td>
  </tr>
	<tr>
    <td>`Class.Camera.CameraType`</td>
    <td>Toggles between the various camera behaviors outlined in `Enum.CameraType`, some of which mimic the selectable [movement modes](#movement-mode). Setting this to `Enum.CameraType|Scriptable` gives you full control of the camera.</td>
  </tr>
	<tr>
    <td>`Class.Camera.Focus`</td>
    <td>The point in 3D space where the camera is looking. If you've set `Class.Camera.CameraType` to `Enum.CameraType|Scriptable`, you should update this property every frame because certain visuals are more detailed depending on how close they are to the focus point.</td>
  </tr>
</tbody>
</table>
