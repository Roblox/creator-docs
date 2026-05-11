---
title: Asset privacy
description: Reference for the Roblox asset privacy system. Explains which asset types Asset Privacy affects (Images, Decals, Meshes only), how to enable Asset Privacy, how to grant and revoke permissions for collaborators and experiences, and which operations Asset Privacy does not affect.
---

The **asset privacy system** lets you control which creators and experiences can use your assets on Roblox. Assets can have one of two access privacy types:

- **Restricted** — Creators or experiences can only use the asset after the asset owner grants permission.
- **Open Use** — Any creator or experience can use the asset.

If a creator or experience doesn't have permission to use an asset, it cannot load in Studio, and a clickable error message displays in the [Output](../../studio/output.md) window. If a creator has permission to use an asset but the experience they're working on does not, clicking the error message displays a pop-up window to allow the creator to grant permission to the experience for any restricted assets.

When an asset is Open Use, Roblox doesn't need to check its permissions when it loads into an experience because every creator and experience can freely use it. However, when an asset is Restricted, Roblox **always** checks its permissions when it loads into an experience or when a creator takes an action on the asset, such as inserting it into Studio, sharing it with another creator, or listing it on the [Creator Store](../../production/creator-store.md).

<Alert severity="info">
The asset privacy system controls which creators and experiences can use the asset, but others can still see its metadata, such as its name and description.
</Alert>

## What Asset Privacy controls

Asset Privacy controls only the default privacy state assigned to **Images**, **Decals**, and **Meshes** when they are created. No other asset types are affected.

**Asset Privacy does not affect:**

