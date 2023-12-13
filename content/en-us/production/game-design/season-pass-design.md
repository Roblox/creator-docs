---
title: Season Pass Design
description: Season Pass Design
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/k2gbQI-ggB4?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br />

A _Season Pass_ is a limited-time, quest-based progression systems that is part of a game's content cadence. Players complete quest objectives to earn rewards for the duration of the pre-defined period of time or "season".

Season passes are time-bound design strategies used in Roblox experiences to deliver new content, promote player retention, and generate revenue. Season passes encourage players to complete tasks, gain pass experience points (XP), and climb through reward tiers. When making a season pass, it's imperative to:

- Identify goals
- Create parameters
- Design missions
- Collaborate effectively

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-0.png" width="70%"/>
    <figcaption>Season Pass in *Jailbreak*</figcaption>
  </figure>

<Alert severity="warning">
While similar in name, season passes are not game passes. Game passes are one-time purchases that confer gameplay bonuses. To learn how to implement game passes into your experiences, see [Game Passes](../../production/monetization/game-passes.md).
</Alert>

## Identify Goals

The _goal_ of a season pass is defined by its desired impact on players. A season pass can have multiple goals. Common goals that successful season passes prioritize are:

- Core loop alignment
- Player motivation
- Player comprehension
- Player anticipation

<h4>Core Loop Alignment</h4>

A successful season pass system is built on the experience's core loop, the mechanic upon which the experience is built, and drives players to engage with all of your experiences' systems and content. Tying season pass missions to every system and content type in your experience has multiple benefits:

- Ensures players have the context to understand your season pass gameplay requirements.
- Introduces players to new systems and content they might not be aware of in a digestible way.
- Gives players a variety of things to do, so that completing the pass doesn't become boring.

For more about core loops, see **[Core Loops](../../production/game-design/core-loops.md)**.

<h4>Player Motivation</h4>

A successful season pass makes players feel motivated to complete the entire season's missions. This can be achieved by having missions be manageable and not consume the player's entire playtime each day, appeal to different playstyles by having a variety of tasks, have the season UI clearly display player progression, and have season pass rewards accurately reflect the effort required to obtain them.

<h4>Player Comprehension</h4>

A successful season pass is self explanatory, with players understanding how to make progress on the pass in a given season. Players are automatically enrolled in the season's system, they do not need to remember to opt in every new season. A highly visible Season UI helps facilitate this, with the mission and season progress, reward status, and remaining time to complete the season all clearly communicated.

<h4>Player Anticipation</h4>

A successful season pass experience leaves players excited for the next season and looking forward to new rewards. This is obtainable by having the rewards, especially the premium and final rewards, be worthwhile. Having a worthwhile final reward to act as a capstone and celebration of player effort and commitment can result in players wondering what the next season's theme and final rewards will be, and encourages them to come back for more.

## Create Parameters

With your goals defined, your season pass parameters are the bounds in which you'll achieve them. When defining parameters for your season pass, it's important to be mindful of the following:

- Season length
- Season tiers
- Tier rewards
- Future updates

### Season Length

The _Season length_ is the duration that a season of rewards is available to players. The length of the season is based on your team's bandwidth, but one month is considered a good starting point. A **cadence** is how often season events are available. Allowing at least a one-week rest period between the end of one season and the start of the next creates a buffer that has the following benefits:

- Protects players from burnout who have given a hard push to earn the last tier
- Provides the development team with more time to produce missions and rewards

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-4.png" width="70%"/>
    <figcaption>Season Length in *Jailbreak*</figcaption>
  </figure>

### Season Tiers

_Season tiers_ are the milestones that players meet in order to earn rewards throughout the season. To climb the tiers, players complete missions in order to earn experience points (XP). When players earn enough XP, they graduate to the next tier and receive rewards for the one they just completed. When designing season tiers, ten tiers is a good place to start. Players should feel like they're making progress frequently, but the number of tiers should be short enough that it isn't daunting at the start of a season.

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-5.png" width="70%"/>
    <figcaption>Season Tiers in *Jailbreak*</figcaption>
  </figure>

<h4>Tier Rewards</h4>

