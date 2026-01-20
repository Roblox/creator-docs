---
title: Studio testing modes
description: Explore the built-in Studio testing modes for experiences.
---

import DeviceEmulator from '../includes/studio/device-emulator.md'
import ControllerEmulator from '../includes/studio/controller-emulator.md'
import PlaytestModes from '../includes/studio/playtest-modes.md'

Because of the underlying [client-server model](../projects/client-server.md) of the Roblox Engine, it's important that you test your experience in various modes before [releasing it to the public](../production/publishing/publish-experiences-and-places.md#make-experience-public). All of the testing options are accessible in the left portion of the mezzanine.

<img src="../assets/studio/general/Mezzanine-Testing-Controls.png" width="800" alt="Testing controls indicated in Studio's mezzanine." />

## Playtesting

There are three common options for playtesting an experience. Choose the desired option from the dropdown menu and click the **Play** button to its right to begin the playtest.

<img src="../assets/studio/general/Mezzanine-Testing-Mode-Test.png" width="800" alt="Test option in the testing modes dropdown of Studio's mezzanine." />

<PlaytestModes components={props.components} />

Once a playtest is running, additional options become available in the mezzanine.

<img src="../assets/studio/general/Mezzanine-Testing-Options.png" width="800" alt="Additional options available during a playtest from Studio's mezzanine." />

