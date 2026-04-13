---
title: Script capabilities
description: Script capabilities let you control which actions scripts can perform.
---

<Alert severity="success">
Script capabilities are experimental and available as a client beta.
</Alert>

**Script capabilities** let you control which actions scripts can perform inside the `Class.DataModel` subtree. Rather than the default "all-or-nothing system," you can set a script to only be able to access certain categories, such as audio, physics, data stores, and more.

- This system lets you limit what models taken from the toolbox can do and makes it easier to include user-generated content inside the game.
- It can also help ensure better security of games that allow players to run their own code, which is often executed in a restricted or emulated environment.
- It can also be used to share libraries that restrict what they can do themselves. For example, a library providing additional math methods can be restricted to the smallest set of capabilities it needs so that other developers using that library don't have to validate the entire codebase to make sure it doesn't include malicious code.

## Enable script capabilities

To enable this feature, change the `Class.Workspace.SandboxedInstanceMode|SandboxedInstanceMode` property from `Default` to `Experimental` in the **Explorer** and **Properties** window.

## Sandboxed container

Script capabilities introduces a concept of a **sandboxed container**. `Class.Model|Models`, `Class.Folder|Folders`, `Class.Script|Scripts`, or descendants of any of those classes have a `Class.Instance.Sandboxed|Sandboxed` property available in the **Properties** window.

<img src="../assets/studio/properties/Folder-Sandboxed.png" width="320" alt="Sandboxed property of a Folder in the Properties window." />

Enabling the `Class.Instance.Sandboxed|Sandboxed` property designates the instance as a sandboxed container inside the `Class.DataModel` tree, which limits the actions that the scripts inside that container can perform based on the set of values in the `Class.Instance.Capabilities|Capabilities` property.

## Capabilities

The `Capabilities` property is a set of values that control different aspects of execution. Capabilities fall into the following broad categories:

- **Execution control** - Specifies if a script can run on client or server
- **Instance access control** - Specifies which `Class.DataModel` parts a script can interact with
- **Script functionality control** - Specifies which Luau functions scripts can call
- **Engine API access control** - Specifies which parts of the Roblox Engine API can be used

When a script attempts to perform an action that is not in the set of capabilities, Roblox reports an error. Errors typically include the action being attempted, the target of an action, and the first capability that is missing:

```text
The current thread cannot modify 'Workspace' (lacking capability AccessOutsideWrite)
The current thread cannot call 'Clone' (lacking capability CreateInstances)
The current thread cannot call 'GetSecret' (lacking capability Network)
```

### Execution control

Two capabilities handle execution control:

- **RunClientScript** - `Class.LocalScript` or `Class.Script` with a `Class.BaseScript.RunContext|RunContext` value of `Enum.RunContext.Client|Client` is allowed to execute on the client
- **RunServerScript** - `Class.Script` with a `Class.BaseScript.RunContext|RunContext` value of `Enum.RunContext.Server|Server` is allowed to execute on the server

If the script is `Class.BaseScript.Enabled|Enabled`, but the capability corresponding to the location it attempts to start in is not available, a warning message is displayed in the **Output** window. If a script wasn't supposed to run in that context, disable or delete it.

Note that `Class.ModuleScript|ModuleScripts` do not need to have these execution capabilities to be required.

When a script fails to start because the execution control capability is missing, it is reported as a warning in the output, for example:

```text
Cannot start server script 'Script' (lacking capability RunServerScript)
```

### Instance access control

A single capability handles instance access control:

- **AccessOutsideWrite** - Script is allowed to fetch and receive instances from outside the sandboxed container

When the capability is not available, the script can only look up instances that are inside its own sandboxed container. For example, if the script is placed directly in the sandboxed container, `script.Parent.Parent` returns `nil`.

Additionally, any Roblox API event that passes in an `Class.Instance` instead passes in `nil` for any `Class.Instance` outside the sandboxed container. For example, if the `Class.BasePart.Touched` is signaled by a touch from an instance outside the sandboxed container, the event is still received, but the argument is `nil`.

Avoid setting this capability; sandboxing guarantees are weaker when scripts can interact with any instance in a game.

#### Access to services

Even without **AccessOutsideWrite**, scripts in the sandboxed container can still access `game`, `workspace`, and services. This access is provided so that scripts can still call useful methods of those globals, like `Class.DataModel.GetService`, but access to their child instances is still validated.

#### Internally passed instances

If an instance is passed through a function call that doesn't go through Roblox APIs, the reference is preserved. However, if a `Class.ModuleScript` is passed in this way, it can't be required without **AccessOutsideWrite**. This is because the return of the `Class.ModuleScript` is often mutable and can be modified by a script in a sandboxed container.

### Script functionality control

This set of capabilities controls some general aspects of scripts:

- **CreateInstances** - Script can create new instances using `Datatype.Instance.new`, `Datatype.Instance.fromExisting`, or `Class.Instance:Clone`
- **LoadString** - Script is allowed to call `Global.LuaGlobals.loadstring`
- **LoadUnownedAsset** - Script is allowed to call `Global.LuaGlobals.require` with an asset ID or `Class.AssetService:LoadAssetAsync`
- **ScriptGlobals** - Script has `Global.LuaGlobals.shared` and `Global.LuaGlobals._G` available

