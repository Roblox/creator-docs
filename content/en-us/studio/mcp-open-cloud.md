---
title: Use Open Cloud with the Studio MCP server
description: Call Open Cloud APIs from the Studio MCP server without an API key, and control which actions your MCP client can take in each game.
---

The [Studio MCP server](./mcp.md) can call [Open Cloud](../cloud/index.md) APIs on your behalf. Your MCP client can upload assets, manage developer products and game passes, change game settings, and more without creating or pasting an [API key](../cloud/auth/api-keys.md).

You decide what your client is allowed to do. Permissions are saved to your Roblox account for each game, and Studio enforces them on every request.

## Prerequisites

Before you use Open Cloud with the Studio MCP server:

- Enable the Studio MCP server and connect your client. For more information, see [Connect to the Roblox Studio MCP server](./mcp.md).
- Open a place that belongs to a published game. Permissions are saved per game, so unpublished local places can't use them.
- Have permission to manage the game. If a group owns the game, your group role must allow the actions you grant to the client.

## How it works

The Studio MCP server adds the `open_cloud_invoke` tool. Studio manages access for you. Your client can only use the scopes you've enabled for the current game, and it never sees or handles credentials. Only you can change your permissions. Your client can't enable them on its own.

For each game, you control which Open Cloud scopes your client can call, which folders it can upload from, whether data store and memory store calls work from `execute_luau`, and whether scripts can make HTTP requests and to which domains.

