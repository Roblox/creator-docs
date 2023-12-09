---
title: Memory Store Observability
description: Explains how to use the observability dashboard for memory stores.
---

The memory stores observability dashboard provides real-time charts on your memory usage and API requests. It also has a built-in alert system that notifies you by email when an issue arises to help you troubleshoot in sync. For further information about specific errors, you can view your [Error Report](../../production/analytics/error-report.md) to find the error logs.

## Accessing the Dashboard

The memory stores observability dashboard is available for any experience using `Class.MemoryStoreService`, but you must either be the experience owner or have [analytics group permissions](../../production/analytics/analytics-dashboard.md#granting-group-permission) to access the dashboard.

To access the dashboard:

1. Navigate to the [Creations](https://create.roblox.com/dashboard/creations) page on the **Creator Dashboard**.
2. Under the **CREATOR** dropdown, select your account or the group owning the target experience.
3. Select the target experience.
4. In the **REAL-TIME** menu, select **Memory Stores**.

## Available Charts

The dashboard includes two categories of line graphs:

- **Quota Usage** charts for tracking your usage compared to the [dynamically allocated quotas](../../cloud-services/memory-stores/index.md#limits-and-quotas), which are calculated based on the number of users in your experience.
  - **Memory Usage** on your memory usage per minute in bytes compared to how much your allocated quota left.
  - **API Request Unit** on your total request units per minute compared to how much your allocated quota left. This chart can be broken down by each API method.
- **API Usage and Performance** charts for monitoring the API usage pattern and performance based on API method and response status.
  - **Request Count by API** on API request count per minute by API method, such as `Class.MemoryStoreQueue:ReadAsync()` or `Class.MemoryStoreSortedMap:UpdateAsync()`.
  - **Request Count by Status** on API request count by [response status](#response-status-codes).
  - **Request by API x Status** on response statuses returned by all or a specific API method.

The chart contains data for the past 30 days, and you can select to view a custom time range with the selector at the top of the page. If you select a time range earlier than 30 days, the system returns a **Request Failed** error.

## Response Status Codes

The following table lists and describes all status codes of API responses,  which are available on the **Request Count by Status** and **Requests by API x Status** charts. For more information on how to resolve these errors, see [Troubleshooting](#troubleshooting). For the specific quota or limit that an error relates to, see [limits and quotas](../../cloud-services/memory-stores/index.md#limits-and-quotas).

<table>
  <thead>
    <tr>
      <th>Status Code</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Success</td>
      <td>Success.</td>
    </tr>
    <tr>
      <td>DataStructureMemoryOverLimit</td>
      <td>Exceeds data structure level memory size limit (100MB).</td>
    </tr>
    <tr>
      <td>DataUpdateConflict</td>
      <td>Conflict due to concurrent update.</td>
    </tr>
    <tr>
      <td>AccessDenied</td>
      <td>Unauthorized to access experience data. This request doesn't consume request units or use quota.</td>
    </tr>
    <tr>
      <td>InternalError</td>
      <td>Internal error.</td>
    </tr>
    <tr>
      <td>InvalidRequest</td>
      <td>The request doesn't have required information or has malformed information.</td>
    </tr>
    <tr>
      <td>DataStructureItemsOverLimit</td>
      <td>Exceeds data structure level item count limit (1M).</td>
    </tr>
    <tr>
      <td>NoItemFound</td>
      <td>No item found in `Class.MemoryStoreQueue:ReadAsync()` or `Class.MemoryStoreSortedMap:UpdateAsync()`.</td>
    </tr>
    <tr>
      <td>DataStructureRequestsOverLimit</td>
      <td>Exceeds data structure level request unit limit (100,000 request units per minute).</td>
    </tr>
    <tr>
      <td>TotalRequestsOverLimit</td>
      <td>Exceeds universe-level request unit limit.</td>
    </tr>
    <tr>
      <td>TotalMemoryOverLimit</td>
      <td>Exceeds universe-level memory quota.</td>
    </tr>
    <tr>
      <td>ItemValueSizeTooLarge</td>
      <td>Value size exceeds limit (32KB).</td>
    </tr>
  </tbody>
</table>

### Troubleshooting

The following table also shows the recommended solution for each specific error response:

<table>
  <thead>
    <tr>
      <th>Error</th>
      <th>Troubleshooting options</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>DataStructureRequestsOverLimit</td>
      <td rowspan="2">
        <ul>
          <li>Add a local cache by saving information to another variable and rechecking after a certain time interval, such as 30 seconds.</li>
          <li>Use the **Request Count by Status** chart to verify that you are receiving more **Success** responses than **NoItemFounds**. Limit the amount of times you hit `Class.MemoryStoreService` with a failed request.</li>
          <li>Implement a short delay between requests.</li>
          <li>Follow the [best practices](../../cloud-services/memory-stores/index.md#best-practices), including:</li>
            <ul>
              <li>Sharding your data structures if you receive a significant amount of **DataStructureRequestsOverLimit** responses.</li>
              <li>Implement an exponential backoff for finding a reasonable rate of requests to send.</li>
            </ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td>TotalRequestsOverLimit</td>
    </tr>
    <tr>
      <td>DataStructureItemsOverLimit</td>
      <td rowspan="3">
        <ul>
          <li>Apply [best practices](../../cloud-services/memory-stores/index.md#best-practices) on reducing the memory size.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>DataStructureMemoryOverLimit</td>
    </tr>
    <tr>
      <td>TotalMemoryOverLimit</td>
    </tr>
    <tr>
      <td>DataUpdateConflict</td>
      <td>
        <ul>
          <li>Implement a short delay between requests to avoid multiple requests updating the same key at the same time.</li>
          <li>For sorted maps, use the callback function on the `Class.MemoryStoreSortedMap:UpdateAsync()` method to abort a request after a certain number of attempts, as the following code sample shows:</li>
             ```lua title="Example of Aborting Request"
             local MemoryStoreService = game:GetService("MemoryStoreService")
             local map = MemoryStoreService:GetSortedMap("AuctionItems")

             function placeBid(itemKey, bidAmount)
                 map:UpdateAsync(itemKey, function(item)
                     item = item or { highestBid = 0 }
                     if item.highestBid < bidAmount then
                         item.highestBid = bidAmount
                         return item
                     end
                     print("item is "..item.highestBid)
                     return nil
                 end, 1000)
             end

             placeBid("MyItem", 50)
             placeBid("MyItem", 40)
             print("done")
             ```
          <li>Investigate to see if you’re calling `Class.MemoryStoreService` efficiently to avoid conflicts. Ideally, you shouldn't over-send requests.</li>
          <li>Consistently remove items once they are read using the `Class.MemoryStoreQueue:RemoveAsync()` method for queues and `Class.MemoryStoreSortedMap:RemoveAsync()` for sorted maps.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Internal Error</td>
      <td>
        <ul>
          <li>Check the <a href="https://status.roblox.com/pages/59db90dbcdeb2f04dadcf16d">Roblox status page</a>.</li>
          <li>File a <a href="https://devforum.roblox.com/t/how-to-post-a-bug-report/24388">bug report</a> describing the issue with your experience's Universe ID.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>InvalidRequest</td>
      <td>
        <ul>
          <li>Make sure that you include correct and valid parameters in your request. Examples of invalid parameters include:</li>
          <ul>
            <li>An empty string</li>
            <li>A string that exceeds the length limit</li>
          </ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td>ItemValueSizeTooLarge</td>
      <td>
        <ul>
          <li>Shard or split the item value into multiple keys.</li>
          <ul>
            <li>To organize grouped keys, sort them alphabetically by adding a `prefix` to the key.</li>
          </ul>
          <li>Encoding or compressing stored values.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Notification Alerts

The email alert system automatically detects and sends you alerts of memory store usage issues that can harm the performance of your experience. There are two types of alerts:

- **Warnings** are alerts with lower priority about issues that can potentially impact your experience. You should resolve them before they become critical issues. The dashboard flags these alerts by highlighting the chart in yellow with a warning message.
- **Criticals** are alerts with higher priority on issues directly impacting your experience. You should resolve these issues as soon as possible to prevent degraded performance. The dashboard flags these alerts by highlighting the chart in red with an error message.

When your experience triggers two types of alerts at the same time, the dashboard displays the alert header message and highlights the chart region for your attention as **Critical**.

Currently, the system has four built-in alerts for memory usage and API requests.  If your experience exceeds an alerting threshold, the system notifies you at most once a day for each alert. When receiving an email alert, you should view the dashboard and take actions to prevent degraded performance.

### Memory Usage Alerts

The system sends the following memory usage alerts:

- A **Warning** alert when your experience's memory usage has exceeded 70% of the total quota within the past hour.

   <img src="../../assets/data/memory-store/Memory-Usage-Warning.png" width="100%" />
- A **Critical** alert when your experience exceeded the memory size quota for the past hour.

   <img src="../../assets/data/memory-store/Memory-Usage-Critical.png" width="100%" />

These issues usually occur when you overpopulate a memory store data structure with too much data, which can consume the quota quickly even if you only send requests on a few keys. For example, if you set a long expiration time on keys or don't clean up processed data, extra data can fill up your memory quota.

To prevent and resolve these issues, apply [best practices](../../cloud-services/memory-stores/index.md#best-practices) to keep track of data structures you're actively using and set up a mechanism for cleaning up processed data.

### API Request Alerts

The system sends the following API request alerts:

- A **Critical** alert when the number of your memory store request failures has exceeded 20% within the past hour.

   <img src="../../assets/data/memory-store/Request-Failure-Critical.png" width="100%" />
- A **Critical** alert when more than 10% of your memory store requests are being throttled for the past hour.
  - This alert is based on the number of **DataStructureRequestsOverLimit** + **TotalRequestsOverLimit**, which are error responses indicating that your experience is throttled because it sends too many requests.
  - This alert isn't related to the request size, only quantity.

   <img src="../../assets/data/memory-store/Request-Throttled-Critical.png" width="100%" />
  
  All API requests have corresponding [response status codes](#response-status-codes), so you can view the ratio of **Success** responses to all error responses using the **Request Count by Status** chart for [troubleshooting](#troubleshooting).
  