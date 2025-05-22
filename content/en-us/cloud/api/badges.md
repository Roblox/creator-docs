---
title: Badges
description: Badges API on Roblox Cloud.
---

## Badges v1

import badgesV1 from '../legacy/badges/v1.json'

<SwaggerDocs
spec={badgesV1}
server="badges.roblox.com"
serverOverride="apis.roblox.com/legacy-badges"
showViewAllLink={false}
endpoints={[
{ path: "/v1/badges/{badgeId}", method: "patch", scopesOverride: ["legacy-universe.badge:write", "legacy-universe.badge:manage-and-spend-robux"] },
{ path: "/v1/universes/{universeId}/badges", method: "post", scopesOverride: ["legacy-universe.badge:manage-and-spend-robux"] }
]}
/>

Robux might be required to create a badge. To identify the number of remaining free badges you can create for the current UTC day in the specified universe, use the `/v1/universes/{universeId}/free-badges-quota` endpoint found [here](/cloud/legacy/badges/v1).
