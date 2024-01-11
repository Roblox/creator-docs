---
title: Hit Detection with Lasers
description: The process for casting a laser from a blaster and detecting collision.
prev: /tutorials/scripting/intermediate-scripting/creating-player-tools
---

In this tutorial, you'll learn how to cast a laser from the blaster in [Creating Player Tools](../../../tutorials/scripting/intermediate-scripting/creating-player-tools.md) and detect whether or not it hits a player.

<video controls loop muted>
    <source src="../../../assets/tutorials/hit-detection-with-lasers/Introduction-Video.mp4" />
</video>

## Raycasting to Find Collisions

**Raycasting** creates an invisible ray from a start position towards a given direction with a defined length. If the ray collides with objects or terrain in its path, it will return information on the collision such as the position and the object it collided with.

<figure>
    <img src="../../../assets/tutorials/hit-detection-with-lasers/Ray-Diagram.png" />
    <figcaption>Raycast from A towards B colliding with a wall</figcaption>
</figure>

## Finding the Mouse Location

Before a laser can be shot, you must first know where the player is aiming. This can be found by raycasting from the player's 2D mouse location on the screen directly forwards from the camera into the game world. The ray will collide with whatever the player is aiming at with the mouse.

1. Open the **ToolController** script inside the Blaster tool from [Creating Player Tools](../../../tutorials/scripting/intermediate-scripting/creating-player-tools.md). If you haven't completed that tutorial yet you can download the [Blaster](https://www.roblox.com/library/6571559694/Blaster) model and insert it into StarterPack.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-ToolController.png)

   <Alert severity="info">

   Models can be added into your Inventory to be used between any game.

   1. In a browser, open the [model](https://www.roblox.com/library/6571559694/Blaster) page, click the **Get** button. This adds the model into your inventory.
   2. In Studio, go to the **View** tab and click on the **Toolbox**.
   3. In the Toolbox window, click on the **Inventory** button. Then, make sure the dropdown is on **My Models**.
   4. Select the **Blaster** model to add it into the **StarterPack**.

   </Alert>

2. At the top of the script, declare a constant named MAX_MOUSE_DISTANCE with a value of **1000**.

3. Create a function called `getWorldMousePosition`.

   ```lua
   local tool = script.Parent

   local MAX_MOUSE_DISTANCE = 1000

   local function getWorldMousePosition()

   end

   local function toolEquipped()
       tool.Handle.Equip:Play()
   end

   local function toolActivated()
       tool.Handle.Activate:Play()
   end

   -- Connect events to appropriate functions
   tool.Equipped:Connect(toolEquipped)
   tool.Activated:Connect(toolActivated)
   ```

4. Use the GetMouseLocation function of `Class.UserInputService` to get the player's 2D mouse location on the screen. Assign this to a variable named **mouseLocation**.

   ```lua
   local UserInputService = game:GetService("UserInputService")

   local tool = script.Parent

   local MAX_MOUSE_DISTANCE = 1000

   local function getWorldMousePosition()
       local mouseLocation = UserInputService:GetMouseLocation()
   end
   ```

Now the 2D mouse location is known, its **X** and **Y** properties can be used as parameters for the `Class.Camera:ViewportPointToRay()` function, which creates a `Datatype.Ray` from the screen into the 3D game world.

1. Use the **X** and **Y** properties of `mouseLocation` as arguments for the `Class.Camera:ViewportPointToRay()|ViewportPointToRay()` function. Assign this to a variable named **screenToWorldRay**.

   ```lua
   local function getWorldMousePosition()
       local mouseLocation = UserInputService:GetMouseLocation()

       -- Create a ray from the 2D mouse location
       local screenToWorldRay = workspace.CurrentCamera:ViewportPointToRay(mouseLocation.X, mouseLocation.Y)
   end
   ```

It's time to use the `Class.WorldRoot:Raycast()|Raycast` function to check if the ray hits an object. This requires a start position and direction vector: in this example, you will use the origin and direction properties of `screenToWorldRay`.

The length of the direction vector determines how far the ray will travel. The ray needs to be as long as the `MAX_MOUSE_DISTANCE`, so you'll have to multiply the direction vector by `MAX_MOUSE_DISTANCE`.

1. Declare a variable named **directionVector** and assign it the value of `screenToWorldRay.Direction` multiplied by `MAX_MOUSE_DISTANCE`.

   ```lua
   local function getWorldMousePosition()
       local mouseLocation = UserInputService:GetMouseLocation()

       -- Create a ray from the 2D mouseLocation
       local screenToWorldRay = workspace.CurrentCamera:ViewportPointToRay(mouseLocation.X, mouseLocation.Y)

       -- The unit direction vector of the ray multiplied by a maximum distance
       local directionVector = screenToWorldRay.Direction * MAX_MOUSE_DISTANCE
   ```

2. Call the `Class.WorldRoot:Raycast()|Raycast` function of workspace, passing the **Origin** property of `screenToWorldRay` as the first argument and `directionVector` as the second. Assign this to a variable named **raycastResult**.

   ```lua
   local function getWorldMousePosition()
       local mouseLocation = UserInputService:GetMouseLocation()

       -- Create a ray from the 2D mouseLocation
       local screenToWorldRay = workspace.CurrentCamera:ViewportPointToRay(mouseLocation.X, mouseLocation.Y)

       -- The unit direction vector of the ray multiplied by a maximum distance
       local directionVector = screenToWorldRay.Direction * MAX_MOUSE_DISTANCE

       -- Raycast from the ray's origin towards its direction
       local raycastResult = workspace:Raycast(screenToWorldRay.Origin, directionVector)
   ```

## Collision Information

If the raycast operation finds an object hit by the ray, it will return a `Datatype.RaycastResult`, which contains information about the collision between the ray and object.

<table>
    <thead>
        <tr>
            <th>RaycastResult Property</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><b>Instance</b></td>
            <td>The `Class.BasePart` or `Class.Terrain` cell that the ray intersected.</td>
        </tr>
        <tr>
            <td><b>Position</b></td>
            <td>Where the intersection occurred; usually a point directly on the surface of a part or terrain.</td>
        </tr>
        <tr>
            <td><b>Material</b></td>
            <td>The material at the collision point.</td>
        </tr>
        <tr>
            <td><b>Normal</b></td>
            <td>The normal vector of the intersected face. This can be used to determine which way the face is pointing.</td>
        </tr>
    </tbody>
</table>

The **Position** property will be the position of the object that the mouse is hovering over. If the mouse isn't hovering over any object within a distance of `MAX_MOUSE_DISTANCE`, `raycastResult` will be nil.

1. Create an if statement to check whether `raycastResult` exists.

2. If `raycastResult` has a value, return its **Position** property.

3. If `raycastResult` is nil then find the end of the raycast. Calculate the 3D position of the mouse by adding `screenToWorldRay.Origin` and `directionVector` together.

```lua
local function getWorldMousePosition()
    local mouseLocation = UserInputService:GetMouseLocation()

    -- Create a ray from the 2D mouseLocation
    local screenToWorldRay = workspace.CurrentCamera:ViewportPointToRay(mouseLocation.X, mouseLocation.Y)

    -- The unit direction vector of the ray multiplied by a maximum distance
    local directionVector = screenToWorldRay.Direction * MAX_MOUSE_DISTANCE

    -- Raycast from the ray's origin towards its direction
    local raycastResult = workspace:Raycast(screenToWorldRay.Origin, directionVector)

    if raycastResult then
        -- Return the 3D point of intersection
        return raycastResult.Position
    else
        -- No object was hit so calculate the position at the end of the ray
        return screenToWorldRay.Origin + directionVector
    end
end
```

## Firing Towards the Target

Now that the 3D mouse position is known, it can be used as a **target position** to fire a laser towards. A second ray can be cast between the player's weapon and the target position using the **Raycast** function.

1. Declare a constant called `MAX_LASER_DISTANCE` at the top of the script and assign it to **500**, or your chosen range for the laser blaster.

   ```lua
   local UserInputService = game:GetService("UserInputService")

   local tool = script.Parent

   local MAX_MOUSE_DISTANCE = 1000
   local MAX_LASER_DISTANCE = 500
   ```

2. Create a function called **fireWeapon** under the `getWorldMousePosition` function.

3. Call `getWorldMousePosition` and assign the result to a variable named **mousePosition**. This will be the target position for raycast.

   ```lua
           -- No object was hit so calculate the position at the end of the ray
           return screenToWorldRay.Origin + directionVector
       end
   end

   local function fireWeapon()
       local mouseLocation = getWorldMousePosition()
   end

   local function toolEquipped()
       tool.Handle.Equip:Play()
   end
   ```

This time, the direction vector for the raycast function will represent the direction from the player's tool position to the target location.

1. Declare a variable named **targetDirection** and calculate the direction vector by subtracting the tool position from `mouseLocation`.

2. Normalise the vector by using its **Unit** property. This gives it a magnitude of 1, which makes it easy to multiply by a length later.

   ```lua
   local function fireWeapon()
       local mouseLocation = getWorldMousePosition()

       -- Calculate a normalised direction vector and multiply by laser distance
       local targetDirection = (mouseLocation - tool.Handle.Position).Unit
   end
   ```

3. Declare a variable named **directionVector** and assign to it the `targetDirection` multiplied by the `MAX_LASER_DISTANCE`.

   ```lua
       local targetDirection = (mouseLocation - tool.Handle.Position).Unit

       -- The direction to fire the weapon, multiplied by a maximum distance
       local directionVector = targetDirection * MAX_LASER_DISTANCE
   end
   ```

A `Datatype.RaycastParams` object can be used to store additional parameters for the raycast function. It will be used in your laser blaster to make sure the raycast doesn't accidentally collide with the player firing the weapon. Any parts included in the `Datatype.RaycastParams.FilterDescendantsInstances|FilterDescendantsInstances` property of a RaycastParams object will be **ignored** in the raycast.

1. Continue the `fireWeapon` function and declare a variable called **weaponRaycastParams**. Assign a new RaycastParams object to it.

2. Create a table containing the player's local **character** and assign it to the `weaponRaycastParams.FilterDescendantsInstances` property.

3. Raycast from the player's tool handle position, in a direction towards the `directionVector`. Remember to add `weaponRaycastParams` as an argument this time. Assign this to a variable named **weaponRaycastResult**.

```lua
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")

local tool = script.Parent

local MAX_MOUSE_DISTANCE = 1000
local MAX_LASER_DISTANCE = 500

local function getWorldMousePosition()
```

```lua
local function fireWeapon()
    local mouseLocation = getWorldMousePosition()

    -- Calculate a normalised direction vector and multiply by laser distance
    local targetDirection = (mouseLocation - tool.Handle.Position).Unit

    -- The direction to fire the weapon multiplied by a maximum distance
    local directionVector = targetDirection * MAX_LASER_DISTANCE

    -- Ignore the player's character to prevent them from damaging themselves
    local weaponRaycastParams = RaycastParams.new()
    weaponRaycastParams.FilterDescendantsInstances = {Players.LocalPlayer.Character}
    local weaponRaycastResult = workspace:Raycast(tool.Handle.Position, directionVector, weaponRaycastParams)
end
```

Finally, you'll need to check that the raycast operation returned a value. If a value is returned, an object was hit by the ray and a laser can be created between the weapon and hit location. If nothing was returned, the final position needs to be calculated in order to create the laser.

1. Declare an empty variable named **hitPosition**.

2. Use an **if** statement to check whether `weaponRaycastResult` has a value. If an object was hit, assign `weaponRaycastResult.Position` to `hitPosition`.

   ```lua
       local weaponRaycastResult = workspace:Raycast(tool.Handle.Position, directionVector, weaponRaycastParams)

       -- Check if any objects were hit between the start and end position
       local hitPosition
       if weaponRaycastResult then
           hitPosition = weaponRaycastResult.Position
       end
   ```

3. If `weaponRaycastResult` has no value, calculate the end position of the raycast by adding together the **position** of the tool handle with the `directionVector`. Assign this to **hitPosition**.

   ```lua
       local weaponRaycastResult = workspace:Raycast(tool.Handle.Position, directionVector, weaponRaycastParams)

       -- Check if any objects were hit between the start and end position
       local hitPosition
       if weaponRaycastResult then
           hitPosition = weaponRaycastResult.Position
       else
           -- Calculate the end position based on maximum laser distance
           hitPosition = tool.Handle.Position + directionVector
       end
   end
   ```

4. Navigate to the `toolActivated` function and call the `fireWeapon` function so that the laser fires each time the tool is activated.

   ```lua
   local function toolActivated()
       tool.Handle.Activate:Play()
       fireWeapon()
   end
   ```

## Checking the Object Hit

To find if the object hit by the laser is part of a player's character or just a piece of scenery, you'll need to look for a `Class.Humanoid`, as every character has one.

First, you'll need to find the **character model**. If a part of the character was hit, you cannot assume the parent of the object hit would be the character. The laser could have hit a body part, an accessory, or a tool, all of which are located in different parts of the character's hierarchy.

![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-Character-Hierarchy.png)

You can use `Class.Instance:FindFirstAncestorOfClass()|FindFirstAncestorOfClass` to find a character model ancestor of the object hit by the laser, if one exists. If you find a model and it contains a humanoid, in most cases you can assume it's a character.

<Alert severity="warning">
If you have other models in the game that contain humanoids, further checks will be needed.
</Alert>

1. Add the highlighted code below to the `weaponRaycastResult` **if** statement to check if a character was hit.

   ```lua
       -- Check if any objects were hit between the start and end position
       local hitPosition
       if weaponRaycastResult then
           hitPosition = weaponRaycastResult.Position

           -- The instance hit will be a child of a character model
           -- If a humanoid is found in the model then it's likely a player's character
           local characterModel = weaponRaycastResult.Instance:FindFirstAncestorOfClass("Model")
           if characterModel then
               local humanoid = characterModel:FindFirstChild("Humanoid")
               if humanoid then
                   print("Player hit")
               end
           end
       else
           -- Calculate the end position based on maximum laser distance
           hitPosition = tool.Handle.Position + directionVector
       end
   ```

Now the laser blaster should print `Player hit` to the output window every time the raycast operation hits another player.

## Testing with Multiple Players

Two players are needed to test if the weapon raycast is finding other players, so you need to start a local server.

1. Select the **Test** tab in Studio.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Test-Tab.png)

