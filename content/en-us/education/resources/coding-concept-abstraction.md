---
title: Coding concept - Abstraction
description: Learn high level coding concepts, such as abstractions and functions.
comments: Add links.
---

<table>
<tr>
  <td>
**Learning Objectives**
  </td>
  <td>
Students will be able to:

    - Define what an abstraction is

    - Articulate how abstractions are helpful

  </td>
</tr>
<tr>
  <td>
**Prerequisites**
  </td>
  <td>
Students should:

    - (see Create and Use Functions)

    - (see Returning Values from Functions)

  </td>
</tr>
</table>

**Abstractions** in computer science provide a simplified representation of something larger. They pull out only the most necessary information and hide everything else.

**Functions** are reusable abstractions. When called, users get the benefits of the function without having to rewrite or even look at the code for the entire function.

A common example in coding languages is `print()`. Most of its code is hidden, so the coder can focus on what needs to be printed and not the rest of the code.

## Why create abstractions

Abstractions keeps programs organized, reduces complexity, and makes code easier to update.

### Shop example

Say that you have an in-game shop that sells just two different backpacks. The code for the second backpack was copied with slight changes, such as a different name and selling price.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/education/coding-6/coding-concept-abstraction/backpack-yellow.png" />
    <figcaption>Yellow Backpack - 10 Robux</figcaption>
  </figure>
  <figure>
    <img src="../../assets/education/coding-6/coding-concept-abstraction/backpack-violet.png" />
    <figcaption>Violet Backpack - 25 Robux</figcaption>
  </figure>
</GridContainer>

Here, the code is **not** abstracted. Each backpack has a script of its own. What would happen if you tried to add the following?

- 20 more backpacks.

- The ability for some bags to hold more items than other bags.

- A holiday sale, 25% off all backpacks.

## Design abstractions

Having separate backpack scripts makes adding and updating backpacks time consuming. Instead, create an abstraction so you don't have to make updates in so many different places.

To design an abstraction decide:

- Which parts of the code will be reused.

- What elements will be different each time.

The abstraction should pull out the information that changes, and hide the rest. In the backpack example, the differences are the backpack's name, price, and number of items it can carry. So an example of an abstraction, you can design is a function that takes in the backpack's name and returns it's price and capacity.

<table>
<tr>
  <td>
<img src="../../assets/education/coding-6/coding-concept-abstraction/no-abstraction-backpacks.png" width="100%" />
  </td>
  <td>
<img src="../../assets/education/coding-6/coding-concept-abstraction/abstraction-backpacks.png" width="100%" />
  </td>
</tr>
<tr>
  <td>
**No Abstraction**
  </td>
  <td>
**Abstraction**
  </td>
</tr>
<tr>
  <td>
Four different backpacks, four different places to update.
  </td>
  <td>
Use a function to search a table for unique information. Only one place to update.
  </td>
</tr>
</table>

<Alert severity="info">
<AlertTitle>Check for Understanding - Using Abstractions</AlertTitle>
What are other game mechanics you can create abstractions for?

Possible Examples

- Trap parts - Allowing for different harm values
- Creating a function for awarding random power-ups
- Creating character classes

</Alert>

## Conclusion

**Abstractions** provide a simplified representation of something larger by leaving out details. When deciding whether to create an abstraction, look for code that is often reused but with small changes each time. For example, a generic item like a backpack can be abstracted to a reusable function that looks up price and capacity.

Taking time to plan and structure code with abstractions helps coders focus on what's important. This investment in time keeps programs better organized and makes updating them easier.

<Alert severity="info">
<AlertTitle>Examples of Abstractions in Roblox Studio Templates</AlertTitle>
Galactic Speedway - The Settings script has only the variables for unique features of the driftspeeder. The rest of the code is hidden. This allows students new to coding to stay focused without getting lost.

Story Game Creator Challenge - Students call `getInput()` from the StoryMaker module script to create questions for players to answer. Students can practice typing strings and ask as many questions as they like, but don't need to see the code in the StoryMaker module.

</Alert>
