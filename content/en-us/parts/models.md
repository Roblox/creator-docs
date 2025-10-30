---
title: Models
description: Models are container objects for geometric groupings like parts, Motor6D objects, and other models.
---

**Models** are containers for physical objects that you can use to organize your workspace and group your assets, such as parts, welds, or joints. While models often contain connected parts known as an [assembly](../physics/assemblies.md), they can also contain any number of individual parts or objects, such as scripts, attachments, or other models.

To demonstrate, avatar characters are a single `Class.Model` containing the appropriate humanoid parts, joints, and scripts necessary for runtime behavior:

<GridContainer numColumns="2">
	<figure>
		<img src="../assets/modeling/model-objects/Model-Example-3D.jpg" width="80%" alt="An example character model of a humanoid monster girl in a dark purple dress." />
		<figcaption>A model named Octavia</figcaption>
	</figure>
	<figure>
    	<img src="../assets/modeling/model-objects/Model-Example-Hierarchy.png" width="68%" alt="The groupings which comprise the Octavia model in Studio's Explorer window." />
    	<figcaption>The groupings that comprise the model</figcaption>
    </figure>
</GridContainer>

## Create models

<Alert severity="warning">
You can create models using any open use or restricted asset, but any restricted assets that you don't have [explicit permission](../projects/assets/privacy.md#view-permissions) to use are **not** visible or audible at runtime unless the experience itself has permission to use those assets.
</Alert>

There are two ways to create models:

- Group objects together to automatically form a `Class.Model` object.
- Insert an empty `Class.Model` object into the Workspace, then manually add child objects to the model.

To create a model using the grouping method:

1. In the **Explorer** window or 3D viewport, select every object that you want to group into a model.
1. Right-click on one of the objects and select **Group**, or press <kbd>Ctrl</kbd><kbd>G</kbd> on Windows or <kbd>⌘</kbd><kbd>G</kbd> on Mac. A new `Class.Model` object displays with all of the objects that make up the model nested underneath.

   <img src="../assets/modeling/model-objects/Model-Group-Simple.png" width="320" alt="A close up view of the Explorer window. A Model object is highlighted with three nested children." />

<Alert severity="info">
To completely ungroup a model back to its original objects, right-click it and select **Ungroup**, or press <kbd>Ctrl</kbd><kbd>U</kbd> on Windows or <kbd>⌘</kbd><kbd>U</kbd> on Mac.
</Alert>

### Set a primary part

If you have a model with parts that are joined together through physical joints like `Class.WeldConstraint|WeldConstraints` or `Class.Motor6D|Motor6Ds`, you should specify a `Class.BasePart` within the model to become a `Class.Model.PrimaryPart|PrimaryPart`. A model's `Class.Model.PrimaryPart|PrimaryPart` is the physical reference that specifies which `Class.BasePart` the pivot point and bounding box should move with when the model changes position or orientation.

To set a primary part:

1. In the **Explorer** window, select a model.
1. In the **Properties** window, select the **PrimaryPart** property. Your cursor changes.
1. Back in the **Explorer** window, select the part that you want to become your primary part.

## Select models

As you hover over models in the viewport, they are outlined to indicate their potential selection. You can select an outlined model by clicking it, or you can select multiple models by holding <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, or <kbd>⌘</kbd> as you hover over and click them.

<img src="../assets/studio/general/Editor-Window-Object-Selection.jpg" width="800" alt="A warehouse view in the 3D viewport. Multiple models are selected and highlighted with a light blue outline."/>

