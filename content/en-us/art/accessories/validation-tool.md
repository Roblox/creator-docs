---
title: Clothing Validation Tool
description: The Layered Clothing Validation Tool checks for common clothing creation issues in Blender or Maya before exporting.
---

The **Layered Clothing Validation Tool** is a supplemental tool you can install in either [Blender](https://www.blender.org/download/releases/3-0/) or [Maya](https://www.autodesk.com/products/maya/overview) to help quickly identify and fix common issues with layered clothing assets before you export them.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/validation-tool/Blender-Validation-Tool.png" width="80%" />
    <figcaption>Blender Validation Tool</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/validation-tool/Maya-Validation-Tool-Opened.png" width="80%" />
    <figcaption>Maya Validation Tool</figcaption>
  </figure>
</GridContainer>

While this tool can save you time in the typical iteration process between your 3D modeling program and Studio, the tool doesn't provide comprehensive verification of all aspects of layered clothing assets. You must ensure your layered clothing model meets both the [general mesh requirements](../../art/modeling/specifications.md) and Roblox-specific [layered clothing requirements](../../art/accessories/specifications.md#layered-requirements) prior to importing it into Studio.

## Installing the Validation Tool

There are two separate installation files and instructions for Blender and Maya.

<Alert severity="info">
The Layered Clothing Validation Tool is designed for both [Blender 3.0](https://www.blender.org/download/releases/3-0/) and [Maya 2022](https://www.autodesk.com/products/maya/overview). You can download and modify the tool for any use.
</Alert>

### Blender

To install the Clothing Validation Tool in Blender:

1. Download [ValidationTool_Blender.zip](../../assets/accessories/validation-tool/ValidationTool_Blender.zip) and save the `.zip` file locally.
2. In Blender, navigate to **Edit** > **Preferences**.
3. In Preferences, go to the **Add-Ons** section on the left side-bar.

   <img src="../../assets/accessories/validation-tool/Blender-Add-On-Preferences.png" width="70%" />

4. Click the **Install...** button. A file browser displays.
5. Select the downloaded `.zip` file and click **Install Add-On**.
6. In the **Add-Ons section**, find the **Validation Tool** and **enable the add-on**.

   <img src="../../assets/accessories/validation-tool/Blender-Enable-Add-On.png" width="70%" />

7. Return to your workspace and **expand the side toolbar** in the Viewport to access the add-on.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../assets/accessories/validation-tool/Blender-Sidebar-Indicator.png" />
       <figcaption>Sidebar indicator</figcaption>
     </figure>
     <figure>
       <img src="../../assets/accessories/validation-tool/Blender-Validation-Tool-Opened.png" width="48%" />
       <figcaption>Expanded sidebar</figcaption>
     </figure>
   </GridContainer>

### Maya

Before you begin the process of installing the Validation Tool in Maya, you must install [Python 3.0](https://www.python.org/downloads/) or higher. If you already have Python installed, you can proceed to installing the Validation Tool.

To install Python 3.0+ on your device:

1. Download the appropriate installer from the official [Python website](https://www.python.org/downloads/).
2. Open the installer and follow the installation instructions.

   - Enable **Add Python ### to PATH** before selecting **Install Now**.

     <img src="../../assets/accessories/validation-tool/Maya-Install-Python-Settings.png" width="60%" />

To install the Clothing Validation Tool in Maya:

1. Download [ValidationTool_Maya.zip](../../assets/accessories/validation-tool/ValidationTool_Maya.zip) and unzip the content in a local directory.
2. Open the contents of the `.zip` file in a file browser.

   - If on Windows, **double-click** `install.bat`. This runs a batch script that enables you to quickly run the Validation Tool in Maya.
   - If on Mac, **right-click** the `install.command` file and select **Open With** > **Terminal**. This runs a terminal script that enables you to quickly run the Validation Tool in Maya.

     <img src="../../assets/accessories/validation-tool/Mac-Right-Click-Install.png" width="40%" />

   <Alert severity="warning">
   If on Mac, you may need to adjust the read/write permissions for the `install.command` file to run successfully. This step requires administrator access.

   To allow the `install.command` file to have full read and write access:

   1. Open **terminal** and use the `cd` command to navigate to the directory of the saved `install.command` file.
   2. Type the command `chmod 777 install.command` and press **Enter**. This should enable all read and write privileges for this file.

   </Alert>

3. When prompted, type your Maya version and press **Enter**. For example, if using Maya 2020, input **2020** as your version.
   <img src="../../assets/accessories/validation-tool/Maya-Install-Prompt-1.png" width="70%" />

4. When installation is successful, the following message displays:
   <img src="../../assets/accessories/validation-tool/Maya-Command-Prompt-Success.png" width="60%" />

5. Open Maya and navigate to **Windows** > **General Editors** > **Script Editor**.
   <img src="../../assets/accessories/validation-tool/Maya-Script-Editor-Menu.png" width="60%" />
6. When using the plugin for the first time, in the Script Editor, type `import ValidationTool` then press the **Play** button in the top bar of the Script Editor. The plugin UI displays.
   <img src="../../assets/accessories/validation-tool/Maya-Script-Editor.png" width="60%" />

   - When using the plugin after the initial launch, launch the plugin by typing `ValidationTool.validationTool()` and clicking the **Play** button.
   - Alternatively, you can set up a shortcut from the plugin UI after initial launch by clicking the **Create shortcut button on Maya shelf** button.

     <img src="../../assets/accessories/validation-tool/Maya-Shortcut.png" width="40%" />

## Validating Assets

With the plugin active and a layered asset in your workspace, you can begin validating content. After the check, results with issues change to **red** (Blender) or **yellow** (Maya). You can resolve some failed checks by clicking the check button. See [Checks and Troubleshooting Steps](#checks-and-troubleshooting-steps) for details on each validation check.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/accessories/validation-tool/Blender-Failed-Check-Example.png" width="81%" />
    <figcaption>Checks without issues display as grey (Blender) or green (Maya).</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/validation-tool/Blender-Failed-Check-Viewport.png" />
    <figcaption>In this example, potential intersection issues are highlighted in the Viewport.</figcaption>
  </figure>
</GridContainer>

To use the Validation Tool on your asset:

1. **Select** the object in your scene.
2. Open the Validation Tool and click **Check Assets**. After a few moments, the UI updates and produces an output message.
3. Results with issues are highlighted with red or yellow. Some issues can be automatically corrected by clicking the highlighted button.

<Alert severity="info">
This Validation Tool only checks for common clothing creation issues. Ensure your layered clothing model meets both the [general mesh specifications](../../art/modeling/specifications.md) and Roblox-specific [layered clothing specifications](../../art/accessories/specifications.md#layered-requirements) before uploading to Studio.
</Alert>

## Checks and Troubleshooting Steps

Refer to the table below for details on the specific checks and troubleshooting steps:

<dl>
<dt>**Layers**</dt>
<dd>Checks for extra layers in the scene. Automatic fix attempts to remove extra layers. <p />If the automatic fix fails, manually remove extra layers.</dd><p />

<dt>**Transforms**</dt>
<dd>Checks that geometry location, rotation, and scale are frozen (`0`,`0`,`0`). Automatic fix attempts to freeze the transforms. This may cause changes to your rig. <p />If the automatic fix fails, manually freeze your geometry.</dd><p />

<dt>**Unused Material**</dt>
<dd>Checks for any unused data in the scene, such as [orphan data](https://docs.blender.org/manual/en/latest/editors/outliner/interface.html?highlight=orphan) (Blender) or [construction history](https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2022/ENU/Maya-Basics/files/GUID-503E227B-EF49-4A78-B3CA-7EAC588017C9-htm.html) (Maya), or unused materials. Automatic fix attempts to remove extra data.  <p />If automatic fix fails, manually remove unnecessary data and objects.</dd><p />

<dt>**Keyframes**</dt>
<dd>Checks for any unnecessary keyframes. Automatic fix attempts to remove keyframes.<p /> If automatic fix fails, manually remove keyframe data.</dd><p />

<dt>**Attachment Points**</dt>
<dd>Checks that attachment points are present and use the correct naming convention. Automatic fix attempts to parent any unexpected attachment points.</dd><p />

<dt>**Intersection**</dt>
<dd>Checks for any intersection between character geometry and the inner/outer cage mesh geometry. In Blender, clicking the button switches to **Edit Mode** and highlights vertices that are intersecting the inner or outer mesh. <p />Some edges, such as edges of the holes for the sleeves, neck and torso edges, may be highlighted by default behavior and can be ignored.</dd><p />

<dt>**Texture Format**</dt>
<dd>Checks that textures match texture requirements, such as resolution size. Users can also select an external image file. Refer to the output messages to manually resolve any texture related issues.</dd>
</dl>
