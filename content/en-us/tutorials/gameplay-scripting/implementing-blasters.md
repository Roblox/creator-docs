---
title: Implementing Blaster Behavior
description: Explains end-to-end how a blast mechanic works in a laser tag experience.
next: /tutorials/gameplay-scripting/detecting-hits
prev: /tutorials/gameplay-scripting/spawn-respawn
---

**Implementing blaster behavior** is the process of programming a blast mechanic in first-person shooter experiences. While players can blast with a single click or press of a button, creating a satisfying and accurate blast behavior is important because it enhances players' enjoyment of the overall gameplay.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) as a reference, this section of the tutorial teaches you about the scripts behind implementing blaster behavior for two different types of blasters, including guidance on:

- Detecting when players press the blast button.
- Checking whether the player can use their blaster if they recently pressed the blast button.
- Generating blast data that tells the server who initiated the blast, where it came from, and what was each laser beam's final destination.
- Notifying the server of the blast data so it can perform the appropriate actions if the blast collided with another player.
- Resetting the blaster between each blast to give the blaster enough time to cool down before it can blast again.

After you complete this section, you will learn about the scripts that allow the blaster to detect when its blasts collide with other players, then deduct the corresponding amount of health according to each blaster type.

## Detect Player Input

The first step to implementing blaster behavior is to listen for when a player presses the blast button. The input type that players use to press the blast button depends on which device they're using to access the experience. For example, the sample laser tag experience supports mouse and keyboard controls, gamepads, and touch controls. You can see each of these input types in **ReplicatedStorage** > **UserInputHandler**.

This client script uses `Class.ContextActionService` to bind `MouseButton1` and `ButtonR2` to the blasting action. This means that every time a player either presses a left mouse button or a gamepad's R2 button, it triggers a laser beam to blast out of the blaster. Note that the HUDGui contains a button for blasting on mobile devices, which it connects to later in the script.

```lua title="UserInputHandler"
ContextActionService:BindAction("_", onBlasterActivated, false,
  Enum.UserInputType.MouseButton1,
  Enum.KeyCode.ButtonR2
)
```

<br></br>

Another important note is the use of `Enum.UserInputState.Begin` in the `onBlasterActivated()` definition. Many user interface interactions, such as choosing a blaster in this example, don't occur until after the mouse button comes up (`Enum.UserInputState.End`), which gives users a last-second chance to avoid the interaction. However, a blasting mechanic doesn't feel responsive unless it occurs the instant the button goes down.

To demonstrate, you can change `Enum.UserInputState.Begin` to `Enum.UserInputState.End`, then playtest to see how the responsiveness of the blast impacts the gameplay of the experience. For example, if players can hold down the button without triggering the blast, how might that change the their experience while tagging other players?

```lua title="UserInputHandler"
local function onBlasterActivated(_actionName: string,
  inputState: Enum.UserInputState, _inputObject: InputObject)
    if inputState == Enum.UserInputState.End then  -- updated line, be sure to change back
        attemptBlastClient()
    end
end
```

## Check Whether the Player Can Blast

After `UserInputHandler` detects a button press or screen tap, it calls **ReplicatedStorage** > **Blaster** > **attemptBlastClient** to check whether the player can blast or not. Like most checks in the sample laser tag experience, it occurs twice: first on the client, then later on the server. `attemptBlastClient` then calls **ReplicatedStorage** > **Blaster** > **canLocalPlayerBlast** to perform a simple check of the `blasterStateClient` player attribute:

```lua title="canLocalPlayerBlast"
local function canLocalPlayerBlast(): boolean
    return localPlayer:GetAttribute(PlayerAttribute.blasterStateClient) == BlasterState.Ready
end
```

<br></br>

If you examine **ReplicatedStorage** > **Blaster** > **BlasterState**, you can see that the experience has three blaster states: `Ready`, `Blasting`, and `Disabled`. To see the effect of each of these states, you can playtest the experience, select your player under the **Players** service, then observe the **blasterStateClient** attribute in the **Properties** window. Notice how it displays `Disabled` while you choose your blaster, `Ready` most of the time, and `Blasting` for less than a second after you press the button.

