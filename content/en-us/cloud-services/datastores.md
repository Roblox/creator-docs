---
title: Data Stores
description: Explains how to implement data stores to store persistent data.
---

`Class.DataStoreService` lets you store **data that needs to persist between sessions**, such as items in a player's inventory or skill points. Data stores are consistent **per experience**, so any place in an experience can access and change the same data, including places on different servers.

If you want to add granular permission control to your data stores and access them outside of Studio or Roblox servers, you can use [Open Cloud APIs for data stores](../reference/cloud/datastores-api/v1.json).

## Enabling Studio Access

By default, experiences tested in Studio cannot access data stores, so you must first enable them. Accessing data stores in Studio can be dangerous for live experiences because Studio accesses the same data stores as the client application. To avoid overwriting production data, you should not enable this setting for live experiences — instead, enable it for a separate test version of the experience.

To enable Studio access in a [published](../production/publishing/publishing-experiences-and-places.md) experience:

1. In the **Home** tab of the menu bar, navigate to the **Settings** section and click **Game Settings**. The **Game Settings** menu displays.
2. In the left-hand navigation of the **Game Settings** menu, click **Security**.
3. Enable the **Enable Studio Access to API Services** toggle.
4. Click the **Save** button.

## Accessing a Data Store

Once you include `Class.DataStoreService` in a script, access a data store by **name** using the `Class.DataStoreService:GetDataStore()|GetDataStore()` function. For example:

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")
```

<Alert severity="warning">
  The server can only access data stores through `Class.Script|Scripts`. Attempting client-side access in a `Class.LocalScript` causes an error.
</Alert>

### Scopes

<Alert severity="warning">
  For new experiences, it is not recommended to use the legacy scopes feature. Instead, use [listing and prefixes](#listing-and-prefixes) to organize keys in your data store. If you have an existing experience that uses scopes, you can continue using them.
</Alert>

Every key in a data store has a default "global" scope, but you can further organize keys by setting a unique string as a scope for the second parameter of `Class.DataStoreService:GetDataStore()|GetDataStore()`. This automatically prepends the scope to all keys in all operations done on the data store.

The scope categorizes your data with a string and a separator with "/", such as:

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Scope</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><InlineCode>houses/User_1234</InlineCode></td>
    <td>houses</td>
  </tr>
  <tr>
    <td><InlineCode>pets/User_1234</InlineCode></td>
    <td>pets</td>
  </tr>
  <tr>
    <td><InlineCode>inventory/User_1234</InlineCode></td>
    <td>inventory</td>
  </tr>
</tbody>
</table>

The combination of **datastore name + scope + key** uniquely identifies a key and all three values are required to identify a key if it has a scope. For example, a global key named `User_1234` can be read as follows:

```lua
local DataStoreService = game:GetService("DataStoreService")
local inventoryStore = DataStoreService:GetDataStore("PlayerInventory")
local success, currentGold = pcall(function()
	return inventoryStore:GetAsync("User_1234")
end)
```

By contrast, if key `User_1234` has a scope of **gold**, you can only read it as:

```lua
local DataStoreService = game:GetService("DataStoreService")
local inventoryStore = DataStoreService:GetDataStore("PlayerInventory", "gold")
local success, currentGold = pcall(function()
	return inventoryStore:GetAsync("User_1234")
end)
```

## Managing a Data Store

### Setting Data

A data store is essentially a dictionary, similar to a Lua table. A unique **key** indexes each value in the data store, such as a player's unique `Class.Player.UserId` or a named string for a game promo.

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Value</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><InlineCode>31250608</InlineCode></td>
    <td>50</td>
  </tr>
  <tr>
    <td><InlineCode>351675979</InlineCode></td>
    <td>20</td>
  </tr>
  <tr>
    <td><InlineCode>505306092</InlineCode></td>
    <td>78000</td>
  </tr>
  <tr>
    <td colspan="2">Player Data</td>
  </tr>
</tbody>
</table>

<table>
<thead>
  <tr>
    <th>Key</th>
    <th>Value</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><InlineCode>ActiveSpecialEvent</InlineCode></td>
    <td>SummerParty2</td>
  </tr>
  <tr>
    <td><InlineCode>ActivePromoCode</InlineCode></td>
    <td>BONUS123</td>
  </tr>
  <tr>
    <td><InlineCode>CanAccessPartyPlace</InlineCode></td>
    <td>true</td>
  </tr>
  <tr>
    <td colspan="2">Promo Data</td>
  </tr>
</tbody>
</table>

To create a new entry, call `Class.GlobalDataStore:SetAsync()|SetAsync()` with the **key name** and a **value**.

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

local success, errorMessage = pcall(function()
	experienceStore:SetAsync("User_1234", 50)
end)
if not success then
	print(errorMessage)
end
```

