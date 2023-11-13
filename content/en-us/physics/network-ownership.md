---
title: Network Ownership
description: Learn how the Roblox engine utilizes network ownership to improve physical responsiveness for players.
---

In order to support complex physical mechanisms while also aiming for a smooth and responsive experience for players, the Roblox [physics](../physics/index.md) engine utilizes a **distributed physics** system in which computations are distributed between the server and all connected clients. Within this system, the engine assigns **network ownership** of physically simulated `Class.BasePart|BaseParts` to either a client or server to divide the work of calculating physics.

Clients experience **more responsive** physics interactions with parts that they own, since there's no latency from communication with the server. Network ownership also improves server performance because physics computations can be split up among individual clients, allowing the server to prioritize other tasks.

## Visualizing Ownership

To assist with network ownership debugging, Studio can render colored outlines around objects when playtesting.

<figure>
  <video src="../assets/physics/network-ownership/Visualization-Demo.mp4" controls width="90%" alt="Video showing part ownership indicated through colored outlines"></video>
  <figcaption>Part ownership indicated through colored outlines</figcaption>
</figure>

To enable ownership visualization:

1. Open **File** &rarr; **Studio Settings**.
2. In the **Physics** tab, enable **Are&nbsp;Owners&nbsp;Shown**.

   <img src="../assets/physics/network-ownership/Settings-Are-Owners-Shown.png" width="600" alt="Studio Settings window showing Are Owners Shown option" />

## BasePart Ownership

By default, the server retains ownership of any `Class.BasePart`. Additionally, the server **always** owns anchored `Class.BasePart|BaseParts` and you cannot manually change their ownership.

Based on a client's hardware capacity and the player's `Class.Player.Character` proximity to an unanchored `Class.BasePart`, the engine automatically assigns ownership of that part to the client. Thus, parts close to a player's character are more likely to become player-owned.

## Assembly Ownership

If a physics-based mechanism has no anchored parts, [setting ownership](#setting-ownership) on an [assembly](../physics/assemblies.md) within that mechanism sets the same ownership for **every assembly** in the mechanism.

If you anchor a lone assembly that is **not** part of a broader mechanism, its ownership goes to the server, since the server always owns anchored `Class.BasePart|BaseParts`. Upon unanchoring the same assembly, its previous ownership state is lost and it reverts to automatic handling by the engine.

If you anchor one assembly within a broader mechanism of assemblies, its ownership goes to the server, but ownership of the other assemblies remains unchanged. Unanchoring the same assembly reverts its previously set ownership.

## Setting Ownership

In experiences with complex physics interactions or in cases where you need to assign direct control, you can set ownership through a server-side call to `Class.BasePart:SetNetworkOwner()`.

<Alert severity="info">
<p>While you can manually call `Class.BasePart:SetNetworkOwner()|SetNetworkOwner(nil)` for the server for gameplay-critical objects that the client should not be able to manipulate, you should do so conservatively since it may result in  jittery physics interactions for clients.</p>
Also note that the server **always** owns anchored `Class.BasePart|BaseParts` and you cannot manually change their ownership.
</Alert>

Consider a vehicle that has a `Class.VehicleSeat` object for the driver and a `Class.Seat` object for a passenger, with both included in the vehicle assembly. With the default ownership rules, if a player character sits in the `Class.Seat` (passenger) and then another player jumps into the `Class.VehicleSeat` (driver), the **passenger** gains physical ownership of the entire vehicle because they entered first. The driver will have to wait several network cycles before their input is recognized and the vehicle will feel less responsive.

The following `Class.Script` fixes this by manually assigning network ownership to the driver. In it, the `Class.VehicleSeat` sets its `Class.VehicleSeat.Occupant|Occupant` to the `Class.Humanoid` sitting on it, so the script listens for the seat's `Class.Instance.Changed|Changed` event to catch when a player sits in the seat. When the driver leaves the seat, the vehicle's network ownership is reverted to automatic with `Class.BasePart:SetNetworkOwnershipAuto()`.

```lua
local Players = game:GetService("Players")

local vehicleSeat = script.Parent

vehicleSeat.Changed:Connect(function(prop)
	if prop == "Occupant" then
		local humanoid = vehicleSeat.Occupant
		if humanoid then
			-- Get the player from the character
			local player = Players:GetPlayerFromCharacter(humanoid.Parent)
			if player then
				vehicleSeat:SetNetworkOwner(player)
			end
		else
			-- Reset ownership when seat is unoccupied
			vehicleSeat:SetNetworkOwnershipAuto()
		end
	end
end)
```

<Alert severity="warning">
For smooth performance and responsive behavior, ensure you also assign ownership of any loose `Class.BasePart|BaseParts` on top of a vehicle to the same client that controls the vehicle.
</Alert>

## Security Concerns

Roblox cannot verify physics calculations when a client has ownership over a `Class.BasePart`. Clients can exploit this and send bad data to the server, such as teleporting the `Class.BasePart`, making it go through walls or fly around.

Additionally, `Class.BasePart.Touched` events are tied to network ownership, meaning that a client can fire `Class.BasePart.Touched|Touched` events on a `Class.BasePart` it owns and send it to the server, even if the server doesn't see it touch anything. For example, a client can make a sword deal damage to another player across the map by firing the event through script injections, so it's important to check the validity of such events fired by clients.

See [Security Tactics and Cheat Mitigation](../scripting/security/security-tactics.md) for detailed security tactics and cheat mitigation tactics for Roblox experiences.
