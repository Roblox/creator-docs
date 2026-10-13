---
title: Error reporting
description: Use Open Cloud to read your experience's error logs and control how errors are grouped.
---

The Error Reporting API lets you programmatically read the error logs your experience produces and control how those errors are grouped. This API supports:

- Fetching details, such as the message, stack trace, severity, platform, and first-seen version, for specific errors.
- Creating, listing, updating, reordering, and deleting rules that group or ignore matching error messages.
- Reviewing Roblox-suggested grouping rules and dismissing the ones you don't want.

Before using this API, you must [generate an API key](../../auth/api-keys.md) for your experience. When creating the key, add your experience to **Access Permissions** and grant it the following operations:

| Scope                      | Grants access to                                              |
| :------------------------- | :------------------------------------------------------------ |
| `universe.analytics:read`  | Fetching error details and listing rules.                     |
| `universe.analytics:write` | Creating, updating, reordering, ignoring, and deleting rules. |

Include the key in the `x-api-key` request header on every request. The key's owner must also have analytics access to the experience; otherwise requests return `403`.

All endpoints use your universe ID, which you can find on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) by selecting your experience and copying the **Universe ID** from the overview page.

## Endpoints

All paths are relative to `https://apis.roblox.com`. Each endpoint allows up to 60 requests per minute per API key.

| Method | Path                                                                             | Scope | Description                                      |
| :----- | :------------------------------------------------------------------------------- | :---- | :----------------------------------------------- |
| GET    | `/universe-performance-raqi/v1/events/logging/universe/{universeId}/log-details` | read  | Get details for specific errors.                 |
| GET    | `/log-attribute-http-service/v1/universe-regexes`                                | read  | List rules.                                      |
| POST   | `/log-attribute-http-service/v1/universe-regexes`                                | write | Create a rule.                                   |
| PUT    | `/log-attribute-http-service/v1/universe-regexes/{id}`                           | write | Replace a rule's pattern, output, and operation. |
| PUT    | `/log-attribute-http-service/v1/universe-regexes/{id}/reorder`                   | write | Move a rule to a new position.                   |
| PUT    | `/log-attribute-http-service/v1/universe-regexes/{id}/ignore`                    | write | Dismiss a Roblox-suggested rule.                 |
| DELETE | `/log-attribute-http-service/v1/universe-regexes/{id}`                           | write | Delete a rule.                                   |

## Get error details

Each distinct error is identified by a message hash. To get message hashes, query the `ErrorCount` metric broken down by the `MessageHash` dimension. See [Analytics](../analytics/index.md).

To get details for one or more errors:

1. Copy the API key to the `x-api-key` request header.
1. Replace `${UniverseId}` in the URL with your experience's universe ID.
1. Add one `messageHashIds` parameter for each error.
1. Optionally narrow the results by time, place, or place version.
1. Send a GET request.

```bash title="Get details for two errors from the last day"
curl --location 'https://apis.roblox.com/universe-performance-raqi/v1/events/logging/universe/${UniverseId}/log-details?messageHashIds=${MessageHash1}&messageHashIds=${MessageHash2}&startTime=2026-10-07T00:00:00Z&endTime=2026-10-08T00:00:00Z' \
--header 'x-api-key: ${ApiKey}'
```

```json title="Response (200 OK)"
{
  "values": [
    {
      "id": "1849204477",
      "logSeverity": "Error",
      "logSource": "Server",
      "os": "Windows",
      "platform": "Computer",
      "message": "ServerScriptService.Inventory:42: attempt to index nil with 'Value'",
      "stacktrace": "Script 'ServerScriptService.Inventory', Line 42\nScript 'ServerScriptService.Main', Line 10",
      "firstSeenUtc": "2026-10-07T03:15:00Z",
      "firstSeenPlaceVersion": null
    }
  ]
}
```

An error that has no logs matching the time range and filters is omitted from `values`; it isn't returned as an error.

### Query parameters

| Parameter               | Type      | Required | Description                                                                                       |
| :---------------------- | :-------- | :------- | :------------------------------------------------------------------------------------------------ |
| `messageHashIds`        | string[]  | Yes      | The errors to return. Repeat for multiple values: `?messageHashIds=1&messageHashIds=2`.           |
| `startTime`             | string    | No       | Start of the time range, as an RFC&nbsp;3339 timestamp. Defaults to 7 days before `endTime`.      |
| `endTime`               | string    | No       | End of the time range, as an RFC&nbsp;3339 timestamp. Defaults to now. Must be after `startTime`. |
| `keyword`               | string    | No       | Only return errors whose logs contain this keyword.                                               |
| `placeId`               | integer   | No       | Only return errors from this place.                                                               |
| `placeVersions`         | integer[] | No       | Only return errors from these place versions. Repeat for multiple values.                         |
| `firstSeenPlaceVersion` | integer   | No       | Only return errors first seen in this place version or later. Use with `placeId`.                 |

