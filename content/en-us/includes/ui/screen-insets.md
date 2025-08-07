---
title: include
---

Modern phones take advantage of the entire screen but typically include notches, cutouts, and other elements that occupy screen space. Every Roblox experience also includes the **top bar controls** for quick access to the main menu, [chat](../../chat/in-experience-text-chat.md), [leaderboard](../../players/leaderboards.md), and more.

<img src="../../assets/engine-api/enums/ScreenInsets/Top-Bar-Cutout.png" width="840" alt="Mobile device showing Roblox top bar buttons and device cutout." />

To ensure players can see and access all UI easily and without obstruction, Roblox provides the `Class.ScreenGui.ScreenInsets|ScreenInsets` property which controls the **safe area** insets for the contents of a `Class.ScreenGui`.

<Tabs>
<TabItem label="CoreUISafeInsets">
The default of `Enum.ScreenInsets|CoreUISafeInsets` keeps all descendant `Class.GuiObject|GuiObjects` inside the core UI safe area, clear of the top bar buttons and other screen cutouts. This setting is recommended if the `Class.ScreenGui` contains interactive UI elements.

<img src="../../assets/engine-api/enums/ScreenInsets/CoreUISafeInsets.png" width="840" height="403" alt="Mobile device showing the core UI safe area." />
</TabItem>
<TabItem label="DeviceSafeInsets">
A setting of `Enum.ScreenInsets|DeviceSafeInsets` guarantees that no descendant `Class.GuiObject|GuiObjects` are occluded by any device screen cutouts such as the camera notch, although no inset is added for Roblox core UI elements like the top bar buttons.

<img src="../../assets/engine-api/enums/ScreenInsets/DeviceSafeInsets.png" width="840" height="403" alt="Mobile device showing the device safe area." />
</TabItem>
<TabItem label="TopbarSafeInsets">
A setting of `Enum.ScreenInsets|TopbarSafeInsets` keeps all descendant `Class.GuiObject|GuiObjects` between the top bar controls and the right edge of the device safe area. The `Class.ScreenGui` will then automatically flex in horizontal size based on the top bar's content.

<img src="../../assets/engine-api/enums/ScreenInsets/TopbarSafeInsets.png" width="840" height="403" alt="Mobile device showing the top bar safe area within the Roblox controls." />
</TabItem>
<TabItem label="None">
No insets are added to the fullscreen area. This mode may result in UI that is obscured or completely hidden by device notches and cutouts, so you should only use it for a `Class.ScreenGui` that contains non‑interactive content like background images.

<img src="../../assets/engine-api/enums/ScreenInsets/None.png" width="840" height="403" alt="Mobile device showing the entire screen region with no account for safe areas." />
</TabItem>
</Tabs>
