---
title: How to sell assets on the Creator Store
description: 'Spoken captions; API names can be wrong. Covers: what you are allowed to upload, importing in Studio, a folder layout other creators can follow, Save to Roblox, finishing the listing in the Creator Dashboard.'
date: '2026-04-17'
transcript: true
related:
  - production/creator-store.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/qNocmxFyfxs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How to sell assets on the Creator Store](https://www.youtube.com/watch?v=qNocmxFyfxs), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on April 17, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Creator Store](../production/creator-store.md).

Resources: [create.roblox.com/docs/projects/assets/privacy](https://create.roblox.com/docs/projects/assets/privacy), [create.roblox.com/docs/projects/assets](https://create.roblox.com/docs/projects/assets).

## How to sell assets on the Creator Store: Intro ([0:00](https://www.youtube.com/watch?v=qNocmxFyfxs&t=0s))

Hello. This video will show you how to sell assets and manage them on the Creator Store. We'll cover importing assets to Studio, publishing your assets, and managing your assets. Before we continue, there are a handful of asset restrictions you should be aware of before uploading to the Creator Store. First, every asset that you sell on the Creator Store must adhere to the community rules, terms of use, and Digital Millennium Copyright Act. If any asset breaks these rules, the asset and your account may be subject to moderation. For paid content, you cannot distribute and price group owned assets. Paid content must be owned and uploaded by an individual account. The Creator Store also restricts certain scripting behaviors to ensure asset safety. It's a lot, so you can pause the video to read more. If you plan on selling your assets, you'll also need to opt into asset privacy. This lets you control how other creators and experiences can use and distribute your development assets on Roblox. Assets can have one of two access privacy settings.

## How to sell assets on the Creator Store: Intro ([1:00](https://www.youtube.com/watch?v=qNocmxFyfxs&t=60s))

Restricted, where creators or experiences can only use the asset after the asset owner grants permission. This also includes customers who have purchased your content. And open use, where any creator or experience can use the asset no matter how they received it. Remember to set your account uploads to be restricted if you plan to sell the content you upload. Every asset you make from models to images to mesh parts will automatically be set to open use or restricted based on your account's privacy settings.

## How to sell assets on the Creator Store: Importing assets ([1:25](https://www.youtube.com/watch?v=qNocmxFyfxs&t=85s))

With that out of the way, you're finally eligible to start importing your assets. All Creator Store listings can be imported or created using Roblox Studio. If you don't already have Studio installed, navigate to the Creator Hub and click the Studio link in the bottom left corner. When importing 3D assets to Studio, there are three main file types supported: OBJ, FBX, and glTF. To begin importing your model, click the import button located under the Home tab on the top bar. The preview window will then appear with multiple options for you to choose from. For the sake of this tutorial, we'd recommend using the Studio default settings for most options. However, it is important the creator setting is set to me in order to be able to sell an asset, as assets listed under a community cannot be sold on the Creator Store. If your asset will not need physics, we also recommend setting anchor to true so that the asset stays in place at runtime. Now, if your asset only had a color map, it likely looks perfect already. But what if you intend for it to use PBR materials? You will need to add a surface appearance to the object. You can do this by opening the insert object window, selecting the mesh, and then searching for surface appearance in the object window.

## How to sell assets on the Creator Store: Importing assets ([2:33](https://www.youtube.com/watch?v=qNocmxFyfxs&t=153s))

Click once and the object will be added to the mesh you have selected. Now, in the Properties window, you'll be able to add a color map, emissive mask, metalness map, normal map, and roughness map to your mesh. There are also three alpha modes available. Overlay, tint mask, and transparency. Overlay does as its name suggests, overlaying the color map on top of the underlying part color based on the map's alpha channel. Tint mask uses the color map's alpha channel to control the amount of surface appearance color tinting, allowing for one texture to be recolored in multiple different ways. And transparency uses the color map alpha channel to control the transparency of the surface, useful for objects like foliage.

## How to sell assets on the Creator Store: Making an asset pack ([3:12](https://www.youtube.com/watch?v=qNocmxFyfxs&t=192s))

Now, let's talk about file structure. If you plan on uploading multiple assets in a single pack, you should first arrange your file structure in a way that will make sense to other developers. The Creator Store has a few community norms that can help make this process easier for you and your customers. Here, I have a pack of blasters that has a handful of objects that need to go into `Class.ServerStorage`, as well as a script to spawn them that needs to go into Server Script Storage, and the nodes which go into Workspace. First I'm going to set up a folder with the name of the pack. Then I'm going to create three subfolders titled Workspace, `Class.ServerStorage`, and Server Script Storage. Then I'm going to place each of the finished assets into the respective folders they belong in. Then I'm going to add a blank script, name it ReadMe, and open it. I put an open comment bracket and give a brief instruction to the user who purchased the pack on how to set it up properly. Then put a close bracket and also close the script. Now, this pack is almost ready to be uploaded, but it'd be nice if we had a custom thumbnail to really make the asset look their best. To do this within Studio, position your camera in the viewport exactly how you'd like it to frame the model. Then copy and paste the camera object located in Workspace into the model and simply rename it thumbnail camera, and you're done. The default thumbnail on the website will now match what you created in Studio.

## How to sell assets on the Creator Store: Publishing assets ([4:23](https://www.youtube.com/watch?v=qNocmxFyfxs&t=263s))

Now, we're ready to publish this pack to the store. Doing so is super easy. In the Explorer window, we'll find our object, or in this case, my whole folder, which includes my entire file structure. Right-click on it, navigate to Save and Export, and click Save to Roblox. Give it a name and description, as well as select development item. Choose whether it is a model or an animation, and once again, ensure the creator is set to me to ensure you can list the asset for sale.

## How to sell assets on the Creator Store: Managing assets ([4:50](https://www.youtube.com/watch?v=qNocmxFyfxs&t=290s))

Now, if the asset is successfully created, we can use the link provided in the window to finalize the settings and list it for sale via the Creator Dashboard. Once you're on your assets dashboard page, you'll be able to access many more features than what was available in Studio. Firstly, it's important to build a captivating store page for your asset that makes sure no questions your customers have go unanswered. Make sure to write a good description if you didn't already when publishing. You can also upload a preview video or additional preview images that will help potential customers understand exactly what they're purchasing. If you have any social links, like a DevForum thread for customers to discuss and leave feedback for your content, you can add up to three here. We recommend setting up a tried Roblox preview, which can either use a Roblox provided default experience or a custom experience you have made tailored to your asset. This will allow users to see and try out the assets exactly as they operate in the engine. Finally, it's time to list your assets for sale. At the very bottom of the dashboard, you'll see an option to enable distribution on the Creator Store. Click the toggle, and then you'll see new options for US dollar pricing, as well as data sharing.

## How to sell assets on the Creator Store: Managing assets ([5:55](https://www.youtube.com/watch?v=qNocmxFyfxs&t=355s))

To set a price, you'll be able to choose from multiple preset options on the drop-down menu. Or, if you choose, you may leave the item available for free for users, which may be good for preview and demo packs of larger systems you wish to sell. It is important to note all free assets are fair use for AI training with Roblox. However, paid assets may choose to opt out of data sharing. Now that you know how to sell assets on the Creator Store, we can't wait to see where your creativity takes you.
