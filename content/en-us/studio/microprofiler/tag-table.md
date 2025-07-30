---
title: Tag reference
description: A list of tags for the MicroProfiler.
---

The following is a list of common tags in the MicroProfiler, grouped by category. Understanding these tags can help you identify problematic code in your experience. The tables contain tag label, descriptions and performance advice for improving performance and optimizing your experience.

## Sleep

When threads aren't actively performing tasks, they enter a sleep state, with tags to indicate how long the thread was sleeping. At any given time, it's extremely common for most worker threads to be in a sleep state.

## AI/navigation

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance Advice</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>rasterizeTile</td>
    <td>Updates navigation tiles needed for a pathfinding request, usually followed by computePath which requires those tiles be up-to-date. Follows NavigationJob/preprocess on the main thread.</td>
    <td>Reduce the number of pathfinding tile invalidations, as this causes those paths to need recomputing. This is caused by non-navigable parts moving.</td>
  </tr>
  <tr>
    <td>computePath</td>
    <td>
    Calculates paths, typically after `rasterizeTile`.
    </td>
    <td>Reduce the number and world extents of `ComputePath` calls. Try reusing paths for multiple agents if they are expected to start/end from approximately similar locations.</td>
  </tr>
  <tr>
    <td>preprocess/getPrimitivesOverlapping</td>
    <td>Collects the world geometry for each pathfinding tile and schedules the rasterization tasks to be executed by the pathfinding thread.</td>
    <td>Reduce the part count.</td>
  </tr>
</tbody>
</table>

## Animation

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
    <td>Processing of game specific objects such as `Class.Humanoid|Humanoids`, `Animations` and heartbeat callbacks</td>
    <td></td>
  </tr>
  <tr>
    <td>Simulation/gameStepped/StepLegacy</td>
    <td>`Class.Humanoid` state changes and `movement.Called` stepHumanoid on server now (parallel version)</td>
    <td>Disable or reduce `Class.Humanoid` states on NPCs, if you have them. Ladder state is most important to disable. Reduce callbacks to state changes such as `Class.Humanoid.Died` or `Class.Humanoid.Running`</td>
  </tr>
  <tr>
    <td>Simulation/gameStepped/stepAnimation</td>
    <td>`Class.Animator|Animators` will step forward in currently playing animations.</td>
    <td>Reduce the amount of `Class.Animator|Animators` or animated joints to lower the workload of this step. Reduce number of callbacks to animation events such as `Class.AnimationTrack.KeyframeReached` or `Class.AnimationTrack.Ended`</td>
  </tr>
  <tr>
    <td>Simulation/gameStepped/RunService.Stepped</td>
    <td>Runs functions connected to the `Class.RunService.Stepped` event.</td>
    <td>Reduce the amount or workload of functions connected to this event. Consider delaying or replacing expensive calculations.  Consider spreading computation across multiple frames.</td>
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
    <td>Processing audio: locations, effects, volumes, etc.</td>
    <td></td>
  </tr>
  <tr>
    <td>DeveloperTag_Sounds</td>
    <td>In-Memory Sounds: generally short sounds that are small enough to go in memory. Usually brief one-shot fx, not long-form music. </td>
    <td>Use fewer short sounds.</td>
  </tr>
  <tr>
    <td>DeveloperTag_StreamingSounds</td>
    <td>stream/StreamingSounds: these are larger sounds that get streamed from disk. Generally longer-form music files. </td>
    <td>Use fewer long sounds.</td>
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
    <td>Reduce the number or size of objects being replicated, or do this in incremental steps. May increase if map size increases, as larger maps tend to have more overall activity. </td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders/Dispatch Physics Senders and TouchSenders</td>
    <td>Sends data about activity in the experience. </td>
    <td>Reduce the amount of moving objects and/or touches. See following sections.</td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders/Dispatch StreamJob</td>
    <td>Sends corresponding specific regions to specific clients in the "Streaming" feature.</td>
    <td>Reduce the minimum and target streaming radii.</td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders/Dispatch Data Senders</td>
    <td>Sends property changes, remote events, Humanoid state changes, animation start/stops. </td>
    <td>Reduce the number of replicated changes to the data model</td>
  </tr>
  <tr>
    <td>Replicator SendCluster</td>
    <td>Sends Terrain data to clients.</td>
    <td>Reduce the amount or size of Terrain changes.</td>
  </tr>
  <tr>
    <td>ModelCompleteness Mega Job</td>
    <td>Server only: completeness is an internal concept. When models are completely sent, model completeness events are sent.</td>
    <td>Add or remove fewer instances.</td>
  </tr>
  <tr>
    <td>DeserializePacket</td>
    <td>Low-level network packet processing. Prepares for Replicator ProcessPackets.</td>
    <td>Send fewer updates.</td>
  </tr>
