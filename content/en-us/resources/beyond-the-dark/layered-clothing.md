---
title: Layered clothing example
description: Explains the concepts for applying layered clothing in Beyond The Dark.
next: /resources/beyond-the-dark/sound-design
prev: /resources/beyond-the-dark/custom-characters
---

Layered clothing lets you create 3D clothes and accessories that nearly any avatar can wear with any combination of other layered clothes. Layered clothing naturally stretches over an avatar body and other layered clothing items without clipping or breaking.

We recommend building a base body character upon which you can fit the layered clothing you're creating. We'll go over how to do this in an external DCC application and combine it all in Studio to create the final character from the space station.

<Alert severity="info">
For additional layered clothing resources, such as guides, example projects, and reference models, see [3D accessories](../../art/accessories/index.md).
</Alert>

## Build the custom character

We wanted the users in our experience to embody someone sent to the station to investigate some disturbing events. We weren't sure early on what our actual character would be or if there would be multiple types of characters, but we wanted them to wear space suits. Because of this, we decided to make the clothing a separate component which would allow flexibility in our design.

We ultimately settled on a single character design that we named "The Visitor," but layered clothing allowed us to create a main character while also releasing the clothing to the Marketplace as a modular component. As a creator, you'll be able to do the same soon, so follow along to see how we did this.

<img
  alt="Custom Character Example"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Custom-Character-Example.png"
  width="80%" />

### Make the base body

The base body is essentially the lowest layer of the layered clothing system. This can be anything from our character's body in underwear, to a fishman or even a blocky avatar.

Layered Clothing Checklist:

- The body geo, cage parts, and skeleton must conform to the R15 schema.
- The body cage must use the cage supplied by Roblox.
- The cage should be in the same number of parts as the body geo, with the suffix \_OuterCage.
  - LeftUpperArm_Geo (mesh)
  - LeftUpperArm_OuterCage (cage)
- The poly budget for each part cannot exceed 10,000 triangles.
- Character size cannot exceed 2000×2000×2000 units.

### Make the model

Layered Clothing lets clothes fit on almost any kind of body, whether it be a fishman, a rock golem, or a human space explorer. The only requirements are that they be bipedal humanoids.

You should model the character in a neutral and natural pose. This allows a more full range of motion when animating, and also gives you implied directionality to movement. Implied directionality means that when you're building your character's skeleton, the joints have a small bend in them to know which way they should naturally bend. The following examples show a very small bend in the arms and legs to allow for this. We also posed the hands in a natural posture that could still hold onto something if we wanted items or gear in our experience.

<img
  alt="Unique Character Examples"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Unique-Characters.png"
  width="80%" />

The silhouette, or the shape of your character, should also be distinct and discernable to another player at a distance, which is important for multiplayer experiences. This cuts down confusion and helps users know what is safe or dangerous when a lot of things are going on.

<GridContainer numColumns="2">
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Silhouette-1.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Silhouette-2.png" />
</GridContainer>

An important note about the base character: Since this is a player avatar, and we wanted to eventually release the body and clothing on the Marketplace, it still needs to follow the R15 schema. This includes the body being separated into 15 parts.

<GridContainer numColumns="2">
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Character-Model.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Character-Model-Exploded.png" />
</GridContainer>

To make sure the parts still appear contiguous, it's recommended you cap your mesh components and then use your application to "average" the vertex normals between body part "seams." This will treat the two vertices on either side of the body part as one, with regards to the surface normals.

<img
  alt="Influences Between Seams Example 1"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Seams-Example-1.png"
  width="80%" />

<img
  alt="Influences Between Seams Example 2"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Seams-Example-2.png"
  width="80%" />

### Texture

Texturing your characters lets you bring them to life based on how you want them to look. For the space station, we wanted a character that was a similar level of realism as its surroundings and settled on the following character:

<img
  alt="Texturing Example"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Texturing-Showcase.png"
  width="80%" />

Now we'll go over how to get textures into Studio and make sure the character looks great and fits into the experience.

1. Before texturing, we did a range of motion tests by moving the character joints and posing it to make sure the model deforms well. It's not always necessary to do a range of motion tests before texturing, but it'll help you catch surprises in your model before you put hours into the textures. After that, we separated the rig from the mesh (unbound it) to focus on texturing. It's not advisable to do texture work, or anything beyond animating, once a character is bound to its rig.

   <img
   alt="Motion Test Example"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Motion-Test.png"
   width="80%" />

