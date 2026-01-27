---
title: Tag reference
description: A list of tags for the MicroProfiler.
---

The following is a list of common tags in the [MicroProfiler](./index.md), grouped by category. Tags are also interchangeably called tasks, timers, scopes, processes, and labels. Whatever the name, they represent a unit of work.

Understanding these tags can help you identify problematic code in your experience. The tables contain tag label, descriptions, and advice for improving performance and optimizing your experience.

## Sleep

When threads aren't actively performing tasks, they enter a sleep state, with tags to indicate how long the thread was sleeping. At any given time, it's extremely common for most worker threads to be in a sleep state.

## Navigation

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>rasterizeTile</td>
    <td>Updates navigation tiles needed for a pathfinding request, usually followed by **computePath** which requires those tiles be up-to-date. Follows **NavigationJob/preprocess** on the main thread.</td>
    <td>Reduce the number of pathfinding tile invalidations, as this causes those paths to need recomputing. This is caused by non-navigable parts moving.</td>
  </tr>
  <tr>
    <td>computePath</td>
    <td>
    Calculates paths, typically after **rasterizeTile**.
    </td>
    <td>Reduce the number and world extents of `Class.Path:ComputeAsync()` calls. Try reusing paths for multiple agents if they are expected to start/end from approximately similar locations.</td>
  </tr>
  <tr>
    <td>preprocess/getPrimitivesOverlapping</td>
    <td>Collects the world geometry for each pathfinding tile and schedules the rasterization tasks to be executed by the pathfinding thread.</td>
    <td>Reduce the part count.</td>
  </tr>
</tbody>
</table>

## Animation and humanoids

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Simulation/gameStepped</td>
    <td>Processing of experience-specific objects such as `Class.Humanoid|Humanoids`, `Class.Animation|Animations` and heartbeat callbacks.</td>
    <td>See **gameStepped** labels below.</td>
  </tr>
  <tr>
    <td>Simulation/gameStepped/stepHumanoid</td>
    <td>`Class.Humanoid` state changes and movement.</td>
    <td>Reduce the amount of `Class.Humanoid|Humanoids` or humanoids with `Class.Humanoid.EvaluateStateMachine` enabled. Disable `Class.Humanoid` states on NPCs that don't need them, such as `Enum.HumanoidStateType|Climbing` or `Enum.HumanoidStateType|Swimming`. Reduce callbacks to `Class.Humanoid.StateChanged` or state changes such as `Class.Humanoid.Running|Running` or `Class.Humanoid.Died|Died`.</td>
  </tr>
  <tr>
    <td>Simulation/gameStepped/stepAnimation</td>
    <td>`Class.Animator|Animators` will step forward in currently playing animations.</td>
    <td>Reduce the amount of `Class.Animator|Animators` or animated joints to lower the workload of this step. Reduce number of callbacks to animation events such as `Class.AnimationTrack.KeyframeReached` or `Class.AnimationTrack.Ended`</td>
  </tr>
  <tr>
    <td>Simulation/gameStepped/RunService.Stepped</td>
    <td>Runs functions connected to the `Class.RunService.Stepped` event.</td>
    <td>Reduce the amount or workload of functions connected to this event. Consider delaying or replacing expensive calculations or spreading computation across multiple frames.</td>
  </tr>
</tbody>
</table>

## Audio

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Sound</td>
    <td>Processes acoustic simulation and updates sounds in active playback.</td>
    <td>See **Sound** labels below.</td>
  </tr>
  <tr>
    <td>Sound/stepInstances</td>
    <td>Updates the volume of active sounds in the workspace.</td>
    <td>Reduce the amount of sounds in active playback.</td>
  </tr>
</tbody>
</table>

