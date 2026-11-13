---
title: Onboarding for developers
description: What engineers new to Roblox need to know first, including the data model, scripting, replication, streaming, data stores, and performance.
---

This page covers the Roblox fundamentals that engineers coming from other engines most often need in their first weeks. Each section explains the core idea and links to the detailed guide.

## Common terms

- **Game:** A collection of places that players join through the game's **start place**. Data stores, secrets, analytics, and in-game purchases are all scoped to the game, which you might also see called an experience or a universe.
- **Place:** A scene or zone within a game, with its own data model. Each server runs one place, and moving players between places requires a [teleport](../projects/teleport.md).
- **Instance:** A node in the data model, with properties, methods, and events. `Class.Part|Parts` and `Class.Model|Models` are the most common instances for building physical objects.
- **Asset:** Uploaded content with a globally unique asset ID, such as an image, mesh, sound, or animation. Some asset types, like models and animations, can be updated in place, while others, like images and sounds, require uploading a new asset.
- **Script:** Code stored as an instance in the data model. Copying a script makes a full, independent copy, not a reference to a source file.

For more on how games and places relate, see [Games and places](../production/publishing/publish-games-and-places.md).

## Data model structure

The [data model](../projects/data-model.md) is the tree of instances that makes up a place. Its top-level services each have a specific purpose and replication behavior:

