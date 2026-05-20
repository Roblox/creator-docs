# SceneAnalysisService Query Output Specifications

Each query has its own method on `SceneAnalysisService`:

```lua
SceneAnalysisService:GetInstanceCompositionAsync()       --> InstanceCompositionResult
SceneAnalysisService:GetScriptMemoryAsync()              --> ScriptMemoryResult
SceneAnalysisService:GetUnparentedInstancesAsync()       --> UnparentedInstancesResult
SceneAnalysisService:GetTriangleCompositionAsync()       --> TriangleCompositionResult
SceneAnalysisService:GetAnimationMemoryAsync()           --> AnimationMemoryResult
SceneAnalysisService:GetAudioMemoryAsync()               --> AudioMemoryResult
```

Every node in every query result is a `ValueTable` with at least a `Name` field. Interior nodes have `Children` (a `ValueArray` of child `ValueTable`s). Leaf nodes have no `Children`. Numeric metrics are always `int`.

---

## InstanceComposition

Counts every Instance under scanned services, categorized by type and grouped by class name.

**Scanned services:** Workspace, Players, Lighting, MaterialService, ReplicatedFirst, ReplicatedStorage, ServerScriptService, ServerStorage, StarterGui, StarterPack, StarterPlayer, Teams, SoundService, TextChatService.

### Tree Structure

```
Root
├── Name: "InstanceComposition"          string
├── Size: <total instance count>         int
└── Children[]
    └── Category
        ├── Name: <category>             string   e.g. "3D Objects", "Scripts", "UI"
        ├── Size: <instances in category> int
        └── Children[]
            └── ClassEntry (leaf)
                ├── Name: <className>    string   e.g. "Part", "Script", "Frame"
                └── Size: <count>        int
```

### Categories

| Category | Representative types |
|---|---|
| 3D Objects | BasePart, Model, Camera |
| Physics | Attachment, Constraint, JointInstance, WeldConstraint, ... |
| UI | GuiBase, BasePlayerGui, UIBase, ProximityPrompt, ClickDetector, TextChannel, ... |
| Lights | Light |
| PostProcessing | PostEffect, Highlight, Atmosphere, Sky, Clouds |
| Scripts | LuaSourceContainer, BindableEvent, RemoteEvent, ... |
| Audio | Sound, SoundEffect, AudioPlayer, Wire, ... |
| Animation | Animator, AnimationController, Animation, KeyframeSequence, IKControl |
| Values | ValueBase |
| Character | CharacterAppearance, Humanoid, HumanoidDescription, BaseWrap, ... |
| Textures | FaceInstance, SurfaceAppearance, MaterialVariant |
| Meshes | DataModelMesh |
| Particles | ParticleEmitter, Fire, Trail, Beam, ... |
| Services & Storage | Player, Folder, Configuration |
| Misc | Tool, Backpack, Team, ForceField, ... |
| Unclassified | Anything not matching the above |

### Example Output

```lua
{
  Name = "InstanceComposition",
  Size = 12450,
  Children = {
    { Name = "3D Objects", Size = 5200, Children = {
        { Name = "Part", Size = 3100 },
        { Name = "MeshPart", Size = 1800 },
        { Name = "Model", Size = 300 },
    }},
    { Name = "UI", Size = 2100, Children = {
        { Name = "Frame", Size = 900 },
        { Name = "TextLabel", Size = 700 },
        { Name = "UIListLayout", Size = 500 },
    }},
    -- ...
  }
}
```

---

## ScriptMemory

Reports per-script Luau VM heap memory, obtained via `ScriptContext::requestRootObjectsMemory`. This query is **async** (the heap walk is deferred to a later frame).

**Requires flags:** `SceneAnalysisServiceEnabled`, `STUDIOPLAT37936`.

### Tree Structure

```
Root
├── Name: "ScriptMemory"                 string
├── Size: <totalVmMemory>               int      total Luau VM memory (bytes)
└── Children[]
    └── ServiceCategory
        ├── Name: <service>              string   e.g. "ServerScriptService", "PlayerScripts"
        ├── Size: <sum of subcategories> int      bytes
        └── Children[]
            ├── ModuleScriptGroup
            │   ├── Name: "ModuleScripts"         string
            │   ├── Size: <sum of modules>       int      bytes
            │   └── Children[]
            │       └── ModuleEntry (leaf)
            │           ├── Name: <dotted path>  string   e.g. "ServerScriptService.Shared.Utils"
            │           └── Size: <bytes>        int
            └── ScriptsGroup
                ├── Name: "Scripts"              string
                ├── Size: <sum of scripts>       int      bytes
                └── Children[]
                    └── ScriptEntry (leaf)
                        ├── Name: <dotted path>  string   e.g. "ServerScriptService.MainScript"
                        └── Size: <bytes>        int
```

