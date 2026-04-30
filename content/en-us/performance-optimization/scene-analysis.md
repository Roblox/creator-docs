---
title: Scene Analysis
description: Use the Scene Analysis tool to identify and resolve performance issues in your experience. Check script memory, unparented instances, audio memory, animation memory, the instance composition view, and the extended scene triangle breakdown.
---

The Scene Analysis tool provides a suite of views in Roblox Studio that give you at-a-glance comparative information about how your client and server scenes are put together, what resources they're using, and which instances are responsible for that resource usage. Scene Analysis is designed for use during play and test sessions, and can inspect both the client and server data models.

![Scene Analysis tool overview](../assets/optimization/scene-analysis/overview.png)

## Enable Scene Analysis

1. Enable the **Scene Analysis** beta feature in **File** > **Beta Features**.
1. In the menu bar, select **Window** > **Performance Summary** > **Scene Analysis**.

## Use Scene Analysis

Scene Analysis is designed to be used during a play or test session. Open the Scene Analysis window and browse the available modes. When a mode is active, you see a display of boxes—the squarified treemap view—showing the relative sizes of the resources being viewed and the instances that are contributing to them.

- Below the squarified treemap view is a list of all the items in the current view.
- Right-clicking a selected item in Scene Analysis usually lets you jump directly to that item in the Explorer.
- You can use the search bar to filter by name in the current display.

## Modes

Scene Analysis has many different modes, each of which caters to a different use case.

### Script memory

This view shows how much memory each `Class.Script`, `Class.LocalScript`, and `Class.ModuleScript` is using in the Luau system. This is the memory used by tables and other script allocations, not the memory used by assets such as animations, textures, and sounds. The view is further broken down by the common locations from which scripts are executed, and by `Class.Script` versus `Class.ModuleScript`.

### Unparented instances

The unparented instances view shows which scripts and modules are holding references to instances, as a count per type.

Scripts holding references to instances is normal and is not, on its own, an indication of a bug or memory leak. However, if you're investigating a memory leak, this view makes it easy to spot whether a script is doing something you didn't expect.

If you're still stuck tracking down a memory leak, this tool is complementary to the Developer Console's Heap Memory Profiler, which can show you more information about individual allocations.

Right-click any script in this view to select it directly in the Explorer.

### Instance composition

The instance composition view gives you an overall view of which instances are currently present on the client or server. This is invaluable when working on large and complex builds, as each instance has both replication and memory costs.

The categorizations, such as Characters, Geometry, and Textures, are designed to help you understand how your scene is balanced. For example, perhaps you didn't mean to have 25,000 particle emitters, but this view lets you know.

This view also makes it easy to select all instances of a given type.

### Audio memory

The audio memory view shows how much memory each audio asset is currently consuming. The actual memory used by a given audio track is somewhat complex, but in practical terms, deleting all instances that refer to an audio track allows that memory to unload.

Right-click any audio asset in this view to select all the instances that are using it.

### Animation memory

Animation assets are one of the most common sources of memory leaks in production. Roblox is aggressive about unloading unused animation assets, but it's common for scripts to keep animations alive after their parent model has been destroyed.

As with audio assets, deleting all instances that refer to an animation asset allows it to unload.

This view, along with the unparented instances view, makes it easy to track the lifecycle of animations and how much memory they're actually using.

Right-click any animation in this view to select all the instances that are using it.

### Triangle composition

The triangle composition view gives you a more detailed breakdown of the triangles and draw calls currently being rendered in the main viewport.

These breakdowns include counts for Shadows, Opaque, Transparent, Terrain, Grass, Particles, Sky, and UI.

This compositional information helps you better understand how your scene geometry is composed and identify cases where the scene contains unexpected geometry.

<Alert severity="warning">
The statistics in this view don't necessarily match what players see on their devices. Scaling can cause dramatic differences between a powerful development PC and, for example, a mid-range phone.
</Alert>

## Engine API

You can also access Scene Analysis data programmatically through `Class.SceneAnalysisService`, which is exposed through the [MCP server](../studio/mcp.md). Each method returns tables containing nested children with the same data the visual display uses.

<table>
  <tr>
    <th>Method</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>GetInstanceCompositionAsync</code></td>
    <td>Returns instance counts by category and class from the `Class.DataModel` tree.</td>
  </tr>
  <tr>
    <td><code>GetScriptMemoryAsync</code></td>
    <td>Returns per-script Luau VM heap memory usage in bytes.</td>
  </tr>
  <tr>
    <td><code>GetUnparentedInstancesAsync</code></td>
    <td>Returns instances held by Luau but no longer in the `Class.DataModel`, grouped by host script.</td>
  </tr>
  <tr>
    <td><code>GetTriangleCompositionAsync</code></td>
    <td>Returns triangle and draw call counts by render pass.</td>
  </tr>
  <tr>
    <td><code>GetAnimationMemoryAsync</code></td>
    <td>Returns loaded animation clip memory, deduplicated by clip.</td>
  </tr>
  <tr>
    <td><code>GetAudioMemoryAsync</code></td>
    <td>Returns loaded audio asset memory, deduplicated by asset ID.</td>
  </tr>
</table>
