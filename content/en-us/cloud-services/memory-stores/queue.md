---
title: Memory store queue
description: Explains how to implement the queue data structure for memory stores.
---

A **queue** is a linear data structure with a collection of items that either follows the first-in-first-out (FIFO) principle or prioritizes elements based on predefined criteria. [Memory stores](../../cloud-services/memory-stores/index.md) support two types of queue, the FIFO [regular queues](../../luau/queues.md#regular-queues) and [priority queues](../../luau/queues.md#priority-queues). Both types share the same set of functions for initializing an empty queue, adding data to the queue, reading data from the queue, and removing data from the queue.

Memory store queues are useful for order-based processing and storing user information, such as skill levels, to facilitate matchmaking based on your desired criteria. For example, you can add a lobby place as the start place of your experience, use memory store queues as a centralized user information storage system accessible by multiple servers, manage the placement order of users using the queues, and teleport user who have completed the matchmaking to the main place of your experience.

## Get a queue

To get a queue, call `Class.MemoryStoreService:GetQueue()` with a **name**, which is global within the experience for any script to access, and an optional **invisibility timeout** in seconds, which prevents duplicated processing of the same queue item. Invisibility timeout is 30 seconds by default if you leave it empty like the following code sample.

```lua title="Getting an Empty Queue"
local MemoryStoreService = game:GetService("MemoryStoreService")

local queue = MemoryStoreService:GetQueue("Queue1")
```

When a queue is processing an item in it, the invisibility timeout applies to the item, turning it invisible from being processed by other servers, as multiple servers can update the queue concurrently. Though it's expected to complete both read and removal operations for an item during the invisibility timeout duration, if an error occurs that causes the item to remain in the queue after the timeout elapses, the items become visible for processing again. In doing this, the invisibility timeout guarantees that all items in a queue can still be processed even if unexpected issues occur.

After you get a queue, call any of the following functions:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.MemoryStoreQueue:AddAsync()`</td>
    <td>[Add](#add-data) a new item to the queue.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreQueue:ReadAsync()`</td>
    <td>[Read](#read-and-remove-data) one or more items from the queue as a single operation.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreQueue:RemoveAsync()`</td>
    <td>[Remove](#read-and-remove-data) one or more items previously read from the queue.</td>
  </tr>
  <tr>
    <td>`Class.MemoryStoreQueue:GetSizeAsync()`</td>
    <td>[Get](#get-size) the number of items in the queue.</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
All functions accessing data structures in memory stores are asynchronous network calls that might occasionally fail. You should wrap these calls in `Global.LuaGlobals.pcall()` to catch and handle errors, like the code sample in each section shows.
</Alert>

## Add data

To add a new item to the queue, call `Class.MemoryStoreQueue:AddAsync()` with the item value, an expiration time in seconds, and an optional priority of the item. If you want to keep your queue in the FIFO sequence, you can leave the priority empty or pass `0`.

```lua title="Adding Data to a Queue"
local MemoryStoreService = game:GetService("MemoryStoreService")

local queue = MemoryStoreService:GetQueue("Queue1")

local addSuccess, addError = pcall(function()
	queue:AddAsync("User_1234", 30, 1)
end)
if not addSuccess then
	warn(addError)
end
```

## Read and remove data

To read one or more items from the queue at once, call `Class.MemoryStoreQueue:ReadAsync()`, which returns an `id` representing the read item. When you finish processing items, immediately call `Class.MemoryStoreQueue:RemoveAsync()` to delete them from the queue with its `id`. This ensures that you never process an item more than once. To capture and respond to all items that are continuously being added to a queue, include a [loop](../../luau/control-structures.md) like the following code sample:

```lua title="Reading and Removing Data from Queue with Loop"
local MemoryStoreService = game:GetService("MemoryStoreService")

local queue = MemoryStoreService:GetQueue("Queue1")

local addSuccess, addError = pcall(function()
	queue:AddAsync("User_1234", 30, 1)
end)
if not addSuccess then
	warn(addError)
end

-- Queue processing loop
while true do
	local readSuccess, items, id = pcall(function()
		return queue:ReadAsync(1, false, 30)
	end)
	if not readSuccess then
		task.wait(1)
	elseif #items > 0 then
		print(items, id)
		local removeSuccess, removeError = pcall(function()
			queue:RemoveAsync(id)
		end)
		if not removeSuccess then
			warn(removeError)
		end
	end
end
```

## Get size

To get the number of items in the queue, call
`Class.MemoryStoreQueue:GetSizeAsync()`. This method takes an optional boolean `excludeInvisible`.
When it is `true`, invisible items are excluded from the returned count.
This boolean defaults to `false`.

```lua title="Getting the Size of a Queue"
local MemoryStoreService = game:GetService("MemoryStoreService")

local queue = MemoryStoreService:GetQueue("Queue1")

local addSuccess, addError = pcall(function()
	return queue:AddAsync("User_1234", 30, 1)
end)

if not addSuccess then
	warn(addError)
end

local size
local success, sizError = pcall(function()
	size = queue:GetSizeAsync(true)
end)

if success then
	print(size)
else
	warn(sizeError)
end
```
