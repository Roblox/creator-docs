---
title: Customizing Loading Screens
description: Explains the process of customizing the loading screen when users are connecting to your experience.
---

Roblox displays a default loading screen when users are connecting to an experience, but you can personalize your experience with a custom loading screen that contains static or animated content.

<Alert severity="info">
This article covers the loading screens that display when a user initially joins an experience. To customize loading screens that display when a user teleports between places, see [Teleporting Between Places](../projects/teleporting.md#creating-custom-teleport-screens).
</Alert>

## Displaying Custom Loading Screens

To display a custom loading screen, you can either design a `Class.ScreenGui` instance directly within a `Class.LocalScript`, or you can reference a `Class.ScreenGui` object in your workspace. Both options utilize `Class.ReplicatedFirst`, as this service that replicates instances to clients before anything else is replicated. This ensures that your loading screen is the first thing users see when they enter your experience.

### Designing within LocalScripts

To design and display a custom loading screen:

1. In **ReplicatedFirst**, create a `Class.LocalScript`.

   <img src="../assets/ui/loading-screens/ReplicatedFirst-LocalScript.png" width="320" />

2. Use the following code sample to create and customize a `Class.ScreenGui` object. You can modify the following code with your own values to create your design:

```lua
local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.IgnoreGuiInset = true
screenGui.Parent = playerGui

-- Replace ScreenGui values with your own
local textLabel = Instance.new("TextLabel")
textLabel.Size = UDim2.new(1, 0, 1, 0)
textLabel.BackgroundColor3 = Color3.fromRGB(0, 20, 40)
textLabel.Font = Enum.Font.GothamMedium
textLabel.TextColor3 = Color3.new(0.8, 0.8, 0.8)
textLabel.Text = "Loading"
textLabel.TextSize = 28
textLabel.Parent = screenGui

-- Remove the default loading screen
ReplicatedFirst:RemoveDefaultLoadingScreen()

task.wait(5)  -- Force screen to appear for a minimum number of seconds

if not game:IsLoaded() then
 game.Loaded:Wait()
end

screenGui:Destroy()
```

### Referencing ScreenGuis

Instead of creating the `Class.ScreenGui` through a `Class.LocalScript`, you can also reference an existing `Class.ScreenGui` directly in your workspace. Ensure that your experience includes a `Class.ScreenGui` within `Class.ReplicatedFirst` and that the `Class.ScreenGui` includes UI elements like `TextLabels` and `ImageLabels`, then set it as the loading screen by referencing it within a `Class.LocalScript`. This method allows you to easily view your loading screen as you're creating it.

To demonstrate this process, the following `Class.LocalScript` references a `Class.ScreenGui` named **LoadingScreen** within `Class.ReplicatedFirst`, then removes the default loading screen so the only loading screen a user can see is your own custom loading screen:

```lua
local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = ReplicatedFirst.LoadingScreen
screenGui.IgnoreGuiInset = true
screenGui.Parent = playerGui

-- Remove the default loading screen
ReplicatedFirst:RemoveDefaultLoadingScreen()

task.wait(5)  -- Force screen to appear for a minimum number of seconds

if not game:IsLoaded() then
	game.Loaded:Wait()
end

screenGui:Destroy()
```

## Adding Animations

In addition to static custom loading screens, you can add animations to enhance the loading screen and indicate loading progress. The easiest way to do this is to create a UI element, such as a `Class.TextLabel` or `Class.ImageLabel`, then to animate it using `Class.TweenService`. For example, the following code sample creates a new `Class.ScreenGui` with a child `Class.ImageLabel`, removes the default loading screen, then `Class.TweenService` rotates the `Class.ImageLabel` continuously until the experience loads:

<video controls width="70%" src="../assets/ui/loading-screens/Loading-Animation.mp4">
</video>

```lua
local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local screenGui = Instance.new("ScreenGui")
screenGui.IgnoreGuiInset = true
screenGui.Parent = playerGui

local textLabel = Instance.new("TextLabel")
textLabel.Size = UDim2.new(1, 0, 1, 0)
textLabel.BackgroundColor3 = Color3.fromRGB(0, 20, 40)
textLabel.Font = Enum.Font.GothamMedium
textLabel.TextColor3 = Color3.new(0.8, 0.8, 0.8)
textLabel.Text = "Loading"
textLabel.TextSize = 28
textLabel.Parent = screenGui

local loadingRing = Instance.new("ImageLabel")
loadingRing.Size = UDim2.new(0, 256, 0, 256)
loadingRing.BackgroundTransparency = 1
loadingRing.Image = "rbxassetid://4965945816"
loadingRing.AnchorPoint = Vector2.new(0.5, 0.5)
loadingRing.Position = UDim2.new(0.5, 0, 0.5, 0)
loadingRing.Parent = screenGui

-- Remove the default loading screen
ReplicatedFirst:RemoveDefaultLoadingScreen()

local tweenInfo = TweenInfo.new(4, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1)
local tween = TweenService:Create(loadingRing, tweenInfo, {Rotation = 360})
tween:Play()

task.wait(5)  -- Force screen to appear for a minimum number of seconds

if not game:IsLoaded() then
 game.Loaded:Wait()
end

screenGui:Destroy()
```
