---
title: Assistant
description: How to use Assistant to help build, grow, and monetize your creations.
---

**Assistant** is an AI helper that accelerates content creation by helping you get started, supplementing your skills, and assisting with ongoing development. It can do the following and much more:

- Answer how to do things on Roblox
- Add and edit objects and scripts directly in your place's data model
- Insert objects from the Creator Store
- "Explain this code" by selecting parts of a script in the Script Editor
- Create materials to restyle your objects

<Alert severity="info">
[Built with Meta Llama 3](https://llama.meta.com/llama3/license/)
</Alert>

## Studio Features

You can access Assistant from [Studio](../studio/index.md) and the [documentation](/assistant), but Studio has the larger set of features. In Studio, Assistant consists of a large language model (LLM) that generates code and a run-command module (similar to the existing [command bar](../studio/ui-overview.md#command-bar)) that runs code.

As a result, Assistant can act directly on your data model, such as inserting and modifying objects, writing and inserting scripts, and automating repetitive tasks like modifying properties in bulk.

For a more in-depth look at what Assistant can do and how to use it, see the [Prompt Guide and Examples](prompt-engineering.md) and the following Roblox Staff livestream for tips, tricks, and inspiration.

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/vMaOGgeuR4Y?si=fuX-80mMMzhQB6sn&amp;start=240" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Insert and Modify Scripts

Assistant can insert new scripts, modify existing ones, and perform these actions across multiple objects as necessary. For example, if you ask it to create a remote event, it can create a local script, a server script, and the event all at once.

If you enter a script generation request like "Make the player's character jump when they touch this part," Assistant shows the script's contents and adds the new script instance to the currently selected object in the data model. If nothing is selected, Assistant decides where to place it based on your prompts.

<img src="../assets/assistant/Studio-Script-Insert.png" width="360" alt="Requested script inserted into selected part." />

The generated script might not function flawlessly. In these cases, you can either make further edits in the [Script Editor](../studio/script-editor.md) or ask Assistant to edit the script it just created. It can even act on existing scripts that it didn't create if you need help with code that you've written yourself.

### Insert and Modify Objects

Assistant can create, edit, delete and iterate on instances in your data model, including inserting items from the Creator Store.

<img src="../assets/assistant/Studio-Object-Insert.png" width="532" alt="Assistant adding objects through the Studio prompt." />

If you examine the code, you can see that Assistant calls `Class.InsertService:GetFreeModels()` to query the Creator Store for a wheelbarrow model and uses `Class.Model:PivotTo()` to place it near a tree.

### Provide Answers and Suggestions

If you need general knowledge or help while creating an experience, you can ask Assistant questions like how to make a team system, how to design a game loop, how to use specific Studio tools, and much more. It can even explain code that it generated or that you wrote yourself.

<img src="../assets/assistant/Studio-Explain-Code.png" width="360" alt="Code explanation provided by Assistant in Studio." />

### Generate Materials

When given a request to generate a material, Assistant in Studio can quickly style existing parts through a lightweight implementation of the [Material Generator](../studio/material-generator.md).

<img src="../assets/assistant/Studio-Quick-Styling-Material.png" width="360" alt="Material variations shown in Assistant for quick styling." />

## Accessing Assistant

Assistant is available in two locations: Studio and the documentation.

### In Studio

To access Assistant from Studio:

1. Click the **Assistant** button in the top-right corner.

   <img src="../assets/studio/general/Toolbar-Assistant.png" width="754" alt="Assistant button indicated in top-right area of toolbar." />

2. Type a request into the field near the bottom of the window, using guidance from the [Prompt Guide](prompt-engineering.md) to generate improved responses.

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

     <img src="../assets/assistant/Studio-General-UI.png" width="360" alt="General user interface for Assistant in Studio." />

### From the Documentation

To access Assistant from the [documentation](/assistant):

1. In the upper navigation bar, click the **Assistant** button.

   <img src="../assets/assistant/Documentation-Button.png" width="650" />

1. Select a premade question or type your own. See the [Prompt Guide](prompt-engineering.md) for guidance on generating improved responses.

   <img src="../assets/assistant/Documentation-Prompts.png" width="790" />

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

     <img src="../assets/assistant/Documentation-Options.png" width="790" />
