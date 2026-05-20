# VirtualInput API Specification

## What is VirtualInput?

VirtualInput allows programmatic injection of mouse, keyboard, and pointer input into a running Roblox game, as if performed by a real player. It is used for testing UI interactions, automating workflows, and verifying input-driven behavior without requiring a physical device.

## Obtaining a VirtualInput Handle

```lua
local UIS = game:GetService("UserInputService")
local vi = UIS:CreateVirtualInput()
```

- Returns a `VirtualInput` object
- Create once per script session and reuse for all subsequent calls

## Prerequisites

- Roblox Studio with a place open
- Game must be in Play mode for meaningful interaction (VirtualInput injects into the live input pipeline)

## Coordinate Space

All positions are in **engine viewport space**:
- Origin is the top-left corner of the game window
- X increases right, Y increases down
- Matches `GuiObject.AbsolutePosition` and `GuiObject.AbsoluteSize`
- Center of an element: `Vector2.new(AbsolutePosition.X + AbsoluteSize.X / 2, AbsolutePosition.Y + AbsoluteSize.Y / 2)`

---

## Methods

### SendMousePosition

```lua
vi:SendMousePosition(position: Vector2)
```

Moves the cursor to an absolute position in viewport space. Equivalent to the player physically moving their mouse to that coordinate.

**Throws if:** the position overlaps an interactive CoreGUI element.

**Example:**
```lua
vi:SendMousePosition(Vector2.new(400, 300))
```

---

### SendMouseDelta

```lua
vi:SendMouseDelta(positionDelta: Vector2)
```

Sends a relative mouse movement delta. Used when the cursor is locked (e.g., first-person camera). Positive X = move right; positive Y = move down.

**Throws if:** the cursor is not currently locked in the main window.

**Requires:** `UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter` set before calling.

**Restore after:** `UserInputService.MouseBehavior = Enum.MouseBehavior.Default`

**Example:**
```lua
UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter
task.wait(0.1)

vi:SendMouseDelta(Vector2.new(10, 0))    -- rotate camera right
vi:SendMouseDelta(Vector2.new(0, -8))    -- rotate camera up

UserInputService.MouseBehavior = Enum.MouseBehavior.Default
```

---

### SendMouseButton

```lua
vi:SendMouseButton(position: Vector2, button: Enum.UserInputType, isDown: boolean, repeatCount: number?)
```

Sends a mouse button press (`isDown=true`) or release (`isDown=false`).

**Supported buttons:**
- `Enum.UserInputType.MouseButton1` (left)
- `Enum.UserInputType.MouseButton2` (right)
- `Enum.UserInputType.MouseButton3` (middle)

**repeatCount** (optional, default 0):
- `0` = single click
- `1` = double-click
- `2` = triple-click

**Throws if:**
- The position overlaps an interactive CoreGUI element
- The button is already in the requested state (duplicate state — e.g., pressing when already pressed)
- An unsupported `UserInputType` is passed

**Always pair press with release.** Down + up with no wait between them = one atomic click.

**Examples:**
```lua
-- Single left click
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false)

-- Double-click
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true, 1)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false, 1)

-- Right-click
vi:SendMouseButton(pos, Enum.UserInputType.MouseButton2, true)
vi:SendMouseButton(pos, Enum.UserInputType.MouseButton2, false)
```

---

### SendPointerAction

```lua
vi:SendPointerAction(position: Vector2, pointerAction: { Wheel: number?, Pan: Vector2?, Pinch: number? })
```

Sends a composite pointer gesture at a given viewport position. The second argument is a dictionary with any combination of:

| Field | Type | Description |
|-------|------|-------------|
| `Wheel` | number | Scroll wheel delta. `+1.0` = one tick up/forward, `-1.0` = one tick down/backward |
| `Pan` | Vector2 | Trackpad pan delta in pixels |
| `Pinch` | number | Pinch-zoom delta. `+0.1` = zoom in, `-0.1` = zoom out |

If all values are zero or absent, the call is a no-op.

**Throws if:** the position overlaps an interactive CoreGUI element.

**Examples:**
```lua
-- Scroll up one tick
vi:SendPointerAction(center, { Wheel = 1.0 })

-- Scroll down one tick
vi:SendPointerAction(center, { Wheel = -1.0 })

-- Pan right 10px
vi:SendPointerAction(center, { Pan = Vector2.new(10, 0) })

-- Pan down 10px
vi:SendPointerAction(center, { Pan = Vector2.new(0, 10) })

-- Zoom in
vi:SendPointerAction(center, { Pinch = 0.1 })

-- Zoom out
vi:SendPointerAction(center, { Pinch = -0.1 })

-- Combined gesture (scroll + pan simultaneously)
vi:SendPointerAction(center, { Wheel = 1.0, Pan = Vector2.new(2, 0) })
```

---

### SendKey

```lua
vi:SendKey(isPressed: boolean, keyCode: Enum.KeyCode, isRepeatedKey: boolean?)
```

Sends a key press (`isPressed=true`) or release (`isPressed=false`). Always call the matching release after each press.

**isRepeatedKey** (optional, default false): Simulates a held-key auto-repeat event. **Only valid for text-manipulation keys** (Backspace, Delete, Return, PageUp, PageDown, arrow keys). Always throws for any other key.

**Throws if:**
- The key is bound to a CoreGUI core action (Tab, Escape, Backquote, F1, F9)
- A CoreGUI element has keyboard focus (menu open, CoreGUI TextBox focused)
- `isRepeatedKey=true` is passed for a non-text-manipulation key

