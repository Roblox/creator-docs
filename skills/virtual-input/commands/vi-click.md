---
name: vi-click
description: Click a UI element in the running game by name, path, or description.
user_invocable: true
---

# Click Element

Click a GUI element by finding it in PlayerGui, computing its screen-space center, and injecting a mouse click via VirtualInput.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed. Wait briefly for the game to initialize.
3. Run the prerequisite check to verify VirtualInput is available:

```lua
local ok, vi = pcall(function()
    return game:GetService("UserInputService"):CreateVirtualInput()
end)
if not ok then return "VirtualInput not available: " .. tostring(vi) end
return "VirtualInput ready"
```

4. Find the target element — run UI discovery to locate the element by name, text, or path:

```lua
local Players = game:GetService("Players")
local pg = Players.LocalPlayer:WaitForChild("PlayerGui", 5)
if not pg then return "No PlayerGui found — is game in Play mode?" end

local results = {}
local function crawl(obj, path)
    if not obj:IsA("GuiBase2d") and not obj:IsA("ScreenGui") then return end
    if obj:IsA("GuiObject") and obj.Visible then
        local pos = obj.AbsolutePosition
        local size = obj.AbsoluteSize
        local entry = path .. " [" .. obj.ClassName .. "]"
        entry = entry .. string.format(" Pos:(%.0f,%.0f) Size:(%.0f,%.0f)", pos.X, pos.Y, size.X, size.Y)
        if obj:IsA("GuiButton") then entry = entry .. " [CLICKABLE]" end
        if obj:IsA("TextButton") or obj:IsA("TextLabel") then
            local text = obj.Text
            if #text > 30 then text = text:sub(1, 30) .. "..." end
            entry = entry .. ' Text:"' .. text .. '"'
        end
        table.insert(results, entry)
    elseif obj:IsA("ScreenGui") then
        table.insert(results, path .. " [ScreenGui] Enabled:" .. tostring(obj.Enabled))
    end
    for _, child in obj:GetChildren() do
        crawl(child, path .. "." .. child.Name)
    end
end
for _, sg in pg:GetChildren() do
    if sg:IsA("ScreenGui") and sg.Enabled then
        crawl(sg, sg.Name)
    end
end
return table.concat(results, "\n")
```

5. **Click the target** — once identified, run a single `execute_luau` call that finds the element and clicks it:

```lua
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")
local vi = UIS:CreateVirtualInput()

local pg = Players.LocalPlayer:WaitForChild("PlayerGui", 5)
local target = pg:FindFirstChild("TARGET_NAME", true)
if not target or not target:IsA("GuiObject") then
    return "Element not found: TARGET_NAME"
end

local pos = target.AbsolutePosition
local size = target.AbsoluteSize
local center = Vector2.new(pos.X + size.X / 2, pos.Y + size.Y / 2)

vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false)

return string.format("Clicked '%s' at (%.0f, %.0f) size (%.0f, %.0f)",
    target.Name, center.X, center.Y, size.X, size.Y)
```

6. Take a screenshot via `screen_capture` to verify the result
7. Check `get_console_output` for errors
8. Report what was clicked and what changed (new UI appeared, button state changed, etc.)

## Defaults

- **Mouse button:** Left click (MouseButton1) unless user says "right click" (MouseButton2) or "middle click" (MouseButton3)
- **Click type:** Single click. For double-click use `repeatCount = 1`
- **No wait between down and up** — they form one atomic click
- **Duplicate state throws** — calling `SendMouseButton(..., true)` when the button is already pressed (or `false` when already released) throws a runtime exception. Always pair press and release.
- **Leave Play mode running** — do not stop after the click
- **CoreGUI is restricted** — if the computed position overlaps CoreGUI, the call throws a runtime exception. Inform the user and suggest adjusting their UI layout.
