---
title: Graph Editor expressions
description: Expressions let you calculate animation graph property and transition condition values with Luau-like formulas.
---

An **expression** is a short Luau-like formula that reads graph parameters and returns a value, such as `math.clamp((MovementSpeed + 0.5) / MaxSpeed, 0, 1)`. Use expressions to drive a node property or a [state machine transition](./graph-editor-state-machine.md). Expressions keep parameter transformations and animation decisions in your graph, close to the nodes they drive.

## Prerequisites

Before you create an expression, familiarize yourself with the [Animation Graph Editor](./graph-editor.md), including how to [open it and create an animation graph](./graph-editor.md#build-a-graph).

## Create an expression

This example uses an expression to drive the **Position** property of an `Enum.AnimationNodeType|Blend1DNode`. Configure the node with an idle animation at position 0 and a run animation at position 1. The expression converts the character's movement speed into the 0-to-1 range that the node uses to blend between those animations.

1. Add `MovementSpeed` and `MaxSpeed` Number graph parameters.

   <img src="../assets/animation/graph-editor-expressions/Add-Parameters.png" width="60%" alt="Parameters pane showing MovementSpeed and MaxSpeed Number parameters." />

2. Drag a connection from the **Position** property pin of the `Enum.AnimationNodeType|Blend1DNode` and select **New Expression**.

   <img src="../assets/animation/graph-editor-expressions/Add-Expression-Node.gif" width="80%" alt="Animated demonstration of creating an Expression node from the Blend1D Position property pin." />

3. Enter the following expression:

   ```lua
   math.clamp(MovementSpeed / MaxSpeed, 0, 1)
   ```

   <img src="../assets/animation/graph-editor-expressions/Edit-Expression.gif" width="80%" alt="Animated demonstration of entering an expression in an Expression node." />

4. Click outside the expression box to refresh it. As `MovementSpeed` rises toward `MaxSpeed`, the `Enum.AnimationNodeType|Blend1DNode` receives a value from 0 to 1 and blends from the idle animation to the run animation.

After you load the graph onto an `Class.AnimationTrack`, update `MovementSpeed` and `MaxSpeed` from your gameplay script with `Class.AnimationTrack:SetParameter`. The following example uses the `Class.Humanoid.MoveDirection|MoveDirection` and `Class.Humanoid.WalkSpeed|WalkSpeed` properties of a `Class.Humanoid`:

```lua title="Script - Drive expression parameters"
game:GetService("RunService").Stepped:Connect(function()
    animationTrack:SetParameter("MovementSpeed", humanoid.MoveDirection.Magnitude * humanoid.WalkSpeed)
    animationTrack:SetParameter("MaxSpeed", humanoid.WalkSpeed)
end)
```

The expression evaluates as the parameter values change. For the parameter workflow, see [API integration](./graph-editor.md#api-integration).

## What is supported

Expression support includes arithmetic and comparison operations, logical and conditional expressions, calls to functions in the `Library.math` library, construction and member access for `Datatype.CFrame`, `Datatype.Vector2`, `Datatype.Vector3`, and `Datatype.Color3` values, and string concatenation. The following sections list the supported syntax and functions.

### Arithmetic and comparisons

Use standard arithmetic and comparison operations, with the usual order of operations. For example, `//` divides and rounds down.

```lua
Speed * 2.0 + Offset
(Health / MaxHealth) * 100
DamageMultiplier ^ 2
Count % 3
10 // 3
Speed < 1
Health >= MaxHealth
```

Comparison operators work with numbers. Use `==` and `~=` to compare numbers, booleans, or strings.

### Logic and short-circuiting

`and`, `or`, and `not` follow Luau truthiness and short-circuit evaluation. Only `false` and `nil` are considered false.

```lua
IsGrounded and GroundSpeed or AirSpeed
not IsDisabled
```

### If-then-else expressions

Use Luau's conditional expression form to branch within a single expression:

```lua
if Speed > 10 then "sprint" elseif Speed > 2 then "run" else "idle"
```

### Math library

Use the `Library.math` library. Graph expressions don't yet support `Library.math.frexp()`, `Library.math.noise()`, or `Library.math.randomseed()`. `Library.math.modf()` currently returns only the integer portion.

```lua
math.clamp(Speed / MaxSpeed, 0, 1)
math.sin(Time * 2 * math.pi)
math.atan2(Direction.Y, Direction.X)
math.max(A, B, C)
```

### Vector construction and member access

Construct `Datatype.Vector2` and `Datatype.Vector3` values, perform vector arithmetic, and access vector members such as `Magnitude` and `Unit`.

```lua
Vector3.new(math.cos(Time), math.sin(Time), 0)
Vector2.new(InputX, InputY)
MoveDirection.Magnitude * 2.0
Position.X + Offset
Vector3.zero
```

### Color3 construction and member access

Construct `Datatype.Color3` values and access their color channels.

```lua
Color3.fromRGB(255, 128, 0)
Color.R
```

### CFrame construction, member access, and operations

Construct `Datatype.CFrame` values, access CFrame members, and combine them with CFrames or `Datatype.Vector3` values.

```lua
CFrame.new(Position, LookAtPosition)
CFrame.Angles(RotationX, RotationY, RotationZ)
CFrame.identity
Transform.LookVector
Transform.Position + Vector3.new(0, 1, 0)
```

### String concatenation

Use `..` to concatenate two strings:

```lua
"state_" .. CurrentState
```

### Local variables and multi-line expressions

Use a multi-line expression to break a formula into named steps. A multi-line expression supports `local` declarations, `return`, `if`/`elseif`/`else`, and standalone expressions. Inside an `if` or `else` body, use only `return` or a standalone expression; nested `if` statements and local declarations aren't supported.

```lua
local normalizedSpeed = Speed / MaxSpeed
local eased = math.clamp(normalizedSpeed, 0, 1)
return eased
```
