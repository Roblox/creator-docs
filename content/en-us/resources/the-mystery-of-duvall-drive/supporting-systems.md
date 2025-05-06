---
title: Supporting systems
comments:
prev: /resources/the-mystery-of-duvall-drive/foundational-gameplay-systems
description: Explains the supporting systems and functions in The Mystery of Duvall Drive.
---

We used the following systems to support both the [foundational gameplay systems](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md), as well as any goals of the [main design requirements](../../resources/the-mystery-of-duvall-drive/main-design-requirements.md).

## UseManager

**UseManager** provided a simple API to apply a grabbed object onto something, like a piece of layered clothing onto a mannequin. The main function for this API is `UseManager.AddUse` (tags, targetObjects, distance, onSuccess, onNothingEquipped, onWrongEquipped, extraData), which binds a set of tags to **targetObjects**. When a player has an object with one of the tags and clicks on a targetObject, the onSuccess callback function is called. Other call functions allowed us to show players extra visual info if either a click is made without a grabbed item or with the wrong type of item.

We could remove the "use" with `UseManager.RemoveUse`, which was usually helpful when a mission was finished or a specific item was "used". In addition, we could add or remove targets with `AddUseTargets` and `RemoveUseTargets`.

## Highlights

When a player was near an item of interest, such as a seal, we wanted to have that item stand out from its surroundings. To implement this, we created a `Class.LocalScript` called **HighlightItems** that uses a sphere centered around the player to detect touches with other meshes, connecting to `Touched` and `TouchEnded` events. The `getHighlight` function checks several tags on a touched mesh or its parents using a **GetTaggedObjectUpHierarchy** helper function. If any highlight isn't needed, we could forcibly remove it by using a **NoHighlight** tag. However, if it's needed but doesn't quite fit various other tags, we could force it using the **Important** tag.

This `Class.LocalScript` utilizes a new engine feature `Class.Highlight` that draws an outline of an object and/or fills the object's interior with a defined color; for more information on how to use this feature, see [Highlighting Objects](../../effects/highlighting.md). `Class.Highlight|Highlights` and the mouse cursor **[OnItemIndicator](#onitemindicator)** systems work together, so `Class.Highlight|Highlights` not only determine if a mesh needs a highlight, but it also provides a type of mesh for **OnItemIndicator**.

