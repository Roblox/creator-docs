---
title: Content maturity and compliance
description: Explains how to accurately disclose content in experiences to receive appropriate maturity labels and content descriptors.
---

**Content maturity** provides information on the experience's main details page about what kinds of content the experience contains so that players can make informed decisions about what they interact with. Roblox uses this information to recommend experiences on the [Home](https://www.roblox.com/home) and [Charts](https://www.roblox.com/charts#/) pages according to each user's age group and regional content policies. When applicable, this information is also used to generate country or locale-specific **experience labels**, which may include different age and maturity recommendations from Roblox's.

<Alert severity = 'error'>
**Additional rules apply to uploaded assets (such as images and meshes)**. Realistic or excessive depictions of violence, blood, crude humor, or romantic themes may be moderated regardless of your experience’s content maturity label. See the [Restricted Content Policy](https://en.help.roblox.com/hc/en-us/articles/15869919570708-Restricted-Content-Policy) for details.
</Alert>

Content maturity consists of two components:

- **Content maturity label** - Indicates the level of maturity suitable for the experience according to child development research and industry standards.
- **Content descriptors** - Indicates what type of content is within an experience, such as realistic depictions of blood or paid item trading.

If an experience does not have accurate or all content maturity information, Roblox restricts the playability of the experience on the platform for all players. In addition, experiences without content maturity information cannot contain any [Restricted content](https://en.help.roblox.com/hc/en-us/articles/15869919570708-Roblox-17-Policy-Standards) without risk of moderation. For this reason, Roblox strongly recommends that you fill out the questionnaire for each of your experiences so that they're available to the largest appropriate audience as possible.

<Alert severity="warning">
   Content descriptors that generate content maturity labels are separate from [genres](../publishing/experience-genres.md) that classify experiences according to their core gameplay. In cases where there is overlap between genres and in-experience content or behavior, answer the Maturity & Compliance questionnaire as accurately as you can regardless of your genre selection or assignment from Roblox.
</Alert>

<Alert severity="info">
   Content maturity information only applies to the content you create for your experience. It does **not** apply to user-generated content that players bring with them into your experience, such as avatar clothing and accessories.
</Alert>

## Generate labels

You can generate content maturity information by filling out the **Maturity & Compliance Questionnaire**, which contains a set of questions about the type of content players can possibly encounter within your experience, as well as how frequently it occurs. Your answers give Roblox an understanding of the content in your experience and ensure that the experience is available to the appropriate audience.

<Alert severity="warning">
   If your experience is going to have [Restricted content](https://en.help.roblox.com/hc/articles/15869919570708), it must first receive a Restricted maturity label so that its content is restricted to age-verified players who are at least 18 years old. You must not add any restricted content to your experience before adding content maturity information.
</Alert>

As you are completing the questionnaire, **base your answers on the most mature or extreme content players can encounter within your experience**. You can retake the questionnaire and generate a new maturity label at any time to accurately reflect the content in your experience. For restricted experiences, you can't change the maturity, but you can update its content descriptors.

To generate content maturity information:

1. **(Optional)** If you want your experience to include restricted content, confirm you are at least 18 years old by [verifying your account](../../production/publishing/account-verification.md) so the questionnaire can ask questions to generate the Restricted maturity label.
1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and click on the thumbnail of the experience you want to generate content maturity information for. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to the **Audience** section, then select **Maturity & Compliance**.
1. If you've never taken the questionnaire before, read the notes and details, then click **Start** to proceed. If you've previously completed the questionnaire, the **Questionnaire Completed** page displays, but you can click the **Restart** button to start over.
1. Answer each page of questions based on the content within your experience, then click the **Save and Continue** button. After you have answered every question, the **Questionnaire Preview** page displays all of your answers, the maturity label, applicable content descriptors, and any regions where your experience is non-compliant according to your answers.

   <Alert severity="error">
   Please review your experience and confirm that your answers accurately reflect the content of your experience. If you intentionally misrepresent your experience, you may be subject to [moderation consequences](#content-maturity-moderation).
   </Alert>

1. If you need to modify a previous answer, click the **Edit** button, otherwise click the **Submit** button to immediately publish the content maturity information to the experience's main page. If your experience receives a Restricted maturity label, servers running the experience restart to remove all players except those age-verified as 18+, and Studio removes all creators from any active [collaboration](../../projects/collaboration.md) session except those age-verified as 18+.

As long as your experience doesn't have a Restricted maturity label, if you believe that your content maturity information doesn't match your intended audience, you can update the content in your experience so that your experience is appropriate for your target audience, then resubmit the questionnaire. To learn how you can dynamically adjust the content of your experience for different audiences, see the `Class.PolicyService` API reference.

<Alert severity="warning">
   If you publish an update that changes any of the answers from the questionnaire, you **must** update your answers and resubmit the questionnaire to remain compliant with Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).
</Alert>

## Questionnaire categories

The following sections provide guidance on answering the questions within each category of the Maturity & Compliance questionnaire. **Content maturity information only applies to content that you create for your experience**, not user-generated content that players bring with them, such as avatar clothing or accessories.

After you submit the questionnaire, your experience receives a maturity label with content descriptors according to the following table, as well as a regional compliance result.

<table>
<thead>
  <tr>
    <th>Maturity label</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Minimal**</td>
    <td>May contain occasional mild violence and/or light unrealistic blood.</td>
  </tr>
  <tr>
    <td>**Mild**</td>
    <td>May contain repeated mild violence, heavy unrealistic blood, mild fear-based content, and/or mild crude humor.</td>
  </tr>
  <tr>
    <td>**Moderate**</td>
    <td>May contain moderate violence, light realistic blood, moderate fear-based content, moderate crude humor, and/or unplayable gambling content.</td>
  </tr>
  <tr>
    <td>**Restricted**</td>
    <td>May contain strong violence, heavy realistic blood, moderate crude humor, romantic themes, unplayable gambling content, the presence of alcohol, and/or strong language.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
   To remain compliant with local laws and regulations, experiences with a Restricted maturity label are unplayable for players who created their accounts or are located in certain countries or regions, such as Korea, Saudi Arabia, and Türkiye (Turkey).
</Alert>

<Alert severity="warning">
   While parents can use parental controls to bypass most content restrictions according to what they believe is appropriate for their child, Roblox restricts [free-form user creation](#free-form-user-creation) and [social hangouts](#social-hangout) to players over 13.
</Alert>

### Violence

**Question 1: Does this experience depict violence and/or violent content?**

Violence is the intentional use of physical or psychological force against players or non-playable characters (NPCs). If your experience includes violence, including within any [asset type](../../projects/assets/index.md#asset-types), you must disclose it in the Maturity & Compliance Questionnaire.

**Question 2: How intense is the violence?**

If your experience contains violence, you must specify the violence's maximum level of intensity according to the following table:

<table>
<thead>
  <tr>
    <th>Violence intensity</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Mild**</td>
    <td>Implied or unrealistic depictions of violence, such as bodies disappearing the moment their health reaches zero.</td>
  </tr>
  <tr>
    <td>**Moderate**</td>
    <td>Non-graphic, realistic-looking depictions of violence and/or death that don't violate Roblox Community Standards, such as realistic depictions of real-life injuries.</td>
  </tr>
  <tr>
    <td>**Restricted**</td>
    <td>Graphic and realistic-looking depictions of violence and/or death that do not violate the [Restricted Content Policy](https://en.help.roblox.com/hc/en-us/articles/15869919570708-Roblox-17-Policy-Standards), such as non-real world beheadings/decapitation, impalement, hangings, dismemberment, mutilation, severed/severing body parts, presence of organs, maiming, disfiguration, and electrocution.<br></br><br></br>**Experiences with strong violence are only available to age-verified players that are at least 18 years old.**</td>
    <td></td>
  </tr>
</tbody>
</table>

If you imply violence anywhere within your experience, such as violence that occurs off-screen that players can hear but can't see, your experience automatically meets the mild criteria.

If you visually show violence, the criteria for meeting mild, moderate, or strong violence depends on the **consequence** of the violence. For example, if the consequence of violence is unrealistic, your experience meets the mild criteria, but if there is any moment that the consequence of violence is realistic, your experience meets either the moderate or strong criteria, even if the realistic violence only occurs once.

<Alert severity="error">
   Roblox doesn't allow content that contains extreme violence or serious physical or psychological abuse. This includes animal abuse and torture, realistic depictions of extreme gore, or the depiction, support, or glorification of war crimes or human rights violations, including torture. For more information, see Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410) and [Restricted Content Policy](https://en.help.roblox.com/hc/articles/15869919570708).
</Alert>

**Question 3: How frequent is the violence?**

After you specify its intensity, you must also specify how often the violence occurs within your experience according to the following table. Note that even a small part of your experience contains repeated violence, it meets the Repeated criteria.

<table>
<thead>
  <tr>
    <th>Violence frequency</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Occasional**</td>
    <td>Violence occurs either rarely or occasionally, such as at a couple key moments of the experience.</td>
  </tr>
  <tr>
    <td>**Repeated**</td>
    <td>Violence either occurs often, or it occurs rarely, but when it does occur, many violent events happen in quick succession.</td>
  </tr>
</tbody>
</table>

### Blood

**Question 1: Does this experience depict any blood?**

Blood is the red liquid that flows through human and animal bodies that's essential to life. If your experience includes blood, including within any [asset type](../../projects/assets/index.md#asset-types), you must disclose it within the Maturity & Compliance Questionnaire.

**Question 2: How realistic is the blood?**

If your experience contains blood, you must specify the blood's realism according to the following table:

<table>
<thead>
  <tr>
    <th>Blood realism</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Unrealistic**</td>
    <td>Blood appears unrealistic, such as being pixelated or having a different color or shape.</td>
  </tr>
  <tr>
    <td>**Realistic**</td>
    <td>Blood appears realistic, such as having the same color, shape, and splatter properties as blood in the real world.</td>
  </tr>
</tbody>
</table>

**Question 3 for unrealistic blood: Are the depictions of blood infrequent and/or fleeting?**

If you answer unrealistic for question 2, you must also specify how often the unrealistic blood occurs within your experience according to the following table:

<table>
<thead>
  <tr>
    <th>Unrealistic blood frequency</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Yes**</td>
    <td>Unrealistic blood only occurs sometimes, such as yellow blood splattering for a few seconds.</td>
  </tr>
  <tr>
    <td>**No**</td>
    <td>Unrealistic blood only occurs often, such as repeated bloodshed or with lasting imagery.</td>
  </tr>
</tbody>
</table>

**Question 3 for realistic blood: What level of blood and/or gore is depicted?**

If you answer realistic for question 2, you must also specify the blood's maximum level of intensity according to the following table. Note that if you depict realistic blood anywhere within your experience, such as blood splatter from a distance, your experience automatically meets the Light criteria.

<table>
<thead>
  <tr>
    <th>Blood intensity</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Light**</td>
    <td>The bloodshed is minimal, such as blood spatter from a distance.</td>
  </tr>
  <tr>
    <td>**Heavy**</td>
    <td>The bloodshed is significant, such as pools of blood, gushing blood, and up-close blood spatter.<br></br><br></br>**Experiences with heavy, realistic blood are only available to age-verified players that are at least 18 years old.**</td>
    <td></td>
  </tr>
</tbody>
</table>

### Fear

**Question 1: Does this experience include scary elements that may trigger fear?**

Fear-based content contains scary or horrifying elements that trigger fear in players. If your experience includes scary elements, including within any [asset type](../../projects/assets/index.md#asset-types), you must disclose it in the Maturity & Compliance Questionnaire.

**Question 2: What level of scary elements are there?**

If your experience contains scary elements, you must specify the intensity of the elements according to the following table:

<table>
<thead>
  <tr>
    <th>Scary elements intensity</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Mild**</td>
    <td>Loud/heavy breathing, pounding heart, shrieking or screaming, creepy-looking NPCs, jump scares, ominous music, and/or gameplay that builds suspense.</td>
  </tr>
  <tr>
    <td>**Moderate**</td>
    <td>Characters with disfigured mouths with realistic blood, lack of flesh with realistic-looking connective tissues, organs, and/or blood vessels visible, realistic open wounds and/or leaking/bleeding eyes with realistic blood. </td>
  </tr>
</tbody>
</table>

<BaseAccordion>
   <AccordionSummary>

   <Typography variant="label1">Moderate Examples (Not Suitable for Young Readers)</Typography>
   </AccordionSummary>
   <AccordionDetails>

   The following images meet the moderate criteria for fear-based content.

   <GridContainer numColumns="3">
     <figure>
     <img width="100%" img src="../../assets/promotion/misc/ModerateFear-Blocky.png" alt="" />
     <figcaption>Includes visible organs, blood vessels, and leaking/bleeding eyes.</figcaption>
     </figure>
     <figure>
     <img width="100%" img src="../../assets/promotion/misc/ModerateFear-NoFlesh.png" alt="" />
     <figcaption>Includes realistic blood and a lack of flesh.</figcaption>
     </figure>
     <figure>
     <img width="100%" img src="../../assets/promotion/misc/ModerateFear-BloodyEyes.png" alt="" />
     <figcaption>Includes realistic open wounds and leaking/bleeding eyes.</figcaption>
     </figure>
   </GridContainer>

   </AccordionDetails>
   </BaseAccordion>
<br></br>

**Question 3: How frequently do the scary elements occur?**

After you specify its intensity, you must also specify how often the scary elements occur within your experience according to the following table. Note that even a small part of your experience contains repeated scary elements, it meets the Repeated criteria.

<table>
<thead>
  <tr>
    <th>Scary elements frequency</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Occasional**</td>
    <td>Scary elements occur either rarely or occasionally, such as at a couple key moments of the experience.</td>
  </tr>
  <tr>
    <td>**Repeated**</td>
    <td>Scary elements either occur often, or they occur rarely, but when they do occur, many violent events happen in quick succession.</td>
  </tr>
</tbody>
</table>

### Crude humor

**Question 1: Does this experience depict, reference, or encourage crude humor?**

Crude humor is a type of humor that depicts or references crude bodily functions, such as burping, farting, vomit, pee, and/or poop for comical purposes. If your experience includes crude humor, including within any [asset type](../../projects/assets/index.md#asset-types), you must disclose it in the Maturity & Compliance Questionnaire.

**Question 2: What is the level of crude humor?**

If your experience contains crude humor, you must specify the intensity of the elements according to the following table:

<table>
<thead>
  <tr>
    <th>Level of crude humor</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Mild**</td>
    <td>Depicts and/or references burping, farting (e.g. fart cloud), and/or unrealistic looking vomit or poop (e.g. poop coils, poop emoji).</td>
  </tr>
  <tr>
    <td>**Moderate**</td>
    <td>Depicts and/or references pee.</td>
  </tr>
</tbody>
</table>

### Gambling

**Question 1: Does this experience contain unplayable gambling content?**

Gambling is the practice of exchanging real world money, Robux, or in-experience items of value for a game of chance. While experiences cannot contain playable gambling content, including simulated gambling, you can depict unplayable gambling content, such as showing a casino or people playing cards that players cannot bet on or play.

You do **not** need to report depictions of, and/or references to, items or activities that are typically associated with gambling, but are not games of chance/luck, such as horse racing, car racing, and poker chips.

### Strong language

**Question 1: Do you depict and/or want to allow strong language in your experience?**

Strong language is vulgar and obscene language that is not used to harass, discriminate, incite violence, or threaten others, or used in a sexual context. For example, strong language content could be depictions of a non-playable character (NPC) using obscenity like the "f-word" that is not directed towards another character or group of people (e.g. "f* off").

If your experience includes strong language, you must disclose it within the Maturity & Compliance Questionnaire. Experiences that include strong language are only available to age-verified players that are at least 18 years old.

<Alert severity="info">
   If you want to enable strong language in player communication aside from content for your experiences with **Restricted** content maturity labels, see [here](../../projects/configure-experiences.md#allow-strong-language).
</Alert>

### Romantic themes

**Question 1: Does this experience depict or reference (including in the title) romantic themes and/or primarily take place in private spaces (e.g. shower stalls, hotel rooms) or settings intended for adults (e.g. clubs, bars)?**

To understand this question, it's important to understand three different definitions:

- Romantic themes are non-sexual expressions of love or affection, such as a quick kiss on the mouth.
- Private spaces are enclosed spaces that meet the following two criteria:
  - They are designed for activities that are personal and secluded, such as sleeping, changing clothes, or bathing.
  - They are designed for one person or for a very small number of people to engage in private activities, such as a bathroom stall, bedroom, or small tent.
- Settings intended for adults are settings that are designed to cater to adult clientele. These settings are often legally restricted to individuals who have reached the age of majority and are otherwise deemed inappropriate or unsuitable for minors, such as clubs or bars.

If your experience includes (including in the title) romantic themes and/or primarily takes place in private spaces or settings intended for adults, you must disclose it within the Maturity & Compliance Questionnaire, and it will only be available to age-verified players that are at least 18 years old.

### Alcohol

**Question 1: Does this experience depict, reference, or include use of alcohol?**

Alcohol is an intoxicating adult beverage. If your experience includes, depicts, or references alcohol, or depicts adult business and locations that provide or sell alcohol, such as characters drinking alcohol at a bar, you must disclose it within the Maturity & Compliance Questionnaire. Experiences that depict alcohol are only available to age-verified players that are at least 18 years old.

### Social hangout

**Question 1: Is the primary theme or activity of this experience a social hangout?**

Social hangouts are experiences where the primary theme or activity is to talk to or interact with other players using voice or text chat. This includes hangouts, vibe games, socializing spaces, and supportive places like sad rooms. It does not apply to experiences where the primary theme or activity is roleplay. To be considered a roleplay experience, the roleplay components, such as adopting a new role and using in-game items to play your role with, must be central to the experience. Note that if your title or description includes content referencing social hangouts, your experience will be classified as a social hangout. If this is inaccurate, please update your title or description and re-take the questionnaire.

If your experience is a social hangout, you must disclose it within the Maturity & Compliance Questionnaire.

**Question 2: Does your experience include private spaces?**

If your experience is a social hangout, you must specify if it includes private spaces. Private spaces are enclosed spaces that meet the following two criteria:

- They are designed for activities that are personal and secluded, such as sleeping, changing clothes, or bathing.
- They are designed for one person or for a very small number of people, such as a bathroom stall, bedroom, or small tent.

If your experience is a social hangout that includes private spaces, you must disclose it within the Maturity & Compliance Questionnaire. Social hangouts without private spaces are only available to players that are at least 13 years old, and social hangouts with private spaces are only available to age-verified players that are at least 18 years old.

### Free-form user creation

**Question 1: Does this experience include free-form user creation?**

Free-form user creation are features that allow players to create anything within an experience, such as writing words or making illustrations on a chalkboard. While this applies to in-experience, free-form drawing or creation tools, it does not apply to in-experience creations that players assemble with 3D assets, such as building a house or creating an outfit, or anything that goes through Roblox moderation before it's published or replicated.

If your experience includes free-form user creation features, you must disclose it within the Maturity & Compliance Questionnaire. Free-form user creation is only available to players that are at least 13 years old.

### Sensitive issues

**Question 1: Is the primary theme of this experience a sensitive issue?**

Sensitive issues are any current social, political, and religious issue that meets the following criteria:

- **Polarized Viewpoints** - The issue has a limited number of strongly opposing viewpoints, with little room for compromise or middle ground.
- **Strong Emotional Response** - The issue evokes strong emotional reactions and/or passionate debate.

Sensitive issues are frequently in the news and inspire strong opinions and debate. For example: immigration, capital punishment, gun control, marriage equality, pay equity in sports, prayer in schools, racial profiling, affirmative action, vaccination policies, and reproductive rights. What meets the criteria can differ significantly depending on your location and cultural context, so answer from your local perspective.

If your experience includes content related to a sensitive issue or people implicated by them, but it isn't primarily themed on that issue, such as a religious building in a city, guns in a first-person shooter experience, or a national holiday parade in a hangout experience, you do **not** need to disclose it within the Maturity & Compliance Questionnaire.

However, if the **majority of the content or gameplay of your experience** refers to a sensitive issue, you must disclose it within the Maturity & Compliance Questionnaire. Experiences with a primary theme of a social issue are only available to players that are at least 13 years old unless a parent has [manually allowed access](https://en.help.roblox.com/hc/en-us/articles/30428310121620-Parental-Controls-Overview) to these experiences.

<Alert severity="info">
Individual assets, as well as text and voice chat, do not qualify for this descriptor.
</Alert>

### Paid random items

**Question 1: Does this experience contain paid random items?**

Paid random items are virtual items players can purchase with Robux or other currency. If your experience includes paid random items, such as a coin players can purchase with Robux to later redeem for a random virtual item, you must disclose it within the Maturity & Compliance Questionnaire.

You do **not** need to report virtual items that you provide in exchange for players completing an action that doesn't involve the payment of Robux or any other currency.

**Question 2: Does this experience respect the ArePaidRandomItemsRestricted policy API?**

If your experience contains paid random items, it's recommended to take the mandatory precautions to protect players in certain regions that don't allow paid random items so that they can still access your experience. To check when these precautions are necessary, use `Class.PolicyService.GetPolicyInfoForPlayerAsync` to return a dictionary of values that determine whether certain aspects of the experience need to change for that unique player.

One entry within the policy information is `ArePaidRandomItemsRestricted`, a boolean that represents whether a player is eligible to pay for random items. Random items can remain purchasable if `ArePaidRandomItemsRestricted` returns false, but if `ArePaidRandomItemsRestricted` returns true, include additional logic to hide, replace, or block the purchase of random items for those players so that your experience is available to the largest audience as possible.

### Paid item trading

**Question 1: Does this experience contain the ability for users to trade items that they paid for?**

Paid item trading is the ability for players to purchase virtual items that they can then trade with other players. If your experience includes paid item trading, such as a marketplace for exchanging Limited items, you must disclose it within the Maturity & Compliance Questionnaire.

**Question 2: Does this experience respect the IsPaidItemTradingAllowed policy API?**

If your experience contains paid item trading, it's recommended to take the mandatory precautions to protect players in certain regions that don't allow paid item trading so that they can still access your experience. To check when these precautions are necessary, use `Class.PolicyService.GetPolicyInfoForPlayerAsync` to return a dictionary of values that determine whether certain aspects of the experience need to change for that unique player.

One entry within the policy information is `IsPaidItemTradingAllowed`, a boolean that represents whether a player is eligible to trade paid items. Paid items can remain tradeable if `IsPaidItemTradingAllowed` returns true, but if `IsPaidItemTradingAllowed` returns false, include additional logic to hide, replace, or block the trading of paid items for those players so that your experience is available to the largest audience as possible.

### Media

**Question 1: Does your experience allow users to share media content (videos, images, text, audio, 3D models) from their gameplay that other users can see?**

This question only applies if your experience lets users share gameplay content using tools built into the experience itself.

**Question 2: Does your experience contain content feeds with continuous loading or audio/video that plays automatically?**

**Continuous loading** means that content loads automatically as the user scrolls, without requiring any specific user interaction (such as a manual "load more" button or pagination).

**Question 3: Does your experience allow users to view content that was captured from other experiences on Roblox?**

This question applies to any in-experience viewing functionality, such as a `Class.SurfaceGui` for static images, a `Class.VideoFrame`, or an asset viewer.

### AI interaction

**Question 1: Does your experience allow users to interact with generative AI components?**

This question includes experiences in which a user can interact with a generative AI model in any way that triggers a response from the model. These interactions can include text chat, voice chat, images, 3D generations, avatar movement, etc.

Your answer to this question should **not** consider whether you used generative AI to help develop the experience, only whether users can interact with it in the experience.

**Question 2: What type of interactions does your experience allow between users and a generative AI model?**

**Extended interactions** meet at least one of the following criteria:

- Cross-session memory is enabled. The experience saves the context of a user's prior interactions with AI and loads it on subsequent sessions.
- The experience's main purpose is to interact with a generative AI bot or character. Users can interact with the AI continuously with no time limit.

Experiences that do not meet at least one of these criteria are considered **limited interactions**.

## Content maturity moderation

Roblox relies on the information you provide in the Maturity & Compliance Questionnaire to generate accurate content maturity information, so the Moderation team may review your content maturity to ensure its validity based on the content of your experience. Whenever Roblox discovers a discrepancy between your submission and the content in your experience, the following actions occur:

- You receive a moderation notification through a private message on Roblox.
- The **Maturity & Compliance Questionnaire** page on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) updates to provide moderator feedback and guidance on how to generate accurate content maturity information.
- Roblox provides a moderation action.
  - If your experience contains restricted content without a Restricted maturity label, your experience is subject to moderation consequences.
  - If your experience contains content that is prohibited by Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), or [Restricted Content Policy](https://en.help.roblox.com/hc/articles/15869919570708), your experience is subject to moderation consequences.
  - If your experience otherwise has inaccurate content maturity information according to its content, Roblox may remove the maturity label (or only some or all descriptors if the maturity label is Restricted) from your experience. If an experience does not have content maturity information, Roblox restricts the playability of the experience on the platform for all players.
  - If you repeatedly include inaccurate content maturity information, **your experience and/or account is subject to moderation consequences**.

If your experience receives a moderation action and you believe Roblox made a mistake, you can appeal the decision:

1. If you are the owner of a user-owned experience or the group owner of a group-owned experience, navigate to [roblox.com/report-appeals](https://www.roblox.com/report-appeals#/).
1. Select the violation you want to appeal.
1. Click the **Request Appeal** button.
1. **(Recommended)** In the text field, describe why the moderation action was a mistake.
1. Click **Send** to submit your appeal.

Even if the violation does not appear on the **Violations & Appeals** page, you can appeal the decision:

1. Click **Support** (appeal something not shown).
1. Confirm your contact information and device type,
1. Set **Type of help category** to **Appeal a Decision**.
1. Set **Help Subcategory Type** to **I was wrongly moderated for other content I created**.
1. Input your experience ID into the **Asset ID** field.
1. In the **Please describe your issue** field, describe why the moderation action was a mistake.
1. Click **Continue** to submit your appeal.

If your appeal is accepted, **Appeal accepted** is shown under your violation when you click on it.
