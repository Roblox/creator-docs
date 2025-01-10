---
title: Using Animations
description: Explains the process of playing animations through scripts, and replacing default animations.
---

Once you have [created an animation](../animation/editor.md), you need to use scripts to include them in your experience. You can either [play animations manually](#playing-animations-from-scripts) from scripts or [replace default animations](#replacing-default-animations) for player characters.

## Playing Animations From Scripts

In some cases, you'll need to play an animation directly from inside a script, such as when a user presses a certain key or picks up a special item.

### Humanoids

To play an animation on a rig containing a `Class.Humanoid`
object, such as typical playable characters, follow this basic pattern:

1. Ensure that the local player's `Class.Humanoid` contains an `Class.Animator` object.
2. Create a new `Class.Animation` instance with the proper `Class.Animation.AnimationId|AnimationId`.
3. Load the animation via `Class.Animator:LoadAnimation()` to create an `Class.AnimationTrack`.
4. Play the track with `Class.AnimationTrack:Play()`.

For example, the following `Class.LocalScript`, when placed in
`Class.StarterPlayerScripts`, loads a "kick" animation onto the player's character and plays it. The script also utilizes the `Class.AnimationTrack:GetMarkerReachedSignal()|GetMarkerReachedSignal()` method to detect when a specific [animation event](../animation/events.md) occurs.

```lua title='LocalScript - Play Custom Animation on Player Character'
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()

-- Ensure that the character's humanoid contains an "Animator" object
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:WaitForChild("Animator")

-- Create a new "Animation" instance and assign an animation asset ID
local kickAnimation = Instance.new("Animation")
kickAnimation.AnimationId = "rbxassetid://2515090838"

-- Load the animation onto the animator
local kickAnimationTrack = animator:LoadAnimation(kickAnimation)

-- Play the animation track
kickAnimationTrack:Play()

-- If a named event was defined for the animation, connect it to "GetMarkerReachedSignal()"
kickAnimationTrack:GetMarkerReachedSignal("KickEnd"):Connect(function(paramString)
	print(paramString)
end)
```

### Non-Humanoids

To play animations on rigs that do **not** contain a `Class.Humanoid`, you must create an `Class.AnimationController` with a child `Class.Animator`. For example, the following `Class.Script` (assumed to be a direct child of the rig) loads a "kick" animation and plays it.

```lua title='Script - Play Custom Animation on Character Rig'
local rig = script.Parent

-- Create a new "Animation" instance and assign an animation asset ID
local kickAnimation = Instance.new("Animation")
kickAnimation.AnimationId = "rbxassetid://2515090838"

-- Create a new "AnimationController" and "Animator"
local animationController = Instance.new("AnimationController")
animationController.Parent = rig

local animator = Instance.new("Animator")
animator.Parent = animationController

-- Load the animation onto the animator
local kickAnimationTrack = animator:LoadAnimation(kickAnimation)

-- Play the animation track
kickAnimationTrack:Play()

-- If a named event was defined for the animation, connect it to "GetMarkerReachedSignal()"
kickAnimationTrack:GetMarkerReachedSignal("KickEnd"):Connect(function(paramString)
	print(paramString)
end)
```

## Replacing Default Animations

By default, Roblox player characters include common animations like running,
climbing, swimming, and jumping. You can replace these [default animations](#default-character-animations) with animations from the [catalog](#catalog-animations) or with your own [custom](../animation/editor.md) animations.

1. Obtain the **asset ID** of the new animation as follows:

   - For a custom animation built with the [Animation Editor](../animation/editor.md), follow the [export](../animation/editor.md#exporting-an-animation) instructions.
   - Copy an appropriate ID from the [catalog animation reference](#catalog-animations) below. For example, to replace the default run animation with the <a href="https://www.roblox.com/catalog/658830056/Ninja-Run" target="_blank" rel="noopener">Ninja&nbsp;Run</a> variant, use `656118852`.

2. In the [Explorer](../studio/explorer.md) window, add a new `Class.Script` to **ServerScriptService**.

   1. Hover over **ServerScriptService** and click the &CirclePlus; button.
   2. From the contextual menu, insert a **Script**.

3. In the new script, paste the following code:

   ```lua title='Script - Replace Default Character Animations'
   local Players = game:GetService("Players")

   local function onCharacterAdded(character)
   	-- Get animator on humanoid
   	local humanoid = character:WaitForChild("Humanoid")
   	local animator = humanoid:WaitForChild("Animator")

   	-- Stop all animation tracks
   	for _, playingTrack in animator:GetPlayingAnimationTracks() do
   		playingTrack:Stop(0)
   	end

   	local animateScript = character:WaitForChild("Animate")
   	--animateScript.run.RunAnim.AnimationId = "rbxassetid://"
   	--animateScript.walk.WalkAnim.AnimationId = "rbxassetid://"
   	--animateScript.jump.JumpAnim.AnimationId = "rbxassetid://"
   	--animateScript.idle.Animation1.AnimationId = "rbxassetid://"
   	--animateScript.idle.Animation2.AnimationId = "rbxassetid://"
   	--animateScript.fall.FallAnim.AnimationId = "rbxassetid://"
   	--animateScript.swim.Swim.AnimationId = "rbxassetid://"
   	--animateScript.swimidle.SwimIdle.AnimationId = "rbxassetid://"
   	--animateScript.climb.ClimbAnim.AnimationId = "rbxassetid://"
   end

   local function onPlayerAdded(player)
   	player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

4. For each line that references a [default character animation](#default-character-animations), uncomment it and paste the replacement ID after `rbxassetid://`. For example, to change the default run animation to the <a href="https://www.roblox.com/catalog/658830056/Ninja-Run" target="_blank" rel="noopener">Ninja&nbsp;Run</a> variant:

   ```lua title='Script - Replace Default Character Animations' highlight='14'
   local Players = game:GetService("Players")

   local function onCharacterAdded(character)
   	-- Get animator on humanoid
   	local humanoid = character:WaitForChild("Humanoid")
   	local animator = humanoid:WaitForChild("Animator")

   	-- Stop all animation tracks
   	for _, playingTrack in animator:GetPlayingAnimationTracks() do
   		playingTrack:Stop(0)
   	end

   	local animateScript = character:WaitForChild("Animate")
   	animateScript.run.RunAnim.AnimationId = "rbxassetid://656118852"
   	--animateScript.walk.WalkAnim.AnimationId = "rbxassetid://"
   	--animateScript.jump.JumpAnim.AnimationId = "rbxassetid://"
   	--animateScript.idle.Animation1.AnimationId = "rbxassetid://"
   	--animateScript.idle.Animation2.AnimationId = "rbxassetid://"
   	--animateScript.fall.FallAnim.AnimationId = "rbxassetid://"
   	--animateScript.swim.Swim.AnimationId = "rbxassetid://"
   	--animateScript.swimidle.SwimIdle.AnimationId = "rbxassetid://"
   	--animateScript.climb.ClimbAnim.AnimationId = "rbxassetid://"
   end

   local function onPlayerAdded(player)
   	player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
   ```

## Setting Animation Weights

You can use multiple animations for the same action. For example, there
are two `idle` variations in the code sample for [replacing default animations](#replacing-default-animations).

When multiple animations exist for a character state, the **Animate** script
randomly chooses which one to play, but you can influence the outcome by
setting the animation's `Weight` value under the following formula:

- **animation weight / total weight of all state animations**

In the following example, `idle.Animation1` will play ⅓ of the time the character is idle, while `idle.Animation2` will play ⅔ of the time.

```lua title='Script - Replace Default Character Animations' highlight='3,4'
	animateScript.idle.Animation1.AnimationId = "rbxassetid://656117400"
	animateScript.idle.Animation2.AnimationId = "rbxassetid://656118341"
	animateScript.idle.Animation1.Weight.Value = 5
	animateScript.idle.Animation2.Weight.Value = 10
```

## Animation References

### Default Character Animations

The following table contains all of the default character animations that you can [replace](#replacing-default-animations) with [catalog](#catalog-animations) animations or your own [custom](../animation/editor.md) animations. Note that **Idle** has two variations which you can [weight](#setting-animation-weights) to play more or less frequently.

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

### Catalog Animations

When using avatar animation bundles to [replace default animations](#replacing-default-animations), use the following references for the respective asset IDs. For example, if you want to apply the <a href="https://www.roblox.com/catalog/658832070/Ninja-Jump" target="_blank" rel="noopener">Ninja&nbsp;Jump</a> animation, use `656117878`. Note that **Idle** has multiple variations.

<table>
  <tbody>
	<tr>
	  <td>
	  	<a href="https://www.roblox.com/bundles/34/Astronaut-Animation-Pack" target="_blank" rel="noopener">**Astronaut**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921039308</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921046031</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921042494</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921034824, 10921036806, 10921038149</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921040576</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921044000</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921045006</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921032124</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	  	<a href="https://www.roblox.com/bundles/39/Bubbly-Animation-Package" target="_blank" rel="noopener">**Bubbly**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921057244</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10980888364</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921062673</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921054344, 10921055107, 10921056055</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921061530</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921063569</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10922582160</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921053544</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/56/Cartoony-Animation-Package" target="_blank" rel="noopener">**Cartoony**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921076136</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921082452</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921078135</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921071918, 10921072875, 10921074502</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921077030</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921079380</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921081059</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921070953</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/48/Elder-Animation-Package" target="_blank" rel="noopener">**Elder**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921104374</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921111375</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921107367</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921101664, 10921102574, 10921103538</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921105765</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921108971</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921110146</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921100400</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/68/Knight-Animation-Package" target="_blank" rel="noopener">**Knight**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921121197</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921127095</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921123517</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921117521, 10921118894, 10921119700</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921122579</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921125160</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921125935</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921116196</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/79/Levitation-Animation-Pack" target="_blank" rel="noopener">**Levitation**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921135644</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921140719</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921137402</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921132962, 10921133721, 10921134514</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921136539</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921138209</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921139478</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921132092</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/63/Mage-Animation-Package" target="_blank" rel="noopener">**Mage**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921148209</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921152678</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921149743</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921144709, 10921145797, 10921146941</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921148939</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921150788</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921151661</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921143404</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/75/Ninja-Animation-Package" target="_blank" rel="noopener">**Ninja**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921157929</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921162768</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921160088</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921155160, 10921155867, 10921156883</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921159222</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921161002</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10922757002</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921154678</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/55/Pirate-Animation-Package" target="_blank" rel="noopener">**Pirate**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />750783738</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />750785693</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />750782230</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />750781874, 750782770, 885515365</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />750780242</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />750784579</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />750785176</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />750779899</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
	  <td>
	    <a href="https://www.roblox.com/bundles/82/Robot-Animation-Pack" target="_blank" rel="noopener">**Robot**</a>
	  </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921250460</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921255446</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921252123</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921248039, 10921248831, 10921249579</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921251156</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921253142</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921253767</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921247141</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/356/Rthro-Animation-Package" target="_blank" rel="noopener">**Rthro**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921261968</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921269718</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921263860</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921259953, 10921258489, 10921261056</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921262864</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921264784</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921265698</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921257536</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/83/Stylish-Animation-Pack" target="_blank" rel="noopener">**Stylish**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921276116</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921283326</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921279832</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921272275, 10921273958, 10921275151</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921278648</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921281000</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921281964</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921271391</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/81/Superhero-Animation-Pack" target="_blank" rel="noopener">**Superhero**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921291831</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921298616</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921294559</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921288909, 10921290167, 10921290942</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921293373</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921295495</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921297391</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921286911</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/43/Toy-Animation-Pack" target="_blank" rel="noopener">**Toy**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921306285</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921312010</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921308158</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921301576, 10921302207, 10921303913</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921307241</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921309319</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921310341</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921300839</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/33/Vampire-Animation-Pack" target="_blank" rel="noopener">**Vampire**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921320299</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921326949</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921322186</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921315373, 10921316709, 10921317792</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921321317</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921324408</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921325443</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921314188</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/32/Werewolf-Animation-Pack" target="_blank" rel="noopener">**Werewolf**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921336997</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921342074</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />1083218792</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921330408, 10921333667, 10921334755</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921337907</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921340419</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921341319</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921329322</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/80/Zombie-Animation-Pack" target="_blank" rel="noopener">**Zombie**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />616163682</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921355261</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921351278</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921344533, 10921345304, 10921347258</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921350320</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921352344</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921353442</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921343576</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/427999/adidas-Sports-Animation-Pack" target="_blank" rel="noopener">**adidas Sports**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />18537384940</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />18537392113</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />18537380791</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />18537376492, 18537371272, 18537374150</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />18537367238</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />18537389531</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />18537387180</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />18537363391</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/932296/NFL-Animation-Pack" target="_blank" rel="noopener">**NFL**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />117333533048078</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />110358958299415</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />119846112151352</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />92080889861410, 74451233229259, 80884010501210</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />129773241321032</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />136750772888868</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />79090109939093</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />134630013742019</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/1189398/Wicked-Popular-Animation-Pack" target="_blank" rel="noopener">**Popular**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />72301599441680</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />92072849924640</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />104325245285198</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />118832222982049, 76049494037641, 138255200176080</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />121152442762481</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />99384245425157</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />113199415118199</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />131326830509784</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/1601900/Catwalk-Glam-Animation-Pack-by-e-l-f" target="_blank" rel="noopener">**Catwalk Glam**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />81024476153754</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />109168724482748</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />116936326516985</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />133806214992291, 94970088341563, 87105332133518</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />92294537340807</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />134591743181628</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />98854111361360</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />119377220967554</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/455003/No-Boundaries-Animation-Pack-by-Walmart" target="_blank" rel="noopener">**No Boundaries**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />18747070484</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />18747074203</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />18747069148</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />18747067405, 18747063918, 18747065848</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />18747062535</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />18747073181</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />18747071682</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />18747060903</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/667/Oldschool-Animation-Pack" target="_blank" rel="noopener">**Oldschool**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />10921240218</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />10921244891</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />10921242013</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />10921230744, 10921232093, 10921233298</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />10921241244</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />10921243048</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />10921244018</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />10921229866</Grid>
		</Grid>
	  </td>
	</tr>
	<tr>
      <td>
        <a href="https://www.roblox.com/bundles/331856/Bold-Animation-Pack-by-e-l-f" target="_blank" rel="noopener">**Bold**</a>
      </td>
	  <td>
		<Grid container spacing={1}>
			<Grid item XSmall={4} XLarge={2}>**Run**<br />16738337225</Grid>
			<Grid item XSmall={4} XLarge={2}>**Walk**<br />16738340646</Grid>
			<Grid item XSmall={4} XLarge={2}>**Jump**<br />16738336650</Grid>
			<Grid item XSmall={12} XLarge={6}>**Idle**<br />16738333868, 16738334710, 16738335517</Grid>
			<Grid item XSmall={4} XLarge={2}>**Fall**<br />16738333171</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim**<br />16738339158</Grid>
			<Grid item XSmall={4} XLarge={2}>**Swim (Idle)**<br />16738339817</Grid>
			<Grid item XSmall={4} XLarge={2}>**Climb**<br />16744204409</Grid>
		</Grid>
	  </td>
	</tr>
  </tbody>
</table>
