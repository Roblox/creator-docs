---
title: Studio Testing Modes
description: Explore the built-in Studio testing modes for experiences.
---

Because of the underlying [client-server model](../projects/client-server.md) of the Roblox engine, it's important that you test your experience in various modes before [releasing it to the public](../production/publishing/publishing-experiences-and-places.md#releasing-to-the-public). All of the testing options are accessible from the [Test](../studio/test-tab.md) tab.

<img src="../assets/studio/general/Toolbar-Test-Tab.png" width="800" alt="Test tab indicated in Studio toolbar" />

## Playtest Options

There are three common options for playtesting an experience. Clicking the small arrow below the main button lets you choose from each option, and sets that option as the default.

<img src="../assets/studio/general/Test-Tab-Playtest-Options.png" width="800" alt="Rapid playtest options in Test tab of Studio" />

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
      <td>**Play**</td>
	  <td><kbd>F5</kbd></td>
      <td>Starts simulating the experience, inserting your avatar at either a `Class.SpawnLocation` or coordinates of around (0,&nbsp;100,&nbsp;0).</td>
    </tr>
    <tr>
      <td>**Play Here**</td>
	  <td></td>
      <td>Starts simulating the experience, inserting your avatar in front of the camera's current position.</td>
    </tr>
	<tr>
      <td>**Run**</td>
	  <td><kbd>F8</kbd></td>
      <td>Starts simulating the experience but does not insert your avatar. The simulation begins at the current camera position and you can navigate around using the Studio camera controls.</td>
    </tr>
  </tbody>
</table>

### Client/Server Toggle

When testing in either **Play** or **Play&nbsp;Here** mode, Studio runs two separate simulations &mdash; one **client** simulation and one **server** simulation &mdash; which can provide a more accurate impression of how the experience will execute in production.

While playing solo, you can toggle between **Client** and **Server** modes by clicking the **Client/Server** toggle button. When you toggle, the button changes to reflect the current simulation mode.

<img src="../assets/studio/debugging/Client-Server-Toggle.png" width="534" alt="Client/Server toggle button indicated in Test tab" />

#### Controls and Camera

Depending on the mode, control of your character and the camera changes as follows:

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/studio/debugging/Client-Server-Toggle-3D-Client.jpg" />
    <figcaption>In **Client** mode, the simulation uses your character controls and camera setup. This testing mode is a close simulation of the experience running on the Roblox application, without multiple players.</figcaption>
  </figure>
  <figure>
    <img src="../assets/studio/debugging/Client-Server-Toggle-3D-Server.jpg" />
    <figcaption>In **Server** mode, your character is inserted but is not under your control. You can move about the place with a free-floating camera, select objects, and inspect their properties.</figcaption>
  </figure>
</GridContainer>

#### Explorer Window

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

### Output Window

In the [Output](../studio/output.md) window, messages are labeled **blue** (client) or **green** (server), indicating their origin from either the client or server. For messages output from `Class.ModuleScript|ModuleScripts`, the label color is determined by whether the module was called from a client-side `Class.LocalScript` or from a server-side `Class.Script`.

<img src="../assets/studio/general/Output-Window-Client-Server-Labels.png" width="800" alt="Output window showing green label for server output and blue label for client output" />

## Multi-Client Simulation

Using the **Clients and Servers** options, you can launch multiple sessions of Studio, one acting as the server and each other acting as a client. This testing mode is a valuable tool for comparing how a client "sees" other clients within the experience.

1. Make sure **Local Server** is selected in the upper box, then select the number of player sessions to test. Usually 1–2 players is sufficient, although you can simulate up to eight.
1. Press the **Start** button to begin the client-server simulation.

   <img src="../assets/studio/debugging/Test-Tab-Clients-Servers-Start.png" width="800" alt="Clients and Servers simulation setup indicated in Test tab" />

1. When you're finished testing, press the **Cleanup** button from any of the simulation sessions to close all simulated clients and the simulated server.

   <img src="../assets/studio/debugging/Test-Tab-Clients-Servers-Cleanup.png" width="800" alt="Cleanup button indicated in Test tab" />

## Device Emulation

The **Device** emulator lets you emulate various devices directly in Studio, providing insight on how controls operate on a mobile device or how [on-screen UI](../ui/on-screen-containers.md) displays on different screens and aspect ratios.

<img src="../assets/studio/general/Test-Tab-Emulation-Device.png" width="800" alt="Device button indicated in Test tab" />

In emulation mode, you can select devices from the **Device Selector** dropdown menu above the 3D viewport to emulate less powerful devices and test [streaming-enabled](../workspace/streaming.md) experiences where 3D content dynamically loads/unloads based on available memory. You can also adjust the **view&nbsp;size** and change the **device orientation** between landscape and portrait modes.

<img src="../assets/studio/general/Editor-Window-Emulation-Options.jpg" width="800" alt="Emulation options above the 3D viewport" />

## Player Emulation

