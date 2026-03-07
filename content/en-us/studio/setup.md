-- Laser Tag Script
local tool = script.Parent
local DAMAGE = 20        -- How much damage per hit
local RANGE = 200        -- How far the laser can go
local COOLDOWN = 0.5     -- Time between shots

local lastShot = 0

tool.Activated:Connect(function()
    local now = tick()
    if now - lastShot < COOLDOWN then return end
    lastShot = now

    local character = tool.Parent
    if not character then return end
    local player = game.Players:GetPlayerFromCharacter(character)
    if not player then return end

    local head = character:FindFirstChild("Head")
    if not head then return end

    -- Raycast to detect what the laser hits
    local rayOrigin = head.Position
    local rayDirection = head.CFrame.LookVector * RANGE

    local raycastParams = RaycastParams.new()
    raycastParams.FilterDescendantsInstances = {character}  -- Ignore yourself
    raycastParams.FilterType = Enum.RaycastFilterType.Blacklist

    local raycastResult = workspace:Raycast(rayOrigin, rayDirection, raycastParams)

    if raycastResult then
        local hitPart = raycastResult.Instance
        local hitCharacter = hitPart:FindFirstAncestorOfClass("Model")
        if hitCharacter then
            local humanoid = hitCharacter:FindFirstChild("Humanoid")
            if humanoid then
                humanoid:TakeDamage(DAMAGE)
                -- Optional: print who got hit
                print(player.Name .. " hit " .. humanoid.Parent.Name)
            end
        end
    end
end)
