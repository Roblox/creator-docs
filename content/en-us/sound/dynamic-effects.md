---
title: Dynamic effects
description: Legacy effects that modify or enhance Sound objects in your experiences.
---

<Alert severity = 'warning'>
There is a newer set of audio effects that offer more control and address robust use cases. For more information, see [Audio effects](../audio/effects.md).
</Alert>

Dynamic effects modify or enhance the audio of individual `Class.Sound` objects or an entire `Class.SoundGroup`. You can apply these effects to make your audio more immersive within your experience, such as using `Class.ReverbSoundEffect` in large rooms to make them feel massive.

## Apply dynamic effects

Each dynamic effect you apply has additional properties you can adjust until you achieve the type of sound you desire. For more information on these properties, see each dynamic effect's API page.

To apply a dynamic effect:

1. In the **Explorer** window, insert a new dynamic effect into a `Class.Sound` or `Class.SoundGroup` object.

   1. Hover over the object and click the ⊕ button. A contextual menu displays.
   2. From the menu, insert a **dynamic effect**.

      <img src="../assets/studio/explorer/SoundService-SoundGroup-ReverbSoundEffect.png" width="320" />

2. **(Optional)** In the **Properties** window, select the new dynamic effect and adjust its properties.

   <img src="../assets/audio/sound-groups/Dynamic-Effect-Properties.png" width="320" />

## Types

### Equalizer

The `Class.EqualizerSoundEffect` allows for control of the volume of various frequency ranges. This dynamic effect is useful to highlight or minimize particular elements of audio, such as muffling all audio in your experience when a user goes underwater.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/equalizer.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with equalizer</td>
  </tr>
</tbody>
</table>

### Compressor

The `Class.CompressorSoundEffect` reduces the dynamic range of audio by lowering the volume of the highest parts of a source while at the same time raising the overall volume. This dynamic effect is useful to set a consistent volume for users to hear even if you record audio while whispering or speaking loudly. You can also use this dynamic effect to prioritize sounds from one `Class.SoundGroup` over another through the process of ducking. For more information, see [Ducking](../sound/groups.md#ducking).

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/compressor.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with compressor</td>
  </tr>
</tbody>
</table>

### Reverb

The `Class.ReverbSoundEffect` simulates the effect of sounds bouncing off of several surfaces. This dynamic effect is useful to simulate more realistic reflections of sounds in interior spaces, such as bouncing a basketball inside a gymnasium, or playing rock music in a stadium.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/reverb.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with reverb</td>
  </tr>
</tbody>
</table>

### Chorus

The `Class.ChorusSoundEffect` simulates the effect of multiple vocals or instruments playing simultaneously by taking the original sound and overlaying copies, each with slight variations in pitch. This dynamic effect is useful for simulating a robotic or futuristic quality to your audio.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/chorus.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with chorus</td>
  </tr>
</tbody>
</table>

### Distortion

The `Class.DistortionSoundEffect` simulates the effect that would occur when overdriving older style audio equipment. This dynamic effect causes clipping in the sound and adds a general "fuzziness", which is useful for either adding intensity and character to musical instruments.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/distortion.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with distortion</td>
  </tr>
</tbody>
</table>

### Echo

The `Class.EchoSoundEffect` causes a sound to repeat on a delay with diminishing volume, simulating the real effect of an echo that bounces off of hard surfaces, such as walls and caves.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/echo.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with echo</td>
  </tr>
</tbody>
</table>

### Flange

The `Class.FlangeSoundEffect` creates a sweeping or whooshing effect by copying the original audio signal and playing it slightly offset and modulated on top of the original. This dynamic effect is useful for adding strange, otherworldly digital quality to your audio. For example, you can use it on an air conditioner recording to make a sci-fi spaceship engine rumble.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/flange.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with flange</td>
  </tr>
</tbody>
</table>

### Pitch Shift

The `Class.PitchShiftSoundEffect` raises or lowers pitch without changing the playback speed. This dynamic effect is useful for changing the scale of your sounds. You can use it to make small sounds feel huge by pitching them down or conversely pitch sounds up to make an explosion sound more like a balloon pop.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/pitch-shift.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with pitch shift</td>
  </tr>
</tbody>
</table>

### Tremolo

The `Class.TremoloSoundEffect` creates a trembling effect on a sound by varying its volume up and down. This dynamic effect is useful to transform instrument sounds into a wavy, dreamlike quality, or to create swells and dips in weather-related audio.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/no-effect.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/dynamic-effects/tremolo.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio without effect</td>
    <td>Audio with tremolo</td>
  </tr>
</tbody>
</table>
