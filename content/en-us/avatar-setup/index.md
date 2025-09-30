---
title: Avatar Setup
description: The Avatar Setup tool previews animations, clothing, accessories, and body constructs on avatar rigs, directly in Studio.
---

The **Avatar Setup** tool helps accelerate the avatar character, clothing, and accessory creation process by automatically processing custom models into avatar assets:

1. **Input a model** you intend to convert to an avatar model. If the model doesn't include [properly configured avatar components](../art/characters/index.md#components-of-an-avatar), the tool **automatically** adds them.
2. **Preview the avatar character model** with different animation, clothes, skin, facial poses, and more.
3. **Upload and publish** your avatar creations to the Marketplace directly from the setup tool.

<img src="../assets/studio/general/Toolbar-Avatar-Setup.png" width="800" alt="Avatar Preview button indicated in Avatar tab" />

<GridContainer numColumns="2">
<figure>
    <img src="../assets/avatar/avatar-setup/Avatar-Setup-Example-A.png" />
    <figcaption>Import a complete or incomplete avatar character into the tool. The auto-setup feature adds any missing components.</figcaption>
</figure>
<figure>
    <img src="../assets/avatar/avatar-setup/Avatar-Setup-Example-B.png" />
    <figcaption>You can try out various skin tones, animations, rigid and layered clothing, and more before uploading and selling the avatar asset.</figcaption>
</figure>
</GridContainer>

## Auto-setup

If the **Avatar Setup** tool detects that the input model is an incomplete avatar model, the **auto-setup** feature attempts to complete the avatar model with all the advanced components that allow characters to interact with the world and express themselves.

Auto-setup can perform the following on a submitted humanoid-shaped model:

- **Rigging** — Adds an R15 armature to your body model to enable movement and animation.
- **Skinning** — Adds weights and influences to various surfaces of your mesh, ensuring an organic and natural flexibility during movement.
- **Facial animation** — Generates the FACS poses, facial rigging, skinning, and animation data required for facial animation and avatar chat.
- **Caging** — Adds the outer cage mesh to your avatar, enabling it to wear layered clothing.
- **Partitioning** — Separates the body mesh into the appropriate R15 parts.
- **Creating attachments** — Adds the appropriate attachment points enabling the character to wear rigid accessories.

<Alert severity = 'warning'>
Auto-setup has specific model requirements and accepts certain configurations of models. For more information, see [Auto-setup requirements](./auto-setup-requirements.md).
</Alert>

## How to use

The **Avatar Setup** tool allows you to input an existing model or import a custom asset from outside Studio.

If your model does not include all the components of an avatar model, the tool attempts to automatically add them to your model. To ensure the best results and prevent errors or unexpected behavior, make sure your model meets [Auto-setup requirements](./auto-setup-requirements.md).

### Import a model

If you are using a custom 3D asset, import your asset into Studio using the 3D importer tool. To import the model into Studio:

1. From Studio's **File** menu, select **3D Importer**.
2. In the file browser, select your model object.
3. When your model object loads in the 3D Import preview, disable the **Upload To Roblox** option.
   1. This prevents the asset immediately saving to your **Toolbox**, preventing unwanted copies of similar assets.
   2. To save time in the future, click the **&ctdot;** dropdown in the top-right of the 3D Importer window and **Save as New** to create an import profile for this workflow.
4. Verify the preview and any warnings or errors in your model object.
   1. See [3D Importer](../art/modeling/3d-importer.md) for additional information. Certain warnings and errors may require readjusting the model in a third-party software.
5. Select **Import** to add the `Class.Model` instance into your workspace.

   <Alert severity = 'warning'>
   When a new model is imported, it's also added to the moderation queue. If an avatar asset is moderated incorrectly, you will receive a moderation email with a link to appeal. This appeal takes up to 10 minutes to resolve.
   </Alert>

### Run Avatar Setup

When your project has the appropriate `Class.Model` in your workspace, you can begin the avatar setup process.

1. Select the model in the workspace.
   1. If you want to select only specific meshes of your model, navigate to the **Explorer**, expand the `Class.Model` object, and hold shift and click on the individual mesh objects.
2. With the model selected, navigate to the **Avatar** tab and click **Setup**.
3. In the **Avatar Setup** panel, click the blue **Set Up Avatar** button. If your model requires [auto-setup](#auto-setup), this process can take several minutes.
   <img src="../assets/avatar/avatar-setup/Auto-Setup-Start.png" alt=""/>

4. Once complete, a `Class.Model` of your avatar populates in your workspace. Review any warnings or errors before using any testing or editing tools.

   1. If the body scale falls outside of the [Marketplace ranges](../art/characters/specifications.md#body-scale), the tool rescales the body to match requirements.
   2. Auto-setup highlights individual body parts that are not passing validation. You can use the scale tool in Studio to try to fix these validation errors. If the body part proportions fall outside of the supported range in Roblox, you may need to use third-party software to rescale the specific body parts.

   <img src="../assets/avatar/avatar-setup/Auto-Setup-Scaling.png" alt=""/>

### Test and edit

After successfully loading a character model into the tool, the character populates in the preview window with various testing, editing, and preview tools. If you discover any issues that can't be resolved with the edit tools, you may need to update your base input model in your third-party modeling software and/or retry the auto-setup process.

For more information on the various testing interfaces and editing features, see [Test and Edit Tools](./tools.md).

<Alert severity = 'warning'>
It's important to test that your avatar components have correctly generated by testing out different clothing, rigid accessories, and animations.
</Alert>

### Publish

The **Publish** button opens the publish asset dialog, with an option to upload the avatar and any accessory items to the Marketplace

When selecting the Publish option, you can upload the asset to the Marketplace, where you can sell the item paying an [upload fee](../marketplace/publish-to-marketplace.md#upload-an-asset), clearing moderation, and publishing the asset to the catalog.

For additional resources on the publishing process and Marketplace, see the following:

- [Publish to the Marketplace](../marketplace/publish-to-marketplace.md)
- [Marketplace fees and commissions](../marketplace/marketplace-fees-and-commissions.md)
- [Marketplace policy](../marketplace/marketplace-policy.md)
