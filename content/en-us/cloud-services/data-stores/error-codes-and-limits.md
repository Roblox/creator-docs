---
title: Data store error codes and limits
description: Error codes you might encounter and limits you might hit when using data stores (DataStores) to store data.
---

Requests you make to data stores can fail due to poor connectivity or other issues. To handle errors and return messages with an error code, wrap data store functions in `Global.LuaGlobals.pcall()`.

A failed write call, such as `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, means the game server did not receive a successful response. It does not always guarantee that the backend write did not occur. In some failure scenarios, the final write state may be unknown to the caller until it is verified with a follow-up read without cache.

## Error code reference

<table>
<thead>
  <tr>
    <th>Error code</th>
    <th>Error name</th>
    <th>Error message</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`101`</td>
    <td>`KeyNameEmpty`</td>
    <td>Key name can't be empty.</td>
    <td>Check if the key input into the data store function is an empty string.</td>
  </tr>
  <tr>
    <td>`102`</td>
    <td>`KeyNameLimit`</td>
    <td>Key name exceeds the 50 character limit.</td>
    <td>Check if the key input into the data store function exceeds a length of 50.</td>
  </tr>
  <tr>
    <td>`103`</td>
    <td>`ValueNotAllowed`</td>
    <td>Can't allow <b>X</b> in `DataStore`.</td>
    <td>A bad update function returned a value of type <b>X</b>.</td>
  </tr>
  <tr>
    <td>`104`</td>
    <td>`CantStoreValue`</td>
    <td>Can't store <b>X</b> in `DataStore`.</td>
    <td>The update function returned a value of type <b>X</b> that didn't serialize.</td>
  </tr>
  <tr>
    <td>`105`</td>
    <td>`ValueTooLarge`</td>
    <td>Serialized value exceeds <b>X</b> limit.</td>
    <td>If you're setting a value with `Class.GlobalDataStore:SetAsync()|SetAsync()` or `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()`, the serialized length of the value can't exceed the size <b>X</b>. To check the serialized length of the data, use `Class.HttpService:JSONEncode()|JSONEncode()`.</td>
  </tr>
  <tr>
    <td>`106`</td>
    <td>`MaxValueInvalid`</td>
    <td>`MaxValue` must be an integer.</td>
    <td>If you're passing a maximum value to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` for an `Class.OrderedDataStore`, it must be an integer.</td>
  </tr>
  <tr>
    <td>`106`</td>
    <td>`MinValueInvalid`</td>
    <td>`MinValue` must be an integer.</td>
    <td>If you're passing a minimum value to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` for an `Class.OrderedDataStore`, it must be an integer.</td>
  </tr>
  <tr>
    <td>`106`</td>
    <td>`PageSizeGreater`</td>
    <td>`PageSize` must be within a predefined range.</td>
    <td>The minimum page size for an `Class.OrderedDataStore` is 1.</td>
  </tr>
  <tr>
    <td>`106`</td>
    <td>`PageSizeLesser`</td>
    <td>`PageSize` must be within a predefined range.</td>
    <td>The maximum page size for an `Class.OrderedDataStore` is 100.</td>
  </tr>
  <tr>
    <td>`107`</td>
    <td>`MinMaxOrderInvalid`</td>
    <td>`MaxValue` must be greater than or equal to `MinValue`.</td>
    <td>The maximum value must be greater than or equal to the minimum value for `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()`.</td>
  </tr>
  <tr>
    <td>`301`</td>
    <td>`GetAsyncThrottle`</td>
    <td>`GetAsync` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.GlobalDataStore:GetAsync()|GetAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`302`</td>
    <td>`SetAsyncThrottle`</td>
    <td>`SetAsync` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.GlobalDataStore:SetAsync()|SetAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`303`</td>
    <td>`IncreAsyncThrottle`</td>
    <td>`IncrementAsync` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.GlobalDataStore:IncrementAsync()|IncrementAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`304`</td>
    <td>`UpdateAsyncThrottle`</td>
    <td>`UpdateAsync` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`304`</td>
    <td>`TransformThrottle`</td>
    <td>`UpdateAsync` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`305`</td>
    <td>`GetSortedThrottle`</td>
    <td>`GetSorted` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`306`</td>
    <td>`RemoveAsyncThrottle`</td>
    <td>`RemoveAsync` request dropped. Request was throttled but queue was full.</td>
    <td>`Class.GlobalDataStore:RemoveAsync()|RemoveAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td>`401`</td>
    <td>`DataModelNoAccess`</td>
    <td>Request failed. `DataModel` is inaccessible while the experience is shutting down.</td>
    <td>`Class.DataModel` is uninitialized because the experience is shutting down.</td>
  </tr>
  <tr>
    <td>`402`</td>
    <td>`LuaWebSrvsNoAccess`</td>
    <td>Request failed. `LuaWebService` is inaccessible while the experience is shutting down.</td>
    <td>`Class.LuaWebService` is uninitialized because the experience is shutting down.</td>
  </tr>
  <tr>
    <td>`403`</td>
    <td>`StudioAccessToApisNotAllowed`</td>
    <td>Can't write to `DataStore` from Studio because API access is not enabled.</td>
    <td>API access must be active in order to use data stores in Studio.</td>
  </tr>
  <tr>
    <td>`404`</td>
    <td>`InternalError`</td>
    <td>`OrderedDataStore` doesn't exist.</td>
    <td>The `Class.OrderedDataStore` associated with this request wasn't found. This might be a sign of data corruption. Try again later.</td>
  </tr>
  <tr>
    <td>`501`</td>
    <td>`InternalError`</td>
    <td>Can't parse response because data might be corrupted.</td>
    <td>The server was unable to parse the response to your request. This might be a sign of data corruption. Try again later.</td>
  </tr>
  <tr>
    <td>`502`</td>
    <td>`RequestRejected`</td>
    <td>API Services rejected the request with error <b>X</b>.</td>
    <td>Error <b>X</b> occurred when processing on Roblox servers. Try again later.</td>
  </tr>
  <tr>
    <td>`503`</td>
    <td>`InternalError`</td>
    <td>Data store request was successful but key wasn't found.</td>
    <td>The key requested wasn't found in the data store. This might be a sign of data corruption. Try again later.</td>
  </tr>
  <tr>
    <td>`504`</td>
    <td>`InternalError`</td>
    <td>Data store request was successful but the response wasn't formatted correctly.</td>
    <td>The server was unable to parse the response to your request. This might be a sign of data corruption. Try again later.</td>
  </tr>
  <tr>
    <td>`505`</td>
    <td>`InternalError`</td>
    <td>`OrderedDataStore` request was successful but the response wasn't formatted correctly.</td>
    <td>The server was unable to parse the response to your `Class.OrderedDataStore` request. This might be a sign of data corruption. Try again later.</td>
  </tr>
  <tr>
    <td>`509`</td>
    <td>`OperationNotAllowed`</td>
    <td>Data store operations are blocked while running on a Personal RCC to prevent possible data corruption.</td>
    <td>Data store writes are blocked on private RCC channels.</td>
  </tr>
  <tr>
    <td>`511`</td>
    <td>`AttributeSizeTooLarge`</td>
    <td>Metadata attribute size exceeds <b>X</b> limit.</td>
    <td>The serialized metadata size exceeds the limit of <b>X</b>. The value <b>X</b> is dynamic. If the size changes, the value also changes.</td>
  </tr>
  <tr>
    <td>`512`</td>
    <td>`UserIdLimitExceeded`</td>
    <td>`UserID` size exceeds <b>X</b> limit.</td>
    <td>The length of the user IDs array provided by the user exceeds the limit of <b>X</b>.</td>
  </tr>
  <tr>
    <td>`513`</td>
    <td>`AttributeFormatError`</td>
    <td>Attribute `userId` format is invalid.</td>
    <td>The user ID provided isn't a number.</td>
  </tr>
  <tr>
    <td>`513`</td>
    <td>`AttributeFormatError`</td>
    <td>Attribute metadata format is invalid.</td>
    <td>The metadata isn't a table.</td>
  </tr>
  <tr>
    <td></td>
    <td>`GetVersionAsyncThrottle`</td>
    <td>`GetVersionAsync` request dropped. Request was throttled.</td>
    <td>`Class.DataStore:GetVersionAsync()|GetVersionAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td></td>
    <td>`GetVersionAtTimeAsyncThrottle`</td>
    <td>`GetVersionAtTimeAsync` request dropped. Request was throttled.</td>
    <td>`Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td></td>
    <td>`ListDataStoresAsyncThrottle`</td>
    <td>`ListDataStoresAsync` request dropped. Request was throttled.</td>
    <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td></td>
    <td>`ListKeysAsyncThrottle`</td>
    <td>`ListKeysAsync` request dropped. Request was throttled.</td>
    <td>`Class.DataStore:ListKeysAsync()|ListKeysAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td></td>
    <td>`ListVersionsAsyncThrottle`</td>
    <td>`ListVersionsAsync` request dropped. Request was throttled.</td>
    <td>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
  </tr>
  <tr>
    <td></td>
    <td>`RemoveVersionAsyncThrottle`</td>
    <td>`RemoveVersionAsync` request dropped. Request was throttled.</td>
    <td>`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()` request has exceeded the maximum queue size and Roblox is unable to process the requests at the current throughput.</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>`InvalidTimestamp`</td>
    <td>Timestamp must be positive and not more than ten minutes in the future.</td>
    <td>The timestamp provided to `Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()` was not valid.</td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardReadExperienceThrottled`</td>
    <td>`StandardRead` request was throttled by experience limits.</td>
    <td>A request to `Class.DataStore:GetAsync()|GetAsync()`, `Class.DataStore:GetVersionAsync()|GetVersionAsync()`, `Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`, or the read of `Class.DataStore:UpdateAsync()|UpdateAsync()` on a standard data store exceeded the `StandardRead` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardWriteExperienceThrottled`</td>
    <td>`StandardWrite` request was throttled by experience limits.</td>
    <td>A request to `Class.DataStore:SetAsync()|SetAsync()`, `Class.DataStore:IncrementAsync()|IncrementAsync()`, or the write of `Class.DataStore:UpdateAsync()|UpdateAsync()` on a standard data store exceeded the `StandardWrite` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardListExperienceThrottled`</td>
    <td>`StandardList` request was throttled by experience limits.</td>
    <td>A request to `Class.DataStore:ListKeysAsync()|ListKeysAsync()`, `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`, or `Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` on standard data stores exceeded the `StandardList` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardRemoveExperienceThrottled`</td>
    <td>`StandardRemove` request was throttled by experience limits.</td>
    <td>A request to `Class.DataStore:RemoveAsync()|RemoveAsync()` on a standard data store exceeded the `StandardRemove` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedReadExperienceThrottled`</td>
    <td>`OrderedRead` request was throttled by experience limits.</td>
    <td>A request to `Class.OrderedDataStore:GetAsync()|GetAsync()` or the read of `Class.OrderedDataStore:UpdateAsync()|UpdateAsync()` on an ordered data store exceeded the `OrderedRead` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedWriteExperienceThrottled`</td>
    <td>`OrderedWrite` request was throttled by experience limits.</td>
    <td>A request to `Class.OrderedDataStore:SetAsync()|SetAsync()`, `Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`, or the write of `Class.OrderedDataStore:UpdateAsync()|UpdateAsync()` on an ordered data store exceeded the `OrderedWrite` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedListExperienceThrottled`</td>
    <td>`OrderedList` request was throttled by experience limits.</td>
    <td>A request to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` on an ordered data store exceeded the `OrderedList` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedRemoveExperienceThrottled`</td>
    <td>`OrderedRemove` request was throttled by experience limits.</td>
    <td>A request to `Class.OrderedDataStore:RemoveAsync()|RemoveAsync()` on an ordered data store exceeded the `OrderedRemove` experience-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardReadGameServerThrottled`</td>
    <td>`StandardRead` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.DataStore:GetAsync()|GetAsync()`, `Class.DataStore:GetVersionAsync()|GetVersionAsync()`, `Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`, or the read of `Class.DataStore:UpdateAsync()|UpdateAsync()` on a standard data store exceeded the `StandardRead` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardWriteGameServerThrottled`</td>
    <td>`StandardWrite` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.DataStore:SetAsync()|SetAsync()`, `Class.DataStore:IncrementAsync()|IncrementAsync()`, or the write of `Class.DataStore:UpdateAsync()|UpdateAsync()` on a standard data store exceeded the `StandardWrite` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardListGameServerThrottled`</td>
    <td>`StandardList` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.DataStore:ListKeysAsync()|ListKeysAsync()`, `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`, or `Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` on standard data stores exceeded the `StandardList` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`StandardRemoveGameServerThrottled`</td>
    <td>`StandardRemove` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.DataStore:RemoveAsync()|RemoveAsync()` on a standard data store exceeded the `StandardRemove` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedReadGameServerThrottled`</td>
    <td>`OrderedRead` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.OrderedDataStore:GetAsync()|GetAsync()` or the read of `Class.OrderedDataStore:UpdateAsync()|UpdateAsync()` on an ordered data store exceeded the `OrderedRead` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedWriteGameServerThrottled`</td>
    <td>`OrderedWrite` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.OrderedDataStore:SetAsync()|SetAsync()`, `Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`, or the write of `Class.OrderedDataStore:UpdateAsync()|UpdateAsync()` on an ordered data store exceeded the `OrderedWrite` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedListGameServerThrottled`</td>
    <td>`OrderedList` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` on an ordered data store exceeded the `OrderedList` game server-level rate limit.</td>
  </tr>
  <tr>
    <td></td>
    <td>`OrderedRemoveGameServerThrottled`</td>
    <td>`OrderedRemove` request was throttled by game server limits or the request queue was full.</td>
    <td>A request to `Class.OrderedDataStore:RemoveAsync()|RemoveAsync()` on an ordered data store exceeded the `OrderedRemove` game server-level rate limit.</td>
  </tr>
