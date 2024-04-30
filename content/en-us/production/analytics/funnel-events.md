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

### Tracking Onboarding

The following sample takes an existing reference project as its context. [Plant](../../resources/plant-reference-project.md) is a tycoon experience where users purchase seeds, grow plants, and sell their produce. When users join the experience, they spawn in their farm. They must then plant a seed, then water the seed, then harvest the resulting plant. This sample uses `Class.AnalyticsService` to track some of these initial steps in order, starting from 1 and increasing by 1 each step:

```lua title="Tracking Onboarding Steps in Plant"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

-- log the first step of the FTUE
AnalyticsService:LogOnboardingFunnelStepEvent(
    currentPlayer,
    1, -- step number
    "In Farm" -- step name
)

-- log the second step
AnalyticsService:LogOnboardingFunnelStepEvent(
    currentPlayer,
    2, -- step number
    "Plant Seed" -- step name
)
```

The following image shows the kind of funnel that would result from this tracking. The largest drop-off in the onboarding funnel is "Plant Seed".

<img src="../../assets/analytics/event-types/Plant-Game-Funnel.png" alt="Funnels chart for Plant experience showing a 70% drop-off between In Farm, step 1, and Plant Seed, step 2."/>

Based on this data, you could add contextual indicators to better direct users to plant seeds when they're getting started.

<img src="../../assets/analytics/event-types/Plant-Game-Prompts.jpg" alt="In-experience view of Plant experience showing prompts to plant seeds above the flowerpots."/>

### Tracking Progression

Many experience genres involve challenges that users can succeed or fail at, with levels or milestones to progress through. The following sample logs a variety of progression events using different methods for starting, completing and failing the steps.

```lua title="Tracking Progression Steps"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

-- player starts level 1
AnalyticsService:LogProgressionStartEvent(
    currentPlayer,
    "LevelAttempts", -- progressionPathName to connect these attempt types
    1, -- level number
    "World-1-Level-1" -- level name
)

-- player beats level 1
AnalyticsService:LogProgressionCompleteEvent(
    currentPlayer,
    "LevelAttempts", -- progressionPathName to connect these attempt types
    1, -- level number
    "World-1-Level-1" -- level name
)

-- player starts level 2
AnalyticsService:LogProgressionStartEvent(
    currentPlayer,
    "LevelAttempts", -- progressionPathName to connect these attempt types
    2, -- level number
    "World-1-Level-2" -- level name
)

-- player fails level 2
AnalyticsService:LogProgressionFailEvent(
    currentPlayer,
    "LevelAttempts", -- progressionPathName to connect these attempt types
    2, -- level number
    "World-1-Level-2" -- level name
)
```

### Tracking Shopping

If your experience contains a shop, you can use events to track each user's progress through the funnel of purchasing an item and identify sticking points in your user experience. The following sample tracks some basic events for each user beginning the process to buy an item from an "armory" shop. Note the `funnelSessionId` used to distinguish between different sessions of the same user opening the shop.

```lua title="Tracking Shop Steps"
local AnalyticsService = game:GetService("AnalyticsService")
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local currentPlayer = Players.LocalPlayer

funnelSessionId = HttpService:GenerateGUID()

-- log when the user opens the store
AnalyticsService:LogFunnelStepEvent(
    currentPlayer,
    "ArmoryCheckout", -- funnel name used to group steps together
    funnelSessionId, -- funnel session id for this unique checkout session
    1, -- step number
    "Opened Store" -- step name
)

-- log when the user views an item
AnalyticsService:LogFunnelStepEvent(
    currentPlayer,
    "ArmoryCheckout", -- funnel name used to group steps together
    funnelSessionId, -- funnel session id for this unique checkout session
    2, -- step number
    "Viewed Item" -- step name
)

-- log when the user views adds to cart
AnalyticsService:LogFunnelStepEvent(
    currentPlayer,
    "ArmoryCheckout", -- funnel name used to group steps together
    funnelSessionId, -- funnel session id for this unique checkout session
    3, -- step number
    "Added to Cart" -- step name
)
```