2. Make sure the players dropdown is set to '2 Players' and click the Start button to **start** a local server with 2 clients. Three windows will appear. The first window will be the local server, the other windows will be the clients for Player1 and Player2.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Test-Tab-Start-Button.png)

3. On one client, test shooting the other player with the weapon by clicking on them. "Player hit" should be displayed in the output each time a player is shot.

   <video controls loop muted>
    <source src="../../../assets/tutorials/hit-detection-with-lasers/Output-Video.mp4" />
   </video>

You can find out more about the Test tab [here](../../../studio/test-tab.md).

## Finding the Laser Position

The blaster should fire a red beam of light at its target. The function for this will be inside a `Class.ModuleScript` so it can be reused in other scripts later on. First, the script will need to find the position where the laser beam should be rendered.

1. Create a **ModuleScript** named **LaserRenderer**, parented to StarterPlayerScripts under StarterPlayer.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-LaserRenderer.png)

2. Open the script and rename the module table to the name of the script **LaserRenderer**.

3. Declare a variable named **SHOT_DURATION** with a value of **0.15**. This will be the amount of time (in seconds) the laser is visible for.

4. Create a function of LaserRenderer named **createLaser** with two parameters called **toolHandle** and **endPosition**.

   ```lua
   local LaserRenderer = {}

   local SHOT_DURATION = 0.15 -- Time that the laser is visible for

   -- Create a laser beam from a start position towards an end position
   function LaserRenderer.createLaser(toolHandle, endPosition)

   end

   return LaserRenderer
   ```

