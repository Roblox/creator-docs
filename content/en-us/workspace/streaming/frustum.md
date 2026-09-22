---
title: Frustum streaming
description: Frustum streaming streams instances based on the player's camera view, ideal for scoped weapons and high-velocity movement.
---

<Alert severity="warning">
This feature is in **beta**. Functionality and availability may change. For updates and known issues, see the [DevForum announcement](PLACEHOLDER).
</Alert>

**Frustum streaming** extends [instance streaming](./index.md) by streaming instances based on the player's camera view instead of only the area around their character. In 3D graphics, a **camera frustum** is the pyramid-shaped region of the world visible on screen from the camera origin. Think of it as a flashlight beam cutting through the dark: anything outside that beam is hidden from the player.

By default, Roblox streams instances in a cube around the player avatar, replicating objects equally in all directions. Frustum streaming adds a frustum shape matching the camera's view on top of the normal streaming cube, letting the server stream distant instances that the player can actually see.

## When to use frustum streaming

Frustum streaming is completely opt-in and works best for gameplay where the camera view extends well beyond the normal streaming radius:

- **Racing games**: Players move at high speed in the direction they are looking. Frustum streaming loads far-away instances the player is approaching.
- **Scoped weapons**: A sniper scope narrows the field of view and needs to show instances far from the player avatar.
- **Free cameras**: Moving the camera far from the avatar requires streaming content in the camera's vicinity.

## Configure frustum streaming

Frustum streaming is controlled per player through the `Class.Player.FrustumStreaming` property, which can only be set on the server. The property accepts values from `Enum.FrustumStreamingMode`:

<table>
<thead>
  <tr>
    <th>Mode</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Enum.FrustumStreamingMode.Default|Default`</td>
    <td>The starting value. Currently behaves the same as **Disabled**.</td>
  </tr>
  <tr>
    <td>`Enum.FrustumStreamingMode.Automatic|Automatic`</td>
    <td>The engine decides when to activate frustum streaming based on current performance and camera movement. This is the best choice for most games. The engine enables frustum streaming when any of the following conditions are met: <br /><br /> - The camera field of view becomes relatively narrow (for example, a sniper scope). <br /> - The player moves at high speed in a consistent direction (for example, a racing game). <br /> - The camera moves far from the replication focus (for example, a free camera).</td>
  </tr>
  <tr>
    <td>`Enum.FrustumStreamingMode.Enabled|Enabled`</td>
    <td>Frustum streaming is always active and continues to process.</td>
  </tr>
  <tr>
    <td>`Enum.FrustumStreamingMode.Disabled|Disabled`</td>
    <td>Frustum streaming is deactivated and does not process.</td>
  </tr>
</tbody>
</table>

## Use automatic mode

**Automatic** mode is recommended for most games. It lets the engine intelligently toggle frustum streaming based on real-time conditions, avoiding unnecessary streaming when the camera is in a normal state.

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
  player.FrustumStreaming = Enum.FrustumStreamingMode.Automatic
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

## Control frustum streaming manually

For gameplay scenarios that require granular control, set `Class.Player.FrustumStreaming` to `Enum.FrustumStreamingMode.Enabled|Enabled` or `Enum.FrustumStreamingMode.Disabled|Disabled` directly. For example, if a player equips a sniper rifle, you can force frustum streaming on at the start of the equip animation so that distant instances are already loading when the player looks down the scope.

```lua
-- Server Script
-- Use your own gameplay logic to determine when frustum streaming
-- should be active. This example assumes shouldFrustumStream is set
-- by that logic.

if shouldFrustumStream then
  -- Force frustum streaming on to optimize for the narrow scope view
  player.FrustumStreaming = Enum.FrustumStreamingMode.Enabled
else
  -- Return to engine-managed behavior
  player.FrustumStreaming = Enum.FrustumStreamingMode.Default
end
```

## Stream out behavior

Frustum streaming works with either `Class.Workspace.StreamOutBehavior` setting:

- **Opportunistic**: Instances stay streamed while in view of the camera. When the camera rotates away, instances outside the normal streaming radius (or any active [replication focus](./index.md#replication-focus)) begin streaming out after a short delay.
- **LowMemory**: Instances that have been streamed in by the frustum are kept in memory as long as possible, only streaming out when the client runs low on memory.

## How frustum streaming processes

Frustum streaming processes from the center of the view outward. When the camera rotates or the player moves significantly, the frustum is invalidated and begins streaming again. The central portion of the frustum streams all the way to its furthest point first, then fills outward in a radial pattern until the full frustum is complete.

Fast camera rotation or fast movement causes the frustum to collapse into a narrower beam centered on the camera direction. This is intentional: the engine prioritizes streaming what the player is looking at directly rather than trying to fill the entire frustum during rapid movement.

## Requirements and limits

- Frustum streaming requires a render distance that exceeds the `Class.Workspace.StreamingTargetRadius|StreamingTargetRadius`. If the device reduces graphics quality or the frame rate is low enough that the render distance falls to or below the streaming target radius, the frustum disables itself.
- The frustum streams as far as the smaller value of the maximum render distance and 100,000 studs.

## FAQ

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Is frustum streaming required?</Typography>
</AccordionSummary>
<AccordionDetails>
No. Frustum streaming is completely optional. If you don't enable it, streaming continues to work with the normal cube-based radius.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Does frustum streaming change how client-side scripts work?</Typography>
</AccordionSummary>
<AccordionDetails>
Normal <a href="./techniques">streaming techniques</a> still apply. Be aware that instances in the field of view stream in, and if <code>Class.Workspace.StreamOutBehavior</code> is set to <code>Enum.StreamOutBehavior.Opportunistic|Opportunistic</code>, looking away causes those instances to stream out after a short delay.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Does frustum streaming impact server performance?</Typography>
</AccordionSummary>
<AccordionDetails>
The frustum is treated similarly to a replication focus in that it receives a budget for instance count and bandwidth. It does not create unbounded server load.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Is frustum streaming relevant for non-streaming games?</Typography>
</AccordionSummary>
<AccordionDetails>
If your game doesn't use instance streaming, all instances are already present on the client device. Frustum streaming has no effect in this case.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">How does frustum streaming relate to replication foci?</Typography>
</AccordionSummary>
<AccordionDetails>
Streaming is a union of the primary streaming radius (cube), frustum streaming, and any active replication foci. A replication focus stays loaded as long as it exists, even if the camera isn't looking at it. In contrast, a frustum that rotates away from an area causes that area to begin streaming out (in <code>Enum.StreamOutBehavior.Opportunistic|Opportunistic</code> mode). In <code>Enum.StreamOutBehavior.LowMemory|LowMemory</code> mode, both frustum and replication focus content stays loaded until memory pressure forces stream-out.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Does frustum streaming increase client-side CPU and memory usage?</Typography>
</AccordionSummary>
<AccordionDetails>
Frustum streaming allows more instances to be present on the client, specifically those that are on screen but beyond the normal streaming radius. These additional instances increase memory usage and can potentially increase CPU usage. This is the tradeoff for having more of the world visible on the device.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Are there guardrails based on device performance?</Typography>
</AccordionSummary>
<AccordionDetails>
Frustum streaming is limited by the render distance. If the render distance on the device is reduced to a distance less than or equal to the streaming target radius, the frustum disables itself automatically.
</AccordionDetails>
</BaseAccordion>
