# StudioDeviceSimulatorService — API Specification

Full API reference for the Device Simulator Lua API. This document is for agent reference — for behavior instructions and workflows, see `SKILL.md`.

## What is device simulation?

Roblox Studio has a **Device Simulator** that resizes the game viewport to match a real device's screen resolution. It doesn't run on a real phone — it changes how Studio renders the viewport so you can preview how your game would look on that device.

When you activate a device (e.g., iPhone 14 Pro at 852x393), Studio:
1. Resizes the viewport to that resolution
2. The game's UI re-layouts based on the new `Camera.ViewportSize`
3. You see what a player on that device would see

When you stop simulation, the viewport goes back to Studio's default size.

## The lifecycle

```
No simulation ("default")
  │
  ├── SetDeviceAsync(id) ──→ Device active (viewport = device resolution)
  │                              │
  │                              ├── SetOrientationAsync() ──→ viewport rotates
  │                              ├── SetResolutionAsync() ──→ override device resolution
  │                              ├── SetPixelDensityAsync() ──→ override DPI
  │                              └── SetScalingModeAsync() ──→ change how viewport fits in Studio
  │
  ├── SetDeviceAsync("default") or StopSimulationAsync() ──→ back to no simulation
  │
  └── SetOrientationAsync() ──→ stored, applied when a device is activated later
```

## Device presets vs overrides

- **Device preset** = a named device with fixed Width, Height, PixelDensity (e.g., "iPhone 14 Pro" = 852x393 @ 460dpi)
- **Overrides** = you can change resolution and DPI after activating a device
- `SetDeviceAsync` **clears** resolution and DPI overrides (resets to device native)
- `SetOrientationAsync` does **NOT** clear overrides
- `SetScalingModeAsync` **persists forever** — never cleared by anything

## Typical flow

```lua
local svc = game:GetService("StudioDeviceSimulatorService")

-- 1. Get the list of available devices (IDs are dynamic, never hardcode)
local devices = svc:GetDeviceListAsync()

-- 2. Find the device by display name
for _, id in devices do
    local info = svc:GetDeviceInfoAsync(id)
    if info.Name == "iPhone 14 Pro" then

        -- 3. Activate the device (viewport resizes)
        svc:SetDeviceAsync(id)
        task.wait(0.2)  -- MUST wait for viewport to update

        -- 4. Read the result
        print(workspace.CurrentCamera.ViewportSize)  -- e.g., 734, 372
        break
    end
end
```

Key rules:
- **Always search by name** — device IDs are internal strings like `"iphone_14_Pro_v2"`, not display names
- **Always `task.wait(0.2)` after any setter** — viewport updates are async
- **Check `GetDeviceAsync()` to verify** — returns the active device ID, or `"default"` if not simulating

---

## Service

```lua
local svc = game:GetService("StudioDeviceSimulatorService")
-- SECURITY: Plugin context only (call via execute_luau MCP tool)
```

### Core pattern: find device by name, then activate

Device IDs are internal strings (e.g., `"iphone_14_Pro_v2"`) — NOT the display name. Always search by `Name`:

```lua
local svc = game:GetService("StudioDeviceSimulatorService")
local devices = svc:GetDeviceListAsync()
for _, id in devices do
    local info = svc:GetDeviceInfoAsync(id)
    if info.Name == "iPhone 14 Pro" then
        svc:SetDeviceAsync(id)
        task.wait(0.2)
        break
    end
end
```

### Important: all methods are async

Every method yields the calling coroutine (device state lives on a different thread from Lua). Always use `pcall` for methods that can error:

```lua
local ok, err = pcall(function()
    svc:SetDeviceAsync("nonexistent_id")
end)
if not ok then warn(err) end
```

---

## Methods

| Method | Returns | Notes |
|--------|---------|-------|
| `GetDeviceListAsync()` | `{string}` | Array of device ID strings (see example below) |
| `GetDeviceInfoAsync(id)` | `table` | Device metadata (see example below) |
| `SetDeviceAsync(id)` | — | `"default"` stops sim. **Clears resolution + DPI overrides.** |
| `GetDeviceAsync()` | `string` | Active ID or `"default"` |
| `StopSimulationAsync()` | — | Stop simulation (recommended over `SetDeviceAsync("default")`) |
| `SetOrientationAsync(ori)` | — | See enum values below. Can call before device is active (pre-set). |
| `GetOrientationAsync()` | `Enum.ScreenOrientation` | |
| `SetResolutionAsync(w, h)` | — | 1–7680 × 1–4320. Landscape-canonical: w = longer dimension. **Requires active device.** |
| `GetResolutionAsync()` | `Vector2` | **Requires active device** (errors if no device active). |
| `SetPixelDensityAsync(dpi)` | — | 72–10000. Controls widget physical size, NOT Camera.ViewportSize. **Requires active device.** |
| `GetPixelDensityAsync()` | `number` | **Requires active device.** |
| `SetScalingModeAsync(mode)` | — | See enum values below. **Requires active device. Persists across SetDeviceAsync.** |
| `GetScalingModeAsync()` | `Enum.DeviceSimulatorScalingMode` | **Requires active device.** |
| `CreateDeviceAsync(config)` | `string` | Returns DeviceId = Name. See config below. |
| `UpdateDeviceAsync(id, config)` | — | Custom devices only. If active, changes take effect immediately. |
| `RemoveDeviceAsync(id)` | — | Custom devices only. If active, auto-deactivates first. |

