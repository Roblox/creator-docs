---
title: Assistant for Studio
description: How to use Assistant to help build, grow, and monetize your creations in Studio.
---

**Assistant** is an AI helper that helps you build experiences faster by answering questions, generating content, and performing actions directly in Studio. It can do the following and much more:

- Answer questions about Roblox development
- Create and modify objects and scripts in your place's data model
- Insert assets from the Creator Store
- Explain selected code in the Script Editor
- Generate materials to restyle your objects
- Generate 3D meshes and procedural models to populate your scene

In Studio, Assistant combines a large language model (LLM) with a run-command system that can act directly on your data model. It can insert and modify objects, create scripts, and automate repetitive tasks such as updating properties in bulk.

For a more in-depth look at what Assistant can do and how to use it, see the [Prompt guide and examples](prompt-engineering.md) and the following Roblox Staff livestream for tips, tricks, and inspiration.

<iframe width="640" height="360" style={{marginTop: '36px'}} src="https://www.youtube-nocookie.com/embed/vMaOGgeuR4Y?si=fuX-80mMMzhQB6sn&amp;start=240" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

## Access Assistant from Studio

To access Assistant from Studio:

1. Click **Assistant** on the right side of the mezzanine bar.

   <img src="../assets/studio/general/Toolbar-Assistant.png" width="800" alt="Assistant button indicated on the right side of the mezzanine bar." />

2. Enter a request in the Assistant window.
    - To generate a new response, click the redo icon.
    - To rate the response and improve future results, click thumbs up or thumbs down.

     <img src="../assets/assistant/Studio-General-UI.png" width="360" alt="General user interface for Assistant in Studio." />

## Ask questions and explain code

If you need general knowledge or help while creating an experience, you can ask Assistant questions like how to make a team system, how to design a game loop, how to use specific Studio tools, and much more. It can even explain code that it generated or that you wrote yourself.

<img src="../assets/assistant/Studio-Explain-Code.png" width="360" alt="Code explanation provided by Assistant in Studio." />

## Edit your place

### Scripts

Assistant can insert new scripts, modify existing ones, and perform these actions across multiple objects as necessary. For example, if you ask it to create a remote event, it can create a local script, a server script, and the event all at once.

If you enter a script generation request like "Make the player's character jump when they touch this part," Assistant shows the script's contents and adds the new script instance to the currently selected object in the data model. If nothing is selected, Assistant decides where to place it based on your prompts.

<img src="../assets/assistant/Studio-Script-Insert.png" width="360" alt="Requested script inserted into selected part." />

The generated script might not function flawlessly. In these cases, you can either make further edits in the [Script Editor](../studio/script-editor.md) or ask Assistant to edit the script it just created. It can even act on existing scripts that it didn't create if you need help with code that you've written yourself.

### Objects and Creator Store assets

Assistant can create, edit, delete and iterate on instances in your data model, including inserting items from the Creator Store.

<img src="../assets/assistant/Studio-Object-Insert.png" width="532" alt="Assistant adding objects through the Studio prompt." />

If you examine the code, you can see that Assistant calls `Class.InsertService:GetFreeModels()` to query the Creator Store for a wheelbarrow model and uses `Class.Model:PivotTo()` to place it near a tree.

## Generate content

### Materials

When given a request to generate a material, Assistant in Studio can quickly style existing parts with a lightweight version of the [Material Generator](../studio/material-generator.md).

<img src="../assets/assistant/Studio-Quick-Styling-Material.png" width="360" alt="Material variations shown in Assistant for quick styling." />

### Meshes

To generate a textured 3D mesh:

- Use the `/generate` command followed by your prompt. For example, `/generate_mesh a red buggy with knobby tires`.
- Ask Assistant to create a mesh directly. For example, "Make a futuristic crate."
- Prompt with a reference image instead of text. `/generate_mesh` accepts either a text prompt or an image, but not both in the same request.

