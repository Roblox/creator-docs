Compare UI across multiple devices by cycling through each one, taking screenshots, and presenting results side by side.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first

2. **Determine what to test** — run the StarterGui tree crawl (see SKILL.md "UI Discovery").
   - **Just proceed** if: user already specified, there's only one ScreenGui, or UI is visible in the viewport.
   - **Ask only if:** StarterGui is empty/all Visible=false, or there are multiple distinct pages and user didn't specify.
   - If all UI is runtime-created, use `/device-playtest` pattern instead.

3. **Read the device list** — use the device list query from SKILL.md "Switch to a device" section. Pick ~4-5 devices:
   - **Phone:** latest `Phone` (highest generation number)
   - **Tablet:** latest `Tablet` (highest generation number)
   - **Console:** any `Console` device
   - **VR:** match "Quest" or "Meta" (if available)
   - **Low-end:** lowest resolution in the entire list
   - If user named specific devices, use those instead.

4. **For each device:** switch via `execute_luau`, `task.wait(0.2)`, then `screen_capture`. Analyze visually.

5. **If issues found, get precise positions** — use the viewport coordinate query from SKILL.md "Getting accurate annotation coordinates" section. Report elements that overflow the viewport with exact pixel values.

6. **Report to user** — summary table:

```
| Device          | Resolution | Viewport   | Issues                    |
|-----------------|-----------|------------|---------------------------|
| <Phone>         | ...       | ...        | ...                       |
| <Tablet>        | ...       | ...        | ...                       |
| <Console>       | ...       | ...        | ...                       |
| <Low-end>       | ...       | ...        | ...                       |
```

7. Describe each issue found with a fix suggestion.
8. **Revert to default** — call `StopSimulationAsync()` via `execute_luau`. Tell the user: "Studio reset to default viewport."

## Important

- Device list is dynamic — always read it fresh, pick by DeviceForm + resolution
- `SetDeviceAsync` clears resolution/DPI overrides but `SetScalingModeAsync` **persists** across switches
- Default orientation is **Landscape** for all devices
- See SKILL.md for full workflow details, Luau code snippets, and annotation coordinate reference
