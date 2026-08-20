---
title: Build your first game with Assistant
description: Use Assistant in Roblox Studio to turn a game idea into a playable prototype.
---

Every great game starts with an idea. In this guide, you'll use [Assistant](../assistant/guide.md) as your development partner to turn your idea into a playable Roblox game. You don't need any game development experience to get started.

Assistant helps you plan, build, troubleshoot, and refine your game, but you'll also playtest its work, make decisions, and use Studio's built-in tools to customize the final experience.

The examples in this guide walk you through building a simple obby, but the same **Plan** > **Build and Playtest** > **Refine and Polish** workflow works for any game you want to create, from tycoons and shooters to simulators and RPGs.

## Before you start

Before you start, make sure you have:

- The latest version of [Roblox Studio](../studio/setup.md) installed on your computer.
- A new **Baseplate** open in Studio.
- The **Assistant** window open.
- An idea for a game. If you're not sure what to build, an obby is a great first project.

## Plan your game

<Alert severity="info">
**Goal:** By the end of this section, you'll have a clear, step-by-step plan that breaks your game into small, manageable tasks.
</Alert>

Before you build anything, you should plan your game with Assistant. A good plan helps you stay focused and avoid getting stuck halfway through.

### Create a plan

Switch Assistant to **Plan mode** by clicking the **Agent** dropdown and selecting **Plan**. Then, describe the game you want to build. Even a sentence or two is enough, but more detailed prompts often yield better results.

After you submit your idea, Assistant generates a detailed step-by-step build plan for your game. Depending on your prompt, it might also make suggestions for the UI, ask clarifying questions (like how the player wins or how many levels the game has), or suggest ways to simplify or improve your idea before generating the plan.

Review the plan before you start building. A good plan should:

- Start with the core world and gameplay, like the spawn location, level layout, and player objectives, before adding scripts and behavior.
- Build complexity gradually, leaving secondary systems like UI, scoring, and win or lose conditions until later.
- Break the work into small steps that each produce something you can playtest.

### Example: Plan an obby

Let's create a plan for a simple obby. Paste this prompt into Assistant:

> **Plan a simple obby where players jump through increasingly difficult obstacle courses to reach the end. Include checkpoints so they don't restart from the beginning when they fall.**

<video controls width="35%" src="/assets/assistant/BuildWithAssistant-Plan.mp4" />

The plan Assistant generates might look something like this:

> **Sky Obby with Checkpoints**
>
> Build a sky-themed obby with 6 increasingly difficult stages, checkpoint respawning, kill bricks, moving platforms, and a victory area:
>
>1. Build all physical obby structures (platforms, checkpoints, kill bricks, moving platforms, signs, and clouds).
>2. Create a `CheckpointHandler` script for checkpoint respawning.
>3. Create a `KillBrickHandler` script for kill brick logic.
>4. Create a `MovingPlatformHandler` script for moving platform animation.
>5. Create a `WinHandler` and `Leaderstats` script for victory detection and stage tracking.

This is a strong plan because it starts by building the physical world, then adds the scripts that make the obby interactive.

<Alert severity="info">
If Assistant's plan feels too ambitious, ask it to simplify the scope before you start building. It's much easier to add features later than to remove them.
</Alert>

<Alert severity="info">
Assistant's responses vary each time you use it. Even if you use the exact prompt from the obby example in this guide, the plan and prototype Assistant generates will likely be different. Focus on whether the core gameplay works the way you want it to, rather than trying to match the examples exactly.
</Alert>

### More game ideas

You can use the same approach with any game idea.

<table>
<thead>
  <tr>
    <th>Game</th>
    <th>Example prompt</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Shooter</td>
    <td>Plan a simple round-based game where two teams try to eliminate each other. Each round lasts 60 seconds. The team with the most eliminations wins the round. First to 3 rounds wins the match.</td>
  </tr>
  <tr>
    <td>Tycoon</td>
    <td>Plan a simple game where players build a pizza restaurant. They earn money from customers, then spend it on upgrades like faster ovens and more tables. The goal is to reach a revenue milestone.</td>
  </tr>
</tbody>
</table>

## Build a playable prototype

<Alert severity="info">
**Goal:** By the end of this section, you'll have a fully playable greybox prototype with all of the core gameplay working.
</Alert>

Once you're happy with the plan, click **Build** to have Assistant execute it. Assistant builds a playable prototype based on the steps in the plan, then provides a summary of what it created. From there, continue improving your game by asking Assistant to fix bugs, adjust gameplay, or add new features.

<Alert severity="warning">
Sometimes, Assistant reaches the maximum response length while building. If you see the message "The current response exceeded the maximum output length", click **Continue** to let Assistant resume building from where it left off.
</Alert>

### Playtest and iterate

After Assistant finishes building, playtest your game in Studio from start to finish. Focus on whether the core gameplay works as expected, then tell Assistant about anything you'd like to fix or improve.

If something is broken or doesn't feel right, tell Assistant what you found:

- Report a bug by describing what you expected to happen and what actually happened.
- Request changes to the gameplay, layout, or difficulty.
- Paste an error message from the **Output** window and ask Assistant to diagnose it.

Continue this cycle of playtesting and iterating until you can play the game from start to finish.

<table>
  <thead>
    <tr>
      <th>Scenario</th>
      <th>Example prompt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Something doesn't work</td>
      <td>When I touch a checkpoint, nothing happens. I still respawn at the start when I fall. Can you fix this?</td>
    </tr>
    <tr>
      <td>Something feels off</td>
      <td>The jumping feels too floaty. Can you make the jumps shorter and increase gravity?</td>
    </tr>
    <tr>
      <td>You want to add something</td>
      <td>Can you add a death counter below the checkpoint display so I can see how many times I've fallen?</td>
    </tr>
  </tbody>
