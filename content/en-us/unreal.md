---
title: Roblox for Unreal Developers
description: If you're an experienced Unreal developer, use this page to get oriented with Roblox.
---

import ScriptTypes from './includes/engine-comparisons/script-types.md'
import CodeSample from './includes/engine-comparisons/fishing-pole-code-sample.md'
import ScriptLocations from './includes/engine-comparisons/script-locations.md'
import Collaboration from './includes/engine-comparisons/collaboration.md'
import Transforms from './includes/engine-comparisons/transforms.md'

This page includes information to help experienced Unreal Engine developers get started with Roblox: basic orientation, a conceptual comparison, and key differences between the two platforms.

## Getting Oriented

![The Unreal Editor user interface with markup to show the various windows and panels.](./assets/engine-comparisons/unreal-editor.png)

![The Roblox Studio user interface with markup to show the various windows and panels.](./assets/engine-comparisons/roblox-studio-markup.png)

Unreal's Outliner and Roblox Studio's [Explorer](studio/explorer.md) are the primary windows for organizing elements in 3D spaces. Both display a hierarchy of objects and folders. However, Outliner has a flatter, less defined structure and only shows `Actors`. The Explorer window has a deeply nested, strict structure and displays all objects as part of the hierarchy, even objects that would be considered components in Unreal.

The Roblox Studio [Asset Manager](projects/assets/manager.md) and [Toolbox](projects/assets/toolbox.md) overlap with the Unreal Content Browser. The Asset Manager lets you manage all assets within your experience, whereas the Toolbox lets you access any assets you've published. The Toolbox also lets you search the Creator Store for assets from Roblox or the community. The Creator Store is similar to the Unreal Engine Marketplace, but you can access it directly from the Studio user interface.

## Philosophical Differences

Roblox is a "simulation engine" rather than a traditional game engine. Unreal `Actors` and Roblox `Class.Part|Parts` both serve as fundamental building blocks, but in practice, the two are quite different:

- **Representation**: `Actors` in Unreal are a higher-level concept for any object in a level, whereas `Parts` in Roblox are designed to represent physical objects like wooden blocks and plastic spheres.
- **Physics**: To perform physics simulations in Unreal, you enable physics within certain components (such as the `StaticMeshComponent`) or by adding components to `Actors`, such as physics constraints. In Roblox, physics are built into the `Parts` data type; the engine handles interactions automatically.

You can see the difference immediately if you create an `Actor` and a `Part`. The `Actor` has little more than a location, rotation, and scale. The `Part` has that same information—plus a material and color, values for reflectance and transparency, mass and shape, and much more. The two only start to share similar properties when you compare a `StaticMeshActor` in Unreal (e.g. a cube) to a `Class.MeshPart` in Roblox.

<GridContainer numColumns="2">
<figure>
  <img alt="An example Unreal actor in the Details panel." src="./assets/engine-comparisons/unreal-details.png" />
  <figcaption>Unreal Editor Details panel</figcaption>
</figure>
<figure>
  <img alt="An example Roblox part in the Properties window." src="./assets/engine-comparisons/roblox-properties.png" />
  <figcaption>Roblox Studio Properties window</figcaption>
</figure>
</GridContainer>

Another useful comparison is the Unreal `Actor` to the Roblox `Class.Model`. Models act as a container for a collection of interconnected parts in the same way that `Actors` in Unreal are containers for components. You specify one of the model's parts as its [primary part](parts/models.md#setting-a-primary-part) to define the pivot point. Models also hold scripts, animations, sound effects, prompts, constraints, particle emitters, and more.

For example, an Unreal `Actor` might have a `NiagraComponent` that uses several emitters to achieve the desired visual effect, a mesh for the shape, a physics constraint to add springiness, and a script for player interactivity. In Outliner, you see a single `Actor` named `SpringyFireball`.

In Roblox, a comparable `SpringyFireball` model in the Explorer window might look something like this:

```text
Model
|- ParticleEmitter
|- MeshPart
|- SpringConstraint
|- ClickDetector
|  |- Script
```

