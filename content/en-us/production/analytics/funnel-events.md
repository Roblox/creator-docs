---
title: Funnel events
description: Use funnel events to visualize user progression through key milestones in your experience.
---

**Funnel events** let you track your user's progress through key stages of your experience. This includes:

- **Onboarding** - Where do users drop off when getting started with your experience?
- **Progression** - Where do users stop advancing through your experience?
- **Shop** - Where do users abandon purchases?

Once your experience begins tracking Funnel events, you'll unlock the Funnel page of the Analytics dashboard on the Creator Hub. You can add tabs to the dashboard for up to ten funnels.

## Track funnel events

To track funnel events, first identify the most important funnels in your experience and segment them into steps. Your onboarding flow is a great place to start, as this is where you may be losing most of your users.

<Alert severity ='warning'>
Events can only be sent from the server and in published experiences. Events can't be sent from the client or Studio.
</Alert>

### Track one-time funnels

A one-time funnel monitors conversion events that only occur once per user.

A common example is an **onboarding funnel** which is critical to understand how to improve your experience's new user retention and session time. The following example is an onboarding funnel for [Plant](https://create.roblox.com/docs/resources/plant-reference-project), a tycoon experience where new users enter a farm, plant seed, water plant, and more in sequential order:

```lua title="Tracking Onboarding Steps in Plant"
local AnalyticsService = game:GetService("AnalyticsService")

-- Log the first step of the FTUE
AnalyticsService:LogOnboardingFunnelStepEvent(
    player,
    1, -- Step number
    "In Farm" -- Step name
)

-- Log the second step
AnalyticsService:LogOnboardingFunnelStepEvent(
    player,
    2, -- Step number
    "Plant Seed" -- Step name
)
```

### Track recurring funnels

A recurring funnel monitors conversion events that occur multiple times per user.

A common example is a **shop funnel** which is critical to understand how to improve your experience's payer conversion, ARPPU, and revenue. The following example is a shop funnel where users open store, view item, add item to cart, and more.

Use `funnelSessionId` to distinguish between different sessions of the same user in a recurring funnel, such as opening the shop multiple times in a single session.

```lua title="Tracking Shop Steps"
local AnalyticsService = game:GetService("AnalyticsService")
local HttpService = game:GetService("HttpService")

funnelSessionId = HttpService:GenerateGUID()

-- Log when the user opens the store
AnalyticsService:LogFunnelStepEvent(
    player,
    "ArmoryCheckout", -- Funnel name used to group steps together
    funnelSessionId, -- Funnel session ID for this unique checkout session
    1, -- Step number
    "Opened Store" -- Step name
)

-- Log when the user views an item
AnalyticsService:LogFunnelStepEvent(
    player,
    "ArmoryCheckout", -- Funnel name used to group steps together
    funnelSessionId, -- Funnel session ID for this unique checkout session
    2, -- Step number
    "Viewed Item" -- Step name
)

-- Log when the user views adds to cart
AnalyticsService:LogFunnelStepEvent(
    player,
    "ArmoryCheckout", -- Funnel name used to group steps together
    funnelSessionId, -- Funnel session ID for this unique checkout session
    3, -- Step number
    "Added to Cart" -- Step name
)
```

### Implement funnelSessionId

When implementing funnels, a `funnelSessionId` can help you track your events but may not be required in every instance. Use the following guidelines:

