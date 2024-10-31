---
title: Friend Invite Reward System
description: Use referral links to track and reward players that have successfully invited other players into your experience, and players that have joined your experience using a referral link invitation from another player.
---

<Alert severity="info">
This feature is still in beta. If you'd like to provide Roblox with feedback about this feature, join the [User Acquisition Referrals](https://www.guilded.gg/i/kbQ4Po42) Guilded group.
</Alert>

The friend referral system encourages existing players to bring new players into your experience, increasing player retention and overall engagement. Players can access and share referral links from [player invite prompts](./invite-prompts.md) or directly from the default in-experience invite menu.

As a developer, you can use these shareable referral links to:

- Track which players have successfully invited other players into your experience.
- Track which players have joined your experience using a referral link invitation from another player.
- Create and distribute rewards to both inviters and invitees.

<img src="../../assets/promotion/referral-system/Invite-Friends.png" width="90%" />

To implement a friend referral system, [set up a referral event](#set-up-a-referral-event) and [create referral rewards](#grant-referral-rewards). The `ReferredByPlayerId` property of `Class.Player:GetJoinData()|GetJoinData()` automatically populates for all types of invitations and gives you access to the user ID of the referring player. You can then access this data in the `Players.PlayerAdded` event to identify the inviter and grant rewards to the inviter and the invitee.

```lua
function onPlayerAdded(player)

	local referredByPlayerId = player:GetJoinData().ReferredByPlayerId

	local referrerEvent: RemoteEvent = ReplicatedStorage:FindFirstChild("ReferralReceivedEvent")
	referrerEvent:FireClient(player, referredByPlayerId)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```

## Set Up a Referral Event

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
    if referredByPlayerId then
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

## Grant Referral Rewards

To encourage participation, grant rewards to both inviters and invitees. For example, you can give inviters a badge or in-experience currency when their friend joins the experience, and give invitees a welcome reward for joining the experience through a referral link.

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
    if referredByPlayerId then
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

## Manage Abuse Prevention

You can implement safeguards to prevent players from exploiting the friend referral system.

- Offer one-time rewards to track invitees and make sure they're only rewarded once.
- Introduce a cooldown period before an inviter can submit another referral.
- Monitor unusual activity and implement corrective measures like banning users or canceling rewards.

```lua
-- Table to track players who have already been referred
local referredPlayers = {}

function onPlayerAdded(player)
    local joinData = player:GetJoinData()
    local referredByPlayerId = joinData.ReferredByPlayerId

    -- Check if the player was invited and has not already used a referral
    if referredByPlayerId and not referredPlayers[player.UserId] then
        -- Mark the player as referred
        referredPlayers[player.UserId] = true

        -- Reward inviter and invitee
        rewardReferrer(referredByPlayerId)
        rewardInvitee(player)
    end
end
```