</tbody>
</table>

### Server error codes

<table>
<thead>
  <tr>
    <th>Error name</th>
    <th>Error message</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`DatastoreDeleted`</td>
    <td>The data store is deleted.</td>
    <td>An operation on the data store could not occur because the data store was previously deleted.</td>
  </tr>
  <tr>
    <td>`DatastoreThrottled`</td>
    <td>The request rate exceeds the allowed maximum for the `datastore`.</td>
    <td>Too many requests were sent to a single data store. </td>
  </tr>
  <tr>
    <td>`InternalServerError`</td>
    <td>An internal server error occurred.</td>
    <td>Occasional error on Roblox servers. Try again, ideally with exponential backoff.</td>
  </tr>
  <tr>
    <td>`InvalidExclusiveStartKey`</td>
    <td>The provided exclusive start key is not valid.</td>
    <td>The exclusive start key (cursor) provided to a list operation such as `Class.DataStore:ListKeysAsync()|ListKeysAsync()` is not valid.</td>
  </tr>
  <tr>
    <td>`InvalidPlace`</td>
    <td>The provided place is invalid.</td>
    <td>No matching Universe ID for the place. Try again later.</td>
  </tr>
  <tr>
    <td>`InvalidTarget`</td>
    <td>The provided target is invalid.</td>
    <td>Ordered data store key name exceeds the 50 character limit.</td>
  </tr>
  <tr>
    <td>`InvalidUniverse`</td>
    <td>The provided universe is invalid.</td>
    <td>No matching Place ID for the universe. Try again later.</td>
  </tr>
  <tr>
    <td>`InvalidUserIds`</td>
    <td>The provided user IDs have an invalid format.</td>
    <td>Failed to parse user IDs.</td>
  </tr>
  <tr>
    <td>`KeyThrottled`</td>
    <td>The request rate exceeds the allowed maximum for the key.</td>
    <td>The request rate exceeds the maximum allowed request rate for a single key.</td>
  </tr>
  <tr>
    <td>`KeyNotFound`</td>
    <td>The requested key doesn't exist.</td>
    <td>The key doesn't exist.</td>
  </tr>
  <tr>
    <td>`N/A`</td>
    <td>No pages to advance to.</td>
    <td>This error occurs when you call `Class.Pages:AdvanceToNextPageAsync()` on the last page.</td>
  </tr>
  <tr>
    <td>`StandardReadExperienceThrottled`</td>
    <td>The standard read request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.DataStore:GetAsync()|GetAsync()`, `Class.DataStore:GetVersionAsync()|GetVersionAsync()`, `Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`, or the read of `Class.DataStore:UpdateAsync()|UpdateAsync()` on a standard data store exceeded the `StandardRead` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`StandardWriteExperienceThrottled`</td>
    <td>The standard write request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.DataStore:SetAsync()|SetAsync()`, `Class.DataStore:IncrementAsync()|IncrementAsync()`, or the write of `Class.DataStore:UpdateAsync()|UpdateAsync()` on a standard data store exceeded the `StandardWrite` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`StandardListExperienceThrottled`</td>
    <td>The standard list request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.DataStore:ListKeysAsync()|ListKeysAsync()`, `Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`, or `Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()` on standard data stores exceeded the `StandardList` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`StandardRemoveExperienceThrottled`</td>
    <td>The standard remove request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.DataStore:RemoveAsync()|RemoveAsync()` on a standard data store exceeded the `StandardRemove` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`OrderedReadExperienceThrottled`</td>
    <td>The ordered read request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.OrderedDataStore:GetAsync()|GetAsync()` or the read of `Class.OrderedDataStore:UpdateAsync()|UpdateAsync()` on an ordered data store exceeded the `OrderedRead` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`OrderedWriteExperienceThrottled`</td>
    <td>The ordered write request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.OrderedDataStore:SetAsync()|SetAsync()`, `Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`, or the write of `Class.OrderedDataStore:UpdateAsync()|UpdateAsync()` on an ordered data store exceeded the `OrderedWrite` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`OrderedListExperienceThrottled`</td>
    <td>The ordered list request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()` on an ordered data store exceeded the `OrderedList` experience-level rate limit.</td>
  </tr>
  <tr>
    <td>`OrderedRemoveExperienceThrottled`</td>
    <td>The ordered remove request rate exceeds the allowed maximum for the experience.</td>
    <td>A request to `Class.OrderedDataStore:RemoveAsync()|RemoveAsync()` on an ordered data store exceeded the `OrderedRemove` experience-level rate limit.</td>
  </tr>
</tbody>
</table>

## Limits

Data models have **limits**. If an experience exceeds these limits, the service automatically throttles the experience's data store usage and causes future requests to be placed in one of the following queues:

- Set
- Ordered set
- Get
- Ordered get

Requests in a queue are handled in the order they are received. The called function continues to yield as long as its request is still queued. If the data store key itself is throttled, the request is placed in a queue but is temporarily skipped.

Each queue has a limit of 30 requests. When the limit of a queue is reached, requests fail with an error code in the 301-306 range, indicating that the requests have been dropped entirely.

### Access limits

Data stores are subject to both <b>experience and server-level limits</b>. Experience-level limits scale with total concurrent users across the experience, while server-level limits are configurable and meant to be used as a tool by the creator.

<h4>Experience Limits</h4>

Each experience is allowed a certain number of data store requests based on the data store type, request type, and number of concurrent users. For each data store type and request type, the limit is shared among all listed functions.

- `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` consumes from both the read and write request budgets. A single call will decrement both limits.
- Game server and Open Cloud **share** a budget; Open Cloud traffic can be throttled by in-experience usage (and vice versa). See [Control rate limits](#control-rate-limits) for further guidance.

<h5>Standard data stores</h5>

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>Game server API</th>
      <th>Open Cloud API</th>
      <th>Shared limits (requests per minute)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Read</b></td>
      <td>`Class.DataStore:GetAsync()|GetAsync()`<br></br>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`<br></br>`Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>Get Data Store Entry</td>
      <td>300 + concurrentUsers × 40</td>
    </tr>
    <tr>
      <td><b>Write</b></td>
      <td>`Class.DataStore:SetAsync()|SetAsync()`<br></br>`Class.DataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>Create, Update, Increment Data Store Entry</td>
      <td>300 + concurrentUsers × 20</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()`<br></br>`Class.DataStore:ListKeysAsync()|ListKeysAsync()`<br></br>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`</td>
      <td>List Data Stores, List Data Store Entries, List Data Store Entry Revisions</td>
      <td>300 + concurrentUsers × 2</td>
    </tr>
    <tr>
      <td><b>Remove</b></td>
      <td>`Class.DataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>Delete Data Store Entry, Delete Data Store, Undelete Data Store</td>
      <td>300 + concurrentUsers × 40</td>
    </tr>
  </tbody>
  </table>

<h5>Ordered data stores</h5>

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>Game server API</th>
      <th>Open Cloud API</th>
      <th>Shared limits (requests per minute)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Read</b></td>
      <td>`Class.OrderedDataStore:GetAsync()|GetAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>Get Ordered Data Store Entry</td>
      <td>300 + concurrentUsers × 40</td>
    </tr>
    <tr>
      <td><b>Write</b></td>
      <td>`Class.OrderedDataStore:SetAsync()|SetAsync()`<br></br>`Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>Create, Update, Increment Ordered Data Store Entry</td>
      <td>300 + concurrentUsers × 20</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()`</td>
      <td>List Ordered Data Store Entries</td>
      <td>300 + concurrentUsers × 2</td>
    </tr>
    <tr>
      <td><b>Remove</b></td>
      <td>`Class.OrderedDataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>Delete Ordered Data Store Entry</td>
      <td>300 + concurrentUsers × 40</td>
    </tr>
  </tbody>
  </table>

<h5 id="control-rate-limits">Control rate limits</h5>

Because Open Cloud and game server requests are shared, it is important to independently control how much each can consume from the budget.

<h6>Game server</h6>

Individual servers have built-in limits, as described above. Use a combination of `Class.DataStoreService:SetRateLimitForRequestType()|SetRateLimitForRequestType()` and `Class.DataStoreService:GetRequestBudgetForRequestType()|GetRequestBudgetForRequestType()` to maintain fine-grained control over individual servers' contribution to the total budget.

<h6>Open Cloud</h6>

Open Cloud requests require an external rate limiting solution. We recommend one of the following approaches:

- (Simple) Add a short timeout after each request, especially if calling the same API in a continuous loop. Set this timeout equal to `60 / (desired budget consumption per minute)` seconds, as an upper bound. Note that this approach does not allow requests to be sent in bursts.
- (Robust) Implement a local rate limiter using the leaky bucket strategy.

The following Node.js code samples include reference implementations.

<Tabs>
  <TabItem key = "1" label="Timeout rate limiting">

```js
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('The API_KEY environment variable is not set.');
}

