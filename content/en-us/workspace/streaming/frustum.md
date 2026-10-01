---
title: Frustum Streaming
description: Stream instances within a player's camera view to support long-range gameplay scenarios such as scoped weapons and high-speed movement.
---

Frustum streaming lets the server stream instances that fall within a player's camera view but lie beyond the normal streaming radius. It is an opt-in system that is additive to the existing streaming area and any active replication foci. It is not a replacement for standard instance streaming. Enabling frustum streaming provides new functionality for gameplay scenarios that require long-range visibility.

## How frustum streaming works

In 3D graphics, a camera frustum is the pyramid-shaped region of the world visible on screen from the camera origin. Standard instance streaming replicates objects in a cube around the player's replication focus equally in all directions. When you enable frustum streaming for a player, the server also streams instances within a frustum shape matching the player's camera view, extending well beyond the normal streaming radius.

The total streaming area is a union of these shapes:

- **Primary streaming radius**: the standard cube around the replication focus.
- **Frustum**: the camera-view pyramid, active only when frustum streaming is on for that player.
- **Replication foci**: any additional areas your scripts create with `Class.Player:AddReplicationFocus()`.

Frustum streaming does not remove or shrink the primary streaming area. Enabling it increases the number of instances that can be streamed to the client. This can increase both memory usage and potentially CPU usage. Normal instance and bandwidth quotas still apply.

## Frustum streaming modes

The `Class.Player.FrustumStreaming` property accepts one of four `Enum.FrustumStreamingMode` values:

- **Default**: equivalent to Disabled. Lets scripts reset the property to its initial value.
- **Disabled**: frustum streaming is off for this player.
- **Automatic**: the engine activates frustum streaming when it detects qualifying conditions.
- **Enabled**: frustum streaming is always active for this player.

In Automatic mode, the engine enables frustum streaming when it detects any of the following conditions:

- **Narrow field of view**: the camera zooms in, such as when a player looks through a sniper scope.
- **High velocity while looking toward the direction of movement**: the player moves quickly in a consistent direction, such as in a racing experience.
- **Camera distance from the replication focus**: the camera moves far from the player's replication focus, such as in a free-camera mode.

Automatic mode introduces a short activation delay after it detects a qualifying condition. If you need finer control, consider manual control (`Enum.FrustumStreamingMode.Enabled|Enabled`), where you can activate frustum streaming manually. For example, you could activate frustum streaming during an equip animation to have a scope ready by the time the player looks through it.

## Enable frustum streaming

Frustum streaming is controlled per player through the `Class.Player.FrustumStreaming` property. This property can only be set on the server. If client-side logic needs to trigger a mode change, fire a `Class.RemoteEvent` to a server `Class.Script` that validates the request and sets the property.

### Use automatic mode

Set the property to `Enum.FrustumStreamingMode.Automatic|Automatic` for each player when they join. The engine handles activation and deactivation based on camera and movement conditions.

```lua title="Enable Automatic Frustum Streaming"
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    player.FrustumStreaming = Enum.FrustumStreamingMode.Automatic
end)
```

### Control frustum streaming manually

Toggle frustum streaming from a server `Class.Script` based on your own gameplay logic. The following example enables frustum streaming when a player equips a scoped weapon and returns to the default behavior when they unequip it.

```lua title="Toggle Frustum Streaming on Scope Equip"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local scopeEvent = ReplicatedStorage:WaitForChild("ScopeEvent")

scopeEvent.OnServerEvent:Connect(function(player, shouldFrustumStream)
    if shouldFrustumStream then
        player.FrustumStreaming = Enum.FrustumStreamingMode.Enabled
    else
        player.FrustumStreaming = Enum.FrustumStreamingMode.Default
    end
end)
```

Because the property is server-only, the client fires a `Class.RemoteEvent` to request the change. Always validate the request in the server script before setting the property.

## Stream-out behavior

Frustum streaming works with both `Enum.StreamOutBehavior` settings:

- **Opportunistic**: instances that leave the camera view and fall outside the normal streaming radius or any active replication focus linger for 1.5 seconds and then are garbage collected.
- **LowMemory**: instances that leave the camera view remain streamed indefinitely. The engine only removes them once the client's memory runs low, and only if they are outside the camera view at that point.

In both modes, instances inside the primary streaming radius or an active replication focus remain streamed regardless of whether they are in the camera view.

## Performance and device behavior

Frustum streaming increases the number of instances present on the client. This increases memory usage and can increase CPU usage. The server gives the frustum the same budget for instance count and bandwidth as a replication focus. Roblox might adjust this allocation in the future if games commonly use both frustum streaming and replication foci and the frustum needs higher priority.

The frustum streams outward to the lesser of the client's current draw distance and an engine-defined maximum range. If the client reduces graphics quality or experiences low frame rates, the engine reduces draw distance. When draw distance falls to or below the normal streaming target radius, the engine disables frustum streaming for that client automatically.

## Limitations

- **Server-only property**: `Class.Player.FrustumStreaming` has no effect when set from a client script. Use a `Class.RemoteEvent` to relay client input to the server.
- **Fast camera movement**: when the player rotates or moves the camera quickly, the engine invalidates the current frustum and begins streaming again from the center outward. During rapid rotation, the effective frustum narrows to a beam centered on the camera direction. Instances at extreme range might churn in and out of the streamed set.
- **No occlusion culling**: the frustum shape does not account for walls, terrain, or other geometry blocking the player's actual view. All instances within the frustum volume are candidates for streaming.
- **Draw-distance dependency**: frustum streaming requires a draw distance greater than the normal streaming target radius. On devices with reduced graphics quality or low frame rates, the engine might disable frustum streaming automatically.
- **Additive cost**: frustum streaming adds instances and full quality terrain to the client and increases resource usage. It does not reduce the streaming workload.
- **Not applicable to non-streaming experiences**: if your experience does not use instance streaming, all instances are already present on the client and frustum streaming has no effect.
