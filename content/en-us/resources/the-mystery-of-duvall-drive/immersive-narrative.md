---
title: Immersive Narrative
comments:
next: /resources/the-mystery-of-duvall-drive/streaming-in-immersion
prev: /resources/the-mystery-of-duvall-drive/materializing-the-world
description: Explains the narrative concepts used in The Mystery of Duvall Drive.
---

Like the [Beyond the Dark](../../resources/beyond-the-dark/index.md) demo, one of our earliest decisions was to have as much of the gameplay and story told diegetically within the world itself. This can be a difficult process when you want to balance both communicating progress to the player through the user interface while also making them feel as though they really are within the world you've built. To meet these goals for our experience, we broke the way we communicate information to players down into four techniques:

1. **Visual Cues** - Objects, images, or arrangement of assets that passively reinforce story or give hints to the player when it makes sense for the world.
2. **Lore** - When a player clicks/taps on specific items in the house, important story information displays **on the entire screen**. This narrative is only visible to the player that clicked/tapped the object. The tone is always informational in tone and phrasing.
3. **Thought Bubbles** - When a player clicks/taps on specific items in the house, a text dialogue "reaction" displays **near the object**. This narrative is only visible to the player that clicked/tapped the object. The tone is always first person and observational.
4. **Announcements** - When a player clicks/taps on a corrupted item in the house, third-person dialogue displays on **every player's screen at once**. This narrative sometimes transitions all players to the corrupted state of the room they are in.

In this section, we will demonstrate how we used these techniques and specific features to immerse players into our narrative while still encouraging exploration, communicating progress, and keeping gameplay both intimate to the individual player and fair in a multiplayer experience.

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/overview-visual-cues.png" width="80%" />

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/overview-announcement.png" />
    <figcaption>An announcement on-screen overlay of the character's internal thoughts.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/overview-thought-bubble.png" width="99%" />
    <figcaption>A thought bubble, or object-specific dialogue, that displays when you select certain objects.</figcaption>
  </figure>
</GridContainer>

## Visual Cues

A visual cue is an important tool to both reinforce narrative and tell players what they need to know about their objective **without using words**. Using an arrangement of assets, such as chalkboards, statues, and wallpaper, we were able to passively provide a depth of information about the main characters of Duvall Drive, as well as guidance on how to complete puzzles without having to include invasive UI elements. We began this process by first figuring out what we wanted to communicate to the player, then how it would make sense to communicate that within the world of our experience. For example, we wanted players to understand how obsessed the grandfather was in his mission to defy death, so we left his room in disarray with a lot of his research and several walls with his scribbled thoughts.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/grandfather-room.png" width="92%" />
    <figcaption>Scribbles throughout the grandfather's room communicate the grandfather's compulsive nature.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/dog-statue.png" />
    <figcaption>An abundance of sculptures and reference photos demonstrate how the daughter is an artist.</figcaption>
  </figure>
</GridContainer>

Our first rule was that if we wanted to use a visual cue to teach players something, it must have a reason to exist even if players aren't present. If we put a giant sign with clear instructions of what to do for a puzzle, this would seem out of place within the house. However, if we established a grandfather that is consumed with drawing on everything, including the walls of his bedroom, it is much more believable to have a chalkboard with his plan scribbled out for the player to follow.

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/chalkboard.png" width="60%" />

Our second rule was that we don't always need to tell players what to do or how to solve puzzles because they are insightful to their environment. For example, sometimes a fallen power line in a pool of water is enough of a visual cue to communicate that players are in danger of being electrified if they continue moving in that direction.

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/power-line.png" width="60%" />

## Lore

In addition to using visual cues to passively guide players, we also chose to display important story information about the family **on the entire screen** as a precursor to start the room's puzzle whenever a player clicked or tapped on specific items in the house. To guide players to the objects they needed to select in order for lore to display, we used the new highlight visual effect to make specific objects stand out from their surroundings. This effect allows you to either outline and/or overlay objects with a specific color that fits to the shape of the object itself, and choose whether other objects can hide the highlight if they are closer to the camera.

<GridContainer numColumns="4">
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/lore-1.png" width="80%" />
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/lore-2.png" width="80%" />
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/lore-3.png" width="92%" />
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/lore-4.png" width="92%" />
</GridContainer>

We initially used `Class.Highlight` for every object a player could interact with, but the visual noise was overwhelming and players wouldn't clearly know what to interact with to read the lore. We decided to only use it to highlight items that were either corrupted or dangerous, and this visual feedback allowed players to easily drive the story forward.

<figure>
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/dog-statue-lore.png" width="60%" />
  <figcaption>Fun fact: we originally had lore on everything you could click on! This wasn't helpful because players weren't sure what information was important and what was just for flavor. Eventually we removed much of the lore and used visual cues to leave the rest of the narrative to the player's imagination.</figcaption>
</figure>

After the player clicked on the object with the lore, we needed a way to display the information on top of the screen. We decided to create an overlay by using a `Class.ScreenGui` as our on-screen UI container with a child `Class.Frame` to control the sizing and rescaling of its children `Class.TextLabel|TextLabels` and `Class.ImageLabel|ImageLabels`. We set the positions and scale of the `Class.TextLabel|TextLabels` and `Class.ImageLabel|ImageLabels` properties so they fit visually together and would scale for different devices players use to access the experience. For information on how to use these UI elements, see [On-Screen UI Containers](../../ui/on-screen-containers.md), [Frames](../../ui/frames.md), and [Labels](../../ui/labels.md).

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/jacob-photo-album.png" width="60%" />

