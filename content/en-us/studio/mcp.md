---
title: Connect to the Roblox Studio MCP Server
description: Learn how to connect your AI coding tools to Roblox Studio, enabling them to read your game structure, edit scripts, insert models, execute code, and control play mode — all from natural language prompts.

---

The **Roblox Studio MCP Server** is built into Roblox Studio. It implements the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro), an open standard that lets AI tools securely communicate with external applications. Once connected, your AI assistant can interact directly with your open Studio session — exploring the DataModel, writing scripts, running Luau code, testing in play mode, and more.

This guide walks you through connecting the Studio MCP Server to popular AI clients. While the exact steps vary by client, the core concept is the same: you point your client at the Studio MCP Server binary and it handles the rest.

## Prerequisites

Before you begin, make sure you have:

- Roblox Studio installed and updated to the latest version
- Your preferred MCP client installed (Claude Code, Claude Desktop, Cursor, VS Code, Antigravity, or others)

No additional downloads or plugins are required — the MCP server ships with Studio itself.

## Understanding the Studio MCP Server

The Studio MCP Server runs as a local process on your machine and communicates with your AI client via stdio transport (standard input/output). When your AI assistant wants to perform an action in Studio, it sends a request through this channel, and the server relays it to the Studio plugin.

The server provides tools for:

- Reading and editing scripts in your game
- Exploring the game hierarchy, including searching instances, inspecting properties and attributes
- Inserting models from the Roblox Marketplace
- Executing Luau code directly in Studio
- Controlling play mode, including starting, stopping, and running scripts with structured output
- Reading console output for debugging
- Generating materials

All actions flow through your AI client, which will typically ask for your approval before executing them.

<Alert severity = 'warning'>
Security note: MCP clients can read and modify content in your open Roblox places. Only connect clients you trust. You can toggle MCP on/off at any time from the **Plugins** tab in Studio.
</Alert>

## Enabling the MCP Server in Studio

Before connecting any external client, you need to turn on the MCP server inside Roblox Studio.

1. Open the **Assistant chat window** in Studio.
2. Click the three dots (**…**) menu to open Assistant Settings.
3. Select the MCP Servers tab in the left sidebar.
4. Toggle on **Enable Studio as MCP server**.

Once enabled, the settings panel will display the JSON configuration and startup command you'll need for your client. When a client successfully connects, you'll see a green indicator showing the number of connected clients ("● 1 client connected").

## Connecting your client

Choose your client below and follow the setup instructions. Refer to the client's documentation if required.

### Claude Code

Claude Code is Anthropic's terminal-based coding agent. You register MCP servers using the `claude mcp add` command:

1. Open your terminal and run the following commands:
   1. macOS bash:

        ```bash
        claude mcp add --transport stdio Roblox_Studio -- \'/Applications/RobloxStudio.app/Contents/MacOS/StudioMcpServer' --stdio
        ```

   2. Windows bash:

        ```bash
        claude mcp add --transport stdio Roblox_Studio -- cmd /c "C:\Path\To\StudioMcpServer.exe" --stdio
        ```

      1. The `cmd /c` wrapper is required on native Windows (not WSL) to ensure the executable launches correctly. Without it, you may see "Connection closed" errors.
2. Verify the connection in Claude Code
   1. In Claude Code, run `/mcp`.
   2. You should see `Roblox_Studio: connected` in the server list.

### Claude Desktop

Claude Desktop manages MCP servers through a JSON configuration file. Use the following steps to configure Roblox Studio MCP with Claude Desktop:

1. In Claude desktop, navigate to **Claude** > **Settings...**.
2. Navigate to the **Developer** tab and select **Edit Config**.
3. Add the server configuration.
   1. Add the following to your config file:
      1. macOS:

          ```json
          {
            "mcpServers": {
              "Roblox_Studio": {
                "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMcpServer",
                "args": ["--stdio"]
              }
            }
          }
          ```

      1. Windows:

          ```json
          {
            "mcpServers": {
              "Roblox_Studio": {
                "command": "C:\\Path\\To\\StudioMcpServer.exe",
                "args": ["--stdio"]
              }
            }
          }
          ```

4. Restart Claude Desktop by completely quitting and relaunching. On restart, you should see a MCP server indicator in the bottom-right corner of the chat input field.
5. Click the hammer icon below the chat input to access your tools and verify Roblox Studio has been added.

### Visual Studio Code

