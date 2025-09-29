---
title: Minimap system
comments:
description: Explains the minimap implementation details for the Battle Royale game kit.
prev: /resources/battle-royale/building-system
next: /resources/battle-royale/the-storm
---

The minimap shows a subset of the world map at the top-right corner of the player's screen. It also displays an indicator to show where you are, where the delivery vehicle is, and where your teammates are when playing in team mode. Lastly, it shows the current state of the [storm](../../resources/battle-royale/the-storm.md) and where the storm will be next so players know how to avoid it.

<img
alt="Minimap example"
src="../../assets/resources/battle-royale/minimap-system/Battle-Royale-Minimap.jpeg"
width="100%" />

Players can toggle between the minimap and world map by pressing <kbd>M</kbd> on a keyboard, pressing up on a gamepad's DPad, or by touching the minimap on touchscreens.

## Structure

The minimap is simply an `Class.ImageLabel` that displays a previously-generated image and uses `Class.CollectionService` to show the position of objects with specific tags. All of the UI objects used for the minimap are inside of the minimap screen GUI located in `ReplicatedStorage/Assets/GuiObjects`.

<img
alt="Minimap Objects"
src="../../assets/resources/battle-royale/minimap-system/Battle-Royale-Minimap-Objects.png"
width="320" />

## Add indicators

To add new indicators that show up on the minimap, complete these steps:

1. Through the [Tags](../../studio/properties.md#instance-tags) section of its properties, apply a custom tag to the workspace object that you want to show up on the minimap.

2. Add the `Class.ImageLabel` you want to represent the object as a child of `ReplicatedStorage/Assets/GuiObjects/minimap/mapframe` and give it a unique name.

3. Inside of `ReplicatedStorage/Libraries/Guis/MinimapGui`, locate the `MinimapGui.start()` function. Inside it, register the tag as shown below, where tag is the tag you registered in step #1 and `indicatorLabel` is the name of the `Class.ImageLabel` you added in step #2.

   ```lua
   function MinimapGui.start(teamDividingAngle)

   	while not _setupFinished do
   		task.wait()
   	end

   	MinimapGui.addMapTag("DeliveryVehicle", "Bus")
   	MinimapGui.addMapTag(Util._clientFocusTag, "LocalPlayerLocation")
   	MinimapGui.addMapTag("Player")
   	MinimapGui.addMapTag("Vehicle", "VehicleLocation")
   	MinimapGui.addMapTag(tag, indicatorLabel)
   ```

## Customize the minimap

To customize the minimap or use the minimap system with your own map and minimap image, you can change these values in `ReplicatedFirst/Configurations/MainConfiguration`:

<table>
<thead>
  <tr>
    <th>Variable</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`map_size`</td>
    <td>The size of one edge of your map in studs. Note the minimap assumes your map is square and that the map center is located at this world point: `Vector3.new(map_size, 0, map_size`).</td>
  </tr>
  <tr>
    <td>`minimap_width`</td>
    <td>Width in `Datatype.UDim` scale of the minimap on the player's screen.</td>
  </tr>
  <tr>
    <td>`minimap_height`</td>
    <td>Height in `Datatype.UDim` scale of the minimap on the player's screen.</td>
  </tr>
  <tr>
    <td>`minimap_zoom`</td>
    <td>Amount the minimap is zoomed in on the world map.</td>
  </tr>
  <tr>
    <td>`worldmap_width`</td>
    <td>Width in `Datatype.UDim` scale of the world map on the player's screen.</td>
  </tr>
  <tr>
    <td>`worldmap_height`</td>
    <td>Width in `Datatype.UDim` scale of the world map on the player's screen.</td>
  </tr>
  <tr>
    <td>`worldmap_zoom`</td>
    <td>Amount the world map is zoomed in on the worldmap.</td>
  </tr>
</tbody>
</table>
