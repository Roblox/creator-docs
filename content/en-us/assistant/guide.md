---
title: Assistant for Studio
description: How to use Assistant to help build, grow, and monetize your creations in Studio.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

**Assistant** is an AI helper that accelerates content creation by helping you get started, supplementing your skills, and assisting with ongoing development. It can do the following and much more:

- Answer how to do things on Roblox
- Add and edit objects and scripts directly in your place's data model
- Insert objects from the Creator Store
- "Explain this code" by selecting parts of a script in the Script Editor
- Create materials to restyle your objects
- Generate 3D objects to populate your scene

## Studio features

In Studio, Assistant consists of a large language model (LLM) that generates code and a run-command module (similar to the existing [Command&nbsp;Bar](../studio/ui-overview.md#command-bar)) that runs code. As a result, Assistant can act directly on your data model, such as inserting and modifying objects, writing and inserting scripts, and automating repetitive tasks like modifying properties in bulk.

For a more in-depth look at what Assistant can do and how to use it, see the [Prompt guide and examples](prompt-engineering.md) and the following Roblox Staff livestream for tips, tricks, and inspiration.

<iframe width="640" height="360" style={{marginTop: '36px'}} src="https://www.youtube-nocookie.com/embed/vMaOGgeuR4Y?si=fuX-80mMMzhQB6sn&amp;start=240" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

### Insert and modify scripts

Assistant can insert new scripts, modify existing ones, and perform these actions across multiple objects as necessary. For example, if you ask it to create a remote event, it can create a local script, a server script, and the event all at once.

If you enter a script generation request like "Make the player's character jump when they touch this part," Assistant shows the script's contents and adds the new script instance to the currently selected object in the data model. If nothing is selected, Assistant decides where to place it based on your prompts.

<img src="../assets/assistant/Studio-Script-Insert.png" width="360" alt="Requested script inserted into selected part." />

The generated script might not function flawlessly. In these cases, you can either make further edits in the [Script Editor](../studio/script-editor.md) or ask Assistant to edit the script it just created. It can even act on existing scripts that it didn't create if you need help with code that you've written yourself.

### Insert and modify objects

Assistant can create, edit, delete and iterate on instances in your data model, including inserting items from the Creator Store.

<img src="../assets/assistant/Studio-Object-Insert.png" width="532" alt="Assistant adding objects through the Studio prompt." />

If you examine the code, you can see that Assistant calls `Class.InsertService:GetFreeModels()` to query the Creator Store for a wheelbarrow model and uses `Class.Model:PivotTo()` to place it near a tree.

### Provide answers and suggestions

If you need general knowledge or help while creating an experience, you can ask Assistant questions like how to make a team system, how to design a game loop, how to use specific Studio tools, and much more. It can even explain code that it generated or that you wrote yourself.

<img src="../assets/assistant/Studio-Explain-Code.png" width="360" alt="Code explanation provided by Assistant in Studio." />

### Generate materials

When given a request to generate a material, Assistant in Studio can quickly style existing parts with a lightweight version of the [Material Generator](../studio/material-generator.md).

<img src="../assets/assistant/Studio-Quick-Styling-Material.png" width="360" alt="Material variations shown in Assistant for quick styling." />

### Generate meshes

To generate a textured 3D mesh:

- Use the `/generate` command followed by your prompt. For example, `/generate_mesh a red buggy with knobby tires`.
- Ask Assistant to create a mesh directly. For example, "Make a futuristic crate."

You can use a Part in your workspace as a **bounding box**. If you select a Part before entering a prompt, Assistant uses the Part's size and location as input and ensures the generated mesh fits within the defined space.

You can also define a **maximum triangle count** for the returned model. Lower values result in more faceted and low-poly generations. This is an optional input, which defaults to 10,000.

<img src="../assets/assistant/Studio-Generated-Green-Dragon.jpg" width="360" alt="A generated green dragon provided by Assistant in Studio." />

### Generate procedural models

<Alert severity="info">
You can generate up to **50 procedural models within a 24-hour rolling window**. This limit doesn't reset at a fixed time; instead, it updates continuously based on the number of requests made in the past 24 hours.
</Alert>

Use the `/generate_procedural_model` command to generate [procedural models](../parts/procedural-models.md) that scale and adapt automatically.

Procedural models let you:

- Create flexible 3D models with minimal input and adjust parameters without having to rebuild your models.
- Automatically integrate with engine features like undo/redo, Team Create, network replication, scaling, and dragger tools.
- Maintain high performance, with models behaving like standard objects until their parameters change. This means these models add almost no overhead to your experience.
- Keep generated content organized in a dedicated `GeneratedFolder`, separating source and output.

To generate a procedural model, type a command such as `/generate_procedural_model a stack of books` in the Assistant chat window. Assistant then generates the procedural model and adds it directly to your workspace for further customization.

<img src="../assets/assistant/Studio-Procedural-Generation-Ferris-Wheel.png" width="360" alt="A generated ferris wheel with Assistant in Studio." />

### Planning Mode

Planning Mode lets you preview Assistant's next steps before execution. When you submit a complex request, Assistant generates a plan that you can review and adjust.

You can activate Planning Mode by either:

- Clicking the dropdown in the Assistant input panel and selecting **Plan**
- Entering the command `/plan` in Assistant

<img src="../assets/assistant/PlanningMode.png" width="400" alt="Example of Planning Mode in Assistant." />

## Access Assistant from Studio

To access Assistant from Studio:

1. Click **Assistant** on the right side of the mezzanine bar.

   <img src="../assets/studio/general/Toolbar-Assistant.png" width="800" alt="Assistant button indicated on the right side of the mezzanine bar." />

2. Type a request into the field near the bottom of the window, using guidance from the [prompt guide](prompt-engineering.md) to generate improved responses.

   - Click thumbs up or thumbs down to rate the result and improve future results.
   - Click the redo icon to process a new result.

     <img src="../assets/assistant/Studio-General-UI.png" width="360" alt="General user interface for Assistant in Studio." />
