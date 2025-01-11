---
title: Open Cloud Error Handling
description: Explains the error model of Open Cloud web APIs.
---

To handle error responses properly, you need to understand the error model shared by all Open Cloud endpoints.

## Error Model

All standard data stores error responses have the same format, which includes:

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

## Error Codes

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