### Response fields

| Field                   | Type    | Description                                                                                           |
| :---------------------- | :------ | :---------------------------------------------------------------------------------------------------- |
| `id`                    | string  | The message hash of the error.                                                                        |
| `logSeverity`           | string  | Severity of the log.                                                                                  |
| `logSource`             | string  | Whether the error came from the client or the server.                                                 |
| `os` / `platform`       | string  | Operating system and platform of a representative occurrence.                                         |
| `message`               | string  | The error message. For errors grouped by a rule, this is the group's output label.                    |
| `stacktrace`            | string  | Stack trace, when available. For grouped errors, this combines stack traces from several occurrences. |
| `firstSeenUtc`          | string  | When the error was first observed (UTC), or `null` if unknown.                                        |
| `firstSeenPlaceVersion` | integer | Place version where the error first appeared. Only returned when `placeId` is set.                    |

## Group and ignore errors with rules

Rules let you control how error messages are counted. Each rule is a regular expression plus an operation:

| Operation | Effect                                                                                                                                                                                                               |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Group`   | Messages that match are counted together under the rule's output label. Use this to merge errors that differ only in variable details, such as player names or IDs. If `output` is empty, the message is kept as-is. |
| `Ignore`  | Messages that match are counted in the shared **Other** bucket instead of being listed individually. Totals are unchanged.                                                                                           |

Your rules are evaluated in order, and the first matching rule wins. Rules apply as new errors are processed and don't change errors that were already recorded. Changes can take a few minutes to take effect.

### Rule statuses

| Status           | Description                                                                                            |
| :--------------- | :----------------------------------------------------------------------------------------------------- |
| `CreatorCreated` | A rule you created. Only these rules are applied to your errors.                                       |
| `AutoGenerated`  | A grouping rule suggested by Roblox. Includes `matchedCount` and `sampleMessage` so you can review it. |
| `CreatorIgnored` | A suggested rule that you dismissed.                                                                   |

### Create a rule

To create a rule:

1. Copy the API key to the `x-api-key` request header.
1. Set `universeId` to your experience's universe ID.
1. Set `pattern` to a regular expression matching the error message. See [Pattern rules](#pattern-rules).
1. Optionally set `output` to the label used when `regexOperation` is `Group`.
1. Set `regexOperation` to `Group` or `Ignore`.
1. Send a POST request.

```bash title="Group 'player not found' errors regardless of player name"
curl --location --request POST 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "universeId": ${UniverseId},
    "pattern": "^Player \\w+ not found$",
    "output": "Player <name> not found",
    "regexOperation": "Group"
}'
```

```bash title="Ignore a noisy third-party warning"
curl --location --request POST 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "universeId": ${UniverseId},
    "pattern": "^AdService: request timed out",
    "regexOperation": "Ignore"
}'
```

A successful request returns `200 OK` with the rule's position. New rules are added to the end of the list. The response doesn't include the rule's ID; [list your rules](#list-rules) to get it.

```json title="Response (200 OK)"
{ "order": 3 }
```

| Field            | Type    | Required | Description                                                                                                                                      |
| :--------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `universeId`     | integer | Yes      | Your experience's universe ID.                                                                                                                   |
| `pattern`        | string  | Yes      | A .NET regular expression matched against the error message, not the stack trace. Maximum 1,000 characters. See [Pattern rules](#pattern-rules). |
| `output`         | string  | No       | For `Group`, the label used for matching messages. Maximum 1,000 characters. Defaults to empty.                                                  |
| `regexOperation` | string  | Yes      | `Group` or `Ignore`.                                                                                                                             |

### List rules

To list your rules:

1. Copy the API key to the `x-api-key` request header.
1. Set `universeId` to your experience's universe ID.
1. Set `status` to the rule status you want.
1. Send a GET request.

```bash title="List your rules"
curl --location 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes?universeId=${UniverseId}&status=CreatorCreated' \
--header 'x-api-key: ${ApiKey}'
```

```json title="Response (200 OK)"
{
  "universeRegexes": [
    {
      "id": 4821,
      "universeId": 1234567890,
      "regexStatus": "CreatorCreated",
      "pattern": "^Player \\w+ not found$",
      "output": "Player <name> not found",
      "order": 1,
      "regexOperation": "Group",
      "createdTime": "2026-10-01T18:00:00+00:00",
      "updatedTime": "2026-10-01T18:00:00+00:00",
      "matchedCount": null,
      "sampleMessage": null
    }
  ]
}
```

Rules are returned in evaluation order. `matchedCount` and `sampleMessage` are only populated for `AutoGenerated` rules.

| Parameter    | Type    | Required | Description                                             |
| :----------- | :------ | :------- | :------------------------------------------------------ |
| `universeId` | integer | Yes      | Your experience's universe ID.                          |
| `status`     | string  | Yes      | `CreatorCreated`, `AutoGenerated`, or `CreatorIgnored`. |

### Update a rule

Updates replace the rule's `pattern`, `output`, and `regexOperation`. Send all three: an omitted `output` is cleared. Updating doesn't change the rule's position.

```bash title="Update a rule"
curl --location --request PUT 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes/${RuleId}' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{
    "pattern": "^Player \\w+ (not found|left)$",
    "output": "Player <name> unavailable",
    "regexOperation": "Group"
}'
```

A successful request returns `200 OK` with `{ "order": n }`.

### Reorder a rule

Because the first matching rule wins, put more specific rules before broader ones. `order` is 1-based and must be between 1 and the number of rules with the same status.

```bash title="Move a rule to the top"
curl --location --request PUT 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes/${RuleId}/reorder' \
--header 'x-api-key: ${ApiKey}' \
--header 'Content-Type: application/json' \
--data '{ "order": 1 }'
```

A successful request returns `200 OK` with the rule's new order.

### Dismiss a suggested rule

Moves an `AutoGenerated` rule to `CreatorIgnored`. Other rules return `409`.

```bash title="Dismiss a suggestion"
curl --location --request PUT 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes/${RuleId}/ignore' \
--header 'x-api-key: ${ApiKey}'
```

A successful request returns `204 No Content`.

### Delete a rule

<Alert severity="warning">
Deleting a rule is irreversible.
</Alert>

```bash title="Delete a rule"
curl --location --request DELETE 'https://apis.roblox.com/log-attribute-http-service/v1/universe-regexes/${RuleId}' \
--header 'x-api-key: ${ApiKey}'
```

A successful request returns `204 No Content`.

## Pattern rules

Create and update requests are rejected with `400` if the pattern:

- Is empty or longer than 1,000 characters.
- Isn't a valid .NET regular expression.
- Starts with an unanchored wildcard, such as `.*`, `.+`, `(.*)`, or `(.+)`. Start with literal text or `^` instead.
- Nests repeating quantifiers, such as `(a+)*` or `(\w+)+`.
- For `Ignore` rules only: has a top-level alternative that doesn't start with at least 3 literal characters, optionally after `^`. For example, `^AdService:` is allowed, but `^\w+` and `abc|.*` are not.

## Rule limits

- Each experience can have up to 100 `CreatorCreated` rules.
- Two rules with the same status can't have the same pattern.

## Common errors

Errors return the HTTP status code and a human-readable message. These endpoints don't return machine-readable error codes, so base your error handling on the HTTP status.

| Status | Cause                                                                                                                                                                  | Resolution                                                                                  |
| :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| 400    | Invalid input: a missing or invalid `status`, `startTime` not before `endTime`, a pattern that breaks the [Pattern rules](#pattern-rules), or an out-of-range `order`. | Read the message for the specific problem.                                                  |
| 401    | The `x-api-key` header is missing, invalid, or revoked.                                                                                                                | Verify the key on the [Creator Dashboard](https://create.roblox.com/dashboard/credentials). |
| 403    | The key lacks the required scope for this experience, or its owner doesn't have analytics access to the experience.                                                    | Confirm the key's Access Permissions include the experience and the required scope.         |
| 404    | The rule doesn't exist.                                                                                                                                                | Verify the rule ID.                                                                         |
| 409    | The pattern duplicates another rule, the experience has 100 rules, or you tried to dismiss a rule that isn't `AutoGenerated`.                                          | Change the pattern, delete an unused rule, or check the rule's status.                      |
| 429    | You exceeded the rate limit, or another change to the same experience's rules is in progress.                                                                          | Retry after a short delay.                                                                  |
| 502    | A transient backend failure occurred.                                                                                                                                  | Retry after a short delay.                                                                  |
