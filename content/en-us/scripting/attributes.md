---
title: Properties and Attributes
description: How to use scripts to manipulate object properties and attributes.
---

Making experiences interactive often means manipulating object properties and attributes:

- Properties are part of the object class. For example, the `Class.BasePart.Anchored` property controls physics for the part. In a track and field experience, you might want to anchor a discus or javelin the instant it lands so that players have a visual indicator of how far it traveled.

- Attributes are essentially custom properties that you define. For example, the [Plant](../resources/plant-reference-project.md) reference project uses attributes to set the purchase price for seeds and the maximum plant size that a pot can hold.

## Replication Order

Before you begin retrieving and manipulating objects, you must have an understanding of replication order.

The Roblox engine doesn't guarantee the order in which objects are replicated from the server to the client, which makes the `Class.Instance:WaitForChild()` method essential for accessing objects in client scripts, particularly objects in the `Class.Workspace`. Still, some aspects of the process are predictable:

1. The client loads the contents of `Class.ReplicatedFirst`, such as a loading screen, assets, and scripts.
1. `Class.LocalScript|LocalScripts` (and `Class.Script|Scripts` with a `Class.Script.RunContext|RunContext` of `Enum.RunContext.Client|Client`) in `ReplicatedFirst` run. These scripts can safely get objects from `ReplicatedFirst` without using `WaitForChild()`:

   ```lua
   -- Safe
   local ReplicatedFirst = game:GetService("ReplicatedFirst")
   local LoadingScreen = require(ReplicatedFirst.LoadingScreen)
   ```

   These scripts **can't** safely get objects from other [services](services.md), because they might not have loaded yet:

   ```lua
   -- Not safe
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local PickupManager = require(ReplicatedStorage.PickupManager)
   ```

   You **can** use `WaitForChild()` in these scripts to get objects from other services, but doing so largely negates the benefits of using `ReplicatedFirst`.

1. The client continues loading the rest of the experience.

1. When it finishes, the `Class.DataModel.Loaded|game.Loaded` event fires and `Class.DataModel:IsLoaded()|game:IsLoaded()` returns true.

1. `LocalScripts` in `StarterPlayerScripts` run, as well as client `Scripts` in `Class.ReplicatedStorage`. These scripts can safely get objects from `StarterPlayerScripts` and `ReplicatedStorage` without using `WaitForChild()`.

1. The player's `Class.Player.Character|Character` model spawns in the experience.

1. `LocalScripts` in `StarterCharacterScripts` run.

