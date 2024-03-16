---
title: include
---

Roblox experiences are multiplayer by default, so Roblox Studio includes many different storage locations with specific behaviors. For example, a script might run when you put it in `Class.ReplicatedStorage`, but not when you put it into `Class.StarterPlayerScripts`. For more information, see [Client-Server Runtime](projects/client-server.md) and [Object Organization](projects/data-model#object-organization.md).

Location | Description
:--- | :---
Workspace | Represents the game world and contains all parts, models, and other objects in the game. You can put scripts into the Workspace, but only server scripts and module scripts run when parented to it. This location works well for scripts that control object behavior, since they can attach directly to the object.
ReplicatedStorage | Contains objects that are replicated to both the client and the server, including scripts. This location is ideal for scripts that share data or functionality between the two, such as game settings, player data, and events.
ServerScriptService | Contains server scripts, including module scripts. This location is ideal for scripts that need to access server-side functionality or objects, such as game logic, data storage, and AI behaviors.
ServerStorage | Contains server-side objects and settings. This location is ideal for large objects that don't need to be immediately replicated to clients when they join an experience.
StarterPlayer | Contains player-related objects and settings. This location is primarily used for setting up player properties and initializations. Client scripts can run from this location, including module scripts. This location is ideal for scripts that set up player-specific features, such as player models, starting inventory, and camera settings. Of particular note, `StarterCharacterScripts` and `StarterPlayerScripts` are different. For more information, see [Client](projects/data-model.md#client).
StarterGui | Contains GUI elements that the client displays when it loads the game. Client scripts can run from this location, including module scripts. This location is ideal for scripts that modify the game's user interface, such as adding buttons, menus, and pop-ups.
