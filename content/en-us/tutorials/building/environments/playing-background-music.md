---
title: Playing Background Music
description: The process for creating background music in your experience.
next: /tutorials/building/environments/in-game-sounds
prev: /tutorials/building/environments/lighting-with-props
---

Audio in Roblox is created with a **Sound** object. Sounds can be positional, such as the sound of a waterfall, or universal for all players. This tutorial will show you how to create a universal sound to play background music.

<video controls>
   <source src="../../../assets/tutorials/playing-background-music/introToSound_bgMusic_web.mp4" />
</video>

## Finding Music

Music can be uploaded, or it can be obtained from the Toolbox which contains thousands of free-to-use tracks. For this tutorial, you'll need the **asset ID** of an uploaded track or one found in the marketplace.

### Uploading Music

On Roblox, uploading audio files comes at a small cost in Robux — this accounts for the time it takes moderators to review every sound file that users upload.

1. Visit the [Create Audio](https://www.roblox.com/develop?View=3) page to upload a track.

2. Once the file is uploaded, it will appear in the list on the Audio page. Click the name to open its dedicated page and **copy** its **numeric ID** from the URL in the browser window.

<Alert severity="info">
In the URL, `https://www.roblox.com/library/1837849285/Night-Vision`, the asset ID is `1837849285`.
</Alert>

### Audio Marketplace

A wide variety of songs can also be found in the marketplace.

1. Open the **Toolbox** and go to the **Marketplace** tab. From the dropdown menu, select **Audio**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_toolboxAudio.png)

2. Click the **Sort** button and then, in the **Creator** field, type in a contributor such as Roblox or Monstercat (electronic music label partnered with Roblox).

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_sortAndShowCreator.png)

3. While browsing, sample songs by pressing the preview button.

   ![alt](../../../assets/tutorials/playing-background-music/Audio-Item-Play-Button.png)

4. After finding a song, right-click the listing and select **Copy Asset ID**. This ID will be used later to add in the background music.

   ![alt](../../../assets/tutorials/playing-background-music/Audio-Item-Copy-ID.png)

## Playing Music

With a previously copied asset ID, a new Sound object can be created. Once set up, a script will play the music for each player.

### Sound Setup

If a sound object is parented to a part, sound will emit from its position. If a sound object is parented to **SoundService**, it will play at the same volume at every point in the game world. This makes SoundService ideal for storing background music.

1. In **SoundService**, insert a **Sound** object named **BackgroundMusic**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_createSoundInSoundService.png)

2. In the newly created sound, find the **SoundId** property. Paste in the previously copied sound ID (or use one below) and press <kbd>Enter</kbd>.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_soundID.png)

3. Test that the sound works by clicking the Preview button.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_pressPreview.png)

Here are some sample music IDs you can use:

- **Creepy Organ/Dungeon** - `rbxassetid://1843463175`
- **Upbeat Electronica** - `rbxassetid://1837849285`
- **Grandiose Fantasy** - `rbxassetid://1848183670`

### Playing the Song

Background music can be played in a game through a script.

1. In **StarterPlayer** > **StarterPlayerScripts**, create a **LocalScript** named **MusicPlayer**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_pressPreview.png)

2. In the script, create variables to store **SoundService** and the **BackgroundMusic** object.

   ```lua
   local SoundService = game:GetService("SoundService")
   local backgroundMusic = SoundService.BackgroundMusic
   ```

3. Sounds are played using the `Class.Sound:Play()|Play` function. In a new line, call it on the `backgroundMusic` variable.

   ```lua
   local SoundService = game:GetService("SoundService")
   local backgroundMusic = SoundService.BackgroundMusic

   backgroundMusic:Play()
   ```

4. Test the game and confirm that the music is audible.

### Audio Properties

Currently, the music doesn't loop. Additionally, the original sound file may be too loud for background music. These settings can be changed through two properties.

1. In the **BackgroundMusic** properties, toggle **Looped** to be **on**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_changeProperties_looped.png)

2. Lower the **Volume** to around **0.25**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_changeProperties_volume.png)

With this project done, explore using scripts to implement other features in music. For instance, try using a script to shuffle songs in a soundtrack or play songs in different areas of your game world.

For more on sounds and background music, see [Audio](../../../sound/index.md).
