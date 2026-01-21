---
title: Add 2D audio
description: Explains how to add non-directional audio to your experiences.
---

**2D audio** is non-directional sound that doesn't emit from any particular location, remaining the same regardless of a listener's position or orientation in the 3D space. This means that as players move their listeners around the environment, they can consistently hear 2D audio from anywhere they turn.

Using the [Gingerbread House - Start](https://www.roblox.com/games/134812596370919/Gingerbread-House-Start) `.rbxl` file as a starting place and [Gingerbread House - Complete Audio](https://www.roblox.com/games/94670255584609/Gingerbread-House-Complete-Audio) as a reference, this tutorial shows you how to add both looping and one shot 2D audio to your experiences, including guidance on:

- Looping background music that plays as soon as players connect to the server.
- Triggering audio to provide players instantaneous feedback according to their gameplay objectives.
- Activating various sounds to indicate different user interface interactions.

If at any point you become stuck in the process, you can use **Gingerbread House - Complete Audio** as a reference to compare your progress.

<Alert severity="info">
If you want to add positional audio to your experience, such as ambient noise within the environment, object interaction sounds, or non-playable character dialogue, see [Add 3D audio](add-3D-audio.md).
</Alert>

## 2D audio objects

To create non-directional audio, it's important to understand the audio objects that you will be working with throughout this tutorial. There are three main types of audio objects for 2D audio:

- The `Class.AudioPlayer` object loads and plays the **audio file**.
- The `Class.AudioDeviceOutput` object is a **physical hardware device** within the real world, such as a speaker or headphones.
- `Class.Wire|Wires` carry audio streams from one object to another.

All of these audio objects work together to carry sound from file playback to each player's hardware. Let's take a look at how this works in practice using an example of a player wearing a headset while playing an experience with their laptop:

- The `Class.AudioPlayer` loads the `127645268874265` audio asset ID into the experience for a currency purchase sound.
- A `Class.Wire` carries the stream from the `Class.AudioPlayer` to the `Class.AudioDeviceOutput` so that the stream comes out of the player's headset.
- The `Class.AudioDeviceOutput` object carries the sound to the player's physical speaker, or in this case, their headphones.

The following sections dive deeper and reference these objects as you learn how to play both looping and one shot 2D audio. As you review these objects with the upcoming techniques, you can more accurately predict how to capture and feed sound from the experience to the player.

## Looping audio

**Looping 2D audio**, or non-directional audio that repeats seamlessly as soon as players connect to the server, is a common sound design technique to provide a cohesive auditory backdrop regardless of what players are doing or where they're located within the 3D space. In addition, looping 2D audio ensures that your experience is never completely silent, which can disorient and distract players from their objectives.

To demonstrate this concept, review how the following 2D audio significantly enhances the quality of the [Hazardous Space Station](https://www.roblox.com/games/99416825187098/Hazardous-Space-Station) sample. Without background music, the space station feels hollow and lifeless. However, when the space station includes background music, the space station feels both ominous and dangerous, adding to the overall spooky atmosphere.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../../assets/tutorials/add-2D-audio/Without-Looping.mp4" width="100%"></video>
    <figcaption>Without looping 2D audio</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/add-2D-audio/With-Looping.mp4" width="100%"></video>
    <figcaption>With looping 2D audio</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
To create a seamless loop, you must match the end and start points of your audio track precisely so that players cannot detect its repetition. This process requires third-party audio editing software like [Reaper](https://www.reaper.fm/) or [Audacity](https://www.audacityteam.org/) so that you can find a zero crossing and make a carefully timed cut. For step-by-step instruction on these methods, see [Creating Perfect Audio Loops](https://devforum.roblox.com/t/creating-perfect-audio-loops/2849057).
</Alert>

Looping audio is particularly useful for establishing how you want players to feel as soon as they join your experience. For example, the sample aims to provide players a cheerful adventure in a winter wonderland, so it uses an upbeat audio track to positively influence their mood the moment they enter the environment. To see how influential this technique can be, consider how the player's experience would change if you were to swap the looping audio out for a metal track.

<video controls src="../../../assets/tutorials/add-2D-audio/Metal-Track.mp4" width="80%"></video>

To recreate the looping 2D audio in the sample [Gingerbread House - Complete Audio](https://www.roblox.com/games/94670255584609/Gingerbread-House-Complete-Audio) place file:

1. Enable a default listener that's attached to your player character.
   1. In the **Explorer** window, select the **SoundService**.
   1. In the **Properties** window, set **DefaultListenerLocation** to **Character**. When you run the experience, the engine automatically creates an `Class.AudioDeviceOutput` under **SoundService**.
1. In the **Explorer** window, navigate to **SoundService**, then:
   1. Insert an **AudioPlayer** object to create an audio source.
   1. Insert an **AudioDeviceOutput** object to create a speaker that plays throughout the experience.
   1. Insert a **Wire** object to carry the stream from the audio player to the speaker.

   <img src="../../../assets/tutorials/add-2D-audio/Looping-DataModel.png" width="30%" />

1. Select the **AudioPlayer**, then in the **Properties** window,
   1. Set **AssetID** to `rbxassetid://1841461968` to play an upbeat audio track.
   1. Enable **Looping** so that the audio repeats seemlessly.
   1. Set **Volume** to `0.2` to play the audio at a low volume so you can still hear the other audio sources within the experience.
1. Select the **Wire**, then in the **Properties** window,
   1. Set **SourceInstance** to your new **AudioPlayer** to specify that you want the wire to carry audio from this specific audio player.
   1. Set **TargetInstance** to your new **AudioDeviceOutput** to specify that you want the wire to carry audio to this specific speaker.
1. Back in the **Explorer** window, insert a **Script** into **AudioPlayer**, rename it **LoopBackgroundMusic**, set its **RunContext** property to **Client**, then paste the following code into the script:

   ``` lua
   local audioPlayer = script.Parent
   audioPlayer:Play()
   ```

   <BaseAccordion>
   <AccordionSummary>
     <Typography variant="h4">Code explanation</Typography>
   </AccordionSummary>
   <AccordionDetails>
      The script starts by declaring a variable to represent the script's parent `Class.AudioPlayer`. The script then sets the audio source to play from the moment the player joins the experience to the moment they exit the experience.
   </AccordionDetails>
   </BaseAccordion>

1. Playtest the experience to hear the looping background music.

   <video controls src="../../../assets/tutorials/add-2D-audio/Looping-Final.mp4" width="80%"></video>

## One shot audio

**One shot 2D audio**, or non-directional audio that plays once at a specific time and position unless a player triggers it again, provides players important context about anything you don't want them to miss. Using this type of auditory feedback in your experiences is essential because it provides an instant, clear response to crucial gameplay functions and player actions, such as starting a boss fight or losing a significant amount of health.

The following sections provide implementation details for common gameplay scenarios in which players need timely, non-directional feedback, including gameplay feedback, UI element interactions, and voiceover narration for tutorials.

### Gameplay feedback

As players progress through your experience, it's important that they receive immediate auditory feedback about the status of anything that impacts their gameplay, such as their score, health, or level progress. Because this type of audio directly connects to player objectives, it's important that these sounds are clear, audible, and convey useful and accurate information.

To demonstrate this concept, let's review the following one shot 2D audio from the [Platformer](../../../resources/templates.md#platformer) template that plays as players jump and collect coins:

- An airy whoosh sound plays as soon as the player presses the jump key on their device.
- A high-pitched ding and coins jostling sound play as soon as the player's character touches a coin.

Both of these sounds are instantly recognizable within the context of the 3D space, and they help players understand the success of their actions without relying solely on visual cues.

<video controls src="../../../assets/tutorials/add-2D-audio/game-state-example.mp4" width="80%"></video>

When you play multiple sounds at once, certain sounds may be more important for players to hear than others. In this instance, the coin collection sound is conveying more valuable gameplay information than the jump sound, so the experience plays it at a slightly higher volume. There are no standards or rules to achieve a great mix however, so tune the sounds in your experience to reflect what you feel is most important.

For example, the sample includes various audio triggers throughout the experience, but they aren't all at the same level of importance for understanding the experience's main objective: collect gumdrops to open the gingerbread house. To ensure that players are aware of what they need to do, the sample triples the amplitude of the auditory feedback whenever the player collects a gumdrop.

To recreate the one shot state feedback audio in the sample [Gingerbread House - Complete Audio](https://www.roblox.com/games/94670255584609/Gingerbread-House-Complete-Audio) place file:

1. In the **Explorer** window, navigate to **Workspace** ⟩ **Gumdrops** ⟩ **Gumdrop**, then:
   1. Insert an **AudioPlayer** object to create an audio source.
   1. Insert an **AudioDeviceOutput** object to create a speaker that plays throughout the experience.
   1. Insert a **Wire** object to carry the stream from the audio player to the speaker.

   <img src="../../../assets/tutorials/add-2D-audio/Feedback-DataModel.jpg" width="30%" />

1. Select the **AudioPlayer**, then in the **Properties** window,
   1. Set **AssetID** to `rbxassetid://9113723699` to play a gentle chomping audio track.
   1. Set **TimePosition** to `0.15` to start the audio track closer to the actual chomping sound.
   1. Set **Volume** to `3` to play the audio at a high volume so you hear the gumdrop sound over other audio sources within the experience.
1. Select the **Wire**, then in the **Properties** window,
   1. Set **SourceInstance** to your new **AudioPlayer** to specify that you want the wire to carry audio from this specific audio player.
   1. Set **TargetInstance** to your new **AudioDeviceOutput** to specify that you want the wire to carry audio to this specific speaker.
1. Duplicate **Gumdrop** until you have three gumdrops, then scatter them around the environment.
1. Back in the **Explorer** window, navigate to **ServerScriptService**, then insert a **Script**, rename it **GumdropService**, set its **RunContext** property to **Server**, then paste the following code into the script:

   ``` lua
   -- Initializing services
   local Workspace = game:GetService("Workspace")
   local Players = game:GetService("Players")
   local ServerStorage = game:GetService("ServerStorage")
   local TweenService = game:GetService("TweenService")

   -- Modules
   local Leaderboard = require(ServerStorage.Leaderboard)
   local PlayerData = require(ServerStorage.PlayerData)

   -- Variables
   local gumdropsFolder = Workspace.Gumdrops
   local gumdrops = gumdropsFolder:GetChildren()

   local GUMDROP_KEY_NAME = PlayerData.GUMDROP_KEY_NAME
   local GUMDROP_AMOUNT_TO_ADD = 1

   local function updatePlayerGumdrops(player, updateFunction)
      -- Update the gumdrop table
      local newGumdropAmount = PlayerData.updateValue(player, GUMDROP_KEY_NAME, updateFunction)

      -- Update the gumdrop leaderboard
      Leaderboard.setStat(player, GUMDROP_KEY_NAME, newGumdropAmount)
	
      -- Check if the player has collected three gumdrops
      if newGumdropAmount >= 3 then
         -- Play the door event audio when the player collects three gumdrops
         local audioPlayer = Workspace.Door.AudioPlayer
         audioPlayer:Play()
		
         -- Animate the door to move downward
         local doorPart = Workspace.Door
         local tweenInfo = TweenInfo.new(2, Enum.EasingStyle.Linear)
         local tween = TweenService:Create(doorPart, tweenInfo, {Position = doorPart.Position + Vector3.new(0, -15, 0)})
         tween:Play()
      end
   end

   -- Defining the event handler
   local function onGumdropTouched(otherPart, gumdrop)
      if gumdrop:GetAttribute("Active") then
         local character = otherPart.Parent
         local player = Players:GetPlayerFromCharacter(character)
         if player then
            -- Player touched a gumdrop
            local audioPlayer = gumdrop.AudioPlayer
            audioPlayer:Play()
			
            gumdrop.Transparency = 1
            gumdrop:SetAttribute("Active", false)
            updatePlayerGumdrops(player, function(oldGumdropAmount)
            oldGumdropAmount = oldGumdropAmount or 0
            return oldGumdropAmount + GUMDROP_AMOUNT_TO_ADD
            end)
         end
      end
   end

   -- Setting up event listeners
   for _, gumdrop in gumdrops do
      gumdrop:SetAttribute("Active", true)
      gumdrop.Touched:Connect(function(otherPart)
      onGumdropTouched(otherPart, gumdrop)
      end)
   end
   ```

   <BaseAccordion>
   <AccordionSummary>
     <Typography variant="h4">Code explanation</Typography>
   </AccordionSummary>
   <AccordionDetails>
      <Alert severity="info">
      This script handles additional functionality outside of triggering the non-positional audio, such as updating the leaderboard every time a player collects a gumdrop and triggering a positional sound and animation for the gingerbread house's door when a player collects all three gumdrops. This is important for the gameplay of the sample, but it isn't important for understanding how to implement 2D audio, so this explanation will keep those sections at a high level.
      </Alert>

      This script starts by initializing the `Class.Workspace`, `Class.Players`, `Class.ServerStorage`, `and Class.TweenService` services so it can reference their children and functionality. Then, it requires the **Leaderboard** and **PlayerData** modules in `Class.ServerStorage`; these modules are responsible for creating and updating a leaderboard in the upper-right corner of the screen that tracks the amount of gumballs a player collects in the environment.

      The script's `updatePlayerGumdrops` function is largely in charge of both updating the leaderboard each time a player collects a gumdrop, and waiting for the moment that they collect all three gumdrops so that it can trigger a positional sound and animation for the gingerbread house's door. For more information on this part of the script, see [Add 3D audio - Event feedback](add-3D-audio.md#event-feedback).

      The script's `onGumdropTouched` function is where the bulk of the work occurs for triggering 2D audio for gameplay feedback, and it takes two arguments:

      - `otherPart` - A part that collides with the gumdrop.
      - `gumdrop` - A spherical part that represents a gumdrop.

      When anything collides with the gumdrop part, the script checks first to see if the gumdrop is active. If so, it checks to verify that the colliding object is a player. If so, the script then:

      - Plays the 2D audio track from the audio player.
      - Turns the gumdrop invisible.
      - Deactivates the gumdrop so that players cannot interact with the invisible gumdrop.
      - Updates the leaderboard for the player that touched the gumdrop.

      Finally, the script sets up event listeners so that for each gumdrop, it connects a function to the `Class.BasePart.Touched|Touched` event, which calls the `onGumdropTouched` function when a player touches the gumdrop.
   </AccordionDetails>
   </BaseAccordion>

1. Playtest the experience to hear the chomping sound after you collect a gumdrop.

   <video controls src="../../../assets/tutorials/add-2D-audio/Feedback-Final.mp4" width="80%"></video>

### UI interaction

When players interact with your user interface (UI) elements, such as hovering over a checkbox or selecting a purchase button, it's important to provide instant feedback so that they intuitively understand **how** they're interacting with your UI. For example, many designers change the visual characteristics of UI when players enable or disable settings to communicate the status of the setting.

However, for players with visual impairments in which color changes or animations are more difficult to decipher on their own, it's useful to provide multiple forms of sensory feedback for your UI interactions so that they remain accessible and intuitive for as many players as possible. To expand on this concept, let's consider the following UI states that are important for the [UGC Homestore](../../../resources/templates.md#ugc-homestore) template's purchase buttons:

- **In focus** - Indicates that the player is highlighting a UI element in preparation to select it.
- **On hover** - Indicates that the player is hovering over a UI element with their cursor.
- **Selected** - Indicates that the player has selected a UI element through their input.

All three of these interactions are essential for the template's main user flow of players browsing, selecting, and purchasing avatar clothing and accessories, so it's of the utmost importance that no one is confused about how to interact with the UI. To set players up for success, the template provides both visual and auditory feedback for each UI interaction.

<div><b>Visual Feedback</b></div>
<GridContainer numColumns="4">
  <figure>
    <img src="../../../assets/tutorials/add-2D-audio/Default.jpg" width="70%" />
    <figcaption>Default view</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/add-2D-audio/In-Focus-State.jpg" width="70%" />
    <figcaption>In focus state</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/add-2D-audio/On-Hover-State.jpg" width="70%" />
    <figcaption>On hover state</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/add-2D-audio/Selected-State.jpg" width="70%" />
    <figcaption>Selected state</figcaption>
  </figure>
</GridContainer>

To give an example of how you can configure multiple forms of sensory feedback, the sample provides both visual and auditory feedback whenever players press the on-screen peppermint button. When players aren't interacting with the button, it appears like a typical peppermint candy, but when they press the button, the sample:

- Plays a delightful jingle audio track.
- Tints the button with a teal hue.
- Moves the button slightly downward on the screen.

From here, you can connect this interaction to all sorts of useful gameplay actions, such as opening a menu or purchasing an item.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/add-2D-audio/Button-Default.jpg" width="50%" />
    <figcaption>Default view</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/add-2D-audio/Button-Pressed.jpg" width="50%" />
    <figcaption>Pressed state</figcaption>
  </figure>
</GridContainer>

To recreate the one shot UI interaction audio in the sample [Gingerbread House - Complete Audio](https://www.roblox.com/games/94670255584609/Gingerbread-House-Complete-Audio) place file:

1. In the **Explorer** window, navigate to **StarterGui** ⟩ **2DAudioButton**, then:
   1. Insert an **AudioPlayer** object to create an audio source.
   1. Insert an **AudioDeviceOutput** object to create a speaker that plays throughout the experience.
   1. Insert a **Wire** object to carry the stream from the audio player to the speaker.

   <img src="../../../assets/tutorials/add-2D-audio/UI-DataModel.png" width="30%" />

1. Select the **AudioPlayer**, then in the **Properties** window, set **AssetID** to `rbxassetid://3422389728` to play a retro jingle audio track.
1. Select the **Wire**, then in the **Properties** window,
   1. Set **SourceInstance** to your new **AudioPlayer** to specify that you want the wire to carry audio from this specific audio player.
   1. Set **TargetInstance** to your new **AudioDeviceOutput** to specify that you want the wire to carry audio to this specific speaker.
1. Back in the **Explorer** window, insert a **LocalScript** into **2DAudioButton**, rename it **PlayAudioWhenPressed**, then paste the following code into the script:

   ``` lua
   local TweenService = game:GetService("TweenService")

   local buttonGui = script.Parent
   local buttonImageButton = buttonGui.ButtonFrame.ButtonImageButton
   local buttonAudioPlayer = buttonGui.AudioPlayer

   local tweenInfo = TweenInfo.new(.2, Enum.EasingStyle.Exponential)

   local buttonTweenByIsPressed = {
      -- Pressed
      [true] = TweenService:Create(buttonImageButton, tweenInfo, {
         Position = buttonImageButton.Position + UDim2.fromScale(0, .1),
         ImageColor3 = Color3.fromRGB(117, 255, 255),
      }),

      -- Default
      [false] = TweenService:Create(buttonImageButton, tweenInfo, {
         Position = buttonImageButton.Position,
         ImageColor3 = Color3.fromRGB(255, 255, 255),
      }),
   }

   local function onIsPlayingChanged()
      local isPlaying = buttonAudioPlayer.IsPlaying
      local tween = buttonTweenByIsPressed[isPlaying]
      tween:Play()
   end
      
   onIsPlayingChanged()
   buttonAudioPlayer:GetPropertyChangedSignal("IsPlaying"):Connect(onIsPlayingChanged)
   buttonAudioPlayer.Ended:Connect(onIsPlayingChanged)

   buttonImageButton.Activated:Connect(function(_hit)
      buttonAudioPlayer:Play()
   end)
   ```

   <BaseAccordion>
   <AccordionSummary>
     <Typography variant="h4">Code explanation</Typography>
   </AccordionSummary>
   <AccordionDetails>
      <Alert severity="info">
      This script handles additional functionality outside of just playing 2D audio for UI interactions, such as tweening the button's color and position. This is important for providing multiple sources of sensory feedback, but the design requirements for your use case may only require auditory feedback. If you just want to play audio when players touch UI elements, you can remove the tween functionality.
      </Alert>

      The script starts by getting:

      - The `Class.TweenService` so it can animate UI elements.
      - The script's parent **2DAudioButton** `Class.ScreenGui` object.
      - The peppermint candy `Class.ImageButton`.
      - The relevant audio player with your jingle audio track.

      The script then defines:

      - A `TweenInfo` object that specifies that the button's animation will play with an exponential animation style.
      - Two tweens that represent the button's pressed or unpressed state.
         - The `true` pressed state moves the button slightly downward on the screen and tints it with a teal hue.
         - The `false` unpressed state moves the button back to its original position on the screen and removes the previous tint.

      The remainder of the script is where the bulk of the work occurs for triggering 2D UI interaction feedback, so let's review how the `onIsPlayingChanged` function and event listeners work together for the UI user flow:

      1. `buttonImageButton.Activated` listens for a player to click the button, then calls the `Play()` function to start playing the associated audio from the audio player. This process switches the `Class.AudioPlayer.IsPlaying` property from `false` to `true`.
      2. `buttonAudioPlayer:GetPropertyChangedSignal("IsPlaying")` listens for the audio player's `IsPlaying` property to change, then calls the `onIsPlayingChanged` function.
      3. The `onIsPlayingChanged` function uses this information to trigger the tween that changes its visual appearance on the screen.
      4. To prevent the player from accidentally restarting the audio if they were to click the button in rapid succession, `buttonAudioPlayer.Ended` listens for the audio player to finish playing before calling the `onIsPlayingChanged` function again.

      It's important to note that the `onIsPlayingChanged` event only fires when it changes from `false` to `true`, meaning that it doesn't fire when changing from `true` to `false`. This is intended behavior due to complications with timing of replicating properties from server to client. Because of this, the `Ended` event is provided and listened to in this example to cover both cases.

   </AccordionDetails>
   </BaseAccordion>

1. Playtest the experience to hear the jingle every time you press the on-screen button.

   <video controls src="../../../assets/tutorials/add-2D-audio/UI-Final.mp4" width="80%"></video>
