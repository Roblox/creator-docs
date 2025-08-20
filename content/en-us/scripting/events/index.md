---
title: Events
description: Provides an overview of events and a summary of Roblox's built-in events.
---

Events are occurrences within your experience that you can listen for and respond to. Many Roblox services and objects have built-in events that automatically **fire** in response to specific actions or changes.

For example, a player's `Class.Player.Character|Character` touching a `Class.BasePart` automatically fires a `Class.BasePart.Touched|Touched` event. Each time a player joins your experience, the `Class.Players.PlayerAdded` event fires.

Due to the sheer number of events and client-server architecture, Roblox scripting is often referred to as **event-driven**. This approach is different from many other game engines, which emphasize running code on a frame-by-frame basis.

You don't have to listen for events or take any action in response to them, but the events are firing and available nevertheless. When you do want to respond to an event, you connect a function to it.

<Alert severity="info">
Deferred events can help you ensure more performant and consistent event handling. See [here](deferred.md) for more information.
</Alert>

## Connect functions to events

You connect a function to an event using `Datatype.RBXScriptSignal.Connect()|Connect()` to execute code each time the event fires. Most events pass arguments to their connected functions. For example, the `Class.BasePart.Touched` event passes the object that touched the part (such as a left hand or car wheel), and the `Class.Players.PlayerAdded` event passes the `Class.Player` that joined your experience.

The following code sample demonstrates how to connect a function named `onPartTouched()` to the `Class.BasePart.Touched|Touched` event of a part:

```lua
-- Assumes the script is parented to the part
local part = script.Parent

-- The function you want to run
local function onPartTouched(object)
	print("Part was touched by", object:GetFullName())
end

-- Connect the function to the part's Touched event
part.Touched:Connect(onPartTouched)
```

<Alert severity="success">
As a best practice and for optimal performance, it's recommended that you [disconnect](#disconnect-functions-from-events) functions when the connection is no longer needed. Note, however, that this may not **always** be necessary, as all connections to an object's [non-deferred](deferred.md) events are automatically disconnected if an object is destroyed.
</Alert>

You can also connect [anonymous functions](../../luau/functions.md#anonymous-functions) to events when you want to use variables in the parent scope and don't need to use the function elsewhere. For example, this code sample avoids the awkward intermediary function from the similar sample in [Services](../services.md):

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SaveManager = require(ReplicatedStorage:WaitForChild("SaveManager"))

local function saveProgress(character)
	local position = character:FindFirstChild("HumanoidRootPart").Position
	SaveManager.saveData(character, position)
end

-- Anonymous function that calls saveProgress() when a character is removed
-- from the experience (in this case, when the player leaves).
Players.PlayerAdded:Connect(function(player)
	player.CharacterRemoving:Connect(saveProgress)
end)
```

## Disconnect functions from events

The `Datatype.RBXScriptSignal.Connect()|Connect()` method returns an `Datatype.RBXScriptConnection` object. If you connect a function to an event, but don't want to call the function the next time an event fires (such as after some condition is met), disconnect it by calling `Datatype.RBXScriptConnection:Disconnect()|Disconnect()` on the `Datatype.RBXScriptConnection` object.

The following code sample shows how to connect and disconnect a function from the `Class.BasePart.Touched|Part.Touched` event:

```lua
local Workspace = game:GetService("Workspace")

local part = Workspace.Part
local targetPart = Workspace.TargetPart

-- Declare an empty placeholder variable for the connection
local connection

local function onPartTouched(otherPart)
	if otherPart == targetPart then
		print("The part hit the target!")
		-- Disconnect the connection
		connection:Disconnect()
	end
end

-- Connect the above function to the Touched event
connection = part.Touched:Connect(onPartTouched)
```

<Alert severity="success">
If you only want to connect a function to an event once&nbsp;— that is, only run the function the first time the event fires&nbsp;— use the `Datatype.RBXScriptSignal.Once()|Once()` method as a more convenient alternative to connecting and disconnecting the function.
</Alert>

<Alert severity="info">
When Luau destroys an event's object, such as the `Class.Player` object when a user leaves the experience, all of its [non-deferred](deferred.md) connections disconnect automatically.
</Alert>

## Wait for events to fire

If you want a script to yield until a specific event fires, use the `Datatype.RBXScriptSignal:Wait()|Wait()` method. This method returns the event's arguments, which you can assign to variables for later use:

```lua
local Workspace = game:GetService("Workspace")

local part = Workspace.Part
local touchedPart = part.Touched:Wait()
print("The part was touched by", touchedPart:GetFullName())
```

## Other types of events

- [Bindable events](bindable.md) let you communicate between scripts on the **same side** of the client-server boundary.

- [Remote events](remote.md) let you communicate **across** the client-server boundary.

- [Deferred engine events](deferred.md) defer event handlers until certain resumption points.
