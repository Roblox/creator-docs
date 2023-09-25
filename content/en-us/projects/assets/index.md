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

This cloud-based asset system allows you to store assets through Roblox so you don't need to maintain local copies as part of a saved Studio experience, and that you can reuse assets across the platform in various contexts for your projects, such as in different objects, places, or character bodies. You can find millions of free-to-use assets for projects on the [Creator Marketplace](https://create.roblox.com/marketplace), purchase assets for avatars on the [Marketplace](https://www.roblox.com/catalog), or create your own assets and import them directly into Studio through asset management tools.

When you import assets, they must pass a moderation check to ensure they meet Roblox's [Community Rules](https://en.help.roblox.com/hc/articles/203313410) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846) before users can see and interact with them in published experiences. After Roblox approves imported assets, you can choose to retain sole ownership of their usage on the platform, assign them to group ownership, or publish them to the Creator Marketplace in order to make them publicly available for all users to use within their own projects. Every asset you import is accessible within the [Toolbox](../../projects/assets/toolbox.md), allowing you to reuse them across all of your projects.

## Asset Types

All [asset types](/reference/engine/enums/AssetType) available on the platform generally fall into one of three categories:

- Assets that map to project-level items. You can find and configure these assets within the [Game Settings](../../studio/game-settings.md) window in Studio.
- Assets that are objects, or that change the appearance or behavior of objects within places. You can find these assets within the [Creator Marketplace](https://create.roblox.com/marketplace).
- Assets that change the body, clothing, or animation of avatars and non-playable characters. You can find these assets within the [Marketplace](https://www.roblox.com/catalog).

Every asset type works differently depending on where it lives on the platform. For information on how to use each asset type for experiences, places, and avatars, see each of the following sections.

### For Experiences

There are three asset types that map to project-level items:

- **Places** - Every experience has one or more places, or individual 3D worlds. Each place is represented by a data model that describes the place's 3D world and logic.
- **Badges** - A badge is a special award you can gift users when they meet a goal within an experience, such as completing a difficult objective or playing for a certain amount of time.
- **Passes** - A pass is a monetization product that allows you to charge a one-time Robux fee in order for users to access special privileges within an experience, such as entry to a restricted area, an in-experience avatar item, or a permanent power-up.

These asset types are unique to the experience that they map to, meaning they are non-transferable to other projects. For more information on these asset types, see [Projects - Places](../../projects/index.md#places), [Badges](../../production/publishing/badges.md), and [Passes](../../production/monetization/game-passes.md).

### For Places

In general, there are two categories of asset types for places that you can either import or find on the Creator Marketplace:

- Assets that exist as objects within the data model, such as models and meshes.
- Assets that you apply as an object's property, such as audio, images, fonts, and videos.

Assets that exist as objects within the data model are objects that you can drag-and-drop from the Creator Marketplace, and they automatically display within the viewport without any extra steps. However, assets that you must apply as an object's property are objects that only display or sound correctly in the viewport after you attach them to their appropriate objects.

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
            <td>**Models**</td>
            <td>A `Class.Model` is a container object for geometric groupings, such as `Class.BasePart`, `Class.MeshPart`, `Class.Motor6D`, and other `Class.Model` objects. Whenever you group objects together in Studio, they automatically become a `Class.Model` object.<br /><br />For more information, see [Models](../../parts/models.md).</td>
        </tr>
        <tr>
            <td>**Meshes**</td>
            <td>A `Class.MeshPart` is a type of part object that includes a physically-simulated custom mesh. You cannot create meshes in Studio, but you can import them in either `.fbx` or `.obj` format from third-party modeling tools.<br /><br />For more information, see [Meshes](../../parts/meshes.md).</td>
        </tr>
        <tr>
            <td>**Audio**</td>
            <td>A `Class.Sound` object is an object that emits audio when you apply an audio asset ID within its `Class.Sound.SoundId|SoundId` property. Where you place the `Class.Sound` object in the data model changes where the sound emits and how its volume changes in relation to each user's position within the experience.<br /><br />You can import audio assets in either `.mp3` or `.ogg` format. For more information, see [Audio Assets](../../sound/assets.md) and [Sound Objects](../../sound/objects.md).</td>
        </tr>
        <tr>
            <td>**Images**</td>
            <td>A `Class.Decal` object is an object that displays an image that stretches to fit the surface of a part or union when you apply an image asset ID within the `Class.Decal.Texture` property, and a `Class.Texture` object is an object that displays an image that repeat both horizontally and vertically on the surface of a part or union when you apply an image asset ID within the `Class.Texture.Texture` property.<br /><br />You can import images in `.png`, `.jpg`, `.tga`, or `.bmp` format. For more information, see [Textures and Decals](../../parts/textures-decals.md).</td>
        </tr>
        <tr>
            <td>**Fonts**</td>
            <td>A `Class.TextButton`, `Class.TextLabel`, or `Class.TextBox` object is an object that displays typography in a specific style when you apply a font asset ID within its respective `Class.TextButton.FontFace`, `Class.TextLabel.FontFace`, or `Class.TextBox.FontFace` property.<br /><br />You cannot import fonts, but the Creator Marketplace offers over 80 different fonts you can use. For more information, see [Creator Marketplace](../../production/publishing/creator-marketplace.md).</td>
        </tr>
        <tr>
            <td>**Videos**</td>
            <td>A `Class.VideoFrame` object is an object that displays a video when you apply a video asset ID within the `Class.VideoFrame.Video` property.<br /><br />Some creators can import videos in `.webm` format, otherwise the Creator Marketplace offers many curated videos you can use in your projects. </td>
        </tr>
    </tbody>
</table>

### For Avatars

There are three categories of asset types for avatars that you can find on the Marketplace and equip to avatars:

- **Body Parts** - Assets that represent sections of the avatar character model, such as a Head, Torso, or LeftLeg.
- **Clothing and Accessories** - Assets that represent clothing and accessories on top of body parts, such as a HairAccessory, ShirtAccessory, or PantsAccessory.
- **Animations** - Assets that animate the avatar character model, such as a RunAnimation, JumpAnimation, or SwimAnimation.

Every avatar character model contains a `Class.HumanoidDescription` object with asset IDs for the avatar's body parts, clothing, accessories, and animations. By default, when a user joins an experience, their `Class.Player.Character` references the `Class.HumanoidDescription` object for the user's personal avatar, but you can apply a different `Class.HumanoidDescription` object as the user joins in order to adjust the characteristics of their playable character while they're accessing the experience, such as different asset IDs for their body parts, clothing and accessories, and how the character animates, as well as their scale and color.

For more information, see [Character Appearance - HumanoidDescription](../../characters/appearance.md#humanoiddescription).

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

An asset's privacy status determines who has permission to reuse the asset within their experiences. There are two types of privacy statuses:

- **Private** - Only you or a group can use the asset.
- **Public** - Everyone can use the asset.

By default, all assets are private when you or a group import them into Studio, meaning only you or the group have access to the asset's unique asset ID. However, if you want to grant everyone access to the asset ID, you must publish the asset to the [Creator Marketplace](../../production/publishing/creator-marketplace.md) to make that information public.

<Alert severity="warning">
  You can change an asset's privacy status at any time, but if another creator uses it within their experience while it was public, you cannot revoke access to that creator even if you change the asset's privacy status to private.
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
            <td>Imports and stores image, mesh, package, audio, and model assets on an experience-level. As you use the Asset Manager within different experiences, it only displays the assets that you imported into that specific open experience. </td>
        </tr>
        <tr>
            <td>[3D Importer](../../art/modeling/3d-importer.md)</td>
            <td>Imports `.fbx` or `.obj` 3D models from third-party modeling tools as a custom `Class.Model` instance. </td>
        </tr>
        <tr>
            <td>[Avatar Importer](../../studio/plugins-tab.md#avatar-importer)</td>
            <td>Imports avatar and custom rigs.</td>
        </tr>
        <tr>
            <td>[Toolbox](../../projects/assets/toolbox.md)</td>
            <td>Stores every asset you or your groups have ever imported into Studio, regardless of what experience you currently have open. It also includes assets from the Creator Marketplace, allowing you to quickly drag-and-drop free user-generated assets directly into your experiences.</td>
        </tr>
    </tbody>
</table>
