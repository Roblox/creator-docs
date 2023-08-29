---
title: Memory Stores
description: Explains how to implement memory store data structures to store frequent in-memory data.
---

`Class.MemoryStoreService` is a high throughput and low latency data service that provides fast in-memory data storage accessible from all servers in a live session. **Memory Stores** are suitable for frequent and ephemeral data that change rapidly and don't need to be durable, because they are faster to access and vanish when reaching the maximum lifetime. For data that need to be persistent and static across sessions, use [Data Stores](../../cloud-services/datastores.md).

## Data Structures

Instead of directly accessing raw data, memory stores have two primitive data structures shared across servers for quick processing: [sorted map](../../cloud-services/memory-stores/sorted-map.md) and [queue](../../cloud-services/memory-stores/queue.md). You can choose which one to use based on your usage, such as:

- **Skill-based matchmaking** - Save user information, such as skill level, in a shared **queue** among servers and use lobby servers to run matchmaking periodically.
- **Cross-server trading and auctioning** - Enable universal trading between different servers on items, where users can bid on items with real-time changing prices stored inside a **map** as key-value pairs.
- **Global leaderboards** - Store and update user rankings on a shared leaderboard inside a **map** with key-value pairs.
- **Cache for Persistent Data** - Sync and copy your persistent data in a data store to a memory store **map** with key-value pairs to function as caches, which can help improve your experience's performance.

In general, if you need to access data based on a specific key, use a sorted map. If you need to process your data in a specific order, use a queue.

## Limits and Quotas

To maintain the scalability and system performance, memory stores have data usage quota for the memory size, API requests, and the data structure size.

### Memory Size Quota

The memory quota limits the total amount of memory that an experience can consume. It's not a fixed value. Instead, it changes over time depending on the number of users in the experience according to the following formula: **64KB + 1KB ⨉ [number of users]**. The quota applies on the experience level instead of the server level.

When users join the experience, the additional memory quota is available immediately. When users leave the experience, the quota doesn't reduce immediately. There's a trace back period of **8 days** before the quota re-evaluates to a lower value.

With the observability feature available, you can view the memory size quota of your experience in real-time using the Memory Usage chart. For more information on properly arranging your memory usage to ensure an uninterrupted experience for your users, see [Identifying Peak Times and Performance Bottlenecks](../../cloud-services/memory-stores/observability.md#identifying-peak-times-and-performance-bottlenecks).

### API Requests Limits

For API requests limits, there's a **Request Unit** quota applies for all `Class.MemoryStoreService` API calls, which is **1000 + 100 \* [number of concurrent users]** request units per minute. Additionally, the rate of requests to any single queue or sorted map is limited to **100,000** request units per minute.

Most API calls only consume one request unit, with the exceptions of `Class.MemoryStoreService:GetRangeAsync()` for sorted maps and `Class.MemoryStoreService:ReadAsync()` for queues. These two methods consume units based on the number of returned items with at least one request unit. For example, if `Class.MemoryStoreService:GetRangeAsync()` returns 10 items, the total quota counts based on 10 request units. If it returns an empty response without items, the quota counts based on a single request unit. In addition, `Class.MemoryStoreService:ReadAsync()` consumes an additional unit every two seconds while reading. The maximum read time is specified using the `waitTimeout` parameter.

The requests quota is also applied on the experience level instead of the server level. This provides flexibility to allocate the requests among servers as long as the total request rate does not exceed the quota. If you exceed the quota, then you receive an error response when the service throttling your requests.

With the [observability](../../cloud-services/memory-stores/observability.md) feature available, you can view the request unit quota of your experience in real-time.

### Data Structure Size Limits

For a single sorted map or queue, the following size and item count limits apply:

- Maximum number of items: 1,000,000

- Maximum total size (including keys for sorted map): 100MB

## Observability

The [memory stores observability dashboard](../../cloud-services/memory-stores/observability.md) provides insights and analytics for monitoring and troubleshooting your memory store usage. With real-time updating charts on different aspects of your memory usage and API requests, you can track the memory usage pattern of your experience, view the current allocated quotas, monitor the API status, and identify potential issues for performance optimization.

## Testing and Debugging in Studio

`Class.MemoryStoreService` offers separate namespaces for API calls from Studio that are different from runtime servers, so you can safely test a memory store before going to production. Your API calls from Studio for testing don't access production data so that you can freely test new features.

Studio testing has the same [limits and quotas](#limits-and-quotas) as the production. For quotas calculated based on the number of users, the resulting quota you have can be very limited since you are the only user for studio testing.

To debug a memory store on live experiences or when testing in studio, use [Developer Console](../../studio/developer-console.md).
