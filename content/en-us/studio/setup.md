🧠 1️⃣ Leaderstats (Level System)
game.Players.PlayerAdded:Connect(function(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local Level = Instance.new("IntValue")
	Level.Name = "Level"
	Level.Value = 1
	Level.Parent = leaderstats
end)
game.Players.PlayerAdded:Connect(function(player)
	local leaderstats = Instance.new("Folder")
	leaderstats.Name = "leaderstats"
	leaderstats.Parent = player

	local Level = Instance.new("IntValue")
	Level.Name = "Level"
	Level.Value = 1
	Level.Parent = leaderstats
end)
