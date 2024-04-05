---
title: Marketplace Fees and Commissions
description: Explains upload fees and commission from selling accessories and clothes on the Marketplace.
comments: Updates to this page require careful internal review. We generally don't accept pull requests on it.
---

<Alert severity = 'warning'>
Only creators participating in the [UGC program](https://devforum.roblox.com/t/updates-and-changes-to-the-ugc-catalog-application/1974990) can upload items on the Marketplace at this time.
</Alert>

You can create and sell bodies, heads, accessories, and clothes on the [Marketplace](https://www.roblox.com/catalog). After you pay any applicable upload fees, you can upload your new asset for marketplace approval. Once the moderation team reviews and approves your asset, you can set your item for sell on the Marketplace.

You receive a commission every time users purchase your item. If users purchase your item within an experience using the [Avatar Inspect Menu](../../players/avatar-inspect-menu.md) or the [Avatar Editor Service](../../players/avatar-editor.md), the experience owner also receives a commission. For information on viewing your sales data, see [Sales Data analytics](../../production/analytics/analytics-dashboard.md#sales-data).

## Upload Fees

When uploading, accessories, clothing, bodies, and heads require an upload fee of **750 Robux** per submission. In general, fees are not refunded if an item is rejected through moderation. If your asset clears the uploading process, your asset is ready to publish to the Marketplace.

## Publishing Advance

<Alert severity = 'info'>
Starting middle of March 2024, Marketplace items require a publishing advance that replaces the [per-unit fee](#per-unit-fee). Existing creators do not have to pay a publishing advance for any existing items.
</Alert>

A publishing advance is a refundable upfront fee that you pay at the time of publishing an item. This publishing advance is dynamic and dependent on the type of Marketplace item being sold:

- For **Non-Limited** items, the publishing advance can range between 500 and 1,500 Robux.
- For **Limited** items, the publishing advance can range between 5000 and 10,000 Robux.
  - The publishing advance does not apply for **free Limited items** which are Limited items that are sold at 0 cost. Free Limiteds still require a [per-unit fee](#per-unit-fee).
- Items taken off-sale and put back on-sale do not require another publishing advance.

When publishing an asset, Roblox does not take the 30% commission until the publishing advance is fully recouped as rebates to the creator. Rebates are granted within 24 hours of the item purchase and are independent of the 30 day escrow for [commissions](#commissions).

For an example of how the publishing advance is recouped, the following table represents a hypothetical situation where the **publishing advance is 1000 Robux**, and the **item is sold in an experience at 400 Robux**:

<table>
<thead>
  <tr>
    <th></th>
    <th colspan="2">**Creator Receives**</th>
    <th>**Roblox Receives**</th>
    <th>**Affiliate Receives**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td></td>
    <td>30% Creator Commission</td>
    <td>Publishing Advance Rebate (from Platform Commission)</td>
    <td>30% Platform Commission</td>
    <td>40% Affiliate (experience owner) Commission</td>
  </tr>
  <tr>
    <td>Unit 1 sold</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 2 sold</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 3 sold</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 4 sold </td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 5 sold</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 6 sold</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 7 sold</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 8 sold<br /><br />*Creator has received 960 Robux in total publishing advance rebates*</td>
    <td>120 Robux</td>
    <td>120 Robux</td>
    <td>← Given to creator</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 9 sold<br /><br />*Creator has received 1000 Robux in total publishing advance rebates*</td>
    <td>120 Robux</td>
    <td>40 Robux</td>
    <td>80 Robux</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Unit 10 sold<br /><br />*No more publishing advance rebate*</td>
    <td>120 Robux</td>
    <td>0 Robux</td>
    <td>120 Robux</td>
    <td>160 Robux</td>
  </tr>
  <tr>
    <td>Continues with each unit sold</td>
    <td>…</td>
    <td>…</td>
    <td>…</td>
    <td>…</td>
  </tr>
</tbody>
</table>

## Commissions

When community items are sold on Roblox, a portion of the sales is split between the item creator and Roblox. If the item is sold within an experience, the revenue share will additionally be split with the owner of the experience.

There is a 30 day escrow hold for each purchase. Roblox holds the commission from the sale of your items for 30 days starting from the date of sale and your Robux share of the sale.

| Item Type                                        | Marketplace Purchase |                 In-Experience Purchase                  |
| :----------------------------------------------- | :------------------: | :-----------------------------------------------------: |
| 3D assets (bodies, heads, clothing, accessories) | Creator receives 30% | Creator receives 30%<br />Experience owner receives 40% |
| Classic Clothing                                 | Creator receives 70% | Creator receives 60%<br />Experience owner receives 10% |

<Alert severity = 'info'>
Limited assets follow a different payout structure. See [Limiteds](#limiteds) for more information.
</Alert>

## Limiteds

When setting assets on sale, you can [configure your creation](../../art/marketplace/publishing-to-marketplace.md#marketplace-settings) as a **Limited** item to set an available quantity for that asset. Limiteds require a [per-unit fee](#per-unit-fee) and can be [resold](#reselling) by Premium members unless the item creator disables reselling.

At this time, only Roblox-created Limiteds are tradeable, and bodies and heads are not eligible as Limiteds.

### Per-unit Fee

When publishing Limiteds, you must provide a per-unit fee depending on the quantity being published and other factors like the type of asset being uploaded. This payment depends on a range of market-based factors and may change over time. When an item is sold, the creator receives this per-unit fee back in proportion to the quantity of items sold.

<Alert severity ='info'>
Limited items are also subject to different [sell price ranges](#price-range) for each asset type.
</Alert>

Like all items sold on Roblox, creators also receive a percentage [commission](#commissions) when participating in a Limited sale. See the following hypothetical example for a breakdown of payments and earnings for Limiteds:

- A creator intends to sell **200** Limited hats at **100** Robux each.
- The creator first pays a per-unit fee based on factors like quantity and asset type. In this hypothetical case, the per-unit fee that is due before publishing is **4,000** Robux or **20** Robux per item.
- When the item is purchased, the creator makes **50** Robux per sale: **30** Robux from the usual **30%** commission for creators, plus **20** Robux from the portion of the per-unit fee that is returned.
  - **30** Robux (commission per item): **100** Robux per item x **30%** commission
  - **20** Robux (per-unit fee): **4,000** Robux per-unit fee / **200** Limited hats
- This per-unit fee also applies when selling free Limiteds. If 200 limited hats are listed at a **0** Robux price, the creator pays **4,000** Robux to list this free limited item. For Limiteds set to a price of 0 (free items), **Roblox keeps the entire per-unit fee**.

<Alert severity ='warning'>
You cannot take your Limited item off-sale. If your item is moderated your payment is not refunded. For more information on our moderation policies and guidelines, see [Marketplace guidelines](../../art/marketplace/marketplace-policy.md#general-creation-guidelines).
</Alert>

### Reselling

If reselling is enabled by the original creator, [Premium](https://www.roblox.com/premium/membership) members can resell purchased Limited items. Every time a creator's item is resold, the creator benefits from a 10% original creator commission. After purchasing a Limited, there is up to a 30 day holding period when the item cannot be resold.

**Selling Limiteds**: As a reminder, when selling anything on Roblox, the item creator, the seller, and Roblox receive a split of every transaction as follows:

- 30% to creator
- 40% to seller/affiliate
- 30% to Roblox

**Reselling community-created Limiteds**: The following is the breakdown of the earning percentages for community-created Limited resales:

- 50% to reseller
- 10% to creator
- 10% to seller/affiliate
- 30% to Roblox

Similar to other commission and payment breakdowns, a single party can receive one or more commissions for a single transaction, such as the case where the original creator is also the reseller.

<Alert severity = 'warning'>
Robux acquired from trading or selling items that you didn't create are not considered earned and are ineligible for the Developer Exchange program. For more information on earning Robux, see [Earned Robux & DevEx Rates](https://en.help.roblox.com/hc/en-us/articles/203314100-Developer-Exchange-DevEx-FAQs#h_01FTN4PJV8AS4JHD2YHS363TDE).
</Alert>

### Rate Limits

To protect against automated purchases, Roblox sets purchase limits for Limiteds sold in-experience or in the Marketplace. For Limiteds, the following applies:

- Users are subject to the following purchase rate limits:
  - 9 successful purchases per minute per user.
  - 1 purchase request every 2 seconds per item per user.
  - A maximum of 3 successful purchases per user per item.
- For in-experience purchases, users must be in the experience for 60 seconds to successfully complete a purchase.

## Price Ranges

Depending on the 3D asset type, you must set the price of the item within the marketplace price range. If you are selling a [Limited](#limiteds) item, you can set your item price as **0**, or any value after the **Limiteds Price Floor**.

[View Current Marketplace Ranges](https://create.roblox.com/dashboard/creations/pricing)

## Classic Clothing

You can upload and sell [classic clothing](../../art/accessories/classic-clothing.md) through the Roblox website. It costs **10 Robux** to upload these assets.

Classic t-shirts do not require a fee when uploading, but they do require a **10 Robux** fee when going on sale for the first time. If the seller takes the item off sale, it does not require an additional fee when they place it on sale again.
