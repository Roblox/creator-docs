---
title: Feedback
description: How to monitor and disseminate player feedback for your experience.
---

Listening to feedback from players and the community is a great opportunity to improve your experience&nbsp;— what they love, what they wish could be improved, etc. The **Feedback** dashboard is one tool that can help you disseminate player feedback.

<Alert severity="warning">
This dashboard is new and only includes data from a limited time period. Experience upvotes/downvotes are factored from February&nbsp;1,&nbsp;2025 and onward, while comments are logged from March&nbsp;17,&nbsp;2025 and onward.
</Alert>

To view your experience's feedback analytics:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page and select your experience.
2. In the **Audience** menu on the left, select **Feedback**.

<Alert severity="info">
You can view feedback for both individual and [group](../../projects/groups.md) owned experiences. To view the latter, you need to have the **View all analytics for group experiences** permission within the group.
</Alert>

To dive deeper into player feedback, see the [feedback insight reports](./insights.md#player-feedback-reports).

## Chart view

The **chart view** shows a detailed breakdown of ratings on your experience, showing trends in sentiment over time. This view:

- Shows trends in player sentiment over time.
- Helps you identify issues like a new update causing a sudden spike in downvotes.
- Helps you make improvements and monitor how those changes influence player sentiment.

In the chart, you can adjust the range of total feedback using the **Date&nbsp;Range** selector, allowing you to view feedback within 7/30/60/90 days, or select a specific custom date range.

<img src="../../assets/analytics/feedback/Date-Range-Selector.png" width="840" alt="Image showing the date range selector set to 30 days and the reflected 30-day data values in the chart below." />

Above the chart is a summary of the feedback across the selected date range:

<img src="../../assets/analytics/feedback/Feedback-Breakdown.png" width="840" alt="Image showing total feedback and percent upvotes over selected period." />

<hr />

<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	**Total feedback** — Total votes (upvotes and downvotes) for the date range.
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	**Percent upvotes over selected period** — Percentage of upvotes vs. downvotes for the range.
	</Grid>
</Grid>

<Alert severity="info">
Note that players can change their rating at any time. Also note that ratings update at the end of each day and may not reflect the current core rating on your experience.
</Alert>

To the right of each core value is a **relative** percentage of improvement or regression based on the previous range. For example, a relative percentage for the last 30 days shows improvement/regression for those 30 days as compared to the 30 days before that. Hovering over a relative percentage reveals the exact date range used for calculation:

<img src="../../assets/analytics/feedback/Relative-Percentage.png" width="840" alt="Image showing relative percentage of improvement based on the previous range." />

## Detailed view

The detailed feedback table shows specific feedback submitted by players who have played and rated it from the experience's detail screen.

<img src="../../assets/analytics/feedback/Feedback-Widget.png" width="390" alt="Image showing feedback widget on an experience's detail screen." />

Each row in the feedback table includes:

- **Rating** — Upvote (positive) or downvote (negative). This reflects the player's rating at the time they provided the feedback, although they may change their rating later.
- **Device Type** — Which device type the feedback was provided from: computer, phone, tablet.
- **Platform** — Which OS or platform related to the device, for example iOS or Windows.
- **Comment** — Specific player feedback related to the vote. For safety reasons, all comments are sent through a text filter and will not appear if they get filtered.

<img src="../../assets/analytics/feedback/Detailed-View.png" width="840" alt="Image showing example detailed feedback including the rating, device type, platform, and reviewer's feedback." />

<Alert severity="success">
Feedback comes in many shapes and sizes. Some players may leave a downvote but then provide useful suggestions in their comments. Make sure you read all the feedback!
</Alert>

Hovering over any row and clicking the options button (`⁝`) reveals the option to report feedback and hide it from your dashboard. Once reported, you will not be able to see the feedback again.

<img src="../../assets/analytics/feedback/Feedback-Options-Button.png" width="840" alt="Image showing options button for feedback." />

## Data export

To the upper-right of both the [chart](#chart-view) and [detailed](#detailed-view) views, the **export** button allows you to export feedback data in `.csv` format, useful for parsing or processing data in external applications.

<img src="../../assets/analytics/feedback/Export-Chart-Data.png" width="840" alt="Image showing export button for chart data." />

<img src="../../assets/analytics/feedback/Export-Detailed-Data.png" width="840" alt="Image showing export button for detailed data." />
