---
title: Backgrounds
description: Backgrounds are images that display behind an avatar on a user's profile and in the 3D avatar viewer.
---

**Backgrounds** for avatars are 2D assets that display behind an avatar on different surfaces throughout Roblox. When users purchase backgrounds on the [Marketplace](https://www.roblox.com/catalog), they can immediately equip them so that the backgrounds are visible on their web profile and in the 3D avatar viewer.

You can create a background using any 2D editing software, such as [Procreate](https://procreate.com/) or [GNU Image Manipulation Program](https://www.gimp.org/) (GIMP). After you verify that the image meets Roblox's [technical background specifications](./specifications.md) that guarantee your backgrounds behave consistently in the 3D viewer and web profiles, you can upload the image in the [Creator Hub](https://create.roblox.com/dashboard/creations) to process it into an avatar asset that's ready to be sold on the Marketplace.

<img src="../../assets/avatar/backgrounds/Backgrounds-Examples.png" width="100%" alt="" />

## How a background displays

Backgrounds display differently depending on if a user is looking at the background from the 3D viewer or a profile page. While the following subsections detail the differences between these two views, it's important to optimize your image for the 3D viewer because backgrounds that work well for the 3D space still display correctly as a flat image on profile pages.

### 3D viewer

Roblox projects the image onto a **cyclorama**, which is a curved plane behind an avatar. The curve hides the seam between the wall and the floor, in the same way a photo studio backdrop does. The avatar renders in 3D, standing in front of the cyclorama. As the camera moves, different parts of the image come into view.

To demonstrate this concept, review the following images of how a cat avatar displays as the camera moves closer to the cyclorama. When the camera is far away, the whole background is visible, but when the camera zooms in closer, only a small view of the background is visible.

<img src="../../assets/avatar/backgrounds/Cyclorama.png" width="100%" alt="" />
<img src="../../assets/avatar/backgrounds/Cyclorama-2.png" width="100%" alt="" />

### Profile pages

The web profile page displays the image as a flat picture behind the avatar thumbnail. It has no 3D scene and no camera, so the image appears closer to the file you exported. The avatar thumbnail still covers the center of the frame, so keep important content in the safe area.

<img src="../../assets/avatar/backgrounds/Web-profile.png" width="100%" alt="" />

## Template zones

The 2D template for backgrounds has four zones and a horizon line. As you create backgrounds, it's important to review each zone and how it treats details so that your image is crisp and displays according to your creative vision.

<table>
<thead>
  <tr>
    <th><b>Zone</b></th>
    <th><b>Where it sits</b></th>
    <th><b>Guidance</b></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Transparent area</td>
    <td>Outer edge of the image</td>
    <td>Roblox applies an alpha fade in this region so the background blends into surrounding UI. Leave it free of important details, and export the image without a fade of your own.</td>
  </tr>
  <tr>
    <td>Safe area</td>
    <td>Center of the image, including the horizon</td>
    <td>Put important content here. This region stays visible at every camera position, and the cyclorama curve preserves its shape.</td>
  </tr>
  <tr>
    <td>Distortion area</td>
    <td>Foreground floor and the outer regions the curve bends</td>
    <td>Use ground texture and gradients. The cyclorama foreshortens this region, so detailed subjects lose their shape.</td>
  </tr>
  <tr>
    <td>Avatar location</td>
    <td>Lower center</td>
    <td>The avatar stands here. Keep the floor under the avatar clear.</td>
  </tr>
  <tr>
    <td>Horizon line</td>
    <td>Boundary between the floor and the far background</td>
    <td>Keep tall objects above this line, in the far background.</td>
  </tr>
</tbody>
</table>

<figure>
<img src="../../assets/avatar/backgrounds/Template-Zones.png" width="100%" alt="Background template with a faded transparent edge, a green safe area, red distortion areas, a horizon line, and the avatar at the lower center." />
</figure>

In addition, consider the following best practice guidance:

- Place tall elements, such as trees and buildings, in the far background.
- Give the avatar a clear floor to stand on.
- Keep important content in the center of the image, and keep foreground elements low in the composition.
- Keep tall objects from crossing the horizon line.

## Creation process

To create a background for avatars:

1. Review the previous [template zones](#template-zones) as you decide on your design, and reference all [file specifications](./specifications.md).
1. Create the image using your favorite 2D editing software, such as Procreate or GIMP.
1. Export a flattened file in the sRGB color space that meets the specifications.
1. [Upload](#upload-backgrounds) the background in the Creator Hub.
1. [Publish](#publish-backgrounds) the background for others to purchase on the Marketplace.

## Upload backgrounds

To upload backgrounds, you must have a [Roblox Plus](https://www.roblox.com/plus) account, verify your account through your own [government ID](../../production/publishing/account-verification.md#verify-through-government-id) or a linked [parental account](https://about.roblox.com/parental-controls) with government ID verification, and have 200 Robux for the upload fee. There is an upload limit of 1 background per day.

To upload a background for avatars:

1. In the left-hand navigation of the Creator Hub, navigate to Avatar items. The **Avatar items** page displays.
1. In the horizontal navigation, navigate to **Backgrounds**, then click the **Create background** button. The page updates with new UI options.
1. Click the **Upload** button, then select your 2560 x 1440 image.
1. Fill in the **Name** and **Description** fields.
1. Click the **Create** button, then accept the 200 Robux fee.

<img src="../../assets/avatar/backgrounds/Create-UI.png" width="100%" alt="Create background page with an image preview, name and description fields, a 200 Robux upload fee, and Create and Cancel buttons." />

## Publish backgrounds

Similarly, to publish backgrounds, you must have a [Roblox Plus](https://www.roblox.com/plus) account, verify your account through your own [government ID](../../production/publishing/account-verification.md#verify-through-government-id) or a linked [parental account](https://about.roblox.com/parental-controls) with government ID verification, and have at least 2000 Robux for the publishing advance fee.

For commissions and the standard publishing flow, see [Marketplace fees and commissions](../../marketplace/marketplace-fees-and-commissions.md) and [Publish to Marketplace - Publish an asset](../../marketplace/publish-to-marketplace.md#publish-an-asset).

<Alert severity="info">
Backgrounds support standard publishing options, including [Limited items](../../marketplace/publish-to-marketplace.md#item-attributes).
</Alert>
