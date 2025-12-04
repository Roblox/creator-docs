---
title: Data store error codes and limits
description: Error codes you might encounter and limits you might hit when using data stores (DataStores) to store data.
---

Requests you make to data stores can fail due to poor connectivity or other issues. To handle errors and return messages with an error code, wrap data store functions in `Global.LuaGlobals.pcall()`.

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
    <td>API access must be active in order to use Data Stores in Studio.</td>
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
    <td>The key requested wasn't found in the Data Store. This might be a sign of data corruption. Try again later.</td>
  </tr>
  <tr>
    <td>`504`</td>
    <td>`InternalError`</td>
    <td>Data Store request was successful but the response wasn't formatted correctly.</td>
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
    <td>Data Store operations are blocked while running on a Personal RCC to prevent possible data corruption.</td>
    <td>Data Store writes are blocked on private RCC channels.</td>
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
    <td>`DatastoreThrottled`</td>
    <td>The request rate exceeds the allowed maximum for the `datastore`.</td>
    <td>Too many requests were sent to a single Data Store. </td>
  </tr>
  <tr>
    <td>`InternalServerError`</td>
    <td>An internal server error occurred.</td>
    <td>Occasional error on Roblox servers. Try again, ideally with exponential backoff.</td>
  </tr>
  <tr>
    <td>`InvalidPlace`</td>
    <td>The provided place is invalid.</td>
    <td>No matching Universe ID for the place. Try again later.</td>
  </tr>
  <tr>
    <td>`InvalidTarget`</td>
    <td>The provided target is invalid.</td>
    <td>Ordered Data Store key name exceeds the 50 character limit.</td>
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

### Server limits

<Tabs>
<TabItem label="Server limits">
  Each server is allowed a certain number of data store requests based on the request type and number of users. Servers often receive a one-time allotment of additional requests when they first start up. Use `Class.DataStoreService:GetRequestBudgetForRequestType()|GetRequestBudgetForRequestType()` to confirm the number of data store requests that the current place can make.

  For each request type, the limit is shared among all listed functions.

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>Functions</th>
      <th>Requests per minute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Get</b></td>
      <td>`Class.GlobalDataStore:GetAsync()|GetAsync()`</td>
      <td>60 + numPlayers × 10</td>
    </tr>
    <tr>
      <td><b>Set</b></td>
      <td>`Class.DataStore:SetAsync()|SetAsync()`<br></br>`Class.DataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`<br></br>`Class.DataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>60 + numPlayers × 10</td>
    </tr>
    <tr>
      <td><b>Get Sorted</b></td>
      <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
    <tr>
      <td><b>Ordered Set</b></td>
      <td>`Class.OrderedDataStore:SetAsync()|SetAsync()`<br></br>`Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`<br></br>`Class.OrderedDataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>30 + numPlayers × 5</td>
    </tr>
    <tr>
      <td><b>Get Version</b></td>
      <td>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`<br></br>`Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()`<br></br>`Class.DataStore:ListKeysAsync()|ListKeysAsync()`<br></br>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
    <tr>
      <td><b>Remove Version</b></td>
      <td>`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()`</td>
      <td>5 + numPlayers × 2</td>
    </tr>
  </tbody>
  </table>
</TabItem>
<TabItem label="Future experience limits">

  <Alert severity="info">
  Server limits will be replaced by experience-level limits starting in 2026.
  </Alert>

  Each experience is allowed a certain number of data store requests based on the data store type, request type, and number of concurrent users. For each data store type and request type, the limit is shared among all listed functions.
  
  Note that `Class.GlobalDataStore:UpdateAsync()|UpdateAsync()` will consume from both the read and write request limits.

  <h5>Standard data stores</h5>

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>Functions</th>
      <th>Requests per minute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Read</b></td>
      <td>`Class.DataStore:GetAsync()|GetAsync()`<br></br>`Class.DataStore:GetVersionAsync()|GetVersionAsync()`<br></br>`Class.DataStore:GetVersionAtTimeAsync()|GetVersionAtTimeAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>250 + concurrentUsers × 40</td>
    </tr>
    <tr>
      <td><b>Write</b></td>
      <td>`Class.DataStore:SetAsync()|SetAsync()`<br></br>`Class.DataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.DataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>250 + concurrentUsers × 20</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`Class.DataStoreService:ListDataStoresAsync()|ListDataStoresAsync()`<br></br>`Class.DataStore:ListKeysAsync()|ListKeysAsync()`<br></br>`Class.DataStore:ListVersionsAsync()|ListVersionsAsync()`</td>
      <td>10 + concurrentUsers × 2</td>
    </tr>
    <tr>
      <td><b>Remove</b></td>
      <td>`Class.DataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>100 + concurrentUsers × 40</td>
    </tr>
    <tr>
      <td><b>RemoveVersion (deprecated)</b></td>
      <td>`Class.DataStore:RemoveVersionAsync()|RemoveVersionAsync()`</td>
      <td>5 + concurrentUsers × 2</td>
    </tr>
  </tbody>
  </table>

  <h5>Ordered data stores</h5>

  <table>
  <thead>
    <tr>
      <th>Request type</th>
      <th>Functions</th>
      <th>Requests per minute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Read</b></td>
      <td>`Class.OrderedDataStore:GetAsync()|GetAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>250 + concurrentUsers × 40</td>
    </tr>
    <tr>
      <td><b>Write</b></td>
      <td>`Class.OrderedDataStore:SetAsync()|SetAsync()`<br></br>`Class.OrderedDataStore:IncrementAsync()|IncrementAsync()`<br></br>`Class.OrderedDataStore:UpdateAsync()|UpdateAsync()`</td>
      <td>250 + concurrentUsers × 20</td>
    </tr>
    <tr>
      <td><b>List</b></td>
      <td>`Class.OrderedDataStore:GetSortedAsync()|GetSortedAsync()`</td>
      <td>100 + concurrentUsers × 2</td>
    </tr>
    <tr>
      <td><b>Remove</b></td>
      <td>`Class.OrderedDataStore:RemoveAsync()|RemoveAsync()`</td>
      <td>100 + concurrentUsers × 40</td>
    </tr>
  </tbody>
  </table>
</TabItem>
</Tabs>

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

In addition to the above throughput limits, Roblox organizes data into partitions based on an internal schema. As a result, when the backend server receives a high volume of requests to the same data store, it can result in further throttling. Regardless of the cause, throttling manifests as either `DatastoreThrottled` or `KeyThrottled` errors, depending on whether the throughput limit was exceeded for a single data store or a key. These error messages apply to both ordered and standard data stores.

<Alert severity="info">
  For every request, Roblox rounds throughput up to the next kilobyte. For example, if you write 800 bytes and 1.2 KB in two requests, Roblox counts that as 3 KB total throughput (1 KB and 2 KB, respectively).
</Alert>

### Storage limits

<Tabs>
<TabItem label="Storage limits">
  Currently, there are no enforced storage limits on data stores.
</TabItem>
<TabItem label="Future storage limits">
  In the future, to provide a scalable and stable storage experience, data stores will implement an experience-level storage limit on your storage usage.

This limit will be the sum of a base limit for each of your experiences and a per-user limit based on the number of lifetime users in your experience. A lifetime user is any user who has joined your experience at least once.

The storage limit will be calculated using the formula `Total latest version storage limit = 100 MB + 1 MB * lifetime user count`.

Any data that you delete or replace, even if still accessible through version APIs, will not count towards your experience's storage usage.
</TabItem>
</Tabs>
