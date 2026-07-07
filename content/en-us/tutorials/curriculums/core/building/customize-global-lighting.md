---
title: Customize global lighting
description: Explains how to use global lighting settings to refine the look and feel of your game.
prev: /tutorials/curriculums/core/building/create-basic-visual-effects
next: /tutorials/curriculums/core/building/apply-polished-assets
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/VtsWu2G0ZiM?si=TZDy2jahPoWpCBnr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br/>

**Global lighting** controls the overall look and atmosphere of your game. By adjusting a few properties on the `Class.Lighting` service, you can change the color, shadows, time of day, and atmospheric effects of a scene.

In this section, you'll update the lighting to match the [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) sample.

<Alert severity="info">
Lighting is mostly configured through property values, making it a great fit for Assistant. After applying the prompt, spend some time in the viewport adjusting **Ambient**, **ClockTime**, and **Density** until the scene looks the way you want. For an overview of every lighting object Studio offers, see [Lighting and effects](../../../../environment/index.md).
</Alert>

## Set lighting properties

The `Class.Lighting` service controls how light behaves in your game. The sample game adjusts properties such as ambient color, lighting technology, shadow settings, and sun position to create a cooler ocean palette, sharper shadows, and stronger directional lighting.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Customize global lighting"
On the Lighting service, set the following properties:
- Ambient: Color3.fromRGB(16, 16, 16)
- ColorShift_Top: Color3.fromRGB(196, 222, 255)
- OutdoorAmbient: Color3.fromRGB(134, 158, 190)
- ShadowSoftness: 0
- LightingStyle: Realistic
- ClockTime: 9
- GeographicLatitude: 78
```

After it runs, the world picks up a cooler blue-grey tone, shadows get hard edges, and the sun shifts to mid-morning over to the right of your sea stacks.

</TabItem>

<TabItem key = "2" label="Build it Yourself">

In the **Properties** window of **Lighting**:

1. **Tint the ambient and reflective light.** `Class.Lighting.Ambient` colors light in shaded areas (like the inside of your tunnel), `Class.Lighting.OutdoorAmbient` colors light where the sky is visible, and `Class.Lighting.ColorShift_Top` tints surfaces facing the sun. Together they pull the whole world toward a cool blue-grey ocean tone.

   1. Set **Ambient** to `16, 16, 16`.
   2. Set **ColorShift_Top** to `196, 222, 255`.
   3. Set **OutdoorAmbient** to `134, 158, 190`.

   <div><b>A comparison between the sample Island Jump game's default and custom ambient lighting</b></div>
   <GridContainer numColumns="2">
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Default-Color.jpg" alt="The sample Island Jump game with default ambient lighting visuals." />
       <figcaption>Default Properties</figcaption>
     </figure>
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-Color.jpg" alt="The sample Island Jump game with custom ambient lighting visuals." />
       <figcaption>Custom Properties</figcaption>
     </figure>
   </GridContainer>

2. **Switch to realistic lighting.** Studio defaults to `Enum.LightingStyle|Soft`, which produces a flatter look. Set **LightingStyle** to `Enum.LightingStyle|Realistic` so local light sources cast precise shadows and illumination. Your flare will start dropping a real shadow on the platform beneath it.

   <GridContainer numColumns="2">
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/LightingStyle-Soft.jpg" alt="The sample Island Jump game with Soft lighting style." />
       <figcaption>`Enum.LightingStyle|Soft`</figcaption>
     </figure>
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/LightingStyle-Realistic.jpg" alt="The sample Island Jump game with Realistic lighting produces more prominent lighting from the flare."/>
       <figcaption>`Enum.LightingStyle|Realistic`</figcaption>
     </figure>
   </GridContainer>

3. **Harden shadows.** Set **ShadowSoftness** to `0` to give shadows crisp edges. This makes the moment players step from outside into the tunnel feel more dramatic.

   <GridContainer numColumns="2">
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Default-Shadows.jpg" alt="The sample Island Jump game with default shadow visuals that produce fuzzy shadows." />
       <figcaption>Default Shadows</figcaption>
     </figure>
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-Shadows.jpg" alt="The sample Island Jump game with custom shadow visuals that produce sharp shadows."/>
       <figcaption>Custom Shadows</figcaption>
     </figure>
   </GridContainer>

4. **Move the sun.** `Class.Lighting.ClockTime|ClockTime` is the time of day on a 0-24 hour scale, and `Class.Lighting.GeographicLatitude|GeographicLatitude` rotates the world to position the sun at a different angle. The values below drop the sun toward the right of the sea stacks for longer, more directional shadows.

   1. Set **ClockTime** to `9`.
   2. Set **GeographicLatitude** to `78`.

   <Alert severity="info">
   **ClockTime** and **TimeOfDay** are linked. Changing one updates the other, so you only need to set one.
   </Alert>

   <GridContainer numColumns="2">
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Default-SunPosition.jpg" alt="The sample Island Jump game with the default sun position high in the sky."/>
       <figcaption>Default sun position</figcaption>
     </figure>
     <figure>
       <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-SunPosition.jpg" alt="The sample Island Jump game with a custom sun position approaching the horizon." />
       <figcaption>Custom sun position</figcaption>
     </figure>
   </GridContainer>

</TabItem>
</Tabs>

For an overview of the rest of the `Class.Lighting` properties, see [Global lighting](../../../../environment/lighting.md).

## Atmosphere properties

The `Class.Atmosphere` object is a child of the `Class.Lighting` service. It adds depth by simulating particles in the air and blending distant scenery into the sky. The two most important properties are `Density`, which controls the thickness of the atmosphere, and `Offset`, which controls where that blending begins.

<Tabs>
<TabItem key = "1" label="Build with Assistant">

```text title="Thicken the atmosphere"
On the Atmosphere object inside the Lighting service, set:
- Density: 0.375
- Offset: 0.17
```

</TabItem>
<TabItem key = "2" label="Build it Yourself">

1. In the **Explorer**, expand the **Lighting** service and select its child **Atmosphere** object. In the **Properties** window:

    1. Set **Density** to `0.375` to thicken the air. This obscures the edge of your water terrain, so players don't see where the world ends.

      <GridContainer numColumns="2">
        <figure>
          <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-SunPosition.jpg" alt="The sample Island Jump game with the default air particle density that produces a clear background." />
          <figcaption>Default air particle density</figcaption>
        </figure>
        <figure>
          <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-AirParticleDensity.jpg" alt="The sample Island Jump game with custom air particle density that produces a hazy background." />
          <figcaption>Custom air particle density</figcaption>
        </figure>
      </GridContainer>

    1. Set **Offset** to `0.17`. Lower offset values blend distant objects into the sky, which is good for endless-feeling worlds. Higher values keep a clear silhouette. This middle value keeps the mountains you'll add next chapter visible while still giving you a hint of distant fog.

      <GridContainer numColumns="2">
        <figure>
          <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-AirParticleDensity.jpg" alt="The sample Island Jump game with default Offset values that keep the background visible." />
          <figcaption>Default `Class.Atmosphere.Offset`</figcaption>
        </figure>
        <figure>
          <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-Offset.jpg" alt="The sample Island Jump game with custom Offset values that hide the edges of the background."/>
          <figcaption>Custom `Class.Atmosphere.Offset`</figcaption>
        </figure>
      </GridContainer>

</TabItem>
</Tabs>

For more information about Atmosphere, see [Atmospheric Effects](../../../../environment/atmosphere.md).

Now that you've configured the game's lighting, the next section shows you how to replace the greybox layout with polished assets.

<Tabs>
  <TabItem label="Pre-Customization">
    <img src="../../../../assets/tutorials/core-building-and-scripting/Lighting-Pre-Customization.jpg" alt="The sample Island Jump game's lighting visuals before the customization from this page." />
  </TabItem>
  <TabItem label="Customized Visual Effects">
    <img src="../../../../assets/tutorials/core-building-and-scripting/Lighting-Post-Customization.jpg" alt="The sample Island Jump game's lighting visuals after the customization from this page." />
  </TabItem>
</Tabs>
