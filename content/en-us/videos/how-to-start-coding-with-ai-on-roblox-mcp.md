---
title: How to start coding with AI on Roblox (MCP)
description: 'Spoken captions; API names can be wrong. Covers: Cursor or Visual Studio Code, the Wave Survival starter repository, Script Sync, enabling the Studio MCP server.'
date: '2026-06-11'
transcript: true
related:
  - studio/mcp.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/v8r1d80DxOY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How to start coding with AI on Roblox (MCP)](https://www.youtube.com/watch?v=v8r1d80DxOY), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on June 11, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Connect to the Roblox Studio MCP server](../studio/mcp.md).

Resources: [github.com/Roblox/creator-docs/blob/main/content/en-us/assets...](https://github.com/Roblox/creator-docs/blob/main/content/en-us/assets/solutions/WaveSurvival.zip).

## How to start coding with AI on Roblox (MCP): Introduction ([0:00](https://www.youtube.com/watch?v=v8r1d80DxOY&t=0s))

This video is for new developers and walks you through the process of getting your tools installed, connected, and ready to use in order to build Roblox games with AI assistance. No prior coding experience required.

## How to start coding with AI on Roblox (MCP): Installing dependencies ([0:13](https://www.youtube.com/watch?v=v8r1d80DxOY&t=13s))

To start, you guessed it, we need to download and install a bunch of stuff. The first one is a text editor and the world is awash with amazing options here. The most popular are Visual Studio Code and Cursor. I personally like Cursor since it has built-in support for numerous AI models and it's easy to connect to Roblox Studio, but use whichever you like. You also need Roblox Studio, our all-in-one IDE for building, testing, and publishing games on Roblox. Finally, you need Git, the free and open-source version control system from the creator of Linux. The benefit of Git is not just that you can track your changes over time or collaborate with a team. In this case, it's a safety net. If the AI agent ever does something you don't like, Git lets you revert to a known good state with a single command. You can build incrementally and safely rather than digging a deeper hole for yourself. You can install Git manually from git-scm.com, but if you're on Windows, you probably want to use winget. MacOS users probably want to use Homebrew.

## How to start coding with AI on Roblox (MCP): Downloading resources ([1:10](https://www.youtube.com/watch?v=v8r1d80DxOY&t=70s))

Download our starter repository and unzip it to a folder named Wave Survival. Open the repository in your text editor and check it out. You should see three folders. `Class.ServerScriptService` holds server scripts, things like game logic, enemy AI, wave management, etc. `Class.ReplicatedStorage` holds modules that you can share code between the client and the server. Starter Player Scripts holds client scripts that run for each player. The.gitkeep files inside each folder are just placeholders so that Git will track the otherwise empty folders.

## How to start coding with AI on Roblox (MCP): Enabling script sync ([1:44](https://www.youtube.com/watch?v=v8r1d80DxOY&t=104s))

Next, we'll create a blank project in Roblox Studio and set up ScriptSync. Just a few clicks. When you save the file, either format works, but RBXLX lets you work with Rojo more easily down the road. Rojo is for more advanced developers, but it's an awesome option for file-based workflows. Check it out. ScriptSync is still in beta, so we have to enable it first, reboot Studio, and then set it up for each folder. Just right click, ScriptSync, choose the Wave Survival folder, not the pre-made folders, thank you, and Bob's your uncle. Well, you're all set. I'm not sure why I said that. I'm not English. Anyway, it's time it's finally time. In your text editor chat panel, prompt your AI agent to create a test script that prints "Hello from ScriptSync." In Roblox Studio, check out the explorer. You should see a script pop up under `Class.ServerScriptService`.

## How to start coding with AI on Roblox (MCP): Connecting MCP ([2:31](https://www.youtube.com/watch?v=v8r1d80DxOY&t=151s))

We can script now, but Roblox Studio's MCP server enables a whole bunch of other functions, reading the game tree, creating objects, running and testing our game, and more. Let's enable it now. In the assistant window, choose manage MCP servers. Make sure MCP is enabled, and choose your text editor under quick connect. If you're using a different editor or AI coding tool, not a problem. Chances are very good you can get it working by copying and pasting the JSON snippet under setup instructions. All right, let's verify. Prompt the AI agent to use the MCP connection with Studio to read the current game tree and list everything in the workspace. Looks good to me. Now, let's create and run some test scripts to make sure everything's working. Just one more prompt. If you watch in Roblox Studio, check it out. The agent has added the scripts, but it's also started a play test and is verifying the output. Lastly, here's our safety net. We're happy with how everything is set up and want to build on top of this foundation, so let's do our initial Git commit. Two quick commands.

## How to start coding with AI on Roblox (MCP): Connecting MCP ([3:33](https://www.youtube.com/watch?v=v8r1d80DxOY&t=213s))

At this point, you're ready to start developing. Your project is synced to Studio, your AI of choice can talk to it directly, and it's easy to revert to your previous commit or discard changes with Git restore. Check out the accompanying video to build a Wave Survival game. See you there. Hey.
