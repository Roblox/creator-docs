---
title: Studio testing modes
description: Explore the built-in Studio testing modes for experiences.
---

import PlaytestOptions from '../includes/studio/testing-modes.md'
import DeviceEmulator from '../includes/studio/device-emulator.md'
import ControllerEmulator from '../includes/studio/controller-emulator.md'
import PauseResumePhysics from '../includes/studio/pause-resume-physics.md'
import BetaAlert from '../includes/beta-features/beta-alert.md'

Because of the underlying [client-server model](../projects/client-server.md) of the Roblox Engine, it's important that you test your experience in various modes before [releasing it to the public](../production/publishing/publish-experiences-and-places.md#release-to-the-public). All of the testing options are accessible from the [Test](../studio/test-tab.md) tab.

## Playtest options

<PlaytestOptions components={props.components} />

### Toggle client/server

When testing in either **Play** or **Play&nbsp;Here** mode, Studio runs two separate simulations &mdash; one **client** simulation and one **server** simulation &mdash; which can provide a more accurate impression of how the experience will execute in production.

While playing solo, you can toggle between **Client** and **Server** modes by clicking the **Client/Server** toggle button. When you toggle, the button changes to reflect the current simulation mode.

<img src="../assets/studio/debugging/Client-Server-Toggle.png" width="680" alt="Client/Server toggle button indicated in Test tab" />

#### Controls and camera

Depending on the mode, control of your character and the camera changes as follows:

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

#### Explorer window

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

#### Output

In the [Output](../studio/output.md) window, messages are labeled **blue** (client) or **green** (server), indicating their origin from either the client or server. For messages output from `Class.ModuleScript|ModuleScripts`, the label color is determined by whether the module was called from a client-side `Class.LocalScript` or from a server-side `Class.Script`.

<img src="../assets/studio/general/Output-Window-Client-Server-Labels.png" width="800" alt="Output window showing green label for server output and blue label for client output" />

### Pause and resume physics

<PauseResumePhysics components={props.components} />

## Multi-client simulation

Using the **clients and servers** options, you can launch multiple sessions of Studio, one acting as the server and each other acting as a client. This testing mode is a valuable tool for comparing how a client "sees" other clients within the experience.

1. Make sure **Local Server** is selected in the upper box, then select the number of player sessions to test. Usually 1–2 players is sufficient, although you can simulate up to eight.
1. Press the **Start** button to begin the client-server simulation.

   <img src="../assets/studio/general/Test-Tab-Clients-Servers-Start.png" width="760" alt="Clients and Servers simulation setup indicated in Test tab" />

1. When you're finished testing, press the **Cleanup** button from any of the simulation sessions to close all simulated clients and the simulated server.

## Collaborative testing

If you're working on an experience with others in [Collaboration](../projects/collaboration.md) mode, you can test with other creators as follows:

1. Select **Team Test** in the upper box and press the **Start** button to publish the current state of the experience and create a new Studio session with your character inserted.

   <img src="../assets/studio/general/Test-Tab-Clients-Servers-Team-Test.png" width="760" alt="Team Test setup indicated in Test tab" />

1. Other collaborators can then join by pressing **Join** from the **Test** tab.

   <Alert severity="info">
   Only one team test session can run at any given time. To close a session and kick out all testers, click the **Shutdown&nbsp;Server** button.
   </Alert>

## Device emulation

<DeviceEmulator components={props.components} />

## Controller emulation

<ControllerEmulator components={props.components} />

## VR emulation

**VR emulation** lets you test VR experiences in Studio without a physical headset. Just like emulating any other device, use the [device selector](#device-emulation) menu to choose the **Meta&nbsp;Quest&nbsp;2** or **Meta&nbsp;Quest&nbsp;3**. The [controller emulator](#controller-emulation) automatically selects the appropriate controller for the headset.

<Grid container spacing={1}>
<Grid item XSmall={12} Medium={6} Large={6} XLarge={6}><img src="../assets/studio/general/Controller-Emulator-VR.png" width="540" alt="The Controller Emulator with a Quest 3 controller." /></Grid>
<Grid item XSmall={12} Medium={6} Large={6} XLarge={6}><img src="../assets/studio/general/Emulator-Viewport-VR.jpg" width="716" alt="Emulator with a Quest 3 emulation." /></Grid>
</Grid>

The combination of a headset and multiple controllers, each with motion tracking, make VR emulation more complex:

- For motion tracking emulation, press <kbd>Alt</kbd><kbd>1</kbd> (<kbd>⌥</kbd><kbd>1</kbd>) to lock the mouse to and unlock the mouse from the viewport.

- Use <kbd>Shift</kbd><kbd>&larr;</kbd> or <kbd>Shift</kbd><kbd>&rarr;</kbd> to switch between common combinations of the headset, left controller, and right controller. For example, you might use the **Headset** option to look around as you walk forward with the left controller button, but then switch to the **Right&nbsp;Controller** when you need to use motion controls to aim at a target.

## VR headsets

If you'd like to support virtual reality (VR) headsets for your experience, make sure to test or [emulate](#vr-emulation) VR in Studio. Studio supports testing for all VR headsets that are compatible with [OpenXR](https://www.khronos.org/openxr/), the open‑source industry standard providing access to VR.

<Alert severity="info">
Currently, testing in VR is only supported on Windows.
</Alert>

### Headset configuration

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
4. (Optional) Bring up the **Devices** tab and find your headset to confirm the configuration by checking if the status is green without errors.

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
3. Under **General** settings, turn on **VR Mode**.

You can now test your experience using your VR headset using any of the available [playtest options](#playtest-options). During a VR testing session, if your headset cable disconnects or you close the Roblox Studio Beta app on the headset, you'll need to restart Studio to re-run testing.

## Player emulation

For detailed emulation of experience [localization](../production/localization/index.md) and content policies, you can test through the **Player** emulator.

<img src="../assets/studio/general/Test-Tab-Emulation-Player.png" width="840" alt="Player emulator button indicated in Test tab" />

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