Keep in mind that default function restrictions still apply. Even if **LoadString** is enabled, the game still has to enable it in `Class.ServerScriptService`, and it is still only available on the server.

To create new instances, aside from **CreateInstances**, an additional Engine API capability providing access to that instance is required.

### Engine API access control

This last group of capabilities controls script access to various Engine APIs:

- **Animation** - Access to instances related to animations
- **AssetCreateUpdate** - Access to Engine APIs related to creating or updating assets
- **AssetManagement** - Access to Engine APIs related to operations on assets that are not read, create, or update
- **AssetRead** - Access to Engine APIs related to getting information about assets
- **Audio** - Access to instances related to audio APIs
- **AvatarAppearance** - Access to instances related to the visual elements of avatars
- **AvatarBehavior** - Access to Engine APIs related to controlling or modifying the humanoid
- **Basic** - Access to general APIs that offer little risk
- **CSG** - Access to instances and functions related to constructive solid geometry (CSG)
- **CapabilityControl** - Access to modifying the `Sandboxed` and `Capabilities` properties of instances
- **Capture** -  Access to Engine APIs related to capturing screenshots or videos on the user's screen
- **Chat** - Access to instances related to in-game chat
- **Consequences** - Access to APIs for punishing users (kicks or bans)
- **DataStore** - Access to data store and memory store APIs
- **DynamicGeneration** - Access to Engine APIs related to dynamically modifying assets
- **Environment** - Access to instances related to the control of how the environment is displayed
- **Groups** - Access to Engine APIs relating to groups/communities
- **Input** - Access to instances related to user input
- **LegacySound** - Access to Engine APIs related to sound that will be deprecated
- **LoadOwnedAsset** - Access to Engine APIs for loading assets that are owned by you, shared to you, owned by Roblox, or are a benign asset type
- **Logging** - Access to the logs API
- **Material** - Access to Engine APIs related to materials
- **Monetization** - Access to Engine APIs related to monetizing a game, excluding most `PromptPurchases`
- **Network** - Access to HTTP networking APIs
- **Physics** - Access to instances related to physics
- **PlatformAvatarEditing** - Access to Engine APIs related to creating or updating avatars, or APIs to aid with that
- **Players** - Access to Engine APIs related to the `Class.Player` class or that return/interact with `Class.Players.LocalPlayer`
- **PromptExternalPurchase** - Allows access to Engine APIs related to prompting purchase of arbitrary assets
- **RemoteEvent** - Access to instances for internal networking operations
- **SensitiveInput** - Access to Engine APIs related to capturing sensitive input from the user, i.e. high-privacy hardware sensors.
- **ServerCommunication** - Access to Engine APIs related to cross-server communication, such as `Class.MessagingService`
- **Social** - Access to Engine APIs related to social features, such as friends and invites
- **Teleport** - Access to Engine APIs related to teleporting
- **UI** - Access to instances related to user interfaces

The capabilities of each class, property, method, and event are displayed in the [Engine API reference](../reference/engine). For example, `Class.Player:GetFriendsOnlineAsync()` requires the `Player` and `Social` capabilities.

Several `Class.HttpService` methods are available without any capabilities aside from being able to execute the scripts:

- `Class.HttpService:JSONDecode()`
- `Class.HttpService:JSONEncode()`
- `Class.HttpService:GenerateGUID()`

If an instance property or method is accessed without a required capability, an error is reported describing the missing capability.

Finally, capabilities do not cover every instance in the Roblox Engine today. Instances not listed in this section or the following one are not available for interaction from a sandboxed container and throw an error saying that an **Unassigned** capability is not available to the current script.

An additional limitation is that `Global.LuaGlobals.getfenv` and `Global.LuaGlobals.setfenv` functions are not available for scripts in a sandboxed container.

Only script access to instances is limited. The instances themselves can still exist and operate by themselves inside a sandboxed container. Lights still shine, user interfaces are still visible, and audio setups that are already wired play sounds.

## Interactions between containers

### Nested containers

When one sandboxed container is nested inside another one, the instances of the inner container are accessible to the outer one.

Capabilities of the inner container are limited by the capabilities of the outer one.
For example, if the outer container has capabilities of **Basic**, **Audio** and **CSG**, while the inner container has **Basic** and **Network**, only **Basic** capabilities are available to the inner container at runtime.

If there are no capabilities in common between the inner and outer containers, the resulting capability set is empty.

### Bindable functions and events

`Class.BindableEvent` and `Class.BindableFunction` provide the best way to communicate with the container or allow it to run callbacks with capabilities it itself is not allowed to use directly.

When an event is fired or a function is invoked, connections are executed in the context of the function that registered them. This means that if the event or function callback is registered by the sandboxed container, it is called with the capabilities of that container. If the callback is registered by the code outside, when sandboxed container scripts invoke them, they execute your functions with capabilities available to your functions.

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

This means that a sandboxed container with **AccessOutsideWrite** cannot just re-parent a script inside itself to outside and get more capabilities.
