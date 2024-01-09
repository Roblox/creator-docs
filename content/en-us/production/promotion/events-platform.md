---
title: Events Platform
description: Events Platform lets you create time-based events for your experience.
---

As part of your [promotion](../../production/promotion/index.md) initiatives, the integrated **Events&nbsp;Platform** lets you create time-based events for your experience. Users can discover your events on the experience's detail page and through an [event details page](#event-details-page). Users can also opt into [notifications](#streampush-notifications) that they'll receive when your event begins.

<img src="../../assets/promotion/events-platform/Dedicated-Event-Page-Live.jpg" width="810" alt="Example event page on the Roblox website" />

## Managing Events

You can manage events through the [Creator Dashboard][creatordashboard], under the [Events][eventsupcoming] tab.

<img src="../../assets/creator-dashboard/Creations-Events.png" width="780" alt="Events section on the Creator Dashboard" />

### Creating Events

To create an event, you must be the **group owner** of any [group-owned](../../projects/groups.md) experience, or be the sole owner of a user-owned experience. Currently, you can publish a maximum of 10 ongoing or upcoming events.

1. Navigate to the [Creator Dashboard][creatordashboard].
2. With the [Events][eventsupcoming] tab selected, click the **Create Event** button.
3. On the event creation screen, enter the **event name**, a starting date/time at least 15 minutes in the future, and an ending date/time.

   <img src="../../assets/creator-dashboard/Event-Name-Duration.png" width="780" alt="Event name and date range entry on Events page of the Creator Dashboard" />

4. To the left of the larger center image, click the **Select Experience** widget, choose the experience associated with your event, and click the **Confirm** button.

   <Grid container spacing={2}>
   <Grid item xs={12} lg={3}>
   <img src="../../assets/creator-dashboard/Event-Select-Experience-Button.png" width="190" alt="Select Experience widget on the Creator Dashboard" />
   </Grid>
   <Grid item xs={12} lg={9}>
   <img src="../../assets/creator-dashboard/Event-Select-Experience-Menu.png" width="600" alt="Experience Picker widget on the Creator Dashboard" />
   </Grid>
   </Grid>

5. Once confirmed, the experience's [icon](../../production/publishing/experience-icons.md) will appear and the on-page carousel will be populated with the experience's [promotional thumbnails](../../production/promotion/promotional-thumbnails.md).

   <Grid container spacing={2}>
   <Grid item xs={12} lg={3}>
   <img src="../../assets/creator-dashboard/Event-Select-Experience-Button-Filled.png" width="190" alt="Select Experience widget showing an experience linked to the event" />
   </Grid>
   <Grid item xs={12} lg={9}>
   <img src="../../assets/creator-dashboard/Event-Thumbnail-Carousel.jpg" width="600" alt="Experience thumbnail applied to event" />
   </Grid>
   </Grid>

