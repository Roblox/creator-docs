---
name: optimize-rendering
description: Analyze scene triangle counts and draw calls, identify what's driving rendering cost, and suggest ways to improve.
user_invocable: true
---

# Optimize Rendering

Take a closer look at what's contributing to the scene's rendering cost and find opportunities to improve performance.

## Tone guidance

Be helpful and collaborative. Creators have put a lot of work into their scenes — the goal is to help them get the most out of their content, not to criticize their choices. Use language like:
- "The biggest chunk of your draws is coming from..." / "Most of your triangles are in..."
- "One thing that could help is..." / "You might get some wins by..."
- "A few options to consider..."

Avoid: "over budget", "bloat", "problem", "offender", "inefficient", "failing". Present data clearly and frame suggestions as options.

Do not present the draw call / triangle cost equivalence to the user. Internally, each draw call costs roughly the equivalent of 20,000 triangles in GPU overhead — use this to prioritize draw call reduction in your recommendations, but don't show the ratio or the math to the creator.

## Workflow

### 1. Start play mode
Use `start_stop_play(is_start: true)`. Wait for the game to initialize.

### 2. Hotspot sweep — find the most demanding views automatically

TriangleComposition is **view-dependent** — results change dramatically based on camera position. Rather than guessing where to look, scan the scene for geometry clusters and measure from each one.

**Important:** Set `CameraType = Scriptable` before moving the camera, otherwise the PlayerModule will override your CFrame each frame.

#### Step 2a: Find geometry hotspots via adaptive subdivision

Use a two-level approach: coarse grid to find dense regions, then subdivide only the top cells to pinpoint hotspots. This keeps the cell count manageable.

```lua
local HttpService = game:GetService("HttpService")

local parts = {}
for _, obj in ipairs(workspace:GetDescendants()) do
    if obj:IsA("BasePart") and obj.ClassName ~= "Terrain" then
        table.insert(parts, {
            x = obj.Position.X, y = obj.Position.Y, z = obj.Position.Z,
            isMesh = obj:IsA("MeshPart"),
        })
    end
end

local minX, minZ = math.huge, math.huge
local maxX, maxZ = -math.huge, -math.huge
for _, p in ipairs(parts) do
    minX = math.min(minX, p.x); maxX = math.max(maxX, p.x)
    minZ = math.min(minZ, p.z); maxZ = math.max(maxZ, p.z)
end

local function scoreParts(cellParts)
    local s = 0
    for _, p in ipairs(cellParts) do s += if p.isMesh then 3 else 1 end
    return s
end

local function partsInBox(allParts, x0, z0, x1, z1)
    local result = {}
    for _, p in ipairs(allParts) do
        if p.x >= x0 and p.x < x1 and p.z >= z0 and p.z < z1 then
            table.insert(result, p)
        end
    end
    return result
end

-- Level 1: coarse 256-stud grid
local COARSE = 256
local coarseCells = {}
for cx = math.floor(minX / COARSE), math.floor(maxX / COARSE) do
    for cz = math.floor(minZ / COARSE), math.floor(maxZ / COARSE) do
        local x0, z0 = cx * COARSE, cz * COARSE
        local cellParts = partsInBox(parts, x0, z0, x0 + COARSE, z0 + COARSE)
        if #cellParts > 0 then
            table.insert(coarseCells, { x0 = x0, z0 = z0, parts = cellParts, score = scoreParts(cellParts) })
        end
    end
end
table.sort(coarseCells, function(a, b) return a.score > b.score end)

-- Level 2: subdivide top 4 coarse cells into 64-stud cells
local FINE = 64
local fineCells = {}
for i = 1, math.min(4, #coarseCells) do
    local coarse = coarseCells[i]
    for sx = 0, (COARSE / FINE) - 1 do
        for sz = 0, (COARSE / FINE) - 1 do
            local x0 = coarse.x0 + sx * FINE
            local z0 = coarse.z0 + sz * FINE
            local cellParts = partsInBox(coarse.parts, x0, z0, x0 + FINE, z0 + FINE)
            if #cellParts > 0 then
                local sumX, sumZ, minY = 0, 0, math.huge
                for _, p in ipairs(cellParts) do
                    sumX += p.x; sumZ += p.z; minY = math.min(minY, p.y)
                end
                table.insert(fineCells, {
                    score = scoreParts(cellParts), count = #cellParts,
                    cx = sumX / #cellParts, cz = sumZ / #cellParts, groundY = minY,
                })
            end
        end
    end
end
table.sort(fineCells, function(a, b) return a.score > b.score end)

local hotspots = {}
for i = 1, math.min(6, #fineCells) do
    local c = fineCells[i]
    table.insert(hotspots, {
        rank = i, score = c.score, parts = c.count,
        x = math.floor(c.cx + 0.5), y = math.floor(c.groundY + 0.5), z = math.floor(c.cz + 0.5),
    })
end

return HttpService:JSONEncode({
    totalParts = #parts, coarseCells = #coarseCells, fineCells = #fineCells, hotspots = hotspots,
})
```

