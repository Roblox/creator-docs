---
title: Place files
description: Learn how to manage and optimize your place files in Roblox.
---

Each Roblox experience consists of one or more [places](index.md#places), and Studio uploads your place data to Roblox's servers whenever you save or publish to Roblox in the **File** menu.

You might also want to export local copies of places for use with a version control system or other [external tools](external-tools.md). To export your place in Studio, select **Save&nbsp;to&nbsp;File** or **Download&nbsp;a&nbsp;Copy** from the **File** menu. Studio offers two file formats:

- `.rbxl` is the binary place file format. This format is compact, but not human-readable.
- `.rbxlx` is the XML-based place file format, which is quite a bit larger on disk than the binary format.

## Size limit

Roblox supports places up to 100 MB (104,857,600 bytes). Beyond that limit, **Save to Roblox** and **Publish to Roblox** might fail. The data that Studio uploads to Roblox is slightly smaller than the `.rbxl` file format, so you can export your place to `.rbxl` to get a sense of its size.

Very few places, even the most complex ones, reach this limit, and when they do, it's often due to inefficiencies in the place. See [Troubleshooting](#troubleshoot-place-file-size).

### Auto-recovery files

If saving to Roblox fails due to the file size limit, Studio automatically generates a backup of your place called a **recovery file**. The frequency of auto-recovery backups depends on whether your experience has [collaboration](collaboration.md) enabled:

- If you have collaboration enabled and saving to Roblox fails, Studio backs up the last three save attempts as recovery files on your system.
- If collaboration is disabled, Studio uses **Auto-Recovery** settings from [Studio Settings](../studio/setup.md#customization).

On Windows, recovery files are located in `C:\Users\Admin\AppData\Local\Roblox\RobloxStudio\AutoSaves`.

On Mac, you can find them in `/Users/your-username/Library/Application Support/Roblox/RobloxStudio/AutoSaves/`.

## Troubleshoot place file size

If you reach the 100 MB limit on your place file, there's likely an underlying issue that you can troubleshoot. Try the following steps.

### Safety check

Check the models in your place and their attached scripts for any obfuscated or unclear text. This text does not compress well and might even be a malicious backdoor into your place. Roblox moderation systems actively filter out these models, but if you happen to find one, delete the model from your place, find the model on the [Creator Store](https://create.roblox.com/store/models), and report it immediately.

### Redundant parts

Unreferenced or hidden assets can accumulate over time and unnecessarily increase file size.

1. See if any models or groups of parts are taking up more space than others:

   1. Export your place file and note its size on disk.
   1. Open the file in Roblox Studio.
   1. Copy and paste the models or groups of parts that you suspect are inordinately large.
   1. Save the file again and note its increase in file size.

1. Check for redundant parts (parts of the same size and shape with the same position) or instances (redundant `Class.SurfaceAppearance|SurfaceAppearances`, textures, etc.) and delete them. The Creator Store has plugins that can help you identify these cases.

### Simplify terrain

Reducing or simplifying terrain can significantly reduce place size and improve performance. Avoiding excessive terrain features like dense forests or complex hills helps make experiences run faster and more efficiently. Of course, the experience should match your artistic vision, but consider the following optimizations:

1. Horizontal layers of the same material/occupancy compress much better than sloped layers. If possible, try to limit subsurface detail to horizontal layers.
1. Turn on **Show Wireframe Rendering** from Studio's **View** menu and check for messy holes or misplaced water under the terrain surface. These mistakes can increase compressed size.
1. There are community plugins that optimize non-visible blocks of terrain for better compression, such as [this one](https://create.roblox.com/store/asset/133396894381603/Terrain-File-Size-Optimizer).

### Collision fidelity

`Enum.CollisionFidelity.Box|Box` and `Enum.CollisionFidelity.Hull|Hull` collision fidelity are more memory efficient than the default. Select your meshes, open the [Properties](../studio/properties.md) window, and change the **CollisionFidelity** values as appropriate for your use case.

### Teleports

If other size reduction strategies fail, you can break your place into multiple, smaller places and link them through [teleports](teleport.md). Serialization and upload happen at the place level, so this approach lets you grow your universe place by place over time instead of trying to maintain a single, massive place.
