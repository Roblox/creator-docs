---
title: Device trust
description: Learn how the Device Trust API measures the trust level of a player's device, and use IntegrityService to route players between places, restrict features, or reject players.
---

The **Device Trust API** tells you how much you can trust the device of each player who joins your game. As a player joins, Roblox checks whether their device can be trusted, and gives you the result as a **device trust level**. This check is an optional layer of protection on top of the built-in Roblox anti-cheat, which detects exploits after a player joins.

Roblox doesn't take any action based on the device trust level. You decide what it means for your game. For example, you can match players of similar trust together, limit sensitive features such as trading to trusted devices, or reject players whose devices fail the check.

The Device Trust API consists of the `Class.IntegrityService.EvaluatePlayerDeviceTrust` callback and the `Class.Player.DeviceTrustLevel` property. To start using it in your scripts, see [read the trust level](#read-the-trust-level).

Device trust complements the tactics in [security and cheat mitigation tactics](./security-tactics.md) rather than replacing them.

## Device trust levels

The device trust level of a player is one of the following `Enum.PlayerDeviceTrustLevel` values:

| Level      | Meaning                                                                                                                                                                      |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Pending`  | Roblox is still checking the device. Every player starts at this level.                                                                                                      |
| `Unknown`  | The player is on an unsupported platform, or an error occurred on the Roblox side. Roblox can't tell whether the device is trusted, so it might or might not be trustworthy. |
| `None`     | The device failed the check, or the player is on a platform that can't be verified and is often used for cheating.                                                           |
| `Standard` | The device passed some of the checks, but not all of them.                                                                                                                   |
| `Full`     | The device passed every check.                                                                                                                                               |

<Alert severity="warning">
**`Unknown` doesn't mean untrusted.** It means that Roblox can't tell whether the device is trustworthy. It's up to you to decide what `Unknown` means for your game, and you can treat it differently in different parts of your game. For recommendations, see [recommended policies by genre](#recommended-policies-by-genre).
</Alert>

## Supported platforms

Roblox checks device trust on the following platforms:

| Platform    | Status                                                                           | Reported trust level          |
| :---------- | :------------------------------------------------------------------------------- | :---------------------------- |
| Android     | <Chip label="Supported" size="small" variant="outlined" />                       | `None`, `Standard`, or `Full` |
| Chromebook  | <Chip label="Supported" size="small" variant="outlined" />                       | `None`, `Standard`, or `Full` |
| Meta Quest  | <Chip label="Supported" size="small" variant="outlined" />                       | `None`, `Standard`, or `Full` |
| Web browser | <Chip label="Can't be verified" size="small" variant="outlined" color="error" /> | `None`                        |
| iOS         | Coming soon                                                                      | `Unknown`                     |
| macOS       | Coming soon                                                                      | `Unknown`                     |
| Windows     | Coming soon                                                                      | `Unknown`                     |
| Xbox        | Coming soon                                                                      | `Unknown`                     |
| PlayStation | Coming soon                                                                      | `Unknown`                     |

Until Roblox supports a platform, players on it report `Unknown`.

On a supported platform, the trust level that a device can reach also depends on its hardware. For example, not every Android device supports the checks that Roblox uses, so some devices can't reach `Standard` or `Full` even when they haven't been tampered with. For a list of known supported devices, see the [Help Center](https://en.help.roblox.com/hc/en-us/articles/49648939984916-Android-Remote-Attestation).

## How it works

When a player joins your game, Roblox uses hardware signals from their device to confirm the following:

- The device is a physical device and not an emulator.
- The operating system hasn't been tampered with, for example by rooting the device.
- The Roblox app hasn't been modified.

From these checks, Roblox computes a device trust level for the player. To preserve the effectiveness of the system, Roblox doesn't publish the specific signals that it evaluates.

The check runs in the background while the player joins, so it doesn't delay loading. Players can start playing before their trust level is available, so treat a player as untrusted until it is. For details, see [read the trust level](#read-the-trust-level).

The device trust level describes the device, not the player or their account. It doesn't tell you whether a player is cheating. It tells you how difficult cheating is on their device. To check the account instead, use `Class.Player:IsVerified()`.

## Impact on legitimate players

<Alert severity="warning">
Some legitimate players use devices that can't reach a high trust level. If you reject players or restrict features based on device trust, you also affect these players.
</Alert>

No device check is perfect. Some players who have no intention of cheating still reach a low trust level. These players fall into two groups.

### Players who can fix their device

Some devices are capable of passing the checks but aren't set up to, such as a device with an outdated operating system, a rooted device, or a device running a modified version of the Roblox app. These players can usually raise their trust level by updating their device, reinstalling Roblox from an official app store, or returning their device to its original state. You can point affected players to the [troubleshooting steps](https://en.help.roblox.com/hc/en-us/articles/49648939984916-Android-Remote-Attestation) on the Help Center.

### Players who can't fix their device

Other players use older devices that don't support the hardware that these checks rely on. These players can't raise their trust level on that device, and can only reach a higher level by switching to a newer, supported device. For more information, see [supported platforms](#supported-platforms).

### What a rejected player sees

If your game rejects a player based on their trust level, the player is disconnected and sees a message. You can write this message yourself, for example to point players to a mode they can still play. If you don't, Roblox shows a default message that explains why they couldn't join and how they might fix their device.

## Implementation

### Estimate the impact

Before you act on device trust, check how many of your players each trust level covers. The **Anti-cheat** page on Creator Hub estimates how your daily active users, playtime, and revenue on supported platforms break down by device trust level. To view it, you must be the game owner or have the [view analytics for experiences](../../projects/groups.md#roles-and-permissions) permission.

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Hub** and select your game.
1. In the left-hand menu, select **Safety**, then select **Anti-cheat**.

### Choose a policy

Your policy is how your game responds to each device trust level. To choose one:

1. **Decide what `Unknown` means for your game.** It's up to you whether to treat players at `Unknown` like players on trusted devices, like players at `None`, or differently in different parts of your game.
1. **Check the impact.** Review the **Anti-cheat** page on Creator Hub to see how your players break down by trust level. For more information, see [estimate the impact](#estimate-the-impact).
1. **Choose how to respond to each level.** The following responses go from least to most disruptive, and you can combine them:
   - **Route players by trust level.** Send players to places or servers that fit their trust level, such as a casual place for everyone and a ranked place for trusted devices. Every player can still play your game. For an example, see [route players by trust level](#route-players-by-trust-level).
   - **Restrict sensitive features.** Require a higher trust level for a specific feature, such as trading, and let everyone play the rest of your game. For an example, see [gate features by trust level](#gate-features-by-trust-level).
   - **Reject players.** Turn players away from your whole game. Only reject players at `None` as a last resort. For an example, see [reject players on join](#reject-players-on-join).

#### Recommended policies by genre

The following table suggests a starting policy for common genres on Roblox. Adapt it to how your game works.

| Genre                      | `Pending`                       | `Unknown`                                                                          | `None`                                                                            | `Standard`                                                                         | `Full`                                                                             |
| :------------------------- | :------------------------------ | :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Competitive FPS            | Wait until a result is computed | <Chip label="Casual only" size="small" variant="outlined" color="warning" />       | <Chip label="Casual only" size="small" variant="outlined" color="warning" />      | <Chip label="Casual and ranked" size="small" variant="outlined" color="success" /> | <Chip label="Casual and ranked" size="small" variant="outlined" color="success" /> |
| Battlegrounds or fighting  | Wait until a result is computed | <Chip label="Separate servers" size="small" variant="outlined" color="warning" />  | <Chip label="Separate servers" size="small" variant="outlined" color="warning" /> | <Chip label="Trusted servers" size="small" variant="outlined" color="success" />   | <Chip label="Trusted servers" size="small" variant="outlined" color="success" />   |
| Racing, with leaderboards  | Wait until a result is computed | <Chip label="Off leaderboards" size="small" variant="outlined" color="warning" />  | <Chip label="Off leaderboards" size="small" variant="outlined" color="warning" /> | <Chip label="On leaderboards" size="small" variant="outlined" color="success" />   | <Chip label="On leaderboards" size="small" variant="outlined" color="success" />   |
| Trade hangout              | Wait until a result is computed | <Chip label="Can trade" size="small" variant="outlined" color="success" />         | <Chip label="Can't trade" size="small" variant="outlined" color="error" />        | <Chip label="Can trade" size="small" variant="outlined" color="success" />         | <Chip label="Can trade" size="small" variant="outlined" color="success" />         |
| Idle, AFK, or tycoon       | Wait until a result is computed | <Chip label="Earns AFK rewards" size="small" variant="outlined" color="success" /> | <Chip label="No AFK rewards" size="small" variant="outlined" color="error" />     | <Chip label="Earns AFK rewards" size="small" variant="outlined" color="success" /> | <Chip label="Earns AFK rewards" size="small" variant="outlined" color="success" /> |
| Roleplay or social hangout | Wait until a result is computed | <Chip label="Full access" size="small" variant="outlined" color="success" />       | <Chip label="Full access" size="small" variant="outlined" color="success" />      | <Chip label="Full access" size="small" variant="outlined" color="success" />       | <Chip label="Full access" size="small" variant="outlined" color="success" />       |

### Read the trust level

Every use of the Device Trust API starts with `Class.Player.DeviceTrustLevel`, which contains the trust level of a player. Read it on the server when your game needs to make a decision, such as when a player asks to join a ranked match or start a trade.

Keep the following in mind when you read the property:

- Every player starts at `Pending`, and the property changes once, when the trust level becomes available. If Roblox can't finish checking a device, the property might stay at `Pending` for the whole session. Always treat `Pending` as not trusted enough for sensitive features.
- Read the trust level on the server, and have the server tell each client which features to enable or disable, for example by firing a `Class.RemoteEvent` to that player. Avoid reading the property on the client. Only the player's own client can read their trust level, every other client sees `Pending`, and exploiters can change what their client does with it.
- In Studio, the trust level is always `Pending`. For details, see [test your logic](#test-your-logic).

### Wait for the trust level

Some parts of your game might need the trust level before a player starts, such as matchmaking that sends players to a lobby based on their trust level. In that case, you can hold a player in `Class.Players.PlayerAdded` until the callback runs, and then continue with their trust level.

Only use this pattern to accept players and adjust their experience, for example by routing them or gating features. To reject players, return `Reject` from the `Class.IntegrityService.EvaluatePlayerDeviceTrust` callback and keep that logic in the callback, as described in [reject players on join](#reject-players-on-join).

The following script stores the thread that `PlayerAdded` runs in, yields it with `Library.coroutine.yield()`, and resumes it from the callback with `Library.task.defer()`. If the player leaves, or the trust level isn't available after `MAX_WAIT_SECONDS`, the script resumes the thread so that no player waits forever:

```lua title="Script in ServerScriptService"
local IntegrityService = game:GetService("IntegrityService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- How long to hold a player before you stop waiting for their trust level
local MAX_WAIT_SECONDS = 10

-- The thread that's waiting for each player's trust level
local waitingThreads: { [Player]: thread } = {}

-- Resumes the thread that's waiting for the player, if there is one
local function release(player: Player, trustLevel: Enum.PlayerDeviceTrustLevel?)
	local thread = waitingThreads[player]
	if thread then
		waitingThreads[player] = nil
		task.defer(thread, trustLevel)
	end
end

-- Yields until the player's trust level is available. Returns Pending if the
-- wait times out, and nil if the player leaves first.
local function waitForTrustLevel(player: Player): Enum.PlayerDeviceTrustLevel?
	-- Roblox doesn't check devices in Studio, so don't hold players during playtests
	if player.DeviceTrustLevel ~= Enum.PlayerDeviceTrustLevel.Pending or RunService:IsStudio() then
		return player.DeviceTrustLevel
	end

	waitingThreads[player] = coroutine.running()
	task.delay(MAX_WAIT_SECONDS, release, player, Enum.PlayerDeviceTrustLevel.Pending)
	return coroutine.yield()
end

IntegrityService.EvaluatePlayerDeviceTrust = function(player, measures)
	release(player, player.DeviceTrustLevel)
	return { Action = Enum.PlayerDeviceTrustDecision.Accept }
end

Players.PlayerRemoving:Connect(function(player)
	release(player, nil)
end)

Players.PlayerAdded:Connect(function(player)
	local trustLevel = waitForTrustLevel(player)
	if trustLevel == nil then
		return
	end

	-- Start the player's session here, for example by sending them to a lobby
	-- that fits their trust level. Treat Pending as not trusted.
	print(player.Name, "joined with trust level", trustLevel.Name)
end)
```

### Route players by trust level

Instead of rejecting players, you can send them to a place that fits their trust level. For example, a competitive game can accept everyone in a casual start place, and only send players whose trust level meets your requirements to a separate ranked place.

In the casual place, check the trust level before you teleport a player to the ranked place with `Class.TeleportService:TeleportAsync()`. This script assumes that your client UI fires a `Class.RemoteEvent` named `JoinRanked` in `Class.ReplicatedStorage` when a player asks to play ranked:

```lua title="Script in ServerScriptService of the casual place"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TeleportService = game:GetService("TeleportService")

local RANKED_PLACE_ID = 12345678901234 -- Replace with the ID of your ranked place

local RANKED_TRUST_LEVELS = {
	[Enum.PlayerDeviceTrustLevel.Standard] = true,
	[Enum.PlayerDeviceTrustLevel.Full] = true,
}

local joinRankedEvent = ReplicatedStorage:WaitForChild("JoinRanked")

joinRankedEvent.OnServerEvent:Connect(function(player)
	if not RANKED_TRUST_LEVELS[player.DeviceTrustLevel] then
		-- Let the player know that ranked play isn't available on their device
		return
	end

	local success, result = pcall(function()
		return TeleportService:TeleportAsync(RANKED_PLACE_ID, { player })
	end)
	if not success then
		warn("Teleport to ranked place failed:", result)
	end
end)
```

Players can reach the ranked place in other ways, such as by joining a friend. To enforce the same policy there, assign the `Class.IntegrityService.EvaluatePlayerDeviceTrust` callback in the ranked place, as described in [reject players on join](#reject-players-on-join), and reject players who don't meet it:

```lua title="Script in ServerScriptService of the ranked place"
local IntegrityService = game:GetService("IntegrityService")

local RANKED_TRUST_LEVELS = {
	[Enum.PlayerDeviceTrustLevel.Standard] = true,
	[Enum.PlayerDeviceTrustLevel.Full] = true,
}

IntegrityService.EvaluatePlayerDeviceTrust = function(player, measures)
	if RANKED_TRUST_LEVELS[player.DeviceTrustLevel] then
		return { Action = Enum.PlayerDeviceTrustDecision.Accept }
	end

	return {
		Action = Enum.PlayerDeviceTrustDecision.Reject,
		Message = "Ranked play isn't available on this device. You can still play casual mode.",
	}
end
```

Players can start playing before the callback runs, so don't start a ranked match for a player while their trust level is `Pending`. To control which places players can join directly, see [configure secure teleportation](../../projects/teleport.md#configure-secure-teleportation).

These examples keep players at `Pending`, `Unknown`, and `None` out of ranked play. If you decide to give players at `Unknown` the benefit of the doubt, add `Unknown` to both tables.

### Gate features by trust level

To let everyone play but restrict sensitive features, such as trading, check the trust level on the server when a player tries to use the feature. The following script only allows a trade when both players have an allowed trust level. Listing the allowed levels in a table keeps your policy in one place:

```lua title="Script in ServerScriptService"
local TRADE_TRUST_LEVELS = {
	[Enum.PlayerDeviceTrustLevel.Unknown] = true,
	[Enum.PlayerDeviceTrustLevel.Standard] = true,
	[Enum.PlayerDeviceTrustLevel.Full] = true,
}

local function canTrade(player: Player): boolean
	return TRADE_TRUST_LEVELS[player.DeviceTrustLevel] == true
end

local function tradeItem(sender: Player, receiver: Player, itemId: string): boolean
	if not (canTrade(sender) and canTrade(receiver)) then
		return false
	end

	-- Validate and transfer the item on the server here
	return true
end
```

This example blocks trading for players at `Pending` and `None`, and lets players at `Unknown` trade. To also block trading for players at `Unknown`, remove `Unknown` from the table.

To also check the account before a sensitive action, combine the trust level with `Class.Player:IsVerified()`.

### Reject players on join

If routing players or restricting features isn't enough, you can reject players from your game. Assign a function to the `Class.IntegrityService.EvaluatePlayerDeviceTrust` callback in a `Class.Script` in `Class.ServerScriptService`. Roblox calls this function once for each player, as soon as their device trust level is available.

For example, the following script rejects players whose devices fail the check and accepts everyone else, including players at `Unknown`:

```lua title="Script in ServerScriptService"
local IntegrityService = game:GetService("IntegrityService")

IntegrityService.EvaluatePlayerDeviceTrust = function(player, measures)
	if player.DeviceTrustLevel == Enum.PlayerDeviceTrustLevel.None then
		return {
			Action = Enum.PlayerDeviceTrustDecision.Reject,
			Message = "This game can't verify your device.",
		}
	end

	return { Action = Enum.PlayerDeviceTrustDecision.Accept }
end
```

Keep the following in mind when you assign the callback:

- The callback only runs on the server. You can't assign it from a `Class.LocalScript`.
- Each place has one callback. If you assign it more than once, the last assignment replaces the earlier ones, so assign it in a single script. Different places in your game can assign different callbacks.
- The callback runs after `Class.Players.PlayerAdded` fires, because checking the device takes time. When the callback runs, `Class.Player.DeviceTrustLevel` already contains the trust level of the player.
- The callback can yield, for example to load data before it makes a decision. The player keeps playing while the callback runs.
- The callback times out after about 10 seconds. If it takes longer than that to return a decision, Roblox accepts the player.
- If the player leaves, or your scripts remove them, before their trust level is available, Roblox doesn't call the callback for that player.

#### Return a decision

Return a table with the following fields:

| Field     | Type                             | Description                                                                                                                                                                                                                                                                                                                              |
| :-------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Action`  | `Enum.PlayerDeviceTrustDecision` | Required. `Accept` lets the player stay in the game. `Reject` disconnects the player.                                                                                                                                                                                                                                                    |
| `Message` | string                           | Optional. The message that a rejected player sees. If you omit it, Roblox shows a default message that explains how the player might fix their device, based on the measures that their device failed. Roblox filters this message, replaces it with the default message if it fails filtering, and shortens messages that are too long. |

So that a mistake in your code never locks players out, Roblox accepts the player in each of the following cases:

- No script assigns the callback.
- The callback returns `nil`, a value that isn't a table, or a table without a valid `Action`.
- The callback throws an error. Roblox reports the error like any other script error.

#### Respond to individual measures

The second argument of the callback, `measures`, is a table of booleans that explains the trust level of the player. A value of `false` means that the device failed that measure.

| Measure                   | Passes when                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------ |
| `IsPlatformVersionSecure` | The operating system is at or above the minimum version that Roblox considers secure. |
| `IsPlatformBootSecure`    | The operating system started in a secure state.                                       |
| `IsAppSecure`             | The Roblox app hasn't been tampered with.                                             |

Use the measures to refine your policy. The following script rejects players at `None`, also rejects players at `Standard` whose operating system didn't start in a secure state, and accepts everyone else:

```lua title="Script in ServerScriptService"
local IntegrityService = game:GetService("IntegrityService")

IntegrityService.EvaluatePlayerDeviceTrust = function(player, measures)
	local trustLevel = player.DeviceTrustLevel
	local isRejected = trustLevel == Enum.PlayerDeviceTrustLevel.None
		or (trustLevel == Enum.PlayerDeviceTrustLevel.Standard and not measures.IsPlatformBootSecure)

	if isRejected then
		return { Action = Enum.PlayerDeviceTrustDecision.Reject }
	end

	return { Action = Enum.PlayerDeviceTrustDecision.Accept }
end
```

### Common mistakes

Avoid the following patterns when you use the Device Trust API:

- **Comparing trust levels as numbers.** Each trust level has a `Value`, but the order of the values doesn't reflect how much you can trust a device. `Unknown` comes before `None`, so a check that a player's level is greater than `None` also excludes every player at `Unknown`. Instead, list the levels that you allow, as the examples on this page do. If you want to accept players at `Unknown`, include `Unknown` explicitly.
- **Rejecting players from `Class.Players.PlayerAdded`.** When `PlayerAdded` fires, the trust level of the player usually isn't available yet, so a check at that point can reject players whose devices are trusted. Instead, return `Reject` from the `Class.IntegrityService.EvaluatePlayerDeviceTrust` callback, which Roblox calls as soon as the trust level is available. If you need the trust level in `PlayerAdded` for other reasons, such as matchmaking, see [wait for the trust level](#wait-for-the-trust-level).
- **Running slow operations in the callback.** The callback can yield, but it times out after about 10 seconds, and Roblox then accepts the player. Several data store reads or HTTP requests can take long enough to reach this limit, so keep yielding operations in the callback to a minimum.
- **Reading the trust level on the client.** A player's own client can read their trust level, so you might decide in a `Class.LocalScript` whether to show a feature or fire a remote event. Exploiters control their client and can bypass these checks. Instead, read the trust level on the server and tell the client which features to enable. Base client-side changes, such as hiding a trade button, on what the server tells the client, and always check the trust level again on the server before the action happens.
- **Using the measures instead of the trust level.** A measure is also `true` when it isn't available on a device, so a device can pass every measure without being fully trusted. Don't treat a device that passes every measure as `Full`. Check the trust level first, and only use the measures to look for checks that failed.

### Test your logic

Roblox doesn't check devices in Studio, so during playtests the device trust level stays at `Pending` and the callback doesn't run. Because your scripts treat `Pending` as not trusted, features that you gate by trust level are also unavailable during playtests.

To playtest these features and still test your policy, keep your policy in a function that takes the trust level. When `Class.RunService:IsStudio()` returns `true`, skip the trust check, and call your policy with each trust level instead. The following script does this for the trading example in [gate features by trust level](#gate-features-by-trust-level):

```lua title="Script in ServerScriptService"
local RunService = game:GetService("RunService")

local IS_STUDIO = RunService:IsStudio()

local TRADE_TRUST_LEVELS = {
	[Enum.PlayerDeviceTrustLevel.Unknown] = true,
	[Enum.PlayerDeviceTrustLevel.Standard] = true,
	[Enum.PlayerDeviceTrustLevel.Full] = true,
}

local function isTradeAllowed(trustLevel: Enum.PlayerDeviceTrustLevel): boolean
	return TRADE_TRUST_LEVELS[trustLevel] == true
end

-- Check this on the server before every trade
local function canTrade(player: Player): boolean
	-- Roblox doesn't check devices in Studio, so allow trading during playtests
	if IS_STUDIO then
		return true
	end

	return isTradeAllowed(player.DeviceTrustLevel)
end

-- In Studio, print how your policy handles each trust level
if IS_STUDIO then
	for _, trustLevel in Enum.PlayerDeviceTrustLevel:GetEnumItems() do
		print(trustLevel.Name, isTradeAllowed(trustLevel))
	end
end
```

## Limitations

Device trust raises the cost of cheating, but it isn't a complete solution:

- **It doesn't replace secure game design.** Exploits that rely on weak server-side validation, such as trusting positions, scores, or currency reported by the client, still work on trusted devices. Validate important actions on the server, as described in [securing the client-server boundary](./client-server-boundary.md).
- **It reduces cheating, but doesn't eliminate it.** Cheat developers adapt over time, so treat device trust as one layer of your defenses alongside [server-side detection](./server-side-detection.md).
- **Not every platform is supported.** For details, see [supported platforms](#supported-platforms).
