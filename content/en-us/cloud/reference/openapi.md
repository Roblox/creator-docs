---
title: OpenAPI document
description: Provides a link to a OpenAPI document for the Roblox Cloud APIs that is compliant to the OpenAPI specification.
---

Roblox publishes an [OpenAPI 3.0.4 document](https://spec.openapis.org/oas/v3.0.4) (formerly known as a Swagger file) that contains **all** of the Roblox Cloud APIs. You can find this file, `openapi.json`, in the open source [creator-docs](https://github.com/Roblox/creator-docs/tree/main/content/en-us/reference/cloud) repository.

You can use OpenAPI documents with tools like the [Swagger Editor](https://editor.swagger.io/) and [Postman](https://www.postman.com/) to test calls and help streamline development. Tools like [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) can also generate client libraries for your preferred programming languages.

<Alert severity="warning">
This document is still under active development and may contain issues. Report a bug if you notice inaccurate information.
</Alert>

<a href="https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/">
  <Button variant="contained">Download openapi.json here</Button>
</a><br />

### Vendor extensions

Roblox uses [specification extensions](https://spec.openapis.org/oas/v3.0.4#specification-extensions) to extend the OpenAPI specification. These extensions represent information that the specification doesn't capture by default. Extensions may appear throughout the file where allowed by the OpenAPI specification.

The majority of these specification extensions are experimental. The extensions used are subject to change without notice in favor of fields found within the official OpenAPI specification.

| Extension                     | Location         | Description                                                                                                                            |
| ----------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `x-roblox-extensions-version` | OpenAPI object   | A version string, using semantic versioning, that represents the versions of the extensions specified here and other common structures |
| `x-roblox-stability`          | Operation object | A string that represents an operation's stability level.                                                                               |
| `x-roblox-deprecated`         | Operation object | An object that provides additional information related to an endpoint's deprecation status.                                            |
| `x-roblox-alternatives`       | Operation object | An object that provides additional information related to an endpoint's alternatives.                                                  |
| `x-roblox-rate-limits`        | Operation object | An object that provides rate limiting information for an endpoint.                                                                     |
| `x-roblox-scopes`             | Operation object | An object that provides the list of required, conditional, and optional scopes that are associated with an endpoint.                   |
| `x-roblox-engine-usability`   | Operation object | An object indicating the endpoint's usability with the Roblox engine.                                                                  |