<Alert severity="warning">
  Functions like `Class.GlobalDataStore:SetAsync()|SetAsync()` that access a data store's contents are network calls that may occasionally fail. As shown above, it's recommended that these calls be wrapped in `Global.LuaGlobals.pcall()` to catch and handle errors.
</Alert>

### Reading Data

The `Class.GlobalDataStore:GetAsync()|GetAsync()` function reads the value of a data store entry. It requires just the key name of the entry.

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

local success, currentExperience = pcall(function()
	return experienceStore:GetAsync("User_1234")
end)
if success then
	print(currentExperience)
end
```

<Alert severity="warning">
  The values you retrieve using `Class.GlobalDataStore:GetAsync()|GetAsync()` sometimes can be out of sync with the backend due to the [caching](#caching) behavior. To opt out of caching, see [Disabling caching](#disabling-caching).
</Alert>

### Incrementing Data

`Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` changes a **numerical value** in a data store. This function requires the key name of the entry and a number indicating how much to change the value.

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

local success, newExperience = pcall(function()
	return experienceStore:IncrementAsync("Player_1234", 1)
end)
if success then
	print(newExperience)
end
```

### Updating Data

`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` changes any stored value in a data store. This function requires the key name of the entry plus a **callback function** which defines how the entry should be updated. This callback takes the current value and returns the new value, based on whatever logic you define. If the callback returns `nil`, the write operation is cancelled and the value remains unchanged.

<Alert severity="warning">
  The callback function passed into `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` is <b>not</b> permitted to yield, so it cannot contain any yielding function like `Library.task.wait()`.
</Alert>

```lua
local DataStoreService = game:GetService("DataStoreService")

local nicknameStore = DataStoreService:GetDataStore("Nicknames")

local function makeNameUpper(currentName)
	local nameUpper = string.upper(currentName)
	return nameUpper
end

local success, updatedName = pcall(function()
	return nicknameStore:UpdateAsync("User_1234", makeNameUpper)
end)
if success then
	print("Uppercase Name:", updatedName)
end
```

#### Set vs. Update

`Class.GlobalDataStore:SetAsync()|SetAsync()` is best for a quick update of a specific key, and it only counts against the write limit. However, it may cause data inconsistency if two servers attempt to set the same key at the same time.

`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` is safer for handling multi-server attempts because it reads the current key value from the server that last updated it before making any changes. However, it's somewhat slower because it reads before it writes, and it also counts against both the read and write limit.

### Removing Data

`Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` removes an entry and returns the value that associates with the key.

```lua
local DataStoreService = game:GetService("DataStoreService")

local nicknameStore = DataStoreService:GetDataStore("Nicknames")

local success, removedValue = pcall(function()
	return nicknameStore:RemoveAsync("User_1234")
end)
if success then
	print(removedValue)
end
```

## Ordered Data Stores

By default, data stores do not sort their content, but sometimes it's necessary to get data in an ordered fashion, such as persistent leaderboard stats. You can achieve this by calling `Class.DataStoreService:GetOrderedDataStore()|GetOrderedDataStore()` instead of `Class.DataStoreService:GetDataStore()|GetDataStore()`.

