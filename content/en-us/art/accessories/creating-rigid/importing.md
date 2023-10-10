---
title: Importing
description: Covers the steps to import rigid accessory models and associated textures from a .fbx file.
next: /art/accessories/creating-rigid/converting
prev: /art/accessories/creating-rigid/exporting
---

Studio's 3D Importer provides a quick and easy way to import third-party 3D assets into your projects. The importer provides object previews and error-checking to ensure that your asset meets Studio's general 3D requirements.

To import your asset:

1. In Studio, navigate to the **Avatar tab** and select the **3D Importer**.
2. In the file browser, select the `.fbx` file saved locally. The 3D Importer loads a preview of the object.

   1. If textures don't load for your asset, you can manually import your textures in Step 4.

      <img src="../../../assets/art/accessories/creating-rigid/3D-Importer.png" />

3. Select **Import**. The asset populates in your workspace as a `Class.Model` with the appropriate textures applied as a `Class.SurfaceAppearance`.
4. If textures didn't load correctly, add them manually:

   1. Open the Asset Manager. You may need to save and publish your experience before accessing your assets.
   2. In the Asset Manager, and select the **Bulk Import** button.

      <img src="../../../assets/studio/asset-manager/Import-Button.png" width = "60%"/>

   3. Upload your image files.
   4. After moderation clears for your image, select the `Class.MeshPart` parented within your imported `Class.Model`.
   5. Add a `Class.SurfaceAppearance` child to your `Class.MeshPart`.

      <img src="../../../assets/art/accessories/creating-rigid/Adding-Surface-Appearance.png" />

   6. In the `Class.SurfaceAppearance` properties, click each property value and assign the appropriate texture image from the asset dropdown:

      1. Set the **ColorMap** to the **\_ALB** texture image.
      2. Set the **MetalnessMap** to the **\_MTL** texture image.
      3. Set the **NormalMap** to the **\_NOR** texture image.
      4. Set the **RoughnessMap** to the **\_RGH** texture image.

         <img src="../../../assets/art/accessories/creating-rigid/Surface-Appearance-Asset-Dropdown.png" />

<Alert severity = 'success'>
After successful import, your model object should populate in your project as a `Class.Model` with the appropriate textures applied. See [3D Importer](../../../art/modeling/3d-importer.md) for additional information on import settings and troubleshooting.
</Alert>