5. Declare a variable named **startPosition** and set the **Position** property of `toolHandle` as its value. This will be the position of the player's laser blaster.

6. Declare a variable named **laserDistance** and subtract `endPosition` from `startPosition` to find the difference between the two vectors. Use the **Magnitude** property of this to get the length of the laser beam.

   ```lua
   function LaserRenderer.createLaser(toolHandle, endPosition)
       local startPosition = toolHandle.Position

       local laserDistance = (startPosition - endPosition).Magnitude
   end
   ```

7. Declare a **laserCFrame** variable to store the position and orientation of the laser beam. The position needs to be the midpoint of the start and end of the beam. Use **CFrame.lookAt** to create a new `Datatype.CFrame` located at `startPosition` and facing towards `endPosition`. Multiply this by a new CFrame with a Z axis value of half of negative `laserDistance` to get the midpoint.

   ![](../../../assets/tutorials/hit-detection-with-lasers/CFrame-Render.png)

   ```lua
   function LaserRenderer.createLaser(toolHandle, endPosition)
       local startPosition = toolHandle.Position

       local laserDistance = (startPosition - endPosition).Magnitude
       local laserCFrame = CFrame.lookAt(startPosition, endPosition) * CFrame.new(0, 0, -laserDistance / 2)
   end
   ```

