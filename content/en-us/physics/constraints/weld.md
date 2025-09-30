---
title: Weld
description: WeldConstraint attaches two BaseParts together and ensures they stay in the same relative position and orientation to each other.
---

A `Class.WeldConstraint` connects two `Class.BasePart|BaseParts` and ensures they stay in the same relative position and orientation to each other. Even if the two parts are not touching, you can weld them together.

<Alert severity="info">
To attach two `Class.Attachment|Attachments` or `Class.Bone|Bones`, versus two `Class.BasePart|BaseParts`, see [RigidConstraint](../../physics/constraints/rigid.md).
</Alert>

Unique to `Class.WeldConstraint` are slight behavioral differences in how Studio handles creation and repositioning of welded parts.

<Tabs>
<TabItem label="Weld Creation">
When creating a `Class.WeldConstraint` using Studio's [Constraint](../mechanical-constraints.md#create-constraints) button, the tool behaves differently depending on how many `Class.BasePart|BaseParts` are selected when the tool is activated:

- If no `Class.BasePart|BaseParts` are selected, the next two `Class.BasePart|BaseParts` clicked will be connected by a new `Class.WeldConstraint`. If the same `Class.BasePart` is clicked twice, no constraint will be created.
- If one `Class.BasePart` is already selected, the next `Class.BasePart` clicked will be connected to the selected one with a new `Class.WeldConstraint`.
- If multiple `Class.BasePart|BaseParts` are selected, those which are touching or overlapping will be automatically welded together by new `Class.WeldConstraint|WeldConstraints`.
</TabItem>
<TabItem label="Repositioning Welded Parts">
Roblox handles moving a welded part differently depending on whether the part
was moved through its `Class.BasePart.Position|Position` or through its
`Datatype.CFrame`.

- If a welded part's `Class.BasePart.Position|Position` is updated, that part
  will move but none of the connected parts will move with it. The weld will
  recalculate the offset from the other parts based on the moved part's new
  position.

- If a welded part's `Datatype.CFrame` is updated, that part will move **and**
  all of the connected parts will also move, ensuring they maintain the same
  offset as when the weld was created.
</TabItem>
</Tabs>
