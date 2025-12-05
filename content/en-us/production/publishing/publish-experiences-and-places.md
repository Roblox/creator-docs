---
title: Experiences and places
description: Explains how to create, publish, and configure experiences.
---

When you open Studio and create a new **experience**, your project starts with a single **place** that players load into when they first join the experience. Experiences can have one or multiple places that each contain all components for that portion of the experience, including its specific environment, 3D objects, and scripts.

<Alert severity="info">
Places are comparable to scenes in Unity or maps in Unreal Engine.
</Alert>

<figure>
<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/_RxK6l2y7Ac" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

Many creators create additional places within an experience to organize assets for different gameplay areas. For example, if you want players to join a dungeon before [teleporting](../../projects/teleport.md) to either a vast desert or spooky island, you can organize the assets for each area into their own place.

<figure>
<img src="../../assets/publishing/experiences-places-assets/Experience-Hierarchy.png" width="800" />
</figure>

Every place is represented by a data model that stores and organizes:

- All objects that make up the 3D world of a place, such as its parts, meshes, terrain, and lighting.
- All objects that can control runtime behavior, such as scripts.

Understanding both the general structure of a place's data model, and how the Roblox engine uses it as the source of truth for a place's state is important for understanding where to store and configure different types of objects. For more information, see [data model](../../projects/data-model.md).

## Create experiences

When you create a new experience, it opens a start place that all players will load into when they join the experiences. The start place represents the overall experience until you add additional places for different gameplay areas.

To create an experience:

1. Open Studio.
1. In the **Open a Template** section, select a template with the objects you want to start working with for your experience, such as:

   - **Baseplate** — Starts with a `Class.SpawnLocation` and a baseplate.
   - **Platformer** — Starts with customizable platforms, coin pickups, and double-jump, dashing, rolling, and long jump character mechanics!
   - **Racing** — Starts with a working racecar and customizable track objects.

When Studio opens up the template, you now have `Place1` that represents your overall experience.

## Publish experiences

When you publish an experience, Roblox stores the data model of your start place as a `.rblx` file in the cloud. This is an important process because it connects the experience to your account, allowing you to access and work on it from any computer.