const apiHeaderKey = 'x-api-key';

const universeId = '';
const dataStoreId = 'Inventory';

const baseUrl = 'https://apis.roblox.com/cloud/v2/';

// --- Per-operation rate limiting config (requests per minute) ---
const LIST_RATE_PER_MIN = 60;
const GET_RATE_PER_MIN = 120;
const UPDATE_RATE_PER_MIN = 60;

// Upper-bound spacing per operation: 60 / (requests per min) seconds.
const LIST_INTERVAL_MS = (60 / LIST_RATE_PER_MIN) * 1000;
const GET_INTERVAL_MS = (60 / GET_RATE_PER_MIN) * 1000;
const UPDATE_INTERVAL_MS = (60 / UPDATE_RATE_PER_MIN) * 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Performs the request, then waits this operation's own interval before returning.
async function throttledFetch(url, options, intervalMs) {
    const response = await fetch(url, options);
    await sleep(intervalMs);
    return response;
}

async function listEntries(universe, dataStore) {
    const listPath = `universes/${universe}/data-stores/${dataStore}/entries`;
    const url = baseUrl + listPath;
    const response = await throttledFetch(url, {
        headers: { [apiHeaderKey]: apiKey }
    }, LIST_INTERVAL_MS);
    return response.json();
}

async function getEntry(path) {
    const url = baseUrl + path;
    const response = await throttledFetch(url, {
        headers: { [apiHeaderKey]: apiKey }
    }, GET_INTERVAL_MS);
    return response.json();
}

