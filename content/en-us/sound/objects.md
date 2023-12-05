---
title: Sound Objects
description: Sound objects are instances that emit audio within an experience.
---

Audio playback occurs through `Class.Sound` objects which emit audio within an experience. Roblox assigns each [audio asset](../sound/assets.md) a unique ID that you can assign to `Class.Sound` objects to play a specific sound effect or music track. You can either set this audio to play automatically at runtime, or trigger it to [play from scripts](#scripting-sound-objects).

To modify playback of multiple `Class.Sound` objects, you can assign them to a [sound group](../sound/groups.md) and control the entire group's volume, as well as apply [dynamic effects](../sound/dynamic-effects.md).

## Creating Sound Objects

There are three locations you can create a `Class.Sound` object, and each location determines how audio emits and volume changes in relation to the user's position within the experience.

<table>
<thead>
  <tr>
    <th>Location</th>
    <th>How Audio Emits</th>
    <th>How Volume Changes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Child of a block, sphere, or cylinder `Class.BasePart`.</td>
    <td>Audio emits outward from the entire surface of the part.</td>
    <td>Volume changes depending on the distance between the user's sound listener and the position of the part, as well as its size.</td>
  </tr>
  <tr>
    <td>Child of an `Class.Attachment`, `Class.MeshPart`, `Class.TrussPart`, `Class.WedgePart`, or `Class.CornerWedgePart`.</td>
    <td>Audio emits outward from the single attachment point or part center.</td>
    <td>Volume changes depending on the distance between the user's sound listener and the attachment/part position.</td>
  </tr>
  <tr>
    <td>Within `Class.SoundService` or `Class.Workspace`.</td>
    <td>Audio emits throughout the experience.</td>
    <td>Volume and pan position remain the same regardless of the user's sound listener position or rotation.</td>
  </tr>
</tbody>
</table>

### Positional Audio

Positional audio is audio that users can only hear near a specific position within the experience. There are two types of positional audio you can utilize: volumetric and point source.

#### Volumetric

Volumetric audio is the most realistic audio option, as it dynamically changes depending on the user's position to the audio source. For example, if the user is within a `Class.BasePart` with a child `Class.Sound` object, audio plays all around the user, similar to music in headphones playing at the same volume in each speaker. When the user exits the part, audio gradually decreases in volume and becomes more directional per speaker, moving around the user's head when their listener rotates. For information on the properties that control how loud your audio is at different distances from the part, see [RollOffMinDistance and RollOffMaxDistance](#rolloffmindistance-and-rolloffmaxdistance).

The size of the `Class.BasePart` also affects the audio's volume, as larger `Class.BasePart|BaseParts` produce a wider area in which users can hear the audio and when a user navigates away from a large `Class.BasePart`, volume decreases slower. The following example displays a `Class.BasePart` that is the size of a city with a `Class.Sound` object playing ambient audio. Users A and B experience the audio differently: user B is closer to the large `Class.BasePart`, and they mostly hear the audio around the same loudness in both speakers. Conversely, user A is further away from the city, so the audio they hear is quieter and more directional than user B, playing at differing loudness in each of their speakers.

<img src="../assets/audio/sound-objects/Volumetric-Sound-Diagram.jpg" width="80%" />

Volumetric audio is useful for any audio that needs to be immersive around a user and change dynamically depending on the user's position, such as a concert stage or ambience zones like rainfall. When you experiment with placing a `Class.Sound` object on `Class.BasePart|BaseParts` of different sizes and positions from users, you can hear how immersive volumetric audio can be.

<video src="../assets/audio/sound-objects/Volumetric-Demo.mp4" controls width="80%"></video>

To create a `Class.Sound` object for volumetric audio:

1. In the **Explorer** window, select **SoundService**.
2. In the **Properties** window, navigate to the **VolumetricAudio** property, then set it to **Enabled**.
3. In the **Explorer** window, hover over a `Class.BasePart`, then click the ⊕ button. A contextual menu displays.
4. From the menu, insert a **Sound**.

   <img src="../assets/audio/sound-objects/Volumetric-Sound.png" width="157" />

5. In the **Properties** window, navigate to the **SoundId** property and input a valid [audio asset ID](../sound/assets.md).

   <img src="../assets/audio/playing-audio/Sound-Property-SoundId-Generic.png" width="320" />

6. **(Optional)** If you want the audio to start playing when the experience begins, enable the **Playing** property.

#### Point Source

Contrary to volumetric audio, point source audio only emits from a single point source. This type of audio is useful for explosions, impact noises, electronic devices, and dialogue.

<video src="../assets/audio/sound-objects/Sound-Point-Source.mp4" controls width="80%"></video>

To create a `Class.Sound` object for point source audio:

1. In the **Explorer** window, hover over an attachment, truss, wedge, or corner wedge, then click the ⊕ button. A contextual menu displays.
2. From the menu, insert a **Sound**.

   <img src="../assets/audio/sound-objects/Point-Source-Sound.png" width="163" />

3. In the **Properties** window, navigate to the **SoundId** property and input a valid [audio asset ID](../sound/assets.md).
4. **(Optional)** If you want the audio to start playing when the experience begins, enable the **Playing** property.

### Background Audio

Background audio plays at the same volume no matter where the user travels within your experience. This type of audio is useful for music that you want to play for users, especially when you want to create a soundtrack of multiple audio files.

It's best to keep all `Class.Sound` objects for background audio in a single location of the Workspace for organization purposes as you continue to add and edit audio within your experience. The following example stores the new `Class.Sound` object under the `Class.SoundService` container, as this service determines how `Class.Sound` objects play in experiences.

To create a `Class.Sound` object for background audio:

1. In the **Explorer** window, hover over **SoundService**, then click the ⊕ button. A contextual menu displays.
2. From the menu, insert a **Sound**.

   <img src="../assets/audio/sound-objects/Background-Audio-Sound.png" width="320" />

3. In the **Properties** window, navigate to the **SoundId** property and input a valid [audio asset ID](../sound/assets.md).
4. **(Optional)** If you want the audio to start playing when the experience begins, enable the **Playing** property.
5. **(Optional)** If this `Class.Sound` object is the only track you want to play in the place, enable its **Looped** property.

## Customizing Sound Objects

`Class.Sound` object properties work together to influence how users experience your audio, such as:

- How loud they hear specific audio individually and in relation to one another ([Volume](#volume)).
- How they perceive volume when they move away from the audio source ([RollOffMinDistance](#rolloffmindistance-and-rolloffmaxdistance), [RollOffMaxDistance](#rolloffmindistance-and-rolloffmaxdistance), and [RollOffMode](#rolloffmode))
- What part of the audio they can listen to ([TimePosition](#timeposition)).
- How fast and at what pitch they hear it ([PlaybackSpeed](#playbackspeed)).
- If the audio automatically replays upon completion ([Looped](#looped)).

### Volume

The `Class.Sound.Volume|Volume` property allows you to set the volume of your audio anywhere from `0` (silence) to `10` (booming). If you want to change the volume of multiple `Class.Sound` objects at once, parent them under a [sound group](../sound/groups.md).

<Alert severity="warning">
  If your source audio is sufficiently loud, you likely don't need to increase the volume to more than `2`, as this property is multiplicative. For example: a `Class.Sound.Volume|Volume` value of `4` is four times as loud than a `Class.Sound.Volume|Volume` value of `1`, so if your source audio was already loud, the audio might become overwhelming to users.
</Alert>

### RollOffMinDistance and RollOffMaxDistance

`Class.Sound.RollOffMinDistance|RollOffMinDistance` and `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` determine the range of how a user perceives volume from positional audio. For volumetric audio, `Class.Sound.RollOffMinDistance|RollOffMinDistance` is the minimum distance in studs that audio begins to decrease in volume when the client's listener **moves away** from the parent `Class.BasePart`, and `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` property is the maximum distance in studs that a client's listener can hear audio from the surface of the object.

<img src="../assets/audio/sound-objects/Sound-Volumetric-RollOff.jpg" width="800" />

For point source audio, `Class.Sound.RollOffMinDistance|RollOffMinDistance` and `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` work similarly to volumetric audio, but the roll off distance these properties control doesn't surround the object, it only influences the distance outward from the point source.

<img src="../assets/audio/sound-objects/Sound-Point-RollOff.jpg" width="800" />

### RollOffMode

The `Class.Sound.RollOffMode|RollOffMode` property allows you to decide how audio fades as the distance between the user's listener and the `Class.Sound` object's parent increases. You can set this property to one of four values of the `Enum.RollOffMode` enum.

<img src="../assets/audio/sound-objects/RollOffMode-Chart.png" width="80%" />

<table>
<thead>
  <tr>
    <th>RollOffMode</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Inverse` (default)</td>
    <td>Volume initially fades abruptly from `Class.Sound.RollOffMinDistance|RollOffMinDistance`, but volume fading becomes more gradual the closer a user is to reaching the `Class.Sound.RollOffMaxDistance|RollOffMaxDistance`. Once they reach the `Class.Sound.RollOffMaxDistance|RollOffMaxDistance`, the audio falls silent.</td>
  </tr>
  <tr>
    <td>`Linear`</td>
    <td>Volume fades linearly between `Class.Sound.RollOffMinDistance|RollOffMinDistance` and `Class.Sound.RollOffMaxDistance|RollOffMaxDistance`. Once a user reaches the `Class.Sound.RollOffMaxDistance|RollOffMaxDistance`, the audio falls silent.</td>
  </tr>
  <tr>
    <td>`InverseTapered`</td>
    <td>Volume follows the inverse model when close to `Class.Sound.RollOffMinDistance|RollOffMinDistance` and the linear square model when a user is close to `Class.Sound.RollOffMaxDistance|RollOffMaxDistance`. Audio approaches silence at the maximum distance point.</td>
  </tr>
  <tr>
    <td>`LinearSquare`</td>
    <td>Volume fades between `Class.Sound.RollOffMinDistance|RollOffMinDistance` and `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` with a linear squared relationship. Audio approaches silence at the maximum distance point.</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
  For most `Inverse` and `Linear` `Class.Sound.RollOffMode|RollOffMode` types, low `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` values cause audio to abruptly cut off when the listener reaches the `Class.Sound.RollOffMaxDistance|RollOffMaxDistance`. If you want your audio to gradually decrease in volume, set a higher `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` value.
</Alert>

### PlaybackSpeed

The `Class.Sound.PlaybackSpeed|PlaybackSpeed` property allows you to determine the speed your audio plays. For example, if you set the `Class.Sound.PlaybackSpeed|PlaybackSpeed` to a value of **2**, your audio plays twice as fast and one octave higher in pitch. Similarly, if you set it to a value of **0.5**, your audio plays twice as slow and one octave lower in pitch.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../assets/audio/sound-objects/CarHorn_HalfSpeed.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../assets/audio/sound-objects/CarHorn_NormalSpeed.mp3" type="audio/mpeg"></source></audio></td>
    <td><audio controls>
<source src="../assets/audio/sound-objects/CarHorn_DoubleSpeed.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>`Class.Sound.PlaybackSpeed|PlaybackSpeed` = 0.5</td>
    <td>`Class.Sound.PlaybackSpeed|PlaybackSpeed` = 1.0</td>
    <td>`Class.Sound.PlaybackSpeed|PlaybackSpeed` = 2.0</td>
  </tr>
</tbody>
</table>

### TimePosition

The `Class.Sound.TimePosition|TimePosition` property displays, in seconds, what position within the audio sample a user is currently hearing. This property is useful for either only playing a section of the audio sample, or triggering an event to occur once audio reaches a specific position. For example, the following code sample causes a particle emitter to emit a white ring particle above a part within a limited time range of an audio track.

```lua
local RunService = game:GetService("RunService")

-- Create a new part
local part = Instance.new("Part")
part.Anchored = true
part.Color = Color3.new(0.75, 0.2, 0.5)
part.Size = Vector3.new(2, 1, 2)
part.Material = Enum.Material.Neon
part.Position = Vector3.new(0, 4, 0)
part.Parent = workspace

-- Create an attachment on the part
local attachment = Instance.new("Attachment")
attachment.Position = Vector3.new(0, 0.5, 0)
attachment.Parent = part

-- Create a particle emitter on the attachment
local emitter = Instance.new("ParticleEmitter")
emitter.Rate = 5
emitter.Lifetime = NumberRange.new(1.5, 1.5)
emitter.Texture = "rbxassetid://1266170131"
emitter.Speed = NumberRange.new(1, 1)
emitter.Size = NumberSequence.new{NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(1, 6)}
emitter.Transparency = NumberSequence.new{NumberSequenceKeypoint.new(0, 1), NumberSequenceKeypoint.new(0.25, 0), NumberSequenceKeypoint.new(1, 1)}
emitter.Orientation = Enum.ParticleOrientation.VelocityPerpendicular
emitter.Parent = attachment

-- Create a sound on the attachment
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://1835405646"
sound.Parent = attachment

-- Play the sound
sound:Play()

-- Start checking if emitter should be enabled
RunService.Heartbeat:Connect(function()
	-- Enable the emitter within a time range of the audio; otherwise disable it
	if sound.TimePosition >= 5 and sound.TimePosition < 20 then
		emitter.Enabled = true
	else
		emitter.Enabled = false
	end
end)
```

### Looped

The `Class.Sound.Looped|Looped` property allows you to repeat audio after it has finished playing. When set to `true`, the `Class.Sound` object's audio plays again. This is useful to apply to [background audio](#background-audio) to ensure your experience never has abrupt silence.

## Scripting Sound Objects

### Playing Audio Contextually

Aside from auto-playing audio through the `Class.Sound` object's `Class.Sound.Playing|Playing` property, you can play audio contextually from a `Class.LocalScript` by calling `Class.Sound:Play()|Play()` on the corresponding `Class.Sound` object. For example:

```lua
local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://9120386436"
sound.Looped = true
sound.Parent = workspace
sound:Play()
```

Alternatively, if the place will feature multiple tracks, you can play a specific track from a `Class.LocalScript`:

```lua
local SoundService = game:GetService("SoundService")
local musicTrack = SoundService:FindFirstChild("LucidDream")
if musicTrack then
   musicTrack:Play()
end
```

### Playing Interface Audio

You can play interface audio for `Class.GuiObject|GuiObjects`, such as [buttons](../ui/buttons.md) and [labels](../ui/labels.md), by hooking up a `Class.Sound` object to the `Activated` event listener of the `Class.GuiObject`. This lets you provide auditory feedback to users, such as when they hover over a `Class.GuiObject` or select it.

To play a `Class.Sound` object's audio when a user activates a `Class.GuiObject`:

1. In the **Explorer** window, hover over a **GuiObject**, then click the ⊕ button. A contextual menu displays.
2. From the menu, insert a **LocalScript**.
3. Paste the following code into the script, then replace `SOUND_NAME` with the name of your sound object.

```lua
local SoundService = game:GetService("SoundService")
local button = script.Parent
local sound = SoundService:FindFirstChild("SOUND_NAME")
local function onButtonActivated()
   if sound then
      sound:Play()
   end
end
button.Activated:Connect(onButtonActivated)
```
