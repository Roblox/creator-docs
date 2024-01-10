---
title: Animation Events
description: Animation Events are markers across the timeline span in the Animation Editor.
---

You can define animation **event markers** across the timeline span and use
`Class.AnimationTrack:GetMarkerReachedSignal()|GetMarkerReachedSignal()`
to detect those markers as the animation runs.

## Showing Events

By default, the event track isn't visible. To show the event track:

1. Navigate to the right of the **timeline**, then click the **Gear** icon.
   A pop-up menu displays.

   <img
   src="../assets/animation/animation-editor/Timeline-Options-Menu.png"
   width="330" />

2. Select **Show Animation Events**. This opens the **Animation Events** bar directly below the media and
   playback controls.

   <img
   src="../assets/animation/animation-editor/Animation-Events-Bar.png"
   width="600" />

You can now [create](#creating-events), [detect](#detecting-events), and
[duplicate](#duplicating-events) events.

## Creating Events

Event markers are visual indicators of where an animation event begins. After you create an event
marker, you can move it to any frame position on the timeline.

To create a new event marker:

1. Navigate to the **timeline**, then click-and-drag the **scrubber** to the
   frame position where the event should occur.
2. Navigate to the **event track**, then click the **Edit Animation Events**
   button. The **Edit Animation Events** dialog displays.

   <img
   src="../assets/animation/animation-editor/Animation-Events-Edit-Button.png"
   width="600" />

3. In the **Edit Animation Events** dialog, click **+ Add Event**, then enter an
   event name.

   <img
   src="../assets/animation/animation-editor/Animation-Events-Add-Event.png"
   width="507" />

4. **(Optional)** In the **Parameter** field, enter a parameter string for the event.
5. Click the **Save** button. In the events bar within the timeline, a new
   marker symbol displays at the frame position.

   <img
   src="../assets/animation/animation-editor/Animation-Events-Marker-In-Timeline.png"
   width="700" />

## Detecting Events

To detect animation events in a `Class.LocalScript`,
connect a function to the `Class.AnimationTrack:GetMarkerReachedSignal()|GetMarkerReachedSignal()` function of `Class.AnimationTrack`. For example:

```lua
local Players = game:GetService("Players")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait() 
local humanoid = character:WaitForChild("Humanoid")
local animator = humanoid:WaitForChild("Animator")

-- Create new "Animation" instance
local walkAnim = Instance.new("Animation")
-- Set its "AnimationId" to the corresponding animation asset ID
walkAnim.AnimationId = "rbxassetid://5432167890"

-- Load animation onto the animator
local walkAnimTrack = animator:LoadAnimation(walkAnim)

-- Connect "GetMarkerReachedSignal" event to a specific named keyframe
walkAnimTrack:GetMarkerReachedSignal("FootStep"):Connect(function(paramString)
	print(paramString)
end)
```

<Alert
    severity="info"
    variant="standard">
You can specify a <b>Parameter</b> value for any event
marker within the Animation Editor. This lets you pass a custom <b>string</b>
(single value, comma-separated string, etc.) to the `Class.AnimationTrack:GetMarkerReachedSignal()|GetMarkerReachedSignal()` function, as illustrated by the <b>paramString</b> argument in the code example above. This string can then be parsed or converted, if necessary, and used for whatever action you wish to perform in the event.
</Alert>

## Duplicating Events

As you create events, they become available for usage throughout the whole
animation, not only at the frame position where you originally created them. For
instance, you can create a "FootStep" event marker at the point where a
character's **left** foot touches down, then use the same event when the
character's **right** foot touches down.

To duplicate an event:

1. Navigate to the **timeline**, then click an **event marker** in the **event bar**.

   <img
   src="../assets/animation/animation-editor/Animation-Events-Marker-Selected.png"
   width="700" />

2. Press <kbd>Ctrl</kbd><kbd>C</kbd> (<kbd>⌘</kbd><kbd>C</kbd> on Mac).
3. Click-and-drag the **scrubber** to the frame position where you want to
   duplicate the event.
4. Press <kbd>Ctrl</kbd><kbd>V</kbd> (<kbd>⌘</kbd><kbd>V</kbd> on Mac).

   <img
   src="../assets/animation/animation-editor/Animation-Events-Marker-Pasted.png"
   width="700" />

If the original event uses a parameter
but the duplicated event should use a modified parameter, perform the following
steps:

1. Right-click the duplicated event marker. A pop-up menu displays.
2. Select **Edit Animation** Event. The **Edit Animation Events** dialog
   displays.
3. Make your changes, then click the **Save** button.

<Alert
    severity="info"
    variant="standard">
You can also duplicate events by clicking the <b>Edit Animation Events</b> button (just as if you were <a href="#creating-events">creating a new event</a>), clicking <b>Add Event</b> in the pop-up menu, selecting the desired event from the dropdown, and clicking <b>Save</b>.
</Alert>
