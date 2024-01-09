---
title: Instance Streaming
description: Instance streaming allows the Roblox engine to dynamically load and unload 3D content in regions of the world.
---

In-experience **instance streaming** allows the Roblox engine to dynamically load and unload 3D content and related instances in regions of the world. This can improve the overall player experience in several ways, for example:

- **Faster join times** &mdash; Players can start playing in one part of the world while more of the world loads in the background.
- **Memory efficiency** &mdash; Experiences can be played on devices with less memory since content is dynamically streamed in and out. More immersive and detailed worlds can be played on a wider range of devices.
- **Improved performance** &mdash; Better frame rates and performance, as the server can spend less time and bandwidth synchronizing changes between the world and players in it. Clients spend less time updating instances that aren't currently relevant to the player.
- **Level of detail** &mdash; Distant models and terrain remain visible even when they're not streamed to clients, keeping the experience optimized without entirely sacrificing background visuals.

## Enabling Streaming

Instance streaming is enabled through the **StreamingEnabled** property of the **Workspace** object in Studio. This property cannot be set in a script. Streaming is enabled by default for new places created in Studio.

<img src="../assets/studio/properties/Workspace-StreamingEnabled.png" width="320" alt="StreamingEnabled property enabled on Workspace object in Studio" />

Once enabled, it's recommended that you adhere to the following practices:

