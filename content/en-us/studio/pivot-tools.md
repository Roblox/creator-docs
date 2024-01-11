---
title: Pivot Tools
description: Pivot tools and properties give you full control over the points around which objects rotate and translate.
---

The **Pivot** tools and related properties give you full control over the points around which objects rotate and translate.

## Studio Tools

The interactive Studio tools are located in the [Model](./model-tab.md) tab.

<img src="../assets/studio/general/Model-Tab-Pivot-Tools.png" width="830" alt="Pivot Tools indicated in Model tab" />

### Edit Pivot

The **Edit Pivot** tool lets you move or rotate the pivot point of a [part](../parts/index.md) or [model](../parts/models.md). Once set, rotation and scaling occur around the pivot point. For more information, see [Setting a PrimaryPart](../parts/models.md#setting-a-primary-part).

The following diagrams show example pivot locations in relation to object bounds.

<Tabs>
<TabItem label="Center">
<img src="../assets/studio/pivot-tools/Edit-Pivot-Center-A.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Corner">
<img src="../assets/studio/pivot-tools/Edit-Pivot-Corner-A.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Outside Object Bounds">
<img src="../assets/studio/pivot-tools/Edit-Pivot-Outside-A.jpg" width="720" height="405" />
</TabItem>
</Tabs>

When you rotate the pivot of a [model](../parts/models.md), the bounding box of the model also rotates.

<Tabs>
<TabItem label="Orientation = (0, 90, 0)">
<img src="../assets/studio/pivot-tools/Edit-Pivot-Model-A.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Orientation = (0, 135, 0)">
<img src="../assets/studio/pivot-tools/Edit-Pivot-Model-B.jpg" width="720" height="405" />
</TabItem>
<TabItem label="Orientation = (0, 180, 0)">
<img src="../assets/studio/pivot-tools/Edit-Pivot-Model-C.jpg" width="720" height="405" />
</TabItem>
</Tabs>

You can specify a `Class.Model.PrimaryPart|PrimaryPart` for models, which is a `Class.BasePart` within the model that you can use as a positional basis. In terms of pivot points:

<ol type="A">
<li>When you assign a `Class.Model.PrimaryPart|PrimaryPart` to a model, the existing pivot changes to the pivot point of the `Class.Model.PrimaryPart|PrimaryPart`. If you later unassign/clear the `Class.Model.PrimaryPart|PrimaryPart`, the pivot point resets to the **center** of the model's bounding box.</li>
<li>If you **delete** the `Class.Model.PrimaryPart|PrimaryPart` from a model, the pivot point remains in the same location and does **not** revert to its previous position. This prevents a sudden "jump" if you delete any parts from the model.</li>
</ol>

<Tabs>
<TabItem label="Initial Pivot Point">
<img src="../assets/studio/pivot-tools/PrimaryPart-1.jpg" width="720" height="405" />
</TabItem>
<TabItem label="A. PrimaryPart Assigned">
<img src="../assets/studio/pivot-tools/PrimaryPart-2.jpg" width="720" height="405" />
</TabItem>
<TabItem label="B. PrimaryPart Deleted">
<img src="../assets/studio/pivot-tools/PrimaryPart-3.jpg" width="720" height="405" />
</TabItem>
</Tabs>

### Snap

The **Snap** checkbox toggles whether the pivot point snaps to **hotspots** such as corners, edges, or centers when you move it with the **Edit&nbsp;Pivot** tool. When snapping is enabled, hotspots display as small magenta points.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/pivot-tools/Hotspots-Part.jpg" />
    <figcaption>Hotspots on a part</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/pivot-tools/Hotspots-Model.jpg" />
    <figcaption>Hotspots on a model</figcaption>
  </figure>
</GridContainer>

### Reset

The **Reset** button moves the pivot point to the **center** of an object or model's bounding box. This operation is useful after you've changed the composition of a model and wish to place its pivot point at the center of its new bounding box.

## Pivot Properties

In addition to the interactive tools, pivot values can be directly set in the [Properties](../studio/properties.md) window.

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Origin Position**</td>
    <td>Current world location of the object based on its pivot point rather than its bounding box. Useful for setting the precise location of a `Class.Model`.</td>
  </tr>
  <tr>
    <td>**Origin Orientation**</td>
    <td>Current orientation of the object based around its pivot point rather than its bounding box.</td>
  </tr>
  <tr>
    <td>**Pivot Offset Position**</td>
    <td>Precise location of the pivot relative to the object.&sup1;</td>
  </tr>
  <tr>
    <td>**Pivot Offset Orientation**</td>
    <td>Precise pivot orientation.&sup1;</td>
  </tr>
    <tr>
    <td>**World Pivot Position**</td>
    <td>The precise world location of the pivot for `Class.Model|Models` without a `Class.Model.PrimaryPart|PrimaryPart`. If a `Class.Model.PrimaryPart|PrimaryPart` is set, the model will use **Pivot&nbsp;Offset&nbsp;Position** since the pivot becomes relative to that part.&sup1;</td>
  </tr>
    <tr>
    <td>**World Pivot Orientation**</td>
    <td>The precise world orientation for `Class.Model|Models` without a `Class.Model.PrimaryPart|PrimaryPart`. If a `Class.Model.PrimaryPart|PrimaryPart` is set, the model will use **Pivot&nbsp;Offset&nbsp;Orientation** since the pivot becomes relative to that part.&sup1;</td>
  </tr>
</tbody>
</table>

<figcaption><sup>1</sup> Changing this property will not move or rotate the object.</figcaption>

## Scripting Pivots

Beyond the Studio tools, pivot points can be accessed and manipulated in scripts.

<table>
<thead>
  <tr>
    <th>Function or Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.PVInstance:GetPivot()|GetPivot()`</td>
    <td>Queries the current world location of an object's pivot as a `Datatype.CFrame`. This returns an object's position in 3D space regardless of whether it's an individual part or a `Class.Model`.</td>
  </tr>
  <tr>
    <td>`Class.PVInstance:PivotTo()|PivotTo()`</td>
    <td>Moves the object such that its pivot will be located at the specified `Datatype.CFrame`. This allows for uniform object movement of both individual parts and models.</td>
  </tr>
  <tr>
    <td>`Class.BasePart.PivotOffset`</td>
    <td>The `Datatype.CFrame` which specifies the pivot offset; effectively the offset of the pivot from the `Datatype.CFrame` of the `Class.BasePart`.&sup2;</td>
  </tr>
  <tr>
    <td>`Class.BasePart.PivotOffset|Model.WorldPivot`</td>
    <td>For `Class.Model|Models` without a `Class.Model.PrimaryPart|PrimaryPart`, the `Datatype.CFrame` which specifies the model's pivot in world space. If a `Class.Model.PrimaryPart|PrimaryPart` is set, the model will use `Class.BasePart.PivotOffset` since the pivot becomes relative to that part.&sup2;</td>
  </tr>
</tbody>
</table>

<figcaption><sup>2</sup> Changing this property will not move or rotate the object.</figcaption>