async function updateEntry(path, payload) {
    const url = baseUrl + path;
    const response = await throttledFetch(url, {
        method: 'PATCH',
        headers: {
            [apiHeaderKey]: apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // The body must be a string
    }, UPDATE_INTERVAL_MS);
    return response;
}

(async () => {
    try {
        const entries = await listEntries(universeId, dataStoreId);

        for (const entry of entries.dataStoreEntries) {
            const path = entry.path;
            console.log(`\nProcessing entry: ${path}`);

            const currentData = await getEntry(path);

            currentData.value.currency += 10;

            const payload = { value: currentData.value };

            const updateResponse = await updateEntry(path, payload);

            console.log(`Status: ${updateResponse.status}`);
            console.log(`Response: ${await updateResponse.text()}`);
        }
    } catch (error) {
        console.error('An error occurred during execution:', error);
    }
})();
```

  </TabItem>
  <TabItem key = "2" label="Leaky bucket rate limiting">

```js
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('The API_KEY environment variable is not set.');
}

const apiHeaderKey = 'x-api-key';

const universeId = '';
const dataStoreId = 'Inventory';

const baseUrl = 'https://apis.roblox.com/cloud/v2/';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Leaky bucket rate limiter ---
// `capacity`      : max burst size (how full the bucket can get).
// `leakRatePerSec`: steady drain rate == sustained requests/sec allowed.
class LeakyBucket {
    constructor({ capacity, leakRatePerSec }) {
        this.capacity = capacity;
        this.leakRatePerSec = leakRatePerSec;
        this.level = 0;
        this.lastLeak = Date.now();
        // Serialize acquisitions so concurrent callers queue fairly.
        this.tail = Promise.resolve();
    }

