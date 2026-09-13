title: Titanic.lua

-- "Steal a Brainrot" — Hundimiento estilo Titanic (1997)
-- Colocar en ServerScriptService como Script (RunContext: Default / Legacy)
-- Todos los jugadores en los servidores ven todo y nadan si caen al agujero

local Workspace = game:GetService("Workspace")
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")

local map = Workspace:WaitForChild("Map")

-- =========================================================
-- CONFIGURACIÓN (puedes cambiar los tiempos aquí)
-- =========================================================
local TIEMPO_BOMBA = 180                    -- la bomba explota a los 3 minutos (180 segundos)
local TIEMPO_AGUJERO_SE_AGRANDA = 60        -- el agujero crece en 1 minuto hasta el tamaño del mapa
local TIEMPO_HUNDIMIENTO = 1800             -- 30 minutos: el mapa Steal a Brainrot se hunde
local TIEMPO_AGUJERO_DESAPARECE = 60        -- el agujero se achica y desaparece en 1 minuto
local MENSAJE_CREADOR = "benjita_juega: ese juego en una basura, hace que todos lo niños pequeños se pongan a llorar como un bebe, robando a los brainrots. Además lo hundiendo y lo hacke el mapa. Espero que a mí no me banearan, porque soy un poco amable. Así es que yo acabo de escribir."

-- =========================================================
-- FUNCIÓN DE MENSAJE EN PANTALLA (TODOS LOS JUGADORES EN LOS SERVIDORES LO VEN)
-- =========================================================
local function mostrarMensaje(texto, duracion)
	for _, jugador in ipairs(Players:GetPlayers()) do
		local gui = Instance.new("ScreenGui")
		gui.Name = "MensajeEvento"
		gui.ResetOnSpawn = false
		gui.Parent = jugador:WaitForChild("PlayerGui")
		
		local label = Instance.new("TextLabel")
		label.Size = UDim2.new(0.8, 0, 0.15, 0)
		label.Position = UDim2.new(0.1, 0, 0.4, 0)
		label.BackgroundColor3 = Color3.new(0, 0, 0)
		label.BackgroundTransparency = 0.4
		label.TextColor3 = Color3.new(1, 1, 1)
		label.TextScaled = true
		label.Font = Enum.Font.GothamBold
		label.Text = texto
		label.Parent = gui
		
		Debris:AddItem(gui, duracion or 6)
	end
end

-- =========================================================
-- NÚMERO 1: LA BOMBA TOOL — IMAGEN DISEÑADA CON MECHA Y CHISPAS
-- =========================================================
local function crearBombaTool()
	local tool = Instance.new("Tool")
	tool.Name = "Bomba Número 1"
	tool.RequiresHandle = true
	
	local handle = Instance.new("Part")
	handle.Name = "Handle"
	handle.Shape = Enum.PartType.Ball
	handle.Size = Vector3.new(3, 3, 3)
	handle.Color = Color3.fromRGB(50, 50, 50)
	handle.Material = Enum.Material.Metal
	handle.Anchored = false
	handle.Parent = tool
	
	-- Agregar mecha (fuse)
	local mecha = Instance.new("Part")
	mecha.Name = "Mecha"
	mecha.Shape = Enum.PartType.Cylinder
	mecha.Size = Vector3.new(0.5, 2, 0.5)
	mecha.Color = Color3.fromRGB(139, 69, 19)
	mecha.Material = Enum.Material.Rubber
	mecha.CFrame = CFrame.new(0, 2, 0) * CFrame.Angles(math.rad(45), 0, 0)
	mecha.Anchored = false
	mecha.Parent = handle
	
	-- Agregar chispas en la mecha (ParticleEmitter)
	local chispas = Instance.new("ParticleEmitter")
	chispas.Name = "Chispas"
	chispas.Texture = "rbxassetid://243098098"
	chispas.Rate = 20
	chispas.Speed = NumberRange.new(5, 10)
	chispas.Lifetime = NumberRange.new(0.5)
	chispas.Size = NumberSequence.new({NumberSequenceKeypoint.new(0, 0.5), NumberSequenceKeypoint.new(1, 0)})
	chispas.Parent = mecha
	
	-- Agregar detalles de bomba (espinas)
	for i = 1, 8 do
		local espina = Instance.new("Part")
		espina.Name = "Espina" .. i
		espina.Shape = Enum.PartType.Cylinder
		espina.Size = Vector3.new(0.3, 1, 0.3)
		espina.Color = Color3.fromRGB(100, 100, 100)
		espina.Material = Enum.Material.Metal
		espina.CFrame = CFrame.new(
			math.sin(i * math.pi / 4) * 1.5,
			math.cos(i * math.pi / 4) * 1.5,
			0
		) * CFrame.Angles(math.rad(90), 0, 0)
		espina.Anchored = false
		espina.Parent = handle
	end
	
	tool.Handle = handle
	return tool
