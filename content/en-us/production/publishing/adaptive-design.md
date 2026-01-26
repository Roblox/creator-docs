---
title: Adaptive design guidelines
description: Guidelines to help you deliver best-in-class experiences that intelligently adapt to any device and input type to reach a wide audience.
---

Adaptive design ensures your Roblox experiences look and feel great across various screen sizes, orientation, and input types. Moving beyond traditional device categories like mobile, desktop, and console, today's devices have far more dynamic capabilities, allowing for seamless transition between different inputs and displays. Imagine a tablet that supports multiple orientations (landscape and portrait), multiple input types (touch, gamepad, mouse and keyboard), and multiple display sizes (native display, and extending to a large TV).

These guidelines will help you deliver best-in-class experiences that intelligently adapt to any device and input type to reach a wide audience. For more details on workflows and APIs to assist with implementing these guidelines, see the [cross‑platform development](../../projects/cross-platform.md) guide.

<Alert severity="info">
To explore a pre-made experience that showcases the following adaptive design concepts, check out the [Interactivity Showcase](https://www.roblox.com/games/132115384567250/).
</Alert>

## Core principles

Every experience is unique, but following a few key principles will help you deliver an intuitive and polished experience to every player, on every device.

1. [Input fluidity](#input-fluidity) — Make sure your UI works with various input types like gamepad, touch, keyboard, and VR controllers. This includes changing your UI layout and providing assistive hints depending on the input type.
2. [Responsive layout](#responsive-layout) — Design UI layouts that automatically adjust to different screen sizes and orientations.
3. [Dynamic sizing](#dynamic-sizing) — Scale UI elements as needed to fit various screen dimensions.
4. [Legibility and visual clarity](#legibility--visual-clarity) — Make all UI components, including text and buttons, easily readable and visually clear.

### Input fluidity

Ensure your experience feels natural on various input devices, including gamepads, mouse/keyboard, touch, and VR.

- **Design controls and shortcuts for multiple inputs** — Make sure every action in your experience can be triggered using gamepad buttons/D‑pad, keyboard shortcuts, and touch. Controls should be visually and functionally focusable for directional pad or stick navigation. Test each input mode so that core gameplay, menus, and UI are accessible and natural, regardless of device.
- **Provide visual feedback by input type** — Update UI labels, prompts, and tooltips to reflect the active input method, for example showing <kbd>Press A</kbd> on a gamepad, <kbd>Pinch</kbd> on touch, or <kbd>Shift</kbd><kbd>A</kbd> on keyboard. Use icons and language familiar to each platform's players.

<Tabs>
<TabItem label="Mouse/Keyboard">
<img src="../../assets/publishing/cross-platform/Inventory-Selection-Keyboard.jpg" width="840" height="473" />
</TabItem>
<TabItem label="Touch">
<img src="../../assets/publishing/cross-platform/Inventory-Selection-Touch.jpg" width="840" height="473" />
</TabItem>
<TabItem label="Gamepad">
<img src="../../assets/publishing/cross-platform/Inventory-Selection-Gamepad.jpg" width="840" height="473" />
</TabItem>
</Tabs>

### Responsive layout

The layout of your experience UI should adapt to different screen sizes and orientation. On a big computer monitor, you have lots of space to show buttons all at once. On a small phone screen, however, all those buttons would look cramped and messy.

- **Adapt layouts to screen size and orientation** — Use responsive patterns so your UI rearranges or condenses appropriately. For example, move less‑important buttons into a collapsible menu ("hamburger"/menu button) on small screens, while showing them in full on desktops. Your experience UI should adapt gracefully to both landscape and portrait orientation if it supports them.
- **Implement layout components that react to parent size** — Build UI panels and widgets that adjust size or position based on their parent container. For example, use split‑view layouts where side panels collapse on narrow screens but expand on wider ones.

<Tabs>
<TabItem label="Medium / Landscape">
<img src="../../assets/publishing/cross-platform/Responsive-Layout-Landscape.jpg" width="766" height="473" />
</TabItem>
<TabItem label="Small / Portrait">
<img src="../../assets/publishing/cross-platform/Responsive-Layout-Portrait.jpg" width="266" height="473" />
</TabItem>
</Tabs>

### Dynamic sizing

This is about the **size** of your UI elements, not just their position. Your UI should scale up or down with the screen so everything stays the right size and is always easy to interact with.

- **Support content-driven sizing and automatic wrapping** — Implement auto‑sizing behaviors: let text boxes grow or shrink with content, and support automatic line wrapping so labels don't overflow or become unreadable as screen size changes.
- **Expose and respect accessibility / user preferences** — Allow your UI to respond to user‑specified text or UI scaling settings, tying those settings directly to UI element sizing so increased [accessibility preferences](../../production/publishing/accessibility.md#player-preferences) always translate to larger, more readable UI.

<Tabs>
<TabItem label="Large">
<img src="../../assets/publishing/cross-platform/Dynamic-Sizing-Large.jpg" width="840" height="473" />
</TabItem>
<TabItem label="Medium">
<img src="../../assets/publishing/cross-platform/Dynamic-Sizing-Medium.jpg" width="766" height="473" />
</TabItem>
<TabItem label="Small">
<img src="../../assets/publishing/cross-platform/Dynamic-Sizing-Small.jpg" width="638" height="473" />
</TabItem>
</Tabs>

### Legibility & visual clarity

Can players actually read your text on a small phone screen or a larger TV that is far away from them? Are your buttons easy to see against the background of your 3D world?

- **Choose font sizes and styles for small screens** — Always select font sizes that are readable on mobile devices, not just desktop. Test on actual devices, and verify text is legible at the smallest expected size. Avoid excessively decorative or thin fonts.
- **Ensure high contrast and clear visual hierarchy** — Use colors for text and backgrounds that provide enough contrast to be readable in varying in‑game lighting conditions. Employ strong visual hierarchy and make key actions and labels stand out through size, color, or placement.

## Final thoughts

Adaptivity is about meeting players where they are, whether in their hands, on their desk, or on the big screen. Roblox creators who build with these guidelines deliver meaningful, accessible, and fun cross‑platform experiences. Start adapting today and let your creations thrive!
