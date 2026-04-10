---
title: Animation Graph Editor
description: The animation graph editor is a visual, node-based tool that lets you build complex animation logic.
---

<Alert severity = 'info'>
Animation graphs is currently in Studio Beta. To enable, navigate to **File** > **Beta Features** and enable **Animation graphs**.
</Alert>

The **Animation Graph Editor** is a visual, node-based tool that empowers technical artists and animators to build complex animation logic directly within Roblox Studio. By providing a streamlined interface for creating behaviors like blend trees, it removes the traditional dependency on manual scripting for character motion.

This system works in tandem with your existing animation workflow:

- **Animation Editor**: Continue using the Animation Editor as your primary tool for authoring individual clips and fine-tuning keyframes and curves.
- **Animation Graph Editor**: Use this new workspace to take those clips and organize them into a logic tree to drive sophisticated gameplay behavior.

Designed to enhance collaboration, the visual graph allows developers to quickly inspect, debug, and understand the logic created by animators. While artists focus on refining interactive motion, developers can still access animation graph nodes programmatically for direct control over blended animations and states.

## Build a graph

<Alert severity = 'info'>
Animation graphs is currently in Studio Beta. To enable, navigate to **File** > **Beta Features** and enable **Animation graphs**.
</Alert>

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/VgMUCph3bOI" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
<br />

To begin building logic for an animatable character, access the Animation Graph editor via the Avatar tab in the Studio ribbon. The following steps demonstrate how to initialize a rig and construct a basic node network using default walking and waving animations.