</tbody>
</table>

## Rendering

<table>
<thead>
  <tr>
    <th>Label</th>
    <th>Description</th>
    <th>Performance notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Prepare</td>
    <td>Information is gathered from the main thread and updates various data structures used for rendering. This blocks the simulation threads, so it should be as small as possible.</td>
    <td>See Prepare labels below.</td>
  </tr>
  <tr>
    <td>Prepare/Pass3dAdorn</td>
    <td>Rendering various object adorns, such as text labels above objects. This step may include raycasting to determine if such objects are visible.</td>
    <td>Reduce the number of visible adorned objects, such as `Class.BillboardGui|BillboardGuis`, `Class.Humanoid` name/health labels, etc.</td>
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
    <td>Prepares geometry, typically "FastClusters" used to render `Class.Humanoid|Humanoids`. Sub-markers specify the number of parts, vertices, and size of vertices.</td>
    <td>Reduce the use of 'Humanoids' under objects that are not `Class.Humanoid|Humanoids`. This should not be used to shorten draw calls as FastClusters consume much more memory.</td>
  </tr>
  <tr>
    <td>Prepare/UpdatePrepare/updateDynamicParts</td>
    <td>Updates positions for `Class.Humanoid|Humanoids`, vehicles and other moving instances for rendering.</td>
    <td>Reduce the number or complexity of moving `Class.Humanoid|Humanoids` or vehicles visible. Combining parts of the same material and color into a union or MeshPart can help with this.</td>
  </tr>
  <tr>
    <td>Prepare/UpdatePrepare/updateInstancedClusters</td>
    <td>Prepares static geometry that uses instanced rendering (parts and mesh parts). Labels "Clusters" and "Instances" indicate the number updated.</td>
    <td>Use less overall mesh and material variation. You can also create clusters by using objects that have similar appearances - size, color, material. </td>
  </tr>
  <tr>
    <td>Perform</td>
    <td>When actual rendering commands are created and issued.</td>
    <td>See Perform labels below.</td>
  </tr>
  <tr>
    <td>Perform/fillGuiVertices</td>
    <td>UI rendering. Fills buffers with UI vertices for adorns. "Gui count" label indicates the amount of elements in the renderer list.</td>
    <td>If the cost is high, reduce the amount of UI being updated by disabling it when it is not used by ensuring it is hidden correctly.</td>
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
    <td>If updating chunk occupancy takes too long, consider using lower resolution geometry, reducing the number of parts, or anchoring parts. If the other sub-markers take too long, consider reducing the number of lights and using non-shadow casting geometry for objects that move and invalidate the occupancy.</td>
  </tr>
  <tr>
    <td>Perform/Scene/computeLightingPerform/ShadowMapSystem</td>
    <td>Updates shadow maps. Not performed at quality levels below 4.</td>
    <td>Reduce the number of lights. You can also use `Class.Light.Shadows` and `Class.BasePart.CastShadows` to disable shadow casting on less important instances. See [Improving Performance](../../performance-optimization/improve.md#mitigation-4).</td>
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
    <td>UI rendering. In Id_Screen, there is a label with the number of batches, materials and triangles used.</td>
    <td>Reduce the number of visible UI elements. Using `CanvasGroups` may help at the expense of increased memory use.</td>
  </tr>
  <tr>
    <td>Perform/Scene/UpdateView/updateParticles, updateParticleBoundings</td>
    <td>Update particle position and bounds.</td>
    <td>Reduce the number of `Class.ParticleEmitter|ParticleEmitters`, emission rates, lifetimes, etc. Limit the movement of emitters.</td>
  </tr>
  <tr>
    <td>Id_Opaque</td>
    <td>Parts in the scene with a transparency value of 0.</td>
    <td></td>
  </tr>
  <tr>
    <td>Id_Transparent</td>
    <td>Parts in the scene with a transparency value other than 0.</td>
    <td>Reduce the use of partial transparency (values other than 0 and 1).</td>
  </tr>
  <tr>
    <td>Id_Decal</td>
    <td>Decals in the scene.</td>
    <td></td>
  </tr>
  <tr>
    <td>Perform/Present</td>
    <td>Waits for the GPU to finish rendering the previous frame; actually issues rendering commands to GPU; deals with low-level graphics resources.</td>
    <td>Reduce scene complexity in general. If this step is taking a long time, you may be limited by the GPU.</td>
  </tr>
  <tr>
    <td>Perform/Present/waitUntilCompleted</td>
    <td>Waits for the GPU to finish rendering the previous frame.</td>
    <td>If this is generally happening a lot then the amount of things rendered is too high. FRM helps with balancing this, but if it remains high, try to use less detail.</td>
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
    <td>Ensure functions in scripts using `Class.RunService:BindToRenderStep()` do as little work as possible.</td>
  </tr>
  <tr>
    <td>Render/PreRender/RunService.RenderStepped</td>
    <td>Runs functions connected to the `Class.RunService.RenderStepped` event.</td>
    <td>Similar to `BindToRenderStep`, ensure functions using this event do as little work as possible.</td>
  </tr>
  <tr>
    <td>WaitingHybridScriptJob</td>
    <td>Resumes scripts waiting using wait. frames.</td>
    <td>This step has an execution time budget to run waiting scripts, so if you have too many waiting scripts or scripts with a long runtime before yielding, this step can take multiple </td>
  </tr>
  <tr>
    <td>LuaGC</td>
    <td>Luau garbage collection cycle. Label provides memory estimates on total allocation and how much was deallocated. </td>
    <td>Pool lua tables and other collectable objects or try to reduce creating temporary tables or strings</td>
  </tr>
  <tr>
    <td>Heartbeat/RunService.Heartbeat</td>
    <td>Runs functions connected to the `Class.RunService.Heartbeat` `event.Talk` to simulation and scripts contacts. Current description is generic enough to be not wrong</td>
    <td>Reduce the amount or workload of functions connected to RunService.Heartbeat.</td>
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
    <td>Distributed Physics Ownership.</td>
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
    <td>Solves physics equations relating to connectors, buoyancy and `Class.Humanoid|Humanoids`. When the engine is overloaded and unable to simulate everything in real time, some steps may be throttled (stepWorldThrottled) and only "real time assemblies" such as `Class.Humanoid|Humanoids` are simulated.</td>
    <td>Depends on where the time is going based on the following three phases: stepContacts: narrow phase collision detection geometry tests. Solver step: integrate time and resolve collisions and other constraints updateBroadphase: update positions of assemblies in collision detection system and find possibly colliding narrow phase pairs.</td>
  </tr>
  <tr>
    <td>NotifyMovingAssemblies</td>
    <td>Helps track how long primitives have been sleeping.</td>
    <td></td>
  </tr>
  <tr>
    <td>Simulation/physicsSteppedTotal/physicsStepped/interpolateNetworkedAssemblies</td>
    <td>Interpolates assemblies not controlled by this network peer.</td>
    <td>Set the network owner of parts to this peer to reduce this; although this will usually cause more physics work to be done elsewhere.</td>
  </tr>
  <tr>
    <td>Simulation/handleFallenParts</td>
    <td>Removes parts that have fallen below Workspace/FallenPartsDestroyHeight.</td>
    <td>Lower the destroy height or reduce the amount of parts that fall to the destroy height.</td>
  </tr>
  <tr>
    <td>Heartbeat/heartbeatInternal/workspaceOnHeartbeat/updateVisuallySleeping</td>
    <td>Second part of NotifyMovingAssemblies.</td>
    <td></td>
  </tr>
  <tr>
    <td>Heartbeat/RunService.Heartbeat</td>
    <td>Runs functions connected to the `Class.RunService.Heartbeat` `event.Talk` to simulation and scripts contacts. Current description is generic enough to be not wrong</td>
    <td>Reduce the amount or workload of functions connected to `Class.RunService.Heartbeat`.</td>
  </tr>
  <tr>
    <td>worldStep/StepContacts</td>
    <td>Helps physics simulation step many contacts at once.</td>
    <td>Reduce the number of colliding objects.</td>
  </tr>
  <tr>
    <td>SolveBatch</td>
    <td>Helps the physics simulation solve batches of objects' motion.</td>
    <td></td>
  </tr>
  <tr>
    <td>Mechanism Interpolation</td>
    <td>Helps with InterpolateNetworkAssemblies.</td>
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
    <td>This is when events related to user input will fire. It is important to try and not do too much work directly as you get the input. Consider doing a minimal amount of processing for the input, and larger computations should be pushed off to another thread that happens later.</td>
  </tr>
  <tr>
    <td>Render/PreRender/TweenService</td>
    <td>Updates objects being tweened using `Class.TweenService` and calls completion callbacks, such as those used provided to `TweenSize` or `TweenPosition`.</td>
    <td>Reduce the number of objects being tweened using TweenService and ensure callbacks do as little work as possible.</td>
  </tr>
  <tr>
    <td>Render/PreRender/UpdateUILayouts</td>
    <td>Updates position and size of UI elements. </td>
    <td>Reduce the amount of UI elements being resized or repositioned dynamically, such as those managed by `Class.UILayout`.</td>
  </tr>
  <tr>
    <td>Heartbeat/TweenService</td>
    <td>On server, updates objects tweened with TweenService. On the client, this is done in a PreRender step instead.</td>
    <td>Reduce the amount of objects tweened by `Class.TweenService`.</td>
  </tr>
</tbody>
</table>