If your experience uses [instance streaming](../workspace/streaming.md) (`Class.Workspace.StreamingEnabled`), some or most objects might not have loaded into the workspace, so using `WaitForChild()` to access workspace objects becomes an even more important safety measure. In particular, see [Streaming In](../workspace/streaming.md#streaming-in) and [Per-Model Streaming Controls](../workspace/streaming.md#per-model-streaming-controls) for additional information on loading and tuning streaming behavior.

## Getting Objects

The first step to modifying object properties and attributes is to get a reference to the object. The simplest solution is to make the script a child of the object in the Explorer and use `script.Parent` to reference the object.

<img alt="A script parented to a model in the Explorer." src="../assets/studio/explorer/Script-Parent-Model.png" width="320" />

```lua
local sign = script.Parent
```

The more universal solution is to get the object from a [service](services.md) using methods like `Class.Instance:FindFirstChild()` or `Class.Instance:WaitForChild()`.

<img alt="A Model within a Folder in ReplicatedStorage." src="../assets/studio/explorer/Script-Parent-ReplicatedStorage.png" width="320" />

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local signsFolder = ReplicatedStorage:WaitForChild("Signs")
local sign = signsFolder:WaitForChild("InteractiveSign")
```

## Modifying Properties

Properties are straightforward to access — just use a `.` after the object reference&nbsp;— although if you're working with a model, you might need to choose an individual part rather than the model itself.

<img alt="A Model within ReplicatedStorage." src="../assets/studio/explorer/ReplicatedStorage-Model.png" width="320" />

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local chair = ReplicatedStorage:WaitForChild("Chair")

chair.LeftArmRest.Size = Vector3.new(10, 1, 10)
```

## Creating Attributes

Although you can create attributes programmatically, the more common solution is to create them with default values in the Studio user interface. Then you can use scripts to modify their values in response to player actions.

<img alt="A script within a folder in ReplicatedStorage." src="../assets/studio/properties/Attributes-Example-B.png" width="320" />

For information on creating attributes in Studio, see [Instance Attributes](../studio/properties.md#instance-attributes).

## Setting Attributes

To modify an attribute's value, call `Class.Instance:SetAttribute()` with a name and value.

```lua title='Create or Modify Attribute'
local cabbage = script.Parent

cabbage:SetAttribute("Harvestable", true)
```

If the attribute doesn't already exist, this method creates it.

## Getting Attribute Values

To get the value of one existing attribute, call `Class.Instance:GetAttribute()` on the instance.

```lua title='Get Attribute Value'
local cabbage = script.Parent

cabbage:SetAttribute("Harvestable", true)

local isHarvestable = cabbage:GetAttribute("Harvestable")
print(isHarvestable) --> true
```

Similarly, you can get all attributes by calling `Class.Instance:GetAttributes()`. This method returns a dictionary of key-value pairs.

```lua title='Get All Attributes'
local cabbage = script.Parent

local cabbageAttributes = cabbage:GetAttributes()

print(cabbageAttributes.GrowthRate) --> 2

for k, v in cabbageAttributes do
	print(k, v)
end
```

## Deleting Attributes

To delete an attribute, set its value to nil.

```lua title='Delete Attribute'
local cabbage = script.Parent

cabbage:SetAttribute("GrowthRate", nil)
```

## Detecting Changes

There are several ways to listen for changes to properties and attributes:

- The `Class.Instance.Changed` event listens for changes to any property (including attributes) and passes the name of the changed property as a parameter.

  <Alert severity="info">
  In the case of attribute changes, `Class.Instance.Changed` fires and passes the string `"Attributes"`, which lets you ignore the event, but isn't especially useful otherwise.
  </Alert>

- The `Class.Instance.AttributeChanged` event listens for changes to any attribute and passes the name of the changed attribute as a parameter.
- The `Class.Instance:GetPropertyChangedSignal()` method lets you listen for changes to one property and passes no parameters.
- The `Class.Instance:GetAttributeChangedSignal()` method lets you listen for changes to one attribute and passes no parameters.

Due to the minimal information that these events and methods pass as parameters, all of them are a good fit for anonymous functions, particularly `Class.Instance:GetPropertyChangedSignal()` and `Class.Instance:GetAttributeChangedSignal()`. To learn more about anonymous functions and working with events, see [Events](events/index.md).

```lua title='Listen for Changes'
local cabbage = script.Parent

-- Local functions
local function onAnyPropertyChange(property)
	-- Ignore changes to attributes
	if property ~= "Attributes" then
		print(property) --> Name
		print(cabbage[property]) --> Cabbage1
	end
end

local function onAnyAttributeChange(attribute)
	print(attribute) --> Grow, GrowthRate
	print(cabbage:GetAttribute(attribute)) --> false, 3
end

-- Listen for changes and connect to local functions
cabbage.Changed:Connect(onAnyPropertyChange)
cabbage.AttributeChanged:Connect(onAnyAttributeChange)

-- Listen for changes and connect to anonymous functions
cabbage:GetPropertyChangedSignal("Name"):Connect(function()
	print(cabbage.Name) --> Cabbage1
end)
cabbage:GetAttributeChangedSignal("GrowthRate"):Connect(function()
	print(cabbage:GetAttribute("GrowthRate")) --> 3
end)

-- Fires Changed and GetPropertyChangedSignal()
cabbage.Name = "Cabbage1"

-- Fires Changed and AttributeChanged
cabbage:SetAttribute("Grow", false)

-- Fires Changed, AttributeChanged, and GetAttributeChangedSignal()
cabbage:SetAttribute("GrowthRate", 3)
```