## Creating the Laser Part

Now that you know where to create a laser beam, you need to add the beam itself. This can be done easily with a Neon part.

1. Declare a variable **laserPart** and assign to it a new `Class.Part` instance.

2. Set the following properties of `laserPart`:

   1. **Size**: Vector3.new(0.2, 0.2, laserDistance)
   2. **CFrame**: laserCFrame
   3. **Anchored**: true
   4. **CanCollide**: false
   5. **Color**: Color3.fromRGB(225, 0, 0) (a strong red color)
   6. **Material**: Enum.Material.Neon

3. Parent `laserPart` to **Workspace**.

4. Add the part to the `Class.Debris` service so that it gets removed after the amount of seconds in the `SHOT_DURATION` variable.

   ```lua
   function LaserRenderer.createLaser(toolHandle, endPosition)
       local startPosition = toolHandle.Position

       local laserDistance = (startPosition - endPosition).Magnitude
       local laserCFrame = CFrame.lookAt(startPosition, endPosition) * CFrame.new(0, 0, -laserDistance / 2)

       local laserPart = Instance.new("Part")
       laserPart.Size = Vector3.new(0.2, 0.2, laserDistance)
       laserPart.CFrame = laserCFrame
       laserPart.Anchored = true
       laserPart.CanCollide = false
       laserPart.Color = Color3.fromRGB(225, 0, 0)
       laserPart.Material = Enum.Material.Neon
       laserPart.Parent = workspace

       -- Add laser beam to the Debris service to be removed & cleaned up
       Debris:AddItem(laserPart, SHOT_DURATION)
   end
   ```

Now the function to render the laser beam is complete, it can be called by the **ToolController**.

1. At the top of the **ToolController** script, declare a variable named **LaserRenderer** and require the LaserRenderer ModuleScript located in PlayerScripts.

   ```lua
   local UserInputService = game:GetService("UserInputService")
   local Players = game:GetService("Players")

   local LaserRenderer = require(Players.LocalPlayer.PlayerScripts.LaserRenderer)

   local tool = script.Parent
   ```

2. At the bottom of the `fireWeapon` function, call the LaserRenderer `createLaser` function using the tool handle and `hitPosition` as arguments.

   ```lua
           -- Calculate the end position based on maximum laser distance
           hitPosition = tool.Handle.Position + directionVector
       end

       LaserRenderer.createLaser(tool.Handle, hitPosition)
   end
   ```

3. Test the weapon by clicking the Play button. A laser beam should be visible between the weapon and the mouse when the tool is activated.

<video controls loop muted>
    <source src="../../../assets/tutorials/hit-detection-with-lasers/Laser-Render-Video.mp4" />
</video>

## Controlling Weapon Fire Rate

Weapons need a delay between each shot to stop players from dealing too much damage in a short amount of time. This can be controlled by checking if enough time has passed since a player last fired.

1. Declare a variable at the top of the **ToolController** called **FIRE_RATE**. This will be the minimum time between each shot. Give it a value of your choosing; this example uses **0.3** seconds.

2. Declare another variable underneath called **timeOfPreviousShot** with a value of **0**. This stores the last time the player fired and will be updated with each shot.

   ```lua
   local MAX_MOUSE_DISTANCE = 1000
   local MAX_LASER_DISTANCE = 300
   local FIRE_RATE = 0.3
   local timeOfPreviousShot = 0
   ```

3. Create a function called **canShootWeapon** with no parameters. This function will look at how much time has passed since the previous shot and return true or false.

   ```lua
   local FIRE_RATE = 0.3
   local timeOfPreviousShot = 0

   -- Check if enough time has passed since previous shot was fired
   local function canShootWeapon()

   end

   local function getWorldMousePosition()
   ```

4. Inside the function declare a variable named **currentTime**; assign to it the result of calling the `Global.RobloxGlobals.tick()|tick()` function. This returns how much time has elapsed, in seconds, since the 1st of January 1970 (an arbitrary date widely used to calculate time).

5. Subtract the `timeOfPreviousShot` from `currentTime` and return **false** if the result is smaller than `FIRE_RATE`; otherwise, return **true**.

   ```lua
   -- Check if enough time has passed since previous shot was fired
   local function canShootWeapon()
       local currentTime = tick()
       if currentTime - timeOfPreviousShot < FIRE_RATE then
           return false
       end
       return true
   end
   ```

6. At the end of the `fireWeapon` function, update `timeOfPreviousShot` each time the weapon is fired using `tick`.

   ```lua
           hitPosition = tool.Handle.Position + directionVector
       end

       timeOfPreviousShot = tick()

       LaserRenderer.createLaser(tool.Handle, hitPosition)
   end
   ```

