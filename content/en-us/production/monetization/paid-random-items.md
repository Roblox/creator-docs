---
title: Paid random items policy guidelines
description: Summarizes Roblox's policy for offering paid random items in a game.
---

Due to regulations in various countries, certain requirements may apply to random items purchased directly or indirectly with Robux. This includes random items purchased with paid in-game currency. For example, both of the following are paid random items:

- Paying Robux to spin a prize wheel
- Paying Robux to buy gems or spin tickets that are spent at a prize wheel

There are a variety of item types that are paid random items, including but not limited to:

<table>
<thead>
	<tr>
		<th><b>Item type</b></th>
		<th><b>Examples</b></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><b>Capsule items</b></td>
		<td><ul><li>Spin a wheel for a prize</li><li>Hatch an egg for a pet</li><li>Open a chest for loot</li></ul></td>
	</tr>
	<tr>
		<td><b>Enhancement items</b></td>
		<td><ul><li>Potion for ability with random duration</li><li>Upgrade spell with some chance of working</li></ul></td>
	</tr>
	<tr>
		<td><b>Combination items</b></td>
		<td><ul><li>Consuming or synthesizing two rare eggs for a better chance of a higher-quality result</li></ul></td>
	</tr>
	<tr>
		<td><b>Probability modifier items</b></td>
		<td><ul><li>Luck boosts</li><li>Pity systems</li><li>Enhanced resource drops</li><li>Rate-up scrolls</li></ul></td>
	</tr>
</tbody>
</table>

## Item odds disclosures

Under Roblox's [Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use) and [Community Standards](https://about.roblox.com/community-standards#roblox-economy-paid-random-items), if you offer paid random items that users can purchase with Robux or other in-game currency purchasable with Robux, you must indicate all possible outcomes and the actual numerical odds of what they may receive.

<img src="../../assets/policy/paid-random-items/Prize-wheel.png" width="70%" alt="An example prize wheel with numerical odds of what users may receive." />

In addition:

- If there are too many individual outcomes to fit in the user's dynamic 3D view, such as rarity categories that have many individual items in each category, the itemized list of final outcomes and their numerical possibilities can be shown in a clickable pop-up with an "Info" or "Details" icon visible and accessible prior to purchase. Using a standalone symbol like the (i) icon without a descriptive word is **not** sufficient.

- Odds must be displayed as a probability percentage, and the probability percentages of all final outcomes must sum to exactly 100%. For probabilities with long decimals, you can round to four or more decimal places lower than the decimal place with the first non-zero number, and include a disclaimer, such as: "Probabilities are rounded; total of displayed individual probabilities may not equal 100%."

- If many items within a list have the same individual odds, it is acceptable to disclose at the beginning of the list of items "Odds for each item listed below: X%"

- If users can only obtain one instance of an outcome, the odds for the remaining obtainable outcomes must be updated to reflect up-to-date remaining odds for that user.

<figure>
<img width="70%" src="../../assets/policy/paid-random-items/Before-Outcome.png" />
<figcaption>Example of odds by rarity tier with clickable "Details" button</figcaption>
</figure>

<figure>
<img width="70%" src="../../assets/policy/paid-random-items/After-Outcome.png" alt="" />
<figcaption>Example of individual item odds disclosure</figcaption>
</figure>

<Alert severity="warning">
This policy also applies to indirect purchases. For example, if a user uses their Robux to purchase keys to open boxes, re-roll tokens, or spin tickets, you must disclose the odds of their potential award before they spend the in-game currency on the random outcome.
</Alert>

Paid items that augment the odds of other random outcomes must also be explained before purchase. For example, if a user can purchase a "lucky potion" or "magic fishing rod" that improves the odds of more unlikely outcomes, these impacts must be numerically explained. The new odds of the enhanced random items must also be dynamically updated when these items are active to show the user's true odds.

<Alert severity="info">
If your game offers randomized virtual rewards in exchange for completing an action that does not involve the payment of Robux or other in-game currency, you aren't required to disclose the odds. For example, if a user locates a key that opens a treasure chest, you don't need to state the odds of what items they might receive from the treasure chest.
</Alert>

## Per-user regulations

To help you determine how to handle virtual items in your game per user, use the `Class.PolicyService.GetPolicyInfoForPlayerAsync|PolicyService:GetPolicyInfoForPlayerAsync()` method. Specifically, the structure of the returned dictionary includes `ArePaidRandomItemsRestricted` and `IsPaidItemTradingAllowed`.

### ArePaidRandomItemsRestricted

When `ArePaidRandomItemsRestricted` is **true**, the user cannot interact with paid random item generators, either through Robux directly or game currency bought with Robux.

For ineligible users defined by the API, creators must apply one of these treatments:

<table>
<thead>
	<tr>
		<th><b>Treatment</b></th>
		<th><b>Examples</b></th>
	</tr>
</thead>
<tbody>
	<tr>
		<td><b>Offering an unpaid, earnable path to acquiring the random item</b></td>
		<td>Mystery eggs are granted for free at milestones of gameplay</td>
	</tr>
	<tr>
		<td><b>Offering the item's outcomes in a pre-determined, non-random order disclosed to the user before purchase</b></td>
		<td>First spin is always 5 gems, second is always 10 gems, third is always 20 gems, etc.</td>
	</tr>
	<tr>
		<td><b>Offering the specific outcomes for direct, guaranteed purchase (priced based on the expected value of the outcome)</b></td>
		<td>If a lootbox for a rare sword is 10 Robux with 5% odds, offer the sword to ineligible users for direct purchase priced at 200 Robux</td>
	</tr>
	<tr>
		<td><b>Removing or hiding the paid random item from the game</b></td>
		<td>Replace a giant spin prize wheel with a shop offering direct purchases</td>
	</tr>
	<tr>
		<td><b>Blocking the purchase of the paid random item with an error message</b></td>
		<td>Replacing the purchase button with "Sorry, this item is unavailable for users in your region"</td>
	</tr>
	<tr>
		<td><b>Removing the user from the parts of the game with paid random items</b></td>
		<td>Teleporting them away</td>
	</tr>
</tbody>
</table>

### IsPaidItemTradingAllowed

When `IsPaidItemTradingAllowed` is **true**, the user can trade virtual items that they purchased with game currency or Robux.

For ineligible users defined by the API, creators must not allow them to access the ability to trade the resulting outcome of a paid random item or other paid items.
