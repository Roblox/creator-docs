---
title: Onboarding
description: Onboarding
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/XfxbdKtSbOI?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br />

Onboarding, also known as the First-Time User Experience (FTUE), comprises the first few minutes of gameplay that new players experience. The FTUE introduces the experience, interface and mechanics, and may include tutorials that teach players how to play. A FTUE's success is determined by how it accomplishes two factors:

- Day 1 retention
- Onboarding goals

## Day 1 Retention

**Day 1 Retention** is gauged by the amount of players who make it through the FTUE, known as the **Player Funnel**. The funnel is widest at the top and narrowest at the bottom as fewer players complete each step. All experiences lose some amount of players along this path.

<img src="../../assets/game-design/onboarding/onboarding_1.png" width="50%" />

The onboarding experience aims to limit drop-off between steps and retain as many new players as possible to increase potential concurrent users, daily active users (DAU), and an experience's monetization potential. The Day 1 (D1) retention metric counts players who return the next day and measures onboarding success by gauging its impact on new players. Experiences with high D1 retention metrics often owe that success to effectively accomplishing their onboarding goals.

## Onboarding Goals

Although onboarding experiences are as varied as the experiences they introduce, many of the most successful ones follow these high-level practices:

- Teach the essentials
- Get to the fun quickly
- Leave players wanting more

### Teach the Essentials

For successful onboarding, players need to grasp controls for an experience's navigation and interaction. Displaying complex, unfamiliar controls on-screen or incorporating them in a tutorial can be beneficial.

