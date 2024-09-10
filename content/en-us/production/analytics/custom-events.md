---
title: Custom Events
description: Custom Events let you track and aggregate unique metrics to your experience.
---

<Alert severity = 'success'>
Custom events are currently being tested in limited beta.
</Alert>

**Custom events** let you track metrics specific to your experience that other events do not fully capture. This includes:

- **Adoption** — How many users click on a specific UI component?
- **User Behavior** — What is the most frequently used ability on each map?
- **Core Loop** — How do kill/death ratios compare across different weapons?

Once your experience begins tracking custom events, you'll unlock the Custom page of the Analytics dashboard on the Creator Hub. You can add up to 100 custom events to your experience.

## Tracking Custom Events

To unlock the Custom Events dashboard, you must first track custom events in your experience. Start by identifying which metrics are the most important for monitoring and improving your experience. Events are aggregated daily so it may take up to 24 hours for charts to populate on the page.

### Counters

Counters are one-time events captured without a value. You can use counters for tracking the number of times a specific event has occurred. Use counters for single actions such as clicking a button, starting a quest, or using a tool.

Events will automatically track both event count and unique user count. For value aggregations, counter events are treated as events with a default value of `1`. This means that aggregations like max/min/average will always equal `1`, and the sum will equal the total number of events.

```lua
local AnalyticsService = game:GetService("AnalyticsService")


AnalyticsService:LogCustomEvent(
    player,
    "MissionStarted" -- Event name
)

```

### Events with Values

You can also track events with values for metrics that require more quantitative data into your experience, such as kill/death ratios or the amount of time a user spends on a mission. It can also be used as a way to send events in batches in order to stay under the rate limits, i.e. sending 10 zombies killed instead of 1 zombie killed ten times.

```lua
local AnalyticsService = game:GetService("AnalyticsService")


AnalyticsService:LogCustomEvent(
    player,
    "MissionCompletedDuration", -- Event name
    120 —- Event value
)
```

## Event Aggregations

All events metrics include the following aggregations and include slice-and-dicing support:

- Count
- Count unique user
- Average value
- Sum value
- Min value
- Max value
- Average value per user

View your event aggregations in the Custom page by selecting the aggregation type.

<img src="../../assets/analytics/event-types/Custom-Event-Aggregations.png" width = "40%" alt="A list of all the different aggregation options to filter your custom event data."/>

## Using Custom Fields

Custom events also allow breaking down on custom fields to support easier comparison between segments. For example, you can provide quest names to each event to see which ones users prefer the most, or attach player class to see if a class has a significantly higher kill/death ratio.

You can breakdown by custom fields by using the breakdown selector.

<img src="../../assets/analytics/event-types/Custom-Event-Breakdown.png" width = "40%" alt="A dropdown indicating the three custom fields you can compare across, along with standard breakdowns like age, gender, operating system and more."/>

For more information, see [custom fields](./custom-fields.md).

## Using Custom Events to Grow Your Experience

Custom events enable you to track metrics that matter most to your game, providing insights into how players interact with specific features and content. Use these events to uncover patterns in player behavior and optimize your core game loop.

In the reference game [Plant](../../resources/plant-reference-project.md), the core loop with a `HarvestPlant` event fires whenever a player harvests a ripe plant. Using custom events, you can track the average number of plants harvested per player each day broken down by the plant type as a custom field:

<img src="../../assets/analytics/event-types/Custom-Event-Graph.png" width = "100%" alt="Custom Event graph for the reference Plant game."/>

- Try to improve the diversity of content within your experience and encourage players to explore other options as part of the [core loop](../game-design/core-loops.md) to prevent repetitiveness.
- Explore why users significantly prefer turnips over other plants, and if there are any imbalances that turnips are causing (such as with [Economy Events](./economy-events.md)).
- Add more event tracking within your loop, such as planting seeds, watering plants, and going to the shop, to better track player behavior and other areas of improvement.
