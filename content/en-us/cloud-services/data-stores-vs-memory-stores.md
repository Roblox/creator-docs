---
title: Choose between cloud services
description: When to use standard data stores, ordered data stores, memory stores, secrets stores, and configs.
---

Roblox offers several options for data storage. Each storage option has pros and cons and is appropriate for different use cases. This table summarizes the available options and provides the closest points of comparison from standard web services.

| Service | Persistence | Scope | In-experience access | Cloud comparison |
| :--- | :--- | :--- | :--- | :--- |
| **Data stores** | Permanent | Cross-server | Read-write | NoSQL database |
| **Memory stores** | 45 day maximum | Cross-server | Read-write | In-memory cache |
| **Configs** | Permanent | Cross-server | Read-only | App configuration and feature flags |
| **Secrets stores** | Permanent | Cross-server | Read-only | Secrets management |
| **Luau in-memory** | Session duration | Single server | Read-write | Server RAM |

<Alert severity="success">
Within Roblox experiences, cloud services are only accessible from server scripts.
</Alert>

## When to use data stores

`Class.DataStoreService` stores long-term data that needs to last between sessions, such as user progress or inventory items. Data stores are consistent per experience, so every server for every place within an experience can access and change the same data. There are two types of data stores: standard and ordered.

- **Standard data stores** can store data like numbers, strings, and tables that don't need to be ranked or sorted. They store data as key-value pairs; each entry is stored under a key that is unique within its data store and that you can retrieve, update, or delete. For more information, see [Data stores](./data-stores/index.md).

- **Ordered data stores** can only store numbers. Each entry is stored under a key that is unique within its data store and that you can retrieve, update, or delete. You can rank and sort this data numerically and retrieve it in ascending or descending order based on stored numerical values. For more information, see [Ordered data stores](./data-stores/index.md#ordered-data-stores).

<table>
<thead>
  <td width="15%"></td>
  <td width="40%">**Standard data stores**</td>
  <td width="40%">**Ordered data stores**</td>
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
If you want to add granular permission control to your data stores and access them outside of Studio or Roblox servers, use the [Open Cloud APIs for data stores](/cloud/reference/features/storage).
</Alert>

## When to use memory stores

`Class.MemoryStoreService` is a high throughput and low latency service that stores temporary data that needs to be updated or accessed frequently, such as global leaderboards or matchmaking queues. With memory stores, every server for every place within an experience can access and change the same data quickly and frequently. Data in a memory store expires after a certain period of time, up to 45 days.

If you need to quickly read (not write to) a small number of values across all servers, [configs](#when-to-use-configs) are the better choice. Memory stores are not as performant as configs when frequently accessing a single key or partition.

Although memory stores store temporary data, they also support permanent features like a global marketplace. The marketplace is permanent, but the items for sale inside it have an expiration date.

<table>
<thead>
  <td width="15%"></td>
  <td width="80%">**Memory stores**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and tables that don't need to persist for over 45 days.</td>
  </tr>
  <tr>
    <td rowspan="2">**Common use cases**</td>
    <td>Skill-based matchmaking, match states for multiplayer experiences.</td>
  </tr>
  <tr>
    <td>Daily and monthly leaderboards.</td>
  </tr>
</tbody>
</table>

## When to use configs

[Configs](../production/configs.md) let you update in-game variables in real time without restarting servers. They are ideal for feature flags and any in-game values you hope to tune over time or [experiment](../production/experiments.md) with.

- Configs are read-only from within an experience—you modify them on Creator Hub or in Roblox Studio—so they don't serve the same use cases as data stores and memory stores.
- Changes to configs deploy over the course of five minutes; changes to data and memory stores are more instantaneous.

<table>
<thead>
  <td width="15%"></td>
  <td width="80%">**Configs**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and JSON objects.</td>
  </tr>
  <tr>
    <td rowspan="2">**Common use cases**</td>
    <td>Enabling a new dungeon, disabling a limited-time game mode, starting a holiday event.</td>
  </tr>
  <tr>
    <td>Enemy health, weapon damage, item prices, experience multipliers, welcome messages.</td>
  </tr>
</tbody>
</table>

## When to use secrets stores

Use the [secrets store](secrets.md) for your experience to store any API keys, passwords, and access tokens that you use to authenticate with external services. Storing these values in a data store presents unnecessary security risks.

<table>
<thead>
  <td width="15%"></td>
  <td width="80%">**Secrets stores**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Strings.</td>
  </tr>
  <tr>
    <td>**Common use cases**</td>
    <td>API keys, passwords, and access tokens for analytics or music services.</td>
  </tr>
</tbody>
</table>

## When to use in-memory storage in Luau

Use in-memory storage in Luau to store temporary data that needs to be accessed with minimal latency and without the cost of making external service calls. This storage is built into Luau and requires no setup.

<table>
<thead>
  <td width="15%"></td>
  <td width="80%">**In-memory storage in Luau**</td>
</thead>
<tbody>
  <tr>
    <td>**Data type**</td>
    <td>Numbers, strings, booleans, and tables.</td>
  </tr>
  <tr>
    <td rowspan="3">**Common use cases**</td>
    <td>Data that is only relevant to a single server session and doesn't need to be persisted, such as status effects or temporary points that reset when the user leaves the experience.</td>
  </tr>
  <tr>
    <td>Values that change frequently, like counters, timers, state flags, or a health bar.</td>
  </tr>
  <tr>
    <td>Data that drives game logic, which needs to be accessible instantly, like temporary variables or an enemy's current health.</td>
  </tr>
</tbody>
</table>
