---
title: Securing the client-server boundary
description: Best practices client-server actions to protect your experience from attack vectors.
---

<Alert severity = 'warning'>
The following content covers various concepts and tactics to improve security and mitigate cheating in your Roblox experiences. It's highly recommended that all developers read through these to ensure that your experiences are secure and fair for all users. Check the sidebar for additional security topics.
</Alert>

Any time a client can trigger an action on the server, there is potential for abuse. While `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions` are the most common attack vector here, other instances like `Class.ProximityPrompt` are susceptible. This section covers how to secure this boundary.

## Validating remote inputs

Every piece of data sent from a client must be validated by the server before it's used. Apply these layers of validation based on what the remote does.

### Context/permission validation

This is necessary for remotes that affect experience's state, progression, or other players. The server must verify if the player has the necessary permissions to make the request. For example, is the player close enough to a shop to buy something? Do they have a key required to open a door? Is their character alive?

Validation is necessary for remotes that:

- Grant rewards or modify player progression
- Affect other players or shared experience state
- Perform actions with distance, timing, or permission requirements (for example, shop distance)

### Type and structure validation

Another attack that exploiters might launch is to send technically valid types but make them extremely large, long, or otherwise malformed. For example, if the server has to perform an expensive operation on a string that scales with length, an exploiter could send an incredibly large or malformed string to bog down the server.

Another common attack that exploiters may use involves sending `Library.table|tables` in place of an `Class.Instance`. Complex payloads can mimic what would be an otherwise ordinary object reference.

