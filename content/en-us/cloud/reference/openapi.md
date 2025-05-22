---
title: OpenAPI descriptions
description: Provides links to the Open Cloud JSON files that are compliant to the OpenAPI Specification, explains their use cases, and outlines additional information.
---

Some of the reference pages are rendered from JSON files that are [OpenAPI descriptions](https://learn.openapis.org/glossary.html). These files use [version 3.0.4](https://spec.openapis.org/oas/v3.0.4) of the OpenAPI specification.

These files are open source and can be used with tools like the [Swagger Editor](https://editor.swagger.io/) and [Postman](https://www.postman.com/) to test API calls and help streamline development.

These OpenAPI descriptions are still under active development and may contain issues. Use the reference and features section pages as official documentation.

## OpenAPI description files

OpenAPI description files are available at the following locations within the [creator-docs](https://github.com/Roblox/creator-docs/tree/main/content/en-us/reference/cloud) repository:

```text
# Open Cloud v2
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/cloud.docs.json

# Assets
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/assets/v1.json

# Ordered Data Stores
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/datastores-api/ordered-v1.json

# Standard Data Stores
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/datastores-api/v1.json

# Messaging
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/messaging-service/v1.json

# Place publishing
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/universes-api/v1.json
```

### Vendor extensions

Roblox uses [specification extensions](https://spec.openapis.org/oas/v3.0.4#specification-extensions) to extend the OpenAPI specification. These extensions represent information that the specification doesn't capture by default. Extensions may appear throughout the file where allowed by the OpenAPI specification.

The majority of these specification extensions are experimental. The extensions used are subject to change without notice in favor of fields found within the official OpenAPI specification.

| Extension                     	| Location         	| Description                                                                                                                            	|
|-------------------------------	|------------------	|----------------------------------------------------------------------------------------------------------------------------------------	|
| `x-roblox-extensions-version` 	| OpenAPI Object   	| A version string, using semantic versioning, that represents the versions of the extensions specified here and other common structures 	|
| `x-roblox-stability`          	| Operation Object 	| A string that represents an operation's stability level.                                                                               	|
| `x-roblox-deprecated`         	| Operation Object 	| An object that provides additional information related to an endpoint's deprecation status.                                            	|
| `x-roblox-alternatives`       	| Operation Object 	| An object that provides additional information related to an endpoint's alternatives.                                                  	|
| `x-roblox-rate-limits`        	| Operation Object 	| An object that provides rate limiting information for an endpoint.                                                                     	|
| `x-roblox-scopes`             	| Operation Object 	| An object that provides the list of required, conditional, and optional scopes that are associated with an endpoint.                   	|
| `x-roblox-engine-usability`   	| Operation Object 	| An object indicating the endpoint's usability with the Roblox engine.                                                                  	|

In addition to these specification extensions, Open Cloud v2 APIs have a few additional extensions:

**Open Cloud v2 specification extensions**

| Extension                             | Location         | Description                                                                                                                                                                                    |
|---------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `x-categories`                        | OpenAPI Object   | List of strings. All resource categories.                                                                                                                                                      |
| `x-visibility`                        | Operation Object | Boolean. The visibility of the operation.                                                                                                                                                      |
| `x-roblox-docs`                       | Operation Object | Object. Associates an operation with a category and resource.                                                                                                                                  |
| `x-long-running-operation-parameters` | Operation Object | Object. References the metadata and response for the operation`s long running response.                                                                                                        |
| `x-aep-resource`                      | Schema Object    | Object. An extension annotating the resource type. Has close compatibility to [AEP-4](https://aep.dev/4/#annotating-resource-types), one of the [API Enhancement Proposals](https://aep.dev/). |
| `x-oneOf`                             | Schema Object    | Object. Each field contains a list of properties in the schema. Only one of the properties should be present.                                                                                  |
| `x-resource`                          | Schema Object    | Boolean. Whether the schema is a resource.                                                                                                                                                     |
| `x-immutable`                         | Schema Object    | Boolean. Whether the schema is immutable.                                                                                                                                                      |
