---
title: OAuth 2.0 3rd Party App Support (Beta)
description: Introduces third-party app creation support with the OAuth 2.0 authorization framework.
---

You can publish third-party apps on the Roblox platform with Open Cloud APIs integrated to engage your user base and benefit fellow creators. Open Cloud provides authentication and authorization for these apps using [OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749), a secure authorization framework that allows users to grant your app access to their Roblox resources with just a few clicks. Through this third-party application ecosystem:

As an **experience creator** or **group owner**, you can securely use tools created by others to improve your creation productivity. The authorization layer of OAuth 2.0 allows you to grant permissions to third-party apps to access your or your group's experiences without giving them your credentials and personal information. You can simply select the access permissions of your specific Roblox resources, and Roblox handles the authorization process for you with the OAuth 2.0 framework.

<Alert severity="info">
You must be 13+ in order to use an OAuth 2.0 app.
</Alert>

As an **app developer**, you can create apps for yourself and others in the Roblox community to use. OAuth 2.0 defines roles involved in the authorization process, the protocol of how roles interact with each other, and authorization flows that you need to follow to develop secure and compatible apps.

<Alert severity="info">
You must be [ID verified](../../production/publishing/account-verification.md#verifying-through-government-id) in order to register and publish an OAuth 2.0 app.
</Alert>

<Alert severity="warning">
Third-Party app support through OAuth 2.0 is a Beta feature that might be subject to changes for future releases.
</Alert>

## Authentication

Roblox uses **[OpenID Connect (OIDC)](https://openid.net/connect/)** as an identity layer on top of the OAuth 2.0 protocol for authentication to protect sensitive account information. OIDC allows applications to verify the identity of users and obtain their basic public profile information, such as User ID, usernames, display names, and profile links.

<Alert severity="info">
When [adding permission scopes](../../cloud/open-cloud/app-registration.md#registering-an-app) to your app on **Creator Dashboard**, make sure to select the `openid` identity scope for receiving an ID token in the token response as part of the authentication process.
</Alert>

## Tokens

Through the authorization process of allowing third-party apps to access Roblox resources, the Roblox authorization server issues a set of tokens to an application with corresponding [APIs](../../reference/cloud/oauth2/tokens.md).

### Authorization Code

The Roblox authorization server returns a self-contained **authorization code** to the app, which must be exchanged for a new set of confidential tokens in order to access the resources grant by the user. The authorization code has a lifetime of **one minute**. Each app can only redeem an authorization code once, and the code will be invalid after the one-time use.

### Access Token

An **access token** represents the authorization from a creator or user for a third-party app to access their protected Roblox resources. It's a string denoting a specific scope, lifetime, and other access attributes. Once the Roblox authorization server issues an access token to an app, the token:

- Is valid for 15 minutes.

- Can be used multiple times before it expires.

- Can be invalidated before it expires if an app user revokes the authorization.

### Refresh Token

A **refresh token** is for refreshing an authorization session. An app can use the refresh token to obtain a new full token set, including an access token, a refresh token, and an ID token. A refresh token:

- Has a lifetime of six month.

- Can be used after the access token expires.

- Can be invalidated before it expires if an app user revokes the authorization from user settings.

### ID Token

An **ID token** is issued by the Roblox authorization server as a proof that the user's identity has been authenticated. Its content depends on the scopes requested by the app and can contain basic user information, including a user's Roblox display name and username. The ID token is only for identity authentication purposes and doesn't provide access to any Roblox resources.

## Roles and Interaction Protocol

The Open Cloud OAuth 2.0 protocol has the following roles:

- **Resource owner**: An entity capable of granting access to a protected resource. For example, a creator who consents to a third-party app to access their Roblox resources through Open Cloud Web APIs.

- **Client**: An application making requests to access protected resources on behalf of the resource owner with their authorization. For example, the third-party app that a creator grants access to their Roblox resources.

- **Resource server**: A Roblox service hosting protected resources and responding to requests from resource owner.

- **Authorization server**: The Roblox server authenticating the identity of the resource owner and issuing access tokens to the client.

Depending on the authorization grant type, the protocol flows of how roles interact to each other are different. The following figure describes the generic flow of interactions between roles:

<img src="../../assets/open-cloud/protocol-flow.png" width="80%" />

### Client ID

The **Client ID** is a unique public identifier assigned to each client application registered with the authorization server. It allows the authorization server to identify and authenticate the client when handling requests. Though the client ID is considered public information, it's the best practice to store it securely, ensuring it's not discoverable by entities outside of your development team.

### Client Secret

The **Client Secret** is a confidential and secure string for authenticating and verifying the identity of a client when making requests to an authorization server. It's only known only by the client and the authorization server, and should not be shared publicly or exposed in client-side code.

Although all clients are assigned a client secret upon registration, depending on the client type, the client secret might not be required for authorization. However, regardless of its usage, you should store it in a secure place that is not discoverable by entities outside of your development team.

## Authorization Flows

Authorization flows, or grant types, are the steps of actions that roles of the OAuth 2.0 protocol perform during the authorization process. Roblox supports the Authorization Code Flow and its Proof Key for Code Exchange (PKCE) extension, with different implementation requirements for apps that are capable or incapable of keeping secrets.

### Authorization Code Flow

Through the authorization code flow, a client exchanges an authorization code for an access token and a refresh token to complete the authorization process in the following steps:

1.  The client sends an authorization request to the Roblox authorization server.

1.  The authorization server verifies the identity of the resource owner.

1.  The authorization server receives the permission of accessing specific Roblox resources from the resource owner.

1.  The authorization server redirects the resource owner back to the client with an authorization code.

1.  The client requests a response using the authorization code at the token endpoint.

1.  The client receives a response with an access token, an ID token, and a refresh token in the response body.

1.  The client retrieves permitted resources after getting the access token.

### Authorization Code Flow with PKCE

The [PKCE extension](https://www.rfc-editor.org/rfc/rfc7636) of the Authorization Code Flow helps reduce risk of leaking the authorization code and prevent Cross-Site Request Forgery (CSRF), an attack that tricks users to submit unintended web requests. This flow completes the authorization process through the following steps:

1. The client generates a unique and cryptographically random key called a `code verifier` for every authorization request.

1. The client runs a SHA-256 hash algorithm on the `code verifier` to generate a `code challenge`.

1. If the client:

   - Is a [public client](../../cloud/open-cloud/oauth2-develop.md#public-clients), instead of using the client secret, it passes the client ID and the `code challenge` in the authorization request.

   - Is a [confidential client](../../cloud/open-cloud/oauth2-develop.md#confidential-clients), it adds the `code challenge` along with the client ID and secret in the request.

1. The client sends an authorization request to the Roblox authorization server.

1. The authorization server verifies the identity of the resource owner.

1. The authorization server receives the permission of accessing specific Roblox resources from the resource owner.

1. The authorization server redirects the resource owner back to the client with an authorization code.

1. The client includes the authorization code and the original `code verifier` in the token request to the [token endpoint](../../reference/cloud/oauth2/tokens.md).
1. The authorization server verifies the authorization code and the associated `code verifier`.
1. The client receives a response from the token endpoint containing an access token, an ID token, and a refresh token.

1. The client retrieves permitted resources using the access token.
