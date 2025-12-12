---
title: Experience guidelines
description: Explains how to provide accurate descriptions of experiences to determine accurate experience ratings.
---

**Experience guidelines** provide information on the experience's main page about what kind of content the experience contains so that players can make informed decisions about what they interact with. Roblox uses this information to recommend experiences on the [Home](https://www.roblox.com/home) and [Charts](https://www.roblox.com/charts#/) pages according to each user's age group and regional content policies.

Experience guidelines consist of two components:

- **Age recommendations** — Indicates which age group an experience is suitable for based on child development research and industry standards. For more information, see [Age recommendations](https://en.help.roblox.com/hc/en-us/articles/8862768451604).
- **Content descriptors** — Indicates what type of content is within an experience, such as realistic depictions of blood or paid item trading.

<img src="../../assets/promotion/misc/Experience-Guidelines-Example.png" width="820" />

Roblox treats experiences without guidelines the same as experiences with an age recommendation of **Ages 13+**, meaning Roblox doesn't recommend them to younger players. In addition, experiences without guidelines cannot contain any [17+ content](https://en.help.roblox.com/hc/articles/15869919570708) without risk of moderation. For this reason, Roblox strongly recommends that you fill out the questionnaire for each of your experiences so that they're available to the largest appropriate audience possible.

<Alert severity="info">
   Experience guidelines only apply to the content you create for your experience. They do **not** apply to user-generated content that players bring with them into your experience, such as avatar clothing and accessories.
</Alert>

## Generate experience guidelines

If your Roblox account is at least 30 days old, you can generate experience guidelines by filling out the **Experience Questionnaire** which contains a set of questions about the type of content players can possibly encounter within your experience, as well as how frequently it occurs. Your answers give Roblox an understanding of the content in your experience and ensure that the experience is available to the appropriate audience.

<Alert severity="info">
   If your experience is going to have [17+ content](https://en.help.roblox.com/hc/articles/15869919570708), it must first receive experience guidelines with an age recommendation of 17+ so that its content is restricted to verified players who are at least 17 years old. You must not add any 17+ content to your experience before before generating guidelines with an age recommendation of 17+.
</Alert>

As you are completing the questionnaire, **base your answers on the most mature or extreme content players can encounter within your experience**. You can retake the questionnaire and generate new guidelines at any time to accurately reflect the content in your experience. For 17+ experiences, you can't change the age recommendation, but you can update the content descriptors.

To generate experience guidelines:

1. **(Optional)** If you want your experience to include 17+ content, confirm you are at least 17 years old by [verifying your account](../../production/publishing/account-verification.md) so the questionnaire can ask questions to generate the correct age recommendation of 17+.
1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations) and click on the thumbnail of the experience you want to generate experience guidelines for. The experience's **Overview** page displays.
1. In the left-hand navigation, navigate to the **Audience** section, then select **Maturity & Compliance**.
1. If you've never taken the questionnaire before, read the notes and details and click **Start** to proceed. If you've previously completed the questionnaire, the **Questionnaire Completed** page displays, but you can click the **Restart** button to start over.
1. Answer each page of questions based on the content within your experience, then click the **Save and Continue** button. After you've answered every question, the **Questionnaire Preview** page displays all of your answers, the age recommendation and content descriptors for the experience, and any regions where your experience is non-compliant based on your answers.
1. If you need to modify a previous answer, click the **Edit** button, otherwise click the **Submit** button to immediately publish the guidelines to the experience's main page. If your experience receives an age recommendation of 17+, servers running the experience restart to remove all players except those age-verified as 17+, and Studio removes all players from any active [collaboration](../../projects/collaboration.md) session except those age-verified as 17+.

If you believe that the rating doesn't match your intended audience, and the experience doesn't have an age recommendation of 17+, you can update the experience's content so that it's appropriate for your target audience, then resubmit the questionnaire. To learn how you can dynamically adjust the content of your experience for different audiences, see the `Class.PolicyService` reference.

<Alert severity="warning">
   If you publish an update that changes any of the answers from the questionnaire, you **must** return and update your answers and resubmit the questionnaire to remain compliant with Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846).
</Alert>