You can use a Part in your workspace as a **bounding box**. If you select a Part before entering a prompt, Assistant uses the Part's size and location as input and ensures the generated mesh fits within the defined space.

You can also define a **maximum triangle count** for the returned model. Lower values result in more faceted and low-poly generations. This is an optional input, which defaults to 10,000.

<img src="../assets/assistant/Studio-Generated-Green-Dragon.jpg" width="360" alt="A generated green dragon provided by Assistant in Studio." />

### Procedural models

<Alert severity="info">
You can generate up to **50 procedural models within a 24-hour rolling window**. This limit doesn't reset at a fixed time; instead, it updates continuously based on the number of requests made in the past 24 hours.
</Alert>

Use the `/generate_procedural_model` command to generate [procedural models](../parts/procedural-models.md) that scale and adapt automatically.

Procedural models let you:

- Create flexible 3D models with minimal input and adjust parameters without having to rebuild your models.
- Automatically integrate with engine features like undo/redo, Team Create, network replication, scaling, and dragger tools.
- Maintain high performance, with models behaving like standard objects until their parameters change. This means these models add almost no overhead to your experience.
- Keep generated content organized in a dedicated `GeneratedFolder`, separating source and output.

To generate a procedural model, type a command such as `/generate_procedural_model a stack of books` or attach a reference image to your prompt. Assistant then generates the procedural model and adds it directly to your workspace for further customization.

<img src="../assets/assistant/Studio-Procedural-Generation-Ferris-Wheel.png" width="360" alt="A generated ferris wheel with Assistant in Studio." />

### Segmentation

<video controls width="90%" src="/assets/assistant/Segmentation-Examples.mp4" />

Segmentation divides a generated asset into individual parts, giving you more control over customization. It lets you apply different materials, attach scripts, or replace individual components without regenerating the entire model.

When you run `/generate_mesh` or `/generate_procedural_model`, Assistant suggests a segmentation plan that defines how the model will be divided. Before generation, you can edit the proposed part list under **Part Names** by adding or removing entries, or by regenerating the suggested segmentation. Each generated asset can have a maximum of eight parts.

When the configuration is ready, click **Generate** to start generation or **Cancel** to discard the request.

For example, if you generate a skateboard and define five parts (`body`, `left rear wheel`, `right rear wheel`, `left front wheel`, and `right front wheel`), Assistant segments the model into those components, allowing you to modify each one independently.

  <Grid container spacing={3}>
    <Grid item Small={12} Medium={4} Large={4} XLarge={4}>
      <img src="../assets/assistant/Segmentation_Example.png" width="100%" alt="..." />
    </Grid>
    <Grid item Small={12} Medium={4} Large={4} XLarge={4}>
      <img src="../assets/assistant/Segmentation_Generation.png" width="100%" alt="..." />
    </Grid>
    <Grid item Small={12} Medium={4} Large={4} XLarge={4}>
      <img src="../assets/assistant/Segmentation_List.png" width="100%" alt="..." />
    </Grid>
  </Grid>

<h4 style={{marginTop: '36px'}}>Recommended part names</h4>

While any generated asset can be segmented, the recommended part names below currently produce the most reliable results for their corresponding object types.

When defining your own segmentation, use these part names as a starting point and customize them as needed.

