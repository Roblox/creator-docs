---
title: Rig Builder
description: The Rig Builder is a built-in plugin that lets you insert pre-built character models.
---

The **Rig Builder** tool allows you to quickly insert basic pre-built character rigs into your experience for use in animation, clothing testing, and other applications. You can also insert a rig of your account's avatar character, including character customizations and accessories. The rig builder generates character `Class.Model|Models` with the appropriate joints and humanoid structure to support [animation](../animation/index.md), [accessories](../art/accessories/index.md), and [character customizations](../characters/appearance.md).

<img src="../assets/modeling/meshes/rig-builder/Rig-Examples.png"
	width="100%" />

The Rig Builder tool uses a default set of supported character rigs and allows you to add your own account avatar into the experience. For information on creating your own custom character rig in an external modeling application, see [Rigging](../art/modeling/rigging.md).

<Alert severity="warning">
At this time, the Rig Builder tool doesn't generate character rigs compatible with facial animation.
</Alert>

## Rig Type

There are two types of default rigs you can [insert](#inserting-a-pre-built-rig) into your experience with the Rig Builder. A R6 rig is a model made up of 6 mesh objects while a R15 rig is a model with 15 mesh objects, significantly expanding the R6's limited motion range. When creating rigs for use in your experience, use a rig type that is consistent with the rig types you intend to support in your experience.

<Alert severity = 'warning'>
You can only equip clothing and other layerable accessories to R15 models.
</Alert>

The following table lists the specific meshes that make up the body parts associated with each rig type:

<img src="../assets/avatar/rigs/R6-R15-Chart.png" width="590" />

## Inserting a Pre-Built Rig

You can insert all pre-built rig types directly from the Rig Builder into your viewport.

To insert a pre-built rig:

1. In the menu bar, navigate to the **Avatar** tab.

   <img src="../assets/studio/general/Avatar-Tab-Rig-Builder.png" width="760" />

2. In the **Rig Builder** section, click on **Rig Builder**. The **Rig Builder** window displays.

   <img src="../assets/modeling/meshes/rig-builder/Rig-Builder-UI.png" width="240" />

3. Select from the available options. The rig displays both in the **viewport**
   and in the **Explorer** window under the same name as the rig-type selected **Rig**.

   <img src="../assets/avatar/rigs/Explorer-Rig.png" width="320" />
