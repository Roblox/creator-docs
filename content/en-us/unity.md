---
title: Roblox for Unity Developers
description: If you're an experienced Unity developer, use this page to get oriented with Roblox.
---

This page includes information to help experienced Unity developers get started with Roblox: basic orientation, conceptual comparison, and key differences.

## Getting Oriented

![Overview of Unity](assets/unity/roblox-unity-editor.jpg)

![Overview of Roblox Studio](assets/unity/roblox-unity-studio-markup.png)

Unity's hierarchy view and Roblox Studio's [Explorer](studio/explorer.md) are the primary windows for organizing elements in 3D scenes:

- Both allow you to manage and organize objects (for example, characters and environmental assets).
- Both use a tree structure for the parent-child relationships between objects.

However, Hierarchy view has no predefined structure, whereas Explorer has a strict structure. It might help to think of Explorer as a combination of Unity's Hierarchy view and Project window, with the Workspace folder as the most recognizable element.

Similarly, the Roblox Studio [Asset Manager](projects/assets/manager.md) and [Toolbox](projects/assets/toolbox.md) overlap with the Unity Project window. The Asset Manager lets you manage all assets within your experience, whereas the Toolbox lets you access any assets you've published. The Toolbox also lets you search the Creator Marketplace for assets from Roblox or the community, similar to the Unity Asset Store.

## Philosophical Differences

Roblox is a "simulation engine" rather than a traditional game engine. Unity `GameObjects` and Roblox `Class.Part|Parts` both serve as the fundamental building blocks for creating objects in a 3D environment, but in practice, the two are quite different:

- **Representation**: `GameObjects` in Unity are a higher-level concept for any object in a scene, whereas `Parts` in Roblox are designed to represent physical objects like wooden blocks and plastic spheres, rather than abstract geometry like primitive objects in Unity.
- **Physics**: To perform physics simulations in Unity, you attach components like `Rigidbody` and `Collider` to a `GameObject`. In Roblox, physics are built into the `Parts` data type; the engine handles interactions automatically.

You can see the difference immediately if you create a `GameObject` and a `Part`. The `GameObject` has nothing more than a position, rotation, and scale. The `Part` has that same information—plus a material and color, values for reflectance and transparency, mass and shape, and much more. Turning a `Part` into something more akin to an empty `GameObject` means _removing_ a lot of built-in properties.

In that sense, you might consider Unity development as additive and Roblox development as subtractive. `GameObjects` are generic containers for any number of components. You mix and match components as necessary to achieve your desired appearance and behavior. Roblox handles things like physics and lighting by default, so modifying its systems means removing or overwriting functionality rather than just adding it where it didn't previously exist.

Another useful comparison is the Unity `GameObject`to the Roblox `Class.Model`. Models act as a container for a collection of interconnected parts in the same way that you might establish a parent-child relationship between many `GameObjects` in Unity. You specify one of the model's parts as its [primary part](parts/models.md#setting-a-primary-part) to define the pivot point. Models also hold scripts, animations, sound effects, prompts, constraints, particle emitters, and more.

For example, a Unity `GameObject` might have components for `ParticleSystem`, `Physics3D`, `SpringConstraint`, and a script. In the Hierarchy window, you see a single `GameObject` named `SpringyFireball`. The Inspector window shows the collection of components and properties.

In Roblox, a comparable `SpringyFireball` model in the Explorer might look something like this:

```text
Model
|- Fire
|- MeshPart
|- SpringConstraint
|- ClickDetector
|  |- Script
```

Roblox's physics-by-default philosophy extends to the process of building 3D models. In Roblox, welding multiple parts together into an [assembly](physics/assemblies.md) is an excellent way to quickly build things, because Roblox treats the welded parts as a single rigid body. In Unity, a similar approach might cause performance issues or odd physics interactions.

## Location Matters

