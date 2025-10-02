---
title: Add rounds
description: Explains how to implement round-based behavior.
next: /tutorials/curriculums/gameplay-scripting/implement-blasters
prev: /tutorials/curriculums/gameplay-scripting/spawn-respawn
---

**Adding rounds** lets you structure gameplay into phases with a clear start and finish point so that players can measure their progress and have a periodic opportunity for an equal playing field. This is particularly important for team-based gameplay because it offers players the chance to switch up their play style depending on who is on their team during that round.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) as a reference, this section of the tutorial teaches you how to use and customize Roblox's built-in features to structure each round, including scripting guidance on:

- Beginning a round by resetting individual and team points, then spawning players to their team spawn zones.
- Customizing variables that set the objective for the round at the top of each player's screen.
- Tracking player point contributions for their team score.
- Triggering unique UI screens depending on if the player's team won or lost the round.
- Ending a round by disconnecting players and spawning them in the neutral lobby.

After you complete this section, you will learn how to implement blaster behavior that is both accurate and satisfying to players.

<img src="../../../assets/tutorials/gameplay-scripting/Adding-Rounds/Rounds-Diagram.png" width="100%" alt="" />

## Start loop

**ServerScriptService** ⟩ **Gameplay** ⟩ **Rounds** handles most of the logic for implementing rounds, and it starts by calling the `startRoundLoopAsync()` function to mark the beginning of a round loop. While players join the lobby and wait to sort into a team, `startRoundLoopAsync()` calls the `resetScores()` function in  **ServerScriptService** ⟩ **Gameplay** ⟩ **Scoring** to reset both the leaderboard and team points.

```lua title="Scoring"
function Scoring.resetScores()
	for _, player in Players:GetPlayers() do
		player.leaderstats.Points.Value = 0
	end

	for _, team in Teams:GetTeams() do
		team:SetAttribute(GuiAttribute.teamPoints, 0)
	end
end
```

Now that everyone is starting at zero points, `startRoundLoopAsync()` then sets the **Neutral** spawn location's `Class.SpawnLocation.Neutral|Neutral` property to **false** so that only players with the same `Class.Team.Color` property as the spawn location's `Class.SpawnLocation.TeamColor|TeamColor` property can spawn there. Because the spawn location's `Class.SpawnLocation.TeamColor|TeamColor` property is set to **white** instead of the sample's mint or carnation pink teams, this configuration prevents all players from spawning or respawning there while a round is active.

For players who are currently in the lobby, `startRoundLoopAsync()` passes all players currently within the experience to the `spawnPlayersInMap` function in **ServerScriptService** ⟩ **Gameplay** ⟩ **Rounds** ⟩ **spawnPlayersInMap** to sort and balance everyone into a team with approximately the same number of players.

