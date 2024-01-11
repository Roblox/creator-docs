---
title: Customizing Studio
description: Explore the customization options for Roblox Studio.
---

## Studio Settings

Many customization options are accessible via **File** &rarr; **Studio Settings** (<kbd>Alt</kbd><kbd>S</kbd> on Windows; <kbd>⌥</kbd><kbd>S</kbd> on Mac). You can quickly locate known settings by typing search queries into the search field at the top of the window.

<img src="../assets/studio/general/Studio-Settings-Layout.png" width="750" alt="Settings window with upper-left search field and sections menu indicated." />

### Language

Studio defaults to **English** as the system language but allows you to change it to another supported language. To change the language, search for the **Language** option and select the language of your choice. Restart Studio to reflect the change.

### Visual Theme

Studio features both a **light theme** and **dark theme**. If your operating system supports light and dark modes, the default option mirrors your system mode.

To explicitly change themes, search for the **Theme** option and select either **Default**, **Light**, or **Dark**.

### Script Editor

The built-in [script editor](../studio/script-editor.md) has multiple configuration options. To access them, select the **Script&nbsp;Editor** tab on the left side of the settings window.

Commonly modified options include:

<table>
<thead>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Font**</td>
    <td>Font face and size for code in the editor.</td>
  </tr>
  <tr>
    <td>**Tab Width**</td>
    <td>Number of spaces representing a <kbd>Tab</kbd> indent.</td>
  </tr>
  <tr>
    <td>**Indent Using Spaces**</td>
    <td>If enabled, spaces equal to **Tab&nbsp;Width** are inserted with <kbd>Tab</kbd> press.</td>
  </tr>
  <tr>
    <td>**Text Wrapping**</td>
    <td>If enabled, longer lines of code wrap to the next line.</td>
  </tr>
  <tr>
    <td>**Script Editor Color Preset**</td>
    <td>Color preset for code elements, selection colors, and more. After choosing a preset, you can set specific colors for options like **Selection Color** and **Comment Color**.</td>
  </tr>
</tbody>
</table>

## Window Layout

### Repositioning Windows

You can reposition any window by click-dragging its **header bar** into the bounds of another window. When you do so, a floating **position selector** appears in the target window.

<img src="../assets/studio/general/Docking-Position-Selector.jpg" width="800" alt="Position selector widget shown in center of 3D viewport." />

Moving your mouse pointer over one of the selector's **icons** shows a preview of where the dragged window will move in context to the target region. For example, the "upper&nbsp;half" icon makes the dragged window occupy the upper half of the target region, while the "right&nbsp;column" icon makes the dragged window dock to the right side of the target region.

<Tabs>
  <TabItem label="Upper Half">
	<img src="../assets/studio/general/Docking-Reposition-Window-Upper-Half.jpg" width="800" alt="Upper Half icon selected in selector widget." />
  </TabItem>
  <TabItem label="Right Column">
    <img src="../assets/studio/general/Docking-Reposition-Window-Right-Column.jpg" width="800" alt="Right Column icon selected in selector widget." />
  </TabItem>
</Tabs>

### Grouping Windows

If you choose the **center** icon of the [position selector](#repositioning-windows), the dragged window will **group** into the target region as a tab. This allows you to set up tab groups of commonly used windows.

<figure>
  <img src="../assets/studio/general/Docking-Grouped-Tabs.png" width="320" alt="Three windows grouped together as tabs." />
  <figcaption>Three windows grouped together as tabs</figcaption>
</figure>

### Floating Windows

To float a window freely of other windows, click the small dropdown arrow in the upper-right corner of its header bar and select **Float**. Alternatively, to re-dock a floating window to its original position, click the dropdown arrow and select **Dock**.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/general/Docking-Options-Float.png" width="369" alt="Small dropdown arrow in upper-right of window with Float selected." />
    <figcaption>Float a docked window</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/general/Docking-Options-Dock.png" width="386" alt="Small dropdown arrow in upper-right of window with Dock selected." />
    <figcaption>Re-dock a floating window</figcaption>
  </figure>
</GridContainer>

### Pinning Windows

To maximize screen space for the 3D viewport, you can **pin** windows (or&nbsp;an entire [group](#grouping-windows) of windows) as **vertical tabs** on the left or right side of the viewport. Once pinned, you can temporarily open any window by clicking its tab&nbsp;&mdash; this does not disturb other windows, and the expanded window will automatically collapse when you click in another window or click its tab again.

<figure>
  <img src="../assets/studio/general/Docking-Pinned-Tabs.jpg" width="800" alt="Three windows pinned to the right side of the viewport." />
  <figcaption>Three windows pinned to the right side of the viewport</figcaption>
</figure>

To pin a window or an entire [group](#grouping-windows) of windows, click the "pin" button. Alternatively, to un-pin a pinned window/group, open it and click the "expand" button.

<figure>
  <img src="../assets/studio/general/Docking-Options-Pin.png" width="320" alt="Pin button in upper-right corner of window." />
  <figcaption>Pin or un-pin a window/group</figcaption>
</figure>
