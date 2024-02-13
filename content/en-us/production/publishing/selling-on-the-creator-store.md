---
title: Selling on the Creator Store
description: An explanation of Creator Store seller accounts, their prerequisites, and how to create one.
---

In the spring of 2024, you will be able to sell [plugins](./../../studio/plugins.md) on the Creator Store for **United States Dollars** (USD) and receive a significantly higher revenue share, as Roblox will only deduct taxes and payment processing fees.

In order to set any USD prices and sell your assets, you must have a **seller account**. Roblox administers seller accounts through **Stripe**, a third-party payments provider. If you meet Roblox's eligibility [requirements](#for-sellers), you can fill out Stripe's [application form](#completing-the-application-form) to create a seller account.

Once you have a seller account, **you can set USD prices** for your plugins from their asset configuration pages. They will go on sale once the update to the Creator Store launches.

<Alert severity="error">

You must create a seller account, **even if you're already selling plugins for Robux** through a [verified](account-verification.md) account. If you don't create a seller account and set prices before the USD pricing launch, your plugins will be taken off sale.

When USD pricing launches, using `Class.MarketplaceService.PromptPurchase` to sell plugins will be disabled. If you use this API to sell plugins in your experiences, remove it now and direct players to visit the Creator Store site. This change does not affect free products.

</Alert>

## Requirements

Roblox's eligibility requirements for sellers, customers, and assets are stricter than previous requirements for selling and buying plugins with Robux. Even if you're already selling on the Creator Store, you will only be able to continue doing so if you meet these requirements, create a seller account, and set USD prices.

### For Sellers

In order to create a seller account, you must meet the following Roblox eligibility requirements:

- Your Roblox account must be **verified** with a [government ID](account-verification.md#verifying-through-government-id).
- Your Roblox account must have a **clean moderation history**.
- You must be **18** years of age or older.
- You must reside in [one of the countries supported](https://stripe.com/docs/connect/cross-border-payouts) by our third-party payments provider.

If you violate any of these requirements after you create your seller account, your account will be suspended, your assets will be taken off sale, and payouts will be frozen. If you believe your account was incorrectly suspended, you can [appeal](https://www.roblox.com/report-appeals#/) the applicable violation.

<Alert severity="warning">

**Phone number verification is no longer sufficient** to sell paid assets on the Creator Store. Even if your account is verified by phone number, you still need to verify with a [government ID](account-verification.md#verifying-through-government-id).

</Alert>

### For Customers

Only **individual** user accounts may purchase assets for USD on the Creator Store. Groups are ineligible to purchase plugins.

Transactions between any individual customer and seller are **capped** per month for safey purposes. If you're buying a lot of assets from one seller in a single month, any purchase over the limit will be prohibited until the following month. This includes any purchases between alternate accounts for either the customer or seller.

### For Assets

Every asset that you sell on the Creator Store must adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), and [Digital Millennium Copyright Act](dmca-guidelines.md) (DMCA). If any asset breaks these rules, the asset and your account may be subject to moderation.

In addition, you can only sell plugins that you own from an **individual** user account. Group-owned assets are ineligible. If you want to sell a group-owned asset, consider [republishing them](publishing-assets.md) under individual ownership.

<Alert severity="error">

Any plugins on sale for Robux with **no USD pricing** will be **removed from sale** once USD pricing launches for customers. If you haven't set a USD price for a monetized plugin and it's removed from the Creator Store, you must create a seller account to put it back on sale with a price.

To ensure your plugins aren't off sale for any period, it's best to create your seller account and set USD prices now.

</Alert>

## Seller Account

All prospective plugin sellers on the Creator Store must complete an application form through Stripe to create their seller account, set USD prices, and receive payouts. This process applies **even if you are already selling plugins for Robux**.

### Completing the Application Form

If your Roblox account meets all eligibility criteria on the [Seller Onboarding](https://create.roblox.com/settings/eligibility/priced-assets) page, Roblox provides a link to an application form through Stripe so that you can apply for a seller account. This application form collects your personal information in order to process your case.

To avoid any delays in the application process, ensure you have the following details ready before you start filling out the form:

- **Banking information**, such as account number and sort code.
- **Name** and **home address**.
- Contact information, including your **phone number** and **email** address.
- **Tax identification numbers** (TIN), if applicable. This may differ depending on your country of residence.
- A **[W8](https://support.stripe.com/express/questions/what-is-a-w-8-form) / [W9](https://support.stripe.com/express/questions/what-is-a-w-9-form)** form.

The form also asks for a 'statement descriptor' and a 'website', but you do not need to fill these in. If you do provide a custom statement descriptor, Roblox automatically overrides this.

After you fill out the application form, you'll receive an email acknowledging your submission, and Roblox will send you a notification when there are updates on your application. It can take **up to 7 days** to review your information and create your seller account.

<Alert severity="warning">

Once Stripe accepts your application, you cannot change the country associated with your seller account. Ensure your information is correct when you fill out the form.

</Alert>

### Checking Approval Status

To check the status of your application, revisit the [Seller Onboarding](https://create.roblox.com/settings/eligibility/seller-onboarding) page, then click **Edit Account Info**. Your approval status can be in any of the following states:

- **Pending** — Your information is being reviewed.
- **Failed** — Your seller account has not been created, either because of an error or because your information was incorrect.
- **Information Needed** — Stripe requires more information from you before they can confirm your seller account.
- **Success** — Your seller account has been successfully created. You can set prices and sell assets.
- **Rejected** - You cannot create a seller account due to fraudulent or malicious activity.

<Alert severity="warning">

If you edit any information after you have been approved, you **return to the Pending state** until Stripe reviews and confirms your changes. This temporarily freezes payouts. If you need to update your banking information or address, it's best to wait until just after your next payout.

</Alert>

## Earnings

Once Stripe confirms your information and creates your seller account, you can start setting USD prices for your assets. If your assets are public at that time, they will go on sale on the Creator Store once the new purchasing features launch in the spring of 2024.

### Pricing

You can set prices on the [Creator Dashboard](https://create.roblox.com/dashboard/creations?activeTab=Model). Plugins have a minimum price of $4.99 and maximum price of $249.99. If a plugin may not offer value at the minimum price, you can always offer them for free.

You cannot set USD prices in Studio. For more information on how to set prices, see [Publishing Assets](./publishing-assets.md).

### Payouts

When a user buys an asset, the money from the sale enters a **30 day escrow period**. At the end of that period, the money adds to the next payout cycle.

Your earnings automatically pay out once a month to the bank associated with your seller account. This occurs on the **first of every month**, and there is no minimum payout. You cannot access your earnings outside of the payout schedule.

<Alert severity="warning">

If your seller eligibility is suspended, either due to a change of seller information or moderation consequences, payouts are frozen until you can restore your eligibility. To see the status of your account, see the [Seller Onboarding](https://create.roblox.com/settings/eligibility/seller-onboarding) page.

</Alert>

### Reimbursements

Reimbursements for customers **deduct from the seller's account**. This occurs if:

- A customer requests a refund or chargeback for an asset.
- An asset is moderated after customers have already purchased it.

When a refund occurs, Roblox removes the asset from the customer's inventory. If a very high proportion of sales for an asset come from accounts with an exceptional history of chargebacks, the asset is taken off sale and your payouts are frozen. If you have grounds to appeal this action, you can file a request with [Roblox support](https://en.help.roblox.com/hc/en-us/articles/360000272703).
