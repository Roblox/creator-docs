---
title: Asset privacy
description: Explore how the asset privacy system lets you control which Roblox creators can use your assets in their experiences.
---

The **asset privacy system** lets you control how creators and experiences can use and distribute your models, meshes, images, decals, audio, video, and animation assets on Roblox. Assets can have one of two access privacy types:

- **Restricted** — Creators or experiences can only use the asset after the asset owner grants permission.
- **Open Use** — Any creator or experience can use the asset.

If a creator or experience doesn't have permission to use an asset, it cannot load in Studio, and a clickable error message displays in the [Output](../../studio/output.md) window. If a creator has permission to use an asset but the experience they're working on does not, clicking the error message displays a pop-up window to allow the creator to grant permission to the experience for any restricted assets.

When an asset is open use, Roblox doesn't need to check its permissions when it loads into an experience because every creator and experience can freely use it. However, when an asset is restricted, Roblox **always** checks its permissions when it loads into an experience or when a creator takes an action on the asset, such as inserting it into Studio, sharing it with another creator, or listing it on the [Creator Store](../../production/creator-store.md).

<Alert severity="info">
The asset privacy system controls which creators and experiences can use the asset, but others can still see its metadata, such as its name and description.
</Alert>

## Restrict permissions

<Alert severity="info">
You can list your or your group's restricted assets by themselves or as a dependency of a restricted asset on the Creator Store. This allows creators to use your assets as you list them under models, mesh parts, or packages, and disallows them from accessing and repackaging your restricted asset dependencies.
</Alert>

Every model, mesh part, and animation that you create are restricted **by default** to ensure that no one else can use your assets unless you explicitly grant permission to a creator, group, or experience, or list them on the Creator Store. If you want to extend this default permission to meshes, images, and decals, you must opt-in to the **Asset Privacy** beta.

### Beta opt-in

Individual creators and groups can opt into the beta via Creator Dashboard to apply permissions to newly created assets by default. Users and groups who are opted into the beta have their Images, Meshes, and Decals created as **Restricted** as default.

<Tabs>
  <TabItem key = "1" label="As a creator">
To restrict your mesh, image, and decal assets on creation through the Asset Privacy beta:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the top-right corner of the page, click on your username and select **Settings**.
1. In the left-hand navigation, select **Advanced**.
1. In the **Asset Privacy** section, enable the **Opt-in to restrict assets on creation** toggle. Every non-avatar asset you create is now restricted by default.

  </TabItem>
  <TabItem key = "2" label="As a group">

<Alert severity="warning">
You can only complete this process if you are the group owner.
</Alert>

To restrict your group mesh, image, and decal assets on creation through the Asset Privacy beta:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper-left, expand the account switcher and select your group.
1. Expand the account switcher again, select **Settings** under the group's name, then select **Group Profile**.
1. In the **Asset Privacy** section, enable the **Allow restricted assets on creation** toggle. Every non-avatar asset your group creates is now restricted by default.

  </TabItem>
</Tabs>

After opting into the beta, you can verify the asset permission of any newly uploaded asset in the asset configuration page:

   <img src="../../assets/creator-dashboard/Asset-Toggle.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="60%" />

Selecting **Open Use** warns that once an asset has been set to **OpenUse**, it cannot be set back to **Restricted**.

   <img src="../../assets/creator-dashboard/Asset-Make-OpenUse.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="60%" />

After setting to **Open Use**, the asset displays its current asset access permission.

   <img src="../../assets/creator-dashboard/Asset-OpenUse.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="60%" />

### Decals

All `Class.Decal|Decals` are linked to an `Image`, which means a `Decal` can only be set to OpenUse if its `Image` dependency is OpenUse. Otherwise the following warning displays:

   <img src="../../assets/creator-dashboard/Asset-Decals-Warning.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="60%" />

### Avatar assets

Avatar assets, such as accessories, clothing, and bodies, require all dependent textures and meshes to be `OpenUse` when uploading the Avatar asset to the Marketplace.

