---
title: Roblox for Unity Developers
description: If you're an experienced Unity developer, use this page to get oriented with Roblox.
comments: This document could use more information (and some links) around replication, remote events, and cloud services.
---

import ScriptTypes from './includes/engine-comparisons/script-types.md'
import CodeSample from './includes/engine-comparisons/fishing-pole-code-sample.md'
import ScriptLocations from './includes/engine-comparisons/script-locations.md'
import Collaboration from './includes/engine-comparisons/collaboration.md'
import Transforms from './includes/engine-comparisons/transforms.md'

This page includes information to help experienced Unity developers get started with Roblox: basic orientation, a conceptual comparison, and key differences between the two platforms.

## Getting Oriented

![The Unity user interface with markup to show the various windows and panels.](./assets/engine-comparisons/unity-editor.jpg)

![The Roblox Studio user interface with markup to show the various windows and panels.](./assets/engine-comparisons/roblox-studio-markup.png)

Unity's Hierarchy window and Roblox Studio's [Explorer](studio/explorer.md) are the primary windows for organizing elements in 3D scenes:

- Both allow you to manage and organize objects (for example, characters and environmental assets).
- Both use a tree structure for the parent-child relationships between objects.

However, the Hierarchy window has no predefined structure, whereas the Explorer window has a strict structure. It might help to think of the Explorer window as a combination of Unity's Hierarchy and Project windows, with the Workspace folder as the most recognizable element.

Similarly, the Roblox Studio [Asset Manager](projects/assets/manager.md) and [Toolbox](projects/assets/toolbox.md) overlap with the Unity Project window. The Asset Manager lets you manage all assets within your experience, whereas the Toolbox lets you access any assets you've published. The Toolbox also lets you search the Creator Store for assets from Roblox or the community, similar to the Unity Asset Store.

## Philosophical Differences

Roblox is a "simulation engine" rather than a traditional game engine. Unity `GameObjects` and Roblox `Class.Part|Parts` both serve as the fundamental building blocks for creating objects in a 3D environment, but in practice, the two are quite different:

- **Representation**: `GameObjects` in Unity are a higher-level concept for any object in a scene, whereas `Parts` in Roblox are designed to represent physical objects like wooden blocks and plastic spheres, rather than abstract geometry like primitive objects in Unity.
- **Physics**: To perform physics simulations in Unity, you attach components like `Rigidbody` and `Collider` to a `GameObject`. In Roblox, physics are built into the `Parts` data type; the engine handles interactions automatically.

You can see the difference immediately if you create a `GameObject` and a `Part`. The `GameObject` has nothing more than a position, rotation, and scale. The `Part` has that same information—plus a material and color, values for reflectance and transparency, mass and shape, and much more. Turning a `Part` into something more akin to an empty `GameObject` means _removing_ a lot of built-in properties. Conversely, you can make a `GameObject` that looks a lot like a `Part` by adding `MeshFilter`, `MeshRenderer`, `Collider`, and `Rigidbody` components to it.

From a scripting perspective, `GameObject` is most similar to the Roblox `Class.Instance`, the base class for all other Roblox classes, but because you don't (and can't) create objects of type `Instance`, the comparison isn't especially practical.

Another comparison is the Unity `GameObject` to the Roblox `Class.Model`. Models act as a container for a collection of interconnected parts in the same way that you might establish a parent-child relationship between many `GameObjects` in Unity. You specify one of the model's parts as its [primary part](parts/models.md#setting-a-primary-part) to define the pivot point. Models also hold scripts, animations, sound effects, prompts, constraints, particle emitters, and more.

For example, a Unity `GameObject` might have components for `ParticleSystem`, `Physics3D`, `SpringConstraint`, and a script. In the Hierarchy window, you see a single `GameObject` named `SpringyFireball`. The Inspector window shows the collection of components and properties.

In Roblox, a comparable `SpringyFireball` model in the Explorer window might look something like this:

```text
Model
|- ParticleEmitter
|- MeshPart
|- SpringConstraint
|- ClickDetector
|  |- Script
```

