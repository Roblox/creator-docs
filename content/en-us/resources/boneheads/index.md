---
title: Boneheads
description: Learn how Boneheads combines Server Authority, Character Controller Library abilities, caged avatars, interactive art, and deliberately messy co-op play.
---

[**Boneheads**][BoneheadsGameURL] is a cooperative physics game where players play as skeletons that carry, wear, steal, and throw objects around them (including their own heads!) to solve puzzles and progress to the final stage. Skeleton heads and layered accessories were meaningfully designed to belong to the same interaction system as crates and puzzle props, so other players can steal or swap items with each other.

<UseStudioButton variant="" buttonTextTranslationKey="Action.EditInStudio" placeId="84442400172515" universeId="10774682086" />

<figure>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/2XP882xARSQ" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

**Boneheads** combines several core systems to craft an entertaining game:

<Card variant="filled" style={{border:'2px solid #087287'}}>
<CardContent style={{paddingBottom:'16px'}}>
<p style={{marginBottom:'6px'}}><a href="./friend-mechanics.md"><Typography variant='h5'>Friend co-op mechanics</Typography></a></p>
<Typography variant="body1">Stealing, projectile impacts, shared puzzles, and emotes, become reasons for the group to interfere with itself.</Typography>
</CardContent>
</Card><br />

<Card variant="filled" style={{border:'2px solid #036D3D'}}>
<CardContent style={{paddingBottom:'16px'}}>
<p style={{marginBottom:'6px'}}><a href="./server-authority.md"><Typography variant='h5'>Server authority core</Typography></a></p>
<Typography variant="body1">Physics, collisions, head knockoffs, and shared mechanisms kept consistent for every player, while clients predict responsive input.</Typography>
</CardContent>
</Card><br />

<Card variant="filled" style={{border:'2px solid #0E37B4'}}>
<CardContent style={{paddingBottom:'16px'}}>
<p style={{marginBottom:'6px'}}><a href="./character-controller.md"><Typography variant='h5'>Character controls</Typography></a></p>
<Typography variant="body1">Carrying, dropping, throwing, wearing clothing, and playing emotes as custom abilities that share action-slot inputs and run within the predicted character simulation.</Typography>
</CardContent>
</Card><br />

<Card variant="filled" style={{border:'2px solid #00639C'}}>
<CardContent style={{paddingBottom:'16px'}}>
<p style={{marginBottom:'6px'}}><a href="./puzzle-mechanics.md"><Typography variant='h5'>Puzzle mechanics</Typography></a></p>
<Typography variant="body1">A small server-side signal graph and a two-state machine drives the game's puzzle system.</Typography>
</CardContent>
</Card><br />

[BoneheadsGameURL]: https://github.com/Roblox/resources/tree/main/experiences/boneheads
