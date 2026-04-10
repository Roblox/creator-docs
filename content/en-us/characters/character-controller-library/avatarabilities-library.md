---
title: AvatarAbilities library
description: The AvatarAbilities library allows developers to utilize new features from the Character Controller Library in their game.
---

The **AvatarAbilities** library is a table of functions and values used to set up and configure the [Character Controller Library](./index.md) (CCL). The library is accessed via `require("@rbx/AvatarAbilities")`.

## API Reference

### Functions

#### initializeServer

<figcaption>
initializeServer()
</figcaption>

Initializes the server-side system and allows proper set up of the CCL for characters. This function only works on the server, and trying to run it on the client will do nothing. This function automatically runs on the server using a script in `Class.ServerScriptService` if the CCL is enabled in Studio's [Avatar Settings](../../studio/avatar-settings.md) window.

```lua title="AvatarAbilitiesServerScript" highlight="6"
require("@rbx/AvatarAbilities").initializeServer()
```

#### initializeCharacter

<figcaption>
initializeCharacter(character: `Class.Model`)
</figcaption>

Sets up the CCL for the character that the function is ran on. This function automatically runs on both the server and the client using scripts in the AbilityManagerActor if the CCL is enabled in Studio's [Avatar Settings](../../studio/avatar-settings.md) window.

```lua title="ServerInitialize / ClientInitialize" highlight="6"
local AvatarAbilities = require("@rbx/AvatarAbilities")

local actor: Actor = script.Parent :: Actor
assert(actor:IsA("Actor"))
local character: Model = actor.Parent :: Model
assert(character:IsA("Model"))

local abilityManager = AvatarAbilities.initializeCharacter(character)
```

#### initializeClient

<figcaption>
initializeClient()
</figcaption>

Initializes the client-side system and automatically initializes . Note this is currently unused, clients call initializeCharacter directly from a StarterCharacterScript, but in the future, this will likely be used. 

### Properties

#### mode

Exposed for external queries. A string value that identifies what the ServerAuthority mode is. Can be equal to  `"None"`, `"Automatic"`, or `"Server"`.

#### isServerAuth

Exposed for external queries. A bool value that is equal to `mode == "Server"`

#### isAutoAuth

Exposed for external queries. A bool value that is equal to `mode == "Automatic"`

#### sAuthBetaEnabled

Exposed for external queries. A bool value that is equal to `mode ~= "None"`