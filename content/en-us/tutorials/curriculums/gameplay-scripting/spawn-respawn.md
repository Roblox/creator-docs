---
title: Spawn and respawn
description: Explains how spawning and respawning works in a laser tag experience.
next: /tutorials/curriculums/gameplay-scripting/add-rounds
prev: /tutorials/curriculums/gameplay-scripting/create-teams
---

**Spawning** is the process of creating an object or character in an experience, and **respawning** is the process of adding an object or character back into an experience after they meet a removal condition, such as a character's health reaching zero or falling off the map. Both processes are important because they ensure players are able to join your experience, and can continue playing to improve their skills.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) as a reference, this section of the tutorial teaches you how to use and customize Roblox's built-in features to handle spawning and respawning, including scripting guidance on:

- Configuring spawn locations so that players can only spawn into their team's spawn zone.
- Adding new players and their character to the round as they join the experience.
- Customizing force fields that prevent damage as players spawn and respawn.
- Handling client state so gameplay works correctly at the appropriate time.
- Respawning characters after they are tagged out of the round.
- Performing small, miscellaneous actions that are crucial for setting gameplay and character parameters.

This section includes plenty of scripting content, but instead of writing everything from scratch when creating an experience, it encourages you to leverage existing components, rapidly iterate, and figure out which systems need a custom implementation to match your vision. After you complete this section, you will learn how to implement round-based gameplay that tracks points, monitors player state, and displays round results.

## Configure spawn locations

If you were to playtest the experience right now, all players would randomly spawn at either the `Class.SpawnLocation` object in the green team's spawn zone, or the `Class.SpawnLocation` object in the pink team's spawn zone. This presents a gameplay issue where players could tag each other within each spawn zone as soon as their opponent's force field disappears.

To combat this problem, the sample laser tag experience configures both spawn locations with a `Class.SpawnLocation.Neutral|Neutral` property set to **false** to restrict the opposing team's players from spawning in the wrong spawn zone, and a `Class.SpawnLocation.TeamColor|TeamColor` property set to the corresponding `Class.Team.Color` value from [Assign Team Colors](create-teams.md#assign-team-colors) in the previous section of the tutorial:

- **TeamASpawn** – The spawn location in the green team's spawn zone with a `Class.SpawnLocation.TeamColor|TeamColor` property set to **Mint**.
- **TeamBSpawn** – The spawn location in the pink team's spawn zone with a `Class.SpawnLocation.TeamColor|TeamColor` property set to **Carnation Pink**.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/TeamASpawn.jpg" width="100%"/>
    <figcaption>TeamASpawn</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/TeamBSpawn.jpg" width="100%"/>
    <figcaption>TeamBSpawn</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
The `Class.SpawnLocation.TeamColor` property is different from the `Class.SpawnLocation.BrickColor` and `Class.SpawnLocation.Color` properties which represent the visual color of the spawn object and are not related to team functionality.
</Alert>

When a player joins the experience, **ServerScriptService** ⟩ **Gameplay** ⟩ **Rounds** ⟩ **spawnPlayersInMap** checks to see how many players are already on each team, then returns the team with the least amount of players.

```lua title="spawnPlayersInMap"
local function getSmallestTeam(): Team
	local teams = Teams:GetTeams()

	-- Sort teams in ascending order from smallest to largest
	table.sort(teams, function(teamA: Team, teamB: Team)
		return #teamA:GetPlayers() < #teamB:GetPlayers()
	end)

	-- Return the smallest team
	return teams[1]
end
```

Once it knows the team with the least amount of players, it sorts the player into that team, sets their `Class.Player.Neutral` property to **false** so the player can only spawn and respawn to their team's spawn location, then sets their `PlayerState` to `SelectingBlaster`, which you'll learn more about later in the tutorial.

```lua title="spawnPlayersInMap"
local function spawnPlayersInMap(players: { Player })
	for _, player in players do
		player.Team = getSmallestTeam()
		player.Neutral = false
		player:SetAttribute(PlayerAttribute.playerState, PlayerState.SelectingBlaster)
		task.spawn(function()
			player:LoadCharacter()
		end)
	end
end
```

If you examine **Workspace** ⟩ **World** ⟩ **Map** ⟩ **Spawns**, you can see that there is one more spawn location in the map: **NeutralSpawn**. This spawn location is unique from the others because it doesn't have a `Class.SpawnLocation.TeamColor|TeamColor` property set to one of the two teams in the experience; instead, this spawn location has a `Class.SpawnLocation.Neutral|Neutral` property that changes depending on if a round is active.

