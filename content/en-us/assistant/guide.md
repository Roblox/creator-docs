---
title: Assistant
description: How to use Assistant to help build, grow, and monetize your creations.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

**Assistant** is an AI helper that accelerates content creation by helping you get started, supplementing your skills, and assisting with ongoing development. It can do the following and much more:

- Answer how to do things on Roblox.
- Add and edit 3D objects and scripts directly in your place's data model.
- Insert assets from the Creator Store.
- "Explain this code" by selecting parts of a script in the Script Editor.
- Create materials to restyle your 3D objects.
- Generate 3D models to populate your scene.

<Alert severity="info">
[Built with Meta Llama 3](https://llama.meta.com/llama3/license/)
</Alert>

## Studio features

You can access Assistant from [Studio](../studio/index.md) and documentation, but Studio has the larger set of features. In Studio, Assistant consists of a large language model (LLM) that generates code and a run-command module (similar to the existing [command bar](../studio/ui-overview.md#command-bar)) that runs code.

As a result, Assistant can act directly on your data model, such as inserting and modifying 3D objects, writing and inserting scripts, and automating repetitive tasks like modifying properties in bulk.

For a more in-depth look at what Assistant can do and how to use it, see the [Prompt guide and examples](prompt-engineering.md) and the following Roblox Staff livestream for tips, tricks, and inspiration.

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/vMaOGgeuR4Y?si=fuX-80mMMzhQB6sn&amp;start=240" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Insert and modify scripts

Assistant can insert new scripts, modify existing ones, and perform these actions across multiple objects as necessary. For example, if you ask it to create a remote event, it can create a local script, a server script, and the event all at once.

<Alert severity="info">
You can access Assistant directly from the Script Editor by pressing <kbd>CMD</kbd> + <kbd>J</kbd>. If you have selected code, Assistant is aware of your selection, and you can ask contextual questions or request updates to your scripts.
</Alert>

If you enter a script generation request like "Make the player's character jump when they touch this part", Assistant shows the script's contents and adds the new script instance to the currently selected object in the data model. If nothing is selected, Assistant decides where to place it based on your prompts.

<img src="../assets/assistant/Studio-Script-Insert.png" width="360" alt="Requested script inserted into selected part." />

The generated script might not function flawlessly. In these cases, you can either make further edits in the [Script Editor](../studio/script-editor.md) or ask Assistant to edit the script it just created. It can even act on existing scripts that it didn't create if you need help with code that you've written yourself.

### Insert and modify objects

Assistant can create, edit, delete and iterate on instances in your data model, including inserting items from the Creator Store.

<img src="../assets/assistant/Studio-Object-Insert.png" width="532" alt="Assistant adding objects through the Studio prompt." />

If you examine the code, you can see that Assistant calls `Class.InsertService:GetFreeModels()` to query the Creator Store for a wheelbarrow model and uses `Class.Model:PivotTo()` to place it near a tree.

### Provide answers and suggestions

If you need general knowledge or help while creating an experience, you can ask Assistant questions like how to make a team system, design a game loop, use specific Studio tools, and much more. It can even explain code that it generated or that you wrote yourself.

<img src="../assets/assistant/Studio-Explain-Code.png" width="360" alt="Code explanation provided by Assistant in Studio." />

### Generate materials

When given a request to generate a material, Assistant in Studio can quickly style existing parts through a lightweight implementation of the [Material Generator](../studio/material-generator.md).

<img src="../assets/assistant/Studio-Quick-Styling-Material.png" width="360" alt="Material variations shown in Assistant for quick styling." />

### Generate 3D models

<BetaAlert betaName="Assistant Mesh Generation" leadIn="This feature is currently in beta. Enable it through " leadOut="." components={props.components} />

The `/generate` command enables [mesh generation](https://corp.roblox.com/newsroom/2025/03/introducing-roblox-cube), powered by Roblox's Cube 3D model.

1. In the Assistant chat window, type a command such as `/generate a red buggy with knobby tires`.
1. Assistant generates the corresponding object and adds it directly to your workspace for further customization.

<img src="../assets/assistant/Studio-Generated-Green-Dragon.jpg" width="360" alt="A generated green dragon provided by Assistant in Studio." />

## Access Assistant

Assistant is available in two locations: Studio and creator documentation.

### In Studio

To access Assistant from Studio:

1. Click the **Assistant** button on the right side of the mezzanine bar, or press <kbd>CMD</kbd> + <kbd>J</kbd>. If you have selected code in the Script Editor or objects in the viewport, Assistant is aware of your selection, and you can ask contextual questions or request updates to your data model.

   <img src="../assets/studio/general/Toolbar-Assistant.png" width="754" alt="Assistant button indicated in top-right area of toolbar." />

2. Type a request into the field near the bottom of the window, using guidance from the [prompt guide](prompt-engineering.md) to generate improved responses.

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

     <img src="../assets/assistant/Studio-General-UI.png" width="360" alt="General user interface for Assistant in Studio." />

### From documentation

To access Assistant from creator documentation:

1. In the upper navigation bar, click the **Assistant** button.

   <img src="../assets/assistant/Documentation-Button.png" width="650" />

1. Select a premade question or type your own. See the [prompt guide](prompt-engineering.md) for guidance on generating improved responses.

   <img src="../assets/assistant/Documentation-Prompts.png" width="790" />

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

     <img src="../assets/assistant/Documentation-Options.png" width="790" />
