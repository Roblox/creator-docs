---
title: CSS Comparisons
description: Explore how CSS concepts map to Roblox UI styling concepts.
---

Most CSS concepts map to Roblox styling concepts. The following examples show how CSS and HTML align with Luau and Roblox classes/properties.

To test each of the following Luau script examples:

1. In the [Explorer](../../studio/explorer.md), create the following:

   <img src="../../assets/studio/explorer/CSS-Test-Setup.png" width="320" style={{float: "right;", marginLeft: "20px;"}} />

	 1. `Class.StyleSheet` instance named `CoreSheet` inside `Class.ReplicatedStorage`.
	 2. Empty `Class.StyleRule` instance as a child of `CoreSheet`.
	 3. `Class.ScreenGui` container in `Class.StarterGui`.
	 4. `Class.LocalScript` instance inside the `Class.ScreenGui`.
	 5. `Class.StyleLink` object inside the `Class.ScreenGui` whose `Class.StyleLink.StyleSheet|StyleSheet` property is linked to `CoreSheet`.

2. In the `Class.LocalScript`, paste the following supporting code:

		```lua title="LocalScript"
		local CollectionService = game:GetService("CollectionService")
		local ReplicatedStorage = game:GetService("ReplicatedStorage")

		local coreSheet = ReplicatedStorage:FindFirstChild("CoreSheet")
		local rule = coreSheet:FindFirstChildWhichIsA("StyleRule")
		local screenGui = script.Parent
		```

3. For each example below, paste the **Luau** code lines following the supporting lines 1–6.

## Selectors

The `Class.StyleRule.Selector|Selector` property of a `Class.StyleRule` specifies which instances the rule should affect. The following selector types map from CSS to Luau and can be used with combinators.

### Element

Equivalent to CSS element selectors are Roblox **class selectors** which select all instances of a given `Class.GuiObject` class, for example `Class.Frame`, `Class.ImageLabel`, `Class.TextButton`, etc.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	button {
		background-color: #335FFF;
		color: #E1E1E1;
		width: 15%;
		height: 40px;
		border: none;
	}
	```
	</figure>
	<figure>
	```text title="HTML"
	<button>Main Menu</button>
	```
	</figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Class selector
	rule.Selector = "TextButton"

	-- Set rule properties
	rule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("335FFF"),
		["TextColor3"] = Color3.fromHex("E1E1E1"),
		["Size"] = UDim2.new(0.15, 0, 0, 40),
		["BorderSizePixel"] = 0
	})

	local button = Instance.new("TextButton")
	button.Text = "Main Menu"
	button.Parent = screenGui
	```
</CardContent>
</Card>

### Class

The Roblox equivalent to CSS `class` selectors are **tag selectors** which utilize [tags](../../studio/properties.md#instance-tags) applied through `Class.CollectionService`.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	.button-primary {
		background-color: #335FFF;
		color: #E1E1E1;
	}
	```
	</figure>
	<figure>
	```text title="HTML"
	<button class="button-primary">Main Menu</button>
	```
	</figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Tag selector
	rule.Selector = ".ButtonPrimary"

	-- Set rule properties
	rule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("335FFF"),
		["TextColor3"] = Color3.fromHex("E1E1E1"),
		["AutomaticSize"] = Enum.AutomaticSize.XY
	})

	local button = Instance.new("TextButton")
	button.Text = "Main Menu"
	button.Parent = screenGui
	-- Apply tag to button
	CollectionService:AddTag(button, "ButtonPrimary")
	```
</CardContent>
</Card>

### Identifier

The closest Roblox comparison to CSS `id` is the `#[name]` selector which selects according to the value of `Class.Instance.Name`. Unlike the W3C specification of the `id` attribute, names are not expected to be unique.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	#modal-frame {
		background-color: #000022;
		opacity: 0.5;
		width: 50%;
		min-height: 100px;
	}
	```
	</figure>
	<figure>
	```text title="HTML"
	<div id="modal-frame"></div>
	```
	</figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Instance name selector
	rule.Selector = "#ModalFrame"

	-- Set rule properties
	rule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("000022"),
		["BackgroundTransparency"] = 0.5,
		["Size"] = UDim2.new(0.5, 0, 0, 100),
		["AutomaticSize"] = Enum.AutomaticSize.Y
	})

	local frame = Instance.new("Frame")
	frame.Parent = screenGui
	-- Rename frame to match selector
	frame.Name = "ModalFrame"
	```
</CardContent>
</Card>

## Combinators

