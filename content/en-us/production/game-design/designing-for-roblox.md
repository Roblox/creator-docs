---
title: Designing for Roblox
description: Explains overall concepts for designing experiences on Roblox.
---

Roblox is unique, and the expectations and behavior of its user base can be confusing at first. Understanding what informs this is critical to achieving success on the platform. Your designs should reflect the unique strengths of Roblox to thrive within it, and is done by performing the following:

- Designing for behavior
- Designing for the audience
- Designing for the engine

## Designing for Behavior

Each experience on Roblox exists within the **wider context** of the platform and its catalog, with users often hopping from one experience to another with friends. Always consider the way that user behavior on Roblox reflects this when designing an experience.

<h4>First Time User Experience (FTUE)</h4>

Because experiences are so easy to join and leave, FTUEs that get users into the fun quickly tend to do better on Roblox. Lengthy, detailed tutorials are liable to bore users and cause them to bounce off your experience in search of something more immediately engaging. Ensure that any tutorials you do include are as visual as possible to make it easier for less experienced readers. This visual emphasis also simplifies translation.

Be conscious of the norms of your genre. The closer your design patterns and user experience are to the most popular experiences in that genre, the less you have to explain upfront, and the more intuitive your experience becomes to seasoned Roblox users. Bear in mind that users often help each other out and fill in the gaps of what you don't explain explicitly, either through socializing off-platform or through the in-experience chat.

<h4>Social Interaction</h4>

Many users treat Roblox as a place to hang out with their friends. Creating an experience conducive to social interaction encourages this kind of engagement and helps to grow your audience as users invite their friends to play with them. You can even make invitations a feature of your gameplay through mechanics such as parties and trading.

