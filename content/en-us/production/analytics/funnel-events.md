---
title: Funnel Events
description: Use funnel events to visualize user progression through key milestones in your experience.
---

Funnel events let you track your user's progress through key stages of your experience. This includes:

- **Onboarding** - Where do users drop off when getting started with your experience?
- **Progression** - Where do users stop advancing through your experience?
- **Shop** - Where do users abandon purchases?

Once your experience begins tracking Funnel events, you'll unlock the Funnel page of the Analytics dashboard on the Creator Hub. You can add tabs to the dashboard for up to ten funnels.

## Tracking Funnel Events

To track funnel events, first identify the most important funnels in your experience and segment them into steps. Your onboarding flow is a great place to start, as this is where you may be losing most of your users.

### Tracking One-Time Funnels

A one-time funnel monitors conversion events that only occur once per user.

A common example is an **onboarding funnel** which is critical to understand how to improve your experience's new user retention and session time. The following example is an onboarding funnel for [Plant](https://create.roblox.com/docs/resources/plant-reference-project), a tycoon experience where new users enter a farm, plant seed, water plant, and more in sequential order:

```lua title="Tracking Onboarding Steps in Plant"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

-- Log the first step of the FTUE
AnalyticsService:LogOnboardingFunnelStepEvent(
    currentPlayer,
    1, -- Step number
    "In Farm" -- Step name
)

-- Log the second step
AnalyticsService:LogOnboardingFunnelStepEvent(
    currentPlayer,
    2, -- Step number
    "Plant Seed" -- Step name
)
```

### Tracking Recurring Funnels

A recurring funnel monitors conversion events that occur multiple times per user.

A common example is a **shop funnel** which is critical to understand how to improve your experience's payer conversion, ARPPU, and revenue. The following example is a shop funnel where users open store, view item, add item to cart, and more.

Use `funnelSessionId` to distinguish between different sessions of the same user in a recurring funnel, such as opening the shop multiple times in a single session.

```lua title="Tracking Shop Steps"
local AnalyticsService = game:GetService("AnalyticsService")
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

funnelSessionId = HttpService:GenerateGUID()

-- Log when the user opens the store
AnalyticsService:LogFunnelStepEvent(
    currentPlayer,
    "ArmoryCheckout", -- Funnel name used to group steps together
    funnelSessionId, -- Funnel session id for this unique checkout session
    1, -- Step number
    "Opened Store" -- Step name
)

-- Log when the user views an item
AnalyticsService:LogFunnelStepEvent(
    currentPlayer,
    "ArmoryCheckout", -- Funnel name used to group steps together
    funnelSessionId, -- Funnel session id for this unique checkout session
    2, -- Step number
    "Viewed Item" -- Step name
)

-- Log when the user views adds to cart
AnalyticsService:LogFunnelStepEvent(
    currentPlayer,
    "ArmoryCheckout", -- Funnel name used to group steps together
    funnelSessionId, -- Funnel session id for this unique checkout session
    3, -- Step number
    "Added to Cart" -- Step name
)
```

## Modifying Funnels

After you make an update to your funnel steps, it's important to set the correct date range to see the latest funnel. If the current date is 6/14 and you updated step 2 of your onboarding funnel on 6/7, you should set the date range to 6/7 – 6/14 to view the latest funnel.

If you select a date range that includes a funnel step update, a warning displays on the relevant step:

<img src="../../assets/analytics/event-types/Plant-Game-Warning.png" alt="A warning displays on the funnel dashboard indicating a name change within the selected date range."/>

## Using Funnels to Grow Your Experience

One of the most important funnels to track is onboarding because many experiences struggle with new user retention and engagement.

In the onboarding funnel for [Plant](https://create.roblox.com/docs/resources/plant-reference-project) below, the largest drop-off is step 2 ("Plant Seed").

<img src="../../assets/analytics/event-types/Plant-Game-Funnel.png" alt="Funnels chart for Plant experience showing a 70% drop-off between In Farm, step 1, and Plant Seed, step 2."/>

Based on this data, you could:

- Add contextual indicators to better direct users to plant seeds when they're getting started.
- Design a new user experience that requires users to plant seed and grow a successful plant before exploring the rest of the experience. You can improve this event creating [positive feedback elements](../../production/game-design/onboarding-techniques.md#facilitate-feedback) or other game design techniques.

<img src="../../assets/analytics/event-types/Plant-Game-Prompts.png" alt="In-experience view of Plant experience showing prompts to plant seeds above the flowerpots."/>
