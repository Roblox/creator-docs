---
name: vi-key
description: Press a key or key combination using VirtualInput.
user_invocable: true
---

# Key Press

Press and release a key, hold a key, or perform a key combination (e.g., Ctrl+A, Shift+W) via VirtualInput's SendKey.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed
3. Verify VirtualInput is available
4. **Send the key press** via `execute_luau`:

### Single key press

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

vi:SendKey(true, Enum.KeyCode.KEY_CODE)
vi:SendKey(false, Enum.KeyCode.KEY_CODE)

return "Pressed KEY_CODE"
```

### Key hold (for duration)

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

vi:SendKey(true, Enum.KeyCode.W)
task.wait(1) -- hold for 1 second
vi:SendKey(false, Enum.KeyCode.W)

return "Held W for 1 second"
```

### Key combination (e.g., Ctrl+A)

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

vi:SendKey(true, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.LeftControl)

return "Pressed Ctrl+A"
```

### Multiple keys held simultaneously (e.g., Shift+W for sprint)

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

vi:SendKey(true, Enum.KeyCode.LeftShift)
vi:SendKey(true, Enum.KeyCode.W)
task.wait(2) -- sprint for 2 seconds
vi:SendKey(false, Enum.KeyCode.W)
vi:SendKey(false, Enum.KeyCode.LeftShift)

return "Sprint (Shift+W) for 2 seconds"
```

### Repeated key (text-manipulation keys only)

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()

vi:SendKey(true, Enum.KeyCode.Backspace)
vi:SendKey(true, Enum.KeyCode.Backspace, true)  -- repeat
vi:SendKey(true, Enum.KeyCode.Backspace, true)  -- repeat
vi:SendKey(false, Enum.KeyCode.Backspace)

return "Backspace x3"
```

5. Take a screenshot if relevant (e.g., character moved, UI responded to key)
6. Report what key was pressed and any observed effect

## Defaults

- **Press and release** immediately (no hold) unless user says "hold" or specifies a duration
- **isRepeatedKey** only valid for text-manipulation keys (Backspace, Delete, Return, PageUp, PageDown, arrow keys) — always throws for other keys
- **CoreGUI core-action keys** — keys bound to CoreGUI core actions (Tab, Escape, Backquote, F1, F9) throw a runtime exception.
- **CoreGUI keyboard focus** — if CoreGUI has keyboard focus (menu open, CoreGUI TextBox focused), SendKey throws a runtime exception
