---
name: vi-scroll
description: Scroll, pan, or zoom at a position using VirtualInput pointer actions.
user_invocable: true
---

# Scroll / Pan / Zoom

Send pointer action gestures (wheel scroll, trackpad pan, pinch zoom) at a viewport position via VirtualInput's SendPointerAction.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed
3. Verify VirtualInput is available
4. Determine the target position:
   - If scrolling a specific UI element (ScrollingFrame): find it, compute center
   - If scrolling/zooming the viewport: use viewport center
5. **Send the pointer action** via `execute_luau`:

### Scroll (mouse wheel)

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

local position = Vector2.new(POSITION_X, POSITION_Y)

-- Scroll up (positive = up/forward)
vi:SendPointerAction(position, { Wheel = 1.0 })

-- Scroll down (negative = down/backward)
vi:SendPointerAction(position, { Wheel = -1.0 })
```

### Pan (trackpad gesture)

```lua
-- Pan right 50px
vi:SendPointerAction(position, { Pan = Vector2.new(50, 0) })

-- Pan down 100px
vi:SendPointerAction(position, { Pan = Vector2.new(0, 100) })
```

### Zoom (pinch gesture)

```lua
-- Zoom in (positive value)
vi:SendPointerAction(position, { Pinch = 0.1 })

-- Zoom out (negative value)
vi:SendPointerAction(position, { Pinch = -0.1 })
```

### Combined gestures

```lua
-- Scroll and pan simultaneously
vi:SendPointerAction(position, { Wheel = 1.0, Pan = Vector2.new(10, 0) })
```

6. Take a screenshot to verify the scroll/zoom result
7. Report what changed

## Defaults

- **Position:** Viewport center if no element specified
- **Scroll amount:** 1 tick per call (user can say "scroll down 5 ticks" for multiple)
- **Each call is independent** — every `SendPointerAction` is treated as a new scroll start, not a continuation of a gesture. UI with momentum-based scrolling may behave differently than a continuous trackpad swipe.
- **For repeated scrolling:** loop multiple `SendPointerAction` calls with `task.wait(0.05)` between them
- **CoreGUI is restricted** — pointer actions targeting CoreGUI positions throw a runtime exception
