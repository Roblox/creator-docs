---
title: Graph Editor state machines
description: Use state machines in the Animation Graph Editor to organize state-driven animations and control how they transition.
---

A **state machine** combines animation nodes into named states, such as **Idle**, **Walk**, **Run**, and **Jump**. It plays the active state and blends to another state when a transition condition evaluates to `true`. Use a state machine to define which animations can follow each other without writing transition logic in Luau.

Each state connects to an input on the state machine. A state can be a clip, a blend node, or another state machine. The state machine outputs the active animation pose or a blend between two poses if transitioning, which you connect to the next node in the graph.

## Prerequisites

Before you create a state machine, familiarize yourself with the [Animation Graph Editor](./graph-editor.md), including how to [open it and create an animation graph](./graph-editor.md#build-a-graph).

## Create a state machine

The following example uses three states from **JumpFallLandRunExample**: **Locomotion**, **Fall**, and **LandIdle**. The character moves normally, switches to a falling animation when airborne, and plays a landing animation before returning to locomotion. These steps focus on the state machine; start with animation nodes for locomotion, falling, and landing.

1. In the **Graph Editor**, right-click and select **Insert Node** ⟩ **State Machine**.

   <img src="../assets/animation/graph-editor-state-machine/Insert-State-Machine.png" width="60%" alt="Graph Editor context menu with the Insert Node submenu open and State Machine selected." />

2. On the state machine node, click **Open**. In the **State Machine** view, use **Create State** to add three states named `Locomotion`, `Fall`, and `LandIdle`.

   <img src="../assets/animation/graph-editor-state-machine/Add-A-State.png" width="80%" alt="State Machine view with the Create State button and Entry and Any state nodes." />

3. Click **Back to Graph** and connect your animation nodes to the corresponding state machine inputs:
   - **Locomotion**: Connect your locomotion animation. The reference graph uses an `Enum.AnimationNodeType|Blend1DNode` named **IdleRunBlend** to blend idle and running animations based on `Speed`.
   - **Fall**: Connect a falling `Enum.AnimationNodeType|ClipNode` and set **Play Mode** to `Enum.AnimationNodePlayMode|OnceAndHold`, so it holds its final pose until the character lands.
   - **LandIdle**: Connect a landing clip and set **Play Mode** to `Enum.AnimationNodePlayMode|OnceAndHold`, so it can finish and transition back to locomotion.

   Connect the state machine output to the **Pose** input of **Graph Output**.

   <img src="../assets/animation/graph-editor-state-machine/Wire-Nodes-To-State-Machine.png" width="80%" alt="IdleRunBlend, Fall, and LandIdle nodes connected to the Locomotion, Fall, and LandIdle inputs of a State Machine node, whose output connects to Graph Output." />

4. Open the **State Machine** view again and drag a transition from **(Entry)** to **Locomotion**. The state machine starts in this state when the graph starts.

   <img src="../assets/animation/graph-editor-state-machine/Entry-State-To-Locomotion.png" width="80%" alt="Entry node connected to the Locomotion state." />

5. Add a Boolean graph parameter named `Grounded` and set it to `true`. This parameter indicates whether the character is on the ground.

6. Add the following transitions by dragging a connection from the source state to the destination state, then configure each transition:
   - **Locomotion** to **Fall**: Set **Wait For** to [**Expression**](./expressions.md), **Expression** to `not Grounded`, and **Length** to `0.2` seconds. The falling animation begins when the character leaves the ground.
   - **Fall** to **LandIdle**: Set **Wait For** to **Expression**, **Expression** to `Grounded`, and **Length** to `0.1` seconds. The landing animation begins when the character touches the ground.
   - **LandIdle** to **Locomotion**: Set **Wait For** to **Finished**, **When** to `Enum.AnimationNodeTransitionWhen|BeforeFinished`, and **Length** to `0.2` seconds. The state machine begins blending back to locomotion during the final 0.2 seconds of the landing animation.

   <img src="../assets/animation/graph-editor-state-machine/Transition-Settings.png" width="80%" alt="Transition settings for LandIdle to Locomotion, with Length set to 0.2, Curve to Linear, Wait For to Finished, and When to Before Finished." />

7. Leave **Curve** as the default (`Enum.PoseEasingStyle|Linear`) for all three transitions. Preview the graph and change `Grounded` to `false` to enter **Fall**, then back to `true` to play **LandIdle** and return to **Locomotion**.

8. Update `Grounded` from your gameplay code as the character leaves and touches the ground. If your locomotion blend uses `Speed`, update that parameter as the character moves. For the parameter workflow, see [API integration](./graph-editor.md#api-integration).

9. Extend the state machine with jumping and additional landing states to create the full movement graph. **JumpFallLandRunExample** includes separate jumps for standing and running, plus different landings based on movement and fall speed.

<Alert severity="success">
For the full state machine, open **JumpFallLandRunExample** in the [reference place](https://www.roblox.com/games/116845448376632).
</Alert>

## State machine properties

### State machine node properties

<dl>
<dt>**Inputs**</dt>
<dd>
- **State1...StateN**: The animation nodes that define each state. The name of the state must match the name of the input to the state machine node.
</dd>
<dt>**Properties**</dt>
<dd>

<table><thead>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>**EntryState**</td>
    <td>`Class.ObjectValue`</td>
    <td>An `Class.ObjectValue` whose `Class.ObjectValue.Value|Value` points to the `Class.AnimationNodeDefinition` for the state that is active when the graph starts.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** Events from the active state pass through with their weight unchanged.
- **Event Emission:** Passes through events from the active state only. During a transition, event emission follows the [global event rules](./graph-editor.md#global-event-rules).
</dd>
</dl>

### Transition properties

A transition has one or more source states, a destination state, and a condition. When the active state matches a source state, the state machine checks the condition. It blends to the destination state when the condition evaluates to `true`.

**Wait For** determines the transition condition UI. Select [**Expression**](./expressions.md) (`Enum.AnimationNodeWaitFor|Trigger`) to display an **Expression** box. An **Expression** can reference a boolean graph parameter directly, such as `ShouldJump`, or evaluate a condition, such as `Speed >= 12`. Select **Finished** (`Enum.AnimationNodeWaitFor|Finished`) to display the **When** dropdown.

If more than one transition has a true **Expression**, the state machine evaluates the transition with the highest **Priority** value first. When priorities are the same, it selects one transition at random. Assign different priorities to competing transitions to make the result predictable.

<table><thead>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Description</th>
  </tr></thead>
<tbody>
  <tr>
    <td>**From**</td>
    <td>`Class.ObjectValue`</td>
    <td>An `Class.ObjectValue` whose `Class.ObjectValue.Value|Value` points to the `Class.AnimationNodeDefinition` for the state that can begin the transition. Leave this property unset for an **(Any)** transition.</td>
  </tr>
  <tr>
    <td>**To**</td>
    <td>`Class.ObjectValue`</td>
    <td>An `Class.ObjectValue` whose `Class.ObjectValue.Value|Value` points to the `Class.AnimationNodeDefinition` for the destination state.</td>
  </tr>
  <tr>
    <td>**WaitFor**</td>
    <td>`Enum.AnimationNodeWaitFor`</td>
    <td>Determines which transition condition UI appears. `Enum.AnimationNodeWaitFor|Trigger` displays the **Expression** box. `Enum.AnimationNodeWaitFor|Finished` displays the **When** dropdown.</td>
  </tr>
  <tr>
    <td>**When**</td>
    <td>`Enum.AnimationNodeTransitionWhen`</td>
    <td>Available when **Wait For** is **Finished**. Select `Enum.AnimationNodeTransitionWhen|Finished` to begin after the source state finishes, or `Enum.AnimationNodeTransitionWhen|BeforeFinished` to begin blending one **Duration** before the source state finishes.</td>
  </tr>
  <tr>
    <td>**Expression**</td>
    <td>String</td>
    <td>Available when **Wait For** is [**Expression**](./expressions.md). A boolean graph parameter or expression that, when it evaluates to `true`, begins the transition. See [**Expression**](./expressions.md) for what's supported.</td>
  </tr>
  <tr>
    <td>**Priority**</td>
    <td>Number</td>
    <td>The order used when more than one **Expression** is true. Higher values take precedence. Valid values range from 0 to 65,535.</td>
  </tr>
  <tr>
    <td>**Duration**</td>
    <td>Number</td>
    <td>The time, in seconds, to blend into the destination state. The default is 0.15 seconds.</td>
  </tr>
  <tr>
    <td>**Curve**</td>
    <td><code>Enum.PoseEasingStyle</code></td>
    <td>The easing used during the blend. Only `Enum.PoseEasingStyle|Linear` and `Enum.PoseEasingStyle|CubicV2` are supported. The default is `Enum.PoseEasingStyle|Linear`.</td>
  </tr>
</tbody></table>
