---
title: Scripting Avatar Animations
description: The process for updating default animations.
prev: /tutorials/building/animation/creating-an-animation
---

Scripts can be used to update default animations and to add new ones. The two examples covered by this tutorial will change the default run animation and will play an animation on command when a player touches an object.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/scripting-avatar-animations/Using-Animations-FinalExamples-default.jpg" />
    <figcaption>Changed Default Run</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/scripting-avatar-animations/Using-Animations-FinalExamples-event.jpg" />
    <figcaption>Playing Animations on Command</figcaption>
  </figure>
</GridContainer>

## Changing Default Animations

By default, Roblox characters include common animations like running, climbing, and jumping. For the first example, you'll create a script to swap the default run animation with a more unique one. If you don't have a run animation to practice with, you can use one of the example animations provided.

<video controls loop muted>
    <source src="../../../assets/tutorials/scripting-avatar-animations/Using-Animations-FinalDefaultRunExample.mp4" />
</video>

### Setup the Script

So the animation swap applies to all players, the script will be stored in ServerScriptService.

1. In **ServerScriptService**, create a new script named **ChangeRunAnimation**.

   ![alt](../../../assets/tutorials/scripting-avatar-animations/Using-Animations-ServerScriptChangeDefault.png)

2. In the script, create two variables:

   - `Class.Players` - Gets the Players service, giving you access to players that join the game.
   - `runAnimation` - Sets the ID of the animation to be used. For the ID, use the one made in Creating Animations, or find one from the card below.

   ```lua
   local Players = game:GetService("Players")
   local runAnimation = "rbxassetid://656118852"
   ```

3. Copy the highlighted code below. When players join the game through `PlayerAdded`, the script will check if their avatar is loaded. In the next section, you'll add code to swap animations in the `onCharacterAdded` function.

```lua
local Players = game:GetService("Players")
local runAnimation = "rbxassetid://616163682"

local function onCharacterAdded(character)

end

local function onPlayerAdded(player)
    player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

If you need a running animation, use one of the following example IDs. Additional catalog animations can be found on the [Using Animations](../../../animation/using.md#catalog-animation-reference) page.

<table>
  <thead>
    <tr>
      <th>Animation</th>
      <th>ID</th>
    </tr>
  </thead>
  <tbody>
      <tr>
      <td>
      Ninja Run
      </td>
      <td>
      656118852
      </td>
      </tr>
      <tr>
      <td>
      Werewolf Run
      </td>
      <td>
      1083216690
      </td>
      </tr>
      <tr>
      <td>
      Zombie Run
      </td>
      <td>
      616163682
      </td>
      </tr>
  </tbody>
</table>

### Replace the Animation

Default animations are accessed through a player's **Humanoid** object. In this case, you'll use the humanoid to find the run animation, then swap it's animation ID with a new one.

1. In `onCharacterAdded`, create a variable to store the humanoid.

   ```lua
   local Players = game:GetService("Players")
   local runAnimation = "rbxassetid://616163682"

   local function onCharacterAdded(character)
       local humanoid = character:WaitForChild("Humanoid")
   end

   local function onPlayerAdded(player)
       player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

2. Attached to the humanoid is a script named **Animate**, where default animations are parented. Store this in a variable named **animateScript**.

   ```lua
   local Players = game:GetService("Players")
   local runAnimation = "rbxassetid://616163682"

   local function onCharacterAdded(character)
       local humanoid = character:WaitForChild("Humanoid")

       local animateScript = character:WaitForChild("Animate")
   end

   local function onPlayerAdded(player)
       player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)

   ```

3. Accessing different animations can be done using the dot operator, such as `animateScript.run`. To change the run, set the animation ID to the one stored in `runAnimation`.

   ```lua
   local Players = game:GetService("Players")
   local runAnimation = "rbxassetid://616163682"

   local function onCharacterAdded(character)
       local humanoid = character:WaitForChild("Humanoid")

       local animateScript = character:WaitForChild("Animate")
       animateScript.run.RunAnim.AnimationId = runAnimation
   end

   local function onPlayerAdded(player)
       player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

   <Alert severity="info">

   A few of the other common animations you can change are listed below:

   - `animateScript.climb.ClimbAnim`
   - `animateScript.sit.SitAnim`
   - `animateScript.fall.FallAnim`
   - `animateScript.swim`
   - `animateScript.idle.Animation1`
   - `animateScript.walk.WalkAnim`

   Remember to access each one using `.AnimationId` at the end. For a full guide on changing other default animations, see the [Using Animations](../../../animation/using.md#replacing-default-animations) article.

   </Alert>

4. Test the game and notice how the default run animation has changed.

<video controls loop muted>
    <source src="../../../assets/tutorials/scripting-avatar-animations/Using-Animations-FinalDefaultRunExample.mp4" />
</video>

## Playing Animations

The second way of using animations is to play them in response to a character's action in-game: for instance, if a player picks up an item, or takes damage.

In this next script, whenever a player presses a button, a shock animation will play and paralyze them until the animation finishes.

<video controls loop muted>
    <source src="../../../assets/tutorials/scripting-avatar-animations/Using-Animations-FinalEventAnimation.mp4" />
</video>

### Setup

The remainder of this tutorial uses a pre-made model that includes a [ProximityPrompt](../../../tutorials/building/ui/proximity-prompts.md). Players can walk up to a button and press it to activate an event.

1. Download the [Shock Button](https://www.roblox.com/library/6505388729/Shock-Button-Starter) model and insert it into Studio.

   ![alt](../../../assets/tutorials/scripting-avatar-animations/Using-Animations-ShockButtonModel.jpg)

   <Alert severity="info">

   Models can be added into your Inventory to be used in any game.

   1. In a browser, open the model page, click the **Get** button. This adds the model into your inventory.
   2. In Studio, go to the **View** tab and click on the **Toolbox**.
   3. In the Toolbox window, click on the **Inventory** button. Then, make sure the dropdown is on **My Models**.
   4. Select the **Shock Button** model to add it into the game.

    </Alert>

2. In **StarterPlayer** > **StarterPlayerScripts**, create a local script named **PlayShockAnimation**.

   ![alt](../../../assets/tutorials/scripting-avatar-animations/Using-Animations-ShockPlayerScript.png)

3. The code below calls a function named `onShockTrigger` when the proximity prompt is activated. **Copy** it into your script.

```lua
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()

