---
title: Asset delivery
description: Asset delivery API on Roblox Cloud.
---

## Asset delivery v1

import assetdeliveryV1 from '../legacy/assetdelivery/v1.json'

<SwaggerDocs
spec={assetdeliveryV1}
server="assetdelivery.roblox.com"
serverOverride="apis.roblox.com/asset-delivery-api"
showViewAllLink={false}
endpoints={[
{ path: "/v1/assetId/{assetId}", method: "get", scopesOverride: ["legacy-asset:manage"] },
{ path: "/v1/assetId/{assetId}/version/{versionNumber}", method: "get", scopesOverride: ["legacy-asset:manage"] }
]}
/>
