---
title: Asset privacy
description: Explore how the asset privacy system lets you control which Roblox creators can use your assets in their experiences.
---

The **asset privacy system** lets you control how creators and experiences can use and distribute your audio and video assets on Roblox. There are two asset privacy states on the platform:

- **Public** — Any creator can use the asset within their experiences.
- **Private** — Creators or experiences can only use the asset after the asset owner grants permission.

After you grant a creator permission to use a private asset, they can use it within any of their experiences, and after you grant an experience permission to use a private asset, the experience owner(s) can publish the experience and have the asset be visible or audible during runtime.

If a creator or experience doesn't have permission to use an asset, it cannot load in Studio, and an error message displays in the [Output](../../studio/output.md) window.

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a private asset." width="100%" />

<Alert severity="info">
The asset privacy system controls which users and experiences can use the asset, but other creators can still see its metadata, such as its name and description.
</Alert>

## Grant permission

In order for a creator or experience to use one of your private assets, you must explicitly grant permission. Once a creator or experience has **explicit** permission to use a private asset, they also receive **implicit** permission to use the asset in a variety of additional scenarios. For more information, reference the following subsections.

<Alert severity="warning">
If a private asset is a child of a public model or package from the [Creator Store](../../production/creator-store.md), creators and experiences must have explicit permission to use the private asset in order for the private asset to be visible or audible during runtime. For example, if a model includes a `Class.Sound` object with a private assetID, the public model remains visible, but the private audio cannot play.
</Alert>

### To creators

