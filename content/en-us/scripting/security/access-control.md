---
title: Access control and confidentiality
description: Learn what information and assets are visible to the client and secure them against exploiters.
---

<Alert severity = 'warning'>
The following content covers various concepts and tactics to improve security and mitigate cheating in your Roblox experiences. It's highly recommended that all developers read through these to ensure that your experiences are secure and fair for all users. Check the sidebar for additional security topics.
</Alert>

Understanding what information and assets are visible to clients is critical for maintaining both the security and confidentiality of your experience. Developers often underestimate how much is visible to exploiters and replicated to clients. Exploiters have the ability to access "restricted" places within your universe if they can join a single place. They can view any content replicated to their client, regardless of whether or not it's visible or currently in use. Additionally, exploiters can decompile any replicated local scripts and ModuleScripts, even if they are never executed on the client.

## Client-side teleportation within universes

Once inside a universe, clients can teleport to any place within that universe, potentially bypassing any intended access restrictions or progression gates. This can also lead to the unintended leak of unreleased content, for example from a development or staging experience. It is important to understand that:

- Disabling "Direct Access" only removes the Join button from subplaces on the website - it does not prevent client-initiated teleports
- Assume exploiters will discover the existence of all subplaces within your universe
- A client can teleport to any subplace if they can access a single place, such as the root place, regardless of your intended design flow

Many developers attempt to prevent access by kicking unauthorized users from a subplace. This may work for blocking gameplay, but it does **not** prevent content from replicating to the client. For places intended to be private:

- **Keep development and test places in separate, private universe**s - this is the only reliable way to ensure confidentiality
  Never ship confidential event assets, scripts, or UI elements to the production environment before they're intended to be active

For universes requiring a public place but restricted access, combine multiple layers:

- If feasible, use streaming to limit how much of the world will replicate to a new player.
- Add server-side group role or badge verification and verify player state or progression requirements.
- By default, disallow incoming players. This ensures no player will be allowed even if the verification process is inconclusive, such as in the case of an exception thrown from the engine.
- If practical, use the `Class.Players.BanAsync|Ban API` for players that fail validation. This prevents players from continuously attempting to join on the same account.

## Replication

Replication describes how state transfers over the network between instances of the engine. Roblox's replication model is generally simplified in a few key ways:

- Instances are server-authoritative, meaning that for an instance to replicate between all participants (the server and all connected clients) it must be created on the server.
- Instance properties are also server-authoritative, which means most properties must be changed on the server for the changes to be visible on all clients.
- Generally speaking, an instance either replicates to all connected clients or does not. There are some exceptions, such as streaming.

Replication containers are top-level instances (parented under the DataModel) that replicate to clients. If an instance ever becomes a descendant of a replication container over its lifetime, you should expect much of its state to replicate to all clients. You can read more about common replication containers in the [Data model guide](../../projects/data-model.md#replication). When in doubt, you can always check how an instance or property replicates in a test environment such as Play Solo. You can read more about testing modes in [Studio testing modes](../../studio/testing-modes.md).

### Security implications of replication

Any content that replicates to a client can be extracted and data-mined by an exploiter. As a general rule, avoid publishing or shipping any confidential content to the live production environment unless you are immediately prepared for it to be seen by users. Even if there is logic that gates the release or access of the content in-experience until a later date (or some other condition), assume that exploiters will find a way to discover and leak your content as soon as it is published.

Avoid overly descriptive or predictable names for sensitive instances, including but not limited to: scripts, remotes, and models. Having a predictable DataModel hierarchy makes it easier to develop exploits.

### Script decompilation

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

### Impact of confidentiality breaches

Confidentiality breaches can have significant consequences, such as:

- **Content leaks**: Unreleased items, maps, or features may be discovered and shared publicly before official announcements
- **Competitive disadvantage**: Mechanics, algorithms, or upcoming features may be reverse-engineered by competitors
- **Exploit Development**: Exposed server logic makes it faster and easier for exploiters to identify vulnerabilities and develop targeted attacks
