---
title: Analytics dashboard
description: The analytics dashboard helps you measure and gain insight into your game's performance.
---

The **analytics dashboard** helps you measure and gain insight into your game's performance, which can give you the information you need to adjust marketing, content, and monetization strategies.

The dashboard includes key performance indicators (KPIs) for your game, including:

- [Retention](../../production/analytics/retention.md) KPIs that measure how many users return to your game again after their first visit.
- [Engagement](../../production/analytics/engagement.md) KPIs that reflect how users actively use your game and represent your core user base.
- [Acquisition](../../production/analytics/acquisition.md) statistics that show you the sources of users finding your game and how users from different sources convert.
- [Demographics](../../production/analytics/demographics.md) shows you the age, gender, country, and language of monthly active users who play your game.
- [Feedback](../../production/analytics/feedback.md) helps you monitor player/community comments and ratings.
- [Monetization](../../production/analytics/monetization.md) KPIs that help you understand the business performance of your game, as well as [sales data](#sales-data) that you can download and analyze in custom ways.

Any game with more than 10 daily active users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard.

## Set up analytics dashboard

If you are a game owner or a group owner, and your game meets the enrollment requirements, you can enroll in the analytics dashboard at any point with the following steps:

1. Make sure that you have a verified email address and a two-step verification method on your Roblox account.

2. Navigate to the game overview page on the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

3. Read Roblox **Terms of Use** and agree to them.

Now you have access to the main dashboard on the **Overview** and dashboards of all KPI categories, including **Engagement**, **Retention**, and **Monetization**.

<Alert severity="info">
If you don't want to activate the dashboard immediately, or you accidentally decline the **Terms of Use**, you can still use the **Activate Analytics** button on the game overview page to read the **Terms of Use** and agree to them any time. Refresh the page if you don't see the button.
</Alert>

<Alert severity="warning">
For group game, only the group owner and members with sufficient permissions can view the analytics dashboard, as some metrics contain sensitive information. See [roles and permissions](../../projects/groups.md#roles-and-permissions) for details on how to create a group role with access to the dashboard.
</Alert>

## Dashboard functionality

After activating the analytics dashboard, you can view the default charts on the overview and each KPI category. Hover over the **Information Icon** to understand what each chart represents and the **View Icon** to understand how to interpret the summary statistics on the top of each chart.

There are also functionalities on each dashboard to help you further analyze your game's performance, such as [filtering by date](#filter-by-date), [exporting charts](#export-a-chart), [benchmarking](#benchmarking), and [viewing KPI Breakdowns](#view-kpi-breakdowns).

### Filter by date

You can apply a date filter to view the chart for a date range by separately selecting any specific time frame between the first date that the data was available and the present day as the start and the end date. You can also click and drag on a chart to "zoom&nbsp;in" to a shorter time range across the page.

### Filter by metrics

You can apply various filters to better understand your cohorts by clicking the **Filter By** button. Filters apply to all charts across all analytics pages until they are turned off.

Some filters might not be available for all metrics. If a filter is not available, you will see that it is grayed out:

   <img src="../../assets/analytics/analytics-dashboard/Metrics-Unavailable.png" alt="Example of some filters displaying at partial opacity when unavailable." width="70%" />

You can filter by the following metrics:

<table><thead>
  <tr>
    <th>**Filter type**</th>
    <th>**Example subcategories**</th>
    <th>**Notes**</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Age group</td>
    <td>&lt;9, 9-12, 13-15, 18+, etc.</td>
    <td></td>
  </tr>
  <tr>
    <td>Gender</td>
    <td>Female, male, unknown</td>
    <td></td>
  </tr>
  <tr>
    <td>Country</td>
    <td>All countries</td>
    <td></td>
  </tr>
  <tr>
    <td>Language</td>
    <td>All languages</td>
    <td>This filter can help you see the impact of adding translations for different languages.</td>
  </tr>
  <tr>
    <td>Source</td>
    <td>Home recommendation, search, teleports, sponsored ads, etc.</td>
    <td></td>
  </tr>
  <tr>
    <td>Active payer status</td>
    <td>Top 15%, intermediate 35%, casual 50%, lapsed, never</td>
    <td>Percentile-based within your game, not a fixed value. **Top 15%** includes users who fall into the 85-100th percentile of spenders for your game, **Intermediate 35%** 50-84th, and **Casual 50%** 0-49th. **Lapsed** indicates users who haven't spent in the past 30 days, and **Never** is users who've never spent. Recalculated daily. See **Platform spender status** for status outside of your game.</td>
  </tr>
  <tr>
    <td>When user first played</td>
    <td>0-30 days ago, 31-90 days ago, 91-180 days ago, 181-365 days ago, 365+ days ago, never</td>
    <td>It's uncommon, but users can purchase a game pass and never actually play the game. You might see these users on the revenue chart.</td>
  </tr>
  <tr>
    <td>Platform spender status</td>
    <td>Active, other</td>
    <td>Fixed value, not percentile-based. **Active** includes users who've spent $9.99 or more anywhere on Roblox in the last 60 days. **Other** includes all other users.<br /><br />This definition is consistent with the [Creator Rewards program](../../creator-rewards.md), so you can better understand the behavior of players who earn you Daily Engagement Rewards.[^1]</td>
  </tr>
  <tr>
    <td>Platform</td>
    <td>Computer, phone, tablet, console, VR</td>
    <td>Users might be counted more than once if they use multiple devices.</td>
  </tr>
  <tr>
    <td>OS (operating system)</td>
    <td>Android, iOS, Windows, macOS, PlayStation, etc.</td>
    <td>Users might be counted more than once if they use multiple devices.</td>
  </tr>
  <tr>
    <td>Memory group (only applicable to some performance metrics)</td>
    <td>&lt;2GB, 2GB-4GB, 4GB-8GB, 8GB+</td>
    <td>Can help you identify devices that aren't performing well in your game.</td>
  </tr>
</tbody></table>

### Explore

The **Explore** page lets you deep-dive into your data with custom visualizations. Use it to build charts from custom events or standard metrics, define formulas to calculate new metrics, overlay benchmarks and prior periods, and compare segments in custom tables. You can reach the Explore page from:

- The **Explore** tab in the **Analytics** left navigation.
- The **Explore** button on the top-right corner of any chart on the dashboard.
- A benchmark scorecard on the **Overview** page.

<figure>
   <img src="../../assets/analytics/analytics-dashboard/Explore-Page.png" alt="The Explore page showing the Configure chart panel on the left and a line chart on the right." />
<figcaption><center>The Explore page provides a configuration panel and a single chart for focused analysis.</center></figcaption>
</figure>

#### Configure a chart

The **Configure chart** panel controls what the chart plots. Choose a **Source** (for example, Engagement or a custom event) and a **Metric**, then refine with:

- **Time interval** — Days, weeks, or cumulative.
- **Breakdown by** — Split the chart by a segment such as platform, age group, or [custom field](./custom-fields.md).
- **Filter by** — Narrow the data to specific segment values.

If you are using [custom fields](./custom-fields.md), you can filter and break down custom metrics by dimensions unique to your game.

#### Chart types

Pick the chart type that best fits the question you're asking:

<table>
<thead>
  <tr><th>Type</th><th>Best for</th></tr>
</thead>
<tbody>
  <tr><td>Line</td><td>Trends over time — how a metric fluctuates day to day.</td></tr>
  <tr><td>Horizontal bar</td><td>Comparing performance across breakdown values, such as cumulative playtime by platform.</td></tr>
  <tr><td>Stacked column</td><td>Composition — how parts make up a whole, like total kills by weapon type.</td></tr>
  <tr><td>Pie</td><td>Distribution — a quick snapshot of how a total splits across segments.</td></tr>
  <tr><td>Table</td><td>Snapshots of multiple metrics side-by-side across breakdowns.</td></tr>
</tbody>
</table>

<Alert severity="info">
Stacked column and pie charts aren't available for averages or ratios.
</Alert>

#### Calculated metrics

Toggle **Use operations** in the **Configure chart** panel to build metrics from multiple inputs using math operators.

1. **Define your variables** — Add the metrics or custom events you want to combine (`Metric A`, `Metric B`, and so on).
2. **Define your formula** — Combine them with `+`, `-`, `*`, `/`, and constants, for example `(A / B) * 100`.

Common use cases:

- **Win rate** — `RoundWins / RoundsPlayed` to see how difficulty changes over time.
- **Economy health** — `CurrencySources - CurrencySinks` to monitor inflation in real time.
- **Engagement ratios** — `EquippedWeapon / TotalPlayers` to understand feature adoption.

<figure>
   <img src="../../assets/analytics/analytics-dashboard/Explore-Calculated-Metrics.png" alt="The Configure chart panel with Use operations enabled, showing two metrics and a formula of (A / B) * 100 labeled Win rate." />
<figcaption><center>Build calculated metrics by combining custom events and standard metrics with math operators.</center></figcaption>
</figure>

#### Custom tables

Choose the **Table** chart type to view multiple metrics together. Tables support:

- **Row breakdowns** — Group rows by date (daily, weekly, cumulative) or by a segment such as platform, age, or spender status.
- **Additional metric columns** — Add more metrics to see a snapshot of performance across different breakdowns. Each metric should support the breakdown applied to the table.

<figure>
   <img src="../../assets/analytics/analytics-dashboard/Explore-Custom-Table.png" alt="The Explore page in table mode showing daily active users, average playtime, and revenue broken down by platform." />
<figcaption><center>Custom tables let you compare several metrics across a breakdown in a single view.</center></figcaption>
</figure>

#### Overlays and smoothing

Use **Overlays** and **Smoothing** to understand how your metrics are trending:

- **Benchmarks** — Overlay the benchmark for your game alongside your own data. See [Benchmarking](#benchmarking) for how benchmarks are selected.
- **Period-over-period** — Plot a prior time window on the same chart to compare against recent performance. Choose the offset (for example, a 28-day offset).
- **7-day moving average** — Apply smoothing to remove weekly seasonality and surface the underlying trend.

<figure>
   <img src="../../assets/analytics/analytics-dashboard/Explore-Overlays-Smoothing.png" alt="The Overlays and Smoothing controls in the Configure chart panel, with Period-over-period selected at a 28-day offset and L7 moving average enabled." />
<figcaption><center>Combine overlays and smoothing to compare periods and see the underlying trend.</center></figcaption>
</figure>

#### Share a chart

Once you've configured a chart, the URL reflects your selections. Bookmark it for later or share it with teammates to open the same view.

### Export a chart

To export a chart to use with other data analytics tools, click the **Export Button** and save the metrics in a `.csv` file. The file includes timestamps and values of each datapoint per KPI.

<Alert severity="info">
You can't export the chart data for the given KPI chart if you don't have any data for your game. This is due to either you enroll in the dashboard for less than 48 hours or you don't have any users for the given timeframe.
</Alert>

### Benchmarking

Benchmarking is the process of measuring your game's KPIs and comparing them to other games on Roblox. With benchmarks displayed on your dashboard, you can monitor the performance of your game's analytics KPIs among games on Roblox to adjust your content strategy and set appropriate goals for improvement.

For KPIs relevant to specific aspects of your user behavior, the analytics dashboard provides **benchmarks for games with similar players**. Depending on the availability, you might see:

- **Games with similar players** if the model finds enough games enjoyed by players that are similar to yours, such as those on the recommended games section on your Game Details Page.
- **Genre** benchmarks if the model cannot find enough similar games but your game has an internal genre.
- **All experiences** benchmarks if your game hasn't been labeled with a genre yet.

Your game may transition from one benchmark set to another as we gather more data to help you compare your game with the most relevant games with at least 100 daily active users. Benchmarks for similar games update daily to reflect the most relevant games for your user base.

When your benchmark sets update, such as **Genre** updating to **Experiences with similar players**, the dashboard adds annotations in the charts to identify when your game transitions from one benchmark set to another.

<img src="../../assets/analytics/analytics-dashboard/benchmark-transition.png" width= "100%" alt="An example graph showing icon indicating transition from Genre benchmarks to Similar Experiences benchmarks." />

Available KPIs for similar game benchmarks include:

- **Retention** - All KPIs
- **Engagement**- Average Session Time
- **Monetization** - Average Revenue per Paying Users (ARPPU), Average Revenue per DAU (ARPDAU), Conversion Rate (CVR)
- **Acquisition** - Play Through Rate

Each of these KPIs shows its similar game benchmark in the 50th - 90th percentile range. For example, if you see your Day 1 Retention benchmark's 50th - 90th percentile is 12.11% - 18.73%, it means that:

- 50% of games with similar players have a Day 1 Retention of 12.11% or lower.
- 10% of games with similar players have a Day 1 Retention of 18.73% or higher.

<img src="../../assets/analytics/analytics-dashboard/benchmark-similar-exp.png" width= "100%" alt="An example shows the D7 retention chart with similar game benchmarking." />

For KPIs on your game's overall success, the analytics dashboard uses the top 1000 games with the highest total playtime over a rolling 30 days as the benchmarking pool, excluding games that are less than 30 days old. Each of these KPIs has **Top 200**, **Top 500**, and **Top 1000** as benchmarking tiers. The dashboard displays the appropriate tier for your game based on your game's engagement metrics and updates them on a daily basis.

### View KPI breakdowns

You can apply a breakdown to analyze each chart in a more specific category by clicking the **Breakdown by** and toggling between the breakdown types, including **Age Group**, **Platform**, **OS**, **Country**, and **Language**. The following table explains the subcategories and usage of each breakdown type. You might also see an "Unknown" subcategory that refers to users without relevant data.

<table>
<thead>
  <tr>
    <th>Breakdown by</th>
    <th>Subcategory examples</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Age group</td>
    <td>&lt;9, 9-12, 13-15, 18+, etc.</td>
    <td></td>
  </tr>
  <tr>
    <td>Platform</td>
    <td>Computer, phone, tablet, console, VR</td>
    <td>Users might be counted more than once if they use multiple devices.</td>
  </tr>
  <tr>
    <td>OS (operating system)</td>
    <td>Android, iOS, Windows, macOS, PlayStation, etc.</td>
    <td>Users might be counted more than once if they use multiple devices.</td>
  </tr>
  <tr>
    <td>Gender</td>
    <td>Female, male, unknown</td>
    <td></td>
  </tr>
  <tr>
    <td>Source</td>
    <td>Home recommendation, search, teleports, sponsored ads, etc.</td>
    <td></td>
  </tr>
  <tr>
    <td>Top countries</td>
    <td>The top five countries where your game has the most daily active users</td>
    <td>Also includes an "other" category and total DAU.</td>
  </tr>
  <tr>
    <td>Top languages</td>
    <td>The top five languages where your game has the most daily active users</td>
    <td>Also includes an "other" category and total DAU.</td>
  </tr>
  <tr>
    <td>When user first played</td>
    <td>0-30 days ago, 31-90 days ago, 91-180 days ago, 181-365 days ago, 365+ days ago, never</td>
    <td>It's uncommon, but users can purchase a game pass and never actually play the game. You might see these users on the revenue chart.</td>
  </tr>
  <tr>
    <td>Active payer status</td>
    <td>Top 15%, intermediate 35%, casual 50%, lapsed, never</td>
    <td>Percentile-based within your game, not a fixed value. **Top 15%** includes users who fall into the 85-100th percentile of spenders for your game, **Intermediate 35%** 50-84th, and **Casual 50%** 0-49th. **Lapsed** indicates users who haven't spent in the past 30 days, and **Never** is users who've never spent. Recalculated daily. See **Platform spender status** for status outside of your game.</td>
  </tr>
  <tr>
    <td>Platform spender status</td>
    <td>Active, other</td>
    <td>Fixed value, not percentile-based. **Active** includes users who've spent $9.99 or more anywhere on Roblox in the last 60 days. **Other** includes all other users.<br /><br />This definition is consistent with the [Creator Rewards program](../../creator-rewards.md), so you can better understand the behavior of players who earn you Daily Engagement Rewards.[^1]</td>
  </tr>
</tbody>
</table>

When viewing a breakdown on a chart, you can click on the value in the legend to toggle the line on and off, or double click on one value in the chart's legend to view only that line.

## Sales data

Sales data download is one of the Roblox analytics offerings that can help you view and analyze your asset and developer product sales in your desired way.

### Access sales data

Roblox automatically generates a `.csv` (comma-separated values) file for your sales data and updates it every 48 hours. You can download and customize it to fit your analytics tactics. To access the file:

1. In your [Account Info Settings](https://www.roblox.com/my/account#!/info), add and verify your email address for receiving the data download link.
2. In your [Security Settings](https://www.roblox.com/my/account#!/security), set up an **Authenticator App** as the 2-Step Verification method for your account.
3. Navigate to your or your group's transactions page.

   1. For your personal sales data, navigate to the [My Transactions](https://www.roblox.com/transactions) page.
   2. For your group's sales data:
      1. Navigate to the [Groups](https://www.roblox.com/groups) page and select the target group.
      2. Click the **&ctdot;** button on the group banner and select **Configure Group**.
      3. In the navigation menu, hover over **Revenue** to show the dropdown and then select **Sales**.

4. From the **Type of Transaction** dropdown, select **Sales of Goods**. Then click the **Download Data** button.

   <img src="../../assets/analytics/sales-of-good.png" width="80%" />

5. On the prompted calendar, select a calendar month of sales data to download. You can choose any month from the current date to up to two years ago. If you choose the current month, the file will include all available data of the partial month.

   <img src="../../assets/analytics/sales-data-calendar.png" width= "45%" />

6. In the inbox of your verified email address, you receive an email with a link to download a `.zip` file that contains your sales data in `.csv` format. The link will expire after 48 hours.

7. You can use the `.csv` sales data sheet to analyze the data in your desired way to meet your specific business needs. For example, you can filter to display only sale records with pending Robux to release to you, so you can calculate the timeline and amount of your sales payout to make decisions on when to [exchange earned Robux for real-world currency (DevEx)](https://en.help.roblox.com/hc/en-us/articles/203314100-Developer-Exchange-DevEx-Overview-How-to-Submit-Requirements) or pay your collaborators.

### Sales data attributes

On the `.csv` sales data sheet, each sold item has the following attributes and metrics:

| Attribute          | Description                                                                                                                                                                                                             | Example                               |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Buyer User ID      | User ID of the user who purchased the item.                                                                                                                                                                             | `123456789`                           |
| Sale Date and Time | Date and time of the transaction in UTC.                                                                                                                                                                                | `2022-07-15T19:04:30.397Z`            |
| Sale Location      | The location in which the user bought the item, such as a game and the Marketplace.                                                                                                                              | `WebSite`, `Marketplace`, `Game`      |
| Universe ID        | The unique identifier of the game that the purchased item belongs to. Only applicable for items that belong to a game, like a pass.                                                                        | `987654321`                           |
| Universe           | The name of the game that the purchased item belongs to. Only applicable for items that belong to a game, like a pass.                                                                                     | `My Awesome Game`               |
| Asset ID           | The unique identifier of the item.                                                                                                                                                                                      | `234565432`                           |
| Asset Name         | The name of the item.                                                                                                                                                                                                   | `My Avatar Shirt`, `My Server`        |
| Asset Type         | The type of the item, which can be a [Roblox asset type](../../projects/assets/index.md#asset-types) or a [developer product](../../production/monetization/developer-products.md) type.                                | `Game Pass`, `Private Server`, `Mesh` |
| Hold Status        | The status of whether Robux from this sale have been released to you or are still in a hold.                                                                                                                            | `Released`, `Held`, `Cancelled`       |
| Revenue            | The amount of Robux you receive for the purchase, which is the item listing price excluding any [Marketplace fees](../../marketplace/marketplace-fees-and-commissions.md), Affiliate Fees, and Recurring Group Payouts. | `50`                                  |
| Price              | The item listing price, which is the amount of Robux that the buyer paid for the purchase.                                                                                                                              | `10`                                  |
