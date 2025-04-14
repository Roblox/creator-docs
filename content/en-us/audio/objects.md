---
title: Audio objects
description: An overview of audio object on Roblox.
---

Roblox's modular audio objects allow you to have dynamic control over sound and voice chat in your experiences. Almost every audio object corresponds to a real-world audio device, and they all function together to capture and play audio like their physical counterparts.

For example, every audio object conceptually falls into the following categories:

- Objects that **produce** audio streams, such as audio players.
- Objects that **consume** audio streams, such as audio emitters.
- Objects that **modify** audio streams, such as audio effects.
- Objects that **carry** audio streams from one audio object to another, such as wires.

As you read through this guide and learn about how all of these audio objects work together to emit sound, you will learn how to accurately capture and feed music, sound effects, and the human voice from the experience to the player and vice-versa.

<Alert severity = 'info'>
`Class.Sound`, `Class.SoundGroup`, and `Class.SoundEffect` objects are now deprecated in favor of the more robust functionality of audio objects.
</Alert>

## Play audio

To play audio within your experience, it's important to understand the role of each available audio object:

- An `Class.AudioPlayer` loads and plays the **audio file** using a set audio assetID.
- An `Class.AudioEmitter` is a **virtual speaker** that emits audio into the 3D environment.
- An `Class.AudioListener` is a **virtual microphone** that picks up audio from the 3D environment.
- An `Class.AudioDeviceOutput` is a **physical hardware device** within the real world, such as a speaker or headphones.
- An `Class.AudioDeviceInput` is a **physical microphone** within the real world.
- A `Class.Wire` **carries audio streams** from one audio object to another.

How you pair these audio objects together depends on if you want to emit audio directly to the player's speaker or headphones or from objects in the 3D space. The following sections detail both scenarios.

### 2D audio

**2D audio** is non-directional sound that plays from no particular location, remaining at the same volume regardless of the player's position or orientation in the 3D space. This type of audio requires three audio objects:

- An audio player to produce an audio stream.
- A physical hardware device to play the audio stream in the real world.
- A wire to carry the audio stream from the audio player to the output device.

To demonstrate how to configure these audio objects in Studio for 2D audio, the following diagram compares each object with their real world audio device counterpart. In summary:

- The `Class.AudioPlayer` loads and plays your audio asset with specified settings.
- The `Class.AudioDeviceOutput` allows the player to hear the audio through their speaker or headphones.
- The `Class.Wire` connects to the audio player with its `Class.Wire.SourceInstance|SourceInstance` property, and to the physical hardware device with its `Class.Wire.TargetInstance|TargetInstance` property. It then acts as a bridge to carry the audio stream from the audio player to the player's output device.

<img src="../assets/audio/audio-objects/2D-Audio-Diagram.png" width="100%" />

To play non-directional audio:

1. In the **Explorer** window, navigate to **SoundService**, then
   1. Insert an **AudioPlayer** object to create an audio source.
   1. Insert an **AudioDeviceOutput** object to create a speaker that plays throughout the experience.
   1. Insert a **Wire** object to connect the stream from the audio player to the speaker.
1. Select the **AudioPlayer**, then in the **Properties** window,
   1. Set **AssetID** to a valid audio asset ID. If you don't have your own custom audio, you can find free-to-use audio assets in the Creator Store.
   1. Enable **Looping** if you want your audio to continuously repeat.
   1. Set **Volume** to the unit of amplitude you want to play your audio.
1. Select the **Wire**, then in the **Properties** window,
   1. Set **SourceInstance** to the **AudioPlayer** to specify that you want to play the audio within this specific audio player.
   1. Set **TargetInstance** to the **AudioDeviceOutput** to specify that you want to play the audio from this specific speaker.

From here, you can trigger your non-directional audio with scripts to either play as players join the experience or as a result of a gameplay event or UI interaction. For code sample references for these use cases, see the [Add 2D audio](../tutorials/use-case-tutorials/audio/add-2D-audio.md) tutorial.

### 3D audio

**3D audio** is directional sound that plays from a particular location in the 3D space, increasing or decreasing in volume depending on the player's position and orientation to the sound. This type of audio requires six audio objects:

- An audio player to produce an audio stream.
- An audio emitter to emit the audio stream within the environment.
- A listener to pick up the audio stream from the environment.
- A physical hardware device to play the audio stream in the real world.
- Two wires: one to carry the audio stream from the audio player to the emitter, and another to carry it from the listener to the output device.

To demonstrate how to configure these audio objects in Studio for 3D audio, the following diagram compares each object with their real world audio device counterpart. In summary:

- The `Class.AudioPlayer` loads and plays your audio asset with specified settings.
- The `Class.AudioEmitter`'s parent position in the 3D space determines where that audio emits within the environment.
- The `Class.AudioListener` either picks up audio from the emitter from the local camera or within the player character's `Class.Humanoid.RootPart`, depending on where you set the default listener position.
- The `Class.AudioDeviceOutput` allows the player to hear the audio through their speaker or headphones.
- The first `Class.Wire` connects to the audio player with its `Class.Wire.SourceInstance|SourceInstance` property, and to the emitter with its `Class.Wire.TargetInstance|TargetInstance` property. It then acts as a bridge to carry the audio stream from the audio player to the emitter.
- The second `Class.Wire` connects to the listener with its `Class.Wire.SourceInstance|SourceInstance` property, and to the physical hardware device with its `Class.Wire.TargetInstance|TargetInstance` property. It then acts as a bridge to carry the audio stream from the listener to the player's output device.

<img src="../assets/audio/audio-objects/3D-Audio-Diagram.png" width="100%" />

To play positional audio:

1. Choose where you want to create an **AudioListener** when players spawn into the experience.
   1. In the **Explorer** window, select **SoundService**.
   1. In the **Properties** window, set **ListenerLocation** to one of the following:
      - **Default** - Creates and parents the listener to `Class.Workspace.CurrentCamera` in experiences that enable voice chat.
      - **None** - Does not create a listener. This option is useful if you want to create a listener through a script.
      - **Character** - Creates and parents a listener to the local player's character.
      - **Camera** - Creates and parents the listener to `Class.Workspace.CurrentCamera`.

   <Alert severity = 'info'>
   When you set **ListenerLocation** to either **Character** or **Camera**, the engine automatically creates an `Class.AudioDeviceOutput` object under `Class.SoundService` at runtime.
   </Alert>

1. In the **Explorer** window, navigate to the 3D object that you want to emit audio, then:
   1. Insert an **AudioPlayer** object to create an audio source.
   1. Insert an **AudioEmitter** object to emit a positional stream from the 3D object.
   1. Insert a **Wire** object to connect the stream from the audio player to the audio emitter.
1. Select the **AudioPlayer**, then in the **Properties** window,
   1. Set **AssetID** to a valid audio asset ID. If you don't have your own custom audio, you can find free-to-use audio assets in the Creator Store.
   1. Enable **Looping** if you want your audio to continuously repeat.
   1. Set **Volume** to the unit of amplitude you want to play your audio.
1. Select the **AudioEmitter**, then in the **Properties** window, set **DistanceAttenuation** to a volume-over-distance curve that determines how loudly the listener hears the emitter according to the distance between them.

   For example, the following curve decreases the audio's volume in half when the listener is 50 studs away from the emitter, then it sharply decreases the volume to zero when the listener is 70 studs away.

   <img src="../assets/audio/audio-objects/DistanceAttenuation.png" width="60%" />

1. Select the **Wire**, then in the **Properties** window,
   1. Set **SourceInstance** to the **AudioPlayer** to specify that you want to play the audio within this specific audio player.
   1. Set **TargetInstance** to the **AudioEmitter** to specify that you want to play the audio from this specific audio emitter.

From here, you can trigger your directional audio with scripts to either play as players join the experience or as a result of a gameplay event or UI interaction. For code sample references for these use cases, see the [Add 3D audio](../tutorials/use-case-tutorials/audio/add-3D-audio.md) tutorial.

## Customize audio

Audio effects allow you to non-destructively modify or enhance audio streams before they reach a player's ears. You can apply these effects to make your audio more immersive within experiences, such as using an `Class.AudioEqualizer` object to make rain sound muffled, `Class.AudioCompressor` object to control a sound's maximum volume, or `Class.AudioReverb` to add more realistic reflections of sound in interior spaces.

For instructions on how to configure audio effects, as well as side-by-side comparisons of before and after you customize your audio, see [Audio effects](../audio/effects.md).

<img src="../assets/audio/effects/AudioEffect-Single.png" width="80%" />

<img src="../assets/audio/effects/AudioEffect-Multiple.png" width="80%" />

## Trigger audio

You can trigger audio contextually from a script by calling `Class.AudioPlayer.Play|Play()` on an `Class.AudioPlayer` object that's correctly wired up. For example, if you parent a script to an audio player, you can trigger the audio asset through something like this:

``` lua
local audio = script.Parent
local something = ...
something.SomeEvent:Connect(function()
    audio:Play()
end)
```

For more complex code samples to trigger audio, such as for gameplay feedback, UI interactions, and looping background noise, see the [Add 2D audio](../tutorials/use-case-tutorials/audio/add-2D-audio.md) and [Add 3D audio](../tutorials/use-case-tutorials/audio/add-3D-audio.md) tutorials.