### Notes

- Modules are entries whose Instance resolves to a `ModuleScript` via `isA()`.
- Scripts are entries whose Instance resolves to a `Script` or `LocalScript` (`isA("Script")`).
- Entries that don't resolve to a known script Instance in the DataModel are silently dropped.
- The service category is derived from the first segment of the dotted path (before the first `.`).

### Example Output

```lua
{
  Name = "ScriptMemory",
  Size = 8388608,       -- 8 MB total VM memory
  Children = {
    { Name = "ServerScriptService", Size = 524288, Children = {
        { Name = "ModuleScripts", Size = 409600, Children = {
            { Name = "ServerScriptService.Shared.Utils", Size = 204800 },
            { Name = "ServerScriptService.Shared.Config", Size = 204800 },
        }},
        { Name = "Scripts", Size = 114688, Children = {
            { Name = "ServerScriptService.MainScript", Size = 114688 },
        }},
    }},
    { Name = "ReplicatedStorage", Size = 262144, Children = {
        { Name = "ModuleScripts", Size = 262144, Children = {
            { Name = "ReplicatedStorage.SharedModule", Size = 262144 },
        }},
    }},
  }
}
```

---

## UnparentedInstances

Finds Instances held by Luau references that are **not** descendants of the DataModel (i.e. unparented / leaked). Traces GC reference paths to identify the host script responsible.

### Tree Structure

```
Root
├── Name: "UnparentedInstances"          string
├── Size: <total unparented count>       int
└── Children[]
    └── HostScript
        ├── Name: <script path>          string   e.g. "ServerScriptService.Gameplay.Combat"
        │                                         or "(unknown)" if untraceable
        ├── Size: <count from this host>  int
        └── Children[]
            └── ClassEntry (leaf)
                ├── Name: <className>    string   e.g. "Part", "Frame", "Sound"
                └── Size: <count>        int
```

### Notes

- Uses `InstanceBridge::getInstancesHeldByState` to find all Instances referenced by the Luau VM.
- Filters out any Instance that is a descendant of the DataModel (those are normal).
- Performs a full GC heap enumeration (`luaC_enumheap`) and traces backward edges to identify the host script.
- Host script is extracted from the first `LUA_TFUNCTION` chunk name containing an `=` prefix (the `=ScriptPath` convention).

### Example Output

```lua
{
  Name = "UnparentedInstances",
  Size = 47,
  Children = {
    { Name = "ServerScriptService.Gameplay.Combat", Size = 30, Children = {
        { Name = "Part", Size = 22 },
        { Name = "Attachment", Size = 8 },
    }},
    { Name = "(unknown)", Size = 17, Children = {
        { Name = "Frame", Size = 12 },
        { Name = "Sound", Size = 5 },
    }},
  }
}
```

---

## TriangleComposition

Reports GPU triangle and draw call counts by render pass type, sourced from `StatsService::getPerfData()`.

### Tree Structure

```
Root
├── Name: "TriangleComposition"          string
├── Sizes                                ValueTable
│   ├── Triangles: <total triangles>     int
│   └── Drawcalls: <total draw calls>    int
└── Children[]
    └── RenderPassEntry (leaf)
        ├── Name: <pass type>            string
        └── Sizes                        ValueTable
            ├── Triangles: <count>       int
            └── Drawcalls: <count>       int
```

### Render Pass Types

| Name | Description |
|---|---|
| Opaque | Opaque geometry |
| Transparent | Transparent geometry |
| Terrain | Voxel/smooth terrain |
| Grass | Terrain grass decoration |
| UI | Screen-space UI |
| Decal | Decal rendering |
| Cloud | Volumetric clouds |
| GenericPostProcess | Generic post-processing |
| SSAO | Screen-space ambient occlusion |
| DOF | Depth of field |
| Particles | Particle systems |
| Sky | Skybox |
| Shadows | Shadow map rendering |
| Undefined | Uncategorized |

Entries with zero triangles **and** zero draw calls are omitted.

### Example Output

```lua
{
  Name = "TriangleComposition",
  Sizes = { Triangles = 245000, Drawcalls = 1200 },
  Children = {
    { Name = "Opaque",      Sizes = { Triangles = 180000, Drawcalls = 800 } },
    { Name = "Transparent", Sizes = { Triangles = 25000,  Drawcalls = 150 } },
    { Name = "Shadows",     Sizes = { Triangles = 30000,  Drawcalls = 200 } },
    { Name = "UI",          Sizes = { Triangles = 10000,  Drawcalls = 50  } },
  }
}
```

---

## AnimationMemory

Reports loaded `AnimationClip` memory, deduplicated by clip pointer. Every clip entry has `Name = AssetId` and an `Owners` array listing all owning Animators. Out-of-DataModel clips are grouped separately.