_Tier rewards_ are the items players receive when they meet a season tier milestone set throughout the season. Whenever a player accumulates enough XP to graduate from one tier to the next, they earn tier rewards. The rewards should be reflective of the amount of effort needed to complete the tier based on the amount of XP required. Tier rewards should include items that players want, but aren't too valuable. Some ideas include:

- Consumables: health potions, food, power-ups, ammo.
- Currency: soft or hard (small amounts).
- Temporary buffs: 10% shield, damage boost, resource generation.
- Customization items: small avatar pieces, a new paint color for a home.

Extra attention is needed in implementing the following sections of a season pass:

- Final rewards
- How to claim rewards
- Free passes
- Premium passes

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-6.png" width="70%"/>
    <figcaption>Tier Rewards in *Jailbreak*</figcaption>
  </figure>

<h4>Final Rewards</h4>

A _final reward_ is the last reward at the end of the season pass. Creating a brand-new asset for the final reward is great option. Additionally, retiring that final reward item after the season is done to make it exclusive to the season pass system creates a stronger incentive and encourages more playtime. Final rewards often define the impact of a season pass, and are pivotal to design correctly in order to incentivize and reward your community.

Although your Tiers UI shows the rewards that players earn, it's good practice to also display any 3D model-based rewards inside your game world directly, especially if its the final reward. Items like cars, houses, pets, and avatar clothing are much more compelling "in person" than a 2D image in a UI. Making the final reward as tangible and exciting as possible to your players will engage and inspire them throughout the entire season.

