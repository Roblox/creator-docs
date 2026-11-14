---
title: Manage level of detail settings on Roblox
description: 'Spoken captions; API names can be wrong. Covers: simpler meshes as they get farther away, RenderFidelity, streaming level of detail, impostor meshes, slim meshes, persistent models a client script depends on, spending the saved performance on nearby detail.'
date: '2025-12-11'
transcript: true
related:
  - workspace/streaming/index.md
  - parts/meshes.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/Wwj8EkMWFhI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [Manage level of detail settings on Roblox](https://www.youtube.com/watch?v=Wwj8EkMWFhI), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on December 11, 2025. API names in these captions can be wrong.

Prefer the written documentation: [Instance streaming](../workspace/streaming/index.md), [Meshes](../parts/meshes.md).

## Manage level of detail settings on Roblox: Introduction to LOD ([0:00](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=0s))

This video is about managing level of detail settings in Roblox experiences. And yes, I hope to cover the subject at an appropriate level of detail.

## Manage level of detail settings on Roblox: The psychology of perception ([0:11](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=11s))

I'm so sorry. Let's get right into it. Hi everyone, it's Andrew from Roblox. Level of detail refers to reducing the complexity of a model as it gets farther and farther away from the character or camera, which can have huge performance benefits for your experiences. If you've ever been really close to a painting at an art museum, you might have noticed that what you recognized as a beautiful bushy tree from 5 meters away is actually just a brown blob for the trunk and a few expert taps of the paintbrush for the foliage. Our eyes are helpless without our brains. So at a distance, our brains interpret that blob as a tree in a process called perceptual completion. This process, humans interpreting reality rather than seeing it, is what allows level of detail systems in games to lower the quality of models at a distance while still providing visuals that are comparable to the originals. Ideally, ideally comparable.

## Manage level of detail settings on Roblox: Balancing performance and visuals ([1:03](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=63s))

I say ideally because it's easy to imagine a game going too far, oversimplifying to the point that our brains can't connect the dots, and we just see an ugly smudge. A slow, methodical game might need to use conservative LOD settings since the image on screen is more stable, whereas a fast Twitch experience might be able to get away with more aggressive settings. If you remember our performance optimization video, link in the description, everything you render has a cost in terms of draw calls and triangles. Even if an object is really far away, that cost is roughly the same. Level of detail systems take advantage of perception to delete a bunch of triangles as the camera moves away. That now lower cost means higher performance.

## Manage level of detail settings on Roblox: Render fidelity properties ([1:44](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=104s))

The most rudimentary setting in Roblox is the render fidelity property on mesh and solid modeled parts. At automatic, Roblox renders them at high, medium, and finally low quality as the camera moves away. You can strategically change to precise if visual quality suffers or performance for less important parts. See how these three trees behave as we move back and forth along my 500 stud ruler. I personally can't tell the difference between automatic and precise at this size and resolution and against the skybox, but maybe your mesh is more complex or your background less busy.

## Manage level of detail settings on Roblox: Streaming and visibility ([2:16](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=136s))

It's up to you to measure the performance gains in a scene on a target device and decide if the visual trade-off is worth it. The more interesting settings come when you enable streaming, particularly level of detail. Rather than just reduced quality, streaming lets you choose between having models outside of the streaming radius not appear at all, using lowresolution impostor meshes, showing lightweight slim meshes, or in rare cases, displaying the original model. Each choice has trade-offs, so streaming lets you choose on a per model basis to achieve the visual outcome you're looking for. First, the automatic or disabled setting. This one is pretty straightforward. The model initially isn't there, and when you enter the streaming radius, it shows up. This setting respects the render fidelity properties, so quality might decrease as you move away. When you eventually leave the radius, the engine can remove the model either opportunistically, which I've enabled here, or when your device needs the memory. In terms of rendering fewer triangles, you can't do much better than zero. But this setting can be quite the visual cutback. Some models though, you might not care if they disappear, probably because the object is small enough or insignificant enough that it doesn't negatively impact visuals outside of the streaming radius.

## Manage level of detail settings on Roblox: Using impostor meshes ([3:24](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=204s))

Next, impostor meshes. Choose streaming mesh to get a chunky, lowresolution mesh that looks pretty crude up close, but like our painting from earlier, might look fine at a distance. It depends on the model, its size, and the rest of the scene. Our general guidance is to use these with a streaming target radius of at least 1,000 studs. Any closer and the cracks start to show. Well, not literal cracks because impostors are smooth meshes, but you get the idea.

## Manage level of detail settings on Roblox: Implementing slim meshes ([3:51](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=231s))

Slim meshes are our newest option and one that we view as critical to enabling the large highfidelity worlds of the future. When you enable slim on a model, Roblox automatically generates many meshes from high complexity to low complexity and chooses which one to render based on distance from the camera. Here, my character is outside the streaming radius. As the camera moves away from the tree, you can see quality gradually degrading. Or maybe you can't notice at all. If you can't, that's the idea. Broadly speaking, slim meshes offer much better visuals than impostors at a similar performance level. We think they're the sweet spot in many situations.

## Manage level of detail settings on Roblox: Persistent streaming mode ([4:27](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=267s))

If you absolutely must have a model on the client at all times, likely because a client script relies on it for some gameplay logic, you can set model streaming mode to persistent so that it never streams out. The interaction with the level of detail setting is a bit complex. Automatic is essentially ignored because the model never streams out. Streaming mesh is ignored as well. The model never switches to an impostor mesh. Slim meshes do support this setting, however, so you can have a persistent model with slim enabled. Our overarching advice is to only use this option when absolutely necessary for gameplay purposes, not for visual purposes. Setting too many models to persistent defeats the purpose of streaming.

## Manage level of detail settings on Roblox: Maximizing visual quality ([5:08](https://www.youtube.com/watch?v=Wwj8EkMWFhI&t=308s))

To close things out, I want to talk about visual quality. While it's true that level of detail settings render distant objects at lower quality levels, appropriate use of this feature can actually increase overall visual quality. When you save performance on distant objects, you have more processing power to devote to nearby objects. Higher frame rates mean that players who have graphics quality set to automatic are more likely to stay at higher quality levels. So rather than thinking about what you're losing, think about what you're gaining. The ability to have denser scenes with higher fidelity assets and an overall better appearance for the things that players are most focused on, all without tanking your frame rate. For more information on working with the various level of detail settings from this video, check out the documentation at create.roll.com. Thanks for watching.
