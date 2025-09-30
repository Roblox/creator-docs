---
title: Security and cheat mitigation tactics
description: Explore security tactics and cheat mitigation tactics for Roblox experiences.
---

The following document covers various concepts and tactics to improve security and mitigate cheating in your Roblox experiences. It's highly recommended that all developers read through these to ensure that your experiences are secure and fair for all users.

## 1. General Principles

Before diving into specific tactics, it's essential to understand the foundational principles of Roblox security. A secure experience is built on a mindset that anticipates adversarial actions. Before writing a single line of code, you must internalize these foundational principles. They should inform every architectural and design decision you make.

### 1.1 Never trust the client

This is the foundational principle. A determined exploiter has complete control over their local state and network traffic. Because exploiters have this level of control, any security measure that relies on client-side enforcement will eventually be bypassed. This is not a limitation of Roblox: it's a fundamental reality of client-server architectures. Assume every piece of data sent from the client has been manipulated, fabricated, or sent with malicious intent. This includes the power to:

- Decompile any replicated LocalScript or any ModuleScript, even if they never run on the client
- Take network ownership of their character and any unanchored parts
- Trigger client-initiated events such as Touched events or ProximityPrompt activations at any range or frequency
- Modify their player's position, physics, or interactions with the world
- Fire or invoke RemoteEvents and RemoteFunctions at any frequency with arbitrary arguments (besides the first Player argument)
- Change anything in their local DataModel without firing any expected events
- Arbitrarily alter the behavior of any locally running code

