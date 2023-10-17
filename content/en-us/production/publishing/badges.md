---
title: Badges
description: Badges are a special award you can gift users when they meet a goal within your experience.
---

A **Badge** is a special award you can gift players when they meet a goal within your experience, such as completing a difficult objective or playing for a certain amount of time. As soon as a player receives a Badge, it displays within the **Badges** category of their inventory.

<img src="../../assets/publishing/badges/Inventory-Badges.png" width="60%" />

## Creating Badges

When you're creating an image to use for your Badge, consider the following requirements:

- Use a template of **512×512 pixels**.
- Save the image in either `.jpg`, `.png`, `.tga`, or `.bmp` format.
- Don't include important details outside of the circular boundaries because the upload process trims and crops the final Badge into a circular image.

<GridContainer numColumns="2">
  <figure>
    <img alt="Good circular trimming" src="../../assets/publishing/badges/Circular-Trimming-Good.png" />
    <figcaption>
      <Alert severity="success">Includes all content</Alert>
    </figcaption>
  </figure>
  <figure>
    <img alt="Bad circular trimming" src="../../assets/publishing/badges/Circular-Trimming-Bad.png" />
    <figcaption>
      <Alert severity="error">Crops content</Alert>
    </figcaption>
  </figure>
</GridContainer>

You can create up to 5 Badges for free in a 24-hour period (GMT) for each experience you own. If you want to create more Badges within the 24-hour period, it costs <b>100 Robux</b> per additional Badge.

To create a Badge:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Click on the experience you want to create a Badge for. The experience's **Overview** page displays.
1. In the left-hand navigation, select **Associated Items**. The **Associated Items** page displays for that specific experience with the Badges section open by default.

   <img src="../../assets/promotion/Associated-Items-Badges.jpg" width="50%" />

1. Click the **CREATE BADGE** button. The **Create a Badge** page displays.
1. Click the **UPLOAD IMAGE** button. A file browser displays.
1. Select the image you want to display as the icon, then click the **Open** button.
1. Fill in the following fields:

   - **Name**: A title for your Badge.
   - **Description**: A description of what the player can do to earn the Badge.

1. Click the **CREATE Badge** button or **Purchase for 100 Robux** button if you have already created 5 Badges in a 24-hour period. The Badge displays within the **Badges** section of the **Associated Items** page, as well as the **Badges** section of the experience's main page.

   <img src="../../assets/promotion/Create-A-Badge.jpg" width="70%" />

   <img src="../../assets/publishing/badges/Badge-Created.png" width="80%" />

### Locating Badge IDs

A Badge ID is the unique identifier of a Badge. You need this ID when you are [scripting Badges](#scripting-badges).

To locate a Badge ID:

1. Navigate to the **Badges** section of an experience's **Associated Items** page.

1. Hover over a Badge thumbnail and click the **&ctdot;** button. A contextual menu displays.

1. Select **Copy Asset ID**. The Badge ID copies to your clipboard.

   <img src="../../assets/promotion/Copy-AssetID-Badges.jpg" width="50%" />

## Scripting Badges

Use scripting to give and keep track of Badges in your experiences. Common Badge scripting use cases include [awarding](#awarding-badges) Badges, [checking if a player has previously earned a Badge](#checking-earned-badges) in your experience, and [getting Badge information](#getting-badge-info).

### Awarding Badges

You can award players Badges throughout your experience by calling the **`Class.BadgeService:AwardBadge()`** function in a server-side **`Class.Script`**. **`Class.BadgeService:GetBadgeInfoAsync()`** returns properties of the Badge, including **`IsEnabled`**, which confirms whether or not the Badge can be awarded to a player. You should call this to check before awarding a Badge.

The following script contains an example of a safe function for awarding Badges to players.

```lua
local BadgeService = game:GetService("BadgeService")

local function awardBadge(player, badgeId)
  -- Fetch Badge information
  local success, badgeInfo = pcall(BadgeService.GetBadgeInfoAsync, BadgeService, badgeId)
  if success then
    -- Confirm that badge can be awarded
    if badgeInfo.IsEnabled then
      -- Award badge
      local awarded, errorMessage = pcall(BadgeService.AwardBadge, BadgeService, player.UserId, badgeId)
      if not awarded then
        warn("Error while awarding Badge:", errorMessage)
      end
    end
  else
 	  warn("Error while fetching Badge info!")
  end
end
```

### Checking Earned Badges

The following script checks when any player enters the experience, then verifies if that player owns the Badge with the [matching ID set](#locating-badge-ids) in the variable **`badgeID`**.

```lua
local BadgeService = game:GetService("BadgeService")
local Players = game:GetService("Players")

local BADGE_ID = 00000000  -- Change this to your Badge ID

local function onPlayerAdded(player)
  -- Check if the player has the Badge
	local success, hasBadge = pcall(BadgeService.UserHasBadgeAsync, BadgeService, player.UserId, badgeID)

  -- If there's an error, issue a warning and exit the function
	if not success then
		warn("Error while checking if player has Badge!")
		return
	end

	if hasBadge then
		-- Handle player's Badge ownership as needed
	end
end

-- Connect "PlayerAdded" events to the "onPlayerAdded()" function
Players.PlayerAdded:Connect(onPlayerAdded)
```

### Getting Badge Info

To get information about a Badge, such as its description or icon asset
ID, use the **`Class.BadgeService:GetBadgeInfoAsync()`** function with a [**`badge ID`**](#locating-badge-ids). For example:

```lua
local BadgeService = game:GetService("BadgeService")

local BADGE_ID = 00000000  -- Change this to your Badge ID

-- Fetch Badge information
local success, result = pcall(BadgeService.GetBadgeInfoAsync, BadgeService, BADGE_ID)
print(success, result)

-- Output the information
if success then
	print("Badge:", result.Name)
	print("Enabled:", result.IsEnabled)
	print("Description:", result.Description)
	print("Icon:", "rbxassetid://" .. result.IconImageId)
else
	warn("Error while fetching Badge info:", result)
end

```
