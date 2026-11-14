---
title: How to build a simple dialog system on Roblox
description: 'Spoken captions; API names can be wrong. The version of mder shown in the video contains a fairly obvious bug around underlined text. Covers: plain-text lines, not a branching graph, proximity prompts on tagged NPCs, server-replicated animations, typewriter text, markdown in a text label.'
date: '2026-07-20'
transcript: true
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/oemMqSgj7pw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How to build a simple dialog system on Roblox](https://www.youtube.com/watch?v=oemMqSgj7pw), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on July 20, 2026. API names in these captions can be wrong.

Resources: [github.com/Roblox/creator-docs/raw/refs/heads/main/content/en-us...](https://github.com/Roblox/creator-docs/raw/refs/heads/main/content/en-us/assets/solutions/DialogSystem.rbxlx?download=), [github.com/Sleitnick/RbxCameraShaker](https://github.com/Sleitnick/RbxCameraShaker).

## How to build a simple dialog system on Roblox: Intro ([0:00](https://www.youtube.com/watch?v=oemMqSgj7pw&t=0s))

This video is about building a simple dialogue system on Roblox. If your games include NPCs, you might want them to say something. Or a lot of somethings. Hey everyone, it's Andrew from Roblox. I grew up playing role-playing games and it's still my favorite genre. Final Fantasy, Ultima, Baldur's Gate, Chrono Trigger, the Mana series, I love them all so much. But when I look back at them today, I see a lot of this. It's understandable, of course, given the constraints of the time and the sheer amount of dialogue in your typical RPG. Many modern games have full voice acting and detailed facial animations, which can be incredible if you have the budget for it. But what we've also seen emerge in the past couple decades is this nice middle ground where static images, short sound effects, oh hey, text styling and effects like screen shake are able to convey the speaker's personality and mood without full voice acting. It lets you make dialogue dramatically more lively without all that complexity.

## How to build a simple dialog system on Roblox: Intro ([1:03](https://www.youtube.com/watch?v=oemMqSgj7pw&t=63s))

Plus, you can iterate endlessly on the dialogue itself without having to re-record anything. Any dialogue system has to be tailored to your game, but let's examine this one together.

## How to build a simple dialog system on Roblox: Goals and non-goals ([1:14](https://www.youtube.com/watch?v=oemMqSgj7pw&t=74s))

In my case, I'm not interested in a branching system. I want plain old say one thing NPCs. There are some great libraries out there if you want to build a node-based system, and I encourage you to check them out if you need that level of complexity. I want the authoring experience to be super simple, plain text that lets me stay in the flow of writing. The idea is to mix and match different sets of assets to create moods, and that way I can just say mood.annoyed or mood.happy and not have to explicitly define every field for every line of dialogue. I want personality and expressiveness, so I include animations as part of the NPC mood. Not including animations would dramatically simplify the code. We'll talk more about that later.

## How to build a simple dialog system on Roblox: Let's get into it ([1:59](https://www.youtube.com/watch?v=oemMqSgj7pw&t=119s))

All right, let's dig in and see how it works. When the server starts, it uses collection service to gather up all NPCs with a given tag, in this case, dialogue, and stick a proximity prompt onto each. I also add the desired behavior for the prompt, which is to start a new dialogue if the player isn't already in one. On the client side, we build the GUI, which in this case is specified as code, but you could easily create it manually as well. Set up the key bindings and wait. After a player triggers the prompt, we get the dialogue ID for the NPC in question. It's an attribute on the model. And kick off the aptly named start dialogue `Class.RemoteEvent`, which brings us to the start session function. The first thing this function does is get the dialogue for the NPC from the dialogue data table. This table is a simple compilation of all `Class.ModuleScript|ModuleScripts` in the dialogue data folder. Each one of these modules must have a unique ID, some number of screens, and an optional idle animation. After we have the dialogue table, we can set up the single sound instance that we'll use for the entirety of the conversation.

## How to build a simple dialog system on Roblox: Let's get into it ([3:05](https://www.youtube.com/watch?v=oemMqSgj7pw&t=185s))

Then we freeze the player, enable the GUI, and show the first screen. Then we can start filling in the screen with our assets and data. If it's the last screen, for example, the button should be exit instead of next. We get the mood image and sound, and if there's a screen shake effect for the dialogue, do that, too. The final two lines, though, probably require some explanation.

## How to build a simple dialog system on Roblox: Why we replicate animations ([3:27](https://www.youtube.com/watch?v=oemMqSgj7pw&t=207s))

Rather than just playing the animation on the client, we're playing it on the server so that it gets replicated to all players. If another player's watching you run around, they should be able to see that you're conversing with an NPC. They should see the same animation that you see. This looks great, but has the side effect of increasing code complexity since server, the server, has to keep track of animation state. If you don't care about other players seeing animations, or maybe you don't want to play animations at all, awesome, rip it out. I found out in the making of this video that working with rigs can be pretty hard. Simplify your life.

## How to build a simple dialog system on Roblox: The typewriter effect ([4:02](https://www.youtube.com/watch?v=oemMqSgj7pw&t=242s))

The last part is the typewriter effect, which gradually adds text to the label instead of showing it all at once. I've broken this out to its own module. I personally find the typewriter effect helps with immersion, since human beings don't speak instantaneously, but removing it is another way to simplify the code here. I also have an extremely short module that converts my own flavor of markdown into Roblox-styled rich text. When the player advances the dialogue, we cancel the typewriter effect and move to the next screen until we reach the end. If the typing speed is too slow for you, not a problem. I stuck that and as many other variables as I could think of into dialogue config.

## How to build a simple dialog system on Roblox: The end result ([4:43](https://www.youtube.com/watch?v=oemMqSgj7pw&t=283s))

The end result, to me anyway, feels very expressive, and players who aren't interested in a chunk of dialogue can fast forward without losing that expressiveness. You get different images, sound effects, animations, and even a shake when Lola is angry using Steven's nearly decade-old camera shaker library.

## How to build a simple dialog system on Roblox: Conclusion ([5:01](https://www.youtube.com/watch?v=oemMqSgj7pw&t=301s))

I'm not saying you should transplant this dialogue system into your game wholesale. Your game surely has its own needs, but I hope some bits of it are useful for anyone who, like me, prefers to do their authoring in plain text. My original goal was to create a super simple way to write expressive dialogue, so I started with the data format and worked backwards from there. Once I had a data format I liked, it was just a question of writing the code to handle that format. Sticking configuration options into a central file let me iterate quickly, and I generally just tried to keep things simple. You can download a baseplate with all the code from this video in the description below. Let me know how you handle dialogue in your games, and please don't hold back in the comments if you have any constructive criticism about how I've handled it in mine. We're all learning all the time. Thank you so much for watching and I'll see you in the next one.
