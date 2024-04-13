---
title: Group Collaboration
description: Explains Roblox groups and how to collaborate with multiple people creating the same experience.
---

A Roblox **group** allows multiple creators to work on the same experience, use the same assets, share profits, and give credit to all contributors.

<Alert severity="warning">
Group ownership of experiences help creators collaborate and operate as independent studios. If a conflict arises within your group, Roblox cannot help arbitrate or resolve disagreements.
</Alert>

## Creating a New Group

Creating a group costs 100 Robux. To create a group:

1. Navigate to the [Create Group](https://www.roblox.com/groups/create) page and complete the form. The **Name** and **Emblem** are required.
1. Click the green button to create the new group.

## Roles and Permissions

### Configuring Roles

Group owners can configure the **roles** for other members in the group. The default roles are **Owner**, **Admin**, **Member**, and **Guest**. You can change the names and descriptions for default roles, and you can create additional roles for 25 Robux each. Each role has a **Rank** value from 0 to 255 (lowest to highest).

To configure roles:

1. Navigate to the [Groups](https://www.roblox.com/groups) page and select your group.
1. Click the **&ctdot;** button in the upper-right corner and select **Configure&nbsp;Group**.

   <img src="../assets/publishing/groups/Configure-Group.png" alt="A group's landing page with the ellipis button and Configure Group menu item highlighted." width="780" />

1. In the left column, select the **Roles** tab.

   <img src="../assets/publishing/groups/Group-Admin-Roles.png" alt="A close up view of the left column with the Roles navigation item highlighted." width="160" />

1. To secure your group and its creations, inspect and adjust the permissions for each role. Commonly managed options include:

   <table>
   <thead>
	 <tr>
     <th colspan="2">Members</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>**Manage lower‑ranked member ranks**</td>
     <td>Change the role of other members currently assigned to a lower‑ranked role.</td>
   </tr>
   <tr>
     <td>**Accept join requests**</td>
     <td>Accept or deny any pending requests to join the group, assuming the group is currently set to require manual approval.</td>
   </tr>
   <tr>
     <td>**Kick lower‑ranked members**</td>
     <td>Kick out members assigned to lower‑ranked roles.</td>
   </tr>
   </tbody>
   <thead>
	 <tr>
     <th colspan="2">Assets</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>**Spend group funds**</td>
     <td>Use the group's funds for certain group‑related actions.</td>
   </tr>
   <tr>
     <td>**Create and edit group experiences**</td>
     <td>Create and edit experiences and assets that are specifically owned by the group. See [here](../projects/collaboration.md#group-owned-experiences) for how this setting relates to collaborative sessions.</td>
   </tr>
   <tr>
     <td>**View group experience analytics**</td>
     <td>View analytics for group experiences. See [here](../production/analytics/analytics-dashboard.md#granting-group-permission) for details.</td>
   </tr>
   </tbody>
   </table>

   <Alert severity="warning">
   By default, only the group owner has the **Create and edit group experiences** permission, a requirement for being a [collaborator](../projects/collaboration.md) in a team session. This permission should be granted with care because members who have it may threaten the [safety](#safety-in-group-experiences) of the group's experiences.
   </Alert>

### Assigning Roles

If you're the group owner or are assigned to a role with the correct permissions by the group owner, you can edit members in roles ranked lower than your own.

To assign roles:

1. In the left column, select the **Members** tab.
1. Using the drop-down menu below each group member, select a role.

   <img src="../assets/publishing/groups/Assign-Role.png" alt="A close up view of a member of a group. The dropdown menu is extended, and the Member role is highlighted." width="340" />

## Managing Payouts

You can use groups to share Robux revenue. Group owners can pay contributors by either transferring group funds as a one-time payout or by scheduling recurring payouts. Roblox monitors payouts to prevent fraud and abuse.

To manage payouts:

1. Navigate to the [Groups](https://www.roblox.com/groups) page and select your group.
1. Click the **&ctdot;** button in the upper-right corner and select **Configure&nbsp;Group**.

   <img src="../assets/publishing/groups/Configure-Group.png" alt="A group's landing page with the ellipis button and Configure Group menu item highlighted." width="780" />

1. In the left column, hover over **Revenue** and then click **Payouts**.

   <img src="../assets/publishing/groups/Group-Admin-Revenue-Payouts.png" alt="A close up view of the left column with the Revenue navigation item highlighted, as well as the Payouts submenu item." width="330" />

	 From the payouts screen, initiate a **recurring payout** or **one‑time payout**.

	 <Tabs>
	 <TabItem label="Recurring Payout">
	 Group owners can configure recurring payouts to automatically share profits when the group earns them. There's a short delay from when the group earns the funds and when they distribute to members. When you change a member's recurring payout, Roblox sends a message notification to that member to inform them of the change.

   To configure recurring payouts:

   1. Select the **Recurring Payout** tab.

      <img src="../assets/publishing/groups/Group-Admin-Payouts-Recurring.png" alt="A close up view of both the Recurring Payout and One-Time Payout tabs. The Recurring Payout tab is highlighted." width="800" />

   2. Add one or more payout recipients by clicking the **Add Payout Recipient** button.
   3. Next to each member, enter the percentage of the group's Robux that you would like them to receive every month. To remove them from the payout, click the "trash" button.
   4. After everything looks correct, click **Save**.

   </TabItem>
   <TabItem label="One-Time Payout">
   Group owners can perform one-time payouts of Robux to a single group member or multiple members. This payout can be a lump sum or a percentage of the group's total funds, but you can only distribute Robux in whole numbers. If you choose to distribute by percentage, the amount rounds down to the nearest whole number of Robux, and the remainder remains in the group's funds.

   To make a one-time payout:

   1. Select the **One-time Payout** tab.

      <img src="../assets/publishing/groups/Group-Admin-Payouts-One-Time.png" alt="A close up view of both the Recurring Payout and One-Time Payout tabs. The One-time Payout tab is highlighted." width="800" />

   2. Use the drop-down menu to choose whether the payout is a set amount or a percentage of the group's total Robux balance.
   3. Add one or more payout recipients by clicking the **Add Payout Recipient** button.
   4. Next to each member, enter the amount or percentage you want to give to them. To remove them from the payout, click the "trash" button.
   5. After everything looks correct, click **Distribute**.

   </TabItem>
   </Tabs>

## Safety in Group Experiences

Group members with the **Create and edit group experiences** permission can enable the **Place&nbsp;Copying** setting for a creation, potentially allowing the entire Roblox community to copy it and use assets within it. The following tips can help you improve the safety and intellectual property protections in group experiences.

- Check that each group role has the correct [permissions](#roles-and-permissions). If you don't want members with a role to have the editing permissions, disable **Create and edit group experiences** for that role.
- Confirm that each member is [assigned](#assigning-roles) the appropriate role.
- Confirm that [Place Copying](../production/publishing/publishing-experiences-and-places.md#allowing-copying) is **disabled** before you add assets that you don't want others to copy.