```lua
local DataStoreService = game:GetService("DataStoreService")

local characterAgeStore = DataStoreService:GetOrderedDataStore("CharacterAges")
```

Ordered data stores support the same basic functions as default data stores, plus the unique `Class.OrderedDataStore:GetSortedAsync()` function. This retrieves **multiple sorted keys** based on a specific sorting order, page size, and minimum/maximum values.

The following example sorts character data into pages with three entries each in descending order, then loops through the pages and outputs each character's name/age.

```lua
local DataStoreService = game:GetService("DataStoreService")

local characterAgeStore = DataStoreService:GetOrderedDataStore("CharacterAges")

-- Populate ordered data store
local characters = {
	Mars = 19,
	Janus = 20,
	Diana = 18,
	Venus = 25,
	Neptune = 62
}
for char, age in characters do
	local success, errorMessage = pcall(function()
		characterAgeStore:SetAsync(char, age)
	end)
	if not success then
		print(errorMessage)
	end
end

-- Sort data by descending order into pages of three entries each
local success, pages = pcall(function()
	return characterAgeStore:GetSortedAsync(false, 3)
end)
if success then
	while true do
		-- Get the current (first) page
		local entries = pages:GetCurrentPage()
		-- Iterate through all key-value pairs on page
		for _, entry in entries do
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

<Alert severity="info">
When iterating through `Class.DataStoreService:GetOrderedDataStore()` using `Class.Pages:AdvanceToNextPageAsync()`, the limit for requests is the same as the maximum page size you set for an ordered data store. `Class.Pages:AdvanceToNextPageAsync()` always has the same limit as the class that originally requires it.
</Alert>

## Metadata

There are two types of metadata associated with keys:

- **Service-defined** - Every object has default read-only metadata such as the most recent update time and creation time.
- **User-defined** - Through the `Class.DataStoreSetOptions` object and its `Class.DataStoreSetOptions:SetMetadata()|SetMetadata()` function, you can include custom metadata for tagging and categorization.

Metadata is managed by expanding the `Class.GlobalDataStore:SetAsync()|SetAsync()`, `Class.GlobalDataStore:GetAsync()|GetAsync()`, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` functions.

- `Class.GlobalDataStore:SetAsync()|SetAsync()` accepts optional third and fourth arguments:

  - Table of `Class.Player.UserId|UserIds`, highly recommended to assist with content copyright and intellectual property tracking/removal.
  - A `Class.DataStoreSetOptions` object on which you can define custom metadata using its `Class.DataStoreSetOptions:SetMetadata()|SetMetadata()` function.

    ```lua
    local DataStoreService = game:GetService("DataStoreService")

    local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

    local setOptions = Instance.new("DataStoreSetOptions")
    setOptions:SetMetadata({["ExperienceElement"] = "Fire"})

    local success, errorMessage = pcall(function()
        experienceStore:SetAsync("User_1234", 50, {1234}, setOptions)
    end)
    if not success then
        print(errorMessage)
    end
    ```

- `Class.GlobalDataStore:GetAsync()|GetAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` return a second value (`Class.DataStoreKeyInfo` object) that contains both service-defined properties and functions to fetch user-defined metadata:

  - `Class.DataStoreKeyInfo:GetUserIds()` — Fetches the table of `Class.Player.UserId|UserIds` that was passed to SetAsync().
  - `Class.DataStoreKeyInfo:GetMetadata()` — Fetches user-defined metadata that was passed to `Class.GlobalDataStore:SetAsync()|SetAsync()` through `Class.DataStoreSetOptions:SetMetadata()|SetMetadata()`.
  - `Class.DataStoreKeyInfo.Version` — Version of the key.
  - `Class.DataStoreKeyInfo.CreatedTime` — Time the key was created, formatted as the number of milliseconds since epoch.
  - `Class.DataStoreKeyInfo.UpdatedTime` — Last time the key was updated, formatted as the number of milliseconds since epoch.

  ```lua
  local DataStoreService = game:GetService("DataStoreService")

  local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

  local success, currentExperience, keyInfo = pcall(function()
      return experienceStore:GetAsync("User_1234")
  end)
  if success then
      print(currentExperience)
      print(keyInfo.Version)
      print(keyInfo.CreatedTime)
      print(keyInfo.UpdatedTime)
      print(keyInfo:GetUserIds())
      print(keyInfo:GetMetadata())
  end
  ```

