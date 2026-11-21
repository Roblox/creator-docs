---
title: Character body caging best practices
description: Best practices and examples for caging character bodies so layered accessories fit, layer, and animate correctly.
keywords:
  - Body cages
  - Outer cages
  - Character body caging
---

Caging defines the outer surface of a character body that layered accessories stretch and fit over. A character body only needs an outer cage, which consists of 15 cage meshes, one for each body part. A precise outer cage lets layered accessories fit any body shape and layer naturally with each other. An imprecise cage causes clipping, stretching, and visual artifacts that players notice right away.

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Body-Render-Mesh.jpg" width="80%" alt="A character body render mesh without a cage." />
<figcaption>A character body render mesh.</figcaption>
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Body-Outer-Cage.jpg" width="78%" alt="The same character body with its outer cage displayed over the render mesh." />
<figcaption>The same character body with its outer cage.</figcaption>
</figure>
</GridContainer>

A high-quality outer cage matters because it affects:

- **Fit and layering** - The cage defines how layered accessories wrap over the body and over each other. Poor cages cause clipping, unnatural stretching, or accessories that don't stack correctly.
- **Body shape compatibility** - Characters come in many shapes and sizes. A precise cage helps layered accessories fit as well as possible on every body, not just one.
- **Inflation control** - The outer cage of the body and the inner cage of a layered accessory define the space that the accessory occupies. Imprecise cages cause unnatural puffing or clipping.
- **Hidden surface removal** - Hidden surface removal (HSR) hides the parts of the body underneath a layered accessory. HSR depends on cage parts that line up with the body parts of the render mesh.
- **Animation** - The cage drives how layered accessories move with the skeleton. Sloppy cages create visual artifacts during any animation other than idle.

The following best practices and examples apply to caging character bodies. For head-specific guidance, see [Dynamic head caging best practices](../dynamic-heads/caging-best-practices.md). For caging layered accessories, see [Layered accessory caging best practices](../layered-accessories/caging-best-practices.md).

## Best practices

Always start with one of Roblox's body cage templates from the [reference files](./project-files.md), or use [Avatar Setup](../../avatar-setup/index.md). These templates include all 15 outer cage meshes with the correct naming and UVs.

### Keep the vertex count and UVs the same

Don't change the vertex count or UVs of the 15 outer cage meshes. The outer cage is a deformer that relies on matching vertex counts and UVs to deform layered accessories correctly. If either changes, layered accessories distort or fail to deform.

<img src="../../assets/avatar/character-bodies/caging-best-practices/Vertex-Count-UVs.jpg" width="80%" alt="A body cage in a modeling application next to its unchanged UV layout." />

### Keep the middle axis at the origin

Keep the middle axis of the cage at the origin when possible. This keeps the middle of the cage consistent.

<img src="../../assets/avatar/character-bodies/caging-best-practices/Middle-Axis.jpg" width="50%" alt="A front view of a body cage with its middle axis at the origin." />

### Keep geometry equidistant

Keep the geometry of the cage evenly spaced whenever possible. This reduces texture distortion and fit distortion in layered accessories. Keep in mind that this isn't always possible.

<img src="../../assets/avatar/character-bodies/caging-best-practices/Equidistant-Geometry.jpg" width="50%" alt="A torso cage with evenly spaced edges." />

### Line up vertex-colored areas

Line up the vertex-colored areas of each cage part with the matching areas of the body. This helps layered accessories line up correctly with those areas.

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Vertex-Colored-Areas-A.jpg" width="80%" alt="The vertex-colored areas of a torso cage." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Vertex-Colored-Areas-B.jpg" width="80%" alt="The torso cage lined up with the torso of the render mesh." />
</figure>
</GridContainer>

### Line up cage parts with body parts

Line up each cage part with the matching body part of the render mesh. The alignment doesn't have to be exact, but it should be close. This lets HSR accurately hide the body underneath layered accessories. It helps to segment your character body so its parts line up with the cage parts.

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Line-Up-Cage-Parts-A.jpg" width="80%" alt="The upper and lower arm cage parts." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Line-Up-Cage-Parts-B.jpg" width="80%" alt="The arm cage parts lined up with the arm of the render mesh." />
</figure>
</GridContainer>

### Keep hand landmarks consistent

Keep the landmarks of the hand cage consistent with the template. This helps accessories around the hands, such as gloves, line up with the hand as closely as possible.

