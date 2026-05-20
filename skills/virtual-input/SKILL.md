---
name: virtual-input
description: Simulate mouse, keyboard, and pointer input on running Roblox games to test UI interactions programmatically. Use when clicking buttons, typing text, scrolling, zooming, panning, adjusting camera, or running multi-step interaction tests via MCP tools (execute_luau + screen_capture).
---

# VirtualInput Skill

## When to Use

- User asks to click a button, test a UI flow, interact with game UI, simulate input
- Keywords: `click`, `tap`, `type`, `input`, `interact`, `test button`, `fill textbox`, `scroll`, `zoom`, `pan`, `drag`, `UI test`, `walkthrough`, `VirtualInput`, `simulate`, `press key`, `camera look`

## Tips

- **Always Play mode** — VirtualInput requires a live game with PlayerGui populated. Start play mode before any interaction.
- **Click is the core primitive** — almost everything starts with finding an element and clicking it.
- **Screenshot after every interaction** — the interact-then-verify loop is how you confirm success.
- **CoreGUI is restricted** — interactions targeting CoreGUI elements (top bar, chat, escape menu) throw a runtime exception. If the user asks to interact with CoreGUI, explain that it is not possible.
- **Button state tracking** — you cannot press a button that is already pressed. Always pair down with up. No wait needed between them for a standard click.
- **Single `execute_luau` per interaction** — find element + inject input in one call to avoid race conditions.

## Commands

| Command | Use when |
|---------|----------|
| `/vi-click` | Click a specific UI element |
| `/vi-type` | Type text into a TextBox |
| `/vi-key` | Press a key or key combination |
| `/vi-mouse-position` | Position the mouse pointer at a viewport coordinate |
| `/vi-camera` | Rotate camera via mouse delta (FPS-style look) |
| `/vi-scroll` | Scroll, pan, or zoom |
| `/vi-walkthrough` | Multi-step interaction sequence |

---

## How It Works

The agent uses MCP tools in an interact-then-verify loop:

1. **`execute_luau`** — create VirtualInput, find UI elements, inject input
2. **`screen_capture`** — screenshot after interaction to verify result
3. **`get_console_output`** — check for errors triggered by the interaction

**Key constraint:** VirtualInput injects into the live input pipeline. The game must be in Play mode with PlayerGui populated for `AbsolutePosition`/`AbsoluteSize` to be meaningful.

**Multi-Studio:** If multiple instances are open, call `list_roblox_studios` + `set_active_studio` once at the start.

---

## Step 0: Prerequisites Check

Before any interaction, verify the environment via `execute_luau`:

```lua
local results = {}

-- Check VirtualInput
local ok, vi = pcall(function()
    return game:GetService("UserInputService"):CreateVirtualInput()
end)
table.insert(results, "VirtualInput available: " .. tostring(ok))
if not ok then
    table.insert(results, "Error: " .. tostring(vi))
    table.insert(results, "Error creating VirtualInput: " .. tostring(vi))
    return table.concat(results, "\n")
end

-- Check Play mode
local Players = game:GetService("Players")
local lp = Players.LocalPlayer
table.insert(results, "LocalPlayer: " .. tostring(lp ~= nil))
if lp then
    local pg = lp:FindFirstChild("PlayerGui")
    table.insert(results, "PlayerGui: " .. tostring(pg ~= nil))
    if pg then
        local count = 0
        for _, sg in pg:GetChildren() do
            if sg:IsA("ScreenGui") and sg.Enabled then count += 1 end
        end
        table.insert(results, "Active ScreenGuis: " .. count)
    end
end

return table.concat(results, "\n")
```

If VirtualInput is not available, check that the game is in Play mode and Studio is connected via MCP.

---

## Step 0.5: UI Discovery

Before interacting, discover what elements are available via `execute_luau`:

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

This gives the agent:
- Live `AbsolutePosition`/`AbsoluteSize` for targeting
- Which elements are clickable (`GuiButton`), text-input (`TextBox`), scrollable (`ScrollingFrame`)
- Element visibility — invisible elements cannot be interacted with
- Text content for matching user descriptions to elements

---

## Disambiguation & Defaults

### Element Targeting

| User says | Strategy |
|-----------|----------|
| Exact name: "click PlayButton" | `FindFirstChild("PlayButton", true)` |
| Description: "click the play button" | Crawl, match by Text content or Name (case-insensitive) |
| Path: "ShopGui.BuyFrame.ConfirmButton" | Walk the path from PlayerGui |
| Position: "click at 400, 300" | Use coordinates directly |
| Visual: "click the red button" | Screenshot + vision to identify, then crawl for match |

### Defaults

- **Mouse button:** Left click (MouseButton1) unless user says "right click"
- **Click count:** Single click. Double-click if user says "double click" (repeatCount=1)
- **Text input:** Clear existing text first (select all + Backspace), then type — unless user says "append"
- **Scroll amount:** 1 tick per call
- **Camera delta:** 10px per movement
- **Between interaction steps:** Wait 0.2s for UI to update

---

## API Reference

**Full API documentation is in `API_spec.md`** (same directory).

### Quick patterns