- The **callback function** of `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` takes an additional parameter (`Class.DataStoreKeyInfo` object) that describes the current key state. It returns the modified value, the key's associated `Class.Player.UserId|UserIds`, and the key's metadata.

  ```lua
  local DataStoreService = game:GetService("DataStoreService")

  local nicknameStore = DataStoreService:GetDataStore("Nicknames")

  local function makeNameUpper(currentName, keyInfo)
      local nameUpper = string.upper(currentName)
      local userIDs = keyInfo:GetUserIds()
      local metadata = keyInfo:GetMetadata()
      return nameUpper, userIDs, metadata
  end

  local success, updatedName, keyInfo = pcall(function()
      return nicknameStore:UpdateAsync("User_1234", makeNameUpper)
  end)
  if success then
      print(updatedName)
      print(keyInfo.Version)
      print(keyInfo.CreatedTime)
      print(keyInfo.UpdatedTime)
      print(keyInfo:GetUserIds())
      print(keyInfo:GetMetadata())
  end
  ```

<Alert severity="error">
  You must always update metadata definitions with a value, even if there are no changes to the current value, otherwise, you lose the current value. This applies to `Class.GlobalDataStore:SetAsync()|SetAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`.
</Alert>

User-defined metadata has the following limits:

- Key length: up to 50 characters.
- Value length: up to 250 characters.
- No limit for the total number of key-value pairs but the total size cannot exceed 300 characters.

## Versioning

With versioning, `Class.GlobalDataStore:SetAsync()|SetAsync()` and `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` create new versions instead of overwriting existing data, and `Class.GlobalDataStore:GetAsync()|GetAsync()` reads the latest version. `Class.DataStoreService` periodically checks the timestamps of each version and removes versions older than 30 days, but retains the latest version indefinitely.

There are three new APIs for versioning operations:

<table>
<thead>
  <tr>
    <th>Function</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`</td>
    <td>Lists all versions for a key by returning a `Class.DataStoreVersionPages` instance that you can use to enumerate all version numbers. You can filter versions based on a time range as shown in the code example below.</td>
  </tr>
  <tr>
    <td>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`</td>
    <td>Retrieves a specific version of a key using its version number.</td>
  </tr>
  <tr>
    <td>`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()`</td>
    <td>Deletes a specific version of a key.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()` also creates a "tombstone" version while also retaining the previous version. For example, if you call <InlineCode>RemoveAsync("User_1234")</InlineCode>, any attempt to call <InlineCode>GetAsync("User_1234")</InlineCode> returns <InlineCode>nil</InlineCode>. However, you can still use `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()` and `Class.DataStore:GetVersionAsync()|GetVersionAsync()` to retrieve the older version, assuming it has not expired.
</Alert>

Versioning is convenient for user support. For example, if a user reports that a problem occurred at **2020-10-09T01:42**, you can revert to a previous version using the code below.

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")

local DATA_STORE_KEY = "User_1234"

local maxDate = DateTime.fromUniversalTime(2020, 10, 09, 01, 42)

-- Get the version closest to the given time
local listSuccess, pages = pcall(function()
    return experienceStore:ListVersionsAsync(DATA_STORE_KEY, Enum.SortDirection.Descending, nil, maxDate.UnixTimestampMillis)
end)
if listSuccess then
    local items = pages:GetCurrentPage()
    if table.getn(items) > 0 then
        -- Read the closest version
        local closestEntry = items[1]
        local success, value, info = pcall(function()
            return experienceStore:GetVersionAsync(DATA_STORE_KEY, closestEntry.Version)
        end)
        -- Restore current value by overwriting with the closest version
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

## Listing and Prefixes

Data stores allow for **listing by prefix** (the first **n** characters of a name, such as "d", "do", or "dog" for any key or data store with a prefix of "dog").

You can specify a prefix when listing all data stores or keys, and only objects matching that prefix will be returned. Both functions return a `Class.DataStoreListingPages` object that you can use to enumerate the list.

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

### AllScopes Property

`Class.DataStoreOptions` contains an `Class.DataStoreOptions.AllScopes|AllScopes` property that allows you to return keys from all [scopes](#scopes) in a convenient list. You can then use a list item's `Class.DataStoreKey.KeyName|KeyName` property for common data store operations like `Class.GlobalDataStore:GetAsync()|GetAsync()` and `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()`. **When you use this property, the second parameter of `Class.DataStoreService:GetDataStore()|GetDataStore()` must be an empty string (`""`)**.

```lua
local DataStoreService = game:GetService("DataStoreService")

