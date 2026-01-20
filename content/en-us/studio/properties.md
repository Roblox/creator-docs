---
title: Properties window
description: The Properties window lets you adjust properties of a selected object to change how it looks and behaves.
---

The **Properties** window, accessible from Studio's **Window** menu or **Home** tab toolbar, allows you to adjust certain properties of a selected object to change how the object looks and behaves. Additionally, you can manage [tags](#instance-tags) and configure instance [attributes](#instance-attributes) at the bottom of the window.

<img src="../assets/studio/general/Toolbar-Properties.png" width="800" alt="Properties highlighted in Studio's toolbar." />

When you select an object, the window's header bar changes to reflect the object's class and name, and its properties are divided into sections. For example, a `Class.MeshPart` includes sections like **Appearance** and **Transform** which respectively allow you to change its appearance and transform its `Class.BasePart.Size|Size`, `Class.BasePart.CFrame|CFrame`, and origin.

<img src="../assets/studio/properties/Sections-Example.png" width="320" />

<Alert severity="info">
You can collapse or expand any section or subsection by clicking the small arrow to the left of its name. After you expand or collapse a section, it remains expanded or collapsed for other objects of the same class, as well as related objects that share the same property grouping.
</Alert>

Some properties are collapsed by default, but you can expand them by clicking the small arrow next to its name. For instance, `Class.BasePart|BaseParts` contain a `Class.BasePart.Position|Position` property which represents an **X**, **Y**, **Z** coordinate in the 3D world. In Studio, these coordinates can be entered in two ways:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/properties/Input-Combined.png" width="320" />
    <figcaption>All three coordinates typed into the parent **Size** field, separated by commas</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/properties/Input-Expanded.png" width="320" />
    <figcaption>Property expanded and an individual size vector typed into the **X**, **Y**, and **Z** fields</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
After you expand or collapse a property, it remains expanded or collapsed for other objects of the same class, as well as related objects that share the same property.
</Alert>

## Property filter

You can filter properties by typing a search query into the **Filter Properties** input near the top of the window. For example, filtering by the letters "velo" finds all properties containing them, such as **AssemblyLinear<u>Velo</u>city** and **AssemblyAngular<u>Velo</u>city**. Quickly access this input by pressing <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>P</kbd> (Windows) or <kbd>⌘</kbd><kbd>Shift</kbd><kbd>P</kbd> (Mac).

<img src="../assets/studio/properties/Instance-Filtered.png" width="320" />

## Instance tags

The **Tags** section allows you to apply specific tags for use with `Class.CollectionService`. Tags are sets of strings applied to instances that replicate from the server to the client. They are also serialized when places are saved.

To add tags to an instance through the **Properties** window:

1. Select the instance, scroll to the **Tags** section, and click the **+** button.

   <img src="../assets/studio/properties/Add-Tag-Button.png" width="320" />

1. In the popup window, enter a new tag name **or** select a tag you've already created for any other instance from the list below the input field. The tag will appear within the **Tags** section.

   <img src="../assets/studio/properties/Set-Tag.png" width="320" />

1. If necessary, you can remove an existing tag by clicking the **&times;** icon.

   <img src="../assets/studio/properties/Remove-Tag-Button.png" width="320" />

## Instance attributes

**Attributes** allow you to customize instances with your own data. They are similar to built-in object properties, but you can create and modify your own attributes for any instance. Key features include:

- Attributes can be created, edited, and deleted directly within Studio or through scripting (see [properties and attributes](../scripting/attributes.md) for script commands to create, set, get, and delete attributes).
- Attributes and their values are saved with your place and assets.
- Value changes can be viewed in real time and are **replicated** so that clients can access them immediately.

You can store the following types/values in attributes:

