---
title: Profile Card
description: The Profile Card module lets players see more information about other players in an experience.
---

It can be interesting to learn about other players. The **ProfileCard** [developer module](../../resources/modules/index.md) is a great way to see more information about others within an experience, from badges achieved to the player's favorite games.

<video src="../../assets/developer-modules/profile-card/Showcase.mp4" controls width="100%"></video>

## Module Usage

### Installation

To use the **ProfileCard** module in an experience:

1. From the [View](../../studio/view-tab.md) tab, open the [Toolbox](../../projects/assets/toolbox.md) and select the **Creator Store** tab.

   <img src="../../assets/studio/general/View-Tab-Toolbox.png" width="776" alt="Toolbox toggle button in Studio" />

   <img src="../../assets/studio/toolbox/Creator-Store-Tab.png" width="360" />

1. Make sure the **Models** sorting is selected, then click the **See&nbsp;All** button for **Categories**.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-See-All.png" width="360" />

1. Locate and click the **Dev Modules** tile.

   <img src="../../assets/studio/toolbox/Creator-Store-Categories-Dev-Modules.png" width="200" />

1. Locate the **Profile Card** module and click it, or drag-and-drop it into the 3D view.

   <img src="../../assets/developer-modules/profile-card/Toolbox-Icon.png" width="143" />

1. In the [Explorer](../../studio/explorer.md) window, move the entire **ProfileCard** model into **ServerScriptService**. Upon running the experience, the module will distribute itself to various services and begin running.

   <img src="../../assets/developer-modules/profile-card/Move-Package.png" width="320" />

### Views

Profile cards have different views depending on whether you're viewing your own card or another player's card.

<Tabs>
<TabItem label="Your Card">
When you first spawn into the experience, an icon appears over your character. Clicking the icon opens the profile card view. Once the card is closed, the icon disappears, but you can reopen the card at any time by clicking your character.

<img src="../../assets/developer-modules/profile-card/Player-Icon.jpg" width="800" />

When viewing your own card, it appears as it would to another player, except placeholder text will appear for any blank inputs. Additionally, the status string is subject to **text filtering**, as any free text input should be.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/developer-modules/profile-card/Player-Card-Status-Empty.png" />
    <figcaption>Card without custom status</figcaption>
  </figure>
  <figure>
    <img src="../../assets/developer-modules/profile-card/Player-Card-Status-Set.png" />
    <figcaption>Card with custom status</figcaption>
  </figure>
</GridContainer>
<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/developer-modules/profile-card/Player-Card-Status-Entering.png" />
    <figcaption>Entering a custom status</figcaption>
  </figure>
  <figure>
    <img src="../../assets/developer-modules/profile-card/Player-Card-Status-Invalid.png" />
    <figcaption>Attempt to enter invalid status</figcaption>
  </figure>
</GridContainer>

</TabItem>
<TabItem label="Other Player's Card">
Icons do not appear over other characters, but clicking on a character will open their profile card. The button in the upper-right corner of the card lets you quickly request that player as a friend.

Note that players under the age of 13 will only see the status message if it's appropriate for their age group.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/developer-modules/profile-card/Other-Card-Status-Set.png" />
    <figcaption>Card with custom status</figcaption>
  </figure>
  <figure>
    <img src="../../assets/developer-modules/profile-card/Other-Card-Status-Empty.png" />
    <figcaption>Card without custom status</figcaption>
  </figure>
</GridContainer>

</TabItem>
</Tabs>

## API Reference

### Functions

#### configure

<figcaption>
configure(config: `Library.table`)
</figcaption>

Overrides default configuration options through the following keys/values in the `config` table. This function should be called from a `Class.LocalScript` within **StarterPlayerScripts**.

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
		<td>`alwaysOnTop`</td>
		<td>If `true`, shows locator icons on top of everything, preventing them from being blocked by 3D world objects.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`showPersonalIndicator`</td>
		<td>If `true`, shows the personal indicator when a player first joins the experience.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`showBlur`</td>
		<td>If `true`, shows the blurry screen background when a player enters edit mode.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`maxClickDistance`</td>
		<td>Maximum distance from the camera viewpoint a card will appear when a character is clicked, measured in studs.</td>
		<td>100</td>
	</tr>
	<tr>
		<td>`backgroundColor`</td>
		<td>Background color for the card (`Datatype.Color3`).</td>
		<td>[228, 255, 255]</td>
	</tr>
	<tr>
		<td>`backgroundTransparency`</td>
		<td>Transparency of the card's `backgroundColor`.</td>
		<td>0.2</td>
	</tr>
	<tr>
		<td>`isScaled`</td>
		<td>If `true`, automatically scales the size of the text to fill the height of the space.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`isTruncated`</td>
		<td>If `true`, automatically hides the ends of strings that would otherwise be too long for proper viewing.</td>
		<td>true</td>
	</tr>
	<tr>
		<td>`hasRoundedCorners`</td>
		<td>If `true`, the card's corners will be rounded.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`cornerRadiusValue`</td>
		<td>Value of the `Class.UICorner` corner radius, if `hasRoundedCorners` is `true`.</td>
		<td>20</td>
	</tr>
	<tr>
		<td>`hasBorder`</td>
		<td>If `true`, shows a border for the card.</td>
		<td>false</td>
	</tr>
	<tr>
		<td>`borderColor`</td>
		<td>Color of the card's border (`Datatype.Color3`). Only applies if `hasBorder` is `true`.</td>
		<td>[228, 255, 255]</td>
	</tr>
	<tr>
		<td>`borderThickness`</td>
		<td>Thickness of the card's border, if `hasBorder` is `true`.</td>
		<td>3</td>
	</tr>
	<tr>
		<td>`borderTransparency`</td>
		<td>Transparency of the card's border, if `hasBorder` is `true`.</td>
		<td>0</td>
	</tr>
	<tr>
		<td>`borderLineJoinMode`</td>
		<td>Corner style of the card's border (`Enum.LineJoinMode`). Only applies if `hasBorder` is `true`.</td>
		<td>`Enum.LineJoinMode|Round`</td>
	</tr>
	<tr>
		<td>`headerFontSize`</td>
		<td>Font size for the card's header.</td>
		<td>18</td>
	</tr>
	<tr>
		<td>`headerFontType`</td>
		<td>Font type for the card's header (`Enum.Font`).</td>
		<td>`Enum.Font|GothamBlack`</td>
	</tr>
	<tr>
		<td>`textFontSize`</td>
		<td>Font size for the card's body text.</td>
		<td>15</td>
	</tr>
	<tr>
		<td>`textFontType`</td>
		<td>Font type for the card's body text (`Enum.Font`).</td>
		<td>`Enum.Font|GothamMedium`</td>
	</tr>
</tbody>
</table>

```lua title='LocalScript' highlight='5-10'
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ProfileCard = require(ReplicatedStorage:WaitForChild("ProfileCard"))

ProfileCard.configure({
	alwaysOnTop = true,
	maxClickDistance = 50,
	backgroundColor = Color3.fromRGB(0, 0, 0),
	backgroundTransparency = 0.4
})
```