Roblox's physics-by-default philosophy extends to the process of building 3D models. In Roblox, welding multiple parts together into an [assembly](physics/assemblies.md) is an excellent way to quickly build things, because Roblox treats the welded parts as a single rigid body. This approach isn't available in Unity.

## Location Matters

<ScriptLocations components={props.components} />

## Scripting

<ScriptTypes components={props.components} />

Unity doesn't have the concept of different script types. If you choose to make a multiplayer game, Unity uses its networking libraries to indicate when a `GameObject` (and its scripts) should be exclusive to the server.

In Unity, much of the engine's functionality is available through the methods of `MonoBehaviour`. For example, to run code before the render loop, you add code to the `Update()` method. To handle physics collision events, you add code to the `OnCollideEnter()` method.

Roblox scripts are more event-driven. You access similar functionality by subscribing to services and listening for updates.

### C# and Luau

For scripting, Unity uses C#. Roblox uses [Luau](luau/index.md), a scripting language derived from [Lua 5.1](https://www.lua.org/manual/5.1/).

Compared to C#, Luau is gradually typed and generally has a less verbose syntax. In larger projects, however, gradual typing can introduce categories of bugs that strongly typed languages like C# avoid, so consider enabling [strict type checking](luau/type-checking.md#inference-modes) in Roblox scripts.

For basic syntax differences between the scripting languages, see [Luau and C# Comparison](luau/luau-csharp-comparison.md).

### Luau Code Sample

<CodeSample components={props.components} />

The Roblox script can be relatively concise because Roblox has many built-in assumptions: a `Class.Player` with a `Class.Humanoid` character connected to the server and can equip `Class.Tool|Tools`. These assumptions don't exist in Unity, so the implementation would be very different.

## Assets

Unity and Roblox both support importing custom meshes and models in `.fbx` format. Certain types of assets may require specific configurations and export settings from your third-party modeling software. For more information, see the following pages:

- [3D Importer](art/modeling/3d-importer.md)
- [General Specifications](art/modeling/specifications.md)
- [Blender and Maya Export Requirements](art/modeling/export-requirements.md)

In Unity, objects import into your `Assets` directory, visible in the Project window. In Roblox, assets import into your Workspace and into the [Toolbox](projects/assets/toolbox.md) or **Inventory** section of the [Asset Manager](projects/assets/manager.md).

Roblox also offers an open-source [Blender plugin](art/modeling/roblox-blender-plugin) to streamline the import process.

## Transforms

<Transforms engine="Unity" components={props.components} />

## Collaboration

In Unity, you collaborate with standard version control systems or paid services like Unity Version Control.

<Collaboration package="Unity prefabs" components={props.components} />

## Plugins

Similar to Unity tools, Roblox Studio supports [plugins](studio/plugins.md), which can simplify or give you additional control over various aspects of the development process. Plugins are available in the Creator Store, just like assets, many for free.

## Glossary

| Unity | Roblox | Notes |
| :--- | :--- | :--- |
| Scene | [Place](projects.md#places) | |
| GameObject | `Class.Part` or `Class.Model` | See [Philosophical Differences](#philosophical-differences). |
| Prefab | [Package](projects/assets/packages.md) | |
| Transform | `Datatype.CFrame` | `CFrame` doesn't include scale information. See [Transforms](#transforms). |
| Hierarchy window | Explorer window | |
| Inspector | Properties window |
| Scene view | Viewport | |
| Game view | Viewport | The Viewport transitions into a gameplay view when you test your experience. |
| Project window | [Asset Manager](projects/assets/manager.md) or [Toolbox](projects/assets/toolbox.md) | |
| Terrain Inspector | Terrain Editor | |
| Spawn point | `Class.SpawnLocation` | |
| Console | Output | |
| Asset Store | [Creator Store](production/publishing/creator-store.md) | |
| Overlays | Menu bar | |
| Tool | [Plugin](studio/plugins.md) | |
