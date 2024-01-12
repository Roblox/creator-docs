---
title: Enums
description: Enums are fixed list of items. Access them through the global DataType.Enum object.
---

The **enumeration** data type, or `Datatype.Enum`, is a fixed list of items. You can access enums through the global object called `Datatype.Enum`. For a full list of Enums and their items, see [Enums](/reference/engine/enums) in the API Reference.

## Getting Items of Enums

To get all items of an Enum, call the `GetEnumItems()` method on the enum. The following code sample demonstrates how to call `GetEnumItems()` on the `Enum.PartType` enum.

```lua
local partTypes = Enum.PartType:GetEnumItems()
for index, enumItem in partTypes do
	print(enumItem)
end

--[[
	Enum.PartType.Ball
	Enum.PartType.Block
	Enum.PartType.Cylinder
]]
```

## Enum Items

The `Datatype.EnumItem` is the data type for items in enums. An `Datatype.EnumItem` has three properties:

- `Name` - The name of the `Datatype.EnumItem`.
- `Value` - The numerical index of the `Datatype.EnumItem`.
- `EnumType` - The parent `Datatype.Enum` of the `Datatype.EnumItem`.

Some properties of objects can only be items of certain enums. For example, the `Shape` property of a `Class.Part` object is an item of the `Enum.PartType` Enum. The following code sample demonstrates how to print the properties of the `Enum.PartType.Cylinder` EnumItem.

```lua
-- Properties of the EnumItem called Enum.PartType.Cylinder
print(Enum.PartType.Cylinder.Name) -- Cylinder
print(Enum.PartType.Cylinder.Value) -- 2
print(Enum.PartType.Cylinder.EnumType) -- PartType
```

## Assigning Enum Items

To assign an `Datatype.EnumItem` as the value of a property, use the full `Datatype.Enum` declaration. You can also use its `Value` or `EnumType`.

```lua
local part = Instance.new("Part")		-- Create a new part
part.Parent = workspace

part.Shape = Enum.PartType.Cylinder  -- By EnumItem (best practice)
part.Shape = Enum.PartType.Cylinder.Value -- By EnumItem Value
part.Shape = 2  -- By EnumItem Value
part.Shape = Enum.PartType.Cylinder.Name -- By EnumItem Name
part.Shape = "Cylinder"  -- By EnumItem Name
```
