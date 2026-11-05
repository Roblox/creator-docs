---
title: Friend co-op mechanics
description: Explains how Boneheads designs for chaotic co-op play with stealable objects, throwable heads and clothing, group puzzles, voice effects, and fall recovery.
next: /resources/boneheads/server-authority
prev: /resources/boneheads
---

[**Boneheads**][BoneheadsGameURL] is a "friend co-op" game featuring loose physics and clumsy controls, where a lot of the fun comes from players interfering with each other. Its systems let players steal held objects, knock off and exchange heads, trade layered clothing, stand in for each other on puzzles, and talk through voice effects.

## Shared objects to steal, throw, and wear

The head on each skeleton is a separate, carryable object. A head on its owner's shoulders can't be directly taken off by another player, but it can be knocked off if they're hit by a thrown prop. Once loose, the head is available for anyone to pick up, throw, or wear. Players can also steal an object directly from another player's hands when no free carryable is within reach.

<Grid container spacing={0}>
<Grid item container Small={12} Medium={11} Large={11} XLarge={11}>
<figure>
<video src="../../assets/resources/boneheads/Stealing-Mechanics.mp4" controls width="100%" alt="Video showing the Boneheads stealing mechanics in action, where unequipped accessories can be carried, stolen, dropped, and thrown like other tagged objects."></video>
<figcaption>Stealing mechanics in action, with a 1-second cooldown to prevent immediate steal‑backs.</figcaption>
</figure><br />
</Grid>
<Grid item container Small={0} Medium={1} Large={1} XLarge={1}></Grid>
</Grid>

A shared collision module inside `ReplicatedStorage/Systems/Collision` reports impacts to both the knock‑off and sound systems, with each listener applying its own speed threshold and cooldown. This extends a single physical event to every carryable without making each carryable implement specific behaviors itself.

## Heads as the focal point

Character heads remain the visual and audible focus, even if a head leaves its owner's body. The owner's camera follows its head, including after a respawn, and voice chat is emitted from the head model (with matching jaw movement) so that the owner's voice comes from the head's position. Similarly, [chat bubbles](../../chat/bubble-chat.md) appear above the head instead of the body.

<figure>
<Grid container spacing={0}>
<Grid item container Small={12} Medium={11} Large={11} XLarge={11}>
<video src="../../assets/resources/boneheads/Heads-As-Focus.mp4" controls width="100%" alt="Video showing a Boneheads character throwing its own head, and the voice still emits from the head, along with chat bubbles."></video>
</Grid>
<Grid item container Small={0} Medium={1} Large={1} XLarge={1}></Grid>
</Grid>
</figure>

## Puzzles designed for groups

[Puzzle mechanisms](./puzzle-mechanics.md) coordinate through a replicated `_activated` [attribute](../../studio/properties.md#instance-attributes) instead of calling each other directly. The following mechanisms are designed for groups:

<Grid container spacing={2}>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #087287'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Pressure Plates</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/PressurePlate.jpg" />
	<p></p>
	<figcaption>Pressure plates activate when any unanchored object touches them, including a character. A player can throw an object onto a plate instead of standing on it.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #036D3D'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Counter Gates</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/CounterGate.jpg" />
	<p></p>
	<figcaption>Counter gates count active inputs, displaying the current and required totals. A downstream door or bridge can use the counter's state as an input.</figcaption>
	</CardContent>
	</Card>
</Grid>
<Grid item xs={12} sm={4} md={4}>
	<Card variant="filled" style={{height:'100%', border:'2px solid #00639C'}}>
	<CardContent>
	<div style={{marginBottom:'12px'}}><Typography variant="h6">Player Counters</Typography></div>
	<CardMedia component="img" src="../../assets/resources/boneheads/PlayerCounter.jpg" />
	<p></p>
	<figcaption>Player counters activate when every player currently in the server stands in the zone. After activation, the counter remains active even if a player leaves.</figcaption>
	</CardContent>
	</Card>
</Grid>
</Grid>

## Voice effects by zone

Locally on each client, every player's voice passes through a chain of [audio effects](../../audio/effects.md) before it reaches their head: [pitch&nbsp;shift](../../audio/effects.md#pitch-shift), [chorus](../../audio/effects.md#chorus), [flanger](../../audio/effects.md#flanger), [distortion](../../audio/effects.md#distortion), [equalizer](../../audio/effects.md#equalizer), [echo](../../audio/effects.md#echo), and [reverb](../../audio/effects.md#reverb).

A few invisible parts tagged as `VoiceZone` are placed around the dungeon and each carries a `VoicePreset` attribute. Every `0.4` seconds, the client checks whether another character's `Class.Humanoid.RootPart` is inside a zone box and applies that zone's preset to their voice.

<table>
<thead>
  <tr>
    <th>Preset</th>
    <th>Sound</th>
		<th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Helium`</td>
    <td>Pitch raised by about 70%.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/Helium.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
  <tr>
    <td>`DeepMonster`</td>
    <td>Lowered pitch, boosted bass, and light reverb.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/DeepMonster.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
  <tr>
    <td>`WalkieTalkie`</td>
    <td>Narrow midrange, distortion, and a flanger.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/WalkieTalkie.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
  <tr>
    <td>`AlienHivemind`</td>
    <td>Raised pitch with a fast flanger and a short echo.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/AlienHivemind.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
  <tr>
    <td>`CaveEcho`</td>
    <td>Long reverb.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/CaveEcho.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
  <tr>
    <td>`Robot`</td>
    <td>Slightly raised pitch, narrow midrange, and distortion.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/Robot.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
  <tr>
    <td>`MountainYodel`</td>
    <td>A short echo without reverb.</td>
		<td>
			<audio controls>
			<source src="../../assets/resources/boneheads/MountainYodel.m4a" type="audio/mpeg"></source>
			</audio>
		</td>
  </tr>
</tbody>
</table>

[BoneheadsGameURL]: https://github.com/Roblox/resources/tree/main/experiences/boneheads
