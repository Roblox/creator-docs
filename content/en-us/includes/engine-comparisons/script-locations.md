---
title: include
---

Location | Description
:--- | :---
`Class.Workspace` | Represents the game's 3D world. Can run server scripts that attach directly to objects and control their behavior.
`Class.ReplicatedFirst` | Contains objects that replicate to the client before anything else. This location is ideal for the absolute minimum set of objects and client scripts necessary to display a loading screen.
`Class.ReplicatedStorage` | Contains objects that are replicated to both the client and the server. This location is ideal for `Class.Script\|Scripts` with a `Class.BaseScript.RunContext\|RunContext` of `Enum.RunContext\|Client`, client `Class.ModuleScript\|ModuleScripts`, and `Class.ModuleScript\|ModuleScripts` that you want to use on both the server and the client. `Class.LocalScript\|LocalScripts` do not run from this location.
`Class.ServerScriptService` | Contains server scripts. This location is ideal for scripts that need to access server-side functionality or objects, such as game logic and cloud storage.
`Class.ServerStorage` | Contains server-side objects. This location is ideal for large objects that don't need to be immediately replicated to clients when they join a game. Scripts do not run from this location, but you can store server-side `Class.ModuleScript\|ModuleScripts` here.
`Class.StarterPlayer` ⟩ `Class.StarterCharacterScripts` | Contains `Class.LocalScript\|LocalScripts` that run when the character spawns.
`Class.StarterPlayer` ⟩ `Class.StarterPlayerScripts` | Contains `Class.LocalScript\|LocalScripts` that run when the player joins the game.
`Class.StarterGui` | Contains GUI elements that the client displays when it loads the game. `Class.LocalScript\|LocalScripts` can run from this location.
`Class.StarterPack` | Generally only contains `Class.Tool\|Tools`, but can also include `Class.LocalScript\|LocalScripts` for setting up player backpacks.