7. Inside the `toolActivated` function, create an **if** statement and call `canShootWeapon` to check if the weapon can be fired.

   ```lua
   local function toolActivated()
       if canShootWeapon() then
           tool.Handle.Activate:Play()
           fireWeapon()
       end
   end
   ```

When you test the blaster you should find that no matter how fast you click, there will always be a short 0.3 seconds delay between each shot.

## Damaging the Player

Clients cannot damage other clients directly; the server needs to be responsible for issuing damage when a player is hit.

Clients can use a `Class.RemoteEvent` to tell the server that a character has been hit. These should be stored in **ReplicatedStorage**, where they are visible to both client and server.

1. Create a **Folder** in ReplicatedStorage named **Events**.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-Events-Folder.png)

2. Insert a RemoteEvent into the Events folder and name it **DamageCharacter**.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-Damage-Character.png)

3. In **ToolController**, create variables at the start of the script for ReplicatedStorage and the Events folder.

   ```lua
   local UserInputService = game:GetService("UserInputService")
   local Players = game:GetService("Players")
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local LaserRenderer = require(Players.LocalPlayer.PlayerScripts.LaserRenderer)

   local tool = script.Parent
   local eventsFolder = ReplicatedStorage.Events

   local MAX_MOUSE_DISTANCE = 1000
   local MAX_LASER_DISTANCE = 500
   ```

4. Replace the `"Player hit"` print statement in `fireWeapon` with a line of Lua to fire the **DamageCharacter** remote event with the `characterModel` variable as an argument.

   ```lua
       local characterModel = weaponRaycastResult.Instance:FindFirstAncestorOfClass("Model")
       if characterModel then
           local humanoid = characterModel:FindFirstChild("Humanoid")
           if humanoid then
               eventsFolder.DamageCharacter:FireServer(characterModel)
           end
       end
   else
       -- Calculate the end position based on maximum laser distance
       hitPosition = tool.Handle.Position + directionVector
   end
   ```

The server needs to deal damage to the player who has been hit when the event is fired.

1. Insert a **Script** into ServerScriptService and name it **ServerLaserManager**.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-ServerLaserManager.png)

2. Declare a variable named `LASER_DAMAGE` and set it to **10**, or a value of your choice.

3. Create a function named `damageCharacter` with two parameters called **playerFired** and **characterToDamage**.

4. Inside the function, find the character's Humanoid and subtract `LASER_DAMAGE` from its health.

5. Connect the `damageCharacter` function to the **DamageCharacter** remote event in the Events folder.

   ```lua
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local eventsFolder = ReplicatedStorage.Events
   local LASER_DAMAGE = 10

   function damageCharacter(playerFired, characterToDamage)
       local humanoid = characterToDamage:FindFirstChild("Humanoid")
       if humanoid then
           -- Remove health from character
           humanoid.Health -= LASER_DAMAGE
       end
   end

   -- Connect events to appropriate functions
   eventsFolder.DamageCharacter.OnServerEvent:Connect(damageCharacter)
   ```

6. Test the blaster with 2 players by starting a local server. When you shoot the other player, their health will decrease by the number assigned to `LASER_DAMAGE`.

## Rendering Other Player's Laser Beams

Currently, the laser beam is created by the client firing the weapon, so only they will be able to see the laser beam.

If the laser beam was created on the server then everyone would be able to see it. However, there would be a small **delay** between the client shooting the weapon and the server receiving the information about the shot. This would mean the client shooting the weapon would see a delay between when they activate the weapon and when they see the laser beam; the weapon would feel laggy as a result.

To solve this issue, every client will create their own laser beams. This means the client shooting the weapon will see the laser beam instantly. Other clients will experience a small delay between when another player shoots and a beam appears. This is the best case scenario: there is no way to communicate one client's laser to other clients any faster.

### Shooter's Client

First, the client needs to tell the server it has fired a laser and provide the end position.

1. Insert a **RemoteEvent** into the Events folder in ReplicatedStorage and name it **LaserFired**.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-LaserFired.png)

2. Locate the `fireWeapon` function in the **ToolController** script. At the end of the function, fire the **LaserFired** remote event using `hitPosition` as an argument.

   ```lua
           hitPosition = tool.Handle.Position + directionVector
       end

       timeOfPreviousShot = tick()

       eventsFolder.LaserFired:FireServer(hitPosition)
       LaserRenderer.createLaser(tool.Handle, hitPosition)
   end
   ```

### The Server

The server now must receive the event that the client has fired and tell all clients the start and end position of the laser beam so they can also render it.

1. In the **ServerLaserManager** script, create a function named **playerFiredLaser** above `damageCharacter` with two parameters called `playerFired` and `endPosition`.

2. Connect the function to the **LaserFired** remote event.

   ```lua
   -- Notify all clients that a laser has been fired so they can display the laser
   local function playerFiredLaser(playerFired, endPosition)

   end
   ```

   ```lua
   -- Connect events to appropriate functions
   eventsFolder.DamageCharacter.OnServerEvent:Connect(damageCharacter)
   eventsFolder.LaserFired.OnServerEvent:Connect(playerFiredLaser)
   ```

The server needs the start position of the laser. This could be sent from the client, but it's best to avoid trusting the client where possible. The character's weapon handle position will be the start position, so the server can find it from there.

1. Create a function **getPlayerToolHandle** above the `playerFiredLaser` function with a parameter called `player`.

2. Use the following code to search the player's character for the weapon and return the handle object.

   ```lua
   local LASER_DAMAGE = 10

   -- Find the handle of the tool the player is holding
   local function getPlayerToolHandle(player)
       local weapon = player.Character:FindFirstChildOfClass("Tool")
       if weapon then
           return weapon:FindFirstChild("Handle")
       end
   end

   -- Notify all clients that a laser has been fired so they can display the laser
   local function playerFiredLaser(playerFired, endPosition)
   ```