To grant a creator permission to use one of your private assets, the creator must be your [friend](https://en.help.roblox.com/hc/en-us/articles/203313580-How-to-Make-Friends) on the platform. After you explicitly grant your friend permission, they gain implicit permission to use the asset in any of their individual or group-owned experiences, as well as permission to [grant experiences permission](#to-experiences) to use the private asset.

Once a creator has permission to use a private asset, they can insert the asset into experiences from the **Inventory** tab of the [Toolbox](../../projects/assets/toolbox.md), or by using the private asset's ID in the [Properties](../../studio/properties.md) window.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/toolbox/Inventory-My-Audio.png" alt="A close up view of the Toolbox with the Inventory tab and the asset dropdown highlighted." width="100%" />
    <figcaption>Inserting a private asset through the Toolbox</figcaption>
  </figure>
  <figure>
    <img src="../../assets/studio/properties/Private-SoundID.jpg" alt="A close up view of the Properties window with the SoundID property highlighted." width="100%" />
    <figcaption>Inserting a private asset in the Properties window</figcaption>
  </figure>
</GridContainer>

However, if the creator wants to use the private asset in a script, or if they want to save or publish a template place that they were editing that includes the private asset, they must also grant permission to the [experience](#to-experiences) itself to use the private asset. If they don't complete this step, the asset isn't visible or audible during runtime, and an error message displays in the **Output** window.

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a private asset." width="100%" />

To grant a creator permission to use a private asset in any of these scenarios:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper tab bar, select **Development Items**, then click either **Audio** or **Videos**. All of your audio or video assets display.
1. Select the asset you want the creator to have permission to use in any of their experiences. The asset's **Configure** page displays.
1. In the asset's left-hand navigation, select **Permissions**. The asset's **Permissions** page displays.
1. Under **Collaborator Access** &rang; **Creators**, search for the friend you want to grant permission to your private asset. The creator displays beneath the search bar with their access visible.
1. At the bottom of the page, click the **Save Changes** button.

### To groups

To grant a group permission to use one of your private assets, you must have [Edit all group experiences](../../projects/groups.md#roles-and-permissions) permission in that group. After you grant the group permission, group members gain permission to use the asset only in experiences owned by that group (see [Granting permission to experiences](#to-experiences)).

Group members can insert the asset into experiences from the **Creations** tab of the [Toolbox](../../projects/assets/toolbox.md). Use the dropdown to select the appropriate **Group** category. You can also use the private asset's ID in the [Properties](../../studio/properties.md) window.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/toolbox/Creations-Group-Audio.png" alt="A close up view of the Toolbox with the Creations tab highlighted and Group Audio category selected." width="100%" />
    <figcaption>Inserting a private asset through the Toolbox</figcaption>
  </figure>
  <figure>
    <img src="../../assets/studio/properties/Private-SoundID.jpg" alt="A close up view of the Properties window with the SoundID property highlighted." width="100%" />
    <figcaption>Inserting a private asset in the Properties window</figcaption>
  </figure>
</GridContainer>

If group members want to use the private asset in a script, or if they want to save or publish a template place that they were editing that includes the private asset, they must also give the [experience](#to-experiences) itself permission to use it. If a group member doesn't complete this step, the asset isn't visible or audible during runtime, and an error message displays in the **Output** window.

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a private asset." width="100%" />

To grant a group permission to use a private asset in any of these scenarios:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select **Development Items**, then click either **Audio** or **Videos**.
1. Select the asset you want the group to have permission to use in any of their experiences, then navigate to **Permissions**.
1. Under **Collaborator Access** &rarr; **Creators**, search for the group that you want to grant permission to. You can also see and remove existing groups.
1. Click the **Save Changes** button.

### To experiences

<Alert severity="error">
Once an experience has permission to use a private asset, you cannot revoke access to the private asset.
</Alert>

To grant an experience permission to use one of your private assets, the experience must be editable to either you or a group that you belong to in which you have the [Edit all group experiences](../../projects/groups.md#roles-and-permissions) permission. After you or a creator that you gave permission to use a private asset explicitly grants an experience further permission to use that private asset, anyone who has edit access to that experience gains implicit permission to:

- Copy and paste the asset into another place file within that experience.
- Use its asset ID in the **Properties** window or in scripts within any place file within the experience.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/studio/properties/Private-SoundID.jpg" alt="A close up view of the Properties window with the SoundID property highlighted." width="100%" />
    <figcaption>Inserting a private asset in the Properties window</figcaption>
  </figure>
  <figure>
    <img src="../../assets/misc/CodeSample-PrivateAsset.jpg" alt="A script that inserts a private audio asset into an experience." width="100%" />
    <figcaption>Inserting a private asset through a script</figcaption>
  </figure>
</GridContainer>

<Tabs>
  <TabItem key = "1" label="On an asset level">

To grant an experience permission to use a private asset:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper tab bar, select **Development Items**, then click either **Audio** or **Videos**. All of your audio or video assets display.
1. Select the asset you want the experience to have permission to use. The asset's **Configure** page displays.
1. Under **Experience Access**, type the experience's universe ID into the **Enter Universe IDs** input, then click the **Add** button. The experience displays beneath the input with its access visible.

   <Alert severity="info">
   If you want to give multiple experiences permission to use your private access at the same time, you can enter multiple universe IDs as long as you separate them with a comma.
   </Alert>

1. At the bottom of the page, click the **Save Changes** button.

  </TabItem>
  <TabItem key = "2" label="On an experience level">

To grant an experience permission to use many private assets in the previous scenarios:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select one of your or your group's experiences. The experience's overview page displays.
1. In the experience's left-hand navigation, navigate to the **Configure** section, then select **Permissions**. The asset's **Permissions** page displays.
1. In the **Enter asset IDs** input, type every asset ID you want the experience to have access to separated by commas, then click the **Add** button. All private assets the experience has access to display beneath the input with the asset's name, ID, owner, and asset type.
1. At the bottom of the page, click the **Save Changes** button.

  </TabItem>
</Tabs>

### To cross-publish

To cross-publish a place from an experience that includes the private asset into an entirely different experience, the source experience and the publisher must have permission to use the private asset, either as the owner of the private asset or a creator that has been granted permission to use the private asset. When these conditions are met, the experience that receives the place file also gains implicit permission to use the private asset into any of its place files, even if the asset loads through scripts.

However, if a publisher tries to cross-publish an unpublished place into an entirely different experience, a pop-up displays with options on how to manage any private assets. If the publisher is qualified to grant permission to the new experience, such as if they own the experience, the pop-up's **Grant All Permissions** button explicitly grants the new experience permission to use the place's private assets.

<img src="../../assets/misc/Audio-Error-Popup.png" alt="A pop-up display to inform that the experience doesn't have permission to use the asset." width="100%" />

However, if they are not qualified to grant permission to the new experience, they can still publish the place into the experience, but the experience does not gain permission to any private assets, and an error message displays in the **Output** window.

<img src="../../assets/studio/general/Output-Window-Error.png" alt="An example of an error that displays in the Output window when a creator or experience doesn't have permission to use a private asset." width="100%" />

## View permissions

You can view every private asset that an experience you or a group you belong to has permission to use by viewing the experience's **Permissions** page on the Creator Dashboard.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Select one of your or your group's experiences. The experience's overview page displays.
1. In the experience's left-hand navigation, navigate to the **Configure** section, then select **Permissions**. The asset's **Permissions** page displays.
1. **(Optional)** You can download the data for offline processing by clicking the download arrow button.

## Revoke permissions

<Alert severity="warning">
Unfriending a creator does not automatically revoke permissions to use a private asset.
</Alert>

If you revoke private asset permission for a friend, they can no longer use the asset in any **additional** experiences, but experiences they've already used the asset in will continue to have access to it.

To revoke permission for a creator to use a private asset in any additional experience that isn't currently using the asset:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. In the upper tab bar, select **Development Items**, then click either **Audio** or **Videos**. All of your audio or video assets display.
1. Select the asset you want to revoke permission for one or more creators to use in their own experiences. The asset's **Configure** page displays.
1. In the asset's left-hand navigation, select **Permissions**. The asset's **Permissions** page displays.
1. Under **Collaborator Access** &rang; **Creators**, all creators who have permission to use the asset display. Navigate to the creator you want to revoke permission, then click the **Remove** button to the right of their name.
1. At the bottom of the page, click the **Save Changes** button.
