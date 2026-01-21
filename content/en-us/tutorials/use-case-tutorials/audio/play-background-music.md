---
title: Play background music
description: The process for creating background music in your experience.
---

Audio in Roblox is created with a `Class.Sound` object. Sounds can be positional, such as the sound of a waterfall, or universal for all players. This tutorial will show you how to create a universal sound to play background music.

<video controls>
   <source src="../../../assets/tutorials/playing-background-music/introToSound_bgMusic_web.mp4" />
</video>

## Play music

You can [upload](../../../audio/assets.md#import-audio) music or [obtain it from the marketplace](../../../audio/assets.md#find-audio), which contains thousands of free-to-use tracks. For this tutorial, you need the **asset ID** of a track.

The basic steps are to copy an asset ID, create a `Class.Sound` object, and use a script to play the music.

### Sound setup

If a sound object is parented to a part, sound will emit from its position. If a sound object is parented to **SoundService**, it will play at the same volume at every point in the 3D world. This makes SoundService ideal for storing background music.

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

### Play the song

Background music can be played through a script.

1. In **StarterPlayer** ⟩ **StarterPlayerScripts**, create a **LocalScript** named **MusicPlayer**.

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

4. Test the experience and confirm that the music is audible.

### Audio properties

Currently, the music doesn't loop. Additionally, the original sound file may be too loud for background music. These settings can be changed through two properties.

1. In the **BackgroundMusic** properties, toggle **Looped** to be **on**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_changeProperties_looped.png)

2. Lower the **Volume** to around **0.25**.

   ![alt](../../../assets/tutorials/playing-background-music/playingBGMusic_changeProperties_volume.png)

With this project done, explore using scripts to implement other features in music. For instance, try using a script to shuffle songs in a soundtrack or play songs in different areas of your 3D world.

For more on sounds and background music, see [Audio](../../../sound/index.md).
