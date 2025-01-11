---
title: NPC Kit
description: The NPC Kit provides several pre-built, customizable NPCs for use an any experience.
---

<Alert severity="info">
The content of this project and documentation can be used under Roblox's [Limited Use License](../resources/limited-use-license.md).
</Alert>

NPCs (non-player characters) can add a lot of depth to an experience. All of the following NPCs can be visually customized, their [behavior modified](#configuration), and the zombie/soldiers can even defend an area by attacking players or other characters using a [tag system](#assigning-tags) to set behavior.

To use an NPC in your game:

1. Select one of the following NPC kits:

   <GridContainer numColumns="2">
   <figure>
   <a href="https://www.roblox.com/library/3924238625/Drooling-Zombie-Rthro" target="_blank" rel="noopener"><img src="../assets/resources/npc-kit/Endorsed-NPC-Zombie.jpeg" /></a>
   <figcaption>Drooling Zombie</figcaption>
   </figure>
   <figure>
   <a href="https://www.roblox.com/library/3924234975/Soldier-Rthro" target="_blank" rel="noopener"><img src="../assets/resources/npc-kit/Endorsed-NPC-Soldiers.jpeg" /></a>
   <figcaption>Soldiers</figcaption>
   </figure>
   <figure>
   <a href="https://www.roblox.com/library/3924232032/RO-01-Robot" target="_blank" rel="noopener"><img src="../assets/resources/npc-kit/Endorsed-NPC-RO-01-Robots.jpeg" /></a>
   <figcaption>RO-01 Robots</figcaption>
   </figure>
   <figure>
   <a href="https://www.roblox.com/library/3924229481/NP-C-9000-Robot" target="_blank" rel="noopener"><img src="../assets/resources/npc-kit/Endorsed-NPC-NP-C-9000-Robots.jpeg" /></a>
   <figcaption>NP-C 9000 Robots</figcaption>
   </figure>
   </GridContainer>

2. On the NPC's item page, click the green **Get** button and confirm the transaction.
3. In Roblox Studio, open the [Toolbox](../projects/assets/toolbox.md) (**View** → **Toolbox**).
4. Select your toolbox **Inventory** section.

   <img src="../assets/studio/toolbox/Inventory-Tab.png"
   width="360" />

5. Locate the NPC and click it to add it into the place.

## Character Structure

Each NPC model typically contains the following objects:

<table>
<thead>
  <tr>
    <th>Object Name or [Type]</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Animations</td>
    <td>`Class.Folder`</td>
    <td>Contains `Class.Animation|Animations`, such as an `AttackAnimation` or `DeathAnimation`.</td>
  </tr>
  <tr>
    <td>Initial Poses</td>
    <td>`Class.Folder`</td>
    <td>Contains posing information.</td>
  </tr>
  <tr>
    <td>[Animate](#animate)</td>
    <td>`Class.Script`</td>
    <td>Loads and plays animations on the character rig. See [Animate](#animate) for more details.</td>
  </tr>
  <tr>
    <td>[Accessory]</td>
    <td>`Class.Accessory`</td>
    <td>One of possibly multiple `Class.Accessory|Accessories` for the NPC such as hats, weapons, etc. </td>
  </tr>
  <tr>
    <td>Health</td>
    <td>`Class.Script`</td>
    <td>Typically regenerates the `Class.Humanoid` health over time. Disabling this will prevent the character from regenerating health. </td>
  </tr>
  <tr>
    <td>Humanoid</td>
    <td>`Class.Humanoid`</td>
    <td>Manages `Class.Humanoid` related properties, such as `Class.Humanoid.Health`, `Class.Humanoid.WalkSpeed`, `Class.Humanoid.DisplayDistanceType`, etc.</td>
  </tr>
  <tr>
    <td>NPC</td>
    <td>`Class.Script`</td>
<td>
<p>Defines character-specific behaviors such as roaming, attacking, etc. Parents the following objects:</p>
<p>**Maid** (`Class.ModuleScript`) defines a class useful in releasing resources used.</p>
<p>**Ragdoll** (`Class.ModuleScript`) defines a function that transforms a character into a loose physics-affected body (parents a RigTypes `Class.ModuleScript` that defines several helper functions).</p>
</td>
  </tr>
  <tr>
    <td>RbxNpcSounds</td>
    <td>`Class.Script`</td>
    <td>Defines and manages behavior related to character sound effects like running, dying, etc.</td>
  </tr>
  <tr>
    <td>[BodyParts](#bodyparts)</td>
    <td>`Class.BasePart`</td>
    <td>Various character body parts attached to the HumanoidRootPart or neighboring body parts through Motor6D or constraint objects. See [BodyParts](#bodyparts) for more details. </td>
  </tr>
  <tr>
    <td>HumanoidRootPart</td>
    <td>`Class.BasePart`</td>
    <td>A special invisible part that's considered the root of the rig; this is also the `PrimaryPart` of the character's `Class.Model`.</td>
  </tr>
  <tr>
    <td>[Configuration](#configuration)</td>
    <td>`Class.Configuration`</td>
    <td>Contains value objects which tune various behaviors. See [Configuration](#configuration) for more details.</td>
  </tr>
</tbody>
</table>

<Alert severity ='info'>
**Square brackets []** refer to the object in general and the name doesn't matter. For example, [Model] refers to the weapon's `Class.Model` and you can rename it to whatever makes sense.
</Alert>

### Design Notes

When using the NPC kit, keep in mind the following design notes:

- The visual appearance of an NPC can be customized by adding/modifying various [BodyParts] objects and by adding `Class.Accessory` objects.

- The Soldiers, Drooling Zombie, and NP-C 9000 Robots use Rthro as the base of their rig. However, the RO-01 Robots use a modified Rthro base that adds thruster parts connected to the **UpperTorso** using `WeldConstraints`. Using simple joints in this way lets you include extra geometry for your characters without changing the original base rig.

- At a basic level, NPC animations can be customized by modifying the `AnimationId` of existing Animation objects within the **Animate** script poses, or those within the **Animations** folder. Such a change is essentially an asset swap - to change the finer details, you can create custom copies of existing animations, and to play animations under different conditions, you can edit the **Animate** or **NPC** scripts directly. For more information, see [Animation](../animation/index.md).

### Animate

The Animate `Class.Script` in the NPC `Class.Model` handles [animation](../animation/index.md) related configurations and contains the following objects:

<table>
<thead>
  <tr>
    <th>Object Name or [Type]</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>ScaleDampeningPercent</td>
    <td>`Class.NumberValue`</td>
    <td>Defines how animation speeds are modified as the character is scaled (less than 1 implies animation playback scales inversely as a character is scaled).</td>
  </tr>
  <tr>
    <td>PlayEmote</td>
    <td>`Class.BindableFunction`</td>
    <td>This can be invoked by other scripts in order to force the assumption of a pose.</td>
  </tr>
  <tr>
    <td>[Pose]</td>
    <td>`Class.StringValue`</td>
    <td>Reference to a playable animation category such as idle, jump, walk, etc. This object can parent any number of `Class.Animation|Animations`. <br /> <br />These `Class.Animation|Animations` parent a **Weight** (`Class.NumberValue`) that prioritizes one of multiple animations to play while the pose is assumed; typically used to add variety to idle and dance poses.</td>
  </tr>
</tbody>
</table>

### BodyParts

The BodyPart `Class.BasePart` in the NPC `Class.Model` represent the various character body parts and contains the following objects:

<table>
<thead>
  <tr>
    <th>Object Name or [Type]</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>AvatarPartScaleType</td>
    <td>`Class.StringValue`</td>
    <td> Determines how the part will be scaled; values can be **Classic**, **ProportionsNormal**, or **ProportionsSlender**.</td>
  </tr>
  <tr>
    <td>OriginalSize</td>
    <td>`Class.Vector3Value`</td>
    <td>Determines the size of the part when the character scaling is 1.</td>
  </tr>
  <tr>
    <td>[Attachment]</td>
    <td>`Class.Attachment`</td>
    <td>Defines a point relative to the individual part which scripts, effects, and objects such as a `Class.Tool` or `Class.Accessory` may utilize during positioning.</td>
  </tr>
  <tr>
    <td>[Motor6D]</td>
    <td>`Class.Motor6D`</td>
    <td>An animated joint between two body parts. Note that `Class.Animator` depends on the name of `Class.Motor6D|Motor6Ds` to be consistent with that of the `Class.Motor6D|Motor6Ds` used when an animation was created, so avoid renaming this object.</td>
  </tr>
  <tr>
    <td>[Joint]</td>
    <td>`Class.WeldConstraint`, `Class.Constraint`, `Class.JointInstance`</td>
    <td> A non-animated joint between two body parts.</td>
  </tr>
  <tr>
    <td>[Sound]</td>
    <td>`Class.Sound`</td>
    <td>Commonly found in the head or `HumanoidRootPart`; plays sounds from within the rig as controlled by the `RbxNpcSounds` script.</td>
  </tr>
</tbody>
</table>

### Configuration

Each NPC includes a `Class.Configuration` object within its hierarchy which acts as a container of value objects. These are used by the NPC script to tune various behaviors. Unless otherwise specified, these apply to all of the characters.

<table>
<thead>
  <tr>
    <th>Object Name or [Type]</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>DestroyOnDeath</td>
    <td>`Class.BoolValue`</td>
    <td>Causes the entire NPC to be destroyed shortly after it dies. Disable this for ragdolls to be persistent.</td>
  </tr>
  <tr>
    <td>PatrolEnabled</td>
    <td>`Class.BoolValue`</td>
    <td>Causes the NPC to wander in an area around its starting position.</td>
  </tr>
  <tr>
    <td>PatrolRadius</td>
    <td>`Class.NumberValue`</td>
    <td>Defines the maximum distance an NPC will wander from its starting position, assuming **PatrolEnabled** is true.</td>
  </tr>
  <tr>
    <td>RagdollEnabled</td>
    <td>`Class.BoolValue`</td>
    <td>Causes the NPC to go limp when it dies, instead of breaking apart.</td>
  </tr>
  <tr>
    <td>AttackDamage</td>
    <td>`Class.NumberValue`</td>
    <td>Defines how much health is lost by a victim when attacked by the NPC. This applies for Zombie and Soldier kits only.</td>
  </tr>
  <tr>
    <td>AttackDelay</td>
    <td>`Class.NumberValue`</td>
    <td>Defines the minimum number of seconds between shots. This applies for Soldier kits only.</td>
  </tr>
  <tr>
    <td>AttackMode</td>
    <td>`Class.NumberValue`</td>
    <td>Specifies what the soldier will attack, based on the [tagging system](#assigning-tags). This applies for Soldier kits only.</td>
  </tr>
  <tr>
    <td>AttackRadius</td>
    <td>`Class.NumberValue`</td>
    <td>Defines the maximum distance the NPC must be from a potential victim before it attempts to attack. This applies for Zombie and Soldier kits only.</td>
  </tr>
  <tr>
    <td>ClipCapacity</td>
    <td>`Class.NumberValue`</td>
    <td>Defines how many bullets the soldier can fire before needing to reload. This applies for Soldier kits only.</td>
  </tr>
  <tr>
    <td>ReloadDelay</td>
    <td>`Class.NumberValue`</td>
    <td>Defines how many seconds must pass before the soldier's weapon clip is reloaded. This applies for Soldier kits only.</td>
  </tr>
</tbody>
</table>

## Assigning Tags

The **NPC** script uses `Class.CollectionService` tags to manage aggression toward other characters and players. Various tags from the following table can be assigned as follows:

- To assign tag(s) to another NPC, assign them to the NPC's top-level `Class.Model` using the [Tags](../studio/properties.md#instance-tags) section of its properties, or Studio's [Tag&nbsp;Editor](../studio/view-tab.md#windows-and-tools).
- To assign a tag to a `Class.Player` character, you can add a `Class.Script` to **StarterCharacterScripts** with a `Class.CollectionService:AddTag()` call. For example:

  ```lua
  local CollectionService = game:GetService("CollectionService")

  CollectionService:AddTag(script.Parent, "SoldierEnemy")
  ```

<table>
<thead>
<tr>
<th>Tag</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td>**SoldierEnemy** or **SoldierFriend**</td>
<td>
Determines if a soldier, based on its **AttackMode** configuration value, should attack another character. When the soldier's **AttackMode** is set to `1`, other characters must be tagged with **SoldierEnemy** to be considered attackable. When the soldier's **AttackMode** is set to `2`, all objects without the **SoldierFriend** tag are considered attackable. When the soldier's **AttackMode** is set to `3`, these tags are ignored entirely and the soldier will attack all characters.
</td>
</tr>
<tr>
<td>**ZombieFriend**</td>
<td>This tag is used by the zombie to determine whether it should not attack a character. When applied, the zombie becomes docile toward the tagged character.</td>
</tr>
</tbody>
</table>
