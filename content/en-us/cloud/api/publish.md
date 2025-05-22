---
title: Game internationalization
description: Game internationalization API on Roblox Cloud.
---

## Publish v1

import publishV1 from '../legacy/publish/v1.json'

<SwaggerDocs
spec={publishV1}
server="publish.roblox.com"
serverOverride="apis.roblox.com/legacy-publish"
showViewAllLink={false}
endpoints={[
{ path: "/v1/badges/{badgeId}/icon", method: "post", scopesOverride: ["legacy-badge:manage"] }
]}
/>
