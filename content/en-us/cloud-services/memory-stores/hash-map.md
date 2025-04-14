---
title: Memory store hash map
description: Explains how to implement the hash map data structure for memory stores.
---

**Hash maps**, similar to sorted maps, let you store in-memory data as key-value pairs. Unlike sorted maps, they maintain no ordering guarantees. This data structure is useful for cases that require simple data caching and rapid access, such as shared inventories, physical auction houses, and more. Hash maps automatically handle partitioning your data and are very useful if you have more than 1,000 keys. For smaller key spaces, we recommend [sorted maps](../../cloud-services/memory-stores/sorted-map.md).

## Limits

Hash maps have a key size limit of 128 characters and a value size limit of 32 KB.

Otherwise, hash maps use the same [API request](../../cloud-services/memory-stores/index.md#api-requests-limits) and [memory quota](../../cloud-services/memory-stores/index.md#memory-size-quota) limits as the other memory store data structures.

## Get a hash map

To get a hash map, call `Class.MemoryStoreService:GetHashMap()` with a name for the hash map. The name is global within the experience, so you can access the same hash map on any script using this name.

```lua title="Getting a Hash Map"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("HashMap1")
```

After you get a hash map, call any of the following functions to read or write data in it:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.MemoryStoreHashMap:SetAsync()`</td>
    <td>[Add](#add-or-overwrite-data) a new key or overwrite the value if the key already exists.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreHashMap:GetAsync()`</td>
    <td>[Read](#get-data) a particular key.</td>
  </tr>
	<tr>
    <td>`Class.MemoryStoreHashMap:ListItemsAsync()`</td>
    <td>[List](#get-data) items in a hash map.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreHashMap:UpdateAsync()`</td>
    <td>[Update](#update-data) the value of a key after retrieving it from a hash map.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreHashMap:RemoveAsync()`</td>
    <td>[Remove](#remove-data) a key from the hash map.</td>
  </tr>
</tbody>
</table>

For in-depth documentation about each function, see `Class.MemoryStoreHashMap`.

<Alert severity="warning">
All functions accessing data structures in memory stores are asynchronous network calls that might occasionally fail. You should wrap these calls in `Global.LuaGlobals.pcall()` to catch and handle errors, as shown in the code samples.
</Alert>

## Add or overwrite data

To add a new key or overwrite the value of a key in the hash map, call `Class.MemoryStoreHashMap:SetAsync()` with the key **name**, its **value**, and an **expiration time** in seconds. The memory automatically cleans up once the key expires. The maximum expiration time is 3,888,000 seconds (45 days).

<Alert severity="warning">
Under the EU General Data Protection Regulation (GDPR), if your memory stores have user data subject to the [right to be forgotten](https://gdpr.eu/right-to-be-forgotten/) you must remove the data within 30 days, even if you set your memory store key's expiration up to 45 days.
</Alert>

```lua title="Adding Data to a Hash Map"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("HashMap1")

local setSuccess, _ = pcall(function()
	return hashMap:SetAsync("User_1234", 1000, 30)
end)
if setSuccess then
	print("Set succeeded.")
end
```

## Get data

You can either get a value associated with a specific key or get multiple key-value pairs in the hash map.

### Get data with one key

To get a value associated with one key from the hash map, call `Class.MemoryStoreHashMap:GetAsync()` with the key **name**.

```lua title="Getting a Particular Key from a Hash Map"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("HashMap1")

local setSuccess, _ = pcall(function()
	return hashMap:SetAsync("User_1234", 1000, 30)
end)
if setSuccess then
	print("Set succeeded.")
end

local item
local getSuccess, getError = pcall(function()
	item = hashMap:GetAsync("User_1234")
end)
if getSuccess then
	print(item)
else
	warn(getError)
end
```

### Get data with multiple key-value pairs

To get all the key-value pairs from the hash map as a single operation, call `Class.MemoryStoreHashMap:ListItemsAsync()` with the desired page size. This function lists all existing keys in a paginated manner. For example, the following code sample retrieves up to 32 items from the hash map.

```lua title="Listing items in a Hash Map"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("HashMap1")

-- Get list of items, 32 items at a time
local success, pages = pcall(function()
	return hashMap:ListItemsAsync(32)
end)
if success then
	while true do
		-- Get the current page
		local entries = pages:GetCurrentPage()
		-- Iterate through all key-value pairs on page
		for _, entry in ipairs(entries) do
			print(entry.key .. " : " .. tostring(entry.value))
		end
		-- Check if last page has been reached
		if pages.IsFinished then
			break
		else
			print("----------")
			-- Advance to next page
			pages:AdvanceToNextPageAsync()
		end
	end
end
```

## Update data

To retrieve the value of a key from a hash map and update it, call `Class.MemoryStoreHashMap:UpdateAsync()` with the key **name**, a **callback function** to update the key, and an **expiration time** in seconds.

For most experiences, multiple servers can update the same key concurrently and change the value. As `Class.MemoryStoreHashMap:UpdateAsync()|UpdateAsync()` always modifies the latest value before updating, you should use it to read the latest value as the input for your callback function.

For example, the following code sample updates the resource count of a resource in a shared inventory. `Class.MemoryStoreHashMap:UpdateAsync()|UpdateAsync()` ensures that all player contributions will make their way into this shared inventory, even if these contributions are made simultaneously. In this function, it also enforces a max resource count of 500.

```lua title="Updating Resource Count for a Resource in a Shared Inventory"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("ResourceInventory")

local function contributeResources(itemResource, addedCount)
	local success, newResourceCount = pcall(function()
		return hashMap:UpdateAsync(itemResource, function(resource)
			resource = resource or {count = 0}
			resource.count = resource.count + addedCount

			-- ensure we don't exceed the maximum resource count
			if resource.count > 500 then
				resource.count = 500
			end
			return resource
		end, 1200)
	end)
	if success then
		print(newResourceCount)
	end
end
```

The latency for `Class.MemoryStoreHashMap:UpdateAsync()|UpdateAsync()` is similar to `Class.MemoryStoreHashMap:GetAsync()|GetAsync()` and `Class.MemoryStoreHashMap:SetAsync()|SetAsync()` unless there is contention.

When contention occurs, the system automatically retries the operation until one of these three happens: the operation succeeds, the callback function returns `nil`, or the maximum number of retries is reached. If the system reaches the maximum number of retries, it returns a conflict.

## Remove data

You can use `Class.MemoryStoreHashMap:RemoveAsync()` for both removing one key from the hash map and deleting all data in a memory store hash map.

### Remove a key

To remove a key from the hash map, call `Class.MemoryStoreHashMap:RemoveAsync()` with a key **name**.

```lua title="Remove a Key from a Hash Map"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("HashMap1")

local setSuccess, _ = pcall(function()
	return hashMap:SetAsync("User_1234", 1000, 30)
end)
if setSuccess then
	print("Set succeeded.")
end

local removeSuccess, removeError = pcall(function()
	hashMap:RemoveAsync("User_1234")
end)
if not removeSuccess then
	warn(removeError)
end
```

### Delete all data

To delete all data in a hash map, list all your items with `Class.MemoryStoreHashMap:ListItemsAsync()`, then remove them with `Class.MemoryStoreHashMap:RemoveAsync()`.

```lua title="Delete all data in a Hash Map"
local MemoryStoreService = game:GetService("MemoryStoreService")

local hashMap = MemoryStoreService:GetHashMap("HashMap1")

-- Get list of items, 32 items at a time
local success, pages = pcall(function()
	return hashMap:ListItemsAsync(32)
end)
if success then
	while true do
		-- Get the current page
		local entries = pages:GetCurrentPage()
		local removeSuccess = true
		local removeError = nil
		-- Iterate through all key-value pairs on page
		for _, entry in ipairs(entries) do
			print(entry.key .. " : " .. tostring(entry.value))
			removeSuccess, removeError = pcall(function()
				hashMap:RemoveAsync(entry.key)
			end)

			if not removeSuccess then
				warn(removeError)
			end
		end
		-- Check if last page has been reached
		if pages.IsFinished then
			print("Finished deleting all data.")
			break
		else
			print("----------")
			-- Advance to next page
			pages:AdvanceToNextPageAsync()
		end
	end
end
```
