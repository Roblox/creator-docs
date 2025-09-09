// Jest tests for OpenAPI validation module
import { validateOpenApiSchema, containsOpenApiSchema } from './validator.js';

describe('OpenAPI Schema Validation Module', () => {
  // Test the containsOpenApiSchema function logic
  describe('containsOpenApiSchema', () => {
    it('should return true for valid OpenAPI JSON with openapi field', () => {
      const validOpenApiContent = JSON.stringify({
        openapi: '3.0.1',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {},
      });

      const result = containsOpenApiSchema(validOpenApiContent);
      expect(result).toBe(true);
    });

    it('should return true for OpenAPI JSON with different version', () => {
      const validOpenApiContent = JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {},
      });

      const result = containsOpenApiSchema(validOpenApiContent);
      expect(result).toBe(true);
    });

    it('should return false for JSON without openapi field', () => {
      const nonOpenApiContent = JSON.stringify({
        title: 'Regular JSON',
        data: 'some data',
      });

      const result = containsOpenApiSchema(nonOpenApiContent);
      expect(result).toBe(false);
    });

    it('should return false for JSON with null openapi field', () => {
      const invalidOpenApiContent = JSON.stringify({
        openapi: null,
        info: { title: 'Test API', version: '1.0.0' },
      });

      const result = containsOpenApiSchema(invalidOpenApiContent);
      expect(result).toBe(false);
    });

    it('should return false for JSON with non-string openapi field', () => {
      const invalidOpenApiContent = JSON.stringify({
        openapi: 3.0,
        info: { title: 'Test API', version: '1.0.0' },
      });

      const result = containsOpenApiSchema(invalidOpenApiContent);
      expect(result).toBe(false);
    });

    it('should return false for invalid JSON content', () => {
      const invalidJsonContent = '{invalid json content';

      const result = containsOpenApiSchema(invalidJsonContent);
      expect(result).toBe(false);
    });

    it('should return false for empty string', () => {
      const result = containsOpenApiSchema('');
      expect(result).toBe(false);
    });

    it('should return false for non-JSON string', () => {
      const result = containsOpenApiSchema('This is not JSON');
      expect(result).toBe(false);
    });
  });

  // Test the validateOpenApiSchema function
  describe('validateOpenApiSchema', () => {
    const mockConfig = {
      baseBranch: 'test',
      commitHash: 'abc123',
      checkHttpLinks: false,
      checkLocalizedContent: false,
      checkMarkdownLint: false,
      checkProtectedFields: false,
      checkRelativeLinks: false,
      checkRetextAnalysis: false,
      checkUnusedAssets: false,
      debug: false,
      deleteUnusedAssets: false,
      files: 'changed' as any,
      onlyRequiredChecks: false,
      postPullRequestComments: false,
      pullRequestNumber: 123,
      repository: 'test-repo',
    };

    it('should be a function that accepts config and filePath', () => {
      expect(typeof validateOpenApiSchema).toBe('function');
      expect(validateOpenApiSchema.length).toBe(1); // Expects 1 parameter (destructured object)
    });

    it('No errors should be returned', async () => {
      const result = await validateOpenApiSchema({
        config: mockConfig,
        filePath: 'tools/checks/utils/openapi/testdata/valid.json',
      });

      expect(result).toStrictEqual([]);
    });

    it('Errors should be returned when no servers are present', async () => {
      const result = await validateOpenApiSchema({
        config: mockConfig,
        filePath: 'tools/checks/utils/openapi/testdata/invalid.no-servers.json',
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].code).toBe('servers-required');
    });

    it('Errors should be returned when servers are invalid', async () => {
      const result = await validateOpenApiSchema({
        config: mockConfig,
        filePath:
          'tools/checks/utils/openapi/testdata/invalid.servers-invalid.json',
      });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].code).toBe('oas3-schema');
      expect(result[1].code).toBe('oas3-server-variables');
      expect(result[2].code).toBe('server-url-required');
      expect(result[3].code).toBe('server-url-domain');
    });
  });
});
