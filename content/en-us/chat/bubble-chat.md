---
title: Customize bubble chat
description: The text chat system allows users to communicate and socialize with each other.
---

With [TextChatService](../chat/in-experience-text-chat.md), you can use bubble chat to display customizable speech chat bubbles above user avatars and NPCs. Bubble chat can make your experience more visually immersive and help users easily identify messages and their speakers in a contextually relevant manner. This feature is especially useful for experiences where users need to focus on the content in the meantime communicating with others in a less obtrusive way.

<video src="../assets/players/in-experience-text-chat/Player-Conversation-Bubbles.mp4" controls width="100%"></video>

## Enable bubble chat

To enable bubble chat in your experience:

1. In the [Explorer](../studio/explorer.md) window, select `Class.BubbleChatConfiguration` under `Class.TextChatService`.

   <img src="../assets/players/in-experience-text-chat/TextChatService-BubbleChatConfiguration.png" width="320" />

2. In the [Properties](../studio/properties.md) window, check the `Class.BubbleChatConfiguration.Enabled` checkbox.

   <img src="../assets/players/in-experience-text-chat/TextChatService-BubbleChatConfiguration-Enabled.png" width="320" />

## Bubble customization

After enabling bubble chat, you can customize the appearance and behavior of your chat bubbles to match your experience theme. Use the [Properties](../studio/properties.md) window of `Class.BubbleChatConfiguration` for [basic](#basic-customization) changes like text color and spacing, or implement [advanced](#advanced-customization) customization for bubble background images and other visual adjustments.

<img src="../assets/players/in-experience-text-chat/TextChatService-BubbleChatConfiguration.png" width="320" />

Alternatively, add a `Class.LocalScript` in `Class.StarterPlayerScripts` with all your customization settings. This allows the engine to apply your customizations during runtime, overriding the settings in Studio. It's useful for adding special effects to chat bubbles when users trigger certain events or conditions.

### Basic customization

The following table shows common bubble chat customization properties. For a full list of customization properties, see `Class.BubbleChatConfiguration`.

<Tabs>
<TabItem label="Appearance">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.BubbleChatConfiguration.BackgroundColor3|BackgroundColor3`</td>
		<td>Background color of bubbles in `Datatype.Color3`.</td>
		<td><Typography noWrap>`[250, 250, 250]`</Typography></td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of the bubble text.</td>
		<td>`Enum.Font.BuilderSansMedium|BuilderSansMedium`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextColor3|TextColor3`</td>
		<td>Color of bubble text in `Datatype.Color3`.</td>
		<td>`[57, 59, 61]`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextSize|TextSize`</td>
		<td>Size of bubble text.</td>
		<td>`16`</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="Behavior">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.BubbleChatConfiguration.Enabled|Enabled`</td>
		<td>Indicating whether bubble chat is enabled in the experience.</td>
		<td>`true` (checked)</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.AdorneeName|AdorneeName`</td>
		<td>String name of the body part or `Class.Attachment` that bubbles attach to; if multiple instances of the same name exist, the system attaches to the first instance found.</td>
		<td>`HumanoidRootPart`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.BubbleDuration|BubbleDuration`</td>
		<td>Time before a bubble fades out, in seconds.</td>
		<td>`30`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.BubblesSpacing|BubblesSpacing`</td>
		<td>Vertical space between stacked bubbles, in pixels.</td>
		<td>`6`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.LocalPlayerStudsOffset|LocalPlayerStudsOffset`</td>
		<td>If adorned to the local player, the offset of bubbles in studs from their adornee, relative to the camera orientation (`Datatype.Vector3`).</td>
		<td>`(0, 0, 0)`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.MaxDistance|MaxDistance`</td>
		<td>Maximum distance from the camera that bubbles are shown.</td>
		<td>`100`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.MinimizeDistance|MinimizeDistance`</td>
		<td>Distance from the camera when bubbles turn into a single bubble with an ellipsis&nbsp;(**&ctdot;**) to indicate chatter.</td>
		<td>`40`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.VerticalStudsOffset|VerticalStudsOffset`</td>
		<td>Extra space between bubbles and their adornee, in studs.</td>
		<td>`0`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.MaxBubbles|MaxBubbles`</td>
		<td>Maximum number of bubbles displayed before older bubbles disappear.</td>
		<td>`3`</td>
	</tr>
</tbody>
</table>
</TabItem>
</Tabs>

### Advanced customization

For advanced customization of your bubble, add UI objects representing certain aspects of the bubble appearance as children under `Class.BubbleChatConfiguration`, including:

- `Class.ImageLabel` for background image settings.
- `Class.UIGradient` for background gradient settings.
- `Class.UICorner` for the corner shape of bubbles.
- `Class.UIPadding` for the padding space between the text and bubble edges, relative to the parent's normal size.

After adding these objects, you can modify properties of these objects applicable to chat bubbles for advanced bubble customization. The following example `Class.LocalScript` adds a background image and sharp corners to bubbles:

```lua title="Advanced Bubble Customization"
local TextChatService = game:GetService("TextChatService")

local bubbleChatConfiguration = TextChatService.BubbleChatConfiguration
bubbleChatConfiguration.TailVisible = false
bubbleChatConfiguration.TextColor3 = Color3.fromRGB(220, 50, 50)
bubbleChatConfiguration.FontFace = Font.fromEnum(Enum.Font.LuckiestGuy)

local bubbleUICorner = bubbleChatConfiguration:FindFirstChildOfClass("UICorner")
if not bubbleUICorner then
	bubbleUICorner = Instance.new("UICorner")
	bubbleUICorner.Parent = bubbleChatConfiguration
end
bubbleUICorner.CornerRadius = UDim.new(0, 0)

local bubbleUIPadding = bubbleChatConfiguration:FindFirstChildOfClass("UIPadding")
if not bubbleUIPadding then
	bubbleUIPadding = Instance.new("UIPadding")
	bubbleUIPadding.Parent = bubbleChatConfiguration
end
bubbleUIPadding.PaddingTop = UDim.new(0, 20)
bubbleUIPadding.PaddingRight = UDim.new(0, 10)
bubbleUIPadding.PaddingBottom = UDim.new(0, 15)
bubbleUIPadding.PaddingLeft = UDim.new(0, 10)

local bubbleImageLabel = bubbleChatConfiguration:FindFirstChildOfClass("ImageLabel")
if not bubbleImageLabel then
	bubbleImageLabel = Instance.new("ImageLabel")
	bubbleImageLabel.Parent = bubbleChatConfiguration
end
bubbleImageLabel.Image = "rbxassetid://109157529833093"
bubbleImageLabel.ScaleType = Enum.ScaleType.Slice
bubbleImageLabel.SliceCenter = Rect.new(40, 40, 320, 120)
bubbleImageLabel.SliceScale = 0.5
```

<img src="../assets/players/in-experience-text-chat/Advanced-Bubble.png" width="352" />

The following tables outline the available `Class.GuiObject` and [appearance modifier](../ui/appearance-modifiers.md) children along with their valid customization properties:

<Tabs>
<TabItem label="ImageLabel">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.ImageLabel.Image|Image`</td>
		<td>Asset ID of the bubble background image.</td>
		<td></td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ImageColor3|ImageColor3`</td>
		<td>Color tint of the bubble background image in `Datatype.Color3`.</td>
		<td><Typography noWrap>`[255, 255, 255]`</Typography></td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ImageRectOffset|ImageRectOffset`</td>
		<td>Offset of the image area to be displayed from the top-left in pixels.</td>
		<td>`(0, 0)`</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ImageRectSize|ImageRectSize`</td>
		<td>Size of the image area to be displayed in pixels. To display the entire image, set either dimension to `0`.</td>
		<td>`(0, 0)`</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ScaleType|ScaleType`</td>
		<td>The scale type for rendering the image when its size is different from the absolute size of the bubble.</td>
		<td>`Enum.ScaleType|Stretch`</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.SliceCenter|SliceCenter`</td>
		<td>Slice boundaries of the image if the image is a 9-sliced image. Only applicable when you set `Class.ImageLabel.ScaleType|ScaleType` as `Enum.ScaleType|Slice`. </td>
		<td>`(0, 0, 0, 0)`</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.SliceScale|SliceScale`</td>
		<td>Scale ratio of slice edges if the image is a 9-sliced image. Only applicable when you set `Class.ImageLabel.ScaleType|ScaleType` as `Enum.ScaleType|Slice`.</td>
		<td>`1`</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.TileSize|TileSize`</td>
		<td>Tiling size of the image. Only applicable when you set `Class.ImageLabel.ScaleType|ScaleType` as `Enum.ScaleType|Tile`.</td>
		<td>`(1, 0, 1, 0)`</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="UIGradient">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.UIGradient.Enabled|Enabled`</td>
		<td>Indicating whether the bubble background gradient is enabled. </td>
		<td>`false`&nbsp;(unchecked)</td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Color|Color`</td>
		<td>Color of the background gradient.</td>
		<td><Typography noWrap>`[250, 250, 250]`</Typography></td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Offset|Offset`</td>
		<td>Scalar translation of the gradient from the center of the bubble.</td>
		<td>`(0, 0)`</td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Rotation|Rotation`</td>
		<td>Clockwise rotation, in degrees, of the gradient starts from left to right.</td>
		<td>`0`</td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Transparency|Transparency`</td>
		<td>Transparency of the background gradient.</td>
		<td>`(1, 0)`</td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="UICorner">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.UICorner.CornerRadius|CornerRadius`</td>
		<td>Radius of the bubble corner shape in pixels.</td>
		<td><Typography noWrap>`(0, 12)`</Typography></td>
	</tr>
</tbody>
</table>
</TabItem>
<TabItem label="UIPadding">
<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.UIPadding.PaddingBottom|PaddingBottom`</td>
		<td>Padding on the bottom. </td>
		<td>`Datatype.UDim.new(0,8)`</td>
	</tr>
	<tr>
		<td>`Class.UIPadding.PaddingLeft|PaddingLeft`</td>
		<td>Padding on the left.</td>
		<td>`Datatype.UDim.new(0,8)`</td>
	</tr>
	<tr>
		<td>`Class.UIPadding.PaddingRight|PaddingRight`</td>
		<td>Padding on the right.</td>
		<td>`Datatype.UDim.new(0,8)`</td>
	</tr>
	<tr>
		<td>`Class.UIPadding.PaddingTop|PaddingTop`</td>
		<td>Padding on the top.</td>
		<td>`Datatype.UDim.new(0,8)`</td>
	</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Per-bubble customization

You can individually style and modify chat bubble behaviors based on specific conditions in order to override your general settings. For example, you can use chat bubbles to differentiate NPCs and users, highlight critical health status, and apply special effects to messages with pre-defined keywords.

To set per-bubble customization, add a client-side `Class.LocalScript` using `Class.BubbleChatMessageProperties`, which overrides matching properties of `Class.BubbleChatConfiguration`, and the `Class.TextChatService.OnBubbleAdded` callback to specify how to customize each bubble. The callback supplies you with the `Class.TextChatMessage` property as well as the adornee, so you can apply the customization based on attributes associated with users, the chat text content, user character properties, and any special conditions you want to define.

The following basic customization properties are available for per-bubble customization:

<table>
<thead>
	<tr>
		<th>Property</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`Class.BubbleChatConfiguration.BackgroundColor3|BackgroundColor3`</td>
		<td>Background color of bubbles in `Datatype.Color3`.</td>
		<td>`(250, 250, 250)`</td>
	</tr>
		<tr>
		<td>`Class.BubbleChatConfiguration.BackgroundTransparency|BackgroundTransparency`</td>
		<td>Background transparency of bubbles.</td>
		<td>`0.1`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of the bubble text.</td>
		<td>`Enum.Font.BuilderSansMedium|BuilderSansMedium`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextColor3|TextColor3`</td>
		<td>Color of bubble text in `Datatype.Color3`.</td>
		<td>`[57, 59, 61]`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextSize|TextSize`</td>
		<td>Size of bubble text.</td>
		<td>`16`</td>
	</tr>
</tbody>
</table>

The following example adds special appearance to VIP users' chat bubbles by checking if a chat message sender has the `IsVIP` attribute:

```lua title="VIP Bubbles"
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")

-- Event handler for when a new chat bubble is added to the experience
TextChatService.OnBubbleAdded = function(message: TextChatMessage, adornee: Instance)
	-- Check if the chat message has a TextSource (sender) associated with it
	if message.TextSource then
		-- Create a new BubbleChatMessageProperties instance to customize the chat bubble
		local bubbleProperties = Instance.new("BubbleChatMessageProperties")

		-- Get the user who sent the chat message based on their UserId
		local player = Players:GetPlayerByUserId(message.TextSource.UserId)

		if player:GetAttribute("IsVIP") then
			-- If the player is a VIP, customize the chat bubble properties
			bubbleProperties.TextColor3 = Color3.fromHex("#F5CD30")
			bubbleProperties.BackgroundColor3 = Color3.fromRGB(25, 27, 29)
			bubbleProperties.FontFace = Font.fromEnum(Enum.Font.PermanentMarker)
		end
		return bubbleProperties
	end
end
```

<video src="../assets/players/in-experience-text-chat/VIP-Bubble.mp4" controls width="90%"></video>

All advanced customization options are available for per-bubble customization. Similar to advanced customization for general bubbles, add instances that you want to customize as children of `Class.BubbleChatMessageProperties`. The following example adds a special gradient effect along with other properties to chat bubbles of users with low health status by checking the `Class.Humanoid.Health` property of chat message senders' characters:

```lua title="Low Health Bubbles"
local TextChatService = game:GetService("TextChatService")
local Players = game:GetService("Players")

-- Event handler for when a new chat bubble is added to the experience
TextChatService.OnBubbleAdded = function(message: TextChatMessage, adornee: Instance)
	-- Check if the chat message has a TextSource (sender) associated with it
	if message.TextSource then
		-- Get the user who sent the chat message by using their UserId
		local player = Players:GetPlayerByUserId(message.TextSource.UserId)

		-- Find the humanoid in the user's character
		local humanoid = player.Character:FindFirstChildWhichIsA("Humanoid")

		if humanoid and humanoid.Health < 25 then
			-- Create a new BubbleChatMessageProperties instance to customize the chat bubble
			local bubbleProperties :BubbleChatMessageProperties = Instance.new("BubbleChatMessageProperties")

			-- Customize the chat bubble properties for low health condition
			bubbleProperties.BackgroundColor3 = Color3.fromRGB(245, 245, 245)
			bubbleProperties.TextColor3 = Color3.fromRGB(234, 51, 96)
			bubbleProperties.TextSize = 20
			bubbleProperties.FontFace = Font.fromEnum(Enum.Font.DenkOne)

			-- Add a UIGradient as a child to customize the gradient
			local uiGradient : UIGradient = Instance.new("UIGradient")
			uiGradient.Color = ColorSequence.new(Color3.fromRGB(110, 4, 0), Color3.fromRGB(0, 0, 0))
			uiGradient.Rotation = 90
			uiGradient.Parent = bubbleProperties

			return bubbleProperties
		end
	end
end
```

<video src="../assets/players/in-experience-text-chat/Low-Health-Bubble.mp4" controls width="90%"></video>

## Manually display bubbles

You might want to display a chat bubble when players haven't sent a message, such as with NPCs. Use the `Class.TextChatService:DisplayBubble` method to manually display a chat bubble.

Customization of these bubbles is the same as the customization of the bubbles that are automatically displayed when Players send messages through TextChannels using the [`Class.TextChatService.OnBubbleAdded` callback](#per-bubble-customization).

<Alert severity="success">
To generate speech or other text using an LLM, see the `Class.TextGenerator` class.
</Alert>

### NPC bubbles

Display chat bubbles for non-player characters (NPCs) by calling `Class.TextChatService:DisplayBubble(character, message)`, with the NPC character and the message as parameters. These bubbles are customizable using the `Class.TextChatService.OnBubbleAdded` callback just like any other chat bubble.

`Class.TextChatService:DisplayBubble()` only works on client-side scripts, so be sure to use a `Class.Script` with `Class.BaseScript.RunContext|RunContext` set to `Enum.RunContext.Client`, or a `Class.LocalScript` in an [appropriate container](/projects/data-model#client), such as `Class.StarterPlayerScripts`. If you attach a `Class.ProximityPrompt` to an NPC, a script for displaying a chat bubble might look like this:

```lua
local TextChatService = game:GetService("TextChatService")
local Workspace = game:GetService("Workspace")

local prompt = Workspace.SomeNPC.ProximityPrompt
local head = prompt.Parent:WaitForChild("Head")

prompt.Triggered:Connect(function()
	TextChatService:DisplayBubble(head, "Hello world!")
end)
```
