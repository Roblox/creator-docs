---
title: Accessory Fitting Tool
description: The Accessory Fitting Tool lets you adjust and test custom accessory models on different body types, animations, or custom assets.
labels: Article,Engine,Cloud API
---

The **Accessory Fitting Tool (AFT)** is a built-in Studio tool that allows you to test your custom models on multiple combinations of character bodies, animations, and accessories before generating the final `Class.Accessory` object. When testing your accessories, you can make minor fit and positional changes to ensure that you get the best result possible.

The AFT automatically handles the conversion of the custom `Class.Model` or `Class.MeshPart` based on the user menu selections, allowing you to create **layerable clothing accessories** or **rigid accessories**. After generating your accessory, the AFT creates the correct `Class.Accessory` object hierarchy with any updated fit edits, sets the appropriate `AccessoryType` property, and generates any required body attachment points.

<GridContainer numColumns="2">
      <figure>
      <img src="../../assets/accessories/accessory-fitting-tool/Layered-Example.png" />
      <figcaption>Test and edit the cages of your layered clothing assets.</figcaption>
      </figure>
      <figure>
      <img src="../../assets/accessories/accessory-fitting-tool/Rigid-Example.png" />
      <figcaption>Test and edit the orientation and placement of your rigid assets.</figcaption>
      </figure>
</GridContainer>

<Alert severity = 'warning'>
If you are intending to sell your accessory on the Marketplace, make sure your accessory model design adheres to the [Marketplace Requirements](../../art/marketplace/marketplace-policy.md).
</Alert>

## Setting up Accessories

The first stage of the Accessory Fitting Tool allows you to configure the type of accessory to correctly populate the correct fitting tools and generate the appropriate accessory object. When selecting the type of accessory, the following options are available:

- **Clothing**: Layerable accessories that use an inner and outer cage to stretch and wrap around a body and other clothing items.
- **Accessory**: Rigid accessories that attach to a specific attachment point of a character and remain static in that position and orientation.

Before using the tool, ensure that you have the `Class.MeshPart` or `Class.Model` you intend to create into an accessory selectable in your project. As a reference, you can test the AFT using a reference [clothing](../../assets/accessories/reference-files/Additional-FBX-assets.zip) or [rigid accessory](../../assets/accessories/reference-files/Bow-rigid.rbxm) custom model.

To setup your accessories:

1. Ensure that your custom asset is selectable in your project. See [3D Importer](../../art/modeling/3d-importer.md) for instructions on importing a custom model into your experience.
2. In the Avatar tab, select the **Accessory Fitting Tool**. The Accessory Fitting Tool panel displays.

   <img src="../../assets/studio/general/Avatar-Tab-Accessory-Fitting-Tool.png" width="786" />

3. Select the **Part** field and click on the `Class.MeshPart` or `Class.Model` in the viewport that you intend to preview. The text field populates with the name of the object selected.

   <img src="../../assets/accessories/accessory-fitting-tool/MeshPart-Selected.png" />

4. Click **Next**. The Asset Type menu screen displays.
5. Select the correct Asset Type for your accessory. An additional dropdown displays for a specific `AssetType` selection.

   <img src="../../assets/accessories/accessory-fitting-tool/Accessory-Setup-Menu.png" />

6. Use the dropdown to select the specific type of accessory to preview. This sets the correct `AssetType` and attachment points when creating the accessory.

   <img src="../../assets/accessories/accessory-fitting-tool/Asset-Type-Dropdown.png" />

7. Select the expected scaling of an accessory. This only affects rigid accessories if the specific body part has a different `AvatarPartScaleType` `Class.StringValue` object. This does not affect clothing accessories.

   1. **Classic**: Sets the scaling of the accessory to classic R15 proportions.
   2. **Proportions Slender**: Sets the `AvatarPartScaleType` value to `ProportionsSlender`.
   3. **Proportions Normal**: Sets the `AvatarPartScaleType` value to `ProportionsNormal`.

8. Click **Next** to continue. A preview panel and workspace tools display.

   <img src="../../assets/accessories/accessory-fitting-tool/Preview-Display.png" />

## Testing Accessories

After you provide the initial accessory details, the tool displays a preview panel. With the preview panel, you can test how your accessory looks on different combinations of character bodies, clothing items, animations, or even custom assets in your experience.