#### Step 2b: Sweep camera through hotspots — 4 cardinal directions at player height

At each hotspot, test all 4 cardinal directions at player camera height (~5.5 studs above ground) and record the worst-case view. This finds demanding sightlines — a view corridor can be expensive even when local part density is low.

```lua
local HttpService = game:GetService("HttpService")
local sas = game:GetService("SceneAnalysisService")
local camera = workspace.CurrentCamera

camera.CameraType = Enum.CameraType.Scriptable

local EYE_HEIGHT = 5.5

-- Insert hotspots from step 2a
local hotspots = {
    -- { name = "Hotspot 1", x = ..., y = ..., z = ..., parts = ... },
}

local results = {}

for _, spot in ipairs(hotspots) do
    local groundY = spot.y + EYE_HEIGHT
    local bestTris, bestDraws, bestDir, bestPasses = 0, 0, "", {}

    local directions = {
        { name = "North", dx = 0, dz = 1 },
        { name = "East",  dx = 1, dz = 0 },
        { name = "South", dx = 0, dz = -1 },
        { name = "West",  dx = -1, dz = 0 },
    }

    for _, dir in ipairs(directions) do
        local camPos = Vector3.new(spot.x - dir.dx * 10, groundY + 3, spot.z - dir.dz * 10)
        local target = Vector3.new(spot.x + dir.dx * 50, groundY, spot.z + dir.dz * 50)
        camera.CFrame = CFrame.lookAt(camPos, target)
        task.wait(0.75)

        local ok, tri = pcall(function() return sas:GetTriangleCompositionAsync() end)
        if ok then
            local shadowTris, shadowDraws = 0, 0
            local passes = {}
            for _, child in ipairs(tri.Children) do
                if child.Name == "Shadows" then
                    shadowTris = child.Sizes.Triangles
                    shadowDraws = child.Sizes.Drawcalls
                else
                    table.insert(passes, { name = child.Name, tris = child.Sizes.Triangles, draws = child.Sizes.Drawcalls })
                end
            end
            local adjTris = tri.Sizes.Triangles - shadowTris
            local adjDraws = tri.Sizes.Drawcalls - shadowDraws
            if adjDraws > bestDraws then
                bestTris, bestDraws, bestDir, bestPasses = adjTris, adjDraws, dir.name, passes
            end
        end
    end

    table.insert(results, {
        name = spot.name,
        position = string.format("(%d, %d, %d)", spot.x, spot.y, spot.z),
        partsInCell = spot.parts,
        worstDirection = bestDir,
        adjustedTris = bestTris,
        adjustedDraws = bestDraws,
        passes = bestPasses,
    })
end

-- Also grab InstanceComposition once (view-independent)
local ok2, inst = pcall(function() return sas:GetInstanceCompositionAsync() end)

return HttpService:JSONEncode({ sweep = results, instanceComposition = ok2 and inst or nil })
```

Present the sweep as a table sorted by draw calls. Note that part density doesn't always predict rendering cost — sightlines matter. A hotspot with fewer local parts may see more geometry through a long view corridor.

### 3. Deep-dive: frustum instance audit (at the most demanding hotspot)

After the sweep, position the camera at the hotspot with the highest draw calls and run a frustum audit to understand what's in view. Execute via `execute_luau`:

```lua
local HttpService = game:GetService("HttpService")
local camera = workspace.CurrentCamera

local cf = camera.CFrame
local fov = math.rad(camera.FieldOfView)
local aspect = camera.ViewportSize.X / camera.ViewportSize.Y
local nearDist = camera.NearPlaneZ
local farDist = -500

local pos = cf.Position
local look = cf.LookVector
local right = cf.RightVector
local up = cf.UpVector

local halfVFov = fov / 2
local halfHFov = math.atan(math.tan(halfVFov) * aspect)

local function inFrustum(worldPos)
    local toObj = worldPos - pos
    local z = toObj:Dot(look)
    if z < -nearDist or z > -farDist then return false end
    local x = toObj:Dot(right)
    if math.abs(x) > z * math.tan(halfHFov) + 5 then return false end
    local y = toObj:Dot(up)
    if math.abs(y) > z * math.tan(halfVFov) + 5 then return false end
    return true
end

local materialCounts = {}
local classCounts = {}
local transparentCount = 0
local transparentPlasticCount = 0
local totalVisible = 0

-- Track unique Material+MaterialVariant+MeshId combos (drives instancing breaks)
local instanceCombos = {}

for _, obj in ipairs(workspace:GetDescendants()) do
    if obj:IsA("BasePart") and inFrustum(obj.Position) then
        totalVisible += 1

        local mat = tostring(obj.Material)
        materialCounts[mat] = (materialCounts[mat] or 0) + 1

        local cls = obj.ClassName
        classCounts[cls] = (classCounts[cls] or 0) + 1

        -- Track instancing combos for MeshParts
        if obj:IsA("MeshPart") then
            local meshId = obj.MeshId
            local matVariant = obj.MaterialVariant
            local comboKey = mat .. "|" .. matVariant .. "|" .. meshId
            instanceCombos[comboKey] = (instanceCombos[comboKey] or 0) + 1
        end

        if obj.Transparency > 0 and obj.Transparency < 1 then
            local isGlass = (obj.Material == Enum.Material.Glass)
            local hasSurfaceAppearance = obj:FindFirstChildWhichIsA("SurfaceAppearance") ~= nil
            if not isGlass and not hasSurfaceAppearance then
                transparentCount += 1
                if obj.Material == Enum.Material.Plastic or obj.Material == Enum.Material.SmoothPlastic then
                    transparentPlasticCount += 1
                end
            end
        end
    end
end

local decalCount = 0
for _, obj in ipairs(workspace:GetDescendants()) do
    if (obj:IsA("Decal") or obj:IsA("Texture")) and obj.Parent and obj.Parent:IsA("BasePart") then
        if inFrustum(obj.Parent.Position) then
            decalCount += 1
        end
    end
end

-- Summarize instancing: count unique combos and how many are singletons
local uniqueCombos = 0
local singletonCombos = 0
for _, count in pairs(instanceCombos) do
    uniqueCombos += 1
    if count == 1 then singletonCombos += 1 end
end

return HttpService:JSONEncode({
    totalVisibleParts = totalVisible,
    transparentParts = transparentCount,
    transparentPlasticParts = transparentPlasticCount,
    decals = decalCount,
    byMaterial = materialCounts,
    byClass = classCounts,
    instancing = {
        uniqueMeshCombos = uniqueCombos,
        singletonCombos = singletonCombos,
        totalMeshParts = classCounts["MeshPart"] or 0,
    },
})
```

### 4. Stop play mode
Use `start_stop_play(is_start: false)`.

### 5. Place hotspot markers in the scene

After stopping play, place markers so the creator can find the hotspots in the editor. Execute via `execute_luau` (in edit mode):

```lua
-- Insert the hotspot results from step 2b here
local hotspotData = {
    -- { name = "Hotspot 1", x = ..., y = ..., z = ..., draws = ..., tris = ..., direction = "East" },
}

-- Clean up any previous hotspot folder
local existing = workspace:FindFirstChild("Hotspots")
if existing then existing:Destroy() end

local folder = Instance.new("Folder")
folder.Name = "Hotspots"
folder.Parent = workspace

for i, spot in ipairs(hotspotData) do
    local marker = Instance.new("Part")
    marker.Name = string.format("Hotspot_%d_%s_%dk_%dd", i, spot.direction, math.floor(spot.tris / 1000), spot.draws)
    marker.Size = Vector3.new(4, 8, 4)
    marker.Position = Vector3.new(spot.x, spot.y + 4, spot.z)
    marker.Anchored = true
    marker.CanCollide = false
    marker.CanQuery = false
    marker.CanTouch = false
    marker.Transparency = 1
    marker.Parent = folder
end

return "Placed " .. #hotspotData .. " hotspot markers in Workspace.Hotspots"
```

The markers are invisible, non-collidable, and anchored. Their names encode the hotspot rank, worst direction, triangle count, and draw count (e.g. `Hotspot_1_East_1392k_1614d`) so the creator can find them in the Explorer and understand what each one represents. Mention to the creator that they can select a marker to jump to that location.

### 6. Analyze triangle composition