VS Code supports MCP servers through mcp.json configuration files. Official Visual Studio Documentation is [here](https://code.visualstudio.com/docs/copilot/customization/mcp-servers). There are several options to connect to Roblox Studio MCP server:

<Alert severity = 'warning'>
VS Code uses "servers" as its top-level key, not "mcpServers".
</Alert>

#### Workspace configuration

Connect Roblox Studio MCP on a per-workspace basis:

1. Create `.vscode/mcp.json` in your project root.
2. Add the following:

    ```json
    {
      "servers": {
        "Roblox_Studio": {
          "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMcpServer",
          "args": ["--stdio"]
        }
      }
    }
    ```

3. Include this file in source control to share it with your team.

#### Global configuration

Connect Roblox Studio on a global basis:

1. Open the Command Palette (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>).
2. Run **MCP: Open User Configuration**.
3. Add the same server entry to the opened `mcp.json` file.

#### Command Palette

Connect Roblox Studio MCP using the Command Palette:

1. Open the Command Palette.
2. Run **MCP: Add Server…**.
3. Select **Command (stdio)** as the type.
4. Enter the full path to `StudioMcpServer`
5. Add `--stdio` as an argument.

#### Verify

Open GitHub Copilot Chat, switch to **Agent Mode**, and click the **Tools** icon. Confirm that Roblox Studio tools appear in the list.

### Cursor

Cursor supports MCP servers through its settings UI or by editing `mcp.json` directly.

#### Edit settings

1. Go to **File** > **Preferences** > **Cursor Settings**.
2. Select **MCP** in the sidebar.
3. Click **Add new global MCP server**.
4. Paste the JSON configuration used in [edit config files](#edit-config-files).

#### Edit config files

1. Open `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project-level)
2. Add the following json:

    ```json
    {
      "mcpServers": {
        "Roblox_Studio": {
          "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMcpServer",
          "args": ["--stdio"]
        }
      }
    }
    ```

#### Verify

In **Cursor Settings** > **MCP**, the server should show a green status indicator. You can also confirm tools are available in Agent Mode.

### Google Antigravity

Antigravity supports MCP servers through its built-in MCP store and raw config editor:

1. Click the three dots (**…**) at the top of the Agent pane and select **MCP Servers**.
2. Click **Manage MCP Servers** > **View raw config**. This opens the `mcp_config.json` file:
   1. macOS: `~/.gemini/antigravity/mcp_config.json`
   2. Windows: `C:\Users\<USERNAME>\.gemini\antigravity\mcp_config.json`
3. Add the server:

    ```json
    {
      "mcpServers": {
        "Roblox_Studio": {
          "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMcpServer",
          "args": ["--stdio"]
        }
      }
    }
    ```

4. Refresh the MCP Servers panel and verify Roblox Studio tools appears in the active tools list.

### Other MCP clients

The Studio MCP Server works with any client that supports stdio transport. The configuration is always the same pattern:

```json
{
  "mcpServers": {
    "Roblox_Studio": {
      "command": "/Applications/RobloxStudio.app/Contents/MacOS/StudioMcpServer",
      "args": ["--stdio"]
    }
  }
}
```

Consult your client's documentation for where to place the configuration, then add a server entry with the command and argument above. Restart the client to load the new configuration.

## Verifying your setup

After configuring any client, follow these steps to confirm everything is working:

1. Open Roblox Studio and open a place file.
2. Check the Plugins tab — verify the MCP plugin icon is visible.
3. Check the Output console — look for "The MCP Studio plugin is ready for prompts".
4. Open your MCP client and try a prompt like: `What Roblox Studio tools do you have access to?`.

<Alert severity='success'>
Now that you're connected, try these prompts to explore what the Studio MCP Server can do:
- "Create a part that changes color when touched" — writes a script and inserts it into your game
- "Find all scripts that use deprecated APIs" — searches your codebase
- "Run my game and check for errors in the output" — starts play mode and reads the console
- "Insert a tree model from the marketplace" — searches and inserts a model
</Alert>

## Troubleshooting

### Server not showing up or tools not appearing

1. Restart both Roblox Studio and your MCP client completely.
2. Verify the binary path is correct and the file exists.
3. Check your JSON syntax — a missing comma or bracket will silently break the config.

### Connection closed errors (Windows)

Windows requires a `cmd /c` wrapper for some executables. Try the following JSON:

```json
{
  "mcpServers": {
    "Roblox_Studio": {
      "command": "cmd",
      "args": ["/c", "C:\\Path\\To\\StudioMcpServer.exe", "--stdio"]
    }
  }
}

```
