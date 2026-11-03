---
title: Journey events
description: Use journey events to track branching player progression through your game.
---

Journey events help you understand the different paths players take through your experience. Unlike a linear funnel, a journey can branch into different nodes and reconnect at a later stage.

You can use journey events to analyze flows, such as:

- Onboarding with multiple choices
- Open-world or quest progression
- Shops with different browsing and purchase paths
- Features that players can complete in different orders

After you configure a journey and begin logging events, you can view its results on the **Journeys** page in Creator Hub.

## Configure a journey

To create a journey in Creator Hub:

1. Select your experience.
1. Go to **Analytics** → **Journeys**. Select **Create**.
1. Enter a journey name.
1. Add stages and the nodes that belong to each stage.
1. Select **Next**, then select **Acknowledge** to save and publish the configuration.
1. On the **Add to code** step, copy the generated Luau snippet into your experience, then select **Done** to view the journey.

<img src="../../assets/analytics/event-types/Journey-Configure-Stages.png" alt="The journey editor in Creator Hub showing stages and nodes being added to a journey." />

A stage can contain multiple nodes. Nodes in the same stage represent alternative actions that indicate equivalent progress.

The Creator Hub journey editor supports:

- 2–10 configured stages per journey
- 1–10 nodes per stage
- Journey names containing letters, numbers, `.`, `-`, and `_`, up to 50 characters
- Node names up to 50 characters

Journey names cannot begin with `_`. Node names cannot begin with `__` or contain commas, double quotes, apostrophes, line breaks, or NUL characters. Node names must be unique within a stage, but the same name can be used in different stages.

### Automatic entry stage

Roblox adds `__entry__` as stage 0 at the beginning of every journey. You don't configure or log this node. The 2–10 stages you configure are numbered 1–10 and don't include the automatic entry stage.

### Creator Config representation

Journey configurations use the `JourneysConfig` Creator Config repository type. Each entry key is the journey name, and its value contains the journey's stages and nodes.

For example, an entry named `StoreCheckout` can use this value:

```json title="JourneysConfig example for a StoreCheckout journey"
{
  "stages": [
    {
      "stage_index": 1,
      "nodes": [
        { "node_name": "OpenedStore" }
      ]
    },
    {
      "stage_index": 2,
      "nodes": [
        { "node_name": "ViewedSword" },
        { "node_name": "ViewedArmor" }
      ]
    },
    {
      "stage_index": 3,
      "nodes": [
        { "node_name": "PurchasedItem" }
      ]
    }
  ]
}
```

Stage indexes must be sequential and begin at 1. You don't include a stage index when logging an event. Roblox determines the stage from the node's published configuration.

## Track journey events

Call `Class.AnalyticsService:LogJourneyEvent()|LogJourneyEvent()` after a player reaches a configured node. Log events from server code, and validate player actions before sending analytics events.

The journey and node names must exactly match the published configuration:

```lua title="Tracking a one-time journey node"
local AnalyticsService = game:GetService("AnalyticsService")

AnalyticsService:LogJourneyEvent(
    player,
    "StoreCheckout",
    "OpenedStore"
)
```

### Track recurring journeys

Use a journey session ID when the same player can repeat a journey, such as opening a shop multiple times:

```lua title="Tracking a recurring journey with a session ID"
local AnalyticsService = game:GetService("AnalyticsService")
local HttpService = game:GetService("HttpService")

local journeySessionId = HttpService:GenerateGUID(false)

AnalyticsService:LogJourneyEvent(
    player,
    "StoreCheckout",
    "OpenedStore",
    journeySessionId
)

AnalyticsService:LogJourneyEvent(
    player,
    "StoreCheckout",
    "ViewedSword",
    journeySessionId
)

AnalyticsService:LogJourneyEvent(
    player,
    "StoreCheckout",
    "PurchasedItem",
    journeySessionId
)
```

Reuse the same ID for every event in one attempt, and generate a new ID when another attempt begins. For a journey that occurs only once per player, you can omit the session ID.

