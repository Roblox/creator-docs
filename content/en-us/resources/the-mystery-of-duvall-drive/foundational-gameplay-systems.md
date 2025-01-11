---
title: Foundational Gameplay Systems
comments:
next: /resources/the-mystery-of-duvall-drive/supporting-systems
prev: /resources/the-mystery-of-duvall-drive/main-design-requirements
description: Explains the gameplay design used in The Mystery of Duvall Drive.
---

The following systems were the foundation in establishing the gameplay we wanted for [The Mystery of Duvall Drive](https://www.roblox.com/games/7902470429/The-Mystery-of-Duvall-Drive).

## GameStateManager

The **GameStateManager**/**GameStateClient** is probably the most complicated system in the experience, as it deals with:

- Starting players within the lobby, starting the countdown to teleporting the group to the main gameplay area, and teleporting players to reserved servers.
- Cloning corrupt rooms, async streaming them, and teleporting players to and from a specific assigned `Datatype.CFrame` coordinate.
- Grabbing and placing seals mechanics.
- Locking and unlocking doors.
- Initializing the final teleport to the foyer and playing the finishing cutscene.

We implemented it as a simple state machine (Update function), and the states are in **DemoConfig** (GameStates enum). Some states deal with initial lobby/reserved server teleport, while others deal with finding a mission, triggering the puzzle, and solving the mission. Note that apart from seals, we tried to not have mission-specific code in the **GameStateManager**.

GameStates is mostly server-side, but when the client needs to do something, such as show countdown, lore, or disable streaming pause UI, server and client (GameStatesClient) communicate via a remote event called `GameStateEvent`. As with most cases, the event payload has event "type" (Config.GameEvents) as the first parameter, and event specific data after that.

### Teleportation Game States

There is a group of 3 game states that run three unique cutscenes that hide the teleportation to the corrupt room: Warmup, InFlight, and Cooldown. **Warmup** runs for the whole duration and ends with an almost black screen in which the 3D world is no longer visible. During this time, we clone the room, get desired player positions in the corrupt room for each player, call `Class.Player.RequestStreamAroundAsync`, and transport players to a specific assigned `Datatype.CFrame` coordinate within the corrupt room. This type of teleportation might trigger a streaming pause. When a streaming pause occurs, the client displays a warning message. We disabled this default UI to keep the experience immersive.

<Alert severity="info">
Players cannot transport to a specific assigned `Datatype.CFrame` while they are sitting, so the server sends a message to the client to "unseat" players before the teleport, as well as disable the seating state while the teleportation is in progress.
</Alert>

While streaming is being handled, **InFlight** runs, keeping a slightly pulsing dark screen. When both `Class.Player.RequestStreamAroundAsync` returns and clients inform the server that streaming pause is off and each player is close enough to the desired location, we cancel the InFlight cutscene, and start the Cooldown cutscene. The goal of **Cooldown** is to make the 3D world visible again by smoothly removing the dark screen. If `Class.Player.RequestStreamAroundAsync` takes too long to return, or the client doesn't report that the streaming pause is off, we still proceed to the Cooldown cutscene after a timeout of several seconds.

A similar set of Warmup, InFlight, and Cooldown cutscenes occur when we teleport the player back to the normal state of the room, **TeleportWarmupBack**, **TeleportInFlightBack**, and **TeleportCooldownBack**, and at the end of the experience, we also run **TeleportWarmupFinal**, **TeleportInFlightFinal**, and **TeleportCooldownFinal** to teleport players into the foyer for the finishing cutscene.

### Lighting and Atmosphere Game States

We knew that we wanted each room's normal and corrupt state to have a different visual appearance so it could give players clear visual feedback that they were in a completely different location. Game states allowed us to change the lighting and atmosphere properties for normal and corrupt rooms, in which the GameStateManager selected which instances to use based on if players are teleporting from the normal to the corrupt state of the room (`TeleportWarmup`), or vice versa (`TeleportWarmupBack`). Events playing during the teleport make the whole screen either dark or white, so we decided to change the `Class.Lighting` and `Class.Atmosphere` instances at those moments to hide the process from players. To make it simple to change, **DemoConfig** includes maps that define what instances under these services need to change.

### Locking Doors Game States

We wanted to be able to keep players in certain rooms while they finished missions, so we created game states to lock doors: `InMission` and `CanGetSeal`. `InMission` locks players in their active mission room, and `CanGetSeal` keeps the mission room's door locked until they pick up the "restored" seal. We mostly used this to have the doors lock when players return from a mission so that they have an incentive to pick up the seal. After they pick up the seal, doors unlock so they can place it within the seal's location in the foyer. The last mission is unique to this typical process, as the door to the room with its seal is locked until players solve every other puzzle (`EnableRegularMissionDoors`, `EnableOneMissionDoors` functions).

## EventManager

**EventManager** allowed us to run "actions" over time by using keyframes, such as:

- Interpolating instance properties and attributes.
- Running scripts.
- Playing audio.
- Running camera shakes.

We'd ideally use a tool with track-based UI, but for this demo, we typed the keys and property names manually. The **EventManager** system consists of several scripts and an event/function, including:

- `EventManager` - Overall logic for creating and stopping events, as well as server-side actions.
- `EventManagerClient` - Client-side actions.
- `EventManagerModule` - Common code for both server and client-side actions.
- `EventManagerConfig` - Small file with a few command declarations.
- `EventManagerDemo` - Where all actual events for this demo are defined in game-specific script.
- `EventManagerEvent`, `EventManagerFunc` - Remote event and bindable function to run and stop events from the client or server. This is how other systems can set up, run, and stop events.

Each event has a name, a section with optional information about cooldown, function to run on start or end, event parameters, and sections with interpolants (interpolating any number of properties or attributes over time), scripts (running registered scripts at keyframes), camera shakes, and playing audio.

### Interpolation

Interpolation lets object properties and attributes seamlessly change from one value to another instead of disjointedly jumping between keyframes. We defined interpolants to change a variety of visual effects; for example, the following code snippet shows how we interpolated the `Class.TextLabel.TextTransparency` property on an object defined by `Class.TextLabel` parameter from a value of `1` at the start to `0`, then later back to `1` again:

```lua
interpolants = {
	objectParam = "TextLabel",
      property = "TextTransparency",
      keys = {
		{value = 1},
	      {time = .5, value = 0},
		{time = 2.25, value = 0},
	      {time = 3, value = 1}
      }
}
```

<video src="../../assets/resources/mystery-of-duvall-drive/technical-overview/interpolation.mp4" controls width="100%"></video>

While we could define which object property or attribute belongs to what like in the following code sample, we wanted to be able to re-use the same events on different "groups of objects" to allow it to work with streaming on the client, and with objects created at run time.

```lua
object = workspace.SomeFolder.SomeModel
```

To accomplish this, we allowed referencing by object name and passing named parameters on event start. To find named objects, we allowed specifying a "root" for the event, which let objects to be found by name under this root when the event started. For example, in the following code snippet, the **EventManager** tries to find an object named "Wander" somewhere under `workspace.Content.Interior.Foyer["Ritual-DemoVersion"]`.

```lua
params = {
	["RootObject"] = workspace.Content.Interior.Foyer["Ritual-DemoVersion"],
},
interpolants = {
      objectName = "Wander",
      attribute = "TimeScale",
      keys = {
            {value = 0.2}
      }
}
```

We allowed passing parameters into events in the params section, and the scripts running on event start could either change existing parameters, or add more parameters into the "param" table. In the following example, we have `isEnabled` parameter with a default value of false, and the "Enabled" property on an object with the name **FocuserGlow** will be set to the value of `isEnabled`. A script running on event start or a script invoking the event can set isEnabled, so we could use the same event description for both enabling and disabling FocuserGlow.

```lua
params = {
	isEnabled = false
},
interpolants = {
	{
            objectName = "FocuserGlow",
            property = "Enabled",
            keys = {
                   {valueParam = "isEnabled"}
      }
}
```

Parameters allowed us to refer to objects that do not even exist in the beginning of the experience. For example, in the following code sample a function running on event start will create an object, and set BlackScreenObject entry in the params to point to the created object.

```lua
{objectParam = "BlackScreenObject",
	property = "BackgroundTransparency",
	keys = {
		{value = 0},
		{time = 19, value = 0},
		{value = 1},
	}}
```

### Running Events, Event Instances, and Connecting to Triggers

To run an event, we would either use a remote event from clients, or a function from the server. In the following example, we passed a couple of parameters to the `RootObject` and `isEnabled` events. Internally, an instance of the event description was created, params resolved to actual objects, and the function returned an id for the event instance.

```lua
 local params = {
	RootObject = workspace.Content.Interior.Foyer["Ritual-DemoVersion"]["SealDropoff_" .. missionName],
	isEnabled = enabled
}
local eventId = eventManagerFunc:Invoke("Run", {eventName = "Ritual_Init_Dropoff", eventParams = params} )
```

We could stop running an event by calling function with "Stop":

```lua
eventManagerFunc:Invoke("Stop", {eventInstId = cooldownId} )
```

Interpolants or other actions that are "cosmetic" (do not change simulation for all players) could be run on clients, which could result in smoother interpolation. In the event description, we could provide a default value for all actions as onServer = true (without it, default is client). Each action can overwrite it by setting its own onServer.

To easily connect running an event to a trigger, we used helper functions `ConnectTriggerToEvent` or `ConnectSpawnedTriggerToEvent`, the latter of which finds the trigger by name. To allow the same event to be triggered using different triggers, we could call `eventManagerFunc` with a "Setup" key and a set of trigger volumes. For an example of a trigger volume in action, see [Making the Expanding Pantry](../../resources/the-mystery-of-duvall-drive/developing-a-moving-world.md#making-the-expanding-pantry).

#### Event Parameters

In addition to custom event parameters passed from scripts, other data that can be optionally passed when creating an event includes player, callback (to be called when event ends), and callback parameters. Some events should run only for one player (events with actions running on client), while others should run for all. To make it run for only one player, we used `onlyTriggeredPlayer = true` in the params.

Events can have cooldowns defined by `minCooldownTime` and `maxCooldownTime`. The min and max provide a range for scaling based on player count, but we didn't use it in this demo. If we were to have needed cooldown needs to be per player, we had the capability to use `perPlayerCooldown = true`. Each Event has a duration in seconds, and cooldown timings and callbacks are based on it. To inform about finishing an event, invoking code could pass a callback and parameters it will get.

#### Calling Scripts

We could call `Class.Script|Scripts` at specific keyframes in the **Scripts** section. For example:

```lua
scripts = {
	{startTime = 2, scriptName = "EnablePlayerControls", params = {true}, onServer = false }
}
```

In the previous example, the **EnablePlayerControls** `Class.Script` would need to be registered with the event manager module, like so:

```lua
emModule.RegisterFunction("EnablePlayerControls", EnablePlayerControls)
```

RegisterFunction must be called in the client script for functions called on the client, and in the server script for `onServer = true`. The function itself will get eventInstance and parameters passed, but in this case, only one parameter is passed with a true value.

```lua
local function EnablePlayerControls(eventInst, params)
```

#### Playing Audio

We have limited support for playing [non-positional audio](../../sound/objects.md#volumetric) at keyframes in the **Sounds** section, for example:

```lua
sounds = {
{startTime = 2, name = "VisTech_ethereal_voices-001"},
}
```

Note that the event finishing callbacks fire when event duration expires, but audio actions might be still playing after.

#### Running Camera Shakes

We could define camera shakes in the **cameraShakes** section, like so:

```lua
cameraShakes = {
	{startTime = 15, shake = "small", sustainDuration = 7, targets = emConfig.ShakeTargets.allPlayers, onServer = true},
}
```

"targets" can be initiated only for the player who triggered the event, allPlayer, or playersInRadius to the triggering player. We used a 3rd party script for camera shakes, and the shakes were pre-defined: `eventManagerDemo.bigShake` and `eventManagerDemo.smallShake`. `sustainDuration` could also be passed.

## Missions Logic

There are 7 missions total, and only 6 of them use seals. Most missions have common parameters, though some are only for missions with seals and teleporting to corrupt rooms. Each mission has an entry in the **DemoConfig** script with a set of parameters in the **Config.Missions** map:

- **MissionRoot**: A folder of all non-corrupt versions of objects.
- **Doors**: Doors to lock until a player picks up a seal.
- **SealName**/**SolvedSealName**: Non-corrupt seal and corrupted seal names.
- **SealPlaceName**: Places to put the seal.
- **PlacedSealPlaceholderName**: Placeholder object at the place to put the seal.
- **TeleportPositionsName**: Name of a folder with placeholder meshes to define player teleport positions and rotations when moving to the corrupt room, and back to the normal area. The same name is used in both cases.
- **CorruptRoomName**: Names of the root folders (relative to ServerStorage) for the corrupt rooms. Corrupt rooms clone under TempStorage.Cloned when the mission starts, and they are destroyed when the mission is finished.
- **MissionCompleteButtonName**: A cheat button in the corrupt rooms to finish the mission immediately. This is for [debugging purposes](../../resources/the-mystery-of-duvall-drive/main-design-requirements.md#debug-version).
- **CheatKey**: The same cheat as a number or <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>[Number]</kbd>.

Some of the mission logic is in the **[GameStateManager](#gamestatemanager)** scripts, as seals and doors provide the main game flow for most missions, but most of the mission-specific logic is in `MissionsLogic` and `MissionsLogicClient` scripts that define several "types" of missions. The type is defined just by the presence of specifically named members in the mission description. There are a few types of missions:

- **Use a key on a lock** - The first mission to open a door. This type is defined by `LockName`, `KeyName`.
- **Matching items** - 4 missions match items. This type is defined by `MatchItems`.
- **Dressing up a mannequin using layered cloth** - 1 mission in the attic has players collect three items. This type is defined by `DressItemsTagList`.
- **Click on item to finish** - 1 mission has this type, which is defined by `ClickTargetName`.

Each mission type has its own `StartMissionFunc` and `CompleteMissionFunc`. Starting function usually reads parameters from the **MatchItem** map, resolves names to objects, and sets up any click detectors or UI elements. Almost all the logic is on a server, but MissionsLogicClient provides a UI for showing items counter, used in many missions. `MissionLogicEvent` remote event is used for server - client communications, with a small MissionEvents defining types of commands passed. The `MiscGameLogic` script binds some triggers to events and removes debug objects in Release version.

Matching items logic allows to "use" (click while holding) items marked with **PuzzlePieceXX** tags over items with **PuzzleSlotYY** tag. There are a few options available as parameters in **MatchItems** map (if pieces need to be applied in order, if only one of each is required). We could specify names for simple audio and visual FX. When pieces need to be placed at specific locations, an extra "Placement" map provides mapping from pieces tags to names of placeholder parts that define transforms.

## Grabbing

We developed a simple grabbing system for holding an object by attaching the object to the character's right arm. Grabbing is implemented in **GrabServer2** and **GrabClient** scripts. It starts in `ProcessClick`, which fires a ray through the clicked/touched point. It then checks if we hit a mesh that can be grabbed, and the hit is within the `maxMovingDist` where we can start grabbing interaction. If the model clicked on has `Class.Attachment|Attachments` called **GrabHint**, we pick the closest to the clicked spot. We remember the grabbed part, the model it belongs to, and either the closest **GrabHint** or the clicked position in the `grabAttempt` structure. If the distance is more than maxGrabDist, the player first needs to walk close enough to the attempted grab spot, so we call `Class.Humanoid.MoveTo`.

On each frame, we check if a grab attempt is in progress. If the player is within **reachDist**, we start playing **ToolHoldAnim**. When a player is within **maxGrabDist**, the client fires a request to the server to actually grab a model (`performGrab` function).

Server side script has 2 main functions:

- **Grab** - Handles a client's request to grab a model.
- **Release** - Handles the request to release a grabbed model.

Information about what each players holds is kept in **playerInfos** map. In the grab function, we check if this model is already grabbed by another player. If so - an "EquipWorldFail" is sent to the client, and it cancels the grab attempt. Note that we needed to handle situations where players grab different parts of the same `Class.Model`, and cancel the grab in this case.

If grabbing is allowed, the script creates two `Class.Attachment|Attachments`, one on the right hand and another on the object using a passed grab spot from the client. It then creates a `Class.RigidConstraint` between the two `Class.Attachment|Attachments`. `Class.Constraint|Constraints` and `Class.Attachment|Attachments` are stored under the **CurrentGrips** folder under the player's character. Grabbing also plays a sound, disables collisions on the grabbed object, and deals with Restorables, if needed.

For releasing a grabbed model, the client script connects to the **GrabReleaseButton** button in HUD ScreenGui. A `Connected` function fires an event to the server. On the server, release deletes the `Class.Attachment|Attachments` and `Class.Constraint|Constraints`, restores collision, deals with any applicable Restorables, and clears grab data for this client in **playerInfos**.
