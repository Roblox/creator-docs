---
title: Admin Commands
description: Create custom admin commands for the deprecated legacy chat.
comments: |
  1. This guide is intentionally not available in the nav list, but still searchable for users who want to use the legacy chat system.
---

<Alert severity="error">
  This guide covers admin commands of the legacy chat system, which is deprecated and no longer onboarding new users in favor of `Class.TextChatService` with easier and more modern chat settings. If you are using the default chat system powered by `Class.TextChatService`, see <a href="../../chat/customizing-in-experience-text-chat.md#creating-custom-commands">In-Experience Text Chat</a> for creating custom chat commands.
</Alert>

An **admin command** is a keyword or phrase that a user with certain level of control can type into the chat window to trigger an action. This library uses chat modules, which allows for easy implementation of admin commands on top of the legacy chat system. Chat modules listen to incoming messages on the server and can execute actions based on whatever criteria is desired.

## Setup

Whenever a Roblox place loads it checks if the Chat service is empty. If it does not find the components it needs, the place will insert the latest version of those components. This means that overwriting or making changes to these components in an experience will prevent them from being updated.

The first step in setting up the admin commands library is to add a new Chat Module to the Chat service. The library in this tutorial takes care of the heavy lifting done by a Chat Module so the only object you need to add to the Chat service is a new `Class.ModuleScript` . The name of your module script can be anything, but I suggest something intuitive like `AdminCommands`.

## Implementing New Commands

Rather than implementing most of the Chat Module logic you will simply require the library module that does a bulk of the work and adds extra functionality. The simplest way to add the library into your module is to require it by its assetId at the top of your script.

```lua
​local AdminCommands = require(1163352238)
```

This Module returns a table of functions, with the `Run` function as the most important one. The library has a `Run` function for its Chat module. It is important that AdminCommands returns this `Run` function to the Chat Service. The function is indexed by its name, `Run`, and you can return the following as if `Run` was a property of our AdminCommands table representation:

```lua
return AdminCommands.Run
```

Between these two lines of code, implement your own commands and any necessary helper functions.

