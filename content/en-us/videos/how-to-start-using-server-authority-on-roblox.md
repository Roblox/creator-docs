---
title: How to start using Server Authority on Roblox
description: 'Spoken captions; API names can be wrong. Covers: Workspace.AuthorityMode set to Server, a jetpack simulated on the client and the server, a coin that refills fuel.'
date: '2026-08-11'
transcript: true
related:
  - projects/server-authority/index.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/-DJy_CfK2Vk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How to start using Server Authority on Roblox](https://www.youtube.com/watch?v=-DJy_CfK2Vk), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on August 11, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Server authority model](../projects/server-authority/index.md).

Resources: [create.roblox.com/docs/resources/templates](https://create.roblox.com/docs/resources/templates), [create.roblox.com/docs/reference/engine/classes/RunService](https://create.roblox.com/docs/reference/engine/classes/RunService).

## How to start using Server Authority on Roblox: Intro ([0:00](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=0s))

What's up, creators? I'm Jason, or Dustmage1337. And today, I'm going to show you how to get started making stuff using the new server authority API. To learn more about how it works under the hood, check out our how server authority works video, where we go deep into the technical details. Today, we're going to make something cool so you can learn how to use it. I'm going to make a little jetpack game in Studio. Let's open up the city templates.

## How to start using Server Authority on Roblox: Enabling Server Authority ([0:24](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=24s))

Step one, let's enable server authority. Click on workspace, scroll down until you find `Class.Workspace.AuthorityMode`, and change it to `Enum.AuthorityMode.Server`. When you enable server authority, we auto enable these other features like streaming and next gen replication, cuz we built the server authority tech on the latest and greatest features in the Roblox engine. With just that one toggle, everything in the game is now owned by the server.

## How to start using Server Authority on Roblox: Scripting the jetpack ([0:47](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=47s))

Character motion is fully secure, and speed and fly hacks are impossible, and physics interactions are much more fluid and responsive. All right, let's get started scripting this jetpack. In server authority, your core game needs to run on both client and server. That's how you get the instant feedback on the client and the correctness from the server. Let's do this by making a `Class.ModuleScript` that's loaded on both client and server. I make a `Class.ModuleScript`, add the start function, and then I load it on the server with this little tiny loader script that just calls start on the parent `Class.ModuleScript`. Then I just duplicate this and change it to `Enum.RunContext.Client`. Now our start function is going to be called on both client and server. Now, with server authority, you have to use this new `Class.RunService:BindToSimulation()` signal. This new signal is how the client is able to synchronize itself when it receives data from the server. We link this simulate method to `Class.RunService:BindToSimulation()`. Now, inside `Class.RunService:BindToSimulation()`, you can read from input actions that are under each player, interact with the physics world, and use attributes on predicted instances to read and write custom data.

## How to start using Server Authority on Roblox: Scripting the jetpack ([1:55](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=115s))

Attributes and physics properties are the only things that are rolled back when the client needs to correct the simulation to match the server. For the jetpack, I'm going to apply a force to the `HumanoidRootPart` if the player's holding the jump input action and they have fuel stored in an attribute on their `HumanoidRootPart`. I start by just getting the `HumanoidRootPart` for all players. Now, you can use this `Class.RunService:GetPredictionStatus()` to see if you should not simulate this character. Now, by default in Roblox, the other player avatars are not predicted. You don't need to process their jetpack. You can change this by using `Class.RunService:SetPredictionMode()`. Okay, now we're just getting the input action that's under each player. Normally in Roblox, input actions are only the local player input. But with server authority on, input actions that are under a player node are replicated from the client to the server. This allows the server to process each player's inputs.

## How to start using Server Authority on Roblox: Scripting the jetpack ([2:57](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=177s))

Okay, now we have the `HumanoidRootPart` and the jump input action. We have everything we need to make our jetpack game. We're going to get the jetpack fuel out of an attribute on the `HumanoidRootPart`. The `HumanoidRootPart` is default predicted. It's a great place to store custom generic data. But you might want to store data on your own custom instances using attributes. If they're holding the jump button and they have fuel and they're not moving up too fast, I'm going to apply a velocity to the `HumanoidRootPart`. Maybe about 6 7. Now, all I need to do is subtract the fuel. Maybe times 33 here. Oh, I don't need times one. All right, that should be good. Default to 100 fuel. You run out of jetpack fuel in about 3 seconds. Now, I just need to store the jetpack fuel on the humanoid. And I'm going to test it out. I can float around holding space. I should run out of fuel. There we go. Cool.

## How to start using Server Authority on Roblox: Scripting the jetpack ([3:59](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=239s))

Feels great. All right, let's add a little GUI note so I can see my jetpack fuel. I set up a `Class.TextBox` here with like rounded corners and a nice font. I'm just going to add a `Class.LocalScript` that uses `Class.RunService.RenderStepped` to update the `Class.TextLabel` using that jetpack fuel that I stored on the local `HumanoidRootPart`. And perfect, the auto complete actually nailed it this time. Great. Cool. Fuel looks good. Takes down to zero, fall to the ground. Sweet.

## How to start using Server Authority on Roblox: Scripting the coin ([4:34](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=274s))

Okay, let's add a coin that allows you to get more fuel. I'm going to copy paste the coin from the platformer template. All right, I need this script that plays a particle effect when the is picked up attribute changes. I just store what was picked up and check to see if that's different from the current is picked up attribute. And play a particle effect if it's been picked up. Cool. All I have to do is write is picked up to a coin and it'll play a particle effect and be marked that it's picked up. To do this, I'm going to use the touch callback on each player's `HumanoidRootPart`. And I'm going to reset this up in my module.start method, which will make sure that it's set up set up on both client and server. I'll link this module player added to the player added signal. Okay, now I just need the character and the `HumanoidRootPart`. Okay, now I can connect to the `HumanoidRootPart` touch callback.

## How to start using Server Authority on Roblox: Scripting the coin ([5:36](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=336s))

And this will give me any part that the character has touched and it's going to run on both client and server. I'm just going to check to see if they're named coin and I'm going to consider that a coin. Okay, I'm going to print something out here with the time function so that we can see that everything's perfectly synced between client and server. Now, the time function is synchronized in server authority. And that's kind of the magic of the server authority API. We're going to see if this coin's already been picked up. And if it hasn't been picked up, we're going to write the is picked up attribute to true. And we'll give ourselves some jetpack fuel. And we can just use the jetpack fuel attribute on the `HumanoidRootPart` to do that. Again, remember, only attributes on predicted instances are fully synchronized. Random, local Lua variables are not synced at all. Now, it's an exercise to the reader, but you can actually use meta tables in Lua to make this code look really clean.

## How to start using Server Authority on Roblox: Scripting the coin ([6:39](https://www.youtube.com/watch?v=-DJy_CfK2Vk&t=399s))

Okay, sweet. I collected the coin and I got my fuel. The touch callback has the exact same time in the logs. That's how we know everything's perfectly synced. Let's add a bunch more coins here and see what it's like. The client gets the instant feedback when you collect the coin, but the server actually processes it and gives you the real results. Players can't hack the coins and give themselves more fuel. Sweet. Nice. Okay, I'm already imagining how cool I can make this game. All right, this game's coming together. I'm going to keep iterating on it. This is supposed to be just an overview of how you can use the server authority API to make stuff. If you guys like this tutorial and you want to see more, let us know what kind of tutorials you want to see in the comments. Keep building.
