---
title: Properties Window
description: The Properties window lets you adjust properties of a selected object to change how it looks and behaves.
---

The **Properties** window, accessible from the [View](../studio/view-tab.md) tab, allows you to adjust certain properties of a selected object to change how the object looks and behaves. Additionally, you can manage [tags](#instance-tags) and configure instance [attributes](#instance-attributes) at the bottom of the window.

<img src="../assets/studio/general/View-Tab-Properties.png" width="876" alt="Properties toggle button in Studio" />

## Header Bar

When you select an object, the window's header bar changes to reflect both the class and name of the object.

<Grid container spacing={3}>
	<Grid item>
	<figure>
    <img src="../assets/studio/properties/Header-Example-A.png" width="320" />
    <figcaption>A `Class.Model` named StoneColumn</figcaption>
  </figure>
	</Grid>
	<Grid item>
	<figure>
    <img src="../assets/studio/properties/Header-Example-B.png" width="320" />
    <figcaption>A `Class.Script` named CandleFlicker</figcaption>
  </figure>
	</Grid>
</Grid>

## Section Organization

The **Properties** window divides an object's properties into sections. For example, a `Class.MeshPart` includes sections like **Appearance** and **Transform** which respectively allow you to change its appearance and transform its `Class.BasePart.Size|Size`, `Class.BasePart.CFrame|CFrame`, and origin.

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

You can collapse or expand any section or subsection by clicking the small arrow to the left of its name. After you expand or collapse a section, it remains expanded or collapsed for other objects of the same class, as well as related objects that share the same property grouping.

<img src="../assets/studio/properties/Section-Expand-Collapse.png" width="320" />

## Expanding Inputs

Some properties are collapsed by default, but you can expand them by clicking the small arrow next to its name. For instance, `Class.BasePart|BaseParts` contain a **Position** property which represents an X, Y, Z coordinate in the 3D world. In Studio, these coordinates can be entered in two ways:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/properties/Input-Combined.png" width="320" />
    <figcaption>All three coordinates typed into the parent **Size** field, separated by commas</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/properties/Input-Expanded.png" width="320" />
    <figcaption>Property expanded and an individual size vector typed into the **X**, **Y**, and **Z** fields</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
After you expand or collapse a property, it remains expanded or collapsed for other objects of the same class, as well as related objects that share the same property.
</Alert>

## Filtering Properties

You can filter properties by typing a search query into the **Filter Properties** input near the top of the window. For example, filtering by the letters "velo" finds all properties containing them, such as **AssemblyLinear<u>Velo</u>city** and **AssemblyAngular<u>Velo</u>city**. Quickly access this input by pressing <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>P</kbd> (<kbd>⌘</kbd><kbd>Shift</kbd><kbd>P</kbd>).

<img src="../assets/studio/properties/Instance-Filtered.png" width="320" />

## Instance Tags

The **Tags** section allows you to apply specific tags for use with `Class.CollectionService`. Tags are sets of strings applied to instances that replicate from the server to the client. They are also serialized when places are saved.

To add tags to an instance through the **Properties** window:

1. Select the instance, scroll to the **Tags** section, and click the **+** button.

   <img src="../assets/studio/properties/Add-Tag-Button.png" width="320" />

1. In the popup window, enter a new tag name **or** select a tag you've already created for any other instance from the list below the input field. The tag will appear within the **Tags** section.

   <img src="../assets/studio/properties/Set-Tag.png" width="320" />

1. If necessary, you can remove an existing tag by clicking the **&times;** icon.

   <img src="../assets/studio/properties/Remove-Tag-Button.png" width="320" />

## Instance Attributes

**Attributes** allow you to customize instances with your own data. They are similar to built-in object properties, but you can create and modify your own attributes for any instance. Key features include:

- Attributes can be created, edited, and deleted directly within the **Properties** window, or through [scripting](#scripting).
- Attributes and their values are saved with your place and assets.
- Value changes can be viewed in real time and are **replicated** so that clients can access them immediately.

<Alert severity="success">
Attributes are a great tool to help you rapidly iterate and tune your experience. Using attributes, you can expose important parameters so that anyone on the team can test out different values without requiring a complete understanding of the underlying code.
</Alert>

Examples of attribute usage include:

- Weapons with attributes such as damage, fire rate, shot sound, and reload time.

	<img src="../assets/studio/properties/Attributes-Example-A.png" width="320" />

- Vehicle tuning like acceleration and top speed, body color, and engine sound.

	<img src="../assets/studio/properties/Attributes-Example-B.png" width="320" />

- Additional [package](../projects/assets/packages.md) or asset metadata such as description, version, and author.

	<img src="../assets/studio/properties/Attributes-Example-C.png" width="320" />

### Supported Types

You can store the following types/values in attributes:

<Grid container spacing={1}>
	<Grid item>
		<ul>
			<li>[string](../luau/strings.md)</li>
			<li>[boolean](../luau/booleans.md)</li>
			<li>[number](../luau/numbers.md)</li>
			<li>`Datatype.UDim`</li>
		</ul>
	</Grid>
	<Grid item>
		<ul>
			<li>`Datatype.UDim2`</li>
			<li>`Datatype.BrickColor`</li>
			<li>`Datatype.Color3`</li>
			<li>`Datatype.Vector2`</li>
		</ul>
	</Grid>
	<Grid item>
		<ul>
			<li>`Datatype.Vector3`</li>
			<li>`Datatype.EnumItem`</li>
			<li>`Datatype.NumberSequence`</li>
			<li>`Datatype.ColorSequence`</li>
		</ul>
	</Grid>
	<Grid item>
		<ul>
			<li>`Datatype.NumberRange`</li>
			<li>`Datatype.Rect`</li>
			<li>`Datatype.Font`</li>
			<li>`Datatype.CFrame`</li>
		</ul>
	</Grid>
</Grid>

### Studio Usage

New attributes can be created and modified in Studio as follows:

1. Select the instance, scroll to the bottom of the **Properties** window, and click the **+** button.

   <img src="../assets/studio/properties/Add-Attribute-Button.png" width="320" />

1. In the popup window, enter the attribute **Name**, select its **Type**, and click **Save**.
1. The new attribute will appear with a default value that you can change just like any other property.

   <img src="../assets/studio/properties/Set-Attribute.png" width="320" />

1. If necessary, you can **rename** or **delete** an attribute by clicking the gear icon.

   <img src="../assets/studio/properties/Rename-Delete-Attribute-Button.png" width="320" />

### Scripting

Attributes can also be created and controlled through scripts.

#### Creating/Modifying Attributes

To create an attribute or modify an existing attribute's value, call `Class.Instance:SetAttribute()` with a **name** and **value**.

```lua title='Create or Modify Attribute' highlight='4'
local weapon = script.Parent

-- Create an attribute
weapon:SetAttribute("ReloadTime", 3)
```

#### Getting Attribute Values

To get the value of one existing attribute, call `Class.Instance:GetAttribute()` on the instance.

```lua title='Get Attribute Value' highlight='4, 7'
local weapon = script.Parent

-- Create an attribute
weapon:SetAttribute("ReloadTime", 3)

-- Get current attribute value
local reloadTimeValue = weapon:GetAttribute("ReloadTime")
print(reloadTimeValue)
```

Similarly, you can get **all** attributes of an instance by calling `Class.Instance:GetAttributes()`. This returns a dictionary of string/variant pairs representing each attribute.

```lua title='Get All Attributes' highlight='4-5, 8'
local weapon = script.Parent

-- Create attributes
weapon:SetAttribute("ReloadTime", 3)
weapon:SetAttribute("FireSound", "rbxassetid://3821795742")

-- Get all instance attributes
local weaponAttributes = weapon:GetAttributes()
for name, value in weaponAttributes do
	print(name, value)
end
```

#### Deleting Attributes

To delete an attribute, call `Class.Instance:SetAttribute()` with a value of `nil`.

```lua title='Delete Attribute' highlight='4'
local weapon = script.Parent

-- Delete an existing attribute
weapon:SetAttribute("ReloadTime", nil)
```

#### Detecting Attribute Changes

To listen for value changes on one or more attributes:

- Connect `Class.Instance:GetAttributeChangedSignal()` for one specific named attribute.
- Connect `Class.Instance.AttributeChanged` for any attribute on the instance.

```lua title='Listen for Change on Attribute(s)' highlight='4-6, 9-11'
local weapon = script.Parent

--- Listen for one specific attribute change
weapon:GetAttributeChangedSignal("ReloadTime"):Connect(function()
	print(weapon:GetAttribute("ReloadTime"))
end)

-- Listen for any attribute change on the instance
weapon.AttributeChanged:Connect(function(attributeName)
	print(attributeName, weapon:GetAttribute(attributeName))
end)
```
