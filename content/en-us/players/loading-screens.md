---
title: Loading screens
description: Explains the process of customizing the loading screen when users are connecting to your experience.
---

Roblox displays a default loading screen when users are connecting to an experience, but you can personalize your experience with a custom loading screen that contains static or animated content.

<Alert severity="info">
This article covers the loading screens that display when a user initially joins an experience. To customize loading screens that display when a user teleports between places, see [Teleport between places](../projects/teleport.md#create-custom-teleport-screens).
</Alert>

## Implementation

To display a custom loading screen, you can either design a `Class.ScreenGui` instance directly within a `Class.LocalScript`, or you can reference a `Class.ScreenGui` object in your place hierarchy. Both options utilize `Class.ReplicatedFirst`, as this service that replicates instances to clients before anything else is replicated. This ensures that your loading screen is the first thing users see when they enter your experience.

### From script

To design and display a custom loading screen entirely from a `Class.LocalScript`:

1. In `Class.ReplicatedFirst`, create a `Class.LocalScript`.
2. Paste in the following code sample to create and customize a `Class.ScreenGui` object. You can modify the following code with your own values to create your design.

```lua title="Script-Created Loading Screen"
local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local loadingScreen = Instance.new("ScreenGui")
loadingScreen.IgnoreGuiInset = true
loadingScreen.Parent = playerGui

-- Replace ScreenGui values with your own
local textLabel = Instance.new("TextLabel")
textLabel.Size = UDim2.new(1, 0, 1, 0)
textLabel.BackgroundColor3 = Color3.fromRGB(0, 20, 40)
textLabel.Font = Enum.Font.DenkOne
textLabel.TextColor3 = Color3.new(0.8, 0.8, 0.8)
textLabel.Text = "Loading"
textLabel.TextSize = 32
textLabel.Parent = loadingScreen

-- Remove the default loading screen
ReplicatedFirst:RemoveDefaultLoadingScreen()

task.wait(5)  -- Force custom loading screen to appear for a minimum time

if not game:IsLoaded() then
	game.Loaded:Wait()
end

loadingScreen:Destroy()
```

### From existing GUI

Instead of creating a loading screen `Class.ScreenGui` entirely through a `Class.LocalScript`, you can also reference an existing `Class.ScreenGui` in your place hierarchy. Ensure that your experience includes the referenced `Class.ScreenGui` within `Class.ReplicatedFirst` and that the `Class.ScreenGui` includes UI elements like `Class.TextLabel|TextLabels` and `Class.ImageLabel|ImageLabels`.

To demonstrate this process, the following `Class.LocalScript` references a `Class.ScreenGui` named **LoadingScreen** within `Class.ReplicatedFirst`, then it removes the default loading screen so the only loading screen a player can see is your own custom loading screen.

<Alert severity="success">
Remember that you can design your loading screen `Class.ScreenGui` within the `Class.StarterGui` container to preview it, then move it to `Class.ReplicatedFirst` once you're satisfied with the result.
</Alert>

```lua title="Reference Existing Loading Screen"
local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local loadingScreen = ReplicatedFirst:FindFirstChild("LoadingScreen")
if loadingScreen then
	loadingScreen.IgnoreGuiInset = true
	loadingScreen.Parent = playerGui

	-- Remove the default loading screen
	ReplicatedFirst:RemoveDefaultLoadingScreen()

	task.wait(5)  -- Force screen to appear for a minimum number of seconds

	if not game:IsLoaded() then
		game.Loaded:Wait()
	end

	loadingScreen:Destroy()
end
```

## Add animations

In addition to static custom loading screens, you can add animations to enhance the loading screen and indicate loading progress. The easiest way to do this is to create a UI element, such as a `Class.TextLabel` or `Class.ImageLabel`, then to animate it using `Class.TweenService`. For example, the following code sample creates a new `Class.ScreenGui` with a child `Class.ImageLabel`, removes the default loading screen, then `Class.TweenService` fades in and rotates the central elements until the experience loads.

<video controls width="90%" src="../assets/ui/misc/Loading-Animation.mp4">
</video>

```lua title="Script-Created Loading Screen (Animated)"
local Players = game:GetService("Players")
local ReplicatedFirst = game:GetService("ReplicatedFirst")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local loadingScreen = Instance.new("ScreenGui")
loadingScreen.IgnoreGuiInset = true
loadingScreen.Parent = playerGui

local textLabel = Instance.new("TextLabel")
textLabel.Size = UDim2.new(1, 0, 1, 0)
textLabel.BackgroundColor3 = Color3.fromRGB(0, 20, 40)
textLabel.Font = Enum.Font.DenkOne
textLabel.TextColor3 = Color3.new(0.8, 0.8, 0.8)
textLabel.Text = "Loading"
textLabel.TextSize = 32
textLabel.TextTransparency = 1
textLabel.Parent = loadingScreen

local loadingRing = Instance.new("ImageLabel")
loadingRing.Size = UDim2.new(0, 256, 0, 256)
loadingRing.BackgroundTransparency = 1
loadingRing.Image = "rbxassetid://4965945816"
loadingRing.AnchorPoint = Vector2.new(0.5, 0.5)
loadingRing.Position = UDim2.new(0.5, 0, 0.5, 0)
loadingRing.ImageTransparency = 1
loadingRing.Parent = loadingScreen

-- Remove the default loading screen
ReplicatedFirst:RemoveDefaultLoadingScreen()

-- Initiate and start fade-in tweens
local fadeTweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out, 0, false, 2)
local fadeTween1 = TweenService:Create(textLabel, fadeTweenInfo, {TextTransparency = 0})
local fadeTween2 = TweenService:Create(loadingRing, fadeTweenInfo, {ImageTransparency = 0})
fadeTween1:Play()
fadeTween2:Play()

-- Initiate and start rotation tween
local tweenInfo = TweenInfo.new(4, Enum.EasingStyle.Linear, Enum.EasingDirection.In, -1)
local tween = TweenService:Create(loadingRing, tweenInfo, {Rotation = 360})
tween:Play()

task.wait(5)  -- Force screen to appear for a minimum number of seconds

if not game:IsLoaded() then
	game.Loaded:Wait()
end

loadingScreen:Destroy()
```
