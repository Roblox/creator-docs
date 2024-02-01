---
title: Social Interactions
description: The Social Interactions module lets avatars better express themselves and their natural movements.
---

Your avatar is your identity in any space you enter. The **SocialInteractions** [developer module](../../resources/modules/index.md) lets each user better express themselves and their natural movements, adding a touch of realism to the experience.

This module includes the following features:

<table>
 <tbody>
	<tr>
		<td>**Body&nbsp;Orientation**</td>
		<td>Makes the head of everyone's avatar face where their corresponding user's camera is pointing, through a mix of neck and waist rotation. This provides a subtle cue as to who or what someone else is interacting with.</td>
	</tr>
	<tr>
		<td>**Chat&nbsp;Animations**</td>
		<td>Adds some liveliness to the in-experience chat by making avatars occasionally play animations, depending on the content of the messages they send. The list of "trigger&nbsp;words" that activate each animation is configurable.</td>
	</tr>
</tbody>
</table>

<video src="../../assets/developer-modules/social-interactions/Showcase.mp4" controls width="100%"></video>

<Alert severity="warning">
The body orientation feature uses `Datatype.CFrame` adjustment of the **Neck** and **Waist** joints on the character, meaning that custom rigs must include `Class.Motor6D` objects of the same name for the module to work properly.
</Alert>

## Module Usage

### Installation

To use the **SocialInteractions** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Social Interactions** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/social-interactions/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **SocialInteractions** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/social-interactions/Move-Package.png" width="320" />

### Configuration

Simply inserting the **SocialInteractions** module will enable both the **body orientation** and **chat animations** features inside your place. To adjust the default behavior:

1. In **StarterPlayerScripts**, create a new `Class.LocalScript` and rename it to **ConfigureSocialInteractions**.

   <img src="../../assets/developer-modules/social-interactions/LocalScript-ConfigureSocialInteractions.png" width="320" />

