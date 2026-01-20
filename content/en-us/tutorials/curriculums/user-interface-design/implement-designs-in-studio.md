---
title: Implement designs in Studio
description: Explains how to greybox the laser tag environment using basic parts.
prev: /tutorials/curriculums/user-interface-design/wireframe-your-layouts
---

**Implementing your designs** is the process of creating your wireframes in Studio using both built-in and custom UI elements with scripts that trigger your UI contextually. This exciting step of the tutorial is where you get to see all of your designs and hard work come together into a cohesive set of workflows that are complete and ready for player interaction.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) `.rbxl` file as a reference, this section of the user interface design curriculum shows you how to bring your UI planning to life, including guidance on:

- Retrieving asset IDs from the UI asset library so that you can recreate the sample laser tag experience's UI components.
- Emulating various devices directly in Studio to see how your UI displays on different screens and aspect ratios.
- Creating `Class.ScreenGui`, `Class.SurfaceGui`, and `Class.BillboardGui` objects to display your UI on players' screens, part surfaces, and within the 3D space, respectively.

After you review the techniques in this section, you can apply them to your own projects to make exciting UI components that help players navigate what they can do within your experiences.

<Alert severity="info">
   The instructions in this section of the tutorial show you how to exactly recreate the UI components using the UI Design Asset Library. This process takes about 90 minutes or less from start to finish. If you don't want to use the provided values, you can adjust each UI element to meet the specifications of your own experience, or use the sample itself for the rest of the tutorial.
</Alert>

## Get asset library

Asset libraries are collections of assets you can add into your inventory for easy access and reuse. The asset library you will use for your project from the [Creator Store](../../../production/creator-store.md) includes nine 2D individual UI element assets, and the final versions of the objective, blaster selector, and player info components you are creating in this section of the tutorial.

<Tabs>

  <TabItem key = "1" label="Individual UI Elements">

<GridContainer numColumns="3">
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/MultiBlasterIcon2.jpg" width="88%" />
    <figcaption><b>MultiBlaster Icon</b><br></br>rbxassetid://14309094777</figcaption>
  </figure>
  <figure>
     <img src="../../../assets/tutorials/user-interface-design/Section3/SingleBlasterIcon.jpg" />
    <figcaption><b>SingleBlaster Icon</b><br></br>rbxassetid://14309094641</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/PinkTeamIcon.jpg" width="70%" />
    <figcaption><b>Pink Team Icon</b><br></br>rbxassetid://14309678581</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/Trapezoid.jpg" width="100%" />
    <figcaption><b>Trapezoid</b><br></br>rbxassetid://14304828203</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/Trapezoid-Reverse.jpg" />
    <figcaption><b>Upside Down Trapezoid</b><br></br>rbxassetid://14304827304</figcaption>
  </figure>
    <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/GreenTeamIcon.jpg" width="70%" />
    <figcaption><b>Green Team Icon</b><br></br>rbxassetid://14309678701</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/Fade.jpg" />
    <figcaption><b>Fade</b><br></br>rbxassetid://14304826876</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/Multi-Directional-Fade.jpg" width="88%"/>
    <figcaption><b>Multi-directional Fade</b><br></br>rbxassetid://14304827147</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/BlastButtonIcon-Default.jpg" width="70%" />
    <figcaption><b>Blast Button Icon - Default</b><br></br>rbxassetid://18308375067</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/BlastButtonIcon-Pressed.jpg" width="70%" />
    <figcaption><b>Blast Button Icon - Pressed</b><br></br>rbxassetid://18308372597</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/CrosshairIcon.jpg" width="70%" />
    <figcaption><b>Crosshair Icon</b><br></br>rbxassetid://14400935532</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/HitMarker-Icon.jpg" width="70%" />
    <figcaption><b>Hit Marker Icon</b><br></br>rbxassetid://14401148777</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/Hexagon.jpg" width="70%" />
    <figcaption><b>Hexagon</b><br></br>rbxassetid://14462567943</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/SelectionArrowIcon.jpg" width="72%" />
    <figcaption><b>Selection Arrow Icon</b><br></br>rbxassetid://14309187282</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/user-interface-design/Section3/Border-Fade.jpg" width="71%" />
    <figcaption><b>Border Fade</b><br></br>rbxassetid://14309518632</figcaption>
  </figure>

</GridContainer>

  </TabItem>
  <TabItem key = "2" label="">
  </TabItem>
</Tabs>

You can add most of the library to your inventory within Studio by clicking the **Add to Inventory** link in the following component. Once assets are within your inventory, you can reuse them in any project on the platform.

<BrowseSampleCard href='https://create.roblox.com/store/asset/18879085966' description='Reference the completed version of the UI designs with these 2D assets.' title='Final Screen UI Components' assetId={18879085966}  />

<br></br>

To get the asset library from your inventory into your experience:

1. From Studio's **Window** menu or **Home** tab toolbar, open the [Toolbox](../../../projects/assets/toolbox.md).
1. In the **Toolbox** window, click the **Inventory** tab. The **My Models** sort displays.

   <img src="../../../assets/studio/toolbox/Inventory-Tab.png" width="360" />

1. Click the dropdown menu, then select the **My Packages** sort.
1. Click the **Final Screen UI Components** tile, then in the **Explorer** window, select **Completed Components**, then drag them into the **StarterGui** service. You can now enable any of the final components to reference their design.

## Emulate devices

Studio's [Device Emulator](../../../studio/testing-modes.md#device-emulation) allows you to test how players will see and interact with your UI on various devices. This tool is a vital part of the implementation process because the aspect ratio of your viewport in Studio doesn't necessarily reflect the aspect ratio of the screens players use to access your experience, and it's important that your UI is both legible and accessible on every device.

For example, if you don't test your UI on a range of screen sizes, players with large screens may not be able to read your text or decipher your icons, and players with small screens may not be able to see the 3D space because your UI elements take up too much room on the display.

To emulate your UI on various screen sizes:

1. From Studio's **Test** menu, toggle on **Device Emulator**.
1. In the resolution dropdown, select **Actual Resolution**. This allows you to see the true resolution of your UI elements on the device you're emulating.

   <img src="../../../assets/tutorials/user-interface-design/Section3/Device-Emulator-Setup.png" width="800" alt="Device Emulator settings options indicated at top of viewport window." />

1. In the device dropdown, select at least one device within the **Phone**, **Tablet**, **Desktop**, and **Console** sections.

   <img src="../../../assets/tutorials/user-interface-design/Section3/Device-Emulator-Preview.png" width="840" />

## Create ScreenGui objects

To display UI elements on every player's screen, you can create a `Class.ScreenGui` object in the `Class.StarterGui` service. `Class.ScreenGui` objects are the primary containers for on-screen UI, and the `Class.StarterGui` service copies its contents to each player's `Class.PlayerGui` container as they enter an experience.

