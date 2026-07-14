---
title: include
---

By default, `Class.GuiObject` containers **clip** their content (descendant `Class.GuiObject|GuiObjects`) through the `Class.GuiObject.ClipsDescendants|ClipsDescendants` boolean. If you want descendants to appear outside of a container's bounds, simply set `Class.GuiObject.ClipsDescendants|ClipsDescendants` to `false`.

<Grid container spacing={5}>
<Grid item>
	<figure>
		<img src="../../assets/ui/misc/ClipsDescendants-On.png" width="223" />
		<figcaption>`Class.GuiObject.ClipsDescendants|ClipsDescendants` = `true`</figcaption>
	</figure>
</Grid>
<Grid item>
	<figure>
	<img src="../../assets/ui/misc/ClipsDescendants-Off.png" width="292" />
		<figcaption>`Class.GuiObject.ClipsDescendants|ClipsDescendants` = `false`</figcaption>
	</figure>
</Grid>
</Grid>

Importantly, `Class.StarterGui.ClipsDescendantsSupportsRotation` must be `true` for clipping to work on **rotated** descendants (non‑zero `Class.GuiObject.Rotation|Rotation`) within the container. However, clipping **by** a rotated container (clipping container itself is rotated) or by rounded corners (`Class.UICorner`) is not supported. If you need clipping on rotated or rounded containers, consider `Class.CanvasGroup`.

<Grid container spacing={5}>
<Grid item>
	<figure>
		<img src="../../assets/ui/misc/Clipping-Descendants-Rotated.png" width="223" />
		<figcaption>`Class.GuiObject.ClipsDescendants|ClipsDescendants` = `true`<br />`Class.GuiObject.Rotation|Rotation` = `0`</figcaption>
	</figure>
</Grid>
<Grid item>
	<figure>
	<img src="../../assets/ui/misc/Clipping-Parent-Rotated.png" width="307" />
		<figcaption>`Class.GuiObject.ClipsDescendants|ClipsDescendants` = `true`<br />`Class.GuiObject.Rotation|Rotation` = `10`</figcaption>
	</figure>
</Grid>
</Grid>
