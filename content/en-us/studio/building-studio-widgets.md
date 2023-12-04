---
title: Building Studio Widgets
description: Building custom widgets in Studio allows you to customize workflows and views.
---

Studio gives you the power to create custom **widgets** and use them as Studio tools and extensions. These widgets behave as custom windows/panels in Studio, and you can dock them inside of your interface or have them float as separate windows.

## Creating Widget UIs

All Studio widgets begin as `Class.DockWidgetPluginGui` objects which you can fill with `Class.GuiObject|GuiObjects`, such as text labels and buttons. To create an empty widget GUI, call the `Class.Plugin:CreateDockWidgetPluginGui()|CreateDockWidgetPluginGui()` function, passing in an ID and a `Datatype.DockWidgetPluginGuiInfo` object.

Note the `Datatype.DockWidgetPluginGuiInfo.new()` constructor expects its parameters in a **specific order** as follows:

<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>`Enum.InitialDockState`</td>
      <td>Enum</td>
      <td>One of the `Enum.InitialDockState` enumerations.</td>
    </tr>
    <tr>
      <td>2</td>
      <td>`InitialEnabled`</td>
      <td>Boolean</td>
      <td>The initial enabled (visible) state of the widget GUI.</td>
    </tr>
    <tr>
      <td>3</td>
      <td>`InitialEnabledShouldOverrideRestore`</td>
      <td>Boolean</td>
      <td>If true, the value of **InitialEnabled** overrides the previously saved enabled state.</td>
    </tr>
    <tr>
      <td>4</td>
      <td>`FloatingXSize`</td>
      <td>Integer</td>
      <td>The initial width of the GUI when **InitialDockState** is set to `Enum.InitialDockState.Float`.</td>
    </tr>
    <tr>
      <td>5</td>
      <td>`FloatingYSize`</td>
      <td>Integer</td>
      <td>The initial height of the GUI when **InitialDockState** is set to `Enum.InitialDockState.Float`.</td>
    </tr>
    <tr>
      <td>6</td>
      <td>`MinWidth`</td>
      <td>Integer</td>
      <td>The minimum width of the GUI, with some platform-specific variations.</td>
    </tr>
    <tr>
      <td>7</td>
      <td>`MinHeight`</td>
      <td>Integer</td>
      <td>The minimum height of the GUI, with some platform-specific variations.</td>
    </tr>
  </tbody>
</table>

```lua
-- Create new "DockWidgetPluginGuiInfo" object
local widgetInfo = DockWidgetPluginGuiInfo.new(
	Enum.InitialDockState.Float,  -- Widget will be initialized in floating panel
	true,   -- Widget will be initially enabled
	false,  -- Don't override the previous enabled state
	200,    -- Default width of the floating window
	300,    -- Default height of the floating window
	150,    -- Minimum width of the floating window
	150     -- Minimum height of the floating window
)

-- Create new widget GUI
local testWidget = plugin:CreateDockWidgetPluginGui("TestWidget", widgetInfo)
testWidget.Title = "Test Widget"  -- Optional widget title
```

<Alert severity="warning">
   You cannot use the `Class.Plugin:CreateDockWidgetPluginGui()|CreateDockWidgetPluginGui()` function in game scripts. You can only call it from the command bar or a [plugin](../studio/plugins.md) script.
</Alert>

### Customizing Widget UI

Once you create a widget, you can customize its user interface with `Class.GuiObject|GuiObjects` such as informative `Class.TextLabel|TextLabels` or interactive `Class.ImageButton|ImageButtons`. For example, the following code adds a basic `Class.TextButton` to the GUI window:

```lua
-- Create new widget GUI
local testWidget = plugin:CreateDockWidgetPluginGui("TestWidget", widgetInfo)
testWidget.Title = "Test Widget"  -- Optional widget title

local testButton = Instance.new("TextButton")
testButton.BorderSizePixel = 0
testButton.TextSize = 20
testButton.TextColor3 = Color3.new(1,0.2,0.4)
testButton.AnchorPoint = Vector2.new(0.5,0.5)
testButton.Size = UDim2.new(1,0,1,0)
testButton.Position = UDim2.new(0.5,0,0.5,0)
testButton.SizeConstraint = Enum.SizeConstraint.RelativeYY
testButton.Text = "Click Me"
testButton.Parent = testWidget
```

<Alert severity="info">
   Note that **you must parent the button to the widget** in the same way that you must parent any in-experience screen `Class.GuiObject` to a `Class.ScreenGui`.
</Alert>

