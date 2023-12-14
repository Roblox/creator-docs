---
title: Handling API Requests for Data Stores
description: Explains how to properly handle parameters of Open Cloud API requests for data stores.
---

Before sending requests to Open Cloud APIs for [standard data stores](../../reference/cloud/datastores-api/v1.json) and [ordered data stores](../../reference/cloud/datastores-api/ordered-v1.json), you need to understand how to handle them properly. For information on the usage of the API, see the [Usage Guide](./usage-data-stores.md).

## Authorization

Like all Open Cloud APIs, data store endpoints require all requests to include the `x-api-key` header, which contains an API key with enough permissions for the request. This requires you to apply the key to the experience and the data store, and the endpoint operation is permitted. If the key is invalid, `403 Unauthorized` is returned. For more information on API keys, see [Managing API Keys](api-keys.md).

## Throttling

All endpoints have two types of universe level throttling: **request-per-minute throttling** and **throughput throttling**. With every experience, **request-per-minute throttling** allows you to send a certain number of requests per minute, and **throughput throttling** allows you to send a certain amount of data per minute, regardless of the number of API keys.

Unlike the Lua API, these limits currently do not scale based on user counts. Exceeding these limits causes the endpoint to return `429 Too Many Requests`.

### Standard Data Stores Throttling Limits

<table>
  <thead>
    <tr>
      <th>Request Type</th>
      <th>Method</th>
      <th>Throttle Limits</th>
    </tr>
    <tr>
      <td>Write</td>
      <td>
        <ul>
          <li>Set Entry</li>
          <li>Increment Entry</li>
          <li>Delete Entry</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>10 MB/min/universe write throughput</li>
          <li>300 reqs/min/universe</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Read</td>
      <td>
        <ul>
          <li>List Data Stores</li>
          <li>List Entries</li>
          <li>Get Entry</li>
          <li>List Entry Versions</li>
          <li>Get Entry Version</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>20 MB/min/universe write throughput</li>
          <li>300 reqs/min/universe</li>
        </ul>
      </td>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

### Ordered Data Stores Throttling Limits

<table>
  <thead>
    <tr>
      <th>Request Type</th>
      <th>Method</th>
      <th>Throttle Limits</th>
    </tr>
    <tr>
      <td>Write</td>
      <td>
        <ul>
          <li>Create</li>
          <li>Increment</li>
          <li>Update</li>
          <li>Delete</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>300 reqs/min/universe</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Read</td>
      <td>
        <ul>
          <li>List</li>
          <li>Get</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>300 reqs/min/universe</li>
        </ul>
      </td>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>

## Input Validation

Before sending your request, make sure to validate endpoint parameters on formatting requirements and constraints based on the following table. Individual endpoints can have additional requirements beyond these. If a parameter doesn't satisfy the following restrictions, the endpoint returns a `400 Bad Request`.

