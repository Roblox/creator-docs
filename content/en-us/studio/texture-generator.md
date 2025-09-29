---
title: Texture Generator
description: The Texture Generator tool quickly creates custom textures for meshes through text prompts.
---

import BetaAlert from '../includes/beta-features/beta-alert.md'

<BetaAlert betaName="Texture Generator" leadIn="This tool is currently in beta. Enable it through " leadOut="." components={props.components} />

The **Texture Generator** tool is designed to quickly create custom textures for your meshes through text prompts. You can select a mesh or `Class.Model` made up of several meshes&sup1;, type in any prompt to preview results within a few seconds, then generate full textures.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/studio/texture-generator/Generation-Rusted-Metal-Charred.jpg" />
    <figcaption>"rusted metal castle"</figcaption>
  </figure>
	<figure>
    <img src="../assets/studio/texture-generator/Generation-Mossy-Stone.jpg" />
    <figcaption>"mossy stone fortress"</figcaption>
  </figure>
	<figure>
    <img src="../assets/studio/texture-generator/Generation-Snow-Covered-Ice.jpg" />
    <figcaption>"ice covered sculpture"</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
**Texture Generator** is best suited for custom 3D assets where the desired texture is contextual to the asset itself. To generate repeating or tiled images for texturing surfaces like a wood floor or cobblestone pathway, [Material Generator](../studio/material-generator.md) may produce better results.
</Alert>

<figcaption><sup>1</sup> When generating a texture for a `Class.Model` group of `Class.MeshPart|MeshParts`, the meshes should be arranged in a sensible way such that a unified body is formed. Avoid generating a texture for an arbitrary group of meshes scattered about the model's bounds, or for more than one identical mesh in the same operation.</figcaption>

## Generate textures

To begin generating textures, open the **Texture Generator** from Studio's **Window**&nbsp;⟩ **3D** menu.

With the tool's window open:

1. Select a `Class.MeshPart` or a `Class.Model` comprised of `Class.MeshPart|MeshParts` in your scene.
2. In the tool's preview pane, click/drag or enter **X**/**Y**/**Z** values to set the **generation angle** which highlights the significant features or surfaces for texturing. See [best practices](#best-practices) for tips on choosing a generation angle.

   <Grid container spacing={3}>
	 <Grid item>
	 <figure>
   <img src="../assets/studio/texture-generator/Generation-Angle-Good.png" width="360" alt="Good generation angle focusing on primary faces of a tower mesh" />
   <figcaption>
   <Alert severity="success" style={{maxWidth:"360px"}}>Focus on the primary faces of a tower mesh, visible to players</Alert>
   </figcaption>
   </figure>
	 </Grid>
	 <Grid item>
	 <figure>
   <img src="../assets/studio/texture-generator/Generation-Angle-Bad.png" width="360" alt="Bad generation angle focusing on bottom of tower mesh" />
   <figcaption>
   <Alert severity="warning" style={{maxWidth:"360px"}}>Bottom of tower mesh will not likely be visible to players</Alert>
   </figcaption>
   </figure>
	 </Grid>
	 </Grid>

3. <Chip label="OPTIONAL" size="small" variant="outlined" /> Below the preview pane and prompt input text box, expand the **Art&nbsp;Style** section to upload an image or use an existing [image asset](../projects/assets/index.md) to influence the overall style, color palette, and mood of your generated texture.

   <img src="../assets/studio/texture-generator/Art-Style.png" width="360" alt="Art Style options in the Texture Generator window" />

   1. Expand the **Art Style** section of the tool's window.
   2. Specify an image asset that you've already [imported](../projects/assets/manager.md#importing-assets) to Roblox, or upload an image using the built‑in asset picker.
   3. Adjust the **Strength** value. A lower value blends the image more subtly while a higher value makes it the dominant style.

