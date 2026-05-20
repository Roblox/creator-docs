---
name: vi-type
description: Focus a TextBox and type text into it using VirtualInput.
user_invocable: true
---

# Type Text

Focus a TextBox by clicking it, then inject text via VirtualInput's SendTextInput.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed
3. Verify VirtualInput is available (same prereq check as `/vi-click`)
4. Find the target TextBox via UI discovery — look for `[TextBox]` class elements in PlayerGui
5. **Click to focus, then type** — run a single `execute_luau` call:

```lua
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")
local vi = UIS:CreateVirtualInput()

local pg = Players.LocalPlayer:WaitForChild("PlayerGui", 5)
local target = pg:FindFirstChild("TARGET_TEXTBOX", true)
if not target or not target:IsA("TextBox") then
    return "TextBox not found: TARGET_TEXTBOX"
end

local pos = target.AbsolutePosition
local size = target.AbsoluteSize
local center = Vector2.new(pos.X + size.X / 2, pos.Y + size.Y / 2)

-- Click to focus
vi:SendMousePosition(center)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false)
task.wait(0.1) -- wait for focus to register

-- Type the text
vi:SendTextInput("THE_TEXT_TO_TYPE")

return string.format("Typed into '%s' at (%.0f, %.0f): %s",
    target.Name, center.X, center.Y, "THE_TEXT_TO_TYPE")
```

6. Take a screenshot to verify text appeared in the TextBox
7. Check `get_console_output` for errors
8. Report result

## Clearing existing text

If the user wants to replace existing text, clear it first with select-all + delete before typing:

```lua
-- Select all (Ctrl+A) then delete
vi:SendKey(true, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.Backspace)
vi:SendKey(false, Enum.KeyCode.Backspace)
task.wait(0.05)

-- Now type new text
vi:SendTextInput("new text here")
```

## Defaults

- **Always click to focus first** — TextBoxes require focus before accepting text input
- **Wait 0.1s after click** before sending text — allows focus to register
- **Clear existing text** if user says "replace", "change to", or "set to"
- **Append** if user says "add", "append", or the TextBox is already known to be focused
- **CoreGUI is restricted** — if the TextBox is in CoreGUI space, the call throws a runtime exception
