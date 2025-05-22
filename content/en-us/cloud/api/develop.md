---
title: Develop
description: Develop API on Roblox Cloud.
---

## Develop v2

import developV2 from '../legacy/develop/v2.json'

<SwaggerDocs
spec={developV2}
server="develop.roblox.com"
serverOverride="apis.roblox.com/legacy-develop"
showViewAllLink={false}
endpoints={[
{ path: "/v2/teamtest/{placeId}", method: "delete", scopesOverride: ["legacy-team-collaboration:manage"] }
]}
/>

## Develop v1

import developV1 from '../legacy/develop/v1.json'

<SwaggerDocs
spec={developV1}
server="develop.roblox.com"
serverOverride="apis.roblox.com/legacy-develop"
showViewAllLink={false}
endpoints={[
{ path: "/v1/places/{placeId}/teamcreate/active_session/members", method: "get", scopesOverride: ["legacy-team-collaboration:manage"] },
{ path: "/v1/universes/{universeId}/activate", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/universes/{universeId}/deactivate", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/universes/{universeId}/permissions", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/universes/{universeId}/teamcreate", method: "patch", scopesOverride: ["legacy-team-collaboration:manage"] },
{ path: "/v1/universes/{universeId}/teamcreate", method: "get", scopesOverride: ["legacy-team-collaboration:manage"] },
{ path: "/v1/universes/{universeId}/teamcreate/memberships", method: "delete", scopesOverride: ["legacy-team-collaboration:manage"] },
{ path: "/v1/universes/multiget/permissions", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/universes/multiget/teamcreate", method: "get", scopesOverride: ["legacy-team-collaboration:manage"] },
{ path: "/v1/user/groups/canmanage", method: "get", scopesOverride: ["legacy-group:manage"] }
]}
/>