You can create multiple `Class.ScreenGui` objects to organize and display groupings of UI elements contextually throughout gameplay. For example, the sample laser tag experience includes five separate `Class.ScreenGui` objects that are initially disabled until players meet different conditions during the main [user flow](wireframe-your-layouts.md#develop-user-flows) of the experience:

- **HUDGui** - Displays key information about the experience's gameplay when players are active in a round, such as the objective and each team's total points.
- **PickABlasterGui** - Displays all blaster choices when players start or rejoin a round.
- **ForceFieldGui** - Displays a hexagonal grid when players are selecting a blaster and while they are temporarily invincible.
- **OutStateGui** - Displays a dark border around the screen when players are tagged out.
- **RoundResultsGui** - Displays a dark overlay on top of the screen with information on which team won the round.

After you create a `Class.ScreenGui` object, you can create and customize its child `Class.GuiObject|GuiObjects` according to each container's purpose. To demonstrate, in the immediate sections that follow, you will learn how to implement UI elements for the [three categories of information](choose-an-art-style.md#identify-your-ui-elements) players need to know to be successful in the sample laser tag experience. **You can adjust any part of the process to meet the specifications of your own experience**.

To create a `Class.ScreenGui` object:

1. In the **Explorer** window, hover over the **StarterGui** service, then click the **&CirclePlus;** icon. A contextual menu displays.

1. Insert a **ScreenGui**.

   <img src="../../../assets/studio/explorer/StarterGui-ScreenGui.png" width="50%" />

1. Rename the **ScreenGui** according to the context of its child UI elements.
1. Repeat this process for each grouping of UI elements you need to display on every player's screen.

   <img src="../../../assets/tutorials/user-interface-design/Section3/ScreenGuiContainers.png" width="50%" />

### Objective UI

Following the visual hierarchy best practices from [Wireframe Your Layouts](wireframe-your-layouts.md), this section teaches you how to implement all on-screen UI elements relating to the experience's objective. This grouping of UI elements is near the top of the screen because the objective and each team's points have the most significance on how to win the game.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/ObjectiveUI-Intro.png" />
</figure>

For example, the sample provides an objective UI component that players reference to know what they need to do to be successful in a round. As players tag out enemy team members and earn points, this component keeps track of each team's score against the overall goal within the header's prompt. For a high-level review of all of the client and server scripts that work together to track points, see [Track points](../gameplay-scripting/add-rounds.md#track-points) in the Gameplay Scripting Curriculum.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/Objective-Intro.jpg" />
</figure>

To exactly recreate the objective UI within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Create a container for the entire component.

   1. Insert a **Frame** into the **HUDGui** `Class.ScreenGui` object.

      1. In the **Explorer** window, navigate to the **StarterGui** service.
      1. Hover over its child **HUDGui** object, then click the ⊕ icon. A contextual menu displays.
      1. From the contextual menu, insert a **Frame**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-1.jpg" width="80%" />

   1. Select the new **Frame**, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0` to set the frame's origin point in the top-middle of itself (50% from the left to the right of the frame, and 0% from the top to the bottom of the frame).
      1. Set **BackgroundTransparency** to `1` to make the frame's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.03, 0}` to set the frame near the top-middle of the screen (50% from the left to the right of the screen, and 3% from the top to the bottom of the screen so there is a little buffer).
      1. Set **Size** to `{0.5, 0},{0.13, 0}` so the frame's elements take up a large portion of the top of the screen to grab players' attention (50% horizontally, and 13% vertically).
      1. Set **Name** to **Objective**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-1.jpg" width="80%" />

   1. **(Optional)** Insert a **UIAspectRatioConstraint** into **Objective** to ensure the label's aspect ratio remains the same no matter the player's screen size. The sample sets its `Class.UIAspectRatioConstraint.AspectRatio` property to `7`.

1. Create a container for the objective's prompt objects.

   1. Insert a **Frame** into **Objective**.
   1. Select the new **Frame**, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0` to set the frame's origin point in the top-middle of itself (50% from the left to the right of the frame, and 0% from the top to the bottom of the frame).
      1. Set **BackgroundTransparency** to `1` to make the frame's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0, 0}` to set the frame in the middle of the container (50% from the left to the right of the parent frame, and 0% from the top to the bottom of the parent frame).
      1. Set **Size** to `{1, 0},{0.67, 0}` so the selection UI components take up about more than half of the container from top to bottom (100% horizontally and 67% vertically of the parent frame).
      1. Set **Name** to **ObjectiveDisplay**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-2.jpg" width="80%" />

1. Create the title elements.

   1. Insert an **ImageLabel** into **ObjectiveDisplay**.
   1. Select the **ImageLabel**, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 1` to set the label's origin point in the bottom-middle of itself (50% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **LayoutOrder** to `-1`.
      1. Set **Position** to `{0.5, 0},{0.34, 0}` to set the label near the top-upper middle of the frame (50% from the left to the right of the parent frame, and 34% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.46, 0},{0.34, 0}` to widen the prompt area to almost half of the frame (46% horizontally and 34% vertically of the parent frame).
      1. Set **Name** to Header.
      1. Set **Image** to `rbxassetid://14304828123` to display a trapezoid.
      1. Set **ImageTransparency** to `0.15` to make the header semi-transparent.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-3B.jpg" width="80%" />

   1. **(Optional)** Insert a **UIAspectRatioConstraint** into the **ImageLabel** to ensure the label's aspect ratio remains the same no matter the player's screen size. The sample sets its `Class.UIAspectRatioConstraint.AspectRatio` property to **13.781**.
   1. Insert a **TextLabel** into **Header** to display a title.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to move the label to the middle of its parent label (50% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.62, 0},{0.55, 0}` to widen the text space to more than half of the parent label (62% horizontally and 55% vertically of the parent label).
      1. Set **Name** to **HeaderTextLabel**.
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Medium** to thicken the font.
      1. Set **Text** to **OBJECTIVE**.
      1. Enable **TextScaled**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-3E.jpg" width="80%" />

1. Create the prompt elements.

   1. Insert an **ImageLabel** into **ObjectiveDisplay**.
   1. Select the **ImageLabel**, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 1` to set the label's origin point in the bottom-middle of itself (50% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{1, 0}` to move the label to the bottom-middle of its parent frame (50% from the left to the right of the parent frame, and 100% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.89, 0},{0.66, 0}` to widen the text space to almost the full width of the parent frame (89% horizontally and 66% vertically of the parent frame).
      1. Set **Name** to **Body**.
      1. Set **Image** to `rbxassetid://14304827265` to display an upside-down trapezoid.
      1. Set **ImageColor3** to `0, 0, 0` to tint the image black.
      1. Set **ImageTransparency** to `0.3` to make the header semi-transparent.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-4B.jpg" width="80%" />

   1. **(Optional)** Insert a **UIAspectRatioConstraint** into the **ImageLabel** to ensure the label's aspect ratio remains the same no matter the player's screen size. The sample sets its `Class.UIAspectRatioConstraint.AspectRatio` property to `13.781`.
   1. Insert a **TextLabel** into **Body** to display a prompt.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to move the label to the middle of its parent label (50% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.85, 0},{0.39, 0}` to widen the text space to more than half of the parent label (85% horizontally and 39% vertically of the parent label).
      1. Set **Name** to **BodyTextLabel**.
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Medium** to thicken the font.
      1. Set **TextColor3** to `255, 255, 255` to make the text white against the dark background.
      1. Set **Text** to **Tag opposing players to score points! First team to %d points wins.**.
      1. Enable **TextScaled**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-4E.jpg" width="80%" />

1. Create a container for the objective's team counters.

   1. Insert a **Frame** into **Objective**.
   1. Select the new **Frame**, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 1` to set the label's origin point in the bottom-middle of itself (50% from the left to the right of the frame, and 100% from the top to the bottom of the frame).
      1. Set **BackgroundTransparency** to `1` to make the frame's background completely transparent.
      1. Set **Position** to `{0.5, 0},{1, 0}` to set the frame in the bottom-middle of the container (50% from the left to the right of the parent frame, and 100% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.44, 0},{0.27, 0}` so the selection UI components take up about less than half of the container from left to right (44% horizontally and 27% vertically of the parent frame).
      1. Set **Name** to **TeamPointCounter**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-5.jpg" width="80%" />

1. Create padding for the team counters.
   1. Insert a **UIListLayout** object into the frame from step 5.
   1. Select the **UIListLayout** object, then in the **Properties** window,
      1. Set **Padding** to `0.025, 0` to provide space between the future team counters.
      1. Set **FillDirection** to **Horizontal** so each team counter displays next to each other.
      1. Set **HorizontalAlignment** to **Center** so each team counter aligns to the middle of one another.
1. Create the green team counter elements.

   1. Insert an **ImageLabel** into **TeamPointCounter**.
   1. Select the **ImageLabel**, then in the **Properties** window,

      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{1, 0}` to move the label to the bottom-middle of its parent frame (50% from the left to the right of the parent frame, and 100% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.5, 0},{1, 0}` to widen the label to half width of the parent frame (50% horizontally and 100% vertically of the parent frame).
      1. Set **Name** to **TeamACounter**.
      1. Set **Image** to `rbxassetid://14304826831` to display a directional fade.
      1. Set **ImageColor3** to `88, 218, 171` to tint the image mint green.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-7B.jpg" width="80%" />

   1. Configure a custom attribute to track that this label is for the green team.
      1. In the **Properties** window, navigate to the **Attributes** section, then click the plus icon. A pop-up dialog displays.
      1. In the **Name** field, input **teamColor**.
      1. In the **Type** dropdown menu, select **BrickColor**.
      1. Click the **Save** button.
      1. Set the new **teamColor** attribute to **Mint**.
   1. Insert a **TextLabel** into **TeamACounter** to display a prompt.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `1, 0.5` to set the new label's origin point in the right-middle of itself (100% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.95, 0},{0.5, 0}` to move the label to the right of its parent label (95% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.85, 0},{0.39, 0}` to widen the text space to more than half of the parent label (85% horizontally and 39% vertically of the parent label).
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Bold** to thicken the font.
      1. Set **TextColor3** to `255, 255, 255` to make the text white against the dark background.
      1. Set **Text** to **-**.
      1. Enable **TextScaled**.
      1. Set **TextXAlignment** to **Right**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-7E.jpg" width="80%" />

   1. Insert a **UIStroke** object into the **TextLabel**, then in the **Properties** window, set **Color** to `8, 78, 52` to outline the dash with a dark green stroke.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-7F.jpg" width="80%" />

1. Create the pink team counter elements.

   1. Duplicate **TeamAICounter** and its children.
   1. Select the duplicate **TeamACounter**, then in the **Properties** window,
      1. Set **Name** to **TeamBCounter**.
      1. Set **Image** to `rbxassetid://14305849451` to display a directional fade in the opposite direction.
      1. Set **ImageColor3** to `255, 170, 255` to tint the image carnation pink.
      1. Set the **teamColor** attribute to **Carnation Pink**.
   1. Select the duplicate **TextLabel** child of **TeamBCounter**, then in the **Properties** window,
      1. Set **AnchorPoint** to `0, 0.5` to set the new label's origin point in the left-middle of itself (0% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **Position** to `{0.05, 0},{0.5, 0}` to move the label to the left of its parent label (5% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **TextXAlignment** to **Left**.
   1. Select the duplicate **UIStroke** child of **TeamBCounter**, then in the **Properties** window, set **Color** to `158, 18, 94` to outline the dash with a dark pink stroke.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Objective-8.jpg" width="80%" />

1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically update the objective prompt and track team points.

<Tabs>
  <TabItem key = "1" label="HUDGuiSetup">

The following script requires a set of module scripts that work together to set up the main Heads Up Display (HUD), including `setObjective` and `startSyncingTeamPoints`. After a player joins a round and selects their blaster, this script ensures all HUD UI elements display appropriately for the player's state, device, and team status.

```lua
local Players = game:GetService("Players")

local setPlayerPortrait = require(script.setPlayerPortrait)
local setPlayerName = require(script.setPlayerName)
local startSyncingTeamColor = require(script.startSyncingTeamColor)
local setObjective = require(script.setObjective)
local setupTouchButtonAsync = require(script.setupTouchButtonAsync)
local startSyncingTeamPoints = require(script.startSyncingTeamPoints)
local disableMouseWhileGuiEnabled = require(script.disableMouseWhileGuiEnabled)
local setupHitmarker = require(script.setupHitmarker)

local localPlayer = Players.LocalPlayer
local gui = localPlayer.PlayerGui:WaitForChild("HUDGui")

setPlayerPortrait(gui)
setPlayerName(gui)
startSyncingTeamColor(gui)
setObjective(gui)
startSyncingTeamPoints(gui)
disableMouseWhileGuiEnabled(gui)
setupHitmarker(gui)
setupTouchButtonAsync(gui)
```

  </TabItem>
  <TabItem key = "2" label="setObjective">

After a player selects their blaster, the following `ReplicatedStorage.HUDGuiSetup.setObjective` script requires the **TEAM_SCORE_LIMIT** module script so that it can swap the placeholder string "%d" in the UI objective's `Class.TextLabel` object. To learn more about this placeholder string, see [Set Objective](../gameplay-scripting/add-rounds.md#set-objective) in the Gameplay Scripting curriculum.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local TEAM_SCORE_LIMIT = require(ReplicatedStorage.TEAM_SCORE_LIMIT)

local function setObjective(gui: ScreenGui)
	local bodyTextLabel = gui.Objective.ObjectiveDisplay.Body.BodyTextLabel
	bodyTextLabel.Text = bodyTextLabel.Text:format(TEAM_SCORE_LIMIT)
end

return setObjective
```

  </TabItem>
  <TabItem key = "3" label="startSyncingTeamPoints">

As the round begins, the following script stores all points separately under the teamPoints attribute in `Class.Teams` service. As `teamPoints` increments, this module script calls the `startSyncingTeamPoints` function to find the team counter `Class.GuiObject|GuiObjects` within the Objective UI component.

When it locates **TeamACounter** and **TeamBCounter**, it gets their `teamColor` attribute, which correlates with the team spawn zones: TeamACounter displays the green team's points, and TeamBCounter tracks the pink team's points.

The module script then calls its `getTeamFromTeamColor` function to validate that the TeamACounter's **mint** teamColor attribute and the TeamBCounter's **carnation pink** teamColor attribute matches the `Class.Team.Color` properties underneath the `Class.Teams` service. If so, it returns both of the teams.

When this occurs, `startSyncingTeamPoints` sets both team counters' `Class.TextLabel` objects to their corresponding `teamPoints` values, and continues to update them whenever a player scores a point by tagging another player out on the opposite team.

To learn more about how the server knows when a team meets the objective goal and wins the round, see [Track Points](../gameplay-scripting/add-rounds.md#track-points) in the Gameplay Scripting Curriculum.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Teams = game:GetService("Teams")

local GuiAttribute = require(ReplicatedStorage.GuiAttribute)

local function getTeamFromTeamColor(teamColor: Color3): Team?
	for _, team in Teams:GetTeams() do
		if team.TeamColor == teamColor then
			return team
		end
	end

	return nil
end

local function startSyncingTeamPoints(gui: ScreenGui)
	for _, teamPointCounter in gui.Objective.TeamPointCounter:GetChildren() do
		if not teamPointCounter:IsA("GuiObject") then
			continue
		end

		local iconTeamColor = teamPointCounter:GetAttribute(GuiAttribute.teamColor)

		local team = getTeamFromTeamColor(iconTeamColor)
		if not team then
			warn(`No team found matching the color {iconTeamColor} to sync team points on {teamPointCounter}`)
			continue
		end

		teamPointCounter.TextLabel.Text = team:GetAttribute(GuiAttribute.teamPoints)

		team:GetAttributeChangedSignal(GuiAttribute.teamPoints):Connect(function()
			teamPointCounter.TextLabel.Text = team:GetAttribute(GuiAttribute.teamPoints)
		end)
	end
end

return startSyncingTeamPoints
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, after a player selects their blaster, the objective UI displays on the top of their screen, and tracks each team's points.
</Alert>

### Blaster UI

Following the visual hierarchy best practices from [Wireframe Your Layouts](wireframe-your-layouts.md), this section teaches you how to implement all on-screen UI elements relating to the player's blaster. This grouping of UI elements takes up the majority of the screen space near the center of the screen because it acts as the focal point to draw players' attention to the action in 3D space, and it has the most significance for playing the game.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/BlasterUI-Intro.png" />
</figure>

#### Crosshair

A crosshair is a UI element that informs players where they're going to make impact when they blast their weapon. This UI element is a vital gameplay requirement for first-person shooter experiences because players need to be able to accurately aim their blaster and tag out enemy team members.

Like most other experiences in the first-person shooter genre, the sample laser tag experience positions the crosshair in the center of the screen so players have something static to focus on while their avatar moves through the 3D space. In addition to reducing motion sickness, this placement allows the crosshair to be perceptible while also blending into the overall environment.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/Crosshair-2F.png" />
</figure>

To exactly recreate the crosshair within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert an **ImageLabel** into the **HUDGui** `Class.ScreenGui` object.

   1. In the **Explorer** window, navigate to the **StarterGui** service.
   1. Hover over its child **HUDGui** object, then click the **⊕** icon. A contextual menu displays.
   1. From the contextual menu, insert an **ImageLabel**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Crosshair-1C.png" />

1. Select the new **ImageLabel**, then in the **Properties** window,

   1. Set **Image** to `rbxassetid://14400935446`.
   1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of the label (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
   1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
   1. Set **Name** to **Crosshair**.
   1. Set **Position** to `{0.5,0},{0.5,0}` to set the label in the middle of the screen.
   1. Set **ScaleType** to **Fit** so the image fits within its container and doesn't stretch on various screen sizes.

1. **(Optional)** Insert a **UIAspectRatioConstraint** into **Crosshair** to ensure the label's aspect ratio remains the same no matter the player's screen size. The sample sets its `Class.UIAspectRatioConstraint.AspectRatio` property to **0.895**.

#### Hit marker

A hit marker is a UI element that only displays when a blast makes impact with another player on the enemy team. Like the crosshair, this UI element is a vital gameplay requirement for first-person shooter experiences because it provides visual feedback of when players are successful in tagging out their opponents.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/Hitmarker-2F.png" />
</figure>

To exactly recreate the hit marker within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert an **ImageLabel** into the **Crosshair** `Class.ImageLabel` object.

   1. In the **Explorer** window, navigate to the **StarterGui** service.
   1. Hover over its child **Crosshair** object, then click the **⊕** icon. A contextual menu displays.
   1. From the contextual menu, insert an **ImageLabel**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Hitmarker-1C.png" />

1. Select the new **ImageLabel**, then in the **Properties** window,

   1. Set **Image** to `rbxassetid://14401148736` to display the rectangular hit marker icon.
   1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of the label.
   1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
   1. Set **Position** to `{0.5,0},{0.5,0}` to set the label in the middle of the screen.
   1. Set **Name** to **Hitmarker**.
   1. Set **Size** to `{0.6, 0},{0.06, 0}` to reduce the size of the rectangles around the middle of the crosshair.
   1. Set **ImageTransparency** to `1` to make the hit marker completely transparent. The scripts in the following step turn the transparency back to 0 every time a player's blast makes impact with another player on the enemy team.

1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically display the hit marker when a blast makes impact with a player on the enemy team.

<Tabs>
  <TabItem key = "1" label="HUDGuiSetup">

The following script requires a set of module scripts that work together to set up the main Heads Up Display (HUD), including `setupHitmarker`. After a player joins a round and selects their blaster, this script ensures all HUD UI elements display appropriately for the player's state, device, and team status.

```lua
local Players = game:GetService("Players")

local setPlayerPortrait = require(script.setPlayerPortrait)
local setPlayerName = require(script.setPlayerName)
local startSyncingTeamColor = require(script.startSyncingTeamColor)
local setObjective = require(script.setObjective)
local setupTouchButtonAsync = require(script.setupTouchButtonAsync)
local startSyncingTeamPoints = require(script.startSyncingTeamPoints)
local disableMouseWhileGuiEnabled = require(script.disableMouseWhileGuiEnabled)
local setupHitmarker = require(script.setupHitmarker)

local localPlayer = Players.LocalPlayer
local gui = localPlayer.PlayerGui:WaitForChild("HUDGui")

setPlayerPortrait(gui)
setPlayerName(gui)
startSyncingTeamColor(gui)
setObjective(gui)
startSyncingTeamPoints(gui)
disableMouseWhileGuiEnabled(gui)
setupHitmarker(gui)
setupTouchButtonAsync(gui)
```

  </TabItem>
  <TabItem key = "2" label="setupHitmarker">

The following `HUDGuiSetup.setupHitmarker` module script starts by listening for `playerTaggedBindableEvent`, which fires within `renderBlast` if a player is tagged. When it detects that another player is tagged, it creates a `Class.Tween` that eases the hit marker's `Class.ImageLabel.ImageTransparency` property from `1` to `0`. After 0.4 seconds, the module script resets the hit marker's transparency back to `0`, then the process starts again.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local playerTaggedBindableEvent = ReplicatedStorage.Instances.PlayerTaggedBindableEvent

-- How long the hitmarker should be visible for after a blast connects with a target player
local HITMARKER_FLASH_TIME = 0.4
local HITMARKER_TWEEN_INFO =
	TweenInfo.new(HITMARKER_FLASH_TIME, Enum.EasingStyle.Quint, Enum.EasingDirection.Out, 0, true)

local function setupHitmarker(gui: ScreenGui)
	local propertyTable = {
		ImageTransparency = 0,
	}
	local tweenHitmarker = TweenService:Create(gui.Crosshair.Hitmarker, HITMARKER_TWEEN_INFO, propertyTable)

	local function onPlayerTaggedEvent()
		tweenHitmarker:Cancel()
		-- The hitmarker will remain at the transparency value at the time of canceling. Reset it to be invisible.
		gui.Crosshair.Hitmarker.ImageTransparency = 1
		tweenHitmarker:Play()
	end
	playerTaggedBindableEvent.Event:Connect(onPlayerTaggedEvent)
end

return setupHitmarker
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player blasts their blaster and the blast makes impact with another player, the hit marker momentarily displays.
</Alert>

#### Blaster selector

A blaster selector is a UI component that players use to select their blaster type before joining or rejoining a round. The sample laser tag experience provides two types of blasters: one that produces several beams with a wide, horizontal spread, and another that produces a single beam. The type of blaster that players select influences their strategy during the round, making this UI component an essential workflow for the overall experience.

The following steps detail how to create several containers for the different UI element groupings, a header with a prompt, the navigation and select buttons, and a blaster button prefab. The scripting logic for the overall component populates different visual characteristics into the blaster button prefab according to `Class.Configuration` instances that represent each blaster type.

This setup allows you to create additional `Class.Configuration` instances for more blaster types that automatically display correctly within the blaster selector without needing to create individual buttons within `StarterGui.PickABlasterGui`.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/BS-Intro.png" />
</figure>

To exactly recreate the blaster selector within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Create a container for the entire component.

   1. Insert a **Frame** into the **PickABlaster** `Class.ScreenGui` object.

      1. In the **Explorer** window, navigate to the **StarterGui** service.
      1. Hover over its child **PickABlaster** object, then click the **⊕** icon. A contextual menu displays.
      1. From the contextual menu, insert a **Frame**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-1A.png" />

   1. Select the new frame, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 1` to set the frame's origin point in the bottom-middle of itself (50% from the left to the right of the frame, and 100% from the top to the bottom of the frame).
      1. Set **BackgroundTransparency** to `1` to make the frame's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.9, 0}` to set the frame near the bottom-middle of the screen (50% from the left to the right of the screen, and 92.4% from the top to the bottom of the screen).
      1. Set **Size** to `{0.8, 0},{0.25, 0}` so the blaster selector's UI components take up a large portion of the screen to grab players' attention (80% horizontally, and 25% vertically).
      1. Set **Name** to **Component**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-1B.png" width="80%" />

   1. **(Optional)** Insert a **UIAspectRatioConstraint** into **Component** to ensure the frame and its children UI elements' aspect ratio remains the same no matter the player's screen size. The sample sets its `Class.UIAspectRatioConstraint.AspectRatio` property to **5**.

1. Create a container to hold UI element groupings.

   1. Insert a **Frame** into **Component**.
   1. Select the new frame, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the frames's origin point in the middle of itself (50% from the left to the right of the frame, and 50% from the top to the bottom of the frame).
      1. Set **BackgroundTransparency** to `1` to make the frame's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.375, 0}` to set the frame near the top-middle of the container (50% from the left to the right of the parent frame, and 37.5% from the top to the bottom of the parent frame).
      1. Set **Size** to `{1, 0},{0.75, 0}` so the selection UI components take up 3/4th of the container (100% horizontally and 75% vertically of the parent frame).
      1. Set **Name** to **SelectionFrame**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-2B.png" width="80%" />

1. Create a prompt for the blaster selector.

   1. Insert an **ImageLabel** into **SelectionFrame**.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 1` to set the label's origin point in the bottom-middle of itself (50% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **LayoutOrder** to `-1`.
      1. Set **Position** to `{0.5, 0},{0.22, 0}` to set the label near the top-upper middle of the frame (50% from the left to the right of the parent frame, and 22% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.45, 0},{0.22, 0}` to widen the prompt area to almost half of the frame (45% horizontally and 22% vertically of the parent frame).
      1. Set **Name** to **Header**.
      1. Set **Image** to `rbxassetid://14304828123` to display a trapezoid.
      1. Set **ImageTransparency** to `0.15` to make the header semi-transparent.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-3B.png" width="80%" />

   1. **(Optional)** Insert a **UIAspectRatioConstraint** into the label to ensure the label's aspect ratio remains the same no matter the player's screen size. The sample sets its `Class.UIAspectRatioConstraint.AspectRatio` property to `13.78`.
   1. Insert a **TextLabel** into **Header** to display a prompt.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to move the label to the middle of its parent label (50% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.6, 0},{0.55, 0}` to widen the text space to more than half of the parent label (60% horizontally and 55% vertically of the parent label).
      1. Set **Name** to **HeaderTextLabel**.
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Medium** to thicken the font.
      1. Set **Text** to **PICK A BLASTER**.
      1. Enable **TextScaled**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-3E.png" width="80%" />

1. Create the container for your blaster button container and selection arrows.

   1. Insert an **ImageLabel** into **SelectionFrame**.
   1. Select the new label, then in the **Properties** window,

      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `0.5, 1` to set the label's origin point in the bottom-middle of itself (50% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundColor** to `0, 0, 0` to make the label black.
      1. Set **BackgroundTransparency** to `0.3` to reduce the opacity of the label by 30%, and match all black UI elements in the experience.
      1. Set **Position** to `{0.5, 0},{1, 0}` to set the label to the bottom-middle of the frame (50% from the left to the right of the parent frame, and 100% from the top to the bottom of the parent frame).
      1. Set **Size** to `{1, 0},{0.77, 0}` to widen the label area to the space below the prompt (100% horizontally and 77% vertically of the parent frame).

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-4B.png" width="80%" />

   1. Round the corners of the container.

      1. Insert a **UICorner** object into the label.
      1. Select the new corner object, then in the **Properties** window, set **CornerRadius** to `0.075, 0` to round the corners.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-4C.png" width="80%" />

1. Create the container for your blaster buttons.

   1. Insert a **Frame** into the label from step 4.
   1. Select the new frame, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new frame's origin point in the middle of itself (50% from the left to the right of the frame, and 50% from the top to the bottom of the frame).
      1. Set **BackgroundTransparency** to `1` to make the frame's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the frame in the middle of its parent label (50% from the left to the right of the parent frame, and 50% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.85, 0},{0.77, 0}` to widen the frame area to most of the label (85% horizontally and 77% vertically of the parent label).
      1. Set **Name** to **Container**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-5E.png" width="80%" />

1. Create padding for all future blaster buttons.

   1. Insert a **UIListLayout** object into the frame from step 5.
   1. Select the new layout object, then in the **Properties** window,
      1. Set **Padding** to `0.035, 0` to provide space between all future buttons.
      1. Set **FillDirection** to **Horizontal** so each button displays next to each other.
      1. Set both **HorizontalAlignment** and **VerticalAlignment** to **Center** so each button aligns to the middle of one another.

1. Create the left navigation button.

   1. Insert an **ImageButton** object into the **ImageLabel** from step 4.
   1. Select the new button, then in the **Properties** window,

      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `0, 0.5` to set the new button's origin point in the left-middle of itself (0% from the left to the right of the button, and 50% from the top to the bottom of the button).
      1. Set **BackgroundTransparency** to `0.15` to provide visual feedback on hover that the button is selectable.
      1. Set **Position** to `{0.02, 0},{0.5, 0}` to provide padding to the left of the button from its parent container (2% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.04, 0},{0.33, 0}` to make the selection button much smaller than the blaster buttons (4% horizontally and 33% vertically of the parent frame).
      1. Set **Name** to **NavigationButtonLeft**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-7B.png" width="80%" />

   1. Round the corners of the button.

      1. Insert a **UICorner** object into the button.
      1. Select the new corner object, then in the **Properties** window, set **CornerRadius** to `0.1, 0` to round the corners.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-7C.png" width="80%" />

   1. Insert an **ImageLabel** object into the button.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **Position** to `{0.45, 0},{0.5, 0}` to set the label near the middle of its parent button (45% from the left to the right of the parent button, and 50% from the top to the bottom of the parent button). This value isn't in the middle because an arrow doesn't _visually_ look like it's in the middle of the button at `{0.5, 0},{0.5, 0}`.
      1. Set **Size** to `{0.8, 0},{0.8, 0}` to widen the label area to space below the prompt (80% horizontally and 80% vertically of the parent frame).
      1. Set **BackgroundTransparency** to `1` to make the image's background completely transparent.
      1. Set **Image** to `rbxassetid://14309187238`.
      1. Set **ScaleType** to **Fit**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-7E.png" width="80%" />

1. Create the right navigation button.

   1. Duplicate **NavigationButtonLeft**.
   1. Select the duplicate button, then in the **Properties** window,
      1. Set **AnchorPoint** to `1, 0.5` to set the new button's origin point in the right-middle of itself (100% from the left to the right of the button, and 50% from the top to the bottom of the button).
      1. Set **Position** to `{0.98, 0},{0.5, 0}` to provide padding to the right of the button from its parent container (98% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Name** to **NavigationButtonRight**.
   1. Select its **ImageLabel** child object.

      1. Set **Rotation** to `180` to flip the image.
      1. Set **Position** to `{0.55, 0},{0.5, 0}` to set the label near the middle of its parent button (55% from the left to the right of the parent button, and 50% from the top to the bottom of the parent button). This value isn't in the middle because an arrow doesn't _visually_ look like it's in the middle of the button at `{0.5, 0},{0.5, 0}`.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-8C.png" width="80%" />

1. Create the **SELECT** button.

   1. Insert an **ImageButton** into **Component**. Notice how this process keeps the select button separate from **SelectionFrame** so that you can add padding between the main part of the component from the select button.
   1. Select the new button, then in the **Properties** window,

      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `0.5, 1` to set the new button's origin point in the bottom-middle of itself (50% from the left to the right of the button, and 100% from the top to the bottom of the button).
      1. Set **BackgroundTransparency** to `0.15` to provide visual feedback on hover that the button is selectable.
      1. Set **Position** to `{0.5, 0},{0.99, 0}` to set the button near the bottom middle of its container (50% from the left to the right of the parent frame, and 99% from the top to the bottom of the parent frame).
      1. Set **Size** to `{0.17, 0},{0.18, 0}` to length the button underneath the blaster buttons (17% horizontally and 18% vertically of the parent frame).
      1. Set **Name** to **SelectButton**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-9B.png" width="80%" />

   1. Round the corners of the button.

      1. Insert a **UICorner** object into the button.
      1. Select the new corner object, then in the **Properties** window, set **CornerRadius** to `0.2, 0` to round the corners.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-9C.png" width="80%" />

   1. Insert a **TextLabel** object into the button so you can display a call to action.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to move the label to the middle of the button (50% from the left to the right of the parent button, and 50% from the top to the bottom of the parent button).
      1. Set **Size** to `{0.9, 0},{0.55, 0}` to widen the text space to almost all of the width of the parent label (90% horizontally and 55% vertically of the parent label).
      1. Set **Name** to **SelectTextLabel**.
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Medium** to thicken the font.
      1. Set **Text** to **SELECT**.
      1. Enable **TextScaled**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BS-9E.png" width="80%" />

1. Create a blaster button prefab.

   1. In the **ReplicatedStorage** service, create a folder structure to organize your UI objects. The sample uses an **Instances** folder with a child **Guis** folder.
   1. Insert an **ImageButton** object into the **Guis** folder.
   1. Select the new button, then in the **Properties** window,
      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `0.5, 0.5` to set the new button's origin point in the middle of itself (50% from the left to the right of the button, and 50% from the top to the bottom of the button).
      1. Set **BackgroundTransparency** to `0.65` to provide visual feedback that the button isn't in focus. Scripts in step 12 provide programmatic visual feedback when the button is in focus.
      1. Set **LayoutOrder** to `2`.
      1. Set **Name** to **BlasterButtonPrefab**.
      1. Set **Size** to `{0.8, 0},{0.8, 0}`.
      1. Set **ImageTransparency** to `1` to make the image completely transparent.
   1. Insert a **UIAspectRatioConstraint** into **BlasterButtonPrefab** to ensure the button's aspect ratio remains the same within the component no matter the player's screen size.
   1. Round the corners of the button.
      1. Insert a **UICorner** object into **BlasterButtonPrefab**.
      1. Select the **UICorner**, then in the **Properties** window, set **CornerRadius** to `0.05, 0` to round the corners.
   1. Insert an **ImageLabel** into **BlasterButtonPrefab**.
   1. Select the new label, then in the **Properties** window,
      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `0.5, 0.5` to set the new label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.52, 0},{0.497, 0}` to set the label near the middle of its parent button (52% from the left to the right of the parent button, and 49.7% from the top to the bottom of the parent button). This value isn't in the middle because the blaster doesn't _visually_ look like it's in the middle of the button at `{0.5, 0},{0.5, 0}`.
      1. Set **Size** to `{1.20, 0},{0.9, 0}` to widen the label area outside of the button (120% horizontally and 90% vertically of the parent button).
      1. Set **ScaleType** to **Fit**.

1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically display buttons for each blaster, scale the buttons when a player selects a button that isn't in focus, and attach a player's blaster selection to their avatar.

<Tabs>
  <TabItem key = "1" label="PickABlasterGuiController">

The following script requires a set of scripts that work together to create the blaster selector. When a player joins the experience or respawns back into a round after their health reaches zero, this script activates all of the blaster selector's UI elements until the player makes their selection.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GuiAttribute = require(ReplicatedStorage.GuiAttribute)
local setupBlasterButtons = require(script.setupBlasterButtons)
local connectResetSelectionOnEnabled = require(script.connectResetSelectionOnEnabled)

local localPlayer = Players.LocalPlayer
local gui = localPlayer.PlayerGui:WaitForChild("PickABlasterGui")

setupBlasterButtons(gui)
connectResetSelectionOnEnabled(gui)
gui:SetAttribute(GuiAttribute.selectedIndex, 1)
```

  </TabItem>
  <TabItem key = "2" label="setupBlasterButtons">

The following `PickABlasterGuiController.setupBlasterButtons` module script requires a set of scripts that generate the blaster buttons, navigation buttons, and select button. It starts by referencing `ReplicatedStorage.LaserBlastersFolder` to see how many blaster buttons it needs to generate within the blaster button container. This folder contains two `Class.Configuration` instances:

- **SingleBlaster** - Produces a single beam that inflicts 10 points of damage.
- **MultiBlaster** - Produces several beams with a wide, horizontal spread that each inflict 15 points of damage.

Each `Class.Configuration` instance includes properties and attributes that determine the blaster's behavior within a round, and its visual representation within the blaster selector.

<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/user-interface-design/Section3/SingleBlasterConfiguration.png" />
    <figcaption>SingleBlaster Configuration</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/user-interface-design/Section3/MultiBlasterConfiguration.png" />
    <figcaption>MultiBlaster Configuration</figcaption>
  </figure>
</GridContainer>

For example, the module script uses the following information to populate an individual blaster button prefab with unique visual characteristics for each `Class.Configuration` instance within the folder:

- `name` - The name of the `Class.Configuration` instance.
- `IconID` - The image that displays in the button prefab to communicate its respective blaster type.
- `iconLayoutOrder` - The left-to-right order buttons display in the blaster selector.

When a player is in the process of selecting a blaster, `guid:GetAttributeChangedSignal()` listens for when the `selectedIndex` attribute changes. When this attribute changes, the blaster buttons update according to the new `selectedIndex` value. You can learn more about the `selectedIndex` attribute in the `ReplicatedStorage.UpdateSelectedIndex`.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local setupSelectButton = require(script.setupSelectButton)
local setupNavButtons = require(script.setupNavButtons)
local updateSelectedIndex = require(script.updateSelectedIndex)
local GuiAttribute = require(ReplicatedStorage.GuiAttribute)

local laserBlastersFolder = ReplicatedStorage.Instances.LaserBlastersFolder
local blasterButtonPrefab = ReplicatedStorage.Instances.Guis.BlasterButtonPrefab

local function setupBlasterButtons(gui: ScreenGui)
	local frame = gui.Frame.SelectionFrame.Frame
	local blasterButtonContainer = frame.Container
	local blasterButtons = {}

	local function createBlasterButton(blasterConfiguration: Configuration)
		local index = blasterConfiguration:GetAttribute("iconLayoutOrder")

		local blasterButton = blasterButtonPrefab:Clone()
		-- Name the blaster button the same as the blaster, so we can read the name
		-- of the button later to get the associated blaster type
		blasterButton.Name = blasterConfiguration.Name
		blasterButton.ImageLabel.Image = blasterConfiguration:GetAttribute("iconId")
		blasterButton.LayoutOrder = index
		blasterButton.Parent = blasterButtonContainer

		blasterButton.Activated:Connect(function()
			gui:SetAttribute(GuiAttribute.selectedIndex, index)
		end)

		table.insert(blasterButtons, index, blasterButton)
	end

	for _, blaster in laserBlastersFolder:GetChildren() do
		createBlasterButton(blaster)
	end

	-- Setup other buttons that depend on the generated blasterButtons
	setupSelectButton(gui, blasterButtons)
	setupNavButtons(gui, blasterButtons)

	-- Change blaster buttons appearance when they are selected or deselected
	gui:GetAttributeChangedSignal(GuiAttribute.selectedIndex):Connect(function()
		local newIndex = gui:GetAttribute(GuiAttribute.selectedIndex)
		updateSelectedIndex(newIndex, blasterButtons)
	end)
end

return setupBlasterButtons
```

  </TabItem>
  <TabItem key = "3" label="updateSelectedIndex">

When a player selects a blaster button with a different `selectedIndex` value from their previous selection, the following `PickABlasterGuiController.setupBlasterButtons.updateSelectedIndex` module script updates the scale and transparency of both the previously selected blaster button and the newly selected blaster button.

To start, it defines a value for both selected and unselected buttons. When a player selects another button from the one that is currently in focus, the new selection becomes larger and more opaque than others within the blaster selector, and the previously selected button becomes the size of the button prefab and more translucent. The module script then updates the `newIndex` value, which also updates the `selectedIndex` attribute on the `PickABlasterGui`.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local blasterButtonPrefab = ReplicatedStorage.Instances.Guis.BlasterButtonPrefab

local prevIndex = nil

-- Size and BackgroundTransparency values for a selected and unselected button
local ImageButtonProperties = {
	Selected = {
		Size = UDim2.fromScale(1, 1),
		BackgroundTransparency = 0.1,
	},
	Unselected = {
		Size = blasterButtonPrefab.Size,
		BackgroundTransparency = blasterButtonPrefab.BackgroundTransparency,
	},
}

local function updateSelectedIndex(newIndex: number, blasterButtons: { ImageButton })
	local selectedProperties = ImageButtonProperties.Selected
	local selectedButton = blasterButtons[newIndex]
	selectedButton.Size = selectedProperties.Size
	selectedButton.BackgroundTransparency = selectedProperties.BackgroundTransparency

	local unselectedProperties = ImageButtonProperties.Unselected
	local deselectedButton = blasterButtons[prevIndex]
	if deselectedButton then
		deselectedButton.Size = unselectedProperties.Size
		deselectedButton.BackgroundTransparency = unselectedProperties.BackgroundTransparency
	end

	prevIndex = newIndex
end

return updateSelectedIndex
```

  </TabItem>
  <TabItem key = "4" label="setupSelectButton">

The following `PickABlasterGuiController.setupBlasterButtons.setupSelectButton` module script confirms the player's blaster selection with the server. To demonstrate, when a player presses the select button, this script gets the `blasterName` of the `selectedIndex`value. It then sends this info to the server so that it can equip the correct blaster type to their avatar.

For more information on what the server does with this information to equip the correct blaster type to the player, see [Add New Players](../gameplay-scripting/spawn-respawn.md#add-new-players) from the Gameplay Scripting curriculum.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GuiAttribute = require(ReplicatedStorage.GuiAttribute)
local blasterSelectedEvent = ReplicatedStorage.Instances.BlasterSelectedEvent

local function setupSelectButton(gui: ScreenGui, blasterButtons: { ImageButton })
	gui.Frame.SelectButton.Activated:Connect(function()
		-- During button generation, we set the name of the button to correspond to its associated blaster type
		local blasterName = blasterButtons[gui:GetAttribute(GuiAttribute.selectedIndex)].Name
		blasterSelectedEvent:FireServer(blasterName)
	end)
end

return setupSelectButton
```

  </TabItem>
  <TabItem key = "5" label="setupNavButtons">

The following `PickABlasterGuiController.setupBlasterButtons.setupNavButtons` module script listens for activations of the left and right navigation buttons. When a player presses the left navigation button, it subtracts `1` from the `selectedIndex` attribute, meaning that the new `selectedIndex` value becomes the blaster button to the left of the previous `selectedIndex` value. Similarly, when a player presses the right navigation button, it adds `1` to the `selectedIndex` attribute, meaning that the new `selectedIndex` value becomes the blaster button to the right of the previous `selectedIndex` value.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GuiAttribute = require(ReplicatedStorage.GuiAttribute)

local function setupNavButtons(gui: ScreenGui, blasterButtons: { ImageButton })
	local frame = gui.Frame.SelectionFrame.Frame
	local navigationButtonLeft = frame.NavigationButtonLeft
	local navigationButtonRight = frame.NavigationButtonRight

	navigationButtonLeft.Activated:Connect(function()
		local currentIndex = gui:GetAttribute(GuiAttribute.selectedIndex)
		local newIndex = math.clamp(currentIndex - 1, 1, #blasterButtons)
		gui:SetAttribute(GuiAttribute.selectedIndex, newIndex)
	end)

	navigationButtonRight.Activated:Connect(function()
		local currentIndex = gui:GetAttribute(GuiAttribute.selectedIndex)
		local newIndex = math.clamp(currentIndex + 1, 1, #blasterButtons)
		gui:SetAttribute(GuiAttribute.selectedIndex, newIndex)
	end)
end

return setupNavButtons
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player joins the experience or respawns back into a round after their health reaches zero, the blaster selector UI displays, they can make a selection, and each button functions as expected.
</Alert>

#### Blast button

A blast button is a UI component that players use to blast their blaster if they are accessing the experience through a mobile or tablet device. The sample laser tag experience uses a blaster button with an icon that depicts both a crosshair and a blast to communicate the button's function without text.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/BlasterButton-Intro.jpg" />
</figure>

To exactly recreate the blast button within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert an **ImageButton** into the **HUDGui** `Class.ScreenGui` object.

   1. In the **Explorer** window, navigate to the **StarterGui** service.
   1. Hover over its child **HUDGui** object, then click the **⊕** icon. A contextual menu displays.
   1. From the contextual menu, insert an **ImageButton**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/BlasterButton-1C.png" />

1. In the viewport, move the button to where a player's thumb naturally rests so you can get a visual sense of what the button will look like on a player's device, then in the **Properties** window,
   1. Set **Image** to `rbxassetid://18308375035` to display the blast button icon.
   1. Set **PressedImage** to `rbxassetid://18308372558` to display an inverted version of the blast button icon when a player presses the button.
   1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
   1. Set **Name** to **BlastButton**.
   1. Set **ScaleType** to **Fit** so the image fits within its container and doesn't stretch on various screen sizes.
   1. Set **ImageTransparency** to `0.3` to reduce the opacity of the label so that it matches all black UI elements in the experience.
1. Insert a **UIAspectRatioConstraint** into **BlastButton** to ensure the button's aspect ratio remains the same no matter the player's screen size.
1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically display the blaster button when a player is using touch input on a device that accepts touch controls.

<Tabs>
  <TabItem key = "1" label="HUDGuiSetup">

The following script requires a set of module scripts that work together to set up the main Heads Up Display (HUD), including `setupTouchButtonAsync`. After a player joins a round and selects their blaster, this script ensures all HUD UI elements display appropriately for the player's state, device, and team status.

```lua
local Players = game:GetService("Players")

local setPlayerPortrait = require(script.setPlayerPortrait)
local setPlayerName = require(script.setPlayerName)
local startSyncingTeamColor = require(script.startSyncingTeamColor)
local setObjective = require(script.setObjective)
local setupTouchButtonAsync = require(script.setupTouchButtonAsync)
local startSyncingTeamPoints = require(script.startSyncingTeamPoints)
local disableMouseWhileGuiEnabled = require(script.disableMouseWhileGuiEnabled)
local setupHitmarker = require(script.setupHitmarker)

local localPlayer = Players.LocalPlayer
local gui = localPlayer.PlayerGui:WaitForChild("HUDGui")

setPlayerPortrait(gui)
setPlayerName(gui)
startSyncingTeamColor(gui)
setObjective(gui)
startSyncingTeamPoints(gui)
disableMouseWhileGuiEnabled(gui)
setupHitmarker(gui)
setupTouchButtonAsync(gui)
```

  </TabItem>
  <TabItem key = "2" label="setupTouchButtonAsync">

The following `HUDGuiSetup.setupTouchButtonAsync` module script positions and scales the blaster button near the jump button if the player is accessing the experience with a device that supports touch controls, **and** they are using touch input.

It starts by using `Class.UserInputService.TouchEnabled` to check if the player is on a device that supports touch controls. If they are, the script waits for Roblox's core scripts to add the `TouchGui` jump button, then scales and positions `StarterGui.HUDGui.BlastButton` relative to the jump button. Specifically, it scales the blaster button to half of the jump button's size, and offsets the blaster button to the upper right of the jump button's position.

This technique is useful because the engine dynamically changes the size and position of its core UI according to the player's device, and the blaster button takes advantage of this preexisting logic so it can also automatically be in the correct relative size and position on any device.

To finish, the script checks the player's last input type to verify if they are using a device that supports touch controls but **aren't** using touch input, such as using a gamepad alongside a tablet. If so, the button becomes invisible.

```lua
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")

local localPlayer = Players.LocalPlayer

local TOUCH_BUTTON_SIZE_RATIO_TO_JUMP_BUTTON = 0.75

local function setupTouchButtonAsync(gui: ScreenGui)
	local blastButton = gui.BlastButton

	-- TouchEnabled only needs to be read once. If this device doesn't support touch input,
	-- then we don't need to do anything.
	if not UserInputService.TouchEnabled then
		return
	end

	-- Since touch is supported, set up the a touch button for firing the blaster.
	-- Base the size and position of our blast button off of the default jump button, which can differ by device

	-- Wait for Roblox core scripts to add the default JumpButton
	local jumpButton =
		localPlayer.PlayerGui:WaitForChild("TouchGui"):WaitForChild("TouchControlFrame"):WaitForChild("JumpButton")

	local function updateTouchButtonSizeAndPosition()
		local scaledTouchButtonSize = UDim2.fromOffset(
			jumpButton.AbsoluteSize.X * TOUCH_BUTTON_SIZE_RATIO_TO_JUMP_BUTTON,
			jumpButton.AbsoluteSize.Y * TOUCH_BUTTON_SIZE_RATIO_TO_JUMP_BUTTON
		)

		blastButton.Size = scaledTouchButtonSize
		blastButton.Position = jumpButton.Position + UDim2.fromOffset(jumpButton.AbsoluteSize.X, 0)
	end
	jumpButton:GetPropertyChangedSignal("AbsoluteSize"):Connect(updateTouchButtonSizeAndPosition)
	jumpButton:GetPropertyChangedSignal("AbsolutePosition"):Connect(updateTouchButtonSizeAndPosition)
	updateTouchButtonSizeAndPosition()

	-- Only show the touch button when user is using touch input
	local function updateTouchVisibility()
		local lastInputType = UserInputService:GetLastInputType()
		local isTouchInput = lastInputType == Enum.UserInputType.Touch
		blastButton.Visible = isTouchInput
	end
	UserInputService.LastInputTypeChanged:Connect(updateTouchVisibility)
	updateTouchVisibility()
end

return setupTouchButtonAsync
```

  </TabItem>
  <TabItem key = "3" label="UserInputHandler">

The following `ReplicatedStorage.UserInputHandler` client script connects the blast functionality with user input. If the player is using touch controls and the blaster button is enabled on their device, the script listens for touch activation on the blaster button, then activates `attemptBlastClient`. For more information on `attemptBlastClient`and blaster behavior, see [Check Whether the Player Can Blast](../gameplay-scripting/implement-blasters.md#check-whether-the-player-can-blast) from the Gameplay Scripting curriculum.

```lua
local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local attemptBlastClient = require(ReplicatedStorage.Blaster.attemptBlastClient)

local function onBlasterActivated(_actionName: string, inputState: Enum.UserInputState, _inputObject: InputObject)
	if inputState == Enum.UserInputState.Begin then
		attemptBlastClient()
	end
end

-- Listen for activation input
-- An 'actionName' is irrelevant as we never unbind the action
ContextActionService:BindAction("_", onBlasterActivated, false, Enum.UserInputType.MouseButton1, Enum.KeyCode.ButtonR2)

-- Listen for touch activation on the HUD blast button
local HUDGui = Players.LocalPlayer.PlayerGui:WaitForChild("HUDGui")
local blastButton = HUDGui.BlastButton
blastButton.MouseButton1Down:Connect(attemptBlastClient)
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, when a player joins the experience and uses touch input on a device that accepts touch controls, the blaster button displays to the top-right of the jump button.
</Alert>

### Player UI

Following the visual hierarchy best practices from [Wireframe Your Layouts](wireframe-your-layouts.md), this section teaches you how to implement all on-screen UI elements relating to the state of the player. This grouping of UI elements is near the sides of the screen because players can comprehend this peripheral information without diverting their attention from the gameplay.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/PlayerUI-Intro.png" />
</figure>

#### Player indicator

A player indicator is a UI component that players reference to quickly decipher what team they belong to as soon as they spawn into their team's spawn zone. The sample laser tag experience provides two versions of the player indicator depending on if the player is on the **green** or **pink** team.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Green-Team.jpg" width="100%"/>
    <figcaption>Green Team</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Creating-Teams/Pink-Team.jpg" width="100%"/>
    <figcaption>Pink Team</figcaption>
  </figure>
</GridContainer>

Following the guidance from [Select a Color Theme](choose-an-art-style.md#select-a-color-theme), both versions of the player indicator combine the team color with a unique, simple icon with minimal detail so that they remain legible on small screens. Providing two forms of visual feedback is important because it helps to keep the design accessible for players with colorblindness.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/PI-Intro.jpg" />
</figure>

To exactly recreate the player indicator component within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert a **Frame** into the **HUDGui** `Class.ScreenGui` object.
   1. In the **Explorer** window, navigate to the **StarterGui** service.
   1. Hover over its child **HUDGui** object, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert a **Frame**.
1. Select the new **Frame**, then in the **Properties** window,

   1. Set **AnchorPoint** to `0, 1` to set the frame's origin point in the bottom-middle of itself (0% from the left to the right of the frame, and 100% from the top to the bottom of the frame).
   1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
   1. Set **Name** to **PlayerDisplay**.
   1. Set **Position** to `{0.02, 0},{0.97, 0}` to set the frame near the bottom-left of the screen.
   1. Set **Size** to `{0.23, 0},{0.08, 0}` to both shorten and widen the frame.
   1. Enable **ClipsDescendants** to trim child GuiObjects that extend beyond the frame.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-2.jpg" width="80%" />

1. Create the polygonal shape.

   1. Insert an **ImageLabel** into **PlayerDisplay**.
   1. Select the new label, then in the **Properties** window,

      1. Set **Image** to `rbxassetid://14304828123` to display the trapezoid icon.
      1. Set **AnchorPoint** to `1, 1` to set the label's origin point in the bottom-right of itself (100% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Name** to **Block**.
      1. Set **Position** to `{1,0},{1,0}` to set the label to the right side of the frame.
      1. Set **Size** to `{1.858, 0},{0.581, 0}` to widen the label outside of the frame, and shorten it to a little over half the length of the frame.
      1. Set **ImageTransparency** to `0.15` to make the label slightly transparent.
      1. Set **ScaleType** to **Fit** so the image fits within its container and doesn't stretch on various screen sizes.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-3.jpg" width="80%" />

      1. Insert a **UIAspectRatioConstraint** into **Block** to ensure the label and its children UI elements' aspect ratio remains the same no matter the player's screen size.
      1. Select the new constraint, then in the **Properties** window, set **AspectRatio** to `13.78`.

1. Create the box for the player's portrait.

   1. Insert an **ImageLabel** into **PlayerDisplay**.
   1. Select the new label, then in the **Properties** window,

      1. Remove the placeholder asset ID within the **Image** property. The scripts in step 7 programmatically insert the player's portrait into the image label.
      1. Set **AnchorPoint** to `0, 1` to set the label's origin point in the bottom-left of itself (0% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundColor3** to `0, 0, 0` to set the label's background color to black.
      1. Set **BackgroundTransparency** to `0.3` to reduce the opacity of the label by 30%, and match all black UI elements in the experience.
      1. Set **Name** to **PlayerPortrait**.
      1. Set **Position** to `{0.11, 0},{1, 0}` to set the label to the left side of the polygonal shape.
      1. Set **Size** to `{0.23, 0},{1, 0}` to shrink the label.
      1. Set **ImageTransparency** to `0.15` to make the label slightly transparent.
      1. Set **ScaleType** to **Fit** so the image fits within its container and doesn't stretch on various screen sizes.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-4B.jpg" width="80%" />

      1. Insert a **UIAspectRatioConstraint** into **PlayerPortrait** to ensure the label and its children UI elements' aspect ratio remains the same no matter the player's screen size.
      1. Insert a **UICorner** into **PlayerPortrait**, then in the **Properties** window, set **CornerRadius** to `0.05, 0` to slightly round the corners.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-4D.jpg" width="80%" />

1. Create the text label for the player's name.

   1. Insert a **TextLabel** object into **PlayerDisplay**.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0, 0.5` to set the new button's origin point in the left-middle of itself (0% from the left to the right of the button, and 50% from the top to the bottom of the button).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Name** to **PlayerNameTextLabel**.
      1. Set **Position** to `{0.35, 0},{0.72, 0}` to set the label to the right side of its container (35% from the left to the right of the parent label, and 72% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.52, 0},{0.3, 0}` so the text can take up most of the polygonal shape area (52% horizontally and 30% vertically of the parent frame).
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Bold** to thicken the font.
      1. Remove the placeholder text within the **Text** property. The scripts in step 7 programmatically insert the player's name into the text label.
      1. Enable **TextScaled**.
      1. Set **TextXAlignment** to **Left**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-5.jpg" width="80%" />

1. Create the team icons and colors that display to the left of the player's portrait.

   1. Insert a **Folder** into **PlayerDisplay**, then rename it **TeamIcons**.
   1. Create the **green** team icon and color.

      1. Insert an **ImageLabel** into **TeamIcons**.
      1. Select the new label, then in the **Properties** window,
         1. Set **AnchorPoint** to `0, 1` to set the label's origin point in the bottom-left of itself (0% from the left to the right of the label, and 100% from the top to the bottom of the label).
         1. Set **BackgroundColor3** to `88, 218, 171` to set the label's background color to mint green.
         1. Set **Name** to **TeamAIcon**.
         1. Set **Position** to `{0, 0},{1, 0}` to set the label to the left side of the frame.
         1. Set **Size** to `{0.135, 0},{0.58, 0}` to shrink the label to the left of the player portrait.
         1. Set **ImageTransparency** to `1` to make the label transparent.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-6B1.jpg" width="80%" />

      1. Configure a custom attribute to track that this label is for the green team. This step is very important for the scripts in step 7.
         1. In the **Properties** window, navigate to the **Attributes** section, then click the plus icon. A pop-up dialog displays.
         1. In the **Name** field, input **teamColor**.
         1. In the **Type** dropdown menu, select **BrickColor**.
         1. Click the **Save** button.
         1. Set the new **teamColor** attribute to **Mint**.
      1. Insert a **UIAspectRatioConstraint** into **TeamAIcon** to ensure the label and its children UI elements' aspect ratio remains the same no matter the player's screen size.
      1. Create the icon.
         1. Insert an **ImageLabel** into **TeamAIcon**.
         1. Select the new label, then in the **Properties** window,
            1. Set **Image** to **rbxassetid://14309678670** to display the green team icon.
            1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
            1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
            1. Set **Name** to **Icon**.
            1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label to the middle of its parent label.
            1. Set **Size** to `{0.7, 0},{0.6, 0}` to shrink the label.
            1. Set **ScaleType** to **Fit** so the image fits within its container and doesn't stretch on various screen sizes.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-6B2.jpg" width="80%" />

   1. Create the **pink** team icon and color.

      1. Duplicate **TeamAIcon** and its children.
      1. Select the duplicate **TeamAIcon**, then in the **Properties** window,
         1. Set **BackgroundColor3** to `255, 170, 255` to set the label's background color to carnation pink.
         1. Set **Name** to **TeamBIcon**.
         1. Set the **teamColor** attribute to **Carnation Pink**.
         1. Select the duplicate **Icon** child of **TeamBIcon**, then in the **Properties** window, set **Image** to `rbxassetid://14309678549` to display the pink team icon.

      <img src="../../../assets/tutorials/user-interface-design/Section3/PI-6C.jpg" width="80%" />

1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically display the player indicator with the appropriate team color and icon while a player is active in a round.

<Tabs>
  <TabItem key = "1" label="HUDGuiSetup">

The following script requires a set of module scripts that work together to set up the main Heads Up Display (HUD), including `startSyncingTeamColor`, `setPlayerName`, and `setPlayerPortrait`. After a player joins a round and selects their blaster, this script ensures all HUD UI elements display appropriately for the player's state, device, and team status.

```lua
local Players = game:GetService("Players")

local setPlayerPortrait = require(script.setPlayerPortrait)
local setPlayerName = require(script.setPlayerName)
local startSyncingTeamColor = require(script.startSyncingTeamColor)
local setObjective = require(script.setObjective)
local setupTouchButtonAsync = require(script.setupTouchButtonAsync)
local startSyncingTeamPoints = require(script.startSyncingTeamPoints)
local disableMouseWhileGuiEnabled = require(script.disableMouseWhileGuiEnabled)
local setupHitmarker = require(script.setupHitmarker)

local localPlayer = Players.LocalPlayer
local gui = localPlayer.PlayerGui:WaitForChild("HUDGui")

setPlayerPortrait(gui)
setPlayerName(gui)
startSyncingTeamColor(gui)
setObjective(gui)
startSyncingTeamPoints(gui)
disableMouseWhileGuiEnabled(gui)
setupHitmarker(gui)
setupTouchButtonAsync(gui)
```

  </TabItem>
  <TabItem key = "2" label="startSyncingTeamColor">

After a player selects their blaster, the following `ReplicatedStorage.HUDGuiSetup.StartSyncingTeamColor` script calls the `setPlayerTeamIcon` function to match the player indicator's team color and icon to the player's corresponding team. It starts by checking the player's `Class.Player.TeamColor` value set by the `Class.Teams` service. If their `Class.Player.TeamColor|TeamColor` value equals **mint**, the **TeamAIcon** from step 6 becomes visible; conversely, if their `Class.Player.TeamColor|TeamColor` value equals **carnation pink**, the **TeamBIcon** from step 6 becomes visible.

For more information on how players sort into a team with a unique team color, see [Creating Teams](../gameplay-scripting/create-teams.md) in the Gameplay Scripting curriculum.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GuiAttribute = require(ReplicatedStorage.GuiAttribute)

local localPlayer = Players.LocalPlayer

local function setPlayerTeamIcon(gui: ScreenGui)
	for _, teamColorIcon in gui.PlayerDisplay.TeamIcons:GetChildren() do
		local iconTeamColor = teamColorIcon:GetAttribute(GuiAttribute.teamColor)
		teamColorIcon.Visible = localPlayer.TeamColor == iconTeamColor
	end
end

local function startSyncingTeamColor(gui: ScreenGui)
	setPlayerTeamIcon(gui)

	localPlayer:GetPropertyChangedSignal("Team"):Connect(function()
		setPlayerTeamIcon(gui)
	end)
end

return startSyncingTeamColor
```

  </TabItem>
  <TabItem key = "3" label="setPlayerPortrait">

The following `ReplicatedStorage.HUDGuiSetup.setPlayerPortrait` script sets the player portrait from step 4 to the player's avatar headshot.

```lua
local Players = game:GetService("Players")

local localPlayer = Players.LocalPlayer

local function setPlayerPortrait(gui: ScreenGui)
	local playerPortrait = gui.PlayerDisplay.PlayerPortrait

	local userId = localPlayer.UserId
	local thumbType = "AvatarHeadShot"
	local rbxthumbContentString = `rbxthumb://type={thumbType}&id={userId}&w=150&h=150`
	playerPortrait.Image = rbxthumbContentString
end

return setPlayerPortrait
```

  </TabItem>
  <TabItem key = "4" label="setPlayerName">

The following `ReplicatedStorage.HUDGuiSetup.setPlayerName` script sets the text in the text label from step 5 to the player's display name.

```lua
local Players = game:GetService("Players")

local localPlayer = Players.LocalPlayer

local function setPlayerName(gui: ScreenGui)
	gui.PlayerDisplay.PlayerNameTextLabel.Text = localPlayer.DisplayName
end

return setPlayerName
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player joins or rejoins the round after respawning, the player indicator displays on the bottom-left of their screen.
</Alert>

#### Force field screen

A force field screen is a UI element that overlays the viewport to inform players they're safe from enemy team fire while joining or rejoining a round. Following the aesthetic guidelines for icons from [Choose an Art Style](./choose-an-art-style.md), the sample laser tag experience utilizes a semi-transparent hexagonal pattern to symbolize a force field. This design decision not only reinforces the overall futuristic art style for all UI in the experience, but it also communicates the player's state without any text or additional guidance.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/Join-Complete.png" />
</figure>

To exactly recreate the force field screen within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert an **ImageLabel** into the **ForceFieldGui** `Class.ScreenGui` object.

   1. In the **Explorer** window, navigate to the **StarterGui** service.
   1. Hover over its child **ForceFieldGui** object, then click the **⊕** icon. A contextual menu displays.
   1. From the contextual menu, insert an **ImageLabel**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Join-1C.png" />

1. Select the new label, then in the **Properties** window,

   1. Set **Image** to `rbxassetid://14462567888`.
   1. Set **BackgroundTransparency** to `0.8` to make the force field translucent.
   1. Set **Size** to `{1, 0},{1, 0}` to make the image fill the entire screen (100% horizontally and 100% vertically of the parent ScreenGui).
   1. Set **ScaleType** to **Tile** to make the hexagon tile across the entire screen.
   1. Set **TileSize** to `{0, 104},{0, 180}`.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Join-2E.png" width="80%" />

1. Insert a **UIGradient** object into the label.
1. Select the new gradient object, then in the **Properties** window,

   1. Set **Color** to a color sequence that starts blue, turns white, then turns blue again.

      1. Set **Color** to `120, 192, 250` to apply a light blue hue to all of the hexagons.
      1. Click the **Color** property, then click the **&ctdot;** button. A color sequence pop-up displays.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Join-4Ai.png" />

         Each triangle on the bottom axis of the color sequence is a keypoint that determines the color value of the property at that point of the image from left to right.

      1. Click and drag on the color sequence until you reach a **Time** value of `0.05`, then click the small square next to **Color** to open the **Colors** pop-up window.
      1. Select a bright white, then close the pop-up window.
      1. Click and drag on the color sequence until you reach a **Time** value of `0.95`, then open the **Colors** pop-up window again, and select the same color white as before.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Join-4Av1.png" width="80%" />

   1. Set **Rotation** to `225` to make the blue part of your color sequence display in the top-left and bottom-right corners.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Join-4Av2.png" width="80%" />

   1. Set **Transparency** to a number sequence that makes the force field look like it's shimmering.

      1. Click the **Transparency** property, then click the **&ctdot;** button. A number sequence pop-up displays. Each square at the start and end of the number sequence is a keypoint that determines the transparency value of the property at that point of the image from left to right.

      1. Set the following time and value properties throughout the number sequence:

      - **Time** = `0`, **Value** = `0.25`
      - **Time** = `.101`, **Value** = `0.875`
      - **Time** = `.183`, **Value** = `0`
      - **Time** = `.3`, **Value** = `1`
      - **Time** = `.7`, **Value** = `1`
      - **Time** = `1`, **Value** = `0.9`

      <img src="../../../assets/tutorials/user-interface-design/Section3/Join-4Cii1.png" width="80%" />

      <img src="../../../assets/tutorials/user-interface-design/Section3/Join-4Cii2.png" width="80%" />

1. Duplicate the **ImageLabel** from step 2.
1. Select the **UIGradient** object within the duplicate label, then in the **Properties** window,

   1. Set **Rotation** to `-45` to flip the image so that it nearly mirrors each other along the Y axis.

      <img src="../../../assets/tutorials/user-interface-design/Section3/Join-6A.png" width="80%" />

   1. Modify **Transparency** to make the shimmer look more organic.

      1. Click the **Transparency** property, then click the **&ctdot;** button. A number sequence pop-up displays.
      1. Select the third keyframe, then click the **Delete** button.

       <img src="../../../assets/tutorials/user-interface-design/Section3/Join-6C.png" width="80%" />

1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically display the force field screen while a player joins or rejoins a round.

<Tabs>
  <TabItem key = "1" label="ForceFieldClientVisuals">

The following `ReplicatedStorage.ForceFieldClientVisuals` client script substitutes the default `Class.ForceField` visual with `StarterGui.ForceFieldGui`. When players load into an experience and spawn on a `Class.SpawnLocation` with a `Duration` property that is greater than 0, the default behavior in every experience is to provide their avatar with a protective blue orb that momentarily prevents them from losing health.

This script starts by listening to when the `Class.ForceField` is added to a character, disables the default first-person force field visuals, then enables the **ForceFieldGui** `Class.ScreenGui` object. Note that this does **not** impact third-person visuals when players look at other players respawning back into the experience.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/First-Person-Visuals.png" alt="First-person force field visuals include a futuristic hexagonal grid on the perimeter of the screen." width="100%"/>
    <figcaption>First-person force field visuals</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/gameplay-scripting/Spawn-Respawn/Third-Person-Visuals.png" alt="Third-person force field visuals include a blue sparkling orb around the player spawning into the experience." width="100%"/>
    <figcaption>Third-person force field visuals</figcaption>
  </figure>
</GridContainer>

```lua
local Players = game:GetService("Players")

local localPlayer = Players.LocalPlayer

local function onCharacterAddedAsync(character: Model)
	local forceField = character:WaitForChild("ForceField", 3)
	if not forceField then
		-- If the player spawns at a spawn point with ForceField disabled
		return
	end

	forceField.Visible = false
	localPlayer.PlayerGui:WaitForChild("ForceFieldGui").Enabled = true
	forceField.Destroying:Wait()
	localPlayer.PlayerGui.ForceFieldGui.Enabled = false
end

if localPlayer.Character then
	onCharacterAddedAsync(localPlayer.Character)
end

localPlayer.CharacterAdded:Connect(onCharacterAddedAsync)
```

  </TabItem>
  <TabItem key = "2" label="scheduleDestroyForceField">

After a player selects their blaster, the following `ReplicatedStorage.scheduleDestroyForceField` module script listens for three conditions to check when to disable the **ForceFieldGui** `Class.ScreenGui` object:

- They blast their blaster.
- They reset their character.
- They are in the round for 8 seconds.

Once the player meets one of these three conditions, they can receive damage from the enemy team. For more information on these conditions, see [Customize Force Fields](../gameplay-scripting/spawn-respawn.md#customize-force-fields) from the Gameplay Scripting curriculum.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local getBlasterStateAttribute = require(ReplicatedStorage.Blaster.getBlasterStateAttribute)
local BlasterState = require(ReplicatedStorage.Blaster.BlasterState)

local MAX_FORCE_FIELD_TIME = 8

local function destroyForceField(player: Player)
	if not player.Character then
		return
	end

	local forceField = player.Character:FindFirstChildWhichIsA("ForceField")
	if forceField then
		forceField:Destroy()
	end
end

local function scheduleDestroyForceField(player: Player)
	if not player then
		player = Players.LocalPlayer
	end

	local attributeChangedConnection, characterRespawnedConnection
	local forceFieldEnded = false

	local function endForceField()
		-- Set a debounce flag to avoid trying to destroy the same force field more than once
		if forceFieldEnded then
			return
		end
		forceFieldEnded = true

		attributeChangedConnection:Disconnect()
		characterRespawnedConnection:Disconnect()
		destroyForceField(player)
	end

	-- This listens for the first activation of the blaster, disabling the ForceField
	-- to avoid an unfair situation where a player uses their blaster while protected by the ForceField
	local blasterStateAttribute = getBlasterStateAttribute()
	attributeChangedConnection = player:GetAttributeChangedSignal(blasterStateAttribute):Connect(function()
		local currentBlasterState = player:GetAttribute(blasterStateAttribute)
		if currentBlasterState == BlasterState.Blasting then
			endForceField()
		end
	end)

	-- This listens for the character to despawn, ensuring we cancel all our listeners and give the next
	-- character a fresh start if the character respawns (e.g. player resets) before the timeout ends or the player blasts
	characterRespawnedConnection = player.CharacterRemoving:Connect(endForceField)

	-- This handles the timeout for the ForceField after a blaster is selected
	task.delay(MAX_FORCE_FIELD_TIME, endForceField)
end

return scheduleDestroyForceField
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player joins or rejoins the round after respawning, the new force field screen UI displays instead of the default first-person `Class.ForceField` visuals.
</Alert>

#### Respawn screen

A respawn screen is a UI element that dims the viewport to inform players that they have been tagged out, and that the server is in the process of respawning them back to their spawn zone. This UI element is important because it gives players time to process that they've been tagged out, and strategize their next move before they rejoin the active round.

For more information on custom respawning behavior in the sample laser tag experience, see [Respawn Characters](../gameplay-scripting/spawn-respawn.md#respawn-characters) from the Gameplay Scripting curriculum.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/Respawn-Complete.png" />
</figure>

To exactly recreate the respawn screen within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Create the center information banner.

   1. Insert an **ImageLabel** into the **OutStateGui** `Class.ScreenGui` object.

      1. In the **Explorer** window, navigate to the **StarterGui** service.
      1. Hover over its child **OutStateGui** object, then click the **⊕** icon. A contextual menu displays.
      1. From the contextual menu, insert an **ImageLabel**.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Respawn-1A.png" />

   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the new button's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label in the middle of its container (50% from the left to the right of the parent ScreenGui, and 50% from the top to the bottom of the parent ScreenGui).
      1. Set **Size** to `{0.48, 0},{0.06, 0}` to widen the label (48% horizontally and 6% vertically of the parent ScreenGui).
      1. Set **Name** to **Block**.
      1. Set **Image** to `rbxassetid://14304827265` to make the image a trapezoid.
      1. Set **ImageColor** to `0,0,0` to make the trapezoid black.
      1. Set **ImageTransparency** to `0.3` to reduce the opacity of the label by 30%, and match all black UI elements in the experience.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Respawn-1B.png" width="80%" />

   1. Insert a **UIAspectRatioConstraint** into **Block** to ensure the label and its children UI elements' aspect ratio remains the same no matter the player's screen size.
   1. Select the new constraint, then in the **Properties** window, set **AspectRatio** to `13.78`.
   1. Insert a **TextLabel** into **Block** for the informational text.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label in the middle of its parent label (50% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{.85, 0},{0.55, 0}` so the text can take up most of the trapezoid area (85% horizontally and 55% vertically of the parent label).
      1. Set **Name** to **BodyTextLabel**.
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Bold** to thicken the font.
      1. Set **Text** to **Respawning…**.
      1. Set **TextColor3** to `255, 255, 255` to make the text white.
      1. Enable **TextScaled**.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Respawn-1F.png" width="80%" />

1. Create the header.

   1. Insert an **ImageLabel** into **Block**.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 1` to set the label's origin point in the bottom-middle of itself (50% from the left to the right of the label, and 100% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0, 0}` to set the label at the top-middle of its parent label (50% from the left to the right of the parent label, and 0% from the top to the bottom of the parent label).
      1. Set **Size** to `{0.46, 0},{0.56, 0}` to widen the label (46% horizontally and 56% vertically of the parent label).
      1. Set **Name** to **Header**.
      1. Set **Image** to `rbxassetid://14304826985` to make the image a multi-directional fade.
      1. Set **ImageColor** to `245, 46, 46` to make the fade red to signify that the player is temporarily inactive while they're tagged out of the round.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Respawn-2B.png" width="80%" />

   1. Insert a **TextLabel** into **Header** for the informational text.
   1. Select the new label, then in the **Properties** window,

      1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label in the middle of its parent label (50% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{.85, 0},{0.55, 0}` so the text can take up most of the fade area (85% horizontally and 55% vertically of the parent label).
      1. Set **Name** to **HeaderTextLabel**.
      1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
      1. Set **Weight** to **Black** to thicken the font.
      1. Set **Text** to **TAGGED - YOU'RE OUT!**
      1. Set **TextColor3** to `255, 255, 255` to make the text white.
      1. Enable **TextScaled**.

         <img src="../../../assets/tutorials/user-interface-design/Section3/Respawn-2D.png" width="80%" />

1. Create the fade around the borders of the screen.

   1. Insert an **ImageLabel** into **OutStateGui**.
   1. Select the new label, then in the **Properties** window,
      1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundColor3** to `0,0,0` to set the label's background color to black.
      1. Set **BackgroundTransparency** to `0.5` to make the label's background halfway transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label at the middle of its container (50% from the left to the right of the parent ScreenGui, and 50% from the top to the bottom of the parent ScreenGui).
      1. Set **Size** to `{1, 0},{1, 0}` to widen the label to the whole screen (100% horizontally and 100% vertically of the parent ScreenGui).
      1. Set **ZIndex** to `-1` to display the fade behind the other UI elements.
      1. Set **Name** to **Header**.
      1. Set **Image** to `rbxassetid://14309518613` to make the image a border fade.
      1. Set **ImageTransparency** to `0.1` to make the fade slightly translucent.

   <Alert severity="info">
      To improve performance, you can skip the image asset and instead use a `Class.UIGradient` object with a custom transparency number sequence. To learn more about this fade technique, see [UI Appearance Modifiers - Gradient](../../../ui/appearance-modifiers.md#gradient).
   </Alert>

1. Reference the following `Class.ReplicatedStorage` script within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically displays the respawn screen when a player's health reaches zero, and they're in the process of respawning back to their team's spawn zone.

<Tabs>
  <TabItem key = "1" label="PlayerStateHandler">

The following `ReplicatedStorage.PlayerStateHandler` client script contains functions that trigger different types of behavior according to the `playerState` attribute. All event responses are logically grouped together in this script because they require similar behavior of enabling or disabling player controls, camera movement, and which UI layer is visible.

When a player's health reaches zero, their `playerState` becomes `TaggedOut`, which triggers the `onTaggedOut()` function. `onTaggedOut()` immediate triggers the following behavior:

- The player can't move in the arena.
- The player can't move their camera.
- The player can't use their blaster.
- The `StarterGui.OutStateGui` becomes exclusively enabled.

When the player respawns, their `playerState` becomes `SelectingBlaster`, which triggers the `onSelectingBlaster()` function. `onSelectingBlaster()` then exclusively enables the `StarterGui.PickABlasterGui`, which automatically disables the respawn screen. For more information on these conditions, see [Handle Client State](../gameplay-scripting/spawn-respawn.md#handle-client-state) from the Gameplay Scripting curriculum.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local PlayerState = require(ReplicatedStorage.PlayerState)
local PlayerAttribute = require(ReplicatedStorage.PlayerAttribute)
local BlasterState = require(ReplicatedStorage.Blaster.BlasterState)
local togglePlayerMovement = require(script.togglePlayerMovement)
local togglePlayerCamera = require(script.togglePlayerCamera)
local scheduleDestroyForceField = require(ReplicatedStorage.scheduleDestroyForceField)

local localPlayer = Players.LocalPlayer

local playerGui = localPlayer.PlayerGui
local guiLayers = {
	playerGui:WaitForChild("HUDGui"),
	playerGui:WaitForChild("OutStateGui"),
	playerGui:WaitForChild("PickABlasterGui"),
}

-- Disable all UI Layers except the given exception
local function setGuiExclusivelyEnabled(enabledGui: ScreenGui?)
	-- guiLayers contains a list of the guis that should be set exclusively.
	for _, screenGui in guiLayers do
		screenGui.Enabled = screenGui == enabledGui
	end
end

local function onSelectingBlaster()
	-- Enable the camera so players can look around while selecting a blaster
	togglePlayerCamera(true)
	togglePlayerMovement(false)
	setGuiExclusivelyEnabled(playerGui.PickABlasterGui)

	-- Disable blaster while selecting a blaster
	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Disabled)
end

local function onPlaying()
	-- Enable player movement after picking a blaster
	togglePlayerMovement(true)
	setGuiExclusivelyEnabled(playerGui.HUDGui)

	-- Enable blaster while playing
	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Ready)

	-- Schedule the destroy force field logic when the player begins playing
	scheduleDestroyForceField()
end

local function onTaggedOut()
	-- Disable controls while tagged out
	togglePlayerMovement(false)
	togglePlayerCamera(false)
	setGuiExclusivelyEnabled(playerGui.OutStateGui)

	-- Disable blaster while tagged out
	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Disabled)
end

local function onInLobby()
	-- Enable controls while in the lobby
	togglePlayerMovement(true)
	togglePlayerCamera(true)

	-- Hide all HUD while in the lobby
	setGuiExclusivelyEnabled(nil)

	-- Disable blaster while in the lobby
	localPlayer:SetAttribute(PlayerAttribute.blasterStateClient, BlasterState.Disabled)
end

local function onPlayerStateChanged(newPlayerState: string)
	if newPlayerState == PlayerState.SelectingBlaster then
		onSelectingBlaster()
	elseif newPlayerState == PlayerState.Playing then
		onPlaying()
	elseif newPlayerState == PlayerState.TaggedOut then
		onTaggedOut()
	elseif newPlayerState == PlayerState.InLobby then
		onInLobby()
	else
		warn(`Invalid player state ({newPlayerState})`)
	end
end

-- Handle the initial player state if set
local initialPlayerState = localPlayer:GetAttribute(PlayerAttribute.playerState)
onPlayerStateChanged(initialPlayerState)

local function updateFromPlayerState()
	onPlayerStateChanged(localPlayer:GetAttribute(PlayerAttribute.playerState))
end

-- Handle future player state updates
localPlayer:GetAttributeChangedSignal(PlayerAttribute.playerState):Connect(updateFromPlayerState)

-- Make sure changes are still applied after respawning
localPlayer.CharacterAdded:Connect(updateFromPlayerState)
```

  </TabItem>
  <TabItem key = "2" label="">

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player's health reaches zero, the respawn screen displays until the player respawns back into their spawn zone.
</Alert>

<Alert severity = 'info'>
Now that you are familiar with common `Class.GuiObject|GuiObjects` for on-screen UI, try to recreate the **RoundResultsGui** `Class.ScreenGui` object and all of its children for the on-screen display when players win or lose a match. You can use the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) `.rbxl` file as a reference, or adjust the values to meet the gameplay requirements of your own experience.
</Alert>

## Create SurfaceGui objects

To display UI on a part's surface in the 3D space that responds to scripting logic for **each individual player**, you can parent a `Class.SurfaceGui` object to the part that you want to display your UI within the `Class.ReplicatedStorage` service. This technique ensures your UI and its scripting logic are available to both the server and each player's client.

`Class.SurfaceGui` objects contain all `Class.GuiObject|GuiObjects` that display on a part's surface in the 3D space. The sample laser tag experience only includes one instance of a `Class.SurfaceGui` object: the cooldown meter that displays over each player's blaster. This object needs scripting logic for every player because it actively responds to each individual player's input, and provides visual feedback of when they can blast their blaster again.

To create a `Class.SurfaceGui` object:

1. In the **Explorer** window, hover over the **ReplicatedStorage** service, then click the **⊕** icon. A contextual menu displays.
1. From the contextual menu, insert a **Part** object.
1. Insert a **ScreenGui** object into the part.
1. Rename the **SurfaceGui** according to the context of its child UI elements.
1. Repeat this process for every UI element you need to display on a part's surface in the 3D space.

<img src="../../../assets/tutorials/user-interface-design/Section3/SurfaceGuiContainers.png" width="320" />

### Cooldown meter

A cooldown meter is a UI component that informs players how long they have to wait before they're able to blast their blaster again. This slight pause prevents players from being able to blast as quickly as they can click or press a button, which is unrealistic for laser tag gameplay.

<video controls src="../../../assets/tutorials/user-interface-design/Section3/CooldownMeter-Intro.mp4" width="70%"></video>

To exactly recreate the cooldown meter within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Create a part to hold your `Class.SurfaceGui` object.

   1. In the **Explorer** window, hover over the **Workspace**, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert a **block** part. This is a temporary location for the part so that you can visualize the changes in each step of the process.

1. Position and orient the part around the position of where a player's character would hold their blaster, then in the **Properties** window,

   1. Set **Transparency** to 1 to make the part completely transparent.
   1. Set **Name** to **CooldownBarPrefab**.
   1. Set **Size** to `0.169, 0.027, 2.537` to scale the part to a size about the length of the blaster.
   1. Disable **CanCollide** and **CanQuery**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/CooldownMeter-2D.png" width="80%" />

1. Insert a **SurfaceGui** into **CooldownBarPrefab**.
1. Select the new **SurfaceGui**, then in the **Properties** window,

   1. Set **Face** to **Top** so the UI displays facing upward.
   1. Set **LightInfluence** and **MaxDistance** to `0`.
   1. Set **PixelsPerStud** to `200`.

      <img src="../../../assets/tutorials/user-interface-design/Section3/CooldownMeter-3C.png" width="80%" />

1. Create the black bar.

   1. Insert an **ImageLabel** into the **SurfaceGui**.
   1. Select the new label, then in the **Properties** window,

      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundColor3** to `0,0,0` to set the label's background color to black.
      1. Set **BackgroundTransparency** to `0.4` to make the label's background semi-transparent.
      1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label at the middle of its container (50% from the left to the right of the parent SurfaceGui, and 50% from the top to the bottom of the parent SurfaceGui).
      1. Set **Size** to `{1, 0},{1, 0}` to widen the label to the whole part (100% horizontally and 100% vertically of the parent SurfaceGui).
      1. Set **Name** to **Container**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/CooldownMeter-4B.png" width="80%" width="80%" />

1. Round the corners of the container.

   1. Insert a **UICorner** object into **Container**.
   1. Select the **UICorner**, then in the **Properties** window, set **CornerRadius** to `0.15, 0` to slightly round the corners.

      <img src="../../../assets/tutorials/user-interface-design/Section3/CooldownMeter-5B.png" width="80%" />

1. Create the red bar.
   1. Insert an **ImageLabel** into **Container**.
   1. Select the new label, then in the **Properties** window,
      1. Remove the default **Image** value.
      1. Set **AnchorPoint** to `1, 0.5` to set the label's origin point in the right-middle of itself (100% from the left to the right of the label, and 50% from the top to the bottom of the label).
      1. Set **BackgroundColor3** to `172, 13, 13` to set the label's background color to a dark red.
      1. Set **BackgroundTransparency** to `0.2` to make the label's background slightly transparent.
      1. Set **Name** to **Bar**.
      1. Set **Position** to `{1, 0},{0.5, 0}` to set the label at the right-middle of its container (100% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
      1. Set **Size** to `{0, 0},{1, 0}` to lengthen the label to the top of its parent label (0% horizontally and 100% vertically of the parent label). This step is also beneficial for the tweening behavior that occurs in the scripts in step 8.
1. Round the corners of the label.
   1. Insert a **UICorner** object into **Bar**.
   1. Select the **UICorner**, then in the **Properties** window, set **CornerRadius** to `0.15, 0` to slightly round the corners.
1. Move **CooldownBarPrefab** to **ReplicatedStorage**.

   1. Create a folder structure to organize your UI objects. The sample uses an **Instances** folder with a child **Guis** folder.

      <img src="../../../assets/tutorials/user-interface-design/Section3/CooldownMeter-9A.png" />

   1. Move **CooldownBarPrefab** into **Guis**.

1. Reference the following `Class.ReplicatedStorage` scripts within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically attach the cooldown meter to the player's blaster, then animate the red bar after a player blasts their blaster.

<Tabs>
  <TabItem key = "1" label="FirstPersonBlasterVisuals">

The following `ReplicatedStorage.FirstPersonBlasterVisuals` client script handles all visual logic for the player's first-person blaster. It requires a set of module scripts that work together to set up blaster visuals that feel more realistic for laser tag gameplay, including `FirstPersonBlasterVisuals.addCooldownBar` and `FirstPersonBlasterVisuals.runCooldownBarEffect`.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
local RunService = game:GetService("RunService")

local BlastData = require(ReplicatedStorage.Blaster.BlastData)
local PlayerAttribute = require(ReplicatedStorage.PlayerAttribute)
local PlayerState = require(ReplicatedStorage.PlayerState)
local getBlasterConfig = require(ReplicatedStorage.Blaster.getBlasterConfig)

local runBlastVisuals = require(script.runBlastVisuals)
local setupAnimations = require(script.setupAnimations)
local addCooldownBar = require(script.addCooldownBar)
local runCooldownBarEffect = require(script.runCooldownBarEffect)

local laserBlastedBindableEvent = ReplicatedStorage.Instances.LaserBlastedBindableEvent

local RIG_OFFSET_FROM_CAMERA = CFrame.new(2, -2, -3) * CFrame.Angles(math.rad(0.25), math.rad(95.25), 0)

local localPlayer = Players.LocalPlayer
local currentCamera = Workspace.CurrentCamera

local rigModel = nil
local cooldownBar = nil
local animations = {}

local function addFirstPersonVisuals()
	local blasterConfig = getBlasterConfig()

	-- Add the first person rig
	rigModel = blasterConfig.RigModel:Clone()
	rigModel.Parent = Workspace

	-- Add the cooldownBar
	cooldownBar = addCooldownBar(rigModel.PrimaryPart.CooldownBarAttachment)

	animations = setupAnimations(blasterConfig, rigModel)
end

local function removeFirstPersonVisuals()
	for _, animation in animations do
		animation:Stop()
		animation:Destroy()
		animation = nil
	end
	if rigModel then
		-- This also destroys the cooldown bar since it is parented to the rig
		rigModel:Destroy()
		rigModel = nil
	end
end

-- Run first person visual effects when a blast occurs
laserBlastedBindableEvent.Event:Connect(function(blastData: BlastData.Type)
	runBlastVisuals(rigModel.PrimaryPart.TipAttachment, blastData, animations.blastAnimation)
	runCooldownBarEffect(cooldownBar)
end)

-- Bind the rig to the camera if it exists
RunService.RenderStepped:Connect(function()
	if rigModel then
		-- Update to rig's CFrame relative to the camera's position and RIG_OFFSET_FROM_CAMERA
		rigModel:PivotTo(currentCamera.CFrame * RIG_OFFSET_FROM_CAMERA)
	end
end)

-- Handles changing visuals when the blasterType changes while playing
localPlayer:GetAttributeChangedSignal(PlayerAttribute.blasterType):Connect(function()
	local playerState = localPlayer:GetAttribute(PlayerAttribute.playerState)
	if playerState == PlayerState.Playing then
		removeFirstPersonVisuals()
		addFirstPersonVisuals()
	end
end)

-- Handles changing visuals when the playerState changes
localPlayer:GetAttributeChangedSignal(PlayerAttribute.playerState):Connect(function()
	local newPlayerState = localPlayer:GetAttribute(PlayerAttribute.playerState)
	-- Remove the visuals when the player is selecting a blaster or is in the lobby
	if newPlayerState == PlayerState.SelectingBlaster or newPlayerState == PlayerState.InLobby then
		removeFirstPersonVisuals()
	-- Add the visuals back when the player finishes selecting the blaster.
	elseif newPlayerState == PlayerState.Playing then
		addFirstPersonVisuals()
	end
end)
```

  </TabItem>
  <TabItem key = "2" label="addCooldownBar">

The following `FirstPersonBlasterVisuals.addCooldownBar` module script attaches a new instance of the cooldown meter to the player's blaster. When a player selects a blaster, the script moves and welds the cooldown meter part to the blaster in a location that tilts the cooldown meter toward the camera.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local cooldownBarPrefab = ReplicatedStorage.Instances.Guis.CooldownBarPrefab

local function addCooldownBar(attachment: Attachment): Part
	local part = cooldownBarPrefab:Clone()

	-- Move and weld the cooldown bar part to the blaster
	part:PivotTo(attachment.WorldCFrame)

	local weld = Instance.new("WeldConstraint")
	weld.Part0 = attachment.Parent
	weld.Part1 = part
	weld.Parent = part

	-- Make sure the weld is setup prior to parenting to the blaster
	part.Parent = attachment.Parent

	return part
end

return addCooldownBar
```

  </TabItem>
  <TabItem key = "3" label="runCooldownBarEffect">

The following `FirstPersonBlasterVisuals.runCooldownBarEffect` module script handles the tweening visual effect that communicates the blaster is unable to blast again until the red bar is no longer visible. When a player blasts their blaster, the script sets `Bar` to the full width of `Container`, then tweens the size down to `0` for the duration of `secondsBetweenBlasts`. Once the size of `Bar` is `0`, the player can blast again, and the entire process repeats.

For more information on blaster behavior, see [Implement Blasters](../gameplay-scripting/implement-blasters.md) from the Gameplay Scripting curriculum.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local getBlasterConfig = require(ReplicatedStorage.Blaster.getBlasterConfig)

local END_SIZE = UDim2.fromScale(0, 1)
local EASING_DIRECTION = Enum.EasingDirection.In
local EASING_STYLE = Enum.EasingStyle.Quad

local function runCooldownBarEffect(part: Part)
	local bar = part.SurfaceGui.Container.Bar

	-- Set bar size to 1 (bar filled)
	bar.Size = UDim2.fromScale(1, 1)

	-- Tween the size to 0 (bar empty) for the duration of secondsBetweenBlasts
	local secondsBetweenBlasts = getBlasterConfig():GetAttribute("secondsBetweenBlasts")
	local tweenInfo = TweenInfo.new(secondsBetweenBlasts, EASING_STYLE, EASING_DIRECTION)
	local propertyTable = {
		Size = END_SIZE,
	}
	local tween = TweenService:Create(bar, tweenInfo, propertyTable)
	tween:Play()
end

return runCooldownBarEffect
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player blasts their blaster, the cooldown bar animates to communicate when the player can blast again.
</Alert>

## Create BillboardGui objects

In order to display UI elements within the 3D space that respond to scripting logic and always face each player's camera regardless of their viewing angle, such as player names or map markers, you can create a `Class.BillboardGui` object as a child of a `Class.BasePart` or `Class.Attachment` that exists in the 3D space.

The sample laser tag experience includes two separate `Class.BillboardGui` objects within the `Class.ReplicatedStorage` service:

- **OtherPlayerIndicatorGuiPrefab** - Displays a pink or green circle above each player's head when they are active in a round.
- **TaggedOutIndicatorGuiPrefab** - Displays above a player's head when they are tagged out of the round.

After you create a `Class.BillboardGui` object, you can create and customize its child `Class.GuiObject|GuiObjects` according to each container's purpose. To demonstrate, in the immediate sections that follow, you will learn how to implement UI elements for both indicator types within the sample laser tag experience. **You can adjust any part of the process to meet the specifications of your own experience**.

To create a `Class.BillboardGui` object:

1. In the **Explorer** window, hover over a `Class.BasePart` or `Class.Attachment`, then click the **⊕** icon. A contextual menu displays.
1. From the contextual menu, insert a **BillboardGui** object.
1. Rename the **BillboardGui** according to the context of its child UI elements.
1. Repeat this process for every UI element you need to contextually display above players' heads.

### Team indicator

A team indicator is a UI element that informs players which team other players in the round belong to so that they can easily differentiate between their allies and enemy team members. This information is important because the gameplay of a first-person shooter experience requires players to make quick strategic decisions while they're in combat zones so that they don't get tagged out and lose the match.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/Team-Indicator-Intro.jpg" />
</figure>

To exactly recreate the team indicator within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert a **BillboardGui** object into a temporary rig.

   1. From the toolbar's **Home** or **Avatar** tab, click **Character**.
   1. Select from the available options. The sample uses a **R15** rig type, a **feminine** body shape, and a **Rthro** avatar. The rig displays both in the 3D viewport and in the **Explorer** window under the name **Rig**.
   1. In the **Explorer** window, navigate to the rig's child **Head** mesh, then click the **⊕** icon. A contextual menu displays.
   1. From the contextual menu, insert a **BillboardGui**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/TI-1.jpg" width="80%" />

1. Select the new **BillboardGui**, then in the **Properties** window,

   1. Set **LightInfluence** to `0` to prevent environmental light from affecting the color of the indicator.
   1. Set **Name** to **OtherPlayerIndicatorPrefab**.
   1. Set **Size** to `{0, 10},{0, 10}` to make the label significantly smaller.
   1. Set **StudsOffsetWorldSpace** to `0, 4, 0` to position it above the rig's head.

      <img src="../../../assets/tutorials/user-interface-design/Section3/TI-2.jpg" width="80%" />

1. Insert a **Frame** object into **OtherPlayerIndicatorPrefab**.
1. Select the new frame, then in the **Properties** window,

   1. Set **AnchorPoint** to `0.5, 0.5` to set the frame's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
   1. Set **BackgroundColor3** to `255, 3, 0` to set the frame's background color to red as a placeholder color.
   1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the frame to the middle of its container (50% from the left to the right of the parent BillboardGui, and 50% from the top to the bottom of the parent BillboardGui).
   1. Set **Size** to `{1, -2},{1, -2}` to shorten the frame to the surface area of the BillboardGui.

      <img src="../../../assets/tutorials/user-interface-design/Section3/TI-4.jpg" width="80%" />

1. Insert a **UICorner** object into **Frame** to completely round the corners.

   <img src="../../../assets/tutorials/user-interface-design/Section3/TI-5.jpg" width="80%" />

1. Insert a **UIStroke** object into **Frame** to outline the circle of the indicator.

   <img src="../../../assets/tutorials/user-interface-design/Section3/TI-6.jpg" width="80%" />

1. Move **OtherPlayerIndicatorPrefab** to **ReplicatedStorage**.
1. Reference the following `Class.ReplicatedStorage` script within the sample [Laser Tag 1A](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically displays the team indicator for every player in an active round unless they are on the enemy team and occluded.

<Tabs>
  <TabItem key = "1" label="OtherPlayerIndicatorGuiSetup">

The following `ReplicatedStorage.OtherPlayerIndicatorGuiSetup` script runs when players spawn into the arena for an active round. It attaches the team indicator by calling the `addIndicatorToCharacter()` function, which locates the `Head` object of each player character participating in the round. If they don't already have a team indicator, the script then clones and adds the **otherPlayerIndicatorPrefab** UI to the character's `Head`, and sets the team indicator color to their team color.

If other players are on the same team, the team indicator always displays, even if they hide behind objects in the 3D space; if other players are on the enemy team, the team indicator only displays if there isn't an object in the 3D space to occlude them.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local localPlayer = Players.LocalPlayer
local otherPlayerIndicatorPrefab = ReplicatedStorage.Instances.Guis.OtherPlayerIndicatorPrefab

local characterSpawnConnectionsByPlayer: { [Player]: RBXScriptConnection } = {}
local playerAddedConnection: RBXScriptConnection?

local function removeIndicatorFromPlayer(player: Player)
	if not player.Character then
		return
	end

	local head = player.Character:WaitForChild("Head", 3)
	if not head then
		return
	end

	local gui = head:FindFirstChild(otherPlayerIndicatorPrefab.Name)
	if gui then
		gui:Destroy()
	end
end

local function addIndicatorToCharacter(otherCharacter: Model?)
	local otherPlayer = Players:GetPlayerFromCharacter(otherCharacter)
	if not otherPlayer then
		return
	end

	task.spawn(function()
		local otherHead = otherCharacter:WaitForChild("Head", 3)
		if not otherHead then
			return
		end

		-- Only add indicators to players participating in the round
		if not otherPlayer.Team then
			return
		end

		-- Avoid adding duplicate indicators, creating a new one only if it doesn't exist
		local gui = otherHead:FindFirstChild(otherPlayerIndicatorPrefab.Name)
		if not gui then
			gui = otherPlayerIndicatorPrefab:Clone()
			gui.Frame.BackgroundColor3 = otherPlayer.TeamColor.Color
			gui.Parent = otherHead
		end

		-- The indicator is always on top only if the player is friendly

		local isFriendly = otherPlayer.Team == localPlayer.Team
		gui.AlwaysOnTop = isFriendly
	end)
end

local function addIndicatorWhenCharacterSpawns(player: Player)
	if characterSpawnConnectionsByPlayer[player] then
		return
	end
	local connection = player.CharacterAdded:Connect(addIndicatorToCharacter)
	characterSpawnConnectionsByPlayer[player] = connection
end

local function stopSyncingIndicators()
	for _, connection in characterSpawnConnectionsByPlayer do
		connection:Disconnect()
	end
	table.clear(characterSpawnConnectionsByPlayer)

	if playerAddedConnection then
		playerAddedConnection:Disconnect()
		playerAddedConnection = nil
	end

	for _, player in Players:GetPlayers() do
		removeIndicatorFromPlayer(player)
	end
end

local function addIndicatorToPlayer(player: Player)
	if player == localPlayer then
		return
	end

	addIndicatorToCharacter(player.Character)
	addIndicatorWhenCharacterSpawns(player)
end

local function startSyncingIndicators()
	for _, player in Players:GetPlayers() do
		addIndicatorToPlayer(player)
	end

	if not playerAddedConnection then
		playerAddedConnection = Players.PlayerAdded:Connect(addIndicatorToPlayer)
	end
end

local function onLocalTeamChanged()
	local localTeam = localPlayer.Team
	if localTeam then
		startSyncingIndicators()
	else
		stopSyncingIndicators()
	end
end

localPlayer:GetPropertyChangedSignal("Team"):Connect(onLocalTeamChanged)
onLocalTeamChanged()
```

  </TabItem>
  <TabItem key = "2" label="">

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player's is in an active round, team indicators display over other players' heads unless they are on the enemy team and behind an object.
</Alert>

### Tagged out indicator

A tagged out indicator is a UI element that informs players when other players are no longer active in the round and are in the process of respawning back to their spawn zone. This information is important because the gameplay of a first-person shooter experience requires players to move onto their next target as soon as they tag out a player so that they don't become vulnerable in the arena by playing in the same location for too long.

<figure>
    <img width="90%" img src="../../../assets/tutorials/user-interface-design/Section3/TOI-Intro.png" />
</figure>

To exactly recreate the tagged out indicator within the sample [Laser Tag](https://www.roblox.com/games/14817965191/Laser-Tag-1A) experience:

1. Insert a **BillboardGui** object into a temporary rig so that you can visualize the changes in each step of the process.

   1. From the toolbar's **Home** or **Avatar** tab, click **Character**.
   1. ​Select from the available options. The sample uses a **R15** rig type, a **masculine** body shape, and a **Rthro** avatar. The rig displays both in the 3D viewport and in the **Explorer** window under the name **Rig**.
   1. In the **Explorer** window, navigate to the rig's child **Head** mesh, then click the **⊕** icon. A contextual menu displays.
   1. From the contextual menu, insert a **BillboardGui**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/TOI-1.png" width="80%" />

1. Select the new **BillboardGui**, then in the **Properties** window,

   1. Set **LightInfluence** to `0` to prevent environmental light from affecting the color of the indicator.
   1. Set **Name** to **TaggedOutIndicatorGuiPrefab**.
   1. Set **Size** to `{3, 0},{0.5, 0}` to widen the space for a label.
   1. Set **StudsOffset** to `0, 3.25, 0` to position it above a player's head.

      <img src="../../../assets/tutorials/user-interface-design/Section3/TOI-2.png" width="80%" />

1. Insert an **ImageLabel** object into **TaggedOutIndicatorGuiPrefab**.
1. Select the new label, then in the **Properties** window,

   1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
   1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
   1. Set **Name** to **Frame**.
   1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label to the middle of its container (50% from the left to the right of the parent BillboardGui, and 50% from the top to the bottom of the parent BillboardGui).
   1. Set **Size** to `{1, 0},{1, 0}` to widen the label to the whole BillboardGui (100% horizontally and 100% vertically of the parent BillboardGui).
   1. Set **Image** to `rbxassetid://14304826985` to make the image a multi-directional fade.
   1. Set **ImageColor** to `245, 46, 46` to tint the label red.

   <Alert severity="info">
      To improve performance, you can skip the image asset and instead use a `Class.UIGradient` object with a custom transparency number sequence. To learn more about this fade technique, see [UI Appearance Modifiers - Gradient](../../../ui/appearance-modifiers.md#gradient).
   </Alert>

      <img src="../../../assets/tutorials/user-interface-design/Section3/TOI-4.png" width="80%" />

1. Insert a **TextLabel** object into **Frame**.
1. Select the new label, then in the **Properties** window,

   1. Set **AnchorPoint** to `0.5, 0.5` to set the label's origin point in the middle of itself (50% from the left to the right of the label, and 50% from the top to the bottom of the label).
   1. Set **BackgroundTransparency** to `1` to make the label's background completely transparent.
   1. Set **Name** to **BodyTextLabel**.
   1. Set **Position** to `{0.5, 0},{0.5, 0}` to set the label to the middle of its container (50% from the left to the right of the parent label, and 50% from the top to the bottom of the parent label).
   1. Set **Size** to `{0.85, 0},{0.7, 0}` so the text can take up most of the fade area (85% horizontally and 70% vertically of the parent image label).
   1. Set **FontFace** to **Montserrat** to fit the futuristic aesthetic.
   1. Set **Weight** to **Bold** to thicken the font.
   1. Set **Text** to **TAGGED**.
   1. Set **TextColor3** to `255, 255, 255` to make the text white.
   1. Enable **TextScaled**.

      <img src="../../../assets/tutorials/user-interface-design/Section3/TOI-6.png" width="80%" />

1. Move **TaggedOutIndicatorGuiPrefab** to **ReplicatedStorage**.
1. Reference the following `Class.ServerScriptService` scripts within the sample [Laser Tag 1A](https://www.roblox.com/games/14817965191/Laser-Tag-1A) place file that programmatically display the tagged out indicator while a player is respawning back to their team's spawn zone.

<Tabs>
  <TabItem key = "1" label="SetupHumanoid">

The following `ServerScriptService.SetupHumanoid` server script runs as soon as a player loads the experience. It ensures that whenever a player's character is added to the data model, `setupHumanoidAsync` is called with their `Class.Humanoid`.

```lua
local Players = game:GetService("Players")

local setupHumanoidAsync = require(script.setupHumanoidAsync)

local function onCharacterAdded(player: Player, character: Model)
	local humanoid = character:WaitForChild("Humanoid")
	setupHumanoidAsync(player, humanoid)
end

local function onPlayerAdded(player: Player)
	-- Call onCharacterAdded if the player already has a character
	if player.Character then
		onCharacterAdded(player, player.Character)
	end
	-- Call onCharacterAdded for all future character spawns for this player
	player.CharacterAdded:Connect(function(character: Model)
		onCharacterAdded(player, character)
	end)
end

-- Call onPlayerAdded for any players already in the game
for _, player in Players:GetPlayers() do
	onPlayerAdded(player)
end
-- Call onPlayerAdded for all future players
Players.PlayerAdded:Connect(onPlayerAdded)
```

  </TabItem>
  <TabItem key = "2" label="setupHumanoidAsync">

The following `SetupHumanoid.setupHumanoidAsync` module script configures settings on the player character's `Class.Humanoid` that ensures that their name and health display during a round, as long as they aren't occluded. In addition, this script listens for the `Died` event in the player character's `Class.Humanoid` when their health reaches zero.

Once a player is tagged out from their health reaching zero, the script disables `BreakJointsOnDeath` to prevent the default behavior of the character falling apart, then it runs all logic within `setupHumanoidAsync.onHumanoidDied`.

```lua
local onHumanoidDied = require(script.onHumanoidDied)

local function setupHumanoidAsync(player: Player, humanoid: Humanoid)
	-- Give each humanoid full control over its name/health display distance
	humanoid.DisplayDistanceType = Enum.HumanoidDisplayDistanceType.Subject

	-- Set name and health display distances to a sufficiently large value to show display name
	-- and health bar at any practical distance, as long as it is not occluded
	humanoid.NameDisplayDistance = 1000
	humanoid.HealthDisplayDistance = 1000
	humanoid.NameOcclusion = Enum.NameOcclusion.OccludeAll
	humanoid.HealthDisplayType = Enum.HumanoidHealthDisplayType.AlwaysOn

	-- Prevent character from falling apart when health is depleted
	humanoid.BreakJointsOnDeath = false

	humanoid.Died:Wait()
	onHumanoidDied(player, humanoid)
end

return setupHumanoidAsync

```

  </TabItem>
  <TabItem key = "3" label="onHumanoidDied">

The following `setupHumanoidAsync.onHumanoidDied` module script handles all of the logic when a player character's `Class.Humanoid` is tagged out from a round. The script starts by changing the `playerState` to`TaggedOut`, which allows other scripts to trigger behavior for the player whose health reached zero, such as displaying the first-person respawn screen.

The script then clones and adds the tagged out indicator to the character's `Head` so other players know they are in the process of respawning back to their team's spawn zone. In addition, it adds an `AlignOrientation` instance to the character so that it doesn't fall over due to gravity or other players colliding with the character.

When the player respawns, their `playerState` becomes `SelectingBlaster`, automatically disabling the tagged out indicator. `SetupHumanoid`handles calling `setupHumanoidAsync`, then the process starts again.

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local PlayerState = require(ReplicatedStorage.PlayerState)
local PlayerAttribute = require(ReplicatedStorage.PlayerAttribute)
local taggedOutIndicatorGuiPrefab = ReplicatedStorage.Instances.Guis.TaggedOutIndicatorGuiPrefab

local function onHumanoidDied(player: Player, humanoid: Humanoid)
	-- Update player state to be tagged out except when they're in the lobby,
	-- which happens when they're tagged out right as the round ends
	if player:GetAttribute(PlayerAttribute.playerState) ~= PlayerState.InLobby then
		player:SetAttribute(PlayerAttribute.playerState, PlayerState.TaggedOut)
	end

	-- Add Tagged Out indicator to character
	local newIndicator = taggedOutIndicatorGuiPrefab:Clone()
	local character = humanoid.Parent
	newIndicator.Parent = character:FindFirstChild("Head")

	-- Add an AlignOrientation to the character to prevent it from falling over
	local alignOrientation = Instance.new("AlignOrientation")
	alignOrientation.RigidityEnabled = true
	alignOrientation.Mode = Enum.OrientationAlignmentMode.OneAttachment
	alignOrientation.Attachment0 = humanoid.RootPart.RootAttachment
	alignOrientation.CFrame = humanoid.RootPart.CFrame
	alignOrientation.Parent = humanoid.RootPart
end

return onHumanoidDied
```

  </TabItem>
</Tabs>

<Alert severity = 'success'>
Now, whenever a player's health reaches zero, the tagged out indicator displays above their head until they respawn.
</Alert>

Congratulations on completing the User Interface Design Curriculum! Now that you have experience creating an art style, wireframing your layouts, and implementing your designs in Studio from start to finish, you can extend your project with new UI and functionality, or follow additional tutorial curricula, such as the [Gameplay Scripting Curriculum](../gameplay-scripting/index.md) that teaches you about the general organization and key implementation details of the sample laser tag experience. Happy creating!
