---
title: Onboarding
description: Learn how to design and optimize the First-Time User Experience (FTUE) using data-driven iteration.
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/XfxbdKtSbOI?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br />

**Onboarding**, also known as the First-Time User Experience (FTUE), comprises the first few minutes of gameplay that new players experience. The FTUE introduces the experience, interface, and mechanics, and may include tutorials that teach players how to play. The success of a FTUE is determined by how well it achieves two metrics:

- Day 1 retention
- Onboarding goals

## Day 1 retention

**Day 1 Retention** is gauged by the amount of players who make it through the FTUE, known as the **Player Funnel**. The funnel is widest at the top and narrowest at the bottom as fewer players complete each step. All experiences lose some amount of players along this path.

<img src="../../assets/game-design/onboarding/onboarding_1.png" alt="A diagram of an upside down pyramid that's broken into four sections that decrease in size from top-to-bottom to signify the tunnel of fewer and fewer players completing each step." width="70%" />

The onboarding experience aims to limit drop-off between steps and retain as many new players as possible. To identify and "plug" leaks in your funnel, you can use [Experiments](../../production/experiments.md). By running A/B tests on specific tutorial steps, you can measure the causal impact of different designs, such as a shorter dialogue sequence versus a guided arrow, to see which version leads to higher completion rates.

Experiences with high D1 retention metrics often owe that success to effectively accomplishing their onboarding goals through constant iteration and data-driven testing.

## Onboarding goals

Many of the most successful onboarding experiences follow these high-level practices:

- Teach the essentials
- Get to the fun quickly
- Leave players wanting more

### Teach the essentials

For successful onboarding, players need to grasp controls for navigation and interaction. Displaying complex, unfamiliar controls on-screen or incorporating them in a tutorial can be beneficial.

<figure>
    <img src="../../assets/game-design/onboarding/onboarding_2.png" alt="A close up view of UI in the Super Striker League experience that displays which buttons to press on your mouse or keyboard to complete various actions." width="70%" />
    <figcaption>[*Super Striker League*](https://www.roblox.com/games/3360853050/) controls.</figcaption>
  </figure>

Besides controls, onboarding should also impart knowledge of the experience's **Core Loop**, the repetitive actions for progress that define the experience. It is critical that players understand both _what_ they are expected to do and _why_ they should do it.

### Get to the fun quickly

New players typically decide their interest in an experience within minutes. To retain them, you must quickly demonstrate value through:

- Game progression
- Social motivators
- Starter items and currency

#### Progression

**Progression** is felt when a player gets better, gains access to new systems, and achieves goals. A great way to facilitate this is through _Player XP-Based leveling systems_.

<figure>
   <img src="../../assets/game-design/onboarding/onboarding_3.png" alt="A chart of the experience a player needs to level up in an experience. The curve increase exponentially from left-to-right." width="70%" />
    <figcaption>Player XP Level Up curve.</figcaption>
  </figure>

Keeping thresholds low for a player's early levels allows them to level up quickly and feel the fun of progression immediately. You can use **Configs** to tune these XP thresholds in real-time. This allows you to smooth out the progression curve or adjust rewards based on live player behavior without needing to restart servers or push a full update.

#### Social motivators

Social players often prefer onboarding experiences that provide opportunities for collaboration and competition. If your experience relies heavily on social interaction, consider using **Experiments** to test different matchmaking parameters during the FTUE to see which social groupings lead to better long-term engagement.

#### Starter items and currency

Providing free items like equipment or soft currency allows players to engage with your systems early. However, finding the right balance is vital. The goal is to give players the opportunity to enjoy the utility or self-expression afforded by those items to encourage future playtime.

By using **Experiments**, you can gift different starting amounts of currency to different groups of new players to see which leads to higher retention. Once you find the ideal balance, **Configs** allow you to update that starting value globally and instantly for all future players.

For more on core loops, see [Core loops](../../production/game-design/core-loops.md).

### Leave players wanting more

By the end of onboarding, players should be aware of the full range of content available. Designing these two characteristics effectively keeps players coming back:

- Goals
- Moments of joy

#### Goals

Providing short, mid, and long-term goals help players conceptualize future play sessions and envision their future success. These goals can take a number of different forms: skill trees, season passes, quests, collections, and more. Surfacing these goals in highly visible places, either in the game-world or the UI, provides a frequent reminder to players of what they're working towards.

To learn how to accomplish this through season passes, see [Season Pass Design](../../production/game-design/season-pass-design.md).

<figure>
    <img src="../../assets/game-design/onboarding/onboarding_4.png" alt="A pop-up UI in the Jailbreak experience that displays various items a player can earn if they play through a season. The season pass exclusive items are marked with a bright color to attract attention." width="70%"/>
    <figcaption>Season Pass in _Jailbreak_.</figcaption>
  </figure>

#### Moments of joy

Joy can be elicited through rewards, delightful animations, and celebratory visual effects when a player achieves a milestone. Ending the onboarding experience with an intentionally designed moment of joy leaves players feeling accomplished and excited to return for their next session.