---

## Enum values (use these exact paths in Luau)

**Orientation:**
```lua
Enum.ScreenOrientation.LandscapeLeft   -- default landscape
Enum.ScreenOrientation.LandscapeRight
Enum.ScreenOrientation.Portrait
```

**Scaling mode:**
```lua
Enum.DeviceSimulatorScalingMode.FitToWindow        -- scale viewport to fit Studio widget (default, most common)
Enum.DeviceSimulatorScalingMode.ActualResolution    -- 1:1 pixel mapping, may be larger than widget
Enum.DeviceSimulatorScalingMode.ScaleToPhysicalSize -- uses DPI to calculate physical size on your monitor
```

| Mode | When to use |
|------|------------|
| `FitToWindow` | Default. Viewport scaled to fit Studio. Good for most testing. |
| `ActualResolution` | See exact pixels. Useful for pixel-perfect UI checks. May overflow Studio widget on high-res devices. |
| `ScaleToPhysicalSize` | Simulates physical device size on your monitor using DPI. Only mode where `SetPixelDensityAsync` has visual effect. |

**DeviceForm:**
```lua
Enum.DeviceForm.Phone    -- default for CreateDeviceAsync
Enum.DeviceForm.Tablet
Enum.DeviceForm.Desktop
Enum.DeviceForm.Console
Enum.DeviceForm.VR
```

---

## Return value examples (verified)

### GetDeviceListAsync

Returns an array of internal ID strings — NOT display names:
```lua
{"ipad_2", "ipad_mini_1st_Generation", "ipad_6th_Generation", "iphone_4S", "iphone_14_Pro_v2", ...}
```

### GetDeviceInfoAsync

```lua
{
    DeviceId = "iphone_14_Pro_v2",    -- internal ID (used for SetDeviceAsync)
    Name = "iPhone 14 Pro",            -- display name (use this for matching)
    Width = 852,
    Height = 393,
    PixelDensity = 460,
    ResolutionScale = 3,
    DeviceForm = Enum.DeviceForm.Phone, -- Phone, Tablet, Desktop, Console, VR
    IsCustom = false,
    PortraitKeyboardHeight = 346,
    LandscapeKeyboardHeight = 209,
}
```

> **Note:** `SafeAreaInsets` is NOT a field on this table (confirmed via testing).

---

## DeviceConfiguration table

Used by `GetDeviceInfoAsync` (read), `CreateDeviceAsync` (create), and `UpdateDeviceAsync` (update):

| Field | Type | Create/Update | Description |
|-------|------|---------------|-------------|
| `DeviceId` | string | Read-only | Unique identifier (= Name for custom devices) |
| `Name` | string | Required | Display name, 1–200 chars, not `"default"` |
| `Width` | number | Required | Screen width in pixels, 1–7680 |
| `Height` | number | Required | Screen height in pixels, 1–4320 |
| `PixelDensity` | number | Required | DPI, 72–10000 |
| `DeviceForm` | Enum.DeviceForm | Optional (default: Phone) | `Phone`, `Tablet`, `Desktop`, `Console`, or `VR` |
| `IsCustom` | boolean | Read-only | Whether the device is user-created |
| `ResolutionScale` | number | Optional (default: 1.0) | Resolution scaling factor, > 0, max 10.0 |
| `PortraitKeyboardHeight` | number | Optional (default: 0) | Keyboard height in portrait mode |
| `LandscapeKeyboardHeight` | number | Optional (default: 0) | Keyboard height in landscape mode |

Example — create and update a custom tablet:
```lua
local id = svc:CreateDeviceAsync({
    Name = "My Custom Tablet",
    Width = 2560,
    Height = 1600,
    PixelDensity = 300,
    DeviceForm = Enum.DeviceForm.Tablet,
})
svc:SetDeviceAsync(id)

-- Update it later
svc:UpdateDeviceAsync(id, {
    Name = "My Custom Tablet",  -- all required fields must be present
    Width = 2732,
    Height = 2048,
    PixelDensity = 264,
    DeviceForm = Enum.DeviceForm.Tablet,
})

-- Clean up
svc:StopSimulationAsync()
svc:RemoveDeviceAsync(id)
```

