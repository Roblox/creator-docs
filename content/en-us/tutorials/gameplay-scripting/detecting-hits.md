---
title: Detecting Hits
description: Explains how hit detection works in a laser tag experience.
prev: /tutorials/gameplay-scripting/implementing-blasters
---

**Detecting hits** is the process of identifying when blasts collide with players, then reducing their health accordingly. At a high-level, you can think of this work as either:

1. A physically simulated check of whether a projectile struck the target.
2. An instantaneous check of whether the blaster was aimed at the target.

The type of hit detection you use depends on the gameplay requirements of your experience. For example, a physically simulated check is appropriate for a dodgeball experience where balls need to leave the hand at a certain velocity, drop as they move through the air, or change direction from weather conditions. However, an instantaneous check is a better match for a laser tag experience where beams must have a near-infinite velocity and ignore environmental factors like gravity and wind speed.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) as a reference, this section of the tutorial teaches you about the scripts behind hit detection in the 3D space, including guidance on:

- Getting the blast direction from the current camera values and the player's blaster type.
- Casting rays in a straight path from the blaster as it blasts.
- Validating the blast to prevent exploitation of blaster data.
- Reducing player health according to the blast damage from each type of blaster and how many rays hit the player.

After you complete this section, you can explore additional development topics to enhance your gameplay, such as audio, lighting, and special effects.

## Get Blast Direction

After a player blasts their blaster, **ReplicatedStorage** > **attemptBlastClient** > **blastClient** > **generateBlastData** calls two functions to start the hit detection process: `rayDirections()` and `rayResults()`.

```lua title="generateBlastData"
local rayDirections = getDirectionsForBlast(currentCamera.CFrame, blasterConfig)
local rayResults = castLaserRay(localPlayer, currentCamera.CFrame.Position, rayDirections)
```

<br></br>

The inputs for `rayDirections` are straightforward: the current camera position and rotation values, and the player's blaster type. If the sample laser tag experience only gave players blasters that produce a single laser beam, **ReplicatedStorage** > **LaserRay** > **getDirectionsForBlast** would be unnecessary because you could use `currentCamera.CFrame.LookVector` to calculate the direction for the blast.

However, because the sample provides an additional blaster type that produces several laser beams with a wide, horizontal spread, `getDirectionsForBlast` must calculate the direction for each laser beam of the spread according to their angles within the blaster configuration:

```lua title="getDirectionsForBlast"
if numLasers == 1 then
	-- For single lasers, they aim straight
	table.insert(directions, originCFrame.LookVector)
elseif numLasers > 1 then
	-- For multiple lasers, spread them out evenly horizontally
	-- over an interval laserSpreadDegrees around the center
	local leftAngleBound = laserSpreadDegrees / 2
	local rightAngleBound = -leftAngleBound
	local degreeInterval = laserSpreadDegrees / (numLasers - 1)

	for angle = rightAngleBound, leftAngleBound, degreeInterval do
		local direction = (originCFrame * CFrame.Angles(0, math.rad(angle), 0)).LookVector
		table.insert(directions, direction)
	end
end
```

<br></br>

To demonstrate this concept further, if you were to include a third blaster type with a wide, **vertical** spread, you could create a new blaster attribute, such as `spreadDirection`, then adjust the `Datatype.CFrame` calculation to use a different axis. For example, note the difference in the `direction` calculations in the following script below for this third blaster type.

```lua
if numLasers == 1 then
	table.insert(directions, originCFrame.LookVector)
elseif numLasers > 1 then
	local leftAngleBound = laserSpreadDegrees / 2
	local rightAngleBound = -leftAngleBound
	local degreeInterval = laserSpreadDegrees / (numLasers - 1)
	for angle = rightAngleBound, leftAngleBound, degreeInterval do
		local direction
		if spreadDirection == "vertical" then
			direction = (originCFrame * CFrame.Angles(math.rad(angle), 0, 0)).LookVector
		else
			direction = (originCFrame * CFrame.Angles(0, math.rad(angle), 0)).LookVector
		end
		table.insert(directions, direction)
	end
end
return directions
```

<br></br>

Ultimately, the `rayDirections()` function returns a table of `Datatype.Vector3|Vectors` that represent the direction of each laser beam. If it's helpful, you can add some logging to get a sense of what this data looks like.

```lua title="generateBlastData"
local rayDirections = getDirectionsForBlast(currentCamera.CFrame, blasterConfig)
for _, direction in rayDirections do  -- new line
    print(direction)                  -- new line
end                                   -- new line
local rayResults = castLaserRay(localPlayer, currentCamera.CFrame.Position, rayDirections)
```

## Cast Rays

`castLaserRay()`, the second function in **ReplicatedStorage** > **attemptBlastClient** > **blastClient** > **generateBlastData**, performs the more complex operations within the script. It begins by specifying parameters so that it can make `Class.Workspace:Raycast()` calls for raycasting purposes. Raycasting is the process of sending out an invisible ray from a `Datatype.Vector3` point in a specific direction with a defined length, then checking its path to see where it intersects with other objects.

