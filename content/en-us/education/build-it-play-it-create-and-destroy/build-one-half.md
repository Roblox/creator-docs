---
title: Build one half
description: Part of the Create and Destroy series. Work on finishing a map for the multiplayer experience.
next: /education/build-it-play-it-create-and-destroy/playtest-the-map
prev: /education/build-it-play-it-create-and-destroy/challenge-1
---

With the SpawnLocations done, it's time to design the city. Designing will follow these steps:

- **Add buildings**, which come in large and medium sizes, each giving different points when destroyed.
- **Place props** to make the city more visually interesting.
- **Paint terrain** like mountains, rivers, and hills.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/education/build-it-play-it-create-and-destroy/buildingExamples_large.jpg" />
    <figcaption>Buildings</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-create-and-destroy/buildingExamples_props.jpg" />
    <figcaption>Props</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-create-and-destroy/show-terrain-360px.jpg" />
    <figcaption>Terrain</figcaption>
  </figure>
</GridContainer>

## Start building

To build the city, you'll duplicate buildings from the of objects on the right side of the game world.

<img src="../../assets/education/build-it-play-it-create-and-destroy/PlacedHalfMap.jpg" width="100%" />

## Duplicate the first building

1. Select a large building from the palette and **duplicate** it (<kbd>Ctrl</kbd><kbd>D</kbd> or <kbd>⌘</kbd><kbd>D</kbd>). Nothing obvious will happen. With collisions off, the new building will overlap the original.
   <Alert severity="warning">
   To avoid errors in your experience, **always duplicate** buildings and props, not copy and paste. Duplicate puts the new object into the same folder, copy and paste moves the new object outside of the folder.
   </Alert>

    <img src="../../assets/education/build-it-play-it-create-and-destroy/PlacedHalfMap.jpg" width="100%" />

2. Select the **Move** tool and use the **arrows** to drag the **duplicate** to the half of the map you're working on. Use the white grid lines to help you position the buildings halfway between the two SpawnLocations and to make sure you're keeping to one half of the map.
   <video controls src="../../assets/education/build-it-play-it-create-and-destroy/cc2019_moveFirstBuilding.mp4" width="100%"></video>

## Check all the angles

As you work, make sure that you're not accidentally moving the buildings upwards off the ground. Take a moment to check the building you just placed by rotating the camera to get a better look from different angles. Start by checking the building from the side.

1. Select the building, and press <kbd>F</kbd> to focus the camera on it.
   <img src="../../assets/education/build-it-play-it-create-and-destroy/showFocusBuilding.jpg" width="100%" />
2. Use the small arrows on the **View Selector** (top right) to change to the side view. If you can't find the View Selector, find it's button in the View tab.
   <video controls src="../../assets/education/build-it-play-it-create-and-destroy/changeViewSelectorSide_updated.mp4" width="100%"></video>
3. Use the camera controls to get a good view of the building.
   <video controls src="../../assets/education/build-it-play-it-create-and-destroy/cc2019_showCameraControlsBuilding.mp4" width="100%"></video>

   Below are camera controls.
    <table>
    <thead>
    <tr>
      <th>Action</th>
      <th>Control</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><b>Move</b></td>
      <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> or arrow keys</td>
    </tr>
    <tr>
      <td><b>Rotate</b></td>
      <td>Hold the right mouse button and look around.</td>
    </tr>
    <tr>
      <td><b>Pan</b></td>
      <td>Hold the middle mouse button to drag your camera around.</td>
    </tr>
    </tbody>
    </table>

4. Get back to the top view by using the arrows, or by clicking areas of the View Selector.
   <video controls src="../../assets/education/build-it-play-it-create-and-destroy/cc2019_switchBackTop.mp4" width="100%"></video>

## Place additional large buildings

Duplicate and place **3 - 5 additional** large buildings on the same half of the map. Remember that you will be duplicating this half to make the rest of the map.

Your map doesn't have to look like the example, but each player should be able to reach the same amount of buildings. Here, every player has an equal chance of reaching three of the four buildings.

<img src="../../assets/education/build-it-play-it-create-and-destroy/PlacedHalfMap.jpg" width="100%" />

### Troubleshooting tips

While designing the map, if you notice buildings don't snap in place, try the following below.

- In the Model tab, check that your Snap to Grid settings for Move is set to 4 studs. If not, your buildings may snap incorrectly.
- To get the most accurate snapping, it's recommended to work from the top view and to always move objects using the arrows, not by dragging.
- If an object won't snap correctly, restart by deleting the building and then duplicating a new one from the palette.
