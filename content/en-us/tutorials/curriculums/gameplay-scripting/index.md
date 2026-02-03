---
title: Gameplay scripting curriculum
description: Learn how to implement and organize a complex scripting project.
next: /tutorials/curriculums/gameplay-scripting/create-teams
hideInPageNavigation: true
---

<>
<Grid alignItems="stretch" container direction="row">

<Grid item Large={7} XSmall={12} direction="column">

<div class="container" style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/7iJKUUiKc0Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{position: "absolute", top: 0, left: 0, width: "95%", height: "95%"}}></iframe>
</div>

</Grid>

<Grid item Large={5} XSmall={12} direction="column">

**Gameplay scripting** is the discipline of programming the behavior that makes experiences
engaging and fun to play, such as their logic, movement, events, and interactions between
objects in the 3D space.

You'll learn the gameplay scripting for a first-person shooter laser tag experience by
following the general organization and key implementation details of a large, complex
project, including several opportunities to create new behavior with custom values.

This course is intended for readers who are familiar with general coding concepts, Studio's
data model, and the client-server relationship. If you need help learning how to code, try [coding fundamentals](../../fundamentals/coding-1/coding-fundamentals.md).

</Grid>

</Grid>
</>

## Course Contents

<BaseAccordion>
<AccordionSummary>
<Typography variant="h4">Chapter 1 - Create teams</Typography>
</AccordionSummary>
<AccordionDetails>
Learn how to [sort players into teams](create-teams.md) when a round is active.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h4">Chapter 2 - Spawn and respawn</Typography>
</AccordionSummary>
<AccordionDetails>
Learn how to [trigger unique actions](spawn-respawn.md) when players spawn and respawn back into a round.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h4">Chapter 3 - Add rounds</Typography>
</AccordionSummary>
<AccordionDetails>
Learn how to [implement rounds](add-rounds.md) that track points, display final results, and reset teams.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h4">Chapter 4 - Implement blasters</Typography>
</AccordionSummary>
<AccordionDetails>
Learn how to [script blast behavior](implement-blasters.md) for two different blaster types.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="h4">Chapter 5 - Detect hits</Typography>
</AccordionSummary>
<AccordionDetails>
Learn how to [perform hit detection](detect-hits.md) from blast data, and allocate damage to reduce player health.
</AccordionDetails>
</BaseAccordion>
