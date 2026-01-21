---
title: Data stores
description: How to implement data stores (DataStores) to store persistent data.
comments: The Creator Hub links to some of the anchors on this page, so if you move any of the headers, the team might need to update the links.
---

The `Class.DataStoreService` lets you store data that needs to persist between sessions, like items in a player's inventory or skill points. Data stores are consistent per experience, so any place in an experience can access and change the same data, including places on different servers.

If you want to add granular permission control to your data stores and access them outside of Studio or Roblox servers, you can use [Open Cloud APIs for data stores](/cloud/reference/DataStore).

To view and monitor all the data stores in an experience through the Creator Hub, use the [Data Stores Manager](./data-stores-manager.md).

For temporary data that you need to update or access frequently, use [memory stores](./../memory-stores/index.md).

## Enable Studio access

By default, experiences tested in Studio can't access data stores, so you must first enable them. Accessing data stores in Studio can be dangerous for live experiences because Studio accesses the same data stores as the client application. To avoid overwriting production data, do not enable this setting for live experiences. Instead, enable it for a separate test version of the experience.

To enable Studio access in a [published](../../production/publishing/publish-experiences-and-places.md) experience:

1. Open Studio's **File**&nbsp;⟩ **Experience Settings** window.
2. Navigate to **Security**.
3. Enable the **Enable Studio Access to API Services** toggle.
4. Click **Save**.

## Access data stores

To access a data store inside an experience:

1. Add `Class.DataStoreService` to a server-side `Class.Script|Script`.
2. Use the `Class.DataStoreService:GetDataStore()|GetDataStore()` function and specify the name of the data store you want to use. If the data store doesn't exist, Studio creates one when you save your experience data for the first time.

```lua
local DataStoreService = game:GetService("DataStoreService")

local experienceStore = DataStoreService:GetDataStore("PlayerExperience")
```

<Alert severity="warning">
  The server can only access data stores through `Class.Script|Scripts`. Attempting client-side access in a `Class.LocalScript` causes an error.
</Alert>

## Create data

A data store is essentially a dictionary, similar to a Luau table. A unique **key** indexes each value in the data store, like a user's unique `Class.Player.UserId` or a named string for an experience promo.

<table>
<thead>
  <tr>
    <th>**User data key**</th>
    <th>**Value**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`31250608`</td>
    <td>50</td>
  </tr>
  <tr>
    <td>`351675979`</td>
    <td>20</td>
  </tr>
  <tr>
    <td>`505306092`</td>
    <td>78000</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Promo data key**</th>
    <th>**Value**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`ActiveSpecialEvent`</td>
    <td>SummerParty2</td>
  </tr>
  <tr>
    <td>`ActivePromoCode`</td>
    <td>BONUS123</td>
  </tr>
  <tr>
    <td>`CanAccessPartyPlace`</td>
    <td>true</td>
  </tr>
</tbody>
</table>

To create a new entry, call `Class.GlobalDataStore:SetAsync()|SetAsync()` with the key name and a value.

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
  Functions like `Class.GlobalDataStore:SetAsync()|SetAsync()` that access a data store's contents are network calls that might occasionally fail. To catch and handle errors, make sure to wrap these calls in `Global.LuaGlobals.pcall()`.
</Alert>

## Update data

To change any stored value in a data store, call `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` with the entry's key name and a callback function that defines how you want to update the entry. This callback takes the current value and returns a new value based on the logic you define. If the callback returns `nil`, the write operation is cancelled and the value isn't updated.

<Alert severity="warning">
  The callback function you pass into `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` does **not** have permission to yield. It can't contain any yielding functions like `Library.task.wait()`.
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

### Set vs update

Use set to quickly update a specific key. The `Class.GlobalDataStore:SetAsync()|SetAsync()` function:

- Can cause data inconsistency if two servers try to set the same key at the same time
- Only counts against the write limit

Use update to handle multi-server attempts. The `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` function:

- Reads the current key value from the server that last updated it before making any changes
- Is slower because it reads before it writes
- Counts against both the read and write limits

## Read data

