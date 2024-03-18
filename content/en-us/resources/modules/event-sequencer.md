---
title: Event Sequencer
description: Event Sequencer is a powerful framework for building live, cross-server events and cutscenes.
---

**EventSequencer** is a powerful framework that enables you to build live, cross-server events and cutscenes on a structured sequence of actions and triggers. More specifically, this module helps you:

- Build an event or cutscene on a structured framework through scheduled configurations of audio, animations, and tweens.
- Transition between multiple scenes across multiple servers, synchronizing complex animations and visuals to a timeline.
- Seek through an event and preview the experience for testing and development purposes.

This framework has been battle tested in Roblox events like the [Twenty One Pilots](https://www.youtube.com/watch?v=0fAhhoXK12o) and [24kGoldn](https://www.youtube.com/watch?v=UfzqGkfRKr4) concerts, as well as many highly visited experiences.

<figure>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/0fAhhoXK12o" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

To see **EventSequencer** in action within an editable place, check out the [Concert](https://www.roblox.com/games/10275826693/Concert) template in Roblox Studio. This template is a comprehensive starting point for developers to create events/concerts and familiarize themselves with the various features and components involved.

<img src="../../assets/developer-modules/event-sequencer/Edit-Concert-Template.png" width="540" />

## Module Usage

### Installation

To use the **EventSequencer** framework in an experience:

1. From the [View](../../studio/view-tab.md), open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Event Sequencer** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/event-sequencer/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **EventSequencer** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/event-sequencer/Move-Package.png" width="320" />

### Framework Modes

#### Replace Mode

The default framework mode is **replace mode** in which you design unique [scenes](#creating-scenes) by placing [3D objects](../../parts/index.md), [terrain](../../parts/terrain.md), [lighting properties](../../environment/lighting.md), [environmental effects](../../environment/index.md#environment), and [user interface](../../ui/index.md) objects into that scene's **Environment** folder. When a scene loads, those objects and properties get distributed into `Class.Workspace`, `Class.Terrain`, and `Class.Lighting`, **replacing** existing objects/properties to form a cloned space.

<Alert severity="success">
This mode is best for **new** event experiences consisting of multiple sequential scenes, such as a pre-show venue to the main concert to a post-show party.
</Alert>

#### Inline Mode

An alternate framework mode is **inline mode** in which you similarly design unique [scenes](#creating-scenes) with scripting logic for their flow/events, but the framework will **not** destroy existing [3D objects](../../parts/index.md), [terrain](../../parts/terrain.md), [lighting properties](../../environment/lighting.md), [environmental effects](../../environment/index.md#environment), and [user interface](../../ui/index.md) objects in order to clone assets/properties from a scene's **Environment** folder upon loading.

<Alert severity="success">
This mode is best for existing experiences, as it preserves the design and layout of your place while letting you orchestrate events such as cutscenes.
</Alert>

To enable inline mode:

1. Inside the **EventSequencer** model that you placed in **ServerScriptService**, drill down and select the **Inline** value inside the **ReplicatedStorage** folder.

   <img src="../../assets/developer-modules/event-sequencer/Inline-BoolValue.png" width="320" />

2. In the [Properties](../../studio/properties.md) window, toggle on its **Value** checkbox.

   <img src="../../assets/developer-modules/event-sequencer/Inline-BoolValue-Enabled.png" width="320" />

### Creating Scenes

A **scene** is essentially part of an overall event or a cutscene wrapped up in a series of folders. Each scene contains scripting logic that defines its flow/events, and a scene can store its own [3D objects](../../parts/index.md), [terrain](../../parts/terrain.md), [lighting properties](../../environment/lighting.md), [environmental effects](../../environment/index.md#environment), and [user interface](../../ui/index.md) objects.

To get started quickly, you can find an empty scene inside the module's main folder:

1. Expand the **EventSequencer** folder and locate the **BlankScene** folder.

   <img src="../../assets/developer-modules/event-sequencer/BlankScene-Folder.png" width="320" />

2. Move or copy the entire **BlankScene** folder into **ReplicatedStorage**.

   <img src="../../assets/developer-modules/event-sequencer/ReplicatedStorage-BlankScene-Folder.png" width="320" />

   <Alert severity="warning">
   While developing an event, you can alternatively place scenes elsewhere in the [Explorer](../../studio/explorer.md) hierarchy and tag them with **SequencerScene** using the [Tags](../../studio/properties.md#instance-tags) section of their properties, or Studio's [Tag&nbsp;Editor](../../studio/view-tab.md#windows-and-tools) (**BlankScene** is already tagged as such). However, you'll need to move all event-ready scenes to **ReplicatedStorage** in order for them to work within the overall event flow.
   </Alert>

#### Time Length

Each scene should have a **time length**, in seconds, defining its duration &mdash; just like a movie or concert has a set duration. Time length is defined as a numeric [attribute](../../studio/properties.md#instance-attributes) on the scene's folder named **TimeLength** which you can set directly in Studio or programmatically through `Class.Instance:SetAttribute()`.

<Grid container spacing={3}>
<Grid item>
<img src="../../assets/developer-modules/event-sequencer/ReplicatedStorage-BlankScene-Folder.png" width="320" />
</Grid>
<Grid item>
<img src="../../assets/developer-modules/event-sequencer/Scene-Attribute-TimeLength.png" width="320" />
</Grid>
</Grid>

#### Environment

A scene's **Environment** folder contains everything that users see and hear, including [3D objects](../../parts/index.md), [terrain](../../parts/terrain.md), [lighting properties](../../environment/lighting.md) and [environmental effects](../../environment/index.md#environment), and [user interface](../../ui/index.md) objects. When a scene loads, those objects and properties get distributed into `Class.Workspace`, `Class.Terrain`, and `Class.Lighting`, replacing existing objects/properties to form a cloned space.

<Alert severity="warning">
This folder is not intended for usage with [Inline Mode](#inline-mode), as that mode expects you to use existing assets and global property settings for the place, not load in scene-specific assets/properties.
</Alert>

The **Environment** folder contains the following containers:

<table>
<thead>
	<tr>
		<th>Container</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Client**</td>
		<td>Contains all assets to load when any user (client) joins the event, such as [user interface](../../ui/index.md) objects or an animation rig.</td>
	</tr>
	<tr>
		<td>**PlayerSpawns**</td>
		<td>Contains parts where users spawn upon joining. Any part in this folder behaves similar to a `Class.SpawnLocation`.</td>
	</tr>
	<tr>
		<td>**Server**</td>
		<td>Contains all assets to load when a scene is first created on a server. It's recommended that most visual assets go here.</td>
	</tr>
	<tr>
		<td>**Terrain**</td>
		<td>Contains scene terrain.</td>
	</tr>
	<tr>
		<td>**Lighting**</td>
		<td>Contains global [lighting properties](../../environment/lighting.md) as attributes, as well as modifiers like [atmospheric effects](../../environment/atmosphere.md) and [post-processing](../../environment/post-processing-effects.md) effects.</td>
	</tr>
</tbody>
</table>

#### Events

A scene's **Events** folder is purely a placeholder for `Class.RemoteEvent|RemoteEvents` that communicate between the [Client](#client) and [Server](#server) modules. It's not a requirement to place anything in this folder.

#### Client

This script executes [schema](#scene-schemas) logic on the client.

#### Server

This script executes [schema](#scene-schemas) logic on the server.

### Scene Schemas

A scene's **schema** defines what happens at what point in the scene's timeline. You should define a scene's schema in both its [Client](#client) and [Server](#server) modules and include **lifecycle hooks** to manage when **configurations** occur.

#### Lifecycle Hooks

Schema [lifecycle hooks](#schema-lifecycle-hooks) let you manage when scene operations occur. A scene in production will typically run in the most simple flow:

- [OnSetup](#onsetup)&nbsp;&rarr; [OnRun](#onrun)&nbsp;&rarr; [OnEndScene](#onendscene)

[OnRun](#onrun) may be interrupted when seeking:

- [OnSetup](#onsetup)&nbsp;&rarr; [OnRun](#onrun)&hellip;&nbsp;**seek**&nbsp;&rarr; [OnRun](#onrun)&hellip;&nbsp;**seek**&nbsp;&rarr; [OnRun](#onrun)&nbsp;&rarr; [OnEndScene](#onendscene)

All three hooks can also repeat if the scene is replayed:

- [OnSetup](#onsetup)&nbsp;&rarr; [OnRun](#onrun)&nbsp;&rarr; [OnEndScene](#onendscene)&hellip;&nbsp;**replay**&nbsp;&rarr; [OnSetup](#onsetup)&nbsp;&rarr; [OnRun](#onrun)&nbsp;&rarr; [OnEndScene](#onendscene)

#### Configurations

Schema [configurations](#schema-configurations) define the core operations of a scene, for example [playing audio](#audio) at 00:32, queuing an [animation](#animate) to sync with that audio, [scheduling a scene event](#schedule) like a fireworks show, and more. Every configuration supports certain callback functions where the first parameter (`self`) is the configuration instance.

<Alert severity="info">
You can use configurations in both the [Client](#client) and [Server](#server) module schemas, but it's recommended that you perform operations like [audio](#audio) and [animations](#animate) on the client side, just like in a typical experience.
</Alert>

### Seeking Scenes

A unique feature of **EventSequencer** is the ability to "seek" around scenes as you might seek through a video. In [Replace Mode](#replace-mode), you can also switch between scenes to preview an entire multi-scene event before deploying it to production.

<video src="../../assets/developer-modules/event-sequencer/Seek-Bar.mp4" controls width="800"></video>

**Scene seeking is not accessible to everybody** since users simply enjoying the event should not have the ability to control its time flow. Instead, you must grant seeking permission based on the event's `Class.DataModel.PlaceId|PlaceId` as well as specific `Class.Player.UserId|UserIds` and/or [groups](../../projects/groups.md) and roles within them.

1. Create a new `Class.Script` within `Class.ServerScriptService`.
1. Paste the following code into the new script.

   ```lua title='Script - Set Seeking Permissions'
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

   EventSequencer.setSeekingPermissions({
   	placeIDs = {},
   	userIDs = {},
   	groups = {
   		{GroupID = , MinimumRankID = },
   	}
   })
   ```

1. Fill in the following tables within the [setSeekingPermissions](#setseekingpermissions) call as follows:

   <table>
   <tbody>
    <tr>
   <td>`placeIDs`</td>
   <td>Comma-delimited list of `Class.DataModel.PlaceId|PlaceId` values to support seeking within.</td>
    </tr>
    <tr>
   <td>`userIDs`</td>
   <td>Comma-delimited list of `Class.Player.UserId|UserIds` for those who can seek within the supported places.</td>
    </tr>
    <tr>
   <td>`groups`</td>
   <td>Comma-delimited list of tables, each containing a [group](../../projects/groups.md) ID and the minimum rank of that group's members who can seek within the supported places.</td>
    </tr>
   </tbody>
   </table>

## Scene Manager Plugin

The [Scene Manager](https://www.roblox.com/library/9995053698/Scene-Manager) plugin is a useful tool for loading and unloading scenes, [lighting](#saving-and-loading-lighting), and [terrain](#saving-and-loading-terrain). Unless you're using [Inline Mode](#inline-mode), it's highly recommended that you use this plugin instead of manually placing/editing scene objects and properties.

<Alert severity="warning">
This plugin is not intended for usage with [Inline Mode](#inline-mode), as that mode expects you to use existing assets and global property settings for the place, not load in scene-specific assets/properties from the scene's [Environment](#environment) folder.
</Alert>

To install the plugin:

1. From Studio's **View** menu, open the **Toolbox**.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

2. With the **Creator Store** tab selected, select **Plugins** from the dropdown menu.

   <img src="../../assets/studio/toolbox/Creator-Store-Plugins.png" width="360" />

3. In the search field, type **Scene Manager** and press <kbd>Enter</kbd> to locate the plugin.

   <img src="../../assets/studio/toolbox/Creator-Store-Scene-Manager-Plugin.png" width="360" />

4. Click the plugin's icon to view its details and then click the **Install** button.
5. Once the plugin is installed, it appears in Studio's [Plugins](../../studio/plugins-tab.md) tab.

### Loading and Unloading Scenes

As outlined in [Creating Scenes](#creating-scenes), a scene's **Environment** folder contains everything that users see and hear, including [3D objects](../../parts/index.md). The plugin helps you quickly load a scene's assets into or out of organized folders within the workspace.

<Alert severity="error">
Scenes must be tagged with **SequencerScene** for the plugin to recognize them (**BlankScene** is already tagged as such). A tool such as the **Tag&nbsp;Editor**, accessible from the [View](../../studio/view-tab.md) tab, may be helpful. If you've created a scene but it doesn't appear in the plugin, make sure that it's tagged, then save and reopen the place.
</Alert>

<table>
<thead>
	<tr>
		<th>Plugin Action</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Load Client**</td>
		<td>If the scene's client content is unloaded, moves its **Environment**/**Client** folder into the **Workspace**/**ScenesClient** folder.</td>
	</tr>
	<tr>
		<td>**Load Server**</td>
		<td>If the scene's server content is unloaded, moves its **Environment**/**Server** folder into the **Workspace**/**ScenesServer** folder.</td>
	</tr>
	<tr>
		<td>**Unload Client**</td>
		<td>If the scene's client content is loaded, moves its **Client** folder from **Workspace**/**ScenesClient** back to the **[Scene]**/**Environment** folder.</td>
	</tr>
	<tr>
		<td>**Unload Server**</td>
		<td>If the scene's server content is loaded, moves its **Server** folder from **Workspace**/**ScenesServer** back to the **[Scene]**/**Environment** folder.</td>
	</tr>
	<tr>
		<td>**Unload All Scenes**</td>
		<td>Moves every loaded scene's **Client** and **Server** folder back to its **Environment** folder.</td>
	</tr>
</tbody>
</table>

### Saving and Loading Lighting

The top-level `Class.Lighting` service stores all of a place's lighting properties and visual effects. Since it's a top-level service, you cannot manually move it to a particular scene's **Environment**/**Server** or **Environment**/**Client** folder. Instead, you can utilize the plugin to copy its properties and children to the scene's **Environment**/**Lighting** folder.

1. Configure the scene's [lighting properties](../../environment/lighting.md), [post-processing](../../environment/post-processing-effects.md) effects, [atmospheric effects](../../environment/atmosphere.md), and [skyboxes](../../environment/skybox.md) through the top-level `Class.Lighting` service.

   <img src="../../assets/developer-modules/event-sequencer/Lighting-Service-Instances.png" width="320" />

1. In the **Scene Manager** plugin window, click **Save Lighting** for the desired scene.
1. Select and expand that scene's **Environment**/**Lighting** configuration and you'll see the same lighting properties as [attributes](../../studio/properties.md#instance-attributes) of the folder, as well as cloned children of the top-level `Class.Lighting` service.

   <Grid container spacing={3}>
   <Grid item>
    <figure>
   <img src="../../assets/developer-modules/event-sequencer/Saved-Lighting-Instances.png" width="320" />
   <figcaption>Cloned instances</figcaption>
    </figure>
   </Grid>
   <Grid item>
   <figure>
   <img src="../../assets/developer-modules/event-sequencer/Saved-Lighting-Attributes.png" width="320" />
   <figcaption>Saved attributes</figcaption>
    </figure>
   </Grid>
   </Grid>

   Once lighting properties and children are saved for a scene, you can quickly load them back into the top-level `Class.Lighting` service by clicking **Load Lighting** from the plugin window.

<Alert severity="info">
<p>If you want an environmental lighting effect like `Class.Atmosphere` to persist between scenes of a multi-scene event, place it in the top-level `Class.Lighting` service and assign it a boolean [attribute](../../studio/properties.md#instance-attributes) of **SceneFrameworkIgnore** set to **true**.</p>
<p>The framework also applies a **UseCurrentLighting** attribute to the top-level `Class.Lighting` service with a default of **false**. If set to **true**, the service's lighting overrides all scene-specific lighting during playtesting &mdash; however, scene lighting always takes precedence in a published event. As a real world analogy, this lets you stage a concert in full light before "turning down the lights" as the show begins.</p>
</Alert>

### Saving and Loading Terrain

Since `Class.Terrain` is a top-level class within `Class.Workspace`, you cannot manually move generated or sculpted terrain to a particular scene's **Environment**/**Server** or **Environment**/**Client** folder. Instead, you can utilize the plugin to copy it to the scene's **Environment**/**Terrain** folder.

1. Configure the scene's terrain through the top-level **Terrain** service.

   <img src="../../assets/developer-modules/event-sequencer/Terrain-Class.png" width="320" />

1. In the **Scene Manager** plugin window, click **Save Terrain** for the desired scene.
1. Select and expand that scene's **Environment**/**Terrain** folder and you'll see a **TerrainRegion** object which represents the saved terrain.

   <img src="../../assets/developer-modules/event-sequencer/Saved-Terrain-TerrainRegion.png" width="320" />

   Once terrain is saved for a scene, you can quickly load it back into the top-level `Class.Terrain` service by clicking **Load Terrain** from the plugin window.

<Alert severity="warning">
If a scene contains absolutely no terrain, you should still click **Save Terrain** for it. This saves an "empty" terrain region for the scene and effectively clears all terrain from any scene shown before it.
</Alert>

## API Reference

### Schema Lifecycle Hooks

#### OnSetup

The **OnSetup** lifecycle hook is intended for initializing assets and variables that will be referenced in [OnRun](#onrun) or [OnEndScene](#onendscene), setting up `Datatype.RBXScriptSignal:Connect()|connections` that are intended to last for the duration of the scene, etc. This hook receives the `timePositionObject` parameter which lets you read the current time at setup.

<Alert severity="warning">
It's recommended that you do **not** call `Global.RobloxGlobals.wait()` or `Library.task.wait()` within **OnSetup**, as it will delay the [OnRun](#onrun) start while the scene's timer continues to count up.
</Alert>

```lua title='Client Schema' highlight='11,21'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

local Schema = EventSequencer.createSchema()

local clientEnvironment
local serverEnvironment
local dummy

Schema.OnSetup = function(timePositionObject)
	print("OnSetup (Client)")

	-- Access scene environments; does not apply to Inline Mode
	clientEnvironment = EventSequencer.getCurrentSceneEnvironment()
	serverEnvironment = EventSequencer.getCurrentServerEnvironmentFromClient()
	-- Wait for assets
	dummy = clientEnvironment:WaitForChild("Dummy")

	print("Current time is:", timePositionObject.Value)
end
```

```lua title='Server Schema' highlight='11,21'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

local Schema = EventSequencer.createSchema()

local serverEnvironment
local partColorConnection
local changePartColorEvent = script.Parent.Events.ChangePartColor

Schema.OnSetup = function(timePositionObject)
	print("OnSetup (Server)")

	-- Access scene environment; does not apply to Inline Mode
	serverEnvironment = EventSequencer.getCurrentSceneEnvironment()
	partColorConnection = changePartColorEvent.OnServerEvent:Connect(function(player, changedPart, newColor)
		serverEnvironment.changedPart.Color = newColor
	end)

	print("Current time is:", timePositionObject.Value)
end
```

#### OnRun

**OnRun** is the main operational lifecycle hook within a [schema](#scene-schemas). It should contain all timed [configurations](#schema-configurations) for the scene, from playing [audio](#audio) or an [animation](#animate) to [scheduling an event](#schedule) like a fireworks display.

<Alert severity="warning">
It's recommended that you do **not** call `Global.RobloxGlobals.wait()` or `Library.task.wait()` within **OnRun**, as it will delay the scene's orchestration while the scene's timer continues to count up.
</Alert>

```lua title='Client Schema' highlight='1,14'
Schema.OnRun = function()
	print("OnRun (Client)")

	local MainAudio = Schema:audio({
		StartTime = 1,
		SoundId = "rbxassetid://1838673350",
		OnStart = function(self)
			print("Audio playing")
		end,
		OnEnd = function(self)
			print("Audio ended")
		end
	})
end
```

#### OnEndScene

The **OnEndScene** lifecycle hook is useful for cleaning up anything outstanding in the scene, such as disconnecting connections created in [OnSetup](#onsetup) or [OnRun](#onrun) that remain for the duration of the scene.

```lua title='Server Schema' highlight='1,8'
Schema.OnEndScene = function()
	print("OnEndScene (Server)")

	if partColorConnection then
		partColorConnection:Disconnect()
		partColorConnection = nil
	end
end
```

<Alert severity="info">
In cases like a post-show venue which may be considered "endless," omit the **OnEndScene** lifecycle event and make the [TimeLength](#time-length) value as long as needed to accommodate all of your schema [configurations](#configurations). Also, do not [inform](#inform) anything to the schema, as those things will be cleaned up when the scene reaches its time length.
</Alert>

### Schema Configurations

#### audio

Creates a `Class.Sound` object in the workspace which plays at a certain time. The sound is then deleted after the scene is over or after the `Class.Sound` object finishes playing.

<table>
<thead>
	<tr>
		<th>Configuration&nbsp;Key</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`StartTime`</td>
		<td>When to play the audio in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`SoundId`</td>
		<td>Asset ID of the audio to play.</td>
	</tr>
	<tr>
		<td>`OnStart`</td>
		<td>Custom function to fire when the audio begins playing.</td>
	</tr>
	<tr>
		<td>`OnEnd`</td>
		<td>Custom function to fire when the audio finishes playing.</td>
	</tr>
	<tr>
		<td>`Volume`</td>
		<td>Volume of the `Class.Sound` object; default is 0.5.</td>
	</tr>
</tbody>
</table>

```lua title='Client Schema' highlight='4,13'
Schema.OnRun = function()
	print("OnRun (Client)")

	local MainAudio = Schema:audio({
		StartTime = 1,
		SoundId = "rbxassetid://1838673350",
		OnStart = function(self)
			print("Audio playing")
		end,
		OnEnd = function(self)
			print("Audio ended")
		end
	})
end
```

<Alert severity="info">
You can access `[audio].CurrentSoundIntensityRatio` as the sound intensity ratio of an audio configuration for use in your intervals. This acts like a pseudo pulse/tempo of a song based on how loud it has been so far.
</Alert>

#### animate

Creates an `Class.Animation` which plays at a certain time.

<table>
<thead>
	<tr>
		<th>Configuration&nbsp;Key</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`StartTime`</td>
		<td>When to play the animation in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`EndTime`</td>
		<td>Optional time when to end the animation in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`Rig`</td>
		<td>The animation rig to play the animation on.</td>
	</tr>
	<tr>
		<td>`AnimationId`</td>
		<td>Asset ID of the animation to play.</td>
	</tr>
	<tr>
		<td>`Speed`</td>
		<td>Playback speed of the animation; default is 1.</td>
	</tr>
	<tr>
		<td>`FadeInTime`</td>
		<td>Amount of time to fade in the animation, in seconds; default is 0.2 (seconds).</td>
	</tr>
	<tr>
		<td>`FadeOutTime`</td>
		<td>Amount of time to fade out the animation, in seconds; default is 0.2 (seconds).</td>
	</tr>
	<tr>
		<td>`OnStart`</td>
		<td>Custom function to fire when the animation begins playing.</td>
	</tr>
	<tr>
		<td>`OnEnd`</td>
		<td>Custom function to fire when the animation finishes playing.</td>
	</tr>
	<tr>
		<td>`Looped`</td>
		<td>Whether to loop the animation; default is `false`.</td>
	</tr>
	<tr>
		<td>`SyncToAudio`</td>
		<td>Table defining whether to sync the animation to an [audio](#audio) configuration. Accepts the following keys:<ul><li>`Audio` – Reference to an [audio](#audio) configuration.</li><li>`StartAtAudioTime` – When to play the animation in relation to the audio's duration.</li><li>`EndAtAudioTime` – Optional time at which to end the animation in relation to the audio's duration.</li></ul></td>
	</tr>
</tbody>
</table>

```lua title='Client Schema' highlight='9,25'
Schema.OnRun = function()
	print("OnRun (Client)")

	local MainAudio = Schema:audio({
		StartTime = 1,
		SoundId = "rbxassetid://1838673350",
	})

	local DanceAnimation = Schema:animate({
		AnimationId = "rbxassetid://3695333486",
		Rig = Dummy,
		Speed = 1,
		FadeInTime = 0.1,
		FadeOutTime = 0.3,
		SyncToAudio = {
			Audio = MainAudio,
			StartAtAudioTime = 5,
		},
		OnStart = function(self)
			print("Animation playing")
		end,
		OnEnd = function(self)
			print("Animation stopped")
		end
	})
end
```

#### tween

Creates a configurable `Class.Tween` which is preserved in seeking and in dynamic join, meaning you can chain tweens at separate points in time and everything should play and sync as expected.

<table>
<thead>
	<tr>
		<th>Configuration&nbsp;Key</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`StartTimes`</td>
		<td>Table of start times in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`Class.Tween`</td>
		<td>Table defining the object and properties to tween. Accepts the following keys:<ul><li>`Object` – The object to tween.</li><li>`Info` – `Datatype.TweenInfo` instance for the tween, defining its duration, `Enum.EasingStyle`, `Enum.EasingDirection`, etc.</li><li>`Properties` – Object properties and associated target values for the tween.</li></ul></td>
	</tr>
	<tr>
		<td>`OnStart`</td>
		<td>Custom function to fire when the tween begins playing.</td>
	</tr>
	<tr>
		<td>`OnHeartbeat`</td>
		<td>Custom function to fire on every `Class.RunService.Heartbeat|Heartbeat`; receives the tween alpha as its second parameter.</td>
	</tr>
	<tr>
		<td>`OnEnd`</td>
		<td>Custom function to fire when the tween finishes playing.</td>
	</tr>
	<tr>
		<td>`SyncToAudio`</td>
		<td>Table defining whether to sync the tween to an [audio](#audio) configuration. Accepts the following keys:<ul><li>`Audio` – Reference to an [audio](#audio) configuration.</li><li>`StartAtAudioTimes` – Table of start times defining when to play the tween in relation to the audio's duration.</li></ul></td>
	</tr>
</tbody>
</table>

```lua title='Client Schema' highlight='9,31'
Schema.OnRun = function()
	print("OnRun (Client)")

	local MainAudio = Schema:audio({
		StartTime = 1,
		SoundId = "rbxassetid://1838673350",
	})

	local LightFadeOut = Schema:tween({
		StartTimes = {29.884},
		Tween = {
			Object = game:GetService("Lighting"),
			Info = TweenInfo.new(2, Enum.EasingStyle.Sine, Enum.EasingDirection.Out),
			Properties = {
				Brightness = 0,
			}
		},
		SyncToAudio = {
			Audio = MainAudio,
			StartAtAudioTimes = {5, 7.2, 9.4, 11.6},
		},
		OnStart = function(self)
			print("Tween playing")
		end,
		OnHeartbeat = function(self, alpha)
			print("Tween alpha", alpha)
		end,
		OnEnd = function(self)
			print("Tween completed")
		end,
	})
end
```

#### interval

Executes a custom callback function over a specified duration on a specified frequency, in seconds. Useful for repeating events like flashing lights, pulsing an audio's intensity, etc. The lowest possible frequency is 0 seconds, but technically the minimum frequency is always clamped to `Class.RunService.Heartbeat|Heartbeat`.

<table>
<thead>
	<tr>
		<th>Configuration&nbsp;Key</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`StartTime`</td>
		<td>Beginning of the interval duration in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`EndTime`</td>
		<td>End of the interval duration in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`Frequency`</td>
		<td>How often the `OnInterval` function should fire, in seconds, with the first execution being at `StartTime`.</td>
	</tr>
	<tr>
		<td>`OnStart`</td>
		<td>Custom function to fire when the series of intervals begins.</td>
	</tr>
	<tr>
		<td>`OnInterval`</td>
		<td>Custom function to fire at every interval within the specified duration (`StartTime` to `EndTime`).</td>
	</tr>
	<tr>
		<td>`OnEnd`</td>
		<td>Custom function to fire when the series of intervals ends.</td>
	</tr>
	<tr>
		<td>`SyncToAudio`</td>
		<td>Table defining whether to sync the interval duration to an [audio](#audio) configuration. Accepts the following keys:<ul><li>`Audio` – Reference to an [audio](#audio) configuration.</li><li>`StartAtAudioTime` – When to start the interval duration in relation to the audio's duration.</li><li>`EndAtAudioTime` – Optional time at which to end the interval duration in relation to the audio's duration.</li></ul></td>
	</tr>
</tbody>
</table>

```lua title='Client Schema' highlight='9,19'
Schema.OnRun = function()
	print("OnRun (Client)")

	local MainAudio = Schema:audio({
		StartTime = 1,
		SoundId = "rbxassetid://1838673350",
	})

	local ClientTimerUpdate = Schema:interval({
		Frequency = 1,
		SyncToAudio = {
			StartAtAudioTime = 2.5,
			EndAtAudioTime = 10,
			Audio = MainAudio
		},
		OnInterval = function(self)
			print(MainAudio.Sound.TimePosition, MainAudio.CurrentSoundIntensityRatio)
		end,
	})
end
```

#### schedule

Similar to [interval](#interval) except that you can define multiple specific starting times for the same event, such as scheduling a fireworks display twice in a scene.

<table>
<thead>
	<tr>
		<th>Configuration&nbsp;Key</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`StartTimes`</td>
		<td>Table of start times in relation to the scene duration, in seconds.</td>
	</tr>
	<tr>
		<td>`OnStart`</td>
		<td>Custom function to fire at every specified time in the `StartTimes` table.</td>
	</tr>
	<tr>
		<td>`Skippable`</td>
		<td>Boolean defining whether the scheduled event can be skipped for users who join late, or for when seeking ahead of a scheduled start time. If set to `false`, all event start times scheduled before the join/seek time will occur at that join/seek time. If set to `true`, only the start times scheduled **after** join/seek will occur. Default is `false`.</td>
	</tr>
	<tr>
		<td>`SyncToAudio`</td>
		<td>Table defining whether to sync the schedule to an [audio](#audio) configuration. Accepts the following keys:<ul><li>`Audio` – Reference to an [audio](#audio) configuration.</li><li>`StartAtAudioTimes` – Table of start times defining when to fire the `OnStart` function in relation to the audio's duration.</li></ul></td>
	</tr>
</tbody>
</table>

```lua title='Client Schema' highlight='4,14'
Schema.OnRun = function()
	print("OnRun (Client)")

	Schema:schedule({
		StartTimes = {5, 27.25},
		OnStart = function(self)
			-- Initialize temporary heartbeat connection
			local tempConnection = RunService.Heartbeat:Connect(function()

			end)
			-- Inform framework of connection
			Schema:inform(tempConnection)
		end
	})
end
```

#### inform

Informs the framework of any modules, UI objects, connections, etc. which are created in the [OnRun](#onrun) lifecycle hook, ensuring they are properly cleaned up when [seeking](#seeking-scenes). Use cases include:

- Informing the framework of a temporary ad-hoc connection such as `Class.RunService.Heartbeat` so that the connection is cleaned up when seeking to an earlier point in the scene's duration.

  ```lua title='Server Schema' highlight='8-10,12'
  Schema.OnRun = function()
  	print("OnRun (Server)")

  	Schema:schedule({
  		StartTimes = {5},
  		OnStart = function(self)
  			-- Initialize temporary heartbeat connection
  			local tempConnection = RunService.Heartbeat:Connect(function()

  			end)
  			-- Inform framework of connection
  			Schema:inform(tempConnection)
  		end
  	})
  end
  ```

- Calling a custom "cleanup" function in a `Class.ModuleScript` that initializes a connection or other reference during the [OnRun](#onrun) lifecycle hook.

  ```lua title='Server Schema' highlight='4,17,19'
  local ReplicatedStorage = game:GetService("ReplicatedStorage")
  local RunService = game:GetService("RunService")

  local customModule = require(ReplicatedStorage:WaitForChild("CustomModule"))

  local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

  local Schema = EventSequencer.createSchema()

  Schema.OnRun = function()
  	print("OnRun (Server)")

  	Schema:schedule({
  		StartTimes = {5},
  		OnStart = function(self)
  			-- Call "init" function in custom module
  			customModule.init()
  			-- Call "clean" function in custom module on scene cleanup
  			Schema:inform(customModule, customModule.clean)
  		end,
  	})
  end
  ```

  ```lua title='ModuleScript - CustomModule' highlight='5,7-10,12,14-18'
  local RunService = game:GetService("RunService")

  local CustomModule = {}

  CustomModule.init = function()
  	-- Initialize heartbeat connection
  	CustomModule.connection = RunService.Heartbeat:Connect(function()

  	end)
  end

  CustomModule.clean = function()
  	-- Disconnect and clear heartbeat connection
  	if CustomModule.connection then
  		CustomModule.connection:Disconnect()
  		CustomModule.connection = nil
  	end
  end

  return CustomModule
  ```

<Alert severity="warning">
While **inform** is critical for [seeking](#seeking-and-switching-scenes) support, you should only use it to inform the framework of any module, UI object, connection, etc. that is created/initialized during the [OnRun](#onrun) lifecycle hook. If you want to reference something throughout the entirety of the scene, simply initialize it in [OnSetup](#onsetup) and clean it up in [OnEndScene](#onendscene).
</Alert>

### Functions

#### loadScene

<figcaption>
loadScene(sceneName: `Library.string`, startTime: `number` ?)
</figcaption>

Programmatically loads a scene by `sceneName` and starts it at `startTime` from its beginning. There will be a 5 second "grace period" for the scene to load from the server before the seek occurs and the scene starts playing. This means that if you call `loadScene("[SceneName]", 20)` at exactly 4:15:00 PM, the framework will wait 5 seconds in addition to the requested 20, kicking off the scene at 4:15:25 PM.

```lua title='Script' highlight='9,12,15'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

-- Figure out next scene to load when current scene finishes
EventSequencer.onOrchestrationFinished:Connect(function(endedSceneName)
	if endedSceneName == "PreShow" then
		-- "PreShow" ended; load the first scene in the concert
		EventSequencer.loadScene("Track1")
	elseif endedSceneName == "Track1" then
		-- "Track1" ended; load the second scene in the concert
		EventSequencer.loadScene("Track2")
	else
		-- Loop back to the pre-show scene
		EventSequencer.loadScene("PreShow")
	end
end)
```

<Alert severity="warning">
Do not call `loadScene` from within a schema [lifecycle hook](#schema-lifecycle-hooks), as **EventSequencer** expects that scene transitions and the overall sequence of multi-scene events is handled outside of individual scenes.
</Alert>

#### createSchema

<figcaption>
createSchema(): `Library.table`
</figcaption>

Returns an instance of the scene [schema](#scene-schemas) to create logic for the scene.

```lua title='Client Schema' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

local Schema = EventSequencer.createSchema()

Schema.OnSetup = function(timePositionObject)
	print("OnSetup (Client)")
end
```

#### seek

<figcaption>
seek(time: `number`)
</figcaption>

Seeks to the `time` value, in seconds, from the currently loaded scene's beginning.

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

EventSequencer.seek(95.58)
```

<Alert severity="warning">
Do not call `seek` from within a schema [lifecycle hook](#schema-lifecycle-hooks), as **EventSequencer** expects that scene seeking and [loading](#loadscene) is handled outside of individual scenes.
</Alert>

#### setSceneWarningTime

<figcaption>
setSceneWarningTime(endSceneTimeWindow: `number`)
</figcaption>

Sets the amount of time from the **end** of all scenes at which a warning is dispatched. You can detect the warning either client-side through [onSceneEndingWarningForClient](#onsceneendingwarningforclient) or server-side through [onSceneEndingWarningForServer](#onsceneendingwarningforserver).

```lua title='Script' highlight='9'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

-- Load scene
EventSequencer.loadScene("BeautifulScene")

-- Set warning time to 5 seconds before the scene ends
EventSequencer.setSceneWarningTime(5)

-- Detect when scene is about to end
EventSequencer.onSceneEndingWarningForServer:Connect(function()
	warn("Scene is about to end!")
end)
```

#### setSeekingPermissions

<figcaption>
setSeekingPermissions(permissions: `Library.table`)
</figcaption>

Grants seeking permission based on the event's `Class.DataModel.PlaceId|PlaceId` as well as specific `Class.Player.UserId|UserIds` and/or [groups](../../projects/groups.md) and roles within them. See [Seeking and Switching Scenes](#seeking-scenes) for more information.

#### getCurrentSceneEnvironment

<figcaption>
getCurrentSceneEnvironment(): `Class.Folder` **(YIELDS)**
</figcaption>

Returns the current scene's client-side or server-side [Environment](#environment) folder, depending on whether it's called from the [Client](#client) schema script or [Server](#server) schema script respectively.

<Alert severity="warning">
Do not use this function with [Inline Mode](#inline-mode), as that mode expects you to use existing assets and global property settings for the place, not load in scene-specific assets/properties from the scene's [Environment](#environment) folder. This function will **infinitely yield** if the folder doesn't exist.
</Alert>

```lua title='Client Schema' highlight='7, 14'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

local Schema = EventSequencer.createSchema()

local clientEnvironment
local serverEnvironment

Schema.OnSetup = function(timePositionObject)
	print("OnSetup (Client)")

	-- Access scene environments; does not apply to Inline Mode
	clientEnvironment = EventSequencer.getCurrentSceneEnvironment()
	serverEnvironment = EventSequencer.getCurrentServerEnvironmentFromClient()

	print("Current time is:", timePositionObject.Value)
end
```

```lua title='Server Schema' highlight='7,14'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

local Schema = EventSequencer.createSchema()

local serverEnvironment
local partColorConnection
local changePartColorEvent = script.Parent.Events.ChangePartColor

Schema.OnSetup = function(timePositionObject)
	print("OnSetup (Server)")

	serverEnvironment = EventSequencer.getCurrentSceneEnvironment()

	partColorConnection = changePartColorEvent.OnServerEvent:Connect(function(player, changedPart, newColor)
		serverEnvironment.changedPart.Color = newColor
	end)
end
```

#### getCurrentServerEnvironmentFromClient

<figcaption>
getCurrentServerEnvironmentFromClient(): `Class.Folder` **(YIELDS)**
</figcaption>

Returns the current scene's **server-side** [Environment](#environment) folder. Unlike [getCurrentSceneEnvironment](#getcurrentsceneenvironment), you can call this from the [Client](#client) schema script.

<Alert severity="warning">
Do not use this function with [Inline Mode](#inline-mode), as that mode expects you to use existing assets and global property settings for the place, not load in scene-specific assets/properties from the scene's [Environment](#environment) folder. This function will **infinitely yield** if the folder doesn't exist.
</Alert>

```lua title='Client Schema' highlight='8,15'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

local Schema = EventSequencer.createSchema()

local clientEnvironment
local serverEnvironment

Schema.OnSetup = function(timePositionObject)
	print("OnSetup (Client)")

	-- Access scene environments; does not apply to Inline Mode
	clientEnvironment = EventSequencer.getCurrentSceneEnvironment()
	serverEnvironment = EventSequencer.getCurrentServerEnvironmentFromClient()

	print("Current time is:", timePositionObject.Value)
end
```

#### isLoadingScene

<figcaption>
isLoadingScene(): `boolean`
</figcaption>

Called from the server to know if a scene is currently loading.

<Alert severity="warning">
Do not use this function with [Inline Mode](#inline-mode), as that mode expects you to use existing assets and global property settings for the place, not load in scene-specific assets/properties from the scene's [Environment](#environment) folder.
</Alert>

```lua title='Script' highlight='5'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

print(EventSequencer.isLoadingScene())

while EventSequencer.isLoadingScene() do
	task.wait()
end
print("Scene loaded")
```

### Events

#### onSceneEndingWarningForClient

Fires on the client before the scene is about to end. The default time is 3 seconds, but you can configure it through [setSceneWarningTime](#setscenewarningtime). This event can only be connected in a `Class.LocalScript`.

```lua title='LocalScript' highlight='6,8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

-- Detect when scene is about to end (client-side)
EventSequencer.onSceneEndingWarningForClient:Connect(function()
	warn("Scene is about to end!")
end)
```

#### onSceneEndingWarningForServer

Fires on the server before the scene is about to end. The default time is 3 seconds, but you can configure it through [setSceneWarningTime](#setscenewarningtime). This event can only be connected in a `Class.Script`.

```lua title='Script' highlight='6,8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

-- Detect when scene is about to end (server-side)
EventSequencer.onSceneEndingWarningForServer:Connect(function()
	warn("Scene is about to end!")
end)
```

#### onSceneLoadedForClient

Fires on the client when the scene is starting. This event can only be connected in a `Class.LocalScript`.

<Alert severity="warning">
Don't use this event for [Inline Mode](#inline-mode) because that mode expects you to use existing assets and global property settings for the place, not load in scene-specific assets/properties from the scene's [Environment](#environment) folder.
</Alert>

```lua title='LocalScript' highlight='6,8'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

-- Detect when scene is starting (client-side)
EventSequencer.onSceneLoadedForClient:Connect(function()
	warn("Scene is starting!")
end)
```

#### onOrchestrationFinished

Fires on the server when a scene has reached its [time length](#time-length) and has effectively ended. This event receives an `endedSceneName` string name argument for the scene that just finished and you can chain off this event to conditionally [load another scene](#loadscene). Can only be connected in a `Class.Script`.

```lua title='Script' highlight='6,17'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local EventSequencer = require(ReplicatedStorage:WaitForChild("EventSequencer"))

-- Figure out next scene to load when current scene finishes
EventSequencer.onOrchestrationFinished:Connect(function(endedSceneName)
	if endedSceneName == "PreShow" then
		-- "PreShow" ended; load the first scene in the concert
		EventSequencer.loadScene("Track1")
	elseif endedSceneName == "Track1" then
		-- "Track1" ended; load the second scene in the concert
		EventSequencer.loadScene("Track2")
	else
		-- Loop back to the pre-show scene
		EventSequencer.loadScene("PreShow")
	end
end)
```