Combinators let you mix basic [selectors](#selectors) to match deeper hierarchy relationships.

### Child

The child selector of `>` is identical between CSS and Roblox.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	.menu-container {
		width: 25%;
	}

	.menu-container > button {
		background-color: #335FFF;
		color: #E1E1E1;
		width: 80%;
		height: 40px;
		border: none;
	}
	```
  </figure>
	<figure>
	```text title="HTML"
	<div class="menu-container">
		<button>Options</button>
	</div>
	```
	</figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Child selector
	rule.Selector = ".MenuContainer > TextButton"

	-- Set rule properties for child
	rule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("335FFF"),
		["TextColor3"] = Color3.fromHex("E1E1E1"),
		["Size"] = UDim2.new(0.8, 0, 0, 40),
		["BorderSizePixel"] = 0
	})

	-- Create menu container
	local menuContainer = Instance.new("Frame")
	menuContainer.Size = UDim2.new(0.25, 0, 0, 0)
	menuContainer.AutomaticSize = Enum.AutomaticSize.Y
	menuContainer.Parent = screenGui
	-- Apply tag
	CollectionService:AddTag(menuContainer, "MenuContainer")

	-- Create button
	local button = Instance.new("TextButton")
	button.Text = "Options"
	-- Set menu container as parent of button
	button.Parent = menuContainer
	```
</CardContent>
</Card>

### Descendant

Unlike the CSS whitespace syntax, for example <Typography noWrap>`.menu-container button`</Typography> seen here, Roblox uses the `>>` combinator to indicate a descendant relationship.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	.menu-container {
		width: 25%;
	}

	.sub-container {
		width: 75%;
	}

	.menu-container button {
		background-color: #335FFF;
		color: #E1E1E1;
		width: 80%;
		height: 40px;
		border: none;
	}
	```
  </figure>
	<figure>
	```text title="HTML"
	<div class="menu-container">
		<div class="sub-container">
			<button>Options</button>
		</div>
	</div>
	```
	</figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Descendant selector
	rule.Selector = ".MenuContainer >> TextButton"

	-- Set rule properties for descendant
	rule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("335FFF"),
		["TextColor3"] = Color3.fromHex("E1E1E1"),
		["Size"] = UDim2.new(0.8, 0, 0, 40),
		["BorderSizePixel"] = 0
	})

	-- Create menu container
	local menuContainer = Instance.new("Frame")
	menuContainer.Size = UDim2.new(0.25, 0, 0, 0)
	menuContainer.AutomaticSize = Enum.AutomaticSize.Y
	menuContainer.Parent = screenGui
	-- Apply tag
	CollectionService:AddTag(menuContainer, "MenuContainer")

	-- Create sub-container
	local subContainer = Instance.new("Frame")
	subContainer.Size = UDim2.new(0.75, 0, 0, 0)
	subContainer.AutomaticSize = Enum.AutomaticSize.Y
	-- Set menu container as parent of sub-container
	subContainer.Parent = menuContainer

	-- Create button
	local button = Instance.new("TextButton")
	button.Text = "Options"
	-- Set sub-container as parent of button
	button.Parent = subContainer
	```
</CardContent>
</Card>

### Selector list

Multiple selectors (including selectors with combinators) can be declared with the same property block, separated by commas, to reduce redundancy.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	img, p {
		background-color: #FF0033;
	}
	```
  </figure>
	<figure>
	```text title="HTML"
	<img src="gear.png" width="100" height="100">

	<p>Main Menu</p>
	```
  </figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Selector for image labels AND text labels
	rule.Selector = "ImageLabel, TextLabel"

	-- Set common property for classes
	rule:SetProperty("BackgroundColor3", Color3.fromHex("ff0033"))

	-- Create image label
	local imageLabel = Instance.new("ImageLabel")
	imageLabel.Image = "rbxassetid://104919049969988"
	imageLabel.Size = UDim2.new(0, 100, 0, 100)
	imageLabel.Parent = screenGui

	-- Create text label
	local textLabel = Instance.new("TextLabel")
	textLabel.Size = UDim2.new(1, 0, 0, 0)
	textLabel.AutomaticSize = Enum.AutomaticSize.Y
	textLabel.TextXAlignment = Enum.TextXAlignment.Left
	textLabel.TextYAlignment = Enum.TextYAlignment.Top
	textLabel.Text = "Main Menu"
	textLabel.Parent = screenGui
	```
</CardContent>
</Card>

## Pseudo-classes

The Roblox equivalent to CSS [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) selectors are **state selectors** which correspond to one of the four `Enum.GuiState` values such as `Enum.GuiState|Hover` or `Enum.GuiState|Press`.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	img:hover {
		opacity: 0.5;
	}
	```
  </figure>
	<figure>
	```text title="HTML"
	<img src="gear.png" width="100" height="100">
	```
  </figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- State selector
	rule.Selector = "ImageLabel:Hover"

	-- Set rule property
	rule:SetProperty("ImageTransparency", 0.5)

	-- Create image label
	local label = Instance.new("ImageLabel")
	label.Image = "rbxassetid://104919049969988"
	label.Size = UDim2.new(0, 100, 0, 100)
	label.BackgroundTransparency = 1
	label.Parent = screenGui
	```
</CardContent>
</Card>

## Pseudo-instances

Similar to how CSS [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) can modify specific parts of an element, Roblox can create phantom `Class.UIComponent|UIComponents` through a style rule's `Class.StyleRule.Selector|Selector` property. For example, the following rule effectively creates a `Class.UICorner` modifier under every `Class.Frame` tagged with `RoundedCorner20` and sets each modifier's `Class.UICorner.CornerRadius|CornerRadius` to `20` pixels.

```lua title="Luau"
-- UI component selector
rule.Selector = "Frame.RoundedCorner20::UICorner"

-- Set rule property
rule:SetProperty("CornerRadius", UDim.new(0, 20))

-- Create frame
local frame = Instance.new("Frame")
frame.Size = UDim2.new(0.4, 0, 0.2, 0)
frame.Parent = screenGui
-- Apply tag to frame
CollectionService:AddTag(frame, "RoundedCorner20")
```

## Variables

CSS lets you declare and reference [variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) throughout a style system. Roblox achieves this through tokens and the [instance attributes](../../studio/properties.md#instance-attributes) system. Using `$` as a prefix, you can reference attributes declared in a `Class.StyleRule` or `Class.StyleSheet` inheritance chain when setting style properties.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="CSS"
	:root {
		--button-bg-color: #335FFF;
		--button-text-color: #E1E1E1;
	}

	button {
		background-color: var(--button-bg-color);
		color: var(--button-text-color);
	}
	```
  </figure>
	<figure>
	```text title="HTML"
	<button>Main Menu</button>
	```
  </figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Set style sheet tokens using attributes
	coreSheet:SetAttribute("ButtonBgColor", Color3.fromHex("335FFF"))
	coreSheet:SetAttribute("ButtonTextColor", Color3.fromHex("E1E1E1"))

	-- Class selector
	rule.Selector = "TextButton"

	-- Set rule properties
	rule:SetProperties({
		["BackgroundColor3"] = "$ButtonBgColor",
		["TextColor3"] = "$ButtonTextColor"
	})

	-- Create button
	local button = Instance.new("TextButton")
	button.AutomaticSize = Enum.AutomaticSize.XY
	button.Text = "Main Menu"
	button.Parent = screenGui
	```
</CardContent>
</Card>

## Nesting and merging

Borrowing a concept from [SCSS](https://sass-lang.com/guide/#nesting), `Class.StyleRule|StyleRules` can be nested together and their selectors will **merge**.

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
<GridContainer numColumns="2">
	<figure>
	```text title="SCSS"
	#menu-frame {
		background-color: #000022;
		width: 25%;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		
		> button {
			background-color: #335FFF;
			color: #E1E1E1;
			width: 80%;
			height: 40px;
			border: none;
			
			&:hover {
				opacity: 0.5;
			}
		}
	}
	```
  </figure>
	<figure>
	```text title="HTML"
	<div id="menu-frame">
		<button>Charms</button>
		<button>Mana</button>
		<button>Scrolls</button>  
	</div>
	```
  </figure>
</GridContainer>
</CardContent>
</Card><br />

<Card>
<CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
	```lua title="Luau"
	-- Menu frame rule
	local menuFrameRule = Instance.new("StyleRule")
	menuFrameRule.Parent = coreSheet
	menuFrameRule.Selector = "#MenuFrame"
	menuFrameRule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("000022"),
		["Size"] = UDim2.new(0.25, 0, 0, 200),
		["AutomaticSize"] = Enum.AutomaticSize.Y
	})

	-- Menu layout rule
	local menuLayoutRule = Instance.new("StyleRule")
	menuLayoutRule.Parent = menuFrameRule  -- Set menu frame rule as parent
	menuLayoutRule.Selector = "::UIListLayout"
	menuLayoutRule:SetProperties({
		["FillDirection"] = Enum.FillDirection.Vertical,
		["VerticalFlex"] = Enum.UIFlexAlignment.SpaceEvenly,
		["HorizontalAlignment"] = Enum.HorizontalAlignment.Center
	})

	-- Button rule
	local buttonRule = Instance.new("StyleRule")
	buttonRule.Parent = menuFrameRule  -- Set menu frame rule as parent
	buttonRule.Selector = "> TextButton"
	buttonRule:SetProperties({
		["BackgroundColor3"] = Color3.fromHex("335FFF"),
		["TextColor3"] = Color3.fromHex("E1E1E1"),
		["Size"] = UDim2.new(0.8, 0, 0, 40),
		["BorderSizePixel"] = 0
	})

	-- Button hover rule
	local buttonHoverRule = Instance.new("StyleRule")
	buttonHoverRule.Parent = buttonRule  -- Set button rule as parent
	buttonHoverRule.Selector = ":hover"
	buttonHoverRule:SetProperty("BackgroundTransparency", 0.5)

	-- Create parent frame
	local menuFrame = Instance.new("Frame")
	menuFrame.Parent = screenGui
	menuFrame.Name = "MenuFrame"

	-- Create buttons inside frame
	local button1 = Instance.new("TextButton")
	button1.Text = "Charms"
	button1.Parent = menuFrame
	local button2 = Instance.new("TextButton")
	button2.Text = "Mana"
	button2.Parent = menuFrame
	local button3 = Instance.new("TextButton")
	button3.Text = "Scrolls"
	button3.Parent = menuFrame
	```
</CardContent>
</Card>
