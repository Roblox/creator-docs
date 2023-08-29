---
title: Spawn With Friends
description: The Spawn With Friends module automatically moves spawning players near one of their friends.
---

It can be challenging to locate friends in-experience. The **SpawnWithFriends** [developer module](../../resources/modules/index.md) automatically moves spawning players near one of their friends present in the experience. This module can also be configured to teleport a player on command instead of automatically.

<video src="../../assets/developer-modules/spawn-with-friends/Showcase.mp4" controls
width="100%" />

<Alert severity="warning">
	Before spawning occurs, the system confirms that there is enough space, in order to avoid spawning a character inside the map's geometry. Thus, this module might work better in experiences with large, open spaces.
</Alert>

## Module Usage

### Installation

To use the **SpawnWithFriends** module in an experience:

1. From the **View** tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Marketplace** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="876" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Marketplace-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Marketplace-Categories-See-All.png" width="360" />

1. Locate and click the **DEV MODULES** tile.

   <img src="../../assets/studio/toolbox/Marketplace-Categories-Dev-Modules.png" width="200" />

1. Locate the **Spawn With Friends** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/spawn-with-friends/Toolbox-Icon.png" width="143" />

1. In the **Explorer** window, move the entire **SpawnWithFriends** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/spawn-with-friends/Move-Package.png" width="320" />

### Restricted Spawn Areas

This module may result in players spawning in restricted areas like VIP rooms, access-only spaces, etc. To prevent players from teleporting to these areas:

1. Fill the restricted area with invisible `Class.BasePart.Anchored|Anchored` blocks. Make sure `Class.BasePart.CanCollide|CanCollide`, `Class.BasePart.CanTouch|CanTouch`, and `Class.BasePart.CanQuery|CanQuery` are **disabled** for all blocks.

   <figure>
     <img src="../../assets/developer-modules/spawn-with-friends/Restricted-Block.jpg" width="800" />
     <figcaption>Block filling the entire prison room to prevent players from spawning inside</figcaption>
   </figure>

1. Using the **Tag&nbsp;Editor**, accessible from the [View](../../studio/view-tab.md) tab, apply the tag `RestrictedSpawnArea` to each block so that `Class.CollectionService` detects them.

1. Paste the following code into a `Class.Script` within **ServerScriptService**.

   ```lua title='Script'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local CollectionService = game:GetService("CollectionService")

   local SpawnWithFriends = require(ReplicatedStorage:WaitForChild("SpawnWithFriends"))

   local function validator(playerToTeleport, destinationPlayer, teleportationPoint)
   	-- Iterate through all tagged parts
   	for _, area in ipairs(CollectionService:GetTagged("RestrictedSpawnArea")) do
   		local relativePosition = area.CFrame:PointToObjectSpace(teleportationPoint.Position)
   		local size = area.Size
   		local inXBounds = relativePosition.X < size.X / 2 and relativePosition.X > -size.X / 2
   		local inZBounds = relativePosition.Z < size.Z / 2 and relativePosition.Z > -size.Z / 2
   		if inXBounds and inZBounds then
   			return false  -- Spawn destination is within restricted area; abort teleportation
   		end
   	end
   	return true  -- Spawn destination doesn't overlap any restricted area; proceed with teleportation
   end

   SpawnWithFriends.setTeleportationValidator(validator)
   ```

## API Reference

### Functions

#### configure

<p style={{borderRadius:"4px;",backgroundColor:"#3b3b3b;"}}><InlineCode>configure(config:</InlineCode>`Library.table`<InlineCode>):</InlineCode>`nil`</p>

Overrides default configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.Script`.

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`teleportToFriendOnRespawn`</td>
		<td>If set to `false`, teleportation to a friend will only happen manually via [teleportToRandomFriend](#teleporttorandomfriend).</td>
		<td>`true`</td>
	</tr>
	<tr>
		<td>`teleportDistance`</td>
		<td>How far away players should spawn from each other, measured in studs.</td>
		<td>`5`</td>
	</tr>
	<tr>
		<td>`maxCharacterVelocity`</td>
		<td>Characters moving faster than this value won't be picked as teleportation candidates, for instance those in moving vehicles.</td>
		<td>`48`</td>
	</tr>
	<tr>
		<td>`bypassFriendshipCheck`</td>
		<td>If set to true, **all** players will be candidates for teleportation, not just friends.</td>
		<td>`false`</td>
	</tr>
	<tr>
		<td>`showLogs`</td>
		<td>Whether or not to display log messages in the output.</td>
		<td>`false`</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-11'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SpawnWithFriends = require(ReplicatedStorage:WaitForChild("SpawnWithFriends"))

SpawnWithFriends.configure({
	teleportToFriendOnRespawn = true,
	teleportDistance = 5,
	maxCharacterVelocity = 48,
	bypassFriendshipCheck = false,
	showLogs = false
})
```

#### teleportToRandomFriend

<p style={{borderRadius:"4px;",backgroundColor:"#3b3b3b;"}}><InlineCode>teleportToRandomFriend(playerToTeleport:</InlineCode>`Class.Player`<InlineCode>):</InlineCode>`boolean`</p>

Manually triggers teleportation of a player to one of their friends in the experience. Returns a boolean indicating whether or not teleportation succeeded; failure to teleport can be caused by the absence of friends in the server or the inability to find an unobstructed teleportation point. This function can only be called from a `Class.Script`.

#### setTeleportationValidator

<p style={{borderRadius:"4px;",backgroundColor:"#3b3b3b;"}}><InlineCode>setTeleportationValidator(validator:</InlineCode>`function`<InlineCode>):</InlineCode>`nil`</p>

Allows you to perform custom pre-teleportation checks by hooking up a validator callback function. The callback receives three parameters:

<table>
<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`playerToTeleport`</td>
		<td>Reference to the `Class.Player` that is being teleported.</td>
	</tr>
	<tr>
		<td>`destinationPlayer`</td>
		<td>Reference to the target `Class.Player` that `playerToTeleport` is being teleported to.</td>
	</tr>
	<tr>
		<td>`teleportationPoint`</td>
		<td>`Datatype.CFrame` where `playerToTeleport` is teleporting to.</td>
	</tr>
</tbody>
</table>

This function and its callback can only be used in a `Class.Script` and the callback returns a boolean indicating whether teleportation should proceed. For example, the `return` logic in the following validator function ensures that the spawning player and destination player are on the same team.

```lua title='Script' highlight='6-8, 10'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SpawnWithFriends = require(ReplicatedStorage:WaitForChild("SpawnWithFriends"))

-- Teleports players only if they are on the same team
local function validator(playerToTeleport, destinationPlayer, teleportationPoint)
	return playerToTeleport.Team == destinationPlayer.Team
end

SpawnWithFriends.setTeleportationValidator(validator)
```
