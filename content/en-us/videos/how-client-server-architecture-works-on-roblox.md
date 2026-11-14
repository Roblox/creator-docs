---
title: How client-server architecture works on Roblox
description: "Spoken captions; API names can be wrong. If you've used other game engines, learn a bit about getting comfortable with Roblox. Covers: the server owns the place, script sync, remote events for breakable objects, player data saves, atomic models for streaming, server-built rooms and gates."
date: '2026-03-26'
transcript: true
related:
  - projects/client-server.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/ougjxNrDvQo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How client-server architecture works on Roblox](https://www.youtube.com/watch?v=ougjxNrDvQo), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on March 26, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Client-server runtime](../projects/client-server.md).

Resources: [create.roblox.com/docs/workspace/streaming](https://create.roblox.com/docs/workspace/streaming), [create.roblox.com/docs/projects/server-authority](https://create.roblox.com/docs/projects/server-authority), [create.roblox.com/docs/scripting/sync](https://create.roblox.com/docs/scripting/sync), [create.roblox.com/docs/studio/mcp](https://create.roblox.com/docs/studio/mcp).

## How client-server architecture works on Roblox: Intro ([0:00](https://www.youtube.com/watch?v=ougjxNrDvQo&t=0s))

This video is for developers who have experience with other game engines, but are new to Roblox. If you've used other engines, adapting to Roblox's [client-server architecture](../projects/client-server.md) can require a bit of a shift in mindset. Let's discuss why.

Hey everyone, it's Andrew from Roblox. What I have here is a demo experience generously provided by MrChickenRocket and DevOdysseus. It's a twin-stick shooter, a genre that I imagine many of you are familiar with. You shoot skeletons with friends, revel in the chaos, and grab gems. Let's dig into some key features of this experience, and along the way we can talk more broadly about developing on Roblox. It's a lot, I want to cover a lot.

## How client-server architecture works on Roblox: Project architecture ([0:42](https://www.youtube.com/watch?v=ougjxNrDvQo&t=42s))

Let's start with project architecture. The first, maybe most important point to understand when getting started with Roblox is that the client-server architecture means that the server owns everything. As you build in Studio, what you're looking at is the server's view of the world. The client then gets some subset of that view depending on the situation, and can make its own local-only changes for things like the user interface and visual effects.

This architecture means there are a whole bunch of places to put scripts. We have not [one](https://www.youtube.com/watch?v=Mdgk49Evink), but [two](https://www.youtube.com/watch?v=jLNgutvbALY) other videos on this subject. Check them out if you want to get into the nitty-gritty.

The basics are that server scripts go in `Class.ServerScriptService`, and client scripts go in `Class.ReplicatedStorage` with an `Enum.RunContext.Client`. Shared `Class.ModuleScript|ModuleScripts` also go in `Class.ReplicatedStorage`.

As we switch between the client and the server in Studio, you can see right away that the contents of `Class.ServerScriptService` and `Class.ServerStorage` just aren't on the client. The difference is even more stark if you test an experience that uses streaming and enable the free cam with <kbd>Shift</kbd> + <kbd>P</kbd>. In addition to not having everything you saw on the server while editing the experience, you can see here that the client only has a subset of the whole workspace.

## How client-server architecture works on Roblox: Project architecture ([1:51](https://www.youtube.com/watch?v=ougjxNrDvQo&t=111s))

When we start building, the first step is to give ourselves some objects to work with. MrChickenRocket calls this mental scaffolding, a term I love, but the more prosaic way to think about it is that games are all about interactivity, and it's hard to add interactivity to objects that don't exist. If you want to build a twin-stick shooter with a procedural layout and destructible objects, the first step is to build some rooms.

## How client-server architecture works on Roblox: A comfortable scripting setup ([2:15](https://www.youtube.com/watch?v=ougjxNrDvQo&t=135s))

Before we start scripting, let's get comfortable. You can absolutely use the built-in [Script Editor](../studio/script-editor.md), but if you're an experienced developer, you probably have a preferred text editor. Taking the time to set up script sync means that you can use your favorite editor and your favorite coding tools.

Here I've synced everything to my local disk and open the project in Cursor. Because it's on my local disk, I can use Git or any other version control system. Depending on how deep you are down the AI rabbit hole, and listen, I'm not judging either way, you might also want to hook up the [Studio MCP server](../studio/mcp.md) to Claude.

You might be tempted to start putting scripts directly onto objects in the workspace, but it inevitably leads to a maintenance nightmare as you start duplicating models. Instead, tag the parts you need to reason around and use the `Class.CollectionService` to gather them up so you can work with them in a single place. Rather than running every frame, code in Roblox tends to be more event-driven, so you listen for changes and then run some code.

## How client-server architecture works on Roblox: Remote events and breakable objects ([3:11](https://www.youtube.com/watch?v=ougjxNrDvQo&t=191s))

Speaking of events, communication between the client and the server occurs using what are called `Class.RemoteEvent|RemoteEvents`. We have a [video](https://www.youtube.com/watch?v=n5uOVlCIUjI) on this subject too. Here, the client performs all sorts of work to create a compelling visual for the player.

It takes a broken child `Class.Model` within the original model and adds it to a debris table. When a bullet hits the model, the script swaps it for the broken one, unanchors the parts so that physics apply, and then makes them go flying.

Give those parts a randomized ejection vector. A simple particle effect then amps up the sense of destruction. Finally, though, the client script notifies the server, "Hey, player one broke this object." using a `Class.RemoteEvent`. In response, the server replicates the action to all other clients, spawns loot only for player one, and then destroys the object.

The final situation is very instructive. On player one, we see debris and a few gems. On player two, just the debris, but critically, it's different debris due to the random nature of the client code. On the server, we don't see anything at all because the server is keeping track of state, not visuals.

## How client-server architecture works on Roblox: Player housekeeping ([4:15](https://www.youtube.com/watch?v=ougjxNrDvQo&t=255s))

There's also general housekeeping, most of which uses the player and character events. When a player joins for the first time, initialize their data. If they're returning, load their data from a data store. Manipulate that data over the course of their session and save it when they leave.

Do you plan to implement your own character solution or use default avatars? Will players use the built-in spawn system, or do you need to create your own? It's not the most exciting scripting work in the world, but it creates the testable skeleton of your experience, or whatever metaphor you prefer.

## How client-server architecture works on Roblox: Streaming and server authority ([4:47](https://www.youtube.com/watch?v=ougjxNrDvQo&t=287s))

There are a couple other key features to mention, but they're situational. First, [streaming](https://create.roblox.com/docs/en-us/workspace/streaming). If players can see beyond 100m or so, that's 357 studs in Roblox parlance, you probably want to enable streaming.

I mention streaming all the time on this channel, and probably need to have my title changed to Chief Streaming Evangelist, but a big gotcha with streaming is to organize your instances into models and mark them as atomic. Marking models as atomic means that clients get the whole model or none of it, which makes it dramatically easier to reason around the modeling code.

Imagine a house streaming in incrementally so you get the walls and the floor, and then a few milliseconds later, the roof and the doors, and then the windows follow a quarter second after that. It'd be a nightmare to code around. You want your scripts to be only minimally aware of the part composition of a model rather than having to constantly check to make sure they have everything they need.

The other key feature is [server authority](../projects/server-authority/index.md). If you're designing a competitive multiplayer experience, check out server authority. It prevents entire classes of cheats, like fly hacks and speed hacks, by not trusting clients to report their position or state. It moves ownership of the player from the client, where they can cheat, to the server, where they can't.

## How client-server architecture works on Roblox: Streaming and server authority ([5:59](https://www.youtube.com/watch?v=ougjxNrDvQo&t=359s))

It's too much to cover here and still in beta, but I'll link to the documentation in the description, which has three sample games to help you understand the difference in project structure when server authority is enabled.

## How client-server architecture works on Roblox: Procedural generation and gates ([6:11](https://www.youtube.com/watch?v=ougjxNrDvQo&t=371s))

To close things out, let's review two more features from this experience: procedural generation and gates. As you can see here, our view in building in Studio is quite different from the in-game view. You don't have to do this, of course, but if you want a procedural world, you can create any number of discrete building blocks, and then have the server put them together at runtime.

Rather than each client having to do that work locally, they all just get the version the server created. Here, we have a server script that initializes the experience. It passes a desired room count and a random seed to the map gen module. Everything is hardcoded here for demo purposes, but could just as easily be random.

The `Class.ModuleScript` starts by taking every room and hallway in the prefabs folder and sticking them into tables so they're easy to work with. After some cleanup, you can see that it adds hallways and rooms until it reaches the desired number. If it runs out of unique rooms, it starts duplicating.

Add hallway and room mostly deals with orientation and clearing rooms that have already been used from the table to make sure you don't get the same room over and over due to bad luck with randomization. And voila: a layout, and another, and another.

## How client-server architecture works on Roblox: Procedural generation and gates ([7:19](https://www.youtube.com/watch?v=ougjxNrDvQo&t=439s))

Gates sure seem like they should be easy, but the implementation here shows off the separation of server and client concerns really well. You can see that we have a grill positioned below the map, and when we enter a room, the server sets the closed attribute on that grill to true or false. Then the client takes over.

In what you might describe as a suboptimal approach, the client checks every grill once per frame to see if it's current open or closed state differs from the closed attribute that the server set. If the state differs, get the open and closed positions from the grill spot open and grill spot closed attachments, and play that tween.

Is there a way to make this process event-driven rather than checking every frame? Probably yes, but that's game development. Even if we look at it and think we can do better, optimizing this module might not yield any tangible performance gains.

We're only going to have a few gates at a time, so it's probably better to just keep the simpler code. We can't let the perfect be the enemy of the good, or the good be the enemy of the...you know what? I'm actually going to go back and see if I can rewrite that module.

## How client-server architecture works on Roblox: THANK YOU ([8:22](https://www.youtube.com/watch?v=ougjxNrDvQo&t=502s))

I want to extend a huge thank you to MrChickenRocket and DevOdysseus for all their help and support on this video, and an equally large thanks to all of you for watching. See you next time.