Roblox's physics-by-default philosophy extends to the process of building 3D models. In Roblox, welding multiple parts together into an [assembly](physics/assemblies.md) is an excellent way to quickly build things, because Roblox treats the welded parts as a single rigid body. This approach isn't practical in Unreal.

## Location Matters

<ScriptLocations components={props.components} />

## Scripting

<ScriptTypes components={props.components} />

Unreal doesn't have the concept of different script types. If you choose to make a multiplayer game, you write additional code to synchronize game state between the server and the clients.

In Unreal, much of the engine's functionality is available by extending built-in classes like `UObject`, `ACharacters`, `ULevel`, and `UWorld` in C++ or Blueprint. Unreal supports custom events, but many classes include events that the engine automatically invokes as part of the natural life cycle of the level.

Compared to the Unreal "ticking" system, Roblox scripts are much more event-driven. You access similar engine functionality by subscribing to services and listening for updates.

### C++ and Luau

For scripting, Unreal uses C++. Roblox uses [Luau](luau/index.md), a scripting language derived from [Lua 5.1](https://www.lua.org/manual/5.1/).

Compared to Luau, C++ has an overall performance advantage, which might or might not be relevant to the kinds of experiences you want to build. Luau is gradually typed and has a less verbose syntax. In larger projects, however, gradual typing can introduce categories of bugs that strongly typed languages like C++ avoid, so consider enabling [strict type checking](luau/type-checking.md#inference-modes) in Roblox scripts.

Unreal also includes a visual scripting system called Blueprints. Roblox has third-party plugins that offer similar functionality, but no comparable system built-in.

### Luau Code Sample

<CodeSample components={props.components} />

The Roblox script can be relatively concise because Roblox has many built-in assumptions: a `Class.Player` with a `Class.Humanoid` character connected to the server and can equip `Class.Tool|Tools`. These assumptions don't exist in Unreal, so the implementation would be very different.

## Assets

Unreal and Roblox both support importing custom meshes and models in `.fbx` format. Certain types of assets may require specific configurations and export settings from your third-party modeling software. For more information, see the following pages:

- [3D Importer](art/modeling/3d-importer.md)
- [3D Modeling Specifications](art/modeling/specifications.md)
- [Blender and Maya Export Requirements](art/modeling/export-requirements.md)

In Unreal, assets import into your `Content` directory, visible in the Content Browser. In Roblox, assets import into your Workspace and into the [Toolbox](projects/assets/toolbox.md) or **Inventory** section of the [Asset Manager](projects/assets/manager.md).

Roblox also offers an open-source [Blender plugin](art/modeling/roblox-blender-plugin) to streamline the import process, similar to the **Send to Unreal** feature of Blender Tools.

## Transforms

<Transforms engine="Unreal Engine" components={props.components} />

## Collaboration

In Unreal, you collaborate with version control systems like Perforce or SVN, generally through Unreal's built-in user interface. These version control systems use the centralized "checkout" model that locks files while one person works on them.

<Collaboration package="Unreal Blueprint classes" components={props.components} />

## Plugins

Similar to Unreal, Roblox Studio supports [plugins](studio/plugins.md), which can simplify or give you additional control over various aspects of the development process. Plugins are available in the [Creator Store](production/publishing/creator-store.md), just like assets, many for free.

## Glossary

| Unreal | Roblox | Notes |
| :--- | :--- | :--- |
| Level | [Place](projects.md#places) | |
| Actor | `Class.Part` or `Class.Model` | See [Philosophical Differences](#philosophical-differences). |
| Blueprint Class | [Package](projects/assets/packages.md) | |
| Transform | `Datatype.CFrame` | `CFrame` doesn't include scale information. See [Transforms](#transforms). |
| Outliner | Explorer window | |
| Details panel | Properties window |
| Level Viewport | Viewport | |
| Content Browser | [Asset Manager](projects/assets/manager.md) or [Toolbox](projects/assets/toolbox.md) | |
| Landscape Mode | Terrain Editor | |
| PlayerStart | `Class.SpawnLocation` | |
| Output Log | Output | |
| Marketplace | [Creator Store](production/publishing/creator-store.md) | |
| Menu bar | Menu bar | |
| Plugin | [Plugin](studio/plugins.md) | |
