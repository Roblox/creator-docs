---
title: Best practices for data stores
description: Guidelines that help you manage your data and data stores (DataStores) more efficiently.
---

Best practices are guidelines that help you manage your data more efficiently.

## General best practices

### Create fewer data stores

Data stores have similar behavior to tables in databases. When you minimize the number of data stores in an experience and put related data in the same data store, you're able to configure each data store individually and improve the service's efficiency to operate the data.

### Use a single object for related data

To use the maximum [4 MB object size limit](./error-codes-and-limits.md#throughput-limits) more efficiently, fetch all relevant data in one call. `Class.GlobalDataStore:SetAsync()|SetAsync()` updates all data so that all data for the same user is always in sync.

The versioning system versions individual objects instead of the entire data store. This means self-contained objects are consistent when you restore data stores to older versions.

### Use key prefixes to organize your data

Filter keys with a specific [prefix](./versioning-listing-and-caching.md#listing-and-prefixes) when calling `Class.DataStore:ListKeysAsync()|ListKeysAsync()`. For example, you can save keys with a prefix like `/User_1234/profiles/warrior` and `/User_1234/profiles/mage` in experiences that support users with multiple character profiles. You can then use a prefix search with `/User_1234/profiles` to get a list of all profiles belonging to that user.

## Optimization best practices

Data stores have storage limits that apply per experience. When your experience approaches or exceeds its quota, you should take action to reduce usage and avoid potential additional costs.

### Monitor storage usage

Use these tools for data store observability:

- **Data Stores Dashboard**, which provides you with a visual overview of your storage usage over time. Use this dashboard to monitor how your storage scales and to identify periods of unexpected growth in usage.
- **Data Stores Manager**, which gives you a direct view into your experience's stored data. The Manager includes key metrics like your current storage usage and the total keys you have stored across all of your data stores. If your experience exceeds its quota, the Manager displays an alert and your new estimated monthly cost.

  If your experience has more than 100 data stores, the Manager might not display their detailed metrics. In this case, consider using programmatic analysis through Open Cloud or batch operations.
- **Notifications**, which notify you when your experience approaches or exceeds storage limits. Notifications include guidance and links to dashboards where you can then review and reduce your usage.

### Resolve over-quota usage

If your experience exceeds your storage limits, you can:

- **Delete unused data stores.** If you're testing or have temporary stores, deleting them regularly helps maintain healthy storage usage. When you delete a data store, it can take Roblox up to 30 days to process your request.
- **Delete individual keys.** This is useful when you need to remove temporary items or a certain player's data.
- **Use the Batch Processor.** In cases when deleting data manually isn't efficient, you can use the [Batch Processor](https://github.com/Roblox/data-stores-batch-processor-cli) or the Open Cloud Data Stores API to delete data in bulk.

### Use data store versions instead of new keys

When saving updates or new versions of player or configuration data, you can use the data stores versioning system instead of creating a new key for each version. Versioning allows you to roll back or inspect previous saves without increasing your total key count or storage footprint.

### Use memory stores for temporary data

Use [memory stores](../memory-stores/index.md) instead of data stores for caches or ephemeral data. The data in memory stores automatically expires after 45 days, which reduces your long-term storage growth.

### Clean up your data after testing

After you're done testing, delete test data stores through the Data Stores Manager. Avoid creating new scopes or entire new data stores just for test data.

### Store player data by key

Instead of storing player data by data store, store it by key. Deleting a key is faster than deleting a data store.

### Remove data after events

After seasonal events or temporary features, delete unused data through the Batch Processor or Open Cloud APIs.

### Review usage regularly

Make sure to review your usage regularly and detect anomalies early with the Data Stores Dashboard.
