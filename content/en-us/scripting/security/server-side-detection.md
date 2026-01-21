---
title: Server-side detection and consequencing
description: Find ways to respond to abusive looking behavior and respond accordingly.
---

<Alert severity = 'warning'>
The following content covers various concepts and tactics to improve security and mitigate cheating in your Roblox experiences. It's highly recommended that all developers read through these to ensure that your experiences are secure and fair for all users. Check the sidebar for additional security topics.
</Alert>

This section assumes you already validate inputs and context (see previous sections). This article covers what to do after a request is technically valid but behavior looks abusive, plus how to respond without harming legitimate players.

## Philosophy

- **The server decides**. Detection and consequencing live on the server. Try to never ban based on client-side detections, as exploiters can easily bypass them.
- **Prevent harm first**. Quietly neutralize the impact of an exploit. For example, if a player is speed-hacking, just rubber-band them back to their last valid position instead of kicking them immediately. Punish only when necessary to protect the experience or other players.
- **Be proportional and reversible**. Assume false positives can happen. Prefer actions you can roll back, such as temporary suspensions or resource removal, over permanent bans.
- **Design > detection**. Your primary security comes from robust validation and rate limiting (covered in [Securing the client-server boundary](./client-server-boundary.md) and other sections). The detection methods below are meant to supplement those defenses, not replace them.

## Heuristics

Heuristics are behavior checks that flag actions that are technically possible but highly improbable for a legitimate player. They are "rules of thumb" for catching suspicious activity that slips past basic validation. An effective heuristic compares a player's action against a theoretical maximum or a reasonable baseline.

For example, if a player suddenly claims to have gained 1 billion coins in your simulator game, your remote validation might confirm the request is structured correctly. But a heuristic check on the server would know that earning that much should take weeks, not seconds, and flag the transaction as suspicious.

Here are three classic examples of server-side heuristics. Each one validates player behavior against the experience's rules and physical limitations, creating a strong defense against common exploits.

<table><thead>
  <tr>
    <th>**Server-side heuristic**</th>
    <th>**Description**</th>
    <th>**Example**</th>
  </tr></thead>
<tbody>
  <tr>
    <td>**Fastest Completion Time**</td>
    <td>Calculate the theoretical fastest possible time to complete a task, like an obstacle course. This involves finding the optimal path and assuming maximum player speed.</td>
    <td>In an obby, if the world record is 30 seconds, a completion time of 5 seconds is a strong signal of teleportation or speed exploits.</td>
  </tr>
  <tr>
    <td>**Rate of Gain**</td>
    <td>Track the maximum legitimate rate at which a player can earn a resource (currency, experience, items).</td>
    <td>If a player can legitimately earn 100 coins per minute, a sudden gain of 10,000 coins in one second should be flagged.</td>
  </tr>
  <tr>
    <td>**Action Cadence**</td>
    <td>The server analyzes the time intervals between a player's repeated actions. Human inputs have natural, slight variations in timing, whereas simple automation scripts (like auto-clickers) often perform actions with robotic consistency.</td>
    <td>In a fishing minigame, a player clicks to cast their line. The server logs the timestamp of each cast. If the player casts their line 100 times in a row with the exact same interval (e.g., precisely 2.500 seconds) between each action, it's a strong indicator of a macro or bot. A human's timing would naturally fluctuate</td>
  </tr>
</tbody></table>

Any one of these examples may not be enough on its own to convict a cheater. Each should be treated as a signal, not as definitive proof. A good practice is to implement a suspicion score. When a player fails a heuristic check, you increment their score. Severe actions like kicking or banning should only occur after multiple, varied detections have pushed a player's score past a high threshold.

For example, suppose a skilled player finishes your obby with a record-shattering time, triggering your "Fastest Completion Time" heuristic. Should they be banned? It's possible they're exploiting, but they might also have discovered a legitimate but unintended shortcut. Banning them based on this single signal would be risky and could punish one of your most dedicated players.

However, if that same player's run also flagged the "Action Cadence" heuristic for inhumanly consistent inputs, and an hour later they trigger the "Rate of Gain" heuristic in your lobby, the case becomes much stronger. The combination of these different signals paints a much more reliable picture of cheating. The strength of this system lies in correlating multiple data points to build a confident case before taking action.

## Honeypots

One way to detect cheaters trying to probe your experience's RemoteEvents is to use a decoy called a honeypot. A honeypot is a `Class.RemoteEvent` or `Class.RemoteFunction` that appears legitimate to an exploiter but is never used by any of your legitimate client scripts. Because no normal player should ever be able to fire this remote, any traffic it receives must be from an exploiter. When the server detects this remote being fired, it's a very high-confidence signal that the client is meddling. The best immediate action is to log the incident and kick the player from the session.

Another variation is to design RemoteEvents with specific directional purposes - some exclusively for client → server communication and others exclusively for server → client communication. While the event names don't reveal their intended direction, the server tracks which direction each remote should be used. If an exploiter attempts to fire a server → client remote from the client, this serves as a reliable detection method since legitimate gameplay would never trigger communication in the wrong direction.

## Applying consequences

When detection systems flag suspicious behavior, consider your response strategy carefully. Different experiences require different approaches based on their community, competitive stakes, and tolerance for disruption.

**The consequence ladder** - Most experiences benefit from escalating responses rather than jumping straight to permanent bans:

- **Silent logging** - Build evidence without player impact
- **Quiet mitigation** - Block the exploit's effect (drop requests, clamp values, sync correct state)
- **Temporary restrictions** - Limit specific capabilities (trading, leaderboards, matchmaking)
- **Visible enforcement** - Kicks, temporary suspensions, or permanent bans

**Considerations for your strategy**

- **Delay visible consequences** to avoid teaching exploiters exactly what triggered detection
- **Match severity to response** - minor economic exploits may warrant different treatment than game-breaking physics cheats
- **Consider your community** - competitive experiences may need stricter enforcement than casual experiences
- **Plan for mistakes** - prefer reversible actions when detection confidence is lower

For persistent offenders, consider using the `Class.Players.BanAsync|Ban API` rather than relying solely on kicks. The Ban API prevents banned players from rejoining and provides better tracking across your universe. Version your detection rules and track consequence rates so you can identify problematic systems. Monitor player feedback to gauge whether your enforcement feels fair to the community. The right balance depends entirely on your experience's needs and your players' expectations.
