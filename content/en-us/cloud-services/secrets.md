---
title: Secrets stores
description: Securely manage API keys, passwords, and assess tokens for third-party services with your experience's secrets store.
---

Roblox offers a **secrets** store for each experience. Secrets are sensitive information like API keys, passwords, and access tokens that you use to authenticate with external services. For example, if you want to connect to a third-party analytics or music service, you likely need to use an API key to authenticate with it.

You could copy and paste the API key into a script or add it to a data store, but those approaches carry unnecessary security risks. The better solution is to use the secrets store and access the key using a small set of secure methods.

## Add secrets

To view, create, or edit secrets, you must be the experience owner or group owner. You can have up to 500 secrets per experience.

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
2. Select your experience, and then select **Secrets** ⟩ **Create Secret**.
3. Enter a name, the secret, and the applicable domain.

   - The name acts as a unique identifier for the secret, so we recommend something descriptive.
   - Secrets can be up to 1,024 characters in length. API keys and access tokens should come from the service provider, but if the secret is a password, you probably created it yourself.
   - You can use a limited wildcard syntax for the domain, such as `*` for any domain (not recommended) or `*.example.com` for any subdomain at `example.com`. Specific domains are even better, such as `my.example.com`.

<Alert severity="success">
You can also use Open Cloud to manage your secrets. See the [reference documentation](../cloud/api/secrets-store.md) and [guide](../cloud/guides/secrets-store.md).
</Alert>

## Local secrets

For security reasons, the secrets store for each experience is only available to live servers or [collaborative testing](../studio/testing-modes.md#collaborative-testing) environments. If you try to access a secret during [local playtesting](../studio/testing-modes.md#playtesting), you receive a `Can't find secret with given key` error. You receive an identical error if you try to access secrets from a client script.

To specify secrets for local testing, go to Studio and then go to **File** ⟩ **Experience Settings** ⟩ **Security**. You can create new secrets and edit or delete existing secrets in the **Secrets** section.

<img src="../assets/data/secrets-store/LocalSecrets.png" width="750px" alt="View, create, edit secrets with the Secrets UI."/>

<img src="../assets/data/secrets-store/LocalSecrets_Edit.png" width="750px" alt="Add a new secret with name secretName1, value 123456, and restricted to domain *.example.com."/>

## Use secrets

Before using secrets within your experience, you must enable **Allow HTTP Requests** in the **Security** section of Studio's **File** ⟩ **Experience Settings** window. Then call `Class.HttpService:GetSecret()` within a server script:

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
