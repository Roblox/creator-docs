---
title: Errors
description: Defines the errors that are returned by Open Cloud APIs
---

The following sections describe the error handling for Open Cloud APIs. Due to implementation differences across endpoints and validation layers, error responses can vary significantly in format.

## Gateway errors

For authentication or routing issues, both Open Cloud v1 and v2 APIs may return errors in this format:

```json title="Example gateway error"
{
  "errors": [
    {
      "code": 0,
      "message": "Invalid API Key"
    }
  ]
}
```

## Open Cloud v2

Open Cloud v2 APIs generally follow a consistent error format when the error occurs within the API endpoint itself.

### Standard v2 error format

Open Cloud v2 APIs return errors in this format:

- `code` - A string representing the error type (e.g. `INVALID_ARGUMENT`, `NOT_FOUND`).
- `message` - A human-readable message explaining the error.
- `details` - An optional array containing additional error-specific information.

```json title="Example v2 error"
{
  "code": "INVALID_ARGUMENT",
  "message": "Invalid User ID in the request."
}
```

```json title="Example v2 error with details"
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

### v2 error codes

The following table describes possible values for `code` in v2 API responses.

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
      <td>You passed an invalid argument, such as an invalid `universeId`. You might also have missing or invalid headers, such as `Content-Length` and `Content-Type`.</td>
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

## Open Cloud v1

Open Cloud v1 APIs have inconsistent error response formats. The format depends on the specific endpoint, the type of error, and where the error occurs in the request processing pipeline.

Most v1 endpoints return errors in one of these three formats:

```json title="Example v1 error with error field"
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

```json title="Example v1 error with code field"
{
  "code": "INVALID_ARGUMENT",
  "message": "Invalid cursor."
}
```

```json title="Example v1 detailed validation error"
{
  "errors": {
    "assetId": ["The value 'a' is not valid."]
  },
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "extensions": {
    "traceId": "00-427917f0fc3b8375ee33e4603a7f0693-f3f6ad560ff1a122-00"
  }
}
```

### v1 error codes

The following table describes possible values for `error` or `code` in v1 API responses:

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
      <td>You passed an invalid argument, such as an invalid `universeId`. You might also have missing or invalid headers, such as `Content-Length` and `Content-Type`.</td>
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
