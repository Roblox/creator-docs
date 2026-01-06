---
title: OAuth 2.0 authentication
description: Describes how to make authenticated calls to Open Cloud with API keys and OAuth 2.0
---

<Alert severity="warning">
OAuth 2.0 authentication is a beta feature that might be subject to change for
future releases. All Open Cloud endpoints also support
[API key authentication](../auth/api-keys.md).
</Alert>

<Alert severity="info">
For complete implementation guides and information on OAuth 2.0, including a
sample app, see the [OAuth 2.0 overview](../auth/oauth2-overview.md).
</Alert>

This document describes endpoints that you call to implement the OAuth 2.0
authorization code flow, as well as other endpoints useful for implementing
authentication in your apps.

```http title="Base URL"
https://apis.roblox.com/oauth
```

```http title="Endpoints"
GET v1/authorize
POST v1/token
POST v1/token/introspect
POST v1/token/resources
POST v1/token/revoke
GET v1/userinfo
GET .well-known/openid-configuration
```

## Authorization

### `GET` v1/authorize

Obtains authorization from the user to authenticate with their Roblox account.
Expects a valid authorization URL constructed with
the specified parameters. This endpoint supports PKCE authorization.

<h4>Query parameters</h4>

| Name                  | Description                                                                                                                                                 | Required | Example                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------- |
| client_id             | The app's client ID.                                                                                                                                        | yes      | `816547628409595165403873012`                |
| redirect_uri          | The URL that users are redirected back to after the completing authorization flow.                                                                          | yes      | `https://www.roblox.com/example-redirect`    |
| scope                 | The requested scopes, space delimited. Use the `openid` scope to receive an ID token. Use the `openid` and `profile` scope to obtain more user information. | yes      | `openid profile`                             |
| response_type         | The credentials the app wants returned. The default is the authorization code grant type.                                                                   | yes      | `none`, `code`                               |
| prompt                | Specifies what authentication and consent pages are shown to users. Certain screens are required for third-party apps and can't be skipped.                 | no       | `none`, `login`, `consent`, `select_account` |
| nonce                 | The cryptographic number that binds the token with the client.                                                                                              | no       | `<random_value_1>`                           |
| state                 | An opaque value that prevents cross-site request forgery, a type of malicious attack. Passed back to the app after authorization.                           | no       | `<app-provided-opaque-value>`                |
| code_challenge        | The resulting string of applying the `code_challenge_method` to the `code_verifier`.                                                                        | no       | Base64-URL-encoded string                    |
| code_challenge_method | The function that is applied to the `code_verifier`.                                                                                                        | no       | S256                                         |

<h4>Request</h4>

```plain title="Example Request of Directing to Authorization Flow"
https://apis.roblox.com/oauth/v1/authorize?client_id=816547628409595165403873012&redirect_uri=https://my-app.com/redirect&scope=openid&response_type=code&nonce=12345&state=6789
```

<h4>Response</h4>

After calling this endpoint, the user is redirected to the specified redirect
URL with the authorization code in a `code` query parameter.
The authorization code:

- Has a lifetime of one minute.
- Can only be redeemed once.
- Is invalid after one use.

## Token exchange

To obtain tokens to access APIs, exchange an **authorization code** for a set of
confidential tokens. All token endpoints support two types of client
authentication:

1. HTTP Basic Authentication Scheme with an authorization header:
   `Authorization: Basic Base64 encoded(<client_id>:<client_secret>)`.
1. Client ID and secret in the request body as parameters.

The following list describes the various tokens you receive from this
endpoint.

- **Access token** - Represents the authorization from a creator or user for a
  third-party app to access their protected Roblox resources. It's a string
  denoting a specific scope, lifetime, and other access attributes. Once the
  Roblox authorization server issues an access token to an app, the token:

  - Is valid for 15 minutes.
  - Can be used multiple times before it expires.
  - Can be invalidated before it expires if an app user revokes the authorization.

- **Refresh token** - Refreshes an authorization session. An app can use
  the refresh token to obtain a new set of tokens, which includes an access token,
  a refresh token, and an ID token. A refresh token:

  - Is valid for 90 days.
  - Can only be used once before it expires to refresh tokens.
  - Can be invalidated before it expires if an app user revokes the authorization.

- **ID token** - Provides proof that a user's identity has been authenticated. Its
  content depends on the scopes requested and can contain basic user information,
  including a user's Roblox display name and username. The ID token is only for
  identity authentication purposes and doesn't provide access to any Roblox
  resources.

### `POST` v1/token

Obtain a set of tokens with an authorization code.

