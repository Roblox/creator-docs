---
title: Built-In Events
description: Explains how to use built-in events by connecting functions to them or waiting until they fire.
---

Many objects have built-in events provided by their APIs that automatically
respond to specific actions or changes related to those objects. For example, a
player's `Class.Player.Character|Character` touching a `Class.BasePart` automatically fires a `Class.BasePart.Touched|Touched` event. Most built-in events are synchronous, so you can connect a function to follow custom behaviors in response to an event.

<Alert severity="info">
If you need to implement a custom event that's not available through an existing built-in event, see [Custom Events and Callbacks](../../scripting/events/custom.md).
</Alert>

## Connecting Functions to Events

You can connect a function to an event using `Datatype.RBXScriptSignal.Connect()|Connect()` to execute code each time the event fires. Most events pass arguments to their connected functions when they fire; for example, the `Class.BasePart.Touched` event passes the object that touched the `Class.Part`, and the `Class.Players.PlayerAdded` event passes the `Class.Player` that joined your experience.

The following code sample demonstrates how to connect a function named `onPartTouched()` to the `Class.BasePart.Touched|Touched` event of a `Class.BasePart` in the `Class.Workspace`.

```lua title='Script'
local part = workspace.Part

local function onPartTouched(object)
	print("Part was touched by", object:GetFullName())
end

-- Connect the above function to the Touched event
part.Touched:Connect(onPartTouched)
```

You can also connect [anonymous functions](../../luau/functions.md#anonymous-functions) to events when you want to use variables in the parent scope and you don't need to use the function elsewhere. The following code sample shows how to connect an anonymous function to the `Class.Players.PlayerAdded` event.

```lua title='Script'
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
	print(player.Name, " joined the experience!")
end)
```

## Disconnecting Functions from Events

In Luau, the `Datatype.RBXScriptSignal.Connect()|Connect()` method returns an `Datatype.RBXScriptConnection` object. If you connect a function to an event but don't want the function called in subsequent event firings, disconnect it from the event by calling `Datatype.RBXScriptConnection:Disconnect()|Disconnect()` on the `Datatype.RBXScriptConnection` object.

The following code sample shows how to connect and disconnect a function to/from the `Class.BasePart.Touched|Part.Touched` event.

```lua title='Script'
local part = workspace.Part
local targetPart = workspace.TargetPart

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

<Alert severity="info">
When Luau destroys an event's object, such as the `Class.Player` object when a user leaves the experience, all of its connections disconnect automatically.
</Alert>

## Waiting for Events to Fire

If you want a script to yield until a specific event fires, use the `Datatype.RBXScriptSignal:Wait()|Wait()` method. This method returns the event's arguments which you can assign to variables, such as `touchedPart` in the following example.

```lua title='Script'
local part = workspace.Part
local touchedPart = part.Touched:Wait()
print("The part was touched by", touchedPart:GetFullName())
```