<table>
  <thead>
    <tr>
      <th>**Object type**</th>
      <th>**Recommended part names**</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>car</td>
      <td>body, left front wheel, right front wheel, left rear wheel, right rear wheel</td>
    </tr>
    <tr>
      <td>ambulance / police car</td>
      <td>body, left front wheel, right front wheel, left rear wheel, right rear wheel, siren light bar</td>
    </tr>
    <tr>
      <td>combat car</td>
      <td>body, left front wheel, right front wheel, left rear wheel, right rear wheel, gun</td>
    </tr>
    <tr>
      <td>tow truck</td>
      <td>body, left front wheel, right front wheel, left rear wheel, right rear wheel, tow hook</td>
    </tr>
    <tr>
      <td>trailer</td>
      <td>body, left wheel, right wheel, hitch</td>
    </tr>
    <tr>
      <td>motorcycle</td>
      <td>frame, handlebars, front fork, front wheel, rear wheel</td>
    </tr>
    <tr>
      <td>skateboard</td>
      <td>body, left front wheel, right front wheel, left rear wheel, right rear wheel</td>
    </tr>
    <tr>
      <td>prop plane</td>
      <td>body, propeller</td>
    </tr>
    <tr>
      <td>combat prop plane</td>
      <td>body, propeller, gun</td>
    </tr>
    <tr>
      <td>jet plane</td>
      <td>body, thruster</td>
    </tr>
    <tr>
      <td>helicopter</td>
      <td>body, main rotor blade</td>
    </tr>
    <tr>
      <td>combat helicopter</td>
      <td>body, main rotor blade, gun</td>
    </tr>
    <tr>
      <td>drone</td>
      <td>body, left front propeller, right front propeller, left rear propeller, right rear propeller</td>
    </tr>
    <tr>
      <td>jetpack</td>
      <td>pack, thruster</td>
    </tr>
    <tr>
      <td>motor boat</td>
      <td>body, motor</td>
    </tr>
    <tr>
      <td>combat motor boat</td>
      <td>body, motor, cannon</td>
    </tr>
    <tr>
      <td>submarine</td>
      <td>hull, propeller</td>
    </tr>
    <tr>
      <td>flashlight</td>
      <td>handle body, head, lens</td>
    </tr>
    <tr>
      <td>treasure chest</td>
      <td>body, lid</td>
    </tr>
    <tr>
      <td>pickaxe</td>
      <td>handle, head</td>
    </tr>
    <tr>
      <td>gun</td>
      <td>grip, frame, barrel</td>
    </tr>
    <tr>
      <td>sniper rifle</td>
      <td>grip, frame, barrel, scope</td>
    </tr>
    <tr>
      <td>turret</td>
      <td>tripod base, swivel mount, gun body, barrel, shield plate</td>
    </tr>
    <tr>
      <td>cannon</td>
      <td>carriage base, barrel, left wheel, right wheel</td>
    </tr>
    <tr>
      <td>wand</td>
      <td>handle, tip</td>
    </tr>
    <tr>
      <td>sword</td>
      <td>handle, hand guard, blade, pommel</td>
    </tr>
    <tr>
      <td>baseball bat</td>
      <td>handle, barrel</td>
    </tr>
    <tr>
      <td>grenade</td>
      <td>grenade body, safety lever, pull pin</td>
    </tr>
  </tbody>
</table>

For more examples of working with segmented models, see the [Behaviors Reference Experience](https://www.roblox.com/games/105116507559995/Behaviors-Reference-Experience) `.rbxl` file.

## Planning Mode

Planning Mode lets you preview Assistant's next steps before execution. When you submit a complex request, Assistant generates a plan that you can review and adjust.

You can activate Planning Mode by either:

- Clicking the dropdown in the Assistant input panel and selecting **Plan**.
- Entering the command `/plan` in Assistant.

<img src="../assets/assistant/PlanningMode.png" width="400" alt="Example of Planning Mode in Assistant." />

## Skills

In Studio, Assistant uses a number of skills to help it perform tasks more consistently and comprehensively. Assistant chooses the appropriate skills automatically based on your request.

Skills are just folders with a `SKILL.md` file and any supporting resources (scripts, a `commands` directory with supplemental Markdown files, etc.). See the full list of Assistant skills in the open source repository.

<Grid container spacing={2}>
  <Grid item XSmall={12} Large={6}>
   <ScriptingLibrariesCard title="Assistant skills" description="View all of Assistant's skill files." hue="210" githubHref="https://github.com/Roblox/creator-docs/tree/main/skills" />
  </Grid>
</Grid>