For example, if the round is active, the `Class.SpawnLocation.Neutral|Neutral` property sets to **false** so **spawnPlayersInMap** can sort players into teams and spawn them into the arena. However, if the round isn't active, such as the time between one round and the next, the `Class.SpawnLocation.Neutral|Neutral` property sets to **true** so players can spawn there regardless of their team status. This process is what makes the **Neutral** spawn location a functional lobby.

<figure>
   <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/Neutral.jpg" alt="" width="100%" />
   <figcaption>Neutral</figcaption>
</figure>

To demonstrate, if you examine **ServerScriptService** ⟩ **Gameplay** ⟩ **Rounds** ⟩ **SpawnPlayersInLobby**, which runs at the end of a round, you can see that for every player that is passed into the `players: { Player }` table, the script:

- Sets their `Class.Player.Neutral` property to true to automatically reset their `Class.Player.Team` to `nil`, allowing the player to respawn in the lobby when a round isn't active, as the spawn location's `Class.SpawnLocation.Neutral|Neutral` property is also set to **true**.
- Changes their `PlayerState` to `InLobby` to remove the player's blaster and first-person UI visuals.

For more information on the neutral spawn zone and its functionality for each round, see [Adding Rounds](adding-rounds.md) in the next section of the tutorial.

```lua title="spawnPlayersInLobby"
local function spawnPlayersInLobby(players: { Player })
	for _, player in players do
		player.Neutral = true
		player:SetAttribute(PlayerAttribute.playerState, PlayerState.InLobby)
		task.spawn(function()
			player:LoadCharacter()
		end)
	end
end
```

## Connect new players

Luau code in Studio is often event-driven, meaning that scripts listen for events from a Roblox service, then call a function in response. For example, when adding new players to a multiplayer experience, there must be an event that handles everything necessary for players to connect successfully. In the sample laser tag experience, this corresponding event is `Players.PlayerAdded:Connect`.

`Players.PlayerAdded:Connect` is a part of multiple scripts in the experience. If you use the <kbd>Ctrl/Cmd+Shift+F</kbd> shortcut and search for `Players.PlayerAdded:Connect`, the results provide a good starting point for understanding the experience's initial setup.

<img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/Find-All.png" alt="Studio's Find All window with the Players.PlayerAdded results highlighted." width="80%"/>

To demonstrate, open **ServerScriptService** ⟩ **SetupHumanoid**. The distinction between `Class.Player` and `Class.Player.Character|Character` is key to understanding this script:

- A **player** is a connected client, and a **character** is a `Class.Humanoid` model.
- Players need to choose a blaster and be added to the leaderboard. Characters need to spawn and receive a blaster.

`SetupHumanoid` immediately checks if the player has a character (just joined) or doesn't (is respawning). After it finds one, it calls `onCharacterAdded()`, gets the `Class.Humanoid` model from the character, and passes it to **ServerScriptService** ⟩ **SetupHumanoid** ⟩ **setupHumanoidAsync** for customization. After setting these values, the script then waits for the character's health to reach zero. You will learn more about respawning later in this section of the tutorial.

```lua title="setupHumanoidAsync"
local function setupHumanoidAsync(player: Player, humanoid: Humanoid)

	humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.Subject
	humanoid.NameDisplayDistance = 1000
	humanoid.HealthDisplayDistance = 1000
	humanoid.NameOcclusion = Enum.NameOcclusion.OccludeAll
	humanoid.HealthDisplayType = Enum.HumanoidHealthDisplayType.AlwaysOn
	humanoid.BreakJointsOnDeath = false

	humanoid.Died:Wait()
	onHumanoidDied(player, humanoid)
end
```

The important note with this script is that the properties are completely optional, meaning that if you remove the first six lines of the function, the experience still works properly. Rather than being functional requirements, each property allows you to make design decisions that meet your gameplay goals. For example:

- If you want character names to display at closer distances, reduce the value of `Class.Humanoid.NameDisplayDistance`.
- If you only want a character's health to display if it's below 100%, set `Class.Humanoid.HealthDisplayType` to **DisplayWhenDamaged**.
- If you want characters to break apart when their health reaches 0, set `Class.Humanoid.BreakJointsOnDeath` to **True**.

If you change the values of these properties, it's important to playtest so that you can see the impact of your new settings. You can recreate what players experience in a [multi‑client simulation](../../../studio/testing-modes.md#multi-client-simulation) by selecting at least two characters in a **Server&nbsp;&&nbsp;Clients** playtest from the mezzanine.

