---
title: Audio
description: An overview of audio features on Roblox.
---

Adding audio to your experiences is crucial for elevating your experiences to new heights. By strategically using positional and non-positional audio, you can immerse players into your worlds, provide them useful feedback for their actions, and direct their attention to what they need to do to be successful in their objectives.

## Audio assets

You can import [audio assets](../audio/assets.md) that you're certain you have permission to use, such as audio that you make yourself. However, Roblox's [Creator Store](../production/creator-store.md) provides you a wide variety of free-to-use audio assets, including more than 100,000 professionally-produced sound effects and music tracks from top audio and music partners.

## Audio objects

Roblox offers many different types of [audio objects](../audio/objects.md) that you can use to play and modify your audio until it meets your experience's design requirements:

- The `Class.AudioPlayer` object loads and plays the **audio file** using a set [audio asset ID](../audio/assets.md).
- The `Class.AudioEmitter` object is a **virtual speaker** that emits audio into the 3D environment.
- The `Class.AudioListener` object is a **virtual microphone** that picks up audio from the 3D environment.
- The `Class.AudioDeviceOutput` object is a **physical hardware device** within the real world, such as a speaker or headphones.
- The `Class.AudioDeviceInput` object is a **physical microphone** within the real world.
- The `Class.AudioTextToSpeech` object converts **text to audio** using an artificial voice.
- The `Class.AudioSpeechToText` object converts **audio to text**.
- `Class.Wire|Wires` carry audio streams from one object to another.

Using these objects, you can either set audio to play automatically at runtime, or trigger it to play from scripts. For practical applications of these audio objects, see the [Add 2D audio](../tutorials/use-case-tutorials/audio/add-2D-audio.md), [Add 3D audio](../tutorials/use-case-tutorials/audio/add-3D-audio.md), [Add text-to-speech](../tutorials/use-case-tutorials/audio/add-text-to-speech.md), [Add speech-to-text](../tutorials/use-case-tutorials/audio/speech-to-text.md), and [Add voice chat](../tutorials/use-case-tutorials/audio/add-voice-chat.md) tutorials.

## Audio effects

[Audio effects](../audio/effects.md) non-destructively modify or enhance audio streams from `Class.AudioPlayer` objects. You can apply these effects to make your environments more captivating and immersive, such as using a `Class.AudioEqualizer` object to make rain sound muffled, `Class.AudioCompressor` object to control a sound's maximum volume, or `Class.AudioReverb` to add more realistic reflections of sound in interior spaces.