- **Audio, Video, Models, MeshParts, Animations, and Packages** — these types have their own creation defaults and are not changed by the Asset Privacy setting. If audio or other asset types are not loading or distributing as expected, Asset Privacy is not the cause.
- **Distributing assets on the Creator Store or Marketplace** — enabling or disabling Asset Privacy does not change your distribution eligibility or workflow.
- **Using your own assets in your own published experiences** — your assets are always accessible to you in your own experiences regardless of their privacy setting.
- **Assets created before Asset Privacy was enabled** — the setting only applies to newly created assets.
- **Sharing restricted assets** — Restricted does not mean permanently inaccessible. You can grant access to specific friends, groups, and experiences at any time through [Creator Dashboard](#grant-permissions), or use the [Revamped Asset Manager](https://devforum.roblox.com/t/beta-updates-to-revamped-asset-manager/4548832/1) to bulk-grant access across many assets at once.

**Key constraints:**

- **Open Use is irreversible.** Once an asset is set to Open Use, it cannot be changed back to Restricted.
- **Experience grants are permanent.** Once you grant an experience permission to use a restricted asset, that permission cannot be revoked.
- **Revoking a collaborator's access does not affect experiences.** If a collaborator has already used a restricted asset in an experience, that experience retains access even after the collaborator is removed.
- **The setting is not retroactive.** Only assets created after enabling Asset Privacy are Restricted by default.

## Restrict permissions

<Alert severity="info">
You can list your or your group's restricted assets by themselves or as a dependency of a restricted asset on the Creator Store. This allows creators to use your assets as you list them under models, mesh parts, or packages, and disallows them from accessing and repackaging your restricted asset dependencies.
</Alert>

By default, Images, Decals, and Meshes are created as **Open Use**. Enable **Asset Privacy** to make these asset types **Restricted** on creation instead. All other asset types are not affected by this setting.

### Enable Asset Privacy

Individual creators and groups can enable Asset Privacy via Creator Dashboard. When enabled, newly created Images, Decals, and Meshes are set to **Restricted** by default. All other asset types are unaffected by this setting.

<Alert severity="info">
Enabling Asset Privacy does not change your ability to distribute assets on the Creator Store or Marketplace, use your assets in published experiences, or share your assets with collaborators.
</Alert>

<Tabs>
  <TabItem key = "1" label="As a creator">
To restrict your mesh, image, and decal assets on creation:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the top-right corner of the page, click on your username and select **Settings**.
1. In the left-hand navigation, select **Advanced**.
1. In the **Asset Privacy** section, enable the **Opt-in to restrict assets on creation** toggle. Every newly created Image, Decal, and Mesh is now Restricted by default.

  </TabItem>
  <TabItem key = "2" label="As a group">

<Alert severity="warning">
You can only complete this process if you are the group owner.
</Alert>

To restrict your group mesh, image, and decal assets on creation:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper-left, expand the account switcher and select your group.
1. Expand the account switcher again, select **Settings** under the group's name, then select **Group Profile**.
1. In the **Asset Privacy** section, enable the **Allow restricted assets on creation** toggle. Every newly created Image, Decal, and Mesh your group creates is now Restricted by default.

  </TabItem>
</Tabs>

After enabling Asset Privacy, verify the asset permission of any newly uploaded asset in the asset configuration page:

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

If you have Asset Privacy enabled and use a newly imported model in an avatar asset, you will be prompted to set your restricted texture and mesh dependencies to `OpenUse` during Marketplace [upload](../../marketplace/publish-to-marketplace.md#upload-an-asset):

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

Restricted assets must be explicitly granted permission before they are visible or audible at runtime. Grant permissions individually through Creator Dashboard, or use the [Revamped Asset Manager](https://devforum.roblox.com/t/beta-updates-to-revamped-asset-manager/4548832/1) to bulk-grant permissions across many assets at once.

### To collaborators

To grant a collaborator permission to use one of your restricted assets, the following must be true:

- To grant to an individual creator: the creator must be your [friend](https://en.help.roblox.com/hc/en-us/articles/203313580-How-to-Make-Friends) on the platform.
- To grant to a group: you must have [Edit all group experiences](../../projects/groups.md#roles-and-permissions) permission in that group.

When you grant an individual creator permission:

- They can use the asset in any of their individual or group-owned experiences.
- They can grant permission for experiences they own or have edit access to.

When you grant a group permission:

- All group members with Edit access can use the asset in experiences owned by that group.

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

If a collaborator wants to use the restricted asset in a script, or wants to save or publish a template place that includes the restricted asset, the experience itself must also have permission to use the asset. If this step is skipped, the asset is not visible or audible during runtime, and a clickable error message displays in the **Output** window.

To grant a collaborator permission to use a restricted asset:

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

1. Using the search bar, input and select a friend or group that you want to grant permission to use your restricted asset. The creator or group displays beneath the search bar with their access type.

   <img src="../../assets/creator-dashboard/Add-Collaborators.png" alt="The Add Collaborators pop-up menu." width="60%" />

1. **(Optional)** If your selected asset type is a model or package, you can choose one of the following access types:
   - **Use** - The collaborator receives permission to use the asset in their experiences.
   - **Edit** - The collaborator receives permission to edit the asset's metadata, such as its name and description.

1. Click the **Done** button to finalize your asset access permissions.

<Alert severity="info">
To grant permissions across multiple assets at once, or to bulk-share assets with specific groups and users, use the latest Asset Manager beta. See [Revamped Asset Manager](https://devforum.roblox.com/t/beta-updates-to-revamped-asset-manager/4548832/1) for details.
</Alert>

### To experiences

<Alert severity="error">
Once an experience has permission to use a restricted asset, you cannot revoke access to the asset.
</Alert>

To grant an experience permission to use one of your restricted assets, the experience must be editable to either you or a group that you belong to in which you have the [Edit all group experiences](../../projects/groups.md#roles-and-permissions) permission.

Once an experience has permission to use a restricted asset, anyone with **Edit** access to that experience can:

- Copy and paste the asset into another place file within that experience.
- Use its asset ID in the **Properties** window or in scripts within any place file within the experience.

<Alert severity="info">
When you grant permission to an experience by inserting a restricted asset into a collaborator's experience, the asset is also automatically granted to the experience's owner.
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
   To give multiple experiences permission at the same time, enter multiple universeIDs separated by commas.
   </Alert>

   <img src="../../assets/creator-dashboard/Add-Experiences.png" alt="The Add Experiences pop-up menu." width="60%" />

1. Click the **Done** button to finalize your asset access permissions.

  </TabItem>
  <TabItem key = "2" label="On an experience level">

To grant an experience permission to use many restricted assets:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select one of your or your group's experiences. The experience's overview page displays.
1. In the experience's left-hand navigation, navigate to the **Configure** section, then select **Permissions**. The experience's **Permissions** page displays.
1. In the **Enter asset IDs** input, type every asset ID you want the experience to have access to separated by commas, then click the **Add** button. All restricted assets the experience has access to display beneath the input with the asset's name, asset ID, owner, and asset type.
1. At the bottom of the page, click the **Save Changes** button.

  </TabItem>
</Tabs>

## View permissions

To view every restricted asset that your or your group's experiences have permission to use, review the experience's **Permissions** page on the Creator Dashboard.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select one of your or your group's experiences. The experience's overview page displays.
1. In the experience's left-hand navigation, navigate to the **Configure** section, then select **Permissions**. The experience's **Permissions** page displays.
1. **(Optional)** Click the download arrow button to export the data for offline processing.

## Revoke permissions

<Alert severity="warning">
Removing a creator as a friend does not automatically revoke their permission to use a restricted asset.
</Alert>

Revoking a collaborator's permission prevents them from granting new experiences access to the asset. It does not affect experiences that already use the asset — those experiences retain access permanently.

To revoke permission for a creator to use a restricted asset in any additional experience:

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
Opening an asset's permissions is irreversible. Once you set an asset to Open Use, it **cannot** be reset to Restricted.
</Alert>

<Alert severity="info">
To set multiple assets to **Open Use** in bulk, use the Revamped Asset Manager. See [Revamped Asset Manager](https://devforum.roblox.com/t/beta-updates-to-revamped-asset-manager/4548832/1) for details.
</Alert>

With **Asset Privacy** enabled, you can still open the permissions of any Image, Decal, or Mesh so that any creator or experience can freely use it.

To open permissions for your or your group's Image, Decal, or Mesh:

1. Enable Asset Privacy as described in [Restrict permissions](#restrict-permissions).
1. Back in the [Creator Dashboard](https://create.roblox.com/dashboard/creations), navigate to the upper tab bar, select **Development Items**, then click either **Decals**, **Images**, or **Meshes**. All of your Decal, Image, or Mesh assets display.

   <Alert severity="warning">
   To set a Decal to Open Use, set its Image dependency to Open Use **first**. The Asset Privacy system blocks the change if the Image is still Restricted.
   </Alert>

1. Select the asset you want every creator and experience to freely use. The asset's **Configure** page displays.
1. In the **Asset Access** section, enable **Open Use**. A pop-up displays asking you to confirm this permanent change.
1. In the pop-up, click the **Make Open Use** button. Anyone on Roblox can now use your asset.