<video controls src="../../assets/tutorials/gameplay-scripting/Blast-State-Video-State.mp4" width="100%"></video>

This slight pause prevents you from being able to blast as quickly as you can click. For example, if you change the function to always return true, you can rapidly blast your blaster without any delay, which is unrealistic for laser tag gameplay.

```lua title="canLocalPlayerBlast"
local function canLocalPlayerBlast(): boolean
    return true -- updated line, be sure to change back
end
```

<br></br>

<video controls src="../../assets/tutorials/gameplay-scripting/Blast-State-Video-True.mp4" width="100%"></video>

## Generate Blast Data

After verifying that the player's blaster is in the `Ready` state, `attemptBlastClient` calls **ReplicatedStorage** > **attemptBlastClient** > **blastClient**. The first step that `blastClient` takes is to set the `blasterStateClient` player attribute to `Blasting`, which avoids the same rapid fire case from earlier.

<Alert severity="info">
Changing `BlasterState` to `Blasting` also plays a sound in **ReplicatedStorage** > **SoundHandler**.
</Alert>

The next step is to generate the blast data. If you review **ReplicatedStorage** > **Blaster** > **BlastData**, you can see that each blast consists of three pieces of information:

- The player who initiates the blast.
- A `DataType.CFrame` that represents the blast's point of origin.
- A `RayResult` table that contains each laser beam's final destination and the hit player,  if hit another player.

To generate this data, `blastClient` calls **ReplicatedStorage** > **attemptBlastClient** > **blastClient** > **generateBlastData**, which you can review below.

```lua title="generateBlastData"
local function generateBlastData(): BlastData.Type
    local blasterConfig = getBlasterConfig()

    local rayDirections = getDirectionsForBlast(
        currentCamera.CFrame, blasterConfig)
    local rayResults = castLaserRay(
        localPlayer, currentCamera.CFrame.Position, rayDirections)

    local blastData: BlastData.Type = {
        player = localPlayer,
        originCFrame = currentCamera.CFrame,
        rayResults = rayResults,
    }
    return blastData
end
```

<br></br>

This function starts by using `getBlasterConfig` to retrieve the player's blaster type. The sample provides two types of blasters: one that produces several beams with a wide, horizontal spread, and another that produces a single beam. You can find their configurations in **ReplicatedStorage** > **Instances** > **LaserBlastersFolder**.

The function then uses `currentCamera.CFrame` as the point of origin for the blast, passing it to `getDirectionsForBlast`. At this point, the code is no longer about the blaster, it's about the laser beam, which you will learn more about laser beams in the [Detecting Hits](detecting-hits.md) section of the tutorial. Finally, after creating the `rayResults` table, `generateBlastData` has all the information it needs to return the blast data to `blastClient`.

## Notify the Server

Once `blastClient` has complete data for the blast, it fires two events:

```lua title="blastClient"
local laserBlastedBindableEvent = ReplicatedStorage.Instances.LaserBlastedBindableEvent
local laserBlastedEvent = ReplicatedStorage.Instances.LaserBlastedEvent

laserBlastedBindableEvent:Fire(blastData)
laserBlastedEvent:FireServer(blastData)
```

<br></br>

The `Class.BindableEvent` notifies other client scripts of the blast. For example, **ReplicatedStorage** > **FirstPersonBlasterVisuals** uses this event to know when to display visual effects, such as the blast animation and cooldown bar. Similarly, the `Class.RemoteEvent` notifies server scripts of the blast, which begins processing the blast in **ServerScriptService** > **LaserBlastHandler**.

