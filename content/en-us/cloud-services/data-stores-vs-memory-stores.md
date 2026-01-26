---
title: Data stores vs memory stores
description: When to use standard data stores, ordered data stores, and memory stores.
---

To store data, you can use [data stores](./data-stores/index.md) with the `Class.DataStoreService` or [memory stores](./memory-stores/index.md) with the `Class.MemoryStoreService`.

Alternatively, you can also use Luau types and variables to [store data in-memory in Luau](#when-to-use-in-memory-storage-in-luau), without using the data or memory store services.

## When to use data stores

The `Class.DataStoreService` stores long-term data that needs to last between sessions, such as user progress or inventory items. Data stores are consistent per experience, so every server for every place within an experience can access and change the same data. There are two types of data stores: standard and ordered.

**Standard data stores** can store data like numbers, strings, and tables that don't need to be ranked or sorted. This data is stored as key-value pairs, where each entry is stored under a key that is unique within its data store and that you can retrieve, update, or delete.

**Ordered data stores** can only store numbers. Each entry is stored under a key that is unique within its data store and that you can retrieve, update, or delete. You can rank and sort this data numerically and retrieve it in ascending or descending order based on stored numerical values. For more information, see [Ordered data stores](./data-stores/index.md#ordered-data-stores).

<table>
<thead>
  <td width="10%"></td>
  <td width="30%">**Standard data stores**</td>
  <td width="30%">**Ordered data stores**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and tables.</td>
    <td>Only numbers.</td>
  </tr>
  <tr>
    <td>**Common use cases**</td>
    <td>User progress, inventory items, and experience settings.</td>
    <td>All-time, persistent ranking systems and leaderboards. Unlike leaderboards in memory stores, this leaderboard data is permanent.</td>
  </tr>
  <tr>
    <td>**Past version backup**</td>
    <td>Automatically manages previous versions of your data for 30 days.</td>
    <td>Does not manage previous versions of your data.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
  Data stores can only be accessed by server-side scripts.
</Alert>

<Alert severity="info">
  If you want to add granular permission control to your data stores and access them outside of Studio or Roblox servers, you can use [Open Cloud APIs for data stores](/cloud/reference/DataStore).
</Alert>

## When to use memory stores

The `Class.MemoryStoreService` is a high throughput and low latency service that stores temporary data that needs to be updated or accessed frequently, such as global leaderboards or matchmaking queues. With memory stores, every server for every place within an experience can access and change the same data quickly and frequently. Data in a memory store expires after a certain period of time, lasting up to 45 days.

Although memory stores store temporary data, they also support permanent features like a global marketplace. The marketplace is permanent, but the items for sale inside it have an expiration date.

<table>
<thead>
  <td width="15%"></td>
  <td width="50%">**Memory stores**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and tables that don't need to persist for over 45 days.</td>
  </tr>
  <tr>
    <td>**Common use cases**</td>
    <td>Skill-based matchmaking, match states for multiplayer experiences, daily and monthly leaderboards.</td>
  </tr>
</tbody>
</table>

## When to use configs

[Configs](../production/configs.md) let you update in-game variables in real time without restarting servers. They are ideal for feature flags and any in-game values you hope to tune over time or [experiment](../production/experiments.md) with.

- Configs are read-only from within an experience—you modify them on Creator Hub or in Roblox Studio—so they don't serve the same use cases as data stores and memory stores.
- Changes to configs deploy over the course of five minutes; they're not instantaneous like data and memory stores.

<table>
<thead>
  <td width="15%"></td>
  <td width="50%">**Configs**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and JSON objects.</td>
  </tr>
  <tr>
    <td rowspan="2">**Common use cases**</td>
    <td>Enabling a new dungeon, disabling a limited-time game mode, starting a holiday event</td>
  </tr>
  <tr>
    <td>Enemy health, weapon damage, item prices, experience multipliers, welcome messages</td>
  </tr>
</tbody>
</table>

## When to use in-memory storage in Luau

You can use in-memory storage in Luau to store temporary data that needs to be accessed with minimal latency and without the cost of making external service calls to data stores or memory stores. There are no extra steps required to set up in-memory storage as it's already built in by default in Lua.

<table>
<thead>
  <td width="15%"></td>
  <td width="30%">**In-memory storage in Luau**</td>
  <td width="30%"></td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and tables.</td>
    <td></td>
  </tr>
  <tr>
    <td>**Common use cases**</td>
    <td>Data that is only relevant to a single server session and that you can update instantly without worrying about persistence.</td>
    <td>Example: Active buffs, temporary points, and ongoing quest progress that resets when the user leaves the experience.</td>
  </tr>
  <tr>
    <td></td>
    <td>Values that change frequently, like counters, timers, or state flags.</td>
    <td>Example: A user's health bar that updates on each hit.</td>
  </tr>
  <tr>
    <td></td>
    <td>Avoiding rate limit restrictions for high-frequency operations in large active experiences.</td>
    <td>Example: An experience with dozens of users interacting with the same object.</td>
  </tr>
  <tr>
    <td></td>
    <td>Data that drives game logic, like temporary variables or power-up states where quick access with no delay is essential.</td>
    <td>Example: A user's current attack state or an enemy's current health, which needs to be accessible instantly and without the latency involved in calling external services like data or memory stores.</td>
  </tr>
  <tr>
    <td></td>
    <td>Multiplayer interactions that only matter within a single server.</td>
    <td>Example: A shared objective in a co-op mission experience.</td>
  </tr>
</tbody>
</table>
