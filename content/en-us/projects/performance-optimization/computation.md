---
title: Computation
description: Explains computation related performance issues and best practices to prevent them.
---

Computation performance issues describe a broad category of problems with the
common symptom of increasing the amount of time the server or client needs to
spend computing key tasks. This guide covers common pitfalls that you can
identify during and after the creation process and the solutions to them.

Roblox's engine performs its computational tasks on a frame by frame basis.
Whether it be a frame being drawn on the client or a frame on the server
(commonly known as a heartbeat). If these tasks take too long, then fewer frames
can be processed per second and the performance of your experience will be
degraded. A key symptom of this is a reduced frame rate or heartbeat.

## Diagnosing Issues

You can use the following, general steps to diagnose both server and client
computation performance issues.

### Server

The server heartbeat (frame rate) is capped at 60fps for all experiences, so
values below that might indicate a performance issue. To check server heartbeat:

- **With the [Developer Console](../../studio/developer-console.md)** - In the
  **Server Jobs** tab, find the **Steps Per Sec** value, which represents the
  heartbeat of your experience.
- **With the server [MicroProfiler](../../studio/microprofiler/index.md)** -
  Look at the length of each frame to see if some are taking longer than 16.6ms
  (1 / 60).

  The MicroProfiler is particularly useful for identifying 'spikes' in
  performance, where some frames take significantly than others to process.

- **With the [Performance
  Dashboard](../../production/analytics/performance.md)** - You can view
  heartbeat values for production experiences.

Another symptom of degraded server heartbeat is increased latency (commonly
known as ping). The longer the server takes to finish computing its tasks each
frame, the longer it takes to process network data sent and received from
clients. To check average ping for all players connected to a server:

- **With the [Developer Console](../../studio/developer-console.md)** - Go to
  the **Server Stats** tab in the **Developer Console**.

### Client

The maximum device frame rate is capped at 60fps for all devices. However, you
should expect device frame rate to differ. In general, you should identify the
minimum target device type that you want your experience to run smoothly on and
evaluate the frame rate based on that device.

On high end devices, expect 60fps when the Roblox app is set to the max graphics
setting. For example, on PC, when the window is in focus, if the frame rate is
below 60fps, your experience likely to have computation issues that will be much
more evident on lower end devices. On lower end devices, expect 30fps with
graphics set to the automatic setting.

To check the frame rate of your experience:

- On the client, press `Shift + F5`.
- In Studio settings, under the **View** Tab, select **Stats** > **Summary** to
   enable debug stats. <Alert severity="warning"> Note, performance stats in
   Studio are skewed by the Studio application, so  you should view the frame
   rate on the client if you have a production experience. </Alert>
- With the [MicroProfiler](../../studio/microprofiler/index.md), on which the
graph at the top shows current, average, and max frame times for the past few
seconds, you can check to see if the frame takes longer than 16.6ms (1 / 60).
- With the [Performance Dashboard](../../production/analytics/performance.md),
  you can view the frame rate for different performance percentiles.

<Alert severity="info"> When evaluating frame rate, it can help to set the
graphics quality to **maximum** to remove the effect of the frame rate manager.
This setting is under the in-experience settings menu, represented by a
Roblox icon on the top left corner of every experience. </Alert>

## Common Problems

The following sections describe problems and best practices for common
categories of computation related performance issues.

### Scripts

Expensive operations in Lua code take longer to process, and thus can impact
frame rate. Unless it is being executed in parallel, Lua code runs synchronously
and blocks the main thread until it encounters a function that yields the
thread.

<h4>Common Problems</h4>

Overuse of the following components in your scripts causes the
computation to be expensive.

- **Intensive operations on table structures** - Complex operations such as
  serialization, deserialization, and deep cloning incur a high performance
  cost, especially on large table structures. This is particularly true if these
  operations are recursive or involve iterating over very large data structures.
- **High frequency events** - Tying expensive operations to frame-based events
  of `Class.RunService` without limiting the frequency, means these operations
  will be repeated every frame which often results in an unnecessary increase in
  computation time. These events include:
  - `Class.RunService.RenderStepped`
  - `Class.RunService.Stepped`
  - `Class.RunService.Heartbeat`

