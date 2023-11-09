---
title: Bubble Chat
description: The text chat system allows users to communicate and socialize with each other.
---

With the [in-experience text chat](../chat/in-experience-text-chat.md) system, you can support **bubble chat** to display customizable speech chat bubbles above user avatars and NPCs. Bubble chat can make your experience more visually immersive and help users easily identify messages and their speakers in a contextually relevant manner. This feature is especially useful for experiences where users need to focus on the content in the meantime communicating with others in a less obtrusive way.

<video src="../assets/players/in-experience-text-chat/Player-Conversation-Bubbles.mp4" controls width="100%"></video>

## Bubble Chat Configuration

To enable bubble chat in your experience:

1. In the [Explorer](../studio/explorer.md) window, select **BubbleChatConfiguration** under **TextChatService**.

   <img src="../assets/players/in-experience-text-chat/TextChatService-BubbleChatConfiguration.png" width="320" />

2. In the [Properties](../studio/properties.md) window, check the **Enabled** checkbox under the **Behavior** category.

   <img src="../assets/players/in-experience-text-chat/TextChatService-BubbleChatConfiguration-Enabled.png" width="320" />

## Bubble Customization

After enabling bubble chat, you can customize the appearance and behavior of your chat bubbles to match your experience theme. Use the [Properties](../studio/properties.md) window of **BubbleChatConfiguration** for [basic](#basic-customization) changes like text color and spacing. For [advanced](#advanced-customization) customization, such as adding background images for bubbles, add UI objects as children of **BubbleChatConfiguration** and then modify these objects.

<img src="../assets/players/in-experience-text-chat/TextChatService-BubbleChatConfiguration.png" width="320" />

Alternatively, you can add a `Class.LocalScript` in `Class.StarterPlayerScripts` with all your customization settings. This allows the engine to apply your customizations during runtime, overriding the settings in Studio. It's useful for adding special effects to chat bubbles when users trigger certain events or conditions.

### Basic Customization

The following table shows common bubble chat customization properties. For a full list of customization properties, see `Class.BubbleChatConfiguration`.

#### Appearance

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
		<td>[250, 250, 250]</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of the bubble text.</td>
		<td>`Enum.Font|GothamMedium`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextColor3|TextColor3`</td>
		<td>Color of bubble text in `Datatype.Color3`.</td>
		<td>[57, 59, 61]</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextSize|TextSize`</td>
		<td>Size of bubble text.</td>
		<td>16</td>
	</tr>
</tbody>
</table>

#### Behavior

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
		<td>HumanoidRootPart</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.BubbleDuration|BubbleDuration`</td>
		<td>Time before a bubble fades out, in seconds.</td>
		<td>30</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.BubblesSpacing|BubblesSpacing`</td>
		<td>Vertical space between stacked bubbles, in pixels.</td>
		<td>6</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.LocalPlayerStudsOffset|LocalPlayerStudsOffset`</td>
		<td>If adorned to the local player, the offset of bubbles in studs from their adornee, relative to the camera orientation (`Datatype.Vector3`).</td>
		<td>(0, 0, 0)</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.MaxDistance|MaxDistance`</td>
		<td>Maximum distance from the camera that bubbles are shown.</td>
		<td>100</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.MinimizeDistance|MinimizeDistance`</td>
		<td>Distance from the camera when bubbles turn into a single bubble with an ellipsis&nbsp;(**&ctdot;**) to indicate chatter.</td>
		<td>40</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.VerticalStudsOffset|VerticalStudsOffset`</td>
		<td>Extra space between bubbles and their adornee, in studs.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.MaxBubbles|MaxBubbles`</td>
		<td>Maximum number of bubbles displayed before older bubbles disappear.</td>
		<td>3</td>
	</tr>
</tbody>
</table>

### Advanced Customization

For advanced customization of your bubble, add UI objects representing certain aspects of the bubble appearance as children under **BubbleChatConfiguration**, including:

- `Class.ImageLabel` for background image settings.
- `Class.UIGradient` for background gradient settings.
- `Class.UICorner` for the corner shape of bubbles.
- `Class.UIPadding` for the padding space between the text and bubble edges, relative to the parent's normal size.

To add these objects as children of **BubbleChatConfiguration**, you can either add a script or use the Studio user interface directly:

1. Hover over **BubbleChatConfiguration** and click the &CirclePlus; button.
2. Select the object from list.

After adding these objects, you can modify properties of these objects applicable to chat bubbles for advanced bubble customization. The following example client-side `Class.LocalScript` adds a background image and sharp corners to bubbles:

```lua title="Advanced Bubble Customization"
local BubbleChatConfiguration = game:GetService("TextChatService").BubbleChatConfiguration
BubbleChatConfiguration.TailVisible = false
BubbleChatConfiguration.TextSize = 24
BubbleChatConfiguration.TextColor3 = Color3.fromRGB(220, 50, 50)
BubbleChatConfiguration.FontFace = Font.fromEnum(Enum.Font.LuckiestGuy)

local UICorner = BubbleChatConfiguration:FindFirstChildOfClass("UICorner")
if not UICorner then
	UICorner = Instance.new("UICorner")
	UICorner.Parent = BubbleChatConfiguration
end
UICorner.CornerRadius = UDim.new(0, 0)

local ImageLabel = BubbleChatConfiguration:FindFirstChildOfClass("ImageLabel")
if not ImageLabel then
	ImageLabel = Instance.new("ImageLabel")
	ImageLabel.Parent = BubbleChatConfiguration
end
ImageLabel.Image = "rbxassetid://6733332557"
ImageLabel.ScaleType = Enum.ScaleType.Slice
ImageLabel.SliceCenter = Rect.new(40, 40, 360, 160)
ImageLabel.SliceScale = 0.5
```

<img src="../assets/players/in-experience-text-chat/Advanced-Bubble.png" width="300" />

The following tables include all available properties for customization:

<h4>ImageLabel</h4>

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
		<td>[255,&nbsp;255,&nbsp;255]</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ImageRectOffset|ImageRectOffset`</td>
		<td>Offset of the image area to be displayed from the top-left in pixels.</td>
		<td>(0, 0)</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ImageRectSize|ImageRectSize`</td>
		<td>Size of the image area to be displayed in pixels. To display the entire image, set either dimension to 0.</td>
		<td>(0, 0)</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.ScaleType|ScaleType`</td>
		<td>The scale type for rendering the image when its size is different from the absolute size of the bubble.</td>
		<td>`Enum.ScaleType|Stretch`</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.SliceCenter|SliceCenter`</td>
		<td>Slice boundaries of the image if the image is a 9-sliced image. Only applicable when you set `Class.ImageLabel.ScaleType|ScaleType` as `Enum.ScaleType|Slice`. </td>
		<td>(0, 0, 0, 0)</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.SliceScale|SliceScale`</td>
		<td>Scale ratio of slice edges if the image is a 9-sliced image. Only applicable when you set `Class.ImageLabel.ScaleType|ScaleType` as `Enum.ScaleType|Slice`.</td>
		<td>1</td>
	</tr>
	<tr>
		<td>`Class.ImageLabel.TileSize|TileSize`</td>
		<td>Tiling size of the image. Only applicable when you set `Class.ImageLabel.ScaleType|ScaleType` as `Enum.ScaleType|Tile`.</td>
		<td>(1, 0, 1, 0)</td>
	</tr>
</tbody>
</table>

<h4>UIGradient</h4>

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
		<td>[250, 250, 250]</td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Offset|Offset`</td>
		<td>Scalar translation of the gradient from the center of the bubble.</td>
		<td>(0, 0)</td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Rotation|Rotation`</td>
		<td>Clockwise rotation, in degrees, of the gradient starts from left to right.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`Class.UIGradient.Transparency|Transparency`</td>
		<td>Transparency of the background gradient.</td>
		<td>(1, 0)</td>
	</tr>
</tbody>
</table>

<h4>UICorner</h4>

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
		<td>(0, 12)</td>
	</tr>
</tbody>
</table>

<h4>UIGradient</h4>

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
		<td>`UDim.new(0,8)`</td>
	</tr>
	<tr>
		<td>`Class.UIPadding.PaddingLeft|PaddingLeft`</td>
		<td>>Padding on the left.</td>
		<td>`UDim.new(0,8)`</td>
	</tr>
	<tr>
		<td>`Class.UIPadding.PaddingRight|PaddingRight`</td>
		<td>Padding on the right.</td>
		<td>`UDim.new(0,8)`</td>
	</tr>
	<tr>
		<td>`Class.UIPadding.PaddingTop|PaddingTop`</td>
		<td>Padding on the top.</td>
		<td>`UDim.new(0,8)`</td>
	</tr>
</tbody>
</table>

<br />

## Per-Bubble Customization

You can individually style and modify chat bubble behaviors based on specific conditions that overrides your general settings. For example, you can use chat bubbles to differentiate NPCs and users, highlight critical health status, and apply special effects to messages with pre-defined keywords.

To set per-bubble customization, add a client-side `Class.LocalScript` using `Class.BubbleChatMessageProperties`, which overrides matching properties of `Class.BubbleChatConfiguration`, and the `Class.TextChatService.OnBubbleAdded` callback to specify how to customize each bubble. The callback supplies you with the `Class.TextChatMessage` property as well as the adornee, so you can apply the customization based on attributes associated with users, the chat text content, user character properties, and any special conditions you want to define.

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

### Available Options

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
		<td>(250, 250, 250)</td>
	</tr>
		<tr>
		<td>`Class.BubbleChatConfiguration.BackgroundTransparency|BackgroundTransparency`</td>
		<td>Background transparency of bubbles.</td>
		<td>0.1</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.FontFace|FontFace`</td>
		<td>`Datatype.Font` of the bubble text.</td>
		<td>`Enum.Font|GothamMedium`</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextColor3|TextColor3`</td>
		<td>Color of bubble text in `Datatype.Color3`.</td>
		<td>[57, 59, 61]</td>
	</tr>
	<tr>
		<td>`Class.BubbleChatConfiguration.TextSize|TextSize`</td>
		<td>Size of bubble text.</td>
		<td>16</td>
	</tr>
</tbody>
</table>

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
		local humanoid = player.Character:FindFirstChild("Humanoid")

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
			uiGradient.Parent = bubbleProperties
			uiGradient.Rotation = 90

			return bubbleProperties
		end
	end
end
```

<video src="../assets/players/in-experience-text-chat/Low-Health-Bubble.mp4" controls width="90%"></video>

## NPC Bubbles

You can display chat bubbles for non-player characters (NPCs) by calling `Class.TextChatService:DisplayBubble()`, with the NPC character and the message as parameters. These bubbles are customizable using the `Class.TextChatService.OnBubbleAdded` callback just like any other chat bubble.

`Class.TextChatService:DisplayBubble()` only works on client-side scripts, so be sure to use a `Class.LocalScript` in an [appropriate container](/projects/data-model#client), such as `Class.StarterPlayerScripts`. If you attach a `Class.ProximityPrompt` to an NPC, a script for displaying a chat bubble might look like this:

```lua
local TextChatService = game:GetService("TextChatService")

local prompt = workspace.SomeNPC.ProximityPrompt
local head = prompt.Parent:WaitForChild("Head")

prompt.Triggered:Connect(function()
	TextChatService:DisplayBubble(head, "Hello world!")
end)
```