## Networking

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Net PacketReceive</td>
    <td>Receives network packets. If many objects or events are being replicated, this step takes longer. </td>
    <td>Replicate fewer objects or events.</td>
  </tr>
  <tr>
    <td>Replicator/ProcessPackets</td>
    <td>Processes contents of network packets, such as motion, event invocations and property changes. </td>
    <td>Reduce the number or size of objects being replicated, or do this in incremental steps. May increase if map size increases, as larger maps tend to have more overall activity.</td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders/Dispatch Physics Senders and TouchSenders</td>
    <td>Sends data about activity in the experience.</td>
    <td>Reduce the amount of moving objects and/or touches. See following sections.</td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders/Dispatch StreamJob</td>
    <td>Sends corresponding specific regions to specific clients in the streaming feature.</td>
    <td>Reduce the minimum and target streaming radii.</td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders/Dispatch Data Senders</td>
    <td>Sends property changes, remote event invocations, `Class.Humanoid` state changes, animation state changes, and replication of new instances.</td>
    <td>Reduce the number of replicated changes to the data model.</td>
  </tr>
  <tr>
    <td>Replicator SendCluster</td>
    <td>Sends [Terrain](../../parts/terrain.md) data to clients.</td>
    <td>Reduce the amount or size of terrain changes.</td>
  </tr>
  <tr>
    <td>ModelCompleteness Mega Job</td>
    <td>Server only: completeness is an internal concept. When models are completely sent, model completeness events are sent.</td>
    <td>Add or remove fewer instances.</td>
  </tr>
  <tr>
    <td>deserializePacket</td>
    <td>Low-level network packet processing. Prepares for **Replicator/ProcessPackets**.</td>
    <td>Send fewer or smaller updates.</td>
  </tr>
</tbody>
</table>

