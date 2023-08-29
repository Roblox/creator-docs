---
title: Publishing Experiences and Places
description: Explains how to publish the places in your experience.
---

**Experiences** on Roblox are made up of individual **places**, comparable to scenes in Unity or maps in Unreal Engine. Each place contains all components for that portion of the experience, including its specific environment, parts, meshes, scripts, and user interface.

<img src="../../assets/publishing/experiences-places-assets/Experience-Hierarchy.png"
   width="90%" />

While an experience can consist of many places, each experience can only have one **starting place** that all users load into when they join. From within any place, you can [teleport](../../projects/teleporting.md) users to another place.

<figure>
  <img src="../../assets/studio/asset-manager/Starting-Place-Icon.png" width="360" />
  <figcaption>Starting place marked by a "spawn" icon in the [Asset Manager](../../projects/assets/manager.md)</figcaption>
</figure>

## Publishing a Starting Place

By default, publishing a new place creates a new experience. New experiences begin as **private** and are only accessible to you and members of your [group](../../projects/groups.md) with the correct permissions. When appropriate, you can [release the experience](#releasing-to-the-public) to the public.

To publish a place as the starting place of an entirely new experience:

1. In the Studio menu bar, select **File** &rarr; **Publish to Roblox**. A contextual menu displays.
2. Fill in the following fields, most of which can be changed later from [Game Settings](../../studio/game-settings.md).

   - **Name** / **Description** — The experience name and a description that describes what a potential player should expect. See [metadata best practices](#metadata-best-practices) for guidelines.

   - **Creator** — The creator you'd like to attribute as the creator of the experience.

   <Alert severity="success">
   It's highly recommended that you [create a group](../../projects/groups.md) and publish a new experience under the group's account, not your personal account. Even if you're a solo creator, this allows you to expand your team over time, recruit playtesters, and operate as an independent studio.
   </Alert>

   - **Genre** — The genre that best describes the experience.
   - **Devices** — Each applicable device type that you want to support. The default options are practical for most new creators.

   <img src="../../assets/publishing/experiences-places-assets/Supported-Devices.png" width="300" alt="Possible devices to support when publishing an experience: Computer, Phone, Tablet, Console, or VR" />

3. Click the **Create** button.

Once an experience is published, you can access the [Game Settings](../../studio/game-settings.md) menu which contains Studio-level settings and customization options for [monetization](../../production/monetization/index.md), [character appearance](../../characters/appearance.md), and more.

## Creating Additional Places

After you have [published a starting place](#publishing-a-starting-place) to create the overall experience, you can add additional places through the [Asset Manager](../../projects/assets/manager.md). To create a new place within an existing experience:

1. From the **View** tab, open the **Asset Manager**.

   <img src="../../assets/studio/general/View-Tab-Asset-Manager.png" width="876" alt="Asset Manager toggle button in Studio" />

1. In its window, click the &#9776; icon in the upper-left and select **Places** from the contextual menu. The starting place appears, marked by the "spawn" icon.

   <img src="../../assets/studio/asset-manager/Folder-Menu-Button.png" width="360" /><br />
   <img src="../../assets/publishing/experiences-places-assets/Places-Folder-Selected.png" width="360" />

1. Avoiding the thumbnail/name of your starting place, right-click in an empty region of the window and select **Add New Place**. A new place displays with a placeholder name of **[New Place]**.

   <img src="../../assets/publishing/experiences-places-assets/New-Place-Created.png" width="360" />

1. Right-click the new place, select **Rename**, and enter a more descriptive name.
1. When you double-click the new place, a new Studio session opens for editing the new place.

## Releasing to the Public

New experiences begin as **private** and are only accessible to you and members of your group with the correct [permissions](../../projects/groups.md#roles-and-permissions). When appropriate, you can release an experience to the public as follows:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. If you [published](#publishing-a-starting-place) the experience under a [group](../../projects/groups.md) account (recommended), select the group in the left column.

   <img src="../../assets/creator-dashboard/Creator-Selector-Group.png" width="800" />

1. Click the <span style={{fontWeight:"800"}}>&ctdot;</span> in the corner of the experience's thumbnail and select **Make Public**.

   <img src="../../assets/creator-dashboard/Experience-Menu-Make-Public.png" width="494" />

1. Explore how to provide [Experience Guidelines](#experience-guidelines) for the experience.

### Linking to Experiences

Once an experience is [public](#releasing-to-the-public), you can copy its link from the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and share it with others via social media or similar.

1. Click the <span style={{fontWeight:"800"}}>&ctdot;</span> in the corner of the experience's thumbnail and select **Copy URL**.

   <img src="../../assets/creator-dashboard/Experience-Menu-Copy-URL.png" width="494" />

1. Share the copied URL with others as a direct link to the experience's landing page featuring a **play** button.

   <img src="../../assets/misc/Experience-Page-Default.jpg" width="100%" />

You can also share an experience directly from the Roblox app:

1. Open the Roblox app on your mobile device.
1. Locate the experience, typically under the **Continue** header on the home screen, and tap its tile to open the info screen.
1. In the lower-left corner of the screen, click the <span style={{fontWeight:"800"}}>&ctdot;</span> button and select **Share** to open your device's sharing options.

   <GridContainer numColumns="2">
     <img src="../../assets/misc/Experience-Info-Mobile-Menu-Button.jpg" />
     <img src="../../assets/misc/Experience-Info-Mobile-Menu-Share.jpg" />
   </GridContainer>

### Experience Guidelines

**Experience Guidelines** provide information on the experience's main page about what kind of content the experience contains so that users can make informed decisions about what they interact with. Roblox uses this information to recommend experiences on the [Home](https://www.roblox.com/home) and [Discover](https://www.roblox.com/discover) pages based on each user's appropriate age group and regional content policies.

Each Experience Guideline has two components:

- **Age Recommendations** – Indicates which age group an experience is suitable for based on child development research and industry standards. For more information, see [Age Recommendations](https://en.help.roblox.com/hc/en-us/articles/8862768451604).
- **Content Descriptors** – Indicates what type of content is within an experience, such as realistic depictions of blood or paid item trading.

See [Experience Guidelines](../../production/promotion/experience-guidelines.md) for instructions on supplying the necessary guidelines.

## Reverting to Previous Versions

Roblox automatically retains saved versions of each place for version control and backup purposes. If you need to revert to a previously saved version:

1. From the **View** tab, open the **Asset Manager**.

   <img src="../../assets/studio/general/View-Tab-Asset-Manager.png" width="876" alt="Asset Manager toggle button in Studio" />

1. In its window, click the &#9776; icon in the upper-left and select **Places** from the contextual menu.

   <img src="../../assets/studio/asset-manager/Folder-Menu-Button.png" width="360" />

1. Right-click the desired place and select **View&nbsp;History**. The version history window opens.

   <img src="../../assets/studio/general/Version-History.png" width="700" />

1. Locate and select the version to revert to, then click the **Open** button to launch a new Studio session for the selected version.

## Restarting Servers

When you make updates to a place that you want users to immediately be aware of, it's recommended to restart all servers, as your changes might not affect servers currently running your experience.

<Alert severity="warning">
You should restart servers only when necessary, such as upon publishing a significant update, as doing so will instantly kick all players from the experience and may discourage them from rejoining afterwards.
</Alert>

To restart all servers:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Click the <span style={{fontWeight:"800"}}>&ctdot;</span> in the corner of the experience's thumbnail and select **Shut Down All Servers**.

   <img src="../../assets/creator-dashboard/Experience-Menu-Shutdown-Servers.png" width="494" />

1. Confirm shutdown by clicking the **OK** button.

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
