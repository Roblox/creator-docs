---
title: PBR textures
description: PBR textures are advanced textures using multiple texture maps.
---

**Physically-Based Rendering** (PBR) textures allow you to represent realistic shading and lighting by using multiple types of texture images, or **maps**, on a single object. Combining multiple texture maps can more accurately simulate color, roughness, and reflectivity in any lighting environment and can enhance the visual elements of your assets and environment.

<Tabs>
<TabItem label="Clothing">
<GridContainer numColumns="2">
<img src="../../assets/modeling/surface-appearance/Layered-Clothing-Example.png" alt="A humanoid avatar with dreadlocks, a glossy jacket, jeans with decals, and boots." />
<img src="../../assets/modeling/surface-appearance/Layered-Clothing-Example-2.jpg" alt="A humanoid avatar with a short haircut, leather jacket, capri pants, and orange shoes." />
</GridContainer>
</TabItem>
<TabItem label="Environment">
	<GridContainer numColumns="2">
		<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-Example-1.jpg" alt="A realistic leafy bush" />
		<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-Example-3.jpg" alt="A realistic mossy rock" />
	</GridContainer>
</TabItem>
</Tabs>

Various applications and workflows are available for creating PBR textures. You can use these during the modeling and texturing phases of custom 3D object creation, provided that Roblox Studio [supports](../../art/characters/specifications.md#textures) the specific texture maps you're using.

<Alert severity = 'info'>
For information on how to properly connect PBR textures to your model in Blender and Maya for import into Studio, see [Blender / Maya texture settings](./assign-textures.md).
</Alert>

This guide provides instructions on [setting up](#enable-surface-appearance) your mesh objects to use PBR texture maps, and describes common use-cases and best practices for Roblox's supported PBR [texture maps](#texture-maps). When creating your own surfaces, see [material references](../../art/modeling/material-reference.md) for common material values, image comparisons and clothing examples.

## Enable surface appearance

You can add PBR textures to any `Class.MeshPart` by adding a `Class.SurfaceAppearance` object which overwrites the original assigned texture. In general, you can't modify `Class.SurfaceAppearance` properties by scripts during an experience because the engine requires some pre-processing to display these graphics. Similar to adding a basic texture, each texture image map must point to the appropriate uploaded image asset ID.

To enable surface appearance for a `Class.MeshPart`:

1. In the [Explorer](../../studio/explorer.md) window, hover over the `Class.MeshPart` and click the &CirclePlus; button.
2. Insert a `Class.SurfaceAppearance` from the contextual menu.

   <img src="../../assets/studio/explorer/MeshPart-SurfaceAppearance.png" width="320" alt="A SurfaceAppearance object parented within a MeshPart in Studio's Explorer window." />

   When you're ready to add texture maps to the `Class.SurfaceAppearance` object, you can click each map property in the [Properties](../../studio/properties.md) window and enter an asset ID.

## Texture maps

Studio currently supports 4 types of PBR texture maps: [color](#color-albedo), [normal](#normal), [roughness](#roughness), and [metalness](#metalness). Each of these maps correspond to an important aspect of the object's surface appearance. Texture maps only change visual appearance and don't affect the geometry of the `Class.MeshPart` object.

<Alert severity = 'warning'>
Avoid adjusting material values to look better in one specific lighting situation. You should base your material values on the physical characteristics and test and iterate to achieve a result that remains visually accurate in various lighting environments.
</Alert>

See the following examples for an overview of Roblox's supported texture maps and additional resources:

<Tabs>
<TabItem label="Color">
The `Class.SurfaceAppearance.ColorMap|ColorMap` property sets the color data of the surface, including any transparency present in the map. See [color&nbsp;(albedo)](#color-albedo) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap.jpg" alt="A completely filled image, mostly red with various black splotches and white scratches."/>
    	<figcaption>Example map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-Before.jpg" alt="A blank white sphere with a dark background."/>
    	<figcaption>Example mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-After.jpg" alt="A red sphere with black splotches and white scratches with a dark background."/>
    	<figcaption>Mesh and texture</figcaption>
	</figure>
</GridContainer>
</TabItem>
<TabItem label="Normal">
The `Class.SurfaceAppearance.NormalMap|NormalMap` texture property defines the topography of the surface allowing you to add visual textures such as bumps, dents, or cracks to your surface. See [normal](#normal) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap.jpg" alt="A completely filled image, mostly cyan with streaks and bumps across the surface giving the impression of a tactile surface." />
    	<figcaption>Example map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap-Before.jpg" alt="A blank teal sphere with a dark background."/>
    	<figcaption>Example mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-NormalMap-After.jpg" alt="A teal sphere with tactile streaks and bumps across the surface."/>
    	<figcaption>Mesh and texture</figcaption>
	</figure>
  </GridContainer>
</TabItem>
<TabItem label="Roughness">
The grayscale `Class.SurfaceAppearance.RoughnessMap|RoughnessMap` texture property defines the smoothness of the surface, allowing for a glossy or matte visual appearance. See [roughness](#roughness) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap.png" alt="A completely filled image of black diamond shapes over a light grey background."/>
    	<figcaption>Example map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap-Before.jpg" alt="A blank purple sphere with a dark background."/>
    	<figcaption>Example mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-RoughnessMap-After.jpg" alt="A purple sphere that has glossy diamond shapes over its surface."/>
    	<figcaption>Mesh and texture</figcaption>
	</figure>
  </GridContainer>
</TabItem>
<TabItem label="Metalness">
The grayscale `Class.SurfaceAppearance.MetalnessMap|MetalnessMap` texture property defines the metallic visual properties of the surface. See [metalness](#metalness) for additional information.
<GridContainer numColumns="3">
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap.jpg" alt="A completely filled image with a completely black border and scratch-like streaks revealing a white center."/>
    	<figcaption>Example map</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap-Before.jpg" alt="A blank light blue sphere with a dark background."/>
    	<figcaption>Example mesh</figcaption>
	</figure>
	<figure>
    	<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-MetalnessMap-After.jpg" alt="A light blue sphere with parts of its surface looking scratched. The scratched areas reveal a metal-ness quality that is more reflective."/>
    	<figcaption>Mesh and texture</figcaption>
	</figure>
  </GridContainer>
</TabItem>
</Tabs>

<Alert severity = 'info'>
For technical details on texture file requirements, see [texture requirements](../../art/modeling/texture-specifications.md).
</Alert>

### Color (albedo)

The **color**, or **albedo**, map determines the color of your texture and consists of mostly color information with little to no lighting or textural information. For additional customization, you can also add [transparency](#alpha-modes) in your albedo texture by adding opacity to your image map.

<Alert severity = 'info'>
While albedo maps and generic [non-PBR texture maps](../../parts/textures-decals.md), commonly known as **diffuse maps**, contain very similar base color data for a surface, diffuse maps often include shading and lighting values to imitate a specific visual element that are more effectively handled by PBR's [normal](#normal), [roughness](#roughness), and [metalness](#metalness) maps. Using a typical diffuse map instead of an albedo map may often look incorrect when the lighting doesn't match with these added baked-in texture elements.
</Alert>

#### Alpha modes

For objects that require partial or complete sections of transparency, such as grass, leaves, lace, or decals like dirt or grunge, you can use various **alpha modes** to apply transparency to your color map. If your color map image format supports alpha channels, you can apply a grayscale alpha map where `0.0` is transparent and `1.0` is opaque. Similarly, when using an image format such as a `.png`, any opacity on the color map applies as transparency on the asset.

You can apply transparency in two different behaviors by setting the following `Class.SurfaceAppearance.AlphaMode|AlphaMode` values:

- [Overlay](#overlay) — Overlays the `Class.SurfaceAppearance.ColorMap|ColorMap` over the underlying mesh's `Class.MeshPart.Color`. Color maps using **Overlay** reveal the base color of the mesh anywhere transparency is present. This is the default setting.
- [Transparency](#alpha-modes) — Removes the visible mesh based on transparency in the `ColorMap`. This renders the mesh see-through and does not reveal the original mesh color whenever transparency is present.
- [TintMask](#tintmask) — Blends the tinted `Class.SurfaceAppearance.ColorMap|ColorMap` over the un-tinted `Class.SurfaceAppearance.ColorMap|ColorMap`.

##### Overlay

You can use **Overlay** to reveal sections of the mesh's original color. Since the transparent areas of the color map expose the underlying color, you can design a unique texture map that partially or fully reveals the mesh's `Class.MeshPart.Color|Color` property for custom skin tones or other situations with unique colors.

The following example demonstrates how the **Overlay** mode works using a white sphere reference:

<GridContainer numColumns="3">
<figure>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-ColorMap.png" alt="A completely filled image of a semi-repeating pattern with 8 by 8 small light blue squares. The background is checkered to indicate transparency."/>
  <figcaption>Example color/albedo map with transparency</figcaption>
</figure>
<figure>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-ColorMap-Before.jpg" alt="A blank white sphere over a dark background."/>
  <figcaption>Example mesh object (white)</figcaption>
</figure>
<figure>
  <img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-Overlay.jpg" alt="A white sphere with small blue squares scattered over the surface."/>
  <figcaption>`Class.SurfaceAppearance.AlphaMode|AlphaMode` set to **Overlay** using reference map and material</figcaption>
</figure>
</GridContainer>

The following example uses the **Overlay** mode for custom characters, revealing the character's original skin-tone:

<GridContainer numColumns="2">
<figure>
<img src="../../assets/modeling/surface-appearance/Custom-Skin-Tone-Map.png" width = "73%" alt="A completely filled image of a texture map for a 3D humanoid model. Various parts of the image is checkered or partially checkered to indicate varying levels of transparency."/>
<figcaption>Color map containing transparency in sections to expose the original mesh color</figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Custom-Skin-Tone-Example.png" alt="Four of the same humanoid models with different skin tones: light brown, black, white, dark green."/>
<figcaption>Several variations of characters with a single color map using **Overlay** mode</figcaption>
</figure>
</GridContainer>

See [custom skin tone](../../art/characters/specifications.md#custom-skin-tone) for additional details on optimizing an overlay for skin and similar applications.

##### Transparency

You can use the **Transparency** mode to create complex or extremely fine objects, such as lace or netting, by removing visible parts of the mesh as an alternative to sculpting the mesh geometry. Since this does not affect the geometry of the mesh object, this can allow you to create detailed objects without the performance impact of an intricate mesh model.

The following example demonstrates how a partial and full transparency in this mode visually removes sections of the mesh:

<Tabs>
<TabItem label="Sample Meshes">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Opacity-0.png" alt="A sphere with a basket-like surface."/>
<figcaption><center>No transparency</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Opacity-Half.png" alt="A sphere with regular triangular patterns on its surface partially invisible." />
<figcaption><center>Half transparency in sections</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Opacity-1.png" alt="A sphere with regular triangular patterns on its surface completely invisible."/>
<figcaption><center>Full transparency in sections</center></figcaption>
</figure>
</GridContainer>
</TabItem>
<TabItem label="Image Maps">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/OpacityTexture-0.png" alt="A completely filled image of a thatched basket-like surface."/>
<figcaption><center>No transparency</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/OpacityTexture-Half.png" alt="A completely filled image with a thatched basket-like surface with a regular triangle pattern partially transparent."/>
<figcaption><center>Half transparency in sections</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/OpacityTexture-1.png" alt="A completely filled image with a thatched basket-like surface with a regular triangle pattern fully transparent."/>
<figcaption><center>Full transparency in sections</center></figcaption>
</figure>
</GridContainer>
</TabItem>
</Tabs>

There are two outcomes of `Enum.AlphaMode|Transparency` mode, depending on whether the `Class.MeshPart.Transparency` is set to `0` or **at&nbsp;least** `0.02`, although numerical precision may result in small values such as `0.01` triggering the opaque transparency.

- When alpha is used to cut out the shape of mostly opaque objects with hard edges such as foliage, lace fabric, and netting, set the `Class.MeshPart.Transparency` to `0`. When parts of the surface are fully opaque, the Roblox engine can render them with proper depth‑based occlusion. Opaque surfaces also generally work better with depth‑based effects like `Class.DepthOfFieldEffect`, glass and water refraction, and water reflection.
- When alpha is used to add detail to semi‑transparent objects or objects with smooth gradients of transparency, set the `Class.MeshPart.Transparency` to **at&nbsp;least** `0.02`. This improves the quality of blending for objects such as dirty windows and soft‑edged feathers, but it will not work with all effects.

##### TintMask

You can use the `Enum.AlphaMode.TintMask` mode to apply `Class.SurfaceAppearance.Color` tinting to selective areas of a surface. The tinting is strongest where the alpha channel is fully visible and not applied where the alpha channel is transparent.

<Tabs>
<TabItem label="ColorMap RGB">
<figure>
<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-TintMask-Bricks-Albedo.jpg" width="50%" alt="A warm, light colored brick texture with darker grey textured grout between the bricks." />
<div style={{width: '50%'}}>
<figcaption>Example brick texture, showing the color detail on brick faces as well as in the grout between the bricks.</figcaption>
</div>
</figure>
</TabItem>
<TabItem label="ColorMap Alpha">
<figure>
<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-TintMask-Bricks-Alpha.jpg" width="50%" alt="A monochrome brick texture showing white in the brick face areas and solid black in between the bricks." />
<div style={{width: '50%'}}>
<figcaption>Example brick texture alpha, with areas of the brick faces opaque (white) and the grout areas in between bricks transparent (black).</figcaption>
</div>
</figure>
</TabItem>
<TabItem label="Example Results">
<figure>
<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-TintMask-Bricks.jpg" width="50%" alt="Four square panels with a brick texture arranged in a vertical stack. They are tinted blue, yellow, purple, and red." />
<div style={{width: '50%'}}>
<figcaption>Example brick texture with four different tint colors applied. The tint is affecting only the raised brick faces and not the grout between them.</figcaption>
</div>
</figure>
</TabItem>
</Tabs>

<Alert severity="info">
When creating `Class.SurfaceAppearance.ColorMap` textures for use with a tint mask, preserve color in the transparent regions and turn off options such as pre-multiplied alpha that darken the color in transparent areas. The alpha values can also be semi-transparent to apply a partial tint to areas of the texture.
</Alert>

#### Color tinting

You can apply a tint to your color map by modifying the `Class.SurfaceAppearance.Color` property. Tinting does not affect performance and you can save on memory by reusing a single color map with different tints. Use color tinting to create additional low-cost variation between your `Class.MeshPart` PBR textures or to programmatically modify your PBR surface colors in real-time.

<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Tinting-None.png" alt="A statue with a default yellow tint and reflective jade-like properties."/>
<figcaption>Statue mesh from [The Mystery of Duvall Drive](../../resources/the-mystery-of-duvall-drive/index.md) with no tinting.</figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Tinting-Red.png" alt="A statue with a red tint and continues to have a shiny reflective properties from its other texture maps."/>
<figcaption>Statue mesh with `Class.SurfaceAppearance.Color|Color` set to red.</figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Tinting-Green.png" alt="A statue with a green tint and continues to have a shiny reflective properties from its other texture maps."/>
<figcaption>Statue mesh with `Class.SurfaceAppearance.Color|Color` set to green.</figcaption>
</figure>
</GridContainer>

`Class.SurfaceAppearance.Color` tinting applies as a multiplier, so the final appearance is a function of `Datatype.Color3` (texel color) times `Class.SurfaceAppearance.Color`. This means that authoring your original `Class.SurfaceAppearance.ColorMap` in near-white grayscale colors creates the strongest tinting effect when this property is applied.

Tinting only applies to the `Class.SurfaceAppearance.ColorMap` and not the `Class.MeshPart.Color`. You can continue to use alpha channels when applying [transparency](#transparency).

When `Class.SurfaceAppearance.AlphaMode` is set to `Enum.AlphaMode|Overlay` and an alpha channel is present, the underlying `Class.MeshPart.Color` is revealed and `Class.SurfaceAppearance.Color` tinting only applies to the visible `Class.SurfaceAppearance` color map.

When `Class.SurfaceAppearance.AlphaMode` is set to `Enum.AlphaMode|TintMask` and an alpha channel is present, the alpha channel controls the amount of `Class.SurfaceAppearance.Color` tinting. The tinting is strongest where the alpha channel is fully visible and not applied where the alpha channel is transparent.

<Tabs>
<TabItem label="Transparency AlphaMode">
<figure>
<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-Gradient-Transparency.jpg" width="50%" alt="A floating square plane with a cyan slate texture, that gradually changes from fully transparent on the left to fully opaque on the right. A thin horizontal bar below the floating plane has a gradient with black on the left and white on the right."/>
<div style={{width: '50%'}}>
<figcaption>`Class.SurfaceAppearance.AlphaMode|AlphaMode` set to `Enum.AlphaMode|Transparency`. The greyscale gradient bar at the bottom indicates the alpha value. `Class.MeshPart.Color` is set to red and `Class.SurfaceAppearance.Color` is set to cyan.</figcaption>
</div>
</figure>
</TabItem>
<TabItem label="Overlay AlphaMode">
<figure>
<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-Gradient-Overlay.jpg" width="50%" alt="A floating square plane that gradually turns from a solid red color on the left to a cyan slate texture on the right. A thin horizontal bar below the floating plane has a gradient with black on the left and white on the right."/>
<div style={{width: '50%'}}>
<figcaption>`Class.SurfaceAppearance.AlphaMode|AlphaMode` set to `Enum.AlphaMode|Overlay`. The greyscale gradient bar at the bottom indicates the alpha value. `Class.MeshPart.Color` is set to red and `Class.SurfaceAppearance.Color` is set to cyan.</figcaption>
</div>
</figure>
</TabItem>
<TabItem label="TintMask AlphaMode">
<figure>
<img src="../../assets/modeling/surface-appearance/SurfaceAppearance-AlphaMode-Gradient-TintMask.jpg" width="50%" alt="A floating square plane that gradually turns from a white slate texture on the left to a cyan slate texture on the right. A thin horizontal bar below the floating plane has a gradient with black on the left and white on the right."/>
<div style={{width: '50%'}}>
<figcaption>`Class.SurfaceAppearance.AlphaMode|AlphaMode` set to `Enum.AlphaMode|TintMask`. The greyscale gradient bar at the bottom indicates the alpha value. `Class.MeshPart.Color` is set to red and `Class.SurfaceAppearance.Color` is set to cyan. Tint masking is not affected by `Class.MeshPart.Color`.</figcaption>
</div>
</figure>
</TabItem>
</Tabs>

### Normal

The **normal**, or **surface**, map adds texture depth to your surface and behaves similarly to a [height map](../../parts/terrain.md#heightmaps). As a result, the effect may fade or intensify depending on the viewing angle and lighting environment. When a normal map is not present, the value is set to `0.0`.

In the following figure, you can switch between the mesh reference and the map reference for comparisons of normal map values:

<Tabs>
<TabItem label="Sample Meshes">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-0.png" alt="A clay colored smooth sphere."/>
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Half.png" alt="A clay colored sphere with a moderately rocky surface."/>
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-1.png" alt="A clay colored sphere with an extremely rocky surface"/>
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>
</TabItem>
<TabItem label="Image Maps">
<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Map-0.png" alt="A completely filled teal image."/>
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Map-Half.png" alt="A completely filled teal image with a moderate amount of surface aberrations in slightly lighter and darker shades"/>
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Normal-Map-1.png" alt="A completely filled teal image with a heavy amount of surface aberrations in slightly lighter and darker shades"/>
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>
</TabItem>
</Tabs>

The **R**, **G**, and **B** channels of the image correspond respectively to the **X**, **Y**, and **Z** components of the local surface vector. A uniform image of color <Typography noWrap>`[127, 127, 255]`</Typography> translates to a completely flat normal map. Roblox only supports **OpenGL format - Tangent Space** normal maps.

Normal maps prominently affect the visual surface of a mesh and can accentuate awkward seams in your texture. Whenever possible, keep your texture seams hidden to avoid visual issues with your mesh.

### Roughness

**Roughness**, or **microsurface**, maps determine how light is spread across your model's surface. When roughness is at `0.0`, the surface doesn't scatter light at all, resulting in a much sharper and brighter reflection and glossiness on your material. At `1.0`, light and reflections evenly scatter over the model resulting in a less reflective matte-like surface.

Roughness may impact how reflective an object is at different angles, referred to as the **Fresnel** effect. See [fresnel](#fresnel) for more details and best-practices to maintain consistent reflective behavior.

The following figure shows comparisons of various roughness map values:

<GridContainer numColumns="3">
<figure>
<img src="../../assets/modeling/surface-appearance/Roughness-0.png" alt="A blue glossy sphere with a legend indicating the roughness map is completely black." />
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Roughness-Half.png" alt="A blue semi-glossy sphere with a legend indicating the roughness map is exactly grey."/>
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Roughness-1.png" alt="A blue matte sphere with a legend indicating the roughness map is completely white."/>
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>

<Alert severity = 'info'>
Various combinations of the roughness and metalness can represent almost every possible real-world material surface. See [material references](../../art/modeling/material-reference.md) for examples and references of how combinations of material values can create various surface appearances.
</Alert>

#### Fresnel

**Fresnel** refers to the amount of reflection of a surface in reference to the current viewing angle. Studio's Fresnel processing aims for physical real-world accuracy, although you may get unexpected specular contribution at certain angles even with rough surfaces. In some cases, you can compensate by making your roughness map around `0.1` more rough to achieve a consistent lighting response with your materials.

Even though Roblox renders this lighting effect accurately, the brightness and reflectivity of a surface may not respond consistently between your texture content creating software, such as Substance Painter, and Studio. See [clothing examples](../../art/modeling/material-reference.md#clothing-examples) for differences in rendering between applications.

### Metalness

**Metalness** determines the reflectivity of a surface. Metalness values range between `0.0` and `1.0`. Roblox sets the default value to `0.0` if a metalness map is not present.

See the following figure for comparisons of various metalness map values:

<GridContainer numColumns="3">

<figure>
<img src="../../assets/modeling/surface-appearance/Metalness-0.png" alt="A brown sphere with light splotches. A legend indicates the metalness map is completely black."/>
<figcaption><center>0.0</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Metalness-Half.png" alt="A brown sphere with light splotches and some reflectiveness. A legend indicates the metalness map is exactly grey."/>
<figcaption><center>0.5</center></figcaption>
</figure>
<figure>
<img src="../../assets/modeling/surface-appearance/Metalness-1.png" alt="A brown sphere with moderate splotches and lots of reflectiveness. A legend indicates the metalness map is completely white."/>
<figcaption><center>1.0</center></figcaption>
</figure>
</GridContainer>

Different PBR renderers use various workflows for processing reflectiveness. Studio only uses the **metalness workflow** which determines whether a material is a **nonmetal** or a **metal**, sometimes referred to as an **insulator** or **conductor**.

In most cases, you should set this value to either `0.0` (non-metal) or `1.0` (metal). You can use partial metalness values when creating more uncommon surfaces with moderate reflective properties, like satin or silk. This practice can subtly fake the reflections in the material to highlight the color from the [color/albedo map](#color-albedo) over colors reflected in the environment.

<Alert severity = 'info'>
Various combinations of the roughness and metalness can represent almost every possible real-world material surface. See [material references](../../art/modeling/material-reference.md) for examples and references of how combinations of material values can create various surface appearances.
</Alert>
