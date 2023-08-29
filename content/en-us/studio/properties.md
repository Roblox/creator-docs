---
title: Properties Window
description: The Properties window lets you adjust properties of a selected object to change how it looks and behaves.
---

The **Properties** window, accessible from the [View](../studio/view-tab.md) tab, allows you to adjust certain properties of a selected object to change how the object looks and behaves. Additionally, you can configure [instance attributes](#instance-attributes) at the bottom of the window.

<img src="../assets/studio/general/View-Tab-Properties.png" width="876" alt="Properties toggle button in Studio" />

## Header Bar

When you select an object, the window's header bar changes to reflect both the class and name of the object.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/properties/Header-Example-A.png" />
    <figcaption>A model named PizzaRestaurant</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/properties/Header-Example-B.png" />
    <figcaption>A local script named CandleFlicker</figcaption>
  </figure>
</GridContainer>

## Section Organization

The Properties window divides an object's properties into sections. For example, a `Class.MeshPart` includes sections like **Appearance** and **Collision**, which respectively allow you to change its appearance and how it physically collides with other objects.

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

You can collapse or expand any section by clicking the small arrow to the left of its name. After you expand or collapse a section, it remains expanded or collapsed for other objects of the same class, as well as related objects that share the same property grouping. For example, the **Pivot** section is common to both `Class.Part|Parts` and `Class.MeshPart|MeshParts`.

<img src="../assets/studio/properties/Section-Expand-Collapse.png" width="320" />

## Expanding Inputs

Some properties are collapsed by default, but you can expand them by clicking the small arrow next to its name. For instance, `Class.BasePart|BaseParts` contain a **Position** property which represents an X, Y, Z coordinate in the 3D world. In Studio, these coordinates can be entered in two ways:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/properties/Input-Combined.png" />
    <figcaption>All three coordinates typed into the parent Position field, separated by commas</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/properties/Input-Expanded.png" />
    <figcaption>Property expanded and an individual coordinate typed into the X, Y, or Z field</figcaption>
  </figure>
</GridContainer>

After you expand or collapse a property, it remains expanded or collapsed for other objects of the same class, as well as related objects that share the same property.

## Filtering Properties

You can filter properties by typing a search query into the **Filter Properties** input near the top of the window. You can quickly access this input by pressing <kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>.

<img src="../assets/studio/properties/Instance-Filtered.png" width="320" />

## Instance Attributes

**Attributes** allow you to customize instances with your own data. They are similar to built-in object properties, but you can create and modify your own attributes for any instance. See [Instance&nbsp;Attributes](../studio/instance-attributes.md) for details.
