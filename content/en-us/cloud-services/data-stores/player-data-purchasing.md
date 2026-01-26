---
title: Implement player data and purchasing systems
description: Guide for implementing player data and purchase handling systems.
---

## Background

Roblox provides a set of APIs to interface with data stores via `Class.DataStoreService`. The most common use case for these APIs is for saving, loading, and replicating _player data_. That is, data associated with the player's progress, purchases, and other session characteristics that persists between individual play sessions.

Most experiences on Roblox use these APIs to implement some form of a player data system. These implementations differ in their approach, but generally seek to solve the same set of issues.

## Common problems

Below are some of the most common problems player data systems attempt to solve:

- **In Memory Access:** `Class.DataStoreService` requests make web requests that operate asynchronously and are subject to rate limits. This is appropriate for an initial load at the start of the session, but not for high frequency read and write operations during the normal course of gameplay. Most developers' player data systems store this data in-memory on the Roblox server, limiting `Class.DataStoreService` requests to the following scenarios:

  - Initial read at the start of a session
  - Final write at the end of the session
  - Periodic writes at an interval to mitigate the scenario where the final write fails
  - Writes to ensure data is saved while processing a purchase

- **Efficient Storage:** Storing all of a player's session data in a single table lets you update multiple values atomically and handle the same amount of data in fewer requests. It also removes the risk of inter-value desynchronization and makes rollbacks easier to reason around.

  Some developers also implement custom serialization to compress large data structures (typically to save in-game user-generated content).

- **Replication:** The client needs regular access to a player's data (for example, to update the UI). A generic approach to replicating player data to the client lets you transmit this information without having to create bespoke replication systems for each component of data. Developers often want the option to be selective about what is and isn't replicated to the client.

- **Error Handling:** When DataStores cannot be accessed, most solutions will implement a retrying mechanism and a fallback to 'default' data. Special care is needed to ensure fallback data doesn't later overwrite 'real' data, and that this is communicated to the player appropriately.

- **Retries:** When data stores are inaccessible, most solutions implement a retry mechanism and a fallback to default data. Take special care to ensure that fallback data doesn't later overwrite "real" data, and communicate the situation to the player appropriately.

- **Session Locking:** If a single player's data is loaded and in-memory on multiple servers, issues can occur in which one server saves out-of-date information. This can lead to data loss and common item duplication loopholes.

- **Atomic Purchase Handling:** Verify, award, and record purchases atomically to prevent items from being lost or awarded multiple times.

## Sample code

<Alert severity="warning">
This code is provided for reference purposes only and has not proven itself over a long period of time in a popular experience. It exists so that you can examine its approach to solving various problems and apply them to your own player data systems. Don't use this code in your experience as-is without extensive testing.
</Alert>

Roblox has reference code to assist you with designing and building player data systems. The remainder of this page examines background, implementation details, and general caveats.

<a href="https://create.roblox.com/store/asset/14376223840/Purchase-Handling)">
  <Button variant="contained">Get the Code</Button>
</a><br />

After you import the model into Studio, you should see the following folder structure:

<img src="../../assets/data/player-data-purchasing/Sample-Hierarchy.png" alt="Explorer window showing the purchasing system model." width="320" />

## Architecture

This high-level diagram illustrates the key systems in the sample and how they interface with code in the rest of the experience.

<img src="../../assets/data/player-data-purchasing/sample-architecture.png" alt="An architecture diagram for the code sample." width="80%" />

## Retries

