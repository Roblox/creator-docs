---
name: convert-to-streaming
description: >-
  Convert a non-streaming Roblox game to use streaming or fix streaming bugs and anti-patterns.
---

# Convert to Streaming

Converts a Roblox experience to use instance streaming. Runs through 9
steps with validation and a summary at the end.

All reference documentation and step scripts are inlined below:

- Step descriptions: [Step 1](#step-1-configure-workspace) through [Step 9](#step-9-summary)
- Reference sections: [Workspace Configuration](#reference-workspace-configuration),
  [Model Refactoring](#reference-model-refactoring),
  [ModelStreamingMode](#reference-modelstreamingmode),
  [Anti-Patterns](#reference-streaming-anti-patterns),
  [Prefetches and MRFs](#reference-prefetches-and-mrfs)
- Step scripts appendix: [Shared Helpers](#shared-helpers) (prepend to the
  scripts below), [Inventory](#inventory-script), [Refactoring](#refactoring-script),
  [Streaming Mode](#streaming-mode-script), [LOD](#lod-script)

## Prerequisites

- Roblox Studio must be open with the target place loaded
- The Roblox Studio MCP server must be connected

## Scope of Changes

Make whatever changes are needed to make the game streaming-safe, including
adding RemoteEvents/RemoteFunctions, moving queries from client to server,
and modifying multiple scripts to complete a fix.

When adding server-side handlers for client requests (RemoteFunctions,
OnServerEvent), **validate all client inputs** — never trust values sent
from the client.

Flag for **manual review** only when the fix requires redesigning a core
game system (e.g., rewriting a level loading architecture or a component
framework). When flagging, explain why and suggest the architectural change.

## Subagent Delegation

If the host environment exposes a subagent / sub-assistant tool (Roblox Studio MCP's `subagent`, Roblox Studio Assistant's subagent, Claude Code's `Agent`,  or similar), delegate the
following tasks to isolated sub-sessions rather than doing them inline:

- **Per-script anti-pattern analysis in Step 6 — the default execution
  model.** One subagent per client script. The orchestrator hands each
  subagent the script path, the critical-path set, and the Step 4
  classifications, and collects the disposition. Scripts are
  independent; keeping each one's context out of the orchestrator is
  what makes coverage tractable on games with many client scripts.
- **External reference rewrites in Step 3.** One subagent per high-priority
  entry reads the referencing scripts and proposes edits.
- **Targeted inventory-cache queries.** "Find all models under X with
  property Y" — a subagent with a single `execute_luau` call can answer
  without loading the whole skill.

If no subagent tool is available, do the work inline — the skill is
correct either way. When working inline, be especially careful about the
Step 6 coverage check: a long client-script list is easy to drop entries
from without per-script isolation.

## Caching Lifecycle

Step scripts cache state in `_G` (e.g., `_G["step:inventory:v1"]`). This
lives in the Studio process and is lost when Studio closes. If Studio
restarts mid-conversion, re-run Step 2. Changing `CACHE_KEY` forces a fresh scan.

---

## Step 1: Configure Workspace

Apply the recommended Workspace streaming properties from the
[Workspace Configuration reference](#reference-workspace-configuration) below.

Execute each property change via Luau. Properties that are not scriptable
should be flagged for manual configuration in Studio's Properties panel.

---

## Step 2: Inventory

Structural scan of the entire DataModel. Produces bucketed summaries and
caches full data for follow-up queries.

### Dependencies

None (first step).

### Luau Script

See [Inventory Script](#inventory-script) in the Step Scripts appendix.

#### Parameters

| Parameter   | Default       | Description                                          |
| ----------- | ------------- | ---------------------------------------------------- |
| `CACHE_KEY` | `"v1"`        | Change to force a fresh scan                         |
| `ROOT_PATH` | `"Workspace"` | Root for model/container scanning (scripts scan all services regardless) |

### Behavior

Inventory is always read-only.

1. Run the inventory script and review the summary.
2. Check borderline Atomic items — these may need co-location verification
   or context about the model's purpose.
3. Check refactoring candidates — note which have scripts (will need script
   updates after refactoring).
4. For deeper investigation, query the cache with targeted Luau snippets:

```lua
-- Example: get all models under a specific path
local cache = _G["step:inventory:v1"]
local results = {}
for _, m in cache.models do
    if string.find(m.path, "^Workspace%.Buildings") then
        table.insert(results, { path = m.path, maxExtent = m.maxExtent })
    end
end
return results
```

---

## Step 3: Refactoring — Scan, Review, Apply

Restructures the hierarchy by grouping loose BaseParts into sub-models so
that LOD and streaming modes can be applied at the right granularity.

See the [Model Refactoring reference](#reference-model-refactoring) below
for the full heuristics (grouping strategy, naming conventions, size
thresholds, execution order).

### Dependencies

Requires: Step 2 (inventory) cache.

### Luau Script

See [Refactoring Script](#refactoring-script) in the Step Scripts appendix.

#### Parameters

| Parameter             | Default  | Description                                                                 |
| --------------------- | -------- | --------------------------------------------------------------------------- |
| `MODE`                | `"scan"` | `"scan"` or `"apply"`                                                       |
| `CACHE_KEY`           | `"v1"`   | Must match inventory cache key                                              |
| `EXCLUDED_PART_NAMES` | `nil`    | Apply mode only: list of part names to skip (references couldn't be fixed) |

### Behavior

1. Run scan mode and sanity-check the grouping in `processedCandidates`.
2. Process `externalReferences` by priority (see the Model Refactoring
   reference for the triage rules). The part moves from
   `<containerPath>.<partName>` to `<containerPath>.<modelName>.<partName>`,
   so rewrites insert the model name between container and part:
   - `:WaitForChild("Arch01")` → `:WaitForChild("Arch01_Group"):WaitForChild("Arch01")`
   - `.Arch01` → `.Arch01_Group.Arch01`

   For references that can't be rewritten confidently, add the part name to
   `EXCLUDED_PART_NAMES` — excluded parts stay in their original container.
3. For each candidate in `candidatesWithScripts`, read scripts in the
   refactored container and update in-container references (e.g.,
   `script.Parent.Rock` → `script.Parent.Rock_Group.Rock`).
4. Run apply mode with `EXCLUDED_PART_NAMES` set.
5. Pass `modifiedPaths` to the atomic step as `RESCAN_SUBTREES`.

### Edge Cases

- **Oversized models are processed before containers** — the inventory
  identifies both oversized models (>250 studs with loose parts) and
  Folders/Workspace with loose parts. Both are included in the candidates list.
- **Spatial clustering** groups parts by proximity, not by name. The largest
  part seeds each cluster, and nearby parts are added until the cluster's
  bounding box reaches 250 studs. Parts too small for LOD (< 10 studs) are
  left ungrouped.

---

## Step 4: ModelStreamingMode Classification — Re-scan, Review, Apply

Classifies `ModelStreamingMode` for all Workspace models. Auto-classifies
clear-cut cases and returns borderline items for LLM review.

See the [ModelStreamingMode reference](#reference-modelstreamingmode) below
for the full classification heuristics and threshold reference.

### Dependencies

Requires: Step 2 (inventory) cache. Step 3 (refactoring) should be applied
first so classifications reflect the refactored hierarchy.

### Luau Script

See [Streaming Mode Script](#streaming-mode-script) in the Step Scripts appendix.

#### Parameters

| Parameter          | Default  | Description                                        |
| ------------------ | -------- | -------------------------------------------------- |
| `MODE`             | `"scan"` | `"scan"` or `"apply"`                              |
| `CACHE_KEY`        | `"v1"`   | Must match inventory cache key                     |
| `RESCAN_SUBTREES`  | `nil`    | List of paths to re-scan after refactoring         |

### Re-scan Mechanism

When refactoring creates or moves models, the inventory cache becomes stale.
The atomic step handles this:

1. If `_G["step:inventory:<key>"].dirty == true`, the scan triggers a re-scan
2. It checks `_G["step:refactoring:<key>"].modifiedPaths` for specific paths
3. For each modified path, it removes old model entries and re-scans that subtree
4. The inventory cache is updated in-place and the dirty flag is cleared

Pass `modifiedPaths` from the refactoring step as `RESCAN_SUBTREES` for
explicit control.

### Behavior

1. Set `RESCAN_SUBTREES` to the refactoring step's `modifiedPaths`.
2. Run scan mode. This triggers a re-scan of modified subtrees and also
   scans storage services.
3. Review borderline items (includes storage-side Models). For each, decide
   the final classification:
   - **Extent 375-500 studs**: Check if the model is a single cohesive object
     or an organizational container with distributed children.
   - **Descendants 1125-1500**: Verify the model is primarily BasePart descendants,
     not a hierarchy of child Models.
   - **Extent > 50 studs**: Run a co-location check to verify child Models are
     within ~100 studs of each other.
4. Write resolutions to the cache before running apply mode:

   ```lua
   local cache = _G["step:streaming-mode:v1"]
   cache.borderlineResolutions["Workspace.Buildings.Elevator"] = { mode = "Atomic" }
   cache.borderlineResolutions["Workspace.Map.LargeBuilding"] = { mode = "Default" }
   ```

5. Run apply mode. Apply mode sets `ModelStreamingMode` on the source Models
   in place. Clones parented to Workspace inherit the property automatically —
   no per-clone change needed.

Storage-side Models (tagged `source = "template"`) are scanned alongside
Workspace models. Apply the same heuristics — see the
[Runtime-Cloned Templates reference](#runtime-cloned-templates) for rationale
and the `:Clone()` confirmation check. Override scan roots via `STORAGE_PATHS`.

---

## Step 5: LOD Classification

Classifies `LevelOfDetail` for all Workspace models. Applies `SLIM`
to the highest eligible model in each branch of the hierarchy — once LOD is
set on a model, its children are skipped since the parent's LOD mesh already
covers their geometry at distance.

### Dependencies

Must run AFTER Step 3 (refactoring) so that newly created sub-models are
included.

### Luau Script

See [LOD Script](#lod-script) in the Step Scripts appendix.

No parameters. The script runs a live traversal of Workspace and applies
LOD in a single pass.

### Behavior

Run the script. It does a **live traversal** of Workspace (not cache) to
ensure newly created sub-models from refactoring are included. LOD
classification is entirely mechanical (threshold-based); review the output
to verify the numbers are reasonable.

### Traversal Behavior

The apply mode descends the model tree top-down. When it finds an eligible
model, it sets LOD and **stops descending** into that model's children. If a
model is too large, it skips LOD and continues descending to find eligible
children deeper in the hierarchy.

Example: Airport (500 studs) → skip, descend → Jet (80 studs) → set LOD,
stop → JetBridge (30 studs) → set LOD, stop.

### Classification Criteria

Extent is computed from **visible parts only** (`Transparency < 1`). Invisible
parts (collision boxes, ad tracking volumes, trigger regions) are excluded so
they don't inflate the bounding box.

| Condition                 | Action                 | Reason                                           |
| ------------------------- | ---------------------- | ------------------------------------------------ |
| No visible parts          | Skip                   | No visible geometry                              |
| < 10 studs (visible)      | Skip                   | Too small to produce meaningful LOD mesh         |
| 10-250 studs (visible)    | Set `SLIM`    | Ideal range — stop descending                    |
| > 250 studs (multi-part)  | Skip, descend          | Too large — look for eligible children instead   |
| > 250 studs (single-part) | Set `SLIM`    | Transitions out of LOD quickly — stop descending |

---

## Step 6: Fix Script Anti-Patterns

Scans client scripts for streaming-incompatible patterns and applies fixes.
This step is LLM-driven — there is no Luau step script.

See the [Streaming Anti-Patterns reference](#reference-streaming-anti-patterns)
below for the full anti-pattern catalog with severity levels, fix patterns,
and "What to Ignore" rules.

### Dependencies

Requires: Step 2 (inventory) cache for the script list and client script
paths. Step 4 (streaming mode) classifications are used to apply the "descendants
of atomic models can be directly indexed" ignore rule.

### Execution Strategy

The unit of work in Step 6 is the **client script**, and the correctness
signal is **coverage**: every entry in `inventory.scripts.clientScripts`
must end with a recorded disposition (fixed / already safe / flagged for
manual review / skipped with reason). Grep is a preprocessing tool that
prioritizes the queue and surfaces patterns — it does not replace the
per-script walk.

#### 1. Search for workspace access patterns

Use `script_grep` to search across all scripts:

- `workspace[.:]` — direct workspace access (AP#1, #2, #3, #5, #6, #10)
- `game.Workspace` — fully qualified access
- `GetService("Workspace")` — service-style access (single and double quotes)
- `FindFirstChildOfClass` and `FindFirstChildWhichIsA` — silent-nil
  variants of AP#2. These return nil when nothing matches and don't
  appear in the `workspace[.:]` grep when called on a captured ref
  (`model:FindFirstChildOfClass(...)`). Treat every match as a script
  needing a nil guard before the result is dereferenced.
- `local %w+ = workspace` and `local %w+ = game:GetService%("Workspace"%)`
  — module-scope captures. Each match is **two signals at once**: an
  alias (re-grep the variable name to find downstream uses, treat as
  workspace-equivalent) and an AP#4 candidate (the captured instance is
  long-lived and subject to stream-out — needs nil guard or
  `AncestryChanged` listener depending on access cadence).
- `self%.%w+ = ` capturing a workspace instance, and any
  `RunService.Heartbeat` / `RenderStepped` / `BindToRenderStep` callback
  that reads such a field — AP#4 hot path.
- `FireClient` — server sending workspace Instance refs to clients (anti-pattern #8)
- `.Parent =` in client scripts — check for reparenting workspace instances to non-streaming containers (anti-pattern #13)
- `:Clone()` — runtime-cloned templates parented to Workspace (template classification in Step 4, and sibling-ref preservation here)

#### 1.5. Build the critical-path script set

Before applying any `WaitForChild` fixes, trace the client initialization
chain per the [Hazard: WaitForChild on Critical Initialization Paths](#hazard-waitforchild-on-critical-initialization-paths)
section in the Anti-Patterns reference below. **Applying `WaitForChild` on
a critical-path site will hang game startup** — this is the highest-stakes
rule in Step 6.

Record a `criticalPath` set containing:
- Every `LocalScript` in `StarterPlayerScripts` and `ReplicatedFirst`.
- Every ModuleScript reachable via `require` from those scripts, where the code
  that runs at require time (or inside functions called before the loading
  screen exit) is considered critical.
- Every function name called directly or transitively from a critical-path
  script before the loading-screen exit line.

For the specific game being converted, identify the loading-screen exit line
first — `LoadingScreen:SetAttribute(...)`, `playerGui.LoadingScreen:Destroy()`,
`StarterGui:SetCoreGuiEnabled(Chat, true)`, or equivalent. Everything above
that line in the startup flow is critical path.

When applying a fix inside the critical-path set, use `FindFirstChild` + nil
guard — never `WaitForChild`. When applying a fix outside the set (e.g., a
button-click handler, a remote handler fired by gameplay), `WaitForChild` is
permitted with an appropriate timeout.

#### 2. Prioritize scripts

Process scripts in this order:
1. **LocalScripts** — most affected by streaming
2. **ModuleScripts** required by LocalScripts (typically in
   `ReplicatedStorage.Modules.Client` or `ReplicatedFirst.Modules` —
   `ReplicatedFirst` modules often run *before* the rest of the client and
   need the same review)
3. **Server scripts** — scan only for prefetch candidates (Step 7), not anti-patterns

Use the inventory's `scripts.clientScripts` list for the full set of client
script paths.

#### 3. Read and analyze each script

For each client script in the queue (regardless of whether it had
preprocessing hits — a script with zero hits gets the "already safe"
disposition, not skipped):

1. Read the full script with `script_read`.
2. Check for local aliases (e.g. `local ws = workspace`,
   `local ws = game:GetService("Workspace")`). When present, re-grep the
   alias identifier (`ws[%.:]`) and treat every hit as workspace access.
3. Walk the **full** anti-pattern catalog against this script — don't
   stop after finding the first issue. A single script commonly has two
   or more issues (e.g. an AP#1 direct index AND a refactor-path update
   from Step 3, or a module-scope capture that's simultaneously an AP#1
   alias and an AP#4 stored ref).
4. Apply the "What to Ignore" rules — skip server scripts, non-streaming
   container accesses, accesses to descendants of Atomic models (use Step 4
   classifications), non-spatial instance accesses.

#### 4. Apply fixes

Process scripts one at a time: read, identify every applicable
anti-pattern, batch edits via `multi_edit`, move on. Record the
disposition for each script (fixed with which anti-patterns, already
safe, flagged, skipped-with-reason) — this is the input to the coverage
check below.

#### 5. Default to per-script subagent delegation

When a subagent tool is available, dispatch one subagent per client
script by default. The orchestrator's job becomes: enumerate the script
set, hand each script to a subagent with the critical-path set + Step 4
classifications + a reference to this skill, and collect results. This
avoids running out of attention mid-queue on games with many client
scripts — the failure mode that leaves a script unexamined.

Only skip the subagent pattern if no such tool is available. See
[Subagent Delegation](#subagent-delegation) for the tool preference
order.

#### 6. Coverage check

Before declaring Step 6 done, reconcile processed scripts against
`inventory.scripts.clientScripts`. Every entry must have a recorded
disposition. If any are missing, go back and process them — skipping a
script is not the same as dispositioning it.

### Behavior

For each fix, use the appropriate pattern from the
[Anti-Patterns reference](#reference-streaming-anti-patterns). Flag
out-of-scope items for manual review with an explanation.

### Investigating client-server context

When an anti-pattern involves a client-server interaction (e.g., a
`RemoteEvent` handler that iterates workspace instances), read the
corresponding server script that fires the event before deciding whether to
fix or flag. This helps determine:

- Whether the event is **targeted** (fired to a specific player) or
  **broadcast** to all players — if targeted, the client-side filtering may
  be redundant.
- What **data the server already has** that could eliminate the client-side
  workspace query entirely.
- Whether the correct fix is a local script change or a server-side
  architectural change.

Use this context to write **actionable recommendations** rather than
generic warnings. For example, instead of "this iteration may miss
streamed-out instances," write "the server already knows which player's
house is being robbed — consider having the server send the alert only to
the affected player, removing the need for the client-side Placeables
check."

### Scope Boundaries

Make cross-script changes when needed (adding RemoteEvents/RemoteFunctions,
moving queries to the server, updating both client and server scripts).
When adding server-side handlers, validate all client inputs.

Flag for manual review only when the fix requires redesigning a core game
system (e.g., rewriting a level loading architecture).

---

## Step 7: Add Prefetches and MRFs

Identifies and adds `RequestStreamAroundAsync` prefetches before CFrame
moves and `AddReplicationFocus` / `RemoveReplicationFocus` for areas that
need continuous streaming. This step is LLM-driven — there is no Luau
step script.

See the [Prefetches and MRFs reference](#reference-prefetches-and-mrfs) below
for the full implementation patterns, guidelines, and identification
heuristics.

### Dependencies

Requires: Step 2 (inventory) cache for script paths.

### Search Patterns

Use `script_grep` to find teleport and movement patterns:

- `PivotTo` — modern teleport API
- `SetPrimaryPartCFrame` — deprecated but widely used
- `HumanoidRootPart` + `CFrame` — direct CFrame assignment
- `MoveTo` — model movement
- `CharacterAdded` — spawn/respawn logic
- `RequestStreamAroundAsync` — check if prefetches already exist

#### Distinguishing player teleports from object movement

Many `SetPrimaryPartCFrame` calls move objects (doors, vehicles, mechanisms)
rather than teleporting players. Only add prefetches when the code is moving
a **player's character** to a new position. Look for:

- `Character:PivotTo(...)` or `Character:SetPrimaryPartCFrame(...)`
- `HumanoidRootPart.CFrame = ...` where the CFrame is a distant position
- `Player:LoadCharacter()` followed by a CFrame repositioning
- Server scripts that receive a position from a RemoteEvent and move a character

Do NOT add prefetches for:
- Moving vehicles to the player's current position
- Animating doors, platforms, or mechanisms
- Moving NPCs or non-player models

### Behavior

Add prefetch calls before CFrame moves. Prefetches are always safe to add
(single-line, local change). MRFs may require discussion with the user if
the setup is non-trivial.

1. Search for teleport patterns across server scripts.
2. Read each script to determine if it moves players (not objects).
3. For each player teleport, add `RequestStreamAroundAsync` before the move:

   ```lua
   -- Before any CFrame move:
   player:RequestStreamAroundAsync(destinationPosition, 5)
   character:PivotTo(destinationCFrame)
   ```

4. For MRF candidates, determine if the use case warrants a replication focus.
   MRFs require server-side changes and may be out of scope for automated
   conversion — flag complex MRF candidates for manual review.

See the [Prefetches and MRFs reference → Identification Heuristics](#reference-prefetches-and-mrfs)
for the full MRF candidate list.

---

## Step 8: Validation

Comprehensive validation that every prior step landed correctly and that
the game runs cleanly under streaming. Fix any regressions found before
producing the summary.

### Dependencies

Runs after Steps 1–7 are complete.

### Playability gate

A clean console is not the same as a working game. Before classifying
console output, confirm the character is alive and on the ground. **If any
of the following hold, they block Step 9 regardless of how clean the
console is — a game that does not run is a game that does not run.**

- Respawn counter > 1 during the observation window — death loop. Character
  is falling into a void, hitting a death plane, or the state machine
  thinks they're dead.
- Y position decreases monotonically without stabilizing — freefall. Ground
  geometry is missing or streamed out at spawn.
- Position unchanged for the full window with `Humanoid.Health > 0` — stuck
  or frozen. State machine hung before spawn completed.
- Console contains repeating `Respawning` / death logs at regular intervals.

Use `screen_capture` to verify visible geometry, and sample
`HumanoidRootPart.Position` / `Humanoid.Health` via `execute_luau` over
~10s. If the gate fails, trace which system failed to initialize. If the
root cause is external (DataStore unavailable in Studio, etc.), surface it
explicitly rather than silently declaring success.

### Execution Strategy

#### 1. Runtime validation via play session

Start a play session, verify the game is actually playable, then analyze
console output.

1. Call `mcp__Roblox_Studio__start_stop_play` with `is_start: true`.
2. Wait for full initialization — loading screen dismissal and the main
   gameplay state. If the game exposes a "loaded" signal or attribute, use
   it; otherwise allow enough time for the first few client/server frames
   and for the console to quiesce.
3. Run the [Playability gate](#playability-gate). If any condition holds,
   stop and fix the root cause before continuing.
4. Call `mcp__Roblox_Studio__get_console_output` and classify each error.

Error categories and fixes:

| Symptom | Fix |
| --- | --- |
| Cascading init errors (nil refs from server data) | Wrap construction/init/requires in pcall per anti-pattern #8 "Downstream" |
| Per-frame errors from orphaned connections | Call `destroy()` before removing from lookup table ("pcall around initialization" hazard) |
| `Infinite yield possible on WaitForChild(...)` | Critical path: `FindFirstChild` + nil guard. Otherwise: add timeout + nil guard |
| `Requested module experienced an error while loading` | Wrap the require in pcall — cached permanently for session |
| `attempt to index nil with ...` on previously-working refs | Anti-pattern #4 — check before use or `AncestryChanged` |
| Path-not-found after refactoring | Update path for new sub-model wrapper (Step 3) |
| Stuck at spawn / `PauseOutsideLoadedArea` | Missing prefetch on spawn/respawn — re-check Step 7 |

#### 2. Movement validation

Many streaming issues only manifest after the player moves. Exercise
streaming explicitly.

1. Pick representative locations: spawn, a mid-range gameplay area, and a
   far-range area across the map. Use the inventory cache's `notableLarge`
   list or known zone entry points as targets.
2. For each location, use `mcp__Roblox_Studio__character_navigation` to
   move the player there. Capture console output after each move.
3. If the game has teleports, exercise them — call the triggering
   RemoteEvent via `mcp__Roblox_Studio__execute_luau` or drive the UI via
   `mcp__Roblox_Studio__user_mouse_input`.
4. Errors that appear only after movement are streaming-specific:
   - `attempt to index nil with ...` after moving away from an instance →
     stale reference (anti-pattern #4)
   - Gameplay systems that stop working at distance → completeness
     assumption (anti-pattern #3)
   - Raycasts returning unexpected results at range → anti-pattern #5
   - Distance checks using stale positions → anti-pattern #6

#### 3. Fix and re-validate

For each error, identify the anti-pattern, apply the fix from the
reference, and re-run the relevant validation part. Distinguish
pre-existing errors (unrelated to the conversion) from regressions
introduced by the conversion — pre-existing errors can be noted in the
summary without blocking completion. Do not proceed to Step 9 until the
game runs cleanly through initialization and movement.

#### 4. Stop the play session

Call `mcp__Roblox_Studio__start_stop_play` with `is_start: false` to
return to edit mode before producing the summary.

### Behavior

Start play → analyze console → move across the map → fix regressions →
stop play. Proceed to Step 9 only after a clean run.

This step is fully LLM-driven — no step script. Use judgment to:

- Decide when initialization is complete (loading screen dismissal,
  quiesced console, or a known "ready" signal).
- Classify each console error and pick the correct fix from the catalog.
- Distinguish pre-existing errors from conversion-introduced regressions.
- Choose which locations to test — a small map may only need spawn +
  mid-range; a sprawling map with distinct zones needs one per zone.
- Decide when to stop iterating — chasing flaky Studio-only errors is not
  worthwhile; focus on reproducible regressions.

---

## Step 9: Summary

After conversion, produce a summary using **every** section below. Do not
output results from earlier steps until this point. If a section has no
items, write "None."

### Workspace properties changed
List all changed properties with old → new values.

### Model structure refactored
Number of new sub-models created, total parts grouped, containers
refactored. For candidates with scripts, list which scripts were updated
and which were left for manual review.

### Models reclassified
Count and breakdown of ModelStreamingMode changes (Default → Atomic, etc.).

### Models with LOD changes
Count of models set to SLIM.

### Scripts modified
List every script edited with a brief description of the change.

### Assets relocated
List relocated assets with old → new path and scripts updated.

### Prefetches added
For each: script path, trigger, target position/area.

### Replication foci added
For each: script path, anchor BasePart, lifecycle, reason.

### Warnings / manual review needed
List all items requiring manual review with explanations.

---

## Reference: Workspace Configuration

### Workspace Streaming Properties

Recommended defaults unless game design requires different values:

| Property                 | Value                    | Reason                                                       |
| ------------------------ | ------------------------ | ------------------------------------------------------------ |
| `StreamingEnabled`       | `true`                   | Enable streaming                                             |
| `ModelStreamingBehavior` | `Improved`               | More efficient handling of Model instances                   |
| `StreamingIntegrityMode` | `PauseOutsideLoadedArea` | Prevents players from interacting with unloaded areas — safest default |
| `StreamOutBehavior`      | `Opportunistic`          | Frees memory more aggressively for better performance        |
| `StreamingMinRadius`     | `64` (default)           | Keep default unless user specifies                           |
| `StreamingTargetRadius`  | `1024` (default)         | Keep default unless user specifies                           |

#### When to Use Different Settings

- **`StreamingIntegrityMode = Disabled`**: Only if the game already handles unloaded
  areas gracefully (custom loading screens, no critical world interaction).
- **Higher `StreamingTargetRadius`**: For open-world games where pop-in is very
  noticeable (at the cost of more memory).

### Asset Relocation

Some assets must always be available to the client. If they live under `Workspace`,
they are subject to streaming and may not be present when scripts need them.

#### Candidates for Relocation

| Asset Type                                                  | Move To                               | Reason                              |
| ----------------------------------------------------------- | ------------------------------------- | ----------------------------------- |
| Client-side modules that don't reference workspace geometry | `ReplicatedStorage`                   | Always available                    |
| Sound effects / music                                       | `SoundService` or `ReplicatedStorage` | Should not be affected by streaming |
| Particle/effect templates cloned by scripts                 | `ReplicatedStorage`                   | Must exist when cloned              |
| GUI-referenced 3D models (e.g. viewport frames)             | `ReplicatedStorage`                   | Always available to GUI             |
| Global configuration values                                 | `ReplicatedStorage`                   | Always available                    |

#### Assets That Should Stay in Workspace

- Server-side scripts (unaffected by streaming)
- Anything whose position in the workspace matters for gameplay

Any relocated asset requires updating all script references to its old path.

### Edge Cases

- **Player characters** and **Terrain** are handled automatically by the
  engine; no special handling needed. For other players' characters, use
  `WaitForChild` on the character model.
- **Large places (10,000+ instances)**: prioritize LocalScripts and
  client-required ModuleScripts; server scripts can skip anti-pattern
  auditing but still need prefetch scanning.
- **Roblox Packages** cannot be edited in-place — fixes must be made in
  the package source and republished.

---

## Reference: Model Refactoring

Heuristics for wrapping loose BaseParts in Models. Two Model-only properties
drive this: **LevelOfDetail** (renders a simplified mesh for distant models)
and **ModelStreamingMode** (controls atomic replication, persistence). Bare
BaseParts miss both.

### When to Wrap

A loose BasePart (direct child of Workspace, a Folder, or an organizational
Model) is a wrapping candidate if:

1. **It would benefit from LOD** — its max extent is >= 10 studs. Below 10 studs
   the part is too small to produce a meaningful LOD mesh at distance.
2. **It needs streaming control** — a developer wants to mark it Atomic,
   Persistent, or PersistentPerPlayer.

Either reason alone is sufficient. A single 60-stud cliff piece deserves a model
wrapper for LOD even if no streaming mode change is planned.

### When NOT to Wrap

- **Parts already inside a LOD-eligible Model** — the parent provides coverage.
- **Parts referenced by scripts** — reparenting may break script references.
  Still wrap, but verify references first (see Script Safety below).
- **Terrain** — handled by the engine.
- **Non-spatial instances** — Scripts, Folders, Values, etc. are not candidates.

### Grouping Strategy

Group loose parts in the same container into shared models by spatial
proximity. Grouping produces better LOD meshes (more geometry for the
simplifier) and reduces instance-count overhead. Applies to Workspace root,
Folders, organizational Models, and oversized Models (>250 studs) whose
direct BasePart children lack LOD coverage.

#### Spatial clustering

Parts are grouped by physical adjacency, not by name. The algorithm:

1. Collect all loose BaseParts with max extent >= 10 studs (LOD-eligible)
2. Sort by size descending
3. Pick the largest ungrouped part as a seed for a new cluster
4. Iteratively add the nearest ungrouped part that satisfies **both**:
   - The cluster's bounding box stays under 250 studs (the LOD upper threshold)
   - The part's surface-to-surface gap to its nearest cluster member is
     under ~15 studs (parts must be physically close, not just within the
     same bounding box)
5. When no more parts can be added, finalize the cluster as a model
6. Repeat from step 3 until all eligible parts are assigned

The gap constraint prevents chaining — a sequence of moderately-spaced parts
won't all land in one oversized group just because each step keeps the
bounding box small. Only parts that are actually adjacent get grouped.

Parts too small for LOD (< 10 studs) are left ungrouped.

#### Naming convention

- Multi-part clusters: `{SeedPartName}_Group` (seed is the largest part)
- Single-part wrappers: `{PartName}` (same name as the part — the model
  serves as an invisible wrapper)

#### Size checks

After creating a model (group or single wrapper), verify its max extent:
- **< 10 studs** — too small for LOD benefit, skip (leave parts ungrouped).
- **10–250 studs** — ideal LOD range. Apply `SLIM` in a later pass.
- **> 250 studs (multi-part)** — too large, risks staying in LOD mode because
  all descendants must stream in. Subdivide further or leave as-is.
- **> 250 studs (single-part wrapper)** — still apply `SLIM`. A
  single-part model transitions out of LOD quickly since there is only one
  descendant to stream in.

### Script Safety

Reparenting parts into sub-models can break scripts that reference those parts
by name. This applies to all refactoring — grouping top-level loose parts,
wrapping singles, and decomposing oversized models.

#### Internal references

Scripts that are descendants of the container being refactored may reference
sibling parts by name (e.g., `script.Parent.Rock`). Reparenting `Rock` into
`Rock_Group` breaks this lookup. After refactoring, check scripts in the
container and update paths to account for the new model wrapper. If a script
is too complex to update confidently, flag it for manual review.

#### External references

Scripts outside the container may also reference its parts by name (e.g., a
server script in ServerScriptService that does
`model:WaitForChild("PartName")`). The refactoring scan greps all scripts
for reparented part names (matched as whole identifier tokens, not
substrings) and returns each match as an `externalReferences` entry. For
each, rewrite the reference to insert the new model name between the
container and the part — e.g., `:WaitForChild("PartName")` becomes
`:WaitForChild("PartName_Group"):WaitForChild("PartName")`. If a reference
can't be safely rewritten, pass the part name via `EXCLUDED_PART_NAMES` so
apply mode leaves that part in its original container.

**Don't blanket-exclude every referenced name.** On large places, the grep
returns hundreds of matches and most are false positives (token `"1"`
appearing inside asset IDs, `"Light"` matching unrelated variables, etc.).
The temptation is to dump all referenced names into `EXCLUDED_PART_NAMES`
and move on — but that forfeits LOD on every large part whose name happens
to appear in any script, including the exact case the refactoring step
exists to catch (a 180-stud arch referenced by one or two scripts). The
scan tags each entry with a `priority` derived from two dimensions:

- **Part size.** Max extent of the part(s) bearing the referenced name. A
  ≥ 100-stud part represents a real LOD saving; the cost of reading a few
  scripts is worth paying to preserve that saving.
- **Script hit count.** How many scripts contain the identifier. A set of
  ≤ 3 scripts is cheap to read and triage; 50+ is almost certainly
  dominated by false positives and not worth individual review.

Either dimension alone qualifies an entry as `high` priority — a large
part with many hits is still worth reviewing for the LOD payoff, and a
small part with few hits is still worth reviewing because it's cheap.
`medium` entries (50–100 studs, or 4–10 hits) get attention if time
permits; `low` entries (< 50 studs *and* > 10 hits) can be bulk-excluded.
Process the high-priority entries one at a time, reading each referencing
script, before reaching for the blanket-exclusion fallback.

### Scope Constraints

Do **not**:
- Split models already within the 10–250 stud LOD range
- Move parts between existing models
- Rename or reparent existing Models
- Touch non-spatial instances
- Reparent parts that are referenced by name from scripts (internal or
  external) without verifying and updating those references

### Execution Order

1. Decompose oversized models first — group their loose parts into sub-models.
2. Group top-level loose parts — wrap remaining loose parts under Workspace,
   Folders, and organizational Models.
3. Apply LOD in a separate pass after all refactoring is complete, so one scan
   covers both existing and newly created models.

---

## Reference: ModelStreamingMode

Controls how a Model participates in instance streaming. Set via the
`ModelStreamingMode` property on Model instances.

Requires `Workspace.ModelStreamingBehavior = Improved` to take effect.

### Available Modes

| Mode                  | Behavior                                                     | Use When                                                     |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Default`             | Equivalent to `Nonatomic` but subject to change in the future | Most models — no action needed                               |
| `Atomic`              | Entire model streams in/out as a unit                        | Models where partial loading would break gameplay and all parts need to be present to work correctly |
| `Persistent`          | Always replicated atomically, never streams out              | Rare occasions when a small number of parts must always be present on clients for a LocalScript to use |
| `PersistentPerPlayer` | Persistent for specific players, atomic for all others       | Player-specific persistent content (bases, private areas)    |
| `Nonatomic`           | Parts stream independently regardless of model hierarchy     | Large terrain-like models, scattered decorations where partial loading is fine |

### Classification Heuristics

First confirm the model represents a spatially cohesive object, not an
organizational container (model used as a folder). Then apply:

1. **Vehicles, tools, animated rigs** → `Atomic`
2. **NPCs / interactive characters** → `Atomic`
3. **Organizational containers** (models used as folders - only descendants are models, folders, and other non-spatial instances) → `Default` or `Nonatomic`
4. **Decoration-only models** (no script references or other gameplay) → `Default` or `Nonatomic`
5. **Large map sections, terrain decorations** → `Default` or `Nonatomic`
6. **Models referenced by UI** (health bars, name tags, indicators) → `Atomic`
7. **Multi-part objects with scripted interactivity** → `Atomic`
8. **Everything else** → `Default`

### Classification Thresholds

Concrete limits for deciding whether a model qualifies as `Atomic`. Any model that
exceeds a threshold stays `Default` regardless of its interactive components.

#### Spatial extent

Measure with `Model:GetExtentsSize()` and take the largest axis. A model with a
maximum extent over **500 studs** should not be marked `Atomic`. Models this large are
map sections or organizational containers whose children benefit from independent
streaming.

#### Descendant count

A model with over **1,500 descendants** should stay `Default` unless it is clearly a
single cohesive object (vehicle, character rig, animated model) where all parts are
needed simultaneously. Verify by checking that the model is primarily `BasePart`
descendants, not a hierarchy of child Models acting as sub-objects.

#### Spatial co-location

For Atomic candidates with a maximum extent over **50 studs**, verify that child
instances are co-located. If the model contains child Models whose bounding-box
centers are spread more than **~100 studs** apart, it is an organizational container —
not a cohesive object. Keep it `Default`.

#### SurfaceGui-only models

Models whose only "interactive" component is a `SurfaceGui` (no scripts,
`ClickDetector`s, `ProximityPrompt`s, or `HingeConstraint`s) should stay `Default`.
`SurfaceGui`s stream with their parent `BasePart` automatically and do not require
the entire model to be present.

#### Interactive component types

These count as interactive evidence for Atomic classification:

- **Explicit interactivity:** `BaseScript`, `ProximityPrompt`, `ClickDetector`,
  `HingeConstraint`.
- **Scripted physics:** `AlignOrientation`, `AlignPosition`, `BallSocketConstraint`,
  `RodConstraint`, `SpringConstraint`, `PrismaticConstraint`, `CylindricalConstraint`,
  `LinearVelocity`, `AngularVelocity`, `VectorForce`, `LineForce`, `Torque` (as an
  instance). Any of these is strong evidence that a script manipulates the model at
  runtime.
- **Rigid assembly:** a Model with a designated `PrimaryPart` **and** two or more
  rigid connections (`WeldConstraint`, `RigidConstraint`, or `Motor6D`) counts as
  interactive. The combination means "these parts are explicitly joined and the
  developer marked this as a cohesive unit" — vehicles, weapon assemblies, linked
  rigs. Either signal alone doesn't qualify (decorative clusters often have welds,
  many models have PrimaryPart without being cohesive).

`SurfaceGui` is informational context but is **not sufficient on its own** to
warrant `Atomic`.

**Heuristic gap — externally-driven templates.** A template whose controlling
scripts live outside the model (e.g., a vehicle driven by a separate Controller
module that reads `vehicle.PrimaryPart.AssemblyLinearVelocity`) may not trip the
explicit-interactivity signals. The rigid-assembly signal covers the common case
(scripted vehicle with welded parts and a PrimaryPart). If a template slips
through as Default but is actually driven, override the classification manually
via `borderlineResolutions`.

### Runtime-Cloned Templates

Models that live in a non-Workspace container at edit time (`ServerStorage`,
`ReplicatedStorage`, or any subtree within them) but are cloned into Workspace
at runtime are invisible to a pure Workspace scan. They never get classified
and stay at `Default`, which is usually wrong for interactive templates.

**Don't assume a folder name** — games use `Templates`, `Assets`, `Prefabs`,
`Library`, per-feature folders, or the service root. The signal is the
`:Clone()` → Workspace pattern, not the container's name.

**Scan scope.** Scan all Models reachable from `ServerStorage` and
`ReplicatedStorage`. Setting `ModelStreamingMode` on a Model that is never
cloned into Workspace is harmless — non-Workspace instances are unaffected by
streaming — so over-scanning is safe.

**Clone-detection grep.** To confirm which source Models are actually cloned
into Workspace, grep for `:Clone()` and inspect the caller:

```lua
local wheel = Templates.Wheel:Clone()
wheel.Parent = workspace

local levelModel = ReplicatedStorage.Levels[levelId]:Clone()
levelModel.Parent = workspace.Levels
```

Follow indirect paths too: factory modules that return cloned instances and let
the caller parent them, helpers like `cloneAt(template, cframe)` whose
implementation does the reparent. The signal is "a non-Workspace Model ends up
in Workspace", regardless of who writes the assignment.

**Classification.** Apply the same heuristics as for Workspace models,
against each storage-side Model at its edit-time path — cohesive
interactive objects (vehicles, character rigs, tools with physics
constraints, weapon assemblies) get `Atomic`; organizational containers
and map chunks stay `Default`. The `ModelStreamingMode` property is
inherited by clones, so setting it on the source is sufficient.

**Storage-side Models used as GUI source only** (cloned into a `ViewportFrame`,
never parented to Workspace) need no mode change — the property is meaningless
for non-Workspace instances.

**Do not reparent storage-side Models.** The source stays at its edit-time
location; only the `ModelStreamingMode` property is changed. Clones created
from it inherit the property.

---

## Reference: Streaming Anti-Patterns

Patterns in Luau scripts that break or degrade under instance streaming. Use this
catalog to identify issues in existing code and to avoid introducing them in new code.

Focus on **LocalScripts** and **ModuleScripts required by LocalScripts**. Server Scripts
do not need `WaitForChild` or nil guards since all instances exist on the server (but
they may still need prefetches when moving a player's character — see the prefetch
reference).

### Critical Anti-Patterns

#### 1. Direct hierarchy indexing (SEVERITY: HIGH)
```lua
-- BROKEN: Errors if Model or Part is not streamed in
local part = workspace.SomeModel.SomePart
local door = workspace.Building.Door.DoorPart
```

**Fix:** Replace with `WaitForChild` chains:
```lua
local part = workspace:WaitForChild("SomeModel"):WaitForChild("SomePart")
```

For descendants of atomically replicated models (`Atomic`, `Persistent`, or
`PersistentPerPlayer`), only add `WaitForChild` to the top-level streamed ancestor
and use direct indexing for all descendants:
```lua
-- Atomic model: only WaitForChild on the ancestor
local cart = workspace:WaitForChild("Cart")
local hitpoints = cart.Data.Hitpoints
```

#### 2. FindFirstChild without nil handling (SEVERITY: HIGH)
```lua
-- BROKEN: Silently gets nil, then errors on :SetAttribute() etc.
local part = workspace:FindFirstChild("SomePart")
part:SetAttribute("Key", value)
```

Also applies to `FindFirstChildWhichIsA()` and `FindFirstChildOfClass()` — same
silent-nil problem.

**Fix (instance expected to exist):** Replace with `WaitForChild`:
```lua
local part = workspace:WaitForChild("SomePart")
part:SetAttribute("Key", value)
```

**Fix (instance may legitimately not exist):** Add a nil guard:
```lua
local part = workspace:FindFirstChild("SomePart")
if part then
    part:SetAttribute("Key", value)
end
```

#### 3. Assuming workspace children are fully loaded (SEVERITY: HIGH)
```lua
-- BROKEN: GetChildren() only returns currently streamed-in instances
for _, child in workspace:GetChildren() do
    -- missing instances
end

-- BROKEN: GetDescendants() same issue
for _, desc in workspace:GetDescendants() do
    -- missing instances
end
```

This also applies to `GetChildren()`/`GetDescendants()` on non-spatial containers
(Folders) directly under Workspace when their children are spatial instances (Models,
Parts). The Folder itself is always replicated, but its spatial children stream in/out:
```lua
-- BROKEN: Folder Homes is always replicated, but its spatial Model children stream in/out
-- GetChildren() only returns homes currently streamed in — distant ones are missing
for _, home in workspace.Homes:GetChildren() do
    if home.Settings.Owner.Value == player.Name then
        return home  -- will not find homes that are streamed out
    end
end
```

Severity depends on whether the code requires a **complete** list of children. If it
does (e.g., searching for ownership, counting items, finding a specific instance by
property), the result will be silently wrong — not just missing instances, but
producing incorrect counts or failing lookups. If it only processes whatever is
available (e.g., toggling visibility on nearby objects), it degrades gracefully and
may not need a fix.

**Fix (one-time setup scan):** Add a `ChildAdded` listener alongside the
iteration so future stream-ins are also handled:
```lua
for _, child in workspace:GetChildren() do
    if child:IsA("Model") then
        setupModel(child)
    end
end
workspace.ChildAdded:Connect(function(child)
    if child:IsA("Model") then
        setupModel(child)
    end
end)
```

For descendants, consider using `CollectionService` tags instead.

**Fix (spatial children, code works with available items):** No fix needed, or apply
the standard ChildAdded pattern if setup logic is involved:
```lua
-- Toggling visibility on clouds — acceptable to miss distant ones
for _, cloud in workspace.Decoration.Clouds:GetChildren() do
    cloud.Transparency = 1
end
-- No fix needed: missing distant clouds is cosmetic
```

**Fix (spatial children, code requires completeness):** Flag for manual review. The
only correct fix is moving the query to the server:
```lua
-- CANNOT FIX LOCALLY: needs to find homes that may be streamed out
for _, home in workspace.Homes:GetChildren() do
    if home.Settings.Owner.Value == player.Name then
        return home
    end
end
-- FLAG: Recommend moving ownership lookup to server via RemoteFunction
```

**Fix (iteration result used without nil guard):** Add nil guards at call sites to
prevent crashes, even if the underlying completeness problem remains:
```lua
local function findByOwner(folder, playerName)
    for _, child in folder:GetChildren() do
        if child.Owner.Value == playerName then
            return child
        end
    end
    return nil
end

-- BEFORE: caller assumes the result is non-nil
local result = findByOwner(workspace.Homes, player.Name)
result.Door.Transparency = 1  -- errors if nil

-- AFTER: nil guard at the call site
local result = findByOwner(workspace.Homes, player.Name)
if not result then return end
result.Door.Transparency = 1
```

#### 4. Storing stale references to workspace instances (SEVERITY: MEDIUM)
```lua
-- RISKY: Local variable — reference becomes stale when instance streams out
local savedPart = workspace:WaitForChild("SomePart")
-- ...later...
savedPart.Position = Vector3.new(0, 10, 0)  -- may error if streamed out
```

This also applies to `ObjectValue.Value` and similar reference properties pointing at
workspace instances. These go `nil` immediately when the target streams out:
```lua
-- RISKY: ObjectValue.Value becomes nil when the target instance streams out
local targetValue = script.Parent:FindFirstChild("Target")  -- ObjectValue
local target = targetValue.Value  -- nil if target streamed out
target.BrickColor = BrickColor.new("Bright red")  -- errors
```

**Fix (check before use — preferred default):**
```lua
local savedPart = workspace:WaitForChild("SomePart")
-- ...much later...
if savedPart and savedPart.Parent then
    savedPart.Position = Vector3.new(0, 10, 0)
end
```

**Fix (listen for stream-out — for long-running loops that repeatedly access the ref):**
```lua
local savedPart = workspace:WaitForChild("SomePart")
savedPart.AncestryChanged:Connect(function(_, parent)
    if not parent then
        savedPart = nil  -- streamed out
    end
end)
```

The long-running-loop signal is specific: a workspace instance stored as
state (`self.X = ...` or an upvalue captured by a closure) **and** the same
ref read every frame inside `RunService.Heartbeat`,
`RunService.RenderStepped`, or `RunService:BindToRenderStep`. A per-access
nil guard inside the loop body adds a branch to every frame and still
throws at the exact moment of stream-out. Use the listener to clear the ref
once, and gate the loop with a single early exit:

```lua
self.wheel = wheel
wheel.AncestryChanged:Connect(function(_, parent)
    if not parent then self.wheel = nil end
end)

RunService:BindToRenderStep("WheelRender", 5, function(dt)
    if not self.wheel then return end
    -- per-frame work that reads self.wheel freely
end)
```

If the same stored ref is read from a handful of non-loop call sites as well, keep
the "check before use" guard at those sites — the listener handles the hot path,
the per-call-site checks handle the cold paths.

#### 5. Client-side spatial queries assuming geometry exists (SEVERITY: MEDIUM)

Raycasts and spatial queries silently miss unstreamed geometry. Nearby
queries are usually fine (nearby geometry is streamed in); long-range
queries are the risk — flag for server-side execution if accuracy at
distance matters for gameplay.

```lua
-- RISKY: all of these miss unstreamed parts
local result = workspace:Raycast(origin, direction)
local parts = workspace:GetPartBoundsInBox(cframe, size)
local parts = workspace:GetPartBoundsInRadius(position, radius)
local parts = workspace:GetPartsInPart(part)
local parts = workspace:FindPartsInRegion3(region)  -- deprecated but still used
```

**Fix (short-range, gameplay-critical):** No change needed — nearby geometry is
streamed in and results are reliable.

**Fix (long-range, gameplay-critical):** The query should be moved to the server where all geometry is always present:

```lua
-- FLAG: Long-range raycast should be moved to server via RemoteFunction
-- Server has full geometry; client raycast will miss unstreamed parts
local result = workspace:Raycast(origin, direction)
```

**Fix (non-critical / cosmetic):** No change needed, but add a comment noting the
limitation:
```lua
-- NOTE: May miss unstreamed parts — acceptable for cosmetic effect
local parts = workspace:GetPartBoundsInRadius(position, radius)
```

#### 6. Magnitude/distance checks to unstreamed positions (SEVERITY: MEDIUM)
```lua
-- RISKY: Part may not exist, or its position is stale
local dist = (part.Position - player.Character.HumanoidRootPart.Position).Magnitude
```

**Fix:** Guard against the part being streamed out before accessing its position:

```lua
if part and part.Parent then
    local dist = (part.Position - player.Character.HumanoidRootPart.Position).Magnitude
end
```

If the part reference comes from a stored variable, combine with the stale reference
pattern (#4). If the distance check is to a fixed known position, consider storing
the position as a `Vector3` constant instead of reading it from a part that may
stream out.

#### 7. Accessing HumanoidRootPart after CharacterAdded without WaitForChild (SEVERITY: HIGH)
```lua
-- BROKEN: Character model exists but HumanoidRootPart may not be loaded yet
player.CharacterAdded:Connect(function(character)
    local hrp = character.HumanoidRootPart  -- may error
    hrp.CFrame = spawnCFrame
end)
```

The character model is guaranteed to exist in the `CharacterAdded`
callback, but its children (including `HumanoidRootPart`, `Humanoid`,
accessories) may not be replicated yet.

**Fix:**
```lua
player.CharacterAdded:Connect(function(character)
    local hrp = character:WaitForChild("HumanoidRootPart")
    hrp.CFrame = spawnCFrame
end)
```

#### 8. RemoteEvent handlers that use workspace instances from server data (SEVERITY: HIGH)
```lua
-- BROKEN: Server sends a path, client indexes it without checking if streamed in
remoteEvent.OnClientEvent:Connect(function(instancePath)
    local target = workspace.Buildings[instancePath]  -- may not be streamed in
    target.BrickColor = BrickColor.new("Bright red")
end)
```

```lua
-- BROKEN: Server sends Instance references directly — nil if not streamed in
Remotes.Game:FireClient(player, 'getLevels', {
    model = workspace.Levels.Level1,
    mainPart = workspace.Levels.Level1.Checkpoint.Main
})

-- Client receives nil for instances that haven't streamed in
Remotes.Game.OnClientEvent:Connect(function(event, levelData)
    levelData.mainPart.Transparency = 1  -- errors: mainPart is nil
end)
```

Two variants: (a) the server sends a path/name and the client indexes
workspace with it (path-based lookups error on the index), and (b) the
server sends workspace Instance references directly via
RemoteEvent/RemoteFunction (direct refs arrive as `nil`). Harder to detect
than #1 because the workspace access comes from a variable, function
argument, or deserialized Instance reference — not a literal.

Detection: `OnClientEvent` handlers that navigate workspace hierarchy using
received data, and `FireClient` calls on the server that include workspace
Instance refs in their payload. Common in game initialization systems that
send level data, component configs, or target refs at join time.

**Fix (path-based lookups):** Replace direct indexing with `WaitForChild`:
```lua
remoteEvent.OnClientEvent:Connect(function(instancePath)
    local target = workspace:WaitForChild(instancePath)
    target.BrickColor = BrickColor.new("Bright red")
end)
```

**Fix (nil guard for Instance references):** If the receiving code can tolerate
missing instances, add nil guards and handle them when they stream in later:
```lua
Remotes.Game.OnClientEvent:Connect(function(event, data)
    if not data.mainPart then return end  -- skip if not streamed in
    setupComponent(data.mainPart)
end)
```

**Fix (Instance ref used as a teleport destination):** If the payload contains an
Instance that the client uses immediately as a teleport target — e.g., the server
clones a vehicle, parents it to Workspace, and fires the ref to the client
alongside a `character:PivotTo(vehicle.PrimaryPart.CFrame)` on receive — the nil
guard alone is insufficient. The surrounding area hasn't streamed in yet, so the
CFrame lands in empty space and either pauses the player (`PauseOutsideLoadedArea`)
or shows pop-in. Combine three fixes:

1. Nil guard the first-frame property access: `if not (vehicle and vehicle.PrimaryPart) then return end`.
2. Prefetch before the CFrame: `player:RequestStreamAroundAsync(vehicle.PrimaryPart.Position, 5)`.
3. If the assembly must stay streamed while the player is using it (vehicle they
   remain in, wheel pair that persists for a session, weapon mount), hold it via
   `Player:AddReplicationFocus` on the server at entry and `RemoveReplicationFocus`
   at exit. See the Prefetches and MRFs reference's "server-created multi-instance
   assemblies" heuristic.

**Fix (flag for manual review):** If the system fundamentally requires all
references to be valid at initialization (e.g., a component system that creates
all game objects on join), flag for architectural review — it needs to be made
streaming-aware with lazy initialization via CollectionService signals.

**Downstream: bulk initialization systems.** When the server sends bulk
data with Instance references (level data, entity tables, UI configs),
some refs will be nil for unstreamed instances. Systems that create
objects in a loop — component frameworks, entity systems, UI builders,
service initializers — need pcall resilience so one nil ref doesn't crash
the loop. Wrap construction, initialization, and module requires in pcall:

```lua
for id, obj in pairs(objects) do
    local ok, err = pcall(obj.initialize, obj)
    if not ok then
        pcall(obj.destroy, obj)  -- always destroy before removing; see "pcall around initialization" hazard
        objects[id] = nil
    end
end
```

Construction and `require` wrappers have no side effects to clean up —
just skip the failing entry. Initialization needs the destroy-then-remove
pattern shown above.

#### 9. CFrame jumps without a prefetch (SEVERITY: MEDIUM)
```lua
-- RISKY: Player teleports to a new area with nothing streamed in yet
character:PivotTo(destinationCFrame)

-- RISKY: Same issue with other CFrame assignment patterns
character.HumanoidRootPart.CFrame = CFrame.new(spawnPosition)
character:SetPrimaryPartCFrame(targetCFrame)
```

Moving a player's character to a distant position without calling
`Player:RequestStreamAroundAsync` first means the player arrives before the
surrounding geometry has streamed in — causing a streaming pause or visible pop-in
depending on the `StreamingIntegrityMode` setting. This applies to both client and
server scripts.

**Fix (server script):**
```lua
local function teleportPlayer(player, destination)
    player:RequestStreamAroundAsync(destination.Position, 5)
    player.Character:PivotTo(destination)
end
```

**Fix (client script):**
```lua
local player = game:GetService("Players").LocalPlayer
player:RequestStreamAroundAsync(destinationPosition, 5)
player.Character:PivotTo(CFrame.new(destinationPosition))
```

See the [Prefetches and MRFs reference](#reference-prefetches-and-mrfs) below for
full implementation patterns and guidelines.

#### 10. Model:GetBoundingBox() / GetExtentsSize() on non-atomic models (SEVERITY: MEDIUM)
```lua
-- RISKY: Returns incorrect bounds if some parts aren't streamed in
local cframe, size = workspace.Building:GetBoundingBox()
local extents = workspace.Building:GetExtentsSize()
```

Non-atomic models stream parts independently, so these calls return bounds
for only the currently-streamed parts. Common in building/placement systems
and collision previews. Not an issue for `Atomic`, `Persistent`, or
`PersistentPerPlayer` models.

**Fix (cohesive object):** Mark the model `Atomic` (vehicle, furniture,
interactive structure) so bounds are correct once streamed in.

**Fix (too large/distributed for Atomic):** Move the bounding-box
computation to the server, or redesign the system to not depend on
complete client-side bounds.

#### 11. DescendantAdded/DescendantRemoving as a performance trap (SEVERITY: MEDIUM)
```lua
-- RISKY: Under streaming, these fire constantly as instances stream in/out
workspace.DescendantAdded:Connect(function(descendant)
    -- Expensive work here runs on every stream-in, not just initial load
    updateMinimap(descendant)
end)
```

Under streaming, these signals fire on every stream-in and stream-out —
potentially hundreds of times as the player moves. Handlers that do
expensive work (updating tables, creating UI elements, iterating other
instances) cause frame drops. Performance issue, not correctness: the code
runs far more often than intended.

**Fix (targeting specific instance types):** Replace with `CollectionService` tag
listeners, which fire only for tagged instances:
```lua
-- BEFORE: fires for every descendant streaming in/out
workspace.DescendantAdded:Connect(function(descendant)
    if descendant:IsA("Model") and descendant:FindFirstChild("EnemyTag") then
        updateMinimap(descendant)
    end
end)

-- AFTER: fires only for tagged instances
CollectionService:GetInstanceAddedSignal("Enemy"):Connect(updateMinimap)
CollectionService:GetInstanceRemovedSignal("Enemy"):Connect(removeFromMinimap)
```

**Fix (narrower scope):** If the code only cares about children of a specific parent,
use `ChildAdded` on that parent instead of `DescendantAdded` on workspace:
```lua
-- BEFORE
workspace.DescendantAdded:Connect(handler)

-- AFTER: scoped to a specific container
workspace.Enemies.ChildAdded:Connect(handler)
```

**Fix (expensive handler):** If the handler must stay on `DescendantAdded`, add
early-exit guards and debounce or defer expensive work:
```lua
workspace.DescendantAdded:Connect(function(descendant)
    if not descendant:IsA("BasePart") then return end
    task.defer(function()
        updateMinimap(descendant)
    end)
end)
```

#### 12. Client-side CollectionService iteration without nil guards (SEVERITY: LOW)
```lua
-- CAUTION: Tagged instances may not all be streamed in
for _, obj in CollectionService:GetTagged("Enemy") do
    -- obj might stream out mid-loop
end
```

**Fix:** Add stream-in/stream-out handling:
```lua
local function onEnemyAdded(obj)
    setupEnemy(obj)
end

for _, obj in CollectionService:GetTagged("Enemy") do
    onEnemyAdded(obj)
end
CollectionService:GetInstanceAddedSignal("Enemy"):Connect(onEnemyAdded)
CollectionService:GetInstanceRemovedSignal("Enemy"):Connect(function(obj)
    cleanupEnemy(obj)
end)
```

#### 13. Client reparenting workspace instances to non-streaming containers (SEVERITY: HIGH)
```lua
-- BROKEN: client moves a workspace model to ReplicatedStorage as a "cache"
-- Server still streams it as a workspace object — geometry disappears
local levelCache = ReplicatedStorage.Levels
local levelFolder = workspace.Levels

-- "Unload" by moving to cache
workspaceLevelModel.Parent = levelCache

-- "Load" by moving back
workspaceLevelModel.Parent = levelFolder
```

Client code that reparents workspace instances to `ReplicatedStorage` (or
other non-streaming containers) as a caching/loading mechanism breaks
under streaming — the server still considers them `Workspace` instances
and manages replication accordingly, so the client's local reparent
conflicts with the server's view and geometry disappears. Common in
level/zone loaders that swap between `Workspace` (active) and
`ReplicatedStorage` (cached) on the client.

**Fix (remove client-side caching):** With streaming, the engine manages
instance visibility automatically — client-side caching by reparenting is
unnecessary and harmful. Remove the reparenting code entirely:
```lua
-- BEFORE: client swaps levels between workspace and cache
levelModel.Parent = levelCache    -- "unload"
levelModel.Parent = levelFolder   -- "load"

-- AFTER: remove reparenting — streaming handles visibility
-- No replacement needed; the engine streams geometry in/out by proximity
```

**Fix (move caching to the server):** If level loading must be explicit (e.g.,
the game has discrete zones that should only exist when active), handle it on
the server where reparenting is authoritative and streaming respects it:
```lua
-- SERVER: move levels between workspace and a server-side cache
local function loadLevel(player, levelId)
    levels[levelId].Parent = workspace.Levels
    player:RequestStreamAroundAsync(spawnPosition, 5)
end
```

**Fix (load-bearing cache — flag for manual review):** Before auto-removing the
reparent, check whether the "cache" is load-bearing. Signal: the same client
code that populates the cache is also the code that reads from it to feed
downstream systems (component constructors, level switchers, UI that renders
the active level). If the cache is how the game swaps between active and
inactive scenes — not just cosmetic state — deleting the reparent breaks the
swap. In that case, flag for manual review with a recommendation to move the
swap to the server (fix above). The only automatic local change that is safe
is to add a comment marking the site.

To distinguish: a non-load-bearing cache is written but never read (developer
dead code, belt-and-braces cleanup). A load-bearing cache has downstream
reads that drive initialization or gameplay state.

### Hazard: WaitForChild Without Timeout

A hazard to avoid when *applying* fixes (not a pattern to detect). Chained
`WaitForChild` calls without timeouts hang indefinitely if an instance was
deleted, renamed, or never created:

```lua
-- HAZARD: hangs forever if "OldModel" was renamed or removed
local model = workspace:WaitForChild("OldModel"):WaitForChild("Part")
```

When adding `WaitForChild` calls during a conversion, consider adding a timeout for
chains longer than one level or for instances whose existence is not guaranteed:
```lua
local model = workspace:WaitForChild("SomeModel", 10)
if not model then
    warn("SomeModel not found — may have been renamed or removed")
    return
end
local part = model:WaitForChild("SomePart", 10)
```

Single-level `WaitForChild` on known map geometry (e.g., `workspace:WaitForChild("Lobby")`)
is generally safe without a timeout since the instance is expected to stream in eventually.

### Hazard: WaitForChild on Critical Initialization Paths

**Highest-stakes rule in the conversion — getting it wrong hangs the game
at startup.**

`WaitForChild` (or any yielding call) on a path gating game startup hangs
the game. This includes module load scope (yields block every `require`),
constructors called in startup loops (timeouts multiply), and `init()` /
`ready()` methods that gate a loading screen.

```lua
-- BROKEN: constructor called 70 times during init × 10s timeout = 700s hang
function Component.new(config)
    self.part = config.model:WaitForChild("Main", 10)
end
```

**Rule:** On the critical path, fix anti-pattern #1 with `FindFirstChild` +
nil guard. Never `WaitForChild`. `FindFirstChild` fails fast; `WaitForChild`
silently blocks. Applies equally to `:Wait()`, `task.wait()`,
`RequestStreamAroundAsync`, and any other yielding call.

**How to detect the critical path:**

1. Start from every `LocalScript` in `StarterPlayerScripts` and
   `ReplicatedFirst`. Follow `require` edges — modules reachable from
   startup scripts inherit critical-path status for require-time code.
2. Find the **loading-screen exit line** in each startup script
   (`LoadingScreen:Destroy()`, `SetCoreGuiEnabled`, explicit `Loaded`
   signal). Everything before is critical; everything after is post-load.
3. Follow function calls made before the exit line recursively. Loops that
   construct per-entity (`for _, x in config do Class.new(x) end`) are the
   worst case — each call multiplies the hang.

**Not on the critical path:** user-triggered event handlers (button
`.Activated`, `ProximityPrompt.Triggered`, gameplay remote handlers),
functions reachable only through them, and scripts that start disabled.

**Fix patterns for module load scope:**

- **Used in one function** — move the `WaitForChild` inside with a timeout.
- **Used in multiple functions** — lazy getter with memoization and timeout.
- **Needed at load scope immediately** — `FindFirstChild` + nil guard
  (e.g., `local PLANE_SIZE = plane and plane.Size or Vector3.zero`).

### Hazard: pcall Around Initialization

When adding pcall resilience to object initialization (for any streaming fix
that wraps setup code in pcall), two failure modes silently break the game if
the patterns are wrong. These apply everywhere pcall wraps initialization that
has side effects — component systems, UI setup, service startup, anything that
creates connections or spawns instances during init.

#### 1. Clean up side effects before removing

`initialize()` methods typically create connections (`Touched`, `RenderStepped`,
signal listeners) as they run. If the function errors partway through, pcall
catches the error — but connections created before the error are already live.
Removing the object from a table without disconnecting them leaves orphaned
handlers that fire every frame with nil references.

```lua
-- WRONG: removes object but leaves its connections alive
local ok, err = pcall(obj.initialize, obj)
if not ok then
    objects[id] = nil  -- orphaned connections keep firing
end

-- CORRECT: destroy first, then remove
local ok, err = pcall(obj.initialize, obj)
if not ok then
    pcall(obj.destroy, obj)  -- pcall because destroy may also error on partial state
    objects[id] = nil
end
```

#### 2. Never nil-guard-and-return inside pcall'd initialization

Inside pcall'd initialization, a nil guard with early return is a silent
success — pcall sees no error and the caller keeps the object, but setup
was skipped: no connections, no state, no handlers. It sits in the lookup
table responding to some operations and failing on others.

```lua
-- WRONG: returns without error → pcall sees success → half-initialized zombie
-- stays in the table, has properties but no connections
function Object:initialize()
    local dependency = registry:get(self.dependencyId)
    if not dependency then return end  -- silent "success"
    self.dep = dependency
    self.connections['changed'] = dependency.changed:Connect(...)
end

-- CORRECT: let the nil propagate — the next line that indexes it errors,
-- pcall catches it, destroy cleans up, object is fully removed
function Object:initialize()
    local dependency = registry:get(self.dependencyId)
    self.dep = dependency
    self.connections['changed'] = dependency.changed:Connect(...)  -- errors if nil
end
```

Rule: don't convert failures into silent returns inside pcall'd init. Let
errors happen — pcall catches them, `destroy()` cleans up, and the object
is either fully initialized or fully absent.

### What to Ignore

These do **not** need streaming-related fixes:

- **Server Scripts** (`Script` in `ServerScriptService`, `Script` in `Workspace` with
  `RunContext = Server`) — the server always has the full data model.
- **Accesses to non-streaming containers** — `ReplicatedStorage`, `ReplicatedFirst`,
  `Players`, `Lighting`, `SoundService`, `StarterGui`, `StarterPack`, `StarterPlayer`
  are fully replicated and not affected by streaming.
- **Accesses to descendants of atomic models that are already streamed** — descendants
  of Atomic, Persistent, and PersistentPerPlayer models can be accessed directly once
  the ancestor model is known to be streamed via `WaitForChild` or another mechanism.
- **Module scripts in ReplicatedStorage** — unless they reference workspace instances.
- **Accesses to non-spatial instances directly under Workspace** — Folders, Configuration
  objects, and other non-spatial instances that are not descendants of a Model, Part, or
  other spatial instance are fully replicated and not subject to streaming. Only flag
  accesses to these if they are nested inside a streamable ancestor (e.g., a Folder
  inside a Model that could stream out).

---

## Reference: Prefetches and MRFs

### Prefetches

`Player:RequestStreamAroundAsync(position, timeOut)` begins streaming content
around a position before the player arrives. Use it whenever the game knows
a player will CFrame to a new area.

#### When to Add Prefetches

Add a prefetch before **any** code that moves the player's character to a new location.
Do not try to judge whether the distance is "short enough" to skip — even short
teleports can cause visible pop-in under load or on low-end devices.

- **Teleport scripts** — `character:SetPrimaryPartCFrame()`, `character:PivotTo()`,
  `HumanoidRootPart.CFrame = ...`
- **Spawn/respawn logic** — code that places the player at a spawn point after death
  or on join
- **Portal systems** — touching a part that moves the player elsewhere
- **GUI-triggered teleports** — buttons that send the player to a home base, shop, etc.
- **Server-initiated CFrame moves** — server scripts that reposition a player's
  character via RemoteEvents or directly
- **Model:MoveTo() and Model:SetPrimaryPartCFrame()** — deprecated but still widely used

#### Implementation

`RequestStreamAroundAsync` works on **both client and server** — it is called on the
Player object in both cases.

```lua
-- BEFORE: player CFrames to a new area — may hit a streaming pause
character:PivotTo(destinationCFrame)

-- AFTER: prefetch the area first, then CFrame
player:RequestStreamAroundAsync(destinationCFrame.Position, 5)
character:PivotTo(destinationCFrame)
```

On the server, get the Player object from the character or pass it as a parameter:
```lua
local function teleportPlayer(player, destination)
    player:RequestStreamAroundAsync(destination.Position, 5)
    player.Character:PivotTo(destination)
end
```

On the client, use the local player:
```lua
local player = game:GetService("Players").LocalPlayer
player:RequestStreamAroundAsync(destinationPosition, 5)
player.Character:PivotTo(CFrame.new(destinationPosition))
```

If the destination is known well in advance (e.g., the player opens a teleport menu),
prefetch as soon as the destination is known rather than waiting for confirmation:
```lua
-- Prefetch on menu open, CFrame on button click
teleportMenu.Opened:Connect(function()
    local dest = getPlayerHomePosition(player)
    player:RequestStreamAroundAsync(dest, 5)
end)

teleportButton.Activated:Connect(function()
    player.Character:PivotTo(CFrame.new(getPlayerHomePosition(player)))
end)
```

#### Prefetch Guidelines

- **Add to every CFrame/teleport — no exceptions.** Prefetches are temporary and
  low-cost. Do not skip them based on estimated distance or judgment that a teleport
  is "short enough."
- **Request as early as possible** — the earlier the request, the more time the engine
  has to stream in the area. If the destination is known before the player confirms,
  consider prefetching early.
- **Don't block gameplay** — if the prefetch times out, the CFrame should still happen.
  The streaming integrity mode handles the unloaded area.

### Multiple Replication Foci (MRFs)

By default, streaming centers around the player's character. MRFs add additional
focus points that keep areas streamed in even when the player is far away. Unlike
prefetches (which are one-time requests), MRFs maintain continuous streaming around
their position for as long as they are active.

MRFs are managed on the **server** via `Player:AddReplicationFocus(basePart)` and
`Player:RemoveReplicationFocus(basePart)`. If no suitable part exists at the target
location, create an invisible anchored part to serve as the anchor.

#### When to Add MRFs

1. **Distant physics simulation** — Client-side physics only runs in streamed areas,
   even for persistent and locally-created instances. If a player's home base should
   keep simulating while they're elsewhere, add an MRF at the base.

2. **Frequent movement between game zones** — With `Opportunistic` stream-out, moving
   back and forth between two areas repeatedly streams each area in and out. MRFs at
   both locations eliminate this churn.

3. **Remote views and spectator cameras** — Spectate modes, security camera feeds, or
   minimap renders that show distant areas. Assign a focus to the viewed location,
   cycling it as the view target changes.

4. **Scoped / long-range weapons** — On the server, raycast along the player's look
   direction and position an invisible focus part at the hit point. As the player pans
   through a scope, the world streams in where they're looking.

5. **Server-created multi-instance assemblies handed to a client.** When the server
   clones multiple cooperating instances (two wheels + a connector, a vehicle + its
   trailer, a weapon + mounted attachment) and hands them to a specific player via
   `FireClient`, any one of the instances streaming out breaks the assembly — even
   if the client's character is on it. A prefetch at entry isn't enough: with
   `Opportunistic` stream-out, the sibling instances can stream back out while the
   player is still using them. Hold the assembly in with an MRF on one of its
   primary parts for the duration the player is using it.

   ```lua
   -- Server: when the player enters the assembly
   player:AddReplicationFocus(localWheel.PrimaryPart)
   
   -- Server: when the player leaves or the assembly is destroyed
   player:RemoveReplicationFocus(localWheel.PrimaryPart)
   ```

   One focus on one primary part is enough — the streaming radius around the focus
   keeps the sibling instances streamed too. Detection signal: server code that
   clones 2+ cooperating instances, parents them to Workspace, and fires
   `:FireClient(player, ..., instanceA, instanceB, instanceC)` with those refs in
   the same frame.

#### MRF Guidelines

- **Use judiciously** — each MRF increases memory and network load. Limit to 2–3 per
  player.
- **Remove when no longer needed** — if a player sells their home, leaves a game mode,
  or stops spectating, remove the corresponding focus.
- **Prefer prefetches for one-time trips** — MRFs are for areas the player returns to
  repeatedly. For one-off destinations, a prefetch is cheaper.
- **MRFs are server-side only** — the client can request one via a RemoteEvent, but
  the server should validate and manage the lifecycle.

### Identification Heuristics

When auditing scripts or writing new code, look for patterns that suggest prefetch
or MRF candidates:

1. **Any CFrame/teleport to a distant position** → add a prefetch before the move.
2. **Repeated teleports between fixed locations** → MRF at both ends.
3. **Player-owned persistent areas** with physics-driven gameplay → MRF, added on
   purchase, removed on sale.
4. **Central hubs or spawn areas** all players visit → MRF on player join.
5. **Predictable movement sequences** (checkpoints, quest chains) → prefetch the next
   waypoint as the player approaches the current one.
6. **Spectator systems or security cameras** → MRF on the viewed target, cycling as
   the view changes.
7. **Scoped / long-range weapons** → dynamic MRF driven by aim direction, added on
   scope-in, removed on scope-out.
8. **Server flow that clones multi-instance assemblies and hands them to a
   specific client** → MRF on one primary part of the assembly at entry,
   `RemoveReplicationFocus` at exit. A prefetch alone isn't enough because
   sibling instances can stream out while the player is using the assembly.

---

# Step Scripts Appendix

These are the Luau scripts referenced by Steps 2–5. To run a step, pass the
script body to `mcp__Roblox_Studio__execute_luau`. Adjust the `local`
parameters at the top of each script (e.g., `MODE`, `CACHE_KEY`,
`RESCAN_SUBTREES`) before running.

**Shared Helpers prepend.** The Inventory, Refactoring, and Streaming Mode
scripts all depend on the [Shared Helpers](#shared-helpers) block below
(threshold constants, `resolvePath`, `childSummary`, `collectModelRecord`).
When executing one of those scripts, prepend the Shared Helpers block to
the script body and pass the concatenated source as a single `code`
argument to `execute_luau`. The LOD script is self-contained and does not
need the prepend.

## Shared Helpers

Used by the Inventory, Refactoring, and Streaming Mode scripts. Prepend
this block to the target script body when calling `execute_luau`.

```lua
-- Classification thresholds. Prose definitions live in
-- "Reference: ModelStreamingMode → Classification Thresholds".
local MAX_ATOMIC_EXTENT = 500
local MAX_ATOMIC_DESCENDANTS = 1500
local BORDERLINE_EXTENT = math.floor(MAX_ATOMIC_EXTENT * 0.75) -- 375
local BORDERLINE_DESCENDANTS = math.floor(MAX_ATOMIC_DESCENDANTS * 0.75) -- 1125
local MAX_LOD_EXTENT = 250
local MIN_LOD_EXTENT = 10

-- Resolves a dot-notation path like "Workspace.Building.Door" to its Instance.
local function resolvePath(path: string): Instance?
	local parts = string.split(path, ".")
	local current: Instance = game
	for _, part in parts do
		if part == "Workspace" or part == "workspace" then
			current = workspace
		elseif current == game and part == "game" then
			continue
		else
			local child = current:FindFirstChild(part)
			if not child then return nil end
			current = child
		end
	end
	return current
end

-- Summarizes an instance's children as "N ClassA, M ClassB", sorted by count desc.
local function childSummary(instance: Instance): string
	local counts: { [string]: number } = {}
	for _, child in instance:GetChildren() do
		counts[child.ClassName] = (counts[child.ClassName] or 0) + 1
	end
	local entries = {}
	for cn, count in counts do
		table.insert(entries, `{count} {cn}`)
	end
	table.sort(entries, function(a, b)
		return tonumber(string.match(a, "^(%d+)")) > tonumber(string.match(b, "^(%d+)"))
	end)
	return table.concat(entries, ", ")
end

-- Collects full metadata for a single Model: interactive-component counts,
-- welds and scripted physics constraints, direct children by type, extent,
-- and streaming/LOD mode. Used by the inventory scan and the streaming-mode
-- re-scan so both paths produce identical records.
local function collectModelRecord(model: Model, modelPath: string, source: string)
	local scriptCount, prompts, clicks, hinges, sgui = 0, 0, 0, 0, 0
	local welds, physicsConstraints = 0, 0
	local descendants = model:GetDescendants()
	for _, d in descendants do
		if d:IsA("BaseScript") then scriptCount += 1 end
		if d:IsA("ProximityPrompt") then prompts += 1 end
		if d:IsA("ClickDetector") then clicks += 1 end
		if d:IsA("HingeConstraint") then hinges += 1 end
		if d:IsA("SurfaceGui") then sgui += 1 end
		-- Rigid connections: parts welded or motored together stream as a unit.
		if d:IsA("WeldConstraint") or d:IsA("RigidConstraint") or d:IsA("Motor6D") then
			welds += 1
		end
		-- Scripted physics constraints and movers: strong signal of scripted manipulation.
		if d:IsA("AlignOrientation") or d:IsA("AlignPosition")
			or d:IsA("BallSocketConstraint") or d:IsA("RodConstraint")
			or d:IsA("SpringConstraint") or d:IsA("PrismaticConstraint")
			or d:IsA("CylindricalConstraint")
			or d:IsA("LinearVelocity") or d:IsA("AngularVelocity")
			or d:IsA("VectorForce") or d:IsA("LineForce") or d:IsA("Torque") then
			physicsConstraints += 1
		end
	end

	local directParts, directModels, directOther = 0, 0, 0
	for _, gc in model:GetChildren() do
		if gc:IsA("BasePart") then directParts += 1
		elseif gc:IsA("Model") then directModels += 1
		else directOther += 1 end
	end

	local extents = model:GetExtentsSize()
	local maxExtent = math.floor(math.max(extents.X, extents.Y, extents.Z))

	return {
		path = modelPath,
		source = source,
		mode = model.ModelStreamingMode.Name,
		lod = model.LevelOfDetail.Name,
		descendants = #descendants,
		maxExtent = maxExtent,
		directParts = directParts,
		directModels = directModels,
		directOther = directOther,
		hasPrimaryPart = model.PrimaryPart ~= nil,
		interactive = {
			scripts = scriptCount,
			prompts = prompts,
			clicks = clicks,
			hinges = hinges,
			sgui = sgui,
			welds = welds,
			physicsConstraints = physicsConstraints,
		},
		childSummary = childSummary(model),
	}
end
```

## Inventory Script

Used by [Step 2: Inventory](#step-2-inventory).

```lua
-- Inventory: structural scan of the DataModel. Caches full data in
-- _G["step:inventory:<CACHE_KEY>"] and returns a summary.

local CACHE_KEY = "v1"
local ROOT_PATH = "Workspace"
-- Storage services scanned for runtime-cloned templates.
local STORAGE_PATHS = { "ServerStorage", "ReplicatedStorage", "ReplicatedFirst" }

-- Thresholds, resolvePath, childSummary, collectModelRecord are provided
-- by the Shared Helpers block (prepend before executing).

------------------------------------------------------------------------
-- Helpers
------------------------------------------------------------------------

local function categorizeScript(script: Instance): string
	if script:IsA("ModuleScript") then return "module"
	elseif script:IsA("LocalScript") then return "client"
	elseif script:IsA("Script") then
		return script.RunContext.Name == "Client" and "client" or "server"
	end
	return "unknown"
end

------------------------------------------------------------------------
-- Workspace streaming config
------------------------------------------------------------------------

local function readWorkspaceConfig()
	local ws = workspace
	local config = { StreamingEnabled = ws.StreamingEnabled }

	local enumProps = {
		"ModelStreamingBehavior",
		"StreamingIntegrityMode",
		"StreamOutBehavior",
	}
	for _, name in enumProps do
		local ok, val = pcall(function() return ws[name].Name end)
		config[name] = ok and val or nil
	end

	local numProps = { "StreamingMinRadius", "StreamingTargetRadius" }
	for _, name in numProps do
		local ok, val = pcall(function() return ws[name] end)
		config[name] = ok and val or nil
	end

	return config
end

------------------------------------------------------------------------
-- Model scanning (Workspace hierarchy)
------------------------------------------------------------------------

local allModels = {}

local function scanModels(instance: Instance, path: string, source: string)
	for _, child in instance:GetChildren() do
		local childPath = path .. "." .. child.Name

		if child:IsA("Model") then
			table.insert(allModels, collectModelRecord(child, childPath, source))
		end

		-- Recurse into Models and Folders
		if child:IsA("Model") or child:IsA("Folder") then
			scanModels(child, childPath, source)
		end
	end
end

------------------------------------------------------------------------
-- Container scanning (Folders + Workspace root with loose parts)
------------------------------------------------------------------------

local allContainers = {}

local function scanContainers(instance: Instance, path: string)
	local partCount = 0
	for _, child in instance:GetChildren() do
		if child:IsA("BasePart") then partCount += 1 end
	end

	local hasScripts = false
	for _, d in instance:GetDescendants() do
		if d:IsA("BaseScript") then hasScripts = true; break end
	end
	
	table.insert(allContainers, {
		path = path,
		className = instance.ClassName,
		looseParts = partCount,
		hasScripts = hasScripts,
	})

	for _, child in instance:GetChildren() do
		if child:IsA("Folder") then
			scanContainers(child, path .. "." .. child.Name)
		end
	end
end

------------------------------------------------------------------------
-- Script scanning (all services)
------------------------------------------------------------------------

local allScripts = {}

local function scanScripts(root: Instance, serviceName: string)
	for _, desc in root:GetDescendants() do
		-- BaseScript covers Script and LocalScript; ModuleScript is separate
		if desc:IsA("BaseScript") or desc:IsA("ModuleScript") then
			local ancestors = {}
			local current = desc
			while current ~= root do
				table.insert(ancestors, 1, current.Name)
				current = current.Parent
			end
			local path = serviceName .. "." .. table.concat(ancestors, ".")

			table.insert(allScripts, {
				path = path,
				className = desc.ClassName,
				runContext = if desc:IsA("Script") and not desc:IsA("ModuleScript")
					then desc.RunContext.Name else nil,
				category = categorizeScript(desc),
				service = serviceName,
			})
		end
	end
end

------------------------------------------------------------------------
-- Pre-classification buckets
------------------------------------------------------------------------

local function classifyModels(models)
	local buckets = {
		clearCutAtomic = {},
		borderlineAtomic = {},
		clearCutDefault = {},
		clearCutContainer = {},
		decorative = {},
	}

	local bySize = { tiny = 0, small = 0, medium = 0, large = 0, huge = 0 }
	local byMode = {}
	local byType = { container = 0, interactive = 0, decorative = 0, largeDefault = 0 }

	for _, m in models do
		-- Size band
		if m.maxExtent < 10 then bySize.tiny += 1
		elseif m.maxExtent < 50 then bySize.small += 1
		elseif m.maxExtent < 200 then bySize.medium += 1
		elseif m.maxExtent < 500 then bySize.large += 1
		else bySize.huge += 1 end

		-- Current mode
		byMode[m.mode] = (byMode[m.mode] or 0) + 1

		local interactive = m.interactive
		-- Base interactivity: explicit interactive components
		local interactiveCount = interactive.scripts + interactive.prompts
			+ interactive.clicks + interactive.hinges
			+ interactive.physicsConstraints
		-- Rigid welds imply the parts must stream as a unit. Treat as interactive
		-- only when there are multiple welds AND a designated PrimaryPart (both
		-- signals together indicate a cohesive object, not scattered welded decor).
		if m.hasPrimaryPart and interactive.welds >= 2 then
			interactiveCount += 1
		end
		local isContainer = m.directParts == 0 and interactiveCount == 0

		if isContainer then
			table.insert(buckets.clearCutContainer, m)
			byType.container += 1
		elseif interactiveCount == 0 then
			-- No interactivity (SurfaceGui alone doesn't count)
			if m.maxExtent > MAX_ATOMIC_EXTENT or m.descendants > MAX_ATOMIC_DESCENDANTS then
				table.insert(buckets.clearCutDefault, m)
				byType.largeDefault += 1
			else
				table.insert(buckets.decorative, m)
				byType.decorative += 1
			end
		elseif m.maxExtent > MAX_ATOMIC_EXTENT or m.descendants > MAX_ATOMIC_DESCENDANTS then
			-- Interactive but exceeds thresholds
			table.insert(buckets.clearCutDefault, m)
			byType.largeDefault += 1
		elseif m.maxExtent <= BORDERLINE_EXTENT and m.descendants <= BORDERLINE_DESCENDANTS then
			-- Clear-cut Atomic: well within thresholds
			table.insert(buckets.clearCutAtomic, m)
			byType.interactive += 1
		else
			-- Borderline: near thresholds or needs co-location check
			table.insert(buckets.borderlineAtomic, m)
			byType.interactive += 1
		end
	end

	return buckets, bySize, byMode, byType
end

------------------------------------------------------------------------
-- Refactoring candidate identification
------------------------------------------------------------------------

local function identifyRefactoringCandidates(models, containers)
	local candidates = {}

	-- Oversized Workspace models with loose parts (templates are not refactored)
	for _, m in models do
		if m.source == "workspace" and m.maxExtent > MAX_LOD_EXTENT and m.directParts >= 1 then
			table.insert(candidates, {
				path = m.path,
				source = "oversized_model",
				looseParts = m.directParts,
				maxExtent = m.maxExtent,
				hasScripts = m.interactive.scripts > 0,
			})
		end
	end

	-- Containers (Folders/Workspace) with loose parts
	for _, c in containers do
		table.insert(candidates, {
			path = c.path,
			source = "container",
			looseParts = c.looseParts,
			maxExtent = nil,
			hasScripts = c.hasScripts,
		})
	end

	return candidates
end

------------------------------------------------------------------------
-- Main execution
------------------------------------------------------------------------

-- Check cache
local cacheId = "step:inventory:" .. CACHE_KEY
if _G[cacheId] and not _G[cacheId].dirty then
	-- Return summary from cache without re-scanning
	local cache = _G[cacheId]
	return cache.summary
end

-- Fresh scan
local root = resolvePath(ROOT_PATH)
if not root then
	return { error = `Could not resolve path: {ROOT_PATH}` }
end

-- 1. Workspace config
local workspaceConfig = readWorkspaceConfig()

-- 2. Scan models (workspace + configured template paths)
allModels = {}
scanModels(root, ROOT_PATH, "workspace")

local storageScanned = {}
for _, storagePath in STORAGE_PATHS do
	local storageRoot = resolvePath(storagePath)
	if storageRoot then
		scanModels(storageRoot, storagePath, "template")
		table.insert(storageScanned, storagePath)
	end
end

-- 3. Scan containers (Folders + Workspace root)
allContainers = {}
scanContainers(root, ROOT_PATH)

-- 4. Scan scripts from all services
allScripts = {}
local services = {
	{ game:GetService("ServerScriptService"), "ServerScriptService" },
	{ game:GetService("StarterPlayer"), "StarterPlayer" },
	{ game:GetService("StarterGui"), "StarterGui" },
	{ game:GetService("ReplicatedStorage"), "ReplicatedStorage" },
	-- ReplicatedFirst commonly hosts client-side gameplay modules
	-- (`ReplicatedFirst.Modules.*Client`) that need anti-pattern review.
	{ game:GetService("ReplicatedFirst"), "ReplicatedFirst" },
}
-- Also scan Workspace scripts (already in the model scan but not as scripts)
table.insert(services, { workspace, "Workspace" })

for _, entry in services do
	local service, name = entry[1], entry[2]
	if service then
		scanScripts(service, name)
	end
end

-- 5. Classify models
local buckets, bySize, byMode, byType = classifyModels(allModels)

-- 6. Identify refactoring candidates
local refactoringCandidates = identifyRefactoringCandidates(allModels, allContainers)

-- 7. Build script summary
local scriptsByService = {}
local scriptsByCategory = { client = 0, server = 0, module = 0 }
local clientScriptPaths = {}
for _, s in allScripts do
	scriptsByService[s.service] = (scriptsByService[s.service] or 0) + 1
	if s.category == "client" or s.category == "server" or s.category == "module" then
		scriptsByCategory[s.category] += 1
	end
	if s.category == "client" then
		table.insert(clientScriptPaths, s.path)
	end
end

-- 8. Notable large models (top 10 by extent)
local sortedByExtent = {}
for _, m in allModels do
	if m.maxExtent > 100 then
		table.insert(sortedByExtent, { path = m.path, maxExtent = m.maxExtent, descendants = m.descendants })
	end
end
table.sort(sortedByExtent, function(a, b) return a.maxExtent > b.maxExtent end)
local notableLarge = {}
for i = 1, math.min(15, #sortedByExtent) do
	table.insert(notableLarge, sortedByExtent[i])
end

-- Build summary (returned to LLM, must fit in MCP output)
local summary = {
	workspaceConfig = workspaceConfig,

	models = {
		total = #allModels,
		bySize = bySize,
		byMode = byMode,
		byType = byType,
		clearCutAtomicCount = #buckets.clearCutAtomic,
		borderlineAtomicCount = #buckets.borderlineAtomic,
		storagePathsScanned = storageScanned,
	},

	scripts = {
		total = #allScripts,
		byService = scriptsByService,
		byCategory = scriptsByCategory,
		clientScripts = clientScriptPaths,
	},

	refactoring = {
		totalCandidates = #refactoringCandidates,
		candidates = refactoringCandidates,
	},

	borderlineAtomic = {},
	notableLarge = notableLarge,
}

-- Include borderline Atomic details (typically <50 items)
for _, m in buckets.borderlineAtomic do
	table.insert(summary.borderlineAtomic, {
		path = m.path,
		source = m.source,
		maxExtent = m.maxExtent,
		descendants = m.descendants,
		interactive = m.interactive,
		mode = m.mode,
	})
end

-- Cache everything for follow-up queries
_G[cacheId] = {
	models = allModels,
	scripts = allScripts,
	containers = allContainers,
	workspaceConfig = workspaceConfig,
	buckets = buckets,
	refactoringCandidates = refactoringCandidates,
	dirty = false,
	summary = summary,
}

return summary
```

## Refactoring Script

Used by [Step 3: Refactoring](#step-3-refactoring--scan-review-apply).

```lua
-- Refactoring: wraps loose BaseParts in sub-models via spatial clustering.
-- "scan" plans grouping operations; "apply" executes the plan.

local MODE = "scan"
local CACHE_KEY = "v1"
-- Apply mode: part names to leave in their original container.
local EXCLUDED_PART_NAMES = nil

local MAX_GAP = 15 -- max surface-to-surface gap to cluster member

------------------------------------------------------------------------
-- Plan generation (scan mode)
------------------------------------------------------------------------

-- Returns the max axis extent of an axis-aligned bounding box.
local function bbMaxExtent(bbMin: Vector3, bbMax: Vector3): number
	local extent = bbMax - bbMin
	return math.max(extent.X, extent.Y, extent.Z)
end

-- Returns the world-space AABB of a part as (min, max) Vector3s.
-- Uses the OBB-to-AABB projection: world half-extent on each axis is
-- the sum of absolute dot products of each rotation column with the
-- local half-size.
local function partBB(part: BasePart): (Vector3, Vector3)
	local cf = part.CFrame
	local half = part.Size / 2
	local r, u, l = cf.RightVector, cf.UpVector, cf.LookVector

	local worldHalf = r:Abs() * half.X + u:Abs() * half.Y + l:Abs() * half.Z
	return cf.Position - worldHalf, cf.Position + worldHalf
end

-- Returns the max axis extent of a single part in world space.
local function partMaxExtent(part: BasePart): number
	return bbMaxExtent(partBB(part))
end

-- Returns the surface-to-surface gap between two parts' world AABBs.
local function partGap(a: BasePart, b: BasePart): number
	local aMin, aMax = partBB(a)
	local bMin, bMax = partBB(b)
	local gap = (aMin - bMax):Max(bMin - aMax):Max(Vector3.zero)
	return gap.Magnitude
end

-- Returns the minimum gap between a candidate part and any part in the cluster.
local function minGapToCluster(candidate: BasePart, cluster: { BasePart }): number
	local minGap = math.huge
	for _, member in cluster do
		local gap = partGap(candidate, member)
		if gap < minGap then
			minGap = gap
		end
	end
	return minGap
end

local function planForContainer(container: Instance, containerPath: string)
	local operations = {}

	-- Collect direct BasePart children that are large enough for LOD
	local eligible = {}
	for _, child in container:GetChildren() do
		if child:IsA("BasePart") and partMaxExtent(child) >= MIN_LOD_EXTENT then
			table.insert(eligible, child)
		end
	end
	if #eligible == 0 then return operations end

	-- Sort by size descending so the largest parts seed clusters first
	table.sort(eligible, function(a, b)
		return partMaxExtent(a) > partMaxExtent(b)
	end)

	-- Greedy spatial clustering: pick the largest ungrouped part as seed,
	-- then iteratively add nearby parts that keep the cluster under the
	-- LOD upper threshold.
	local assigned: { [BasePart]: boolean } = {}

	for _, seed in eligible do
		if assigned[seed] then continue end

		local cluster = { seed }
		assigned[seed] = true

		-- Initialize cluster bounding box from the seed
		local cMin, cMax = partBB(seed)

		-- If the seed alone already exceeds the LOD limit, wrap it by itself
		-- (single-part models still get LOD via the single-part exception).
		local seedExtent = bbMaxExtent(cMin, cMax)
		if seedExtent > MAX_LOD_EXTENT then
			table.insert(operations, {
				action = "group",
				containerPath = containerPath,
				modelName = seed.Name,
				partCount = 1,
				_parts = { seed },
			})
			continue
		end

		-- Iteratively try to add more parts to this cluster
		local addedThisPass = true
		while addedThisPass do
			addedThisPass = false

			-- Find the nearest unassigned part that fits
			local bestPart = nil
			local bestDist = math.huge

			for _, candidate in eligible do
				if assigned[candidate] then continue end

				-- Compute what the bounding box would be with this part
				local pMin, pMax = partBB(candidate)
				local newMin = cMin:Min(pMin)
				local newMax = cMax:Max(pMax)

				if bbMaxExtent(newMin, newMax) > MAX_LOD_EXTENT then
					continue
				end

				-- Reject if candidate is too far from every existing cluster member
				if minGapToCluster(candidate, cluster) > MAX_GAP then
					continue
				end

				-- Distance from candidate center to cluster center
				local clusterCenter = (cMin + cMax) / 2
				local dist = (candidate.Position - clusterCenter).Magnitude

				if dist < bestDist then
					bestDist = dist
					bestPart = candidate
				end
			end

			if bestPart then
				table.insert(cluster, bestPart)
				assigned[bestPart] = true
				addedThisPass = true

				-- Expand cluster bounding box
				local pMin, pMax = partBB(bestPart)
				cMin = cMin:Min(pMin)
				cMax = cMax:Max(pMax)
			end
		end

		-- Name: seed part name for singles, seed name + "_Group" for multi-part
		local modelName = seed.Name
		if #cluster > 1 then
			modelName = seed.Name .. "_Group"
		end

		table.insert(operations, {
			action = "group",
			containerPath = containerPath,
			modelName = modelName,
			partCount = #cluster,
			_parts = cluster,
		})
	end

	return operations
end

------------------------------------------------------------------------
-- Scan mode
------------------------------------------------------------------------

local function runScan()
	local invCache = _G["step:inventory:" .. CACHE_KEY]
	if not invCache then
		return { error = "Inventory cache not found. Run inventory.luau first." }
	end

	local candidates = invCache.refactoringCandidates
	if not candidates then
		return { error = "No refactoring candidates in inventory cache." }
	end

	local allOperations = {}
	local processedCandidates = {}

	for _, candidate in candidates do
		local container = resolvePath(candidate.path)
		if not container then continue end

		local ops = planForContainer(container, candidate.path)
		if #ops > 0 then
			for _, op in ops do
				table.insert(allOperations, op)
			end
			table.insert(processedCandidates, {
				path = candidate.path,
				looseParts = candidate.looseParts,
				hasScripts = candidate.hasScripts,
				operationCount = #ops,
			})
		end
	end

	-- Estimate totals
	local estimatedNewModels = #allOperations
	local estimatedPartsGrouped = 0
	for _, op in allOperations do
		estimatedPartsGrouped += op.partCount
	end

	-- Candidates with scripts that may need path updates after reparenting
	local candidatesWithScripts = {}
	for _, c in processedCandidates do
		if c.hasScripts then
			table.insert(candidatesWithScripts, { path = c.path, looseParts = c.looseParts })
		end
	end

	-- Collect unique names of parts that will be reparented.
	-- Skip generic names that would produce false positives.
	local GENERIC_NAMES: { [string]: boolean } = {
		Part = true, Base = true, Model = true, Folder = true,
		Baseplate = true, Wedge = true, Sphere = true, Cylinder = true,
		Block = true, Brick = true, Plate = true, Truss = true,
	}
	-- Map each distinctive part name to the operations that contain it
	local nameToOps: { [string]: { any } } = {}
	for _, op in allOperations do
		for _, part in op._parts do
			if not GENERIC_NAMES[part.Name] then
				if not nameToOps[part.Name] then
					nameToOps[part.Name] = {}
				end
				table.insert(nameToOps[part.Name], op)
			end
		end
	end

	-- Collect all script sources once for the external reference scan below.
	local scriptSources = {}
	local scriptServices = {
		game:GetService("ServerScriptService"),
		game:GetService("StarterPlayer"),
		game:GetService("StarterGui"),
		game:GetService("ReplicatedStorage"),
		game:GetService("ReplicatedFirst"),
		workspace,
	}
	for _, service in scriptServices do
		for _, desc in service:GetDescendants() do
			if (desc:IsA("BaseScript") or desc:IsA("ModuleScript")) then
				local ok, src = pcall(function() return desc.Source end)
				if ok and src and #src > 0 then
					table.insert(scriptSources, { source = src, path = desc:GetFullName() })
				end
			end
		end
	end

	-- Match the part name as a full identifier token, not a substring. The
	-- frontier patterns require the surrounding characters (if any) to not be
	-- identifier characters ([A-Za-z0-9_]), so "Arch01" doesn't match inside
	-- "Arch010" or "MyArch01".
	local function escapePattern(s: string): string
		return (string.gsub(s, "([%-%.%+%[%]%(%)%$%^%%%?%*])", "%%%1"))
	end
	local function referencesName(source: string, name: string): boolean
		return string.find(source, "%f[%w_]" .. escapePattern(name) .. "%f[^%w_]") ~= nil
	end

	-- Scan all script sources for references to reparented part names. Each
	-- match is emitted as an externalReferences entry so the LLM can rewrite
	-- the reference to account for the new model wrapper. Parts are NOT
	-- removed from the plan here — the LLM runs apply with EXCLUDED_PART_NAMES
	-- for any parts whose references it couldn't safely rewrite.
	--
	-- Each entry is tagged with a priority so the LLM can triage rather than
	-- blanket-exclude. A part whose name appears in hundreds of scripts is
	-- almost always false-positive noise ("1", "Light", "Color"), so the
	-- review cost isn't worth it — but a large part (>=100 studs, where LOD
	-- savings are real) or a small-reference case (<=3 scripts, cheap to
	-- read) is worth reviewing even if the other dimension is borderline.
	local LARGE_EXTENT_THRESHOLD = 100
	local MEDIUM_EXTENT_THRESHOLD = 50
	local FEW_SCRIPTS_THRESHOLD = 3
	local MANY_SCRIPTS_THRESHOLD = 10

	local externalReferences = {}
	local priorityCounts = { high = 0, medium = 0, low = 0 }
	for name, ops in nameToOps do
		local referencingScripts = {}
		for _, entry in scriptSources do
			if referencesName(entry.source, name) then
				table.insert(referencingScripts, entry.path)
			end
		end
		local scriptHitCount = #referencingScripts
		if scriptHitCount > 0 then
			-- Deduplicate ops: the same op appears in `ops` multiple times
			-- if the cluster contains multiple parts sharing this name.
			local seen: { [any]: boolean } = {}
			for _, op in ops do
				if seen[op] then continue end
				seen[op] = true

				-- Largest part in this cluster bearing this name — the
				-- relevant extent for judging LOD payoff.
				local namedPartExtent = 0
				for _, part in op._parts do
					if part.Name == name then
						local e = partMaxExtent(part)
						if e > namedPartExtent then namedPartExtent = e end
					end
				end

				local priority
				if namedPartExtent >= LARGE_EXTENT_THRESHOLD
					or scriptHitCount <= FEW_SCRIPTS_THRESHOLD then
					priority = "high"
				elseif namedPartExtent >= MEDIUM_EXTENT_THRESHOLD
					or scriptHitCount <= MANY_SCRIPTS_THRESHOLD then
					priority = "medium"
				else
					priority = "low"
				end
				priorityCounts[priority] += 1

				table.insert(externalReferences, {
					partName = name,
					modelName = op.modelName,
					containerPath = op.containerPath,
					referencingScripts = referencingScripts,
					scriptHitCount = scriptHitCount,
					maxExtent = namedPartExtent,
					priority = priority,
				})
			end
		end
	end

	-- Sort so the highest-priority, largest entries surface first. This is
	-- the order the LLM should process them in.
	local priorityRank = { high = 3, medium = 2, low = 1 }
	table.sort(externalReferences, function(a, b)
		if a.priority ~= b.priority then
			return priorityRank[a.priority] > priorityRank[b.priority]
		end
		return a.maxExtent > b.maxExtent
	end)

	local reparentedPartNames = {}
	for name in nameToOps do
		table.insert(reparentedPartNames, name)
	end
	table.sort(reparentedPartNames)

	-- Cache the plan
	_G["step:refactoring:" .. CACHE_KEY] = {
		plan = allOperations,
		modifiedPaths = {},
	}

	return {
		totalCandidates = #candidates,
		processedCandidates = processedCandidates,
		candidatesWithScripts = candidatesWithScripts,
		estimatedNewModels = estimatedNewModels,
		estimatedPartsGrouped = estimatedPartsGrouped,
		reparentedPartNames = reparentedPartNames,
		externalReferences = externalReferences,
		externalReferencesByPriority = priorityCounts,
	}
end

------------------------------------------------------------------------
-- Apply mode
------------------------------------------------------------------------

local function runApply()
	local stepCache = _G["step:refactoring:" .. CACHE_KEY]
	if not stepCache or not stepCache.plan then
		return { error = "No refactoring plan cached. Run scan mode first." }
	end

	local excluded: { [string]: boolean } = {}
	if EXCLUDED_PART_NAMES then
		for _, name in EXCLUDED_PART_NAMES do
			excluded[name] = true
		end
	end

	local plan = stepCache.plan
	local modelsCreated = 0
	local partsGrouped = 0
	local partsSkipped = 0
	local modifiedPaths = {}
	local errors = {}

	for _, op in plan do
		if op.action == "group" then
			local container = resolvePath(op.containerPath)
			if not container then
				table.insert(errors, { path = op.containerPath, error = "Container not found" })
				continue
			end

			local model = Instance.new("Model")
			model.Name = op.modelName
			model.Parent = container

			local moved = 0
			for _, part in op._parts do
				if excluded[part.Name] then
					partsSkipped += 1
					continue
				end
				if part.Parent == container then
					part.Parent = model
					moved += 1
				end
			end

			if moved > 0 then
				modelsCreated += 1
				partsGrouped += moved
				modifiedPaths[op.containerPath] = true
			else
				model:Destroy()
			end
		end
	end

	-- Record modified paths
	local pathList = {}
	for path in modifiedPaths do
		table.insert(pathList, path)
	end
	stepCache.modifiedPaths = pathList

	-- Mark inventory as dirty so atomic step knows to re-scan
	local invCache = _G["step:inventory:" .. CACHE_KEY]
	if invCache then
		invCache.dirty = true
	end

	return {
		modelsCreated = modelsCreated,
		partsGrouped = partsGrouped,
		partsSkipped = partsSkipped,
		modifiedPaths = pathList,
		errorCount = #errors,
		errors = errors,
	}
end

------------------------------------------------------------------------
-- Entry point
------------------------------------------------------------------------

if MODE == "scan" then
	return runScan()
elseif MODE == "apply" then
	return runApply()
else
	return { error = `Invalid MODE: {MODE}. Use "scan" or "apply".` }
end
```

## Streaming Mode Script

Used by [Step 4: ModelStreamingMode Classification](#step-4-modelstreamingmode-classification--re-scan-review-apply).

```lua
-- ModelStreamingMode classification. "scan" classifies all models (auto +
-- borderline); "apply" sets the property using cached classifications and
-- any LLM-written borderlineResolutions.

local MODE = "scan"
local CACHE_KEY = "v1"
-- Subtrees to re-scan after refactoring. Nil + dirty cache = re-scan Workspace.
local RESCAN_SUBTREES = nil

local COLOCATION_CHECK_EXTENT = 50

-- MAX_ATOMIC_EXTENT, MAX_ATOMIC_DESCENDANTS, BORDERLINE_EXTENT,
-- BORDERLINE_DESCENDANTS, resolvePath, childSummary, and collectModelRecord
-- are provided by the Shared Helpers block (prepend before executing).

------------------------------------------------------------------------
-- Targeted re-scan of subtrees after refactoring
------------------------------------------------------------------------

local function rescanSubtree(rootPath: string, invCache)
	local root = resolvePath(rootPath)
	if not root then return end

	-- Remove old models under this path from cache
	local models = invCache.models
	local kept = {}
	for _, m in models do
		if not string.find(m.path, "^" .. rootPath .. "%.") and m.path ~= rootPath then
			table.insert(kept, m)
		end
	end

	-- Scan new models in this subtree
	local function scan(instance: Instance, path: string)
		for _, child in instance:GetChildren() do
			local childPath = path .. "." .. child.Name

			if child:IsA("Model") then
				table.insert(kept, collectModelRecord(child, childPath, "workspace"))
			end

			if child:IsA("Model") or child:IsA("Folder") then
				scan(child, childPath)
			end
		end
	end

	scan(root, rootPath)
	invCache.models = kept
end

------------------------------------------------------------------------
-- Classification logic
------------------------------------------------------------------------

local function classifyModel(m)
	local interactive = m.interactive
	local interactiveCount = interactive.scripts + interactive.prompts
		+ interactive.clicks + interactive.hinges
		+ (interactive.physicsConstraints or 0)
	if m.hasPrimaryPart and (interactive.welds or 0) >= 2 then
		interactiveCount += 1
	end
	local isContainer = m.directParts == 0 and interactiveCount == 0

	if isContainer then
		return "Default", "high", "organizational container"
	end

	if interactiveCount == 0 then
		return "Default", "high", "no interactive components"
	end

	-- Has interactivity — check thresholds
	if m.maxExtent > MAX_ATOMIC_EXTENT then
		return "Default", "high", `exceeds extent threshold ({m.maxExtent} > {MAX_ATOMIC_EXTENT} studs)`
	end

	if m.descendants > MAX_ATOMIC_DESCENDANTS then
		return "Default", "high", `exceeds descendant threshold ({m.descendants} > {MAX_ATOMIC_DESCENDANTS})`
	end

	-- Within thresholds — check if clear-cut or borderline
	local isBorderline = false
	local reason = ""

	if m.maxExtent > BORDERLINE_EXTENT then
		isBorderline = true
		reason = `extent {m.maxExtent} studs (near {MAX_ATOMIC_EXTENT} threshold)`
	elseif m.descendants > BORDERLINE_DESCENDANTS then
		isBorderline = true
		reason = `{m.descendants} descendants (near {MAX_ATOMIC_DESCENDANTS} threshold)`
	elseif m.maxExtent > COLOCATION_CHECK_EXTENT then
		isBorderline = true
		reason = `extent {m.maxExtent} studs (needs co-location check)`
	end

	if isBorderline then
		return "Atomic", "borderline", reason
	end

	return "Atomic", "high", "interactive, within thresholds"
end

------------------------------------------------------------------------
-- Scan mode
------------------------------------------------------------------------

local function runScan()
	local invCache = _G["step:inventory:" .. CACHE_KEY]
	if not invCache then
		return { error = "Inventory cache not found. Run inventory.luau first." }
	end

	-- Re-scan if dirty
	if invCache.dirty then
		local subtrees = RESCAN_SUBTREES
		if not subtrees then
			-- Check if refactoring step recorded modified paths
			local refCache = _G["step:refactoring:" .. CACHE_KEY]
			if refCache and refCache.modifiedPaths and #refCache.modifiedPaths > 0 then
				subtrees = refCache.modifiedPaths
			else
				subtrees = { "Workspace" }
			end
		end

		for _, path in subtrees do
			rescanSubtree(path, invCache)
		end
		invCache.dirty = false
	end

	-- Classify all models
	local classifications = {}
	local borderline = {}
	local autoAtomic = 0
	local autoDefault = 0
	local alreadyCorrect = 0
	local changesNeeded = 0

	for _, m in invCache.models do
		local recommended, confidence, reason = classifyModel(m)

		classifications[m.path] = {
			currentMode = m.mode,
			recommendedMode = recommended,
			confidence = confidence,
			reason = reason,
		}

		if m.mode == recommended then
			alreadyCorrect += 1
		else
			changesNeeded += 1
			if confidence == "borderline" then
				table.insert(borderline, {
					path = m.path,
					source = m.source,
					currentMode = m.mode,
					recommendedMode = recommended,
					reason = reason,
					maxExtent = m.maxExtent,
					descendants = m.descendants,
					interactive = m.interactive,
				})
			elseif recommended == "Atomic" then
				autoAtomic += 1
			else
				autoDefault += 1
			end
		end
	end

	-- Cache classifications
	_G["step:streaming-mode:" .. CACHE_KEY] = {
		classifications = classifications,
		borderlineResolutions = {},
	}

	return {
		totalModels = #invCache.models,
		alreadyCorrect = alreadyCorrect,
		changesNeeded = changesNeeded,
		autoAtomic = autoAtomic,
		autoDefault = autoDefault,
		borderlineCount = #borderline,
		borderlineItems = borderline,
	}
end

------------------------------------------------------------------------
-- Apply mode
------------------------------------------------------------------------

local function runApply()
	local stepCache = _G["step:streaming-mode:" .. CACHE_KEY]
	if not stepCache or not stepCache.classifications then
		return { error = "No classifications cached. Run scan mode first." }
	end

	local classifications = stepCache.classifications
	local resolutions = stepCache.borderlineResolutions or {}
	local changed = 0
	local skipped = 0
	local errors = {}

	local modeEnum = {
		Default = Enum.ModelStreamingMode.Default,
		Atomic = Enum.ModelStreamingMode.Atomic,
		Persistent = Enum.ModelStreamingMode.Persistent,
		PersistentPerPlayer = Enum.ModelStreamingMode.PersistentPerPlayer,
		Nonatomic = Enum.ModelStreamingMode.Nonatomic,
	}

	for path, c in classifications do
		local finalMode = c.recommendedMode

		-- Check if LLM resolved a borderline item differently
		if resolutions[path] then
			finalMode = resolutions[path].mode
		end

		if c.currentMode == finalMode then
			continue
		end

		local instance = resolvePath(path)
		if not instance or not instance:IsA("Model") then
			skipped += 1
			continue
		end

		local enumVal = modeEnum[finalMode]
		if not enumVal then
			table.insert(errors, { path = path, error = `Unknown mode: {finalMode}` })
			continue
		end

		local ok, err = pcall(function()
			instance.ModelStreamingMode = enumVal
		end)
		if ok then
			changed += 1
		else
			table.insert(errors, { path = path, error = tostring(err) })
		end
	end

	return {
		changed = changed,
		skipped = skipped,
		errorCount = #errors,
		errors = { table.unpack(errors, 1, math.min(10, #errors)) },
	}
end

------------------------------------------------------------------------
-- Entry point
------------------------------------------------------------------------

if MODE == "scan" then
	return runScan()
elseif MODE == "apply" then
	return runApply()
else
	return { error = `Invalid MODE: {MODE}. Use "scan" or "apply".` }
end
```

## LOD Script

Used by [Step 5: LOD Classification](#step-5-lod-classification).

```lua
-- LOD: applies SLIM to the highest eligible model in each branch.
-- Live traversal of Workspace; runs after refactoring.

local MIN_LOD_EXTENT = 10
local MAX_LOD_EXTENT = 250

------------------------------------------------------------------------
-- Helpers
------------------------------------------------------------------------

-- Computes the max extent of a model's visible geometry only.
-- Invisible parts (Transparency >= 1) are excluded so that collision
-- boxes, ad tracking volumes, and trigger regions don't inflate the
-- bounding box used for LOD decisions.
-- Returns maxExtent, visiblePartCount.
local function visibleExtent(model: Model): (number, number)
	local huge = math.huge
	local bbMin = Vector3.new(huge, huge, huge)
	local bbMax = Vector3.new(-huge, -huge, -huge)
	local count = 0

	for _, d in model:GetDescendants() do
		if d:IsA("BasePart") and d.Transparency < 1 then
			count += 1
			local cf = d.CFrame
			local half = d.Size / 2
			local r, u, l = cf.RightVector, cf.UpVector, cf.LookVector

			local worldHalf = r:Abs() * half.X + u:Abs() * half.Y + l:Abs() * half.Z
			bbMin = bbMin:Min(cf.Position - worldHalf)
			bbMax = bbMax:Max(cf.Position + worldHalf)
		end
	end

	if count == 0 then
		return 0, 0
	end
	local extent = bbMax - bbMin
	return math.max(extent.X, extent.Y, extent.Z), count
end

local changed = 0
local tooSmall = 0
local tooLarge = 0
local noGeometry = 0
local alreadySet = 0

-- Descends the tree looking for the highest eligible model in each branch.
-- When LOD is set on a model, its children are skipped (the parent's LOD
-- mesh already covers their geometry at distance).
local function applyLod(instance: Instance)
	for _, child in instance:GetChildren() do
		local lodApplied = false

		if child:IsA("Model") then
			local maxExt, visCount = visibleExtent(child)

			if visCount == 0 then
				noGeometry += 1
			else
				local isSinglePart = visCount == 1

				if maxExt < MIN_LOD_EXTENT then
					tooSmall += 1
				elseif maxExt > MAX_LOD_EXTENT and not isSinglePart then
					tooLarge += 1
				elseif child.LevelOfDetail == Enum.ModelLevelOfDetail.SLIM then
					alreadySet += 1
					lodApplied = true
				else
					local ok = pcall(function()
						child.LevelOfDetail = Enum.ModelLevelOfDetail.SLIM
					end)
					if ok then
						changed += 1
						lodApplied = true
					end
				end
			end
		end

		-- Only recurse into children if LOD was NOT applied at this level.
		-- A parent's LOD mesh covers all descendant geometry at distance.
		if not lodApplied and (child:IsA("Model") or child:IsA("Folder")) then
			applyLod(child)
		end
	end
end

applyLod(workspace)

return {
	changed = changed,
	alreadySet = alreadySet,
	tooSmall = tooSmall,
	tooLarge = tooLarge,
	noGeometry = noGeometry,
}
```
