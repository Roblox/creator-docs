---
title: Connect to the Roblox Studio MCP Server
description: Learn how to connect your AI coding tools to Roblox Studio, enabling them to read your game structure, edit scripts, insert models, execute code, and control play mode — all from natural language prompts.

---

The **Roblox Studio MCP Server** is built into Roblox Studio. It implements the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro), an open standard that lets AI tools securely communicate with external applications. Once connected, your AI assistant can interact directly with your open Studio session — exploring the DataModel, writing scripts, running Luau code, testing in play mode, and more.

This guide walks you through connecting the Studio MCP Server to popular AI clients. While the exact steps vary by client, the core concept is the same: you point your client at the Studio MCP Server binary and it handles the rest.

## Prerequisites

Before you begin, make sure you have:

- **Roblox Studio** installed and updated to the latest version
- **Your preferred MCP client** installed (Claude Code, Claude Desktop, Cursor, VS Code, Antigravity, or others)

No additional downloads or plugins are required — the MCP server ships with Studio itself.

## Understanding the Studio MCP Server

The Studio MCP Server runs as a local process on your machine and communicates with your AI client via **stdio transport** (standard input/output). When your AI assistant wants to perform an action in Studio, it sends a request through this channel, and the server relays it to the Studio plugin.

<br />**Scripts**

- `script_read` — Reads a script from the game using dot-notation paths (game.ServerScriptService.MyScript). Supports reading entire scripts or specific line ranges.
- `multi_edit` — Makes multiple edits to a single script in one atomic operation. Can also create new scripts if the target path doesn't exist. Edits are applied sequentially using exact string matching.
- `script_search` — Fast fuzzy search against script names. Useful when you know part of a script's name but not its location. Returns up to 10 results.
- `script_grep` — Searches for a string pattern across all script contents in the game. Results are capped at 50 matches.

**Exploring the Data Model**

- `search_game_tree` — Explores the game's instance hierarchy as a flat JSON array. Supports filtering by path, instance type (with `IsA()` checks), and keywords. Configurable traversal depth (default 3, max 10).
- `inspect_instance` — Returns detailed information about a specific instance, including all readable properties, custom attributes, and a summary of children and total descendants.

**Luau Execution**

- `execute_luau` — Executes Luau code directly in Roblox Studio and returns the result or an error message.

**Playtesting**

- `start_stop_play` — Start or stop playtesting the game.
- `console_output` — Retrieve console/output logs while the game is running.

**Player Input Simulation**

- `character_navigation` — Move the player character to a position or instance.
- `keyboard_input` — Simulate key presses, key holds, and text input.
- `mouse_input` — Simulate mouse clicks, movement, and scrolling.

**Session Management**

- `list_roblox_studios` — Lists all connected Roblox Studio instances with their name, ID, and active status. Useful when multiple Studio windows are open.
- `set_active_studio` — Sets a specific Studio instance as active so that all subsequent tool calls target it.

All actions flow through your AI client, which will typically ask for your approval before executing them.

<Alert severity = 'warning'>
Security note: MCP clients can read and modify content in your open Roblox places. Only connect clients you trust. You can toggle MCP on/off at any time from the **Plugins** tab in Studio.
</Alert>

## Connecting to multiple Studio instances

You can connect a single MCP client to multiple running instances of Studio simultaneously. The server will intelligently infer which Studio instance you're referring to based on context — for example, if you mention a specific game by name or reference something that only exists in one of your connected experiences. You can also switch manually using `list_roblox_studios` and `set_active_studio` at any time. This feature is still experimental.

## Enabling the MCP Server in Studio

Before connecting any external client, you need to turn on the MCP server inside Roblox Studio.

1. Open the **Assistant chat window** in Studio.
2. Click the three dots (**…**) menu to open Assistant Settings.
3. Select the **MCP Servers** tab in the left sidebar.
4. Toggle on **Enable Studio as MCP server**.

Once enabled, the settings panel will display the JSON configuration and startup command you'll need for your client. When a client successfully connects, you'll see a green indicator showing the number of connected clients ("● 1 client connected").

## Connecting your client

Choose your client below and follow the setup instructions. Refer to the client's documentation if required.

The **MCP Servers** tab contains an expandable **Setup Instructions** section with a JSON entry field and Command.

Most editors use JSON MCP configuration files. Here are the complete JSON configuration files — you can use them as-is if Roblox Studio is the only MCP server you need. If you want to use it alongside other MCP servers, copy just the `Roblox_Studio` entry and add it to the `mcpServers` dictionary:

Windows:

