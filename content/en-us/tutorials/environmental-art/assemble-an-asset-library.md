---
title: Assemble an Asset Library
description: Explains how to import and configure your assets within a central location in your experience.
next: /tutorials/environmental-art/construct-your-world
prev: /tutorials/environmental-art/develop-polished-assets
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/0shiHaGe87s?si=xILCuyVy8dIviZ2U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Assembling an asset library** is the process of importing and configuring a collection of assets in a central location within your experience for easy access and reuse. This process can save you significant time as you prepare to construct your environment, especially if you configure each asset's values to enhance performance and optimize memory usage on mid to low-end devices.

Using the [Environment Art - Assembling](https://www.roblox.com/games/14447787049/Environment-Art-Assembling) `.rbxl` file as a reference, this section of the environmental art curriculum shows you how to assemble an asset library from your polished assets, including step-by-step instructions on:

- Creating custom materials for your terrain from your tileable textures.
- Creating SurfaceAppearance objects for your trim sheet, and applying them to unwrapped meshes in your asset library.
- Setting rendering parameters for your assets to ensure optimal performance across all devices.
- Converting your assets into packages so that you can update and reuse them across all of your projects.

After you complete this section, you will learn how to utilize your asset library in creative ways to replace or convert the greybox environment, and add final touches that enhance the overall 3D space.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/Overview.png" width="100%"/>

<Alert severity="info">
    Before you begin to compile your asset library by importing your tileable textures, trim sheets, modular assets, and props into Studio, it's best practice to arrange and organize all of your content in a folder structure according to their data type, such as trim sheets, decals, modular assets, and props. This can provide you an ease of reference as you create custom materials and visual treatments.
</Alert>

## Create Custom Materials

Studio represents custom materials as `Class.MaterialVariant` objects within the `Class.MaterialService`. These `Class.MaterialVariant` objects have four properties that combine the four tileable [texture maps](../../art/modeling/surface-appearance.md#texture-maps) to create a high-quality custom material with physical characteristics:

- `Class.MaterialVariant.ColorMap` – Represents the albedo texture map.
- `Class.MaterialVariant.MetalnessMap` – Represents the metalness texture map.
- `Class.MaterialVariant.NormalMap` – Represents the normal texture map.
- `Class.MaterialVariant.RoughnessMap` – Represents the roughness texture map.

After you supply the texture maps to these properties, you can apply your new custom material to both parts, meshes, and terrain. You can use or modify the sample texture map `.png` files to create the Lumpy Moss, Flowering Lumpy Moss, Lumpy Moss with Stones, and Stones custom materials within the final sample laser tag environment, or you can use your own that you designed in the previous section of the tutorial.

To create `Class.MaterialVariant` objects for your tileable textures:

1. In the **Home** or **Model** tab of the menu bar, click the **Material Manager** button. The **Material Manager** window opens.
2. In the **Materials** list, select the base material that most aligns with your tileable texture. For example, if you were creating a `Class.MaterialVariant` object for the Lumpy Moss tileable texture, choose the default ground material so the material inherits its physical properties.
3. In the **Toolbar**, click the **⊕** icon. A new `Class.MaterialVariant` displays in the palette with an icon in the bottom-right corner that indicates it's a custom material.

   <img src="../../assets/studio/material-manager/Custom-Material-Icon.png" width="100%" alt="New MaterialVariant tile in Material Manager with icon to indicate a custom material" />

4. In the **Inspector**, navigate to the **General** section, then rename the material to align with the name of your tileable texture.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CustomMaterials-4.jpg" width="40%"/>

5. In the **Texture Maps** section, on the right-hand side of **Color**, click the **Import** button. A file browser displays.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CustomMaterials-5.jpg" width="40%"/>

6. In the file browser, select the **Albedo** texture map `.png` file for the corresponding tileable texture, then the **Open** button. The file browser closes, and the new color map displays with its assetID.
7. Repeat this process for the **Metalness**, **Normal**, and **Roughness** texture maps. The custom material updates to reflect the texture maps.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CustomMaterials-7a.jpg" width="85%"/>
     </figure>
     <figure>
       <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CustomMaterials-7b.jpg" width="100%"/>
     </figure>
   </GridContainer>

8. In the **Overrides** section, enable the **Set as Override** toggle to ensure that when you apply ground to your terrain, Studio uses this custom material.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CustomMaterials-8.jpg" width="40%"/>

9. **(Optional)** If you are creating a custom material that represents an organic material,

   1. In the **Tiling** section, click the **Pattern** dropdown.
   1. Select **Organic** to randomize the output and reduce visible tiling.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CustomMaterials-9.jpg" width="40%"/>

10. Repeat this process for each tileable texture you want to include in your experience.

## Create SurfaceAppearance Packages

Studio utilizes trim sheets within `Class.SurfaceAppearance` objects that you can parent to `Class.MeshPart|MeshParts` that contain UV data. Similar to custom materials, `Class.SurfaceAppearance` objects have four properties that combine the four trim sheet texture maps to create a high-quality 3D visual surface treatment:

`Class.SurfaceAppearance.ColorMap` – Represents the albedo texture map.
`Class.SurfaceAppearance.MetalnessMap` – Represents the metalness texture map.
`Class.SurfaceAppearance.NormalMap` – Represents the normal texture map.
`Class.SurfaceAppearance.RoughnessMap` – Represents the roughness texture map.

After you supply the texture maps to these properties, you can make the `Class.SurfaceAppearance` object a child of a `Class.MeshPart` with uv data that maps to your trim sheet, and the uv data automatically applies to the parent mesh. It's for this reason that it's useful to make the `Class.SurfaceAppearance` object a [package](../../projects/assets/packages.md) so that you can reuse the same `Class.SurfaceAppearance` object across all of your modular assets and props. For example, the following meshes all have uv data that maps to the same trim sheet layout that's represented within a single `Class.SurfaceAppearance` object package.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/SAPackages-Intro.jpg" width="80%"/>

You can use or modify the sample texture map `.png` files to create a `Class.SurfaceAppearance` object that respects the uv data for the sample modular assets and props within the final sample laser tag environment, or you can use your own that you designed in the previous section of the tutorial that apply to your own modular assets and props.

To create `Class.SurfaceAppearance` packages that you can child to your modular kit and props:

1. Insert a **SurfaceAppearance** object into the Workspace.
2. Select the **SurfaceAppearance** object, then in the **Properties** window, select the **ColorMap** property. A pop-up displays.
3. Click the **Add Image…** button. A file browser displays.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/SAPackages-3.jpg" width="30%"/>

4. Select the **Albedo** texture map for the corresponding tileable texture, then the **Open** button. The file browser closes, and the **ColorMap** property updates with a new assetID.
5. Repeat this process for the **MetalnessMap**, **NormalMap**, and **RoughnessMap** properties, selecting their respective texture maps from the file browser.
6. In the **Explorer** window, right-click the **SurfaceAppearance** object, then select **Convert to Package** from the contextual menu. The **Convert to Package** dialog displays.

   <img src="../../assets/studio/packages/Contextual-Menu-Convert.png" width="300" />

7. Fill out the **Title** and **Description** fields, set the ownership to yourself or a group, then click the **Submit** button. Once complete, a chain link symbol displays over the SurfaceAppearance object's icon to identify it as a package.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/SAPackages-7.jpg" width="30%"/>

8. **(Optional)** Select the **SurfaceAppearance** object's child **PackageLink** object, then in the **Properties** window, enable **AutoUpdate** to automatically update the package if you make any modifications to the **SurfaceAppearance** object.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/SAPackages-8.jpg" width="40%"/>

## Import Modular Assets and Props

Studio represents the modular assets and props that you import as `Class.Model` objects with child `Class.MeshPart|MeshParts` for each component of the asset. For example, if you import a wall section with a top trim, bottom trim, and wall component, Studio represents the `.fbx` or `.obj` file as a **Wall_Section** `Class.Model` with separate child **Top_Trim**, **Bottom_Trim**, and **Wall** `Class.MeshPart|MeshParts`.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/Importing-Intro.png" width="30%"/>

Using the 3D Importer, you can import the sample modular kit and props into Studio for use in your asset library, or you can import any assets you designed in the previous section of the tutorial. For more information on this tool's functionality, see [3D Importer](../../art/modeling/3d-importer.md).

To import your modular assets and props into the experience:

1. In the **Home** or **Avatar** tab, click the **Import 3D** button. A file browser displays.

   <img alt="3D Importer Panels" src="../../assets/studio/general/Avatar-Tab-Import-3D.png" width="100%" />

2. Select a `.fbx` file for either a modular asset or prop.
3. Verify the object preview and check that the import settings are correct for your object.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/Importing-3.jpg" width="80%"/>

4. Verify any [warning or error messages](../../art/modeling/3d-importer.md#warnings-and-errors).
5. Click **Import**. The asset displays in the **Explorer** window and in the viewport.
6. Repeat this process for each modular asset and prop.
7. Move all of your assets into one area of your experience near your greybox geometry. This zone is your asset library.

## Apply SurfaceAppearance Data

When you go through the process of unwrapping the UVs of a mesh in third-party modeling software, the software stores the UV data within the mesh's `.fbx` or `.obj` file. When you import that mesh into Studio, the resulting `Class.MeshPart` object retains that data, but you still need to apply a `Class.SurfaceAppearance` object with texture map properties from your trim sheet in order to display your trim textures on the asset.

To apply `Class.SurfaceAppearance` texture map data to unwrapped meshes in your asset library:

1. In the **Explorer** window, click your **SurfaceAppearance** package, then press <kbd>Ctrl</kbd><kbd>D</kbd> (<kbd>⌘</kbd><kbd>D</kbd>) to duplicate it.
2. Child the duplicate **SurfaceAppearance** package to either a modular asset or a prop. The asset applies its UV data to the texture maps and displays its visual treatment.
3. Repeat this process for each modular asset and prop.

## Set Physics and Rendering Parameters

Now that you have your assets within Studio, it's important to set physics and rendering parameters that allow the assets to retain the highest possible visual quality across devices with memory and GPU limitations. In general, the more closely you adhere to the guidance in this section, the more performant you make your experience. However, it's important to carefully consider the context of where you plan to place each asset within the overall environment to ensure you maintain your aesthetic goals and gameplay requirements.

### Anchored

The `Class.BasePart.Anchored` property determines whether the Roblox engine's physics system affects the position of the object. When you enable this property for a `Class.Part` or `Class.MeshPart`, it removes the object from the physical calculations of the dynamic simulation that's always running in experience, meaning the object will never change position due to gravity or collision from other objects.

Objects that don't simulate a physics response are cheaper to render because they don't take up the GPU that's necessary for those physics calculations. When you free up GPU, you improve performance for your experience, especially on low-end devices that need to save GPU for fast-paced gameplay. It's for this reason that **every** asset aside from doors in the final sample laser tag environment are anchored.

### CanCollide

The `Class.BasePart.CanCollide` property determines whether the object can physically interact with other objects. When you enable this property for a `Class.Part` or `Class.MeshPart`, the object is impenetrable, and the Roblox engine accounts for it in physics calculations. These calculations can impact your experience's performance when there are many objects the engine must consider in its physics calculations.

To alleviate some of this impact on performance, disable this property for objects that the user will never interact with. For example, the final sample laser tag environment disables this property for all foliage.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/SettingParameters-CanCollide.png" width="60%"/>

### CanTouch

The `Class.BasePart.CanTouch` property determines if `Class.BasePart.Touched|Touched` and `Class.BasePart.TouchEnded|TouchEnded` events fire on the object. When you enable this property for a `Class.Part` or `Class.MeshPart`, the Roblox engine checks the object's touch event state to see if it needs to trigger or stop an event. This process happens for every single frame, which can take up a significant amount of memory if the engine needs to check the touch event state for many objects at once.

To alleviate some of this impact on memory, only enable this property for objects that must trigger an event. For example, the final sample laser tag environment only enables this property for transparent **detector** `Class.Part` objects in door frames that must trigger an event to open or close the door according to a user's distance from the doorway. For more information on this detection process, see the Intermediate Scripting tutorial.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/SettingParameters-CanTouch.png" width="30%"/>

### CanQuery

The `Class.BasePart.CanQuery` property determines whether the Roblox engine considers the object during spatial query operations, such as raycasting. Studio enables this property for every `Class.Part` or `Class.MeshPart` by default, meaning that the Roblox engine checks to see if each object needs to call a spatial query operation. This process occurs for every single frame, which can take up a significant amount of memory when the engine needs to make these checks for many objects at once.

For this reason, it's recommended to disable this property for objects that the Roblox engine doesn't need to consider for spatial query operations. When making decisions about where to disable this property, consider how each asset impacts gameplay. For example, the final sample laser tag environment keeps this property enabled for every wall in the building because the engine needs to account for these surfaces as users fire lasers from their laser tag gun. If the engine doesn't account for these assets, then the laser would shoot straight through the building as though it wasn't there at all.

### CastShadow

The `Class.BasePart.CastShadow` property determines whether the object casts a shadow. When you enable this property for a `Class.Part` or `Class.MeshPart`, the Roblox engine calculates every vertex location of the object at runtime, then draws a raycast from the sun to any of its neighboring objects until it collides with another object to create the shadow.

These calculations can come at a performance cost, especially when you have many objects of geometric complexity. This is because objects with geometric complexity have more polygons than objects that are geometrically simple, meaning they have more vertices that the engine needs to calculate for the object's shadow. The fewer polygons in an object, the faster the operation and cheaper its shadow.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/SettingParameters-CastShadow1.png" width="80%"/>

Shadows can provide a great sense of realism to objects with 3D geometrical depth, so when you're deciding where to disable this property, consider where objects provide a significant visual improvement to the environment, and where users will notice missing shadows. For example, the complex shadows of foliage can provide a great sense of immersion in the outdoor space where users are likely to see them, but that same immersion isn't necessary for the foliage that peaks through the ceiling that users will never interact with.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CastShadow-Enabled.jpg" width="100%"/>
    <figcaption>`Class.BasePart.CastShadow` = Enabled</figcaption>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CastShadow-Disabled.jpg" width="100%"/>
    <figcaption>`Class.BasePart.CastShadow` = Disabled</figcaption>
  </figure>
</GridContainer>

### DoubleSided

The `Class.MeshPart.DoubleSided` property determines whether to render both faces or polygons in the mesh. When you enable this property for a planar `Class.MeshPart`, such as leaves, hair, or cloth cards, the Roblox engine renders both faces or polygons in the mesh to allow users to see the fullness of the object no matter what angle they are looking at the object. For example, the following tree leaves are single-sided planar meshes, and when you enable this property, any of the leaves that face away from the camera become visible to the user.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/DoubleSided-Enabled.png" width="100%"/>
    <figcaption>`Class.MeshPart.DoubleSided` = Enabled</figcaption>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/DoubleSided-Disabled.png" width="100%"/>
    <figcaption>`Class.MeshPart.DoubleSided` = Disabled</figcaption>
  </figure>
</GridContainer>

This property is useful for adding realism to your environment, but it comes at a performance cost because the engine needs to render the object's polygons twice: once for the direction that faces the user's camera, and again for any meshes that face away from the user's camera. To alleviate some of this impact on performance, the final sample laser tag environment only enables this property for foliage because it has a strong visual impact for realism in the 3D space.

### CollisionFidelity

The `Class.MeshPart.CollisionFidelity` property determines how closely the physical hitbox of a mesh or union matches its visual representation. By default, this setting renders a hitbox that's roughly the same as the polygonal shape of the mesh, meaning that where users collide with the object is similar to the actual geometry of the mesh. For example, the castle mesh in the following images has a default hitbox that almost matches the shape of its geometry.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/physics/collisions/Collision-Fidelity-MeshPart.jpg" width="100%"/>
    <figcaption>Original Mesh</figcaption>
  </figure>
  <figure>
    <img src="../../assets/physics/collisions/Collision-Fidelity-Default.jpg" width="100%"/>
    <figcaption>Default</figcaption>
  </figure>
</GridContainer>

You can set this property to a different value to reduce the precision of a mesh's hitbox. For example, when you set this property to **Hull**, the Roblox engine significantly reduces the vertices of the mesh's hitbox, and when you set this property to **Box**, the engine reduces the mesh's hitbox to a cube that surrounds the mesh. In addition, if you want to increase the precision of a mesh's hitbox, you can set this property to **PreviseConvexDecomposition** to increase the amount of vertices in the hitbox

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/physics/collisions/Collision-Fidelity-Box.jpg" width="100%"/>
    <figcaption>Box</figcaption>
  </figure>
  <figure>
    <img src="../../assets/physics/collisions/Collision-Fidelity-Hull.jpg" width="100%"/>
    <figcaption>Hull</figcaption>
  </figure>
  <figure>
    <img src="../../assets/physics/collisions/Collision-Fidelity-Precise.jpg" width="100%"/>
    <figcaption>PreciseConvexDecomposition</figcaption>
  </figure>
</GridContainer>

Similar to `Class.BasePart.CastShadow`, the more vertices the Roblox engine needs to render, the higher the performance cost. For this reason, it's important to consider how you want users to interact with each mesh to see if you can reduce the amount of vertices the engine needs to render for the mesh's hitbox. In cases where it isn't necessary for a hitbox to be precise, set this property to either **Box** or **Hull**.

To demonstrate this concept, reference the following images that display the hitbox of every mesh of the wall model that provides a rise in elevation between the first and second floor of the final sample laser tag environment. The default hitbox for the main wall has a lot of unnecessary geometry when it only needs to provide a surface to prevent the user from moving in that direction. If you set the property to **Box** for this mesh, you can remove this redundant geometry while keeping the purpose of the hitbox intact.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CollisionFidelity-WallMesh.jpg" width="100%"/>
    <figcaption>Original Mesh</figcaption>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CollisionFidelity-Default.jpg" width="100%"/>
    <figcaption>Default</figcaption>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CollisionFidelity-Box.jpg" width="100%"/>
    <figcaption>Box</figcaption>
  </figure>
</GridContainer>

As you're making these decisions, it's important to consider how changing the default value may negatively affect users as they're navigating your environment. For example, if you set the property to **Box** for the trim meshes of the wall model, users would collide with the hitbox if they try to jump near the wall. Instead, set these meshes to **Hull** so you reduce its vertex count while keeping the hitbox closer to the shape of the mesh's geometry.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CollisionFidelity-BoxTop.jpg" width="100%"/>
    <figcaption>Box</figcaption>
  </figure>
  <figure>
    <img src="../../assets/tutorials/environmental-art-curriculum/Section3/CollisionFidelity-Hull.jpg" width="100%"/>
    <figcaption>Hull</figcaption>
  </figure>
</GridContainer>

Note that it can be important to have a hitbox that precisely conforms to the shape of your mesh, especially when you need to control exactly how users collide with its shape. For example, in the final sample laser tag environment, it's important that users only collide with the edges of the doorway and not the doorway itself, otherwise they would never be able to enter or exit a combat pocket.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/CollisionFidelity-Doorway.png" width="50%"/>

<Alert severity="info">
    To visualize collision fidelity in Studio, open **Studio Settings** from the **File** menu, then enable **Show Decomposition Geometry**.
</Alert>

### RenderFidelity

The `Class.MeshPart.RenderFidelity` property determines the mesh's level of detail that displays to the user. When you set this property to **Performance**, the Roblox engine reduces the mesh's fidelity the further the user is from the mesh, and when you set this property to **Precise**, every vertex of your mesh renders exactly as you intend no matter the distance between them.

The more objects the engine must render precisely to the user from any distance, especially if they have a high vertex count, the higher the performance cost. To alleviate some of this impact on performance, set this property to **Performance** for objects with geometric complexity, such as foliage in the sample asset library, because they don't need to display in their entirety from a distance for any gameplay requirement. This reduces your experience's polygon count without yielding overall visual quality.

## Convert Assets into Packages

Now that all of your modular assets are in Studio with rendering parameters that are set up to retain their high visual quality for all users, it's time to convert them into packages. It's important to convert your assets into packages because it allows you to reuse them repeatedly throughout your current experience and other projects. In addition, you can easily make edits to a package that instantly populate to all of its instances, saving you a lot of time in the iteration process.

Because your `Class.SurfaceAppearance` objects are already packages, when you convert your `Class.Model` objects into packages, they become nested packages. Nested packages allow you to maintain complex hierarchies of child objects that you can modify independent of the `Class.Model` object package. This allows you greater control over the individual components of your assets.

<img src="../../assets/tutorials/environmental-art-curriculum/Section3/ConvertingAssets-Intro.png" width="30%"/>

To convert your modular assets and props into packages:

1. In the **Explorer** window, right-click a modular asset or a prop, then select **Convert to Package** from the contextual menu. The **Convert to Package** dialog displays.
2. Fill out the **Title** and **Description** fields, set the ownership to yourself or a group, then click the **Submit** button. Once complete, a chain link symbol displays over the model's icon to identify it as a package.

   <img src="../../assets/tutorials/environmental-art-curriculum/Section3/ConvertingAssets-2.png" width="30%"/>

3. Repeat this process for each modular asset and prop.

Once you are happy with the overall layout of your asset library, you can move on to decorating the environment with your newly polished assets, and configuring additional elements of the 3D space to bring your world to life.