`HighlightItemsFunc` is used to communicate with other client systems. For example, [EventManager](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#eventmanager) uses it with an **Enable** command to enable or disable a `Class.Highlight` in certain cutscenes, and **OnItemIndicator** uses `GetType` to enquire about the type of object it is. To detect when an item is no longer present, such as when a corrupt room is destroyed, we connect to `Class.CollectionService.GetInstanceRemovedSignal`.

## Lore and ThoughtBubbles

**Lore** and **ThoughtBubbles** are 2 similar systems. Lore uses a `Class.ScreenGui` as an on-screen UI container with a child `Class.Frame` to control the sizing and rescaling of its children `Class.TextLabel|TextLabels` and `Class.ImageLabel|ImageLabels`, and lore waits for the player to click anywhere on the screen to remove it. Similarly, thought bubbles use a `Class.BillboardGui` with a child `Class.TextLabel` to non-lore objects, and it displays dialogue in the 3D space near the object for a specified duration and cooldown period without the text taking up the entirety of the screen. For more information on the design behind these systems, see [Lore](../../resources/the-mystery-of-duvall-drive/immersive-narrative.md#lore) and [Thought Bubbles](../../resources/the-mystery-of-duvall-drive/immersive-narrative.md#thought-bubbles).

Lore is implemented in the **LoreManger** `Class.LocalScript`. When clicked or touched, it fires a raycast using a helper function `utils.RaycastAlongPointingDir`, and it uses a **NoPlayerCollision** group. If a mesh under the click or one of the parents has a **Lore** or **ThoughtBubble** tag, we display the UI. The text, caption, and image are defined by the LoreText, LoreCaption, and LoreImage attributes on the object.

Note that we use `Class.Camera.ViewportPointToRay` or `Class.Camera.ScreenPointToRay` to construct the ray, depending upon if it was called from a non-touch or touch. The coordinates are in somewhat different coordinate systems. For the mouse, we get them from ` Class.UserInputService.InputEnded``:Connect ` for the MouseButton1, and for touch devices, we get them from ` Class.UserInputService.TouchTapInWorld``:Connect `.

ThoughtBubbles are overall similar, using a raycast to check if a mesh or its parents have a **ThoughtBubble** tag. It also uses the ThoughtText attribute for text, and a **ThoughtBubble** tag to point to a placeholder object used for positioning the UI in the world. Thought bubbles that use the same positional object but have different text have different cooldowns.

### Special cases

Lore has a couple of special cases, one of which is the corrupted seals. When a player clicks a corrupted seal, it displays lore UI, and it waits for a click to start a mission, which affects the game flow. This is handled by the [`GameStateClient`](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#gamestatemanager) that uses a bindable `LoreManagerFunc` to request lore UI. A callback is provided to the Lore system by `GameStateClient` to know when lore is "closed" by the player. Another special case is when **ThoughtBubbles** and **Lore** tags are on the same object. In this case, to avoid an overlap of lore and thought bubble text, we run the thought bubble after the lore is closed.

**LoreManager** also handles a special case with showing a small cutscene when clicking on disabled doors that are locked until the player picks up the room's seal.

## OnItemIndicator

We want to show different icons in the center of the screen when the player is looking at certain items of interest. The client script **OnItemindicator** does a raycast along the camera `Class.CFrame.LookVector` and analyzes the results. Based on the results, it sets an image in the OnItemIndicator2 `Class.ScreenGui`.

When no items of interest are hit, the default icon is a small dot. We could set any icon by adding an **OnItemIndicator** string attribute to a specific mesh, using the names from `onItemIndicatorImages`, such as Hand, Eye, or DoorCurrentlyLocked. The attribute is only needed in rare cases, and most of the time other existing tags or systems provide the type of icon. For more details, see the `Update` function.

Type checks some in a priority order. After the `OnItemIndicator` override, we check if it is grabbable or a drawer for the "hand" icon through either `utils.CanGrabModel(model)` or `utils.GetTaggedObjectUpHierarchy("Drawer2", model)`. After that, we call [`HighlightManager`](#highlights) that determines the highlight status, the types of items, and which icon to use. For example:

```lua
highlightItemsFunc:Invoke({"GetType", curInst})
```

The Lore and ThoughtBubble tags are checked later by checking tags. For the doors, we have 2 different icons: **DoorCurrentlyClosed** and **DoorAlwaysLocked**. [`DoorManager`](#doormanager) sets a true or false `DoorEnabled` attribute for doors that can be open or closed, and we use presence and value of the attribute. Objects that look like doors but do not open have the **DoorLocked** tag.

## DoorManager

The **DoorManager** `Class.LocalScript` uses a **Door** tag and `Class.CollectionService` to manage opening and closing doors. Door has front and back side triggers that we connect with touch and `touchEnded` events. We created tweens to open and close a door from the front and back sides. We maintain a **playersNear** map (of players touching the triggers, separately for the front and back sides.

Each door has a simple state system, `DoorState` (Closed, Opening, Open, Closing), with tweens used for transitions. We could enable or disable a door's ability to open or close from external systems by calling `DoorManager.EnableDoor`, which sets a `DoorEnabled` attribute.

## MasterAnimator

The **MasterAnimator** `Class.LocalScript` plays animated images (texture atlas), which we used to animate TV screens. To scroll through images, we needed to know a set of parameters: row and column count, total frames, perios, image dimensions, and a set of image IDs. The system allowed us to animate across multiple images, each possibly split into rows and columns of sub-images. We could provide this data through attributes or values, but in this experience, we used helper scripts. `UpdateImageAnimations(dT)` calculates what image or subimage we needed to show using time and parameters. If we needed to change to a new image, we set Image. If we need to change any subimage, we set `ImageRectOffset`.

An object with an animated `Class.SurfaceGui` would have an Animator `Class.ModuleScript`, with the main purpose to provide an `Animator.GetParams` function that returns all the parameters. This helps the MasterAnimator `Class.LocalScript` that uses the **ImageAnimation** tag and `Class.CollectionService` to gather such objects, and find the Animator `Class.ModuleScript` under them. It then uses pcall to require Animator `Class.ModuleScript` and call `GetParams` on it.

## LocalSpaceAnimations

The **LocalSpaceAnimations** `Class.LocalScript` uses a **LocalSpaceRotation** tag to rotate mostly "cosmetic" objects with a given rotational velocity and delay around either the X, Y, or Z axis. We used this either for distant objects that players wouldn't interact with, or for smaller objects that don't affect simulation much. Parameters defined through the `Speed`, `Delay`, and `Axis` values. For implementation details, see [Rotating Cloud Meshes](../../resources/the-mystery-of-duvall-drive/develop-a-moving-world.md#rotating-cloud-meshes).

## HeadlampManager

The **HeadlampManager** `Class.LocalScript` handles when users select the on-screen `Class.ImageButton` to toggle the spotlight on top of their head on or off, fires comments to the server using HeadlampEvent, and plates toggling on and off sounds. When a character is added, or their `Head` is changed, the `giveCharacterHeadlamp` function clones **templateHeadlamp** lamp, and positions the lamp using some offsets and rotations from the **FaceFrontAttachment**.

## SeatManager

We do not want players to automatically seat when near an object they can sit on. Instead, we want to require users to click near a seat in order to sit. The **SeatManager** script adds `Class.ClickDetector|ClickDetectors` based on a **Seat** tag, and calls `seat:Sit(humanoid)` when clicked. When teleporting players between a room's normal and corrupt state, we can't have players sitting because `Datatype.CFrame` coordinate change wouldn't be able to work, so the **SeatManager** has a functionality to disable or enable seating a few seconds before and after the teleport.

## DrawerManager

The **DrawerManager** script uses a **Drawer2** tag and `Class.CollectionService` to handle clicking on drawers to open or close them, and play any corresponding audio. The opening and closing action is done by setting TargetPosition for a `Class.PrismaticConstraint`.

## KillVolumes

In a couple of areas of the main gameplay area, such as the electric sparks and water near the start of the road leading up to the house, a player can have their `Class.Humanoid.Health` set to `0` when entering a volume with the **KillVolume** tag. The **KillVolumes** script uses `Touched:Connect` to determine when a player enters a volume, then reduces their health to `0`.

## PlayerMissionRespawn

The **PlayerMissionRespawn** script uses a **RespawnVolume** tag and `Class.CollectionService` to deal with volumes that make players respawn when touched. We placed these volumes under corrupt rooms, as many missions have gaps or moving platforms in which the player could fall down. When touched, the script plays a small **Teleport_Jump** cutscene and invokes `GameStateFunc` with `GameEvents.PlayerRespawn` command.

When processing `GameEvents.PlayerRespawn`, the script can use `RespawnPositions`, if mission config provides it. If not, it uses `TeleportPositions` for the specific mission. We don't have a "checkpoint" system, so `CalcClosestTeleportPos` just selects closest **Respawn** or **Teleport** spots from where the player hit the `RespawnVolume`, using the only horizontal, "2D" distance.

## Small helper systems

### PianoManager

The **PianoManager** script uses a **Piano** tag and `Class.CollectionService` to add `Class.ClickDetector|ClickDetectors` and play one of the piano sounds when clicked on the keyboard.

### RitualSupport

The foyer where players place seals has a complicated contraption that undergoes changes as each seal is placed in its defined location. For example, depending on the number of seals placed, specific events play to enable/disable lights and beams, change the transparency of certain objects, etc. The **RitualSupport** `Class.ModuleScript` is a small wrapper over `EventManager:Invoke` calls for those events, providing parameters to the event, such as what "root object" to play it on, depending upon what specific seal was placed.

### RestorableManager

Some grabbable objects are important for gameplay, such as seals, and we didn't want them to get lost if a player dropped them somewhere. If an object has a **Restorable** tag, the **RestorableManager** script remembers its transform when it is added to the restorable system. When a player drops such an object, the grabbing system calls `restorableManager.StartTracking`. If the object isn't picked up again in five seconds, the **RestorableManger** script positions it at the original transform and resets the tracking time.

### Portals

In a few missions, we teleport players a short distance within a mission, such as [respawning players](../../resources/the-mystery-of-duvall-drive/main-design-requirements.md#respawning-players) who fall off a spinning platform. To simplify setting up this type of teleportation, which we call "Portals" in script, a helper function `ProcessPortal` in **DemoUtils** is used. For example, if P1 is the part defining the initial trigger, and P2 is the part defining destination player transform, the following code snippet could define such portal functionality:

```lua
P1.Touched:Connect(function(otherPart) utils.ProcessPortal(otherPart, P2) end)
```

**ProcessPortal** handles checking that otherPart is a human, teleporting the player through a `Datatype.CFrame` coordinate change, and invoking a small cutscene to hide the transition using a **Teleport_Jump** event in [EventManager](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#eventmanager).

### Configuration scripts

We have several configuration, data definition, and common functionality scripts:

**DemoConfig**. Definitions of missions. Enumerations for game states, events for client-server communications.

**DemoGlobalSettings**. We develop in one place, but release (and playtest) in others. The script checks placeID and enables/disables various cheats and debugging functionality.

**DemoUtils**. Various utility functions. Dealing with transforms. Setting visibility, anchored or other properties. Checking for a point in a box. Finding objects in hierarchy by "dotted" name. Managing TempStorage (that can be used to temporarily move models "somewhere far" and bring back later). Click detector helpers. Grabbing support. Support for checking tags (especially along the hierarchy). Connecting triggers to [EventManager](../../resources/the-mystery-of-duvall-drive/foundational-gameplay-systems.md#eventmanager).

**AudioUtils**. A couple of functions to play weighted random sounds from a set.

**GrabUtil**. Helper functions for grabbing.