To read the value of a data store entry, call `Class.GlobalDataStore:GetAsync()|GetAsync()` with the entry's key name.

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
  The values you retrieve using `Class.GlobalDataStore:GetAsync()|GetAsync()` sometimes can be out of sync with the backend due to the [caching](./versioning-listing-and-caching.md#caching) behavior. For more information, see [Disabling caching](./versioning-listing-and-caching.md#disable-caching).
</Alert>

## Increment data

To increment an integer in a data store, call `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` with the entry's key name and a number for how much to change the value. `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` is a convenience function that lets you avoid calling `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` and manually incrementing the integer.

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

## Remove data

To remove an entry and return the value associated with the key, call `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()`.

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

## Metadata

<Alert severity="info">
Ordered data stores don't support [versioning](versioning-listing-and-caching.md#versioning) and metadata, so `Class.DataStoreKeyInfo|DataStoreKeyInfo` is always `nil` for keys in an `Class.OrderedDataStore|OrderedDataStore`. If you need to support versioning and metadata, use `Class.DataStore|DataStore`.
</Alert>

There are two types of metadata associated with keys:

- **Service-defined**: Default read-only metadata, like the most recent update time and creation time. Every object has service-defined metadata.
- **User-defined**: Custom metadata for tagging and categorization. Defined using the `Class.DataStoreSetOptions` object and the `Class.DataStoreSetOptions:SetMetadata()|SetMetadata()` function.

To manage metadata, expand the `Class.GlobalDataStore:SetAsync()|SetAsync()`, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, `Class.GlobalDataStore:GetAsync()|GetAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` functions.

- `Class.GlobalDataStore:SetAsync()|SetAsync()` accepts the optional third and fourth arguments:

  - A table of `Class.Player.UserId|UserIds`. This can help with content copyright and intellectual property tracking and removal.
  - A `Class.DataStoreSetOptions` object, where you can define custom metadata using the `Class.DataStoreSetOptions:SetMetadata()|SetMetadata()` function.

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

- `Class.GlobalDataStore:GetAsync()|GetAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` return a second value in the `Class.DataStoreKeyInfo` object. This second value contains both service-defined properties and functions to fetch user-defined metadata.

  - The `Class.DataStoreKeyInfo:GetUserIds()|GetUserIds()` function fetches the table of `Class.Player.UserId|UserIds` that you passed to `Class.GlobalDataStore:SetAsync()|SetAsync()`.
  - The `Class.DataStoreKeyInfo:GetMetadata()|GetMetadata()` function fetches user-defined metadata that you passed to `Class.GlobalDataStore:SetAsync()|SetAsync()` through `Class.DataStoreSetOptions:SetMetadata()|SetMetadata()`.
  - The `Class.DataStoreKeyInfo.Version|Version` property fetches the version of the key.
  - The `Class.DataStoreKeyInfo.CreatedTime|CreatedTime` property fetches the time the key was created, formatted as the number of milliseconds since epoch.
  - The `Class.DataStoreKeyInfo.UpdatedTime|UpdatedTime` property fetches the last time the key was updated, formatted as the number of milliseconds since epoch.

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

- The callback function of `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` takes an additional parameter in the `Class.DataStoreKeyInfo` object that describes the current key state. It returns the modified value, the keys associated with `Class.Player.UserId|UserIds`, and the key's metadata.

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
  When calling `Class.GlobalDataStore:SetAsync()|SetAsync()`, `Class.GlobalDataStore:IncrementAsync()|IncrementAsync()`, and `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, you must always update metadata definitions with a value, even when there are no changes to the current value. If you don't, you lose the current value.
</Alert>

For limits when defining metadata, see the [metadata limits](../../cloud-services/data-stores/error-codes-and-limits.md#metadata-limits).

## Ordered data stores

By default, data stores don't sort their content. If you need to get data in an ordered way, like in persistent leaderboard stats, call `Class.DataStoreService:GetOrderedDataStore()|GetOrderedDataStore()` instead of `Class.DataStoreService:GetDataStore()|GetDataStore()`.

```lua
local DataStoreService = game:GetService("DataStoreService")

local characterAgeStore = DataStoreService:GetOrderedDataStore("CharacterAges")
```

Ordered data stores support the same basic functions as default data stores, plus the unique `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` function. This retrieves **multiple sorted keys** based on a specific sorting order, page size, and minimum/maximum values.

The following example sorts character data into pages with three entries, each in descending order, then loops through the pages and outputs each character's name and age.

```lua
local DataStoreService = game:GetService("DataStoreService")

local characterAgeStore = DataStoreService:GetOrderedDataStore("CharacterAges")

-- Populates ordered data store
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

-- Sorts data by descending order into pages of three entries each
local success, pages = pcall(function()
	return characterAgeStore:GetSortedAsync(false, 3)
end)
if success then
	while true do
		-- Gets the current (first) page
		local entries = pages:GetCurrentPage()
		-- Iterates through all key-value pairs on page
		for _, entry in entries do
			print(entry.key .. " : " .. tostring(entry.value))
		end
		-- Checks if last page has been reached
		if pages.IsFinished then
			break
		else
			print("----------")
			-- Advances to next page
			pages:AdvanceToNextPageAsync()
		end
	end
end
```

<Alert severity="info">
When you iterate through `Class.DataStoreService:GetOrderedDataStore()|GetOrderedDataStore()` using `Class.Pages:AdvanceToNextPageAsync()|AdvanceToNextPageAsync()`, the limit for requests is the same as the maximum page size you set for an ordered data store. `Class.Pages:AdvanceToNextPageAsync()|AdvanceToNextPageAsync()` always has the same limit as the class that originally requires it.
</Alert>
