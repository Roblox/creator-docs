---
title: Groups (teams)
description: Explains Roblox groups and how to collaborate with multiple creators on the same experience.
---

A Roblox **group** allows multiple creators to work on the same experience, use the same assets, share profits, and give credit to all contributors.

<Alert severity="error">
Group ownership of experiences helps creators collaborate and operate as independent studios. If a conflict arises within a group, Roblox cannot help arbitrate or resolve disagreements.
</Alert>

## Group creation

Creating a group costs 100 Robux. New groups maintain certain capabilities on the legacy [Groups](https://www.roblox.com/communities) pages, but improved workflows and options for [configuring roles/permissions](#roles-and-permissions) and [inviting members](#invite-members) are only available on the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

<Alert severity="warning">
Before creating a group, carefully read through the [rules and expectations](./group-guidelines.md) for group management.
</Alert>

To create a new group:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations), click the **View As** dropdown menu on the left, and select **Create Group**.
2. On the setup page, upload an image for the group logo and enter the group name.
3. When ready, click the **Purchase** button. Once the group is created, you'll be directed to the group profile page where you can modify the group's details, including adding up to three social links.

## Roles and permissions

Group members can be assigned one or multiple **roles** within a group, and each role has **permissions** which specify the abilities of its members.

<Alert severity="warning">
Role configuration is only accessible if you're the group owner or you have permission to create, configure, and assign group roles.
</Alert>