<Alert severity = 'info'>
At any point of the testing process, you can start a [Play test](../../studio/testing-modes.md#playtest-options) to launch an instance of your experience where your avatar is replaced with the currently selected character body and accessories from the AFT.
</Alert>

If you notice any fitting issues with your accessory, you can use the [Editing](#editing-accessory-fit) tools to make minor adjustments to your accessory.

### With Different Bodies

You can select different bodies to test the fit and wear of your accessories. The AFT supplies several default character models you can use to ensure your accessories fit as expected.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Body-Example-1.png" />
    <figcaption>Bazooka Bones character preview</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Body-Example-2.png" />
    <figcaption>Goblin character preview</figcaption>
  </figure>
</GridContainer>

To test your accessory with a different body:

1. In the tool's catalog, navigate to **Avatars** > **Default**.
2. Click one of the character model tiles. The preview loads with the selected character model.
   1. If two character tiles are selected, click a selected tile to deselect it.
   2. In the character preview, **click** and **drag** to rotate and **right-click** to pan to inspect your character.

### With Different Clothing

You can select different clothing accessories to test the fit and layering of your caged accessories. The AFT supplies several default character models you can use to ensure your accessories fit as expected.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Clothing-Example-1.png" />
    <figcaption>Goblin character preview with reference clothing</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Clothing-Example-2.png" />
    <figcaption>Magma Fiend character preview with reference clothing</figcaption>
  </figure>
</GridContainer>

To test your accessory with a different accessory:

1. In the tool's catalog, navigate to **Clothing** > **Default**.
2. Click one or more of the available catalog items. The character preview loads with the selected clothing accessory.
   1. In the catalog, click an active tile to deselect the asset.
   2. In the character preview, **drag** and **drop** the accessory boxes to change the layer order.
   3. In the character preview, **click** and **drag** to rotate and **right-click** to pan to inspect your character.

### With Animations

You can select different animations to test the movement of your accessory asset. The AFT supplies several default animation assets you can use to ensure your accessories fit as expected when a model is performing various movements.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Animation-Example-1.png" />
    <figcaption>Walking animation reference</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Animation-Example-2.png" />
    <figcaption>Shy emote reference</figcaption>
  </figure>
</GridContainer>

To test your accessory with different animations:

1. In the tool's catalog, navigate to **Animations** > **Default**.
2. Click one of the animation asset tiles.
   1. In the catalog, press the play and pause icon to control the playback.
   2. In the character preview, **click** and **drag** to rotate and **right-click** to pan to inspect your character.

### With Custom Assets

You can add custom character models, clothing accessories, and animations that are part of your workspace to the AFT preview catalog. Use this functionality to verify that your accessory works with any other custom models or accessories they may interact with in your experience.

To add custom assets:

1. Click the ⊕ icon next to the catalog search. A prompt appears, allowing you to choose a supported object.

   <img src="../../assets/accessories/accessory-fitting-tool/Custom-Asset-Icon.png" />

2. Select any `Class.Accessory`, `Class.Model`, `Class.MeshPart`, `Class.Animation` or `Class.Folder` within the Workspace or Explorer. The asset displays in the corresponding **Custom** category.

   1. If no selection is made, click the tool panel again to exit the prompt.

   <img src="../../assets/accessories/accessory-fitting-tool/Custom-Asset.png" />

## Editing Accessory Fit

The Accessory Fitting Tool populates different fitting tools depending on the type of accessory being created.

### Layered Clothing

When editing clothing items, the following tools populate in the viewport:

<table>
<thead>
<tr>
<th>Icon</th>
<th>Description</th>
</tr>
</thead>
<tbody>
  <tr>
    <th><img src="../../assets/accessories/accessory-fitting-tool/Cage-Editing-Icon.png"/></th>
    <th>Toggles the [Cage Editing](#cage-editing) interface in the viewport for making minor inner or outer cage changes to your clothing. </th>
  </tr>

  <tr>
    <td><img src="../../assets/accessories/accessory-fitting-tool/Autoskin-Icon.png"/></td>
    <td>Toggles [auto-skinning](../../art/accessories/automatic-skinning-transfer.md#enabling-automatic-skinning-transfer) between `EnabledPreserved` and `EnabledOverride`. Depending on the asset and skinning quality, auto-skinning may provide better results.<br /><br />EnabledPreserved uses the asset's original skinning data applied in a modeling software. <br />`EnabledOverride` transfers skinning data from the avatar character instead of using the asset's original skinning data.<br /></td>
  </tr>
  <tr>
    <td><img src="../../assets/accessories/accessory-fitting-tool/Expand-Button.png"/></td>
    <td>Displays a button to **Bring Mannequin in View** which centers mannequin in front of the camera.</td>
  </tr>
  <tr>
    <td><img src="../../assets/accessories/accessory-fitting-tool/Center-Mannequin.png" /></td>
    <td>Centers the camera on the mannequin.</td>
  </tr>
</tbody>
</table>

#### Cage Editing

When the Cage Editing interface is enabled, additional tools display in the viewport. The viewport also displays the vertices of the selected cage over the mannequin, allowing you to make positional edits to the cage and change how a clothing item can fit on a body.

   <img src="../../assets/accessories/accessory-fitting-tool/Cage-Editing-Example.png" />

<Alert severity = 'warning'>
You can use these Cage Editing tools for minor to moderate cage edits. If your asset requires major fit or sculpting changes, edit the cage meshes directly in a third-party modeling software, such as Blender or Maya, and import the updated model into Studio.
</Alert>

Use the following cage editing tools to help visualize and edit any cage vertices:

<table>
<thead>
<tr>
<th>Icon</th>
<th>Description</th>
</tr>
</thead>
<tbody>
  <tr>
    <th><img src="../../assets/accessories/accessory-fitting-tool/Cage-Editing-Icon.png"/></th>
    <th>Toggles the selection for the inner and outer cage vertices. When selected, the vertices of that specific cage are available to edit. </th>
  </tr>

  <tr>
    <td><img src="../../assets/accessories/accessory-fitting-tool/Autoskin-Icon.png"/></td>
    <td>**Falloff Distance** sets the radius of influence when editing vertices of the cage mesh. When editing a cage vertex, nearby vertices follow the changes for efficient cage editing. <br /> <br />A higher Falloff Distance applies influence to vertices further away from the origin.</td>

  </tr>
  <tr>
    <td><img src="../../assets/accessories/accessory-fitting-tool/Expand-Button.png"/></td>
    <td>Displays additional buttons: <ul><li>Bring Mannequin in View - centers camera on the mannequin. </li><li>Reset Inner/Outer Cage - resets any changes made to the selected cage.</li></ul></td>
  </tr>
  <tr>
    <td><img src="../../assets/accessories/accessory-fitting-tool/Center-Mannequin.png" /></td>
    <td>Use the slider to set the opacity of the mesh or the cage vertices. Setting the opacity allows you to better see and access certain vertices and angles of your clothing item.</td>
  </tr>

</tbody>
</table>

To make changes to the vertices of the currently selected cage:

1. In the **Avatar** tab's **Snap To Grid** section, disable **Move** snapping. This enables you to make detailed changes to a vertex's position.
2. Select a vertex and use the **Move** tool to reposition. Changes to the cage apply immediately and display in the preview panel.
   1. Use the opacity sliders to better visualize the changes to your cage.
   2. Set the **Falloff Distance** depending on the number of vertices being adjusted at once.
      <img src="../../assets/accessories/accessory-fitting-tool/Edit-Vertex-Example.png" />

### Rigid Accessories

When fitting rigid accessories, a bounding box appears around the mannequin indicating the possible placement of that specific type of accessory. You can position, rotate, and scale objects within this bounding box to ensure your accessory fits on different character models.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Bounding-Box-Example-1.png" />
    <figcaption>Adjust your rigid accessory fit within the bounding box.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Bounding-Box-Example-2.png" />
    <figcaption>If the accessory is outside the appropriate space, the bounding box turns red.</figcaption>
  </figure>
</GridContainer>

## Creating Accessory

You can create the accessory at any time. The tool applies any fit changes and generates the appropriate Accessory instance in the workspace depending on the type of accessory selected and any configurations applied.

When you are ready to generate your accessory:

1. If you are creating a **rigid accessory**, use the dropdown and select **Generate Legacy Accessory**.
2. If you are creating a **layered accessory**, select **Generate MeshPart Accessory**.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/LC-Hierarchy.png" />
    <figcaption>Hierarchy generated for layered clothing.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/accessory-fitting-tool/Rigid-Hierarchy.png" />
    <figcaption>Hierarchy generated for rigid accessories.</figcaption>
  </figure>
</GridContainer>

<Alert severity = 'warning'>
Rigid accessories that you intend to sell on the Marketplace require a `Class.SpecialMesh` and don't support [SurfaceAppearance](../../art/modeling/surface-appearance.md). See [Marketplace requirements](../../art/marketplace/marketplace-policy.md) for additional information.
</Alert>

With an accessory successfully created, you can now try the following:

- Equip the accessory on an avatar-ready character by drag and dropping the accessory on an existing model, or using [HumanoidDescription](../../characters/appearance.md#humanoiddescription).
- Save the accessory as an [avatar asset](../../projects/assets/index.md#for-avatars) for use in an experience later.
- If you meet certain account requirements, you can [upload your asset](../marketplace/publishing-to-marketplace.md) for moderation and start selling it on the Marketplace.
