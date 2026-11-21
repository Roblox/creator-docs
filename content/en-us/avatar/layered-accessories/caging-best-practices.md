---
title: Layered accessory caging best practices
description: In-depth description and images of various caging best practices for layered accessories.
keywords:
  - Layered clothing
  - Layerable accessories
  - Layered clothing accessories
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/QwZaA9Gc-WQ" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

Caging is a complex process required to define the inner and outer surface of a layered accessory. Properly caged assets allow your layered accessories to stretch and layer in combination with each other. Cages that are improperly configured can lead to cosmetic issues with the look and feel of your layered accessory.

<GridContainer numColumns="3">
<figure>
<img src="../../assets/accessories/caging-best-practices/7-Typical-Caging-Example-D.png" width="100%" alt=""/>
<figcaption>A properly configured cage typically includes a tight layering of the inner cage, clothing mesh, and the outer cage.</figcaption>
</figure>

<figure>
<img src="../../assets/accessories/caging-best-practices/7-Typical-Caging-Example-B.png" width="100%" alt=""/>
<figcaption>The t-shirt stretches and fits naturally over a base body.</figcaption>
</figure>

<figure>
<img src="../../assets/accessories/caging-best-practices/7-Typical-Caging-Example-C.png" width="100%" alt=""/>
<figcaption>Other layered accessories, such as a jacket, should stretch and fit naturally over a target body and any other caged assets.</figcaption>
</figure>

</GridContainer>

A high-quality cage matters because it affects:

- **Fit and layering** - Cages define how a layered accessory wraps over the body and over other layered accessories. Poor cages cause clipping, unnatural stretching, or accessories that don't stack correctly.
- **Hidden surface removal** - Hidden surface removal (HSR) hides the parts of the body underneath a layered accessory. HSR only works when the inner cage is completely inside the layered accessory mesh and the outer cage completely encloses it.
- **Body shape compatibility** - Characters come in many shapes and sizes. Precise cages help a layered accessory fit as well as possible on every body, not just one.
- **Inflation control** - The outer cage of the body and the inner cage of the layered accessory define the space that the accessory occupies. Imprecise cages cause unnatural puffing or clipping.
- **Animation** - Cages drive how a layered accessory fits and moves with the skeleton, especially when it uses auto-skinning. Sloppy cages create visual artifacts during any animation other than idle.

In extreme cases, improper cages may interfere with gameplay or social elements on Roblox. If your asset includes improper cages, Roblox may prevent you from uploading them to the Marketplace and may remove existing assets with improper cages from the catalog.

<Alert severity = 'warning'>
Roblox is enforcing a stricter set of validation rules to improve the overall quality of layered accessories in the Marketplace.
</Alert>

