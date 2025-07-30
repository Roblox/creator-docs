---
title: Customize global lighting
description: Explains how to use global lighting settings to refine the look and feel of your experience.
prev: /tutorials/curriculums/core/building/create-basic-visual-effects
next: /tutorials/curriculums/core/building/apply-polished-assets
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/VtsWu2G0ZiM?si=TZDy2jahPoWpCBnr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br/>
**Global lighting** is the luminescence from either the sun or moon in your environment. By customizing a couple of key default properties in the `Class.Lighting` service and its default child objects in Studio, you can drastically change how global lighting looks and feels in your experience, as well as how the light interacts with any other object you place in the 3D space.

Using only a few modifications to Studio's default lighting settings, this section of the tutorial teaches you how to customize your global lighting in order to change the sun's position and light color, make dramatic shadows, and thicken the atmosphere.

<Alert severity="info">
   There are many additional lighting objects you can customize to impact global lighting in your experience. For an overview on all lighting objects available in Studio, see [Lighting and effects](../../../../environment/index.md).
</Alert>

## Set lighting properties

The `Class.Lighting` service contains five high-level categories of properties that you can adjust to customize the global lighting in your experience:

- **Color** - Configures hue within the environment.
- **Intensity** - Configures the amount of light that hits the camera.
- **Shadows** - Configures how shadows render within the environment.
- **Appearance** - Properties that determine the lighting style and lighting/shading quality or view distance prioritization.
- **Environment** - Configures environmental conditions, such as the time of day and geographic latitude.

The following instructions show you how to adjust properties within almost all of these categories to alter the colors of ambient and reflective lighting, make the edges of shadows sharper, utilize the most advanced lighting technology, and modify the position of the sun and your world to match the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) settings.

<Alert severity="info">
   For an overview on the additional properties within the `Class.Lighting` service, see [Global lighting](../../../../environment/lighting.md).
</Alert>

### Adjust the color of light

The first step in matching the sample **Island Jump - Final** experience's `Class.Lighting` service properties is to adjust the color of both ambient and reflective lighting in your environment. There are two Lighting service properties that control the color of ambient lighting:

- `Class.Lighting.Ambient` controls the color of ambient lighting where there is cover from the sky, such as indoor spaces or under outdoor covering.
- `Class.Lighting.OutdoorAmbient` controls the color of ambient lighting where the sky is visible.

In addition, the `Class.Lighting.ColorShift_Top` property controls the color of light that reflects from surfaces facing the sun or moon. By default, these three properties are set to produce a dark gray tone throughout your world, but to compliment the nautical sea stack environment of the final sample, you can adjust these properties to make both the ambient and reflective lighting have the subtle **blue-grey** tone of a traditional ocean palette.

<div><b>A comparison between the sample Island Jump experience's default and custom ambient lighting</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Default-Color.jpg" alt="The sample Island Jump experience with default ambient lighting visuals." />
    <figcaption>Default Properties</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-Color.jpg" alt="The sample Island Jump experience with custom ambient lighting visuals." />
    <figcaption>Custom Properties</figcaption>
  </figure>
</GridContainer>

To adjust the color of ambient lighting in your environment:

1. In the **Explorer** window, select **Lighting**.
2. In the **Properties** window,
   1. Set **Ambient** to `16, 16, 16`. The entire environment becomes subtly darker.
   1. Set **ColorShift_Top** to `196, 222, 255`. The hue that reflects from surfaces facing the sun lightens.
   1. Set **OutdoorAmbient** to `134, 158, 190`. All areas except for the tunnel display with a blue-grey hue.

### Enable realistic lighting

The second step in matching the sample **Island Jump - Final** experience's `Class.Lighting` service properties is to enable the most advanced lighting system. Studio begins every experience with `Enum.LightingStyle|Soft` lighting which renders a flatter look with softer lights and shadows. However, to enhance the environment and equip your local light sources to produce precise shadows and illumination, you must enable `Enum.LightingStyle|Realistic` lighting.

For example, the local lighting from the glowing flare with soft lighting doesn't produce a shadow at all, while the glowing flare with realistic lighting produces a subtle shadow near the circumference of the sea stack platform. This effect becomes more pronounced the more light sources you have within your environment.

<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/LightingStyle-Soft.jpg" alt="The sample Island Jump experience with Soft lighting style." />
    <figcaption>`Enum.LightingStyle|Soft` lighting style</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/LightingStyle-Realistic.jpg" alt="The sample Island Jump experience with Realistic lighting produces more prominent lighting from the flare."/>
    <figcaption>`Enum.LightingStyle|Realistic` lighting style</figcaption>
  </figure>
</GridContainer>

To enable realistic lighting:

1. In the **Explorer** window, select **Lighting**.
2. In the **Properties** window, click the **LightingStyle** dropdown, then select **Realistic**. The lighting system updates.

### Harden shadows

The third step in matching the sample **Island Jump - Final** experience's `Class.Lighting` service properties is to harden the shadows in your environment. This creates a more dramatic effect when players navigate between the outdoor and covered areas of your experience.

<div><b>A comparison between the sample Island Jump experience's default and custom shadows</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Default-Shadows.jpg" alt="The sample Island Jump experience with default shadow visuals that produce fuzzy shadows." />
    <figcaption>Default Shadows</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-Shadows.jpg" alt="The sample Island Jump experience with custom shadow visuals that produce sharp shadows."/>
    <figcaption>Custom Shadows</figcaption>
  </figure>
</GridContainer>

To harden the shadows in your environment:

1. In the **Explorer** window, select **Lighting**.
2. In the **Properties** window, set **ShadowSoftness** to `0`. Shadows produce hard edges.

### Change sun position

The final step in matching the sample **Island Jump - Final** experience's `Class.Lighting` service properties is to change the position of the sun in the sky. There are three properties that control the sun's position:

- `Class.Lighting.ClockTime` represents the current time of day from hour 0 through 24.
- `Class.Lighting.TimeOfDay` represents the current time of day with a 24 hour string.
- `Class.Lighting.GeographicLatitude` represents the geographic latitude in degrees.

<Alert severity="info">
   `Class.Lighting.ClockTime` and `Class.Lighting.TimeOfDay` are directly related, meaning that if you change one property, the other also changes, so you only need to customize one of these properties to change the time of day.
</Alert>

The sun's default position is high in the sky, emulating around midday in the real world. However, to produce more pronounced shadows and directionality within the environment, you can move the sun to the right of the sea stack platforms.

<div><b>A comparison between the default and custom sun position</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Default-SunPosition.jpg" alt="The sample Island Jump experience with the default sun position high in the sky."/>
    <figcaption>Default sun position</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-SunPosition.jpg" alt="The sample Island Jump experience with a custom sun position approaching the horizon." />
    <figcaption>Custom sun position</figcaption>
  </figure>
</GridContainer>

To change the sun position:

1. In the **Explorer** window, select **Lighting**.
2. In the **Properties** window,
   1. Set **ClockTime** to `9`. The sun moves to the position it would be in the real world at 9:00 in the morning.
   1. Set **GeographicLatitude** to `78`. The world moves by 78 degrees, which also moves the sun to the right of your sea stack platforms.

## Atmosphere properties

The `Class.Lighting` service's child `Class.Atmosphere` object allows you to create realistic environmental lighting effects by scattering sunlight in unique ways based on properties that simulate air particles. These properties can be very useful in creating a thickness in the environment's air, giving the atmosphere a tangible sense of depth.

The following instructions show you how to adjust `Class.Atmosphere` properties to create a slightly thicker atmosphere to conceal the edge of the water and create more depth of field, just like the sample [Island Jump - Final](https://www.roblox.com/games/14238807008/Island-Jump-Completed-Sample) experience.

<Alert severity="info">
   For an overview on the additional properties within the `Class.Atmosphere`, see [Atmospheric Effects](../../../../environment/atmosphere.md).
</Alert>

### Increase air particle density

The first step in matching the sample **Island Jump - Final** experience's `Class.Atmosphere` properties is to increase air particle density. The `Class.Atmosphere.Density` property controls how many particles exist in the air of your environment. When you increase this property, the additional amount of particles obstruct the players' view of objects in the background. This is particularly useful for hiding the boundaries of your water terrain.

<div><b>A comparison between the default and custom air particle density</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-SunPosition.jpg" alt="The sample Island Jump experience with the default air particle density that produces a clear background." />
    <figcaption>Default air particle density</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-AirParticleDensity.jpg" alt="The sample Island Jump experience with custom air particle density that produces a hazy background." />
    <figcaption>Custom air particle density</figcaption>
  </figure>
</GridContainer>

To increase air particle density in your environment:

1. In the **Explorer** window, navigate to the **Lighting** service, then select its child **Atmosphere** object.
2. In the **Properties** window, set **Density** to `0.375`. The air becomes thicker.

### Blend distant objects

The second step in matching the sample **Island Jump - Final** experience's `Class.Atmosphere` properties, as well as the final step in this section of the tutorial, is to blend distant objects on the horizon. The `Class.Atmosphere.Offset` property controls how light transmits between the camera and the sky background. When you increase this value, it creates a horizon silhouette; when you decrease this value, it blends distant objects into the sky for a seemingly endless and seamless open world.

While the sample experience could have set this property to zero to completely hide players' view of the horizon, the next section of the tutorial adds mountain objects near the boundaries of the experience that need to be visible. In addition, decreasing the default value without setting it to zero mimics a fog starting to roll in the distance, creating a more realistic environment.

<div><b>A comparison between the default and custom Offset values</b></div>
<GridContainer numColumns="2">
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-AirParticleDensity.jpg" alt="The sample Island Jump experience with default Offset values that keep the background visible." />
    <figcaption>Default `Class.Atmosphere.Offset` properties</figcaption>
  </figure>
  <figure>
    <img width="100%" img src="../../../../assets/tutorials/core-building-and-scripting/Custom-Offset.jpg" alt="The sample Island Jump experience with custom Offset values that hide the edges of the background."/>
    <figcaption>Custom `Class.Atmosphere.Offset` properties</figcaption>
  </figure>
</GridContainer>

To blend distant objects in your environment:

1. In the **Explorer** window, navigate to the **Lighting** service, then select its child **Atmosphere** object.
2. In the **Properties** window, set **Offset** to `0.17`. The air becomes thicker.

Now that your experience's global lighting is set to custom properties, in the next section of the tutorial, you will learn how to replace your greybox layout with high-quality polished assets.

<Tabs>
  <TabItem label="Pre-Customization">
    <img src="../../../../assets/tutorials/core-building-and-scripting/Lighting-Pre-Customization.jpg" alt="The sample Island Jump experience's lighting visuals before the customization from this page." />
  </TabItem>
  <TabItem label="Customized Visual Effects">
    <img src="../../../../assets/tutorials/core-building-and-scripting/Lighting-Post-Customization.jpg" alt="The sample Island Jump experience's lighting visuals after the customization from this page." />
  </TabItem>
</Tabs>
