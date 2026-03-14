---
title: Recommendation systems
description: Use Roblox's built-in recommendation systems to create personalized curated content for individual users.
---

Build custom recommendation systems in your experience to surface curated content such as 2D and 3D assets, minigames, other experiences, and more. The `Class.RecommendationService|Recommendation Service API` lets you log user activity, capture impressions, and deliver personalized results for virtually any type of engagement.

Some common use cases for recommendation systems include presenting users with an end-of-round suggestion interface, a menu overlay presenting personalized actions, or other implementations that present a unique set of choices, assets, locations, or experiences to the user.

Use the following universal steps and best practices to set up your recommendation system:

1. [Register your content](#register-your-content)
2. [Log users impressions](#log-user-impressions)
3. [Log quality actions](#log-quality-actions)
4. [Fetch recommendations](#fetch-recommendations)
5. [Monitor analytics](#monitor-analytics)

<Alert severity = 'warning'>
This guide covers the process of implementing `Class.RecommendationService` in your experience. This content doesn't cover the process of creating the [UI](../ui/index.md), adding [assets](../assets.md), or [teleporting users](../projects/teleport.md). See additional documentation for those topics.
</Alert>

## Register your content

<Alert severity = 'info'>
There are many ways you can implement recommendations in your experience. The example settings in this guide are intended to recommend users various minigames within an experience, prioritizing recommendations most likely to **maximize quality play sessions**.

This type of recommendation system is often incorporated in a **carousel UI menu**, allowing users to scroll, select, and find more details about the activity they are about to jump into. Considerations for this type of interface are included in the settings below.

If creating your own system, you may need to use slightly different settings and configurations but follow the same basic steps.
</Alert>

To populate content that your recommendation system can serve to users, use `Class.RecommendationService.RegisterItemAsync|RegisterItemAsync`. When registering an item, provide a `referenceId`, a developer-defined string that uniquely identifies the item in your own database. This referenceId is typically used to look up an item's metadata, such as the name, description, or asset ID, from your data store to display in the UI.

As a best practice, register items as soon as they are created to ensure the recommendation pool is always fresh.

## Log user impressions

Once the service knows about your items and starts suggesting them, tell the service when a user actually views the recommendations with `Class.RecommendationService.LogImpressionEvent|LogImpressionEvent`.

### When to log

A carousel-type UI is a common interface for displaying multiple playable options to a user. Use the following best practices to ensure your logging provides clean actionable data:

- **Single Log**: Log the impression **only once** per session for a specific item.
  - Do not log every time the item appears, as this creates noisy information that can interfere with your logging.
- **Trigger**: You can choose to log when the item becomes fully visible in the menu or when the user interacts with the item, such as opening a Detail Page.

<Alert severity = 'warning'>
<AlertTitle>The ID trap</AlertTitle>
<br />Be extremely careful about which ID you pass to `Class.RecommendationService.LogImpressionEvent`. The service needs to link the event strictly to the specific recommendation instance it generated.

- **Do not** use a raw string or reference ID.
- **Do** use the itemId that was returned to you by `Class.RecommendationService.RegisterItemAsync|RegisterItemAsync` or `Class.RecommendationService.GenerateItemListAsync|GenerateItemListAsync`.
</Alert>

### Duration

Duration tracks the time of the impression. You can think of this as how long a user stared at the image or recommendation.

If you are not using video, you can set the **Duration** value to `1`. This ensures that you get clean consistent data that the "user viewed this item", which is typically the only logging you need for a static card.

## Log quality actions

When a user decides to interact with a recommendation, use `Class.RecommendationService.LogActionEvent|LogActionEvent`. In this example, simply clicking "Play" on the recommendation is not enough signal for a high-quality recommendation system. It's important to distinguish between an accidental click and a genuine session.

### Required action type

When you call `Class.RecommendationService.LogActionEvent|LogActionEvent`, you must specify the type of action occurring. To track action events that result in play sessions, use `Enum.RecommendationActionType.Play`.
It's important to use the correct enum to tell the backend that a specific type of action is activated. For play-time related recommendations, `Enum.RecommendationActionType.Play` is strictly required to match the MaximizePlays configuration template used in the next step to fetch recommendations. If you use a different enum, the model will not register the event correctly for play-related actions.

### The "quality play" strategy

Depending on your experience, you may have different definitions on what constitutes "quality play". Use the following steps to help fine-tune what differentiates quality play in your situation.

1. **Track Internally**: When a user enters the mini-game, track their session time locally in your script.
2. **Filter**: Define a threshold for satisfaction, such as playing for more than 60 seconds.
3. **Log**: Only fire `Class.RecommendationService.LogActionEvent|LogActionEvent` if the user passes this threshold.

<Alert severity = 'error'>
<AlertTitle>Strict rule: No "dummy" traffic</AlertTitle>

<br/> Only log actions for items that were actually served by the `Class.RecommendationService`.

- Do not log plays that came from Search, Random picks, or Past Plays.
- Do not use "Dummy Tracing IDs" to force these into the system.

The model expects a realistic ratio. If you serve 1 impression but log 10 plays from external traffic, you confuse the training data and ruin the accuracy of your metrics.

</Alert>

## Fetch recommendations

To fetch recommendations, use `Class.RecommendationService.GenerateItemListAsync|GenerateItemListAsync`. `Class.RecommendationService.GenerateItemListAsync|GenerateItemListAsync` accepts a dictionary that includes various options for the recommendation list query. While many of these settings are straightforward, it's important to understand the supported `ConfigName` parameters to ensure you provide successful recommendations.

### ConfigName

You have several configurations available to you when fetching recommendations. In the current example designed to maximize recommendations based on the number of quality plays, use the `MaximizePlays` configuration. Depending on the use case, the `MaximizePlays` configuration is better than `MaximizeTimeSpent` as it additionally indexes on user satisfaction, rather than just time spent. This tells the system to return items that will most likely yield quality play.

For more information on each supported config, check out `Class.RecommendationService.GenerateItemListAsync|GenerateItemListAsync`.

## Monitor analytics

Once you have integrated the service, you can monitor its performance directly in the [Creator Hub](https://create.roblox.com/). To access your recommendation analytics:

1. In the [Creator Hub](https://create.roblox.com/), navigate to your experience page.
2. In the sidebar, navigate to **Engagement** > **Recommendation Service**.
  <img src="../assets/analytics/recommendation-service.png" alt="Link to recommendation service metrics within Creator Hub" width="40%" />

Key metrics to watch:

- **Total Actions over time**: Are users actually engaging with the recommendations?
- **Total Unique Users**: How many people are using the discovery feature?
- **Average Items Impressed per User**: Are users scrolling through the carousel?
- **Average Time Spent per User**: Is the quality of the recommendations keeping them in the experience longer?
  - In the example provided, **Duration** is set to `1`, so this specific metric isn't particularly valuable in that use-case. However, in other applications, such as videos, this can be a strong indicator for your impressions.

Keep in mind the settings and processes used in this recommendation system intended to maximize quality plays, particularly using 1 second duration for thumbnails, logging only quality plays, and strictly managing your IDs. By keeping your logging and impression data clean, you can recommend and fine-tune the content that best fits the unique experiences of your users.

While this flow covers the process for a recommendation system that maximizes playtime, you can use a similar order of operations and fundamental concepts to build out a recommendation service that fits your experience's needs.
