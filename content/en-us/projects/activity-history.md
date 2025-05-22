---
title: Activity history
description: Activity history is a log of key configuration, publish, and edit activities within a place.
---

<Grid container spacing={4} alignItems="top">
	<Grid item XSmall={12} Medium={6} Large={6} xs={12} sm={12} md={6} lg={6}>
	The **Activity History** view in Studio is a shared log of key changes within an experience. Each entry tells you:
  <ul>
    <li>What changed</li>
    <li>Who changed it</li>
    <li>When they made the change</li>
  </ul>
  You can find similar information in an experience's **Activity History** page on the [Creator&nbsp;Hub](https://create.roblox.com/dashboard/creations), although the two views have some differences. See the [Event Reference](#event-reference).
	</Grid>
	<Grid item XSmall={12} Medium={6} Large={6} xs={12} sm={12} md={6} lg={6}>
	<img src="../assets/studio/general/Activity-History.png" width="360" alt="A view of the Activity History window showing various changes and updates." />
	</Grid>
</Grid>

## Work with Activity History

To open the Activity History view in Studio, your experience must be saved to Roblox.

1. In the [View](../studio/view-tab.md) tab, select **Activity History**. Events are displayed in chronological order, with the most recent appearing first.

   <img src="../assets/studio/general/View-Tab-Activity-History.png" width="720" alt="Activity History tool indicated in the View tab." />

1. If you have a large number of events, you can filter them by type or collaborator.
1. If you want to manage the configuration or get more details on a change, use the **&ctdot;** menu next to each event to get a link to the setting in either Studio or the Creator Hub.

## Event reference

Activity History shows the following events. Most are visible in Studio and the Creator Hub, but some are only visible in one location or the other.

### Place configuration

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Place published | &check; | &check;
Place name changed | &check; | &check;
Place description changed | &check; | &check;
Place added to experience |  | &check;
Place removed from experience |  | &check;
**Allow place to be copied as a template using Create Place API** changed | &check; | &check;
**Allow place to be updated using Save Place API** changed | &check; | &check;

### Place edits

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Script draft committed | &check; |

### Experience configuration

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Experience changed to public or private | &check; | &check;
Experience name changed | &check; | &check;
Experience description changed | &check; | &check;
Experience archived | &check; | &check;
Age recommendation questionnaire updated | &check; | &check;
**Shut down all servers** used | &check; | &check;
Playable devices changed | &check; | &check;
**Enable Studio Access to API Services** enabled or disabled | &check; | &check;

### Monetization settings

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
**Paid Access** enabled or disabled | &check; | &check;
Paid access price changed | &check; | &check;
**Allow Private Servers** enabled or disabled | &check; | &check;
Private servers price changed | &check; | &check;

### Notifications

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Notification string created |  | &check;
Notification string deleted |  | &check;
Notification string updated |  | &check;

For more information, see [Experience notifications](../production/promotion/experience-notifications.md).

### Collaboration permissions

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Collaborator added with edit or play permissions | &check; | &check;
Collaborator permissions level changed | &check; | &check;
Collaborator removed | &check; | &check;
Group given play permissions | &check; | &check;
Group with play permissions removed | &check; | &check;
Group role's permissions to this experience changed | &check; | &check;

For more information, see [Group roles and permissions](../projects/groups.md#roles-and-permissions).
