---
title: Add speech-to-text
description: Explains how to add speech-to-text audio to your experiences.
---

**Speech-to-text** (STT) is a form of technology that automatically generates text from speech sounds. With STT, you can create more immersive worlds by allowing players to talk to NPCs, generate text without the need to pre-record specific audio, improve accessibility for players with motor or vision limitations, and provide players with hands-free controls through voice shortcuts for actions like opening their inventory or casting a spell.

Using the [Gingerbread House - Start](https://www.roblox.com/games/134812596370919/Gingerbread-House-Start) `.rbxl` file as a starting place, this tutorial shows you how to add text generated dynamically from speech to your experience, including guidance on how to implement STT so that the player can interact with objects in your 3D world.

<Alert severity="info">
For more general guidance on adding audio to your experience, see the [Add 2D audio](./add-2D-audio.md) and [Add 3D audio](./add-3D-audio.md) tutorials.
</Alert>

## Audio objects

To create STT audio, it's important to understand the audio objects that you will be working with throughout this tutorial. There are three types of audio objects for STT:

- The `Class.AudioDeviceInput` object is a physical hardware device within the real world, such as a microphone in a laptop, phone, or headset.
- The `Class.AudioSpeechToText` object converts speech sounds into text strings.
- `Class.Wire|Wires` carry audio streams from one object to another.

All of these audio objects work together to generate STT text in response to player actions. For example, if the player is wearing a headset while playing an experience with their laptop:

- The `AudioDeviceInput` captures the player's speech, as spoken into their microphone and as a stream of audio.
- A `Wire` carries the audio stream from the `AudioDeviceInput` to the `AudioSpeechToText`.
- The `AudioSpeechToText` converts the player's speech into text.
- The experience reads this text and performs an action, such as displaying the spoken text on the screen or opening a door at the player's command.

## Enable microphone usage

Before adding STT to an experience, you must first enable microphone usage and publish the experience.

1. Open the [Gingerbread House - Start](https://www.roblox.com/games/134812596370919/Gingerbread-House-Start) file in Studio.
2. Create a local copy.
3. Publish your local copy of the experience.
4. Back in Studio, go to **File** &rang; **Experience Settings** &rang; **Communication**.
5. Turn on **Enable Microphone**.
6. Save your changes.

## Add simple speech capture

To add simple speech capture to your local copy of the [Gingerbread House - Start](https://www.roblox.com/games/134812596370919/Gingerbread-House-Start) file:

1. Enable the use of the latest API for voice.
    1. In the **Explorer** window, select the **VoiceChatService**.
    2. In the **Properties** window, set **UseAudioApi** to **Enabled**.
2. Create the basic audio objects that will let you capture spoken words.
    1. In the **Explorer** window, go to **Workspace** > **DialogueVolume**.
    2. Delete all objects inside the **DialogueVolume** folder.
    3. Insert the following objects into the **DialogueVolume** folder:
        - An **AudioDeviceInput** to capture speech.
        - An **AudioSpeechToText** to convert the speech into text.
        - A **Wire** to carry the stream from the audio device input to the STT instance.
    4. In the **Properties** window of the **AudioSpeechToText** object, set the **Enabled** state to on.
    5. In the **Properties** window of the **Wire** object:
        1. Set **SourceInstance** to your new **AudioDeviceInput** to specify that you want the wire to carry audio from this specific audio instance.
        2. Set **TargetInstance** to your new **AudioSpeechToText** to specify that you want the wire to carry audio to this specific audio instance.
3. Set the **Player** property of the audio device input to the local player at runtime. This tells Roblox which user's microphone to capture audio from.
    1. In the **Explorer** window, go to **StarterPlayer** > **StarterCharacterScripts**.
    2. Insert a `Class.LocalScript` and name it **ListenForMagicWord**.
    3. Paste the following code into the new local script:

      ```lua
        local audioDeviceInput = workspace:WaitForChild('DialogueVolume'):WaitForChild('AudioDeviceInput')

        -- Binds the microphone to the local player
        audioDeviceInput.Player = game.Players.LocalPlayer
      ```

### Test your speech capture

After you add simple speech capture, you can playtest the experience to make sure your STT implementation works properly. Speaking into your microphone should populate the **AudioSpeechToText** property with the text version of your speech.

To test your speech capture:

1. Under **Test** > **Clients and Servers**, select **Team Test**.
2. Click **Start** to start the test server.
3. In the new test server, unmute your microphone and speak a few words.
4. In the **Explorer** window, go to **Workspace** > **DialogueVolume** > **AudioSpeechToText**.
5. In the **Properties** window of **AudioSpeechToText**, confirm that the words you spoke into your microphone have appeared as the value of the **Text** property.

## Use STT with gameplay

To connect STT to gameplay and make the gingerbread house door open when the player says "Open Sesame" into their microphone:

1. Create a remote event to connect the client to the server.
    1. In the **Explorer** window, insert a `Class.RemoteEvent` under **ReplicatedStorage**.
    2. Name it **OpenDoor**.
2. Add a new script to animate the opening of the gingerbread house door.
    1. Under **ServerScriptService**, insert a server-side `Class.Script`.
    2. Name it **DoorService**.
    3. Paste the following code into the new script:

      ```lua
        -- Gets the ReplicatedStorage service for shared storage between server and client
        -- Gets the TweenService for the tweening system
        local ReplicatedStorage = game:GetService("ReplicatedStorage")
        local TweenService = game:GetService("TweenService")

        -- Allows the client to ask the server to open the door
        local remoteEvent = ReplicatedStorage:WaitForChild("OpenDoor")

        -- Function that animates the door to move downward and open
        local function openDoor()
          local doorPart = workspace:WaitForChild("Door")
          local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Linear)
          local tween = TweenService:Create(doorPart, tweenInfo, {Position = doorPart.Position + Vector3.new(0, -15, 0)})
          tween:Play()
        end

        -- Connects the function to the event
        remoteEvent.OnServerEvent:Connect(openDoor)
      ```

3. Connect the door to speech-to-text so that an action happens when the player speaks into their microphone.
    1. Go to **StarterPlayer** > **StarterCharacterScripts**.
    2. Open the **ListenForMagicWord** script you created earlier.
    3. Add the following lines:

      ```lua
        -- Gets the ReplicatedStorage service for shared storage between server and client 
        local ReplicatedStorage = game:GetService("ReplicatedStorage")

        -- Gets the RemoveEvent that the client will fire to the server
        local remoteEvent = ReplicatedStorage:WaitForChild("OpenDoor")

        -- Finds the STT node in the scene graph
        -- The node's Text property updates as it recognizes speech
        local speechToText = workspace:WaitForChild('DialogueVolume'):WaitForChild('AudioSpeechToText')

        -- Function that tells the server to open the door if STT captures the player saying "Open Sesame"
        speechToText:GetPropertyChangedSignal('Text'):Connect(function()
          local text = speechToText.Text

          if text == '' then
            return
          end
          print(text)

          if (text.find(text, 'open sesame') ~= nil)  then
            remoteEvent:FireServer()
          end
        
          speechToText.Text = ''
        end)
      ```

4. Test your STT implementation.
    1. Under **Test** > **Clients and Servers**, select **Team Test**.
    2. Click **Start** to start the test server.
    3. In the new test server, walk up to the door, unmute your microphone, and say "Open Sesame". The door should open and allow you into the gingerbread house.
