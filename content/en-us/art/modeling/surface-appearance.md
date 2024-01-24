---
title: PBR Textures
description: PBR textures are advanced textures using multiple texture maps.
---

**Physically-Based Rendering** (PBR) textures allow you to represent realistic shading and lighting by using multiple types of texture images, or **maps**, on a single object. Combining multiple texture maps can more accurately simulate color, roughness, and reflectivity in any lighting environment and can enhance the visual elements of your assets and environment.

<Tabs>
<TabItem label="Clothing">
<GridContainer numColumns="2">
<img src="../../assets/modeling/surface-appearance/Layered-Clothing-Example.png"/>
<img src="../../assets/modeling/surface-appearance/Layered-Clothing-Example-2.jpg"/>
</GridContainer>
</TabItem>
<TabItem label="Environment">
	<GridContainer numColumns="2">
		<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-Example-1.jpg" />
		<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-Example-3.jpg" />
	</GridContainer>
</TabItem>
</Tabs>

Various applications and workflows are available for creating PBR textures. You can use these during the modeling and texturing phases of custom 3D object creation, provided that Roblox Studio [supports](../../art/characters/specifications.md#textures) the specific texture maps you're using.

This guide provides instructions on [setting up](#enabling-surface-appearance) your mesh objects to use PBR texture maps, and describes common use-cases and best practices for Roblox's supported PBR [texture maps](#texture-maps). When creating your own surfaces, see [Material References](../../art/modeling/material-reference.md) for common material values, image comparisons and clothing examples.

## Enabling Surface Appearance

You can add PBR textures to any `Class.MeshPart` by adding a `Class.SurfaceAppearance` object which overwrites the original assigned texture. In general, you can't modify `Class.SurfaceAppearance` properties by scripts during an experience because the engine requires some pre-processing to display these graphics. Similar to adding a basic texture, each texture image map must point to the appropriate uploaded image asset ID.

To enable surface appearance for a `Class.MeshPart`:

1. In the [Explorer](../../studio/explorer.md) window, hover over the `Class.MeshPart` and click the &CirclePlus; button.
2. Insert a **SurfaceAppearance** from the contextual menu.

   <img
   alt="Insert SurfaceAppearance"
   src="../../assets/modeling/surface-appearance/Insert-SurfaceAppearance.png"
   width="320"
   />

   When you are ready to add texture maps to your `Class.SurfaceAppearance` object, you can click each map property to browse and set the appropriate asset ID for each image:

   <img
   alt="Insert SurfaceAppearance"
   src="../../assets/modeling/surface-appearance/Applying-Texture-Maps.png"
   width="320"
   />

## Texture Maps

Studio currently supports 4 types of PBR texture maps: **Color**, **Normal**, **Metalness**, **Roughness**. Each of these maps correspond to an important aspect of the object's surface appearance. Texture maps only change visual appearance and don't affect the geometry of the `Class.MeshPart` object.

<Alert severity = 'warning'>
Avoid adjusting material values to look better in one specific lighting situation. You should base your material values on the physical characteristics and test and iterate to achieve a result that remains visually accurate in various lighting environments.
</Alert>

See the following examples for an overview of Roblox's supported texture maps and additional resources:

<Tabs>
<TabItem label="Color">
The `Class.SurfaceAppearance.ColorMap|ColorMap` property sets the color data of the surface, including any transparency present in the map. See [Color&nbsp;(Albedo)](#color-albedo) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap.jpg" />
    	<figcaption>Example Map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-Before.jpg" />
    	<figcaption>Example Mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-After.jpg" />
    	<figcaption>Mesh and Texture</figcaption>
	</figure>
</GridContainer>
</TabItem>
<TabItem label="Normal">
The `Class.SurfaceAppearance.NormalMap|NormalMap` texture property defines the topography of the surface allowing you to add visual textures such as bumps, dents, or cracks to your surface. See [Normal](#normal) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap.jpg" />
    	<figcaption>Example Map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap-Before.jpg" />
    	<figcaption>Example Mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap-After.jpg" />
    	<figcaption>Mesh and Texture</figcaption>
	</figure>
  </GridContainer>
</TabItem>
<TabItem label="Roughness">
The grayscale `Class.SurfaceAppearance.RoughnessMap|RoughnessMap` texture property defines the smoothness of the surface, allowing for a glossy or matte visual appearance. See [Roughness](#roughness) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap.png" />
    	<figcaption>Example Map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap-Before.jpg" />
    	<figcaption>Example Mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap-After.jpg" />
    	<figcaption>Mesh and Texture</figcaption>
	</figure>
  </GridContainer>
</TabItem>
<TabItem label="Metalness">
The grayscale `Class.SurfaceAppearance.MetalnessMap|MetalnessMap` texture property defines the metallic visual properties of the surface. See [Metalness](#metalness) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap.jpg" />
    	<figcaption>Example Map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap-Before.jpg" />
    	<figcaption>Example Mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap-After.jpg" />
    	<figcaption>Mesh and Texture</figcaption>
	</figure>
  </GridContainer>
</TabItem>
</Tabs>

<Alert severity = 'info'>
For technical details on texture file requirements, see [texture requirements](../../art/modeling/texture-specifications.md).
</Alert>

### Color (Albedo)

The **color**, or **albedo**, map determines the color of your texture and consists of mostly color information with little to no lighting or textural information. For additional customization, you can also add [transparency](#alpha-modes) in your albedo texture by adding opacity to your image map.

<Alert severity = 'info'>
While albedo maps and generic [non-PBR texture maps](../../parts/textures-decals.md), commonly known as **diffuse maps**, contain very similar base color data for a surface, diffuse maps often include shading and lighting values to imitate a specific visual element that are more effectively handled by PBR's [normal](#normal), [roughness](#roughness), and [metalness](#metalness) maps. Using a typical diffuse map instead of an albedo map may often look incorrect when the lighting doesn't match with these added baked-in texture elements.
</Alert>

#### Alpha Modes

For objects that require partial or complete sections of transparency, such as grass, leaves, lace, or decals like dirt or grunge, you can use various **alpha modes** to apply transparency to your color map. If your color map image format supports alpha channels, you can apply a grayscale alpha map where 0.0 is opaque and 1.0 is transparent. Similarly, when using an image format such as a `.png`, any opacity on the color map applies as transparency on the asset.

You can apply transparency in two different behaviors by setting the following `Class.SurfaceAppearance.AlphaMode|AlphaMode` values:

- [Overlay](#overlay) — Overlays the `Class.SurfaceAppearance.ColorMap|ColorMap` over the underlying mesh's `Class.MeshPart.Color`. Color maps using **Overlay** reveal the base color of the mesh anywhere transparency is present. This is the default setting.
- [Transparency](#alpha-modes) — Removes the visible mesh based on transparency in the `ColorMap`. This renders the mesh see-through and does not reveal the original mesh color whenever transparency is present.

##### Overlay

You can use **Overlay** to reveal sections of the mesh's original color. Since the transparent areas of the color map expose the underlying color, you can design a unique texture map that partially or fully reveals the mesh's `Class.MeshPart.Color|Color` property for custom skin tones or other situations with unique colors.

The following example demonstrates how the **Overlay** mode works using a white sphere reference:

<GridContainer numColumns="3">
<figure>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-ColorMap.png"/>
  <figcaption>Example color/albedo map with transparency</figcaption>
</figure>
<figure>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-Before.jpg"/>
  <figcaption>Example mesh object (white)</figcaption>
</figure>
<figure>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-Overlay.jpg"/>
  <figcaption>`Class.SurfaceAppearance.AlphaMode|AlphaMode` set to **Overlay** using reference map and material</figcaption>
</figure>
</GridContainer>

The following example uses the **Overlay** mode for custom characters, revealing the character's original skin-tone:

<GridContainer numColumns="2">
<figure>
<img src="../../assets/modeling/surface-appearance/Custom-Skin-Tone-Map.png" width = "73%"/>
<figcaption>Color map containing transparency in sections to expose the original mesh color</figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Custom-Skin-Tone-Example.png"/>
<figcaption>Several variations of characters with a single color map using **Overlay** mode</figcaption>
</figure>
</GridContainer>

See [Custom Skin Tone](../../art/characters/specifications.md#custom-skin-tone) for additional details on optimizing an overlay for skin and similar applications.

##### Transparency

You can use the **Transparency** mode to create complex or extremely fine objects, such as lace or netting, by removing visible parts of the mesh as an alternative to sculpting the mesh geometry. Since this does not affect the geometry of the mesh object, this can allow you to create detailed objects without the performance impact of an intricate mesh model.

The following example demonstrates how a partial and full transparency in this mode visually removes sections of the mesh:

<Tabs>
<TabItem label="Sample Meshes">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Opacity-0.png" />
<figcaption><center>No transparency</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Opacity-Half.png" />
<figcaption><center>Half transparency in sections</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Opacity-1.png" />
<figcaption><center>Full transparency in sections</center></figcaption>
</figure>
</GridContainer>
</TabItem>
<TabItem label="Image Maps">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/OpacityTexture-0.png" />
<figcaption><center>No transparency</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/OpacityTexture-Half.png" />
<figcaption><center>Half transparency in sections</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/OpacityTexture-1.png" />
<figcaption><center>Full transparency in sections</center></figcaption>
</figure>
</GridContainer>
</TabItem>
</Tabs>

### Normal

The **normal**, or **surface**, map adds texture depth to your surface and behaves similarly to a [height map](../../parts/terrain.md#heightmaps). As a result, the effect may fade or intensify depending on the viewing angle and lighting environment. When a normal map is not present, the value is set to 0.0.

In the following figure, you can switch between the mesh reference and the map reference for comparisons of normal map values:

<Tabs>
<TabItem label="Sample Meshes">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-0.png" />
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Half.png" />
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-1.png" />
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>
</TabItem>
<TabItem label="Image Maps">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Map-0.png" />
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Map-Half.png" />
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Map-1.png" />
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>
</TabItem>
</Tabs>

The **R**, **G**, and **B** channels of the image correspond respectively to the **X**, **Y**, and **Z** components of the local surface vector. A uniform image of color **[127, 127, 255]** translates to a completely flat normal map. Roblox only supports **OpenGL format - Tangent Space** normal maps.

Normal maps prominently affect the visual surface of a mesh and can accentuate awkward seams in your texture. Whenever possible, keep your texture seams hidden to avoid visual issues with your mesh.

### Roughness

**Roughness**, or **microsurface**, maps determine how light is spread across your model's surface. When roughness is at 0.0, the surface doesn't scatter light at all, resulting in a much sharper and brighter reflection and glossiness on your material. At 1.0, light and reflections evenly scatter over the model resulting in a less reflective matte-like surface.

Roughness may impact how reflective an object is at different angles, referred to as the **Fresnel** effect. See [Fresnel](#fresnel) for more details and best-practices to maintain consistent reflective behavior.

See the following figure for comparisons of various roughness map values:

<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Roughness-0.png" />
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Roughness-Half.png" />
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Roughness-1.png" />
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>

<Alert severity = 'info'>
Various combinations of the roughness and metalness can represent almost every possible real-world material surface. See [Material References](../../art/modeling/material-reference.md) for examples and references of how combinations of material values can create various surface appearances.
</Alert>

#### Fresnel

**Fresnel** refers to the amount of reflection of a surface in reference to the current viewing angle. Studio's Fresnel processing aims for physical real-world accuracy, although you may get unexpected specular contribution at certain angles even with rough surfaces. In some cases, you can compensate by making your roughness map around 0.1 more rough to achieve a consistent lighting response with your materials.

Even though Roblox renders this lighting effect accurately, the brightness and reflectivity of a surface may not respond consistently between your texture content creating software, such as Substance Painter, and Studio. See [Clothing Examples](../../art/modeling/material-reference.md#clothing-examples) for differences in rendering between applications.

### Metalness

**Metalness** determines the reflectivity of a surface. Metalness values range between 0.0 and 1.0. Roblox sets the default value to 0.0 if a metalness map is not present.

See the following figure for comparisons of various metalness map values:
<GridContainer numColumns="3">

<figure>
<img src="../../assets/modeling/surface-appearance/Metalness-0.png" />
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Metalness-Half.png" />
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Metalness-1.png" />
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>

Different PBR renderers use various workflows for processing reflectiveness. Studio only uses the **metalness workflow** which determines whether a material is a **nonmetal** or a **metal**, sometimes referred to as an **insulator** or **conductor**.

In most cases, you should set this value to either 0.0 (non-metal) or 1.0 (metal). You can use partial metalness values when creating more uncommon surfaces with moderate reflective properties, like satin or silk. This practice can subtly fake the reflections in the material to highlight the color from the [color/albedo map](#color-albedo) over colors reflected in the environment.

<Alert severity = 'info'>
Various combinations of the roughness and metalness can represent almost every possible real-world material surface. See [Material References](../../art/modeling/material-reference.md) for examples and references of how combinations of material values can create various surface appearances.
</Alert>
