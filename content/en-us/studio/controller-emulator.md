---
title: Controller Emulator
description: Use Controller Emulator to emulate gamepads, VR controllers, handhelds, and TV remotes in Roblox Studio, and test input without owning the hardware.
---

**Controller Emulator** is a widget in Roblox Studio that emulates the devices players use to control your experience: gamepads, VR headsets and controllers, handhelds, and TV remotes. It shows a picture of the device you pick, sends real input events when you click it or press a mapped key, and lights up its controls as input arrives, so you can test a gamepad-first control scheme, or a VR interaction, without owning either.

Emulating input is separate from simulating a device. [Device Simulator](./device-simulator.md) changes the screen, platform, and hardware your experience believes it's running on. Controller Emulator changes what's plugged into it. The two are usually used together.

## Open Controller Emulator

Either:

1. Click **Virtual controller** in the Device Simulator toolbar, or
2. Click **Controller** in the **Emulation** toolbar tab.

The widget requires an open place. While you're in a playtest, opening the widget connects the emulated device and closing it disconnects it, so you can plug and unplug the controller mid-session.

## Emulate a device

The dropdown at the top of the widget selects the device to emulate.

<img src="../assets/studio/device-simulator/controller-emulator-vr-input.png" width="760" alt="Controller Emulator showing Quest 3 controllers, keyboard mappings, and controls for moving the headset and controllers." />

<table>
<thead>
	<tr>
		<th>Device</th>
		<th>Emulates</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Generic Gamepad</strong></td>
		<td>A gamepad with no vendor-specific button naming.</td>
	</tr>
	<tr>
		<td><strong>PS4</strong></td>
		<td>A PlayStation 4 controller.</td>
	</tr>
	<tr>
		<td><strong>PS5</strong></td>
		<td>A PlayStation 5 controller.</td>
	</tr>
	<tr>
		<td><strong>Xbox</strong></td>
		<td>An Xbox controller.</td>
	</tr>
	<tr>
		<td><strong>Generic Handheld</strong></td>
		<td>A handheld PC with built-in controls.</td>
	</tr>
	<tr>
		<td><strong>TV Remote</strong></td>
		<td>An Android TV remote, including its directional pad and center and back buttons.</td>
	</tr>
	<tr>
		<td><strong>Quest2 / Quest3</strong></td>
		<td>Meta Quest headsets and controllers.</td>
	</tr>
</tbody>
</table>

Your experience sees the corresponding gamepad type, so code that branches on `Enum.GamepadType` or reads a controller's button set behaves as it would with the real device attached.

## Send input

Input can come from three places, and the widget shows what arrived from any of them: as input is received, including from a real controller you have plugged in, the matching control on the device picture highlights. That's the fastest way to confirm that the input your experience received is the input you meant to send.

### Device controls

Buttons, triggers, and thumbsticks on the device picture are interactive. Click or drag them to send input. Triggers and thumbsticks report analog values, not just pressed and released, so you can test a partial pull or a slow stick movement.

### Keyboard

While the widget has focus, keyboard input is forwarded to the emulated device using its current mappings. This is what lets you test a control scheme at speed, with both hands, the way a player would use it. See [Edit mappings](#edit-mappings) to change which key drives which control.

### Headset and hand poses

VR has no single control to click. Its input is a head pose and two hand poses, so when a VR device is emulated the widget adds controls for moving them.

**Headset**, **Left Controller**, and **Right Controller** each have a toggle. Enabled parts respond to your keyboard and mouse, and disabled parts hold still. Moving the head and one hand independently is what lets you test whether an interaction depends on where the player is looking.

<table>
<thead>
	<tr>
		<th>Action</th>
		<th>Input</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Move</td>
		<td>Shift + W / A / S / D</td>
	</tr>
	<tr>
		<td>Fly up/down</td>
		<td>Shift + E / Q</td>
	</tr>
	<tr>
		<td>Rotate</td>
		<td>Mouse move</td>
	</tr>
	<tr>
		<td>Tilt</td>
		<td>Right click + mouse move</td>
	</tr>
	<tr>
		<td>Switch controllers</td>
		<td>Shift + Left / Right</td>
	</tr>
	<tr>
		<td>Toggle cursor lock</td>
		<td>Alt + 1</td>
	</tr>
	<tr>
		<td>Toggle mouse emulation</td>
		<td>Alt + Esc</td>
	</tr>
</tbody>
</table>

Click the 3D viewport to interact with the VR scene.

**Translation sensitivity** scales how far the enabled parts travel per keypress, from 1 to 10. Lower it when you're positioning a hand against a small target, and raise it to cross the scene. **Reset Positions** returns the head and both hands to their default pose during a playtest, which is the quickest way out of a pose you can't recover from by hand.

## Edit mappings

Each emulated device has its own keyboard mappings, so `W` can mean one thing on a gamepad and another on a TV remote. Click **Edit mappings** to open the mapping editor, which shows the device picture with every control labeled by the key currently bound to it.

<img src="../assets/studio/device-simulator/controller-emulator-mappings.png" width="600" alt="Controller Emulator mapping editor showing the keyboard key assigned to each gamepad control." />

To remap a control, click its label, then press the key or keys you want bound to it. Hovering a label highlights the control it drives on the picture, so you can tell which physical control you're about to rebind.

- If the key you press is already bound to another control, the older binding is removed and a warning tells you which one, rather than silently leaving two controls on one key.
- **Save** commits your changes to the device.
- **Restore Defaults** returns the device to its original mappings, after a confirmation.

Mappings are stored per device and persist across sessions.

## Pair with the Device Simulator

Controller Emulator follows the device you're simulating. Selecting a console, headset, handheld, or Android TV device in [Device Simulator](./device-simulator.md) switches Controller Emulator to the matching controller, so the simulated hardware and the emulated input stay consistent without you setting both.

## Example workflows

- **Test a gamepad-first control scheme.** Simulate a console in Device Simulator and its controller here, then drive your experience entirely from the emulated pad. Anything you can't reach is a gap in your gamepad navigation.
- **Confirm input is arriving.** Watch the device picture while you play. If a control doesn't light up, the problem is upstream of your input handling.
- **Test analog thresholds.** Drag a trigger or thumbstick slowly and check where your dead zones and activation thresholds actually fire.
- **Test a VR interaction one hand at a time.** Disable the headset and one controller, then move the remaining hand into position to check reach, grab volumes, and whether the interaction depends on gaze.
- **Test TV remote navigation.** Simulate an Android TV device and confirm your UI is fully navigable with a directional pad, a center button, and a back button.
- **Validate custom mappings.** Rebind the controls you use most and play with the keyboard, which is faster than clicking the picture for anything involving timing.
