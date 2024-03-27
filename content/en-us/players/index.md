---
title: Users and Players
description: The Player instance contains information on the individual users within your experience.
---

When a user joins an experience, Roblox represents them as a **Player** in the data model. The `Class.Player` object contains information about the user that's universal across experiences, such as their username, friend list, saved [avatar character](../characters/index.md#avatar-characters), and Roblox membership type, as well as properties, methods, and events that affects the user's lifecycle between joining and leaving your experience.

The `Class.Players` service contains all the `Class.Player` instances in an experience. Each `Class.Player` object represents a user in the experience, and it parents four important containers that you can use to customize a user's experience: `Class.Backpack`, `Class.StarterGear`, `Class.PlayerGui`, and `Class.PlayerScripts`.

## Lifecycle

Client and server-side scripts can both connect to the `Class.Players.PlayerAdded` and `Class.Players.PlayerRemoved` events to perform actions in response to the lifecycle of a `Class.Player` object. They can also connect to the `Class.Player.CharacterAdded`, `Class.Player.CharacterRemoving`, and `Class.Humanoid.Died` events to perform gameplay-related actions for when the character spawns, despawns, and dies.

Use Scripts to access server-related services, such as a data store to retrieve and save data when a user joins or leaves. Use LocalScripts if the client needs to create and remove gameplay instances tied to the new user, such as a GUI display for the user's stats on a custom leaderboard.

### User Joining

When a client connects to an experience, its associated `Class.Player` object clones to the `Class.Players` service. The `Class.Players.PlayerAdded` represents users joining the experience. Some example use-cases include loading user data, assigning teams, and changing a user's character's clothing. The `Class.Players.PlayerAdded` event passes the `Class.Player` object of the user who joins, which you can use when calling other functions, such as data store and `Class.RemoteEvent` objects.

#### Loading User Data on Join

To load a user's data when they join an experience, use the `Class.Players.PlayerAdded` event in a `Class.Script`. The following example `Class.Script` listens to the event and attempts to retrieve a user's data using their user ID as the datastore key. After successfully retrieving the user data, you can use it to load the user's progress and stats.

```lua Script in ServerScriptService
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

game:GetService("Players").PlayerAdded:Connect(function(player)
	local userId = player.UserId

	-- Read data store key
	local getSuccess, currentData = pcall(function()
		return playerDataStore:GetAsync(userId)
	end)

	if getSuccess then
		print(currentData)
	end

	-- Do further actions with currentData
end)
```

<Alert severity = 'info'>
The `Class.Instance.Name` of the `Class.Player` object is the name of the user. If you need a unique reference to a user, such as to save information about them in a [data store](../cloud-services/datastores.md), use their `Class.Player.UserId` instead of their `Class.Player.Name` because users can't change their `UserId` even though they can change their Username and Display Name.
</Alert>

### User Leaving

When a client disconnects from an experience, the server destroys its associated `Class.Player` object from the `Class.Players` service. The `Class.Players.PlayerRemoving` event represents users leaving the experience. Some example use-cases include saving user data, removing their stats from a scoreboard, and destroying any of their models, such as their house. The `Class.Players.PlayerRemoving` event passes the `Class.Player` object of the user who leaves, which you can use when calling other functions, such as data store and `Class.RemoteEvent` objects.

Notice that the event is called `Class.Player.PlayerRemoving`, not `Class.Player.PlayerRemoved`, because "removed" would imply that the `Class.Player` object is already removed and is therefore inaccessible to scripts.

#### Saving User Data on Leave

To save a user's data when they leave an experience, use the `Class.Players.PlayerRemoving` event in a `Class.Script`. The following example `Class.Script` listens to the event and attempts to save a user's data using their user ID as the data store key.

```lua title='Script in ServerScriptService'
local DataStoreService = game:GetService("DataStoreService")
local playerDataStore = DataStoreService:GetDataStore("PlayerData")

game:GetService("Players").PlayerRemoving:Connect(function(player)
	local userId = player.UserId

	-- Get the player's data state in the game
	local currentData = getCurrentData(player)

	-- Save to data store
	local setSuccess, errorMessage = pcall(function()
	    playerDataStore:SetAsync(userId, currentData)
	end)

	if not setSuccess then
	    warn(errorMessage)
	end
end)

```

### Character Spawning

A user's `Class.Player.Character` model represents their avatar. By default, `Class.Player.CharacterAutoLoads` is true, and a user's character model automatically spawns when they join the experience. If `Class.Player.CharacterAutoLoads` is false, then you need to call `Class.Player:LoadCharacter()` to manually spawn the character.

When a user's `Class.Player.Character` spawns, Scripts and LocalScripts in `Class.StarterCharacterScripts` clone into the character model and the `Class.Player.CharacterAdded` event fires.
The `Class.Player.CharacterAdded` event passes the new character model to any event listeners, which you can use to find the character's `Class.Humanoid` object and modify its behavior. For example, you can use `Class.Humanoid:ApplyDescription()` to change the outfit of the avatar and `Class.Humanoid.WalkSpeed` or `Class.Humanoid.JumpHeight` to modify the avatar's movement.

