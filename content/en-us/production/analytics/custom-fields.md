---
title: Custom Fields
description: Use custom fields as an additional analytics tool to track unique milestones in your experience.
---

You can use up to 3 custom fields to filter your [Economy](./economy-events.md) and [Funnel](./funnel-events.md) events by unique dimensions specific to your experience. Some examples include:

- Levels — 1, 2, 3, . . .
- Player class — Warrior, Mage, Archer
- Weapon type — SMG, Pistol, Rocket Launcher

The `customFields` parameter is a dictionary argument that allows sending up to three custom values using the provided `Enum.AnalyticsCustomFieldKeys` as keys. You can have up to 8,000 unique combinations of values across the three custom fields.

Using a fantasy-related experience as an example, you can track an economy event regarding equipment type, player class, and level with the following:

```lua title="Tracking Custom Fields"
local AnalyticsService = game:GetService("AnalyticsService")

AnalyticsService:LogEconomyEvent(
    player,
    Enum.AnalyticsEconomyFlowType.Sink,
    "Coins", -- Currency name
    80, -- Cost
    20, -- Balance after transaction
    Enum.AnalyticsEconomyTransactionType.Shop.Name,
    "Obsidian Sword", -- Item SKU
    {
	[Enum.AnalyticsCustomFieldKeys.CustomField01.Name] = "Category - Weapon",
	[Enum.AnalyticsCustomFieldKeys.CustomField02.Name] = "Class - Warrior",
	[Enum.AnalyticsCustomFieldKeys.CustomField03.Name] = "Level - 10",
    } -- Custom field dictionary table
)
```

Including the dimension name in the value is not required, but can help you remember the context later when reviewing your charts. Other keys in the `customFields` table are ignored.
