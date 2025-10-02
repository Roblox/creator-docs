---
title: Add text-to-speech
description: Explains how to add text-to-speech audio to your experiences.
---

**Text-to-speech** is a form of assistive technology that converts text strings into speech sounds using an artificial voice. In addition to improving the accessibility of your experiences for players with vision, mobility, or cognitive disabilities, TTS allows you to generate speech dynamically so that you don't have to pre-record audio for all possible narrative scenarios.

Using the [Gingerbread House - Start](https://www.roblox.com/games/134812596370919/Gingerbread-House-Start) `.rbxl` file as a starting place and [Gingerbread House - Text-to-Speech](https://www.roblox.com/games/129041658365712/Gingerbread-House-Text-to-Speech) as a reference, this tutorial shows you how to add both basic and context-aware TTS audio to your experiences, including guidance on:

- Triggering TTS for common gameplay scenarios that will never change, such as UI interactions and tutorials.
- Configuring TTS so that it adapts to player actions, environmental status, or flexible objectives.

If at any point you become stuck in the process, you can use **Gingerbread House - Text-to-Speech** as a reference to compare your progress.

## Audio Objects

To create TTS audio, it's important to understand the audio objects that you will be working with throughout this tutorial. There are five main types of audio objects for TTS:

- The `Class.AudioTextToSpeech` object converts text strings into speech sounds.
- The `Class.AudioEmitter` object is a **virtual speaker** that emits audio into the 3D environment.
- The `Class.AudioListener` object is a **virtual microphone** that picks up audio from the 3D environment.
- The `Class.AudioDeviceOutput` object is a **physical hardware device** within the real world, such as a speaker or headphones.
- `Class.Wire|Wires` carry audio streams from one object to another.

All of these audio objects work together to emit TTS sound in response to player actions. Let's take a look at how this works in practice for 3D audio using an example of a player wearing a headset while playing an experience with their laptop:

- The `Class.AudioTextToSpeech` loads and converts text into audio whenever a player touches a part near a non-playable character (NPC).
- The `Class.AudioEmitter` emits a stream of the TTS audio from the NPC into the 3D environment
- A `Class.Wire` carries the stream from the `Class.AudioTextToSpeech` to the `Class.AudioEmitter` so that the stream comes out of the NPC.
- The character's child `Class.AudioListener` object listens to that sound within the 3D environment and feeds it back to their headset.
- The `Class.AudioDeviceOutput` object carries the sound from the `Class.AudioListener` to the player's physical speaker, or in this case, their headphones.

The following sections dive deeper and reference these objects as you learn how to play both basic and context-aware audio. As you review these objects with the upcoming techniques, you can more accurately predict how to capture and feed sound from the experience to the player.

## Basic TTS

Basic TTS is the most common form of text-to-speech in which the artificial voice reads a text string regardless of player or environment context. This means that whenever the player triggers the TTS audio, the words and the way that the artificial voice reads the words remains consistent no matter the state of the player, their actions, or environmental status.

This form of TTS is useful in most gameplay scenarios, such as players interacting with UI menus, tutorials, or routine NPC interactions like vendor offerings or enemy barks. Roblox supplies the following types of voices that you can experiment with for any of these interactions:

   <table>
   <thead>
   <tr>
   <th>VoiceID</th>
   <th>Voice Description</th>
   <th>Audio Example</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>1</td>
   <td>British male</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/British-Male-Voice.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>2</td>
   <td>British female</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/British-Female-Voice.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>3</td>
   <td>United States male #1</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/US-Male-Voice-1.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>4</td>
   <td>United States female #1</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/US-Female-Voice-1.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>5</td>
   <td>United States male #2</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/US-Male-Voice-2.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>6</td>
   <td>United States female #2</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/US-Female-Voice-2.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>7</td>
   <td>Australian male</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/Australian-Male-Voice.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>8</td>
   <td>Australian female</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/Australian-Female-Voice.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>9</td>
   <td>Retro voice #1</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/Retro-Voice-1.wav" type="audio/mpeg"></source></audio></td>
   </tr>
   <tr>
   <td>10</td>
   <td>Retro voice #2</td>
   <td><audio controls><source src="../../../assets/audio/audio-objects/Retro-Voice-2.wav" type="audio/mpeg"></source></audio></td>
   </tr>  
   </tbody>
   </table>

To recreate the basic 3D TTS audio in the sample [Gingerbread House - Text-to-Speech](https://www.roblox.com/games/129041658365712/Gingerbread-House-Text-to-Speech) place file:

1. Enable a default listener that's attached to your player character.
   1. In the **Explorer** window, select the **SoundService**.
   1. In the **Properties** window, set **DefaultListenerLocation** to **Character**. When you run the experience, the engine automatically:
      - Creates a `Class.AudioListener` under each player character's `Class.Humanoid.RootPart` so that you can hear sounds shift in your real-world speakers according to the position and scale of sound sources within the experience.
      - Creates an `Class.AudioDeviceOutput` under **SoundService**.
1. In the **Explorer** window, navigate to **Workspace** ⟩ **DialogueVolume**, then:
   1. Insert an **AudioTextToSpeech** object to create an audio speech generator for the volume around the snowman.
   1. Insert an **AudioEmitter** object to emit a positional stream from **DialogueVolume**.
   1. Insert a **Wire** object to carry the stream from the audio speech generator to the audio emitter.
1. Select the **AudioTextToSpeech** object, then in the **Properties** window:
   1. Set **Text** to "Collect every single last gumpdrop to open my home!"
   1. Set **VoiceId** to `2` to set the artificial voice to emulate a British female.
   1. Set the **Volume** to `3` to play the audio at a high volume so you hear the TTS sound over other audio sources within the experience.
1. Select the **Wire**, then in the **Properties** window:
   1. Set **SourceInstance** to your new **AudioTextToSpeech** to specify that you want the wire to carry audio from this specific audio speech generator.
   1. Set **TargetInstance** to your new **AudioEmitter** to specify that you want the wire to carry audio to this specific audio emitter within the volume.
1. Back in the **Explorer** window, navigate to **StarterPlayer** ⟩ **StarterCharacterScripts**, then insert a **LocalScript**, rename it **PlayBasicTTSAudioWhenInVolume**, and paste the following code into the local script:

  ``` lua
  local Workspace = game:GetService("Workspace")
  local Players = game:GetService("Players")

  local humanoid = script.Parent:WaitForChild("Humanoid")
  local volumeDetector = Workspace.DialogueVolume
  local trigger = humanoid:WaitForChild("Animator")
  local debounce = false
  local localPlayer = Players.LocalPlayer

  volumeDetector.Touched:Connect(function(hit)
    if debounce then 
      return
    end

  local hitCharacter = hit:FindFirstAncestorWhichIsA("Model")
  local hitPlayer = Players:GetPlayerFromCharacter(hitCharacter)
	
    if hitPlayer ~= localPlayer then
      return
    end

    debounce = true
	
    local audioTextToSpeech = Workspace.DialogueVolume.AudioTextToSpeech
    audioTextToSpeech:Play()
    audioTextToSpeech.Ended:Wait()

    debounce = false
  end)
  ```

  <BaseAccordion>
  <AccordionSummary>
    <Typography variant="h4">Code explanation</Typography>
  </AccordionSummary>
  <AccordionDetails>
    This script starts by getting the `Class.Workspace` and `Class.Players` services so it can reference their children and functionality. For each player character that loads or respawns back into the experience, the script waits for:

    - The character's `Class.Humanoid` and `Class.Animator` objects.
    - The volume object in the workspace named **DialogueVolume**.

    When anything collides with the volume, the `Touched` event handler function gets the first ancestor that's a `Class.Model`, which should be the character if the `Class.BasePart` that collided with the volume is a descendant of a character model. If it is, the function then:

    - Sets debounce to `true`.
    - Plays and waits for the TTS audio to end.
    - Sets debounce back to `false`.

    Setting debounce from `false` to `true` to `false` again after the basic TTS audio finishes playing is a debounce pattern that prevents the audio from repeatedly triggering as players continuously collide with the volume. For more information on this debounce pattern, see [Debounce - Detect collisions](../../../scripting/debounce.md#detect-collisions).

  </AccordionDetails>
  </BaseAccordion>

1. Playtest the experience to hear the instructional character dialogue when your player character touches the volume around the snowman.

   <video controls src="../../../assets/tutorials/add-text-to-speech/basicTTS-final.mp4" width="80%"></video>

You can further experiment with this audio by modifying the `Class.AudioTextToSpeech.Text|Text`, `Class.AudioTextToSpeech.VoiceID|VoiceID`, `Class.AudioTextToSpeech.Pitch|Pitch`, and `Class.AudioTextToSpeech.Speed|Speed` properties to new values. The generated speech becomes entirely different without the need to record and upload a new audio file for each scenario.

<table>
<tbody>
  <tr>
    <td><audio controls>
<source src="../../../assets/tutorials/add-text-to-speech/basicTTS-exp1.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../../../assets/tutorials/add-text-to-speech/basicTTS-exp2.mp3" type="audio/mpeg"></source>
</audio></td>
    <td><audio controls>
<source src="../../../assets/tutorials/add-text-to-speech/basicTTS-exp3.mp3" type="audio/mpeg"></source>
</audio></td>
  </tr>
  <tr>
    <td>
    - `Class.AudioTextToSpeech.VoiceID|VoiceID` = 2
    - `Class.AudioTextToSpeech.Pitch|Pitch` = -12
    - `Class.AudioTextToSpeech.Speed|Speed` = 2
    </td>
    <td>
    - `Class.AudioTextToSpeech.VoiceID|VoiceID` = 7
    - `Class.AudioTextToSpeech.Pitch|Pitch` = 7
    - `Class.AudioTextToSpeech.Speed|Speed` = 0.8
    </td>
    <td>
    - `Class.AudioTextToSpeech.VoiceID|VoiceID` = 9
    - `Class.AudioTextToSpeech.Pitch|Pitch` = 12
    - `Class.AudioTextToSpeech.Speed|Speed` = 1.2
    </td>
  </tr>
</tbody>
</table>

## Context-aware TTS

Context-aware TTS is a more advanced form of text-to-speech in which the artificial voice reads a text string in relation to the player, the state of their environment, or gameplay status. This means that whenever the player triggers the TTS audio, the words and the way the artificial voice reads the words adapts accordingly.

This form of TTS is useful for gameplay scenarios that are ever-changing, such as directional audio cues, objective status, or unique NPC interactions. Consequently, because context-aware TTS needs to transform to be accurate, you must configure gameplay elements so that you can track their status as players navigate through the environment and complete gameplay objectives.

While there are many ways to accomplish this task, the sample uses custom attributes to track the **color** and **location** of each gumdrop that the player must collect in order to enter the gingerbread house. For more information on attributes, see [Properties and attributes](../../../scripting/attributes.md).

<br></br>

<div><b>Each gumdrop object has attributes that describe their color and location in the environment.</b></div>
<GridContainer numColumns="3">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/add-text-to-speech/YellowGumdrop.png" alt="A close up view of the yellow gumdrop" />
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/add-text-to-speech/GreenGumdrop.png" alt="A close up view of the green gumdrop" />
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/add-text-to-speech/RedGumdrop.png" alt="A close up view of the red gumdrop" />
  </figure>
</GridContainer>

To recreate the context-aware 3D TTS audio in the sample [Gingerbread House - Text-to-Speech](https://www.roblox.com/games/129041658365712/Gingerbread-House-Text-to-Speech) place file:

1. In the **Explorer** window, navigate to **Workspace** ⟩ **GumDrops**.
1. Configure three custom attributes to track the yellow gumdrop.
   1. Select the yellow gumdrop, then in the **Properties** window, navigate to the **Attributes** section, then click the plus icon. A pop-up dialog displays.
   1. In the **Name** field, input **ColorDescription**.
   1. In the **Type** dropdown menu, select **string**.
   1. Click the **Save** button.
   1. Set the new **ColorDescription** attribute to **yellow**.
   1. Using this process, create two more attributes using the following values.

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Type</th>
   <th>Value</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>HintOrder</td>
   <td>number</td>
   <td>`0`</td>
   </tr>
   <tr>
   <td>LocationDescription</td>
   <td>string</td>
   <td>by the waterfall</td>
   </tr>
   </tbody>
   </table>

1. Configure three custom attributes to track the green gumdrop.
   1. In the **Explorer** window, select the green gumdrop.
   1. In the **Properties** window, create three attributes using the following values.

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Type</th>
   <th>Value</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>ColorDescription</td>
   <td>string</td>
   <td>green</td>
   </tr>
   <tr>
   <td>HintOrder</td>
   <td>number</td>
   <td>`1`</td>
   </tr>
   <tr>
   <td>LocationDescription</td>
   <td>string</td>
   <td>on the ledge</td>
   </tr>
   </tbody>
   </table>

1. Configure three custom attributes to track the red gumdrop.
   1. In the **Explorer** window, select the red gumdrop.
   1. In the **Properties** window, create three attributes using the following values.

   <table>
   <thead>
   <tr>
   <th>Name</th>
   <th>Type</th>
   <th>Value</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>ColorDescription</td>
   <td>string</td>
   <td>red</td>
   </tr>
   <tr>
   <td>HintOrder</td>
   <td>number</td>
   <td>`2`</td>
   </tr>
   <tr>
   <td>LocationDescription</td>
   <td>string</td>
   <td>behind the fence</td>
   </tr>
   </tbody>
   </table>

1. In the **Explorer** window, navigate to **Workspace** ⟩ **HintVolume**, then:
   1. Insert an **AudioTextToSpeech** object to create an audio speech generator for the volume around the reindeer.
   1. Insert an **AudioEmitter** object to emit a positional stream from **HintVolume**.
   1. Insert a **Wire** object to carry the stream from the audio speech generator to the audio emitter.
1. Select the **Wire**, then in the **Properties** window:
   1. Set **SourceInstance** to your new **AudioTextToSpeech** to specify that you want the wire to carry audio from this specific audio speech generator.
   1. Set **TargetInstance** to your new **AudioEmitter** to specify that you want the wire to carry audio to this specific audio emitter within the volume.
1. Back in the **Explorer** window, navigate to **StarterPlayer** ⟩ **StarterCharacterScripts**, then insert a **LocalScript**, rename it **PlayContextTTSAudioWhenInVolume**, and paste the following code into the local script:

  ``` lua
  local Workspace = game:GetService("Workspace")
  local Players = game:GetService("Players")

  local humanoid = script.Parent:WaitForChild("Humanoid")
  local volumeDetector = Workspace.HintVolume
  local trigger = humanoid:WaitForChild("Animator")
  local debounce = false
  local localPlayer = Players.LocalPlayer

  function getRemainingGumdrops(): {Part}
    local gumdropsFolder = Workspace.Gumdrops
    local gumdrops = gumdropsFolder:GetChildren()
    local remainingGumdrops = {};
    for _, gumdrop in gumdrops do
      if gumdrop:GetAttribute("Active") then
        remainingGumdrops[#remainingGumdrops + 1] = gumdrop
      end
    end
    table.sort(remainingGumdrops, function(a, b)
      return a:GetAttribute("HintOrder") < b:GetAttribute("HintOrder")
    end)
    return remainingGumdrops
  end

  function getReindeerHint(remainingGumdrops: {Part}): string
    local remainingGumdrops = getRemainingGumdrops()
    if (#remainingGumdrops == 0) then
      return "There are no gumdrops left. Check inside the house."
    end
    local nextGumdrop = remainingGumdrops[1]
    local colorDescription = nextGumdrop:GetAttribute("ColorDescription")
    local locationDescription = nextGumdrop:GetAttribute("LocationDescription")
    local message = #remainingGumdrops > 1
      and  "There are " .. #remainingGumdrops .. " gumdrops left. Look for the " .. colorDescription  .. " one " .. locationDescription  .. "."
      or "There is one gumdrop left. It's " .. colorDescription .. " and it's " .. locationDescription .. "."
    return message
  end

  volumeDetector.Touched:Connect(function(hit)
    if debounce then 
      return
    end

    local hitCharacter = hit:FindFirstAncestorWhichIsA("Model")
    local hitPlayer = Players:GetPlayerFromCharacter(hitCharacter)
	
    if hitPlayer ~= localPlayer then
      return
    end

	  print("Player touched volume.")
	  debounce = true

	  local remainingGumdrops = getRemainingGumdrops()
	  local message = getReindeerHint(remainingGumdrops)

	  local audioTextToSpeech = Workspace.HintVolume.AudioTextToSpeech
	  audioTextToSpeech.Text = message
	  audioTextToSpeech:Play()
	  audioTextToSpeech.Ended:Wait()

	  debounce = false
  end)
  ```

  <BaseAccordion>
  <AccordionSummary>
    <Typography variant="h4">Code explanation</Typography>
  </AccordionSummary>
  <AccordionDetails>
    This script starts by getting the `Class.Workspace` and `Class.Players` services so it can reference their children and functionality. For each player character that loads or respawns back into the experience, the script waits for:

    - The character's `Class.Humanoid` and `Class.Animator` objects.
    - The volume object in the workspace named **HintVolume**.

    The script's `getRemainingGumdrops()` function returns a list of gumdrop `Class.Part` objects within the **Gumdrops** folder and filters out any part that the player has collected. The remaining gumdrops are sorted in a specific order according to each gumdrop's `HintOrder` attribute.

    The script's `getReindeerHint(remainingGumdrops)` function takes that list `from getRemainingGumdrops()` and returns a string message that describes where the player can find any remaining gumdrops, including both the color and location description of the next gumdrop the player needs to collect. However, if the player has collected all gumdrops in the environment, the string message describes where to go next after they have collected all gumdrops in the environment.

    When anything collides with the volume, the `Touched` event handler function gets the first ancestor that's a `Class.Model`, which should be the character if the `Class.BasePart` that collided with the volume is a descendant of a character model. If it is, the function then:

    - Sets debounce to `true`.
    - Gets the list of remaining gumdrops and the string message describing the next gumdrop the player needs to find.
    - Converts the string into audio using the `Class.AudioTextToSpeech` object, plays the audio, and waits for the audio to end.
    - Sets debounce back to `false`.

    Setting debounce from `false` to `true` to `false` again after the context-aware TTS audio finishes playing is a debounce pattern that prevents the audio from repeatedly triggering as players continuously collide with the volume. For more information on this debounce pattern, see [Debounce - Detect collisions](../../../scripting/debounce.md#detect-collisions).

  </AccordionDetails>
  </BaseAccordion>

1. Playtest the experiences to hear contextual hints when your player character touches the volume around the reindeer. The TTS audio changes according to the number and color of gumdrops the player character has already found in the environment.

   <video controls src="../../../assets/tutorials/add-text-to-speech/ContextTTS-final.mp4" width="80%"></video>
