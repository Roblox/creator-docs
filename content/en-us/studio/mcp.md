---
title: Connect to the Roblox Studio MCP server
description: Learn how to connect your AI coding tools to Roblox Studio, enabling them to read your game structure, edit scripts, insert models, execute code, and control play mode.
---

The Roblox Studio MCP server is built into Roblox Studio. It implements the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro), an open standard that lets AI tools securely communicate with external applications. Once connected, your AI client can interact directly with your open Studio session, exploring the data model, writing scripts, running Luau code, and testing your experience in play mode.

This guide shows you how to connect the Studio MCP server to popular AI clients. While the setup varies by client, the core idea is the same: you configure your client to connect to the MCP server and then send commands from the client to your active Studio session.

## Prerequisites

Before you can connect to the server, make sure you have the **latest version of Roblox Studio** and your **preferred MCP client** installed on your computer.

## How the Studio MCP server works

The server runs as a local process on your machine and communicates with the AI client using **`stdio` transport**, which uses standard input/output streams. All actions are initiated through your AI client, which then sends a request through this channel to perform actions inside your Studio session.

The server provides the following tools:

<table>
<thead>
  <tr>
    <th>**Scripts**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`script_read`</td>
    <td>Reads a script from the game using dot-notation paths (for example, `game.ServerScriptService.MyScript`). Supports reading entire scripts or specific line ranges.</td>
  </tr>
  <tr>
    <td>`multi_edit`</td>
    <td>Applies multiple edits to a script in one operation. If the target path doesn't exist, it creates a new script. Requires specifying a `datamodel_type` (Edit).</td>
  </tr>
  <tr>
    <td>`script_search`</td>
    <td>Searches for scripts by name using fuzzy matching. Returns up to 10 results.</td>
  </tr>
  <tr>
    <td>`script_grep`</td>
    <td>Searches for a string pattern across all scripts in the game. Returns up to 50 matches.</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Asset and content generation**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`generate_mesh`</td>
    <td>Generates a textured 3D mesh from a text prompt using AI.</td>
  </tr>
  <tr>
    <td>`generate_material`</td>
    <td>Generates a custom material variant. Returns the base material and material variant name to apply to parts.</td>
  </tr>
  <tr>
    <td>`generate_procedural_model`</td>
    <td>Creates 3D objects built from primitive parts (blocks, spheres, cylinders, wedges) as a ProceduralModel with configurable attributes. Supports reference images and custom part schemas.</td>
  </tr>
  <tr>
    <td>`wait_job_finished`</td>
    <td>Waits for a procedural model generation job to finish and returns the final status.</td>
  </tr>
  <tr>
    <td>`search_asset`</td>
    <td>Searches for assets across the Creator Store (public marketplace) and Creator Inventory (user, group, or universe). Supports filtering by asset type, price, tags, and scope.</td>
  </tr>
  <tr>
    <td>`insert_asset`</td>
    <td>Inserts an asset into the game by its numeric Roblox asset ID. Supports models, meshes, images, audio, video, animations, and packages.</td>
  </tr>
  <tr>
    <td>`upload_image`</td>
    <td>Uploads a batch of images from HTTP URLs to the Roblox asset server, returning an image path to asset ID map.</td>
  </tr>
  <tr>
    <td>`store_image`</td>
    <td>Loads an image from a local file path and returns an image URI that can be passed to other tools (for example, as a reference image for `generate_procedural_model`).</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Data model exploration**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`subagent`</td>
    <td>Launches a specialized subagent to handle complex, multi-step tasks autonomously. Available types include `explore` (for codebase investigation and game state queries) and `playtest` (for running gameplay scenarios and verifying outcomes).</td>
  </tr>
  <tr>
    <td>`search_game_tree`</td>
    <td>Explores the instance hierarchy as a flat JSON array. Supports filtering by path, instance type, and keywords, with configurable depth limiting.</td>
  </tr>
  <tr>
    <td>`inspect_instance`</td>
    <td>Returns detailed information about a specific instance, including all readable properties, custom attributes, and a summary of its children and descendants.</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Luau execution**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`execute_luau`</td>
    <td>Runs Luau code in Studio. Returns either the result or an error. Requires specifying a `datamodel_type` (Edit, Client, or Server).</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Playtesting**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`get_studio_state`</td>
    <td>Gets the current state of Studio, including the play state and available datamodel types.</td>
  </tr>
  <tr>
    <td>`start_stop_play`</td>
    <td>Starts or stops playtesting.</td>
  </tr>
  <tr>
    <td>`get_console_output`</td>
    <td>Retrieves output from the Studio output log.</td>
  </tr>
  <tr>
    <td>`screen_capture`</td>
    <td>Captures the current Studio viewport and returns the image data. Optionally accepts a custom camera position and look-at target.</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Player input simulation**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`character_navigation`</td>
    <td>Moves the player character to a given position or instance path. Supports a configurable speed multiplier.</td>
  </tr>
  <tr>
    <td>`user_keyboard_input`</td>
    <td>Sends one or more keyboard actions in order: key down, key up, key press, text input, or wait. Supports targeting specific UI instances.</td>
  </tr>
  <tr>
    <td>`user_mouse_input`</td>
    <td>Sends one or more mouse actions in order: move, click, button down/up, scroll, or wait. Supports targeting specific instances or screen coordinates.</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Documentation and skills**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`http_get`</td>
    <td>Fetches content from allowed Roblox documentation URLs (Engine API reference, Creator docs, Cloud API, performance optimization guides). Supports keyword search within fetched content.</td>
  </tr>
  <tr>
    <td>`skill`</td>
    <td>Retrieves detailed knowledge, best practices, or reference material for specific skills such as debugging, device simulation, and documentation search.</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Session management**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`list_roblox_studios`</td>
    <td>Lists all connected Studio instances, including their name, ID, and active status. This is useful when multiple Studio windows are open.</td>
  </tr>
  <tr>
    <td>`set_active_studio`</td>
    <td>Sets a Studio instance as active so that all subsequent tool calls target that instance.</td>
  </tr>
