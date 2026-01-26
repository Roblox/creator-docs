---
title: Light with props
description: The process for creating light sources out of props.
---

While overall world lighting is globally controlled through the `Class.Lighting` service, experiences can also include in-game **light sources** like lamps, torches, spotlights, TV screens, etc.

![alt](../../../assets/tutorials/lighting-with-props/Misty-Harbor-Banner.jpg)

## Starter project

The remainder of this tutorial uses the [Misty Harbor](https://www.roblox.com/games/6445909934/Misty-Harbor) project as a showcase. To follow along, open it in Studio before proceeding.

<img src="../../../assets/tutorials/lighting-with-props/Misty-Harbor-Edit-Place.png" width="780" alt="Edit in Studio option from the experience's main page" />

## Point lights

A `Class.PointLight` emits light **spherically** from a single point. This object is ideal for non-directional light sources like bulbs, torches, and fireballs.

Light sources like point lights need to be inserted directly into parts, meshes, or attachments. Here, a point light will be inserted into an existing model within the darkened city.

1. Find and select a **LightPole** model like the one shown below, near the central fountain.

   ![alt](../../../assets/tutorials/lighting-with-props/LightPole-Select-Model.jpg)

2. In the **Explorer** window, expand the model's tree and select the **LightCasing** part.

   <img src="../../../assets/tutorials/lighting-with-props/LightPole-Select-LightCasing.png" width="60%" />

3. Change its **Material** property to **Neon** — this will make the part appear to glow brightly, although it will not actually emit any light.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/lighting-with-props/LightCasing-Material.jpg" />
     <img src="../../../assets/tutorials/lighting-with-props/LightCasing-Material-Property.png" />
   </GridContainer>

4. With **LightCasing** still selected, insert a new **PointLight** object.

   <GridContainer numColumns="2">
     <img src="../../../assets/tutorials/lighting-with-props/LightPole-Add-Light.jpg" />
     <img src="../../../assets/tutorials/lighting-with-props/LightPole-Add-Light.png" />
   </GridContainer>

5. With **PointLight** selected, customize its **Brightness** and **Color** values.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/PointLight-Brightness.jpg" />
       <figcaption>Brightness = 4</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/PointLight-Color.jpg" />
       <figcaption>Color = 255, 175, 100</figcaption>
     </figure>
   </GridContainer>

6. Further customize the light by adjusting its **Range** property. This value defines the radial distance of illumination from the light's position, measured in studs.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/PointLight-Range-8.jpg" />
       <figcaption>Range = 8</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/PointLight-Range-12.jpg" />
       <figcaption>Range = 12</figcaption>
     </figure>
   </GridContainer>

## Spot lights

A `Class.SpotLight` emits light in the shape of a **cone**. This object is ideal for light sources like street lamps, flashlights, and headlights.

1. Select the taller arched **StreetLight** model next to the construction across the street. Currently the light is pointed out instead of down at the street.

   ![alt](../../../assets/tutorials/lighting-with-props/StreetLight-Select-Model.jpg)

2. Expand the model's tree to reveal the **SpotLight** object.

   <img src="../../../assets/tutorials/lighting-with-props/StreetLight-Select-SpotLight.png" width="60%" />

3. With **SpotLight** selected, test out different values for its **Face** property to change which face/axis light is emitted from.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SpotLight-Face-Left.jpg" />
       <figcaption>Face = Left</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SpotLight-Face-Bottom.jpg" />
       <figcaption>Face = Bottom</figcaption>
     </figure>
   </GridContainer>

4. Adjust the **Angle** property to increase or decrease the spread of light emission. The maximum value is 180 which illuminates a full half sphere from the cone's apex.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SpotLight-Angle-30.jpg" />
       <figcaption>Angle = 30</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SpotLight-Angle-75.jpg" />
       <figcaption>Angle = 75</figcaption>
     </figure>
   </GridContainer>

5. Experiment with different **Brightness** and **Color** values, as with the point light.

## Surface lights

A `Class.SurfaceLight` emits light from the entire surface/face of a part, rather than just from a single point. This object is useful for light sources like TV or computer screens, lighted billboards, and fluorescent panels.

1. Find and select the lighted **RobloxBillboard** sign on top of the café.

   ![alt](../../../assets/tutorials/lighting-with-props/Billboard-Select-Model.jpg)

2. Expand the model's tree to reveal the SurfaceLight object.

   <img src="../../../assets/tutorials/lighting-with-props/Billboard-Select-SurfaceLight.png" width="60%" />

3. With **SurfaceLight** selected, test out different **Face** values to change which face/surface light is emitted from. Notice that light is emitted from the **entire surface**, not a point upon it.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SurfaceLight-Face-Bottom.jpg" />
       <figcaption>Face = Bottom</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SurfaceLight-Angle-60.jpg" />
       <figcaption>Face = Right</figcaption>
     </figure>
   </GridContainer>

4. Adjust the **Angle** property to increase or decrease the spread of light emission from the part's surface. An angle of 0 means that light travels directly outward from the surface while an angle of 180 means light travels outward perpendicular to the surface.

   <GridContainer numColumns="2">
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SurfaceLight-Angle-60.jpg" />
       <figcaption>Angle = 60</figcaption>
     </figure>
     <figure>
       <img src="../../../assets/tutorials/lighting-with-props/SurfaceLight-Angle-0.jpg" />
       <figcaption>Angle = 0</figcaption>
     </figure>
   </GridContainer>

By using lighting props instead of just general world lighting, you open up the possibility of creating new genres and environments like cyberpunk cities, traditional light festivals, or moody detective scenes.
