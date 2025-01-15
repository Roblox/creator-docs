---
title: Main design requirements
comments:
next: /resources/the-mystery-of-duvall-drive/foundational-gameplay-systems
prev: /resources/the-mystery-of-duvall-drive/technical-overview
description: Explains the fundamental design concepts used in The Mystery of Duvall Drive.
---

The following list provides an overview of the main technical design requirements we thought about as we worked on [The Mystery of Duvall Drive](https://www.roblox.com/games/7902470429/The-Mystery-of-Duvall-Drive). For more information on the visual design of these elements, see the [Mystery of Duvall Drive Showcase](../../resources/the-mystery-of-duvall-drive/index.md), which highlights Studio's various features and tools we used to create the immersive environment.

## Missions

There are several types of missions players must solve in order to progress through the experience, including navigating a [series of spinning platforms](../../resources/the-mystery-of-duvall-drive/develop-a-moving-world.md#make-the-corrupted-treehouse) until players are able to retrieve a special item, or finding different ingredients in an [expanding pantry](../../resources/the-mystery-of-duvall-drive/develop-a-moving-world.md#make-the-expanding-pantry) and placing them into a boiling pot. To organize the scripting process of creating and debugging missions, we created a mission framework and a debug version.

### Mission framework

To ensure that we unified each step of the mission throughout the experience, we designed a **simple puzzle mission framework** for each mission which consisted of hooks for the start and finish of the puzzle, a spot to read configuration data, and a button to complete the puzzle for [debugging purposes](#debug-version). For more detailed information on this process and its parameters, see [Missions Logic](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#missions-logic).

#### Seals and game states

When players entered specific rooms, we wanted them to interact with special small objects known as **seals** to trigger missions. After they solved the mission, we wanted them to grab the seal and place it in a predefined location within the foyer in order to progress through the overall gameplay. After they placed the seal in the correct location, they could then continue to another room within the house and start the next mission by clicking on that room's special object.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/technical-overview/key-grabbing-system.jpg" width="100%" />
    <figcaption>We developed a simple grabbing system for holding an object by attaching the object to the character's right arm.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/constructing-the-house/final-foyer.png" width="88%" />
    <figcaption>The foyer where players need to place each seal to progress through the experience.</figcaption>
  </figure>
</GridContainer>

To implement this, we created **game states**, which would specify the period of time players could begin process like:

- Looking for a "corrupted" seal in a room to trigger the mission.
- Pick up the "restored" seal when they solve the mission.
- Place the seal into the foyer circle.

Game states largely control the flow of the experience and how players interact with the experience's [narrative](../../resources/the-mystery-of-duvall-drive/immersive-narrative.md). For more information, see [GameStateManager](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#gamestatemanager).

#### Normal and corrupt rooms

We wanted to have two states of six rooms in the house: a normal state and a corrupted state. When a player would touch a corrupted seal in a room to trigger the room's corrupted state, the environment would change to a darker atmosphere with modified lighting, environmental objects, and special effects. Players would then have to solve the mission in order to return to the room's normal state.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/constructing-the-house/package-normal-state.png" width="93%" />
    <figcaption>The study's normal state</figcaption>
  </figure>
  <figure>
    <img src="../../assets/resources/mystery-of-duvall-drive/constructing-the-house/package-corrupt-state.png" />
    <figcaption>The study's corrupt state</figcaption>
  </figure>
</GridContainer>

To implement this, we prepared a special space in the experience that was very far from the house, about 6,500 studs away in the **X** direction that could accommodate the corrupt state of a room. When a player triggers any corrupted state, the corrupt state of that specific room clones into this area from `Class.ServerStorage` to the **TempStorage/Cloned** folder, then players [teleport](#teleportation) into that room. Small `Class.Part|Parts` exist within each normal and corrupt room that serve as spawn points for players when entering or leaving rooms. After they solve the mission, we simultaneously teleport players back into the normal state of the room, and destroy all objects in the corrupt state of the room. For more information on the game states that control this teleportation process, see [GameStateManager](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#gamestatemanager).

### Debug version

To assist us in periodically debugging missions, we created a version of the experience where we wouldn't have to wait in the lobby or for cutscenes. This version had keyboard-based cheats and buttons that would allow us to automatically complete missions so we could quickly test aspects of the experience. We would periodically copy and publish this version into the version we planned to release that had the proper gameplay flow. To distinguish these two versions, we made a **DemoGlobalSettings** script to check the placeID, see if it's running in Studio, and enable/disable various gameplay cheats and buttons. For more information, see [Missions Logic](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#missions-logic) and [Configuration Scripts](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#configuration-scripts).

## Teleportation

There are three types of teleportation that occur within the experience:

1. Teleporting players from the simple lobby to the main gameplay area in a [reserved server](#reserved-servers).
1. Teleporting players from a room's normal state to the corrupt state, then back again while showing a [cutscene](#cutscenes).
1. Teleporting players within some puzzles, or when they [respawn](#respawn-players) after falling off the gameplay area.

### Reserved servers

We decided to group players into groups of five in a **simple lobby** before teleporting them over to a **reserved server** for the main gameplay area of the house. The lobby provided time for additional players to join and play together, and reserved servers prevented additional players from missing aspects of the gameplay and narrative from joining the experience late. This teleportation only happens once.

<img src="../../assets/resources/mystery-of-duvall-drive/technical-overview/simple-lobby.jpg" width="50%" />

### Cutscenes

We wanted to be able to transport players throughout the game whenever they accomplish certain tasks, such as touching a seal or completing a mission. To implement this, we developed a simple version of a script-based tool called **EventManager** that controlled various properties and attributes, ran scripts and audio, and performed camera shakes over a duration of time. This allowed us to both move players and stream in and out different rooms while hiding this process from the player using special effects. For more information, see [EventManager](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#EventManager).

<video src="../../assets/resources/mystery-of-duvall-drive/technical-overview/cutscene.mp4" controls width="100%"></video>

### Respawn players

The third type of teleportation we wanted to implement was a short teleport with only a player `Datatype.CFrame` coordinate change within some puzzles and when players fall and respawn. Unlike the previous two types of teleportation, this type doesn't explicitly request async streaming.

<video src="../../assets/resources/mystery-of-duvall-drive/technical-overview/respawning-players.mp4" controls width="100%"></video>

## Gameplay scripting

Scripting allowed us to execute on specific gameplay elements, such as fading UI elements, creating trigger volumes for key events, and highlighting objects when they were in focus with the player's cursor. Many of these systems relied on tagging objects to perform custom behavior, then using a variety of client or server scripts to contain specific workflows depending on what action needed to happen at set points in the experience. For more information on how we implemented these systems, see [Foundational gameplay systems](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md) and [Supporting Systems](../../resources/the-mystery-of-duvall-drive/supporting-systems.md).

### Custom behavior with tags

We wanted a way to add custom behavior for objects, such as locking doors so players would have to stay within the room until they completed the active mission. To implement this, we decided to use tags for specific objects, then we used `Class.CollectionService` to find these objects and connect any corresponding `Class.Script|Scripts` to add custom behavior. We had one `Class.Script` for each tag category that acted as a manager to handle all objects tagged under that category so we could keep the `Class.Script` in a single location rather than being copied many times in `Class.DataModel`. For more information, see [DoorManager](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#doormanager), [MasterAnimator](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#masteranimator), [DrawerManager](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#drawermanager), [KillVolumes](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#killvolumes), [PlayerMissionRespawn](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#playermissionrespawn), and [PianoManager](../../resources/the-mystery-of-duvall-drive/supporting-systems.md#pianomanager).

The "manager" `Class.Script` uses an `Init` function to find any objects tagged when the experience starts, and connect a custom behavior to them. For example, DoorManager finds any object tagged with **Door**, then it attaches the correct behavior to the door objects (moves the door open when clicked, plays a door swing sound effect, etc.). However, any objects that are added or removed during runtime, such as any objects that are added to a corrupted room after a player interacts with a corrupted seal, miss this initial call and never get the expected behavior. To solve this, we use `Class.CollectionService.GetInstanceAddedSignal` and `Class.CollectionService.GetInstanceRemovedSignal` to grant the same behavior to new objects that are tagged and untagged, respectively.

### Client and server scripts

We wanted to reduce bandwidth for different aspects of gameplay that would be expensive on performance. We decided that when object functionality can affect simulation for other players, such as moving object through collision, we would run this on the **server**, but if something is more related to environment design, such as lights, environmental animations that don't affect gameplay, special effects, and audio, we would run them on **clients**. This would reduce bandwidth, and keep both movement and environment changes smoother on user devices.
