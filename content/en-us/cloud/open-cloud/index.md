---
title: Open Cloud
description: In addition to using Engine and Studio tools to create experiences on Roblox, you can automate your internal workflows, improve your efficiency creating content, and support your experience operation needs from the web.
---

With Open Cloud, you can access Roblox resources through standard REST APIs, which lets you build everything from command line automation tools to complex web apps. The Open Cloud APIs support HTTPS and let you update experiences, restart servers, work with your data stores and memory stores, manage user restrictions, list inventory items, and much, much more.

<a href="../reference/index.md">
  <Button variant="contained">Open Cloud API Reference</Button>
</a>

## About the APIs

Roblox has four categories of HTTP REST API:

- [Open Cloud v2](../reference/index.md)
- [Open Cloud v1](../reference/index.md)
- [Legacy with API key and/or OAuth 2.0 authentication](../legacy.md)
- [Legacy with cookie authentication](../legacy.md)

Whenever possible, use the Open Cloud v2 API. This API has the strongest stability guarantees and regularly adds new resources. The Open Cloud v1 API also has strong stability guarantees, but a more limited set of resources.

The legacy APIs, no matter which types of authentication they support, can incorporate breaking changes without notice and have minimal stability guarantees. They are not part of the Open Cloud v1 or v2 APIs, and we don't recommend them for production applications.

## Getting Started with Open Cloud

1. Set up authentication for your application.

   See the documentation for how to use [API keys](api-keys.md) or [OAuth 2.0](oauth2-overview.md). API keys are the easiest way to get started.

1. Test API calls using tools like [Postman](https://www.postman.com) with [OpenAPI descriptions](../reference/openapi.md) and the [OAuth 2.0 sample app](oauth2-sample.md).
1. Review the [resource guides](experience-notifications.md) for end-to-end walkthroughs of using certain APIs.
1. See the Open Cloud [reference documentation](../reference/index.md) for the full list of v1 and v2 resources, [common API patterns](../reference/patterns.md), and [types](../reference/types.md).