<h4>Request</h4>

`(x-www-form-urlencoded)`

| Key           | Value                        |
| ------------- | ---------------------------- |
| code          | `<authorization code>`       |
| code_verifier | `<pkce code verifier value>` |
| grant_type    | authorization_code           |
| client_id     | `<client_id>`                |
| client_secret | `<client_secret>`            |

```bash title="Example Obtain Token Request"
curl --location --request POST 'https://apis.roblox.com/oauth/v1/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=840974200211308101' \
--data-urlencode 'client_secret=RBX-CR9...St12L' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'code=yCnq4ofX1...XmGpdx'
```

<h4>Response</h4>

```json title="Example Obtain Token Response"
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "Bearer",
  "expires_in": 899,
  "scope": "universe-messaging-service:publish"
}
```

### `POST` v1/token

Obtain a set of tokens with a refresh token.

<h4>Request</h4>

`(x-www-form-urlencoded)`

| Key           | Value             |
| ------------- | ----------------- |
| grant_type    | refresh_token     |
| refresh_token | `<refresh_token>` |
| client_id     | `<client_id>`     |
| client_secret | `<client_secret>` |

```bash title="Example Refresh Token Request"
curl --location --request POST 'https://apis.roblox.com/oauth/v1/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=refresh_token' \
--data-urlencode 'refresh_token=Ujfstayclfdlbm...BGydlsnU' \
--data-urlencode 'client_id=840974200211308101' \
--data-urlencode 'client_secret=RBX-CR9...St12L'
```

<h4>Response</h4>

```json title="Example Refresh Token Request"
{
  "access_token": "...",
  "refresh_token": "...",
  "token_type": "Bearer",
  "expires_in": 899,
  "scope": "universe-messaging-service:publish"
}
```

### `POST` v1/token/introspect

Receive information about a token. Verifies whether the token is presently valid
and hasn't expired yet. Useful for stateless validation. Use only if the API
you're accessing doesn't require a resource, such as Assets API, or if you just
want to see specific claims of the token.

<Alert severity="info"> Even if the user has revoked the authorization linked to
the access token, the endpoint still shows the access token as `valid: true`
because it checks whether the token is active based on its lifetime (typically
15 minutes for access tokens). </Alert>

<h4>Request</h4>

`(x-www-form-urlencoded)`

| Key           | Value                                               |
| ------------- | --------------------------------------------------- |
| token         | `<access_token>`, `<refresh_token>` or `<id_token>` |
| client_id     | `<client_id>`                                       |
| client_secret | `<client_secret>`                                   |

```bash title="Example Introspect Token Request"
curl --location --request POST 'https://apis.roblox.com/oauth/v1/token/introspect' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=eyjlflabtfl...4gxqYBG' \
--data-urlencode 'client_id=840974200211308101' \
--data-urlencode 'client_secret=RBX-CR9...St12L'
```

<h4>Response</h4>

```json title="Example Introspect Token Response"
{
  "active": true,
  "jti": "RT.2GcjvTduKzk6QY9tjTfm",
  "iss": "https://apis.roblox.com/oauth/",
  "token_type": "Bearer",
  "client_id": "840974200211308101",
  "aud": "4239311013248676173",
  "sub": "1516563360",
  "scope": "universe-messaging-service:publish",
  "exp": 1676394509,
  "iat": 1660842510
}
```

### `POST` v1/token/resources

Check whether a token can access a specific resource by obtaining the list of
user resources that the user gave permission for. This is useful for stateful
validation.

<h4>Request</h4>

`(x-www-form-urlencoded)`

| Key           | Value             |
| ------------- | ----------------- |
| token         | `<access_token>`  |
| client_id     | `<client_id>`     |
| client_secret | `<client_secret>` |

```bash title="Example Obtain Token Resources Request"
curl --location --request POST https://apis.roblox.com/oauth/v1/token/resources' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=eyjlflabtfl...4gxqYBG' \
--data-urlencode 'client_id=840974200211308101' \
--data-urlencode 'client_secret=RBX-CR9...St12L'
```

<h4>Response</h4>

The value `U` in `ids` indicates that a scope has granted access to a resource owned by the authorizing `owner`.

```json title="Example Obtain Token Resources Response"
{
  "resource_infos": [
    {
      "owner": {
        "id": "1516563360",
        "type": "User"
      },
      "resources": {
        "universe": {
          "ids": ["3828411582"]
        },
        "creator": {
          "ids": ["U"]
        }
      }
    }
  ]
}
```

### `POST` v1/token/revoke

Revoke an authorization session using the provided refresh token.

<h4>Request</h4>

