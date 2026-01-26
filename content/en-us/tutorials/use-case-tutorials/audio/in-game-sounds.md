---
title: In-game sounds
description: The process for creating positional and feedback sounds to enhance an experience.
---

In addition to background music, in-game audio can enhance a player's experience. This tutorial will cover two forms of in-game sounds: **positional** and **feedback** sounds.

For the first example, you'll create a positional sound for a waterfall. In the second example, a script will be used to play a jingle when players touch a collectable.

## Positional sounds

When a **Sound** object is parented to a part or attachment, it becomes positional. Audio will emit from its location and grow louder as players get closer, as in the case of this waterfall.

<video controls muted>
    <source src="../../../assets/tutorials/in-game-sounds/ingameSounds-waterfall-web.mp4" />
</video>

### Create a sound

1. In any desired part, create a new **Sound** object named **WaterfallSound**.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/in-game-sounds/ingameSounds-waterfallExample.jpg" />
     <img src="../../../assets/tutorials/in-game-sounds/ingameSounds-waterfallSound.png" />
   </GridContainer>

2. In the properties, find **SoundId** and change it to this waterfall ambience: `rbxassetid://6564308795`.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-soundID.png)

   <Alert severity="info">
   Custom sounds can be imported using the [Asset Manager](../../../projects/assets/manager.md). Additionally, free sounds uploaded by Roblox and the community can be found using the [Toolbox](../../../projects/assets/toolbox.md).
   </Alert>

3. For continuous playback when the experience starts, toggle **Playing** and **Looped** to be **on**.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-looping.png)

4. Test the experience to confirm you hear the waterfall ambience.

### Adjust sound distance

Notice when testing, the audio plays immediately, even if the player is far away from the object. Using the roll-off properties, you can modify the distance at which a player hears a sound to create fading effects.

1. Change the `Class.Sound.RollOffMaxDistance|RollOffMaxDistance` to **30**. This property is measured in studs.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-rollOffDistance.png)

2. For a smoother fade, change the **RollOffMode** to **InverseTapered**. This makes approaching the sound feel less sudden.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-rollOffMode.png)

3. Run the project. Notice how sound is only heard near the object.

   <video controls muted>
   <source src="../../../assets/tutorials/in-game-sounds/ingameSounds-waterfall-web.mp4" />
   </video>

### Fine tune the roll off

Depending on your needs, you may want to adjust different properties for special effects or increased realism. See the following properties:

- `Class.Sound.RollOffMaxDistance|RollOffMinDistance` - Minimum distance (in studs) a sound decreases in volume.
- `Class.SoundGroup` - Used to adjust and balance volume between groups of sounds, like background music and in-game effects.

## Feedback sounds

Sounds can be played on command using scripts. You can link sounds to events, such as players touching a part or interacting with a menu. Here, you'll create a script that plays a chime whenever players touch collectable objects.

<video controls muted>
    <source src="../../../assets/tutorials/in-game-sounds/ingameSounds-collectables.mp4" />
</video>

### Set up collectables

The remainder of this tutorial uses a pre-made model. This model includes parts and scripts so players can collect gemstones.

1. In a browser, open the [Collectable Gems Model](https://www.roblox.com/library/6564500052/Collectable-Gems) page, and click the **Get** button.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-collectablePage.png)

- From Studio's **Window** menu or **Home** tab toolbar, open the [Toolbox](../../../projects/assets/toolbox.md) and select the **Inventory** tab.
- Make sure the dropdown is on **My Models**.
- Select the **Collectable Gems** model to add it into the experience.

1. In **SoundService**, create a new **Sound** named **FeedbackSound**.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-createFeedbackSound.png)

2. In FeedbackSound, set the **SoundId** to `rbxassetid://4110925712`- the SoundId of the simple chime downloaded from the model page.

   ![alt](../../../assets/tutorials/in-game-sounds/ingameSounds-createFeedbackSound.png)

### Set up the script

1. In **StarterPlayer** ⟩ **StarterPlayerScripts**, create a new local script named **CollectableSounds**.

2. The code below will run the `partTouched` function whenever the player touches a collectable. Copy the code into your script.

   ```lua
   local pickupObjects = workspace.Collectables.Objects
   local objectsArray = pickupObjects:GetChildren()

   local function partTouched(otherPart, objectPart)
   	local whichCharacter = otherPart.Parent
   	local humanoid = whichCharacter:FindFirstChildWhichIsA("Humanoid")

   	if humanoid and objectPart.CanCollide == true then

   	end
   end

   -- Binds every object part to the touch function so it works on all parts
   for objectIndex = 1, #objectsArray do
   	local objectPart = objectsArray[objectIndex]
   	objectPart.Touched:Connect(function(otherPart)
   		partTouched(otherPart, objectPart)
   	end)
   end
   ```

### Play a sound

1. Create a variable for **SoundService**, then another variable to store the **feedback sound**.

   ```lua
   local pickupObjects = workspace.Collectables.Objects
   local objectsArray = pickupObjects:GetChildren()

   local SoundService = game:GetService("SoundService")
   local feedbackSound = SoundService:FindFirstChild("FeedbackSound")

   local function partTouched(otherPart, objectPart)
   ```

2. To play the chime, find the function `partTouched`. Within the if statement, call `feedbackSound:Play()` to play the sound.

   ```lua
   local function partTouched(otherPart, objectPart)
   	local whichCharacter = otherPart.Parent
   	local humanoid = whichCharacter:FindFirstChildWhichIsA("Humanoid")

   	-- Play the sound, once finished, destroy the object
   	if humanoid and objectPart.CanCollide == true then
   		feedbackSound:Play()
   	end
   end
   ```

3. Test the experience to confirm that when the player touches a collectable, it both disappears and plays a sound.

   <video controls muted>
   <source src="../../../assets/tutorials/in-game-sounds/ingameSounds-collectables.mp4" />
   </video>
