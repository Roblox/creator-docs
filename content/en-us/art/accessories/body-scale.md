---
title: Body Scale and Proportions
description: Avatars come in 3 different standard sizes, Classic, Rthro, Rthro Slender.
---

Roblox supports three common avatar sizes, known as **Classic**, **Rthro**, and **Rthro Slender**. This standard sizing helps keep avatar characters consistent, allowing developers to create experiences and environments that can fit commonly sized character models.

When modeling rigid accessories, like a helmet that contours around a character's head, it's important to use a mannequin to help ensure your proportions fit. The asset provided in this tutorial example was originally modeled using **Rthro** proportions. Layered accessories, such as clothing, don't require body scale specification, since layered assets automatically stretch and deform over any body scale.

If you are modeling your asset, visit the [References resources](../../avatar/resources.md#references) to download any of the following mesh mannequin:

<GridContainer numColumns="3">
<figure>
    <img src="../../assets/art/resources/Body-Scale-Classic.png" />
<figcaption>
Classic blocky body scale. <br /><br /> Roughly 4.75 studs tall.
</figcaption>
</figure>
<figure>
    <img src="../../assets/art/resources/Body-Scale-Rthro-Normal.png" />
<figcaption>
Normal body scale. <br /><br /> Roughly 5.75-6.5 studs tall, with wider shoulders and narrower hips.
</figcaption>
</figure>
<figure>
    <img src="../../assets/art/resources/Body-Scale-Rthro-Slender.png" />
<figcaption>
Slender body scale. <br /><br /> Roughly 5.25-6.25 studs tall, with narrower shoulders and wider hips.
</figcaption>
</figure>
</GridContainer>

See [Accessory Specifications](../../art/accessories/specifications.md#body-scale) and [Body Specifications](../../art/characters/specifications.md#body-scale) for specific range values and other geometry requirements.

## AvatarPartScaleType

Roblox represents body scale in the engine by an `AvatarPartScaleType` `Class.StringValue` object within each avatar character part and associated accessory. In most cases, asset creators do not need to directly access or modify this value object since tools, such as the [Accessory Fitting Tool](../accessories/accessory-fitting-tool.md), automatically generate the appropriate value object on accessory creation.

In cases where you may need to identify the current body scale of a body part or accessory, the following table defines the `AvatarPartScaleType` value for each type of body size.

<table>
<thead>
  <tr>
    <th>Body Scale</th>
    <th>AvatarPartScaleType value</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Classic</td>
    <td>`Classic`</td>
  </tr>
  <tr>
    <td>Normal</td>
    <td>`ProportionsNormal`</td>
  </tr>
  <tr>
    <td>Slender</td>
    <td>`ProportionsSlender`</td>
  </tr>
</tbody>
</table>
