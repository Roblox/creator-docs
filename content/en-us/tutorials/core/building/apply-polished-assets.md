---
title: Apply Polished Assets
description: Explains how to finish your scene by replacing simple parts with complex, imported models.
prev: /tutorials/core/building/customize-global-lighting
comments: The links to the Materials and PBR Modeling guides must be replaced by a single link to the Environmental Art curriculum once that is published. The link at the end should also be changed to link to the next sets of tutorials.
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/d3ltJgFP-rE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>

**Applying polished assets** is the last step in constructing your final environment, in which you swap out your greybox placeholder assets for high-quality polished assets in order to meet your experience's aesthetic goals and game design requirements. This exciting section of the curriculum is where you see your world come to life into a cohesive environment that is complete and ready for publication.

Using the [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) `.rbxl` file as a reference, this section of the tutorial teaches you how to use the Creator Store to find and add a sample asset library into your project, continue your organization structure to sort your new assets into meaningful categories, and apply the asset library to the 3D space.

## Get Asset Library

The **Creator Store** is a tab of the Toolbox that you can use to find all assets that are made by Roblox and the Roblox community for use within your projects, including model, image, mesh, audio, plugin, video, and font assets. You can use the Creator Store to add an individual asset or asset library directly into an open experience.

Asset libraries are collections of assets you can place into a central location of your experience for easy access and reuse. The asset library you will use for your project from the Creator Store includes six 3D assets, two custom `Class.MaterialVariant` materials, and the final particle effects from [Create Basic Visual Effects](../../core/building/create-basic-visual-effects.md). The six meshes are as follows:

<GridContainer numColumns="3">
  <figure>
    <img src="../../../assets/tutorials/core-building-and-scripting/Platform-A-Model.jpg" />
    <figcaption>PlatformA</figcaption>
  </figure>
    <figure>
     <img src="../../../assets/tutorials/core-building-and-scripting/Platform-B-Model.jpg" />
    <figcaption>PlatformB</figcaption>
  </figure>
    <figure>
    <img src="../../../assets/tutorials/core-building-and-scripting/Coin-Mesh.jpg" />
    <figcaption>Coin</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/core-building-and-scripting/Sea-Stack-Mesh.jpg" />
    <figcaption>SeaStackMesh</figcaption>
  </figure>
  <figure>
    <img src="../../../assets/tutorials/core-building-and-scripting/Sea-Stack-Cave-Mesh.jpg" />
    <figcaption>SeaStackCaveMesh</figcaption>
  </figure>
    <figure>
    <img src="../../../assets/tutorials/core-building-and-scripting/Mountain-Mesh.jpg" />
    <figcaption>MountainMesh</figcaption>
  </figure>
</GridContainer>

