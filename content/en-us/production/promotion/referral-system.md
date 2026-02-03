---
title: Connection referral system
description: Use referral links to track and reward players that have successfully invited other players into your experience, and players that have joined your experience using a referral link invitation from another player.
---

<Alert severity="info">
If you previously used this feature while it was still in beta, make sure to implement the new [customized reward banners](#create-a-reward-banner) to maximize the reach of your connection referral system.
</Alert>

<table>
<tbody>
  <tr>
    <td><iframe width="500" height="300" src="https://www.youtube-nocookie.com/embed/qfWKYgO63OI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></td>
    <td><iframe width="500" height="300" src="https://www.youtube-nocookie.com/embed/rVFmc8gxu4s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></td>
  </tr>
</tbody>
</table>

The connection referral system encourages existing players to bring new players into your experience, increasing player retention and overall engagement. Players can access and share referral links from [player invite prompts](./invite-prompts.md) or directly from the default in-experience invite menu.

As a developer, you can create customized banners to advertise your reward system and use shareable referral links to:

- Track which players have successfully invited other players into your experience.
- Track which players have joined your experience using a referral link invitation from another player.
- Create and distribute rewards to both inviters and invitees.

<figure>
    <figcaption>Inviters send out invites</figcaption>
    <video controls src="../../assets/promotion/referral-system/Invite-Flow-Referral-System.mp4" type="video/mp4" />
</figure>

<figure>
    <figcaption>Invitees join the experience</figcaption>
    <video controls src="../../assets/promotion/referral-system/Invitee-Flow-Referral-System.mp4" />
</figure>

To implement a referral system, [set up a referral event](#set-up-a-referral-event) and [create referral rewards](#grant-referral-rewards) in Studio. The `ReferredByPlayerId` property of `Class.Player:GetJoinData()|GetJoinData()` automatically populates for all types of invitations and gives you access to the user ID of the referring player. You can then access this data in the `Players.PlayerAdded` event to identify the inviter and grant rewards to both the inviter and the invitee.

```lua
function onPlayerAdded(player)

    local referredByPlayerId = player:GetJoinData().ReferredByPlayerId

    local referrerEvent: RemoteEvent = ReplicatedStorage:FindFirstChild("ReferralReceivedEvent")
    referrerEvent:FireClient(player, referredByPlayerId)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

To make sure that players understand the reward system, [implement a customized reward banner](#create-a-reward-banner) at the top of your connection invite modal showing them details about the rewards they can earn.

## Set up a referral event

To set up a referral event:

1. Set up a `RemoteEvent` in `ReplicatedStorage` to create a remote event to communicate with the client when a referral is received.
2. Retrieve the inviter's user ID using `ReferredByPlayerId` to track player joins and handle the referral logic in your server-side script during the `Players.PlayerAdded` event.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Create or get the RemoteEvent for handling referrals
local referrerEvent: RemoteEvent = ReplicatedStorage:FindFirstChild("ReferralReceivedEvent")

-- Function that triggers when a player joins
function onPlayerAdded(player)
    local joinData = player:GetJoinData()
    local referredByPlayerId = joinData.ReferredByPlayerId

    -- Check if the player was invited through a referral
    if referredByPlayerId and referredByPlayerId ~= 0 then
        -- Fire the referral event to the client, passing the inviter's ID
        referrerEvent:FireClient(player, referredByPlayerId)

        -- Additional logic for rewarding inviter and invitee can be added here
        -- e.g., rewardReferrer(referredByPlayerId)
        -- e.g., rewardInvitee(player)
    end
end

-- Connect the function to the PlayerAdded event
Players.PlayerAdded:Connect(onPlayerAdded)
```

## Grant referral rewards

To encourage participation, grant rewards to both inviters and invitees. For example, you can give inviters a badge or in-experience currency when their connection joins the experience, and give invitees a welcome reward for joining the experience through a referral link.

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Create or get the RemoteEvent for handling referrals
local referrerEvent: RemoteEvent = ReplicatedStorage:FindFirstChild("ReferralReceivedEvent")

-- Function that triggers when a player joins
function onPlayerAdded(player)
    local joinData = player:GetJoinData()
    local referredByPlayerId = joinData.ReferredByPlayerId

    -- Check if the player was invited through a referral
    if referredByPlayerId and referredByPlayerId ~= 0 then
        -- Fire the referral event to the client, passing the inviter's ID
        referrerEvent:FireClient(player, referredByPlayerId)

        -- Reward the inviter
        function rewardReferrer(referrerId)
          local referrerPlayer = Players:GetPlayerByUserId(referrerId)
          if referrerPlayer then
              -- Grant the inviter their reward
              -- Example: referrerPlayer.leaderstats.Coins.Value += 100
          end
        end

        -- Reward the invitee
        function rewardInvitee(player)
            -- Grant the invitee their reward
            -- Example: player.leaderstats.WelcomeBonus.Value += 50
        end
    end
end

-- Connect the function to the PlayerAdded event
Players.PlayerAdded:Connect(onPlayerAdded)
```

## Create a reward banner

Reward banners encourage users to invite connections to join your experience by showing them details about the referral rewards they can earn. These banners are displayed at the top of your connection invite modal.

To create a customized reward banner:

1. In the Creator Hub, go to **Creations** and select the experience that you have set up a referral event for.
2. Go to **Engagement** ⟩ **Referral Rewards**.
3. Click **Add Reward Details**.
4. In the **Referral Rewards** page:
    1. Replace the default icon with an image that represents your experience.
    2. Enter a reward name to display on the banner.
    3. Select a start and end date for when you want to show the banner to players.
    4. (Optional) Enter a description with details about the reward.
    5. (Optional) If you want to add reward restrictions, enter a reward limit. For example, a limit of up to 3 rewards per inviter.
5. Click **Save** to save your changes.
6. Click **Publish** to make the banner visible to players.

You can create many different banners, but only one banner can be published and shown at a time. Make sure that the published banner accurately describes the referral system you have implemented in Studio.

<br /><br />

<video controls src="../../assets/promotion/referral-system/Reward-Details.mp4" />

## Prevent referral system abuse

You can implement safeguards to prevent players from exploiting the connection referral system.

- Offer one-time rewards to track invitees and make sure they're only rewarded once.
- Introduce a cooldown period before an inviter can submit another referral.
- Monitor unusual activity and implement corrective measures like banning users or canceling rewards.

```lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

-- Create or get the datastore for referrals
local referralDataStore = DataStoreService:GetDataStore("ReferralDataStore")

-- Function to check and mark referral
local function onPlayerAdded(player)
    local joinData = player:GetJoinData()
    local referredByPlayerId = joinData.ReferredByPlayerId

    -- Load player's referral data
    local success, alreadyReferred = pcall(function()
        return referralDataStore:GetAsync(tostring(player.UserId))
    end)

    if not success then
        warn("Failed to get referral data for player:", player.UserId)
        return
    end

    if referredByPlayerId and referredByPlayerId ~= 0 and not alreadyReferred then
        -- Reward inviter and invitee
        rewardReferrer(referredByPlayerId)
        rewardInvitee(player)

        -- Mark the player as referred in DataStore
        local saveSuccess, err = pcall(function()
            referralDataStore:SetAsync(tostring(player.UserId), true)
        end)

        if not saveSuccess then
            warn("Failed to save referral status for player:", player.UserId, err)
        end
    end
end

-- Connect the function to the player joining
Players.PlayerAdded:Connect(onPlayerAdded)
```

## Frequently asked questions

**Which experiences are eligible to use this feature?**

This feature is open to any experience that has been live for at least one day and that doesn't violate the [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards).

**Which players can take advantage of referrals?**

All players are eligible to earn rewards through referrals.

**Is the invite restricted to a player's connections on Roblox?**

No, players can send an invite to connections they aren't connected with on the Roblox platform yet.

**Does the referral link expire?**

The link never expires.

**How can I get the most out of this feature?**

You can add an in-experience button to advertise the referral system to encourage players to take advantage of referrals. You can then give the button a descriptive title and connect the button click event to the connection invite modal where players can see the reward banner.
