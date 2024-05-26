# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
local allowedPlayers = {12345678, 87654321} -- Reemplaza con los UserId de los jugadores permitidos

game.Players.PlayerAdded:Connect(function(player)
    local playerAllowed = false
    for _, userId in pairs(allowedPlayers) do
        if player.UserId == userId then
            playerAllowed = true
            break
        end
    end
    
    if playerAllowed then
        print(player.Name .. " está permitido en el juego.")
        -- Aquí puedes permitirles realizar acciones específicas
    else
        player:Kick("No estás autorizado para entrar en este juego.")
    end
end)
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

local productId = 12345678 -- Reemplaza con el ID de tu producto

local function onPurchaseFinished(player, purchasedProductId, wasPurchased)
    if wasPurchased and purchasedProductId == productId then
        local backpack = player:FindFirstChild("Backpack")
        if backpack then
            local tool = game.ServerStorage:FindFirstChild("SpecialTool"):Clone()
            tool.Parent = backpack
            player:SendNotification({
                Title = "Compra exitosa",
                Text = "¡Has recibido tu ítem especial!",
                Duration = 5
            })
        end
    end
end

MarketplaceService.PromptProductPurchaseFinished:Connect(onPurchaseFinished)
game.Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")

        humanoid:GetPropertyChangedSignal("WalkSpeed"):Connect(function()
            if humanoid.WalkSpeed > 16 then
                player:Kick("No se permiten exploits en este juego.")
            end
        end)

        humanoid:GetPropertyChangedSignal("JumpPower"):Connect(function()
            if humanoid.JumpPower > 50 then
                player:Kick("No se permiten exploits en este juego.")
            end
        end)
    end)
end)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local MarketplaceService = game:GetService("MarketplaceService")

local purchaseEvent = ReplicatedStorage:WaitForChild("PurchaseEvent")
local productId = 12345678 -- Reemplaza con el ID de tu producto

purchaseEvent.OnServerEvent:Connect(function(player)
    MarketplaceService:PromptProductPurchase(player, productId)
end)local ReplicatedStorage = game:GetService("ReplicatedStorage")
local purchaseEvent = ReplicatedStorage:WaitForChild("PurchaseEvent")
local button = script.Parent

button.MouseButton1Click:Connect(function()
    purchaseEvent:FireServer()
end)
