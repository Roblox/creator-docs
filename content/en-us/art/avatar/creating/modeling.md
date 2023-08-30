---
title: Modeling
comments:
description: Use Blender to sculpt a template character model to create a unique avatar.
next: /art/avatar/creating/texturing
previous: /art/avatar/creating/
---

Modeling, sometimes known as **sculpting**, is the process of shaping the geometry of your model or mesh. This guide covers important concepts and tips you should review before creating your own unique character shape.

By understanding how to make non-destructive sculpting changes to the head, the character part that contains the most complex components, you can continue to apply these techniques and concepts to other parts of the character model body.

<GridContainer numColumns="2">
  <figure><img src="../../../assets/art/avatar/basic-creation/Pre-Sculpting.png" />  <figcaption>Starting template model</figcaption></figure>

  <figure><img src="../../../assets/art/avatar/basic-creation/Post-Sculpting.png" /><figcaption>Model after custom sculpting</figcaption></figure>
</GridContainer>

<Alert severity = "error">
When editing templates, **don't delete or add vertices to your character body**. This ensures that your character's skinning and facial animation data remains unaltered and fully functional. See [Best Practices](#best-practices) for additional information on customizing your character body without breaking the underlying structure of the avatar template.
</Alert>

## Best Practices

When modeling an existing avatar template, it's important to understand several basic concepts and processes to efficiently make safe mesh alterations.

### Non-Destructive Modeling

Non-destructive modeling means using a process that doesn't alter the physical shape or construction of the base mesh object. When modifying a template model, don't use tools or functions that delete or add vertices to your meshes. Instead, use Blender's sculpting tools to alter the shape of your character by **only changing the position of existing vertices**. This ensures that vertices and faces that have skinning or animation data associated with them retain that important character data.

<Alert severity = 'warning'>
Extreme geometric changes, even if the vertices are not deleted, can still adversely affect your rigging and skinning. It's important to choose a starting template file close to your final design and to make consistent and proportional changes when sculpting.
</Alert>

### Edge Flow

Edge flow is a common modeling concept of ensuring that the vertices of your model naturally follow the organic curvature of your model's shape. When making changes to your model's topography, you should maintain a natural edge flow by ensuring that your vertices remain a proportionate distance from each other and follow the common muscle groups and contours of your model.

Even when maintaining edge flow, you should avoid sculpting certain regions of the character model. The following are examples of important sections of the face that follow a natural edge flow and should be kept in a similar shape:

<table>
<thead>
  <tr>
    <th>Round Head Region</th>
    <th>Edge Flow Notes</th>
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

<GridContainer numColumns="2">
<figure><img src="../../../assets/art/avatar/basic-creation/Sculpting-Crash-Example.png" width = "100%"/> <figcaption>In this example, the top of the eyelid and bottom eyelid travel past each other when closing causing jagged artifacts where the vertices collide and crash.</figcaption></figure>
<figure></figure>
</GridContainer>

By carefully sculpting your template mesh, you can avoid having to correct these topology collisions later, which can often require manually correcting rig, skinning, and/or facial animation data.

## Blender Tips

When using Blender, there are various time saving configurations and tips you can follow to visualize and configure objects efficiently in your project.

### Hiding Inactive Objects

In your Outliner, hide objects you aren't editing by enabling the **Hide In Viewport** icon <img src="../../../assets/art/blender-ui/Visibility-Icon.png" style={{marginBottom:"0px;"}}/>. This cleans up your workspace and helps ensure you don't make unintentional changes to another object or collection.

You can quickly bulk hide and unhide any parent and child objects that are not [disabled](../../../art/avatar/creating/index.md#disabled-objects). To bulk hide objects:

1. In the Outliner, navigate to a parent object, such as **Cage** or **Joints**.
2. Hold <kbd>Shift</kbd> and click the **Hide In Viewport** icon <img src="../../../assets/art/blender-ui/Visibility-Icon.png" style={{marginBottom:"0px;"}}/> to toggle the object's visibility.

### Enable Wireframe View

Whenever you use a modeling application, switch between different viewport options, like X-Ray and Wireframe, to gain a better perspective on your vertices and shapes. This tutorial uses a wireframe view over the mesh shape, and many examples use various material settings and viewport options.

Enable wireframes on your material view by setting the following:

1. Select the **Head_Geo**.
2. In the side Properties panel, navigate to **Object Properties** <img src="../../../assets/art/blender-ui/Object-Select-Icon.png" style={{marginBottom:"0px;"}}/>.
3. In Viewport Display, enable **Wireframe**.

## Sculpting The Head

After reviewing the modeling best-practices, begin sculpting your character. This tutorial demonstrates sculpting changes to the [RoundMale template](../../../assets/art/reference-files/RoundMale.zip), creating a goblin-like character.

The sculpting instructions utilize the following Sculpting tools:

- **Grab** - Selects and pulls a group of vertices.
- **Smooth** - Eliminates irregularities in the area of the brush's influence.
- **Flatten** - Averages out the vertices within the brush's influence on a common plane.
- **Elastic Deform** - Similar to Grab, but adds an organic stretch and elasticity to the neighboring vertices.

<Alert severity='info'>
You can use Blender's other sculpting tools, though it's important to use a tool that aligns with the [Non-Destructive Modeling](#non-destructive-modeling) concepts to preserve the vertices of the model.
</Alert>

To begin sculpting the head:

1. With the template project opened, hide the other Geo objects to isolate the head mesh.
2. Select the **Head_Geo** mesh object and switch to **Sculpting** mode.
3. At the top right of the viewport, set the following options:
   1. Enable **X-Axis Symmetry**.
   2. Enable **Wireframe** view.
      <video controls src="../../../assets/art/avatar/basic-creation/Sculpting_01.mp4" width="100%"></video>
4. Using the **Mask** tool, paint over the mouth and eyes where you do not want to sculpt unexpectedly.
   <video controls muted src="../../../assets/art/avatar/basic-creation/Sculpting_02.mp4" width="100%"></video>
5. With the **Grab** and **Smooth** tools, make the following edits to your template head:

   1. Reshape the head, flattening and enlarging the top.

   2. Elongate the ears.

      1. Expand the surface near the ear to broaden the base
      2. Grab and extend each ear, ensuring it connects smoothly to the base and vertices remain proportionally spaced when possible.
      3. Try the Flatten tool to straighten and align a region.
      4. Use the Elastic Deform tool to stretch and pull multiple vertices.
         <video controls muted src="../../../assets/art/avatar/basic-creation/Sculpting_03.mp4" width="100%"></video>

   3. Extend the bridge of the nose and expand the size of the brow
      <video controls src="../../../assets/art/avatar/basic-creation/Sculpting_04.mp4" width="100%" muted></video>

   4. Broaden the chin so it prominently protrudes.
      <video controls src="../../../assets/art/avatar/basic-creation/Sculpting_06.mp4" width="100%" muted></video>

6. Perform a refinement pass to add final details, polish, and accentuate your main features, such as:
   - Adding details in the outer and inner ears
   - Adding more detail to chin and cheeks
   - Improving edge lines and spacing in areas with crowded vertices
     <video controls src="../../../assets/art/avatar/basic-creation/Sculpting_07.mp4" width="100%"></video>

<Alert severity = 'success'>
For a comparison reference, you can download [this version of the tutorial project with sculpting completed](../../../assets/art/reference-files/checkpoint/1_Goblin-sculpted.blend).
</Alert>
