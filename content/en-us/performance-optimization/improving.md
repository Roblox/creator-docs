---
title: Improving Performance
description: Lists common performance problems and steps to mitigate them.
---

This page describes common performance problems and best practices for mitigating them.

## Script Computation

Expensive operations in Lua code take longer to process and can thus impact frame rate. Unless it is being executed in parallel, Lua code runs synchronously and blocks the main thread until it encounters a function that yields the thread.

### Common Problems

- **Intensive operations on table structures** - Complex operations such as
  serialization, deserialization, and deep cloning incur a high performance
  cost, especially on large table structures. This is particularly true if these
  operations are recursive or involve iterating over very large data structures.
- **High frequency events** - Tying expensive operations to frame-based events
  of `Class.RunService` without limiting the frequency means these operations
  are repeated every frame, which often results in an unnecessary increase in
  computation time. These events include:

  - `Class.RunService.PreAnimation`
  - `Class.RunService.PreRender`
  - `Class.RunService.PreSimulation`
  - `Class.RunService.PostSimulation`
  - `Class.RunService.Heartbeat`

### Mitigation

- Invoke code on `Class.RunService` events sparingly, limiting usage to cases
  where high frequency invocation is essential (for example, updating the
  camera). You can execute most other code in other events or less frequently in
  a loop.
- Break up large or expensive tasks using `Library.task.wait()` to spread the
  work across multiple frames.
- Identify and optimize unnecessarily expensive operations and use
  [multithreading](../scripting/multithreading.md) for computationally
  expensive tasks that don't need to access the data model.
- Certain server-side scripts can benefit from [Native Code Generation](../luau/native-code-gen.md), a simple flag that compiles a script to machine code rather than bytecode.

### MicroProfiler Scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated Computation</th>
  </tr>
  <tr>
    <td>RunService.PreRender</td>
    <td>Code executing on the PreRender event</td>
  </tr>
  <tr>
    <td>RunService.PreSimulation</td>
    <td>Code executing on the Stepped event</td>
  </tr>
  <tr>
    <td>RunService.PostSimulation</td>
    <td>Code executing on Heartbeat event</td>
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
their own associated MicroProfiler tags that can provide useful signal.

## Script Memory Usage

Memory leaks can occur when you write scripts that consume memory that the
garbage collector can't properly release when its no longer in use. Leaks are
specifically pervasive on the server, because they can continuously be online
for many days, whereas a client session is much shorter.

The following memory values in the **Developer Console** can indicate a problem that needs further investigation:

- **LuaHeap** - High or growing consumption suggests a memory leak.
- **InstanceCount** - Consistently growing numbers of instances suggest references to some instances in your code are not being garbage collected.
- **PlaceScriptMemory** - Provides a script by script breakdown of memory usage.

### Common Problems

- **Leaving connections connected** - The engine never garbage collects events connected to an instance and any values referenced inside the connected callback. Therefore, active connections of events and code inside the connected instances, connected functions, and referenced values, are out of scope for the memory garbage collector, even after the events are fired.

  Although events are disconnected when the instance they belong to is
  destroyed, a common mistake is to assume this applies to `Class.Player`
  objects. After a user leaves an experience, the engine doesn't automatically
  destroy their representative `Class.Player` object and character model, so
  connections to the `Class.Player` object and instances under the character
  model, such as `Player.CharacterAdded`, still consume memory if you don't
  disconnect them in your scripts. This can result in very significant memory
  leaks over time on the server as hundreds of users join and leave the
  experience.

- **Tables** - Inserting objects into tables but not removing them when they are
  no longer needed causes unnecessary memory consumption, especially for tables
  that track user data when they join. For example, the following code sample creates a table adding user information each time a user joins:

   ```lua title="Example"
   local playerInfo = {}
   Players.PlayerAdded:Connect(function(player)
	   playerInfo[player] = {} -- some info
   end)
   ```

   If you don't remove these entries when they are no longer needed, the table continues to grow in size and consumes more memory as more users join the session. Any code that iterates over this table also becomes more computationally expensive as the table grows in size.

### Mitigation

To clean up all used values for preventing memory leaks:

- **Disconnect all connections** - Go through your code base make sure each
  connection is cleaned up via one of the following paths:
  - Disconnecting manually using the `Disconnect()` function.
  - Destroying the instance the event belongs to with the `Destroy()` function.
  - Destroying the script object that the connection traces back to.

- **Remove player objects and characters after leaving** - Implement code to
  ensure no connections persist after a user leaves, like in the following example:

   ```lua title="Example"
   Players.PlayerAdded:Connect(function(player)
     player.CharacterRemoving:Connect(function(character)
       task.defer(character.Destroy, character)
     end)
   end)

   Players.PlayerRemoving:Connect(function(player)
	   task.defer(player.Destroy, player)
   end)
   ```

