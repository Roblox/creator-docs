---
title: Third-party tools
description: These popular tools for managing Roblox projects as a set of local files can enhance developer productivity.
---

For professional development studios, setting up third-party tools and investing in automation can dramatically improve developer productivity. Roblox's cloud-first approach has many advantages, but moving certain portions of the development workflow **outside** of the cloud can help larger teams track changes over time, review code, and use the languages and tools with which they're already familiar.

- If you just want to use an external text editor or keep code in version control, [Script Sync](../scripting/sync.md) is a great choice.
- If you want to manage your entire project as a set of local files, this page covers some tools and strategies.

<Alert severity="info">
Although this page covers several popular tools, it shouldn't be taken as a strict recommendation of them. Every team has different needs, so this page is intended to help you examine ways to improve your workflow rather than tell you to download anything in particular.

The tools on this page are not maintained by Roblox and can change or stop working at any time.
</Alert>

## The syncing problem

At its core, using external tools with Roblox is a _syncing_ problem:

- You want your Roblox instances to exist as files on disk so that you can use your own tools to work on them.
- You have to get your files back into your Roblox project after you've finished working on them.
- If someone else changed those same files in the meantime, you have to handle any conflicts.

For the whole solution to feel seamless and automatic, you need to a) listen for changes to files and b) incorporate these changes back into Studio.

Rather than Roblox's cloud-first approach, Rojo allows for a "file system-first" approach. It extracts instances in your project into external files. Then it runs a server. The Rojo plugin connects to the server to synchronize those files with Studio.

## Install Rojo with Foreman

