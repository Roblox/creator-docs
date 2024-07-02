---
title: Data Store Observability
description: Explains how to use the observability dashboard for data stores.
---

The data stores observability dashboard provides real-time charts on your request counts, with the ability to filter by standard or ordered data stores.

![An image showing the request count by API dashboard in the Creator Hub.](../../assets/data/data-store/Data-Store-API.png)

## Accessing the Dashboard

The data stores dashboard is available for any experience that uses `Class.DataStoreService`, but you must either be the experience owner or have [analytics group permissions](../../production/analytics/analytics-dashboard.md#granting-group-permission) to access the dashboard.

1. Navigate to the [Creations](https://create.roblox.com/dashboard/creations) page on the **Creator Hub**.
2. Under the **Creator Hub** dropdown, select your account or the group owning the target experience.
3. Select the experience.
4. In the **Monitoring** dropdown, select **Data Stores**.

## Available Charts

- **Request Count by API** on API request count per minute by API method, such as `Class.DataStore:SetAsync()` or `Class.OrderedDataStore:GetSortedAsync()`.
- **Request Count by Status** on API request count by [response status](#response-status-codes).
- **Request by API x Status** on response statuses returned by all or a specific API method.

Use the selector at the top of the page to filter by standard or ordered data stores. The default view includes both.

Each chart contains data for the past 30 days, and you can select to view a custom time range with the selector at the top of the page. If you select a time range earlier than 30 days, the system returns a **Request Failed** error.

Data from the most recent three minutes might be incomplete, so it's normal to see a drop at the end of the charts.

## Response Status Codes

The dashboard's **Request Count by Status** and **Requests by API x Status** charts include status codes of API responses that you can use to understand usage and troubleshoot errors. For a table that lists and describes all of these status codes (aside from `200 OK`), see [Error Codes](index.md#error-codes).

For information on limits and usage quotas, see [Limits](index.md#limits).