For a deeper dive into practical applications, you can explore the [Animation Graph Reference File](https://www.roblox.com/games/92493993350916/Animation-Graph-Editor-Simple-Demo), which contains both foundational and complex implementation examples.

To create your own animation graph, similar to the basic example provided in the reference, use the following steps:

1. In Studio, add an animatable rig by navigating to the Avatar tab and selecting **Character** > **My Avatar**.
2. Open the Animation Graph Editor by navigating to **Graph Editor** in Studio's **Avatar** tab.

   <img src="../assets/animation/graph-editor/Anim-Graph-Ribbon.png" width="60%" alt="Animation Graph Editor indicated in Studio's toolbar" />

3. Select the animatable rig in the 3D viewport and select **Create Graph**.
4. In the Graph Editor, right-click and select **Clip**.

   <img src="../assets/animation/graph-editor/Node-List.png" width="60%" alt="List of nodes in a right-click menu" />

5. In the new Clip node, set the Animation ID.

   1. Select the **Animation ID dropdown**.
   2. To submit a specific animation asset ID, click **Import**.

      <img src="../assets/animation/graph-editor/Import-AnimationID.png" width="60%" alt="Indicated a field on the animation import module to add Animation ID" />

   3. In the **Animation ID** field, add the default Walk animation: `507777826`.
   4. Select **Import**.

6. Add another clip node by repeating steps 4-5 using the default Wave animation: `507770239`.

   <img src="../assets/animation/graph-editor/Clip-Nodes-With-IDs.png" width="60%" alt="Two clip nodes with a populated Animation ID" />

7. In the Graph Editor, right-click and select **Add**.

   <img src="../assets/animation/graph-editor/Add-Node.png" width="35%" alt="Add node" />

8. **Connect the Clip nodes to the Add node** by dragging the top-right output connector to the appropriate port:

   1. Connect the **Clip** node with the Walking animation to the **Base** port.
   2. Connect the **Clip** node with the Waving animation to the **Additive** port.

     <img src="../assets/animation/graph-editor/Connect-To-Add.png" width="80%" alt="Both clip nodes attached to add node" />

9. From the Add node, connect the top-right output connector to the Graph Output **Pose** port.

   <img src="../assets/animation/graph-editor/Connect-The-Clip-Nodes.png" width="80%" alt="All nodes connected to a final output node" />

10. **(Optional)** Assign a parameter to your `Speed` variable.

    1. Click and drag the green Speed port to an empty area. A new parameter node displays.
       <img src="../assets/animation/graph-editor/Parameter-Noodle.png" width="80%" alt="Click and dragging connector from Speed port of Clip node." />

    2. In the top left of the graph editor, use the parameter pane to quickly modify parameters in your nodes. You can also access this [programmatically](#api-integration).
       <img src="../assets/animation/graph-editor/Parameter-Pane.png" width="80%" alt="Parameter pane, parameter node, and clip node showing shared values." />

11. Test the animation by pressing the **play button**.

    <img src="../assets/animation/graph-editor/Play-Preview-Button.png" width="80%" alt="Play button icon for previewing animations" />

12. Try testing various weights, speeds, playmodes, and other animations. For more information on individual nodes, see the [Node reference](#node-reference).

<Alert severity = 'success'>
Check out the [reference place](https://www.roblox.com/games/92493993350916/Animation-Graph-Editor-Simple-Demo) for different examples of various animation graph configurations.
</Alert>

## API integration

Creating and deploying an Animation Graph follows the standard Roblox animation pipeline. After selecting a rig in the Animation Graph Editor, a new `AnimationGraphDefinition` asset is created. This asset serves as the container for your nodes, connections, and parameters. Once your logic is finalized, you publish the graph to receive a standard Asset ID.

In your scripts, you interact with these graphs by loading them onto an `Class.Animator` as you would a traditional animation. To drive the graph's internal logic, use `Class.AnimationTrack:SetParameter` to pass real-time values—such as movement speed or state booleans—directly into the graph's variables.

```lua
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://123456789" -- Your Published Graph ID

local animationTrack = animator:LoadAnimation(animation)
animationTrack:Play()

-- Dynamic parameter updates via RunService
game:GetService("RunService").Stepped:Connect(function(_, dt)
    local currentSpeed = humanoidRootPart.AssemblyLinearVelocity.Magnitude
    animationTrack:SetParameter("humanoidSpeed", currentSpeed)
end)
```

## Node reference

Every animation graph node serves as a logic gate or data source that processes animation data before it reaches the character rig. This section provides a technical breakdown of the functional blocks within the Animation Graph Editor. All nodes currently output an animation pose.

Each node section includes:

- **Definition** – A summary of the node's purpose and role within the graph.
- **Inputs** – The data streams entering the node. Multiple inputs are represented as Input1, Input2, ..., InputN.
- **Input properties** – Settings tied directly to a specific input (an Idle input assigned to a Position of 0.5 on a Blend1D node).
- **Event Data** – Events emitted or consumed by the node to trigger internal graph logic or external Luau scripts. This behavior may change over the course of the beta development.

### Global event rules

For all nodes and [transitions](#transitions), the following rules apply by default:

- Events propagate upward from their source node through the graph. Each event carries a weight representing its source's influence in the final blend. If the weight reaches zero at any point, the event is silenced.
- Nodes without custom event logic pass all events through unchanged; nodes that blend or select between inputs may scale the weight or block events from non-primary inputs (see per-node Event section).
- Marker events that reach the top of the graph can be observed via `Class.AnimationTrack:GetMarkerReachedSignal`.

### Clip

<img src="../assets/animation/graph-editor/Clip-Node.png" width="30%" alt="Clip node" />

A reference to an `Class.AnimationClip` asset. This serves as a leaf node in the graph, generating the raw animation data that feeds into other nodes for blending, selection, or modification.

<dl>
<dt>**Inputs**</dt>
<dd>
- None
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
    <td>**Clip**</td>
    <td>Asset ID</td>
    <td>The animation asset to play (e.g. rbxassetid://12345).</td>
  </tr>
  <tr>
    <td>**PlayMode**</td>
    <td>`Enum.AnimationNodePlayMode`</td>
    <td>
    Defines the behavior of the clip once it reaches the end of its duration.
    <ul>
      <li>**Loop (default)**: Automatically restarts from the beginning once the clip finishes.</li>
      <li>**PingPong**: Plays from start to end, then immediately plays in reverse from end to start.</li>
      <li>**OnceAndHold**: Plays once and maintains the final pose upon completion.</li>
      <li>**OnceAndReset**: Plays once and snaps back to the initial start pose upon completion.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>**Reverse**</td>
    <td>Boolean</td>
    <td>Controls the direction of playback.</td>
  </tr>
  <tr>
    <td>**Speed**</td>
    <td>Number</td>
    <td>A multiplier for the playback rate. `0.0` pauses the graph, `1.0` is normal speed, and `2.0` is double speed.</td>
  </tr>
  <tr>
    <td>**Trim**</td>
    <td>Boolean</td>
    <td>Toggles whether the clip's duration should be truncated.</td>
  </tr>
  <tr>
    <td>**TrimStart**</td>
    <td>Number</td>
    <td>The absolute timestamp (in seconds) where playback should begin.</td>
  </tr>
  <tr>
    <td>**TrimEnd**</td>
    <td>Number</td>
    <td>The absolute timestamp (in seconds) where playback should terminate.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** None. This is a leaf node with no children.
- **Event Emission:** Reads custom markers embedded in the animation clip (e.g., "Footstep", "WeaponSwing") and emits them as named events at the precise frame they occur. If the clip is trimmed, only markers within the defined `[TrimStart, TrimEnd]` interval (inclusive) are emitted.
</dd>
</dl>

### Select

<img src="../assets/animation/graph-editor/Select-Node.png" width="30%" alt="Select node" />

Selects between any number of inputs via the Selection property. Whenever the current selection changes, it triggers a new [transition](#transitions).

<dl>
<dt>**Inputs**</dt>
<dd>
- **Input1...InputN**
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
    <td>**Selection**</td>
    <td>String</td>
    <td>The unique ID of the input to be selected, matching the name of the input connection (e.g., "Walk").</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** Events from the currently selected input pass through with their weight unchanged.
- **Event Emission:** Passes through all events from the currently selected input only. During a transition, event emission follows [global event rules](#global-event-rules).
</dd>
</dl>

### PrioritySelect

<img src="../assets/animation/graph-editor/Priority-Select-Node.png" width="30%" alt="Priority Select node" />

Evaluates a list of connected inputs from top to bottom and plays the first one whose condition evaluates to true. This allows for hierarchical animation selection based on specific logic. Whenever the current selection changes, it triggers a new [transition](#transitions).

<dl>
<dt>**Inputs**</dt>
<dd>
- **Input1...InputN**
  - **Trigger** (Boolean): A logical condition that must be true for this input to activate. In current versions, this is wired to a boolean parameter.
  - **Interruptible** (`Enum.AnimationNodeInterruptible`): Defines the rule for when this active animation can be interrupted by a higher-priority input.
    - **Always (default)**: The input can be interrupted at any time by a higher-priority condition.
    - **Finished**: The current animation must complete its playback before a higher-priority input can take over.
    - **Trigger**: The input is only interruptible when the `InterruptibleTrigger` is set to true.
  - **InterruptibleTrigger** (Boolean): Only available if **Interruptible** is set to **Trigger**. The input can be interrupted when this specific expression is true.
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
    <td>DefaultInterruptible</td>
    <td>`Enum.AnimationNodeInterruptible`</td>
    <td>The baseline interruption rule applied to all inputs. Each input can override this with its own **Interruptible** input property.</td>
  </tr>
    <td>DefaultInterruptibleTrigger</td>
    <td>Boolean</td>
    <td>The baseline trigger value used when an input’s resolved **Interruptible** mode is **Trigger**. Each input can override this with its own **InterruptibleTrigger** input property. </td>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** Events from the currently selected input pass through with their weight unchanged.
- **Event Emission:** Passes through all events from the currently selected input only. During a transition, event emission follows [global event rules](#global-event-rules).
</dd>
</dl>

### Sequence

<img src="../assets/animation/graph-editor/Sequence-Node.png" width="30%" alt="Sequence node" />

Activates connected inputs in a specific sequential order based on defined wait conditions. Whenever the current selection changes, it triggers a new [transition](#transitions).

<dl>
<dt>**Inputs**</dt>
<dd>
- **Input1...InputN**
  - **WaitFor** (`Enum.AnimationNodeWaitFor`): Specifies the condition that must be met before the sequence advances to the next input.
    - **Finished (default)**: Advances to the next input when the current input completes a cycle. The advancement behavior depends on the connected input:
      - **Play-once clip**: Advances when the clip finishes.
      - **Looping clip**: Advances after one full loop completes.
      - **Sequence with infinite loops**: Advances after one full cycle through all inputs.
      - **Sequence with infinite loops**: Advances after all loops complete.
    - **Trigger**: Activates the next input when a custom logical expression evaluates to true.
  - **WaitForTrigger** (Boolean): Only available when `WaitFor` is set to `Trigger`.
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
    <td>**LoopCount**</td>
    <td>Number</td>
    <td>The number of times to cycle through the entire sequence (default is 1). A value of 0 indicates an infinite loop. Once the count is reached, the node respects the looping or hold setting of the final input.</td>
  </tr>
  <tr>
    <td>**DefaultWaitFor**</td>
    <td>`Enum.AnimationNodeWaitFor`</td>
    <td>The baseline wait condition applied to all inputs. Each input can override this with its own **WaitFor** input property. </td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** Events from the currently active input pass through with their weight unchanged.
- **Event Emission:** Passes through all events from the currently active input in the sequence only. During a transition, event emission follows [global event rules](#global-event-rules).
</dd>
</dl>

### RandomSequence

<img src="../assets/animation/graph-editor/Random-Sequence-Node.png" width="30%" alt="Random Sequence node" />

Selects and plays one of its connected inputs at random. When the currently selected animation completes, the node randomly picks another input to play. Assign each input a specific weight to influence the probability of it being chosen. Whenever the current selection changes, it triggers a new [transition](#transitions).

<dl>
<dt>**Inputs**</dt>
<dd>
- **Input1...InputN**
  - **Weight** (Number): Determines the probability of this input being selected; higher weights increase the chance of selection.
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
    <td>**PlayCount**</td>
    <td>Number</td>
    <td>The number of inputs the node will play through before stopping. Once reached, the node respects the looping or hold setting of the final input. Default is 0 for infinite</td>
  </tr>
  <tr>
    <td>**Seed**</td>
    <td>Number</td>
    <td>A value used to initialize the Random Number Generator (RNG), ensuring the sequence remains consistent across different clients. Defaults to -1 for random Seed.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** Events from the currently active input pass through with their weight unchanged.
- **Event Emission:** Passes through all events from the currently active input in the sequence only. During a transition, event emission follows [global event rules](#global-event-rules).
</dd>
</dl>

### Over

<img src="../assets/animation/graph-editor/Over-Node.png" width="30%" alt="Over node" />

Layers the **Over** pose on top of the Base pose. When combined with a Mask node, masked-out joints in the **Over** pose reveal the **Base** pose entirely, creating a transparent overlay effect.

<dl>
<dt>**Inputs**</dt>
<dd>
- **Base**: The background or bottom layer, typically a full-body animation like locomotion or an idle state.
- **Over**: The foreground or top layer to be applied over the base, such as a hand gesture or tool-use animation.
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
    <td>**Weight**</td>
    <td>Number</td>
    <td>The blend weight used to attenuate the **Over** pose. Defaults to `1.0` (full override) and is unclamped.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:**
  - The node listens for events from both the **Base** and **Over** inputs.
- **Event Emission:**
  - **Base Events**: All events from the Base input are passed through unmodified.
  - **Over Events**: Events from the Over input are scaled by the Weight property.
    - At Weight `0.5`, **Over** events propagate at half weight
    - At Weight `0`, they are silenced.
</dd>
</dl>

### Add

<img src="../assets/animation/graph-editor/Add-Node.png" width="30%" alt="Add node" />

Adds the **Additive** pose to the **Base** pose, attenuated by a specific **Weight** (unclamped).

<dl>
<dt>**Inputs**</dt>
<dd>
- **Base**: The primary animation pose.
- **Additive**: The pose to be layered onto the base.
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
    <td>**Weight**</td>
    <td>Number</td>
    <td>Determines the strength of the additive pose applied to the base.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for events from both the **Base** and **Additive** inputs.
- **Event Emission:** All events from both the Base and Additive inputs are passed through unmodified.
</dd>
</dl>

### Subtract

<img src="../assets/animation/graph-editor/Subtract-Node.png" width="30%" alt="Subtract node" />

Converts an animation into an additive pose by subtracting a relative base pose from the target pose ($A - B$). The result is attenuated by a specific **Weight** (unclamped).

<dl>
<dt>**Inputs**</dt>
<dd>
- **A**: The target animation pose.
- **B**: The relative base pose to be subtracted.
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
    <td>**Weight**</td>
    <td>Number</td>
    <td>Determines the strength of the subtraction effect applied to the result.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for events from both **Input A** and **Input B**.
- **Event Emission:** All events from both **Input A** and **Input B** are passed through unmodified.
</dd>
</dl>

### Blend1D

<img src="../assets/animation/graph-editor/Blend1D-Node.png" width="30%" alt="Blend1D node" />

Linearly interpolates between the two animation poses closest to the current input position on a single axis.

<dl>
<dt>**Inputs**</dt>
<dd>
- **Input1...InputN**
  - **Position** (Number): The specific coordinate for each subsequent input on the blend axis.
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
    <td>**Position**</td>
    <td>Number</td>
    <td>The current active value on the blend axis used to sample the animations. If **Position** is outside the range of defined input positions, the node extrapolates using the two nearest inputs.</td>
  </tr>
  <tr>
    <td>**PhaseSync**</td>
    <td>`Enum.AnimationNodePhaseSync`</td>
    <td>
    Configures whether the timing of children inputs should be synchronized.
    <ul>
      <li>**Synced (default)**: Normalized synchronization. The node calculates a "virtual duration" based on the weighted average of active inputs. Each input node’s time step is adjusted so that all children converge to the same phase, keeping animations of different lengths in lockstep. </li>
      <li>**Unsynced**: Standard blending where clips advance independently at their own playback rates.</li>
    </ul>
    </td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for events from all currently active child nodes.
- **Event Emission:** Only events from the highest-weight active input propagate, scaled by its blend weight. Events from the secondary input are silenced.
</dd>
</dl>

### Blend2D

<img src="../assets/animation/graph-editor/Blend2D-Node.png" width="30%" alt="Blend2D node" />

Blends multiple animation poses together based on two input parameters within a 2D coordinate space. This generalizes the Blend1D node to handle complex scenarios, such as blending based on both movement direction and speed simultaneously.

<dl>
<dt>**Inputs**</dt>
<dd>
- **Input1...InputN**
  - **X** (Number): The X-coordinate for each subsequent input.
  - **Y** (Number): The Y-coordinate for each subsequent input.
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
    <td>**InputMode**</td>
    <td>`Enum.AnimationNodeBlend2DInputMode`</td>
    <td>
    Defines the coordinate system used to evaluate the blendspace:
    <ul>
      <li>**Cartesian (default)**: Uses standard 2D grid coordinates. X and Y represent the current position within the blendspace.</li>
      <li>**Polar**: Uses angular and magnitude values. X represents the direction in radians, while Y represents the magnitude or strength of movement. Direction is weighted more heavily than magnitude, so inputs at similar angles but different magnitudes blend more smoothly than inputs at different angles.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>**X**</td>
    <td>Number</td>
    <td>The current X-coordinate (Cartesian) or Direction in radians (Polar).</td>
  </tr>
  <tr>
    <td>**Y**</td>
    <td>Number</td>
    <td>The current Y-coordinate (Cartesian) or Magnitude (Polar).</td>
  </tr>
  <tr>
    <td>**PhaseSync**</td>
    <td>`Enum.AnimationNodePhaseSync`</td>
    <td>
    Configures whether the timing of children inputs should be synchronized.
    <ul>
      <li>**Synced (default)**: Normalized synchronization. The node calculates a "virtual duration" based on the weighted average of active inputs. Each input node’s time step is adjusted so that all children converge to the same phase, keeping animations of different lengths in lockstep.</li>
      <li>**Unsynced**: Standard blending where clips advance independently at their own playback rates.</li>
    </ul>
    </td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for events from all currently active child nodes.
- **Event Emission:** Only events from the highest-weight active input propagate, scaled by its blend weight. Events from the secondary input are silenced.
</dd>
</dl>

### Mask

<img src="../assets/animation/graph-editor/Mask-Node.png" width="30%" alt="Mask node" />

Applies a predefined mask to the input Pose. A mask is defined by a weight per object (e.g. joint) in the rig hierarchy, allowing for precise control or "feathering" of the animation.

<dl>
<dt>**Inputs**</dt>
<dd>
- **Pose**: The animation pose to be masked.
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
    <td>**Mask**</td>
    <td>`Class.ObjectValue`</td>
    <td>
    An `Class.ObjectValue` (created as a direct child of the Mask `AnimationNodeDefinition`) that defines the mask weights. It can function in one of two ways:
    <ul>
      <li>**Directly**: The `Class.ObjectValue` itself contains attributes mapping rig object names to specific weight values.</li>
      <li>**By Reference**: The `Class.ObjectValue` references another `Class.Instance` that contains the mapping attributes. This allows for shared masks across different nodes in the graph.</li>
    </ul>
    When creating a mask, you can choose a rig schema (`Class.HumanoidRigDescription` or **Picker**) to populate the hierarchy.
    <ul>
      <li>`Class.HumanoidRigDescription`: Standardizes the mask for humanoid characters.</li>
      <li>**Picker**: Allows the user to select any specific rig in the workspace to populate the mask hierarchy.</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td>**Invert**</td>
    <td>Boolean</td>
    <td>When true, applies weight values as 1 - weight. This allows for reusing a mask inversely without creating a new asset.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for all events from the input **Pose**.
- **Event Emission:** All events from the input **Pose** are passed through unmodified.
</dd>
</dl>

### Speed

<img src="../assets/animation/graph-editor/Speed-Node.png" width="30%" alt="Speed node" />

Modifies the playback rate of an incoming animation pose.

<dl>
<dt>**Inputs**</dt>
<dd>
- **Pose**: The animation pose or subgraph whose playback speed will be modified.
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
    <td>**Speed**</td>
    <td>Number</td>
    <td>A multiplier applied to the time delta ($dt$). `0.0` pauses the graph, `1.0` is normal speed, and `2.0` is double speed.</td>
  </tr>
</tbody></table>

</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for events from the input **Pose**.
- **Event Emission:** All events from the input **Pose** are passed through unmodified. Note that while the visual playback speed changes, the timing of emitted events (such as markers) will scale accordingly with the modified playback rate.
</dd>
</dl>

### GraphOutput

<img src="../assets/animation/graph-editor/Graph-Output-Node.png" width="30%" alt="GraphOutput node" />

Represents the final evaluated pose of the graph. This node is automatically included in all new graphs in the Animation Graph Editor. Its presence ensures that the graph is always valid and consistently produces an animation pose.

<dl>
<dt>**Inputs**</dt>
<dd>
- **Pose**: The final processed animation data to be applied to the rig.
</dd>
<dt>**Properties**</dt>
<dd>
- None
</dd>
<dt>**Event data**</dt>
<dd>
- **Event Handling:** The node listens for all events passed through the final connected input.
- **Event Emission:** This node serves as the exit point for the animation pipeline and does not emit signals back into the graph.
</dd>
</dl>

## Transitions

Several nodes in the Animation Graph (such as **Select**, **Priority Select**, **Sequence**, and **Random Sequence**) manage how animations blend when switching between active inputs. To prevent redundancy in the node reference, these behaviors are defined by standardized transition property groups.

### Default transition

<img src="../assets/animation/graph-editor/Transition-Default.png" width="60%" alt="Default Transition" />

The baseline blending behavior applied to the node whenever it switches to a new active input.

- **DefaultTransitionDuration** (number): The time (in seconds) it takes to fully blend into the new pose.
- **DefaultTransitionCurve** (`Enum.PoseEasingStyle`): The easing function applied during the blend. Currently only supports `Enum.PoseEasingStyle.Linear` and `Enum.PoseEasingStyle.CubicV2`.

### Transition override

<img src="../assets/animation/graph-editor/Transition-Override.png" width="60%" alt="Transition Override" />

Input-specific link properties that supersede the default transition. These are applied when the node transitions **to** that specific input.

- **TransitionOverrideDuration** (number): Overrides the default transition duration.
- **TransitionOverrideCurve** (`Enum.PoseEasingStyle`): Overrides the default transition curve. Currently only supports `Enum.PoseEasingStyle.Linear` and `Enum.PoseEasingStyle.CubicV2`

## Replication

Animation graph parameters are local to each `Class.AnimationTrack` and are not automatically replicated. This may change in future updates, but the currently recommended approach uses:

- **Client → Server**: A `Class.RemoteEvent` to send parameters from the owning client to the server at a fixed tick rate.
- **Server → Other Clients**: Instance **attributes** which automatically replicate to all clients.

### Player characters

A client script drives player characters. Since only the owning client knows the current gameplay state (movement input, humanoid state, etc.), parameters must flow from the owning client to the server and then to all other clients.

<h4>Setup</h4>

Under `Class.StarterCharacterScripts`, create:

- A `Class.LocalScript` for client-side animation and parameter driving.
- A `Class.Script` for server-side replication.
- A `Class.RemoteEvent` for client-to-server communication.

<h4>Client script</h4>

The owning client drives parameters from gameplay events and sends them to the server periodically. Other clients read replicated attributes from the server script instead.

```lua
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local character = script.Parent
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:FindFirstChildOfClass("Animator") or humanoid

-- Load the animation graph
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://YOUR_GRAPH_ID" -- Replace with your published graph ID
local track = animator:LoadAnimation(animation)
track:Play()

local isLocalCharacter = Players:GetPlayerFromCharacter(character) == Players.LocalPlayer

if not isLocalCharacter then
    -- Read replicated parameters from the server script
    local animateServer = script.Parent:WaitForChild("AnimateServer")

    for attribute, value in animateServer:GetAttributes() do
        track:SetParameter(attribute, value)
    end

    animateServer.AttributeChanged:Connect(function(attribute)
        track:SetParameter(attribute, animateServer:GetAttribute(attribute))
    end)
    return
end

-- Local player: drive parameters from gameplay
local params = {}

local function setParam(key, value)
    track:SetParameter(key, value)
    params[key] = value
end

-- Example: drive parameters from humanoid state
humanoid.Running:Connect(function(speed)
    setParam("Speed", speed)
    setParam("State", if speed < 0.1 then "Idle" else "Moving")
end)

-- Send parameters to the server at a fixed tick rate
local replicateEvent = script.Parent:WaitForChild("ReplicateEvent")
local TICK_RATE = 1 / 20
local lastSendTime = 0

RunService.Stepped:Connect(function(gameTime)
    if gameTime - lastSendTime > TICK_RATE then
        lastSendTime = gameTime
        replicateEvent:FireServer(params)
    end
end)
```

<h4>Server script</h4>

Receives parameters from the owning client, drives the server-side animation graph, and propagates values as attributes for replication to other clients.

```lua
local Players = game:GetService("Players")

local character = script.Parent
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:FindFirstChildOfClass("Animator") or humanoid

-- Load the same animation graph on the server
local animation = Instance.new("Animation")
animation.AnimationId = "rbxassetid://YOUR_GRAPH_ID" -- Same graph ID as client
animation.Parent = script
local track = animator:LoadAnimation(animation)
track:Play()

-- Receive parameters from owning client and replicate via attributes
local replicateEvent = script.Parent:WaitForChild("ReplicateEvent")

replicateEvent.OnServerEvent:Connect(function(player, params)
    if Players:GetPlayerFromCharacter(character) ~= player then
        return
    end

    for key, value in params do
        track:SetParameter(key, value)
        script:SetAttribute(key, value)
    end
end)
```

### NPCs

Since the server owns NPC animation, only server-to-client replication is needed. Drive the animation graph on the server, write parameters as attributes on a server Script, and read them on clients using the same `Class.Instance.AttributeChanged` pattern shown above.

### Latency

Other clients see animations with a small delay equal to the tick interval (up to 50 ms at 20 Hz) plus network latency. You can reduce the tick interval by increasing the frequency (such as 1/30), at the cost of higher network traffic. 20 Hz is a reasonable default; animation blending is forgiving enough that small delays are hard to notice.
