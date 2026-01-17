---
title: Client-server runtime
description: An overview of the client-server model in Roblox.
---

## Server

Roblox experiences are multiplayer by default and run in a client-server model.
The Roblox **server** is the ultimate authority for maintaining the experience's
state, and is responsible for keeping all connected clients in sync with the
server.

<figure>
  <img
    alt="A server grouping with connections to three client devices."
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
    alt="A diagram that maps objects between 'edit' and 'runtime' data models."
    src="../assets/scripting/client-server/Data-Model-Mapping.png"
    width="720" />
  <figcaption></figcaption>
</figure>

## Replication

The server constantly updates connected clients, keeping everything in sync
across the server and clients through a process called **replication**, which
synchronizes the data model, physics simulation, and chat messages. Replication
logic exists on both the client and server to ensure synchronization.

<Tabs>
<TabItem label="Data">
Data model changes can occur in a variety of cases, such as when something in the 3D
world is created or a property of the 3D world changes. This typically occurs
when a script on the server or client makes a change that needs to be reflected
on the other side of the client-server boundary. The following diagrams show
common scenarios for data replication.

<GridContainer numColumns="3">
<figure>
<Chip label="Client &rarr; Server" size="large" color="primaryBrand" variant="outlined"
style={{fontSize:"110%", width:"100%"}}/><br /><br />
<img src="../assets/scripting/client-server/Remote-Flow-Client-Server.png" width="100%" alt="A diagram of one client communicating with the server." />
<figcaption>Communication from any client to the server. For example, a client presses the <kbd>P</kbd> key to drink an invisibility potion, and tells the server to make that player's character invisible to all other players.</figcaption>
</figure>
<figure>
<Chip label="Server &rarr; Client" size="large" color="success" variant="outlined"
style={{fontSize:"110%", width:"100%"}}/><br /><br />
<img src="../assets/scripting/client-server/Remote-Flow-Server-Client.png" width="100%" alt="A diagram of the server communicating with one client." />
<figcaption>Communication from the server to one specific client. For example, a player joins the experience and the server populates that player's inventory with a set of items.</figcaption>
</figure>
<figure>
<Chip label="Server &rarr; All Clients" size="large" color="secondary" variant="outlined"
style={{fontSize:"110%", width:"100%"}}/><br /><br />
<img src="../assets/scripting/client-server/Remote-Flow-Server-All-Clients.png" width="100%" alt="A diagram of the server communicating with all connected clients." />
<figcaption>Communication between the server and all connected clients. For example, displaying a countdown timer to all participants in a race.</figcaption>
</figure>
</GridContainer>
</TabItem>
<TabItem label="Physics">
Roblox uses a rigid body physics engine, which is responsible for
calculating the movement and interactions of parts in the 3D world. By default,
all parts in Roblox are rigid bodies and participate in simulated physics,
unless otherwise specified. You can also group multiple parts together into
assemblies, which the physics engine treats as a single rigid body.

<br/>
<Grid container spacing={0}>
  <Grid item XSmall={4} XLarge={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Block.png" alt="A single block part in the shape of a cube that represents a single assembly." width="100%" />
    <figcaption>1&nbsp;assembly; 1&nbsp;part</figcaption>
  </Grid>
  <Grid item XSmall={4} XLarge={3}>
    <img src="../assets/physics/assemblies/Assembly-Example-Avatar.png" alt="A player character that represents a single assembly of 18 individual parts." width="100%" />
    <figcaption>1&nbsp;assembly; 18&nbsp;parts</figcaption>
  </Grid>
  <Grid item XSmall={8} XLarge={6}>
    <img src="../assets/physics/assemblies/Assembly-Example-Ship.png" alt="A pirate ship mesh that represents a single assembly of 179 individual parts." width="100%" />
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
  <video src="../assets/physics/network-ownership/Visualization-Demo.mp4" controls width="90%" alt="A player character walks around collecting glowing objects on the floor. Part ownership is indicated with colored outlines."></video>
  <figcaption>Part ownership indicated through colored outlines</figcaption>
</figure>
</TabItem>
<TabItem label="Chat">
Roblox replicates chat messages between the server and client. The server is
responsible for filtering chat messages and deciding which messages to replicate
to other clients. For example, the server may filter out messages that contain
profanity or are too long.

<video src="../assets/players/in-experience-text-chat/Player-Conversation-Bubbles.mp4" controls width="90%" alt="Two characters talk to each other through chat bubbles above their heads in a spooky blue environment."></video>
</TabItem>
</Tabs>

<Alert severity="success">
Most players on Roblox experience between 100–300 milliseconds of network latency. [Roblox Studio](../studio/index.md) playtesting runs with a default of no latency, but you can change **Incoming&nbsp;Replication&nbsp;Lag** in the **Network** section of Studio's settings (<kbd>Alt</kbd><kbd>S</kbd> on Windows; <kbd>⌥</kbd><kbd>S</kbd> on Mac) to `0.1`–`0.3` to better simulate how replication latency will affect your experience.
</Alert>
