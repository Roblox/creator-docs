---
title: Textures and decals
description: Textures and decals are images you can place on object surfaces.
---

A `Class.Texture` is an image you can place on any face of a [part](../parts/index.md) or [union](./solid-modeling.md) that **repeats** both horizontally and vertically on the size of the surface. In contrast, a `Class.Decal` is an image that **stretches** to fit the area of a part or union's surface. After you
add a `Class.Texture` or `Class.Decal` object to a part or union, you can:

- Change the texture or decal `Class.Decal.Color3|Color3` property to set a color tint using RGB color codes.

- Change the texture or decal `Class.Decal.Transparency|Transparency` property to a value between the default of **0** (fully visible) and **1** (invisible).

- For a texture, set its [scale](#scale-textures) and [offset](#offset-textures).

<Grid container spacing={4}>
<Grid item>
	<figure>
    <img src="../assets/modeling/textures-decals/Decal-Texture-Sample-2.png" alt="An example texture image of a light blue hexagon on top of a dark blue background." width="324" />
		<figcaption>Texture image</figcaption>
  </figure>
</Grid>
<Grid item>
	<figure>
		<img src="../assets/modeling/textures-decals/Texture-On-Surface.jpg" alt="The same blue texture repeated eight times on a block part." width="450" />
		<figcaption>Texture applied to a part (repeating)</figcaption>
	</figure>
</Grid>
</Grid>

<Grid container spacing={4}>
<Grid item>
	<figure>
    <img src="../assets/modeling/textures-decals/Decal-Texture-Sample-1.png" alt="An example decal image of a light purple hexagon on top of a dark purple background." width="324" />
		<figcaption>Texture image</figcaption>
  </figure>
</Grid>
<Grid item>
	<figure>
		<img src="../assets/modeling/textures-decals/Decal-On-Surface.jpg" alt="The same blue texture repeated eight times on a block part." width="450" />
		<figcaption>Texture applied to a part (repeating)</figcaption>
	</figure>
</Grid>
</Grid>

## Create textures or decals

To create a texture or decal, you must add either a `Class.Texture` or `Class.Decal` object to a part or union. You can [import](../projects/assets/manager.md#asset-import) images for textures and decals to Studio for use between experiences, and [distribute](../production/creator-store.md) them to the [Creator Store](../production/creator-store.md). Once you import the image, Studio assigns it a unique asset ID.

<Alert severity="info">
Every texture or decal image that you create and import to Roblox must adhere to the <a href='https://en.help.roblox.com/hc/articles/203313410'>Community Rules</a> and <a href='https://en.help.roblox.com/hc/articles/115004647846'>Terms of Use</a>.
</Alert>

To add a texture or decal to a [part](../parts/index.md) or [union](./solid-modeling.md):

1. In the [Explorer](../studio/explorer.md) window, add a `Class.Texture` or `Class.Decal` to the part or union. An empty texture or decal object displays on the part or union with orange outlining.

2. In the [Properties](../studio/properties.md) window, navigate to the `Class.FaceInstance.Face|Face` property and choose a face (`Enum.NormalId|Top`, `Enum.NormalId|Bottom`, `Enum.NormalId|Front`, `Enum.NormalId|Back`, `Enum.NormalId|Left`, or `Enum.NormalId|Right`).

   - <Chip label="OPTIONAL" size="small" variant="outlined" /> To assist in choosing the correct face, right-click the part/union and select **Show Orientation Indicator**. This displays a circle **🅕**, a blue line attached to the object's front face, and a green arrow that points in the direction of the object's top face.

     <img src="../assets/modeling/textures-decals/Orientation-Indicator.jpg" alt="" width="600" />

3. Select the `Class.Decal.ColorMapContent|ColorMapContent` property and apply an image through any of the following methods:

   - Select any texture or decal you've uploaded previously.
   - Enter an [asset ID](../projects/assets/index.md) into the field.

4. <Chip label="OPTIONAL" size="small" variant="outlined" /> Set a color tint by clicking the small box to the left of the `Class.Decal.Color3|Color3` property or by entering a RGB color code.

   <Grid container spacing={2}>
   <Grid item>
     <img src="../assets/studio/properties/Appearance-Color3-Picker.png" alt="A close of view of the Color3 property with the small color box highlighted." width="320" />
   </Grid>
   <Grid item>
	   <img src="../assets/studio/properties/Appearance-Color3-RGB-Entry.png" alt="A close of view of the Color3 property with the RGB code highlighted." width="320" />
   </Grid>
   </Grid>

   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-On-Surface.jpg" alt="A block part with a repeating blue hexagon texture on its top face." />
       <figcaption>`Class.Decal.Color3|Color3`: [255, 255, 255]</figcaption>
     </figure>
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-Color3-255-0-100.jpg" alt="The same block part with a repeating hexagon texture on its top face, but the hexagons are pink against on dark purple background." />
       <figcaption>`Class.Decal.Color3|Color3`: [255, 0, 100]</figcaption>
     </figure>
   </GridContainer>

5. <Chip label="OPTIONAL" size="small" variant="outlined" /> Set the `Class.Decal.Transparency|Transparency` property to any value between the default of `0` (fully visible) and `1` (invisible).

   <GridContainer numColumns="2">
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-On-Surface.jpg" alt="A block part with a repeating blue hexagon texture on its top face." />
       <figcaption>`Class.Decal.Transparency|Transparency`: 0</figcaption>
     </figure>
     <figure>
       <img src="../assets/modeling/textures-decals/Texture-Transparency-0.4.jpg" alt="The same block part with a repeating hexagon texture on its top face, but the hexagons are semi-transparent." />
       <figcaption>`Class.Decal.Transparency|Transparency`: 0.6</figcaption>
     </figure>
   </GridContainer>

## Customize textures

Unlike decals, **textures** provide further functionality to scale, offset, and animate the source image.

### Scale textures

The size of the part doesn't affect the texture. Instead, scaling a part only increases or decreases the number of times the texture repeats.

The `Class.Texture.StudsPerTileU|StudsPerTileU` and `Class.Texture.StudsPerTileV|StudsPerTileV` properties determine the size of each "tile" in studs. `Class.Texture.StudsPerTileU|StudsPerTileU` determines the texture's horizontal size while `Class.Texture.StudsPerTileV|StudsPerTileV` determines the texture's vertical size.

<Tabs>
<TabItem label="StudsPerTileU & StudsPerTileV = 2">
<img src="../assets/modeling/textures-decals/Texture-Sample-Scale-1.png" alt="Texture on a surface of 8x6 studs with size of each tile in 2x2." width="512" height="384" />
</TabItem>
<TabItem label="StudsPerTileU & StudsPerTileV = 4">
<img src="../assets/modeling/textures-decals/Texture-Sample-Scale-2.png" alt="Texture on a surface of 8x6 studs with size of each tile in 4x4." width="512" height="384" />
</TabItem>
</Tabs>

### Offset textures

If you want more control over a texture's position, offset the texture by adjusting the `Class.Texture.OffsetStudsU|OffsetStudsU` (horizontal) and `Class.Texture.OffsetStudsV|OffsetStudsV` (vertical) properties. This is also helpful for [animation](#animate-textures).

<Tabs>
<TabItem label="OffsetStudsU & OffsetStudsV = 0">
<img src="../assets/modeling/textures-decals/Texture-Sample-Offset-1.png" alt="2x2 texture on a surface of 8x6 studs with no offset." width="512" height="384" />
</TabItem>
<TabItem label="OffsetStudsU & OffsetStudsV = 0.5">
<img src="../assets/modeling/textures-decals/Texture-Sample-Offset-2.png" alt="2x2 texture on a surface of 8x6 studs with offset of 0.5x0.5 studs." width="512" height="384" />
</TabItem>
</Tabs>

### Animate textures

Using `Class.TweenService`, you can tween texture properties like `Class.Texture.OffsetStudsU|OffsetStudsU` and `Class.Texture.StudsPerTileV|StudsPerTileV` to achieve animated surfaces. For example, if you apply two fog textures to one container and animate them with the following script, you can achieve the appearance of a layered moving fog.

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