`Class.TextLabel|TextLabels` and `Class.ImageLabel|ImageLabels` affect visual elements of their respective text and images, including their color, transparency, size, and arrangement. For `Class.TextLabel|TextLabels` specifically, you can adjust their `Class.TextLabel.TextScaled` and `Class.TextLabel.RichText` properties to control the layout and visual styling of text. `Class.TextLabel.TextScaled` allows you to scale text to fill the entire parent UI element's space, and `Class.TextLabel.RichText` allows you to use simple markup tags to style sections of text in bold, italics, color, or even different fonts! For more information, see [Automatic Sizing](../../ui/automatic-sizing.md#textscaled) and [Rich Text Markup](../../ui/rich-text.md).

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/lore-template.png" width="100%" />

We knew that players would be accessing this experience from a variety of devices, including PC, console, and mobile devices, and they would need to be able to either click or tap the screen to interact with the experience. We didn't want a bunch of buttons on the screen to distract from the narrative, so we made an invisible back button the size of the entire screen so that players could either click or tap anywhere on the lore overlay to close the content and get back to gameplay.

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/overlay-back-button.png" width="30%" />

## Thought Bubbles

We needed a way for the player's character to communicate ideas to the player, such as providing additional narrative flavor or reinforcing what they needed to do. Our solution was to display thought bubbles, or **text reactions from the player's character**, near non-lore objects whenever the player selected them. This narrative only displays to the player that clicked or tapped the object, and the tone is always first person and observational.

<figure>
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/barn-owl-thought-bubbles.png" width="70%" />
  <figcaption>A relatively simple yet powerful system to have the world react to the player's interactions!</figcaption>
</figure>

To create thought bubbles, we parented a `Class.BillboardGui` with a child `Class.TextLabel` to non-lore objects. This allowed us to display dialogue in the 3D space near the object without the text taking up the entirety of the screen. Similar to our process in creating lore, we used the `Class.TextLabel.RichText` property to style the text and add visual effects like another otherworldly being interrupting the player's own thoughts. The following is an example of RichText HTML used to make the image below.

`"What is…this…<br/><stroke color="#dcc7ff" joins="miter" thickness="2" transparency="0.5"><font size="60"><font color="rgb(10,8,11)"><i>....hunger….void….pull…</i></font></font></stroke>`

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/richtext-thought-bubble.png" width="80%" />

By using `Class.TextLabel|TextLabels` instead of images, we kept the text readable by Roblox, and we were able to auto-localize this content and make it accessible to many more players without having to do anything! For more information on this process, see [automatic translations](../../production/localization/automatic-translations.md).

## Announcements

While we wanted the player's character to have reactions to the world, we also wanted the world itself to react to their presence. To meet this goal, we included announcements, or third-person dialogue, that displays **on every player's screen at once**. Similar to lore, we created announcements by using a `Class.ScreenGui` as our on-screen UI container with a child `Class.TextLabel`. We also used the `Class.TextLabel.RichText` property to change the dialogue's color, font, and size to help convey different "entities" talking to the players in the house.

<figure>
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/announcements-white.png" width="80%" />
  <figcaption>Announcements with plain white text were the player's character reaction that was general to an area, not an object like the lore narrative technique.</figcaption>
</figure>

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/announcements-purple.png" width="95%" />
    <figcaption>Announcements with purple text were the reaction from a corrupt entity.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/announcements-yellow.png" />
    <figcaption>Announcements with yellow text were the reaction from a restored entity.</figcaption>
  </figure>
</GridContainer>

By using the `Class.TextLabel.RichText` property and providing some HTML commands in it to drive changes, we were also allowed to make changes mid-sentence! For example, the following rich text markup allowed us to interrupt the player character's reaction by the corrupt entity's thoughts:

`What is…this…<br/><stroke color="#dcc7ff" joins="miter" thickness="2" transparency="0.5"><font size="60"><font color="rgb(10,8,11)"><i>....hunger….void….pull…</i></font></font></stroke>`

<img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/announcements-interrupt.png" width="70%" />

We had several of these types of announcements, either triggered by invisible part volumes that players walked into, or by completing certain goals. To avoid dozens of individual `Class.ScreenGui|ScreenGuis`, we used a separate script in the demo that allowed us to provide the text that the script would then add to a single object we named **StoryNote** in our `Class.PlayerGui` folder. This object was a single `Class.ScreenGui` with a child `Class.TextLabel`. Using scripting, we could inject whatever phrases we wanted directly into the single `Class.TextLabel`, which made it a lot easier to make changes as we figured out how and what we wanted to communicate to the player!

<figure>
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/storynote-object.png" width="100%" />
  <figcaption>StoryNote was an object we called for any instances that triggered it via script. Those same scripts provided the text and formatting we wanted for each event.</figcaption>
</figure>

<figure>
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/example-script.png" width="100%" />
  <figcaption>Example of a script calling that object and defining the text, per event.</figcaption>
</figure>

<figure>
  <img src="../../assets/resources/mystery-of-duvall-drive/immersive-narrative/blank-textlabel.png" width="100%" />
  <figcaption>The TextLabel was actually blank, and using scripts we injected the RichText as needed to the same object.</figcaption>
</figure>
