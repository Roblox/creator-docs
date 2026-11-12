---
title: Onboarding for artists
description: Engine requirements and conventions that artists new to Roblox need to know for materials, meshes, lighting, characters, rigs, animation, props, terrain, effects, and audio.
---

This page summarizes, at a high level, the engine requirements and conventions that matter most to artists coming from other engines, and each section links to the detailed specifications.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/modeling/surface-appearance/SurfaceAppearance-Example-1.jpg" alt="A realistic leafy bush with PBR textures." />
  </figure>
  <figure>
    <img src="../assets/modeling/surface-appearance/SurfaceAppearance-Example-3.jpg" alt="A realistic mossy rock with PBR textures." />
  </figure>
</GridContainer>

## PBR and materials

Roblox uses a **metalness and roughness** PBR workflow, not a specular and glossiness workflow. A full PBR material uses these texture maps:

- **Color (albedo)**, with an optional alpha channel for transparency.
- **Normal**, in OpenGL tangent-space format (Y+), with a MikkTSpace tangent basis.
- **Roughness**.
- **Metalness**.

For formats, resolutions, and channel details, see [Texture specifications](../art/modeling/texture-specifications.md) and [Surface appearance](../art/modeling/surface-appearance.md).

Materials on Roblox come in two forms:

- A **material**, set on a part or with a custom `Class.MaterialVariant`, defines how a surface looks and how it behaves physically, including density, friction, elasticity, and sound. For details, see [Materials](../parts/materials.md).
- A `Class.SurfaceAppearance` defines only how a mesh looks. Use it for detailed surfaces like characters and hero props, where the appearance matters more than physical behavior.

Each triangle can only have one material. If a mesh needs several materials, such as skin and cloth on a character, split it into separate meshes by material.

## Meshes

- **Triangle budget:** An individual mesh can't exceed 20,000 triangles, which is about 65,535 vertices, and avatar items have their own, lower budgets. If you import a mesh over the limit, Studio automatically decimates it to fit, so reduce the triangle count yourself if you want to control the result. For all requirements, see [Mesh specifications](../art/modeling/specifications.md).
- **Size:** Each dimension of a `Class.MeshPart` can be at most 2,048 studs. Studio automatically scales down larger imports to fit, so split very large environment pieces into meshes no bigger than 2,048 studs in any dimension.
- **Level of detail:** Each mesh's `Class.MeshPart.RenderFidelity|RenderFidelity` lowers its [level of detail](../parts/meshes.md#level-of-detail) automatically as it moves away from the camera. In games that use [instance streaming](../workspace/streaming/index.md), [SLIM](../workspace/streaming/slim.md) can also generate and render lightweight versions of models when they're outside the streaming radius.

<img src="../assets/art/Basic-Mesh-Combined-Example.png" width="600" alt="A tree mesh and its texture maps combined to create a single tree." />

## Lighting

Set the overall look with `Class.Lighting.LightingStyle`:

- `Enum.LightingStyle.Realistic|Realistic` produces naturalistic lighting and generates shadows and ambient occlusion dynamically. It doesn't use baked shadows or baked ambient occlusion.
- `Enum.LightingStyle.Soft|Soft` produces a stylized, softer, more ambient look with less precise lights.

Roblox scales lighting quality automatically. As performance demands it, devices fall back to the lower-cost Soft lighting path, which happens most often on low-end mobile devices. `Class.Lighting.PrioritizeLightingQuality` controls whether lighting quality or view distance scales down first. For all lighting properties, see [Lighting](../environment/lighting.md).

- **Interiors** get dynamic reflections from automatically generated probes, which mostly affect reflections and, to a lesser degree, diffuse lighting.
- **Exteriors** rely on lights, the [skybox](../environment/skybox.md), and [atmosphere](../environment/atmosphere.md) rather than a dynamic reflection system.
- **Small or thin details**, like a hood over a face, might not cast reliable self-shadows. To guarantee the look you want, bake critical self-shadowing and ambient occlusion into the color map.

## Characters

There are two kinds of characters:

- **Platform avatars** follow Roblox's avatar requirements for polygon count, skeleton, materials, and attachments. They work across games and can use the clothing and accessories that players bring with them. For requirements, see [Character body specifications](../avatar/character-bodies/specifications.md).
- **Custom characters** don't have to follow avatar requirements. Their rigs can be arbitrary, and their budgets are the same as any other mesh.

Platform avatars use the **R15** rig, which has 15 body parts that each correspond to one joint. This one-to-one mapping lets players swap individual body parts from the Marketplace. Avatars also use **cages**, standard meshes that describe the surface of a character, so that [layered clothing](../avatar/layered-accessories/specifications.md) can stretch to fit any body.

