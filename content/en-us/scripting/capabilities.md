---
title: Script capabilities
description: Script Capabilities is a system that controls which actions scripts can perform.
---

<Alert severity="success">
This page describes a feature that is still experimental and is available as a client beta. Features described here might undergo additional changes based on developer feedback and/or bug fixes.
</Alert>

**Script capabilities** is a system that offers control over actions that scripts can perform inside the `Class.DataModel` subtree. It provides better control over experience scripts rather than being an "all or nothing" system where any script can do anything that other scripts can.

- This system lets you limit what models taken from the toolbox can do and makes it easier to include user-generated content inside the experience, even those that contain scripts.
- It can also help ensure better security of experiences that allow players to run their own code, which is often executed in a restricted or emulated environment.
- It can also be used to share libraries that restrict what they can do themselves. For example, a library providing additional math methods can be restricted to the smallest set of capabilities it needs so that other developers using that library don't have to validate the entire codebase to make sure it doesn't include malicious code.

## Enable script capabilities

To enable this feature, change the `Class.Workspace.SandboxedInstanceMode|SandboxedInstanceMode` setting from `Default` to `Experimental` in the **Explorer**.

When the client beta test is completed, this step will no longer be required.

## Sandboxed container

This system introduces a concept of a **sandboxed container**.
An instance of type `Class.Model`, `Class.Folder`, `Class.Script`, or descendants of any of those classes have a `Class.Instance.Sandboxed|Sandboxed` property available in the Studio **Properties** window, under the **Permissions** section.

<img src="../assets/studio/properties/Folder-Sandboxed.png" width="320" alt="Sandboxed property of a Folder in the Properties window." />

Enabling the `Class.Instance.Sandboxed|Sandboxed` property designates the instance as a sandboxed container inside the `Class.DataModel` tree, which limits the actions that the scripts inside that container can perform based on the set of values in the `Class.Instance.Capabilities|Capabilities` property.

## Capabilities

The `Capabilities` property is a set of values that control different aspects of execution, split into four groups:

- **Execution control** - Specifies if a script can run on client or server
- **Instance access control** - Specifies which `Class.DataModel` parts a script can interact with
- **Script functionality control** - Specifies which Luau functions scripts can call
- **Engine API access control** - Specifies which parts of the Roblox Engine API can be used

When a script attempts to perform an action that is not in the set of capabilities for the current execution state, an error is reported. Errors typically include the action being attempted, the target of an action, and the first capability that is missing, for example:

```text
The current thread cannot modify 'Workspace' (lacking capability AccessOutsideWrite)

The current thread cannot call 'Clone' (lacking capability CreateInstances)

The current thread cannot call 'GetSecret' (lacking capability Network)
```

### Execution control

This set includes two capabilities:

- **RunClientScript** - `Class.LocalScript` or `Class.Script` with a `Class.BaseScript.RunContext|RunContext` value of `Enum.RunContext.Client|Client` is allowed to execute on the client
- **RunServerScript** - `Class.Script` with a `Class.BaseScript.RunContext|RunContext` value of `Enum.RunContext.Server|Server`  is allowed to execute on the server

If the script is `Class.BaseScript.Enabled|Enabled`, but the capability corresponding to the location it attempts to start in is not available, a warning message is displayed in the **Output** window. If a script wasn't supposed to run in that context, disable or delete it.

Note that `Class.ModuleScript|ModuleScripts` are not required to have these execution capabilities to be required.

When a script fails to start because the execution control capability is missing, it is reported as a warning in the output, for example:

```text
Cannot start server script 'Script' (lacking capability RunServerScript)
```

### Instance access control

This set includes only a single capability:

- **AccessOutsideWrite** - Script is allowed to fetch and receive instances from outside the sandboxed container

When the capability is not available, the script can only look up instances that are inside its own sandboxed container. For example, if the script is placed directly in the sandboxed container, `script.Parent.Parent` returns `nil`.

Additionally, any Roblox API event that passes in an `Class.Instance` instead passes in `nil` for any `Class.Instance` outside the sandboxed container. For example, if the `Class.BasePart.Touched` is signalled by a touch from an instance outside the sandboxed container, the event is still received, but the argument is `nil`.

Avoid setting this capability; sandboxing guarantees are weaker when scripts can interact with any instance in an experience.

#### Access to services

Even without **AccessOutsideWrite**, scripts in the sandboxed container can still access to `game`, `workspace`, and services. This access is provided so that scripts can still call useful methods of those globals, like `Class.DataModel.GetService`, but access to their child instances is still validated.

