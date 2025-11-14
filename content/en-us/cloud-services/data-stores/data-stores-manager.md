---
title: Data Stores Manager
description: The Data Stores Manager helps you monitor your data stores (DataStores) on Creator Hub.
---

With the Data Stores Manager, you can browse and monitor your data stores, their key entries, and their storage usage directly on the Creator Hub.

## Access the Data Stores Manager

<Alert severity="info">
If you're the owner of an experience or the group owner of a group-owned experience, you already have full access to the Data Stores Manager by default.

To give members of your group access to the Data Stores Manager, you can [grant them one of the following permissions](../../projects/groups.md#roles-and-permissions):

- **View Data Stores** lets them view the Data Stores Manager page in the Creator Hub.
- **Edit Data Stores** lets them delete keys.
- **Delete Data Stores** lets them delete data stores.
- **Edit all group experiences** gives them full access to all of the functionality of the Data Stores Manager.
</Alert>

To access the Data Stores Manager:

1. Go to Creations and select an experience.
2. Go to **Configure** ⟩ **Data Stores Manager**.

<img src="./../../assets/data/data-store/Data-Stores-Manager-Page.png" alt="Overview of Data Stores Manager page displaying the Summary section, the Data Stores list, and the Keys list." />

<br/>
<br/>

The **Summary** section of the Data Stores Manager page includes the **Total Size** and the **Storage Limit** of your data stores. Total Size is calculated by adding the number of bytes consumed by all existing keys in your experience, and Storage Limit is calculated based on your experience's lifetime user count. For more information about storage limits, see [Limits](./error-codes-and-limits.md#limits).

If your Total Size exceeds your Storage Limit, your **Est. Monthly Costs** will populate in your Summary and show an estimation of the impact of the usage that has gone over your quota. For tips on how to reduce your storage consumption, see [Best practices](./best-practices.md).

## View data stores and keys

<Alert severity="warning">
  If your experience has more than 100 data stores, the data store size and number of keys won't be available in the Data Stores list.
</Alert>

The **Data Stores** list displays the name, size, and number of keys for all data stores in your experience. You can filter this list by entering a prefix in the search bar.

To further drill down into each specific data store, you can:

- Select a data store from the data store list to display a list of all keys in that data store.
- Enter a prefix in the search bar to filter the list of keys. The prefix must start with the scope name.
- Select a key entry to display that key's value, metadata, version history, status, and when it was last updated.
- Select both a key entry and a version, and click **Compare versions** to compare the current key entry version with the version you selected.
- Select a previous version of a key and click **Revert** to go back to that version. You must have Edit permissions to do this. Reverting to a previous version conditionally updates the list and writes a new version with the value of the version you have previously selected.

<img src="./../../assets/data/data-store/Data-Stores-Manager-Compare-Versions.png" alt="Comparison of two key entries in a data store." />

## Delete data stores and keys

<Alert severity="info">
When you schedule a data store for permanent deletion, that data store immediately becomes inaccessible. Any attempts to read or write to its entries will fail.
</Alert>

To schedule a data store or key for permanent deletion:

1. Go to Creations and select an experience.
2. Go to **Configure** ⟩ **Data Stores Manager**.
3. Click the **Action** menu next to the item you want to delete.
4. Click **Mark for Deletion**.

There is a cooldown period between when you delete a data store or key and when that item is actually deleted. During this cooldown period, you can undo the deletion and restore the item to its normal state.

To restore a data store, click the **Action** menu next to the data store you want to restore and then click **Restore**, or call the [`UndeleteDataStore`](/cloud/reference/DataStore#Cloud_UndeleteDataStore) method from the Open Cloud API.

To restore a key, call the `Class.GlobalDataStore.UpdateAsync|UpdateAsync` method from the Engine API or the [`UpdateDataStoreEntry`](/cloud/reference/DataStoreEntry#Cloud_UpdateDataStoreEntry__Using_Universes_DataStores) method from the Open Cloud API.
