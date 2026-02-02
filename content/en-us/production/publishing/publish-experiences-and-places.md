script.Parent.Touched:Connect(function(hit)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	if player then
		player.lescript.Parent.Touched:Connect(function(hit)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	if player then
		player.leaderstats.Money.Value += 10script.Parent.Touched:Connect(function(hit)
	local hum = hit.Parent:FindFirstChild("Humanoid")
	if hum then
		hum.WalkSpeedwhile true do
	script.Parent.Position += Vector3.new(0, 0, -2)
	wait(0.05)
endlocal tsunami = script.Parent

tsunami.Touched:Connect(function(hit)
	local humanoid = hit.Parent:FindFirstChild("Humanoid")
	if humanoid then
		humanoid.Health = 0
	end
end)script.Parent.Touched:Connect(function(hit)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	if player then
		if not script.Parent:IsDescendantOf(workspace.Bases[player.Name .. "_Base"]) then
			hit.Parent:MoveTo(player.Character.HumanoidRootPart.Position)
		endlocal baseTemplate = workspace:WaitForChild("BaseTemplate")
local basesFolder = workspace:WaitForChild("Bases")

local baseDistance = 80 -- базалар арасы

game.Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)

		-- база копиясы
		local base = baseTemplate:Clone()
		base.Name = player.Name .. "_Base"
		base.Parent = basesFolder

		-- база орны
		local count = #basesFolder:GetChildren()
		base:SetPrimaryPartCFrame(
			CFrame.new(count * baseDistance, 0,local brain = script.Parent

brain.Touched:Connect(function(hit)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	if not player then return end

	local stats = player:FindFirstChild("Stats")
	if not stats then return end

	if stats.Carry.Value < stats.MaxCarry.Value then
		stats.Carry.Value += 1
		brain:Destroy()
	end
end)game.Players.PlayerAdded:Connect(function(player)
	-- leaderstats
	local leaderstats = Instance.new("Folder", player)
	leaderstats.Name = "leaderstats"

	local Money = Instance.new("IntValue", leaderstats)
	Money.Name = "Money"
	Money.Value = 0

	-- stats
	local stats = Instance.new("Folder", player)
	stats.Name = "Stats"

	local Carry = Instance.new("IntValue", stats)
	Carry.Name = "Carry"
	Carry.Value = 0

	local MaxCarry = Instance.new("IntValue", stats)
	MaxCarry.Name = "MaxCarry"
	MaxCarry.Value = 5
end)script.Parent.Touched:Connect(function(hit)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	if not player then return end

	local stats = player:FindFirstChild("Stats")
	local money = player.leaderstats:FindFirstChild("Money")
	if not stats or not money then return end

	if stats.Carry.Value > 0 then
		local earned = stats.Carry.Value * 10 -- 1 brain = 10$
		money.Value += earned
		stats.Carry.Value = 0
	end
end)script.Parent.Touched:Connect(function(hit)
	local player = game.Players:GetPlayerFromCharacter(hit.Parent)
	if not player then return end

	local money = player.leaderstats.Money
	local stats = player.Stats

	if money.Value >= 100 then
		money.Value -= 100
		stats.MaxCarry.Value += 5
	end
end)
