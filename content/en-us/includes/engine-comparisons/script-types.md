---
title: include
---

Roblox experiences support three different types of Luau scripts:

- **Client scripts**

  These scripts run on the client, and the server has no visibility into their behavior. For legacy reasons, these scripts can take the form of `Class.LocalScript|LocalScripts` or `Class.Script|Scripts` with a `Class.BaseScript.RunContext|RunContext` value of `Enum.RunContext|Client`. Client scripts typically live in `Class.ReplicatedStorage`, `Class.StarterPlayerScripts`, or `Class.StarterCharacterScripts`.

- **Server scripts**

  These scripts run on the server, and the client has no visibility into their behavior. Server scripts have a `Class.BaseScript.RunContext|RunContext` value of `Enum.RunContext|Server` and typically live in `Class.ServerScriptService`, the contents of which are not replicated to the client.

- **Module scripts**

  These scripts are reusable pieces of code that return exactly one value, typically a function or table (or a table of functions). Rather than duplicating code in client and server scripts, use module scripts to share code and data between the two. Module scripts often live in `Class.ReplicatedStorage`, but can live elsewhere if you want to share code between scripts on the same side of the client-server boundary.
