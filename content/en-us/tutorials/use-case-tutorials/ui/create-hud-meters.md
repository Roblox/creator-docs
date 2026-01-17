---
title: Create HUD meters
description: Learn how to build a custom HUD meter to replace the default character health meter.
---

A **HUD** or **Heads-Up Display** is a set of UI elements that are always visible or accessible during gameplay, such as score displays, health meters, and menu buttons. Including a HUD is essential for most experiences because it displays information that helps players to be successful in their gameplay objectives.

A common HUD element is a health meter with an icon on the left which can be adapted into a timer bar, progress bar, or similar.

<img src="../../../assets/tutorials/creating-hud-meters/Intro.png" width="840" alt="In-game view showing custom health meter in upper-right region." />

Using [Hazardous Space Station](https://www.roblox.com/games/99416825187098/Hazardous-Space-Station) as a starting place and [UI Fundamentals&nbsp;- HUD Meter](https://www.roblox.com/games/104506915856758/UI-Fundamentals-HUD-Meter) as a finished reference place, this tutorial demonstrates:

- Setup and use of the **Device Emulator** to test your design on multiple emulated screens.
- Usage of `Class.StarterGui` as both a design and storage container.
- How to position/size UI elements around built‑in Roblox controls and device notches/islands, such as the camera notch on modern phones.
- How to replace the default Roblox health meter with your own meter and hook it up to the character's health level.
- How to animate the center portion of the health meter and set its color between five color gradient keypoints (red, orange, yellow, lime, green).

## Enable the Device Emulator

Roblox is inherently [cross‑platform](../../../projects/cross-platform.md), as players can discover and join experiences on their phone or tablet, then later continue where they left off on their PC or console. Mobile devices (phones and tablets) have the least amount of screen space, so it's important that your UI elements fit on smaller screens and that they're clearly visible to players.

The best way to test UI designs across platforms is Studio's [Device Emulator](../../../studio/testing-modes.md#device-emulation). This tool provides a preset selection of devices and allows you to add your own custom presets.

1. Open the [Hazardous Space Station](https://www.roblox.com/games/99416825187098/Hazardous-Space-Station) template in Studio.

   <UseStudioButton variant="" buttonTextTranslationKey="Action.EditInStudio" placeId="99416825187098" universeId="6627378835" />

2. From Studio's **Test** menu, toggle on **Device Emulator**.
3. From the bar directly above the main viewport, select a phone emulation such as **iPhone&nbsp;X** or **Samsung&nbsp;Galaxy&nbsp;A51**. Then, set the view size to **Fit&nbsp;to&nbsp;Window** to utilize the maximum space in Studio.

   <img src="../../../assets/studio/general/Device-Emulator-Phone.png" width="800" alt="Device Emulator settings options indicated at top of viewport window." />

## Create a screen container

A `Class.ScreenGui` container holds UI objects (`Class.GuiObject|GuiObjects`) to display on a player's screen (in this tutorial, the entirety of the health meter). To display a `Class.ScreenGui` and its child objects to every player who joins the experience, place it inside the `Class.StarterGui` container. When a player joins and their character first spawns, the `Class.ScreenGui` and its contents clone into the `Class.PlayerGui` container for that player, located within the `Class.Players` container.

<img src="../../../assets/ui/ui-objects/StarterGui-To-PlayerGui.png" width="840" alt="Diagram of how a ScreenGui clones from StarterGui to a player's PlayerGui" />

To insert an empty `Class.ScreenGui`:

1. In the **Explorer** window, locate the `Class.StarterGui` container.

   <img src="../../../assets/studio/explorer/StarterGui.png" width="320" alt="Explorer window showing the StarterGui container." />

2. Hover over the container, click the &CirclePlus; button, and insert a `Class.ScreenGui`.

   <img src="../../../assets/studio/explorer/StarterGui-ScreenGui.png" width="320" alt="ScreenGui inserted into the StarterGui container." />

3. Rename the new container **HUDContainer** to reflect its purpose.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer.png" width="320" alt="ScreenGui renamed to HUDContainer." />

### Utilize safe areas

Modern phones take advantage of the entire screen but typically include notches, cutouts, and other elements that occupy screen space. Every Roblox experience also includes the **top bar controls** for quick access to the main menu, [chat](../../../chat/in-experience-text-chat.md), [leaderboard](../../../players/leaderboards.md), and more.

<img src="../../../assets/engine-api/enums/ScreenInsets/Top-Bar-Cutout.png" width="840" alt="Mobile device showing Roblox top bar buttons and device cutout." />

To ensure players can see and access all UI without obstruction, Roblox provides the `Class.ScreenGui.ScreenInsets|ScreenInsets` property which controls the **safe area** insets for the contents of a `Class.ScreenGui`. Every UI object that you position inside a `Class.ScreenGui` is relative to the inset bounds.

<img src="../../../assets/engine-api/enums/ScreenInsets/CoreUISafeInsets.png" width="840" alt="Mobile device showing the core UI safe area." />

While the default of `Enum.ScreenInsets|CoreUISafeInsets` ensures all UI objects remain clear of Roblox UI and device cutouts, `Enum.ScreenInsets|DeviceSafeInsets` can be a better option to utilize limited screen space, as illustrated below.

<Tabs>
<TabItem label="CoreUISafeInsets">
<Alert severity="error">
`Enum.ScreenInsets|CoreUISafeInsets` keeps the meter clear of all obstructions, but it adds a large gap between the meter and the physical top edge of the screen.
</Alert>
<img src="../../../assets/tutorials/creating-hud-meters/Meter-CoreUISafeInsets.png" width="840" height="403" alt="ScreenInsets set to CoreUISafeInsets." />
</TabItem>
<TabItem label="DeviceSafeInsets">
<Alert severity="success">
`Enum.ScreenInsets|DeviceSafeInsets` tucks the meter against the physical top edge of the screen, and the meter's right alignment keeps it clear of the Roblox UI.
</Alert>
<img src="../../../assets/tutorials/creating-hud-meters/Meter-DeviceSafeInsets.png" width="840" height="403" alt="ScreenInsets set to DeviceSafeInsets." />
</TabItem>
</Tabs>

1. In the **Explorer** window, select **HUDContainer**.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer.png" width="320" alt="Explorer window showing the HUDContainer selected." />

2. In the [Properties](../../../studio/properties.md) window, set the `Class.ScreenGui.ScreenInsets|ScreenInsets` property to `Enum.ScreenInsets|DeviceSafeInsets`.

   <img src="../../../assets/studio/properties/ScreenGui-ScreenInsets-DeviceSafeInsets.png" width="320" alt="ScreenInsets set to DeviceSafeInsets in the Properties window." />

### Set edge padding

With `Class.ScreenGui.ScreenInsets|ScreenInsets` set to `Enum.ScreenInsets|DeviceSafeInsets`, content can now extend directly up to the physical top edge of the screen. However, a small amount of **padding** can help push the health meter (and other objects inside the container) slightly away from the screen edges for a cleaner appearance and to prevent them from being clipped.

<img src="../../../assets/tutorials/creating-hud-meters/ScreenGui-With-Padding.png" width="840" alt="Screen container with padding around all edges." />

One way to apply padding to a UI container is through the insertion of a `Class.UIPadding` modifier:

1. Insert a `Class.UIPadding` modifier into **HUDContainer**.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-UIPadding.png" width="320" alt="HUDContainer with UIPadding modifier inserted." />

2. With the new `Class.UIPadding` object selected, enter a value of <Typography noWrap>`0, 16`</Typography> for all edges of the container (`Class.UIPadding.PaddingBottom|PaddingBottom`, `Class.UIPadding.PaddingLeft|PaddingLeft`, `Class.UIPadding.PaddingRight|PaddingRight`, `Class.UIPadding.PaddingTop|PaddingTop`). This applies padding of 16 pixels all around the container, regardless of the screen's resolution.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-UIPadding-Values.png" width="320" alt="Properties window showing the UIPadding modifier with 0, 16 set for all edges." />

## Construct the health meter

With the [screen container configured](#create-a-screen-container), you can begin constructing the health meter using Roblox UI objects such as [frames](../../../ui/frames.md) and an [image label](../../../ui/labels.md).

<img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Components.png" width="840" alt="Basic components used for the health meter." />

### Create the parent frame

Similar to design applications like Figma and Photoshop, a `Class.Frame` in Roblox serves as a container for other UI objects. For this tutorial, the entire health meter will be contained in a single parent frame, making it simple to reposition across various HUD layouts.

1. Insert a `Class.Frame` into **HUDContainer**. The new frame appears in the upper-left corner as an empty white square.

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame.png" width="840" alt="New frame in viewport." />

   <Alert severity="warning">
   If the new frame doesn't appear in the viewport, make sure you've toggled on **GUI&nbsp;overlay** from the [Visualization&nbsp;Options](../../../studio/ui-overview.md#visualization-options) widget in the upper‑right corner of the 3D viewport.
   </Alert>

2. Rename the new frame instance to **MeterBar**.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar.png" width="320" alt="New frame inserted and renamed to MeterBar." />

### Position the frame

In Roblox, the position of a UI object is represented by a `Datatype.UDim2` coordinate set containing `Datatype.UDim.Scale|Scale` and `Datatype.UDim.Offset|Offset` values for both the **X** and **Y** axes:

- `Datatype.UDim.Scale|Scale` values represent a **percentage** of the container's size along the corresponding axis, additive of any `Datatype.UDim.Offset|Offset` values.
- `Datatype.UDim.Offset|Offset` values represent how many **pixels** to shift the object on the corresponding axis, additive of any `Datatype.UDim.Scale|Scale` values.

<figure>
<img src="../../../assets/ui/misc/UDim2-Components.png" width="334" />
</figure>

<img src="../../../assets/ui/misc/Scale-Offset-Positioning.png" width="840" />

To position a UI object in the upper-right corner of the screen container, `Datatype.UDim.Scale|Scale` is the best approach because an **X** value of `1` (100%) represents the right edge of the container, regardless of the screen's physical pixel size. Similarly, a **Y** scale value of `0` (0%) represents the top edge of the container.

<img src="../../../assets/tutorials/creating-hud-meters/ScreenGui-Axis-Ranges.png" width="840" alt="Scale ranges for the X and Y axes of a container." />

Additionally, you'll need to set an upper-right [anchor point](../../../ui/position-and-size.md#anchorpoint) for the parent frame to define its origin point. Acceptable values are between `0` and `1`, relative to the size of the object, so an anchor value of <Typography noWrap>`1, 0`</Typography> puts the frame's anchor point in its upper‑right corner.

<img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Anchor.png" width="840" alt="Frame anchor point in its upper-right corner." />

1. In the **Explorer** window, select the **MeterBar** frame that you inserted previously.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar.png" width="320" alt="Explorer window showing the MeterBar frame selected." />

2. In the **Properties** window, enter <Typography noWrap>`1, 0, 0, 0`</Typography> for `Class.Frame.Position|Position` and press <kbd>Enter</kbd>. Studio will automatically add the brackets to form the `Datatype.UDim2` of <Typography noWrap>`{1, 0},{0, 0}`</Typography>.

3. Enter <Typography noWrap>`1, 0`</Typography> for the `Class.Frame.AnchorPoint|AnchorPoint` property. The frame should now be positioned in the upper‑right corner of the [device safe area](#utilize-safe-areas), slightly indented from the edge as a result of the [padding](#set-edge-padding).

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Repositioned.png" width="840" alt="Frame repositioned in upper-right corner of container." />

### Resize the frame

Like position, the `Class.Frame.Size|Size` of a UI object is represented by a `Datatype.UDim2` coordinate set containing `Datatype.UDim.Scale|Scale` and `Datatype.UDim.Offset|Offset` values for both the **X** and **Y** axes.

By default, the new frame's size is <Typography noWrap>`{0, 100},{0, 100}`</Typography>, meaning 100 **pixels** in both width (**X**) and height (**Y**). While a strict pixel value is useful in certain cases, many UI elements scale more responsively across multiple screens when set to a **percentage** of the overall screen container size.

1. With the **MeterBar** frame selected, access the **Properties** window and navigate to the `Class.Frame.Size|Size` property.

2. Enter a value of `0.35, 0, 0.05, 0` to set a percentage size of 35% wide and 5% tall with no added pixel offsets.

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Resized.png" width="840" alt="Frame resized to 35% wide and 5% tall." />

### Style the frame

By default, `Class.Frame|Frames` are filled in solid white. The final health meter should have a darker and slightly opaque fill, as well as a dark outline, so that it stands out better on both light and dark backgrounds.

<img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Preview.png" width="840" alt="Frame styled with opacity, border, and rounded corners." />

1. With the **MeterBar** frame selected, enter `0` for the `Class.Frame.BackgroundColor3|BackgroundColor3` property. Studio will automatically convert it to the RGB value of <Typography noWrap>`[0, 0, 0]`</Typography>.

2. Enter `0.75` for the `Class.Frame.BackgroundTransparency|BackgroundTransparency` property. In Roblox, transparency ranges from `0` for fully opaque to `1` for fully transparent, so `0.75` equals 25% opacity in other applications such as Figma or Photoshop.

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Opaque.png" width="840" alt="Frame restyled with dark background and 25% opacity." />

3. Insert a `Class.UIStroke` object, a powerful UI modifier that adds a [customizable stroke](../../../ui/appearance-modifiers.md#stroke) to the frame.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-UIStroke.png" width="320" alt="Explorer window showing the MeterBar frame with a child UIStroke modifier." />

4. With the new `Class.UIStroke` selected, set the following properties:

   - `Class.UIStroke.Thickness|Thickness` = `3`
   - `Class.UIStroke.Transparency|Transparency` = `0.25` (75% opaque)

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Stroked.png" width="840" alt="Frame restyled with a UIStroke modifier." />

To finalize the meter frame's styling, you can round the corners to form a "pill" shape instead of a sharp rectangle.

1. Insert a `Class.UICorner` instance into the **MeterBar** frame.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-UICorner.png" width="320" alt="Explorer window showing the MeterBar frame with a child UICorner modifier." />

2. With the new `Class.UICorner` selected, set the `Class.UICorner.CornerRadius|CornerRadius` to <Typography noWrap>`0.5, 0`</Typography>. Using a **scale** value of `0.5` (50%) instead of a pixel value is especially convenient for the meter bar because it ensures a fully rounded curve no matter how tall or wide the container becomes.

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Parent-Frame-Rounded.png" width="840" alt="Frame corners rounded with a UICorner modifier." />

### Create the inner fill

Now that the health meter's containing frame is complete, you can add an **inner fill** portion to represent the character's variable health. Since it only needs to be a solid‑filled region, a sub‑child `Class.Frame` inside the parent frame is suitable.

<img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Inner-Fill-Preview.png" width="840" alt="Inner fill frame added to parent frame to represent the character's variable health." />

1. Insert a child `Class.Frame` into the **MeterBar** frame.

2. Rename the new frame instance to **InnerFill**.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-InnerFill.png" width="320" alt="Explorer window showing the parent MeterBar frame with a child frame named InnerFill." />

3. With **InnerFill** selected, set the following properties:

   - `Class.Frame.AnchorPoint|AnchorPoint` = `0, 0.5` (left edge and vertical center)
   - `Class.Frame.Position|Position` = `0, 0, 0.5, 0`
   - `Class.Frame.Size|Size` = `1, 0, 1, 0`

   Since children of frames are positioned and sized relative to their parent, use of scale makes the inner frame fill the parent's full width and height, starting from the parent's left edge.

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Inner-Fill-Resized.png" width="840" alt="Inner fill frame repositioned and resized to fill entire parent frame." />

4. To match the "pill" shape of the parent frame, insert an additional `Class.UICorner` into **InnerFill**.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-InnerFill-UICorner.png" width="320" alt="Explorer window showing the InnerFill frame with a child UICorner modifier." />

5. With the new `Class.UICorner` modifier selected, set its `Class.UICorner.CornerRadius|CornerRadius` property to <Typography noWrap>`0.5, 0`</Typography> to match the "pill" shape of the parent **MeterBar** frame.

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Inner-Fill-Rounded.png" width="840" alt="Inner fill frame corners rounded with a UICorner modifier." />

6. To better represent that a full meter indicates good health, select **InnerFill** and set its `Class.Frame.BackgroundColor3|BackgroundColor3` property to <Typography noWrap>`[0, 225, 50]`</Typography> (in a later task, you'll [script](#listen-for-health-changes) this color to change based on actual health).

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Inner-Fill-Colored.png" width="840" alt="Inner fill frame recolored green to represent good health." />

### Add the icon

To more clearly indicate the purpose of the meter, you can add an [image label](../../../ui/labels.md) to the left side, in this case a red heart which commonly symbolizes health or life.

<img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Icon-Preview.png" width="840" alt="Image label of heart added to more clearly indicate a health meter." />

1. Insert an `Class.ImageLabel` into the **MeterBar** frame. This object lets you apply a 2D image asset that has been uploaded as a decal to Roblox.

2. Rename the new label instance to **Icon**.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-Icon.png" width="320" alt="Explorer window showing the MeterBar frame with a child ImageLabel." />

3. With **Icon** selected, set its `Class.ImageLabel.ZIndex|ZIndex` property to `2`. While newly inserted UI objects always layer in front of objects inserted previously, this change ensures the icon always displays in front of the meter's frame elements.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-Icon-Values.png" width="320" alt="Properties window showing the ZIndex of the ImageLabel set to 2." />

4. Locate the icon's `Class.ImageLabel.Image|Image` property and enter `rbxassetid://91715286435585`, the reference to a pre‑uploaded heart image (if desired, you can [import](../../../projects/assets/manager.md#asset-import) your own image and use its asset ID).

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Icon-Large.png" width="840" alt="Image label of heart added to MeterBar frame." />

5. To ensure the icon `Class.ImageLabel` always stays at a 1:1 aspect ratio, insert a `Class.UIAspectRatioConstraint`. Although this [constraint](../../../ui/size-modifiers.md#constraints) has customizable properties to control the aspect ratio, you can leave its default values intact.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-Icon-UIAspectRatioConstraint.png" width="320" alt="Explorer window showing the ImageLabel with a child UIAspectRatioConstraint." />

6. With **Icon** selected, finalize the appearance and position by changing the following properties:

   - `Class.ImageLabel.AnchorPoint|AnchorPoint` = `0.5, 0.5` (center anchor)
   - `Class.ImageLabel.BackgroundTransparency|BackgroundTransparency` = `1` (100% transparent)
   - `Class.ImageLabel.Position|Position` = `0, 0, 0.5, 0` (left side of meter and vertical center)
   - `Class.ImageLabel.Size|Size` = `2, 0, 2, 0` (200% the overall size of the **MeterBar** frame, constrained to 1:1 by the `Class.UIAspectRatioConstraint`)

   <img src="../../../assets/tutorials/creating-hud-meters/Meter-Design-Icon-Finalized.png" width="840" alt="Image label of heart repositioned and resized with background fill made transparent." />

### Constrain the size

While a [scale height](#resize-the-frame) of `0.05` (5%) looks good on modern phone screens and gaming monitors which are 16:9 aspect ratio or wider, the meter may look slightly too tall on tablet screens and older phones. You can check this by emulating a tablet like **iPad&nbsp;7th&nbsp;Generation** from the **Device Emulator**.

<img src="../../../assets/studio/general/Device-Emulator-Tablet.png" width="800" alt="Device Emulator set to emulate a tablet device." />

<img src="../../../assets/tutorials/creating-hud-meters/Emulation-Tablet-Unconstrained.png" width="840" alt="Emulation on tablet device with meter bar taller than desired." />

To keep the meter bar's height more consistent with wider screens, you can apply a `Class.UISizeConstraint` to limit the maximum pixel height.

1. Insert a `Class.UISizeConstraint` into the **MeterBar** frame.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-UISizeConstraint.png" width="320" alt="Explorer window showing the MeterBar frame with a child UISizeConstraint." />

2. With the new constraint selected, set its `Class.UISizeConstraint.MaxSize|MaxSize` property to <Typography noWrap>`inf, 20`</Typography> to restrict its height to 20 pixels while enforcing no width restriction.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterGui-HUDContainer-MeterBar-UISizeConstraint-Values.png" width="320" alt="Properties window showing the MaxSize of the UISizeConstraint set to inf, 20." />

Now, the meter bar maintains a more consistent height between wider and taller screens.

<Tabs>
<TabItem label="Phone">
<img src="../../../assets/tutorials/creating-hud-meters/Emulation-Phone-Constrained.png" width="840" height="403" alt="Emulation on phone." />
</TabItem>
<TabItem label="Tablet">
<img src="../../../assets/tutorials/creating-hud-meters/Emulation-Tablet-Constrained.png" width="840" height="605" alt="Emulation on tablet device with meter bar height constrained." />
</TabItem>
</Tabs>

## Replace the default health meter

Roblox experiences include a default health meter which becomes visible when characters take damage. If you keep the default meter visible, it will duplicate and potentially overlap the custom meter.

<img src="../../../assets/tutorials/creating-hud-meters/Default-Health-Meter.png" width="840" alt="Default health meter overlapping and duplicating the custom health meter." />

### Disable the default meter

To disable the default health meter, you'll use a **client script** (`Class.LocalScript`) within `Class.StarterPlayerScripts` that calls `Class.StarterGui:SetCoreGuiEnabled()`.

1. In the **Explorer** window, expand the `Class.StarterPlayer` container and locate the `Class.StarterPlayerScripts` container within it.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterPlayer-StarterPlayerScripts.png" width="320" alt="Explorer window showing the StarterPlayerScripts container inside the StarterPlayer container." />

2. Insert a new `Class.LocalScript` into the container and rename it to **HideDefaultHealthMeter** to describe its purpose. Scripts within `Class.StarterPlayerScripts` automatically run when the local player joins an experience, making it an ideal container to run a script that permanently hides the default meter.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterPlayer-StarterPlayerScripts-HideDefaultHealthMeter.png" width="320" alt="Explorer window showing the new HideDefaultHealthMeter client script inside the StarterPlayerScripts container." />

3. When you insert a new script, it automatically opens in a new script editor tab (if it doesn't, double‑click the script in the **Explorer** window).

   Paste the following code inside the **HideDefaultHealthMeter** script:

		```lua title="HideDefaultHealthMeter"
		local StarterGui = game:GetService("StarterGui")

		-- Hide default health meter
		StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Health, false)
		```

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Code Explanation</Typography></AccordionSummary>
   <AccordionDetails>
     <table>
     <thead>
     <tr>
       <td>Line</td>
       <td>Purpose</td>
     </tr>
     </thead>
     <tbody>
     <tr>
       <td>`1`</td>
       <td>Gets a reference to a core [service](../../../scripting/services.md), `Class.StarterGui`, which represents the same container where you created the custom health meter and whose contents clone into the `Class.PlayerGui` container for each player that joins the experience.</td>
     </tr>
     <tr>
       <td>`4`</td>
       <td>Calls the service's `Class.StarterGui:SetCoreGuiEnabled()|SetCoreGuiEnabled()` method and instructs the default health meter to be disabled (`false`).</td>
     </tr>
     </tbody>
     </table>
   </AccordionDetails>
   </BaseAccordion>

If you playtest the experience now and take damage, you'll notice that the default meter is disabled and hidden (you'll script the custom meter to [reflect health changes](#listen-for-health-changes) in the next section).

<img src="../../../assets/tutorials/creating-hud-meters/Default-Health-Meter-Disabled.png" width="840" alt="Default health meter disabled." />

### Listen for health changes

All default Roblox character models contain a `Class.Humanoid` class which provides special behaviors and functionality to the character, such as setting its walk/run speed and managing its health. `Class.Humanoid.Health|Health` changes on the server [replicate](../../../projects/client-server.md#replication) to each player's client and you can detect these changes to update both the size and color of the custom health meter.

1. In the **Explorer** window, locate the `Class.StarterCharacterScripts` container within `Class.StarterPlayer`.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterPlayer-StarterCharacterScripts.png" width="320" alt="Explorer window showing the StarterCharacterScripts container inside the StarterPlayer container." />

2. Insert a new `Class.LocalScript` into the container and rename it to **UpdateCustomMeter** to describe its purpose. Scripts within `Class.StarterCharacterScripts` automatically run each time the player's character spawns, making it an ideal container to run a script that fully resets the health meter on each respawn.

   <img src="../../../assets/tutorials/creating-hud-meters/StarterPlayer-StarterCharacterScripts-UpdateCustomMeter.png" width="320" alt="Explorer window showing the new UpdateCustomMeter client script inside the StarterCharacterScripts container." />

3. In the editor window for the **UpdateCustomMeter** script, paste the following code:

		```lua title="UpdateCustomMeter"
		local Players = game:GetService("Players")

		-- Reference to local player, character, and humanoid
		local player = Players.LocalPlayer
		local character = player.Character
		local humanoid = character:WaitForChild("Humanoid")

		-- Reference to meter bar inner frame
		local playerGui = player:WaitForChild("PlayerGui")
		local meterBarInner = playerGui.HUDContainer.MeterBar.InnerFill

		-- Gradient sequence colors (red, orange, yellow, lime, green)
		local gradient = {
			Color3.fromRGB(225, 50, 0),
			Color3.fromRGB(255, 100, 0),
			Color3.fromRGB(255, 200, 0),
			Color3.fromRGB(150, 225, 0),
			Color3.fromRGB(0, 225, 50)
		}

		-- Function to get color in gradient sequence from fractional point
		local function getColorFromSequence(fraction: number): Color3
			-- Each color in gradient defines the beginning and/or end of a section
			local numSections = #gradient - 1

			-- Each section represents a portion of 1
			local sectionSize = 1 / numSections

			-- Determine which section the requested fraction falls into
			local sectionStartIndex = 1 + math.clamp(fraction, 0, 1) // sectionSize

			-- Get the colors at the start and end of the section
			local sectionColorStart = gradient[sectionStartIndex]
			local sectionColorEnd = gradient[sectionStartIndex + 1] or sectionColorStart

			-- Normalize fraction to be a number from 0 to 1 within the section
			local fractionOfSection = math.clamp(fraction, 0, 1) % sectionSize / sectionSize

			-- Lerp between beginning and end based on the normalized fraction
			return sectionColorStart:Lerp(sectionColorEnd, fractionOfSection)
		end

		local function onHealthChanged()
			-- Calculate new health as percentage of max
			local healthFraction = math.max(0, humanoid.Health / humanoid.MaxHealth)

			-- Set the bar to new size/color targets
			meterBarInner.Size = UDim2.new(healthFraction, 0, 1, 0)
			meterBarInner.BackgroundColor3 = getColorFromSequence(healthFraction)
		end

		-- Listen for changes to humanoid health
		humanoid.HealthChanged:Connect(onHealthChanged)

		-- Initially set (or reset) bar size/color to current health
		onHealthChanged()
		```

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Code Explanation</Typography></AccordionSummary>
   <AccordionDetails>
     <table>
     <thead>
     <tr>
       <td>Lines</td>
       <td>Purpose</td>
     </tr>
     </thead>
     <tbody>
     <tr>
       <td>`4`‑`6`</td>
       <td>Gets references to the local `Class.Player`, their `Class.Player.Character|Character` model, and the `Class.Humanoid` class within it.</td>
     </tr>
     <tr>
       <td>`9`‑`10`</td>
       <td>Gets a reference to the meter's **InnerFill** object which must be resized and recolored as the character's health changes.</td>
     </tr>
     <tr>
       <td>`13`‑`19`</td>
       <td>Declares an array of five colors (red, orange, yellow, lime, green) to recolor the meter at various points; for example, green for 100% health, yellow for 50%, red for 0%, or a blend at any fraction between the keypoints.</td>
     </tr>
     <tr>
       <td>`22`‑`41`</td>
       <td>Helper function which returns the color blend between any of the gradient color keypoints.</td>
     </tr>
     <tr>
       <td>`43`‑`50`</td>
       <td>Function which handles any changes to health. Here, it calculates the new health as a percentage of the character's `Class.Humanoid.MaxHealth|MaxHealth`, resizes **InnerFill** to that scale percentage, and recolors it to the color returned from the `getColorFromSequence()` function.</td>
     </tr>
     <tr>
       <td>`53`</td>
       <td>The main [event](../../../scripting/events/index.md) connection which detects `Class.Humanoid.Health|Health` changes replicated from the server and calls the `onHealthChanged()` function.</td>
     </tr>
     <tr>
       <td>`56`</td>
       <td>Initially (upon character spawn or respawn) calls the `onHealthChanged()` function to size and color **InnerFill** to the correct percentage. Typically this will be the full width and green.</td>
     </tr>
     </tbody>
     </table>
   </AccordionDetails>
   </BaseAccordion>

If you playtest the experience now, you'll notice that the custom meter correctly updates both size and color as the character takes damage:

<video src="../../../assets/tutorials/creating-hud-meters/Meter-Change-Static.mp4" controls width="90%" alt="Video showing the meter bar updating with incremental damage from a heat vent."></video>

<Alert severity="warning">
By default, the Roblox health metering system includes a gradual healing effect which allows characters to slowly regenerate health. If you wish to disable this effect, insert an empty `Class.Script` named **Health** into the `Class.StarterCharacterScripts` container. This will prevent the default internal script from loading for each player character, effectively removing the regeneration effect.
</Alert>

### Animate the meter bar

To add an extra level of polish to the custom meter, you can animate health changes through **tweening**, gradually changing the meter bar's size and color over &frac12; second.

1. Access the script editor tab for the **UpdateCustomMeter** script that you edited previously.

2. Select all lines (<kbd>Ctrl</kbd><kbd>A</kbd> or <kbd>⌘</kbd><kbd>A</kbd>) and then paste over them (<kbd>Ctrl</kbd><kbd>V</kbd> or <kbd>⌘</kbd><kbd>V</kbd>) with the following code:

		```lua title="UpdateCustomMeter"
		local Players = game:GetService("Players")
		local TweenService = game:GetService("TweenService")

		-- Reference to local player, character, and humanoid
		local player = Players.LocalPlayer
		local character = player.Character
		local humanoid = character:WaitForChild("Humanoid")

		-- Tween properties
		local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out)

		-- Reference to meter bar inner frame
		local playerGui = player:WaitForChild("PlayerGui")
		local meterBarInner = playerGui.HUDContainer.MeterBar.InnerFill

		-- Gradient sequence colors (red, orange, yellow, lime, green)
		local gradient = {
			Color3.fromRGB(225, 50, 0),
			Color3.fromRGB(255, 100, 0),
			Color3.fromRGB(255, 200, 0),
			Color3.fromRGB(150, 225, 0),
			Color3.fromRGB(0, 225, 50)
		}

		-- Function to get color in gradient sequence from fractional point
		local function getColorFromSequence(fraction: number): Color3
			-- Each color in gradient defines the beginning and/or end of a section
			local numSections = #gradient - 1

			-- Each section represents a portion of 1
			local sectionSize = 1 / numSections

			-- Determine which section the requested fraction falls into
			local sectionStartIndex = 1 + math.clamp(fraction, 0, 1) // sectionSize

			-- Get the colors at the start and end of the section
			local sectionColorStart = gradient[sectionStartIndex]
			local sectionColorEnd = gradient[sectionStartIndex + 1] or sectionColorStart

			-- Normalize fraction to be a number from 0 to 1 within the section
			local fractionOfSection = math.clamp(fraction, 0, 1) % sectionSize / sectionSize

			-- Lerp between beginning and end based on the normalized fraction
			return sectionColorStart:Lerp(sectionColorEnd, fractionOfSection)
		end

		local function onHealthChanged()
			-- Calculate new health as percentage of max
			local healthFraction = math.max(0, humanoid.Health / humanoid.MaxHealth)

			-- Tween the bar to new size/color targets
			local tweenGoal = {
				Size = UDim2.new(healthFraction, 0, 1, 0),
				BackgroundColor3 = getColorFromSequence(healthFraction)
			}
			local meterBarTween = TweenService:Create(meterBarInner, tweenInfo, tweenGoal)
			meterBarTween:Play()
		end

		-- Listen for changes to humanoid health
		humanoid.HealthChanged:Connect(onHealthChanged)

		-- Initially set (or reset) bar size/color to current health
		onHealthChanged()
		```

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Key Additions/Changes</Typography></AccordionSummary>
   <AccordionDetails>
     <table>
     <thead>
     <tr>
       <td>Lines</td>
       <td>Purpose</td>
     </tr>
     </thead>
     <tbody>
     <tr>
       <td>`2`</td>
       <td>Gets a reference to `Class.TweenService` to implement tweening functionality within the script.</td>
     </tr>
     <tr>
       <td>`10`</td>
       <td>Creates a `Datatype.TweenInfo` constructor which defines the intended tween's duration, [easing style](../../../ui/animation.md#style), and [easing direction](../../../ui/animation.md#direction).</td>
     </tr>
     <tr>
       <td>`52`‑`57`</td>
       <td>Instead of simply setting the bar's size and color as in the [previous version](#listen-for-health-changes), declares a `tweenGoal` table with the target size/color, creates a new tween using the `tweenInfo` and `tweenGoal` parameters, and plays the new tween.</td>
     </tr>
     </tbody>
	   </table>
   </AccordionDetails>
   </BaseAccordion>

If you playtest the experience now, you'll notice that the custom meter tweens between each change in health:

<video src="../../../assets/tutorials/creating-hud-meters/Meter-Change-Tweened.mp4" controls width="90%" alt="Video showing the meter bar tweening between incremental damage from a heat vent."></video>

### Add a damage effect

The default health meter system includes a brief, subtle red tint on the screen edges when the character is damaged. By [disabling the default meter](#disable-the-default-meter), this effect is removed, but you can replace it with your own implementation.

1. Access the script editor tab for the **UpdateCustomMeter** script that you edited previously.

2. Select all lines and paste over them with the following code:

		```lua title="UpdateCustomMeter"
		local Workspace = game:GetService("Workspace")
		local Players = game:GetService("Players")
		local TweenService = game:GetService("TweenService")

		-- Reference to local player, character, and humanoid
		local player = Players.LocalPlayer
		local character = player.Character
		local humanoid = character:WaitForChild("Humanoid")

		-- Tween properties
		local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Exponential, Enum.EasingDirection.Out)

		-- Variable to store/cache character health
		local cachedHealth = humanoid.Health / humanoid.MaxHealth

		-- Get (or create new) color correction effect inside player camera
		local colorCorrection = Workspace.CurrentCamera:FindFirstChildWhichIsA("ColorCorrectionEffect") or Instance.new("ColorCorrectionEffect", Workspace.CurrentCamera)
		colorCorrection.Name = "DamageColorEffect"

		-- Reference to meter bar inner frame
		local playerGui = player:WaitForChild("PlayerGui")
		local meterBarInner = playerGui.HUDContainer.MeterBar.InnerFill

		-- Gradient sequence colors (red, orange, yellow, lime, green)
		local gradient = {
			Color3.fromRGB(225, 50, 0),
			Color3.fromRGB(255, 100, 0),
			Color3.fromRGB(255, 200, 0),
			Color3.fromRGB(150, 225, 0),
			Color3.fromRGB(0, 225, 50)
		}

		-- Function to get color in gradient sequence from fractional point
		local function getColorFromSequence(fraction: number): Color3
			-- Each color in gradient defines the beginning and/or end of a section
			local numSections = #gradient - 1

			-- Each section represents a portion of 1
			local sectionSize = 1 / numSections

			-- Determine which section the requested fraction falls into
			local sectionStartIndex = 1 + math.clamp(fraction, 0, 1) // sectionSize

			-- Get the colors at the start and end of the section
			local sectionColorStart = gradient[sectionStartIndex]
			local sectionColorEnd = gradient[sectionStartIndex + 1] or sectionColorStart

			-- Normalize fraction to be a number from 0 to 1 within the section
			local fractionOfSection = math.clamp(fraction, 0, 1) % sectionSize / sectionSize

			-- Lerp between beginning and end based on the normalized fraction
			return sectionColorStart:Lerp(sectionColorEnd, fractionOfSection)
		end

		local function onHealthChanged()
			-- Calculate new health as percentage of max
			local healthFraction = math.max(0, humanoid.Health / humanoid.MaxHealth)

			-- Tween the bar to new size/color targets
			local tweenGoal = {
				Size = UDim2.new(healthFraction, 0, 1, 0),
				BackgroundColor3 = getColorFromSequence(healthFraction)
			}
			local meterBarTween = TweenService:Create(meterBarInner, tweenInfo, tweenGoal)
			meterBarTween:Play()

			-- Show damage effect if new health is lower than cached health
			if healthFraction < cachedHealth then
				-- Cache new health value
				cachedHealth = healthFraction

				-- Set color correction to red as the initial tint before tweening
				colorCorrection.TintColor = Color3.fromRGB(255, 25, 25)
				colorCorrection.Saturation = 2.5

				-- Tween the tint back to white (neutral and no tint change from normal)
				local colorCorrectionTweenGoal = {
					TintColor = Color3.fromRGB(255, 255, 255),
					Saturation = 0
				}
				local colorCorrectionTween = TweenService:Create(colorCorrection, tweenInfo, colorCorrectionTweenGoal)
				colorCorrectionTween:Play()
			end
		end

		-- Listen for changes to humanoid health
		humanoid.HealthChanged:Connect(onHealthChanged)

		-- Initially set (or reset) bar size/color to current health
		onHealthChanged()
		```

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Key additions/changes</Typography></AccordionSummary>
   <AccordionDetails>
     <table>
     <thead>
     <tr>
       <td>Lines</td>
       <td>Purpose</td>
     </tr>
     </thead>
     <tbody>
     <tr>
       <td>`14`</td>
       <td>Sets a placeholder reference (`cachedHealth`) to track the character's health amount between changes, so you can compare if a change is lower (damage).</td>
     </tr>
     <tr>
       <td>`17`‑`18`</td>
       <td>On the initial character spawn, creates a new `Class.ColorCorrectionEffect` inside the player's current `Class.Camera`, or gets a reference to the same instance on later respawns. By parenting this [post‑processing effect](../../../environment/post-processing-effects.md) to the player's camera, it only applies to their local screen, not to every player's screen on the server.</td>
     </tr>
     <tr>
       <td>`68`‑`83`</td>
       <td>First performs a conditional check to confirm that the health change is lower than the `cachedHealth` value, indicating damage; if so, it sets `cachedHealth` to the new value. Next, it sets the `Class.ColorCorrectionEffect` tint to <Typography noWrap>`[255, 25, 25]`</Typography> (red) with higher saturation, then tweens the tint back to the default of neutral white (<Typography noWrap>`[255, 255, 255]`</Typography>) with no saturation.</td>
     </tr>
     </tbody>
     </table>
   </AccordionDetails>
   </BaseAccordion>

If you playtest the experience now, you'll notice that the screen briefly flashes red whenever the character takes damage:

<video src="../../../assets/tutorials/creating-hud-meters/Meter-Change-Damage-Effect.mp4" controls width="90%" alt="Video showing a red flash over the screen on incremental damage from a heat vent."></video>

<Alert severity="info">
If you decide to adapt the custom meter bar to another purpose, such as a mana meter or poison meter, you can change the `Class.ColorCorrectionEffect.TintColor|TintColor` on line `73` to something more suitable to the event, such as light blue <Typography noWrap>(`[200, 225, 255]`)</Typography> or toxic green <Typography noWrap>(`[0, 255, 75]`)</Typography>.
</Alert>

<Alert severity="success">
If your health meter doesn't match the appearance or behavior displayed in this tutorial, remember that you can inspect [UI Fundamentals&nbsp;- HUD Meter](https://www.roblox.com/games/104506915856758/UI-Fundamentals-HUD-Meter) as a completed reference template.
</Alert>