- **One-Time Funnels** - You don't need to use `funnelSessionId` for one-time funnels because they only occur once per user.
- **Store Funnels** - Use `funnelSessionId` to distinguish between different sessions of the same user in a recurring funnel, such as opening the shop multiple times in a single session in the [earlier example](#track-recurring-funnels). In cases like this, where the player may open the shop multiple times in a single session, it is recommended to use a GUID as the `funnelSessionId`.
- **Item Upgrades** - Use `funnelSessionId` to distinguish between different item upgrade paths, generally over a longer time period than a single play session. Rather than use a GUID as in the store funnel case, you can often build a unique key based on the item being upgraded, for example: `<playerId>-<itemId>`.

## Initial step

Funnels start when the first step is logged. If you want to start a funnel immediately on player join, you'll need to log the first step on the `PlayerAdded` event.

```lua title="Logging the first step in the PlayerAdded event"
local AnalyticsService = game:GetService("AnalyticsService")
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    AnalyticsService:LogOnboardingFunnelStepEvent(
        player,
        1, -- Step number
        "Player Joined" -- Step name
    )
end)
```

## Repeated steps

If a user repeats a step in a funnel, the funnel only considers the first instance of the step. For example, if a user logs step 2 of a funnel twice, the funnel only counts the first instance of step 2.

Repeated steps are ignored by the funnel but they're still logged and contribute towards the [global rate limit](./event-types.md#event-tracking-limitations).

## Skipped steps

If for some reason you skip a step in funnel, the earlier steps automatically complete. For example, if you have a funnel with steps 1, 2, and 3 and you log step 3 without logging steps 1 or 2, the funnel considers steps 1 and 2 as completed.

## Use funnel filters

Roblox provides filters to help you analyze your funnel data. These include player data, device data, and you can send custom data as well. In some cases, a player's status may change during the funnel, such as when the player switches devices from mobile to desktop.

To avoid double-counting funnels, filters always **only apply to the first step** of the funnel. This means that if a player switches devices during the funnel, the funnel will only be attributed to their device at the time they enter the funnel.

Similarly, funnels display by cohort, meaning that if a player enters the funnel on 6/19, the funnel will be attributed to the 6/19 cohort even if they complete the funnel on 6/20.

## Modify funnels

After you make an update to your funnel steps, it's important to set the correct date range to see the latest funnel. If the current date is 6/21 and you updated step 2 of your onboarding funnel on 6/14, you should set the date range to 6/14 – 6/21 to view the latest funnel.

If you select a date range that includes a funnel step update, a warning displays on the relevant step:

<img src="../../assets/analytics/event-types/Plant-Game-Warning.png" alt="A warning displays on the funnel dashboard indicating a name change within the selected date range."/>

## Protect your funnels from exploiters

In order to keep your data clean, it is important to add some level of data validation in your server code to prevent exploiters from sending invalid data to your analytics service.

For example, if you have an Onboarding funnel with 3 steps, you can use a `RemoteEvent` for the client to notify the server when the player has completed each step and add a server check to ensure that the step number is valid before logging the event:

```lua title="Client-side event code"
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local onboardingEvent = ReplicatedStorage:WaitForChild("OnboardingEvent")

local function fireOnboardingEvent(step: number)
	onboardingEvent:FireServer({ step = step })
end

fireOnboardingEvent(1)
fireOnboardingEvent(2)
fireOnboardingEvent(10) -- invalid step
```

```lua title="Server-side event code"
local AnalyticsService = game:GetService("AnalyticsService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local onboardingEvent = ReplicatedStorage:WaitForChild("OnboardingEvent")

local maxStep = 3

local function onPlayerEventFired(player: Player, args: { step: number })
	local step = args.step
	if(step > maxStep) then
		warn(`Invalid tutorial step {step} received from client.`)
		return
	end

	print(`{player.Name} completed step: {step}`)
	AnalyticsService:LogOnboardingFunnelStepEvent(player, step)
end

onboardingEvent.OnServerEvent:Connect(onPlayerEventFired)
```

## Use custom fields

Funnel events also allow breaking down on custom fields to support easier comparison between segments. For example, you can track which starter car gives players the best progression, or attach different maps to see if a certain map has a better game loop than others.

<img src="../../assets/analytics/event-types/Custom-Event-Breakdown.png" width = "40%" alt="A dropdown indicating the three custom fields you can compare across, along with standard breakdowns like age, gender, operating system and more."/>

For more information, see [custom fields](./custom-fields.md).

## Use funnels to grow your experience

One of the most important funnels to track is onboarding because many experiences struggle with new user retention and engagement.

In the onboarding funnel for [Plant](https://create.roblox.com/docs/resources/plant-reference-project) below, the largest drop-off is step 2 ("Plant Seed").

<img src="../../assets/analytics/event-types/Plant-Game-Funnel.png" alt="Funnels chart for Plant experience showing a 70% drop-off between In Farm, step 1, and Plant Seed, step 2."/>

Based on this data, you could:

- Add contextual indicators to better direct users to plant seeds when they're getting started.
- Design a new user experience that requires users to plant seed and grow a successful plant before exploring the rest of the experience. You can improve this event creating [positive feedback elements](../../production/game-design/onboarding-techniques.md#facilitate-feedback) or other game design techniques.

<img src="../../assets/analytics/event-types/Plant-Game-Prompts.png" alt="In-experience view of Plant experience showing prompts to plant seeds above the flowerpots."/>
