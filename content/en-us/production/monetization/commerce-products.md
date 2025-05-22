---
title: Commerce products
description: Commerce products let you enable real-world purchases through your experience.
---

You can catalog and sell real-world products, or **commerce products**, in your Roblox experience. Users can purchase these products in your experience and, if eligible, you can provide digital incentives as a bundled benefit.

To create and manage catalog items and commerce products, you must meet [commerce eligibility](#eligibility). To add commerce products to your experience:

1. [Import a real-world catalog item](#import-catalog-items) from Shopify.
2. [Create a commerce product](#manage-commerce-products) in Creator Hub.
3. [Implement a purchase prompt](#implement-purchases) within your experience.

## Eligibility

The following eligibility requirements apply for **creators** interested in implementing commerce products, **experiences** that host commerce features, and **users** who can purchase commerce products. **Bundled digital items** also require additional eligibility requirements.

These requirements are subject to change.

### Creator

Eligible creators can add commerce products to their experience. To be eligible, creators must meet and maintain the following:

- Be 18+ years of age.
- Have an ID-verified and email-verified account.
- Have 2-step verification enabled.
- Be the registered account holder on Shopify for the linked store.
  - Alternatively, you must have written permission to link the Shopify store from its registered account holder.
- Have submitted **Business Information**. You can access this submission form in the following ways:
  - **Commerce Eligibility page** — When visiting the commerce page for the first time, an eligibility form appears.
  - **Creator Dashboard** — In [Account Information](https://create.roblox.com/dashboard/account-information), you must completely fill out the **Core Account** and **Legal** tabs.
  - To submit business information on behalf of a group, creator must have **Configure and spend group revenue** enabled.
- If accessing commerce settings on behalf of a group, your role must have **Create and edit community experiences** enabled.
- Be in good standing with respect to Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) on an on-going basis.

### Experience

Creators must ensure that experiences that host commerce features meet the following requirements:

- Experience must be public.
- Experience has received [content maturity labels](../promotion/content-maturity.md) after completing the Experience Guidelines questionnaire.
- Experience complies with Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards), [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards#advertising), and [Commerce Standards](https://en.help.roblox.com/hc/articles/36495190721172) on an on-going basis.

### User

At this time, only US-based users can purchase commerce products. Participating users must also meet the following requirements:

- Must be 13+ years of age, except Texas.
- Must be 18+ years of age in Texas.

You can verify user eligibility by using `Class.PolicyService` to return policy information about each user.

### Digital benefits

Certain creators may qualify to be able to bundle a digital benefit, such as an avatar item or developer item, with their commerce product if they meet **at least one** of the following two requirements:

- The experience that hosts the shop meets the following:
  - Maintains more than 100,000 daily active users on average for the last 90 days.
  - Maintains more than 1,000,000 Robux average monthly earnings in the last 90 days.
  - Sell at least one bundle within three months of receiving approval to bundle.
- Or enter into a written agreement with Roblox for an ad spend amount of at least $50,000 USD in one year.

#### Bundled digital benefits

If you qualify to bundle a digital benefit with your commerce product, each digital benefit must:

- Comply with Roblox's [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards) and [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards#advertising), as an individual item and as the combination of the product and the bundled digital benefit in the context of the bundle.
- Not be an item that was previously available for purchase before listing the bundle or separately made available for purchase with Robux.
- Not be Robux or in-game currency.
- Disclose with sufficient detail in the product listing on Roblox and must not be uncertain to the buyer.
- Not be a random item and must not require a chance-based mechanic to receive the underlying item.
- Not require any additional steps to acquire after the payment for the bundle is complete.

## Import catalog items

In the [Creator Dashboard](https://create.roblox.com/), you can connect your Roblox account to your Shopify store and link catalog items to your experience. You must add individual products you intend to import into Roblox.

### Import catalog items from Shopify

<Alert severity = 'warning'>
At this time, due to the link between the Shopify store and a Roblox account, Roblox group ownership transfer is not allowed for a group that owns any commerce items.
</Alert>

1. Navigate to your experience in the [Creator Dashboard](https://create.roblox.com/) and select **Monetization Products** > **Commerce**.
2. Click **Go to Imported Catalog** > **Start Importing**.
3. Click **Connect**.
4. Install the Roblox sales channel onto your store.
5. Connect your Roblox account. Click **Next**.
   1. After connecting your Roblox account, you can optionally connect a Roblox group to grant all group members access to your imported catalog items. This can be updated at any time under **Account** in the Roblox sales channel.
6. Click **Add Products** and select the items you will import to Roblox.
7. Click **Finish** and wait for the items to sync to Roblox. You can view your imported catalog items in the Imported Catalog tab of the Commerce page.

### Remove catalog items

In the Commerce page, you can remove any catalog item you have imported in the Catalog tab by clicking the **Delete** or **Remove** button next to the item.

When you delete an item, all commerce products that contain the item will automatically be deleted. To sell the commerce product again, you must re-import the item and recreate the product.

### Modify catalog items

When you change the price of a catalog item on Shopify, all associated commerce product bundles will be taken off sale and resubmitted for bundling fee processing.

When you update the content of your Shopify item, such as the name, description, or display image, all associated products will not be taken off sale, but they will be resubmitted for moderation. The product listing on Roblox for each product will continue to show the previously approved content until the new content is approved by moderation.

## Manage commerce products

After importing a catalog item to your experience's Commerce page, you can begin creating commerce products.

### Create

Once you have imported catalog items, you can create commerce products. A commerce product can be either a catalog item on its own, or a catalog item bundled with a digital benefit.

You can create a maximum of 500 products per experience.

<Alert severity = 'warning'>
You cannot create an avatar item type digital benefit while creating the commerce product. Create the avatar item first before adding it to a commerce product bundle.
</Alert>

To create a commerce product:

1.  Navigate to your experience in the Creator Dashboard and select **Monetization Products** > **Commerce**.
2.  Click **Start Creating** or **Create Products**.
3.  Select which imported catalog items you want to include in your commerce products and click **Next**.
    1. If you do not see a **Next** button, your experience is not eligible to create bundles with digital benefits. Skip to step 4.
    2. At this point, your commerce products are saved as drafts. If you leave this page and want to return to them, you can find draft commerce products under **Drafts** in the **Creations** tab.

  <BaseAccordion>
  <AccordionSummary>(Optional) Bundling digital benefits </AccordionSummary>
  <AccordionDetails>
  If you are [eligible to bundle a commerce product with digital benefits](#digital-benefits), you can bundle a digital benefit to your commerce product. Bundled products require a bundling fee after moderation. To bundle a digital benefit:

    1. Click **Add Benefit**.
    2. Choose a **Virtual Benefit Type**:
    3. **Avatar Item**: To be part of a bundle, the avatar item must not have been on sale before. You must own the item or belong to the group that owns the item.
    4. Select an avatar item by choosing an **Avatar Item Type** and using the dropdowns. Click **Save**.
    5. **Developer Product**: To be part of a bundle, the developer product must be owned by the experience, cannot have been on sale before, and must not have a price.
    6. Select an existing **Developer Product** or create a new one to use in a bundle by clicking **Create New**, filling out the developer product information, and clicking **Create**. Click **Save**.
        1. Developer product names within the same experience must be unique.
    <img src="../../assets/monetization/commerce-products/Commerce-Product-Virtual-Benefits.png" width="60%" />
    7. Enter the **Inventory Type** of the catalog item.
        1. **Fixed Quantity**: There is a fixed quantity of the commerce item. Enter the quantity under **Qty**
        2. **Merch on Demand**: The commerce item is created on demand.
        3. **Pre Order**: The commerce item is for pre order.

  </AccordionDetails>
  </BaseAccordion>
4. Double-check the details of your products and click **Preview** to preview the product listing for each product. Click **Submit for review**.
5. The status of your newly created commerce products is **Pending** as the product awaits moderation and potential bundling fee processing. You can hover over the information icon to see which tasks are pending.
   1. **Moderation**
       1. If your commerce product is found to violate Roblox community standards, you will see the **Status** of the commerce product change to **Moderated**.
       2. Hover over the information icon and click **View Violation** to view the violation and submit an appeal, or create a new commerce product that abides by the Roblox community standards. You must be the user whose account is connected to the Shopify store, or the group owner for group-owned stores to view the violation.
   2. **Bundling Fee** (if applicable)
       1. Once a bundling fee is available for a bundled commerce product, navigate to the commerce product to view it under **Bundling Fee**.
       2. To accept, select the product and click **Accept Bundling Fee**, or click the three dots by the bundling fee and click **Accept**.
6. Once these tasks are approved for your commerce product, the commerce product **Status** becomes **Approved** and it is ready to be integrated into your experience using `Class.CommerceService`.

### Get IDs

You will need the product ID of a commerce product to sell it in your experience.

To get the Product ID:

1. Hover over the **Product ID**.
2. Click **Copy ID** to copy it to your clipboard.

   <img src="../../assets/monetization/commerce-products/Commerce-Product-ID.png" width="60%" />

### Put on sale

Commerce products must be available for sale to be purchased in-experience.

Two identical catalog items cannot be on sale at once. You must take a bundle containing a catalog item off sale to put another one with that same item on sale. A maximum of 100 products can be for sale at a time per experience.

To change a product's sale state:

1. In the commerce page, navigate to the product you intend to sell.
2. Click **Put on Sale** or **Take Off Sale** for the product.

   <img src="../../assets/monetization/commerce-products/Commerce-Product-Put-On-Sale.png" width="30%" />

### Delete

To delete a commerce product:

1. Hover over the product.
2. Click **Delete** to delete the product.

## Implement purchases

In your experience, implement commerce product purchases using the following `Class.CommerceService` functions:

- `Class.CommerceService:PromptCommerceProductPurchase()`: Prompts a specific user to purchase a commerce product using the provided commerceProductId. It will open a webview that guides the user through the purchasing flow.
- `Class.CommerceService:PromptCommerceProductPurchaseFinished()`: Use this signal to detect when a user has completed the purchasing flow and the webview has closed to resume gameplay within the experience.
  - This signal does not indicate a successful purchase and only signifies when the prompt is closed.
  - While optional, it is recommended to use this signal to reorient your users on Android, as the commerce purchasing flow will have forced them into portrait mode.

### Grant digital benefits

<Alert severity = 'info'>
[Eligible creators](#eligibility) can add a digital benefit to their commerce products.
</Alert>

When [creating a commerce product](#create), you have the option to bundle the catalog item with a digital benefit.

#### Avatar items

If an avatar item is bundled with a commerce item, Roblox automatically grants the linked avatar item after a user successfully purchases a commerce product.

If Roblox detects a cancellation or refund of the physical item, Roblox automatically revokes the avatar item from the account.

If the avatar item is moderated, the status of any commerce product linked to the item will become moderated and it will be taken off sale. After 7 days, Roblox will automatically revoke the avatar item from all accounts that purchased these products. Upon a successful appeal, the avatar item will be regranted.

#### Developer products

After a user successfully purchases a commerce product, Roblox generates a developer product receipt and sends it to the server where the user is present. Follow the existing `Class.MarketplaceService.ProcessReceipt` flow for handling developer product granting.

In the event of a refund or cancellation of the physical item, you may want to revoke associated in-game items or benefits. Roblox does not automatically revoke developer products that were granted to users as a digital benefit.

Roblox provides webhook integration for commerce events. When an order is paid, canceled, or refunded, Roblox will send a webhook message with the latest order status and order details. Developers can use this information to revoke in-game items or benefits as needed.

For more information on webhook notifications, see the [documentation](../../cloud/webhooks/webhook-notifications.md).

Use `CommerceProductOrderPaid` and `CommerceProductOrderRefunded` events to track the status of the product order. The EventPayload will contain the relevant `CommerceProductOrder` which has the following schema:

```lua title="EventPayload schema"
{
  "type": "object",
  "properties": {
    "path": {
      "type": "string",
      "description": "The resource path of the commerce product order.\n\n Format:\n `universes/{universe_id}/commerce-products/{commerce_product_id}/orders/{commerce_product_order_id}`",
      "x-example-values": {
        "exampleValues": [
          "universes/123/commerce-products/123/orders/123e4567-e89b-12d3-a456-426655440000"
        ]
      }
    },
    "createTime": {
      "readOnly": true,
      "type": "string",
      "description": "The timestamp when the commerce order was created.",
      "format": "date-time",
      "x-example-values": {
        "exampleValues": [
          "2023-07-05T12:34:56Z"
        ]
      }
    },
    "updateTime": {
      "readOnly": true,
      "type": "string",
      "description": "The timestamp when the commerce order was last updated.",
      "format": "date-time",
      "x-example-values": {
        "exampleValues": [
          "2023-07-05T12:34:56Z"
        ]
      }
    },
    "state": {
      "readOnly": true,
      "enum": [
        "STATE_UNSPECIFIED",
        "STATE_PAID",
        "STATE_REFUNDED"
      ],
      "type": "string",
      "description": "The current state of this order, i.e. PAID, REFUNDED, CANCELED\n\nPossible values:\n\n  | Value | Description |\n  | --- | --- |\n  | STATE_UNSPECIFIED | Unspecified state. |\n  | STATE_PAID | The order has been paid for. |\n  | STATE_REFUNDED | The order has been refunded. |",
      "format": "enum",
      "x-example-values": {
        "exampleValues": [
          "STATE_UNSPECIFIED"
        ]
      }
    },
    "merchantOrderId": {
      "immutable": true,
      "type": "string",
      "description": "The merchant-specific order ID that can be used to look up the order on the\n merchant platform."
    },
    "merchant": {
      "immutable": true,
      "enum": [
        "MERCHANT_PLATFORM_UNSPECIFIED",
        "SHOPIFY",
      ],
      "type": "string",
      "description": "The merchant that is used to fulfill orders.\n\nPossible values:\n\n  | Value | Description |\n  | --- | --- |\n  | MERCHANT_PLATFORM_UNSPECIFIED | Unspecified merchant type. |\n  | SHOPIFY | The item is sold through Shopify. |",
      "format": "enum",
      "x-example-values": {
        "exampleValues": [
          "MERCHANT_PLATFORM_UNSPECIFIED"
        ]
      }
    },
    "user": {
      "immutable": true,
      "type": "string",
      "description": "The user who placed this order.",
      "x-example-values": {
        "exampleValues": [
          "users/123"
        ]
      }
    }
  },
  "description": "A commerce product order represents a purchase of a CommerceProduct by a\n Roblox user. It includes the user who made the purchase and merchant order\n details.",
}
```
