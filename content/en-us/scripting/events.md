---
title: Events
description: Events represent an action or occurrence within Roblox.
---

Scripting on Roblox is primarily event-driven. The engine supports multiple types of events. When implementing your logic, you can connect functions to **built-in events** fired by the engine to respond to them. You can also create **custom events** that you fire and respond to. Additionally, you can use **networking events** that allow event-driven communication across the client-server boundary.

## Built-in Events

Many objects have built-in events provided by their APIs that automatically
respond to specific actions or changes related to those objects. For example, a
`Class.Player.Character` touching a `Class.Part` automatically fires a
`Class.BasePart.Touched` event. Most built-in events are synchronous, so you can
connect a function for following custom behaviors in response to a certain built-in
event by scripting.

<h3>Connecting Functions to Events</h3>

You can connect a function to an event using `Connect()` to execute code each time the event fires. Most events pass arguments to their connected functions when they fire. For example, the `Class.BasePart.Touched` event passes the object that touched the `Class.Part`, and the `Class.Players.PlayerAdded` event passes the `Class.Player` that joined your experience.

It's the best practice to name the function with the pattern `onEventName` to help you find the function in the future. The following code sample demonstrates how to connect a function named `onPartTouched` to the `Class.BasePart.Touched` event of a `Class.Part` in the Workspace.

```lua
-- Script in ServerScriptService
local part = workspace.Part

local function onPartTouched(object)
	print("Part was touched by", object:GetFullName())
end

part.Touched:Connect(onPartTouched)
```