<Alert severity="warning">
   To help you build consistent, effective Studio widgets, Roblox provides a [GitHub repo](https://github.com/Roblox/StudioWidgets) that contains GUI elements with a standard "Studio" look and feel. These include checkboxes, radio buttons, and input fields which have a Studio style, and they all support dark theme.
</Alert>

### Changing Studio Color Themes

Effective Studio widgets ideally match the Studio **theme** setting and dynamically adjust when the theme changes. For instance, if a developer is using the dark theme, the widget's background color, images, and text labels should look nice alongside Studio's native theme colors.

The following code addition uses a `syncGuiColors()` function which is initially called along with a table of GUI objects to sync. Inside the function, a nested `setColors()` function loops through the objects and syncs specific aspects of them using `Class.StudioTheme:GetColor()|GetColor()` with `Enum.StudioStyleGuideColor` enums. This `setColors()` function is immediately run to sync the Studio theme, then it's connected to the `Class.Studio.ThemeChanged|ThemeChanged` event to detect future theme changes.

```lua
testButton.Parent = testWidget

local function syncGuiColors(objects)
	local function setColors()
		for _, guiObject in objects do
			-- Sync background color
			guiObject.BackgroundColor3 = settings().Studio.Theme:GetColor(Enum.StudioStyleGuideColor.MainBackground)
			-- Sync text color
			guiObject.TextColor3 = settings().Studio.Theme:GetColor(Enum.StudioStyleGuideColor.MainText)
		end
	end
	-- Run 'setColors()' function to initially sync colors
	setColors()
	-- Connect 'ThemeChanged' event to the 'setColors()' function
	settings().Studio.ThemeChanged:Connect(setColors)
end

-- Run 'syncGuiColors()' function to sync colors of provided objects
syncGuiColors({testButton})
```

### Customizing Mouse Cursors

To improve the expected interaction with widget elements, you can set system-specific **mouse cursors** to GUI events, such as `Class.GuiObject.MouseEnter|MouseEnter` and `Class.GuiObject.MouseLeave|MouseLeave`. The following code demonstrates how to connect a function to the `Class.GuiObject.MouseEnter|MouseEnter` and `Class.GuiObject.MouseLeave|MouseLeave` events of `testButton` to change the mouse cursor:

```lua
local function setCursor(cursorAsset)
	plugin:GetMouse().Icon = cursorAsset
end

testButton.MouseEnter:Connect(function()
	setCursor("rbxasset://SystemCursors/PointingHand")
end)
testButton.MouseLeave:Connect(function()
	setCursor("")
end)
```

Reference the following table for a list of mouse cursors and their potential use cases:

<table>
  <thead>
    <tr>
      <th>Mouse Cursor Icon</th>
      <th>Asset</th>
      <th>Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-Pointer.png" /></td>
      <td>`rbxasset://SystemCursors/Arrow`</td>
      <td>Default clicking and selection.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-PointingHand.png" /></td>
      <td>`rbxasset://SystemCursors/PointingHand`</td>
      <td>Hovering over an active link/button.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-OpenHand.png" /></td>
      <td>`rbxasset://SystemCursors/OpenHand`</td>
      <td>Hovering over a draggable item.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-GrabbingHand.png" /></td>
      <td>`rbxasset://SystemCursors/ClosedHand`</td>
      <td>Dragging an item.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-IBeam.png" /></td>
      <td>`rbxasset://SystemCursors/IBeam`</td>
      <td>Hovering in a text field.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeNS.png" /></td>
      <td>`rbxasset://SystemCursors/SizeNS`</td>
      <td>Hovering over a vertical resize handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeEW.png" /></td>
      <td>`rbxasset://SystemCursors/SizeEW`</td>
      <td>Hovering over a horizontal resize handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeNESW.png" /></td>
      <td>`rbxasset://SystemCursors/SizeNESW`</td>
      <td>Hovering over a corner resize handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeNWSE.png" /></td>
      <td>`rbxasset://SystemCursors/SizeNWSE`</td>
      <td>Hovering over a corner resize handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeAll.png" /></td>
      <td>`rbxasset://SystemCursors/SizeAll`</td>
      <td>Hovering over a multi-direction resize handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeSplitV.png" /></td>
      <td>`rbxasset://SystemCursors/SplitNS`</td>
      <td>Hovering over a vertical "split" handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-ResizeSplitH.png" /></td>
      <td>`rbxasset://SystemCursors/SplitEW`</td>
      <td>Hovering over a horizontal "split" handle.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-Forbidden.png" /></td>
      <td>`rbxasset://SystemCursors/Forbidden`</td>
      <td>Hovering over a locked/forbidden item.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-Wait.png" /></td>
      <td>`rbxasset://SystemCursors/Wait`</td>
      <td>Indicating an action is in progress.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-Busy.png" /></td>
      <td>`rbxasset://SystemCursors/Busy`</td>
      <td>	Indicating the system is busy.</td>
    </tr>
    <tr>
      <td><img src="../assets/studio/plugins/Mouse-Icon-Crosshair.png" /></td>
      <td>`rbxasset://SystemCursors/Cross`</td>
      <td>Hovering over a pinpoint selection area.</td>
    </tr>
  </tbody>
</table>

<Alert severity="warning">
   Note that these cursor looks are only an approximation — the actual cursors match your default operating system cursors.
</Alert>

## Gathering User Input

UI elements such as `Class.TextBox` and `Class.TextButton` work normally in Studio widgets, and you can build interfaces just like you normally would on Roblox. However, `Class.UserInputService` and `Class.ContextActionService` don't work since these services expect the main game window to be in focus.

One workaround for generic input events is to create a transparent `Class.Frame` and overlay it over the entire screen. The following code sample creates a frame, and when the user clicks on the frame, the `Class.GuiObject.InputBegan` event captures keyboard input on the frame until the user clicks away:

```lua
local frame = Instance.new("Frame")
frame.BackgroundTransparency = 1  -- Hide the frame
frame.Size = UDim2.new(1, 0, 1, 0)  -- Cover the screen
frame.Position = UDim2.new(0, 0, 0, 0)
frame.Parent = testWidget

local function onInputBegan(inputObject)
	-- Process the input object here, for example detect key presses
end
frame.InputBegan:Connect(onInputBegan)
```

## Drag-and-Drop Interaction

Using drag-and-drop interactions for your widgets is a simple way to improve the flow of data. To create this interaction, you must define the element to drag, initiate the drag, create a drop target, and process the drop action.

### Creating a Drag Source

You can start a drag action by calling
`Class.Plugin:StartDrag()` when the user
presses a mouse button on some UI element, typically a
`Class.TextButton` or
`Class.ImageButton` within a widget. The following code sample creates a single
window widget with a text button inside it.

```lua
-- Create the widget first
local widgetInfo = DockWidgetPluginGuiInfo.new(Enum.InitialDockState.Float, true, true, 300, 200)
local dragSourceWidget = plugin:CreateDockWidgetPluginGui("Drag Source", widgetInfo)
dragSourceWidget.Title = "Drag Source"

-- Create a TextButton that will initiate the drag
local dragButton = Instance.new("TextButton")
dragButton.Size = UDim2.new(1, 0, 1, 0)
dragButton.Text = "Drag me!"
dragButton.Parent = dragSourceWidget
```

### Initiating the Drag

When the user clicks on the
`Class.TextButton`, you can initiate drag through the `Class.GuiButton.MouseButton1Down|MouseButton1Down()` event which fires as soon as the user presses the mouse button.

Within the connected function, determine the data to drag. The data's **type** should be
reflected in the `MimeType` key, the **content** of the drag should be reflected
within the `Data` key, and the **sender** should describe itself in the `Sender`
key. See the `Class.Plugin:StartDrag()` page for more details.

```lua
local function onButton1Down()
	local dragInfo = {
		Data = "Hello, world",      -- The data being dragged
		MimeType = "text/plain",    -- Describes the MIME type of the data
		Sender = "SomeDragSource",  -- Describes from where the data originated
		MouseIcon = "",             -- Image content to use for the cursor
		DragIcon = "",              -- Image content to render under the cursor during drag
		HotSpot = Vector2.zero -- Where on the DragIcon to center the cursor
	}
	plugin:StartDrag(dragInfo)
end

dragButton.MouseButton1Down:Connect(onButton1Down)
```

### Creating a Drop Target

The `Class.PluginGui.PluginDragDropped`
event fires when the user releases their mouse on a window during a drag. When
this occurs, you need to define a **drop target** such as a second widget with a
`Class.TextLabel` to detect drops.

```lua
local dragTargetWidget = plugin:CreateDockWidgetPluginGui("Drop Target", widgetInfo)
dragTargetWidget.Title = "Drop Target"

-- This TextLabel will display what was dropped
local textLabel = Instance.new("TextLabel")
textLabel.Size = UDim2.new(1, 0, 1, 0)
textLabel.Text = "Drop here..."
textLabel.Parent = dragTargetWidget
```

### Processing the Drop Action

After creating a drop target, connect the `Class.PluginGui.PluginDragDropped` event on the drop target widget:

```lua
local function onDragDrop(dragData)
	print("PluginDragDropped")
	if dragData.MimeType == "text/plain" then
		textLabel.Text = dragData.Data
	else
		textLabel.Text = dragData.MimeType
	end
end

dragTargetWidget.PluginDragDropped:Connect(onDragDrop)
```

While a drag is still in progress, these three events fire as the user moves their mouse over a widget:

- `Class.PluginGui.PluginDragEntered|PluginDragEntered` – fires when the user hovers the mouse over a window
- `Class.PluginGui.PluginDragMoved|PluginDragMoved` –
  fires repeatedly as the user moves their mouse over a window. This is useful
  for showing a "Drop here!" message.
- `Class.PluginGui.PluginDragLeft|PluginDragLeft` – fires
  when the user's cursor leaves a window. This is useful for hiding a "Drop here!" message.
