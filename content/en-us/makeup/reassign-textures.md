---
title: Reassign textures
description: To import custom makeup, replace the existing textures on the head template with your custom textures.
---

<Alert severity ='warning'>
This feature is currently in beta. Enable it through **File** ⟩ **Beta Features** ⟩ **Avatar Makeup**. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>

To import custom makeup textures, use Blender or Maya to reassign the existing textures on the reference template head to your custom texture images. After replacing the textures, export the entire head model and [import](./import.md) the model into Roblox Studio.

<Alert severity = 'warning'>
The following information is **specific for applying makeup textures to the Roblox provided head reference**, which already has PBR texture nodes assigned. For more information on assigning textures from scratch, see [Assign textures in Blender and Maya](../art/modeling/assign-textures.md).
</Alert>

## Video workflows

The following are video workflows for various tasks in exporting textures from a texture editing tool and reconnecting them in Blender and Maya.

<BaseAccordion>
<AccordionSummary>
<Typography variant="label1">Reassigning textures in Blender</Typography>
</AccordionSummary>
<AccordionDetails>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/B0y5fLlwkF0" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br /><br />

Additional notes:

- In the video, the presenter opts to clear all existing image links by navigating to **File** > **External Data** > **Unpack Resources** and selecting **Remove Pack**.
  - This is a method to unassign all images, equivalent to the [Blender](#blender) reassignment step #5.

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="label1">Reassigning textures in Maya</Typography>
</AccordionSummary>
<AccordionDetails>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/JaX5rcsStvQ" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="label1">Exporting textures from Photoshop</Typography>
</AccordionSummary>
<AccordionDetails>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/0se12PNhVCI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe><br /><br />

Additional notes:

- In the video, the presenter uses **File** > **Export** > **Layers to Files** to export each layer as its own `.png` file.

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="label1">Exporting textures from Substance Painter</Typography>
</AccordionSummary>
<AccordionDetails>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/g79GBh0AcXA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
</AccordionDetails>
</BaseAccordion>

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

1. Select the texture image file you want to use as a replacement.
2. Repeat for all PBR textures that you intend to replace.
3. Delete any texture nodes you are not using.
4.  Verify your final node graph looks similar to the original reference with nothing unintentionally missing.
    <img src="../assets/makeup/resources/Maya-Expected-Nodes.png" width="90%" />
  
<Alert severity ='success'>
After replacing your PBR textures, [export the entire head](../art/modeling/export-requirements.md#maya) and follow instructions to [import into Studio](./import.md).
</Alert>
