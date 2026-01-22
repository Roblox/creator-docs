---
title: Face caging best practices
description: Tips on optimizing facial cages for use with makeup assets.
---

<Alert severity ='warning'>
This feature is currently in beta. Enable it through **File** ⟩ **Beta Features** ⟩ **Avatar Makeup**. The information provided is subject to change and is intended to prepare creators for the final release. For the latest news and updates, see the [DevForum announcement](https://devforum.roblox.com/t/studio-beta-introducing-avatar-makeup/3973764).
</Alert>

<Alert severity = 'info'>
The following information applies to character creators who want to optimize their character faces to work effectively with makeup and improve the quality and accuracy of the makeup transfer.
</Alert>

Makeup utilizes a characters facial cage to accurately transfer the texture onto the surface of the 3D model. It's important to pay extra attention to your character's head cages to ensure that makeup, eyebrows, eyelashes, and other face-related cosmetics apply correctly.

The following information and examples are best practices that are applicable to face caging as well as other caging processes. For additional best practices for caging, see [clothing caging best practices](../art/accessories/caging-best-practices.md).

## General

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Primary-A.png" />  
  <figcaption>Realistic face model reference</figcaption>
  </figure>
  <figure><img src="../assets/makeup/caging-examples/Primary-B.png" />
  <figcaption>Realistic face model caging reference</figcaption>
  </figure>
</GridContainer>

### Equidistant geometry

Try to keep geometry equidistant whenever possible. This helps mitigate texture and layered clothing distortion. Keep in mind that this isn't always possible.

<GridContainer numColumns="2">
<figure><img src="../assets/makeup/caging-examples/Equidistant-A.png" /></figure>  
<figure><img src="../assets/makeup/caging-examples/Equidistant-B.png" /></figure>
</GridContainer>

### Vertex colored areas

The template file includes vertex colors in the cages at important areas. Lining up vertex colored areas to the lips, eyebrows, and hairline areas help ensure quality makeup transfer and additionally any hair, facial hair, eyebrows, or eyelash accessories.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Vertex-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Vertex-B.png" /></figure>
</GridContainer>

### Important non-vertex colored areas

Line up areas that aren't as obviously defined to the nose, eyes, and ear areas to correctly ensure quality makeup transfer and any hair, facial hair, eyebrows and eyelash accessory fit.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Non-Vertex-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Non-Vertex-B.png" /></figure>
</GridContainer>

### Middle axis at origin

Try to keep it at origin if possible. This just keeps some consistency in the middle.

<figure><img src="../assets/makeup/caging-examples/Middle-axis.png" /></figure>  

### Line up neck cage part

Cage parts need to line up to the render mesh objects. This doesn't have to be exact but should be close. This ensures that HSR (Hidden Surface Removal) can accurately hide the underlying surface when layered accessories are worn on top.

Not something you have to worry about if using auto-setup, but may help with troubleshooting issues near the neck. Keep in mind that HSR is disabled on the head, but not on the body where the neck attaches.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Neck-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Neck-B.png" /></figure>
</GridContainer>

### Cage should barely cover render mesh

The cage needs to be close to the render mesh without actually intersecting it. Because the cage is a different topology and lower resolution than your render mesh, this can be difficult. This helps with the fit of layered accessories and with the accuracy of the makeup transfer.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Tight-Cage-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Tight-Cage-B.png" /></figure>
</GridContainer>

## Eyes

### Establish the inner and outer eye

You should have three verts for the upper eyelid and three verts for the lower eyelid, and they should be equidistant from each other.

  <figure><img src="../assets/makeup/caging-examples/Eye-Inner.png" /></figure>  

### Enclose the cage

When applicable enclose the open edge of the eye section right up to the eye mesh.

  <figure><img src="../assets/makeup/caging-examples/Eye-Enclosed.png" /></figure>

## Eyebrows

It's a little easier to visualize the eyebrow shape using the vertex color provided in the template. Once you've established the head and tail of the eyebrow, you should place the three upper and lower verts equidistant from each other.

<img src="../assets/makeup/caging-examples/Primary-B.png" />

### Establish the head and tail

It's a little easier to visualize the eyebrow shape because of the vertex color. Once you've established the head and tail of the eyebrow, you should place the three upper and lower verts equidistant from each other.

<figure><img src="../assets/makeup/caging-examples/Eyebrows-head-tail.png" /></figure>

### Missing eyebrows

For missing eyebrows, it's important to rely on basic rules of facial proportions to figure out the placement. Take in account of stylization and face shape to account for how to shape them.

<figure><img src="../assets/makeup/caging-examples/Missing-Eyebrows.png" /></figure>

### Layered clothing eyebrows

For layered eyebrows try to match up the vertex colored area as best as possible to the shape of the eyebrow.

  <figure><img src="../assets/makeup/caging-examples/Eyebrows-Layered-Clothing.png" /></figure>

### Textured eyebrows

Similar rule to layered eyebrows, try to match up the vertex colored area as best as possible to the shape of the eyebrow. Equipable eyebrows should fit right on top.

 <figure><img src="../assets/makeup/caging-examples/Eyebrows-Textured.png" /></figure>

## Mouth

Outline the outside and inside of the lips. Green vertex color should be on the upper lip, and purple on the lower lip with an equidistant spacing.

 <figure><img src="../assets/makeup/caging-examples/Mouth.png" /></figure>

## Nose

The bridge of the nose starts at the inner part of the eyes and ends two faces above the lips. Try to keep this generally in the area of where the nose should be.

 <figure><img src="../assets/makeup/caging-examples/Nose.png" /></figure>

## Ears

Establish the top of the ear with the triangle portion of the ear, the bottom with the quad. Keep the shape of the hair line around the ear.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Ears-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Ears-B.png" /></figure>
</GridContainer>

## Hairline

Establish from eyebrows the forehead shape and hairline.
 <figure><img src="../assets/makeup/caging-examples/Hairline-A.png" /></figure>

If working with sideburns, define the shape of the sideburns in front and around the ears and consider where the hairline should end at the base of the neck. This will help determine how layered hair accessories fits to the head.

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Hairline-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Hairline-B.png" /></figure>
</GridContainer>

## Caging examples of other facial types

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Paint-on-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Paint-on-B.png" /></figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Creatures-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Creatures-B.png" /></figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Inorganic-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Inorganic-B.png" /></figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Anthro-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Anthro-B.png" /></figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Missing-A.png" /></figure><figure><img src="../assets/makeup/caging-examples/Missing-B.png" /></figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure><img src="../assets/makeup/caging-examples/Missing-C.png" /></figure><figure><img src="../assets/makeup/caging-examples/Missing-D.png" /></figure>
</GridContainer>

## Missing features

For faces that are missing major facial features, use the following guidance. These tips may not always applicable, but they provide a good framework to understand how to cage faces with missing features.

- The face is divided horizontally into three equal parts
  - Hairline to eyebrows
  - Eyebrows to the bottom of the nose
  - Bottom of the nose to the bottom of the chin.
- Eyes are halfway down the head
- Space between eyes is approximately eye width
- The head is about five eyes wide
- Tear ducts of the eyes line up with the edges of the nostrils
- The corners of the mouth and pupils of the eyes are aligned
- The bottom of the ears lines up With the bottom of the nose

<img src="../assets/makeup/caging-examples/Missing-Regions.jpg" />
