---
title: Avatar creation token
description: Enable users to create and purchase avatar items in experience.
---

An **avatar creation token** enables developers to allow users to create, purchase, and save avatar items directly from an experience to their platform-level inventory using [in-experience creation](../../avatar/in-experience-creation.md). Experiences that implement in-experience creation APIs, such as `Class.AvatarCreationService.PromptCreateAvatarAsync|PromptCreateAvatarAsync` and `Class.AvatarCreationService.PromptCreateAvatarAssetAsync|PromptCreateAvatarAssetAsync`, must include one or more avatar creation tokens. You can purchase and manage tokens in your experience's [Creator Dashboard](https://create.roblox.com/dashboard/creations).

<Alert severity = 'info'>
Owners of experiences that incorporate in-experience avatar item creation also benefit from [Marketplace commissions](../../marketplace/marketplace-fees-and-commissions.md#commissions) as both **creator** and **experience owner**.
</Alert>

To create avatar creation tokens, you or your group must meet the [Marketplace creator requirements](../../marketplace/marketplace-policy.md#creator-requirements). For the token to remain valid, the token owner must maintain these creator requirements.

## Create a token

To allow users to create, pay for, and save avatar items to their Roblox inventory in your experience, you'll need to set up an Avatar Creation Token in your experience's dashboard.

<Alert severity = 'warning'>
Each token requires a **Creation Advance** and a **Creation Fee**. The advance is fully recoupable and based on the [current publishing advance prices](../../marketplace/marketplace-fees-and-commissions.md#publishing-advance) for that item type. Before purchase, you can preview a summary of your total combined advance and fee when creating your token.
</Alert>

To create a token:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
2. Expand the account switcher in the upper‑left and ensure that the appropriate user or group is selected.
3. In **Creations** ⟩ **Experiences**, select your experience.
4. On the left panel, navigate to **Monetization** ⟩ **Avatar Creation Tokens**.
5. Click **Create Token**.
   1. Ensure that your account or group account meets the [Marketplace Creator Requirements](../../marketplace/marketplace-policy.md#creator-requirements). If the token owner account is not ID-verified with a Premium subscription, the experience can not enable in-experience creation APIs. You must maintain these requirements for the token to remain valid.
6. Complete the following fields:

   1. **Name** - The name of your token. This is not user-facing and can be changed after creation.
   2. **Description** - The description of your token. This is not user-facing and can be changed after creation.
   3. **Item Type** - The **Body** item type can be used in experience with `Class.AvatarCreationService.PromptCreateAvatarAsync|PromptCreateAvatarAsync` whereas the rest of the item types are meant to be used with
   `Class.AvatarCreationService.PromptCreateAvatarAssetAsync|PromptCreateAvatarAssetAsync`. You cannot change this setting after token creation.
   4. **Amount Above Price Floor** - Set the price above the Marketplace Price Floor for created items. If you intend to have different price points for items of the same type in your experience, the best way to achieve this is by purchasing multiple tokens. You can modify this field after creation.
   5. **Do not price below (Optional)** - Set the minimum price for users to purchase your item. You can modify this field after creation.
      <img src="../../assets/monetization/avatar-creation-tokens/Avatar-Creation-Token-Prices.png" width="90%" alt="Price related fields for avatar token creation, including a calculated item price."/>

7. When complete, verify the **Creation Advance** and **Creation Fee** calculations and select **Create Token** to submit your purchase.
8. You can now access the created token in the experience's **avatar creation tokens** settings. To implement `Class.AvatarCreationService.PromptCreateAvatarAsync|PromptCreateAvatarAsync` or `Class.AvatarCreationService.PromptCreateAvatarAssetAsync|PromptCreateAvatarAssetAsync`, you'll need the token ID, which you can access by selecting the three dots on the thumbnail and selecting **Copy Token ID**.
   <img src="../../assets/monetization/avatar-creation-tokens/Avatar-Creation-Token-Copy-ID.png" width="30%" alt="Dropdown for created tokens revealing a Copy Token ID option" />