- Because clients will not typically have the entire `Class.Workspace` available locally, use the appropriate tool/API to ensure that instances exist before attempting to access them in a `Class.LocalScript`. For example, utilize [per‑model streaming controls](#per-model-streaming-controls), [detect instance streaming](#detecting-instance-streaming), or use `Class.Instance:WaitForChild()|WaitForChild()` on objects that may not exist.
- Minimize placement of 3D content outside of `Class.Workspace`. Content in containers such as `Class.ReplicatedStorage` or `Class.ReplicatedFirst` is ineligible for streaming and may negatively impact join time and memory usage.
- If you move a player's character by setting its `Datatype.CFrame`, do so from a server-side `Class.Script` and use [streaming requests](#requesting-area-streaming) to more quickly load data around the character's new location.
- Manually set the player's `Class.Player.ReplicationFocus|ReplicationFocus` only in unique situations such as in experiences that don't use a `Class.Player.Character`. In these cases, make sure the focus is near the object(s) that the player controls to ensure content continues to stream in around the player's interaction point.

## Technical Behavior

### Streaming In

By default, when a player joins an experience with instance streaming enabled, instances in the `Class.Workspace` are replicated to the client, **excluding** the following:

- `Class.Part|Parts` or `Class.MeshPart|MeshParts`
- [Atomic](#atomic), [Persistent](#persistent), or [PersistentPerPlayer](#persistentperplayer) models
- Descendants of the above instances
- Non-replicating instances

Then, during gameplay, the server may stream necessary instances to the client, as they are needed.

<img src="../assets/optimization/streaming/Technical-Behavior.svg" width="800" height="464" alt="Diagram showing when various instances and their descendants stream in" />

<figcaption><sup>1</sup> Terrain is treated uniquely, in that the instance replicates to the client when the experience loads, but terrain regions only stream in when needed</figcaption><br />

<h4>Model Behavior</h4>

Models set to non-default behavior like [Atomic](#atomic) stream in under special rules as outlined in [Per‑Model Streaming Controls](#per-model-streaming-controls). However, default (nonatomic) models are sent differently based on whether [ModelStreamingBehavior](#modelstreamingbehavior) is set to **Default** (**Legacy**) or **Improved**.

<Tabs>
<TabItem label="Default / Legacy">

<img src="../assets/studio/properties/Workspace-ModelStreamingBehavior-Default.png" width="320" height="121" alt="ModelStreamingBehavior property of Workspace object" />

When [ModelStreamingBehavior](#modelstreamingbehavior) is set to **Default**/**Legacy**, the `Class.Model` container and its non‑spatial descendants such as `Class.Script|Scripts` replicate to the client when the player joins. Then, when eligible, the model's `Class.BasePart` descendants stream in.

<img src="../assets/optimization/streaming/Model-Stream-In-Default.svg" width="800" height="176" alt="Diagram showing default model stream in behavior" />

</TabItem>
<TabItem label="Improved">

<img src="../assets/studio/properties/Workspace-ModelStreamingBehavior-Improved.png" width="320" height="121" alt="ModelStreamingBehavior property of Workspace object" />

When [ModelStreamingBehavior](#modelstreamingbehavior) is set to **Improved**, model streaming behavior varies by whether the model is **spatial** (contains `Class.BasePart` descendants) or **non‑spatial** (contains no `Class.BasePart` descendants).

- Instead of on player join, a **spatial** model (one containing `Class.BasePart` descendants) is sent only when one of its `Class.BasePart` descendants is eligible to stream in. At that point, the model and part are replicated, along with the model's non‑spatial descendants. Then, when eligible, the model's other spatial descendants stream in.

  <img src="../assets/optimization/streaming/Model-Stream-In-Improved-Spatial.svg" width="800" height="176" alt="Diagram showing improved spatial model stream in behavior" />

- A key consideration is when a spatial model and all of its `Class.BasePart|BaseParts` belong to a single [network ownership](../physics/network-ownership.md) unit, such as an avatar or NPC character model. In such cases, the entire model will stream in atomically.

  <img src="../assets/optimization/streaming/Model-Stream-In-Improved-Character.svg" width="800" height="400" alt="Diagram showing improved character model stream in behavior" />

- For a **non‑spatial** model (one without `Class.BasePart` descendants), the model container and its descendants are replicated to the client soon after the player joins, and all are exempt from streaming out. Assuming the model exists in `Class.Workspace` when the player joins, this occurs before the `Class.Workspace.PersistentLoaded` event fires.

  <img src="../assets/optimization/streaming/Model-Stream-In-Improved-Non-Spatial.svg" width="800" height="176" alt="Diagram showing improved non-spatial model stream in behavior" />

</TabItem>
</Tabs>

### Streaming Out

During gameplay, a client may stream out (remove from the player's `Class.Workspace`) regions and the `Class.BasePart|BaseParts` contained within them, based on the behavior set by [StreamOutBehavior](#streamoutbehavior). The process begins with regions furthest away from the player's character (or `Class.Player.ReplicationFocus|ReplicationFocus`) and moves in closer as needed. Regions inside the [StreamingMinRadius](#streamingminradius) range never stream out.

When an instance streams out, it is parented to `nil` so that any existing Luau state will reconnect if the instance streams back in. As a result, removal signals such as `Class.Instance.ChildRemoved|ChildRemoved` or `Class.Instance.DescendantRemoving|DescendantRemoving` fire on its **parent** or **ancestor**, but the instance itself is not destroyed in the same sense as an `Class.Instance:Destroy()` call.

To further anticipate stream out, examine these scenarios:

<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Example</th>
	  <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A part is **created** locally through `Class.Instance.new()` in a `Class.LocalScript`.</td>
      <td>In a "capture the flag" game, you create and attach blue helmet parts to all players on the blue team through a `Class.LocalScript`.</td>
	  <td>The part is not replicated to the server, and it is exempt from streaming out **unless** you make it a descendant of a part that exists on the server, such as a part within a player's character model.</td>
    </tr>
    <tr>
      <td>A part is **cloned** locally from `Class.ReplicatedStorage` through `Class.Instance:Clone()` in a `Class.LocalScript`.</td>
      <td>A wizard character casts a spell by activating a `Class.Tool`, upon which an object including several [special effects](../environment/index.md#special-effects) is cloned from `Class.ReplicatedStorage` and parented to the workspace at the wizard's position.</td>
	  <td>The part is not replicated to the server, and it is exempt from streaming out **unless** you make it a descendant of a part that exists on the server.</td>
    </tr>
	<tr>
      <td>A part is **reparented** from `Class.ReplicatedStorage` to the workspace via a `Class.LocalScript`.</td>
      <td>A "wizard's hat" is stored in `Class.ReplicatedStorage`. When a player chooses to play on the wizard's team, the hat is moved into their character model via a `Class.LocalScript`.</td>
	  <td>The part remains eligible for streaming out since it came from the server and was replicated to `Class.ReplicatedStorage`. Avoid this pattern as it causes a desync between the client and server, and the part may stream out; instead, **clone** the part.</td>
    </tr>
  </tbody>
</table>

<h4>Model Behavior</h4>

If you set [ModelStreamingBehavior](#modelstreamingbehavior) to **Improved**, the engine may stream out [Default](#default--nonatomic) ([Nonatomic](#default--nonatomic)) models when they're eligible to stream out, potentially freeing up memory on the client and reducing the instances which need property updates.

<img src="../assets/studio/properties/Workspace-ModelStreamingBehavior-Improved.png" width="320" alt="ModelStreamingBehavior property of Workspace object" />

Under **Improved** model streaming behavior, streaming out of [Default](#default--nonatomic) ([Nonatomic](#default--nonatomic)) models is based on whether the model is **spatial** (contains `Class.BasePart` descendants) or **non‑spatial** (contains no `Class.BasePart` descendants).

- A spatial model only streams out completely when its last remaining `Class.BasePart` descendant streams out, since some of the model's spatial parts may be near to the player/replication focus and some far away.
- A non‑spatial model only streams out when an ancestor streams out, equivalent to legacy streaming out behavior.

### Assemblies and Mechanisms

When at least one part of an [assembly](../physics/assemblies.md) is eligible for streaming in, all of the assembly's parts also stream in. However, an assembly will not stream **out** until **all** of its parts are eligible for streaming out. During streaming, all of the `Class.Constraint|Constraints` and `Class.Attachment|Attachments` descending from `Class.BasePart|BaseParts` and atomic or persistent `Class.Model|Models` also stream, helping to ensure consistent physics updates on clients.

Note that assemblies with **anchored** parts are treated slightly differently than assemblies with only unanchored parts:

<table>
  <thead>
    <tr>
      <th>Assembly Composition</th>
      <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Unanchored parts only</td>
      <td>Entire assembly is sent as an atomic unit.</td>
    </tr>
    <tr>
      <td>Anchored [root&nbsp;part](../physics/assemblies.md#assembly-root-part)</td>
      <td>Only the parts, attachments, and constraints needed to link the streamed parts to the root part are streamed in together.</td>
    </tr>
  </tbody>
</table>

<Alert severity="warning">
Avoid creating moving assemblies with unnecessarily large numbers of instances, as all of the instances streaming in unison may cause network/CPU spikes.
</Alert>

### Timing Delay

There may be a slight delay of ~10 milliseconds between when a part is created on the server and when it gets replicated to clients. In each of the following scenarios, you may need to use `Class.Instance:WaitForChild()|WaitForChild()` and other techniques rather than assuming that events and property updates always occur at the same time as part streaming.

<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Example</th>
	  <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A `Class.LocalScript` makes a `Class.RemoteFunction` call to the server to create a part.</td>
      <td>A player activates a `Class.Tool` locally to spawn a part on the server that all players can see and interact with.</td>
	  <td>When the remote function returns to the client, the part may not yet exist, even though the part is close to the client focus and within a streamed area.</td>
    </tr>
    <tr>
      <td>A part is added to a character model on the server via a `Class.Script` and a `Class.RemoteEvent` is fired to a client.</td>
      <td>When a player joins the police team, a "police&nbsp;badge" part stored in `Class.ServerStorage` is cloned and attached to the player's character model. A `Class.RemoteEvent` is fired and received by that player's client in order to update a local UI element.</td>
	  <td>Although the client receives the event signal, there is no guarantee that the part has already streamed to that client.</td>
    </tr>
	<tr>
      <td>A part collides with an invisible region on the server and triggers a `Class.RemoteEvent` on the client.</td>
      <td>A player kicks a soccer ball into a goal, triggering a "goal&nbsp;scored" event. </td>
	  <td>Other players that are close to the goal may see the "goal&nbsp;scored" event before the ball has been streamed to them.</td>
    </tr>
  </tbody>
</table>

## Streaming Properties

The following properties control how instance streaming applies to your experience. All of these properties are **non-scriptable** and must be set on the **Workspace** object in Studio.

<img src="../assets/studio/properties/Workspace-Streaming-Properties.png" width="320" alt="Streaming properties shown on Workspace object in Studio" />

### ModelStreamingBehavior

Controls whether [Default](#default--nonatomic) ([Nonatomic](#default--nonatomic)) models are replicated when a player joins, or are only sent when needed. If this property is set to **Improved**, models in `Class.Workspace` will only be sent to clients when needed, potentially speeding up join times. See [Technical Behavior](#technical-behavior) for more details.

### StreamingIntegrityMode

Your experience may behave in unintended ways if a player moves into a region of the world that hasn't been streamed to them. The **streaming integrity** feature offers a way to avoid those potentially problematic situations. Please see the `Enum.StreamingIntegrityMode` documentation for more details.

### StreamingMinRadius

The **StreamingMinRadius** property indicates the radius around the player's character (or `Class.Player.ReplicationFocus|ReplicationFocus`) in which instances stream in at the highest priority. Care should be taken when increasing the default, as doing so will require more memory and more server bandwidth at the expense of other components.

### StreamingTargetRadius

The **StreamingTargetRadius** property controls the maximum distance away from the player's character (or `Class.Player.ReplicationFocus|ReplicationFocus`) in which instances stream in. Note that the engine is allowed to retain previously loaded instances beyond the target radius, memory permitting.

A smaller **StreamingTargetRadius** reduces server workload, as the server will not stream in additional instances beyond the set value. However, the target radius is also the maximum distance players will be able to see the full detail of your experience, so you should pick a value that creates a nice balance between these.

<Alert severity="info">
**StreamingTargetRadius** should be larger than **StreamingMinRadius**. 3D content between the target radius and the minimum radius acts as a buffer in case the client temporarily stops receiving new content from the server. When the minimum radius and the target radius are equal, there is no buffer, which can lead to an increase in network pauses or an otherwise suboptimal user experience.
</Alert>

### StreamOutBehavior

The **StreamOutBehavior** property sets the [streaming out](#streaming-out) behavior according to one of the following values:

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Default**</td>
      <td>Default behavior, currently the same as **LowMemory**.</td>
    </tr>
    <tr>
      <td>**LowMemory**</td>
      <td>The client only streams out parts in a low memory situation and may remove 3D content until only the minimum radius is present.</td>
    </tr>
	<tr>
      <td>**Opportunistic**</td>
      <td>Regions beyond [StreamingTargetRadius](#streamingtargetradius) can be removed on the client even when there is no memory pressure. In this mode, the client never removes instances that are closer than the target radius, except in low memory situations.</td>
    </tr>
  </tbody>
</table>

## Per-Model Streaming Controls

Globally, the [ModelStreamingBehavior](#modelstreamingbehavior) property lets you control how models are streamed in on join. Additionally, to avoid issues with streaming on a per-model basis and minimize use of `Class.Instance:WaitForChild()|WaitForChild()`, you can customize how `Class.Model|Models` and their descendants stream through their `Class.Model.ModelStreamingMode|ModelStreamingMode` property.

<img src="../assets/studio/properties/Model-ModelStreamingMode.png" width="320" alt="ModelStreamingMode property indicated on a model's properties in Studio" />

### Default / Nonatomic

When a `Class.Model` is set to **Default** or **Nonatomic**, streaming behavior varies based on whether [ModelStreamingBehavior](#modelstreamingbehavior) is set to **Default** (**Legacy**) or **Improved**.

<table>
  <thead>
    <tr>
      <th>[ModelStreamingBehavior](#modelstreamingbehavior)</th>
      <th>Technical Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Default** (**Legacy**)</td>
      <td>The model is replicated when a player joins. This potentially results in more instances sent during loading, more instances stored in memory, and additional complexity for scripts that want to access the model's descendants. For example, a separate `Class.LocalScript` will need to use `Class.Instance:WaitForChild()|WaitForChild()` on a descendant `Class.BasePart` inside the model.</td>
    </tr>
    <tr>
      <td>**Improved**</td>
      <td>The model is only sent when needed, potentially speeding up join times.</td>
    </tr>
  </tbody>
</table>

See [Technical Behavior](#technical-behavior) for more details.

### Atomic

If a `Class.Model` is changed to **Atomic**, all of its descendants are streamed in together when a descendant `Class.BasePart` is eligible. As a result, a separate `Class.LocalScript` that needs to access instances in the model would need to use`Class.Instance:WaitForChild()|WaitForChild()` on the model itself, but not on a descendant `Class.MeshPart` or `Class.Part` since they are sent alongside the model.

An atomic model is only streamed out when all of its descendant parts are eligible for streaming out, at which point the entire model streams out together. If only some parts of an atomic model would typically be streamed out, the entire model and its descendants remain on the client.

<img src="../assets/optimization/streaming/ModelStreamingMode-Atomic.svg" width="800" height="336" alt="Diagram showing Atomic model streaming along with children" />

```lua title='LocalScript' highlight='2, 5-6'
-- Atomic model does not exist at load time; use WaitForChild()
local model = workspace:WaitForChild("Model")

-- Descendant parts stream in with model and are immediately accessible
local meshPart = model.MeshPart
local part = model.Part
```

### Persistent

**Persistent** models are not subject to normal streaming in or out. They are sent as a complete atomic unit soon after the player joins and before the `Class.Workspace.PersistentLoaded` event fires. Persistent models and their descendants are never streamed out, but to safely handle streaming in within a separate `Class.LocalScript`, you should use `Class.Instance:WaitForChild()|WaitForChild()` on the parent model, or wait for the `Class.Workspace.PersistentLoaded|PersistentLoaded` event to fire.

<img src="../assets/optimization/streaming/ModelStreamingMode-Persistent.svg" width="800" height="336" alt="Diagram showing Persistent model streaming along with children" />

```lua title='LocalScript' highlight='2, 5-6'
-- Persistent model does not exist at load time; use WaitForChild()
local model = workspace:WaitForChild("Model")

-- Descendant parts stream in with model and are immediately accessible
local meshPart = model.MeshPart
local part = model.Part
```

<Alert severity="warning">
Persistent models are intended for very rare circumstances, such as when a small number of parts must always be present on clients for `Class.LocalScript` use. If possible, server-side `Class.Script|Scripts` should be used, or `Class.LocalScript|LocalScripts` should be tolerant of parts streaming in and out. Persistent models are **not** intended to circumvent streaming, and overuse may negatively impact performance.

Avoid creating catch-all persistent models that have a large number of sub-models. For example, if you're creating an experience with a large number of vehicles, do **not** create a single persistent model which contains every vehicle in the experience that you want to be persistent. Instead, set each individual vehicle model to be persistent, if necessary.
</Alert>

<Alert severity="info">
Runtime performance impacts of persistent models after replication are mostly the same as regular models without streaming enabled. An exception is when the contents of the model change frequently or if parts in the model have changes to their physical connections. In these cases, the engine must perform extra updates to ensure those changes are reflected correctly on all clients, so it's best to avoid frequent changes to persistent models.
</Alert>

### PersistentPerPlayer

Models set to **PersistentPerPlayer** behave the same as [Persistent](#persistent) for players that have been added using `Class.Model:AddPersistentPlayer()`. For other players, behavior is the same as [Atomic](#atomic). You can revert a model from player persistence via `Class.Model:RemovePersistentPlayer()`.

## Requesting Area Streaming

If you set the `Datatype.CFrame` of a player character to a region which isn't currently loaded, [streaming pause](#customizing-the-pause-screen) occurs, if enabled. If you know the character will be moving to a specific area, you can call `Class.Player:RequestStreamAroundAsync()` to request that the server sends regions around that location to the client.

The following scripts show how to fire a client-to-server [remote event](../scripting/events/remote.md) to teleport a player within a place, yielding at the streaming request before moving the character to a new `Datatype.CFrame`.

```lua title='Script - Teleport Player Character' highlight='7, 10-14'
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

```lua title='LocalScript - Fire Remote Event'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local teleportEvent = ReplicatedStorage:WaitForChild("TeleportEvent")
local teleportTarget = Vector3.new(50, 2, 120)

-- Fire the remote event
teleportEvent:FireServer(teleportTarget)
```

<Alert severity="error">
 Requesting streaming around an area is **not a guarantee** that the content will be present when the request completes, as streaming is affected by the client's network bandwidth, memory limitations, and other factors.
</Alert>

## Detecting Instance Streaming

In some cases, it's necessary to detect when an object streams in or out and react to that event. A useful pattern for streaming detection is as follows:

1. Using the [Tags](../studio/properties.md#instance-tags) section of an instance's properties, or Studio's [Tag&nbsp;Editor](../studio/view-tab.md#windows-and-tools), assign a logical `Class.CollectionService` tag to all of the affected objects.

2. From a single `Class.LocalScript`, detect when a tagged object streams in or out through `Class.CollectionService:GetInstanceAddedSignal()|GetInstanceAddedSignal()` and `Class.CollectionService:GetInstanceRemovedSignal()|GetInstanceRemovedSignal()`, then handle the object accordingly. For example, the following code adds tagged `Class.Light` objects into a "flicker" loop when they stream in and removes them when they stream out.

   ```lua title='LocalScript - CollectionService Streaming Detection' highlight='10-15'
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

## Customizing the Pause Screen

The `Class.Player.GameplayPaused` property indicates the player's current pause state. This property can be used with a `Class.Instance:GetPropertyChangedSignal()|GetPropertyChangedSignal()` connection to show or hide a custom GUI.

```lua title='LocalScript'
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

## Model Level of Detail

When streaming is enabled, `Class.Model|Models` outside of the currently streamed area will not be visible by default. However, you can instruct the engine to render lower resolution "imposter" meshes for models that are not present on clients through each model's `Class.Model.LevelOfDetail|LevelOfDetail` property.

<img src="../assets/studio/properties/Model-LevelOfDetail.png" width="320" alt="LevelOfDetail property indicated for Model instance"/>

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/model-objects/LevelOfDetail-Actual.jpg" alt="Model in actual level of detail" />
    <figcaption>Actual model</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/model-objects/LevelOfDetail-StreamingMesh.jpg" alt="Model represented as low resolution imposter mesh" />
    <figcaption>Low resolution "imposter" mesh</figcaption>
  </figure>
</GridContainer>

<table>
  <thead>
    <tr>
      <th>Model Setting</th>
      <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**StreamingMesh**</td>
      <td>Activates the asynchronous generation of an imposter mesh to display when the model is not present on clients.</td>
    </tr>
    <tr>
      <td>**Disabled** / **Automatic**</td>
      <td>The model disappears when outside the streaming radius.</td>
    </tr>
  </tbody>
</table>

When using imposter meshes, note the following:

- Imposter meshes are designed to be seen at **1024 studs away from the camera** or further. If you've reduced [StreamingTargetRadius](#streamingtargetradius) to a much smaller value like 256, imposter meshes may not be visually acceptable for the model they replace.
- If a model **and** its descendant models are all set to **StreamingMesh**, only the top-level ancestor model is rendered as an imposter mesh, wrapping all geometries under the ancestor as well as its descendant models. For better performance, it's recommended that you use **Disabled** for descendant models.
- Textures are not supported; imposter meshes are rendered as smooth meshes.
- While a `Class.Model` is not completely streamed in, the imposter mesh is rendered instead of individual parts of the model. Once all individual parts are streamed in, they render and the imposter mesh is ignored.
- Imposter meshes have no physical significance and
  they act as non-existent with respect to [raycasting](../workspace/raycasting.md), [collision detection](./collisions.md),
  and physics simulation.
- Editing a model in Studio, such as adding/deleting/repositioning child parts or resetting colors, automatically updates the representative mesh.
