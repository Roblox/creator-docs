---
title: Asset privacy
description: Explore how the asset privacy system lets you control which Roblox creators can use your assets in their experiences.
---

The **asset privacy system** lets you control how creators and experiences can use and distribute your models, meshes, images, decals, audio, video, and animation assets on Roblox. Assets can have one of two access privacy types:

- **Open Use** — Any creator can use the asset within their experiences.
- **Restricted** — Creators or experiences can only use the asset after the asset owner grants permission.

When an asset is open use, Roblox doesn't need to check its permissions when it loads into an experience because every creator and experience can use it. However, when an asset is restricted, Roblox **always** checks its permissions when it loads into an experience or when a creator takes an action on the asset, such as inserting it into Studio, sharing it with another creator, or listing it on the [Creator Store](../../production/creator-store.md).

If a creator or experience doesn't have permission to use an asset, it cannot load in Studio, and a clickable error message displays in the [Output](../../studio/output.md) window. If a creator has permission to use an asset but the experience they're working on does not, clicking the error message displays a pop-up window to allow the creator to grant permission to the experience for any restricted assets.

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a restricted asset." width="100%" />

<Alert severity="info">
The asset privacy system controls which creators and experiences can use the asset, but others can still see its metadata, such as its name and description.
</Alert>

## Grant permission

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

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a restricted asset." width="100%" />

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
- Use its asset ID in the Properties window or in scripts within any place file within the experience.

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

### To cross-publish

If you want to cross-publish a place from an experience that includes the restricted asset into an entirely different experience, you and the experience that includes the restricted asset must have permission to use the restricted asset, either as the owner of the asset or as a collaborator that has been granted explicit permission. If you meet these conditions, the experience that receives the place file also gains implicit permission to use the restricted asset in any of its place files, even if the asset loads through scripts.

However, if you try to cross-publish an unpublished place into an entirely different experience, a pop-up displays with options on how to manage any restricted assets. If you're qualified to grant permission to the new experience, such as if you own the experience, the pop-up's **Grant All Permissions** button explicitly grants the new experience permission to use the place's restricted assets.

<img src="../../assets/misc/Audio-Error-Popup.png" alt="A pop-up display to inform that the experience doesn't have permission to use the asset." width="100%" />

However, if you're not qualified to grant permission to the new experience, you can still publish the place into the experience, but the experience does not gain permission to any restricted assets, and an error message displays in the **Output** window.

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a restricted asset." width="100%" />

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
