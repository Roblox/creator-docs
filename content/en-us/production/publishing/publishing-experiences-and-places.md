---
title: Experiences and Places
description: Explains how to publish the places in your experience.
---

**Experiences** on Roblox are made up of individual **places**, comparable to scenes in Unity or maps in Unreal Engine. Each place contains all components for that portion of the experience, including its specific environment, parts, meshes, scripts, and user interface.

<figure>
<img src="../../assets/publishing/experiences-places-assets/Experience-Hierarchy.png" width="800" />
</figure>

## Publishing Experiences

By default, publishing a new place creates a new experience. New experiences begin as **private** and are only accessible to you and members of your [group](../../projects/groups.md) with the correct permissions. When appropriate, you can [release the experience](#releasing-to-the-public) to the public.

### Starting Place

While an experience can consist of many places, each experience can only have one **starting place** that all users load into when they join. From within any place, you can [teleport](../../projects/teleporting.md) users to another place.

To publish a place as the starting place of an entirely new experience:

1. In the Studio menu bar, select **File** &rarr; **Publish to Roblox**. A contextual menu displays.
1. Fill in the following fields, most of which can be changed later from [Game Settings](../../studio/game-settings.md).

   - **Name** / **Description** — The experience name and a description that describes what a potential player should expect. See [metadata best practices](#metadata-best-practices) for guidelines.
   - **Creator** — The creator you'd like to attribute as the creator of the experience.

     <Alert severity="success">
     It's highly recommended that you [create a group](../../projects/groups.md) and publish a new experience under the group's account, not your personal account. Even if you're a solo creator, this allows you to expand your team over time, recruit playtesters, and operate as an independent studio.
     </Alert>

   - **Genre** — The genre that best describes the experience.
   - **Devices** — Each applicable device type that you want to support. The default options are practical for most new creators.

     <img src="../../assets/publishing/experiences-places-assets/Supported-Devices.png" width="300" alt="Possible devices to support when publishing an experience: Computer, Phone, Tablet, Console, or VR" />

1. Click the **Create** button.

Once you publish your experience, you can [configure more settings](#configuring-experiences) and also add more places to your experience.

### Additional Places

After you have published a [starting place](#starting-place) to create the overall experience, you can add additional places through the [Asset Manager](../../projects/assets/manager.md). To create a new place within an existing experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Asset Manager](../../projects/assets/manager.md).

   <img src="../../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

1. In its window, click the &#9776; icon in the upper-left and select **Places** from the menu.

   <img src="../../assets/studio/asset-manager/Folder-Menu-Button.png" width="360" />

1. Avoiding the thumbnail/name of your starting place, right-click in an empty region of the window and select **Add New Place**. A new place displays with a placeholder name.

   <img src="../../assets/studio/asset-manager/Places-New-Place-Created.png" width="360" />

1. Right-click the new place, select **Rename**, and enter a more descriptive name.
1. When you double-click the new place, a new Studio session opens for editing the new place.

### Changing the Starting Place

The starting place of an experience cannot be instantly swapped with another place, but you can change it through the following steps:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Click on the thumbnail of the experience for which you want to change the starting place. The experience's **Overview** page displays.
1. In the left-hand navigation, under **Configure**, select **Places**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Places-Icon.png" width="330" alt="Places button indicated for an experience on the Creator Dashboard" />

1. Click the **Edit in Studio** button for both the **current** starting place and a target **new** starting place. Two separate instances of Studio open, one for each place.

   <img src="../../assets/creator-dashboard/Experience-Change-Starting-Place.png" width="554" />

1. In the Studio instance running the **current** starting place, select **File**&nbsp;&rarr; **Publish&nbsp;to&nbsp;Roblox&nbsp;As…** in the menu bar (do not select simply **Publish&nbsp;to&nbsp;Roblox** as it would publish the starting place over itself).
1. In the window that appears, click the tile for the same experience, then choose whether to publish it as a **new** place or to overwrite an existing place. Click the **Create** or **Overwrite** button respectively.
1. In the Studio instance running the intended **new** starting place, select **File**&nbsp;&rarr; **Publish&nbsp;to&nbsp;Roblox&nbsp;As…** in the menu bar.
1. In the window that appears, click the tile for the same experience, then choose the **original** starting place. Click the **Overwrite** button.
1. Close both instances of Studio.
1. Back in the [Creator Dashboard][creatordashboard], use the **Restart Servers for Updates** workflow as outlined in [Updating Experiences](#updating-experiences).

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Restart-Servers.png" width="420" alt="Restart Servers for Updates option from Creator Dashboard" />

## Configuring Experiences

You can customize your experience's settings from the [Creator Dashboard][creatordashboard] or within Studio's [Game Settings](../../studio/game-settings.md). Some settings are only configurable within Studio while others are only configurable on the dashboard.

### Creator Dashboard

Most experience settings are configurable from the [Creator Dashboard][creatordashboard], including [localization](../localization/index.md), access settings, [analytics](../analytics/index.md), and [monetization products](../monetization/index.md). You can also fill out the [questionnaire](../promotion/experience-guidelines.md#questionnaire-categories) required for generating [experience guidelines](#experience-guidelines). To configure an experience:

1. Select the experience you want to configure from your [list of creations](https://create.roblox.com/dashboard/creations) on the dashboard.
1. Click on the category you wish to configure from the left-hand navigation.

The **Communication Settings** category allows you to enable **strong language** if your experience is rated 17+. You can find this under the **Audience** section of the left-hand navigation. Enable the toggle to relax the text chat filter for some strong language in your experience. This also adds a tag above your experience page to warn other users that your experience may include strong language.

<img src="../../assets/publishing/experiences-places-assets/Strong-Language-Pill.png" width="375" alt="Pill indicating the experience contains strong language" />

Regardless of whether or not you activate the toggle, players do not face moderation consequences just for using strong language in chat or voice in 17+ games, but they cannot violate [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410#safety) and [Terms of Use](https://www.roblox.com/info/terms). For example, players can type an expletive if they are scared by a monster, but they cannot abuse another player using strong language or otherwise.

<Alert severity="warning">
In-experience assets and experience metadata cannot contain strong language, even if the toggle is on and your experience is rated 17+. If you include strong language in your assets or experience page, your experience will be moderated.
</Alert>

### Game Settings

Once an experience is published, the [Game Settings](../../studio/game-settings.md) window contains many Studio-level settings and customization options. To open it, click the **Game Settings** button in the [Home](../../studio/home-tab.md) tab of the ribbon menu.

<img src="../../assets/studio/general/Home-Tab-Game-Settings.png" width="800" alt="Game Settings button indicated in Home tab" />

## Releasing to the Public

New experiences begin as **private** and are only accessible to you and members of your group with the correct [permissions](../../projects/groups.md#roles-and-permissions). When appropriate, you can release an experience to the public as follows:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Locate the experience, click the **&ctdot;** in the corner of its thumbnail, and select **Make Public**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Make-Public.png" width="420" alt="Make Public option from Creator Dashboard" />

1. **(Recommended)** Explore how to provide [Experience Guidelines](#experience-guidelines) for the experience.

### Linking to Experiences

Once an experience is [public](#releasing-to-the-public), you can copy its link from the [Creator Dashboard][creatordashboard] or the Roblox app and share it with others via social media or similar.

<Tabs>
<TabItem label="Creator Dashboard">

1. Locate the experience, click the **&ctdot;** in the corner of its thumbnail, and select **Copy URL**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Copy-URL.png" width="420" alt="Copy URL option from Creator Dashboard" />

1. Share the copied URL with others as a direct link to the experience's landing page featuring a **play** button.

   <img src="../../assets/publishing/experiences-places-assets/Experience-Page-Example.jpg" width="100%" />

</TabItem>
<TabItem label="Roblox App">

1. Open the Roblox app on your mobile device.
1. Locate the experience, typically under the **Continue** header on the home screen, and tap its tile to open the info screen.
1. In the lower-left corner of the screen, click the **&ctdot;** button and select **Share** to open your device's sharing options.

   <img src="../../assets/publishing/experiences-places-assets/Mobile-Share.png" width="390" />

</TabItem>
</Tabs>

### Experience Guidelines

[Experience Guidelines](../promotion/experience-guidelines.md) provide information on the experience's main page about what kind of content the experience contains so that users can make informed decisions about what they interact with. Roblox uses this information to recommend experiences on the [Home](https://www.roblox.com/home) and [Discover](https://www.roblox.com/discover) pages based on each user's appropriate age group and regional content policies.

Each experience guideline has two components:

- **Age Recommendations** — Indicates which age group an experience is suitable for based on child development research and industry standards. For more information, see [Age Recommendations](https://en.help.roblox.com/hc/en-us/articles/8862768451604).
- **Content Descriptors** — Indicates what type of content is within an experience, such as realistic depictions of blood or paid item trading.

Roblox strongly recommends that you fill out the guidelines questionnaire for each of your experiences so that they're available to the largest appropriate audience possible. Roblox does not recommend experiences without guidelines to users under 13 years old, and if your experience has no guidelines but contains [17+ content](https://en.help.roblox.com/hc/en-us/articles/15869919570708), it will be moderated.

### Allowing Copying

By default, all private and public experiences are locked so that you or your group are the only creators who have access to edit its place files. However, if you want to allow other creators to be able to download an editable copy of your experience for their own creator process, you can **uncopylock** the experience. This is particularly helpful when you create templates or reference files for open use.

To allow users to download an editable copy of your experience:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Click on the thumbnail of the experience you want to allow users to copy. The experience's **Overview** page displays.
1. In the left-hand navigation, under **Configure**, select **Places**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Places-Icon.png" width="330" alt="Places button indicated for an experience on the Creator Dashboard" />

1. Click the **start place** marked with a star icon. The place's **Basic Settings** page displays.

   <img src="../../assets/creator-dashboard/Places-Start-Place-Icon.png" width="200" alt="Start place tile indicated in Places display on the Creator Dashboard" />

1. In the place's left-hand navigation menu, select **Permissions**.

   <img src="../../assets/creator-dashboard/Place-Nav-Permissions.png" width="330" alt="Permissions button indicated for a place on the Creator Dashboard" />

1. Enable **Allow users to download a copy of this Place**.
1. Click the **Save Changes** button. Your experience is now uncopylocked and creators can download an editable copy of it from the experience's main page.

   <img src="../../assets/publishing/experiences-places-assets/Uncopylocked-Experience-Edit-In-Studio.png" width="780" />

## Updating Experiences

After you publish an updated version of an experience to Roblox, players aren't immediately removed from the old version of the experience. Instead, you have a few options for how quickly you transition players to the new version, each with advantages and disadvantages depending on the situation.

<Tabs>
<TabItem label="No Action">

If you take no action, players transition to the new version of the experience as the servers running the old version eventually empty and shut down. This option is non‑disruptive but your player base might be playing different versions of the experience for a prolonged period of time. If you recently published a major update, having players on the old version can be undesirable. This approach is best for minor updates.

</TabItem>
<TabItem label="Restart Servers">

The **Restart Servers for Updates** option is the best choice for most updates. When you choose this option, Roblox performs the following actions:

- Stops matchmaking to servers running the old version of the experience. Servers running the latest version are unaffected.
- Starts replacement servers.
- Shuts down old servers as their replacements become ready.
- Prompts players to rejoin the new version of the experience. If they choose to rejoin, all players on an existing server connect to the same replacement server.

Depending on the number of servers to replace, this process can take up to six minutes, although most experiences update in less than one minute.

To restart all servers for updates:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Click the **&ctdot;** in the corner of the experience's thumbnail and select **Restart Servers for Updates**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Restart-Servers.png" width="420" alt="Restart Servers for Updates option from Creator Dashboard" />

1. Confirm restart by clicking the **RESTART** button.

</TabItem>
<TabItem label="Shut Down All Servers">

The **Shut Down All Servers** option immediately shuts down all servers and removes players from the experience. This option is highly disruptive and, if kicked players rejoin the experience, matchmaking does not keep them together. As such, this option should be reserved for after you've fixed a breaking bug or in situations where you don't want players on the older version for even a short duration.

<Alert severity="info">
A comparable option is to make your experience private, which shuts down its servers just as quickly. This option has the added benefit of preventing players from rejoining the experience while you fix an issue.
</Alert>

To shut down all servers:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Click the **&ctdot;** in the corner of the experience's thumbnail and select **Shut Down All Servers**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Shutdown-Servers.png" width="420" alt="Shut Down All Servers option from Creator Dashboard" />

1. Confirm shutdown by clicking the **OK** button.

</TabItem>
</Tabs>

## Reverting to Previous Versions

Roblox automatically retains saved versions of each place for version control and backup purposes. To revert to a previously saved version of any place within an experience:

1. With the experience open, access the [Asset Manager](../../projects/assets/manager.md) from the [View](../../studio/view-tab.md) tab.

   <img src="../../assets/studio/general/View-Tab-Asset-Manager.png" width="776" alt="Asset Manager toggle button in Studio" />

1. In its window, click the &#9776; icon in the upper-left and select **Places** from the contextual menu.

   <img src="../../assets/studio/asset-manager/Folder-Menu-Button.png" width="360" />

1. Right-click the desired place and select **View History**. The version history window opens.
1. Locate and select the version to revert to, then click the **Open** button to launch a new Studio session for the selected version.
1. If the place has been [released to the public](#releasing-to-the-public) and you want to overwrite the place's live/public version with the reverted version:
	1. Publish the place you just reverted to, choosing the same experience and same place during the publishing process.
	2. Restart the servers for updates as outlined in [Updating Experiences](#updating-experiences).

## Metadata Best Practices

Your experience's name and description create an important first impression and contribute to how easily users find your experience through Roblox's dynamic [discovery](../../production/promotion/discovery.md) systems.

### Experience Name

All experiences should adhere to the following best practices for naming:

- **Keep the name consistent** &ndash; Renaming an experience too often reduces the chances that users can find it using a previous name.

- **Avoid spamming** &ndash; Frequent repetition of words or phrases may result in demotion of your experience.

<Alert severity="success">
**Obby Madness**
</Alert>
<Alert severity="error">
**Obby Madness OBBY OBBY OBBY OBBY OBBY**
</Alert>

- **Use decorations cautiously** &ndash; Decorating the name with one or two well-placed emojis isn't harmful, but misplaced or excessive decorations can confuse users who quickly want to identify the experience.

<Alert severity="success">
🌍 **Evolution Simulator** 🌍​
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
  <Grid item xs={12} lg={4}>
  <img src="../../assets/publishing/experience-metadata/Experience-Title-Example-A.png" width="180" style={{marginBottom:"0px;"}} />
  <Alert severity="success">
  Entire title visible to players
  </Alert>
  </Grid>
  <Grid item xs={12} lg={4}>
  <img src="../../assets/publishing/experience-metadata/Experience-Title-Example-B.png" width="180" style={{marginBottom:"0px;"}} />
  <Alert severity="error">
  Title pushed out by update note
  </Alert>
  </Grid>
  </Grid>

### Experience Description

A well-written description promotes the genre and unique qualities of your experience while also providing the best context for both users and Roblox's dynamic discovery systems.

- **Summarize your experience** &ndash; Summarize what your experience is about in the first sentence, as this is your opportunity to present the most accurate impression of its genre and content.

<Alert severity="success">
Compete with racers around the world in some of the craziest courses you've ever seen!
</Alert>
<Alert severity="success">
Fight off hordes of zombies with bats, guns, swords, and a bunch of weapons hidden throughout challenging mazes.
</Alert>

- **Provide keywords** &ndash; Include all keywords that may be relevant to your experience. This makes it easier for users and Roblox to understand the themes and genres presented in your experience.

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

[creatordashboard]: https://create.roblox.com/dashboard/creations
