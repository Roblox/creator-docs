---
title: include
---

Location | Description
:--- | :---
Workspace | Represents the game world. Only runs server scripts. This location works well for scripts that attach directly to objects and control their behavior.
ReplicatedFirst | Contains objects that replicate to the client before anything else. This location is ideal for the absolute minimum set of objects and scripts necessary to display a loading screen.
ReplicatedStorage | Contains objects that are replicated to both the client and the server. This location is ideal for `Class.ModuleScript\|ModuleScripts` that you want to use on both the server and the client. `Class.LocalScript\|LocalScripts` do not run from this location, but `Class.Script\|Scripts` with a run context of `Client` do.
ServerScriptService | Contains server-side scripts. This location is ideal for scripts that need to access server-side functionality or objects, such as game logic and cloud storage.
ServerStorage | Contains server-side objects. This location is ideal for large objects that don't need to be immediately replicated to clients when they join an experience. Scripts do not run from this location, but you can store server-side `Class.ModuleScript\|ModuleScripts` here.
StarterPlayer.StarterCharacterScripts | Contains `Class.LocalScript\|LocalScripts` that run when the character first spawns. These scripts do **not** run again when the player respawns.
StarterPlayer.StarterPlayerScripts | Contains general-purpose `Class.LocalScript\|LocalScripts` that run when the player joins the experience.
StarterGui | Contains GUI elements that the client displays when it loads the game. `Class.LocalScript\|LocalScripts` can run from this location. This location is ideal for scripts that modify the game's user interface, such as adding buttons, menus, and pop-ups.
StarterPack | Generally only contains `Class.Tool\|Tools`, but can also include `Class.LocalScript\|LocalScripts` for setting up player backpacks.