end

local function crearBombaEnJuego()
	local bomba = Instance.new("Part")
	bomba.Name = "Bomba"
	bomba.Shape = Enum.PartType.Ball
	bomba.Size = Vector3.new(4, 4, 4)
	bomba.Color = Color3.fromRGB(50, 50, 50)
	bomba.Material = Enum.Material.Metal
	bomba.Position = map:GetPivot().Position - Vector3.new(0, 5, 0)
	bomba.Anchored = false
	bomba.Parent = Workspace
	
	-- Agregar mecha (fuse)
	local mecha = Instance.new("Part")
	mecha.Name = "Mecha"
	mecha.Shape = Enum.PartType.Cylinder
	mecha.Size = Vector3.new(0.5, 2, 0.5)
	mecha.Color = Color3.fromRGB(139, 69, 19)
	mecha.Material = Enum.Material.Rubber
	mecha.CFrame = CFrame.new(0, 2, 0) * CFrame.Angles(math.rad(45), 0, 0)
	mecha.Anchored = false
	mecha.Parent = bomba
	
	-- Agregar chispas en la mecha (ParticleEmitter)
	local chispas = Instance.new("ParticleEmitter")
	chispas.Name = "Chispas"
	chispas.Texture = "rbxassetid://243098098"
	chispas.Rate = 20
	chispas.Speed = NumberRange.new(5, 10)
	chispas.Lifetime = NumberRange.new(0.5)
	chispas.Size = NumberSequence.new({NumberSequenceKeypoint.new(0, 0.5), NumberSequenceKeypoint.new(1, 0)})
	chispas.Parent = mecha
	
	return bomba
end

local function explotarBomba(bomba)
	local explosion = Instance.new("Explosion")
	explosion.Position = bomba.Position
	explosion.BlastRadius = 100
	explosion.BlastPressure = 500000
	explosion.Parent = Workspace

	-- Bolitas de explosión por todas partes
	for i = 1, 60 do
		local bolita = Instance.new("Part")
		bolita.Shape = Enum.PartType.Ball
		bolita.Size = Vector3.new(math.random(2, 5), math.random(2, 5), math.random(2, 5))
		bolita.Color = Color3.fromRGB(math.random(200, 255), math.random(60, 120), 0)
		bolita.Material = Enum.Material.Neon
		bolita.Position = bomba.Position
		bolita.Parent = Workspace
		local dir = Vector3.new(math.random(-1, 1), math.random(0.5, 1), math.random(-1, 1)).Unit
		bolita.AssemblyLinearVelocity = dir * math.random(60, 150)
		Debris:AddItem(bolita, 8)
	end

	Debris:AddItem(bomba, 0.1)
end

