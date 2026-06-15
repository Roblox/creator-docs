---
title: Create and publish games and places
description: Explains how to create and publish games.
---

import PlaceSizeLimit from '../../includes/place-size-limit.md'

When you open Studio and create a new game, your project starts with a single **place** that players load into when they first join the game. Games can have one or multiple places that each contain all components for that portion of the game, including its specific environment, 3D objects, and scripts.

<Alert severity="info">
Places are comparable to scenes in Unity or maps in Unreal Engine.
</Alert>

<figure>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/_RxK6l2y7Ac" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
</figure>

Many creators create additional places within a game to organize assets for different gameplay areas. For example, if you want players to join a dungeon before [teleporting](../../projects/teleport.md) to either a vast desert or spooky island, you can organize the assets for each area into their own place.

<figure>
<img src="../../assets/publishing/experiences-places-assets/Experience-Hierarchy.png" width="800" />
</figure>

Every place is represented by a data model that stores and organizes:

- All objects that make up the 3D world of a place, such as its parts, meshes, terrain, and lighting.
- All objects that can control runtime behavior, such as scripts.

Understanding both the general structure of a place's data model, and how the Roblox engine uses it as the source of truth for a place's state is important for understanding where to store and configure different types of objects. For more information, see [data model](../../projects/data-model.md).

## Create games

When you create a new game, it opens a start place that all players will load into when they join the game. The start place represents the overall game until you add additional places for different gameplay areas.

To create a game:

1. Open Studio.
2. In the **Open a Template** section, select a template with the objects you want to start working with for your game, such as:

   - **Baseplate** — Starts with a `Class.SpawnLocation` and a baseplate.
   - **Platformer** — Starts with customizable platforms, coin pickups, and double-jump, dashing, rolling, and long jump character mechanics!
   - **Racing** — Starts with a working racecar and customizable track objects.

When Studio opens up the template, you now have `Place1` that represents your overall game.

## Publish games

When you publish a game, Roblox stores the data model of your start place as a `.rblx` file in the cloud. This is an important process because it connects the game to your account, allowing you to access and work on it from any computer.

