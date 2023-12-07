---
title: Prototyping
description: Prototyping
---

<iframe width="880" height="495" src="https://www.youtube-nocookie.com/embed/wN4-AERPU9g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br />

**Prototyping** is an experimental design process where teams iterate and explore preliminary ideas for experiences before finalizing and working on them as features. The two common prototyping techniques when it comes to Roblox development are [paper](#paper-prototyping) and [studio](#studio-prototyping) prototyping. The primary benefits of prototyping are:

- **Time efficiency:** The value of prototyping is the speed in which you can iterate and explore solutions to potential problems. Prototyping ensures that you detect design flaws, oversights, and unexpected technical requirements in the early stages of pre-production, instead of months into development. The time and energy required to prototype in the early stages of creating an experience is less than the time and energy required to fix costly oversights in the later stages.
- **Finding the fun:** Prototyping ensures that the experience being designed is actually fun to play. Ideas for experiences can be abstract, but prototyping forces you to confirm that your vision can be brought to life in the way you imagine.

## Paper Prototyping

  <iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/IJSih2t_jso" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

  <br />

**Paper prototyping** is the act of designing an experience using physical objects to simulate gameplay and player interaction. Examples include:

- Paper
- Board game pieces
- Dice
- Legos
- Office supplies

<figure>
    <img src="../../assets/game-design/prototyping/prototyping-1.png" width="70%"/>
    <figcaption>Examples of paper prototyping tools</figcaption>
  </figure>

The benefits of paper prototyping are:

- **Iteration speed:** It takes minutes to begin paper prototyping, opposed to days or weeks to create a virtual environment. As a result iteration speed is greatly increased, allowing you to rapidly explore potential solutions and ideas by simply drawing, erasing, or printing more paper.
- **Broader system context:** The abstraction of paper protoyping enables you to interact with more systems in your experience without getting weighed down by practical implementation. This freedom to explore system interaction ideas allows you to think of solutions from a design perspective, that you can then test once the prototyping stage is over. Even if it proves to be out of scope or difficult to implement, the initial idea gleamed from the broader system context provided by paper prototyping enables you to discover new creative solutions you might not otherwise have considered.
- **UI/UX Design:** The ease of drawing on paper makes paper prototyping one of the best mediums for exploring optimal UI and UX designs for your experience.
    <figure>
      <img src="../../assets/game-design/prototyping/prototyping-2.png" width="70%"/>
      <figcaption>Using paper prototyping to explore UI/UX design</figcaption>
    </figure>

Despite its benefits, prototyping on paper has drawbacks due to the difference in medium. The detriments of paper prototyping are:

- **Not reusable:** None of the prototyping done with paper prototyping can be used literally in the end result. Everything must be recreated virtually.
- **Simulation limiations:** Simulating unique mechanics and interactions are limited or impossible to create on paper or using physical assets.
- **False positives:** Some activities might prove more fun and engaging using paper and physical assets than doing them on a phone, computer, or console.

## Studio Prototyping

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/Q4Cec876KLU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br />

_Studio prototyping_ is the act of using Roblox Studio to design and iterate the early stages of an experience. The benefits of starting directly in studio for prototyping includes:

- **Rapid Playtesting:** Creating directly in studio enables you to have a quick playable version of the system in your game that you can easily share with others for feedback.
- **Reusable work:** Creating in directly in studio allows you to build off your work. Unlike paper prototyping, you don't have to start over when the prototyping period concludes, and can continue working from where you left off.
- **Early technical issues detection:** The abstraction of paper prototyping can result in unrealistic ideas that are impossible to technically implement. Prototyping in studio forces you to determine if your idea is something you can practically create with the resources available to you.
    <figure>
      <img src="../../assets/game-design/prototyping/prototyping-3.png" width="70%"/>
      <figcaption>Using paper prototyping to explore UI/UX design</figcaption>
    </figure>

Despite its benefits, the limitations of studio prototyping include:

- **Smaller testing scope:** Due to the time required to script, debug, and replace assets involved in a prototype, the scope to test potential gameplay interactions and systems is limited.
- **Increased iteration time** Due to the increased cost of creating different virtual environments, more time is required to iterate multiple systems in an experience.
    <figure>
      <img src="../../assets/game-design/prototyping/prototyping-4.png" width="70%"/>
      <figcaption>Using paper prototyping to explore UI/UX design</figcaption>
    </figure>

## Best Practices

The difference between working on a feature and prototyping is scope. Prototyping should be fast and quick, hitting certain aspects of the feature being tested but not the entire feature itself.

When prototyping, have several playtest sessions with your team to confirm your findings. Share your prototype with friends, family, and social media to garner feedback and fresh perspectives. Iterate on your experience until you're happy with it.

When prototyping, take extra care to explore the following parts of your experience:

- **Core loop:** The core loop is the central gameplay through which an entire experience is built. To learn more about core loop design, see [Core Loops](../../production/game-design/core-loops.md).
- **UI/UX:** Ensure that your menu interaction input controls are intuitive and well designed. To learn more about UI/UX design, see [UI and UX](../../production/game-design/ui-ux-design.md).
- **Game rules:** Get into the details of how your experience will function. As an example, if you know that your game will feature a respawn mechanic, explore how long the respawn timer could be, where the player will physically respawn in experience, and if there are any factors that could change the rate at which a player can rejoin the fun.
- **Edge cases:** Explore how a player might push the limits of what your experience can do. Design solutions and stop gaps to either prevent or encourage this behavior.
