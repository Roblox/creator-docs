---
title: Play character animations
description: The process for changing default character animations and triggering custom animations.
---

**Playing character animations** is an important part of what makes avatars and non-playable characters (NPCs) expressive, realistic, and engaging to your audience. In addition to providing immersive visuals, character animations provide players feedback from their actions, guidance on how to navigate the environment, and vital information about their character and others.

Using the [Hazardous Space Station](https://www.roblox.com/games/134383324873456/Walking-Character-Animation) `.rbxl` file as a reference, this tutorial shows you how to play character animations using two different techniques, including guidance on:

- Swapping default character animation asset IDs with your own custom animations.
- Triggering animations in response to character actions within the 3D space.

After you complete this tutorial, you will have the skills to customize animations for a wide variety of gameplay situations.

## Change default animations

Every character with a default `Class.Humanoid` object, whether it's a player-controlled avatar or a non-player character (NPC), includes a set of **default animations** that play whenever the character performs specific in-experience actions, such as running, climbing, and jumping. Roblox provides these animations out-of-the-box for every experience without any additional scripting effort.

<GridContainer numColumns="3">
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Fall-Animation.mp4" width="100%"></video>
    <figcaption>Default Fall Animation</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Swim-Animation.mp4" width="100%"></video>
    <figcaption>Default Swim Animation</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Climb-Animation.mp4" width="100%"></video>
    <figcaption>Default Climb Animation</figcaption>
  </figure>
</GridContainer>

However, if these default animations don't meet the design requirements for your world's environment, aesthetic, or overall narrative, you can swap them out with custom animations that apply to every player that joins your experience.

To demonstrate, the following section teaches you how to swap out the default walk animation with a custom walk cycle animation from [Create Character Animations](create-an-animation.md). Using this same process, you can swap out any of the default animations with your own animation asset IDs.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Default-Walk-Animation.mp4" width="99%"></video>
    <figcaption>Default Walk Animation</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/playing-character-animations/Custom-Walk-Animation.mp4" width="100%"></video>
    <figcaption>Custom Walk Animation</figcaption>
  </figure>
</GridContainer>

### Create script

Every character's `Class.Humanoid` object includes a child `Class.Animator` object that stores all of the character's default animations. In order to set any of these default animations to new asset IDs, you must create a script in the `Class.ServerScriptService` so that it can reference and override the `Class.Animator` object's default values as soon as players load into the experience.

To create a script that will reference the default animation asset IDs:

1. In the **Explorer** window, add a new script to **ServerScriptService**.
   1. Hover over **ServerScriptService** and click the ⊕ button.
   1. From the contextual menu, insert a **Script**.
1. In the new script, paste the following code:

   ```lua
   local Players = game:GetService("Players")

   local function onCharacterAdded(character)
	   local humanoid = character:WaitForChild("Humanoid")
	   local animator = humanoid:WaitForChild("Animator")
	   print("Animator found!")
   end

   local function onPlayerAdded(player)
	   player.CharacterAdded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Code Explanation</Typography>
</AccordionSummary>
<AccordionDetails>

The `ResetDefaultAnimations` script starts by getting the `Class.Players` service, which contains all `Class.Player` objects for players as they connect to a server. When each of the player's characters load into the experience, the `Class.Player.onCharacterAdded|onCharacterAdded` function waits until it detects the character's `Class.Humanoid` and `Class.Animator` objects.

When it detects an `Class.Animator` object for the first time, the script then prints "Animator found!" to let you know that the script is working as intended.

</AccordionDetails>
</BaseAccordion>

### Replace asset ID

Now that you know your script is able to detect when players load and connect to the server, you can modify your script to specifically reference the animation ID(s) you want to swap with your own custom animations.

The following table contains all of the default character animations that you can call and replace within the `Class.Animator` object. Note that Idle has two variations that you can program to play more or less frequently.

<table>
  <tbody>
    <tr>
      <th>Character Action</th>
      <th>Animate Script Reference</th>
    </tr>
	<tr>
      <td>**Run**</td>
      <td>`animateScript.run.RunAnim.AnimationId`</td>
    </tr>
	<tr>
      <td>**Walk**</td>
      <td>`animateScript.walk.WalkAnim.AnimationId`</td>
    </tr>
	<tr>
      <td>**Jump**</td>
      <td>`animateScript.jump.JumpAnim.AnimationId`</td>
    </tr>
	<tr>
      <td>**Idle**</td>
      <td>
        `animateScript.idle.Animation1.AnimationId`<br />
        `animateScript.idle.Animation2.AnimationId`
      </td>
    </tr>
	<tr>
      <td>**Fall**</td>
      <td>`animateScript.fall.FallAnim.AnimationId`</td>
    </tr>
	<tr>
      <td>**Swim**</td>
      <td>
        `animateScript.swim.Swim.AnimationId`
      </td>
    </tr>
	<tr>
      <td>**Swim (Idle)**</td>
      <td>
        `animateScript.swimidle.SwimIdle.AnimationId`
      </td>
    </tr>
	<tr>
      <td>**Climb**</td>
      <td>`animateScript.climb.ClimbAnim.AnimationId`</td>
    </tr>
  </tbody>
</table>

To replace the default walk animation asset ID:

1. Call the default walk animate script reference, then replace the asset ID with your own custom animation asset ID. For example, the following code sample references the walk cycle animation from [Create Character Animations](create-an-animation.md).

   ```lua
   local Players = game:GetService("Players")

   local function onCharacterAdded(character)
	   local humanoid = character:WaitForChild("Humanoid")
	   local animator = humanoid:WaitForChild("Animator")
	   print("Animator found!")

	   local animateScript = character:WaitForChild("Animate")
	   animateScript.walk.WalkAnim.AnimationId = "rbxassetid://122652394532816"
   end

   local function onPlayerAdded(player)
	   player.CharacterAdded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

1. Playtest your experience to ensure your custom walk animation overrides the default animation.
   1. Choose **Test** from the dropdown menu and click the **Play** button to its right to begin the playtest.
	 
      <img src="../../../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

   1. Walk around the space station with your avatar.

      <video controls src="../../../assets/tutorials/playing-character-animations/Replace-AssetID-2B.mp4" width="90%"></video>

## Trigger animations

While the previous technique focuses on swapping out default animations that automatically play whenever a character performs specific in-experience actions, you can programmatically trigger animations to play in response to **any** character action within the 3D space, such as picking up an item or taking damage from a hazard.

<figure>
  <video controls src="../../../assets/tutorials/playing-character-animations/Pose-Example.mp4" width="90%"></video>
  <figcaption>In this example, when players touch the golden platform, they trigger a non-default character dance animation.</figcaption>
</figure>

This method of playing animations is useful because it provides players instantaneous feedback on how they should interact with objects in their environment. To demonstrate, the following section shows you how to trigger an animation whenever characters are too close to hazardous steam leaks as a way of subtly teaching players to avoid walking too close to the walls.

### Insert volume

One of the most common ways to trigger unique gameplay behavior is to use **volumes**, or invisible regions within the 3D space, to detect when characters or objects interact with specific areas of the environment. When you pair volumes with scripts, you can use their collision feedback to programmatically trigger actions, such as reducing the player's health or playing an animation.

<figure>
  <img src="../../../assets/tutorials/playing-character-animations/Volume-Example.jpg" alt="A far out view of a mansion room. An outline of a box is in the middle of the room to signify the volume that triggers gameplay events." width="90%" />
  <figcaption>The Mystery of Duvall Drive uses volumes to trigger gameplay events that change the visual appearance of the room.</figcaption>
</figure>

When adding a volume to your experience, it's important to scale it so that it only covers the space that you want to trigger your animation. If you make your volume too small, players may never collide with the area to play the animation; conversely, if you make your volume too large, the animation will play before players reach the item or area of interest, and they may not understand what they did to trigger the animation.

To insert a volume around a steam leak that will trigger an animation:

1. In the **Explorer** window, add a new block part.
1. Position and resize the block until it covers the area that you want to trigger your animation.
1. In the **Properties** window,
   1. Set **Name** to **AnimationDetector**.
   1. Set **Transparency** to `1` to make the block invisible.

      <img src="../../../assets/tutorials/playing-character-animations/Insert-Volume-3.jpg" alt="An outline of a block is visible around a steam vent to signify the position of the volume." width="80%" />

### Create script

Now that you have a defined region for triggering your animation, it's time to create a script that programmatically detects whenever players collide with the volume. You can then listen for collision events to trigger any animation that makes sense for your gameplay requirements.

For example, this animation technique uses a `Class.LocalScript` instead of a `Class.Script` to provide players immediate feedback when they collide with the volume. If the server were to listen for the collision and play the animation, there could be a delay between the player touching the volume on their client and seeing the animation play because of the replication time from the server to the client.

To create a local script that will detect when the local player's character touches the volume:

1. In the **Explorer** window, add a new script to **StarterCharacterScripts**. This placement ensures the script and its children clone into the player character on join **and** when they respawn back into the experience.
   1. Expand **StarterPlayer**, then hover over its **StarterCharacterScripts** child and click the ⊕ button.
   1. From the contextual menu, insert a **LocalScript** and rename it **TriggerAnimation**.
1. In the new script, paste the following code:

   ```lua
   local Workspace = game:GetService("Workspace")

   local animation = script:WaitForChild("Animation")
   local humanoid = script.Parent:WaitForChild("Humanoid")
   local animator = humanoid:WaitForChild("Animator")
   local animationTrack = animator:LoadAnimation(animation)
   local animationDetector = Workspace:WaitForChild("AnimationDetector")

   local debounce = false

   animationDetector.Touched:Connect(function(hit)
	   if debounce then 
		   return
	   end
	
	   local hitCharacter = hit:FindFirstAncestorWhichIsA("Model")
	   if hitCharacter ~= localCharacter then
		   return
	   end

	   debounce = true
	   animationTrack:Play()
	   animationTrack.Ended:Wait()
	   debounce = false
   end)
   ```

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Code Explanation</Typography>
</AccordionSummary>
<AccordionDetails>

The `TriggerAnimation` script starts by getting the `Class.Workspace` service, which contains all objects that exist in the 3D world. This is important because the script needs to reference the `Class.Part` object acting as your volume.

For each player character that loads or respawns back into the experience, the script waits for:

- Its child `Class.Animation` object, which you will add in the next section.
- The character's `Class.Humanoid` and `Class.Animator` objects.
- The volume object in the workspace named **AnimationDetector**.

When anything collides with the volume, the `Touched` event handler function gets the first ancestor that's a `Class.Model`, which should be the character if the `Class.BasePart` that collided with the volume is a descendant of a character model. If it is, the function then checks to see if the `Class.Model` is the **local** player's character. If it is, the function then:

- Sets debounce to `true`.
- Plays and waits for the animation to end.
- Sets debounce back to `false`.

Setting debounce from `false` to `true` to `false` again after the animation finishes playing is a debounce pattern that prevents the animation from repeatedly triggering as players continuously collide with the volume. For more information on this debounce pattern, see [Detect collisions](../../../scripting/debounce.md#detect-collisions).

</AccordionDetails>
</BaseAccordion>

### Add animation

If you were to playtest your experience right now, your `TriggerAnimation` script still wouldn't be able to play an animation in response to the local player-volume collision. This is because it's waiting for a child `Class.Animation` object with an animation asset ID it can reference, and that `Class.Animation` object doesn't currently exist.

To add an animation for the local script to reference as players collide with the volume:

1. In the **Explorer** window, add a new animation to **TriggerAnimation**.
   1. Hover over **TriggerAnimation** and click the ⊕ button.
   1. From the contextual menu, insert an **Animation**.
1. Select the new animation object, then in the **Properties** window, set **AnimationID** to the animation asset ID you want to trigger when players touch the volume. For example, the [Hazardous Space Station](https://www.roblox.com/games/134383324873456/Walking-Character-Animation) sample references `rbxassetid://3716468774` to play an animation of a character falling backwards.
1. Playtest your experience to ensure your animation plays when players are near the first steam leak.

   <video controls src="../../../assets/tutorials/playing-character-animations/Add-Animation-3.mp4" width="90%"></video>
