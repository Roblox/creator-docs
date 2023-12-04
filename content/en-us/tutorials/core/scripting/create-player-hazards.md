---
title: Create Player Hazards
description: Explains how to create player hazards by modifying player behavior and creating a player life cycle.
next: /tutorials/core/scripting/script-an-upgrade-button
prev: /tutorials/core/scripting/record-and-display-player-data
---

<iframe width="880" height="495"
src="https://www.youtube-nocookie.com/embed/vlzZm3PQGfQ"
title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen></iframe>

<br/>

Hazard objects decrease the health of players when they touch them. As a simple
starting point, this section of the tutorial teaches you how to create one large
invisible part at the same level as the water in your experience, so that falling
into the hazard changes the player's health to zero and respawns them back to the
start of the experience.

## Create a Basic Water Hazard

To create the basic water hazard:

1. In the **Explorer** window, add a new folder into the **World** folder, then rename it **Hazards**.
   Ensure that the name is spelled correctly with the correct casing, otherwise the code won't work.

1. In the **Hazards** folder, insert a **block** part and rename it **Hazard**.

   <img
   src="../../../assets/tutorials/create-player-hazards/New-Hazard-Part.png"
   width="320" />

1. Move and scale the part to cover the water line around the island and platforms. For example, the
   sample [Island Jump - Scripting](https://www.roblox.com/games/14239042199/Island-Jump-Scripting) experience
   sets **Size** to **825, 1, 576** and **CFrame.Position** to **174, -6.5, 38**.

   <img
      src="../../../assets/tutorials/create-player-hazards/Hazard-Part-On-Water.jpg"
      width="600" />

1. Select the part, then in the **Properties** window, configure the following properties so
   the hazard is invisible, and players can pass right through it:

   - Set **Transparency** to **1**. This makes the hazard invisible, so that the
     actual water appears to be the hazard.
   - Disable **CanCollide**. This tells the engine that other parts can pass
     through the hazard uninterrupted, meaning players can fall through the hazard.
   - Enable **Anchored**. This tells the engine to never change the
     position of the hazard due to any physics-related simulation, meaning that
     players can touch the hazard without affecting its location.

1. Create a **Script** in **ServerScriptService**, then rename it to **HazardService**.
1. Replace the default code with the following code:

   ```lua
   local Players = game:GetService("Players")
   local Workspace = game:GetService("Workspace")

   local hazardsFolder = Workspace.World.Hazards
   local hazards = hazardsFolder:GetChildren()

   local function onHazardTouched(otherPart)
     local character = otherPart.Parent
     local player = Players:GetPlayerFromCharacter(character)
     if player and character.Humanoid then
       character.Humanoid.Health = 0
     end
   end

   for _, hazard in hazards do
     hazard.Touched:Connect(onHazardTouched)
   end
   ```

    <BaseAccordion>
    <AccordionSummary>
      <Typography variant="h4">Code Explanation</Typography>
    </AccordionSummary>
    <AccordionDetails>
      The **HazardService** has many similarities to **CoinService**. However,
      instead of collecting a coin, the player has their **health set to 0**
      when they touch a hazard.

   Feel free to modify, add, or remove hazard objects in your experience to
   create unique obstacles. As long as they are contained in the **Hazards**
   folder, the code loop connects the event handler to all of your hazards.
   </AccordionDetails>
   </BaseAccordion>

## Connect to the Player Lifecycle

The player lifecycle represents events that occur when players interact in your
experience, such as joining, leaving, or respawning. You need to connect
handlers to these events to appropriately execute logic for each major lifecycle
event. In the **CoinService** script, copy and paste the following code at the
bottom of the script:

```lua
local function onPlayerAdded(player)
  -- Reset player coins to 0
  updatePlayerCoins(player, function(_)
    return 0
  end)

  player.CharacterAdded:Connect(function(character)
    -- WaitForChild would stop the player loop, so below should be done in a separate thread
    task.spawn(function()
      -- When a player dies
      character:WaitForChild("Humanoid").Died:Connect(function()
        -- Reset player coins to 0
        updatePlayerCoins(player, function(_)
          return 0
        end)
      end)
    end)
  end)
end

-- Initialize any players added before connecting to PlayerAdded event
for _, player in Players:GetPlayers() do
  onPlayerAdded(player)
end

local function onPlayerRemoved(player)
  updatePlayerCoins(player, function(_)
    return nil
  end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoved)
```

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Code Explanation</Typography>
</AccordionSummary>
<AccordionDetails>

The code defines functions to reset coin counts during the appropriate
lifecycle events:

- `Class.Player.PlayerAdded` fires when a player joins the experience, and sets
  the coin count to **0**.
- `Class.Player.CharacterAdded` fires when a player's character model is added
  to the world. It occurs after `Class.Player.PlayerAdded|PlayerAdded` and
  whenever the player respawns.
- `Class.Humanoid.Died` fires when a player dies, and sets
  the coin count to **0**. `Library.task.spawn()` creates
  a separate thread for handling this, so other aspects of the player life cycle
  can execute.
- `Class.Player.PlayerRemoved` fires when a player leaves the experience to
  clean up player state.
- This code contains a potential issue where players could collect coins before the `Players.PlayerAdded` event executes and then have their coin counts reset to zero. To mitigate this issue, consider solutions such as code scheduling or freezing the player's character until initialization finishes. However, these solutions involve more complex scripting concepts that are beyond the scope of this tutorial.

</AccordionDetails>
</BaseAccordion>

## Playtest

It's time to see if the player hazard works as intended. When you touch the
water, your character should die and lose their coins. To test your game:

1. In the menu bar, click the **Play** button. Studio enters playtest mode.

   <img src="../../../assets/studio/general/Quick-Access-Toolbar-Play.png"
   width="800" />

1. Move your character to collect some coins, then jump in the water. If your
   scripts are working correctly, your character dies, and the coin count on
   the leaderboard resets to **0**.

   <video
   controls loop muted>
   <source src="../../../assets/tutorials/create-player-hazards/player-hazards-example.mp4" />
   </video>