If you are opted into the beta and use a newly imported model in an avatar asset, you will be prompted to set your restricted texture and mesh dependencies to `OpenUse` during Marketplace [upload](../../marketplace/publish-to-marketplace.md#upload-an-asset):

<GridContainer numColumns = "2">
<figure>
<img src="../../assets/creator-dashboard/Asset-Avatar-Restricted.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="100%" />
<figcaption>
If your avatar item or bundle contains any restricted primitive assets, you must convert them to Open Use.
</figcaption>
</figure>
<figure>
<img src="../../assets/creator-dashboard/Asset-Avatar-Success.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="100%" />
<figcaption>
If your entire avatar item has correct permissions, you can continue to upload and publish your avatar item to the Marketplace.
</figcaption>
</figure>
</GridContainer>

## Grant permissions

In order for a collaborator, such as an individual creator or group, or an experience to use one of your restricted assets, you must explicitly grant permission before it's visible or audible at runtime. Once a collaborator or experience has **explicit** permission to use a restricted asset, they also receive **implicit** permission to use the asset in a variety of additional scenarios. For more information, see the following subsections.

### To collaborators

To grant a collaborator permission to use one of your restricted assets, the following must be true depending on if you are granting permission to another creator or a group:

- The creator must be your [connection](https://en.help.roblox.com/hc/en-us/articles/203313580-How-to-Make-Friends) on the platform, or
- You must have [Edit all group experiences](../../projects/groups.md#roles-and-permissions) permission in that group.

If you meet these conditions and explicitly grant the collaborator permission,

- The creator gains implicit permission to use the asset in any of their individual or group-owned experiences, and the ability to grant other experiences permission to use the restricted asset.
- All group members with edit access gain permission to use the asset in experiences owned by that group.

Once a collaborator has permission to use one of your restricted assets, they can insert the asset from the **Inventory** and/or **Creation** tab of the [Toolbox](../../projects/assets/toolbox.md), or by using the restricted asset ID in the [Properties](../../studio/properties.md) window.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/toolbox/Inventory-Tab.png" width="360" alt="A close up view of the Toolbox with the Inventory tab highlighted." />
		<img src="../../assets/studio/toolbox/Creations-Tab.png" width="360" alt="A close up view of the Toolbox with the Creations tab highlighted." />
    <figcaption>Inserting a restricted asset through the Toolbox</figcaption>
  </figure>
  <figure>
    <img src="../../assets/studio/properties/Enter-Private-Asset-ID.png" width="320" alt="A close up view of the Properties window with the Asset property highlighted." />
    <figcaption>Inserting a restricted asset in the Properties window</figcaption>
  </figure>
</GridContainer>

However, if a collaborator wants to use the restricted asset in a script, or if they want to save or publish a template place that includes the restricted asset, the collaborator must also give the [experience](#to-experiences) itself permission to use the asset. If the creator or group member doesn't complete this step, the asset isn't visible or audible during runtime, and a clickable error message displays in the **Output** window.

To grant a collaborator permission to use a restricted asset in any of these scenarios:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper tab bar, select **Development Items**, then click one of the following tabs:

   - **Models & Packages**
   - **Audio**
   - **Decals**
   - **Images**
   - **Videos**
   - **Meshes**
   - **MeshParts**
   - **Animations**

1. Select the asset you want your collaborator to have permission to use in their experiences. The asset's **Configure** page displays.
1. In the asset's left-hand navigation, select **Permissions**. The asset's **Permissions** page displays.
1. From the **Collaborators** tab, click the **Add collaborators** button.

   <img src="../../assets/creator-dashboard/Permissions-Collaborators.png" alt="The landing page for asset permissions with the Collaborators tab selected." width="80%" />

1. Using the search bar, input and select a connection or group that you want to grant permission to use your restricted asset. The creator or group displays beneath the search bar with their access type.

   <img src="../../assets/creator-dashboard/Add-Collaborators.png" alt="The Add Collaborators pop-up menu." width="60%" />

1. **(Optional)** If your selected asset type is a model or package, you can choose one of the following access types:

   - **Use** - The collaborator receives permission to use the asset in their experiences.
   - **Edit** - The collaborator receives permission to edit the asset's metadata, such as its name and description.
1. Click the **Done** button to finalize your asset access permissions.

### To experiences

<Alert severity="error">
Once an experience has permission to use a restricted asset, you cannot revoke access to the asset.
</Alert>

To grant an experience permission to use one of your restricted assets, the experience must be editable to either you or a group that you belong to in which you have the [Edit all group experiences](../../projects/groups.md#roles-and-permissions) permission.

After you or a collaborator with permission grants an experience access to use a restricted asset, anyone who has **Edit** access to that experience gains implicit permission to:

- Copy and paste the asset into another place file within that experience.
- Use its asset ID in the **Properties** window or in scripts within any place file within the experience.

<Alert severity="info">
When you grant permission to an experience by inserting it into a collaborator’s experience, the asset is also automatically shared with the experience's owner.
</Alert>

The following tabs walk you through the process of either granting one or more experiences access to a single restricted asset, or granting an experience access to one or more restricted assets.

<Tabs>
  <TabItem key = "1" label="On an asset level">

To grant an experience permission to use a restricted asset:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper tab bar, select **Development Items**, then click one of the following tabs:

   - **Models & Packages**
   - **Audio**
   - **Decals**
   - **Images**
   - **Videos**
   - **Meshes**
   - **MeshParts**
   - **Animations**

1. Select the asset you want the experience to have permission to use. The asset's **Configure** page displays.
1. In the asset's left-hand navigation, select **Permissions**. The asset's **Permissions** page displays.
1. From the **Experiences** tab, click the **Add experiences** button.

   <img src="../../assets/creator-dashboard/Permissions-Experiences.png" alt="The landing page for asset permissions with the Experiences tab selected." width="80%" />

1. Type the experience's universeID into the **Enter Universe IDs** input, then click the **Add** button. The experience displays beneath the input with its access visible.

   <Alert severity="info">
   If you want to give multiple experiences permission to use your restricted access at the same time, you can enter multiple universeIDs as long as you separate them with a comma.
   </Alert>

   <img src="../../assets/creator-dashboard/Add-Experiences.png" alt="The Add Experiences pop-up menu." width="60%" />

1. Click the **Done** button to finalize your asset access permissions.

  </TabItem>
  <TabItem key = "2" label="On an experience level">

To grant an experience permission to use many restricted assets in the previous scenarios:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select one of your or your group's experiences. The experience's overview page displays.
1. In the experience's left-hand navigation, navigate to the **Configure** section, then select **Permissions**. The asset's **Permissions** page displays.
1. In the **Enter asset IDs** input, type every asset ID you want the experience to have access to separated by commas, then click the **Add** button. All restricted assets the experience has access to display beneath the input with the asset's name, asset ID, owner, and asset type.
1. At the bottom of the page, click the **Save Changes** button.

  </TabItem>
</Tabs>

## View permissions

You can view every restricted asset that your or your group's experiences have permission to use by reviewing the experience's **Permissions** page on the Creator Dashboard.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select one of your or your group's experiences. The experience's overview page displays.
1. In the experience's left-hand navigation, navigate to the **Configure** section, then select **Permissions**. The asset's **Permissions** page displays.
1. **(Optional)** You can download the data for offline processing by clicking the download arrow button.

## Revoke permissions

<Alert severity="warning">
Unconnecting a creator does not automatically revoke permissions to use a restricted asset.
</Alert>

If you revoke restricted asset permission for a connection, they can no longer use the asset in any **additional** experiences. However, if they have used the restricted asset in their experiences, the experiences continue to have access to the restrictued asset.

To revoke permission for a creator to use a restricted asset in any additional experience that isn't currently using the asset:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper tab bar, select **Development Items**, then click one of the following tabs:

   - **Models & Packages**
   - **Audio**
   - **Decals**
   - **Images**
   - **Videos**
   - **Meshes**
   - **MeshParts**
   - **Animations**

1. Select the asset you want to revoke permission for one or more creators to use in their own experiences. The asset's **Configure** page displays.
1. In the asset's left-hand navigation, select **Permissions**. The asset's **Permissions** page displays.
1. From the **Collaborators** tab, locate the creator you want to revoke permission from, then click the Access dropdown next to their username. Additional options display.
1. Click the **Remove** button. A pop-up displays to confirm that you want to revoke permission from the collaborator.
1. From the pop-up, click the **Remove** button.

## Open permissions

<Alert severity="error">
Opening an asset's permissions is irreversible. Once you set an asset to open use, it **cannot** be reset to the restricted privacy type.
</Alert>

While opting in to the **Asset Privacy** beta allows you to restrict your or your group's mesh, image, and decal assets on creation, you are still able to open their permissions so that any creator or experience to freely access and use them in their projects.

To open permissions for your or your group's mesh, image, or decal asset through the Asset Privacy beta:

1. Follow the steps to opt-in to the Asset Privacy beta in [Restrict permissions](#restrict-permissions).
1. Back in the [Creator Dashboard](https://create.roblox.com/dashboard/creations), navigate to the upper tab bar, select **Development Items**, then click either **Decalss**, **Images**, or **Meshes**. All of your decal, image, or mesh assets display.

   <Alert severity="warning">
   If you want to set a decal asset to open use, you must set its image dependency to open use **first**, otherwise the Asset Privacy system will block you in future steps.
   </Alert>

1. Select the asset that you want to every creator and experience to freely use in their projects. The asset's **Configure** page displays.
1. In the **Asset Access** section, enable **Open Use**. A pop-up displays asking you to confirm this permanent change.
1. In the pop-up, click the **Make Open Use** button. Anyone on Roblox can now use your asset.
