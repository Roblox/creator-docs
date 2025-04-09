---
title: Matchmaking glossary
description: Glossary of matchmaking terms.
---

<table>
<thead>
  <tr>
    <th>**General terms**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Joining player**</td>
    <td>The player being matched to a server in your experience.</td>
  </tr>
  <tr>
    <td>**Common device**</td>
    <td>The device type shared between existing players in the server and the joining player. Can be a mobile device, a desktop, a laptop, a tablet, or a console.</td>
  </tr>
  <tr>
    <td>**Common language**</td>
    <td>The language shared between existing players in the server and the joining player.</td>
  </tr>
</tbody>

<thead>
  <tr>
    <th>**Scoring**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Server**</td>
    <td>An RCC instance hosting a place.</td>
  </tr>
  <tr>
    <td>**Signal weight**</td>
    <td>A non-negative number that describes the importance of a signal relative to other signals.</td>
  </tr>
  <tr>
    <td>**Weighted sum**</td>
    <td>The sum of all weighted signal scores for a server. The basis for picking the best server for a player.</td>
  </tr>
  <tr>
    <td>**Server score**</td>
    <td>The final matchmaking score for a server, based on the weighted sum of its signals. Players are matched to the server with the highest score.</td>
  </tr>
  <tr>
    <td>**Weighted signal score**</td>
    <td>The value after multiplying the signal score by its weight.</td>
  </tr>
</tbody>

<thead>
  <tr>
    <th>**Signals**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Signal**</td>
    <td>The processed version of an attribute. A signal is created when an attribute is transformed to fit the matchmaking scoring system.</td>
  </tr>
  <tr>
    <td>**Signal score**</td>
    <td>The value of a signal after transformations, ranging between 0 and 1.</td>
  </tr>
  <tr>
    <td>**Weight**</td>
    <td>Describes the importance of a signal in the scoring process. Signals with higher weights have a bigger impact in matchmaking.</td>
  </tr>
  <tr>
    <td>**Weighted signal score**</td>
    <td>The result of multiplying a signal's score by its weight. Reflects both the value and importance of the signal.</td>
  </tr>
  <tr>
    <td>**Numerical custom signal**</td>
    <td>The difference between the joining player's attribute and the server's average.</td>
  </tr>
  <tr>
    <td>**Categorical custom signal**</td>
    <td>How common the joining player's attribute is when compared to the other players in the server.</td>
  </tr>
</tbody>

<thead>
  <tr>
    <th>**Attributes**</th>
    <th></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Attribute**</td>
    <td>A property used in matchmaking scoring. Represents “raw signal values” before they're processed.<br/><br/>
    Can be a number or a string.</td>
  </tr>
  <tr>
    <td>**Custom attribute**</td>
    <td>A universe-level property defined by creators. Can be a **player attribute** or a **server attribute**.</td>
  </tr>
  <tr>
    <td>**Player attribute**</td>
    <td>A characteristic of a player, like their preferred game mode or skill level.</td>
  </tr>
  <tr>
    <td>**Server attribute**</td>
    <td>A characteristic of a server, like the server's response time or active game mode.</td>
  </tr>
</tbody>
</table>
