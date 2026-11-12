---
title: Get started for experienced creators
description: The core concepts of the Roblox engine for creators coming from other platforms, with guides for engineers, artists, file-based workflows, and Unity and Unreal comparisons.
---

If your team already ships games on other engines or platforms, most of what you know carries over to Roblox. A few fundamentals work differently, and learning them first saves rework later. This section collects what you need in your first weeks on Roblox.

A few terms come up everywhere:

- **Game:** The overall project that players join. A game is a collection of places, and services like data stores, analytics, and in-game purchases are scoped to it.
- **Place:** A discrete scene or zone within a game, such as a lobby or a level. Each server runs one place.
- **Studio:** The editor you use to build places, write scripts, and upload assets. You edit one place at a time.
- **Cloud-first:** Places, assets, and scripts are saved to Roblox by default, rather than to files on your disk.

<img src="../assets/studio/general/Studio-Layout.png" alt="The Roblox Studio user interface with markup to show the various windows and panels." />

## Key differences from other engines

- **Cloud storage:** Studio saves your places, assets, and scripts to Roblox rather than to files on your disk, and your team edits them together in real time with [Team Create](../projects/collaboration.md). If you want Git and other file-based tools, see [Compare file-based workflows](../projects/file-based-workflows.md).
- **Multiplayer by default:** Every game runs on Roblox servers with a [client-server model](../projects/client-server.md), so where you place an object or script determines whether the server, the client, or both can see and run it.
- **Built-in physics:** Parts simulate physics automatically without extra components, and you connect them to each other with [constraints](../physics/mechanical-constraints.md).
- **Luau:** Scripts use [Luau](../luau/index.md), a fast, gradually typed language derived from Lua.
- **Materials instead of shaders:** Roblox doesn't support custom shaders, so you build materials with `Class.SurfaceAppearance` and `Class.MaterialVariant` and create effects with built-in materials and instances.
- **Automatic quality scaling:** Roblox adjusts rendering, lighting, and streaming to each device, which lets the same game run on phones, consoles, and PCs.

## Onboarding by role

<Grid container spacing={2} style={{marginBottom: 24}}>

<Grid item container XSmall={12} Medium={6} direction="row" style={{gap: 24, marginBottom: 12}}>
<Grid item container wrap="nowrap" direction="column" style={{gap: 8, flex: 1}}>
<img src="../assets/scripting/client-server/Client-Server-Model.png" alt="A diagram of the Roblox client-server model." />
<Typography variant='h4'>Engineering</Typography>
<Typography variant='body1'>The data model, scripting, replication, streaming, data stores, and performance.</Typography>
<a href="./developers.md"><Typography variant='h6' style={{marginBottom: 12}}>For developers</Typography></a>
</Grid>
</Grid>

<Grid item container XSmall={12} Medium={6} direction="row" style={{gap: 24, marginBottom: 12}}>
<Grid item container wrap="nowrap" direction="column" style={{gap: 8, flex: 1}}>
<img src="../assets/modeling/surface-appearance/SurfaceAppearance-Example-3.jpg" alt="A realistic mossy rock." />
<Typography variant='h4'>Art</Typography>
<Typography variant='body1'>PBR materials, mesh limits, lighting, characters, and rigs.</Typography>
<a href="./artists.md"><Typography variant='h6' style={{marginBottom: 12}}>For artists</Typography></a>
</Grid>
</Grid>

</Grid>

## Engine comparisons

<Grid container spacing={2} style={{marginBottom: 24}}>

<Grid item container XSmall={12} Medium={6} direction="row" style={{gap: 24, marginBottom: 12}}>
<Grid item container wrap="nowrap" direction="column" style={{gap: 8, flex: 1}}>
<img src="../assets/engine-comparisons/Unity-Editor-Layout.png" alt="The Unity user interface with markup to show the various windows and panels." />
<Typography variant='h4'>Unity</Typography>
<Typography variant='body1'>Map Unity concepts like GameObjects, components, and C# scripts to their Roblox equivalents.</Typography>
<a href="../unity.md"><Typography variant='h6' style={{marginBottom: 12}}>From Unity</Typography></a>
</Grid>
</Grid>

<Grid item container XSmall={12} Medium={6} direction="row" style={{gap: 24, marginBottom: 12}}>
<Grid item container wrap="nowrap" direction="column" style={{gap: 8, flex: 1}}>
<img src="../assets/engine-comparisons/Unreal-Editor-Layout.png" alt="The Unreal Engine user interface with markup to show the various windows and panels." />
<Typography variant='h4'>Unreal</Typography>
<Typography variant='body1'>Map Unreal concepts like actors, Blueprints, and C++ to their Roblox equivalents.</Typography>
<a href="../unreal.md"><Typography variant='h6' style={{marginBottom: 12}}>From Unreal</Typography></a>
</Grid>
</Grid>

</Grid>

## Team workflows

- [Compare file-based workflows](../projects/file-based-workflows.md): Use Git with Roblox, from Script Sync to fully managed Rojo, and set up dev, stable, and production environments.
- [Collaboration](../projects/collaboration.md): Edit places together in real time with Team Create.
- [Groups](../projects/groups.md): Own games and assets as a team, and manage roles and permissions.
- [Packages](../projects/assets/packages.md): Version and reuse content across places and games.

## Next steps

- [Install and set up Studio](../studio/setup.md).
- Speed up development with AI. Most professional developers will want to use their own AI tools and agent harness, and connect them to the [Studio MCP server](../studio/mcp.md) so they can build and test in Studio. [Assistant](../assistant/guide.md) is Studio's built-in alternative.
- Learn how players find and play your game in [Discovery](../discovery.md).
