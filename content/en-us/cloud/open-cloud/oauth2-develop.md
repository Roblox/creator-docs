---
title: Developing OAuth 2.0 Applications
description: Provides recommendations and sample implementations for developing an OAuth 2.0 app.
---

This guide covers the required logic and implementations for developing an OAuth 2.0 app.

<Alert severity="warning">
Third-Party app support through OAuth 2.0 is a Beta feature that might be subject to changes for future releases.
</Alert>

## Implementing Authorization Flows

All OAuth 2.0 apps need to support at least one [authorization flow](../../cloud/open-cloud/oauth2-overview.md#authorization-flows) based on the application type. The following capabilities and actions are required by all types of applications for completing the authorization flow:

- Passing in a valid client ID, which you can obtain after [registering your app](../../cloud/open-cloud/app-registration.md#registering-an-app).
- At the beginning of the authorization process, redirecting app users to the [authorization endpoint](../../reference/cloud/oauth2/authorization-flow.md), such as by opening the authorization request URL in the user's browser.
- Providing at least one redirect URL, the re-entry point of your app that users are redirected to once they finish authorization.
- Receiving incoming requests through redirections from the authorization server.

### Confidential Clients

**Confidential clients** are applications capable of keeping the confidentiality of their credentials, such as a website that can securely store and retrieve secrets in its backend. Open Cloud supports the following two flows for confidential clients:

- (**Recommended**) The [Authorization Code Flow with PKCE](../../cloud/open-cloud/oauth2-overview.md#authorization-code-flow-with-pkce) that requires each authorization request to include the client ID, client secret, and a `code_challenge` parameter for security enhancements.
- (**Not Recommended**) The [Authorization Code Flow](../../cloud/open-cloud/oauth2-overview.md#authorization-code-flow) that requires each authorization request to include the client ID and the client secret obtained from the registration.

### Public Clients

**Public clients** are applications that can't keep secrets, such as native apps and web browser-based apps. Using the [Authorization Code Flow with PKCE](../../cloud/open-cloud/oauth2-overview.md#authorization-code-flow-with-pkce) is mandatory for public clients. Instead of passing the client secret to authorization requests, include the client ID and a `code_challenge` parameter for enhanced security.

<Alert severity="warning">
Don't pass the client secret for your public client as bad actors can use it to impersonate your application. Instead, store the client secret in a secure place and never expose it to the front-end.
</Alert>

## Handling Token Exchanges

Once a user is redirected back to your app after their authorization session, you need to exchange the authorization code for an [access token](../../cloud/open-cloud/oauth2-overview.md#access-token), [refresh token](../../cloud/open-cloud/oauth2-overview.md#refresh-token), and [ID token](../../cloud/open-cloud/oauth2-overview.md#id-token). Make sure to implement the required logic so your app can perform the following steps:

1. Request an access token and refresh token by sending a token request to the authorization server's token endpoint. The request should include the authorization code, client ID, and the client secret or code challenge, depending on the authorization flow you use.

1. Parse the token response received from the authorization server. If the response is valid, it contains an access token, refresh token, and other relevant information.

1. Store the access token securely, typically in a server-side session or database, depending on your application's architecture.

1. Include the access token in the header of API requests to resource servers to authorize the requests.

## Testing

Once you finish developing your app's functionalities, make sure to test its authorization flow before making it available to your users. You can test it using the `User Information` [endpoint](../../reference/cloud/oauth2/user-information.md) to see if you can successfully retrieve a test user's information using the access token.

## Example: Implementing Authorization Code Flow with PKCE

This example guides you through the process implementing the Authorization Code Flow with PKCE, the recommended method for securing OAuth 2.0 authentication flows, especially for public clients.

### Generating a Code Challenge

Before initiating the authorization process, you need to generate a code challenge from a code verifier. You can use libraries or built-in functions in the programming language of your choice to create the code verifier, calculate the hash, and perform Base64URL encoding to generate the code challenge.

When creating the code verifier, only use unreserved characters, including uppercase and lowercase letters (A-Z , a-z), decimal digits (0-9), hyphen (-), period (.), underscore (\_), and tilde (~), with a minimum length of 43 characters and a maximum length of 128 characters.

The following example shows how to use Python to create a code verifier and generate the code challenge using the SHA-256 hashing algorithm from it:

```python title="Generate Code Challenge"
import string
import secrets
import hashlib
import base64

def generate_code_verifier():

    # Define the length of your code verifier. Must be between 43 and 128
    length = 48

    # Define all unreserved characters
    characters = string.ascii_letters + string.digits + '-._~'

    # Generate a random code verifier string
    code_verifier = ''.join(secrets.choice(characters) for _ in range(length))

    return code_verifier

def generate_code_challenge(code_verifier):

    # Hash the code verifier using the SHA256 algorithm
    sha256_hash = hashlib.sha256(code_verifier.encode()).digest()

    # Encode the hashed value using base64url encoding
    code_challenge = base64.urlsafe_b64encode(sha256_hash).decode()

    return code_challenge

# Print the code challenge value
print(generate_code_challenge(generate_code_verifier()))
```

### Constructing the Authorization URL

To initiate the user authorization process, you need to construct the authorization URL and redirect the user to that URL. You can construct the authorization URL by combining the authorization endpoint with the required parameters, including:

- `client_id`: Your app's client ID obtained after [registering your app](../../cloud/open-cloud/app-registration.md).
- `redirect_uri`: Your app's redirect URI, the re-entry point of your app.
- `scope`: The requested scopes that define the access permissions your app needs in a space-separated list.
- `response_type`: Set it to `code` to indicate the authorization code flow.
- `code_challenge`: The code challenge generated in the previous step.
- `code_challenge_method`: Set it to `S256` to indicate that the code challenge was transformed using the SHA-256 algorithm, the most widely supported and secure code challenge method.

Your authorization request URL needs to be in the format of the following example:

```plain title="Example PKCE Authorization URL"
https://apis.roblox.com/oauth/v1/authorize?client_id=1112223334445555
    &redirect_uri=https://www.example.com
    &scope=openid%20profile%20asset:read
    &response_type=code
    &nonce=12345 // Optional
    &state=6789 // Optional
    &code_challenge=Q12AEaAT69Vl3jhuKSOCK6cFyhHkEQ_haJxUgXJBm4
    &code_challenge_method=S256
```

For more information on all required and optional query parameters of the authorization URL, see the [API reference](../../reference/cloud/oauth2/authorization-flow.md).

### Handling Authorization Callbacks

After a user grants authorization, the authorization server redirects them back to your app's redirect URI with an authorization code. If you don't have a backend web server with decomposed objects for query parameters, you can use the following example to manually parse the redirect URI and extract the authorization code when your app receives the authorization callback, so you can use it to exchange the tokens.

```python title="Extract Authorization Code"
from urllib.parse import urlparse, parse_qs

def extract_authorization_code(redirected_uri):

    # Parse and extract all parameters from the URL
    parsed_url = urlparse(redirected_uri)
    query_params = parse_qs(parsed_url.query)

    # Get the value of the "code" parameter. If doesn't exist, set to an
    # If it doesn't exist, set the value to an empty string
    authorization_code = query_params.get('code', [''])[0]
    return authorization_code

# Print out the authorization code of an app with the
# redirect URI as "https://www.example.com"
print(extract_authorization_code("https://www.roblox.com/example-redirect?code=hfa87439baj"))
```

Once you obtain the authorization code, you can use it to call the [Token API](../../reference/cloud/oauth2/tokens.md) to exchange for tokens and then use tokens for API requests.
