---
title: Groups (teams)
description: Explains Roblox groups and how to collaborate with multiple creators on the same game.
---

A Roblox **group** allows multiple creators to work on the same game, use the same assets, share profits, and give credit to all contributors.

<Alert severity="error">
Group ownership of games helps creators collaborate and operate as independent studios. If a conflict arises within a group, Roblox cannot help arbitrate or resolve disagreements.
</Alert>

## Group creation

Creating a group costs 100 Robux. You can manage its [roles and permissions](#roles-and-permissions) from the [Creator Dashboard](https://create.roblox.com/dashboard/creations) or [Communities](https://www.roblox.com/communities).

<Alert severity="warning">
Before creating a group, carefully read through the [rules and expectations](./group-guidelines.md) for group management.
</Alert>

To create a new group:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations), expand the account switcher in the upper‑left, and click the **plus (+)** button.
2. On the **Create Group** page, upload an image for the group logo and enter the group name.
3. When ready, click the **Purchase** button. Once the group is created, you'll be directed to the group profile page where you can modify the group's details, including adding up to three social links.

## Roles and permissions

Group members can be assigned one or multiple **roles** within a group, and each role has **permissions** which specify the abilities of its members.

<Alert severity="warning">
Role configuration is only accessible if you're the group owner or you have permission to create, configure, and assign group roles.
</Alert>