#### Internally passed instances

If an instance is passed through a function call that doesn't go through Roblox APIs, the reference is preserved. However, if a `Class.ModuleScript` is passed in this way, it can't be required without **AccessOutsideWrite**. This is because the return of the `Class.ModuleScript` is often mutable and can be modified by a script in a sandboxed container.

### Script functionality control

This set of capabilities controls some general aspects of scripts:

- **AssetRequire** - Script is allowed to call `Global.LuaGlobals.require` with an asset ID
- **LoadString** - Script is allowed to call `Global.LuaGlobals.loadstring`
- **ScriptGlobals** - Script has `Global.LuaGlobals.shared` and `Global.LuaGlobals._G` available
- **CreateInstances** - Script can create new instances using `Datatype.Instance.new`, `Datatype.Instance.fromExisting`, or `Class.Instance:Clone`

Keep in mind that default function restrictions still apply. Even if **LoadString** is enabled, the experience still has to turn enable it in `Class.ServerScriptService`, and it is still only available on the server.

To create new instances, aside from **CreateInstances**, an additional Engine API capability providing access to that instance is required.

### Engine API access control

This last group of capabilities controls script access to various Engine APIs:

- **Basic** - Access to simple instances and essential building blocks
- **Audio** - Access to instances related to audio APIs
- **DataStore** - Access to data store and memory store APIs
- **Network** - Access to HTTP networking APIs
- **Physics** - Access to instances related to physics
- **UI** - Access to instances related to user interfaces
- **CSG**: access to instances and functions related to constructive solid geometry (CSG)
- **Chat**: access to instances related to in-experience chat
- **Animation**: access to instances related to animations
- **Avatar**: access to instances related to avatars
- **Input**: access to instances related to user input
- **Environment**: access to instances related to the control of how the environment is displayed
- **RemoteEvent**: access to instances for internal networking operations

There are also instances that are available without any capabilities aside from being able to execute the scripts. These include the following `Class.HttpService` methods:

- `Class.HttpService:JSONDecode()`
- `Class.HttpService:JSONEncode()`
- `Class.HttpService:GenerateGUID()`

If an instance property or method is accessed without a required capability, an error is reported describing the missing capability.

Finally, capabilities do not cover every instance in the Roblox Engine today. Instances not listed in this section or the following one are not available for interaction from a sandboxed container and throw an error saying that an **Unassigned** capability is not available to the current script.

An additional limitation is that `Global.LuaGlobals.getfenv` and `Global.LuaGlobals.setfenv` functions are not available for scripts in a sandboxed container.

Only script access to instances is limited. The instances themselves can still exist and operate by themselves inside a sandboxed container. Lights still shine, user interfaces are still visible, and audio setups that are already wired play sounds.

#### Engine API capability assignments

<Alert severity="success">
This feature is currently in the experimental stage, so the assignments of the APIs are not final. The capability of each instance is displayed on the documentation page for that instance.
</Alert>

Here is the list of instances and methods (if different from the instance capability) for each Engine API capability:

- **Basic**
  - `Class.Attachment`
  - `Class.Beam`, `Class.ParticleEmitter`, `Class.Smoke`, `Class.Sparkles`, `Class.Trail`
  - `Class.SurfaceAppearance`, `Class.Decal`, `Class.FaceInstance`, `Class.Texture`
  - `Class.Light`, `Class.PointLight`, `Class.SpotLight`
  - `Class.Part`, `Class.MeshPart`, `Class.CornerWedgePart`, `Class.TriangleMeshPart`, `Class.TrussPart`, `Class.WedgePart`
  - `Class.FloatCurve`, `Class.RotationCurve`, `Class.EulerRotationCurve`, `Class.Vector3Curve`
  - `Class.Tween`, `Class.TweenService`
  - `Class.Wire`
  - `Class.WorldModel`
  - `Class.CollectionService`, `Class.Debris`, `Class.RunService`

- **Audio**
  - `Class.AudioAnalyzer`, `Class.AudioChorus`, `Class.AudioCompressor`, `Class.AudioDistortion`, `Class.AudioEcho`, `Class.AudioEqualizer`, `Class.AudioFader`, `Class.AudioFader`, `Class.AudioFilter`, `Class.AudioFlanger`, `Class.AudioLimiter`, `Class.AudioPitchShifter`, `Class.AudioReverb`
  - `Class.AudioEmitter`, `Class.AudioPlayer`
  - `Class.AudioDeviceOutput`, `Class.AudioListener`

