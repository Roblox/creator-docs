---
title: Improve performance
description: Lists common performance problems and steps to mitigate them.
---

This page describes common performance problems and best practices for mitigating them.

## Script computation

Expensive operations in Luau code take longer to process and can thus impact frame rate. Unless it is being executed in parallel, Luau code runs synchronously and blocks the main thread until it encounters a function that yields the thread.

### Common problems

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
- Certain server-side scripts can benefit from [native code generation](../luau/native-code-gen.md), a simple flag that compiles a script to machine code rather than bytecode.

### MicroProfiler scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated computation</th>
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

## Script memory usage

Memory leaks can occur when you write scripts that consume memory that the
garbage collector can't properly release when its no longer in use. Leaks are
specifically pervasive on the server, because they can continuously be online
for many days, whereas a client session is much shorter.

The following memory values in the **Developer Console** can indicate a problem that needs further investigation:

- **LuaHeap** - High or growing consumption suggests a memory leak.
- **InstanceCount** - Consistently growing numbers of instances suggest references to some instances in your code are not being garbage collected.
- **PlaceScriptMemory** - Provides a script by script breakdown of memory usage.

### Common problems

- **Leaving connections connected** - The engine never garbage collects events connected to an instance and any values referenced inside the connected callback. Therefore, active connections of events and code inside the connected instances, connected functions, and referenced values, are out of scope for the memory garbage collector, even after the events are fired.

  Although events are disconnected when the instance they belong to is
  destroyed, a common mistake is to assume this applies to `Class.Player`
  objects. After a user leaves an experience, the engine doesn't automatically
  destroy their representative `Class.Player` object and character model, so
  connections to the `Class.Player` object and instances under the character
  model, such as `Class.Player.CharacterAdded|CharacterAdded`, still consume memory if you don't disconnect them in your scripts.
	This can result in very significant memory leaks over time on the server as hundreds of users join and leave the experience.

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

- **Disconnect all connections** - Go through your codebase and make sure each
  connection is cleaned up via one of the following paths:
  - Disconnecting manually using the `Datatype.RBXScriptConnection:Disconnect()|Disconnect()` function.
  - Destroying the instance the event belongs to with the `Class.Instance:Destroy()|Destroy()` function.
  - Destroying the script object that the connection traces back to.

- **Remove player objects and characters after leaving** - Enable `Class.Workspace.PlayerCharacterDestroyBehavior` to automatically destroy player objects and character models after a user leaves. If you prefer, you can instead clean them up manually:

   ```lua title="Example player and character cleanup"
	 local Players = game:GetService("Players")
   Players.PlayerAdded:Connect(function(player)
     player.CharacterRemoving:Connect(function(character)
       task.defer(character.Destroy, character)
     end)
   end)

   Players.PlayerRemoving:Connect(function(player)
	   task.defer(player.Destroy, player)
   end)
   ```

## Physics computation

Excessive physics simulation can be a key cause of increased computation time
per frame on both the server and the client.

