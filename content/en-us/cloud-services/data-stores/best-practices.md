---
title: Best practices for data stores
description: Guidelines that help you manage your data and data stores (DataStores) more efficiently.
---

Best practices are guidelines that help you manage your data more efficiently.

### Create fewer data stores

Data stores have similar behavior to tables in databases. When you minimize the number of data stores in an experience and put related data in the same data store, you're able to configure each data store individually and improve the service's efficiency to operate the data.

### Use a single object for related data

To use the maximum [4 MB object size limit](./error-codes-and-limits.md#throughput-limits) more efficiently, fetch all relevant data in one call. `Class.GlobalDataStore:SetAsync()|SetAsync()` updates all data so that all data for the same user is always in sync.

The versioning system versions individual objects instead of the entire data store. This means self-contained objects are consistent when you restore data stores to older versions.

### Use key prefixes to organize your data

Filter keys with a specific [prefix](./versioning-listing-and-caching.md#listing-and-prefixes) when calling `Class.DataStore:ListKeysAsync()|ListKeysAsync()`. For example, you can save keys with a prefix like `/User_1234/profiles/warrior` and `/User_1234/profiles/mage` in experiences that support users with multiple character profiles. You can then use a prefix search with `/User_1234/profiles` to get a list of all profiles belonging to that user.
