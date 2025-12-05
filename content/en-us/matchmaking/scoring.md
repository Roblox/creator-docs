---
title: Server scoring
description: How matchmaking uses scoring to match players to servers.
---

## The scoring formula

Servers are scored using a weighted sum formula. There are four parts to this formula:

- [Attributes](#attributes), which are data that describe players and servers, such as player age or server occupancy.
- [Signals](#signals), which transform attributes into numbers between 0 and 1.
- [Weights](#weights), which describe the relative importance of signals.
- The [server score](#server-score), which measures the server's compatibility with the joining player.

The joining player is matched to the server with the highest server score.

### Attributes

Attributes are data that describe players and servers. An attribute's value can be a number or a string. When an attribute's value is a string, it's called a categorical attribute. When an attribute's value is a number, it's called a numerical attribute.

For a full list of all available Roblox attributes, see [Existing attributes](./attributes-and-signals.md#existing-attributes). For more information about custom attributes, see [Custom attributes](./attributes-and-signals.md#custom-attributes).

<h5 style={{marginTop: '36px'}}>Example: Categorical and numerical attributes</h5>

<table>
<thead>
  <tr>
    <th>**Categorical attributes**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Has Friends** is a categorical attribute because its value is the string "true" when there is a preferred player on this server, and "false" when there are no preferred players on this server.</td>
  </tr>
  <tr>
    <td>**Language** is a categorical attribute because its value is the player's language setting, such as "Japanese".</td>
  </tr>
</tbody>
<thead>
  <tr>
    <th>**Numerical attributes**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Age** is a numerical attribute because its value is the player's age.</td>
  </tr>
  <tr>
    <td>**Occupancy** is a numerical attribute because its value is the number of players currently in this server.</td>
  </tr>
</tbody>
</table>

### Signals

Signals transform attribute values into numbers between 0 and 1, called signal scores. A signal score of 1 predicts high player compatibility, while a signal score of 0 predicts low player compatibility. Depending on the attribute, transformations can include different aggregations, comparisons, and normalizations.

For a full list of existing Roblox signals, see [Existing signals](./attributes-and-signals.md#existing-signals). For more information about custom signals, see [Custom signals](./attributes-and-signals.md#custom-signals).

<h5 style={{marginTop: '36px'}}>Example: Two servers with different signal scores</h5>

The following table calculates Occupancy signal scores for two different server with capacity for 8 players:

<table>
<thead>
  <tr>
    <th></th>
    <th>**Players in server**</th>
    <th>**Occupancy score**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Server A**</td>
    <td>2</td>
    <td>2/8 = 0.25</td>
  </tr>
  <tr>
    <td>**Server B**</td>
    <td>6</td>
    <td>6/8 = 0.75</td>
  </tr>
</tbody>
</table>

The Occupancy signal scores Server B higher and considers it a better fit for the joining player.

### Weights

A signal's weight describes that signal's importance relative to other signals. A higher weight increases the signal's contribution to the server score. The value after multiplying a signal score by its weight is called a **weighted signal**.

Signals can't have negative weights. If a signal's weight is 0, that signal is not considered for scoring.

<h5 style={{marginTop: '36px'}}>Example: Weighting the Occupancy score</h5>

The following table calculates weighted Occupancy signal scores for a place with capacity for 8 players and an Occupancy signal weight of 2:

<table>
<thead>
  <tr>
    <th></th>
    <th>**Players in server**</th>
    <th>**Occupancy score**</th>
    <th>**Weighted occupancy score**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Server A**</td>
    <td>2</td>
    <td>2/8 = 0.25</td>
    <td>0.25 * 2 = 0.5</td>
  </tr>
  <tr>
    <td>**Server B**</td>
    <td>6</td>
    <td>6/8 = 0.75</td>
    <td>0.75 * 2 = 1.5</td>
  </tr>
</tbody>
</table>

<h5 style={{marginTop: '36px'}}>Example: Two configurations with different weights</h5>

Different weights can also make matchmaking choose different servers. The following table calculates the server scores of two servers with different matchmaking configurations. Configuration 2 has a higher weight for its Occupancy signal, and Server A has a connection of the joining player in it.

<table>
<thead>
  <tr>
    <th></th>
    <th></th>
    <th colspan="2">**Friends**</th>
    <th colspan="2">**Occupancy**</th>
    <th></th>
  </tr>
  <tr>
    <th></th>
    <th></th>
    <th>**Weight**</th>
    <th>**Score**</th>
    <th>**Weight**</th>
    <th>**Score**</th>
    <th>**Total score**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">**Config 1**</td>
    <td>**Server A**</td>
    <td>1</td>
    <td>1</td>
    <td>5</td>
    <td>0.25</td>
    <td>1 * 1 + 5 * 0.25 = 2.25</td>
  </tr>
  <tr>
    <td>**Server B**</td>
    <td>1</td>
    <td>0</td>
    <td>5</td>
    <td>0.75</td>
    <td>1 * 0 + 5 * 0.75 = 3.75</td>
  </tr>
  <tr>
    <td rowspan="2">**Config 2**</td>
    <td>**Server A**</td>
    <td>3</td>
    <td>1</td>
    <td>5</td>
    <td>0.25</td>
    <td>3 * 1 + 5 * 0.25 = 4.25</td>
  </tr>
  <tr>
    <td>**Server B**</td>
    <td>3</td>
    <td>0</td>
    <td>5</td>
    <td>0.75</td>
    <td>3 * 0 + 5 * 0.75 = 3.75</td>
  </tr>
</tbody>
</table>

### Server score

The server score is calculated by the following weighted sum formula, which sums a server's weighted signal scores:

$\text{ServerScore} = \text{WeightedSignalScore}_1 + \text{WeightedSignalScore}_2 + \ldots + \text{WeightedSignalScore}_n$

$\phantom{\text{ServerScore}} = \text{Weight}_1 \times \text{SignalScore}_1 + \text{Weight}_2 \times \text{SignalScore}_2 + \ldots + \text{Weight}_n \times \text{SignalScore}_n$

### Matchmaking configurations

A matchmaking configuration is the set of signals and weights used to score servers of a place. By default, all servers of all places are scored by the Roblox default configuration, meaning you don't need to customize or enable any settings in order to use it.

The Roblox default configuration includes the following signals and weights:

<table>
<thead>
  <tr>
    <th>**Signal**</th>
    <th>**Weight**</th>
  </tr>
  </thead>
<tbody>
  <tr>
    <td>Friends</td>
    <td>15</td>
  </tr>
  <tr>
    <td>Latency</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Text Chat</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Occupancy</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Play History</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Language</td>
    <td>2</td>
  </tr>
  <tr>
    <td>Age</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Voice Chat</td>
    <td>1</td>
  </tr>
  <tr>
    <td>Device Type</td>
    <td>0</td>
  </tr>
</tbody>
</table>

In the default Roblox configuration, the Friends signal's weight is greater than the sum of the weights of every other signal. This means that, if available, the joining player is always matched to servers with connections (or players on the same IP address) in them.

The Device Type signal exists in the default configuration but has a weight of 0, so it doesn't affect matchmaking decisions. You can adjust this weight when you [customize matchmaking](./customize-matchmaking.md).

For more information about each Roblox signal, see [Existing signals](./attributes-and-signals.md#existing-signals).

## Advanced concepts

The following are more advanced concepts about the matchmaking process.

### Normalization

Signals normalize attribute values to be numbers between 0 and 1. Numerical signals can be normalized by any positive number, called the **normalizing factor**. If the normalized value is greater than 1, it is clamped down to 1.

<h5 style={{marginTop: '36px'}}>Example: Designing the Age signal</h5>

The Age signal measures the difference between the average age of players in the server and the joining player's age.

$$\text{ageDifference} = |\text{avgServerAge} - \text{joiningPlayerAge}|$$

Servers with age differences beyond 25 are all considered equally incompatible with the player. For example, an age difference of 25 is no worse for a player than an age difference of 26, so both values should take the signal score to 0. In this case, 25 is considered the normalizing factor.

$$\text{normAgeDifference} = \min(1, |\text{avgServerAge} - \text{joiningPlayerAge}| / 25)$$

The signal score is inversely related to the age difference, meaning that the signal score is higher when the age difference is smaller.

$$\text{ageDifferenceSignalScore} = 1 - \text{normAgeDifference}$$

The following table shows Age signal scores with two different normalizing factors:

<table>
<thead>
  <tr>
    <th>**Age**</th>
    <th>**Normalizing factor: 100**</th>
    <th>**Normalizing factor: 25**</th>
  </tr>
  </thead>
<tbody>
  <tr>
    <td>50</td>
    <td>0.5</td>
    <td>0</td>
  </tr>
  <tr>
    <td>25</td>
    <td>0.75</td>
    <td>0</td>
  </tr>
  <tr>
    <td>12</td>
    <td>0.88</td>
    <td>0.52</td>
  </tr>
  <tr>
    <td>5</td>
    <td>0.95</td>
    <td>0.8</td>
  </tr>
  <tr>
    <td>0</td>
    <td>1</td>
    <td>1</td>
  </tr>
</tbody>
</table>

The signal with a normalizing factor of 25 considers the 5-year and 12-year age differences to be farther apart. Smaller normalizing factors have the effect of amplifying marginal increases or decreases in age difference.

### Weight magnitudes

A weight indicates the importance of a signal relative to other signals in a configuration. The relative magnitudes of weights determine signal importance, not their absolute magnitudes.

<h5 style={{marginTop: '36px'}}>Example: Relative vs absolute magnitude</h5>

The table below calculates the server scores of two servers with two different matchmaking configurations. Configuration 5 and Configuration 6 have Occupancy weights higher than their respective Friends weights. Server A has a connection of the joining player in it.

<table>
<thead>
  <tr>
    <th></th>
    <th></th>
    <th colspan="2">**Friends**</th>
    <th colspan="2">**Occupancy**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td></td>
    <td></td>
    <td>**Weight**</td>
    <td>**Score**</td>
    <td>**Weight**</td>
    <td>**Score**</td>
    <td>**Total score**</td>
  </tr>
  <tr>
    <td rowspan="2">**Config 5**</td>
    <td>**Server A**</td>
    <td>10,000</td>
    <td>1</td>
    <td>15,000</td>
    <td>0.25</td>
    <td>10,000 * 1 + 15,000 * 0.25 = 13,750</td>
  </tr>
  <tr>
    <td>**Server B**</td>
    <td>10,000</td>
    <td>0</td>
    <td>15,000</td>
    <td>0.75</td>
    <td>10,000 * 0 + 15,000 * 0.75 = 11,250</td>
  </tr>
  <tr>
    <td rowspan="2">**Config 6**</td>
    <td>**Server A**</td>
    <td>0.01</td>
    <td>1</td>
    <td>0.05</td>
    <td>0.25</td>
    <td>0.01 * 1 + 0.05 * 0.25 = 0.0225</td>
  </tr>
  <tr>
    <td>**Server B**</td>
    <td>0.01</td>
    <td>0</td>
    <td>0.05</td>
    <td>0.75</td>
    <td>0.01 * 0 + 0.05 * 0.75 = 0.0375</td>
  </tr>
</tbody></table>

Server A wins with Configuration 5 while Server B wins with Configuration 6. This is because Configuration 5's Occupancy weight is only 1.5x its Friends weight, while Configuration 6's Occupancy weight is 5x its Friends weight.

Despite differences in absolute magnitudes, Configuration 6 prioritizes Occupancy over Friends more than Configuration 5 does.
