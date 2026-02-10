---
title: Marketplace fees and commissions
description: Explains upload fees and commission from selling accessories and clothes on the Marketplace.
comments: Updates to this page require careful internal review. We generally don't accept pull requests on it.
---

You can create and sell bodies, heads, accessories, and clothes on the [Marketplace](https://www.roblox.com/catalog). After you pay any applicable upload fees, you can upload your new asset for marketplace approval. Once the moderation team reviews and approves your asset, you can set your item for sell on the Marketplace.

You receive a commission every time users purchase your item. If users purchase your item within an experience using the [Avatar Inspect Menu](../players/avatar-inspect-menu.md), [Avatar Editor Service](../players/avatar-editor.md), or `Class.MarketplaceService`, the experience owner also receives a commission. For information on viewing your sales data, see [Sales Data analytics](../production/analytics/analytics-dashboard.md#sales-data).

## Upload fees

Uploading a 3D avatar item, such as accessories, bodies, and animations, requires an upload fee of **750 Robux** per submission. In general, fees are not refunded if an item is rejected through moderation. If your asset clears the uploading process, your asset is ready to publish to the Marketplace.

## Publishing advance

A publishing advance is a refundable upfront fee that you pay at the time of publishing an item. The publishing advance does not apply for **free Limited items** which require a [per-unit fee](#per-unit-fee). Items taken off-sale and put back on-sale do not require another publishing advance.

This publishing advance is dependent on the type of Marketplace item being sold:

<table>
<thead>
  <tr>
    <th>Asset type</th>
    <th>Non-limited publishing advance</th>
    <th>Paid limited publishing advance</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Hat</td>
    <td>1500</td>
    <td>13000</td>
  </tr>
  <tr>
    <td>Face</td>
    <td>1500</td>
    <td>13000</td>
  </tr>
  <tr>
    <td>Hair</td>
    <td>1000</td>
    <td>6000</td>
  </tr>
  <tr>
    <td>Neck</td>
    <td>1000</td>
    <td>15000</td>
  </tr>
  <tr>
    <td>Shoulder</td>
    <td>1000</td>
    <td>15000</td>
  </tr>
  <tr>
    <td>Front</td>
    <td>1000</td>
    <td>15000</td>
  </tr>
  <tr>
    <td>Back</td>
    <td>1000</td>
    <td>15000</td>
  </tr>
  <tr>
    <td>Waist</td>
    <td>1000</td>
    <td>15000</td>
  </tr>
  <tr>
    <td>Jacket</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>T-Shirt</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Shirt</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Sweater</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Pants</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Dress/Skirt</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Shorts</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Body</td>
    <td>2500</td>
    <td>20000</td>
  </tr>
  <tr>
    <td>Head</td>
    <td>1500</td>
    <td>10000</td>
  </tr>
  <tr>
    <td>Shoes</td>
    <td>600</td>
    <td>5000</td>
  </tr>
  <tr>
    <td>Emotes</td>
    <td>1500</td>
    <td>10000</td>
  </tr>
</tbody>
</table>

<BaseAccordion>
<AccordionSummary>Publishing advance example scenario</AccordionSummary>
<AccordionDetails>
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
</AccordionDetails>
</BaseAccordion>

Rebate credits are reimbursed once per day. See the following guidelines:

- Once per day, Roblox processes rebates from your sales and adds them to your transaction report.
  - If you see the rebate on your transaction report, the credit has been applied to your account.
  - The 30 day escrow does not apply for rebates.
- You can access this data on the Creator Dashboard's [My Transactions](https://create.roblox.com/dashboard/transactions) report, by filtering **Type of Transaction** to **Publishing Advance Rebates**.

  <img src="../assets/publishing/marketplace/Transaction-Report.png" alt="Transaction report filtered by Publishing Advance Rebates." width="100%" />

- If a sale occurs after Roblox processes rebates, you may need to wait until the next day's processing to receive the rebate credit and see the rebate in the transaction report.

## Commissions

When community items are sold on Roblox, a portion of the sales is split between the item creator and Roblox. If the item is sold within an experience, the revenue share will additionally be split with the owner of the experience.

<Alert severity = 'warning'>
Your account must follow [Marketplace Creator Requirements](./marketplace-policy.md#creator-requirements) to keep items listed on the Marketplace and eligible for commissions.
</Alert>

There is a 30 day escrow hold for each purchase. Roblox holds the commission from the sale of your items for 30 days starting from the date of sale and your Robux share of the sale.

| Item Type                                        | Marketplace Purchase |                 In-Experience Purchase                  |
| :----------------------------------------------- | :------------------: | :-----------------------------------------------------: |
| 3D assets (bodies, heads, clothing, accessories) | Creator receives 30% | Creator receives 30%<br />Experience owner receives 40% |
| Classic clothing                                 | Creator receives 70% | Creator receives 60%<br />Experience owner receives 10% |

<Alert severity = 'info'>
Limited items that are sold for free follow a different per-unit payout structure. See [Per-Unit Fee](#per-unit-fee) for more information.
</Alert>

### Progressive revenue share

Avatar items sold in the Marketplace use a progressive revenue share system: the more an item is priced above its asset type's [price floor](#price-ranges), the greater the share of revenue the creator earns. <br /><br />

Additional guidelines:

- Progressive revenue share **only applies to purchases in the Marketplace**. In-experience purchases receive the base 30% commission.
- The revenue share % is progressive. For example, an item priced at 1.15x the price floor will receive ~33% of the creator revenue share.
- [Regional pricing](../production/monetization/regional-pricing.md) adjustments do not affect revenue share percentage. Revenue share is based solely on the listed price relative to current floor.

<table><thead>
  <tr>
    <th>Price floor multiple</th>
    <th>Total creator revenue share</th>
  </tr></thead>
<tbody>
  <tr>
    <td>1</td>
    <td>30%</td>
  </tr>
  <tr>
    <td>1.3</td>
    <td>37%</td>
  </tr>
  <tr>
    <td>1.5</td>
    <td>41%</td>
  </tr>
  <tr>
    <td>2</td>
    <td>50%</td>
  </tr>
  <tr>
    <td>2.5</td>
    <td>57%</td>
  </tr>
  <tr>
    <td>3</td>
    <td>62%</td>
  </tr>
  <tr>
    <td>3.5</td>
    <td>65%</td>
  </tr>
  <tr>
    <td>4</td>
    <td>67%</td>
  </tr>
  <tr>
    <td>5</td>
    <td>69%</td>
  </tr>
  <tr>
    <td>6</td>
    <td>70%</td>
  </tr>
  <tr>
    <td>8</td>
    <td>70%</td>
  </tr>
  <tr>
    <td>10</td>
    <td>70%</td>
  </tr>
</tbody>
</table>

<BaseAccordion>
<AccordionSummary>Progressive commission example scenario</AccordionSummary>
<AccordionDetails>
The following is an example of a hypothetical breakdown of various item prices and expected creator share returns. The price floor in this scenario is set to 100.

<table><thead>
  <tr>
    <th>**Item price** <br/> *(Price floor at 100)*</th>
    <th>**Revenue share %**</th>
    <th>**Creator share**</th>
  </tr></thead>
<tbody>
  <tr>
    <td>100</td>
    <td>30%</td>
    <td>30</td>
  </tr>
  <tr>
    <td>130</td>
    <td>37%</td>
    <td>48</td>
  </tr>
  <tr>
    <td>150</td>
    <td>41%</td>
    <td>62</td>
  </tr>
  <tr>
    <td>200</td>
    <td>50%</td>
    <td>100</td>
  </tr>
  <tr>
    <td>250</td>
    <td>57%</td>
    <td>142</td>
  </tr>
  <tr>
    <td>300</td>
    <td>62%</td>
    <td>186</td>
  </tr>
  <tr>
    <td>350</td>
    <td>65%</td>
    <td>228</td>
  </tr>
  <tr>
    <td>400</td>
    <td>67%</td>
    <td>268</td>
  </tr>
  <tr>
    <td>500</td>
    <td>69%</td>
    <td>345</td>
  </tr>
  <tr>
    <td>600</td>
    <td>70%</td>
    <td>420</td>
  </tr>
  <tr>
    <td>800</td>
    <td>70%</td>
    <td>560</td>
  </tr>
  <tr>
    <td>1000</td>
    <td>70%</td>
    <td>700</td>
  </tr>
</tbody>
</table>

</AccordionDetails>
</BaseAccordion>

## Limiteds

When setting assets on sale, you can [configure your creation](../marketplace/publish-to-marketplace.md#marketplace-settings) as a **Limited** item to set an available quantity for that asset.

At this time, only Roblox-created Limiteds are tradeable.

### Per-unit fee

When publishing free Limiteds, you must provide a per-unit fee depending on the quantity being published and other factors like the type of asset being uploaded. This payment depends on a range of market-based factors and may change over time.

As a hypothetical case where limited hat items are 100 Robux per-unit, if 200 limited hats are listed at a **0** Robux price, the creator pays **20,000** Robux to list this free limited item. For free Limiteds, **Roblox keeps the entire per-unit fee**.

### Reselling

If reselling is enabled by the original creator, [Premium](https://www.roblox.com/premium/membership) members can resell purchased Limited items. Every time a creator's item is resold, the creator benefits from a 10% original creator commission. After purchasing a Limited, there is up to a 30 day holding period when the item cannot be resold.

<Alert severity = 'info'>
Reselling community-created Limiteds is not available for accounts based in Japan.
</Alert>

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

### Rate limits

To protect against automated purchases, Roblox sets purchase limits for Limiteds sold in-experience or in the Marketplace. For Limiteds, the following applies:

- Users are subject to the following purchase rate limits:
  - 9 successful purchases per minute per user.
  - 1 purchase request every 2 seconds per item per user.
  - A maximum of 3 successful purchases per user per item.
- For in-experience purchases, users must be in the experience for 60 seconds to successfully complete a purchase.

## Timed options

<Alert severity = 'info'>
At this time, timed options are available for 3D shirts, pants, and sweater categories.
</Alert>

Timed options allows users to purchase your items for a period of time of either 3, 7, or 14 days at a cheaper cost. You can enable or disable timed options for your Marketplace assets [in bulk](#in-bulk) or [per item](#per-item).

<center><figure>
<img src="../assets/publishing/marketplace/Timed-Options-Mobile-Marketplace.png" alt="Example of timed options displaying for end user viewing marketplace item" width="80%" />
<figcaption><center>With timed options enabled, users gain access to multiple purchase options for each available time range.</center></figcaption>
</figure></center>

### In bulk

To toggle timed options for multiple assets:

1. Navigate to your [Creations](https://create.roblox.com/dashboard/creations) page > Avatar items.
2. Filter by avatar asset type, such as **Clothing**.
3. On the top right, select the **Timed option** button.
  <img src="../assets/publishing/marketplace/Timed-Options-Bulk-A.png" alt="Timed options button on top right of Creations page" width="90%" />

4. Follow the prompts to confirm the bulk selection and timed option settings.

  <img src="../assets/publishing/marketplace/Timed-Options-Bulk-B.png" alt="Confirmation prompt for setting timed options for all assets" width="60%" />

### Per item

To toggle timed options for individual assets:

1. In your [Creations](https://create.roblox.com/dashboard/creations) tab, navigate to the individual asset's **Manage Item** page.
2. Toggle the timed option for your asset.
  <img src="../assets/publishing/marketplace/Timed-Options-Per-Item.png" alt="Individual timed option toggle on the specific asset sale setting page" width="90%" />
3. When complete, click the **Save Changes** button.

## Price ranges

Depending on the 3D asset type, you must set the price of the item within the marketplace price range. If you are selling a [Limited](#limiteds) item, you can set your item price as **0**, or any value after the **Limiteds Price Floor**.

[View Current Marketplace Ranges](https://create.roblox.com/dashboard/creations/pricing)

## Classic clothing

You can upload and sell [classic clothing](../art/classic-clothing.md) through the Roblox website. It costs **10 Robux** to upload these assets.

Classic t-shirts do not require a fee when uploading, but they do require a **10 Robux** fee when going on sale for the first time. If the seller takes the item off sale, it does not require an additional fee when they place it on sale again.
