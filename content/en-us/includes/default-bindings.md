---
title: include
---

Roblox provides default input bindings for movement, camera control, and basic environment interaction&nbsp;— Roblox players are familiar with these controls, so you should only override them in specific cases. Also note that the **reserved** inputs cannot be overridden and will always operate with their intended purpose.

<Tabs>
<TabItem label="Roblox Reserved">
<table>
<thead>
	<tr>
		<th>Action</th>
		<th width="23%">Mouse/Keyboard</th>
		<th width="23%">Gamepad</th>
		<th width="23%">Touch</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Open Roblox menu</td>
		<td><kbd>Esc</kbd></td>
		<td><kbd>Start</kbd> button (`Enum.KeyCode|ButtonStart`)</td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>[Developer Console](../studio/developer-console.md)</td>
		<td><kbd>F9</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Fullscreen mode (Windows)<br />Show desktop (Mac)</td>
		<td><kbd>F11</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Record video (Windows)</td>
		<td><kbd>F12</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Take screenshot</td>
		<td><kbd>PrintScreen</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Character">
<table>
<thead>
	<tr>
		<th>Action</th>
		<th width="23%">Mouse/Keyboard</th>
		<th width="23%">Gamepad</th>
		<th width="23%">Touch</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Move forward</td>
		<td><kbd>W</kbd> <kbd>↑</kbd></td>
		<td>Press up on primary thumbstick</td>
		<td>Press up on virtual thumbstick</td>
	</tr>
	<tr>
		<td>Move backward</td>
		<td><kbd>S</kbd> <kbd>↓</kbd></td>
		<td>Press down on primary thumbstick</td>
		<td>Press down on virtual thumbstick</td>
	</tr>
	<tr>
		<td>Move left</td>
		<td><kbd>A</kbd></td>
		<td>Press left on primary thumbstick</td>
		<td>Press left on virtual thumbstick</td>
	</tr>
	<tr>
		<td>Move right</td>
		<td><kbd>D</kbd></td>
		<td>Press right on primary thumbstick</td>
		<td>Press right on virtual thumbstick</td>
	</tr>
	<tr>
		<td>Jump</td>
		<td><kbd>Space</kbd></td>
		<td><img src="../assets/publishing/cross-platform/ButtonA-Xbox.png" width="20" />&nbsp;<img src="../assets/publishing/cross-platform/ButtonA-PS.png" width="20" /></td>
		<td>Tap virtual jump button</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Interface / Inventory">
<Alert severity="info">
The following action inputs are reserved unless you [disable the respective feature](../players/disable-ui.md).
</Alert>
<table>
<thead>
	<tr>
		<th>Action</th>
		<th width="23%">Mouse/Keyboard</th>
		<th width="23%">Gamepad</th>
		<th width="23%">Touch</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Open text chat</td>
		<td><kbd>/</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Show/hide players list</td>
		<td><kbd>Tab</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Toggle backpack</td>
		<td><kbd>`</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Equip/unequip tools</td>
		<td><kbd>0</kbd>-<kbd>9</kbd></td>
		<td>Swap between tools using front‑left and front‑right triggers (`Enum.KeyCode.ButtonL1|ButtonL1` and `Enum.KeyCode.ButtonR1|ButtonR1`)</td>
		<td>Tap on-screen tool icons</td>
	</tr>
	<tr>
		<td>Use equipped tool</td>
		<td>Click left mouse button</td>
		<td>Back‑right trigger (`Enum.KeyCode.ButtonR2|ButtonR2`)</td>
		<td>Tap on screen</td>
	</tr>
	<tr>
		<td>Drop equipped tool</td>
		<td><kbd>Backspace</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Toggle **UI selection** mode&sup1;</td>
		<td><kbd>&#92;</kbd></td>
		<td><kbd>Select</kbd> button (`Enum.KeyCode.ButtonSelect|ButtonSelect`)</td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Navigate among interactive UI elements while in **UI&nbsp;selection** mode</td>
		<td><kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd><br /><kbd>W</kbd> <kbd>S</kbd> <kbd>A</kbd> <kbd>D</kbd></td>
		<td>Primary thumbstick (`Enum.KeyCode.Thumbstick1|Thumbstick1`) or D‑pad (`Enum.KeyCode.DPadUp|DPadUp`; `Enum.KeyCode.DPadDown|DPadDown`; `Enum.KeyCode.DPadLeft|DPadLeft`; `Enum.KeyCode.DPadRight|DPadRight`)</td>
		<td></td>
	</tr>
	<tr>
		<td>Activate an interactive UI element while in **UI&nbsp;selection** mode</td>
		<td><kbd>Enter</kbd></td>
		<td>Back‑right trigger (`Enum.KeyCode.ButtonR2|ButtonR2`)</td>
		<td></td>
	</tr>
	<tr>
		<td>Scroll up/down/left/right in selected `Class.ScrollingFrame` while in **UI&nbsp;selection** mode</td>
		<td><kbd>PageUp</kbd><br /><kbd>PageDown</kbd><br /><kbd>Home</kbd><br /><kbd>End</kbd></td>
		<td>Secondary thumbstick (`Enum.KeyCode.Thumbstick2|Thumbstick2`)</td>
		<td></td>
	</tr>
</tbody>
</table>

<figcaption>&sup1; If `Class.GuiService.GuiNavigationEnabled|GuiNavigationEnabled` is enabled (default)</figcaption>

</TabItem>
<TabItem label="Camera">
<table>
<thead>
	<tr>
		<th>Action</th>
		<th width="23%">Mouse/Keyboard</th>
		<th width="23%">Gamepad</th>
		<th width="23%">Touch</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Move camera view around</td>
		<td>While holding right mouse button</td>
		<td>Move secondary thumbstick</td>
		<td>Touch-drag around screen</td>
	</tr>
	<tr>
		<td>Zoom camera in/out</td>
		<td>Mouse scroll wheel<br /><kbd>I</kbd>/<kbd>O</kbd></td>
		<td>Press secondary thumbstick</td>
		<td>Pinch in/out on screen</td>
	</tr>
	<tr>
		<td>Rotate camera left or right</td>
		<td><kbd>←</kbd> <kbd>→</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
	<tr>
		<td>Toggle mouse lock&sup2;</td>
		<td><kbd>Shift</kbd></td>
		<td><Typography color="disabled">N/A</Typography></td>
		<td><Typography color="disabled">N/A</Typography></td>
	</tr>
</tbody>
</table>

<figcaption>&sup2; If `Class.StarterPlayer.EnableMouseLockOption|EnableMouseLockOption` is enabled (default)</figcaption>

</TabItem>
</Tabs>