<img src="../../../assets/studio/general/Mezzanine-Testing-Mode-Server-Clients.png" width="800" alt="Server & Clients option in the testing modes dropdown of Studio's mezzanine." />

<Alert severity="info">
Try changing some of these values and playtesting with multiple players to see how they affect the gameplay of the experience. For instance, how might player strategy change if you chose to hide the health display?
</Alert>

Another example of the `Players.PlayerAdded:Connect` event is in **ServerScriptService** ⟩ **PlayerStateHandler**. Just like in the previous example, `PlayerStateHandler` immediately checks for a character. If the player isn't in the lobby, the script sets a player attribute to the `SelectingBlaster` state, the initial state for a round in which players can select from one of two different blaster types after spawning into the arena. This state also includes a force field that prevents players from taking damage while they're making their selection.

```lua title="PlayerStateHandler"
local function onPlayerAdded(player: Player)
	player.CharacterAdded:Connect(function()
		if not player.Neutral then
			player:SetAttribute(PlayerAttribute.playerState, PlayerState.SelectingBlaster)
			onPlayerStateChanged(player, PlayerState.SelectingBlaster)
		end
	end)
```

One particular variable in `PlayerStateHandler` warrants discussion: `attributeChangedConnectionByPlayer`. This table stores all players and their `Datatype.RBXScriptConnection|Connections` to the `GetAttributeChangedSignal`. The reason for storing this connection in a table is so that `PlayerStateHandler` can **disconnect** it when the player leaves the experience. This process serves as a sort of memory management to prevent the number of connections from growing ever-larger over time.

```lua title="PlayerStateHandler"
local attributeChangedConnectionByPlayer = {}
local function onPlayerAdded(player: Player)

	-- Handle all future updates to player state
	attributeChangedConnectionByPlayer[player] = player
		:GetAttributeChangedSignal(PlayerAttribute.playerState)
		:Connect(function()
			local newPlayerState = player:GetAttribute(PlayerAttribute.playerState)
			onPlayerStateChanged(player, newPlayerState)
		end)
end

-- Disconnect from the attribute changed connection when the player leaves
local function onPlayerRemoving(player: Player)
	if attributeChangedConnectionByPlayer[player] then
		attributeChangedConnectionByPlayer[player]:Disconnect()
		attributeChangedConnectionByPlayer[player] = nil
	end
end
```

You can see that both connected functions in `onPlayerAdded()` call `onPlayerStateChanged()`. During initial setup after a player sorts into a team, `onPlayerAdded()` sets `PlayerState` to `SelectingBlaster`, so the first `if` statement evaluates to false and disables the `BlasterState`. In the later [Implement blasters](./implement-blasters.md) section of the tutorial, you will learn more details about this process.

```lua title="PlayerStateHandler"
local function onPlayerStateChanged(player: Player, newPlayerState: string)
	-- Blaster state is 'Ready' only if player state is 'Playing'
	local newBlasterState = if newPlayerState == PlayerState.Playing then BlasterState.Ready else BlasterState.Disabled

	-- Schedule the destroy force field logic when the player begins playing
	if newPlayerState == PlayerState.Playing then
		scheduleDestroyForceField(player)
	end

	player:SetAttribute(PlayerAttribute.blasterStateServer, newBlasterState)
end
```

If you add breakpoints or even just a `print()` statement, you can see that `onPlayerStateChanged()` gets called frequently throughout the experience: such as during initial setup of a round, to set itself on the main code path, after the player chooses a blaster, and when the player returns to the lobby, or the **Neutral** spawn location. Furthermore, after the player chooses a blaster, **ServerScriptService** ⟩ **BlasterSelectedHandler** sets the `PlayerState` to `Playing`, and `PlayerStateHandler` can finally remove the force field by calling `scheduleDestroyForceField()`.

## Customize force fields

Instead of using a custom implementation, the sample laser tag experience uses Studio's built-in `Class.ForceField` class to prevent players from taking damage while they're selecting their blaster. This ensures that the only requirement for players to spawn with a force field is to include spawn locations with a `Class.SpawnLocation.Duration` property that is greater than 0. The sample uses an arbitrary value of 9,999 to enable force fields, then handles the actual duration programmatically in **ReplicatedStorage** ⟩ **ForceFieldClientVisuals**.

Similar to `setupHumanoidAsync`, most of the lines in `ForceFieldClientVisuals` are optional. For example, if you comment out the contents of the function like the following script does, the experience uses the default sparkling force field instead of the hexagonal script in **StarterGui** ⟩ **ForceFieldGui**.