<Alert severity="error">
Roles created using the legacy [Groups](https://www.roblox.com/communities) pages will continue to operate on the legacy system and can only be managed through the legacy workflow. If permissions were granted to a legacy role, **the member will continue to have those permissions**, so it's recommended that you revoke permissions/roles in the legacy system and then migrate members to the new system.
</Alert>

1. From the [Creator Dashboard](https://create.roblox.com/dashboard/creations), select the group from the **View As** dropdown menu and navigate to **Collaboration** &rang; **Roles**.
2. For each role, carefully confirm the permissions under the **Permissions** tab.

   <img src="../assets/creator-dashboard/Group-Roles-Permissions-Tab.png" width="780" alt="Permissions tab indicated for a group role on the Creator Dashboard." />

   <table>
   <thead>
     <tr>
       <th colspan="2">Group Permissions</th>
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>**Add or remove group members**</td>
       <td>Members with this role can [invite](#inviting-members) and [remove](#removing-members) other members.</td>
     </tr>
     <tr>
       <td>**Add or remove [role] role members**</td>
       <td>Members with this role can give or remove the role to/from other members in the group. This permission is useful for roles that should have some management permissions but not at the super‑admin level.</td>
     </tr>
     <tr>
       <td>**Configure limited roles**</td>
       <td>Members with this role can configure the roles they are assigned and assign permissions to those roles that they themselves have.</td>
     </tr>
     <tr>
       <td>**Administrate all roles**</td>
       <td>Members with this role can create, delete, and configure any role in the group. This is a super‑admin permission, as it provides nearly full access.</td>
     </tr>
     <tr>
       <td>**Configure group profile**</td>
       <td>Members with this role can update the group's name, description, and other metadata. Does not include transferring ownership, which only the owner can do.</td>
     </tr>
     <tr>
       <td>**View group activity history**</td>
       <td>Members with this role can view [group activity history](#group-activity-history).</td>
     </tr>
   </tbody>
   <thead>
     <tr>
       <th colspan="2">Experience Permissions</th>
     </tr>
   </thead>
   <tbody>
     <tr>
      <td>**Play all group experiences**</td>
      <td>Members with this role can play all experiences owned by the group, whether they're private or public. Optionally available as a [per‑experience permission][per_experience_permission].</td>
     </tr>
     <tr>
       <td>**Edit all group experiences**</td>
       <td>Members with this role can edit all experiences and [assets](../projects/assets/index.md) owned by the group. Does not include editing an experience outside of a [collaborative](../projects/collaboration.md) session or saving a place from one experience into another experience. Optionally available as a [per‑experience permission][per_experience_permission].</td>
     </tr>
     <tr>
       <td>**Edit & publish all group experiences**</td>
       <td>Members with this role can both edit experiences, as above, and also publish experiences to Roblox. Optionally available as a [per‑experience permission][per_experience_permission].</td>
     </tr>
     <tr>
       <td>**View all analytics for group experiences**</td>
       <td>Members with this role can access the [analytics](../production/analytics/index.md) of all experiences owned by the group, even if they don't have edit access. Optionally available as a [per‑experience permission][per_experience_permission].</td>
     </tr>
     <tr>
       <td>**Create and configure share links**</td>
       <td>Members with this role can create/configure [share links](../production/promotion/share-links.md).</td>
     </tr>
     <tr>
       <td>**View Data Stores Manager**</td>
       <td>Members with this role can access the [Data Stores Manager](../cloud-services/data-stores/data-stores-manager.md).</td>
     </tr>
     <tr>
       <td>**Configure bans for all group experiences**</td>
       <td>Members with this role can ban and manage banned users for all experiences owned by the group.</td>
     </tr>
   </tbody>
   <thead>
     <tr>
       <th colspan="2">Group Revenue</th>
     </tr>
   </thead>
   <tbody>
     <tr>
      <td>**Configure group revenue**</td>
      <td>Members with this role can view all group revenue, as below, and also directly manage it. This includes setting up [recurring payouts](#recurring-payouts), as well as sending [one‑time payouts](#one-time-payouts) to collaborators.</td>
     </tr>
     <tr>
       <td>**View group revenue**</td>
       <td>Members with this role can view the group Robux balance, any configured recurring split payouts, and (in the future) new revenue logging features.</td>
     </tr>
     <tr>
       <td>**Create Ad Campaigns for the group**</td>
       <td>Members with this role can advertise the group.</td>
     </tr>
   </tbody>
   <thead>
     <tr>
       <th colspan="2">Avatar Item Permissions</th>
     </tr>
   </thead>
   <tbody>
     <tr>
      <td>**Configure classic avatar items**</td>
      <td>Members with this role can configure classic avatar items such as 2D clothing.</td>
     </tr>
     <tr>
       <td>**Create classic avatar items**</td>
       <td>Members with this role can create classic avatar items such as 2D clothing.</td>
     </tr>
   </tbody>
   <thead>
     <tr>
       <th colspan="2">Open Cloud Permissions</th>
     </tr>
   </thead>
   <tbody>
     <tr>
      <td>**Manage all API keys**</td>
      <td>Members with this role can upload their own [Open Cloud API keys](../cloud/auth/api-keys.md) to the group, as well as configure everyone else's.</td>
     </tr>
     <tr>
       <td>**Manage own API keys**</td>
       <td>Members with this role can configure and upload their own [Open Cloud API keys](../cloud/auth/api-keys.md) to the group (but not configure everyone else's as above).</td>
     </tr>
   </tbody>
   <thead>
     <tr>
       <th colspan="2">Asset Permissions</th>
     </tr>
   </thead>
   <tbody>
     <tr>
      <td>**View development items**</td>
      <td>Members with this role can view development items owned by the group, for example **Audio**.</td>
     </tr>
     <tr>
      <td>**Create and configure development items**</td>
      <td>Members with this role can upload and configure asset development items such as **Decals**.</td>
     </tr>
     <tr>
      <td>**Manage development item permissions**</td>
      <td>Members with this role can configure permissions of development items, for example audio sharing.</td>
     </tr>
   </tbody>
   </table>

3. <Chip label="IMPORTANT" size="small" variant="outlined" color="warning" /> Click the **Save Changes** button to apply the permission settings.
4. <Chip label="OPTIONAL" size="small" variant="outlined" /> Click the **Settings** tab and choose a color for the role, then click **Save Changes**.

   <img src="../assets/creator-dashboard/Group-Roles-Settings-Tab.png" width="780" alt="Settings tab indicated for a group role on the Creator Dashboard." />

    <img src="../assets/creator-dashboard/Group-Roles-Role-Color.png" width="780" alt="Color options indicated for a group role on the Creator Dashboard." />

   <Alert severity="info">
   A role's **Settings** section is also where group owners and members with sufficient permissions can remove a role entirely through the **Delete Role** button.
   </Alert>

## Manage members

Once [roles](#roles-and-permissions) have been configured for the group, members can be invited and assigned from the **Collaboration** &rang; **Members** page.

<Alert severity="warning">
Member configuration is only accessible if you're the group owner or you have permission to manage other members and their roles.
</Alert>

### Invite members

You can invite new members through the **Invite** button in the upper‑right corner.

<img src="../assets/creator-dashboard/Group-Members-Invite-Button.png" width="880" alt="Invite button indicated in the group's Members section on the Creator Dashboard." />

From the popup, locate a creator by typing their username into the search field. Creators will be notified when invited to your group (a customizable setting within the creator notification system), or you can copy the **group link** and share it with invited creators through other means.

<img src="../assets/creator-dashboard/Group-Members-Invite-Popup.png" width="880" alt="Invite popup window indicated in the group's Members section on the Creator Dashboard." />

### Assign roles

To assign one or more roles to a member, hover over their name, click the **&#8942;** button, and then click the **&CirclePlus;** button for the desired role.

<img src="../assets/creator-dashboard/Group-Members-Assign-Role.png" width="880" alt="Roles management popup window showing how to assign a role to a group member on the Creator Dashboard." />

To quickly un-assign a role from the members overview, hover over it and click the **&CircleTimes;** button.

<img src="../assets/creator-dashboard/Group-Members-Un-Assign-Role.png" width="880" alt="Hover-over showing how to un-assign a role from a group member on the Creator Dashboard." />

<Alert severity="error">
Currently, roles configured through the legacy [Groups](https://www.roblox.com/communities) pages appear for each member, and new members are assigned the legacy **Member** role. If permissions were granted to a role through the legacy system, **the member will continue to have those permissions**, so it's recommended that you revoke permissions/roles in the legacy system and then migrate members to the new system.
</Alert>

### Remove members

To remove a member entirely, hover over their name and click the "trash" button. A dialog will appear for you to confirm their removal.

<img src="../assets/creator-dashboard/Group-Members-Remove-Member.png" width="880" alt="Hover-over showing how to remove a member from a group on the Creator Dashboard." />

## Manage payouts

If you're the owner of a selected group, you'll find a **Payouts** page under **Finances**. Here, you can send one‑time payouts, as well as define percentage splits with other members.

<Alert severity="info">
Some groups may not have this page unlocked initially for various reasons, such as the age of the group or insufficient funds to payout.
</Alert>

<Alert severity="warning">
Group owners can't share payouts across group members for experiences that charge for [paid access in local currency](../production/monetization/paid-access-local-currency.md).
</Alert>

### One-time payouts

Group owners can make one-time payouts to members in a batch, selecting a set amount for each. Safety features include 2FA challenges, confirmation dialogues, and checks around the eligibility of members being paid.

<img src="../assets/creator-dashboard/Group-Payouts-One-Time.png" width="880" alt="One-time payout button indicated in the Payouts section on the Creator Dashboard." />

### Recurring payouts

Group owners can also define recurring payouts across the entire group **and** per‑experience, assigning a percentage payout to each member before the remainder enters the group's overall balance.

<img src="../assets/creator-dashboard/Group-Payouts-Split-Options.png" width="880" alt="Split payout buttons indicated in the Payouts section on the Creator Dashboard." />

Consider the following scenario where a group experience **Laser Maze** is split 40%&ndash;30%&ndash;10% among three members, with a remainder of 20%.

<br />
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Assuming the experience earns 1000 Robux, the three members receive 400, 300, and 100 Robux respectively (40%&ndash;30%&ndash;10%).
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The remaining 200 Robux (20% of the experience split) passes onward to the **group split** percentages, defined at 20%&ndash;20%&ndash;10% among the same three members; they receive an additional 40, 40, and 20 Robux respectively.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The remaining 100 Robux (50% of the group split) is placed in the group's overall balance.
	</Grid>
</Grid>

<img src="../assets/creator-dashboard/Group-Payouts-Splits-Example.png" width="840" alt="Example flowchart of how experience splits are distributed to group members first, with remainder going factored into group splits for final distribution among the group." />

<Alert severity="warning">
Note that revenue from [private server](../production/monetization/private-servers.md) subscriptions does not change if you adjust split percentages at a later time, meaning that if a player buys a private server subscription, the split percentages at time of purchase will apply to that particular subscription forever (until it is canceled). This policy may be changed in the future.
</Alert>

## Group activity history

Group members with the **View group activity history** permission can view detailed activity such as role changes and publishing actions from the **Activity&nbsp;History** section under **Collaboration** on the Creator Dashboard. This is also a useful way for group owners to moderate activity that may violate [group guidelines](./group-guidelines.md).

## Intellectual property protection

Group members with permission to edit all group experiences can enable the [Place Copying](../production/publishing/publish-experiences-and-places.md#allow-copying) setting for a creation, potentially allowing the entire Roblox community to copy it and use assets within it. To help protect intellectual property in a group, the owner or members with sufficient permissions should:

- Confirm that each member is [assigned the appropriate role](#assign-roles).
- Check that each group role has the correct [permissions](#roles-and-permissions).
- Confirm that the [Place Copying](../production/publishing/publish-experiences-and-places.md#allow-copying) setting is disabled before private assets are added.

[per_experience_permission]: ../production/publishing/publish-experiences-and-places.md#configure-experiences
