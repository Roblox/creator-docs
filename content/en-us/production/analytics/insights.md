---
title: Analytics insights
description: How to use insights to dive deeper into player feedback and your experience's performance.
---

Insights exist on each of your experience's overview page to highlight major changes in key metrics and areas of improvement, and help you dive deeper into player feedback and your experience's weekly and monthly performance.

The insight below, for example, shows that your revenue declined 21%, but the revenue of similar experiences increased by 15%. This is a sign that you might want to take action and look deeper into your monetization to diagnose potential issues. You can click **Explore this metric** to slice and dice your revenue by platform, country, and more. These insights are updated daily and are available for experiences with 100+ DAU.

<figure>
    <img src="../../assets/analytics/overview/Insights.png" width="80%"/>
</figure>

## Achievement panel

The achievement panel highlights key metric milestones that you've reached over the past 6 months. This insight is meant to help you celebrate progress when a metric has reached a six month high. Note that if a metric is at a six month high but below benchmark comparisons, you should still continue to improve it.

<figure>
    <img src="../../assets/analytics/overview/Achievements.png" width="50%"/>
</figure>

For more information on how analytics works, see the [Analytics dashboard](../../production/analytics/analytics-dashboard.md). For more information on how to use analytics to optimize your experience's design, see [Analytics essentials](../../production/game-design/analytics-essentials.md).

## Analytics reports

You can use AI-generated reports to dive deeper into your experience's weekly and monthly analytics insights.

<Alert severity="warning">
  To get analytics reports, your experience must have 1000+ DAU. Monthly reports are available on the first week of every month, and weekly reports are available at the start of each of the remaining weeks.
</Alert>

<Alert severity="info">
   Analytics reports are built with [Gemini 2.5](https://ai.google.dev/gemini-api/terms).
</Alert>

To access the insights reports:

1. Go to Creations and select an experience.
2. In the experience's **Overview** page, click **See full report**.

<figure>
    <img src="../../assets/analytics/overview/AnalyticsInsights.png" width="80%"/>
    <figcaption>Click *See full report* to see your weekly and monthly reports</figcaption>
</figure>

The report focuses on the following key metrics:

- **Top drivers for revenue and DAU changes**: Identify what's driving your revenue and DAU changes, whether it's a specific monetization product or acquisition channel. Learn what's working for your experience, and where you can get the most value out of what you build.
- **Automatic outlier detection**: Automatically identify outlier segments instead of manually filtering by age, country, and platform. For example, if retention is your lowest benchmark and has declined over the past week, the report can tell you that retention has dropped significantly more on iOS or among 18+ users.
- **Player feedback summaries**: Understand top requests and takeaways from your actual users over the past week or month, and prioritize what to work on next.

You can also review personalized charts and recommendations in the generated report.

<figure>
    <img src="../../assets/analytics/overview/AnalyticsAssistantReport.png" width="100%"/>
    <figcaption>Click each section to see relevant charts</figcaption>
</figure>

### Player feedback reports

<Alert severity="warning">
  Player feedback reports are only available for experiences that have 20+ player feedback comments.
</Alert>

<Alert severity="info">
   Player feedback reports are built with [Meta Llama 3](https://www.llama.com/llama3/license/).
</Alert>

To get more specific insights about player feedback, including what users like about your experience, suggestions for improvements, and feature requests, click **See feedback report** in the analytics report.

You can also access the player feedback report by clicking **See full report** on the AI summary insight in the [Feedback dashboard](./feedback.md).

<figure>
    <img src="../../assets/analytics/feedback/AnalyticsFeedbackAssistant.png" width="100%"/>
    <figcaption>Click *See full report* to see your player feedback report</figcaption>
</figure>

<figure>
    <img src="../../assets/analytics/feedback/AnalyticsAssistantFeedbackReport.png" width="100%"/>
</figure>

<Alert severity="warning">
  Analytics and player feedback reports use AI and can make mistakes. Make sure to check responses and weigh player feedback against your judgement.
</Alert>
