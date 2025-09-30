---
title: Pickup system
comments:
description: Explains the pickup system for the Battle Royale game kit.
prev: /resources/battle-royale/core-scripts
next: /resources/battle-royale/building-system
---

The Roblox Battle Royale **pickup system** lets players pick up different kinds of objects, although it's currently only used for weapon pickups. In game, weapons are spawned around the game map and — when players get close enough — an on-screen key/action/button prompt appears along with the weapon name and description.

<img
alt="Battle Royale Weapon Example"
src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Weapon-Pickup.jpg"
width="100%" />

<Alert severity="info">
Roblox Battle Royale uses the [Weapons Kit](../../resources/weapons-kit.md), so please consult its documentation for details and customization options.
</Alert>

## Structure

There are several important folders related to the pickup system. Make sure that these folders are set up correctly in your project:

- `Workspace/PickupSpawners` — Contains pickup spawner `Class.Part|Parts` which tell the system where to place visual pickup `Class.Model|Models` (see the next point). Note that these spawners are **not required** to be in this folder since the system looks for parts tagged with the **PickupSpawner** tag instead of the folder path.

  <img
  alt="Pickup Spawners"
  src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-PickupSpawners.png"
  width="320" />

     <Alert severity="info">
     Pickup spawners can be placed at any physical location in the game, but they will choose a weapon **randomly** from `ReplicatedStorage/Assets/Weapons` and use the name-matched pickup model as a visual representation.
     </Alert>

- `ReplicatedStorage/Assets/Weapons` — Contains the weapons (functional `Class.Tool|Tools`) that the pickup system grants when a weapon pickup is activated.

  <img
  alt="Battle Royale Items"
  src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Weapons.png"
  width="320" />

- `ReplicatedStorage/Assets/Pickups` — Contains the pickup `Class.Model|Models` that the system will place at pickup spawners in the game world. **These should be visual models only**, not functional weapon Tools.

  <img
  alt="Battle Royale Pickups"
  src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Pickups.png"
  width="320" />

## Add new pickups

As noted above, pickups require both a functional `Class.Tool` and a visual `Class.Model` that will be spawned in the game world.

### Tool

1. Create a `Class.Tool` and give it a unique name. You can create new weapons based upon those in the [Weapons Kit](../../resources/weapons-kit.md) or take tools from the [Toolbox](../../projects/assets/toolbox.md).
2. Place the `Class.Tool` in `ReplicatedStorage/Assets/Weapons`.

   <img
   alt="Battle Royale New Weapon"
   src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-New-Weapon.png"
   width="320" />

### Model

1. Create a `Class.Model` for the visual pickup and give it the **same name** as you gave the `Class.Tool`.
2. Through the [Tags](../../studio/properties.md#instance-tags) section of its properties, apply the following tags to the model:

   - **Action**
   - **Pickup**
   - **WeaponPickup**
   - **WeaponSystemIgnore**
   - One of the rarity tags as outlined in [Rarity](#rarity).

3. Place the model in `ReplicatedStorage/Assets/Pickups`.

   <img
   alt="Battle Royale New Pickup"
   src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-New-Pickup.png"
   width="320" />

### Rarity

Pickup rarity is not defined by any mathematical formula, but you can associate an on-screen GUI like those pictured below to suggest an item's rarity.

1. Open the `ReplicatedFirst/Configurations/RarityConfiguration` script. This script contains tables for each rarity category, each of which includes a color value (`Color`) for the pickup's particle effect and an asset ID (`Image`) for the on-screen GUI background. For each GUI:

   - The item name will appear as the model/weapon name.
   - The description will appear as the rarity name (such as **Epic**) plus **Item**.

   The default rarities are as follows, but feel free to define your own.

   <table>
   <thead>
    <tr>
      <th>Rarity</th>
      <th>GUI</th>
    </tr>
   </thead>
   <tbody>
    <tr>
      <td>Common</td>
      <td><img src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Item-Common.png" width="45%" /></td>
    </tr>
    <tr>
      <td>Uncommon</td>
      <td><img src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Item-Uncommon.png" width="45%" /></td>
    </tr>
    <tr>
      <td>Rare</td>
      <td><img src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Item-Rare.png" width="45%" /></td>
    </tr>
    <tr>
      <td>Epic</td>
      <td><img src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Item-Epic.png" width="45%" /></td>
    </tr>
    <tr>
      <td>Legendary</td>
      <td><img src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Item-Legendary.png" width="45%" /></td>
    </tr>
    <tr>
      <td>Special</td>
      <td><img src="../../assets/resources/battle-royale/pickup-system/Battle-Royale-Item-Special.png" width="45%" /></td>
    </tr>
   </tbody>
   </table>

2. For the pickup `Class.Model` you created previously (located in `ReplicatedStorage/Assets/Pickups`), assign one of the tags you've defined in the `RarityConfiguration` script.
