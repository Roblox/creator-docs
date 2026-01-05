---
title: Sell on the Creator Store
description: An explanation of Creator Store seller accounts, their prerequisites, and how to create one.
---

You can sell [plugins](../studio/plugins.md) and [models](../parts/models.md) on the Creator Store for **United States Dollars** (USD). Roblox offers a market-leading revenue share for these sales, as only taxes and payment processing fees are deducted.

In order to set any USD prices and sell your assets, you must have a **seller account**. Roblox administers seller accounts through **Stripe**, a third-party payments provider. If you meet Roblox's eligibility [requirements](#for-sellers), you can fill out Stripe's [application form](#complete-the-application-form) to create a seller account.

Once you have a seller account, **you can set USD prices** for your plugins from their asset configuration pages and sell them on the Creator Store.

## Requirements

Roblox's eligibility requirements for sellers, customers, and assets are stricter than previous requirements for selling and buying with Robux. Even if you're have previously sold on the Creator Store, you will only be able to continue doing so if you meet these requirements, create a seller account, and set USD prices.

### For sellers

In order to create a seller account, you must meet the following Roblox eligibility requirements:

- Your Roblox account must be **verified** with a [government ID](./publishing/account-verification.md#verify-through-government-id).
- Your Roblox account must not have been recently **banned** for any reason.
- You must be either **18** years of age or older, or **13-17** years of age with **parental consent**. A parent/guardian (18+) must review and agree to the Creator Store terms, and parent/guardian information must be entered on the Stripe form.
- You must reside in [one of the countries supported](https://stripe.com/docs/connect/cross-border-payouts) by our third-party payments provider.

Due to restrictions, selling on the Creator Store is only available within certain regions. Seller onboarding is not yet supported in countries such as Brazil, China, India, or Russia.

If you violate any of these requirements after you create your seller account, your account will be suspended, your assets will be taken off sale, and payouts will be frozen. If you believe your account was incorrectly suspended, you can [appeal](https://www.roblox.com/report-appeals#/) the applicable violation.

<Alert severity="warning">

**Phone number verification is not sufficient** to sell priced assets on the Creator Store. To sell priced assets, you need to verify with a [government ID](./publishing/account-verification.md#verify-through-government-id) and create a seller account.

</Alert>

### For customers

Only **individual** user accounts may purchase assets for USD on the Creator Store. Groups are ineligible to purchase plugins.

Transactions between any individual customer and seller are **capped** per month for safety purposes. If you're buying a lot of assets from one seller in a single month, any purchase over the limit will be prohibited until the following month. This includes any purchases between alternate accounts for either the customer or seller.

### For assets

Every asset that you sell on the Creator Store must adhere to the [Community Rules](https://en.help.roblox.com/hc/articles/203313410), [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), and [Digital Millennium Copyright Act](./publishing/dmca-guidelines.md) (DMCA) regarding copyright. If any asset breaks these rules, the asset and your account may be subject to moderation. If you suspect a rights violation involving your asset, you can submit the content for removal using the [Rights Manager](../production/publishing/rights-manager.md).

Note that you can only sell assets that you own from an **individual** user account. Group-owned assets are ineligible. If you want to sell a group-owned asset, consider re‑uploading them under individual ownership.

In addition, the Creator Store restricts use of the following practices to ensure asset safety:

- Obscuring engine features within scripts, including LuaVMs, `getfenv()`, and `setfenv()`.
- Requiring remote assets, including `require(assetId)`, `loadstring()`, `Class.InsertService:LoadAsset()`, and `Class.ModuleScript.LinkedSource`. Assets that may look useful on the surface could load another "virus" asset at runtime.
- Including obfuscated code. For publicly-shared assets, it's important for creators to understand what they are putting into their experiences. If code is obfuscated, creators cannot trust that the script is only doing what it should be doing.

<Alert severity="success">
Opt-in to the [asset privacy beta](../projects/assets/privacy.md#beta-opt-in) before uploading any models you intend to sell. This will ensure that newly-uploaded model dependencies (like its images and meshes) are set as restricted. If you have previously saved models, it's recommended opting into the beta and then creating a new model so that all dependencies can be registered correctly.
</Alert>

## Seller account

All prospective sellers on the Creator Store must complete an application form through Stripe to create their seller account, set USD prices, and receive payouts. This process applies even if you have previously sold plugins for Robux on the Store.

### Complete the application form

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

### Check approval status

To check the status of your application, revisit the [Seller Onboarding](https://create.roblox.com/settings/eligibility/priced-assets) page, then click **Edit Account Info**. Your approval status can be in any of the following states:

- **Pending** — Your information is being reviewed.
- **Failed** — Your seller account has not been created, either because of an error or because your information was incorrect.
- **Information Needed** — Stripe requires more information from you before they can confirm your seller account.
- **Success** — Your seller account has been successfully created. You can set prices and sell assets.
- **Rejected** — You cannot create a seller account due to fraudulent or malicious activity.

<Alert severity="warning">

If you edit any information after you have been approved, you **return to the Pending state** until Stripe reviews and confirms your changes. This temporarily freezes payouts. If you need to update your banking information or address, it's best to wait until just after your next payout.

</Alert>

## Earnings

Once Stripe confirms your information and creates your seller account, you can start setting USD prices for your assets. If your assets are public at that time, they will go on sale on the Creator Store.

### Pricing

You can set prices on the [Creator Dashboard](https://create.roblox.com/dashboard/creations?activeTab=Plugin). Plugins have a minimum price of \$4.99 and maximum price of \$249.99. Models will have a minimum price of \$2.99 and maximum price of \$249.99. If an asset may not offer value at the minimum price, you can always offer it for free.

You cannot set USD prices in Studio.

### Payouts

When a user buys an asset, the money from the sale enters a **30 day escrow period**. At the end of that period, the money adds to the next payout cycle. If your seller account is denominated in a non-USD currency, conversion happens as each sale's proceeds are transferred into your balance. See [Stripe currency conversions](https://docs.stripe.com/currencies/conversions) for more information.

Your earnings automatically pay out once a month to the bank associated with your seller account. This occurs on the **first of every month**. You cannot access your earnings outside of the payout schedule.

For some countries and currencies, there is a non-zero minimum payout amount. These minimums are documented in the [Stripe minimum payouts table](https://docs.stripe.com/payouts#minimum-payout-amounts-table) and [Stripe cross-border minimum payout amounts table](https://docs.stripe.com/payouts#cbp-minimum-payout-amounts)—the effective minimum is the greater number. ISK, HUF, TWD and UGX currencies have [special conditions](https://docs.stripe.com/currencies#special-cases).

<Alert severity="warning">

If your seller eligibility is suspended, either due to a change of seller information or moderation consequences, payouts are frozen until you can restore your eligibility. To see the status of your account, see the [Seller Onboarding](https://create.roblox.com/settings/eligibility/priced-assets) page.

</Alert>

### Reimbursements

Reimbursements for customers **deduct from the seller's account**. This may occur if:

- A customer requests a refund or chargeback for an asset.
- An asset is moderated after customers have already purchased it, and the moderation decision is not successfully appealed within 5 days. Uploading a new version of the moderated asset will not prevent reimbursements.

When a refund occurs, Roblox removes the asset from the customer's inventory. If a very high proportion of sales for an asset come from accounts with an exceptional history of chargebacks, the asset is taken off sale and your payouts are frozen. If you have grounds to appeal this action, you can file a request with [Roblox support](https://en.help.roblox.com/hc/en-us/articles/360000245263-Appeal-Your-Content-or-Account-Moderation).

## Transactions and upcoming payouts

You can find a record of all your Creator Store transactions on the [Transactions](https://create.roblox.com/dashboard/transactions) page of the Creator Dashboard. This includes both your **Incoming Payments** (sales) and your **Outgoing Payments** (purchases) on the Store.

Above your transaction record are details of any upcoming revenue, along with a past [payout](#payouts) total. **Available Balance** is the money you will be paid in the next payout. **Pending Revenue** is the revenue currently held in 30-day escrow, which will eventually enter your Available Balance once the escrow period on each transaction has expired.
