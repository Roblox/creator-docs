---
title: Rewarded video playbook
description: Learn the best practices, reward strategy, and safety settings that help rewarded video ads perform well in your game.
---

This playbook covers placement, reward strategy, and safety settings that help rewarded video ads perform well. For setup, implementation, analytics, and eligibility, see [Rewarded video ads](./rewarded-video-ads.md).

## Best practices

These practices consistently improve how well rewarded video performs:

- **Make it opt-in**: Present the reward first, followed by the option to opt in, skip, or pay. Users who opt in report that the experience feels more fair and less intrusive.
- **Serve at moments of need**: Place rewarded video at natural break points, such as post-defeat, end-of-level, wait screens, or when users run out of lives or resources. Showing the ad at those moments feels helpful instead of forced.
- **Put ads where traffic is high**: Place rewarded videos in lobbies or menus, where users are most likely to engage when they start playing. Your earnings depend on how many eligible users actually watch ads.
- **Make prompts easy to find**: Use reward prompts that are easy to discover and that only require one or two clicks. Use a clear call to action, for example "Watch this ad for 2x the coins!"
- **Respect the player**: Target 15 to 30 seconds for in-game rewarded video, and allow longer only for interactive or playable ad formats. Long ads feel disruptive, especially on mobile.
- **Invest in interactivity**: Where possible, use interactive ad formats to better meet the expectations of the Roblox audience. Interactive ads feel more involving and less distracting than passive video.

## Choose rewards

Offer meaningful rewards that are equivalent to about 3 to 10 Robux, such as boosters, in-game currency, extra lives, and temporary privileges. Rewards for video ads can't be randomized items.

Based on user research, reward preference breaks down as follows:

| Reward type                  | Preference |
| ---------------------------- | ---------- |
| Gameplay progression         | 81%        |
| Cosmetic and self-expression | 48%        |
| Access and premium unlocks   | 22%        |

<Alert severity="info">
  Source: Roblox Rewarded Ads Research, February 2026 (RBX4). "Which type of rewards do you most prefer for watching ads in Roblox?" Roblox users, n=423.
</Alert>

For the best reward strategy:

- Keep reward prompts prominent so eligible users can engage with the video.
- Make rewards relevant to gameplay and align them with core game mechanics. For example, extra lives in a battle game or new customization options in a roleplaying game.
- Scale rewards so they remain valuable as users advance through the game.
- Motivate users with progression, collection, customization, or competition.
- Offer rewards at strategic moments, such as after a user loses a life or completes a difficult level.
- Offer rewards at appropriate intervals so they don't trivialize in-game progression.
- Use limited-time or rare rewards to increase engagement.

## Make rewarded video safe

Use the following settings and practices to protect your game's economy and revenue:

- **Protect spenders**: Hide rewarded video from users who are likely to purchase, which protects purchase revenue. See [Exclude likely spenders](./rewarded-video-ads.md#exclude-likely-spenders).
- **Test before you roll out**: Use creator experimentation to measure the impact of rewarded video on key game metrics before rolling a placement out to your full audience. See [De-risk your implementation with experiments](./rewarded-video-ads.md#de-risk-your-implementation-with-experiments).

## Types of rewarded video

- **Join with reward**: An ad placement that lets players get a reward before they enter the experience.
- **Rewarded video billboard**: A template that you can drag and drop into your game for easy integration.
- **In-game rewarded video**: A rewarded video option that lives within the core game loop, using the HUD or in-game menus.

## Estimate your earnings

Use the earnings calculator in Creator Hub to estimate how much you could earn from rewarded video before you implement it. For steps and details, see [Estimate potential earnings](./rewarded-video-ads.md#estimate-potential-earnings).

## Self-audit checklist

Before you test new creative or ad network changes, confirm the fundamentals are in place:

- Is your rewarded video prompt visible within the first couple of actions after the triggering moment, not buried in a menu?
- Do you offer more than one reward type across the prompt?
- Is your frequency cap at least 2 to 3 prompts per session, or an equivalent daily cap?
- Are your rewards consumable and repeatable rather than one-time durables?
- Is your rewarded video integrated within or near the core loop of the game?

<Alert severity="info">
  Rule of thumb: diagnose from the metric that's lagging, then apply the matching fix above before testing new creative or ad network changes.
</Alert>

## Get started

Ready to implement rewarded video in your game? Follow the [Rewarded video ads](./rewarded-video-ads.md) integration guide.