<GridContainer numColumns="4">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Hand-Landmarks-A.jpg" width="100%" alt="The back of a hand cage with landmarks marked." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Hand-Landmarks-B.jpg" width="100%" alt="The palm of a hand cage with landmarks marked." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Hand-Landmarks-C.jpg" width="100%" alt="The thumb side of a hand cage with landmarks marked." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Hand-Landmarks-D.jpg" width="100%" alt="The pinky side of a hand cage with landmarks marked." />
</figure>
</GridContainer>

### Keep foot landmarks consistent

Keep the landmarks of the foot cage consistent with the template. This helps shoes line up with the foot as closely as possible.

<img src="../../assets/avatar/character-bodies/caging-best-practices/Foot-Landmarks.png" width="100%" alt="A foot cage with landmarks marked." />

### Flatten the bottom of the foot cage

Flatten the bottom of the foot cage. A flat base keeps shoes consistent and helps them keep their structure.

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Flat-Foot-Bottom-A.jpg" width="100%" alt="A foot cage with a flat bottom." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Flat-Foot-Bottom-B.jpg" width="100%" alt="The flat foot cage over the foot of the render mesh." />
</figure>
</GridContainer>

### Cover the render mesh closely

Keep the cage close to the render mesh without intersecting it. Because the cage has a different topology and a lower resolution than the render mesh, this can be difficult. A close cage lets layered accessories fit closely without intersecting the body, and keeps them from looking puffy or floating away from the body.

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Close-Cage-A.jpg" width="90%" alt="A front view of a body cage that closely covers the render mesh." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Close-Cage-B.jpg" width="60%" alt="A side view of a body cage that closely covers the render mesh." />
</figure>
</GridContainer>

### Decide which areas to leave uncaged

Decide which parts of the render mesh to leave outside the cage, basing the decision on how you want layered accessories to fit the body. For example, leaving the ears outside the cage helps hair and hats keep their original shape.

<img src="../../assets/avatar/character-bodies/caging-best-practices/Uncaged-Ears.jpg" width="50%" alt="A character head with its ears left outside the cage." />

### Cage missing or different body parts

Decide how to cage body parts that are missing or that differ from a standard humanoid, basing the decision on how you want layered accessories to fit the body. For example, keeping the overall shape of the foot cage helps shoes keep their shape, even on feet that aren't human.

<img src="../../assets/avatar/character-bodies/caging-best-practices/Different-Body-Parts.jpg" width="50%" alt="Cages that keep a standard foot shape over non-human legs and feet." />

## Caging examples

The following examples show how to cage character bodies that differ from a standard humanoid.

### Classic body

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Classic-Body-A.jpg" width="80%" alt="A classic blocky character body." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Classic-Body-B.jpg" width="75%" alt="The classic character body with its outer cage." />
</figure>
</GridContainer>

### Robot body

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Robot-Body-A.jpg" width="80%" alt="A robot character body." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Robot-Body-B.jpg" width="85%" alt="The robot character body with its outer cage." />
</figure>
</GridContainer>

### Baked-in clothing

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Baked-In-Clothing-A.jpg" width="80%" alt="A character body with clothing modeled into the body." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Baked-In-Clothing-B.jpg" width="70%" alt="The character body with baked-in clothing and its outer cage." />
</figure>
</GridContainer>

### Asymmetry and missing areas

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Asymmetry-Missing-Areas-A.jpg" width="80%" alt="An asymmetrical rock character body with gaps between its parts." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Asymmetry-Missing-Areas-B.jpg" width="76%" alt="The rock character body with its outer cage." />
</figure>
</GridContainer>

### Anthropomorphized animals

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Anthropomorphized-Animal-A.jpg" width="80%" alt="An anthropomorphized red panda character body." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Anthropomorphized-Animal-B.jpg" width="80%" alt="The red panda character body with its outer cage." />
</figure>
</GridContainer>

### Missing or different body parts

<GridContainer numColumns="2">
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Missing-Different-Parts-A.jpg" width="80%" alt="An alien character body with non-human features." />
</figure>
<figure>
<img src="../../assets/avatar/character-bodies/caging-best-practices/Missing-Different-Parts-B.jpg" width="78%" alt="The alien character body with its outer cage." />
</figure>
</GridContainer>
