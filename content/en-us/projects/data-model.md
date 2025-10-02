---
title: Data model
description: Explains the hierarchy of objects that describe everything about a place.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/3Q0R1-Xkw9U" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

Every place is represented by a data model, a hierarchy of objects that describe
everything about the place. The data model contains all objects that make up the
3D world, such as parts, terrain, lighting, and other environmental elements. It
also contains objects that can control runtime behavior, such as scripts that
modify properties, call methods and functions, and respond to events that enable
dynamic behavior and interactivity.

The Roblox Engine uses the data model as a source of truth for a place's state,
so it can simulate and render it on client devices. For more information on how
the Roblox Engine interprets the data model, see [Client-Server
Runtime](/projects/client-server).

## Objects

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/FzmFAm00A8g" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

You place and organize objects in the data model to describe a place in Roblox.
Every object in Roblox inherits from the `Class.Instance` class, which defines
generic properties, methods, and events that are common to all objects. Objects
also define their own characteristics depending on the functionality the object
provides. There are many categories of objects with a wide variety of uses, but
you'll frequently work with `Class.BasePart` and `Class.LuaSourceContainer`
objects, commonly referred to as parts and scripts.

For a comprehensive list of all the features of the Roblox Engine, see the
[reference documentation](/reference/engine).

### 3D building blocks

`Class.BasePart` is the core class for physically-simulated 3D building blocks in the world. It defines the properties and methods common to all physical objects with properties like position, size, and orientation.

