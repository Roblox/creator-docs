---
title: Remote Events and Callbacks
description: Remote network events and callbacks allow for back-and-forth communication across the client-server boundary.
---

All experiences inherently communicate between the [server](../../projects/client-server.md) and the players' [clients](../../projects/client-server.md). For example, as a player maneuvers their character on their **client**, certain `Class.Humanoid` properties, such as states, are communicated to the **server**, which passes this information to the other connected **clients**.

`Class.RemoteEvent` and `Class.RemoteFunction` objects allow you to create your own events and callback functions to communicate custom behavior across the client-server boundary, with `Class.RemoteEvent|RemoteEvents` facilitating one-way communication and `Class.RemoteFunction|RemoteFunctions` facilitating two-way communication (sending a request across the boundary and yielding until a response is received from the recipient).

<Alert severity="warning">
Remote events and callback functions are not intended for communication between code on the same side of the [client-server](../../projects/client-server.md) boundary. For such processes, see [Custom Events and Callbacks](../../scripting/events/custom.md).
</Alert>

## Quick Reference

The following tables serve as a quick reference for how to use `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions` to communicate between the client and server.

<Tabs>
<TabItem label="Remote Events">
<table>
<thead>
  <tr><td colspan="2">[Client &rarr; Server](#client-server)</td></tr>
</thead>
<tbody>
  <tr>
    <td width="12%">Client</td>
    <td>`RemoteEvent:FireServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteEvent.OnServerEvent:Connect(function(player, args))`</td>
  </tr>
</tbody>
<thead>
  <tr><td colspan="2">[Server &rarr; Client](#server-client)</td></tr>
</thead>
<tbody>
  <tr>
    <td width="12%">Server</td>
    <td>`RemoteEvent:FireClient(player, args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</tbody>
<thead>
  <tr><td colspan="2">[Server &rarr; All Clients](#server-all-clients)</td></tr>
</thead>
<tbody>
  <tr>
    <td width="12%">Server</td>
    <td>`RemoteEvent:FireAllClients(args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</tbody>
</table>
</TabItem>
<TabItem label="Remote Functions">
<table>
<thead>
  <tr><td colspan="2">[Client &rarr; Server &rarr; Client](#client-server-client)</td></tr>
</thead>
<tbody>
  <tr>
    <td width="12%">Client</td>
    <td>`serverResponse = RemoteFunction:InvokeServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteFunction.OnServerInvoke = function(player, args)`</td>
  </tr>
</tbody>
<thead>
  <tr><td colspan="2">[Server &rarr; Client &rarr; Server](#server-client-server)</td></tr>
</thead>
<tbody>
  <tr>
    <td colspan="2">(serious risks as outlined [here](#server-client-server))</td>
  </tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Remote Events

A `Class.RemoteEvent` object facilitates asynchronous, one-way communication across the client-server boundary without yielding for a response.

To create a new `Class.RemoteEvent` via the [Explorer](../../studio/explorer.md) window in Studio:

1. Hover over the container into which you want to insert the `Class.RemoteEvent`. In order to ensure both server and client access, it must be in a place where both sides can see it, such as `Class.ReplicatedStorage`, although in some cases it's appropriate to store it in `Class.Workspace` or inside a `Class.Tool`.
1. Click the **&CirclePlus;** button that appears to the right of the container's name and insert a **RemoteEvent** instance.
1. Rename the instance to describe its purpose.

Once you've created a `Class.RemoteEvent`, it can facilitate one-way communication from [client to server](#client-server), from [server to client](#server-client), or from the [server to all clients](#server-all-clients).

<GridContainer numColumns="3">
  <figure>
	  <center>
    <img src="../../assets/scripting/client-server/Remote-Flow-Client-Server.png" width="85%" />
    <figcaption>Client &rarr; Server</figcaption>
		</center>
  </figure>
  <figure>
    <center>
    <img src="../../assets/scripting/client-server/Remote-Flow-Server-Client.png" width="85%" />
    <figcaption>Server &rarr; Client</figcaption>
		</center>
  </figure>
	<figure>
    <center>
    <img src="../../assets/scripting/client-server/Remote-Flow-Server-All-Clients.png" width="85%" />
    <figcaption>Server &rarr; All Clients</figcaption>
		</center>
  </figure>
</GridContainer>

<Alert severity="info">
Clients cannot communicate directly with other clients, although you can effectively dispatch an event from one client to another by using the `Class.RemoteEvent:FireServer()` method, then calling `Class.RemoteEvent:FireClient()|FireClient()` or `Class.RemoteEvent:FireAllClients()|FireAllClients()` in the event handler for `Class.RemoteEvent.OnServerEvent|OnServerEvent`.
</Alert>

### Client&nbsp;→ Server

You can use a `Class.LocalScript` to trigger an event on the [server](../../projects/client-server.md) by calling the `Class.RemoteEvent:FireServer()|FireServer()` method on a `Class.RemoteEvent`. If you pass arguments to `Class.RemoteEvent:FireServer()|FireServer()`, they pass to the event handler on the server with certain [limitations](#argument-limitations). Note that the first parameter of the event handler on the server is always the `Class.Player` object of the client that calls it, and additional parameters follow.

<table size="small">
  <tr>
    <td width="12%">Client</td>
    <td>`RemoteEvent:FireServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteEvent.OnServerEvent:Connect(function(player, args))`</td>
  </tr>
</table>

The following `Class.Script` connects an event handler to `Class.RemoteEvent.OnServerEvent|OnServerEvent` that creates a new `Class.Part` on the server. The accompanying `Class.LocalScript` then calls `Class.RemoteEvent:FireServer()|FireServer()` on the `Class.RemoteEvent` instance with the desired `Class.BasePart.Color|Color` and `Class.BasePart.Position|Position` for the part.

```lua title='Event Connection - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get reference to remote event instance
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onCreatePart(player, partColor, partPosition)
	print(player.Name .. " fired the RemoteEvent")
	local newPart = Instance.new("Part")
	newPart.Color = partColor
	newPart.Position = partPosition
	newPart.Parent = workspace
end

-- Connect function to event
remoteEvent.OnServerEvent:Connect(onCreatePart)
```

```lua title='Event Firing - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get reference to remote event instance
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

-- Fire the remote event and pass additional arguments
remoteEvent:FireServer(Color3.fromRGB(255, 0, 0), Vector3.new(0, 25, -20))
```

### Server&nbsp;→ Client

You can use a `Class.Script` to trigger an event on a [client](../../projects/client-server.md) by calling the `Class.RemoteEvent:FireClient()|FireClient()` method on a `Class.RemoteEvent`. The first argument for `Class.RemoteEvent:FireClient()|FireClient()` is the `Class.Player` object of the client that you want to respond to the event, and additional arguments pass to the client with certain [limitations](#argument-limitations). Note that the event handler doesn't need to include the `Class.Player` object as its first argument because you can determine the player on the client with `Class.Players.LocalPlayer`.

<table size="small">
  <tr>
    <td width="12%">Server</td>
    <td>`RemoteEvent:FireClient(player, args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</table>

The following `Class.LocalScript` connects an event handler to the `Class.RemoteEvent.OnClientEvent|OnClientEvent` event. The accompanying `Class.Script` then listens for incoming players to the server and calls `Class.RemoteEvent:FireClient()|FireClient()` for each with arbitrary data.

```lua title='Event Connection - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Get reference to remote event instance
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local player = Players.LocalPlayer

local function onNotifyPlayer(maxPlayers, respawnTime)
   print("[Client] Event received by player", player.Name)
   print(maxPlayers, respawnTime)
end

-- Connect function to event
remoteEvent.OnClientEvent:Connect(onNotifyPlayer)
```

```lua title='Event Firing - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Get reference to remote event instance
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

-- Listen for incoming players and dispatch remote event to each
local function onPlayerAdded(player)
   print("[Server] Firing event to player", player.Name)
   remoteEvent:FireClient(player, Players.MaxPlayers, Players.RespawnTime)
end
Players.PlayerAdded:Connect(onPlayerAdded)
```

### Server&nbsp;→ All Clients

You can use a `Class.Script` to trigger an event on all clients by calling the `Class.RemoteEvent:FireAllClients()|FireAllClients()` method on a `Class.RemoteEvent`. Unlike `Class.RemoteEvent:FireClient()|FireClient()`, the `Class.RemoteEvent:FireAllClients()|FireAllClients()` method doesn't require a `Class.Player` object because it fires the `Class.RemoteEvent` to all clients.

<table size="small">
  <tr>
    <td width="12%">Server</td>
    <td>`RemoteEvent:FireAllClients(args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</table>

The following `Class.LocalScript` connects an event handler to the `Class.RemoteEvent.OnClientEvent|OnClientEvent` event which outputs a remaining countdown time. The accompanying `Class.Script` then calls `Class.RemoteEvent:FireAllClients()|FireAllClients()` in a loop every second to fire the `Class.RemoteEvent` for all clients.

```lua title='Event Connection - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get reference to remote event instance
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onTimerUpdate(seconds)
	print(seconds)
end

-- Connect function to event
remoteEvent.OnClientEvent:Connect(onTimerUpdate)
```

```lua title='Event Firing - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get reference to remote event instance
local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local countdown = 5

-- Fire the RemoteEvent every second until time expires
for timeRemaining = -1, countdown do
	remoteEvent:FireAllClients(countdown - timeRemaining)
	task.wait(1)
end
```

## Remote Callbacks

A `Class.RemoteFunction` object facilitates synchronous, two-way communication across the client-server boundary. The sender of a remote function will yield until it receives a response from the recipient.

To create a new `Class.RemoteFunction` via the [Explorer](../../studio/explorer.md) window in Studio:

1. Hover over the container into which you want to insert the `Class.RemoteFunction`. In order to ensure both server and client access, it must be in a place where both sides can see it, such as `Class.ReplicatedStorage`, although in some cases it's appropriate to store it in `Class.Workspace` or inside a `Class.Tool`.
1. Click the **&CirclePlus;** button that appears to the right of the container's name and insert a **RemoteFunction** instance.
1. Rename the instance to describe its purpose.

Once you've created a `Class.RemoteFunction`, it can facilitate two-way communication between [client and server](#client-server-client) or between [server and client](#server-client-server).

<GridContainer numColumns="3">
  <figure>
	  <center>
    <img src="../../assets/scripting/client-server/Remote-Flow-Client-Server-Client.png" width="85%" />
    <figcaption>Client &rarr; Server &rarr; Client</figcaption>
		</center>
  </figure>
  <figure>
    <center>
    <img src="../../assets/scripting/client-server/Remote-Flow-Server-Client-Server.png" width="85%" />
    <figcaption>Server &rarr; Client &rarr; Server</figcaption>
		</center>
  </figure>
</GridContainer>

### Client&nbsp;→ Server&nbsp;→ Client

You can use a `Class.LocalScript` to call a function on the [server](../../projects/client-server.md) by calling the `Class.RemoteFunction:InvokeServer()|InvokeServer()` method on a `Class.RemoteFunction`. Unlike a [remote event](#remote-events), the `Class.LocalScript` that invokes the `Class.RemoteFunction` yields until the callback returns. Arguments that you pass to `Class.RemoteFunction:InvokeServer()|InvokeServer()` pass to the `Class.RemoteFunction.OnServerInvoke|OnServerInvoke` callback of the `Class.RemoteFunction` with certain [limitations](#argument-limitations). Note that if you define multiple callbacks to the same `Class.RemoteFunction`, only the last definition executes.

<table size="small">
  <tr>
    <td width="10%">Client</td>
    <td>`RemoteFunction:InvokeServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteFunction.OnServerInvoke = function(player, args)`</td>
  </tr>
</table>

The following `Class.Script` defines the callback function via `Class.RemoteFunction.OnServerInvoke|OnServerInvoke` and returns the requested `Class.Part` through its `return` value. The accompanying `Class.LocalScript` then calls `Class.RemoteFunction:InvokeServer()|InvokeServer()` with extra arguments defining the requested part color and position.

```lua title='Callback Connection - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get reference to remote function instance
local remoteFunction = ReplicatedStorage:FindFirstChildOfClass("RemoteFunction")

-- Callback function
local function createPart(player, partColor, partPosition)
	print(player.Name .. " requested a new part")
	local newPart = Instance.new("Part")
	newPart.Color = partColor
	newPart.Position = partPosition
	newPart.Parent = workspace
	return newPart
end

-- Set function as remote function's callback
remoteFunction.OnServerInvoke = createPart
```

```lua title='Event Invocation - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get reference to remote function instance
local remoteFunction = ReplicatedStorage:FindFirstChildOfClass("RemoteFunction")

-- Pass a color and position when invoking the callback
local newPart = remoteFunction:InvokeServer(Color3.fromRGB(255, 0, 0), Vector3.new(0, 25, -20))

-- Output the returned part reference
print("The server created the requested part:", newPart)
```

### Server&nbsp;→ Client&nbsp;→ Server

You can use a `Class.Script` to call a function on the client by calling the `Class.RemoteFunction:InvokeClient()|InvokeClient()` method on a `Class.RemoteFunction`, but it has serious risks as follows:

<Alert severity="error">
If the client throws an error, the server throws the error too.
</Alert>
<Alert severity="error">
If the client disconnects while it's being invoked, `Class.RemoteFunction:InvokeClient()|InvokeClient()` throws an error.
</Alert>
<Alert severity="error">
If the client doesn't return a value, the server yields forever.
</Alert>

For actions that don't require two-way communications, such as updating a GUI, use a `Class.RemoteEvent` and communicate from [server to client](#server-client).

## Argument Limitations

When you fire a `Class.RemoteEvent` or invoke a `Class.RemoteFunction`, it forwards any arguments that you pass with the event or to the callback function. Any type of Roblox object such as an `Datatype.Enum`, `Class.Instance`, or others can be passed, as well as Luau types such as numbers, strings, and booleans, although you should carefully explore the following limitations.

### Non-String Indices

If any **indices** of a passed table are non-string types such as an `Class.Instance`, [userdata](../../luau/userdata.md), or [function](../../luau/functions.md), Roblox automatically converts those indices to strings.

```lua title="Event Connection - LocalScript"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onEventFire(passedTable)
	for k, v in passedTable do
		print(typeof(k))  --> string
	end
end

-- Connect function to event
remoteEvent.OnClientEvent:Connect(onEventFire)
```

```lua title="Event Firing - Script"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

-- Listen for incoming players and dispatch remote event to each
local function onPlayerAdded(player)
	remoteEvent:FireClient(player,
		{
			[workspace.Baseplate] = true
		}
	)
end
Players.PlayerAdded:Connect(onPlayerAdded)
```

### Passed Functions

Functions included as arguments for a `Class.RemoteEvent` or `Class.RemoteFunction` will **not** be replicated across the [client-server](../../projects/client-server.md) boundary, making it impossible to pass functions remotely. Instead, the resulting argument on the receiving side will be `nil`.

```lua title='Event Connection - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onClientEvent(func)
	print(func)  --> nil
end

remoteEvent.OnClientEvent:Connect(onClientEvent)
```

```lua title='Event Firing - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function testFunction()
	print("Hello world!")
end

-- Fire remote event with function as an argument
remoteEvent:FireAllClients(testFunction)
```

### Table Indexing

If you pass a table of data, do not pass a mixed table of numeric and string keys. Instead, pass a table that consists **entirely** of key-value pairs (dictionary) or **entirely** of numeric indices.

<Alert severity="warning">
Whether passing a dictionary table **or** a numerically indexed table, avoid `nil` values for any index.
</Alert>

```lua title="Event Connection - Script"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onEventFire(player, passedTable)
	for k, v in passedTable do
		print(k .. " = " .. v)
		--> 1 = Sword
		--> 2 = Bow
		--> CharName = Diva Dragonslayer
		--> CharClass = Rogue
	end
end

-- Connect function to event
remoteEvent.OnServerEvent:Connect(onEventFire)
```

```lua title="Event Firing - LocalScript"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

-- Numerically indexed table
local inventoryData = {
	"Sword", "Bow"
}
-- Dictionary table
local characterData = {
	CharName = "Diva Dragonslayer",
	CharClass = "Rogue"
}

remoteEvent:FireServer(inventoryData)
remoteEvent:FireServer(characterData)
```

### Table Identities

Tables passed as arguments to remote events/callbacks are copied, meaning they will not be exactly equivalent to those provided when firing the event or invoking the callback. Nor will tables returned to the invoker be exactly equivalent to those provided. You can demonstrate this by running the following script on a `Class.RemoteFunction` and observing how the table identities differ.

```lua title="Callback Connection - Script"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteFunction = ReplicatedStorage:FindFirstChildOfClass("RemoteFunction")

-- Callback function
local function returnTable(player, passedTable)
	-- Output table identity on invocation
	print(tostring(passedTable))  --> table: 0x48eb7aead27563d9
	return passedTable
end

-- Set function as remote function's callback
remoteFunction.OnServerInvoke = returnTable
```

```lua title="Event Invocation - LocalScript"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteFunction = ReplicatedStorage:FindFirstChildOfClass("RemoteFunction")

local inventoryData = {
	"Sword", "Bow"
}
-- Output original table identity
print(tostring(inventoryData))  --> table: 0x059bcdbb2b576549

local invokeReturn = remoteFunction:InvokeServer(inventoryData)

-- Output table identity upon return
print(tostring(invokeReturn))  --> table: 0x9fcae7919563a0e9
```

### Metatables

If a table has a metatable, all of the metatable information is lost in the transfer. In the following code sample, the `NumWheels` property is part of the `Car` metatable. When the server receives the following table, the `truck` table has the `Name` property but **not** the `NumWheels` property.

```lua title='Event Connection - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local function onEvent(player, param)
	print(param)  --> {["Name"] = "MyTruck"}
end

-- Connect function to event
remoteEvent.OnServerEvent:Connect(onEvent)
```

```lua title='Event Firing - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

local Car = {}
Car.NumWheels = 4
Car.__index = Car

local truck = {}
truck.Name = "MyTruck"
setmetatable(truck, Car)

-- Fire event with table including a metatable
remoteEvent:FireServer(truck)
```

### Non-Replicated Instances

If a `Class.RemoteEvent` or `Class.RemoteFunction` passes a value that's only visible to the sender, Roblox doesn't replicate it across the client-server boundary and passes `nil` instead of the value. For example, if a `Class.Script` passes a descendant of `Class.ServerStorage`, the client listening to the event will receive a `nil` value because that object isn't replicable for the client.

```lua title='Event Firing - Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

-- Will be received as "nil" because client can't access ServerStorage
local storedPart = Instance.new("Part")
storedPart.Parent = ServerStorage

local function onPlayerAdded(player)
	remoteEvent:FireClient(player, storedPart)
end
Players.PlayerAdded:Connect(onPlayerAdded)
```

Similarly, if you create a part in a `Class.LocalScript` and try to pass it to a `Class.Script`, the server will see `nil` because the part isn't replicable for the server.

```lua title='Event Firing - LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:FindFirstChildOfClass("RemoteEvent")

-- Will be received as "nil" because the server doesn't know about this part
local clientPart = Instance.new("Part")
clientPart.Parent = workspace

remoteEvent:FireServer(clientPart)
```
