---
title: Sound groups
description: Legacy audio mixers that group multiple Sound objects so you can control the properties of multiple audio signals at once.
---

<Alert severity = 'warning'>
`Class.SoundGroup` objects are now discouraged in favor of the more robust functionality of audio objects. For more information, see [Audio objects](../audio/objects.md).
</Alert>

A `Class.SoundGroup` is an **audio mixer** that groups multiple audio objects, such as `Class.Sound` objects or additional `Class.SoundGroup|SoundGroups`, allowing you to control the volume and dynamic effects properties of multiple audio signals at once. Useful applications include:

- [Assigning audio](#assign-audio-objects-to-sound-groups) to **SoundEffects** and **BackgroundMusic** sound groups so that you can adjust each group's master volume for optimal audio balancing.
- [Nesting sound groups](#nest-sound-groups) into meaningful categories under a mix tree.
- Grouping all sounds that need a specific [dynamic effect](../sound/dynamic-effects.md). For example, you can group all sounds inside a cave to a **Cave** sound group, then apply a `Class.ReverbSoundEffect` to simulate the sounds reflecting off of the cave's environment.

When creating `Class.SoundGroup|SoundGroups`, it's best to keep them all in a single location for organizational purposes as you continue to add and edit audio within your experience. The following example stores the new `Class.SoundGroup` under `Class.SoundService`, as this service determines how `Class.Sound` objects play in experiences.

## Create sound groups

To create a `Class.SoundGroup`:

1. In the **Explorer** window, hover over `Class.SoundService` and click the ⊕ button. A contextual menu displays.
2. From the menu, insert a `Class.SoundGroup`.

   <img src="../assets/studio/explorer/SoundService-SoundGroup.png" width="320" />

3. Triple-click the new sound group and rename it according to its purpose, such as **SoundEffects** or **BackgroundMusic**.

## Assign audio objects to sound groups

`Class.SoundGroup|SoundGroups` don't have the typical parent-child behavior of other forms of object grouping like `Class.Model|Models` and `Class.Folder|Folders`. Instead, you must **assign** each `Class.Sound` object to its applicable `Class.SoundGroup` object, regardless of either object's location in the workspace hierarchy, because where you place the `Class.Sound` object changes where audio emits from, not the `Class.SoundGroup` object itself. For more information, see [sound objects](../sound/objects.md).

To assign a `Class.Sound` object to a `Class.SoundGroup`:

1. In the **Explorer** window, select a sound object.
2. In the **Properties** window, click the **SoundGroup** property field. Your cursor changes.
3. In the **Explorer** window, click on the sound group object you want to assign your sound object to. The sound object's **SoundGroup** property updates accordingly.

   <img src="../assets/studio/properties/Sound-SoundGroup.png" width="320" />

## Nest sound groups

You can nest `Class.SoundGroup|SoundGroups` together into meaningful categories under a mix tree for organization and scripting purposes. When you're planning the parent-child relationships in your mix, consider the different sound categories in your experience, and how important they should be for the listener. For example, player ability sounds are likely much more important to gameplay than environmental sounds. If you group them into separate parent `Class.SoundGroup|SoundGroups`, you can easily access and [adjust their volume levels](#adjust-volume) as you add more `Class.Sound` objects to your experience.

To nest `Class.SoundGroup|SoundGroups`:

1. In the **Explorer** window, click-and-drag a sound group over the sound group you want to nest it under. The sound group name becomes translucent, and your cursor changes to a plus icon.

2. Drop the sound group. It displays as a child of the sound group you nested it under.

## Adjust volume

There are two main ways to think about a sound's volume: how loud the sound is by itself, and how loud it is in relation to other sounds. For example, a waterfall sounds loud when you play it by itself, but when you compare it to other sound effects like tires screeching, it likely sounds much quieter. To ensure that each sound plays at the correct volume for your experience, you can either [add multipliers](#add-multipliers) to `Class.SoundGroup|SoundGroups`, or prioritize audio from one `Class.SoundGroup` over another through the process of [ducking](#ducking).

### Add multipliers

The `Class.SoundGroup.Volume|Volume` property of a `Class.SoundGroup` lets you apply a **volume multiplier** between `0` and `10` to each of its child audio objects while they retain their relative volumes. This means that if a `Class.Sound` object has a volume of `0.5` and you child it to a `Class.SoundGroup` that has a volume multiplier of `0.5`, the effective volume of the `Class.Sound` object is `0.25`.

This property is useful when you want to test volume changes to different `Class.SoundGroup|SoundGroups` without having to manually change the volume of each `Class.Sound` object. For example, if you want to check what it'd sound like to increase the volume of all of your experience's music, you can create a **Music** `Class.SoundGroup` for every musical `Class.Sound` object or `Class.SoundGroup`, then apply a volume multiplier of `2`.

### Ducking

You can prioritize audio from one `Class.SoundGroup` over another through the `Class.CompressorSoundEffect`. This dynamic effect allows you to **duck**, or reduce in volume, `Class.Sound` objects in low-priority `Class.SoundGroup|SoundGroups` whenever `Class.Sound` objects in high-priority `Class.SoundGroup|SoundGroups` start to play. This allows the listener to concentrate on the specific audio that you want them to pay attention to while not suddenly cutting the audio from low-priority sounds completely. When the high-priority audio finishes playing, low-priority audio returns to its original volume, keeping the listener immersed in your experience.

The sounds that you choose to duck depend on the needs of your specific experience. For example, one experience might benefit from reducing the volume of background music whenever a GUI notification plays, while others might benefit from reducing the volume of GUI notifications whenever dialogue plays. The following reference mix tree prioritizes `Class.Sound` objects in the high-priority **GUI Notifications** and **Weapons** `Class.SoundGroup|SoundGroups` while de-prioritizing `Class.Sound` objects in low-priority **3D** and **2D Ambience** `Class.SoundGroup|SoundGroups`.

<img src="../assets/audio/sound-groups/Mix-Tree.png" width="182" />

The `Class.CompressorSoundEffect` has four main properties you must set in order to duck audio whenever your high priority audio plays:

<table>
<thead>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.CompressorSoundEffect.Threshold|Threshold`</td>
    <td>The threshold decibel level that Studio applies ducking. You can set this property to any value between `-80` (full compression) and `0` (full volume).</td>
  </tr>
  <tr>
    <td>`Class.CompressorSoundEffect.Attack|Attack`</td>
    <td>The rate you want audio to duck. You can set this property to any value between `0.001` and `1` second.</td>
  </tr>
  <tr>
    <td>`Class.CompressorSoundEffect.Release|Release`</td>
    <td>The rate you want the audio to stop ducking. You can set this property to any value between `0.001` and `1` second.</td>
  </tr>
  <tr>
    <td>`Class.CompressorSoundEffect.Ratio|Ratio`</td>
    <td>The ratio of how much ducking you want to occur between the audio object that Studio prioritizes and the audio object that ducks. You can set this property to any value between `1` (no compression) and `50` (fifty times the compression).</td>
  </tr>
</tbody>
</table>

The values of each of these properties are highly dependent on your specific audio. Each source audio has a different volume, and you might only need to duck by a minimal amount in order for your high priority audio to have emphasis in your experience.

To prioritize `Class.SoundGroup|SoundGroups` through the `Class.CompressorSoundEffect`:

1. In the **Explorer** window, navigate to the SoundGroup you want to duck and insert a CompressorSoundEffect.
   1. Hover over the **SoundGroup** and click the ⊕ button. A contextual menu displays.
   1. From the menu, insert a **CompressorSoundEffect**.
2. Select the **CompressorSoundEffect**, then navigate to the **Properties** window.
3. Select the **SideChain** property. Your cursor changes.
4. Select the **Sound** or **SoundGroup** object that you want to prioritize when the compressor applies. The **SideChain** property updates accordingly.
5. In the **Threshold property** field, input the decibel level in which you want the ducking to start.
6. In the **Attack** property field, input how quickly you want audio to duck.
7. In the **Release** property field, input how quickly you want the audio to stop ducking.
8. In the **Ratio** property field, input the ratio of how much compression you want to occur between the audio object that ducks and the audio object that Studio prioritizes.
9. **(Optional)** Play test your experience to see if the audio sounds correct. If not, adjust the **CompressorSoundEffect** properties accordingly.
