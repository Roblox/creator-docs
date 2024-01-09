---
title: Implementing Teams
description: The Teams service allows you assign users to different teams within your experience.
---

You can divide users in your experience to multiple teams using the `Class.Teams` service to support your experience needs. By enabling the `Class.Teams` service, it automatically updates the color of the name above each user character `Class.Model` to differentiate members that belong to different teams, and the default user list displays users based on their teams.

## Configuring Teams

By default, your **Explorer** hierarchy includes the `Class.Teams` service. If you don't find it or accidentally deleted it, you can still add it to your experience through the following steps:

1. In the **Model** tab, click the **Service** icon in the **Advanced** section to display a list of services.

   <img src="../assets/studio/general/Model-Tab-Advanced-Options.png" width="740" alt="Advanced options indicated in Model tab" />

2. From the **Insert Service** window, select **Teams** and click the **Insert** button.

3. You can now find the **Teams** folder in the **Explorer** hierarchy.

   <img src="../assets/players/teams/Explorer-Teams-Object.png" width="320" />

## Adding Teams

With the `Class.Teams` service present, you can create a new team through the following steps:

1. Hover over the **Teams** object and click the **&CirclePlus;** icon to show a list of objects.

2. Select **Team** to insert a new `Class.Team` object under the **Teams** service.

   <img src="../assets/players/teams/New-Team-Object.png" width="320" />

You can now select the new `Class.Team` object and, in the **Properties** window, change the team **Name** or assign a unique **TeamColor**. A team's name and color both appear in the experience's player list.

<GridContainer numColumns="2">
  <img src="../assets/players/teams/Change-Team-Name.png" />
  <img src="../assets/players/teams/Set-TeamColor.png" />
</GridContainer>

## Assigning Users to Teams

By default, Roblox **auto-assigns** new users joining the experience to the team with the fewest members, and you can still use the following steps to assign users to a specific team:

1. Select each `Class.Team` object in the `Class.Teams` service to display its **Properties** window.

2. Uncheck the **AutoAssignable** checkbox in the **Properties** window.

   <img src="../assets/players/teams/Disable-Team-AutoAssignable.png" width="320" />

3. Assign a user to a specific team by changing their `Class.Player.Team` property to the team name in the format of `Teams[name of the team]`, such as `Teams["Blue Team"]`.

## Spawning Teams

You can use `Class.SpawnLocation` objects to spawn users of different teams at specific locations when they join or respawn. By default, `Class.SpawnLocation|SpawnLocations` are **neutral** and any user can spawn upon them, so you need to lock each one to the team that can occupy it using the following steps:

1. In the **Model** tab, click the **Spawn** button to insert a `Class.SpawnLocation`.

   <img src="../assets/players/teams/Model-Tab-Spawn.png" width="500" />

2. With the new `Class.SpawnLocation` selected, uncheck the **Neutral** checkbox in the **Properties** window.

3. Set the **TeamColor** property of selected `Class.SpawnLocation` to the **team color** of an existing team that you want to assign to the spawn. For example, if the intended team's `Class.Team.TeamColor` is **Teal**, set the spawn's `Class.SpawnLocation.TeamColor` to the same.

   <img src="../assets/players/teams/Set-TeamColor.png" width="320" />

<Alert severity="warning">
The `Class.SpawnLocation.TeamColor` property is different from the `Class.SpawnLocation.BrickColor` and `Class.SpawnLocation.Color` properties which represent the visual color of the spawn object and are not related to team functionality.
</Alert>
