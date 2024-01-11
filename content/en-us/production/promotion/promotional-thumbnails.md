---
title: Experience Thumbnails
description: Thumbnail images and videos appear at the top of an experience's main page to showcase features and share information.
---

Thumbnails appear at the top of your experience's main page, allowing you to further promote your experience, showcase its features, and announce updates and events. They are the first images and videos users see after clicking on your [experience icon](../../production/publishing/experience-icons.md).

There are two types of thumbnails that you can use to market your experience:

- **Image** &mdash; Supplements the experience icon, such as screenshots of gameplay or slides that demonstrate key details of your experience. Free to upload.

- **Video** &mdash; Links directly to YouTube. Many creators use this type of thumbnail to display trailers. Moderation cost of **500&nbsp;Robux**.

<img src="../../assets/publishing/experience-metadata/Thumbnail-Example.jpg" alt="Example of how thumbnails are displayed to users" />

## Managing Thumbnails

The **Thumbnails** page is where you perform all thumbnail-related tasks, such as [uploading](#uploading), [ordering](#ordering), and [deleting](#deleting) thumbnails.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Click on the experience you want to upload a thumbnail for. The experience's **Overview** page displays.
1. In the left-hand navigation, under **Configure**, select **Places**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Places-No-Icon.png" width="330" alt="Places button indicated for an experience on the Creator Dashboard" />

1. Click the **start place** marked with a star icon (if the experience contains only one place, it will be the only option). The place's **Basic Settings** page displays.

   <img src="../../assets/creator-dashboard/Places-Start-Place-No-Icon.png" width="200" alt="Start place tile indicated in Places display on the Creator Dashboard" />

1. In the place's left-hand navigation menu, select **Thumbnails**.

   <img src="../../assets/creator-dashboard/Place-Nav-Thumbnails.png" width="330" alt="Thumbnails button indicated for a place on the Creator Dashboard" />

### Uploading

You can add up to 10 images or video links per experience from the **Thumbnails** page of the [Creator Dashboard](https://create.roblox.com/dashboard/creations). All uploaded images and linked videos will be moderated to ensure they adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).

<Tabs>
<TabItem label="Images">

When you're creating an image to upload, use a template of **1920×1080 pixels** and export it in `.jpg`, `.gif`, `.png`, `.tga`, or `.bmp` format.

1. Set the media type to **Image** and click the **Upload Image** button. Then, from the file browser, select and confirm the image you want to use as the thumbnail.

   <img src="../../assets/creator-dashboard/Experience-Thumbnail-Media-Type-Image.png" width="400" />

1. **(Optional)** Add an **Alt Text** description of your thumbnail so it's accessible to everyone. The description should be concise and describe your thumbnail accurately enough for players to understand its context.
1. Click the **Save Changes** button at the bottom of the page.

</TabItem>
<TabItem label="Videos">

While you can't directly upload videos to Roblox, you can link to videos you own on YouTube.

<Alert severity="warning">
Xbox doesn't currently support video thumbnails.
</Alert>

1. Set the media type to **Video**.

   <img src="../../assets/creator-dashboard/Experience-Thumbnail-Media-Type-Video.png" width="400" />

1. In the **YouTube URL** field, enter the URL of the video that you want to display as a video thumbnail, then click the **Add Video** button.
1. **(Optional)** Add an **Alt Text** description of the video so it's accessible to everyone. The description should be concise and describe the video's content accurately enough for players to understand its context.
1. Click the **Save Changes** button.

</TabItem>
<TabItem label="Auto-Generated">

Roblox can auto‑generate images from the experience itself to showcase your environment designs. Auto‑generated thumbnails are based on Studio's camera position for the most recent publish of the place.

1. Set the media type to **Auto-generated image** and click the **Add Thumbnail** button.

   <img src="../../assets/creator-dashboard/Experience-Thumbnail-Media-Type-Auto.png" width="400" />

1. **(Optional)** Add an **Alt Text** description of the thumbnail so it's accessible to everyone. The description should be concise and describe the thumbnail accurately enough for players to understand its context.
1. Click the **Save Changes** button at the bottom of the page.

</TabItem>
</Tabs>

### Ordering

If you [upload](#uploading) multiple thumbnails, the experience's main page cycles through them automatically. To change the order of the thumbnail cycle from the **Thumbnails** page:

1. Click and hold a thumbnail's "order" icon and drag it up or down. The other thumbnails move according to the dragged thumbnail's new position.

   <img src="../../assets/creator-dashboard/Experience-Thumbnail-Reorder.png" width="780" />

1. Click the **Save Changes** button.

### Deleting

To delete an [uploaded](#uploading) thumbnail from the **Thumbnails** page:

1. Click the "trash" icon. A popup window displays asking if you'd like to permanently delete the thumbnail.

   <img src="../../assets/creator-dashboard/Experience-Thumbnail-Delete.png" width="780" />

1. Click the **DELETE** button to confirm the action and delete the thumbnail from the queue on the experience's main page.

## Capturing Thumbnails in Free Camera Mode

Free camera mode is a useful tool to capture in-experience screenshots and videos because it allows you to move the camera to positions that aren't possible when testing or playing under normal circumstances. To enable free camera mode:

1. Navigate to an experience where you have server-side developer console access.

2. In the **Home** tab of the menu bar, navigate to the **Test** section and click **Play**.

3. Press <kbd>Left Shift</kbd> and <kbd>P</kbd>.

Once in free camera mode, you can use the following controls:

<table>
<thead>
  <tr>
    <th>Keys/Shortcuts</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></td>
    <td>Moves the camera forward/left/back/right.</td>
  </tr>
  <tr>
    <td><kbd>Q</kbd> <kbd>E</kbd></td>
    <td>Moves the camera down/up.</td>
  </tr>
  <tr>
    <td><kbd>Shift</kbd></td>
    <td>In combination with any movement key, changes the camera speed.</td>
  </tr>
  <tr>
    <td>**Right Mouse Button**</td>
    <td>When pressed, dragging the mouse moves the camera view around.</td>
  </tr>
  <tr>
    <td>**Mouse Scroll Wheel**</td>
    <td>Zooms the camera in or out.</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>G</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>Shift</kbd><kbd>G</kbd> (Mac)</td>
    <td>Disables all `Class.CoreGui|CoreGuis` but not user-created GUIs.</td>
  </tr>
  <tr>
    <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>C</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>Shift</kbd><kbd>C</kbd> (Mac)</td>
    <td>Disables all user-created GUIs but not  `Class.CoreGui|CoreGuis`.</td>
  </tr>
</tbody>
</table>
