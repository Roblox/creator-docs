---
title: Work with secrets
description: Securely manage API keys, passwords, and assess tokens for third-party services with your experience's secrets store.
---

Roblox offers a secrets store for each experience. Secrets are sensitive information like API keys, passwords, and access tokens that you use to authenticate with external services. For example, if you want to connect to a third-party analytics or music service, you likely need to use an API key to authenticate with it.

You could copy and paste the API key into a script or add it to a data store, but those approaches carry unnecessary security risks. The better solution is to use the secrets store and access the key using a small set of secure methods.

## Add secrets

To view, create, or edit secrets, you must be the experience owner or group owner. You can have up to 500 secrets per experience.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).

1. Select your experience, and then choose **Secrets** > **Create Secret**.

1. Provide a name, the secret, and the applicable domain.

   - The name acts as a unique identifier for the secret, so we recommend something descriptive.
   - Secrets can be up to 1,024 characters in length. API keys and access tokens should come from the service provider, but if the secret is a password, you probably created it yourself.
   - You can use a limited wildcard syntax for the domain, such as `*` for any domain (not recommended) or `*.example.com` for any subdomain at `example.com`. Specific domains are even better, such as `my.example.com`.

{/* Note the ability to manage these using Open Cloud when that arrives. */}

### Local secrets

For security reasons, the secrets store for each experience is only available to live game servers or [Team Test](../studio/testing-modes.md#collaborative-testing) environments. If you try to access a secret from a local test server, such as after pressing the **Play** button in Studio, you receive a `Can't find secret with given key` error.

To specify secrets for local testing, add valid JSON objects with base64-encoded secrets in [Game Settings](../studio/game-settings.md#security). The JSON can contain spaces, but must be on a single line.

<img alt="Local secret in the Game Settings window." src="../assets/data/secrets-store/local-secrets.png" width="700" />

For example, the following is the base64-encoded string `abcdefghijklmnopqrstuvwxyz` restricted to subdomains at `example.com`:

```json
{"secretName": ["YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=", "*.example.com"]}
```

To add multiple secrets, separate the values with commas:

```json
{"secretName1": ["dGVzdDE=", "*.example.com"],"secretName2": ["dGVzdDI=", "*.example.com"],"secretName3": ["dGVzdDM=", "*.example.com"]}
```

## Use secrets

Before using secrets within your experience, you must enable **Allow HTTP Requests** in the [Game Settings](../studio/game-settings.md#security) **Security** tab. Then call `Class.HttpService:GetSecret()` within a script:

```lua
local HttpService = game:GetService("HttpService")

local testSecret = HttpService:GetSecret("test_secret")
```

Part of the appeal of using secret stores is that you can't accidentally print a secret. Instead of the secret itself, the following code outputs the name you provided when creating the secret:

```lua
print(testSecret) --> Secret(test_secret)
```

You can't manipulate the string directly. Instead, the `Datatype.Secret` data type lets you add a prefix and suffix to the secret to help form a URL or insert content like `Bearer`:

```lua
local HttpService = game:GetService("HttpService")

local testSecret = HttpService:GetSecret("test_secret")

local prefix = "https://my.example.com/endpoint?apiKey="
local suffix = "&user=username"
local url = testSecret:AddPrefix(prefix)
url = url:AddSuffix(suffix)
print(url) --> https://my.example.com/endpoint?apiKey=Secret(test_secret)&user=username
```

After you have a URL with the secret inserted, you can make standard HTTP requests using methods like `Class.HttpService:RequestAsync()`. Of course, you can ignore these methods and insert the secret directly into a header, too.

<Alert severity="info">
You can't include secrets in the HTTP request body, only the URL and headers.
</Alert>