    _leak() {
        const now = Date.now();
        const elapsedSec = (now - this.lastLeak) / 1000;
        this.level = Math.max(0, this.level - elapsedSec * this.leakRatePerSec);
        this.lastLeak = now;
    }

    // Resolves once there is room in the bucket for one more request.
    acquire() {
        const attempt = this.tail.then(async () => {
            this._leak();
            while (this.level + 1 > this.capacity) {
                const overflow = this.level + 1 - this.capacity;
                const waitMs = (overflow / this.leakRatePerSec) * 1000;
                await sleep(waitMs);
                this._leak();
            }
            this.level += 1;
        });
        // Keep the chain alive even if a caller rejects.
        this.tail = attempt.catch(() => {});
        return attempt;
    }
}

// --- One bucket per operation ---
// Example: list bursts of 5 @ 1/sec, get bursts of 10 @ 2/sec, update bursts of 5 @ 1/sec.
const listBucket = new LeakyBucket({ capacity: 5, leakRatePerSec: 1 });
const getBucket = new LeakyBucket({ capacity: 10, leakRatePerSec: 2 });
const updateBucket = new LeakyBucket({ capacity: 5, leakRatePerSec: 1 });

// Waits for the given bucket's capacity before each request.
async function rateLimitedFetch(bucket, url, options) {
    await bucket.acquire();
    return fetch(url, options);
}

