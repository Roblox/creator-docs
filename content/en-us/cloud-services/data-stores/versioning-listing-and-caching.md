---
title: Data store versioning, listing, and caching
description: How to manage data stores (DataStores) through versioning, listing, and caching.
---

Manage your data using versioning, listing, and caching.

## Versioning

Versioning happens when you [set](./index.md#create-data), [update](./index.md#update-data), and [increment](./index.md#increment-data) data. The functions `Class.GlobalDataStore:SetAsync()|SetAsync()`, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, and `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` create versioned backups of your data using the first write to each key in each UTC hour. Successive writes to a key in the same UTC hour permanently overwrite the previous data.

Versioned backups expire 30 days after a new write overwrites them. The latest version never expires.

The following functions perform versioning operations:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`
    </td>
    <td>
      Lists all versions for a key by returning a `Class.DataStoreVersionPages` instance that you can use to enumerate all version numbers. You can filter versions using a time range.
    </td>
  </tr>
  <tr>
    <td>
      `Class.DataStore:GetVersionAsync()|GetVersionAsync()`
    </td>
    <td>
      Retrieves a specific version of a key using the key's version number.
    </td>
  </tr>
  <tr>
    <td>
      `Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()`
    </td>
    <td>
      Deletes a specific version of a key.

      This function also creates a tombstone version while retaining the previous version. For example, if you call `RemoveAsync("User_1234")` and then try to call `GetAsync("User_1234")`, you get `nil` back. However, you can still use `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()` and `Class.DataStore:GetVersionAsync()|GetVersionAsync()` to retrieve older versions of the data.
    </td>

  </tr>
</tbody>
</table>

You can use versioning to handle user requests. If a user reports that a problem occurred at 2020-10-09T01:42, you can revert data to a previous version using the following example:

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

local DATA_STORE_KEY = "User_1234"

local maxDate = DateTime.fromUniversalTime(2020, 10, 09, 01, 42)

-- Gets the version closest to the given time
local listSuccess, pages = pcall(function()
    return experienceStore:ListVersionsAsync(DATA_STORE_KEY, Enum.SortDirection.Descending, nil, maxDate.UnixTimestampMillis)
end)
if listSuccess then
    local items = pages:GetCurrentPage()
    if #items > 0 then
        -- Reads the closest version
        local closestEntry = items[1]
        local success, value, info = pcall(function()
            return experienceStore:GetVersionAsync(DATA_STORE_KEY, closestEntry.Version)
        end)
        -- Restores current value by overwriting it with the closest version
        if success then
            local setOptions = Instance.new("DataStoreSetOptions")
            setOptions:SetMetadata(info:GetMetadata())
            experienceStore:SetAsync(DATA_STORE_KEY, value, nil, setOptions)
        end
    else
        -- No entries found
    end
end
```

### Snapshots

The [Snapshot Data Stores Open Cloud API](/cloud/reference/DataStore#Cloud_SnapshotDataStores) lets you take a snapshot of all data stores in an experience once a day. Before you publish any experience update that changes your data storage logic, make sure to take a snapshot. Taking a snapshot guarantees that you have the most recent data available from the previous version of the experience.

For example, without a snapshot, if you publish an update at 3:30 UTC that causes data corruption, the corrupted data overwrites any data written between 3:00-3:30 UTC. If you take a snapshot at 3:29 UTC, though, the corrupted data doesn't overwrite anything written before 3:29 UTC, and the latest data for all keys written between 3:00-3:29 UTC is preserved.

## Listing and prefixes

Data stores let you list by prefix. For example, listing by the first **n** characters of a name, like "d" , "do", or "dog" for any key or data store with a prefix of "dog".

You can specify a prefix when listing all data stores or keys, and get back only objects that match that prefix. Both `Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` and `Class.DataStore:ListKeysAsync()|ListKeysAsync()` functions return a `Class.DataStoreListingPages` object that you can use to enumerate the list.

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()`</td>
    <td>Lists all data stores.</td>
  </tr>
  <tr>
    <td>`Class.DataStore:ListKeysAsync()|ListKeysAsync()`</td>
    <td>Lists all keys in a data store.</td>
  </tr>
</tbody>
</table>

### Scopes

<Alert severity="warning">
  For new experiences, use [listing and prefixes](#listing-and-prefixes) to organize keys in your data store instead of the legacy scopes feature. For existing experiences that use scopes, continue using them.
</Alert>

You can organize keys in a data store further by setting a unique string as a scope for the second parameter of `Class.DataStoreService:GetDataStore()|GetDataStore()`. The default scope (if no scope is given) is `global`. The scope is automatically prepended to the beginning of all keys in all operations done on the data store.

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Scope</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`houses/User_1234`</td>
    <td>houses</td>
  </tr>
  <tr>
    <td>`pets/User_1234`</td>
    <td>pets</td>
  </tr>
  <tr>
    <td>`inventory/User_1234`</td>
    <td>inventory</td>
  </tr>
</tbody>
</table>

The combination of data store name, scope, and key uniquely identifies a key. All three values are required to identify a key with a scope. For example, you can read a `global`-scoped key named `User_1234` as:

```lua
local DataStoreService = game:GetService("DataStoreService")
local inventoryStore = DataStoreService:GetDataStore("PlayerInventory")
local success, currentGold = pcall(function()
  return inventoryStore:GetAsync("User_1234")
end)
```

If the key `User_1234` has a scope of `gold`, though, you can only read it as:

```lua
local DataStoreService = game:GetService("DataStoreService")
local inventoryStore = DataStoreService:GetDataStore("PlayerInventory", "gold")
local success, currentGold = pcall(function()
  return inventoryStore:GetAsync("User_1234")
end)
```

### AllScopes property

`Class.DataStoreOptions` contains an `Class.DataStoreOptions.AllScopes|AllScopes` property that lets you return keys from all [scopes](#scopes) in a list. You can then use the `Class.DataStoreKey.KeyName|KeyName` property of a list item for common data store operations like [reading data](./index.md#reading-data) with `Class.GlobalDataStore:GetAsync()|GetAsync()` and [removing data](./index.md#removing-data) with `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()`.

When you use the `AllScopes` property, the second parameter of `Class.DataStoreService:GetDataStore()|GetDataStore()` must be an empty string (`""`).

```lua
local DataStoreService = game:GetService("DataStoreService")

local options = Instance.new("DataStoreOptions")
options.AllScopes = true

local ds = DataStoreService:GetDataStore("DS1", "", options)
```

<Alert severity="info">
  When you use the `Class.DataStoreOptions.AllScopes|AllScopes` property, `Class.DataStore:ListKeysAsync()|ListKeysAsync()` returns every key with their scope as the prefix argument, such as `global/player_data_1234` or `houses/house3`. Remember that the default scope is `global`.
</Alert>

If you enable the `Class.DataStoreOptions.AllScopes|AllScopes` property and create a new key in the data store, you must always specify a scope for that key in the format of scope/keyname. If you don't, the APIs throw an error. For example, `gold/player_34545` is acceptable with gold as the scope, but `player_34545` leads to an error.

<table>
<tbody>
  <tr>
    <td>`global/K1`</td>
    <td>`house/K1`</td>
  </tr>
  <tr>
    <td>`global/L2`</td>
    <td>`house/L2`</td>
  </tr>
  <tr>
    <td>`global/M3`</td>
    <td>`house/M3`</td>
  </tr>
</tbody>
</table>

## Caching

Use caching to temporarily store data from data stores to improve performance and reduce the number of requests made to the server. For example, an experience can cache a copy of its data so that it can access that data quickly without having to make another call to the data store.

Caching applies to modifications you make to data store keys using:

- `Class.GlobalDataStore:GetAsync()|GetAsync()` to [read data](./index.md#reading-data).
- `Class.GlobalDataStore:SetAsync()|SetAsync()` to [create data](./index.md#creating-data).
- `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` to [update data](./index.md#updating-data).
- `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` to [increment data](./index.md#incrementing-data).
- `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` to [remove data](./index.md#removing-data).

`Class.DataStore:GetVersionAsync()|GetVersionAsync()`, `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`, `Class.DataStore:ListKeysAsync()|ListKeysAsync()`, and `Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` don't implement caching and always fetch the latest data from the service backend.

By default, the engine uses `Class.GlobalDataStore:GetAsync()|GetAsync()` to store values you retrieve from the backend in a local cache for four seconds. Also by default, `Class.GlobalDataStore:GetAsync()|GetAsync()` requests for cached keys return the cached value instead of continuing to the backend. Your `Class.GlobalDataStore:GetAsync()|GetAsync()` requests that return a cached value don't count towards your [server limits](../../cloud-services/data-stores/error-codes-and-limits.md#server-limits) and [throughput limits](../../cloud-services/data-stores/error-codes-and-limits.md#throughput-limits).

All `Class.GlobalDataStore:GetAsync()|GetAsync()` calls that retrieve a value not being cached from the backend update the cache immediately and restart the four second timer.

<Alert severity="warning">
  Caching is local to a particular data store instance, so different data stores can have their caches in different states. For example, if you access a key twice through two different data store instances, like getting one data store with a specified scope and another through having the `Class.DataStoreOptions.AllScopes|AllScopes` property enabled, each data store instance has its own cache. If you change the value of that key in one data store instance and not the other, you end up with inconsistent data.
</Alert>

### Disable caching

To disable caching and opt out of using the cache to retrieve the most up-to-date value from the servers, add the `Class.DataStoreGetOptions` parameter to your `Class.GlobalDataStore:GetAsync()|GetAsync()` call and set the `Class.DataStoreGetOptions.UseCache|UseCache` property to `false` to make your request ignore any keys in the cache.

Disabling caching is useful if you have multiple servers writing to a key with high frequency and need to get the latest value from servers. However, it can cause you to consume more of your [data stores limits and quotas](../../cloud-services/data-stores/error-codes-and-limits.md#limits), since `Class.GlobalDataStore:GetAsync()|GetAsync()` requests bypassing caching always count towards your throughput and server limits.

## Serialization

The `Class.DataStoreService` stores data in JSON format. When you save Luau data in Studio, Roblox uses a process called serialization to convert that data into JSON to save it in data stores. Roblox then converts your data back to Luau and returns it to you in another process called deserialization.

Serialization and deserialization support the following Luau data types:

- [Nil](../../luau/nil.md)
- [Booleans](../../luau/booleans.md)
- [Numbers](../../luau/numbers.md)
  - You should not store the special numeric values `inf`, `-inf`, and `nan`, because these values don't conform to JSON standards. You can't access keys that contain these values with Open Cloud.
- [Strings](../../luau/strings.md)
- [Tables](../../luau/tables.md)
  - Tables must only contain other supported data types
  - Numeric keys are translated into strings if the length of the table is 0
- [Buffers](/reference/engine/libraries/buffer)

If you try to store a data type that serialization doesn't support, you either:

- Fail in storing that data type and get an error message.
- Succeed in storing that data type as `nil`.

To debug why your data type is being stored as `nil`, you can use the `Class.HttpService.JSONEncode|JSONEncode` function. When you pass your Luau data type into this function, you receive it back in the format Roblox would have stored it with data stores, which lets you preview and investigate the returned data.

<Alert severity="info">
  Serialization doesn't happen when you use the [DataStore Open Cloud API](/cloud/reference/DataStore) because that data is already sent to Roblox in JSON format and doesn't need to be converted.
</Alert>