You can also attach up to three [custom fields](./custom-fields.md) to journey events.

## Set up journeys with Open Cloud and Studio MCP

If you manage your game with MCP, you do not have to use the Creator Hub editor. Journeys are stored as Creator Configs, so you can create them with an Open Cloud API key and add the tracking code with the Studio MCP server.

Journey configurations use the `JourneysConfig` Creator Config repository type.

To set it up:

1. **Create an API key** — Go to **Creator Hub** > **Open Cloud** > **API Keys**, select **Create API key**, and give it the `universe:write` scope for your game (add `universe:read` if you also want to read configs back).
2. **Connect to Studio MCP Server** — Enable Studio as an MCP server, then connect your client with **Quick connect**. Once connected, you can ask your AI tool to do the journey setup end to end. For example:

   > "Create a `StoreCheckout` journey with stages `OpenedStore`, then `ViewedSword` or `ViewedArmor`, then `PurchasedItem`. Here is the Journeys documentation. Use my Open Cloud API key from the `ROBLOX_API_KEY` environment variable to create the config. Then find where the shop opens, where items are previewed and where purchases are confirmed in my server scripts, add `LogJourneyEvent` calls with a journey session ID, and playtest to check the events fire."

## Understand journey progression

Journey progression moves forward through the configured stages:

- Repeating the current node doesn't advance progression.
- Events from the same or an earlier stage don't move progression backward.
- Moving directly to a later stage records the intermediate stages as skipped.
- A node that isn't present in the acquired configuration version doesn't advance the journey.
- Reaching any node in the configured final stage counts as reaching the final stage.

If a user has no events for a journey for more than 180 days, their saved progress expires, and they count as a new user for that journey if they return. Their progression restarts from `__entry__`.

Use consistent, easy-to-interpret names and log each node at the same point in the corresponding player action.

## View journey analytics

From **Analytics** → **Journeys**, find a configured journey and select **View**.

The page provides separate **Sessions** and **Users** views:

- The **Sessions** view evaluates each journey session independently.
- The **Users** view shows each player's first-time progression across journey sessions.

Each view includes:

- Total journey users or sessions
- Users or sessions that reached the configured final stage
- Biggest drop-off node and stage
- A Sankey chart showing paths between nodes
- A path breakdown
- Churn breakdowns by node or stage

<img src="../../assets/analytics/event-types/Journey-Analytics-View.png" width="80%" alt="The Journeys analytics page showing the Sessions and Users views, totals, a Sankey chart of paths between nodes, and a path breakdown." />

You can filter the results by:

- Journey name and version
- Custom fields 1–3
- Age group and gender
- Payer and new-user status
- Operating system and platform

### Date ranges and cohorts

The selected date range defines the acquisition cohort:

- A user belongs to the date when they first entered the journey.
- A session belongs to the date when that journey session began.
- Analytics includes that cohort's progress through 90 days after the selected range ends.

User progression stays associated with the journey version the user first acquired. Each newly started journey session uses the version active when that session began.

## Modify a journey

From the Journeys list, you can:

- Select **View** to open the analytics page
- Select **Edit** to change the journey
- Select **Delete** to permanently remove the configuration

Saving an edit publishes a new configuration version. The **Journey version** filter shows one version at a time, labeled with the date and time it was published, and defaults to the newest version that players acquired during the selected date range. To analyze a different version, select it from the filter.

**Publishing a new version doesn't migrate existing progress**

In the **Users** view, a player who already acquired the journey remains associated with that original version. The new version applies when a player newly acquires the journey.

In the **Sessions** view, each session keeps the version it acquired when it began. A new journey session acquires the currently published version, even when the player has user-level progress on an older version.

Journey configurations are processed daily. If you publish multiple versions on the same day, analytics uses the latest version available that day for newly acquired users and sessions.

## See also

- [Funnel events](./funnel-events.md)
- [Custom fields](./custom-fields.md)