Encouraging social gameplay can also help with **retention**, as users can act as evergreen sources of content for each other. Many popular role-playing experiences such as [Brookhaven](https://www.roblox.com/games/4924922222/) focus on providing users with the tools they need to interact with each other within the experience, and these interactions become the spontaneous content that keeps users coming back. For these reasons, single-player experiences often find it harder to build and retain an audience on Roblox.

Users spend a lot of time and money on their avatars and typically want them to be seen by their friends and other users. A common identity across the platform is part of what makes Roblox special, so if you're going to change that for your experience, make sure you have a good reason.

To learn how to implement custom avatars in your experience, see [Customizing Avatar Appearances](../../characters/appearance.md).

Ensure you don't get in the way of social interaction with your design or monetization strategies. For instance, avoid making private servers prohibitively expensive, as this may discourage groups of friends from playing together.

To learn how to implement private servers into your experience, see [Private Servers](../../production/monetization/private-servers.md).

<h4>Tourists and Locals</h4>

In terms of their behavior, it can be helpful when designing to think of Roblox users in two categories:

- **Tourists:** Tourists typically hop from one experience to another, prioritizing variety over depth.
- **Locals:** Locals are more likely to focus on a particular experience or smaller set of experiences. They engage more deeply and typically form almost all an experience's engaged user base.

Bear in mind that many locals start out as tourists and convert, so don't neglect tourists in your designs and monetization strategies. For more about monetizing your experience, see [Earning on Roblox](../../production/earning-on-roblox.md).

## Designing for the Audience

Understanding the sometimes surprising expectations of the Roblox audience is essential to designing effectively for them. While Roblox has traditionally had a younger audience, there is a growing opportunity to create experiences that appeal to older Roblox users. For more about the Roblox audience, see [The Roblox User Base](../../production/roblox-user-base.md).

<h4>Younger Audiences</h4>

Younger users tend to be more interested in exploration, experimentation, and socializing than they are in competition or specific goals. Younger audiences consume content differently, informed by the instant content of social media and YouTube and driven by online interaction with their friends, and Roblox reflects this.

Watch kids playing Roblox if you want to understand what makes it work. Many top experiences on the platform may seem simplistic to older audiences, but they typically tap into common childhood experiences. For instance:

- [Brookhaven](https://www.roblox.com/games/4924922222/) is a roleplaying game that resembles playing "house."
- [Islands](https://www.roblox.com/games/4872321990/) gives users a building set, similar to Legos.
- [Jailbreak](https://www.roblox.com/games/606849621/) is a deeper version of "cops and robbers."

Weirdness and creativity are a core part of Roblox culture, shaped by the openness to experimentation of its younger users. While iterating on proven designs and themes is still a relevant strategy on Roblox, strange and innovative experiences can find more success on Roblox than they would elsewhere. You may have encountered a number of interesting genres unique to Roblox, and many of the expectations which characterize the content on other platforms are not shared by younger users.

While stunning visuals can help your experience make a good first impression, the most important thing is to make sure it is fun to play. Younger users are often less sensitive to visual fidelity and more likely to stick around if they're having a good time, regardless of how your experience looks.

<h4>Older Audiences</h4>

While Roblox's user base was built on its younger audience, that audience is growing older every day. Many experiences are finding increasing levels of success in appealing to older Roblox users, which often involves a greater overlap with the genres and norms common to other platforms.

Older users are more likely to invest more in your experience in terms of both engagement and monetization. Older users are the foundation of the communities that form around experiences, and are more likely to convert from tourist to local. Some top experiences which appeal to older users include:

- [Phantom Forces](https://www.roblox.com/games/292439477/), a realistic multiplayer first-person shooter.
- [Arsenal](https://www.roblox.com/games/286090429/), a fast-paced arcade-style shooter with rotating weapons.
- [Doors](https://www.roblox.com/games/6516141723/), a procedural survival horror game.

Though older users' interests overlap more with content on other platforms, don't just port an experience from another platform without catering to the unique characteristics of Roblox. An experience which has succeeded elsewhere is not necessarily guaranteed to succeed on Roblox without some contextual adjustment, for instance by slimming down upfront tutorials and emphasizing social gameplay.

<h4>Influencers</h4>

Many Roblox users count Roblox and YouTube as their top two content platforms. Users often follow their favorite YouTubers into new experiences, especially if it looks like a lot of fun.

Consider how your experience might work in a streaming context when designing: could a streamer make great, fun content with it? Can they easily involve their friends, or other streamers? Can you make their job easier? For instance, [Brookhaven](https://www.roblox.com/games/4924922222/) has a "Creator Cam" where content creators can hide the UI when they're recording a video. For more about promoting your experience, see [Promoting on Roblox](../../production/promotion/index.md).

## Designing for the Engine

While Roblox Studio offers a multitude of features for creating ambitious experiences with high-end visuals, it's wise not to lose focus on performance on lower-end devices. Most users play Roblox on mobile devices, and the audience is sensitive to friction and load times, so be conscious of performance in your designs.

Roblox Studio makes it easy to prototype your experiences through solid modeling and the Toolbox. These tools are invaluable for testing and iteration.

For more information, see the following resources:

- [Solid modeling](../../parts/solid-modeling.md)
- [Toolbox](../../projects/assets/toolbox.md)
- [Prototyping](../../production/game-design/prototyping.md)

<h4>UI and UX</h4>

The majority of Roblox users play on a mobile device, so it's wise to design your user interfaces (**UI**) and user experience (**UX**) around mobile devices first. If you want to cater to Xbox/PlayStation or Windows/Mac users, bind commonly used actions to shortcuts on a gamepad and specific keys on keyboards.

For more information, see [Input and Camera](../../input/index.md)

All Roblox experiences share a few **core UI** elements, such as the chat and player list. Test your own UI regularly to make sure you avoid conflicting with where they sit on the screen, or disable anything you don't want to show. Many experiences share similar UI patterns, such as having inventory slots along the bottom of the screen. Replicating these patterns will ensure experienced Roblox users will intuitively understand how to use your interface.

Use consistent icons as much as possible, and keep everything as visual as you can. Many younger users struggle to read text-heavy interfaces, and regardless of ability many younger users are more reading-averse. Visual UI is also easier to translate for international audiences.

For a detailed discussion of UI and UX principles on Roblox, see [UI and UX](../../production/game-design/ui-ux-design.md).

<h4>Genre Examples</h4>

The following table includes descriptions and examples of common genres found in gaming experiences on Roblox. These categories are not exclusive and names are not fixed.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Action</td>
      <td>Centered around combat between players. Single-player action games are rare. Generally less popular on Roblox than other platforms.</td>
      <td><a href="https://www.roblox.com/games/286090429/">Arsenal</a></td>
    </tr>
    <tr>
      <td>Customization</td>
      <td>Common central mechanic where gameplay is focused on looking for customization options. Often found in the context of 'dressing up' and shopping for clothes.</td>
      <td><a href="https://www.roblox.com/games/568350650/">Fashion Famous</a></td>
    </tr>
    <tr>
      <td>Hide and Seek</td>
      <td>Players hide from an enemy, either controlled by another player or non-playable character. Often combined with puzzle elements or obstacles.</td>
      <td><a href="https://www.roblox.com/games/4623386862/">Piggy</a></td>
    </tr>
    <tr>
      <td>Obby</td>
      <td>Shorthand for "obstacle course" and known on other platforms as a "platformer". Requires players to climb, jump and navigate obstacles to reach the end of the course.</td>
      <td><a href="https://www.roblox.com/games/1962086868/">Tower of Hell</a></td>
    </tr>
    <tr>
      <td>Roleplaying</td>
      <td>Often focused on building and exploring, with some including content from other genres. Typically more expressly oriented around imaginative social roleplaying than story-based 'RPGs' on other platforms.</td>
      <td><a href="https://www.roblox.com/games/4924922222/">Brookhaven</a></td>
    </tr>
    <tr>
      <td>Simulator</td>
      <td>A genre where players perform simple, repetitive actions in order to make progress. The goal often involves clicking an item in the world until it reaches its maximum level, then exchanging that item for an upgraded version with higher maximum potential. Comparable to "clicker" games, which are also popular.</td>
      <td><a href="https://www.roblox.com/games/1537690962/">Bee Swarm Simulator</a></td>
    </tr>
    <tr>
      <td>Survival</td>
      <td>Players attempt to survive or escape external obstacles, such as environmental hazards.</td>
      <td><a href="https://www.roblox.com/games/189707/">Natural Disaster Survival</a></td>
    </tr>
    <tr>
      <td>Tycoon</td>
      <td>Players collect from "droppers" that produce currency over time, in order to pay to construct something. As each part is constructed, new parts and droppers unlock for purchase. This cycle of collecting, building, and waiting to collect continues until there are no more additions left to build.</td>
      <td><a href="https://www.roblox.com/games/13822889/">Lumber Tycoon 2</a></td>
    </tr>
  </tbody>
</table>
