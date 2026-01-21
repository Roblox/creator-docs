---
title: Best practices when designing MemoryStore data structures
description: Explains how to best design data structures to reduce the chance of experiencing throttling.
---

Depending on the data structure type, MemoryStoreService enforces [limits](../../cloud-services/memory-stores/index.md#data-structure-size-limits) on the memory and number of items in a data structure. All data structures are also constrained by a global per-partition request limit.

Each Roblox experience has the [Memory Store Observability Dashboard](../../cloud-services/memory-stores/observability.md), which includes a set of charts that you can use to monitor memory store usage.

## Sorted maps and queues

Sorted maps and queues both have limits on the maximum number of items and maximum total memory. Additionally, the items in one of these data structures always reside on a single partition. Every request to one of those data structures is a request to the same partition.

When a sorted map or queues reaches its item or memory limit, the best course of action is to remove unnecessary items manually or by adding an expiration policy for items. Alternatively, if only the memory limit is causing throttling, you can try to reduce the size of your items by stripping unnecessary information out of your keys and values.

If you need all of your items or are experiencing throttling due to request throughput, the only solution is sharding.

### Sharding

Sharding is the process of storing a set of related data across multiple data structures. In other words, it means taking an existing, high-throughput data structure and replacing it with multiple, smaller ones that together contain the same set of data as the original.

The key challenge to sharding is finding a way to spread the data across multiple data structures in a way that maintains the same functionality as the original.

For hash maps, although the data structure is already partitioned, sharding is done by spreading the requests among several keys.

### Sharding a sorted map

To shard a sorted map, consider splitting your data into alphabetic subsections with character ranges. For example, assume that you only have keys with the first letter from A-Z, and you believe four sorted maps is sufficient for your current use case and future growth:

- The first map can cover A-G, the second H-N, the third O-T, and the fourth U-Z.
- To insert or retrieve an item, use the appropriate map based on the item's starting character.

<Alert severity="info">
Use a helper function to get the correct sorted map from an item key. This way, you don't have to repeat the same block of code for every function call.
</Alert>

```lua title="Sharding a Sorted Map"
-- Initialize the MemoryStore Service
local MemoryStoreService = game:GetService("MemoryStoreService")

-- Create your Sorted Map buckets
local sm_AtoG = MemoryStoreService:GetSortedMap("AtoG")
local sm_HtoM = MemoryStoreService:GetSortedMap("HtoM")
local sm_NtoT = MemoryStoreService:GetSortedMap("NtoT")
local sm_UtoZ = MemoryStoreService:GetSortedMap("UtoZ")

-- Helper function to retrieve the correct bucket from the Item Key
local function getSortedMapBucket(itemKey)
	if (itemKey >= "a" and itemKey < "h") then
		return sm_AtoG
	elseif (itemKey < "n") then
		return sm_HtoM
	elseif (itemKey < "u") then
		return sm_NtoT
	else
		return sm_UtoZ
	end
end

-- Initialize player names with default value of 0
for _, player in game:GetService("Players"):GetPlayers() do
	local bucket = getSortedMapBucket(player)
	bucket:SetAsync(player, 0, 600)
end

-- Retrieve a player's value
local player = "myPlayer"
local bucket = getSortedMapBucket(player)
local playerScore = bucket:GetAsync(player)
print(playerScore)
```

### Sharding a queue

Sharding a queue is tricker than sharding a sorted map. Although you want to spread the request throughput across multiple queues, adds, reads, and removes only ever occur at the front or back of the queue.

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
			items[i], ids[i] = queue:ReadAsync(countPerQueue + 1, allOrNothing,waitTimeout)
		else
			items[i], ids[i] = queue:ReadAsync(countPerQueue, allOrNothing,waitTimeout)
		end
	end

	readIndex = rotateIndex(readIndex, count)

	return items, ids
end

-- Create a local function that removes n items from the queue
local function removeFromQueue(ids)
	for i = 1, 4, 1 do
		local queue = queueArr[readIndex]
		queue:RemoveAsync(ids[i])
	end
end

-- Create a local function that adds an item to the queue
local function addToQueue(itemKey, expiration, priority)
	local queue = queueArr[readIndex]
	queue:AddAsync(itemKey, expiration, priority)
	addIndex = rotateIndex(addIndex, 1)
end

-- Write some code!

for _, player in game:GetService("Players"):GetPlayers() do
	addToQueue(player, 600, 0)
end

local players, ids = readFromQueue(20, true, -1)
removeFromQueue(ids)
```

## Hash maps

Hash maps do not have individual memory or item count limits and are automatically sharded, but you can still encounter throttling if you use them poorly.

For example, consider an experience with a hash map of data, stored as the value of a single key named `metadata`. If this metadata contains a nested object with information such as place ID, player count, and more, every time the metadata is needed, you have no choice but to call `GetAsync("metadata")` and retrieve the entire object. In this case, all requests go to a single key and therefore a single partition.

Rather than storing all metadata as a single, nested object, the better approach is to store each field as its own key so that the hash map can take advantage of automatic sharding. If you need separation between metadata and the rest of the hash map, add a naming prefix (e.g. `metadata_user_count` rather than just `user_count`).

Additionally, if one or few keys is being accessed frequently, it's important to shard these calls among a lot of keys. For example, if all experience servers must retrieve a value from one hash map key you may run into partition throttling. To prevent this you can spread those calls among several keys with the same value until partition throttling no longer occurs.