As models typically contain multiple child [parts](../parts/index.md) or [meshes](../parts/meshes.md), some children may be hidden from view. To select a specific child without moving the camera around or locating the child in the [Explorer](../studio/explorer.md) hierarchy, click while holding <kbd>Alt</kbd> on Windows or <kbd>⌥</kbd> on Mac to perform [selection cycling](../studio/ui-overview.md#selection-cycling).

<figure>
  <video src="../assets/studio/general/Selection-Cycling.mp4" controls width="80%" alt="Video showing selection cycling through a model"></video>
  <figcaption>Selection cycling</figcaption>
</figure>

## Transform models

You can move, scale, or rotate a model using the Studio [transform](../parts/index.md#transform-parts) tools. Unless you've set a [primary part](#set-a-primary-part), a model transforms based on the center of its bounding box.

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

## Model behaviors

While models act similarly to `Class.Folder` objects for most purposes in your experience, they also exhibit some unique behaviors.

### Character models

When a `Class.Humanoid` is present inside a model that contains a `Class.Part` named **Head**, Roblox displays a name and/or health bar above that part. For more information, see [Character Name/Health Display](../characters/name-health-display.md).

<img src="../assets/avatar/name-health-display/Display-Indicated.jpg" width="800" alt="Character display information above an in-experience avatar." />

### Destroy height

To prevent parts that have fallen off of an experience's map from continuing to fall forever, Studio automatically destroys parts that fall below the `Class.Workspace.FallenPartsDestroyHeight` value. If a part destroyed due to this behavior is the last part in a model, then that model will also be destroyed.

## Model streaming

Instance [streaming](../workspace/streaming.md) dynamically loads and unloads `Class.Model|Models` on a player's device as their character explores the 3D world. With streaming enabled, you can specify the way each model should be treated under streaming behavior. For example, a model set to [Persistent](../workspace/streaming.md#persistent) will never stream out, or a model set to [Atomic](../workspace/streaming.md#atomic) will stream in and out as a single unit with all of its descendants. For more information, see [Per-model streaming controls](../workspace/streaming.md#per-model-streaming-controls).

Because the 3D content that exists on the client changes dynamically in a streaming-enabled experience, models might suddenly disappear, which can be visually jarring for the player. To avoid this situation, you can set specific models to render as optimized "SLIM" meshes or as lower resolution "imposter" meshes when streamed out. See [Model level of detail](../workspace/streaming.md#model-level-of-detail).

## Upload models

When you upload or import a `.gltf`, `.fbx` and `.obj` model file to the cloud using the [3D Importer](../art/accessories/creating-rigid/importing.md), Roblox represents it as a cloud-based asset with a unique corresponding ID. This cloud-based asset system allows you to store models through Roblox and reuse them across the platform in various contexts without maintaining local copies as part of each saved Studio experience.

To upload a model you made in Studio:

1. In the **Explorer** window, right-click your model. A contextual menu displays.
2. Select **Save to Roblox**. The **Asset Configuration** window displays.
3. In the **Asset Configuration** window,
   1. Set **Content Type** to **Development Item**.
   1. Set **Asset Category** to **Model**.
   1. Complete the following fields:

      - **Title** - The name of your model.
      - **Description** - A short description of your model.
      - **Creator** - Use the dropdown to select if you'd like to publish this asset as an individual or as part of an associated group.
      - **Genre** - The genre of your model.

   1. Click the **Save** button. After a moment, the **Asset Configuration** window displays your model's asset ID that you can use in your projects or share with other creators, groups, or experiences. For more information on granting permission to collaborators and experiences so that they can use your models, see [Asset privacy](../projects/assets/privacy.md)

## Distribute models

You can distribute models with less than 15,000 dependencies to the [Creator Store](../production/creator-store.md) for other creators to use within their own experiences as long as each model only references:

- Open use assets.
- Restricted assets that you created, excluding audio and video.
- Audio and video assets from the Creator Store.

If you are in a supported country, you can sell models you created on the Creator Store for **United States Dollars** (USD). Eligible Creators must complete an application form through Stripe to create their seller account, set prices, and receive payouts. For more information and to start onboarding, see [Sell on the Creator Store](../production/sell-on-creator-store.md).

<Alert severity="warning">
If you want to distribute a model with a child audio asset that you created, you must distribute the audio asset on the Creator Store **_before_** making it a child of the model in order for the audio to be audible at runtime.
</Alert>

As with any asset, all models must adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), the [DMCA Guidelines](../production/publishing/dmca-guidelines.md) regarding copyright, and Creator Store [asset moderation](../production/creator-store.md#asset-moderation) rules. If you suspect a rights violation involving your asset, you can submit the content for removal using the [Rights Manager](../production/publishing/rights-manager.md).

When creating models for the Creator Store:

- Read about Roblox [texture specifications and limits](../art/modeling/texture-specifications.md).
- Limit each mesh to a maximum of 20,000 triangles.
- Read and address any warnings shown during the import process.
- Scale and orient your model appropriately during import so that it's usable out of the box when inserted from the Creator Store.
