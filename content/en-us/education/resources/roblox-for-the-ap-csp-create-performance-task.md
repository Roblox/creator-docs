---
title: Roblox for the AP CSP Create Performance Task
description: Recommendations on how to incorporate Roblox Studio and Luau into a classroom for use in the AP CSP Create Performance Task
duration:
thumbnail: None
group: Education
tags:
---

Roblox Studio's collaborative nature and ease of prototyping makes it a great option to use with the <a href="https://apcentral.collegeboard.org/courses/ap-computer-science-principles/exam?course=ap-computer-science-principles" target = "_blank">AP CSP Create Performance Task.</a> Some of the benefits include:

- Free, easy to download software.
- Built-in features allowing real-time collaboration.
- Ability to innovate and express oneself using the scripting language, Luau.

## Roblox for computer science

### Code with Luau

Luau is excellent as a first coding language, or for those ready for a new challenge after visual languages such as MIT Scratch. Luau is a typed syntax language. It's similar to Python, but without white space concerns. This means your students' code won't break if they forget to indent a block of code or add a semicolon.

With Luau, students can focus more on computer science concepts than excessive troubleshooting.

### Recommendations

Before starting a classroom using Roblox, we do have some recommendations.

As students have only limited time to create their program, it's recommended that students have used Roblox Studio throughout the semester, or have previous experience with Luau or Lua.

For Luau coding principles that you can adapt to the classroom, check our <a href="../../tutorials/fundamentals/coding-1/landing.md">Coding Fundamentals</a> series. Students can then practice coding by going through our guided projects such as the <a href="../adventure-game-series/landing.md">Adventure Game</a>.

### Collaboration

Roblox Studio is built with [collaboration](../../projects/collaboration.md) in mind, making it an ideal choice for students studying for the AP test independently or online. Additionally, students can work simultaneously in the <a href="https://www.youtube.com/watch?v=6wuZJTiwCtM&feature=emb_logo" target="_blank" rel="noopener">same script</a>, or dedicate scripts to specific tasks, making it easy to track a student's individual contributions.

### Types of student projects

Some examples of abstractions and algorithms students can incorporate within a 6 - 8 hour timeframe are:

- Setting up a shop to buy and sell items.
- Creating and updating custom leaderboards.
- Making changes to player properties such as health, speed, and size.
- Incorporating timers to get past obstacles or to create round-based games.
- Creating branching stories.

## The AP CSP Create Performance Task

Students are required to submit the following for the Create Performance Task:

- A one minute video of the program running.
- Individual written responses about the program and their development process.
- The program's code.

For more information, refer to the <a href = "https://apcentral.collegeboard.org/pdf/ap-csp-student-task-directions.pdf?course=ap-computer-science-principles" target = "_blank">AP CSP Exam Sheet </a> for precise details.

### Example Roblox idea

For the written submission, students will need to identify an algorithm in their project that incorporates two smaller algorithms. They will also need to call out an abstraction. Students are allowed to reuse an algorithm for an abstraction so long as they describe how it's an abstraction, rather than repeating their previous answer.

### Project example

**Program Purpose:** Players collect coins in a game and then use the coins to buy items.

**Main algorithm:** `buyItem(itemToBuy)` - Allows players to buy items. When players select an item to purchase, it first checks if the player has enough coins. If so, it subtracts the cost of the desired items from their total coins and updates the player's coins on the leaderboard.

**Sub algorithm 1:** `verifyPurchase()` Check the player's coins. If greater than or equal to the cost of the desired item, display the purchase confirmation screen. If the value of the player's coins is less than the cost of the item, display a screen with the text: "Sorry, you don't have enough coins".

**Sub algorithm 2:** `purchaseItem()` Get the player's current amount of coins. Subtract the cost of the item from the player's coins. Then, update the player's current coins displayed on the leaderboard.

**Potential Abstraction:** Rather than creating an individual function for the sale of each type of item, `buyItem()` has a parameter for the item being bought, `itemToBuy`. The item cost is found using `getCost()`, which returns a value from a dictionary of items and how much they cost. That cost is then used in `verifyPurchase()` and `purchaseItem()`.

### Recommended task milestones

Plan on spending **at least two hours** preparing students for the PT Create Task, and then a minimum of 12 hours of class time to complete and submit a program along with written and video responses.

This recommended schedule gives students approximately 6 or 7 hours for completing the code, with additional time to prepare and upload responses.

<table width="75%" cellpadding="18">
  <thead>
    <tr>
      <th scope="col">ApproximateTimeline     </th>
      <th scope="col">Objective</th>
    </tr>
 </thead>

 <tbody>
  <tr>
    <th scope="row">PT Prep 1 </th>
    <td> Introduce Create PT. </td>
  </tr>

  <tr>
      <th scope="row">PT Prep 2 </th>
      <td>Brainstorm ideas for core and sub algorithms.</td>
  </tr>

   <tr>
      <th scope="row">Hour 1 </th>
      <td>Begin class with a defined core algorithm. Break down the problem and begin coding solutions. Document any issues or problem points that arise, as well as their solutions.</td>
  </tr>

