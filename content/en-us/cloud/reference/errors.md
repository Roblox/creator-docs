---
title: Errors
description: Defines the errors that are returned by Open Cloud APIs
---

The following sections describe the error model for v2 and v1 resource methods,
respectively.

## v2 Resource Error Model

By default, resource methods respond with a 200 OK status. When requests are
unsuccessful, Open Cloud returns standard error codes. All error responses have
the same format, which include:

- `code` - Represents the HTTP status code.
- `message` - A message that explains the error.
- `details` - An object that contains more information specific to the error.

```json title='Example Error'
{
  "code": "INVALID_ARGUMENT",
  "message": "The provided filter is invalid.",
  "details": [
    {
      ...
    }
  ]
}
```

### Codes

The following table describes possible values for `code`.

<table>
  <thead>
    <tr>
      <th>Code</th>
      <th>HTTP Status</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`INVALID_ARGUMENT`</td>
      <td>400</td>
      <td>You passed an invalid argument, such as an invalid `universeId`.</td>
    </tr>
    <tr>
      <td>`PERMISSION_DENIED`</td>
      <td>403</td>
      <td>Your request doesn't have sufficient permissions or scopes to perform the operation.</td>
    </tr>
    <tr>
      <td>`NOT_FOUND`</td>
      <td>404</td>
      <td>The system can't find your specified resources, such as a data store entry.</td>
    </tr>
    <tr>
      <td>`ABORTED`</td>
      <td>409</td>
      <td>The operation was aborted.</td>
    </tr>
    <tr>
      <td>`RESOURCE_EXHAUSTED`</td>
      <td>429</td>
      <td>You don't have enough quota to perform the operation, typically due to sending too many requests.</td>
    </tr>
    <tr>
      <td>`CANCELLED`</td>
      <td>499</td>
      <td>The system terminates the request, typically due to a client side timeout.</td>
    </tr>
    <tr>
      <td>`INTERNAL`</td>
      <td>500</td>
      <td>Internal server error, typically due to a server bug.</td>
    </tr>
    <tr>
      <td>`NOT_IMPLEMENTED`</td>
      <td>501</td>
      <td>The server doesn't implement the API method.</td>
    </tr>
    <tr>
      <td>`UNAVAILABLE`</td>
      <td>503</td>
      <td>Service is unavailable, typically returned when the server is down.</td>
    </tr>
  </tbody>
</table>

## v1 Resource Error Model

All error responses have the same, standard format, which includes:

- An `error` field, which is a high-level cause that is applicable to all Open Cloud endpoints.
- An explanatory error `message`, which further explains the error.
- An `errorDetails` object, which covers more information of the error that is specific to each API.

To analyze the root cause of an error, refer to the value of the `error` field and the `errorDetails` field. Use the `message` field as a supplementary for error handling, as sometimes it might not cover the same level of details as the `errorDetails` field.

```json title='Example Standard DataStores Error Response'
{
  "error": "INVALID_ARGUMENT",
  "message": "Invalid cursor.",
  "errorDetails": [
    {
      "errorDetailType": "DatastoreErrorInfo",
      "datastoreErrorCode": "InvalidCursor"
    }
  ]
}
```

The example error response shows the high-level Open Cloud `error` as `INVALID_ARGUMENT`, the error `message` as `InvalidCursor`, and the `errorDetails` specific to [data stores](../../reference/cloud/datastores-api/v1.json) with the `datastoreErrorCode` as `InvalidCursor`. From the `error` and `datastoreErrorCode` fields of the response, you can understand that you passed an invalid cursor parameter that caused the error. You can then correct your cursor parameter to resolve the issue.

All ordered data stores error responses have the same format, which includes:

```json title='Example Ordered DataStores Error Response'
{
  "code": "INVALID_ARGUMENT",
  "message": "Invalid cursor."
}
```

The `code` will contain a string of the high-level error while the `message` will contain specific details related to the error

### Codes

Reference the following table for a summary of all high-level Open Cloud errors.

<table>
  <thead>
    <tr>
      <th>HTTP Status Code</th>
      <th>Error</th>
      <th>Descriptions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>400</td>
      <td>INVALID_ARGUMENT</td>
      <td>You passed an invalid argument, such as an invalid `universeId`.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>INSUFFICIENT_SCOPE</td>
      <td>The request requires higher privileges than provided by the access token.</td>
    </tr>
    <tr>
      <td>403</td>
      <td>PERMISSION_DENIED</td>
      <td>Your request doesn't have sufficient scope to perform the operation.</td>
    </tr>
    <tr>
      <td>404</td>
      <td>NOT_FOUND</td>
      <td>The system can't find your specified resources, such as a data store.</td>
    </tr>
    <tr>
      <td>409</td>
      <td>ABORTED</td>
      <td>The operation was aborted due to a conflict, such as publishing a place that is not part of the universe.</td>
    </tr>
    <tr>
      <td>429</td>
      <td>RESOURCE_EXHAUSTED</td>
      <td>You don't have enough quota to perform the operation, typically due to sending too many requests.</td>
    </tr>
    <tr>
      <td>499</td>
      <td>CANCELLED</td>
      <td>The system terminates the request, typically due to a client side timeout.</td>
    </tr>
    <tr>
      <td>500</td>
      <td>INTERNAL</td>
      <td>Internal server error. Typically a server bug.</td>
    </tr>
    <tr>
      <td>501</td>
      <td>NOT_IMPLEMENTED</td>
      <td>The server doesn't implement the API method.</td>
    </tr>
    <tr>
      <td>503</td>
      <td>UNAVAILABLE</td>
      <td>Service unavailable. Typically the server is down.</td>
    </tr>
  </tbody>
</table>
