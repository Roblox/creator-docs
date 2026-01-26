---
title: Wireframe your layouts
description: Explains how to greybox the laser tag environment using basic parts.
next: /tutorials/curriculums/user-interface-design/implement-designs-in-studio
prev: /tutorials/curriculums/user-interface-design/choose-an-art-style
---

**Wireframing your layouts** is the process of designing the structure and flow of the information you want to communicate through UI in various workflows. This critical step of the tutorial allows you to iterate on the arrangement of your UI elements, discover pain points, and improve the player's experience before you invest time and resources on a problematic design that doesn't work for your experience.

Using the [sample laser tag experience](https://www.roblox.com/games/14817965191/Laser-Tag-1A) `.rbxl` file as a reference, this section of the user interface curriculum shows you how to structure your UI elements on the screen, including guidance on:

- Planning a visual hierarchy for your UI that intuitively leads players to features and information they need to be successful in your experience.
- Blocking in UI elements with basic shapes to review the composition of your UI elements alongside Roblox's core UI and touch controls.
- Developing user flows to account for the necessary actions players to take to achieve their goals.

After you complete this section, you will learn how to construct and configure your UI in Studio that respects your art style and wireframes.

## Plan a visual hierarchy

A visual hierarchy is an organization structure that highlights UI elements by their order of importance. Planning a visual hierarchy for the different workflows in your experience is important because it sets players up for success in accomplishing their goals, which is especially necessary for the rapid gameplay of first-person shooter experiences in which goals change from moment to moment.

Effective visual hierarchies guide players through the features and information they need to meet your gameplay requirements according to where they naturally look on the screen to complete workflows. For example, the visual hierarchy of the sample laser tag experience must guide players through the following categories of UI elements as they navigate the map and tag players on the enemy team:

1. Information about the experience's objective.
2. Information about the blaster.
3. Information about the state of the player.

The location each of these categories have on the screen in the final design highlights their order of importance:

- The first category is near the **top** because it contains UI elements that have the most significance on how to win the game.
- The second category takes up the majority of the screen space near the **middle** because it acts as the focal point to draw players' attention to the action in 3D space, and it has the most significance for playing the game.
- The third category is near the **sides** because players can read this peripheral information without diverting their attention from the gameplay.

<figure>
    <img src="../../../assets/tutorials/user-interface-design/Section2/VisualHierarchy.png" />
</figure>

For some experience genres, you only need to display one category of information at a time because it's the only type of information that's important to the player during that workflow. However, for first-person shooter experiences, players need to see UI elements from multiple categories at the same time because they all provide information that the player needs to be successful, such as their team's score, the cooldown period for their blaster, and if they are tagged out of a round.

When planning a visual hierarchy for the workflows in your own experience, consider the following:

- If you group UI elements from different categories together throughout the screen, players won't know where to look for what they need. To assist players in navigating your experience, **group UI elements from the same category together**.
- If you have too many categories on the screen at one time, players may not know what information they need to pay attention to. To avoid overwhelming players with clutter, **display UI elements contextually for different workflows**.
- Similarly, if there are too many UI elements per category, it can distract players from understanding on how to complete an action or process. For this reason, it's important to **use your art style to provide visual emphasis for your ideal interaction orders**.

For a full review of the visual hierarchy for the sample laser tag experience, see the following table:

   <table>
   <thead>
   <tr>
   <th>Category</th>
   <th>UI Elements</th>
   <th>Visual Hierarchy</th>
   </tr>
   </thead>
   <tbody>
   <tr>
   <td>Information about the experience's objective</td>
   <td><ul><li>Objective prompt</li><li>Team point tracker</li><li>Team indicator</li></ul></td>
   <td><ul><li>Top of the screen</li><li>Top of the screen</li><li>Above each player in the 3D space</li></ul></td>
   </tr>
   <tr>
   <td>Information about the blaster</td>
   <td><ul><li>Blaster selector</li><li>Cross hair</li><li>Hit marker</li><li>Cooldown meter</li><li>Shoot button for mobile devices</li></ul></td>
   <td><ul><li>Middle of the screen</li><li>Middle of the screen</li><li>Within crosshair</li><li>Over the blaster</li><li>Near the player's right thumb</li></ul></td>
   </tr>
   <tr>
   <td>Information about the state of the player</td>
   <td><ul><li>Force field screen when player is joining or rejoining the round</li><li>Respawn screen when player is tagged out</li><li>Indicator when enemy players are tagged out</li></ul></td>
   <td><ul><li>Sides of the screen</li><li>Sides of the screen</li><li>Above each player in the 3D space</li></ul></td>
   </tr>
   </tbody>
   </table>

<Alert severity="info">
   For more information on prioritizing UI elements on the screen, see [UI & UX Design](../../../production/game-design/ui-ux-design.md#prioritization).
</Alert>

## Block in UI elements

Now that you have a visual hierarchy in mind, you can block in individual UI elements using basic shapes to review the composition of your custom UI layout alongside Roblox's core UI on multiple devices. This process allows you to see where you need to modify your design so that it's effective on all screen sizes that players can use to access your experience, such as on mobile, tablet, laptop, and TV screens.

Before you begin, you need to figure out how much screen space is available for your custom UI elements while factoring in Roblox's core UI. For example, by default, Roblox displays the following UI elements in every experience:

   <Grid container spacing={0} alignItems="flex-start">
    <Grid item>
    - A list of players within the experience.
    - The character's health bar.
    - The character's backpack.
    - A chat window.
    - A capture button.
    - A popup menu of character emotes.
   </Grid>
    <Grid item>
   <img src="../../../assets/ui/misc/CoreGui-Elements.jpg" width="550" />
   </Grid>
   </Grid>

You can [disable](../../../players/disable-ui.md) any of these elements that don't meet the gameplay requirements of your own experience in order to save screen space for your custom UI. For example, the sample laser tag experience doesn't require a backpack because players only have the ability to select a single blaster. However, if players could select multiple blasters at once, the experience could disable this core UI to ensure there's always room for the blaster selector when players respawn, then provide another location to select from your inventory.

In addition to Roblox's core UI, you must also consider the necessary screen space for Roblox's default touch controls. For example, when players access your experience using a mobile device, a virtual thumbstick displays in the bottom-left corner of the screen, and a jump button displays in the bottom-right corner of the screen. This ensures that players are always able to navigate your experience, even when they don't have access to a keyboard or controller.

<img src="../../../assets/ui/misc/Touch-Reserved-Zones.png" width="840" />

By taking into account both Roblox's core UI elements that are necessary for the gameplay of your experience, and the possibility of touch controls, you can block in your custom UI elements in **one design** that's adaptive across devices. This is important because it means you don't need to maintain separate versions of your UI as you update your experience.

To demonstrate this method, review the following two images of how the sample laser tag experience blocks in the custom UI elements for both mobile and PC devices. Both images include:

- Basic shapes to represent custom UI because it allows the design to easily go through several iterations before achieving the final design.
- Grayscale coloring that enables the eye to follow information without the distraction of a colorful background environment
- The open state of the chat window and list of active players and chat window to see how much space they take up on the screen.
- Space for mobile controls even if they aren't necessary for PC devices.

When you design your layouts in this way while thinking about how many UI elements can exist on-screen at the same time, you are future-proofing for all potential layouts according to players' devices and workflows.

<Tabs>
  <TabItem key = "1" label="Mobile">

<img src="../../../assets/tutorials/user-interface-design/Section2/MobileBlockIn.png" />

  </TabItem>
  <TabItem key = "2" label="PC">

<img src="../../../assets/tutorials/user-interface-design/Section2/PCBlockIn.png" />

  </TabItem>
</Tabs>

When blocking in UI elements for your layouts, consider the following:

- Where and how you block in your UI can impact the composition of your layouts. **Aim for balance and symmetry** in the amount and size of your custom UI elements alongside Roblox's core UI.
- Interacting with UI that are far from the bottom corners of some mobile and tablet devices is either uncomfortable or impossible. **Place interactive elements in easy-to-reach zones** near the natural resting position for thumbs.
- When players navigate through your environment, the 3D space can become distracting from your on-screen UI. **Test your layouts against a variety of possible backgrounds** to ensure your on-screen UI elements remain clear and legible.

## Develop user flows

A user flow is a collection of paths that players can take in an experience to complete a task, such as to choose a weapon, purchase an item, or heal a character. User flows typically start where you expect players to begin the task, and finish with the final action or achievement players reach at the end of the task. In addition, effective user flows also account for unusual paths players may want to take on their own to achieve the same goal.

The following flow chart displays the user flow of a player entering and playing the sample laser tag experience. When a player opens the experience, they join a lobby. If the round isn't yet in progress, they wait until the round loop starts, otherwise they join a team that's currently playing the game. If the end condition hasn't been met, such as hitting a time limit or tagging out 10 players per team, then players select their blaster and experience the main gameplay of tagging or getting tagged by the enemy team, equipping a new blaster within the arena, or respawning after they get tagged out. Once players meet the end condition, they finish the round and join the lobby again.

<figure>
    <img src="../../../assets/tutorials/user-interface-design/Section2/UserFlowChart.jpg" />
</figure>

It's important to develop user flows for everything players can do in your experience because it allows you to assess where and how you want them to complete tasks, and anticipate where you can alleviate the pain points for anyone who follows their own path. For example, if you were to develop additional user flows for the sample laser tag experience, what happens when players:

- Quit a round before the end condition is met?
- Leave the experience while joining a team?
- Receive a phone call in the middle of a round?
- Lose their connection to the round for less than 15 seconds?

By visualizing all potential actions players can take or scenarios that can happen to players while completing tasks, you can better determine how the layout of your UI elements negatively impacts their experience, then make adjustments before implementing your designs in Studio. If tasks feel intuitive, unobtrusive, and convenient, players are more likely to spend time in your experience, and return at a later date.

When developing user flows for your own experience, consider the following:

- What you want players to do in your experience and what they want to do may be completely different. It's best to **test your layouts with multiple types of players** to get an understanding of the paths they want to take to achieve their goals.
- Flow charts can become difficult to read and ineffective if they try to capture multiple scenarios at once within the diagram. To focus your attention on each task, **limit flow charts to one primary task at a time**.
- Interaction patterns vary depending on if players are using touch controls, gamepads, or computer mice to interact with your experience. If you're designing for multiple devices, **develop unique user flows for each device** so you can identify pain points and simplify workflows.

After you finalize the design of your wireframes, it's time to move into Studio and make your UI come to life.