### Tree Structure

```
Root
├── Name: "AnimationMemory"              string
├── Size: <total clip bytes>             int
└── Children[]
    ├── ClipEntry
    │   ├── Name: <asset ID>             string
    │   ├── Size: <clip bytes>           int
    │   ├── AssetId: <asset ID>          string
    │   └── Owners[]                     ValueArray
    │       └── OwnerEntry
    │           ├── Name: <owner path>   string
    │           └── ClassName: <class>   string
    │
    └── OutOfDmGroup
        ├── Name: "Not In DataModel"     string
        ├── Size: <sum of clip bytes>    int
        └── Children[]
            └── ClipEntry
                ├── Name: <asset ID>     string
                ├── Size: <clip bytes>   int
                ├── AssetId: <asset ID>  string
                └── Owners[]             ValueArray
                    └── OwnerEntry
                        ├── Name: <owner path>   string
                        └── ClassName: <class>   string
```

### Notes

- Clips are deduplicated by `AnimationClip*` pointer (the animation cache guarantees one clip per asset).
- Walks both the DataModel tree and Luau-held Animator instances (to catch unparented animators).

### Example Output

```lua
{
  Name = "AnimationMemory",
  Size = 1048576,
  Children = {
    { Name = "rbxassetid://111", Size = 32768, AssetId = "rbxassetid://111",
      Owners = {
        { Name = "Workspace.Player.Humanoid.Animator", ClassName = "Animator" },
    }},
    { Name = "rbxassetid://444", Size = 65536, AssetId = "rbxassetid://444",
      Owners = {
        { Name = "Workspace.NPC1.Humanoid.Animator", ClassName = "Animator" },
        { Name = "Workspace.NPC2.Humanoid.Animator", ClassName = "Animator" },
    }},
    { Name = "Not In DataModel", Size = 32768, Children = {
        { Name = "rbxassetid://555", Size = 32768, AssetId = "rbxassetid://555",
          Owners = {
            { Name = "Animator", ClassName = "Animator" },
        }},
    }},
  }
}
```

---

## AudioMemory

Reports loaded audio asset memory, deduplicated by asset ID. Groups by owning Instance's parent path, with special handling for shared assets.

### Tree Structure

**Single-parent assets (all owners share the same parent):**

```
Root
├── Name: "AudioMemory"                  string
├── Size: <total audio bytes>            int
└── Children[]
    ├── ParentGroup (when parent has multiple audio children)
    │   ├── Name: <parent path>          string   e.g. "Workspace.Map.Ambience"
    │   ├── Size: <sum of asset bytes>   int
    │   └── Children[]
    │       └── AssetEntry (leaf)
    │           ├── Name: <full instance path>  string   e.g. "Workspace.Map.Ambience.WindSound"
    │           ├── Size: <bytes>          int
    │           └── AssetId: <asset ID>    string
    │
    ├── FlatAssetEntry (when parent has exactly one audio child)
    │   ├── Name: <full instance path>   string   e.g. "Workspace.Map.Ambience.WindSound"
    │   ├── Size: <bytes>                int
    │   └── AssetId: <asset ID>          string
```

**Shared assets (owners under different parents):**

```
    └── SharedAssetEntry
        ├── Name: <asset ID>             string
        ├── Size: <bytes>                int
        ├── AssetId: <asset ID>          string
        └── Owners[]                     ValueArray
            └── OwnerEntry
                ├── Name: <full path>    string
                └── ClassName: <class>   string   "Sound" or "AudioPlayer"
```

### Notes

- Asset sizes come from `SoundService::getSoundMemoryData()`, which reports in MB (converted to bytes).
- Walks all audio instances from `SoundService::getAudioInstances()` (covers both `Sound` and `AudioPlayer`).
- Assets with no loaded memory data will show `Size = 0`.

### Example Output

```lua
{
  Name = "AudioMemory",
  Size = 5242880,
  Children = {
    { Name = "Workspace.Map.BGMusic", Size = 2097152,
      AssetId = "rbxassetid://111" },
    { Name = "Workspace.Map.SFX", Size = 1048576, Children = {
        { Name = "Workspace.Map.SFX.Explosion", Size = 524288, AssetId = "rbxassetid://222" },
        { Name = "Workspace.Map.SFX.Gunshot",   Size = 524288, AssetId = "rbxassetid://333" },
    }},
    { Name = "rbxassetid://444", Size = 2097152, AssetId = "rbxassetid://444",
      Owners = {
        { Name = "Workspace.Zone1.Ambient", ClassName = "Sound" },
        { Name = "Workspace.Zone2.Ambient", ClassName = "Sound" },
    }},
  }
}
```
