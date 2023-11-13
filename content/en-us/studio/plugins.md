---
title: Plugins
description: Plugins are extensions to Studio that you can create to add custom features.
---

A **plugin** is an extension that adds additional features or functionality to Studio. You can [install](../production/publishing/creator-marketplace.md#finding-assets) community-made plugins from the Creator Marketplace, or you can [create](#creating-new-plugins) and [publish](#publishing-plugins) your own to the [Toolbox](../projects/assets/toolbox.md) to use across your experiences. If you choose to also publish your plugins to the Creator Marketplace, you can either offer them for free or sell them for [Robux](../production/monetization/index.md).

## Creating New Plugins

You can create your own plugins to improve your workflow in Studio. The following code sample is a plugin called **EmptyScriptAdder** that inserts an empty script as the child of an object or in `Class.ServerScriptService`. The following sections explain the major parts to creating this plugin.

```lua title='EmptyScriptAdder Plugin'
local ChangeHistoryService = game:GetService("ChangeHistoryService")
local Selection = game:GetService("Selection")

-- Create a new toolbar section titled "Custom Script Tools"
local toolbar = plugin:CreateToolbar("Custom Script Tools")

-- Add a toolbar button named "Create Empty Script"
local newScriptButton = toolbar:CreateButton("Create Empty Script", "Create an empty script", "rbxassetid://14978048121")

-- Make button clickable even if 3D viewport is hidden
newScriptButton.ClickableWhenViewportHidden = true

local function onNewScriptButtonClicked()
	local selectedObjects = Selection:Get()
	local parent = game:GetService("ServerScriptService")
	if #selectedObjects > 0 then
		parent = selectedObjects[1]
	end

	local newScript = Instance.new("Script")
	newScript.Source = ""
	newScript.Parent = parent
	ChangeHistoryService:SetWaypoint("Added new empty script")
end

newScriptButton.Click:Connect(onNewScriptButtonClicked)
```

### Saving a Plugin Script

Plugins start from scripts. To create a plugin, create a `Class.Script` and save it as a plugin using the [Explorer](../studio/explorer.md). For example, to create the **EmptyScriptAdder Plugin**:

1. Insert a new `Class.Script` inside **ServerStorage** and rename it to **EmptyScriptAdder**.

   <img src="../assets/studio/plugins/Plugin-Empty-Script-Adder.png" width="320" />

2. Copy and paste the **EmptyScriptAdder Plugin** code into the new script.
3. Right-click the script in the Explorer and select **Save as Local Plugin**.
4. In the popup window, click **Save** to insert the plugin script into your local **Plugins** folder of the Studio installation. The [Output](../studio/output.md) window indicates that the plugin successfully saved and the plugin runs for the first time after you save it.

### Adding a Toolbar Button

To add a button for your plugin to the **Plugins** tab of the Studio toolbar, use the `Class.Plugin:CreateToolbar()` and `Class.PluginToolbar:CreateButton()` methods. In the code for **EmptyScriptAdder**, line 5 creates a new section in the toolbar named **Custom Script Tools** and line 8 creates a button named **Create Empty Script**.

   <img src="../assets/studio/plugins/Plugin-Toolbar-Button.png" width="800" alt="New plugin button added to toolbar in Studio" />

### Executing Code on Click

To make the plugin execute code when a user clicks the toolbar button, connect a function to the button's `Class.PluginToolbarButton.Click` event. In the code for **EmptyScriptAdder**, the connecting function is `onNewScriptButtonClicked()`.

### Checking User Selection

To modify a plugin's behavior based on what the user has selected, use the `Class.Selection` service. The `onNewScriptButtonClicked()` function checks if the user has anything selected and creates the new script as its child instead of inside `Class.ServerScriptService`. If the user doesn't have anything selected, it creates the new script in `Class.ServerScriptService`.

<img src="../assets/studio/plugins/Plugin-Inserted-Script.png" width="320" />

### Supporting Undo and Redo

Use `Class.ChangeHistoryService` to allow users to undo and redo changes made by a plugin within an experience. In your script, set the plugin to call `Class.ChangeHistoryService:TryBeginRecording()` and store the identifier assigned to the API call before making changes. Then set the plugin to call `Class.ChangeHistoryService:FinishRecording()` after making changes, so it captures any changes made during the recording session for undo and redo.

The following code sample creates an example plugin that can apply the neon material to selected parts. It uses `Class.ChangeHistoryService` to record and manage the changes made by the plugin:

```lua title="Example Material Plugin with Recordings for Undo and Redo"
local ChangeHistoryService = game:GetService("ChangeHistoryService")
local Selection = game:GetService("Selection")

-- Create an example plugin
local toolbar = plugin:CreateToolbar("Example Plugin")
local button = toolbar:CreateButton("Neon it up", "", "")

-- Connect a function to the click event
button.Click:Connect(function()
    local parts = {}
    for _, part in pairs(Selection:Get()) do
        if part:IsA("BasePart") then
            parts[#parts + 1] = part
        end
    end
    if #parts < 1 then
        -- Nothing to do.
        return
    end

    -- Try to begin a recording with a specific identifier
    local recording = ChangeHistoryService:TryBeginRecording("Set selection to neon")

    -- Check if recording was successfully initiated
    if not recording then
        -- Handle error here. This indicates that your plugin began a previous
        -- recording and never completed it. You may only have one recording
        -- per plugin active at a time.
        return
    end

    -- Iterate through the selected parts
    for _, part in pairs(parts) do
        part.Material = Enum.Material.Neon -- Set the material of the part to Neon
    end

    -- Finish the recording, committing the changes to the history
    ChangeHistoryService:FinishRecording(recording, Enum.FinishRecordingOperation.Commit)
end)

```

## Publishing Plugins

As with [models](../parts/models.md), [meshes](../parts/meshes.md), [images](../parts/textures-decals.md), and [animations](../animation/editor.md#creating-an-animation), you can publish plugins to Roblox to make them easy to reuse from the [Toolbox](../projects/assets/toolbox.md). In addition, you can give other creators the ability to purchase and/or install your plugins by publishing them to the [Creator Marketplace](../production/publishing/creator-marketplace.md) with supplementary thumbnails that provide visual information on the plugin's functionality. The minimum amount you can sell plugins is 100 Robux.

To publish a plugin:

1. In the **Explorer** window, right-click on the plugin script you want to publish to Roblox. A contextual menu displays.
1. Select **Publish as Plugin**. The **Asset Configuration** window opens.
1. **(Optional)** In the upper-left corner of the window, click the image to upload a 512&times;512 image.
1. Fill in the following fields:
   - **Name**: A title for your plugin.
   - **Description**: A description that describes what a potential user should expect the plugin to do.
   - **Creator**: The creator you'd like to attribute as the creator of the plugin. If you are using [Team Create](../projects/collaboration.md#team-create), every creator appears, otherwise "Me" is the only option.
1. **(Optional)** If you are [ID or phone verified](../production/publishing/account-verification.md), click the **+** button to add up to 5 supplementary thumbnails for your plugin.

   <img src="../assets/publishing/publishing-assets/Rich-Media.jpg" width="90%" />

1. **(Optional)** Enable the **Distribute on Marketplace** toggle to publish your plugin to the Creator Marketplace. If you have previously [verified your account](../production/publishing/account-verification.md), the **Price** field becomes available.
1. **(Optional)** In the **Price** field, input the amount of Robux you want to charge for the plugin. If you keep the default value of `0`, the plugin is free to all creators.
1. Click the **Submit** button. Your plugin is now available to you in the [Toolbox](../projects/assets/toolbox.md).

   <Alert severity="info">
   If you don't enable **Distribute on Marketplace**, the plugin only publishes to the **Inventory** tab of the [Toolbox](../projects/assets/toolbox.md). If you change your mind and would like to publish a plugin you have previously uploaded, see [Publishing Assets](../production/publishing/publishing-assets.md).
   </Alert>
