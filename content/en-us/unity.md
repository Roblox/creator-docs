---
title: Roblox for Unity developers
description: If you're an experienced Unity developer, use this page to get oriented with Roblox.
---

import ScriptTypes from './includes/engine-comparisons/script-types.md'
import CodeSample from './includes/engine-comparisons/fishing-pole-code-sample.md'
import ScriptLocations from './includes/engine-comparisons/script-locations.md'
import Transforms from './includes/engine-comparisons/transforms.md'

This page contains information to help experienced Unity developers get started with Roblox, including basic orientation, a conceptual comparison, and key differences between the two platforms.

## Get oriented

<img src="./assets/engine-comparisons/Unity-Editor-Layout.png" alt="The Unity user interface with markup to show the various windows and panels." />

<img src="./assets/studio/general/Studio-Layout.png" alt="The Roblox Studio user interface with markup to show the various windows and panels." />

Unity's **Hierarchy** window and Roblox Studio's [Explorer](studio/explorer.md) are the primary windows for organizing elements in 3D scenes:

- Both allow you to manage and organize objects (for example, characters and environmental assets).
- Both use a tree structure for the parent-child relationships between objects.

However, the **Hierarchy** window has no predefined structure, whereas the **Explorer** window has a strict structure. It might help to think of the **Explorer** window as a combination of Unity's **Hierarchy** and **Project** windows, with the `Class.Workspace` folder as the most recognizable element.

Similarly, the Roblox Studio [Asset Manager](projects/assets/manager.md) and [Toolbox](projects/assets/toolbox.md) overlap with the Unity **Project** window. The **Asset Manager** lets you manage all assets within your experience, whereas the **Toolbox** lets you access any assets you've published. The **Toolbox** also lets you search the [Creator Store](production/creator-store.md) for assets from Roblox or the community, similar to the Unity **Asset Store**.

## Philosophical differences

Roblox is a "simulation engine" rather than a traditional game engine. Unity `GameObjects` and Roblox `Class.Part|Parts` both serve as the fundamental building blocks for creating objects in a 3D environment, but in practice, the two are quite different:

- **Representation**: `GameObjects` in Unity are a higher-level concept for any object in a scene, whereas `Parts` in Roblox are designed to represent physical objects like wooden blocks and plastic spheres, rather than abstract geometry like primitive objects in Unity.
- **Physics**: To perform physics simulations in Unity, you attach components like `Rigidbody` and `Collider` to a `GameObject`. In Roblox, physics are built into the `Parts` data type; the engine handles interactions automatically.

You can see the difference immediately if you create a `GameObject` and a `Part`. The `GameObject` has nothing more than a position, rotation, and scale. The `Part` has that same information—plus a material and color, values for reflectance and transparency, mass and shape, and much more. Turning a `Part` into something more akin to an empty `GameObject` means **removing** a lot of built-in properties. Conversely, you can make a `GameObject` that looks a lot like a `Part` by adding `MeshFilter`, `MeshRenderer`, `Collider`, and `Rigidbody` components to it.

From a scripting perspective, `GameObject` is most similar to the Roblox `Class.Instance`, the base class for all other Roblox classes, but because you don't (and can't) create objects of type `Instance`, the comparison isn't especially practical.

Another comparison is the Unity `GameObject` to the Roblox `Class.Model`. Models act as a container for a collection of interconnected parts in the same way that you might establish a parent-child relationship between many `GameObjects` in Unity. You specify one of the model's parts as its [primary part](parts/models.md#set-a-primary-part) to define the pivot point. Models also hold scripts, animations, sound effects, prompts, constraints, particle emitters, and more.

For example, a Unity `GameObject` might have components for `ParticleSystem`, `Physics3D`, `SpringConstraint`, and a script. In the Hierarchy window, you see a single `GameObject` named `SpringyFireball`. The Inspector window shows the collection of components and properties.

In Roblox, a comparable `SpringyFireball` model in the **Explorer** window might look something like this:

```text
Model
|- ParticleEmitter
|- MeshPart
|- SpringConstraint
|- ClickDetector
|  |- Script
```

Roblox's physics-by-default philosophy extends to the process of building 3D models. In Roblox, welding multiple parts together into an [assembly](physics/assemblies.md) is an excellent way to quickly build things, because Roblox treats the welded parts as a single rigid body. This approach isn't available in Unity.

Rather than using standard metric units for length and mass, Roblox uses notional units called studs and Roblox Mass Units (RMUs). For approximate metric conversions and recommendations around use, see [Units](physics/units.md).

## Location matters

