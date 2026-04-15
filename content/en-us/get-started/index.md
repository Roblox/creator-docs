local KillerAnimations = {

	JohnDoe = {
		Walk = "rbxassetid://0",
		Run = "rbxassetid://0",
		Kill = "rbxassetid://0",
		Ability = "rbxassetid://0"
	},

	CoolKid = {
		Walk = "rbxassetid://0",
		Run = "rbxassetid://0",
		Kill = "rbxassetid://0",
		Ability = "rbxassetid://0"
	},

	Stalker = {
		Walk = "rbxassetid://0",
		Run = "rbxassetid://0",
		Kill = "rbxassetid://0",
		Ability = "rbxassetid://0"
	},

	TheCycle = {
		Walk = "rbxassetid://0",
		Run = "rbxassetid://0",
		Kill = "rbxassetid://0",
		Ability = "rbxassetid://0"
	},

	Heartbreak = {
		Walk = "rbxassetid://0",
		Run = "rbxassetid://0",
		Kill = "rbxassetid://0",
		Ability = "rbxassetid://0"
	},

	Entity = {
		Walk = "rbxassetid://0",
		Run = "rbxassetid://0",
		Kill = "rbxassetid://0",
		Ability = "rbxassetid://0"
	}
}function SelectKiller()

	local list = {"JohnDoe","CoolKid","Stalker","Cycle","Heartbreak","Entity"}

	local killer = list[math.random(1,#list)]

	for _,p in pairs(Players:GetPlayers()) do
		p:SetAttribute("Role","Survivor")
	end

	local chosen = Players:GetPlayers()[math.random(1,#Players:GetPlayers())]
	chosen:SetAttribute("Role","Killer")
	chosen:SetAttribute("KillerType",killer)

	return chosen, killer
end-- =========================
-- KILLER ANNOUNCEMENT SYSTEM
-- (BIG UI TEXT + USER DISPLAY)
-- =========================

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- RemoteEvent (create in ReplicatedStorage)
-- Name it: KillerAnnouncement

-- =========================
-- SET KILLER + ANNOUNCE
-- =========================

local function GetRandomKiller()
	local killers = {
		"Stalker",
		"CoolKid",
		"TheCycle",
		"Heartbreak",
		"JohnDoe",
		"Entity"
	}

	return killers[math.random(1, #killers)]
end

local function PickKiller()
	local players = Players:GetPlayers()
	if #players == 0 then return end

	local killerPlayer = players[math.random(1, #players)]
	local killerName = GetRandomKiller()

	killerPlayer:SetAttribute("Role", "Killer")
	killerPlayer:SetAttribute("KillerType", killerName)

	return killerPlayer, killerName
end

-- =========================
-- BROADCAST BIG TEXT
-- =========================

local function AnnounceKiller(killerPlayer, killerName)

	for _,p in pairs(Players:GetPlayers()) do
		ReplicatedStorage.KillerAnnouncement:FireClient(p, {
			Title = "⚠ KILLER SELECTED ⚠",
			Line1 = "Killer Type: " .. killerName,
			Line2 = "Player: " .. killerPlayer.Name,
			Line3 = "Survive at all costs"
		})
	end
end

-- =========================
-- START ROUND
-- =========================

function StartRound()

	local killerPlayer, killerName = PickKiller()
	if not killerPlayer then return end

	AnnounceKiller(killerPlayer, killerName)
end

-- =========================
-- CLIENT UI (REFERENCE)
-- =========================
-- OnClientEvent should show big screen text like:
--
-- ⚠ KILLER SELECTED ⚠
-- Killer Type: JohnDoe
-- Player: RobloxUser123
-- Survive at all costs
--
