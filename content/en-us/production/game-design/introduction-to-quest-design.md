---
title: Introduction to Quest Design
description: Introduction to Quest Design, achievements, and dailies.
---

<figure>
     <iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/d4g30UupgKw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <figcaption>Introduction to quests, achievements, and dailies</figcaption>
    </figure>

<br />

Quests are a game mechanic in which players complete objectives in order to earn rewards like items, currency, or badges. Quests provide players with fresh goals and incentives, which can motivate them to play longer and more often, increasing their [engagement](../../production/analytics/engagement.md). They can also reduce boredom and provide a sense of progression and accomplishment that lead to better [retention](../../production/analytics/retention.md).

## Quest Structure

Structurally, quests consist of three components:

- **Objective:** The objective is a task that the player must complete in order to earn the reward. Collecting items, slaying monsters, and traveling to points of interest on a map are some common examples of quest objectives. Quests can consist of single objectives, or multiple.
- **Quantity:** The quantity is a modifier on the objective: collect 100 apples, slay 5 monsters, visit 10 players' homes. Quantity is one way to modify the difficulty of a quest, with larger quantities requiring more effort on the players' part in order to complete the objective.
- **Reward:** The reward is the incentive for players to complete the quest. Common rewards are experience points (XP), currencies like gold coins, consumables like health potions, and other items of value. Generally, the more challenging the quest, the more valuable the rewards, so that players feel that the effort to complete the quest is worthwhile.

The structure of a quest can vary from a single task to multiple tasks, all of which a player must complete to earn the reward. They might also unlock additional quests upon completion, called a called a **quest chain**.

There are two common types of quests:

