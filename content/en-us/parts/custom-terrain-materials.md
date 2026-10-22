---
title: Custom terrain materials
description: Enable Expanded Terrain to paint up to 62 custom materials onto terrain and take advantage of terrain performance improvements.
---

**Custom terrain materials** let you define up to 62 paintable materials for terrain so you can build distinct environments within a single place or add more color and variety to an existing landscape. Each material can use a custom color and an optional `Class.MaterialVariant` for custom textures.

## Enable Expanded Terrain

Expanded Terrain is off by default and is enabled per place. Enabling it swaps the terrain backend, so the place must reopen for the change to take effect.

To enable custom terrain materials in a place:

1. In a place in Studio, go to the [Explorer](../studio/explorer.md) and select `Class.Workspace`.
2. In the [Properties](../studio/properties.md) window, set **Expanded Terrain** to **Enabled**.
3. In the **Restart Place** dialog, click **Restart**.

<Alert severity="info">
When you enable this feature in a new place, Studio saves and closes the place for you. You must still reopen the place for the change to take effect.
</Alert>

## Create custom terrain materials

You can create custom terrain materials from the Terrain Editor's material picker:

1. Open the **Terrain Editor** and choose a brush tool such as **Paint**, **Draw**, **Fill**, or **Sculpt**.
2. Open the material picker next to **Source Material**.
3. Click the **+** icon to create a new terrain material.
4. Choose a name and a base material. You can select a `Class.MaterialVariant` to apply custom textures or adjust the **Color** to tint the material.
5. Paint, draw, fill, or sculpt with the selected material.

<img src="../assets/modeling/terrain/Create-Terrain-Material.png" width="700" alt="Create Terrain Material dialog with a name, base material, optional material variant, and color tint." />

You can also use custom terrain materials with the **Replace** tool to swap one material for another without changing the rest of the terrain.

Custom terrain materials support multiple color variations of both default terrain materials and custom `Class.MaterialVariant|MaterialVariants`. For example, you can create several shades of grass in the same place instead of overriding a single base material globally.

To create a `Class.MaterialVariant` for use with terrain materials, see [Custom materials](../parts/materials.md#custom-materials). You can also generate variants with the [Material Generator](../studio/material-generator.md).

## Manage terrain materials

Use the **Terrain Materials Manager** to add, remove, or edit custom terrain materials for a place.

Open the manager from **Window** ⟩ **3D**, or right-click a material in the Terrain Editor material picker and select **Open in Terrain Material Manager**.

<img src="../assets/modeling/terrain/Terrain-Material-Manager.png" width="480" alt="Terrain Material Manager window showing terrain materials arranged by slot." />

When you change a material's settings, such as its color, the update applies immediately to all terrain that uses that material. If you delete a material that the terrain still uses, the affected terrain turns bright purple so you can identify and replace it.

## Limitations

- Custom physical properties on a `Class.MaterialVariant` aren't yet respected by custom terrain material slots.
- Editing terrain in Team Create might introduce meshing or visual bugs.
- Heightmap and colormap import might produce different results than before. Import with a colormap is more sensitive to the colors of your materials.
