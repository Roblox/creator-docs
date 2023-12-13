---
title: Scripting
description: Scripting is event-driven and different for the client and server side.
---

Scripting lets you add custom, dynamic behavior to your experiences,
providing more engaging and immersive interactions for your users.
[Luau](../luau/index.md) is the scripting language supported by Roblox, and you use it to
build functionality within the Roblox engine.

<Alert severity="success">
Contribute your Luau scripts for AI training can help enhance Luau-focused AI tools in Studio. For more information, see [Empower Luau creation](https://create.roblox.com/data-collection).
</Alert>

## Scripts

[Scripts](../scripting/scripts.md) are containers that hold Luau code, and can run on
the server and client in isolation or across the network boundary. The data
model has separate containers for client-side and server-side scripts to ensure
security. You also typically parent scripts to other 3D objects to associate the
objects with their associated logic.

## Services

[Services](../scripting/services.md) are special singleton classes that provide
convenient functionality for various underlying systems in the Roblox engine,
such as input handling, sound management, and physics simulation, so you don't
have to implement them from scratch.

## Techniques

Scripting on Roblox is primarily event-driven. However, you can still execute
scripts in other ways, such as per-physics frame or per-rendering frame or even
run scripts in a multithreaded environment.

### Event-Driven

Event connections allow your code to listen for [built-in](../scripting/events/built-in.md) events fired by Roblox or [custom](../scripting/events/custom.md) events that you create. You can set up scripts to run automatically when the events occur by connecting them to the desired events, such as user input, a player touching a part, or a player spawning.

### Networking

To facilitate scripts communicating
across the [client-server](../projects/client-server.md) boundary, you can use [remote events](../scripting/events/remote.md) for one-way communication, allowing the server to send events to clients and vice versa, or [remote callbacks](../scripting/events/remote.md) for two-way communication, allowing
scripts to make requests and wait for responses.

### Task Scheduling

[Task scheduling](../scripting/scheduler.md) lets you explicitly run code at certain
times during the Roblox engine's execution lifecycle. This pattern gives you
more fine grained control over when code runs and is commonly used to animate
objects, update the physics simulation, or to pause and run arbitrary code. You
should schedule tasks only when necessary as you run the risk of overloading the
scheduler.

### Multi-Threading

[Multi-threading](../scripting/multithreading.md) can be helpful for optimizing
CPU-intensive operations or implementing certain game mechanics that require
parallel processing. Only use multithreading for tasks that require it to avoid
potential issues such as race conditions or deadlocks.