</table>

### Example: Playtest the obby

After Assistant builds the obby, play through it from start to finish and verify that:

- **Spawn:** You spawn on the starting platform with enough room to move.
- **Platforms:** Every jump is possible, and the gaps feel fair.
- **Checkpoints:** Touching a checkpoint updates your respawn point, so you return there after falling.
- **Hazards:** Kill bricks and falling off the course eliminate your character and respawn you correctly.
- **Win zone:** Reaching the end of the obby triggers the win message.

<video controls width="70%" src="/assets/assistant/BuildWithAssistant-Playtest.mp4" />

If anything doesn't work as expected, describe the problem to Assistant and ask it to fix or improve that part of the game, then keep playtesting and iterating. Don't worry about making it look polished yet.

## Refine and polish your game

<Alert severity="info">
**Goal:** By the end of this section, you'll have refined your gameplay, polished the presentation, and prepared your game to publish or continue expanding.
</Alert>

Now that your game is playable, it's time to refine the experience and make it feel like a finished game. Throughout this process, use Assistant to make larger changes quickly and Studio to fine-tune the final details.

### Refinement tips

- Playtest after every round of changes, whether they come from Assistant or manual edits in Studio. Small changes can have unexpected effects on gameplay.
- Tackle one area at a time, such as gameplay, environment, assets, UI, or audio. This makes it easier to evaluate your changes and identify what still needs work.
- Don't be afraid to mix workflows. Use Assistant to generate or modify content quickly, then use Studio tools to fine-tune positioning, materials, lighting, and other details.

### Generate content

Assistant has built-in commands for generating models and materials that help you quickly customize your game. You can type these directly into the Assistant chat:

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>What it does</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>/generate_mesh</code></td>
      <td>Creates a single textured 3D model from a text prompt or reference image.</td>
    </tr>
    <tr>
      <td><code>/generate_procedural_model</code></td>
      <td>Creates a model that scales and adapts automatically. Good for objects you might want to resize later.</td>
    </tr>
    <tr>
      <td><code>/generate_material</code></td>
      <td>Generates a custom material and applies it to existing parts. Describe the surface you want, like weathered stone or polished wood.</td>
    </tr>
  </tbody>
</table>

You don't need to use generation commands for every change. For gameplay, environment, UI, audio, and other improvements, you can either describe the changes you want in plain language or make them directly using Studio's built-in tools.

Assistant is great for building and iterating quickly, but Studio gives you precise control over the final details.

For more information on content generation, including segmentation, see the [Assistant guide](../assistant/guide.md#generate-content).

### Example: Refine and polish the obby

Once your obby is fully playable, use Assistant to improve the environment, generate custom assets, and add new features. Then use Studio's built-in tools to fine-tune the results.

<table>
  <thead>
    <tr>
      <th>Area</th>
      <th>Start with Assistant</th>
      <th>Finish in Studio</th>
    </tr>
    </thead>
  <tbody>
    <tr>
      <td>Environment</td>
      <td>Make this obby feel like it's floating in the sky. Add a blue skybox with clouds and make the platforms look like stone bricks.</td>
      <td>Modify [Lighting](../environment/index.md) properties to fine-tune the skybox, atmosphere, and lighting. These changes apply instantly, so you can adjust values and see the effect in real-time instead of prompting and waiting.</td>
    </tr>
    <tr>
      <td>Decorative assets</td>
      <td><code>/generate_mesh</code> a stone archway and place it at the start of the game.</td>
      <td>Use the [Move, Scale, and Rotate tools](../parts/index.md#transform-parts) to reposition and resize the archway. Drag handles update in real-time, so you can place it exactly where it looks natural without re-prompting.</td>
    </tr>
    <tr>
      <td>Interactive objects</td>
      <td><code>/generate_procedural_model</code> a golden trophy and place it at the end of the obby.</td>
      <td>Adjust the trophy's size, position, color, or material in the [Properties window](../studio/properties.md). Changes preview instantly, so you can experiment with different looks without waiting for generation.</td>
    </tr>
    <tr>
      <td>Materials</td>
      <td><code>/generate_material</code> a swirling purple texture and apply it to the winning platform.</td>
      <td>Tweak the material's color, transparency, or reflectance in the [Properties window](../studio/properties.md). Each change renders immediately so you can dial in the exact look you want.</td>
    </tr>
    <tr>
      <td>User interface</td>
      <td>Add a timer at the top of the screen that starts when the player leaves spawn and stops when they reach the finish. Show the player's final time on the win screen.</td>
      <td>Reposition, resize, or restyle UI elements using the [UI tools](../ui/index.md). Drag-and-drop layout updates in real-time, making it faster to iterate on spacing and alignment than describing pixel adjustments in a prompt.</td>
    </tr>
  </tbody>
</table>

As you refine your game, switch between Assistant and Studio tools as needed. For example, you might reposition a generated archway, swap a material in the **Properties** window, tweak the lighting, or resize UI elements until everything looks and feels the way you want.

## Next steps

Congratulations! You've built a complete Roblox game with Assistant. Here are a few ways to continue improving it:

- Expand your game by adding new levels, obstacles, mechanics, or a leaderboard.
- [Publish your game](../production/publishing/publish-games-and-places.md) so other players can try it.
- [Connect Studio to an external AI assistant using the MCP](../studio/mcp.md) and [build with a coding harness](./coding-harness.md) to work across multiple files, automate larger development tasks, and iterate more quickly on complex experiences.

Every successful game starts as a simple prototype. As you build more projects, you'll get better at writing prompts, reviewing Assistant's work, playtesting your ideas, and using it as a collaborative development partner rather than relying on it to build everything for you. Happy building!
