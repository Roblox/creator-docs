---
title: Event types
description: Overview of using event types to track user sources, sinks and milestones in your experience.
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/NFLP-FVv834" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> <br />

Event types help you identify opportunities to grow and monetize your experience. They allow you to **integrate event tracking in your experience** and visualize your in-experience economy and player usage patterns on the Analytics dashboard

Once you begin tracking these events from your experience using the `Class.AnalyticsService`, you'll unlock new [economy](./economy-events.md), [funnel](./funnel-events.md), and [custom](./custom-events.md) dashboards under Analytics on the Creator Dashboard. You can use these dashboards to identify growth opportunities and segment users by age, gender, platform, OS and custom fields. All of these features are **free to use**.

<img src="../../assets/analytics/event-types/Overview-Economy-Funnels.png" alt="Economy and Funnels dashboard pages populated with data."/>

## Event types

Roblox provides three sets of analytic dashboards you can use to track different aspects of your experience:

1. **Economy events** let you track your in-experience economy, such as:

   - **Top sinks** — What do users spend in-experience resources on?
   - **Top sources** — Where do users earn resources?
   - **Average wallet balance** — How much resources are users holding?

<p />
2. **Funnel events** let you track your user's progress through key stages of your experience, such as:

      - **Onboarding** — Where do users drop off when getting started with your experience?
      - **Progression** — Where do users stop advancing through your experience?
      - **Shop** — Where do users abandon purchases?

<p />
3. **Custom events**  let you track metrics specific to your experience, such as:

      - **Adoption** — How many users click on a specific UI component?
      - **User Behavior** — What is the most frequently used ability on each map?
      - **Core Loop** — How do kill/death ratios compare across different weapons?

For more information on setting up these dashboards, see [Economy events](./economy-events.md), [Funnel events](./funnel-events.md) and [Custom events](./custom-events.md).

## Validate your event tracking

Once you add [economy](./economy-events.md), [funnel](./funnel-events.md), or [custom](./custom-events.md) events to your experience, charts on the respective pages typically take 24 hours to appear. In the meantime, you can check if events are set up correctly using the **View Events** tool:

1. Navigate to the **Economy**, **Funnel**, or **Custom** pages of your Analytics dashboard for your experience.
2. Click the **View Events** button at the top of each page. A near real-time list of the most recent events displays.
3. Refresh the page to update the list.

<img src="../../assets/analytics/event-types/Event-Tracking.png" alt="View events report displaying multiple event entries sortable by event type, user ID and keyword."/>

You can also visit your experience's [error report](./error-report.md) to see if there are any errors with your event tracking.

## Event tracking limitations

The following limitations apply when tracking your events with `Class.AnalyticsService`. Limitations reset daily. You will be able to send new events the next day once you stop sending previous events. Each event remains visible on the Creator Dashboard and automatically rolls off after 90 days from the last data received.

<Alert severity = 'warning'>
You can leverage [custom fields](./custom-fields.md) to additionally filter your analytic events.

For example, instead of tracking `WarriorXP`, `MageXP`, `PaladinXP` as separate economy currencies, set `XP` as one currency and set `Warrior`, `Mage`, `Paladin`, `...`, as Custom Field 1. This allows you to break down these values on your dashboards and not use up your currency cardinality.
</Alert>

<figure>
<br />
<table><thead>
  <tr>
    <th></th>
    <th>**Limitation**</th>
    <th>**Maximum value**</th>
    <th>**Examples**</th>
  </tr></thead>
<tbody>
  <tr>
    <td rowspan="1">Global Rate Limit</td>
    <td>Total `Class.AnalyticsService` requests per minute</td>
    <td>120 + (20 * CCU)</td>
    <td></td>
  </tr>
  <tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  </tr>
  <tr>
    <td rowspan="2">Economy, Funnel, and Custom events</td>
    <td>Number of [custom fields](./custom-fields.md)</td>
    <td>3</td>
    <td>Class, Level, Weapon</td>
  </tr>
  <tr>
    <td>Unique values per [custom field](./custom-fields.md)</td>
    <td>Unlimited — After 8,000 combined values across all custom fields, values will be grouped as "Other"</td>
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
  <tr>
    <td rowspan="3">Custom only</td>
    <td>eventNames</td>
    <td>100</td>
    <td>MonsterDefeated, KillDeathRatio, PetAdoption</td>
  </tr>
</tbody>
</table>
</figure>