2. To allow for skin-tone controls for the Marketplace, we made areas like the shirt, shorts, gloves, and boots fully opaque. However, for the areas with exposed skin, we used partial transparency to allow for details to be added to the skin tone, but not completely override it. This allowed us to enhance features of the anatomy beyond what Studio's current lighting can do.

   <img
   alt="Texturing and UV Diagram"
   src="../../assets/resources/beyond-the-dark/layered-clothing/UV-Diagram.png"
   width="80%" />

The following images show color (albedo), metalness, roughness, and normal maps.

<GridContainer numColumns="2">
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/UV-Maps-1.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/UV-Maps-2.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/UV-Maps-3.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/UV-Maps-4.png" />
</GridContainer>

And the following images show skin tone transparency in action in Studio, and show the same color map with transparency and a skin tone color applied.

<GridContainer numColumns="3">
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skin-Tone-Maps-1.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skin-Tone-Maps-2.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skin-Tone-Maps-3.png" />
</GridContainer>

<img
  alt="Various Texture Comparisons"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Texture-Comparisons.png"
  width="75%" />

### Cage

Once we established the base body, we needed to cage it so that layered clothing could fit on it. Cages are the way that the clothing and body interact. Both the body and the clothing have the same cage, deformed by the user to define the clothing's fit. The body cage tells the clothing the shape of the character without all the fine details of the mesh itself. The clothing's inner cage defines how tight the clothing's fit is.

The first pass of fitting the cage, for now, needs to be done within an external DCC application. You can use the cage supplied by Roblox to start.

The cage for the body is largely the same as that of the clothing, except the final result is a cage that has 15 parts (each corresponding to a body part mesh). Below is the "editable" cage which is a single mesh, the cage parts which are deformed by editing the "editable" cage, and the mesh itself.

<img
  alt="Individual Body Part Cages"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Body-Cage-Example-1.png"
  width="80%" />

When you first start with the cage, it's very likely it won't match your character, so you'll need to adjust the "editable" cage, or the parts directly, to fit to the outer bounds of the body mesh. As with clothing, the outer cage should always fit outside the body mesh, so that clothing knows the shape of the body itself. It uses a "twin" cage in the clothing to essentially snap clothing to this outer cage (we'll go over this in more detail below).

<img
  alt="Cage Adjustment Example"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Body-Cage-Example-2.png"
  width="80%" />

We decided that we wanted the outer cage to cover the skin, but not the gloves and boots. Other than those areas, you'll see that the cage fits as best as it can outside the body, including the face cage matching the distance and shape of facial features.

<GridContainer numColumns="2">
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Body-Cage-Example-3.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Body-Cage-Example-4.png" />
</GridContainer>

<img
  alt="Outer Cage Example 3"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Body-Cage-Example-5.png"
  width="80%" />

<img
  alt="Outer Cage Example 4"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Body-Cage-Example-6.png"
  width="80%" />

### Skin

Skinning the character, similar to Custom Characters, is what gives the organic bending and twisting of your character when moving through the environment. We found the following guidelines useful, so that the character mesh imports correctly into Studio:

- Individual joints and bones must have unique names.
- Meshes should have no transforms prior to skinning/binding; in other words, transforms should be 0 and scales should be 1.
- Mesh normals should face outward (the model shouldn't look inside-out).
- Skeletons shouldn't have any scale factor; all joints should be [1, 1, 1].
- Skinning this character was a bit more difficult given the limitations of joint count, but here are some notes from the work we did:

- When skinning a human with clear anatomy, it's best to paint your weights so that bending looks natural, for example the shoulder muscle stretching or compressing when you move the arm up and down.

  <GridContainer numColumns="2">
    <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skinning-Influence-Example-1.png" />
    <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skinning-Influence-Example-2.png" />
  </GridContainer>

- Another common issue with skinning humans is that skinning defaults will often times be "too smooth," meaning areas like the elbows and knees will have influences distributed too much. It's best to paint them tighter so your legs/arms don't compress when they bend.

  <GridContainer numColumns="2">
    <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skinning-Influence-Example-3.png" />
    <img src="../../assets/resources/beyond-the-dark/layered-clothing/Skinning-Influence-Example-4.png" />
  </GridContainer>

- Lastly, because your model is split into 15 parts, you'll need to make sure seams between the parts are 1:1 in terms of weighting. Most applications will allow you to copy influences from one vertex to another so they have the exact same weighting.
  <GridContainer numColumns="2">
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Shoulder-Seams-Example-1.png" />
  <img src="../../assets/resources/beyond-the-dark/layered-clothing/Shoulder-Seams-Example-2.png" />
  </GridContainer>

### Gloves and boots

As you'll notice from the base body, we decided to include gloves and boots. You might want to do this temporarily as well, for the following reasons:

1. We wanted gloves to be part of the Layered Clothing suit, but gloves aren't currently supported in the Layered Clothing feature, so we replaced the hands of our initial model with one that had gloves.

2. We wanted the metal ring of the shoe to be rigid and not deform to fit the foot and leg, so we replaced the feet of our initial model with one that had boots.

   <img
   alt="Comparison After Replacing Feet and Hands"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Replacing-Hands-And-Feet.png"
   width="80%" />

3. To make sure Layered Clothing didn't try to fit around the boots or gloves, we intentionally kept the cages inside them. This enables the top and bottom of the space suit to deform to the hands and feet.

   <img
   alt="Caging with Gloves"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Caging-With-Gloves.png"
   width="80%" />

## Build the suit

Early on in the process, we decided that the suit should fit onto multiple characters, and that we wanted to release the assets to the Marketplace so others could enjoy the clothing. In addition to Layered Clothing, our character needed "hardpoint" items like a helmet and backpack as finishing touches. The following image shows how the space suit looks on a variety of characters.

<img
  alt="Layered Clothing Suit Comparison"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Layerable-Suit-Comparison.png"
  width="80%" />

We found the following guidelines useful when building Layered Clothing:

- The exported `.fbx` file from your DCC application must contain the **clothing mesh**, **inner cage**, **outer cage**, and **skeleton**.
- The way you name your clothes is arbitrary, but both cages need to have this naming format:
  - [clothing name]**\_InnerCage**
  - [clothing name]**\_OuterCage**
- You must skin clothing to the R15 skeleton with a maximum of **4** influences.
- Your R15 skeleton must follow this naming schema.

With those guidelines in mind, here are the steps we followed to build the space suit:

1. Use the Roblox Layered Clothing cage template, a base frame that you can use to fit clothing to. Depending on the distance of the clothing to the frame, you can have clothing that is tight or loose fitting.

2. Model the clothing to the frame and sculpt a higher-poly model in an external DCC application.

3. Rebuild the lower-poly, game-ready version of the higher-poly model. If you're interested in more information about this process, there are many tutorials online for high-poly to game-ready models. Note that clothing does not need to be split up into parts corresponding to the body parts they're covering; it can be a single mesh.

   <img alt="Clothing Design Example 1"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Clothing-Design-Example-1.png"
   width="80%" />

   <img alt="Clothing Design Example 2"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Clothing-Design-Example-2.png"
   width="80%" />

4. Test the movement and fitness on other characters prior to finalizing any textures.

5. Define the "outer cage" or the outer bounds of the clothing item. This tells any additional layers how tightly to fit to the astronaut suit top.

   <Alert severity="warning">
   It's very important for clothing outer cages to follow the clothing mesh closely, but always be outside the clothing. This allows Studio to also employ another powerful feature, Hidden Surface Removal. This feature removes geometry of a layer of clothing or even the body, if it's covered by another layer. This is immensely useful, because you won't have to worry about any meshes interpenetrating when the character runs around.

   </Alert>

   <img alt="Layered Clothing Outer Cage Example"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Clothing-Outer-Cage.png"
   width="80%" />

6. After caging, it may help to temporarily skin the clothing to the skeleton in the template file, just to do a range of motion test. By posing the rig in different positions, you can confirm it deforms well before finalizing texturing. If you do this, be sure to unbind before moving to texturing!

   <img alt="Layered Clothing Rig Binding"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Clothing-Posing.png"
   width="80%" />

### Texture

After we skinned the clothing, and it moved the way we intended, we moved to texturing.

1. Because we wanted to aim for realism, we used surface appearance for the beautiful PBR materials. We brought this into a texturing application to make the albedo, metalness, roughness, and normal maps. This allowed the outfit to have parts that looked metallic and others to look more like rough canvas.

   <GridContainer numColumns="2">
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Suit-Texturing-Example-1.png" />
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Suit-Texturing-Example-2.png" />
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Suit-Texturing-Example-3.png" />
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Suit-Texturing-Example-4.png" />
   </GridContainer>

   <img
   alt="Surface Appearance Lighting Test 1"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Suit-Lighting-Test.gif"
   width="80%" />

2. Before going much further, we brought the model and textures into Studio to test the materials with the proper lighting in the space station. This led to some adjustments to the metalness of the arm and torso bands.

   <img
   alt="Surface Appearance Lighting Test 2"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Suit-Lighting-Test-2.png"
   width="80%" />

When texturing your clothing, keep the following points in mind:

- For surface appearance, make sure to include color (albedo), metalness, roughness, and normal maps.
- Without metalness, the surface appearance defaults to 0 metalness, or a plastic surface.
- Without roughness, the surface appearance defaults to 0 roughness, or a smooth surface.

### Skin

Skinning clothing is required to have it bend properly with the base body. By skinning it, you're also telling the animations how the clothing should bend, including which parts are rigid or move with the character.

<img
  alt="Skinned Model Animation"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Skinning-Movement.gif"
  width="80%" />

Luckily, unlike the base body, you don't need to split up your clothing, so the suit top can be a single mesh and skinned as such. To save yourself time, most applications will allow you to only skin your mesh to certain joints. The joints we wanted to affect the suit top were only upper/lower torso, upper/lower arms, and the head. Not binding to the whole body saved time removing unnecessary weighting.

<img
  alt="Maya Character Vertex Influences Example 1"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Vertex-Influence-Example-1.png"
  width="80%" />

Much like the body, though, you'll want to skin this so it bends naturally given its material. This meant for the middle plastic section, we had a solid weighting to the upper torso.

Since the gloves were going to be rigid, and the suit top stopped well above the wrist, we didn't feel it was necessary for it to bend with the hands.

<img
  alt="Maya Character Vertex Influences Example 2"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Vertex-Influence-Example-2.png"
  width="80%" />

Once skinning on the suit top was done, we simply repeated the same procedure on the pants to get them ready for Studio and bringing into the engine!

### Import to Studio

When the clothing looked good in our DCC application and in Studio, we were ready to import it into Studio and use the Accessory Tool, an upcoming release which will help you refine the clothing's cages to get the best fit possible. The tool can also export clothing as an accessory, which lets you add your clothing to a character.

In Studio, we named our Layered Clothing items with an LC\_ prefix, so we could distinguish between them and legacy style accessories (the helmet and backpack parts of the suit).

<img
  alt="Accessories in the Studio Explorer"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Accessories-In-Explorer.png"
  width="320" />

## Build the helmet

The helmet is an important element of the suit. We wanted users to see the character's face and also capture the sheen of the helmet's glass surface.

<img
  alt="Helmet Glass Surface Render"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Glass-Surface-Example.png"
  width="80%" />

Accessories where we don't want deformation to fit the head, like this helmet, are best built as "hardpoint" accessories, which are the types of accessories that you currently find in the Marketplace. The main difference with the helmet and what you find in the Marketplace is that it uses `Class.SurfaceAppearance`, which creates convincing plastic and metal looks and gives the helmet visor some transparency.

### Make the model

To build a helmet model:

1. We established a good silhouette when we placed the helmet on the character's head.
   <img
     alt="Helmet Silhouette"
     src="../../assets/resources/beyond-the-dark/layered-clothing/Helmet-Silhouette.png"
     width="80%" />

2. We reused the trim maps from the space station to keep the amount of textures to a minimum. We modeled the helmet with enough separate sections so we could place the UVs to best utilize the texture maps.
   <img
   alt="Helmet Texture Maps"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Helmet-Texture-Map.png"
   width="80%" />

3. We then used the same trim maps we used in many areas of the station.

   <GridContainer numColumns="2">
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Trim-Map-Texture-1.png" />
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Trim-Map-Texture-2.png" />
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Trim-Map-Texture-3.png" />
     <img src="../../assets/resources/beyond-the-dark/layered-clothing/Trim-Map-Texture-4.png" />
   </GridContainer>

### Import to Studio

When we had the helmet roughly fitted and placed in our DCC application, we could then import it into Studio with all the effects we wanted.

1. We initially imported the helmet using the **Asset Manager**, but because it's a single mesh, you can also drop a `Class.MeshPart` into your place and specify the MeshId using the **Properties** window.
   <img
   alt="Importing Helmet Mesh"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Importing-Helmet-Mesh.jpeg"
   width="80%" />

2. We then added the texture maps via a `Class.SurfaceAppearance` object on the mesh part. This process took some tuning to get the ideal alpha on the color (albedo) map, so you could see through the helmet without it being fully transparent.

   <img
   alt="Texturing Helmet Mesh"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Adding-Surface-Appearance.jpeg"
   width="80%" />

3. Because we wanted some suits to be clean and some to be dirty without having to use multiple textures, we added decals to the same object to create this effect. Decals work by planar projecting onto each surface.

   <img
   alt="Adding Additional Textures Helmet Mesh"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Adding-Surface-Appearance-2.jpeg"
   width="80%" />

4. We wanted a light beam and light to indicate which way the user was facing in dark rooms and to illuminate the areas that they're walking through. To do this, we used attachments, because you can add an arbitrary amount of them, and because they're not parts, they're valid in accessories. You can use attachments for particle effects, beams, or lights as in the following example.

   <img
   alt="Adding Lighting to Helmet Mesh"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Helmet-Attachments.jpeg"
   width="80%" />

### Introduce the accessory tool

<Alert severity="info"> See [Accessory Fitting Tool](../../art/accessories/accessory-fitting-tool.md) for more information on converting a mesh or model to an `Class.Accessory`. </Alert>

With so many components being built in parallel, it can be a little hard to know if your assets fit exactly and look the way you want. However, with the upcoming Accessory Tool, fitting and refining clothing is much easier. We used this tool to set up the character's top and bottom, as well as the hardpoint helmet and backpack accessories.

<img
  alt="Character and Suit Overview"
  src="../../assets/resources/beyond-the-dark/layered-clothing/Character-And-Suit-Overview.png"
  width="80%" />

Here's a summary of using the Accessory Tool for layered clothing:

1. We first fitted the suit's top to the character. Luckily, the fit was great and our inner cage conformed to the body well. We also tested the outer cage with other clothing items. When we were happy with the fit, we used the tool to generate the appropriate accessory for the Marketplace.

   <img
   alt="Using Accessory Fitting Tool Mannequin"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Accessory-Tool-Mannequin.png"
   width="80%" />

2. With the suit's bottom, we wanted to adjust the fit within Studio because they were initially too bulky. Using the point editor, we nudged things to get them into position. Like the suit top, we made it into an accessory.

   <img
   alt="Adjusting Layered Clothing with Accessory Fitting Tool"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Accessory-Fitting-Tool-Adjustments.png"   width="80%" />

3. For the helmet and backpack, we adjusted these by just scaling, rotating, and moving them where we wanted, because they don't have cages.

   <img
   alt="Adjusting Layered Clothing Helmet with Accessory Fitting Tool"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Accessory-Fitting-Tool-Adjustments-2.png"
   width="80%" />

4. Seeing how the helmet fits without the rest of the suit is tricky, so we used the Accessory Tool to visualize the top and bottom of the suit. This allowed us to ensure the fit would align with the suit's top.

   <img
   alt="Adjusting Layered Clothing Helmet with Accessory Fitting Tool"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Accessory-Fitting-Tool-Adjustments-3.png"
   width="80%" />

5. With the helmet, backpack, top, and bottom complete, we were ready to see how this character looked in our space station. We copied and pasted the accessories onto the character and were able to see how they fit. We then placed the character in our place file and confirmed all the materials, lighting, and other effects were exactly the way we wanted.

   <img
   alt="Layered Clothing Accessories Final Render"
   src="../../assets/resources/beyond-the-dark/layered-clothing/Helmet-Equipped-Final.png"
   width="80%" />
