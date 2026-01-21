---
title: Performance optimization
description: Introduces the performance optimization process.
---

Performance optimization is the process of building and iterating on an experience to improve frame rate, memory usage, and load times. Players expect experiences to perform well, so taking the time to understand and improve your experience's performance can be critical to its success.

The first step in performance optimization is to [design for performance](design.md), which means following a set of best practices **as you build** a new experience. After you publish an experience, the optimization process follows a common cycle:

<GridContainer numColumns="2">
<figure>
1. [Identify performance Issues](identify.md) - Use Roblox's built-in tools to find performance problems and identify root causes.
1. [Improve performance](improve.md) - After you find an issue, see if it's a common one and how you might mitigate it. You might also want to take proactive action.
1. [Monitor performance](monitor.md) - Use analytics tools to monitor the impact of your changes and watch for indicators of any performance issues.
</figure>
<figure>
  <img alt="A diagram showing the flow from designing, identifying, improving, and monitoring performance." src="../assets/optimization/Perf-Flow.png" width="70%" />
</figure>
</GridContainer>

## Why performance matters

To put it simply, performant experiences are more fun. When an experience has a consistent, smooth frame rate, even basic actions like running and jumping feel more precise and enjoyable. Aiming can go from feeling impossible to feeling completely natural. An experience with a small memory footprint and fast load times might always have plenty of other people to play with.

Performance optimization also lets you expand your ambitions. If your experience runs well, you might be able to make it more expansive or beautiful or add new systems to it.

From a business perspective, performant experiences often have higher user engagement, better user retention, and make more money.

## Measure performance

- **Frame rate** is the number of unique frames that the client presents to the user, measured in frames per second (FPS). The cause of low frame rates is typically expensive computational operations—in other words, overtaxing the CPU, GPU, or both.

  Because the server doesn't render frames, it doesn't _technically_ have a frame rate, but server heartbeat is essentially the same thing: the number of times per second that the server updates its simulation of the world. A low server heartbeat reduces the frame rate for all clients and increases latency.

  On the client, low or inconsistent frame rates reduce the smoothness and responsiveness of the experience. By default, Roblox experiences target 60 FPS, which is one frame every 16.67 milliseconds with proper frame pacing.

- **Memory usage** is the amount of RAM or swap that your experience uses. Even if an experience has low starting memory usage, memory leaks can cause that amount to increase over time.

  On the server, excessive memory usage can cause crashes, which disconnect all players from the experience.

  Excessive memory usage causes client crashes, too, but it also prevents users on lower-end devices from playing your experience in the first place. Reducing memory usage can greatly expand your addressable audience, especially on mobile.

- **Load time** is the amount of time it takes for a player to start enjoying your experience.

  Long load times are annoying and hurt user acquisition and retention. Players might decide an experience simply isn't worth the wait. Conversely, quick load times can give your experience a "jump in" feel that makes players more likely to engage with it when they have a spare moment.
