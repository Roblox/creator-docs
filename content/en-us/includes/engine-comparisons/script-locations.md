---
title: include
---

Location | Description
:--- | :---
`Class.Workspace` | Represents the experience's 3D world. This location works well for server scripts that attach directly to objects and control their behavior.
`Class.ReplicatedFirst` | Contains objects that replicate to the client before anything else. This location is ideal for the absolute minimum set of objects and client scripts necessary to display a loading screen.
`Class.ReplicatedStorage` | Contains objects that are replicated to both the client and the server. This location is ideal for `Class.ModuleScript\|ModuleScripts` that you want to use on both the server and the client. `Class.LocalScript\|LocalScripts` do not run from this location, but `Class.Script\|Scripts` with a `Class.BaseScript.RunContext\|RunContext` of `Enum.RunContext\|Client` do.
`Class.ServerScriptService` | Contains server scripts. This location is ideal for scripts that need to access server-side functionality or objects, such as game logic and cloud storage.
`Class.ServerStorage` | Contains server-side objects. This location is ideal for large objects that don't need to be immediately replicated to clients when they join an experience. Scripts do not run from this location, but you can store server-side `Class.ModuleScript\|ModuleScripts` here.
`Class.StarterPlayer` ⟩ `Class.StarterCharacterScripts` | Contains `Class.LocalScript\|LocalScripts` that run when the character spawns.
`Class.StarterPlayer` ⟩ `Class.StarterPlayerScripts` | Contains general-purpose `Class.LocalScript\|LocalScripts` that run when the player joins the experience.
`Class.StarterGui` | Contains GUI elements that the client displays when it loads the experience. `Class.LocalScript\|LocalScripts` can run from this location. This location is ideal for scripts that modify the experience's user interface, such as adding buttons, menus, and pop-ups.
`Class.StarterPack` | Generally only contains `Class.Tool\|Tools`, but can also include `Class.LocalScript\|LocalScripts` for setting up player backpacks.
