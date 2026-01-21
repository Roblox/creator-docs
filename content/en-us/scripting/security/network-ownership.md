---
title: Network ownership, movement validation, and physics
description: Learn about network ownership and its relationship to assemblies, physics, and more.
---

<Alert severity = 'warning'>
The following content covers various concepts and tactics to improve security and mitigate cheating in your Roblox experiences. It's highly recommended that all developers read through these to ensure that your experiences are secure and fair for all users. Check the sidebar for additional security topics.
</Alert>

[Network ownership](../../physics/network-ownership.md) is one of the more nuanced and commonly misunderstood aspects of the Roblox engine. When a player has network ownership of a part or assembly, they have complete authority over the physics simulation for those objects. By default, the server grants network ownership of unanchored parts to clients with nearby player characters to distribute the load of the physics simulation. This system improves responsiveness but creates significant security implications that every developer must understand.

## Understanding network ownership

When a client has network ownership over parts (including their character), they have access to:

**Assembly manipulation:**

- Teleport to any position.
- This can be used to quickly gain ownership and control of as many unanchored parts and assemblies as the server will allow.
- Manipulate their movement and state, such as flying or changing their speed.
- Exploiters can set their Humanoid WalkSpeed to any value. Properties can be modified locally without firing any events on the local client, and without such property changes capable of being read from local scripts.
- Play arbitrary animations and manipulate animation state.
- Bypass physical obstacles and alter their collision.

**Physics manipulation**

- Control the position and rotation of any unanchored parts or mechanisms, including replicating `Inf` or `NaN` components in `Datatype.CFrame|CFrames`.
  Set part velocities to extreme values (including `Inf` or `NaN`), which can interfere with the physics of other unanchored parts/assemblies, even those that are not owned by the exploiter.
  This is often used to fling other player characters and nearby parts.
  Manipulate the firing of Touched events, including not firing Touched at all.

Should your experience necessitate gameplay-critical fully unanchored parts or assemblies, consider using the network ownership API to manually set ownership or turn off automatic ownership.

## Movement validation

In competitive experiences, server-side validation of player movement is crucial for simulation integrity, as clients control character movement and physics. However, a universal solution doesn't exist due to varying gameplay mechanics.

Traditional methods often fall short in complex scenarios. Simple distance-over-time calculations may suffice for competitive shooters but fail in physics-intensive experiences involving vehicles, flight, or intricate interactions. Validation must also account for network latency.

<Alert severity = 'warning'>
[Server authority](../../projects/server-authority/) is currently in beta and will be released soon.
The most reliable solution for preventing physics and movement exploits is server authority, which moves physics simulation and movement validation entirely to the server. This eliminates the fundamental security weakness of client-controlled movement by ensuring all movement decisions are made on the server with authoritative validation.
</Alert>

Until server authority becomes available, developers implementing client-side validation must understand that effective approaches vary dramatically. Basic heuristics can flag innocent players with unstable connections, and straightforward speed calculations break down in experiences with complex movement systems. Position updates are subject to internet latency, requiring averaging over time. Many developers find that leaky bucket-style accumulators work well for handling burst movements while preventing sustained violations.

Practical implementation often requires projecting movement onto specific planes (e.g., XZ for ground-based movement) to avoid penalizing legitimate vertical movement while detecting horizontal teleportation. Experiences with legitimate teleportation mechanics need explicit exemption systems. Validation frequency, tolerance levels, and enforcement strategies should be tuned to each experience's specific requirements.
