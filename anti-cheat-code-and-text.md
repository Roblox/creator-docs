# Anti-Cheat: Unauthorized Script Detection for Roblox Games

## Introduction

In this document, we'll cover how to implement a system that detects unauthorized scripts in Roblox games. If a player tries to insert scripts that are not in the `ServerScriptService`, the game will automatically ban and disconnect them.

## Key Practices

- **Server-Side Script Validation**: Always ensure that scripts inserted by players are monitored and validated.
- **Game Integrity**: Prevent players from injecting or modifying scripts in unauthorized locations.

## Example Code: Unauthorized Script Detection

The following Lua code checks if a player has implemented any scripts outside of `ServerScriptService` and bans them if detected.

```lua
-- Function to check if a player has unauthorized scripts
local function checkForUnauthorizedScripts(player)
    -- Get the player's scripts folder (if they have one)
    local playerScripts = player:FindFirstChild("PlayerScripts")
    if not playerScripts then return end
    
    -- Loop through each script in PlayerScripts
    for _, script in pairs(playerScripts:GetChildren()) do
        -- Check if the script is located outside of ServerScriptService (i.e. unauthorized)
        if script:IsA("Script") or script:IsA("LocalScript") then
            local scriptParent = script.Parent
            if scriptParent.Name ~= "ServerScriptService" then
                -- If unauthorized script is found, ban the player and disconnect
                game:GetService("BanService"):BanPlayer(player, "Implemented unauthorized scripts.")
                player:Kick("You have been permanently banned for attempting to modify the game with unauthorized scripts.")
                break
            end
        end
    end
end

-- Monitor for new players joining the game
game.Players.PlayerAdded:Connect(function(player)
    -- Call the function to check the player's scripts
    checkForUnauthorizedScripts(player)
end)

-- Optional: Check periodically for any new scripts added while the game is running
game:GetService("RunService").Heartbeat:Connect(function()
    for _, player in pairs(game.Players:GetPlayers()) do
        checkForUnauthorizedScripts(player)
    end
end)