1. Paste the following code into the new script, using the [configure](#configure) function to customize the module's behavior.

   ```lua title='LocalScript' highlight='6-9'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local SocialInteractions = require(ReplicatedStorage:WaitForChild("SocialInteractions"))

   -- Make waist rotation more pronounced and disable the chat animations feature
   SocialInteractions.configure({
   	waistOrientationWeight = 0.75,
   	useChatAnimations = false,
   })
   ```

### Chat Animation Trigger Words

The list of "trigger words" that activate each chat animation is configurable and Lua string patterns are utilized to increase recognizable words. For example, one combination used by the **Wave** animation is `he+y+o*`, meaning that `hey`, `heyyy`, `heyo`, `heyyyyo`, `heeeeyyyyo`, and other variations qualify to trigger the animation.

Also note that trigger words are **case-insensitive**, so typing `hey` is the same as `HEY`, `Hey`, and other variations.

<table>
<thead>
	<tr>
		<th>Animation</th>
		<th>Animation&nbsp;ID</th>
		<th>Word Patterns</th>
	</tr>
</thead>
<tbody>
<tr>
<td>Wave</td>
<td>`3344650532`</td>
<td>
`hell+o+`&nbsp;&nbsp;&nbsp;
`h+i+o*`&nbsp;&nbsp;&nbsp;
`wa+[sz]+u+p+`&nbsp;&nbsp;&nbsp;
`y+o+`&nbsp;&nbsp;&nbsp;
`greetings*`&nbsp;&nbsp;&nbsp;
`salutations*`&nbsp;&nbsp;&nbsp;
`goo+d+%smorning+`&nbsp;&nbsp;&nbsp;
`he+y+o*`&nbsp;&nbsp;&nbsp;
`howdy+`&nbsp;&nbsp;&nbsp;
`what's*%s*up+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr>
<td>Applaud</td>
<td>`5911729486`</td>
<td>
`ya+y+`&nbsp;&nbsp;&nbsp;
`h[ou]+r+a+y+`&nbsp;&nbsp;&nbsp;
`woo+t*`&nbsp;&nbsp;&nbsp;
`woo+h+oo+`&nbsp;&nbsp;&nbsp;
`bravo+`&nbsp;&nbsp;&nbsp;
`congratulations+`&nbsp;&nbsp;&nbsp;
`congrats+`&nbsp;&nbsp;&nbsp;
`gg`&nbsp;&nbsp;&nbsp;
`pog+`&nbsp;&nbsp;&nbsp;
`poggers+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr>
<td>Agree</td>
<td>`4841397952`</td>
<td>
`ye+s*`&nbsp;&nbsp;&nbsp;
`ye+a+h*`&nbsp;&nbsp;&nbsp;
`y[eu]+p+`&nbsp;&nbsp;&nbsp;
`o+k+`&nbsp;&nbsp;&nbsp;
`o+k+a+y+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr>
<td>Disagree</td>
<td>`4841401869`</td>
<td>
`no+`&nbsp;&nbsp;&nbsp;
`no+pe+`&nbsp;&nbsp;&nbsp;
`yi+ke+s+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr>
<td>Shrug</td>
<td>`3334392772`</td>
<td>
`not+%s+sure+`&nbsp;&nbsp;&nbsp;
`idk+`&nbsp;&nbsp;&nbsp;
`don't%s+know+`&nbsp;&nbsp;&nbsp;
`i%s+don't%s+know+`&nbsp;&nbsp;&nbsp;
`who+%s+knows+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr>
<td>Laugh</td>
<td>`3337966527`</td>
<td>
`lo+l+`&nbsp;&nbsp;&nbsp;
`rof+l+`&nbsp;&nbsp;&nbsp;
`ha[ha]*`&nbsp;&nbsp;&nbsp;
`he[he]+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
<tr>
<td>Sleep</td>
<td>`4686925579`</td>
<td>
`zzz+`&nbsp;&nbsp;&nbsp;
`yawn+`&nbsp;&nbsp;&nbsp;
</td>
</tr>
</tbody>
</table>

The list of trigger words that activate each animation is configurable, and additional animations can be added via the [setTriggerWordsForChatAnimation](#settriggerwordsforchatanimation) function. For example, the following `Class.LocalScript` links the [Tilt](https://www.roblox.com/catalog/3360692915/Tilt) animation with the string pattern of `cra+zy` to support trigger words like `crazy` and `craaaaaazy`. It also registers an additional string pattern of `coo+l` for the [Applaud](https://www.roblox.com/catalog/5915779043/Applaud) animation to support words like `cool` and `coooool`.

```lua title='LocalScript' highlight='6, 9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SocialInteractions = require(ReplicatedStorage:WaitForChild("SocialInteractions"))

-- Register string pattern for the "Tilt" animation
SocialInteractions.setTriggerWordsForChatAnimation("rbxassetid://3334538554", {"cra+zy"})

-- Register additional string pattern for the "Applaud" animation
SocialInteractions.setTriggerWordsForChatAnimation("rbxassetid://5911729486", {"coo+l"})
```

## API Reference

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
		<td>`useBodyOrientation`</td>
		<td>Toggles the **body&nbsp;orientation** feature.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`waistOrientationWeight`</td>
		<td>Body orientation uses a mix of waist and neck rotation; this parameter determines which of the two is prevalent. A value of 1 places complete emphasis on the waist while 0 places complete emphasis on the neck.</td>
		<td>0.5</td>
	</tr>
	<tr>
		<td>`useChatAnimations`</td>
		<td>Toggles the **chat&nbsp;animations** feature.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`useDefaultTriggerWordsForChatEmotes`</td>
		<td>Chat animations comes with a default list of [trigger&nbsp;words](#chat-animation-trigger-words). Set this parameter to `false` if you'd like to turn them off and provide your own.</td>
		<td>true</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='6-9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SocialInteractions = require(ReplicatedStorage:WaitForChild("SocialInteractions"))

-- Make waist rotation more pronounced and disable the chat animations feature
SocialInteractions.configure({
	waistOrientationWeight = 0.75,
	useChatAnimations = false,
})
```

#### setTriggerWordsForChatAnimation

<figcaption>
setTriggerWordsForChatAnimation(animationId: `Library.string`, triggerWords: `Library.table`)
</figcaption>

Registers a new animation in the chat animation feature. Typing any word that matches a string pattern included in the `triggerWords` table will activate the animation whose ID is passed as the first parameter.

Note that trigger words are **case-insensitive** to players, so a pattern of `woah` will accept chat phrases of `woah`, `WOAH`, `Woah`, and other variations.

```lua title='LocalScript' highlight='6-9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SocialInteractions = require(ReplicatedStorage:WaitForChild("SocialInteractions"))

-- Register new string pattern for a custom animation
SocialInteractions.setTriggerWordsForChatAnimation(
	"rbxassetid://3334538554",
	{"cra+zy", "woah+"}
)
```

### Events

#### onChatAnimationPlayed

Fires when a chat animation plays. The connected function receives the animation ID and the word that triggered the animation as its arguments. This event can only be connected in a `Class.LocalScript`.

<table size="small">
<thead>
	<tr>
		<th colspan='2'>Parameters</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>animationId: `Library.string` </td>
		<td>Animation ID that played.</td>
	</tr>
	<tr>
		<td>triggerWord: `Library.string`</td>
		<td>Chat word that triggered the animation.</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-7'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SocialInteractions = require(ReplicatedStorage:WaitForChild("SocialInteractions"))

SocialInteractions.onChatAnimationPlayed:Connect(function(animationId, triggerWord)
	print(animationId, triggerWord)
end)
```
