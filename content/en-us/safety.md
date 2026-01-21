---
title: How you can help us make Roblox safer
description: Roblox is a 3D creation platform that provides everything you need to build, test, distribute, and monetize 3D creations.

---

Creating a successful Roblox experience goes beyond great gameplay; it involves building a safe and welcoming environment for all players. Creating a safe and welcoming platform is a collaborative partnership between Roblox and the developer community, and as a creator, you play a vital role in upholding our [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410#safety). This guide provides an overview of Roblox's policies, essential safety tools, and design principles to help you foster a positive community.

## Design your experience with a safety-first mindset

Proactive design choices are the most effective way to significantly enhance the safety of your experience.

- **Safeguard User-Generated Content (UGC):** If your experience includes features that enable players to create and share their own content (such as art, outfits, emotes, text, or structures), consider potential misuse of these features and how to effectively keep them under control. This could involve pre-moderation before content goes public, tools to limit reach by making UGC ephemeral, granting UGC privileges to trusted users or only enabling pre-set options for customization.
- **Monitor in-experience avatar editors:** Bad actors can mis-use avatar editor tools to create inappropriate content or combinations. Frequently monitor avatars in your experience and consider restricting the use of avatar/clothing editors if you see a high rate or increase in abuse.
- **Avoid designing experiences that encourage abusive user behavior:** Address design decisions that lead to uncivil behaviour quickly. For experiences available to users under 18 years of age, avoid designing environments that primarily take place in private spaces, such as bedrooms, bathrooms, or closets. Build in bounding box limitations for assets that could potentially invoke bad user behavior, such as beds or sleeping surfaces. These settings can be misused by bad actors to create scenarios that violate our Community Standards. Experiences that primarily take place in adult settings like night clubs, dance clubs, or bars should also be restricted to users over 18. For more information, see [here](https://devforum.roblox.com/t/strengthening-our-safety-policies-and-tools/3882864#p-12931585-blocking-users-under-17-from-social-hangouts-with-private-spaces-and-experiences-primarily-set-in-private-spaces-4).

## Essential safety tools for every Creator

Roblox provides tools to help you maintain a safe environment in your experience. Integrating these can help you maintain a safe environment in your experience.

### Complete the Content Maturity & Compliance Questionnaire

All public experiences are required to have an accurately completed [Maturity & Compliance Questionnaire](https://create.roblox.com/docs/production/promotion/content-maturity). You should answer all questions truthfully to ensure your experience is rated appropriately. If you add new content that changes your answers, you should update the questionnaire immediately. Your experience and account could be moderated if you repeatedly answer the Maturity & Compliance Questionnaire incorrectly.

### Manage player behavior with bans, kicks, and verifications

The `Class.Players:BanAsync()|Ban API` is your primary tool for removing disruptive users. When you ban a player using `BanAsync()`, you can provide a clear, policy-based reason. The system also helps detect potential alternate accounts of the banned user, making your moderation efforts more effective. Alternatively, you can use `Class.Players:Kick()|kick API` to disconnect abusive users from a server. You can designate trusted users to trigger this method on other users. For best practices on detecting and managing security and cheating in your experiences, see [Security tactics and cheat mitigation](./scripting/security/security-tactics.md).

If you want to gate parts of your experience to identity-verified players, you can use `Class.Player:IsVerified()|IsVerified API`. Tying identity verification signals to user accounts can deter behaviors like cheating, scamming, or harassment. Common use cases are protecting the integrity of in-experience ranking and trading. We suggest that you make benefits for account verification clear to the user at different points of the experience such as onboarding, exclusive features or special zone access.

### Use text filter on all user communications

You should [filter](./ui/text-filtering.md) all user-generated text that is visible to other players. This includes signs, pet names, or anything a player can type. The `Class.TextService` is essential for this. Use `Class.TextService.FilterStringAsync()` to prevent inappropriate language and the sharing of personally identifiable information.

Roblox actively moderates the content of experiences to make sure they meet Community Standards. If Roblox receives reports or automatically detects that your experience doesn't apply text filtering, then the system may remove the experience until you add filtering.

### Ensure policy compliance

The `Class.PolicyService` helps you tailor your experience to comply with policies based on a player's age, location, and platform. You can use it to manage content like in-game advertisements (`AreAdsAllowed`), paid random items (loot boxes), brand content and links to approved external social media sites.

### Monitor your safety analytics to understand toxicity in your experience

[Analytics](#understand-your-safety-analytics) can help you better understand the abuse channels in your experiences. Prioritize moderating channels that have spikes in abuse reports.

## Understand your safety analytics

You can find the Safety Dashboard in your [Creator Dashboard]([create.roblox.com](https://create.roblox.com)) for your experiences under **Safety** > **Overview**.

The dashboard provides a top-level view of user-submitted abuse reports within your experience.

### Abuse report submitters per 1,000 playtime hours

This chart shows the number of unique users who submitted abuse reports in your experience, normalized per 1,000 hours of playtime. You can see this chart if you have 1000+ daily playtime hours in the past week.

**How to read it:** This metric allows you to monitor the frequency of abuse reports in your experience. If you see an increase in this number, this means that more abuse reports are being generated in your experience and this can be an early indicator of growing toxicity. You may need to investigate further (e.g. Did reports spike when you introduced a new feature?) take action before it becomes a larger issue. The benchmark is provided as a point of comparison.

For example, a spike in abuse reports on February 2nd, after the launch of your new custom avatar editors, could indicate that users are misusing the feature or creating combinations that violate community standards. Potential solutions include rolling back the new functionality, increasing moderator support, or providing more proactive education on policies and community standards.

<img src="./assets/publishing/safety/Submitters-Per-Hours.png" width = "85%" alt ="A graph depicting categories of abuse reports per 1000 hours." />

### Total abuse reports per category

This chart breaks down abuse reports by category. These are the categories selected by users and may sometimes be inaccurate. Our moderation teams confirm both the category and whether the content violates our policies before taking action on an abuse report.

**How to read it:** This breakdown helps you pinpoint the general types of negative behavior occurring in your experience so you can take more targeted action. For example, a high percentage in the "Romance or sexual" category might prompt you to review your in-game avatar editor tools or in-game chat systems.

<img src="./assets/publishing/safety/Abuse-Reports-Per-Category.png" width = "85%" alt ="A graph depicting categories of abuse reports and trends over time." />

### Filter by channel

You can filter both charts on the dashboard to isolate reports related to a specific part of your experience. When you apply a channel filter, the benchmark will also update to show you a comparison relevant to that channel.

<img src="./assets/publishing/safety/Filter-by-channel.png" width = "95%" alt ="Dropdowns available to filter your data with per types of abuse reports." />

Click the **Channel** dropdown to filter by:

- **Avatar:** Reports related to user avatars, clothing, or accessories.
- **Chat:** Reports related to in-experience text chat.
- **Voice:** Reports related to in-experience voice chat.
- **Experience:** Direct reports about the experience itself (e.g., inappropriate content).
- **Audio:** Reports related to audio assets used in the experience.

### Automated safety insights

To help you stay proactive, the dashboard will automatically display an insight if your rate of abuse report submitters rises above the 90th percentile benchmark, either overall or for a specific channel.

<img src="./assets/publishing/safety/Automated-Insights.png" width = "95%" alt ="An automated insight detailing recent spikes in abuse and suggestions to address it" />