<tr>
      <th scope="row">Hour 2 </th>
      <td>Have a working prototype. Be able to articulate algorithms and abstractions used. Make changes to goals as necessary if a task is proving too difficult.</td>
    </tr>

<tr>
      <th scope="row">Hours 3 - 4 </th>
      <td>Identify what specific abstraction will be featured in the submission video. Continue keeping development notes, particularly of any iterations that the project goes through. </td>
    </tr>

<tr>
      <th scope="row">Hours 5 - 7</th>
      <td>Complete main project. </td>
    </tr>

<tr>
      <th scope="row">Hour 8</th>
      <td>Record video response to question 2A. </td>
    </tr>
<tr>
      <th scope="row">Hours 9 - 10</th>
      <td>Complete written responses. </td>
</tr>
<tr>
      <th scope="row">Hours 11 - 12</th>
      <td>Submit program code and written responses. </td>
    </tr>

  </tbody>
</table>

### Video requirements

The video should be of running code and demonstrate the purpose of the overall program as well as at least one significant feature. All videos must be under one minute and not exceed 30 MB.
For an example of an exemplary video response, with scoring notes see <a href="https://apcentral.collegeboard.org/courses/ap-computer-science-principles/classroom-resources/create-applications-ideas-sample-response-a" target= "_blank"> AP Central: Sample Response A. </a>

For complete requirements see the <a href ="https://apstudents.collegeboard.org/ap/2019-07/digital-portfolio-student-user-guide-apcsp.pdf" target = "_blank">Digital Portfolio Student User Guide.</a>

### Prep for the PT

Plan on spending one class session introducing the project and showing examples of graded projects. Use a second session to plan the project.

Below are resources to help you structure your prep for the PT Create.

<ul>
<li><b>Code.org</b></li>
<ul>
<li><a href="https://curriculum.code.org/csp-19/csp-create/1/" target="_blank" rel="noopener">Lesson 1: Create PT - Review the Task</a> </li>
<li><a href="https://curriculum.code.org/csp-19/csp-create/2/" target="_blank" rel="noopener">Lesson 2:  Create PT - Make a Plan</a></li>
<li><a href="https://docs.google.com/document/d/1ZVzF_-cON8pjDVUOZjVk32y4flCMXugcrA6gFeWDHzE/preview#heading=h.rgibzjtvyu24" target="_blank" rel="noopener">CS Principles Curriculum Guide</a></li>
<li><a href="https://studio.code.org/s/csp-create-2018/stage/2/puzzle/1?viewAs=Teacher" target="_blank" rel="noopener">Student Survival Guide</a> You'll need a code.org account to download this.</li>
</ul>
</ul>

<ul>
<li><b>AP Central - AP CSP</b></li>
<ul>
<li> <a href="https://apcentral.collegeboard.org/pdf/ap-csp-student-task-directions.pdf?course=ap-computer-science-principles" target="_blank" rel="noopener">Assessment Overview and Performance Task Directions for Students</a></li>
<li><a href="https://apstudents.collegeboard.org/ap/2019-07/digital-portfolio-student-user-guide-apcsp.pdf" target="_blank" rel="noopener">Digital Portfolio Student User Guide </a></li>
</ul>
</ul>

<ul>
<li><b>Khan Academy</b></li>
<ul>
<li><a href="https://www.khanacademy.org/computing/ap-computer-science-principles/ap-csp-exam-preparation/prepare-for-the-2019-ap-cs-p-exam/a/ap-cs-p-exam-format" target="blank"> AP CSP Exam Overview </a></li>
</ul>
</ul>

## Roblox specific tips

### Keep visuals and 3D worlds simple

When creating games, students can get invested in decorating or customizing their world. Help them keep in mind that they only have a limited time, and encourage them to use basic block shapes and colors to plan out their game.

### Plan out needed scripts

As part of the planning session, have students write down what scripts they will need, where that script will be located, and that script's function. Make sure that students can identify at least one function that simplifies their code. Usually these functions will have parameters that allow them to take in different values, or will be called from multiple places. Student code should be logical, not created through trial and error or hacked together.

Below are some questions to help students reflect:

- What function is responsible for the main algorithm in the game?
- What are two smaller algorithms needed to run the main algorithm?
- What assets, such as art or sounds, are needed to make the program function as intended? What tasks and behaviors need to be coded?
- If you become low on time, what features can be cut?

### Avoid using toolbox assets

The Toolbox is a part of Roblox Studio that includes prebuilt assets, like 3D models. While these can often save students time in building, they often already include scripts that may have unwanted functionality or conflict with the student's code. If students are not diligent about removing all scripts included with prepackaged assets, it can result in time wasted while debugging later.
