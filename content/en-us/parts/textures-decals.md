---
title: Textures and Decals
description: Textures and decals are images you can place on object surfaces.
---

A `Class.Texture` is an image you can place on
any face of a [part](../parts/index.md) or [union](./solid-modeling.md) that
**repeats** both horizontally and vertically on the size of the surface. In contrast, a `Class.Decal` is an image that **stretches**
to fit the area of a part or union's surface. After you
add a `Class.Texture` or
`Class.Decal` object to a part or union, you
can:

- Change the texture or decal `Class.Decal.Color3|Color3` property to
  set a color tint using RGB color codes.

- Change the texture or decal `Class.Decal.Transparency|Transparency`
  property to a value between the default of **0**
  (fully visible) and **1** (invisible).

- For a texture, set its [scale](#scaling-textures) and
  [offset](#offsetting-textures).

  <GridContainer numColumns="2">
    <figure>
      <img src="../assets/modeling/textures-decals/Decal-Texture-Sample-2.png" width="63%" />
      <figcaption>Texture image</figcaption>
    </figure>
    <figure>
      <img src="../assets/modeling/textures-decals/Texture-On-Surface.jpg" />
      <figcaption>Texture applied to a part (repeating)</figcaption>
    </figure>
  </GridContainer>

  <GridContainer numColumns="2">
    <figure>
      <img src="../assets/modeling/textures-decals/Decal-Texture-Sample-1.png" width="63%" />
      <figcaption>Decal image</figcaption>
    </figure>
    <figure>
      <img src="../assets/modeling/textures-decals/Decal-On-Surface.jpg" />
      <figcaption>Decal applied to a part (stretched)</figcaption>
    </figure>
  </GridContainer>

## Creating Textures or Decals

To create a texture or decal, you have to add either a `Class.Texture` or `Class.Decal` object to a part or union. You can [import](../projects/assets/manager.md#importing-assets) images for textures and decals to Studio for use between experiences, and [publish](../production/publishing/publishing-assets.md) them to the [Creator Store](../production/publishing/creator-store.md). Once you import the image, Studio assigns it a unique asset ID.

<Alert severity="info">
  Every texture or decal image that you create and import to Roblox must adhere to the <a href='https://en.help.roblox.com/hc/articles/203313410'>Community Rules</a> and <a href='https://en.help.roblox.com/hc/articles/115004647846'>Terms of Use</a>.
</Alert>

To add a texture or decal to a part or union:

1. In the [Explorer](../studio/explorer.md) window, add a `Class.Texture` or `Class.Decal` to the part or union:

   1. Hover over the part or union and click the &CirclePlus; button. A contextual menu displays.

   2. From the menu, insert a **Texture** or **Decal**. An empty texture or decal object displays on the part or union with orange outlining.

2. In the [Properties](../studio/properties.md) window, navigate to the **Face** property and [choose a face](#choosing-a-face) or keep the default face.

3. Select the **Texture** property and apply an image through any of the following methods:

   - Select any texture or decal you've uploaded previously.
   - Enter an asset ID into the **Texture** field.
   - Upload a new image through the **Add Image...** button.

4. **(Optional)** Set a color tint by clicking the small box to the left of the **Color3** property or by entering a RGB color code.

   <img src="../assets/modeling/textures-decals/Properties-Color3-Picker.png" width="320" />
   <img src="../assets/modeling/textures-decals/Properties-Color3-RGB-Entry.png" width="320" />
   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-On-Surface.jpg" />
       <figcaption>Default</figcaption>
     </figure>
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-Color3-255-0-100.jpg" />
       <figcaption>Color3 = [255, 0, 100]</figcaption>
     </figure>
   </GridContainer>

5. **(Optional)** Set the **Transparency** property to any value between the default value of 0 (fully visible) and 1 (invisible).

   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-On-Surface.jpg" />
       <figcaption>Default</figcaption>
     </figure>
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-Transparency-0.4.jpg" />
       <figcaption>Transparency = 0.6</figcaption>
     </figure>
   </GridContainer>

### Choosing a Face

A **face** is a surface on a part/union that displays a texture or decal: **Top**, **Bottom**, **Front**, **Back**, **Left**, or **Right**. The direction of each face depends on the part or union's orientation. In the following example images, the camera faces the block's **Front** face, so the block's **Left** face is on the right from the camera's perspective.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/textures-decals/Texture-Face-Front.jpg" />
    <figcaption>Front</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/textures-decals/Texture-Face-Top.jpg" />
    <figcaption>Top</figcaption>
  </figure>
</GridContainer>

To choose a face:

1. **(Optional)** To assist in choosing the correct face, right-click the part/union and select **Show Orientation Indicator**. This displays a blue circle with an **F** and a line attached to the object's **Front** face, and a green arrow that points in the direction of the object's **Top** face.

   <img src="../assets/modeling/textures-decals/Orientation-Indicator.jpg" width="600" />

2. Select a texture or decal that is a child of the part or union.

3. In the **Properties** window, click the **Face** property and choose a face.

## Customizing Textures

Unlike decals, textures provide further functionality to scale, offset, and animate an image.

### Scaling Textures

The size of the part doesn't affect the texture. Instead, scaling a part only increases or decreases the number of times the texture repeats.

The `Class.Texture.StudsPerTileU|StudsPerTileU` and `Class.Texture.StudsPerTileV|StudsPerTileV` properties determine the size of each "tile" in studs. `Class.Texture.StudsPerTileU|StudsPerTileU` determines the texture's horizontal size while `Class.Texture.StudsPerTileV|StudsPerTileV` determines the texture's vertical size.

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/modeling/textures-decals/Decal-Texture-Sample-2.png" />
    <figcaption>Texture Image</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/textures-decals/Texture-Sample-UV-1.png" />
    <figcaption>Surface of 8&times;6 Studs</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/textures-decals/Texture-Sample-UV-2.png" />
    <figcaption>Surface of 8&times;6 Studs</figcaption>
  </figure>
</GridContainer>

To scale a texture:

1. Select a texture that is a child of a part.

2. In the **Properties** window, set **StudsPerTileU** and **StudsPerTileV** to the number of studs you'd like the texture to occupy horizontally and vertically. The larger the number, the larger the image.

### Offsetting Textures

If you want more control over a texture's position, offset the texture by adjusting the `Class.Texture.OffsetStudsU|OffsetStudsU` and `Class.Texture.OffsetStudsV|OffsetStudsV` properties. This is also helpful for [animation](#animating-textures).

<GridContainer numColumns="3">
  <figure>
    <img src="../assets/modeling/textures-decals/Decal-Texture-Sample-2.png" />
    <figcaption>Texture Image</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/textures-decals/Texture-Sample-Offset-1.png" />
    <figcaption>Surface of 8&times;6 Studs</figcaption>
  </figure>
  <figure>
    <img src="../assets/modeling/textures-decals/Texture-Sample-Offset-2.png" />
    <figcaption>Surface of 8&times;6 Studs</figcaption>
  </figure>
</GridContainer>

To offset a texture:

1. Select a texture that is a child of a part.

2. In the **Properties** window, set **OffsetStudsU** and **OffsetStudsV** to the number of studs you'd like to offset the texture horizontally and vertically.

### Animating Textures

Using `Class.TweenService`, you can tween texture properties like `Class.Texture.OffsetStudsU|OffsetStudsU` and `Class.Texture.StudsPerTileV|StudsPerTileV` to achieve animated surfaces. For example, if you apply two fog textures to one container and animate them with the following script, you can achieve the appearance of a layered moving fog:

<figure>
  <video src="../assets/modeling/textures-decals/Animated-Textures.mp4" controls width="80%"></video>
  <figcaption>Two animated textures near the floor to simulate a moving fog effect</figcaption>
</figure>

```lua
local TweenService = game:GetService("TweenService")

local texture1 = script.Parent.Texture1
local texture2 = script.Parent.Texture2

local tweenInfo1 = TweenInfo.new(8, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1)
local tween1 = TweenService:Create(texture1, tweenInfo1, {OffsetStudsV=50})
local tweenInfo2 = TweenInfo.new(7, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)
local tween2 = TweenService:Create(texture2, tweenInfo2, {OffsetStudsU=50, StudsPerTileU=55, StudsPerTileV=45})

tween1:Play()
tween2:Play()
```