The server can now call **FireAllClients** on the **LaserFired** remote event to send the information required to render the laser to the clients. This includes the **player** who fired the laser (so the client for that player does not render the laser twice), the **handle** of the blaster (which acts as a starting position for the laser) and the end position of the laser.

1. In the `playerFiredLaser` function, call the `getPlayerToolHandle` function with `playerFired` as an argument and assign the value to a variable named **toolHandle**.

2. If **toolHandle** exists, fire the LaserFired event for all clients using `playerFired`, `toolHandle` and `endPosition` as arguments.

   ```lua
   -- Notify all clients that a laser has been fired so they can display the laser
   local function playerFiredLaser(playerFired, endPosition)
       local toolHandle = getPlayerToolHandle(playerFired)
       if toolHandle then
           eventsFolder.LaserFired:FireAllClients(playerFired, toolHandle, endPosition)
       end
   end
   ```

### Rendering on the Clients

Now **FireAllClients** has been called, each client will receive an event from the server to render a laser beam. Each client can reuse the **LaserRenderer** module from earlier to render the laser beam using the tool's handle position and end position value sent by the server. The player that fired the laser beam in the first place should ignore this event otherwise they'll see 2 lasers.

1. Create a **LocalScript** in StarterPlayerScripts called **ClientLaserManager**.

   ![](../../../assets/tutorials/hit-detection-with-lasers/Explorer-ClientLaserManager.png)

2. Inside the script, require the **LaserRenderer** module.

3. Create a function named **createPlayerLaser** with the parameters `playerWhoShot`, `toolHandle` and `endPosition`.

4. Connect the function to the **LaserFired** remote event in the Events folder.

5. In the function, use an **if** statement to check if `playerWhoShot` does **not equal** the LocalPlayer.

6. Inside the if statement, call the `createLaser` function from the LaserRenderer module using `toolHandle` and `endPosition` as arguments.

   ```lua
   local Players = game:GetService("Players")
   local ReplicatedStorage = game:GetService("ReplicatedStorage")

   local LaserRenderer = require(script.Parent:WaitForChild("LaserRenderer"))

   local eventsFolder = ReplicatedStorage.Events

   -- Display another player's laser
   local function createPlayerLaser(playerWhoShot, toolHandle, endPosition)
       if playerWhoShot ~= Players.LocalPlayer then
           LaserRenderer.createLaser(toolHandle, endPosition)
       end
   end

   eventsFolder.LaserFired.OnClientEvent:Connect(createPlayerLaser)
   ```

7. Test the blaster with 2 players by starting a local server. Position each client on different sides of your monitor so you can see both windows at once. When you shoot on one client you should see the laser on the other client.

<video controls loop muted>
    <source src="../../../assets/tutorials/hit-detection-with-lasers/Client-Laser-Communication-Video.mp4" />
</video>

## Sound Effects

The shooting sound effect currently only plays on the client that's shooting the projectile. You'll need to move the code to play the sound so that other players will hear it too.

1. In the **ToolController** script, navigate to the **toolActivated** function and remove the line which plays the Activate sound.

   ```lua
    local function toolActivated()
        if canShootWeapon() then

            fireWeapon()
        end
    end
   ```

2. At the bottom of the `createLaser` function in **LaserRenderer**, declare a variable named **shootingSound** and use the `Class.Instance:FindFirstChild()|FindFirstChild()` method of `toolHandle` to check for the **Activate** sound.

3. Use an **if** statement to check if `shootingSound` exists; if it does, call its **Play** function.

   ```lua
       laserPart.Parent = workspace

       -- Add laser beam to the Debris service to be removed & cleaned up
       Debris:AddItem(laserPart, SHOT_DURATION)

       -- Play the weapon's shooting sound
       local shootingSound = toolHandle:FindFirstChild("Activate")
       if shootingSound then
           shootingSound:Play()
       end
   end
   ```

## Securing Remotes using Validation

If the server isn't checking data from incoming requests, a hacker can abuse remote functions and events and use them to send fake values to the server. It's important to use **server-side validation** to prevent this.

In its current form, the **DamageCharacter** remote event is very vulnerable to attack. Hackers could use this event to damage any player they want in the game without shooting them.

Validation is the process of checking that the values being sent to the server are realistic. In this case, the server will need to:

- Check if the distance between the player and the position hit by the laser is within a certain boundary.
- Raycast between the weapon that fired the laser and the hit position to make sure the shot was possible and didn't go through any walls.

### Client

The client needs to send the server the position hit by the raycast so it can check the distance is realistic.

1. In **ToolController**, navigate to the line where the DamageCharacter remote event is fired in the `fireWeapon` function.

2. Add `hitPosition` as an argument.

   ```lua
       if characterModel then
       local humanoid = characterModel:FindFirstChild("Humanoid")
       if humanoid then
           eventsFolder.DamageCharacter:FireServer(characterModel, hitPosition)
       end
   end
   ```

### Server

The client is now sending an extra parameter through the DamageCharacter remote event, so the **ServerLaserManager** needs to be adjusted to accept it.

1. In the **ServerLaserManager** script, add a `hitPosition` parameter to the `damageCharacter` function.

   ```lua
   function damageCharacter(playerFired, characterToDamage, hitPosition)
       local humanoid = characterToDamage:FindFirstChild("Humanoid")
       if humanoid then
           -- Remove health from character
           humanoid.Health -= LASER_DAMAGE
       end
   end
   ```

