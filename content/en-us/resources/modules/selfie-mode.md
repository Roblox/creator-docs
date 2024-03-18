---
title: Selfie Mode
description: The Selfie Mode module lets players capture screenshots to commemorate fun moments.
---

Players already take screenshots to commemorate fun moments in experiences. The **SelfieMode** [developer module](../../resources/modules/index.md) lets players capture a cleaner memory of that moment without the chat window or player list, while also supporting filter effects, hiding of other characters, and posing.

<video src="../../assets/developer-modules/selfie-mode/Showcase.mp4" controls width="100%"></video>

## Module Usage

### Installation

To use the **SelfieMode** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Selfie Mode** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/selfie-mode/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **SelfieMode** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/selfie-mode/Move-Package.png" width="320" />

### Configuration

The module is preconfigured to work for most use cases, but you can easily customize it through the [configure](#configure) function.

1. In **StarterPlayerScripts**, create a new `Class.LocalScript` and rename it to **ConfigureSelfieMode**.
1. Paste the following code into the new script.

   ```lua title='LocalScript - ConfigureSelfieMode' highlight='5-7'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

   SelfieMode.configure({
   	disableCharacterMovement = true
   })
   ```

### Character Movement

It may be advantageous to prevent the player's character from moving while in selfie mode. You can achieve this by setting `disableCharacterMovement` to true in a [configure](#configure) call.

```lua title='LocalScript - ConfigureSelfieMode' highlight='6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.configure({
	disableCharacterMovement = true
})
```

### Selfie Mode Actions

**SelfieMode** comes with the following [actions](#action), each of which you can use with the [activateAction](#activateaction), [deactivateAction](#deactivateaction), and [toggleAction](#toggleaction) functions, or detect through the [actionActivated](#actionactivated) and [actionDeactivated](#actiondeactivated) events.

#### Depth-of-Field

By default, **SelfieMode** shows a generic **depth‑of‑field** effect (subtle blur of the background) when a player toggles the action.

<Tabs>
  <TabItem label="Off">
    <img src="../../assets/developer-modules/selfie-mode/Depth-Of-Field-Off.jpg" width="90%" />
  </TabItem>
  <TabItem label="On">
    <img src="../../assets/developer-modules/selfie-mode/Depth-Of-Field-On.jpg" width="90%" />
  </TabItem>
</Tabs>

<Alert severity="warning">
<p>This effect does not render on mobile devices such as phones and tablets. As such, it will not be offered as an action on those devices.</p>
On non-mobile devices, the player's graphics quality (**Settings**&nbsp;&rarr; **Graphics&nbsp;Quality**) must be eight or higher to render depth‑of‑field. If their graphics quality is less than eight, they'll be prompted to increase it.
</Alert>

To change the default depth‑of‑field effect, set `depthOfFieldEffect` to your own `Class.DepthOfFieldEffect` instance in a [configure](#configure) call.

```lua title='LocalScript - ConfigureSelfieMode' highlight='5-9, 12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

local customDepthOfField = Instance.new("DepthOfFieldEffect")
customDepthOfField.NearIntensity = 0
customDepthOfField.FarIntensity = 1
customDepthOfField.FocusDistance = 5
customDepthOfField.InFocusRadius = 5

SelfieMode.configure({
	depthOfFieldEffect = customDepthOfField
})
```

#### Lock Gaze

The **Lock Gaze** toggle causes the player's character to look at the camera while setting up the selfie pose, within a realistic range of how far their neck can turn.

#### Hide Others

By default, other characters are visible alongside the player's character. Players can obtain a perfect solo shot by clicking the **Hide&nbsp;Others** button. When toggled on, other characters fade out of view and remain invisible until the action is toggled off.

#### Filter

The **Filter** action lets the player apply a preset filter from the options **Pop**, **Soft**, **Antique**, **Cute**, **Dramatic**, and **Monochrome**.

<Tabs>
  <TabItem label="Soft">
    <img src="../../assets/developer-modules/selfie-mode/Filters-Soft.jpg" width="90%" />
  </TabItem>
  <TabItem label="Dramatic">
    <img src="../../assets/developer-modules/selfie-mode/Filters-Dramatic.jpg" width="90%" />
  </TabItem>
	<TabItem label="Monochrome">
    <img src="../../assets/developer-modules/selfie-mode/Filters-Monochrome.jpg" width="90%" />
  </TabItem>
</Tabs>

#### Pose

The **Pose** action lets the player select a preset pose from the options **Cheer**, **Clapping**, **Dolphin**, **Flossing**, **Guitar**, **Jump&nbsp;Wave**, **Louder**, **Top&nbsp;Rock**, **Twirl**, and **Wave**.

<Tabs>
  <TabItem label="Flossing">
    <img src="../../assets/developer-modules/selfie-mode/Poses-Flossing.jpg" width="90%" />
  </TabItem>
  <TabItem label="Louder">
    <img src="../../assets/developer-modules/selfie-mode/Poses-Louder.jpg" width="90%" />
  </TabItem>
	<TabItem label="Twirl">
    <img src="../../assets/developer-modules/selfie-mode/Poses-Twirl.jpg" width="90%" />
  </TabItem>
</Tabs>

## API Reference

### Types

#### Action

Each action is represented by a dictionary with the following key-value pairs:

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`name`</td>
		<td>string</td>
		<td>Name of the action, shown first in tooltips.</td>
	</tr>
	<tr>
		<td>`description`</td>
		<td>string</td>
		<td>Description of the action, shown after **name** in tooltips.</td>
	</tr>
	<tr>
		<td>`icon`</td>
		<td>string</td>
		<td>Asset ID for the action's icon.</td>
	</tr>
	<tr>
		<td>`activeIcon`</td>
		<td>string</td>
		<td>Asset ID for the action's icon in "active" state. Can only be used on parent actions, not sub-actions.</td>
	</tr>
	<tr>
		<td>`actions`</td>
		<td>table</td>
		<td>Optional list of sub-actions. This allows you to create submenus of various other actions.</td>
	</tr>
	<tr>
		<td>`parent`</td>
		<td>[Action](#action)</td>
		<td>The parent of the action; this only applies to a sub-action and points to the action that contains it.</td>
	</tr>
	<tr>
		<td>`onActivated`</td>
		<td>function</td>
		<td>Optional callback function that runs when a player activates an action or sub-action. Typically, if an action contains sub-actions, only the sub-actions will need a callback defined as a means of knowing that the player activated the sub-action and did not simply "expand" the parent action.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.actionActivated:Connect(function(action)
	print(action.name, "activated")
end)

SelfieMode.actionDeactivated:Connect(function(action)
	print(action.name, "deactivated")
end)
```

### Enums

#### SelfieMode.Action

**SelfieMode** comes with several [actions](#action). You can use this enum with the [activateAction](#activateaction), [deactivateAction](#deactivateaction), and [toggleAction](#toggleaction) functions.

<table>
<thead>
	<tr>
		<th>Name</th>
		<th>Summary</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`DepthOfField`</td>
		<td>Reference to the [Depth‑of‑Field](#depth-of-field) action.</td>
	</tr>
	<tr>
		<td>`LockGaze`</td>
		<td>Reference to the [Lock Gaze](#lock-gaze) action.</td>
	</tr>
	<tr>
		<td>`HideOthers`</td>
		<td>Reference to the [Hide Others](#hide-others) action.</td>
	</tr>
	<tr>
		<td>`Filter`</td>
		<td>Reference to the [Filter](#filter) action.</td>
	</tr>
	<tr>
		<td>`Pose`</td>
		<td>Reference to the [Pose](#pose) action.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

-- Activate "Filter" action
SelfieMode.activateAction(SelfieMode.Action.Filter)
```

### Functions

#### configure

<figcaption>
configure(config: `Library.table`)
</figcaption>

Overrides default configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.LocalScript`.

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`disableCharacterMovement`</td>
		<td>If true, prevents character from moving while selfie mode is open.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`depthOfFieldEffect`</td>
		<td>Optional custom `Class.DepthOfFieldEffect` instance that appears when the player toggles the [Depth&nbsp;of&nbsp;Field](#depth-of-field) action.</td>
		<td></td>
	</tr>
</tbody>
</table>

```lua title='LocalScript - ConfigureSelfieMode' highlight='6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.configure({
	disableCharacterMovement = true
})
```

#### openSelfieMode

<figcaption>
openSelfieMode()
</figcaption>

A player will typically open selfie mode with the "camera" button on the right side of the screen, but this function lets you open it through code. When implementing a custom button as shown below, you should disable the default button through [setHudButtonEnabled](#sethudbuttonenabled). This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='8, 12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

local button = script.Parent

-- Remove the default button
SelfieMode.setHudButtonEnabled(false)

-- Connect the custom button
button.Activated:Connect(function()
	SelfieMode.openSelfieMode()
end)
```

#### closeSelfieMode

<figcaption>
closeSelfieMode()
</figcaption>

A player will typically close selfie mode with the **&CircleTimes;** button at the bottom of the screen, but this function lets you close it through code. Can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.closeSelfieMode()
```

#### isSelfieModeOpen

<figcaption>
isSelfieModeOpen(): `boolean`
</figcaption>

Returns `true` if selfie mode is open as a result of player action or through [openSelfieMode](#openselfiemode). This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.openSelfieMode()

print(SelfieMode.isSelfieModeOpen())
```

#### setHudButtonEnabled

<figcaption>
setHudButtonEnabled()
</figcaption>

Sets whether the default button to enter selfie mode is shown. Useful when implementing [openSelfieMode](#openselfiemode) through a custom UI button. This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='8, 12'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

local button = script.Parent

-- Remove the default button
SelfieMode.setHudButtonEnabled(false)

-- Connect the custom button
button.Activated:Connect(function()
	SelfieMode.openSelfieMode()
end)
```

#### getAction

<figcaption>
getAction(action: [SelfieMode.Action](#selfiemodeaction)): [Action](#action)
</figcaption>

Gets an [Action](#action) type through a [SelfieMode.Action](#selfiemodeaction) enum.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

local lockGazeAction = SelfieMode.getAction(SelfieMode.Action.LockGaze)
```

#### activateAction

<figcaption>
activateAction(action: [SelfieMode.Action](#action))
</figcaption>

Programmatically activates one of the default [actions](#selfie-mode-actions). This is the same as when a player toggles the action on from the action bar. Can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

-- Activate "Filter" action
SelfieMode.activateAction(SelfieMode.Action.Filter)
```

#### deactivateAction

<figcaption>
deactivateAction(action: [SelfieMode.Action](#action))
</figcaption>

Programmatically deactivates one of the default [actions](#selfie-mode-actions). This is the same as when a player toggles the action off from the action bar. Can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

-- Deactivate "Filter" action
SelfieMode.deactivateAction(SelfieMode.Action.Filter)
```

#### toggleAction

<figcaption>
toggleAction(action: [SelfieMode.Action](#action)): `boolean`
</figcaption>

Toggles an [action](#selfie-mode-actions) on if it's off, or toggles it off if it's on. This is the same as when a player clicks the action from the action bar. Returns the new "is&nbsp;toggled&nbsp;on" state as a boolean. Can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='5, 7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

local lockGazeAction = SelfieMode.getAction(SelfieMode.Action.LockGaze)

local isEnabled = SelfieMode.toggleAction(lockGazeAction)

if isEnabled then
	print("Activated", lockGazeAction.name)
else
	print("Deactivated", lockGazeAction.name)
end
```

#### setTheme

<figcaption>
setTheme(theme: `Library.table`)
</figcaption>

Configures the selfie mode theme, including text size, font, button/tooltip colors, and more. This function can only be called from a `Class.LocalScript`.

<Tabs>
<TabItem label="General">

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`textSize`</td>
		<td>Size of all text.</td>
		<td>16</td>
	</tr>
	<tr>
		<td>`font`</td>
		<td>Font used across all UI (`Enum.Font`).</td>
		<td>`Enum.Font|GothamMedium`</td>
	</tr>
	<tr>
		<td>`padding`</td>
		<td>Main padding used for laying out UI elements (`Datatype.UDim`).</td>
		<td>(0, 12)</td>
	</tr>
	<tr>
		<td>`paddingSmall`</td>
		<td>Smaller padding used for applying subtle margins between elements (`Datatype.UDim`).</td>
		<td>(0, 6)</td>
	</tr>
	<tr>
		<td>`paddingScreen`</td>
		<td>Padding used around the screen edges to give selfie mode some breathing room (`Datatype.UDim`).</td>
		<td>(0, 24)</td>
	</tr>
	<tr>
		<td>`backgroundColor`</td>
		<td>Background color used for the bar that displays the actions (`Datatype.Color3`).</td>
		<td>[0,&nbsp;0,&nbsp;0]</td>
	</tr>
	<tr>
		<td>`scrollBarColor`</td>
		<td>Color of the scrollbar used in `Class.ScrollingFrame` elements of the module (`Datatype.Color3`).</td>
		<td>[255,&nbsp;255,&nbsp;255]</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Buttons and Tooltips">

<table>
<thead>
	<tr>
		<th>Key</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`openButtonBackgroundColor`</td>
		<td>Background color of the HUD button on the right side of the screen used to open selfie mode (`Datatype.Color3`).</td>
		<td>[255,&nbsp;255,&nbsp;255]</td>
	</tr>
	<tr>
		<td>`openButtonIconColor`</td>
		<td>Color of the HUD button's camera icon (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`closeButtonBackgroundColor`</td>
		<td>Background color of the "close" button (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`closeButtonIconColor`</td>
		<td>Icon color for the "close" button (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`actionButtonBackgroundColor`</td>
		<td>Background color of the various action buttons used for toggling actions (`Datatype.Color3`).</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`actionButtonIconColor`</td>
		<td>Icon color for the various action buttons (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`tooltipBackgroundColor`</td>
		<td>Background color of tooltips and notifications (`Datatype.Color3`).</td>
		<td>[0, 0, 0]</td>
	</tr>
	<tr>
		<td>`tooltipNameColor`</td>
		<td>Text color of tooltip names (`Datatype.Color3`). Also used as the text color for notifications.</td>
		<td>[255, 255, 255]</td>
	</tr>
	<tr>
		<td>`tooltipDescriptionColor`</td>
		<td>Color of tooltip descriptions, slightly faded to give focus to tooltip names (`Datatype.Color3`). Not used for notifications.</td>
		<td>[169, 169, 169]</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

```lua title='LocalScript' highlight=''
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.setTheme({
	textSize = 20,
	font = Enum.Font.Michroma,
	backgroundColor = Color3.fromRGB(0, 40, 75),
})
```

#### setEnabled

<figcaption>
setEnabled(isEnabled: `boolean`)
</figcaption>

Sets whether selfie mode is enabled or not. When disabled, all UI for the module is removed and all events are disconnected. This function can only be called from a `Class.LocalScript`.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.setEnabled(false)
```

### Events

#### selfieModeOpened

Fires when the player opens selfie mode or when [openSelfieMode](#openselfiemode) is called. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.selfieModeOpened:Connect(function()
	print("Selfie mode open")
end)
```

#### selfieModeClosed

Fires when the player closes selfie mode or when [closeSelfieMode](#closeselfiemode) is called. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.selfieModeClosed:Connect(function()
	print("Selfie mode closed")
end)
```

#### actionActivated

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>action: [SelfieMode.Action](#action)</td>
		<td>The activated [Action](#action).</td>
	</tr>
</tbody>
</table>

Fires when an action is activated; this may be one of the primary actions like [Depth&nbsp;of&nbsp;Field](#depth-of-field), [Lock&nbsp;Gaze](#lock-gaze), or [Hide&nbsp;Others](#hide-others); alternatively it may be a sub-action like a [filter](#filter) or [pose](#pose). The connected function receives the activated [Action](#action). This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.actionActivated:Connect(function(action)
	print(action.name, "activated")
end)
```

#### actionDeactivated

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>action: [SelfieMode.Action](#action)</td>
		<td>The deactivated [Action](#action).</td>
	</tr>
</tbody>
</table>

Fires when a primary action or sub-action is deactivated. The connected function receives the deactivated [Action](#action). This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.actionDeactivated:Connect(function(action)
	print(action.name, "deactivated")
end)
```

#### filterChanged

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>newFilter: `Library.string`</td>
		<td>The new filter.</td>
	</tr>
	<tr>
		<td>oldFilter: `Library.string`</td>
		<td>The previous filter.</td>
	</tr>
</tbody>
</table>

Fires when a [filter](#filter) is applied or removed. The connected function receives the new filter name and the old filter name. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.filterChanged:Connect(function(newFilter, oldFilter)
	print("Filter changed from", oldFilter, "to", newFilter)
end)
```

#### poseChanged

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>newPose: `Library.string`</td>
		<td>The new pose.</td>
	</tr>
	<tr>
		<td>oldPose: `Library.string`</td>
		<td>The previous pose.</td>
	</tr>
</tbody>
</table>

Fires when a [pose](#pose) is applied or removed. The connected function receives the new pose name and the old pose name. This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SelfieMode = require(ReplicatedStorage:WaitForChild("SelfieMode"))

SelfieMode.poseChanged:Connect(function(newPose, oldPose)
	print("Pose changed from", oldPose, "to", newPose)
end)
```
