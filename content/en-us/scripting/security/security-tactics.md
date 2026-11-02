---
title: Security and cheat mitigation tactics
description: Explore security tactics and cheat mitigation tactics for Roblox games.
---

<Alert severity = 'warning'>
The following content covers various concepts and tactics to improve security and mitigate cheating in your Roblox games. It's highly recommended that all developers read through these to ensure that your games are secure and fair for all users. Check the sidebar for additional security topics.
</Alert>

Before diving into specific tactics for developing securely and preventing cheating, it's essential to understand the foundational principles of Roblox security. A secure game is built on a mindset that anticipates adversarial actions. Before writing a single line of code, you must internalize these foundational principles. They should inform every architectural and design decision you make.

## Never trust the client

This is the foundational principle. A determined exploiter has complete control over their local state and network traffic. Because exploiters have this level of control, any security measure that relies on client-side enforcement will eventually be bypassed. This is not a limitation of Roblox: it's a fundamental reality of client-server architectures. Assume every piece of data sent from the client has been manipulated, fabricated, or sent with malicious intent. This includes the power to:

- Decompile any replicated LocalScript or any ModuleScript, even if they never run on the client
- Take network ownership of their character and any unanchored parts
- Trigger client-initiated events such as Touched events or ProximityPrompt activations at any range or frequency
- Modify their player's position, physics, or interactions with the world
- Fire or invoke RemoteEvents and RemoteFunctions at any frequency with arbitrary arguments (besides the first Player argument)
- Change anything in their local DataModel without firing any expected events
- Arbitrarily alter the behavior of any locally running code

Because of this, all critical logic must be validated server-side or run exclusively on the server. The consequences of this control are detailed in [Network Ownership, Movement Validation, and Physics Exploits](./network-ownership.md) and [Access Control and Confidentiality](./access-control.md).

## Server as source of truth

The server must be the ultimate source of truth for all simulation states, rules, player progression, and critical decisions. The client's role is to render the world and send user input to the server.

The server's role is to:

- Receive input from the client
- Validate that the requested action is possible and permissible
- Execute the action and update its authoritative state
- Replicate the results to all relevant clients

For example, if a player says "I want to buy a Bloxy Cola" the server must know the item's true price, the player's money, and the player character's physical distance from the shop before validating and approving the transaction. As much as possible, the state to be validated should be maintained exclusively by the server and not by clients. In the example, if the Bloxy Cola transaction is approved, the server should subtract the Bloxy Cola's price from the player's money, however, the server cannot necessarily always control the player's character.

This principle is different from **server authority**, an engine feature that applies it to physics and movement. In the [server authority model](../../projects/server-authority/index.md), the server simulates the entire game state and clients only send their inputs, so a client can never report its own position or state. This prevents entire classes of cheating, such as flying or speed hacks. To keep gameplay responsive, clients predict the results of their inputs, and the server corrects them when a prediction is wrong. Consider the server authority model for competitive games such as shooters, racing, sports, and combat.

## Security by design

Integrate security considerations into your game's design from the very beginning, rather than attempting to bolt them on later as an afterthought.

- Threat model every new feature. For every new feature, ask
  - How could an attacker exploit this if they have full control of their client?
  - If a client could send any value for any parameters used in the feature, what's the worst possible outcome?
  - What happens if this feature is used 1,000+ times per second? What is the maximum rate at which it should be used?
  - Could an exploiter use this to ruin another player's experience?
  - How much resources, in the worst case, could this feature feasibly use?
  - What is the minimum internal information or state that I need to expose for this feature?
- Partition responsibilities early. Keep logic and data in ServerScriptService from day one. Never place them in replicated containers like ReplicatedStorage or Workspace.

## Device trust

The principles on this page protect your game from what a player does after they join. Roblox also provides the optional [Device Trust API](./device-trust.md), which checks whether the player's device can be trusted as they join and gives you the result as a **device trust level**. Roblox doesn't take any action based on this level. You decide how your game responds, for example by sending players to separate places based on their trust level, by limiting sensitive features such as trading to trusted devices, or by rejecting players whose devices fail the check. To start using it in your scripts, see [read the trust level](./device-trust.md#read-the-trust-level).

Device trust doesn't replace the principles on this page. Exploits that rely on weak server-side validation still work on trusted devices, so keep treating the client as untrusted and validating important actions on the server.
