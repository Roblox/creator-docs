---
title: Teleporting Between Places
description: Explains how to use TeleportService to teleport users between different places in your experience.
---

If you want to build an experience with many distinct places, such as a fantasy world with multiple towns, castles, dungeons, and a vast forest, you can use `Class.TeleportService` to enable users to teleport between places in a universe, servers, or even to another experience.

<Alert severity="warning">
`Class.TeleportService` doesn't support playtesting in Roblox Studio. You must publish the experience and use it on the Roblox application for testing.
</Alert>

## Setting Up Teleportation

To enable teleportation in your experience, use `Class.TeleportService:TeleportAsync()`. The method accepts three parameters:

- The `place ID` for users to teleport to.
- An array containing the `Class.Player` instances representing the users to teleport.
- An optional `Class.TeleportOptions` instance that contains custom properties for the `Class.TeleportService:TeleportAsync()|TeleportAsync()` call.

```lua
local Players = game:GetService("Players")
local TeleportService = game:GetService("TeleportService")

local TARGET_PLACE_ID = 1234 -- replace with your own place ID

local playerToTeleport = Players:GetPlayers()[1] -- get the first user in the experience

TeleportService:TeleportAsync(TARGET_PLACE_ID, {playerToTeleport}, teleportOptions)
```

<Alert severity="warning">
You can only call `Class.TeleportService:TeleportAsync()|TeleportAsync()` from server-side scripts. This limitation reduces client-side exploitation.
</Alert>

If you want to take precautions of handling errors when setting up teleportation, see [Handling Failed Teleports](#handling-failed-teleports).

### Enabling Cross Experience Teleportation

For security purposes, teleporting a user from your experience to another experience owned by others, or the other way around, fails by default. To enable cross experience teleportation, open **Game Settings** > **Security** and enable **Allow Third Party Teleports** on Studio.

## Creating Custom Teleport Screens

When a user triggers a teleport, they see the standard Roblox loading screen as they wait for the new place to load in. You can add a custom teleport screen to improve immersion for users by calling `Class.TeleportService:SetTeleportGui()` on the client and pass through the `Class.ScreenGui` to use before teleporting the user. The following example sets a customized `Class.ScreenGui` located in `Class.ReplicatedStorage` as the loading screen when a teleport happens. It doesn't run any scripts inside of the `Class.ScreenGui`.

```lua
local TeleportService = game:GetService("TeleportService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local teleportGui = ReplicatedStorage.TeleportGui

TeleportService:SetTeleportGui(teleportGui)
```

## Customizing Teleport Options

You can customize teleportations, such as [teleporting users to a specific server](#teleporting-to-specific-servers) and [sending user data along with teleports](#sending-user-data-along-with-teleports), by setting the `Class.TeleportOptions` instance and passing it to the `Class.TeleportService:TeleportAsync()` method.

### Teleporting to Specific Servers

To teleport users to specific servers, set the target server using `Class.TeleportOptions` and pass it to the `Class.TeleportService:TeleportAsync()` method. If you don't specify a server, users are sorted into any public server.

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

### Sending User Data Along with Teleports

Teleporting a user between places discards any local data associated with that user. You can use the following approaches to handle data persistence between places.

- If your experience utilizes **secure** user data like in-experience currency or inventory, implement [data stores](../cloud-services/datastores.md) or [memory stores](../cloud-services/memory-stores/index.md) to maintain data from place to place.

- To send basic **non-secure** data from place to place, call `Class.TeleportOptions:SetTeleportData()` before passing it to `Class.TeleportService:TeleportAsync()|TeleportAsync()`.

<Alert severity="warning">
Don't pass secure data using `Class.TeleportOptions:SetTeleportData()` because it has the risk of exploitation.
</Alert>

```lua
local teleportData = {
    randomNumber = RNG:NextInteger(1, 100);
}

local teleportOptions = Instance.new("TeleportOptions")
teleportOptions:SetTeleportData(teleportData)
```

To get all data of a user arriving from a teleport on the server, use the `Class.Player:GetJoinData()` function, which returns a dictionary including the data associated with the user.

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local joinData = player:GetJoinData()
    local teleportData = joinData.TeleportData
    local randomNumber = teleportData.randomNumber

    print(player.Name .. "joined with the number" .. randomNumber)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

To retrieve only the teleport data on the client, you can use `Class.TeleportService:GetLocalPlayerTeleportData()`.

## ​​Handling Failed Teleports

Like any API call that involves network requests, teleports might fail and throw an error. Even if a call succeeds and the teleport initiates, it can still fail at the last moment without throwing an error and leave the user in the server. When this happens, it triggers `Class.TeleportService.TeleportInitFailed`.

Wrap teleports in a protected call (`pcall()`) and retry if it fails. The following example `Class.ModuleScript` defines a `SafeTeleport` function to teleport the user in a protected call and a `handleFailedTeleport` function to retry failed teleports that are one-time hiccups and drops invalid ones that might have errors in the code.

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

The `SafeTeleport` function receives the same arguments as the `Class.TeleportService:TeleportAsync()|TeleportAsync()` function. You can use the following `Class.ModuleScript` with the `SafeTeleport` function to perform teleports from anywhere in your experience to reduce failed teleports.

```lua
local Players = game:GetService("Players")
local ServerScriptService = game:GetService("ServerScriptService")

local SafeTeleport = require(ServerScriptService.SafeTeleport)

local TARGET_PLACE_ID = 1818 -- replace with your own place ID

local playerToTeleport = Players:GetPlayers()[1] -- get the first user in the game

SafeTeleport(TARGET_PLACE_ID, {playerToTeleport}, teleportOptions)
```
