---
title: Blender validation tool
description: The Avatar Validation Tool checks for common character model issues in Blender.
---

The **Avatar Validation Tool** is a supplemental Blender add-on you can use to quickly identify common issues with your character model. This tool checks that your model meets most of Roblox's avatar [technical specifications](../../art/characters/specifications.md) and, when possible, attempts to automatically resolve them.

<img src="../../assets/art/avatar/Validation-Tool-Preview.png" width="100%" />

This tool can save you time by checking for common validation specifications before you export your model, but it doesn't provide a comprehensive verification of all aspects of your character model. You should always continually test your character model, including testing your characters [in Studio](../../art/characters/testing/studio.md) and verifying on your own if your model meets Roblox's [character specifications](../../art/characters/specifications.md).

## Install

<Alert severity = 'warning'>
The Validation Tool plugin is compatible with Blender 3.5.1+. You may experience unexpected behavior if using earlier versions of Blender.
</Alert>

To install the Validation Tool in Blender:

1. Download [ValidationTool_Blender.zip](../../assets/art/ValidationTool_V2.zip) and save the .zip file locally. Do not open the .zip file.
2. In Blender, navigate to **Edit** > **Preferences**.
3. In Preferences, go to the **Add-Ons** section on the left sidebar.

   <img src="../../assets/accessories/validation-tool/Blender-Add-On-Preferences.png" width="80%" />

4. Click the **Install...** button. A file browser displays.
5. Select the downloaded .zip file and click **Install Add-On**.
6. In the Add-Ons section, find the Validation Tool and **enable** the add-on.

   <img src="../../assets/accessories/validation-tool/Blender-Add-On-Preferences.png" width="80%" />

7. Return to your workspace and expand the side toolbar in the Viewport to access the add-on.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/validation-tool/Blender-Add-On-Preferences.png" width="80%" />
    <figcaption>Sidebar indicator</figcaption>
  </figure>
  <figure>
    <img src="../../assets/art/avatar/Validation-Tool.png" width="80%" />
    <figcaption>Expanded sidebar</figcaption>
  </figure>
</GridContainer>

## Validate

After installing the plugin, you can begin validating your character models. When validating, results with issues display as red. In some cases, you can apply an automatic fix to checks that have issues. See [Checks and Troubleshooting Steps](#checks-and-troubleshooting) for details on each validation check.

To use the validation tool on your asset:

1. In the Target Armature field, select the **eyedropper**.
2. With the eyedropper active, select your character's **armature object**. This object is often named Joints or Armature.
3. Select **Run All Checks** to go through each individual check. Alternatively, you can click individual buttons to run a specific check.
4. Checks that detect issues display as red and an error output displays at the bottom of the tool.

   <video controls src="../../assets/art/avatar/Validation-Tool-Test.mp4" width="100%"></video>

<Alert severity = 'info'>
This validation tool only checks for common validation issues. You should always continually test your character model, including testing your characters [in Studio](../../art/characters/testing/studio.md) and verifying on your own if your model meets Roblox's [character specifications](../../art/characters/specifications.md).
</Alert>

## Checks and troubleshooting

Each button on the validation tool performs a different check against the expected [character specifications](../../art/characters/specifications.md). The following are the specific types of verification each check performs, as well as general troubleshooting steps to resolve discovered issues:

<dl>
<dt>**Layers**</dt>
<dd>Checks for extra layers in the scene. Automatic fix attempts to remove extra layers. <p />If the automatic fix fails, manually remove extra layers.</dd><p />

<dt>**Transforms**</dt>
<dd>Checks that geometry location, rotation, and scale are frozen (`0`,`0`,`0`). Automatic fix button attempts to freeze the transforms. This may cause changes to your rig. <p />If the automatic fix fails, manually freeze your geometry.</dd><p />

<dt>**UV**</dt>
<dd>Checks if the body Geometry UVs are within `0`-`1`. You must resolve issues manually by setting  your body object UVs within a `0`-`1` range.</dd><p />

<dt>**Cage UV Modifications**</dt>
<dd>Checks if cage object UVs have incorrect modifications. Automatic fix attempts to resolve UV coordinates.  <p />If automatic fix fails, you may want to use a new template cage.</dd><p />

<dt>**Asset Size**</dt>
<dd>Checks if the character total size and individual parts are within expected bounds. You must resolve issues manually by resizing your character model or individual parts.</dd><p />

<dt>**Unused Data**</dt>
<dd>Checks for any unused data in the scene, such as orphan data, or unused materials. Automatic fix attempts to remove extra data.  <p />If automatic fix fails, manually remove unnecessary data and objects.</dd><p />

<dt>**Keyframes**</dt>
<dd>Checks for any unnecessary keyframes. Keyframes related to facial expressions are expected and ignored. Automatic fix attempts to remove keyframes associated with non-face objects. <p /> If automatic fix fails, manually remove keyframe data from non-face objects. Do not delete keyframes that also contain facial data.</dd><p />

<dt>**Attachment Points**</dt>
<dd>Checks that attachment points are parented to the armature and use the correct naming convention. Automatic fix attempts to parent any unexpected attachment points.</dd><p />

<dt>**Joint Positions**</dt>
<dd> Checks for the following:
<ul><li>Root and HumanoidRootNode bones exist</li>
<li>Root bone is at `0`,`0`,`0` world space</li>
<li>Bones with Left/Right naming conventions are on correct axes.</li></ul> Refer to the output messages to manually resolve joint position issues.</dd><p />

<dt>**FACS Data**</dt>
<dd>Checks for the following FACs data:
<ul><li>`Neutral Pose` exists as a mapped pose</li>
<li>Mapped Custom Properties under the Head_Geo exists</li>
<li>Property name and values correctly set</li>
<li>Corrective poses must include existing base poses </li>
<li>Corrective poses do not use more than 3 base poses Refer to the output messages to manually resolve FACS data issues.</li></ul></dd><p />

<dt>**Head Joint Names**</dt>
<dd>Checks for duplicate head bone names, including duplicates with Blender's duplicate affixes .001, .002, .003, and such. Refer to the output messages to manually resolve face joint names.</dd><p />

<dt>**Intersection**</dt>
<dd>Checks for any intersection between character geometry and cage mesh geometry. The tool switches to Edit mode and highlights areas where potential intersections are detected.</dd><p />

<dt>**Polygon Data**</dt>
<dd>Checks for common polygon issues:<ul>
<li>Meshes are watertight</li>
<li>Meshes are within polycount budgets</li>
<li>Meshes don't use N-Gons Meshes</li>
<li>Meshes are non-manifold</li>
<li>Meshes don't have vertex color information</li></ul><p />Refer to the output messages to manually resolve any polygon data issues.</dd><p />

<dt>**Texture Format**</dt>
<dd>Checks that textures match texture requirements, such as resolution size. Users can also select an external image file. Refer to the output messages to manually resolve any texture related issues.</dd>
</dl>
