---
title: Model Tab
description: The Model tab contains tools for manipulating 3D objects and models, working with physical constraints, and more.
---

The **Model** tab contains tools for manipulating 3D objects in the workspace, creating detailed models, working with physical constraints, and adding advanced objects.

<img src="../assets/studio/general/Toolbar-Model-Tab.png" width="830" alt="Model tab indicated in Studio toolbar" />

## Transform Tools

The primary transform tools include **Select**, **Move**, **Scale**, **Rotate**, and **Transform**. When you choose a tool, visual draggers display on the selected object in the 3D viewport.

<img src="../assets/studio/general/Model-Tab-Transform-Tools.png"
   width="830" alt="Transform tools indicated in Model tab" />

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/modeling/parts/Manipulate-Move.png" alt="Move draggers shown on part in 3D viewport" />
    <figcaption>Move</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/parts/Manipulate-Scale.png" alt="Scale draggers shown on part in 3D viewport" />
    <figcaption>Scale</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/parts/Manipulate-Rotate.png" alt="Rotate draggers shown on part in 3D viewport" />
    <figcaption>Rotate</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
If the selected object and its visual draggers are not currently in view within the 3D viewport, you can press the <kbd>Tab</kbd> key to "summon" the draggers to your mouse pointer position, allowing you to transform the selected object from your current viewpoint.
</Alert>

### Mode

