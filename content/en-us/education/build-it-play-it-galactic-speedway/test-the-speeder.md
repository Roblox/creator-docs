---
title: Test the speeder
prev: /education/build-it-play-it-galactic-speedway/add-to-the-garage
next: /education/build-it-play-it-galactic-speedway/take-the-challenge-2
description: Learn how to take your custom built spaceship on a test flight in Roblox Studio as part of the Build It Play It Galactic Speedway challenge.
---

Before moving on, take time to check that your speeder works correctly.

1. Click **Play** to test.

   <img src="../../assets/education/general/play-button.png" width="360" />

2. In the experience, walk up to the robot character under the spaceship sign and press <kbd>E</kbd> to open up a menu. On that screen, select **Race** and pick your speeder in the selection menu.

   <img src="../../assets/education/build-it-play-it-galactic-speedway/test-the-speeder/select-speeder.png" width="80%" />

3. While flying, make sure that your driftspeeder looks as you intended. Then **stop** the playtest and, if needed, fix any issues. Remember, you can stop playtesting with <kbd>Shift</kbd><kbd>F5</kbd>.

   <video controls src="../../assets/education/build-it-play-it-galactic-speedway/test-the-speeder/test-speeder.mp4"  width="80%"></video>

## Troubleshoot the speeder

If your driftspeeder does not show up in the selection screen, check the following steps:

**Make sure the speeder is in the Garage.**

1. Click on your speeder to help locate it in the **Explorer** window.
2. In the **Explorer** window, check that it's inside the **Garage** folder.
3. If not in **Garage**, use **Cut** and **Paste Into** to move it there.

**Check that the speeder has a Body.**

The code in game only loads speeders that have a Body part grouped within its model.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/build-it-play-it-galactic-speedway/test-the-speeder/explorer-correct.png" />
    <figcaption>
      <Alert severity="success">No extra models</Alert>
    </figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/build-it-play-it-galactic-speedway/test-the-speeder/explorer-wrong.png" width="93%" />
    <figcaption>
      <Alert severity="error">Extra model that causes issues</Alert>
    </figcaption>
  </figure>
</GridContainer>
