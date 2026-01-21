---
title: Server authority advanced techniques
description: Advanced techniques for creating high-quality, smooth, multiplayer experiences using the server authority model.
---

import BetaAlert from '../../includes/beta-features/beta-alert.md'

This guide covers advanced techniques for creating high-quality, smooth, multiplayer experiences using the [server authority model](./index.md).

<BetaAlert betaName="Server Authority Core API" leadIn="The server authority model and its associated APIs are currently in beta. Enable them in Studio through " leadOut="." components={props.components} />

<Alert severity="error">
As this feature is currently in beta, you should **not** publish a server‑authoritative experience. Your players' clients will not yet have support for server authority APIs, so the published experience will not work correctly.
</Alert>

## Position smoothing

You can visually smooth out the position of mispredicted synchronized objects by rendering a different object than what is being simulated.

1. Make the **simulated** object invisible.
2. Make a **renderer** object as a massless, non‑collidable, visual‑only clone to track the simulated object.
3. Attach a script to the renderer object that smoothly tracks the position of the invisible, simulated object. This separation between rendering and simulation lets you alter the position of the renderer object to create a visually smooth experience.

In the following sample `Class.Script`, the rendered object (parent) smoothly tracks the simulated object. The rendered object is always slightly "behind" the simulated object which is typically fine but may be undesirable in certain situations.

```lua title="Smoothly Track BasePart Position with Renderer Part"
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local Workspace = game:GetService("Workspace")

-- Object to smoothly track
local smoothTarget:BasePart = Workspace.SimulatedPart
-- Visual object that will be smoothed
local renderer:BasePart = script.Parent
-- Time to smooth over; smaller means faster
local smoothTime = 0.07
-- Store data needed to compute the smooth position
local smoothVelocity = Vector3.new()

-- Disable the renderer object's physics
renderer.Massless = true
renderer.Anchored = true
renderer.CanCollide = false

RunService.RenderStepped:Connect(function(deltaTime: number)
	-- Smoothly track the target object
	local smoothPosition, smoothVelocity = TweenService:SmoothDamp(
		renderer.Position,
		smoothTarget.Position,
		smoothVelocity,
		smoothTime,
		math.huge,
		deltaTime)
	renderer.Position = smoothPosition
end)
```

