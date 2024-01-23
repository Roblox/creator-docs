---
title: Models
description: Models are container objects for geometric groupings like parts, Motor6D objects, and other models.
---

**Models** are containers for physical objects, such as parts, welds, and joints that you can use to organize your workspace and group your assets. While models can often contain connected parts, known as an [assembly](../physics/assemblies.md), models can contain any number of individual parts and other objects, such as scripts, and attachments.

Characters, such as avatars or NPCs, are a single `Class.Model` containing the appropriate humanoid parts, joints, and additional components:

<GridContainer numColumns="2">
	<figure>
		<img src="../assets/modeling/model-objects/Model-Example-3D.jpg" alt="Model named Octavia" />
		<figcaption>A model named Octavia</figcaption>
	</figure>
	<figure>
    	<img src="../assets/modeling/model-objects/Model-Example-Hierarchy.png" width="320" alt="The groupings which comprise the Octavia model in Studio's Explorer window" />
    	<figcaption>The groupings that comprise the model</figcaption>
    </figure>
</GridContainer>

## Creating Models

When you **group** objects together, they automatically become a `Class.Model` object.

1. In the 3D viewport or the [Explorer](../studio/explorer.md) window, select every object that you want to group into a model.
1. Right-click on one of the objects and select **Group**, or press <kbd>Ctrl</kbd><kbd>G</kbd> on Windows or <kbd>⌘</kbd><kbd>G</kbd> on Mac. A new `Class.Model` object displays with all of the objects that make up the model nested underneath.

   <img src="../assets/modeling/model-objects/Model-Group-Simple.png" width="320" alt="Three basic objects grouped into a Model object" />

<Alert severity="info">
To completely ungroup a model back to its original objects, right-click it and select **Ungroup**, or press <kbd>Ctrl</kbd><kbd>U</kbd> on Windows or <kbd>⌘</kbd><kbd>U</kbd> on Mac.
</Alert>

### Setting a Primary Part

If you have a model with parts that are joined together through physical joints like `Class.WeldConstraint|WeldConstraints` or `Class.Motor6D|Motor6Ds`, you should specify a `Class.BasePart` within the model to become a `Class.Model.PrimaryPart|PrimaryPart`. A model's `Class.Model.PrimaryPart|PrimaryPart` is the physical reference that specifies which `Class.BasePart` the pivot point and bounding box should move with when the model changes position or orientation.

To set a primary part:

1. In the [Explorer](../studio/explorer.md) window, select a model.
1. In the [Properties](../studio/properties.md) window, select the **PrimaryPart** property. Your cursor changes.
1. Back in the [Explorer](../studio/explorer.md) window, select the `Class.BasePart` that you want to become your primary part.

## Selecting Models

As you hover over models in the viewport, they are outlined to indicate their potential selection. You can select an outlined model by clicking it, or you can select multiple models by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="Multiple models selected in 3D viewport"/>

As models typically contain multiple child [parts](../parts/index.md) or [meshes](../parts/meshes.md), some children may be hidden from view. To select a specific child without moving the camera around or locating the child in the [Explorer](../studio/explorer.md) hierarchy, click while holding <kbd>Alt</kbd> on Windows or <kbd>⌥</kbd> on Mac to perform [selection cycling](../studio/ui-overview.md#selection-cycling).

<figure>
  <video src="../assets/studio/general/Selection-Cycling.mp4" controls width="80%" alt="Video showing selection cycling through a model"></video>
  <figcaption>Selection cycling</figcaption>
</figure>

## Transforming Models

You can move, scale, or rotate a model using the Studio transform tools within the [Home](../studio/home-tab.md) and [Model](../studio/model-tab.md) tabs. Unless you've set a [primary part](#setting-a-primary-part), a model transforms based on the center of its bounding box.

<img src="../assets/studio/general/Model-Tab-Transform-Tools.png"
   width="830" alt="Transform tools indicated in Model tab" />

Additionally, within a `Class.Script` or `Class.LocalScript`, you can move or rotate a model through the following methods:

<table>
<thead>
  <tr>
    <th>Method</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.Model:MoveTo()|MoveTo()`</td>
	<td>Moves the model's `Class.Model.PrimaryPart|PrimaryPart` to the given position. If a primary part has not been specified, the root part of the model will be used.</td>
  </tr>
  <tr>
    <td>`Class.PVInstance:PivotTo()|PivotTo()`</td>
	<td>Transforms the model along with all of its descendant `Class.PVInstance|PVInstances` such that the pivot is located at the specified `Datatype.CFrame`.</td>
  </tr>
  <tr>
    <td>`Class.Model:TranslateBy()|TranslateBy()`</td>
	<td>Shifts a model by the given `Datatype.Vector3` offset, preserving the model's orientation.</td>
  </tr>
</tbody>
</table>

## Model Behaviors

While models act similarly to `Class.Folder` objects for most purposes in your experience, they also exhibit some unique behaviors.

### Character Models

When a `Class.Humanoid` is present inside a model that contains a `Class.Part` named **Head**, Roblox displays a name and/or health bar above that part. For more information, see [Character Name/Health Display](../characters/name-health-display.md).

<img src="../assets/avatar/name-health-display/Display-Indicated.jpg" width="800" alt="Character display information above an in-experience avatar" />

### Destroy Height

To prevent parts that have fallen off of an experience's map from continuing to fall forever, Studio automatically destroys parts that fall below the `Class.Workspace.FallenPartsDestroyHeight` value. If a part destroyed due to this behavior is the last part in a model, then that model will also be destroyed.

## Model Streaming

Instance [streaming](../workspace/streaming.md) dynamically loads and unloads `Class.Model|Models` on a player's device as their character explores the 3D world. With streaming enabled, you can specify the way each model should be treated under streaming behavior. For example, a model set to [Persistent](../workspace/streaming.md#persistent) will never stream out, or a model set to [Atomic](../workspace/streaming.md#atomic) will stream in and out as a single unit with all of its descendants.

Because 3D content that exists on the client changes dynamically in a streaming-enabled experience, models may suddenly disappear. To alleviate this, you can set specific models to render as lower resolution "imposter" meshes when streamed out, as detailed in [Model Level&nbsp;of&nbsp;Detail](../workspace/streaming.md#model-level-of-detail).

See [Model Streaming Controls](../workspace/streaming.md#model-streaming-controls) for more on model-level streaming controls.

## Publishing Models

You can [publish](../production/publishing/publishing-assets.md) models to the [Creator Store](../production/publishing/creator-store.md) for other creators to use within their own experiences. As with any asset, all models must adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), and the [DMCA Guidelines](../production/publishing/dmca-guidelines.md) regarding copyright.
