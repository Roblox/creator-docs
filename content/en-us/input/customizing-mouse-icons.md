---
title: Customizing Mouse Icons
description: Explains the process of customizing the appearance and behavior of a user's mouse icon within your experience.
---

You can customize the appearance and behavior of a user's mouse icon within your experience to create a cohesive style across all of your UI elements. This includes temporarily changing the user's mouse icon in specific circumstances, such as clicking a button or while the mouse hovers over another user.

## Changing Mouse Icons

You can change the user's mouse icon in a `Class.LocalScript` by setting the `Class.UserInputService.MouseIcon|MouseIcon` property in `Class.UserInputService` to a custom Roblox asset ID. For example, the following `Class.LocalScript` changes the user's default mouse icon to a black circle with a blue dot in the middle:

```lua
local UserInputService = game:GetService("UserInputService")
UserInputService.MouseIcon = "rbxassetid://3400146391"
```

Because the mouse icon is set in a `Class.LocalScript`, each user can have a different icon, or can have an icon appear in certain situations, such as when an ability is recharging or the mouse is hovering over a hostile target.

## Hiding Mouse Icons

You can hide the user's mouse icon by setting the `Class.UserInputService.MouseIconEnabled` to `false` in a `Class.LocalScript`. For example, the following code switches the mouse icon from visible to invisible and back every two seconds:

```lua
local UserInputService = game:GetService("UserInputService")

while true do
	task.wait(2)
	UserInputService.MouseIconEnabled = false
	task.wait(2)
	UserInputService.MouseIconEnabled = true
end
```

## Locking Mouse Icon Positions

You can lock the mouse icon position to the screen using `Class.UserInputService.MouseBehavior` with a value of `Enum.MouseBehavior|MouseBehavior.LockCurrentPosition` or `Enum.MouseBehavior|MouseBehavior.LockCenter`. When you set this property back to `Enum.MouseBehavior|MouseBehavior.Default`, the mouse icon unlocks and can move anywhere on the screen again.

If a user's mouse icon is locked in a position, `Class.UserInputService.InputChanged` still fires when the user moves the mouse, passing in the distance the mouse has moved. For example, the following code sample locks the user's mouse icon after one second, then Studio prints the mouse delta whenever the user moves their mouse:

```lua
local UserInputService = game:GetService("UserInputService")

task.wait(1)

UserInputService.MouseBehavior = Enum.MouseBehavior.LockCurrentPosition

UserInputService.InputChanged:Connect(function(inputObject)
	if inputObject.UserInputType == Enum.UserInputType.MouseMovement then
		print("Mouse delta is (" .. tostring(inputObject.Delta.X) .. ", " ..  tostring(inputObject.Delta.Y) .. ")")
	end
end)
```
