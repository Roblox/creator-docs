---
title: include
---

1. In the top-left corner, click the category selector dropdown and choose an asset category. Optionally click the **advanced filter** button to filter results by [verified creator](../../production/publishing/account-verification.md) status, a specific creator, the sale price for [plugins](../../studio/plugins.md), and file length for [audio assets](../../audio/assets.md).

	 <Grid container spacing={3}>
	 <Grid item>
	 <img src="../../assets/studio/toolbox/Creator-Store-Category-Selector.png" width="360" alt="The Toolbox window with the category selector highlighted" />
	 </Grid>
	 <Grid item>
	 <img src="../../assets/studio/toolbox/Creator-Store-Advanced-Filter.png" width="360" alt="The Toolbox window with the advanced filter highlighted" />
	 </Grid>
	 </Grid>

2. In the search field, type what you want to find and press <kbd>Enter</kbd>. The view curates a selection of assets according to your query.

	 <img src="../../assets/studio/toolbox/Model-Search-Example.png" width="360" />

3. <Chip label="OPTIONAL" size="small" variant="outlined" /> Hover over an asset thumbnail and click the magnifying glass icon to closely inspect the asset's community rating, description, and more.

   <img src="../../assets/studio/toolbox/Asset-Inspect-Icon.png" width="400" alt="A preview view of an asset with the inspect icon highlighted." />

4. To add an asset to an experience:

   - If the asset is a [model](../../parts/models.md), [mesh](../../parts/meshes.md), [decal](../../parts/textures-decals.md), [video](../../ui/video-frames.md), or [audio](../../audio/assets.md) asset, click it or drag‑and‑drop it into the 3D viewport. It then inserts into the [Explorer](../../studio/explorer.md) hierarchy, and assets with 3D content display in the viewport.
   - If the asset is a [plugin](../../studio/plugins.md), click it and use the **Install** button to add it to the mezzanine's **Plugins** tab.
   - If the asset is a font, click it and use the **Install** button to add it to your font library. It then becomes available for user interface elements such as [text labels](../../ui/labels.md) or [buttons](../../ui/buttons.md).

   <Alert severity="info">
   Some assets include scripts that perform specific actions, such as animating at runtime or triggering a sound. If you want to use an asset without allowing any of its scripts to run, right‑click the object in the [Explorer](../../studio/explorer.md) window and select **Disable&nbsp;Scripts** from the context menu.
   </Alert>
