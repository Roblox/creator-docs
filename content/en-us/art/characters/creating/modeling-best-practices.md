---
title: Modeling best practices
description: Understand important modeling concepts to prevent major issues before any modeling steps.
next: /art/characters/creating/modeling-tips
prev: /art/characters/creating/blender-configurations
---

Modeling, sometimes known as **sculpting**, is the process of shaping the geometry of your model or mesh. This guide covers important concepts and tips you should review before creating your own unique character shape.

By understanding how to make non-destructive sculpting changes to the head, the character part that contains the most complex components, you can continue to apply these techniques and concepts to other parts of the character model body.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Sculpting.png" />  <figcaption>Starting template model</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Sculpting.png" /><figcaption>Model after custom sculpting</figcaption></figure>
</GridContainer>

<Alert severity = "error">
When editing templates, **don't delete or add vertices to your character body**. This ensures that your character's skinning and facial animation data remains unaltered and fully functional.
</Alert>

## Non-destructive modeling

Non-destructive modeling means using a process that doesn't alter the physical shape or construction of the base mesh object. When modifying a template model, don't use tools or functions that delete or add vertices to your meshes. Instead, use Blender's sculpting tools to alter the shape of your character by **only changing the position of existing vertices**. This ensures that vertices and faces that have skinning or animation data associated with them retain that important character data.

<Alert severity = 'warning'>
Extreme geometric changes, even if the vertices are not deleted, can still adversely affect your rigging and skinning. It's important to choose a starting template file close to your final design and to make consistent and proportional changes when sculpting.
</Alert>

## Edge flow

Edge flow is a common modeling concept of ensuring that the vertices of your model naturally follow the organic curvature of your model's shape. When making changes to your model's topography, you should maintain a natural edge flow by ensuring that your vertices remain a proportionate distance from each other and follow the common muscle groups and contours of your model.

Even when maintaining edge flow, you should avoid sculpting certain regions of the character model. The following are examples of important sections of the face that follow a natural edge flow and should be kept in a similar shape:

<table>
<thead>
  <tr>
    <th>Round head region</th>
    <th>Edge flow notes</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
    <Tabs>
      <TabItem label="Round">
        <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Nasolabial-A.png" />
      </TabItem>
      <TabItem label = "Narrow">
         <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Nasolabial-B.png" />
      </TabItem></Tabs></td>
    <td>**Forehead Wrinkles and Nasolabial Edges**: The edge lines for the forehead wrinkles and nasolabial edges are vital for various expressions involving the mouth, forehead furrowing, eyebrow movement and cheeks. If you modify these sections of your topography, ensure that you retain the original shape whenever possible, and that they maintain a similar relative relationship to each other. </td>
  </tr>
  <tr>
  <td>
    <Tabs>
      <TabItem label="Round">
        <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Mouth-A.png" />
      </TabItem>
      <TabItem label = "Narrow">
         <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Mouth-B.png" />
      </TabItem></Tabs></td>
    <td>**Mouth and Lip Edges**: The topography surrounding the lips and mouth have circular mesh structures for the mouth to open and close. This structure can fold the mesh to shape the lips to naturally visualize *a*, *e*, *i*, *o*, and *u* vowel sounds. The neutral shape is a closed mouth, and the edge flows around the mouth in a continuous line to accurately fold and deform the expected mouth shapes.<br /><br />In this tutorial, we don't recommend modifying this area of the facial topography because of the risk of adversely affecting the underlying tongue, upper and lower jaw, and saved facial data. You can use a sculpting mask to ensure that this area is not affected by any modeling changes.</td>

  </tr>
  <tr>
    <td>
    <Tabs>
      <TabItem label="Round">
        <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Eyes-A.png" />
      </TabItem>
      <TabItem label = "Narrow">
         <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Eyes-B.png" />
      </TabItem></Tabs></td>
    <td>**Eyes**: The eyelids have enough mesh lines on the eyelids to close the eyes. The continuous lines on the eyelids enable the eyelids to deform and fold as expected when blinking or widening. <br /><br />In this tutorial, it isn't recommended to modify this area of the facial topography because of the risk of adversely affecting the underlying eyeball meshes and saved facial data that contribute to accurate expressions. You can use a sculpting mask to ensure that this area is not affected by any modeling changes.</td>
  </tr>

  <tr>
    <td>
    <Tabs>
      <TabItem label="Round">
        <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Eyebrow-A.png" />
      </TabItem>
      <TabItem label = "Narrow">
         <img src="../../../assets/art/avatar/basic-creation/Edge-Flow-Eyebrow-B.png" />
      </TabItem></Tabs></td>
    <td>**Eyelids and Eyebrows**: The eyelids and eyebrows require adequate space between the two regions.<br /><br />If modifying the topography above the eyes, keep in mind that the eyelids and eyebrows require a natural space between the two regions. Both the eyelids and eyebrows can shift and change positions with various facial expressions and, if improperly modeled, can clash into each other during a facial pose.</td>
  </tr>
</tbody>
</table>

Not following edge flow concepts can result in the topology of your model conflicting with each other during animations, sometimes known as crashing.

<center>
<figure><img src="../../../assets/art/avatar/basic-creation/Sculpting-Crash-Example.png" width = "100%"/> <figcaption>In this example, the top of the eyelid and bottom eyelid travel past each other when closing causing jagged artifacts where the vertices collide and crash.</figcaption></figure>
</center>

By carefully sculpting your template mesh, you can avoid having to correct these topology collisions later, which can often require manually correcting rig, skinning, and/or facial animation data.
