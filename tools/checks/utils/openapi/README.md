# OpenAPI Schema Validation

This directory contains all the OpenAPI schema validation functionality for the Roblox Creator Documentation project based on [Spectral](https://docs.stoplight.io/docs/spectral/674b27b261c3c-overview)

## Structure

```
tools/checks/utils/openapi/
├── README.md                    # This file
├── index.ts                     # Main exports
├── validator.ts                 # Core validation logic
├── validator.test.ts           # Test suite
├── spectral.yml                # Simple Spectral ruleset (pattern-based)
└── testdata/                   # Test OpenAPI files
    ├── valid.json              # Valid OpenAPI spec for testing
    ├── invalid.json            # Invalid OpenAPI spec for testing
    ├── no-servers.json         # OpenAPI spec missing servers field
    └── invalid-servers.json    # OpenAPI spec with invalid servers
```

## Features

### 🛡️ Comprehensive Validation

- **Standard OpenAPI validation** using Spectral's built-in rules
- **Custom servers validation** enforcing Roblox-specific requirements
- **Security checks** encouraging HTTPS usage
- **Quality checks** for API documentation standards

### 🎯 Custom Rules

- `servers-required`: Ensures servers field exists
- `servers-not-empty`: Requires at least one server
- `server-url-required`: Each server must have a URL
- `server-url-domain`: URLs must point to roblox.com or localhost
- `server-url-https`: Recommends HTTPS for security

### 📊 Rich Error Reporting

- Precise line and character positions
- Structured error format compatible with existing tooling
- GitHub PR integration with detailed error summaries
- Severity levels (error, warning, info)

## Usage

### Basic Import

```typescript
import { containsOpenApiSchema, validateOpenApiSchema } from './utils/openapi';
```

### Validation Example

```typescript
const result = await validateOpenApiSchema({
  config: myConfig,
  filePath: 'path/to/openapi.json',
});

if (result.length) {
  // Validation failed - result contains error details
  console.log('Validation errors:', result);
} else {
  // Validation passed
  console.log('OpenAPI specification is valid!');
}
```

### Running Tests

```bash
npm run jest
```

## Configuration

### Spectral Rulesets

- **spectral.yml**: Uses built-in Spectral functions with regex patterns

## Migration from @seriousme/openapi-schema-validator

> @neoxu 2025-09-01

This module replaces the previous `@seriousme/openapi-schema-validator` implementation with Spectral for:

- ✅ Better customization capabilities
- ✅ Industry-standard validation rules
- ✅ Improved error reporting
- ✅ Declarative configuration
- ✅ Enhanced maintainability