1. From the [Creator Dashboard](https://create.roblox.com/dashboard/creations), expand the account switcher in the upper‑left and select the group.
2. Expand the account switcher again and select **Roles**.
3. For each role, carefully confirm the permissions under the **Permissions** tab.

   Permissions are organized into **General**, **Creation**, and **Community** categories. The sections below describe the permissions available in each category.

   ### General

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">General permissions</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Manage roles**</td>
       <td>Members with this permission can create, edit, delete, reorder, and assign or unassign roles below their highest role. They can only edit permissions they already hold.</td>
     </tr>
     <tr>
       <td>**Assign or remove roles from members**</td>
       <td>Members with this permission can assign or unassign roles below their highest role to any member.</td>
     </tr>
     <tr>
       <td>**Invite or approve members**</td>
       <td>Members with this permission can invite people to the group and approve join requests.</td>
     </tr>
     <tr>
       <td>**Kick members**</td>
       <td>Members with this permission can remove members whose highest role is below their own.</td>
     </tr>
     <tr>
       <td>**Ban members**</td>
       <td>Members with this permission can ban members whose highest role is below their own.</td>
     </tr>
     <tr>
       <td>**View audit logs**</td>
       <td>Members with this permission can view [group audit logs](#group-audit-logs).</td>
     </tr>
     <tr>
       <td>**Manage allies and enemies**</td>
       <td>Members with this permission can manage the group's allies and enemies.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   ### Creation

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Creations</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
      <td width="40%">**Playtest all group experiences**</td>
      <td>Members with this role can play all games owned by the group, whether they're private or public. Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**Edit all group experiences**</td>
       <td>Members with this role can edit all games and [assets](../projects/assets/index.md) owned by the group and use all features in the [Data Stores Manager](../cloud-services/data-stores/data-stores-manager.md). Does not include editing a game outside of a [collaborative](../projects/collaboration.md) session or saving a place from one game into another game. Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**Edit and publish all group experiences**</td>
       <td>Members with this role can both edit games, as above, and also publish games to Roblox. Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**Create and manage share links**</td>
       <td>Members with this role can create/configure [share links](../production/promotion/share-links.md).</td>
     </tr>
     <tr>
       <td>**Create and manage experience events**</td>
       <td>Members with this role can create/configure [experience events](../production/promotion/experience-events.md).</td>
     </tr>
     <tr>
       <td>**Access read-only chat (must be 18+) and manage bans for all group experiences**</td>
       <td>Members with this role can view all in-game chat messages and ban or manage banned users across all games owned by the group.</td>
     </tr>
     <tr>
       <td>**Manage monetization for all group experiences**</td>
       <td>Members with this role can manage monetization products such as [passes](../production/monetization/passes.md), [developer products](../production/monetization/developer-products.md), [subscriptions](../production/monetization/subscriptions.md), and more. Optionally available as a [per-game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**List, create, update, and delete secrets for all group experiences**</td>
       <td>Members with this role can see the list of [secrets](../cloud-services/secrets.md) and can create, update, and delete secrets for all games owned by the group. Members with this role require **Edit all group experiences** permission to view the Secrets page. Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Analytics</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**View all analytics for group experiences**</td>
       <td>Members with this role can access the [analytics](../production/analytics/index.md) of all games owned by the group, even if they don't have edit access. Optionally available as a [per-game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**Create and manage alerts**</td>
       <td>Members with this role can create and manage analytics alerts. Pair this permission with **View all analytics for group experiences** to see alert annotations directly on metrics graphs.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Monetization</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**View group revenue**</td>
       <td>Members with this role can view the group Robux balance, any configured recurring split payouts, and revenue logging features.</td>
     </tr>
     <tr>
      <td>**Manage and spend group revenue**</td>
      <td>Members with this role can view all group revenue, as above, and also directly manage it. This includes setting up [recurring payouts](#recurring-payouts) and sending [one‑time payouts](#one-time-payouts) to collaborators.</td>
     </tr>
     <tr>
       <td>**Create Ad campaigns for the group**</td>
       <td>Members with this role can advertise the group.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Avatar items</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Manage avatar items**</td>
      <td>Members with this role can configure avatar items such as clothing.</td>
     </tr>
     <tr>
       <td>**Create avatar items**</td>
       <td>Members with this role can create avatar items such as clothing.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">API</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Manage API keys**</td>
       <td>Members with this role can manage [Open Cloud API keys](../cloud/auth/api-keys.md) for the group.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Development items</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
      <td width="40%">**View development items**</td>
      <td>Members with this role can view development items owned by the group, for example **Audio**.</td>
     </tr>
     <tr>
       <td>**Create and manage development items**</td>
      <td>Members with this role can upload and configure asset development items such as **Decals**.</td>
     </tr>
     <tr>
      <td>**Manage development item permissions**</td>
      <td>Members with this role can configure permissions of development items, for example audio sharing.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

    <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Data Stores</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**View Data Stores for all group experiences**</td>
      <td>Members with this role can view data stores for all group games through the [Data Stores Manager](../cloud-services/data-stores/data-stores-manager.md), but they cannot delete data. Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**Edit Data Stores for all group experiences**</td>
      <td>Members with this role can delete specific keys within data stores for all group games through the [Data Stores Manager](../cloud-services/data-stores/data-stores-manager.md). Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
     <tr>
       <td>**Delete Data Stores for all group experiences**</td>
      <td>Members with this role can delete entire data stores for all group games through the [Data Stores Manager](../cloud-services/data-stores/data-stores-manager.md). Optionally available as a [per‑game permission](./configure-games.md).</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Notifications</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**List, create, update, and delete webhooks for all group experiences**</td>
       <td>Members with this role can list, create, update, and delete webhooks for all group experiences.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Communication</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Manage support tickets for all group experiences**</td>
       <td>Members with this role can manage support tickets for all group experiences.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Legacy</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Create and edit access to this group's resources**</td>
       <td>Members with this role can create and edit access to the group's resources.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   ### Community

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Posts</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**View community announcements**</td>
       <td>Members with this role can view community announcements.</td>
     </tr>
     <tr>
       <td>**Create community announcements**</td>
       <td>Members with this role can create community announcements.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Forums</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Manage categories**</td>
       <td>Members with this role can manage forum categories.</td>
     </tr>
     <tr>
       <td>**Create posts**</td>
       <td>Members with this role can create forum posts.</td>
     </tr>
     <tr>
       <td>**Remove posts**</td>
       <td>Members with this role can remove forum posts.</td>
     </tr>
     <tr>
       <td>**Lock posts**</td>
       <td>Members with this role can lock forum posts.</td>
     </tr>
     <tr>
       <td>**Pin posts**</td>
       <td>Members with this role can pin forum posts.</td>
     </tr>
     <tr>
       <td>**Create comments**</td>
       <td>Members with this role can create comments on forum posts.</td>
     </tr>
     <tr>
       <td>**Remove comments**</td>
       <td>Members with this role can remove comments from forum posts.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Content moderation</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Manage content moderation**</td>
       <td>Members with this role can manage content moderation.</td>
     </tr>
     <tr>
       <td>**View content moderation**</td>
       <td>Members with this role can view content moderation.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion>

   <BaseAccordion>
   <AccordionSummary><Typography variant="subtitle2">Miscellaneous</Typography></AccordionSummary>
   <AccordionDetails>
   <table>
   <tbody>
     <tr>
       <td width="40%">**Bypass slow mode**</td>
       <td>Members with this role can bypass slow mode.</td>
     </tr>
     <tr>
       <td>**View community analytics**</td>
       <td>Members with this role can view community analytics.</td>
     </tr>
   </tbody>
   </table>
   </AccordionDetails>
   </BaseAccordion><br />

4. <Chip label="IMPORTANT" size="small" variant="outlined" color="warning" /> Click the **Save Changes** button to apply the permission settings.
5. <Chip label="OPTIONAL" size="small" variant="outlined" /> Click the **Settings** tab and choose a color and visibility setting for the role, then click **Save Changes**.

   <Alert severity="info">
   A role's **Settings** section is also where group owners and members with sufficient permissions can remove a role entirely through the **Delete Role** button.
   </Alert>

Roles are listed in hierarchy order: a role higher in the list has more
authority than a role below it. This order matters because some permissions
only let members manage roles below their own highest role.

Each role is either **public** or **private**. Public roles can be shown on a
Community page and in experiences. Private roles are shown only on role and
permission management surfaces to authorized members, or to members who hold
the private role. Visibility changes where a role appears; it doesn't change
the permissions the role grants.

<Alert severity="warning">
To grant **Manage roles**, **Assign or remove roles from members**, **Create and
edit access to this group's resources**, **Manage and spend group revenue**, or
**Delete Data Stores for all group experiences**, you must have two-step
verification enabled.
</Alert>

## Manage members

<Alert severity="warning">
Member configuration is only accessible if you're the group owner or you have permission to manage other members and their roles.
</Alert>

To manage members from the Creator Dashboard:

1. Expand the account switcher in the upper-left and select the group.
2. Expand the account switcher again and select **Members**.
3. Use the **Member** tab to search for existing members or filter them by role. Use the **Invited** tab to review pending invitations.

To add a member, click **Invite** and search for their username. Roblox notifies invited creators according to their notification preferences. You can also copy the group link and share it directly.

### Manage roles

You can manage role assignments from either the **Members** page or a specific role:

- On the **Members** page, click the **plus (+)** button next to a member to open the role menu. To assign a role, click the **plus (+)** button next to it under **Add roles**. To unassign a role, click the **minus (-)** button next to it under **Current roles**, or click the **&times;** button on an assigned role next to the member's name.
- On the **Roles** page, select a role and open its **Members** tab. Click **Add members** to search for group members and assign them to the role. To unassign a member, click the **minus (-)** button at the end of their row.

### Member removal

To remove a member from the group, click the **&#8942;** button at the end of their row, select **Kick user**, and confirm the action.

## Manage payouts

If you're the group owner or you have the correct [permission](#roles-and-permissions) within **Group&nbsp;Revenue**, you'll find a **Payouts** page under **Finances** in the left navigation. Here, you can send one‑time payouts, as well as define percentage splits with other members.

<Alert severity="info">
Some groups may not have this page unlocked initially for various reasons, such as the age of the group or insufficient funds to payout.
</Alert>

<Alert severity="warning">
Payouts cannot be shared across group members for games that charge for [paid access in local currency](../production/monetization/paid-access-local-currency.md).
</Alert>

### One-time payouts

One-time payouts can be made to members in a batch, selecting a set amount for each. Safety features include 2FA challenges, confirmation dialogues, and checks around the eligibility of members being paid.

<img src="../assets/creator-dashboard/Group-Payouts-One-Time.png" width="880" alt="One-time payout button indicated in the Payouts section on the Creator Dashboard." />

Once you click the **Send Robux** button, you can choose payout recipients from the popup or upload a `.csv` spreadsheet file with the columns `userId` and `payoutInRobux`, for example:

<GridContainer numColumns="2">
  <figure>
    <table size="small">
<thead>
  <tr>
    <th>userId</th>
    <th>payoutInRobux</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>012345</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>098765</td>
    <td>7000</td>
  </tr>
</tbody>
</table>
  </figure>
  <figure>
  </figure>
</GridContainer>

### Recurring payouts

Recurring payouts can also be made across the entire group **and** per‑game, assigning a percentage payout to each member before the remainder enters the group's overall balance.

<img src="../assets/creator-dashboard/Group-Payouts-Split-Options.png" width="880" alt="Split payout buttons indicated in the Payouts section on the Creator Dashboard." />

Consider the following scenario where a group game **Laser Maze** is split 40%&ndash;30%&ndash;10% among three members, with a remainder of 20%.

<br />
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Assuming the game earns 1000 Robux, the three members receive 400, 300, and 100 Robux respectively (40%&ndash;30%&ndash;10%).
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The remaining 200 Robux (20% of the game split) passes onward to the **group split** percentages, defined at 20%&ndash;20%&ndash;10% among the same three members; they receive an additional 40, 40, and 20 Robux respectively.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	The remaining 100 Robux (50% of the group split) is placed in the group's overall balance.
	</Grid>
</Grid>

<img src="../assets/creator-dashboard/Group-Payouts-Splits-Example.png" width="840" alt="Example flowchart of how game splits are distributed to group members first, with remainder going factored into group splits for final distribution among the group." />

<Alert severity="warning">
Note that revenue from [private server](../production/monetization/private-servers.md) subscriptions does not change if you adjust split percentages at a later time, meaning that if a player buys a private server subscription, the split percentages at time of purchase will apply to that particular subscription forever (until it is canceled). This policy may be changed in the future.
</Alert>

## Group audit logs

Group members with the **View audit logs** permission can review group changes using these group management surfaces:

- On the Creator Dashboard, select **Activity&nbsp;History** under **Collaboration**.
- On Communities, open the community's configuration page and select **Audit Log**.

Group owners can use these logs to monitor activity that might violate [group guidelines](./group-guidelines.md).

## Intellectual property protection

Group members with permission to edit all group games can enable the [Place Copying](./configure-games.md#allow-copying) setting for a creation, potentially allowing the entire Roblox community to copy it and use assets within it. To help protect intellectual property in a group, the owner or members with sufficient permissions should:

- Confirm that each member is [assigned the appropriate role](#manage-roles).
- Check that each group role has the correct [permissions](#roles-and-permissions).
- Confirm that the [Place Copying](./configure-games.md#allow-copying) setting is disabled before private assets are added.
