---
title: Roblox for Meta Horizon Worlds developers
description: If you're an experienced Meta Horizon Worlds developer, use this page to get oriented with Roblox.
---

import ScriptTypes from './includes/engine-comparisons/script-types.md'
import CodeSample from './includes/engine-comparisons/fishing-pole-code-sample.md'
import ScriptLocations from './includes/engine-comparisons/script-locations.md'
import Transforms from './includes/engine-comparisons/transforms.md'

## Meta Horizon Worlds vs. Roblox Studio: A Comparative Documentation

This document compares Meta Horizon Worlds and Roblox Studio, focusing on key features and differences relevant to content creators.


# **1. Core Creation Environment:**

## **1.1. Hierarchical Organization:**

| Feature          | Meta Horizon Worlds      | Roblox Studio          | Similarity                                                               |
|------------------|--------------------------|--------------------------|--------------------------------------------------------------------------|
| Organization Tool| Hierarchy window         | Workspace (Explorer window)| Tree structure for parent-child object relationships.                        |
| Purpose          | Managing 3D entities      | Managing 3D parts and objects | Facilitates scene management and object organization.                        |

**1.2. Asset Management:**

| Feature          | Meta Horizon Worlds      | Roblox Studio          | Similarity                                                              |
|------------------|--------------------------|--------------------------|-------------------------------------------------------------------------|
| Asset Acquisition| Asset Store              | Creator Store            | Centralized library for acquiring reusable assets.                        |
| Asset Management | Assets window            | Inventory                | Tools for managing and organizing imported and acquired assets.           |

## **1.3. Terminology Differences:**

| Meta Horizon Worlds | Roblox Studio | Notes                                                                   |
|----------------------|---------------|-------------------------------------------------------------------------|
| World                | Place         | Represents the primary environment or game level.                     |
| Entity               | Part          | Basic building block or object within the 3D environment.               |
| Asset Template       | Packages/Models | Container object grouping multiple gameplay elements.                        |
| Transform            | Transform/CFrame| Represents an object's position, rotation, and scale.                      |
| Hierarchy window     | Explorer window | Tool for managing the scene's object hierarchy.                              |
| Properties window    | Properties window| Tool for modifying object properties.                                     |
| Scene window         | Viewport      | 3D view of the world or place.                                          |
| Assets window        | Toolbox       | Tool for accessing and managing assets.                                  |
| SpawnPoint           | SpawnLocation | Location where players appear in the world or place.                          |
| Console              | Output        | Window for displaying debugging information and script output.             |
| Asset Library        | Creator Store | Online asset library for importing assets into a project.           |

# **2. Scripting and Logic:**

## **2.1. Scripting Languages:**

| Feature          | Meta Horizon Worlds | Roblox Studio | Key Differences                                                              |
|------------------|---------------------|---------------|------------------------------------------------------------------------------|
| Language         | TypeScript          | Luau          | TypeScript is statically typed, Luau is dynamically typed.                  |
| Syntax           | JavaScript-like     | Lua-based     | TypeScript has a more structured, object-oriented syntax.                    |
| Typing           | Statically Typed    | Dynamically Typed| TypeScript provides compile-time type checking, Luau does not.              |

**2.2. Script Execution Models:**

| Feature                  | Meta Horizon Worlds              | Roblox Studio                  | Key Differences                                                              |
|--------------------------|-----------------------------------|-----------------------------------|------------------------------------------------------------------------------|
| Script Types             | Default (Server), Local (Client) | Server, Client, Module          | Meta Horizon Worlds simplifies to server/client, Roblox has explicit modules. |
| Execution Context        | Server or Client                 | Server, Client, Reusable Module   | Roblox offers more granular control over script execution.                    |
| Local Script Ownership   | Manual assignment via code        | Automatic                         | Roblox handles local script ownership automatically.                               |


## **2.3. Language Comparison Example (Sum Function):**

**Luau (Roblox):**

```lua
-- Sum numbers up to "n" and returns the sum
function sumUpTo(n)
    local sum = 0
    for i = 1, n do
        sum = sum + i
    end
    return sum
end

print(sumUpTo(5))  -- Output: 15 (1 + 2 + 3 + 4 + 5)
```

**TypeScript (Meta Horizon Worlds):**
```ts
// Sum numbers up to "n" and returns the sum
function sumUpTo(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sumUpTo(5));  // Output: 15 (1 + 2 + 3 + 4 + 5)
```

## **2.4. Script Type Comparison**

|Meta Horizon Worlds|Roblox|
|---|---|
|Script in Local Execution Mode|Client Script|
|Script in default Server Execution Mode|Server Script|
|Export functions/classes in any script|Module script|

# **3. Asset Pipeline and Interoperability:**

## **3.1. Asset Import:**

| Asset Type | Meta Horizon Worlds File Formats | Roblox Studio File Formats (Exported) |
|------------|-----------------------------------|--------------------------------------|
| 3D Model   | .fbx, .png                       | .obj                                 |
| Audio      | .opus, .wav                      | N/A                                  |
| Material   | .png                              | .mtl                                 |
| Skydome    | .png, .exr                       | N/A                                  |
| Texture    | .png                              | .png                                 |
| Text       | .json                             | N/A                                  |

## **3.2. Roblox to Meta Horizon Worlds Conversion:**

* **Direct Conversion:** Limited. Only .fbx assets can be directly imported.
* **Native Roblox Parts:** Require conversion to .fbx using tools like Blender.
* **Scripts:** Luau scripts are incompatible; require complete rewrites in TypeScript.
* **Exporting Roblox Assets:** Roblox exports models as .obj and materials as .mtl.
