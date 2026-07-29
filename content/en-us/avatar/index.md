---
title: Avatar, a system of expression
description: Create and upload avatar characters, cosmetics, clothing, and accessories to the Marketplace.

hideInPageNavigation: true
---

Every Roblox user is represented by an **avatar** — a fully customizable 3D character with cosmetics, clothing, and accessories that persist across games on the platform. At their core, avatars are deeply personal because they symbolize one's digital identity, uniquely crafted by individual purchases on the [Marketplace](https://www.roblox.com/catalog) or in experiences, or from giveaways.

Each avatar is a system of components that work together to create a character that can interact with objects in the 3D space and wear cosmetics, clothing, and accessories. Broadly speaking, you can separate these components into those that make up **who you are** and **what you wear**. Let's break it down.

## Who you are

There are four main layers of the avatar body that structure how the character looks and moves on the platform:

<Grid container spacing={2}>
  <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#geometry"><Typography variant='buttonLarge'>Geometry</Typography></a><br />
        <Typography variant='body1'>The avatar's visual appearance.</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#rigging-armature"><Typography variant='buttonLarge'>Rigging armature</Typography></a><br />
        <Typography variant='body1'>How the avatar moves.</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#animations"><Typography variant='buttonLarge'>Animations</Typography></a><br />
        <Typography variant='body1'>How the avatar expresses their personality.</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#attachment-points-and-cage-meshes"><Typography variant='buttonLarge'>Attachment points and cage meshes</Typography></a><br />
        <Typography variant='body1'>How the avatar attaches accessories and wears clothing.</Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>
<br />

While you can create each of these layers manually, some have strict configuration requirements to meet Roblox's technical [character specifications](../avatar/character-bodies/specifications.md) that guarantee your avatar behaves consistently from game to game. To assist your creative process and ensure your avatars meet these specifications, Roblox provides the following:

- [Avatar Setup](../avatar-setup/index.md) - Automatically processes 3D custom assets into avatar assets with all essential components for publishing to the Marketplace.
- [Avatar references](../avatar/resources.md#references) with geometry and rigging armatures.
- [Project files](../avatar/resources.md#project-files) for base rigs, attachment points, and cage meshes you can use in third-party modeling software.
- [Mannequins](../avatar/resources.md#mannequin-models) you can use as a sizing reference.
- [Customizable character templates](../avatar/resources.md#templates) with pre-baked avatar components.

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Geometry

The avatar's [physical body](../avatar/character-bodies/index.md) geometry is made up of 15 separate mesh body parts that define the shape and contours of the character:

- Head
- Upper and lower torso
- Left upper arm, lower arm, and hand
- Right upper arm, lower arm, and hand
- Left upper leg, lower leg, and foot
- Right upper leg, lower leg, and foot

When users purchase an avatar body, they can either equip it as a set or mix-and-match individual body parts from other purchases.

<Alert severity = 'info'>
In Studio, these body parts are represented as `Class.MeshPart` objects and are nested under a single `Class.Model`.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../art/characters/creating/modeling-best-practices.md" >
Create your first avatar body
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel src="../assets/avatar-anatomy/static-sections/geometry.png" alt="Avatar body geometry" scale={0.92} >
</MediaPanel>
</Grid>
</Grid>

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Rigging armature

Inside of the avatar's physical body is a non-rendered [rigging armature](../avatar/character-bodies/specifications.md#rigging) that allows the character to articulate its limbs.  Often referred to as joints or bones, rigging armature includes skinning data that allows connections between limbs to bend organically, such as the character's knees and elbows.

Standard avatar rigs, often referred to as R15 rigs, require 15 poseable joints to articulate the character's 15 body parts. However, if you want to create higher-fidelity rigs with a greater level of realism, there are up to 37 additional optional joints you can create for articulated hands, shoulders, and spine movements. Each joint must follow a specific hierarchy and naming convention for the avatar to function properly in Studio and on the Marketplace.

If your avatar's geometry doesn't have a rigging armature, Roblox provides [Avatar Setup](../avatar-setup/index.md), a tool that automatically generates a Marketplace-ready rig to the character's body model to enable movement and animation.

<Alert severity = 'info'>
In Studio, each joint of the rigging armature is represented by `Class.Bone` objects that connect the character's `Class.MeshPart` objects together.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../art/accessories/rig-and-cage-existing-models.md" >
Create your first character rig on an existing model
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel src="../assets/avatar-anatomy/static-sections/rigging.png" alt="Avatar rigging armature" scale={0.92} >
</MediaPanel>
</Grid>
</Grid>

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Animations

Using the avatar's rigging armature or face bones with [Facial Action Coding System](../avatar/dynamic-heads/facs-poses-reference.md) (FACS) data, you can create poses and interpolate between them to create the following types of custom animations:

- **Emotes** - [Full body animations](../avatar/emotes/index.md) that players purchase from the Marketplace to communicate and celebrate with others in a game, such as gestures, reactions, and dances.
- **Facial expressions** - [Facial animations](../art/characters/facial-animation/animate-heads.md) with the character's eyes, mouth, and teeth that players use to express emotions.

Roblox provides the following tooling to make the avatar animation process easier:

- [Avatar Setup](../avatar-setup/index.md) - Automatically generate FACS poses, facial rigging, skinning, and animation data required for facial animation and avatar chat.
- [Adaptive Animation](../characters/adaptive-animation.md) - Customize, modify, and map joints so that animations can play seamlessly between characters with unique body types, rigging armatures, and proportions.
- [Animation Editor](../animation/editor.md) - Manually animate the rig by creating poses on different keyframes.
- [Animation Capture](../animation/capture.md) - Record or upload video content to capture movement and expressions as keyframes.
- [Face Animation Editor](../art/characters/facial-animation/animate-heads.md#use-the-face-animation-editor) - Use facial sliders to automatically create keyframes as you adjust sliders for different facial features.

<Alert severity = 'info'>
In Studio, each emote is represented by an `Class.Animation` object with its `Class.Animation.AnimationId|AnimationId` property set to the assetID of your animation sequence, and FACS values map directly to a dynamic head's `Class.FaceControls` object values.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../tutorials/use-case-tutorials/animation/create-an-animation.md" >
Create your first full body animation
</Button>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../art/characters/facial-animation/create-basic-heads.md" >
Create your first dynamic head
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel src="../assets/avatar-anatomy/static-sections/geometry.png" alt="Avatar body geometry" scale={0.92} >
<MediaPanelOption id="walk" label="Walk animation" gif="../assets/avatar-anatomy/avatar-walk.gif" poster="../assets/avatar-anatomy/avatar-walk-poster.png" scale={2.8} alt="Avatar walk cycle" />
<MediaPanelOption id="shrug" label="Shrug emote" gif="../assets/avatar-anatomy/shrug-emote.gif" poster="../assets/avatar-anatomy/shrug-emote-poster.png" scale={2.5} alt="Avatar shrug emote" />
<MediaPanelOption id="floss" label="Floss dance emote" gif="../assets/avatar-anatomy/floss-dance-emote.gif" poster="../assets/avatar-anatomy/floss-dance-emote-poster.png" scale={2.3} alt="Avatar floss dance emote" />
<MediaPanelOption id="facial" label="Facial expressions" gif="../assets/avatar-anatomy/facial-expressions.gif" poster="../assets/avatar-anatomy/facial-expressions-poster.png" scale={2.5} alt="Avatar facial expressions" />
</MediaPanel>
</Grid>
</Grid>

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Attachment points and cage meshes

Outside of the avatar's physical body are two types of non-rendered components that allow the character to attach accessories to the body and wear clothing:

- **Attachment points** - Sets the specific points where accessories and in-game equipable objects attach to the character's body.
- **Cage meshes** - Sets the outer boundary for clothing to stretch and fit over the character's body.

If your avatar's geometry doesn't have attachment points or cage meshes, Roblox provides [Avatar Setup](../avatar-setup/index.md), a tool that automatically adds the required attachment points and cage meshes to your avatar. In addition, there are downloadable Blender, Maya, and `.fbx` [project files](../avatar/resources.md#project-files) you can use to ensure you're using standard attachment points and cage meshes for humanoid bodies.

<Alert severity = 'info'>
In Studio, outer cage mesh objects are represented by a `Class.WrapTarget` object, and attachment points are represented as `Class.Attachment` objects.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../art/accessories/rig-and-cage-existing-models.md" >
Edit your first cage meshes on an existing model
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel src="../assets/avatar-anatomy/static-sections/cages-attachments.png" alt="Avatar cage meshes and attachment points" scale={0.92} >
</MediaPanel>
</Grid>
</Grid>

## What you wear

There are four main layers of what avatars can wear to express their unique style:

<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={3} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#makeup"><Typography variant='buttonLarge'>Makeup</Typography></a><br />
        <Typography variant='body1'>2D cosmetic items you can apply to the character's face.</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} md={3} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#rigid-accessories"><Typography variant='buttonLarge'>Rigid accessories</Typography></a><br />
        <Typography variant='body1'>3D cosmetic items that attach on the character's body, such as hats, weapons, and props.</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} md={3} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#layered-accessories"><Typography variant='buttonLarge'>Layered accessories</Typography></a><br />
        <Typography variant='body1'>3D cosmetic items that stretch and fit over the character's body, such as pants, t-shirts, and jackets.</Typography>
      </CardContent>
    </Card>
  </Grid>
  <Grid item xs={12} sm={6} md={3} style={{ display: 'flex' }}>
    <Card style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent style={{ flex: 1 }}>
        <a href="#classic-clothing"><Typography variant='buttonLarge'>Classic clothing</Typography></a><br />
        <Typography variant='body1'>2D cosmetic images that wrap around the character's body.</Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>
<br />

Each of these layers have strict requirements so that users can equip these items to characters of various shapes and sizes.

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Makeup

[Makeup](../avatar/makeup/index.md) is a facial cosmetic item for additional creative expression, such as face paint, battle markings, camouflage, and traditional makeup art like eyeshadow, lipstick, and blush. Users can purchase makeup as a set on the Marketplace and apply it as a complete cohesive look, or swap out individual makeup components for others that match their own avatar's style.

Roblox provides [makeup templates](../avatar/makeup/index.md#resources) that you can use within your creation process, such as:

- Template textures that you can use in 2D editing software to author makeup.
- Template heads that you can use to view and test your makeup before export.
- A reference experience you can use to import and test your makeup assets on characters with different skin tones and body types.

You can either use these templates as a pure reference to see how everything works, or you can use all of them at each step of your creation process.

<Alert severity = 'info'>
In Studio, makeup is made up of multiple specialized texture layers baked into a `Class.Decal` object, and each texture layer contains a unique makeup component like the lips or eyes region.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../avatar/makeup/index.md" >
Create your first makeup look
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel>
<MediaPanelVariant src="../assets/avatar-anatomy/makeup/no-makeup.png" alt="Avatar without makeup" scale={0.88} />
<MediaPanelVariant lips src="../assets/avatar-anatomy/makeup/lips-only.png" alt="Avatar with lip makeup" scale={0.88} />
<MediaPanelVariant eyes src="../assets/avatar-anatomy/makeup/eyes-only.png" alt="Avatar with eye makeup" scale={0.88} />
<MediaPanelVariant lips eyes src="../assets/avatar-anatomy/makeup/lips-eyes.png" alt="Avatar with lip and eye makeup" scale={0.88} />
<MediaPanelVariant face src="../assets/avatar-anatomy/makeup/face-only.png" alt="Avatar with face makeup" scale={0.88} />
<MediaPanelVariant lips face src="../assets/avatar-anatomy/makeup/lips-face.png" alt="Avatar with lip and face makeup" scale={0.88} />
<MediaPanelVariant eyes face src="../assets/avatar-anatomy/makeup/eyes-face.png" alt="Avatar with eye and face makeup" scale={0.88} />
<MediaPanelVariant lips eyes face src="../assets/avatar-anatomy/makeup/lips-eyes-face.png" alt="Avatar with full makeup" scale={0.88} />
</MediaPanel>
</Grid>
</Grid>

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Rigid accessories

[Rigid accessories](../avatar/rigid-accessories/index.md) attach to the avatar according to the attachment points around the character's body. When users purchase rigid accessories on the Marketplace, they can adjust the position and rotation of the item away from the attachment point according to their avatar's body type.

Roblox provides a [step-by-step tutorial](../art/accessories/creating-rigid/index.md) on how to convert your custom 3D models into rigid accessories, as well as the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) in Studio to test and edit your custom 3D models on multiple combinations of character bodies, animations, and accessories.

<Alert severity = 'info'>
In Studio, rigid accessories are represented as `Class.Accessory` objects.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../art/accessories/creating-rigid/index.md" >
Create your first rigid accessory
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel>
<MediaPanelVariant src="../assets/avatar-anatomy/rigid-accessories/no-accessories.png" alt="Avatar without rigid accessories" scale={0.88} />
<MediaPanelVariant neck src="../assets/avatar-anatomy/rigid-accessories/neck-only.png" alt="Avatar with neck accessory" scale={0.88} />
<MediaPanelVariant back src="../assets/avatar-anatomy/rigid-accessories/back-only.png" alt="Avatar with back accessory" scale={0.88} />
<MediaPanelVariant neck back src="../assets/avatar-anatomy/rigid-accessories/neck-back.png" alt="Avatar with neck and back accessories" scale={0.88} />
<MediaPanelVariant waist src="../assets/avatar-anatomy/rigid-accessories/waist-only.png" alt="Avatar with waist accessory" scale={0.88} />
<MediaPanelVariant neck waist src="../assets/avatar-anatomy/rigid-accessories/neck-waist.png" alt="Avatar with neck and waist accessories" scale={0.88} />
<MediaPanelVariant back waist src="../assets/avatar-anatomy/rigid-accessories/back-waist.png" alt="Avatar with back and waist accessories" scale={0.88} />
<MediaPanelVariant neck back waist src="../assets/avatar-anatomy/rigid-accessories/neck-back-waist.png" alt="Avatar with neck, back, and waist accessories" scale={0.88} />
</MediaPanel>
</Grid>
</Grid>

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Layered accessories

[Layered accessories](../avatar/layered-accessories/index.md), often referred to as layered clothing, stretch and fit on the avatar according to their rigging armature and cage meshes. When users purchase layered accessories on the Marketplace, they expect it to move with the character's animations and layer appropriately on top of existing clothing the character is wearing.

Roblox provides a [step-by-step tutorial](../art/accessories/creating/index.md) on how to create a Studio-ready layered t-shirt in Blender, as well as the [Accessory Fitting Tool](../avatar/accessory-fitting-tool.md) in Studio to test and edit your custom 3D models on multiple combinations of character bodies, animations, and accessories.

<Alert severity = 'info'>
In Studio, layered accessories are represented as `Class.Accessory` objects with a child `Class.WrapLayer` object.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../art/accessories/creating/index.md" >
Create your first layered accessory
</Button>
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel src="../assets/avatar-anatomy/layered-accessories/no-clothing.png" alt="Avatar without layered clothing" scale={0.88} >
<MediaPanelOption id="jacket-1" label="Jacket 1" src="../assets/avatar-anatomy/layered-accessories/jacket-1.png" alt="Avatar wearing jacket 1" scale={0.88} />
<MediaPanelOption id="jacket-2" label="Jacket 2" src="../assets/avatar-anatomy/layered-accessories/jacket-2.png" alt="Avatar wearing jacket 2" scale={0.88} />
<MediaPanelOption id="jacket-3" label="Jacket 3" src="../assets/avatar-anatomy/layered-accessories/jacket-3.png" alt="Avatar wearing jacket 3" scale={0.88} />
<MediaPanelOption id="jacket-4" label="Jacket 4" src="../assets/avatar-anatomy/layered-accessories/jacket-4.png" alt="Avatar wearing jacket 4" scale={0.88} />
</MediaPanel>
</Grid>
</Grid>

<Grid container spacing={3} alignItems="stretch" style={{ marginTop: 24, marginBottom: 24 }}>
<Grid item xs={12} lg={6}>

### Classic clothing

[Classic clothing](../avatar/classic-clothing.md) wraps around specific areas of the avatar's body, such as their front torso for t-shirts or their torso and legs for pants. This is the most basic type of avatar item to sell on Roblox as you just need an image editor and web browser for the creation process.

Roblox provides a [step-by-step video tutorial](https://www.youtube.com/watch?v=r_unfGZT5Ps) on how to create a Studio-ready classic t-shirt using GNU Image Manipulation Program (GIMP), a free, third-party image editor.

<Alert severity = 'info'>
In Studio, classic clothing is represented as `Class.ShirtGraphic` objects for t-shirts, `Class.Shirt` objects for shirts, and `Class.Pants` objects for pants.
</Alert>

<Button
style={{ marginTop: 8, marginRight: 24 }}
variant="contained"
color="primary"
size="large"
href="../avatar/classic-clothing.md" >
Create your first classic clothing item
</Button>

<br /><br /><br /><br /><br /><br /><br />
</Grid>
<Grid item xs={12} lg={6} style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 'min(70vh, 640px)' }}>

<MediaPanel>
<MediaPanelVariant src="../assets/avatar-anatomy/classic-clothing/no-clothes.png" alt="Avatar without classic clothing" scale={0.88} />
<MediaPanelVariant shirt src="../assets/avatar-anatomy/classic-clothing/shirt-only.png" alt="Avatar wearing a classic shirt" scale={0.88} />
<MediaPanelVariant pants src="../assets/avatar-anatomy/classic-clothing/pants-only.png" alt="Avatar wearing classic pants" scale={0.88} />
<MediaPanelVariant shirt pants src="../assets/avatar-anatomy/classic-clothing/all-clothes.png" alt="Avatar wearing classic shirt and pants" scale={0.88} />
</MediaPanel>
</Grid>
</Grid>