<table>
  <thead>
    <tr>
      <th>Service</th>
      <th>What belongs there</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Class.Workspace`</td>
      <td>The single 3D world of the place. When you edit it in Studio, you edit the server's view of the world, and part of it replicates to each client.</td>
    </tr>
    <tr>
      <td>`Class.ReplicatedStorage`</td>
      <td>Modules, client code, effects, and other instances that both the client and server need at all times.</td>
    </tr>
    <tr>
      <td>`Class.ReplicatedFirst`</td>
      <td>Content that replicates to clients before anything else, usually loading screens.</td>
    </tr>
    <tr>
      <td>`Class.ServerStorage`</td>
      <td>Server-only instances that clients don't need constant access to, such as maps that you swap in and out of the workspace.</td>
    </tr>
    <tr>
      <td>`Class.ServerScriptService`</td>
      <td>Server-only scripts and modules.</td>
    </tr>
    <tr>
      <td>`Class.StarterGui`</td>
      <td>`Class.ScreenGui|ScreenGuis` and other UI that copies to each player.</td>
    </tr>
    <tr>
      <td>`Class.StarterPlayer`</td>
      <td>Scripts and settings for players and characters, although larger projects usually keep code in `Class.ReplicatedStorage` instead.</td>
    </tr>
  </tbody>
</table>

<img src="../assets/scripting/client-server/Data-Model-Mapping.png" alt="The editing data model next to the runtime data model, showing how StarterGui, StarterPack, StarterCharacterScripts, and StarterPlayerScripts copy into each player and character at runtime." />

The hierarchy in the **Explorer** is mostly organizational:

- Parts use world-space transforms, not transforms relative to their parent. To attach parts to each other, use constraints, most commonly a `Class.WeldConstraint`. For details, see [Mechanical constraints](../physics/mechanical-constraints.md).
- `Class.Attachment|Attachments` are an exception, because they position relative to their parent part.
- `Class.Model|Models` use their `Class.Model.PrimaryPart|PrimaryPart` as the reference point for moving and pivoting the whole model.

## Scripting model

In most cases, you only need two kinds of scripts:

- A `Class.Script` with its `Class.BaseScript.RunContext|RunContext` set to `Enum.RunContext|Server` or `Enum.RunContext|Client`.
- A `Class.ModuleScript`, which returns a value that other scripts load with `require()`. Use modules for shared libraries, functions, and data.

Avoid the `Legacy` run context and `Class.LocalScript|LocalScripts`. Their behavior depends on where they're placed, which makes code harder to organize. For recommended locations, see [Script types and locations](../scripting/locations.md).

Server scripts never replicate to clients. Modules replicate to clients when they're in a container that clients can access, like `Class.ReplicatedStorage`. Keep server-only modules in `Class.ServerScriptService` or `Class.ServerStorage`.

## Networking and replication

Roblox uses a [client-server model](../projects/client-server.md):

- Changes the server makes to instances, including properties, attributes, and tags, replicate to clients automatically.
- Changes a client makes don't replicate to the server, with a few exceptions. The main exceptions are physics for parts the client [owns](../physics/network-ownership.md), such as its own character, and input from the [input action system](../input/input-action-system.md).
- The engine distributes physics simulation between the server and clients. Clients simulate the parts they own and send positions and velocities to the server.

To communicate between the client and server, use [remote events and callbacks](../scripting/events/remote.md):

- `Class.RemoteEvent` and `Class.RemoteFunction` are reliable and ordered.
- `Class.UnreliableRemoteEvent` is unreliable and unordered, for frequent updates where a dropped message doesn't matter.
- Remotes aren't secured by default. Always validate data that the server receives from clients.

<img src="../assets/scripting/client-server/Remote-Flow-Client-Server.png" alt="A diagram of one client communicating with the server." />

### Server authority

For competitive games, [server authority](../projects/server-authority/index.md) makes the server authoritative over physics and gameplay, while clients predict their own characters and nearby physics objects. When a client mispredicts, it rolls back and resimulates.

## Input

Handle input with the [input action system](../input/input-action-system.md). You define actions, like jump or sprint, in `Class.InputContext` instances and bind them to keys, buttons, and touch controls with `Class.InputBinding` instances. When you use server authority, each `Class.InputContext` must be a descendant of a `Class.Player` so that the engine knows which player owns it. One approach is to keep your contexts in `Class.ReplicatedStorage` and clone them to each player from a server script. For details, see [Input actions](../projects/server-authority/index.md#input-actions).

<img src="../assets/studio/explorer/ReplicatedStorage-InputContext.png" width="320" alt="An InputContext instance named PlayContext inside ReplicatedStorage." />

## Streaming

[Instance streaming](../workspace/streaming/index.md) loads parts of the workspace onto each client as players move through the world, which keeps load times and memory low on all devices.

- Instances in `Class.ReplicatedStorage` replicate in full when a player joins, before scripts run, so they're safe to access immediately.
- Instances in the workspace stream in and out. Client code must handle instances that aren't loaded yet.
- Instances connected by constraints stream together to keep physics stable.

Each `Class.Model` has a `Class.Model.ModelStreamingMode|ModelStreamingMode` that controls how it streams:

<table>
  <thead>
    <tr>
      <th>Mode</th>
      <th>Behavior</th>
      <th>Good for</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`Enum.ModelStreamingMode.Default|Default`</td>
      <td>Parts stream individually, so a model can be partly loaded.</td>
      <td>Static environment pieces</td>
    </tr>
    <tr>
      <td>`Enum.ModelStreamingMode.Atomic|Atomic`</td>
      <td>The whole model streams in at once when any of its parts are needed.</td>
      <td>Characters, vehicles, and other discrete, dynamic objects</td>
    </tr>
    <tr>
      <td>`Enum.ModelStreamingMode.Persistent|Persistent`</td>
      <td>Always streamed in, and never streamed out.</td>
      <td>Lobbies, menus, and landmarks that must always be visible</td>
    </tr>
    <tr>
      <td>`Enum.ModelStreamingMode.PersistentPerPlayer|PersistentPerPlayer`</td>
      <td>Persistent for players you add with `Class.Model:AddPersistentPlayer()`, and atomic for everyone else.</td>
      <td>Content that only some players need at all times</td>
    </tr>
  </tbody>
</table>

Assets like textures, meshes, and audio also stream at runtime. Images load at a low resolution first and then improve based on the device and how large they appear on screen.

## Data persistence

`Class.DataStoreService` saves player data across sessions. Its APIs are low level, so read [Data stores](../cloud-services/data-stores/index.md) and [Player data and purchasing](../cloud-services/data-stores/player-data-purchasing.md) before you design your save system. These guides cover common pitfalls like rate limits, session locking, and handling purchases safely.

Data stores are scoped to the game. To keep test data out of production, use a separate game for development. For details, see [Environments](../projects/file-based-workflows.md#environments).

## Solve common tasks

### Reuse behavior across instances

Because copied scripts are independent copies, avoid putting a copy of the same script in every instance that needs it. Instead, tag instances with `Class.CollectionService` and write one script, backed by a `Class.ModuleScript`, that attaches behavior to every tagged instance.

### Use a custom character

Characters can use the platform avatar, the platform rig with a custom look, or an entirely custom rig. To keep the default spawn system but replace the character, place a model named `StarterCharacter` in `Class.StarterPlayer`.

### Override the default control scripts

Roblox adds default camera and control scripts to each player. To replace them:

1. Enable `Class.Workspace.PlayerScriptsUseInputActionSystem`, which moves the default player scripts under `Class.StarterPlayer`.
1. Set `Class.StarterPlayer.CreateDefaultPlayerModule` to `false` so that the default camera and control scripts aren't added.
1. Add your own camera and control scripts.

### Create shader-like effects

Roblox doesn't support custom shaders. Instead:

- Use `Class.SurfaceAppearance` or `Class.MaterialVariant` for [PBR materials](../art/modeling/surface-appearance.md).
- Use `Class.SurfaceAppearance` or the `Enum.Material.Neon|Neon` material for emissive surfaces.
- Use the `Enum.Material.ForceField|ForceField` material for intersection effects.
- For special cases, generate dynamic textures and geometry with `Class.EditableImage` and `Class.EditableMesh`.

## Performance

Performance on Roblox depends mostly on the content you add and the time your scripts take each frame. Test regularly on your target hardware, and set budgets early for scene complexity (triangles, draw calls, and dynamic lights), physics, replication, and script time per frame. Most performance problems come from content that's configured incorrectly, and fixing them late often means reworking assets.

- **Automatic quality:** Most players use automatic graphics quality, which has 10 levels. As the level drops to keep frame rates up, the engine lowers render distance, geometry quality such as level of detail and SLIM, shading quality, lighting quality, shadows, particle emission, and streaming radius. Draw distance never drops below 500 studs, shadows turn off below level 4, and terrain water and beams look the same at every level. Roblox tunes these values continually, so don't design around exact numbers. To preview, change **Editor Quality Level** in Studio settings, and test at both the lowest and highest levels. For details, see [Graphics quality levels](../performance-optimization/design.md#graphics-quality-levels).
- **Texture streaming:** Textures stream and scale automatically to fit memory budgets and on-screen size.
- **Occlusion culling:** The engine automatically skips draw calls for parts, meshes, and terrain hidden behind other objects. Structuring levels with walls and other view blockers lets you manage scene complexity. Simple hidden block parts inside walls make occlusion tests cheaper than relying on detailed meshes. For more ways to reduce draw calls, see [Rendering](../performance-optimization/improve.md#rendering).
- **Scripting:** Luau is fast enough for complex, dynamic gameplay code. You don't need to avoid garbage collection or pool objects, and creating instances at runtime is fast.
- **Lighting:** Scenes can use many lights. Roblox scales lighting quality automatically by device, and falls back to a lower-cost lighting path in complex scenes.

For tools to measure and fix problems, see [Performance optimization](../performance-optimization/index.md).

## Tools and AI

- **External editors:** Use VS Code or another editor with [Script Sync](../scripting/sync.md) or [Rojo](../projects/rojo/index.md). Add the Luau Language Server and the selene linter for type checking and linting. For team setups, see [Compare file-based workflows](../projects/file-based-workflows.md).
- **Studio MCP server:** Most professional developers will want to use their own AI tools and agent harness, like a coding agent in a terminal or editor. The [Studio MCP server](../studio/mcp.md) connects those tools to Studio so they can build and test directly in your open session.
- **Assistant:** [Assistant](../assistant/guide.md) is Studio's built-in AI helper for writing code and building, for when you want AI help without setting up your own tools.
