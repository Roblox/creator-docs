---
title: Script types and locations
description: How scripts run in Roblox, and how location impacts that behavior.
---

import ScriptLocations from '../includes/engine-comparisons/script-locations.md'

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/jLNgutvbALY?si=CU8CiDeiQOMIDfDr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe><br />

For many developers, the fundamental challenge of adapting to Roblox scripting is the importance of file location and the `Class.Script.RunContext` property. Depending on script type, location in the **Explorer**, and run context, scripts can behave very differently. Certain method calls might fail, objects in your game might be inaccessible, or scripts might not run at all.

The reason for this complexity is that Roblox games are multiplayer by default. Scripts need the ability to only run on the server, only run on the client, or be shared across both. The evolution of the Roblox platform over time has further complicated the situation.

## Script types

Roblox has three types of scripts:

- `Class.Script` - Code that runs on either the server or the client, depending on its location and `Class.Script.RunContext` property.
- `Class.LocalScript` - Code that runs only on the client. Does not have a run context.
- `Class.ModuleScript` - Code that you can reuse in other scripts. Does not have a run context.

When you create a `Class.Script`, its default run context is `Legacy`, meaning that it a) is a server-side script and b) only runs if it is in a server container, such as `Class.ServerScriptService` or `Class.Workspace`.

- If you change the script's run context to `Server`, it can now also run in `Class.ReplicatedStorage`, but we don't recommend it. The contents of that location are replicated to clients, so it's a poor location for server-side scripts.
- If you change the script's run context to `Client`, it can run in `Class.ReplicatedStorage`. It can also run in `Class.StarterCharacterScripts` and `Class.StarterPlayerScripts`. Starter containers are copied to clients, though, so the original script **and** the copy run, which isn't desirable.

To change a script run context, select it in the [Explorer](../studio/explorer.md) and change the value in the [Properties](../studio/properties.md) window.

<img src="../assets/studio/properties/Script-RunContext.png" alt="RunContext property indicated for a Script." width="320 "/>

## Recommendations

- Put a single `Class.Script` with a `RunContext` of `Client` into `Class.ReplicatedStorage`.
- Put a single `Class.Script` with a `RunContext` of `Server` into `Class.ServerScriptService`.
- Use `Class.ModuleScript|ModuleScripts` for as much client and server code as possible. Require these modules from your client script and your server script.

  This approach gives your code a single entry point on the client and server sides, which simplifies organization and makes it easy to isolate or disable problematic modules. Add a `start()` function to each `Class.ModuleScript|ModuleScript` so that all modules can load before you begin executing their code:

  ```lua title="Sample server script"
  --!strict
  local ServerScriptService = game:GetService("ServerScriptService")
  local SampleModule = require(ServerScriptService.SampleModule)
  local AnotherSampleModule = require(ServerScriptService.AnotherSampleModule)
  SampleModule.start()
  AnotherSampleModule.start()
  ```

  ```lua title="Sample module"
  --!strict
  local CollectionService = game:GetService("CollectionService")

  local NPC_TAG = "npc"

  local SampleModule = {}

  local function setUpNpc(npc: Instance)
      -- initialize each NPC
  end

  local function cleanUpNpc(npc: Instance)
      -- run when event fires
  end

  function SampleModule.start() -- add the function to the table
      -- example loop for setup based on tags
      for _, npc in CollectionService:GetTagged(NPC_TAG) do
          setUpNpc(npc)
      end

      -- run functions when events fire
      CollectionService:GetInstanceAddedSignal(NPC_TAG):Connect(setUpNpc)
      CollectionService:GetInstanceRemovedSignal(NPC_TAG):Connect(cleanUpNpc)
  end

  return SampleModule
  ```

- To share code, use `Class.ModuleScript|ModuleScripts` in `ReplicatedStorage` and require them in both your client script and your server script.
- If necessary for your game, repeat the same pattern in `Class.ReplicatedFirst` with a single client script and a minimal number of `Class.ModuleScript|ModuleScripts` to implement a loading screen. To learn more about `ReplicatedFirst`, see [Replication order](attributes.md#replication-order).
- Use `Class.LocalScript|LocalScripts` sparingly. If you must use them, put them in `StarterCharacterScripts`, `StarterPlayerScripts`, `StarterGui`, or `StarterPack`.

  Scripts in these containers clone to player containers rather than running from one location, which can complicate debugging. Using `ReplicatedStorage` for client code lets you click lines in the **Output** window and go to `ReplicatedStorage.YourScript` (the stable location of the script) rather than `Players.YourName.PlayerScripts.YourLocalScript` (the ephemeral location that the script was copied to at runtime).

- Avoid attaching scripts directly to instances in `Class.Workspace`. Instead, [tag instances](../studio/properties.md#instance-tags) and use `Class.CollectionService` to work with them from a single `Class.ModuleScript|ModuleScript`.

  The key exception is if you distribute models or packages on the Creator Store. In that case, you might need to include scripts within the instance hierarchy; specify a `RunContext` for each script to remove ambiguity from how it runs. Explicitly setting this property makes models and packages more likely to work properly from a variety of locations.

### Example project structure

The [Plant](../resources/plant-reference-project.md) reference project shows how you might organize your code in a large, complex game. It stores the vast majority of its code as reusable `Class.ModuleScript|ModuleScripts`.

## Script locations

<ScriptLocations components={props.components} />

This image shows which **Explorer** window locations can contain client scripts. Remember, `ReplicatedFirst` and `ReplicatedStorage` can contain `Class.Script|Scripts` with a `Class.BaseScript.RunContext|RunContext` of `Enum.RunContext|Client`, whereas the `Starter[]` containers should use `Class.LocalScript|LocalScripts`.

<img alt="Diagram showing which script locations run on clients." src="../assets/scripting/client-server/Client-Script-Containers.png" width="520" />
