---
title: List Layouts
description: How to use list layouts and flex settings for highly responsive user interfaces.
---

The `Class.UIListLayout` positions sibling `Class.GuiObject|GuiObjects` into horizontal rows or vertical columns within their parent container. Whenever you add or remove a sibling object, the layout adjusts accordingly.

This layout is useful when you only want to order objects within a row or column, such as a dropdown menu.

<Grid container spacing={2}>
  <Grid item>
		<img src="../assets/ui/ui-objects/UIListLayout-Example.jpg" width="500" />
	</Grid>
	<Grid item>
		<img src="../assets/studio/explorer/UIListLayout.png" width="320" />
	</Grid>
</Grid>

<Alert severity="warning">
Once you insert a `Class.UIListLayout`, it either overrides or influences the `Class.GuiObject.Position|Position` and/or `Class.GuiObject.Size|Size` of all sibling UI objects, so changes to those properties within the [Properties](../studio/properties.md) window or within a script will not have the normal effect.
</Alert>
