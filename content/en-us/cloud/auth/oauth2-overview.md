---
title: OAuth 2.0 overview
description: Introduces the 3rd-party app creation support with OAuth 2.0 authorization framework.
---

You can build or authorize apps that use Open Cloud APIs to access Roblox
resources. Open Cloud provides authentication for these apps using OAuth 2.0.

<dl>

<dt>**As an experience creator or group owner**</dt>
<dd>
You can securely use tools created by others to improve your creation
productivity. The OAuth 2.0 authorization layer allows you to grant permissions
to third-party apps to access your or your group's experiences without giving
them your credentials and personal information. You select the access
permissions of your specific Roblox resources, and Roblox handles the
authorization process for you with the OAuth 2.0 framework.
<Alert severity="info">
You must have a 13+ account to authorize OAuth 2.0 apps.
</Alert>
</dd>

<dt>**As an app developer**</dt>
<dd>
You can create apps for yourself and others in the Roblox community. OAuth 2.0
defines the roles involved in the authorization process, the protocol of how
roles interact with each other, and the authorization flows that you need to
follow to develop secure and compatible apps.
<Alert severity="info">
  You must be [ID verified](../../production/publishing/account-verification.md#verify-through-government-id)
  to register and publish OAuth 2.0 apps.
</Alert>
</dd>

</dl>

## Roles

The Open Cloud OAuth 2.0 protocol has the following roles. It's useful to
understand the specific roles before learning about how they interact with one
another in authorization flows.

- **Resource owner**: An entity capable of granting access to a protected
  resource. For example, a creator who allows a third-party app to access
  their Roblox resources through Open Cloud Web APIs.

- **Resource server**: A Roblox service that hosts protected resources and
  responds to requests from a resource owner.

- **Client**: An app that accesses protected resources on behalf of the resource
  owner (with the owner's authorization).

- **Authorization server**: The Roblox server that authenticates the identity of
  the resource owner and issues access tokens to the client.

## Grant types

Authorization flows, or grant types, are the steps of actions that roles perform
during the authorization process. Roblox supports the OAuth 2.0 authorization
code flow and its Proof Key for Code Exchange (PKCE) extension, with different
implementation requirements for apps that are capable or incapable of storing
client secrets.

### Authorization code flow

Through the authorization code flow, a client exchanges an authorization code
for an access token and a refresh token to complete the authorization process in
the following steps:

1. The client sends an authorization request to the Roblox authorization server.

1. The authorization server verifies the identity of the resource owner.

1. The authorization server receives permissions for accessing specific Roblox
   resources from the resource owner.

1. The authorization server redirects the resource owner back to the client with
   an authorization code.

1. The client requests an access token using the authorization code at the token
   endpoint.

1. The client receives a response from the token endpoint containing an access
   token, an ID token, and a refresh token.

1. The client retrieves the permitted resources after getting the access token.

The following figure describes the interactions between roles in the
authorization code flow that you'll read in the following sections:

<img src="../../assets/open-cloud/protocol-flow.png" width="80%" />

### Authorization code flow with PKCE

The [PKCE extension](https://www.rfc-editor.org/rfc/rfc7636) of the
authorization code flow helps reduce risk of leaking the authorization code and
prevent cross-site request forgery (CSRF), an attack that tricks users into
submitting unintended web requests. This flow completes the authorization
process with the following steps:

1. The client generates a unique and cryptographically random key called a
   _code verifier_ for every authorization request.

1. The client runs a SHA-256 hash algorithm on the code verifier to generate a
   _code challenge_.

1. If the client:

   - Is a [public client](oauth2-develop.md#public-clients),
     instead of using the client secret, it passes the client ID and the code
     challenge in the authorization request.

   - Is a [confidential client](oauth2-develop.md#confidential-clients),
     it adds the code challenge along with the client ID and secret in the
     request.

1. The client sends an authorization request to the Roblox authorization server.

1. The authorization server verifies the identity of the resource owner.

1. The authorization server receives permissions for accessing specific Roblox
   resources from the resource owner.

1. The authorization server redirects the resource owner back to the client with
   an authorization code.

1. The client includes the authorization code and the original code verifier
   in the token request to the [token endpoint](oauth2-reference.md#token-exchange).

1. The authorization server verifies the authorization code and the associated
   code verifier.

1. The client receives a response from the token endpoint containing an access
   token, an ID token, and a refresh token.

1. The client retrieves the permitted resources after getting the access token.

## OpenID Connect support

Roblox uses [OpenID Connect (OIDC)](https://openid.net/connect/) as an
identity layer on top of the OAuth 2.0 protocol for authentication to protect
sensitive account information. OIDC allows applications to verify the identity
of users and obtain their basic public profile information, such as user ID,
usernames, display names, and profile links.

<Alert severity="info">
When [adding permission scopes](oauth2-registration.md#register-an-app) to your app on
**Creator Dashboard**, make sure to select the `openid` identity scope for
receiving an ID token in the token response as part of the authentication
process.
</Alert>

## Registration and implementation

To implement a web or mobile app that uses authorization code flow, you need to:

1. [Register](oauth2-registration.md) your app with Roblox.
   This lets you obtain a client ID and secret to register your app with Roblox
   and make calls to your endpoints.

1. [Implement](oauth2-develop.md) the authorization code
   flow. For a complete reference of the OAuth 2.0 endpoints that you need to
   call, see the [Authentication](oauth2-reference.md) reference.

1. Go through the [review process](oauth2-registration.md#submit-for-review)
   to get more user quota.
