---
title: Activity History
description: Activity History is a log of key configuration, publish, and edit activities within a place.
---

<Grid container spacing={2}>
  <Grid item container md={7}  direction="row" style={{gap: 24, marginBottom: 12}}>
  <Grid item container wrap="nowrap" direction="column" style={{gap: 8, flex: 1}}>
  The **Activity History** view in Roblox Studio is a shared log of key changes within your experience. Each entry tells you:
  <ul>
    <li>What changed</li>
    <li>Who changed it</li>
    <li>When they made the change</li>
  </ul>
  You can find similar information in the **Activity History** page for your experience on the [Creator Hub](https://create.roblox.com/dashboard/creations), although the two views have some differences. See the [Event Reference](#event-reference).
  </Grid>
  </Grid>
  <Grid item container md={5}  direction="row" style={{gap: 24, marginBottom: 12}}>
  <Grid item container wrap="nowrap" direction="column" style={{gap: 8, flex: 1}}>
    <img src="../assets/studio/collaboration/Activity-History.png" alt="A view of the Activity History screen showing several collaborators." />
  </Grid>
  </Grid>
</Grid>

## Working with Activity History

To open the Activity History view in Studio, your experience must be saved to Roblox.

1. In the **View** tab, select **Activity History**. Events are displayed in chronological order, with the most recent appearing first.
1. If you have a large number of events, you can filter them by type or collaborator.
1. If you want to manage the configuration or get more details on a change, use the **&ctdot;** menu next to each event to get a link to the setting in either Studio or the Creator Hub.

## Event Reference

Activity History shows the following events. Most are visible in Studio and the Creator Hub, but some are only visible in one location or the other.

### Place Configuration

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Place published | &check; | &check;
Place name changed | &check; | &check;
Place description changed | &check; | &check;
Place added to experience |  | &check;
Place removed from experience |  | &check;
**Allow place to be copied as a template using Create Place API** changed | &check; | &check;
**Allow place to be updated using Save Place API** changed | &check; | &check;

### Experience Configuration

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

### Monetization Settings

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

For more information, see [Experience Notifications](../production/promotion/experience-notifications.md).

### Collaboration Permissions

Event | Shown in Studio | Shown in Creator Hub
:--- | :---: | :---:
Collaborator added with edit or play permissions | &check; | &check;
Collaborator permissions level changed | &check; | &check;
Collaborator removed | &check; | &check;
Group given play permissions | &check; | &check;
Group with play permissions removed | &check; | &check;
Group role's permissions to this experience changed | &check; | &check;

For more information, see [Group Roles and Permissions](../projects/groups.md#roles-and-permissions)
