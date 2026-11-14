---
title: How the Input Action System works on Roblox
description: 'Spoken captions; API names can be wrong. Covers: an action such as jump instead of a hardware key, an input context in ReplicatedStorage, boolean actions, bindings for keyboard, mouse, gamepad, and touch, player scripts moved off ContextActionService.'
date: '2026-06-11'
transcript: true
related:
  - input/input-action-system.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/Fg-Ksoa7b-s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How the Input Action System works on Roblox](https://www.youtube.com/watch?v=Fg-Ksoa7b-s), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on June 11, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Input Action System](../input/input-action-system.md).

Resources: [devforum.roblox.com/t...](https://devforum.roblox.com/t/full-release-input-action-system-ias-newly-converted-player-scripts/4678416).

## How the Input Action System works on Roblox: Intro ([0:00](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=0s))

Hi, I'm Jasmine, also known as Miss Mandy Panda on Roblox, and I'm a product manager working on all things interactive. If you've been building on Roblox for a bit, you're probably familiar with User Input Service and Context Action Service. They've powered our games for years, but they have some shortcomings. You may have also seen our posts about the Input Action System a while ago. Maybe you've opened it up and poked around, but it felt like a sizable commitment to migrate your existing experiences onto IAS. Today, IAS is fully released, and we're going to show you how to easily get it set up. We're going to show you exactly how to take the logic you've already written and migrate it into IAS using the default player scripts as our guide. We'll look at what the system actually changes, why it's the right move for your game's future, and how to make the transition as smooth as possible. Both of these scripts do the same thing, but by the end of this video, you'll see why the version on the bottom can save you hours of work the next time you need to add a new action or support a new device.

## How the Input Action System works on Roblox: Philosophy shift ([1:00](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=60s))

The first thing to understand is that IAS isn't just a new API. It's an abstraction layer that helps you move from manual to automatic. In the old workflow, you wrote code to manually listen for hardware input. IAS shifts us towards intent-based input. Instead of writing code for a specific hardware key, we define an action like jump or interact and attach various cross-platform bindings to it. You're managing three simple pieces. One, the input action, which is your intent. This is jump, move, or reload. Two, your input bindings, which are the physical triggers. These are like space bar on a keyboard, button A on a gamepad, or a UI button on touch. And finally, you have your input context, the container. This groups your actions, like driving controls or shop menu, and lets you toggle them on and off all at once. Why should you switch from UIS or CAS to IAS? It comes down to three things. One, One, you can define an action once and give it a set of bindings, and Roblox will handle the rest, allowing you to write once and have your players play everywhere. Two, it makes your code hardware agnostic.

## How the Input Action System works on Roblox: Philosophy shift ([2:12](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=132s))

Instead of writing sensitivity math for a mouse and dead zone math for a thumbstick, you define the action once and IAS normalizes the data for you. Three, it's easy to group controls together like inventory or driving, and toggle them on with one property. And four, when Roblox launches on a new platform, your logic won't change. You can just add a new binding and call it a day.

## How the Input Action System works on Roblox: Build your first system ([2:38](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=158s))

Let's try building a simple action with IAS. First, we'll create an inputs folder inside `Class.ReplicatedStorage`, drop an input context inside, and call it play context. This will be our container for custom in-game character controls. Inside play context, we'll add an input action for wave. Since waving is a simple on or off state, we'll keep the action type as boolean. Next, we want to add our input bindings. We'll add one for keyboard and mouse and set it to F, and another for gamepad and set it to button X. Now, I have both bindings hooked up and I've written no lines of code. If you want to get fancy, you can add modifiers. You can create key chords like requiring shift plus F to wave just by changing the primary modifier property. Now, we want to add an input binding for touch. We can create a GUI button in `Class.StarterGui`, and then go back to my input action and add another input binding.

## How the Input Action System works on Roblox: Build your first system ([3:39](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=219s))

Under the UI button property, we can link the button that we just made. And now we're all done. Your wave logic will now fire whether the player hits F or taps a button on their screen or hits button X on gamepad. To test this out, we can add a simple debug script for wave. And now you can see how IAS handles the bridge between the binding and the action automatically.

## How the Input Action System works on Roblox: Refactor framework ([4:04](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=244s))

Now that you know how to set IAS up, how do you convert your existing scripts to use it? Rather than directly translating code, think about the information you want to tell your input system. Intent, action type, and bindings. In IAS, intent, which is what you want to happen in the game, and bindings, which is how the player invokes it on each platform, are cleanly separated, making it easy to build cross-platform compatible controls. Intent is the Lua script you write that listens for when an input action is fired. The action type is defined on the input action and listens for what type of input logic is required, whether it's a boolean or a consistent movement in a certain direction. And the bindings are the various input binding instances that a player interacts with that feeds into the action type.

## How the Input Action System works on Roblox: Case study: old system ([4:53](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=293s))

To see this in practice, Alex is going to walk us through how she converted our default player scripts to use IAS. The biggest difference between our new player scripts and our old player scripts is that in our old player scripts before Input Action System, when we were using Context Action Service, we had to manually script each platform. And if you look under our control module, we have a different module for each platform. And we can take a look at our gamepad one. We use Context Action Service bind activate. And we had to bind the jump action directly to button A within a within the script. And we also had to bind thumbstick one. But the nice thing about gamepad is that thumbstick input looks a lot like the move vector that we want eventually. If we take a look at our keyboard module, it behaves pretty similar to our gamepad module. We use Context Action Service to bind the jump action to the player action character jump, which is a previous abstraction that we've added, but it actually only maps to the keyboard space bar. But, the biggest difference between keyboard and gamepad is that keyboard input for movement doesn't necessarily look the same as thumbstick input.

## How the Input Action System works on Roblox: Case study: old system ([6:02](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=362s))

Within the keyboard module, we've had to bind four different actions for the character forward, backwards, left, and right, and then perform the translation within the keyboard module to turn it into a thumbstick-like input for our control module to consume.

## How the Input Action System works on Roblox: Case study: new system ([6:19](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=379s))

Within our old player scripts, we also had a touch jump module responsible for creating the touch jump button on mobile devices and for making it invisible and visible depending on preferred input. And also for UI effects like hovering. But, within our old player scripts, we needed to connect the UI events directly to the control module through scripting. But, if you take a look at our new player scripts using input action system, we managed to delete both the gamepad and the keyboard `Class.ModuleScript|ModuleScripts` and consolidate it all into one generic action controller. This is all we needed in order to get move and jump data to our control module. All of that detail was moved into these input binding configurations. You'll see our thumbstick binding on the move action and then our WASD on our keyboard binding. We also have a jump action here with all our gamepad keyboard bindings. And if you take a look at our touch jump module, we still need the module in order to control UI effects like hover and be able to turn the visibility on and off depending on your preferred input. But, all we needed to do to connect it to our action was to change this UI button property on our touch binding and connect it to our jump action that we created through the script. Lastly, for context switching in our old player scripts, we use context action service and we needed to provide a control action priority whenever we made our action. And we use that in both the gamepad and keyboard modules. And then when we were writing our handlers, we also needed to return a pass or a sync. In our new player scripts, we just configure that through our input context instances.

## How the Input Action System works on Roblox: Case study: new system ([7:49](https://www.youtube.com/watch?v=Fg-Ksoa7b-s&t=469s))

We provide a context, and then we decide whether or not to sync within the context itself. Thanks, Alex. Our player scripts to IAS migration is now available in workspace for you to opt into. This makes our input logic abstracted, platform agnostic, and a lot easier to read. Migrating to IAS will also key you into key features coming out in the future. IAS sets you up for runtime binding customization and player facing remapping, features that we're actively working on. We're also working on studio tooling to make this process even easier. For more information, check out our dev forum post or documentation online. We're open to feedback, so please let us know how we can make this system better for you. We're excited to see what you build.