<Grid container spacing={3}>
	<Grid item>
		<ul>
			<li>[string](../luau/strings.md)</li>
			<li>[boolean](../luau/booleans.md)</li>
			<li>[number](../luau/numbers.md)</li>
			<li>`Datatype.UDim`</li>
		</ul>
	</Grid>
	<Grid item>
		<ul>
			<li>`Datatype.UDim2`</li>
			<li>`Datatype.BrickColor`</li>
			<li>`Datatype.Color3`</li>
			<li>`Datatype.Vector2`</li>
		</ul>
	</Grid>
	<Grid item>
		<ul>
			<li>`Datatype.Vector3`</li>
			<li>`Datatype.CFrame`</li>
			<li>`Datatype.NumberSequence`</li>
			<li>`Datatype.ColorSequence`</li>
		</ul>
	</Grid>
	<Grid item>
		<ul>
			<li>`Datatype.NumberRange`</li>
			<li>`Datatype.Rect`</li>
			<li>`Datatype.Font`</li>
		</ul>
	</Grid>
</Grid><br />

New attributes can be created and modified in Studio as follows:

1. Select the instance, scroll to the **Attributes** section, and click the **+** button.

   <img src="../assets/studio/properties/Add-Attribute-Button.png" width="320" />

1. In the popup window, enter the attribute **Name**, select its **Type**, and click **Save**.
1. The new attribute will appear with a default value that you can change just like any other property.

   <img src="../assets/studio/properties/Set-Attribute.png" width="320" />

1. If necessary, you can rename or delete an attribute by clicking the gear icon.

   <img src="../assets/studio/properties/Rename-Delete-Attribute-Button.png" width="320" />

## Configurable defaults

The **configurable defaults** feature allows you to save properties from a selected `Class.Instance` as the new default for that type, reset them as needed, and share them from a local file if desired. Use cases include:

- A default `Class.MeshPart` instance where `Class.BasePart.Anchored|Anchored` is `true`, so that every new `Class.MeshPart` inserted into the 3D workspace is anchored.
- A set of default [mechanical constraints](../physics/mechanical-constraints.md) with physical behaviors that match the type of mechanisms you're currently building, such as massive vehicles vs. smaller machines with less mass.
- A set of default [light](../effects/light-sources.md) sources (`Class.PointLight`, `Class.SpotLight`, `Class.SurfaceLight`), each with `Class.Light.Brightness|Brightness` that suits the environment you're designing.

To **set** a specific instance as the default:

1. Select the instance in the 3D viewport or [Explorer](./explorer.md) hierarchy.
2. From Studio's main **Edit** menu, select **Save&nbsp;as&nbsp;Default&nbsp;[Instance]**. A toast notification will indicate that the default has been updated, and newly inserted instances of that type will match the default properties.

   <img src="../assets/studio/properties/Default-Properties-Toast.jpg" width="100%" />

	 <Alert severity="info">
	 Instance defaults are saved **locally** on each machine to a `DefaultInstances.rbxm` file, not to your Roblox or group account. The location of this directory can be changed in Studio's settings (<kbd>Alt</kbd><kbd>S</kbd> or <kbd>⌥</kbd><kbd>S</kbd>) under the **Studio** tab&nbsp;⟩ **Instance&nbsp;Defaults&nbsp;Dir**.
	 </Alert>

To **reset** a configurable default instance:

1. Select any instance of that type in the 3D viewport or [Explorer](./explorer.md) hierarchy.
2. From Studio's main **Edit** menu, select **Reset&nbsp;Default&nbsp;[Instance]**. Existing instances of that type will retain their properties, but newly inserted instances will use Studio's default properties.

<Alert severity="warning">
Note the following exceptions and behavioral rules to default instances:

- The **positional** instance properties `Class.BasePart.Position`, `Class.BasePart.CFrame`, `Class.PVInstance.Origin`, and `Class.Model.WorldPivot` are **not** affected by default properties, but rather are overridden by Studio insertion rules and workflows. However, `Class.GuiObject.Position` and positional properties for `Class.Attachment|Attachments` (`Class.Attachment.Position|Position`, `Class.Attachment.WorldCFrame|WorldCFrame`, `Class.Attachment.WorldPosition|WorldPosition`) are stored/maintained in configured defaults of those instance types.
- Studio's **Group as Model** (<kbd>Ctrl</kbd><kbd>G</kbd> or <kbd>⌘</kbd><kbd>G</kbd>) and **Group&nbsp;as&nbsp;Folder** (<kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>G</kbd> or <kbd>⌘</kbd><kbd>⌥</kbd><kbd>G</kbd>) actions do **not** use the instance defaults for `Class.Model` or `Class.Folder`, respectively.
</Alert>
