---
title: OpenAPI descriptions
description: Provides links to the Open Cloud JSON files that are compliant to the OpenAPI Specification, explains their use cases, and outlines additional information.
---

The reference pages in the **Open Cloud v2** and **Open Cloud v1** sections are rendered from JSON files that are [OpenAPI descriptions](https://learn.openapis.org/glossary.html). These files use [version 3.0.4](https://spec.openapis.org/oas/v3.0.4) of the OpenAPI specification.

These files are open source and can be used with tools like the [Swagger Editor](https://editor.swagger.io/) and [Postman](https://www.postman.com/) to test API calls and help streamline development.

These OpenAPI descriptions are still under active development and may contain issues. The pages under the **Resources** section are the official reference.

## OpenAPI description files

OpenAPI description files are available at the following locations within the [creator-docs](https://github.com/Roblox/creator-docs/tree/main/content/en-us/reference/cloud) repository:

```text
# All V2 Resources
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/cloud.docs.json

# V1 Assets
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/assets/v1.json

# V1 Ordered Data Stores
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/datastores-api/ordered-v1.json

# V1 Standard Data Stores
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/datastores-api/v1.json

# V1 Messaging
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/messaging-service/v1.json

# V1 Universes
https://github.com/Roblox/creator-docs/blob/main/content/en-us/reference/cloud/universes-api/v1.json
```

### Vendor extensions

Roblox uses [specification extensions](https://spec.openapis.org/oas/v3.0.4#specification-extensions) to extend the OpenAPI specification. These extensions represent information that the specification doesn't capture by default. Extensions may appear throughout the file where allowed by the OpenAPI specification.

The majority of these specification extensions are experimental. The extensions used are subject to change without notice in favor of fields found within the official OpenAPI specification.

<Alert severity="info">
The OpenAPI descriptions for V1 and V2 resources utilitize distinct specification extensions due to underlying implementation differences.
</Alert>

**V2 resource specification extensions**

| Extension                             	| Location         	| Description                                                                                                   	|
|---------------------------------------	|------------------	|---------------------------------------------------------------------------------------------------------------	|
| `x-categories`                        	| OpenAPI Object   	| List of strings. All resource categories.                                                                     	|
| `x-visibility`                        	| Operation Object 	| Boolean. The visibility of the operation.                                                                     	|
| `x-roblox-docs`                       	| Operation Object 	| Object. Associates an operation with a category and resource.                                                 	|
| `x-long-running-operation-parameters` 	| Operation Object 	| Object. References the metadata and response for the operation's long running response.                       	|
| `x-oneOf`                             	| Schema Object    	| Object. Each field contains a list of properties in the schema. Only one of the properties should be present. 	|
| `x-resource`                          	| Schema Object    	| Boolean. Whether the schema is a resource.                                                                    	|
| `x-immutable`                         	| Schema Object    	| Boolean. Whether the schema is immutable.                                                                     	|

**V1 resource specification extensions**

| Extension                                         | Location          | Description                                                                                       |
|-------------------------------------------------  |------------------ |-------------------------------------------------------------------------------------------------  |
| `x-roblox-cloud-api-operation`                    | Operation Object  | Boolean. Whether the operation is an Open Cloud operation.                                        |
| `x-roblox-cloud-api-operation-name`               | Operation Object  | String. The name of the operation.                                                                |
| `x-roblox-cloud-api-operation-code-samples`       | Operation Object  | Object. A list of code samples, an object with the language/title and the corresponding script.   |
| `x-roblox-cloud-api-operation-throttling-limit`   | Operation Object  | Object. The throttling limits for the operation.                                                  |
