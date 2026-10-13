---
title: Create and publish games and places
description: Explains how to create, publish, and release games.
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
1. In the **Open a Template** section, select a template with the objects you want to start working with for your game, such as:

   - **Baseplate** — Starts with a `Class.SpawnLocation` and a baseplate.
   - **Platformer** — Starts with customizable platforms, coin pickups, and double-jump, dashing, rolling, and long jump character mechanics!
   - **Racing** — Starts with a working racecar and customizable track objects.

When Studio opens up the template, you now have `Place1` that represents your overall game.

## Publish games

When you publish a game, Roblox stores the data model of your start place as a `.rblx` file in the cloud. This is an important process because it connects the game to your account, allowing you to access and work on it from any computer.

By default, new games are only accessible to you as the creator, users with **Edit** access, and group members with the appropriate [roles and permissions](../../projects/groups.md#roles-and-permissions). When you are ready to go live to everyone, you can [release your game to the public](#release-games) and [specify your target audience](#target-audience).

<Alert severity="info">
When creating and collaborating on games as part of a [group](../../projects/groups.md), the ability for group members to playtest/edit/publish games is, by default, dependent on their role permissions. However, group owners or members with sufficient permissions can adjust access on a per‑game level. For more information, see [Configure games](../../projects/configure-games.md).
</Alert>

To publish a game for the first time:

1. In the top-left corner of your computer, navigate to **File** > **Publish**. The **Game details** window displays.

   <img src="../../assets/publishing/Games-Details.png" width="60%" />

1. In the window:

   1. Upload an [icon](./experience-icons.md) and [thumbnail](./thumbnails.md) to display on your game's main details page.
   1. In the **Name** field, input the name of your game.
   1. Set **Genre** and the optional **Subgenre** dropdown menus to what type of gameplay players should expect. For more information, see [Genres](./experience-genres.md).
   1. In the **Description** field, provide a summary of what players can expect from your game.
   1. Click the **Save** button. Roblox publishes your game to the cloud with a unique `UniverseID`.

   <img src="../../assets/publishing/Publish.png" width="60%" />

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> You can [invite early testers](#invite-early-testers) to preview your game.

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
1. Select **File** > **Publish As**.
1. In the **Publish Experience** window, click the tile for the game you'd like to add the place to.
1. Select **Add as a new place**, then click **Create**.

Whether you choose to have a single, large place or many smaller places is mostly personal preference. For more information, see [Design for performance - Streaming and teleportation](../../performance-optimization/design.md#streaming-and-teleportation).

### Change start place

The start place of a game cannot be instantly swapped with another place, but you can overwrite the current start place.

To change the start place:

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Save your **current** start place to a `.rbxl` file or to a new place within the game.
1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and select the game with the start place that you want to change.
1. In the left-hand navigation, navigate to **Configurations** > **Places**.
1. Click **Edit in Studio** for the intended **new** start place. Studio opens and loads that specific place.

   <img src="../../assets/creator-dashboard/Experience-Change-Start-Place.png" width="550" />

1. In the top-left corner of Studio, go to **File** > **Publish As**.

   <Alert severity="error">
   Do not select **Publish** as this would publish the place over itself.
   </Alert>

1. Click the tile for the same game, then choose the **current** start place. Click **Overwrite**.

   <img src="../../assets/publishing/experiences-places-assets/Publish-Window-Select-Start-Place.png" width="720" />

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> If the game is live, it's recommended that you [restart its servers](../../projects/update-games.md#restart-servers).

### Invite early testers

You can invite up to 10 similar-aged friends to preview your game while you're building it. This allows you to get early feedback **before** you release your game publicly and receive a [content maturity label](../promotion/content-maturity.md). For a breakdown of what age ranges can preview your game according to your age, review the following table. If you want to invite someone to preview your game outside of that range, you need to become [trusted friends](https://en.help.roblox.com/hc/en-us/articles/37725513985812-Unlocking-trusted-friends).

<table>
  <thead>
    <tr>
    <th><b>Your age</b></th>
    <th><b>Friends you can add</b></th>
    <th><b>Trusted friends you can add</b></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Under 9</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td>9-12</td>
      <td>9-15, plus under-9 friends with parent approval</td>
      <td>Any age, but under 9 needs parent approval</td>
    </tr>
    <tr>
      <td>13-15</td>
      <td>9-17</td>
      <td>Any age, but under 9 needs parent approval</td>
    </tr>
    <tr>
      <td>16-17</td>
      <td>13+</td>
      <td>Any age, but under 9 needs parent approval</td>
    </tr>
    <tr>
      <td>18+</td>
      <td>16+</td>
      <td>Any age, but under 9 needs parent approval</td>
    </tr>
  </tbody>
</table>

When early testers preview a game, they see a watermark that tells them they're in a preview and that Community Standards still apply. In addition, the same in-game reporting and safety tools available in published games stay active, meaning any concerning content or behavior can still be flagged and reviewed even though the game hasn't completed a full content review.

<Alert severity="warning">
Early testers under 16 can't preview a game rated above the content maturity that their parent allows, and early testers under 18 can't preview a game that has a Restricted maturity label.
</Alert>

To invite early testers to preview your game:

1. In the top-left corner of your computer, navigate to **File** > **Invite early testers**. The **Invite early testers** window displays.
1. Using the search bar in the window, select up to 10 similar-aged friends or trusted friends you want to invite to preview your game, then click the **Invite** button in the bottom-right corner of the window. Each early tester you selected receives an invite to preview your game.

   <img src="../../assets/publishing/Early-testers.png" width="60%" />

1. If you have not already completed an [age check](https://about.roblox.com/age-estimation) or [age verification](./account-verification.md), Roblox prompts you to complete an age check.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> You can manage your early testers by clicking the **Manage Collaborators** button at the top-right corner of Studio. A list of your current early testers displays with the date that you invited them to preview your game. From here, you can:

   - Add additional early testers by using the search bar.
   - Remove early testers by clicking the X button in their row.

## Release games

By default, the games that you publish are only accessible to you as the creator, users with **Edit** access, and group members with the appropriate [roles and permissions](../../projects/groups.md#roles-and-permissions). When you are ready to release your game to additional users, ensure you meet the release requirements below for your target audience, then:

1. In the top-left corner of your computer, navigate to **File** > **Publish**. The **Publish** window displays.
1. To invite early testers before you release your game, click the **Invite** button, otherwise click the **Continue** button. The window updates with the first question of the [Content Maturity](../promotion/content-maturity.md) questionnaire to see if your game contains [age-restricted content](https://en.help.roblox.com/hc/en-us/articles/15869919570708-Restricted-Content-Policy).

   1. If your game contains age-restricted content, answer **Yes**, then complete the entirety of the questionnaire. When you're done, click the **Publish** button. Your game receives an appropriate content maturity label and content descriptors, and it releases only to [age-checked](https://about.roblox.com/age-estimation) Roblox users ages 16+ or [age-verified](../../production/publishing/account-verification.md) Roblox users ages 18+, depending on the content within your game.
   1. If your game does not contain age-restricted content, answer **No**, then click the **Publish** button. Your game receives a **Content May Vary** content maturity label, and it releases only to age-checked Roblox users ages 16+. You can later fill out the entirety of the questionnaire on the Creator Hub if you want to expand reach into Roblox Kids, Select, or specific regions requiring more precise maturity rating.

   <img src="../../assets/publishing/Publish-Rating.png" width="60%" />

1. <Chip label="OPTIONAL" size="small" variant="outlined" /> Grow your audience by either [promoting your game with ads](../promotion/advertise-on-roblox.md) or completing [age verification](./account-verification.md) to start the process of reaching users under the age of 16 years old.

   <img src="../../assets/publishing/Publish-Grow.png" width="60%" />

<Alert severity="info">
You can release up to 5 games per day that have never been released before. This limit resets daily. Revoking public access to a released game, then releasing it again does **not** count toward this limit.
</Alert>

### Target audience

You can set a game's target audience on the Creator Hub:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), select your game.
1. In the left-hand navigation, navigate to **Publish settings** > **Manage Audience**.
1. In the top-right corner, click the **Manage access** button, then set your target audience using the following tabs and settings:

   <table>
     <thead>
       <tr>
       <th><b>Tab</b></th>
       <th><b>Settings</b></th>
       </tr>
     </thead>
     <tbody>
       <tr>
       <td>Playtest</td>
       <td><ul><li>**Early testers** - Your game can only be played by users with **Edit** access and the early testers you invite. This setting is always enabled.</li><li>**Playtesters** - When enabled, your game is only playable to users with **Edit** or **Playtest** access and the early testers you invite.</li></ul></td>
       </tr>
       <tr>
       <td>Public</td>
       <td><ul><li>**Friends** - When enabled, your game can only be played by your friends and those specified in the Playtest tab. When disabled, your game can be played by anyone on Roblox, pending age and geographical restrictions.</li></ul></td>
       </tr>
     </tbody>
   </table>

1. Click **Save Changes**.
1. <Chip label="OPTIONAL" size="small" variant="outlined" /> For **Public** games, you can choose to omit your game from the **Recommended For You** category on Roblox for more limited reach and exposure.

   1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), select your game.
   1. Navigate to **Audience** > **Advanced Settings**.
   1. In the **Recommendations** section, toggle **Exclude from recommendations**.

### Release requirements

<Alert severity="info">
Release requirements apply to **all** release actions:

- Releasing a game for the first time.
- Updating a released game, such as releasing a new version of a place.
- Releasing to a different game via **Publish As**.
- Changing your target audience settings.

</Alert>

To release a game to **ages 16+** and **Trusted Friends**:

- Have an account that is in good standing and at least 2 days old.
- Complete an age check through [facial age estimation](https://about.roblox.com/age-estimation) or [government ID](./account-verification.md#verify-through-government-id).
- Answer the age-restricted content question that displays first in the [Maturity & Compliance Questionnaire](../promotion/content-maturity.md):
  - Answer **No** to receive a **Content May Vary** label. The game releases only to age-checked Roblox users ages 16+.
  - Answer **Yes**, then complete the questionnaire. The game receives a label based on your answers and releases to age-checked Roblox users ages 16+ or age-verified Roblox users ages 18+, depending on the content within your game.

To release a game to **all ages**, including [Roblox Kids and Select](./kids-and-select.md), you must meet all of the previous requirements **plus**:

- Verify your account through [facial age estimation](https://about.roblox.com/age-estimation) if you are under 18 years old, or through [government ID](./account-verification.md#verify-through-government-id) if you are 18 years old or older.
- Enable [2FA](https://en.help.roblox.com/hc/en-us/articles/212459863-Add-2-Step-Verification-to-Your-Account) on your Roblox account.
- Meet **one** of the following:
  - Maintain an active [Roblox Plus](../monetization/roblox-plus.md) or [Roblox Premium](https://www.roblox.com/premium/membership) subscription for 2 consecutive months.
  - Pay a one-time, refundable [fee](#optional-fees).
- Game must pass the [evaluation process](../../production/publishing/kids-and-select.md#for-all-ages-including-kids-and-select-accounts) for **Kids** and **Select** accounts.
- Complete the entire [Maturity & Compliance Questionnaire](../promotion/content-maturity.md) and receive a Minimal, Mild, or Moderate (9+) content rating.

### Optional fees

If you do not have a Roblox Plus or Roblox Premium subscription for 2 consecutive months and you want to release a game to users of all ages, you have the option to pay either a publishing or expedited review fee.

#### Publishing fee

The **publishing fee** is a one-time, refundable fee of 1,000 Robux per game that allows you to release and expand the reach of your game to users of all ages. This fee is intended to make it expensive and logistically difficult for bad actors to create large numbers of accounts and flood the platform with spam.

If your game maintains 25 highly engaged players for 60 days without moderation, you will receive a refund of the publishing fee. However, if your game is permanently moderated or taken down for not meeting Roblox's [Community Standards](https://en.help.roblox.com/hc/articles/203313410) within the 60-day period, the fee will **not** be refunded.

To pay the publishing fee:

1. In the [Creator Hub](https://create.roblox.com/dashboard/creations), select the game you want to release to users of all ages.
1. In the left-hand navigation, navigate to **Audience** > **Reach**.
1. Under **Experience reach**, navigate to the **Refundable publishing fee** section, then click the blue **Pay** button. A pop-up dialog displays.
1. Click the **Pay 1,000** button to confirm your payment.

#### Expedited review fee

The **expedited review** fee is a one-time, refundable fee of 50,000 Robux per game that allows you to accelerate the safety and compliance reviews required to release your game to users of all ages. This fee is intended to provide launch flexibility and financial accountability for qualified creators who haven't yet met the highly engaged age-checked player requirement for Kids and Select accounts.

<Alert severity="info">
While the expedited review fee accelerates safety and compliance reviews for creators planning a timed launch or running an off-platform campaign and need to know exactly when their game will be ready for all ages, **all games must continue to meet the same standards as other Roblox Kids and Select games**.
</Alert>

After 90 days, you can request a refund. As long as your game remains in good standing and maintains 25 highly engaged players, you can withdraw your fee and maintain Roblox Kids and Select eligibility. If your game hasn't hit those organic milestones yet, you can leave the fee in place to maintain your eligibility for Kids and Select audiences. However, if your game is permanently moderated or taken down for not meeting Roblox's [Community Standards](https://en.help.roblox.com/hc/articles/203313410), the fee will **not** be refunded.

To pay the expedited review fee:

1. In the [Creator Hub](https://create.roblox.com/dashboard/creations), select the game you want to expedite for a safety review.
1. In the left-hand navigation, navigate to **Audience** > **Reach**.
1. Under **Experience reach**, navigate to the blue alert, then click the gray **Pay** button. A pop-up dialog displays.
1. Click the **Pay 50,000** button to confirm your payment.

<Alert severity="warning">
If a minor violation is found during the 48-hour review, you must make the appropriate adjustments to your game, then resubmit. The 48-hour clock restarts from the point of resubmission.
</Alert>
