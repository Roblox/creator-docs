---
title: Memory Store Sorted Map
description: Explains how to implement the sorted map data structure for memory stores.
---

The **sorted map** data structure of [memory stores](../../cloud-services/memory-stores/index.md) allows you to store frequent in-memory data as key-value pairs with an optional sort key and maintain a specific order based on the sort keys and keys. Unlike queues, the order of keys entering a map doesn't determine the order of processing, making sorted maps useful for sorting based data organization for implementing in-experience entities for engagement such as leaderboards and cross-server auctioning.

## Limits

In addition to the [data structure size limits](../../cloud-services/memory-stores/index.md#data-structure-size-limits), sorted maps have a key size limit of 128 characters, a value size limit of 32KB, and a sort key size limit of 128 characters.

If you need to store data that surpasses this limit for your experience, you can adopt the sharding technique to split and distribute them through **key prefix** into multiple data structures. Sharding memory stores can also help improve the scalability of your system.

## Getting a Sorted Map

To get a sorted map, call `Class.MemoryStoreService:GetSortedMap()` with a **name** you want to define for the map. The name is global within the experience, so you can access the same sorted map on any script using the name.

```lua title='Getting a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("SortedMap1")
```

After you get a sorted map, call any of the following functions to read or write data in it:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.MemoryStoreSortedMap:SetAsync()`</td>
    <td>[Add](#adding-or-overwriting-data) a new key or overwrite the value and/or sort key if the key already exists.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreSortedMap:GetAsync()`</td>
    <td><a href="#adding-or-overwriting-data">Read</a> a particular key.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreSortedMap:GetRangeAsync()`</td>
    <td><a href="#adding-or-overwriting-data">Read</a> all existing keys or a specific range of them.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreSortedMap:UpdateAsync()`</td>
    <td>[Update](#updating-data) the value of a key and/or sort key after retrieving it from a sorted map.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreSortedMap:RemoveAsync()`</td>
    <td>[Remove](#removing-data) a key from the sorted map.</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
All functions accessing data structures in memory stores are asynchronous network calls that might occasionally fail. You should wrap these calls in `Global.LuaGlobals.pcall()` to catch and handle errors, like the code sample in each section does.
</Alert>

## Adding or Overwriting Data

To add a new key or overwrite the value or sort key of a key in the sorted map, call `Class.MemoryStoreSortedMap:SetAsync()` with the key **name**, its **value**, an **expiration time** in seconds and an **optional sort key**. The memory automatically cleans up once the key expires. The maximum expiration time is 3,888,000 seconds (45 days). The sort key, if provided, must be a valid number (integer or floating point) or a string.

In the sorting order of your keys, a sort key takes precedence over a key. For example, when sorting in ascending order, numeric sort keys sort first, followed by string sort keys, followed by items with no sort key. All items with numeric sort keys are sorted by sort key, if the sort key for two items is equal, they are sorted by key. Similarly, all items with string sort keys are sorted by sort key, if the sort key for two items is equal, they are sorted by key. All items with no sort key are sorted just by the key.

Example of some data sorted in ascending order -

```text
{Key: "player1", Value: someValue1, SortKey: -1}
{Key: "player2", Value: someValue2, SortKey: 0}
{Key: "player4", Value: someValue3, SortKey: 1}
{Key: "player5", Value: someValue4, SortKey: 1}
{Key: "player3", Value: someValue5, SortKey: 3.14}
{Key: "player6", Value: someValue6, SortKey: "someString"}
{Key: "player0", Value: someValue7}
{Key: "player7", Value: someValue8}
```

Note how `player0` sorts after all keys with a sort key. `player6` sorts after all keys with a numeric sort key. `player4` and `player5` have the same sort key, so they are sorted in ascending order by key.

If you do not want to utilize sort key and you want to sort your keys in numerical order, put only numerical values for key **names** and add padding for them. For example, to sort `100` after `99`, pad the numbers on the left as in `00100` and `00099`.

<Alert severity="warning">
Under the EU General Data Protection Regulation (GDPR), if your memory stores have user data subject to [Right to be Forgotten](https://gdpr.eu/right-to-be-forgotten/) you **must** remove the data in 30 days, even if you set your memory store key's expiration up to 45 days.
</Alert>

```lua title='Adding Data to a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("SortedMap1")

local setSuccess, _ = pcall(function()
	return sortedMap:SetAsync("User_1234", 1000, 30, 3.14152)
end)
if setSuccess then
	print("Set succeeded.")
end
```

## Getting Data

You can either get a data value and sort key associated with a specific key or get multiple values of keys in a range.

### Getting Data with One Key

To get a value and sort key associated with one key from the sorted map, call `Class.MemoryStoreSortedMap:GetAsync()` with the key **name**.

```lua title='Getting a Particular Key from a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("SortedMap1")

local setSuccess, _ = pcall(function()
	return sortedMap:SetAsync("User_1234", 1000, 30, 3.14152)
end)
if setSuccess then
	print("Set succeeded.")
end

local getSuccess, getError = pcall(function()
	sortedMap:GetAsync("User_1234")
end)
if not getSuccess then
	warn(getError)
end
```

### Getting Data with Multiple Keys

To get multiple keys from the sorted map as a single operation, call `Class.MemoryStoreSortedMap:GetRangeAsync()`. This function lists all existing keys by default, but you can set the upper and lower bounds for the key range. For example, the following code sample retrieves up to 20 items starting from the beginning of the sorted map, with keys greater than or equal to `10`, sort keys greater than or equal to `100` and keys less than or equal to `50`, sort keys less than or equal to `500`.

```lua title='Getting a Range of Keys from a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("SortedMap1")

local lowerBound = {}
lowerBound["key"] = "10"
lowerBound["sortKey"] = 100
local upperBound = {}
upperBound["key"] = "50"
upperBound["sortKey"] = 500

-- Get up to 20 items starting from the beginning
local getSuccess, items = pcall(function()
	return sortedMap:GetRangeAsync(
		Enum.SortDirection.Ascending, 20, lowerBound, upperBound)
end)
if getSuccess then
	for _, item in items do
		print(item.key)
		print(item.sortKey)
	end
end
```

## Updating Data

To retrieve the value and sort key of a key from a sorted map and update it, call `Class.MemoryStoreSortedMap:UpdateAsync()` with the key **name**, a **callback function** to update the value and sort key for this key, and an **expiration time** in seconds. The maximum expiration time is 3,888,000 seconds (45 days).

For most experiences, multiple servers can update the same key concurrently and change the value. As `Class.MemoryStoreSortedMap:UpdateAsync()|UpdateAsync()` always modifies the latest value before updating, you should use it to read the latest value as the input for your callback function.

For example, the following code sample updates the score in a leaderboard for a player in a game. The score is calculated as kills / deaths. `Class.MemoryStoreSortedMap:UpdateAsync()|UpdateAsync()` ensures that the kills and deaths are updated for the most recent values even if multiple game servers update the same item simultaneously. A player's kills and deaths are monotonically increasing values and can hence only increase in value in a session.

```lua title='Updating the leaderboard score for a player in a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("Leaderboard")

local function updateLeaderboard(itemKey, killsToAdd, deathsToAdd)
	local score = killsToAdd / math.max(deathsToAdd, 1)
	local success, newStats, newScore = pcall(function()
		return sortedMap:UpdateAsync(itemKey, function(playerStats, playerScore)
			playerStats = playerStats or { kills = 0, deaths = 0 }
			playerStats.kills += killsToAdd
			playerStats.deaths += deathsToAdd
			if playerStats then
				-- `playerScore` is the sortKey being used to sort items in the map
				playerScore = playerStats.kills / math.max(playerStats.deaths, 1)
				return playerStats, playerScore
			end
			return nil
		end, 30)
	end)
	if success then
		print(newStats)
		print(newScore)
	end
end
```

The latency for `Class.MemoryStoreSortedMap:UpdateAsync()|UpdateAsync()` is similar to `Class.MemoryStoreSortedMap:GetAsync()|GetAsync()` and `Class.MemoryStoreSortedMap:SetAsync()|SetAsync()` unless there is contention.

When contention occurs, the system automatically retries the operation until one of these three happens: the operation succeeds, the callback function returns nil, or the maximum number of retries is reached. If the system reaches the maximum number of retries, it returns a conflict.

## Removing Data

You can use `Class.MemoryStoreSortedMap:RemoveAsync()` for both removing one key from the sorted map and deleting all data in a memory store.

### Removing a Key

To remove a key from the sorted map, call `Class.MemoryStoreSortedMap:RemoveAsync()` with a key **name**.

```lua title='Remove a Key from a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("SortedMap1")

local setSuccess, _ = pcall(function()
	return sortedMap:SetAsync("User_1234", 1000, 30, "someStringSortKey")
end)
if setSuccess then
	print("Set succeeded.")
end

local removeSuccess, removeError = pcall(function()
	sortedMap:RemoveAsync("User_1234")
end)
if not removeSuccess then
	warn(removeError)
end
```

### Deleting All Data

To delete memory in sorted maps, list all your keys with `Class.MemoryStoreSortedMap:GetRangeAsync()`, then remove them with `Class.MemoryStoreSortedMap:RemoveAsync()`.

```lua title='Delete Memory in a Sorted Map'
local MemoryStoreService = game:GetService("MemoryStoreService")

local sortedMap = MemoryStoreService:GetSortedMap("SortedMap1")

-- Initial lower bound of nil starts flush from first item
local exclusiveLowerBound = nil

while true do
	-- Get up to a hundred items starting from current lower bound
	local getRangeSuccess, items = pcall(function()
		return sortedMap:GetRangeAsync(SortDirection.Ascending, 100, exclusiveLowerBound)
	end
	if getRangeSuccess then
		local removeSuccess = true
		local removeError = nil

		for _, item in items do
			removeSuccess, removeError = pcall(function()
				sortedMap:RemoveAsync(item.key)
			end)
		end

		-- If there was an error removing items, try again with the same exclusive lower bound
		if not removeSuccess then
			warn(removeError)
		-- If range is less than a hundred items, end of map is reached
		elseif #items < 100 then
			break
		else
			-- The last retrieved key is the exclusive lower bound for the next iteration
			exclusiveLowerBound = {}
			exclusiveLowerBound["key"] = items[#items].key
			exclusiveLowerBound["sortKey"] = items[#items].sortKey
		end
	end
end
```
