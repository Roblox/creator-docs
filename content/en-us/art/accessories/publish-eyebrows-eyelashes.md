---
title: Publish bodies with eyelashes and eyebrows
description: Eyelashes and eyebrows are optional accessory items you can equip to an avatar to publish in the Marketplace.
---

Eyelashes and eyebrows are cosmetics that can help emphasize facial features and create a unique way of customizing a character. Similar to clothing, eyelashes and eyebrows are [3D layered clothing](../../art/accessories/layered-clothing.md) that can stretch and fit over different face shapes and can deform and stretch with character face animations.

<GridContainer numColumns="3">
<figure>
<img src="../../assets/art/accessories/Nature-Girl-No-Accessories.png"/>
<figcaption>Character body without eyelashes and eyebrows</figcaption>
</figure>
<figure>
<img src="../../assets/art/accessories/Nature-Girl-With-Face-Accessories.png"/>
<figcaption>Character body with eyelashes and eyebrows</figcaption>
</figure>
<figure>
<img src="../../assets/art/accessories/Eyebrows-Eyelashes-Only.png"/>
<figcaption>Standalone eyelashes and eyebrows</figcaption>
</figure>
</GridContainer>

When publishing eyelashes and eyebrows, you must parent these `Class.Accessory` objects under the avatar character's `Class.Model` prior to uploading the character `Model` to the Marketplace. These `Accessory` face objects must adhere to Roblox's accessory requirements and include layered components such as caging, rigging, and skinning components. For an overview on creating your own eyelashes and eyebrows, see [Create face accessories](../../art/characters/facial-animation/create-face-accessories.md).

<Alert severity = 'warning'>
At this time, you can only bundle **eyelashes**, **eyebrows**, and **hair** with your body on Marketplace upload. Other facial accessories, such as horns, makeup, glitter, or other cosmetics are not acceptable. See [Marketplace policy](../../marketplace/marketplace-policy.md) for specific information on allowable cosmetics and other policy regulations and guidelines.
</Alert>

## Configure eyelash and eyebrow accessories

Use the following steps to import your face accessory and body assets into Studio. After converting the eyelashes and eyebrows to `Accessory` objects, parent the `Accessory` objects within the character `Model` before uploading the character to the Marketplace.

You can download reference `.fbx` models of [eyelashes](../../assets/art/reference-files/Eyelashes.fbx), [eyebrows](../../assets/art/reference-files/Eyebrows.fbx), and an [avatar body](../../assets/art/reference-files/AnimeFemale-Studio-Ready.fbx) to follow along this process.

1. In the [3D Importer](../../art/modeling/3d-importer.md), import the `.fbx` files of your face accessory and body. The eyelashes, eyebrows, and body each populate in your Workspace as a `Model`.
   1. If you are using the reference body, set **Rig General** > **Rig Type** to **Rthro**.
2. Use the [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) and select the **Eyelash** or **Eyebrow** model and click **Next**.

   <img src="../../assets/art/accessories/AFT-Eyebrows-Example.png"/>

3. Select the appropriate **Accessory** > **Eyelash** or **Accessory** > **Eyebrow** asset type and click **Next**.
4. (Optional) Preview the fit of your face accessory.
   1. If the face accessory was modeled on a specific character body, you may want to import that character body into Studio and use it as a mannequin in the fitting tool's preview. See [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) for more information on adding custom characters.
   2. If using the provided reference body, you can continue to step 5.
5. Click **Generate MeshPart Accessory** to create your MeshPart.
6. **Repeat steps 2-5** for the other face accessory.
7. In the Outliner, **drag and drop** the face `Accessory` objects within the character `Model` instance. The accessories automatically equip and attach to the correct areas of your avatar character.

   <GridContainer numColumns="2">
   <figure>
   <img src="../../assets/art/accessories/Anime-Girl-Eyebrows-Example.png"/>
   <figcaption>Workspace preview of body with face accessories</figcaption>
   </figure>
   <figure>
   <img src="../../assets/art/accessories/Face-Accessory-Hierarchy.png"/>
   <figcaption>Outliner hierarchy</figcaption>
   </figure>
   </GridContainer>

8. If required, rename the accessory objects to `EyelashAccessory` or `EyebrowAccessory` accordingly.

9. Once you are ready to upload the avatar model with your face accessories, see [Upload an asset](../../marketplace/publish-to-marketplace.md#upload-an-asset) for instructions on uploading and publishing your avatar body with eyelashes and eyebrows to the Marketplace.
