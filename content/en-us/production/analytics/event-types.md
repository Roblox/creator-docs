---
title: Event Types
description: Overview of using event types to track user sources, sinks and milestones in your experience.
---

Event types help you identify opportunities to grow and monetize your experience. They allow you to **integrate event tracking in your experience** and visualize your in-experience economy and player usage patterns on the Analytics dashboard

Once you begin tracking these events from your experience using the `Class.AnalyticsService`, you'll unlock new [Economy](./economy-events.md) and [Funnel](./funnel-events.md) dashboards under Analytics on the Creator Dashboard. You can use these dashboards to identify growth opportunities and segment users by age, gender, platform, OS and custom fields. All of these features are **free to use**.

<img src="../../assets/analytics/event-types/Overview-Economy-Funnels.png" alt="Economy and Funnels dashboard pages populated with data."/>

## Event Types

There are two event types with two corresponding dashboards: **Economy** and **Funnel**.
<br />

**Economy events** let you track your in-experience economy, such as:

- **Top sinks** — What do users spend in-experience resources on?
- **Top sources** — Where do users earn resources?
- **Average wallet balance** — How much resources are users holding?

**Funnel events** let you track your user's progress through key stages of your experience, such as:

- **Onboarding** — Where do users drop off when getting started with your experience?
- **Progression** — Where do users stop advancing through your experience?
- **Shop** — Where do users abandon purchases?

For more information on setting up these dashboards, see [Economy Events](./economy-events.md) and [Funnel Events](./funnel-events.md).

## Validating Your Event Tracking

Once you add [Economy](./economy-events.md) and [Funnel](./funnel-events.md) events to your experience, charts on the respective pages typically take 24 hours to appear. In the meantime, you can check if events are set up correctly using the **View Events** tool:

1. Navigate to the **Economy** or **Funnel** pages of your Analytics dashboard for your experience.
2. Click the **View Events** button at the top of each page. A near real-time list of the most recent events displays.
3. Refresh the page to update the list.

<img src="../../assets/analytics/event-types/Event-Tracking.png" alt="View events report displaying multiple event entries sortable by event type, user ID and keyword."/>

You can also visit your experience's [error report](./error-report.md) to see if there are any errors with your event tracking.

## Event Tracking Limitations

The following limitations apply when tracking your events with `Class.AnalyticsService`:

<figure>
<br />
<table><thead>
  <tr>
    <th></th>
    <th>**Limitation**</th>
    <th>**Maximum Value**</th>
    <th>**Examples**</th>
  </tr></thead>
<tbody>
  <tr>
    <td rowspan="2">Economy and Funnel events</td>
    <td>`Class.AnalyticsService` requests per minute</td>
    <td>120 + (20 * CCU)</td>
    <td></td>
  </tr>
  <tr>
    <td>Unique values per custom field</td>
    <td>Unlimited — After 20, values will be grouped as "Other"</td>
    <td>Warrior, Mage, Archer</td>
  </tr>
  <tr>
    <td rowspan="3">Economy only</td>
    <td>Resource types</td>
    <td>10</td>
    <td>Coins, Gold, Credits</td>
  </tr>
  <tr>
    <td>transactionTypes</td>
    <td>Unlimited — After 20, values will be grouped as "Other"</td>
    <td>IAP, Gameplay</td>
  </tr>
  <tr>
    <td>itemSkus</td>
    <td>Unlimited — After 100, values will be grouped as "Other"</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="2">Funnel only</td>
    <td>Number of funnels</td>
    <td>10</td>
    <td>Onboarding, Shop</td>
  </tr>
  <tr>
    <td>Steps per funnel</td>
    <td>100</td>
    <td>Step 1, Step 2, Step 3</td>
  </tr>
</tbody>
</table>
</figure>