```lua title="LaserBlastHandler"
local function onLaserBlastedEvent(playerBlasted: Player, blastData: BlastData.Type)
    local validatedBlastData = getValidatedBlastData(playerBlasted, blastData)
    if not validatedBlastData then
        return
    end

    if not canPlayerBlast(playerBlasted) then
        return
    end

    blastServer(playerBlasted)

    processTaggedPlayers(playerBlasted, blastData)

    for _, replicateToPlayer in Players:GetPlayers() do
        if playerBlasted == replicateToPlayer then
            continue
        end
        replicateBlastEvent:FireClient(replicateToPlayer, playerBlasted, blastData)
    end
end
```

<br></br>

To help prevent cheating, the server must verify all data that each client sends. These checks include:

1. Is `BlastData` a table? Does it contain a `Class.CFrame` and another table named `rayResults`?
1. Does the player have a blaster equipped?
1. Does the player have a character and a location within the world?
1. After sending the blast data, has the player moved an excessive distance away from where they blasted the laser beam?

This last check involves a judgment call, and according to server latency and player movement speed, you might decide that different values are excessive for your own experience. To demonstrate how to make this judgment call, you can get a sense of the typical magnitude of positional change by adding a print statement in `getValidatedBlastData` and playtesting the experience.

```lua title="getValidatedBlastData"
local distanceFromCharacterToOrigin = blastData.originCFrame.Position - rootPartCFrame.Position
print(distanceFromCharacterToOrigin.Magnitude) -- updated line, be sure to remove
if distanceFromCharacterToOrigin.Magnitude > ToleranceValues.DISTANCE_SANITY_CHECK_TOLERANCE_STUDS then
    warn(`Player {player.Name} failed an origin sanity check while blasting`)
    return
end
```

<br></br>

As you move and blast, note the output. It might look something like this:

```text
1.9019629955291748
3.1549558639526367
2.5742883682250977
4.8044586181640625
2.6434271335601807
```

If you increase the movement speed for players in **ReplicatedStorage** > **PlayerStateHandler** > **togglePlayerMovement**, then playtest again, you will likely encounter many failed checks due to excessive movement between blasts.

```lua title="togglePlayerMovement"
local ENABLED_WALK_SPEED = 60 -- updated line, be sure to change back
```

<br></br>

For this reason, if you decide to increase movement speed, consider adjusting `DISTANCE_SANITY_CHECK_TOLERANCE_STUDS` in **ServerStorage** > **ToleranceValues**. For more information on how to approach this problem, see [Movement Validation](../../scripting/security/security-tactics.md#movement-validation).

The server then does the following:

- Validates `rayResults`.
- Checks whether the player can blast.
- Resets the blaster state.
- Reduces health for any tagged players.
- Replicates the blast to all other players so that they can see third-person visuals.

For more information on these server operations, see the [Detecting Hits](detecting-hits.md) section of the tutorial.

## Reset the Blaster

In the sample laser tag experience, blasters use a heat mechanic. Rather than reloading after a set number of blasts, they need time to "cool down" between each blast. This same cooldown delay occurs on both the client (`blastClient`) and the server (`blastServer`), with the server acting as the source of truth.

```lua title="blastServer"
local blasterConfig = getBlasterConfig(player)
local secondsBetweenBlasts = blasterConfig:GetAttribute("secondsBetweenBlasts")

task.delay(secondsBetweenBlasts, function()
    local currentState = player:GetAttribute(PlayerAttribute.blasterStateServer)
    if currentState == BlasterState.Blasting then
        player:SetAttribute(PlayerAttribute.blasterStateServer, BlasterState.Ready)
    end
end)
```

<br></br>

The `secondsBetweenBlasts` attribute is part of the blaster configuration in **ReplicatedStorage** > **Instances** > **LaserBlastersFolder**. After the `secondsBetweenBlasts` delay passes, the player can blast again, and the entire process repeats. To help the player understand when they can blast again, the experience includes a cooldown bar.

At this point, players can spawn and respawn, aim and blast, but the experience still has to determine the results of each blast. In the next section of the tutorial, you will learn how to program the ability for the blaster to detect when the blast hits another player, then reduce the appropriate amount of player health according to blaster settings.
