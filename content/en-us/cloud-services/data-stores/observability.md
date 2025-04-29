-- X LAVT — Полная система: деньги, работа, имущество, банкротство, телефон, транспорт

local Players = game:GetService("Players") local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- RemoteEvents local gainXPEvent = Instance.new("RemoteEvent", ReplicatedStorage) gainXPEvent.Name = "GainXP"

local buyItemEvent = Instance.new("RemoteEvent", ReplicatedStorage) buyItemEvent.Name = "BuyItem"

local sellItemEvent = Instance.new("RemoteEvent", ReplicatedStorage) sellItemEvent.Name = "SellItem"

-- Предметы и цены local items = { House = 1000, Car = 1500, Yacht = 5000, Jet = 10000, Phone = 300 }

-- Создание статистики Players.PlayerAdded:Connect(function(player) local stats = Instance.new("Folder", player) stats.Name = "leaderstats"

local cash = Instance.new("IntValue", stats)
cash.Name = "Cash"
cash.Value = 0

local level = Instance.new("IntValue", stats)
level.Name = "Level"
level.Value = 1

local xp = Instance.new("IntValue", stats)
xp.Name = "XP"
xp.Value = 0

local inv = Instance.new("Folder", player)
inv.Name = "Inventory"
for itemName in pairs(items) do
    local b = Instance.new("BoolValue", inv)
    b.Name = itemName
    b.Value = false
end

end)

-- XP и уровень gainXPEvent.OnServerEvent:Connect(function(player, amount) local stats = player:FindFirstChild("leaderstats") local xp = stats and stats:FindFirstChild("XP") local level = stats and stats:FindFirstChild("Level") if xp and level then xp.Value += amount local req = level.Value * 100 if xp.Value >= req then xp.Value -= req level.Value += 1 end end end)

-- Работающая зона local function setupJobZone(part, money, xp) local prompt = part:FindFirstChildOfClass("ProximityPrompt") or Instance.new("ProximityPrompt", part) prompt.ActionText = "Работать" prompt.ObjectText = part.Name prompt.HoldDuration = 2

prompt.Triggered:Connect(function(player)
    local stats = player:FindFirstChild("leaderstats")
    local cash = stats and stats:FindFirstChild("Cash")
    local level = stats and stats:FindFirstChild("Level")
    if cash and level then
        local earned = money + (level.Value - 1) * 10
        cash.Value += earned
        gainXPEvent:FireServer(player, xp)

        if cash.Value < 0 then
            local inv = player:FindFirstChild("Inventory")
            if inv then
                for _, item in ipairs(inv:GetChildren()) do
                    if item:IsA("BoolValue") then item.Value = false end
                end
            end
            cash.Value = 0
        end
    end
end)

end

-- Настройка всех рабочих зон local function initJobs() local jobs = { {name = "FarmZone", money = 50, xp = 20}, {name = "ShopZone", money = 30, xp = 15}, {name = "FactoryZone", money = 70, xp = 25}, }

for _, job in ipairs(jobs) do
    local part = workspace:FindFirstChild(job.name)
    if part then
        setupJobZone(part, job.money, job.xp)
    end
end

end

-- Выдать транспорт при покупке local function giveVehicle(player, itemName) local modelName = itemName .. "Model" local template = workspace:FindFirstChild(modelName) if template then local clone = template:Clone() clone.Name = player.Name .. "_" .. itemName clone:SetPrimaryPartCFrame(player.Character.HumanoidRootPart.CFrame * CFrame.new(10, 0, 0))

local ownerId = clone:FindFirstChild("OwnerId")
    if ownerId then
        ownerId.Value = player.UserId
    end

    clone.Parent = workspace
end

end

-- Покупка buyItemEvent.OnServerEvent:Connect(function(player, itemName) local price = items[itemName] if not price then return end

local stats = player:FindFirstChild("leaderstats")
local inv = player:FindFirstChild("Inventory")
local cash = stats and stats:FindFirstChild("Cash")
local owned = inv and inv:FindFirstChild(itemName)

if cash and owned and not owned.Value and cash.Value >= price then
    cash.Value -= price
    owned.Value = true
    if itemName == "Car" or itemName == "Yacht" or itemName == "Jet" then
        giveVehicle(player, itemName)
    end
end

end)

-- Продажа sellItemEvent.OnServerEvent:Connect(function(player, itemName) local price = items[itemName] if not price then return end

local stats = player:FindFirstChild("leaderstats")
local inv = player:FindFirstChild("Inventory")
local cash = stats and stats:FindFirstChild("Cash")
local owned = inv and inv:FindFirstChild(itemName)

if cash and owned and owned.Value then
    owned.Value = false
    cash.Value += math.floor(price * 0.5)
end

end)

-- Проверка транспорта local function setupSeat(seat) seat:GetPropertyChangedSignal("Occupant"):Connect(function() local humanoid = seat.Occupant if humanoid then local character = humanoid.Parent local player = Players:GetPlayerFromCharacter(character) local model = seat:FindFirstAncestorOfClass("Model") local ownerId = model and model:FindFirstChild("OwnerId") if player and ownerId and ownerId.Value ~= player.UserId then humanoid.Sit = false player:Kick("Ты не владеешь этим транспортом!") end end end) end

-- Настройка транспорта local function setupAllVehicles() for _, model in ipairs(workspace:GetChildren()) do if model:IsA("Model") and model:FindFirstChild("OwnerId") then for _, d in ipairs(model:GetDescendants()) do if d:IsA("VehicleSeat") then setupSeat(d) end end end end end

-- Запуск initJobs() setupAllVehicles()


