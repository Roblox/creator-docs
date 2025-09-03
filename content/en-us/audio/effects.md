---
title: Audio effects
description: Audio effects modify or enhance audio streams in your experiences.
---

Audio effects non-destructively modify or enhance audio streams. You can apply these effects to make your audio more immersive within your experience, such as using an `Class.AudioEqualizer` object to make rain sound muffled, `Class.AudioCompressor` object to control a sound's maximum volume, or `Class.AudioReverb` to add more realistic reflections of sound in interior spaces.

## Apply audio effects

You can apply audio effects to your audio streams by wiring up the effect within your 2D audio or 3D audio setup before it reaches the player's ears. For example, to review the setup instructions in [Audio objects](../audio/objects.md#2d-audio), 2D audio requires an audio player to produce the stream, a physical hardware device like a speaker or headphones, and a wire to carry the audio stream from the audio player to the output device.

<img src="../assets/audio/audio-objects/2D-Audio-Diagram.png" width="100%" />

If you keep this setup the way it is, the audio stream from the asset ID plays as it was originally recorded. However, if you want to apply an audio effect to this audio stream, you must introduce the audio effect in the middle of the configuration so that the audio stream transmits through the effect before it transmits to the output device.

<img src="../assets/audio/effects/AudioEffect-Single.png" width="100%" />

Roblox's modular audio objects also allow you to wire multiple audio players through an audio effect, meaning that you don't have to have multiple audio effect objects with the same settings. This provides a lot of flexibility in how you customize multiple audio sources at once.

<img src="../assets/audio/effects/AudioEffect-Multiple.png" width="100%" />

In addition, you can apply multiple audio effects to the same audio stream to further customize your audio. As the audio stream transmits from the audio player to the device output, it's important to note that the order of the audio effects impacts the custom sound. For example, if you were to apply an `Class.AudioChorus` effect first, then an `Class.AudioDistortion` effect second, your custom sound may sound different from a configuration that applies the `Class.AudioDistortion` effect before the `Class.AudioChorus` effect.

<img src="../assets/audio/effects/AudioEffect-Layered.png" width="100%" />

Each audio effect you apply has additional properties you can adjust until you achieve the type of sound you desire. For more information on these properties, see each audio effect's API page.

## Types

### Equalizer

`Class.AudioEqualizer` allows for control of the volume of various frequency ranges. This audio effect is useful to highlight or minimize particular elements of audio, such as muffling all audio in your experience when a player goes underwater.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioEqualizer` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioEqualizer` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/equalizer.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Compressor

`Class.AudioCompressor` reduces the dynamic range of audio by lowering the volume of the highest parts of a source while at the same time raising the overall volume. This audio effect is useful to set a consistent volume for players to hear even if you record audio while whispering or speaking loudly. You can also use this dynamic effect to prioritize audio streams over another through the process of ducking.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioCompressor` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioCompressor` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/compressor.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Reverb

`Class.AudioReverb` simulates the effect of sounds bouncing off of several surfaces. This audio effect is useful to simulate more realistic reflections of sounds in interior spaces, such as bouncing a basketball inside a gymnasium, or playing rock music in a stadium.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioReverb` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioReverb` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/reverb.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Chorus

`Class.AudioChorus` simulates the effect of multiple vocals or instruments playing simultaneously by taking the original sound and overlaying copies, each with slight variations in pitch. This audio effect is useful for simulating a robotic or futuristic quality to your audio.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioChorus` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioChorus` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/chorus.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Distortion

`Class.AudioDistortion` simulates the effect that would occur when overdriving older style audio equipment. This audio effect causes clipping in the sound and adds a general "fuzziness," which is useful for either adding intensity and character to musical instruments.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioDistortion` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioDistortion` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/distortion.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Echo

`Class.AudioEcho` causes a sound to repeat on a delay with diminishing volume, simulating the real effect of an echo that bounces off of hard surfaces, such as walls and caves.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioEcho` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioEcho` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/echo.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Flanger

`Class.AudioFlanger` creates a sweeping or whooshing effect by copying the original audio signal and playing it slightly offset and modulated on top of the original. This audio effect is useful for adding strange, otherworldly digital quality to your audio. For example, you can use it on an air conditioner recording to make a sci‑fi spaceship engine rumble.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioFlanger` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioFlanger` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/flange.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Pitch Shift

`Class.AudioPitchShifter` raises or lowers pitch without changing the playback speed. This audio effect is useful for changing the scale of your sounds. You can use it to make small sounds feel huge by pitching them down or conversely pitch sounds up to make an explosion sound more like a balloon pop.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioPitchShifter` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioPitchShifter` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/pitch-shift.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Tremolo

`Class.AudioTremolo` creates a trembling effect on a sound by varying its volume up and down. This dynamic effect is useful to transform instrument sounds into a wavy, dreamlike quality, or to create swells and dips in weather‑related audio.

<GridContainer numColumns="2">
<figure>
	<figcaption>Without `Class.AudioTremolo` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
<figure>
  <figcaption>With `Class.AudioTremolo` effect</figcaption>
	<br />
	<audio controls>
	<source src="../assets/audio/dynamic-effects/tremolo.mp3" type="audio/mpeg"></source>
	</audio>
</figure>
</GridContainer>

### Fader

The `Class.AudioFader` adjusts the volume of audio streams to be either higher or lower. This audio effect is useful to control the volume and audio effects properties of multiple audio streams at once.

### Analyzer

The `Class.AudioAnalyzer` analyzes volume and frequency contents. This audio effect is useful for getting information to understanding how your audio is working together, both in volume and frequency content.
