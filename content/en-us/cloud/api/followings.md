---
title: Followings
description: Followings API on Roblox Cloud.
---

## Followings v2

import followingsV2 from '../legacy/followings/v2.json'

<SwaggerDocs
spec={followingsV2}
server="followings.roblox.com"
serverOverride="apis.roblox.com/legacy-followings"
showViewAllLink={false}
endpoints={[
{ path: "/v2/users/{userId}/universes", method: "get", scopesOverride: ["legacy-universe.following:read"] }
]}
/>

## Followings v1

import followingsV1 from '../legacy/followings/v1.json'

<SwaggerDocs
spec={followingsV1}
server="followings.roblox.com"
serverOverride="apis.roblox.com/legacy-followings"
showViewAllLink={false}
endpoints={[
{ path: "/v1/users/{userId}/universes", method: "get", scopesOverride: ["legacy-universe.following:read"] },
{ path: "/v1/users/{userId}/universes/{universeId}", method: "post", scopesOverride: ["legacy-universe.following:write"] },
{ path: "/v1/users/{userId}/universes/{universeId}", method: "delete", scopesOverride: ["legacy-universe.following:write"] },
{ path: "/v1/users/{userId}/universes/{universeId}/status", method: "get", scopesOverride: ["legacy-universe.following:read"] }
]}
/>
