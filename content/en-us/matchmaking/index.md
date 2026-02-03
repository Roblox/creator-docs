---
title: Matchmaking
description: Match players to servers inside your experience.
---

Matchmaking is the process of matching players to servers based on player characteristics like age, language, skill level, and other gameplay preferences.

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/fUMlnldI53A" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

## How matchmaking works

When a player tries to join your experience, the matchmaking service finds all eligible servers that the player can join, scores these servers using signals, and matches the player to the server with the highest score.

The matchmaking flow works like this:

1. A player requests to join a place.
2. Matchmaking finds eligible servers that the player can join, filtering out servers that are full, private, reserved, or about to be shut down.
3. Matchmaking scores all eligible servers to determine the most compatible server for the player.
4. Matchmaking matches the player to the server with the highest score.
5. The player joins the winning server.

  <figcaption>Roblox default matchmaking</figcaption>
  <img src="../assets/matchmaking/Default_Matchmaking.png" alt="The default Roblox matchmaking flow." />

  <figcaption>Custom matchmaking</figcaption>
  <img src="../assets/matchmaking/Custom_Matchmaking.png" alt="The custom matchmaking flow." />

## Scoring

The matchmaking scoring algorithm uses the weighted sum (WS) of signal values to assign scores to servers.

For more information on scoring, see [Server scoring](./scoring.md).

## Attributes

Attributes are properties used in matchmaking scoring. An attribute can be a number, like a player's age and skill level rating, or a string, like a player's language.

Attributes can be numerical or categorical:

- **Numerical attributes** compare the difference between the joining player's attribute and the server's aggregated value, with larger differences lowering or increasing the score. For example, the closer the skill level of a player is to the average skill level of the server, the higher the numerical signal's score is. This score is then multiplied by the signal's weight.
- **Categorical attributes** are based on how common the joining player's attribute is when compared to the other players in the server. For example, if a high percentage of the players inside a server have the same preferred language as the joining player, the score increases. This score is then also multiplied by the signal's weight.

For a list of all existing attributes, see [Existing attributes](./attributes-and-signals.md#existing-attributes). For more information about custom attributes, see [Custom attributes](./attributes-and-signals.md#custom-attributes).

## Signals

Signals used in server scoring can either be the default ones already provided by Roblox, or custom ones you create yourself.

Roblox signals use existing attributes that Roblox already has access to, like player location, age group, and latency. Custom signals, however, need to use custom attributes to access data from your data stores. In order to create a custom signal, you must first create a custom attribute.

For a list of all existing Roblox signals, see [Existing signals](./attributes-and-signals.md#existing-signals). For more information about custom signals, see [Custom signals](./attributes-and-signals.md#custom-signals).

## Custom matchmaking

When a player joins your experience, matchmaking assigns a score to each running server based on the weighted sum of the server's signal values. You can customize this process by adjusting the weight of each of your signals to change how much each signal matters in the scoring of servers. Increasing the weight of the latency signal, for example, means the matchmaking algorithm prioritizes servers with lower ping for smoother gameplay.

After adjusting signal weights, you can preview the impact of these new weights on matchmaking server selection by evaluating them on mock servers.

For more information about how to customize matchmaking and simulate the results, see [Customize your matchmaking configuration](./customize-matchmaking.md).

## Analytics

Matchmaking analytics helps you track the success of your matchmaking configurations and find opportunities to optimize them.

For more information about matchmaking analytics, see [Analytics](./analytics.md).
