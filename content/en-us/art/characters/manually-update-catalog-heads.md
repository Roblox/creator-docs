---
title: Manually Update Catalog Heads
description: Instructions for creators who need to re-upload their head for validation.
---

<Alert severity = 'warning'>
The following content applies to **creators with head assets on the Marketplace** who received a notice that their head assets **no longer pass dynamic head validation.**
</Alert>

<Alert severity = 'info'>
This document is intended to be updated frequently to include the latest information to help guide you through the head update process.
</Alert>

If your head asset no longer passes the dynamic head validation, you need to fix and reupload your head asset to the Marketplace. **You do not need to update the body when the head was published as part of a body bundle**. You just need to update the head asset.

This guide provides detailed information on how to perform a manual fix by re-caging your asset using a provided cage template using the following 5 main steps:

1. [Re-validate](#1-verify-the-catalog-head-asset-fails-validation) your catalog head asset to confirm issues.
2. [Export your head](#2-export-your-head-from-roblox) (or body bundle) from Roblox as a glTF.
3. [Fix your Head](#3-fix-your-head-asset-in-blender) asset in Blender.
4. [Import](#4-import-your-fixed-head-back-into-studio) your fixed head back into Studio.
5. [Provide the asset ID](#5-provide-the-assetid-of-your-updated-head) of your updated head to Roblox.

<Alert severity = 'info'>
While these instructions are provided for Blender, it's possible to perform equivalent steps in your preferred 3D modeling software. It's recommended to familiarize yourself with Roblox's head validation process before making changes to your head assets.
</Alert>

## 1. Verify the catalog head asset fails validation

Roblox recently updated the dynamic head validation parameters to allow more existing catalog heads to pass validation while still enforcing that all heads in the catalog are dynamic. It's important to double check that your head still fails validation before proceeding with the rest of the steps.

1. Open a new Roblox Studio and verify you have the beta feature **glTF Export** enabled (you might need to restart Studio to pick up the new setting)
   1. Verify your beta settings in **File** > **Beta Features**.
2. Run the following script in the command bar.
   1. You have the option to provide either the head id (asset ID) or the bundle id (for a full body bundle) . Just replace `my_asset_id` with the correct ID and remove the leading `--` to run
   2. Uncomment `createExportFromHeadAssetId(your_asset_id)` to retrieve only the head asset
   3. Uncomment `createExportFromBodyBundleId(your_bundle_id)` to retrieve the full body as a bundle (includes the head)

    ```lua
    local AssetService = game:GetService("AssetService")
    local Players = game:GetService("Players")

    local function createExportFromHeadAssetId(assetId: number)
      local hd = Instance.new("HumanoidDescription")
      hd.Head = assetId
      
      local char = Players:CreateHumanoidModelFromDescriptionAsync(hd, Enum.HumanoidRigType.R15)
      local headMesh = char.Head :: MeshPart
      headMesh.Size = headMesh.MeshSize
      headMesh.CFrame = CFrame.identity
      headMesh.Locked = false

      local exportModel = Instance.new("Model", workspace)
      exportModel.Name = "ExportThisAsGLTF"
      headMesh.Parent = exportModel
    end

    local function getOutfitId(bundleInfo)
      for _, item in pairs(bundleInfo.Items) do
        if item.Type == "UserOutfit" then
          return item.Id
        end
      end
      error("Could not find outfit ID")
    end
    local function createExportFromBodyBundleId(bundleId: number)
      local bundleInfo = AssetService:GetBundleDetailsAsync(bundleId)
      local outfitId = getOutfitId(bundleInfo)
      local hd = Players:GetHumanoidDescriptionFromOutfitIdAsync(outfitId)
      local char = Players:CreateHumanoidModelFromDescriptionAsync(hd, Enum.HumanoidRigType.R15)
      char:PivotTo(CFrame.identity)
      char.Name = "ExportThisAsGLTF"
      char.Parent = workspace
    end

    -- createExportFromHeadAssetId(your_asset_id)
    -- createExportFromBodyBundleId(your_bundle_id)
    ```

3. Once the script runs, you will see a "ExportThisAsGLTF" model in workspace. Right-click and select **Save To Roblox**. This will popup the publish window:
   1. In Content type, select **Avatar Item**.
   2. In Asset Category, select **Head or Body** (if you used a body bundle).
      1. Wait for the validation result.
   3. If the dynamic head validation passes then you don't have to update this asset.
   4. **Cancel** the publish operation (so you don't incur fees).

If your asset failed the dynamic head validation then you need to continue with the following steps.

## 2. Export Your Head from Roblox

Export your head or entire body from Blender as a glTF file:

1. In the explorer, right-click on the "ExportThisAsGLTF" model and select **Save/Export** > **Save as glTF**.

## 3. Fix your Head asset in Blender

Fix your asset in Blender, or preferred 3D modeling software. In many cases, you may save time using a brand new head cage and fitting the cage over your character head. You may also see other validation issues that need to be addressed from the first step.

1. In Blender, open a new empty scene and import the glTF file.
2. Ensure everything you need for the head is present, including the cage, attachment points, facial joints and facial animations.
3. Roblox Studio flips avatars by 180 degrees on import, so you need to rotate your asset back by 180 in Blender (Hotkeys: <kbd>R</kbd>+<kbd>Z</kbd> then type `180`).
4. Most often heads fail validation due to cage issues. For example, the cage may be completely inside the head, has incorrect UVs or looks completely misplaced in the model. In most cases we recommend you do not spend time editing the original cage and instead:
   1. Delete it from the asset.
   2. Select the cage from the head template in this folder that best matches the shape of your head asset. These are [Roblox provided templates for cages with the correct UV settings](../../assets/art/reference-files/HeadCages.zip).
   <img src="../../assets/art/avatar/Cage-Template-Lineup.png"/>

5. Ensure the Blender animation start value is set to 0.
6. Remove vertex colors. In Blender this can be done by clicking on the mesh and then under the data tab selecting color attributes and removing any that exist.
   <img src="../../assets/art/avatar/Delete-Vertex-Colors.png"/>
7. Modify your head asset to pass validation:
   1. Align cage eyes and mouth regions to the head.
   2. Ensure your head includes a rig, with poses keyframed and mapped to the FACs standard so that:
         1.  Eyes must blink.
         2.  Mouth must open and close.
         3.  Face must express happy and sad.
8.  Export your updated head asset to FBX file format using the correct settings explained here (If you have PBR, you may want to use glTF).
    1.  Setup textures for FBX export (if needed). Blender will import the glTF textures in such a way that they won't be able to be exported in an FBX file by default.
        1.  To fix this go through each image and save it to your disk locally.
   <img src="../../assets/art/avatar/Blender-Save-Image-Workaround.png"/>

## 4. Import your fixed head back into Studio

Import your head back into Studio and verify that it passes validation. If validation fails, check the error messages and address the issues in your 3D modeling software again. If validation passes, use the following steps to upload as a **Development Item** (not Avatar item).

1. Import the FBX/glTF file with your (fixed) head asset back into Studio.
2. Make sure your head asset passes validation.
   1. The easiest way to accomplish this is:
      1. Select **Save to Roblox** on your asset.
      2. Select **Avatar Item**.
      3. Set its **Asset Category** to Head.
      4. Wait for the Dynamic Head validation result (pass or fail).
      5. **Cancel** the save operation so you don't incur publishing fees at this time.
   2. If your head doesn't pass validation then you need to go back to Blender, Maya and make the appropriate fixes to pass validation.
3.  If your head passes validation, publish your asset as a Development Item.
    1.  Select **Save to Roblox** on your asset.
    2.  Select **Development Item**.
    3.  Set its **Asset Category** to Model.
    4.  Save the model to Roblox (no publishing fees are incurred).
        1.  Get the asset ID of the head asset (not the body bundle).

## 5. Provide the assetID of your updated head

Use the following steps to provide Roblox the updated asset ID to replace your head with:

1. Use the link to the web form in the email notification corresponding to your asset to communicate back the asset ID of your updated head.
   1. You will be asked to enter your date of birth for each update. This is a legal requirement we can't bypass.
   2. You can submit multiple times. We will use your last submission as the "final" version to the update.
2. Roblox will complete the update of your catalog asset with the modifications you provided.

## Additional Resources

Roblox has published a series of documentation and video tutorials on best practices for creating dynamic head assets.

- [Dynamic head overview](./facial-animation/)
- [Head validation process](./head-validation.md)
- [Avatar Auto-Setup](../../avatar-setup/auto-setup.md)
- [Caging Best Practices](../accessories/caging-best-practices.md)
