---
title: Texture Generator
description: The Texture Generator tool quickly creates custom textures for meshes through text or image prompts.
---

The **Texture Generator** tool is designed to quickly create custom textures for your meshes through text or image prompts. You can select a mesh or `Class.Model` made up of several meshes&sup1;, describe the look you want, preview results within a few seconds, then generate a full texture.

Two generation modes are available depending on your needs:

- **Fast** mode produces a quick 1K diffuse texture, ideal for rapid iteration.
- **Quality** mode generates a 4K physically based rendering (PBR) texture when you want higher fidelity and can wait a bit longer.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/texture-generator/texture_1v2_flower_guitar.jpg" alt="Side-by-side Fast and Quality floral guitar textures" />
    <figcaption>Floral texture — **Fast** (left) vs **Quality** (right)</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/texture-generator/texture_1v2_wooden_guitar.jpg" alt="Side-by-side Fast and Quality wood-grain guitar textures" />
    <figcaption>Wood grain — **Fast** (left) vs **Quality** (right)</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/texture-generator/texture_1v2_rusted_guitar.jpg" alt="Side-by-side Fast and Quality rusted guitar textures" />
    <figcaption>Rusted metal — **Fast** (left) vs **Quality** (right)</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/texture-generator/texture_1v2_tiger_guitar.jpg" alt="Side-by-side Fast and Quality tiger-stripe guitar textures" />
    <figcaption>Tiger stripe — **Fast** (left) vs **Quality** (right)</figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
**Texture Generator** is best suited for custom 3D assets where the desired texture is contextual to the asset itself. To generate repeating or tiled images for texturing surfaces like a wood floor or cobblestone pathway, [Material Generator](material-generator.md) might produce better results.
</Alert>

<figcaption><sup>1</sup> When generating a texture for a `Class.Model` group of `Class.MeshPart|MeshParts`, the meshes should be arranged in a sensible way such that a unified body is formed. Avoid generating a texture for an arbitrary group of meshes scattered about the model's bounds, or for more than one identical mesh in the same operation.</figcaption>

## Generate textures

You can generate textures through the Studio tool, through Assistant with the [`/generate_texture` command](../assistant/guide.md), or through [Roblox Studio MCP](./mcp.md).

To use the Studio tool:

1. In Studio, select a mesh in your scene. The Texture Generator is only available when a mesh is selected.
2. Go to the **Model** tab and select **Texture**. The tool opens in a pop-up window beside the selected mesh.
    <img src="../assets/studio/texture-generator/untextured_guitar_texture_tool_open.jpg" width="280" alt="Texture generation tool open beside an untextured guitar mesh" />

3. In the tool pop-up window, choose one of two ways to describe the texture you want:

   - **Text prompt**: Enter a text description in the text box.
   - **Image prompt**: Click the **+** button to upload a reference image.

   <img src="../assets/studio/texture-generator/texture_tool_initial_window.jpg" width="420" alt="Texture generation prompting window with a text box, plus button, and Preview button" />

4. <Chip label="OPTIONAL" size="small" variant="outlined" /> Before clicking **Preview**, open the **⋯** menu and select **View**, then choose how the tool sets the preview orientation:

   <img src="../assets/studio/texture-generator/texturing_tool_view_selection_mode.jpg" width="460" alt="View selection menu with Automatic and Manual options" />

   - **Manual**: The viewing angle in the Studio viewport defines the mesh orientation for the preview images. Orbit around the mesh to choose your preferred view before clicking **Preview**.
   - **Automatic**: The tool uses a smart algorithm to choose a preview orientation without user input. This algorithm finds a view that exposes the most relevant parts of the mesh, although it can fail.

5. Click **Preview** to create texture previews. The tool returns three preview images in about 10 seconds.

   <img src="../assets/studio/texture-generator/texturing_tool_preview_selection.jpg" width="460" alt="Three texture previews, with the hovered preview enlarged" />

   <Alert severity="info">
   Generating previews again with the same prompt can produce slightly different results. Refining the prompt is usually the easiest way to get a meaningfully different set of images.
   </Alert>

6. From the dropdown in the preview window, choose a generation mode:

   - **Fast** mode generates a 1K diffuse texture in under 30 seconds. Use **Fast** for rapid prototyping, background assets, and simple assets that don't need sharp details.
   - **Quality** mode generates a 4K PBR texture with sharper details. Generation can take a couple of minutes, and because the texture is sharper, small generation artifacts can also be easier to see.

7. When you're satisfied with the preview, click **Generate** to create the full texture for your mesh. You can keep working on other parts of your experience while generation runs, including texturing other assets at the same time.

   <Alert severity="warning">
   Don't modify the asset in place while texture generation is running. Editing it before generation completes can cause the process to fail.
   </Alert>

When generation finishes:

- **Fast** mode applies the texture directly to the `Class.MeshPart` by attaching a new texture ID.
- **Quality** mode applies the PBR texture through a `Class.SurfaceAppearance` parented to the `Class.MeshPart`.

If the asset contains multiple separate `Class.MeshPart` objects, each one gets its own texture. In **Quality** mode, each `Class.MeshPart` also gets its own `Class.SurfaceAppearance`.

If you're unsatisfied with the final textured result, press **Ctrl**/**Cmd** + **Z** to undo. This can get more complicated if you're also working on other parts of your scene while texturing is in progress, so consider backing up your assets before using this tool.

## Prompting tips

The following tips help the tool provide better and more consistent results.

### Text prompts

Provide as much detail as possible in your prompt. Short, vague prompts can lead to inconsistent or unexpected results. Include texture attributes like material types, colors, patterns, and other distinctive features.

The more constraints you give the tool, the better it can generate what you have in mind.

Examples of simple and detailed prompts:

- **Simple prompt:** `make it out of wood`
- **Detailed prompt:** `Acoustic guitar made from deep reddish-brown cherry wood with realistic wood grain, a deep blue fretboard, golden tuning pegs, and a leopard print pickguard.`

<figure>
  <img src="../assets/studio/texture-generator/texture_2_simple_v_detailed_prompt.jpg" width="500" alt="Side-by-side results from a simple wood prompt and a highly detailed guitar prompt" />
  <figcaption>**Simple prompt** vs **Detailed prompt**</figcaption>
</figure>

The system automatically enhances simple prompts with additional details of its own choosing, so you can spend more or less time writing your prompts. You can also start with a simple prompt, evaluate the preview images, and then refine the prompt until you achieve a result you like.

Avoid the following when writing a prompt:

- Changing the mesh geometry
- Referencing the current texture on the mesh
- Referencing objects or terrain in other parts of the scene
- Referencing previously generated textures
- Describing the reflectivity or transparency properties of the texture

### Image prompts

When you provide an image prompt, the texture generation tool treats it as a style guide rather than an exact template. The generated texture draws inspiration from the reference image, but might not preserve every detail.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/texture-generator/style_guidance_japanese_guitar.jpg" alt="Image prompt: a guitar painted with a dragon, a samurai, and red maple leaves" />
    <figcaption>Image prompt</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/texture-generator/texture_2_japanese_guitar.jpg" alt="Guitar mesh with a generated texture of dragons, samurai, and red maple leaves" />
    <figcaption>Generated texture</figcaption>
  </figure>
</GridContainer>
