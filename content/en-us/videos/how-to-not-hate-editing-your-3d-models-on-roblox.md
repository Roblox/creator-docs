---
title: How to not hate editing your 3D models on Roblox
description: 'Spoken captions; API names can be wrong. Learn how to save time when reimporting 3D models in your Roblox development workflow by using the reimport tool. Covers: scaling, coloring, and welding after import, changing the door in Blender, re-import in place from the new file.'
date: '2026-06-17'
transcript: true
related:
  - art/modeling/reimport.md
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/uElRpN1ZQ-4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Spoken captions of [How to not hate editing your 3D models on Roblox](https://www.youtube.com/watch?v=uElRpN1ZQ-4), published on the [Roblox Creators YouTube channel](https://www.youtube.com/@RobloxCreators) on June 17, 2026. API names in these captions can be wrong.

Prefer the written documentation: [Reimport](../art/modeling/reimport.md).

## How to not hate editing your 3D models on Roblox: Introduction ([0:00](https://www.youtube.com/watch?v=uElRpN1ZQ-4&t=0s))

In today's video, we'll learn how re-import can save us an enormous amount of time when iterating on 3D models. Hi, I'm Frank. I'm an engineer working on import tools in Roblox Studio, and today I'd like to teach you about our newest feature, re-import. I'll be demonstrating re-import using a simple 3D model I made of a door. First, we'll import the model and set it up in Studio so that it looks and behaves like a door. Then, we'll make some changes to our model in Blender and use re-import to update it effortlessly in Studio.

## How to not hate editing your 3D models on Roblox: Import the model ([0:31](https://www.youtube.com/watch?v=uElRpN1ZQ-4&t=31s))

This is what our model looks like immediately after importing. The first thing we're going need to do is to scale it up so that it's the right size for a character to go through. Next, we're going to want to color the individual mesh parts. Now, we need to weld the handle to the door so it doesn't fall off. Next, we need to anchor the wall so that it doesn't fall down. Finally, we need to add a hinge between the door and the wall so that it can swing freely. Now, let's test our door and make sure that it works.

## How to not hate editing your 3D models on Roblox: Import the model ([1:37](https://www.youtube.com/watch?v=uElRpN1ZQ-4&t=97s))

All right, we have a working door. Now that we have a working door, maybe we'd like to add some windows in the top half of the door. To do this, we'll have to go back to Blender.

## How to not hate editing your 3D models on Roblox: Change the model ([1:47](https://www.youtube.com/watch?v=uElRpN1ZQ-4&t=107s))

In Blender, I've updated the door model so that it has four little windows in the top half. In order to do this, I had to punch out four holes in the door and then put individual window panes inside those holes. Let's export this from Blender and import it in Studio. Without re-import, we would have to import our updated file as a brand new model and then redo all of the work that we just did in order to set our door up. This would be extremely tedious.

## How to not hate editing your 3D models on Roblox: Reimport the model ([2:20](https://www.youtube.com/watch?v=uElRpN1ZQ-4&t=140s))

Instead, by using re-import, we can update this model in place with just the changes from Blender. First, we'll right-click our model, go to the re-import sub menu, and click configure. Here, we'll want to update the file path to pick the new file we just exported. Next, we can click save and re-import and watch it all happen automatically. Notice how re-import updated only the parts of the model that needed to be updated. We've kept the colors and the various constraints that we added, such as the weld constraints between the handle and the door the and the hinge between the door and the wall. All that's left to do is for us to properly set up the new window panes that we created from Blender. First, we'll turn them to glass. Finally, we'll weld them to the door so they don't fall off. Now, let's test our door with our new windows.

## How to not hate editing your 3D models on Roblox: Reimport the model ([3:27](https://www.youtube.com/watch?v=uElRpN1ZQ-4&t=207s))

Our door now has windows and still swings properly without having to redo any of the work we had done originally. The re-import configuration gets automatically set anytime you import a 3D model. If you made any changes to it like we just did here, those changes are saved with the model and will persist across Studio sessions. We now have the ability to make changes and easily update this model from external changes. We can now easily make further changes to our door and update them in studio without having to redo any of our existing work. For example, we can add a bevel inset in the bottom of the door, export, and re-import. This time, I'll use the hotkey, which by default is Alt Shift R. And we notice our door automatically update in place from the changes that we just made. I hope you will be able to leverage it to make your 3D modeling experience easier and more fun, and I look forward to seeing the awesome stuff you build with this.