2. Below the `getPlayerToolHandle` function, create a function named **isHitValid** with three parameters: `playerFired`, `characterToDamage` and `hitPosition`.

   ```lua
   end

   local function isHitValid(playerFired, characterToDamage, hitPosition)

   end
   ```

The first check will be the distance between the hit position and the character hit.

1. Declare a variable named **MAX_HIT_PROXIMITY** at the top of the script and assign it a value of **10**. This will be the maximum distance allowed between the hit and character. A tolerance is needed because the character may have moved slightly since the client fired the event.

   ```lua
   local ReplicatedStorage = game:GetService("ReplicatedStorage")
   local eventsFolder = ReplicatedStorage.Events
   local LASER_DAMAGE = 10
   local MAX_HIT_PROXIMITY = 10
   ```

2. In the `isHitValid` function, calculate the distance between the character and the hit position. If the distance is larger than `MAX_HIT_PROXIMITY` then return **false**.

   ```lua
   local function isHitValid(playerFired, characterToDamage, hitPosition)
       -- Validate distance between the character hit and the hit position
       local characterHitProximity = (characterToDamage.HumanoidRootPart.Position - hitPosition).Magnitude
       if characterHitProximity > MAX_HIT_PROXIMITY then
           return false
       end
   end
   ```

The second check will involve a raycast between the weapon fired and the hit position. If the raycast returns an object that isn't the character, you can assume the shot wasn't valid since something was blocking the shot.

1. Copy the code below to perform this check. Return **true** at the end of the function: if it reaches the end, all checks have passed.

   ```lua
   local function isHitValid(playerFired, characterToDamage, hitPosition)
       -- Validate distance between the character hit and the hit position
       local characterHitProximity = (characterToDamage.HumanoidRootPart.Position - hitPosition).Magnitude
       if characterHitProximity > 10 then
           return false
       end

       -- Check if shooting through walls
       local toolHandle = getPlayerToolHandle(playerFired)
       if toolHandle then
           local rayLength = (hitPosition - toolHandle.Position).Magnitude
           local rayDirection = (hitPosition - toolHandle.Position).Unit
           local raycastParams = RaycastParams.new()
           raycastParams.FilterDescendantsInstances = {playerFired.Character}
           local rayResult = workspace:Raycast(toolHandle.Position, rayDirection * rayLength, raycastParams)

           -- If an instance was hit that was not the character then ignore the shot
           if rayResult and not rayResult.Instance:IsDescendantOf(characterToDamage) then
               return false
           end
       end

       return true
   end
   ```

2. Declare a variable in the `damageCharacter` function called **validShot**. Assign to it the result of a call to the `isHitValid` function with three arguments: `playerFired`, `characterToDamage` and `hitPosition`.

3. In the below if statement, add an **and** operator to check if `validShot` is **true**.

   ```lua
   function damageCharacter(playerFired, characterToDamage, hitPosition)
       local humanoid = characterToDamage:FindFirstChild("Humanoid")
       local validShot = isHitValid(playerFired, characterToDamage, hitPosition)
       if humanoid and validShot then
           -- Remove health from character
           humanoid.Health -= LASER_DAMAGE
       end
   end
   ```

Now the damageCharacter remote event is more secure and will prevent most players from abusing it. Note that some malicious players will often find ways around validation; keeping remote events secure is a continuous effort.

Your laser blaster is now complete, with a basic hit detection system using raycasting. Try the [Detecting User Input](../../../tutorials/scripting/input-and-camera/detecting-user-input.md) tutorial to find out how you can add a reloading action to your laser blaster, or create a fun game map and try your laser blaster out with other players!

<video controls loop muted>
    <source src="../../../assets/tutorials/hit-detection-with-lasers/Introduction-Video.mp4" />
</video>

## Final Code

### ToolController

```lua
local UserInputService = game:GetService("UserInputService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local LaserRenderer = require(Players.LocalPlayer.PlayerScripts.LaserRenderer)

local tool = script.Parent
local eventsFolder = ReplicatedStorage.Events

local MAX_MOUSE_DISTANCE = 1000
local MAX_LASER_DISTANCE = 500
local FIRE_RATE  = 0.3
local timeOfPreviousShot = 0

-- Check if enough time has passed since previous shot was fired
local function canShootWeapon()
	local currentTime = tick()
	if currentTime - timeOfPreviousShot < FIRE_RATE then
		return false
	end
	return true
end

local function getWorldMousePosition()
	local mouseLocation = UserInputService:GetMouseLocation()

	-- Create a ray from the 2D mouse location
	local screenToWorldRay = workspace.CurrentCamera:ViewportPointToRay(mouseLocation.X, mouseLocation.Y)

	-- The unit direction vector of the ray multiplied by a maximum distance
	local directionVector = screenToWorldRay.Direction * MAX_MOUSE_DISTANCE

	-- Raycast from the roy's origin towards its direction
	local raycastResult = workspace:Raycast(screenToWorldRay.Origin, directionVector)

	if raycastResult then
		-- Return the 3D point of intersection
		return raycastResult.Position
	else
		-- No object was hit so calculate the position at the end of the ray
		return screenToWorldRay.Origin + directionVector
	end
end

local function fireWeapon()
	local mouseLocation = getWorldMousePosition()

	-- Calculate a normalised direction vector and multiply by laser distance
	local targetDirection = (mouseLocation - tool.Handle.Position).Unit

	-- The direction to fire the weapon, multiplied by a maximum distance
	local directionVector = targetDirection * MAX_LASER_DISTANCE

	-- Ignore the player's character to prevent them from damaging themselves
	local weaponRaycastParams = RaycastParams.new()
	weaponRaycastParams.FilterDescendantsInstances = {Players.LocalPlayer.Character}
	local weaponRaycastResult = workspace:Raycast(tool.Handle.Position, directionVector, weaponRaycastParams)

	-- Check if any objects were hit between the start and end position
	local hitPosition
	if weaponRaycastResult then
		hitPosition = weaponRaycastResult.Position

		-- The instance hit will be a child of a character model
		-- If a humanoid is found in the model then it's likely a player's character
		local characterModel = weaponRaycastResult.Instance:FindFirstAncestorOfClass("Model")
		if characterModel then
			local humanoid = characterModel:FindFirstChild("Humanoid")
			if humanoid then
				eventsFolder.DamageCharacter:FireServer(characterModel, hitPosition)
			end
		end
	else
		-- Calculate the end position based on maximum laser distance
		hitPosition = tool.Handle.Position + directionVector
	end

	timeOfPreviousShot = tick()

	eventsFolder.LaserFired:FireServer(hitPosition)
	LaserRenderer.createLaser(tool.Handle, hitPosition)
end

local function toolEquipped()
	tool.Handle.Equip:Play()
end

local function toolActivated()
	if canShootWeapon() then
		fireWeapon()
	end
end

tool.Equipped:Connect(toolEquipped)
tool.Activated:Connect(toolActivated)
```