## Rendering

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Prepare</td>
    <td>Information is gathered from the main thread and updates various data structures used for rendering.</td>
    <td>See **Prepare** labels below.</td>
  </tr>
  <tr>
    <td>Prepare/Pass3dAdorn</td>
    <td>Handles rendering of various object adorns, such as text labels above objects. For `Class.Humanoid` labels with occlusion, this step includes raycasting to determine if such objects are visible. This includes non-transparent parts to facilitate debug visualizations.</td>
    <td>Reduce the number of visible adorned objects, such as `Class.BillboardGui|BillboardGuis`, `Class.Humanoid` name/health labels, etc. Reduce the number of visible parts.</td>
  </tr>
  <tr>
    <td>Prepare/Pass2d</td>
    <td>Readies 2D UI rendering (both player and Roblox UI).</td>
    <td>Reduce the amount or complexity of UI elements.</td>
  </tr>
  <tr>
    <td>Prepare/UpdatePrepare/updateInvalidParts</td>
    <td>Updates parts that had some property changed or added.</td>
    <td>Reduce the amount of properties changes on the world. If a script updates a large set of object properties, break it down across frames.</td>
  </tr>
  <tr>
    <td>Prepare/UpdatePrepare/updateInvalidatedFastClusters</td>
    <td>Prepares "FastCluster" geometries used to render `Class.Humanoid|Humanoids` and [skinned](../../art/modeling/rigging.md) `Class.MeshPart|MeshParts`. Labels specify the number of parts, vertices, and size of vertices.</td>
    <td>Reduce visual changes to models with `Class.Humanoid|Humanoids` or skinned `Class.MeshPart|MeshParts`.</td>
  </tr>
  <tr>
    <td>Prepare/UpdatePrepare/updateDynamicParts</td>
    <td>Prepares `Class.Beam|Beams`, `Class.ParticleEmitter|ParticleEmitters`, and `Class.Humanoid|Humanoids` for rendering.</td>
    <td>Reduce the number of visible `Class.Beam|Beams`, `Class.ParticleEmitter|ParticleEmitters`, and `Class.Humanoid|Humanoids`.</td>
  </tr>
  <tr>
    <td>Prepare/UpdatePrepare/updateInstancedClusters</td>
    <td>Updates geometry that uses instanced rendering such as parts. Labels **Clusters** and **Instances** indicate the number updated.</td>
    <td>Reduce work that implicitly updates the bounding box of the part, such as `Class.BasePart.CFrame`, `Class.BasePart.Size`, or `Class.Motor6D.Transform`. Creative property updates such as `Class.Bone.Transform` can help.</td>
  </tr>
  <tr>
    <td>Perform</td>
    <td>When actual rendering commands are created and issued.</td>
    <td>See **Perform** labels below.</td>
  </tr>
  <tr>
    <td>Perform/fillGuiVertices</td>
    <td>Fills buffers with UI vertices to prepare for rendering. **gui count** label indicates the amount of `Class.LayerCollector|LayerCollectors` visible in the frame.</td>
    <td>If the cost is high, reduce the amount, density, and space taken by UI elements. If there are too many **Process GuiEffect** labels, consider reducing the use of `Class.UIGradient` and `Class.UICorner` on text labels.</td>
  </tr>
  <tr>
    <td>Perform/Scene/queryFrustumOrdered</td>
    <td>Applies frustum culling so that objects not visible are not rendered.</td>
    <td>If there is a high cost that means there are a lot of elements. Perhaps use some larger meshes where a single mesh has more details as opposed to many small individual pieces.</td>
  </tr>
  <tr>
    <td>Perform/Scene/computeLightingPerform</td>
    <td>Computation of lighting near the camera.</td>
    <td>Manipulate the number of light sources or move the camera less to reduce the time it takes to recalculate lighting.</td>
  </tr>
  <tr>
    <td>Perform/Scene/computeLightingPerform/LightGridCPU</td>
    <td>Updates the voxel lighting, which is used at lower quality levels.</td>
    <td>If updating chunk occupancy takes too long, consider using lower resolution geometry, reducing the number of parts, or anchoring parts. If the other labels take too long, consider reducing the number of lights and using non-shadow casting geometry for objects that move and invalidate the occupancy.</td>
  </tr>
  <tr>
    <td>Perform/Scene/computeLightingPerform/ShadowMapSystem</td>
    <td>Updates shadow maps. Not performed at quality levels below 4.</td>
    <td>Reduce the number of lights. You can also use `Class.Light.Shadows` and `Class.BasePart.CastShadow` to disable shadow casting on less important instances. See [Improve performance](../../performance-optimization/improve.md#mitigation-4).</td>
  </tr>
  <tr>
  </tr>
  <tr>
    <td>Perform/Scene/Glow, ColorCorrection, MSAA, SSAO, and SSAOApply</td>
    <td>Post-processing rendering.</td>
    <td>Reduce the number of post-processing effects. Usually this is not significant.</td>
  </tr>
  <tr>
    <td>Perform/Scene/UI</td>
    <td>UI rendering. In **Id_Screen**, there is a label with the number of batches, materials and triangles used.</td>
    <td>Reduce the number of visible UI elements. Using `Class.CanvasGroup|CanvasGroups` can help at the expense of increased memory use.</td>
  </tr>
  <tr>
    <td>Perform/Scene/UpdateView/updateParticles, updateParticleBoundings</td>
    <td>Update particle position and bounds.</td>
    <td>Reduce the number of `Class.ParticleEmitter|ParticleEmitters`, emission rates, lifetimes, etc. Limit the movement of emitters.</td>
  </tr>
  <tr>
    <td>Scene/Id_Opaque, RenderView/Id_Opaque</td>
    <td>Parts in the scene with an overall transparency of `0.01` or lower.</td>
    <td>Reduce the use and density of parts.</td>
  </tr>
  <tr>
    <td>Scene/Id_Transparent, RenderView/Id_Transparent</td>
    <td>Parts in the scene with an overall transparency between `0.01` and `1`.</td>
    <td>Reduce the use of partial transparency.</td>
  </tr>
  <tr>
    <td>Scene/Id_Decals, RenderView/Id_Decals</td>
    <td>Decals in the scene.</td>
    <td>Reduce the use of decals on complex meshes.</td>
  </tr>
  <tr>
    <td>Scene/Shadows</td>
    <td>Shadow recalculation in the scene, usually performed on dynamic scenes and typical gameplay. Parts regardless of transparency cast shadows under the assumption that they contain decals. Not performed at quality levels below 4.</td>
    <td>If this step takes too long, consider disabling `Class.BasePart.CastShadow` for complex meshes, parts with high partial transparency, and less important instances. Fully transparent parts that don't have decals or need decal shadows should have `Class.BasePart.CastShadow` disabled. See [Improve performance](../../performance-optimization/improve.md#mitigation-4).</td>
  </tr>
  <tr>
    <td>Perform/Present</td>
    <td>Forwards to the GPU thread to perform rendering commands.</td>
    <td>Reduce scene complexity in general. If this step is taking a long time, you might be limited by the GPU.</td>
  </tr>
  <tr>
    <td>Perform/Present/waitUntilCompleted</td>
    <td>Waits for the GPU to finish rendering the previous frame.</td>
    <td>If this is generally happening a lot then the amount of things rendered is too high. The Frame Rate Manager helps with balancing this, but if it remains high, try following performance advice from the individual **Scene** tags.</td>
  </tr>
  <tr>
    <td>LoadImage</td>
    <td>Processes images into a format the engine can use.</td>
    <td>Reduce the use of large images.</td>
  </tr>
</tbody>
</table>

## Scripts

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Render/PreRender/fireBindToRenderSteppedCallbacks</td>
    <td>Running functions bound to render step via `Class.RunService:BindToRenderStep()`.</td>
    <td>Ensure functions connected to this event do as little work as possible.</td>
  </tr>
  <tr>
    <td>Render/PreRender/RunService.RenderStepped</td>
    <td>Runs functions connected to the `Class.RunService.RenderStepped` event.</td>
    <td>Ensure functions connected to this event do as little work as possible.</td>
  </tr>
  <tr>
    <td>WaitingHybridScriptJob</td>
    <td>Resumes scripts waiting using `Class.Instance:WaitForChild()` or `Globals.Roblox.wait()`. Usually performed 30 times per second. This step has an execution time budget to run waiting scripts.</td>
    <td>If you have too many waiting scripts or scripts with a long runtime before yielding, this step is throttled and waits longer before it can run again. Reduce the amount of bound functions or long computations in this step.</td>
  </tr>
  <tr>
    <td>GC</td>
    <td>Luau's garbage collection cycle.</td>
    <td>Pool tables and other collectable objects or try to reduce creating temporary tables.</td>
  </tr>
  <tr>
    <td>Heartbeat/RunService.Heartbeat</td>
    <td>Runs functions connected to the `Class.RunService.Heartbeat` event.</td>
    <td>Reduce the amount or workload of functions connected to this event. Consider delaying or replacing expensive calculations or spreading computation across multiple frames.</td>
  </tr>
</tbody>
</table>

## Simulation

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Distributed Physics Ownership</td>
    <td>Determines whether the server or a client has authority over certain instances such as parts.</td>
    <td>Reduce the amount of parts that frequently switch network ownership, especially those with common interaction.</td>
  </tr>
  <tr>
    <td>Simulation/assemble</td>
    <td>Updates a tree of connected objects (assemblies) used by the physics engine.</td>
    <td>Reduce the amount of joints being created or destroyed.</td>
  </tr>
  <tr>
    <td>Simulation/physicsSteppedTotal/physicsStepped</td>
    <td>Runs the physics simulation.</td>
    <td>Reduce the amount and complexity of physically simulated bodies.</td>
  </tr>
  <tr>
    <td>Simulation/physicsSteppedTotal/physicsStepped/SpatialFilter/filterStep</td>
    <td>Updates simulation islands, arranging parts according to network ownership, local simulation. Islands are non-interacting groups of parts which can be simulated independently.</td>
    <td>Avoid setting network ownership frequently. Keep groups of parts far enough away from each other so they can be simulated separately.</td>
  </tr>
  <tr>
    <td>Simulation/physicsSteppedTotal/physicsStepped/worldStep/stepContacts</td>
    <td>Updates contacts between objects.</td>
    <td>Reduce the amount of bodies colliding at once, or use simpler collision boxes. Cubes are better than complex meshes.</td>
  </tr>
  <tr>
    <td>Simulation/physicsSteppedTotal/physicsStepped/worldStep/stepWorld **OR** stepWorldThrottled</td>
    <td>Solves physics equations relating to connectors, buoyancy and `Class.Humanoid|Humanoids`. When the engine is overloaded and unable to simulate everything in real time, some steps may be throttled (**stepWorldThrottled**) and only "real-time assemblies" such as `Class.Humanoid|Humanoids` are simulated.</td>
    <td>Depends on where the time is going based on the following three phases: **stepContacts**: narrow phase collision detection geometry tests. **Solver step**: integrate time and resolve collisions and other constraints **updateBroadphase**: update positions of assemblies in collision detection system and find possibly colliding narrow phase pairs.</td>
  </tr>
  <tr>
    <td>notifyMovingAssemblies</td>
    <td>Helps track how long primitives have been sleeping.</td>
    <td></td>
  </tr>
  <tr>
    <td>Simulation/physicsSteppedTotal/physicsStepped/interpolateNetworkedAssemblies</td>
    <td>Interpolates assemblies not controlled by the current player.</td>
    <td>Set the network owner of parts to the current player to reduce this; although this will usually cause more physics work to be done elsewhere.</td>
  </tr>
  <tr>
    <td>Simulation/handleFallenParts</td>
    <td>Removes parts that have fallen below `Class.Workspace.FallenPartsDestroyHeight`.</td>
    <td>Lower the destroy height or reduce the amount of parts that fall to the destroy height.</td>
  </tr>
  <tr>
    <td>Heartbeat/heartbeatInternal/workspaceOnHeartbeat/updateVisuallySleeping</td>
    <td>Second part of **notifyMovingAssemblies**.</td>
    <td></td>
  </tr>
  <tr>
    <td>Heartbeat/RunService.Heartbeat</td>
    <td>Runs functions connected to the `Class.RunService.Heartbeat` event to simulation and scripts contacts. Current description is generic enough to be not wrong.</td>
    <td>Reduce the amount or workload of functions connected to `Class.RunService.Heartbeat`.</td>
  </tr>
  <tr>
    <td>worldStep/stepContacts</td>
    <td>Helps physics simulation step many contacts at once.</td>
    <td>Reduce the number of colliding objects.</td>
  </tr>
  <tr>
    <td>SolveBatch</td>
    <td>Helps the physics simulation solve batches of objects' motion.</td>
    <td></td>
  </tr>
</tbody>
</table>

## UI

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Render/PreRender/UpdateInput</td>
    <td>Updates and fires all user input related events if the user has performed input since the last frame.</td>
    <td>Try and not do too much work directly as you get the input. Consider doing a minimal amount of processing for the input, and larger computations should be pushed off to another thread that happens later.</td>
  </tr>
  <tr>
    <td>Render/PreRender/TweenService</td>
    <td>Updates objects being tweened using `Class.TweenService` and calls completion callbacks, such as those used provided to `Class.GuiObject:TweenSize()` or `Class.GuiObject:TweenPosition()`.</td>
    <td>Reduce the number of objects being tweened using `Class.TweenService` and ensure callbacks do as little work as possible.</td>
  </tr>
  <tr>
    <td>Heartbeat/TweenService</td>
    <td>In the server, `Class.TweenService` runs in `Class.RunService.Heartbeat` instead of `Class.RunService.PreRender`.</td>
    <td>Reduce the number of objects being tweened using `Class.TweenService` and ensure callbacks do as little work as possible.</td>
  </tr>
  <tr>
    <td>Render/PreRender/UpdateUILayouts</td>
    <td>Updates position and size for UI elements on all enabled `Class.LayerCollector|LayerCollectors`.</td>
    <td>See **UpdateUILayouts** labels below.</td>
  </tr>
  <tr>
    <td>Render/PreRender/UpdateUILayouts/Rebuild Z-order list</td>
    <td>Sorts the Z-order of UI elements (internal term not to be confused with `Class.GuiObject.ZIndex`) to prevent tearing of UI elements.</td>
    <td>Reduce the amount of UI elements with the same `Class.GuiObject.ZIndex`.</td>
  </tr>
  <tr>
    <td>Render/PreRender/UpdateUILayouts/Layout</td>
    <td>
      Updates position and size for UI elements in an individual `Class.LayerCollector`. Can contain a label with information about the relevant UI, along with the amount of Relayouts, Updates and Resizes.
    </td>
    <td>Reduce the amount of UI elements being resized or repositioned, such as those managed by `Class.UILayout` and those tweened with `Class.TweenService`, `Class.GuiObject:TweenSize()`, or `Class.GuiObject:TweenPosition()`. Consider using fixed sizes for `Class.BillboardGui|BillboardGuis`.</td>
  </tr>
</tbody>
</table>
