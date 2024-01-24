---
title: Game Settings
description: The Game Settings window contains all Studio-level settings and customization options for an experience.
---

The **Game Settings** window contains all Studio-level settings and
customization options for Roblox experiences, including settings for
[permissions](#permissions), [monetization](#monetization), [security](#security), and [localization](#localization). You can access it from the [Home](../studio/home-tab.md) tab of the toolbar.

<img src="../assets/studio/general/Home-Tab-Game-Settings.png" width="800" alt="Game Settings button indicated in Home tab" />

<Alert severity="warning">
The **Game Settings** window is only available for experiences saved or [published](../production/publishing/publishing-experiences-and-places.md) to Roblox.
</Alert>

## Basic Info

The **Basic Info** tab contains general settings for an experience, such as its name, description, and promotional images.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Name**</td>
    <td>The experience's title.</td>
  </tr>
  <tr>
    <td>**Description**</td>
    <td>A description of the experience that describes what a potential player should expect.</td>
  </tr>
	<tr>
    <td>**Age Recommendation**</td>
    <td>[Experience Guidelines](../production/promotion/experience-guidelines.md) provide information on the experience's main page about what kind of content the experience contains.</td>
  </tr>
  <tr>
    <td>**Game Icon**</td>
    <td>Lets you upload an [icon](../production/publishing/experience-icons.md) to represent your experience.</td>
  </tr>
  <tr>
    <td>**Screenshots & Videos**</td>
    <td>Lets you upload [promotional thumbnails](../production/promotion/promotional-thumbnails.md). </td>
  </tr>
  <tr>
    <td>**Genre**</td>
    <td>The genre that best describes your experience.</td>
  </tr>
  <tr>
    <td>**Playable Devices**</td>
    <td>Lets you enable each applicable device that supports your experience.</td>
  </tr>
</tbody>
</table>

## Communication

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Enable Microphone**</td>
    <td>Enables voice-eligible users to use chat with spatial voice within your experience. See [Spatial Voice](../chat/spatial-voice.md) for more information.</td>
  </tr>
  <tr>
    <td>**Enable Camera**</td>
    <td>Enables eligible users to animate their avatar with their camera in your experience. See [Animate Your Avatar](https://en.help.roblox.com/hc/en-us/articles/17877687557396) for more information.</td>
  </tr>
</tbody>
</table>

## Permissions

The **Permissions** tab lets you control the audience for your experience.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Playability**</td>
    <td>Sets which users can access the experience.</td>
  </tr>
</tbody>
</table>

## Monetization

The **Monetization** tab contains settings that let you [monetize](../production/monetization/index.md) your experience.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Badges**</td>
    <td>Lets you create and manage all [badges](../production/publishing/badges.md) for your experience.</td>
  </tr>
  <tr>
    <td>**Paid Access**</td>
    <td>Lets you enable [paid access](../production/monetization/paid-access.md).</td>
  </tr>
  <tr>
    <td>**Private Servers**</td>
    <td>Lets you enable [private servers](../production/monetization/private-servers.md).</td>
  </tr>
  <tr>
    <td>**Developer&nbsp;Products**</td>
    <td>Lets you create and manage all [developer products](../production/monetization/developer-products.md) for your experience.</td>
  </tr>
</tbody>
</table>

## Security

The **Security** tab contains settings related to network communication, sales, and teleports.

<Alert severity="warning">
You should only enable the following settings if you trust all assets from other users or groups within your experience, otherwise your experience is vulnerable to security risks.
</Alert>

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Allow HTTP Requests**</td>
    <td>Allows experiences' servers to issue requests to remote servers via `Class.HttpService`.</td>
  </tr>
  <tr>
    <td>**Enable&nbsp;Studio&nbsp;Access to API Services**</td>
    <td>Lets Studio access API services. This setting is useful for testing the implementation of services like [data stores](../cloud-services/datastores.md).</td>
  </tr>
  <tr>
    <td>**Allow Third Party Sales**</td>
    <td>Lets players purchase items from third parties. When this setting is disabled, all purchase prompts from assets you own will continue to work while purchase prompts from assets published by other users or groups will fail.</td>
  </tr>
  <tr>
    <td>**Allow Third Party Teleports**</td>
    <td>Lets players [teleport](../projects/teleporting.md) to other experiences.</td>
  </tr>
</tbody>
</table>

## Places

The **Places** tab contains place-specific settings.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Create**</td>
    <td>Lets you create a new place within your experience.</td>
  </tr>
  <tr>
    <td>**&ctdot;**</td>
    <td>Opens a pop-up menu with options to **Configure&nbsp;Place** (edit place-specific settings such as the maximum number of players), or **Version&nbsp;History** to view, download, and open any previous version of the experience.</td>
  </tr>
</tbody>
</table>

## Localization

The **Localization** tab contains language settings related to [localization](../production/localization/index.md) both within the experience and in the cloud.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Source Language**</td>
    <td>Lets you choose the language that you used to create the experience.</td>
  </tr>
  <tr>
    <td>**Automatic Text Capture**</td>
    <td>Automatically captures text from the experience's UI while users are accessing the experience.</td>
  </tr>
  <tr>
    <td>**Use Translated Content**</td>
    <td>Enables translated content within the experience.</td>
  </tr>
  <tr>
    <td>**Automatic Translation**</td>
    <td>The languages for which you'd like to enable [automatic translation](../production/localization/automatic-translations.md).</td>
  </tr>
</tbody>
</table>

## Avatar

The **Avatar** tab includes global settings for all users'
[avatars](../characters/index.md) while they are in the experience.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Presets**</td>
    <td>Sets the options lower in the tab to presets for **Default**, **Classic&nbsp;Scale**, **Full&nbsp;Classic**, **Rthro**, or **Player&nbsp;Choice**.</td>
  </tr>
  <tr>
    <td>**Avatar&nbsp;Type**</td>
    <td>Sets the default [avatar type](../characters/appearance.md#avatar-types) to either **R6**, **R15**, or **Player&nbsp;Choice**.</td>
  </tr>
  <tr>
    <td>**Animation**</td>
    <td>Sets the default animation to either **Standard** or **Player&nbsp;Choice**.</td>
  </tr>
  <tr>
    <td>**Collision**</td>
    <td>Sets the collision type to either the **Outer&nbsp;Box** or **Inner&nbsp;Box**.</td>
  </tr>
  <tr>
    <td>**Scale**</td>
    <td>For **R15** avatars, options to customize body type, height, width, head size, and proportions.</td>
  </tr>
  <tr>
    <td>**Body&nbsp;Parts**</td>
    <td>Lets you override a user's default body part type to a custom ID.</td>
  </tr>
  <tr>
    <td>**Clothing**</td>
    <td>Lets you override a user's default classic clothing ID to a custom ID.</td>
  </tr>
</tbody>
</table>

## World

The **World** tab includes global settings for the experience, such as
gravity, character jump behavior, and walk speed.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Presets**</td>
    <td>Sets the options lower in the tab to presets for **Classic**, **Realistic**, or **Action**.</td>
  </tr>
  <tr>
    <td>**Gravity**</td>
    <td>Sets the overall world gravity in studs per second² (note the meters per second² equivalent in parentheses).</td>
  </tr>
  <tr>
    <td>**Jump**</td>
    <td>Sets either the humanoid **jump height** in studs or the **jump power** in studs per second. Note how adjusting this value changes the max jump distance in relation to the walk speed.</td>
  </tr>
  <tr>
    <td>**Walk**</td>
    <td>Sets the humanoid walk speed in studs per second. Adjusting this value changes the **max jump distance** in relation to jump height or power.</td>
  </tr>
  <tr>
    <td>**Slope**</td>
    <td>Determines the maximum slope angle that humanoids can climb. If the angle of a slope is greater than this value, the humanoids will slide down the slope.</td>
  </tr>
</tbody>
</table>

## Other

The **Other** tab includes settings that are typically reserved for special situations, such as collaborative scripting and shutting down all servers.

<table>
<thead>
  <tr>
    <th>Setting</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Enable Drafts Mode**</td>
    <td>Enables asynchronous, drafts-based script editing in a [Team Create](../projects/collaboration.md) session.</td>
  </tr>
  <tr>
    <td>**Shutdown All Servers**</td>
    <td>Shuts down all servers currently running the experience.</td>
  </tr>
</tbody>
</table>