The **Mode** selector toggles between standard geometric transformations and [simulation of mechanical constraints](../physics/mechanical-constraints.md#simulating-constraints) while moving or rotating parts.

<img src="../assets/studio/general/Model-Tab-Mode.png" width="770" alt="Mode selector indicated in Model tab" />

### Collisions

The **Collisions** checkbox toggles the collisions state when you're transforming objects. If collisions are **off**, you can move, scale, and rotate objects so that they overlap each other; if collisions are **on**, you cannot transform objects to overlap other objects.

<img src="../assets/studio/general/Model-Tab-Collisions-On.png"
   width="830" alt="Collisions checkbox indicated in Model tab" />

### Transform Snapping

Snap increments for tool transforms are based on **studs** for moving/scaling or **degrees** for rotating. You can enable or disable snapping through the checkbox next to **Rotate** or **Move**, and adjust the rotation/transform increments via the input fields.

<img src="../assets/studio/general/Model-Tab-Transform-Snapping.png"
   width="830" alt="Transform snapping tools indicated in Model tab" />

### Transform Coordinates

<kbd>Ctrl</kbd><kbd>L</kbd> on Windows or <kbd>⌘</kbd><kbd>L</kbd> on Mac toggles between transforming an object relative to **world** coordinates or the object's **local** coordinates. When in local mode, an **L** symbol appears to the lower-right of the object.

<Tabs>
  <TabItem label="World">
    <img src="../assets/modeling/parts/Manipulate-World-Orientation.png" width="480" alt="Part draggers in World orientation mode" />
  </TabItem>
  <TabItem label="Local">
    <img src="../assets/modeling/parts/Manipulate-Local-Orientation.png" width="480" alt="Part draggers in Local orientation mode" />
  </TabItem>
</Tabs>

## Pivot Tools

The **Pivot** tools give you full control over the points around which objects rotate and translate. See [Pivot&nbsp;Tools](../studio/pivot-tools.md) for details.

<img src="../assets/studio/general/Model-Tab-Pivot-Tools.png" width="830" alt="Pivot Tools indicated in Model tab" />

## Align Tool

The **Align Tool** button opens a set of tools for aligning objects or groups of objects along the X, Y, or Z axes. For more information, see [Align&nbsp;Tool](../studio/align-tool.md).

<img src="../assets/studio/general/Model-Tab-Align-Tool.png" width="830" alt="Align Tool indicated in Model tab" />

## Part Insertion

The **Part** button inserts a new part into the workspace. Clicking the small dropdown arrow on the button lets you select either **Block**, **Sphere**, **Wedge**, **Corner&nbsp;Wedge**, or **Cylinder**. For more information, see [Parts](../parts/index.md).

<img src="../assets/studio/general/Model-Tab-Part-Tools.png" width="826" alt="Part menu indicated in Model tab" />

## Material Manager

The **Material&nbsp;Manager** window lets you apply and create custom materials for parts and [terrain](../parts/terrain.md). See [Materials](../parts/materials.md) for details.

<img src="../assets/studio/general/Model-Tab-Material-Manager-Trimmed.png" width="826" alt="Material Manager indicated in Model tab" />

## Color Picker

Clicking the small dropdown arrow on the **Color** button reveals a hexagonal color picker and, by default, applies the chosen color to all selected parts. You can also apply a chosen color as a painting tool by toggling on **Color Action as Tool** and clicking specific parts in the 3D viewport.

<img src="../assets/studio/general/Model-Tab-Color-Tools.png" width="770" alt="Color button indicated in Model tab" />

For alternative ways to apply custom colors, see [Coloring Parts](../parts/index.md#coloring-parts).

## Group Tools

You can group objects into a [model](../parts/models.md) by selecting them and clicking the **Group** button. This action has a default shortcut of <kbd>Ctrl</kbd><kbd>G</kbd> (Windows) or <kbd>⌘</kbd><kbd>G</kbd> (Mac).

Alternatively, you can group objects into a [folder](../studio/explorer.md#organizing-by-folders) by clicking the small arrow next to the button and selecting **Group as a Folder**. This action has a default shortcut of <kbd>Alt</kbd><kbd>Ctrl</kbd><kbd>G</kbd> (Windows) or <kbd>⌥</kbd><kbd>⌘</kbd><kbd>G</kbd> (Mac).

To **ungroup** an existing model or folder, click the small arrow next to the button and select **Ungroup**. This action has a default shortcut of <kbd>Ctrl</kbd><kbd>U</kbd> (Windows) or <kbd>⌘</kbd><kbd>U</kbd> (Mac).

<img src="../assets/studio/general/Model-Tab-Group-Tools.png" width="770" alt="Group tools indicated in Model tab" />

## Lock Tools

You can enable the **Lock Tool** by clicking the small arrow next to the **Lock** button and selecting **Lock&nbsp;Tool**. This action has a default shortcut of <kbd>Alt</kbd><kbd>L</kbd> (Windows) or <kbd>⌥</kbd><kbd>L</kbd> (Mac).

Once enabled, the tool operates as a "key" for both states&nbsp;&mdash; clicking on an unlocked object locks it, while clicking a locked object unlocks it.

To unlock all objects, click the small arrow next to the button and select **Unlock&nbsp;All**.

<img src="../assets/studio/general/Model-Tab-Lock-Tools.png" width="770" alt="Lock tools indicated in Model tab" />

## Anchor Toggle

The **Anchor** toggle controls whether the part will be **immovable** by physics. When `Class.BasePart.Anchored|Anchored`, a part will never change position due to gravity, other parts collisions, overlapping other parts, or any other physics-related causes. This action has a default shortcut of <kbd>Alt</kbd><kbd>A</kbd> (Windows) or <kbd>⌥</kbd><kbd>A</kbd> (Mac).

<img src="../assets/studio/general/Model-Tab-Anchor.png" width="770" alt="Anchor toggle indicated in Model tab" />

## Solid Modeling

The **Solid Modeling** section contains tools to create new geometry beyond the basic [parts](../parts/index.md) Roblox provides. For more information, see [Solid Modeling](../parts/solid-modeling.md).

<img src="../assets/studio/general/Model-Tab-Solid-Modeling.png" alt="Solid modeling tools indicated in Model tab" width="754" />

<table>
  <thead>
    <tr>
      <th>Tool</th>
	  <th>Shortcut</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Union**</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>G</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>G</kbd> (Mac)</td>
      <td>Join two or more parts together to form a single solid union.</td>
    </tr>
	<tr>
      <td>**Intersect**</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>I</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>I</kbd> (Mac)</td>
      <td>Intersect overlapping parts into a single solid intersection.</td>
    </tr>
    <tr>
      <td>**Negate**</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>N</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>N</kbd> (Mac)</td>
      <td>Negate parts, useful for making holes and indentations.</td>
    </tr>
    <tr>
      <td>**Separate**</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>U</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>U</kbd> (Mac)</td>
      <td>Separate the union or intersection back into its individual parts.</td>
    </tr>
  </tbody>
</table>

## Physical Constraints

The **Constraints** section contains tools for creating physical `Class.Constraint|Constraints` between objects.

<img src="../assets/studio/general/Model-Tab-Constraints.png" width="740" />

Constraints are categorized into two groups:

- [Mechanical Constraints](../physics/mechanical-constraints.md) &mdash; Constraints in this group behave as mechanical connections, including hinges, springs, motors, and ropes.
- [Mover Constraints](../physics/mover-constraints.md) &mdash; Constraints in this group apply force or torque to move one or more assemblies

## Effects and Spawns

The **Gameplay** section tools allow you to insert beautiful effects like [lights](../environment/index.md) and [particle emitters](../effects/particle-emitters.md), as well as quickly insert a `Class.SpawnLocation` into the 3D space.

<img src="../assets/studio/general/Model-Tab-Effects-Spawn.png" width="754" alt="Effects and Spawn tools indicated in Model tab" />

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Effects**</td>
    <td>Creates a new light or effect within the workspace or the selected object. The dropdown lets you select which type of effect to create.</td>
  </tr>
  <tr>
    <td>**Spawn**</td>
    <td>Adds a `Class.SpawnLocation` for players to appear at when they join the experience.</td>
  </tr>
</tbody>
</table>

## Advanced Options

The **Advanced** section contains tools to insert advanced objects, services, and scripts, as well as configure [collision filtering](../workspace/collisions.md#collision-filtering).

<img src="../assets/studio/general/Model-Tab-Advanced-Options.png" width="740" alt="Advanced options indicated in Model tab" />

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Insert Object**</td>
    <td>Opens the <b>Insert Object</b> popup for quick insertion of objects.</td>
  </tr>
  <tr>
    <td>**Model**</td>
    <td>Allows you to import a `Class.Model` from a local file.</td>
  </tr>
  <tr>
    <td>**Service**</td>
    <td>Allows you to insert services which are not listed in the Explorer by default.</td>
  </tr>
  <tr>
    <td>**Collision Groups**</td>
    <td>Opens a window which lets you create and edit collision groups for physical [collision filtering](../workspace/collisions.md#collision-filtering).</td>
  </tr>
  <tr>
    <td>**Run Script**</td>
    <td>Runs a `Class.Script` located in a file on your local machine.</td>
  </tr>
  <tr>
    <td>**Script**</td>
    <td>Inserts a `Class.Script` into the selected `Class.Instance`.</td>
  </tr>
  <tr>
    <td>**LocalScript**</td>
    <td>Inserts a `Class.LocalScript` into the selected `Class.Instance`.</td>
  </tr>
  <tr>
    <td>**ModuleScript**</td>
    <td>Inserts a `Class.ModuleScript` into the selected `Class.Instance`. You can implement his type of script to reuse code across other scripts.</td>
  </tr>
</tbody>
</table>
