local function onDragDrop(dragData)
	print("PluginDragDropped")
	if dragData.MimeType == "text/plain" then
		textLabel.Text = dragData.Data
	else
		textLabel.Text = dragData.MimeType
	end
end

dragTargetWidget.PluginDragDropped:Connect(onDragDrop)dragData.MimeTypedragData.DatatextLabel.TextdragTargetWidget.Titlelocal dragTargetWidget = plugin:CreateDockWidgetPluginGui("Drop Target", widgetInfo)
dragTargetWidget.Title = "Drop Target"

-- This TextLabel will display what was dropped
local textLabel = Instance.new("TextLabel")
textLabel.Size = UDim2.new(1, 0, 1, 0)
textLabel.Text = "Drop here..."
textLabel.Parent = dragTargetWidgettextLabel.ParenttextLabel.SizeVector2.zerolocal function onButton1Down()
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

dragButton.MouseButton1Down:Connect(onButton1Down)-- Create the widget first
local widgetInfo = DockWidgetPluginGuiInfo.new(Enum.InitialDockState.Float, true, true, 300, 200)
local dragSourceWidget = plugin:CreateDockWidgetPluginGui("Drag Source", widgetInfo)
dragSourceWidget.Title = "Drag Source"

-- Create a TextButton that will initiate the drag
local dragButton = Instance.new("TextButton")
dragButton.Size = UDim2.new(1, 0, 1, 0)
dragButton.Text = "Drag me!"
dragButton.Parent = dragSourceWidgetdragSourceWidget.TitledragButton.TextdragButton.Sizelocal frame = Instance.new("Frame")
frame.BackgroundTransparency = 1  -- Hide the frame
frame.Size = UDim2.new(1, 0, 1, 0)  -- Cover the screen
frame.Position = UDim2.new(0, 0, 0, 0)
frame.Parent = testWidget

local function onInputBegan(inputObject)
	-- Process the input object here, for example detect key presses
end
frame.InputBegan:Connect(onInputBegan)dragButton.Parent1frame.BackgroundTransparencyframe.Positionframe.Sizeframe.Parent# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