<h4>How to Mitigate</h4>

- Invoke code on `Class.RunService` events sparingly, limiting usage to cases
  where high frequency invocation is essential (for example, updating the
  camera). You can execute most other code in other events or less frequently in
  a loop.
- Break up large or expensive tasks using `Library.task.wait()` to spread the
  work across multiple frames.
- Identify and optimize unnecessarily expensive operations and use
  [multithreading](../../scripting/multithreading.md) for computationally
  expensive tasks that don't need to access the data model.

<h4>Associated MicroProfiler Scopes</h4>

<table>
  <tr>
    <th>**Scope**</th>
    <th>**Associated Computation**</th>
  </tr>
  <tr>
    <td>RunService.RenderStepped</td>
    <td>Code executing on the RenderStepped event</td>
  </tr>
  <tr>
    <td>RunService.Stepped</td>
    <td>Code executing on the Stepped event</td>
  </tr>
  <tr>
    <td>RunService.Heartbeat</td>
    <td>Code executing on Heartbeat event</td>
  </tr>
</table>

For more information on debugging scripts using the MicroProfiler, see the
`Library.debug` library, which includes functions for tagging specific code and
further increasing specificity, such as `Library.debug.profilebegin` and
`Library.debug.profileend`. Many Roblox API methods called by scripts also have
their own associated MicroProfiler tags that can provide useful signals.

### Physics

Excessive physics simulation can be a key cause of increased computation time
per frame on both the server and the client.

<h4>Common Problems</h4>

- **Excessive physics time step frequency** - By default, stepping behavior is
  in [adaptive mode](../../physics/adaptive-timestepping.md), where physics
  steps at either 60hz, 120hz, or 240hz, depending on the complexity of the
  physics mechanism.
  - A fixed mode with improved accuracy of physics is also available, which
    forces all physics assemblies to step at 240hz or 4 times per frame. This
    results in significantly more computation each frame.
- **Excessive number of complexity of simulated objects** - The more 3D
  assemblies that are simulated, the longer physics computations take each
  frame. Often, experiences will have objects being simulated that do not need
  to be or will have mechanisms that have more constraints and joints than they
  need.
- **Overly precise collision detection** - Mesh parts have a [collision
  fidelity](../../workspace/collisions.md) property for detecting collision,
  which offers a variety of modes with different levels of performance impact.
  Precise collision detection mode for mesh parts has the most expensive
  performance cost and takes the engine longer to compute.

<h4>How to Mitigate</h4>

You can carry out the following tasks to help mitigate computation issues:

- **Anchor parts that don't require simulation** - Anchor all parts that don't
  need to be driven by physics, such as for static NPCs.
- **Use adaptive physics stepping** - Adaptive stepping dynamically adjusts the
  rate of physics calculations for physics mechanisms, allowing physics updates
  to be made less frequently in some cases.
- **Reduce mechanism complexity**
  - Where possible, minimize the number of physics constraints or joints in an
    assembly.
  - Reduce the amount of self-collision within a mechanism, such as by applying
    limits or no-collision constraints to ragdoll limbs to prevent them from
    colliding with each other.