<Alert severity="info">
Ordered Data Stores endpoints use [Perfect-Encoding](https://www.rfc-editor.org/rfc/rfc3986#section-2.1) for all query and body parameters. Unless you have special characters in your parameter values that break URLs, you don't need to handle encoding yourself.
</Alert>

<table>
<thead>
  <tr>
    <th>Input</th>
    <th>Type</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`universeId`</td>
    <td>number</td>
    <td>
    <ul>
    <li>The unique identifier of your experience. See [Universe ID](#universe-id).</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>`datastoreName`</td>
    <td>string</td>
    <td>
    <ul>
    <li>Length must be 50 bytes or less.</li>
    <li>Can't be null or empty.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>`scope`</td>
    <td>string</td>
    <td>
      <ul>
        <li>The scope of a data store. See [Scopes](#scopes).</li>
        <li>Length must be 50 bytes or less.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>`entryKey`</td>
    <td>string</td>
    <td>
    <ul>
    <li>Length must be 50 bytes or less.</li>
    <li>Can't be null or empty.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>`content-md5`</td>
    <td>string</td>
    <td>
    <ul>
      <li>The [base-64 encoded MD5 checksum](https://datatracker.ietf.org/doc/html/rfc1864#page-2) of content. See [Content-MD5](#content-md5).</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>`roblox-entry-attributes`</td>
    <td>string</td>
    <td>
    <ul>
    <li>Serialized by JSON object.</li>
    <li>Length must be less than 300 bytes.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>`roblox-entry-userids`</td>
    <td>String</td>
    <td>
    <ul>
    <li>Serialized by JSON array of 0-4 numbers.</li>
    <li>No more than 4 user IDs.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>`cursor`</td>
    <td>string</td>
    <td>
    <ul>
    <li>An indicator of more data available in the requested result set. See <a href="#cursors">Cursors</a>.</li>
    </ul>
    </td>
  </tr>
</tbody>
</table>

### Universe ID

The **Universe ID** is the unique identifier of the experience in which you want to access your data stores. The value of an experience's Universe ID is the value of its `Class.DataModel.GameId`, **not** the same as the **Starting Place ID**, which identifies the starting place of an experience rather than the entire experience.

You can obtain the **Universe ID** of an experience with the following steps:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
2. Find the experience with data stores that you want to access.
3. Click the **&ctdot;** button on the target experience's thumbnail to display a list of options, then select **Copy Universe ID**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Copy-Universe-ID.png" width="420" alt="Copy Universe ID option from Creator Dashboard" />

### Scopes

You can organize your data stores by setting a unique string as a scope that specifies a subfolder for the entry. Once you set a scope, it automatically prepends to all keys in all operations done on the data store. Scopes are optional and by default as `global` for standard data stores but required for ordered data stores.

<Alert severity="warning">
It is **strongly recommended** to use the `prefix` parameter instead of `scope` for sorting and listing **standard** data stores.
</Alert>

The scope categorizes your data with a string and a separator with "/", such as:

<table>
<thead>
  <tr>
    <td>Key</td>
    <td>Scope</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td>houses/User_1</td>
    <td>houses</td>
  </tr>
  <tr>
    <td>pets/User_1</td>
    <td>pets</td>
  </tr>
  <tr>
    <td>inventory/User_1</td>
    <td>inventory</td>
  </tr>
</tbody>
</table>

All data store entry operation methods have a `Scope` parameter for when you need to access the entries stored under a non-default scope. For example, you might have a `1234` key under the default `global` scope, and the same key under `special` scope. You can access the former without using the scope parameter, but to access the latter, you have to specify the scope parameter as `special` in [`Get Entry`](../../reference/cloud/datastores-api/v1.json#get-entry) or [`Increment Entry`](../../reference/cloud/datastores-api/v1.json#increment-entry) API calls.

Additionally, if you want to enumerate all the keys stored in a data store that has one or multiple non-default scopes, you can set the `AllScopes` parameter in [`List Entries`](../../reference/cloud/datastores-api/v1.json#list-entries) method to be `true`, in which case the call returns a tuple with key string and scope. In the previous example, the [`List Entries`](../../reference/cloud/datastores-api/v1.json#list-entries) would return both (`1234`, `global`), and (`1234`, `special`) in the response.

You can't pass `Scope` and `AllScopes` parameters on the same request, otherwise the call returns an error. Leveraging the helping functions from the Open Cloud APIs for data stores module, the following code illustrates how you can read every key in a data store with a custom scope:

```python title='List Keys for Different Scopes'
# Set up
import tutorialFunctions
DatastoresApi = tutorialFunctions.DataStores()
datastoreName = "PlayerInventory"

# List keys for global scope
specialScopeKeys = DatastoresApi.list_entries(datastoreName, scope = "global",  allScopes = False)
print(keys.content)
# List keys for special scope
specialScopeKeys = DatastoresApi.list_entries(datastoreName, scope = "special", allScopes = False)
print(keys.content)
# List keys for allScope set to true
specialScopeKeys = DatastoresApi.list_entries(datastoreName, allScopes = True)
print(specialScopeKeys.content)
```

Keys with the corresponding scope are returned in the response:

```json title='Example Responses for Different Scopes'

// Response for global scope
{ "keys": [{ "scope": "global", "key": "User_2" }], "nextPageCursor": "" }

// Response for special scope
{"keys":[{"scope":"special","key":"User_6"},{"scope":"special","key":"User_7"}],"nextPageCursor":""}

// Response for AllScopes
{"keys":[{"scope":"global","key":"User_3"},{"scope":"global","key":"User_4"},{"scope":"global","key":"User_5"},{"scope":"special","key":"User_6"},{"scope":"special","key":"User_7"}],"nextPageCursor":""}
```

### Content-MD5

Content-MD5 is the [base-64 encoded MD5 checksum](https://datatracker.ietf.org/doc/html/rfc1864#page-2) of content. It's an optional request header for the [Set Entry](../../reference/cloud/datastores-api/v1.json#POST-_universeId_-standard-datastores-datastore-entries-entry) endpoint that checks the data integrity and detects potential issues.

<Alert severity="warning">
If you don't include the `content-md5` header in your request, there is a chance, though low probability, that you might experience data corruption.
</Alert>

You can use the language of your choice to calculate the value of the `content-md5` header. The following example uses Python. The [hashlib.md5()](https://docs.python.org/3/library/hashlib.html) and [base64.b64encode()](https://docs.python.org/3/library/base64.html#base64.b64encode) functions are available in Python standard libraries (2.7, 3+).

```python title='Generating Content-MD5'
# With prompts
$ python -c "import base64, hashlib; print('content-md5: ' + str(base64.b64encode(hashlib.md5(bytes(input('content: '), encoding='utf8')).digest()), encoding='utf8'))"
content: 750
content-md5: sTf90fedVsft8zZf6nUg8g==
# Using just stdin and stdout
$ echo "750" | python -c "import base64, hashlib; print(str(base64.b64encode(hashlib.md5(bytes(input(), encoding='utf8')).digest()), encoding='utf8'))"
sTf90fedVsft8zZf6nUg8g==
```

If you run into issues generating a valid `content-md5` value, you might need to encode your request body in UTF-8 binary before computing the checksum.

### Cursors

Endpoints that return lists of data might also return a `nextPageCursor` string. This indicates that there is more data available in the requested result set. To receive it, provide this string in the `cursor` query parameter on a subsequent request. If the cursor parameter is provided but invalid, the endpoint returns `400 Bad Request`.

The format of cursor strings is **not defined**. You should not interpret or parse them as they may change at any time.

### Filters

When sending requests to the [`List`](../../reference/cloud/datastores-api/ordered-v1.json#list) method for ordered data stores, you can add an optional `filter` query parameter to return entries with values in a specified range.

The `filter` parameter supports one logic operator, `&&`, and two comparison operators, `<=` for setting the maximum value and `>=` for setting the minimum value. If you want to set a range with both a max and min value, add `&&` between the two sequences.

For example, to return entries with values that are less than or equal to 10, you need to input `entry <= 10` as the `filter` value. To return entries with values between 10 and 50, input `entry <= 50 && entry >= 10`.

<Alert severity="info">
To input a valid `filter` value, you need to format all `filter` strings with a whitespace between each part of the sequence. The left part of each sequence must start with 'entry', and the right part must have a numerical value. `Filter` strings are also case-sensitive.
</Alert>

The following examples are incorrect `filter` values that can fail your requests:

- `entry <= 10` - no whitespace between each part of the sequence.
- `10 <= entry` - `entry` and the comparison value are on the wrong side.
- `entry <= 10 && entry <= 50` - `&&` can only be used to specify a range with both two comparison operators for the min and max value.

### Allow Missing Flags

When sending requests to the [`Update`](../../reference/cloud/datastores-api/ordered-v1.json#update) method to update an existing ordered data store entry, you can add an optional `allow_missing` flag to allow the creation of an entry even if the entry doesn't exist.

When you set the `allow_missing` flag to `True`:

- If the entry doesn't exist, the response returns a new entry.

- If the entry exists but the content matches the existing value of the entry, the existing entry remains unchanged.

- If the entry exists and the content doesn't match the existing value of the entry, the response returns the entry with the updated new content value.
