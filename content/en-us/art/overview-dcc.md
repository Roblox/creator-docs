---
title: Working With Third-Party Software
description: An overview of how to incorporate content created from other software into Studio.
---

Creators on Roblox often leverage third-party creation tools to make custom assets and content. These external tools typically specialize in areas like **3D modeling**, **texture creation**, or **audio editing**, and offer additional features and flexibility that complement the Roblox engine. Check out [Roblox Staff 3D art articles](https://devforum.roblox.com/tags/c/resources/roblox-staff/278/art) for guides, tips, and tutorials on using various third-party software.

In most workflows, you create custom assets in [third-party software](#examples-of-third-party-software), export them as a common file type, and then [import the file into Studio](#importing-to-studio).

## Examples of Third-Party Software

The following are examples of third-party software that creators commonly use:

- **3D Modeling Software**

  - Creators use external 3D modeling software such as [Blender](https://www.blender.org/), [Maya](https://www.autodesk.com/products/maya/overview), or [Cinema 4D](https://www.maxon.net/en/cinema-4d) to design intricate and detailed 3D models. These models can include characters, props, and environmental assets.

- **Image Editors and Texture Creation Tools**

  - Graphics designers and texture artists can use tools like [Photoshop](https://www.adobe.com/products/photoshop) or [Substance Painter](https://www.adobe.com/products/substance3d-painter) to create high-quality images. You can use these images for graphic interfaces or as textures for your 3D models. These tools allow for detailed painting, mapping, and manipulation of textures to achieve realistic or stylized effects.

- **Audio Editing Software**

  - Creators working on sound design or music for their Roblox games might use external audio editing software like [Audacity](https://www.audacityteam.org/) or [Reaper](https://www.reaper.fm/). These tools allow for precise control when creating audio assets.

By using third-party software, creators can tap into specialized features, workflows, and expertise, while expanding their creative possibilities and enhancing the overall quality of their Roblox experiences.

## Importing to Studio

Studio provides several tools to get your third-party content into Studio depending on the type of asset you upload:

- Models

  - Uploaded models must follow Studio's [Model Specifications](../art/modeling/specifications.md).
  - Studio's [3D Importer](../art/modeling/3d-importer.md) supports `.gltf`, `.fbx`, `.obj` file formats.
  - You can also use tools like the [Roblox Blender Plugin](../art/modeling/roblox-blender-plugin.md) to connect your modeling software to Studio and directly upload your modeling assets between applications.

- Images

  - Uploaded textures must follow Studio's [Texture Specifications](../art/modeling/specifications.md).
  - Studio's [Asset Manager](../projects/assets/manager.md) supports `.png`, `.jpg`, `.tga`, or `.bmp` file formats and allows for bulk file imports.

- Sounds

  - Uploaded sounds must follow Roblox's [Sound Requirements](../sound/assets.md#requirements).
  - Studio's [Asset Manager](../projects/assets/manager.md) supports `.mp3`, and `.ogg` file formats and allows for bulk file imports.

<Alert severity ='warning'>
Roblox performs asset moderation on upload of any asset type. Roblox can also moderate assets after the initial upload. For more information, see [Asset Moderation](../projects/assets/index.md#asset-moderation).
</Alert>