-- =========================================================
-- NÚMERO 2: AGUJERO NEGRO — aparece y se agranda del tamaño de Steal a Brainrot
-- =========================================================
local function crearAgujeroNegro(posicion)
	local agujero = Instance.new("Part")
	agujero.Name = "AgujeroNegro"
	agujero.Shape = Enum.PartType.Ball
	agujero.Size = Vector3.new(5, 5, 5)
	agujero.Color = Color3.new(0, 0, 0)
	agujero.Material = Enum.Material.Neon
	agujero.Position = posicion
	agujero.Anchored = true
	agujero.CanCollide = false
	agujero.Parent = Workspace

	local sparkle = Instance.new("ParticleEmitter")
	sparkle.Texture = "rbxassetid://243098098"
	sparkle.Rate = 200
	sparkle.Speed = NumberRange.new(30)
	sparkle.Lifetime = NumberRange.new(1)
	sparkle.Parent = agujero

	return agujero
end

local function agrandarAgujeroHastaTamañoDelMapa(agujero, duracion)
	local mapBounds = map:GetBoundingBox()
	local mapSize = mapBounds.Size
	local targetSize = Vector3.new(mapSize.X * 0.5, mapSize.Y * 0.5, mapSize.Z * 0.5)
	TweenService:Create(agujero, TweenInfo.new(duracion, Enum.EasingStyle.Quad), { Size = targetSize }):Play()
end

local function achicarAgujeroYDesaparecer(agujero, duracion)
	TweenService:Create(agujero, TweenInfo.new(duracion, Enum.EasingStyle.Quad), { Size = Vector3.new(1, 1, 1) }):Play()
	task.wait(duracion)
	agujero:Destroy()
end

-- =========================================================
-- AGUA EN EL AGUJERO NEGRO (JUGADORES NADAN COMO TITANIC 1997)
-- =========================================================
local function crearAguaEnAgujero(agujero)
	local agua = Instance.new("Part")
	agua.Name = "AguaAgujeroNegro"
	agua.Shape = Enum.PartType.Ball
	agua.Size = agujero.Size * 1.1
	agua.Color = Color3.new(0, 0, 0)
	agua.Material = Enum.Material.Water
	agua.Position = agujero.Position
	agua.Anchored = true
	agua.Transparency = 0.3
	agua.CanCollide = true
	agua.Parent = Workspace
	
	local particulas = Instance.new("ParticleEmitter")
	particulas.Texture = "rbxassetid://243098098"
	particulas.Rate = 100
	particulas.Speed = NumberRange.new(10)
	particulas.Lifetime = NumberRange.new(2)
	particulas.Parent = agua
	
	return agua
end

-- =========================================================
-- JUGADORES CAEN AL AGUJERO Y NADAN COMO EN TITANIC 1997 (TODOS LOS SERVIDORES)
-- =========================================================
local function verificarJugadoresNadando(agujero, agua)
	for _, jugador in ipairs(Players:GetPlayers()) do
		local character = jugador.Character
		if character then
			local humanoid = character:FindFirstChild("Humanoid")
			local primaryPart = character:FindFirstChild("HumanoidRootPart")
			
			if humanoid and primaryPart then
				local distancia = (primaryPart.Position - agujero.Position).Magnitude
				local radioAgujero = agujero.Size.X / 2
				
				-- Si el jugador está dentro del agujero negro
				if distancia < radioAgujero then
					-- El jugador está nadando como en Titanic 1997
					humanoid.WalkSpeed = 5
					humanoid.BreathRate = 0.5
					
					-- Animación de nadando (flotando en el agua fría)
					if not jugador:FindFirstChild("NadandoEnAgujero") then
						jugador:SetAttribute("NadandoEnAgujero", true)
						mostrarMensaje(jugador.Name .. " está nadando en el agujero negro... como en Titanic 1997.", 8)
					end
				else
					-- El jugador salió del agujero
					if jugador:FindFirstChild("NadandoEnAgujero") then
						jugador:SetAttribute("NadandoEnAgujero", false)
						humanoid.WalkSpeed = 16
					end
				end
			end
		end
	end
end

