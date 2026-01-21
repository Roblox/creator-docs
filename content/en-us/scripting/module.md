---
title: Reuse code
description: How to use module scripts to reuse code.
---

After creating a few scripts, it's never long before you want to reuse some code between them. Depending on [location](./locations.md), `Class.ModuleScript|ModuleScripts` let you reuse code between scripts on different sides of the client-server boundary or the same side of the boundary.

You can put module scripts anywhere that you put scripts, but `Class.ReplicatedStorage` is a popular location; storing module scripts here lets you reuse code between the server and clients.

## Anatomy of a module script

In Roblox Studio, add a module script to **ReplicatedStorage** and rename it to `PickupManager`. Each `Class.ModuleScript` starts with the following code:

```lua
local module = {}

return module
```

This code creates an empty Luau [table](../luau/tables.md) and returns it to any script that requires the module script.

The return value can be any [data type](/reference/engine/datatypes) except for `nil`, but most module scripts return a function, a table, or a table of functions. To generate its return value, module scripts can of course run arbitrary code, which includes requiring other module scripts.

<Alert severity="info">
Be careful not to have module scripts require each other in a circular manner, which results in a `Requested module was required recursively` error.
</Alert>

The following example returns a table with a single function called `getPickupBonus`. Paste it into the new module script:

```lua
-- ModuleScript in ReplicatedStorage
local PickupManager = {}

local defaultMultiplier = 1.25
local rarityMultipliers = {
	common = 10,
	uncommon = 20,
	rare = 50,
	legendary = 100
}

-- Add the getPickupBonus function to the PickupManager table
PickupManager.getPickupBonus = function(rarity)
	local bonus = rarityMultipliers[rarity] * defaultMultiplier
	return bonus
end

return PickupManager
```

Adding the function to a table isn't strictly necessary—you could just return the function itself—but it's a good pattern to follow; it gives you an easy-to-understand syntax when you call the function from another script and lets you easily add more functions to the module script over time.

## Require module scripts

To load a module script, you call the `Global.LuaGlobals.require()` function. In `ReplicatedStorage`, add a new script, and change its `RunContext` to `Client`. Then add the following code to call the `PickupManager.getPickupBonus` function:

```lua title="Client script in ReplicatedStorage"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get the value returned by the ModuleScript
local PickupManager = require(ReplicatedStorage:WaitForChild("PickupManager"))

-- Call a ModuleScript function
local bonus = PickupManager.getPickupBonus("legendary")
print(bonus)  --> 125
```