```lua title="Commenting Out Properties in ForceFieldClientVisuals"
local function onCharacterAddedAsync(character: Model)
    -- local forceField = character:WaitForChild("ForceField", 3)
    -- if not forceField then
    -- return
    -- end
    -- forceField.Visible = false
    -- localPlayer.PlayerGui:WaitForChild("ForceFieldGui").Enabled = true
    -- forceField.Destroying:Wait()
    -- localPlayer.PlayerGui.ForceFieldGui.Enabled = false
end
```

Because the custom force field is a GUI rather than a new `Class.ParticleEmitter`, the `ForceFieldClientVisuals` script only affects the first-person visuals for each player, **not** third-person visuals when players look at other players. Third-person visuals retain the default Roblox appearance. For more information on modifying force fields, see `Class.ForceField.Visible`.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/First-Person-Visuals.png" alt="First-person force field visuals include a futuristic hexagonal grid on the perimeter of the screen." width="100%"/>
    <figcaption>First-person force field visuals</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/Third-Person-Visuals.png" alt="Third-person force field visuals include a blue sparkling orb around the player spawning into the experience." width="100%"/>
    <figcaption>Third-person force field visuals</figcaption>
  </figure>
</GridContainer>

Force fields are useful because they provide players enough time to between spawning and respawning without needing to worry about enemy players, but eventually they need to disappear for the main laser tag gameplay. The script that handles force field removal is in **ReplicatedStorage** ⟩ **scheduleDestroyForceField**, and it checks for three unique conditions:

- After players select a blaster, force fields need to last long enough to allow players to acclimate to their surroundings.
- During this acclimation time, force fields can't be an advantage, so they need to disappear the moment a player blasts their blaster.
- Force fields need to disappear when players reset their characters either before blasting or before the force field times out.

Each of these checks in the `scheduleDestroyForceField` script call `endForceField()` for these conditions.

```lua title="scheduleDestroyForceField"
-- End force field if player blasts
local blasterStateAttribute = getBlasterStateAttribute()
attributeChangedConnection = player:GetAttributeChangedSignal(blasterStateAttribute):Connect(function()
	local currentBlasterState = player:GetAttribute(blasterStateAttribute)
	if currentBlasterState == BlasterState.Blasting then
		endForceField()
	end
end)

-- End force field if player resets
characterRespawnedConnection = player.CharacterRemoving:Connect(endForceField)

-- End force field after 8 seconds
task.delay(MAX_FORCE_FIELD_TIME, endForceField)
```

`endForceField()` includes a seemingly odd `if` statement around the `forceFieldEnded` boolean. Because the checks run sequentially, the script can call the `endForceField()` function two or even three times. The `forceFieldEnded` boolean ensures that the function only tries to destroy a force field once.

```lua title="scheduleDestroyForceField"
local function endForceField()
	if forceFieldEnded then
		return
	end
	forceFieldEnded = true

	attributeChangedConnection:Disconnect()
	characterRespawnedConnection:Disconnect()
	destroyForceField(player)
end
```

<Alert severity="info">
To learn more about dealing with this type of situation, see [Debounce Patterns](../../../scripting/debounce.md).
</Alert>

## Handle client state

While most of this section focuses on **ServerScriptService** ⟩ **PlayerStateHandler**, there's another script of the same name in **ReplicatedStorage**. The reason for the split is the client-server architecture:

- The client needs to understand player state information so that it can respond appropriately in real time, such as displaying the right user interface elements, or enabling players to move and blast.

- The server needs all this same information so that it can prevent exploits. For example, the server also needs player state to perform actions like spawning and equipping characters, disabling force fields, and displaying a leaderboard. This is why this script is in **ReplicatedStorage** and not a purely client-side location.

To see this core logic, review the following script in **ReplicatedStorage** ⟩ **PlayerStateHandler** that verifies the user's current state, then calls the appropriate function that handles the corresponding actions for that state.

```lua title="PlayerStateHandler"
local function onPlayerStateChanged(newPlayerState: string)
	if newPlayerState == PlayerState.SelectingBlaster then
		onSelectingBlaster()
	elseif newPlayerState == PlayerState.Playing then
		onPlaying()
	elseif newPlayerState == PlayerState.TaggedOut then
		onTaggedOut()
	elseif newPlayerState == PlayerState.InLobby then
		onInLobby()
	else
		warn(`Invalid player state ({newPlayerState})`)
	end
end
```

