---
title: Create teams
description: Explains how separate players into teams as they join an experience.
prev: /tutorials/curriculums/gameplay-scripting/
next: /tutorials/curriculums/gameplay-scripting/spawn-respawn
---

**Creating teams** lets you sort players into groups that compete to complete a common objective, such as scoring the most points or crossing a finish line before other enemy team members. For a first-person shooter, creating teams is particularly important because it establishes complex, coordinated gameplay strategies beyond the skill set of any individual player.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) as a reference, this section of the tutorial teaches you how to sort players into teams, including scripting guidance on:

- Using the `Class.Teams` service's default functionality to assign players into either the green or pink team.
- Helping players differentiate between their allies and enemy team members through on-screen and in-experience team indicators.
- Enabling forgiving gameplay that doesn't penalize players for blasting their teammates.

After you complete this section, you will learn about the scripts that allow players to spawn or respawn to a neutral lobby or team spawn zone, customize first-person force field visuals, and handle client state both from the server and the client.

<img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Intro.png" width="100%" alt="" />

## Assign team colors

The sample laser tag experience uses the `Class.Teams` service as a basis for creating two teams because the service offers built-in team sorting behavior that broadly works out-of-the-box. For example, without any additional scripting effort, the service handles actions like:

- Sorting and balancing players evenly into each team.
- Grouping players under their team on the leaderboard.
- Tinting player names in the 3D space to their corresponding team color.
- Spawning players to distinct spawn locations that only their team can access.

Because of this default functionality, the sample enables the `Class.Teams` service, then uses two distinct `Class.Team` objects with different `Class.Team.Color` properties values to represent each team: **mint** for the team that assembles on one side of the map, and **carnation pink** for the team that assembles on the opposite side of the map. These specific colors are useful because they are complementary, meaning that they contrast each other well, and they enable players to easily scan their surroundings and orient themselves within the building and to other players.

<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Green-Team-Players.jpg" alt="" />
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Pink-Team-Players.jpg" alt="" />
  </figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Green-Team-Properties.png" alt="" />
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Pink-Team-Properties.png" alt="" />
  </figure>
</GridContainer>

