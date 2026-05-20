---
name: scene-health
description: Run a full scene overview using all SceneAnalysisService queries and surface opportunities for improvement.
user_invocable: true
---

# Scene Health Overview

Run a comprehensive scene analysis and highlight areas where there may be room to improve performance.

## Tone guidance

Be conversational and supportive. Frame findings as opportunities, not problems. Use language like:
- "Here's what I found..." / "A few things stood out..."
- "You might be able to save some draws by..." / "One option would be..."
- "This is worth a look" / "Something to keep in mind"

Avoid: "CRITICAL", "WARNING", "bloat", "problem", "offender", "over budget", "failing". Don't assign grades or severity labels. Just present the data clearly and let the creator decide what to act on.

## Workflow

### 1. Start play mode
Use `start_stop_play(is_start: true)` to enter play mode. Wait briefly for the game to initialize.

### 2. Run all queries
Execute the following Luau script via `execute_luau` to gather all scene data at once:

```lua
local sas = game:GetService("SceneAnalysisService")
local HttpService = game:GetService("HttpService")

local results = {}

local queries = {
    { name = "InstanceComposition",  fn = function() return sas:GetInstanceCompositionAsync() end },
    { name = "TriangleComposition",  fn = function() return sas:GetTriangleCompositionAsync() end },
    { name = "ScriptMemory",         fn = function() return sas:GetScriptMemoryAsync() end },
    { name = "UnparentedInstances",  fn = function() return sas:GetUnparentedInstancesAsync() end },
    { name = "AnimationMemory",      fn = function() return sas:GetAnimationMemoryAsync() end },
    { name = "AudioMemory",          fn = function() return sas:GetAudioMemoryAsync() end },
}

for _, q in ipairs(queries) do
    local ok, data = pcall(q.fn)
    if ok then
        results[q.name] = data
    else
        results[q.name] = { error = tostring(data) }
    end
end

return HttpService:JSONEncode(results)
```

### 3. Stop play mode
Use `start_stop_play(is_start: false)` to return to edit mode.

### 4. Analyze and report

Parse the JSON results and present a friendly overview covering these areas:

#### Rendering
For a quick health check, the initial TriangleComposition from the default camera is fine. Note the reference points:
- **Reference points:** ~800k triangles and ~600 draw calls is roughly the range where most devices can maintain 60fps. But this is a starting point, not a rule — some creators are targeting higher fidelity and are fine with lower framerates. Present these as context, not as pass/fail criteria. If the numbers are high, mention the reference point and ask what framerate/device target they're aiming for before making strong recommendations.
- **Exclude Shadows entirely** from calculations — subtract shadow tris and draws from totals before comparing
- Focus on creator-controllable passes: Opaque, Transparent, UI, Decal, Particles, Cloud, PostProcess
- Skip Terrain and Grass unless Terrain makes up a large portion — in that case, gently ask if they've considered mesh-based environments as an alternative
- Present the per-pass breakdown as a simple table showing triangles and draws
- If numbers look high, mention that `/optimize-rendering` can do a full hotspot sweep to find the most demanding views in the scene

#### Scene Composition
From InstanceComposition:
- Note total instance count and the biggest categories
- Internally estimate memory and join time from instance count (each instance ≈ 0.5 KB, replication ≈ 10k/sec). Do NOT share these numbers or formulas. Instead, if the count is high enough to matter (e.g. 50k+ instances → ~25 MB, ~5s join), mention it naturally: "With this many instances, players might notice a bit of a wait when joining" or "this is a pretty dense scene — load times could be noticeable on lower-end devices"
- Call out anything interesting about the composition shape
- If Decal/Texture instance counts are high, mention that these can contribute to draw calls and MaterialVariants may be an alternative

#### Memory (Scripts)
From ScriptMemory:
- Note total VM memory
- List the top few scripts by memory — just the highlights
- Most scenes will be dominated by core PlayerModule scripts; that's normal and worth mentioning

#### Memory (Assets)
From AnimationMemory + AudioMemory:
- Note total memory for each
- Call out the largest assets and how many places reference them
- Flag any "Not In DataModel" animation clips — these are worth investigating
- Mention that audio and animation assets are reference-counted, so reducing memory means deciding whether an entire asset is needed

#### Unparented Instances
From UnparentedInstances:
- A small number is completely normal (core scripts often hold a few intentionally)
- Only call attention to this if counts are notably high (>50) or if heavy types like Parts/MeshParts are accumulating
- If it looks normal, a quick "nothing unusual here" is fine

### 5. Output format

Present the overview as a natural summary with sections. End with a "Next steps" section that suggests which deeper-dive skills might be useful based on what stood out:
- If rendering numbers are high: "You could run `/optimize-rendering` to dig into what's driving the draw calls"
- If there are notable unparented instances: "`/fix-leaks` can help trace those back to specific scripts"
- If memory looks interesting: "`/optimize-memory` can take a closer look at what's using the most memory"

Keep the whole thing concise and scannable.