<table>
<thead>
  <tr>
    <th>Object</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.Part`</td>
    <td>A primitive [part](../parts/index.md) that can take the shape of a block, ball, cylinder, wedge, or corner wedge.</td>
  </tr>
	<tr>
    <td>`Class.MeshPart`</td>
    <td>An imported [mesh](../parts/meshes.md) from 3D modeling software like Maya or Blender.</td>
  </tr>
	<tr>
    <td>`Class.TrussPart`</td>
    <td>A truss beam that characters can climb like a ladder.</td>
  </tr>
</tbody>
</table>

While you can theoretically create a fully functional Roblox experience using
just simple parts, you'll most likely import [meshes](../parts/meshes.md) and combine primitive parts into more complex objects and structures through [solid
modeling](/parts/solid-modeling).

### Scripts

You can add interactivity and behavior to your place's 3D world and define logic
with scripts. You write scripts in the Luau programming language to do things
like moving parts, calling other scripts, and responding to events. Because
Roblox works in a client-server model, you can run scripts on the server,
client, or have them communicate across the network boundary.

- A `Class.Script` object represents a script that can only run on the server.
- A `Class.LocalScript` object represents a script that can only run on the
  client.
- A `Class.ModuleScript` object represents a reusable script that you can
  `Global.LuaGlobals.require()` from both
  server and client scripts.

For scripts to behave properly, you must place them in the correct containers in
the data model. For more information, see the [Server](#server) and [Client](#client) sections.

## Object organization

While you have a lot of flexibility in how you organize your data model, the
Roblox Engine expects certain objects to be in certain **container services**
which are objects that have specific behaviors and can affect the behaviors of
the objects they contain. The main categories of container services include:

- **Workspace** — `Class.Workspace` stores all objects that render in the 3D
  world.
- **Environment** — Containers like `Class.Lighting` and `Class.SoundService`
  that contain objects for environmental settings and elements.
- **Replication** — Containers for content and logic that replicates between the
  server and client, such as `Class.ReplicatedStorage` and
  `Class.ReplicatedFirst`.
- **Server** — Containers for server-side only content and logic, such as
  `Class.ServerScriptService` and `Class.ServerStorage`.
- **Client** — Containers for client-side content and logic, such as
  `Class.StarterPlayer` and `Class.StarterGui`.
- **Chat** — Containers for objects that enable chat features, such as
  `Class.VoiceChatService` and `Class.TextChatService`.

<Alert severity="info">
The Roblox Engine has many more services that provide
built-in functionality that you can call within your scripts. The Roblox Engine
doesn't give these services special treatment in the data model. For more
information, see [services](../scripting/services.md).
</Alert>

In addition, you can further organize your objects with the following objects:

- **Folders** — A `Class.Folder` is for organizational purposes and doesn't
  define any behavior. For example, you can use folders to group similar objects
  like a set of scripts in server storage.
- **Models** — A `Class.Model` is mainly intended for geometric groupings of
  parts, such as grouping together a desk set that includes a chair, table, and
  a lamp. To organize more complex sets, you can even nest models within models.

### Workspace

`Class.Workspace` contains all objects that make up a place's 3D world. You can
add objects to the workspace to customize your 3D world, such as base parts,
mesh parts, and models. Clients render everything that appears in this container
and nothing outside of it, so you can control what users see and interact with
in your place. Although not actually rendered, you can also add scripts that are
parented to the parts and models that they are associated with. By default, the
workspace is pre-populated with a `Class.Terrain` and `Class.Camera` object.

<h4>Camera</h4>

`Class.Camera` determines how the client views the 3D world. By default, there
is one camera in the workspace, but you can add multiple camera objects for
creating different perspectives and views. Every client takes these settings and
creates its own camera view that the server can't directly modify.

For example, you can set a camera to follow user movements or stay fixed in a
particular location. You can also adjust the field of view, distance, and angle
to create different visual effects of how users view your 3D world.

For more information, see [customize the camera](../workspace/camera.md).

<h4>Terrain</h4>

`Class.Terrain` lets you create landscapes for your place. You can apply a
material to the terrain to simulate desired natural environments, such as grass,
water, sand, or a custom material. Though you can only have one terrain object
for your 3D world and apply one material to that terrain, you can use the
[Terrain Editor](../studio/terrain-editor.md) to edit regions of your
terrain.

For more information, see [environmental terrain](../parts/terrain.md).

### Environment

Custom lighting can make your 3D world much more immersive and realistic. The `Class.Lighting` service contains objects that control global lighting settings of your place, such as `Class.Atmosphere` for simulating atmospheric effects or `Class.Sky` to alter the sun, moon, and stars in your environments. In addition, you can use [light sources](../effects/light-sources.md) to emit light from specific objects.

Adding [audio](../audio/index.md) to your experiences is also crucial for elevating your experiences to new heights. By strategically using positional and non-positional audio, you can immerse players into your worlds, provide them useful feedback for their actions, and direct their attention to what they need to do to be successful in their objectives.

### Replication

**Replication** is the process of the server synchronizing the state of your
place with all connected clients. The Roblox Engine intelligently and
automatically replicates data, physics, and chat messages between the server and
client for many cases, but you can also specify certain objects to replicate by
placing them in specific containers.

<h4>ReplicatedFirst</h4>

`Class.ReplicatedFirst` contains objects that you want to replicate to a client
when it joins your place. It typically contains objects that are essential to
initialize a player, such as client-side `Class.LocalScript` objects and the
objects associated with the scripts. All content in this container is replicated
from the server to the client only once.

<h4>ReplicatedStorage</h4>

`Class.ReplicatedStorage` contains objects that are available to both the server
and connected clients. Any changes that occur on the client persist but won't be
replicated to the server. The server can overwrite changes on the client to
maintain consistency. This container is typically used for `Class.ModuleScript`
objects that need to be shared and accessed by both `Class.Script` (server-side)
and `Class.LocalScript` (client-side) objects. In addition, you can use this
container to replicate any objects that don't need to exist in the 3D world
until needed, such as a `Class.ParticleEmitter` for cloning and parenting to all
incoming character models.

For more information on how replication works, see [client-server runtime](../projects/client-server.md).

### Server

The data model defines dedicated containers for server-side only objects that
are never replicated to the client. This allows the server to affect client
behavior and state without exposing the server's objects and logic to the
client.

<Alert severity="info">
You can use remote events and functions to allow
client-side communication with the server.
</Alert>

<h4>ServerScriptService</h4>

`Class.ServerScriptService` contains `Class.Script` objects,
`Class.ModuleScript` objects that are required by server scripts, and other
scripting-related objects that are only meant for server use. If your scripts
require other, non-scripting objects, you must place them in
`Class.ServerStorage`. Scripts in this container are never replicated to
clients, which allows you to have secure, server-side logic.

<h4>ServerStorage</h4>

`Class.ServerStorage` contains objects that are only meant for server use. You
can use this container to store objects that you want to clone and parent to the
workspace or other containers at runtime. For example, you can store large
objects such as maps in this container until they are needed and move them into
the workspace only when required. This lets you decrease client network traffic
on initial join.

<Alert severity="info">
Scripts don't run when they are parented to this
container, but scripts inside `Class.ServerScriptService` can access and run
`Class.ModuleScript` objects in this container.
</Alert>

### Client

The client container services are meant for objects that are replicated to every
connected client. This category of containers replicate to every connected
client and typically contain 3D objects and associated `Class.LocalScript`
objects. All objects you store in these containers are non-persistent across
sessions and reset every time a client rejoins. You can put objects in these
containers such as player GUIs, client-side scripts, and other objects that are
only relevant to the client.

When a client connects to a server, the `Class.Players` container service
listens for users joining your place and creates a `Class.Player` object for
every client. The server copies the objects from the client containers in the
edit data model to the corresponding location in the runtime data model inside
the `Class.Players` object. The following table describes the original container
it resides on in the container and the resulting container they are copied to on
the client:

<table>
<thead>
  <tr>
    <th>Edit data model</th>
    <th>Runtime data model</th>
    <th>Notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.StarterPack`</td>
    <td><code>Player.Backpack</code></td>
    <td>Scripts that set up the player's inventory and generally contain `Class.Tool` objects but often contains local scripts as well.</td>
  </tr>
  <tr>
    <td>`Class.StarterGui`</td>
    <td><code>Player.PlayerGui</code></td>
    <td>Scripts that can manage the player's local GUI. When a player respawns, the contents of PlayerGui are emptied. The server copies the objects inside StarterGui into the PlayerGui.</td>
  </tr>
  <tr>
    <td>`Class.StarterPlayerScripts`</td>
    <td><code>Player.PlayerScripts</code></td>
    <td>General purpose scripts for the client. For example, if you want to create special effects on the client when certain conditions are met, you can place a local script in this container to do that. The server cannot access this container.</td>
  </tr>
  <tr>
    <td>`Class.StarterCharacterScripts`</td>
    <td><code>Player.Character</code></td>
    <td>Scripts that are copied to the client when they spawn. These scripts do not persist when the player respawns.</td>
  </tr>
	<tr>
    <td>`Class.ReplicatedFirst`</td>
    <td></td>
    <td>The contents of this container are replicated to all clients (but not back to the server) first, before anything else.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
