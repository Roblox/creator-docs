---
title: Add animations
description: Learn how to make animations in Roblox Studio with step by step tutorials in this one hour challenge. Use scripts to add animations into an experience.
prev: /education/build-it-play-it-island-of-move/designing-poses
---

To implement animations in-game, use scripts. For this tutorial, you'll implement the previously made victory animation using a pre-made script. Once finished, this animation can be used to celebrate a player's accomplishment, like reaching the end of an obby or finding a secret.

## Script animations

Animations are triggered using **scripts**. One approach is to use events to play animations in a variety of situations, like a player finishing a level, defeating an enemy, or even making an in-game purchase.

### Set up the project

For this project, you'll create parts that when touched, trigger an animation for that player.

1. To organize all parts that will play the animation, add a folder in Workspace (hover over Workspace and click +) named TouchPartFolder.

2. In TouchPartFolder, add a part.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_showPartsFolder.png" />

   Make sure the part is placed where playing the animation would make sense, such as the end of a level or near an object players collect.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_touchedPartExamples_obby.jpg" />
       <figcaption>Example Victory Part</figcaption>
     </figure>
     <figure>
       <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/bipi_t2_touchedPartExamples_treasure.jpg" />
       <figcaption>Example Interaction Part</figcaption>
     </figure>
   </GridContainer>

3. In StarterPlayer > StarterCharacterScripts, create a LocalScript named TouchPartRegister. Then copy and paste the code below.

   ```lua
   -- Used with "PlayerAnimationFeedback" script to play animations on part touches

   -- Services
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local Players = game:GetService("Players")

   local player = Players.LocalPlayer
   local character = player.Character or player.CharacterAdded:Wait()
   local humanoid = character:WaitForChild("Humanoid")
   local canTouch = false

   -- Include feedback animation module
   local PlayerAnimationFeedback = require(ReplicatedStorage:WaitForChild("PlayerAnimationFeedback"))

   -- Function called when a part is touched
   local function onPartTouch(otherPart)
   	if humanoid and canTouch == false then
   		canTouch = true
   		PlayerAnimationFeedback:PlayAnimation()
   		canTouch = false
   	end
   end

   -- On startup, call animation module load function
   PlayerAnimationFeedback:LoadAnimation(humanoid)
   -- Also bind a folder of parts to the "Touched" event to run "onPartTouch()"
   local touchPartFolder = workspace:WaitForChild("TouchPartFolder")
   local touchParts = touchPartFolder:GetChildren()

   for _, touchPart in touchParts do
   	touchPart.Touched:Connect(onPartTouch)
   end
   ```

   This script finds all parts in the TouchPartFolder and gives them `Touched()` events. When fired, the event runs a function that plays an animation for a player.

    <Alert severity="info">
    While this script uses `Touched()`, different events like `MouseClick()` or `Changed()` can also be used. Additionally, your own game events, like awarding a player points can be fired from the TouchPartRegister script. To see an example that can be added, check out the article on Health Pickups for code.
    </Alert>

4. The next script triggers animations for a player. In ReplicatedStorage, create a new ModuleScript named PlayerAnimationFeedback. Then, copy and paste the code below.

   ```lua
   -- Used with "TouchPartRegister" script to play animations for a player
   local PlayerAnimationFeedback = {}

   local feedbackAnimationTrack
   local ANIMATION_FADE = 0.3
   local ANIMATION_ID = "rbxassetid://YOUR_ANIMATION"

   -- Function to load animation onto player's character
   function PlayerAnimationFeedback:LoadAnimation(humanoid)
   	local feedbackAnimation = Instance.new("Animation")
   	feedbackAnimation.AnimationId = ANIMATION_ID
   	feedbackAnimationTrack = humanoid.Animator:LoadAnimation(feedbackAnimation)
   	feedbackAnimationTrack.Priority = Enum.AnimationPriority.Action
   	feedbackAnimationTrack.Looped = false
   end

   -- Function to play the animation
   function PlayerAnimationFeedback:PlayAnimation()
   	feedbackAnimationTrack:Play(ANIMATION_FADE)
   	task.wait(feedbackAnimationTrack.Length)
   end

   return PlayerAnimationFeedback
   ```

## Play animations

Animations must be identified in a script, loaded, and played.

### Set the animation

The script needs to know which animation to play. To use an exported animation, find its **asset ID** through a web browser. That ID will then allow that animation to be loaded in the script.

1. Open the <a href="https://www.roblox.com/develop?View=24" target="_blank" rel="noopener">Animations</a> section of the Create page.

2. Locate and click an exported animation.

3. Copy its ID from the URL in your browser.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/ccs2020_t2_exportedAnimationWeb_alt.png" />

4. In the script, PlayerAnimationFeedback, replace the placeholder, `YOUR_ANIMATION` (Line 8), with the **ID** you copied.

   <img src="../../assets/education/build-it-play-it-island-of-move-intermediate/showAnimationIDScript.gif" />

5. Run the project and test that once a player hits the part, you see the animation.

   <video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/victoryPose_finalSingleObbyExample_web.mp4" width="100%"></video>

## Next steps

Below are a few ways to continue learning

### Learn about animation

So far, you've learned how to create animations and add them into experiences. To continue learning, we recommend visiting the [Animation](../../animation/index.md) overview.

On that page, you'll find useful links to improving animations, such as using the curve editor for smooth movement, or tips in refining animations.

### Animate parts

Additionally, start the optional lesson [Animating Parts](../../education/build-it-play-it-island-of-move/animating-parts.md) to learn how to code tweens, a feature that lets you scale, rotate, and move parts. A sample of the final project is below.

<video controls src="../../assets/education/build-it-play-it-island-of-move-intermediate/exampleProject_tweeningButtonDoor.mp4" width="100%"></video>