<table>
<thead>
	<tr>
		<th>Action</th>
		<th>Shortcut</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Pause**&nbsp;/&nbsp;**Resume**</td>
		<td></td>
		<td>Lets you [pause/resume physics and animations](#pauseresume).</td>
	</tr>
	<tr>
		<td>**Stop**</td>
		<td><kbd>Shift</kbd><kbd>F5</kbd></td>
		<td>Stops simulation of the experience and resets all objects and instances to how they were before the playtest.</td>
	</tr>
	<tr>
		<td>**Client** / **Server**</td>
		<td></td>
		<td>During playtesting in a "solo" mode (**Test** or **Test&nbsp;Here**), toggles between **Client** mode and **Server** mode. See [toggle client/server](../studio/testing-modes.md#toggle-clientserver) for details.</td>
	</tr>
</tbody>
</table>

### Toggle client/server

When testing in either **Test** or **Test Here** mode, Studio runs two separate simulations&nbsp;— one [client](../projects/client-server.md#client) simulation and one [server](../projects/client-server.md#server) simulation&nbsp;— which can provide a more accurate impression of how the experience will execute in production.

While solo playtesting, you can toggle between **Client** and **Server** modes by clicking the **Client/Server** toggle button. When you toggle, the button changes to reflect the current simulation mode.

<Grid container spacing={5}>
	<Grid item>
	<figure>
    <img src="../assets/studio/general/Mezzanine-Testing-Client.png" width="320" />
    <figcaption>Client</figcaption>
  </figure>
	</Grid>
	<Grid item>
	<figure>
    <img src="../assets/studio/general/Mezzanine-Testing-Server.png" width="320" />
    <figcaption>Server</figcaption>
  </figure>
	</Grid>
</Grid>

Depending on the simulation mode, control of your character and the camera changes as follows:

<Tabs>
<TabItem label="Client Mode">
	<figure>
    <img src="../assets/studio/debugging/Client-Server-Toggle-3D-Client.jpg" width="800" height="450" />
    <figcaption>In **Client** mode, the 3D viewport is surrounded by a **blue** border and the simulation uses your character controls and camera setup. This testing mode is a close simulation of the experience running on the Roblox application, without multiple players.</figcaption>
  </figure>
</TabItem>
<TabItem label="Server Mode">
	<figure>
    <img src="../assets/studio/debugging/Client-Server-Toggle-3D-Server.jpg" width="800" height="450" />
    <figcaption>In **Server** mode, the 3D viewport is surrounded by a **green** border and your character is inserted but is not under your control. You can move about the place with a free‑floating camera, select objects, and inspect their properties.</figcaption>
  </figure>
</TabItem>
</Tabs>

Within the [Explorer](../studio/explorer.md) window hierarchy, certain objects only exist in their expected containers.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/debugging/Client-Server-Toggle-Explorer-Client.png" width="320" alt="Explorer window showing items that exist on client only" />
    <figcaption>In **Client** mode, the expected client-side objects are present in the hierarchy, including those copied over from `Class.StarterPack` to the player's `Class.Backpack` and from `Class.StarterPlayer` into the player's `Class.PlayerScripts`.</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/debugging/Client-Server-Toggle-Explorer-Server.png" width="320" alt="Explorer window showing items that exist on server only" />
    <figcaption>In **Server** mode, the expected server-side objects are present in the hierarchy, including scripts in `Class.ServerScriptService` and objects you placed in `Class.ServerStorage`.</figcaption>
  </figure>
</GridContainer>

In the [Output](../studio/output.md) window, messages are labeled **blue** (client) or **green** (server), indicating their origin from either the client or server. For messages output from `Class.ModuleScript|ModuleScripts`, the label color is determined by whether the module was called from a client-side `Class.LocalScript` or from a server-side `Class.Script`.

<img src="../assets/studio/general/Output-Window-Client-Server-Labels.png" width="800" alt="Output window showing green label for server output and blue label for client output" />

### Pause/resume

While solo playtesting, the **Pause/Resume** button is useful for debugging ephemeral scenes and mechanisms, without disabling rendering.

<img src="../assets/studio/general/Mezzanine-Testing-Pause.png" width="800" alt="Pause/Resume button indicated in Studio's mezzanine." />

By default, pausing and resuming acts upon both the client **and** server. If you wish to pause or resume only the client **or** server:

1. Set the [client/server toggle](#toggle-clientserver) based on which simulation you want to pause/resume.
2. Click the small arrow on the **Pause/Resume** button and select the alternate option of **Pause/Resume&nbsp;Client** or **Pause/Resume&nbsp;Server**. Clicking the button will then pause or resume only that side of the simulation.

When the simulation is paused, you can **step forward** 1/60th of a second (60&nbsp;Hz) by clicking the **Step&nbsp;Forward** button. Like the **Pause/Resume** button to its left, clicking the small arrow lets you select stepping for only the client **or** server based on the [client/server toggle](#toggle-clientserver).

<img src="../assets/studio/general/Mezzanine-Testing-Step-Forward.png" width="800" alt="Step Forward button indicated in Studio's mezzanine." />

Note the following technical details in relation to pause/resume:

- Although `Class.Animation|Animations` are not based on physics, these toolbar buttons also pause/resume animations.
- Pausing or resuming has no effect on running scripts.
- Only the `Class.RunService` callbacks `Class.RunService.PreAnimation|PreAnimation`, `Class.RunService.PreSimulation|PreSimulation`, `Class.RunService.PostSimulation|PostSimulation`, and `Class.RunService.Stepped|Stepped` pause or resume through these toolbar buttons. Other callbacks (`Class.RunService.PreRender|PreRender`, `Class.RunService.Heartbeat|Heartbeat`, and `Class.RunService.RenderStepped|RenderStepped`) continue to fire, maintaining normal functionality of camera scripts, rendered visualizations, and plugins.

## Multi-client simulation

The **Server & Clients** option from the dropdown menu lets you launch multiple sessions of Studio, one acting as the server and each other acting as a client. This testing mode is a valuable tool for comparing how a client "sees" other clients within the experience.

1. With the **Server & Clients** option selected in the dropdown menu, choose the number of client sessions to test. Usually 1–2 clients is sufficient, although you can simulate up to eight.

   <img src="../assets/studio/general/Mezzanine-Testing-Mode-Server-Clients.png" width="800" alt="Server & Clients option in the testing modes dropdown of Studio's mezzanine." />

1. Press the **Play** button or <kbd>F7</kbd> to begin the client-server simulation.
1. When you're finished testing, press the **End&nbsp;Session** button from any of the simulation sessions to close all simulated clients and the simulated server.

   <img src="../assets/studio/general/Mezzanine-Testing-End-Session.png" width="800" alt="End Session indicated in Studio's mezzanine" />

## Party simulation

The **Party Simulator** allows you to test and debug experiences that use party-related APIs directly within Studio, without needing to publish and coordinate multiple devices. This tool lets you configure and emulate parties for test players in your [Server & Clients](#multi-client-simulation) play tests.

When play testing, Party Simulator automatically assigns all test players to the configured simulated parties.

<img src="../assets/studio/general/Party-Simulator.png" width="480" alt="Party Emulator displaying simulated parties and various assignment options" />

If Party Simulator is enabled:

- Each `Class.Player.PartyId` property reflects the Party Simulator assignments.
- `Class.SocialService:GetPartyAsync()` returns a simulated table of party data.
- `Class.SocialService:GetPlayersByPartyId()` returns a list of `Class.Player` instances assigned to the provided `Class.Player.PartyId`.

You can adjust the number of local test players at any time using Studio's [Server & Clients](#multi-client-simulation) setting. When the test player count changes, the emulator automatically updates to include or remove players in the configuration.

## Collaborative testing

If you're working on an experience with others in [collaboration](../projects/collaboration.md) mode, you can test with other collaborators as follows:

1. Select **Team Test** in the dropdown menu and press the **Play** button to open a new Studio session with your character inserted.

   <img src="../assets/studio/general/Mezzanine-Testing-Mode-Team-Test.png" width="800" alt="Team Test option in the testing modes dropdown of Studio's mezzanine." />

1. Other collaborators can then join by pressing the **Play** button from the mezzanine in their Studio session.

   <Alert severity="info">
   Only one team test session can run at any given time. To close a session and kick out all testers, click the **End&nbsp;Session** button.
   </Alert>

## Device emulation

<DeviceEmulator components={props.components} />

## Controller emulation

<ControllerEmulator components={props.components} />

## VR headsets

If you'd like to support virtual reality (VR) headsets for your experience, make sure to test or [emulate](#vr-emulation) VR in Studio.

### VR emulation

**VR emulation** lets you test VR experiences in Studio without a physical headset. Just like emulating any other device, use the [device selector](#device-emulation) menu to choose either **Meta&nbsp;Quest&nbsp;2** or **Meta&nbsp;Quest&nbsp;3**. The [controller emulator](#controller-emulation) automatically selects the appropriate controller for the headset.

<Grid container spacing={1}>
<Grid item XSmall={12} Medium={6} Large={6} XLarge={6}><img src="../assets/studio/general/Controller-Emulator-VR.png" width="540" alt="The Controller Emulator with a Quest 3 controller." /></Grid>
<Grid item XSmall={12} Medium={6} Large={6} XLarge={6}><img src="../assets/studio/general/Emulator-Viewport-VR.jpg" width="716" alt="Emulator with a Quest 3 emulation." /></Grid>
</Grid>

The combination of a headset and multiple controllers, each with motion tracking, make VR emulation more complex:

- For motion tracking emulation, press <kbd>Alt</kbd><kbd>1</kbd> (<kbd>⌥</kbd><kbd>1</kbd>) to lock the mouse to and unlock the mouse from the viewport.

- Use <kbd>Shift</kbd><kbd>&larr;</kbd> or <kbd>Shift</kbd><kbd>&rarr;</kbd> to switch between common combinations of the headset, left controller, and right controller. For example, you might use the **Headset** option to look around as you walk forward with the left controller button, but then switch to the **Right&nbsp;Controller** when you need to use motion controls to aim at a target.

### Headset configuration

Studio supports testing for all VR headsets that are compatible with [OpenXR](https://www.khronos.org/openxr/), the open‑source industry standard providing access to VR.

<Alert severity="info">
Currently, testing in VR is only supported on Windows.
</Alert>

To enable Studio testing in VR, you must connect your headset to your PC and configure the OpenXR runtime **before** launching Studio. If you've already launched Studio, quit and complete the configuration steps first.

If you only have one VR headset, installing the corresponding VR app automatically configures the runtime for you. If you have multiple headsets, you must set up the runtime manually and make sure to **only** configure the one that you want to use for testing.

The following steps are for the two most common VR apps:

- SteamVR for headsets such as the HTC Vive and Valve Index.
- Oculus for headsets such as the Meta Quest and Oculus Rift.

<Tabs>
<TabItem label="Steam VR">

1. Install and open the SteamVR app on your computer.
2. Under **SteamVR Settings**, select the **Developer** tab. Then select **Show Advanced Settings**.
3. Set SteamVR as OpenXR runtime.
4. Turn the controllers on by pressing the **System** button until you hear a beeping sound.
   - To turn the controller off, press and hold the **System** button until you hear the same beeping sound.

If you follow the steps correctly, the status icons on the SteamVR app and the status lights on the hardware should all be green, indicating that the configuration is completed.

<Alert severity="info">
When you quit the SteamVR app, the controllers automatically turn off. The controllers also automatically turn off after being idle for a period of time.
</Alert>

</TabItem>
<TabItem label="Oculus VR">

1. Install and open the Oculus app on your computer.
2. Confirm that your device is connected and the status is ready.
3. Under **Settings / General** in the Oculus app, select **OpenXR Runtime**.
4. <Chip label="OPTIONAL" size="small" variant="outlined" /> Bring up the **Devices** tab and find your headset to confirm the configuration by checking if the status is green without errors.

<Alert severity="info">
When using Oculus VR, ensure the following:
- At minimum, Oculus drivers require an NVIDIA GeForce GTX 1060 graphics card or equivalent.
- If you are using a Quest 2 with a link cable, you must enable the link inside the headset.
</Alert>

</TabItem>
</Tabs>

### Roblox Quest app

You can test your experience in the Roblox app on Quest without linking your headset to your computer. Use the following steps to access your experience on your headset in this mode:

1. In Studio, publish the experience and set the experience to private.
2. Using your [Creator Dashboard](https://create.roblox.com/dashboard/creations) or the link in Studio, open the experience page in your web browser.
3. On the experience page, add the experience to your favorites by clicking the **Favorite** icon.
4. Using your headset, open the standalone Roblox app.
5. Scroll down to the **Favorites** section in the home page and run your experience.

### Studio VR mode

After [configuring your headset](#headset-configuration), you can turn on the Studio VR testing mode through the following steps:

1. In the **File** menu, select **Studio Settings**.
2. Select **Rendering**.
3. Under **General** settings, turn on **Enable VR Mode**.

You can now test your experience using your VR headset using any of the available [playtest options](#playtesting). During a VR testing session, if your headset cable disconnects or you close the Roblox Studio Beta app on the headset, you'll need to restart Studio to re-run testing.

## Player emulation

For detailed emulation of experience [localization](../production/localization/index.md) and content policies, you can test through the **Player&nbsp;Emulator**, accessible from Studio's **Test** menu.

With the emulator window open, toggle on **Enable Test Profile**. Emulation will remain as toggled (enabled or disabled) even if you close the window.

Lower down in the window, commonly used options include:

<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>**Locale**</td>
			<td>Lets you emulate a [localized](../production/localization/index.md) language while playtesting.</td>
		</tr>
		<tr>
			<td>**Pseudolocalize**</td>
			<td>Swaps out characters with similar but slightly different characters so that it's easy to identify which strings are going through the [translation](../production/localization/index.md) system. Enabling this helps you identify **unlocalized** text without having to change the emulation language. For example:<ul><li><Typography variant="body1">`Bloxy Cola` &nbsp;&rang;&nbsp; `ßℓôж¥ Çôℓá`</Typography></li><li><Typography variant="body1">`Dominus Empyreus` &nbsp;&rang;&nbsp; `Ðô₥ïñúƨ É₥ƥ¥řèúƨ`</Typography></li></ul></td>
		</tr>
		<tr>
			<td>**Elongate**</td>
			<td>Elongates text strings by a factor defined via the slider. For example:<ul><li><Typography variant="body1">`Bloxy Cola` &nbsp;&rang;&nbsp; `Bloooxyy Coolaa` (50% longer)</Typography></li><li><Typography variant="body1">`Dominus Empyreus` &nbsp;&rang;&nbsp; `Doomiinuus Eempyyreus` (30% longer)</Typography></li></ul>Using elongation helps you identify places where your user interfaces might not be able to handle text that's longer than the default translated text. Note that Spanish is on average 30% longer than English and the equivalent for German is even longer. Also note that this only affects text that goes through the [translation](../production/localization/index.md) system.</td>
		</tr>
		<tr>
			<td>**Region**</td>
			<td>Lets you emulate a player's country/region while playtesting; this selection may impact other toggles and checkboxes in the window as outlined in `Class.PolicyService:GetPolicyInfoForPlayerAsync()|GetPolicyInfoForPlayerAsync()`.</td>
		</tr>
	</tbody>
</table>
