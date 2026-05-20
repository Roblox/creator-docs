---
name: vi-walkthrough
description: Execute a multi-step UI interaction sequence described in natural language.
user_invocable: true
---

# UI Walkthrough

Execute a described multi-step interaction flow on the running game. The agent interprets the user's scenario, plans the sequence, and performs each step with verification between steps.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first
2. Ensure Play mode is active — use `start_stop_play(is_start: true)` if needed
3. Verify VirtualInput is available
4. **Discover the full UI structure** — crawl PlayerGui to understand what is available:

```lua
local Players = game:GetService("Players")
local pg = Players.LocalPlayer:WaitForChild("PlayerGui", 5)
if not pg then return "No PlayerGui — is game in Play mode?" end

local results = {}
local function crawl(obj, depth, path)
    if not obj:IsA("GuiBase2d") and not obj:IsA("ScreenGui") then return end
    local entry = string.rep("  ", depth) .. path .. " [" .. obj.ClassName .. "]"
    if obj:IsA("ScreenGui") then
        entry = entry .. " Enabled:" .. tostring(obj.Enabled)
    end
    if obj:IsA("GuiObject") then
        local pos = obj.AbsolutePosition
        local size = obj.AbsoluteSize
        entry = entry .. string.format(" Pos:(%.0f,%.0f) Size:(%.0f,%.0f)", pos.X, pos.Y, size.X, size.Y)
        entry = entry .. " Vis:" .. tostring(obj.Visible)
        if obj:IsA("GuiButton") then entry = entry .. " [CLICKABLE]" end
        if obj:IsA("TextBox") then entry = entry .. " [TEXT INPUT]" end
        if obj:IsA("ScrollingFrame") then entry = entry .. " [SCROLLABLE]" end
    end
    if obj:IsA("TextButton") or obj:IsA("TextLabel") or obj:IsA("TextBox") then
        local text = obj.Text
        if #text > 30 then text = text:sub(1, 30) .. "..." end
        entry = entry .. ' Text:"' .. text .. '"'
    end
    table.insert(results, entry)
    for _, child in obj:GetChildren() do
        crawl(child, depth + 1, path .. "." .. child.Name)
    end
end
for _, sg in pg:GetChildren() do
    if sg:IsA("ScreenGui") and sg.Enabled then
        crawl(sg, 0, sg.Name)
    end
end
return table.concat(results, "\n")
```

5. **Plan the interaction sequence** — map the user's description to a series of VirtualInput calls based on discovered UI elements
6. **Execute each step** with verification:
   - For each step: find element, perform interaction (click/type/scroll/key), take screenshot
   - Wait for UI to update between steps (`task.wait(0.2)` minimum, more for animations)
   - Re-crawl PlayerGui if the UI structure is expected to change (new dialogs, panels opening)
   - If a step fails (element not found, click didn't produce expected result), report and ask user how to proceed
7. **Present a step-by-step report:**

```
UI Walkthrough: "Open shop and buy the sword"

Step 1: Click 'ShopButton'
  Clicked at (426, 300) — Shop panel opened
  Screenshot: screenshots/walkthrough_step1.png

Step 2: Click 'SwordItem' in ShopPanel.ItemList
  Clicked at (300, 450) — Item details appeared
  Screenshot: screenshots/walkthrough_step2.png

Step 3: Click 'BuyButton' in ItemDetails
  Clicked at (350, 600) — Purchase confirmation dialog shown
  Screenshot: screenshots/walkthrough_step3.png

Step 4: Click 'ConfirmButton'
  Clicked at (400, 400) — Purchase complete, dialog closed
  Screenshot: screenshots/walkthrough_step4.png

Result: All 4 steps completed successfully.
```

## Interaction types available

| User says | Action |
|-----------|--------|
| "click X" / "press X" / "tap X" | SendMouseButton (left click) |
| "right click X" | SendMouseButton (MouseButton2) |
| "middle click X" | SendMouseButton (MouseButton3) |
| "double click X" | SendMouseButton with repeatCount=1 |
| "type X" / "enter X" | Click to focus + SendTextInput |
| "delete text" / "clear" | Select all + Backspace |
| "scroll down/up" | SendPointerAction with Wheel |
| "zoom in/out" | SendPointerAction with Pinch |
| "pan left/right" | SendPointerAction with Pan |
| "press key X" | SendKey for the named key |
| "move mouse to X" | SendMousePosition |
| "look around" / "rotate camera" | Lock cursor + SendMouseDelta |

## Defaults

- **Between steps:** Wait 0.2s minimum for UI to update. Increase for animations or network-dependent UI.
- **Re-discovery:** Re-crawl PlayerGui after any step that is expected to change the UI structure (opening a dialog, navigating to a new screen)
- **Failure handling:** If an element is not found or a click produces no change, report the failure and ask the user — do not silently skip steps
- **Duplicate button state throws** — calling `SendMouseButton(..., true)` when the button is already pressed (or `false` when already released) throws. Always pair press/release for each click.
- **Screenshots:** Save each step as `screenshots/walkthrough_step<N>.png`
- **CoreGUI is restricted** — interactions targeting CoreGUI elements throw a runtime exception
