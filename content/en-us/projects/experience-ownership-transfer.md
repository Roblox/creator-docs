---
title: Experience Ownership Transfer
description: Transfer ownership of an experience to other Roblox users or groups.
---

With **experience ownership transfer**, you can transfer your experiences to groups you have publish access to. This unlocks all of the features available to groups, including permissions and revenue management, and allows you to efficiently manage your content as your team scales and your priorities shift.

## Prerequisites

Before making a transfer or accepting a transfer, you must first:

- Verify your email address.
- Upload your private `ModuleScripts` to the group you're transferring the experience to. If the experience uses packages where the package owner is a user and not a group, you might have to recreate those packages or replace them with packages that are already owned by a group.
- Publish your animation assets to the group you're transferring the experience to.

  - If you have a large number of animations to upload, you can use a community-supported third-party tool like Roblox Animation Transfer. See [Transferring Roblox Animations](./transferring-animations.md) for more details.
  - If you have a small number of animations to upload, you can manually re-upload them and then update your animation asset references to support old and new IDs based on the `CreatorID` and `CreatorType`. See the following code for an example:

  ```lua
  -- Maps animation IDs that belong to the original creator to animation IDs
  -- that belong to the new creator.
  local transferAnimationMap = {
    ["6406676108"] = 14292200298,
    ["6438293322"] = 14292082312,
    ["6464978998"] = 14292224322,
    ["6465240715"] = 14292226967,
    ["6465244287"] = 14292229476,
    ["6382318344"] = 14292213468,
    ["6382564692"] = 14292207171,
    ["6460651769"] = 14292098870,
    ["6415507655"] = 14292218236,
    ["6415509331"] = 14292221034
  }

  function mapTransferAnimationId(id)

  -- If experience has been transferred, maps old => new animation IDs
    if game:GetService("RunService"):IsStudio() or
    (game.CreatorType == Enum.CreatorType.Group and
      game.CreatorId == 32626384) then
        local animationId = string.match(id, "%d+$")
        local mappedId = transferAnimationMap[animationId]

        if mappedId then
            return "rbxassetid://" .. mappedId
        end
    end

    return id
  end

  -- Creates an animation instance associated with the
  -- specified rbxassetid://<animation_id> url
  function createAnimation(id)
    local animation = Instance.new("Animation")
    animation.AnimationId = mapTransferAnimationId(id)

    return animation
  end
  ```

<Alert severity="info">
As a best practice, if you're using Open Cloud API keys for the experience, create an API key as the new owner with the name `RobloxTransferApiKey`. During the transfer, the relevant scopes are added to this new key and removed from the original key. You can then use a feature flag to allow your backend services to start using the new key after the transfer is complete.
</Alert>

## Transferring an Experience

To transfer an experience to a group:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and choose the experience you want to transfer.
2. Go to **Configure** > **Settings**.
3. Click **Initiate ownership transfer**.
4. In the **Transfer Details** dialog, carefully read and acknowledge the implications of the transfer. Then, click **Next**.

   <img src="./assets/projects/Transferring-Experience.png" width="450" />

5. Select a group to transfer the experience to. You must be able to publish experiences to this group.
6. Verify the transfer by entering the experience name.
7. Click **Initiate transfer**. The **Content Settings** page updates to include the pending group's username.

<Alert severity="warning">
Once the group accepts the transfer, Roblox makes your experience private and closes all servers associated with the experience.
</Alert>

<Alert severity="info">
To cancel a pending transfer, click **Cancel transfer request** in the **Content Settings** page.
</Alert>

## Receiving a Transferred Experience

To receive a transferred experience:

1. Go to the experience page of the experience you're receiving. You can navigate to this page by clicking the transfer request notification you received when the experience's current owner initiated the transfer, or by directly getting the overview page link from the current owner.
2. In the **Transfer Details** dialog, carefully read and acknowledge the implications of the transfer. Then, click **Next**.

   <img src="./assets/projects/Receiving-Experience-Transfer.png" width="450" />

3. Verify the transfer by entering the experience name.
4. Click **Accept transfer**. Roblox makes the experience private and the transfer process completes in a few minutes.
5. After the transfer to your group is complete, set up any new permissions you need and make the experience public again.

<Alert severity="info">
If you don't want to receive the transfer, click **Decline transfer** in the **Transfer Details** dialog.
</Alert>

## Frequently Asked Questions

**What kind of information does the transferred experience retain?**

The transferred experience retains its old experience ID, place ID, and URL.
<br/>
**Do transfer requests expire?**

Yes, transfer requests expire after 7 days.
<br/>
**How often can I transfer the same experience?**

After receiving a transferred experience, you must wait 30 days to transfer that experience again.
<br/>
**Can I make changes to an experience I'm transferring?**

You can continue making changes to the experience until the new group owner accepts the transfer and the transfer process begins. Changes you make during the active transfer process specifically aren't carried over.
<br/>
**What happens to my credit card information when I transfer my experience?**

Roblox removes your credit card information when you transfer an experience.

<br/>
**What happens to my revenue from private server subscriptions when I transfer my experience?**

You continue to receive the revenue from existing private server subscriptions, but the new group owner receives the revenue from any new or renewed subscriptions.
<br/>
**Does transferring an experience impact discovery?**

Transferring an experience doesn't impact search as long as the experience title remains the same, the new group owner is not a moderated account, and the experience is made public again after the transfer.

Note that transferring an experience can impact discovery for up to 24 hours after the new group owner makes the experience public again.