The following [best practices](#best-practices) and [common issues](#common-issues) are useful for avatar asset creators of all levels and can elevate the quality of your layered accessory creations and save time with troubleshooting.

## Best practices

Always start any caging work with one of Roblox's [provided caging templates](../../assets/modeling/meshes/reference-files/Clothing_Cage_Templates.zip). These templates include an inner cage and outer cage with properly set UVs.

<Alert severity = 'error'>
You should not edit the cage UVs since this will introduce visual artifacts.
</Alert>

When caging your layered accessories, use these important universal guidelines:

- Any clothing mesh positioned between the inner cage and outer cage will be deformed by the layering system. This is the typical configuration for nearly all layered accessory assets.
  <GridContainer numColumns="3">
  <figure>
  <img src="../../assets/accessories/caging-best-practices/7-Typical-Caging-Example-D.png" width="80%" alt=""/>
  <figcaption>The t-shirt mesh fits snugly between the inner and outer cage.</figcaption>
  </figure>

  <figure>
  <img src="../../assets/accessories/caging-best-practices/7-Typical-Caging-Example-B.png" width="80%" alt=""/>
  <figcaption>The correctly configured t-shirt naturally stretches over a target body.</figcaption>
  </figure>

  <figure>
  <img src="../../assets/accessories/caging-best-practices/7-Typical-Caging-Example-C.png" width="80%" alt=""/>
  <figcaption>Other layered accessory assets should stretch and fit naturally over a target body and any equipped caged assets.</figcaption>
  </figure>
  </GridContainer>

- You must follow the [naming conventions](../../avatar/layered-accessories/specifications.md#cage-meshes) for the layered accessory geometry and the cage.
- Don't change the vertex count or UVs of either cage. Cages are deformers that rely on matching vertex counts and UVs to deform correctly. If either changes, the layered accessory distorts or fails to deform.

  <img src="../../assets/accessories/caging-best-practices/16-Vertex-Count-UVs.jpg" width="60%" alt="A coat with its cage in a modeling application next to the unchanged cage UV layout." />

- Model the layered accessory on the character body it's intended for. This is easier to visualize than modeling directly against a cage. For the best results, use the outer cage of the body as the inner cage of the layered accessory.
  <GridContainer numColumns="2">
  <figure>
  <img src="../../assets/accessories/caging-best-practices/17-Model-To-Body-A.jpg" width="80%" alt="A coat modeled on a character body." />
  <figcaption>A coat modeled on the character body it's intended for.</figcaption>
  </figure>
  <figure>
  <img src="../../assets/accessories/caging-best-practices/17-Model-To-Body-B.jpg" width="80%" alt="The coat over the outer cage of the body." />
  <figcaption>The outer cage of the body becomes the inner cage of the coat.</figcaption>
  </figure>
  </GridContainer>

- Make sure the layered accessory mesh covers the inner cage everywhere. If needed, adjust the mesh to fit over the inner cage so it fits over the body and other layered accessories without intersecting them. For an example of what goes wrong, see [Clothing inside inner cage](#clothing-inside-inner-cage).

  <img src="../../assets/accessories/caging-best-practices/18-Mesh-Covers-Inner-Cage.jpg" width="40%" alt="A coat sleeve that fully covers the inner cage of the arm." />

- Many caging issues start from incorrect outer cage setup. For more information, see [Working with outer cages](#working-with-outer-cages).
- Do not modify areas of your cage that are unrelated to the layered accessory you are caging. For example, do not modify the inner or outer cages of the lower leg areas when caging a t-shirt.
- Review any specific best practices for [form-fitting clothes](#caging-form-fitting-clothing), [bulky clothes](#caging-bulky-clothing), and [clothing with protrusions](#caging-protrusions).
- If troubleshooting any issues, review [common issues](#common-issues) to help identify problematic layered accessories or specific validation errors.

### Working with outer cages

To create an outer cage, duplicate the inner cage and edit only the areas where the layered accessory sits. Offset the vertices along their normals, and use retopology tools that snap the cage to the layered accessory mesh for an accurate, close fit.

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/19-Create-Outer-Cage-A.jpg" width="80%" alt="A coat with an outer cage created from a duplicate of the inner cage." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/19-Create-Outer-Cage-B.jpg" width="80%" alt="Shorts with an outer cage edited only around the area that the shorts cover." />
</figure>
</GridContainer>

As long as the clothing mesh properly fits **over the inner cage** and **under the outer cage**, you can edit the outer cage in various ways depending on the final visual effect you intend to achieve.

When working with the outer cage, use the following guidelines when possible:

- Move vertices outwards in the normal's direction.
  <img src="../../assets/accessories/caging-best-practices/8-Symmetry.png" width="40%" alt=""/>
- Keep the outer cage as close to the clothing mesh as possible without intersecting it. Because the cage has a different topology and a lower resolution than the layered accessory mesh, this can be difficult. A close outer cage lets the next layer fit closely without intersecting the layered accessory, and keeps it from looking puffy or floating away from the body.
  <img src="../../assets/accessories/caging-best-practices/20-Close-Outer-Cage.jpg" width="40%" alt="An outer cage that closely covers a shirt without intersecting it." />
- Keep the outer cage similar in shape to the inner cage. Treat it as an offset along the normals rather than reshaping or distorting it to fit over the mesh. This reduces distortion in the next layer.
  <GridContainer numColumns="2">
  <figure>
  <img src="../../assets/accessories/caging-best-practices/21-Outer-Cage-Offset-A.jpg" width="100%" alt="An outer cage that keeps the shape of the inner cage." />
  </figure>
  <figure>
  <img src="../../assets/accessories/caging-best-practices/21-Outer-Cage-Offset-B.jpg" width="100%" alt="The same outer cage offset along its normals over the layered accessory." />
  </figure>
  </GridContainer>
- Work symmetrically as much as possible to save time.
- Do not alter the UVs in any way.
- Do not stack your vertices.
   <figure>
  <img src="../../assets/accessories/caging-best-practices/9-Stacking-Vertices.png" width="100%" alt=""/>
  <figcaption>Two vertices stacked directly over each other. This will introduce visual artifacts when layering other layered accessories on top.</figcaption>
  </figure>

- Keep the vertex, edge, and face count exactly the same as when you started.
- Keep your cage's edge spacing as evenly as possible.
  <GridContainer numColumns = '2'>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/10-Even-Spacing-A.png" width="100%" alt=""/>
  <figcaption><Alert severity = 'success'>Outer cage with even spacing whenever possible on the faces. </Alert></figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/10-Even-Spacing-B.png" width="100%" alt=""/>
  <figcaption><Alert severity = 'error'>Outer cage with uneven spacing throughout the torso area. Uneven cages can create visual artifacts and uneven deformations.</Alert> </figcaption>
  </figure>
  </GridContainer>

- Keep your cage's break lines between body parts lined up to the joint's position as possible. For example, try to align the elbow to where the LowerArm joint is located.

  <figure>
  <img src="../../assets/accessories/caging-best-practices/11-Positioning-Along-Joints.png" width="50%" alt=""/>
  <figcaption>Proportional changes can help improve animation and posing quality.</figcaption>
  </figure>

### Caging form-fitting clothing

Form-fitting clothing, like t-shirts, yoga pants, shorts, sweaters and slim jackets, are the most common type of layered accessory.

In this case, the outer cage needs to completely envelop the layered accessory with minimal gaps between inner cage, clothing mesh, and outer cage.

- Move outer cage vertices outwards to completely cover the layered accessory, while maintaining the silhouette of the clothing mesh as much as possible.
- Do not move outer cage vertices that don't contribute to covering the layered accessory. For example, don't move outer cage vertices in the lower leg when the layered accessory is a t-shirt.
- The entire layered accessory should be located in-between the outer and inner cages.

### Caging bulky clothing

Bulky clothing, like puffy jackets, sweat pants, and hoodies, require additional displacement of the outer cage vertices to envelop the bulky asset. The outer cage should still completely wrap the external surface of a bulky item.

- Pay special attention to the direction neighboring outer cage vertices are moved.
- Move along vertex normal directions as much as possible.
- Move vertices nearby each other more or less along the same directions (smooth relative displacements).
- Avoid moving vertices that are not covered by the layered accessory, such as moving vertices in the arm region if you are making pants.

### Caging protrusions

Some clothing items have assets that protrude or extend past the rest of the clothing. Examples include clothing with puffy hoods, shoulder pads, and spikes.

  <GridContainer numColumns="3">
  <figure>
  <img src="../../assets/accessories/caging-best-practices/12-Protusions-A.png" width="100%" alt=""/>
  <figcaption>Like all layered accessories, clothing with protrusions should fit over inner cages.</figcaption>
  </figure>

  <figure>
  <img src="../../assets/accessories/caging-best-practices/12-Protusions-B.png" width="100%" alt=""/>
  <figcaption><Alert severity ='success'>Setting the outer cage below the puffy hood allows the hood to be visible even when equipping other layered accessories.</Alert></figcaption>
  </figure>

  <figure>
  <img src="../../assets/accessories/caging-best-practices/12-Protusions-C.png" width="100%" alt=""/>
  <figcaption><Alert severity = 'error'>Setting the outer cage above the puffy hood causes additional layered accessories to stretch and cover the protrusion which is often undesired.</Alert></figcaption>
  </figure>
  </GridContainer>

To ensure that the protruded region stays visible independent of the number of layers:

- Leave the protruded region outside the outer cage. Alternatively, edit the outer cage to pass under the regions that are meant to be visible and undeformed.
- Avoid moving vertices that are not covered by the layered accessory.

### Caging examples

The following examples show caged layered accessories of different types.

#### Skirt

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/22-Skirt-A.jpg" width="80%" alt="A long skirt layered accessory." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/22-Skirt-B.jpg" width="82%" alt="The long skirt with its outer cage." />
</figure>
</GridContainer>

#### Tall boots

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/23-Tall-Boots-A.jpg" width="80%" alt="A tall boot layered accessory." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/23-Tall-Boots-B.jpg" width="72%" alt="The tall boots with their outer cages." />
</figure>
</GridContainer>

#### Scarf

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/24-Scarf-A.jpg" width="80%" alt="A scarf layered accessory." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/24-Scarf-B.jpg" width="72%" alt="The scarf with its outer cage." />
</figure>
</GridContainer>

#### Shoulder pauldrons

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/25-Pauldrons-A.jpg" width="80%" alt="A pair of shoulder pauldron layered accessories." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/25-Pauldrons-B.jpg" width="82%" alt="The shoulder pauldrons with their outer cage." />
</figure>
</GridContainer>

#### Hat

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/26-Hat-A.jpg" width="80%" alt="A cap layered accessory." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/26-Hat-B.jpg" width="75%" alt="The cap with its outer cage." />
</figure>
</GridContainer>

#### Hair

<GridContainer numColumns="2">
<figure>
<img src="../../assets/accessories/caging-best-practices/27-Hair-A.jpg" width="80%" alt="A long hair layered accessory." />
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/27-Hair-B.jpg" width="77%" alt="The long hair with its outer cage." />
</figure>
</GridContainer>

## Common issues

Improper caging can cause various rendering and deformation issues. The following common examples can help diagnose and troubleshoot any caging issues you may encounter.

### Uneven caging

Unexpected outer cage shapes cause issues when other layered accessories are equipped. While the layered accessory may fit correctly on a target body, any additional layers will fail to stretch and deform appropriately.

<GridContainer numColumns='2'>

<figure>
<img src="../../assets/accessories/caging-best-practices/1-Uneven-Cage-A.png" width="80%" alt=""/>
<figcaption>The outer cage of the black shirt is set up with uneven vertices producing an undulated caging surface.</figcaption>
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/1-Uneven-Cage-B.png" width="80%" alt=""/>
<figcaption>Any layered accessory fit on top will have visual artifacts even if the layered accessory itself looks fine.</figcaption>
</figure>
</GridContainer>

### Identical inner and outer cage

If the inner cage and outer cage are exactly the same, the layered accessory system cannot properly determine the accessory and may not deform or deform unexpectedly.

<GridContainer numColumns='2'>
<figure>
<img src="../../assets/accessories/caging-best-practices/2-Inner-Outer-Identical-A.png" width="80%" alt=""/>
<figcaption>An example of an identical inner and outer cages.</figcaption>
</figure>
<figure>
<img src="../../assets/accessories/caging-best-practices/2-Inner-Outer-Identical-B.png" width="80%" alt=""/>
<figcaption>The tshirt deforms in an unexpected manner and fails to render in its original shape or placement.</figcaption>
</figure>
</GridContainer>

### Clothing inside inner cage

Any part of the clothing mesh positioned **inside** the **inner cage** will introduce visual artifacts when the layered accessory is layered on top of other clothing. You should always avoid this type of configuration.

<GridContainer numColumns = '2'>

  <figure>
    <img src="../../assets/accessories/caging-best-practices/3-Clothing-Under-Inner-A.png" width="80%" alt=""/>
  <figcaption>The clothing mesh intersects and is positioned within the inner cage at the shoulders and abdomen areas.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/3-Clothing-Under-Inner-B.png" width="80%" alt=""/>
  <figcaption>When equipped, the t-shirt does not fit properly, exposing the problematic areas in the shoulders and abdomen.</figcaption>
  </figure>
  </GridContainer>

### Clothing partially outside outer cage

Any part of the clothing mesh positioned **outside** the **outer cage** will not be deformed by the layered system. This configuration can sometimes be intentional for effect, such as when [caging layered accessories that include protrusions](#caging-protrusions).

  <GridContainer numColumns = '2'>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/4-Outer-Not-Fully-Covering-A.png" width="80%" alt=""/>
  <figcaption>The outer cage of the tshirt is positioned within the clothing mesh near the abdomen.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/4-Outer-Not-Fully-Covering-B.png" width="80%" alt=""/>
  <figcaption>When equipped, layered accessories fail to fit properly at the affected areas.</figcaption>
  </figure>
  </GridContainer>
  
### Oversized outer cage

Ensure that the gap between the layered accessory and the outer cage is not too large. This can cause severe deformation issues when combined with other layered accessories.

<img src="../../assets/accessories/caging-best-practices/6-Oversized-Cage.png" width="50%" alt=""/>

### Collapsed cage vertices

When cage vertices are collapsed into one vertex or a small region, any additional layer placed on top of your layered accessory will have weird artifacts near the collapsed region.

   <figure>
  <img src="../../assets/accessories/caging-best-practices/9-Stacking-Vertices.png" width="100%" alt=""/>
  <figcaption>Most 3D applications can indicate if vertices are directly overlapping</figcaption>
  </figure>

<Alert severity = 'warning'>
This setup will be rejected during validation.
</Alert>

### Cages with missing limbs

<img src="../../assets/accessories/caging-best-practices/13-Cage-Missing-Parts.png" width="60%" alt=""/>

The cage is meant to match the shape of the template body used to model your layered accessory. Cages without heads or missing limbs won't work properly with the layered accessory system.

<Alert severity = 'warning'>
This setup will be rejected during validation.
</Alert>

### Outer cage inside the inner cage

Setting the outer cage inside the inner cage creates a layered accessory that can't properly layer with other assets.

<img src="../../assets/accessories/caging-best-practices/14-Outer-Inside-Inner.png" width="60%" alt=""/>

<Alert severity = 'warning'>
This setup will be rejected during validation.
</Alert>

### Mesh outside of outer cage

Layered accessories placed outside their outer cages do not deform. If the layered accessory is completely outside then it will behave similar to a rigid accessory.

  <GridContainer numColumns = '2'>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/15-Orbitting-Accessory-B.png" width="80%" alt=""/>
  <figcaption>Layered accessories outside of their cage meshes are not supported.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/accessories/caging-best-practices/15-Orbitting-Accessory-A.png" width="80%" alt=""/>
  <figcaption>Even with a correct hierarchy, layered accessories outside the cages will not deform.</figcaption>
  </figure>
  
  </GridContainer>

<Alert severity = 'warning'>
This setup will be rejected during validation.
</Alert>
