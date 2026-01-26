---
title: In-experience tools
description: Create in-experience tools for your players.
---

In-experience `Class.Tool|Tools` are interactive tools that players can equip in sessions, such as weapons, magic wands, flashlights, keys, and more. You can design tools and include them in a player's inventory or place them around the world as pickups.

## Create an in-experience tool

The `Class.Tool` object is the basis of any tool in Roblox, so you'll need to create one. It's easier to preview how a tool looks by designing it in the `Class.Workspace`, and later you can make it an [inventory](#player-inventory) item or an [earned/purchased](#earnedpurchased-tool) item.

1. In the [Explorer](../studio/explorer.md) hierarchy, hover over `Class.Workspace`, click the **&CirclePlus;** button, and insert a `Class.Tool`.

   <img src="../assets/studio/explorer/Workspace-Tool.png" width="320" alt="Tool object created in the workspace" />

2. With the new `Class.Tool` selected, access the [Properties](../studio/properties.md) window and customize how the tool will appear in the player's inventory:

   - `Class.Tool.TextureId|TextureId` — Specifies the image asset ID for the tool in a player's inventory.
   - `Class.Tool.ToolTip|ToolTip` — The on-hover tooltip name for the tool in a player's inventory.

   <img src="../assets/players/in-experience-tools/Tool-Inventory.jpg" width="800" />

3. Decide whether the tool will be a [physical tool in the 3D environment](#physical-tool) (most common) or a [non‑physical](#non-physical-tool) tool that simply occupies a player's inventory and responds to their input.

### Physical tool

After creating the `Class.Tool` instance for a physical tool, you'll need to [add&nbsp;parts/meshes](#add-partsmeshes) to compose its appearance in the 3D world. You'll also need to include a [handle](#set-the-handle) which player characters [grip](#adjust-the-grip-positionorientation).

#### Add parts/meshes

In-experience tools can consist of one or more `Class.Part|Parts` and/or `Class.MeshPart|MeshParts`. If you construct the tool of multiple pieces, remember to connect them all together using `Class.WeldConstraint|WeldConstraints` or other [mechanical constraints](../physics/mechanical-constraints.md) so that the tool stays intact as a unit while the player carries it around.

<img src="../assets/studio/general/Toolbar-Constraint-Pickers.png" width="800" alt="Constraint pickers indicated in Studio's toolbar" />

<Alert severity="warning">
When constructing tools, make sure that no parts are `Class.BasePart.Anchored|Anchored`. If you anchor the tool in 3D space, player characters will get stuck in place when they pick up or equip the tool.

If you want to place collectible tools as pickups around the 3D world and anchor them in specific places, such as floating slightly above the ground, you can anchor them but you'll need to add a `Class.Script` to each tool which unanchors its parts upon collection. See [collectible tools](#collectible-tool) for details.
</Alert>

#### Set the handle

To enable players to carry tools around, one part of the tool needs to be named `Handle`. This is where the tool will attach to the character model's `RightHand` part (R15) or <Typography noWrap>`Right Arm`</Typography> part (R6).

If the tool is composed of just one `Class.MeshPart`, simply name that part `Handle`. Otherwise, you can include a separate part named `Handle` as a **direct child** of the parent `Class.Tool` and then attach it to another part with a `Class.WeldConstraint` or [mechanical constraint](../physics/mechanical-constraints.md).

The following example shows a tool with three instances: the `Handle` mesh, a `Class.RopeConstraint`, and a lantern mesh which hangs from the rope.

<img src="../assets/players/in-experience-tools/Tool-Handle-Example.jpg" width="720" />

<Alert severity="warning">
Make sure to include only **one** part named `Handle`. If you include multiple parts named `Handle`, one will be randomly chosen as the attachment point for the character's hand, potentially causing issues such as the character holding a sword's blade instead of its hilt.
</Alert>

#### Adjust the grip position/orientation

The tool's `Class.Tool.Grip|Grip` property is a `Datatype.CFrame` which specifies how the tool is positioned and oriented relative to the character holding it.

<img src="../assets/studio/properties/Tool-Grip.png" width="320" />

Since the ideal grip position/orientation is different for every tool, you'll need to experiment with the values until your tool's grip looks correct. The following example shows possible incorrect and correct `Class.Tool.Grip|Grip` settings for the hanging lantern:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Incorrect.jpg" />
    <figcaption>Lantern dragging on ground with `Class.Tool.Grip|Grip.Position` of <Typography noWrap>`(0, -2, 0)`</Typography> and `Class.Tool.Grip|Grip.Orientation` of <Typography noWrap>`(-90, 0, 0)`</Typography></figcaption>
  </figure>
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Correct.jpg" />
    <figcaption>Lantern in front of character with `Class.Tool.Grip|Grip.Position` of <Typography noWrap>`(0, -1.5, 0)`</Typography> and `Class.Tool.Grip|Grip.Orientation` of <Typography noWrap>`(25, 0, 0)`</Typography></figcaption>
  </figure>
</GridContainer>

### Non-physical tool

A non-physical `Class.Tool` simply occupies a player's [inventory](#player-inventory) and responds to their input. For example, a roleplaying experience might feature a series of magical spells that player's can "cast" through their inventory.

<img src="../assets/players/in-experience-tools/Tool-Inventory-Non-Physical.jpg" width="800" />

Non-physical tools don't require any 3D composition and do not utilize a `Handle` part, so you should **disable** the tool's `Class.Tool.RequiresHandle|RequiresHandle` property:

<img src="../assets/studio/properties/Tool-RequiresHandle.png" width="320" />

## Add tools to an experience

Once you finish [creating](#create-an-in-experience-tool) your in-experience tool, you'll need to place it in the correct area of the [Explorer](../studio/explorer.md) hierarchy. Where you place the tool in the hierarchy depends on its intended usage.

### Player inventory

If you want all players to start out with a tool in their inventory, put it inside the `Class.StarterPack` container. When any player spawns, the system copies the tool to their `Class.Backpack`. From there, the player can equip the tool by clicking its inventory icon or by pressing the associated hotkey such as <kbd>1</kbd> or <kbd>2</kbd>.

<img src="../assets/studio/explorer/StarterPack-Tools.png" width="320" />

Note that tools are copied to the player's inventory (`Class.Backpack`) in the order they were added to `Class.StarterPack`. For a more controlled ordering, you can add a `Class.LocalScript` to `Class.StarterPack` which temporarily moves the tools to `Class.ReplicatedStorage` then re‑parents them to `Class.Backpack` in the order specified in the `order` table.

```lua title="Reorder Inventory"
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local order = {"WaterSpell", "FireSpell", "AirSpell", "EarthSpell"}
local backpack = script.Parent

for _, item in backpack:GetChildren() do
	if item:IsA("Tool") then
		item.Parent = ReplicatedStorage
	end
end

-- Re-parent tools to backpack in the specified order
for i = 1, #order do
	local tool = ReplicatedStorage:FindFirstChild(order[i])
	if tool then
		tool.Parent = backpack
	end
end
```

### Collectible tool

If you want to allow players to collect physical tools as they explore the 3D world, place the tools in the `Class.Workspace` just like normal 3D objects. Collected tools will be automatically equipped and added to the player's inventory (you do not need to add extra collision detection for characters to grab the tool).

As noted in the [add parts/meshes](#add-partsmeshes) section, tool parts should not typically be `Class.BasePart.Anchored|Anchored`, since player characters will get stuck in place when they pick up or equip an anchored tool. However, if you want to anchor a collectible tool to a specific place in the 3D world, such as floating slightly above the ground, you can add the following `Class.Script` to the tool to unanchor its parts upon collection.

```lua title="Unanchor Tool on Equip/Collect"
local tool = script.Parent

tool.Equipped:Connect(function()
	for _, part in tool:GetDescendants() do
		if part:IsA("BasePart") and part.Anchored then
			part.Anchored = false
		end
	end
end)
```

### Earned/purchased tool

If you want to set tools as awards for when players accomplish tasks, or offer tools for sale in an in‑experience store, put those tools inside `Class.ReplicatedStorage`. From there, you can `Class.Instance:Clone()|Clone()` a tool to the player's `Class.Backpack` at the proper time.

<img src="../assets/studio/explorer/ReplicatedStorage-Tools.png" width="320" />

```lua title="Clone Tool to Player's Inventory"
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local backpack = player:WaitForChild("Backpack")

-- Create a clone of the tool
local tool = ReplicatedStorage:FindFirstChild("WaterSpell")
if tool then
	local clone = tool:Clone()
	clone.Parent = backpack  -- Adds clone to the player's backpack
end
```

## Implement tool effects

After [adding tools to your experience](#add-tools-to-an-experience), you can implement scripts to enable players to use their tools and perform the desired actions. The following tool‑specific events indicate the state of the tool and the player's input with it.

- `Class.Tool.Equipped|Equipped()` — Fires when the player selects the tool from their backpack.
- `Class.Tool.Unequipped|Unequipped()` — Fires when the player switches tools or drops the tool.
- `Class.Tool.Activated|Activated()` — Fires when the player starts activating the tool (clicks, taps, or presses the back‑right trigger on a gamepad).
- `Class.Tool.Deactivated|Deactivated()` — Fires when the player stops the activation input (releases the button or touch).

```lua title="Tool Events Template"
local tool = script.Parent

local function onEquip()
	print(tool.Name, "tool equipped")
end
local function onUnequip()
	print(tool.Name, "tool unequipped")
end
local function onActivate()
	print(tool.Name, "tool activated")
end
local function onDeactivate()
	print(tool.Name, "tool deactivated")
end

tool.Equipped:Connect(onEquip)
tool.Unequipped:Connect(onUnequip)
tool.Activated:Connect(onActivate)
tool.Deactivated:Connect(onDeactivate)
```

Tool events only fire in client‑side `Class.LocalScript|LocalScripts` because only the player's device knows when [input](../input/index.md) happens. As a result, most tools require both a `Class.LocalScript` and a server‑side `Class.Script` where each handles certain aspects of the tool's behavior and a `Class.RemoteEvent` passes information from the client to the server (see [remote events and callbacks](../scripting/events/remote.md) for more information).

As follows are example tools and their behaviors managed by either a `Class.LocalScript` or a `Class.Script`:

<table>
  <thead>
    <tr>
      <td>Tool</td>
      <td>`Class.LocalScript`</td>
      <td>`Class.Script`</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Creator's Wand**</td>
      <td>Detects where the player activates the tool (`Class.Tool.Activated|Activated()`).</td>
      <td>Creates a new part at the location within the 3D world where the player touched or clicked.</td>
    </tr>
    <tr>
      <td>**Invisibility Cloak**</td>
      <td>Detects when the player equips the tool (`Class.Tool.Equipped|Equipped()`) or unequips the tool (`Class.Tool.Unequipped|Unequipped()`).</td>
      <td>Makes the player invisible to all other players while the cloak is equipped and restores the player to full visibility when the cloak is unequipped.</td>
    </tr>
    <tr>
      <td>**Mega‑Bow**</td>
      <td>Detects how long the player activates the tool (time between `Class.Tool.Activated|Activated()` and `Class.Tool.Deactivated|Deactivated()`).</td>
      <td>Shoots a magical arrow with greater or lesser power, depending on the detected activation time.</td>
    </tr>
  </tbody>
</table>