4. In the prompt text box input below the preview pane, enter a prompt describing your desired texture, for instance:

   - `rusted metal castle`
   - `mossy stone fortress`
   - `snow covered ice sculpture`

   Including `+`, `-`, or a number after keywords increases, decreases, or specifies the emphasis of that keyword, respectively. For example:

	 - `futuristic pirate++ backpack` puts stronger emphasis on `pirate`
	 - `futuristic-- backpack` puts less emphasis on `futuristic` if the original result was too futuristic
	 - `(robotic)1.5 pirate backpack` puts a precise emphasis on `robotic`
	 
	 <Alert severity="info">
   Using more descriptors in your prompt and iterating can help you find a texture that suits your needs. For more information, see [best practices](#best-practices).
	 </Alert>

5. Click **Preview** to create a texture preview. When the preview is ready:

   - Use the "rotate" buttons to rotate the view 90&deg; around the mesh.
   - Use the **Reroll** button to generate a new texture using the same parameters.
   - Click the "back" button to return to the prompt input text box.

   <img src="../assets/studio/texture-generator/Generation-Post-Preview.png" width="360" alt="Texture preview showing in tool window" />

   <Alert severity="info">
   In the preview stage, the texture may not appear visually consistent from all four views. However, the model will create a texture that's more consistent during the texture generation process.
	 </Alert>

6. When you're satisfied with the texture, click **Save&nbsp;&&nbsp;Apply** to create a full texture for your mesh. When complete, the new texture will be applied to the mesh through a `Class.SurfaceAppearance` instance.

   <img src="../assets/studio/texture-generator/Texture-Applied.jpg" width="720" alt="Texture applied to mesh in 3D world" />

Generated textures appear in the **Saved Textures** section of the tool's window. For each texture, you can click the **&ctdot;** to access various options.

<img src="../assets/studio/texture-generator/Saved-Textures-List.png" width="360" alt="Saved Textures list in tool window" />

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

## Advanced options

Expanding the **Advanced Options** section in the tool's window allows you to configure the following aspects.

<Tabs>
<TabItem label="Seed Control">
You can choose to either randomize the seed or set a specific seed for texture generation. Setting a specific seed before generating a texture ensures you get consistent results each time you use a specific prompt.
</TabItem>
<TabItem label="Smart UV Unwrap">
In 3D modeling, a **UV map** is a 2D representation of the surface of a 3D model, allowing 2D textures to be accurately applied to the 3D model. UV coordinates **U** and **V** refer to the horizontal and vertical axes of this 2D space, similar to the **X** and **Y** axes in a 2D graph.

For the texture generator tool to create well-formed textures, your mesh's underlying UV maps need to fit a few guidelines. First, all UV coordinates must be **within the unit square**, as UV maps outside of the unit square will wrap around to the other side of the UV map and create artifacts or seams in the final texture. Second, all UVs must be **non‑overlapping**, as overlapping UVs will result in inconsistent textures and color placements.

Selecting the **Smart UV Unwrap** option will take a mesh with no UVs (or incompatible UVs) and apply the necessary UV coordinates for texturing. If your UVs are compatible, they won't be affected and you can use your mesh as‑is.
</TabItem>
<TabItem label="Specify Front View">
When this setting is enabled, the **generation angle** selected during the preview stage is specified as the "front" of your mesh. This allows the tool to better texture meshes with a clear front and back by identifying each side, resulting in more consistent and coherent textures. This is particularly helpful for objects with a clear front and back, like avatars, animals, and clothing.

<GridContainer numColumns="2">
<figure>
<Grid container spacing={2}>
<Grid item XSmall={6} XLarge={6}>
<img src="../assets/studio/texture-generator/Specify-Front-View-Bad-Front.jpg" alt="Front view of character's lab coat with Specify Front View disabled" />
</Grid>
<Grid item XSmall={6} XLarge={6}>
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
<Grid container spacing={2}>
<Grid item XSmall={6} XLarge={6}>
<img src="../assets/studio/texture-generator/Specify-Front-View-Good-Front.jpg" alt="Front view of character's lab coat with Specify Front View enabled" />
</Grid>
<Grid item XSmall={6} XLarge={6}>
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
</TabItem>
</Tabs>

## Best practices

<Tabs>
<TabItem label="Prompting tips">
The following prompting tips enable the tool to provide better and more consistent results.

- Provide as much detail as possible in your prompt. Short, vague prompts will lead to inconsistent or unexpected results.
- Include texture attributes like material types, colors, patterns, wear and tear, etc. The more constraints you give the tool, the better it can generate what you have in mind.
- Use descriptive phrases instead of single words for key items, for example "worn&nbsp;leather" instead of just "leather."
- Add styling cues like "cinematic," "photorealistic," "cartoon," or "low&nbsp;poly" to influence the overall look.
</TabItem>
<TabItem label="Generation angle">
The generation angle sets the most important view of your mesh which will be prioritized during generation. Changing this angle when [generating textures](#generate-textures) can often help eliminate inconsistencies in textures.

- Setting the generation angle to highlight the meaningful faces of your mesh will result in better generations.
- For flat objects like plates, swords, and fences, make sure the generation angle displays a view with a high surface area.
- For humanoid and animal meshes, experiment with different generation angles, such as a head-on view of the face and a side view profile, to find the most consistent and coherent texture.
</TabItem>
<TabItem label="Iterative refinement">
Generating the most suitable textures is an iterative process. It helps to preview often and tweak prompts incrementally to reach your vision.

- If a texture doesn't meet your expectations, identify what to change instead of starting over. For example, tweak the color or pattern description.
- Change the prompt word order. Words at the beginning of the prompt can have more weight when generating.
- Generate several previews to compare different prompts, or try the same prompts with different [seeds](#advanced-options) to get a preview that fits your vision.
</TabItem>
</Tabs>
