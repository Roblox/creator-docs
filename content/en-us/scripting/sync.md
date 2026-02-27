---
title: Script Sync
description: Use Studio's Script Sync feature to edit your Luau scripts on your local disk using an external text editor or your favorite integrated development environment (IDE).
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

<BetaAlert betaName="Script Sync" leadIn="Script Sync is currently in Studio beta. To enable this feature, select " leadOut="." components={props.components} />

Roblox Studio has a built-in [script editor](../studio/script-editor.md) for editing the code in your Roblox project. The editor includes key features like linting, type checking, autocomplete and collaborative editing.

Many developers, however, have a preferred text editor or integrated development environment (IDE), such as [Visual Studio Code](https://code.visualstudio.com), [Cursor](https://cursor.com), [Sublime Text](https://www.sublimetext.com), or [Notepad++](https://notepad-plus-plus.org). Popular development environments often have features or plugins that don't exist in Studio. To use an external editor or IDE with Studio, enable the **Script Sync** feature.

Script Sync works by synchronizing the scripts in your [data model](../projects/data-model.md) to text files on your local disk. Changes made to the Luau files on disk are applied to the scripts in Studio, and vice versa. This synchronization means that you can edit a script in an external editor like VS Code and immediately see the change in Studio.

## When to use Script Sync

- If you want to use your preferred text editor or check code into version control, but use Studio for everything else, Script Sync is a good fit. It also works with Roblox's [built-in collaboration tools](../projects/collaboration.md), which third-party tools often do not.

  Script Sync works well with existing Roblox projects, as it's an extra feature rather than a total shift in how you manage the project.

- If you want to check your entire project (not just code) into version control or use your file system as the source of truth for your project, [third-party tools](../projects/external-tools.md) like Rojo are a better choice.

<Alert severity="info">
It is currently not possible to control Roblox Studio's debugger from an external development environment.
</Alert>

## Set up Script Sync

1. In the **Explorer**, select one or more folders that you want to sync.
1. Right-click and select **Script Sync** ⟩ **Sync with Directory**.

   <img src="../assets/studio/explorer/Script-Sync.png" alt="The Explorer window with the Script Sync menu expanded." width="400" />

1. Choose a directory on your computer (or create a new one) and click **Save**.
1. In Studio, right-click on the folder again and select **Script Sync** ⟩ **Reveal in Explorer** (Windows) or **Reveal in Finder** (macOS).
1. Open the directory in your preferred text editor.

   Alternatively, right-click an individual script in Studio and select **Open in External Editor**.

You can sync individual scripts, but we **highly** recommend syncing folders; if you sync a folder, Script Sync automatically syncs its child folders and scripts, which lets you create, delete, and rename scripts without having to enable syncing each time.

After you set up Script Sync, you almost certainly want to [add an LSP extension](#set-up-a-language-server) to your text editor.

<Alert severity="success">
You only have to set up syncing once. When you restart Studio and open your place, Script Sync remembers what you were syncing and resumes automatically.
</Alert>

## Key tips

- Script Sync only syncs `Class.Script`, `Class.LocalScript`, `Class.ModuleScript` and `Class.Folder` instances. All other instances in a synced folder are ignored. Avoid syncing folders that contain scripts alongside other instances.
- Don't sync scripts that have attributes or tags. Script Sync ignores these, which can lead to data loss if you create or delete scripts or start syncing with an older version of your files on disk.
- Script Sync requires the names of scripts be compatible with your file system—no duplicate names or unsupported characters. If Studio encounters any of these issues, it throws an error and asks you to resolve the situation before resuming sync.
- If any synced files or folders change while Studio is closed, Studio asks you how you want to resolve the situation when you reopen the place.
- Deleting a top-level (or "root") instance—the instance you initially synced—on your local disk can cause Studio to throw an error. To delete a top-level instance:

  1. In Studio, right-click the script or folder and select **Script Sync** ⟩ **Stop Sync**.
  1. Choose the **Delete file(s)** or **Delete folder(s)** option to delete the instance from your local disk.
  1. Delete the script or folder in Studio.

  You can delete child instances in Studio or on your local disk without disabling syncing, and the deletion syncs as you'd expect.

## Set up a language server

Language servers give your text editor language-specific features like autocomplete, type checking, "go to definition," and more. For VS Code, we recommend [Luau Language Server](https://marketplace.visualstudio.com/items?itemName=JohnnyMorganz.luau-lsp).

Language server protocol (LSP) extensions need to understand the data model hierarchy of a project to work properly. The VS Code extension comes with a companion Studio plugin ([Luau Language Server Companion](https://create.roblox.com/store/asset/10913122509/Luau-Language-Server-Companion)) that provides this data.

**We highly recommend installing both.** If you use the VS Code extension and companion Studio plugin, language features will work correctly in VS Code while using Script Sync.

## Recommended extensions

<Alert severity="info">
The community maintains these extensions. We recommend them based on their functionality, but can't offer guarantees about performance or security. Before installing an extension, check that it comes from a reputable source and isn't malicious.
</Alert>

- [Roblox Luau LSP](https://marketplace.visualstudio.com/items?itemName=JohnnyMorganz.luau-lsp) and [Luau Language Server Companion](https://create.roblox.com/store/asset/10913122509/Luau-Language-Server-Companion) - Language features (see above)
- [selene](https://marketplace.visualstudio.com/items?itemName=Kampfkarren.selene-vscode) - Static code analysis (linting)
- [StyLua](https://marketplace.visualstudio.com/items?itemName=JohnnyMorganz.stylua) - Automatic code formatting

## Sync rules

When syncing an instance with children with a directory on disk, Studio will automatically sync create, rename, move, and delete operations on children with the corresponding files and folders on disk. This approach lets you maintain your code without having to manually stop and start syncing on individual scripts.

On disk, Script Sync uses the following rules to disambiguate the different types of scripts from each other.

| Naming convention on disk | Instance type in Studio |
| :---- | :---- |
| `name.luau` | `Class.ModuleScript` |
| `name.server.luau` | Script with `Server` `Class.Script.RunContext` |
| `name.client.luau` | Script with `Client` `Class.Script.RunContext` |
| `name.local.luau` | `Class.LocalScript` |
| `name.legacy.luau` | Script with `Legacy` `Class.Script.RunContext` |
| `name.plugin.luau` | Script with `Plugin` `Class.Script.RunContext` |
| `name/` (directory) | `Class.Folder` |
| `name/init.*.luau` | Script instance with children. Type (`*`) is determined by the above rules. |

## Settings

Script Sync has several settings in the **Studio Settings** window (<kbd>Alt</kbd><kbd>S</kbd> or <kbd></kbd>⌥<kbd>S</kbd>). The default options are a good fit for most use cases.

| Setting | Description |
| :---- | :---- |
| Auto resume sync on place open | Whether Studio should resume syncing when you open a place. Disabling this setting dramatically reduces the utility of Script Sync. |
| Resume conflicted sync on place open | How Studio should handle conflicts when you open a place. The default option, **Do not resume**, forces you to resolve conflicts manually to avoid data loss. You can also choose to prefer the version on disk or the version in Studio. |
| Keep local files/directories after sync | How to handle files on disk after you select **Script Sync** > **Stop Sync** in Studio.
| File extension | The file extension to use for scripts on disk.
