---
title: Badges
description: Badges are a special award you can gift users when they meet a goal within your experience.
---

A **badge** is a special award you can gift players when they meet a goal within your experience, such as completing a difficult objective or playing for a certain amount of time. As soon as a player receives a badge, it displays within the **Badges** category of their inventory.

<figure>
<img src="../../assets/publishing/badges/Badges-Inventory.png" width="724" alt="Example badges in a player's inventory" />
<figcaption>Example badges in a player's inventory</figcaption>
</figure>

## Creating Badges

You can create up to 5 badges for free in a 24‑hour period (GMT) for each experience you own. If you want to create more within the 24‑hour period, each additional badge costs 100 Robux.

To create a badge:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Locate the associated experience, click the **&ctdot;** in the corner of its thumbnail, and select **Create Badge**.

   <img src="../../assets/creator-dashboard/Experience-Context-Menu-Create-Badge.png" width="420" alt="Create Badge option from Creator Dashboard" />

1. On the create page, click the **Upload Image** button and then select/confirm the image you want to use as the badge's icon. When creating an image to use for a badge, consider the following:

   - Use a template of **512×512 pixels**.
   - The upload process trims and crops the badge image into a circular icon, so avoid putting important details outside of the circular boundaries.

     <GridContainer numColumns="2">
     <figure>
     <img src="../../assets/publishing/badges/Circular-Trimming-Good.png" alt="Good circular trimming" />
     <figcaption>
     <Alert severity="success">Main content included</Alert>
     </figcaption>
     </figure>
     <figure>
     <img src="../../assets/publishing/badges/Circular-Trimming-Bad.png" alt="Bad circular trimming" />
     <figcaption>
     <Alert severity="error">Text content cropped</Alert>
     </figcaption>
     </figure>
     </GridContainer>

1. Fill in the following fields:

   - **Name** — A title for the badge.
   - **Description** — A description of what the player can do to earn the badge.

1. Click the **Create Badge** button. The new badge displays within the **Engagement**&nbsp;&rarr; **Badges** section on the [Creator Dashboard](https://create.roblox.com/dashboard/creations), as well as the **Badges** section of the experience's main page.

   <figure>
	 <img src="../../assets/publishing/badges/Badge-Experience-Page.png" width="780" />
	 <figcaption>Badge on experience's main page</figcaption>
	 </figure>

## Scripting Badges

Common badge scripting workflows include [awarding badges](#awarding-badges), checking if a player has previously [earned](#checking-earned-badges) a badge in your experience, and [getting badge information](#getting-badge-info).

### Locating Badge IDs

A badge's ID is its unique identifier. You'll need this ID when implementing workflows such as [awarding the badge](#awarding-badges) to a player.

1. On the [Creator Dashboard](https://create.roblox.com/dashboard/creations), navigate to the associated experience's **Badges** section under **Engagement**.

   <img src="../../assets/creator-dashboard/Experience-Nav-Engagement-Badges.png" width="330" alt="Badges button indicated for an experience on the Creator Dashboard" />

1. Click the **&ctdot;** button for a badge and select **Copy Asset ID**.

   <img src="../../assets/creator-dashboard/Badge-Copy-Asset-ID.png" width="400" />

### Awarding Badges

You can award badges to players throughout your experience by calling the `Class.BadgeService:AwardBadge()` method in a server-side `Class.Script`. `Class.BadgeService:GetBadgeInfoAsync()` returns properties of the badge, including `IsEnabled` which confirms whether or not the badge can be awarded to a player.

The following is an example of a safe function for awarding badges to players.

```lua
local BadgeService = game:GetService("BadgeService")

local function awardBadge(player, badgeId)
  -- Fetch badge information
  local success, badgeInfo = pcall(BadgeService.GetBadgeInfoAsync, BadgeService, badgeId)
  if success then
    -- Confirm that badge can be awarded
    if badgeInfo.IsEnabled then
      -- Award badge
      local awarded, errorMessage = pcall(BadgeService.AwardBadge, BadgeService, player.UserId, badgeId)
      if not awarded then
        warn("Error while awarding badge:", errorMessage)
      end
    end
  else
 	  warn("Error while fetching badge info!")
  end
end
```

### Checking Earned Badges

The following script checks when any player enters the experience, then verifies if that player owns the badge with the [matching ID](#locating-badge-ids) set in the variable `badgeID`.

```lua
local BadgeService = game:GetService("BadgeService")
local Players = game:GetService("Players")

local BADGE_ID = 00000000  -- Change this to your badge ID

local function onPlayerAdded(player)
  -- Check if the player has the badge
	local success, hasBadge = pcall(BadgeService.UserHasBadgeAsync, BadgeService, player.UserId, badgeID)

  -- If there's an error, issue a warning and exit the function
	if not success then
		warn("Error while checking if player has badge")
		return
	end

	if hasBadge then
		-- Handle player's badge ownership as needed
	end
end

-- Connect "PlayerAdded" events to the "onPlayerAdded()" function
Players.PlayerAdded:Connect(onPlayerAdded)
```

### Getting Badge Info

To get information about a badge, such as its description or icon asset
ID, call the `Class.BadgeService:GetBadgeInfoAsync()` method with a [badge ID](#locating-badge-ids). For example:

```lua
local BadgeService = game:GetService("BadgeService")

local BADGE_ID = 00000000  -- Change this to your badge ID

-- Fetch badge information
local success, result = pcall(BadgeService.GetBadgeInfoAsync, BadgeService, BADGE_ID)

-- Output the information
if success then
	print("Badge:", result.Name)
	print("Enabled:", result.IsEnabled)
	print("Description:", result.Description)
	print("Icon:", "rbxassetid://" .. result.IconImageId)
else
	warn("Error while fetching badge info:", result)
end
```
