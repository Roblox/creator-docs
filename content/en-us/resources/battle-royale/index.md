---
title: Battle Royale
comments:
description: Battle Royale is an example game-kit with instructions on specific gameplay implementations.
next: /resources/battle-royale/installation-and-setup
---

<Alert severity="warning">
Processes and features may have changed since the writing of this documentation. Refer to the appropriate feature documentation for up-to-date information on any features and workflows.

The content of this project and documentation can be used under Roblox's [Limited Use License](../../resources/limited-use-license.md).
</Alert>

**Roblox Battle Royale** is a game kit built by internal Roblox developers consisting of multiplayer battles on a large island with destructible buildings, a variety of vehicles and weapons, and interesting areas to explore. The default game loop is simple: join a match, skydive onto the island, stay out of the storm, and survive until you are the last person standing. Players can also build their own structures by laying down building tiles. This project is [available to join](https://www.roblox.com/games/5158731546/Roblox-Battle-Royale) as a public experience.

<img
  alt="Drop onto a region in a classic battle royale experience."
  src="../../assets/resources/battle-royale/introduction/Battle-Royale-Slide-B.jpeg"
  width="80%" />

## Features

At a high level, Roblox Battle Royale contains the following:

- Code for 3rd-person cameras.
- A robust and customizable ranged [weapon system](../../resources/weapons-kit.md), including 9 different weapons preconfigured.
- A building system.
- A destruction system.

All of these systems are supported on a wide range of hardware, screen sizes, and game controllers, from mobile phones to Xbox to high-end desktop PCs. The code is designed to be performant and easy to read so anyone can learn how to build a game like this.

## Play modes

There are 4 play modes included in this project:

- **Last One Standing** — Traditional battle royale; players who are eliminated are removed from the match and the last person to survive wins.
- **Solo Deathmatch** — Players will respawn after dying; the player with the highest kill count wins.
- **Team Deathmatch** — Two teams of players attempt to eliminate the other team; the team with players still alive at the end wins.
- **Free Play** — Players can enter the game and play around with the building system, weapons, and vehicles.