This information is particularly useful for first-person shooter experiences because it allows you to see when and where blasts intersect with players or the environment. For example, the following image demonstrates two rays that are casting parallel to each other. According to their point of origin and direction, Ray A misses the wall and continues until it meets its maximum distance, while Ray B collides with the wall. For more information on this process, see [Raycasting](../../workspace/raycasting.md).

<figure>
  <img src="../../assets/tutorials/gameplay-scripting/tutorial-gs-ray.png" width="60%" alt="Ray casting diagram" />
</figure>

The `castLaserRay()` parameters specify that `Raycast()` calls must consider every part in the workspace **except** the character who blasted. The script then casts a ray for each direction in the `directions` table. If a ray hits something, it generates a `Datatype.RaycastResult`, which has five properties:

- `Datatype.RaycastResult.Distance|Distance` – The distance between the ray origin and the intersection point.
- `Datatype.RaycastResult.Instance|Instance` – The `Class.BasePart` or `Class.Terrain` cell that the ray intersects.
- `Datatype.RaycastResult.Material|Material` – The `Enum.Material` at the intersection point.
- `Datatype.RaycastResult.Position|Position` – The `Datatype.Vector3` position of the intersection between the ray and the Instance.
- `Datatype.RaycastResult.Normal|Normal` – The `Datatype.Vector3` of the normal vector of the face the ray intersects with.

<Alert severity="warning">
By default, `Raycast()` does **not** respect the `Class.BasePart.CanCollide` property. If some parts in your experience are strictly decorative, consider how you want them to behave and see `Datatype.RaycastParams.RespectCanCollide`.
</Alert>

The `Datatype.RaycastResult.Instance|Instance` value is the most critical of these properties for the sample laser tag experience's gameplay because it communicates when rays collide with other players. To retrieve this information, the experience uses the **ReplicatedStorage** > **LaserRay** > **castLaserRay** > **getPlayerFromDescendant** helper function. If it returns `nil`, the instance isn't part of a player, meaning the ray hit an inanimate object within the environment.

`castLaserRay()` then uses `Datatype.RaycastResult.Position|Position` and `Datatype.RaycastResult.Normal|Normal` to create a new `Datatype.CFrame` that it calls the ray's `destination`. Every ray has a destination, and it's either where the ray hit in the 3D space, or the point at the end of its maximum distance. Depending on how well your players aim, many or most `taggedPlayer` values are nil.

```lua title="castLaserRay"
if result then
	-- The blast hit something, check if it was a player.
    destination = CFrame.lookAt(result.Position, result.Position + result.Normal)
    taggedPlayer = getPlayerFromDescendant(result.Instance)
else
	-- The blast didn't hit anything, so its destination is
	-- the point at its maximum distance.
	local distantPosition = origin + rayDirection * MAX_DISTANCE
	destination = CFrame.lookAt(distantPosition, distantPosition - rayDirection)
	taggedPlayer = nil
end
```

<br></br>

<Alert severity="info">
`Datatype.RaycastResult.Distance|Distance` isn't particularly interesting in this section's scripts, but you could utilize it in unique ways if you want blasters to inflict more damage at a close range. Similarly, this section's scripts don't consider `Datatype.RaycastResult.Material|Material`, but you could use material types to distinguish between an armored body and a set of weak points during damage calculations.
</Alert>

## Validate the Blast

To prevent cheating, the previous chapter [Implementing Blasters](implementing-blasters.md) explains how `blastClient` notifies the server of the blast using a `Class.RemoteEvent` so that it can verify all data that each client sends, such as whether or not they truly tagged another player with their blaster. This ray validation process occurs in **ServerScriptService** > **LaserBlastHandler** > **getValidatedBlastData** > **getValidatedRayResults**, and each check correlates to a nested module script:

1. First, `getValidatedRayResults` calls `validateRayResult` to check that each entry in the `rayResults` table from the client is a `Datatype.CFrame` and a `Player` (or nil).

1. Next, it calls `isRayAngleFromOriginValid` to compare the expected angles of the laser spread to the ones from the client. This code in particular shows the advantage of using `ReplicatedStorage` because the server can call `getDirectionsForBlast` itself, store the return as the "expected" data, and then compare it against the data from the client.

   Just like blaster validation from the previous chapter, `isRayAngleFromOriginValid` relies on a tolerance value to determine what constitutes an "excessive" difference in angles:

   ```lua title="isRayAngleFromOriginValid"
   local claimedDirection = (rayResult.destination.Position - originCFrame.Position).Unit
   local directionErrorDegrees = getAngleBetweenDirections(claimedDirection, expectedDirection)

   return directionErrorDegrees <= ToleranceValues.BLAST_ANGLE_SANITY_CHECK_TOLERANCE_DEGREES
   ```

   <br></br>

   Roblox abstracts away the most involved bits of math, so the result is a short, highly reusable helper function with applicability across a range of experiences:

   ```lua title="getAngleBetweenDirections"
   local function getAngleBetweenDirections(directionA: Vector3, directionB: Vector3)
       local dotProduct = directionA:Dot(directionB)
       local cosAngle = math.clamp(dotProduct, -1, 1)
       local angle = math.acos(cosAngle)
       return math.deg(angle)
   end
   ```

   <br></br>