```json
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

macOS:

```json
{
  "mcpServers": {
    "Roblox_Studio": {
      "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP"
    }
  }
}
```

Other MCP clients will prompt you for the MCP command or expect it as a CLI argument during setup. Here are the commands for the Roblox MCP Server:

Windows CLI command:

```bash
cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat
```

macOS CLI command:

```bash
/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP
```

### Claude Code

Claude Code is Anthropic's terminal-based coding agent. You register MCP servers using the `claude mcp add` command:

1. Open your terminal and run the following commands:
   1. macOS bash:

        ```bash
        claude mcp add Roblox_Studio -- /Applications/RobloxStudio.app/Contents/MacOS/StudioMCP
        ```

   2. Windows bash:

        ```bash
        claude mcp add Roblox_Studio -- cmd.exe /c %LOCALAPPDATA%\Roblox\mcp.bat
        ```

2. Verify the connection in Claude Code
   1. In Claude Code, run `/mcp`.
   2. You should see `Roblox_Studio: connected` in the server list.

### Claude Desktop

Claude Desktop manages MCP servers through a JSON configuration file. Use the following steps to configure Roblox Studio MCP with Claude Desktop:

1. In Claude desktop, navigate to **Claude** > **Settings...**.
2. Navigate to the **Developer** tab and select **Edit Config**.
   1. If pressing that button produces errors, it's possible that Claude Desktop 'hid' the configuration JSON in a directory like `C:\Users\<username>\AppData\Local\Packages\Claude_????\LocalCache\Roaming\Claude\claude_desktop_config.json`
3. Add the server configuration from [Connecting Your Client](#connecting-your-client) to the `claude_desktop_config.json`.

4. Restart Claude Desktop by completely quitting and relaunching. On restart, you should see a MCP server indicator in the bottom-right corner of the chat input field.
5. Click the hammer icon below the chat input to access your tools and verify Roblox Studio has been added.

### Visual Studio Code

VS Code supports MCP servers through mcp.json configuration files. Official Visual Studio Documentation is [here](https://code.visualstudio.com/docs/copilot/customization/mcp-servers).

**Important:** VS Code uses "servers" as its top-level key, not "mcpServers".

For Windows:

```json
{
  "servers": {
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

For macOS:

```json
{
  "servers": {
    "Roblox_Studio": {
      "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMCP"
    }
  }
}
```

#### Workspace configuration

Connect Roblox Studio MCP on a per-workspace basis:

1. Create `.vscode/mcp.json` in your project root.
2. Add the server entry to the created file.

#### Global configuration

Connect Roblox Studio on a global basis:

1. Open the Command Palette (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>).
2. Run **MCP: Open User Configuration**.
3. Add the same server entry to the opened `mcp.json` file.

#### Command Palette

Connect Roblox Studio MCP using the Command Palette:

1. Open the Command Palette.
2. Run **MCP: Add Server…**.
3. Select **Command (stdio)** as the type, then enter the server name. For example, Roblox_Studio (adding space can cause issues)
4. Paste the command and arguments from above

#### Verify

Open GitHub Copilot Chat, switch to **Agent Mode**, and click the **Tools** icon. Confirm that Roblox Studio tools appear in the list.

### Cursor

Cursor supports MCP servers through its settings UI or by editing `mcp.json` directly.

#### Edit settings

1. Go to **File** > **Preferences** > **Cursor Settings**.
2. Select **MCP** in the sidebar.
3. Click **Add new global MCP server**.
4. Paste the JSON configuration provided earlier.

#### Edit config files

1. Open `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project-level)
2. Paste the JSON configuration provided earlier.

#### Verify

In **Cursor Settings** > **MCP**, the server should show a green status indicator. You can also confirm tools are available in Agent Mode.

### Google Antigravity

Antigravity supports MCP servers through its built-in MCP store and raw config editor:

1. Click the three dots (**…**) at the top of the Agent pane and select **MCP Servers**.
2. Click **Manage MCP Servers** > **View raw config**. This opens the `mcp_config.json` file:
   1. macOS: `~/.gemini/antigravity/mcp_config.json`
   2. Windows: `C:\Users\<USERNAME>\.gemini\antigravity\mcp_config.json`
3. Add the server by inserting the JSON configuration provided earlier.

4. Refresh the MCP Servers panel and verify Roblox Studio tools appears in the active tools list.

### Other MCP clients

The Studio MCP Server works with **any client that supports stdio transport**. Use the configuration JSON or CLI command from the [Connecting Your Client](#connecting-your-client) section and consult your client's documentation for where to place the configuration. Restart the client to load the new configuration.

Consult your client's documentation for where to place the configuration, then add a server entry with the command and argument above. Restart the client to load the new configuration.

## Verifying your setup

After configuring any client, follow these steps to confirm everything is working:

1. Open Roblox Studio and open a place file.
2. Check the Plugins tab — verify the MCP plugin icon is visible.
3. Check the Output console — look for "The MCP Studio plugin is ready for prompts".
4. Open your MCP client and try a prompt like: `What Roblox Studio tools do you have access to?`.

## Troubleshooting

### Server not showing up or tools not appearing

1. Restart both Roblox Studio and your MCP client completely.
2. Verify the binary path is correct and the file exists.
3. Check your JSON syntax — a missing comma or bracket will silently break the config.
