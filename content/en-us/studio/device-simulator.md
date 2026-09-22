---
title: Device Simulator
description: Use Device Simulator to preview how your experience looks and behaves on devices you don't have in front of you, directly in Roblox Studio.
---

**Device Simulator** is a toolbar in Roblox Studio that previews how your experience looks and behaves on a device you don't have in front of you. It simulates a device's screen dimensions, pixel density, on-screen keyboard, and platform. The controls sit in a toolbar above the 3D viewport rather than in a separate panel, so you can reach them while you're playtesting.

<Alert severity="warning">

Device Simulator is in [beta](https://devforum.roblox.com/t/studio-beta-new-device-simulator-toolbar-and-network-simulator/4861695), and its functionality might change. To enable it, open **File** and select **Beta Features**, then enable **New Device Simulator** and restart Studio.

</Alert>

## Open Device Simulator

The toolbar appears above the 3D viewport whenever a place is open. It stays available in both edit and play modes, so you can change the simulated device in the middle of a playtest without stopping, switching, and restarting.

## Simulate a device

The left side of the toolbar holds one button per device category, followed by a chip naming the active device.

<img src="../assets/studio/device-simulator/device-simulator-toolbar.png" width="760" alt="Device Simulator toolbar showing an iPhone selected above the Studio viewport." />

<table>
<thead>
	<tr>
		<th>Category</th>
		<th>What it simulates</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Phone</strong></td>
		<td>Phones and tablets, including touch input and the on-screen keyboard.</td>
	</tr>
	<tr>
		<td><strong>Desktop</strong></td>
		<td>Desktop and laptop resolutions.</td>
	</tr>
	<tr>
		<td><strong>Console</strong></td>
		<td>Console output resolutions and gamepad-first input.</td>
	</tr>
	<tr>
		<td><strong>Headset</strong></td>
		<td>VR headsets.</td>
	</tr>
</tbody>
</table>

Clicking a category switches to that category's default device. A category is disabled when no device in it is available to simulate. Clicking the device chip opens the device menu, where devices are grouped to make the trade-off you're testing explicit:

- **Phone**: **Flagship**, **Mid-range**, and **Entry level**, so you can walk a layout down the performance ladder.
- **Desktop**, **Console**, and **Headset**: one group of built-in devices per category.
- **Custom**: devices you created yourself, in every category.
- **Current device**: no simulation. Your own monitor and input, listed under **Desktop**.

The last row of the menu, **Manage devices**, opens the Device Manager.

### Device controls

The right side of the toolbar holds actions that apply to the simulated device. Which ones appear depends on what you're simulating.

<table>
<thead>
	<tr>
		<th>Control</th>
		<th>Available for</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Rotate</strong></td>
		<td>Phones and tablets</td>
		<td>Rotates the simulated device to the next orientation.</td>
	</tr>
	<tr>
		<td><strong>Mock Android back button</strong></td>
		<td>Android devices</td>
		<td>Sends a back button press. Enabled while the client view is active.</td>
	</tr>
	<tr>
		<td><strong>Touch controls</strong></td>
		<td>Phones and tablets</td>
		<td>Lists the keyboard and mouse shortcuts that stand in for multi-touch gestures while playtesting.</td>
	</tr>
	<tr>
		<td><strong>Virtual controller</strong></td>
		<td>All devices</td>
		<td>Toggles <a href="./controller-emulator.md">Controller Emulator</a>, which emulates gamepads, VR controllers, and TV remotes.</td>
	</tr>
	<tr>
		<td><strong>Display scaling</strong></td>
		<td>While simulating a device</td>
		<td>Chooses how the simulated screen is mapped onto your monitor.</td>
	</tr>
</tbody>
</table>

### Simulate touch input

A mouse has one contact point, so gestures that need two are mapped onto modifier keys. Open **Touch controls** to see the shortcuts for your platform:

- **Pinch + rotate**: Alt + drag
- **Two-finger pan**: Alt + Shift + drag

## Display scaling

A simulated 1080-pixel-tall phone screen and your 1080-pixel-tall monitor have the same pixel count but very different physical sizes, so a UI element that's comfortable on one can be unreadable on the other. The **Display scaling** menu chooses which of those properties the viewport preserves:

<img src="../assets/studio/device-simulator/device-simulator-display-scaling.png" width="480" alt="Display scaling menu with physical size, actual resolution, fit to window, calibration, and auto-detection options." />

<table>
<thead>
	<tr>
		<th>Mode</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Physical size</strong></td>
		<td>Matches the simulated screen's real-world size, so on-screen elements are as large as they would be in a player's hand.</td>
	</tr>
	<tr>
		<td><strong>Actual resolution</strong></td>
		<td>Maps one simulated pixel to one of your monitor's pixels.</td>
	</tr>
	<tr>
		<td><strong>Fit to window</strong></td>
		<td>Scales the simulated screen to fill the available viewport.</td>
	</tr>
</tbody>
</table>

**Physical size** only holds if Studio knows how large your own monitor is, which it can't read directly. Two menu items supply that number:

- **Auto-detect scaling** matches the pixel density and scaling factor your operating system reports for your display. Turning it off falls back to your saved manual calibration. This item only appears in **Physical size** mode, because it has no effect in the other two.
- **Calibrate physical scaling** measures your display by hand. Drag the slider until the image on screen matches the width of a student ID or library card. Calibrating turns auto-detect off and switches to **Physical size**.

Both values persist across sessions, so calibrating once is enough.

## Manage devices

**Manage devices** in the device menu opens the Device Manager, with one tab per category: **Mobile**, **Desktop**, **Console**, and **Headset**. It opens on the tab matching the device you're simulating.

<img src="../assets/studio/device-simulator/device-manager.png" width="760" alt="Device Manager showing device categories, standard and custom devices, and custom device configuration fields." />

### Show and hide standard devices

The **Standard** list holds Roblox's built-in devices. Use **Add devices** to choose which of them appear in the toolbar's device menu, and hide the rest to keep the menu down to the devices you actually test against. Hiding a device doesn't delete it, so you can re-add it at any time. Custom devices always stay visible, as does the device you're currently simulating.

<img src="../assets/studio/device-simulator/device-manager-add-devices.png" width="480" alt="Add devices dialog with checkboxes that control which devices appear in the Standard list." />

### Create custom devices

Add a custom device to model hardware Roblox doesn't ship a profile for, or to isolate a single property, such as the same phone with half the memory. **Duplicate** copies a standard device as a starting point.

<table>
<thead>
	<tr>
		<th>Field</th>
		<th>Description</th>
		<th>Accepted values</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Name</strong></td>
		<td>The name shown in the device menu.</td>
		<td>Required, unique, 200 characters or fewer.</td>
	</tr>
	<tr>
		<td><strong>Platform</strong></td>
		<td>The platform the experience reports at runtime.</td>
		<td>Platform of the simulated device.</td>
	</tr>
	<tr>
		<td><strong>Dimensions</strong></td>
		<td>Screen width and height in pixels.</td>
		<td>Width 1 to 7680, height 1 to 4320.</td>
	</tr>
	<tr>
		<td><strong>Pixel density</strong></td>
		<td>Pixels per inch, which drives physical-size scaling.</td>
		<td>72 to 10,000.</td>
	</tr>
	<tr>
		<td><strong>Keyboard height</strong></td>
		<td>How much of the screen the on-screen keyboard covers, per orientation.</td>
		<td>Portrait and landscape, 0 to 4320.</td>
	</tr>
</tbody>
</table>

## Simulate controller input

Simulating a device tells you how your experience looks on that hardware. It doesn't put a matching controller in your hands. [Controller Emulator](./controller-emulator.md) pairs with Device Simulator to emulate the gamepads, VR controllers, handhelds, and TV remotes that hardware ships with, so you can test input without owning any of it. Selecting a console, headset, handheld, or Android TV device here switches Controller Emulator to that device's matching controller automatically.

## Simulate network conditions

Simulating a device tells you how your experience looks on that hardware. It doesn't tell you how it feels on that hardware's connection. [Network Simulator](./network-simulator.md) is in the same toolbar and shapes traffic during a playtest, so you can test against high latency, jitter, and packet loss without a second device or a throttled router.

## Example workflows

- **Check a layout across form factors.** Click phone, then tablet, then console, and watch the viewport rescale to each. Safe area, overflow, and anchoring problems surface immediately.
- **Test the bottom of the performance range.** Simulate an **Entry level** phone rather than a **Flagship**, and confirm your UI still reads at that pixel density and your experience still fits in that memory budget.
- **Validate touch UX.** Simulate a touch device and use the touch shortcuts to confirm your inputs land where you expect.
- **Check the on-screen keyboard.** Simulate a phone, focus a text field, and confirm the keyboard doesn't cover the controls the player needs while typing.
- **Verify physical sizing.** Calibrate physical scaling once, then compare a phone against a tablet in **Physical size** mode to see whether your tap targets and text are large enough on the smaller screen.
