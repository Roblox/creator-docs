---
title: Reassign Textures
description: To import custom makeup, replace the existing textures on the head template with your custom textures.
---

To import custom makeup textures, use Blender or Maya to reassign the existing textures on the reference template head to your custom texture images. After replacing the textures, export the entire head model and [import](./import.md) the model into Roblox Studio.

<Alert severity = 'warning'>
The following information is **specific for applying makeup textures to the Roblox provided head reference**, which already has PBR texture nodes assigned. For more information on assigning textures from scratch, see [Assign textures in Blender and Maya](../art/modeling/assign-textures.md).
</Alert>

## Blender

1. Unzip and open the [Blender reference head file](../assets/makeup/resources/Makeup-Reference-Blender.zip).
2. Switch to the Shading tab.
3. In the Outliner, expand the Makeup collection and select the face region you intend to replace textures for.
    <img src="../assets/makeup/resources/Blender-Select-Region.png" width="40%" />
4. In the node graph, select the texture image you intend to update, such as `Neutral_FaceDecal_ALB.png`
5. Click the **X** to remove the existing image assignment.
    <img src="../assets/makeup/resources/Blender-Unlink-Image.png" width="40%" />
6. Click the folder icon to browse for a new image.
    <img src="../assets/makeup/resources/Blender-Assign-New.png" width="40%" />
7. Repeat for all PBR textures that you intend to replace.
8. Delete any texture nodes you are not using.
9.  Verify your final node graph looks similar to the original reference with nothing unintentionally missing.
    <img src="../assets/makeup/resources/Blender-Expected-Nodes.png" width="90%" />

<Alert severity ='success'>
After replacing your PBR textures, [export the entire head](../art/modeling/export-requirements.md#blender) and follow instructions to [import into Studio](./import.md).
</Alert>

## Maya

1. Unzip and open the Maya [reference head file](../assets/makeup/resources/Makeup-Reference-Maya.zip).
2. In the Status Line near the top of the default layout, click on the Hypershade icon.
   <img src="../assets/makeup/resources/Maya-Select-Hypershade.png" width="65%" />
3. Move your mouse over the material's texture you intend to replace.
4. Click and hold right mouse-click and drag the selector to **Graph Network**.
  
   <img src="../assets/makeup/resources/Maya-Select-Graph-Network.png" width="65%" />

5. In the newly displayed node graph, click on the Texture Node you intend to replace, such as `Neutral_Eyes_ALB.png`.
6. In the right Property Editor, navigate to Image Name and click the folder icon. A file browser displays.
  <img src="../assets/makeup/resources/Maya-Replace-Texture.png" width="90%" />
7. Select the texture image file you want to use as a replacement.
8. Repeat for all PBR textures that you intend to replace.
9. Delete any texture nodes you are not using.
10. Verify your final node graph looks similar to the original reference with nothing unintentionally missing.
    <img src="../assets/makeup/resources/Maya-Expected-Nodes.png" width="90%" />
  
<Alert severity ='success'>
After replacing your PBR textures, [export the entire head](../art/modeling/export-requirements.md#maya) and follow instructions to [import into Studio](./import.md).
</Alert>
