---
title: Free camera mode
description: Free camera mode allows free roam of the local camera around the scene.
---

Roblox provides a custom debug **free camera mode** (freecam) to experience owners and editors, which detaches the camera from your character so you can fly it freely through your experience for capturing scenes the default camera can't reach. It's especially useful for capturing cinematic screenshots and videos, as well as spectating players in live games and debugging issues.

<video src="../../assets/workspace/free-camera/Freecam-Showcase.mp4" controls width="100%" alt="Cinematic free camera montage"></video>

## Availability

You can use free camera mode in two places:

- **Roblox Studio** - freecam is available during [playtesting](../../studio/testing-modes.md#playtesting) sessions.
- **The live client** - you must be the experience owner, or be granted edit permissions in the experience.

<Alert severity="info">
Currently, freecam can only be toggled on with a keyboard (<kbd>Left Shift</kbd> + <kbd>P</kbd>). Once active, it can be controlled with either keyboard and mouse or a gamepad.
</Alert>

## How to toggle

Press <kbd>Left Shift</kbd> + <kbd>P</kbd> to toggle free camera mode on or off. When enabled, the camera detaches from your character and your on-screen UI is automatically hidden so you get an unobstructed view of the scene.

<video src="../../assets/workspace/free-camera/Freecam-Toggle.mp4" controls width="90%" alt="Toggling free camera on and off with LeftShift+P"></video>

## Input Action System

The enhanced free camera capabilities described on this page — including the [configuration menu](#configuration-menu) and [cinematic post-processing](#custom-post-processing) — run on the [Input Action System](../../input/input-action-system.md) (IAS) and are available only when your experience is opted into the upgraded IAS player scripts.

To opt in, set `Class.Workspace.PlayerScriptsUseInputActionSystem` to `Enum.RolloutState|Enabled` to allow free camera controls to run on IAS so inputs sink cleanly alongside your default gameplay actions.

## Camera controls

In freecam mode, the camera can move and rotate to your desired positioning independent of the character and scene. The following controls are available to control the camera:

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Keyboard &amp; Mouse</th>
    <th>Gamepad</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Move forward / left / back / right</td>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Left thumbstick</td>
  </tr>
  <tr>
    <td>Change elevation (up / down)</td>
    <td><kbd>E</kbd> / <kbd>Q</kbd></td>
    <td><kbd>R2</kbd> / <kbd>L2</kbd></td>
  </tr>
  <tr>
    <td>Rotate / pan the view</td>
    <td>Hold the right mouse button and drag, or pan on a trackpad</td>
    <td>Right thumbstick</td>
  </tr>
  <tr>
    <td>Zoom (field of view)</td>
    <td>Mouse scroll wheel, or trackpad pinch</td>
    <td><kbd>X</kbd> / <kbd>Y</kbd></td>
  </tr>
  <tr>
    <td>Roll (tilt left / right)</td>
    <td><kbd>Z</kbd> / <kbd>C</kbd> — double-tap either key to reset roll</td>
    <td><kbd>L1</kbd> / <kbd>R1</kbd> — double-tap to reset roll</td>
  </tr>
  <tr>
    <td>Move slower for precise framing</td>
    <td>Hold <kbd>Shift</kbd> while moving</td>
    <td>&mdash;</td>
  </tr>
  <tr>
    <td>Open the configuration menu</td>
    <td><kbd>&uarr;</kbd> (up arrow)</td>
    <td>D-pad Up</td>
  </tr>
</tbody>
</table>

### Movement

Use <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> (or the left thumbstick) to fly the camera through your scene.

<video src="../../assets/workspace/free-camera/Freecam-Movement.mp4" controls width="90%" alt="WASD movement in free camera"></video>

### Elevation

Use <kbd>E</kbd> and <kbd>Q</kbd> (or <kbd>R2</kbd> / <kbd>L2</kbd>) to raise and lower the camera vertically.

<video src="../../assets/workspace/free-camera/Freecam-Elevation.mp4" controls width="90%" alt="Raising and lowering the free camera with E and Q"></video>

### Rotation

Hold the right mouse button and drag (or use the right thumbstick) to rotate and pan the view toward your subject.

<video src="../../assets/workspace/free-camera/Freecam-Rotation.mp4" controls width="90%" alt="Rotating and panning the free camera view"></video>

### Field of view

Scroll the mouse wheel (or press <kbd>X</kbd> / <kbd>Y</kbd> on a gamepad) to zoom the field of view. Narrowing the field of view produces a tighter, more telephoto framing on distant subjects.

<video src="../../assets/workspace/free-camera/Freecam-FOV.mp4" controls width="90%" alt="Zooming the field of view with the mouse wheel"></video>

### Roll

Use <kbd>Z</kbd> and <kbd>C</kbd> (or <kbd>L1</kbd> / <kbd>R1</kbd>) to roll the camera for a Dutch-angle effect. Double-tap either roll control to snap the camera back to the default level.

<video src="../../assets/workspace/free-camera/Freecam-Roll.mp4" controls width="90%" alt="Rolling the free camera for a Dutch-angle effect"></video>

## Configuration menu

Press <kbd>&uarr;</kbd> (or D-pad Up) to open the on-screen **config menu**, which exposes deeper adjustments for fine-tuning your shot.

Navigate the menu with the following controls:

- <kbd>&uarr;</kbd> <kbd>&darr;</kbd> move the selection through the list.
- <kbd>&rarr;</kbd> enters a group or selects an item to edit.
- <kbd>&larr;</kbd> goes back to the previous level, or closes the menu from the top level.
- When editing an item, <kbd>&larr;</kbd> <kbd>&rarr;</kbd> adjust the value and <kbd>&uarr;</kbd> <kbd>&darr;</kbd> exit editing.

On a gamepad, use the D-pad in the corresponding directions.

<video src="../../assets/workspace/free-camera/Freecam-Menu.mp4" controls width="90%" alt="Opening and navigating the free camera config menu"></video>

### Movement, rotation, roll, and field of view

Each of these motion controls exposes two independent settings in the config menu:

- **Speed** controls how fast the value changes. Increase it to cover ground, zoom, tilt, or pan more quickly; decrease it for fine, precise adjustments.
- **Stiffness** controls how the camera settles into an input change. Higher stiffness is snappy and follows your input tightly with little smoothing; lower stiffness adds damping so the camera eases in and out gradually for smoother, more cinematic motion.

<Grid container direction="row" spacing={2}>
<Grid item xs={12} md={6}>

**High speed** — the camera rotates quickly:

<video src="../../assets/workspace/free-camera/Freecam-Speed-Fast.mp4" controls width="100%" alt="Fast camera rotation with high speed"></video>
</Grid>
<Grid item xs={12} md={6}>

**Low speed** — the camera rotates slowly for precise framing:

<video src="../../assets/workspace/free-camera/Freecam-Speed-Slow.mp4" controls width="100%" alt="Slow camera rotation with low speed"></video>
</Grid>
</Grid>

<Grid container direction="row" spacing={2}>
<Grid item xs={12} md={6}>

**High stiffness** — the camera follows input tightly and stops sharply:

<video src="../../assets/workspace/free-camera/Freecam-Stiffness-Snappy.mp4" controls width="100%" alt="Snappy camera rotation with high stiffness"></video>
</Grid>
<Grid item xs={12} md={6}>

**Low stiffness** — the camera eases in and out for smoother, more cinematic motion:

<video src="../../assets/workspace/free-camera/Freecam-Stiffness-Smooth.mp4" controls width="100%" alt="Smooth camera rotation with low stiffness"></video>
</Grid>
</Grid>

### UI visibility

Control which on-screen interface stays visible so you can capture a clean shot or keep key information on screen.

- **Screen GUIs** — toggle the experience's on-screen UI overlays. Set to **On** to keep them visible, or **Off** to hide them for an unobstructed view.
- **Leaderboard** — toggle the player leaderboard. Set to **On** to keep it on screen, or **Off** to hide it.

<video src="../../assets/workspace/free-camera/Freecam-ScreenGuis.mp4" controls width="90%" alt="Toggling the experience's on-screen GUIs"></video>

<video src="../../assets/workspace/free-camera/Freecam-Leaderboard.mp4" controls width="90%" alt="Toggling the player leaderboard"></video>

### Player Lock

Player Lock keeps the camera trained on a specific player's character as they move, so you can follow the action without manually tracking.

- **Enable** — turn Player Lock on or off. When on, the camera follows the chosen target; when off, the camera moves freely.
- **Target** — cycle through the players in the server to choose who the camera locks onto.

<video src="../../assets/workspace/free-camera/Freecam-PlayerLock-Enable.mp4" controls width="90%" alt="Enabling Player Lock to follow a player"></video>

<video src="../../assets/workspace/free-camera/Freecam-PlayerLock-Cycle.mp4" controls width="90%" alt="Cycling the Player Lock target between players"></video>

### Custom post-processing

Layer cinematic [post-processing effects](../../environment/post-processing-effects.md) onto your shot. **Enable** disables all existing post-processing effects in favor of custom freecam ones, and each effect below can then be toggled and fine-tuned on its own:

- [**Depth of Field**](../../environment/post-processing-effects.md#depth-of-field) blurs parts of the scene that aren't in focus — great for drawing the eye to a subject or softening a distant background.
- [**Bloom**](../../environment/post-processing-effects.md#bloom) exaggerates bright lights so light-colored areas glow, simulating a camera pointed at a strong light source.
- [**Blur**](../../environment/post-processing-effects.md#blur) applies a Gaussian blur across the entire view for soft, dreamy, or fully out-of-focus looks.
- [**Color Correction**](../../environment/post-processing-effects.md#color-correction) adjusts brightness, contrast, saturation, and tint to set the mood or grade the overall color of your shot.
- [**Sun Rays**](../../environment/post-processing-effects.md#sun-rays) casts a halo of light with rays around the sun, shaped by objects between the camera and the sun for realistic light and shadow.
- [**Color Grading**](../../environment/post-processing-effects.md#color-grading) changes how rendered colors map to the screen — switch between the vivid modern look and a less-saturated retro tone.

<video src="../../assets/workspace/free-camera/Freecam-PostProcessing-DepthOfField.mp4" controls width="90%" alt="Adjusting Depth of Field in the free camera post-processing menu"></video>

<video src="../../assets/workspace/free-camera/Freecam-PostProcessing-ColorCorrection.mp4" controls width="90%" alt="Adjusting Color Correction in the free camera post-processing menu"></video>

## GUI visibility shortcuts

Separate from the config menu's [UI visibility](#ui-visibility) toggles, Roblox provides engine-level keyboard shortcuts that hide categories of on-screen UI, useful for capturing a clean shot without any interface. They work in the **live client** and in a Studio **playtest**, and are available to the same audience as free camera — the experience owner or a user with edit permission (and always in Studio). Press the same shortcut again to restore.

These controls are currently available for keyboard only. Hold <kbd>Ctrl</kbd> (or <kbd>⌘</kbd> on macOS) and <kbd>Left Shift</kbd>, then press:

<table>
<thead>
  <tr>
    <th>Shortcut</th>
    <th>Hides / shows</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>G</kbd></td>
    <td>The Roblox-provided **Core UI**, such as the top bar and menus.</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>C</kbd></td>
    <td>Developer-created `Class.ScreenGui|ScreenGuis` (on-screen 2D UIs).</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>B</kbd></td>
    <td>Developer-created `Class.BillboardGui|BillboardGuis` (world-space 3D billboards).</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>N</kbd></td>
    <td>Player nameplates (names and health bars).</td>
  </tr>
</tbody>
</table>

**<kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>G</kbd>** — toggle the Roblox Core UI:

<video src="../../assets/workspace/free-camera/Freecam-CtrlShiftG.mp4" controls width="90%" alt="Hiding the Roblox Core UI with Ctrl+Left Shift+G"></video>

**<kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>C</kbd>** — toggle the experience's on-screen GUIs:

<video src="../../assets/workspace/free-camera/Freecam-CtrlShiftC.mp4" controls width="90%" alt="Hiding the experience's ScreenGuis with Ctrl+Left Shift+C"></video>

**<kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>B</kbd>** — toggle developer-created BillboardGuis:

<video src="../../assets/workspace/free-camera/Freecam-CtrlShiftB.mp4" controls width="90%" alt="Hiding BillboardGuis with Ctrl+Left Shift+B"></video>

**<kbd>Ctrl</kbd><kbd>Left Shift</kbd><kbd>N</kbd>** — toggle player nameplates:

<video src="../../assets/workspace/free-camera/Freecam-CtrlShiftN.mp4" controls width="90%" alt="Hiding player nameplates with Ctrl+Left Shift+N"></video>
