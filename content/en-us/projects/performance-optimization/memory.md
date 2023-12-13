---
title: Memory Consumption
description: Explains performance issues caused by memory consumption and best practices to prevent them.
---

Memory performance issues describe a broad category of problems with the common
symptom of excessive memory consumption on either the server or the client.

High levels of memory consumption is generally not a problem as long as the
device or server has memory available, but when Roblox requires more memory than
is available the device or server can crash.

On client devices, the amount of memory available varies significantly. For
mobile devices, client memory usage is particularly important, because mobile
devices typically have less available memory.

Additionally, memory consumption can grow over the lifetime of a client session
or server as some allocated memory fails to get caught by the garbage collector.
This phenomenon is known as a _memory leak_ and memory leaks can be created and
accelerated by the code in your experience.

This guide covers common memory consumption pitfalls that you can avoid during
the creation process as well as troubleshooting tips for post-creation
improvements.

## Memory Limits

The amount of available memory varies significantly across devices, and the appropriate level of memory for an experience to consume varies depending on the type of experience.

- **Server**: Currently Roblox servers have ~6GB of memory available each. If this amount is exceeded the server will crash and players will be disconnected and have to rejoin.
- **Client**: The amount of memory available varies enormously on the device type and age. Additionally, Roblox does not have access to all of a device's memory as the device also needs to run the operating system and other applications.

## Identifying Issues

There are several ways to identify memory usage for an experience:

 1. Open the [Developer Console](../../studio/developer-console.md) and switch to the Memory tab. This tab gives a break down of how memory is being allocated. It's recommended you do this in the client rather than Studio to get the most accurate readouts.
 2. Enable the **Performance Stats** view from the settings menu in the client to see total client memory usage over-layed on the screen.
 3. Check the [Performance Dashboard](../../production/analytics/performance.md) for average memory usage across all clients & servers in your experience. This dashboard also provides client crash rates.

High memory usage in itself is not necessarily indicative of a problem, but some indications that you may need to investigate more are:

- A significant percentage of client crashes showing in the **Performance Dashboard**, particularly a sudden uptick that coincides with an update. Some degree of crashes are expected but you should investigate if your crash rates increase above 2-3%.
- A crash occurs while testing on a device that you want your experience to support.
- Your server memory usage exceeds 3GB.
<Alert severity="info"> The current maximum memory available to servers is 6.9GB. </Alert>

There are no hard and fast values for what memory numbers are good or bad. It depends on the context of your experience and device. We recommended you identify a target device that you want to support and test with this device to determine if you have an issue.

## Instance Streaming

The highest impact lever available to creators to improve client memory usage is to enable [Instance Streaming](../../workspace/streaming.md).

Instance Streaming selectively loads out parts of the data model that are not required, which can lead to considerably reduced low time and increase the client's ability to prevent crashes when it comes under memory pressure.

If you are encountering memory issues and have Instance Streaming turned _off_,
consider updating your experience to support it, particularly if your 3D world is
large. Instance Streaming is based on distance in 3D space, so larger worlds
naturally benefit more from it.

If Instance Streaming _is_ enabled, you can increase the aggressiveness of it. For example:

