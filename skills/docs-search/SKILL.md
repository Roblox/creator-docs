---
name: docs_search
description: Look up Roblox Engine API documentation using the http_get tool. Use when you need accurate, up-to-date details about classes, datatypes, enums, globals, or libraries.
---

# Roblox Engine API Documentation Lookup

Use the `http_get` tool to fetch official Roblox Engine API docs as clean markdown.

The tool supports an optional query parameter that searches the fetched content for a keyword. When a query is provided, only matching sections are returned (or a short "no match" message), saving context window space. Misses are cheap — they cost one line in context. Prefer using query unless you already know you need the full document.

## Fetching specific API pages

The API name in the URL is PascalCase and matches the Roblox API name exactly. URL patterns:

| Type | URL pattern |
|------|-------------|
| Classes    | `https://create.roblox.com/docs/reference/engine/classes/<ClassName>.md` |
| Datatypes  | `https://create.roblox.com/docs/reference/engine/datatypes/<TypeName>.md` |
| Enums      | `https://create.roblox.com/docs/reference/engine/enums/<EnumName>.md` |
| Globals    | `https://create.roblox.com/docs/reference/engine/globals/<GlobalName>.md` |
| Libraries  | `https://create.roblox.com/docs/reference/engine/libraries/<LibName>.md` |

## Workflow

1. If you KNOW the exact API and need the full reference:
   ```
   http_get(url: "https://create.roblox.com/docs/reference/engine/classes/Part.md")
   ```

2. If you need to SEARCH for a specific property/method across pages, use the query parameter:
   ```
   http_get(url: "https://create.roblox.com/docs/reference/engine/classes/Part.md", query: "Anchored")
   http_get(url: "https://create.roblox.com/docs/reference/engine/classes/BasePart.md", query: "Anchored")
   ```
   This lets you check multiple pages cheaply — misses cost almost nothing. If you find a match you can just pass in only the url to get the full reference.

3. If you want more context around a match without returning the full document:
   ```
   http_get(url: "...", query: "Anchored", context_lines: 10)
   ```

4. If you want the full document when the query matches, without a second call:
   ```
   http_get(url: "...", query: "Anchored", return_full: true)
   ```
   Returns the full doc only if the query is found; still returns "no match" if not found.

5. If you don't know which API to look up, use the index:
   ```
   http_get(url: "https://create.roblox.com/docs/reference/engine/llms.txt")
   ```
   The index lists all classes, datatypes, enums, globals, and libraries with one-line summaries. Note: the index does NOT list individual methods or properties. If searching for a method, search the index for related class/domain terms instead, then fetch the candidate class doc.

6. If the user references a deprecated API:
   ```
   http_get(url: "https://create.roblox.com/docs/reference/engine/deprecated.md")
   ```
   It maps every deprecated property, method, event, and class to its modern replacement.

## Rules

- URLs must end with `.md` or be `llms.txt` — the tool rejects anything else.
- Do NOT guess API names you are unsure about; use the index to confirm first.
- Prefer using query parameter when checking multiple pages to save context.
