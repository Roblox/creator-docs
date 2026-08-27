---
title: Leaderboards
description: Display session stats with leaderstats and persistent rankings with an ordered data store.
---

Roblox has a built-in **leaderboard** in the PlayerList. **Here**, **Friends**, and **Global** are views of that same list: **Here** shows session rankings for players in the current server, and **Friends** and **Global** show persistent rankings from an ordered data store that you register in Creator Hub.

<img alt="Leaderboard Screen" src="../assets/players/leaderboard/Leaderboard-On-Screen.jpg" width="100%" />

## Leaderboard views

The PlayerList compares scores across these views:

| View        | Rankings                                                                     |
| :---------- | :--------------------------------------------------------------------------- |
| **Here**    | Session rankings for players in the current server, from `leaderstats`.      |
| **Friends** | Persistent rankings among a player's friends who have played the experience. |
| **Global**  | Persistent rankings across players in the experience.                        |

Use [leaderstats](#manage-session-leaderboards-with-leaderstats) to populate **Here**. Use [an ordered data store](#manage-persistent-leaderboards-with-an-ordered-data-store) to populate **Friends** and **Global**.

## Manage session leaderboards with leaderstats

A `leaderstats` folder on each player drives the **Here** view. The following steps set up that folder, add stats, update them during a session, control their order, and hide the PlayerList.

### Set up leaderstats

To set up the leaderboard and add players when they enter the experience:

1. Create a new `Class.Script` within `Class.ServerScriptService` and name it `Leaderboard`.

   <img alt="Leaderboard Insert Script" src="../assets/players/leaderboard/Leaderboards-Insert-Script.png" width="320" />

2. In the script, connect a function to the `Class.Players.PlayerAdded|PlayerAdded` event.

   ```lua
   local Players = game:GetService("Players")

   local function leaderboardSetup(player)

   end

   Players.PlayerAdded:Connect(leaderboardSetup)
   ```

3. Inside the connected function, create a new `Class.Folder` instance, name it `leaderstats`, and parent it to the player.

   ```lua
   local Players = game:GetService("Players")

   local function leaderboardSetup(player)
   	local leaderstats = Instance.new("Folder")
   	leaderstats.Name = "leaderstats"
   	leaderstats.Parent = player
   end

   Players.PlayerAdded:Connect(leaderboardSetup)
   ```

   <Alert severity="warning">
   It's essential that the folder is named `leaderstats` with all lowercase letters. Roblox doesn't add the player to the leaderboard if you name it any other way.
   </Alert>

### Add stats

Leaderboards use **value type objects** to store and display player stats. This script shows a player's gold using an `Class.IntValue`, a placeholder for an integer.

In the `leaderboardSetup()` function, add lines 8 through 11:

```lua
local Players = game:GetService("Players")

local function leaderboardSetup(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local gold = Instance.new("IntValue")
	gold.Name = "Gold"
	gold.Value = 0
	gold.Parent = leaderstats
end

Players.PlayerAdded:Connect(leaderboardSetup)
```

These lines accomplish the following:

1. An `Class.IntValue` instance is created.

2. The instance's `Class.Instance.Name|Name` is set to `"Gold"`. This is exactly how the stat will appear on the leaderboard.

   <img alt="Stat name 'Gold' shown on leaderboard" src="../assets/players/leaderboard/Leaderboard-Stat-Name.png" width="540" />

3. The stat's initial `Class.IntValue.Value|Value` is set to `0`. Set this to any value you wish, including a value stored in a [data store](../cloud-services/data-stores/index.md) if you're implementing [persistent leaderboards](#manage-persistent-leaderboards-with-an-ordered-data-store).

   <Alert severity="info">
   Note that the value of objects such as `Class.IntValue`, `Class.NumberValue`, and `Class.StringValue` must be set through their `Value` property, as in `gold.Value` on line 10.
   </Alert>

4. The instance is parented to the `leaderstats` folder which adds it to the leaderboard. When a player enters the experience, their name appears on the board.

   <img alt="Multiple players shown on leaderboard" src="../assets/players/leaderboard/Leaderboards-Multiple-Players.png" width="540" />

### Update stats

To update a player's leaderboard stat, change the `Value` property of that stat within their `leaderstats` folder. For example, you can attach the following `Class.Script` to any pickup object to increase the `Gold` stat of the player who collects it.

```lua
local Players = game:GetService("Players")

local goldChunk = script.Parent

local function onPartTouch(otherPart)
	local partParent = otherPart.Parent
	local player = Players:GetPlayerFromCharacter(partParent)
	local leaderstats = player and player:FindFirstChild("leaderstats")
	local goldStat = leaderstats and leaderstats:FindFirstChild("Gold")

	if goldStat then
		-- Destroy the pickup
		goldChunk:Destroy()

		-- Update the player's leaderboard stat
		goldStat.Value += 10
	end
end

goldChunk.Touched:Connect(onPartTouch)
```

### Order stats

There are three ways to control the order of stats in a leaderboard:

- Add the stats in the order that you want them to appear.
- Add a child `Class.BoolValue` named `IsPrimary` to the stat and set its value to `true` to place the stat first in the leaderboard.
- Add a child `Class.NumberValue` named `Priority` to the stat and set its value to an integer. Higher priority values appear earlier in the leaderboard. Stats without a priority have a default priority of `0`.

This code sample shows how to add an `IsPrimary` value to a stat:

```lua
local Players = game:GetService("Players")

local function leaderboardSetup(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local gold = Instance.new("IntValue")
	gold.Name = "Gold"
	gold.Value = 0
	gold.Parent = leaderstats

	local isPrimary = Instance.new("BoolValue")
	isPrimary.Name = "IsPrimary"
	isPrimary.Value = true
	isPrimary.Parent = gold
end

Players.PlayerAdded:Connect(leaderboardSetup)
```

<Alert severity="info">
`IsPrimary` takes precedence over any `Priority` values. If multiple stats have `IsPrimary` values set to `true`, their `Priority` values determine the leaderboard order.
</Alert>

### Hide the leaderboard

To hide the leaderboard, such as on a menu screen or during a cutscene, place a `Class.LocalScript` within `Class.StarterGui` or `Class.StarterPlayerScripts` containing a call to `Class.StarterGui:SetCoreGuiEnabled()|StarterGui`.

```lua
local StarterGui = game:GetService("StarterGui")

StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList, false)
```

## Manage persistent leaderboards with an ordered data store

<Alert severity="warning">
This feature is in **beta**. Functionality and availability might change.
</Alert>

**Friends** and **Global** read scores from an `Class.OrderedDataStore|ordered data store` that you register in Creator Hub. The ordered data store remains the source of truth, and Roblox displays the configured scores in the PlayerList. This lets you add persistent social and global rankings without building a separate leaderboard interface or ranking service.

The initial beta supports one active persistent leaderboard per experience. Only a registered, active leaderboard appears in the **Friends** and **Global** views.

### Data requirements

Before you register a leaderboard, confirm that its data meets these requirements:

- A single ordered data store backs the leaderboard.
- Each player has one numeric score in that ordered data store.
- Each key identifies one player by user ID, either directly or through a consistent format that includes the user ID.
- Your experience writes score updates to the ordered data store. The platform reads scores but doesn't write them.
- Your score-writing logic runs on the server.

### Prepare ordered data

Choose the path that matches how your experience currently stores scores.

#### Use an existing ordered data store

If your experience already stores leaderboard scores in a compatible ordered data store, keep that data store and register it in Creator Hub. Confirm that each entry contains a numeric score and that its key consistently identifies one player.

You don't need to rebuild the leaderboard data or copy it into a separate ranking service.

#### Create an ordered data store

If you don't already have leaderboard data, create an ordered data store and add it to your existing server-side scoring flow. Write one numeric score for each player, and use the player's user ID as the key or include the user ID in a consistent key format.

```lua
local DataStoreService = game:GetService("DataStoreService")
local playerScores = DataStoreService:GetOrderedDataStore("PlayerScores")

local function saveScore(player, score)
	local success, errorMessage = pcall(function()
		playerScores:SetAsync(tostring(player.UserId), score)
	end)

	if not success then
		warn(errorMessage)
	end
end
```

Verify that scores are present before you register the data store in Creator Hub. For more information about storing and sorting persistent values, see [ordered data stores](../cloud-services/data-stores/index.md#ordered-data-stores).

#### Migrate scores from another backend

If a standard data store, external database, or another backend stores your leaderboard data, migrate the scores that you want to display into an ordered data store. Preserve one numeric score per player and use a consistent key format that identifies the player.

After the migration, update your scoring flow so new score changes continue to reach the ordered data store.

### Configure a leaderboard in Creator Hub

Before you begin, confirm that your experience writes valid scores to the ordered data store.

1. Open [Creator Hub](https://create.roblox.com/dashboard/creations).
2. Select the experience that owns the ordered data store.
3. Register the ordered data store that contains your leaderboard scores.
4. Enable the leaderboard for the experience.
5. Confirm that the leaderboard is active.
6. Test the in-experience leaderboard and verify that scores appear as expected.

Deactivating a leaderboard hides it from players but doesn't delete its ordered data store or scores.

<figure>
<img src="../assets/players/leaderboard/Creator-Hub-Persistent-Leaderboard.png" width="100%" alt="The Leaderboard page for an experience in Creator Hub, with a Create button for configuring a leaderboard." />
<figcaption>Create and manage leaderboard configurations from the Leaderboard page in Creator Hub.</figcaption>
</figure>

### Test Friends and Global views

Test with players who already have score entries.

1. Join the experience as a player with a saved score.
2. Open the in-experience leaderboard.
3. Select **Friends** and confirm that eligible friends appear with the expected scores.
4. Select **Global** and confirm that the player appears with the expected rank and score.
5. Update the player's score through your existing server-side workflow.
6. Confirm that the leaderboard reflects the updated value.

<Alert severity="info">
If a player or score doesn't appear, verify the ordered data store name, numeric value, player key format, and active configuration.
</Alert>

<figure>
<img src="../assets/players/leaderboard/Persistent-Leaderboard-Friends.png" width="66%" alt="An in-experience persistent leaderboard showing player ranks, names, and scores." />
<figcaption>Verify persistent rankings in the in-experience leaderboard.</figcaption>
</figure>

### Manage scores

Continue to update, correct, and moderate scores through your ordered data store workflow. Creator Hub controls which leaderboard is active, but it doesn't replace your score-writing or moderation logic.

Protect score writes with server-side validation, and review suspicious or impossible values before they affect player rankings.

### FAQ

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Do I need to rebuild an existing data store leaderboard?</Typography>
</AccordionSummary>
<AccordionDetails>
No. If the scores are already in a compatible ordered data store, register that data store in Creator Hub.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">What if I use another leaderboard backend?</Typography>
</AccordionSummary>
<AccordionDetails>
Migrate the scores that you want to display to an ordered data store, then register it in Creator Hub.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Who manages score updates and moderation?</Typography>
</AccordionSummary>
<AccordionDetails>
You do. The ordered data store remains the source of truth, and your server-side workflow continues to update and moderate scores.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="buttonLarge">Can I display multiple leaderboards?</Typography>
</AccordionSummary>
<AccordionDetails>
The initial beta supports one active persistent leaderboard per experience.
</AccordionDetails>
</BaseAccordion>
