---
title: Coding Concept - Algorithms
description: Learn about algorithms and creating your own practical applications.
---

## Algorithms in Real Life and In Code

An **algorithm** uses a series of steps to determine an outcome. Steps can be a set of directions, comparisons, or even a mathematical formula.

Your daily life is full of algorithms that you use without thinking about it. They help you make decisions, create things, and solve problems.

**Real life examples:**

- Checking if you have enough money to buy a snack.
- Getting dressed in the morning.
- Drawing stick figures.

**Coding examples:**

- Checking if a skill level is high enough to use an item.
- Sorting a list of items into alphabetical order.
- A player standing on lava loses 5 health every second. If they reach 0, they respawn.

<Alert severity="success">
<AlertTitle>Offline Activity: Stick Figure Algorithms</AlertTitle>
Stick figures are something that everyone knows how to draw, but rarely think about. This is because we all have an internal stick figure algorithm.

- Have everyone draw a stick figure.
- Have everyone write down the steps they took.
- Pair up students and have one student direct the second student using the directions they wrote down previously.

</Alert>

## Creating Algorithms in Code

In real life, we don't usually think about the algorithms we use everyday. Computers however, need algorithms to be coded step-by-step and use at least one of three methods to solve a problem or produce an outcome.

<table>
<thead>
   <tr>
    <th width="50%">Methodology</th>
    <th width="50%">Example</th>
   </tr>
</thead>
<tbody>
   <tr>
    <td>**Selection** - Uses conditional statements such as if/then to determine an output.</td>
    <td>
    ```lua
    if time == 0 then
      stopLightColor = red
    end
    ```
    </td>
  </tr>
  <tr>
    <td>
      **Sequencing** - A set of precise steps.
    </td>
    <td>
    ```lua
    local function createBridge()
      create new block
      size block
      set color
      rotate
      set location
      parent to workspace
    end
    ```
    </td>
  </tr>
  <tr>
    <td>
      **Iteration** - Repeats parts of the code as necessary, such as in for loops or multiplication.
    </td>
    <td>
    ```lua
    for countDown = 10, 1, -1 do
      time -= 1
      task.wait(1)
    end
    ```
    </td>
  </tr>
</tbody>
</table>

## Combining Algorithms

Much like larger problems can be broken into smaller problems, some algorithms can be broken down into a series of smaller algorithms.

<img src="../../assets/education/coding-6/coding-concept-algorithms/square-and-child-squares.png" width="50%" />

Think of your real-life morning time algorithm to get dressed. If that's your main algorithm, it might use one algorithm for picking out your clothes, and a second algorithm for putting clothes on.

```lua title='Getting Dressed Pseudocode'
-- First algorithm for picking clothes
local function pickClothes()
    pick top clothing
    pick bottom clothing
    pick Socks
    pick Shoes
end

-- Second algorithm for putting clothes on

local function putOnClothes()
    put on top clothing
    put on bottom clothing
    put on socks
    put on shoes
end

-- Main algorithm, calls pickClothes()and putOnClothes()
local function getDressed()
    pickClothes()
    putOnClothes()
end
```

<Alert severity="success">
<AlertTitle>Challenge - Divide pickClothes() Into Additional Algorithms</AlertTitle>
What are additional algorithms pickClothes() might use?

- Check the weather.
- Check if clothes are clean.
- Check if clothes match.

</Alert>

<Alert severity="info">
<AlertTitle>Discussion - Algorithms for Game Mechanics</AlertTitle>
What additional algorithms might be used by the main algorithm of the following game mechanics?

- A timed bridge.
- A shop that sells items.
- An item that gives a random powerup.

</Alert>

## Summary

**Algorithms** are predefined steps that provide an outcome. In daily life, algorithms solve problems like getting dressed, going to work, or making a cake. In code, algorithms solve problems like managing websites, handling traffic congestion, or running game mechanics. To complete their goal, algorithms will often call on other algorithms.

Algorithms use three different ways to come to a conclusion; **selection**, **iteration**, and **sequencing**. Selection uses conditionals such as if/then statements. Iteration repeats parts of the code as necessary. Sequencing uses a series of steps to produce a result.