`(x-www-form-urlencoded)`

| Key           | Value             |
| ------------- | ----------------- |
| token         | `<refresh_token>` |
| client_id     | `<client_id>`     |
| client_secret | `<client_secret>` |

```bash title="Example Revoke Token Request"
curl --location --request POST https://apis.roblox.com/oauth/v1/token/revoke' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'token=Ujfstayclfdlbm...BGydlsnU' \
--data-urlencode 'client_id=840974200211308101' \
--data-urlencode 'client_secret=RBX-CR9...St12L'
```

<h4>Response</h4>

`200 OK` with an empty response

## User Information

### `GET` /v1/userinfo

Gets the Roblox user ID and other user metadata.

<h4>Request</h4>

**Authorization header**: `Authorization: Bearer <access_token>`

```bash title="Example Get User Info Request"
curl --location --request GET 'https://apis.roblox.com/oauth/v1/userinfo' \
--header 'Authorization: Bearer eyjlflabtfl...4gxqYBG'
```

<h4>Response</h4>

You can use the `sub` value to uniquely identify the user. Users can change
their Roblox username and display name, so don't use them as unique identifiers to refer to users on your app.

| Claim              | Description                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| sub                | Roblox user ID.                                                                                                         |
| name               | Roblox display name.                                                                                                    |
| nickname           | Roblox display name.                                                                                                    |
| preferred_username | Roblox username.                                                                                                        |
| created_at         | Creation time of the Roblox account as a Unix timestamp.                                                                |
| profile            | Roblox account profile URL.                                                                                             |
| picture            | Roblox avatar headshot image. Can be null if the avatar headshot image hasn't yet been generated or has been moderated. |

```json title="Example User with Profile Scope"
{
  "sub": "1516563360",
  "name": "exampleuser",
  "nickname": "exampleuser",
  "preferred_username": "exampleuser",
  "created_at": 1584682495,
  "profile": "https://www.roblox.com/users/1516563360/profile",
  "picture": "https://tr.rbxcdn.com/03dc2a9abe7b1aacaaf93ea46d5c0646/150/150/AvatarHeadshot/Png"
}
```

```json title="Example User without Profile Scope"
{
  "sub": "1516563360"
}
```

## Discovery

The OpenID Connect (OIDC) Discovery Document is a JSON document that
contains metadata about the Open Cloud configuration details, including a list
of identity-related scopes and claims that are supported. You can use it to
dynamically discover information about Open Cloud OAuth 2.0 endpoints and
configuration, such as the authorization endpoint, token endpoint, and public
key set.

After retrieving and fetching the Discovery Document from the Discovery document
URI, you can either manually inspect fields in the response to verify the
information, or you can create your own custom library mapping to fields in the
response schema to automate your workflow.

### `GET` .well-known/openid-configuration

<h4>Response</h4>

All Discovery Document responses follow the same schema as the following example response.

<Alert severity="warning">
Not all of the following scopes and claims are available to third-party app creators, as some can only be used by official Roblox apps.
</Alert>

```json title="Example Discovery Document Response"
{
  "issuer": "https://apis.roblox.com/oauth/",
  "authorization_endpoint": "https://apis.roblox.com/oauth/v1/authorize",
  "token_endpoint": "https://apis.roblox.com/oauth/v1/token",
  "introspection_endpoint": "https://apis.roblox.com/oauth/v1/token/introspect",
  "revocation_endpoint": "https://apis.roblox.com/oauth/v1/token/revoke",
  "resources_endpoint": "https://apis.roblox.com/oauth/v1/token/resources",
  "userinfo_endpoint": "https://apis.roblox.com/oauth/v1/userinfo",
  "jwks_uri": "https://apis.roblox.com/oauth/v1/certs",
  "registration_endpoint": "https://create.roblox.com/dashboard/credentials",
  "service_documentation": "https://create.roblox.com/docs/reference/cloud",
  "scopes_supported": [
    "openid",
    "profile",
    "email",
    "verification",
    "credentials",
    "age",
    "premium",
    "roles"
  ],
  "response_types_supported": ["none", "code"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["ES256"],
  "claims_supported": [
    "sub",
    "type",
    "iss",
    "aud",
    "exp",
    "iat",
    "nonce",
    "name",
    "nickname",
    "preferred_username",
    "created_at",
    "profile",
    "email",
    "email_verified",
    "verified",
    "age_bracket",
    "premium",
    "roles",
    "internal_user"
  ],
  "token_endpoint_auth_methods_supported": [
    "client_secret_post",
    "client_secret_basic"
  ]
}
```