<Alert severity="info">
The `Class.Instance:WaitForChild()` pattern is an important safety measure in client scripts. For more information, see [Replication order](attributes.md#replication-order).
</Alert>

Storing module scripts in `ReplicatedStorage` lets you share code between the server and client, so you can use the same code to require the script from `ServerScriptService`:

```lua title="Script in ServerScriptService"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PickupManager = require(ReplicatedStorage:WaitForChild("PickupManager"))
```

When you call `Global.LuaGlobals.require()` on a `Class.ModuleScript`, it runs once and returns a single item as a reference. Calling `Global.LuaGlobals.require()` again returns the exact same reference, meaning that if you modify a returned [table](../luau/tables.md) or `Class.Instance`, subsequent `Global.LuaGlobals.require()` calls return that modified reference. The module itself doesn't run multiple times.

If you require a `Class.ModuleScript` from both sides of the client-server boundary, as in the example above, the `Class.ModuleScript` returns a unique reference for each side.

## Patterns

Module scripts have some common patterns that you can use to simplify your code and avoid pitfalls as your experience grows in size and complexity.

<Alert severity="success">
Most of these patterns require an understanding of events. If you're not familiar with them, see [Events](events.md).
</Alert>

### Data sharing

To associate data with individual objects, you can assign attributes to them or create `Class.Configuration` folders with value objects such as `Class.StringValue` or `Class.IntValue`. However, both approaches are troublesome if you want to add or modify dozens of objects or data values. They also don't store tables or functions.

If you want to modify the same data for multiple copies of the same
object or reuse the same data for different objects, store the data in
`Class.ModuleScript|ModuleScripts`. It's an easier way for you to reuse the data in other scripts, and you can store tables and functions.

The following example `Class.ModuleScript` in `Class.ReplicatedStorage|ReplicatedStorage` stores the configuration values for a generic gun:

```lua title="ModuleScript in ReplicatedStorage"
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

### Custom events

Custom events enable scripts to communicate with each other, but having to keep track of references to individual `Class.BindableEvent` objects can clutter your code.

You can use `Class.ModuleScript|ModuleScripts` to store
`Class.BindableEvent|BindableEvents` and provide
custom event handlers that are directly tied to the methods of `Class.ModuleScript`.

The following `Class.ModuleScript` in `Class.ReplicatedStorage|ReplicatedStorage` has a custom event that fires when the switch changes state:

```lua title="ModuleScript in ReplicatedStorage"
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

The following client script in `Class.ReplicatedStorage` connects a function to call when the `Switch.Changed` event fires.

```lua title="Script in ReplicatedStorage"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Switch = require(ReplicatedStorage:WaitForChild("Switch"))

Switch.Changed:Connect(function(newState)
  print("Switch state is now", newState)
end)

-- Test the flipping a few times
task.wait(1)
Switch.flip()
task.wait(1)
Switch.flip()
```

### Encapsulation

Encapsulation is the practice of creating a layer of abstraction around objects or scripting logic to hide complexity. You can use `Class.ModuleScript|ModuleScripts` to encapsulate Roblox objects with custom Luau functions to simplify code.

For example, you can use encapsulation to:

- Simplify cross-network communication with a single `Class.RemoteEvent` object.
- Wrap error handling code around sensitive services such as `Class.DataStoreService`.
- Define custom methods to control or extend Roblox object features.

It's difficult to keep track of dozens of individual `Class.RemoteEvent` objects to implement networking in your experience. You can use a `Class.ModuleScript` to encapsulate a single `Class.RemoteEvent` to help simplify this problem. By including a unique `id` argument, you can still send different network messages while only using a single `Class.RemoteEvent`.

In the example below, the `Class.ModuleScript` named `NetworkManagerClient` encapsulates the `Class.RemoteEvent:FireServer()` method to include this extra `id` argument. Additionally, this `Class.ModuleScript` references the `Class.RemoteEvent` object itself so you don't have to reference it in other parts of your code. You only need to require this `Class.ModuleScript` to send network messages and don't need to deal with `Class.RemoteEvent` objects in the rest of your codebase.

The following `Class.ModuleScript` in `Class.ReplicatedFirst` provides an encapsulated function that you can call on your client scripts to send a network message:

```lua title="Network Module"
-- ModuleScript in ReplicatedFirst named NetworkManagerClient
local NetworkManagerClient = {}

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

-- Encapsulating the remote object's FireServer function
function NetworkManagerClient.FireServer(id, ...)
  remoteEvent:FireServer(id, ...)
end

return NetworkManagerClient

```

The following `Class.ModuleScript` in `Class.ServerScriptService` uses `Class.BindableEvent|BindableEvents` for every script to connect to a specific ID. When a client sends a network message, each `Class.BindableEvent` associated with the specified ID fires.

```lua
-- ModuleScript in ServerScriptService named NetworkManagerServer
local NetworkManagerServer = {}

local networkSignalList = {}
function NetworkManagerServer.GetServerEventSignal(id)
	local bindableEvent = Instance.new("BindableEvent")
	-- Linking the new BindableEvent to the id
	table.insert(networkSignalList, {
		id = id,
		bindableEvent = bindableEvent,
	})
	return bindableEvent.Event
end

-- Connecting to
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")
remoteEvent.OnServerEvent:Connect(function(player, id, ...)
	-- Finding every bindable event that matches the ID of the received remote event
	for _, signal in networkSignalList do
		if signal.id == id then
			signal.bindableEvent:Fire(player, ...)
		end
	end
end)

return NetworkManagerServer
```

The following `Class.LocalScript` sends a message with the ID `RequestA` with an optional `Hello` argument.

```lua
-- LocalScript in ReplicatedFirst
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local NetworkManagerClient = require(ReplicatedFirst:WaitForChild("NetworkManagerClient"))
NetworkManagerClient.FireServer("RequestA", "Hello")
```

The following `Class.Script` connects to the network message ID `RequestA` and prints out a statement with any additional parameters when it receives the request.

```lua
-- Script in ServerScriptService
local ServerScriptService = game:GetService("ServerScriptService")

local NetworkManagerServer = require(ServerScriptService:WaitForChild("NetworkManagerServer"))
NetworkManagerServer.GetServerEventSignal("RequestA"):Connect(function(player, ...)
	print("Received RequestA from", player, ...)
end)
```