local options = Instance.new("DataStoreOptions")
options.AllScopes = true

local ds = DataStoreService:GetDataStore("DS1", "", options)
```

<Alert severity="info">
  When you use the `Class.DataStoreOptions.AllScopes|AllScopes` property, `Class.DataStore:ListKeysAsync()|ListKeysAsync()` returns every key with their scope as the prefix argument, such as <InlineCode>global/player_data_1234</InlineCode> or <InlineCode>houses/house3</InlineCode>. The default scope is <InlineCode>global</InlineCode>.
</Alert>

If you enable the `Class.DataStoreOptions.AllScopes|AllScopes` property and create a new key in the data store, you must always specify a scope for that key in the format of scope/keyname, otherwise the APIs throw an error. For example, `gold/player_34545` is acceptable with gold as the scope, but `player_34545` leads to an error.

Consider the following data set:

<table>
<tbody>
  <tr>
    <td><InlineCode>global/K1</InlineCode></td>
    <td><InlineCode>house/K1</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>global/L2</InlineCode></td>
    <td><InlineCode>house/L2</InlineCode></td>
  </tr>
  <tr>
    <td><InlineCode>global/M3</InlineCode></td>
    <td><InlineCode>house/M3</InlineCode></td>
  </tr>
</tbody>
</table>

## Error Codes

Requests to data stores may occasionally fail due to poor connectivity or other issues. Wrapping data store functions in `Global.LuaGlobals.pcall()` can handle any errors and return a message with an error code.

### Error Code Reference

<table>
<thead>
  <tr>
    <th>Error Code</th>
    <th>Error Name</th>
    <th>Error Message</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>101</td>
    <td>KeyNameEmpty</td>
    <td>Key name can't be empty.</td>
    <td>Check if the key input into the data store function is an empty string.</td>
  </tr>
  <tr>
    <td>102</td>
    <td>KeyNameLimit</td>
    <td>Key name exceeds the 50 character limit.</td>
    <td>Check if the key input into the data store function exceeds a length of 50.</td>
  </tr>
  <tr>
    <td>103</td>
    <td>ValueNotAllowed</td>
    <td><b>X</b> is not allowed in DataStore.</td>
    <td>An invalid value of type <b>X</b> was returned by a bad update function.</td>
  </tr>
  <tr>
    <td>104</td>
    <td>CantStoreValue</td>
    <td>Cannot store <b>X</b> in DataStore.</td>
    <td>A value of type <b>X</b> returned by the update function did not serialize.</td>
  </tr>
  <tr>
    <td>105</td>
    <td>ValueTooLarge</td>
    <td>Serialized value exceeds <b>X</b> limit.</td>
    <td>If you're setting a value with `Class.GlobalDataStore:SetAsync()|SetAsync()` or `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, the serialized length of the value cannot exceed the size <b>X</b>. The serialized length of the data can be checked with `Class.HttpService:JSONEncode()|JSONEncode()`.</td>
  </tr>
  <tr>
    <td>106</td>
    <td>MaxValueInvalid</td>
    <td>MaxValue and MinValue must be integers.</td>
    <td>If you're passing a maximum value to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` for an `Class.OrderedDataStore`, it must be an integer.</td>
  </tr>
  <tr>
    <td>106</td>
    <td>MinValueInvalid</td>
    <td>MaxValue and MinValue must be integers.</td>
    <td>If you're passing a minimum value to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` for an `Class.OrderedDataStore`, it must be an integer.</td>
  </tr>
  <tr>
    <td>106</td>
    <td>PageSizeGreater</td>
    <td>PageSize must be within a predefined range.</td>
    <td>The minimum page size for an `Class.OrderedDataStore` is 1.</td>
  </tr>
  <tr>
    <td>106</td>
    <td>PageSizeLesser</td>
    <td>PageSize must be within a predefined range.</td>
    <td>The maximum page size for an `Class.OrderedDataStore` is 100.</td>
  </tr>
  <tr>
    <td>301</td>
    <td>GetAsyncThrottle</td>
    <td>GetAsync request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.GlobalDataStore:GetAsync()|GetAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>302</td>
    <td>SetAsyncThrottle</td>
    <td>SetAsync request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.GlobalDataStore:SetAsync()|SetAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>303</td>
    <td>IncreAsyncThrottle</td>
    <td>IncrementAsync request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>304</td>
    <td>UpdateAsyncThrottle</td>
    <td>UpdateAsync request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>304</td>
    <td>TransformThrottle</td>
    <td>UpdateAsync request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>305</td>
    <td>GetSortedThrottle</td>
    <td>GetSorted request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>306</td>
    <td>RemoveAsyncThrottle</td>
    <td>RemoveAsync request dropped. Request was throttled, but throttled request queue was full.</td>
    <td>`Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>401</td>
    <td>DataModelNoAccess</td>
    <td>Request Failed. DataModel Inaccessible when the game is shutting down.</td>
    <td>`Class.DataModel` is uninitialized because the game is shutting down.</td>
  </tr>
  <tr>
    <td>402</td>
    <td>LuaWebSrvsNoAccess</td>
    <td>Request Failed. LuaWebService Inaccessible when the game is shutting down.</td>
    <td>`Class.LuaWebService` is uninitialized because the game is shutting down.</td>
  </tr>
  <tr>
    <td>403</td>
    <td>StudioAccessToApisNotAllowed</td>
    <td>Cannot write to DataStore from Studio if API access is not enabled.</td>
    <td>API access must be active in order to use Data Stores in Studio.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>InternalError</td>
    <td>OrderedDataStore does not exist.</td>
    <td>The `Class.OrderedDataStore` associated with this request was not found. This may be a sign of data corruption, so you may want to retry the request at a later time.</td>
  </tr>
  <tr>
    <td>501</td>
    <td>InternalError</td>
    <td>Can't parse response, data may be corrupted.</td>
    <td>The server was unable to parse the response to your request. This may be a sign of data corruption, so you may want to retry the request at a later time.</td>
  </tr>
  <tr>
    <td>502</td>
    <td>RequestRejected</td>
    <td>API Services rejected request with error: <b>X</b>.</td>
    <td>Error <b>X</b> occurred when processing on Roblox servers. Depending on the response, you may want to retry the request at a later time.</td>
  </tr>
  <tr>
    <td>503</td>
    <td>InternalError</td>
    <td>Data store request successful, but key not found.</td>
    <td>The key requested was not found in the DataStore. This may be a sign of data corruption, so you may want to retry the request at a later time.</td>
  </tr>
  <tr>
    <td>504</td>
    <td>InternalError</td>
    <td>Data store request successful, but response not formatted correctly.</td>
    <td>The server was unable to parse the response to your request. This may be a sign of data corruption, so you may want to retry the request at a later time.</td>
  </tr>
  <tr>
    <td>505</td>
    <td>InternalError</td>
    <td>OrderedDataStore request successful, but response not formatted correctly.</td>
    <td>The server was unable to parse the response to your `Class.OrderedDataStore` request. This may be a sign of data corruption, so you may want to retry the request at a later time.</td>
  </tr>
  <tr>
    <td>511</td>
    <td>AttributeSizeTooLarge</td>
    <td>Metadata attribute size exceeds <b>X</b> limit.</td>
    <td>The serialized metadata size exceeds the limit of <b>X</b>. The value <b>X</b> is dynamic, if the size changes, the value also changes.</td>
  </tr>
  <tr>
    <td>512</td>
    <td>UserIdLimitExceeded</td>
    <td>UserID size exceeds limit of <b>X</b>.</td>
    <td>The length of the user IDs array provided by the user exceeded the limit of <b>X</b>.</td>
  </tr>
  <tr>
    <td>513</td>
    <td>AttributeFormatError</td>
    <td>Attribute userId format is invalid.</td>
    <td>The user ID provided is not a number.</td>
  </tr>
  <tr>
    <td>513</td>
    <td>AttributeFormatError</td>
    <td>Attribute metadata format is invalid.</td>
    <td>The metadata is not a table.</td>
  </tr>
</tbody>
</table>

## Limits

There are also **limits** applied to the data store model. If an experience exceeds these limits, the service automatically throttles the experience's data store usage, causing requests to be placed in a queue.

When a limit is reached, further requests are placed into one of four queues: **set**, **ordered set**, **get**, and **ordered get**. Requests in a queue are handled in the order they are received and the called function continues to yield as long as its request is queued. If the data store key itself is throttled, the request is temporarily skipped but still in the queue. Each queue has a limit of 30 requests and, when this limit is exceeded, the requests fail with an [error code](#error-code-reference) in the 301–306 range indicating that the request was dropped entirely.

### Server Limits

Each server is allowed a certain number of data store requests based on the request type and number of players (more data is needed for more players).

<table>
<thead>
  <tr>
    <th>Request Type</th>
    <th>Functions</th>
    <th>Requests per Minute</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><b>Get</b></td>
    <td>`Class.GlobalDataStore:GetAsync()|GetAsync()`</td>
    <td>60 + numPlayers × 10</td>
  </tr>
  <tr>
    <td><b>Set</b> (limit is shared among all listed functions)</td>
    <td>`Class.GlobalDataStore:SetAsync()|SetAsync()`<br></br>`Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`<br></br>`Class.GlobalDataStore:RemoveAsync()|RemoveAsync()`</td>
    <td>60 + numPlayers × 10</td>
  </tr>
  <tr>
    <td><b>Get Sorted</b></td>
    <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()`</td>
    <td>5 + numPlayers × 2</td>
  </tr>
  <tr>
    <td><b>Get Version</b></td>
    <td>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`</td>
    <td>5 + numPlayers × 2</td>
  </tr>
  <tr>
    <td><b>List</b></td>
    <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()`<br></br>`Class.DataStore:ListKeysAsync()|ListKeysAsync()`<br></br>`Class.DataStore:ListVersionsAsync()|ListVersionAsync()`</td>
    <td>5 + numPlayers × 2</td>
  </tr>
  <tr>
    <td><b>Remove</b></td>
    <td>`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()`</td>
    <td>5 + numPlayers × 2</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
  You can query request budget on a per-method basis with `Class.DataStoreService:GetRequestBudgetForRequestType()|GetRequestBudgetForRequestType()`.
