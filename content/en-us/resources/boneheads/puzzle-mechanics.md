---
title: Puzzle mechanics
description: Explains how a small server-side signal graph and a two-state machine drives the game's puzzle system.
prev: /resources/boneheads/character-controller
---

The puzzle system in [**Boneheads**][BoneheadsGameURL] is a small server-side signal graph. Each mechanism is a two‑state machine (on&nbsp;or&nbsp;off) stored in one replicated `_activated` attribute. Mechanisms like pressure plates sense the world and activate or deactivate themselves, while doors and counter gates read their inputs every frame and react only when their result changes.

## Mechanism registration

The core `MechanismSystem` lives in `Class.ServerScriptService`, so all puzzle logic runs on the server.

1. At startup, every `Class.ModuleScript` in `Systems/MechanismSystem/Definitions` auto‑loads and is indexed by its name: `Door`, `CounterGate`, `Lever`, `PressurePlate`, `Target`, or `PlayerCounter`.
2. Any `Class.Model` in `Class.Workspace` tagged `Mechanism` is picked up and its `mechanismModule` attribute names which definition runs it. Its `_activated` attribute is set to `false` and a private state record is built in a server table, not on the model.
3. Each `Class.ObjectValue` in a mechanism's `Inputs` folder points at another mechanism model.

## The state machine

The only state other mechanisms can see is the boolean `_activated` attribute. **Source** mechanisms include **pressure plates**, **levers**, **targets**, and **player counters** which sense the world through events, such as an object landing on a pressure plate or a player flipping a lever. **Logic** mechanisms include **doors** and **counter gates** which read their inputs' `_activated` attributes every frame.

<Grid container spacing={2}>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #00639C'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Pressure Plate</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/PressurePlate.jpg" />
	<p></p>
	<figcaption>Activates when any unanchored part touches it. Deactivates when no parts are touching it.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #0E37B4'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Lever</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/Lever.jpg" />
	<p></p>
	<figcaption>Activates when a player triggers its `Class.ProximityPrompt`. Deactivates when a player uses it again.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #00639C'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Target</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/Target.jpg" />
	<p></p>
	<figcaption>Activates when any unanchored part hits it. Deactivates when its countdown ends.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #0E37B4'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Counter Gate</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/CounterGate.jpg" />
	<p></p>
	<figcaption>Activates when enough of its inputs are on. Deactivates if too few inputs are on.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #00639C'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Door / Trapdoor</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/Door.jpg" />
	<p></p>
	<figcaption>Opens when every input is on. Closes if any input turns off.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #0E37B4'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Player Counter</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/PlayerCounter.jpg" />
	<p></p>
	<figcaption>Activates when every player currently on the server is in its zone. Never deactivates.</figcaption>
	</CardContent>
	</Card>
</Grid>
</Grid><br /><br />

In the opening room of the game, mechanisms are configured as in the following diagram:

<img src="../../assets/resources/boneheads/Puzzle-Circuits.jpg" alt="Diagram showing five mechanisms and how they hook up to form a puzzle in Boneheads." width="100%" />

`Plate1`, `CounterGate`, and `Trapdoor` are one circuit. Just one active input is enough to complete the counter gate, so `Plate1` completes the `Trapdoor` circuit and raises the bridge for players to cross. Simultaneously, `CounterGate` listens to `Lever`, so activating the lever also completes the `Trapdoor` circuit and keeps the bridge up, even if `Plate1` deactivates.

`Lever` and `ExitDoor` are a separate circuit, where activating `Lever` directly opens `ExitDoor`. As noted above, activating `Lever` also completes the `CounterGate` circuit to keep the bridge up.

[BoneheadsGameURL]: https://github.com/Roblox/resources/tree/main/experiences/boneheads