<Alert severity="error">
	Please review your experience and confirm that your answers accurately reflect the content of your experience. If you intentionally misrepresent your experience, you may be subject to [moderation consequences](#experience-guidelines-moderation).
</Alert>

## Questionnaire categories

The following sections provide guidance on answering the questions within each category of the questionnaire. **Guidelines only apply to content that you create for your experience**, not user-generated content that players bring with them, such as avatar clothing and accessories.

After you submit the questionnaire, your experience receives an age recommendation with content descriptors according to the following table.

<table>
<thead>
  <tr>
    <th>Age recommendation</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**All ages**</td>
    <td>Content is generally suitable for all ages. May contain occasional mild violence and/or light unrealistic blood.</td>
  </tr>
  <tr>
    <td>**9+**</td>
    <td>Content is generally suitable for ages 9 and up. May contain repeated mild violence, heavy unrealistic blood, mild crude humor, and/or mild fear-based content.</td>
  </tr>
  <tr>
    <td>**13+**</td>
    <td>Content is generally suitable for ages 13 and up. May contain repeated moderate violence, light realistic blood, moderate crude humor, unplayable gambling content, moderate fear-based content, free-form user creation, and/or is a social hangout.</td>
  </tr>
  <tr>
    <td>**17+**</td>
    <td>Content is only suitable for ages 17 and up. May contain strong violence, heavy realistic blood, moderate crude humor, romantic themes, unplayable gambling content, strong language, and/or the presence of alcohol.</td>
  </tr>
</tbody>
</table>

<Alert severity="info">
   To remain compliant with local laws and regulations, experiences with an age recommendation of 17+ are unplayable for players who created their accounts or are located in certain countries or regions, such as Korea, Saudi Arabia, and Türkiye (Turkey).
</Alert>

<Alert severity="warning">
   While parents can use parental controls to bypass most content restrictions according to what they believe is appropriate for their child, Roblox restricts free form user creation and social hangouts to players over 13.
</Alert>

### Violence

Violence is the intentional use of physical or psychological force against players or non-playable characters (NPCs). If your experience includes violence, including within any [asset type](../../projects/assets/index.md#asset-types), you must disclose it in the experience questionnaire based on the violence's maximum level of intensity and how often a user might encounter it.

#### Level of intensity

After you confirm that your experience contains violence, you must specify whether the maximum level of intensity of violence within your experience is **mild**, **moderate**, or **strong**. If you imply violence anywhere within your experience, such as violence that occurs off-screen that players can hear but can't see, your experience automatically meets the mild criteria.

If you visually show violence, the criteria for meeting mild, moderate, or strong violence depends on the **consequence** of the violence. For example, if the consequence of violence is unrealistic, such as characters disappearing the moment they die, your experience meets the mild criteria, but if there is any moment that the consequence of violence is realistic, such as characters mimicking real-life injury or death, your experience meets either the moderate or strong criteria, even if the realistic violence only occurs once. Experiences with strong violence are only available to verified players that are at least 17 years old.

<Alert severity="error">
   Roblox doesn't allow content that contains extreme violence or serious physical or psychological abuse. This includes animal abuse and torture, realistic depictions of extreme gore, or the depiction, support, or glorification of war crimes or human rights violations, including torture. For more information, see Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410) and [17+ Policy Standards](https://en.help.roblox.com/hc/articles/15869919570708).
</Alert>

#### Frequency

The next question of the violence category asks you to specify whether the frequency of violence within your experience is **occasional** or **repeated**. Occasional violence occurs either rarely or occasionally, such as at a couple key moments of the experience. Repeated violence either indicates that violence occurs often, or that it occurs rarely, but when it does occur, many violent events happen in quick succession. This means that even if a small part of your experience contains repeated violence, it meets the repeated criteria.

### Blood

Blood is the red liquid that flows through human and animal bodies that's essential to life. If your experience includes blood, including within any [asset type](../../projects/assets/index.md#asset-types), you must disclose it within the experience questionnaire and specify whether the realism of blood is **unrealistic** or **realistic**. Unrealistic blood doesn't look like real blood, so if you display blood within your experience as pixels, or as a different color or shape, it meets the unrealistic criteria. Realistic blood, however, has the same color, shape, and splatter properties as blood in the real world.

If you answer **unrealistic**, the questionnaire asks if the blood depictions are infrequent and/or fleeting, such as yellow blood splattering on the screen for a few seconds.

The next question of the blood category asks you to specify whether the level of intensity of blood within your experience is **light** or **heavy**. If you depict blood anywhere within your experience, such as blood splatter from a distance, your experience automatically meets the light criteria. If you depict heavy bloodshed, such as pools of blood, gushing blood, organs or intestines, decapitation, dismemberment, mutilation of body parts, and/or up-close blood spatter, your experience meets the heavy criteria. Experiences that include heavy bloodshed are only available to verified players that are at least 17 years old.

### Crude humor

Crude humor is a type of humor that depicts or references bodily functions, such as belching, flatulence, vomiting, urinating, and/or defecation for comical purposes. If your experience includes crude humor, including within any [asset type](../../projects/assets/index.md#asset-types), you must specify if it is **mild** or **moderate** within the experience questionnaire based on what bodily functions you use for comical purposes.

For example, if you depict or reference flatulence, vomiting, and/or unrealistic looking feces, such as poop coils or the poop emoji, your experience meets the mild criteria. If you depict or reference urine, urination, realistic looking feces, or your experience is primarily themed or set in a bathroom, your experience meets the moderate criteria.

### Gambling

Gambling is the practice of exchanging real world money, Robux, or in-experience items of value for a game of chance. While experiences cannot contain playable gambling content, including simulated gambling, you can depict unplayable gambling content, such as showing a casino or people playing cards.

### Social hangout

Social hangouts are experiences in which the primary theme or activity is to chat or interact with other players with voice or text either as themselves or as their avatar. While this applies to vibe games, clubs, socializing spaces, and supportive places like sad rooms, it does **not** apply to roleplay and/or life simulation experiences where players adopt various roles like teacher or police officer, or are provided with items to role-play with.

If your experience is a social hangout, you must disclose it within the Maturity & Compliance Questionnaire. Social hangouts are only available to players that are at least 13 years old.

### Free-form user creation

Free-form user creation are features that allow players to create anything within an experience, such as writing words or making illustrations on a chalkboard. While this applies to in-experience, free-form drawing or creation tools, it does **not** apply to in-experience creations that players assemble with 3D assets, such as building a house or creating an outfit, or anything that goes through Roblox moderation before it's published or replicated.

If your experience includes free-form user creation features, you must disclose it within the Maturity & Compliance Questionnaire. Free-form user creation is only available to players that are at least 13 years old.

### Alcohol

Alcohol is an intoxicating adult beverage. If your experience includes, depicts, or references alcohol or adult businesses and locations that provide or sell alcohol, you must disclose it within the experience questionnaire. Experiences that depict alcohol are only available to verified players that are at least 17 years old.

### Romantic themes

Romantic themes are the non-sexual expression of love or affection. If your experience includes romantic themes, such as a quick kiss on the mouth, you must disclose it within the experience questionnaire. Experiences that include romantic themes are only available to verified players that are at least 17 years old.

### Strong language

Strong language is vulgar and obscene language that players cannot use to harass, discriminate, or threaten others, incite violence, or use in a sexual context. For example, strong language content can be depictions of a non-playable character (NPC) using an obscenity like the "f-word" that isn't directed toward another character or group of people, for example "F* off!".

If your experience includes strong language, you must disclose it within the experience questionnaire. Experiences that include strong language are only available to verified players that are at least 17 years old.

<Alert severity="info">
   If you want to enable strong language in user communication aside from content for your 17+ experiences, see [here](../../projects/configure-experiences.md#allow-strong-language).
</Alert>

### Fear

Fear-based content contains scary or horrifying elements that may trigger fear in players. If your experience includes scary elements, including within any [asset type](../../projects/assets/index.md#asset-types), you must specify if it is **mild** or **moderate** within the experience questionnaire based on the content's intensity.

For example, mild scary elements can include loud or heavy breathing, sounds of a pounding heart, shrieking or screaming, creepy-looking NPCs, jump scares, ominous music, and/or gameplay that builds suspense; moderate scary elements can include NPCs with disfigured mouths with realistic blood, lack of flesh with realistic-looking connective tissues, organs, and/or blood vessels visible, realistic open wounds and/or leaking/bleeding eyes with realistic blood.

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

After you specify the level of intensity, the questionnaire asks you to specify whether the frequency of the fear-based content within your experience is **occasional** or **repeated**. Occasional scary elements occur either rarely or occasionally, such as at a couple key moments of the experience. Repeated scary elements either indicate that fear-based content occurs often, or that it occurs rarely, but when it does occur, many scary elements happen in quick succession.

<Alert severity="info">
   The fear descriptor only applies to the content you create for your experiences. It does **not** apply to user-generated content that players bring with them into your experience, such as avatar clothing and accessories.
</Alert>

## Experience guidelines moderation

Roblox relies on the information you provide in the experience questionnaire to generate accurate guidelines, so the moderation team may review your generated guidelines to ensure their validity based on the content of your experience. Whenever Roblox discovers a discrepancy between your submission and the content in your experience, the following actions occur:

- You receive a moderation notification through a private message on Roblox.
- The **Questionnaire** page on the [Creator Dashboard](https://create.roblox.com/dashboard/creations) updates to provide moderator feedback and guidance on how to generate accurate experience guidelines.
- Roblox removes the current guidelines from your experience's main page, and your experience becomes only visible to players aged 13+ years.
- Roblox provides a moderation action.
  - If your experience contains 17+ content without an age recommendation of 17+, your experience is subject to moderation consequences.
  - If your experience contains content that is noncompliant with Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), or [17+ Policy Standards](https://en.help.roblox.com/hc/articles/15869919570708), your experience is subject to moderation consequences.
  - If your experience otherwise has inaccurate guidelines according to its content, Roblox may remove the current guidelines (or some or all of the descriptors if the age recommendation is 17+). Roblox treats unrated experiences the same as those with an age recommendation of **Ages&nbsp;13+**.