Because of this, all critical game logic must be validated server-side or run exclusively on the server. The consequences of this control are detailed in [Section 4 (Network Ownership, Movement Validation, and Physics Exploits)](#4-network-ownership-movement-validation-and-physics) and [Section 5 (Access Control and Confidentiality)](#5-access-control-and-confidentiality).

### 1.2 Server authority

The server must be the ultimate source of truth for all game state, rules, player progression, and critical decisions. The client's role is to render the world and send user input to the server.

The server's role is to:

- Receive input from the client
- Validate that the requested action is possible and permissible
- Execute the action and update its authoritative game state
- Replicate the results to all relevant clients

For example, if a player says "I want to buy a Bloxy Cola" the server must know the item's true price, the player's money, and the player character's physical distance from the shop before validating and approving the transaction. As much as possible, the state to be validated should be maintained exclusively by the server and not by clients. In the example, if the Bloxy Cola transaction is approved, the server should subtract the Bloxy Cola's price from the player's money, however, the server cannot necessarily always control the player's character.

### 1.3 Security by design

Integrate security considerations into your game's design from the very beginning, rather than attempting to bolt them on later as an afterthought.

- Threat model every new feature. For every new feature, ask
  - How could an attacker exploit this if they have full control of their client?
  - If a client could send any value for any parameters used in the feature, what's the worst possible outcome?
  - What happens if this feature is used 1,000+ times per second? What is the maximum rate at which it should be used?
  - Could an exploiter use this to ruin another player's experience?
  - How much resources, in the worst case, could this feature feasibly use?
  - What is the minimum internal information or game state that I need to expose for this feature?
- Partition responsibilities early. Keep game logic and data in ServerScriptStorage from day one. Never place them in replicated containers, e.g. ReplicatedStorage or Workspace.

## 2. Defensive design tactics

Basic design decisions can serve as "first step" security measures to discourage exploits. The core principle is to design systems where cheating is either impossible or provides no meaningful advantage, rather than trying to detect and prevent cheating after the fact.

Consider a shooter game where players earn points for kills. An exploiter might create bots that teleport to the same location to be repeatedly killed for easy points. This scenario illustrates the difference between reactive and defensive approaches:

<table><thead>
  <tr>
    <th>Approach</th>
    <th>Predictable outcome</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Chase down bots by writing code that attempts to detect them (reactive approach).</td>
    <td>
		<Alert severity = 'error'>Exploiters seeking quick points will find a way around your complex detection code and use their bots in a different way.</Alert>
		</td>
  </tr>
  <tr>
    <td>Reduce or outright remove point gains for kills on newly spawned players (defensive approach).</td>
    <td>
		<Alert severity = 'success'>Extra time and friction is now required for exploiters because they get no points for instantly killing their bots. Additionally, "spawn campers" are discouraged because they no longer get points for killing newly spawned players.</Alert>
		</td>
  </tr>
</tbody>
</table>

Additional defensive design scenarios:

<table><thead>
  <tr>
    <th>Potential exploit scenario</th>
    <th>Reactive Approach (less effective)</th>
    <th>Defensive approach (more effective)</th>
  </tr></thead>
<tbody>
  <tr>
    <td>(Obby) Exploiter teleports to the end to claim rewards</td>
    <td>Only check the player's final position and try to detect impossible completion times</td>
    <td>Design with mandatory, sequential checkpoints. Server validates each checkpoint was activated in order before granting rewardsYou can add another layer by flagging players who complete stages faster than humanly possible. The design of the game (requiring checkpoints) is what enables the effective server-side validation.</td>
  </tr>
  <tr>
    <td>(Combat) Client reports dealing impossible damage amounts</td>
    <td>Try to detect and filter out impossible damage values</td>
    <td>Server calculates all damage from server-sided weapon stats and validates hits through server-side raycasting</td>
  </tr>
  <tr>
    <td>(Economy) Exploiter duplicates items through rapid requests</td>
    <td>Try to detect duplicate requests or unusual patterns</td>
    <td>Implement server-side cooldowns and validate all transactions against current player inventory state</td>
  </tr>
</tbody></table>

<Alert severity = 'info'> <AlertTitle>Key principle</AlertTitle> <br /> When designing a new feature, ask yourself: "How would an exploiter abuse this, and can I change the design to make that abuse impossible or worthless?" Instead of trying to detect cheating after it happens, design your game so that cheating either cannot occur or provides no meaningful advantage.</Alert>

## 3. Securing the client-server boundary

Any time a client can trigger an action on the server, there is potential for abuse. While `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions` are the most common attack vector here, other instances like `Class.ProximityPrompt` are susceptible. This section covers how to secure this boundary.

### 3.1 Validating remote inputs

Every piece of data sent from a client must be validated by the server before it's used. Apply these layers of validation based on what the remote does.

#### Context/permission validation

This is necessary for remotes that affect game state, progression, or other players. The server must verify if the player has the necessary permissions to make the request. For example, is the player close enough to a shop to buy something? Do they have a key required to open a door? Is their character alive?

Validation is necessary for remotes that:

- Grant rewards or modify player progression
- Affect other players or shared game state
- Perform actions with distance, timing, or permission requirements (for example, shop distance)

#### Type and structure validation

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

#### Value validation

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

#### The danger of NaN

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

#### In-experience shop

Consider an in-experience shop system with a user interface, for instance a product selection menu with a "Buy" button. When the button is pressed, you can invoke a `Class.RemoteFunction` between the client and the server to request the purchase. However, it's important that the server, the most reliable manager of the experience, confirms that the user has enough money to buy the item.

<figure>
  <img src="../../assets/scripting/security/Remote-Purchase-Flow.png" width="830" alt="Example purchase flow from client to server through a RemoteEvent" />
  <figcaption>Example purchase flow from client to server through a `Class.RemoteFunction`</figcaption>
</figure>

#### Weapon targeting

Combat scenarios warrant special attention on validating values, particularly through aiming and hit validation.

Imagine a game where a player can fire a laser beam at another player. Rather than the client telling the server who to damage, it should instead tell the server the origin position of the shot and the part/position it thinks it has hit. The server can then validate the following:

- The position the client reports shooting from is near the player's character on the server. Note that the server and client will differ slightly due to latency, so extra tolerance will need to be applied.
- The position the client reports hitting is reasonably close to the position of the part the client reports hitting, on the server.
- There are no static obstructions between the position the client reports shooting from and the position the client reports shooting to. This check ensures a client isn't attempting to shoot through walls. Note that this should only check static geometry to avoid valid shots being rejected due to latency.

Additionally, you may want to implement further server-side validations as follows:

- Track when the player last fired their weapon and validate to ensure they're not shooting too fast.
- Track each player's ammo amount on the server and confirm that a firing player has enough ammo to execute the weapon attack.
- If you've implemented teams or a "players against bots" combat system, confirm that the hit character is an enemy, not a teammate.
- Confirm that the hit player is alive.
- Store weapon and player state on the server and confirm that a firing player is not blocked by a current action such as reloading or a state like sprinting.

### 3.2 Rate limiting

Whenever server-side logic can be triggered by the client (via remotes, Touched events, proximity prompts, ClickDetectors, etc.), there is a possibility that this logic could be spammed by exploiters or even legitimate users. Rate limiting controls how frequently these actions can be performed, preventing abuse and system overload. While it is practical (and sometimes necessary) to implement rate limits on the client, never rely solely on a client-sided rate limit.

For any server-sided logic that can be triggered by a client, always consider the maximum rate at which such logic should run. Many server-sided actions must have their frequency limited to prevent abuse or failure, such as:

- **Roblox API calls**: Backend APIs such as `Class.DataStoreService` and `Class.BadgeService` have built-in rate limits that will cause your requests to fail if exceeded
- **Computationally expensive operations**: Actions that consume significant server resources or impact other clients
- Server example: cloning large models from ServerStorage, even if they're never replicated to clients
- **Client example**: instructing all connected clients to update their GUI simultaneously
- **Exploitable game mechanics**: Actions that could be abused if performed rapidly, such as granting invulnerability, teleporting players, or awarding currency

#### Token bucket example

A robust and common approach for rate limiting is the **token bucke**t algorithm. Imagine each user has a bucket that can hold a certain number of tokens. To perform an action, the user must spend a token. The bucket refills with new tokens at a steady rate. This method allows for short bursts of actions when needed, but prevents sustained spam by enforcing an average rate over time.

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

### 3.3 Securing client-triggered instances

`Class.ProximityPrompt|ProximityPrompts`, `Class.ClickDetector|ClickDetectors`, and `Class.DragDetector|DragDetectors` are not remotes, but an exploiter can trigger their events from any distance, at any time, often ignoring properties like `Enabled` or `MaxActivationDistance`. These objects must be secured with the same rigor as remotes.

#### ProximityPrompt

- An exploiter can fire any event even if `Enabled` is false on the server.
- `Enabled`, `MaxActivationDistance`, and `RequiresLineOfSight` can be silently changed on the client, so any replicated `Class.ProximityPrompt` can be seen and potentially interacted with from any location.
- The server will accept hold events (such as PromptButtonHoldBegan) even if the server-sided `HoldDuration` is zero. The client can manipulate the `HoldDuration` to perform interactions unnaturally quickly.
- Only the `Triggered` event has a server-side distance check. Other events (like `PromptButtonHoldBegan` and `TriggerEnded`) have no distance check, and can be sent arbitrarily by any client.

#### ClickDetector

- There are no checks at all on the server for any events.
- Exploiters can replicate any event at any distance, even if the ClickDetector is disabled (`MaxActivationDistance` of 0 or `DragDetector.Enabled` false).
- Events can be replicated even if the `Class.ClickDetector` is not parented to something clickable.

#### DragDetector

- For events inherited from ClickDetector, there are no checks.
- For dragging events, the `Enabled` property and `PermissionPolicy` properties are checked and respected by the server. All other properties are not checked.

When one of these events fires, your server script should perform its own validation before taking any action:

- Check if it's enabled: Ensure that the instance is intended to be enabled by checking its properties (such as Enabled, HoldDuration, RunLocally, etc.) on the server. This step isn't necessary if the object is always enabled.
- Check player state: Ensure that the player can perform the action, given the player's current state. Is the player's character in the world? Is their character close enough to the object? Should the player need to be alive to interact with this object? Check any other player state maintained by your experience on the server as needed.
- Apply rate limiting: As covered in the Rate Limiting section, apply cooldowns on the client and enforce rate limits on the server to prevent these events from being spammed and abused. For interactions that are expected to take a minimum amount of time, ensure that clients are not completing them too quickly.

**Note on network ownership**: By default, if any of these objects are children of unanchored parts or an unanchored assembly, an exploiter can take network ownership of the parent parts and move them directly to their character, bypassing distance checks. For critical actions, use anchored parts or the network ownership API along with the necessary server-sided validation.

#### RemoteEvents and RemoteFunctions

Limit the scope and impact of `Class.RemoteFunction|RemoteFunctions` and `Class.RemoteEvent|RemoteEvents`. Take extreme care in dynamically loading any assets (even textures or sounds) or running experience code (especially via require) based on the arguments of remote functions/events. Avoid implementing remotes that allow a client to specify an arbitrary path or instance reference for the server to delete or modify, even if such modifications seem trivial. Remotes that can change arbitrary instance state or make widespread changes to the DataModel tree can often be chained with other bugs to severely impact overall state or logic. Check not only the type of instance arguments, but also the class and expected location or structure within the DataModel.

### 3.4 Client to client communication

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

- **Spamming**: Calling the remote hundreds of times per second, causing continuous effects that make the game unplayable
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

### 3.5 Special considerations

The following are some additional cases you should consider that may require specialized handling.

#### Data store manipulation

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

#### MarketplaceService

For interactions involving `Class.MarketplaceService`, such as game passes or developer products, all purchase validation and item granting must occur on the server. Specifically, utilize the `ProcessReceipt` callback to securely validate purchase receipts. Never trust a client-side signal, such as `PromptProductPurchaseFinished`, to confirm a purchase without server verification, as these can be spoofed. Ensure that your `ProcessReceipt` function thoroughly checks the receipt details and only grants items or currency after confirming a legitimate transaction with Roblox servers, and be prepared to handle cases where a product has already been granted for a given receipt.

## 4. Network ownership, movement validation, and physics

[Network ownership](../../physics/network-ownership.md) is one of the more nuanced and commonly misunderstood aspects of the game engine. When a player has network ownership of a part or assembly, they have complete authority over the physics simulation for those objects. By default, the server grants network ownership of unanchored parts to clients with nearby player characters to distribute the load of the physics simulation. This system improves responsiveness but creates significant security implications that every developer must understand.

### 4.1 Understanding network ownership

When a client has network ownership over parts (including their character), they have access to:

**Assembly manipulation:**

- Teleport to any position.
- This can be used to quickly gain ownership and control of as many unanchored parts and assemblies as the server will allow.
- Manipulate their movement and state, such as flying or changing their speed.
- Exploiters can set their Humanoid WalkSpeed to any value. Properties can be modified locally without firing any events on the local client, and without such property changes capable of being read from local scripts.
- Play arbitrary animations and manipulate animation state.
- Bypass physical obstacles and alter their collision.

**Physics manipulation**

- Control the position and rotation of any unanchored parts or mechanisms, including replicating `Inf` or `NaN` components in `Datatype.CFrame|CFrames`.
  Set part velocities to extreme values (including `Inf` or `NaN`), which can interfere with the physics of other unanchored parts/assemblies, even those that are not owned by the exploiter.
  This is often used to fling other player characters and nearby parts.
  Manipulate the firing of Touched events, including not firing Touched at all.

Should your game necessitate gameplay-critical fully unanchored parts or assemblies, consider using the network ownership API to manually set ownership or turn off automatic ownership.

### 4.2 Movement validation

In competitive games, server-side validation of player movement is crucial for game integrity, as clients control character movement and physics. However, a universal solution doesn't exist due to varying gameplay mechanics.

Traditional methods often fall short in complex scenarios. Simple distance-over-time calculations may suffice for competitive shooters but fail in physics-intensive games involving vehicles, flight, or intricate interactions. Validation must also account for network latency.

<Alert severity = 'warning'>
**Server authority** is currently in beta and will be released soon.
The most reliable solution for preventing physics and movement exploits is server authority, which moves physics simulation and movement validation entirely to the server. This eliminates the fundamental security weakness of client-controlled movement by ensuring all movement decisions are made on the server with authoritative validation.
</Alert>

Until server authority becomes available, developers implementing client-side validation must understand that effective approaches vary dramatically. Basic heuristics can flag innocent players with unstable connections, and straightforward speed calculations break down in games with complex movement systems. Position updates are subject to internet latency, requiring averaging over time. Many developers find that leaky bucket-style accumulators work well for handling burst movements while preventing sustained violations.

Practical implementation often requires projecting movement onto specific planes (e.g., XZ for ground-based movement) to avoid penalizing legitimate vertical movement while detecting horizontal teleportation. Games with legitimate teleportation mechanics need explicit exemption systems. Validation frequency, tolerance levels, and enforcement strategies should be tuned to each game's specific requirements.

## 5. Access control and confidentiality

Understanding what information and assets are visible to clients is critical for maintaining both the security and confidentiality of your experience. Developers often underestimate how much is visible to exploiters and replicated to clients. Exploiters have the ability to access "restricted" places within your universe if they can join a single place. They can view any content replicated to their client, regardless of whether or not it's visible or currently in use. Additionally, exploiters can decompile any replicated local scripts and ModuleScripts, even if they are never executed on the client.

### 5.1 Client-side teleportation within universes

Once inside a universe, clients can teleport to any place within that universe, potentially bypassing any intended access restrictions or progression gates. This can also lead to the unintended leak of unreleased content, for example from a development or staging experience. It is important to understand that:

- Disabling "Direct Access" only removes the Join button from subplaces on the website - it does not prevent client-initiated teleports
- Assume exploiters will discover the existence of all subplaces within your universe
- A client can teleport to any subplace if they can access a single place, such as the root place, regardless of your intended game flow

Many developers attempt to prevent access by kicking unauthorized users from a subplace. This may work for blocking gameplay, but it does **not** prevent content from replicating to the client. For places intended to be private:

- **Keep development and test places in separate, private universe**s - this is the only reliable way to ensure confidentiality
  Never ship confidential event assets, scripts, or UI elements to the production environment before they're intended to be active

For universes requiring a public place but restricted access, combine multiple layers:

- If feasible, use streaming to limit how much of the world will replicate to a new player.
- Add server-side group role or badge verification and verify player state or progression requirements.
- By default, disallow incoming players. This ensures no player will be allowed even if the verification process is inconclusive, such as in the case of an exception thrown from the engine.
- If practical, use the `Class.Players.BanAsync|Ban API` for players that fail validation. This prevents players from continuously attempting to join on the same account.

### 5.2 Replication

Replication describes how state transfers over the network between instances of the game engine. Roblox's replication model is generally simplified in a few key ways:

- Instances are server-authoritative, meaning that for an instance to replicate between all participants (the server and all connected clients) it must be created on the server.
- Instance properties are also server-authoritative, which means most properties must be changed on the server for the changes to be visible on all clients.
- Generally speaking, an instance either replicates to all connected clients or does not. There are some exceptions, such as streaming.

Replication containers are top-level instances (parented under the DataModel) that replicate to clients. If an instance ever becomes a descendant of a replication container over its lifetime, you should expect much of its state to replicate to all clients. You can read more about common replication containers in the [Data model guide](../../projects/data-model.md#replication). When in doubt, you can always check how an instance or property replicates in a test environment such as Play Solo. You can read more about testing modes in [Studio testing modes](../../studio/testing-modes.md).

#### Security implications of replication

Any content that replicates to a client can be extracted and data-mined by an exploiter. As a general rule, avoid publishing or shipping any confidential content to the live production environment unless you are immediately prepared for it to be seen by users. Even if there is logic that gates the release or access of the content in-experience until a later date (or some other condition), assume that exploiters will find a way to discover and leak your content as soon as it is published.

Avoid overly descriptive or predictable names for sensitive instances, including but not limited to: scripts, remotes, and models. Having a predictable DataModel hierarchy makes it easier to develop exploits.

#### Script decompilation

Any `Class.LocalScript`, `Class.Script` with `RunContext::Client`, or `Class.ModuleScript` can be decompiled by an exploiter once replicated to their client, even if such scripts are disabled, never required, or never run on the client. Server-only Scripts and ModuleScripts stored in `ServerStorage` or `ServerScriptService` cannot be decompiled as they never replicate to clients.

Writing a ModuleScript that includes server-only and client-only code in the same script is ill-advised since server-sided logic will be exposed in decompilation and can be more easily dissected for bugs that can be exploited.

```lua title="Original ModuleScript in ReplicatedStorage"
local module = {}

local Remote = script:WaitForChild("RemoteEvent")

-- Here's an example of a paradigm to avoid
-- Keep server code in Script instances or in ServerStorage/ServerScriptStorage!

if game:GetService("RunService"):IsServer() then
	function module:DoServerThing(password)
		if password == "SecretPassword" then
			print("sensitive server code")
		end
	end

	Remote.OnServerEvent:Connect(function(player, password)
		module:DoServerThing(password)
	end)
else
	function module:DoServerThing(password)
		Remote:FireServer(password)
	end
end

return module
```

```lua title="Decompiled result"
local table1 = {};
local RemoteEvent = script:WaitForChild("RemoteEvent");
if game:GetService("RunService"):IsServer() then
	function table1.DoServerThing(_, p2) -- Line: 9
		if p2 == "SecretPassword" then
			print("sensitive server code");
		end
	end
	RemoteEvent.OnServerEvent:Connect(function(player: Player, p3) -- Line: 15
		--[[
			Upvalues:
				[1] = table1
		--]]
		table1:DoServerThing(p3);
	end);
	return table1;
end
function table1.DoServerThing(_, p1) -- Line: 19
	--[[
		Upvalues:
			[1] = RemoteEvent
	--]]
	RemoteEvent:FireServer(p1);
end
return table1;
```

As shown above, decompilation reveals server-side logic including hardcoded passwords, business rules, and implementation details that exploiters can analyze for vulnerabilities.

#### Impact of confidentiality breaches

Confidentiality breaches can have significant consequences, such as:

- **Content leaks**: Unreleased items, maps, or features may be discovered and shared publicly before official announcements
- **Competitive disadvantage**: Game mechanics, algorithms, or upcoming features may be reverse-engineered by competitors
- **Exploit Development**: Exposed server logic makes it faster and easier for exploiters to identify vulnerabilities and develop targeted attacks

## 6. Vulnerabilities from third-party assets

Third-party assets from the Creator Store (Toolbox) are a common source of security risks, as they can contain malicious scripts called backdoors. These scripts give their creators unauthorized server-side access to your game, allowing them to manipulate game state, steal sensitive data, or disrupt the experience for your players.

Backdoors are particularly dangerous because they often appear in otherwise legitimate-looking models. A seemingly innocent building or vehicle might contain a script that activates when certain conditions are met, such as when a specific player joins or a particular command is executed. When a model contains scripts, this is indicated in the Toolbox user interface before and during insertion.

Roblox moderates Models for malicious scripts both proactively and in response to reports, but this process is not guaranteed to remove all such scripts.

### Protecting your game

The most effective defense against backdoors is sandboxing. When you insert a model, you should contain its scripts to prevent malicious code from reaching sensitive APIs or affecting systems outside the model itself.

1. Set `SandboxedInstance` to `Experimental` on Workspace.
2. In the Properties window, set the `Sandboxed` property of the model to `true`.
3. Configure the `Capabilities` property to grant only the specific permissions the asset needs to function.

<Alert severity = 'warning'>
Note that during the beta, some features may not function as expected when `Sandboxed`, erroring with a message saying "...lacking Capability Unassigned". These will be fixed as Capabilities rolls out of beta.
</Alert>

Be especially cautious about granting Network, DataStore, AssetRequire, CapabilityControl, or LoadString capabilities to third-party assets unless you understand exactly why the asset needs them. These capabilities provide access to powerful systems that backdoors commonly exploit.

Before using any asset, carefully inspect its scripts. Pay particular attention to obfuscated or unusually complex code. Malicious actors often use deceptive techniques to hide harmful content, such as using whitespace to position malicious code off-screen when viewed in the studio editor. Consider favoring highly-rated community assets that have been vetted by other developers, though remember that popularity doesn't guarantee safety. For comprehensive guidance on configuring script restrictions, see [Script Capabilities](../../scripting/capabilities.md).

<Alert severity ='success'>In the future, we plan to automatically sandbox all assets from the Creator Store with appropriate Capabilities.</Alert>

## 7.0 Server-side detection and consequencing

This section assumes you already validate inputs and context (Sections 3–5). Here we cover what to do after a request is technically valid but behavior looks abusive, plus how to respond without harming legitimate players.

### 7.1 Philosophy

- **The server decides**. Detection and consequencing live on the server. Try to never ban based on client-side detections, as exploiters can easily bypass them.
- **Prevent harm first**. Quietly neutralize the impact of an exploit. For example, if a player is speed-hacking, just rubber-band them back to their last valid position instead of kicking them immediately. Punish only when necessary to protect the game or other players.
- **Be proportional and reversible**. Assume false positives can happen. Prefer actions you can roll back, such as temporary suspensions or resource removal, over permanent bans.
- **Design > detection**. Your primary security comes from robust validation and rate limiting (covered in Sections 3–5). The detection methods below are meant to supplement those defenses, not replace them.

### 7.2 Heuristics

Heuristics are behavior checks that flag actions that are technically possible but highly improbable for a legitimate player. They are "rules of thumb" for catching suspicious activity that slips past basic validation. An effective heuristic compares a player's action against a theoretical maximum or a reasonable baseline.

For example, if a player suddenly claims to have gained 1 billion coins in your simulator game, your remote validation might confirm the request is structured correctly. But a heuristic check on the server would know that earning that much should take weeks, not seconds, and flag the transaction as suspicious.

Here are three classic examples of server-side heuristics. Each one validates player behavior against the game's rules and physical limitations, creating a strong defense against common exploits.

<table><thead>
  <tr>
    <th>**Server-side heuristic**</th>
    <th>**Description**</th>
    <th>**Example**</th>
  </tr></thead>
<tbody>
  <tr>
    <td>**Fastest Completion Time**</td>
    <td>Calculate the theoretical fastest possible time to complete a task, like an obstacle course. This involves finding the optimal path and assuming maximum player speed.</td>
    <td>In an obby, if the world record is 30 seconds, a completion time of 5 seconds is a strong signal of teleportation or speed exploits.</td>
  </tr>
  <tr>
    <td>**Rate of Gain**</td>
    <td>Track the maximum legitimate rate at which a player can earn a resource (currency, experience, items).</td>
    <td>If a player can legitimately earn 100 coins per minute, a sudden gain of 10,000 coins in one second should be flagged.</td>
  </tr>
  <tr>
    <td>**Action Cadence**</td>
    <td>The server analyzes the time intervals between a player's repeated actions. Human inputs have natural, slight variations in timing, whereas simple automation scripts (like auto-clickers) often perform actions with robotic consistency.</td>
    <td>In a fishing minigame, a player clicks to cast their line. The server logs the timestamp of each cast. If the player casts their line 100 times in a row with the exact same interval (e.g., precisely 2.500 seconds) between each action, it's a strong indicator of a macro or bot. A human's timing would naturally fluctuate</td>
  </tr>
</tbody></table>

Any one of these examples may not be enough on its own to convict a cheater. Each should be treated as a signal, not as definitive proof. A good practice is to implement a suspicion score. When a player fails a heuristic check, you increment their score. Severe actions like kicking or banning should only occur after multiple, varied detections have pushed a player's score past a high threshold.

For example, suppose a skilled player finishes your obby with a record-shattering time, triggering your "Fastest Completion Time" heuristic. Should they be banned? It's possible they're exploiting, but they might also have discovered a legitimate but unintended shortcut. Banning them based on this single signal would be risky and could punish one of your most dedicated players.

However, if that same player's run also flagged the "Action Cadence" heuristic for inhumanly consistent inputs, and an hour later they trigger the "Rate of Gain" heuristic in your lobby, the case becomes much stronger. The combination of these different signals paints a much more reliable picture of cheating. The strength of this system lies in correlating multiple data points to build a confident case before taking action.

### 7.3 Honeypots

One way to detect cheaters trying to probe your game's RemoteEvents is to use a decoy called a honeypot. A honeypot is a `Class.RemoteEvent` or `Class.RemoteFunction` that appears legitimate to an exploiter but is never used by any of your legitimate client scripts. Because no normal player should ever be able to fire this remote, any traffic it receives must be from an exploiter. When the server detects this remote being fired, it's a very high-confidence signal that the client is meddling. The best immediate action is to log the incident and kick the player from the session.

Another variation is to design RemoteEvents with specific directional purposes - some exclusively for client → server communication and others exclusively for server → client communication. While the event names don't reveal their intended direction, the server tracks which direction each remote should be used. If an exploiter attempts to fire a server → client remote from the client, this serves as a reliable detection method since legitimate gameplay would never trigger communication in the wrong direction.

### 7.4 Applying consequences

When detection systems flag suspicious behavior, consider your response strategy carefully. Different games require different approaches based on their community, competitive stakes, and tolerance for disruption.

**The consequence ladder** - Most games benefit from escalating responses rather than jumping straight to permanent bans:

- **Silent logging** - Build evidence without player impact
- **Quiet mitigation** - Block the exploit's effect (drop requests, clamp values, sync correct state)
- **Temporary restrictions** - Limit specific capabilities (trading, leaderboards, matchmaking)
- **Visible enforcement** - Kicks, temporary suspensions, or permanent bans

**Considerations for your strategy**

- **Delay visible consequences** to avoid teaching exploiters exactly what triggered detection
- **Match severity to response** - minor economic exploits may warrant different treatment than game-breaking physics cheats
- **Consider your community** - competitive games may need stricter enforcement than casual experiences
- **Plan for mistakes** - prefer reversible actions when detection confidence is lower

For persistent offenders, consider using the `Class.Players.BanAsync|Ban API` rather than relying solely on kicks. The Ban API prevents banned players from rejoining and provides better tracking across your universe. Version your detection rules and track consequence rates so you can identify problematic systems. Monitor player feedback to gauge whether your enforcement feels fair to the community. The right balance depends entirely on your game's needs and your players' expectations.
