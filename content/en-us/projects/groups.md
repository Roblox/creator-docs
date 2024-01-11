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
1. Click the **&hellip;** button in the upper-right corner and select **Configure&nbsp;Group**.

   <img src="../assets/publishing/groups/Configure-Group.png" width="800" />

1. In the left column, select the **Roles** tab.

   <img src="../assets/publishing/groups/Group-Admin-Roles.png" width="353" />

1. To secure your group and its creations, inspect and adjust the permissions for each role.

<table>
<thead>
	<tr>
		<th colspan='2'>Posts</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><b>View group wall</b></td>
		<td>View discussions on the group's wall.</td>
	</tr>
	<tr>
		<td><b>Post on group wall</b></td>
		<td>Participate in conversations on the group's wall.</td>
	</tr>
	<tr>
		<td><b>Delete group wall posts</b></td>
		<td>Delete posts that other members have made on the group's wall.</td>
	</tr>
	<tr>
		<td><b>View group shout</b></td>
		<td>See the group status.</td>
	</tr>
	<tr>
		<td><b>Post group shout</b></td>
		<td>Update the group status.</td>
	</tr>
</tbody>
<thead>
	<tr>
		<th colspan='2'>Members</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><b>Manage lower-ranked member ranks</b></td>
		<td>Change the role of other members currently assigned to a lower-ranked role.</td>
	</tr>
	<tr>
		<td><b>Accept join requests</b></td>
		<td>Accept or deny any pending requests to join the group, assuming the group is currently set to require manual approval.</td>
	</tr>
	<tr>
		<td><b>Kick lower-ranked members</b></td>
		<td>Kick out members assigned to lower-ranked roles.</td>
	</tr>
</tbody>
<thead>
	<tr>
		<th colspan='2'>Miscellaneous</th>
	</tr>
</thead>
<tbody>
	<tr>
			<td><b>Manage allies and enemies</b></td>
			<td>Declare or remove 'ally' and 'enemy' groups that display on the group's profile.</td>
	</tr>
	<tr>
			<td><b>View audit log</b></td>
			<td>Monitor changes regarding the group.</td>
	</tr>
</tbody>
<thead>
	<tr>
		<th colspan='2'>Assets</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><b>Spend group funds</b></td>
		<td>Use the group's funds for certain group-related actions.</td>
	</tr>
	<tr>
		<td><b>Advertise the group</b></td>
		<td>Create ads for the group via the <b>Advertise Group</b> menu option.</td>
	</tr>
	<tr>
		<td><b>Create group items</b></td>
		<td>Create group items via the <b>Store</b> tab on the group's main page.</td>
	</tr>
	<tr>
		<td><b>Configure group items</b></td>
		<td>Manage existing items via the <b>Store</b> tab on the group's main page.</td>
	</tr>
	<tr>
		<td><b>Create and edit group experiences</b></td>
		<td>Create and edit experiences and assets that are specifically owned by the group.</td>
	</tr>
	<tr>
		<td><b>View group experience analytics</b></td>
		<td>View analytics for group experiences.</td>
	</tr>
</tbody>
<thead>
	<tr>
		<th colspan='2'>Open Cloud</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><b>Create group API keys</b></td>
		<td>Create and view API keys for this role, but not manage keys for other roles.</td>
	</tr>
	<tr>
		<td><b>Administer all group API keys</b></td>
		<td>Gain all of the permissions that a group owner has for API keys, including the ability to create, view, edit, revoke, and audit all of the group's keys.</td>
	</tr>
</tbody>
</table>

