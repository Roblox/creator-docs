---
title: Asset Privacy
description: Explore how the asset privacy system lets you control which Roblox creators can use your assets in their experiences.
---

The **asset privacy system**, currently applicable to audio and video assets, lets you control which Roblox creators can use your assets in their experiences. You can share a private asset with your creator friends, upon which it will appear in their [Toolbox](../../projects/assets/toolbox.md) inventory.

## Sharing Assets

For private audio and video assets that you or your [group](../../projects/groups.md) own, you can share them with Roblox friends from the [Creator Dashboard][CreatorDashboardURL].

1. Navigate to the [Creator Dashboard][CreatorDashboardURL].
2. In the upper tab bar, select **DEVELOPMENT ITEMS**, then click either **AUDIO** or **VIDEOS**.

   <img src="../../assets/creator-dashboard/Development-Items-Asset-Privacy.png" width="780"/>

3. Click the desired asset from the central list to open its configuration page.
4. In the left menu of the asset's configuration page, click **Permissions**.

   <img src="../../assets/creator-dashboard/Asset-Settings-Permissions-Button.png" width="330" />

5. You can now share the asset in two scopes:

   <Tabs>
   <TabItem label="Per-Creator">

   Under **Collaborator Access** &rarr; **Creators**, search for specific friends to share the asset with.

	 <img src="../../assets/creator-dashboard/Asset-Settings-Permissions-Creators.png" width="780" />

	 <Alert severity="info">
   Sharing an asset with a friend does not automatically grant access to any of their experiences; it only gives them **permission** to use the asset. They will need to intentionally [use the asset in an experience](#using-shared-assets) for that experience to gain access to it.
	 </Alert>

   </TabItem>
   <TabItem label="Per-Experience">

   Under **Experience Access**, enter an experience's universe ID to grant it permission to access all versions of the asset. You must have permission to edit the experience to perform this operation.

	 <img src="../../assets/creator-dashboard/Asset-Settings-Permissions-Experiences.png" width="780" />

   </TabItem>
   </Tabs>

6. When finished, click the **save changes** button at the bottom of the screen.

### Cross-Publishing Access

When a user cross-publishes one experience to another, for example publishes a place within one experience to a place within another experience, the "receiving" experience automatically gains access to private assets that the "source" experience and the user has permission to use, including assets loaded through scripts that the source experience already has access to.

### Revoking Access

You can revoke access to any asset from its configuration page on the [Creator Dashboard][CreatorDashboardURL]. If you revoke access for a friend, they can no longer use that asset in any **additional** experiences, but experiences they've already used the asset in will continue to have access to it. If you need to revoke access on a platform-wide scale, including to your own experiences, you'll need to [archive the asset](../../projects/assets/index.md#archiving-assets) and re‑upload it to get a new private asset ID.

To revoke access for one or more friends:

1. Navigate to the asset's **Permissions** page.

   <img src="../../assets/creator-dashboard/Asset-Settings-Permissions-Button.png" width="330" />

2. Under **Collaborator Access** &rarr; **Creators**, locate the friend for which to revoke access.
3. Click the **Remove** button to the right of their name.

   <img src="../../assets/creator-dashboard/Asset-Settings-Permissions-Remove-Creator.png" width="780" />

4. When finished, click the **save changes** button at the bottom of the screen.

## Using Shared Assets

Assets shared with you appear in the **My Audio** and **My Videos** sections of the [Toolbox](../../projects/assets/toolbox.md).

<img src="../../assets/studio/toolbox/Inventory-My-Audio.png" width="360" alt="My Audio section of Inventory in Studio's Toolbox" />

Although the assets are shared with you, a given experience does **not** automatically gain access to any shared assets until you **insert** them in the experience, for example as a `Class.Sound` object.

You can also manually grant access to one or more assets from the experience's **Permissions** page as follows:

1. Navigate to the experience's configuration page on the [Creator Dashboard][CreatorDashboardURL].
2. In the **Configure** section, click on **Permissions**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Configure-Permissions.png" width="330" />

3. Enter one or more asset IDs into the input field, separated by commas, and click the **Add** button.

   <img src="../../assets/creator-dashboard/Experience-Settings-Permissions-Assets-Input.png" width="780" />

   Successfully added assets appear in the list slightly lower down the page:

   <img src="../../assets/creator-dashboard/Experience-Settings-Permissions-Assets-Added.png" width="780" />

4. When finished, click the **save changes** button at the bottom of the screen.

[CreatorDashboardURL]: https://create.roblox.com/dashboard/creations