### Common problems

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
  `Class.MeshPart.CollisionFidelity|CollisionFidelity` property for detecting
  collision which offers a variety of modes with different levels of
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
  - You can render collision geometry for debug purposes in Studio by toggling
  	on **Collision fidelity** from the [Visualization&nbsp;Options](../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.

    Alternatively, you can apply the `CollisionFidelity=PreciseConvexDecomposition` filter to the [Explorer](../studio/explorer.md#property-filters) which shows a count of all mesh parts with the precise fidelity and allows you to easily select them.

  - For an in-depth walkthrough on how to choose a collision fidelity option that balances your precision and performance requirements, see [Set physics and rendering parameters](../tutorials/curriculums/environmental-art/assemble-an-asset-library.md#collisionfidelity).

### MicroProfiler scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated computation</th>
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

## Physics memory usage

Physics movement and collision detection consumes memory. Mesh parts have a `Class.MeshPart.CollisionFidelity|CollisionFidelity` property that determines the approach that's used to evaluate the collision bounds of the mesh.

### Common problem

The default and precise collision detection modes consumes significantly more memory than the two other modes with lower fidelity collision shapes.

If you see high levels of memory consumption under **PhysicsParts**, you might need to explore reducing the [collision fidelity](../workspace/collisions.md#mesh-and-solid-model-collisions) of objects in your experience.

### How to mitigate

To reduce memory used for collision fidelity:

- For parts that do not need collisions, disable their collisions by setting `Class.BasePart.CanCollide`, `Class.BasePart.CanTouch` and `Class.BasePart.CanQuery` to `false`.
- Reduce fidelity of collisions using the `Class.MeshPart.CollisionFidelity|CollisionFidelity` setting. `Enum.CollisionFidelity.Box|Box` has the lowest memory overhead, and `Enum.CollisionFidelity.Default|Default` and `Enum.CollisionFidelity.Precise|Precise` are generally more expensive.
  - It's generally safe to set any small anchored part's collision fidelity to `Enum.CollisionFidelity.Box|Box`.
  - For very complex large meshes, you may want to build your own collision mesh out of smaller objects with box collision fidelity.

## Humanoids

`Class.Humanoid` is a class that provides a wide range of functionalities to
player and non player characters (NPCs). Although powerful, a `Class.Humanoid`
comes with a significant computation cost.

### Common problems

- **Leaving all HumanoidStateTypes enabled on NPCs** - There is a performance
  cost to leaving certain `Enum.HumanoidStateType|HumanoidStateTypes`
  enabled. Disable any that are not needed for your NPCs. For
  example, unless your NPC is going to climb ladders, it's safe to disable
  the `Enum.HumanoidStateType.Climbing|Climbing` state.
- **Instantiating, modifying, and respawning models with `Class.Humanoid|Humanoids` or [skinned](../art/modeling/rigging.md) `Class.MeshPart|MeshParts` frequently**
  - This can be intensive for the engine to process, particularly if these models use **layered clothing**. This also can be particularly problematic in experiences where avatars respawn often.
  - In the MicroProfiler, lengthy **updateInvalidatedFastClusters** tags
    (over 4 ms) are often a signal that avatar instantiation/modification is
    triggering excessive invalidations.
- **Using Humanoids in cases where they are not required** - Static NPCs that do
  not move generally have no need for the `Class.Humanoid` class.
- **Playing animations on a large number of NPCs from the server** - NPC
  animations that run on the server need to be simulated on the server and replicated
  to the client. This can be unnecessary overhead.
- **Performing unnecessary size and scale changes** - Size/scale changes cause FastCluster to be rebuilt. Try to reduce this during gameplay if you are seeing FastCluster-related performance issues. Similarly, other property changes might also cause FastCluster to be rebuilt, so in general reduce these changes as much as possible.

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
  - If you need to attach any `Class.BasePart` objects to the avatar, do so outside the hierarchy of the avatar `Class.Model`.

### MicroProfiler scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated computation</th>
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

### Draw calls

A draw call is a set of instructions from the engine to the GPU to render
something. Draw calls have significant overhead. Generally, the fewer draw
calls per frame, the less computational time is spent rendering a frame.

You can see how many draw calls are currently occurring with the **Render Stats** ⟩ **Timing** item in Studio. You can view **Render Stats** in the client by pressing <kbd>Shift</kbd><kbd>F2</kbd>.

The more objects that need to be drawn in your scene in a given frame, the more
draw calls are made to the GPU. However, the Roblox Engine utilizes a process
called _instancing_ to collapse identical meshes with the same texture
characteristics into a single draw call. Specifically, multiple meshes with the
same `Class.MeshPart.MeshContent|MeshContent` are handled in a single draw call when:

- `Class.SurfaceAppearance|SurfaceAppearances` are identical if present, otherwise when `Class.MeshPart.TextureContent|TextureContents` are identical.
- Materials are identical when both `Class.SurfaceAppearance` and
  `Class.MeshPart.TextureID` don't exist.

### Other common problems

- **Excessive object density** - If a large number of objects are concentrated
  with a high density, then rendering this area of the scene requires more
  draw calls. If you are finding your frame rate drops when looking at a certain
  part of the map, this can be a good signal that object density in this area is
  too high.

  Objects like decals, textures, and particles don't batch well and introduce
  additional draw calls. Pay extra attention to these object types in a scene. In particular, property changes to `Class.ParticleEmitter|ParticleEmitters` can have a dramatic impact on performance.

- **Missed instancing opportunities** - Often, a scene will include the same mesh
  duplicated a number of times, but each copy of the mesh has different mesh or
  texture asset IDs. This prevents instancing and can lead to unnecessary draw
  calls.

  A common cause of this problem is when an entire scene is imported at once,
  rather than individual assets being imported into Roblox and then duplicated
  post-import to assemble the scene.

  Even a simple script like this one can help you identify mesh parts with the
  same name that use different mesh IDs:

  ```lua
  for _,descendant in workspace:GetDescendants() do
    if descendant:IsA("MeshPart") then
      print(descendant.Name .. ", " .. descendant.MeshId)
    end
  end
  ```

  The output (with **Stack Lines** enabled) might look something like this. Repeated lines indicate reuse of the same mesh, which is good. Unique lines aren't necessarily bad, but depending on your naming scheme, could indicate duplicate meshes in your experience:

  ```text
  LargeRock, rbxassetid://106420009602747 (x144) -- good
  LargeRock, rbxassetid://120109824668127
  LargeRock, rbxassetid://134460273008628
  LargeRock, rbxassetid://139288987285823
  LargeRock, rbxassetid://71302144984955
  LargeRock, rbxassetid://90621205713698
  LargeRock, rbxassetid://113160939160788
  LargeRock, rbxassetid://135944592365226 -- all possible duplicates
  ```

- **Excessive object complexity** - Although not as important as the number of
  draw calls, the number of triangles in a scene does influence how long a frame
  takes to render. Scenes with a very large number of very complex meshes are a
  common problem, as are scenes with the `Class.MeshPart.RenderFidelity` property set
  to `Enum.RenderFidelity.Precise|Precise` on too many meshes.

- **Excessive shadow casting** - Handling shadows is an expensive process, and
  maps that contain a high number and density of light objects that cast shadows
  (or a high number and density of small parts influenced by shadows) can have
  performance issues.

- **High transparency overdraw** - Placing objects with partial transparency
  near each other forces the engine to render the overlapping pixels multiple
  times, which can hurt performance. For more information on identifying and
  fixing this issue, see
  [Delete layered transparencies](../tutorials/curriculums/environmental-art/optimize-your-experience.md#delete-layered-transparencies).

- **Unnecessary skinned MeshPart movement** - Skinned MeshParts that are part of a Model without a Humanoid are grouped using spatially-organized FastClusters. When these MeshParts move, they must be continually added to and removed from these spatial clusters, forcing the clusters to be rebuilt and impacting performance.
  - A highly effective workaround is to embed a Humanoid within the Model. The presence of a Humanoid overrides the default spatial clustering behavior, mandating the use of a single, unified FastCluster for the entire Model. Consequently, position updates no longer necessitate cluster rebuilds, thus mitigating the performance bottleneck. This technique should be reserved exclusively for MeshParts with expected movement, as it may introduce memory overhead and negate the benefits of spatial optimization. We recommend always profile your experience after making these types of changes. See [Humanoid performance tips](#humanoids) for additional information.
- **Too many parts in a `Class.Model`** - Too many parts in a Model could cause rebuilds more often due to the potential for a part's property to change leading to requiring a full rebuild. Find the right balance of parts in a Model when it is using FastCluster.

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
  (frustum culling) and parts, meshes, and terrain occluded from view by other
  objects (occlusion culling). In certain scenarios, such as indoor
  environments, you might be able to implement a room or portal system and
  manually cull objects to further reduce draw calls or overall computational
  load.
- **Reducing render fidelity** - Set `Class.MeshPart.RenderFidelity` to `Enum.RenderFidelity.Automatic|Automatic` or `Enum.RenderFidelity.Performance|Performance`. This allows meshes to fall back to less complex
  alternatives, which can reduce the number of polygons that need to be drawn.
- **Disabling shadow casting on appropriate parts and light objects** - The
  Roblox engine automatically degrades shadow quality as client graphics quality
  level decreases, eventually disabling shadows altogether at quality levels
  below 4. However, you can selectively disable shadow casting properties on
  light objects and parts to improve performance while shadows are enabled and
  increase the likelihood that shadows remain enabled. Some examples of
  optimizations you can make either at edit time or dynamically at runtime:
  - Use the `Class.BasePart.CastShadow` property to disable shadow casting on
    small parts where shadows are unlikely to be visible. This strategy is
    particularly effective when applied to parts that are far away from the
    user's camera.

    <Alert severity="warning">
    This might result in visual artifacts on shadows.
    </Alert>

  - Disable shadows on moving objects when possible.
  - Disable `Class.Light.Shadows` on light instances where the object does not
    need to cast shadows.
  - Limit the range and angle of light instances.
  - Use fewer light instances.
  - Consider disabling lights that are outside of a specific range or on a
    room-by-room basis for indoor environments.

### MicroProfiler scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated computation</th>
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
    <td>LightGridCPU</td>
    <td>Voxel light grid updates</td>
  </tr>
  <tr>
    <td>ShadowMapSystem</td>
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

## Networking and replication

Networking and replication describes the process by which data is sent between the
server and connected clients. Information is sent between the client and server
every frame, but larger amounts of information require more compute time.

### Common problems

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

  A common culprit here is the complex animation data saved by **Animation Editor**
  plugins in rigs. If these aren't removed before the experience is published and
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

### MicroProfiler scopes

<table>
  <tr>
    <th>Scope</th>
    <th>Associated computation</th>
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

## Asset memory usage

The highest impact mechanism available to creators to improve client memory usage is to enable [Instance streaming](../workspace/streaming.md).

### Instance streaming

Instance streaming selectively loads out parts of the data model that are not required, which can lead to considerably reduced load times and increase the client's ability to prevent crashes when it comes under memory pressure.

If you are encountering memory issues and have instance streaming disabled, consider updating your experience to support it, particularly if your 3D world is large. Instance streaming is based on distance in 3D space, so larger worlds naturally benefit more from it.

If instance streaming is enabled, you can increase the aggressiveness of it. For example, consider:

- Reducing use of `Enum.ModelStreamingMode.Persistent` where possible. You may need to update your scripts if you're using it as a compatibility measure.
- Reducing the `Workspace.StreamingMinRadius` and `Workspace.StreamingTargetRadius`.

For more information on streaming options and their benefits, see [Streaming properties](../workspace/streaming.md#streaming-properties).

### Other common problems

- **Asset duplication** - A common mistake is to upload the same asset multiple times resulting in different asset IDs. This can lead to the same content being loaded into memory multiple times.
- **Excessive asset volume** - Even when assets are not identical, there are cases when opportunities to reuse the same asset and save memory are missed.
- **Audio files** - Audio files can be a surprising contributor to memory usage, particularly if you load all of them into the client at once rather than only loading what you need for a portion of the experience. For strategies, see [Load times](#load-times).
- **High resolution textures** - Graphics memory consumption for a texture is unrelated to the size of the texture on the disk; the number of pixels in the texture determines memory usage. For example, a 1024x1024 pixel texture consumes four times the graphics memory of a 512x512 texture.

  Images uploaded to Roblox are transcoded to a fixed format, so there is no memory benefit to uploading images in a color model associated with fewer bytes per pixel. Similarly, compressing images prior to upload or removing the alpha channel from images that don't need it can decrease image size on disk, but doesn't improve memory usage.

  As an experience loads, the engine automatically starts with lower quality textures and then ramps up quality based on available device memory, distance from the camera, amount of screen-space that the texture takes up, and other factors. Even still, strategically sizing your textures can improve memory usage in your experience.

### Mitigation

- **Only upload assets once** - Reuse the same asset ID across objects and ensure the same assets, especially meshes and images, aren't uploaded separately multiple times.
- **Find and fix duplicate assets** - Look for identical mesh parts and textures that are uploaded multiple times with different IDs.
  - Though there is no API to detect similarity of assets automatically, you can collect all the image asset IDs in your place (either manually or with a script), download them, and compare them using external comparison tools.
  - For mesh parts, the best strategy is to take unique mesh IDs and organize them by size to manually identify duplicates.
  - Instead of using separate textures for different colors, upload a single texture and use the `Class.SurfaceAppearance.Color` property to apply various tints to it.
- **Import assets in map separately** - Instead of importing an entire map at once, import and reconstruct assets in the map individually and reconstruct them. The 3D importer doesn't do any de-duplication of meshes, so if you were to import a large map with a lot of separate floor tiles, each of those tiles would be imported as a separate asset (even if they are duplicates). This can lead to performance and memory issues down the line, as each mesh is treated as individually and takes up memory and draw calls.
- **Limit the pixels of images** to no more than the necessary amount. Unless an image is occupying a large amount of physical space on the screen, it usually needs at most 512x512 pixels. Most minor images should be smaller than 256x256 pixels.
- **Use trim sheets** to ensure maximum texture reuse in 3D maps. For steps and examples on how to create trim sheets, see [Create trim sheets](../resources/beyond-the-dark/building-architecture.md#create-trim-sheets).

  You might also consider using sprite sheets to load many smaller UI images as a single image. You can then use `Class.ImageLabel.ImageRectOffset` and `Class.ImageLabel.ImageRectSize` to display portions of the sheet.

## Load times

Many experiences implement custom loading screens and use the `Class.ContentProvider:PreloadAsync()` method to request assets so that images, sounds, and meshes are downloaded in the background.

The advantage of this approach is that it lets you ensure important parts of your experience are fully loaded without pop-in. However, a common mistake is overutilizing this method to preload more assets than are actually required.

An example of a bad practice is loading the entire `Class.Workspace`. While this might prevent texture pop-in, it significantly increases load times.

Another similar practice is utilising `Class.ContentProvider.RequestQueueSize` to ensure that all requested assets have finished loading. However, this presents the same issue of significantly increased load times, while also being an unreliable method due to its fluctuating nature.

Instead, only use `Class.ContentProvider:PreloadAsync()` in necessary situations, which include:

- Images in the loading screen.
- Important images in your experience menu, such as button backgrounds and icons.
- Important assets in the starting or spawning area.

If you must load a large number of assets, we recommend you provide a **Skip Loading** button.
