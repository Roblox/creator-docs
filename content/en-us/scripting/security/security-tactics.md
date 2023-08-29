---
title: Security Tactics and Cheat Mitigation
description: Explore security tactics and cheat mitigation tactics for Roblox experiences.
---

Roblox uses a [distributed physics system](../../physics/network-ownership.md) in which clients have custody over the physical simulation of objects in their control, typically the player's character and unanchored objects near that character. Additionally, through the use of third party software, exploiters can run arbitrary Lua code on the client to manipulate their client's data model and decompile and view code running on it.

Collectively, this means that a skilled exploiter can potentially execute code to cheat in your game, including:

- Teleporting their own character around the place.
- Firing unsecured `Class.RemoteEvent|RemoteEvents` or invoking `Class.RemoteFunction|RemoteFunctions`, such as to award themselves items without earning them.
- Adjusting their character's `Class.Humanoid.WalkSpeed|WalkSpeed` so that it moves really fast.

While you can implement limited [design defenses](#defensive-design-tactics) to catch common attacks, it's highly recommended that you implement more reliable [server-side mitigation tactics](#server-side-mitigation), as the server is the ultimate authority for any running experience.

## Defensive Design Tactics

Basic design decisions can serve as "first step" security measures to discourage exploits. For example, in a shooter game where players get points for killing other players, an exploiter may create a bunch of bots that teleport to the same place so they can be quickly killed for points. Given this potential exploit, consider two approaches and their predictable outcome:

<table>
<thead>
  <tr>
    <th>Approach</th>
    <th>Predictable Outcome</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Chase down bots by writing code that attempts  to detect them.</td>
    <td>
	<Alert severity="error" style={{marginBottom:"0px;"}}>
    Exploiters seeking quick points will find a way around your complex detection code and use  their bots in a different way.
	</Alert>
	</td>
  </tr>
  <tr>
    <td>Reduce or outright remove point gains for kills on newly spawned players.</td>
    <td>
	<Alert severity="success" style={{marginBottom:"0px;"}}>
    Extra time and friction is now required for exploiters because they get no points for instantly killing their bots. Additionally, "spawn&nbsp;campers" are discouraged because they no longer get points for killing newly spawned players.
	</Alert>
	</td>
  </tr>
</tbody>
</table>

While defensive design obviously isn't a perfect or comprehensive solution, it can contribute to a broader security approach, along with [server-side mitigation](#server-side-mitigation).

## Server-Side Mitigation

As much as possible, the **server** should cast the final verdict on what is "true" and what the current state of the world is. Clients can, of course, request the server to make changes or perform an action, but the server should **validate and approve** each of these changes/actions before the results are replicated to other players.

With the exception of certain physics operations, changes to the data model on the client do not replicate to the server, so the main attack path is often via the network events you've declared with `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions`. Remember that an exploiter running their own code on your client can invoke these with whatever data they want.

### Remote Runtime Type Validation

One attack path is for an exploiter to invoke `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions` with arguments of the incorrect type. In some scenarios, this may cause code on the server listening to these remotes to error in a way that's advantageous to the exploiter.

When using remote events/functions, you can prevent this type of attack by validating the **types** of passed arguments on the server. The module **"t"**, available [here](https://github.com/osyrisrblx/t), is useful for type checking in this manner. For example, assuming the module's code exists as a `Class.ModuleScript` named **t** inside `Class.ReplicatedStorage`:

```lua title="LocalScript in StarterPlayerScripts" highlight="6"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteFunction = ReplicatedStorage:WaitForChild("RemoteFunctionTest")

-- Pass part color and position when invoking the function
local newPart = remoteFunction:InvokeServer(Color3.fromRGB(200, 0, 50), Vector3.new(0, 25, 0))

if newPart then
	print("The server created the requested part:", newPart)
end
```

```lua title="Script in ServerScriptService" highlight="4, 8-10, 12, 19"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local remoteFunction = ReplicatedStorage:WaitForChild("RemoteFunctionTest")
local t = require(ReplicatedStorage:WaitForChild("t"))

-- Create new part with the passed properties
local function createPart(player, partColor, partPosition)
	-- Type check the passed arguments
	local typeValidator = t.tuple(t.instanceIsA("Player"), t.Color3, t.Vector3)
	assert(typeValidator(player, partColor, partPosition))

	print(player.Name .. " requested a new part")
	local newPart = Instance.new("Part")
	newPart.Color = partColor
	newPart.Position = partPosition
	newPart.Parent = workspace
	return newPart
end

-- Bind "createPart()" to the remote function's callback
remoteFunction.OnServerInvoke = createPart
```

### Data Validation

Another attack that exploiters might launch is to send [technically valid types](#remote-runtime-type-validation) but make them extremely large, long, or otherwise malformed. For example, if the server has to perform an expensive operation on a string that scales with length, an exploiter could send an incredibly large or malformed string to bog down the server.

Similarly, both `inf` and `NaN` will `Global.LuaGlobals.type()` as `number`, but both can cause major issues if an exploiter sends them and they're not handled correctly through functions such as the following:

```lua
local function isNaN(n: number): boolean
	-- NaN is never equal to itself
	return n ~= n
end

local function isInf(n: number): boolean
	-- Number could be -inf or inf
	return math.abs(n) == math.huge
end
```

### Value Validation

In addition to validating [types](#remote-runtime-type-validation) and [data](#data-validation), you should validate the **values** passed through `Class.RemoteEvent|RemoteEvents` and `Class.RemoteFunction|RemoteFunctions`, ensuring they are valid and logical in the context being requested. Two common examples are an [in-experience shop](#in-experience-shop) and a [weapon targeting](#weapon-targeting) system.

#### In-Experience Shop

Consider an in-experience shop system with a user interface, for instance a product selection menu with a "Buy" button. When the button is pressed, you can invoke a `Class.RemoteFunction` between the client and the server to request the purchase. However, it's important that the **server**, the most reliable manager of the experience, confirms that the user has enough money to buy the item.

<figure>
  <img src="../../assets/scripting/security/Remote-Purchase-Flow.png" width="830" alt="Example purchase flow from client to server through a RemoteEvent" />
  <figcaption>Example purchase flow from client to server through a `Class.RemoteFunction`</figcaption>
</figure>

#### Weapon Targeting

Combat scenarios warrant special attention on validating values, particularly through aiming and hit validation.

Imagine a game where a player can fire a laser beam at another player. Rather than the client telling the server **who** to damage, it should instead tell the server the origin position of the shot and the part/position it thinks it has hit. The server can then validate the following:

- The position the client reports **shooting from** is near the player's character on the server. Note that the server and client will differ slightly due to latency, so extra tolerance will need to be applied.
- The position the client reports **hitting** is reasonably close to the position of the **part** the client reports hitting, on the server.
- There are no static obstructions between the position the client reports shooting from and the position the client reports shooting to. This check ensures a client isn't attempting to shoot through walls. Note that this should only check static geometry to avoid valid shots being rejected due to latency.

**Additionally**, you may want to implement further server-side validations as follows:

- Track when the player last fired their weapon and validate to ensure they're not shooting too fast.
- Track each player's ammo amount on the server and confirm that a firing player has enough ammo to execute the weapon attack.
- If you've implemented [teams](../../players/teams.md) or a "players against bots" combat system, confirm that the hit character is an enemy, not a teammate.
- Confirm that the hit player is alive.
- Store weapon and player state on the server and confirm that a firing player is not blocked by a current action such as reloading or a state like sprinting.

### Remote Throttling

If a client is able to make your server complete a computationally expensive operation, or access a rate-limited service like `Class.DataStoreService` via a `Class.RemoteEvent`, it's critical that you implement **rate limiting** to ensure the operation is not called too frequently. Rate limiting can be implemented by tracking when the client last invoked a remote event and rejecting the next request if it's called too soon.

### Movement Validation

For competitive experiences, you may wish to validate player character movements on the server to ensure they aren't teleporting around the map or moving faster than acceptable.

1. In increments of 1 second, check the character's new location against a previously cached location.

   <img src="../../assets/scripting/security/Movement-Validation-1.jpg" width="800" alt="Image showing moving character's position on a straight path in increments of 1 second" />

1. Determine a maximum "tolerable" change in distance based on the character's `Class.Humanoid.WalkSpeed|WalkSpeed` (studs&nbsp;per&nbsp;second), multiplied by ~1.4 to allow for some leniency against server latency. For example, at a default `Class.Humanoid.WalkSpeed|WalkSpeed` of 16, a tolerable delta is ~22.

   <img src="../../assets/scripting/security/Movement-Validation-2.jpg" width="800" alt="Image showing tolerable change in distance based on character's walk speed" />

1. Compare the actual distance delta against the tolerable delta and proceed as follows:

   - For a tolerable delta, cache the character's new location in preparation for the next incremented check.
   - For an unexpected or intolerable delta (potential speed/teleport exploit):
     1. Increment a separate "number of offenses" value for the player, versus penalizing them for a "false&nbsp;positive" resulting from extreme server latency or other non-exploit factors.
     1. If a large number of offenses occur over a period of 30-60 seconds, `Class.Player:Kick()|Kick()` the player from the experience entirely; otherwise, reset the "number of offenses" count. Note that when kicking a player for cheating, it's best practice to record the event so you can keep track of how many players are impacted.