local humanoid = character:WaitForChild("Humanoid")
local Animator = humanoid:WaitForChild("Animator")

local shockButton = workspace.ShockButton.Button
local proximityPrompt = shockButton.ProximityPrompt
local shockParticle = shockButton.ExplosionParticle

local function onShockTrigger(player)
    shockParticle:Emit(100)
end

proximityPrompt.Triggered:Connect(onShockTrigger)
```

<Alert severity="warning">
This script uses specifically named parts. If you rename parts of the imported model, be sure to update their variables (lines 12-14) in the script.
</Alert>

### Create and Load an Animation

Animations that the player uses are stored on the player's `Class.Animator` object. To play the shock animation, a new animation track will need to be loaded onto the Animator object when they join the game.

1. Above `onShockTrigger`, create a new **Animation** instance named `shockAnimation`. Then, set the `AnimationID` of that to the desired animation. Use the ID in the code box if needed.

   ```lua
   local shockButton = workspace.ShockButton.Button
   local proximityPrompt = shockButton.ProximityPrompt
   local shockParticle = shockButton.ExplosionParticle

   local shockAnimation = Instance.new("Animation")
   shockAnimation.AnimationId = "rbxassetid://3716468774"

   local function onShockTrigger(player)

   end
   ```

2. Create a new variable named `shockAnimationTrack`. On the player's Animator, call `LoadAnimation`, passing in the previously created animation.

   ```lua
   local shockAnimation = Instance.new("Animation")
   shockAnimation.AnimationId = "rbxassetid://3716468774"

   local shockAnimationTrack = Animator:LoadAnimation(shockAnimation)
   ```

3. With the new animation loaded, change some of the track's properties.

   - Set the `Enum.AnimationPriority` to `Action` - Ensures the animation overrides any current animations playing.
   - Set `Class.AnimationTrack.Looped|Looped` to `false` so the animation doesn't repeat.

   ```lua
   local shockAnimation = Instance.new("Animation")
   shockAnimation.AnimationId = "rbxassetid://3716468774"

   local shockAnimationTrack = Animator:LoadAnimation(shockAnimation)
   shockAnimationTrack.Priority = Enum.AnimationPriority.Action
   shockAnimationTrack.Looped = false
   ```

### Play the Animation

Whenever someone triggers the ProximityPrompt on the button, it'll play an animation and temporarily freeze that player.

1. Find the `onShockTrigger` function. On the `shockAnimationTrack`, call the `Play` function.

   ```lua
   local function onShockTrigger(player)
       shockParticle:Emit(100)

       shockAnimationTrack:Play()
   end
   ```

2. To prevent the player from moving while the animation plays, change the humanoid's `WalkSpeed` property to 0.

   ```lua
   local function onShockTrigger(player)
       shockParticle:Emit(100)

       shockAnimationTrack:Play()
       humanoid.WalkSpeed = 0
   end
   ```

### Using Animations with Events

Just how parts have Touched events, animations have events such as `Class.AnimationTrack.Stopped`. For the script, once the animation finishes, you'll restore the player's move speed.

1. Access the `Stopped` event for the animation track using the dot operator, then call the `Wait` function. This pauses the code until that animation finishes.

   ```lua
   local function onShockTrigger(player)
       shockParticle:Emit(100)

       shockAnimationTrack:Play()
       humanoid.WalkSpeed = 0
       shockAnimationTrack.Stopped:Wait()
   end
   ```

2. Return the player's walk speed to 16, the default for Roblox players.

   ```lua
   local function onShockTrigger(player)
       shockParticle:Emit(100)

       shockAnimationTrack:Play()
       humanoid.WalkSpeed = 0
       shockAnimationTrack.Stopped:Wait()
       humanoid.WalkSpeed = 16
   end
   ```

3. Test the game by walking up the part and press <kbd>E</kbd> to get a shock.

<video controls loop muted>
    <source src="../../../assets/tutorials/scripting-avatar-animations/Using-Animations-FinalEventAnimation.mp4" />
</video>

The framework in this script can be easily adapted to different gameplay situations. For instance, try playing a special animation whenever a player touches a trap part, or whenever a team wins a game round.
