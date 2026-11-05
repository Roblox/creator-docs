---
title: Server Authority core
description: Explains how Boneheads uses Server Authority, validated client intent, and server-owned systems to keep shared physics consistent for every player.
next: /resources/boneheads/character-controller
prev: /resources/boneheads/friend-mechanics
---

A round of [**Boneheads**][BoneheadsGameURL] looks like chaotic co-play. Players stretch their oversized limbs across pressure plates, steal objects from each other, exchange clothing, and throw props hard enough to knock off another player's head. Interference is baked into the gameplay, but it means that multiple players compete to handle useful objects in the courtyard, turning a comedy about clumsy skeletons into a networking nightmare.

This game chose to handle the chaotic shared spectacle by setting `Class.Workspace.AuthorityMode|AuthorityMode` to `Enum.AuthorityMode.Server|Server`, bringing character abilities, physics, input, and every system capable of affecting the world under a single [authoritative][ServerAuthority] umbrella.

<Alert severity="warning">
`Class.Workspace.AuthorityMode|AuthorityMode` is a protected setting that must be manually set in Roblox Studio. It can't be set in a script or stored with the project code. If you forget it, you'll be testing a completely different game than you think.
</Alert>

## Clients express intent, not outcome

Network latency in [**Boneheads**][BoneheadsGameURL] is managed by players expressing **intent** while the server maintains the **outcome**. Picking up or stealing an object, moving the aim cursor, and charging a throw can respond immediately. When a player device's opinion of the world diverges from the server, that device [rolls back](../../projects/server-authority/index.md#rollback-and-resimulation) to the last known authoritative server state. These corrections are small and frequent enough that players don't consciously notice them, and they keep the game fair and fun for everybody.

<Grid container spacing={0}>
<Grid item container Small={12} Medium={11} Large={11} XLarge={11}>
<figure>
<video src="../../assets/resources/boneheads/Client-Intent-Aiming.mp4" controls width="100%" alt="Video showing a Boneheads player picking up objects, holding to aim, and throwing."></video>
<figcaption>While a player holds an object, their local client works out an aim point from the camera and the current input. The aim point is streamed to the server through a `Class.RemoteEvent` which keeps aiming responsive because nothing waits for a client/server round trip before it updates.</figcaption>
</figure><br />
</Grid>
<Grid item container Small={0} Medium={1} Large={1} XLarge={1}></Grid>
</Grid>

## Server controls world-changing systems

Several systems rewrite the courtyard in ways every player has to agree on. Those systems start from server scripts so one side owns the resulting state:

<Grid container spacing={2}>
<Grid item xs={12} sm={6} md={6}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #A00B60'}}>
	<CardContent style={{paddingBottom:'16px'}}>
	<div style={{marginBottom:'4px'}}><Typography variant="h6">Characters</Typography></div>
	<Typography variant="body1">Custom avatar spawning, limb scaling, head welding, and skeleton tinting.</Typography>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={6} md={6}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #92099D'}}>
	<CardContent style={{paddingBottom:'16px'}}>
	<div style={{marginBottom:'4px'}}><Typography variant="h6">Clothing & accessories</Typography></div>
	<Typography variant="body1">Clothing setup and accessory equip or unequip.</Typography>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={6} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #92099D'}}>
	<CardContent style={{paddingBottom:'16px'}}>
	<div style={{marginBottom:'4px'}}><Typography variant="h6">Carrying & stealing</Typography></div>
	<Typography variant="body1">Carryable transfers, including stealing an item from another player's hands.</Typography>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={6} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #A0140C'}}>
	<CardContent style={{paddingBottom:'16px'}}>
	<div style={{marginBottom:'4px'}}><Typography variant="h6">Off with their heads!</Typography></div>
	<Typography variant="body1">Projectile knockoffs that eject another player\'s head after a hard impact.</Typography>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={6} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #A00B60'}}>
	<CardContent style={{paddingBottom:'16px'}}>
	<div style={{marginBottom:'4px'}}><Typography variant="h6">Recovery & respawn</Typography></div>
	<Typography variant="body1">Death-plane recovery that returns a body or loose head to a spawn.</Typography>
	</CardContent>
	</Card>
</Grid>
</Grid><br />

[Puzzle mechanisms](./puzzle-mechanics.md) are a separate case. Levers, plates, targets, counters, gates, and doors don't call into each other; instead, each one reports its own state with a replicated `_activated` [attribute](../../studio/properties.md#instance-attributes) and other mechanisms read those attributes as inputs. A pressure plate reports that something is resting on it, a counter gate tracks how many of its inputs are active, and a door opens once every configured input agrees.

[BoneheadsGameURL]: https://github.com/Roblox/resources/tree/main/experiences/boneheads
[ServerAuthority]: ../../projects/server-authority/index.md