Roblox experiences are multiplayer by default, so Roblox Studio includes many different storage locations with specific behaviors. For example, a script might run when you put it in `Class.ReplicatedStorage`, but not when you put it into `Class.StarterPlayerScripts`. For more information, see [Client-server runtime](projects/client-server) and [Object organization](projects/data-model#object-organization).

<ScriptLocations components={props.components} />

## Scripting

<ScriptTypes components={props.components} />

Unity doesn't have the concept of different script types. If you choose to make a multiplayer game, Unity uses its networking libraries to indicate when a `GameObject` (and its scripts) should be exclusive to the server.

In Unity, much of the engine's functionality is available through the methods of `MonoBehaviour`. For example, to run code before the render loop, you add code to the `Update()` method. To handle physics collision events, you add code to the `OnCollideEnter()` method.

Roblox scripts are more event-driven. You access similar functionality by subscribing to services and listening for updates.

### C# and Luau

For scripting, Unity uses C#. Roblox uses [Luau](luau/index.md), a scripting language derived from [Lua 5.1](https://www.lua.org/manual/5.1/).

Compared to C#, Luau is gradually typed and generally has a less verbose syntax. In larger projects, however, gradual typing can introduce categories of bugs that strongly typed languages like C# avoid, so consider enabling [strict type checking](luau/type-checking.md#inference-modes) in Roblox scripts.

For basic syntax differences between the scripting languages, see [Luau and C# comparison](luau/luau-csharp-comparison.md).

### Luau code sample

<CodeSample components={props.components} />

The Roblox script can be relatively concise because Roblox has many built-in assumptions: a `Class.Player` with a `Class.Humanoid` character connected to the server and can equip `Class.Tool|Tools`. These assumptions don't exist in Unity, so the implementation would be very different.

## Assets

Unity and Roblox both support importing custom meshes and models in `.fbx` format. Certain types of assets may require specific configurations and export settings from your third-party modeling software. For more information, see the following pages:

- [3D Importer](art/modeling/3d-importer.md)
- [General specifications](art/modeling/specifications.md)
- [Blender and Maya export requirements](art/modeling/export-requirements.md)

In Unity, objects import into your `Assets` directory, visible in the **Project** window. In Roblox, assets import into your `Class.Workspace` and into the [Toolbox](projects/assets/toolbox.md) or [Asset Manager](projects/assets/manager.md).

Roblox also offers an open-source [Blender plugin](art/modeling/roblox-blender-plugin) to streamline the import process.

## Transforms

<Transforms engine="Unity" components={props.components} />

## Collaboration

In Unity, you collaborate with standard version control systems or paid services like Unity Version Control.

Roblox files live in the cloud (although you can export copies), so Roblox Studio provides built-in collaboration workflows for simultaneous editing, group management, permissions, script drafting, and more. See [Collaboration](projects/collaboration.md).

<Alert severity="info">
Cloud syncing provides further benefits with [packages](projects/assets/packages.md), the Roblox equivalent of Unity prefabs. Converting an asset or asset hierarchy to a package helps with local reusability, but also with collaboration. When you or your collaborators publish a new version of a package, you can quickly update existing instances of that package within an experience or set them to auto-update.
</Alert>

## Plugins

Similar to Unity tools, Roblox Studio supports [plugins](studio/plugins.md), which can simplify or give you additional control over various aspects of the development process. Plugins are available in the [Creator Store](production/creator-store.md), just like assets, many for free.

## Glossary

| Unity | Roblox | Notes |
| :--- | :--- | :--- |
| Scene | [Place](projects.md#places) | |
| GameObject | `Class.Part` or `Class.Model` | See [Philosophical differences](#philosophical-differences). |
| Prefab | [Package](projects/assets/packages.md) | |
| Transform | `Datatype.CFrame` | `Datatype.CFrame` doesn't include scale information. See [Transforms](#transforms). |
| Hierarchy | [Explorer](studio/explorer.md) | |
| Inspector | [Properties](studio/properties.md) |
| Scene view | [3D viewport](studio/ui-overview.md#3d-viewport) | |
| Game view | [3D viewport](studio/ui-overview.md#3d-viewport) | The viewport transitions into a gameplay view when you test your experience. |
| Project window | [Asset Manager](projects/assets/manager.md) or [Toolbox](projects/assets/toolbox.md) | |
| Terrain Inspector | [Terrain Editor](studio/terrain-editor.md) | |
| Spawn point | `Class.SpawnLocation` | |
| Console | [Output](studio/output.md) | |
| Asset Store | [Creator Store](production/creator-store.md) | |
| Overlays | [Toolbar](studio/ui-overview.md#toolbar-and-mezzanine) | |
| Tool | [Plugin](studio/plugins.md) | |
