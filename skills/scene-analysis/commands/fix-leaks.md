---
name: fix-leaks
description: Check for unparented instances, trace them to scripts, and help clean them up if needed.
user_invocable: true
---

# Fix Leaks

Check for unparented instances in the scene, trace them back to their source scripts, and offer to help clean things up.

## Tone guidance

Be matter-of-fact and helpful. Unparented instances are a normal part of development — some are intentional, some are leftovers. Don't treat them as bugs or failures. Use language like:
- "I found N unparented instances — here's where they're coming from..."
- "A few of these look intentional, but there are some that might be worth cleaning up"
- "This pattern sometimes leaves instances around — here's one way to handle it"

Avoid: "leak", "bug", "problem", "broken" when possible. Use "unparented instances" or "instances held in memory" instead of "leaked instances". When a fix is appropriate, frame it as a cleanup opportunity.

## Workflow

### 1. Start play mode
Use `start_stop_play(is_start: true)`. Wait for the game to initialize. If the user wants to let the game run for a while first to let things accumulate, that's fine.

### 2. Run unparented instances query
Execute via `execute_luau`:

```lua
local sas = game:GetService("SceneAnalysisService")
local HttpService = game:GetService("HttpService")

local ok, data = pcall(function()
    return sas:GetUnparentedInstancesAsync()
end)

if ok then
    return HttpService:JSONEncode(data)
else
    return HttpService:JSONEncode({ error = tostring(data) })
end
```

### 3. Stop client, run from server mode
Server-side unparented Animators and Parts are especially common. Stop the client session with `start_stop_play(is_start: false)`, then start a server session via `execute_luau`:

```lua
task.spawn(function()
    game:GetService("StudioTestService"):ExecuteRunModeAsync("Server")
end)
return "starting server"
```

Wait a moment for the server to initialize, then run the same unparented instances query. Compare client vs server results.

### 4. Stop play mode
Use `start_stop_play(is_start: false)`.

### 5. Analyze results

If `Size` is 0: "No unparented instances found — everything looks clean."

**Context:** A small number of unparented instances is completely normal. Core scripts like PlayerModule intentionally hold some BindableEvents, Animations, and Parts as internal implementation details. These aren't something to worry about.

For each host script, consider:
- **Small counts (<5) of lightweight types** (BindableEvent, ValueBase, Animation): Almost certainly intentional. Mention them briefly but don't suggest changes.
- **Larger counts or heavier types** (Parts, MeshParts, Frames): Worth a closer look. These take more memory and may be accumulating over time.
- **`(unknown)` host:** The GC couldn't trace ownership — mention this as something that's harder to track down.

#### Report format
Keep it conversational:
```
Found 47 unparented instances across 3 scripts:

- Gameplay.Combat is holding 30 instances (22 Parts, 8 Attachments) — this is the main one worth looking at
- ClickToMoveDisplay has 4 (1 Animation, 3 Parts) — likely intentional, part of how the module works  
- CameraInput has 3 BindableEvents — normal, these are used internally
```

### 6. Read and diagnose host scripts

For scripts with notable counts, use `script_read` to look at the source. Common patterns that leave instances around:

**Setting Parent to nil instead of calling Destroy()**
```lua
part.Parent = nil  -- instance still referenced
-- vs
part:Destroy()  -- cleans up properly
```

**Event connections keeping references alive**
```lua
local part = Instance.new("Part")
part.Touched:Connect(function(hit) ... end)
-- closure captures 'part', keeping it alive even after unparenting
```

**Tables that accumulate without cleanup**
```lua
local cache = {}
-- instances added but never removed from cache
```

**Temporary Animators not destroyed**
```lua
local animator = Instance.new("Animator")
-- used briefly, then forgotten — especially common on server
```

**Clones not destroyed after use**
```lua
local clone = template:Clone()
clone.Parent = workspace
-- later: clone.Parent = nil but clone variable still exists
```

### 7. Suggest fixes

For scripts where cleanup would help:
- Point to the specific pattern in the source
- Suggest a concrete change (usually adding a `:Destroy()` call)
- Ask if they'd like you to apply it via `multi_edit`

When applying fixes:
- Be conservative — just add the cleanup, don't refactor surrounding code
- If the pattern isn't clear-cut, say so: "I'm not 100% sure this is unintentional — want me to add cleanup here, or would you rather leave it?"

### 8. Re-verify (optional)

If fixes were applied, offer to run the game again and compare:
- "Want me to run the check again to see if that helped?"
- Show a simple before/after count
