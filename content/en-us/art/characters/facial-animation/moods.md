---
title: Moods
description: Moods are a type of facial animation that loop indefinitely, allowing users to express persistent facial emotion.
---

A **mood** is a type of [facial animation](../../../art/characters/facial-animation/index.md) for animatable heads that loops indefinitely, allowing users to express themselves and react to others with a persistent facial emotion. Moods play simultaneously with other character [default animations](../../../animation/using.md#replacing-default-animations), such as walking, climbing, and swimming, and if the default animation has a facial animation, the default animation blends with the character's mood.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../../assets/avatar/dynamic-heads/moods/Overview-Default-Mood.mp4" width="70%"></video>
    <figcaption>Default mood</figcaption>
  </figure>
	<figure>
    <video controls src="../../../assets/avatar/dynamic-heads/moods/Overview-Open-Mouth-Mood.mp4" width="70%"></video>
    <figcaption>Open mouth mood</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
   A mood is a type of facial animation, but not all facial animations are moods. While a mood refers to a specific animation slot that belongs to each character, a facial animation refers to **any** animation that modifies the face channels.
</Alert>

## Creating Moods

If you have a character model with an animatable head, you can create any mood animation you can think of using the [Face Animation Editor](../../../art/characters/facial-animation/animating-heads.md#using-the-face-animation-editor). If you don't want to use the [Blocky](../../../assets/avatar/dynamic-heads/reference-files/BlockyCharacter.fbx) or [Goblin](../../../assets/avatar/dynamic-heads/reference-files/GoblinCharacter.fbx) reference character models, you can create or modify an existing model to support animated heads in a third-party modeling software, such as Blender or Maya. For information on how to create an animatable head, see [Creating Basic Heads](../../../art/characters/facial-animation/creating-basic-heads.md).

To create a mood:

1. Add a character model with an animatable head to the viewport.
1. Open the **Face Animation Editor**.

   1. In the menu bar, navigate to the **Avatar** tab.
   1. In the **Animation** section, click on the Animation Editor. The Animation Editor window displays.

      <img width="760" img src="../../../assets/studio/general/Avatar-Tab-Animation-Editor.png" />

   1. In the viewport, select your character model with an animatable head. A dialog displays.

      <img width="40%" img src="../../../assets/animation/animation-editor/Create-Animation-Dialog.png" />

   1. In the **Animation Name** field, enter a new animation name, then click the **Create** button. The Animation Editor window displays the **media and playback controls**, **timeline**, and **track list**.
   1. In the **track list** of the Animation Editor, click the **Face** button. The **Face Animation Editor** displays to the left of the track list.

1. In the **Face Animation Editor**, adjust sliders for the facial parts you want to manipulate. Animation tracks for each facial part you manipulate automatically display in the track list along with keyframes for your current position in the timeline. The character's face also updates in the viewport.

   - To undo a step on a slider, press <kbd>Ctrl</kbd><kbd>Z</kbd> (<kbd>⌘</kbd><kbd>Z</kbd>).
   - To redo a step on a slider, press <kbd>Ctrl</kbd><kbd>Y</kbd> (<kbd>⌘</kbd><kbd>Y</kbd>).
   - To reset a slider to its default value, right click on the slider. A contextual menu displays. Select **Reset Selected**.

1. When you are finished creating your animation, navigate to the **Media and Playback Controls** and click the **…** button. A pop-up menu displays.

   <img width="60%" img src="../../../assets/animation/animation-editor/Controls-File-Menu.png" />

1. Select **Save** or **Save As** to save the mood animation. The animation displays in the **Explorer** window as a child of the **AnimSaves** object (itself a child of the rig).

   <img width="20%" img src="../../../assets/avatar/dynamic-heads/moods/HappyMood.png" />

1. **(Optional)** To assign an asset ID to your mood animation and save it to the [Toolbox](../../../projects/assets/toolbox.md) to use across your experiences,

   1. In the **Explorer** window, right-click on your new mood animation. A contextual menu displays.
   1. Select **Save to Roblox**. The **Asset Configuration dialog** displays.
   1. Fill in the following fields:

      - **Title**: A name for your plugin.
      - **Description**: A description that describes what a potential user should expect the plugin to do.
      - **Creator**: The creator you'd like to attribute as the creator of the plugin. If you are using Team Create, every creator appears, otherwise "Me" is the only option.

   1. Click the **Submit** button. After a moment, the Asset Configuration dialog displays your mood's `Class.Animation.AnimationID` that you can use to set the mood to characters within your experiences.

      <img width="80%" img src="../../../assets/avatar/dynamic-heads/moods/Animation-ID.png" />

## Setting Moods

Every character with an animatable head has a child **Animate** `Class.LocalScript` with a child **mood** `Class.StringValue` that contains the mood animation that plays on the character's head. The mood animation's default `Class.Animation.AnimationID` plays a smiling animation, but you can change the character's mood to something else by either directly editing the `Class.Animation.AnimationID` within the mood `Class.StringValue`, or using the `Class.HumanoidDescription` system.

<img src="../../../assets/avatar/dynamic-heads/moods/animate-localscript-hierarchy.jpg" width="20%" />

<Alert severity="warning">
   The code for playing moods doesn't occur in the  **Animate** `Class.LocalScript`, but in a hidden, internal Roblox script. While you can't edit this internal script, the **mood** `Class.StringValue` allows you to interact with it in order to customize moods within your experiences.
</Alert>

### Editing AnimationIds

You can set a specific mood for each character within your experience by editing their mood's `Class.Animation.AnimationID` whenever a user triggers an event. For example, the following `Class.Script` edits any previously set mood to an animation that [opens the character's mouth](https://www.roblox.com/library/7715145252/moods-11-FaceAnimation) as soon as the user enters the experience:

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character)
	local humanoid = character:WaitForChild("Humanoid")
	local animateScript = character:WaitForChild("Animate")
	animateScript.mood.Animation1.AnimationId = "rbxassetid://7715145252"    -- Mood
end

local function onPlayerAdded(player)
	player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

### Using the HumanoidDescription

You can also use the `Class.HumanoidDescription` system to find user characters and edit their `Class.Animation.AnimationID|AnimationIDs` for any default animation. For example, the following `Class.Script` edits any previously set mood to an animation that gives the character a [half-smile](https://www.roblox.com/catalog/10725833199/Chiseled-Good-Looks-Mood) on the left-side of their face whenever their character is idling:

```lua
local humanoid = player.Character and player.Character:FindFirstChild("Humanoid")
if humanoid then
    local descriptionClone = humanoid:GetAppliedDescription()
    descriptionClone.IdleAnimation = 10725833199
    -- Apply modified "descriptionClone" to humanoid
    humanoid:ApplyDescription(descriptionClone)
end
```

## Disabling Moods

To disable moods from your experience, you can delete the mood object underneath the **Animate** `Class.LocalScript`. For example, the following `Class.Script` removes every character's **mood** `Class.StringValue` as soon as they join the experience:

```lua
local Players = game:GetService("Players")

local function onCharacterAdded(character)
	local humanoid = character:WaitForChild("Humanoid")
	local animateScript = character:WaitForChild("Animate")
	animateScript.mood:Destroy()
end

local function onPlayerAdded(player)
	player.CharacterAppearanceLoaded:Connect(onCharacterAdded)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```
