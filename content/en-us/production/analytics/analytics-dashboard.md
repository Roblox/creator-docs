---
title: Analytics Dashboard
description: Analytics Dashboard helps you measure and gain insight into your experience's performance.
---

The **Analytics Dashboard** helps you measure and gain insight into your experience's performance to adjust content strategies. It visualizes standard key performance indicators (KPIs) of your experience to help you optimize your experience's full lifecycle, including:

- [Retention](../../production/analytics/retention.md) KPIs that measure how many users return to your experience again after their first visit.
- [Engagement](../../production/analytics/engagement.md) KPIs that reflect how users actively use your experience and represent your core user base.
- [Acquisition](../../production/analytics/acquisition.md) statistics that show you the sources of users finding your experience and how users from different sources convert.
- [Monetization](../../production/analytics/monetization.md) KPIs that help you understand the business performance of your experience.

Any experience with more than 10 Daily Active Users (DAU) and 10 play hours for 7 consecutive days is eligible for accessing all KPIs on the dashboard.

The dashboard also provides [Sales Data](#sales-data) that you can download and analyze in custom ways.

## Setting Up Analytics Dashboard

If you are an experience owner or a group owner, and your experience meets the enrollment requirements, you can enroll in the analytics dashboard at any point with the following steps:

1. Make sure that you have a verified email address and a 2-Step Verification method on your Roblox account.

2. Navigate to the experience overview page on the [Creator Dashboard](https://create.roblox.com/creations).

3. Read Roblox **Terms of Use** that pop out automatically. Click **Agree** if you agree to them.

Now you have access to the main dashboard on the **Overview** and dashboards of all KPI categories, including **Engagement**, **Retention**, and **Monetization**.

<Alert severity="info">
If you don't want to activate the dashboard immediately, or you accidentally decline the **Terms of Use**, you can still use the **Activate Analytics** button on the experience overview page to read the **Terms of Use** and agree to them any time. Refresh the page if you don't see the button.
</Alert>

<Alert severity="warning">
For [group](../../projects/groups.md) experiences, only the group owner and members with sufficient permissions can view the analytics dashboard, as some KPIs such as revenue are sensitive information. See [here](../../projects/groups.md#roles-and-permissions) for details on how to create a group role with access to view the dashboard.
</Alert>

## Dashboard Functionalities

After activating the analytics dashboard, you can view the default charts on the overview and each KPI category. Hover over the **Information Icon** to understand what each chart represents and the **View Icon** to understand how to interpret the summary statistics on the top of each chart.

There are also functionalities on each dashboard to help you further analyze your experience's performance, such as [filtering by date](#filtering-by-date), [exporting charts](#exporting-a-chart), [benchmarking](#benchmarking), and [viewing KPI Breakdowns](#viewing-kpi-breakdowns).

### Filtering by Date

You can apply a date filter to view the chart for a date range by separately selecting any specific time frame between the first date that the data was available and the present day as the start and the end date.

### Filtering by Metrics

You can apply various filters to better understand your cohorts by clicking the **Filter By** button. Filters apply to all charts across all analytics pages until they are turned off.

Some filters might not be available for all metrics. If a filter is not available, you will see that it is grayed out:

   <img src="../../assets/analytics/analytics-dashboard/Metrics-Unavailable.png" alt="Example of some filters displaying at partial opacity when unavailable." width="70%" />

You can filter by the following metrics:

<table><thead>
  <tr>
    <th>**Filter Type**</th>
    <th>**Subcategories**</th>
    <th>**Usage**</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Age Group</td>
    <td>&lt;9, 9-12, 13-17, 18+</td>
    <td>Analyze latest trends across different age groups.</td>
  </tr>
  <tr>
    <td>Platform</td>
    <td>Computer, Phone, Tablet, VR and Console. Users might be double counted if they use more than one device.</td>
    <td>Analyze latest trends across different platforms.</td>
  </tr>
  <tr>
    <td>OS (Operating System)</td>
    <td>Android, iOS, Xbox One, OSX, Playstation and Windows.</td>
    <td>Analyze latest trends across different OS types. Users might be double counted if they use more than one device.</td>
  </tr>
  <tr>
    <td>Country </td>
    <td>All countries</td>
    <td>Analyze latest trends across different countries</td>
  </tr>
  <tr>
    <td>Language </td>
    <td>All languages</td>
    <td>Analyze which languages are popular across your users to help prioritize localization efforts. You can also see the impacts of adding translation for different languages.</td>
  </tr>
  <tr>
    <td>New vs. returning</td>
    <td>New, returning</td>
    <td>Analyze how new and returning users are engaging with your experiences. </td>
  </tr>
  <tr>
    <td>Gender</td>
    <td>Female, male, unknown</td>
    <td>Analyze how female, male, and unknown gender demographics are engaging with your experiences. </td>
  </tr>
  <tr>
    <td>Memory group (only applicable to some performance metrics)</td>
    <td>&lt;2GB, 2GB-4GB, 4GB-8GB, 8GB+</td>
    <td>Analyze how your experience is performing across different devices. You can identify under-performing devices and focus on improving performance.</td>
  </tr>
  <tr>
    <td>Acquisition Source (only applicable to acquisition metrics)</td>
    <td>Home recommendations, home other, search, friends, teleport, sponsored ads</td>
    <td>Analyze how users from different acquisition sources engage with your experience.</td>
  </tr>
</tbody></table>

### Explore Mode

Use the **Explore** button on the top-right corner of the chart to switch to a single chart view. In this view, you can apply different filters and breakdowns to explore under-performing segments and areas of opportunity.

   <img src="../../assets/analytics/analytics-dashboard/Explore-Mode.png" alt="Analytics chart with top-right corner annotated to indicate explore mode button" />

### Exporting a Chart

To export a chart to use with other data analytics tools, click the **Export Button** and save the metrics in a `.csv` file. The file includes timestamps and values of each datapoint per KPI.

<Alert severity="info">
You can't export the chart data for the given KPI chart if you don't have any data for your experience. This is due to either you enroll in the dashboard for less than 48 hours or you don't have any users for the given timeframe.
</Alert>

### Benchmarking

Benchmarking is the process of measuring your experience's KPIs and comparing them to other experiences on Roblox. With benchmarks displayed on your dashboard, you can monitor the performance of your experience's analytics KPIs among experiences on Roblox to adjust your content strategy and set appropriate goals for improvement.

For KPIs relevant to specific aspects of your user behavior, the analytics dashboard provides **similar experience benchmarks**. Depending on the availability, you might see:

- **Similar experiences** benchmarks if the model finds enough similar games, such as those on the recommended experiences section on your Experience Details Page.
- **Genre** benchmarks if the model cannot find enough similar experiences but your game has an internal genre.
- **All experiences** benchmarks if your game hasn't been labeled with a genre yet.

Your experience may transition from one benchmark set to another as we gather more data to help you compare your experience with the most relevant experiences with at least 100 daily active users. Benchmarks for similar experiences update daily to reflect the most relevant experiences for your user base.

When your benchmark sets update, such as **Genre** updating to **Similar Experience**, the dashboard adds annotations in the charts to identify when your experience transitions from one benchmark set to another.

<img src="../../assets/analytics/analytics-dashboard/benchmark-transition.png" width= "100%" alt="An example graph showing icon indicating transition from Genre benchmarks to Similar Experiences benchmarks." />

Available KPIs for similar experience benchmarks include:

- **Retention** - All KPIs
- **Engagement**- Average Session Time
- **Monetization** - Average Revenue per Paying Users (ARPPU), Average Revenue per DAU (ARPDAU), Conversion Rate (CVR)
- **Acquisition** - Qualified Play Through Rate

Each of these KPIs shows its similar experience benchmark in the 50th - 90th percentile range. For example, if you see your Day 1 Retention benchmark's 50th - 90th percentile is 12.4% - 24.1%, it means that:

- 50% of similar experiences have a Day 1 Retention of 12.4% or lower.
- 10% of similar experiences have a Day 1 Retention of 24.1% or higher.

<img src="../../assets/analytics/analytics-dashboard/benchmark-similar-exp.png" width= "100%" alt="An example shows the D7 retention chart with similar experience benchmarking." />

For KPIs on your experience's overall success, the analytics dashboard uses the top 1000 experiences with the highest total playtime on rolling 30 days as the benchmarking pool, excluding experiences that are less than 30 days old. Each of these KPIs has **Top 200**, **Top 500**, and **Top 1000** as benchmarking tiers. The dashboard displays the appropriate tier for your experience based on your experience's engagement metrics and updates them on a daily basis,

### Viewing KPI Breakdowns

You can apply a breakdown to analyze each chart in a more specific category by clicking the **Breakdown by** and toggling between the breakdown types, including **Age Group**, **Platform**, **OS**, **Country**, and **Language**. The following table explains the subcategories and usage of each breakdown type. You might also see an "Unknown" subcategory refers to users without relevant data.

<table>
<thead>
  <tr>
    <th>Breakdown Type</th>
    <th>Subcategories</th>
    <th>Usage</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Age Group</td>
    <td>13 and Under, 13 through Under 18, 18 and Over. </td>
    <td>Understand latest trends across different age groups.</td>
  </tr>
  <tr>
    <td>Platform</td>
    <td>Computer, Phone, Tablet, and Console. Users might be double counted if they use more than one device.</td>
    <td>Understand latest trends across different platforms.</td>
  </tr>
  <tr>
    <td>OS (Operating System)</td>
    <td>Android, iOS, Xbox one, OSX, and Windows. Users might be double counted if they use more than one device.</td>
    <td>Understand latest trends across different OS types.</td>
  </tr>
    <tr>
    <td>Country (top 5)</td>
    <td>The top 5 countries where your experience has the most Daily Active Users, an "Other" category as the aggregate of all other countries where you have users, and the total number of Daily Active Users.</td>
    <td>Understand latest trends across the top 5 countries where your experience is most popular.</td>
  </tr>
  <tr>
    <td>Language (top 5)</td>
    <td>The top 5 languages where your experience has the most Daily Active Users, an "Other" category as the aggregate of all other languages where you have users based on their playtime instead of the languages you offer, and the total number of Daily Active Users.</td>
    <td>Understand which languages are most popular across your users to help prioritize localization efforts. You can also see the impacts of adding translation for different languages.</td>
  </tr>
</tbody>
</table>

## Sales Data

Sales data download is one of the Roblox analytics offerings that can help you view and analyze your asset and developer product sales in your desired way.

### Accessing Sales Data

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

6. In your inbox of your verified email address, you receive an email with a link to download a `.zip` file that contains your sales data in `.csv` format. The link will expire after 48 hours.

7. You can use the `.csv` sales data sheet to analyze the data in your desired way to meet your specific business needs. For example, you can filter to display only sale records with pending Robux to release to you, so you can calculate the timeline and amount of your sales payout to make decisions on when to [exchange earned Robux for real-world currency (DevEx)](../../production/earning-on-roblox.md#the-developer-exchange-program) or pay your collaborators.

### Sales Data Attributes

On the `.csv` sales data sheet, each sold item has the following attributes and metrics:

| Attribute          | Description                                                                                                                                                                                                                 | Example                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| Buyer User ID      | User ID of the user who purchased the item.                                                                                                                                                                                 | `123456789`                           |
| Sale Date and Time | Date and time of the transaction in UTC.                                                                                                                                                                                    | `2022-07-15T19:04:30.397Z`            |
| Sale Location      | The location in which the user bought the item, such as an experience and the Marketplace.                                                                                                                                  | `WebSite`, `Marketplace`, `Game`      |
| Universe ID        | The unique identifier of the experience that the purchased item belongs to. Only applicable for items that belong to an experience, like a game pass.                                                                       | `987654321`                           |
| Universe           | The name of the experience that the purchased item belongs to. Only applicable for items that belong to an experience, like a game pass.                                                                                    | `My Awesome Experience`               |
| Asset ID           | The unique identifier of the item.                                                                                                                                                                                          | `234565432`                           |
| Asset Name         | The name of the item.                                                                                                                                                                                                       | `My Avatar Shirt`, `My Server`        |
| Asset Type         | The type of the item, which can be a [Roblox asset type](../../projects/assets/index.md#asset-types) or a [Developer Product](../../production/monetization/developer-products.md) type.                                    | `Game Pass`, `Private Server`, `Mesh` |
| Hold Status        | The status of whether Robux from this sale have been released to you or are still in a hold.                                                                                                                                | `Released`, `Held`, `Cancelled`       |
| Revenue            | The amount of Robux you receive for the purchase, which is the item listing price excluding any [Marketplace Fees](../../art/marketplace/marketplace-fees-and-commissions.md), Affiliate Fees, and Recurring Group Payouts. | `50`                                  |
| Price              | The item listing price, which is the amount of Robux that the buyer paid for the purchase.                                                                                                                                  | `10`                                  |
