---
title: Using Studio's 3D Importer
description: Use Studio's 3D importer to import a third-party 3D model into Studio.
next: /art/accessories/creating-rigid/converting
prev: /art/accessories/creating-rigid/exporting
---

<video controls src="../../../assets/art/accessories/creating-rigid/Importing.mp4" width="100%"></video>

Studio's 3D Importer provides a quick and easy way to import third-party 3D `.fbx` or `.gltf` assets into your projects. The importer provides object previews and error-checking to ensure that your asset meets Studio's general 3D requirements.

<br />

To import your asset ([downloadable reference](../../../assets/art/accessories/creating-rigid/Chest-Texturing-Complete.fbx)):

1. In Studio, navigate to the **Avatar tab** and select the **3D Importer**.
2. In the file browser, select the `.fbx` file saved locally. The 3D Importer loads a preview of the object.
   1. If textures don't load for your asset, continue to the next step and add textures manually later.
3. Select **Import**.
   1. The asset populates in your workspace as a `Class.Model` that contains a `Class.MeshPart` with the appropriate textures applied as a `Class.MeshPart.TextureID`.
   2. If textures were not imported correctly, follow the instructions below to add the file manually.

<BaseAccordion>
<AccordionSummary>Adding textures manually</AccordionSummary>
<AccordionDetails>

If textures didn't load correctly, add them manually with the Asset Manager.

1.  Open the Asset Manager. You may need to save and publish your experience before accessing your assets.
2.  In the Asset Manager, select the **Bulk Import** button.

    <img src="../../../assets/studio/asset-manager/Import-Button.png" width = "60%"/>

3.  Upload your image file.
4.  After moderation clears for your image, select the `Class.MeshPart` parented within your imported `Class.Model`.
5.  In the TextureID property, select the value field and add the assetID of the texture image.

</AccordionDetails>
</BaseAccordion>
<br />

<Alert severity = 'success'>
After successful import, your model object should populate in your project as a `Class.Model` with the appropriate textures applied. See [3D Importer](../../../art/modeling/3d-importer.md) for additional information on import settings and troubleshooting.
</Alert>
