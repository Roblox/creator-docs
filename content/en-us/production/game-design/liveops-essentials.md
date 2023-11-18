---
title: LiveOps Essentials
description: LiveOps Essentials is an overview of what live ops are and how to think about designing them effectively.
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/kNE757v3Bwg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br />

**Live operations** (LiveOps) is the post-launch support of an experience to maintain player engagement. LiveOps consist of:

- A content cadence
- Major updates
- Quality of life improvements
- Bug fixes

Without LiveOps updates, even dedicated players lose interest. After completing all challenges and consuming all content, they grow bored. A blend of LiveOps updates following [best practices](#best-practices) keeps the game fresh and engaging.

## Content Cadence

_Content cadence_, the regular release of new content in a live game, varies based on developers' capabilities, ranging from weekly to monthly releases. These frequent introductions of fresh content aim to keep players engaged between major updates.

<figure>
    <img src="../../assets/game-design/live-ops/live-ops-1.png" width="70%"/>
    <figcaption>Content cadence in *Jailbreak*</figcaption>
  </figure>

Content Cadence releases exclusively build on existing systems, which:

- Sustain these systems and encourage ongoing player interaction.
- Allow programming and design resources to concentrate on creating new systems for the upcoming major update.
- Reduce production and debugging time for each update, enabling a maintainable release cadence.

When choosing content for cadence releases, look at art assets that support current systems. Creating pets, vehicles, weapons, maps, and quests tends to be straightforward and timely for games with these systems. Additional cadence content types include:

- Limited-time events: Limited-time events are content that's available for a restricted period that players can earn or purchase. This temporary availability incentivizes players to engage with the content and imparts prestige to those who acquire it.
- Seasonal content: Season content is a limited-time event themed around seasons and holidays. Given the numerous seasonal events occurring yearly, they serve as popular sources for cadenced content.
- User-generated content (UGC): UGC content is content that the experience's player community creates themselves, often through contests and events.

Each game has a unique content cadence, based on its specific systems, player preferences, and developer capabilities. Striking a balance between player desires and what developers can reliably deliver is crucial.

For a more in-depth discussion of the design and production of content releases, see [Content Updates](../../production/game-design/content-updates.md).

## Major Updates

Unlike content cadences, which involve artists creating content to support existing systems, major updates engage artists, designers, and programmers to provide new or expanded systems that alters the gameplay experience.

<figure>
    <img src="../../assets/game-design/live-ops/live-ops-2.png" width="70%"/>
    <figcaption>Major update in *Jailbreak*</figcaption>
  </figure>

Major updates aim to introduce new, permanent systems that evolve gameplay and both retain existing players while attracting new ones. Given their scope, major updates demand significant investment and may necessitate many months of development between releases. Types of major updates include:

- Social: Systems like guilds, groups, trading, and parties promote player interaction and collaboration. By participating in these systems, players provide content for each other, introduce variety into gameplay sessions, and form friendships, all of which encourage repeat visits to the game.

- Competitive: Systems such as player versus player (PVP), leaderboards, and tournaments give players ways to measure themselves against other players.

- Collections and achievements: Systems introducing new short, mid, and long-term completionist goals, like collectible pet or season pass systems.

- Live Events: Large, time-limited events aimed at attracting new players and re-engaging lapsed ones through a game shakeup, such as map overhauls or new player roles.

## Quality of Life Improvements

While content cadence and major updates introduce new content and systems into the game, quality of life (QoL) updates involve polishing the existing experience, making it more usable and enjoyable for players. Although typically smaller than other update types, QoL updates can have an outsized impact on the gameplay experience, and contribute significantly to player goodwill.

<figure>
    <img src="../../assets/game-design/live-ops/live-ops-3.png" width="70%"/>
    <figcaption>Quality of life update in *Doors*</figcaption>
  </figure>

Some examples include:

- Improved user interface (UI) layouts
- Optimized user experience (UX) flows and interactions
- Aesthetic refreshes
- Accessibility features
- Performance improvements

Quality of life updates may be released as needed, or as developers find time between other releases.

To identify high-value opportunities for quality of life updates, gather player feedback about common frustrations and time sinks. Developers may also have their own wishlists of improvements to consider.

## Bug Fixes

Bug fix updates address implementation issues and ensure that the game is functioning as intended. Bugs can range from minor issues that do not impact gameplay, like typos in non-critical text, to major problems that completely shut down the game.

<figure>
    <img src="../../assets/game-design/live-ops/live-ops-4.png" width="70%"/>
    <figcaption>Bug fixes in *Doors*</figcaption>
  </figure>

When prioritizing bugs to work on, consider their severity (how drastically they impact the gameplay experience), how much time and effort they require to fix, and the number of players impacted.

## Best Practices

Consider doing the following when deciding the type, content, and frequency of your LiveOps updates:

- Listening to players
- Improving gameplay
- Prioritizing mental health

<h4>Listening to Players</h4>

Although the developers are the ultimate vision-holders, players are a good source of insight for growing and improving a game. When determining the next update, consider:

- What do players want added to the game?
- How can their experience be improved?

Game groups and social media like Guilded allow developers to connect with players and gather their feedback. Even more important than players' specific suggestions is the reasoning behind them. Often, the gap that they are trying to fill can be addressed in other creative ways that achieve both the players' and developers' goals.

<h4>Improving Gameplay</h4>

LiveOps updates are also the developers' opportunity to augment and improve their game. They can identify high-value updates by asking:

- What new systems and content would support the [core loop](../../production/game-design/core-loops.md)?
- What issues and opportunities can be gleaned from data through [analytics](../../production/analytics/analytics-dashboard.md)?

The core loop is a game's minute-to-minute gameplay. Any features added during LiveOps should be connected to the core loop, so all of the game's systems remain integrated and supportive of one another.

Analytics provide valuable insights into player behavior and game health, and may indicate areas of improvement that can be targeted by an update. The creator dashboard provides analytics data and suggestions based on a game's performance. Additonally, developers should consider their own LiveOps preferences and priorities:

- What is their vision for the game?
- What new features and content inspire them?
- What are their capabilities?

<h4>Prioritizing Mental Health</h4>

Supporting a live game may at times feel like a grind. It is important for developers to take the time to work on features and content that inspire them, so they remain fulfilled by their work and excited about the game's future.

It is also important to be realistic about a team's capabilities: their strengths and weaknesses, their schedules, and the frequency with which they can release updates while maintaining a healthy work-life balance.