All event responses are logically grouped together in this script because they require similar behavior of enabling or disabling player controls, camera movement, and which UI layer is visible. For example, during blaster selection, players need to be both invulnerable and unable to move. The server already handles the force field, but the client handles movement. To demonstrate, if you check the logic for the `onSelectingBlaster()` function, you can see that the client disables player movement while they're selecting a blaster.

```lua title="PlayerStateHandler"
local function onSelectingBlaster()
	togglePlayerCamera(true)
	togglePlayerMovement(false)
	setGuiExclusivelyEnabled(playerGui.PickABlasterGui)

	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Disabled)
end
```

The `onPlaying()` function is similarly straightforward. It enables movement, transitions to the main heads-up display (HUD), enables the blaster, and calls the same force field function as the server.

```lua title="PlayerStateHandler"
local function onPlaying()
	togglePlayerMovement(true)
	setGuiExclusivelyEnabled(playerGui.HUDGui)

	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Ready)

	scheduleDestroyForceField()
end
```

## Respawn characters

The sample laser tag experience handles respawning character back into a round through the `onTaggedOut()` state in **ReplicatedStorage** ⟩ **PlayerStateHandler**. Like the `onSelectingBlaster()` and `onPlaying()` state, `onTaggedOut()` triggers unique behavior according to the changes to the `playerState` attribute. Specifically, it disables player movement, presents the respawn UI, and disables the blaster.

```lua title="PlayerStateHandler"
local function onTaggedOut()
	-- Disable controls while tagged out
	togglePlayerMovement(false)
	togglePlayerCamera(false)
	setGuiExclusivelyEnabled(playerGui.OutStateGui)

	-- Disable blaster while tagged out
	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Disabled)
end
```

If you want to test this behavior, you can press <kbd>Esc</kbd>, navigate to the **Settings** tab, then click the **Reset Character** button. Notice that when you trigger the respawn screen, you cannot move, rotate the camera, or blast your blaster.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/Reset-Character-Button.png" alt="Roblox's settings menu with the Reset Character button highlighted." width="80%"/>
    <figcaption>Reset Character Button</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/Respawn-Screen.png" alt="The respawn screen displays as a player respawns back into the round." width="100%"/>
    <figcaption>Respawn Screen</figcaption>
  </figure>
</GridContainer>

It's important to note that this script doesn't actually respawn characters, it just stops them from acting and provides visual feedback to players that the **server** is respawning their characters. To demonstrate, if you examine **ServerScriptService** ⟩ **SetupHumanoid** ⟩ **setupHumanoidAsync** ⟩ **onHumanoidDied**, the script sets `PlayerState` to `TaggedOut` (essentially notifying **ReplicatedStorage** ⟩ **PlayerStateHandler**), and adds some visual indicators. The actual logic of respawning is a built-in Roblox behavior.

When players respawn back into the round, they respawn at their team's spawn location according to the `Class.SpawnLocation.TeamColor` property. To customize the respawn time, you can add the following line to the top of `SetupHumanoid`. To learn more about this technique, see `Class.Players.RespawnTime`.

```lua title="SetupHumanoid"
local Players = game:GetService("Players")
Players.RespawnTime = 10 -- new line, in seconds
```

<Alert severity="info">
In an experience with a progression system, such as checkpoints, you can use `Class.Player.RespawnLocation` to specify an exact location for players to respawn to after their health reaches zero.
</Alert>

## Miscellaneous setup

As part of initial setup, the sample laser tag experience also performs some small, but critical steps:

- The experience includes an empty script named **StarterPlayer** ⟩ **StarterCharacterScripts** ⟩ **Health** that disables the default Roblox health regeneration. For an explanation of this property's behavior, see `Class.Humanoid.Health`.

- The experience uses a first-person camera by setting the `StarterPlayer.CameraMode.LockFirstPerson` property. Note that if you want to let users change between first- and third-person cameras, you must change the property programmatically rather than just setting it once in Studio, and modify the controls and UI to compensate for the change in perspective.

- The experience uses the built-in Roblox leaderboard with the unit of "points", which players earn each time they tag another player out. You can see the configuration in **ServerScriptService** ⟩ **SetupLeaderboard**, but [In-Experience Leaderboards](../../../players/leaderboards.md) offers a full overview. Note that `onPlayerTagged` adds points to the leaderboard, which you'll learn about in [Add rounds](./add-rounds.md) and [Detect hits](detect-hits.md).

Now that players can spawn, choose a blaster, and aim it from a first-person point of view, the next section teaches you about the scripts behind creating round-based gameplay.
