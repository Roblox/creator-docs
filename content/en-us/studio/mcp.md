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
    <td>Reads a scripts from the game using dot-notation paths (for example, `game.ServerScriptService.MyScript`). Supports reading entire scripts or specific line ranges.</td>
  </tr>
  <tr>
    <td>`multi_edit`</td>
    <td>Applies multiple edits to a script. If the target path doesn't exist, it creates a new script.</td>
  </tr>
  <tr>
    <td>`script_search`</td>
    <td>Searches for scripts by name using fuzzy matching. Returns up to 10 results.</td>
  </tr>
  <tr>
    <td>`script_grep`</td>
    <td>Searches for a string pattern across all script in the game. Returns up to 50 matches.</td>
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
    <td>Generates a textured 3D mesh.</td>
  </tr>
  <tr>
    <td>`generate_material`</td>
    <td>Generates custom material or texture.</td>
  </tr>
  <tr>
    <td>`insert_from_creator_store`</td>
    <td>Inserts assets, plugins, and models from the Creator Store.</td>
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
    <td>`search_game_tree`</td>
    <td>Explores the instance hierarchy as a flat JSON array. Supports filtering by path, instance type, and keywords.</td>
  </tr>
  <tr>
    <td>`inspect_instance`</td>
    <td>Returns detailed information about a specific instance, including readable properties, custom attributes, and a summary of its children and descendants.</td>
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
    <td>Runs Luau code in Studio. Returns either the result or an error.</td>
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
    <td>`start_stop_play`</td>
    <td>Starts or stops playtesting.</td>
  </tr>
  <tr>
    <td>`console_output`</td>
    <td>Retrieves output logs while the game is running.</td>
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
    <td>Moves the player character to a position or instance.</td>
  </tr>
  <tr>
    <td>`keyboard_input`</td>
    <td>Simulates key presses, key holds, and text input.</td>
  </tr>
  <tr>
    <td>`mouse_input`</td>
    <td>Simulates mouse clicks, movement, and scrolling.</td>
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

Once enabled, the settings panel displays the JSON configuration and startup command for your client. When a client connects successfully, a green indicator shows the number of connected clients.

## Connect your client

<Alert severity="warning">
MCP clients can read and modify content in your open Roblox places. Make sure to only connect clients you trust.
</Alert>

To connect your client to the server, you can use either a JSON configuration or a CLI command.

If your client supports MCP config files, use the JSON configuration. Otherwise, use the CLI command.

<h5 style={{marginTop: '36px'}}>JSON configuration</h5>

Most editors use JSON configuration files for MCP servers. The following examples show complete configurations you can use.

If Roblox Studio is your only MCP server, use these configurations as they are. If you're using multiple MCP servers, copy the `Roblox_Studio` entry and add it to your existing `mcpServers` dictionary.

The configuration depends on your operating system.

<Alert severity="info">
Your `mcp.json` file might already contain other entries. When adding the `Roblox_Studio` configuration, make sure each entry is separated by a comma. Missing commas will result in invalid JSON and prevent the configuration from loading.
</Alert>

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

<h5 style={{marginTop: '36px'}}>CLI command</h5>

Some MCP clients require a CLI command instead of a JSON configuration. The command depends on your operating system.

```bash title="Windows"
cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat
```

```bash title="macOS"
/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP
```

### Claude Code

To connect Claude Code:

1. Open your terminal and run one of the following commands:
    - Windows: `claude mcp add Roblox_Studio -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat`
    - macOS: `claude mcp add Roblox_Studio -- /Applications/RobloxStudio.app/Contents/MacOS/StudioMCP`
2. In Claude Code, run `/mcp`.
3. Confirm that `Roblox_Studio: connected` appears in the server list.

### Claude Desktop

To connect Claude Desktop:

1. In the Claude Desktop app, go to **Claude** &rang; **Settings...**.
2. In the **Developer** tab, select **Edit Config**.
    - You can also find the config file at `C:\Users\<username>\AppData\Local\Packages\Claude_????\LocalCache\Roaming\Claude\claude_desktop_config.json`.
3. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client) to the `claude_desktop_config.json` file.
4. Restart Claude Desktop by fully quitting and relaunching the application.
5. Locate the MCP server indicator at the bottom-right corner of the chat input window.
6. Click the hammer icon to open the tools panel and verify that Roblox Studio is available.

### Visual Studio Code

<Alert severity="info">
VS Code uses `servers` as the top-level key instead of `mcpServers`. Make sure your JSON configuration uses `servers`.
</Alert>

You can configure the server at the workspace level, globally, or through the Command Palette. Use a workspace configuration for project-specific setups, or a global configuration to reuse the server across all of your projects.

To connect VS Code:

1. Choose how you want to configure the server:
    - For the workspace:
        1. In your project root, create a `.vscode/mcp.json` file.
        2. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client) to the file.
    - Globally:
        1. In VS Code, open the Command Palette.
        2. Run **MCP: Open User Configuration**.
        3. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client) to the `mcp.json` file.
    - Through the Command Palette:
        1. In VS Code, open the Command Palette.
        2. Run **MCP: Add Server...**.
        3. Select **Command (stdio)** and enter a server name.
        4. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client).
2. Verify the connection:
    1. Open the **GitHub Copilot Chat**.
    2. Switch to **Agent Mode**.
    3. Click the **Tools** icon.
    4. Confirm that **Roblox Studio tools** appears on the list.

### Cursor

You can configure the server using the settings UI or by directly editing the configuration file.

To connect Cursor:

1. Choose how you want to configure the server:
    - Through the settings UI:
        1. Go to **File** &rang; **Preferences** &rang; **Cursor Settings**.
        2. Select **MCP**.
        3. Click **Add new global MCP server**.
        4. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client).
    - Through the configuration file:
        1. Open `~/.cursor/mcp.json` (for global) or `.cursor/mcp.json` (for project-level).
        2. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client) to the file.
2. Verify the connection:
    1. Go to **Cursor Settings** &rang; **MCP**.
    2. Confirm that the server is showing a green status indicator.

### Antigravity

To connect Antigravity:

1. In Antigravity, click **&hellip;** &rang; **MCP Servers**.
2. Click **Manage MCP Servers**.
3. Click **View raw config**.
4. Add the `Roblox_Studio` configuration from [Connect your client](#connect-your-client) to the `mcp_config.json` file.
5. Refresh the **MCP Servers** panel to verify that **Roblox Studio tools** appears in the active tools list.

### Other MCP clients

The Studio MCP server works with any client that supports `stdio` transport. Use the configuration JSON or CLI command from the [Connect your client](#connect-your-client) section, then follow your client's documentation to add the server configuration. Restart the client to apply your changes.

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
