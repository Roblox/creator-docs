---
title: Emote Bar
description: The Emote Bar module aims to provide players an accessible, customizable way to socially interact.
---

Emotes are a core component of any social experience. The **EmoteBar** [developer module](../../resources/modules/index.md) aims to provide players an accessible, customizable way to facilitate meaningful social interaction.

<video src="../../assets/developer-modules/emote-bar/Showcase.mp4" controls width="100%"></video>

## Module Usage

### Installation

To use the **EmoteBar** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Emote Bar** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/emote-bar/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **EmoteBar** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/emote-bar/Move-Package.png" width="320" />

### Configuration

The module is preconfigured with 7 emotes and it can be easily customized with your own emotes and display options. Additionally, if the player owns any emotes from previous Roblox events such as Lil Nas X, Royal Blood, or Twenty One Pilots, those emotes will be automatically added to the list of available emotes.

1. In **ServerScriptService**, create a new `Class.Script` and rename it **ConfigureEmotes**.

   <img src="../../assets/developer-modules/emote-bar/Script-ConfigureEmotes.png" width="320" />

2. Paste the following code into the new **ConfigureEmotes** script. The `useDefaultEmotes` setting of `false` overrides the default emotes and lets you define custom emotes via the [setEmotes](#setemotes) function.

   ```lua title='Script - ConfigureEmotes' highlight='6,9'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

   EmoteBar.configureServer({
   	useDefaultEmotes = false,
   })

   EmoteBar.setEmotes({
   	{
   		name = "Hello",
   		animation = "rbxassetid://3344650532",
   		image = "rbxassetid://7719817462",
   		defaultTempo = 1,
   	},
   	{
   		name = "Applaud",
   		animation = "rbxassetid://5915693819",
   		image = "rbxassetid://7720292217",
   		defaultTempo = 2,
   	},
   })
   ```

<Alert severity="info">
<p>If you want to disable loading of user-owned emotes into the emote bar or wheel, make sure the **UserEmotesEnabled** property is disabled for the **StarterPlayer** object. Note that this property can only be set in Studio and cannot be set by scripts at runtime.</p>
<p>Also note that this developer module will modify the local user's emotes via `Class.HumanoidDescription:SetEmotes()`, meaning that calls to `Class.HumanoidDescription:GetEmotes()` will return values modified by this module.</p>
</Alert>

### Mega Emotes

A **mega emote** is formed when multiple players in the same area perform the same emote at the same time. As more and more players join in, the mega emote grows larger. As players stop performing the emote, the mega emote grows smaller until eventually it disappears.

<img src="../../assets/developer-modules/emote-bar/Mega-Emote.jpg" width="80%" />

### Tempo

An emote's **tempo** is the speed at which it plays when its button is tapped once. The default speed of an emote is determined by its `defaultTempo`. An emote's speed can be increased or decreased by tapping its button faster or slower.

## API Reference

### Types

#### Emote

Each emote is represented by a dictionary with the following key-value pairs:

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
		<td>Emote name, for example `"Shrug"`.</td>
	</tr>
	<tr>
		<td>`animation`</td>
		<td>string</td>
		<td>Asset ID for the emote's animation.</td>
	</tr>
	<tr>
		<td>`image`</td>
		<td>string</td>
		<td>Asset ID for the emote's image in the GUI.</td>
	</tr>
	<tr>
		<td>`defaultTempo`</td>
		<td>number</td>
		<td>Default speed factor at which to play the emote animation. For example, a tempo of 2 will play the animation at twice its normal speed. Must be greater than 0.</td>
	</tr>
	<tr>
		<td>`isLocked`</td>
		<td>bool</td>
		<td>Whether the emote is "locked" from being activated.</td>
	</tr>
</tbody>
</table>

### Enums

#### EmoteBar.GuiType

<table>
<thead>
	<tr>
		<th>Name</th>
		<th>Summary</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`EmoteBar`</td>
		<td>Default form where emotes are displayed in a bar along the bottom of the screen, separated into individual "pages."</td>
	</tr>
	<tr>
		<td>`EmoteWheel`</td>
		<td>Variant where emotes are displayed in a ring when a player clicks or taps on their player character.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.configureClient({
	guiType = EmoteBar.GuiType.EmoteWheel,
})
```

### Functions

#### configureServer

<figcaption>
configureServer(config: `Library.table`)
</figcaption>

Overrides default server-side configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.Script` and changes will automatically replicate to all clients.

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
		<td>`useDefaultEmotes`</td>
		<td>Whether the provided default emotes are included or not.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`useMegaEmotes`</td>
		<td>Enables or disables the [mega emotes](#mega-emotes) feature.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`emoteMinPlayers`</td>
		<td>Minimum number of players performing the same emote to contribute to a mega emote.</td>
		<td>3</td>
	</tr>
	<tr>
		<td>`emoteMaxPlayers`</td>
		<td>Maximum number of players performing the same emote to contribute to a mega emote.</td>
		<td>50</td>
	</tr>
	<tr>
		<td>`playParticles`</td>
		<td>Enables or disables the emotes players are playing as floating particles above their heads.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`sendContributingEmotes`</td>
		<td>Enables or disables sending a small emote icon to contribute to the mega emote.</td>
		<td>true</td>
	</tr>
</tbody>
</table>

```lua title='Script' highlight='5-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.configureServer({
	emoteMinPlayers = 2,
	playParticles = false,
})
```

#### configureClient

<figcaption>
configureClient(config: `Library.table`)
</figcaption>

Overrides default client-side configuration options through the following keys/values in the `config` table. This function can only be called from a `Class.LocalScript`. Depending on the value of `guiType`, options in the noted tabs also apply.

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
		<td>`guiType`</td>
		<td>Controls which form the GUI will take for displaying emotes ([EmoteBar.GuiType](#emotebarguitype)).</td>
		<td>[EmoteBar](#emotebarguitype)</td>
	</tr>
	<tr>
		<td>`useTempo`</td>
		<td>Enables or disables the [tempo](#tempo) feature where users are able to control how fast or slow their emotes are played by repeatedly activating the same emote rhythmically.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`tempoActivationWindow`</td>
		<td>Amount of time, in seconds, the user has between sequential activations of an emote for it to count as part of the tempo.</td>
		<td>3</td>
	</tr>
	<tr>
		<td>`lockedImage`</td>
		<td>Image to display overtop locked emotes.</td>
		<td>"rbxassetid://6905802778"</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Bar">
If the value of `guiType` is [EmoteBar](#emotebarguitype) (default), the following options apply:

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
		<td>`maxEmotesPerPage`</td>
		<td>Maximum number of emotes that are displayed at a time. Smaller screens will automatically show fewer emotes.</td>
		<td>4</td>
	</tr>
	<tr>
		<td>`emoteBarPosLandscape`</td>
		<td>Position of the emote bar in landscape mode (`Datatype.UDim2`).</td>
		<td>(0.5, 0, 1, -16)</td>
	</tr>
	<tr>
		<td>`emoteBarPosPortrait`</td>
		<td>Position of the emote bar in portrait mode (`Datatype.UDim2`).</td>
		<td>(0.5, 0, 1, -100)</td>
	</tr>
	<tr>
		<td>`useEmoteHotkeys`</td>
		<td>Whether emote hotkeys are used. If `true`, this binds 1,&nbsp;2,&nbsp;3,&nbsp;4,&nbsp;etc. as hotkeys for the emote bar. Only numeric keys 1&ndash;9 are supported.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`usePageHotkeys`</td>
		<td>Whether page hotkeys are used. If `true`, `nextPageKey` and `prevPageKey` are used to cycle between pages.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`prevPageKey`</td>
		<td>Key used to cycle to the previous page of emotes (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|Q`</td>
	</tr>
	<tr>
		<td>`nextPageKey`</td>
		<td>Key used to cycle to the next page of emotes (`Enum.KeyCode`).</td>
		<td>`Enum.KeyCode|E`</td>
	</tr>
	<tr>
		<td>`leftArrowImage`</td>
		<td>Image for the left arrow (previous page).</td>
		<td>"rbxassetid://6998633654"</td>
	</tr>
	<tr>
		<td>`rightArrowImage`</td>
		<td>Image for the right arrow (next page).</td>
		<td>"rbxassetid://6998635824"</td>
	</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Wheel">
If the value of `guiType` is [EmoteWheel](#emotebarguitype), the following options apply:

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
		<td>`closeImage`</td>
		<td>Image for the close button on the emote wheel, placed overtop the `closeBackgroundImage` image.</td>
		<td>"rbxassetid://7027440823"</td>
	</tr>
	<tr>
		<td>`closeBackgroundImage`</td>
		<td>Background image for the close button on the emote wheel.</td>
		<td>"rbxassetid://7027440823"</td>
	</tr>
	<tr>
		<td>`emoteHoverImage`</td>
		<td>Image for hover-over indication of the selected emote in the wheel.</td>
		<td>"rbxassetid://7344843157"</td>
	</tr>
</tbody>
</table>

</TabItem>
</Tabs>

```lua title='LocalScript - Emote Bar' highlight='5-10'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.configureClient({
	guiType = EmoteBar.GuiType.EmoteBar,
	maxEmotesPerPage = 6,
	nextPageKey = Enum.KeyCode.Z,
	prevPageKey = Enum.KeyCode.C,
})
```

```lua title='LocalScript - Emote Wheel' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.configureClient({
	guiType = EmoteBar.GuiType.EmoteWheel,
})
```

#### setEmotes

<figcaption>
setEmotes(emotes: `Library.table`)
</figcaption>

Sets the custom emotes to use. These will be added to the defaults if `useDefaultEmotes` is `true`, or replace the defaults if `useDefaultEmotes` is `false`. This function can only be called from a `Class.Script` and changes will automatically replicate to all clients.

See [Emote](#emote) for the structure of each emote passed to this function.

<Alert severity="info">
The order of custom emotes in the array determines how each emote is ordered in the UI.
</Alert>

```lua title='Script - ConfigureEmotes' highlight='5,9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.configureServer({
	useDefaultEmotes = false,
})

EmoteBar.setEmotes({
	{
		name = "Hello",
		animation = "rbxassetid://3344650532",
		image = "rbxassetid://7719817462",
		defaultTempo = 1,
	},
	{
		name = "Applaud",
		animation = "rbxassetid://5915693819",
		image = "rbxassetid://7720292217",
		defaultTempo = 2,
	},
})
```

#### setGuiVisibility

<figcaption>
setGuiVisibility(visible: `boolean`)
</figcaption>

Shows or hides the emotes GUI. This function can only be called from a `Class.LocalScript` on a specific client.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.setGuiVisibility(false)
```

#### getEmote

<figcaption>
getEmote(emoteName: `Library.string`): `Library.table`
</figcaption>

Gets an [Emote](#emote) by name. Returns `nil` if the emote cannot be found. This function can only be called from a `Class.LocalScript` on a specific client.

<Alert severity="info">
Emotes registered on the server with [setEmotes](#setemotes) can be retrieved client-side using this function. This can also be used to retrieve any of the default emotes by name: `"Hello"`, `"Applaud"`, `"Point"`, `"Stadium"`, `"Tilt"`, `"Shrug"`, or `"Salute"`.
</Alert>

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

local shrug = EmoteBar.getEmote("Shrug")
```

#### playEmote

<figcaption>
playEmote(emote: [Emote](#emote))
</figcaption>

Plays the given [Emote](#emote) and fires the [emotePlayed](#emoteplayed) event on the server, if connected. This function can only be called from a `Class.LocalScript` on a specific client.

```lua title='LocalScript' highlight='5-6'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

local shrug = EmoteBar.getEmote("Shrug")
EmoteBar.playEmote(shrug)
```

#### lockEmote

<figcaption>
lockEmote(emoteName: `Library.string`)
</figcaption>

Locks the [Emote](#emote) with the given name. This function can only be called from a `Class.LocalScript` on the client.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.lockEmote("Applaud")
```

#### unlockEmote

<figcaption>
unlockEmote(emoteName: `Library.string`)
</figcaption>

Unlocks the [Emote](#emote) with the given name. This function can only be called from a `Class.LocalScript` on the client.

```lua title='LocalScript' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.unlockEmote("Applaud")
```

### Events

#### emotePlayed

Fires when any client plays an emote. This event can only be connected in a `Class.LocalScript`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>player: `Class.Player`</td>
		<td>Player who acted out the emote.</td>
	</tr>
	<tr>
		<td>emote: [Emote](#emote)</td>
		<td>Emote which was played.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.emotePlayed:Connect(function(player, emote)
	print(player.Name, "played", emote.name)
end)
```

#### lockedEmoteActivated

Fires when a client clicks a locked emote. This event can only be connected in a `Class.LocalScript`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>emote: [Emote](#emote)</td>
		<td>Locked emote which was activated.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='6-8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local EmoteBar = require(ReplicatedStorage:WaitForChild("EmoteBar"))

EmoteBar.lockedEmoteActivated:Connect(function(emote)
	print(Players.LocalPlayer, "clicked", emote.name)
end)
```
