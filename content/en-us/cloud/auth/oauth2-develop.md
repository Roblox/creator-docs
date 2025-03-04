---
title: OAuth 2.0 app implementation
description: Introduces OAuth 2.0 authentication implementation.
---

Open Cloud supports the OAuth 2.0 authorization flow with and without
[PKCE](../../cloud/auth/oauth2-overview.md#authorization-code-flow-with-pkce),
depending on whether your clients are confidential or public.

- _Confidential clients_ are apps that are capable of keeping credentials
  confidential, such as a website that can securely store and retrieve secrets on
  its backend.
- _Public clients_ are apps that can't keep secrets, such as mobile
  and web browser apps.

We recommend the OAuth 2.0 authorization code flow with PKCE for _all_ clients
and require it for public clients.

<Alert severity="warning">
Store the client secret in a secure place and never expose it to the public. Bad
actors can use it to impersonate your application.
</Alert>

To implement the authorization code flow, your app performs the following steps:

1. Generate a code verifier and code challenge (PKCE only). This lets you
   include a challenge in your requests rather than the client secret, which
   improves security.
1. Send a `GET` request to the authorization endpoint with the appropriate parameters.
1. Handle the authorization callback. After obtaining authorization, use the
   authorization code from Roblox in a redirect request to the URL you specified
   during app creation. Parse the authorization code for later use.
1. Send a `POST` request to the token endpoint with the authorization code. If
   successful, you receive access and refresh tokens with which to make API
   calls.
1. Call any Open Cloud API that supports OAuth 2.0 authentication based on the
   reference documentation for the resources you want to access.

The following sections describe each step in greater depth.

## Generate a code challenge (for PKCE only)

Before initiating the authorization process, you need to generate a code
challenge from a code verifier. You can use libraries or built-in functions in
the programming language of your choice to create the code verifier, calculate
the hash, and perform Base64 encoding to generate the code challenge.

When creating the code verifier, only use unreserved characters, including
uppercase and lowercase letters (A-Z, a-z), decimal digits (0-9), hyphen (-),
period (.), underscore (\_), and tilde (~), with a minimum length of 43
characters and a maximum length of 128 characters.

The following example shows how to use Javascript to create a code verifier and
generate the code challenge using the SHA-256 hashing algorithm:

```javascript title="Generate Code Challenge"
const crypto = require('crypto');

// base64URL encode the verifier and challenge
function base64URLEncode(str) {
  return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

// create sha256 hash from code verifier
function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest(`base64`);
}

// create a random code verifier
var code_verifier = base64URLEncode(crypto.randomBytes(32));
// generate a challenge from the code verifier
var code_challenge = base64URLEncode(sha256(code_verifier));
```

For PKCE, you need both the code verifier and challenge values in later steps.

## Construct the authorization URL

<Alert severity="info">
  See the [authorization endpoint reference documentation](oauth2-reference.md#get-v1authorize)
  for complete information on how to construct the authorization URL.
</Alert>

To initiate the user authorization process, construct an
authorization URL with the required parameters:

- `client_id`: Your app's client ID obtained after [registering your app](oauth2-registration.md).
- `redirect_uri`: Your app's redirect URI, the re-entry point of your app.
- `scope`: The requested scopes that define the access permissions your app
  needs in a space-separated list.
- `response_type`: Set it to `code` to indicate the authorization code flow.

**Required for PKCE only**

- `code_challenge`: The code challenge generated from a code verifier.
- `code_challenge_method`: Set this parameter value to `S256` to indicate that
  the code challenge was transformed using the SHA-256 algorithm, the most
  widely supported and secure code challenge method.
- `state`: An opaque, secure random value to maintain state
  between the request and callback.

**Required for non-PKCE only**

- `client_secret`: Your app's client secret obtained after [registering your app](oauth2-registration.md). If you are using authentication with
  PKCE, omit this parameter.
  Your authorization request URL must be well formatted, like in the following
  example:

```bash title="Example PKCE Authorization URL"
https://apis.roblox.com/oauth/v1/authorize?client_id=7290610391231237934964
    &code_challenge=PLEKKVCjdD1V_07wOKlAm7P02NC-LZ_1hQfdu5XSXEI
    &code_challenge_method=S256
    &redirect_uri=https://example.com/redirect
    &scope=openid%20profile
    &response_type=code
    &state=abc123
```

When users visit the URL, they are taken through the authorization flow. If
successful, Roblox redirects the user to the specified `redirect_uri`.

## Handle authorization callbacks

When an authorization flow is successful, your app receives a `GET` request from
the Roblox authorization server at the `redirect_uri` that you specified. In the
request, you receive `code` (authorization code) and `state`(if you provided a
value previously) parameters.

- The `code` parameter contains an authorization code that the app can
  exchange for an access token from the authorization server. Most backend
  server languages have standard ways to access query parameters as decoded
  objects. You'll need to obtain the `code` parameter and use it to exchange
  for access tokens.

- The `state` parameter is an opaque value that you initially provided in the
  authorization request. You can use this parameter to maintain the state or
  context of the authorization process.

For example, you might receive a `GET` request with the following URL if you
specified your redirect URI to be `https://example.com/redirect`.

```bash title="Example Redirect URL"
https://example.com/redirect?code=10c45PNuquKnFJ6pUcy5-fHkghEM6lSegm-7hj9mVEprub1dSDuStuKK_EAUXY7AHTD63xcnmvxSLthp-C8g3jzIGZVzuXSd20Y2dEYI9hx0LZmPg95ME4z2K03UheiZbroyXUjYyB3ReoMqobzDVPzyx6IS8kj2Uu-11Xq_0JiTYxtDatuqXRNIAmJT8gMJmbSyOLOP_vnDvbeMUiBsqCRrkTGVbWSwYSc8sTVVE-535kYdqQOgNjH1ffCoZLGl8YYxLnpb2CXJlRQPrcjkA&state=6789
```

If authorization fails, your app receives a `GET` request to the specified
redirect URL with the `error`, `error_description`, and `state` (if applicable)
parameters.

- The `error` parameter indicates the specific OAuth 2.0 error that occurred
  during the authorization process.
- The `error_description` parameter provides additional details of the error.
- The `state` parameter helps your app maintain state in the case of a
  failure.

## Exchange an authorization code for access tokens

When you have parsed the authorization `code`, exchange it for
tokens to access desired Roblox resources:

1. Request an access token and refresh token by sending a `POST` request to the
   [token exchange endpoint](oauth2-reference.md#post-v1token). The
   request must include the authorization code, client ID, and the code
   verifier value (PKCE) or client secret (non-PKCE) in `x-www-form-urlencoded` format.

1. Parse the applicable tokens from the response received. The access token is
   valid for 15 minutes. Store the refresh token securely, typically on the server side, so you can use it to obtain new tokens in the future.

   ```json title="Example Token Endpoint Response"
   {
     "access_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6IlBOeHhpb2JFNE8zbGhQUUlUZG9QQ3FCTE81amh3aXZFS1pHOWhfTGJNOWMiLCJ0eXAiOiJKV11234.eyJzdWIiOiIyMDY3MjQzOTU5IiwiYWlkIjoiM2Q2MWU3NDctM2ExNS00NTE4LWJiNDEtMWU3M2VhNDUyZWIwIiwic2NvcGUiOiJvcGVuaWQ6cmVhZCBwcm9maWxlOnJlYWQiLCJqdGkiOiJBVC5QbmFWVHpJU3k2YkI5TG5QYnZpTCIsIm5iZiI6MTY5MTYzOTY5OCwiZXhwIjoxNjkxNjQwNTk4LCJpYXQiOjE2OTE2Mzk2OTgsImlzcyI6Imh0dHBzOi8vYXBpcy5yb2Jsb3guY29tL29hdXRoLyIsImF1ZCI6IjcyOTA2MTAzOTc5ODc5MzQ5Nj1234.BjwMkC8Q5a_iP1Q5Th8FrS7ntioAollv_zW9mprF1ats9CD2axCvupZydVzYphzQ8TawunnYXp0Xe8k0t8ithg",
     "refresh_token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoidGpHd1BHaURDWkprZEZkREg1dFZ5emVzRWQyQ0o1NDgtUi1Ya1J1TTBBRSIsInR5cCI6IkpXVCJ9..nKYZvjvXH6msDG8Udluuuw.PwP-_HJIjrgYdY-gMR0Q3cabNwIbmItcMEQHx5r7qStVVa5l4CbrKwJvjY-w9xZ9VFb6P70WmXndNifnio5BPZmivW5QkJgv5_sxLoCwsqB1bmEkz2nFF4ANLzQLCQMvQwgXHPMfCK-lclpVEwnHk4kemrCFOvfuH4qJ1V0Q0j0WjsSU026M67zMaFrrhSKwQh-SzhmXejhKJOjhNfY9hAmeS-LsLLdszAq_JyN7fIvZl1fWDnER_CeDAbQDj5K5ECNOHAQ3RemQ2dADVlc07VEt2KpSqUlHlq3rcaIcNRHCue4GfbCc1lZwQsALbM1aSIzF68klXs1Cj_ZmXxOSOyHxwmbQCHwY7aa16f3VEJzCYa6m0m5U_oHy84iQzsC-_JvBaeFCachrLWmFY818S-nH5fCIORdYgc4s7Fj5HdULnnVwiKeQLKSaYsfneHtqwOc_ux2QYv6Cv6Xn04tkB2TEsuZ7dFwPI-Hw2O30vCzLTcZ-Fl08ER0J0hhq4ep7B641IOnPpMZ1m0gpJJRPbHX_ooqHol9zHZ0gcLKMdYy1wUgsmn_nK_THK3m0RmENXNtepyLw_tSd5vqqIWZ5NFglKSqVnbomEkxneEJRgoFhBGMZiR-3FXMaVryUjq-N.Q_t4NGxTUSMsLVEppkTu0Q6rwt2rKJfFGuvy3s12345",
     "token_type": "Bearer",
     "expires_in": 899,
     "id_token": "eyJhbGciOiJFUzI1NiIsImtpZCI6IkNWWDU1Mi1zeWh4Y1VGdW5vNktScmtReFB1eW15YTRQVllodWdsd3hnNzgiLCJ0eXAiOiJKV11234.eyJzdWIiOiIyMDY3MjQzOTU5IiwibmFtZSI6ImxpbmtzZ29hdCIsIm5pY2tuYW1lIjoibGlua3Nnb2F0IiwicHJlZmVycmVkX3VzZXJuYW1lIjoibGlua3Nnb2F0IiwiY3JlYXRlZF9hdCI6MTYwNzM1NDIzMiwicHJvZmlsZSI6Imh0dHBzOi8vd3d3LnJvYmxveC5jb20vdXNlcnMvMjA2NzI0Mzk1OS9wcm9maWxlIiwibm9uY2UiOiIxMjM0NSIsImp0aSI6IklELnltd3ZjTUdpOVg4azkyNm9qd1I5IiwibmJmIjoxNjkxNjM5Njk4LCJleHAiOjE2OTE2NzU2OTgsImlhdCI6MTY5MTYzOTY5OCwiaXNzIjoiaHR0cHM6Ly9hcGlzLnJvYmxveC5jb20vb2F1dGgvIiwiYXVkIjoiNzI5MDYxMDM5Nzk4NzkzNDk2NCJ9.kZgCMJQGsariwCi8HqsUadUBMM8ZOmf_IPDoWyQY9gVX4Kx3PubDz-Q6MvZ9eU5spNFz0-PEH-G2WSvq2ljDyg",
     "scope": "openid profile"
   }
   ```

## Make a call to a resource method

Now that you have the required access token, you can use it to make
authenticated calls to resource methods. Include the access token in the header of all API requests to
authorize them.

For example, you can test if your app functions correctly by
going through the entire authorization flow and then making a `GET` request
to the
[user information endpoint](oauth2-reference.md#get-v1userinfo) with an access
token. Ensure you have the `openid` or both the `openid` and `profile`
scopes before calling this endpoint. If successful, the response from that
endpoint looks like this:

```json title="Example User Information Response"
{
  "sub": "12345678",
  "name": "Jane Doe",
  "nickname": "robloxjanedoe",
  "preferred_username": "robloxjanedoe",
  "created_at": 1607354232,
  "profile": "https://www.roblox.com/users/12345678/profile"
}
```
