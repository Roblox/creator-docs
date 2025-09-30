---
title: Script types and locations
description: How scripts run in Roblox, and how location impacts that behavior.
---

import ScriptLocations from '../includes/engine-comparisons/script-locations.md'

For many developers, the fundamental challenge of adapting to Roblox scripting is the importance of file location and the `Class.Script.RunContext` property. Depending on script type, location in the **Explorer**, and run context, scripts can behave very differently. Certain method calls might fail, objects in your experience might be inaccessible, or scripts might not run at all.

The reason for this complexity is that Roblox experiences are multiplayer by default. Scripts need the ability to only run on the server, only run on the client, or be shared across both. The evolution of the Roblox platform over time has further complicated the situation.

## Script types

Roblox has three types of scripts:

- `Class.Script` - Code that runs on either the server or the client, depending on its location and `Class.Script.RunContext` property.
- `Class.LocalScript` - Code that runs only on the client. Does not have a run context.
- `Class.ModuleScript` - Code that you can reuse in other scripts. Does not have a run context.

When you create a `Class.Script`, its default run context is `Legacy`, meaning that it a) is a server-side script and b) only runs if it is in a server container, such as `Class.Workspace` or `Class.ServerScriptService`.

- If you change the script's run context to `Server`, it can now also run in `Class.ReplicatedStorage`, but that's not recommended. The contents of that location are replicated to clients, so it's a poor location for server-side scripts.
- If you change the script's run context to `Client`, it can run in `ReplicatedStorage`. It can also run in `Class.StarterCharacterScripts` and `Class.StarterPlayerScripts`. Starter containers are copied to clients, though, so the original script **and** the copy run, which isn't desirable.

To change a script run context, select it in the [Explorer](../studio/explorer.md) and change the value in the [Properties](../studio/properties.md) window.

<img src="../assets/studio/properties/Script-RunContext.png" alt="RunContext property indicated for a Script." width="320 "/>

### Recommendations

- Using `Server` and `Client` values for `RunContext` removes ambiguity from how scripts run and can help keep your project organized. The best use cases for non-default `RunContext` values are:

  - Client scripts that you want to run from `Class.ReplicatedStorage` or `Class.ReplicatedFirst`.
  - Server or client scripts that you include within [models](../parts/models.md) and [packages](../projects/assets/packages.md). Explicitly setting the run context makes models and packages more likely to work properly from a variety of locations.

- To share code between server and client scripts, use `Class.ModuleScript|ModuleScripts` in `ReplicatedStorage`.
- Use `Class.LocalScript|LocalScripts` in `StarterCharacterScripts`, `StarterPlayerScripts`, `StarterGui`, and `StarterPack`.

## Script locations

<ScriptLocations components={props.components} />

This image shows which **Explorer** window locations can contain client scripts. Remember, `ReplicatedFirst` and `ReplicatedStorage` can contain `Class.Script|Scripts` with a `Class.BaseScript.RunContext|RunContext` of `Enum.RunContext|Client`, whereas the `Starter[]` containers should use `Class.LocalScript|LocalScripts`.

<img alt="Diagram showing which script locations run on clients." src="../assets/scripting/client-server/Client-Script-Containers.png" width="520" />

## Example project structure

The [Plant](../resources/plant-reference-project.md) reference project shows how you might organize your code in a large, complex experience.

Of particular note is how it stores the vast majority of its code as reusable `Class.ModuleScript|ModuleScripts` in `ReplicatedStorage` and `ServerStorage`.
