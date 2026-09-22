---
title: Network Simulator
description: Use Network Simulator to add latency, jitter, and packet loss to Studio playtest connections and see how your experience behaves under real-world network conditions.
---

**Network Simulator** is a Studio testing tool that adds latency, jitter, and packet loss to the connection between a playtest client and server. Use it to reproduce the conditions that players encounter on wired, Wi-Fi, and mobile connections without configuring an external network-throttling tool.

Testing under constrained conditions can reveal interactions that seem responsive on a fast development connection but become delayed, confusing, or unreliable for some players. Use Network Simulator to evaluate server-confirmed actions, replicated state, streaming behavior, prediction and correction, and how your experience tolerates occasional packet loss.

Network Simulator affects Studio playtests only. It doesn't change your published experience or the connections of live players.

<Alert severity="warning">

Network Simulator is in [beta](https://devforum.roblox.com/t/studio-beta-new-device-simulator-toolbar-and-network-simulator/4861695), and its functionality might change. To enable it, open **File** and select **Beta Features**, then enable **New Device Simulator** and restart Studio.

</Alert>

<img src="../assets/studio/device-simulator/network-simulator-controls.png" width="760" alt="Network Simulator showing a mobile preset and separate inbound and outbound latency, packet loss, and jitter controls." />

## How Network Simulator works

The simulator applies conditions independently in each direction:

- **Inbound** traffic travels from the server to the client. It includes replicated server state and server-to-client remote communication.
- **Outbound** traffic travels from the client to the server. It includes client requests and client-to-server remote communication.

<img src="../assets/studio/device-simulator/network-simulator-traffic-directions.png" width="760" alt="Diagram showing outbound traffic from the playtest client to the server and inbound traffic from the server to the client." />

Each direction has the following controls:

<table>
<thead>
	<tr>
		<th>Control</th>
		<th>What it simulates</th>
		<th>What to observe</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Latency</strong></td>
		<td>Minimum one-way delay added to each packet.</td>
		<td>Slow server acknowledgement, delayed state updates, and UI that appears stuck while waiting.</td>
	</tr>
	<tr>
		<td><strong>Jitter</strong></td>
		<td>Variation added on top of the minimum delay.</td>
		<td>Uneven update timing, visible correction, animation or motion instability, and ordering assumptions.</td>
	</tr>
	<tr>
		<td><strong>Packet loss</strong></td>
		<td>The probability that an individual packet is dropped.</td>
		<td>Retransmission delays for reliable traffic and missing updates for traffic designed to tolerate loss.</td>
	</tr>
</tbody>
</table>

Network ping is a round-trip measurement, so added inbound and outbound delay both contribute. For example, 10 ms of inbound latency and 10 ms of outbound latency add approximately 20 ms to the connection's existing round-trip time.

The configured values are added to the connection's real conditions. This is especially important during a [Team Test](./testing-modes.md#collaborative-testing), where geography and the public internet already contribute latency and packet loss.

## Open Network Simulator

To open the tool:

1. From the **Test** menu, enable **Device Simulator**.
2. In the toolbar above the 3D viewport, select the **Network** pill.

The pill summarizes the staged or applied connection type and quality. Open it to see the exact preset and all six directional values.

## Apply a preset

Built-in presets provide repeatable starting points for common connection types. Values in the following table are listed as **latency / jitter / packet loss**.

<table>
<thead>
	<tr>
		<th>Preset</th>
		<th>Pill</th>
		<th>Inbound</th>
		<th>Outbound</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Ideal Fiber</strong></td>
		<td>LAN</td>
		<td>8 ms / 0 ms / 0.00%</td>
		<td>8 ms / 0 ms / 0.00%</td>
	</tr>
	<tr>
		<td><strong>Wired Broadband</strong></td>
		<td>LAN</td>
		<td>25 ms / 3 ms / 0.00%</td>
		<td>25 ms / 3 ms / 0.00%</td>
	</tr>
	<tr>
		<td><strong>Home Wi-Fi</strong></td>
		<td>Wifi</td>
		<td>30 ms / 12 ms / 0.20%</td>
		<td>30 ms / 15 ms / 0.30%</td>
	</tr>
	<tr>
		<td><strong>Standard Mobile (4G/LTE)</strong></td>
		<td>4G</td>
		<td>45 ms / 20 ms / 0.40%</td>
		<td>55 ms / 30 ms / 0.50%</td>
	</tr>
	<tr>
		<td><strong>Bad Connection (3G)</strong></td>
		<td>3G</td>
		<td>150 ms / 70 ms / 0.50%</td>
		<td>180 ms / 90 ms / 0.50%</td>
	</tr>
</tbody>
</table>

The presets represent useful test conditions, not guarantees about every connection of that type. Real networks vary by device, location, provider, congestion, and time.

To apply a preset:

1. Select a preset from **Preset**.
2. Review the previewed **Inbound** and **Outbound** values. The pill also updates to preview the selection.
3. Select **Apply**.
4. Start or continue a [playtest](./testing-modes.md#playtesting) and exercise a client-server interaction.

Selecting a preset only stages its values. The active playtest connection doesn't change until you select **Apply**. If you dismiss the popover first, Network Simulator discards the staged changes and returns its controls and pill to the applied state.

After you select **Apply**, an active playtest uses the new values immediately. You don't need to restart the session.

<Alert severity="info">

**Ideal Fiber** is the default and least-impaired built-in preset, but it isn't the same as disabling simulation. It adds 8 ms in each direction. For a zero-added-delay comparison, set every value to `0` as a custom configuration and apply it.

</Alert>

## Configure custom conditions

Expand **Inbound** or **Outbound** to change one direction without changing the other. This is useful for separating problems in the client-to-server request path from problems in the server-to-client response path.

<table>
<thead>
	<tr>
		<th>Control</th>
		<th>Range</th>
		<th>Display precision</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Latency</strong></td>
		<td>0&ndash;1000 ms</td>
		<td>0.1 ms</td>
	</tr>
	<tr>
		<td><strong>Jitter</strong></td>
		<td>0&ndash;1000 ms</td>
		<td>0.1 ms</td>
	</tr>
	<tr>
		<td><strong>Packet loss</strong></td>
		<td>0.00&ndash;0.50%</td>
		<td>0.01%</td>
	</tr>
</tbody>
</table>

Packet loss is displayed as a percentage. A value of `0.50%` means half of one percent, not 50%.

Editing any numeric value changes **Preset** to **Custom**. The edits remain staged until you select **Apply**.

Network Simulator uses the same underlying emulation settings as the **Network** tab of [Studio Settings](./setup.md#customization). If those settings change elsewhere while the simulator has staged edits, the external values take precedence and the staged transaction is discarded.

### Save a custom preset

To reuse a custom configuration:

1. Edit one or more values.
2. Select **Save**.
3. Enter a unique preset name.
4. Select **Save & Apply**.

<img src="../assets/studio/device-simulator/network-simulator-custom-preset.png" width="760" alt="Save Network preset dialog for naming and applying a custom network configuration." />

The saved preset becomes available in the **Preset** menu across places and later Studio sessions. If you enter the name of an existing saved preset, the action changes to **Replace & Apply**. Built-in preset names and `Custom` are reserved.

When a saved preset is selected, **Delete** replaces **Reset**. Deleting it removes the saved preset and immediately applies **Ideal Fiber**. Applied network values themselves aren't preserved after a full Studio restart.

<Alert severity="info">

**Reset** stages **Ideal Fiber** and still requires **Apply**. This lets you inspect the reset values before changing the playtest connection.

</Alert>

## Configure network settings with a script

Every Network Simulator control corresponds to a `Class.NetworkSettings` property, so you can drive the same conditions from a plugin or automated test instead of the toolbar.

<table>
<thead>
	<tr>
		<th>Control</th>
		<th>Property</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><strong>Inbound Latency</strong></td>
		<td>`Class.NetworkSettings.InboundNetworkMinDelayMs|InboundNetworkMinDelayMs`</td>
		<td>Adds latency to playtest connections in the server-to-client direction.</td>
	</tr>
	<tr>
		<td><strong>Outbound Latency</strong></td>
		<td>`Class.NetworkSettings.OutboundNetworkMinDelayMs|OutboundNetworkMinDelayMs`</td>
		<td>Adds latency to playtest connections in the client-to-server direction.</td>
	</tr>
	<tr>
		<td><strong>Inbound Jitter</strong></td>
		<td>`Class.NetworkSettings.InboundNetworkJitterMs|InboundNetworkJitterMs`</td>
		<td>Adds jitter to playtest connections in the server-to-client direction.</td>
	</tr>
	<tr>
		<td><strong>Outbound Jitter</strong></td>
		<td>`Class.NetworkSettings.OutboundNetworkJitterMs|OutboundNetworkJitterMs`</td>
		<td>Adds jitter to playtest connections in the client-to-server direction.</td>
	</tr>
	<tr>
		<td><strong>Inbound Packet Loss</strong></td>
		<td>`Class.NetworkSettings.InboundNetworkLossPercent|InboundNetworkLossPercent`</td>
		<td>Sets the probability that packets on playtest connections from server to client are dropped.</td>
	</tr>
	<tr>
		<td><strong>Outbound Packet Loss</strong></td>
		<td>`Class.NetworkSettings.OutboundNetworkLossPercent|OutboundNetworkLossPercent`</td>
		<td>Sets the probability that packets on playtest connections from client to server are dropped.</td>
	</tr>
</tbody>
</table>

Setting any of these properties directly keeps Network Simulator's toolbar and pill in sync, since both read from the same underlying settings.

## Test a network-sensitive workflow

Use the same repeatable interaction under several conditions so differences are attributable to the network rather than to a different code path or scene.

1. Choose a player journey that crosses the client-server boundary, such as activating a server-authoritative ability, receiving an inventory update, or observing replicated movement.
2. Define what success looks like. Record response time, visible feedback, timeout behavior, corrections, duplicate requests, and recovery.
3. Apply **Ideal Fiber** and run the journey as a baseline.
4. Apply a representative condition such as **Home Wi-Fi** or **Standard Mobile (4G/LTE)** and repeat the same actions.
5. Apply **Bad Connection (3G)** as a resilience test. Confirm that the experience remains understandable even when updates are delayed or uneven.
6. Change only inbound or outbound values to isolate which direction exposes the problem.
7. After making a fix, repeat the same runs and compare the results.

Useful questions include:

- Does the player receive immediate local feedback while waiting for server confirmation?
- Can repeated input submit the same action more than once?
- Do loading and progress states distinguish slow work from a failure?
- Do timeouts offer a safe retry path?
- Does replicated movement remain understandable when updates arrive unevenly?
- Can unreliable updates be skipped without leaving stale state on screen?
- Does the experience recover after returning to a better connection?

For large comparisons, apply the condition before beginning the interaction. Large latency changes during a running test can affect congestion control, so a fresh run provides a cleaner comparison.

## Measure and diagnose results

Network Simulator changes test conditions; other tools help explain the result:

- The [Developer Console](./developer-console.md) displays average ping and logs, which can confirm that the connection changed and reveal errors in retry or timeout code.
- A [MicroProfiler network capture](../performance-optimization/microprofiler/network.md) shows sent and received engine traffic by frame. Use it to identify traffic spikes and determine whether the affected flow is dominated by replication, physics, or other network data.
- The [MicroProfiler](../performance-optimization/microprofiler/index.md) can help distinguish a network-sensitive delay from a simultaneous frame-time problem.

Keep the scenario, playtest mode, and observation method consistent when comparing captures. A single run under a poor connection can reveal a symptom, but repeated baseline and impaired runs are more useful for measuring whether a change helped.
