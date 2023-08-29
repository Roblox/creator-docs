---
title: Services
description: Services provide pre-built functionality in the Roblox engine.
---

Services let you access pre-built features of the Roblox engine for common tasks
like selling in-experience items, managing large collections of related
instances, animating objects and properties, and rendering the 3D world.

## Container Services

Container services can contain and influence other objects. These container
services reside at the root of the data model and are visible in Studio's
Explorer window. Collectively, these container services
form a structured hierarchy for the data model, so the Roblox engine can
properly interpret and render your place. Examples of containers and objects they can contain include:

- `Class.Workspace` - Contains all objects that render in the 3D world, such as parts and terrain.

- `Class.Lighting`- Contains objects for setting universal lighting effects, such as `Class.Atmosphere` and `Class.Sky`.

- `Class.ReplicatedStorage` and `Class.ReplicatedFirst` - Contains content and logic that replicates between the server and client.

For more information on container services, see the [data
model](/projects/data-model#object-organization) documentation.

## Scripting Services

Scripting services provide standard functionality in the Roblox engine that you
call within scripts. Some common services you'll call in scripts include:

- `Class.TweenService` - Used to interpolate numeric properties of other instances from a start to end value, with options for easing direction/style, repeat, and delay.
- `Class.MarketplaceService` - The service responsible for in-experience transactions, such as prompting the player to purchase a developer product or game pass, upgrade to Roblox Premium, etc.
- `Class.ContextActionService` - Allows you to bind user input such as a key press, screen tap, or controller button press to contextual actions.
- `Class.RunService` - Contains methods and events for frame-by-frame time management, as well as for checking the context (server, client, Studio mode) in which the experience is running. Useful for running any process or update on every runtime frame.
- `Class.SoundService` - Controls various global aspects of how audio plays in an experience, such as the doppler scale and volumetric audio. Also can contain sound groups to control the volume and dynamic effects properties of multiple audio signals at once.
- `Class.CollectionService` - Manages groups (collections) of instances with tags that replicate from the server to the client, letting you more easily assign and work with groups of related instances.

In addition, there are special Cloud services for handling tasks and processes
that occur in the Roblox cloud. Examples of cloud services include:

- `Class.DataStoreService` for storing persistent data across sessions.
- `Class.MemoryStoreService` for storing frequent and ephemeral data that change rapidly.
- `Class.MessagingService` for communicating between multiple servers during live sessions.

Cloud services also have corresponding web APIs, making them accessible from external scripts or tools. For more information, see [Open Cloud](../cloud/open-cloud/index.md).

### Calling in Scripts

You retrieve services to utilize them using the global variable
`game`, a reference to the root of the data model.
It's best practice to include services at the top of each script that utilizes
them for quick identification with the `game:GetService()` method.

```lua highlight='1-3'
local CollectionService = game:GetService("CollectionService")
local RunService = game:GetService("RunService")
local SoundService = game:GetService("SoundService")

local flickerSources = {}

local lightSources = CollectionService:GetTagged("LightSource")
for c = 1, #lightSources do
	local light = lightSources[c]
	if light:GetAttribute("Lighted") == true then
		flickerSources[light] = true
	end
end
```

Service-related `game` methods that you might use include:

- `game:GetService()` returns the instance of the specified service.

- `game:FindService()` searches for the instance of the specified service.

- `game:GetChildren()` returns an array of all root children of the data model, which are the top-level container services.

- `game:GetDescendants()` returns an array of all the descendants of the data model, including all container services and their children.
