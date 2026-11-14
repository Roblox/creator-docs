---
title: How Procedural Models work on Roblox
description: 'Spoken captions; API names can be wrong. Covers: geometry generated from code, nine-slice blocks, a building generated from one block, a plugin that shares neighboring models, polygonal shapes that are not boxes.'
date: '2026-09-03'
transcript: true
related:
  - parts/procedural-models.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/gu1iPJmyMgA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How Procedural Models work on Roblox](https://www.youtube.com/watch?v=gu1iPJmyMgA), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on September 3, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Procedural models](../parts/procedural-models.md).

Resources: [github.com/Roblox/resources/tree/main/experiences/procedural-models](https://github.com/Roblox/resources/tree/main/experiences/procedural-models).

## How Procedural Models work on Roblox: Introduction ([0:00](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=0s))

Hey there! I'm DuckAreYeIIow, and in this video, I'm going to be reviewing Peter, a Principal Software Engineer at Roblox, about procedural models. We're going to be talking about what they are, how they work, why they're important, and how they impact the kinds of games you can make on the platform.

## How Procedural Models work on Roblox: What is it ([0:22](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=22s))

People might not know what that is. What's procedural about it? How is a procedural model different from a regular model? Well, a procedural model uses code to generate all of the geometry of the procedural model based upon the size of the model, and hopefully other contextual information about where it is in the world.

Instead of having a block made out of concrete, you can now have a block made out of building, and the procedural model will fill in all of the difference. So, what's the value add? What's the upgrade that procedural models bring to Roblox development that wasn't there before?

The main way I'd put it is the number of edits you have to make to get finished, final, good-looking geometry in your Roblox games is much reduced. Let's say if we're having a look at this place file, if you have a look at this model now, we have a very, very basic obby which is built out of basic concrete block.

It would take your average Roblox developer maybe 20 edits to build this. You grab a part, you drag it around, you clone it, you size it up, and you have something that looks like this. This is very often called a gray box. So, the idea is with procedural models, you use those same 20 or 30 edits, but instead of having something that looks like 2018 base plate, you have something that looks like final, finished production geometry.

From a performance standpoint, procedural models are just as cheap as a gray box or comparable? Like, they're not super heavy? Procedural models don't have to do anything at runtime, you only pay the cost of the final geometry that's been output. That's clever, is that like the whole point? Yeah, they're not doing anything. Procedural models produce static geometry. They don't do anything at runtime. so you're only paying the rendering cost of whatever geometry it outputs.

## How Procedural Models work on Roblox: How it works ([2:10](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=130s))

Could you show us an example? You have a couple demos that you want to show us of this in action. Sure. So, very simply, if I jump over to demo number two here, it's the same place, but I've swapped all of the concrete blocks out for a simple procedural model that I put together called 27 slice.

Now, if you get up right up close to this model and have a look, it's green. It's not just green. If you look at the corners, the corners are nicely rounded and beveled on this. And as you size it, you'll see that the bevels are not squishing. This is not a mesh that we're sizing out, this keeps its bevels no matter what size we do. It's not deforming or getting squashed or something.

No, it's keeping its aspect ratio on those bevels as we work. Now, the way it's doing it is internally inside of this procedural model, it's generating hundreds and hundreds and hundreds of little mesh parts, but these all get instanced together and you're only paying the final geometry cost of this.

A procedural model does all of the maintenance and updating of all of these while you work, and you can just transform it as one giant block. You don't have to worry about all the million little subsections that it's made out of? That's exactly right. Instead of boring, hard corners on the concrete, we can have nice, soft, round, good-looking geometry here for exactly the same cost in terms of editing effort.

## How Procedural Models work on Roblox: Puzzle pieces ([3:27](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=207s))

You mentioned that the green one is built of a bunch of super tiny things, and you can move all of them at once because a script is changing all the subcomponents. But, how does that work? Like, how do you go further beyond the bevels in the green?

All of these blocks here are procedural models, and I think it helps if I show how this is put together. There's a concept in 2D imaging called nine-slicing, where you bascially define where the corners are and what the edges look like. If I show you how these put together, if I jump over to them all over here where I got the parts from, you can see that these are the individual pieces that I'm assembling to make the bounds.

Oh, the puzzle pieces that you all put together? Yeah, over here we have the puzzle pieces that get put together to make up that box depending on how it's sized. So we have the edge piece here, we have the top edge, we have the rounded corner. So, all of these get copied and pasted when the procedural model is put together to get the final result.

But you can get more fancy than that. In fact, if you come over here and have a look at these pieces, you can see that these are much more complex in how they've been put together. These have been put together out of Roblox parts, and there's a metal edge and a bevel and some bricks, and the final result of that is something you can drag and drop easily and still have it be resizable, and it assembles those pieces together into something that's much more complex geometry.

If you really make your puzzle pieces shine, your procedural model is going to shine because it's literally just putting all those puzzle pieces together in a way that you're transforming and dragging, and the amount of edits you have to make to get final, good-looking geometry it is the same. This is the same amount of work as the original concrete block, but now it looks well, frankly, far better than what you'd want to have to put together by hand

This is good-looking bevel geometry with different materials and individual bricks, and you didn't have to do any of that. You just had to set up the initial procedural model, and then this all comes out of that for free. Is there more? There's definitely more. Okay, so this is as far as you can get in Roblox right now without doing anything sneaky. Oh, so this is the sneaky part of the video. We get up to the sneaky part.

## How Procedural Models work on Roblox: Sneaky techniques ([5:35](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=335s))

The thing is, procedural models are still under development right now. Procedural models normally can't tell where they are in the world and what other procedural models are around them. We have to use a plugin to give them a little bit more information so that they can share information between themselves as they're generating. So, when we do that, we can start getting into bigger result.

A building, just straight up drag and drop? Okay, so I just realized that we have this demo before we get to the sandboxing bit. That's okay. Is this a sneaky technique or not? This is not sneaky technique. This is still normal technique. So, sneaky's coming later though? Sneaky is the next one.

## How Procedural Models work on Roblox: Advanced puzzle pieces ([6:13](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=373s))

All right, we got ahead of ourselves. Can you make more puzzle pieces than just like the four sides of a box? Like, how far can you push this? One of the examples that I mentioned when we started this was that instead of having a block made out of concrete, one of the aspirational things is maybe you could have a block made out of building.

Roblox already comes with the Modern City demo where all of those buildings are made out of nice, templated pieces. That's kind of the perfect candidate to rebuild those buildings as procedural models. I can show you what that looks like here. This is exactly the same.

Instead of having a block made out of concrete or bricks, we can now have a block made out of building. Are you adding more windows? Yeah, I can start off with a one floor building where the doors are doors are on the bottom floor. As I drag this up, we have a skyscraper or a really big skyscraper or a massive skyscraper, and, yeah, we now have a block made out of building.

And you just programmatically say "when I drag it up, that means put in more windows" or that means "put in a wall and a window"? That's exactly right. All of these pieces came from prefabs out of the Modern City demo, and they already had things like edging for the top windows and doors on the bottom row, and these little cafe pieces. All it's doing is running around and grabbing those pieces and assembling it like a jigsaw puzzle to fill out the box that you're defining with the procedural model.

That makes a lot of sense for building and how we're basically having a bunch of different puzzle pieces to make a square look really cool, and a building is probably like the coolest thing that you could do for a square, but what if I don't have a block? Could I use this in a shape that's like, change of the silhouette beyond just like what this building? So, it would have a different shape like a T-shape?

That's difficult to do right now because procedural models can only be a block right now, and they're not aware of the other things in the workspace as you're working. But, if this is your own local project, you can help the procedural models out and share more information with them about the world, which is what I'm talking about when I say doing something a little bit sneaky.

You're really just giving more information to the procedural models with the plugin so that they can generate in different shapes and be more aware of the things around them as they generate.

## How Procedural Models work on Roblox: Sneaky techniques pt 2 ([8:17](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=497s))

If we go to demo number five, we've kept the buildings there, but now we have a procedural model here called grass, which is one of these new procedural models that is context aware, is aware of the world around it as it generates. As I drag this box of grass out, what it's doing is it's looking for places in the world where it can place grass in a crack or up against a crevice on the buildings.

Is part of the sneakiness that you just made the edges of the square transparent and then now fill that transparent square with other things and then have that transparent square go over your other squares? No. Ah, I thought I had it.

Okay, so the way this is working is the procedural model is still defining a big bounding box for all of the grass, but instead of going and filling out every single cell in the box with grass, it's going through and also, because it can now read the world as it's generating, you can have a look around and say, "Is this a good spot to put grass?" The rules that I have this grass set up for is saying, "Is this grass placed against a nice edge like in the corner between the ground and the wall?", and as we move around, we can see that it's consistently followed this.

Sorry for the flickering as we move here, but we can see that it's done a pretty good job of just finding nice little places to place grass that maybe you would have to place by hand once upon a time, but now you don't have to because you have a procedural model that can do it for you.

And to answer your question about having different shapes, we're still stuck with boxes, but because we can make it so that procedural models are aware of other procedural models when they generate, you can make it so that when these blocks go to generate, they can be aware of other bricks when they generate, which is the last demo that I'll show today.

As we look at this one, we can see that, this is similar to the other demos we had before, but now if we duplicate it and drag it out. Oh, did that seam go away? Yeah, that seam went away. Now, because as they've generated together, this procedural model here is aware of this procedural model here, and they cooperate and choose different tiles on the boundaries to end up with a more seamless look.

So because they're all from the like it knows like, "Hey, this other procedural model is here, and that means it's creating, this type of effect, which means I should use this puzzle piece instead." Yeah, you just cut in the edges. I just brought it in. Instead of having to manually go and place all of these tiles and handle all of this edging, we can just make it so that this procedural model as a whole is aware of all of the procedural models that are touching it at the same time, and then choose the correct tiles as it puts itself together.

That makes sense. I noticed there's a hole. I wasn't going to talk about the hole, but we can talk about the hole. Is the hole just, like, an inverse? An empty procedural model? Like, how do you get the hole? So, the procedural model is the same procedural model as the other bricks that make up this tile, but I've just got an attribute set up on it saying that this is a hole.

As I drag this out, it's like this whole volume will turn into a wall. As we resize it and we pull it out, as these procedural models update and generate, they're like, "Hey, there's a hole there. We're not going to fill this in with any tiles." And then that's where we touch the edges of the hole, we'll correctly put the border trims in.

That's like erasing out of your building. A whole tile! You can use this to very, very quickly make very good-looking geometry, but the underlying edits is still just a handful of edits to get to this result. All right, well, that's awesome. I'm a little sad that these are just squares and not, organic shapes, but I understand this is still new.

There's an open project file that people can like explore with this? Sure, I'll be sharing this project file for everyone to be able to come in and have a grab of it, and it also has the plugin source code that we talked about that allows procedural models to see each other.

## How Procedural Models work on Roblox: One more thing ([12:25](https://www.youtube.com/watch?v=gu1iPJmyMgA&t=745s))

But, one more thing, you're hung up on these organic shapes. There's something I can preview with you today that's not quite ready for release. Oh, super secret? More secret sneaky? More secret sneaky stuff. The cynical thought right now is like, this is cool, but I'm still stuck just making angular buildings, I can't make anything organic. I'm really wanting to talk about custom polygonal shapes, and like, we can't talk about it.

Okay, let's do the polygonal shapes then. Can we? Let's do the polygonal shapes because we're working on editable meshes right now. Editable meshes is a fantastic vehicle for doing organic shapes inside of Roblox. We have the same premise of using procedural models to have minimal amounts of edits, and then having much more complex geometry come out of it.

And in the case that you want, you want the organic model. The idea with this one is, this is not quite ready for production yet, but if we have this and we drag out the vertices, we can drag out and we can have kidney island, and instead of dragging out a box, we're dragging out a polygon primitive. Then we can stack these together, two kidneys together, and then we'll go and edit some attributes on this. There should be a height one here, can you see that?

We can drag this out and then we can adjust the height of it. We can make this one 40 tall. Instead of having your blocky Roblox geometry for minimal edits, we can now start having your much more complex organic geometry. This is a really nice polygon tool because it just has automatic adding of new vertices if you click in between two existing ones like that.

I love how you're saying how cool it is and then telling me we can't play with it. No, you definitely can't play with this yet. But once we have editable meshes ready to ship alongside procedural models, which is coming soon with the data model content API, once that's all ready to go, you'll be able to play with this as well. All right, I think that's the best final word we could hope for.

So, any other word besides that? Any other sneaky anything you can share? Use procedural models. They're excellent. Don't write them yourselves. AI agents can do it all for you. You just tell them what you want and you'll get what you want. Awesome. All right. Thanks, everybody. Bye-bye.
