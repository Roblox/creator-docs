---
title: CFrames
description: CFrames, or Coordinate Frames, are a data type that you can use to rotate and position objects in the 3D space.
---

A `Datatype.CFrame`, short for **Coordinate Frame**, is a data type used to rotate and position 3D objects. As either an object property or a standalone unit, a `Datatype.CFrame` contains global x-, y-, and z-coordinates as well as rotation data for each axis. In addition, `Datatype.CFrame|CFrames` contain helpful functions for working with objects in the 3D space.

Some examples of `Datatype.CFrame` applications in a game might be:

- Finding a far-off target point for a projectile, like the position of an enemy targeted by a player's laser blaster.
- Moving the camera so that it focuses on specific NPCs as a player interacts with them.
- Placing a status indicator directly above a player's head to show if they are paralyzed, boosted, poisoned, etc.

## CFrame Basics

### Positioning a CFrame

You can create an empty `Datatype.CFrame` at the default position of (0, 0, 0) by using `Datatype.CFrame.new()`. To position a `Datatype.CFrame` at a specific point, provide x-, y-, and z-coordinates as arguments to `Datatype.CFrame.new()`. In the following example, the `redBlock` part's `Datatype.CFrame` property changes to `newCFrame`, repositioning it to (-2, 2, 4).

```lua highlight='4,7'
local redBlock = workspace.RedBlock

-- Create new CFrame
local newCFrame = CFrame.new(-2, 2, 4)

-- Overwrite redBlock's current CFrame with new CFrame
redBlock.CFrame = newCFrame
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Strict-Position-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Strict-Position-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

Alternatively, you can provide a new `Datatype.Vector3` position to `Datatype.CFrame.new()` and achieve the same result:

```lua highlight='5-6,8'
local redBlock = workspace.RedBlock

-- Create new CFrame
local newVector3 = vector.create(-2, 2, 4)
local newCFrame = CFrame.new(newVector3)

-- Overwrite redBlock's current CFrame with new CFrame
redBlock.CFrame = newCFrame
```

### Rotating a CFrame

To create a rotated `Datatype.CFrame`, use the `Datatype.CFrame.Angles()` constructor, providing a rotation angle in radians for the desired axes. The parameters to `Datatype.CFrame.Angles()` is in radians, not degrees. If you prefer degrees, use `Library.math.rad()` to convert degrees to radians. In the following example, the `redBlock` part rotates 45 degrees counterclockwise on its y-axis.

```lua highlight='4,7'
local redBlock = workspace.RedBlock

-- Create new rotated CFrame
local newCFrame = CFrame.Angles(0, math.rad(45), 0)

-- Overwrite redBlock's current CFrame with new CFrame
redBlock.CFrame = newCFrame
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Strict-Rotation-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Strict-Rotation-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

### Facing Toward a Point

You can use `Datatype.CFrame.new()` to point the front surface of a `Datatype.CFrame` at a specific point in the world. In the following example, `redBlock` part positions at (0, 3, 0) and points its front surface, marked by the white circle, at the `blueCube` part.

```lua highlight='9'
local redBlock = workspace.RedBlock
local blueCube = workspace.BlueCube

-- Create a Vector3 for both the start position and target position
local startPosition = vector.create(0, 3, 0)
local targetPosition = blueCube.Position

-- Put the redBlock at 'startPosition' and point its front surface at 'targetPosition'
redBlock.CFrame = CFrame.new(startPosition, targetPosition)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Front-Face-Pointing-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Front-Face-Pointing-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

### Offsetting a CFrame

To offset an object by a specific number of studs from its current position, add or subtract a `Datatype.Vector3` to or from a new `Datatype.CFrame` at the object's position. To get a properly-formatted `Datatype.Vector3` position of an object to use with `Datatype.CFrame.new()`, as seen here, its `Class.BasePart.Position|Position` property (`redBlock.Position`) is a convenient shortcut.

```lua highlight='3'
local redBlock = workspace.RedBlock

redBlock.CFrame = CFrame.new(redBlock.Position) + vector.create(0, 1.25, 0)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Self-Offset-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Self-Offset-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

