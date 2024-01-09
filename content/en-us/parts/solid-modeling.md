---
title: Solid Modeling
description: Solid modeling is the process of joining parts together to form complex shapes.
---

**Solid modeling** is the process of joining [parts](../parts/index.md)
together in unique ways to form more complex shapes known as **unions** or **intersections**. You can perform four solid modeling operations using the tools within the [Model](../studio/model-tab.md) tab.

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
      <td>[Union](#unioning-parts)</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>G</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>G</kbd> (Mac)</td>
      <td>Join two or more parts together to form a single solid union.</td>
    </tr>
	<tr>
      <td>[Intersect](#intersecting-parts)</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>I</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>I</kbd> (Mac)</td>
      <td>Intersect overlapping parts into a single solid intersection.</td>
    </tr>
    <tr>
      <td>[Negate](#negating-parts)</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>N</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>N</kbd> (Mac)</td>
      <td>Negate parts, useful for making holes and indentations.</td>
    </tr>
    <tr>
      <td>[Separate](#separating-unions-or-intersections)</td>
	  <td><kbd>Shift</kbd><kbd>Ctrl</kbd><kbd>U</kbd>&nbsp;(Windows)<br /><kbd>Shift</kbd><kbd>⌘</kbd><kbd>U</kbd> (Mac)</td>
      <td>Separate the union or intersection back into its individual parts.</td>
    </tr>
  </tbody>
</table>

## Unioning Parts

The **Union** tool joins two or more parts together to form a single solid `Class.UnionOperation`. By default, a new union respects the `Class.BasePart.Color|Color` property of each of its parts, although you can enable its `Class.PartOperation.UsePartColor|UsePartColor` property to change the entire union to a specific color.

<Tabs>
  <TabItem label="Separate Parts">
    <img src="../assets/modeling/solid-modeling/Separate-Parts-To-Union.jpg" width="720" height="375" alt="Block and cylinder parts overlapping" />
  </TabItem>
  <TabItem label="Unioned">
    <img src="../assets/modeling/solid-modeling/Union-Result.jpg" width="720" height="375" alt="Parts joined together into a single solid union" />
  </TabItem>
</Tabs>

To combine parts together into a union:

1. Select all parts to join together.
2. Click the **Union** button. All of the parts combine into one solid `Class.UnionOperation` with the name **Union**.

   <img src="../assets/studio/general/Model-Tab-Union.png" alt="Union tool indicated in Model tab" width="630" />

## Intersecting Parts

The **Intersect** tool intersects overlapping parts into a single solid `Class.IntersectOperation`. By default, the face colors of the resulting intersection are borrowed from the `Class.BasePart.Color|Color` property of the original parts, although you can enable its `Class.PartOperation.UsePartColor|UsePartColor` property to change the entire intersection to a specific color.

<Tabs>
  <TabItem label="Separate Parts">
    <figure>
      <img src="../assets/modeling/solid-modeling/Separate-Parts-To-Intersect.jpg" width="720" height="375" alt="Block and cylinder parts overlapping" />
    </figure>
  </TabItem>
  <TabItem label="Intersected">
    <figure>
      <img src="../assets/modeling/solid-modeling/Intersect-Result.jpg" width="720" height="375" alt="Parts intersected into a new solid model" />
  </figure>
  </TabItem>
</Tabs>

To intersect overlapping parts together:

1. Select all parts to intersect.
2. Click the **Intersect** button. All of the parts combine into one solid `Class.IntersectOperation` with the name **Intersection**.

   <img src="../assets/studio/general/Model-Tab-Intersect.png" alt="Intersect tool indicated in Model tab" width="630" />

## Negating Parts

The **Negate** tool negates a part so that when it's [unioned with another part](#unioning-parts), the shape of the negated part is **subtracted** from the other part.

<Tabs>
  <TabItem label="Separate Parts">
    <figure>
      <img src="../assets/modeling/solid-modeling/Negated-Part-To-Union.jpg" width="720" height="375" alt="Negated block overlapping a cylinder" />
    </figure>
  </TabItem>
  <TabItem label="Negated">
    <figure>
      <img src="../assets/modeling/solid-modeling/Negate-Result.jpg" width="720" height="375" alt="Negated part subtracted from cylinder" />
  </figure>
  </TabItem>
</Tabs>

To subtract a part from other overlapping parts:

1. Select the part you would like to negate from other parts.
1. Click **Negate**. The part becomes a `Class.NegateOperation` with the name **NegativePart** and turns pink and translucent to indicate its state.

   <img src="../assets/studio/general/Model-Tab-Negate.png" alt="Negate tool indicated in Model tab" width="630" />

1. Select both the negated part and the parts you want to subtract it from.
1. Click **Union**. The negated part is cut out from the included overlapping parts.

   <img src="../assets/studio/general/Model-Tab-Union-Negated.png" alt="Union tool indicated in Model tab" width="630" />

## Separating Unions or Intersections

The **Separate** tool separates a `Class.UnionOperation` back into its individual parts, essentially serving as an "undo" tool for unions and intersections.

To separate a union or intersection back into individual parts:

1. Select a `Class.UnionOperation`.
1. Click **Separate**. The parts separate back into their original form.

   <img src="../assets/studio/general/Model-Tab-Separate.png" alt="Separate tool indicated in Model tab" width="630" />

## Render Fidelity

By default, solid modeled parts will always be shown in **precise fidelity**, no matter how far they are from the camera. This improves their appearance when viewed from any distance, but if a place has a large number of detailed solid modeled parts, it may reduce overall performance.

You can dynamically control a solid modeled part's level of detail through its `Class.PartOperation.RenderFidelity|RenderFidelity` property. When set to **Automatic**, the part will render at a different level of detail depending on its distance from the camera.

<table>
    <thead>
        <tr>
            <th>Distance From Camera</th>
            <th>Render Fidelity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Less than 250 studs</td>
            <td>Highest</td>
        </tr>
        <tr>
            <td>250-500 studs</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>500 or more studs</td>
            <td>Lowest</td>
        </tr>
    </tbody>
</table>

## Smoothing Angle

A solid modeled part's `Class.PartOperation.SmoothingAngle|SmoothingAngle` property smooths angles between adjacent surfaces of the same color or material. A higher value produces a smoother appearance while a lower value produces a rougher appearance with more sharp edges.

While a value between 30 and 70 degrees usually produces a good result, values between 90 and 180 are not recommended as they may cause a "shadowing" effect on unions and intersections with sharp edges.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/solid-modeling/CSG-SmoothingAngle-0.jpg" alt="Solid modeled part with SmoothingAngle of 0" />
    <figcaption>`Class.PartOperation.SmoothingAngle|SmoothingAngle` = 0</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/solid-modeling/CSG-SmoothingAngle-50.jpg" alt="Solid modeled part with SmoothingAngle of 50" />
    <figcaption>`Class.PartOperation.SmoothingAngle|SmoothingAngle` = 50</figcaption>
  </figure>
</GridContainer>

## In-Experience Solid Modeling

In addition to the **Union**, **Intersect**, and **Negate** tools in Studio, you can allow players to use solid modeling operations while inside an experience through `Class.BasePart:UnionAsync()|UnionAsync()`, `Class.BasePart:IntersectAsync()|IntersectAsync()`, and `Class.BasePart:SubtractAsync()|SubtractAsync()`. All of these methods must be called on a `Class.BasePart` and they all require an array of one or more parts to union with, intersect with, or subtract from the calling part.

<Alert severity="warning">
In-experience solid modeling operations are asynchronous, meaning they can impact performance. For best results, you should not perform a large series of `Class.BasePart:UnionAsync()|UnionAsync()`, `Class.BasePart:IntersectAsync()|IntersectAsync()`, or `Class.BasePart:SubtractAsync()|SubtractAsync()` calls in quick succession.
</Alert>

<Alert severity="info">
When performing a `Class.BasePart:UnionAsync()|UnionAsync()`, `Class.BasePart:IntersectAsync()|IntersectAsync()`, or `Class.BasePart:SubtractAsync()|SubtractAsync()` operation, the following properties from the calling part are applied to the resulting union: `Class.BasePart.Color|Color`, `Class.BasePart.Material|Material`, `Class.BasePart.MaterialVariant|MaterialVariant`, `Class.BasePart.Reflectance|Reflectance`, `Class.BasePart.Transparency|Transparency`, `Class.BasePart.Anchored|Anchored`, `Class.BasePart.CanCollide|CanCollide`, `Class.BasePart.Density|Density`, `Class.BasePart.Elasticity|Elasticity`, `Class.BasePart.ElasticityWeight|ElasticityWeight`, `Class.BasePart.Friction|Friction`, and `Class.BasePart.FrictionWeight|FrictionWeight`.
</Alert>

### UnionAsync()

To demonstrate `Class.BasePart:UnionAsync()|UnionAsync()`, the following `Class.Script` uses the **Part1** `Class.BasePart` from the workspace, unions it together with the **Part2**, **Part3**, and **Part4** `Class.BasePart|BaseParts`, then parents the resulting `Class.UnionOperation` to the workspace at the original position of **Part1**.

```lua highlight='6'
local mainPart = workspace.Part1
local otherParts = {workspace.Part2, workspace.Part3, workspace.Part4}

-- Perform union operation
local success, newUnion = pcall(function()
	return mainPart:UnionAsync(otherParts)
end)

-- If operation succeeds, position it at the same location and parent it to the workspace
if success and newUnion then
	newUnion.Position = mainPart.Position
	newUnion.Parent = workspace
end

-- Destroy original parts which remain intact after operation
mainPart:Destroy()
for i = 1, #otherParts do
	otherParts[i]:Destroy()
end
```

### IntersectAsync()

To demonstrate `Class.BasePart:IntersectAsync()|IntersectAsync()`, the following `Class.Script` uses the **Part1** `Class.BasePart` from the workspace, intersects it with the **Part2** and **Part3** `Class.BasePart|BaseParts`, then parents the resulting `Class.IntersectOperation` to the workspace at the original position of **Part1**.

```lua highlight='6'
local mainPart = workspace.Part1
local otherParts = {workspace.Part2, workspace.Part3}

-- Perform intersect operation
local success, newIntersect = pcall(function()
	return mainPart:IntersectAsync(otherParts)
end)

-- If operation succeeds, position it at the same location and parent it to the workspace
if success and newIntersect then
	newIntersect.Position = mainPart.Position
	newIntersect.Parent = workspace
end

-- Destroy original parts which remain intact after operation
mainPart:Destroy()
for i = 1, #otherParts do
	otherParts[i]:Destroy()
end
```

### SubtractAsync()

To demonstrate `Class.BasePart:SubtractAsync()|SubtractAsync()`, the following `Class.Script` uses the **Part1** `Class.BasePart` from the workspace, negates the **Part2**, **Part3**, and **Part4** `Class.BasePart|BaseParts` from it, then parents the resulting `Class.UnionOperation` to the workspace at the original position of **Part1**.

```lua highlight='6'
local mainPart = workspace.Part1
local otherParts = {workspace.Part2, workspace.Part3, workspace.Part4}

-- Perform subtract operation
local success, newSubtract = pcall(function()
	return mainPart:SubtractAsync(otherParts)
end)

-- If operation succeeds, position it at the same location and parent it to the workspace
if success and newSubtract then
	newSubtract.Position = mainPart.Position
	newSubtract.Parent = workspace
end

-- Destroy original parts which remain intact after operation
mainPart:Destroy()
for i = 1, #otherParts do
	otherParts[i]:Destroy()
end
```