#### Create VirtualInput

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()
```

#### Click an element

```lua
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false)
```

#### Double-click

```lua
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true, 1)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false, 1)
```

#### Right-click

```lua
vi:SendMouseButton(center, Enum.UserInputType.MouseButton2, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton2, false)
```

#### Type text

```lua
vi:SendTextInput("Hello, world!")
```

#### Remove text

```lua
vi:SendKey(true, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.Backspace)
vi:SendKey(false, Enum.KeyCode.Backspace)
```

#### Scroll wheel

```lua
vi:SendPointerAction(position, { Wheel = 1.0 })   -- up
vi:SendPointerAction(position, { Wheel = -1.0 })  -- down
```

#### Pan

```lua
vi:SendPointerAction(position, { Pan = Vector2.new(10, 0) })   -- right
vi:SendPointerAction(position, { Pan = Vector2.new(0, -10) })  -- up
```

#### Zoom in/out

```lua
vi:SendPointerAction(position, { Pinch = 0.1 })   -- zoom in
vi:SendPointerAction(position, { Pinch = -0.1 })  -- zoom out
```

#### Camera look (FPS-style)

```lua
-- Lock cursor first
local UIS = game:GetService("UserInputService")
UIS.MouseBehavior = Enum.MouseBehavior.LockCenter
task.wait(0.1)

vi:SendMouseDelta(Vector2.new(10, 0))   -- look right
vi:SendMouseDelta(Vector2.new(0, -5))   -- look up

-- Restore cursor when done
UIS.MouseBehavior = Enum.MouseBehavior.Default
```

#### Key press

```lua
vi:SendKey(true, Enum.KeyCode.W)    -- press
vi:SendKey(false, Enum.KeyCode.W)   -- release
```

#### Hold multiple keys

```lua
vi:SendKey(true, Enum.KeyCode.LeftShift)
vi:SendKey(true, Enum.KeyCode.W)
task.wait(1)
vi:SendKey(false, Enum.KeyCode.W)
vi:SendKey(false, Enum.KeyCode.LeftShift)
```

### Key rules

- **Always create VirtualInput once** per `execute_luau` call — `UIS:CreateVirtualInput()`
- **No wait between down and up** for a simple click
- **Always pair press with release** — duplicate state throws
- **`task.wait(0.1)` after cursor lock** before sending deltas
- **Use `pcall`** for all calls — they can throw (CoreGUI hit, invalid state, etc.)

---

## Verification

### The interact-then-verify loop

After EVERY interaction:
1. Take screenshot via `screen_capture`
2. Analyze what changed visually
3. Check `get_console_output` for errors

### Screenshot checklist after interaction

| # | Check | What it means |
|---|-------|---------------|
| 1 | Button state changed | Button color/text changed — click registered |
| 2 | New UI appeared | Dialog, menu, or panel opened — navigation worked |
| 3 | Text entered | TextBox shows the typed text — focus and input worked |
| 4 | Scroll position changed | Content shifted — scroll registered |
| 5 | Camera moved | Viewport changed — delta input worked |
| 6 | Error overlay | Unexpected error dialog — something went wrong |
| 7 | No change | Nothing happened — click may have missed target |

### When interaction fails

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| "VirtualInput is not enabled" | Unexpected — VirtualInput should be available | Verify Studio is running and game is in Play mode |
| "position hits CoreGUI" | Click landed on CoreGUI area | Adjust position to avoid top ~36px or other CoreGUI regions |
| "duplicate button state" | Pressed without releasing | Ensure previous press was released |
| Nothing happened after click | Element not interactable, position wrong, or element not visible | Re-crawl to verify AbsolutePosition, check Visible and Active |
| "CoreGUI has keyboard focus" | Escape menu or CoreGUI TextBox focused | Cannot proceed while CoreGUI has focus; inform user |
| "cursor is not locked" | SendMouseDelta called without LockCenter | Set `MouseBehavior = LockCenter` first |
| "key is permanently bound to a CoreGUI core action" | Key is bound to a core action (Tab, Escape, Backquote, F1, F9) | Cannot send this key; inform user |

### Tone

Frame interactions as test results, not judgments:
- "Clicked 'BuyButton' — the shop dialog opened successfully"
- "After typing 'hello' into ChatInput, the text appeared correctly"
- "Scroll moved the inventory list down — 3 new items visible"

---

## Screenshots

**Default location:** `screenshots/`

**Important:** `screen_capture` via MCP returns the image to the agent (who can see it via vision), but does NOT save to disk. Save screenshots explicitly if the user needs them.

### Naming convention

- `screenshots/click_<ElementName>.png`
- `screenshots/type_<TextBoxName>.png`
- `screenshots/scroll_<target>.png`
- `screenshots/walkthrough_step<N>.png`

### Saving screenshots to disk

Use the Python MCP proxy script pattern (see DeviceSimulatorSkills SKILL.md for the full script). The key is: open MCP proxy → call `screen_capture` → decode base64 → write PNG.

Always `mkdir -p screenshots` before saving.

---

## Coordinate System

- All positions are in **viewport space**: origin is top-left of the game window
- X increases right, Y increases down
- `AbsolutePosition` and `AbsoluteSize` from GuiObjects are in this same space
- Center of an element: `Vector2.new(pos.X + size.X / 2, pos.Y + size.Y / 2)`
- CoreGUI occupies roughly the top ~36px — avoid this region
