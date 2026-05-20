---
name: device-simulator-lua
description: Control the Studio Device Simulator to test UI across device form factors. Use when switching devices, testing orientations, running multi-device comparisons, or verifying UI layout via MCP tools (execute_luau + screen_capture).
---

# Device Simulator Skill

## When to Use

- User asks to test UI on a device, switch devices, change orientation, compare devices, or verify layout
- Keywords: `device simulator`, `emulate`, `iPhone`, `iPad`, `Xbox`, `Quest`, `mobile`, `portrait`, `landscape`, `StudioDeviceSimulatorService`

## Tips

- **Start with `/device-test` on iPhone** to get a quick first look, then expand to `/device-compare` if you need multi-device coverage.
- **Portrait is where bugs hide** — most UI is built landscape-first. Run `/device-orientation` to catch portrait-specific issues.
- **Play mode shows the real UI** — many places create UI dynamically at runtime. If `/device-test` in Edit mode shows almost nothing, use `/device-playtest` to see the actual in-game layout.

## Commands

| Command | Use when |
|---------|----------|
| `/device-test` | Test UI on a single device |
| `/device-compare` | Compare UI across multiple devices side by side |
| `/device-orientation` | Test portrait vs landscape |
| `/device-playtest` | Test in-game UI with Play mode |

---

## How It Works

The agent uses three MCP tools in sequence:

1. **`execute_luau`** — call DeviceSimulatorService API (switch device, orientation, resolution)
2. **`screen_capture`** — take screenshot, analyze with vision to find UI issues
3. **`get_console_output`** — check for runtime errors/warnings

Screenshots are the primary verification method. The agent looks at them and reports what it sees — clipping, overlap, truncated text, missing elements.

**Key constraint:** `execute_luau` runs in the **Edit DataModel** — it cannot access `PlayerGui` or live `AbsolutePosition`/`Size` during Play mode. Use `screen_capture` for play mode verification.

**Multi-Studio:** If multiple instances are open, call `list_roblox_studios` + `set_active_studio` once at the start.

### Step 0: Determine what to test

Run the StarterGui tree crawl to understand the UI structure. Then decide whether to proceed or ask:

**Just proceed (don't ask) when:**
- The user already specified what to test ("test my HUD", "check the leaderboard")
- There's only one ScreenGui (nothing ambiguous)
- The viewport already has visible UI — take the screenshot and analyze it

**Ask the user when:**
- StarterGui is empty or all UI is Visible=false — a screenshot would show an empty scene, which is useless. Say: "Your UI appears to be runtime-created. I'll need play mode — which screen should I test (HUD, menu, lobby)?"
- There are clearly multiple distinct pages (e.g., MenuGui + GameplayGui + ShopGui) AND the user just said "test my UI" without specifying which one

The goal is to minimize round-trips. Most of the time, the user wants to see whatever is currently on screen across different devices — just do it.

### Step 1: Read game settings

Before any device switching or testing, run this via `execute_luau`:

```lua
local sg = game:GetService("StarterGui")
local results = {}
table.insert(results, "game.Name: " .. game.Name)
table.insert(results, "ScreenOrientation: " .. tostring(sg.ScreenOrientation))

for _, child in sg:GetChildren() do
    if child:IsA("ScreenGui") then
        local props = {}
        for _, prop in {"IgnoreGuiInset", "ScreenInsets", "SafeAreaCompatibility", "ClipToDeviceSafeArea"} do
            local ok, v = pcall(function() return child[prop] end)
            if ok then table.insert(props, prop .. "=" .. tostring(v)) end
        end
        table.insert(results, "ScreenGui: " .. child.Name .. " [Enabled:" .. tostring(child.Enabled) .. "] " .. table.concat(props, " | "))
    end
end
return table.concat(results, "\n")
```

This tells the agent:

**Game-level:**

| Setting | What it means for testing |
|---------|--------------------------|
| `ScreenOrientation = LandscapeSensor` | Landscape only — **skip portrait tests** |
| `ScreenOrientation = Sensor` | All orientations — **test both** |
| `ScreenOrientation = Portrait` | Portrait only — **skip landscape tests** |

**Per-ScreenGui:**

| Setting | What it means |
|---------|---------------|
| `IgnoreGuiInset = true` | UI starts at y=0 (under top bar) — watch for elements hidden behind status bar |
| `IgnoreGuiInset = false` | UI pushed down ~36px — normal, but less screen space on small devices |
| `ScreenInsets = DeviceSafeInsets` | Respects notch + home indicator — UI won't go under hardware insets |
| `ScreenInsets = CoreUISafeInsets` | Only respects top bar inset — UI may go under notch on sides/bottom |
| `ScreenInsets = None` | Full screen, no inset — UI may be hidden behind notch |
| `ClipToDeviceSafeArea = true` | UI clipped at safe area — elements won't render under the notch |
| `ClipToDeviceSafeArea = false` | UI can render under the notch — check if interactive elements are reachable |

**Always include game settings in your output** so the user understands the context of your findings.

---

## Disambiguation & Defaults

### Fuzzy Term → Device

**Device list is dynamic — always read it fresh via `GetDeviceListAsync()` + `GetDeviceInfoAsync()`.** The table below is a fallback guide for name matching. If a newer device is in the list (e.g., iPhone 15 Pro), prefer it over older ones.

| User says | How to pick | Example |
|-----------|------------|---------|
| "iPhone" / "phone" / "mobile" | Latest iPhone — highest generation number | iPhone 17 Pro > iPhone 16 > iPhone 14 Pro |
| "iPad" / "tablet" | Latest iPad — highest generation number | iPad Pro 3rd Gen > iPad 6th Gen > iPad 2 |
| "Xbox" / "console" | Match "Xbox" in name | Xbox One |
| "PlayStation" / "PS" | Match "PS" in name, highest number | PS5 > PS4 |
| "VR" / "Quest" / "headset" | Match "Quest" or "Meta", highest number | Meta Quest 3 > Meta Quest 2 |
| "laptop" / "desktop" / "PC" | Match "Laptop" or "Average" in name | Average Laptop |
| "handheld" / "Steam Deck" | Match "Handheld" in name | Generic Handheld HD 720 |
| "small screen" / "worst case" | Lowest resolution in the entire list | (oldest/smallest device) |
| "large screen" / "best case" | Highest resolution in the entire list | (largest device) |

**How to pick the "latest" device:** When multiple devices match (e.g., 5 iPhones), pick the one with the **highest generation number in the name** (e.g., "17" > "16" > "14"). This is the most reliable proxy for "newest" since the device list has no release date field. If two devices have the same generation (e.g., "iPhone 16" vs "iPhone 16 Pro"), prefer the "Pro" variant.

**No preset match?** If the user gave an exact resolution (e.g. "1440x900"), use `CreateDeviceAsync` to create a custom device — see API_SPEC.md. If the user gave a vague description, ask before guessing.

### Device-specific UI characteristics

When analyzing screenshots, be aware of each device's physical traits:

| Device type | What to watch for |
|-------------|-------------------|
| **iPhone X+ (14 Pro, XR)** | Notch on left edge in landscape. If `ScreenInsets=CoreUISafeInsets`, UI may go under the notch. Home indicator at bottom reduces usable space. |
| **Low-end phones (Galaxy A06, etc.)** | Narrow viewport (~360px height in landscape). Fixed-pixel UI takes a huge proportion. Touch targets may be too small. |
| **iPad** | Wide aspect ratio, lots of space. UI designed for phone may look sparse. Text that was fine on phone may be too small on tablet at arm's length. |
| **Xbox / Console** | TV overscan — TVs cut off 5-10% at each edge. UI elements placed at the very edge may not be visible. Text must be large enough to read from couch distance (~3m). |
| **PS5** | Same as Xbox but 1920x1440 (4:3-ish). Unusual aspect ratio may break layouts expecting 16:9. |
| **Meta Quest / VR** | Non-standard aspect ratio (688x736, nearly square). UI designed for wide screens may not fit. Users focus on the center — peripheral elements may be missed. |
| **Laptop / Desktop** | Standard aspect ratios. UI usually works fine here. Check that mouse-oriented UI (hover states, small buttons) is accessible. |

Use these when reporting findings — e.g., "On Xbox, the timer text is only 8% of viewport width. At couch viewing distance on a TV, this would be hard to read."

### Defaults

- **Orientation:** Always Landscape. Only Portrait if user explicitly asks.
- **Device lookup:** name match → fuzzy match → resolution match → create custom via `CreateDeviceAsync` (last resort)

### End state after testing

| Command | What to do after |
|---------|-----------------|
| `/device-test` | **Revert to default** via `StopSimulationAsync()` |
| `/device-compare` | **Revert to default** via `StopSimulationAsync()` |
| `/device-orientation` | **Revert to landscape** via `SetOrientationAsync(LandscapeLeft)`, then `StopSimulationAsync()` |
| `/device-playtest` | Stop play mode, then **revert to default** via `StopSimulationAsync()` |

Always tell the user: "Studio reset to default viewport."

### Recommended archetypes for multi-device comparison

Pick dynamically from the device list:

| Archetype | How to pick | Why |
|-----------|------------|-----|
| Phone | Latest `Phone` (highest generation number) | Most common form factor, likely has notch |
| Tablet | Latest `Tablet` (highest generation number) | Widest aspect ratio |
| Console | Any `Console` device | TV overscan + couch distance |
| VR | Latest "Quest" or "Meta" device | Non-standard aspect ratio stress test |
| Low-end | Lowest resolution in the entire list | Stress test boundary |

Limit to ~4-5 devices unless user asks for exhaustive coverage.

---

## API Reference

**Full API documentation is in `API_SPEC.md`** (same directory). It covers: what device simulation is, the lifecycle, all methods with examples, enum values, DeviceConfiguration table, ConfigurationChanged event, state persistence, known limitations, and error handling.

**Quick reference for common operations:**

### Switch to a device

```lua
local svc = game:GetService("StudioDeviceSimulatorService")
local devices = svc:GetDeviceListAsync()
for _, id in devices do
    local info = svc:GetDeviceInfoAsync(id)
    if info.Name == "iPhone 14 Pro" then
        svc:SetDeviceAsync(id)
        task.wait(0.2)  -- MUST wait for viewport update
        break
    end
end
```

### Set orientation

```lua
svc:SetOrientationAsync(Enum.ScreenOrientation.Portrait)  -- use full enum path
task.wait(0.2)
```

### Create custom device

```lua
local id = svc:CreateDeviceAsync({
    Name = "Custom_1440x900", Width = 1440, Height = 900, PixelDensity = 96
})
svc:SetDeviceAsync(id)
task.wait(0.2)
```

### Key rules

- **Always search by name** — device IDs are internal strings like `"iphone_14_Pro_v2"`, not display names
- **Always `task.wait(0.2)` after any setter** — viewport updates are async; 0.1s is sometimes too short
- **Always use `pcall`** — all methods can error (no active device, PlayServer blocked, etc.)
- **Getters require active device too** — `GetResolutionAsync`, `GetPixelDensityAsync`, `GetScalingModeAsync` error if no device active

---

## UI Discovery & Layout Understanding

Before analyzing screenshots, the agent should **discover the UI structure** via `execute_luau`. This lets the agent predict behavior, explain WHY something looks a certain way, and catch things screenshots can't show (disabled ScreenGuis, invisible elements).

### StarterGui tree crawl

Run via `execute_luau` in Edit mode. Ignore `AbsoluteSize`/`Position` (they'll be zero) — read `Size` (UDim2) instead:

```lua
local root = game:GetService("StarterGui")
local results = {}
local function crawl(obj, depth, path)
    if not obj:IsA("GuiBase2d") and not obj:IsA("ScreenGui") then return end
    local entry = path .. " [" .. obj.ClassName .. "]"
    if obj:IsA("ScreenGui") then
        entry = entry .. " Enabled:" .. tostring(obj.Enabled)
    end
    if obj:IsA("GuiObject") then
        entry = entry .. " Size:" .. tostring(obj.Size) .. " Vis:" .. tostring(obj.Visible)
    end
    local layout = obj:FindFirstChildWhichIsA("UIListLayout")
    if layout then entry = entry .. " Layout:" .. tostring(layout.FillDirection) end
    local aspect = obj:FindFirstChildWhichIsA("UIAspectRatioConstraint")
    if aspect then entry = entry .. " Aspect:" .. tostring(aspect.AspectRatio) end
    table.insert(results, string.rep("  ", depth) .. entry)
    for _, child in obj:GetChildren() do
        crawl(child, depth + 1, path .. "." .. child.Name)
    end
end
for _, sg in root:GetChildren() do
    crawl(sg, 0, sg.Name)
end
return table.concat(results, "\n")
```

This tells the agent:
- **What ScreenGuis exist** and whether they're enabled
- **How elements are sized** — Scale (responsive) vs Offset (fixed)
- **What layout constraints exist** — UIListLayout direction, aspect ratio constraints
- **What's invisible** — elements that exist but won't show in screenshots

### Scale vs Offset sizing

`GuiObject.Size` is `UDim2.new(xScale, xOffset, yScale, yOffset)`:
- **Scale** (0–1): fraction of parent → **responsive** — resizes with viewport
- **Offset** (pixels): fixed → **not responsive** — may overflow on small screens

When the agent sees `Size:{0.5, 0},{1, 0}` → "half parent width, responsive."
When it sees `Size:{0, 200},{0, 50}` → "always 200×50 pixels, will overflow if viewport < 200px wide."

### Layout components

| Component | What it does | Why it matters for device testing |
|-----------|-------------|-----------------------------------|
| `UIListLayout` | Auto-arranges children | Check `FillDirection` — if Horizontal, elements may overflow on narrow screens |
| `UIGridLayout` | Grid arrangement | May reflow on narrower viewports |
| `UIAspectRatioConstraint` | Locks width:height ratio | Element won't distort but may shrink significantly |
| `UISizeConstraint` | Min/max bounds | Element won't shrink below min — may clip on tiny screens |
| `UIScale` | Programmatic scaling | Element may resize with viewport |

---

## Verification

### What the agent can do

| Capability | Tool | Works in |
|-----------|------|----------|
| Switch device / orientation | `execute_luau` | Edit mode |
| Take screenshot of live viewport | `screen_capture` | Edit + Play |
| Check runtime errors | `get_console_output` | Play mode |
| Read StarterGui structure | `execute_luau` | Edit mode |

### What the agent CANNOT do

`execute_luau` runs in the **Edit DataModel**. It cannot access `PlayerGui`, `LocalPlayer`, or live `AbsolutePosition`/`AbsoluteSize` during Play mode. Visual verification via `screen_capture` is the primary way to check live UI.

### Screenshot checklist

After each device/orientation change, look for these in the screenshot. **Use the game settings from Step 0 and the device characteristics table to inform your analysis** — e.g., if device is iPhone 14 Pro and `ScreenInsets=CoreUISafeInsets`, check if UI near the left edge (notch area) is affected.

| # | Check | What it looks like |
|---|-------|--------------------|
| 1 | **Off-screen / clipping** | UI element cut off at viewport edge |
| 2 | **Overlap** | Two elements stacked on top of each other unintentionally |
| 3 | **Text truncation** | Text cut off mid-word or with "..." |
| 4 | **Missing elements** | Element visible on larger device but gone on smaller |
| 5 | **Too small** | Buttons/text too tiny to read or tap on small screens |
| 6 | **Layout break** | Elements that should be side-by-side are now overlapping instead of stacking |
| 7 | **Inset / safe area issue** | On notched devices (iPhone X+): interactive UI at screen edges that may be under the notch. On console: UI too close to edges (TV overscan). Cross-reference with Step 0 `ScreenInsets` value. |

### What to suggest when you find an issue

Don't just report problems — suggest how to fix them:

| Issue found | Suggested fix |
|-------------|---------------|
| **Off-screen / clipping** | Switch from Offset to Scale sizing, or add `UISizeConstraint` with a max that fits the viewport |
| **Text truncation** | Use `TextScaled = true`, reduce text length, or increase the TextLabel size |
| **Touch target too small** | Increase button size to at least 44×44; consider using `UISizeConstraint` with `MinSize` |
| **Overlap** | Check if siblings need a `UIListLayout` to auto-arrange, or adjust `Position`/`Size` to not collide |
| **Missing element on small screen** | Check if a script hides it based on viewport size — if unintentional, use Scale sizing instead |
| **Layout break (elements pile up)** | Add `UIListLayout` with `FillDirection` and `Wraps`, or use script-driven responsive layout |

### Tone

Frame findings as **opportunities, not problems**. Be helpful and collaborative:

- Say "BottomBar extends 20px below viewport on iPhone — switching to Scale sizing would let it adapt automatically"
- Not "Your UI is broken on iPhone"
- Say "Text gets truncated on Galaxy A06 — TextScaled or a shorter label would fix this"
- Not "TextLabel is too small"

### When to flag vs accept changes across devices

Not every layout change is a bug. Use this judgment table:

| Observation | Verdict |
|-------------|---------|
| Elements reflow from horizontal → vertical when viewport narrows | **Expected** if parent has `UIListLayout` or script-driven layout |
| Element shrinks proportionally with viewport | **Expected** if using Scale-based sizing |
| Element stays same pixel size on all devices | **Expected** if using Offset-only sizing — but **flag if it overflows** |
| Element disappears on small screen | **Could be intentional** (responsive hiding) — report to user, don't judge |
| Elements overlap that didn't overlap before | **Likely a bug** unless one is a designed overlay (higher ZIndex) |
| Text truncates on smaller device | **Flag as warning** — may need font scaling or wrapping |

### Screenshots

Use the `screen_capture` MCP tool to capture the viewport. The agent sees the image via vision and analyzes it directly. Screenshots are NOT saved to disk — the agent's visual analysis is the primary output.


### Getting accurate element positions

**Never guess positions by eyeballing the screenshot.** Always query actual GUI element positions via Luau first.

**Step 1: Query element positions after switching device** (works in Edit mode for StarterGui elements).

The screenshot captures exactly what `workspace.CurrentCamera.ViewportSize` describes. `AbsolutePosition` for StarterGui elements is already in viewport-pixel space — no manual offset calculation needed.

```lua
local sg = game:GetService("StarterGui")
local vpSize = workspace.CurrentCamera.ViewportSize
local results = {}
table.insert(results, "VIEWPORT|" .. string.format("%.0fx%.0f", vpSize.X, vpSize.Y))

for _, screenGui in sg:GetChildren() do
    if screenGui:IsA("ScreenGui") and screenGui.Enabled then
        local function collect(obj, path)
            if obj:IsA("GuiObject") and obj.Visible then
                local p = obj.AbsolutePosition
                local s = obj.AbsoluteSize
                table.insert(results, path .. "|" .. string.format("%.0f,%.0f,%.0f,%.0f", p.X, p.Y, p.X + s.X, p.Y + s.Y))
            end
            for _, child in obj:GetChildren() do
                if child:IsA("GuiBase2d") then collect(child, path .. "." .. child.Name) end
            end
        end
        collect(screenGui, screenGui.Name)
        break
    end
end
return table.concat(results, "\n")
```

This returns lines like:
```
VIEWPORT|734x372
RaceHUD.BottomBar|0,329,734,372
RaceHUD.BottomBar.BestLap|0,329,170,372
```

The first line gives the viewport size (from `workspace.CurrentCamera.ViewportSize`). Subsequent lines are `name|x1,y1,x2,y2` in **viewport-pixel space**.

**Why this works:** `AbsolutePosition` is relative to the viewport origin, and the screenshot captures the viewport. No offset needed. Elements with negative coords or coords beyond ViewportSize are off-screen (clipping issues).

**How to report:** Include the exact overflow values in your text output, e.g., "Rank label extends to x=754, viewport width is 748 — overflows by 6px right."

**Important:** AbsolutePosition is only available in Edit mode for StarterGui elements. In Play mode, use `screen_capture` + visual analysis as a fallback, or use the pre-placed verification script (see Advanced section) to get positions from console output.

### Verification output format

```
UI Verification: <Device Name>

  Device: <name> (<width>x<height>)
  Viewport: <viewport_size>
  Console: no errors

  Observations:
  - Timer label ("00:00") centered at top, fully visible
  - Score panel fits within viewport
  - No clipping or overlap detected
```

For multi-device comparison, include a summary table:

```
| Device            | Resolution | Viewport   | Issues                    |
|-------------------|-----------|------------|---------------------------|
| iPhone 14 Pro     | 852x393   | 734x372    | None                      |
| iPad Pro 3rd Gen  | 1194x833  | 1194x813   | None                      |
| Xbox One          | 1920x1080 | 1920x1080  | Score text slightly small  |
```

---

## Advanced: Pre-placed verification script

For test places where you want **programmatic** verification (not just visual), place this LocalScript in `StarterPlayerScripts`. It runs on play and prints structured data to console — the agent reads it via `get_console_output`.

```lua
-- StarterPlayerScripts._DeviceVerifier (LocalScript)
task.wait(2)
local player = game:GetService("Players").LocalPlayer
local pg = player:WaitForChild("PlayerGui", 5)
if not pg then print("[VERIFY] ERROR: No PlayerGui") return end

local vp = workspace.CurrentCamera.ViewportSize
local issues = 0

local function check(obj, path)
    if not obj:IsA("GuiObject") or not obj.Visible then return end
    local pos = obj.AbsolutePosition
    local size = obj.AbsoluteSize
    print("[VERIFY] " .. path .. "|" .. string.format("%.0f,%.0f|%.0f,%.0f", pos.X, pos.Y, size.X, size.Y))

    if pos.X + size.X > vp.X + 2 or pos.Y + size.Y > vp.Y + 2 or pos.X < -2 or pos.Y < -2 then
        issues += 1
        print("[VERIFY] ISSUE OFF-SCREEN: " .. path)
    end
    if (obj:IsA("TextLabel") or obj:IsA("TextButton") or obj:IsA("TextBox")) and not obj.TextFits then
        issues += 1
        print("[VERIFY] ISSUE TEXT-TRUNCATED: " .. path)
    end
    if (obj:IsA("TextButton") or obj:IsA("ImageButton")) and (size.X < 44 or size.Y < 44) then
        issues += 1
        print("[VERIFY] ISSUE SMALL-TARGET: " .. path .. " " .. tostring(size))
    end
    for _, child in obj:GetChildren() do
        check(child, path .. "." .. child.Name)
    end
end

for _, sg in pg:GetChildren() do
    if sg:IsA("ScreenGui") and sg.Enabled then
        for _, child in sg:GetChildren() do
            check(child, sg.Name .. "." .. child.Name)
        end
    end
end
print("[VERIFY] DONE vp:" .. tostring(vp) .. " issues:" .. issues)
```

The agent reads results via `get_console_output`, filters for `[VERIFY]` lines.

> This is optional — most verification works fine with screenshots alone. Use this when you need precise numbers (AbsolutePosition, AbsoluteSize) rather than visual judgment.

---

---

## Example: What a `/device-compare` run looks like

User: "Compare my UI on phone, tablet, and console"

Agent output (Racing template):

```
Game Settings: LandscapeSensor | ScreenInsets=CoreUISafeInsets | IgnoreGuiInset=false

UI Structure:
  RaceGui [ScreenGui] — RaceInfoFrame (lap counter + timers), CountdownLabel,
  CheckpointFrame, FinishFrame (600px fixed width), LeaderboardFrame (700px header)

| Device              | Resolution | Viewport   | Issues                              |
|---------------------|-----------|------------|-------------------------------------|
| Samsung Galaxy A06  | 800x360   | 705x338    | HUD covers ~99% of screen width     |
| iPhone 14 Pro       | 852x393   | 734x372    | None                                |
| iPad Pro 3rd Gen    | 1194x833  | 1194x813   | HUD text getting small              |
| Xbox One            | 1920x1080 | 1920x1080  | Timer text too small for TV/couch   |

Findings:
  ⚠️ Galaxy A06: HUD covers nearly full width — consider scaling down on small viewports
  ❌ Xbox One: Timer labels hard to read at couch distance — consider UIScale for console
  ⚠️ CoreUISafeInsets doesn't handle notch — consider DeviceSafeInsets for iPhone X+
  ❌ FinishFrame.ImageLabel is 600px fixed — will overflow on Galaxy A06 (705px viewport)

```