The [Soccer](https://www.roblox.com/games/110687099504272/Soccer-Server-Authority-Template) example experience uses a variation of this technique to more intelligently turn on and off position smoothing for the soccer ball. Specifically, the soccer ball only smooths its position when the simulated ball has "jumped" far enough away from the rendered ball. This approach provides the best of both worlds: the soccer ball has no visual latency under normal conditions, and the experience smoothly interpolates its position only after the simulated ball has unexpectedly jumped to a new location, likely due to a network artifact or server‑side change.

## Animations, sounds, and visual effects

In a predicted simulation, it's possible to trigger effects, sounds, or animations for events that the client predicted would happen but which never occurred on the server. The rendering system should be prepared to "undo" any mispredicted effects. For example, a client might predict that a grenade exploded and trigger a particle effect, but if another player diffused the grenade, the client should hide the particle effect.

A good strategy for rendering a predicted simulation is to synchronize a state machine pattern within the simulation loop and render changes to the state in a render step function. The following example simulates a grenade with a state machine pattern:

```lua title="Simple State Machine for Tracking a Grenade (ModuleScript)"
local Workspace = game:GetService("Workspace")

local module = {}

module.GrenadeStates = {
	Idle = 0,
	Lit = 1,
	Exploded = 2,
	Defused = 3,
}
module.GrenadeExplodeTime = 3.0

module.Initialize = function(grenade)
RunService:BindToSimulation(function(deltaTime)
		-- Initialize empty grenade state
		local grenadeState = grenade:GetAttribute("State")
		if grenadeState == nil then
			grenadeState = module.GrenadeStates.Idle
			grenade:SetAttribute("State", grenadeState)
			grenade:SetAttribute("Timer", 0.0)
		end

		-- Increment grenade timer
		local timer = grenade:GetAttribute("Timer")
		timer = timer + deltaTime
		grenade:SetAttribute("Timer", timer)

		-- Explode lit grenades
		if grenadeState == module.GrenadeStates.Lit then
			if timer >= module.GrenadeExplodeTime then
				grenadeState = module.GrenadeStates.Exploded
				grenade:SetAttribute("State", grenadeState)
				grenade:SetAttribute("Timer", 0.0)
			end
		end
	end)
end

return module
```

With the previous state machine in place, you can render grenade effects in a `Class.RunService.RenderStepped` connection within a separate script based on the synchronized grenade state:

```lua title="Render Particles and Sounds based on the Synchronized Grenade State"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local Simulation = require(ReplicatedStorage.Simulation)

local grenade = script.Parent
local previousGrenadeState = nil

-- Highlight instance to indicate grenade state
local highlight = Instance.new("Highlight")
highlight.Parent = grenade
highlight.FillTransparency = 1
highlight.OutlineTransparency = 1
highlight.DepthMode = Enum.HighlightDepthMode.Occluded

RunService.RenderStepped:Connect(function(deltaTime: number)
	local grenadeState = grenade:GetAttribute("State")
	local grenadeTimer = grenade:GetAttribute("Timer")

	-- Emit the lit particles if the grenade is lit
	grenade.LitEmitter.Enabled = grenadeState == Simulation.GrenadeStates.Lit
	-- Play the explosion emitter if the grenade just exploded
	if previousGrenadeState ~= grenadeState then
		if grenadeState == Simulation.GrenadeStates.Exploded and grenadeTimer < 0.2 then
			grenade.ExplosionEmitter:Emit(100)
			grenade.ExplosionSound:Play()
		end
		previousGrenadeState = grenadeState
	end 

	-- Change the grenade's highlight color based on the state and time
	if grenadeState == Simulation.GrenadeStates.Lit then
		highlight.FillColor = Color3.fromRGB(255, 0, 0)
		highlight.FillTransparency = 1 - (grenadeTimer / Simulation.GrenadeExplodeTime)
	elseif grenadeState == Simulation.GrenadeStates.Idle then
		highlight.FillTransparency = 1
	elseif grenadeState == Simulation.GrenadeStates.Exploded then
		highlight.FillTransparency = 1
	elseif grenadeState == Simulation.GrenadeStates.Defused then
		highlight.FillColor = Color3.fromRGB(0, 255, 125)
		highlight.FillTransparency = 0.5
	end
end)
```

## Designing around network latency

Certain gameplay mechanics lend themselves better to networked multiplayer than other mechanics. Players will always have some delay between when another player performs an action and when they receive that player's input. The best way to create a super smooth multiplayer experience is to design your experience with these limitations in mind.

For example, an experience with slower acceleration on player movement will appear smoother than one with higher acceleration because the difference in position caused by the network latency of player input will be less than in an experience with higher acceleration.

As another example, a gameplay mechanic where players can **instantly** trigger a large explosion by pressing an input will have more network artifacts than if the explosion is delayed after the input, as if by lighting a fuse. This puts the resimulation on the fuse effect instead of on the explosion effect which is a less noticeable network artifact.

## Predicting other player inputs

By default, Roblox does not forward the inputs from each client to every other client. Whether this is right for your experience depends on its design:

- For basic humanoid movement, the default behavior means that other player characters' movements are not extrapolated from the authoritative server state and, as a result, other player characters will not mispredict but will render slightly in the past.
- In a racing game, by contrast, the default behavior means that clients will not know whether other players are applying the throttle or other inputs, so other cars may appear behind the local player even if they're actually ahead. To alleviate this, you can store player inputs in [attributes](../../studio/properties.md#instance-attributes) on the server and operate on those synchronized attributes client‑side using `Class.RunService:BindToSimulation()` as demonstrated in the following code sample and the [Racing](https://www.roblox.com/games/134686834388911/Racing-Server-Authority-Template) template. This approach lets you use attributes as inputs to your simulation to have fully replicated player inputs.

```lua title="Storing Player Input in Attributes (ModuleScript)"
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local module = {}

module.storePlayerInput = function(player:Player, humanoidRootPart:BasePart)
	local inputContext:InputContext = player.PlayerGui.InputContext
	local throttle = inputContext.DefuseAction:GetState()
	humanoidRootPart:SetAttribute("Throttle", throttle)
	-- Write any other inputs into attributes...

end

module.Initialize = function()
	RunService:BindToSimulation(function(deltaTime)
		if RunService:IsServer() then
			-- Forward inputs from server to all clients
			for _, player in Players:GetPlayers() do
				local humanoidRootPart:BasePart = player.Character.HumanoidRootPart
				local inputContext:InputContext = player.PlayerGui.InputContext
				module.storePlayerInput(player, humanoidRootPart)
			end
		else
			-- Write local player inputs as attributes
			local player = Players.LocalPlayer
			local humanoidRootPart:BasePart = player.Character.HumanoidRootPart
			local inputContext:InputContext = player.PlayerGui.InputContext
			module.storePlayerInput(player, humanoidRootPart)
		end

		-- Use the attributes as inputs to the game
		for _, player in Players:GetPlayers() do
			local humanoidRootPart:BasePart = player.Character.HumanoidRootPart
			local throttle = humanoidRootPart:GetAttribute("Throttle")
			if throttle then
				-- Apply the throttle to the player's vehicle
			end
		end
	end)
end)

return module
```

## Debugging

There are some new tools and techniques you can use to debug a server‑authoritative experience.

### Server authority visualizer

Pressing <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>F6</kbd> (Windows) or <kbd>⌘</kbd><kbd>Shift</kbd><kbd>F6</kbd> (Mac) opens Studio's **server authority visualizer** which shows several key pieces of information:

<table size="small">
<thead>
<tr>
  <th width="35%">Details</th>
	<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
  <td>**Instance prediction success rate**</td>
	<td>The percentage of correctly predicted instances over the last 8 seconds.</td>
</tr>
<tr>
  <td>**Input accept rate**</td>
	<td>The percentage of all players' inputs that arrived on time on the server. Late inputs will lower this number.</td>
</tr>
<tr>
  <td>**Client-server step delta**</td>
	<td>The number of frames between the client and the server, including the join time of the client. The stability of this number represents the stability of your connection to the server.</td>
</tr>
<tr>
  <td>**RCC heartbeat FPS**</td>
	<td>The frame rate of the simulation on the server. If this number drops below 59, the server cannot keep up with the simulation and the experience will degrade in quality.</td>
</tr>
<tr>
  <td>**Predicted instance count**</td>
	<td>The number of instances your client is [predicting](./index.md#client-prediction).</td>
</tr>
<tr>
  <td>**Input drop reason counts**</td>
<td>
The number of times the server has dropped an input for each reason:
- **[x] too old** — The inputs arrived late, meaning your network worsened or the client could not keep up with the simulation.
- **[x] out of order** — A networking bug occurred that caused your inputs to be rearranged and discarded.
- **[x] buffer full** — The server could not buffer your input. Either your network suddenly improved or the server could not keep up with the simulation.
</td>
</tr>
</tbody>
</table>

### Simulation radius

When relying on automatic prediction (`Enum.PredictionMode.Automatic`), you can visualize the prediction radius around your player character by enabling **Are&nbsp;Regions&nbsp;Enabled** in Studio's settings (<kbd>Alt</kbd><kbd>S</kbd> on Windows; <kbd>⌥</kbd><kbd>S</kbd> on Mac). The green cylinder indicates the range around your character in which instances are predicted, and its radius grows and shrinks based on the performance characteristics of the device.

<img src="../../assets/studio/debugging/Server-Authority-Simulation-Radius.jpg" width="800" alt="Simulation radius around player character with server authority running" />