For detailed emulation of experience [localization](../production/localization/index.md) and content policies, you can test through the **Player** emulator.

<img src="../assets/studio/general/Test-Tab-Emulation-Player.png" width="800" alt="Player emulator button indicated in Test tab" />

1. Click the **Player** button to open the emulator window.
1. Toggle on **Enable Test Profile** in the window. Emulation will remain as toggled (enabled or disabled) even if you close the window.
1. Lower down in the window, the following options are available:

   - **Locale** lets you emulate a [localized](../production/localization/index.md) language while playtesting.
   - **Region** lets you emulate a player's country/region while playtesting; this selection may impact other toggles and checkboxes in the window as outlined in `Class.PolicyService:GetPolicyInfoForPlayerAsync()|GetPolicyInfoForPlayerAsync()`.

1. Start playtesting in either **Play** or **Play&nbsp;Here** mode to test the chosen settings.

## Collaborative Testing

If you're working on an experience with others in [Collaboration](../projects/collaboration.md) mode, you can test with other creators as follows:

1. In the **Clients and Servers** section, select **Team Test** in the upper box and press the **Start** button to publish the current state of the experience and create a new Studio session with your character inserted.

   <img src="../assets/studio/debugging/Test-Tab-Clients-Servers-Team-Test.png" width="800" alt="Team Test setup indicated in Test tab" />

1. Other collaborators can then join by pressing **Join** from the **Test** tab.

   <img src="../assets/studio/debugging/Test-Tab-Clients-Servers-Team-Test-Join.png" width="800" alt="Team Test join button indicated in Test tab" />

   <Alert severity="info">
   Only one team test session can run at any given time. To close a session and kick out all testers, click the **Shutdown&nbsp;Server** button.
   </Alert>

## Testing in VR

If you'd like to support Virtual Reality (VR) headsets for your experience, make sure to test in VR in Studio. Studio supports testing for all VR headsets that are compatible with [OpenXR](https://www.khronos.org/openxr/), the open-source industry standard providing access to VR.

<Alert severity="info">
Currently, Testing in VR is only supported on Windows.
</Alert>

### Headset Configuration

To enable Studio testing in VR, you must first connect your headset to your PC and configure the OpenXR runtime **before** launching on Studio. If you've already launched Studio, quit and complete the configuration steps first.

If you only have one VR headset, installing the corresponding VR app automatically configures the runtime for you. If you have multiple headsets, you need to set up the runtime manually and make sure to **only** configure the one that you want to use for testing.

The following steps are for the two most common VR apps:

- SteamVR for headsets such as HTC Vive and Valve Index.
- Oculus for headsets such as Meta Quest and Oculus Rift.

<Tabs>
<TabItem label="Steam VR">

1. Install and open the SteamVR app on your computer.
2. Under **SteamVR Settings**, select the **Developer** tab, then select **Show Advanced Settings**.
3. Set SteamVR as OpenXR runtime.
4. Turn the controllers on by pressing the **System** button until you hear a beeping sound.
   - To turn the controller off, press and hold the **System** button until you hear the same beeping sound.

If you follow the steps correctly, the status icons on the SteamVR app and the status lights on the hardware should all be green, indicating that the configuration is completed.

<Alert severity="info">
When you quit the SteamVR app, the controllers automatically turn off. The controllers also automatically turn off after being idle for a period of time.
</Alert>

</TabItem>
<TabItem label="Oculus VR">

1. Install and open the Oculus App on your computer.
2. Confirm that your device is connected and the status is ready.
3. Under **Settings / General** in the Oculus App, select **OpenXR Runtime**.
4. (Optional) Bring up the **Devices** tab and find your headset to confirm the configuration by checking if the status is green without errors.

<Alert severity="info">
When using Oculus VR, ensure the following:
- At minimum, Oculus drivers require an NVidia GTX1060 graphics card or equivalent.
- If you are using Quest 2 with a link cable, you must enable the link inside the headset.
</Alert>

</TabItem>
</Tabs>

### Roblox Quest App

You can test your experience in the Roblox app on Quest without linking your headset to your computer. Use the following steps to access your experience on your headset in this mode:

1. In Studio, publish the experience and set the experience to private.
2. Using your [Creator Dashboard](https://create.roblox.com/creations) or the link in Studio, open the experience page in your web browser.
3. On the experience page, add the experience to your favorites by clicking the **Favorite** icon.
4. Using your headset, open the standalone Roblox app.
5. Scroll down to the **Favorites** section in the home page and run your experience.

### Studio VR Mode

After [configuring your headset](#headset-configuration), you can turn on the Studio VR testing mode through the following steps:

1. In the **File** menu, select **Studio Settings**.
2. Select **Rendering**.
3. Under **General** settings, turn on **VR Mode**.

You can now test your experience using your VR headset using any of the available [playtest options](#playtest-options). During a VR testing session, if your headset cable disconnects, or you close the Roblox Studio Beta app on the headset, you need to restart Studio to re-run testing.
