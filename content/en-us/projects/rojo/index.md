---
title: Rojo
description: Rojo syncs files on your disk into Roblox Studio so you can use Git, external editors, and CI with your game. Install it, run it, and choose how much of your game it manages.
---

[Rojo](https://rojo.space/) is a community tool that takes a "file system-first" approach to Roblox projects. It runs a server on your machine that communicates with a [Studio plugin](../../studio/plugins.md) to sync files on your disk into the Studio data model, and it can build place and model files from those files. With your project on disk, you can use Git, your own editor, and CI.

<Alert severity="info">
Rojo is not maintained by Roblox and can change or stop working at any time. For full reference, see the [Rojo documentation](https://rojo.space/docs/v7/).
</Alert>

How you use Rojo depends on how much of your game you want it to manage:

- **[Partially managed](./partially-managed.md):** Rojo manages your code, and Git is its source of truth. Places and assets stay on Roblox, where artists edit them with Team Create and packages. We recommend this for most teams that use Git.
- **[Fully managed](./fully-managed.md):** Rojo manages your entire game, including models and images. Git is the source of truth for everything, and CI builds and publishes your places.

To compare these with a Studio-native workflow, see [Compare file-based workflows](../file-based-workflows.md).

## Install Rojo

You can manually download and run a Rojo binary, but that approach runs the risk of different people on your team using different Rojo versions. A better solution is to use a toolchain manager like [Rokit](https://github.com/rojo-rbx/rokit), which uses a configuration file, a list of repositories and versions, to make the installation and upgrade process consistent across machines.

Because it manages your baseline development environment rather than the packages within your project, Rokit is more akin to [nvm](https://github.com/nvm-sh/nvm) than [npm](https://www.npmjs.com/), but the comparison isn't perfect. A simple `rokit.toml` file looks like this:

```toml
[tools]
rojo = "rojo-rbx/rojo@7.6.1"
wally = "upliftgames/wally@0.3.2"
lune = "lune-org/lune@0.10.4"
```

Then you install these tools with `rokit install`. In addition to a global `rokit.toml` file, Rokit supports per-project files, so you can easily use different versions of Rojo, Wally, or any other tool for different projects and keep your entire team on those same versions.

When a tool releases a new version, you then explicitly bump the version number in your `.toml` file, use Rokit to perform the upgrade, test the new version, and downgrade if it causes any problems. For commands and installation instructions, see [Rokit](https://github.com/rojo-rbx/rokit#-rokit).

## Run Rojo

After you install Rojo with Rokit, what you've really installed is the Rojo server. The next step is to install the Rojo plugin for Roblox Studio.

You can install it from the [Creator Store](https://create.roblox.com/store/asset/13916111004/Rojo) or install it locally with this command:

```bash
rojo plugin install
```

Then generate the project structure for your new game and build it:

```bash
rojo init my-new-experience
cd my-new-experience
rojo build -o my-new-experience.rbxl
```

Alternatively, you can [port an existing game](https://rojo.space/docs/v7/getting-started/existing-game/). Either way, after you have a project, start the Rojo server:

```bash
rojo serve
```

In Roblox Studio, open the `.rbxl` file you just built, open the Rojo plugin, and connect to your now-running server, at which point you can start making changes in your preferred text editor and watch those changes automatically sync back to Studio.

![Visual Studio Code with a Rojo project open.](../../assets/scripting/external-tools/external-tools-vscode.png)

![The Rojo plugin and Studio Explorer side-by-side.](../../assets/scripting/external-tools/external-tools-rojo-plugin.png)

Rojo projects have certain naming requirements for files, numerous configuration options, and some limitations, all of which are covered in the [Rojo documentation](https://rojo.space/docs/v7/).

<Alert severity="info">
For guidance around organizing your code, see [Script types and locations](../../scripting/locations.md#recommendations) and the projects in [Roblox/resources](https://github.com/Roblox/resources).
</Alert>

## Troubleshoot Rojo

<table>
  <thead>
    <tr>
      <th>Problem</th>
      <th>Fix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Rojo fails to sync, or behaves differently on different machines.</td>
      <td>Team members are on different Rojo or plugin versions. Pin versions in `rokit.toml` and run `rokit install`.</td>
    </tr>
    <tr>
      <td>Code synced into the wrong place.</td>
      <td>Add `servePlaceIds` to your project file so Rojo only syncs to the places you list.</td>
    </tr>
    <tr>
      <td>Rojo deleted content that artists added.</td>
      <td>Set `$ignoreUnknownInstances` to `true` on the services that both Rojo and artists use.</td>
    </tr>
  </tbody>
</table>