You can connect [anonymous functions](../luau/functions.md#anonymous-functions) to events when you want to use variables in the parent scope and don't need to use the function elsewhere. The following code sample shows how to connect an anonymous function to the `Class.Players.PlayerAdded` event.

```lua
-- Script in ServerScriptService
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
	print(player.Name, " joined the game!")
end)
```

<h3>Disconnecting Functions from Events</h3>

In Luau, the `Datatype.RBXScriptSignal` data type represents events. The `Datatype.RBXScriptSignal:Connect()` method returns an `Datatype.RBXScriptConnection` object. If you connect a function to an event but don't want the function to call in subsequent event firings, disconnect the function from the event by calling the `Datatype.RBXScriptConnection:Disconnect()` method.

When Luau destroys an event's object, such as the `Class.Player` object when a user leaves the experience, all of its connections disconnect automatically. The following code sample shows how to connect and disconnect a function to the `Class.BasePart.Touched|Part.Touched` event.

```lua
-- Script in ServerScriptService
local part = workspace.Part
local targetPart = workspace.TargetPart

-- Declare the variable before defining the function so it can be disconnected from within the function
local connection

local function onPartTouched(otherPart)
	if otherPart == targetPart then
		print("The part hit the target")
		connection:Disconnect()
	end
end

connection = part.Touched:Connect(onPartTouched)
```

<h3>Waiting for Events to Fire</h3>

If you want a script to yield or pause until a specific event fires, use the `Datatype.RBXScriptSignal.Wait()` function.

```lua
-- Script in ServerScriptService
local part = workspace.Part
local touchedPart = part.Touched:Wait()
print("The part was touched by", touchedPart:GetFullName())
```

The `Datatype.RBXScriptSignal.Wait()` function returns the event's arguments. You can assign these arguments to variables where `Datatype.RBXScriptSignal.Wait()` is called.

```lua
-- Script in ServerScriptService
local VirtualInputManager = game:GetService("VirtualInputManager")

local isPressed, keyCode, isRepeatedKey, layerCollector = VirtualInputManager.SendKeyEvent:Wait()

print(isPressed)
print(keyCode)
--..etc
```

## Custom Events

Custom events allow you to bind behaviors between scripts and communicate your specific desired outcome for certain in-experience actions. Custom events can be both asynchronous and synchronous. and they can only communicate scripts within the same side of the client-server model.

### Custom Asynchronous Events

`Class.BindableEvent` allows asynchronous, one-way communication between scripts. You can use it to define a custom event and fire it manually by calling its `Class.BindableEvent:Fire()` method without yielding for return values. The connected function receives arguments that you pass to `Class.BindableEvent:Fire()|Fire`.

<h4>Creating Custom Asynchronous Events</h4>

To create a new `Class.BindableEvent` in the Explorer:

1. Hover over the container in the Explorer into which you want to insert a `Class.BindableEvent`. It's common to put `Class.BindableEvent|BindableEvents` in an `Event` folder in `Class.ServerScriptService` to use them with `Class.Script|Scripts` and `Class.ReplicatedStorage` to use them with `Class.LocalScript|LocalScripts`.
2. Click the **&CirclePlus;** button that appears to the right of the container to open the **Insert Object** menu.
3. Select **BindableEvent**.
4. Rename the event to describe its purpose using `PascalCase`.

To create a new `Class.BindableEvent` in a `Class.Script`, use `Datatype.Instance.new()`:

```lua
-- Script in ServerScriptService
local roundStartedEvent = Instance.new("BindableEvent")
roundStartedEvent.Name = RoundStarted
roundStartedEvent.Parent = ServerScriptService
```

<h4>Using Custom Asynchronous Events</h4>

You can connect multiple functions to the same `Class.BindableEvent`, but Luau executes them in an unpredictable order. To ensure that functions execute in a particular order, combine their bodies or calls into a single function to connect to the event.

To fire a `Class.BindableEvent` in `Class.ServerScriptService` named `ShareData`:

```lua
-- Script in ServerScriptService named DataSender
local ServerScriptService = game:GetService("ServerScriptService")
local shareData = ServerScriptService.ShareData

local HELLO_WORLD = "Hello world!"

-- Shares HELLO_WORLD after 2 seconds
task.wait(2)
shareData:Fire(HELLO_WORLD)
```

To connect to a `Class.BindableEvent` in `Class.ServerScriptService` named `ShareData`:

```lua
-- Script in ServerScriptService named DataReceiver
local ServerScriptService = game:GetService("ServerScriptService")
local shareData = ServerScriptService.ShareData

shareData.Event:Connect(function(data)
    print(data)
end)
```

### Custom Synchronous Events

`Class.BindableFunction` objects allow for synchronous, two-way communication between scripts. They contain an `Class.BindableFunction.OnInvoke|OnInvoke` callback that you can define in one script and call from other scripts. The callback function runs when you call the `Class.BindableFunction:Invoke()|Invoke()` method on the `Class.BindableFunction`. The callback function arguments that you pass to `Class.BindableFunction:Invoke()|Invoke()`. The code invoking the function yields until the function halts or returns a value.

<h4>Creating Custom Synchronous Events</h4>

To create a new `Class.BindableFunction` in the **Explorer**:

1. Hover over the container in the Explorer into which you want to insert a `Class.BindableFunction`. It's common to put `Class.BindableFunction` objects in a `Functions` folder in `Class.ServerScriptService` to use them with `Class.Script|Scripts` and `Class.ReplicatedStorage` to use them with `Class.LocalScript|LocalScripts`.
2. Click the **&CirclePlus;** button that appears to the right of the container to open the **Insert Object** menu.
3. Select **BindableFunction**.
4. Rename the function to describe its purpose using `PascalCase`.

To create a new `Class.BindableFunction` in a `Class.Script`:

```lua
-- Script in ServerScriptService
local getHelloWorld = Instance.new("BindableFunction")
getHelloWorld.Name = GetHelloWorld
getHelloWorld.Parent = ServerScriptService
```

<h4>Using Custom Synchronous Events</h4>

Each `Class.BindableFunction` has only one `Class.BindableFunction.OnInvoke|OnInvoke` callback. If you have multiple definitions, then only the one defined latest runs. If the `Class.BindableFunction.OnInvoke|OnInvoke` callback does not have a return statement, it returns `nil`.

To define the `Class.BindableFunction.OnInvoke|OnInvoke` callback of a `Class.BindableFunction` in `Class.ServerScriptService` named `GetHelloWorld`:

```lua
-- Script in ServerScriptService named DataManager
local ServerScriptService = game:GetService("ServerScriptService")
local getHelloWorld = ServerScriptService.GetHelloWorld

local HELLO_WORLD = "Hello world!"

getHelloWorld.OnInvoke = function()
	return HELLO_WORLD
end
```

To invoke a `Class.BindableFunction` in `Class.ServerScriptService` named `GetHelloWorld`:

```lua
-- Script in ServerScriptService named DataReceiver
local ServerScriptService = game:GetService("ServerScriptService")
local getHelloWorld = ServerScriptService.GetHelloWorld

print(getHelloWorld:Invoke())
print("Hello world again!")
```

Notice that the `"Hello world!"` prints before `"Hello world again!"` because the `Class.Script` yields until the `Class.BindableFunction` halts or returns a value.

## Networking Events

All experiences require communication between the **server** and the players' **clients**. For example when a player presses `W` to move forward, the keyboard input is received on the player's **client**. The **client** then communicates this to the **server**, which responds by moving the position of the player's character forward. `Class.RemoteEvent` and `Class.RemoteFunction` objects allow you to create your own events and functions to communicate your own behavior between the <Typography noWrap>client-server</Typography> boundary.

`Class.RemoteEvent|RemoteEvents` allow for asynchronous, <Typography noWrap>one-way</Typography> communication across the boundary, while `Class.RemoteFunction|RemoteFunctions` allow for synchronous, <Typography noWrap>two-way</Typography> communication (sending a request across the boundary and yielding until a response is received from the recipient).

The following table serves as a quick reference for how to use remote events and functions to communicate between the client and server.

<p><Typography variant='h3'>Remote Events</Typography></p>
<Typography variant='h4'>[Client &rarr; Server](#client-to-server)</Typography>
<table size="small">
  <tr>
    <td width="10%">Client</td>
    <td>`RemoteEvent:FireServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteEvent.OnServerEvent:Connect(function(player, args))`</td>
  </tr>
</table>
<Typography variant='h4'>[Server &rarr; Client](#server-to-client)</Typography>
<table size="small">
  <tr>
    <td width="10%">Server</td>
    <td>`RemoteEvent:FireClient(player, args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</table>
<Typography variant='h4'>[Server &rarr; All Clients](#server-to-all-clients)</Typography>
<table size="small">
  <tr>
    <td width="10%">Server</td>
    <td>`RemoteEvent:FireAllClients(args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</table>

<p><Typography variant='h3'>Remote Functions</Typography></p>
<Typography variant='h4'>[Client &rarr; Server &rarr; Client](#client-to-server-to-client)</Typography>
<table size="small">
  <tr>
    <td width="10%">Client</td>
    <td>`serverResponse = RemoteFunction:InvokeServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteFunction.OnServerInvoke = function(player, args)`</td>
  </tr>
</table>
<Typography variant='h4'>[Server &rarr; Client &rarr; Server](#server-to-client-to-server) &nbsp;<Chip size='small' label='Serious Risks' color='secondary'/></Typography>

### Asynchronous Networking Events

A `Class.RemoteEvent` object allows asynchronous, one-way communication across the <Typography noWrap>client-server</Typography> boundary. You can use it to send requests across the boundary without yielding for a response.

<h4>Creating Asynchronous Networking Events</h4>

Create `Class.RemoteEvent` objects in a location that both the client and server can access, such as `Class.ReplicatedStorage`.

1. In the [Explorer](../studio/explorer.md) window, hover over **ReplicatedStorage** and click the **&CirclePlus;** button.
2. Click **RemoteEvent** from the contextual menu.

   <img src="../assets/legacy/Create-RemoteEvent.png" width="320" />

3. Rename the new `Class.RemoteEvent` to describe its purpose.

   <img src="../assets/legacy/RemoteEvent-Object.png" width="320" />

<h4>Using Asynchronous Networking Events</h4>

You can use `Class.RemoteEvent|RemoteEvents` to facilitate one-way communication from [one client to the server](#client-to-server), the [server to one client](#server-to-client), or the [server to all clients](#server-to-all-clients).

<h5 id="client-to-server">Client to Server</h5>

You can use a `Class.LocalScript` to trigger an event on the server by calling the `Class.RemoteEvent:FireServer()|FireServer()` method on a `Class.RemoteEvent`. If you pass arguments to `Class.RemoteEvent:FireServer()|FireServer()`, they pass to the event handler on the server. The first parameter of the event handler is always the `Class.Player` object of the client that calls it, and additional parameters follow.

<table size="small">
  <tr>
    <td width="10%">Client</td>
    <td>`RemoteEvent:FireServer(args)`</td>
  </tr>
  <tr>
    <td>Server</td>
    <td>`RemoteEvent.OnServerEvent:Connect(function(player, args))`</td>
  </tr>
</table>

The following LocalScript and Script fire and respond to a `Class.RemoteEvent` instance in ReplicatedStorage named `RemoteEventTest`. The LocalScript calls `Class.RemoteEvent:FireServer()|FireServer()` on the `Class.RemoteEvent` instance. In response, the Script connects an event handler to `Class.RemoteEvent.OnServerEvent|OnServerEvent` that creates a new `Class.Part` on the server.

```lua title='LocalScript in StarterPlayerScripts'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEventTest")

-- Fire the RemoteEvent and pass additional arguments
remoteEvent:FireServer(BrickColor.Red(), Vector3.new(0, 25, 0))
```

```lua title='Script in ServerScriptService'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEventTest")

local function onCreatePart(player, partColor, partPosition)
   print(player.Name .. " fired the RemoteEvent")
   local newPart = Instance.new("Part")
   newPart.BrickColor = partColor
   newPart.Position = partPosition
   newPart.Parent = workspace
end

remoteEvent.OnServerEvent:Connect(onCreatePart)
```

<Alert severity="info">
Notice how the LocalScript fires the event with **two** parameters, but the Script's event handler has **three** parameters. This is because the first parameter is always the `Class.Player` object of the client that calls it.
</Alert>

<h5 id="server-to-client">Server to Client</h5>

You can use a `Class.Script` to trigger an event on a client by calling the `Class.RemoteEvent:FireClient()|FireClient()` method on a `Class.RemoteEvent`. The first argument of the `Class.RemoteEvent:FireClient()|FireClient()` is the `Class.Player` object of the client that you want to respond to the event, and additional arguments pass to the client.

<table size="small">
  <tr>
    <td width="10%">Server</td>
    <td>`RemoteEvent:FireClient(player, args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</table>

The following Script and LocalScript fire and respond to a `Class.RemoteEvent` instance in ReplicatedStorage named `RemoteEventTest`. The Script calls `Class.RemoteEvent:FireClient()|FireClient()` on the `Class.RemoteEvent` to fire it. The LocalScript connects an event handler to the `Class.RemoteEvent.OnClientEvent|OnClientEvent` event. The event handler doesn't need to list the `Class.Player` object as its first argument because you can determine the player on the client with `Class.Players.LocalPlayer`.

```lua title='Script in ServerScriptService'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEventTest")

local function onPlayerAdded(player)
   print("[Server] Firing event to player", player.Name)
   remoteEvent:FireClient(player, Players.MaxPlayers, Players.RespawnTime)
end
Players.PlayerAdded:Connect(onPlayerAdded)
```

```lua title='LocalScript in StarterPlayerScripts'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEventTest")

local player = Players.LocalPlayer

local function onNotifyPlayer(maxPlayers, respawnTime)
   print("[Client] Event received by player", player.Name)
   print(maxPlayers, respawnTime)
end

remoteEvent.OnClientEvent:Connect(onNotifyPlayer)
```

<h5 id="server-to-all-clients">Server to All Clients</h5>

You can use a `Class.Script` to trigger an event on all clients by calling the `Class.RemoteEvent:FireAllClients()|FireAllClients()` method on a `Class.RemoteEvent`. Unlike `Class.RemoteEvent:FireClient()|FireClient()`, the `Class.RemoteEvent:FireAllClients()|FireAllClients()` method doesn't require a `Class.Player` object because it fires the `Class.RemoteEvent` to all clients.

<table size="small">
  <tr>
    <td width="10%">Server</td>
    <td>`RemoteEvent:FireAllClients(args)`</td>
  </tr>
  <tr>
    <td>Client</td>
    <td>`RemoteEvent.OnClientEvent:Connect(function(args))`</td>
  </tr>
</table>

The following Script and LocalScript fire and respond to a `Class.RemoteEvent` instance in ReplicatedStorage named `RemoteEventTest`. The Script calls `Class.RemoteEvent:FireAllClients()|FireAllClients()` on the `Class.RemoteEvent` to fire it. The LocalScript connects an event handler to the `Class.RemoteEvent.OnClientEvent|OnClientEvent` event that prints to the Output window.

```lua title='Script in ServerScriptService'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEventTest")

local secondsRemaining = 5

-- Fire the RemoteEvent every second until time expires
for t = secondsRemaining, 1, -1 do
   remoteEvent:FireAllClients(t)
   task.wait(1)
end
```

```lua title='LocalScript in StarterPlayerScripts'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEventTest")

local function onTimerUpdate(seconds)
	print(seconds)
end

-- Call "onTimerUpdate()" when the server fires the RemoteEvent
remoteEvent.OnClientEvent:Connect(onTimerUpdate)
```

<h5>Client to Client</h5>

**Clients cannot communicate directly with other clients**, although you can effectively dispatch an event from one client to another by using the `Class.RemoteEvent:FireServer()|FireServer()` method, then calling `Class.RemoteEvent:FireClient()|FireClient()` or `Class.RemoteEvent:FireAllClients()|FireAllClients()` in the event handler for `Class.RemoteEvent.OnServerEvent|OnServerEvent`.

### Synchronous Networking Events

`Class.RemoteFunction` allows synchronous, two-way communication across the <Typography noWrap>client-server</Typography> boundary. The sender of a remote function will wait to receive a response from the recipient.

<h4>Creating Synchronous Networking Events</h4>

Create `Class.RemoteFunction` objects in a location that both the client and server can access, such as `Class.ReplicatedStorage`.

1. In the [Explorer](../studio/explorer.md) window, hover over **ReplicatedStorage** and click the **&CirclePlus;** button.
2. Click **RemoteFunction** from the contextual menu.

   <img src="../assets/legacy/Create-RemoteFunction.png" width="320" />

3. Rename the new `Class.RemoteFunction` to describe its purpose.

   <img src="../assets/legacy/RemoteFunction-Object.png" width="320" />

<h4>Using Synchronous Networking Events</h4>

You can use `Class.RemoteFunction` objects to facilitate two-way communication
between one client and the server or the server
and one client.

<h5 id="client-to-server-to-client">Client to Server to Client</h5>

You can use a `Class.Script` to call a function on the server by calling the `Class.RemoteFunction:InvokeServer()|InvokeServer()` method on a `Class.RemoteFunction`. The LocalScript that invokes the `Class.RemoteFunction` yields until the callback of the `Class.RemoteFunction` returns. Arguments that you pass to `Class.RemoteFunction:InvokeServer()|InvokeServer()` pass to the `Class.RemoteFunction.OnServerInvoke|OnServerInvoke` callback of the `Class.RemoteFunction`. If you define multiple callbacks to the same `Class.RemoteFunction`, the last definition executes.

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

The following LocalScript and Script have two-way communication using a `Class.RemoteFunction` instance in ReplicatedStorage named `RemoteFunctionTest`. The LocalScript calls `Class.RemoteFunction:InvokeServer()|InvokeServer()` on the `Class.RemoteFunction` instance with extra arguments. In response, the Script defines the callback of the `Class.RemoteFunction` and calls it using the `Class.Player` of the client and the extra arguments. The Script then returns the return value of the callback to the LocalScript.

```lua title='LocalScript in StarterPlayerScripts'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteFunction = ReplicatedStorage:WaitForChild("RemoteFunctionTest")

-- Invoke the Function
-- Pass a brick color and position when invoking the function
local newPart = remoteFunction:InvokeServer(BrickColor.Red(), Vector3.new(0, 25, 0))
print("The server created the requested part:", newPart)
```

```lua title='Script in ServerScriptService'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local remoteFunction = ReplicatedStorage:WaitForChild("RemoteFunctionTest")

-- Script in ServerScriptService to create a Part with the passed properties
local function createPart(player, partColor, partPosition)
	print(player.Name .. " requested a new part")
	local newPart = Instance.new("Part")
	-- Use partColor and partPosition to set the part's BrickColor and Position
	newPart.BrickColor = partColor
	newPart.Position = partPosition
	newPart.Parent = workspace
	return newPart
end

-- Bind createPart() to the remote function's OnServerInvoke callback
remoteFunction.OnServerInvoke = createPart
```

<h5 id="server-to-client-to-server">Server to Client to Server</h5>

You can use a `Class.Script` to call a function on the client by calling the `Class.RemoteFunction:InvokeClient()|InvokeClient()` method on a `Class.RemoteFunction`, but it has the following **serious risks**:

<Alert severity="error">
If the client throws an error, the server throws the error too.
</Alert>
<Alert severity="error">
If the client disconnects while it's being invoked, then `Class.RemoteFunction:InvokeClient()|InvokeClient()` throws an error.
</Alert>
<Alert severity="error">
If the client doesn't return a value, the server yields forever.
</Alert>

For actions that don't require two-way communications, such as updating a GUI, use a `Class.RemoteEvent` and communicate from the [server to client](#server-to-client).

## Argument Limitations

When an event is fired or invoked, it forwards any arguments that you pass with it or to the callback function. For built-in events, follow the argument limitations on the API reference. For custom events and networking events, though the arguments can be all types of Roblox objects and Luau date types such as numbers, strings, and booleans, there are certain limitations that apply to the arguments.

### Non-String Indices

If any **indices** of a passed table are non-string types such as an `Class.Instance`, [userdata](../luau/userdata.md), or [function](../luau/functions.md), Roblox automatically converts those indices to strings.

```lua highlight='7,14'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local bindableEvent = ReplicatedStorage:WaitForChild("BindableEvent")

local function onEventFire(passedTable)
	for k, v in passedTable do
		print(typeof(k))  --> string
	end
end
bindableEvent.Event:Connect(onEventFire)

-- Fire event with a table containing a workspace instance as a key
bindableEvent:Fire({
	[workspace.Baseplate] = true
})
```

### Functions in Remotes

Functions referenced as arguments in a `Class.RemoteEvent` or `Class.RemoteFunction` will **not** be replicated across the [client-server](../projects/client-server.md) boundary, making it impossible to pass functions remotely. Instead, the resulting argument on the receiving side will be `nil`.

```lua title='Script' highlight='10'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

local function testFunction()
	print("Hello world!")
end

-- Fire remote event with function as an argument
remoteEvent:FireAllClients(testFunction)
```

```lua title='LocalScript' highlight='6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

local function onClientEvent(func)
	print(func)  --> nil
end

remoteEvent.OnClientEvent:Connect(onClientEvent)
```

### Mixed Tables

If you pass a table with a mix of numeric and string keys, the values indexed by string keys are lost. In the following code sample, `colorData` is a mixed table. When the server receives `colorData`, it receives only indices `[1]` and `[2]` containing `"Blue"` and `"Yellow"`. The remaining data is lost.

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

-- Mixed table
local colorData = {}
colorData[1] = "Blue"
colorData[2] = "Yellow"
colorData["Color1"] = "Green"
colorData["Color2"] = "Red"

-- Table with two key-indexed sub-tables
local playerData = {}
playerData["CharData"] = {
	-- All children indexed by key
	CharName = "Diva Dragonslayer",
	CharClass = "Knight"
}
playerData["Inventory"] = {
	-- All children numerically indexed
	"Sword",
	"Bow",
	"Rope"
}

remoteEvent:FireServer(colorData)
remoteEvent:FireServer(playerData)
```

<Alert severity="info">
You don't need to index subtables in the same way as their parents. As long as you index each subtable with the same type, Roblox preserves the data.
</Alert>

### Table Identities

Tables passed as arguments to custom events are copied, meaning they will not be exactly equivalent to those provided when firing an asynchronous event or invoking a synchronous event. Tables returned to the invoker will also be copied and not equivalent to those provided. You can demonstrate this by running the following script on a `Class.BindableFunction` and observing how the table identities differ.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local bindableFunction = ReplicatedStorage:WaitForChild("BindableFunction")

bindableFunction.OnInvoke = function(passedTable)
	print(tostring(passedTable))
	return passedTable
end

local testTable = {message = "Hello world!"}
print(tostring(testTable))

local invokeReturn = bindableFunction:Invoke(testTable)
print(tostring(invokeReturn))
```

<table size="small">
<tbody>
  <tr>
    <td>Original Identity</td>
    <td>`table: 0xf775b8bcc5e44cce`</td>
  </tr>
  <tr>
    <td>Identity on Invocation</td>
    <td>`table: 0x03b4045c4f99ec0f`</td>
  </tr>
  <tr>
    <td>Identity on Return</td>
    <td>`table: 0x11f690dfe56daf6e`</td>
  </tr>
</tbody>
</table>

### Empty Indices

If a table has numeric indices, and one of the values is `nil`, that index **and** its subsequent indices are lost. In the following code example, the `message` table has <Typography noWrap>`[3] = nil`</Typography>, so that index and <Typography noWrap>`[4] = "Goodbye world!"`</Typography> are lost in the transmission.

```lua title='Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

local message = {
	[1] = "Hello",
	[2] = "world!",
	[3] = nil,
	[4] = "Goodbye world!"
}

remoteEvent:FireAllClients(message)
```

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

local function onClientEvent(param)
	print(param)  --> [1] = "Hello", [2] = "world!"
end

remoteEvent.OnClientEvent:Connect(onClientEvent)
```

### Metatables

If a table has a metatable, all of the metatable information is lost in the transfer.

In the following code sample, the `NumWheels` property is part of the `Car` metatable. When the server receives the following table, the `truck` table has the `Name` property but not the `NumWheels` property.

```lua title='Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

local Car = {}
Car.NumWheels = 4
Car.__index = Car

local truck = {}
truck.Name = "MyTruck"
setmetatable(truck, Car)

remoteEvent:FireAllClients(truck)
```

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

local function onClientEvent(param)
	print(param)  --> {["Name"] = "MyTruck"}
end

remoteEvent.OnClientEvent:Connect(onClientEvent)
```

### Non-Replicated Instances

If an event or function passes a value that's only visible to the sender, Roblox doesn't replicate it across the client-server boundary and passes `nil` instead of the value. For example, if a `Class.Script` tries to pass a descendant of `Class.ServerStorage`, the client listening to the event receives a nil value because that object isn't replicable for the client.

```lua title='Script'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerStorage = game:GetService("ServerStorage")
local Players = game:GetService("Players")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

-- Will be received as "nil" because client can't access ServerStorage
local storedPart = Instance.new("Part")
storedPart.Parent = ServerStorage

local function onPlayerAdded(player)
	remoteEvent:FireClient(player, storedPart)
end
Players.PlayerAdded:Connect(onPlayerAdded)
```

Similarly, if you create a part in a `Class.LocalScript` and try to pass it to a `Class.Script`, the server sees `nil` because the part isn't replicable for the server.

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteEvent = ReplicatedStorage:WaitForChild("RemoteEvent")

-- Will be received as "nil" because the server doesn't know about this part
local clientPart = Instance.new("Part")
clientPart.Parent = workspace

remoteEvent:FireServer(clientPart)
```
