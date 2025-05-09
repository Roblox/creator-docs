---
title: Experiences and places
description: Explains how to publish the places in your experience.
---

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/_RxK6l2y7Ac" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br />

**Experiences** on Roblox are made up of individual **places**, comparable to scenes in Unity or maps in Unreal Engine. Each place contains all components for that portion of the experience, including its specific environment, parts, meshes, scripts, and user interface.

<figure>
<img src="../../assets/publishing/experiences-places-assets/Experience-Hierarchy.png" width="800" />
</figure>

## Publish experiences

By default, publishing a new place creates a new experience. New experiences begin as **private** and are only accessible to you and members of your [group](../../projects/groups.md) with the correct permissions.

When you're ready to release an experience to a wider audience, you
can [release it to the public](#release-to-the-public), although beta testing should still be an essential part of your development cycle. Because you're not able to determine which countries have access to an experience, which limits the ability to run beta tests in smaller markets, consider these strategies:

<Tabs>
  <TabItem label="Paid-access beta">
    Under the [paid access in Robux](../../production/monetization/paid-access-robux.md) and [paid access in local currency](../monetization/paid-access-local-currency.md) models, users
    must pay an upfront fee in **Robux**, the platform's currency, or in their **local currency**. This limits
    your user base, allowing you to test and iterate with smaller server fills,
    although the test results you gather may not reflect performance among a
    wider audience.
  </TabItem>
  <TabItem label="Ghost release">
    Under the "ghost release" model, you release an experience under a temporary
    name and icon. This doesn't necessarily gauge marketing appeal, but it can help
    you test the experience without impacting its rating. When testing is
    complete, you can remove the ghost version and conduct a
    [full release](#full-release).
  </TabItem>
	<TabItem label="Full release">
    When you're ready to release an experience to the world, you can [release it to the public](#release-to-the-public) under its final name with a complete description, icon, and other promotional imagery. For guidance on release names, descriptions, and promotional materials, review [metadata best practices](#metadata-best-practices), experience [icons](../../production/publishing/experience-icons.md), and [experience thumbnails](../../production/publishing/thumbnails.md).
  </TabItem>
</Tabs>

### Start place

While an experience can consist of many places, each experience can only have one **start place** that all users load into when they join. From within any place, you can [teleport](../../projects/teleport.md) users to another place.

To publish a place as the start place of an entirely new experience:

1. In the Studio menu bar, select **File** ⟩ **Publish to Roblox**. A contextual menu displays.
2. Fill in the following fields, most of which can be [reconfigured](#configure-experiences) later.

   - **Name** / **Description** — The experience name and a description that describes what a potential player should expect. See [metadata best practices](#metadata-best-practices) for guidelines.
   - **Creator** — The creator you'd like to attribute as the creator of the experience.

     <Alert severity="success">
     It's highly recommended that you [create a group](../../projects/groups.md) and publish a new experience under the group's account, not your personal account. Even if you're a solo creator, this allows you to expand your team over time, recruit playtesters, and operate as an independent studio.
     </Alert>

   - **Devices** — Each applicable device type that you want to support. The default options are practical for most new creators.

3. Click the **Create** button.

Once you publish your experience, you can [configure more settings](#configure-experiences) and also [add more places](#additional-places).

### Additional places

After you have published a [start place](#start-place) to create the overall experience, you can add additional places in Studio. To create a new place within an existing experience:

1. Open an existing place file or create a new place from any Studio template.
1. Select **File** ⟩ **Publish to Roblox As…**.
1. In the window that appears, click the tile for the experience you'd like to add the place to.
1. In the next view, select **Add as a new place** and then click the **Create** button.

Whether you choose to have a single, large place or many smaller places is mostly personal preference. For more information, see [Design for performance](../../performance-optimization/design.md#streaming-and-teleportation).

### Change the start place

The [start place](#start-place) of an experience cannot be instantly swapped with another place, but you can change it through the following steps.

1. If desired, save/backup your **current** start place to a `.rbxl` file or to a new place within the experience.
1. Navigate to the [Creator Dashboard][creatordashboard] and click on the thumbnail of the experience for which you want to change the start place. The experience's **Overview** page displays.
1. In the left-hand navigation, under **Configure**, select **Places**.
1. Click the **Edit in Studio** button for the intended **new** start place. Studio opens and loads that specific place.

   <img src="../../assets/creator-dashboard/Experience-Change-Start-Place.png" width="550" />

1. Select **File** ⟩ **Publish to Roblox As…** in the menu bar (do not select simply **Publish to Roblox** as it would publish the place over itself).
1. In the window that appears, click the tile for the same experience, then choose the **current** start place. Click the **Overwrite** button.

   <img src="../../assets/publishing/experiences-places-assets/Publish-Window-Select-Start-Place.png" width="720" />

1. **(Optional)** If the experience is live, it's recommended that you restart its servers as outlined in [update experiences](#update-experiences).

## Configure experiences

You can customize your experience's settings from the [Creator Dashboard][creatordashboard] or within Studio's **File**&nbsp;⟩ **Game Settings** window. Some settings are only configurable within Studio while others are only configurable on the dashboard.

Most experience settings are configurable from the [Creator Dashboard][creatordashboard], including [localization](../localization/index.md), access settings, [analytics](../analytics/index.md), and [monetization products](../monetization/index.md). You can also fill out the [Maturity & Compliance questionnaire](../promotion/content-maturity.md) required for generating a content maturity label and content descriptors that players use to make informed decisions about what content they interact with. To configure an experience:

1. Select the experience you want to configure from your [list of creations](https://create.roblox.com/dashboard/creations) on the dashboard.
1. Click on the category you wish to configure from the left-hand navigation.

The **Communication Settings** category allows you to enable **strong language** if your experience receives a **Restricted** maturity label. You can find this under the **Audience** section of the left-hand navigation. Enable the toggle to relax the text chat filter for some strong language in your experience. This also adds a tag above your experience page to warn other users that your experience may include strong language.

<img src="../../assets/publishing/experiences-places-assets/Maturity-Label-Strong-Language.jpg" width="780" alt="Label indicating the experience contains strong language" />

Regardless of whether or not you activate the toggle, players do not face moderation consequences just for using strong language in chat or voice in 17+ games, but they cannot violate [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410#safety) and [Terms of Use](https://www.roblox.com/info/terms). For example, players can type an expletive if they are scared by a monster, but they cannot abuse another player using strong language or otherwise.

<Alert severity="warning">
In-experience assets and experience metadata cannot contain strong language, even if the toggle is on and your experience is rated 17+. If you include strong language in your assets or experience page, your experience will be moderated.
</Alert>

## Release to the public

New experiences begin as **private** and are only accessible to you and members of your group with the correct [permissions](../../projects/groups.md#roles-and-permissions). When appropriate, you can release an experience to the public as follows:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Hover over an experience's thumbnail, click the **&ctdot;** button, and select **Make Public**.

   <img src="../../assets/creator-dashboard/Options-Button-Experience-Private.png" width="200" />

1. **(Recommended)** Explore how to provide [Content maturity labels and content descriptors](#content-maturity) for the experience.

### Link to experiences

Once an experience is [public](#release-to-the-public), you can copy its link from the [Creator Dashboard][creatordashboard] or the Roblox app and share it with others via social media or similar.

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

### Content maturity

[Content maturity](../promotion/content-maturity.md) provides information on the experience's main details page about what kind of content the experience contains so that players can make informed decisions about what they interact with. Roblox uses this information to recommend experiences on the [Home](https://www.roblox.com/home) and [Discover](https://www.roblox.com/discover) pages based on each user's age group and regional content policies.

Content maturity consists of two components:

- **Maturity label** - Indicates the level of maturity suitable for the experience according to child development research and industry standards. For more information, see Age Recommendations.
- **Content descriptors** - Indicates what type of content is within an experience, such as realistic depictions of blood or paid item trading.

Roblox strongly recommends that you fill out the Maturity & Compliance questionnaire for each of your experiences so that they're available to the largest appropriate audience possible. Roblox does not recommend experiences without content maturity information to users under 13 years old. In addition, if your experience doesn't have Content Maturity information but it does contain [restricted content](https://en.help.roblox.com/hc/en-us/articles/15869919570708), the experience will be moderated.

### Allow copying

By default, all private and public experiences are locked so that you or your [group](../../projects/groups.md) are the only creators who have permission to edit its place files. However, if you want to allow other creators to be able to access an editable copy of your experience for their own creation process, you can **uncopylock** the experience. This is particularly helpful when you create templates or reference files for open use.

To allow the community to access an editable copy of your experience:

1. Navigate to the [Creator Dashboard][creatordashboard].
2. Click on the thumbnail of the experience you want to allow users to copy. The experience's **Overview** page displays.
3. In the left-hand navigation, under **Configure**, select **Places**.
4. Click the **start place** marked with a star icon. The place's **Basic Settings** page displays.

   <img src="../../assets/creator-dashboard/Places-Start-Place-Icon.png" width="200" alt="Start place tile indicated in Places display on the Creator Dashboard" />

5. In the place's left-hand navigation menu, select **Permissions**.
6. Enable **Allow users to download a copy of this Place**.
7. Click the **Save Changes** button. Your experience is now uncopylocked and creators can access an editable copy of it from the experience's main page by clicking the **&ctdot;** button and selecting **Edit in Studio**.

   <img src="../../assets/publishing/experiences-places-assets/Edit-Place-In-Studio.jpg" width="780" />

## Update experiences

After you publish an updated version of an experience to Roblox, players aren't immediately removed from the old version of the experience. Instead, you have a few options for how quickly you transition players to the new version, each with advantages and disadvantages depending on the situation.

<Tabs>
<TabItem label="No action">

If you take no action, players transition to the new version of the experience as the servers running the old version eventually empty and shut down. This option is non‑disruptive but your player base might be playing different versions of the experience for a prolonged period of time. If you recently published a major update, having players on the old version can be undesirable. This approach is best for minor updates.

</TabItem>
<TabItem label="Restart servers">

The **Restart Servers for Updates** option is the best choice for most updates. When you choose this option, Roblox performs the following actions:

- Stops matchmaking to servers running the old version of the experience. Servers running the latest version are unaffected.
- Starts replacement servers.
- Shuts down old servers as their replacements become ready.
- Automatically teleports players to rejoin the new version of the experience. All players on an existing server connect to the same replacement server.

Depending on the number of servers to replace, this process can take up to six minutes, although most experiences update in less than one minute.

To restart all servers for updates:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Hover over the experience's thumbnail, click the **&ctdot;** button, and select **Restart Servers for Updates**.

   <img src="../../assets/creator-dashboard/Options-Button-Experience-Public.png" width="200" />

1. Confirm restart by clicking the **Restart** button.

</TabItem>
<TabItem label="Shut down all servers">

The **Shut Down All Servers** option performs the same process as **Restart Servers for Updates**, except that it will apply to **all** servers rather than those running old versions of the experience. This option is only recommended if you have a process for updating your experiences that does not involve publishing new place versions.

<Alert severity="info">
Please note that users will automatically reconnect after the servers have shut down. If you would like to completely shut down an experience and not allow players to reconnect (for example, to fix a critical bug causing data loss), you'll need to make the experience private.
</Alert>

To shut down all servers:

1. Navigate to the [Creator Dashboard][creatordashboard].
1. Hover over an experience's thumbnail, click the **&ctdot;** button, and select **Shut Down All Servers**.

   <img src="../../assets/creator-dashboard/Options-Button-Experience-Public.png" width="200" />

1. Confirm shutdown by clicking the **OK** button.

</TabItem>
</Tabs>

## Revert to previous versions

Roblox automatically retains saved versions of each place for version control and backup purposes. To revert to a previously saved version of any place within an experience:

1. Navigate to the [Creator Dashboard][creatordashboard] and click on the thumbnail of the experience. The experience's **Overview** page displays.
1. In the left-hand navigation, under **Configure**, select **Places**.
1. On the **Places** page, click the thumbnail of the place you'd like to revert to a previous version.
1. In the left-hand navigation, click **Version History**.
1. Locate and select the version to revert to, then click the **Restore** button. Confirm the action to restore to that version.

<Alert severity="warning">
Note that restoring a place to a previous version does **not** automatically publish the changes. If the place has been [released to the public](#release-to-the-public) and you want to overwrite its live/public version with the reverted version, open the place in Studio, publish it, and then restart the servers for updates as outlined in [update experiences](#update-experiences).
</Alert>

## Metadata best practices

Your experience's name and description create an important first impression and contribute to how easily users find your experience through Roblox's dynamic [discovery](../../discovery.md) systems.

### Experience name

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

### Experience description

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