For more articulation, **advanced R15** rigs, sometimes called R15+, support up to 37 additional optional bones, such as fingers, clavicles, and spine joints. They build on the standard R15 rig, so they use the same tech stack. For the required hierarchy and naming, see [Advanced R15 rigs](../avatar/character-bodies/specifications.md#advanced-r15-rigs). Custom characters aren't limited to R15 at all; their joint count and structure are limited only by performance on your target devices.

<img src="../assets/modeling/surface-appearance/Layered-Clothing-Example.png" width="500" alt="A Roblox avatar wearing a glossy puffy jacket and jeans." />

## Rigs and animation

- **Skinning:** A vertex can be influenced by at most four bones or joints. For all rigging requirements, see [Mesh specifications](../art/modeling/specifications.md#rigging-and-skinning).
- **Physics:** Joints, parts, and mesh parts can be physically simulated, but there's no cloth simulation.
- **Facial animation:** Facial animation is joint-based. Heads animate with facial joints and skinning, posed to match the Facial Action Coding System (FACS), and Roblox doesn't support blend shape animation. For details, see [Dynamic heads](../avatar/dynamic-heads/index.md).

### Animation workflow

- **Import from your modeling tool:** An `.fbx` export can include one animation track. To bring in several animations, export each one separately. For requirements, see [Animations](../art/modeling/specifications.md#animations).
- **Animate in Studio:** The [Animation Editor](../animation/editor.md) creates keyframe animations on any rig, with [inverse kinematics](../animation/inverse-kinematics.md) and a [curve editor](../animation/curve-editor.md). [Animation capture](../animation/capture.md) generates body and face keyframes from recorded or uploaded video.
- **Play animations in a game:** After you publish an animation, play it from a script or replace a character's default animations. For details, see [Use animations](../animation/using.md).
- **Build animation logic:** The [Animation Graph Editor](../animation/graph-editor.md) builds behaviors like blend trees in a node-based editor instead of scripts.

## Asset workflow for teams

Teams commonly keep the canonical versions of characters, building kits, and set dressing as [packages](../projects/assets/packages.md) in a dedicated assets place. Artists edit the packages there, and every place that uses them can update to the latest version. After a lead approves a change, artists copy it into the shared dev place or publish the package update. For the full team setup, see [Environments](../projects/file-based-workflows.md#environments).

## Environment props

- **Import and iterate:** Bring props in with the [3D Importer](../studio/importer.md). When you change a prop in your modeling tool, use [Reimport](../art/modeling/reimport.md) to update the existing instances and textures in place, with the same import settings.
- **Collision:** Set each mesh's [collision fidelity](../parts/meshes.md#collision-fidelity) to the simplest shape that works. **Box** suits small or non-interactive objects, **Hull** suits shapes without deep cavities, and **Default** supports concave shapes.
- **Surfaces:** Use a `Class.SurfaceAppearance` for detailed, unique props, and a [material](../parts/materials.md) or `Class.MaterialVariant` for tiling surfaces like walls and floors.
- **Reuse:** Turn props that appear in many places into packages so that every copy updates together. For the team setup, see [Asset workflow for teams](#asset-workflow-for-teams).

## Terrain

Terrain is a grid of **voxels**, 4&times;4&times;4 stud cells that each have a material. Sculpt and paint it with the [Terrain Editor](../studio/terrain-editor.md), generate it from [heightmaps and colormaps](../parts/terrain.md#heightmaps-and-colormaps), or create it from scripts.

- **Materials:** Terrain comes with a set of default materials. You can also paint [custom terrain materials](../parts/custom-terrain-materials.md), or apply [custom materials](../parts/materials.md#custom-materials) as overrides.
- **Appearance:** You can adjust terrain colors, water appearance, and grass animation. For all options, see [Environmental terrain](../parts/terrain.md).

## Visual effects

Effect objects render when you parent them to a part or an attachment. For an overview, see [Effects](../effects/index.md).

- **[Light sources](../effects/light-sources.md):** Point, spot, and surface lights.
- **[Particle emitters](../effects/particle-emitters.md):** Particles such as fire, smoke, sparks, and magic. A [flipbook](../effects/particle-emitters.md#flipbooks) texture animates a particle over its lifetime, with a 2&times;2, 4&times;4, 8&times;8, or custom frame layout. Leave space between frames. Clients turn off flipbooks when they're low on memory, so reuse flipbook textures and keep their resolution as low as you can.
- **[Beams](../effects/beams.md)** and **[trails](../effects/trails.md):** Textures drawn between two attachments, or between and behind two attachments as they move.
- **[Highlights](../effects/highlighting.md):** Outlines and fills that draw attention to objects.
- **Screen and sky effects:** [Post-processing effects](../environment/post-processing-effects.md), [atmosphere](../environment/atmosphere.md), and the [skybox](../environment/skybox.md) set the overall mood.

## Audio

- **Import requirements:** An audio file must be a single track in `.mp3`, `.ogg`, `.wav`, or `.flac` format, less than 20 MB and 7 minutes long, with a sample rate of 48 kHz or less. ID-verified creators can import 2,000 audio assets every 30 days, and unverified creators can import 100. For details, see [Audio assets](../audio/assets.md).
- **Licensed library:** The Creator Store has more than 100,000 free, professionally produced sound effects and music tracks from audio and music partners.
- **Playback:** [Audio objects](../audio/objects.md) play sounds positionally in the world or non-positionally, and [audio effects](../audio/effects.md) process them, such as with reverb or equalization. For an overview, see [Audio](../audio/index.md).
- **Authoring:** For tips on creating sounds in a digital audio workstation, see [Reaper](../art/reaper.md).

## Plugins and tools

You can install community plugins from the [Creator Store](../production/creator-store.md#find-assets), or build your own. For details, see [Studio plugins](../studio/plugins.md). Roblox also provides these tools for artists:

- **[Avatar Setup](../avatar-setup/index.md):** Processes custom models into avatar bodies and accessories, adding the components they need.
- **[Reimport](../art/modeling/reimport.md):** Updates imported meshes and textures in place from your source files.
- **[Project files](../art/modeling/project-files.md):** Blender, Maya, and `.fbx` templates and reference files.