### Character Despawning

When the player's `Class.Humanoid` dies, its body parts fall to the ground and the `Class.Humanoid.Died` event fires. The server automatically removes the character model and any scripts inside it after amount of time that the `Class.Players.Respawntime` property determines. You can use the `Class.Player.CharacterRemoving` event to reset other objects associated with the character, such as the network ownership of a vehicle they were driving.

#### Counting Player Deaths

You can use the `Class.Humanoid.Died` event to handle scoring for a kill or create a custom ragdoll model. The following `Class.Script` connects to `Class.Player.CharacterAdded` to retrieve each user's character model, then connects to the character's `Class.Humanoid` object. When the humanoid's `Class.Humanoid.Died` event fires, the script increments the number of times the user's humanoid has died and outputs that number.

```lua title='Script in ServerScriptService'
game:GetService("Players").PlayerAdded:Connect(function(player)
	local deaths = 0
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.Died:Connect(function()
			deaths += 1
			print(`{player.Name} death count: {deaths}`)
		end)
	end)
end)
```

## Containers

The `Class.Player` object stores several important containers:

- [Backpack](#backpack)
- [StarterGear](#startergear)
- [PlayerGui](#playergui)
- [PlayerScripts](#playerscripts)

### Backpack

The `Class.Player.Backpack` container stores the user's inventory. The `Class.Tool` objects in a user's `Class.Backpack` display in their inventory at the bottom of their screen. If a user selects a `Class.Tool` from the inventory, they equip it, and it moves from the `Class.Player.Backpack` to the `Class.Player.Character`.

When a user's `Class.Player.Character` spawns, the contents of the `Class.StarterPack` service and their `Class.Player.StarterGear` clones to their `Class.Player.Backpack`. When the character dies, the client destroys their `Class.Backpack` and replaces it with a new one.

The `Class.Backpack` also stores and runs `Class.Script|Scripts` and `Class.LocalScript|LocalScripts` that the client and server can both access.

Roblox provides an interface for a player to access their `Class.Backpack` and inventory at the bottom of the screen. To disable the default Roblox backpack GUI and replace it with your own, call `Class.StarterGui:SetCoreGuiEnabled()` in a LocalScript. For more information, see `Class.StarterGui`.

### StarterGear

The `Class.StarterGear` container clones its contents to the user's `Class.Player.Backpack` when its character spawns. Additionally, if your place permits gear and a user owns gear, the `Class.Tool` objects of their gear clone to their `Class.Player.StarterGear` when they spawn.

Unlike `Class.StarterPack`, `Class.Player.StarterGear` isn't a service but rather a child of each `Class.Player` object, so its contents are user-specific. Each user can have different `Class.Tool` objects within their `Class.Player.StarterGear`. To use `Class.Player.StarterGear`, enable Gear in your experience's settings page under **Permissions**. On the permissions page, you can enable by gear by its type. To disable gear, deselect its type.

Always test games after adding Gear to them to check that users can't easily abuse them there. Gear includes `Class.Script` objects and allows the player to perform actions that you might not consider. For example, a navigational gear might allow the player to access a part of the map that you don't want them to. Weapons allow players with gear to damage other players, possibly without retribution or retaliation.

### PlayerGui

The `Class.PlayerGui` container stores objects that create the player's GUI. If a ScreenGui is a descendant of a `Class.PlayerGui`, then any `Class.GuiObject` inside the ScreenGui displays on the player's screen. Any `Class.LocalScript` runs when it clones to `Class.PlayerGui`. When the player's `Class.Player.Character` spawns for the first time, all of the contents of StarterGui automatically copy into the player's `Class.PlayerGui`.

If Players.CharacterAutoLoads is set to false, the character doesn't spawn, and `Class.StarterGui` contents don't copy over until `Class.Player:LoadCharacter()` is called. If `Class.StarterGui.ResetPlayerGuiOnSpawn` is set to true, every time the player's character respawns, all of the contents of that player's `Class.PlayerGui` are cleared and replaced with the contents of `Class.StarterGui`.

### PlayerScripts

When a user joins the experience, the contents in `Class.StarterPlayer.StarterPlayerScripts` container clone to `Class.PlayerScripts`. Any LocalScripts and ModuleScripts run when they clone.

Unlike the `Class.Backpack` and `Class.PlayerGui` containers, the `Class.PlayerScripts` container isn't accessible to the server, and a user's `Class.PlayerScripts` container doesn't reset when their character dies and respawns. Server-side `Class.Script` objects also don't run when parented to `Class.PlayerScripts`. The `Class.PlayerScripts` container is useful for scripts that aren't tied to a user's character life cycle, such as the general chat system or player input controls.
