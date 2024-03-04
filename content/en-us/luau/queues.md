---
title: Queues
description: Queues are data structures that follow the First In First Out (FIFO) principle.
---

A queue is a linear data structure with a collection of items. There are two types of queues on Roblox: [regular queues](#regular-queues), which follow the first-in-first-out (FIFO) principle, and [priority queues](#priority-queues), which have priorities for items in the queue that determine the data accessing order. Items in both types of queues can be any Luau [data type](../luau/index.md#types).

Queue is a built-in data structure of the [non-persistent data storage](../cloud-services/memory-stores/queue.md) service named `Class.MemoryStoreService`, for which you can directly call the built-in functions to get a queue and add, read, or remove data from the queue. For any other usage, such as scheduling tasks and handling requests in your experience, you can use tables to implement queues on your own.

## Regular Queues

Regular queues are maintained in the FIFO sequence, in which all items are added to the back of the queue and read or removed in the same order as they are added, from the front to the end.

<figure>
  <img src="../assets/data/memory-store/Regular-Queue-Diagram.png" width="80%" />
  <figcaption>The order of how a regular queue adds, reads, and removes items</figcaption>
</figure>

## Priority Queues

Priority queues are not following the FIFO rule, in which each item can be added with a priority number that indicates its order being read or removed. The item at the back of a priority queue has the default priority of 0, and the item at the front of the queue has the highest set priority, which is 5 in the following example.

<figure>
  <img src="../assets/data/memory-store/Priority-Queue-Diagram.png" width="80%" />
  <figcaption>An item's set priority changes the order in which a queue reads items</figcaption>
</figure>

For this example, an item with a set priority of 3 is being added to a queue. The queue places the new item behind all existing items with the set priority of 3 or more. To place an item at the front of the queue, you need to set the priority higher than the current highest set priority. In this example, you need to set the priority to 6 or higher.

Priority queues are useful for situations where you want to read or access data based on the order of importance instead of the order of being added. You can set a priority as an integer when adding an item, and the queue processes items with higher priority before items with lower priorities. For example, you can use priority queues for matchmaking by assigning higher priorities to users who have been waiting for a long time.

## Implementing Queues

You can use built-in queues of `Class.MemoryStoreService` or use [tables](../luau/tables.md) to implement queues for all other usage. The following code sample shows the implementation a **regular queue**. To use this implementation for your experience, you should save it as a `Class.ModuleScript` and store it in `Class.ReplicatedStorage`, so your queue is accessible for both client and server.

```lua title="Implementing a Regular Queue Using Table"
local Queue = {}
Queue.__index = Queue

function Queue.new()
	local self = setmetatable({}, Queue)

	self._first = 0
	self._last = -1
	self._queue = {}

	return self
end

-- Check if the queue is empty
function Queue:IsEmpty()
	return self._first > self._last
end

-- Add a value to the queue
function Queue:Enqueue(value)
	local last = self._last + 1
	self._last = last
	self._queue[last] = value
end

-- Remove a value from the queue
function Queue:Dequeue()
	local first = self._first
	if self:IsEmpty() then
		return nil
	end
	local value = self._queue[first]
	self._queue[first] = nil
	self._first = first + 1
	return value
end

return Queue

```

The following code sample is a usage example as a `Class.Script` under `Class.Workspace`. You can modify the code, type, and storage location to fit your own usage, as long as you have the previous implementation code sample properly stored.

```lua title='Regular Queue Usage Example'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Queue = require(ReplicatedStorage:WaitForChild("Queue"))

local myQueue = Queue.new()

-- Add some values to the queue
myQueue:Enqueue(5)
myQueue:Enqueue(10)
myQueue:Enqueue(15)

-- myQueue = { 5, 10, 15 }

-- Remove one value from the queue
local first = myQueue:Dequeue()
print("The first value added to the queue was", first)

-- myQueue = { 10, 15 }

-- Add more values to the queue
myQueue:Enqueue(20)
myQueue:Enqueue(25)
myQueue:Enqueue(30)

-- myQueue = { 10, 15, 20, 25, 30 }

-- Remove another value from the queue
local second = myQueue:Dequeue()
print("The second value added to the queue was", second)

-- myQueue = { 15, 20, 25, 30 }
```