<Alert severity="warning">
By default, only the group owner has the <b>Create and edit group experiences</b> permission, a requirement for being a collaborator in [Team Create](../projects/collaboration.md#team-create). This permission should be granted with care because members who have it may threaten the <a href="#safety-in-group-experiences">safety</a> of the group's experiences.
</Alert>

### Assigning Roles

If you're the group owner or are assigned to a role with the correct permissions by the group owner, you can edit members in roles ranked lower than your own.

To assign roles:

1. In the left column, select the **Members** tab.
1. Using the drop-down menu below each group member, select a role.

   <img src="../assets/publishing/groups/Assign-Role.png" width="340" />

## Publishing Group Places

If you're the group owner or a member with the **Create and edit group experiences** permission, you can publish a group place as follows.

### New Experience

1. In Studio, select **File** &rarr; **Publish to Roblox**.
1. Near the bottom of the window, click **Create new game**.
1. Enter a place name and an optional description.
1. For the **Creator** field, select the group for which you'd like to publish the place.

   <img src="../assets/publishing/groups/Publish-To-Group-New.png" width="800" />

1. When ready, click the **Create** button.

### To Existing Experience

1. Select **File** &rarr; **Publish to Roblox**.
1. Select a group from the drop-down menu.

   <img src="../assets/publishing/groups/Publish-To-Group-Existing.png" width="800" />

1. Click an existing group experience. On the next screen you can:

   - Add the place you're publishing as a **new** place within the same experience.
   - Overwrite an existing place within the experience.

1. Click the **Create** or **Overwrite** button.

## Managing Payouts

You can use groups to share Robux revenue. Group owners can pay contributors by either transferring group funds as a one-time payout or by scheduling recurring payouts. Roblox monitors payouts to prevent fraud and abuse.

To manage payouts:

1. Navigate to the [Groups](https://www.roblox.com/groups) page and select your group.
1. Click the **&hellip;** button in the upper-right corner and select **Configure&nbsp;Group**.

   <img src="../assets/publishing/groups/Configure-Group.png" width="800" />

1. In the left column, hover over **Revenue** and then click **Payouts**.

   <img src="../assets/publishing/groups/Group-Admin-Revenue-Payouts.png" width="353" />

### One-Time Payouts

Group owners can perform one-time payouts of Robux to a single group member or multiple members. This payout can be a lump sum or a percentage of the group's total funds, but you can only distribute Robux in whole numbers. If you choose to distribute by percentage, the amount rounds down to the nearest whole number of Robux, and the remainder remains in the group's funds.

To transfer a one-time payout:

1. Select the **One-time Payout** tab.

   <img src="../assets/publishing/groups/Group-Admin-Payouts-One-Time.png" width="800" />

1. Use the drop-down menu to choose whether the payout is a set amount or a percentage of the group's total Robux balance.

1. Add one or more payout recipients by clicking the **Add Payout Recipient** button.

1. Next to each member, enter the amount or percentage you want to give to them. To remove them from the payout, click the "trash" button.

1. After everything looks correct, click **Distribute**.

### Recurring Payouts

Group owners can configure recurring payouts to automatically share profits when the group earns them. There's a short delay from when the group earns the funds and when they distribute to members. When you change a member's recurring payout, Roblox sends a message notification to that member to inform them of the change.

To configure recurring payouts:

1. Select the **Recurring Payout** tab.

   <img src="../assets/publishing/groups/Group-Admin-Payouts-Recurring.png" width="800" />

1. Add one or more payout recipients by clicking the **Add Payout Recipient** button.
1. Next to each member, enter the percentage of the group's Robux that you would like them to receive every month. To remove them from the payout, click the "trash" button.

1. After everything looks correct, click **Save**.

## Safety in Group Experiences

Group members with the **Create and edit group experiences** permission can enable the **Allow&nbsp;Copying** setting for a creation, potentially allowing the entire Roblox community to copy and use it. The following tips can help you improve the safety and intellectual property protections in group experiences.

- Check that each group role has the correct [permissions](#roles-and-permissions). If you don't want members with a role to have the editing permissions, disable **Create and edit group experiences** for that role.
- Confirm that each member is [assigned](#assigning-roles) the appropriate role.
- Confirm that **Allow Copying** is disabled for a place before you add assets that you don't want others to copy.