For example, provided with an [in-experience shop system](#in-experience-shop) where item data like prices are stored in `Class.NumberValue` objects, an exploiter may circumvent all other checks by doing the following:

```lua title="LocalScript in StarterPlayerScripts"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local itemDataFolder = ReplicatedStorage:WaitForChild("ItemData")
local buyItemEvent = ReplicatedStorage:WaitForChild("BuyItemEvent")
local payload = {
	Name = "Ultra Blade",
	ClassName = "Folder",
	Parent = itemDataFolder,
	Price = {
		Name = "Price",
		ClassName = "NumberValue",
		Value = 0, -- Negative values could also be used, resulting in giving currency rather than taking it!
	},
}

-- Send malicious payload to the server (this will be rejected)
print(buyItemEvent:InvokeServer(payload))  -- Outputs "false Invalid item provided"

-- Send a real item to the server (this will go through!)
print(buyItemEvent:InvokeServer(itemDatafolder["Real Blade"]))  -- Outputs "true" and remaining currency if purchase succeeds
```

```lua title="Script in ServerScriptStorage"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local itemDataFolder = ReplicatedStorage:WaitForChild("ItemData")
local buyItemEvent = ReplicatedStorage:WaitForChild("BuyItemEvent")

local function buyItem(player, item)
	-- Check if the passed item isn't spoofed and is in the ItemData folder
	if typeof(item) ~= "Instance" or not item:IsDescendantOf(itemDataFolder) then
		return false, "Invalid item provided"
	end

	-- The server can then go on to process the purchase based on the example flow below
end

-- Bind "buyItem()" to the remote function's callback
buyItemEvent.OnServerInvoke = buyItem
```

### Value validation

In addition to validating types and data, you should validate the values passed through `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions`, ensuring they are valid and logical in the context being requested. This is essential for remotes that handle currency, items, numeric inputs, or user-generated content. You must ensure values are within expected boundaries (e.g., a purchase quantity is greater than zero) and that provided IDs or names are valid (e.g., an itemId corresponds to a real item in your game).

**Special considerations for numeric values:** Both inf and NaN are valid number types, but both can cause major issues if an exploiter sends them and they're not handled correctly. Use functions like these to detect and reject them:

```lua
local function isNaN(n: number): boolean
	-- NaN is never equal to itself
	return n ~= n
end

local function isInf(n: number): boolean
	-- Number could be -inf or +inf
	return math.abs(n) == math.huge
end
```

### The danger of NaN

An exploiter can send NaN (Not a Number) as an argument. NaN is uniquely dangerous because it is of type "number" but fails all standard comparisons, allowing it to subtly bypass logical checks that seem safe. Let's look at a vulnerable trading system where a player makes an offer.

```lua
-- VULNERABLE SERVER CODE
local function onCreateTradeOffer(player, offeredGold)
    -- 1. TYPE CHECK: This passes! typeof(NaN) is "number".
    if typeof(offeredGold) ~= "number" then
      return "Invalid offer"
    end

    -- 2. RANGE CHECK: This is bypassed!
    -- (NaN < 0) is false. (NaN > 1000000) is also false. The check does nothing.
    if offeredGold < 0 or offeredGold > 1000000 then
      return "Offer out of range"
    end

    -- 3. INVENTORY CHECK: This is bypassed!
    -- (NaN > player.Gold.Value) is false.
    if offeredGold > player.Gold.Value then
      return "Not enough gold" 
    end

    -- VULNERABILITY: A fraudulent trade offer with NaN gold is created!
    createTrade(player, {gold = offeredGold})
    return "Trade offer created."
end
```

The exploiter successfully created a trade offer without having any gold, because every check failed silently. Furthermore, this single NaN value will now poison any other system that tries to use it, and even spread to other players through the offer.

Below are some high-level examples covering secure design of common in-game features.

### In-experience shop

Consider an in-experience shop system with a user interface, for instance a product selection menu with a "Buy" button. When the button is pressed, you can invoke a `Class.RemoteFunction` between the client and the server to request the purchase. However, it's important that the server, the most reliable manager of the experience, confirms that the user has enough money to buy the item.

<figure>
  <img src="../../assets/scripting/security/Remote-Purchase-Flow.png" width="830" alt="Example purchase flow from client to server through a RemoteEvent" />
  <figcaption>Example purchase flow from client to server through a `Class.RemoteFunction`</figcaption>
</figure>

### Weapon targeting

Combat scenarios warrant special attention on validating values, particularly through aiming and hit validation.

Imagine an experience where a player can fire a laser beam at another player. Rather than the client telling the server who to damage, it should instead tell the server the origin position of the shot and the part/position it thinks it has hit. The server can then validate the following:

- The position the client reports shooting from is near the player's character on the server. Note that the server and client will differ slightly due to latency, so extra tolerance will need to be applied.
- The position the client reports hitting is reasonably close to the position of the part the client reports hitting, on the server.
- There are no static obstructions between the position the client reports shooting from and the position the client reports shooting to. This check ensures a client isn't attempting to shoot through walls. Note that this should only check static geometry to avoid valid shots being rejected due to latency.

Additionally, you may want to implement further server-side validations as follows:

- Track when the player last fired their weapon and validate to ensure they're not shooting too fast.
- Track each player's ammo amount on the server and confirm that a firing player has enough ammo to execute the weapon attack.
- If you've implemented teams or a "players against bots" combat system, confirm that the hit character is an enemy, not a teammate.
- Confirm that the hit player is alive.
- Store weapon and player state on the server and confirm that a firing player is not blocked by a current action such as reloading or a state like sprinting.

## Rate limiting

Whenever server-side logic can be triggered by the client (via remotes, Touched events, proximity prompts, ClickDetectors, etc.), there is a possibility that this logic could be spammed by exploiters or even legitimate users. Rate limiting controls how frequently these actions can be performed, preventing abuse and system overload. While it is practical (and sometimes necessary) to implement rate limits on the client, never rely solely on a client-sided rate limit.

For any server-sided logic that can be triggered by a client, always consider the maximum rate at which such logic should run. Many server-sided actions must have their frequency limited to prevent abuse or failure, such as:

- **Roblox API calls**: Backend APIs such as `Class.DataStoreService` and `Class.BadgeService` have built-in rate limits that will cause your requests to fail if exceeded
- **Computationally expensive operations**: Actions that consume significant server resources or impact other clients
- Server example: cloning large models from ServerStorage, even if they're never replicated to clients
- **Client example**: instructing all connected clients to update their GUI simultaneously
- **Exploitable mechanics**: Actions that could be abused if performed rapidly, such as granting invulnerability, teleporting players, or awarding currency

### Token bucket example

A robust and common approach for rate limiting is the **token bucket**  algorithm. Imagine each user has a bucket that can hold a certain number of tokens. To perform an action, the user must spend a token. The bucket refills with new tokens at a steady rate. This method allows for short bursts of actions when needed, but prevents sustained spam by enforcing an average rate over time.

```lua
--!strict
-- Module located in ServerScriptService

type UserId = number

type Bucket = {
    tokens: number,
    last: number,
}

type TokenBucketT = {
    capacity: number,
    refillPerSecond: number,
    buckets: { [UserId]: Bucket },

    allow: (self: TokenBucketT, userId: UserId) -> boolean,
}

local TokenBucket = {}
TokenBucket.__index = TokenBucket

-- Creates a limiter that allows at most `capacity` events, refilling back to
-- full at a rate of `capacity / windowSeconds` tokens per second.
function TokenBucket.new(capacity: number, windowSeconds: number): TokenBucketT
    assert(capacity >= 1, "capacity must be >= 1")
    assert(windowSeconds > 0, "windowSeconds must be > 0")

    local self: TokenBucketT = {
        capacity = capacity,
        refillPerSecond = capacity / windowSeconds,
        buckets = {},
    }
    return (setmetatable(self, TokenBucket) :: any) :: TokenBucketT
end

local function refill(b: Bucket, now: number, cap: number, rate: number)
    local elapsed = now - b.last
    if elapsed > 0 then
        b.tokens = math.min(cap, b.tokens + elapsed * rate)
        b.last = now
    end
end

-- Returns false if the user would exceed their limit
function TokenBucket:allow(userId: UserId): boolean
    local now = time()
    local b = self.buckets[userId]
    if not b then
        b = { tokens = self.capacity, last = now }
        self.buckets[userId] = b
    else
        refill(b, now, self.capacity, self.refillPerSecond)
    end

    if b.tokens >= 1 then
        b.tokens -= 1
        return true
    end
    return false
end

return TokenBucket
```

To use the module, you first create a new limiter instance with `TokenBucket.new(capacity, windowSeconds`). The `capacity` is the maximum number of requests a user can make in a quick burst, and the `windowSeconds` determines how long it takes to refill all those tokens. For example, `TokenBucket.new(5, 10)` creates a limiter that allows bursts of up to 5 requests and refills one token every two seconds (10 seconds / 5 tokens).

