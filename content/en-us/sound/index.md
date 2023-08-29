---
title: Sound and Music
description: An overview of Sound features on Roblox
---

`Class.SoundService` lets you control playback of music and sound effects to enhance your
experiences and make them more immersive. You can import your own [audio
assets](#audio-assets) or search for free-to-use audio on the [Creator
Marketplace](/production/publishing/creator-marketplace), play your audio
with `Class.Sound` or `Class.SoundGroup` objects, and enhance your audio
through [dynamic effects](#dynamic-effects).

## Audio Assets

You can import [audio assets](../sound/assets.md) that you are certain you have permission to use, such as audio you make yourself. If you are uncertain if you have permission to use an audio file, the [Creator Marketplace](../production/publishing/creator-marketplace.md) has a variety of free-to-use audio, including more than 100,000 professionally-produced sound effects from top audio and music partners, such as APM, Monstercat, Pro Sound Effects, Nettwerk Music Group, and Position Music.

By default, the audio asset privacy system ensures that asset IDs from the audio assets you import are private and only available to you within the [Asset Manager](../projects/assets/manager.md) and [Toolbox](../projects/assets/toolbox.md), but you can view and grant permissions to specific experiences to use them.

## Sound Objects

A [sound object](../sound/objects.md) is an object that emits audio within your experience. Studio assigns each audio asset a **unique asset ID** that you can assign to `Class.Sound` objects to play a specific sound effect or music sample. You can either set this audio to play automatically at runtime, or trigger it to play from your scripts.

The location of where you place a `Class.Sound` object in the [Explorer](../studio/explorer.md) window affects how users hear audio. If you want users to only hear audio **near a specific position**, you must parent the `Class.Sound` object to a `Class.BasePart` or `Class.Attachment` for them to hear positional audio. However, if you want users to hear audio **regardless of their position**, you must insert a `Class.Sound` object directly into the Workspace without parenting it to another object for them to hear background audio.

## Sound Groups

A [sound group](../sound/groups.md) is an **audio mixer** that groups multiple audio objects, such as `Class.Sound` objects or additional `Class.SoundGroup|SoundGroups`, allowing you to control the volume and dynamic effects properties of multiple audio signals at once.

## Dynamic Effects

[Dynamic effects](../sound/dynamic-effects.md) modify or enhance the audio of individual `Class.Sound` objects or an entire `Class.SoundGroup`. You can apply these effects to make your audio more immersive within your experience, such as using `Class.EqualizerSoundEffect` to make rain sound muffled, `Class.CompressorSoundEffect` to control a sound's maximum volume, or `Class.ReverbSoundEffect` to add more realistic reflections of sound in interior spaces.
