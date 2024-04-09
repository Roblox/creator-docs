---
title: include
---

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Respect Community Standards</Typography>
</AccordionSummary>
<AccordionDetails>
All notification content and behaviors are subject to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and platform‑wide [text filtering](../../ui/text-filtering.md), regardless of your experience's [age guidelines](../../production/promotion/experience-guidelines.md). This means that if your experience is a 17+ experience, your notifications are still subject to the platform‑wide standards, **not** the [17+&nbsp;Policy Standards](https://en.help.roblox.com/hc/en-us/articles/15869919570708).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Do Not Mention Specific Users</Typography>
</AccordionSummary>
<AccordionDetails>
Do not mention specific users in your notifications by user name, `Class.Player.DisplayName`, or otherwise. Notifications should be relevant to the receiver without the mention of a specific user.

<Alert severity="success">
Your opponent finished their turn in chess. It's your turn!
</Alert>

<Alert severity="error">
@Joe finished their turn in chess. It's your turn!
</Alert>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Do Not Use Deceptive Nudge Tactics</Typography>
</AccordionSummary>
<AccordionDetails>
Notification content is **not** permitted to incorporate dark patterns or other tactics that manipulate or deceive users into making choices they don't intend, or which may be counter to their best interests. This could include the following:

- **Disguised Ads** &mdash; Notifications that are intentionally disguised as organic content, but are actually advertising.

  <figure>
  <Alert severity="error">
  Click here for important information about your Petz World account.
  </Alert>
  <figcaption>Clicking notification leads to Petz World but no "important information" is displayed</figcaption>
  </figure>

- **Time Pressured Actions** &mdash; Notifications that pressure users into clicking, subscribing, consenting, or purchasing through applying false time pressure.

  <figure>
  <Alert severity="error">
  Make a purchase in Petz World in the next 10 minutes to avoid missing out on important gameplay updates!
  </Alert>
  <figcaption>The information provided about the purchase reward is false/inaccurate</figcaption>
  </figure>

- **Bait-and-Switch with Free Items or Other Rewards** &mdash; Notifications that falsely tell users that they'll receive something for free when it's not.

  <figure>
  <Alert severity="error">
  Play Petz World now and get a free dog bed!
  </Alert>
  <figcaption>Upon clicking the notification, it becomes clear that something further is required to get the gift</figcaption>
  </figure>

- **Tricking Users Into Purchasing** &mdash; Notifications that trick users into making unintended purchases.

  <figure>
  <Alert severity="error">
  Check out our new Petz in Petz World!
  </Alert>
  <figcaption>When clicked, the user is brought directly to a purchase system pre‑loaded with items that the user didn't choose to buy</figcaption>
  </figure>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h6">Do Not Gate Gameplay</Typography>
</AccordionSummary>
<AccordionDetails>
Experiences should **not** require users to turn on notifications in order to participate or advance in gameplay.
</AccordionDetails>
</BaseAccordion>