Before executing protected logic, make a call to the `:allow(userId)` method, denying the action if it returns false. It's also good practice to clear the user's bucket data when they leave to prevent memory leaks.

The following example script demonstrates how to protect a `RemoteEvent` used for a custom chat system from being spammed by players.

```lua
-- Example usage in a server script

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local TokenBucket = require(ServerScriptService.TokenBucket)
local ChatRemote = ReplicatedStorage:WaitForChild("ChatRemote") :: RemoteEvent

-- 5 messages per 10 seconds (capacity 5, refills at 0.5 tokens/sec)
local chatLimiter = TokenBucket.new(5, 10)

ChatRemote.OnServerEvent:Connect(function(player: Player, message: string)
    if not chatLimiter:allow(player.UserId) then
        -- Too fast: drop the request or send a spam warning
        return
    end

    -- Process message (after other validation)
    broadcastMessage(player, message)
end)

-- Cleanup to prevent memory leaks
Players.PlayerRemoving:Connect(function(p: Player)
    chatLimiter.buckets[p.UserId] = nil
end)
```

## Securing client-triggered instances

`Class.ProximityPrompt|ProximityPrompts`, `Class.ClickDetector|ClickDetectors`, and `Class.DragDetector|DragDetectors` are not remotes, but an exploiter can trigger their events from any distance, at any time, often ignoring properties like `Enabled` or `MaxActivationDistance`. These objects must be secured with the same rigor as remotes.

### ProximityPrompt