1. The next check is the most intuitive. Whereas `getValidatedBlastData` uses `DISTANCE_SANITY_CHECK_TOLERANCE_STUDS` to verify that the player who blasted was near the beam's point of origin, `isPlayerNearPosition` uses identical logic to check if the tagged player was near the beam's destination:

   ```lua title="isPlayerNearPosition"
   local distanceFromCharacterToPosition = position - character:GetPivot().Position
   if distanceFromCharacterToPosition.Magnitude > ToleranceValues.DISTANCE_SANITY_CHECK_TOLERANCE_STUDS then
       return false
   end
   ```

<br></br>

1. The final check `isRayPathObstructed` uses a variation of the ray cast operation to check if the ray's destination is behind a wall or other obstruction from the client's position. For example, if a malicious player were to systematically remove all walls from the experience to tag other players, the server would check and confirm that the rays are invalid because it knows every object position within the environment.

   ```lua title="isRayPathObstructed"
   local scaledDirection = (rayResult.destination.Position - blastData.originCFrame.Position)
   scaledDirection *= (scaledDirection.Magnitude - 1) / scaledDirection.Magnitude
   ```

<br></br>

No anti-exploit strategy is comprehensive, but it's important to consider how malicious players may approach your experience so that you can put checks in place that the server can run to flag suspicious behavior.

## Reduce Player Health

After verifying that a player tagged another player, the final steps in completing the main gameplay loop in the sample laser tag experience are to reduce the tagged player's health, increment the leaderboard, and respawn the player back into the match.

Starting with reducing the tagged player's health, [Spawning and Respawning](spawn-respawn.md) covers the distinction between `Class.Player` and `Class.Player.Character`, specifically that a character is a `Class.Humanoid` model. `Class.Humanoid` models have a `Class.Humanoid.Health|Health` property with a default value of 100. Rather than implementing its own system, the sample laser tag experience uses this built-in property to keep track of how much damage a player needs before they are tagged out of the match.

The experience stores damage values in the `damagePerHit` attribute of each blaster. For example, the blaster that blasts a single laser beam inflicts 15 points of damage, so it takes seven blasts with this blaster to tag out another player. To start the process of tagging a player out, `LaserBlastHandler` calls **ServerScriptService** > **LaserBlastHandler** > **processTaggedPlayers**, which checks the now-validated `rayResults` table for players and passes `damagePerHit` to `onPlayerTagged`.

<Alert severity="info">
Note that this process occurs for each **ray**, not each player. A blast can have multiple laser beams, so a player can receive damage several times from a single blast.
</Alert>

<figure>
  <img src="../../assets/tutorials/gameplay-scripting/tutorial-gs-health.png" width="80%" />
</figure>

`Class.Humanoid.Health|Health` doesn't accept negative values, so `onPlayerTagged` has some logic to keep player health at or above zero. After verifying that player health is above zero, it compares health to `damagePerHit` and uses the smaller of the two values. For example, if a player has 10 health and is hit by a 15 damage laser beam, the laser only inflicts 10 points of damage.

This way of approaching the problem might seem a bit convoluted. For example, why not just set player health to zero if it would be negative? The reason is because setting health values circumvents the force field. Using the `Class.Humanoid:TakeDamage()` method ensures that players don't take damage while their force fields are active.

```lua title="onPlayerTagged"
local function onPlayerTagged(playerBlasted: Player, playerTagged: Player, damageAmount: number)
	local character = playerTagged.Character

	local humanoid = character and character:FindFirstChild("Humanoid")
	if humanoid and humanoid.Health > 0 then

		local damage = math.min(damageAmount, humanoid.Health)

		humanoid:TakeDamage(damage)
		if humanoid.Health <= 0 then
			playerBlasted.leaderstats.Points.Value += 1
		end
	end
end
```

<br></br>

The next step is to increment the leaderboard. It might have seemed unnecessary for `LaserBlastHandler` to include the player who blasted alongside the blast data, but without that information, the experience can't credit the player with tagging someone out. Finally, the tagged out player respawns back into the match, which you can review in [Spawning and Respawning](spawn-respawn.md)

The three chapters in this curriculum cover the experience's core gameplay loop, but there are still plenty of areas to explore, such as:

- **Blaster visuals**: See **ReplicatedStorage** > **FirstPersonBlasterVisuals** and **ServerScriptService** > **ThirdPersonBlasterVisuals**.
- **Audio**: See **ReplicatedStorage** > **SoundHandler**.
- **Teams**: How could you modify this experience to support teams? How would spawn locations and the leaderboard need to change?
- **Victory**: What conditions would make sense to declare one player or one team the winner? Most tag-outs after some amount of time? First player to reach some number of tag-outs? In a team-based experience, could you use player performance from the previous round to balance the teams at the start of a new round?

<Alert severity="info">
We’re interested in hearing from you about your experience following the Gameplay Scripting Curriculum. If you have any questions, concerns, or additional feedback on the process, please comment on our [Gameplay Scripting Curriculum Q&A](https://devforum.roblox.com/t/gameplay-scripting-curriculum-qa/2731896).
</Alert>
