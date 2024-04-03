---
title: Texture Generator
description: The Texture Generator tool quickly creates custom textures for meshes through text prompts.
---

<Alert severity="success">
This feature is currently in beta. To use it, go to **File**&nbsp;&rarr; **Beta&nbsp;Features** and enable **AI‑Powered&nbsp;Texture&nbsp;Generator**.
</Alert>

The **Texture Generator** tool is designed to quickly create custom textures for your meshes through text prompts. You can select a mesh or `Class.Model` made up of several meshes&sup1;, type in any prompt to preview results within a few seconds, then generate full textures.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/texture-generator/Generation-Rusted-Metal-Charred.jpg" />
    <figcaption>"Rusted Charred Metal Castle"</figcaption>
  </figure>
	<figure>
    <img src="../assets/studio/texture-generator/Generation-Mossy-Stone.jpg" />
    <figcaption>"Mossy Stone Fortress"</figcaption>
  </figure>
	<figure>
    <img src="../assets/studio/texture-generator/Generation-Snow-Covered-Ice.jpg" />
    <figcaption>"Snow Covered Ice Sculpture"</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
**Texture Generator** is best suited for custom 3D assets where the desired texture is contextual to the asset itself. To generate repeating or tiled images for texturing surfaces like a wood floor or cobblestone pathway, [Material Generator](../parts/materials.md#material-generator) may produce better results.
</Alert>

<figcaption><sup>1</sup> When generating a texture for a `Class.Model` group of `Class.MeshPart|MeshParts`, the meshes should be arranged in a sensible way such that a unified body is formed. Avoid generating a texture for an arbitrary group of meshes scattered about the model's bounds, or for more than one identical mesh in the same operation.</figcaption>

## Generating Textures

To begin generating textures, navigate to the [Model](../studio/model-tab.md) tab and open the **Texture Generator** tool.

<img src="../assets/studio/general/Model-Tab-Texture-Generator.png" width="716" alt="Texture Generator indicated in Model tab" />

With the tool's window open:

1. Select a `Class.MeshPart` or a `Class.Model` comprised of `Class.MeshPart|MeshParts` in your scene.
1. In the tool's preview pane, click and drag to set a [generation angle](#generation-angle) that highlights the significant features or surfaces for texturing.

   <Grid container spacing={3}>
	 <Grid item>
	 <figure>
   <img src="../assets/studio/texture-generator/Generation-Angle-Good.png" width="280" alt="Good generation angle focusing on primary faces of a tower mesh" />
   <figcaption>
   <Alert severity="success" style={{maxWidth:"280px"}}>Focus on the primary faces of a tower mesh, visible to players</Alert>
   </figcaption>
   </figure>
	 </Grid>
	 <Grid item>
	 <figure>
   <img src="../assets/studio/texture-generator/Generation-Angle-Bad.png" width="280" alt="Bad generation angle focusing on bottom of tower mesh" />
   <figcaption>
   <Alert severity="error" style={{maxWidth:"280px"}}>Bottom of tower mesh will not likely be visible to players</Alert>
   </figcaption>
   </figure>
	 </Grid>
	 </Grid>

1. Enter a prompt describing your desired texture, for example:

   - "Rusted Charred Metal Castle"
   - "Mossy Stone Fortress"
   - "Snow Covered Ice Sculpture"

   <Alert severity="info">
   Using more descriptors in your prompt and iterating can help you find a texture that suits your needs. For more information, see [Best Practices](#best-practices).
	 </Alert>

1. Click **Preview** to create a texture preview in real time. This process typically takes about 20 seconds but may take longer during peak periods.

   When you've found a texture that looks suitable, use the "rotate" buttons to rotate the view 90&deg; around the mesh. To return to the prompt input to iterate and/or create a new preview, click the "back" button.

   <img src="../assets/studio/texture-generator/Generation-Post-Preview.png" width="280" alt="Texture preview showing in tool window" />

   <Alert severity="info">
   At this point, the texture may not appear visually consistent from all four views. However, the model will create a texture that's more consistent during the texture generation process.
	 </Alert>

1. When you're satisfied with the texture, click **Save&nbsp;&&nbsp;Apply** to create a full texture for your mesh. This process typically takes a few minutes but may be longer during peak periods. When complete, the new texture will be applied to the mesh through a `Class.SurfaceAppearance` instance.

   <img src="../assets/studio/texture-generator/Texture-Applied.jpg" width="720" alt="Texture applied to mesh in 3D world" />

	 <Alert severity="warning">
   Final generated textures will be a close match to what you observe in the preview pane, but may not be an exact match. You can continue to iterate on a style prompt and compare previous versions as outlined in [Managing Textures](#managing-textures).
	 </Alert>

## Managing Textures

Generated textures appear in the **Saved Textures** section of the tool's window. For each texture, you can click the **&ctdot;** to access various options.

<img src="../assets/studio/texture-generator/Saved-Textures-List.png" width="280" alt="Saved Textures list in tool window" />

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Insert Mesh with Texture**</td>
      <td>Inserts a copy of the textured mesh/model into the workspace.</td>
    </tr>
    <tr>
      <td>**Show in Inventory**</td>
      <td>Opens your **Images** inventory on the [Creator Dashboard](https://create.roblox.com/dashboard/creations?activeTab=Image) where you can inspect the texture image.</td>
    </tr>
	  <tr>
      <td>**Export**</td>
      <td>Exports the mesh to your local system as a `.obj` file.</td>
    </tr>
		<tr>
      <td>**Remove**</td>
      <td>Removes the texture from the **Saved Textures** list.</td>
    </tr>
  </tbody>
</table>

## Advanced Options

Expanding the **Advanced Options** section in the tool's window allows you to configure the following aspects.

<img src="../assets/studio/texture-generator/Advanced-Options.png" width="280" alt="Advanced Options panel in tool window" />

### Seed Control

You can choose to either randomize the seed or set a specific seed for texture generation. Setting a specific seed before generating a texture ensures you get consistent results each time you use a specific prompt.

### Generation Angle

Allows you to set a primary generation angle to prioritize during the preview generation phase to ensure the most important areas of your mesh are visible and able to be textured. This angle is also controlled by clicking and dragging the mesh in the preview window.

See [Best Practices](#best-practices) for detailed recommendations on choosing a generation angle.

### Smart UV Unwrap

In 3D modeling, a **UV map** is a 2D representation of the surface of a 3D model, allowing 2D textures to be accurately applied to the 3D model. UV coordinates **U** and **V** refer to the horizontal and vertical axes of this 2D space, similar to the **X** and **Y** axes in a 2D graph.

For the texture generator tool to create well-formed textures, your mesh's underlying UV maps need to fit a few guidelines. First, all UV coordinates must be **within the unit square**, as UV maps outside of the unit square will wrap around to the other side of the UV map and create artifacts or seams in the final texture. Second, all UVs must be **non‑overlapping**, as overlapping UVs will result in inconsistent textures and color placements.

Selecting the **Smart UV Unwrap** option will take a mesh with no UVs (or incompatible UVs) and apply the necessary UV coordinates for texturing. If your UVs are compatible, they won't be affected and you can use your mesh as‑is.

### Specify Front View

When this setting is enabled, the [generation angle](#generation-angle) selected during the preview stage is specified as the "front" of your mesh. This allows the tool to better texture meshes with a clear front and back by identifying each side, resulting in more consistent and coherent textures. This is particularly helpful for objects with a clear front and back, like avatars, animals, and clothing.

<GridContainer numColumns="2">
<figure>
<Grid container spacing={1}>
<Grid item xs={6} lg={6}>
<img src="../assets/studio/texture-generator/Specify-Front-View-Bad-Front.jpg" alt="Front view of character's lab coat with Specify Front View disabled" />
</Grid>
<Grid item xs={6} lg={6}>
<img src="../assets/studio/texture-generator/Specify-Front-View-Bad-Back.jpg" alt="Back view of character's lab coat with Specify Front View disabled" />
</Grid>
</Grid>
<figcaption>
<Alert severity="error">
"Lab Coat with Badge" prompt with **Specify Front View** disabled, yielding lab coat "front" on both front and back
</Alert>
</figcaption>
</figure>
<figure>
<Grid container spacing={1}>
<Grid item xs={6} lg={6}>
<img src="../assets/studio/texture-generator/Specify-Front-View-Good-Front.jpg" alt="Front view of character's lab coat with Specify Front View enabled" />
</Grid>
<Grid item xs={6} lg={6}>
<img src="../assets/studio/texture-generator/Specify-Front-View-Good-Back.jpg" alt="Back view of character's lab coat with Specify Front View enabled" />
</Grid>
</Grid>
<figcaption>
<Alert severity="success">
Same prompt with **Specify Front View** enabled, yielding correct "front" and "back" of lab coat
</Alert>
</figcaption>
</figure>
</GridContainer>

## Best Practices

<Tabs>
<TabItem label="Prompting Tips">
The following prompting tips enable the tool to provide better and more consistent results.

- Provide as much detail as possible in your prompt. Short, vague prompts will lead to inconsistent or unexpected results.
- Include texture attributes like material types, colors, patterns, wear and tear, etc. The more constraints you give the tool, the better it can generate what you have in mind.
- Use descriptive phrases instead of single words for key items, for example "worn&nbsp;leather" instead of just "leather."
- Add styling cues like "cinematic," "photorealistic," "cartoon," or "low&nbsp;poly" to influence the overall look.
</TabItem>

<TabItem label="Generation Angle">
The [generation angle](#generation-angle) sets the most important view of your mesh which will be prioritized during generation. Changing this angle can often help eliminate inconsistencies in textures.

- Setting the generation angle to highlight the meaningful faces of your mesh will result in better generations.
- For flat objects like plates, swords, and fences, make sure the generation angle displays a view with a high surface area.
- For humanoid and animal meshes, experiment with different generation angles, such as a head-on view of the face and a side view profile, to find the most consistent and coherent texture.
</TabItem>

<TabItem label="Iterative Refinement">
Generating the most suitable textures is an iterative process. It helps to preview often and tweak prompts incrementally to reach your vision.

- If a texture doesn't meet your expectations, identify what to change instead of starting over. For example, tweak the color or pattern description.
- Change the prompt word order. Words at the beginning of the prompt can have more weight when generating.
- Generate several previews to compare different prompts, or try the same prompts with different [seeds](#seed-control) to get a preview that fits your vision.
</TabItem>

</Tabs>
