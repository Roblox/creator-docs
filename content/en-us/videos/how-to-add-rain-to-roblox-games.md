---
title: How to add rain to Roblox games
description: 'Spoken captions; API names can be wrong. Covers: a screen overlay that ignores the camera, particle emitters for handcrafted rain, a storm clock that counts in-game hours, emitter lifetime, rate, and coverage, roof detection, because particles do not collide.'
date: '2026-10-13'
transcript: true
related:
  - effects/particle-emitters.md
  - ui/on-screen-containers.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/awH9TlwM6d4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How to add rain to Roblox games](https://www.youtube.com/watch?v=awH9TlwM6d4), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on October 13, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Particle emitters](../effects/particle-emitters.md), [On-screen UI containers](../ui/on-screen-containers.md).

Resources: [github.com/Roblox/resources/tree/main/experiences/weather-island](https://github.com/Roblox/resources/tree/main/experiences/weather-island), [create.roblox.com/docs/resources/the-mystery-of-duvall-drive](https://create.roblox.com/docs/resources/the-mystery-of-duvall-drive).

## How to add rain to Roblox games: Intro ([0:00](https://www.youtube.com/watch?v=awH9TlwM6d4&t=0s))

We've all been there. You bump into an acquaintance in line at the grocery store, or maybe you're on your second cup of tea with a grandparent. There's a lull in the conversation. Do you do it? Are you that desperate? Do you reach for the safest possible topic of discussion? That's right, this video is about the weather. Specifically, it's about rain.

## How to add rain to Roblox games: Rain is complicated ([0:19](https://www.youtube.com/watch?v=awH9TlwM6d4&t=19s))

How to think about rain in Roblox games, several approaches to implementing rain, and the pros and cons of each. Let's get into it. Hey everyone, it's Andrew from Roblox. We experience it all the time, but rain is complicated. Tons of environmental factors affect whether it's raining at all, as well as the duration and severity of that rain. What should cloud cover look like before, during, and after a storm? Then there's the idea of trying to simulate all those droplets as they fall, the path they take in the wind, what happens when they land, how they pool, surfaces becoming slick, and on and on and on. The Weather Channel says a typical citywide rain event involves trillions upon trillions of raindrops. We can't simulate that. If we can't simulate it, we have to fake it. This video covers three approaches: a 2D overlay, hand-crafted environmental art, and a dynamic code-driven system.

## How to add rain to Roblox games: A 2D overlay ([1:12](https://www.youtube.com/watch?v=awH9TlwM6d4&t=72s))

This first approach is the simplest, which is an overlay. Here we have a screen GUI with a transparent mainframe, a few types of UI gradients for the raindrops, and an overall tint. At first glance, it looks okay. But, this approach has some major downsides. Since it's a screen overlay, the rain effect is identical, whether you're zoomed way in, zoomed way out, and whichever way you're looking. It might look fine at one zoom level or orientation, and really break immersion in another. You have to add logic to detect when you're indoors or in a cave, and turn the overlay off. Also, there's no concept of splashing.

## How to add rain to Roblox games: Handcrafted 3D art ([1:52](https://www.youtube.com/watch?v=awH9TlwM6d4&t=112s))

If you're using a fixed camera in a 2D game that takes place mostly outdoors, though, this might be a fine implementation. You can add some splash effects to the overlay and call it a day. The next approach is to art the heck out of a scene with the extensive use of particle emitters. Rain, of course, falls from the sky, so we need some particles to do the same. Add a part, make it transparent, anchor it, and stick it above our heads. Attach a particle emitter, let's do emission direction bottom, and yep, those are some sparkles. Not exactly convincing, though. You could use a custom texture, but squashing makes the texture much less relevant. Positive squash values give us vertical growth, which is exactly what we're looking for with rain. Three looks about right to my eyes. We can darken the color a bit, make sure the particles react to light, increase speed, decrease lifetime, and give them a slight rotation to simulate a bit of wind, and then voila. We're getting pretty close to something your brain might recognize as rain.

## How to add rain to Roblox games: Handcrafted 3D art ([2:53](https://www.youtube.com/watch?v=awH9TlwM6d4&t=173s))

Because it's attached to a transparent part that we placed and anchored by hand, you don't have to code around it. Just don't stick those parts above buildings, or if you do, shorten the lifetime, and it won't appear to rain on players while they're indoors. You can use particle emitters in the opposite direction for splash effects. Place a transparent part on the ground with a particle emitter emission direction of top. These emitters probably do need a custom texture since we're not squashing the particles beyond recognition. We also need a simple number sequence to ease the transition from mostly transparent to just about completely transparent, which creates the illusion of the splash dissipating. Duval Drive uses this approach to great effect along with a third emitter for mist and a fourth for rain dripping from awnings. I especially love this last effect. It's so cool. It's so clever. Check it out. Back to our emitters, we also need some clouds, but of course they shouldn't be bright happy clouds, and the sun looks a little large. Let's shrink that down.

## How to add rain to Roblox games: Handcrafted 3D art ([3:54](https://www.youtube.com/watch?v=awH9TlwM6d4&t=234s))

And the splash effect doesn't look super great on this surface here. Maybe we shouldn't use it. And emitters have a limit of 400 particles per second. If we want a downpour, we have to break By this point though, you might have already figured out the downsides of this approach. You've got to build it all. As the world expands, you're adding part after part after part, carefully positioning and adjusting to achieve the desired effect. Over and over and over. It's possible in a more constrained experience like Dival Drive, but might be more work than you're looking to take on in a larger world.

## How to add rain to Roblox games: A dynamic weather system ([4:30](https://www.youtube.com/watch?v=awH9TlwM6d4&t=270s))

For the final approach then, let's examine what a system might look like. Here's the rundown of how I designed this one. A rainstorm will occur eventually, anywhere from 12 to 168 in-game hours after stopping. At the start of a storm, we transition clouds from puffy and nice to dense and dark over the course of 2 hours. And the wind picks up right alongside them. Halfway through the cloud transition, we start spawning rain parts and mist parts around a point of origin. We ramp rain up from 50 to 100% and mist from 0 to 100%. The particles have drag and respect global wind, so you get a slight angle as the rain falls and can keep rotation at zero. Rain stops after anywhere from 4 to 12 in-game hours with the same transition of clouds and wind in reverse. The reason I went with mist, for the record, is that splashes need exact careful placement in order to look good. As a 3D artist here at Roblox told me, mist is really forgiving.

## How to add rain to Roblox games: Emitter limits ([5:29](https://www.youtube.com/watch?v=awH9TlwM6d4&t=329s))

All key values are configurable in a central file, and they need to be because it's very, very easy to bump into particle limits when you're working with emitters programmatically. If you experience flickering at a distance, this is easiest to notice with the mist, you probably need to start turning the rain knobs down. That's lifetime, rate, and coverage percentage. For example, if you lower the height of the rain parts, you can shorten the lifetime of the particle, which means fewer on screen at any given moment. Lowering the rate turns a downpour into a shower, and lowering the coverage percentage just means a smaller storm. Mobile devices have much lower particle limits than desktops, so if you implement a dynamic system like this one, test early, test often, and consider enabling streaming.

## How to add rain to Roblox games: Roof detection and some light trigonometry ([6:16](https://www.youtube.com/watch?v=awH9TlwM6d4&t=376s))

The other major hurdle is roof detection. Particles don't collide, so if you don't perform roof detection, they flow right through houses and bridges and whatever else and can break immersion. My crude version of roof detection involves checking whether there's a part along the path of the rain and shortening the lifetime of the rain particles so that they stop right before reaching that part. This is maybe not easy when there's no wind, but a bit easier. With wind, we have to angle the ray in such a way that it approximates the path of the rain. Think of it like a right triangle, where the ray travels along the hypotenuse, but you measure the leg, which is how far the rain falls before it hits the part. From that height and the rain speed, gravity, and drag, you can determine how long the particle lifetime should be so that it stops right before the part. This approach has some important limitations. The rain part only casts one ray, so the smaller your rain parts are, the more accurate the roof detection is. But, more parts means more emitters and rays means a bigger performance hit to your game, so you have to strike a balance.

## How to add rain to Roblox games: Roof detection and some light trigonometry ([7:21](https://www.youtube.com/watch?v=awH9TlwM6d4&t=441s))

Also, the rain doesn't actually fall in this neat triangle pattern. Instead, it starts off following a curve, accelerating until it hits terminal velocity, at which point the influence from the wind becomes constant. My fixed angle method isn't perfect. If you want to disable roof detection or rip the system out altogether, I've tried to make that as easy as possible.

## How to add rain to Roblox games: You can have it all ([7:42](https://www.youtube.com/watch?v=awH9TlwM6d4&t=462s))

To close things out, I should mention these systems are not mutually exclusive. You can do it all. You can have a system that dynamically enables a 2D overlay and fires up the splash emitters that you've manually positioned all around the world. I obviously haven't seen the underlying implementation, but that appears to be what Acquire and Square Enix are doing here in Octopath Traveler II. To my eyes, the rain is a 2D overlay and you can see two types of particle emitters, one for rain on impact, the other for rain splashing upward. The fixed camera makes the overlay a great fit and I suspect the splash emitters were placed by hand since you can spot the occasional inconsistency.

## How to add rain to Roblox games: Get the code and conclusion ([8:23](https://www.youtube.com/watch?v=awH9TlwM6d4&t=503s))

You can find all the code from this video as a Rojo project in our new Roblox Resources repository. Link right there in the description. If you have strong thoughts about handling weather in Roblox games or just think it's more interesting topic of conversation than I do, be sure to let me know in the comments. Thank you so much for watching and I'll see you in the next one.
