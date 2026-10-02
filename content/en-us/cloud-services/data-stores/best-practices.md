---
title: Best practices for data stores
description: Design, operate, and scale reliable data stores for your experience.
---

Use these practices to organize and manage reliable, scalable, and observable data throughout its lifecycle.

## Organize your data

### Create fewer data stores

Data stores behave similarly to tables in databases. Use a small, fixed set of data stores and organize records within them by key. For example, store every player's profile in one `PlayerData` data store instead of creating a data store for each player.

### Use one or few keys per player

Store the persistent data for each player under one key whenever the data fits within the [4 MB object size limit](./error-codes-and-limits.md#data-limits). For example, use a key such as `User_123456` in the `PlayerData` data store. This pattern reduces requests, lets you update related values atomically, and makes rollbacks easier to reason about.

If different parts of a player's data have different access patterns or approach per-key size or throughput limits, split the record into a small number of deterministic keys. Keep data that must change atomically in the same key.

### Use static key patterns and prefixes

Build key names from stable identifiers and static patterns, such as `User_{UserId}`. Don't use display names or other values that can change. Static patterns make keys predictable across servers and tooling. For data stores, they also let [automated right-to-be-forgotten processing](./right-to-be-forgotten.md) identify player data.

Use [prefixes](./versioning-listing-and-caching.md#listing-and-prefixes) to group related keys. For example, an experience that supports multiple character profiles might use `User_123456/Profile/Warrior` and `User_123456/Profile/Mage`. You can then pass `User_123456/Profile` to `Class.DataStore:ListKeysAsync()|ListKeysAsync()` to list that player's profiles.

[Scopes](./versioning-listing-and-caching.md#scopes) are another way to subdivide a data store. A scope prepends a string to every key in that data store instance, and the default is `global`.

### Evaluate data store modules

Third-party data store modules are always an option, and in many cases
may be preferred to building systems from scratch. Before adopting one, review
its ownership, maintenance status, and feature sets. Understand how to access
and migrate your data without the module.

<Alert severity="info">
DataStore2 is a legacy third-party library and you shouldn't use it for new experiences. If your experience currently uses DataStore2, use Roblox's official [beta DataStore2 migration tool](https://create.roblox.com/store/asset/82521207271039/BETA-DataStore2-Migration-Tool) to migrate from its one-data-store-per-player pattern.
</Alert>

## Reduce and distribute requests

### Buffer player data in memory

Load a player's data at the start of a session and keep a server-local copy for gameplay. Update the local copy instead of sending a data store request for every change. Save it periodically, when the player leaves, when the server shuts down, and at critical checkpoints such as purchase processing. Choose a periodic save interval that stays within your request limits and is shorter than any session-lock expiration; the [player data and purchasing sample](./player-data-purchasing.md) uses 180 seconds.

### Stagger recurring requests

Don't start recurring requests from every server on the same schedule. Before starting a fixed-frequency loop, assign each server or player a random initial offset. For polling or coordination loops that don't require an exact cadence, add bounded random jitter to each interval. These patterns distribute requests over time and reduce synchronized traffic spikes.

### Retry transient failures

Wrap requests in `Global.LuaGlobals.pcall()` and retry transient failures with exponential backoff. Add random jitter to each delay so that servers don't retry simultaneously. Cap the delay and number of attempts, and don't retry errors caused by invalid requests or operations that can no longer provide useful results.

Process data store retries in order for each key. An older request that retries after a newer request succeeds can overwrite newer data. Also account for writes with unknown outcomes: a failed call means the server didn't receive a successful response, but the backend might have completed the write. For more information, see [Data store error codes and limits](./error-codes-and-limits.md) and [Retries](./player-data-purchasing.md#retries).

### Prefer UpdateAsync over SetAsync

Prefer `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` when a write depends on the current value or when multiple servers might write the same key. `UpdateAsync()` reads the latest value into your callback before it writes, which reduces lost updates. `Class.GlobalDataStore:SetAsync()|SetAsync()` overwrites the key without reading first and can cause inconsistency if two servers write at the same time.

Use `SetAsync()` when you create a new key or replace a value that doesn't depend on the previous value. For a comparison of the two methods, see [Set vs update](./index.md#set-vs-update).

### Shard hot keys

Each key has [read and write throughput limits](./error-codes-and-limits.md#throughput-limits). For shared data that many servers read but rarely update, distribute reads across multiple keys that contain copies of the same record. Use this approach only to address **per-key read throttling**, after you reduce unnecessary requests. It doesn't resolve write throttling or increase experience-level or server-level request budgets.

For example, consider an **Admin Abuse** event that changes the **Weather** across an experience. If every server reads the current weather from a single `Weather` key, that key can reach its read throughput limit even though the weather changes infrequently. Instead, store copies under a fixed set of keys such as `Weather_1`, `Weather_2`, and `Weather_3`. Assign each server a shard at startup, for example by hashing its `Class.DataModel.JobId` into the fixed set, so reads spread across the keys. Each server reads only its assigned copy.

When polling shared keys, including weather copies, add a random initial delay before the first read and bounded random jitter between subsequent reads. Choose a polling interval that balances how quickly servers need to observe changes with the read throughput limit. Avoid having every server read at the same time, such as immediately after a shared event notification. For more information, see [Stagger recurring requests](#stagger-recurring-requests).

When the weather changes, update every copy. These writes aren't atomic across keys, so servers might temporarily read different weather states. Replicating the record adds writes and makes consistency and future migrations more complex. Don't use this approach for data that requires atomic updates across all readers or already remains below its per-key read throughput limit.

## Build an operations workflow

Use the available tools together:

1. **Observe.** Use the [Data Stores Observability Dashboard](./observability.md) to track requests, response status, throughput, and storage. Configure [custom alerts](../../production/analytics/alerts.md) for important data store metrics so your team can respond to sustained failures or unexpected growth. Creator Hub notifications also let you know when storage approaches or exceeds limits and include guidance and links to dashboards.
1. **Inspect.** Use [Data Stores Manager](./data-stores-manager.md) to examine data stores, keys, storage usage, and estimated costs. If the experience has more than 100 data stores, the Data Stores list doesn't show size and key counts. Use Open Cloud or the [Data Stores Batch Processor](https://github.com/Roblox/data-stores-batch-processor-cli) for those metrics.
1. **Remediate.** Use Data Stores Manager for individual records. Use the [Open Cloud data store APIs](../../cloud/guides/data-stores/index.md) or [Data Stores Batch Processor](https://github.com/Roblox/data-stores-batch-processor-cli) for repeatable or large-scale workflows.
1. **Scale intentionally.** First reduce unnecessary storage and requests. If legitimate usage exceeds the default quotas, evaluate [Extended Services](../extended-services.md).

Open Cloud and game servers share the experience-level request budget.
Rate-limit operational Open Cloud scripts so they don't interfere with live traffic.

## Manage the data lifecycle

Use data store versions instead of creating a new key for every revision. Only the latest version of a key counts toward storage usage, and versions let you inspect or restore earlier values.

Use [memory stores](../memory-stores/index.md) for temporary and rapidly changing data. Memory store data expires automatically and doesn't add to persistent data store storage.

Delete test data when testing ends and remove data for expired events or retired features. After you mark a data store for deletion, there is a 30-day buffer during which you can restore it. After those 30 days, Roblox permanently deletes the data store. For more information, see [Data Stores Manager](./data-stores-manager.md#delete-data-stores-and-keys).

## Set up right-to-be-forgotten processing

Configure [automated right-to-be-forgotten (RTBF) processing](./right-to-be-forgotten.md) for player data that follows static data store and key patterns. Automated RTBF is the preferred workflow because Roblox applies your deletion templates when it processes an eligible request.

If automated RTBF doesn't support your data schema, use the [right-to-erasure webhook](../../cloud/webhooks/automate-right-to-erasure.md) to run a custom deletion workflow. Verify that either workflow removes all matching player data.
