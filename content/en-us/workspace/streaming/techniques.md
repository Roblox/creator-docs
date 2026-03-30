---
title: Instance streaming techniques
description: Techniques for using in-experience instance streaming efficiently and effectively.
---

This guide outlines various techniques for using in-experience [instance streaming](./index.md) efficiently and effectively.

## Design intentionally for streaming

Streaming is not free. Behind the scenes, it involves complex engine‑wide systems for networking, state tracking, and dynamic content management. To take full advantage of streaming, design your experience with a clear understanding of gameplay flow and player interaction patterns. Efficient streaming requires intentional content structuring in the [data model](../../projects/data-model.md) and careful consideration of when/where instances need to be available.

## Understand streaming scope

Streaming logic and features apply exclusively to instances that are descendants of `Class.Workspace`, while instances stored in other containers such as `Class.ReplicatedStorage` and `Class.ReplicatedFirst` are ineligible for streaming. For example, placing an [atomic](./index.md#atomic) model under `Class.ReplicatedStorage` does not guarantee atomic replication.

## Organize models appropriately

`Class.Model|Models` with many descendants are costly for the engine to update and maintain, so it's recommended to decompose such models into smaller, modular models. This enables the engine to handle streaming operations more efficiently while also improving the clarity and organization of the experience's structure.

For example, placing all NPCs in a single [atomic](./index.md#atomic) model and dynamically adding/removing instances to/from it is not recommended. Instead, consider encapsulating each NPC, along with its associated scripts and assets, into a self‑contained model to improve organization and modularity when streaming individual characters.

<Alert severity="warning">
Avoid placing parts that are significantly far apart inside a single [atomic](./index.md#atomic) model. Atomic models and their descendants are treated as a single unit, so if parts are widely spread in the 3D world, the engine must consider the entire spatial extent as one unit. This is especially costly if the model's descendants change or parts under the model are frequently resized or repositioned.
</Alert>

## Use atomic models for logical grouping

When a group of instances must always appear together, for example an interactive prop or a building, encapsulate them into an [atomic](./index.md#atomic) model. Because atomic models are parented to `Class.Workspace` on the client only **after** all their initial descendants have been streamed in, the presence of any instance within an atomic model ensures that all of its initial descendants are available. This allows client‑side scripts to safely access instances within an atomic model without excessive use of `Class.Instance:WaitForChild()|WaitForChild()`.

Note that such client-side scripts must still use `Class.Instance:WaitForChild()|WaitForChild()` for the overall atomic model. However, once the model is available, there's no need to call `Class.Instance:WaitForChild()|WaitForChild()` on its initial descendants.

<Alert severity="info">
Atomicity guarantees apply only during initial replication. Once an atomic model has been replicated to the client, any **new** instances added under that model are **not** replicated atomically and are instead streamed according to normal [streaming behavior](./index.md#technical-behavior). Systems that dynamically modify atomic models must handle late‑arriving instances explicitly where necessary.
</Alert>

## Minimize use of persistent models

[Persistent](./index.md#persistent) models are always streamed in after join time and are never streamed out. Excessive use of persistent models can quickly lead to degraded performance and memory pressure. Use a persistent model **only** when it's essential that the model and its descendants remain continuously available to the client.

For example, defining a large persistent model that includes all meshes and parts which "might" be referenced occasionally during gameplay is not an effective design strategy. Instead, group logically related parts and instances into smaller [atomic](./index.md#atomic) models (or persistent models if that is desirable) to allow the engine to stream them in/out as standalone units.

## Avoid nested models

Deeply nested models can interfere with the intended streaming behavior. For example, including a [persistent](./index.md#persistent) model inside an [atomic](./index.md#atomic) model effectively forces the entire atomic model to become persistent. Whenever possible, flatten model hierarchies to reduce coupling, simplify debugging, and avoid unintentional behaviors.

## Avoid client desynchronization

Client‑side desynchronization should be treated as an exception, not a standard design pattern. Introducing client‑only copies or reparenting instances locally can create serious issues.

For example, reparenting an instance locally from `Class.ReplicatedStorage` to `Class.Workspace` can make that instance eligible to be streamed out. Similarly,
cloning an instance locally (`Class.Instance:Clone()`) from `Class.ReplicatedStorage` into `Class.Workspace` creates a client‑only copy that is no longer part of the server replication pipeline and will not receive property updates from the original server‑owned instance.

## Understand timing delay

There may be a slight delay of ~10 milliseconds between when a part is created on the server and when it gets replicated to clients. In each of the following scenarios, you may need to use `Class.Instance:WaitForChild()|WaitForChild()` and other techniques rather than assuming that events and property updates always occur at the same time as part streaming.

<table>
  <thead>
    <tr>
      <th>Scenario</th>
	    <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A client-side script makes a `Class.RemoteFunction` call to the server to create a `Class.BasePart`.</td>
	    <td>When the `Class.RemoteFunction` returns to the client, the `Class.BasePart` may not yet exist, even if it's within a streamed area.</td>
    </tr>
    <tr>
      <td>A server-side script uses a `Class.RemoteEvent` to create a `Class.BasePart` very close to the player character on a client.</td>
	    <td>When the `Class.RemoteEvent` signal is received by the client, the `Class.BasePart` may not yet exist, even if it's within a streamed area.</td>
    </tr>
  </tbody>
</table>

## Detect instance streaming

Streaming works primarily on 3D spatial proximity, so you cannot assume that all instances under `Class.Workspace` are always available on the client. Always validate existence of instances before trying to access them, and/or detect and react to objects streaming in or out. A useful pattern for streaming detection is as follows:

1. Using the [Tags](../../studio/properties.md#instance-tags) section of an instance's properties, assign a logical `Class.CollectionService` tag to all of the affected objects.

2. From a single client‑side script, detect when a tagged object streams in or out through `Class.CollectionService:GetInstanceAddedSignal()|GetInstanceAddedSignal()` and `Class.CollectionService:GetInstanceRemovedSignal()|GetInstanceRemovedSignal()`, then handle the object accordingly. For example, the following code adds tagged `Class.Light` objects into a "flicker" loop when they stream in and removes them when they stream out.

	 ```lua title="Client Script - CollectionService Streaming Detection"
	 local CollectionService = game:GetService("CollectionService")

	 local tagName = "FlickerLightSource"
	 local random = Random.new()
	 local flickerSources = {}

	 -- Detect currently and new tagged parts streaming in or out
	 for _, light in CollectionService:GetTagged(tagName) do
		flickerSources[light] = true
	 end

	 CollectionService:GetInstanceAddedSignal(tagName):Connect(function(light)
		flickerSources[light] = true
	 end)

	 CollectionService:GetInstanceRemovedSignal(tagName):Connect(function(light)
		flickerSources[light] = nil
	 end)

	 -- Flicker loop
	 while true do
		for light in flickerSources do
			light.Brightness = 8 + random:NextNumber(-0.4, 0.4)
		end

		task.wait(0.05)
	 end
	 ```

## Use opportunistic stream out

The `Enum.StreamOutBehavior.Opportunistic|Opportunistic` mode for `Class.Workspace.StreamOutBehavior` allows the client to aggressively garbage collect content outside `Class.Workspace.StreamingTargetRadius`. This significantly reduces memory usage, especially on lower‑end devices, and helps prevent crashes or out‑of‑memory conditions. `Enum.StreamOutBehavior.Opportunistic|Opportunistic` mode is ideal for large or content‑rich experiences that need to remain performant across a wide range of hardware.

## Set model level-of-detail

<Alert severity="success">
SLIM meshes are currently in client beta for Windows and macOS.
</Alert>

`Class.Model|Models` outside of the currently streamed area are not visible by default. However, you can instruct the engine to render lightweight "SLIM" meshes or low resolution "imposter" meshes for models that are not present on clients. You control this behavior through each model's `Class.Model.LevelOfDetail|LevelOfDetail` property.

<img src="../../assets/studio/properties/Model-LevelOfDetail.png" width="320" alt="LevelOfDetail property indicated for Model instance"/>

<GridContainer numColumns="3">
	<figure>
		<img src="../../assets/modeling/model-objects/LevelOfDetail-Original.jpg" alt="A globe model displays in its actual level of detail." />
		<figcaption>Original model</figcaption>
	</figure>
	<figure>
		<img src="../../assets/modeling/model-objects/LevelOfDetail-Slim.jpg" alt="The same globe model with a SLIM mesh, which is recognizable as the original globe." />
		<figcaption>Lightweight "SLIM" mesh (beta)</figcaption>
	</figure>
	<figure>
		<img src="../../assets/modeling/model-objects/LevelOfDetail-Imposter.jpg" alt="The same globe model as a low resolution imposter mesh with rough edges that obscure the globe's details." />
		<figcaption>Low resolution "imposter" mesh</figcaption>
	</figure>
</GridContainer>

<table>
	<thead>
		<tr>
			<th>Model Setting</th>
			<th>Behavior Outside of Streaming Radius</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`Enum.ModelLevelOfDetail.SLIM|SLIM`</td>
			<td>
				Displays a composite mesh of all child parts in the model when the original model is not present on the client. Roblox automatically generates many SLIM (Scalable Lightweight Interactive Model) meshes for the model and uses progressively less complex ones as distance from the camera increases.
				- Visual quality is superior to imposter meshes, with comparable performance.
				- Whether SLIM meshes display at all depends on the position of the **character**. The quality level of SLIM meshes depends on the position of the **camera**.
				- SLIM currently only supports models with static meshes, not skinned meshes, avatars, or animations.
				- The first time a model set to `Enum.ModelLevelOfDetail.SLIM|SLIM` is loaded, Roblox generates its optimized assets in the cloud. This one-time process can take a few moments for very complex models. If you have a large place and don't see some models immediately, wait a few minutes and try again.
				- SLIM relies on models to understand how to group geometry. For best results, use `Class.Model|Models` to group parts that are spatially and logically related (for example, all the parts of a car). For arbitrary organization in your project, use folders, which SLIM ignores.
			</td>
		</tr>
		<tr>
			<td>`Enum.ModelLevelOfDetail.StreamingMesh|StreamingMesh`</td>
			<td>
				Displays an imposter mesh when the model is not present on the client.
				- If a model and its descendant models are all set to `Enum.ModelLevelOfDetail.StreamingMesh|StreamingMesh`, only the top-level model is rendered as an imposter mesh, wrapping all geometries under it as well as its descendant models. For better performance, set descendant models to `Enum.ModelLevelOfDetail.Disabled|Disabled`.
				- Imposter meshes look best at **1024 studs away from the camera** or further. If you reduce `Class.Workspace.StreamingTargetRadius|StreamingTargetRadius` to smaller values, imposter meshes might not be an acceptable visual replacement for the model. Consider whether SLIM is a better fit for your use case.
				- Imposter meshes do not support textures; they render as smooth meshes.
				- If a model is not completely streamed in, the imposter mesh is rendered instead of individual parts of the model. After all individual parts are streamed in, they render and the imposter mesh is ignored.
				- Imposter meshes have no physical significance and are non-existent with respect to [raycasting](../../workspace/raycasting.md), [collision detection](../collisions.md), and physics simulation.
				- Editing a model in Studio, such as adding, deleting, or repositioning child parts or resetting colors automatically updates the representative mesh.
			</td>
		</tr>
		<tr>
			<td>`Enum.ModelLevelOfDetail.Disabled|Disabled` / `Enum.ModelLevelOfDetail.Automatic|Automatic`</td>
			<td>The model isn't present until the player enters the streaming radius and can stream out at any time after the players leaves the radius.</td>
		</tr>
	</tbody>
</table>

## Use streaming radius strategically

The `Class.Workspace.StreamingMinRadius` property defines the area that **must** be loaded before proper gameplay can begin or continue. This minimum radius has a significant impact on both join time and in‑experience performance, especially if the radius is large and excessive content is contained within it.

The `Class.Workspace.StreamingTargetRadius` property defines the broader area that the engine attempts to keep streamed in throughout the runtime session. Compared to the **minimum** radius, content within the **target** radius is given lower priority and it can be progressively loaded without blocking gameplay.

This behavior can be leveraged strategically. Set `Class.Workspace.StreamingTargetRadius` large enough to avoid noticeable gameplay issues or visual inconsistencies, but not so large that it causes the server to stream unnecessary content.

## Utilize streaming integrity

The `Class.Workspace.StreamingIntegrityMode` property controls if/how the client pauses depending on whether sufficient content is streamed in. This prevents situations such as characters falling through unloaded terrain, players accessing/seeing areas that they shouldn't, or players interacting with partially loaded environments.

In most scenarios, the `Enum.StreamingIntegrityMode.PauseOutsideLoadedArea|PauseOutsideLoadedArea` option is recommended to ensure deterministic behavior during initial load and heavy streaming transitions, as well as minimize unpredictable gameplay when the streamed world is incomplete.

<Alert severity="info">
If desired, the default pause screen can be fully replaced with a [custom pause screen](#customize-the-pause-screen).
</Alert>

## Stream proactively

Player movement can often be anticipated. When the next destination is predictable, make server‑side calls to `Class.Player:RequestStreamAroundAsync()` to stream in transient areas that can be temporarily loaded, or use `Class.Player:AddReplicationFocus()` for areas that should remain loaded until explicitly released.

For example, when a player is about to visit another player's house, you can pre‑fetch the destination area using `Class.Player:RequestStreamAroundAsync()|RequestStreamAroundAsync()`, helping minimize pop‑in and providing a smoother transition.

For areas that are visited frequently, you can use `Class.Player:AddReplicationFocus()|AddReplicationFocus()` on a **limited** basis to add an additional replication focus. This keeps those areas resident in memory and prevents them from being streamed out, reducing reload time on subsequent visits.

<Alert severity="warning">
Requesting streaming around an area is **not a guarantee** that the content will be present when the request completes, as streaming is always affected by the client's network bandwidth, memory limitations, and other factors.
</Alert>

The following scripts show how to fire a client-to-server [remote event](../../scripting/events/remote.md) to teleport a player within a place, yielding at the streaming request before moving the character to a new `Datatype.CFrame`.

```lua title="Server Script - Teleport Player Character" highlight="7, 10-14"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local teleportEvent = ReplicatedStorage:WaitForChild("TeleportEvent")

local function teleportPlayer(player, teleportTarget)
	-- Request streaming around target location
	player:RequestStreamAroundAsync(teleportTarget)

	-- Teleport character
	local character = player.Character
	if character and character.Parent then
		local currentPivot = character:GetPivot()
		character:PivotTo(currentPivot * CFrame.new(teleportTarget))
	end
end

-- Call teleport function when the client fires the remote event
teleportEvent.OnServerEvent:Connect(teleportPlayer)
```

```lua title="Client Script - Fire Remote Event"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local teleportEvent = ReplicatedStorage:WaitForChild("TeleportEvent")
local teleportTarget = Vector3.new(50, 2, 120)

-- Fire the remote event
teleportEvent:FireServer(teleportTarget)
```

## Customize the pause screen

Consider customizing the pause screen for when players encounter streaming pauses in your experience. The `Class.Player.GameplayPaused` property indicates the player's current pause state and it can be used with a `Class.Instance:GetPropertyChangedSignal()|GetPropertyChangedSignal()` connection to show or hide a custom GUI.

```lua title="LocalScript"
local Players = game:GetService("Players")
local GuiService = game:GetService("GuiService")

local player = Players.LocalPlayer

-- Disable default pause modal
GuiService:SetGameplayPausedNotificationEnabled(false)

local function onPauseStateChanged()
	if player.GameplayPaused then
		-- Show custom GUI
	else
		-- Hide custom GUI
	end
end

player:GetPropertyChangedSignal("GameplayPaused"):Connect(onPauseStateChanged)
```

## Use on-screen debugging

The engine includes multiple on-screen debug panels that can be enabled/visible on the client using keyboard shortcuts. To access streaming debug information:

1. Open the **Network Summary** debug overlay via <kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>F3</kbd> (Windows) or <kbd>Shift</kbd><kbd>⌘</kbd><kbd>F3</kbd> (Mac).
2. Once the debug overlay is open, press <kbd>Shift</kbd><kbd>1</kbd> repeatedly to cycle through the available panels. The fourth panel is the **Streaming** debug view which displays useful runtime information:

   - Active streaming settings
   - Currently loaded (streamed in) regions
   - Streaming behavior and state

Use this panel to inspect and validate how content is being streamed during gameplay, and to help diagnose issues related to odd gameplay behavior or missing stream areas.