### LaserRenderer

```lua
local LaserRenderer = {}

local Debris = game:GetService("Debris")

local SHOT_DURATION = 0.15 -- Time that the laser is visible for

-- Create a laser beam from a start position towards an end position
function LaserRenderer.createLaser(toolHandle, endPosition)
	local startPosition = toolHandle.Position

	local laserDistance = (startPosition - endPosition).Magnitude
	local laserCFrame = CFrame.lookAt(startPosition, endPosition) * CFrame.new(0, 0, -laserDistance / 2)

	local laserPart = Instance.new("Part")
	laserPart.Size = Vector3.new(0.2, 0.2, laserDistance)
	laserPart.CFrame  = laserCFrame
	laserPart.Anchored = true
	laserPart.CanCollide = false
	laserPart.Color = Color3.fromRGB(255, 0, 0)
	laserPart.Material = Enum.Material.Neon
	laserPart.Parent = workspace

	-- Add laser beam to the Debris service to be removed & cleaned up
	Debris:AddItem(laserPart, SHOT_DURATION)

	-- Play the weapon's shooting sound
	local shootingSound = toolHandle:FindFirstChild("Activate")
	if shootingSound then
		shootingSound:Play()
	end
end

return LaserRenderer

```

### ServerLaserManager

```lua
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local eventsFolder = ReplicatedStorage.Events
local LASER_DAMAGE = 10
local MAX_HIT_PROXIMITY = 10

-- Find the handle of the tool the player is holding
local function getPlayerToolHandle(player)
	local weapon = player.Character:FindFirstChildOfClass("Tool")
	if weapon then
		return weapon:FindFirstChild("Handle")
	end
end

local function isHitValid(playerFired, characterToDamage, hitPosition)
	-- Validate distance between the character hit and the hit position
	local characterHitProximity = (characterToDamage.HumanoidRootPart.Position - hitPosition).Magnitude
	if characterHitProximity > MAX_HIT_PROXIMITY then
		return false
	end

	-- Check if shooting through walls
	local toolHandle = getPlayerToolHandle(playerFired)
	if toolHandle then
		local rayLength = (hitPosition - toolHandle.Position).Magnitude
		local rayDirection = (hitPosition - toolHandle.Position).Unit
		local raycastParams = RaycastParams.new()
		raycastParams.FilterDescendantsInstances = {playerFired.Character}
		local rayResult = workspace:Raycast(toolHandle.Position, rayDirection * rayLength, raycastParams)

		-- If an instance was hit that was not the character then ignore the shot
		if rayResult and not rayResult.Instance:IsDescendantOf(characterToDamage) then
			return false
		end
	end

	return true
end

-- Notify all clients that a laser has been fired so they can display the laser
local function playerFiredLaser(playerFired, endPosition)
	local toolHandle = getPlayerToolHandle(playerFired)
	if toolHandle then
		eventsFolder.LaserFired:FireAllClients(playerFired, toolHandle, endPosition)
	end
end

function damageCharacter(playerFired, characterToDamage, hitPosition)
	local humanoid = characterToDamage:FindFirstChild("Humanoid")
	local validShot = isHitValid(playerFired, characterToDamage, hitPosition)
	if humanoid and validShot then
		-- Remove health from character
		humanoid.Health -= LASER_DAMAGE
	end
end

-- Connect events to appropriate functions
eventsFolder.DamageCharacter.OnServerEvent:Connect(damageCharacter)
eventsFolder.LaserFired.OnServerEvent:Connect(playerFiredLaser)
```

### ClientLaserManager

```lua
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local LaserRenderer = require(Players.LocalPlayer.PlayerScripts:WaitForChild("LaserRenderer"))

local eventsFolder = ReplicatedStorage.Events

-- Display another player's laser
local function createPlayerLaser(playerWhoShot, toolHandle, endPosition)
	if playerWhoShot ~= Players.LocalPlayer then
		LaserRenderer.createLaser(toolHandle, endPosition)
	end
end

eventsFolder.LaserFired.OnClientEvent:Connect(createPlayerLaser)
```
