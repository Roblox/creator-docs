---
title: Load Times
description: Explains common causes of long load times
---

Many experiences implement custom loading screens and use the
`Class.ContentProvider:PreloadAsync()` method to request assets, such as images,
sounds, and meshes, are downloaded behind the scenes.

The advantage of this is that it lets you ensure important parts of your experience are fully loaded without pop-ins. However, a common mistake is over-utilizing this method to preload more assets than are actually required.

An example of a bad practice is loading the _entire_ `Class.Workspace`. While this might prevent texture pop-ins, it significantly increases load time.

## Best Practices

Limit the usage of `Class.ContentProvider:PreloadAsync()` and only use it in
necessary situations, which include:

- Images in the loading screen. Preloading large amounts of assets can lead to
  unnecessarily long wait times on loading screens. If loading a large amount of
  assets is necessary, we recommended you provide a **Skip Loading** button.
- Important images in your experience menu, such as button backgrounds and icons.
- Important assets in the starting or spawning area.
