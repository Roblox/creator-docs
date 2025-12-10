---
title: Partitions and data distribution
description: Explains the concept of a partition and per-partition limits.
---

With the release of the `Class.MemoryStoreHashMap` data structure, Roblox removed all existing limits for individual data structures and replaced them with a single, global "per-partition" throttling limit. The exact limit fluctuates based on internal values and how the automatic partitioning process distributes your data, but generally allows for much higher usage before throttling, particularly for hash maps. This new limit enables flexible usage of memory stores across all data structures.

## Partitions

The MemoryStores API stores data on _partitions_, which are just subdivisions of storage. Whenever you write an item to a memory store, that item is stored on exactly one partition. Partitions are fully managed by the MemoryStores API; you do not need to manage them yourself.

## Partition assignment

Partition storage is different according to the data structure an item is being stored on. For sorted maps and queues, each data structure is assigned a single partition.

For example, consider a carnival game with a sorted map called `PlayerScores` and a queue called `PlayerLine` of players waiting to play the game:

<img src="../../assets/data/memory-store/Per-Partition-Limits-1.png" width="100%" />

Unlike sorted maps and queues, hash maps are allotted multiple partitions, and data is automatically distributed across these partitions. If you were to add a hash map called `Prizes`, the partitions might look like this:

<img src="../../assets/data/memory-store/Per-Partition-Limits-3.png" width="100%" />

Note how the hash map exists on all partitions, and each partition has some subset of items.

## Limits

Having a per-partition limit allows for higher throughput to all data structures. It also favors hash maps, because they're distributed across all partitions.

For example, consider an example per-partition limit of 50,000 requests per minute (RPM):

- In the very best case, a sorted map and a queue are limited to 50,000 RPM, because each one resides on a single partition.
- Requests to hash maps are spread across the item keys, which are themselves spread across partitions, so hash maps can have a much higher effective limit before throttling, many times that of the other data structures assuming that requests are spread across many item keys.

<img src="../../assets/data/memory-store/Per-Partition-Limits-4.png" width="100%" />

For this reason, if you don't need sorting or "first in, first out" functionality, hash maps are usually the best choice for a memory store data structure. For more information, see the [best practices](../../cloud-services/memory-stores/best-practices.md).
