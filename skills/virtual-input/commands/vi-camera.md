---
name: vi-camera
description: Rotate the camera using mouse delta input (FPS-style look) with cursor lock.
user_invocable: true
---

# Camera Look

Lock the cursor, send mouse deltas to rotate the camera (FPS-style), then unlock the cursor. Uses VirtualInput's SendMouseDelta.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed
3. Verify VirtualInput is available
4. **Lock cursor, send deltas, unlock** via `execute_luau`:

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

-- Lock cursor to center
UIS.MouseBehavior = Enum.MouseBehavior.LockCenter
task.wait(0.1) -- wait for lock to engage

-- Send camera movement
local ok, err = pcall(function()
    vi:SendMouseDelta(Vector2.new(DELTA_X, DELTA_Y))
end)

-- Unlock cursor
UIS.MouseBehavior = Enum.MouseBehavior.Default

if not ok then
    return "SendMouseDelta failed: " .. tostring(err)
end
return string.format("Camera rotated by (%.0f, %.0f)", DELTA_X, DELTA_Y)
```

### Look in a direction

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

UIS.MouseBehavior = Enum.MouseBehavior.LockCenter
task.wait(0.1)

local ok, err = pcall(function()
    -- Positive X = look right, Positive Y = look down
    vi:SendMouseDelta(Vector2.new(50, 0))    -- look right
    task.wait(0.1)
    vi:SendMouseDelta(Vector2.new(0, -30))   -- look up
end)

UIS.MouseBehavior = Enum.MouseBehavior.Default

if not ok then return "Error: " .. tostring(err) end
return "Looked right then up"
```

### Smooth rotation (multiple small deltas)

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

UIS.MouseBehavior = Enum.MouseBehavior.LockCenter
task.wait(0.1)

local ok, err = pcall(function()
    -- Rotate 180 degrees right in smooth steps
    for i = 1, 20 do
        vi:SendMouseDelta(Vector2.new(15, 0))
        task.wait(0.05)
    end
end)

UIS.MouseBehavior = Enum.MouseBehavior.Default

if not ok then return "Error: " .. tostring(err) end
return "Smooth rotation complete"
```

5. Take a screenshot to show the new camera view
6. Report the rotation applied

## Direction mapping

| User says | Delta |
|-----------|-------|
| "look right" | `Vector2.new(50, 0)` |
| "look left" | `Vector2.new(-50, 0)` |
| "look up" | `Vector2.new(0, -30)` |
| "look down" | `Vector2.new(0, 30)` |
| "turn around" / "look behind" | Multiple deltas totaling ~300 X |

## Defaults

- **Delta magnitude:** 50px horizontal, 30px vertical per "look" command (adjust based on game sensitivity)
- **Always wrap in pcall** — SendMouseDelta throws if the cursor is not locked (e.g., Studio window lost focus and the lock disengaged)
- **Always unlock after** — restore `MouseBehavior = Default` even if SendMouseDelta fails
- **Wait 0.1s after locking** before sending deltas — cursor lock takes a frame to engage
- **Positive X = right, Positive Y = down** — standard screen-space coordinates