In order to bind a function to the library, use the `BindCommand` function of `AdminCommands`. When binding a command you will need to specify a table of keywords that, when spoken, will trigger the command, the function that will be triggered, a priority level, and optionally, a description of the command. If you do not specify a privilege level it will default to 0. Priority levels are numerical values used by the `AdminCommands` library to assign a hierarchy of permission amongst users with corresponding levels of granted privilege. When executing a command the speaker must have a privilege level that is greater than or equal to that of the command [Permission Library](#permission-library).

```lua
AdminCommands:BindCommand({"keyword1", "keyword2"}, commandName, 1, "Optional description")
```

To unbind you would likewise use `UnbindCommand` and specify a keyword to unbind.

```lua
AdminCommands:UnbindCommand({"keyword1"})
```

Altogether, the content of your AdminCommands script should look like the following:

```lua
local AdminCommands = require(1163352238)
local Utilities = AdminCommands.Utilities

function commandFunction(commandData)
	// Command code here
	-- Returns true if successful and false otherwise
end

AdminCommands:BindCommand({"keyword1", "keyword2"}, commandFunction, 1, "Optional description")

return AdminCommands.Run
```

You may notice that the example function takes a parameter named `commandData`. This parameter is a table argument passed along to all bound admin command functions when executed by the library. The table contains useful information about the command that was spoken and the user who spoke it. It has the following fields:

- Speaker: `ChatSpeaker`
- Message: `string`
- ChannelName: `string`
- Command: `string`

It is important to always expect `commandData` as a parameter of command functions. For example, if you have a command named "explode", which requires a `Class.Player` parameter to be specified, the function would look like explode(commandData, user).

<Alert severity="info">
Every command function is passed `commandData` as the parameter. If you are using any other number of parameters it is still important to pass `commandData` first, even if you are just using the other parameters.
</Alert>

| Function        | Parameters                                                                                       | Return |
| --------------- | ------------------------------------------------------------------------------------------------ | ------ |
| **Commands:**   |                                                                                                  |        |
| BindCommand()   | table functionIDs, function functionToExecute, number minimumPermissionLevel, string description | bool   |
| UnbindCommand() | table functionIDs                                                                                | bool   |
| GetCommands()   |                                                                                                  | table  |

## Utilities

The library already has a few built-in helper functions called Utilities that you can use. Store AdminCommand.Utilities in a variable or reference it directly.

```lua
local Utilities = AdminCommands.Utilities
```

Current utility functions are:

| Function                   | Parameters                                         | Return |
| -------------------------- | -------------------------------------------------- | ------ |
| **Chat window messages:**  |                                                    |        |
| SendSystemMessage()        | table commandData, string content, table extraData | bool   |
| SendSystemSuccessMessage() | table commandData, string content                  | bool   |
| SendSystemWarningMessage() | table commandData, string content                  | bool   |
| SendSystemErrorMessage()   | table commandData, string content                  | bool   |
| **Error handlers:**        |                                                    |        |
| NoPlayerSpecified()        | table commandData                                  | bool   |
| NotEnoughSpecified()       | table commandData                                  | bool   |
| IncorrectValueType()       | table commandData, string given, string expected   |        |
| **Object lookups:**        |                                                    |        |
| **Data conversion:**       |                                                    |        |
| ToTupple(parameter)        | string parameter                                   | array  |
| ToBoolean()                | string parameter                                   | bool   |
| ValidateData()             | string expectedType, ...                           | bool   |

## Example Commands

A useful command to have would be one that prints a list of all optional commands that users have available. This command outputs each command bound to the library and a few of its properties.

```lua
​-- Prints a list of all bound commands

function listCommand(commandData)

	Utilities:SendSystemMessage(commandData, "The following commands are available:")

	-- Iterate through the every command and print it out

	for id, command in PublicAPI:GetCommands() do

		Utilities:SendSystemMessage(commandData, string.format("'/s' requires permission s.", id, command.Permission))

	end

	return true

end, 1)

AdminCommands:BindCommand({"list"}, listCommand, 0, "Prints a list of commands.")
```

Another helpful command allows users to give themselves sparkles. This command requires one parameter when spoken – the targeted user's name. If the user exists, the command will create a Sparkles object in the HumanoidRootPart of that user.

```lua
-- Gives a specified player's character sparkles
function sparklesCommand(commandData)
	 -- Error if no parameters are given/spoken
	if #commandData.Parameters == 0 then
		return Utilities:NoPlayerSpecified(commandData)
	end
	-- Loop through the parameters (execute on every given player's name)
	for index = 1, #commandData.Parameters do
		local parameter = commandData.Parameters[index]
		if (parameter == "me" or parameter == "") then parameter = commandData.Speaker.Name end -- If the parameter is me then the user must be referring to themselves

		-- Use a helper function to find the player's character and add the sparkles
		local character = Utilities:GetCharacter(parameter)
		if character then
			local sparkles = Instance.new("Sparkles")
			sparkles.Parent = character:FindFirstChild("HumanoidRootPart")

			Utilities:SendSystemSuccessMessage(commandData, string.format(commandData.Speaker.Name .. "added sparkles to " .. parameter))
		else
			Utilities:SendSystemErrorMessage(commandData, string.format("'s' is not a valid player.", parameter))
			return false
		end
	end
	return true

end

AdminCommands:BindCommand({"sparkles"}, sparklesCommand, 1, "Gives the specified player sparkles")
```

You can also include an explosion command from the Created an Admin Command tutorial. This command also takes a user's name as a parameter.

```lua
-- Verifies that the given model is a Character and adds an explosion to its HumanoidRootPart
local function makeExplosion(character)
	if character and character:FindFirstChild("HumanoidRootPart") then
			local explosion = Instance.new("Explosion")
			explosion.Position = character.HumanoidRootPart.Position
			explosion.Parent = character.HumanoidRootPart
			return true
	end
	return false
end

-- Makes a specified player's character explode
function explodeCommand(commandData)
	 -- Error if no parameters are given/spoken
	if #commandData.Parameters == 0 then
		return Utilities:NoPlayerSpecified(commandData)
	end
	for index = 1, #commandData.Parameters do
		local parameter = tostring(commandData.Parameters[index])
		if (parameter == "me" or parameter == "") then parameter = commandData.Speaker.Name end -- If the parameter is me then the user must be referring to themselves

		-- Use a helper function to find the player's character and add the explosion
		local character = Utilities:GetCharacter(parameter)

		local success = makeExplosion(character)

		if success then
			Utilities:sendSystemSuccessMessage(commandData, string.format(commandData.Speaker.Name .. " made" .. parameter .. " explode."))
		else
			Utilities:SendSystemErrorMessage(commandData, string.format("'s' is not a valid player.", parameter))
			return false
		end
	end
	return true
end

AdminCommands:BindCommand({"explode"}, explodeCommand, 1, "Makes the specified player explode.")
```

## Permission Library

If a non-admin tries to speak a command like this, which has a higher permission level than 0, it will not be triggered. The command system uses a separate Permission library, to which the experience creator is automatically given the permission level math.huge. Admins can be added using the following functions on your AdminCommands module object:

```lua
SetUserPermission(number requesterUserId, number targetUserId, permissionLevel) -> bool
SetGroupRankPermission(number requesterUserId, number targetGroupId, number targetRankId, permissionLevel) -> bool
```

| Function                     | Parameters                                                                         | Return |
| ---------------------------- | ---------------------------------------------------------------------------------- | ------ |
| **Permission**               |                                                                                    |        |
| GetAdmins()                  |                                                                                    | table  |
| SetUserPermission()          | number requesterUserId, number targetUserId, permissionLevel                       | bool   |
| GetUserPermission()          | number userId                                                                      | number |
| GetGroups()                  |                                                                                    | table  |
| SetGroupRankPermission()     | number requesterUserId, number targetGroupId, number targetRankId, permissionLevel | bool   |
| GetGroupRankPermission()     | targetGroupId, targetRankId                                                        | int    |
| GetUserGroupRankPermission() | number userId                                                                      | int    |

## Quick-Start Module

For easier setup you can also use this [Quick Start](https://www.roblox.com/library/1163353653/Quick-Start-Admin-Commands), which is a module that has already implemented the Admin Commands library. The model is a module with the same format as described above. Additionally, the module has a few commands already included so that you do not have to re-implement.

| Command/Binding                  | Spoken Parameter                 |
| -------------------------------- | -------------------------------- |
| "list", "commands"               | username                         |
| "sparkles"                       | username                         |
| "sparkles"                       | username                         |
| "unforcefield", "unff"           | username                         |
| "explode"                        | username                         |
| "respawn"                        | username                         |
| "part"                           | Path (i.e. experience.Workspace) |
| "freeze"                         | username                         |
| "unfreeze"                       | username                         |
| "add"                            | username                         |
| "remove"                         | username                         |
| "kick"                           | username                         |
| "setuserpermission", "sup"       | userId, permission               |
| "setgrouprankpermission", "sgrp" | groupid, rankId, permission      |
