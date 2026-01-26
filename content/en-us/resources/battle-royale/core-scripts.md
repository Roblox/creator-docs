---
title: Core scripts
comments:
description: Explains the two scripts responsible for the Battle Royale gameplay loop.
prev: /resources/battle-royale/run-the-game
next: /resources/battle-royale/pickup-system
---

The core game loop in Roblox Battle Royale is generally handled by two scripts, specifically `ServerScriptService/Server` on the server and `StarterPlayer/StarterPlayerScripts/Client` on the client.

## Initial setup

The `ReplicatedFirst/InitialSetup` script configures a few engine-level systems — built-in UI, chat, etc. — and ensures that the client loads the assets referenced in `ReplicatedFirst/Configurations/AssetPreloads` before proceeding.

## Game stages

The initialization and updating of specific systems is done differently depending on the current stage of the experience. Most of these cases are handled by `ServerScriptService/Core/GameStageHandler` on the server and `ReplicatedStorage/Core/StageManager` on the client. When a stage is requested, a module of the same name is required and various setup functions called on it. If there is already a module handling the current stage, shutdown functions are called on it prior to the new stage handler being initialized.

## Places/server roles

Within `ReplicatedFirst/Configurations/MainConfiguration`, different gameplay modes are organized into lists of stages to be executed.

```lua
local _roleStages = {
	Lobby = {"Lobby"},
	Queue = {"Queue"},
	Gameplay = {"Waiting", "Gameplay", "EndGame"},
}
```

There are 3 different roles that a place can have:

- **Lobby** — Initial place where options like game mode are selected.
- **Queue** — Where a cohort of players gather for a particular game mode, building and fighting while waiting for the configured number of minimum players. Once the minimum numbers of players have arrived, a countdown will start, currently configured for 3:00 minutes, at the end of which gameplay will be initiated.
- **Gameplay** — The place where skydiving takes place and the game is played until completion.
