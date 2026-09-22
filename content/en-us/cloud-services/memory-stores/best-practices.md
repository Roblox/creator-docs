---
title: Best practices for memory stores
description: Design and operate scalable memory store data structures while reducing throttling.
---

Use these practices to organize temporary data, distribute load, and respond to memory store issues.

Depending on the data structure type, `Class.MemoryStoreService` enforces [limits](index.md#data-structure-size-limits) on the memory and number of items in a data structure. All data structures are also constrained by a global per-partition request limit.

## Design keys and data structures

See [Use static key patterns and prefixes](../data-stores/best-practices.md#use-static-key-patterns-and-prefixes) in [Best practices for data stores](../data-stores/best-practices.md). Apply those patterns to both keys and data structure names so every server routes the same logical data to the same location.

Choose expiration times that match how long the data remains useful. Don't use memory stores for persistent player records or data that must survive expiration. For help choosing between services, see [Data stores versus memory stores](../data-stores-vs-memory-stores.md).

## Handle request failures

See [Retry transient failures](../data-stores/best-practices.md#retry-transient-failures) in [Best practices for data stores](../data-stores/best-practices.md).

## Prefer UpdateAsync over SetAsync

See [Prefer UpdateAsync over SetAsync](../data-stores/best-practices.md#prefer-updateasync-over-setasync) in [Best practices for data stores](../data-stores/best-practices.md). Hash maps and sorted maps provide `Class.MemoryStoreHashMap:UpdateAsync()` and `Class.MemoryStoreSortedMap:UpdateAsync()` for this pattern.

## Stagger recurring requests

See [Stagger recurring requests](../data-stores/best-practices.md#stagger-recurring-requests) in [Best practices for data stores](../data-stores/best-practices.md).

## Monitor usage

Use the [Memory Store Observability Dashboard](observability.md) to monitor quota usage, request volume, and response statuses. Review the built-in email alerts, configure [custom alerts](../../production/analytics/alerts.md) for important memory store metrics, and use the [Error Report](../../production/analytics/error-report.md) to investigate failures.

Reduce requests, item sizes, and expiration times before increasing capacity. If legitimate usage exceeds the default quotas, evaluate [Extended Services](../extended-services.md).

## Manage sorted map and queue limits

Sorted maps and queues both have limits on the maximum number of items and maximum total memory. Additionally, the items in one of these data structures always reside on a single partition. Every request to one of those data structures is a request to the same partition.

When a sorted map or queue reaches its item or memory limit, remove unnecessary items manually or by adding an expiration policy. If only the memory limit is causing throttling, reduce item sizes by removing unnecessary information from keys and values.

If you need all of your items or are experiencing throttling due to request throughput, the only solution is sharding.

## Distribute load with sharding

Sharding is the process of storing a set of related data across multiple data structures. In other words, it means taking an existing, high-throughput data structure and replacing it with multiple, smaller ones that together contain the same set of data as the original.

The key challenge to sharding is finding a way to spread the data across multiple data structures in a way that maintains the same functionality as the original.

Although Roblox already partitions hash maps, you can further shard them by spreading requests among several keys.

### Sharding a sorted map

To shard player records in a sorted map, use modulo arithmetic to assign each `Datatype.User.Id|Id` to one of a fixed number of maps. The following example uses four maps and consistently routes the same user to the same map:

<Alert severity="info">
Use a helper function to get the correct sorted map from an item key. This way, you don't have to repeat the same block of code for every function call.
</Alert>

```lua title="Sharding a Sorted Map"
-- Initialize the MemoryStore Service
local MemoryStoreService = game:GetService("MemoryStoreService")

-- Create your Sorted Map buckets
local sm1 = MemoryStoreService:GetSortedMap("sm1")
local sm2 = MemoryStoreService:GetSortedMap("sm2")
local sm3 = MemoryStoreService:GetSortedMap("sm3")
local sm4 = MemoryStoreService:GetSortedMap("sm4")
local sortedMaps = { sm1, sm2, sm3, sm4 }

-- Helper function to retrieve the correct bucket from the Item Key
local function getSortedMapBucket(userId)
	local bucketIndex = (userId % #sortedMaps) + 1
	return sortedMaps[bucketIndex]
end

-- Initialize players with default value of 0
for _, player in game:GetService("Players"):GetPlayers() do
	local userId = player.User.Id
	local bucket = getSortedMapBucket(userId)
	bucket:SetAsync(tostring(userId), 0, 600)
end

-- Retrieve a player's value
local player = game:GetService("Players"):GetPlayers()[1]
local userId = player.User.Id
local bucket = getSortedMapBucket(userId)
local playerScore = bucket:GetAsync(tostring(userId))
print(playerScore)
```

### Sharding a queue

Sharding a queue is trickier than sharding a sorted map. Although you want to spread the request throughput across multiple queues, adds, reads, and removes only ever occur at the front or back of the queue.

One solution is to use a revolving queue, which means creating multiple queues and rotating between them when you add or read an item:

1. Create several queues and add them to an array.
1. Create two local pointers. One represents the queue you want to read and remove items from. The other represents the queue you want to add items to:
   - For read operations, calculate the number of items you need from each queue, as well as where to move the read pointer to.
   - For remove operations, pass the IDs from the read to each queue.
   - For add operations, add to the queue at the add pointer and increment the pointer.

```lua title="Sharding a Queue"
-- Initialize the MemoryStore Service
local MemoryStoreService = game:GetService("MemoryStoreService")

-- Create your Queues
local q1 = MemoryStoreService:GetQueue("q1")
local q2 = MemoryStoreService:GetQueue("q2")
local q3 = MemoryStoreService:GetQueue("q3")
local q4 = MemoryStoreService:GetQueue("q4")

-- Put the Queues in an Array
local queueArr = { q1, q2, q3, q4 }

-- Create two pointers representing the indices of the read and add queues
local readIndex = 1
local addIndex = 1

-- Create a local function that updates the indices appropriately
local function rotateIndex(index, n)
	return (index + n - 1) % 4 + 1
end

-- Create a local function that reads n items from the queue
local function readFromQueue(count, allOrNothing, waitTimeout)
	local endIndex = count % 4
	local countPerQueue = count // 4
	local items = {}
	local ids = {}

	-- loop through each queue
	for i = 1, 4, 1 do
		-- determine if this queue will read an extra item
		local diff = i - readIndex
		if diff < 0 then
			diff += 4
		end

		local queue = queueArr[i]

		-- read items from each queue
		-- +1 items if matches extra read criteria
		if diff < endIndex then
			items[i], ids[i] = queue:ReadAsync(countPerQueue + 1, allOrNothing, waitTimeout)
		else
			items[i], ids[i] = queue:ReadAsync(countPerQueue, allOrNothing, waitTimeout)
		end
	end

	readIndex = rotateIndex(readIndex, count)

	return items, ids
end

-- Create a local function that removes n items from the queue
local function removeFromQueue(ids)
	for i = 1, 4, 1 do
		local queue = queueArr[i]
		queue:RemoveAsync(ids[i])
	end
end

-- Create a local function that adds an item to the queue
local function addToQueue(itemKey, expiration, priority)
	local queue = queueArr[addIndex]
	queue:AddAsync(itemKey, expiration, priority)
	addIndex = rotateIndex(addIndex, 1)
end

-- Write some code!

for _, player in game:GetService("Players"):GetPlayers() do
	addToQueue(player.User.Id, 600, 0)
end

local players, ids = readFromQueue(20, true, -1)
removeFromQueue(ids)
```

### Hash maps

Hash maps do not have individual memory or item count limits and are automatically sharded, but you can still encounter throttling if you use them poorly.

For example, consider a game with a hash map of data, stored as the value of a single key named `metadata`. If this metadata contains a nested object with information such as place ID, player count, and more, every time the metadata is needed, you have no choice but to call `GetAsync("metadata")` and retrieve the entire object. In this case, all requests go to a single key and therefore a single partition.

Rather than storing all metadata as a single, nested object, store each independently accessed field as its own key so that the hash map can take advantage of automatic sharding. If you need separation between metadata and the rest of the hash map, add a naming prefix, such as `metadata_user_count` instead of `user_count`.

If one or a few keys receive frequent requests, shard those calls across multiple keys. For example, if all game servers retrieve a value from one hash map key, the requests might cause partition throttling. To reduce the load, copy the value to multiple keys and route each server to a stable shard.
