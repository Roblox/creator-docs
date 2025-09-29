---
title: Custom thumbnails
description: Explains how to create your own custom thumbnail for marketplace items.
---

Thumbnail images provide a preview of the 3D asset in the [Marketplace](https://www.roblox.com/catalog), user inventories, and avatar editors. Before [uploading an asset to the Marketplace](../marketplace/publish-to-marketplace.md), you can create your own thumbnails to customize the exact look and feel of your item preview thumbnails. This step is optional, but can help ensure that the thumbnail accurately portrays your item.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/publishing/marketplace/Thumbnail-Example-A.png" width="100%" />
    <figcaption>
      <Alert severity="error">The default thumbnail may not correctly represent your item.</Alert>
    </figcaption>
  </figure>
  <figure>
    <img src="../assets/publishing/marketplace/Thumbnail-Example-B.png" width="100%" />
    <figcaption>
      <Alert severity="success">A custom thumbnail can create a more accurate preview.</Alert>
    </figcaption>
  </figure>
</GridContainer>

### Create thumbnails

You must create thumbnails before [publishing your asset on the Marketplace](../marketplace/publish-to-marketplace.md). You can quickly create these thumbnail configuration instances with the [Custom Thumbnail Tool](https://www.roblox.com/library/11628621048/UGC-Custom-Thumbnail-Tool). Roblox stores custom thumbnail information in a child `ThumbnailConfiguration` object that parents a `CameraTarget` and `CameraValue`.

   <img src="../assets/publishing/marketplace/Thumbnail-Configuration-Example.png" width="300" />

To use the Custom Thumbnail Tool:

1. Install the [Custom Thumbnail Tool plugin](https://www.roblox.com/library/11628621048/UGC-Custom-Thumbnail-Tool). This may require restarting Studio.
2. In the **Explorer** window, select the `Class.Accessory` you intend to create a thumbnail for.
3. With the `Class.Accessory` highlighted in the **Explorer** window, navigate to the **Plugins** tab and click the **UGC Thumbnail Tool**. The viewport display updates and centers on the selected accessory in the workspace.
4. Adjust the viewport to center on your accessory. Use the following controls to help navigate the camera:

   - <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> to pan the camera.
   - Hold **right-click** to rotate the camera.
   - Hold **middle-click** to pan the camera.
   - Hold <kbd>Shift</kbd> for fine adjustment.

5. When complete, click **Accept** to generate the thumbnail configuration objects.
6. You can preview the thumbnail by right-clicking the accessory in the **Explorer** window and selecting **Save To Roblox…**. The **Asset Configuration** window appears and displays the current thumbnail.

If your thumbnail does not look correct, **repeat steps 2-5** to overwrite the existing thumbnail data.

<Alert severity = 'warning'>
Once you upload an asset, you can't modify or change an asset's thumbnail.
</Alert>

### Troubleshooting thumbnails

If your thumbnails don't look the way you expect, you might need to manually resolve these issues or attempt to use the Custom Thumbnail tool again. See the following for common issues and fixes:

<table>
<thead>
  <tr>
    <th>Issue</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Incorrect Thumbnail Zoom</td>
    <td>The scale of the thumbnail depends on the `Handle` size of the `Class.Accessory`. For the best thumbnail, make sure your `Handle` covers the entire item. <br /><br />When changing the size of the `Handle` object, adjust the `Size` property instead of using the resize tool. The resize tool can cause other unintended changes to the item.<br /><br /> You can resolve this issue by using the [Custom Thumbnail Tool](https://www.roblox.com/library/11628621048/UGC-Custom-Thumbnail-Tool).</td>
  </tr>
  <tr>
    <td>Backward Thumbnails</td>
    <td>When importing meshes, Studio may change the orientation of the custom model by 180°. To resolve this, you can rotate your mesh 180° in your third party modeling tool, such as Blender or Maya, and then re-import the 3D model into Studio. <br /><br />Regardless of import orientation, Studio equips the `Class.Accessory` on a character with the same fit and attachment.</td>
  </tr>
</tbody>
</table>
