---
title: Teleport between places
description: Explains how to use TeleportService to teleport users between different places in your experience.
---

Many experiences are subdivided into multiple [places](../production/publishing/publish-experiences-and-places.md#create-additional-places), such as a fantasy world with towns, castles, dungeons, and a vast forest. Use `Class.TeleportService` to teleport users between places, to different servers, or even to other experiences.

<Alert severity="warning">
`Class.TeleportService` doesn't support playtesting in Roblox Studio. You must publish the experience and test in the Roblox client.
</Alert>

## Teleport players

To teleport players, use `Class.TeleportService:TeleportAsync()`. This method accepts three parameters:

- The `Class.DataModel.PlaceId|PlaceId` for users to teleport to.
- An array containing the `Class.Player` instances you want to teleport.
- An optional `Class.TeleportOptions` instance that contains custom properties for the `Class.TeleportService:TeleportAsync()|TeleportAsync()` call.

```lua
local Players = game:GetService("Players")
local TeleportService = game:GetService("TeleportService")

local TARGET_PLACE_ID = 12345678901234 -- replace with your own
local playerToTeleport = Players:GetPlayers()[1] -- get the first user in the experience

TeleportService:TeleportAsync(TARGET_PLACE_ID, {playerToTeleport})
```

To get the appropriate players to teleport, you might use a `Class.BasePart.Touched` or a `Class.ProximityPrompt.Triggered` event to get an individual `Class.Player`. Then you can check if the player is part of a team (`Class.Player.Team`) or party (`Class.Player.PartyId`). Finally, you can use `Class.Team:GetPlayers()` or `Class.SocialService:GetPlayersByPartyId()` if you want to teleport the entire group rather than just the individual.

<Alert severity="info">
To reduce client-side exploits, you can only call `Class.TeleportService:TeleportAsync()|TeleportAsync()` from server scripts. If necessary, client scripts can call `Class.TeleportService:Teleport()|Teleport()`, but we don't recommend it. For more information, see [Configure secure teleportation](#configure-secure-teleportation).
</Alert>

## Configure secure teleportation

Three settings handle teleport security.

Setting | Description
:--- | :---
(Creator Dashboard) **Experience** > **Access Settings** > **Access Control for Places** | Controls whether players can join any place in your experience or must first join the [start place](../production/publishing/publish-experiences-and-places.md#create-experiences).
(Creator Dashboard) **Place** > **Access** > **Direct Access Control** | Overrides your experience-level **Access Control for Places** setting for a non-start place.
(Studio) **File** > **Experience Settings** > **Security** > **Allow Third Party Teleports** | Controls teleports from your experience to **experiences that you don't own**. You can leave this setting disabled and still teleport players between published experiences you own.

**Access Control for Places** controls players teleporting **into** your experience and is the most critical setting for preventing teleport-based exploits.

![Access control for places on the Creator Hub](../assets/players/teleport-access-control.png)

- If you choose **Fully open**, players can join any place in your experience through teleports from any experience, including deep links, game invites, joining a connection, and more.

  This is a good choice if your experience has several places and you want friends to be able to easily join each other no matter which place they're in.

- If you choose **Limited to same universe**, players can only join non-start places through teleports within your experiences. This setting allows both client- and server-initiated teleports.

  This is a good choice if you have a legacy experience that you don't want to [migrate to secure teleports](#migrate-to-secure-teleports).

- If you choose **Secure within universe only**, players can only join non-start places through server-initiated teleports within this experience.

  This is a good choice if your experience has a strict progression system before players can access certain areas. It's also a good choice if your experience has a test place that players shouldn't have access to or for places that exclusively use reserved servers.

<Alert severity="success">
Ultimately, your **Access Control for Places** setting depends on the type of experience you want to build. Many experiences don't need secure teleports.
</Alert>

### Migrate to secure teleports

If you have an existing experience that uses client-side teleports and want to require server-initiated teleports, the goal is to move all teleport logic out of client scripts and into server scripts:

1. Find all client scripts that call `Class.TeleportService:Teleport()|Teleport()`.
1. Change these calls to instead fire [remote events](../scripting/events/remote.md). Alternatively, you can change the calls to instead use `Class.ProximityPrompt|ProximityPrompts`, `Class.ClickDetector|ClickDetectors`, or even just the `Class.BasePart.Touched` event.
1. Reimplement the teleport in a server script using `Class.TeleportService:TeleportAsync()|TeleportAsync()`.
1. When no more `Class.TeleportService:Teleport()|Teleport()` calls exist, change **Access Control for Places** to **Secure**.

## Create custom teleport screens

When a user triggers a teleport, they see the standard Roblox loading screen as they wait for the new place to load. If desired, you can add a custom teleport screen by calling `Class.TeleportService:SetTeleportGui()` on the client.

The following example sets a customized `Class.ScreenGui` from `Class.ReplicatedStorage`. Any scripts within the `Class.ScreenGui` do **not** run.

```lua
local TeleportService = game:GetService("TeleportService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local teleportGui = ReplicatedStorage.TeleportGui

TeleportService:SetTeleportGui(teleportGui)
```

## Customize teleport options

You can customize teleportations, such as [teleporting users to a specific server](#teleport-to-specific-servers) and [sending user data along with teleports](#send-user-data-along-with-teleports), by setting the `Class.TeleportOptions` instance and passing it to the `Class.TeleportService:TeleportAsync()` method.

### Teleport to specific servers

To teleport users to specific servers, set the target server using `Class.TeleportOptions` and pass it to the `Class.TeleportService:TeleportAsync()|TeleportAsync()` method. If you don't specify a server, users are teleported into a public server; the information of the first user in the list is used for matchmaking.

To teleport users to a specific public server, set the `Class.TeleportOptions.ServerInstanceId` property as a valid instance ID, which is a unique identifier for a public server.

```lua
local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ServerInstanceId = targetServerId
```

To teleport users to a specific reserved server, set a valid `Class.TeleportOptions.ReservedServerAccessCode`, which is a unique code for entering a reserved server.

```lua
local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ReservedServerAccessCode = reservedServerCode
```

To teleport users to a new reserved server, set `Class.TeleportOptions.ShouldReserveServer` to true.

```lua
local teleportOptions = Instance.new("TeleportOptions")
teleportOptions.ShouldReserveServer = true
```

### Send user data along with teleports

Teleporting a user between places discards any local data associated with that user. You can use the following approaches to handle data persistence between places:

- If your experience utilizes **secure** user data like in-experience currency or inventory, implement [data stores](../cloud-services/data-stores) or [memory stores](../cloud-services/memory-stores/index.md) to maintain data from place to place.

- To send basic **non-secure** data from place to place, call `Class.TeleportOptions:SetTeleportData()` before passing it to `Class.TeleportService:TeleportAsync()|TeleportAsync()`. **Don't** pass secure data using this method; the data is visible to the client and unencrypted.

```lua
local teleportData = {
    randomNumber = RNG:NextInteger(1, 100),
}

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions:SetTeleportData(teleportData)
```

To retrieve all data when a user arrives at the new place after a teleport, use the `Class.Player:GetJoinData()` function, which returns a dictionary with a `TeleportData` key.

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local joinData = player:GetJoinData()
    local teleportData = joinData.TeleportData
    local randomNumber = teleportData.randomNumber

    print(player.Name .. " joined with the number " .. randomNumber)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

To retrieve only the teleport data on the client, you can use `Class.TeleportService:GetLocalPlayerTeleportData()`.

## Handle failed teleports

Like any API call that involves network requests, teleports can fail and throw an error. Wrap them in protected calls (`Global.LuaGlobals.pcall()`). Some failures benefit from retries, particularly those involving reserved servers, so we recommend retrying some number of times on failure.

Even if a call succeeds and the teleport initiates, it can still fail at the last moment without throwing an error and leave the user in the server. When this happens, it triggers the `Class.TeleportService.TeleportInitFailed` event.

The following example `Class.ModuleScript` returns a single `SafeTeleport` function that teleports players in a protected call with retry logic. It also has a `handleFailedTeleport` function to deal with situations in which the call was successful, but the teleport didn't occur.

```lua
local TeleportService = game:GetService("TeleportService")

local ATTEMPT_LIMIT = 5
local RETRY_DELAY = 1
local FLOOD_DELAY = 15

local function SafeTeleport(placeId, players, options)
    local attemptIndex = 0
    local success, result -- define pcall results outside of loop so results can be reported later on

    repeat
        success, result = pcall(function()
            return TeleportService:TeleportAsync(placeId, players, options) -- teleport the user in a protected call to prevent erroring
        end)
        attemptIndex += 1
        if not success then
            task.wait(RETRY_DELAY)
        end
    until success or attemptIndex == ATTEMPT_LIMIT -- stop trying to teleport if call was successful, or if retry limit has been reached

    if not success then
        warn(result) -- print the failure reason to output
    end

    return success, result
end

local function handleFailedTeleport(player, teleportResult, errorMessage, targetPlaceId, teleportOptions)
    if teleportResult == Enum.TeleportResult.Flooded then
        task.wait(FLOOD_DELAY)
    elseif teleportResult == Enum.TeleportResult.Failure then
        task.wait(RETRY_DELAY)
    else
        -- if the teleport is invalid, report the error instead of retrying
        error(("Invalid teleport [%s]: %s"):format(teleportResult.Name, errorMessage))
    end

    SafeTeleport(targetPlaceId, {player}, teleportOptions)
end

TeleportService.TeleportInitFailed:Connect(handleFailedTeleport)

return SafeTeleport
```

The `SafeTeleport` function receives the same arguments as the `Class.TeleportService:TeleportAsync()|TeleportAsync()` function. You can use the following script with the `SafeTeleport` function to perform teleports from anywhere in your experience:

```lua
local Players = game:GetService("Players")
local TeleportService = game:GetService("TeleportService")
local ServerScriptService = game:GetService("ServerScriptService")

local SafeTeleport = require(ServerScriptService.SafeTeleport)

local PLACE_TO_TELEPORT_TO = 12345678

local function teleport(touchPart)
    local playerToTeleport = game.Players:GetPlayerFromCharacter(touchPart.Parent)

    if playerToTeleport then
        SafeTeleport(PLACE_TO_TELEPORT_TO, {playerToTeleport})
    end
end

script.Parent.Touched:Connect(teleport)
```
