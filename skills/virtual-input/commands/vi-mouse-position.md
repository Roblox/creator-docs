---
name: vi-mouse-position
description: Position the mouse pointer at a specific viewport coordinate without clicking.
user_invocable: true
---

# Mouse Position

Position the mouse pointer at an absolute viewport coordinate without clicking. Uses VirtualInput's `SendMousePosition` which takes a `Vector2` in viewport space. Useful for triggering hover states, tooltips, or positioning before other interactions.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed
3. Verify VirtualInput is available
4. **Position the mouse** via `execute_luau`:

### Move to a specific coordinate

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

vi:SendMousePosition(Vector2.new(POSITION_X, POSITION_Y))

return string.format("Mouse positioned at (%.0f, %.0f)", POSITION_X, POSITION_Y)
```

### Move to viewport center

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

local viewport = workspace.CurrentCamera.ViewportSize
local center = Vector2.new(math.floor(viewport.X / 2), math.floor(viewport.Y / 2))

vi:SendMousePosition(center)

return string.format("Mouse positioned at viewport center (%.0f, %.0f)", center.X, center.Y)
```

5. Take a screenshot if relevant (e.g., to see a hover state or tooltip)
6. Report the position the cursor moved to

## Defaults

- **Coordinates are absolute viewport space** — origin is top-left, X increases right, Y increases down
- **CoreGUI is restricted** — positioning the mouse over a CoreGUI element throws a runtime exception
- **No click** — this only positions the cursor. Use `/vi-click` to click after positioning.