- An exploiter can fire any event even if `Enabled` is false on the server.
- `Enabled`, `MaxActivationDistance`, and `RequiresLineOfSight` can be silently changed on the client, so any replicated `Class.ProximityPrompt` can be seen and potentially interacted with from any location.
- The server will accept hold events (such as PromptButtonHoldBegan) even if the server-sided `HoldDuration` is zero. The client can manipulate the `HoldDuration` to perform interactions unnaturally quickly.
- Only the `Triggered` event has a server-side distance check. Other events (like `PromptButtonHoldBegan` and `TriggerEnded`) have no distance check, and can be sent arbitrarily by any client.

### ClickDetector

- There are no checks at all on the server for any events.
- Exploiters can replicate any event at any distance, even if the ClickDetector is disabled (`MaxActivationDistance` of 0 or `DragDetector.Enabled` false).
- Events can be replicated even if the `Class.ClickDetector` is not parented to something clickable.

### DragDetector

- For events inherited from ClickDetector, there are no checks.
- For dragging events, the `Enabled` property and `PermissionPolicy` properties are checked and respected by the server. All other properties are not checked.

When one of these events fires, your server script should perform its own validation before taking any action:

- Check if it's enabled: Ensure that the instance is intended to be enabled by checking its properties (such as Enabled, HoldDuration, RunLocally, etc.) on the server. This step isn't necessary if the object is always enabled.
- Check player state: Ensure that the player can perform the action, given the player's current state. Is the player's character in the world? Is their character close enough to the object? Should the player need to be alive to interact with this object? Check any other player state maintained by your experience on the server as needed.
- Apply rate limiting: As covered in [Rate Limiting](#rate-limiting), apply cooldowns on the client and enforce rate limits on the server to prevent these events from being spammed and abused. For interactions that are expected to take a minimum amount of time, ensure that clients are not completing them too quickly.

**Note on network ownership**: By default, if any of these objects are children of unanchored parts or an unanchored assembly, an exploiter can take network ownership of the parent parts and move them directly to their character, bypassing distance checks. For critical actions, use anchored parts or the network ownership API along with the necessary server-sided validation.

### RemoteEvents and RemoteFunctions

Limit the scope and impact of `Class.RemoteFunction|RemoteFunctions` and `Class.RemoteEvent|RemoteEvents`. Take extreme care in dynamically loading any assets (even textures or sounds) or running experience code (especially via require) based on the arguments of remote functions/events. Avoid implementing remotes that allow a client to specify an arbitrary path or instance reference for the server to delete or modify, even if such modifications seem trivial. Remotes that can change arbitrary instance state or make widespread changes to the DataModel tree can often be chained with other bugs to severely impact overall state or logic. Check not only the type of instance arguments, but also the class and expected location or structure within the DataModel.

## Client to client communication

Some remotes are designed to let one client trigger effects on other clients. This happens when a client fires a remote to the server, which then uses `RemoteEvent:FireAllClients()`, `RemoteEvent:FireClient()`, or similar methods to relay information. This pattern is dangerous if not properly secured - the server must be a gatekeeper, not just a relay.

Imagine a scenario where players can cast a lightning spell. When cast, nearby players see the flash, hear the sound, and experience camera shake.

A vulnerable server script might look like this:

```lua title="Vulnerable server code (script in ServerScriptStorage)"
local castLightningEvent = game.ReplicatedStorage.CastLightning

-- This server script relays the message to everyone with no validation
castLightningEvent.OnServerEvent:Connect(function(player, strikePosition)
    castLightningEvent:FireAllClients(strikePosition)
end)
```

```lua title="Client effect code"
local castLightningEvent = game.ReplicatedStorage.CastLightning

-- Create visual and sound effects on the client
local function createLightningEffect(strikePosition)
    -- Code to shake the camera
    -- Code to play a loud lightning sound
    -- Code to create a visual lightning bolt
    print("Lightning strikes at: " .. tostring(strikePosition))
end

-- When the server broadcasts the event, this client runs the effect
castLightningEvent.OnClientEvent:Connect(createLightningEffect)
```

An exploiter can abuse this vulnerable system by:

- **Spamming**: Calling the remote hundreds of times per second, causing continuous effects that make the experience unplayable
- **Invalid data**: Sending nil, NaN, or wrong types that cause script errors on all clients
- **Unauthorized use**: Casting spells they haven't unlocked or don't have resources for

The server must be a **gatekeeper**, not a relay. Before broadcasting, it must validate the request and apply rate limiting per-player. Here is an example of some methods that could be employed to validate the request.

```lua title="Secure server code"
local castLightningEvent = game.ReplicatedStorage.CastLightning
local playerCooldowns = {}
local COOLDOWN_TIME = 3

castLightningEvent.OnServerEvent:Connect(function(player, strikePosition)
    -- 1. Type validation
    if typeof(strikePosition) ~= "Vector3" then
        return -- Invalid type, reject silently
    end

    -- 2. Check for NaN (NaN ~= NaN is the only way to detect it)
    if strikePosition.X ~= strikePosition.X then
        return -- Contains NaN, reject
    end

    -- 3. Example Rate limiting
    local lastCast = playerCooldowns[player] or 0
    if tick() - lastCast < COOLDOWN_TIME then
        return -- Still on cooldown
    end

    -- 4. Example Permission check
    if not player:GetAttribute("HasLightningSpell") then
        return -- Player doesn't have this spell
    end

    -- 5. Example Range validation
    local character = player.Character
    local humanoidRootPart = character and character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then
        return
    end

    local distance = (humanoidRootPart.Position - strikePosition).Magnitude
    if distance > 100 then
        return -- Out of range
    end

    -- All checks passed - safe to broadcast
    playerCooldowns[player] = tick()
    castLightningEvent:FireAllClients(player, strikePosition)
end)
```

By implementing these checks, it becomes harder for an exploiter to ruin the experience for other players. The server acts as a protective barrier, ensuring only valid, authorized actions are broadcast to other clients.

## Special considerations

The following are some additional cases you should consider that may require specialized handling.

### Data store manipulation

In experiences using DataStoreService to save player data, exploiters may take advantage of invalid data, race conditions to corrupt saves or duplicate items in a DataStore. This is especially problematic in experiences with item trading, marketplaces, and currency systems.

Ensure that any actions performed through a `Class.RemoteEvent` or `Class.RemoteFunction` that affect player data with client input is sanitized based on the following:

- **Instance values** cannot be serialized into a DataStore and will fail. Utilize type validation to prevent this.
- **DataStores have data limits**. Strings of arbitrary length should be checked and/or capped to avoid this, alongside ensuring limitless arbitrary keys cannot be added to tables by the client.
- **Table indices cannot be NaN or nil**. Iterate over all tables passed by the client and verify all indices are valid.
- **DataStores can only accept valid UTF-8 characters**, so you should sanitize all strings provided by the client via utf8.len() to ensure they are valid. utf8.len() will return the length of a string, treating unicode characters as a single character; if an invalid UTF-8 character is encountered it will return nil and the position of the invalid character. Note that invalid UTF-8 strings can also be present in tables as keys and values.
- **Infinite/NaN number exploits** - Exploiters may send values like -1/0, 0/0, or math.huge to cause infinite currency or break calculations. Always validate using the methods described in [the danger of NaN](#the-danger-of-nan).

Race conditions can occur when players manipulate timing between operations to duplicate items or corrupt data.

**Trading exploit example:** A player initiates a trade, sends their item to another player, then immediately leaves the game. If the trade completes but their DataStore save fails due to invalid data, they rejoin with their original items while the other player keeps the traded items - resulting in duplication.

**Prevention strategies:**

- Validate all data before any trade operations
- Use transaction-like patterns where all players' data is validated before committing any changes
- Implement proper error handling that reverts all changes if any part fails

### MarketplaceService

For interactions involving `Class.MarketplaceService`, such as passes or developer products, all purchase validation and item granting must occur on the server. Specifically, utilize the `ProcessReceipt` callback to securely validate purchase receipts. Never trust a client-side signal, such as `PromptProductPurchaseFinished`, to confirm a purchase without server verification, as these can be spoofed. Ensure that your `ProcessReceipt` function thoroughly checks the receipt details and only grants items or currency after confirming a legitimate transaction with Roblox servers, and be prepared to handle cases where a product has already been granted for a given receipt.