-- =========================================================
-- NÚMERO 3: HUNDIMIENTO DEL MAPA STEAL A BRAINROT (COMO TITANIC 1997)
-- =========================================================
local function hundirMapaComoTitanic(duracion)
	local objetivo = map:GetPivot() - Vector3.new(0, 120, 0)
	TweenService:Create(map, TweenInfo.new(duracion, Enum.EasingStyle.Linear), { CFrame = objetivo }):Play()
end

-- =========================================================
-- NÚMERO 4: BASEPLATE NUEVO
-- =========================================================
local function crearBaseplate()
	local base = Instance.new("Part")
	base.Name = "BaseplateNuevo"
	base.Size = Vector3.new(512, 4, 512)
	base.Position = Vector3.new(0, 0, 0)
	base.Color = Color3.fromRGB(120, 170, 120)
	base.Material = Enum.Material.Grass
	base.Anchored = true
	base.Parent = Workspace
end

-- =========================================================
-- CREAR EL TOOL EN STARTINGPLACE
-- =========================================================
local function crearToolEnStartingPlace()
	local startingPlace = Workspace:FindFirstChild("StartingPlace") or Workspace
	local tool = crearBombaTool()
	tool.Parent = startingPlace
end

-- =========================================================
-- SECUENCIA PRINCIPAL (TODOS LOS JUGADORES EN LOS SERVIDORES VEN TODO)
-- =========================================================
task.wait(5)
mostrarMensaje("El mapa Steal a Brainrot se está hundiendo en 3 minutos... Corre.", 8)

crearToolEnStartingPlace()
local bomba = crearBombaEnJuego()

-- =========================================================
-- NÚMERO 1: LA BOMBA EXPLOTA EN 3 MINUTOS
-- =========================================================
task.wait(TIEMPO_BOMBA)
mostrarMensaje("¡LA BOMBA HA EXPLOTADO!", 5)
explotarBomba(bomba)

-- =========================================================
-- NÚMERO 2: EL AGUJERO NEGRO SE AGRANDA DEL TAMAÑO DE STEAL A BRAINROT (1 minuto)
-- =========================================================
mostrarMensaje("¡Un agujero negro ha aparecido abajo del mapa Steal a Brainrot!", 6)
local agujero = crearAgujeroNegro(Vector3.new(0, -60, 0))
agrandarAgujeroHastaTamañoDelMapa(agujero, TIEMPO_AGUJERO_SE_AGRANDA)

local agua = crearAguaEnAgujero(agujero)

-- =========================================================
-- NÚMERO 3: STEAL A BRAINROT SE HUNDE EN 30 MINUTOS (COMO TITANIC 1997)
-- JUEGADORES CAEN AL AGUJERO Y NADAN
-- =========================================================
mostrarMensaje("El mapa Steal a Brainrot se está partiendo en dos... como el hundimiento del Titanic.", 6)
hundirMapaComoTitanic(TIEMPO_HUNDIMIENTO)

-- Verificar jugadores nadando en el agujero (todos los servidores)
task.spawn(function()
	while agujero and agua do
		verificarJugadoresNadando(agujero, agua)
		task.wait(1)
	end
end)

-- =========================================================
-- NÚMERO 4: APARECE EL BASEPLATE Y EL AGUJERO SE ACHICA Y DESAPARECE EN 1 MINUTO
-- =========================================================
task.wait(TIEMPO_AGUJERO_DESAPARECE)
mostrarMensaje("El agujero negro se está achicando...", 5)
achicarAgujeroYDesaparecer(agujero, TIEMPO_AGUJERO_DESAPARECE)
task.wait(2)
crearBaseplate()
mostrarMensaje("¡Ha aparecido un nuevo baseplate!", 5)

-- =========================================================
-- NÚMERO 5: MENSAJE FINAL DEL CREADOR
-- =========================================================
task.wait(3)
mostrarMensaje(MENSAJE_CREADOR, 15)
