---
title: Experience Settings
description: The Experience Settings window contains Studio-level settings and customization options for a game.
---

The **Experience Settings** window, accessible from Studio's **File** menu, contains a wide array of Studio-level settings and customization options for Roblox games, including settings for [permissions](#permissions), [monetization](#monetization), [security](#security), and [localization](#localization).

<Alert severity="warning">
Many settings in this window modify underlying properties in your place file that aren’t visible in Studio or accessible with scripts. This can lead to unexpected or difficult-to-debug behavior, especially when working across teams or reverting changes. Make sure you fully understand the impact of each setting before applying changes.
</Alert>

## Basic Info

The **Basic Info** tab contains general settings for a game, such as its name, description, and promotional images.

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
    <td>The game's title.</td>
  </tr>
  <tr>
    <td>**Description**</td>
    <td>A description of the game that describes what a potential player should expect.</td>
  </tr>
	<tr>
    <td>**Content Maturity Label**</td>
    <td>[Content Maturity Labels](../production/promotion/content-maturity.md) provide information on the game's main page about what kind of content the game contains.</td>
  </tr>
  <tr>
    <td>**Game Icon**</td>
    <td>Lets you upload an [icon](../production/publishing/experience-icons.md) to represent your game.</td>
  </tr>
  <tr>
    <td>**Screenshots & Videos**</td>
    <td>Lets you upload [promotional thumbnails](../production/publishing/thumbnails.md). </td>
  </tr>
  <tr>
    <td>**Playable Devices**</td>
    <td>Lets you enable each applicable device that supports your game.</td>
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
    <td>Enables voice-eligible users to use voice chat within your game. See [Voice Chat](../chat/voice-chat.md) for more information.</td>
  </tr>
  <tr>
    <td>**Enable Camera**</td>
    <td>Enables eligible users to animate their avatar with their camera in your game. See [Animate Your Avatar](https://en.help.roblox.com/hc/en-us/articles/17877687557396) for more information.</td>
  </tr>
</tbody>
</table>

## Permissions

The **Permissions** tab lets you control the audience for your game.

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
    <td>Sets which users can access the game.</td>
  </tr>
</tbody>
</table>

## Monetization

The **Monetization** tab contains settings that let you [monetize](../production/monetization/index.md) your game.

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
    <td>Lets you create and manage all [badges](../production/publishing/badges.md) for your game.</td>
  </tr>
  <tr>
    <td>**Paid Access**</td>
    <td>Lets you enable [paid access in Robux](../production/monetization/paid-access-robux.md) or [paid access in local currency](../production/monetization/paid-access-local-currency.md).</td>
  </tr>
  <tr>
    <td>**Private Servers**</td>
    <td>Lets you enable [private servers](../production/monetization/private-servers.md).</td>
  </tr>
  <tr>
    <td>**Developer&nbsp;Products**</td>
    <td>Lets you create and manage all [developer products](../production/monetization/developer-products.md) for your game.</td>
  </tr>
</tbody>
</table>

## Security

The **Security** tab contains settings related to network communication, sales, and teleports.

<Alert severity="warning">
You should only enable the following settings if you trust all assets from other users or groups within your game, otherwise your game is vulnerable to security risks.
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
    <td>Allows game servers to issue requests to remote servers via `Class.HttpService`.</td>
  </tr>
  <tr>
    <td>**Secrets**</td>
    <td>Allows for the creation and configuration of `Datatype.Secret|Secrets` for local Studio sessions using `Class.HttpService`. For more information, see [Work with secrets](../cloud-services/secrets.md#local-secrets).</td>
  </tr>
  <tr>
    <td>**Enable Studio Access to API Services**</td>
    <td>Lets Studio access API services. This setting is useful for testing the implementation of services like [data stores](../cloud-services/data-stores).</td>
  </tr>
  <tr>
    <td>**Allow Third Party Sales**</td>
    <td>Lets players purchase items from third parties. When this setting is disabled, all purchase prompts from assets you own will continue to work while purchase prompts from assets published by other users or groups will fail.</td>
  </tr>
  <tr>
    <td>**Allow Third Party Teleports**</td>
    <td>Lets players [teleport](../projects/teleport.md) to other games.</td>
  </tr>
  <tr>
    <td>**Allow Mesh / Image APIs**</td>
    <td>Lets you use `Class.EditableImage` and `Class.EditableMesh` in published games. To enable usage, you must be 13+ age verified and ID verified.</td>
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
    <td>Lets you create a new place within your game.</td>
  </tr>
  <tr>
    <td>**&ctdot;**</td>
    <td>Opens a pop-up menu with options to **Configure&nbsp;Place** (edit place-specific settings such as the maximum number of players), or **Version&nbsp;History** to view, download, and open any previous version of the game.</td>
  </tr>
</tbody>
</table>

## Localization

The **Localization** tab contains language settings related to [localization](../production/localization/index.md) both within the game and in the cloud.

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
    <td>Lets you choose the language that you used to create the game.</td>
  </tr>
  <tr>
    <td>**Automatic Text Capture**</td>
    <td>Automatically captures text from the game's UI while users are accessing the game.</td>
  </tr>
  <tr>
    <td>**Use Translated Content**</td>
    <td>Enables translated content within the game.</td>
  </tr>
  <tr>
    <td>**Automatic Translation**</td>
    <td>The languages for which you'd like to enable [automatic translation](../production/localization/automatic-translations.md).</td>
  </tr>
</tbody>
</table>

## World

The **World** tab includes global settings for the game, such as
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
    <td>Enables asynchronous, drafts-based script editing in a [collaborative](../projects/collaboration.md) session.</td>
  </tr>
  <tr>
    <td>**Shutdown All Servers**</td>
    <td>Shuts down all servers currently running the game.</td>
  </tr>
</tbody>
</table>
