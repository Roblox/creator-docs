---
title: Cloud API reference
description: Get comprehensive API reference documentation for Open Cloud.
---

With Open Cloud, you can access Roblox resources through standard REST APIs, which lets you build everything from command line automation tools to complex web apps. The Open Cloud APIs support HTTPS and use [API keys](./auth/api-keys.md) or [OAuth 2.0](./auth/oauth2-overview.md) for authentication. You can update experiences, restart servers, work with your data stores and memory stores, manage user restrictions, list inventory items, and much, much more.

## About the APIs

Roblox has four categories of HTTP REST API:

- Open Cloud v2
- Open Cloud v1
- [Legacy with API key and/or OAuth 2.0 authentication](legacy.md)
- [Legacy with cookie authentication](legacy.md)

Whenever possible, use Open Cloud v2, Open Cloud v1, or legacy endpoints that support API key and/or OAuth 2.0 authentication. These APIs have strong stability guarantees and regularly add new resources.

Legacy API endpoints with cookie authentication can incorporate breaking changes without notice and have minimal stability guarantees. We don't recommend them for production applications.

<Alert severity="info">
Roblox also offers [webhooks](./webhooks/webhook-notifications.md), which can notify your applications when certain events occur, such as refunds or changes to subscriptions.
</Alert>

## Get started with Open Cloud

1. Set up authentication for your application.

   See the documentation for how to use [API keys](./auth/api-keys.md) or [OAuth 2.0](./auth/oauth2-overview.md). API keys are the easiest way to get started.

1. Test API calls using tools like [Postman](https://www.postman.com) with [OpenAPI descriptions](./reference/openapi.md) or the [OAuth 2.0 sample app](./auth/oauth2-sample.md).
1. Review the [resource guides](./guides/index.md) for end-to-end walkthroughs of using certain APIs.
1. Explore the left navigation for the full list of Open Cloud v2 and v1 resources, [common API patterns](./reference/patterns.md), [types](./reference/types.md), and [error codes](./reference/errors.md).
