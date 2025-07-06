---
title: Reaper
description: Learn about Reaper tools.
---

Reaper is a Digital Audio Workstation (DAW) with a broad range of audio editing tools that allow you to create, manipulate, and export audio streams. Running on Linux, macOS, and Windows systems, this cross-platform application is a popular choice for creators who want to make custom music and sound effects for Roblox experiences.

While this is by no means an exhaustive list, the following guide offers high-level information on essential Reaper tools and features for audio editing, as well as best practice guidance on designing audio files for Studio.

<Alert severity="info">
Reaper’s free trial mode is fully functional and extendable, allowing you to try the software and see if you’d like to purchase a license for its use in commercial projects.

To download the latest version of Reaper, visit [Reaper.fm](https://www.reaper.fm/download.php).
</Alert>

## Fundamentals

Before you take a look at all of the common workflows for creating custom audio for Studio, let's review Reaper's fundamental interface elements that are important for navigating through the application and finding the appropriate menus and controls for your specific audio editing task.

### Toolbar

<img src="../assets/art/3p-software/reaper/Toolbar.png" width = "75%" alt="Reaper's UI with the main toolbar highlighted."/>

The **Toolbar** contains various tools that let you perform actions common to most audio workflows, such as:

- Opening or saving a project.
- Accessing your project's settings.
- Enabling a metronome.
- Configuring ripple editing.
- Disabling audio track snapping behavior.

As you get more familiar with Reaper, you can customize the Toolbar with additional commands and actions for your own workflows.

### Track Control Panel

<img src="../assets/art/3p-software/reaper/TrackControlPanel.png" width = "75%" alt="Reaper's UI with the Track Control Panel highlighted."/>

The **Track Control Panel** controls the behavior of your audio tracks, such as each track's volume, gain, and effects from plugins, as well as their relationships to other audio tracks. There is only one audio track in the example image, but you can add as many audio tracks as you need for your project.

### Timeline

<img src="../assets/art/3p-software/reaper/Timeline.png" width = "75%" alt="Reaper's UI with the Timeline highlighted."/>

The **Timeline** measures the length of your project and provides visual markers to help you position entire or segments of audio tracks in relation to each other. The Timeline in the example image measures time in both measures/beats and minutes/seconds, but you can customize its units of measurement for your own project requirements.

### Arrange Area

<img src="../assets/art/3p-software/reaper/ArrangeArea.png" width = "75%" alt="Reaper's UI with the Arrange Area highlighted."/>

The **Arrange Area** lets you view and edit audio tracks within your project using the green scrubber, also known as the cursor. This area represents the main workspace for audio manipulation.

### Transport Bar

<img src="../assets/art/3p-software/reaper/TransportBar.png" width = "75%" alt="Reaper's UI with the Transport Bar highlighted."/>

The **Transport Bar** lets you control audio recordings and playback, such as:

- Jumping to the start or end of an audio track.
- Recording additional audio.
- Modifying the time signature, tempo, or playback rate.

It's recommended to experiment with hotkeys for these actions to make your workflows for efficient.

### Mixer Control Panel

<img src="../assets/art/3p-software/reaper/MixerControlPanel.png" width = "75%" alt="Reaper's UI with the Mixer Control Panel highlighted."/>

The **Mixer Control Panel** offers a different way to view your tracks. Having the volume meters laid out horizontally in the mixer can allow for more visual clarity on what elements are the loudest in your arrangement, but this is simply a visual preference. All features of Reaper can be utilized with the mixer closed, and many sound designers don't even use the view.

### FX Plugins

<img src="../assets/art/3p-software/reaper/FXPlugins.png" width = "75%" alt="Reaper's UI with the FX Plugins window highlighted."/>

Similar to plugins in Studio, the **Plugins Window** lets you add additional features or functionality to Reaper to make audio editing and workflows easier. Reaper offers over 200 fx plugins with the creation suite for your convenience, and you can import additional plugins from third-party creators.

## Common workflows

Now that you know how to navigate the user interface, let's take a closer look at the most common audio editing workflows that allow you to create, manipulate, and export audio streams for Roblox experiences.

<Alert severity="info">
For more information on any of these workflows, see Reaper's official [Up and Running: A Reaper User Guide](https://www.reaper.fm/userguide.php) documentation.
</Alert>

### Create fade ins and outs

In audio design, it's common to trim a small section off of an audio file, then fade it in and out to help smooth the sound's transition from start to finish. This process is important because ambient sounds in the real world don't often start and stop suddenly; if they did, it would feel extremely jarring.

For example, let's review the following two audio clips of a wind gust; the first audio clip includes fade ins and outs to help the sound feel more natural while the second keeps the initial cut. As you listen to both, notice how the first clip feels realistic while the other feels abrupt. Without these transitions, the sound would break a player's sense of immersion in an experience.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/Transitions.ogg" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoTransitions.ogg" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio with transitions</td>
    <td>Audio without transitions</td>
  </tr>
</tbody>
</table>

To create fades ins and outs:

1. Import your audio file.
   1. Select a `.mp3`, `.ogg`, or `.wav` file on your computer.
   1. Drag-and-drop the audio file into the **Arrange Area**.
1. Crop the sample until you have a portion of the sound you want to play in your experience.
   1. Hover over the left-side of your audio file until your cursor changes to a double-sided arrow icon.
   1. Click-and-drag the audio sample to where you want to start your fade in.
   1. In a similar process, click-and-drag the right-side of your audio file to where you want to finish your fade out.

   <video controls src="../assets/art/3p-software/reaper/Fades-Crop.mp4" width="90%"></video>

1. Transition the sample in and out.
   1. Hover over the top-left corner of your audio sample until your cursor changes to a curve icon.
   1. Click-and-drag the audio sample to where you want to finish your fade in.
   1. In a similar process, click-and-drag the top-right corner of your audio sample to where you want to start your fade out.

   <video controls src="../assets/art/3p-software/reaper/Fades-Transition.mp4" width="90%"></video>

1. **(Optional)** Change the transition's curve type.
   1. Right-click either your fade in or out curve. A pop-up menu displays with multiple curve types.
   1. Select a new curve. The sound fades in or out according to the new curve type.

   <video controls src="../assets/art/3p-software/reaper/Fades-CurveType.mp4" width="90%"></video>

### Compress audio

In audio design, the dynamics of a sound refer to the sound's volume and how that volume changes over time. For example:

- An explosion's sound is **dynamic** because it starts extremely loud, then fades to a quiet echo in a few seconds.
- A waterfall's sound is **non-dynamic** because even if you were to record the waterfall for a few minutes, it would likely remain at roughly the same volume.

While both of these examples have their time and place in projects, compressing audio allows you to reduce the dynamic range of a sound by lowering the volume of loud peaks within a set ratio. This results in the loudest parts of a sound becoming more similar in volume to the quietest parts of a sound.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/Compression.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoCompression.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio with compression</td>
    <td>Audio without compression</td>
  </tr>
</tbody>
</table>

This is important because without compression, some sounds can be significantly louder than others and drown out important audio cues throughout your experiences, especially when they play through speakers that struggle with wide dynamic ranges, like mobile devices.

To compress audio:

1. In the **Track Control Panel**, navigate to the audio track that you want to compress, then click the **FX** button. The **Plugins window** displays.
1. Search for **ReaComp**, short for Reaper Compressor, select the result, then click the **Add** button. A new compressor window displays.

   <img src="../assets/art/3p-software/reaper/Compress-ReaComp.png" width = "70%" alt="Reaper's Plugins Window with the ReaComp plugin highlighted."/>

1. Lower the **Threshold** to the highest peak you want your audio to be able to have before it starts being compressed.

   <img src="../assets/art/3p-software/reaper/Compress-Threshold.png" width = "80%" alt="Reaper's Compressor UI with the Threshold toggle highlighted."/>

1. Play your audio while looking at the compressor window. A bright red section displays when sounds go over your set threshold. In the example image, the red meter reads roughly -8; this means that the loud parts of the sound have been turned down by about 8 decibels.

   <img src="../assets/art/3p-software/reaper/Compress-CompressionBar.png" width = "80%" alt="Reaper's Compressor UI with the compression bar highlighted."/>

1. For further compression configurations:
   1. Increase the **Ratio** to make the effect of volume reduction more pronounced.
   1. Customize your **Attack** and **Release** times to change how quickly the compressor starts and finishs compressing your audio track.

### Equalize frequencies

As you are editing your audio, it occasionally becomes necessary to make adjustments to its frequency balance so that you can do things like:

- Increase the volume of its bright, high frequencies.
- Lower the volume of its bassy, low frequencies.
- Remove a shrill, harsh tone from the middle range of frequencies.

This process is called **equalizing**, and it's important because it allows you to mimic realistic acoustics for different gameplay areas. For example, if a player is underwater, high frequencies would naturally be muffled and low frequencies would be easily audible, but if the player moved to an open space outside, no muffling would occur, and high frequencies would be audible again.

Let's look at this in practice with two audio clips of a rain sound; the first audio clip includes a lowered high shelf while the second doesn't include any equalizing. As you listen to both, notice how the first clip feels muted and warm like it's hitting the window while you are inside, and the second clip feels cold like you are outside.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/EQ.ogg" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoEQ.ogg" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio with equalizing frequencies</td>
    <td>Audio without equalizing frequencies</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
Equalizing frequencies is an art form, and it takes time to figure out what configurations work to meet the needs of your experiences. It's recommended to experiment often until you find what sounds best to you.
</Alert>

To equalize frequencies in a sound:

1. In the **Track Control Panel**, navigate to the audio track that you want to equalize its frequencies, then click the **FX** button. The **Plugins window** displays.
1. Search for **ReaEQ**, short for Reaper Equalizer, select the result, then click the **Add** button. A new equalizer window displays with four enabled bands.

   <img src="../assets/art/3p-software/reaper/Equalize-ReaEQ.png" width = "70%" alt="Reaper's Plugins Window with the ReaEQ plugin highlighted."/>

1. Select any of the enabled bands, then set **Type** according to what frequencies you want to equalize. Most use case use one of the following:

   - **Low Shelf** - Moves the gain below the frequency setting. This is typically the first band.
   - **High Shelf** - Moves the gain above the frequency setting. This is typically the last band.
   - **Band** - The volume is raised or lowered on either side of the frequency, and the range is determined by the bandwidth setting.
   - **Low Pass** - Filters frequencies above the frequency setting.
   - **High Pass** - Filters frequencies below the frequency setting.

   <img src="../assets/art/3p-software/reaper/Equalize-Type.png" width = "80%" alt="Reaper's Equalizer UI with the first band highlighted and the Type dropdown set to Low Shelf"/>

1. Play your audio while looking at the equalizer window, and make any necessary adjustments for the sound quality you want.

### Reduce noise

When you record audio, it is almost impossible to completely avoid capturing additional undesirable noise, such as the hum of an air conditioning unit, street traffic, or planes flying overhead. For this reason, it's important to reduce noise in your audio clips so that players can focus on what matters most without distraction.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoiseReduction.ogg" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoNoiseReduction.ogg" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio with noise reduction</td>
    <td>Audio without noise reduction</td>
  </tr>
</tbody>
</table>

While subtle noise reduction may seem unnecessary, when multiple layered sounds play at the same time, such as a character's footsteps, dialogue, and an ambient backdrop, the subtle noise becomes much more noticeable. This process ensures that all of our audio stands out, especially when players are wearing headphones.

To reduce noise:

1. In the **Track Control Panel**, navigate to the audio track that you want to equalize its frequencies, then click the **FX** button. The **Plugins window** displays.
1. Search for **ReaFir**, short for Reaper Finite Impulse Responser, select the result, then click the **Add** button. A new finite impulse response window displays.

   <img src="../assets/art/3p-software/reaper/Noise-ReaFir.png" width = "70%" alt="Reaper's Plugins Window with the ReaFir plugin highlighted."/>

1. Configure the following settings:

   1. Set **Mode** to **Subtract**. New settings display.
   1. Enable **Automatically build noise profile**.

   <img src="../assets/art/3p-software/reaper/Noise-Subtract.png" width = "70%" alt="Reaper's Plugins Window with the noise reduction settings highlighted."/>

1. Play the part of your sound that contains the noise you want to reduce for several seconds, but do **not** play the part of the sound you want to keep. This step teaches the plugin what the undesirable frequencies are.
1. When the plugin has learned the spectrum of your noise, disable **Automatically build noise profile**.
1. Play your audio to hear it again to hear it with reduced noise.

### Create audio variations

For audio design in experiences, it's important to create variations of sounds that players will hear often during their gameplay, such as footsteps, sword swings, or collection feedback. In the same way that real world sounds almost never repeat exactly the same,  variations in sound improves player immersion and leads to a dynamic player experience.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/Variations.ogg" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoVariations.ogg" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio with variations</td>
    <td>Audio without variations</td>
  </tr>
</tbody>
</table>

There are many ways to create variation in your audio, but the following step-by-step instruction will focus on a few simple steps you can take to create three alternatives in less than three minutes.

To create variations in your audio:

1. In the **Arrange Area**, duplicate your audio clip until you have three exact copies. The first copy will remain your original sound while the other two will become your variations.

   <img src="../assets/art/3p-software/reaper/Variations-Copies.png" width = "80%" alt="Reaper's Arrange Area with three copies of an audio segment."/>

1. Right-click the second copy, then from the contextual menu, select **Item properties…**. The **Media Item Properties** window displays for the second copy.

   <img src="../assets/art/3p-software/reaper/Variations-ItemProperties.png" width = "80%" alt=""/>

1. In the **Pitch Adjustment** field, raise or lower the pitch of the sound.
1. Click the **Apply** button.
1. Right-click the third copy, then from the contextual menu, select **Item properties…**. The **Media Item Properties** window displays for the third copy.
1. In the **Playback rate** field, increase or decrease the playback rate.
1. Click the **Apply** button, then play your original and both variations to hear the difference between all three.

### Loop audio

<Alert severity="info">
For a step-by-step tutorial from an official Roblox Sound Designer on looping sounds for experiences, see [Creating Perfect Audio Loops](https://devforum.roblox.com/t/creating-perfect-audio-loops/2849057).
</Alert>

When you record an ambient sound in the real world, it almost never loops perfectly. Even monotonous, non-dynamic sounds like the hum of an air conditioner will click and pop as they loop, breaking player immersion and pulling them out of their gameplay.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/Loops.ogg" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/art/3p-software/reaper/NoLoops.ogg" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>Audio with seamless loops</td>
    <td>Audio without seamless loops</td>
  </tr>
</tbody>
</table>

This becomes more obvious when there are multiple looping ambient tracks that layer on top of one another. For example, let's say you have an exploration experience with frog croaking, insects chirping, wind gently breezing by, and an upbeat background track. As these sounds loops, there may be harsh volume and/or frequency jumps.

In the best case scenario, this just annoys players, but in the worst case scenario, it can cause them to leave the experience altogether. With a little extra effort, you can create seamless loops that keep your intended mood without disruption.

To create a loop:

1. Ensure your audio clip is long enough to avoid the risk of being too obvious if it loops. For most use cases, it should be at least 15 seconds.
1. In the **Arrange Area**, find a small point in the sound where your waveform(s) cross the Z axis, or `0`. This means that the sound has no amplitude, so it won't pop or click when the sound loops.

   <img src="../assets/art/3p-software/reaper/Loop-LoopPoint.png" width = "80%" alt="An audio track with the cursor over the loop point."/>

1. Press <kbd>S</kbd> to split the track. Your audio track is now cut into two segments.

   <img src="../assets/art/3p-software/reaper/Loop-Split.png" width = "80%" alt="An audio track with two segments, seperated at the loop point."/>

1. Move the second clip so that it plays before the first clip and has a slight overlap indicated by the red outline.

   <video controls src="../assets/art/3p-software/reaper/Loop-MoveClips.mp4" width="80%"></video>

1. Play your audio to hear it loop seamlessly.

   <video controls src="../assets/art/3p-software/reaper/Loop-Play.mp4" width="80%"></video>

### Export audio

After you finish editing your audio, you can export it for use in Studio. The following settings meet the requirements of most use cases, but as you become a more advanced user of Reaper, you can customize the settings for your own projects

To export audio:

1. In the **Arrange Area**, click-and-drag over your audio sample to highlight what you want to export.
1. In the menu bar, navigate to **File** > **Render…**. The **Render to File** window displays.

   <img src="../assets/art/3p-software/reaper/FileRender.png" width = "50%" alt=""/>

1. Configure the following settings:
   1. Set **Source** to **Master mix**.
   1. Set **Bounds** to **Time selection** to export your selection in the Arrange Area.
   1. Set **Directory** to the location you want to download your file.
   1. Set **Name** to what you want to call your file.
   1. Set **Sample Rate** to `48000` **Hz** to ensure a high quality level at standard pitch, while also keeping the file size optimally small for lower memory footprint.

      <Alert severity="info">
      If you want a higher quality and plan to pitch the sound down at runtime dynamically, you can increase the quality to `96,000` **Hz**.
      </Alert>

   1. Set **Channels** to **Stereo** for 2 channels or **Mono** for 1 channel.
   1. Set **Primary output format** to **OGG vorbis**. This is the preferred file type for experiences as it doesn't add any additional silence to the start or end of your audio.

      <Alert severity="warning">
      Do not use the `.mp3` output format as it will add a few milliseconds of silence to the beginning of your audio.
      </Alert>

   1. Set **VBR quality** to `0.9` to increase the quality.
   1. At the bottom of the window, click **Render 1 file**. A new window displays with a preview of what your audio looks like.

   <img src="../assets/art/3p-software/reaper//RenderToFileSettings.png" width = "70%" alt=""/>

<Alert severity="success">
For information on how to use your new custom audio files in experiences, see the [Audio](../audio/index.md) guides.
</Alert>
