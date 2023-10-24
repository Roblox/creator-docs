---
title: Instance Attributes
description: Instance attributes allow you to customize instances with your own data.
---

**Attributes** allow you to customize instances with your own data. They are similar to built-in object properties, but you can create and modify your own attributes for any instance. Key features include:

- Attributes can be created, edited, and deleted directly within Studio's [Properties](../studio/properties.md) window.
- Attributes and their values are saved with your place and assets.
- Value changes can be viewed in real time and are **replicated** so that clients can access them immediately.

Specific examples of attribute usage include:

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/properties/Instance-Attributes-Example-A.jpg" />
    <figcaption>Weapons with attributes such as damage, fire rate, and reload time</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/properties/Instance-Attributes-Example-B.jpg" />
    <figcaption>Vehicle tuning like acceleration and top speed</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/properties/Instance-Attributes-Example-C.jpg" />
    <figcaption>Additional package or asset metadata such as description, version, and author</figcaption>
  </figure>
</GridContainer>

<Alert severity="success">
Attributes are a great tool to help you rapidly iterate and tune your experience. Using attributes, you can expose important parameters so that anyone on the team can test out different values without requiring a complete understanding of the underlying code.
</Alert>

## Supported Types

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

## Studio Usage

New attributes can be created and modified in Studio as follows:

1. Select the instance, scroll to the bottom of the [Properties](../studio/properties.md) window, and click **Add&nbsp;Attribute**.

   <img src="../assets/studio/properties/Add-Attribute-Button.png" width="320" />

1. In the popup window, enter the attribute **Name**, select its **Type**, and click **Save**.

   <img src="../assets/studio/properties/Add-Attribute-Popup.png" width="230" />

1. The new attribute will appear with a default value that you can change just like any other property.

   <img src="../assets/studio/properties/Set-Attribute.png" width="320" />

1. If necessary, you can **rename** or **delete** an attribute by clicking the gear icon.

   <img src="../assets/studio/properties/Attribute-Gear-Button.png" width="323" />

## Scripting

Attributes can also be created and controlled through scripts.

### Creating/Modifying Attributes

To create an attribute or modify an existing attribute's value, call `Class.Instance:SetAttribute()` with a **name** and **value**.

```lua title='Create or Modify Attribute' highlight='4'
local weapon = script.Parent

-- Create an attribute
weapon:SetAttribute("ReloadTime", 3)
```

### Getting Attribute Values

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
for name, value in pairs(weaponAttributes) do
	print(name, value)
end
```

### Deleting Attributes

To delete an attribute, call `Class.Instance:SetAttribute()` with a value of `nil`.

```lua title='Delete Attribute' highlight='4'
local weapon = script.Parent

-- Delete an existing attribute
weapon:SetAttribute("ReloadTime", nil)
```

### Detecting Attribute Changes

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
