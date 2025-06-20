---
title: Services
description: Services provide pre-built functionality in the Roblox Engine.
---

In [Reuse code](module.md), you might have noticed frequent use of the `game:GetService()` method. Roblox services let you access the built-in features of the engine, like selling in-experience items, enabling chat, playing sounds, animating objects, and managing instances.

In fact, services are the first step in **the most fundamental, common pattern of Roblox development**:

1. Get services.
1. Require module scripts.
1. Add local functions.
1. Add the [events](events/index.md) that trigger those functions.

For example, you might want to save players' positions in the world when they exit your experience:

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SaveManager = require(ReplicatedStorage:WaitForChild("SaveManager"))

-- Local function that calls a reusable function in the module script.
local function saveProgress(character)
	-- Get the position of the player's character.
	local position = character:FindFirstChild("HumanoidRootPart").Position
	-- Use the saveData function in the module script, which writes to the
	-- DataStoreService.
	SaveManager.saveData(character, position)
end

-- Another local function that calls saveProgress() when a character is removed
-- from the experience (in this case, when the player leaves).
local function onPlayerAdded(player)
	player.CharacterRemoving:Connect(saveProgress)
end

-- Calls onPlayerAdded when a player first connects to the experience.
Players.PlayerAdded:Connect(onPlayerAdded)
```

Some key details include:

- Because you should only retrieve a service once per script, the convention is to give the variable the same name as the service. This convention applies to module scripts, as well.
- You retrieve services with the global variable `Class.DataModel|game`, a reference to the root of the data model.
- Roblox doesn't make guarantees around loading order (and [instance streaming](../workspace/streaming.md) further complicates what is and isn't loaded at any given time), so the use of `Class.Instance:WaitForChild()` is an important safety measure.

Rather than comparing [standard libraries](/reference/engine/libraries), [global functions and variables](/reference/engine/globals), or third-party libraries, a big part of Roblox development is identifying which of the many, many services can help you add the desired functionality to your experiences. In the example above, instead of using a standard I/O library to write to disk, you use [cloud services](#cloud-services) to store data.

## Container services

Container services can contain and influence other objects. These container
services reside at the root of the data model and are visible in Studio's
Explorer window. Collectively, these container services
form a structured hierarchy for the data model, so the Roblox Engine can
properly interpret and render your place. The following table includes some common container services.

Service | Description
:--- | :---
`Class.Workspace` | Contains all objects that render in the 3D world, such as parts and terrain.
`Class.Lighting` | Contains objects for setting universal lighting effects, such as `Class.Atmosphere` and `Class.Sky`.
`Class.ReplicatedStorage` and `Class.ReplicatedFirst` | Contain content and logic that replicates between the server and client.

To further examine the data model, you can use these methods:

- `Class.DataModel:FindService()|game:FindService()` searches for the instance of the specified service.
- `Class.DataModel:GetChildren()|game:GetChildren()` returns an array of all root children of the data model, which are the top-level container services.
- `Class.DataModel:GetDescendants()|game:GetDescendants()` returns an array of all the descendants of the data model, including all container services and their children.

For more information on container services, see the [data
model](/projects/data-model#object-organization) documentation.

## Scripting services

Scripting services provide standard functionality in the Roblox Engine that you
call within scripts. The following table includes some common scripting services.

Service | Description
:--- | :---
`Class.TweenService` | Used to interpolate numeric properties of other instances from a start to end value, with options for easing direction and style, repeat, and delay.
`Class.MarketplaceService` | The service responsible for in-experience transactions, such as prompting the player to purchase a developer product, subscription, pass, Roblox Premium, etc.
`Class.RunService` | Contains methods and events for frame-by-frame time management, as well as for checking the context (server, client, Studio mode) in which the experience is running. Useful for running any process or update on every runtime frame.
`Class.SoundService` | Controls various global aspects of how audio plays in an experience, such as the doppler scale and volumetric audio. Can also contain sound groups to control the volume and dynamic effects properties of multiple audio signals at once.
`Class.CollectionService` | Manages groups (collections) of instances with tags that replicate from the server to the client, letting you more easily assign and work with groups of related instances.

## Cloud services

Roblox also has special cloud services for handling tasks and processes
that occur in the Roblox cloud. The following table includes some common cloud services.

Service | Description
:--- | :---
`Class.DataStoreService` | For storing persistent data across sessions.
`Class.MemoryStoreService` | For storing frequent and ephemeral data that change rapidly.
`Class.MessagingService` | For communicating between multiple servers during live sessions.

Cloud services also have corresponding web APIs; they're accessible from external scripts or tools. For more information, see [Open Cloud](../cloud/guides/index.md).
