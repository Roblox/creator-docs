---
title: Assistant
description: How to use the Assistant to help you build, grow, and monetize your creations.
---

The **Assistant** is an AI helper that can answer questions about building, growing, and monetizing Roblox creations. It is trained on the official Roblox documentation and is designed to answer these categories of questions:

- **Building** — Answers questions about [creating an experience](../creation.md) in Studio.
- **Scripting** — Generate simple [scripts](../scripting/index.md) and/or ask for an explanation of Lua code.
- **Growing** — Answers questions about improving an existing experience by leveraging its [analytics](../production/analytics/index.md).
- **Monetizing** — Answers questions about how to [monetize](../production/monetization/index.md) your experience.

## Using Assistant

Assistant is accessible from both the official [Documentation](../) site and within [Studio](../studio/index.md).

### From Documentation

To access Assistant from the official [Documentation](../) site:

1. In the upper navigation bar, click the **Assistant** button.

   <img src="../assets/assistant/Documentation-Button.png" width="790" />

1. Select a premade question or type your own. See [Prompting Tips](#prompting-tips) for guidance on generating improved responses.

   <img src="../assets/assistant/Documentation-Prompts.png" width="790" />

1. Based on the result, you can then:

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

   <img src="../assets/assistant/Documentation-Options.png" width="790" />

### In Studio

<Alert severity="success">
The Studio tooling is in beta. To use it, open **Beta Features** from the **File** menu and enable **Assistant**.
</Alert>

To access Assistant from Studio:

1. Click the Assistant button in the top-right corner of Studio.

   <img src="../assets/studio/general/Assistant.png" width="815" alt="Assistant button indicated in top-right area of toolbar" />

1. Type a request into the field near the bottom of the window, using guidance from [Prompting Tips](#prompting-tips) to generate improved responses. Based on the result, you can then:

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

   <img src="../assets/assistant/Studio-General-UI.png" width="360" alt="General user interface for Assistant in Studio" />

#### Quick Style

When given a request to generate a material, Assistant in Studio can quickly style existing parts through a lightweight implementation of the [Material Generator](../parts/materials.md#material-generator).

<img src="../assets/assistant/Studio-Quick-Styling-Material.png" width="360" alt="Material variations shown in Assistant for quick styling" />

#### Insert Script

If you enter a script generation request like _"Make the player jump when they touch the part"_ while you have a `Class.Part` or `Class.MeshPart` selected, Assistant will show the script's contents and add the new script instance to that part.

<img src="../assets/assistant/Studio-Script-Insert.png" width="360" alt="Requested script inserted into selected part" />

<Alert severity="info">
At times, the generated script may not function flawlessly. In such cases, you can either make further edits in the [Script Editor](../studio/script-editor.md), or select the script snippet and ask Assistant to modify it.
</Alert>

#### Explain Code

If you enter a request to explain code and you have a code snippet selected in the [Script Editor](../studio/script-editor.md), Assistant explains what that selected snippet does.

<img src="../assets/assistant/Studio-Explain-Code.png" width="360" alt="Code explanation provided by Assistant in Studio" />

## Prompting Tips

The following prompting tips enable Assistant to provide a more detailed and helpful response.

### Context and Details

The more context and examples you can provide in your prompts, the better. Instead of asking _"How can I design a core loop?"_ provide specific contextual examples, such as:

<blockquote>

_Help me design a fun core loop for my game. I want to build a game where players can hunt treasure as pirates. They can also buy and upgrade pirate ships and battle each other._

</blockquote>

### Multi-Step Prompts

Consider using a multi-step prompt to encourage Assistant to think. Instead of simply asking _"Can you explain this script to me?"_ and pasting in the script, ask it to explain step-by-step by separating the question from the script with `###`. Doing so enables Assistant to deconstruct and organize the information clearly to provide better answers.

<Tabs>
<TabItem label="Prompt">
<blockquote>

_Can you explain what this script is doing step by step?_

**\###**

_local part = workspace.Part_

_local function onTouched(otherPart)_<br />
&nbsp;&nbsp;&nbsp;&nbsp;_print(part.Name .. " collided with " .. otherPart.Name)_<br />
_end_

_part.Touched:Connect(onTouched)_

**\###**

</blockquote>
</TabItem>
<TabItem label="Assistant Response">
<blockquote>

_Certainly! This script is an example of how to handle collisions between two parts in Roblox. Let's break it down step by step:_

1. `local part = workspace.Part`: _This line of code creates a local variable named `part` and assigns it the value of the `Part` object located in the workspace. You can replace `Part` with the name of the specific part you want to detect collisions with._
2. `local function onTouched(otherPart)`: _This line of code defines a function named `onTouched` that takes in a parameter `otherPart`. This function will be called whenever the part collides with another part._
3. `print(part.Name .. " collided with " .. otherPart.Name)`: _This line of code prints a message to the output console, indicating that the `part` has collided with `otherPart`. The `part.Name` and `otherPart.Name` are concatenated using the `..` operator to form the message._
4. `part.Touched:Connect(onTouched)`: _This line of code connects the `onTouched` function to the `Touched` event of `part`. Whenever the part collides with another part, the `onTouched` function will be called._

</blockquote>
</TabItem>
</Tabs>