Notes:
- `"default"` is reserved — `CreateDeviceAsync` will error
- Built-in presets are immutable — `UpdateDeviceAsync`/`RemoveDeviceAsync` only work on custom devices
- Custom devices are persisted to disk (survive Studio restart)

---

## ConfigurationChanged event

```lua
svc.ConfigurationChanged:Connect(function()
    -- No parameters passed to callback
    -- Fires on: SetDeviceAsync, SetOrientationAsync, SetResolutionAsync,
    --           SetPixelDensityAsync, SetScalingModeAsync, StopSimulationAsync,
    --           RemoveDeviceAsync (on active device),
    --           AND user interaction with the Device Simulator UI
    -- Does NOT fire on: CreateDeviceAsync, UpdateDeviceAsync/RemoveDeviceAsync on inactive device
    -- Note: getter calls inside the handler are async and will yield
    local deviceId = svc:GetDeviceAsync()
    if deviceId ~= "default" then
        local res = svc:GetResolutionAsync()
        print(string.format("Device: %s @ %dx%d", deviceId, res.X, res.Y))
    end
end)
```

---

## Call ordering

```
SetOrientationAsync  → anytime (pre-set semantic, stored for next activation)
SetDeviceAsync       → anytime (activates device, clears resolution + DPI overrides)
SetResolutionAsync   → REQUIRES active device (errors otherwise)
SetPixelDensityAsync → REQUIRES active device (errors otherwise)
SetScalingModeAsync  → REQUIRES active device (persists independently, never auto-cleared)
```

**Recommended sequence:** `SetOrientationAsync` → `SetDeviceAsync` → `SetResolutionAsync` (if needed)

---

## State Persistence

| Property | Cleared by SetDeviceAsync? | Cleared by StopSimulationAsync? |
|----------|---------------------------|-------------------------------|
| Resolution override | Yes | Yes |
| DPI override | Yes | Yes |
| Orientation | No (preserved) | No |
| Scaling mode | **No (persists forever)** | **No** |
| Custom devices | No (persisted to disk) | No |

---

## Known Limitations

1. **All methods are async** — every call yields the calling coroutine. Device state lives on a different thread from Lua. Always wrap in `pcall` if the call might fail.
2. **`"default"` is magic** — `SetDeviceAsync("default")` stops simulation. Never call `GetDeviceInfoAsync("default")`.
3. **Device IDs are dynamic** — always `GetDeviceListAsync()` + search by name. Never hardcode.
4. **`task.wait(0.2)` after any setter** — viewport updates are async.
5. **Getters require active device too** — `GetResolutionAsync`, `GetPixelDensityAsync`, `GetScalingModeAsync` all error when no device active.
6. **PlayServer blocks all setters** — `SetDeviceAsync`, `StopSimulationAsync`, `SetOrientationAsync`, `SetResolutionAsync`, `SetPixelDensityAsync`, `SetScalingModeAsync` all error. Getters and CRUD on non-active devices are not affected. Work in Edit mode and PlayClient.
7. **Resolution + DPI overrides are session-level** — not persisted, cleared on `SetDeviceAsync`.
8. **ScalingMode persists** — never auto-cleared by anything, not even `SetDeviceAsync`.
9. **Built-in presets are immutable** — `UpdateDeviceAsync`/`RemoveDeviceAsync` only work on custom devices.
10. **Resolution is landscape-canonical** — `SetResolutionAsync(w, h)`: w = longer dimension, h = shorter, regardless of current orientation.
11. **DPI controls widget size, not viewport** — `SetPixelDensityAsync` changes the physical size of the viewport widget on your monitor, NOT `Camera.ViewportSize`. Only visible in `ScaleToPhysicalSize` mode.
12. **Camera.ViewportSize ≠ GetResolutionAsync()** — ViewportSize is affected by orientation, scaling mode, and safe area. Use `GetDeviceAsync()` for deterministic verification.

---

## Error Handling

Always use `pcall` — all methods can error:

```lua
local ok, err = pcall(function()
    svc:SetResolutionAsync(1920, 1080)
end)
if not ok then
    warn("SetResolutionAsync failed:", err)
end
```

| Error | Cause | Fix |
|-------|-------|-----|
| "service not enabled" | API not available | Tell user to check their Studio build |
| "no active device" | Called setter/getter without activating a device | Call `SetDeviceAsync` first |
| setter error in play mode | Called from PlayServer context | Set device before entering play, or switch to PlayClient tab |
| "default" is not a valid device | Tried `GetDeviceInfoAsync("default")` | Check `GetDeviceAsync() ~= "default"` before calling |
