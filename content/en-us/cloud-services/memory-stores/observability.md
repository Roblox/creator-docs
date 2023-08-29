---
title: Memory Store Observability
description: Explains how to use the observability dashboard for memory stores.
---

The memory stores observability dashboard provides insights and analytics for monitoring and troubleshooting your memory store usage. With real-time updating charts on different aspects of your memory usage and API requests, you can track the memory usage pattern of your experience, view the current allocated quotas, monitor the API status, and identify potential issues for performance optimization.

## Accessing the Dashboard

The memory stores observability dashboard is available for any experience using memory stores, but you must either be the owner of an individually-owned experience or have [analytics group permissions](../../production/analytics/analytics-dashboard.md#granting-group-permission) for a group-owned experience to access the dashboard.

To access the dashboard:

1. Navigate to the [Creations](https://create.roblox.com/dashboard/creations) page on **Creator Dashboard**.
2. Under the **CREATOR** dropdown, select your account or the group owning the target experience.
3. Select the target experience.
4. In the **REAL-TIME** menu, select **Memory Stores**.

## Available Charts

The dashboard includes two categories of line graphs:

- **Quota Usage** charts for tracking your usage compared to the [dynamically allocated quotas](../../cloud-services/memory-stores/index.md#limits-and-quotas), which are calculated based on the number of users in your experience.
  - **Memory Usage** on your memory usage per minute in bytes compared to how much your allocated quota left.
  - **API Request Unit** on your total request units per minute compared to how much your allocated quota left. This chart can be broken down by each API method.
- **API Usage and Performance** charts for monitoring the API usage pattern and performance based on API method and response status.
  - **Request Count by API** on API request count per minute by API method, such as `Class.Queue.Read` or `Class.SortedMap.Update`.
  - **Request Count by Status** on API request count by [response status](#response-status-codes).
  - **Request by API x Status** on response statuses returned by all or a specific API method.

## Using Charts

In addition to monitoring each chart for one aspect of your memory stores usage, you can combine multiple charts together to gain further insights on your overall performance.

### Identifying Peak Times and Performance Bottlenecks

Since the quota of memory stores is calculated based on the number of users in your experience, during peak times, your experience can receive an increased quota for memory usage and API requests. However, if you store too much memory and don't delete it after the peak time, memory-consuming operations might return errors and fail to fulfill their intended purposes due to the reduced quota, causing performance bottlenecks. You can identify these bottlenecks and adjust your usage accordingly by correlating high memory usage with specific API usage and associated errors using the following charts:

- Memory Usage: Identify high memory usage periods.
- Request Count by API: Analyze API usage during high memory usage periods.
- Requests by API x Status: Investigate error responses associated with API usage to see if API method returns too many errors taking up the request unit quota.

After identifying your peak time for memory usage, either explicitly delete unneeded items or set a valid item expiration. Generally, it's recommended to use explicit deletion for releasing memory as it takes effect immediately. Additionally, add item expiration as a safety mechanism to prevent unused items from occupying memory indefinitely.

<figure>
  <img src="../../assets/creator-dashboard/peak-time-memory-usage.png"
   width="80%" />
   <figcaption>Example of an experience with daytime as the peak time</figcaption>
</figure>

If you store lots of data during the peak time, for example, weekends, you should use either set:

- A small memory size with a long expiration time
- A memory size close to the full size (1KB per user) with a short expiration

Don't store a large amount of data with long expiration, as it risks exceeding your memory quota and potentially causing issues that can break your entire experience. Generally, it's best practice to set the shortest expiration time possible based on your needs instead of using the maximum time limit (45 days).

### Troubleshooting Production Issues

You can gain insights into the frequency and types of errors and throttling of memory stores, and then further analyze the specific API methods or response statuses contributing to these incidents using the following charts:

- Request Count by Status: Monitor the frequency and distribution of errors and throttling incidents.
- Requests by API x Status: Investigate specific API methods or response types combinations associated with errors or throttling.

### Optimizing Usage

After identifying the root cause of a particular issue or resource-intensive areas, you can implement an update for optimization and assess the impact of resulting changes in API request counts and response distribution using the following charts:

- Memory Usage: Monitor resource usage and identify areas of high consumption.
- Request Count by API: Analyze the impact of resource optimization efforts on API request counts.
- Requests by API x Status: Assess the impact of resource optimizations on API response distribution to see if error responses reduce.

<figure>
  <img src="../../assets/creator-dashboard/optimized-request-units.png"
   width="80%" />
   <figcaption>Example of API request units staying below the quota after an implementation for optimization</figcaption>
</figure>

## Response Status Codes

The following table shows and explains all status codes of memory stores API responses, which are available on the **Request Count by Status** and **Requests by API x Status** charts.

| Status Code                    | Description                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| Success                        | Success.                                                                                         |
| DataStructureMemoryOverLimit   | Exceeds data structure level memory size limit (100MB).                                          |
| DataUpdateConflict             | Conflict due to the concurrent update.                                                           |
| AccessDenied                   | Unauthorized to access experience data. This request doesn't consume request units or use quota. |
| InternalError                  | Internal error.                                                                                  |
| InvalidRequest                 | The request doesn't have required information or have malformed information.                     |
| DataStructureItemsOverLimit    | Exceeds data structure level item count limit (1M).                                              |
| NoItemFound                    | No item found in `Class.Queue:Read()` or `Class.SortedMap:Get()`.                                |
| DataStructureRequestsOverLimit | Exceeds data structure level request unit limit (100,000 request units per minute).              |
| TotalRequestsOverLimit         | Exceeds universe-level request unit limit.                                                       |
| TotalMemoryOverLimit           | Exceeds universe-level memory quota.                                                             |
| ItemValueSizeTooLarge          | Value size exceeds limit (32KB).                                                                 |
