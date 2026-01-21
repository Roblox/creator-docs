---
title: include
---

The following Luau code sample demonstrates how to, after a player equips a fishing pole, listen for user input (in this case, the <kbd>E</kbd> key) and call additional functions:

```lua
local ContextActionService = game:GetService("ContextActionService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Get a module script from ReplicatedStorage that returns a single function
local performSomeAction = require(ReplicatedStorage.performSomeAction)

-- Assumes that this script is a child of the fishing pole
local fishingPole = script.Parent
local ACTION_CAST = "Cast"

-- Check that the key is down, then call another function
local function castLine(_actionName, inputState, _inputObject)
	if inputState == Enum.UserInputState.Begin then
		performSomeAction()
	end
end

-- Only enable the action when the player equips the fishing pole
fishingPole.Equipped:Connect(function()
	ContextActionService:BindAction(ACTION_CAST, castLine, true, Enum.KeyCode.E)
end)

-- Disable the action when the player unequips the fishing pole
fishingPole.Unequipped:Connect(function()
	ContextActionService:UnbindAction(ACTION_CAST)
end)
```