Roblox experiences are multiplayer by default, so Roblox Studio includes many different storage locations with specific behaviors. For example, a script might run when you put it in `Class.ReplicatedStorage`, but not when you put it into `Class.StarterPlayerScripts`. For more information, see [Client-Server Runtime](projects/client-server.md) and [Object Organization](projects/data-model#object-organization.md).

Location | Description
:--- | :---
Workspace | Represents the game world and contains all parts, models, and other objects in the game. You can put scripts into the Workspace, but only server scripts and module scripts run when parented to it. This location works well for scripts that control object behavior, since they can attach directly to the object.
ReplicatedStorage | Contains objects that are replicated to both the client and the server, including scripts. This location is ideal for scripts that share data or functionality between the two, such as game settings, player data, and events.
ServerScriptService | Contains server scripts, including module scripts. This location is ideal for scripts that need to access server-side functionality or objects, such as game logic, data storage, and AI behaviors.
ServerStorage | Contains server-side objects and settings. This location is ideal for large objects that don't need to be immediately replicated to clients when they join an experience.
StarterPlayer | Contains player-related objects and settings. This location is primarily used for setting up player properties and initializations. Client scripts can run from this location, including module scripts. This location is ideal for scripts that set up player-specific features, such as player models, starting inventory, and camera settings. Of particular note, `StarterCharacterScripts` and `StarterPlayerScripts` are subtly different. For more information, see [Client](projects/data-model.md#client).
StarterGui | Contains GUI elements that display when the game is loaded. Client scripts can run from this location, including module scripts. This location is ideal for scripts that modify the game's user interface, such as adding buttons, menus, and pop-ups.

## Scripting

Roblox experiences support three different types of Luau scripts:

- Client scripts

  These scripts run on the client, and the server has no visibility into their behavior. For legacy reasons, these scripts can take the form of `LocalScripts` or `Scripts` with a `Class.BaseScript.RunContext|RunContext` value of `Client`. Client scripts typically live in `Class.ReplicatedStorage`, `Class.StarterPlayerScripts`, or `Class.StarterCharacterScripts`.

- Server scripts

  These scripts run on the server, and the client has no visibility into their behavior. Server scripts have a `RunContext` value of `Server` and typically live in `Class.ServerScriptService`, the contents of which are not replicated to the game client.

- Module scripts

  These scripts are reusable pieces of code that return exactly one value, typically a function or table (or a table of functions). Rather than duplicating code in client and server scripts, use module scripts to share code and data between the two. Module scripts often live in `Class.ReplicatedStorage`, but can live elsewhere if you want to share code between scripts on the same side of the client-server boundary.

Unity doesn't have the concept of different script types. If you choose to make a multiplayer game, Unity uses its networking libraries to indicate when a `GameObject` (and its scripts) should be exclusive to the server.

In Unity, much of the engine's functionality is available through the methods of `MonoBehaviour`. For example, to run code during the render loop, you add code to the `Update()` method. To handle physics collision events, you add code to the `OnCollideEnter()` method.

Roblox scripts are more event-driven. You access similar functionality by subscribing to services and listening for updates.

### C# and Luau

For scripting, Unity uses C#. Roblox uses Luau, a scripting language derived from [Lua 5.1](https://www.lua.org/manual/5.1/).

Compared to C#, Luau is gradually typed and generally has a less verbose syntax. In larger projects, however, gradual typing can introduce categories of bugs that strongly typed languages like C# avoid, so consider enabling `--!strict` [type checking](luau/type-checking.md#inference-modes) in Roblox scripts.

For basic syntax differences between the scripting languages, see [Luau and C# Comparison](luau/luau-csharp-comparison.md).

### Luau Code Sample

The following Luau code sample demonstrates how to, after a player equips a fishing pole, listen for user input (in this case, the <kbd>E</kbd> key) and call additional functions:

```lua
-- Get the necessary game services
local ContextActionService = game:GetService("ContextActionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get a module script from ReplicatedStorage that returns a single function
local performSomeAction = require(ReplicatedStorage.performSomeAction)

-- Assumes that this script is a child of the fishing pole
local fishingPole = Script.parent
local ACTION_CAST = "Cast"

-- Check that the key is down, then call another function
local function castLine(_actionName, inputState, _inputObject)
    if inputState == Enum.UserInputState.Begin then
        performSomeAction()
    end
end

-- Only enable the action when the player equips the fishing pole
fishingPole.Equipped:Connect(function()
    ContextActionService:BindAction(ACTION_CAST, castLine, true, Enum.KeyCode.E)
end)

-- Disable the action when the player unequips the fishing pole
fishingPole.Unequipped:Connect(function()
    ContextActionService:UnbindAction(ACTION_CAST)
end)
```

The Roblox script can be relatively concise because Roblox has many built-in assumptions: a `Class.Player` with a `Class.Humanoid` character connected to the server and can equip `Class.Tool|Tools`. These assumptions don't exist in Unity, so the implementation would be very different.

## Assets

Unity and Roblox both support importing custom meshes and models in FBX format. Certain types of assets may require specific configurations and export settings from your third-party modeling software. For more information, see the following pages:

- [3D Importer](art/modeling/3d-importer.md)
- [General Specifications](art/modeling/specifications.md)
- [Blender and Maya Export Requirements](art/modeling/export-requirements.md)

In Unity, objects import into your `Assets` directory, visible in the Project window. In Roblox, objects import as a `Class.Model` into your Workspace and into the **Inventory** section of the [Asset Manager](projects/assets/manager.md) or [Toolbox](projects/assets/toolbox.md).

## Transforms

Unity's transforms and Roblox's `Datatype.CFrame|CFrames` serve similar purposes in representing 3D transformations of objects:

- Both transforms and `CFrames` represent the position and rotation of an object in 3D space. Transforms also include scale, whereas Roblox uses a `Class.BasePart.Size` property that isn't part of the `CFrame`.
- You manipulate transforms and `CFrames` to change an object's position and rotation.
- You can combine transforms and `CFrames` with other transforms and `CFrames` to create complex transformations.

Key differences between the two include:

- Transforms in Unity are abstractions, where position and rotation are represented as a matrix and quaternion. In Roblox, `CFrame` is a custom data type that contains vectors for position and rotation.
- In Unity, you manipulate transforms using functions, whereas most `CFrame` manipulation involves multiplication (i.e. composition) with other `CFrames`.
- In Unity, child transforms are relative to parents. `CFrames` are not.

## Collaboration

In Unity, you collaborate with standard version control systems or paid services like Unity Version Control.

Roblox files live in the cloud (although you can export copies), so Roblox Studio provides built-in tools for collaborative editing: group management, permissions, script drafting, and more. See [Collaboration](projects/collaboration.md).

## Plugins

Similar to Unity tools, Roblox Studio supports [plugins](studio/plugins.md), which can simplify or give you additional control over various aspects of the development process. Plugins are available in the Creator Marketplace, just like assets, many for free.

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
| Asset Store | Creator Marketplace | |
| Overlays | Menu bar | |
| Tool | [Plugin](studio/plugins.md) | |
