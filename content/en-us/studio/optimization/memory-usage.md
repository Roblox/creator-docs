---
title: Memory usage
description: Use Memory and Luau Heap tools within the Developer Console to monitor the memory usage of your experience.
---

import OpeningSteps from '../../includes/developer-console/opening-developer-console.md'

Every building and scripting component that you add to your experience consumes memory. When memory usage reaches engine limits, the user's device or server may crash, so you need to actively monitor usage.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/x1JgsC8c8VQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><br />

The **Developer Console** provides two tools for monitoring memory usage:

- [Memory](#memory) — View real-time memory consumption by usage categories, including your custom components and the engine internal processes.

- [Luau heap](#luau-heap) — Create snapshots of heap memory, which refers to the memory allocation of your scripts. This tool provides several views to help you identify current memory allocation and issues from different perspectives, such as object types and engine classes. It also allows you to create multiple snapshots to compare differences in memory usage over time.

<OpeningSteps components={props.components}/>

## Memory

The **Memory** tool categorizes and displays real-time memory usage. It displays memory usage in MB of each category and generates a chart on usage change over time.

To view memory allocation:

1. Open the **Developer Console**.
1. Expand the tools dropdown to select **Memory**.

   <img src="../../assets/studio/console/Memory-Open.png" width="200" alt="Dropdown menu of all Developer Console tools with the Memory option highlighted for selection." />

1. Expand the client-server dropdown to select **Client** or **Server**.
1. Browse the memory usage categories and items. If you want to see usage over time, expand the category to display a chart.

   - **CoreMemory** — Memory usage by the core building processes of the engine, including networking, avatars, and GUI elements that you don't have direct control over.
   - **PlaceMemory** — Memory usage based on how you build your experience, including models, terrain, parts, scripts, and all other custom elements that you add to your experience.

     <BaseAccordion>
     <AccordionSummary>
     <Typography variant="h6">PlaceMemory reference</Typography>
     </AccordionSummary>
     <AccordionDetails>
     <table size="small">
     <thead>
       <tr>
       <th>Category</th>
       <th>Description</th>
       </tr>
     </thead>
     <tbody>
     <tr>
       <td>**HttpCache**</td>
       <td>Assets (images, meshes, etc.) loaded from Roblox servers and now held in a cache in memory.</td>
     </tr>
     <tr>
       <td>**Instances**</td>
       <td>`Class.Instance|Instances` in the place.</td>
     </tr>
     <tr>
       <td>**Signals**</td>
       <td>Signals that fire between instances (an event firing on one instance to trigger an event on another instance).</td>
     </tr>
     <tr>
       <td>**LuaHeap**</td>
       <td>Heap memory for both core scripts (scripts that ship with the Roblox client) and custom scripts.</td>
     </tr>
     <tr>
       <td>**Script**</td>
       <td>Luau scripts.</td>
     </tr>
     <tr>
       <td>**PhysicsCollision**</td>
       <td>Collision data for physics simulations.</td>
     </tr>
     <tr>
       <td>**PhysicsParts**</td>
       <td>Physics geometry and kinetics.</td>
     </tr>
     <tr>
       <td>**GraphicsSolidModels**</td>
       <td>Graphics data to render solid models.</td>
     </tr>
     <tr>
       <td>**GraphicsMeshParts**</td>
       <td>Graphics for `Class.MeshPart` objects.</td>
     </tr>
     <tr>
       <td>**GraphicsParticles**</td>
       <td>Graphics for particle systems.</td>
     </tr>
     <tr>
       <td>**GraphicsParts**</td>
       <td>Graphics for parts.</td>
     </tr>
     <tr>
       <td>**GraphicsSpatialHash**</td>
       <td>General rendering.</td>
     </tr>
     <tr>
       <td>**GraphicsTerrain**</td>
       <td>Graphics for terrain.</td>
     </tr>
     <tr>
       <td>**GraphicsTexture**</td>
       <td>Texture memory.</td>
     </tr>
     <tr>
       <td>**GraphicsTextureCharacter**</td>
       <td>Texture memory for characters.</td>
     </tr>
     <tr>
       <td>**Sounds**</td>
       <td>In-memory sounds.</td>
     </tr>
     <tr>
       <td>**StreamingSounds**</td>
       <td>Streaming sounds.</td>
     </tr>
     <tr>
       <td>**TerrainVoxels**</td>
       <td>Terrain voxels.</td>
     </tr>
     <tr>
       <td>**TerrainPhysics**</td>
       <td>Terrain physics.</td>
     </tr>
     <tr>
       <td>**Gui**</td>
       <td>Memory used by common GUI elements.</td>
     </tr>
     <tr>
       <td>**Animation**</td>
       <td>Memory used for animation data, such as poses and `Class.KeyframeSequence` cached data for avatar animations.</td>
     </tr>
     <tr>
       <td>**Navigation**</td>
       <td>Memory used by supporting structures for `Class.PathfindingService`.</td>
     </tr>
     </tbody>
     </table>
     </AccordionDetails>
     </BaseAccordion>

   - **UntrackedMemory** — Memory allocations that the system can't easily attribute to a particular source.
   - **PlaceScriptMemory** — Memory usage of your scripts with insights into how individual scripts and custom memory tags contribute to overall memory usage.
   - **CoreScriptMemory** — Memory usage by internal engine scripts that you don't have direct control over.

   Among these categories, **PlaceMemory** and **PlaceScriptMemory** are the most important ones for performance optimization, because they help you understand how your building and scripting choices affect memory consumption and potential areas for optimization. For more insights into **PlaceScriptMemory**, use the [Luau heap](#luau-heap) tool to create snapshots and analyze memory allocation by different metrics.

<Alert severity="info">
For more information on common memory usage problems and best practices, see [Performance Optimization](../../performance-optimization/improve.md#memory-usage).
</Alert>

## Luau heap

The **Luau heap** tool allows you to create snapshots of the current allocation of heap memory, which refers to the memory Luau scripts use to store variables, tables, functions, and other runtime data structures. This tool provides several views to help you identify issues from different perspectives, such as object types and engine classes. It also allows you to create multiple snapshots to compare differences in memory usage over time.

### Create snapshots

To create a snapshot of your memory allocation:

1. Open the **Developer Console**.
1. Expand the tools dropdown to select **LuauHeap**.

   <img src="../../assets/studio/console/LuauHeap-Open.png" width="200" alt="Dropdown menu of all Developer Console tools with the LuauHeap option highlighted for selection." />

1. Expand the client-server dropdown to select **Client** or **Server**.
1. Click the **Create Snapshot** button.

### Analyze memory usage

The tool provides many views into Luau memory usage:

- **Graph** — Shows an aggregated memory usage tree, with each node representing an object with memory allocated.
- **Object Tags** — Shows memory sizes and counts by runtime types, such as `function`, `table`, and `thread`.
- **Memory Categories** — Shows memory sizes and counts by engine-assigned memory categories. The engine assigns a memory category to an object at allocation time.
- **Object Classes** — Shows memory sizes and counts by engine classes that your scripts use and store their instances, such as `EnumItem`, `Animation`, `CFrame`. Critically, this view does not show memory usage within the engine itself, only the Luau VM.
- **Unique References** and **Unparented Instances** — Shows counts and total numbers of instances for **unique references** or **all remaining references** that don't have a parent in the data model and are only reachable by scripts. Also shows all paths that pin the instance object.

#### Graph

The **Graph** view is the most detailed and complex view among all Luau heap views. It shows an aggregated memory usage tree with each node representing an object with memory allocated. The tree shows how objects connect to each other and derives the shortest path between object references. It has the following columns of memory size:

- Size — The self memory usage plus the memory usage by contents within the data structure.
- Self — The memory directly allocated for the data structure itself, excluding the memory usage by any content it contains.

<Alert severity="info">
The graph view displays elements smaller than 2 KB as a single `…` node.
</Alert>

<img src="../../assets/studio/console/Graph-View.jpeg" width="800" alt="An example Graph view" />

The root of the tree graph is `registry`, which stores all engine and Luau references, such as functions connected to signals or the task library, tables returned by module scripts, and global functions, tables and classes. It usually parents the following common entries:

- `Module @Path.To.Module` is the table returned by a module script.
- `name:123 =Path.To.Module` is a function inside a specified script. Anonymous functions don't have names. The top level node often refers to the global script function. Example: `:1= Workspace.[Username].Animate`.
- `upvalue` is a reference for captured functions. See [Capture local scope](../../luau/scope.md#capture) for more information.
- `env` refers to the environment of a function. For most cases, it's a table representing the global scope of a script.
- `globals` refers to the environment of a thread.
- `[key]` represents objects that serve as table keys.
- `array` represents an array.
- `stack` refers to the array that stores all function locals.
- `constants` represents all constant values that functions use.

#### Memory categories

The **Memory Categories** view shows memory sizes and counts by memory categories, which the engine assigns to objects at allocation time. By default, the memory category has the same name as the script, or you can assign custom memory category names using the `debug.setmemorycategory` function.

#### Unique references and unparented instances

The **Unique References** and **Unparented Instances** views are related. Both show memory usage of instances that don't have a parent in the data model and are only reachable by scripts, along with all paths that pin the instance object. If an instance is only referenced within Luau scripts, it appears under **Unique References**. Otherwise, it's also in use by Roblox systems and appears under **Unparented Instances**. Both views show two metrics:

- **Count** — The number of instances with the same name that are reachable from the same path, such as multiple instances named `Dragon` in the same table.
- **Total Instances** — The total number of objects inside those roots, such as all parts, scripts, and sound objects that construct a `Dragon` instance.

<img src="../../assets/studio/console/Unique-Reference-View.jpeg" width="800" alt="An example Unique Reference view" />

These views are useful for identifying unnecessary connected instances, which you need to disconnect when you no longer need them. If you see many unexpected instances in this view, check out the paths holding them and evaluate whether they are necessary.
