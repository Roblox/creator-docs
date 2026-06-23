---
title: Techniques and conversion
description: Step‑by‑step guidelines on implementing instance streaming in a non‑streaming game, as well as techniques for using it efficiently and effectively.
---

This guide outlines several techniques for using in-game [instance streaming](./index.md) efficiently and effectively. While there's no "one size fits all" solution for designing a streaming game or converting a non‑streaming game to streaming, following these high‑level steps will get you most of the way there.

<Alert severity="success" style={{marginBottom: '8px'}}>
Set [recommended streaming properties](#streaming-properties) on the top-level `Class.Workspace` object.
</Alert>

<Alert severity="success" style={{marginBottom: '8px'}}>
Configure [model level-of-detail](#model-level-of-detail) to make models look good even when they're not streamed in.
</Alert>

<Alert severity="success" style={{marginBottom: '8px'}}>
[Restructure models](#model-structure) to work best under streaming and enable [SLIM avatars](#slim-avatars).
</Alert>

<Alert severity="success" style={{marginBottom: '8px'}}>
[Update scripts](#script-patterns) to handle a partial client `Class.DataModel` and manage client-side changes that streaming may undo.
</Alert>

<Alert severity="success" style={{marginBottom: '8px'}}>
Test thoroughly under [realistic streaming conditions](#realistic-test-conditions).
</Alert>

## Streaming properties

Once `Class.Workspace.StreamingEnabled|StreamingEnabled` is toggled on for the `Class.Workspace` object in Studio, set its related properties to the following recommended values:

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Recommendation</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.Workspace.EnableSLIMAvatars|EnableSLIMAvatars`</td>
		<td>Use `Enum.RolloutState.Enabled|Enabled` to render standard rig avatars as lightweight, animated stand‑ins when appropriate. See [SLIM avatars](#slim-avatars) for more info.</td>
	</tr>
	<tr>
		<td>`Class.Workspace.ModelStreamingBehavior|ModelStreamingBehavior`</td>
		<td>Use `Enum.ModelStreamingBehavior.Improved|Improved` to enable the most efficient streaming for `Class.Model|Models` with `Class.BasePart` descendants.</td>
	</tr>
	<tr>
		<td>`Class.Workspace.StreamingIntegrityMode|StreamingIntegrityMode`</td>
		<td>Use `Enum.StreamingIntegrityMode.PauseOutsideLoadedArea|PauseOutsideLoadedArea` to balance gameplay integrity without pausing unnecessarily or too often.</td>
	</tr>
	<tr>
		<td>`Class.Workspace.StreamingMinRadius|StreamingMinRadius`</td>
		<td>Use the default of `64` to maximize how much the engine can scale the game down for low‑end devices.</td>
	</tr>
	<tr>
		<td>`Class.Workspace.StreamingTargetRadius|StreamingTargetRadius`</td>
		<td>Use the default of `1024` to strike a good balance between visibility for players on high‑end devices and a reasonable memory footprint.</td>
	</tr>
	<tr>
		<td>`Class.Workspace.StreamOutBehavior|StreamOutBehavior`</td>
		<td>Use `Enum.StreamOutBehavior.Opportunistic|Opportunistic` to allow the client to aggressively garbage collect content, significantly reducing memory usage and helping prevent out‑of‑memory crashes.</td>
	</tr>
</tbody>
</table>

## Model level-of-detail

`Class.Model.LevelOfDetail` helps fill in non‑streamed `Class.Model` content with lightweight composite or imposter meshes, making the world look visually complete. **SLIM** (Scalable Lightweight Interactive Model) composite meshes are particularly effective, as players often cannot distinguish a SLIM mesh from the fully streamed‑in original.

For best results:

- Group parts that are spatially and logically related, for example all the parts of a car.
- Set `Class.Model.LevelOfDetail|LevelOfDetail` to `Enum.ModelLevelOfDetail.SLIM|SLIM` on models that contain **static** meshes and parts. Models that contain skinned meshes, are modified at runtime, or play animations are not supported.
- Keep the spatial extent of each model under ~64 cubic studs to increase the likelihood that the entire actual model streams in together. If a model has very large extents, break it up into smaller modular models and apply an appropriate `Class.Model.LevelOfDetail|LevelOfDetail` to each one.

<GridContainer numColumns="2">
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Disabled.jpg" />
		<figcaption>`Enum.ModelLevelOfDetail.Disabled|Disabled`/`Enum.ModelLevelOfDetail.Automatic|Automatic`</figcaption>
	</figure>
	<figure>
		<img src="../../assets/optimization/streaming/SLIM-Enabled.jpg" />
		<figcaption>`Enum.ModelLevelOfDetail.SLIM|SLIM`</figcaption>
	</figure>
</GridContainer>

## Model structure

Beyond setting [model level‑of‑detail](#model-level-of-detail), the structure and settings of your `Class.Model|Models` has a significant impact on how well streaming performs. As you build out or convert an existing game:

- **Use atomic models for logical grouping** — When a script needs access to all of the parts within a model, set its `Class.Model.ModelStreamingMode|ModelStreamingMode` to `Enum.ModelStreamingMode.Atomic|Atomic`. This allows client‑side scripts to safely access instances inside the model without excessive use of `Class.Instance:WaitForChild()|WaitForChild()` (although such scripts must still use `Class.Instance:WaitForChild()|WaitForChild()` for the overall atomic model).

	<Alert severity="info">
	Atomicity guarantees apply only during initial replication. Once an atomic model has been replicated to the client, any **new** instances added under that model are **not** replicated atomically and are instead streamed according to normal [streaming behavior](./index.md#technical-behavior). Systems that dynamically modify atomic models must handle late‑arriving instances explicitly where necessary.
	</Alert>

- **Minimize persistent models** — [Persistent](./index.md#persistent) models load after join and never stream out, permanently occupying memory. Set a model's `Class.Model.ModelStreamingMode|ModelStreamingMode` to `Enum.ModelStreamingMode.Persistent|Persistent` only if it **must** remain available and accessible to scripts at all times.

- **Decompose container models** — A common non‑streaming pattern is a single huge `Class.Model` that contains many NPCs, props, or similar groupings. Under streaming, container models decrease streaming efficiency and they aren't optimal for [model level‑of‑detail](#model-level-of-detail) which works best with closely grouped instances. Decompose container models into smaller models with physically close or logically related parts.

- **Flatten deeply nested model hierarchies** — Nesting a [persistent](./index.md#persistent) model inside an [atomic](./index.md#atomic) model effectively forces the atomic model to behave as persistent. Flat hierarchies are easier to reason about under streaming.

## SLIM avatars

Platform avatars outside of the currently streamed area are not visible by default, but enabling `Class.Workspace.EnableSLIMAvatars` renders [standard rig](../../avatar/character-bodies/specifications.md#standard-rigs) avatars as lightweight, animated stand‑ins when appropriate. Effectively, the engine:

- Renders a SLIM version when an actual avatar model streams out.
- Swaps SLIM/actual by available resources inside the streaming radius, as SLIM models can be significantly less costly to render than the full resolution model.
- Throttles SLIM animations by scene importance and bandwidth.

The avatar level-of-detail system has specific optimizations for avatars. The following describes what will or won't be processed by SLIM:

<Grid container spacing={2}>
	<Grid item Small={12} Medium={12} Large={6} XLarge={6}>
	<Alert severity="success" variant="outlined" style={{height: '100%', marginBottom: '0', paddingBottom: '0'}}>
	<AlertTitle>SLIM Supported</AlertTitle>
	<ul style={{paddingBottom: '0'}}>
	<li style={{marginBottom: '10px'}}>Roblox-added standard-rig avatars on player join, including the character's body, head, layered clothing, and accessories.</li>
	<li>Avatar changes made between the `Class.Player.CharacterAdded()|CharacterAdded()` event and `Class.Player.CharacterAppearanceLoaded()|CharacterAppearanceLoaded()` event.</li>
	</ul>
	</Alert>
	</Grid>
	<Grid item Small={12} Medium={12} Large={6} XLarge={6}>
	<Alert severity="error" variant="outlined" style={{height: '100%', marginBottom: '0', paddingBottom: '0'}}>
	<AlertTitle>Excluded</AlertTitle>
	<ul style={{marginBottom: '0', paddingBottom: '0'}}>
	<li style={{marginBottom: '10px'}}>R6 and NPC avatars (even standard-rig).</li>
	<li style={{marginBottom: '10px'}}>Custom proportions/clothing/body parts (falls back to "Player Choice").</li>
	<li>Avatar changes made after the `Class.Player.CharacterAppearanceLoaded|CharacterAppearanceLoaded()` event (equipping tools, accessory/clothing changes, etc.).</li>
	</ul>
	</Alert>
	</Grid>
</Grid>

## Script patterns

The following script patterns are most commonly affected by streaming. The correct strategy depends on the intent of the code, so each pattern lists multiple options where appropriate.

### Direct index to descendants

Indexing into `Class.Workspace` descendants with the `.` operator throws an error if any instance in the path isn't currently streamed in. The same applies to `Class.Instance:FindFirstChild()|FindFirstChild()`, `Class.Instance:FindFirstChildWhichIsA()|FindFirstChildWhichIsA()`, and `Class.Instance:FindFirstChildOfClass()|FindFirstChildOfClass()` which return `nil` if the child has not streamed in.

```lua title="Descendant Lookup"
local house1 = workspace:FindFirstChild("House1") -- nil if "House1" has not streamed in
local door = workspace.House1.Door -- Broken if "House1" or "Door" has not streamed in
```

A similar pattern is accessing the `Class.Humanoid` or other character descendants directly inside a `Class.Player.CharacterAdded` connection. Under streaming, the character model is parented to `Class.Workspace` before all of its descendants have replicated, so direct indexing fails.

```lua title="Character Descendants"
local Players = game:GetService("Players")

local player = Players.LocalPlayer

player.CharacterAdded:Connect(function(character)
	local humanoid = character.Humanoid
end)
```

<Tabs>
<TabItem label="Strategy #1">
If the script cannot make progress without an instance, wait for it with `Class.Instance:WaitForChild()|WaitForChild()`:

```lua title="Descendant Lookup"
local house1 = workspace:WaitForChild("House1")
local door = house1:WaitForChild("Door")
```

</TabItem>
<TabItem label="Strategy #2">
When an instance may not be streamed in but the script can proceed without it, `nil`‑check with `Class.Instance:FindFirstChild()`.

```lua title="Descendant Lookup"
local house1 = workspace:FindFirstChild("House1")
local door = house1 and house1:FindFirstChild("Door")
if door then
	door.Color = Color3.new(1, 0, 0)
end
```

</TabItem>
<TabItem label="Strategy #3">
Make the parent a `Class.Model`, set its `Class.Model.ModelStreamingMode|ModelStreamingMode` to `Enum.ModelStreamingMode.Atomic|Atomic`, and place objects like `Door` as descendants. The engine guarantees all of the **initial** descendants are present once the atomic model itself is available, but you'll still need to use `Class.Instance:WaitForChild()|WaitForChild()` on the model itself, as well as instances added to the model **after** it's been replicated.

```lua title="Descendant Lookup"
local house1 = workspace:WaitForChild("House1")

-- House model is atomic; its initial descendants are guaranteed to be present
local door = house1.Door
```

</TabItem>
</Tabs>

### Instances sent remotely

A `Class.RemoteEvent`/`Class.RemoteFunction` signal and the instance it refers to travel independently, so the signal can arrive on the client before the instance is present&nbsp;— or the instance may never be present at all. Two likely causes include:

- Under streaming, there may be a slight delay between when a part/model is created on the server and when it gets replicated to clients. Effectively, a part referenced by a `Class.RemoteEvent`/`Class.RemoteFunction` may simply not exist yet, even inside a streamed area.

- Sending a part/model reference from server to client through a `Class.RemoteEvent` or `Class.RemoteFunction` requires that the instance is replicated to the receiving client. Sending an instance path as a string has the same issue, as the path may resolve to a non‑existent location on the client:

	```lua title="Client Script"
	local ReplicatedStorage = game:GetService("ReplicatedStorage")

	local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

	remoteEvent.OnClientEvent:Connect(function(data)
		local checkpoint = data.checkpoint -- Errors if "checkpoint" isn't streamed in
		local level = workspace.Levels[data.levelPath] -- Errors if path isn't streamed in
	end)
	```

<Tabs>
<TabItem label="Strategy #1">
If the receiving client script needs the instance to proceed, include `Class.Instance:WaitForChild()|WaitForChild()` before using it. Note that this can yield indefinitely if the instance never streams in, so consider adding a timeout as the second parameter of `Class.Instance:WaitForChild()|WaitForChild()`.
</TabItem>
<TabItem label="Strategy #2">
Pre‑fetch the area with `Class.Player:RequestStreamAroundAsync()` before firing the event. This makes it likely (though not guaranteed) that the instance is present when the client receives the event. See [proactive streaming](#proactive-streaming).
</TabItem>
<TabItem label="Strategy #3">
If the script can tolerate the instance being absent for some clients, simply `nil`‑check with `Class.Instance:FindFirstChild()` and skip the work for those clients.
</TabItem>
</Tabs>

### Client desynchronization

Client‑side desynchronization should be treated as an exception, not a standard design pattern. Introducing client‑only copies or reparenting instances locally can create serious issues. Audit your code for places which rely on these types of changes persisting on the client.

For example, reparenting an instance locally from `Class.ReplicatedStorage` to `Class.Workspace` can make that instance eligible to be streamed out. Similarly,
cloning an instance locally (`Class.Instance:Clone()`) from `Class.ReplicatedStorage` into `Class.Workspace` creates a client‑only copy that is no longer part of the server replication pipeline and will not receive property updates from the original server‑owned instance.

The same concept applies when calling `Class.Instance:Destroy()` on the client for a server‑owned object. This removes the instance locally but the server still has it, so it will stream in again with its original state when eligible.

### Proactive streaming

When a player's next destination can be anticipated, make server‑side calls to `Class.Player:RequestStreamAroundAsync()` to stream in transient areas for temporary loading, or use `Class.Player:AddReplicationFocus()` on a **limited** basis for areas that should remain loaded until explicitly released.

For example, when a player character is about to teleport by `Datatype.CFrame` change to another player's house in a distant location, you can pre‑fetch the destination area to minimize pop‑in and provide a smoother transition. The following script shows how a client-to-server [remote event](../../scripting/events/remote.md) can be fired to move a player character using a pre-fetching method. If the pre-fetch request is successful when the function returns, the minimum radius around the target location should be present on the client.

```lua title="Server Script - Teleport Player Character"
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

### Instance property reads

Once an instance streams out, its property updates are no longer replicated to that client. Reading properties such as `Class.BasePart.Position` continue to succeed but return the last replicated value which can be arbitrarily stale.

```lua
local Players = game:GetService("Players")

local player = Players.LocalPlayer

-- Position may be stale if "target" has streamed out
local dist = (target.Position - player.Character.HumanoidRootPart.Position).Magnitude
```

<Tabs>
<TabItem label="Strategy #1">
Move the logic to the server, as server‑side scripts see all instances at all times. This is generally the most reliable option for distance checks and other position‑sensitive logic.
</TabItem>
<TabItem label="Strategy #2">
Detect stream out using [signal change](#signal-change-handling) detection, or test `Class.Instance:FindFirstAncestorWhichIsA()|Instance:FindFirstAncestorWhichIsA("Workspace")` as `false` to skip the stale property check for instances no longer present.
</TabItem>
<TabItem label="Strategy #3">
If the part must always be available, group it inside a `Class.Model` and set the model's `Class.Model.ModelStreamingMode|ModelStreamingMode` to `Enum.ModelStreamingMode.Persistent|Persistent`. Use this approach sparingly, as persistent models never stream out and permanently occupy memory.
</TabItem>
</Tabs>

### Waiting on the critical path

Some non‑streaming games load their map by cloning it from `Class.ReplicatedStorage` into `Class.Workspace`, then wait for it on the client before dismissing a loading screen and signaling readiness. Under streaming this hangs indefinitely&nbsp;— the client's character hasn't spawned yet, so there's no [replication focus](./index.md#replication-focus), and the spatial map instance never streams in.

<Tabs>
<TabItem label="Strategy #1">
Move the loading screen logic so that it doesn't depend on a specific spatial instance being present, for example by signaling readiness once the character has spawned and the immediate surrounding area is streamed in.
</TabItem>
<TabItem label="Strategy #2">
Call `Class.Player:AddReplicationFocus()` at the desired spawn location to give the client a [replication focus](./index.md#replication-focus) before the character spawns.
</TabItem>
</Tabs>

### Signal change handling

Signals such as `Class.Instance.ChildAdded`/`Class.Instance.ChildRemoved` and `Class.CollectionService` signals like `Class.CollectionService:GetInstanceAddedSignal()|GetInstanceAddedSignal()` or `Class.CollectionService:GetInstanceRemovedSignal()|GetInstanceRemovedSignal()` also fire on stream in/out, indistinguishable from real spawns/removals. Receiving scripts can't tell the difference from the signal alone, so logic which assumes a signal corresponds to a "real" event needs to be updated.

<Tabs>
<TabItem label="Strategy #1">
Audit scripts for any signal listeners that could break or change significantly when triggered by stream in and/or stream out. For example, if you play audio or visual effects when an enemy NPC initially spawns into the world, assign each enemy an [attribute](../../studio/properties.md#instance-attributes) such as `Spawned` on the first spawn, and skip replaying the same audio/effects in future stream‑ins of the enemy.

```lua title="Attribute Tracking"
local CollectionService = game:GetService("CollectionService")

local TAG_NAME = "Enemy"

CollectionService:GetInstanceAddedSignal(TAG_NAME):Connect(function(enemy)
	if not enemy:GetAttribute("Spawned") then
		-- Set "Spawned" attribute on enemy for initial spawn
		enemy:SetAttribute("Spawned", true)

		-- Play audio/visual effects for this initial spawn
		playSpawnEffects(enemy)
	end
end)
```

</TabItem>
<TabItem label="Strategy #2">
Assign a logical `Class.CollectionService` tag to all of the affected objects using `Class.CollectionService:AddTag()|AddTag()` or the [Tags](../../studio/properties.md#instance-tags) section of an instance's properties in Studio. Then, from a client‑side script, detect when a tagged object streams in or out through `Class.CollectionService:GetInstanceAddedSignal()|GetInstanceAddedSignal()` and `Class.CollectionService:GetInstanceRemovedSignal()|GetInstanceRemovedSignal()` and handle the object accordingly.

```lua title="Tagged Object Streaming Detection"
local CollectionService = game:GetService("CollectionService")

local TAG_NAME = "FlickerLightSource"

local random = Random.new()
local flickerSources = {}

-- Detect tagged parts currently streamed in
for _, light in CollectionService:GetTagged(TAG_NAME) do
	flickerSources[light] = true
end

-- Detect new tagged parts streaming in or out
CollectionService:GetInstanceAddedSignal(TAG_NAME):Connect(function(light)
	flickerSources[light] = true
end)
CollectionService:GetInstanceRemovedSignal(TAG_NAME):Connect(function(light)
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

</TabItem>
</Tabs>

### Iteration over collections

Client-side collection iterations like `Class.Instance:GetChildren()` and `Class.Instance:GetDescendants()` return only the streamed‑in subset of descendants. This applies even when the parent itself is always replicated, such as a `Class.Folder` directly under `Class.Workspace` whose spatial descendants stream in and out.

```lua
local Players = game:GetService("Players")

local player = Players.LocalPlayer

-- Folder "Homes" is always replicated but its children stream in and out
-- This loop may miss homes that aren't currently streamed in
for _, home in workspace.Homes:GetChildren() do
	if home.Settings.Owner.Value == player.Name then
		return home
	end
end
```

<Tabs>
<TabItem label="Strategy #1">
If a complete enumeration is required, perform the scan on the server and pass the result to the player through a `Class.RemoteEvent` if needed.
</TabItem>
<TabItem label="Strategy #2">
If the anticipated enumeration set is small enough, group each descendant as a `Class.Model` and set `Class.Model.ModelStreamingMode|ModelStreamingMode` to `Enum.ModelStreamingMode.PersistentPerPlayer|PersistentPerPlayer`. This is appropriate for things like a roster of player‑owned plots that's small and game‑critical.
</TabItem>
<TabItem label="Strategy #3">
If the script's purpose is to find the nearest match or operate on whatever's currently visible, partial results may be acceptable. Comment on this assumption inside the script so that other maintainers don't reintroduce it as a bug.
</TabItem>
</Tabs>

### Spatial queries

Client‑side spatial queries like `Class.WorldRoot:Raycast()`, `Class.WorldRoot:GetPartBoundsInBox()`, and `Class.Model:GetBoundingBox()` reflect only streamed‑in content. Whether that's a problem depends on what the query is used for.

<Tabs>
<TabItem label="Strategy #1">
Use the server for queries whose result must reflect the full world, for example a raycast that checks whether the player has line of sight to a distant target.
</TabItem>
<TabItem label="Strategy #2">
If the query is intentionally local, for example a small radius around the player, it's already operating on streamed content and no change is needed.
</TabItem>
<TabItem label="Strategy #3">
To spatially query a complete `Class.Model`, set its `Class.Model.ModelStreamingMode|ModelStreamingMode` to `Enum.ModelStreamingMode.Atomic|Atomic`. An atomic model is guaranteed to have all of its initial descendants present once the model itself is available, so bounds and extents will be accurate.
</TabItem>
<TabItem label="Strategy #4">
If a model's geometry is known at edit time, store its bounds as [attributes](../../studio/properties.md#instance-attributes) on the model itself and read those instead of recomputing on the client.
</TabItem>
</Tabs>

### Other patterns

The following patterns also may also apply and should be carefully considered:

- A `Class.Sound` or `Class.AudioPlayer` parented to a 3D object stops when that object streams out. For ambient audio that should persist regardless of streaming, parent the emitter to a [persistent](./index.md#persistent) model or to a non‑streaming container.

- In-game [UI](../../ui/in-experience-containers.md) objects like `Class.BillboardGui` or `Class.SurfaceGui` as well as [visual effects](../../effects/index.md) like `Class.Beam|Beams` or `Class.Highlight|Highlights` whose adornee or attachment streams out simply stop rendering. This may be the intended behavior, but you should verify it.

- `Class.BasePart.Touched` events, `Class.ProximityPrompt|ProximityPrompts`, `Class.DragDetector|DragDetectors`, and `Class.ClickDetector|ClickDetectors` do not operate for players whose client doesn't have the associated part/model streamed in. If interaction must be possible from any range, the model needs to be [persistent](./index.md#persistent) or the interaction needs a different mechanism.

- For `Class.PathfindingService` and client‑side pathfinding, the pathfinder only sees streamed‑in geometry on the client and it may route through obstacles that exist on the server. See [here](../../characters/pathfinding.md#streaming-compatibility) for strategies.

## Realistic test conditions

Once [scripts are updated](#script-patterns), test the game thoroughly. Streaming bugs often only manifest at the edges of the streamed area or during transitions, so only testing near spawn or at target radius isn't sufficient.

- Test with `Class.Workspace.StreamingTargetRadius` set to its minimum value (`64`). Some streaming bugs only appear when the streamed area is small.

- Play through the full traversal patterns of the game, teleport between distant areas, and revisit areas after leaving them. These are the situations that exercise stream in and stream out the most.

- Use the [streaming debug overlay](./index.md#runtime-debugging) to monitor the active streaming settings, currently loaded regions, and runtime streaming state.

- Watch the [Output](../../studio/output.md) window and [Developer Console](../../studio/developer-console.md) for errors, as many of the [script patterns](#script-patterns) produce errors rather than silent misbehavior. Pay particular attention to errors of the form `attempt to index nil with ...` which often indicate a missing `Class.Instance:WaitForChild()|WaitForChild()` call.

- Equip and activate `Class.Tool|Tools`, fire weapons, and trigger different game interactions.