For any new players that join the experience after the lobby group was sorts into a team, `startRoundLoopAsync()` listens for the `Players.PlayerAdded:Connect` event, then calls the `spawnPlayersInMap` function again to add them to the team with the least amount of players. For more information on this process, see [Configure Spawn Locations](spawn-respawn.md#configure-spawn-locations) from the previous **Spawning and Respawning** section of the tutorial.

```lua title="Rounds"
		-- Spawn all players in the map
		neutralSpawn.Neutral = false
		spawnPlayersInMap(Players:GetPlayers())

		-- Spawn new players in the map when they join
		local playerAddedConnection = Players.PlayerAdded:Connect(function(player: Player)
			spawnPlayersInMap({ player })
		end)
```

## Set objective

Now that each player is in the arena with their teammates, the experience needs to provide instructions for what to do to be successful within the round. The sample laser tag experience tackles this requirement by providing an objective prompt at the top of each player's screen with clear guidance on what the team needs to do to win.

<img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Objective-UI.jpg" width="100%" alt="" />

While you can learn more about how to configure and display the [Objective UI](../user-interface-design/implement-designs-in-studio.md#objective-ui) component in the UI Curriculum, this section focuses on how to implement the objective goal as the round begins, starting with how to set the amount of points each team needs to complete the round.

Even though the objective prompt at runtime informs players they need to score three points to win, if you examine the prompt in **StarterGui** ⟩ **HUDGui**, you can see that it instead contains a configurable "`%d`" for the point value.

<img src="../../../assets/tutorials/gameplay-scripting/Adding-Rounds/Placeholder-Prompt.jpg" width="100%" alt="" />

"`%d`" is a placeholder string that you can increase or decrease at any time to meet your own gameplay requirements by updating the `TEAM_SCORE_LIMIT` variable in **ReplicatedStorage** ⟩ **TEAM_SCORE_LIMIT**. For example, if you were to set this number to an excessively high `200`, the prompt and team point counter would update accordingly.

```lua title="TEAM_SCORE_LIMIT"
local TEAM_SCORE_LIMIT = 200 -- updated line, be sure to change back

return TEAM_SCORE_LIMIT
```

<img src="../../../assets/tutorials/gameplay-scripting/Adding-Rounds/Large-Prompt.jpg" width="100%" alt="" />

This simple variable update works on runtime because as the round starts, **ReplicatedStorage** ⟩ **HUDGuiSetup** ⟩ **SetObjective** requires the `TEAM_SCORE_LIMIT` module script so that it can swap the placeholder string in the UI Objective's `Class.TextLabel` object.

```lua title="TEAM_SCORE_LIMIT"
local TEAM_SCORE_LIMIT = require(ReplicatedStorage.TEAM_SCORE_LIMIT)

local function setObjective(gui: ScreenGui)
	local bodyTextLabel = gui.Objective.ObjectiveDisplay.Body.BodyTextLabel
	bodyTextLabel.Text = bodyTextLabel.Text:format(TEAM_SCORE_LIMIT)
end
```

## Track points

Now that players have a goal for the round, the experience needs to keep track of each team's points until they meet their objective. While the `Class.Teams` service's default behavior automatically groups each player underneath their team and adds up each player's contributions to their team score, it's important to store and monitor points in a separate location for round-based gameplay because if a player scores then leaves before the round is over, their contribution is deducted from the leaderboard as soon as they disconnect from the experience.

To ensure this doesn't happen and every contribution toward the team goal is preserved, **ReplicatedStorage** ⟩ **HUDGuiSetup** ⟩ **StartSyncingTeamPoints** stores all points separately under the `teamPoints` attribute in `Class.Teams` service. As `teamPoints` increments, this module script calls function `startSyncingTeamPoints` to find the team counter `Class.GuiObjects` within the Objective UI component.

When it locates **TeamACounter** and **TeamBCounter**, it gets their `teamColor` attribute, which correlates with the team spawn zones: TeamACounter displays the green team's points, and TeamBCounter tracks the pink team's points.

```lua title="StartSyncingTeamPoints"
local function startSyncingTeamPoints(gui: ScreenGui)
	for _, teamPointCounter in gui.Objective.TeamPointCounter:GetChildren() do
		if not teamPointCounter:IsA("GuiObject") then
			continue
		end

		local iconTeamColor = teamPointCounter:GetAttribute(GuiAttribute.teamColor)
```

The module script then calls its `getTeamFromTeamColor` function to validate that the TeamACounter's **mint** `teamColor` attribute and the TeamBCounter's **carnation pink** `teamColor` attribute both match the corresponding `Class.Team.Color` properties underneath the `Class.Teams` service. If so, it returns both of the teams.

```lua title="StartSyncingTeamPoints"
local function getTeamFromTeamColor(teamColor: Color3): Team?
	for _, team in Teams:GetTeams() do
		if team.TeamColor == teamColor then
			return team
		end
	end

	return nil
end
```

When this occurs, `startSyncingTeamPoints` sets both team counters' `Class.TextLabel` objects to their corresponding `teamPoints` values, and continues to update them whenever a player scores a point by tagging another player out on the opposite team.

```lua title="StartSyncingTeamPoints"
		teamPointCounter.TextLabel.Text = team:GetAttribute(GuiAttribute.teamPoints)

		team:GetAttributeChangedSignal(GuiAttribute.teamPoints):Connect(function()
			teamPointCounter.TextLabel.Text = team:GetAttribute(GuiAttribute.teamPoints)
```

Everything in this section so far has focused on how to track points on the player's screen, but it's important to review the logic that handles tracking points on the server so it knows when a team meets the objective goal and wins the round. If you revisit **ServerScriptService** ⟩ **Gameplay** ⟩ **Scoring**, you can see that the module script starts by creating a bindable event, which will fire each time a player scores a point.

```lua title="Scoring"
local teamScoreChangedBindable = Instance.new("BindableEvent")

local Scoring = {
	teamScoreChanged = teamScoreChangedBindable.Event,
}
```

It then calls the `incrementScore` function, which performs the following actions:

- Grabs the player's team and their current teamPoints value on the `Class.Team` object in the `Class.Teams` service, then adds one.
- Grabs the player's individual score on the leaderboard, and adds one.
- Fires the previously mentioned bindable event with both the player's team and their score.

This process effectively keeps both the client and the server aligned regarding both players' individual scores and their team scores.

```lua title="Scoring"
function Scoring.incrementScore(player: Player, amount: number)
	local team = player.Team
	assert(team, `Player {player.Name} must be on a team to score a point, but has no team`)

	local teamPoints = team:GetAttribute(GuiAttribute.teamPoints)
	teamPoints += amount
	team:SetAttribute(GuiAttribute.teamPoints, teamPoints)

	local leaderstat = player.leaderstats.Points
	leaderstat.Value += amount

	teamScoreChangedBindable:Fire(team, teamPoints)
end
```

## Display results

As players tag each other and score points for their team, **ServerScriptService** ⟩ **Gameplay** ⟩ **Rounds** checks to see if the team that scored met the round objective. If their team score is lower than the `TEAM_SCORE_LIMIT` variable in **ReplicatedStorage** ⟩ **TEAM_SCORE_LIMIT**, the server continues to wait until one of the teams scores again.

However, once a team's score reaches the `TEAM_SCORE_LIMIT` variable, the script fires a `roundWinnerRemote` event instance with the player's name and their team.

```lua title="Rounds"
		-- Check if the round has finished after each score
		local team: Team
		local score: number = 0

		while score < TEAM_SCORE_LIMIT do
			team, score = Scoring.teamScoreChanged:Wait()
		end

		-- Display winning team
		for _, player in Players:GetPlayers() do
			-- Sending what team the player is on at the end of the round
			-- because the player's team is about to be removed, so the client
			-- won't be able to check its own team
			roundWinnerRemote:FireClient(player, team, player.Team)
		end
```

The **ReplicatedStorage** ⟩ **RoundResultsGuiSetup** script on each client listens for this `roundWinnerRemote` event instance so it can:

- Display a unique **StarterGui** ⟩ **RoundResultsGui** UI screen that announces the round's results and if the player was on the winning team.
- Play a victory or defeat audio clip.

For example, if a player is on the team that scored the winning point, they receive multiple forms of feedback on the round results in the form of a UI screen that displays victory text, and an audio clip that plays a joyful sound. Conversely, if a player is not on the team that scored the winning point, they receive a UI screen that displays defeat text, and an audio clip that plays an ominous sound.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../../assets/tutorials/gameplay-scripting/Adding-Rounds/Victory-UI.mp4" width="100%"></video>
  <figcaption>Victory feedback</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/gameplay-scripting/Adding-Rounds/Defeat-UI.mp4" width="100%"></video>
  <figcaption>Defeat feedback</figcaption>
  </figure>
</GridContainer>

```lua title="RoundResultsGuiSetup"
local function onRoundWinner(winner: Team, localTeam: Team?)
	local victoryDefeatText = "Round ended!"
	if localTeam then
		-- If our team won, we'll display Victory! Otherwise display Defeat...
		local isVictory = winner == localTeam
		if isVictory then
			victorySound:Play()
			victoryDefeatText = VICTORY_TEXT
		else
			defeatSound:Play()
			victoryDefeatText = DEFEAT_TEXT
		end
	end
```

## Reset teams

At the same time that **ServerScriptService** ⟩ **Gameplay** ⟩ **Rounds** verifies that a team met the round objective and triggers the appropriate UI display for each player, it also transports all players from the arena to the lobby by disconnecting them from the round. This starts the process of formally ending the round and resetting both teams.

Using the same logic in [Configure Spawn Locations](spawn-respawn.md#configure-spawn-locations), **Rounds** then sets the **Neutral** spawn location's `Class.SpawnLocation.Neutral|Neutral` property to **true** so players can spawn there regardless of their team status. This means the lobby becomes the only location that players can spawn after they are disconnected from the round.

```lua title="Rounds"
		-- Send everyone to the lobby
		playerAddedConnection:Disconnect()
		neutralSpawn.Neutral = true
		spawnPlayersInLobby(Players:GetPlayers())
```

After waiting ten seconds for an intermission, the **Rounds** server script then starts the loop again by resetting everyone's scores and sorting them into new teams. The sample repeats this cyclical round process again until there aren't any players within the server.

Now that players can spawn into the map with their own team and play a full round, the next section teaches you about the scripts behind each blaster's behavior.
