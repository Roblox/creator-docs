---
title: Instance streaming
description: Instance streaming allows the Roblox engine to dynamically load and unload 3D content in regions of the world.
---

In-experience **instance streaming** allows the Roblox engine to dynamically load and unload 3D content and related instances in the `Class.Workspace`. This can improve the overall player experience in several ways, including:

- <Chip label="Faster Join Times" size="small" variant="outlined" color="success" /> — Players can start playing in one part of the world while more of the world loads in the background.
- <Chip label="Memory Efficiency" size="small" variant="outlined" color="success" /> — Experiences can be played on devices with less memory since content is dynamically streamed in and out. More immersive and detailed worlds can be played on a wider range of devices.
- <Chip label="Improved Performance" size="small" variant="outlined" color="success" /> — Better frame rates and performance, as the server can spend less time and bandwidth synchronizing changes between the world and players in it. Clients spend less time updating instances that aren't currently relevant to the player.
- <Chip label="Level of Detail" size="small" variant="outlined" color="success" /> — Distant models (if configured to use [model level‑of‑detail](./techniques.md#set-model-level-of-detail)) and terrain remain visible even when they're not streamed to clients, keeping the experience optimized without entirely sacrificing background visuals.

Instance streaming is controlled through the `Class.Workspace.StreamingEnabled` property, enabled by default for new places created in Studio. This property cannot be set in a script.

<img src="../../assets/studio/properties/Workspace-StreamingEnabled.png" width="320" alt="The Properties window with the StreamingEnabled property enabled." />

<Alert severity="success">
Once you review this technical guide, it's recommended that you review the [streaming techniques](./techniques.md) guide on how to use streaming efficiently and effectively.
</Alert>

## Technical behavior

### Stream in

When a player joins an experience with instance streaming enabled, instances in the `Class.Workspace` are replicated to the client, <u>**excluding**</u> the following:

- `Class.BasePart|BaseParts` (`Class.Part|Parts` and `Class.MeshPart|MeshParts`)
- `Class.Model|Models` set to [Atomic](#atomic), [Persistent](#persistent), or [PersistentPerPlayer](#persistentperplayer); see [per‑model streaming controls](#model-streaming-controls)
- Models set to [Nonatomic](#nonatomic) (default) when `Class.Workspace.ModelStreamingBehavior` is set to `Enum.ModelStreamingBehavior.Improved|Improved`
- Descendants of the above instances

Then, during gameplay, the server may stream the above instances to the client, as they are needed.

### Stream out

During gameplay, a client may remove regions of `Class.BasePart|BaseParts` from the player's `Class.Workspace` based on the behavior set by `Class.Workspace.StreamOutBehavior`. The process begins with regions furthest away from the [replication foci](#replication-focus) and moves in closer, as needed. Regions inside the `Class.Workspace.StreamingMinRadius` range never stream out.

Note that a `Class.Model` with no `Class.BasePart` descendants, such as one used merely as a "container" for non‑`Class.BasePart` instances like scripts, is **exempt** from streaming out **unless** it is made a descendant of a `Class.BasePart`.

<Alert severity="info">
Instances which are **created** or **cloned** by client-side scripts are exempted from streaming out unless they are parented under a server‑created instance.
</Alert>

<Alert severity="warning">
When an instance streams out, it is parented to `nil` so that any existing Luau state will reconnect if the instance streams back in. As a result, removal signals such as `Class.Instance.ChildRemoved|ChildRemoved` or `Class.Instance.DescendantRemoving|DescendantRemoving` fire on its **parent** or **ancestor**, but the instance itself is not destroyed in the same sense as an `Class.Instance:Destroy()` call.
</Alert>

### Assemblies

Physical [assemblies](../../physics/assemblies.md) stream **in** as complete units, including their associated `Class.Constraint|Constraints` and `Class.Attachment|Attachments`, helping to ensure consistent physics updates on clients. The only exception is when the assembly is [anchored](../../physics/assemblies.md#anchoring-behavior), in which case only the `Class.BasePart|BaseParts` within the streaming radius are streamed in alongside their associated `Class.Constraint|Constraints` and `Class.Attachment|Attachments`.

Assemblies do not stream **out** until all of their `Class.BasePart|BaseParts` are eligible to stream out.

<Alert severity="warning">
Avoid creating moving assemblies with unnecessarily large numbers of instances, as all of the instances streaming in unison may cause network/CPU spikes.
</Alert>

## Streaming properties

The following properties control how instance streaming applies to your experience. All of these properties are **non-scriptable** and must be set on the `Class.Workspace` object in Studio.

<img src="../../assets/studio/properties/Workspace-Streaming.png" width="320" />

<table>
<thead>
<tr>
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>`Class.Workspace.StreamingMinRadius|StreamingMinRadius`</td>
<td>This property indicates the radius around the [replication foci](#replication-focus) in which instances stream in at the highest priority. Care should be taken when increasing the default, as doing so will require more memory and more server bandwidth at the expense of other components.</td>
</tr>
<tr>
<td>`Class.Workspace.StreamingTargetRadius|StreamingTargetRadius`</td>
<td>This property controls the maximum distance away from the [replication foci](#replication-focus) in which instances stream in. Note that the engine is allowed to retain previously loaded instances beyond the target radius, memory permitting.<br /><br />A smaller `Class.Workspace.StreamingTargetRadius|StreamingTargetRadius` reduces server workload, as the server will not stream in additional instances beyond the set value. However, the target radius is also the maximum distance players will be able to see the full detail of your experience, so you should pick a value that creates a nice balance between these.</td>
</tr>
<tr>
<td>`Class.Workspace.StreamOutBehavior|StreamOutBehavior`</td>
<td>This property sets the [streaming out](#stream-out) behavior according to the value of `Enum.StreamOutBehavior`. If set to `Enum.StreamOutBehavior.LowMemory|LowMemory` (default), the client only streams out regions beyond the minimum radius in a low memory situation. If set to `Enum.StreamOutBehavior.Opportunistic|Opportunistic`, regions beyond `Class.Workspace.StreamingTargetRadius|StreamingTargetRadius` can be removed on the client even when there is no memory pressure (in this mode, the client never removes instances that are within the target radius, except in low memory situations).</td>
</tr>
<tr>
<td>`Class.Workspace.StreamingIntegrityMode|StreamingIntegrityMode`</td>
<td>The experience may behave in unintended ways if a player moves into a region of the world that hasn't been streamed to them. This property offers a way to avoid those potentially problematic situations.</td>
</tr>
<tr>
<td>`Class.Workspace.ModelStreamingBehavior|ModelStreamingBehavior`</td>
<td>Controls how [Nonatomic](#nonatomic) (default) models stream in and out.</td>
</tr>
</tbody>
</table>

<Alert severity="warning">
`Class.Workspace.StreamingTargetRadius|StreamingTargetRadius` should be larger than `Class.Workspace.StreamingMinRadius|StreamingMinRadius`. 3D content between the target radius and the minimum radius acts as a buffer in case the client temporarily stops receiving new content from the server. If the minimum radius and the target radius are equal, there is no buffer, which can lead to an increase in network pauses or an otherwise suboptimal user experience.
</Alert>

## Replication focus

By default, streaming occurs around the local player's character's `Class.Model.PrimaryPart|PrimaryPart`, although you can specify a different replication focus point through `Class.Player.ReplicationFocus`.

You can also add and remove additional replication foci through `Class.Player:AddReplicationFocus()` and `Class.Player:RemoveReplicationFocus()` to dynamically enable streaming in multiple areas of the experience.

<Alert severity="warning">
Use caution when adding additional replication foci as each additional focus increases the server's workload for streaming and updating regions. For example, a single player with nine dynamically moving foci could generate server networking and streaming processing comparable to ten players moving around the experience.

On the client, too many foci for a player can limit the engine's ability to adjust to memory limitations and make it more likely for clients to be killed by the OS for using too much memory.
</Alert>

<Tabs>
<TabItem label="Physics Simulation">
Client-side physics simulation only occurs in streamed areas, even for locally created instances and for `Enum.ModelStreamingMode.Persistent|Persistent` instances. If you have instances that you'd like to keep simulating even when they're far away from the character, create an additional replication focus near those instances.
</TabItem>
<TabItem label="Movement Between Zones">
In many experiences, players frequently move back and forth between the same areas frequently, for example between their "home&nbsp;base" and a "trading&nbsp;hub." In such cases, you can create a replication focus point in each area to ensure those areas are readily present on client devices.
</TabItem>
<TabItem label="Distant Viewpoints">
Multiple replication points are useful when players can view specific, important regions through a scope, such as enemy bases scattered across a barren landscape. In such cases, you can create a replication focus point in each base to ensure players see details and simulated physics from afar.
</TabItem>
</Tabs>

## Model streaming controls

To avoid issues with streaming on a per-model basis and minimize use of `Class.Instance:WaitForChild()|WaitForChild()`, you can customize how `Class.Model|Models` and their descendants stream through their `Class.Model.ModelStreamingMode|ModelStreamingMode` property.

### Nonatomic

By default, models are `Enum.ModelStreamingMode.Nonatomic|Nonatomic` and they stream in/out based on whether `Class.Workspace.ModelStreamingBehavior` is set to `Enum.ModelStreamingBehavior.Legacy|Legacy` (default) or `Enum.ModelStreamingBehavior.Improved|Improved`.

<h6>Legacy</h6>

When `Class.Workspace.ModelStreamingBehavior` is set to `Enum.ModelStreamingBehavior.Legacy|Legacy` (default), the `Class.Model` container and its **non**‑`Class.BasePart` descendants such as `Class.Script|Scripts` replicate to the client when the player joins. Then, when eligible, the model's `Class.BasePart` descendants stream in.

<img src="../../assets/optimization/streaming/Model-Stream-In-Default.png" width="600" />

<h6>Improved</h6>

When `Class.Workspace.ModelStreamingBehavior` is set to `Enum.ModelStreamingBehavior.Improved|Improved`, model streaming behavior varies by whether the model contains `Class.BasePart` descendants or does **not** contain `Class.BasePart` descendants:

- A model with `Class.BasePart` descendants streams **in** only when **one** of its `Class.BasePart` descendants is eligible to stream in. At that point, the model and the eligible `Class.BasePart` streams in, along with the model's **non**‑`Class.BasePart` descendants.

  When the very last remaining `Class.BasePart` of the model streams **out**, the model itself will stream out along with it.

  <img src="../../assets/optimization/streaming/Model-Stream-In-Improved-Spatial.png" width="600" />

- A model with no `Class.BasePart` descendants, such as one used merely as a "container" for non‑`Class.BasePart` instances like scripts, replicates to the client soon after the player joins. This type of model is **exempt** from streaming out **unless** it is made a descendant of a `Class.BasePart`.

  <img src="../../assets/optimization/streaming/Model-Stream-In-Improved-Non-Spatial.png" width="600" />

### Atomic

If a `Class.Model` is set to `Enum.ModelStreamingMode.Atomic|Atomic`, all of its initial descendants are streamed in together when a descendant `Class.BasePart` is eligible to be streamed in. As a result, a client‑side script that needs to access instances **inside** the model would need to use `Class.Instance:WaitForChild()|WaitForChild()` on the model itself, but not on a descendant `Class.MeshPart` or `Class.Part` since they are sent alongside the model.

An atomic model is only streamed out when all of its descendant parts are eligible for streaming out, at which point the entire model streams out together.

<img src="../../assets/optimization/streaming/Model-Streaming-Mode-Atomic.png" width="600" alt="A diagram showing Atomic model streaming along with children." />

### Persistent

`Enum.ModelStreamingMode.Persistent|Persistent` models are not subject to normal streaming in or out. They are sent as a complete atomic unit soon after the player joins and before the `Class.Workspace.PersistentLoaded` event fires. Persistent models and their descendants are never streamed out, but to safely handle streaming in within a client‑side script, you should wait for the `Class.Workspace.PersistentLoaded|PersistentLoaded` event to fire.

<img src="../../assets/optimization/streaming/Model-Streaming-Mode-Persistent.png" width="600" alt="A diagram showing Persistent model streaming along with children." />

<Alert severity="warning">
Persistent models are intended for very rare circumstances, such as when a small number of parts must always be present on clients for client‑side scripts to access. If possible, server-side `Class.Script|Scripts` should be used, or client scripts should be tolerant of parts streaming in and out. Persistent models are **not** intended to circumvent streaming, and overuse may negatively impact performance.
</Alert>

### PersistentPerPlayer

Models set to `Enum.ModelStreamingMode.PersistentPerPlayer|PersistentPerPlayer` behave the same as `Enum.ModelStreamingMode.Persistent|Persistent` for players that have been added using `Class.Model:AddPersistentPlayer()`. For other players, behavior is the same as `Enum.ModelStreamingMode.Atomic|Atomic`. You can revert a model from player persistence via `Class.Model:RemovePersistentPlayer()`.
