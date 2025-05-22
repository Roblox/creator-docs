---
title: Game internationalization
description: Game internationalization API on Roblox Cloud.
---

## Game internationalization v1

import gameinternationalizationV1 from '../legacy/gameinternationalization/v1.json'

<SwaggerDocs
spec={gameinternationalizationV1}
server="gameinternationalization.roblox.com"
serverOverride="apis.roblox.com/legacy-game-internationalization"
showViewAllLink={false}
endpoints={[
{ path: "/v1/badges/{badgeId}/description/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/icons", method: "get", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/icons/language-codes/{languageCode}", method: "post", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/icons/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/name-description", method: "get", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/name-description/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/name-description/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/badges/{badgeId}/name/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-badge:manage"] },
{ path: "/v1/developer-products/{developerProductId}/description/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/icons", method: "get", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}", method: "post", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/icons/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/name-description", method: "get", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/name-description/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/developer-products/{developerProductId}/name/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-developer-product:manage"] },
{ path: "/v1/game-icon/games/{gameId}", method: "get", scopesOverride: ["legacy-universe:manage:manage"] },
{ path: "/v1/game-icon/games/{gameId}/language-codes/{languageCode}", method: "post", scopesOverride: ["legacy-universe:manage:manage"] },
{ path: "/v1/game-icon/games/{gameId}/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-universe:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/description/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/icons", method: "get", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}", method: "post", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/icons/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/name-description", method: "get", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/name-description/language-codes/{languageCode}", method: "delete", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-passes/{gamePassId}/name/language-codes/{languageCode}", method: "patch", scopesOverride: ["legacy-game-pass:manage:manage"] },
{ path: "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/alt-text", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/image", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/{imageId}", method: "delete", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/game-thumbnails/games/{gameId}/language-codes/{languageCode}/images/order", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/name-description/games/{gameId}", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/name-description/games/translation-history", method: "post", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/source-language/games/{gameId}", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/supported-languages/games/{gameId}", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/supported-languages/games/{gameId}/automatic-translation-status", method: "get", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/supported-languages/games/{gameId}/languages/{languageCode}/automatic-translation-status", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/supported-languages/games/{gameId}/languages/{languageCode}/universe-display-info-automatic-translation-settings", method: "patch", scopesOverride: ["legacy-universe:manage"] },
{ path: "/v1/supported-languages/games/{gameId}/universe-display-info-automatic-translation-settings", method: "get", scopesOverride: ["legacy-universe:manage"] }
]}
/>
