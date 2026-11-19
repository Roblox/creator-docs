---
title: Convert games from R6 Only to R15 Only
description: Learn how to change Avatar Settings from R6 Only to R15 Only, and update scripts, animations, tools, and gameplay that assume an R6 player rig.
---

Users join games with their [player characters](index.md#player-characters) that they control to play the game. While some game developers create custom player characters from scratch that match their game design aesthetics, many choose to allow players to keep their [platform avatar](../avatar/index.md) as their player character, either with an R6 or R15 rig:

- **R6 rigs** have six body parts and five poseable joints for character movement.
- **R15 rigs** have at least 15 body parts and 15 main joints to support a wider range of body proportions, accessories, and animations.

Player characters with R6 rigs are a fundamental pillar of platform history and define many of Roblox's most iconic games. However, player characters with at least [standard R15 rigs](../avatar/character-bodies/specifications.md#standard-r15-rigs) provide capabilities that the R6 rig cannot, such as deeper customization, expressive movement, and compatibility with modern engine features.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/animation/importing-custom-3d-rigs/Birdcaller-Imported.jpeg" width="70%"  />
    <figcaption>Player character</figcaption>
  </figure>
  <figure>
    <img src="../assets/animation/importing-custom-3d-rigs/Rig-Hierarchy-Birdcaller-Blender-Bones.png" width="70%" />
    <figcaption>R15 joint structure (Blender)</figcaption>
  </figure>
</GridContainer>

While new games default to only allowing players with R15 rigs, converting live games to only support R15 rigs can be a complex undertaking considering how many scripts, animations, tools, and gameplay features assume players can use R6 rigs. A successful transition preserves the core identity while modernizing the underlying character technology.

The following guidelines can help your team through the conversion process, covering auditing R6-specific assumptions, converting essential animations, validating gameplay geometry, and monitoring the rollout.

<Alert severity = 'info'>
Every Roblox game is built differently. These steps serve as a foundation for conversion and may not cover every unique technical requirement of your conversion.
</Alert>

## Why convert games to R15?

- **Avatar customization** - Games that allow R15 rigs let players join the game with their avatar as-is from the Marketplace, which requires all bodies to include at least standard R15 rigs. R15 supports a broader range of body types, customizations, accessories, and modern animation systems.
- **Expressive movement** - The additional joints that R15 rigs offer can enable detailed animations, emotes, combat moves, and movement, while better supporting motion capture.
- **Ecosystem growth** - As Roblox continues to expand the capabilities for the platform, R15 rigs enable creators to take advantage of that new tech moving forward.
- **Monetization** - Setting a game to **R15 Only** in [Avatar Settings](../studio/avatar-settings.md) is one of the qualifiers for the increased [U.S. 18+ DevEx rate](../production/monetization/18-plus-devex-rate.md#player-characters).

## Conversion process

The conversion process steps below are designed to help your team move carefully, catch issues early, and keep the experience feeling familiar to players. You may be able to combine some steps, but it is helpful to work through all of them before launch. It's recommended that you and your team:

1. [Prepare for the conversion](#prepare-for-the-conversion)
2. [Audit R6-specific scripts](#audit-r6-specific-scripts)
3. [Rebuild or convert animations](#rebuild-or-convert-animations)
4. [Update tools, weapons, and accessories](#update-tools-weapons-and-accessories)
5. [Rework hit detection and gameplay geometry](#rework-hit-detection-and-gameplay-geometry)
6. <Chip label="OPTIONAL" size="small" variant="outlined" /> [Review non-player characters](#review-non-player-characters)
7. <Chip label="OPTIONAL" size="small" variant="outlined" /> [Review camera and presentation](#review-camera-and-presentation)
8. [Test performance and device coverage](#test-performance-and-device-coverage)
9. [Run a staged rollout](#run-a-staged-rollout)

### Prepare for the conversion

Before you begin, it's important to estimate the scope of the conversion so you can plan resourcing:

- **Simple conversion** - The game uses default animations, has no custom NPCs that require a specific rig, and does not reference body parts directly in scripts.
- **Moderate conversion** - The game has some scripts that reference R6 parts, a few custom NPCs, some custom animations, and objects welded to specific body parts.
- **Complex conversion** - The game has extensive body part scripting, a custom ragdoll system, a full custom animation set, many R6 NPCs, or limb-specific hit detection.

Once you have determined the scale of your conversion, establishing early testing benchmarks is key. Testing with a few representative avatars can save a lot of rework later, especially around level geometry and character interactions. This gives the team a reliable reference model for spotting differences in proportions, joints, attachments, and movement early.

It's recommended to insert a [standard R15 rig](../avatar/resources.md#standard-r15-rigs) in Studio and use it as the reference for development. Test with more than one body shape and a range of avatar proportions if your game will allow player choice.

<Alert severity = 'warning'>
Don't assume that a character with an R15 rig has the same dimensions as a character with an R6 rig. You can read more about how differences in geometry, interaction reach, and camera alignment are critical factors throughout the subsequent conversion steps.
</Alert>

### Audit R6-specific scripts

Many conversion issues come from code that assumes users are playing games using player characters with R6 body parts or proportions, so finding these scripts early helps prevent broken interactions, errors, and inconsistent gameplay.

Search your codebase for assumptions about R6 part names, six-part geometry, or R6-only `Class.Humanoid` properties. When updating references from R6 to R15, remember that one R6 body part may correspond to several R15 [body parts](../avatar/character-bodies/specifications.md#body-parts). In cases like these, choose the R15 part that matches the code's purpose.

<Alert severity = 'info'>
You can use [Find All / Replace All](../studio/script-editor.md#find-and-replace) in the Script Editor to find all applicable R6 references.
</Alert>

#### Body part mappings

<table>
<thead>
  <tr>
    <th>R6 part</th>
    <th>R15 parts</th>
    <th>What to update</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Torso`</td>
    <td>`UpperTorso` and `LowerTorso`</td>
    <td>Map chest attachments to `UpperTorso`, and waist attachments and the `Root` joint to `LowerTorso`.</td>
  </tr>
  <tr>
    <td>`Right Arm`</td>
    <td>`RightUpperArm`, `RightLowerArm`, and `RightHand`</td>
    <td>Map shoulder attachments to `RightUpperArm`, wrist attachments to `RightLowerArm`, and tool grips to `RightHand`.</td>
  </tr>
  <tr>
    <td>`Left Arm`</td>
    <td>`LeftUpperArm`, `LeftLowerArm`, and `LeftHand`</td>
    <td>Map shoulder attachments to `LeftUpperArm`, wrist attachments to `LeftLowerArm`, and tool grips to `LeftHand`.</td>
  </tr>
  <tr>
    <td>`Right Leg`</td>
    <td>`RightUpperLeg`, `RightLowerLeg`, and `RightFoot`</td>
    <td>Map upper leg attachments to `RightUpperLeg`, lower leg attachments to `RightLowerLeg`, and foot attachments to `RightFoot`.</td>
  </tr>
  <tr>
    <td>`Left Leg`</td>
    <td>`LeftUpperLeg`, `LeftLowerLeg`, and `LeftFoot`</td>
    <td>Map upper leg attachments to `LeftUpperLeg`, lower leg attachments to `LeftLowerLeg`, and foot attachments to `LeftFoot`.</td>
  </tr>
</tbody>
</table>

`Head` and `HumanoidRootPart` keep the same names on both rigs.

#### Motor6D joint changes

For this step of the conversion process, you need to update the joint name and the part that parents the `Class.Motor6D`. Scripts that read `Torso.Neck`, `Torso["Right Shoulder"]`, or `HumanoidRootPart.RootJoint` still break after a rename because R15 parents those joints to different parts.

`Neck` keeps its name and moves from `Torso` to `Head`. `Right Shoulder`, `Left Shoulder`, `Right Hip`, and `Left Hip` move from `Torso` to the upper arm and upper leg parts, and the R15 names omit the space.

<table>
<thead>
  <tr>
    <th>R6 joint</th>
    <th>R6 parent part</th>
    <th>R15 joint</th>
    <th>R15 parent part</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`RootJoint`</td>
    <td>`HumanoidRootPart`</td>
    <td>`Root`</td>
    <td>`LowerTorso`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`Waist`</td>
    <td>`UpperTorso`</td>
  </tr>
  <tr>
    <td>`Neck`</td>
    <td>`Torso`</td>
    <td>`Neck`</td>
    <td>`Head`</td>
  </tr>
  <tr>
    <td>`Right Shoulder`</td>
    <td>`Torso`</td>
    <td>`RightShoulder`</td>
    <td>`RightUpperArm`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`RightElbow`</td>
    <td>`RightLowerArm`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`RightWrist`</td>
    <td>`RightHand`</td>
  </tr>
  <tr>
    <td>`Left Shoulder`</td>
    <td>`Torso`</td>
    <td>`LeftShoulder`</td>
    <td>`LeftUpperArm`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`LeftElbow`</td>
    <td>`LeftLowerArm`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`LeftWrist`</td>
    <td>`LeftHand`</td>
  </tr>
  <tr>
    <td>`Right Hip`</td>
    <td>`Torso`</td>
    <td>`RightHip`</td>
    <td>`RightUpperLeg`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`RightKnee`</td>
    <td>`RightLowerLeg`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`RightAnkle`</td>
    <td>`RightFoot`</td>
  </tr>
  <tr>
    <td>`Left Hip`</td>
    <td>`Torso`</td>
    <td>`LeftHip`</td>
    <td>`LeftUpperLeg`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`LeftKnee`</td>
    <td>`LeftLowerLeg`</td>
  </tr>
  <tr>
    <td>None</td>
    <td>None</td>
    <td>`LeftAnkle`</td>
    <td>`LeftFoot`</td>
  </tr>
</tbody>
</table>

Ragdoll and procedural-animation code that manipulates joints by R6 name needs rework for the additional R15 joints.

Prefer capability-based code over rig-name assumptions. For example, use a shared attachment, tagged hitbox, or configured reference object when possible instead of assuming that a weapon belongs on a particular R6 limb.

If [Avatar Settings](../studio/avatar-settings.md) is **R15 and R6**, or if an NPC uses a different rig from the player character, branch explicitly using `Class.Humanoid.RigType` and keep the R6 and R15 implementations isolated enough to test independently.

### Rebuild or convert animations

Rebuilding or converting animations from R6 rigs to R15 rigs helps characters continue to feel responsive and natural with their new joint structure. In addition, to qualify for the [U.S. 18+ DevEx rate](../production/monetization/18-plus-devex-rate.md#player-characters), animations require elbow and knee bends; R6 animation packs on an R15 rig do not qualify.

R6 animations may not always transfer smoothly to R15, so it's recommended to evaluate them individually to ensure they maintain their intended look and feel. Since animations are tied directly to a rig's [body part](../avatar/character-bodies/index.md#body-parts) and [joint hierarchy](../avatar/character-bodies/index.md#rigging-armature), you should evaluate or re-author key animations directly on an R15 rig.

Prioritize the following:

- Idle, walk, run, jump, fall, climb, swim, and land cycles
- Combat attacks and reactions
- Tool and weapon animations
- Emotes and social animations
- Cutscene animations
- NPC animation sets
- Animation blending and priority

Author and preview animations with the [Animation Editor](../tutorials/use-case-tutorials/animation/create-an-animation.md) on a [standard R15 rig](../avatar/character-bodies/specifications.md#standard-r15-rigs), then publish the new animation assets. To test an animation across rigs, review joint mappings, and set the rig's T-pose before playback, use [Adaptive Animation](./adaptive-animation.md). Remember to validate animations from several camera angles and with different body proportions. Shoulder, hip, and neck joints can differ by 90 degrees between rigs. Confirm that limbs do not twist, feet stay planted, and the head and neck track correctly.

### Update tools, weapons, and accessories

<h4 style={{marginBottom: 12}}>Tools</h4>

When updating tools for R15, it's important to focus on hand placement and grip alignment:

- Reposition each tool so it sits correctly in the character's hand.
- Check that the tool's grip aligns with the `RightHand` or `LeftHand` instead of the R6 arm.
- Update any welds, constraints, or `Class.Motor6D` references that point to R6 limbs.
- Retest tools during different animations to catch shifting, clipping, or incorrect rotations.
- Verify any UI that displays equipped tools, character slots, or body locations.

<h4 style={{marginBottom: 12}}>Weapons</h4>

Weapons require the following additional checks because their grips, effects, and launch points often depend on precise hand and body positions:

- Reposition weapon grips for the dedicated R15 hand parts.
- Check hand placement while the character is idle, walking, running, jumping, and attacking.
- Update welds, constraints, and `Class.Motor6D` references for the new R15 body structure.
- Reposition VFX emitters and particle origins so effects appear at the correct location.
- Update trails, beams, muzzle flashes, and projectile launch points.
- Retest projectiles and other effects during animations to make sure they originate from the correct attachment or joint.
- Verify any equipment UI that displays weapon slots or body locations.

<h4 style={{marginBottom: 12}}>Accessories</h4>

Characters with R6 and R15 rigs use different attachment locations. On R6, many accessories attach to the single `Torso`. On R15, those attachment points are distributed across multiple body parts. With this in mind, review the following:

- `NeckAttachment`, collar attachments, and front or back body attachments move to `UpperTorso`.
- Waist attachments move to `LowerTorso`.
- `ShoulderAttachment` is located on the appropriate upper arm.
- `GripAttachment` moves to the dedicated hand part, which does not exist on R6.
- Head attachments, including `HatAttachment`, `HairAttachment`, and `FaceFrontAttachment`, stay on `Head`.
- Check shoulder, waist, back, and head accessories for correct placement.
- Reposition and retest custom clothing and layered accessories.
- Test accessories on different bodies and animations and look for clipping or fit problems.

Whenever possible, attach items through their `Class.Accessory` and `Class.Attachment` objects instead of using manual welds. This allows the engine to handle much of the rig-specific attachment behavior automatically.

Layered accessories must be weighted and bound to an R15 rig, and require an inner cage and an outer cage. For more information, see [Layered accessory specifications](../avatar/layered-accessories/specifications.md#rigging-and-skinning).

### Rework hit detection and gameplay geometry

Character proportions change reach, cover, collision, targeting, and attack distance even when the underlying code stays the same. Retest systems that depend on body position or size to keep gameplay fair and consistent, such as:

- Melee hitboxes
- Projectile targeting
- Raycasts and line-of-sight checks
- Area-of-effect abilities
- Aim offsets and camera-relative targeting
- Interaction prompts
- Touch and overlap events
- Animation-driven damage windows
- Competitive movement and cover

Use gameplay colliders designed for the mechanic so hit detection does not follow the visible mesh. Reach and collision then stay stable when avatar proportions change. You can use the **Consistent Gameplay** preset in [Avatar Settings](../studio/avatar-settings.md#general) to set every avatar to the same height and the same box collider.

### Review non-player characters

Reviewing NPC rigs lets you make sure the entire character ecosystem moves forward together. NPCs often use their own scripts, animations, and rig templates, so checking them now helps avoid broken behavior or a visually inconsistent world later.

Converting NPCs is often optional. The rig type setting in [Avatar Settings](../studio/avatar-settings.md) governs player avatars, not NPCs, so NPCs with R6 rigs keep loading and animating normally alongside player characters with R15 rigs. You typically only need to convert an NPC when the same rig-specific code, such as shared hit detection, welding, or ragdoll systems, processes both NPCs and players. Leaving NPCs with R6 rigs also does not affect the [U.S. 18+ DevEx rate](../production/monetization/18-plus-devex-rate.md#player-characters), which depends on the game's avatar type setting rather than individual NPC rigs.

For each NPC type you do convert, check:

- Rig structure and body part references
- Animation playback
- Pathfinding and movement
- Spawn and despawn behavior
- Target selection and distance checks
- Hit detection
- Death, ragdoll, and respawn behavior
- Replication and network ownership

Playtest NPCs in Studio, and use the [Animation Editor](../tutorials/use-case-tutorials/animation/create-an-animation.md) to review movement, combat, death, and emote animations. Reusable NPC rigs and test scenes make repeated checks faster.

### Review camera and presentation

Reviewing camera and presentation helps preserve the feeling players already know and enjoy. Even when a character works technically, R15 rigs change their height, proportions, and motion, and changes to viewpoint, framing, or animation can make the game feel slower, cramped, disorienting, or simply unlike the original.

For this reason, it's important to consider the following:

- Camera subject and offset
- First-person arms or body visibility
- Shoulder camera framing
- Head bob and camera shake
- Cutscene composition
- UI markers above the character
- Nameplates and health bars
- Cinematic animation timing

Use Studio's playtesting modes and the [Device Simulator](../studio/testing-modes.md#device-simulation) to review camera framing, UI placement, and controls across screen sizes and device types.

### Test performance and device coverage

Testing performance on a wide variety of devices helps make sure the update works well for as many players as possible. Testing across devices can reveal crashes or frame rate problems and help you separate R15 rig-related issues from changes in new assets, welds, animations, or scripts.

It's important to test on the lowest-end devices and network conditions your players use. Run the same scenarios with Avatar Settings set to **R6 Only**, then to **R15 Only**. Compare those results before you attribute a change to the rig. New welds, effects, scripts, and asset loading can change the numbers on their own.

Measure:

- Frame rate and frame-time spikes
- Memory usage
- Client and server CPU time
- Join time and character spawn time
- Crash rate
- Animation or physics errors
- Network replication
- Battery or thermal impact, when that data is available

Use the [Developer Console](../studio/developer-console.md) to review memory, networking, and script activity. Use the [MicroProfiler](../performance-optimization/microprofiler/use-microprofiler.md) when you need a closer look at frame time or CPU cost.

### Run a staged rollout

Running a staged rollout gives your team room to learn and make improvements before the update reaches everyone. In addition, it makes it easier to compare metrics, fix issues, gather feedback, and confirm that the R15 version still delivers what players value most.

A safer rollout can include:

- Internal testing with representative devices and avatars
- A private test place or limited-access release
- A small percentage rollout or a controlled audience
- In-game feedback collection
- Monitoring of gameplay, crashes, performance, retention, and sentiment

Keep analytics able to distinguish this conversion from unrelated updates.

## Common mistakes to avoid

<h4 style={{marginBottom: 12}}>Replacing `Torso` with `UpperTorso` everywhere without reviewing gameplay geometry</h4>

R15 rigs split the R6 rig's torso into `UpperTorso` and `LowerTorso`, change dimensions and attachment points, and use different hip and shoulder relationships. A direct rename can break raycasts, hitboxes, welds, offsets, seating, camera framing, and spatial gameplay.

**Instead**: Audit each use of `Torso`, decide whether it should reference `UpperTorso`, `LowerTorso`, the character root, or an attachment, and revalidate all geometry-dependent offsets.

<h4 style={{marginBottom: 12}}>Hard-coding limb names in new systems</h4>

Characters with R6 and R15 rigs use different part hierarchies and names, so systems for damage, IK, animation, accessories, interaction, or procedural movement may fail or target the wrong body part.

**Instead**: Use `Class.Humanoid` and `Class.Attachment` references, or create a rig abstraction layer that maps logical body regions to the active rig.

<h4 style={{marginBottom: 12}}>Ignoring NPCs, tools, VFX, and cutscenes</h4>

A player avatar conversion does not automatically update non-player characters or content attached to the old R6 hierarchy. Tool grips, effect emitters, scripted joints, camera beats, and authored cutscenes can be visibly or functionally misaligned on characters with R15 rigs.

**Instead**: Inventory every character-driven asset and test players, NPCs, equipped tools, effects, scripted joints, and cinematic sequences against representative R15 rigs before release.

<h4 style={{marginBottom: 12}}>Testing only with one avatar body type</h4>

R15 supports varied proportions, so a pose or mechanic that works on one body can cause foot sliding, limb intersections, shoulder or hip offsets, camera clipping, or incorrect interaction distances on another.

**Instead**: Build a validation matrix covering multiple R15 body types, scales, and proportions, and include extreme cases in automated or repeatable checks.

<h4 style={{marginBottom: 12}}>Publishing the conversion with unrelated gameplay changes</h4>

When migration and feature changes ship together, regressions become difficult to isolate and diagnose.

**Instead**: Use a staged migration: first establish R15 compatibility behind a flag or test place, validate the converted systems, then ship unrelated gameplay changes separately.
