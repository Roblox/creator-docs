---
title: Managing API Keys
description: Explains how to create API keys and add permissions to use Open Cloud web APIs for your experience.
---

Open Cloud authenticates and authorizes API access with the use of API keys,
which allow you to add granular permissions and security control for accessing
and utilizing certain resources in your experience, such as data stores and
places.

All Open Cloud APIs require you to create an API key with valid permissions and
include an `x-api-key` header in your request, which allows the application to
authenticate to Open Cloud on your behalf.

## Creating API Keys

You can create and configure API keys for your individually-owned
experiences or group-owned experiences (A Roblox
[group](../../projects/groups.md) allows multiple creators to work on the same
experience, use the same assets, and share API keys).

You must be the group owner or assigned to a role within the group that has the
API key admin permission in order to create an API key for your group. A group
member can only create an API key with the same resource access permissions of
their role. For example, only group members with the **Create and edit group
experiences** permission can create an API key that can publish a place file.

To create an API key:

1. Navigate to the [Creator Dashboard](https://create.roblox.com).

1. (Optional) Click the **CREATOR** dropdown to select a group if you are
   creating the API key for a group.
1. On the navigation menu, select **Open Cloud** > **API Keys**.
1. Click the **Create API Key** button.
1. Enter a unique name for your API key. Use a name that can help you recall the
   purpose later, such as `PLACE_PUBLISHING_KEY` for publishing places to your
   experience.
1. In the **Access Permissions** section, select an API from the **Select API
   System** menu and click the **Add API System** button. Repeat this step if
   you need to add multiple APIs to the key.
1. Select the experience that you want to access with the API key.
1. From the **Experience Operations** dropdown, select the operations that you
   want to enable for the API key. For example, if you want to write a script to
   create new data stores entries, select the **Create Entry** operation. <Alert
   severity="warning"> For security reasons, configure the least amount of API
   and operation permissions as required, so bad actors wouldn't be able to
   access any other of your resources in case your API key is leaked. </Alert>

1. In the **Security** section, explicitly set IP access to the key using [CIDR
   notation](#cidr-format), otherwise you can't use the API key. You can find
   the IP address of your local machine and add it to the **Accepted IP
   Addresses** section along with additional IP addresses for those that need
   access. If you don't have a fixed IP, or you are using the API key only in a
   local environment, you can just add `0.0.0.0/0` to the **Accepted IP
   Addresses** section to allow any IPs to use your API key.

1. **(Optional)**: To add additional protection for your resources, set an
   explicit expiration date so your key automatically stops working after that
   date.
1. Click the **Save and Generate key** button.
1. Copy and save the API key string to a secure location that is **not** a
   public repository of your code.
1. Check your created API key on the
   [Credentials](https://create.roblox.com/credentials) page of **Creator
   Dashboard**.

<Alert severity="warning"> The API key string is equivalent to the password of
your application. Never share it with untrusted parties, such as anyone outside
of your development team. </Alert>

## Group-Owned API Key Permissions

Group owners can manage group-owned API key permissions for group members to
have different levels of control of API keys based on the [roles and
permissions](../../projects/groups.md#roles-and-permissions) within the group.
There are also situations that automatically revoke API key management
permissions for group members.

### Permissions Granting

As a group owner, you can grant the **Administer all group API keys** permission
to roles within your group. Members with this permission have all the
permissions that a group owner has for API keys, including the ability to
create, view, edit, revoke, and audit all of the group's API keys.

You can also grant the **Create group API keys** permission to roles within your
group. This allows members to only create and view keys owned by them rather
than being able to manage others' keys.

### Permissions Invalidation

There are multiple situations that automatically revoke a group member's
permission to manage group API keys:

- The member is assigned to a different role that doesn't have the permission.
  This can happen during a transfer of the group ownership.
- The member's permission is disabled on their currently assigned role.
- The member leaves or is removed from the group.
- The member's account is under moderation by Roblox.

In any of these cases, API keys generated by that user are given the **Revoked**
[status](#api-key-status). To use these keys again, the group owner or a member
with the **Administer all group API keys** permission must regenerate the keys.

## CIDR Format

To further protect your resources, when [creating an API
key](#creating-api-keys), specify IP addresses that can access the API key with
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

## API Key Status

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