<GridContainer numColumns="2">
  <figure>
   <img src="../../assets/game-design/season-pass-design/season-pass-design-2.png" width="95%"/>
    <figcaption> Final reward in *Jailbreak* </figcaption>
  </figure>
  <figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-1.png" width="100%"/>
    <figcaption> Final reward in [*Dragon Adventures*](https://www.roblox.com/games/3475397644/) </figcaption>
  </figure>
</GridContainer>

<h5>How to Claim Rewards</h5>

When _claiming rewards_, the best practice is to require players to claim them via a button in the season pass UI. Automatic rewards run the risk of being overlooked or misunderstood. Forcing players to manually accept rewards does two things:

- It ensures that players know that they received rewards and what they were.
- It drives players back into the season pass UI, potentially presenting them with the feature for the first time, or re-engaging them after a period of absence.

Ensure it's obvious to the player that they have rewards to collect. A common way to do this placing an icon on the feature's button to draw players attention. If a player has uncollected rewards at the end of the season, automatically awarding them ensures the player still gets rewarded for their efforts.

<h5>Free Passes</h5>

A _free pass_ is a version of a season pass that is available to all players. Players are automatically enrolled in a free pass, opting in to each season to complete missions and earn rewards by default. Free passes give players an amount of missions every day that they can complete to earn XP, but receive separate rewards than those who have premium passes.

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-7.png" width="70%"/>
    <figcaption>Free Season Pass in *Jailbreak*</figcaption>
  </figure>

Free passholders should not be able to complete premium missions or earn premium tier rewards unless they upgrade to the premium pass. Having this tiered difference still encourages and rewards player effort and playtime, but provides a monetization opportunity for your experience and incentivizes players to keep playing.

<h5>Premium Passes</h5>

A _premium pass_ is a variation of a season pass that players have to pay in order to access. The price of the pass is determined by the developer, but should accurately price the value of the rewards to the cost of the pass. Premium passes generally offer additional missions and the opportunity to earn greater rewards.

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-8.png" width="70%"/>
    <figcaption>Premium season pass in *Jailbreak*</figcaption>
  </figure>

If free players upgrade to the premium pass mid-season, it's good practice to award all of the premium reward for tiers that they have already completed, so they get the full value out of the pass and aren't penalized for waiting.

### Future Updates

When designing a new system, it's necessary to think about how it will be supported and improved in the future. To help your season pass remain relevant and exciting for players long term, consider the following:

- Introduce new missions: As you add a new feature to your experience, include new missions that utilize it. This increases mission variety and helps players engage with the new feature by rewarding their interaction.
- Form cooperative missions: Let players form teams, each member contributing to collective progress. This social component reinvigorates the system, creating a collaborative environment to reach shared goals.
- Implement a catch-up mechanic: Provide double XP in the season's final week, offering behind-schedule players a chance to catch up. This feature acknowledges the challenge of finishing the season in time and displays your commitment to players' success.
- Roll out weekly missions: Give players challenging, high-reward missions once a week in addition to their daily tasks. These missions provide high-achievers with more weekly activities and additional XP, acknowledging their dedication and effort.

## Design Missions

_Mission design_ is the careful construction of season pass missions to maximize player engagement and retention that accounts for [mission categories](#mission-categories), [mission difficulty](#mission-difficulty), [mission surfacing](#mission-surfacing). Core tenants of effective mission design include:

- New missions unlock daily. This encourages daily engagement from players and prevents highly engaged players from consuming the season's content too quicky.
- Missions reset daily. Players either complete them or lose their progress at the end of the day.
- Missions vary in category. This ensures gameplay variety within each day's set of missions.
- Missions vary in difficulty. Mission vary from easy, to medium, to hard, in order to give options for both casual and higher-achieving players.
- Missions rarely repeat. Have as many unique missions as possible. If you do not have a wide variety to start with, consider adding more in future updates.
- Missions never require spending hard currency. This would exclude free players and require premium season pass players to spend even more.
- Free players receive a number of missions every day.
- Premium passholders receive bonus missions every day. These additional missions are visible to everyone, but are only completable by premium passholders. These extra opportunities to earn XP and easier difficulty completing the season's rewards is a key selling point of the premium pass.

### Mission Categories

Deriving _mission categories_ from the different activities in your experience is an easy way to ensure that you are assigning players a variety of tasks. These could include:

- Exploration: traveling a required distance, traveling to landmarks, or finding secret areas.
- Collection: adding, trading, or leveling up items in a collection.
- Combat: fighting other players or NPCs.
- Social: throwing a party, joining a team, or participating in a multiplayer mini-game.
- Customization: modifying an avatar, pet, or home.
- Survival: gathering supplies, setting traps, or surviving to the end of the match.

<GridContainer numColumns="2">
  <figure>
   <img src="../../assets/game-design/season-pass-design/season-pass-design-13.png" width="100%"/>
    <figcaption> Daily Missions from *Jailbreak* </figcaption>
  </figure>
  <figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-14.png" width="96%"/>
    <figcaption> Daily Missions from *Dragon Adventures* </figcaption>
  </figure>
</GridContainer>

Your experience's categories may look very different, depending on the systems that you have available. Keep categories broad enough to encompass multiple activities, aiming to have at least three across your entire experience.

### Mission Difficulty

When presenting players with multiple missions and a time limit for completing them, it's important to consider the difficulty of the tasks. Difficulty can come from the quantity required to complete a mission as well as the tasks themselves. For example, eating 5 berries is easier than eating 25 berries, and combat is likely harder than driving a car.

Like categories, you can designate easy, medium and hard difficulties for tasks and use that information to provide players with an achievable set of missions for the season.

- **Easy:** very quick to complete.
- **Medium:** the baseline difficulty.
- **Hard:** takes more effort or skill to complete.

<GridContainer numColumns="2">
  <figure>
   <img src="../../assets/game-design/season-pass-design/season-pass-design-9.png" width="100%"/>
    <figcaption> Daily Missions from *Dragon Adventures* </figcaption>
  </figure>
  <figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-10.png" width="96%"/>
    <figcaption> Weekly Missions from *Dragon Adventures* </figcaption>
  </figure>
</GridContainer>

Difficulty designations also help you determine the appropriate amount of XP to award for completing each mission, as well as balance the overall difficulty of your tiers. With these missions meant to be completed within a day, it's important not to make them too difficult. If players regularly fail to complete their missions, their interest in the season pass feature tends to wane. Ensure that you leave players some time to play however they want, and to do the things that they already love to do in the experience.

### Mission Surfacing

**Surfacing** is the act of making a specific part of your experience highly visible to your players to promote discoverability and engagement. When adding any new system to your game, make sure that you're doing everything you can to surface it. Having your season pass surfaced ensures your players are aware of it and interact with it as you intend.

 <figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-12.png" width="60%"/>
    <figcaption> Season Pass HUD surfacing in *Dragon Adventures* </figcaption>
  </figure>

Surfacing methods include:

- Making your buttons for the feature highly visible by being large and colorful.
- Making the timer for the event's duration highly visible to drive a sense of urgency.
- Updating your menu and HUD with graphics touting the current season's theme and rewards.
- Adding a brief message or tutorial the first time a player logs in after the system goes that alerts them of any changes.
- Adding a badge to a button when there's an update that the player needs to know about. Badges can to draw a player's attention, letting them know they have new or completed missions, or tier rewards to collect.
- Creating an in-world prize showcase to display rewards. Putting rewards in the world allows players to appreciate them even more, and be more motivated to complete the season.

## Collaborate Effectively

Effective collaboration across teams is essential when creating far reaching and impactful systems and content like season passes. The following collaboration techniques ensure clear communication and helps teams stay aligned and motivated:

- Asset requests
- Tech requests

<h4>Asset Requests</h4>

An _asset request_ is a formal document between team members stating the need for the specific assets required for a feature. Listing the in-game assets required to ship a feature makes it much easier to scope and allocate your resources. Ensure to break out each asset separately so that the entire scope of the work is clear. The item's visual appearance is unimportant at this stage, simply knowing what type and how many of an asset and your experience needs is all that's required at this stage.

An asset type is either _evergreen_, needing only to be created once, or _new each season_. An asset request could look like:

**Evergreen:**

- Season UI screen.
- Missions screen.
- Icons for each mission type, such as stars, triangles, or hearts.

**New Each Season:**

- Final tier reward item.
- Themed marketing assets for each season.

<h4>Tech Requests</h4>

A _tech request_ is a formal document between the coder who will be working on the feature to help define the scope of the work. During tech requests, account for potential unexpected challenges or problems in development.

A tech request could look like:

- A list of the data hooks that track player progress in each mission.
- Implementation of seasons UI.
- Implementation of season progress tracking.

## Resources

For more information on season passes, see the following resources:

- [Generic Season Pass System PDF](../../assets/game-design/season-pass-design/season-pass-design.pdf)
- [Season Pass Tier Balance Calculator](../../assets/game-design/season-pass-design/season-pass-spreadsheet-.xlsx)
- [Season Pass UI Wireframes](../../assets/game-design/season-pass-design/season-pass-ui.pdf)

<h4>Example Missions</h4>

The following is a list of potential mission types and tasks chosen to illustrate the variety within a given category. While difficulty is subjective relative to the ease of completing the task a single time, the difficulty in the example below increases from this baseline when the quantity **(X)** increases.

| Mission Category | Task                                | Difficulty | Notes                                                                                                         |
| ---------------- | ----------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| WORK             | Complete **(X)** jobs               | Easy       | Players can choose any job                                                                                    |
| WORK             | Earn **(X)** dollars                | Medium     | Players must earn a required amount of money through jobs or other means                                      |
| WORK             | Fulfill **(X)** orders as a Barista | Hard       | Basically the same mission as above, but for a specific job -- which makes it more difficult to complete      |
| SOCIAL           | Throw or attend **(X)** parties     | Easy       | This one doesn't require other players (no one has to show up to the party you throw) so it's a little easier |
| SOCIAL           | Compete in **(X)** races            | Medium     | If the activity requires other players, it's generally more difficult than solo tasks                         |

<h4>UI Samples</h4>

The UI of your season pass is critical to clearly communicating with your players. These wireframe mockups illustrate one way that this feature could be implemented in your experience. Creating wireframes like these helps everyone on the team to visualize the feature, ensures that the user interface remains consistent from screen to screen, and ultimately makes it easier for the coder implementing the UI.

<figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-ui1.png" width="50%"/>
    <figcaption>Daily Mission UI Sample</figcaption>
  </figure>

  <figure>
    <img src="../../assets/game-design/season-pass-design/season-pass-design-ui2.png" width="100%"/>
    <figcaption>Reward Tiers UI Sample</figcaption>
  </figure>