</tbody>
</table>

## Enable the MCP server in Studio

To enable the MCP server in Studio:

1. Open **Assistant**.
2. Click **&hellip;** &rang; **Manage MCP Servers**.
3. Turn on **Enable Studio as MCP server**.

Once enabled, the settings panel displays the quick connect option and setup instructions for different clients. When a client connects successfully, a green indicator shows the number of connected clients.

## Connect your client

You can connect your client to the Studio MCP server using quick connect, a JSON configuration, or a CLI command.

- Use **quick connect** if your client is supported.
- If not, use a **JSON configuration** if your client supports MCP config files.
- Otherwise, use a **CLI command**.

The Studio MCP server works with any client that supports `stdio` transport. After adding the configuration, follow your client's documentation to complete setup, then restart the client to apply your changes.

<Alert severity="warning">
MCP clients can read and modify content in your open Roblox places. Make sure to only connect clients you trust.
</Alert>

### Quick connect

Quick connect supports the following clients:

- Antigravity
- Codex CLI
- Claude Code
- Claude Desktop
- Cursor
- Gemini CLI
- Visual Studio Code

To connect using quick connect:

1. Go to **Assistant Settings** &rang; **MCP Servers**.
2. Expand the **Quick connect** dropdown to view supported clients installed on your computer.
3. Turn on your chosen client.

If the client you want doesn't appear in the **Quick connect** list, install it and restart Roblox Studio.

### JSON configuration

Most MCP clients support JSON configuration files. The following examples show complete configurations you can use.

If Roblox Studio is your only MCP server, use these configurations as-is. If you're using multiple MCP servers, copy the `Roblox_Studio` entry and add it to your existing `mcpServers` dictionary.

<Alert severity="info">
Your `mcp.json` file might already contain other entries. When adding the `Roblox_Studio` configuration, make sure each entry is separated by a comma. Missing commas will result in invalid JSON and prevent the configuration from loading.
</Alert>

Configurations vary by operating system:

```json title="Windows"
{
  "mcpServers": {
    "Roblox_Studio": {
      "command": "cmd.exe",
      "args": [
        "/c",
        "%LOCALAPPDATA%\\Roblox\\mcp.bat"
      ]
    }
  }
}
```

```json title="macOS"
{
  "mcpServers": {
    "Roblox_Studio": {
      "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP"
    }
  }
}
```

### CLI command

Some MCP clients require a CLI command instead of a JSON configuration. Use the appropriate command for your operating system:

```bash title="Windows"
cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat
```

```bash title="macOS"
/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP
```

## Use multiple Studio instances

You can connect a single MCP client to multiple running instances of Studio at the same time. The server automatically determines which instance to use based on context (for example, if you reference a specific experience or an object that exists only in that instance).

You can manually switch instances using `list_roblox_studios` and `set_active_studio`.

## Verify your connection

After setting up your client, verify that the connection is working in Roblox Studio:

1. Open **Assistant**.
2. Click **&hellip;** &rang; **Manage MCP Servers**.
3. Under **Enable Studio as MCP server**, check for the green indicator to confirm that the client has connected successfully.

## Troubleshooting

If the server is not showing up, or the tools aren't available:

- Restart both Roblox Studio and your MCP client.
- Verify that the command or binary path is correct and the file exists.
- Check your JSON syntax. Even a missing comma or bracket can prevent the configuration from loading.
