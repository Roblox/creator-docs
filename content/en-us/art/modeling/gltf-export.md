---
title: 3D Export
description: 3D Importer imports third-party .fbx, .gltf, and .obj 3D model assets into Studio.
---

import BetaAlert from '../../includes/beta-features/beta-alert.md'

<BetaAlert betaName="glTF Export" leadIn="This feature is currently in beta. Enable it through " leadOut="." components={props.components} />

You can export your 3D Roblox assets as a **.glTF** ([GL Transmission Format](https://en.wikipedia.org/wiki/GlTF)) file format. This open standard format allows for efficient transfer of 3D assets and associated data between Studio and other software, such as Blender or Maya.

<br />
Some common use cases for .glTF export includes:

- Running [Avatar auto setup](../../avatar-setup/index.md#auto-setup), exporting the output and finalizing the meshes, cages, or rigging in a third-party tool.
- Exporting your entire place for high-fidelity scene renders in another 3D application.
- Creating 3D content in Studio, such as part-based models or editable meshes and making modifications in an external application.

Keep in mind that glTF supports specific 3D [components](#supported-components), has some [limitations](#limitations), and requires correct [permissions](#limitations) to export assets from Studio. Some of these specifications may change over the course of the beta.

## Supported components

glTF export supports the following types of 3D data:

- Meshes
- Textures
- Rigging and skinning data
- Vertex colors
- Cages
- Dynamic head FACS data.

## Limitations

<Alert severity = 'warning'>
See the beta announcement for the latest information on limitations and currently known bugs.
</Alert>

At this time, glTF has the following limitations:

- Does not support animation data.
- Inconsistent support for layered clothing — clothing accessories may not always position correctly and won't deform to avatar bodies outside of Roblox.

## Permissions

<Alert severity = 'warning'>
See the beta announcement for the latest information on permissions and upcoming changes.
</Alert>

You must have the correct permissions to export assets as .glTF. When exporting .glTF, Studio verifies that you have permissions to export that asset and may warn you if there are any conflicts.

<br />
You can export the following assets:

- Assets directly uploaded to your account
- Assets directly uploaded to one of your group accounts
- Mesh and image assets that have been explicitly shared with you or your group

You cannot export the following assets:

- Avatar Marketplace assets
- Acquired Creator Store assets
- Shared collaborator assets where the underlying meshes/images have not been explicitly shared
- Other `Open Use` (public) assets that have not been explicitly shared with you or your group

## How to use .glTF export

<BetaAlert betaName="glTF Export" leadIn="This feature is currently in beta. Enable it through " leadOut="." components={props.components} />

You can export selected items from the Explorer, or export the entire place.

<br />
To export from the Explorer:

1. Select the items you intend to export.
2. Right-click and navigate to **Save / Export** > **Export as glTF**.
3. Follow the prompts on screen to fine-tune your export components. Click **Export** when ready.
   1. After clicking Export, Studio runs a permission check. If there are any permission conflicts, a permission prompt appears with additional details.
4. In the file browser, select a location to save the .glTF file.

To export an entire place:

1. Navigate to **File** > **Export as glTF**.
2. Follow the prompts on screen to fine-tune your export components. Click **Export** when ready.
   1. After clicking Export, Studio runs a permission check. If there are any permission conflicts, a permission prompt appears with additional details.
3. In the file browser, select a location to save the .glTF file.