<table>
<thead>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`method`</td>
    <td>`GET`, `POST`, `PUT`, `PATCH`, or `DELETE`.</td>
  </tr>
  <tr>
    <td>`endpoint`</td>
    <td>The path under `https://apis.roblox.com`, including any query string. For example, `/cloud/v2/universes/123`.</td>
  </tr>
  <tr>
    <td>`body`</td>
    <td>A JSON-encoded request body. Omit for `GET` and `DELETE`.</td>
  </tr>
  <tr>
    <td>`scopes`</td>
    <td>The scopes the endpoint requires, such as `["universe:read"]`. Optional, but returns a clear error if a required scope isn't enabled.</td>
  </tr>
  <tr>
    <td>`files`</td>
    <td>Local files for `multipart/form-data` endpoints, such as asset uploads. Files must be in an approved [upload folder](#upload-folders).</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
Permissions are per person. If you work on a game with collaborators, each collaborator sets their own permissions. Enabling a permission for yourself doesn't enable it for anyone else.
</Alert>

<Alert severity="info">
These permissions apply to external MCP clients only. They don't change what Assistant can do inside Studio.
</Alert>

## Manage permissions

To manage permissions for the game you have open, click **MCP** in the bottom-right corner of Studio, then select the **MCP Permissions** tab. Or, from Assistant:

1. Open **Assistant**.
2. Click **…**&nbsp;⟩ **Settings**.
3. Select the **MCP Permissions** tab.
4. Enable or disable permissions. Changes apply to your client's next request.

### Access levels

Pick an access level as a starting point, then enable or disable individual permissions. Each game starts at **Balanced**.

<table>
<thead>
  <tr>
    <th>Access level</th>
    <th>What it turns on</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Safe**</td>
    <td>Low-risk scopes only. Most permissions are off.</td>
  </tr>
  <tr>
    <td>**Balanced**</td>
    <td>Low- and moderate-risk scopes.</td>
  </tr>
  <tr>
    <td>**Full access**</td>
    <td>All scopes, including high-risk ones that can cost Robux, affect your players, or publish to your live game.</td>
  </tr>
  <tr>
    <td>**Custom**</td>
    <td>Shown when you change any permission after picking a level.</td>
  </tr>
</tbody>
</table>

Roblox sets the risk level for each scope.

### Permission sections

Permissions are grouped by what they let your client do. Each section maps to one or more Open Cloud [scopes](../cloud/reference/scopes.md) or script capabilities. For details on each scope, see the [Open Cloud scopes](../cloud/reference/scopes.md) reference.

<table>
<thead>
  <tr>
    <th>Section</th>
    <th>What it allows</th>
    <th>Scopes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Look at your game**</td>
    <td>Read game and place settings, version history, analytics, and instances.</td>
    <td>`universe:read`, `universe.place:read`, `universe.analytics:read`, `universe.place.instance:read`</td>
  </tr>
  <tr>
    <td>**Edit your game**</td>
    <td>Change game and place settings, publish, restart servers, and edit instances remotely.</td>
    <td>`universe:write`, `universe.place:write`, `universe.place.instance:write`</td>
  </tr>
  <tr>
    <td>**Players & social**</td>
    <td>Read profiles and inventories, send notifications, manage groups and forums, manage events, and read saved Creator Store items.</td>
    <td>`user.*`, `group:*`, `group-forum:read`, `universe.event:*`, `creator-store-save:*`</td>
  </tr>
  <tr>
    <td>**Save & load data**</td>
    <td>Use `Class.DataStoreService` and `Class.MemoryStoreService` from `execute_luau`.</td>
    <td>`universe-datastores.*`, `universe.ordered-data-store.*`, `memory-store.*`</td>
  </tr>
  <tr>
    <td>**Connect to the internet**</td>
    <td>Make HTTP requests from Luau to domains you allow, and publish cross-server messages.</td>
    <td>`Network` capability, `universe-messaging-service:publish`</td>
  </tr>
  <tr>
    <td>**Publish & manage assets**</td>
    <td>Upload assets and check their status, share assets, manage Creator Store listings, publish place versions, and manage thumbnails.</td>
    <td>`asset:*`, `asset-permissions:write`, `creator-store-product:*`, `universe-places:write`, `universe.thumbnail:*`</td>
  </tr>
  <tr>
    <td>**Money & monetization**</td>
    <td>Create and edit developer products, game passes, and ad campaigns, and read subscriptions.</td>
    <td>`developer-product:*`, `game-pass:*`, `ad.campaign:*`, `ad.billing:read`, `universe.subscription-product.subscription:read`</td>
  </tr>
  <tr>
    <td>**Player consequences**</td>
    <td>Read, create, and remove bans.</td>
    <td>`universe.user-restriction:*`</td>
  </tr>
  <tr>
    <td>**Security & credentials**</td>
    <td>Read secret names and create secrets, and run Luau in the cloud.</td>
    <td>`universe.secret:*`, `universe.place.luau-execution-session:*`</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
Some permissions can cost Robux, affect your players, or publish changes to your live game. These include **Money & monetization**, **Player consequences**, **Security & credentials**, `universe:write`, and `universe-places:write`. Enable them only for tasks that require them, and disable them when you finish.
</Alert>

### Upload folders

Your client can only upload files from folders you approve. Add a folder before asking your client to upload assets, and keep exports there.

The client can't copy or move files into an approved folder to bypass this restriction. If a file is elsewhere, move it yourself or approve its folder.

### Data stores and memory stores

Your client accesses data stores and memory stores through `Class.DataStoreService` and `Class.MemoryStoreService` in `execute_luau`, not through Open Cloud. To use them:

1. Enable the scopes you need under **Save & load data**. Reads require `universe-datastores.objects:read`. Writes require `universe-datastores.objects:update`.
2. In **Game Settings**&nbsp;⟩ **Security**, enable **Enable Studio Access to API Services**. This game setting is separate from your MCP permissions.

<Alert severity="warning">
Studio uses your live data stores. Writes from your client change real player data. Consider testing against a separate game first.
</Alert>

### HTTP requests

To let scripts your client runs make HTTP requests with `Class.HttpService`:

1. Enable **Connect to the internet**. This grants the `Network` [script capability](../scripting/capabilities.md).
2. Add each domain your client needs to the **HTTP domain allow list**.

Studio denies requests to any domain that isn't on the list.

### Unavailable permissions

Some scopes can't be granted to an MCP client. These include badge scopes, `universe-datastores.control:*`, `universe-datastores.objects:create`, analytics alerts, and all `legacy-*` scopes. Use the [Creator Dashboard](https://create.roblox.com/dashboard/creations) or an [API key](../cloud/auth/api-keys.md) for these tasks.

Some endpoints also reject the token Studio uses, even when the matching scope is enabled. If that happens, your client reports the error and suggests another way to complete the task.

## Import a 3D model

Importing assets from Blender, Maya, or another 3D tool is a common workflow. Your client exports the model, uploads it, inserts it, then compares the result against the source and fixes what the import changed.

To import a model:

1. Enable **Publish & manage assets**&nbsp;⟩ `asset:read` and `asset:write`.
2. Approve the folder your exports go into.
3. Open the model in your 3D tool, or export it as `.glb` or `.fbx` into the approved folder.
4. Prompt your client. For example:

   > Import the castle from my open Blender file into Studio, next to the spawn point.

The import skill tells your client to confirm before uploading. It then:

- Checks each mesh against the triangle limit, and asks whether to split or simplify any that exceed it.
- Uploads the model and waits for moderation.
- Inserts the model and fixes scale, rotation, missing textures, colors, and anchoring.
- Places the model on the ground, clear of other objects and spawn points.

<Alert severity="warning">
Uploads create permanent assets owned by the game's owner. If a group owns the game, uploads go to the group. Open Cloud can't archive or delete them. To remove an asset, use the [Creator Dashboard](https://create.roblox.com/dashboard/creations). You're responsible for what's uploaded to your account, including uploads your client makes for you.
</Alert>

For supported asset types, formats, and size limits, see [Usage guide for assets](../cloud/guides/usage-assets.md#supported-asset-types-and-limits).

## Skills

The following skills teach your client how to use these permissions. Clients connected through MCP get them automatically and load them with the `skill` tool. To view them, open **Assistant**, click **…**&nbsp;⟩ **Assistant Settings**, then select **Skills**. To adapt one to your workflow, select it and click **Duplicate**, then edit your copy. Your copy replaces the original, but doesn't receive future updates.

<table>
<thead>
  <tr>
    <th>Skill</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`rbx-open-cloud-usage`</td>
    <td>Calls Open Cloud with `open_cloud_invoke`, selects the correct endpoint, and handles errors.</td>
  </tr>
  <tr>
    <td>`rbx-permissions`</td>
    <td>Determines which permissions a task needs, checks which are enabled, and asks you for only the missing ones.</td>
  </tr>
  <tr>
    <td>`rbx-import-asset`</td>
    <td>Imports a model from an external 3D tool, then checks and fixes it in Studio.</td>
  </tr>
</tbody>
</table>

## Troubleshooting

When a request is blocked, the client reports what's missing. It never bypasses a permission you've disabled.

<table>
<thead>
  <tr>
    <th>Error</th>
    <th>Cause</th>
    <th>Fix</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Scope '<scope>' has not been granted`</td>
    <td>The scope is disabled, or the name is misspelled.</td>
    <td>Enable the scope in the matching section.</td>
  </tr>
  <tr>
    <td>HTTP `403` or `401`, with the scope enabled</td>
    <td>The endpoint doesn't accept the MCP token.</td>
    <td>Use the Creator Dashboard or an API key for this task.</td>
  </tr>
  <tr>
    <td>`lacking capability <capability>`</td>
    <td>A script needs a capability that isn't granted.</td>
    <td>Enable **Connect to the internet** for `Network`. Other capabilities can't be granted.</td>
  </tr>
  <tr>
    <td>`domain <domain> is not in the Assistant HTTP allowlist`</td>
    <td>The domain isn't on your allow list.</td>
    <td>Add it under **Connect to the internet**&nbsp;⟩ **HTTP domain allow list**.</td>
  </tr>
  <tr>
    <td>`502 … Access forbidden` from a data store call</td>
    <td>The matching **Save & load data** scope is disabled.</td>
    <td>Enable the read or update scope.</td>
  </tr>
  <tr>
    <td>`Studio access to APIs is not allowed`</td>
    <td>Studio API access is disabled for this game.</td>
    <td>Enable **Game Settings**&nbsp;⟩ **Security**&nbsp;⟩ **Enable Studio Access to API Services**.</td>
  </tr>
  <tr>
    <td>`InternalError` from a memory store call</td>
    <td>The `memory-store.*` scopes are disabled.</td>
    <td>Enable the memory store scopes under **Save & load data**.</td>
  </tr>
  <tr>
    <td>File not in an approved upload directory</td>
    <td>The file is outside your approved folders.</td>
    <td>Approve the folder, or move the file into one.</td>
  </tr>
</tbody>
</table>
