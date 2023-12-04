---
title: Custom Events and Callbacks
description: Custom bindable events and callbacks allow for back-and-forth communication on the same side of the client-server boundary.
---

`Class.BindableEvent` and `Class.BindableFunction` objects allow you to bind behaviors between scripts on the same side of the [client-server](../../projects/client-server.md) boundary and communicate a specific desired outcome for in-experience actions.

<Alert severity="warning">
Bindable events do not allow for communication between the server and clients. If you're looking for this functionality, see [Remote Events and Callbacks](../../scripting/events/remote.md).
</Alert>

## Custom Events

The `Class.BindableEvent` object enables **custom events** through asynchronous one-way communication between scripts. When you fire a `Class.BindableEvent` through the `Class.BindableEvent:Fire()|Fire()` method, the firing script does **not** yield and the target function receives the passed arguments with certain [limitations](#argument-limitations). Like all events, `Class.BindableEvent|BindableEvents` create threads of each connected function, so even if one errors, others continue.

To create a new `Class.BindableEvent` using the [Explorer](../../studio/explorer.md) window in Studio:

1. Hover over the container into which you want to insert the `Class.BindableEvent`. It's recommended to use `Class.ServerScriptService` for communication between `Class.Script|Scripts`, or `Class.ReplicatedStorage` for communication between `Class.LocalScript|LocalScripts`.
2. Click the **&CirclePlus;** button that appears to the right of the container's name and insert a **BindableEvent** instance.
3. Rename the instance to describe its purpose.

Once you've created a `Class.BindableEvent`, you can connect a function to its `Class.BindableEvent.Event|Event` event in one script, then `Class.BindableEvent:Fire()|Fire()` the event from another script.

```lua title="Event Connection"
local ServerScriptService = game:GetService("ServerScriptService")

-- Get reference to bindable event instance
local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

-- Connect anonymous function to event
bindableEvent.Event:Connect(function(data)
	print(data)  --> Round started!
end)
```

```lua title="Event Firing"
local ServerScriptService = game:GetService("ServerScriptService")

-- Get reference to bindable event instance
local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

-- Fire bindable event
bindableEvent:Fire("Round started!")
```

<Alert severity="warning">
You can connect multiple functions to the same `Class.BindableEvent`, but Luau executes them in an unpredictable order. To ensure that functions execute in a particular order, combine their bodies or calls into a single function and connect it to the event.
</Alert>

## Custom Callbacks

The `Class.BindableFunction` object allows for synchronous two-way communication between scripts. You can use it to define a custom callback function and invoke it manually by calling `Class.BindableFunction:Invoke()`. The code invoking the function **yields** until the corresponding callback is found, and the callback receives the arguments that you passed to `Class.BindableFunction:Invoke()|Invoke()`. If the callback was never set, the script that invokes it will not resume execution.

To create a new `Class.BindableFunction` via the [Explorer](../../studio/explorer.md) window in Studio:

1. Hover over the container into which you want to insert the `Class.BindableFunction`. It's recommended to use `Class.ServerScriptService` for communication between `Class.Script|Scripts`, or `Class.ReplicatedStorage` for communication between `Class.LocalScript|LocalScripts`.
1. Click the **&CirclePlus;** button that appears to the right of the container's name and insert a **BindableFunction** instance.
1. Rename the instance to describe its purpose.

Once you've created a `Class.BindableFunction`, you can connect to its `Class.BindableFunction.OnInvoke|OnInvoke` callback in one script, then `Class.BindableFunction:Invoke()|Invoke()` the callback function from another script.

```lua title="Callback Connection"
local ServerScriptService = game:GetService("ServerScriptService")

-- Get reference to bindable function instance
local bindableFunction = ServerScriptService:FindFirstChildOfClass("BindableFunction")

-- Callback function
local function addTwoNumbers(a, b)
	return a + b
end

-- Set function as bindable function's callback
bindableFunction.OnInvoke = addTwoNumbers
```

```lua title="Event Invocation"
local ServerScriptService = game:GetService("ServerScriptService")

-- Get reference to bindable function instance
local bindableFunction = ServerScriptService:FindFirstChildOfClass("BindableFunction")

-- Invoke callback function and output returned value
local sum = bindableFunction:Invoke(2, 4)
print(sum)  --> 6
```

<Alert severity="warning">
Each `Class.BindableFunction` can only utilize one `Class.BindableFunction.OnInvoke|OnInvoke` callback. If you make multiple definitions, only the last one assigned will run. Also note that if the `Class.BindableFunction.OnInvoke|OnInvoke` callback does not have a `return` statement, the invocation will return `nil`.
</Alert>

## Argument Limitations

When you fire a `Class.BindableEvent` or invoke a `Class.BindableFunction`, it forwards any arguments that you pass with the event or to the callback function. Any type of Roblox object such as an `Datatype.Enum`, `Class.Instance`, or others can be passed, as well as Luau types such as numbers, strings, and booleans, although you should carefully explore the following limitations.

### Non-String Indices

If any **indices** of a passed table are non-string types such as an `Class.Instance`, [userdata](../../luau/userdata.md), or [function](../../luau/functions.md), Roblox automatically converts those indices to strings.

```lua title="Event Connection"
local ServerScriptService = game:GetService("ServerScriptService")

local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

local function onEventFire(passedTable)
	for k, v in passedTable do
		print(typeof(k))  --> string
	end
end

-- Connect function to event
bindableEvent.Event:Connect(onEventFire)
```

```lua title="Event Firing"
local ServerScriptService = game:GetService("ServerScriptService")

local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

-- Fire event with table containing a workspace instance as a key
bindableEvent:Fire({
	[workspace.Baseplate] = true
})
```

### Table Indexing

If you pass a table of data, do not pass a mixed table of numeric and string keys. Instead, pass a table that consists **entirely** of key-value pairs (dictionary) or **entirely** of numeric indices.

<Alert severity="warning">
Whether passing a dictionary table **or** a numerically indexed table, avoid `nil` values for any index.
</Alert>

```lua title="Event Connection"
local ServerScriptService = game:GetService("ServerScriptService")

local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

local function onEventFire(passedTable)
	for k, v in passedTable do
		print(k .. " = " .. v)
		--> 1 = Sword
		--> 2 = Bow
		--> CharName = Diva Dragonslayer
		--> CharClass = Rogue
	end
end

-- Connect function to event
bindableEvent.Event:Connect(onEventFire)
```

```lua title="Event Firing"
local ServerScriptService = game:GetService("ServerScriptService")

local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

-- Numerically indexed table
local inventoryData = {
	"Sword", "Bow"
}
-- Dictionary table
local characterData = {
	CharName = "Diva Dragonslayer",
	CharClass = "Rogue"
}

-- Fire event with consistently-indexed tables
bindableEvent:Fire(inventoryData)
bindableEvent:Fire(characterData)
```

### Table Identities

Tables passed as arguments to bindable events/callbacks are copied, meaning they will not be exactly equivalent to those provided when firing the event or invoking the callback. Nor will tables returned to the invoker be exactly equivalent to those provided. You can demonstrate this by running the following script on a `Class.BindableFunction` and observing how the table identities differ.

```lua title="Callback Connection"
local ServerScriptService = game:GetService("ServerScriptService")

local bindableFunction = ServerScriptService:FindFirstChildOfClass("BindableFunction")

-- Callback function
local function returnTable(passedTable)
	-- Output table identity on invocation
	print(tostring(passedTable))  --> table: 0x48eb7aead27563d9
	return passedTable
end

-- Set function as bindable function's callback
bindableFunction.OnInvoke = returnTable
```

```lua title="Event Invocation"
local ServerScriptService = game:GetService("ServerScriptService")

local bindableFunction = ServerScriptService:FindFirstChildOfClass("BindableFunction")

local inventoryData = {
	"Sword", "Bow"
}
-- Output original table identity
print(tostring(inventoryData))  --> table: 0x059bcdbb2b576549

local invokeReturn = bindableFunction:Invoke(inventoryData)

-- Output table identity upon return
print(tostring(invokeReturn))  --> table: 0x9fcae7919563a0e9
```

### Metatables

If a table has a metatable, all of the metatable information is lost in the transfer. In the following code sample, the `NumWheels` property is part of the `Car` metatable. When the server receives the following table, the `truck` table has the `Name` property but **not** the `NumWheels` property.

```lua title='Event Connection'
local ServerScriptService = game:GetService("ServerScriptService")

local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

local function onEvent(param)
	print(param)  --> {["Name"] = "MyTruck"}
end

-- Connect function to event
bindableEvent.Event:Connect(onEvent)
```

```lua title='Event Firing'
local ServerScriptService = game:GetService("ServerScriptService")

local bindableEvent = ServerScriptService:FindFirstChildOfClass("BindableEvent")

local Car = {}
Car.NumWheels = 4
Car.__index = Car

local truck = {}
truck.Name = "MyTruck"
setmetatable(truck, Car)

-- Fire event with table including a metatable
bindableEvent:Fire(truck)
```