<Alert severity="info">
To learn more about this color theme, see [Select a Color Theme](../user-interface-design/choose-an-art-style.md#select-a-color-theme) from the UI Curriculum.
</Alert>

It's important to note the exact `Datatype.BrickColor` name for the `Class.Team.Color` property because the experience uses this name throughout many scripts in the experience to keep track of players as they sort into teams, increment points as players tag out enemy players during a round, and update custom UI elements. For example, when a round begins, **ReplicatedStorage** ⟩ **HUDGuiSetup** requires `startSyncingTeamColor`,and `startSyncingTeamPoints` which both reference `Class.Team.Color` to perform unique actions for each team.

<Tabs>
  <TabItem key = "1" label="startSyncingTeamColor">

`startSyncingTeamColor` references `Class.Team.Color` so that it can assign the correct color and icon for the player's team indicator at the bottom-left corner of their screen.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Green-Team.jpg" width="100%"/>
    <figcaption>Green Team</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Pink-Team.jpg" width="100%"/>
    <figcaption>Pink Team</figcaption>
  </figure>
</GridContainer>

```lua
local function setPlayerTeamIcon(gui: ScreenGui)
	for _, teamColorIcon in gui.PlayerDisplay.TeamIcons:GetChildren() do
		local iconTeamColor = teamColorIcon:GetAttribute(GuiAttribute.teamColor)
		teamColorIcon.Visible = localPlayer.TeamColor == iconTeamColor
	end
end

local function startSyncingTeamColor(gui: ScreenGui)
	setPlayerTeamIcon(gui)
	localPlayer:GetPropertyChangedSignal("Team"):Connect(function()
		setPlayerTeamIcon(gui)
	end)
end
```

  </TabItem>
  <TabItem key = "2" label="startSyncingTeamPoints">

`startSyncingTeamPoints` references `Class.Team.Color` so that it can track team points correctly in the objective UI at the top of the screen.

<figure>
  <img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Objective-UI.jpg" width="100%" alt="" />
</figure>

```lua
local function getTeamFromTeamColor(teamColor: Color3): Team?
	for _, team in Teams:GetTeams() do
		if team.TeamColor == teamColor then
			return team
		end
	end

	return nil
end

local function startSyncingTeamPoints(gui: ScreenGui)
	for _, teamPointCounter in gui.Objective.TeamPointCounter:GetChildren() do
		if not teamPointCounter:IsA("GuiObject") then
			continue
		end

		local iconTeamColor = teamPointCounter:GetAttribute(GuiAttribute.teamColor)

		local team = getTeamFromTeamColor(iconTeamColor)
		if not team then
			warn(`No team found matching the color {iconTeamColor} to sync team points on {teamPointCounter}`)
			continue
		end

		teamPointCounter.TextLabel.Text = team:GetAttribute(GuiAttribute.teamPoints)

		team:GetAttributeChangedSignal(GuiAttribute.teamPoints):Connect(function()
			teamPointCounter.TextLabel.Text = team:GetAttribute(GuiAttribute.teamPoints)
		end)
	end
end
```

  </TabItem>
</Tabs>

## Display team indicators

Once a player is sorted into a team, they need to be able to quickly decipher what team they belong to, and differentiate between their allies and enemy team members. This ability is important because the gameplay of a first-person shooter experience requires players to make quick strategic decisions while they're in combat zones so that they don't get tagged out and lose the round.

To set players up for success, the sample laser tag experience provides multiple team indicators both on-screen and in the 3D space:

- **Player Indicator** – Custom on-screen UI that displays the player's team color and icon.
- **Team Indicator** – Custom in-experience UI that displays the player's team color.
- **Leaderboard Indicator** – Default Teams service on-screen UI that groups players underneath their team color.
- **Name Tint** – Default Teams service in-experience UI that tints the player's name above their head to their team color.

<div><b>On-screen Indicators</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Player-Indicator.jpg" alt="" />
    <figcaption>Player Indicator</figcaption>
  </figure>
  <figure>
    <img width="80%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Leaderboard-Indicator.jpg" alt="" />
    <figcaption>Leaderboard Indicator</figcaption>
  </figure>
</GridContainer>

<div><b>In-Experience Indicators</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Team-Indicator.jpg" alt="" />
    <figcaption>Team Indicator</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Name-Tint.jpg" alt="" />
    <figcaption>Name Tint</figcaption>
  </figure>
</GridContainer>

You don't need to do any additional work for the Leaderboard Indicator or Name Tint outside of assigning team colors from the previous section of the tutorial, but the custom UI team indicators require more programming effort to both display the indicators and occlude enemy indicators when they are behind walls. For a full explanation of the scripts that control the custom UI behavior, as well as how to implement each UI element itself, see [Player Indicator](../user-interface-design/implement-designs-in-studio.md#player-indicator) and [Team Indicator](../user-interface-design/implement-designs-in-studio.md#team-indicator) from the UI Curriculum.

## Disable friendly fire

While some first-person shooter experiences penalize players who blast their own teammates, the sample laser tag experience allows for more forgiving gameplay by disabling friendly fire. This design decision allows everyone to only increase their team score, not subtract from it due to gameplay accidents.

To understand how the sample implements this functionality, examine how **ServerScriptService** ⟩ **LaserBlastHandler** ⟩ **processTaggedPlayers** ⟩ **onPlayerTagged** handles dealing damage to tagged players. When the server detects a collision between a player's blast and another player, it calls the `onPlayerTagged` function to understand which player fired the blast, which player was hit by the blast, and how much damage it should remove from the player's health according to the blaster type.

```lua
local function onPlayerTagged(playerBlasted: Player, playerTagged: Player, damageAmount: number)
```

Before it decreases health, the script first verifies if the tagged player is on the same team as the player who initiated the blast. If they are on the same team, the script ignores the blast data entirely.

```lua
	local character = playerTagged.Character
	local isFriendly = playerBlasted.Team == playerTagged.Team

	-- Disallow friendly fire
	if isFriendly then
		return
	end
```

However, if the tagged player **is** on the enemy team, the player takes the appropriate amount of damage according to the blaster type. In addition, if the player takes enough damage to become tagged out, the script rewards a point to the team of the player that initiated the blast. For more information on how the sample tracks points, see [Add rounds](./add-rounds.md#track-points) later in the tutorial.

```lua
	local humanoid = character and character:FindFirstChild("Humanoid")
	if humanoid and humanoid.Health > 0 then
		local damage = math.min(damageAmount, humanoid.Health)
		humanoid:TakeDamage(damage)
		if humanoid.Health <= 0 then
			Scoring.incrementScore(playerBlasted, 1)
		end
	end
end

return onPlayerTagged
```

<Alert severity="info">
For more information on what happens when a player fires their blaster, see [Implement blaster behavior](./implement-blasters.md) and [Detect hits](./detect-hits.md) later on in the tutorial.
</Alert>

If you were to test the experience right now, all players would randomly spawn at either spawn zone at opposite ends of the arena regardless of what team they belong to, meaning that each team would spawn right next to each other.

To address this issue, the following section of the tutorial teaches you about the custom logic behind restricting team spawning to certain spawn locations, handling client state as players leave the spawn area after selecting their blaster, and respawning players back to their spawn zone or lobby area when their health reaches zero.
