Test UI on a device in Play mode — verify that the game's runtime UI works at the target device resolution.

## What to do

1. Connect to Studio — if multiple instances are open, call `list_roblox_studios` and `set_active_studio` first

2. **Set the device BEFORE entering Play mode** — if user specified a device, use that. Otherwise pick the latest `Phone` (highest generation number) from the device list. Switch via `execute_luau` (see SKILL.md "Switch to a device").

3. Enter Play mode via `start_stop_play`.

4. Wait for game to initialize (~5-8 seconds), then take screenshot via `screen_capture`. Analyze visually.

5. Check `get_console_output` for runtime errors.

6. (Optional) If the user asks for interaction testing:
   - `user_mouse_input` to click buttons — **add a wait (100-200ms) between moveTo and click**
   - `user_keyboard_input` to test input flows
   - Take another screenshot after interaction

7. Stop Play mode via `start_stop_play`.

8. **Revert to default** — call `StopSimulationAsync()` via `execute_luau`. Tell the user: "Studio reset to default viewport."

9. **Report:**

```
Play Mode Test: <Device> (<width>x<height>)

  Viewport: <viewport_size>
  Console: no errors

  Observations:
  - ...
```

If issues found, include fix suggestions.

## Critical constraints

- **All setter methods ERROR in PlayServer state** — you MUST set the device before entering Play mode
- Getter methods work in all game states
- `execute_luau` cannot access `PlayerGui` or `AbsolutePosition` in Play mode — use `screen_capture` for visual verification
- **user_mouse_input**: add wait between moveTo and click to avoid mis-targeting
- See SKILL.md for full API reference and pre-placed verification script (Advanced section)
