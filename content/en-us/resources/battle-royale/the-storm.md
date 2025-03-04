---
title: The storm
comments:
prev: /resources/battle-royale/minimap-system
description: Explains the implementation details for the storm feature in the Battle Royale game kit.
---

The **storm** is essentially a large cylindrical barrier that starts big and slowly gets smaller as the match goes on. Players will take damage when outside of the barrier's boundary — this forces them to get closer and closer to each other and helps matches end in a reasonable time.

<img
alt="The Storm Example"
src="../../assets/resources/battle-royale/the-storm/Battle-Royale-Storm.jpeg"
width="100%" />

## Structure

Due to the part size limit, it's not possible to make the storm one huge cylinder. Instead, the storm consists of many thin rectangular parts arranged around the barrier's edge, making it appear cylindrical. These parts dynamically resize based on the proximity of players, splitting or combining with neighboring parts to maintain a smooth appearance. This behavior is handled by:

- `ServerScriptService/Core/ShrinkingBarrier`
- `ReplicatedStorage/Core/ShrinkingBarrierVisualization`

## Customize the storm

Within `ReplicatedFirst/Configurations/MainConfiguration`, the following variables can be adjusted to customize the storm:

### Map offset

The default center of the storm is the center of the map, but you can change the `map_offset` value to force players toward another point as the storm boundary shrinks.

```lua
map_size = 2450 * 4,
map_offset = Vector3.new(4900, 0, 4900),
```

### Storm options

Lower down, the `storm` table contains configuration values which determine how the storm behaves during matches, such as its radius, timing, and how much it shrinks.

```lua
storm = {
	radius = 6000,
	time_before_start = 120,
	debug_time_scale = 1,
	number_of_stages = 10,

	-- stage 0 (show starting circle with no transition)
	{ transition_length = 0,
		wait_length = 150,
		damage = 1,
		move_scale = 0,
		shrinkage_factor = 0 },
```

<table>
<thead>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`radius`</td>
    <td>Starting radius of the storm.</td>
  </tr>
  <tr>
    <td>`time_before_start`</td>
    <td>Time before the storm first appears.</td>
  </tr>
  <tr>
    <td>`debug_time_scale`</td>
    <td>Debugging time scale, helpful for tuning the stages. Change this to something higher than 1 to carry out the storm's stages faster.</td>
  </tr>
  <tr>
    <td>`number_of_stages`</td>
    <td>Number of stages the storm has.</td>
  </tr>
  <tr>
    <td>(stage tables)</td>
    <td>Series of tables (one for each stage as defined by number_of_stages) containing these variables:<br /><br />
    <ul /> - `transition_length` — Time in seconds for the storm to transition from its previous stage to this stage.<br /><br />
    <ul /> - `wait_length` — Time in seconds for the storm to wait before transitioning to the next stage.<br /><br />
    <ul /> - `damage` — Damage per second that players will take when they are outside of the storm barrier during this stage.<br /><br />
    <ul /> - `move_scale` — Multiplier that allows the storm center to move more when transitioning to this stage. A value of 0 means the storm center will only move such that the entire storm in this stage will stay within the bounds of the storm of the previous stage.<br /><br />
    <ul /> - `shrinkage_factor` — Fraction of the previous radius that is subtracted from the radius. For example, the radius at the end of stage 2 is 1000 and `shrinkage_factor` for stage 3 is 0.25, so the radius at the end of stage 3 will be 750 (`1000-(0.25*1000)`).</td>
  </tr>
</tbody>
</table>
