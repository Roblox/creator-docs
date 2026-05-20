---
name: optimize-memory
description: Analyze script, animation, and audio memory usage and surface opportunities to reduce memory footprint.
user_invocable: true
---

# Optimize Memory

Take a closer look at memory usage across scripts, animations, and audio to find opportunities to reduce the scene's memory footprint.

## Tone guidance

Be helpful and informative. Memory usage is often just a natural result of the content in the scene — don't frame large numbers as mistakes. Use language like:
- "The biggest memory consumers are..." / "Here's where most of the memory is going..."
- "If you're looking to reduce memory, one option would be..."
- "This is shared across N instances, so it's being used efficiently"

Avoid: "bloat", "problem", "excessive", "waste". Present the data and let the creator decide what's worth changing.

## Workflow

### 1. Start play mode
Use `start_stop_play(is_start: true)`. Wait for the game to initialize.

### 2. Run client-side queries
Execute via `execute_luau`:

```lua
local sas = game:GetService("SceneAnalysisService")
local HttpService = game:GetService("HttpService")

local results = {}

local queries = {
    { name = "ScriptMemory",    fn = function() return sas:GetScriptMemoryAsync() end },
    { name = "AnimationMemory", fn = function() return sas:GetAnimationMemoryAsync() end },
    { name = "AudioMemory",     fn = function() return sas:GetAudioMemoryAsync() end },
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

### 3. Stop client, run server-side queries
Server-side animation and script memory is worth checking — server-side leaks are common and invisible from the client.

Stop the client session with `start_stop_play(is_start: false)`, then start a server session via `execute_luau`:

```lua
task.spawn(function()
    game:GetService("StudioTestService"):ExecuteRunModeAsync("Server")
end)
return "starting server"
```

Wait a moment for the server to initialize, then run the same memory queries again. Label results as "Server" vs "Client" in the report.

### 4. Stop play mode
Use `start_stop_play(is_start: false)`.

### 5. Analyze script memory

From ScriptMemory results:
- Report total Luau VM memory in a friendly way
- List the **top 10 scripts by memory** with human-readable sizes (KB/MB)
- Group by service to show the overall shape
- Most scenes will be dominated by core PlayerModule scripts (camera, controls, etc.) — that's completely normal and worth noting: "Most of this is the standard Roblox player scripts, which is typical"
- For any notably large custom scripts, offer to take a look at the source to see if there are easy wins (use `script_read`)
- When reading scripts, look for: large table accumulation, unbounded caching, storing instance references that could be looked up on demand, large string building

### 6. Analyze animation memory

From AnimationMemory results:
- Report total animation clip memory
- List the largest clips with their asset IDs and how many Animators reference them
- Clips shared by many owners are efficient (deduplication is working well) — call this out positively
- **"Not In DataModel" clips** are worth flagging — these are loaded by Animators that aren't in the game hierarchy, which usually means they're left over from something. Suggest looking into the Animator lifecycle.
- **Key context:** Animation clips are reference-counted. The memory for a clip stays loaded as long as any Animator has it loaded. Reducing clip memory means either removing the clip entirely or ensuring all Animators that loaded it are cleaned up.

### 7. Analyze audio memory

From AudioMemory results:
- Report total audio memory
- List the largest assets with their IDs and what references them
- Shared assets (with Owners array) are being deduplicated — mention this positively
- For very large individual assets, mention the size in context: "This engine sound is 7.3 MB — if you're looking to save memory, a shorter loop or lower sample rate could help"
- **Key context:** Audio assets are also reference-counted. The memory stays loaded as long as any Sound or AudioPlayer references the asset.

### 8. Summary and options

Present a concise summary of where memory is going, then offer options:
- "Your scene is using about X MB of audio, Y KB of animation clips, and Z MB of script memory"
- Highlight the top 2-3 largest items across all categories
- Frame suggestions as choices: "If you wanted to free up the most memory, the biggest single item is [X]. Want me to take a closer look?"
- If "Not In DataModel" animation clips are present, suggest `/fix-leaks` as a natural next step
- Offer to read specific scripts if the creator wants to explore optimization opportunities