6. Below the carousel, enter a **description** in the input box. Your description should follow general [best practices](../../production/publishing/publishing-experiences-and-places.md#metadata-best-practices) and accurately portray the event, including:

   - A summary of the event and how it relates to the overall experience. If you're using the event to promote a major update such as a new "season" or new places to explore, summarize the updates.
   - Incentives for players to join the event, such as exclusive event-specific [merch](../../resources/modules/merch-booth.md), "boss&nbsp;fight" challenges, [badges](../../production/publishing/badges.md) that may be earned during the event, and more.

7. When ready, click **Publish Event** to immediately publish the [event details page](#event-discovery) and make your event discoverable on the experience's detail page. If you're not ready to publish the event, click **Save** to keep an editable draft for [future publication](#publishing-draft-events).

   <img src="../../assets/creator-dashboard/Event-Publish-Save-Buttons.png" width="780" alt="Publish Event and Save (Draft) buttons on the Creator Dashboard" />

   <Alert severity="warning">
   Note that you cannot change the event's associated experience after publishing, and assets that are pending review or are moderated will display a placeholder.
   </Alert>

### Publishing Draft Events

Events that you saved as **drafts** during creation remain editable until you publish them. You can find drafted events on the [Drafts][eventsdrafts] page of the [Creator Dashboard][creatordashboard].

<img src="../../assets/creator-dashboard/Event-Drafts-Button.png" width="780" alt="Drafts category button on Creator Dashboard"/>

To publish a draft event:

1. Hover over the event thumbnail, click the **&ctdot;** button, and select **Configure Event**.

   <img src="../../assets/creator-dashboard/Event-Context-Menu-Configure-Event.png" width="600" alt="Event's right-click context menu indicating the selection of Configure Event" />

2. Confirm or update the event details, then click **Publish Event** to immediately publish the [event details page](#event-discovery) and add the event to the **Events** section of the experience's detail page. Remember that you cannot change the event's associated experience after publishing, and assets that are pending review or are moderated will display a placeholder.

### Canceling or Deleting Events

To cancel an upcoming/active event, or to delete a draft/past/canceled event and remove its detail page.

1. Visit the [Upcoming][eventsupcoming], [Past][eventspast], or [Drafts][eventsdrafts] page.
1. Hover over the event thumbnail, click the **&ctdot;** button, and select either **Cancel Event** or **Delete Event**.

   <Tabs>
   <TabItem label="Cancel Event">
   <img src="../../assets/creator-dashboard/Event-Context-Menu-Cancel-Event.png" width="600" height="320" alt="Event's right-click context menu indicating the selection of Cancel Event" />
   </TabItem>
   <TabItem label="Delete Event">
   <img src="../../assets/creator-dashboard/Event-Context-Menu-Delete-Event.png" width="600" height="320" alt="Event's right-click context menu indicating the selection of Delete Event" />
   </TabItem>
   </Tabs>

## Event Discovery

### Event Details Page

All published events feature an event details page which you can share with players on and off platform. To access a **shareable link**, you can use either the event details page itself or the [Upcoming][eventsupcoming] page.

<Tabs>
<TabItem label="Event Details Page">
From the event details page, click/tap the **share** button below the event title to open your device's native sharing UI, or to copy the link to your clipboard.
<img src="../../assets/promotion/events-platform/Dedicated-Event-Page-Copy-URL.png" width="800" height="320" alt="Share button indicated on event details page" />
</TabItem>
<TabItem label="Upcoming Events">
From the [Upcoming][eventsupcoming] events page, hover over the event thumbnail, click the **&ctdot;** button, and select **Copy Event Details URL**.
<img src="../../assets/creator-dashboard/Event-Context-Menu-Copy-Event-Details-URL.png" width="600" height="320" alt="Event's right-click context menu indicating the selection of Copy Event Details URL" />
</TabItem>
</Tabs>

<Alert severity="warning">
Event pages persist even after an event ends, but players will no longer be able to join from the page. To remove an event page entirely, see [Canceling or Deleting Events](#canceling-or-deleting-events).
</Alert>

### Experience Detail Page

All published events also appear in a dedicated **Events** section on the experience's detail page. Players can join active events directly through the **Join Now** button, or click **Notify Me** for upcoming events to receive stream notifications in their Roblox inbox and the ability to opt into [push notifications](#streampush-notifications).

<img src="../../assets/promotion/events-platform/Experience-Page-Promotion.png" width="850" alt="Event promoted on experience's detail page" />

### Stream/Push Notifications

Users who click **Notify Me** for an upcoming event will receive stream notifications in their Roblox inbox when the event starts. In addition, they can opt into **push notifications** to receive a notification on their device that will take them into the experience. Stream notifications remain accessible in the player's Roblox inbox for the duration of the event, making it easy for them to hop back in at any time.

<GridContainer numColumns="2">
	<figure>
		<img src="../../assets/promotion/events-platform/Notification-Lock-Screen.jpg" width="375" alt="Event notification on phone lock screen" />
		<figcaption>Notification on phone lock screen</figcaption>
	</figure>
	<figure>
		<img src="../../assets/promotion/events-platform/Notification-Roblox-App.png" width="375" alt="Event notification in Roblox app" />
		<figcaption>Notification in Roblox app</figcaption>
	</figure>
</GridContainer>

[creatordashboard]: https://create.roblox.com/dashboard/creations
[eventsupcoming]: https://create.roblox.com/dashboard/creations?activeTab=UpcomingEvent
[eventspast]: https://create.roblox.com/dashboard/creations?activeTab=PastEvent
[eventsdrafts]: https://create.roblox.com/dashboard/creations?activeTab=DraftEvent