Each of these 3D assets are either a single `Class.MeshPart` object, or a `Class.Model` object that stores multiple `Class.MeshPart` objects, and they use custom materials or physically-based rendering (PBR) textures that allow you to represent realistic shading and lighting. For more information on this process, see [Materials - Custom Materials](../../../parts/materials.md#custom-materials) and [PBR Textures](../../../art/modeling/surface-appearance.md).

You can add the library to your inventory within Studio by clicking the **Add to Inventory** link in the following component. Once assets are within your inventory, you can reuse them in any project on the platform.

<BrowseSampleCard href='https://create.roblox.com/marketplace/asset/14238769242' description='Create the completed version of the Core sample experience with these art assets. Includes six 3D assets and two custom materials.' title='Core Curriculum Library' assetId={14238769242}  />

To get the asset library from your inventory into your experience:

1. In the menu bar, select the **View** tab.
2. In the **Show** section, click **Toolbox**. The **Toolbox** window displays.

   <img src="../../../assets/studio/general/View-Tab-Toolbox.png" width="776" />

3. In the **Toolbox** window, click the **Inventory** tab. The **My Models** sort displays.

   <img src="../../../assets/studio/toolbox/Inventory-Tab.png" width="360" />

4. Click the **Core Building and Scripting** tile. The library displays in the viewport, but some of the meshes do not display the correct texture. This is because their materials are set to custom variants that are not yet in `Class.MaterialService`.

   <img src="../../../assets/tutorials/core-building-and-scripting/Asset-Library-Complete.jpg" width="800" />

5. In the **Explorer** window, select **Moss_Lumpy_A** and **Moss_Strata_Noisy_A** in the sample asset library, then drag them into the **MaterialService** container. The asset library updates to display the correct materials.

   <img src="../../../assets/tutorials/core-building-and-scripting/MaterialService-Contents.png" width="320" />

   <img src="../../../assets/tutorials/core-building-and-scripting/Asset-Library-Complete-With-Materials.jpg" width="800" />

## Continue Organization Structure

Before you apply your asset library to your greybox geometry, it's important to continue the organization structure you started in [Greybox a Playable Area](../../core/building/greybox-a-playable-area.md) by creating new container objects for the new assets you're about to add to your environment. This process keeps your Workspace organized and easy to scan, allowing you to easily make quick updates to specific groupings of assets.

To add in additional container objects to your organization structure:

1. In the **Explorer** window, insert two new folders into the **World** folder.
2. Rename the folders **Platforms** and **Mountains**, respectively.
3. Insert a new model into the **Platforms** folder for each sea stack platform in your environment, and rename them according to sea stack level naming you created in [Greybox a Playable Area](../../core/building/greybox-a-playable-area.md). For example, the sample experience has 18 individual model containers for every platform in the environment.

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Organization-Structure.jpg" width="25%" />

## Apply Asset Library

<Alert severity="info">
    The following instructions provide two different instructional paths: you can either apply the asset library to your own unique environment, or you can apply the asset library in a way that exactly recreates the final environment within the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience.
</Alert>

Now that you have an organizational structure to contain your new assets, you can now begin to apply the asset library to your greybox geometry. As you follow either instructional path, note that the example imagery make the placeholder assets semi-transparent so you can see your progress between steps.

<Tabs>
  <TabItem key = "1" label="Graybox Version">
    <img src="../../../assets/tutorials/core-building-and-scripting/Pre-Polished-Assets.jpg" width="800" height="450" />
  </TabItem>
  <TabItem key = "2" label="Polished Assets">
    <img src="../../../assets/tutorials/core-building-and-scripting/Final-Polished-Assets.jpg" width="800" height="450" />
  </TabItem>
</Tabs>

### Platforms

The sample asset library includes two types of platforms you can use for the top of your sea stack platforms:

- **PlatformA** – Includes a metallic circular base for the initial and final platforms.
- **PlatformB** – Includes a basic terrain cap for the intermediate level platforms.

Both platform types are `Class.Model` objects that include two `Class.MeshPart` objects.

<img src="../../../assets/tutorials/core-building-and-scripting/Platform-Types.jpg" width="80%" />

<Tabs>
  <TabItem key = "1" label="Apply Your Own Platforms">

To apply the asset library to your platforms:

1. In the **Explorer** window, navigate to the asset library and copy **PlatformA**.
   1. Right-click **PlatformA**. A contextual menu displays.
   1. From the contextual menu, select **Copy**.
1. In the **Platforms** folder, paste **PlatformA** into the **Level_1** model.
1. In the **Home** tab, use the **Move** and **Scale** tools to position and scale the model to the size of your first placeholder sea stack platform.

   <img src="../../../assets/tutorials/core-building-and-scripting/First-Platform.jpg" width="80%" />

1. Repeat this process, adding and configuring either a **PlatformA** or **PlatformB** asset to the top of each placeholder sea stack platform.

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Platforms-5.jpg" width="80%" />

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the sea stack platforms within the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience:

1. In the **Explorer** window, navigate to the asset library and copy **PlatformA**.
   1. Right-click **PlatformA**. A contextual menu displays.
   1. From the contextual menu, select **Copy**.
2. In the **Platforms** folder, paste **PlatformA** into the **Level_1** model.
3. In the **Properties** window,

   1. Set **Origin.Position** to **-30, 3, 9**.
   1. Set **Scale** to **2.2**.

   <img src="../../../assets/tutorials/core-building-and-scripting/First-Platform.jpg" width="80%" />

4. Repeat this process, adding and configuring the following **PlatformA** assets into their respective sea stack platform models:

   <table>
   <thead>
   <tr>
   <th>Parent Model</th>
   <th>Origin.Position</th>
   <th>Scale</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Level_2</td>
   <td>`-24, 11, 24`</td>
   <td>`1.4`</td>
   </tr>
   <tr>
   <td>Level_3a</td>
   <td>`34, 31, 9.5`</td>
   <td>`0.7`</td>
   </tr>
   <tr>
   <td>Level_3b</td>
   <td>`79, 31, 2`</td>
   <td>`0.6`</td>
   </tr>
   <tr>
   <td>Level_7</td>
   <td>`402, 312, 79`</td>
   <td>`1.1`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Platforms-4.jpg" width="80%" />

5. Add and configure the following **PlatformB** assets into their respective sea stack platform models:

   <table>
   <thead>
   <tr>
   <th>Parent Model</th>
   <th>Origin.Position</th>
   <th>Scale</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Level_3c</td>
   <td>`89, 31, 48`</td>
   <td>`0.8`</td>
   </tr>
   <tr>
   <td>Level_4a</td>
   <td>`104, 65.5, 46.5`</td>
   <td>`0.6`</td>
   </tr>
   <tr>
   <td>Level_4b</td>
   <td>`127, 66, 67.5`</td>
   <td>`0.6`</td>
   </tr>
   <tr>
   <td>Level_4b</td>
   <td>`133.5, 164.5, 70.5`</td>
   <td>`0.7`</td>
   </tr>
   <tr>
   <td>Level_4c</td>
   <td>`152, 65.5, 91`</td>
   <td>`1`</td>
   </tr>
   <tr>
   <td>Level_4d</td>
   <td>`200, 66, 107`</td>
   <td>`0.5`</td>
   </tr>
   <tr>
   <td>Level_4e</td>
   <td>`238.5, 66, 81`</td>
   <td>`0.8`</td>
   </tr>
   <tr>
   <td>Level_5a</td>
   <td>`262, 120, 57.5`</td>
   <td>`0.7`</td>
   </tr>
   <tr>
   <td>Level_5b</td>
   <td>`245, 122, 15`</td>
   <td>`0.4`</td>
   </tr>
   <tr>
   <td>Level_5c</td>
   <td>`271, 122.5, -5.5`</td>
   <td>`0.4`</td>
   </tr>
   <tr>
   <td>Level_5d</td>
   <td>`318, 121, -22`</td>
   <td>`0.9`</td>
   </tr>
   <tr>
   <td>Level_6a</td>
   <td>`363, 201, -52.5`</td>
   <td>`1.2`</td>
   </tr>
   <tr>
   <td>Level_6b</td>
   <td>`381, 201, 11`</td>
   <td>`0.4`</td>
   </tr>
   <tr>
   <td>Level_6c</td>
   <td>`389, 201, 47`</td>
   <td>`0.6`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Platforms-5.jpg" width="80%" />

  </TabItem>
</Tabs>

### Sea Stacks

The sample asset library includes two types of sea stack rock formations you can stack in creative ways to form the pillars of your sea stack platforms:

- **SeaStackMesh** – Includes a solid rock formation.
- **SeaStackCaveMesh** – Includes a tunnel and solid top.

Both platform types are `Class.MeshPart` objects.

<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../assets/tutorials/core-building-and-scripting/Sea-Stacks.jpg" />
  </figure>
  <figure>
    <img width="100%" img src="../../../assets/tutorials/core-building-and-scripting/Completed-Sea-Stack.jpg" />
  </figure>
</GridContainer>

<Tabs>
  <TabItem key = "1" label="Apply Your Own Sea Stacks">

To apply the asset library to your sea stacks:

1. In the **Explorer** window, navigate to the asset library and copy **SeaStackMesh**.
1. In the **Platforms** folder, paste **SeaStackMesh** into one of your level models.
1. In the **Home** tab, use the **Move**, **Scale**, and **Rotate** tools to position, scale, and rotate the mesh until it is the length of your placeholder sea stack. If necessary, use more than one instance of the **SeaStackMesh** mesh.

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-3.jpg" width="80%" />

1. Repeat this process, adding and configuring more **SeaStackMesh** and **SeaStackCaveMesh** meshes for each respective sea stack and tunnel in your experience.

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-18.jpg" width="80%" />

1. Delete your placeholder greybox sea stack platforms.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the sea stacks within the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience:

1. In the **Explorer** window, navigate to the asset library and copy **SeaStackMesh**.
2. In the **Platforms** folder, paste **SeaStackMesh** into the **Level_3a** model three times.
3. In the **Properties** window, configure the meshes with the following values:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`31, 31, 34`</td>
   <td>`31, 14, 15.5`</td>
   <td>`0, 72, 0`</td>
   </tr>
   <tr>
   <td>`32, 37, 34`</td>
   <td>`39, 11, 6`</td>
   <td>`0, 162, 0`</td>
   </tr>
   <tr>
   <td>`32, 36, 34`</td>
   <td>`31, 13, 7.5`</td>
   <td>`0, 68, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-3.jpg" width="80%" />

4. Repeat this process, adding and configuring the following **SeaStackMesh** asset into the **Level_3b** model:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`35, 47, 36`</td>
   <td>`80, 7, 4`</td>
   <td>`0, -18, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-4.jpg" width="80%" />

5. Add and configure the following **SeaStackMesh** asset into the **Level_3c** model:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`52, 69, 53`</td>
   <td>`90, -4, 48`</td>
   <td>`0, -18, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-5.jpg" width="80%" />

6. Add and configure the following **SeaStackMesh** assets into the **Level_4a** model:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`43, 49, 43`</td>
   <td>`103, 5, 48`</td>
   <td>`0, -119, 0`</td>
   </tr>
   <tr>
   <td>`37, 49, 38`</td>
   <td>`104, 41, 47`</td>
   <td>`0, -18, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-6.jpg" width="80%" />

7. Add and configure the following assets into the **Level_4b** model:

   <table>
   <thead>
   <tr>
   <th>Sea Stack Type</th>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>SeaStackCaveMesh</td>
   <td>`54, 67, 53`</td>
   <td>`131, 88, 71`</td>
   <td>`0, -111, 0`</td>
   </tr>
   <tr>
   <td>SeaStackMesh</td>
   <td>`66, 85, 65`</td>
   <td>`133, 23, 71`</td>
   <td>`0, 87, 0`</td>
   </tr>
   <tr>
   <td>SeaStackMesh</td>
   <td>`46, 55, 47`</td>
   <td>`133, 136, 71`</td>
   <td>`0, -79, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-7.jpg" width="80%" />

8. Add and configure the following **SeaStackMesh** asset into the **Level_4c** model:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`63, 81, 62`</td>
   <td>`151, 25, 91`</td>
   <td>`0, -50, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-8.jpg" width="80%" />

9. Add and configure the following **SeaStackMesh** assets into the **Level_4d** model:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`35, 39, 35`</td>
   <td>`198, -4, 108`</td>
   <td>`0, -44, 0`</td>
   </tr>
   <tr>
   <td>`33, 36, 32`</td>
   <td>`199, 21, 108`</td>
   <td>`0, -119, 0`</td>
   </tr>
   <tr>
   <td>`27, 36, 28`</td>
   <td>`199, 48, 108`</td>
   <td>`0, -18, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-9.jpg" width="80%" />

10. Add and configure the following **SeaStackMesh** assets into the **Level_4e** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`57, 65, 57`</td>
      <td>`239, -14, 82`</td>
      <td>`0, -63, 0`</td>
      </tr>
      <tr>
      <td>`48, 65, 50`</td>
      <td>`239, 34, 81`</td>
      <td>`0, 39, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-10.jpg" width="80%" />

11. Add and configure the following **SeaStackMesh** assets into the **Level_5a** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`56, 62, 54`</td>
      <td>`264, 11, 55`</td>
      <td>`0, 150, 0`</td>
      </tr>
      <tr>
      <td>`50, 57, 50`</td>
      <td>`263, 50, 57`</td>
      <td>`0, 75, 0`</td>
      </tr>
      <tr>
      <td>`43, 57, 44`</td>
      <td>`262, 92, 57`</td>
      <td>`0, 176, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-11.jpg" width="80%" />

12. Add and configure the following **SeaStackMesh** assets into the **Level_5b** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`47, 36, 40`</td>
      <td>`245, -16, 15`</td>
      <td>`0, 0, 0`</td>
      </tr>
      <tr>
      <td>`38, 38, 41`</td>
      <td>`245, 11, 14`</td>
      <td>`0, 100, 0`</td>
      </tr>
      <tr>
      <td>`36, 38, 34`</td>
      <td>`243, 34, 15`</td>
      <td>`0, -164, 0`</td>
      </tr>
      <tr>
      <td>`31, 34, 30`</td>
      <td>`244, 62, 16`</td>
      <td>`0, -45, 0`</td>
      </tr>
      <tr>
      <td>`28, 32, 28`</td>
      <td>`244, 83, 15`</td>
      <td>`0, -120, 0`</td>
      </tr>
      <tr>
      <td>`24, 32, 24`</td>
      <td>`244, 106, 15`</td>
      <td>`0, -18, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-12.png" width="80%" />

13. Add and configure the following **SeaStackMesh** assets into the **Level_5c** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`45, 34, 38`</td>
      <td>`270, -8, -6`</td>
      <td>`0, 180, 0`</td>
      </tr>
      <tr>
      <td>`36, 35, 38`</td>
      <td>`270, 17, -5`</td>
      <td>`0, -80, 0`</td>
      </tr>
      <tr>
      <td>`34, 35, 32`</td>
      <td>`272, 40, -5`</td>
      <td>`0, 16, 0`</td>
      </tr>
      <tr>
      <td>`29, 32, 29`</td>
      <td>`271, 65, -7`</td>
      <td>`0, 136, 0`</td>
      </tr>
      <tr>
      <td>`26, 30, 26`</td>
      <td>`271, 86, -6`</td>
      <td>`0, 61, 0`</td>
      </tr>
      <tr>
      <td>`22, 30, 23`</td>
      <td>`270, 108, -6`</td>
      <td>`0, 162, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-13.jpg" width="80%" />

14. Add and configure the following **SeaStackMesh** assets into the **Level_5d** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`65, 71, 63`</td>
      <td>`315, -5, -27`</td>
      <td>`0, -161, 0`</td>
      </tr>
      <tr>
      <td>`58, 66, 58`</td>
      <td>`315, 39, -25`</td>
      <td>`0, 124, 0`</td>
      </tr>
      <tr>
      <td>`50, 66, 51`</td>
      <td>`315, 89, -24`</td>
      <td>`0, -134, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-14.jpg" width="80%" />

15. Add and configure the following **SeaStackMesh** assets into the **Level_6a** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`94, 104, 92`</td>
      <td>`358, 32, -56`</td>
      <td>`0, -123, 0`</td>
      </tr>
      <tr>
      <td>`85, 96, 84`</td>
      <td>`360, 97, -54`</td>
      <td>`0, 162, 0`</td>
      </tr>
      <tr>
      <td>`72, 71, 74`</td>
      <td>`361, 165, -52`</td>
      <td>`0, -79, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-15.jpg" width="80%" />

16. Add and configure the following **SeaStackMesh** assets into the **Level_6b** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`44, 65, 47`</td>
      <td>`380, 17, 9`</td>
      <td>`0, -143, 0`</td>
      </tr>
      <tr>
      <td>`46, 44, 39`</td>
      <td>`380, 61, 11`</td>
      <td>`0, -78, 0`</td>
      </tr>
      <tr>
      <td>`37, 37, 40`</td>
      <td>`381, 92, 11`</td>
      <td>`0, 22, 0`</td>
      </tr>
      <tr>
      <td>`35, 37, 33`</td>
      <td>`381, 115, 10`</td>
      <td>`0, 118, 0`</td>
      </tr>
      <tr>
      <td>`30, 33, 30`</td>
      <td>`379, 141, 10`</td>
      <td>`0, -123, 0`</td>
      </tr>
      <tr>
      <td>`27, 31, 27`</td>
      <td>`380, 162, 10`</td>
      <td>`0, 162, 0`</td>
      </tr>
      <tr>
      <td>`23, 31, 24`</td>
      <td>`380, 185, 11`</td>
      <td>`0, -96, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-16.jpg" width="80%" />

17. Add and configure the following **SeaStackMesh** assets into the **Level_6c** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`68, 52, 57`</td>
      <td>`387, 3, 48`</td>
      <td>`0, -4, 0`</td>
      </tr>
      <tr>
      <td>`54, 54, 58`</td>
      <td>`388, 41, 47`</td>
      <td>`0, 96, 0`</td>
      </tr>
      <tr>
      <td>`52, 54, 48`</td>
      <td>`385, 75, 47`</td>
      <td>`0, -168, 0`</td>
      </tr>
      <tr>
      <td>`44, 49, 43`</td>
      <td>`385, 114, 49`</td>
      <td>`0, -49, 0`</td>
      </tr>
      <tr>
      <td>`40, 45, 40`</td>
      <td>`386, 145, 48`</td>
      <td>`0, -124, 0`</td>
      </tr>
      <tr>
      <td>`34, 45, 35`</td>
      <td>`387, 178, 48`</td>
      <td>`0, -22, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-17.jpg" width="80%" />

18. Add and configure the following **SeaStackMesh** assets into the **Level_7a** model:

      <table>
      <thead>
      <tr>
      <th>Size</th>
      <th>CFrame.Position</th>
      <th>CFrame.Orientation</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>`96, 98, 102`</td>
      <td>`406, 19, 82`</td>
      <td>`0, -41, 0`</td>
      </tr>
      <tr>
      <td>`92, 98, 84`</td>
      <td>`407, 81, 82`</td>
      <td>`0, -19, 0`</td>
      </tr>
      <tr>
      <td>`81, 90, 79`</td>
      <td>`407, 152, 80`</td>
      <td>`0, 90, 0`</td>
      </tr>
      <tr>
      <td>`73, 83, 73`</td>
      <td>`404, 208, 80`</td>
      <td>`0, 15, 0`</td>
      </tr>
      <tr>
      <td>`62, 83, 64`</td>
      <td>`403, 270, 79`</td>
      <td>`0, 116, 0`</td>
      </tr>
      </tbody>
      </table>

      <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/SeaStacks-18.jpg" width="80%" />

19. Delete your placeholder greybox sea stack platforms.

  </TabItem>
</Tabs>

### Coins

The sample asset library includes a single **Coin** asset that's a `Class.MeshPart` object with a child `Class.SurfaceAppearance` object. The `Class.SurfaceAppearance` object creates a shiny metallic effect on the coin, making it more realistic and enticing for players to collect.

You can place these objects anywhere you set your initial placeholder coins, or modify their position and orientation values where you think they will be more useful to players.

<img src="../../../assets/tutorials/core-building-and-scripting/Final-Coin.jpg" width="80%" />

<Tabs>
  <TabItem key = "1" label="Apply Your Own Coins">

To apply the asset library to your coins:

1. In the **Explorer** window, navigate to the asset library and copy **Coin**.
1. In the **Platforms** folder, paste **Coin** into the **Coins** folder.
1. In the **Home** tab, use the **Move** and **Rotate** tools to position and rotate the mesh until it's at the same configuration of first your placeholder coin.
1. Repeat this process, adding and configuring **coin** assets wherever you set your initial coin placeholder objects.

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Coins-Final.jpg" width="80%" />

1. Delete your placeholder coins.

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the coins within the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience:

1. In the **Explorer** window, navigate to the asset library and copy **Coin**.
2. In the **Platforms** folder, paste **Coin** into the **Coins** folder.
3. In the **Properties** window,
   1. Set **CFrame.Position** to **-121, 3, 6**.
   1. Set **CFrame.Orientation** to **0, -105, 0**.
4. Repeat this process, adding and configuring the following **coin** assets wherever you set your initial coin placeholder objects:

   <table>
   <thead>
   <tr>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`-121, 3, 6`</td>
   <td>`0, -105, 0`</td>
   </tr>
   <tr>
   <td>`-107, 3, 10`</td>
   <td>`0, -105, 0`</td>
   </tr>
   <tr>
   <td>`-104, 3, 35`</td>
   <td>`0, 120, 0`</td>
   </tr>
   <tr>
   <td>`-86, 3, 61`</td>
   <td>`0, 30, 0`</td>
   </tr>
   <tr>
   <td>`-101, 3, -12`</td>
   <td>`0, -15, 0`</td>
   </tr>
   <tr>
   <td>`-22, 6, -39`</td>
   <td>`0, 120, 0`</td>
   </tr>
   <tr>
   <td>`-48, 6, -26`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`-65, 6, -6`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`-74, 6, 19`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`-67, 6, 46`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`-38, 14, 28`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`-8, 14, 8`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`-3, 14, 34`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`35, 33, 9`</td>
   <td>`0, -105, 0`</td>
   </tr>
   <tr>
   <td>`59, 39, 6`</td>
   <td>`0, 90, 0`</td>
   </tr>
   <tr>
   <td>`78, 33, 4`</td>
   <td>`0, -75, 0`</td>
   </tr>
   <tr>
   <td>`83, 39, 22`</td>
   <td>`0, -165, 0`</td>
   </tr>
   <tr>
   <td>`113, 70, 56`</td>
   <td>`0, -135, 0`</td>
   </tr>
   <tr>
   <td>`134, 70, 76`</td>
   <td>`0, -135, 0`</td>
   </tr>
   <tr>
   <td>`175, 70, 103`</td>
   <td>`0, 75, 0`</td>
   </tr>
   <tr>
   <td>`197, 70, 107`</td>
   <td>`0, 105, 0`</td>
   </tr>
   <tr>
   <td>`214, 81, 95`</td>
   <td>`0, 120, 0`</td>
   </tr>
   <tr>
   <td>`235, 99, 78`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`258, 125, 54`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`251, 132, 11`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`260, 140, 4`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`270, 132, -5`</td>
   <td>`0, 135, 0`</td>
   </tr>
   <tr>
   <td>`312, 162, -19`</td>
   <td>`0, 105, 0`</td>
   </tr>
   <tr>
   <td>`360, 206, -40`</td>
   <td>`0, 69, 0`</td>
   </tr>
   <tr>
   <td>`377, 260, -4`</td>
   <td>`0, -145, 0`</td>
   </tr>
   <tr>
   <td>`380, 206, 13`</td>
   <td>`0, 12, 0`</td>
   </tr>
   <tr>
   <td>`386, 260, 27`</td>
   <td>`0, -145, 0`</td>
   </tr>
   <tr>
   <td>`391, 206, 45`</td>
   <td>`0, 12, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Coins-Final.jpg" width="80%" />

5. Delete your placeholder coins.

  </TabItem>
</Tabs>

### Mountains

The sample asset library includes a single **MountainMesh** asset you can use to decorate the background of your world, hide the edge of your water terrain, and enclose the environment around your sea stack platforms. By rotating and scaling individual mountains, the asset's material blends together with neighboring mountains. This technique effectively reduces players' ability to detect that the whole mountain range is just one repeating mesh.

<img src="../../../assets/tutorials/core-building-and-scripting/Mountain-Meshes-Stacked.jpg" width="80%" />

<Tabs>
  <TabItem key = "1" label="Apply Your Own Mountains">

To apply the asset library to your mountains:

1. In the **Explorer** window, navigate to the asset library and copy **MountainMesh**.
1. In the **Platforms** folder, paste **MountainMesh** into the **Mountains** folder.
1. In the **Home** tab, use the **Move**, **Scale**, and **Rotate** tools to position, scale, and rotate the mesh along the border of your water terrain.
1. Repeat this process, adding and configuring mountains of different sizes and rotations until the border of your water terrain has cover.

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Mountains-Final.jpg" width="80%" />

  </TabItem>
  <TabItem key = "2" label="Recreate the Sample">

To exactly recreate the mountains within the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience:

1. In the **Explorer** window, navigate to the asset library and copy **MountainMesh**.
2. In the **Platforms** folder, paste **MountainMesh** into the **Mountains** folder.
3. In the **Properties** window,
   1. Set **Size** to **2048, 334, 2048**.
   2. Set **CFrame.Position** to **-1243, 115, -1402**.
   3. Set **CFrame.Orientation** to **0, 46, 0**.
4. Repeat this process, adding and configuring the following mountain assets along the border of your water terrain:

   <table>
   <thead>
   <tr>
   <th>Size</th>
   <th>CFrame.Position</th>
   <th>CFrame.Orientation</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>`2048, 212, 2048`</td>
   <td>`-326, 230, -1614`</td>
   <td>`-15, -155, 0`</td>
   </tr>
   <tr>
   <td>`2048, 416, 1871`</td>
   <td>`434, 160, -1543`</td>
   <td>`0, -2, 0`</td>
   </tr>
   <tr>
   <td>`2048, 400, 2048`</td>
   <td>`1200, 147, -1534`</td>
   <td>`-15, -155, 0`</td>
   </tr>
   <tr>
   <td>`2048, 540, 1488`</td>
   <td>`1726, 220, -1139`</td>
   <td>`0, -95, 0`</td>
   </tr>
   <tr>
   <td>`2044, 442, 2044`</td>
   <td>`2344, 174, -413`</td>
   <td>`0, 5, 0`</td>
   </tr>
   <tr>
   <td>`2048, 458, 2048`</td>
   <td>`2267, 157, 1084`</td>
   <td>`0, -81, 0`</td>
   </tr>
   <tr>
   <td>`2048, 678, 2048`</td>
   <td>`1662, 221, 1804`</td>
   <td>`0, 9, 0`</td>
   </tr>
   <tr>
   <td>`2043, 352, 1467`</td>
   <td>`1025, 147, 2462`</td>
   <td>`0, 54, 0`</td>
   </tr>
   <tr>
   <td>`1980, 531, 1742`</td>
   <td>`361, 180, 2119`</td>
   <td>`0, 21, 0`</td>
   </tr>
   <tr>
   <td>`2048, 415, 2048`</td>
   <td>`-580, 160, 1961`</td>
   <td>`0, -122, 0`</td>
   </tr>
   <tr>
   <td>`2048, 415, 2048`</td>
   <td>`-900, 160, 1652`</td>
   <td>`0, 24, 0`</td>
   </tr>
   <tr>
   <td>`1321, 403, 1321`</td>
   <td>`-1303, 133, 770`</td>
   <td>`0, 55, 0`</td>
   </tr>
   <tr>
   <td>`2048, 335, 2048`</td>
   <td>`-1653, 114, 161`</td>
   <td>`0, -20, 0`</td>
   </tr>
   <tr>
   <td>`2048, 249, 2048`</td>
   <td>`-1928, 79, -674`</td>
   <td>`0, 24, 0`</td>
   </tr>
   <tr>
   <td>`2048, 450, 2048`</td>
   <td>`-1426, 73, -895`</td>
   <td>`0, -20, 0`</td>
   </tr>
   </tbody>
   </table>

   <img src="../../../assets/tutorials/core-building-and-scripting/ApplyAssetLibrary/Mountains-Final.jpg" width="80%" />

  </TabItem>
</Tabs>

## Playtest

After you finish applying your asset library and constructing your environment, you must playtest your experience to ensure any variations in your layout from your polished assets haven't impacted players' ability to finish your game.

To playtest your experience:

1. In the menu bar, click the **Play** button. Studio enters playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Play.png"
   width="800" />

1. Play your experience and try to reach the flare at the top of the stacks.
1. When you're done, navigate back to the menu bar, and click the **Stop** button. Studio exits playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Stop.png"
   width="800" />

Congratulations on completing the Core Curriculum! Now that you have experience creating a simple experience from start to finish, you can extend your project with new gameplay features or additional levels, explore Studio's additional [features](../../../platform.md), or follow additional tutorial curricula, such as the [Environmental Art Curriculum](../../environmental-art/index.md) that teaches you how to create a high-quality laser tag environment. Happy creating!

<Alert severity="info">
We’re interested in hearing from you about your experience following the Core Curriculum. If you have any questions, concerns, or additional feedback on the process, please comment on our [Core Curriculum Q&A](https://devforum.roblox.com/t/feedback-on-core-curriculum/2592219).
</Alert>