<figure>
    <img src="../../assets/game-design/onboarding/onboarding_2.png" width="50%" />
    <figcaption>[*Super Striker League*](https://www.roblox.com/games/3360853050/) controls.</figcaption>
  </figure>

Besides controls, onboarding should also impart knowledge of the experience's **Core Loop**, the necessary repetitive actions for progress that defines what the experience is. It's important that players understand both what they are expected to do and why they should do it.

### Get to the Fun Quickly

New players typically decide their interest in an experience within minutes. To retain these players, it's vital to quickly demonstrate an experience's value, which is often determined by how "fun" it is, in order to convince the player to continue playing. Designing for fun is often done through the following:

- Game progression
- Social motivators
- Starter items and currency

<h4>Progression</h4>

**Progression** is felt by a player when they get better at the experience, gain access to new systems and content, and achieve their goals. A great way to facilitate this is through _Player XP-Based leveling systems_.

Player XP-based leveling systems allow players to earn experience points based on their activity, level up when they hit certain XP thresholds, and unlock rewards. Keeping thresholds low for a player's early levels allows them to level up quickly, receive rewards for their efforts, and feel the fun of progression early in the experience.

<figure>
   <img src="../../assets/game-design/onboarding/onboarding_3.png" width="50%" />
    <figcaption>Player XP Level Up curve.</figcaption>
  </figure>

<h4>Social Motivators</h4>

For many Roblox players, playing with others is part of the fun, whether they are joined in an experience by friends or interacting with strangers. These social players often prefer onboarding experiences that provide opportunities for collaboration and competition.

<h4>Starter Items and Currency</h4>

Providing free items like equipment and avatar customizations in the onboarding experience allows players to experience the fun of those systems early. The items can be low level and few in number, such that players will want to upgrade or exchange them quickly. The goal is to give players the opportunity to enjoy the utility or self-expression afforded by those items to encourage future playtime.

A similar approach can be used in experiences that utilize _soft currencies_. Soft currencies are the most commonly found currencies in free-to-play games. Players can earn them easily and they are widely available from rewards in the experience's _core loop_. Giving players a small amount of soft currency in the onboarding experience alongside a selection of purchasable items that they can afford, allows them to quickly engage with the monetization system and see the value of earning more currency.

For more on core loops, see [Core Loops](../../production/game-design/core-loops.md).

### Leave Players Wanting More

By the end of the onboarding experience, players should be aware of the full range of experiences that an experience offers. Even if they cannot access all of the systems and content yet, knowing that there are more challenges and rewards on the horizon encourages them to continue to invest their time in the game. Designing these two characteristics effectively keep players coming back:

- Goals
- Moments of joy

<h4>Goals</h4>

Providing short, mid, and long-term goals help players conceptualize future play sessions and envision their future success. These goals can take a number of different forms: skill trees, season passes, quests, collections, and more. Surfacing these goals in highly visible places, either in the game-world or the UI, provides a frequent reminder to players of what they're working towards.

To learn how to accomplish this through season passes, see [Season Pass Design](../../production/game-design/core-loops.md).

<figure>
    <img src="../../assets/game-design/onboarding/onboarding_4.png" width="50%"/>
    <figcaption>Season Pass in [*Jailbreak*](https://www.roblox.com/games/606849621/).</figcaption>
  </figure>

<h4>Moments of Joy</h4>

Joy can be elicited in experiences during moments like leveling up, defeating a boss enemy, finding a rare item, or discovering a new region. Those moments can be made joyful and special through rewards, delightful animations, and visual or auditory effects that celebrate players' achievements. Ending the onboarding experience with intentionally designed moments leave players feeling accomplished and excited to return.

## Onboarding Techniques

### Contextual Tutorials

Contextual tutorials, also known as "just in time" tutorials, are tutorials triggered by normal play, such as entering a new map zone or picking up a new weapon. By waiting for players to engage naturally, contextual tutorials personalize instruction, which maximizes their relevance and utility. Contextual tutorials facilitate:

- **Increased learning retention:** Players learn best by understanding the context of a situation and by interacting with tutorials that are triggered by their first interaction with a game feature. When players practice actions while learning them, they retain knowledge better.
- **Faster onboarding:** It's important to lead players to the enjoyable parts of an experience quickly to keep them engaged.Contextual tutorials allow designers to avoid lengthy onboarding systems and delay unneeded tutorials, enabling players to begin having fun more quickly.
- **Reduced cognitive load:** In the first few minutes of a game, new players often must learn many things like interactions, mechanics, and goals. The more they have to learn, the harder it becomes to retain it all, increasing the likelihood of feeling overwhelmed and quitting. Delaying non-essential information to future sessions reduces what they must learn and remember in the first session, allowing them to focus on the essentials.

Traditional tutorial flows guide players in a fixed sequence through an experience's features, ensuring that they learn essential skills and knowledge. While this method can be effective for high level concepts, it can lead to boredom or frustration due to restricting player choice. Contextual tutorials enhance the experience by holding off on less crucial instructions and quickly handing control to the player, by only providing specific instructions to the relevant players.

<br />

<h4>Use Cases</h4>

In [_Squishmallows_](https://www.roblox.com/games/7941853407/), contextual tutorials are used to effectively teach players how and when to use the combination station. When a player has two identical Squishmallows in their inventory, a contextual tutorial triggers, and shows players how to combine three _Squishmallows_ at the combination station in order to create a larger one.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/game-design/onboarding/onboarding_5.png" width="100%"/>
    <figcaption>Contextual combination station tutorial in *Squishmallows*.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/game-design/onboarding/onboarding_6.png" width="100%"/>
    <figcaption>Contextual combination station tutorial in *Squishmallows*.</figcaption>
  </figure>
</GridContainer>

If the developers included this tutorial in the onboarding experience, it would make it too long and irrelevant, and players may forget the information before they can use it. Presenting the tutorial when players have the required _Squishmallows_ encourages immediate action at the combination station, and helps players remember the process for future use.

Contextual tutorials also teach non-core concepts, letting players learn about these features by themselves. In _Squishmallows_, these tutorials explain the marketplace where players sell Squishmallows to each other for in-game currency. Since the marketplace mainly serves mid and late-game players trading rare or high-level Squishmallows, the developers introduce new players to the marketplace through contextual tutorials when they find it on their own.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/game-design/onboarding/onboarding_7.png" width="100%"/>
    <figcaption>Contextual market tutorial in *Squishmallows*.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/game-design/onboarding/onboarding_8.png" width="100%"/>
    <figcaption>Contextual market tutorial in *Squishmallows*.</figcaption>
  </figure>
</GridContainer>
