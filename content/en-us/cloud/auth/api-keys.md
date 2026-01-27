---
title: Manage API keys
description: Explains how to create API keys and add permissions to use Open Cloud web APIs for your experience.
---

Open Cloud authenticates and authorizes API access with the use of API keys,
which allow you to add granular permissions and security control for accessing
and utilizing certain resources in your experience, such as data stores and
places.

All Open Cloud APIs require you to create an API key with valid permissions and
include an `x-api-key` header in your request, which allows the application to
authenticate to Open Cloud on your behalf.

## Create API keys

<Alert severity="warning">
All references to API keys in the text below refer to user-owned keys.
</Alert>

You can create and configure API keys to access your resources. An API key's access is determined by the permissions of the user who owns it. This means it can generally access any resource the user has permissions for, including their individual experiences and any [group-owned](../../projects/groups.md) experiences where they have the appropriate role. Some scopes can be restricted to specific experiences, but not all.

For details on how to create API keys for managing group resources, see the [Create API keys for managing group-owned resources](#create-api-keys-for-managing-group-owned-resources) section below.

To create an API key:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), go to the [API Keys](https://create.roblox.com/dashboard/credentials?activeTab=ApiKeysTab) page.
1. Click the **Create API Key** button.
1. Enter a unique name for your API key. Use a name that can help you recall the
   purpose later, such as `PLACE_PUBLISHING_KEY` for publishing places to your
   experience.
1. In the **Access Permissions** section, select an API from the **Select API
   System** menu. Repeat this step if
   you need to add multiple APIs to the key.

1. If applicable, select the experience that you want to access with the API key.

   You can optionally disable **Restrict by Experience**. When disabled, your API key has access to all of your user-owned experiences and any group-owned experiences where you have the appropriate permissions, including any experiences you create in the future.

1. From the **Select Operations** dropdown, select the operations that you
   want to enable for the API key.

   Most operations in the [API reference](../index.md) include the required permission scopes. For example, the [flush memory store](/cloud/reference/MemoryStore#Cloud_FlushMemoryStore) operation requires the `universe.memory-store:flush` permission.

   For a list of all scopes and the APIs they support, see [Scopes](../reference/scopes.md).

1. **(Optional)** In the **Security** section, explicitly restrict IP access to the key using [CIDR
   notation](#cidr-format). You can find
   the IP address of your local machine and add it to the **Accepted IP
   Addresses** section along with additional IP addresses for those that need
   access. If you don't have a fixed IP, or you are using the API key only in a
   local environment, you can leave the `Restrict IP addresses` toggle unchecked to allow any IP to use your API key.

1. **(Optional)**: To add additional protection for your resources, set an expiration date for your key.
1. Click the **Save & Generate key** button.
1. Copy and save the API key string to a secure location, **not** a public repository for your code.
1. Verify the status of your API key on the
   [API Extensions](https://create.roblox.com/dashboard/credentials) page of **Creator
   Dashboard**.

<Alert severity="warning">
The API key string is equivalent to a password for your application. Never share it with untrusted parties, such as anyone outside of your development team.
</Alert>

## Create API keys for managing group-owned resources

An API key grants access to all resources the user account has permissions for, including personal experiences outside of the group. If you use your personal account's API key for group automation and that key is compromised, other resources you have access to are also at risk.

To prevent this, we **strongly recommend** creating a separate API key on a dedicated alternate account with access strictly limited to the target group. This new account dedicated for automation purposes should only be given access to the target group and granted the minimal permissions required for its task.

1. Create a new, dedicated Roblox account for your automation.
1. Invite the new account to your group.
1. Assign it a group role with the minimum permissions required for its task (e.g., only "Create and edit group experiences").
1. Log in to the new account and follow the steps in the section above to [create an API key](#create-api-keys).
1. Use the generated API key for group resource automation.

## Best Practices For Managing API Keys

API keys are sensitive credentials that should be kept secure to prevent unauthorized access to your data. Here are some best practices for managing API keys.

- **Create separate keys for each application**: Create separate API keys for each application or use case to isolate access and reduce the impact if a key is compromised.

- **Select the minimum permissions needed**: When configuring scopes, select the minimum permissions necessary for the key's intended use. For those scopes that allow you to restrict scope access by experience, limit access to only the specific experiences that are needed.

- **Use IP address restrictions**: Restrict API key access to specific IP addresses or CIDR ranges to prevent unauthorized usage from unknown locations. Do not use IP address restrictions when using your API key in Roblox places to ensure your key can be used with Roblox servers.

- **Set expiration dates**: For short-term use cases, configure expiration dates to automatically disable keys after a set period, reducing the risk if a key is compromised. Setting expiration dates is not recommended for longer-term use cases unless you have a key rotation process in place, as your automation can unexpectedly fail when the key expires.

- **Use dedicated alternate accounts for group resource management**: Use a dedicated account with minimal permissions for group resource management, as detailed in the [Create API keys for managing group-owned resources](#create-api-keys-for-managing-group-owned-resources) section.

- **Store API keys securely**: Never store API keys directly in your source code, version control systems, or scripts where they could be exposed. Use a secrets management system for storing and controlling access to your keys. In Roblox places, use a [Secrets Store](cloud-services/secrets).

- **Do not share API keys through public channels**: Never share API keys through public communication channels, forums, or social media. Only share keys through secure, private channels with trusted team members. Limit access to who you share your keys with to minimize the blast radius if a key is compromised.

## CIDR format

To further protect your resources, when [creating an API
key](#create-api-keys), specify IP addresses that can access the API key with
either normal IP addresses or using the [CIDR
notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation).
A CIDR IP address looks like a normal IP address except it ends with a slash and
a decimal that represents how many bits of the IP address are significant for
network routing:

- **Normal**: 192.168.0.0
- **CIDR**: 192.168.0.0/24

The former part is the IP address and the latter part is the **netmask**,
counting the bits of 1s in binary format. In the previous example, **24** means
**255.255.255.0** (24 1s) that allows all IPs between **192.168.0.0** and
**192.168.0.255**. Understanding CIDR format is particularly useful if you plan
to run your applications on a server.

## API key status

API keys initially have an active status, but they can become inactive over
their lifetime. To learn why an API key has changed status and how to return the
API key back to an active status, see the following table.

<Alert severity="warning"> If you or your group don't use or update an API key
for 60 days, it automatically expires, even if it doesn't have a set expiration
date. This reduces the risk of bad actors using old API keys. If you're no
longer using an API key, you should manually disable or delete it. </Alert>

<table>
<thead>
  <tr>
    <th>Status</th>
    <th>Reason</th>
    <th>Resolution</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Active</td>
    <td>No issues. The user can use the key to authenticate API calls.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td>Disabled</td>
    <td>The user disabled the key by disabling the <b>Enable Key</b> toggle.</td>
    <td>Enable the <b>Enable Key</b> toggle.</td>
  </tr>
  <tr>
    <td>Expired</td>
    <td>The key's expiration date has passed.</td>
    <td>Either remove or set a new expiration date.</td>
  </tr>
  <tr>
    <td>Auto-Expired</td>
    <td>The user hasn't used or updated the key in the past 60 days.</td>
    <td>You can either disable then enable the <b>Enable Key</b> toggle, or you can update any of the key's properties, such as the name, description, or expiration date.</td>
  </tr>
  <tr>
    <td>Revoked</td>
    <td>For group keys only. The account that generated the key no longer has the sufficient access permission to manage the group's keys.</td>
    <td>Click the <b>Regenerate Key</b> to get a new secret.</td>
  </tr>
  <tr>
    <td>Moderated</td>
    <td>A Roblox admin changed the key's secret for security reasons.</td>
    <td>Click the <b>Regenerate Key</b> to get a new secret.</td>
  </tr>
  <tr>
    <td>User Moderated</td>
    <td>The account that generated the key is under moderation by Roblox.</td>
    <td>Resolve the moderation issue on the account.</td>
  </tr>
</tbody>
</table>

## Introspect API keys

### `POST` api-keys/v1/introspect

Retrieve information about an API key. Verifies whether the key can be used from the requester's IP address and whether the key or the last generated user is moderated.

<h4>Request</h4>

`(application/json)`

| Key            | Value                  |
| -------------- | ---------------------- |
| apiKey  | `<api_key>`     |

```bash title="Example Introspect API Key Request"
curl --location --request POST 'https://apis.roblox.com/api-keys/v1/introspect' \
--header 'Content-Type: application/json' \
--data '{
    "apiKey": "your-api-key"
}'
```

<h4>Response</h4>

There are four possible resource identifiers that can be present in each scope object:

- userId
- groupId
- universeId
- universeDatastore

The userId and groupId identifiers are only relevant to scopes with the creator target. The universeDatastore identifier is only relevant to scopes with the universe-datastore target. The resource identifier will be omitted for scopes that do not support resource selection.

An asterisk (`*`) in the resource identifier list indicates that the scope has permission on all resources of that type.

```json title="Example Introspect API Key Response"
{
  "name": "test key",
  "authorizedUserId": 234,
  "scopes": [
    {
      "name": "universe-datastores.objects",
      "operations": [
        "create"
      ],
      "universeDatastores": [
        {
          "universeId": "123",
          "datastoreName": "playerData"
        }
      ]
    },
    {
      "name": "asset",
      "operations": [
        "write"
      ],
      "groupIds": [
        "*"
      ],
      "userIds": [
        "*"
      ]
    }
  ],
  "enabled": true,
  "expired": false,
  "expirationTimeUtc": "2026-01-01T12:00:00.000Z"
}
```
