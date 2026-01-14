---
title: CFrames
description: CFrames, or Coordinate Frames, are a data type that you can use to rotate and position objects in the 3D space.
---

A `Datatype.CFrame`, short for **Coordinate Frame**, is a data type used to rotate and position 3D objects. As either an object property or a standalone unit, a `Datatype.CFrame` contains global **X**, **Y**, and **Z** coordinates as well as rotation data for each axis. In addition, `Datatype.CFrame|CFrames` contain helpful functions for working with objects in the 3D space.

## Position a CFrame

You can create an empty `Datatype.CFrame` at the default position of <Typography noWrap>`(0, 0, 0)`</Typography> by using `Datatype.CFrame.new()`. To position a `Datatype.CFrame` at a specific point, provide **X**, **Y**, and **Z** coordinates as arguments to `Datatype.CFrame.new()`. In the following example, the `redBlock` part's `Datatype.CFrame` property changes to `newCFrame`, repositioning it to <Typography noWrap>`(-2, 2, 4)`</Typography>.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock

-- Create new CFrame
local newCFrame = CFrame.new(-2, 2, 4)

-- Overwrite the red block's current CFrame with the new CFrame
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

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock

-- Create new CFrame
local newVector3 = Vector3.new(-2, 2, 4)
local newCFrame = CFrame.new(newVector3)

-- Overwrite the red block's current CFrame with the new CFrame
redBlock.CFrame = newCFrame
```

## Rotate a CFrame

To create a rotated `Datatype.CFrame`, use the `Datatype.CFrame.fromEulerAnglesXYZ()` constructor, providing a rotation angle in radians for the desired axes. The parameters to `Datatype.CFrame.fromEulerAnglesXYZ()` are in radians, not degrees; if you prefer degrees, use `Library.math.rad()` to convert degrees to radians. In the following example, the `redBlock` part rotates 45 degrees counterclockwise on its **Y** axis.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock

-- Create new rotated CFrame
local newCFrame = CFrame.fromEulerAnglesXYZ(0, math.rad(45), 0)

-- Overwrite the red block's current CFrame with the new CFrame
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

## Face a CFrame toward a point

You can use `Datatype.CFrame.lookAt()` to point the front surface of a `Datatype.CFrame` at a specific point in the world. The following example positions `redBlock` at <Typography noWrap>`(0, 3, 0)`</Typography> and points its front surface, marked by the white circle, at the `blueCube` part.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock
local blueCube = Workspace.BlueCube

redBlock.Position = Vector3.new(0, 3, 0)

-- Point the front surface of the red block at the blue cube
redBlock.CFrame = CFrame.lookAt(redBlock.Position, blueCube.Position)
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

## Offset a CFrame

To offset an object by a specific number of studs from its current position, add or subtract a `Datatype.Vector3` to or from a new `Datatype.CFrame` at the object's position. To get a properly-formatted `Datatype.Vector3` position of an object to use with `Datatype.CFrame.new()`, as seen here, its `Class.BasePart.Position|Position` property (`redBlock.Position`) is a convenient shortcut.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock

redBlock.CFrame = CFrame.new(redBlock.Position) + Vector3.new(0, 1.25, 0)
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

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock
local blueCube = Workspace.BlueCube

redBlock.CFrame = CFrame.new(blueCube.Position) + Vector3.new(0, 2, 0)
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

## Dynamic CFrame orientation

The `Datatype.CFrame.new()` and `Datatype.CFrame.fromEulerAnglesXYZ()` constructors reposition or rotate an object at a specific orientation within the world, but you sometimes can't rely on a fixed world position and rotation angle. For example:

- Placing a floating treasure directly in front of a player who may be standing anywhere in the world, facing any direction.
- Making a magical genie appear directly above a player's right shoulder.

In these cases, use `Datatype.CFrame` methods instead of their constructors.

### Relative position

The `Datatype.CFrame:ToWorldSpace()` function transforms an object's `Datatype.CFrame`&nbsp;&mdash; respecting its own local orientation&nbsp;&mdash; to a new **world** orientation. This makes it ideal for offsetting a part relative to itself or another object, regardless of how it's currently positioned/rotated.

In the following example, the `redBlock` part offsets 2 studs relative to the **Y** axis of the blue cube (the green arrow pointing through it) and **not** relative to the global **Y** axis pointing straight up.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock
local blueCube = Workspace.BlueCube

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

### Relative rotation

You can also use `Datatype.CFrame:ToWorldSpace()` to rotate an object relative to itself. In the following example, the `redBlock` part rotates 70 degrees counterclockwise on its **Y** axis and 20 degrees clockwise on its **Z** axis.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock

local rotatedCFrame = CFrame.fromEulerAnglesXYZ(0, math.rad(70), math.rad(20))
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

### Face a specific surface toward a point

You can make the front of an object face another object by supplying a `Datatype.Vector3` point as the second parameter of `Datatype.CFrame.new()`. You can also use relative rotation to make any face of the object point toward a `Datatype.Vector3` point. The following example performs two consecutive `Datatype.CFrame` operations:

1. Point the **front** surface, marked by the white circle, at the target.
2. Rotate the `Datatype.CFrame` to make the **top** surface, marked by the black circle, point toward the target.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock
local blueCube = Workspace.BlueCube

-- Point the red block's front surface at the blue cube
redBlock.CFrame = CFrame.lookAt(redBlock.Position, blueCube.Position)

-- Rotate CFrame relative to itself so that top surface (not front) points toward blue cube
local rotatedCFrame = CFrame.fromEulerAnglesXYZ(math.rad(-90), 0, 0)
redBlock.CFrame = redBlock.CFrame:ToWorldSpace(rotatedCFrame)
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

### Find a point between points

You can use **linear interpolation**, or **lerp**, to position a `Datatype.CFrame` between two points. In the following example, the `redBlock` part repositions between the `greenCube` and `cyanCube` parts. The value of `0.7` places it 70% of the distance away from the green cube.

```lua
local Workspace = game:GetService("Workspace")

local redBlock = Workspace.RedBlock
local greenCube = Workspace.GreenCube
local cyanCube = Workspace.CyanCube

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
