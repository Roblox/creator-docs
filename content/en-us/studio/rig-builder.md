---
title: Rig Builder
description: The Rig Builder is a built-in plugin that lets you insert pre-built character models.
---

The **Rig Builder** tool allows you to quickly insert basic pre-built character rigs into your experience for use in animation, clothing testing, and other applications. You can also insert a rig of your account's avatar character, including character customizations and accessories. The rig builder generates character `Class.Model|Models` with the appropriate joints and humanoid structure to support [animation](../animation/index.md), [accessories](../art/accessories/index.md), and [character customizations](../characters/appearance.md).

<img src="../assets/studio/rig-builder/Rig-Examples.jpg" width="100%" />

<Alert severity="warning">
At this time, the rig builder tool doesn't generate character rigs compatible with facial animation.
</Alert>

## Rig Types

There are two types of default rigs you can [insert](#inserting-a-pre-built-rig) into your experience with the rig builder. An **R6** rig is a legacy rig made up of 6 mesh objects, while an **R15** rig is a model with 15 mesh objects, significantly expanding the R6's limited motion range. When creating rigs for use in your experience, use a rig type that is consistent with the rig types you intend to support in your experience.

<Alert severity = 'warning'>
Note that you can only equip clothing and other layerable accessories to **R15** models.
</Alert>

## Inserting a Pre-Built Rig

You can insert all pre-built rig types directly from the **Rig Builder** into your viewport.

1. In the menu bar, navigate to the [Avatar](../studio/avatar-tab.md) tab and click on **Rig&nbsp;Builder**.

   <img src="../assets/studio/general/Avatar-Tab-Rig-Builder.png" width="760" />

1. Select from the available options. The rig displays both in the 3D viewport
   and in the [Explorer](../studio/explorer.md) window under the name **Rig**.

   <img src="../assets/studio/explorer/Rig-Hierarchy.png" width="320" />
