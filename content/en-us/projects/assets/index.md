---
title: Assets
description: An overview of how assets work on the platform.
---

Almost everything in Roblox is represented as a cloud-based asset with a unique corresponding ID. This ID is typically in the form of `rbxassetid://[ID]`, which gets applied to various instances as a property that's appropriate for that particular asset type. For example, `Class.Texture`, `Class.MeshPart`, and `Class.Sound` instances reference image, mesh, and audio assets through their respective `Class.Texture.TextureID|TextureID`, `Class.MeshPart.MeshID|MeshID`, and `Class.Sound.SoundID|SoundID` properties.

<table>
    <tbody>
        <tr>
            <td><img src="../../assets/modeling/textures-decals/Texture-Example-Grafitti04.png" width="90%" /></td>
            <td><img src="../../assets/modeling/meshes/Base-Mesh-In-Marketplace.png" width="90%" /></td>
            <td><audio controls><source src="../../assets/studio/general/Boom-Impact.mp3" type="audio/mpeg"></source></audio></td>
        </tr>
        <tr>
			<td><code>rbxassetid://7229442422</code></td>
			<td><code>rbxassetid://6768917255</code></td>
			<td><code>rbxassetid://9125402735</code></td>
        </tr>
    </tbody>
</table>

This cloud-based asset system allows you to store assets through Roblox and reuse them across the platform in various contexts, such as in different objects and places, without maintaining local copies as part of each saved Studio experience. You can find millions of project assets in the [Creator Store][CreatorMarketplaceURL], equip avatar assets in the [Marketplace][MarketplaceURL], or you can create your own assets and [import](#asset-management) them directly into Studio through the asset management tools.

When you import assets, they must pass a [moderation](#asset-moderation) check before users can see and interact with them in published experiences. After Roblox approves imported assets, you can choose to retain ownership of their usage on the platform or make them publicly available as detailed in [Asset Permissions](#asset-permissions).

## Asset Types

All [asset types](/reference/engine/enums/AssetType) available on the platform generally fall into one of three categories:

- Assets that map to project-level items. You can find and configure these assets for specific experiences on the [Creator Dashboard][CreatorDashboardURL].
- Assets that are objects, or that change the appearance or behavior of objects within places. You can [import](#asset-management) these assets or find them in the [Creator Store][CreatorMarketplaceURL].
- Assets that change the body, clothing, or animation of avatars and non-playable characters. You can find these assets in the [Marketplace][MarketplaceURL].

Every asset type works differently depending on where it lives on the platform. See the following sections for information on how to use each asset type for [experiences](#for-experiences), [places](#for-places), and [avatars](#for-avatars).

### For Experiences

There are three asset types that map to project-level items. These asset types are unique to the experience that they map to, meaning they are non-transferable to other projects.

- **Places** — Every experience has one or more [places](../../projects/index.md#places), or individual 3D worlds. Each place is represented by a [data model](../../projects/data-model.md) that describes the place's 3D world and logic.
- **Badges** — A [badges](../../production/publishing/badges.md) is a special award you can gift users when they meet a goal within an experience, such as completing a difficult objective or playing for a certain amount of time.
- **Passes** — A [pass](../../production/monetization/game-passes.md) is a monetization product that allows you to charge a one-time Robux fee in order for users to access special privileges within an experience, such as entry to a restricted area, an in-experience avatar item, or a permanent power-up.

### For Places

In general, there are two categories of asset types for places that you can either [import](#asset-management) or find in the [Creator Store][CreatorMarketplaceURL]:

- Assets that exist as objects within the data model, such as [models](../../parts/models.md) and [meshes](../../parts/meshes.md).
- Assets that you apply as an object's property, such as audio, images, fonts, and videos.

For more information on both types of these assets for places, such as where and how you can use them in Studio, reference the following table.

<table>
    <thead>
        <tr>
            <th>Asset Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>**Model**</td>
            <td>A `Class.Model` is a container object for geometric groupings such as `Class.BasePart|BaseParts`, `Class.MeshPart|MeshParts`, and other `Class.Model` objects. Models can also contain objects such as `Class.Script|Scripts`. Whenever you group objects together in Studio, they automatically become a `Class.Model` object. For more information, see [Models](../../parts/models.md).</td>
        </tr>
        <tr>
            <td>**Mesh**</td>
            <td>A `Class.MeshPart` is a type of part object that includes a physically-simulated custom mesh. For more information, see [Meshes](../../parts/meshes.md).</td>
        </tr>
        <tr>
            <td>**Audio**</td>
            <td>A `Class.Sound` object is an object that emits audio when you apply an audio asset ID within its `Class.Sound.SoundId|SoundId` property. Where you place the `Class.Sound` object in the data model changes how and where the sound emits within the experience. For more information, see [Audio Assets](../../sound/assets.md) and [Sound Objects](../../sound/objects.md).</td>
        </tr>
        <tr>
            <td>**Image**</td>
            <td>Images are used in several ways within a place, including [textures/decals](../../parts/textures-decals.md) on parts, [UI](../../ui/index.md) elements, [mesh textures](../../parts/meshes.md#adding-textures), textures for [custom materials](../../parts/materials.md), textures for [special effects](../../environment/index.md#special-effects), and more.</td>
        </tr>
        <tr>
            <td>**Font**</td>
            <td>`Class.TextButton`, `Class.TextLabel`, and `Class.TextBox` objects display typography in a specific style when you apply a font asset ID. You cannot import fonts, but the [Creator Store][CreatorMarketplaceURL] offers over 80 different fonts for your use.</td>
        </tr>
        <tr>
            <td>**Video**</td>
            <td>A `Class.VideoFrame` object displays a video through its `Class.VideoFrame.Video|Video` asset property. See [Video Frames](../../ui/video-frames.md) for more information.</td>
        </tr>
    </tbody>
</table>

### For Avatars

There are three categories of asset types for avatars that you can find in the [Marketplace][MarketplaceURL] and equip to avatars:

- **Body Parts** — Assets that represent sections of the avatar character model, such as its head, torso, or legs.
- **Clothing and Accessories** — Assets that represent clothing and accessories on top of body parts.
- **Animations** — Assets that animate the avatar character model, such as how it runs, jumps, or swims.

Every [character](../../characters/index.md) model contains a `Class.HumanoidDescription` object with asset IDs for the character's body parts, clothing, accessories, and animations. By default, a user's playable character references their personal Roblox avatar, but you can apply a custom `Class.HumanoidDescription` if desired. For more information, see [Character Appearance](../../characters/appearance.md).

## Asset Format Strings

Assets are reflected through formatted strings, each of which points to an online file or a file saved to the client's device. The basic structure is a **protocol** followed by `://` and a **string** that varies according to the protocol.

<span><Chip label='[Protocol]://[String]' color='secondary' /></span>

### rbxassetid

`rbxassetid` points to a user-uploaded asset on Roblox. This format is a common standard for properties such as `Class.Decal.Texture`, `Class.ParticleEmitter.Texture`, and `Class.Sound.SoundId`.

<GridContainer numColumns="3">
  <figure>
    <figcaption><Chip label='rbxassetid://7229442422' color='secondary' /></figcaption>
    <br />
    <img src="../../assets/modeling/textures-decals/Texture-Example-Grafitti04.png" width="90%" />
  </figure>
  <figure>
    <figcaption><Chip label='rbxassetid://3845386987' color='secondary' /></figcaption>
    <br />
    <img src="../../assets/lighting-and-effects/particle-emitter/Texture-Indicated.jpg" width="90%" />
  </figure>
  <figure>
    <figcaption><Chip label='rbxassetid://9125402735' color='secondary' /></figcaption>
    <br />
    <audio controls>
<source src="../../assets/studio/general/Boom-Impact.mp3" type="audio/mpeg"></source></audio>
  </figure>
</GridContainer>

### rbxasset

`rbxasset` points to Roblox's content folder on the user's device, for example:

<span><Chip label='rbxasset://textures/face.png' color='secondary' /></span><br />

The content folder's location depends on the user's operating system:

<Tabs>
  <TabItem label="Windows">
    `%localappdata%\Roblox\Versions\<version>\content`
  </TabItem>
  <TabItem label="Mac">
    `Applications/RobloxStudio.app/Contents/Resources/content`
  </TabItem>
</Tabs>

### rbxthumb

`rbxthumb` points to a thumbnail image for the provided asset. Its string format takes a thumbnail type, an asset ID, width, height, and an optional circular filter.

<span><Chip label='rbxthumb://type=Asset&id=24813339&w=150&h=150' color='secondary' /></span><br />

Supported types (`type`) and sizes (`w` and `h`) are as follows:

<table>
    <thead>
        <tr>
            <th>Type</th>
            <th>Supported Sizes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Asset</td>
            <td scope="row">150&times;150, 420&times;420</td>
        </tr>
        <tr>
            <td>Avatar</td>
            <td scope="row">48&times;48, 60&times;60, 100&times;100, 150&times;150, 180&times;180, 352&times;352, 420&times;420, 720&times;720</td>
        </tr>
        <tr>
            <td>AvatarBust</td>
            <td scope="row">50&times;50, 60&times;60, 75&times;75, 100&times;100, 150&times;150, 180&times;180, 352&times;352, 420&times;420</td>
        </tr>
        <tr>
            <td>AvatarHeadShot</td>
            <td scope="row">48&times;48, 60&times;60, 100&times;100, 150&times;150, 180&times;180, 352&times;352, 420&times;420</td>
        </tr>
        <tr>
            <td>BadgeIcon</td>
            <td scope="row">150&times;150</td>
        </tr>
        <tr>
            <td>BundleThumbnail</td>
            <td scope="row">150&times;150, 420&times;420</td>
        </tr>
        <tr>
            <td>FontFamily</td>
            <td scope="row">1200&times;80</td>
        </tr>
        <tr>
            <td>GameIcon</td>
            <td scope="row">50&times;50, 150&times;150</td>
        </tr>
        <tr>
            <td>GamePass</td>
            <td scope="row">150&times;150</td>
        </tr>
        <tr>
            <td>GroupIcon</td>
            <td scope="row">150&times;150, 420&times;420</td>
        </tr>
        <tr>
            <td>Outfit</td>
            <td scope="row">150&times;150, 420&times;420</td>
        </tr>
    </tbody>
</table>

You can also include a `filters=circular` parameter to crop the thumbnail circularly, useful for displaying thumbnails like **AvatarHeadShot** in an on-screen GUI like an `Class.ImageLabel`.

<span><Chip label='rbxthumb://type=AvatarHeadShot&id=505306092&w=150&h=150&filters=circular' color='secondary' /></span><br />

```lua title='LocalScript - Get AvatarHeadShot Thumbnail' highlight='3,5-7,9'
local Players = game:GetService("Players")

local userId = Players.LocalPlayer.UserId

local success, content, isReady = pcall(function()
	return Players:GetUserThumbnailAsync(userId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size150x150)
end)
if success then
	print(content)  --> rbxthumb://type=AvatarHeadShot&id=505306092&w=150&h=150&filters=circular
end
```

### rbxhttp

`rbxhttp` is shorthand for `Class.ContentProvider.BaseUrl`, for example:

<span><Chip label='rbxhttp://Thumbs/Avatar.ashx?x=100&y=100&format=png' color='secondary' /></span>

### https / http

`https` or `http` points to the exact location of something on the internet. It only works on Roblox-approved domains and raises an error if you use it elsewhere.

<span><Chip label='https://www.roblox.com/asset/?id=9723979220' color='secondary' /></span>

## Asset Permissions

An asset's privacy status determines who has permission to use the asset within their experiences. By default, all assets are **private** when you or your [group](../../projects/groups.md) members import them into Studio. If you want to grant everyone access to the asset ID, you must publish the asset to the [Creator Store][CreatorMarketplaceURL].

<Alert severity="warning">
Special privacy rules and workflows apply to **audio** and **video** assets. See [Asset Privacy](../../projects/assets/privacy.md) for details on sharing these asset types among friends and experiences.
</Alert>

## Asset Moderation

Roblox performs both human and automated asset moderation on a proactive and reactive basis to ensure assets adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), and [Digital Millennium Copyright Act](../../production/publishing/dmca-guidelines.md) (DMCA). If any asset violates these moderation policies, such as including discriminatory or adult content, the Moderation team flags and removes the asset to protect users from harmful or non-compliant content. This process generally happens within a few hours after you import the asset.

If an asset is still in the moderation queue when you publish your experience, users cannot see or interact with the asset until Roblox approves it. If the asset doesn't pass moderation, you will receive a [notification](https://en.help.roblox.com/hc/en-us/articles/360020870412-Understanding-Moderation-Messages) explaining why the asset cannot be on the platform in its current state. For more information, see Working with Assets - Asset Moderation.

<Alert severity="warning">
  To maintain community safety and civility, Roblox may take down experiences and/or terminate accounts that maliciously import or publish non-compliant assets.
</Alert>

## Asset Management

Roblox offers several tools to import, store, and publish your assets:

<table>
    <thead>
        <tr>
            <th>Tool</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>[Asset Manager](../../projects/assets/manager.md)</td>
            <td>Imports and stores [images](../../parts/textures-decals.md), [meshes](../../parts/meshes.md), [packages](../../projects/assets/packages.md), [audio](../../sound/assets.md), and [models](../../parts/models.md). Only displays assets that you've imported into the currently opened experience.</td>
        </tr>
				<tr>
            <td>[Toolbox](../../projects/assets/toolbox.md)</td>
            <td>Stores every asset that you or your [groups](../../projects/groups.md) have ever imported into Studio, regardless of what experience you currently have open. Also includes assets from the [Creator Store][CreatorMarketplaceURL], allowing you to quickly drop user-generated assets directly into your experiences.</td>
        </tr>
        <tr>
            <td>[3D Importer](../../art/modeling/3d-importer.md)</td>
            <td>Imports `.fbx` or `.obj` 3D models from third-party modeling tools as a custom `Class.Model` instance. </td>
        </tr>
        <tr>
            <td>[Avatar Importer](../../studio/plugins-tab.md#avatar-importer)</td>
            <td>Imports avatar and custom rigs.</td>
        </tr>
    </tbody>
</table>

## Archiving Assets

To further help with organization, you can archive most asset types in the **Development Items** section of the [Creator Dashboard][CreatorDashboardURL].

<img src="../../assets/creator-dashboard/Creations-Development-Items.png" width="780" alt="Development Items section on the Creator Dashboard" />

<img src="../../assets/creator-dashboard/Asset-Context-Menu-Archive.png" width="400" alt="Archive option for an asset on the Creator Dashboard" />

After you archive an asset, it disappears from the website and is no longer usable or visible in Roblox experiences, including your own.

[CreatorMarketplaceURL]: https://create.roblox.com/marketplace
[MarketplaceURL]: https://www.roblox.com/catalog
[CreatorDashboardURL]: https://create.roblox.com/dashboard/creations