You can manually download and run a Rojo binary, but that approach runs the risk of different developers on your team using different Rojo versions. A better solution is to use a tool manager like [Foreman](https://github.com/Roblox/foreman), which uses a configuration file—a list of repositories and versions—to make the installation and upgrade process consistent across machines.

Because it manages your baseline development environment rather than the packages within your project, Foreman is more akin to [nvm](https://github.com/nvm-sh/nvm) than [npm](https://www.npmjs.com/), but the comparison isn't perfect. A simple `foreman.toml` file looks like this:

```toml
[tools]
rojo = { github = "rojo-rbx/rojo", version = "7.4.1" }
wally = { github = "UpliftGames/wally", version = "0.3.2" }
```

Then you install these tools with `foreman install`. In addition to a global `foreman.toml` file, Foreman supports per-project files, so you can easily use different versions of Rojo, Wally, or any other tool for different projects and keep your entire team on those same versions.

When a tool releases a new version, you then explicitly bump the version number in your `.toml` file, use Foreman to perform the upgrade, test the new version, and downgrade if it causes any problems. For commands and installation instructions, see [Foreman](https://github.com/Roblox/foreman?tab=readme-ov-file#installation).

## Run Rojo

After you install Rojo with Foreman, what you've really installed is the Rojo server. The next step is to install the Rojo plugin for Roblox Studio:

```bash
rojo plugin install
```

Then generate the project structure for your new experience and build it:

```bash
rojo init my-new-experience
cd my-new-experience
rojo build -o my-new-experience.rbxl
```

Alternatively, you can [port an existing experience](https://rojo.space/docs/v7/getting-started/existing-game/). Either way, after you have a project, start the Rojo server:

```bash
rojo serve
```

In Roblox Studio, open the `.rbxl` file you just built, start the Rojo plugin, and connect to your now-running server, at which point you can start making changes in your preferred text editor and watch those changes automatically sync back to Studio.

![Visual Studio Code with a Rojo project open.](../assets/scripting/external-tools/external-tools-vscode.png)

![The Rojo plugin and Studio Explorer side-by-side.](../assets/scripting/external-tools/external-tools-rojo-plugin.png)

Rojo projects have certain naming requirements for files, numerous configuration options, and some limitations, all of which are covered in the [Rojo documentation](https://rojo.space/docs/v7/).

## Package managers

Roblox has a robust set of included APIs, but if you want to make use of community software packages in a consistent, reproducible way, you need a package manager. [Wally](https://wally.run/) is a popular option. You can install it through Foreman, just like Rojo.

Within your experience's Rojo directory, run `wally init`. Then add your desired packages to `wally.toml`. The file might look like this:

```toml
[package]
name = "my-home-directory/my-new-experience"
version = "0.1.0"
registry = "https://github.com/UpliftGames/wally-index"
realm = "shared"

[dependencies]
react = "jsdotlua/react@17.1.0"
react-roblox = "jsdotlua/react-roblox@17.1.0"
cryo = "phalanxia/cryo@1.0.3"
```

Then run `wally install`. Wally creates a `Packages` directory and downloads the specified packages there. The final step is to add the `Packages` directory to Rojo so that its contents sync back to Roblox. Open `default.project.json` and add the path. For simplicity, this example adds the entire directory to `Class.ReplicatedStorage` so that all packages are available to all scripts, but you might prefer to add specific packages to `Class.ServerScriptService` or `Class.StarterPlayerScripts`:

```json
{
  "name": "my-new-experience",
  "tree": {
    "$className": "DataModel",

    "ReplicatedStorage": {
      "Shared": {
        "$path": "src/shared"
      },
      "Packages": {
        "$path": "Packages"
      }
    },

    ...

  }
}
```

Then you can require packages within your scripts just like any other `Class.ModuleScript`:

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local React = require(ReplicatedStorage.Packages.react)
local ReactRoblox = require(ReplicatedStorage.Packages["react-roblox"])

local handle = Instance.new("ScreenGui", Players.LocalPlayer.PlayerGui)
local root = ReactRoblox.createRoot(handle)

local helloFrame = React.createElement("TextLabel", {
	Text = "Hello World!",
	Size = UDim2.new(0, 200, 0, 200),
	Position = UDim2.new(0.5, 0, 0.5, 0),
	AnchorPoint = Vector2.new(0.5, 0.5),
	BackgroundColor3 = Color3.fromRGB(248, 217, 109),
	Font = Enum.Font.LuckiestGuy,
	TextSize = 24
})

root:render(helloFrame)
```

Like most other software projects, the goal is that contributors can clone a repository, install Foreman, run a few commands, and have the same development environment as the rest of the team.

<Alert severity="success">
For a detailed walkthrough of using React to create a Roblox UI, see [React + Roblox](https://devforum.roblox.com/t/how-to-react-roblox/2964543).
</Alert>

## Version control

Having a set of plain text files on your computer unlocks a variety of capabilities, but the primary one is _version control_. You can store your files in a [Git](https://git-scm.com/) or [Mercurial](https://www.mercurial-scm.org/) repository; host remote repositories and review code changes in [GitHub](https://github.com), [GitLab](https://gitlab.com), or [Bitbucket](https://bitbucket.org); and use whichever text editor you like.

[Visual Studio Code](https://code.visualstudio.com) and [Cursor](https://cursor.com) have the largest extension ecosystem, but [Sublime Text](https://www.sublimetext.com) and [Notepad++](https://notepad-plus-plus.org), and [Vim](https://www.vim.org) are all popular choices. Whichever editor you choose, matching the capabilities of the Studio script editor will require some extensions.

You might also consider adding:

- A linter like [selene](https://github.com/Kampfkarren/selene) to catch common issues and enforce coding standards
- A code formatter like [StyLua](https://github.com/JohnnyMorganz/StyLua)
- A language server like [Luau Language Server](https://github.com/JohnnyMorganz/luau-lsp) for autocompletion, type checking, and more
- [Open Cloud](../cloud/guides/index.md) scripts (not synced to Studio) to [update a published experience](/cloud/reference/Universe#Cloud_UpdateUniverse) or [restart servers](/cloud/reference/Universe#Cloud_RestartUniverseServers)

## Undo everything

Because third-party tools sync changes back to Roblox Studio rather than replacing it, no part of this workflow involves any lock-in. At any time, you can stop using one or all of these tools and go back to editing your experience exclusively in Studio. The lack of risk makes experimenting with third-party tools particularly appealing.