- **DataStore**
  - `Class.DataStore`, `Class.OrderedDataStore`, `Class.GlobalDataStore`
  - `Class.DataStoreService`, `Class.MemoryStoreService`
  - `Class.DataStoreGetOptions`, `Class.DataStoreIncrementOptions`, `Class.DataStoreInfo`, `Class.DataStoreKey`, `Class.DataStoreKeyInfo`, `Class.DataStoreObjectVersionInfo`, `Class.DataStoreOptions`, `Class.DataStoreSetOptions`
  - `Class.MemoryStoreHashMap`, `Class.MemoryStoreQueue`, `Class.MemoryStoreSortedMap`

- **Network**
  - `Class.HttpService:GetAsync`, `Class.HttpService:RequestAsync`, `Class.HttpService:PostAsync`, `Class.HttpService:UrlEncode`, `Class.HttpService:GetSecret`

- **Physics**
  - `Class.AlignOrientation`, `Class.AlignPosition`, `Class.DynamicRotate`
  - `Class.JointInstance`, `Class.Motor`, `Class.Motor6D`
  - `Class.AngularVelocity`, `Class.LinearVelocity`, `Class.LineForce`, `Class.Torque`, `Class.VectorForce`
  - `Class.Weld`
  - `Class.Constraint`, `Class.BallSocketConstraint`, `Class.CylindricalConstraint`, `Class.HingeConstraint`, `Class.NoCollisionConstraint`, `Class.PlaneConstraint`, `Class.PrismaticConstraint`, `Class.RigidConstraint`, `Class.RodConstraint`, `Class.RopeConstraint`, `Class.SlidingBallConstraint`, `Class.SpringConstraint`, `Class.TorsionSpringConstraint`, `Class.UniversalConstraint`, `Class.WeldConstraint`

- **UI**
  - `Class.BasePlayerGui`, `Class.PlayerGui`, `Class.BillboardGui`, `Class.GuiBase`, `Class.GuiBase2d`, `Class.GuiBase3d`, `Class.LayerCollector`, `Class.ScreenGui`, `Class.SurfaceGui`, `Class.SurfaceGuiBase`, `Class.UIBase`
  - `Class.CanvasGroup`, `Class.Frame`, `Class.ScrollingFrame`
  - `Class.GuiButton`, `Class.GuiLabel`, `Class.GuiObject`, `Class.ImageButton`, `Class.ImageLabel`
  - `Class.Dialog`, `Class.DialogChoice`, `Class.ProximityPrompt`
  - `Class.TextBox`, `Class.TextButton`, `Class.TextFilterResult`, `Class.TextFilterTranslatedResult`, `Class.TextLabel`, `Class.TextService`, `Class.GetTextBoundsParams`
  - `Class.Path2D`
  - `Class.UIComponent`, `Class.UICorner`, `Class.UIDragDetector`, `Class.UIFlexItem`, `Class.UIGradient`, `Class.UIGridLayout`, `Class.UIGridStyleLayout`, `Class.UILayout`, `Class.UIListLayout`, `Class.UIPadding`, `Class.UIPageLayout`, `Class.UIScale`, `Class.UIStroke`, `Class.UITableLayout`
  - `Class.UIConstraint`, `Class.UIAspectRatioConstraint`, `Class.UISizeConstraint`, `Class.UITextSizeConstraint`
  - `Class.VideoFrame`, `Class.ViewportFrame`

- **CSG**
  - `Class.GeometryService`
  - `Class.BasePart` methods: `Class.BasePart:IntersectAsync`, `Class.BasePart:SubtractAsync`, `Class.BasePart:UnionAsync`
  - `Class.IntersectOperation` (also requires **Basic**), `Class.NegateOperation` (also requires **Basic**), `Class.PartOperation` (also requires **Basic**), `Class.UnionOperation` (also requires **Basic**)

- **Chat**
  - `Class.BubbleChatConfiguration`, `Class.BubbleChatMessageProperties`
  - `Class.ChannelTabsConfiguration`
  - `Class.ChatInputBarConfiguration`, `Class.ChatWindowConfiguration`, `Class.ChatWindowMessageProperties`
  - `Class.TextChannel`, `Class.TextChatCommand`, `Class.TextChatConfigurations`, `Class.TextChatMessage`, `Class.TextChatMessageProperties`, `Class.TextChatService`, `Class.TextSource`

