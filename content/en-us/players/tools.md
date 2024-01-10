---
title: In-Experience Tools
description:
---

In-experience `Class.Tool|Tools` are interactive tools that users can equip in sessions, such as swords, rocket launchers, and magic wands. You can create customized in-experience tools, put them in your experience hierarchy, and write scripts to implement them for your users.

## Creating an In-Experience Tool

For the first step of creating any in-experience tool, you need to [create a tool object](#creating-the-tool-object) to contain all elements that make up the tool. You can then add other instances to the tool object including [parts and meshes](#adding-parts-or-meshes), sound effects, and scripts which provide functionality. You can also set up a [tool handle](#setting-the-tool-handle), [adjust the tool grip](#adjusting-the-tool-grip-orientation), and [customize your tool icon](#customizing-the-tool-icon) to improve the user experience.

### Creating the Tool Object

You can create a new tool object with the following steps:

1. In the **Explorer** window, hover over **Workspace** and click the **&CirclePlus;** button to show the list of objects.

2. Select **Tool** under the **Interaction** category.

   <img src="../assets/players/in-experience-tools/Create-New-Tool.png" width="45%" />

### Adding Parts or Meshes

After creating the tool object, you need to add `Class.Part|Parts` or `Class.MeshPart|MeshParts` to the tool model or [create the tool as an inventory item](#creating-tools-as-inventory-items) without parts and meshes. Like other models, in-experience tools can consist of multiple `Class.Part|Parts`, so you need to connect all parts of the tool together using the `Class.Weld` constraints.

<Alert severity="warning">
When constructing tools, make sure tool parts are not anchored, otherwise users might get stuck in place when equipping it.
</Alert>

If you want to create a tool without adding parts or meshes, you can [create it as an inventory item](#creating-tools-as-inventory-items).

### Setting the Tool Handle

To enable users to carry tools around, you need to set a `Class.Part` and name it `Handle` for attaching to the user's hand. The following example shows a magic wand with three parts: a glowing tip, the main body, and a red handle. When a user equips the wand, they hold it at the `Class.Part` named `Handle`.

<img src="../assets/players/in-experience-tools/Tool-Wand-Handle-Focus.jpeg" width="45%" />

Make sure to have only one `Class.Part` named `Handle`. If you name multiple `Class.Part|Parts` as `Handle`, the tool randomly picks one of them as the hand attachment point that might cause issues such as users holding blades of swords instead of hilts.

<Alert severity="warning">
The `Handle` must be a **direct child** of the tool object. Do not nest it inside a model or folder within the object.
</Alert>

### Adjusting the Tool Grip Orientation

If your tool's grip orientation is incorrect, such as dragging on the ground or facing backwards, you can fix it by adjusting **Grip** properties under the **Appearance** category in the **Properties** window.

<img src="../assets/players/in-experience-tools/Tool-Grip-Properties.png" width="45%" />

Since the ideal grip orientation for every tool is different, you need to experiment with changing the values next to the **GripForward**, **GripRight**, and **GripUp** properties until your tool's grip looks correct. The following example shows possible incorrect and correct grips for a magic wand:

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Dragging.jpeg" />
    <figcaption>Tool dragging on ground</figcaption>
  </figure>
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Backwards.jpeg" />
    <figcaption>Tool facing backwards</figcaption>
  </figure>
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Correct.jpeg" />
    <figcaption>Tool oriented correctly</figcaption>
  </figure>
</GridContainer>

You can also enable user characters to offset tools from their hand with the **GripPos** property. This can be useful when making a tool that should appear to rest on the user's shoulder.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Offset-Default.jpeg" />
    <figcaption>Default offset (0,0,0)</figcaption>
  </figure>
  <figure>
    <img src="../assets/players/in-experience-tools/Tool-Grip-Offset-Shoulder.jpeg" />
    <figcaption>Tool offset to shoulder</figcaption>
  </figure>
</GridContainer>

### Customizing the Tool Icon

Tools that a user owns are stored in their `Class.Backpack`. Users can view the icon of each tool in their backpacks on an **action bar**:

<img src="../assets/players/in-experience-tools/Tool-Action-Bar.jpeg" width="90%" />

In the tool's **Properties** window, use the following properties to customize the tool's appearance in the action bar:

- **TextureID** — The tool icon. Set the image ID for this property the same way as decals and image buttons.
- **ToolTip** — The on-hover tooltip name.

### Enabling and Disabling Users to Drop Tools

By default, a user can drop a tool by pressing the **Backspace** key on Windows or **delete** on Mac. You can disable this option by setting the **CanBeDropped** property of the tool to `false`. If **CanBeDropped** is `false`, pressing **Backspace** or **delete** returns the tool to the user's backpack.

### Creating Tools As Inventory Items

You can also make an in-experience tool without parts or meshes as an inventory item that waits for user input, such as a magic spell that user characters can click others or touch the screen to cast it. Inventory item tools don't require handles, so you need to uncheck the **RequiresHandle** property in the tool's **Properties** window.

<img src="../assets/players/in-experience-tools/Tool-RequiresHandle.png" width="45%" />

## Adding Tools to Your Experience

Once you finish setting up your in-experience tool, you need to place it in the proper area of your experience's object hierarchy. Where you place the tool within the experience's object hierarchy depends on it's intended use.

### Default Starting Tool

If you want all users to start out with a tool in their inventory, put it inside the **StarterPack** folder. When any user spawns, the system copies the tool to their backpack.

<img src="../assets/players/in-experience-tools/Tool-StarterPack.png" width="45%" />

### Collectible Tool

If you want to allow users to collect tools as they move, you can place the tools in the **Workspace** in the **Explorer** hierarchy. For example, you might want to place a super rocket launcher in a hard-to-reach area of your experience world.

<img src="../assets/players/in-experience-tools/Tool-Workspace.png" width="45%" />

### Earned and Purchased Tool

If you want to set a tool as awards when a user does something special or offer it for sale in an in-experience store, put the tool inside **ServerStorage** in the **Explorer** hierarchy, which can clone the tool to the user's backpack at the proper time.

<img src="../assets/players/in-experience-tools/Tool-ServerStorage.png" width="45%" />

## Adding Tools Effects

After adding your tools to your experience, you can add scripts to enable users to use tools to do special effects.

### Tool-Specific Events

You can use the following four tool-specific conditions indicating the state of the tool and the user's input with it in your tool script:

- `Class.Tool.Equipped|Tool:Equipped()`: Occurs when the user selects the tool from their backpack.

- `Class.Tool.Unequipped|Tool:Unequipped()`: Occurs when the user drops the tool or switches tools.

- `Class.Tool.Activated|Tool:Activated()`: Occurs when the user starts activating the tool (clicks, taps, or presses **A** on a gamepad).

- `Class.Tool.Deactivated|Tool:Deactivated()`: Occurs when the user stops the activation input (releases the button or touch).

Though you might not need all four conditions when designing a tool, you can use the following code script as a basic tool script template:

```lua
local tool = script.Parent
local function onEquip()
  print("The tool is now equipped.")
end
local function onUnequip()
  print("The tool is now unequipped.")
end
local function onActivate()
  print("The tool is now activated.")
end
local function onDeactivate()
  print("The tool is now deactivated.")
end
tool.Equipped:Connect(onEquip)
tool.Unequipped:Connect(onUnequip)
tool.Activated:Connect(onActivate)
tool.Deactivated:Connect(onDeactivate)
```

This code sample assumes that the script is a first-level child inside the tool object. If the script is elsewhere, adjust the path on line 1 (the value of `tool`) to point to the core tool object.

### Adding a Basic Script

The following example shows steps for adding a `Class.Script` on the server that enables users to equip a magic wand that can switch day and night by clicking on the screen:

1. In the Explorer window, hover over the tool object and click the **&CirclePlus;** button to insert a `Class.Script`.

2. Copy the following code and paste it into your `Class.Script`.

   ```lua
   local Lighting = game:GetService("Lighting")

   local tool = script.Parent
   local function onActivate()
    if Lighting.ClockTime >= 8 and Lighting.ClockTime < 16 then
      Lighting.ClockTime = 20
    else
      Lighting.ClockTime = 8
    end
   end
   tool.Activated:Connect(onActivate)
   ```

3. Playtest your experience by picking up the tool and then clicking anywhere on the screen of your experience to switch between day and night:

   <GridContainer numColumns="2">
     <img src="../assets/players/in-experience-tools/Tool-Time-Wand-Day.jpeg" />
     <img src="../assets/players/in-experience-tools/Tool-Time-Wand-Night.jpeg" />
   </GridContainer>

### Different Types of Scripts for Tools Implementation

Some tools only need a `Class.Script` on the server to implement, such as the previous example, but most tools require both a `Class.Script` on the server and a `Class.LocalScript` on the client, where each takes care of certain aspects of the tool's behavior.

Before adding your scripts, make sure you understand the core difference between each script type:

- **Script** manages changes within the overall experience world visible to all users, such as unlocking a door and shooting an arrow.
- **LocalScript** manages things that happen only on the user's device, such as detecting the location of where they touch or click the screen.

Here are some example tools and their behaviors managed by either a local script or a server script:

<table>
  <thead>
    <tr>
      <td>Tool</td>
      <td>Local Script</td>
      <td>Server Script</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Creator's Wand</b></td>
      <td>Detects where the player touches or clicks on the screen.</td>
      <td>Creates a new part at the location within the game world where the player touched or clicked.</td>
    </tr>
    <tr>
      <td><b>Invisibility Cloak</b></td>
      <td></td>
      <td>Temporarily makes the player invisible to all other users, while the cloak is equipped.</td>
    </tr>
    <tr>
      <td><b>Mega-Bow</b></td>
      <td>Detects how long the player activates the tool (time between activation and deactivation).</td>
      <td>Shoots a magical arrow with greater or lesser power, depending on the detected activation time.</td>
    </tr>
  </tbody>
</table>

For more information on the different script types, see [Scripts](../scripting/scripts.md).

#### Troubleshooting Tips

A tool might work fine in Studio but not in a live Roblox experience. If this occurs, use the following tips for troubleshooting:

- `Class.LocalScript|LocalScripts` and `Class.Script|Scripts` can't directly listen to each other, so you need to add a `Class.RemoteEvent` to send messages between the two scripts.
- Make sure that each `Class.Script` and `Class.LocalScript` only takes care of exactly what it's supposed to do.

For more information on `Class.RemoteEvent|RemoteEvents`, see [Remote Events and Callbacks](../scripting/events/remote.md).