## Physics Computation

Excessive physics simulation can be a key cause of increased computation time
per frame on both the server and the client.

### Common Problems

- **Excessive physics time step frequency** - By default, stepping behavior is
  in [adaptive mode](../physics/adaptive-timestepping.md), where physics
  steps at either 60 Hz, 120 Hz, or 240 Hz, depending on the complexity of the
  physics mechanism.

  A fixed mode with improved accuracy of physics is also available, which
  forces all physics assemblies to step at 240 Hz (four times per frame). This
  results in significantly more computation each frame.

- **Excessive number of complexity of simulated objects** - The more 3D
  assemblies that are simulated, the longer physics computations take each
  frame. Often, experiences will have objects being simulated that do not need
  to be or will have mechanisms that have more constraints and joints than they
  need.
- **Overly precise collision detection** - Mesh parts have a
  [collision fidelity](../workspace/collisions.md) property for detecting
  collision, which offers a variety of modes with different levels of
  performance impact. Precise collision detection mode for mesh parts has the
  most expensive performance cost and takes the engine longer to compute.

### Mitigation

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

- **Reduce the usage of precise collision fidelity for meshes**
  - For small or non-interactable objects where users would rarely notice the
    difference, use box fidelity.
  - For small-medium size objects, use box or hull fidelities, depending on the
    shape.
  - For large and very complex objects, build out custom collisions using
    invisible parts when possible.
  - For objects that don't require collisions, disable collisions and use box or
    hull fidelity, since the collision geometry is still stored in memory.
  - You can render collision geometry for debug purposes in Studio using **File** > **Studio Settings** > **Studio** > **Visualization** > **Show Decomposition Geometry**.

    Alternatively, apply the `CollisionFidelity=Precise` filter to the Explorer, which shows a count of all mesh parts with the precise fidelity and allows you to easily select them.

  - For an in-depth walkthrough on how to choose a collision fidelity option that balances your precision and performance requirements, see [Set Physics and Rendering Parameters](../tutorials/environmental-art/assemble-an-asset-library.md#collisionfidelity).

### MicroProfiler Scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated Computation</th>
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

## Physics Memory Usage

Physics movement and collision detection consumes memory. Mesh parts have a [collision fidelity](../workspace/collisions.md) property that determines the approach that's used to evaluate the collision bounds of the mesh.

### Common Problem

The default and precise collision detection modes consumes significantly more memory than the two other modes with lower fidelity collision shapes.

If you see high levels of memory consumption under **PhysicsParts**, you might need to explore reducing the collision fidelity of parts in your experience.

### How to Mitigate

To reduce memory used for collision fidelity:

- Reduce the number of unique meshes.
- For parts that do not need collisions, disable their collisions using by setting `CanCollide`, `CanTouch` and `CanQuery` to false.
- Reduce fidelity of collisions, using the `Class.MeshPart.CollisionFidelity` setting. `Box` has the lowest memory overhead, and `Default` and `Precise` are generally more expensive.
  - It's generally safe to set any small anchored part's collision fidelity to `Box`.
  - For very complex large meshes, you may want to build your own collision mesh out of smaller objects with box collision fidelity.

You can visualize the collision mesh in your environment by rendered collision
meshes using **Show Decomposition Geometry** in Studio settings.

## Humanoids

`Class.Humanoid` is a class that provides a wide range of functionalities to
player and non player characters (NPCs). Although powerful, a `Class.Humanoid`
comes with a significant computation cost.

### Common Problems

- **Leaving all HumanoidStateTypes enabled on NPCs** - There is a performance
  cost to leaving certain `Enum.HumanoidStateType|HumanoidStateTypes`
  enabled. Disable any that are not needed for your NPCs. For
  example, unless your NPC is going to climb ladders, it's safe to disable
  the `Climbing` state.
- **Instantiating, modifying, and respawning models with Humanoids frequently**
  - This can be intensive for the engine to process, particularly if these models use **Layered clothing**. This also can be particularly problematic in experiences where avatars respawn often.
  - In the **MicroProfiler**, lengthy **updateInvalidatedFastClusters** tags
    (over 4 ms) are often a signal that avatar instantiation/modification is
    triggering excessive invalidations.
- **Using Humanoids in cases where they are not required** - Static NPCs that do
  not move generally have no need for the `Class.Humanoid` class.
- **Playing animations on a large number of NPCs from the server** - NPC
  animations that run on the server need to be simulated on the server and replicated
  to the client. This can be unnecessary overhead.

### Mitigation

- **Play NPC animations on the client** - In experiences with a large number of
  NPCs, consider creating the `Class.Animator` on the client and running the
  animations locally. This reduces the load on the server and the need for
  unnecessary replication. It also makes additional optimizations possible (such
  as only playing animations for NPCs who are near to the character).
- **Use performance-friendly alternatives to Humanoids** - NPC models don't
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
  is required to respawn, you can simply reactivate one of the NPCs from the pool. This
  process is called pooling, which minimizes the amount of times characters need
  to be instantiated.
- **Only spawn NPCs when users are nearby** - Don't spawn NPCs when users aren't
  in range, and cull them when users leave their range.
- **Avoid making changes to the avatar hierarchy after it is instantiated** - Certain modifications to an avatar hierarchy have significant performance implications. Some optimizations are available:
  - For custom procedural animations, don't update the `Class.JointInstance.C0` and `Class.JointInstance.C1` properties. Instead, update the `Class.Motor6D.Transform` property.
  - If you need to attach any `BasePart` objects to the avatar, do so outside of
    the hierarchy of the avatar `Model`.

### MicroProfiler Scopes

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

## Rendering

A significant portion of the time the client spends each frame is on rendering
the scene in the current frame. The server doesn't do any rendering, so this
section is exclusive to the client.

### Draw Calls

A draw call is a set of instructions from the engine to the GPU to render
something. Draw calls have significant overhead. Generally, the fewer draw
calls per frame, the less computational time is spent rendering a frame.

You can see how many draw calls are currently occurring with the **Render Stats** > **Timing** item in Studio. You can view **Render Stats** in the client by pressing <kbd>Shift</kbd><kbd>F2</kbd>.

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

### Other Common Problems

- **Excessive object density** - If a large number of objects are concentrated
  with a high density, then rendering this area of the scene requires more
  draw calls. If you are finding your frame rate drops when looking at a certain
  part of the map, this can be a good signal that object density in this area is
  too high.
- **Missed Instancing Opportunities** - Often, a scene will include the same mesh
  duplicated a number of times, but each copy of the mesh has different mesh or
  texture asset IDs. This prevents instancing and can lead to unnecessary draw
  calls.

  A common cause of this problem is when an entire scene is imported at once,
  rather than individual assets being imported into Roblox and then duplicated
  post-import to assemble the scene.

- **Excessive object complexity** - Although not as important as the number of
  draw calls, the number of triangles in a scene does influence how long a frame
  takes to render. Scenes with a very large number of very complex meshes are a
  common problem, as are scenes with the `MeshPart.RenderFidelity` property set
  to `Enum.RenderFidelity.Precise` on too many meshes.
- **Excessive shadow casting** - Handling shadows is an expensive process, and
  maps that contain a high number and density of light objects that cast shadows
  (or a high number and density of small parts influenced by shadows) are likely to
  have performance issues.

### Mitigation

- **Instancing identical meshes and reducing the amount of unique meshes** - If
  you ensure all identical meshes to have the same underlying asset IDs, the
  engine can recognize and render them in a single draw call. Make sure to only
  upload each mesh in a map once and then duplicate them in Studio for reuse rather
  than importing large maps as a whole, which might cause identical meshes to
  have separate content IDs and be recognized as unique assets by the engine.
  [Packages](../projects/assets/packages.md) are a helpful mechanism for
  object reuse.
- **Culling** - Culling describes the process of eliminating draw calls for
  objects that don't factor into the final rendered frame. By default, the
  engine skips draw calls for objects outside the camera's field of view
  (frustum culling), but doesn't skip draw calls for objects occluded from view
  by other objects (occlusion culling). If your scene has a large number of draw
  calls, consider implementing your own additional culling at runtime
  dynamically for every frame, such as applying the following common strategies:
  - Hide `Class.MeshPart` and `Class.BasePart` that are far away from the camera
    or setting.
  - For indoor environments, implement a room or portal system that hides
    objects not currently occupied by any users.
- **Reducing render fidelity** - Set render fidelity to **Automatic** or
  **Performance**. This allows meshes to fall back to less complex
  alternatives, which can reduce the number of polygons that need to be drawn.
- **Disabling shadow casting on appropriate parts and light objects** - The
  complexity of the shadows in a scene can be reduced by selectively disabling
  shadow casting properties on light objects and parts. This can be done at edit
  time or dynamically at runtime. Some examples are:
  - Use the `Class.BasePart.CastShadow` property to disable shadow casting on
    small parts where shadows are unlikely to be visible. This can be
    particularly effective when only applied to parts that are far away from the
    user's camera.

    <Alert severity="warning">
    This might result in visual artifacts on shadows.
    </Alert>

  - Disable shadows on moving objects when possible.
  - Disable `Class.Light.Shadows` on light instances where the object does
    not need to cast shadows.
  - Limit the range and angle of light instances.
  - Use fewer light instances.

### MicroProfiler Scopes

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

## Networking and Replication

Networking and replication describes the process by which data is sent between the
server and connected clients. Information is sent between the client and server
every frame, but larger amounts of information require more compute time.

### Common Problems

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
  plugins in rigs. If these aren't removed before the game is published and
  the animated model is cloned regularly, a large amount of data will be
  replicated unnecessary.

- **Server-side TweenService** - If `Class.TweenService` is used to tween an object
  server side, the tweened property is replicated to each client every
  frame. Not only does this result in the tween being jittery as clients'
  latency fluctuates, but it causes a lot of unnecessary network traffic.

### Mitigation

You can employ the following tactics to reduce unnecessary replication:

- **Avoid sending large amounts of data at once through remote events**.
  Instead, only send necessary data at a lower frequency. For example, for a
  character's state, replicate it when it changes rather than every
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
  - First-person item view models.
  - Tween objects on the client rather than the server.

### MicroProfiler Scopes

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

## Asset Memory Usage

The highest impact mechanism available to creators to improve client memory usage is to enable [Instance Streaming](../workspace/streaming.md).

### Instance Streaming

Instance streaming selectively loads out parts of the data model that are not required, which can lead to considerably reduced load time and increase the client's ability to prevent crashes when it comes under memory pressure.

If you are encountering memory issues and have instance streaming disabled, consider updating your experience to support it, particularly if your 3D world is large. Instance streaming is based on distance in 3D space, so larger worlds naturally benefit more from it.

If instance streaming is enabled, you can increase the aggressiveness of it. For example, consider:

- Reducing use the persistent **StreamingIntegrity**.
- Reducing the **streaming radius**.

For more information on streaming options and their benefits, see [Streaming Properties](../workspace/streaming.md#streaming-properties).

### Other Common Problems

- **Asset Duplication** - A common mistake is to upload the same asset multiple times resulting in different asset IDs. This can lead to the same content being loaded into memory multiple times.
- **Excessive asset volume** - Even when assets are not identical, there are cases when opportunities to reuse the same asset and save memory are missed.
- **High resolution textures** - Graphics memory consumption for a texture is unrelated to the size of the texture on the disk, but rather the number of pixels in the texture.
  - For example, a 1024x1024 pixel texture consumes four times the graphics memory of a 512x512 texture.
  - Images uploaded to Roblox are transcoded to a fixed format, so there is no memory benefit to uploading images in a color model associated with fewer bytes per pixel. Though the engine automatically downscales texture resolution on some devices, the extent of the downscale depends on the device characteristics, and excessive texture resolution can still cause problems.
  - You can identify the graphics memory consumption for a given texture by expanding the **GraphicsTexture** category in the **Developer Console**.

### Mitigation

- **Only upload assets once** - Reuse the same asset ID across objects and ensure the same assets, especially meshes and images, aren't uploaded separately multiple times.
- **Find and fix duplicate assets** - Look for identical mesh parts and textures that are uploaded multiple times with different IDs.
  - Though there is no API to detect similarity of assets automatically, you can collect all the image asset IDs in your place (either manually or with a script), download them, and compare them using external comparison tools.
  - For mesh parts, the best strategy is to take unique mesh IDs and organize them by size to manually identify duplicates.
- **Importing assets in map separately** - Instead of importing an entire map at once, import and reconstruct assets in the map individually and reconstruct them. The 3D importer doesn't do any de-duplication of meshes, so if you were to import a large map with a lot of separate floor tiles, each of those tiles would be imported as a separate asset (even if they are duplicates). This can lead to performance and memory issues down the line, as each mesh is treated as individually and takes up memory and draw calls.
- **Limit the pixels of images** to no more than the necessary amount. Unless an image is occupying a large amount of physical space on the screen, it usually needs at most 512x512 pixels. Most minor images should be smaller than 256x256 pixels.
- **Use Trim Sheets** to ensure maximum texture reuse in 3D maps. For steps and examples on how to create trim sheets, see [Creating Trim Sheets](../resources/beyond-the-dark/building-architecture.md#creating-trim-sheets).

## Load Times

Many experiences implement custom loading screens and use the `Class.ContentProvider:PreloadAsync()` method to request assets so that images, sounds, and meshes are downloaded in the background.

The advantage of this approach is that it lets you ensure important parts of your experience are fully loaded without pop-in. However, a common mistake is overutilizing this method to preload more assets than are actually required.

An example of a bad practice is loading the _entire_ `Class.Workspace`. While this might prevent texture pop-in, it significantly increases load time.

Instead, only use `Class.ContentProvider:PreloadAsync()` in necessary situations, which include:

- Images in the loading screen.
- Important images in your experience menu, such as button backgrounds and icons.
- Important assets in the starting or spawning area.

If you must load a large number of assets, we recommend you provide a **Skip Loading** button.