You can use the same technique to offset an object from the position of another object. In the following example, a `Datatype.Vector3` adds to a new `Datatype.CFrame` created at the blue cube's position instead of the block's position.

```lua highlight='4'
local redBlock = workspace.RedBlock
local blueCube = workspace.BlueCube

redBlock.CFrame = CFrame.new(blueCube.Position) + vector.create(0, 2, 0)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Other-Part-Offset-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Other-Part-Offset-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

## Dynamic CFrame Orientation

The `Datatype.CFrame.new()` and `Datatype.CFrame.Angles()` constructors reposition or rotate an object at a specific orientation within the world, but you sometimes can't rely on a fixed world position and rotation angle. For example:

- Placing a floating treasure directly in front of a player who may be standing anywhere in the world, facing any direction.
- Making a magical genie appear directly above a player's right shoulder.

In these cases, use `Datatype.CFrame` methods instead of their constructors.

### Relative Position

The `Datatype.CFrame:ToWorldSpace()` function transforms an object's `Datatype.CFrame`&nbsp;&mdash; respecting its own local orientation&nbsp;&mdash; to a new **world** orientation. This makes it ideal for offsetting a part relative to itself or another object, regardless of how it's currently positioned/rotated.

In the following example, the `redBlock` part offsets 2 studs relative to the y-axis of the blue cube (the green arrow pointing through it) and **not** relative to the global y-axis pointing straight up.

```lua highlight='4-5'
local redBlock = workspace.RedBlock
local blueCube = workspace.BlueCube

local offsetCFrame = CFrame.new(0, 2, 0)
redBlock.CFrame = blueCube.CFrame:ToWorldSpace(offsetCFrame)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Other-Part-Relative-Position-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Other-Part-Relative-Position-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

### Relative Rotation

You can also use `Datatype.CFrame:ToWorldSpace()` to rotate an object relative to itself. In the following example, the `redBlock` part rotates 70 degrees counterclockwise on its y-axis and 20 degrees clockwise on its z-axis.

```lua highlight='3-4'
local redBlock = workspace.RedBlock

local rotatedCFrame = CFrame.Angles(0, math.rad(70), math.rad(20))
redBlock.CFrame = redBlock.CFrame:ToWorldSpace(rotatedCFrame)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Self-Rotate-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Self-Rotate-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

### Facing a Specific Surface Toward a Point

You can make the front of an object face another object by supplying a `Datatype.Vector3` point as the second parameter of `Datatype.CFrame.new()`. You can also use relative rotation to make any face of the object point toward a `Datatype.Vector3` point. The following example performs two consecutive `Datatype.CFrame` operations:

1. Point the **front** surface, marked by the white circle, at the target.
2. Rotate the `Datatype.CFrame` to make the **top** surface, marked by the black circle, point toward the target.

```lua highlight='8,11-12'
local redBlock = workspace.RedBlock
local blueCube = workspace.BlueCube

-- Create a Vector3 for the target position
local targetPosition = blueCube.Position

-- Point the redBlock's front surface at 'targetPosition'
redBlock.CFrame = CFrame.new(redBlock.Position, targetPosition)

-- Now the redBlock's front surface (white circle) is pointing towards the blueCube

-- Rotate redBlock's CFrame relative to itself so that its top surface (not front) points toward the target
local rotatedCFrame = CFrame.Angles(math.rad(-90), 0, 0)
redBlock.CFrame = redBlock.CFrame:ToWorldSpace(rotatedCFrame)

-- Now the redBlock's top surface (black circle) is pointing towards the blueCube (as seen in After below)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Top-Face-Pointing-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Top-Face-Pointing-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

### Finding a Point Between Points

You can use **linear interpolation**, or **lerp**, to position a `Datatype.CFrame` between two points. In the following example, the `redBlock` part repositions between the `greenCube` and `cyanCube` parts. The value of `0.7` places it 70% of the distance away from the green cube.

```lua highlight='5'
local redBlock = workspace.RedBlock
local greenCube = workspace.GreenCube
local cyanCube = workspace.CyanCube

redBlock.CFrame = greenCube.CFrame:Lerp(cyanCube.CFrame, 0.7)
```

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Lerp-A.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/cframes/CFrame-Lerp-B.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>
