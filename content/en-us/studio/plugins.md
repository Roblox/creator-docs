---
title: Plugins
description: Explains how to create, publish, and monetize extensions to Studio that add custom functionality.
---

A **plugin** is an extension that adds additional features or functionality to Studio. You can [install](../production/publishing/creator-store.md#finding-assets) community-made plugins from the Creator Store, or you can [create](#creating-new-plugins) and [publish](#publishing-plugins) your own to the [Toolbox](../projects/assets/toolbox.md) to use across your experiences. If you choose to also publish your plugins to the Creator Store, you can either offer them for free or sell them for [Robux](../production/monetization/index.md).

## Creating New Plugins

You can create your own plugins to improve your workflow in Studio. The following code sample is a plugin called **EmptyScriptAdder** that inserts an empty script as the child of an object or in `Class.ServerScriptService`. The following sections explain the major parts to creating this plugin.

To begin, you should enable **Plugin Debugging Enabled** in the **Studio** section of Studio's settings. This will expose the `Class.PluginDebugService` in Studio which provides real-time debugging for your plugin's code and makes it easier to reload and save your plugin.

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

1. Insert a new `Class.Script` inside `Class.ServerStorage` and rename it to **EmptyScriptAdder**.

   <img src="../assets/studio/plugins/Plugin-Empty-Script-Adder.png" width="320" />

2. Copy and paste the **EmptyScriptAdder Plugin** code into the new script.
3. Right-click the script in the Explorer and select **Save as Local Plugin**.
4. In the popup window, click **Save** to insert the plugin script into your local **Plugins** folder of the Studio installation.
5. The plugin should appear in `Class.PluginDebugService` and start running.

<Alert severity="warning">
Make sure to delete the original script in `Class.ServerStorage` and work from the
plugin inside `Class.PluginDebugService`, otherwise you may end up applying changes to the wrong script.
</Alert>

### Reloading and Saving Changes

With your `Class.Plugin` inside `Class.PluginDebugService`, you can easily update the plugin by right-clicking it and then selecting **Save and Reload Plugin** from the context menu. If you simply want to reload the plugin, for example to step through a section of code using a breakpoint without saving the plugin, you can
alternatively select **Reload Plugin**.

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
    for _, part in Selection:Get() do
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
    for _, part in parts do
        part.Material = Enum.Material.Neon -- Set the material of the part to Neon
    end

    -- Finish the recording, committing the changes to the history
    ChangeHistoryService:FinishRecording(recording, Enum.FinishRecordingOperation.Commit)
end)

```

## Publishing Plugins

As with [models](../parts/models.md), [meshes](../parts/meshes.md), [images](../parts/textures-decals.md), and [animations](../animation/editor.md#creating-an-animation), you can publish plugins to Roblox to make them easy to reuse from the [Toolbox](../projects/assets/toolbox.md). In addition, you can give other creators the ability to purchase and/or install your plugins by publishing them to the [Creator Store](../production/publishing/creator-store.md) with supplementary thumbnails that provide visual information on the plugin's functionality. The minimum amount you can sell plugins is 100 Robux.

To publish a plugin:

1. In the [Explorer](../studio/explorer.md) window, right-click on the plugin script you want to publish and select **Publish as Plugin** from the context menu.

   <Alert severity="warning">
   Currently, due to a bug in Studio, you'll need to right-click the
   `Class.Script` object inside the `Class.Plugin` to publish to
   Roblox. If you right-click the parent `Class.Plugin` object, the
   option to publish will be disabled.
   </Alert>

1. **(Optional)** In the upper-left corner of the asset configuration window, click the image to upload a 512&times;512 image.
1. Fill in the following fields:
   - **Name**: A title for your plugin.
   - **Description**: A description that describes what a potential user should expect the plugin to do.
   - **Creator**: The creator you'd like to attribute as the creator of the plugin. If you are using [Team Create](../projects/collaboration.md#team-create), every creator appears, otherwise "Me" is the only option.
1. **(Optional)** If you are [ID or phone verified](../production/publishing/account-verification.md), click the **+** button to add up to 5 supplementary thumbnails for your plugin.
1. **(Optional)** Enable the **Distribute on Marketplace** toggle to publish your plugin to the Creator Store. If you have previously [verified your account](../production/publishing/account-verification.md), the **Price** field becomes available.
1. **(Optional)** In the **Price** field, input the amount of Robux you want to charge for the plugin. If you keep the default value of `0`, the plugin is free to all creators.
1. Click the **Submit** button. Your plugin is now available to you in the [Toolbox](../projects/assets/toolbox.md).

   <Alert severity="info">
   If you don't enable **Distribute on Marketplace**, the plugin only publishes to the **Inventory** tab of the [Toolbox](../projects/assets/toolbox.md). If you change your mind and would like to publish a plugin you have previously uploaded, see [Publishing Assets](../production/publishing/publishing-assets.md).
   </Alert>