#### Reference points
- **Reference point:** ~800,000 triangles and ~600 draw calls is roughly where most devices can maintain 60fps. This is context, not a hard limit — some creators are targeting higher fidelity and accept lower framerates on some devices. Present the numbers and ask what their target is before framing anything as "too high."
- **Exclude Shadows** from calculations entirely — subtract shadow tris and draws from totals
- Present the adjusted numbers alongside the reference conversationally (e.g. "Your scene is rendering about 1.4M triangles and 1,200 draws from this view. For 60fps on most devices, the sweet spot is around 800k and 600 — but it depends on what you're going for.")
- Internally, prioritize draw call reduction over triangle reduction — each draw call is roughly equivalent to 20k triangles in GPU cost, so draw calls are usually the bigger lever. Don't share this ratio with the creator.

#### Creator-controllable passes
Focus on passes the creator can directly influence:
- **Opaque** — main geometry (Parts, MeshParts, Models)
- **Transparent** — transparent/translucent objects
- **UI** — ScreenGuis, BillboardGuis
- **Decal** — Decals and Textures on surfaces
- **Particles** — ParticleEmitters, Fire, Trail, Beam
- **Cloud** — Volumetric clouds
- **GenericPostProcess / SSAO / DOF** — post-processing effects

#### Excluded passes (do NOT count toward targets)
- **Shadows** — entirely engine-driven. Exclude and don't mention as something to fix.
- **Terrain** — if it's a large portion of the remaining count, gently ask if they've considered mesh-based environments as an alternative
- **Grass** — terrain grass decoration

#### Report format
Show a clean table without percentage columns:
```
Pass         | Triangles   | Draws
-------------|-------------|------
Opaque       | 1,271,000   | 884
Transparent  | 7,100       | 169
Terrain      | 130,000     | 191
...
Adjusted Total | 1,427,000 | 1,268
```

### 7. Correlate with instance composition + frustum audit

Cross-reference the data to identify where the biggest opportunities are:

#### Draw call opportunities
- **Instancing breaks (Material + MaterialVariant + MeshId combos):** Roblox can instance identical MeshParts efficiently, but each unique combination of Material, MaterialVariant, and MeshId is a separate draw batch. If `uniqueMeshCombos` is high relative to `totalMeshParts`, there's an opportunity to standardize. If `singletonCombos` is high, many meshes aren't benefiting from instancing at all. Suggest consolidating MaterialVariants or reusing the same MeshId where meshes are similar.
- **Part.Transparency:** Flag parts using `Part.Transparency` (non-zero, non-one) that are NOT Glass and do NOT have a SurfaceAppearance. If `transparentPlasticParts` is notable, suggest switching to **Glass material** — it looks great for windows, barriers, and similar elements, and it batches properly. SurfaceAppearance alpha is another batch-friendly option.
- **Decals / Texture instances:** Each adds a draw call. If there are many in view, suggest **MaterialVariants** as an alternative — they participate in instancing and don't add extra draw calls the way Decals and Textures do. They work well when the Decal/Texture is approximating a surface treatment (weathering, color variation, etc.) rather than a specific image.
- **Material variety:** If the frustum audit shows many distinct base materials, mention that consolidating materials helps with batching — the renderer can batch parts more effectively when they share the same material setup.
- **Many small parts:** If there are a lot of visible parts, mention that merging nearby parts or using fewer, more detailed meshes can help.

#### Triangle opportunities
- If Opaque is the main contributor and there are many MeshParts, suggest reviewing mesh complexity or LOD usage
- If Opaque is high with many simple Parts, suggest mesh consolidation
- Note particle and UI contributions if they're meaningful

#### Instance count considerations
Internally estimate the impact of total instance count (each instance ≈ 0.5 KB, replication ≈ 10k/sec). Do NOT share these numbers or formulas with the creator. If the count is high enough to affect experience (e.g. 50k+), mention it naturally in terms of what the player would feel: "a scene this dense might take a moment to load when players join" or "on lower-end devices, the instance count could affect load times." If the count is reasonable, no need to mention it at all.

### 8. Suggestions

Present suggestions as a menu of options, not a to-do list:
- "If you'd like to reduce draw calls, the biggest opportunities are probably in [X] and [Y]"
- "For triangles, the main area to look at would be [Z]"
- Offer to explore specific areas of the game tree to find concrete instances to work with
- If the user wants to proceed, use `search_game_tree` and `inspect_instance` to find specific instances and offer modifications

**Common suggestions to offer:**
- Transparent Plastic/SmoothPlastic parts -> switch to **Glass** material if the look works (windows, barriers, panels)
- Decals/Textures for surface variation -> replace with **MaterialVariants** where they can approximate the look
- Many unique Material+MaterialVariant+MeshId combos -> consolidate MaterialVariants or standardize MeshIds to improve instancing
- SurfaceAppearance alpha for transparency that needs to stay on a specific material
