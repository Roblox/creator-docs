---
title: Custom Terrain Materials
description: Use the 62-slot expanded terrain system to assign custom materials to terrain voxels through the Material Manager or scripting API.
---

The **Expanded Terrain** system replaces the legacy fixed-material terrain with a 62-slot system that lets you assign [custom materials](../parts/materials.md#custom-materials) to individual terrain voxels. Each slot maps to a base material, an optional `Class.MaterialVariant`, and a color tint, giving you full control over terrain appearance through the [Material Manager](../parts/materials.md#material-manager) or the [scripting API](#programmatic-terrain-api).

## Enabling Expanded Terrain

To use custom terrain material slots, you must enable Expanded Terrain on the `Class.Workspace` object:

1. Open your place in Studio.
2. In the **Explorer** window, click **Workspace**.
3. In the **Properties** window, set **ExpandedTerrain** to **Enabled**.
4. Save the place and restart Studio.

<Alert severity="warning">
After you save a place with Expanded Terrain enabled, any collaborator who opens it **must also have the feature enabled**. Collaborators without the feature cannot open or edit the place until they enable it on their own Workspace.
</Alert>

## Creating and Managing Custom Materials

You create and manage custom terrain materials through the **Material Manager**, the same interface used for part materials. For the full workflow on creating a `Class.MaterialVariant`, applying it to terrain, and configuring physical properties, see [Custom Materials](../parts/materials.md#custom-materials).

Once you have custom materials defined, you can assign them to terrain material slots either through the Material Manager UI or through the [scripting API](#programmatic-terrain-api) below.

## Programmatic Terrain API

The Expanded Terrain system exposes methods on the `Class.Terrain` object for assigning materials to slots and writing voxel data. Use these methods for procedural terrain generation or runtime material changes.

### API methods

<table>
<thead>
  <tr>
    <th>Method</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Terrain:SetMaterialSlot(index, baseMaterial, variantName, color)`</td>
    <td>Assigns a base material, optional Material Variant, and color tint to a slot.</td>
  </tr>
  <tr>
    <td>`Terrain:GetMaterialSlot(index)`</td>
    <td>Returns the base material, variant name, and color for a slot.</td>
  </tr>
  <tr>
    <td>`Terrain:ResetMaterialSlot(index)`</td>
    <td>Clears a slot. Voxels referencing it render as invalid (bright purple).</td>
  </tr>
  <tr>
    <td>`Terrain:WriteVoxelChannels(region, resolution, channels)`</td>
    <td>Writes voxel data to a terrain region using channel arrays such as `SolidMaterialIndex` and `Occupancy`.</td>
  </tr>
</tbody>
</table>

### Code sample

The following script creates two custom terrain material slots, writes them into a region using `WriteVoxelChannels`, and then resets one slot to demonstrate invalid-slot rendering:

```lua
local Terrain = workspace.Terrain

-- Create material slots
Terrain:SetMaterialSlot(22, Enum.Material.Grass, "SwampVariant", Color3.fromRGB(50, 60, 30))
Terrain:SetMaterialSlot(23, Enum.Material.Rock, "AlienVariant", Color3.fromRGB(100, 0, 255))

-- Get material slot information
local baseMaterial, variantName, color = Terrain:GetMaterialSlot(22)
print(("Slot 22: %s / %s / (%d, %d, %d)"):format(
  tostring(baseMaterial),
  variantName,
  math.round(color.R * 255),
  math.round(color.G * 255),
  math.round(color.B * 255)
))

-- Use a region that aligns to the resolution grid
local resolution = 4
local region = Region3.new(Vector3.new(0, 0, 0), Vector3.new(64, 16, 64)):ExpandToGrid(resolution)

-- Compute voxel dimensions from the snapped region
local size = region.Size / resolution
local sizeX = math.round(size.X)
local sizeY = math.round(size.Y)
local sizeZ = math.round(size.Z)

-- Build 3D nested arrays for writing the new slots
local materialIndices = {}
local occupancy = {}

for x = 1, sizeX do
  materialIndices[x] = {}
  occupancy[x] = {}
  for y = 1, sizeY do
    materialIndices[x][y] = {}
    occupancy[x][y] = {}
    for z = 1, sizeZ do
      occupancy[x][y][z] = 1
      materialIndices[x][y][z] = if (x + z) % 2 == 0 then 22 else 23
    end
  end
end

Terrain:WriteVoxelChannels(region, resolution, {
  SolidMaterialIndex = materialIndices,
  Occupancy = occupancy,
})

-- Reset slot 23: voxels referencing it render as invalid
Terrain:ResetMaterialSlot(23)
```

## Performance Improvements

The Expanded Terrain system includes significant performance improvements over the legacy terrain format:

- **98% reduction** in file size
- **90% reduction** in CPU memory overhead
- **45% reduction** in meshing latency
- **40–60% reduction** in client memory usage
- **2&times; faster** terrain loading
- Terrain data is stored on the Roblox asset platform rather than in the place file, bypassing the 100&nbsp;MB place file limit

## Known Issues

The following issues are known for the current Expanded Terrain release:

- You must manually save, restart Studio, and reopen the place for new places. Auto-restart does not work yet.
- Custom physical properties are not yet respected by custom material slots.
- Meshing and visual bugs with geometry may occur when editing terrain in Team Create.
- The import feature with colormap is more sensitive to material colors than the legacy system.

## Terrain Roadmap

The following features are planned for future terrain updates:

- **Terrain Scattering System** &mdash; Scatter assets across terrain surfaces with rule-based placement tools.
- **Path Splines** &mdash; Create smooth curved paths where terrain adjusts automatically.
- **Projected Decals** &mdash; Project PBR textures onto terrain surfaces.
- **Virtual Texturing** &mdash; Stream virtual texture tiles for improved performance.
- **Signed Distance Fields** &mdash; Generate smooth terrain profiles using SDF techniques.
