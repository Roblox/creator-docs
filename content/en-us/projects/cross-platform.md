---
title: Cross-platform development
description: Consolidated overview of cross-platform recommendations to help you design a Roblox experience that's accessible and enjoyable on all platforms.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

Roblox is inherently **cross‑platform**, as players can discover and join experiences on their phone or tablet, then later continue where they left off on their PC or console. To support an expanding suite of platforms, you should build user interfaces that seamlessly adapt to the input type (touch, gamepad, mouse/keyboard), screen size, and device orientation. This guide, the [adaptive design](../production/publishing/adaptive-design.md) guide, and the linked resources can help you design a true cross‑platform experience that's compatible, accessible, and enjoyable on **all** platforms.

<Alert severity="info">
To explore a pre-made experience that showcases the following cross‑platform design concepts, check out the [Interactivity Showcase](https://www.roblox.com/games/132115384567250/).
</Alert>

## Input

A carefully designed experience should support all primary input types, including mouse and keyboard, touch, and gamepads.

### Cross-platform actions

<Alert severity="success">
Support all primary input types (mouse/keyboard, touch, and gamepads) using the [Input Action System](../input/input-action-system.md).
</Alert>

To simplify cross‑platform inputs, Roblox provides the [Input Action System](../input/input-action-system.md) to define **actions** such as "jump," "sprint," or "shoot" and set up **bindings** for multiple hardware inputs to drive those actions. You do not need to think about all the technical aspects of hardware inputs and when to listen for specific input triggers; you simply define which inputs perform which actions.

<img src="../assets/publishing/cross-platform/Input-Actions-Jump.png" />

### Input type detection

<Alert severity="success">
Ensure that UI elements respond and adapt to the player's **primary** input type as detailed in [input type detection](../input/index.md#input-type-detection). Also consider [assistive hints](#assistive-hints) to help players understand specific input changes.
</Alert>

In cross-platform development, it's important that you determine and respond to the primary input type a player is using, normally to ensure that [UI elements](../ui/index.md#ui-objects) like on‑screen buttons and menus work elegantly and support interaction across devices.

For example, a touch‑enabled device assumes touch is the **default** input and that touch buttons may appear for actions, but a player may choose to connect a bluetooth gamepad. In this case, touch remains a valid input, but you can assume the player wants to switch to the connected gamepad as the **primary** input type and possibly use touch as a backup input for on‑screen UI.

### Assistive hints

Based on the [primary input type](#input-type-detection), it's recommended that you include **assistive UI hints** whenever possible. For example, when selecting tools to equip, display input‑specific hints such as <kbd>1</kbd>–<kbd>5</kbd> when the player is using a keyboard, or gamepad trigger hints when the player is using a gamepad.

<Tabs>
<TabItem label="Keyboard Input">
<img src="../assets/publishing/cross-platform/Inventory-Selection-Keyboard.jpg" width="840" height="473" />
</TabItem>
<TabItem label="Gamepad Input">
<img src="../assets/publishing/cross-platform/Inventory-Selection-Gamepad.jpg" width="840" height="473" />
</TabItem>
</Tabs>

The `Class.UserInputService:GetImageForKeyCode()|GetImageForKeyCode()` and `Class.UserInputService:GetStringForKeyCode()|GetStringForKeyCode()` methods are helpful in gathering a platform‑specific image or string to use in a UI hint, such as the following examples:

<table>
	<thead>
		<tr>
			<th>Key Code</th>
			<th>Xbox Image</th>
			<th>PlayStation Image</th>
			<th>String</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`Enum.KeyCode.ButtonA`</td>
			<td><img src="../assets/publishing/cross-platform/ButtonA-Xbox.png" width="24" style={{marginBottom: 0, paddingBottom: 0}} /></td>
			<td><img src="../assets/publishing/cross-platform/ButtonA-PS.png" width="24" style={{marginBottom: 0}} /></td>
			<td>`ButtonA`</td>
		</tr>
		<tr>
			<td>`Enum.KeyCode.ButtonX`</td>
			<td><img src="../assets/publishing/cross-platform/ButtonX-Xbox.png" width="24" style={{marginBottom: 0}} /></td>
			<td><img src="../assets/publishing/cross-platform/ButtonX-PS.png" width="24" style={{marginBottom: 0}} /></td>
			<td>`ButtonX`</td>
		</tr>
		<tr>
			<td>`Enum.KeyCode.One`</td>
			<td>n/a</td>
			<td>n/a</td>
			<td>`1`</td>
		</tr>
		<tr>
			<td>`Enum.KeyCode.Five`</td>
			<td>n/a</td>
			<td>n/a</td>
			<td>`5`</td>
		</tr>
	</tbody>
</table>

## User interface

A well-designed user interface is essential for players on all platforms to interact with your experience.

### Position and size

<Alert severity="success" style={{marginBottom: 8}}>
Ensure that all UI elements are visible on all screen sizes and orientations.
</Alert>

<Alert severity="success">
Ensure that all buttons/controls are interactable and that they are not blocked or obscured by [device cutouts or Roblox UI elements](../ui/position-and-size.md#cross-platform-factors).
</Alert>

All UI elements should be [positioned](../ui/position-and-size.md#position) and [sized](../ui/position-and-size.md#size) appropriately to ensure visibility and interactivity across multiple screen sizes. Positioning UI elements by `Datatype.UDim.Scale|Scale` is a common approach since it's based on a **percentage** of the screen's **X** and **Y** bounds, not a pixel value (pixels can vary arbitrarily by both number and density across devices). You can also utilize the element's `Class.GuiObject.AnchorPoint|AnchorPoint` to set its positional origin. For example, the UI container holding the gem/coin counters in the following image is positioned at an **X** scale of `1` (right) and **Y** scale of `0` (top) with an upper‑right anchor point.

<img src="../assets/publishing/cross-platform/Position-Scale.jpg" width="840" />

`Datatype.UDim.Scale|Scale` is also recommended for **sizing** UI elements, such as making a UI container span 75% width on every screen. However, 75% would render to a huge size on 4K&nbsp;TVs for console players, so it's recommended that you explore [screen size adaptation](#screen-size-adaptation) as a way to adapt UI layouts across different viewports.

### Screen size adaptation

<Alert severity="success">
Adapt UI to various display sizes by checking and listening for changes to the viewport display size.
</Alert>

With a multitude of possible screen sizes accessible to the Roblox platform, attempting to predict screen size by pixels often leads to misinterpretation. To assist in determining a player's screen size to adapt the size/position of UI elements, Roblox provides the read‑only `Class.GuiService.ViewportDisplaySize|ViewportDisplaySize` property which represents the internally‑categorized rendering size of the viewport.

<table>
	<thead>
		<tr>
			<th>`Class.GuiService.ViewportDisplaySize|ViewportDisplaySize`</th>
			<th>Summary</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>`Enum.DisplaySize.Small|Small`</td>
			<td>Most tablet/mobile/handheld devices</td>
		</tr>
		<tr>
			<td>`Enum.DisplaySize.Medium|Medium`</td>
			<td>Most laptops and monitors</td>
		</tr>
		<tr>
			<td>`Enum.DisplaySize.Large|Large`</td>
			<td>Most TVs or larger</td>
		</tr>
	</tbody>
</table>

For more native customization, you can use the UI [Style Editor](../ui/styling/editor.md) to configure [themes](../ui/styling/editor.md#style-themes) for the various `Class.GuiService.ViewportDisplaySize|ViewportDisplaySize` values, including tokens for text sizes, container sizes, and any other sizing/measurement tokens to suit your needs.

<img src="../assets/publishing/cross-platform/Screen-Size-Themes.png" width="840" />

### Layout containers

<Alert severity="success">
Use layouts to organize individual UI components and ensure that containers adjust responsively to the children elements within them.
</Alert>

For easier UI organization, you should use **layout components** to organize children. When using layout [containers](../ui/frames.md), make sure that the children are legible, [accessible](#accessibility), and non‑cluttered. A common layout component is `Class.UIListLayout`, which positions sibling `Class.GuiObject|GuiObjects` into rows or columns and adjusts accordingly whenever you add or remove a sibling object.

You should also consider the distribution and relative positioning of elements within layout containers for the best user experience. Integrating [flex](../ui/list-flex-layouts.md#flex-layouts) into a list layout is a powerful way to [equally fill/distribute](../ui/list-flex-layouts.md#equal-fill-or-distribution) or [align/stretch](../ui/list-flex-layouts.md#alignment) items across their line, or [flex specific items](../ui/list-flex-layouts.md#flex-individual-items) across a variable space.

<img src="../assets/engine-api/classes/UIListLayout/FillDirection.png" width="720" alt="UIListLayouts illustrating FillDirection of either horizontal or vertical." />

### Accessibility

<Alert severity="success">
Ensure that all text is legible on all screens. Also make sure all UI has [sufficient contrast](../production/publishing/accessibility.md#color-contrast) and that [nothing relies solely on color](../production/publishing/accessibility.md#color-non-reliance) to distinguish an action or outcome.
</Alert>

Even with UI elements [properly sized](#position-and-size) across all device screen sizes, the overall experience should meet [accessibility standards](../production/publishing/accessibility.md) for players with impaired vision or color blindness. Text size can factor heavily into the legibility of text‑based UI, so you should include a [text size constraint](../ui/size-modifiers.md#text-size) to ensure text doesn't become illegible (too&nbsp;small) or visually too large on larger screens like 4K&nbsp;TVs.

For more tips on accessibility, see [here](../production/publishing/accessibility.md).

## Final tips & tricks

As you work toward a full cross‑platform experience, consider the following tips and tricks:

- Device emulation is essential to designing an optimal experience on Roblox. Utilize the built‑in [Device Emulator](../studio/testing-modes.md#device-emulation) and [Controller Emulator](../studio/testing-modes.md#controller-emulation) to emulate various devices and gamepads directly in Studio.
- Roblox's [UI styling](../ui/styling/index.md) pipeline, similar to CSS, lets you declare and globally apply overrides to UI instance properties. Along with the integrated [Style Editor](../ui/styling/editor.md), you can set up a complete and easy‑to‑modify user interface.
- Once your experience is effectively cross-platform, explore native features like haptic feedback on [mobile](../input/mobile.md#haptic-feedback) and [gamepads](../input/gamepad.md#haptic-feedback), touch gestures such as `Class.UserInputService.TouchSwipe|TouchSwipe` and `Class.UserInputService.TouchPinch|TouchPinch`, or accelerometer and gyroscope functionality on `Class.UserInputService.AccelerometerEnabled|AccelerometerEnabled` and `Class.UserInputService.GyroscopeEnabled|GyroscopeEnabled` devices.
