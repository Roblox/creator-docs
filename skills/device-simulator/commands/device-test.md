Test UI on a specific device using the Studio Device Simulator.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first

2. **Determine what to test** — run the StarterGui tree crawl (see SKILL.md "UI Discovery").
   - **Just proceed** if: user already specified, there's only one ScreenGui, or UI is visible in the viewport.
   - **Ask only if:** StarterGui is empty/all Visible=false, or there are multiple distinct pages and user didn't specify.

3. **Find the right device** — read the device list (see SKILL.md "Switch to a device") and pick based on user's request:
   - Specific device name → match by name
   - "iPhone" / "phone" / "mobile" → latest `Phone` (highest generation number)
   - "tablet" / "iPad" → latest `Tablet`
   - "console" / "Xbox" → match "Xbox" in name
   - "VR" / "Quest" → match "Quest" or "Meta"
   - If no match, **ask the user**

4. **Switch device** via `execute_luau` (see SKILL.md code snippet). Always `task.wait(0.2)` after.

5. **Take screenshot** via `screen_capture` MCP tool. Analyze visually for: clipping, overlap, text truncation, missing elements, buttons too small to tap.

6. **If issues found, get precise positions** — use the viewport coordinate query from SKILL.md "Getting accurate annotation coordinates" section. Report element positions that overflow the viewport.

7. Check `get_console_output` for errors.

8. **Report to user:**

```
Device: <name> (<width>x<height>)
Viewport: <viewport_size>
Console: no errors

Observations:
- ...
```

If issues were found, include fix suggestions.

9. **Revert to default** — call `StopSimulationAsync()` via `execute_luau`. Tell the user: "Studio reset to default viewport."

## Defaults

- **Orientation:** Always Landscape unless user explicitly asks for Portrait
- **Device selection:** Always read device list dynamically — pick highest generation number in matching DeviceForm
- See SKILL.md for full Luau code snippets and API details
