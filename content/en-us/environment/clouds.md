---
title: Dynamic Clouds
description: Dynamic Clouds render realistic, customizable clouds that drift slowly across the sky.
---

Roblox's **dynamic clouds** are realistic clouds that drift slowly across the sky. You can adjust their appearance through the `Class.Clouds` object to create unique atmospheres such as stormy skies, stunning sunsets, and alien worlds. You can also customize their direction and speed through [global&nbsp;wind](../environment/global-wind.md).

<video src="../assets/lighting-and-effects/clouds/Showcase.mp4" controls width="100%" alt="Video of wind blowing dynamic clouds across the sky"></video>

## Enabling Clouds

You can manage dynamic clouds in an experience through the `Class.Clouds` object. While you can place this object anywhere for organization or replication purposes, clouds only render if you parent the object under the `Class.Terrain` class.

To enable dynamic clouds:

1. In the [Explorer](../studio/explorer.md) window, hover over **Terrain** and click the &CirclePlus; button. A contextual menu displays.
1. From the menu, insert **Clouds**.

   <img src="../assets/studio/explorer/Terrain-Clouds.png" width="320" alt="Clouds object shown in Explorer window of Studio" />

1. Adjust the appearance of clouds through the new object's [properties](#cloud-properties) and, if desired, set the clouds in motion through [global&nbsp;wind](../environment/global-wind.md).

## Cloud Properties

From the `Class.Clouds` object under `Class.Terrain`, you can adjust the appearance of clouds through the [Properties](../studio/properties.md) window.

### Cover

The `Class.Clouds.Cover|Cover` property controls how much the clouds span across the overall skyscape layer from a value of 0 (sparse cloud cover) to 1 (full cloud cover).

<Tabs>
  <TabItem label="0.65">
    <img src="../assets/lighting-and-effects/clouds/Cover-A.jpg" width="800" height="450" alt="Clouds with Cover value of 0.65" />
  </TabItem>
  <TabItem label="0.8">
    <img src="../assets/lighting-and-effects/clouds/Cover-B.jpg" width="800" height="450" alt="Clouds with Cover value of 0.8" />
  </TabItem>
</Tabs>

### Density

The `Class.Clouds.Density|Density` property controls the intensity of the particles that make up each cloud, mainly affecting their transparency. For example, lower values produce light, semi-translucent clouds, and higher values produce heavy, dark clouds with a stormy appearance.

<Tabs>
  <TabItem label="0.1">
    <img src="../assets/lighting-and-effects/clouds/Density-A.jpg" width="800" height="450" alt="Clouds with Density value of 0.05" />
  </TabItem>
  <TabItem label="0.3">
    <img src="../assets/lighting-and-effects/clouds/Density-B.jpg" width="800" height="450" alt="Clouds with Density value of 0.4" />
  </TabItem>
</Tabs>

### Color

The `Class.Clouds.Color|Color` property controls the material color of cloud particles. It's important to note that several `Class.Lighting` and `Class.Atmosphere` properties also influence cloud color, so if you want to simulate specific atmospheres, experiment with multiple properties until you have the effect you want.

<Tabs>
  <TabItem label="[255, 255, 255]">
    <img src="../assets/lighting-and-effects/clouds/Color-A.jpg" width="800" height="450" alt="Clouds with Color value of [255, 255, 255]" />
  </TabItem>
  <TabItem label="[75, 50, 255]">
    <img src="../assets/lighting-and-effects/clouds/Color-B.jpg" width="800" height="450" alt="Clouds with Color value of [75, 50, 255]" />
  </TabItem>
</Tabs>
