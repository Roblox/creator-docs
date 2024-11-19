-- Example: Grant admin abilities like using all elements at once
    if player:IsInGroup(123456) then  -- Replace with your admin group ID
        player:SendMessage("Admin mode activated. You can now use all elements without cooldown.")
        for _, element in ipairs(ELEMENTS) do
            assignAbilities(player, element)
        end
    end
end

-- Connect player added event
Players.PlayerAdded:Connect(function(player)
    initializePlayer(player)
    setupAdminFeatures(player)

    player.ChosenElement.Changed:Connect(function()
        local element = player.ChosenElement.Value
        assignAbilities(player, element)
    end)
end)

-- Final notes:
-- Ensure that abilities have appropriate effects, particle emitters, and animations.
-- Add anti-cheat measures and more admin commands for server moderation.
