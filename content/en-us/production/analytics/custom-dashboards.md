---
title: Custom dashboards
description: Custom dashboards let you assemble the metrics you care about into a single, shareable view tailored to your experience.
---

**Custom dashboards** let you build personalized analytics views tailored to your experience. Instead of jumping between multiple pages, you can assemble all the metrics you care about into a single, shareable dashboard, so you don't have to rebuild the same charts for your [custom events](./custom-events.md) every time you open analytics.

You'll find your dashboards under **Custom dashboards** in the left navigation of your experience.

## Create and publish a dashboard

From the **Custom dashboards** landing page, you can create, edit, rename, and delete dashboards. All published dashboards are visible to anyone on your team with permission to view analytics. For group experiences, see [roles and permissions](../../projects/groups.md#roles-and-permissions) for details on how to grant access to analytics. You can create up to 20 dashboards per experience.

<figure>
   <img src="../../assets/analytics/custom-dashboards/Custom-dashboard-overview.png" width="100%" alt="The Custom dashboards landing page listing existing dashboards with columns for name, creator, last modified date, and a Pin to sidebar toggle." />
<figcaption><center>Create, rename, delete, and pin dashboards from the **Custom dashboards** landing page.</center></figcaption>
</figure>

To create a dashboard:

1. **Open a canvas**: Go to **Custom dashboards**&nbsp;&rang; **Manage all**, then click **Create**.
2. **Name it**: Group metrics by what matters, for example **Economy Health**, **Live-Ops**, or **Retention**.
3. **Customize widgets**: Add charts, tables, or summary cards. Drag to resize and rearrange them so your most important metrics are front and center.
4. **Set default settings**: Adjust your landing defaults for time range, breakdowns, annotations, and granularity.
5. **Publish to save**: Click **Publish** to save the dashboard.

<Alert severity="warning">
A dashboard is only saved when you publish it. If you leave the page without publishing, you lose your changes.
</Alert>

<figure>
   <img src="../../assets/analytics/custom-dashboards/Custom-dashboard.png" width="100%" alt="A published custom dashboard titled Player Progression showing two summary cards above a grid of four charts." />
<figcaption><center>A custom dashboard groups related charts and summary cards into a single view.</center></figcaption>
</figure>

## Add charts to a dashboard

There are three ways to add charts to a custom dashboard:

- **From a custom dashboard**: Click **Add widget** to configure a new chart from scratch.
- **From the Explore page**: Click **Add to dashboard** on any chart you build in Explore.
- **From another dashboard**: Click the overflow menu on any existing chart and select **Add to custom dashboard**.

See the [Explore page](./analytics-dashboard.md#explore) to learn more about chart customization options.

<figure>
   <img src="../../assets/analytics/custom-dashboards/Explore-mode-add-to-dashboard.png" width="100%" alt="The Explore page with a configured Daily active users chart and an Add to dashboard button in the top-right corner." />
<figcaption><center>Build a chart in Explore, then click **Add to dashboard** to save it to a custom dashboard.</center></figcaption>
</figure>

<figure>
   <img src="../../assets/analytics/custom-dashboards/Add-to-custom-dashboard.png" width="80%" alt="A chart's overflow menu open with options for Download CSV, View source query, and Add to custom dashboard." />
<figcaption><center>Open a chart's overflow menu and select **Add to custom dashboard** to copy it into another dashboard.</center></figcaption>
</figure>

## Add summary cards

Summary cards display a single number for a metric, which makes them ideal for top-of-dashboard KPIs. Summary cards support:

- **Aggregation types**: Average over the time period, the most recent data point, or cumulative over the time period. All time periods reflect the dashboard-level date range selected.
- **Custom names**: A label of your choosing.

Use summary cards to surface your most important numbers, such as daily revenue, D1 retention, or peak CCU.

<figure>
   <img src="../../assets/analytics/custom-dashboards/Custom-dashboard-overview-2.png" width="100%" alt="A dashboard in edit mode showing three summary cards for daily revenue, D1 retention, and peak CCU, alongside an Add summary card button." />
<figcaption><center>Summary cards surface a single KPI value at the top of a dashboard.</center></figcaption>
</figure>

## Pin a dashboard to the navigation

For the views you check every day, pin them to the left navigation so they're always one click away. Enable the **Pin to sidebar** toggle for a dashboard on the **Custom dashboards** landing page, and it appears in the left navigation under **Custom dashboards**.

<figure>
   <img src="../../assets/analytics/custom-dashboards/Custom-dashboard-pinning.png" width="100%" alt="The Custom dashboards landing page with the Pin to sidebar toggle enabled for a dashboard, which then appears in the left navigation." />
<figcaption><center>Enable **Pin to sidebar** to add a dashboard to the left navigation for one-click access.</center></figcaption>
</figure>