- **Achievements:** Also known as badges on Roblox, are single-task quests that often require significant time and effort to complete. Earning a particularly challenging achievement is a source of pride, and badges allow players to show off their accomplishments to others. Achievements can also act as an indicator of player progression, representing milestones that they have achieved throughout their journey in a game. To learn how to implement achievements in your experience, see [Badges](../../production/publishing/badges.md).

   <figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-0.png"/>
      <figcaption>Achievement badge in [*Jailbreak*](https://www.roblox.com/games/606849621/)</figcaption>
    </figure>

- **Dailies**: Also known as daily quests, these are short tasks with modest rewards that are available for and must be completed within 24-hours. Some daily quest systems provide the same quests every day, while others rotate quests to provide players with new objectives to avoid repetition. Dailies have simple objectives with low requirements for completion to encourage players to complete the quests in a single play session.
    <figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-1.png" width="70%"/>
      <figcaption>Daily quests in [*World // Zero*](https://www.roblox.com/games/2727067538/)</figcaption>
    </figure>

For these easy quests, small rewards are appropriate, due to the rate at which they're completed. Because they are available daily, Dailies can provide a reliable source of soft currency and incentivize players to log in every day.

## Use Cases

Though they use similar mechanics to task and reward players, quests, achievements, and dailies play complimenting roles in an experience. They actively:

- Provide goals
- Surface features
- Teach through tutorials
- Add session variety
- Create resource drip
- Increase engagement
- Facilitate progression
- Encourage new gameplay
- Deliver narrative

<figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-2.png" width="100%"/>
      <figcaption>Overlap of roles between quests, achievements, and dailies</figcaption>
    </figure>

### Provide Goals

One way to keep players engaged in a game is to provide them with a mixture of short, mid and long-term goals that allow them to feel frequent progress and give them something to aspire toward.

**Short-term goals** can be completed in a single play session and provide small, frequent moments of accomplishment. Because players must complete them within a single day, dailies should exclusively consist of short-term goals.

**Mid-term goals** require days to weeks of play to complete. Most quests, especially those with multiple objectives, fall somewhere between short-term and mid-term goals.

**Long-term goals** take months of play to complete. Many achievements represent long-term goals because they require significant time, effort, or skill to earn.

### Surface Features

By creating quests that require players to explore different areas of the game or complete certain tasks, you can draw attention to the full breadth of the game's features and content. This can be especially helpful for games with large worlds or complex systems, as players might not realize all the game has to offer.

In this example from [_Squishmallows_](https://www.roblox.com/games/7941853407/), one of the game's many locations, the campsite, is being surfaced. This quest might be the first time that a player learns that there is a campsite in the game, and the reward incentivizes them to explore the map to find it.

  <figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-8.png" width="30%"/>
      <figcaption>Quests in *Squishmallows*</figcaption>
    </figure>

### Teach through Tutorials

Quests can also teach players how to use those features by acting as tutorials. Quest-based tutorials have a number of advantages:

- Quests promote active learning, where players learn by playing, not just reading. Active learning results in better retention of the instructions, so players are more likely to remember what to do when they are on their own.
- Complex tasks can be broken into simple, discrete steps, each one a quest objective.
- Each feature can have its own quest or quest chain tutorial, allowing tutorials to be spread out over time.
- Quests track player progress through the tutorial, which provides valuable analytics data about where players might be struggling.
- Players feel good about learning to play, because they are rewarded for it.

<figure>
  <img src="../../assets/game-design/introduction-to-quest-design/quest-design-9.png" width="35%"/>
      <figcaption>Tutorial quest in [*RoCitizens*](https://www.roblox.com/games/137877687/)</figcaption>
  </figure>

### Add Session Variety

The longer a player plays a game, the more familiar they become with its systems and content. When players are incentivized to try new things, they are less likely to fall into gameplay routines that become boring over time. Quests can add variety to a player's session by encouraging them to engage with content or systems that they might not have otherwise, or to revisit ones that they have not engaged with recently. This can be especially helpful for games with repetitive gameplay, or those that have less frequent updates, but any game can benefit by keeping its players engaged and ensuring that all of its areas remain active.

  <figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-3.png" width="70%"/>
      <figcaption>Quests in [*The Wild West*](https://www.roblox.com/games/2317712696/)</figcaption>
    </figure>

### Create Resource Drip

A **resource drip** is a source that provides small amounts of virtual resources like currencies, XP, or crafting ingredients that add up over time, allowing players to plan their play sessions and resource spending around them.

Earning even small amounts regularly encourages players to spend because they know that there is always more to be found. When sources are scarce or too effort-intensive, it can discourage participation in the overall economy and lead to negative impressions about the fairness of the game's design.

An experience's economy is tied to its core loop. When a player engages with the core mechanics of the game, they naturally earn and spend resources. Players who do not have resources to spend cannot make the purchases that enable or enhance their activity in the rest of the game, such as upgraded tools and abilities. Facilitating investment in an experience's economy and a healthy interaction with the core loop can also lead to improved retention.

For these reasons, it can be beneficial to drip-feed resources to players over time, and one way to do that is through quest rewards. Dailies are an excellent delivery mechanism for currencies because the rewards are reliable, small, and valuable enough to encourage players to return every day.

<figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-7.png" width="70%"/>
      <figcaption>Daily quests in [*Adopt Me!*](https://www.roblox.com/games/920587237/)</figcaption>
    </figure>

### Increase Engagement

Limited-time content is any type of consumable or collectible content like quests, pets, or cars that are only available to players temporarily. If players do not earn or complete the content before time runs out, they might never have another opportunity. For that reason, limited-time content spurs engagement as players increase their efforts in a rush to beat the clock.

<figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-10.png" width="70%"/>
      <figcaption>Limited-time seasonal events</figcaption>
    </figure>

Because it is so effective at driving player engagement and monetization, limited-time content is an essential element of a game's live operations (LiveOps). Like other forms of limited-time content, quests that are only available for a brief time create a sense of urgency and excitement, encouraging players to log in regularly throughout the event's duration in order to earn the limited-time rewards. These temporary quests are common during seasonal events, such as Halloween or anniversary celebrations.

To learn more about live operations and maintaining and updating a live game, see [LiveOps Essentials](../../production/game-design/liveops-essentials.md).

### Facilitate Progression

A **progression system** can help players achieve them by promoting engagement with the game's [core loop](../../production/game-design/core-loops.md). As players engage with the core systems of the game, they progress through the loop and make progress on their own goals.

Quests can act as a progression system by providing a structured way to advance through the game's content. With each quest completed, players earn rewards like weapons or skill points that help to prepare them for the next challenge.

[Season Passes](../../production/game-design/season-pass-design.md) are progression systems that incorporate quests. In [_Dragon Adventures_](https://www.roblox.com/games/3475397644/), players complete quests called "missions" in order to earn points toward reward tiers. The quests are all activities that are tied to the core loop mechanics of hatching and raising dragons. As players progress through the tiers, they unlock more rewards, culminating in unlocking an exclusive dragon as the final season reward. Through this UI, players can track their progress through the tiers as the deadline for the end of the season approaches.

<figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-11.png" width="70%"/>
      <figcaption>Season pass progression in *Dragon Adventures*</figcaption>
    </figure>

### Encourage New Gameplay

Quests can encourage players to play the game in more interesting and challenging ways that they might not have tried before. In this example from Jailbreak, players are required to not only shoot down an enemy helicopter, but to do so while riding in a vehicle – a challenge that they might never attempt otherwise. As evidenced by the "impossible" rating, achieving this badge likely requires many attempts, during which the player is highly engaged.

  <figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-4.png" width="70%"/>
      <figcaption>Achievement badge in *Jailbreak*</figcaption>
    </figure>

These alternate gameplay goals can be especially engaging for experienced players who might have tried everything the game has to offer. Without new challenges, even the most dedicated players eventually grow bored and move on to other games. Achievements are one way to keep them engaged between content updates.

### Deliver Narrative

In addition to their objectives, quantities, and rewards, quests can optionally include **flavor text** that provides bits of narrative, and backstory about the game's world. While not strictly necessary, especially in games without narrative elements, story-based quests can enrich the player's experience and make them feel more immersed in the game world.

In [_Spellbound_](https://www.roblox.com/games/6468323505/), the player accepts a quest from an NPC named Moritor, who needs help retrieving a potion to cure his baldness. The text tells the player not just what to do, but why, and it does so in a way that contributes to the game's humorous tone and experience. Even the quest's reward, a hat, is thematically tied to the story.

  <figure>
      <img src="../../assets/game-design/introduction-to-quest-design/quest-design-5.png" width="70%"/>
      <figcaption>Quest narrative in *Spellbound*</figcaption>
    </figure>

## Resources

For a more in-depth look at quests, watch these workshop videos. They include tips for designing, writing, and producing quests, as well as developing a spreadsheet to make quest development more efficient.

<figure>
     <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/1stxDQeHhr8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <figcaption>Designing quests, achievements, and dailies</figcaption>
    </figure>

<figure>
    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/iWSZJSE2NEc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <figcaption>Writing quests, achievements, and dailies</figcaption>
    </figure>