For more information on edit and runtime data models, see [client-server runtime](./client-server.md#client).
</Alert>

<Alert severity="warning">
You don't add `Class.Player` objects to the `Class.Players` container
service explicitly.
</Alert>

### Chat

<h4>TextChatService</h4>

`Class.TextChatService` represents the service that handles various,
in-experience text chat tasks, such as managing channels, decorating messages,
filtering text, creating commands, and developing custom chats interfaces.

For more information, see [text chat overview](../chat/in-experience-text-chat.md).

<h4>VoiceChatService</h4>

`Class.VoiceChatService` represents the proximity-based voice chat
feature that simulates realistic communication based on how close you are to
other users. You can use this service to toggle the feature on and off.

For more information, see [voice chat](../chat/voice-chat.md).

## Folders and models

There are two primary methods for grouping objects in the data model:
**folders** and **models**. Both are containers for objects, but they have
different purposes.

- **Folders** are best for storing sections of an environment, such as the lobby or a combat arena.
- **Models** are used for sets of objects, such as a desk set that includes a chair,
  table, and a lamp. To organize more complex sets, nest models inside models.

You should always name your objects descriptively. This makes it easy to
find and modify objects later on if needed.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/explorer/Example-Organized-Folders-In-Workspace.png" alt="The Explorer window with a demonstration of a folder organization structure." width="320" />
    <figcaption>Objects organized into `Class.Folder|Folders`</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/explorer/Example-Maps-In-Workspace-ServerStorage.png" alt="The Explorer window with a demonstration of a model organization structure in several services." width="320" />
    <figcaption>Various "map" models to swap between `Class.Workspace` and `Class.ServerStorage`</figcaption>
  </figure>
</GridContainer>
