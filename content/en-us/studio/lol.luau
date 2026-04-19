local ChangeHistoryService = game:GetService("ChangeHistoryService")
local ServerScriptService = game:GetService("ServerScriptService")
local Selection = game:GetService("Selection")

-- Create a new toolbar section and Plugins menu folder titled "Custom"
local toolbar = plugin:CreateToolbar("Custom")

-- Add a toolbar button labeled "Empty Script"
local newScriptButton = toolbar:CreateButton("Empty Script", "Create an empty script", "rbxassetid://14978048121")

-- Make button clickable even if 3D viewport is hidden
newScriptButton.ClickableWhenViewportHidden = true

local function onPluginButtonClicked()
	local selectedObjects = Selection:Get()
	local parent = selectedObjects[1] or ServerScriptService
	local recordingIdentifier = ChangeHistoryService:TryBeginRecording("Add empty script")

	if not recordingIdentifier then
		return
	end
	local newScript = Instance.new("Script")
	newScript.Source = ""
	newScript.Parent = parent
	ChangeHistoryService:FinishRecording(recordingIdentifier, Enum.FinishRecordingOperation.Commit)
end

newScriptButton.Click:Connect(onPluginButtonClicked)