By default, new games are set to **private**, meaning that they are only accessible to you as the creator, to users with **Edit** or **Playtest** access, and to group members with the appropriate [roles and permissions](../../projects/groups.md#roles-and-permissions). When you are ready to go live to everyone, you can [release your game to the public](#make-game-public) and optionally mark it as a beta.

<Alert severity="info">
When creating and collaborating on games as part of a [group](../../projects/groups.md), the ability for group members to playtest/edit/publish games is, by default, dependent on their role permissions. However, group owners or members with sufficient permissions can adjust access on a per‑game level. For more info, see [configure games](../../projects/configure-games.md).
</Alert>

To publish a game:

1. In the top-left corner of your computer, click **File** ⟩ **Publish to Roblox**.
2. In the **Publish Experience** window, fill in the following fields:

   - **Name** / **Description** — The name of the game and a description that describes what a potential player should expect. See the metadata best practices dropdown at the bottom of this section for guidelines.
   - **Creator** — The creator or [group](../../projects/groups.md) (<Chip label="RECOMMENDED" size="small" variant="outlined" color="success" />) you'd like to attribute as the creator of the game.
   - **Devices** — Each applicable device type that you want to support. The default options are practical for most new creators.

3. Click **Create**.

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Metadata best practices</Typography>
</AccordionSummary>
<AccordionDetails>

Your game's name and description create an important first impression and contribute to how easily players find your game through Roblox's dynamic [discovery](../../discovery.md) systems.

<h4>Game name</h4>

All games should adhere to the following best practices for naming:

- **Keep the name consistent** &ndash; Renaming a game too often reduces the chances that players can find it using a previous name.

- **Avoid spamming** &ndash; Frequent repetition of words or phrases may result in demotion of your game.

<Alert severity="success">
**Obby Madness**
</Alert>
<Alert severity="error">
**Obby Madness OBBY OBBY OBBY OBBY OBBY**
</Alert>

- **Use decorations cautiously** &ndash; Decorating the name with one or two well-placed emojis isn't harmful, but misplaced or excessive decorations can confuse players who quickly want to identify the game.

<Alert severity="success">
🌍 **Evolution Simulator** 🌍
</Alert>
<Alert severity="error">
🐒🐬🐊 **Ev**🌍**luti**🌍**n Simulator** 🌷🍀🌿
</Alert>

<h4>Game description</h4>

A well-written description promotes the genre and unique qualities of your game while also providing the best context for both players and Roblox's dynamic discovery systems.

- **Summarize your game** &ndash; Summarize what your game is about in the first sentence, as this is your opportunity to present the most accurate impression of its genre and content.

<Alert severity="success">
Compete with racers around the world in some of the craziest courses you've ever seen!
</Alert>
<Alert severity="success">
Fight off hordes of zombies with bats, guns, swords, and a bunch of weapons hidden throughout challenging mazes.
</Alert>

- **Provide keywords** &ndash; Include all keywords that may be relevant to your game. This makes it easier for players and Roblox to understand the themes and genres presented in your game.

<Alert severity="success">
Do you enjoy being a <u>sheriff</u>? Join and rid our town of <u>robbers</u> and <u>crooks</u>! <u>Arrest</u> the bad guys, throw them in <u>jail</u>, and even have a <u>guns</u>-blazing <u>shoot</u>-out outside the saloon.
</Alert>
<Alert severity="success">
Open your own <u>restaurant</u>, make delicious <u>food</u>, get lots of <u>customers</u>, and expand! Earn experience along the way and learn more <u>recipes</u>. If you love <u>cooking</u> and starting your own <u>business</u>, this is your chance to become a <u>tycoon</u>!
</Alert>

- **Avoid spamming** &ndash; Avoid repeating keywords or adding irrelevant keywords. This may result in demotion of your game.

<Alert severity="error">
Play our fun granny obby game. Obby obby obby obby obby obby obby adopt me bloxburg arsenal ninja legends parkour tycoon battle disaster survival super hero simulator run jump gun rpg pokemon wild west space alien piggy baldi granny murder mystery prison life jail break mario zelda dungeon quest.
</Alert>

</AccordionDetails>
</BaseAccordion>

<PlaceSizeLimit components={props.components} />

### Create additional places

After you have published your game, you can add additional places for different gameplay areas. To create a new place within an existing game:

1. Open an existing place file or create a new place from any Studio template.
2. Select **File** ⟩ **Publish to Roblox As…**.
3. In the **Publish Experience** window, click the tile for the game you'd like to add the place to.
4. Select **Add as a new place**, then click **Create**.

Whether you choose to have a single, large place or many smaller places is mostly personal preference. For more information, see [design for performance](../../performance-optimization/design.md#streaming-and-teleportation).

### Change start place

The start place of a game cannot be instantly swapped with another place, but you can overwrite the current start place.

To change the start place:

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Save your **current** start place to a `.rbxl` file or to a new place within the game.
2. Go to the [Creator Dashboard][creatordashboard] and select the game with the start place that you want to change.
3. Go to **Configure** ⟩ **Places**.
4. Click **Edit in Studio** for the intended **new** start place. Studio opens and loads that specific place.

   <img src="../../assets/creator-dashboard/Experience-Change-Start-Place.png" width="550" />

5. In the top-left corner of Studio, go to **File** ⟩ **Publish to Roblox As…**.

   <Alert severity="error">
   Do not select **Publish to Roblox** as this would publish the place over itself.
   </Alert>

6. Click the tile for the same game, then choose the **current** start place. Click **Overwrite**.

   <img src="../../assets/publishing/experiences-places-assets/Publish-Window-Select-Start-Place.png" width="720" />

7. <Chip label="OPTIONAL" size="small" variant="outlined" /> If the game is live, it's recommended that you [restart its servers](../../projects/update-games.md#restart-servers).

## Make game public

By default, new games are set to **private**, meaning they are only accessible to you and your [creator team](../../projects/groups.md) who have **Edit** permissions (see [manage collaborators](../../projects/collaboration.md#manage-collaborators)).

To make your game publicly available to anyone outside of the creator team, you have to meet the [publishing requirements](#publishing-requirements) below.

<Alert severity="info">
You can make up to **5 private games that have never been public before** public per day. This limit resets daily. Making an existing public game private and then public again does **not** count toward this limit.
</Alert>

### Audience

A game's target audience can be set through its **Audience** setting:

1. In the [Creator Dashboard][creatordashboard], select your game.
2. Navigate to **Configure** ⟩ **Settings**.
3. Under **Audience**, choose from the options below:

		<table>
		<thead>
			<tr>
				<th>Audience</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>**Private**</td>
				<td>Available only to users who have **Edit** permissions for the game.</td>
			</tr>
			<tr>
				<td>**Limited**</td>
		<td>
		Available only to those who are part of the selected category of users. Not discoverable to the general public on Roblox.
		- **Playtesters** — Available to users who have **playtest** permissions for the game.
		- **Friends** — Available to the game owner's friends. This option only appears for [user‑owned](../../projects/collaboration.md#user-owned-experiences) games.
		- **Community Members** — Available only to group members. This option only appears for [group‑owned](../../projects/collaboration.md#group-owned-experiences) games.
		</td>
			</tr>
			<tr>
				<td>**Public**</td>
				<td>Available and discoverable to the general public on Roblox.</td>
			</tr>
		</tbody>
		</table>

4. <Chip label="OPTIONAL" size="small" variant="outlined" /> For **Public** games, you can choose **Enable&nbsp;Beta&nbsp;Mode** to omit the game from the **Recommended&nbsp;For&nbsp;You** category on Roblox. Beta games are still public, but they have more limited reach and exposure. To widen your audience while still remaining in beta, create an ad campaign as outlined in [Ads Manager](../../production/promotion/ads-manager.md). If you enable sponsored ads, the game's analytics charts might show some users from **Recommended&nbsp;For&nbsp;You**.

5. Click **Save Changes**.

### Publishing requirements

Publishing requirements depend on the target [audience](#audience) and apply to **all** publish actions:

- Publishing a new game.
- Updating an existing public game (publishing a new version of a place).
- Publishing to a different game via **Publish to Roblox As**.
- Setting your audience to **Limited** (any option under **Limited**) or changing it from **Public** to **Private**.

#### Private games

A game published as **Private** is only available to the owner or users with **Edit** permissions.

Those with **playtest** permissions can't play private games. To enable their access, make sure you meet the requirements for **Public** games and then set the [audience](#audience) to **Limited**&nbsp;⟩ **Playtesters**.

#### Public/Limited games

Publishing to a **Public** audience or **Limited** audience (playtesters, friends, or community members) has various requirements.

To reach **16+** and **Trusted Friends**:

- Complete an age check.
- Account is in good standing and at least 2 days old.
- Complete the [content maturity & compliance](../promotion/content-maturity.md) questionnaire.

To reach **all ages** including [Roblox Kids and Select](./kids-and-select.md):

- All of the above **plus**:
- [ID-verified account](./account-verification.md#verify-through-government-id) or parent-linked age verification.
- Two-factor authentication (2FA) enabled.
- **One** of the following:
  - Pay a one-time, refundable publishing fee of 1,000 Robux per game.
    - This fee will be refunded if your game maintains 100 highly engaged players for 60 days without moderation.
    - If the game is permanently moderated or taken down for not meeting [Roblox Community Standards](https://en.help.roblox.com/hc/articles/203313410) within the 60 days, the fee **will not be refunded**.
  - Active [Roblox Plus](https://www.roblox.com/plus) subscription for 2 consecutive months.
- Game must pass the [evaluation process](../../production/publishing/kids-and-select.md#evaluation-process) for **Kids** and **Select**.

[creatordashboard]: https://create.roblox.com/dashboard/creations
