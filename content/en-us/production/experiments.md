---
title: Experiments
description: Experiments let you run A/B tests within your experiences.
---

**Experiments** let you run in-game and matchmaking A/B tests to measure the causal impact of changes to your experience. For example, you can show different onboarding experiences to different players and measure the difference in playtime, retention, and other key performance indicators.

Experiments are excellent for measuring the following:

- Engagement - Onboarding flows, progression systems, control schemes, custom matchmaking
- Monetization - Shop visibility and user experience, starter pack types, pricing

<img src="../assets/analytics/configs/experiment-overview.png" alt="Overview of the Experiments page on Creator Hub" width="840" />

## Create experiments

Experiments come in two types:

- **In-experience** experiments let you measure the impact of different [config values](configs.md).
- **Matchmaking experiments** let you measure the impact of different [custom matchmaking configurations](../matchmaking/customize-matchmaking.md). Unlike in-experience experiments, you can only run one matchmaking experiment at a time.

<Tabs>

  <TabItem key = "1" label="In-experience">

1. If you don't already have a [config](configs.md), create one for your experience.
1. On the [Creator Hub](https://create.roblox.com/dashboard/creations) **Experiments** page for your experience, click **Create experiment**.
1. For **Type**, choose **In-experience**.
1. Specify a name, goal metric, and planned duration for the experiment. Experiments run for between 14-60 days.

   Regardless of what you choose as your goal metric, experiments track all [metrics](#metrics) in the list.

1. Choose a percent rollout. This number is the percentage of players that you want to include in the experiment.

   In general, the more people you include in an experiment, the better the data, but use your judgment on what's best for your experience.

   <Alert severity="success">
   Pay attention to the [minimum detectable effect](#best-practices-for-experiments), which is the smallest change in the selected metric that the experiment can reliably detect.
   </Alert>

1. Specify variants and percentages.

   Variants are alternative values for your config. For a numeric config key `bossHealth` with a control value of 500, you might specify a variant of 300. You can have up to **two variants** and one control in an experiment.

   Percentages dictate how to assign variants **within the experiment rollout**. Consider the following example:

   - You choose an overall rollout of 40%.
   - You specify two variants and a 50/50 split between them and the control.

   In this example, 60% of your users are excluded from the experiment; these users receive the control and have no impact on experiment results. Approximately 20% of your users receive the control as part of the experiment. Another 20% receive the variant. Depending on your player count, this distribution might not be large enough to yield actionable results.

   <Alert severity="info">
   When in doubt, we recommend simple 50/50 experiments of one variant and one control on large rollouts. The experiments are easier to configure, and the results are easier to interpret.
   </Alert>

   ![Variant page](../assets/analytics/configs/experiment-variant.png)

1. The final step is scheduling. You can start experiments immediately or schedule them for a later date and time. After you schedule an experiment, you can't change its configuration (duration, rollout percentage, variants, etc.), but you can reschedule it.

  </TabItem>
  <TabItem key = "2" label="Matchmaking">

1. If you don't already have a [custom matchmaking configuration](../matchmaking/customize-matchmaking.md), create one for your experience.
1. On the [Creator Hub](https://create.roblox.com/dashboard/creations) **Experiments** page for your experience, click **Create experiment**.
1. For **Type**, choose **Matchmaking**.
1. Specify a name, goal metric, and planned duration for the experiment. Experiments run for between 14-60 days.

   Regardless of what you choose as your goal metric, experiments track all [metrics](#metrics) in the list.

1. Choose a percent rollout. This number is the percentage of players that you want to include in the experiment.

   For matchmaking experiments, we highly recommend 100% rollout. It minimizes the risk of isolating players and leads to faster, more reliable results.

   <Alert severity="success">
   Pay attention to the [minimum detectable effect](#best-practices-for-experiments), which is the smallest change in the selected metric that the experiment can reliably detect.
   </Alert>

1. Choose the places you want to include in the experiment, and specify variants.

   Variants are alternative matchmaking configurations. You can include up to three variants in matchmaking experiments. Regardless of how many variants you include, Roblox splits players equally between all variants.

   <Alert severity="info">
   When in doubt, we recommend simple 50/50 experiments of one variant and one control on large rollouts. The experiments are easier to configure, and the results are easier to interpret.
   </Alert>

   ![Matchmaking experiment variant page](../assets/analytics/configs/experiment-variant-place.png)

1. The final step is scheduling. You can start experiments immediately or schedule them for a later date and time. After you schedule an experiment, you can't change its configuration (duration, rollout percentage, variants, etc.), but you can reschedule it.

  </TabItem>

</Tabs>

### Metrics

Experiments track all of the following metrics over the experiment duration.

Metric | Description
:--- | :---
D1 retention | Percentage of players who returned to your experience after one day.
D7 retention | Percentage of players who returned to your experience after one week.
Playtime | Average amount of time players spent within your experience. Cumulative for the duration of the experiment.
ARPU | Average revenue per user. Revenue divided by the number of players. Cumulative for the duration of the experiment.
ARPPU | Average revenue per paying user. Revenue divided by the number of players who purchased an experience-related item. Cumulative for the duration of the experiment.
Payer conversion rate | Percentage of players who purchased an experience-related item.
Session time | Playtime divided by number of sessions. Cumulative for the duration of the experiment.

### Experiment status

The **Experiments** page shows the following statuses for experiments.

Status | Description
:--- | :---
Completed | The experiment is over, which happens when you stop it manually, when you reach a decision, or automatically shortly after the decision date (14 days after for in-experience, immediately for matchmaking). You can still review the details and results.
Decision needed | The experiment has reached its decision date. Now is a good time to review the results.
Running | The experiment is running but has yet to reach its decision date.
Scheduled | The experiment is schedule to start at a future date.
Draft | The experiment hasn't been started or scheduled. You can finish setting it up.

## Add experiments to your code

<Alert severity="info">
This section only applies to in-experience experiments. Matchmaking experiments do not require code changes.
</Alert>

Applying in-experience experiments is similar to [applying configs](configs.md#add-configs-to-your-code). The main difference is the use of `Class.ConfigService:GetConfigForPlayerAsync()` rather than `Class.ConfigService:GetConfigAsync()`.

`Class.ConfigService:GetConfigForPlayerAsync()|GetConfigForPlayerAsync()` retrieves a player-specific snapshot. When you call `Class.ConfigSnapshot:GetValue()|GetValue()`, the snapshot checks for an active experiment and enrolls (or doesn't enroll) the user based on the rollout percentage.

```lua
local ConfigService = game:GetService("ConfigService")
local Players = game:GetService("Players")

local function onPlayerAdded(player)
    local playerConfig = ConfigService:GetConfigForPlayerAsync(player)
    local leaderboardColor = playerConfig:GetValue("leaderboardColor")
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

- You must call `Class.ConfigService:GetConfigForPlayerAsync()|GetConfigForPlayerAsync()` separately for each player; `Class.ConfigService:GetConfigAsync()|GetConfigAsync()` does not apply experiments.
- After you call `Class.ConfigSnapshot:GetValue()|GetValue()` on a player-specific snapshot, the player associated with the snapshot is enrolled in the experiment for that key and that key only. All subsequent calls to the method return the same control or variant for the duration of the experiment. Only the first call is random.

  <Alert severity="success">
  Wait to call `Class.ConfigSnapshot:GetValue()|GetValue()` until you need it. Calling `Class.ConfigSnapshot:GetValue()|GetValue()` too early can cause you to enroll players who never interact with the part of the experience you're experimenting on.
  </Alert>

- Enrollment in experiments isn't limited to new users. Even if a user previously received a value from `Class.ConfigService:GetConfigAsync()|GetConfigAsync()`, you can still enroll them in an experiement using a player-specific snapshot from `Class.ConfigService:GetConfigForPlayerAsync()|GetConfigForPlayerAsync()`.
- If a key in a player-specific snapshot doesn't have an active experiment, `Class.ConfigSnapshot:GetValue()|GetValue()` returns the standard config value (or nil if it has no value).

### Targeted enrollment

If you want to target some portion of your players that meet specific criteria, you have to write additional code to check for those criteria and only then call `Class.ConfigSnapshot:GetValue()|GetValue()` to enroll them in the experiment. Consider the following example:

- You want to test a new control scheme in your experience.
- You don't want to include existing players (who are presumably used to the existing scheme), only new players.

Your code might look something like this:

```lua
local function getControlScheme(player, racesCompleted)
    if racesCompleted > 0 then
        return "standardScheme"
    else
        -- Player is new, enroll in experiment
        local playerConfigSnapshot = ConfigService:GetConfigForPlayerAsync(player)
        if playerConfigSnapshot:GetValue("useNewControlScheme") then
            return "newScheme"
        else
            return "standardScheme"
        end
    end
end
```

If you want the control scheme to persist on subsequent sessions, you likely need to add a value to the player's entry in a data store.

## View and interpret results

After an experiment has run for at least 24 hours, click **View** to see details and results.

![The details page for an experiment](../assets/analytics/configs/experiment-details.png)

You can see the total number of players enrolled, as well as the number of players that received the control value and each variant. Viewing this page early in the experiment is useful strictly for making sure the experiment is running properly, **not** for taking action. Before taking action, see [Best practices](#best-practices-for-experiments).

After the experiment is complete, check the **Results** tab. Look for statistically significant changes in goal metrics, which the dashboard highlights in green or red. These changes are more likely to show the impact of your variant and less likely to be false positives or negatives.

![The details page for an experiment](../assets/analytics/configs/experiment-results.png)

Hover over any metric to see the **View confidence** button, which shows the confidence interval.

A metric is statistically significant when the confidence interval for its percent change does not overlap with 0%. In the following example, D1 retention is up 17.4%, with lower and upper bounds 8.02% and 22.03%, which makes the change statistically significant.

![Confidence interval for a metric](../assets/analytics/configs/experiment-confidence.png)

For convenience, the results page lets you replace the default config value with one of the variants from the experiment. Click **Make decision** to choose a variant or **Change winner** if you change your mind. If you then return to the **Configs** page, you should see the new value.

## Best practices for experiments

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/j6OPA95-1O0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen ></iframe><br />

- **Use the minimum detectable effect (MDE)** to decide if your experiment is worth running.

  Roblox calculates MDE using your goal metric and number of players per variant, which is based on daily active users, rollout percentage, experiment duration, and variant splits. If the MDE is too high for your goal metric (for example, more than 100%), it's unlikely you can reach statistical significance. Experiences with fewer than 1,000 daily active users might struggle to get useful data from experiments.

  ![Insufficient MDE screen during creation.](../assets/analytics/configs/experiment-mde.png)

- **Start with a hypothesis.** Rather than just changing a variable and checking the results, write a cause-and-effect statement about what you changed, what you expect to happen, and why. As you experiment more and more, having a set of written hypotheses to accompany your results can help clarify your thinking and spark new ideas for experiments.

- **Let experiments run for their full durations.** The novelty effect (temporary interest in a change not because it's better, but because it's new) can heavily skew early results, sometimes causing them to swing in and out of statistical significance. Ending experiments early increases the odds of you taking premature action based on anomalous spikes that more data would have smoothed out or even contradicted.

- **Don't act without statistical significance.** Even seemingly large changes in player behavior might not be statistically significant, generally due to small sample size. If a change isn't statistically significant, ignore it.

- **Avoid changes during experiments**. Major bugs of course need fixes, but changes to experience content can impact player behavior and invalidate your results, even if the changes **seem** unrelated to your experiment. Similarly, only run experiments simultaneously if you're confident they won't interact with each other.

- **Use confidence intervals for deep dives** into metrics and to check for borderline cases of statistical significance. If the confidence interval is too wide, the metric might never reach statistical significance.

- If one metric is significantly up and another significantly down, you have to **decide whether the trade-off is worth it**, possibly in conjunction with other statistically significant movements.

- Experiments provide strong signal, but **statistical significance deals in probabilities, not certainties**—hence the confidence interval. Data variability, sample size, and magnitude of the change all impact the probability of detecting whether a variant affected player behavior. Any action you take based on the results of an experiment should be balanced against qualitative data like player feedback and your overall vision for the experience.

- **Document your findings and decisions.** Even if you don't use them to run additional experiments, having a body of knowledge and evidence can inform how you design your experiences.
