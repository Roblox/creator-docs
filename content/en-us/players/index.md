---
title: Users and players
description: How users, players, and characters work together in a Roblox game.
---

When a Roblox user joins a game, they are represented as a `Class.Player` in the `Class.DataModel`. This `Class.Player` object contains information about the user that's universal across games, such as their username, friend list, and saved [avatar character](../characters/index.md#avatar-characters), as well as properties, methods, and events that affect the user's [lifecycle](#lifecycle) between joining and leaving the game. Each `Class.Player` object also parents four important [containers](#containers) that you can use to customize a user's experience: `Class.Backpack`, `Class.StarterGear`, `Class.PlayerGui`, and `Class.PlayerScripts`.

Each `Class.Player` also exposes a `Class.Player.User` property, which is a `Datatype.User` value representing the player's domain-scoped identity within the current experience. For more information on how user identification works, including domain-scoped user IDs and the `Datatype.User` type, see [Users and domain-scoped user IDs](./users.md).

<img src="../assets/studio/explorer/Players-Player-Hierarchy.png" width="320" />

## Lifecycle

The `Class.Players` service contains all the `Class.Player` instances in a game. Client and server-side scripts can both connect to the `Class.Players.PlayerAdded` and `Class.Players.PlayerRemoved` events to perform actions in response to the lifecycle of a `Class.Player` object. Scripts can also connect to the `Class.Player.CharacterAdded` and `Class.Player.CharacterRemoving` events to perform gameplay-related actions for when the character spawns or despawns.

### User join

When a user client connects to a game, the `Class.Players.PlayerAdded` event fires and passes the `Class.Player` object of the user who joins; you can use this object for numerous purposes such as loading [user data](../cloud-services/data-stores-vs-memory-stores.md) from a data store or assigning the player to a [team](./teams.md).

For example, to load a user's data when they join a game, use the `Class.Players.PlayerAdded|PlayerAdded` event in a `Class.Script` to retrieve the user's data stored in a data store under their user ID:

```lua title="Script in ServerScriptService"
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local playerDataStore = DataStoreService:GetDataStore("PlayerData")

Players.PlayerAdded:Connect(function(player)
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

### Character spawn

By default, a user's `Class.Player.Character` model represents their platform avatar and `Class.Players.CharacterAutoLoads` is `true`, meaning the character model automatically spawns when the user joins a game.

When a user's `Class.Player.Character` spawns, `Class.Script|Scripts` and `Class.LocalScript|LocalScripts` in `Class.StarterCharacterScripts` clone into the character model and the `Class.Player.CharacterAdded` event fires.
This event passes the new character model to its listeners which you can use to find the character's `Class.Humanoid` object and modify its behavior. For example, you can use `Class.Humanoid:ApplyDescription()` to change the outfit of the avatar.

### Character despawn

When the player's `Class.Humanoid` dies, the server automatically removes the character model after the amount of time specified by `Class.Players.RespawnTime`. You can then use the `Class.Player.CharacterRemoving` event to reset other objects or update data associated with the character.

### User leave

When a user client disconnects from a game, the server destroys its associated `Class.Player` object inside the `Class.Players` service. At this point, the `Class.Players.PlayerRemoving` event fires and passes the `Class.Player` object of the user who disconnected. You can use this for numerous purposes such as saving user data, removing player stats from a scoreboard, or destroying player‑created models in the game.

The following example `Class.Script` listens to the `Class.Players.PlayerRemoving|PlayerRemoving` event and attempts to save the user's data in a data store under their user ID:

```lua title="Script in ServerScriptService"
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local playerDataStore = DataStoreService:GetDataStore("PlayerData")

Players.PlayerRemoving:Connect(function(player)
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

## Containers

Each `Class.Player` object representing a user's client stores several important containers: `Class.Backpack`, `Class.StarterGear`, `Class.PlayerGui`, and `Class.PlayerScripts`. At game runtime, several containers in the "edit" data model copy their contents over to these `Class.Player` containers, including `Class.StarterGui` to `Class.PlayerGui`, `Class.StarterPack` to `Class.Backpack`, and `Class.StarterPlayerScripts` to `Class.PlayerScripts`.

<figure>
	<img src="../assets/scripting/client-server/Data-Model-Mapping.png" width="720" alt="A diagram that maps objects between 'edit' and 'runtime' data models." />
</figure>

<Tabs>
<TabItem label="Backpack">
`Class.Tool` objects in the `Class.Backpack` make up the player's inventory and display as icon buttons at the bottom of the screen. See [in‑game tools](./tools.md) for more information.

As illustrated above, the contents of `Class.StarterPack` and the player's `Class.StarterGear` clone to `Class.Backpack` when a player's `Class.Player.Character|Character` spawns. When the character dies, the client destroys the `Class.Backpack` and replaces it with a new one.

To disable the default Roblox inventory GUI and replace it with your own, call `Class.StarterGui:SetCoreGuiEnabled()` in a `Class.LocalScript` as outlined in [disable&nbsp;default&nbsp;UI](./disable-ui.md).
</TabItem>
<TabItem label="StarterGear">
When a player's character spawns, the contents of that player's `Class.StarterGear` are copied into the `Class.Backpack`. Additionally, when a player connects to a game that permits gear, all of the appropriate gear `Class.Tool|Tools` that the player owns are inserted into that player's `Class.StarterGear`.

Unlike `Class.StarterPack`, `Class.StarterGear` isn't a service but rather a child of each `Class.Player` object, so its contents are player‑specific. To use `Class.StarterGear`, navigate to your start place's **Permissions** page and then enable gear by its genre or choose specific types to allow.

<Alert severity="warning">
Always test experiences after adding gear to them to check that users can't easily abuse them there. Gear may include `Class.Script` objects which allow the player to perform actions that you might not consider; for example, navigational gear might allow the player to access a part of the map that you don't want them to, and weapon gear may allow the holder to damage other players, possibly without retribution or retaliation.
</Alert>
</TabItem>
<TabItem label="PlayerGui">
The `Class.PlayerGui` container stores objects that create the player's GUI. If a `Class.ScreenGui` is a descendant of `Class.PlayerGui`, any `Class.GuiObject` inside that `Class.ScreenGui` displays on the player's screen.

As illustrated above, the contents of `Class.StarterGui` automatically copy into the player's `Class.PlayerGui` when their player `Class.Player.Character|Character` spawns. If `Class.StarterGui.ResetPlayerGuiOnSpawn` is set to `true`, all the contents of a player's `Class.PlayerGui` are cleared and replaced with the contents of `Class.StarterGui` every time the player's character respawns.

Note that if `Class.Players.CharacterAutoLoads` is set to `false`, the character
won't spawn and `Class.StarterGui` contents won't copy over until
`Class.Player:LoadCharacterAsync()` is called.
</TabItem>
<TabItem label="PlayerScripts">
The `Class.PlayerScripts` container is created automatically when a player
joins the game and its main purpose is to contain client scripts copied from the
`Class.StarterPlayerScripts` container within the `Class.StarterPlayer` service. It is especially useful for scripts that aren't tied to a user's character life cycle, such as the general chat system or player input controls.

Unlike the `Class.Backpack` and `Class.PlayerGui` containers, the
`Class.PlayerScripts` container is not accessible to the server and server‑side
`Class.Script` objects will not run when parented to `Class.PlayerScripts`.
</TabItem>
</Tabs>

## Ban users

To ensure civility and fair play in your experiences, you can ban users who violate rules or community guidelines. You can modify ban durations, ban messages, and even extend bans to potential alternate accounts. When using this feature, you must follow banning [guidelines](#ban-guidelines) and [messaging](#message-guidelines).

You have several options for working with bans:

- Each experience page on the [Creator Hub](https://create.roblox.com/) has a [Bans](../production/bans.md) dashboard.
- For programmatic usage with the engine API, see `Class.Players:BanAsync()`.
- For Open Cloud, see [bans and blocks](/cloud/features/bans-and-blocks).

### Ban guidelines

When implementing bans in your experience, adhere to the following guidelines:

- Experience rules must not contradict Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use). For example, you cannot create an experience rule that excludes someone because of their gender, as this violates [Roblox's Discrimination, Slurs, and Hate Speech policy](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards#discrimination-slurs-and-hate-speech).
- Creators must clearly state their experience rules somewhere accessible to all users.
- Creators must apply their experience rules fairly and not arbitrarily target certain users.
- Users can appeal to creators directly if they believe their ban was incorrect. Roblox will not mediate these appeals, unless the user believes the creator's experience rules or enforcement of their rules violate the [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).
- Roblox can moderate an experience if there is reason to believe that a creator's experience rules or enforcement of their rules violate the [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

### Message guidelines

When a user is banned, they receive an error modal displaying information such as the ban length and reason. In the text-filtered message, you can include additional information such as appeal or contact information as long as you meet Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

For example, in your ban messages, you are allowed to reference brand names and platforms:

- "Visit the Discord in my group/experience page"
- "Message me on Twitter or X"

Mentions of personal information or direct links are not allowed in this message field. This includes posting a specific username or handle, or providing a direct link to a Discord server or X account.
