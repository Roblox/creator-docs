---
title: Scripts
description: Scripts are containers that contain Luau code.
---

Scripts are containers that hold Luau code and can modify the properties and
behaviors of other objects. You can use scripts to implement the overall logic
of your experience to do things like manipulate an object, change its appearance
or events, or respond to user interactions.

Scripts can run on the client or
server, depending on the functionality you're building. For example, a script that
detects and acts on user input must run on the client and a script that
validates an in-game consumable must run on the server.

## Types of Scripts

Roblox has three types of scripts:

- `Class.Script` for scripts that can run on the server.
- `Class.LocalScript` for scripts that can run on a client.
- `Class.ModuleScript` for reusable modules that can be included in server and
  client scripts.

To control where scripts run, see the [server](../projects/data-model.md#server),
[client](../projects/data-model.md#client), and
[replication](../projects/data-model.md#replication) sections of the data model
documentation to understand the appropriate places to place your scripts,
so the Roblox engine understands how to run and replicate them.

## Creating Scripts

To create script objects in the data model using the **Explorer** window in Studio:

1. Hover over the parent container into which you want to insert a script.
2. Click the **&CirclePlus;** button that appears to the right of the
   container to open the **Insert Object** menu.
3. Select the type of script you want to insert.
4. Rename the script to reflect its purpose using `PascalCase`.

<Alert severity="info">
See our [code samples](../samples/index.md) and [tutorials](../tutorials/index.md) for scripting
examples.
</Alert>

## Module Scripts

`Class.ModuleScript` objects are reusable scripts that other script objects
load by calling the `require()` function. Module scripts must return exactly one
value and run once and only once
per Lua environment. As a result, subsequent calls to `require()` return a
cached value.

Multiple scripts can require
the same module script, and one module script can be required by both
server-side scripts and client-side local scripts.

### Structure

Each `Class.ModuleScript` starts with the following code:

```lua
local module = {}
return module
```

- `local module = {}` creates an empty [table](../luau/tables.md).
- `return module` returns the table and its members to any script that imports the `Class.ModuleScript`.

`Class.ModuleScript` objects return one value that can be any [data type](/reference/engine/datatypes) except for `nil`. You can execute arbitrary code in a `Class.ModuleScript`, but you only need to return what you need in other scripts.

The following example module script returns a `getPickupBonus` function in the `PickupManager` table:

```lua title="Example Module Script"
-- ModuleScript in ReplicatedStorage
local PickupManager = {}

local defaultMultiplier = 1.25
local rarityMultipliers = {
  common = 10,
  uncommon = 20,
  rare = 50,
  legendary = 100
}

-- Add the getPickupBonus function to the PickupManager module table
function PickupManager.getPickupBonus(rarity)
  local bonus = rarityMultipliers[rarity] * defaultMultiplier
  return bonus
end

return PickupManager
```

To call the `PickupManager.getPickupBonus` function:

```lua
-- Script in ReplicatedStorage
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get value returned by ModuleScript
local PickupManager = require(ReplicatedStorage:WaitForChild("PickupManager"))

-- Call a ModuleScript function
local bonus = PickupManager.getPickupBonus("legendary")
print(bonus)  --> 125
```

### Requiring

A `Class.ModuleScript` runs only when another script imports it using the `require()` function. If a `Class.ModuleScript` requires another `Class.ModuleScript`, a `Class.Script` or `Class.LocalScript` must require the first `Class.ModuleScript` in the chain for any of them to run.

<Alert severity="warning">
Don't require `Class.ModuleScript|ModuleScripts` in a recursive or circular manner,
otherwise Studio throws an error: <InlineCode>Requested module was required recursively</InlineCode>.
</Alert>

To access a `Class.ModuleScript` from another script using the `require()`
function:

```lua
-- Script in ServerScriptService
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get the return value for the ModuleScript named "PickupManager"
local PickupManager = require(ReplicatedStorage:WaitForChild("PickupManager"))

```

When you call `require()` on a `Class.ModuleScript`, it runs **once** and returns a single item as a **reference**. Calling `require()` again returns the exact same reference, meaning that if you modify a returned [table](../luau/tables.md) or `Class.Instance`, subsequent `require()` calls return that modified reference. The module itself doesn't run multiple times.

If you `require()` a `Class.ModuleScript` from both sides of the client-server-boundary, such as in a `Class.Script` and a `Class.LocalScript`, then the `Class.ModuleScript` returns a unique reference for each side.

### Patterns

Module scripts have some common patterns that you can use to simplify your code and provide more flexibility over the features Roblox Studio provides. By incorporating these patterns into your development, you can avoid common pitfalls as your Roblox experience grows in size and complexity.

<h5>Data Sharing</h5>

To associate data with individual objects, you can assign attributes to them or create `Class.Configuration` folders with value objects such as `Class.StringValue` or `Class.IntValue`. However, both approaches are troublesome if you want to add or modify dozens of objects or data values. They also don't store tables or functions.

If you want to modify the same data for multiple copies of the same
object or reuse the same data for different objects, store the data in
`Class.ModuleScript|ModuleScripts`. It's an easier way for you to reuse the data in other scripts, and you can store tables and functions.

The following example `Class.ModuleScript` in `Class.ReplicatedStorage|ReplicateStorage` stores the configuration values for a generic gun:

```lua title="Weapon Stats"
-- ModuleScript in ReplicatedStorage named GunConfig
local GunConfig = {}

GunConfig.MagazineSize = 20
GunConfig.AmmoCount = 100
GunConfig.Firerate = 600
GunConfig.Damage = {
	["Head"] = 50;
	["Torso"] = 40;
	["Body"] = 25;
}

return GunConfig
```

#### Custom Events

Custom events enable scripts to communicate with each other, but having to keep track of references to individual `Class.BindableEvent` objects may clutter your code.

You can use `Class.ModuleScript|ModuleScripts` to store
`Class.BindableEvent|BindableEvents` and provide
custom event handlers that are directly tied to the methods of `Class.ModuleScript`.

The following `Class.ModuleScript` in `Class.ReplicatedStorage|ReplicateStorage` has a custom event that fires when the switch changes state:

```lua title="Switch Module"
-- ModuleScript in ReplicatedStorage named Switch
local Switch = {}

-- Creating bindable so any script can listen to when the switch was changed
local bindableEvent = Instance.new("BindableEvent")
Switch.Changed = bindableEvent.Event

local state = false
function Switch.flip()
	state = not state
	bindableEvent:Fire(state)
end

return Switch
```

The following `Class.LocalScript` in `Class.ReplicatedFirst` connects a function to call when the `Switch.Changed` event fires.

```lua
-- LocalScript in ReplicatedFirst
local Switch = require(game.ReplicatedStorage:WaitForChild("Switch"))

Switch.Changed:Connect(function(newState)
	print("Switch state is now", newState)
end

-- Test the flipping a few times
task.wait(1)
Switch.flip()
task.wait(1)
Switch.flip()
```

#### Encapsulation

Encapsulation is the practice of creating a layer of abstraction around objects or scripting logic to hide complexity. You can use `Class.ModuleScript|ModuleScripts` to encapsulate Roblox objects with custom Lua functions to simplify code.

For example, you can use encapsulation to:

- Simplify cross-network communication with a single `Class.RemoteEvent` object.
- Wrap error handling code around sensitive services such as `Class.DataStoreService`.
- Define custom methods to control or extend Roblox object features.

It's difficult to keep track of dozens of individual `Class.RemoteEvent` objects to implement networking in your game. You can use a `Class.ModuleScript` to encapsulate a single `Class.RemoteEvent` to help simplify this problem. By including a unique `id` argument, you can still send different network messages while only using a single `Class.RemoteEvent`.

In the example below, the `Class.ModuleScript` named `NetworkManagerClient` encapsulates the `Class.RemoteEvent:FireServer()` method to include this extra `id` argument. Additionally, this `Class.ModuleScript` references the `Class.RemoteEvent` object itself so you don't have to reference it in other parts of your code. You only need to require this `Class.ModuleScript` to send network messages and don't need to deal with `Class.RemoteEvent` objects in the rest of your codebase.

The following `Class.ModuleScript` in `Class.ReplicatedFirst` provides an encapsulated function that you can call on your client scripts to send a network message:

```lua title="Network Module"
-- ModuleScript in ReplicatedFirst named NetworkManagerClient
local NetworkManagerClient = {}

local remoteEvent = game.ReplicatedStorage:WaitForChild("RemoteEvent")

-- Encapsulating the remote object's FireServer function
function NetworkManagerClient.FireServer(id, ...)
	remoteEvent:FireServer(id, ...)
end

return NetworkManagerClient

```

The following `Class.ModuleScript` in `Class.ServerScriptService` uses `Class.BindableEvent|BindableEvents` for every script to connect to a specific `id`. When a client sends a network message, each `Class.BindableEvent` associated with the specified `id` fires.

```lua
-- ModuleScript in ServerScriptService named NetworkManagerServer
local NetworkManagerServer = {}

local networkSignalList = {}
function NetworkManagerServer.GetServerEventSignal(id)
	local bindableEvent = Instance.new("BindableEvent")
	-- Linking the new BindableEvent to the id
	table.insert(networkSignalList, {
		id = id;
		bindableEvent = bindableEvent;
	})
	return bindableEvent.Event
end

-- Connecting to
local remoteEvent = game.ReplicatedStorage:WaitForChild("RemoteEvent")
remoteEvent.OnServerEvent:Connect(function(player, id, ...)
	-- Finding every bindable event that matches the id of the received remote event
	for _, signal in next, networkSignalList do
		if signal.id == id then
			signal.bindableEvent:Fire(player, ...)
		end
	end
end)

return NetworkManagerServer
```

The following `Class.LocalScript` sends a message with the id "RequestA" with an optional "Hello" argument.

```lua
-- LocalScript in ReplicatedFirst
local NetworkManagerClient = require(game.ReplicatedFirst:WaitForChild("NetworkManagerClient"))
NetworkManagerClient.FireServer("RequestA", "Hello")
```

The following `Class.Script` connects to the network message id "RequestA" and prints out a statement with any additional parameters when it receives the request.

```lua
-- Script in ServerScriptService
local NetworkManagerServer = require(game.ServerScriptService:WaitForChild("NetworkManagerServer"))
NetworkManagerServer.GetServerEventSignal("RequestA"):Connect(function(player, ...)
	print("Received RequestA from", player, ...)
end)
```
