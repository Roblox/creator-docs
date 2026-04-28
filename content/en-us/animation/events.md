---
title: Animation events
description: Animation Events are markers across the timeline span in the Animation Editor.
---

You can define animation **event markers** across the timeline span and use
`Class.AnimationTrack:GetMarkerReachedSignal()|GetMarkerReachedSignal()`
to detect those markers as the animation runs.

By default, the event track isn't visible. To show the event track:

1. Navigate to the right of the timeline and click the settings icon. A pop-up menu displays.

   <img src="../assets/animation/animation-editor/Timeline-Options-Menu.png" width="524" />

2. Select **Show Animation Events**. This opens the **Animation Events** bar directly below the media and
   playback controls.

   <img src="../assets/animation/animation-editor/Animation-Events-Bar.png" width="840" />

## Create events

Event markers are visual indicators of where an animation event begins. After you create an event
marker, you can move it to any frame position on the timeline.

To create a new event marker:

1. Navigate to the timeline, then click-and-drag the scrubber to the frame position where the event should occur.
2. Navigate to the **event track**, then click the **Edit Animation Events** button.

   <img src="../assets/animation/animation-editor/Animation-Events-Edit-Button.png" width="840" />

3. In the dialog, click **+ Add Event**, then enter an event name.
4. <Chip label="OPTIONAL" size="small" variant="outlined" /> In the **Parameter** field, enter a parameter string for the event.
5. Click the **Save** button. In the events bar within the timeline, a new marker symbol displays at the frame position.

   <img src="../assets/animation/animation-editor/Animation-Events-Marker-In-Timeline.png" width="840" />

## Detect events

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

<Alert severity="info" variant="standard">
You can specify a **Parameter** value for any event marker within the animation editor. This lets you pass a custom **string** (single value, comma-separated string, etc.) to the `Class.AnimationTrack:GetMarkerReachedSignal()|GetMarkerReachedSignal()` method, as illustrated by the `paramString` argument in the code example above. This string can then be parsed or converted, if necessary, and used for whatever action you wish to perform in the event.
</Alert>

## Duplicate events

As you create events, they become available for usage throughout the whole
animation, not only at the frame position where you originally created them. For
instance, you can create a `FootStep` event marker at the point where a
character's **left** foot touches down, then use the same event when the
character's **right** foot touches down.

To duplicate an event:

1. Right-click an **event marker** in the event bar, then select **Copy Selected** from the contextual menu.

   <img src="../assets/animation/animation-editor/Animation-Events-Marker-In-Timeline.png" width="840" />

2. Right-click at another time along the timeline and select **Paste Events**. The copied event inserts at the time position closest to where you click.
3. <Chip label="OPTIONAL" size="small" variant="outlined" /> If the original event uses a **parameter** but the duplicated event should use a modified parameter, perform the following steps:

   1. Right-click the duplicated event marker and select **Edit Animation Event** from the contextual menu. The **Edit Animation Events** dialog
   displays.
   2. Make your changes and click the **Save** button.