async function listEntries(universe, dataStore) {
    const listPath = `universes/${universe}/data-stores/${dataStore}/entries`;
    const url = baseUrl + listPath;
    const response = await rateLimitedFetch(listBucket, url, {
        headers: { [apiHeaderKey]: apiKey }
    });
    return response.json();
}

async function getEntry(path) {
    const url = baseUrl + path;
    const response = await rateLimitedFetch(getBucket, url, {
        headers: { [apiHeaderKey]: apiKey }
    });
    return response.json();
}

async function updateEntry(path, payload) {
    const url = baseUrl + path;
    const response = await rateLimitedFetch(updateBucket, url, {
        method: 'PATCH',
        headers: {
            [apiHeaderKey]: apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // The body must be a string
    });
    return response;
}

(async () => {
    try {
        const entries = await listEntries(universeId, dataStoreId);

        for (const entry of entries.dataStoreEntries) {
            const path = entry.path;
            console.log(`\nProcessing entry: ${path}`);

            const currentData = await getEntry(path);

            currentData.value.currency += 10;

            const payload = { value: currentData.value };

            const updateResponse = await updateEntry(path, payload);

            console.log(`Status: ${updateResponse.status}`);
            console.log(`Response: ${await updateResponse.text()}`);
        }
    } catch (error) {
        console.error('An error occurred during execution:', error);
    }
})();
```

  </TabItem>
</Tabs>

<h4>Server limits</h4>

Each server has a configurable rate limit for each request type, based on the number of players in that server. Servers receive a one-time startup burst of additional request budget when they are first created. Use `Class.DataStoreService:GetRequestBudgetForRequestType()|GetRequestBudgetForRequestType()` to confirm the number of data store requests that the current server can make at any given time.

These limits are **configurable by the creator** using the
`Class.DataStoreService:SetRateLimitForRequestType()|SetRateLimitForRequestType()` API. Using this API, a creator can configure their own data stores rate limits for each request type.

The following **default rate limits** apply if the API is not called:

<h5>Standard data stores</h5>

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>`DataStoreRequestType` Enum</th>
      <th>Game server API</th>
      <th>Requests per minute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Read</b></td>
      <td>`StandardRead`</td>
      <td>`Class.DataStore:GetAsync()|GetAsync()`<br></br>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`<br></br>`Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>60 + numPlayers × 40</td>
    </tr>
    <tr>
      <td><b>Write</b></td>
      <td>`StandardWrite`</td>
      <td>`Class.DataStore:SetAsync()|SetAsync()`<br></br>`Class.DataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>60 + numPlayers × 40</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`StandardList`</td>
      <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()`<br></br>`Class.DataStore:ListKeysAsync()|ListKeysAsync()`<br></br>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
    <tr>
      <td><b>Remove</b></td>
      <td>`StandardRemove`</td>
      <td>`Class.DataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>60 + numPlayers × 40</td>
    </tr>
    <tr>
      <td><b>RemoveVersion (Deprecated)</b></td>
      <td>`RemoveVersionAsync`</td>
      <td>`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
  </tbody>
  </table>

<h5>Ordered data stores</h5>

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>`DataStoreRequestType` Enum</th>
      <th>Game server API</th>
      <th>Requests per minute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Read</b></td>
      <td>`OrderedRead`</td>
      <td>`Class.OrderedDataStore:GetAsync()|GetAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>60 + numPlayers × 40</td>
    </tr>
    <tr>
      <td><b>Write</b></td>
      <td>`OrderedWrite`</td>
      <td>`Class.OrderedDataStore:SetAsync()|SetAsync()`<br></br>`Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>30 + numPlayers × 5</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`OrderedList`</td>
      <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
    <tr>
      <td><b>Remove</b></td>
      <td>`OrderedRemove`</td>
      <td>`Class.OrderedDataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>30 + numPlayers × 5</td>
    </tr>
  </tbody>
  </table>

  <Alert severity="info">
    Data store requests made in Studio Run mode are subject to a separate set of static limits, which may be lower than the limits configured with `Class.DataStoreService:SetRateLimitForRequestType()|SetRateLimitForRequestType()`. When testing rate limits, we recommend using Studio Team Create instead.
  </Alert>

### Data limits

Data stores limit how much data can be used per entry.

The data store name, key name, and [scope](./versioning-listing-and-caching.md#scopes) must all be under a certain character length. Use `Library.string.len()` to check their length.

The data (key value) is also stored as a string, regardless of its initial type. You can check the size of the data with the `Class.HttpService:JSONEncode()|JSONEncode()` function, which converts Luau data into a serialized JSON table.

<table>
<thead>
  <tr>
    <th>Component</th>
    <th>Maximum number of characters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Data store name</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Key name</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Scope</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Data (key value)</td>
    <td>4,194,304 per key</td>
  </tr>
</tbody>
</table>

### Metadata limits

Limits to the number of characters in user-defined metadata.

<table>
<thead>
  <tr>
    <th>Component</th>
    <th>Maximum number of characters</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Key name</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Value</td>
    <td>250</td>
  </tr>
  <tr>
    <td>Key-value pairs</td>
    <td>300</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
  There's no limit to the total number of key-value pairs, but the total size can't exceed 300 characters.
</Alert>

### Throughput limits

Per-key throughput limits ensure that performance is optimal on Roblox servers. Each limit applies to every single key across all servers in an experience and refreshes over time.

Roblox examines the usage of quota associated with the key over the last 60 seconds. If the usage, including the current request, is within the throughput limit, the request is approved. If the usage exceeds the limit, the request is denied.

<table>
<thead>
  <tr>
    <th>Request type</th>
    <th>Game server API</th>
    <th>Open Cloud API</th>
    <th>Limit</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Read</td>
    <td>`Class.DataStore:GetAsync()|GetAsync()`<br></br>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`<br></br>`Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`<br></br>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
    <td>Get Data Store Entry</td>
    <td>25 MB per minute</td>
  </tr>
  <tr>
    <td>Write</td>
    <td>`Class.DataStore:SetAsync()|SetAsync()`<br></br>`Class.DataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`<br></br>`Class.DataStore:RemoveAsync()|RemoveAsync()`</td>
    <td>Create, Update, Increment, Remove Data Store Entry</td>
    <td>4 MB per minute</td>
  </tr>
</tbody>
</table>

In addition to the above throughput limits, Roblox organizes data into partitions based on an internal schema. As a result, when the backend server receives a high volume of requests to the same data store, it can result in further throttling. Regardless of the cause, throttling manifests as either `DatastoreThrottled` or `KeyThrottled` errors, depending on whether the throughput limit was exceeded for a single data store or a key. These error messages apply to both ordered and standard data stores.

<Alert severity="info">
For every request, Roblox rounds throughput up to the next kilobyte. For example, if you write 800 bytes and 1.2 KB in two requests, Roblox counts that as 3 KB total throughput (1 KB and 2 KB, respectively).
</Alert>

### Storage limits

To keep storage stable and scalable, data stores use a game-level limit on your storage usage.

This limit consists of a base allocation for each game plus an additional allocation based on the number of lifetime users. A lifetime user is any user who has joined your game at least once.

The storage limit is calculated using the following formula `Total latest version storage limit = 500 MB + 1 MB × lifetime user count`.

Storage usage is measured using the **compressed size** of the latest version of each key. Data stores automatically compress your data before storage, so avoid pre-compressing it yourself. Pre-compression adds unnecessary CPU overhead and may reduce the effectiveness of data stores' built-in compression. By storing uncompressed data, you automatically benefit from improvements to Roblox's compression algorithms and future schema-based optimizations.

Only the latest version of each key counts toward your storage usage. Deleted keys and superseded versions, while still accessible through version APIs during their retention period, do not count toward your storage usage. However, data stores deleted through the Open Cloud [`DeleteDataStore`](/cloud/reference/features/storage#Cloud_DeleteDataStore) method continue to count toward storage usage during their 30-day deletion processing period, until they are permanently removed.