- Reducing use the persistent **StreamingIntegrity**.
- Reducing the **streaming radius**.
   For more information on streaming options and their benefits, see [Streaming Properties](../../workspace/streaming.md#streaming-properties).

## Common Problems

The following sections describe problems and best practices for common categories of performance issues.

### Graphics Texture Consumption

A significant portion of an experience's memory consumption on the client are
from assets, such as images and meshes, loaded into graphics memory so they can
be rendered.

In the **Developer console**, you can view the graphics memory consumed by assets under the following labels:

- **GraphicsMeshParts**: Graphics memory consumed by meshes.
- **GraphicsTexture**: Graphics memory consumed by textures.

<h4>Common Problems</h4>

- **Asset Duplication**: A common mistake is to upload the same asset multiple times resulting in different asset IDs. This can lead to the same content being loaded into memory multiple times.
- **Excessive asset volume**: Even when assets are not identical, there are cases when opportunities to reuse the same asset and save memory are missed.
- **High resolution textures**: Graphics memory consumption for a texture is unrelated to the size of the texture on the disk, but rather the number of pixels in the texture.
  - For example, a 1024x1024 texture consumes four times more graphics memory than a 512 x 512 texture.
  - Images uploaded to Roblox are transcoded to a fixed format so there is no memory benefit to uploading images in a color model associated with fewer bytes per pixel. Though the engine automatically downscales texture resolution on some devices, the extent of the downscale depends on the device characteristics and excessive texture resolution can still cause problems.
  - You can identify the graphics memory consumption for a given texture by expanding the **GraphicsTexture** category in the **Developer Console**.

<h4>How to Mitigate</h4>

To avoid unnecessary duplication of assets:

- **Only upload duplicate assets once** - Reuse the same asset ID across objects and ensure the same assets, especially meshes and images, aren't uploaded separately multiple times.
- **Find and fix duplicate assets** - Look for identical mesh parts and textures that are uploaded multiple times with different IDs.
  - Though there is no API to detect similarity of assets automatically, you can collect all the image asset IDs in your place (either manually or with a script), download them, and compare them using external comparison tools.
  - For mesh parts, the best strategy is to take unique mesh IDs and organize them by size to manually identify duplicates.
- **Importing assets in map separately** - Instead of importing an entire map at once, import and reconstruct assets in the map individually and reconstruct them. The 3D importer doesn't do any de-duplication of meshes, so if you were to import a large map with a lot of separate floor tiles, each of those tiles would be imported as a separate asset (even if they are duplicates). This can lead to performance and memory issues down the line, as each mesh is treated as individually and takes up memory and draw calls.
- **Limit the pixels of images** to no more than the necessary amount. Unless an image is occupying a large amount of physical space on the screen, it usually needs at most 512x512 pixels. Most minor images should be smaller than 256x256 pixels.
- **Use Trim Sheets** to ensure maximum texture reuse in 3D maps. For steps and examples on how to create trim sheets, see [Creating Trim Sheets](../../resources/beyond-the-dark/building-architecture.md#creating-trim-sheets).

### Memory Leaks in Scripts

Memory leaks can occur when you write scripts that consume memory that the
garbage collector can't properly release when its no longer in use. Leaks are
specifically pervasive on the server, because they can continuously be online
for many days whereas a client session is much shorter.

The following memory values in the **Developer console** can indicate a problem requiring closer attention.

- **LuaHeap**: High or growing consumption suggests a memory leak.
- **InstanceCount**: Consistently growing numbers of instances suggest references to some instances in your code are not being garbage collected.
- **PlaceScriptMemory**: Provides a script by script breakdown of memory usage.

<h4>Common Problems</h4>

- **Leaving connections connected**: The engine never garbage collects events connected to an instance and any values referenced inside the connected callback. Therefore, active connections of events and code inside the connected instances, connected functions, and referenced values, are out of scope for the memory garbage collector, even after the events are fired.

  Although events are disconnected when the instance they belong to is
  destroyed, a common mistake is to assume this applies to `Class.Player`
  objects. After a user leaves an experience, the engine doesn't automatically
  destroy their representative `Class.Player` object and character model, so
  connections to the `Class.Player` object and instances under the character
  model, such as `Player.CharacterAdded`, still consume memory if you don't
  disconnect them in your scripts. This can result in very significant memory
  leaks over time on the server as hundreds of users join and leave the
  experience.

- **Tables**: Inserting objects into tables but not removing them when they are
  no longer needed causes unnecessary memory consumption, especially for tables
  that track user data when they join. For example, the following code sample creates a table adding user information each time a user joins:

   ```lua title="Example"
   local playerInfo = {}
   Players.PlayerAdded:Connect(function(player)
	   playerInfo[player] = {} -- some info
   end)
   ```

   If you don't remove these entries when they are no longer needed, the table continues to grow in size and consumes more memory as more users join the session. Any code that iterates over this table also becomes more computationally expensive as the table grows in size.

<h4>How to Mitigate</h4>

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
         task.wait()
         character:Destroy()
     end)
   end)

   Players.PlayerRemoving:Connect(function(player)
	   task.wait()      
	   player:Destroy()
   end)
   ```

### Overly Precise Collision Detection

Physics movement and collision detection consumes memory. Mesh parts have a [collision fidelity](../../workspace/collisions.md) property that determines the approach that's used to evaluate the collision bounds of the mesh.

<h4>Common Problem</h4>

The default and precise collision detection modes significantly consumes more memory than the two other modes with lower fidelity collision shapes.

If you see high levels of memory consumption under **PhysicsParts**, you might need to explore reducing the collision fidelity of parts in your experience.

<h4>How to Mitigate</h4>

To reduce memory used for collision fidelity:

- Reduce the number of unique meshes.
- For parts that do not need collisions, disable their collisions using by setting `CanCollide`, `CanTouch` and `CanQuery` to false.
- Reduce fidelity of collisions, using the `Class.MeshPart.CollisionFidelity` setting. `Box` has the lowest memory overhead, and `Default` and `Precise` are generally more expensive.
  - It's generally safe to set any small anchored part's collision fidelity to `Box`
  - For very complex large meshes, you may want to build your own collision mesh out of smaller objects with box collision fidelity

You can visualize the collision mesh in your environment by rendered collision
meshes using **Show Decomposition Geometry** in Studio settings.
