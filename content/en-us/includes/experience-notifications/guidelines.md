---
title: include
---

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Best practices</Typography>
</AccordionSummary>
<AccordionDetails>
Notifications should be **personalized** to the receiver and should be based on in‑experience activity that's specifically relevant to the user. Inversely, notifications should not be of a generic, advertising nature.

<Alert severity="success">
<Typography variant="subtitle2">You're 2 races away from completing the weekly challenge!</Typography>
</Alert>

<Alert severity="error">
<Typography variant="subtitle2">A new line of race cars just dropped in Race Car Craze. Check them out!</Typography>
</Alert>

Ideally, notifications should also alert users of something they can take **immediate action** on. Avoid purely informational notifications that do not prompt a direct response or action.

<Alert severity="success">
<Typography variant="subtitle2">Allie @LaterSk8er1 just beat your record on the Tokyo Tour track! Time for revenge?</Typography>
</Alert>

<Alert severity="error">
<Typography variant="subtitle2">It's been a few days since you participated in a race with Allie @LaterSk8er1.</Typography>
</Alert>
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Respect community standards</Typography>
</AccordionSummary>
<AccordionDetails>
All notification content and behaviors are subject to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and platform‑wide [text filtering](../../ui/text-filtering.md), regardless of your experience's [age guidelines](../../production/promotion/experience-guidelines.md). This means that if your experience is a 17+ experience, your notifications are still subject to the platform‑wide standards, **not** the [17+&nbsp;Policy Standards](https://en.help.roblox.com/hc/en-us/articles/15869919570708).
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Avoid deceptive nudge tactics</Typography>
</AccordionSummary>
<AccordionDetails>
Notification content is **not** permitted to incorporate dark patterns or other tactics that manipulate or deceive users into making choices they don't intend, or which may be counter to their best interests. This could include the following:

- **Disguised Ads** &mdash; Notifications that are intentionally disguised as organic content, but are actually advertising. For example, assume that clicking the following notification leads to Petz World but no "important information" is displayed.

  <Alert severity="error">
	<Typography variant="subtitle2">Click here for important information about your Petz World account.</Typography>
  </Alert>

- **Time Pressured Actions** &mdash; Notifications that pressure users into clicking, subscribing, consenting, or purchasing through applying false time pressure.

  <Alert severity="error">
  <Typography variant="subtitle2">Make a purchase in Petz World in the next 10 minutes to avoid missing out on important gameplay updates!</Typography>
  </Alert>

- **Bait-and-Switch with Free Items or Other Rewards** &mdash; Notifications that falsely tell users that they'll receive something for free when it's not. For example, upon clicking the following notification, it becomes clear that something further is required to get the gift.

  <Alert severity="error">
  <Typography variant="subtitle2">Play Petz World now and get a free dog bed!</Typography>
  </Alert>

- **Tricking Users Into Purchasing** &mdash; Notifications that trick users into making unintended purchases. For example, assume that clicking the following notification leads directly to a purchase system pre‑loaded with items that the user didn't choose to buy.

  <Alert severity="error">
  <Typography variant="subtitle2">Check out our new Petz in Petz World!</Typography>
  </Alert>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Do not gate gameplay</Typography>
</AccordionSummary>
<AccordionDetails>
Experiences should **not** require users to turn on notifications in order to participate or advance in gameplay.
</AccordionDetails>
</BaseAccordion>
