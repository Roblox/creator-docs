---
title: Create player tools
description: The process for creating and customizing Tools that players can equip and use.
next: /tutorials/use-case-tutorials/scripting/intermediate-scripting/hit-detection-with-lasers
prev: /tutorials/use-case-tutorials/scripting/intermediate-scripting/create-a-health-pickup
---

Tools are a simple way to manage items that the player can hold in their hand and use in-game. They can range from weapons such as swords to food items.

In this tutorial, you'll learn how to create a tool in the shape of a laser blaster that will play sound effects when equipped or activated.

![](../../../../assets/tutorials/creating-player-tools/title-image.jpg)

## Create the tool

The `Class.Tool` object is the basis of any tool in Roblox, so you'll need to create one. It's easier to change how tools look by adding objects such as Parts and MeshParts to the tool in the workspace where they are visible.

1. Insert a **Tool** into the workspace and name it **Blaster**.

   ![](../../../../assets/tutorials/creating-player-tools/explorer-blaster.png)

2. Insert a `Class.MeshPart` into the tool.

   ![](../../../../assets/tutorials/creating-player-tools/explorer-MeshPart.png)

3. Set the **MeshId** property to `rbxassetid://92656610`.
4. Set the **TextureId** property to `rbxassetid://92658105`.

   <GridContainer numColumns="2">
     <img src="../../../../assets/tutorials/creating-player-tools/properties-MeshPart.png" />
     <img src="../../../../assets/tutorials/creating-player-tools/viewport-mesh.jpg" />
   </GridContainer>

5. The tool needs a part named **Handle** for the player to hold. Change the name of the MeshPart to **Handle**.

   ![](../../../../assets/tutorials/creating-player-tools/explorer-handle.png)

<Alert severity="warning">
  If you don't include a part named <b>Handle</b> in the tool, it will drop to the ground when a player tries to equip it.
</Alert>

## Store the tool

Tools can be kept in the 3D world as **collectable tools** or given to all players as **starter tools**.

### Collectable tool

The blaster is currently a child of **Workspace** so it will be collectable. A player can pick up the tool by touching it, causing it to become a child of the character model; the tool will then be equipped and placed in their hotbar.

<video controls loop muted>
  <source src="../../../../assets/tutorials/creating-player-tools/video-collection.mp4" />
</video>

During gameplay, unequipped tools are stored within the player's hierarchy in the Backpack and then moved to their character model when equipped. Any tool that becomes a child of a character will be automatically equipped.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../../assets/tutorials/creating-player-tools/explorer-unequipped.png" />
    <figcaption>Tripmine Unequipped</figcaption>
  </figure>
  <figure>
    <img src="../../../../assets/tutorials/creating-player-tools/explorer-equipped-character.png" />
    <figcaption>Tripmine Equipped</figcaption>
  </figure>
</GridContainer>

### Starter tool

Storing a tool in `Class.StarterPack` will place it in a player's `Class.Backpack` when they join or respawn.

1. Move the **Blaster** to **StarterPack** in the **Explorer**.

   ![](../../../../assets/tutorials/creating-player-tools/explorer-starterpack.png)

2. Play the experience to test the tool. Click on the hotbar at the bottom of the screen or press **1** on the keyboard to equip the tool.

## Tool properties

### Position / orientation

A tool's position and orientation can be changed using the **grip** properties. **GripPos** changes the position of the grip, whereas **GripForward**, **GripRight** and **GripUp** affect the rotation.

Currently the player is holding the center of the blaster instead of the grip.

1. Set the **GripPos** property of the tool to **0, -0.4, 1.1**.

   ![](../../../../assets/tutorials/creating-player-tools/property-grippos.png)

2. [Initiate a playtest](../../../../studio/testing-modes.md#playtesting) to test the tool. Notice how the tool is now being gripped in a different position.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../../assets/tutorials/creating-player-tools/viewport-weapon-pos-2.jpg" />
       <figcaption>Before</figcaption>
     </figure>
     <figure>
       <img src="../../../../assets/tutorials/creating-player-tools/viewport-weapon-pos-1.jpg" />
       <figcaption>After</figcaption>
     </figure>
   </GridContainer>

### Hotbar icon

By default, the tool **name** will be displayed on the hotbar icon. It's good practice to change the icon to be an image of the tool. Set the **TextureId** property of the tool to `rbxassetid://92628145`.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../../assets/tutorials/creating-player-tools/viewport-blaster-icon-2.png" />
    <figcaption>Before</figcaption>
  </figure>
  <figure>
    <img src="../../../../assets/tutorials/creating-player-tools/viewport-blaster-icon.png" />
    <figcaption>After</figcaption>
  </figure>
</GridContainer>

### Tooltip

A **tooltip** is a small text description that appears when the mouse hovers over a tool in the hotbar. They typically include the name of the tool and/or a brief description of its function. Change the **ToolTip** property to **Blaster**.

![](../../../../assets/tutorials/creating-player-tools/viewport-tooltip.png)

## Use scripts with tools

A tool has three key events you can connect to: `Class.Tool.Equipped|Equipped`, `Class.Tool.Unequipped|Unequipped` and `Class.Tool.Activated|Activated`.

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>`Class.Tool.Equipped|Equipped`</b></td>
            <td>Fired when a tool is equipped by the player, for example  when a tool is selected in the hotbar.</td>
        </tr>
        <tr>
            <td><b>`Class.Tool.Unequipped|Unequipped`</b></td>
            <td>Fired when a tool is unequipped by the player, for example when a tool is deselected in the hotbar.</td>
        </tr>
        <tr>
            <td><b>`Class.Tool.Activated|Activated`</b></td>
            <td>Fired when a tool is activated by the player, for example when a player left-clicks.</td>
        </tr>
    </tbody>
</table>

These methods only work in `Class.LocalScript|LocalScripts` because only the player's device knows when input happens, such as a mouse button being clicked or a screen being touched.

## Add the sounds

To see these events in action, you can play a sound when they fire. First, you'll need to create Sound objects to use for this.

1. Insert two `Class.Sound` objects into the **Handle**.

2. Rename one sound **Equip** and set its SoundId property to `rbxassetid://282906960`.

3. Rename the other sound **Activate** and set its SoundId property to `rbxassetid://130113322`.

   ![](../../../../assets/tutorials/creating-player-tools/explorer-sounds.png)

## Add the code

The example code below plays the **Equip** sound when the tool is equipped and the **Fire** sound when activated.

1. Insert a **LocalScript** into the tool and name it **ToolController**.

   ![](../../../../assets/tutorials/creating-player-tools/explorer-toolcontroller.png)

2. Insert the following lines of code into the script.

   ```lua
   local tool = script.Parent

   local function toolEquipped()
   	tool.Handle.Equip:Play()
   end

   local function toolActivated()
   	tool.Handle.Activate:Play()
   end

   tool.Equipped:Connect(toolEquipped)
   tool.Activated:Connect(toolActivated)
   ```

3. Test the blaster sound effects by equipping and clicking to activate the tool.

Now you know how to create and script a basic tool, try creating other simple tools such as a flashlight or speaker.