**Class:** [`DataStoreWrapper`](#sample-code)

### Background

As `Class.DataStoreService` makes web requests under the hood, its requests are not guaranteed to succeed. When this happens, the `Class.GlobalDataStore|DataStore` methods throw errors, allowing you to handle them.

A common "gotcha" can occur if you attempt to handle data store failures like this:

```lua
local function retrySetAsync(dataStore, key, value)
	for _ = 1, MAX_ATTEMPTS do
		local success, result = pcall(dataStore.SetAsync, dataStore, key, value)

		if success then
			break
		end

		task.wait(TIME_BETWEEN_ATTEMPTS)
	end
end
```

While this is a perfectly valid retry mechanism for a generic function, it is not suitable for `Class.DataStoreService` requests because it does not guarantee the order in which requests are made. Preserving the order of requests is important for `Class.DataStoreService` requests because they interact with state. Consider the following scenario:

1. Request A is made to set the value of key `K` to 1.
1. The request fails, so a retry is scheduled to run in 2 seconds.
1. Before the retry occurs, request B sets the value of `K` to 2, but the retry of request A immediately overwrites this value and sets `K` to 1.

Even though `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` operates on the latest version of the key's value, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` requests must still be processed in order to avoid invalid transient states (for example, a purchase subtracts coins before a coin addition gets processed, resulting in negative coins).

Our player data system uses a new class, `DataStoreWrapper`, which provides yielding retries that are guaranteed to be processed in order per key.

### Approach

<img src="../../assets/data/player-data-purchasing/retry-diagram.png" alt="An process diagram illustrating the retry system" width="60%" />

`DataStoreWrapper` provides methods corresponding to the `Class.GlobalDataStore|DataStore` methods: `Class.GlobalDataStore:GetAsync()|DataStore:GetAsync()`, `Class.GlobalDataStore:SetAsync()|DataStore:SetAsync()`, `Class.GlobalDataStore:UpdateAsync()|DataStore:UpdateAsync()` and `Class.GlobalDataStore:RemoveAsync()|DataStore:RemoveAsync()`.

These methods, when called:

1. Add the request to a queue. Each key has its own queue, where requests are processed in order and in series. The requesting thread yields until the request has completed.

   This functionality is based on the `ThreadQueue` class, which is a coroutine-based task scheduler and rate limiter. Rather than returning a promise, `ThreadQueue` yields the current thread until the operation is complete and throws an error if it fails. This is more consistent with idiomatic asynchronous Luau patterns.

1. If a request fails, it retries with a configurable exponential backoff. These retries form part of the callback submitted to the `ThreadQueue`, so they are guaranteed to complete before the next request in the queue for this key begins.

1. When a request is completed, the request method returns with the `success, result` pattern

`DataStoreWrapper` also exposes methods to get the queue length for a given key and clear out stale requests. The latter option is particularly useful in scenarios when the server is shutting down and there is no time to process any but the most recent requests.

### Caveats

`DataStoreWrapper` follows the principle that, outside of extreme scenarios, every data store request should be allowed to complete (successfully or otherwise), even if a more recent request makes it redundant. When a new request occurs, stale requests aren't removed from the queue, but are instead allowed to complete before the new request is started. The rationale for this is rooted in this module's applicability as a generic data store utility rather than a specific tool for player data, and is as follows:

1. It's hard to decide on an intuitive set of rules for when a request is safe to remove from the queue. Consider the following queue:

   `Value=0, SetAsync(1), GetAsync(), SetAsync(2)`

   The expected behavior is that `Class.GlobalDataStore:GetAsync()|GetAsync()` would return `1`, but if we remove the `Class.GlobalDataStore:SetAsync()|SetAsync()` request from the queue due to it being made redundant by the most recent one, it would return `0`.

   The logical progression is that when a new write request is added, only prune stale requests as far back as the most recent read request. `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, by far the most common operation (and the only one used by this system), can both read and write, so it would be difficult to reconcile within this design this without adding extra complexity.

   `DataStoreWrapper` could require you to specify whether an `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` request was permitted to read and/or write, but it would have no applicability to our player data system, where this cannot be determined ahead of time due to the session locking mechanism (covered in more detail later).

2. Once removed from the queue, it's hard to decide on an intuitive rule for _how_ this should be handled. When a `DataStoreWrapper` request is made, the current thread is yielded until it is completed. If we removed stale requests from the queue, we would have to decide whether to return `false, "Removed from queue"` or to never return and discard the active thread. Both approaches come with their own drawbacks and offload additional complexity onto the consumer.

Ultimately, our view is that the simple approach (processing every request) is preferable here and creates a clearer environment to navigate in when approaching complex issues like session locking. The only exception to this is during `Class.DataModel:BindToClose()`, where clearing the queue becomes necessary to save all users' data in time and the value individual function calls return is no longer an ongoing concern. To account for this, we expose a `skipAllQueuesToLastEnqueued` method. For more context, see [Player Data](#player-data).

## Session locking

**Class:** [`SessionLockedDataStoreWrapper`](#sample-code)

### Background

Player data is stored in memory on the server and is only read from and written to the underlying data stores when necessary. You can read and update in-memory player data instantly without needing web requests and avoid exceeding `Class.DataStoreService` limits.

For this model to work as intended, it is imperative that no more than one server is able to load a player's data into memory from the `Class.GlobalDataStore|DataStore` at the same time.

For example, if server A loads a player's data, server B can't load that data until server A releases its lock on it during a final save. Without a locking mechanism, server B could load out-of-date player data from the data store before server A has a chance to save the more recent version that it has in memory. Then if server A saves its newer data after server B loads the out-of-date data, server B would overwrite that newer data during its next save.

Even though Roblox only allows a client to be connected to one server at a time, you can't assume that data from one session is always saved before the next session starts. Consider the following scenarios that can occur when a player leaves server A:

1. Server A makes a `Class.GlobalDataStore|DataStore` request to save their data, but the request fails and requires several retries to successfully complete. During the retry period, the player joins server B.
2. Server A makes too many `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` calls to the same key and gets throttled. The final save request is placed in a queue. While the request is in the queue, the player joins server B.
3. On server A, some code connected to the `Class.Players.PlayerRemoving|PlayerRemoving` event yields before the player's data is saved. Before this operation completes, the player joins server B.
4. The performance of server A has degraded to the point that the final save is delayed until after the player joins server B.

These scenarios should be rare, but they do occur, particularly in situations where a player disconnects from one server and connects to another in rapid succession (for example, while teleporting). Some malicious users might even attempt to abuse this behavior to complete actions without them persisting. This can be particularly impactful in experiences that allow players to trade and is a common source of item duplication exploits.

Session locking addresses this vulnerability by ensuring that when a player's `Class.GlobalDataStore|DataStore` key is first read by the server, the server atomically writes a lock to the key's metadata inside the same `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` call. If this lock value is present when any other server attempts to read or write the key, the server does not proceed.

### Approach

<img src="../../assets/data/player-data-purchasing/session-lock-diagram.png" alt="An process diagram illustrating the session locking system" max-width="80%" />

`SessionLockedDataStoreWrapper` is a meta-wrapper around the `DataStoreWrapper` class. `DataStoreWrapper` provides queueing and retrying functionality, which `SessionLockedDataStoreWrapper` supplements with session locking.

`SessionLockedDataStoreWrapper` passes every `Class.GlobalDataStore|DataStore` request—regardless of whether it is `Class.GlobalDataStore:GetAsync()|GetAsync`, `Class.GlobalDataStore:SetAsync()|SetAsync` or `Class.GlobalDataStore:UpdateAsync()|UpdateAsync`—through `Class.GlobalDataStore:UpdateAsync()|UpdateAsync`. This is because `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` allows a key to be both read and written to atomically. It is also possible to abandon the write based on the value read by returning `nil` in the transformation callback.

The transformation function passed into `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` for each request performs the following operations:

1. Verifies the key is safe to access, abandoning the operation if it is not. "Safe to access" means:

   - The key's metadata object does not include an unrecognized `LockId` value that was last updated less than the lock expiry time ago. This accounts for respecting a lock placed by another server and for ignoring that lock if it expired.

   - If this server has placed its own `LockId` value in the key's metadata previously, then this value is still in the key's metadata. This accounts for the situation where another server has taken over this server's lock (by expiry or by force) and later released it. Alternatively phrased, even if `LockId` is `nil`, another server could still have replaced and removed a lock in the time since you locked the key.

2. `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` performs the `Class.GlobalDataStore|DataStore` operation the consumer of `SessionLockedDataStoreWrapper` requested. For example, `Class.GlobalDataStore:GetAsync()|GetAsync()` translates to `function(value) return value end`.

3. Depending on the parameters passed into the request, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` either locks or unlocks the key:

   1. If the key is to be locked, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` sets the `LockId` in the key's metadata to a GUID. This GUID is stored in-memory on the server so it can be verified the next time it accesses the key. If the server already has a lock on this key, it makes no changes. It also schedules a task to warn you if you don't access the key again to maintain the lock within the lock's expiration time.

   2. If the key is to be unlocked, `Class.GlobalDataStore:UpdateAsync()|UpdateAsync` removes the `LockId` in the key's metadata.

A custom retry handler is passed into the underlying `DataStoreWrapper` so that the operation is retried if it was aborted at step 1 due to the session being locked.

A custom error message is also returned to the consumer, allowing the player data system to report an alternative error in the case of session locking to the client.

### Caveats

The session locking regime relies on a server always releasing its lock on a key when it is done with it. This should always happen through an instruction to unlock the key as part of the final write in `Class.Players.PlayerRemoving|PlayerRemoving` or `Class.DataModel:BindToClose()|BindToClose()`.

However, the unlock can fail in certain situations. For example:

- The server crashed or `Class.DataStoreService` was inoperable for all attempts to access the key.
- Due to an error in logic or similar bug, the instruction to unlock the key was not made.

To maintain the lock on a key, you must regularly access it for as long as it is loaded in memory. This would normally be done as part of the auto-save loop running in the background in most player data systems, but this system also exposes a `refreshLockAsync` method if you need to do it manually.

If the lock expiry time has been exceeded without the lock being updated, then any server is free to take over the lock. If a different server takes the lock, attempts by the current server to read or write the key fail unless it establishes a new lock.

## Developer Product processing

**Singleton:** [`ReceiptHandler`](#sample-code)

### Background

The `ProcessReceipt` callback performs the critical job of determining when to finalize a purchase. `ProcessReceipt` is called in very specific scenarios. For its set of guarantees, see `Class.MarketplaceService.ProcessReceipt`.

Although the definition of "handling" a purchase can differ between experiences, we use the following criteria

1. The purchase has not previously been handled.
1. The purchase is reflected in the current session.
1. The purchase has been saved to a `Class.GlobalDataStore|DataStore`.

   Every purchase, even one-time consumables, should be reflected in the `Class.GlobalDataStore|DataStore` so users' purchase history is included with their session data.

This requires conducting the following operations before returning `PurchaseGranted`:

1. Verify the `PurchaseId` has not already been recorded as handled.
2. Award the purchase in the player's in-memory player data.
3. Record the `PurchaseId` as handled in the player's in-memory player data.
4. Write the player's in-memory player data to the `Class.GlobalDataStore|DataStore`.

Session locking simplifies this flow, as you no longer need to worry about the following scenarios:

- The in-memory player data in the current server potentially being out-of-date, requiring you to fetch the latest value from the `Class.GlobalDataStore|DataStore` before verifying the `PurchaseId` history
- The callback for the same purchase running in another server, requiring you to both read and write the `PurchaseId` history and save the updated player data with the purchase reflected atomically to prevent race conditions

Session locking guarantees that, if an attempt to write to the player's `Class.GlobalDataStore|DataStore` is successful, no other server has successfully read or written to the player's `Class.GlobalDataStore|DataStore` between the data being loaded and saved in this server. In short, the in-memory player data in this server is the most up-to-date version available. There are some caveats, but they do not impact this behavior.

### Approach

The comments in `ReceiptProcessor` outline the approach:

1. Verify that the player's data is currently loaded on this server and that it loaded without any errors.

   Because this system uses session locking, this check also verifies that the in-memory data is the most up-to-date version.

   If the player's data hasn't loaded yet (which is expected when a player joins a game), wait for the player's data to load. The system also listens for the player leaving the experience before their data loads, as it should not yield indefinitely and block this callback from being invoked again on this server for this purchase if the player rejoins.

1. Verify the `PurchaseId` is not already recorded as processed in the player data.

   Due to session locking, the array of `PurchaseIds` the system has in memory is the most up-to-date version. If the `PurchaseId` is recorded as processed and reflected in a value that has been loaded to or saved to the `Class.GlobalDataStore|DataStore`, return `PurchaseGranted`. If it is recorded as processed, but _not_ reflected in the `Class.GlobalDataStore|DataStore`, return `NotProcessedYet`.

1. Update the Player Data locally in this server to "award" the purchase.

   `ReceiptProcessor` takes a generic callback approach and assigns a different callback for each `DeveloperProductId`.

   <Alert severity="warning">
   As soon as this step completes, the player receives access to the purchase in the current session. This means that if the player's data fails to save in step 5, the player receives the purchase for free for the duration of the session.
   </Alert>

1. Update the player data locally in this server to store the `PurchaseId`.

1. Submit a request to save the in-memory data to the `Class.GlobalDataStore|DataStore`, returning `PurchaseGranted` if the request is successful. If not, return `NotProcessedYet`.

   If this save request is not successful, a later request to save the player's in-memory session data could still succeed. During the next `ProcessReceipt` call, step 2 handles this situation and returns `PurchaseGranted`.

## Player data

**Singletons:** [`PlayerData.Server`](#sample-code), [`PlayerData.Client`](#sample-code)

### Background

Modules that provide an interface for code to synchronously read and write player session data are common in Roblox experiences. This section covers `PlayerData.Server` and `PlayerData.Client`.

### Approach

`PlayerData.Server` and `PlayerData.Client` handle the following:

1. Loading the player's data into memory, including handling cases in which it fails to load
2. Providing an interface for server code to query and change the player data
3. Replicating changes in the player's data to the client so that client code can access it
4. Replicating loading and/or saving errors to the client so that it can show error dialogs
5. Saving the player's data periodically, when the player leaves, and when the server shuts down

#### Load player data

<img src="../../assets/data/player-data-purchasing/data-load-diagram.png" alt="An process diagram illustrating the loading system" width="60%" />

1. `SessionLockedDataStoreWrapper` makes a `getAsync` request to the data store.

   If this request fails, the default data is used and the profile is marked as "errored" to ensure it is not written to the data store later.

   An alternative option is to kick the player, but we recommend letting the player play with default data and clear messaging as to what occurred rather than removing them from the experience.

1. An initial payload is sent to `PlayerDataClient` containing the loaded data and the error status (if any).

1. Any threads yielded using `waitForDataLoadAsync` for the player are resumed.

#### Provide an interface for server code

- `PlayerDataServer` is a singleton that can be required and accessed by any server code running in the same environment.
- Player data is organized into a dictionary of keys and values. You can manipulate these values on the server using the `setValue`, `getValue`, `updateValue` and `removeValue` methods. These methods all operate synchronously without yielding.
- The `hasLoaded` and `waitForDataLoadAsync` methods are available to ensure the data has loaded before you access it. We recommend doing this once during a loading screen before other systems are started to avoid having to check for load errors before every interaction with data on the client.
- A `hasErrored` method can query if the player's initial load failed, causing them to use default data. Check this method before allowing the player to make any purchases, as purchases cannot be saved to data without a successful load.
- A `playerDataUpdated` signal fires with the `player`, `key`, and `value` whenever a player's data is changed. Individual systems can subscribe to this.

#### Replicate changes to the client

- Any change to player data in `PlayerDataServer` is replicated to `PlayerDataClient`, unless that key was marked as private using setValueAsPrivate
  - `setValueAsPrivate` is used to denote keys that should not be sent to the client
- `PlayerDataClient` includes a method to get the value of a key (get) and a signal that fires when it is updated (updated). A `hasLoaded` method and a `loaded` signal are also included, so the client can wait for data to load & replicate before starting its systems
- `PlayerDataClient` is a singleton that can be required and accessed by any client code running in the same environment

#### Replicate errors to the client

- Error statuses encountered when saving or loading player data are replicated to `PlayerDataClient`.
- Access this information with the `getLoadError` and `getSaveError` methods, along with the `loaded` and `saved` signals.
- There are two types of errors: `DataStoreError` (the `Class.DataStoreService` request failed) and `SessionLocked` (see [Session Locking](#session-locking)).
- Use these events to disable client purchase prompts and implement warning dialogs. This image shows an example dialog:

<img src="../../assets/data/player-data-purchasing/data-warning.png" alt="A screenshot of an example warning that could be shown when player data fails to load" width="60%" />

#### Save player data

<img src="../../assets/data/player-data-purchasing/data-save-diagram.png" alt="A process diagram illustrating the saving system" width="60%" />

1. When the player leaves the experience, the system takes the following steps:

   1. Check if it is safe to write the player's data to the data store. Scenarios where it would be unsafe include the player's data failing to load or still undergoing loading.
   1. Make a request through the `SessionLockedDataStoreWrapper` to write the current in-memory data value to the data store and remove the session lock once complete.
   1. Clears the player's data (and other variables such as metadata and error statuses) from server memory.

1. On a periodic loop, the server writes each player's data to the data store (provided it is safe to save). This welcome redundancy mitigates loss in case of a server crash and is also necessary to maintain the session lock.

1. When a request to shutdown the server is received, the following occurs in a `Class.DataModel:BindToClose()|BindToClose` callback:

   1. A request is made to save each player's data in the server, following the process normally gone through when a player leaves the server. These requests are made in parallel, as `Class.DataModel:BindToClose()|BindToClose` callbacks only have 30 seconds to complete.
   1. To expedite the saves, all other requests in each key's queue are cleared from the underlying `DataStoreWrapper` (see [Retries](#retries)).
   1. The callback doesn't return until all requests have completed.