- **Reduce the usage of precise collision fidelity for meshes as much as
  possible**:
  - For small or non-interactable objects that users rarely notice the
    difference, use box fidelity.
  - For small-medium size objects, use box or hull fidelities, depending on the
    shape.
  - For large and very complex objects, build out custom collisions using
    invisible parts when possible.
  - For objects that don't require collisions, disable collisions and use box or
    hull fidelity, since the collision geometry is still stored in memory.
  - You can render collision geometry for debug purposes in Studio using **File** > **Studio Settings** > **Studio** > **Visualization** > **Show Decomposition Geometry**

    Alternatively, you can apply
    the `CollisionFidelity=Precise` filter to the Explorer, which shows a count
    of all mesh parts with the precise fidelity and allows you to easily select
    them.
  - For an in-depth walkthrough on how to choose a collision fidelity option that balances your precision and performance requirements, see [Set Physics and Rendering Parameters](../../tutorials/environmental-art/assemble-an-asset-library.md#collisionfidelity).

<h4>MicroProfiler Timing Scopes Associated</h4>

<table>
  <tr>
    <th>**Scope**</th>
    <th>**Associated Computation**</th>
  </tr>
  <tr>
    <td>physicsStepped</td>
    <td>Overall physics computation</td>
  </tr>
  <tr>
    <td>worldStep</td>
    <td>Discrete physics steps taken each frame</td>
  </tr>
</table>

### Humanoids

`Class.Humanoid` is a class that provides a wide range of functionalities to
player and non player characters (NPCs). Although powerful, a `Class.Humanoid`
comes with a significant computation cost.

<h4>Common Problems</h4>

- **Leaving all HumanoidStateTypes enabled on NPCs** - There is a performance
  cost to leaving certain `Enum.HumanoidStateType|HumanoidStateTypes`
  enabled and any that are not needed for your NPCs should be disabled. For
  example, unless your NPC is going to be climbing ladders, it's safe to disable
  the `Climbing` state.
- **Instantiating, modifying, and respawning models with Humanoids frequently**
  - This can be intensive for the engine to process. Particularly if these Humanoid
  Models use **Layered clothing**. This also can be particularly problematic in
  experiences where avatars respawn often.
  - In the **MicroProfiler**, lengthy **updateInvalidatedFastClusters** tags
    (over 4ms) are often a signal that avatar instantiation / modification is
    triggering excessive invalidations.
- **Using Humanoids in cases where they are not required** - Static NPCs that do
  not move, generally have no need for the `Class.Humanoid` class .
- **Playing animations on a large number of NPCs from the server** - NPC
  animations that run on the server need to be simulated on the server and replicated
  to the client. This can be unnecessary overhead.

<h4>How to Mitigate</h4>

- **Play NPC animations on the client** - In experiences with a large number of
  NPCs, consider creating the `Class.Animator` on the client and running the
  animations locally. This reduces the load on the server and the need for
  unnecessary replication. It also makes additional optimizations possible (such
  as only playing animations for NPCs who are near to the character)
- **Use performance-friendly alternatives to Humanoids**: NPC models don't
  necessarily need to contain a humanoid object.
  - For static NPCs, use a simple `Class.AnimationController`, because they
    don't need to move around but just need to play animations.
  - For moving NPCs, consider implementing your own movement controller and
    using an `Class.AnimationController` for animations, depending on the
    complexity of your NPCs.
- **Disable unused humanoid states** - Use `Class.Humanoid:SetStateEnabled()` to
  only enable necessary states for each humanoid.
- **Pool NPC models with frequent respawning** - Instead of destroying an NPC
  completely, send the NPC to a pool of inactive NPCs. This way, when a new NPC
  is required to respawn, simply reactivate one of the NPCs from the pool. This
  process is called pooling, which minimizes the amount of times characters need
  to be instantiated.
- **Only spawn NPCs when users are nearby** - Don't spawn NPCs when users aren't
  in range and cull them out when users leave their range.
- **Avoid making changes to the avatar hierarchy after it is instantiated** -
  Certain modifications to an avatar hierarchy have significant performance
  implications. Certain optimizations are available:
  - For custom procedural animations, don't update the `Class.JointInstance.C0` and `Class.JointInstance.C1` properties. Instead, update the `Class.Motor6D.Transform` property.
  - If you need to attach any `BasePart` objects to the avatar. Do so outside of
    the hierarchy of the avatar `Model`.

<h4>MicroProfiler Timing Scopes</h4>

<table>
  <tr>
    <th>Scope</th>
    <th>Associated Computation</th>
  </tr>
  <tr>
    <td>stepHumanoid</td>
    <td>Humanoid control and physics</td>
  </tr>
  <tr>
    <td>stepAnimation</td>
    <td>Humanoid and animator animation</td>
  </tr>
  <tr>
    <td>updateInvalidatedFastClusters</td>
    <td>Associated with instantiating or modifying an avatar</td>
  </tr>
</table>

### Rendering

A significant portion of the time the client spends each frame is on rendering
the scene in the current frame. The server doesn't do any rendering, so this
section is exclusive to the client.

<h4>Draw Calls</h4>

A draw call is a set of instructions from the engine to the GPU to render
something. Draw calls have significant overhead, and generally the fewer draw
calls a frame the engine makes the less computational time is spent rendering a
frame.

You can see how many draw calls are currently occurring with the **Render
Stats**>**Timing** item in Studio. You can view **Render Stats** in the client by
pressing `Shift+F2`.

The more objects that need to be drawn in your scene in a given frame, the more
draw calls are made to the GPU. However, the Roblox engine utilizes a process
called _instancing_ to collapse identical meshes with the same texture
characteristics into a single draw call. Specifically, multiple meshes with the
same `MeshId` are handled in a single draw call when:

- `Class.SurfaceAppearance|SurfaceAppearances` are identical.
`Class.MeshPart.TextureID|TextureIDs` are identical when
`Class.SurfaceAppearance` doesn't exist.
- Materials are identical when both `Class.SurfaceAppearance` and
  `Class.MeshPart.TextureID` don't exist.

<h4>Common Problems</h4>

- **Excessive object density** - If a large number of objects are concentrated
  with a high density, then rendering this area of the scene will require more
  draw calls. If you are finding your frame rate drops when looking at a certain
  part of the map, this can be a good signal that object density in this area is
  too high.
- **Missed Instancing Opportunities** - Often, a scene will include the same mesh
  duplicated a number of times, but each copy of the mesh has different mesh or
  texture asset IDs. This prevents instancing and can lead to unnecessary draw
  calls.
  - A common cause of this problem is when an entire scene is imported at once,
    rather than individual assets being imported into Roblox and then duplicated
    post-import to assemble the scene.
- **Excessive object complexity** - Although not as important as the number of
  draw calls, the number of triangles in a scene does influence how long a frame
  takes to render. Scenes with a very large number of very complex meshes are a
  common problem, as are scenes with the `MeshPart.RenderFidelity` property set
  to `Precise` on too many meshes.
- **Excessive shadow casting** - Handling shadows is an expensive process, and
  maps that contain a high number & density of light objects that cast shadows
  or a high number & density of small parts influenced by shadows are likely to
  have performance issues.

<h4>How to Mitigate</h4>

- **Instancing identical meshes and reducing the amount of unique meshes** - If
  you ensure all identical meshes to have the same underlying asset IDs, the
  engine can recognize and render them in a single draw call. Make sure to only
  upload each mesh in a map once and duplicate them in Studio for reuse rather
  than importing large maps as a whole, which might cause identical meshes to
  have separate content IDs and be recognized as unique assets by the engine.
  [Packages](../../projects/assets/packages.md) are a helpful mechanism for
  object reuse.
- **Culling** - Culling describes the process of eliminating draw calls for
  objects that don't factor into the final rendered frame. By default, the
  engine skips draw calls for objects outside the camera's field of view
  (Frustum culling), but doesn't skip draw calls for objects occluded from view
  by other objects (Occlusion culling). If your scene has a large number of draw
  calls, consider implementing your own additional culling at runtime
  dynamically for every frame, such as applying the following common strategies:
  - Hide `Class.MeshPart` and `Class.BasePart` that are far away from the camera
    or setting.
  - For indoor environments, implement a room or portal system that hides
    objects not currently occupied by any users.
- **Reducing render fidelity** - Set render fidelity to **Automatic** or
  **Performance**. This will allow meshes to fall back to less complex
  alternatives, which can reduce the number of polygons that need to be drawn.
- **Disabling shadow casting on appropriate parts and light objects** - The
  complexity of the shadows in a scene can be reduced by selectively disabling
  shadow casting properties on light objects and parts. This can be done at edit
  time or dynamically at runtime. Some examples are:
  - Use the `Class.BasePart.CastShadow` property to disable shadow casting on
    small parts where shadows are unlikely to be visible. This can be
    particularly effective when only applied to parts that are far away from the
    user's camera. <Alert severity="warning"> This might result in visual
    artifacts on shadows. </Alert>
  - Disable shadows on moving objects when possible.
  - Disable `Class.Light.Shadows` on light instances where the object does
    not need to cast shadows.
  - Limit the range and angle of light instances.
  - Use fewer light instances.

<h4>MicroProfiler Timing Scopes</h4>

<table>
  <tr>
    <th>Scope</th>
    <th>Associated Computation</th>
  </tr>
  <tr>
    <td>Prepare and Perform</td>
    <td>Overall rendering</td>
  </tr>
  <tr>
    <td>Perform/Scene/computeLightingPerform</td>
    <td>Light grid and shadow updates</td>
  </tr>
  <tr>
    <td>Update LightGrid</td>
    <td>Voxel light grid updates</td>
  </tr>
  <tr>
    <td>Shadows</td>
    <td>Shadow mapping</td>
  </tr>
  <tr>
    <td>Perform/Scene/UpdateView</td>
    <td>Preparation for rendering and particle updates</td>
  </tr>
  <tr>
    <td>Perform/Scene/RenderView</td>
    <td>Rendering and post processing</td>
  </tr>
</table>

### Networking and Replication

Networking & Replication describes the process by which data is sent between the
server and connected clients. Information is sent between the client and server
every frame, but the more information that is sent the more computation time is
sent sending this data and processing received data.

<h4>Common Problems</h4>

- **Excessive remote traffic** - Sending a large amount of data through
  `Class.RemoteEvent` or `Class.RemoteFunction` objects or invoking them very frequently
  can lead to a large amount of CPU time being spent processing incoming packets
  each frame. Common mistakes include:
  - Replicating data every frame that does not need to be replicated.
  - Replicating data on user input without any mechanism to throttle it.
  - Dispatching more data than is required. For example, sending the player's
    entire inventory when they purchase an item rather than just details of the
    item purchased.
- **Creation or removal of complex instance trees** - When a change is made to
  the data model on the server, it is replicated to connected clients. This
  means creating and destroying large instance hierarchies like maps at runtime
  can be very network intensive.
  
  A common culprit here is the complex animation data saved by Animation Editor
  plugins in rigs. If these aren't removed before the game is published, and
  the animated model is cloned regularly a large amount of data will be
  replicated unnecessary.

- **Server side TweenService** - If `Class.TweenService` is used to tween an object
  server side, the tweened property will be replicated to each client every
  frame. Not only will this result in the tween being jittery as clients'
  latency fluctuates but a lot of network traffic will be dispatched
  unnecessarily.

<h4>How to Mitigate</h4>

You can employ the following tactics to reduce unnecessary replication:

- **Avoid sending large amounts of data at once through remote events**.
  Instead, only send necessary data at a lower frequency. For example, for a
  character's state, only replicate once when it changes rather than every
  frame.
- **Chunk up complex instance trees** like maps and load them in pieces to
  distribute the work replicating these across multiple frames.
- **Clean up animation metadata**, especially the animation directory of rigs,
  after importing.
- **Limit unnecessary instance replication**, especially in cases where the
  server doesn't need to have knowledge of the instances being created. This
 includes:
  - Visual effects such as an explosion or a magic spell blast. The server only
    needs to know the location to determine the outcome, while the clients can
    create visuals locally.
  - First person item view models.
  - Tween objects on the client rather than the server.

<h4>MicroProfiler Timing Scopes</h4>
  <table>
  <tr>
    <th>Scope</th>
    <th>Associated Computation</th>
  </tr>
  <tr>
    <td>ProcessPackets</td>
    <td>Processing for incoming network packets, such as event invocations and property changes</td>
  </tr>
  <tr>
    <td>Allocate Bandwidth and Run Senders</td>
    <td>Outgoing events relevant on servers</td>
  </tr>
</table>
