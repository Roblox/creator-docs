---
title: Localization tables
description: Game internationalization API on Roblox Cloud.
---

## Localization tables v1

import localizationtablesV1 from '../legacy/localizationtables/v1.json'

<SwaggerDocs
spec={localizationtablesV1}
server="localizationtables.roblox.com"
serverOverride="apis.roblox.com/legacy-localization-tables"
showViewAllLink={false}
endpoints={[
{ path: "/v1/autolocalization/games/{gameId}/autolocalizationtable", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/autolocalization/games/{gameId}/settings", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/autolocalization/metadata", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/limits", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/tables/{assetId}", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/tables/{tableId}", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/tables/{tableId}", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/tables/{tableId}/entries", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/tables/{tableId}/entries/translation-history", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/localization-table/tables/{tableId}/entry-count", method: "get", scopesOverride: ["legacy-universe:manage"] }
]}
/>