By default, new experiences are set to **private**, meaning that they are only accessible to you as the creator, as well as any group members with the appropriate [roles and permissions](../../projects/groups.md#roles-and-permissions). When you are ready to go live to everyone, you can [release your experience to the public](#release-to-the-public).

<Alert severity="info">
When creating and collaborating on experiences as part of a [group](../../projects/groups.md), the ability for group members to play/edit/publish experiences is, by default, dependent on their role permissions. However, group owners or members with sufficient permissions can adjust access on a per‑experience level. For more info, see [configure experiences](#configure-experiences).
</Alert>

To publish an experience:

1. In the top-left corner of your computer, click **File** ⟩ **Publish to Roblox**.
1. In the **Publish Game** window, fill in the following fields:

   - **Name** / **Description** — The experience name and a description that describes what a potential player should expect. See the metadata best practices dropdown at the bottom of this section for guidelines.
   - **Creator** — The creator you'd like to attribute as the creator of the experience.

     <Alert severity="success">
     It's highly recommended that you [create a group](../../projects/groups.md) and publish a new experience under the group's account, not your personal account. Even if you're a solo creator, this allows you to expand your team over time, recruit playtesters, and operate as an independent studio.
     </Alert>

   - **Devices** — Each applicable device type that you want to support. The default options are practical for most new creators.

1. At the bottom-right of the window, click the **Create** button.

<BaseAccordion>
<AccordionSummary>

<Typography variant="h4">Metadata best practices</Typography>
</AccordionSummary>
<AccordionDetails>

Your experience's name and description create an important first impression and contribute to how easily players find your experience through Roblox's dynamic [discovery](../../discovery.md) systems.

<h4>Experience name</h4>

All experiences should adhere to the following best practices for naming:

- **Keep the name consistent** &ndash; Renaming an experience too often reduces the chances that players can find it using a previous name.

- **Avoid spamming** &ndash; Frequent repetition of words or phrases may result in demotion of your experience.

<Alert severity="success">
**Obby Madness**
</Alert>
<Alert severity="error">
**Obby Madness OBBY OBBY OBBY OBBY OBBY**
</Alert>

- **Use decorations cautiously** &ndash; Decorating the name with one or two well-placed emojis isn't harmful, but misplaced or excessive decorations can confuse players who quickly want to identify the experience.

<Alert severity="success">
🌍 **Evolution Simulator** 🌍
</Alert>
<Alert severity="error">
🐒🐬🐊 **Ev**🌍**luti**🌍**n Simulator** 🌷🍀🌿
</Alert>

- **Avoid unrelated text** &ndash; Adding text which is unrelated to the core name, such as a current version release or the latest updates, can negatively affect the discovery and recognition of your experience.

  <Alert severity="success">
  **Quest in Fantasyland**
  </Alert>
  <Alert severity="error">
  **[**⚡**WEAPONS UPDATE] Quest in Fantasyland**
  </Alert>

  <Grid container spacing={3} alignItems="flex-end">
  <Grid item XSmall={12} XLarge={4}>
  <img src="../../assets/publishing/experience-metadata/Experience-Title-Example-A.png" width="180" style={{marginBottom:"0px;"}} />
  <Alert severity="success">
  Entire title visible to players
  </Alert>
  </Grid>
  <Grid item XSmall={12} XLarge={4}>
  <img src="../../assets/publishing/experience-metadata/Experience-Title-Example-B.png" width="180" style={{marginBottom:"0px;"}} />
  <Alert severity="error">
  Title pushed out by update note
  </Alert>
  </Grid>
  </Grid>

<h4>Experience description</h4>

A well-written description promotes the genre and unique qualities of your experience while also providing the best context for both players and Roblox's dynamic discovery systems.

- **Summarize your experience** &ndash; Summarize what your experience is about in the first sentence, as this is your opportunity to present the most accurate impression of its genre and content.

<Alert severity="success">
Compete with racers around the world in some of the craziest courses you've ever seen!
</Alert>
<Alert severity="success">
Fight off hordes of zombies with bats, guns, swords, and a bunch of weapons hidden throughout challenging mazes.
</Alert>

- **Provide keywords** &ndash; Include all keywords that may be relevant to your experience. This makes it easier for players and Roblox to understand the themes and genres presented in your experience.

<Alert severity="success">
Do you enjoy being a <u>sheriff</u>? Join and rid our town of <u>robbers</u> and <u>crooks</u>! <u>Arrest</u> the bad guys, throw them in <u>jail</u>, and even have a <u>guns</u>-blazing <u>shoot</u>-out outside the saloon.
</Alert>
<Alert severity="success">
Open your own <u>restaurant</u>, make delicious <u>food</u>, get lots of <u>customers</u>, and expand! Earn experience along the way and learn more <u>recipes</u>. If you love <u>cooking</u> and starting your own <u>business</u>, this is your chance to become a <u>tycoon</u>!
</Alert>

- **Avoid spamming** &ndash; Avoid repeating keywords or adding irrelevant keywords. This may result in demotion of your experience.

<Alert severity="error">
Play our fun granny obby game. Obby obby obby obby obby obby obby adopt me bloxburg arsenal ninja legends parkour tycoon battle disaster survival super hero simulator run jump gun rpg pokemon wild west space alien piggy baldi granny murder mystery prison life jail break mario zelda dungeon quest.
</Alert>

</AccordionDetails>
</BaseAccordion>

### Create additional places

After you have published your experience, you can add additional places for different gameplay areas. To create a new place within an existing experience:

1. Open an existing place file or create a new place from any Studio template.
1. Select **File** ⟩ **Publish to Roblox As…**. The **Publish Game** window displays.
1. In the **Publish Game** window, click the tile for the experience you'd like to add the place to.
1. In the next view, select **Add as a new place**, then click the **Create** button.

Whether you choose to have a single, large place or many smaller places is mostly personal preference. For more information, see [design for performance](../../performance-optimization/design.md#streaming-and-teleportation).

### Change start place

The start place of an experience cannot be instantly swapped with another place, but you can overwrite the current start place.

To change the start place:

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Save your **current** start place to a `.rbxl` file or to a new place within the experience.
1. Navigate to the [Creator Dashboard][creatordashboard] and click on the thumbnail of the experience with the start place that you want to change. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to **Configure** ⟩ **Places**.
1. Click the **Edit in Studio** button for the intended **new** start place. Studio opens and loads that specific place.

   <img src="../../assets/creator-dashboard/Experience-Change-Start-Place.png" width="550" />

1. In the top-left corner of Studio, navigate to **File** ⟩ **Publish to Roblox As…**.

   <Alert severity="error">
   Do not select **Publish to Roblox** as this would publish the place over itself.
   </Alert>

1. In the window that appears, click the tile for the same experience, then choose the **current** start place. Click the **Overwrite** button.

   <img src="../../assets/publishing/experiences-places-assets/Publish-Window-Select-Start-Place.png" width="720" />

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> If the experience is live, it's recommended that you [restart its servers](#restart-servers).

## Configure experiences

You can configure most experience and place-level settings from the [Creator Dashboard][creatordashboard], a hub that lets you manage and access all of your Roblox creations in one place. It's useful to explore the left-hand navigation to see every configuration possible, such as those for [localization](../localization/index.md), [analytics](../analytics/index.md), and [monetization](../monetization/index.md), but the following sections highlight notable workflows for most experiences.

### Generate content descriptors

The **Maturity & Compliance Questionnaire** contains a set of questions about the type of content players can possibly encounter within your experience, as well as how frequently it occurs. Your answers give Roblox an understanding of the content in your experience and ensure that the experience is available to the appropriate audience on the [Home](https://www.roblox.com/home) and [Discover](https://www.roblox.com/discover) pages according to each player's age group and regional content policies.

For step-by-step instructions on how to fill out the questionnaire, see [content maturity & compliance](../promotion/content-maturity.md).

### Release to the public

By default, new experiences are set to **private**, meaning that they are only accessible to you as the creator, as well as any group members with the appropriate [roles and permissions](../../projects/groups.md#roles-and-permissions). When you are ready to go live to either to everyone, you can update the experinece's access setting.

To release your experience to the public:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Hover over an experience's thumbnail, click the **&ctdot;** button, and select **Make Public**.

   <img src="../../assets/creator-dashboard/Options-Button-Experience-Private.png" width="200" />

1. <Chip label="IMPORTANT" size="small" variant="outlined" color="warning" /> Generate [content maturity and compliance](#generate-content-descriptors) information to ensure the experience is available to the appropriate audience.

### Set age and geography restrictions

You can set restrictions so that only players over a certain age or from specific regions can play and discover your experiences. This is particularly helpful when you want to age up your audience without including mature content to age gate through content maturity labels.

To set age and geography restrictions:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Click on the thumbnail of the experience for which you want to set age and geography restriction. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to **Audience** ⟩ **Access Settings**.
1. In the **Age** section, set **Minimum age** to the youngest age a player can have to access your experience.
1. In the **Region** section, enable every region that can access your experience.
1. At the bottom of the page, click the **Save Changes** button.

### Copy landing page link

After you publish your experience, Roblox generates a landing page for the experience referred to as the experience's **main details page**. You can access and copy this link from either the [Creator Dashboard][creatordashboard] or the Roblox app, then share it with others so they can play your experience.

<Tabs>
<TabItem label="Creator Dashboard">

1. Hover over an experience's thumbnail, click the **&ctdot;** button, and select **Copy URL**.

   <img src="../../assets/creator-dashboard/Options-Button-Experience-Public.png" width="200" />

1. Share the copied URL with others as a direct link to the experience's landing page featuring a **play** button.

   <img src="../../assets/publishing/experiences-places-assets/Experience-Page-Example.jpg" width="1120" />

</TabItem>
<TabItem label="Roblox app">

1. Open the Roblox app on your mobile device.
1. Locate the experience, typically under the **Continue** header on the home screen, and tap its tile to open the info screen.
1. In the lower-left corner of the screen, click the **&ctdot;** button and select **Share** to open your device's sharing options.

   <img src="../../assets/promotion/misc/Experience-Mobile-Share.png" width="390" />

</TabItem>
</Tabs>

### Edit collaborator permissions

When creating and collaborating on experiences as part of a [group](../../projects/groups.md), abilities granted to group members are dependent on their **role permissions**. Owners or other group members with sufficient permissions can adjust play/edit/publish access and more on a per‑experience level, such as allowing a limited group role the ability to edit a specific experience even if that role cannot edit all experiences.

<Alert severity="info">
For step-by-step instructions on how to edit collaborator permissions, see [roles and permissions](../../projects/groups.md#roles-and-permissions).
</Alert>

### Access version history

Roblox automatically retains saved versions of each place for version control and backup purposes. To access and revert to a previously saved version of any place within an experience:

1. Navigate to the [Creator Dashboard][creatordashboard] and click on the thumbnail of the experience. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to **Configure** ⟩ **Places**.
1. On the **Places** page, click the thumbnail of the place you'd like to revert to a previous version.
1. In the left-hand navigation, click **Version History**.
1. Locate and select the version to revert to, then click the **Restore** button. Confirm the action to restore to that version.

<Alert severity="warning">
Note that restoring a place to a previous version does **not** automatically publish the changes. If the place has been [released to the public](#release-to-the-public) and you want to overwrite its live/public version with the reverted version, open the place in Studio, publish it, and then [restart your servers](#restart-servers) for updates.
</Alert>

### Allow copying

By default, all private and public experiences are locked so that you or your [group](../../projects/groups.md) are the only creators who have permission to edit its place files. However, if you want to allow other creators to be able to access an editable copy of your experience for their own creation process, you can **uncopylock** the experience. This is particularly helpful when you create templates or reference files for open use.

To allow the community to access an editable copy of your experience:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Click on the thumbnail of the experience you want to allow players to copy. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to **Configure** ⟩ **Places**.
1. Click the **start place** marked with a star icon. The place's **Basic Settings** page displays.

   <img src="../../assets/creator-dashboard/Places-Start-Place-Icon.png" width="200" alt="Start place tile indicated in Places display on the Creator Dashboard" />

1. In the place's left-hand navigation menu, select **Permissions**.
1. Enable **Allow users to download a copy of this Place**.
1. Click the **Save Changes** button. Your experience is now uncopylocked and creators can access an editable copy of it from the experience's main page by clicking the **&ctdot;** button and selecting **Edit in Studio**.

   <img src="../../assets/publishing/experiences-places-assets/Edit-Place-In-Studio.jpg" width="780" />

### Allow strong language

You can enable strong language and relax the text chat filter in your experiences for older players audiences. Doing so also adds a tag above your experience page to warn other players that your experience may include strong language:

<img src="../../assets/publishing/experiences-places-assets/Maturity-Label-Strong-Language.jpg" width="780" alt="Label indicating the experience contains strong language" />

Regardless of whether or not you activate the toggle, players do not face moderation consequences just for using strong language in chat or voice in experiences with Restricted content maturity labels, but they cannot violate [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410#safety) and [Terms of Use](https://www.roblox.com/info/terms). For example, players can type an expletive if they are scared by a monster, but they cannot abuse another player using strong language or otherwise.

<Alert severity="warning">
In-experience assets and experience metadata cannot contain strong language, even if the toggle is on and your experience has a Restricted content maturity label. If you include strong language in your assets or experience page, your experience will be moderated.
</Alert>

To allow strong language between players in text chat within your experience:

1. Navigate to the [Creator Dashboard][creatordashboard] and click on the thumbnail of the experience in which you want to allow strong language. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to **Audience** ⟩ **Communication Settings**.
1. Enable the **Allow Strong Language** toggle, then press the **Save Changes** button. Players within your experience can now use strong language in text chat.

## Release updates

When you publish an updated version of an experience to Roblox, players aren't immediately removed from old versions of the experience. Instead, you can migrate players to the updated version by restarting all of your outdated servers.

If you don't restart servers, players transition to the new version of the experience as the servers running old versions eventually empty and shut down. This option is non‑disruptive, but your player base might be playing different versions of the experience for a prolonged period of time; if your underlying player data format changes, you should probably restart servers.

For time-sensitive updates, you might prefer to deploy early, hide content behind a [config](../configs.md), and then change the config value to release your new content.

### Restart servers

To restart servers for release updates:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select the experience you want to restart servers for.
2. Go to **Configure** ⟩ **Server Management**.
3. Select the places you want to restart.
4. Click **Restart Servers**.
5. In the **Confirm Server Restart** dialog:
   1. Select one or both of the following restart options:
      - **Restart only servers with outdated versions** to avoid restarting servers that are running the latest published place version.
      - **Delay server restart** to delay the shutdown of servers and allow players a set time between 1 and 60 minutes to leave the experience on their own instead of being temporarily disconnected. This is also known as server bleed-off.
   2. Click **Restart**.

<Alert severity="warning">
   Unless you have an experience update workflow that is independent of place version, it's recommended that you always select **Restart only servers with outdated versions** to avoid unnecessarily disconnecting players.
</Alert>

After you restart servers, Roblox:

1. Stops all matchmaking to servers designated for shutdown. Players who join your experience by clicking the **Play** button will not be matched to these servers, but they can still join them by accepting invites, teleporting, or joining another user from their profile.
2. Waits for the configured delay time, if you selected the **Delay server restart** option.
3. Automatically teleports players to the updated version of the experience. All players on the same old server are sent to the same replacement server running the new version.

<Alert severity="info">
   If you want to completely shut down your experience and not allow players to reconnect after you restart your servers, you must make the experience private.
</Alert>

[creatordashboard]: https://create.roblox.com/dashboard/creations
