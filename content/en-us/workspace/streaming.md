---
title: Content Streaming
description: Content streaming allows the Roblox engine to dynamically load and unload 3D content in regions of the world.
---

In-experience **content streaming** allows the Roblox engine to dynamically load and unload 3D content and related instances in regions of the world. This can improve the overall player experience in several ways, for example:

- **Faster join times** &mdash; Players can start playing in one part of the world while more of the world loads in the background.
- **Memory efficiency** &mdash; Experiences can be played on devices with less memory since content is dynamically streamed in and out. More immersive and detailed worlds can be played on a wider range of devices.
- **Improved performance** &mdash; Better frame rates and performance, as the server can spend less time and bandwidth synchronizing changes between the world and players in it.
- **Level of detail** &mdash; Distant models and terrain remain visible even when they're not streamed to clients, keeping the experience optimized without entirely sacrificing background visuals.

## Enabling Content Streaming

Content streaming can be enabled through the **StreamingEnabled** property of the **Workspace** object in Studio (this property cannot be set in a script).

<img src="../assets/optimization/content-streaming/Properties-Workspace-StreamingEnabled.png" width="320" alt="StreamingEnabled property enabled on Workspace object in Studio" />

Once enabled, it's recommended that you adhere to the following practices:

- Because clients will not typically have the entire `Class.Workspace` available locally, use the appropriate tool/API to ensure that instances exist before attempting to access them in a `Class.LocalScript`. For example, use `Class.Instance:WaitForChild()|WaitForChild()` on objects that may not exist, [detect instance streaming](#detecting-instance-streaming), or utilize [model streaming controls](#model-streaming-controls).
- Minimize placement of 3D content outside of `Class.Workspace`. Content in containers such as `Class.ReplicatedStorage` or `Class.ReplicatedFirst` is ineligible for streaming and may negatively impact join time and memory usage.
- If you move a player's character by setting its `Datatype.CFrame`, do so from a server-side `Class.Script` and use [streaming requests](#requesting-area-streaming) to more quickly load data around the character's new location.
- Avoid parenting a part to another part, especially when the parent is far away from the child. Instead, group them as a `Class.Model` or place them inside a `Class.Folder`.
- Manually set the player's `Class.Player.ReplicationFocus|ReplicationFocus` only in unique situations such as in experiences that don't use a `Class.Player.Character`. In these cases, make sure the focus is near the object(s) that the player controls to ensure content continues to stream in around the player's interaction point.

## Technical Behavior

### Streaming In

When a player joins, all instances in the `Class.Workspace` are sent to the client, **excluding** `Class.BasePart|BaseParts`, atomic or persistent models, and descendants of those instances. Then, during gameplay, the server streams in `Class.BasePart|BaseParts` and their descendants to the client, as well as atomic and persistent models.

<br />
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-A.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when the experience loads</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-B.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when eligible for streaming in</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-D.png" width="22" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Instance sent along with its parent</figcaption></p></Grid>
</Grid>

<img src="../assets/optimization/content-streaming/Chart-Streaming-In.png" width="800" alt="Diagram showing the Workspace with various child instances" />
<figcaption><sup>&dagger;</sup> Terrain is treated uniquely, in that the instance streams in when the experience loads, but terrain regions only stream in when needed</figcaption>

### Streaming Out

During gameplay, a client may stream out (remove from the player's `Class.Workspace`) regions and the `Class.BasePart|BaseParts` contained within them, based on the behavior set by [StreamOutBehavior](#streamoutbehavior). The process begins with regions furthest away from the player's character (or `Class.Player.ReplicationFocus|ReplicationFocus`) and moves in closer as needed. Regions inside the [StreamingMinRadius](#streamingminradius) range never stream out.

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

There may be a slight delay of ~10 milliseconds between when a part is created on the server and when it gets sent to clients. In each of the following scenarios, you may need to use `Class.Instance:WaitForChild()|WaitForChild()` and other techniques rather than assuming that events and property updates always occur at the same time as part streaming.

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

The following properties control how content streaming applies to your experience. All of these properties are **non-scriptable** and must be set on the **Workspace** object in Studio.

<img src="../assets/optimization/content-streaming/Properties-Workspace-Streaming-Properties.png" width="320" alt="Streaming properties shown on Workspace object in Studio" />

### StreamingIntegrityMode

Your experience may behave in unintended ways if a player moves into a region of the world that hasn't been streamed to them. The **Streaming Integrity** feature offers a way to avoid those potentially problematic situations. Please see the `Enum.StreamingIntegrityMode` documentation for more details.

### StreamingMinRadius

The **StreamingMinRadius** property indicates the radius around the player's character (or `Class.Player.ReplicationFocus|ReplicationFocus`) in which content streams in at the highest priority. Care should be taken when increasing the default, as doing so will require more memory and more server bandwidth at the expense of other components.

### StreamingTargetRadius

The **StreamingTargetRadius** property controls the maximum distance away from the player's character (or `Class.Player.ReplicationFocus|ReplicationFocus`) in which content streams in. Note that the engine is allowed to retain previously loaded content beyond the target radius, memory permitting.

A smaller **StreamingTargetRadius** reduces server workload, as the server will not stream in additional content beyond the set value. However, the target radius is also the maximum distance players will be able to see the full detail of your experience, so you should pick a value that creates a nice balance between these.

<Alert severity="info">
**StreamingTargetRadius** should be larger than **StreamingMinRadius**. The content between the target radius and the minimum radius acts as a buffer in case the client temporarily stops receiving new content from the server. When the minimum radius and the target radius are equal, there is no buffer, which can lead to an increase in network pauses or an otherwise suboptimal user experience.
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
      <td>The client only streams out parts in a low memory situation and may remove content until only the minimum radius is present.</td>
    </tr>
	<tr>
      <td>**Opportunistic**</td>
      <td>Regions beyond [StreamingTargetRadius](#streamingtargetradius) can be removed on the client even when there is no memory pressure. In this mode, the client never removes content that is closer than the target radius, except in low memory situations.</td>
    </tr>
  </tbody>
</table>

## Model Streaming Controls

As noted previously, the client of a joining player receives all instances in the `Class.Workspace`, **excluding** `Class.BasePart|BaseParts`, atomic or persistent models, and descendants of those instances. Then, during gameplay, the server streams in `Class.BasePart|BaseParts` and their descendants to the client, as well as atomic and persistent models.

To avoid issues with model streaming and minimize use of `Class.Instance:WaitForChild()|WaitForChild()`, you can customize how `Class.Model|Models` and their descendants stream through their `Class.Model.ModelStreamingMode|ModelStreamingMode` property.

<img src="../assets/optimization/content-streaming/Properties-Model-ModelStreamingMode.png" width="320" alt="ModelStreamingMode property indicated on a model's properties in Studio" />

<table>
  <thead>
    <tr>
      <th>Setting</th>
      <th>Streaming Behavior</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Default](#default--nonatomic) / [Nonatomic](#default--nonatomic)</td>
      <td>When a default/nonatomic `Class.Model` is streamed, its descendants are also sent, except for `Class.BasePart` descendants.</td>
    </tr>
    <tr>
      <td>[Atomic](#atomic)</td>
      <td>An atomic `Class.Model` and all of its descendants are streamed in/out together. For streaming in, this applies when **any** descendant `Class.BasePart` is eligible for streaming in. For streaming out, this applies when **all** descendant `Class.BasePart|BaseParts` are eligible for streaming out.</td>
    </tr>
	<tr>
      <td>[Persistent](#persistent)</td>
      <td>Persistent models are sent as a complete atomic unit soon after the player joins and before the `Class.Workspace.PersistentLoaded` event fires. Persistent models and their descendants are never streamed out.</td>
    </tr>
	<tr>
      <td>[PersistentPerPlayer](#persistentperplayer)</td>
      <td>Behaves as a persistent model for players that have been added using `Class.Model:AddPersistentPlayer()`. For other players, behavior is the same as [Atomic](#atomic). You can revert a model from player persistence via `Class.Model:RemovePersistentPlayer()`.</td>
    </tr>
  </tbody>
</table>

<Alert severity="warning">
Persistent models are intended for very rare circumstances, such as when a small number of parts must always be present on clients for `Class.LocalScript` use. If possible, server-side `Class.Script|Scripts` should be used, or `Class.LocalScript|LocalScripts` should be tolerant of parts streaming in and out. Persistent models are **not** intended to circumvent streaming, and overuse may negatively impact performance.

Avoid creating catch-all persitent models that have a large number of sub-models. For example, if you're creating an experience with a large number of vehicles, don't create a single persistent model which contains every vehicle in the experience that you want to be persistent. Instead, set each individual vehicle model to be persistent, if necessary.
</Alert>

### Default / Nonatomic

When a `Class.Model` is set to **Default** or **Nonatomic**, its child `Class.Script` instance will exist when the experience loads, but its child `Class.MeshPart` and `Class.Part` will **not** exist. This results in more instances that must be sent during loading, more instances stored in memory, and additional complexity for scripts that want to access the contents of the model. For example, a separate `Class.LocalScript` will need to use `Class.Instance:WaitForChild()|WaitForChild()` on the descendant `Class.MeshPart` and `Class.Part`.

<br />
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-A.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when the experience loads</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-B.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when eligible for streaming in</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-D.png" width="22" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Instance sent along with its parent</figcaption></p></Grid>
</Grid>

<img src="../assets/optimization/content-streaming/Chart-ModelStreamingMode-Nonatomic.png" width="800" alt="Diagram showing the Workspace with a nonatomic model"/>

```lua title='LocalScript' highlight='2, 5-6'
-- Default/Nonatomic model exists at load time and is immediately accessible
local model = workspace.Model

-- Descendant parts do not exist at load time; use WaitForChild()
local meshPart = model:WaitForChild("MeshPart")
local part = model:WaitForChild("Part")
```

### Atomic

If a `Class.Model` is changed to **Atomic**, all of its descendants are streamed in together when a descendant `Class.BasePart` is eligible. As a result, a separate `Class.LocalScript` will need to use `Class.Instance:WaitForChild()|WaitForChild()` on the **model**, but not on its descendant `Class.MeshPart` or `Class.Part`.

<br />
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-A.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when the experience loads</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-B.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when eligible for streaming in</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-D.png" width="22" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Instance sent along with its parent</figcaption></p></Grid>
</Grid>

<img src="../assets/optimization/content-streaming/Chart-ModelStreamingMode-Atomic.png" width="800" alt="Diagram showing the Workspace with an atomic model"/>

```lua title='LocalScript' highlight='2, 5-6'
-- Atomic model does not exist at load time; use WaitForChild()
local model = workspace:WaitForChild("Model")

-- Descendant parts stream in with model and are immediately accessible
local meshPart = model.MeshPart
local part = model.Part
```

### Persistent

**Persistent** models are not subject to normal streaming in or out. They are sent as a complete atomic unit soon after the player joins and before the `Class.Workspace.PersistentLoaded` event fires. Persistent models and their descendants are never streamed out, but to safely handle streaming in within a separate `Class.LocalScript`, you should use `Class.Instance:WaitForChild()|WaitForChild()` on the parent model, or wait for the `Class.Workspace.PersistentLoaded|PersistentLoaded` event to fire.

<br />
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-A.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when the experience loads</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-B.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client when eligible for streaming in</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-C.png" width="22" style={{marginBottom:"5px;"}} /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p style={{marginBottom:"0px;"}}><figcaption>Instance sent to client soon after player joins, exempt from streaming out</figcaption></p></Grid>
</Grid>
<Grid container spacing={1} alignItems="flex-start">
	<Grid item><img src="../assets/optimization/content-streaming/Chart-Symbol-D.png" width="22" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Instance sent along with its parent</figcaption></p></Grid>
</Grid>

<img src="../assets/optimization/content-streaming/Chart-ModelStreamingMode-Persistent.png" width="800" alt="Diagram showing the Workspace with a persistent model"/>

```lua title='LocalScript' highlight='2, 5-6'
-- Persistent model does not exist at load time; use WaitForChild()
local model = workspace:WaitForChild("Model")

-- Descendant parts stream in with model and are immediately accessible
local meshPart = model.MeshPart
local part = model.Part
```

### PersistentPerPlayer

Models set to **PersistentPerPlayer** behave the same as **Persistent** for players that have been added using `Class.Model:AddPersistentPlayer()`. For other players, behavior is the same as [Atomic](#atomic). You can revert a model from player persistence via `Class.Model:RemovePersistentPlayer()`.

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

1. Using a tool such as the **Tag Editor**, accessible from Studio's [View](../studio/view-tab.md) tab, assign a logical `Class.CollectionService` tag to all of the affected objects.

2. From a single `Class.LocalScript`, detect when a tagged object streams in or out through `Class.CollectionService:GetInstanceAddedSignal()|GetInstanceAddedSignal()` and `Class.CollectionService:GetInstanceRemovedSignal()|GetInstanceRemovedSignal()`, then handle the object accordingly. For example, the following code adds tagged `Class.Light` objects into a "flicker" loop when they stream in and removes them when they stream out.

   ```lua title='LocalScript - CollectionService Streaming Detection' highlight='10-15'
   local CollectionService = game:GetService("CollectionService")

   local tagName = "FlickerLightSource"
   local random = Random.new(os.clock())
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
   end)
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