</Alert>

### Data Limits

Along with request frequency, data stores limit how much data can be used per entry. The data store name, key name, and [scope](#scopes) must all be under a certain character length, as well as the amount of data stored.

<table>
<thead>
  <tr>
    <th>Component</th>
    <th>Maximum Number of Characters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Data Store Name</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Key Name</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Scope</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Data (Key Value)</td>
    <td>4,194,304 per key</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
  Since the data store name, key name, and scope are strings, their length can be checked with `Library.string.len()`. The data (key value) is also stored as a string, regardless of its initial type. The size of data can be checked with the `Class.HttpService:JSONEncode()|JSONEncode()` function that converts Lua data into a serialized JSON table.
</Alert>

### Throughput Limits

The following table describes per-key throughput limits to ensure optimal
performance on Roblox servers.

<table>
<thead>
  <tr>
    <th>Request Type</th>
    <th>Limit</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Read</td>
    <td>25 MB per minute</td>
  </tr>
  <tr>
    <td>Write</td>
    <td>4 MB per minute</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
  For every request, we round throughput up to the next kilobyte. For example,
  if you write 800 bytes and 1.2 KB in two requests, we count that as 3 KB total
  throughput (1 KB and 2 KB, respectively).
</Alert>

## Caching

By default, the engine stores values that you retrieve from the backend using `Class.GlobalDataStore:GetAsync()|GetAsync()` in a local cache for 4 seconds, and `Class.GlobalDataStore:GetAsync()|GetAsync()` requests for cached keys return the cached value instead of continuing to the backend. This way, your `Class.GlobalDataStore:GetAsync()|GetAsync()` requests returning a cached value don't count towards your [throughput](#throughput-limits) and [server](#server-limits) limits.

Caching also applies to modifications to keys using `Class.GlobalDataStore:SetAsync()|SetAsync()`, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()`. Additionally, all `Class.GlobalDataStore:GetAsync()|GetAsync()` calls that retrieve a value not being cached from the backend update the cache immediately and restart the 4 second timer.

`Class.DataStore:GetVersionAsync()|GetVersionAsync()`, `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`, `Class.DataStore:ListKeysAsync()|ListKeysAsync()`, and `Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` don't implement caching and always fetch the latest data from the service backend.

<Alert severity="warning">
  Caching is local to a particular data store instance, so different data stores can have their caches in different states. For example, if you access a key twice through two different data store instances, such as getting a data store with a specified scope and another through with the `Class.DataStoreOptions.AllScopes|AllScopes` property enabled, each data store instance will have its own cache. If you change the value of that key in one data store instance and not the other, you will have inconsistent data.
</Alert>

### Disabling Caching

To opt out of using the cache to retrieve the most up-to-date value from the servers, add the `Class.DataStoreGetOptions` parameter to your `Class.GlobalDataStore:GetAsync()|GetAsync()` call and set its `Class.DataStoreGetOptions.UseCache|UseCache` property to `false` to make your request ignore any keys in the cache.

Disabling caching is useful if you have multiple servers writing to a key with high frequency and need to get the latest value from servers. However, it can cause you to consume more of your [data stores limits and quotas](#limits), since `Class.GlobalDataStore:GetAsync()|GetAsync()` requests bypassing caching always count towards your throughput and server limits.

## Best Practices

The following guidelines help you manage your data more efficiently and take advantage of future improvements.

### Create Fewer Data Stores

Data stores behave similarly to tables in databases. Minimize the number of data stores in an experience and put related data in each data store. This approach allows you to configure each data store individually (versioning and indexing/querying) to improve the service's efficiency to operate the data. As more features become available, this approach also allows you to more easily manage data stores.

### Use a Single Object for Related Data

Since the increased maximum object size is 4 MB, there should be enough space to follow this rule. You can fetch all relevant data in one call and use the quota (limit) more efficiently. Additionally, `Class.GlobalDataStore:SetAsync()|SetAsync()` updates all data, so all data for the same player is always in sync. The versioning system versions individual objects rather than the whole data store. When restoring to older versions, self-contained objects are now consistent and useful.

### Use Key Prefixes to Organize Your Data

You can filter keys with a certain [prefix](#listing-and-prefixes) when calling `Class.DataStore:ListKeysAsync()|ListKeysAsync()`. Consider an experience that supports players having multiple character profiles. You can save keys with a prefix such as `/User_1234/profiles/warrior` and `/User_1234/profiles/mage` and use a prefix search with `/User_1234/profiles` to get a list of all profiles.
