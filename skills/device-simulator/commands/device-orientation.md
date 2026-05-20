Test UI in both landscape and portrait orientations on a device, capturing screenshots for comparison.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first

2. **Check if the game supports portrait** — read `StarterGui.ScreenOrientation`:
   - `LandscapeSensor` / `LandscapeLeft` / `LandscapeRight` → **Tell the user this game is landscape-only.** Ask if they still want to proceed.
   - `Sensor` → Both orientations supported, proceed.
   - `Portrait` → Portrait only, skip landscape.

3. If no device is active, pick the latest `Phone` (highest generation number) from the device list. Switch via `execute_luau`.

4. **Capture both orientations:**

   a. Set **Landscape** via `execute_luau`:
   ```lua
   local svc = game:GetService("StudioDeviceSimulatorService")
   svc:SetOrientationAsync(Enum.ScreenOrientation.LandscapeLeft)
   task.wait(0.2)
   return "Orientation: " .. tostring(svc:GetOrientationAsync()) .. " | Viewport: " .. tostring(workspace.CurrentCamera.ViewportSize)
   ```
   b. `screen_capture` — analyze landscape layout

   c. Set **Portrait** via `execute_luau`:
   ```lua
   local svc = game:GetService("StudioDeviceSimulatorService")
   svc:SetOrientationAsync(Enum.ScreenOrientation.Portrait)
   task.wait(0.2)
   return "Orientation: " .. tostring(svc:GetOrientationAsync()) .. " | Viewport: " .. tostring(workspace.CurrentCamera.ViewportSize)
   ```
   d. `screen_capture` — analyze portrait layout

5. Check `get_console_output` for errors.

6. **Report:**

```
Orientation Test: <Device Name>

| Orientation | Viewport  | Issues |
|-------------|-----------|--------|
| Landscape   | WxH       | ...    |
| Portrait    | WxH       | ...    |
```

7. Report any visual differences with fix suggestions.

8. **Revert to landscape** — call `SetOrientationAsync(Enum.ScreenOrientation.LandscapeLeft)`, then `StopSimulationAsync()`. Tell the user: "Orientation reset to landscape."

## Key facts

- `SetOrientationAsync` does NOT clear resolution/DPI overrides
- `Camera.ViewportSize` axes swap in portrait: X < Y
- `GetResolutionAsync()` always returns landscape-canonical values — don't assert it matches ViewportSize
- Use `LandscapeLeft` by default; only `LandscapeRight` if user explicitly asks
- See SKILL.md for full API reference