**Examples:**
```lua
-- Press and release W (movement)
vi:SendKey(true, Enum.KeyCode.W)
vi:SendKey(false, Enum.KeyCode.W)

-- Hold Shift + W (sprint)
vi:SendKey(true, Enum.KeyCode.LeftShift)
vi:SendKey(true, Enum.KeyCode.W)
task.wait(1)
vi:SendKey(false, Enum.KeyCode.W)
vi:SendKey(false, Enum.KeyCode.LeftShift)

-- Backspace with repeat (held key)
vi:SendKey(true, Enum.KeyCode.Backspace)
vi:SendKey(true, Enum.KeyCode.Backspace, true)  -- repeat
vi:SendKey(false, Enum.KeyCode.Backspace)

-- Jump
vi:SendKey(true, Enum.KeyCode.Space)
vi:SendKey(false, Enum.KeyCode.Space)
```

---

### SendTextInput

```lua
vi:SendTextInput(text: string)
```

Injects a text string as if the player typed it. Useful for filling TextBoxes without simulating individual keystroke events. An empty string is a no-op.

**Throws if:** a CoreGUI element has keyboard focus.

**Note:** The target TextBox must already have focus (via a preceding click).

**Examples:**
```lua
vi:SendTextInput("Hello, world!")   -- type a full string
vi:SendTextInput("A")               -- single character
vi:SendTextInput("")                -- no-op, no error
```

---

## Error Conditions

| Error message | Cause | Resolution |
|---|---|---|
| "VirtualInput is not enabled" | Unexpected — VirtualInput should be available | Verify Studio is running and game is in Play mode |
| "position hits CoreGUI" | Mouse position overlaps interactive CoreGUI element | Move position away from CoreGUI area |
| "duplicate button state" | Button already in requested state (e.g., pressing when already pressed) | Release before pressing again |
| "cursor is not locked" | `SendMouseDelta` called without cursor lock | Set `MouseBehavior = LockCenter` first |
| "key is permanently bound to a CoreGUI core action" | Key is bound to a core action (Tab, Escape, Backquote, F1, F9) | Cannot send this key |
| "CoreGUI has keyboard focus" | Menu open or CoreGUI TextBox focused | Cannot send keys/text while CoreGUI has focus |
| "unsupported UserInputType" | Invalid button type passed to SendMouseButton | Use MouseButton1, MouseButton2, or MouseButton3 |
| "isRepeatedKey only valid for text manipulation keys" | `isRepeatedKey=true` on a non-text key | Only use for Backspace, Delete, Return, PageUp, PageDown, arrow keys |

---

## Common Interaction Patterns

### Click an element by name

```lua
local UIS = game:GetService("UserInputService")
local Players = game:GetService("Players")
local vi = UIS:CreateVirtualInput()

local pg = Players.LocalPlayer:WaitForChild("PlayerGui", 5)
local target = pg:FindFirstChild("ButtonName", true)
if not target or not target:IsA("GuiObject") then
    return "Element not found"
end

local pos = target.AbsolutePosition
local size = target.AbsoluteSize
local center = Vector2.new(pos.X + size.X / 2, pos.Y + size.Y / 2)

vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false)
```

### Focus TextBox and type

```lua
-- Click to focus
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, true)
vi:SendMouseButton(center, Enum.UserInputType.MouseButton1, false)
task.wait(0.1)

-- Type
vi:SendTextInput("Hello!")
```

### Clear text then type new text

```lua
-- Select all + delete
vi:SendKey(true, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.A)
vi:SendKey(false, Enum.KeyCode.LeftControl)
vi:SendKey(true, Enum.KeyCode.Backspace)
vi:SendKey(false, Enum.KeyCode.Backspace)
task.wait(0.05)

-- Type new text
vi:SendTextInput("New text")
```

### Hover (move without clicking)

```lua
vi:SendMousePosition(Vector2.new(400, 300))
```

### Camera rotation (first-person)

```lua
local UIS = game:GetService("UserInputService")
UIS.MouseBehavior = Enum.MouseBehavior.LockCenter
task.wait(0.1)

vi:SendMouseDelta(Vector2.new(50, 0))    -- look right
vi:SendMouseDelta(Vector2.new(-30, 0))   -- look left
vi:SendMouseDelta(Vector2.new(0, -20))   -- look up

UIS.MouseBehavior = Enum.MouseBehavior.Default
```

### Multiple scroll ticks

```lua
for i = 1, 5 do
    vi:SendPointerAction(position, { Wheel = -1.0 })
    task.wait(0.05)
end
```

---

## Known Limitations

1. **No touch input** — VirtualInput does not expose touch events. Mobile UI testing is mouse-only.
2. **No gamepad input** — no gamepad button or axis support.
3. **CoreGUI interaction is restricted** — any attempt to interact with CoreGUI elements throws a runtime exception.
4. **SendMouseDelta requires cursor locked** — must set `MouseBehavior = LockCenter` first; throws otherwise.
5. **Mouse button state is tracked** — cannot press a button that is already pressed; must pair press with release.
6. **SendMouseDelta requires window focus** — if Studio window loses focus between setting LockCenter and calling SendMouseDelta, the call throws.
7. **isRepeatedKey is restricted** — only valid for text-manipulation keys (Backspace, Delete, Return, PageUp, PageDown, arrows).
