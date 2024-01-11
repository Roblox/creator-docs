---
title: Proximity Prompts
description: Proximity Prompts allow users to trigger actions when they approach objects in the 3D space.
---

`Class.ProximityPrompt` objects
encourage user interaction to trigger an action when they approach in-experience
objects such as doors, light switches, and buttons. Using this object, you can:

- Indicate what objects a user can interact with in the experience.
- Display the action a user can take on the object, then trigger the action through user input such as pressing or holding a key.
- Display the correct input for all input types, such a keyboard, gamepad, and touchscreen keys.

<video src="../assets/ui/proximity-prompt/Showcase.mp4" controls width="100%" alt="User interacting with proximity prompts to perform actions in the experience"></video>

<Alert severity="info">
See the [Dungeon Delve](https://www.roblox.com/games/6074153281/Dungeon-Delve) sample place for the fully working proximity prompt examples shown in the video above.
</Alert>

## Creating Proximity Prompts

You must parent proximity prompts to the part, model, or attachment that you want a user to interact with. To add a proximity prompt to a `Class.BasePart`, `Class.Model`, or `Class.Attachment` object:

1. In the [Explorer](../studio/explorer.md) window, hover over the `Class.BasePart`, `Class.Model`, or `Class.Attachment` and click the &CirclePlus; button. A contextual menu displays.
1. From the menu, insert a **ProximityPrompt**.

   <img src="../assets/ui/proximity-prompt/ProximityPrompt-New.png" width="320" alt="Explorer hierarchy showing a ProximityPrompt parented to an Attachment" />

## Customizing Proximity Prompts

You can customize a proximity prompt based on how you want it to [appear](#appearance), when you want it to be [visible](#visibility), and what you want a user to do to [trigger the action](#interactivity).

### Appearance

Proximity prompts need to communicate three things:

- The **object** that a user can interact with.
- The **action** that triggers when they interact with the proximity
  prompt.
- The **key** that a user must press or hold.

You can specify these through the following properties:

- `Class.ProximityPrompt.ObjectText|ObjectText` An optional name for the object a user can interact with.
- `Class.ProximityPrompt.ActionText|ActionText` An optional name for the action a user will trigger.
- `Class.ProximityPrompt.KeyboardKeyCode|KeyboardKeyCode` The keyboard key a user must press or hold to trigger the action.
- `Class.ProximityPrompt.GamepadKeyCode|GamepadKeyCode` The gamepad key a user must press or hold to trigger the action.

  <img src="../assets/ui/proximity-prompt/Prompt-Diagram.png" width="600" alt="Diagram indicating basic elements of a ProximityPrompt" />

### Visibility

You can control when the proximity prompt is visible through its `Class.ProximityPrompt.MaxActivationDistance|MaxActivationDistance`, `Class.ProximityPrompt.RequiresLineOfSight|RequiresLineOfSight`, and `Class.ProximityPrompt.Exclusivity|Exclusivity` properties.

#### MaxActivationDistance

The `Class.ProximityPrompt.MaxActivationDistance|MaxActivationDistance` property allows you to define the range from around the `Class.ProximityPrompt` object that activates the visibility of the proximity prompt. Once a user's character enters that range, the proximity prompt becomes visible.

<img src="../assets/ui/proximity-prompt/MaxActivationDistance.jpg" width="800" alt="Diagram indicating how a character's distance from a ProximityPrompt object affects whether the prompt appears on screen" />

#### RequiresLineOfSight

The `Class.ProximityPrompt.RequiresLineOfSight|RequiresLineOfSight` property activates the visibility of the proximity prompt when there's a clear path from the **camera** to the `Class.ProximityPrompt` object. By default, this property is set to true.

<video src="../assets/ui/proximity-prompt/RequiresLineOfSight.mp4" controls width="800" alt="Video showing how player's line of sight affects the appearance of a ProximityPrompt on screen"></video>

#### Exclusivity

If a user's character is within range of multiple proximity prompts, each proximity prompt's visibility depends on which proximity prompt the camera is pointing at, as well as each proximity prompt's `Class.ProximityPrompt|Exclusivity` property value.

<Tabs>
<TabItem label="OnePerButton">

<figure>
<img src="../assets/ui/proximity-prompt/Exclusivity-OnePerButton.jpg" width="800" alt="ProximityPrompt objects set to exclusivity of OnePerButton" />
<figcaption>Only one proximity prompt is visible per input keycode. If multiple in-range proximity prompts use different keycodes, they are all visible. However, if multiple in-range proximity prompts use the same keycode, only one proximity prompt is visible at any given time, depending on the camera's view direction.</figcaption>
</figure>

</TabItem>
<TabItem label="OneGlobally">

<figure>
<img src="../assets/ui/proximity-prompt/Exclusivity-OneGlobally.jpg" width="800" alt="ProximityPrompt objects set to exclusivity of OneGlobally" />
<figcaption>If multiple proximity prompts are set to this exclusivity, only one prompt is visible at any given time, regardless of the character's proximity or the prompt's keycode. The camera's view direction determines which proximity prompt is visible, useful for minimizing prompt distraction when there are several in an area.</figcaption>
</figure>

</TabItem>
<TabItem label="AlwaysShow">

<figure>
<img src="../assets/ui/proximity-prompt/Exclusivity-AlwaysShow.jpg" width="800" alt="ProximityPrompt objects set to exclusivity of AlwaysShow" />
<figcaption>Proximity prompts are always visible when in range, assuming no other factors prevent them from being visible. Be cautious when using this setup, as all visible prompts using the same keycode will trigger on a player's input of that keycode.</figcaption>
</figure>

</TabItem>
</Tabs>

### Interactivity

You can customize how a user interacts with a proximity prompt through its `Class.ProximityPrompt.HoldDuration|HoldDuration` and `Class.ProximityPrompt.ClickablePrompt|ClickablePrompt` properties.

#### HoldDuration

The `Class.ProximityPrompt.HoldDuration|HoldDuration` property determines how many seconds a user has to press a key before the proximity prompt's action triggers. If this property has a value of `0`, the proximity prompt's action triggers immediately.

<video src="../assets/ui/proximity-prompt/HoldDuration.mp4" controls width="800" alt="Video of a proximity prompt's guage increasing as the player holds down its associated input"></video>

#### ClickablePrompt

The `Class.ProximityPrompt.ClickablePrompt|ClickablePrompt` property specifies if a user can click on a proximity prompt to trigger its action. When set to **true**, a user can interact with the proximity prompt by directly clicking the proximity prompt **or** by pressing the specified key. When set to **false**, a user can only interact with the proximity prompt by pressing the specified key.

<Alert severity="warning">
  Note that if a user is using a phone or a tablet, they can always interact with the proximity prompt by directly clicking the proximity prompt regardless of the `Class.ProximityPrompt.ClickablePrompt|ClickablePrompt` property's value.
</Alert>

## Scripting Proximity Prompts

You can connect to proximity prompt events either on the `Class.ProximityPrompt` object itself or globally through `Class.ProximityPromptService`. The `Class.ProximityPromptService` allows you to manage all proximity prompt behavior from one location, preventing any need for duplicate code in your experience.

<table>
<thead>
  <tr>
    <th>Event</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ProximityPromptService.Triggered|Triggered`</td>
    <td>Fires when a player interacts with a proximity prompt (after the duration for a prompt with non-zero `Class.ProximityPrompt.HoldDuration|HoldDuration`).</td>
  </tr>
  <tr>
    <td>`Class.ProximityPromptService.TriggerEnded|TriggeredEnded`</td>
    <td>Triggers when the player stops interacting with a proximity prompt.</td>
  </tr>
  <tr>
    <td>`Class.ProximityPromptService.PromptButtonHoldBegan|PromptButtonHoldBegan`</td>
    <td>Fires when a player begins interacting with a proximity prompt with a non-zero `Class.ProximityPrompt.HoldDuration|HoldDuration` value.</td>
  </tr>
  <tr>
    <td>`Class.ProximityPromptService.PromptButtonHoldEnded|PromptButtonHoldEnded`</td>
    <td>Fires when a player stops interacting with a proximity prompt with a non-zero `Class.ProximityPrompt.HoldDuration|HoldDuration` value.</td>
  </tr>
  <tr>
    <td>`Class.ProximityPromptService.PromptShown|PromptShown`</td>
    <td>Triggers in `Class.LocalScript|LocalScripts` when a proximity prompt is made visible.</td>
  </tr>
  <tr>
    <td>`Class.ProximityPromptService.PromptHidden|PromptHidden`</td>
    <td>Triggers in `Class.LocalScript|LocalScripts` when a prompt is hidden.</td>
  </tr>
</tbody>
</table>

The following code sample includes a basic framework for using `Class.ProximityPromptService`:

```lua
local ProximityPromptService = game:GetService("ProximityPromptService")
-- Detect when prompt is triggered
local function onPromptTriggered(promptObject, player)
end
-- Detect when prompt hold begins
local function onPromptHoldBegan(promptObject, player)
end
-- Detect when prompt hold ends
local function onPromptHoldEnded(promptObject, player)
end
-- Connect prompt events to handling functions
ProximityPromptService.Triggered:Connect(onPromptTriggered)
ProximityPromptService.PromptButtonHoldBegan:Connect(onPromptHoldBegan)
ProximityPromptService.PromptButtonHoldEnded:Connect(onPromptHoldEnded)
```
