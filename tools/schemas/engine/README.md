# Schemas

This folder contains the JSON schemas for the YAML reference content. The JSON schemas are the source of truth for the correct structure of the YAML content. If you use the [YAML extension for VS Code](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) by Red Hat, the schemas help you validate the YAML content while you write it.

We have schemas for:

1. [Classes](./classes.json)
2. [DataTypes](./datatypes.json)
3. [Enums](./enums.json)
4. [Libraries](./libraries.json)
5. [Globals](./globals.json)

For high-level examples of YAML files that satisfy each JSON schema, see the [templates](./examples/README.md).

The schemas in this folder use [JSON Schema Draft 7](https://json-schema.org/specification-links.html#draft-7) because VS Code has ["limited support"](https://code.visualstudio.com/Docs/languages/json#_json-schemas-and-settings) for later versions. For more information on JSON schemas, see [json-schema.org/specification](https://json-schema.org/specification).

For examples of other schemas using the JSON Schema, see [schemastore.org](https://www.schemastore.org/json/). The schemas for [GitHub Actions](https://json.schemastore.org/github-action.json) and [Github Workflows](https://json.schemastore.org/github-workflow.json) are great examples of schemas that also use Draft 7.

## Using the schemas

To use the schemas while editing in VS Code, install [YAML extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) by Red Hat.

Each schema is associated with file paths to `.yaml` files in [.vscode/settings.json](../../../.vscode/settings.json). If you create a new schema, associate it with file paths by following the examples in the [README.md for vscode-yaml](https://github.com/redhat-developer/vscode-yaml#associating-schemas).