- **Animation**
  - `Class.Bone` (also requires **Basic**)
  - `Class.Animation`, `Class.AnimationClip`, `Class.AnimationClipProvider`, `Class.AnimationController`, `Class.AnimationRigData`, `Class.AnimationTrack`, `Class.Animator`
  - `Class.CurveAnimation`
  - `Class.FaceControls`, `Class.IKControl`
  - `Class.Keyframe`, `Class.KeyframeMarker`, `Class.KeyframeSequence`
  - `Class.MarkerCurve`
  - `Class.PoseBase`, `Class.Pose`, `Class.NumberPose`

- **Avatar**
  - `Class.Accessory`, `Class.AccessoryDescription`
  - `Class.Accoutrement`, `Class.Clothing`, `Class.Shirt`, `Class.Pants`
  - `Class.BaseWrap`, `Class.WrapDeformer`, `Class.WrapLayer`, `Class.WrapTarget`
  - `Class.BodyColors`, `Class.BodyPartDescription`, `Class.CharacterAppearance`, `Class.ShirtGraphic`
  - `Class.CharacterMesh`
  - `Class.Humanoid`, `Class.HumanoidDescription`

- **Input**
  - `Class.GamepadService`, `Class.KeyboardService`, `Class.MouseService`
  - `Class.ContextActionService`, `Class.TouchInputService`, `Class.UserInputService`
  - `Class.InputObject`, `Class.Mouse`, `Class.PlayerMouse`

- **Environment**
  - `Class.Atmosphere`, `Class.Clouds`, `Class.Lighting`, `Class.Sky`
  - `Class.BloomEffect`, `Class.BlurEffect`, `Class.ColorCorrectionEffect`, `Class.ColorGradingEffect`, `Class.DepthOfFieldEffect`, `Class.PostEffect`, `Class.SunRaysEffect`

- **RemoteEvent**
  - `Class.BaseRemoteEvent`, `Class.RemoteEvent`, `Class.UnreliableRemoteEvent`
  - `Class.RemoteFunction`

## Interactions between containers

### Nested containers

When one sandboxed container is nested inside another one, the instances of the inner container are accessible to the outer one.

Capabilities of the inner container are limited by the capabilities of the outer one.
For example, if the outer container has capabilities of **Basic**, **Audio** and **CSG**, while the inner container has **Basic** and **Network**, only **Basic** capabilities are available to the inner container at runtime.

If there are no capabilities in common between the inner and outer containers, the resulting capability set is empty.

### Bindable functions and events

`Class.BindableEvent` and `Class.BindableFunction` provide the best way to communicate with the container or allow it to run callbacks with capabilities it itself is not allowed to use directly.

When an event or a function is fired, connections are executed in the context of the function that registered them. This means that if the event or function callback is registered by the sandboxed container, it is called with the capabilities of that container. If the callback is registered by the code outside, when sandboxed container scripts invoke them, they execute your functions with capabilities available to your functions.

It is important to note that even with the **AccessOutsideWrite** capability, scripts in sandboxed containers cannot invoke events or functions outside their containers if they have a larger capability set than the container itself.

### Module require

Inner `Class.ModuleScript|ModuleScripts` can be required by the sandboxed container as usual.
However, if the target instance is outside the container, the `Class.ModuleScript` can only be required if the capability set that is available to it is smaller or equal to the capabilities available to the container.

This limitation does not apply to **RunClientScript** and **RunServerScript** capabilities. If the `Class.ModuleScript` is placed in a container with only **RunClientScript** but is required from a script that has the **RunServerScript** capability, it is allowed to succeed and run those functions on the server.

### Directly called functions

If a `Class.ModuleScript` in a sandboxed container is required from outside the container, some of the protections are not available. In particular, the target function is able to access all instances available to the caller. If the caller is not in a sandboxed container, the call acts as if **AccessOutsideWrite** is available to it.

Other capability restrictions still apply. If you have a **DataStore** access capability, but the target module does not, it is unable to call `Class.DataStore` methods. However, if you pass your own function working with `Class.DataStore`, the target can run it during that call.
If the target schedules a thread using methods like those from `Library.task`, those threads lose the ability to call that function.

Instances can be passed to the target module or assigned to the module fields.

If required, it is recommended to assign table members using `Global.LuaGlobals.rawset` to avoid running `__index`/`__newindex` metamethods that might be set on the table.

The overall recommendation is to communicate with `Class.BindableEvent` and `Class.BindableFunction` whenever possible.

### Movement of instances

Most instances do not have restrictions on movement between containers. Script instances, however, can only be moved into a container that has the same set of capabilities or a subset of those capabilities.

This means that sandboxed container with **AccessOutsideWrite** cannot just re-parent a script inside itself to outside and get more capabilities.
