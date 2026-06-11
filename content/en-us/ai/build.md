---
title: Build with a coding harness
description: Connect an AI-enabled text editor to Roblox Studio with Script Sync and MCP.
---

This guide and accompanying video walks you through connecting an AI-enabled coding hardness to Roblox Studio via MCP, so that your agent can read, write, and playtest on your behalf.

By the end, you'll have a project folder that syncs to Studio through **Script Sync** (a feature that lets you use your own editor to write code), an **MCP** connection that lets your agent drive Studio directly, and a Git repository ready for development.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/v8r1d80DxOY?si=3uMq4HVEh3Ur2uuV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1: Install the prerequisites

You'll need the following components before getting started:

1. **An AI-enabled text editor** - The most popular options are [Visual Studio Code](https://code.visualstudio.com) and [Cursor](https://cursor.com). Cursor has its AI assistant built in, while VS Code needs an extension like [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code). Both work well here, so use whichever you prefer.
2. **Roblox Studio** - Download it from [create.roblox.com](https://create.roblox.com/docs/studio/setup).
3. **Git** - Install it from [git-scm.com](https://git-scm.com/install).
   - On Windows, you can use [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/): `winget install --id Git.Git -e --source winget`.
   - On macOS, you can use [Homebrew](https://brew.sh/): `brew install git`.

## Step 2: Sign in to everything

1. **Your text editor:**
   - **VS Code** — Signing in varies by extension. For Claude Code, click the Claude icon in the activity bar, sign in with your Anthropic account, and confirm the chat panel opens. Other providers are similar.
   - **Cursor** — Open Cursor, sign in with your Cursor account, and confirm the chat panel opens. You can use any model you prefer.
2. **Roblox Studio** — Open Studio, sign in with your Roblox account, and confirm you can create a new place.

## Step 3: Download the starter repository

The starter repository gives you the folder layout and a `.gitignore` file so Git only commits the parts of your project that matter. Most of the manual setup is done for you.

1. Download the [starter repository](../assets/solutions/WaveSurvival.zip) and unzip it. It already contains a folder named `WaveSurvival`.
2. In your editor, choose **File → Open Folder** and select `WaveSurvival`. You should see three folders inside:
   - `ServerScriptService/` holds server scripts, such as game logic, enemy AI, and wave management.
   - `ReplicatedStorage/` holds shared modules that both the server and client can use.
   - `StarterPlayerScripts/` holds client scripts that run for each player.

The `.gitkeep` files inside each folder are placeholders so that Git tracks the folders while they are still empty.

## Step 4: Create a blank project in Roblox Studio

1. Open Roblox Studio and click **New Experience**.
2. Choose **File → Save to File**, navigate to your `WaveSurvival` folder, and save the place as `WaveSurvival.rbxlx`. The starter repository's `.gitignore` already excludes `.rbxlx` files from Git.
3. Keep Studio open. You will need it for Script Sync and MCP.

## Step 5: Enable the Script Sync beta

Script Sync is a beta feature, so you need to turn it on before you can use it.

<Alert severity="info">
Studio updates often. If you do not see **Script Sync** in the list, install the [latest version of Studio](https://create.roblox.com/download) and try again.
</Alert>

1. In Studio, choose **File → Beta Features**.
2. Find **Script Sync**, enable it, and click **Save**.
3. Restart Studio when prompted.

## Step 6: Connect Script Sync

You connect Script Sync once per project by linking each Studio service to its matching folder on disk.

1. In the Explorer, right-click **ServerScriptService**.
2. Choose **Script Sync → Sync to**, then browse to your `WaveSurvival` folder.
3. Repeat for **ReplicatedStorage** and **StarterPlayerScripts**.

<Alert severity="warning">
Select the top-level `WaveSurvival` folder, not the folders inside it. Because the folders already have the correct names, Script Sync matches each service to the right one automatically.
</Alert>

Any `.luau` files you create in those folders now appear as scripts in Studio automatically.

## Step 7: Verify Script Sync

In your editor's chat panel, prompt your agent:

> Create a test script at `ServerScriptService/Test.server.luau` that prints 'Hello from Script Sync!' to the output.

In Studio, check the Explorer. You should see `Test` appear under **ServerScriptService**. You will run a deeper, agent-driven check after MCP is connected.

## Step 8: Enable the MCP connection

The Studio MCP server lets your AI agent interact with Studio directly, reading the game tree, creating objects, running scripts, and checking output. It covers anything Script Sync cannot reach, such as **StarterGui** and **StarterPack**.

1. In Studio, open the Assistant window using the **Assistant** button in the upper right.
2. Click **⋯ → Manage MCP Servers**.
3. Confirm MCP is enabled.
4. Under **Quick connect**, enable Cursor or Visual Studio Code.

If you installed your editor while Studio was open, you may need to restart Studio, your editor, or both to establish the connection. For more detail, see [Connect to the Roblox Studio MCP server](../studio/mcp.md).

## Step 9: Verify the MCP connection

Prompt your agent:

> Use the Roblox MCP to read the current game tree in Roblox Studio. List what's in Workspace.

You might need to approve the command or add the MCP tool to an allowlist. For a fresh Baseplate template, the response describes the default `Camera`, `Terrain`, `Baseplate`, and `SpawnLocation` and confirms there is no other content yet.

## Step 10: Run an end-to-end check

Prompt your agent to verify the full setup at once:

> Use the Roblox MCP connection to verify Script Sync is working properly. Make some changes to Test.server.luau, add new scripts in the other two folders, and verify the output of each. Run `game:GetService("InstanceFileSyncService"):GetStatus(instance)` in each script to verify the sync status. When you're done, delete all three scripts.

Watch in Studio and you will see the agent start a playtest to confirm the output.

## Step 11: Commit to Git

You now have a clean, working configuration, which makes this a good moment to commit. From your terminal:

```bash
git add .
git commit -m "Script sync connected and MCP verified"
```

## Next steps

Your project is now synced to Studio, your AI agent can talk to it directly, and you have a Git repository to track changes and progress.

From here, you can use the `WAVE_SURVIVAL.md` file from the starter project as context for your agent to build a wave survival game.
Follow along with companion video to build the game one tested phase at a time.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/4PY2IEG0LA8?si=ynCGtp3YSPax1fGB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
