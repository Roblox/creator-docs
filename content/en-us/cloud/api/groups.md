---
title: Followings
description: Followings API on Roblox Cloud.
---

## Groups v1

import groupsV1 from '../legacy/groups/v1.json'

<SwaggerDocs
spec={groupsV1}
server="groups.roblox.com"
serverOverride="apis.roblox.com/legacy-groups"
showViewAllLink={false}
endpoints={[
{ path: "/v1/groups/{groupId}/audit-log", method: "get", scopesOverride: ["legacy-group:manage"] },
{ path: "/v1/groups/{groupId}/description", method: "patch", scopesOverride: ["legacy-group:manage"] },
{ path: "/v1/groups/{groupId}/notification-preference", method: "patch", scopesOverride: ["legacy-user:manage"] },
{ path: "/v1/groups/{groupId}/settings", method: "patch", scopesOverride: ["legacy-group:manage"] },
{ path: "/v1/groups/{groupId}/settings", method: "get", scopesOverride: ["legacy-group:manage"] },
{ path: "/v1/groups/{groupId}/status", method: "patch", scopesOverride: ["legacy-group:manage"] },
{ path: "/v1/groups/policies", method: "post", scopesOverride: ["legacy-group:manage"] },
{ path: "/v1/user/groups/pending", method: "get", scopesOverride: ["legacy-group:manage"] }
]}
/>
