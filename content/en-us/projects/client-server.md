---
title: Client-Server Runtime
description: An overview of the client-server model in Roblox.
---

## Server

Roblox experiences are multiplayer by default and run in a client-server model.
The Roblox **server** is the ultimate authority for maintaining the experience's
state, and is responsible for keeping all connected clients in sync with the
server.

<figure>
  <img
    alt="Server with connections to three client devices"
    src="../assets/scripting/client-server/Client-Server-Model.png"
    width="100%" />
  <figcaption>Server with connections to three client devices</figcaption>
</figure>

## Client

When an experience runs, Roblox copies a version of the "edit" data model that
you built and published from Studio and runs it on Roblox servers as the
"runtime" data model.

Connected clients also receive a copy of the runtime data model and any
initialization of the player occurs, such as initializing a player's backpack
(inventory) or local user interface. When an experience has
`Class.Workspace.StreamingEnabled` set to true, the server initially only sends
a subset of content under `Class.Workspace` that is closest to the client. The
client then renders the 3D world and begins running any
applicable scripts.

<figure>
  <img
    alt="Mapping of objects between 'edit' and 'runtime' data models"
    src="../assets/scripting/client-server/Data-Model-Mapping.png"
    width="720" />
  <figcaption></figcaption>
</figure>

## Replication

The server constantly updates connected clients, keeping everything in sync
across the server and clients through a process called **replication**, which
synchronizes the data model, physics simulation, and chat messages. Replication
logic exists on both the client and server to ensure synchronization.

### Data

Data model changes can occur in a variety of cases, such as when something in the 3D
world is created or a property of the 3D world changes. This typically occurs
when a script on the server or client makes a change that needs to be reflected
on the other side of the client-server boundary. The following diagrams show
common scenarios for data replication.

<GridContainer numColumns="3">
<figure>
<p><center>**Client** &rarr; **Server**</center></p>
<img src="../assets/scripting/client-server/Remote-Flow-Client-Server.png" width="100%" alt="Diagram of one client communicating with the server" />
Communication from any client to the server. For example, a client presses the <kbd>P</kbd> key to drink an invisibility potion, and tells the server to make that player's character invisible to all other players.
</figure>
<figure>
<p><center>**Server** &rarr; **Client**</center></p>
<img src="../assets/scripting/client-server/Remote-Flow-Server-Client.png" width="100%" alt="Diagram of the server communicating with one client" />
Communication from the server to one specific client. For example, a player joins the experience and the server populates that player's inventory with a set of items.
</figure>
<figure>
<p><center>**Server** &rarr; **All Clients**</center></p>
<img src="../assets/scripting/client-server/Remote-Flow-Server-All-Clients.png" width="100%" alt="Diagram of the server communicating with all connected clients" />
Communication between the server and all connected clients. For example, displaying a countdown timer to all participants in a race.
</figure>
</GridContainer>

### Physics

Roblox uses a rigid body physics engine, which is responsible for
calculating the movement and interactions of parts in the 3D world. By default,
all parts in Roblox are rigid bodies and participate in simulated physics,
unless otherwise specified. You can also group multiple parts together into
assemblies, which the physics engine treats as a single rigid body.

<br/>
<Grid container spacing={2}>
  <Grid item xs={4} lg={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Block.png" width="100%" />
    <figcaption>1&nbsp;assembly; 1&nbsp;part</figcaption>
  </Grid>
  <Grid item xs={4} lg={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Avatar.png" width="100%" />
    <figcaption>1&nbsp;assembly; 18&nbsp;parts</figcaption>
  </Grid>
  <Grid item xs={8} lg={6}>
    <img src="../assets/physics/assemblies/Assembly-Example-Ship.png" width="100%" />
    <figcaption>1&nbsp;assembly; 179&nbsp;parts</figcaption>
  </Grid>
</Grid>
<br/>

Roblox replicates physics simulation data between the server and clients when
necessary. To assist with simulation performance, Roblox can assign ownership of
assemblies to a specific client or server. This means that the client or server
can be responsible for simulating the physics of that assembly. Other clients
receive updates about the assembly's position and movement from the owning
client or server. Ownership typically happens automatically, but you can assign
it directly for fine-tuned responsiveness.

<figure>
  <video src="../assets/physics/network-ownership/Visualization-Demo.mp4" controls width="90%" alt="Video showing part ownership indicated through colored outlines"></video>
  <figcaption>Part ownership indicated through colored outlines</figcaption>
</figure>

### Chat

Roblox replicates chat messages between the server and client. The server is
responsible for filtering chat messages and deciding which messages to replicate
to other clients. For example, the server may filter out messages that contain
profanity or are too long.

<video src="../assets/players/in-experience-text-chat/Player-Conversation-Bubbles.mp4" controls width="90%"></video>
