---
title: Create moving objects
description: Explains the process of creating dynamic motion by moving objects.
---

**Moving objects** are objects that move on one or more axes within the 3D space. Using the built-in power of Roblox's simulation engine, you can make objects move and interact with their environment in a way that emulates real-world physical behavior that's familiar and intuitive to players, such as gravity, aerodynamics, and friction.

Using the [Moving Objects](https://www.roblox.com/games/17560154079/UCT-Linear-Movement) `.rbxl` file as a reference, this tutorial explains how physical forces impact linear motion in Studio, and shows you various techniques to move objects from point A to point B in your experiences with different movement behavior, including guidance on:

- Using a `Class.LinearVelocity` mover constraint to move an entire assembly at a constant linear velocity.
- Using a `Class.PrismaticConstraint` to constrain an assembly to a single axis and move it at a constant linear velocity relative to a point in the 3D space.
- Using the `Class.BasePart.ApplyImpulse|ApplyImpulse` method to move an assembly with an initial impulse of force so that the assembly slowly decelerates over time.

<Alert severity="info">
   You can create your own assemblies using basic parts or meshes from third-party modeling tools, then follow along with your own assets. For information on exporting meshes for use in Studio, see [Exporting Requirements](../../../art/modeling/export-requirements.md).
</Alert>

<video controls src="../../../assets/tutorials/creating-moving-objects/Intro.mp4" alt="An angled side view of the main gameplay area in the sample experience, including logs and lily pads floating on river lanes, and a bright blue jumping pad." width="90%"></video>

## Linear motion and physical forces

Roblox Studio is a real-world simulation engine that emulates physical behavior in real time, so in order to predict how objects moving linearly can behave in experiences, it's important to have a high-level understanding of how objects move in real life with linear motion.

**Linear motion** is movement along an axis. For example, when a block has linear motion, it moves along a set axis.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-moving-objects/Movement-Axis.jpg" alt="A gray block in front of a dark background. The movement axis is highlighted, and it faces toward the left of the screen to signify that the block is going to move along the world's Y axis." width="100%"/>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/creating-moving-objects/Move-Block.mp4" alt="A gray block moves from the right to the left of the screen in front of a dark background." width="100%"></video>
  </figure>
</GridContainer>

Linear motion cannot exist without external, physical forces pushing or pulling objects to move. According to Newton's [first law of motion](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion#First_law), stationary objects remain stationary and moving objects remain in motion with a constant velocity unless they are acted on by an external force. For example, a stationary block remains stationary unless a physical force like wind pushes it to move.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../../assets/tutorials/creating-moving-objects/Wind-Block.mp4" alt="Wind pushes a gray block from the right to the left of the screen in front of a dark background." width="100%"></video>
  </figure>
  <figure>
  </figure>
</GridContainer>

**Force** is the measure of the direction and magnitude of a physical push or pull that causes objects to change their linear velocity along an axis. A change in velocity is known as **acceleration**. This concept is particularly important for objects to move in Studio; the more force you apply to objects, the more quickly they accelerate.

This is because the force needs to be greater than any physical forces pushing back against the object, such as gravity or friction. For example, if you were to place the block on a metal plate, the physical force of the wind needs to overcome the amount of friction from the metal plate to continue accelerating the block. If the wind's force is not much greater than the friction from the metal plate, the block accelerates, just more slowly than the previous example.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-moving-objects/Plate-Friction.jpg" alt="A gray block in front of a dark grey metal plate with a diagram that signifies the block will have a plate friction to slow the block's movement from the wind." width="100%"/>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/creating-moving-objects/Plate-Friction.mp4" alt="The same gray block from the previous image now moves more slowly from the right to the left of the screen because of the metal plate's friction." width="100%"></video>
  </figure>
</GridContainer>

**Linear velocity** is the measure of an object's movement, or how fast the object changes its position along an axis over a period of time. Studio measures linear velocity according to how many studs an object moves per second. Studs are Roblox's primary physical units for measuring length, and each stud equates to about 28cm in the real world.

<GridContainer numColumns="2">
  <figure>
    <img src="../../../assets/tutorials/creating-moving-objects/One-Stud.jpg" alt="A gray block in front of the default baseplate's 4x4 grid texture. A single stud cube rectangle is highlighted." width="100%"/>
  </figure>
  <figure>
  </figure>
</GridContainer>

Understanding linear velocity is important for designing gameplay in your experiences because it helps you determine how much force you need in order to achieve a particular speed for your moving objects. For instance, when you want to propel objects upward, it's important to consider how you must adjust your force to overcome gravity within the environment so that the objects move accurately.

The following sections dive deeper into these concepts as you learn how to move objects at either a constant or initial linear velocity with the necessary force to overcome any oppositional physical forces within the environment. As you review these physics concepts with the upcoming techniques, you can more accurately predict how to adjust property values to achieve any ideal linear movement behavior in Studio.

## Maintain a constant linear velocity

For an object to reach and maintain a constant linear velocity, it needs a force to overcome any oppositional physical forces that either decelerate the object's linear velocity, or cause the object to remain stationary. For example, if you want an object to have a linear velocity of `[0, 12, 0]` in Studio, you need enough force for the object to reach and maintain 12 studs per second along the Y axis in its environment.

The amount of force necessary not only depends on oppositional physical forces within the environment itself, such as gravity and friction, but also on the object itself. For example, if you have two objects of the same shape that are moving on the same axis, the object with the larger amount of mass requires more force to achieve the same linear acceleration.

<GridContainer numColumns="2">
  <figure>
    <video controls src="../../../assets/tutorials/creating-moving-objects/Small-Triangle.mp4" alt="A small triangle moves quickly across the screen because it has a small amount of mass in comparison to the force moving it." width="100%"></video>
    <figcaption>The little triangle part has a small amount of mass, so it needs less force to achieve the same acceleration.</figcaption>
  </figure>
  <figure>
    <video controls src="../../../assets/tutorials/creating-moving-objects/Big-Triangle.mp4" alt="A large triangle moves slowly across the screen because it has a large amount of mass in comparison to the force moving it." width="100%"></video>
    <figcaption>The large triangle part has a large amount of mass, so it needs more force to achieve the same acceleration.</figcaption>
  </figure>
</GridContainer>

The following subsections use assemblies of different shapes and sizes to teach you how to move either an entire object or only a portion of the object at a constant linear velocity. As you experiment with different property values, you will learn how to estimate the maximum amount of force you need for assemblies in your own experiences.

### Use LinearVelocity constraints

`Class.LinearVelocity` objects are a type of [mover constraint](../../../physics/mechanical-constraints.md) that apply force on an entire assembly to maintain a constant linear velocity. By not locking the assembly's position to an axis during its motion, the assembly is free to rotate as it collides with other objects in the 3D space. This type of movement leads to surprising gameplay scenarios that are more difficult for players to predict.

<video controls src="../../../assets/tutorials/creating-moving-objects/LV-Intro.mp4" width="90%" alt="An angled side view of lily pads colliding with one another as they flow down a river." ></video>

<figcaption>As the lily pads collide with one another, they change orientation but continue to flow down the river at a constant linear velocity.</figcaption>

<br />

To begin moving the assembly, the `Class.LinearVelocity` constraint needs to know:

- The point and positive or negative direction to apply a force.
- The amount of studs you want the assembly to move per second.
- The maximum amount of force the engine can apply for the assembly to reach the constant linear velocity.

To demonstrate this process, you will configure a lily pad with an attachment that a `Class.LinearVelocity` constraint references to move the lily pad `15` studs per second along the world's negative X axis at a constant linear velocity.

<img width="90%" img src="../../../assets/tutorials/creating-moving-objects/LV-3.jpg" alt="A close up view of a lily pad. The lily pad's constraint visual aid is visible, and it points to the right, which is the world's negative X axis." />

#### Add attachment

You can specify the point to apply force by adding an `Class.Attachment` object to the assembly, then configuring the attachment's position in the 3D space. The sample [Moving Objects](https://www.roblox.com/games/17560154079/UCT-Linear-Movement) experience places an attachment in the center of the lily pad so that the constraint can move the mesh from the attachment along a particular axis.

Attachments include visual aids to help you visualize their axes of motion. The yellow arrow denotes the attachment's primary axis, and the orange arrow denotes the attachment's secondary axis. While neither axis of motion influences the lily pad's movement in the steps of this technique, it's important to understand these visual aids for future reference because they can assist you in determining ideal behavior for different types of constraints, such as the `Class.PrismaticConstraint` in the next technique.

<img src="../../../assets/tutorials/creating-spinning-objects/Attachment-Visual-Aids.png" width="90%" alt="A attachment's visual aid arrows. The yellow arrow that signifies the attachment's primary axis points up, and the orange arrow that signifies the attachment's secondary axis points to the right." />

To add an attachment:

1. In the **Explorer** window, expand the **LinearVelocityExample** folder, then expand its child **LilyPad_DIY** model.
1. Insert an attachment into the **Pad** mesh.

   1. Hover over the mesh and click the ⊕ button. A contextual menu displays.
   1. From the menu, insert an **Attachment**. The attachment displays in the center of the part.
   1. Rename the attachment to **MoveAttachment**.

   <img src="../../../assets/tutorials/creating-moving-objects/LV-Attachment-2.jpg" width="80%" alt="A close up view of a lily pad and its attachment visual aid. The primary axis points away from the camera, and the secondary axis points upward." />

#### Configure constraint

Now that your mesh has a fixed point to move the lily pad, you can configure the properties of a `Class.LinearVelocity` constraint to specify the direction and magnitude for the constant linear velocity, the amount of studs you want the mesh to move per second, and the maximum amount of force the engine can apply for the mesh to reach a constant linear velocity.

The sample [Moving Objects](https://www.roblox.com/games/17560154079/UCT-Linear-Movement) experience applies up to 5000 Rowtons of constant force to move the lily pad 15 studs per second along the world's negative X axis at a constant linear velocity. Rowtons are Roblox's primary physical units for measuring force. To reference Roblox physical units and how they convert to metric units, see [Roblox Units](../../../physics/units.md).

To configure a `Class.LinearVelocity` constraint:

1. To make the constraint visible in the viewport so that you can reference its linear direction, enable **Show Constraint Details** from Studio's **View** menu.
1. Insert a `Class.LinearVelocity` constraint into the **Pad** mesh.
   1. In the **Explorer** window, hover over the mesh, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert **LinearVelocity**.
1. Assign the mesh's attachment to the new constraint.

   1. In the **Explorer** window, select the constraint.
   1. In the **Properties** window,
      1. Set **Attachment0** to **MoveAttachment**.
      1. Set **MaxForce** to `5000` to apply up to 5000 Rowtons of constant force to achieve the target linear velocity.
      1. Keep **RelativeTo** to **World** to move the lily pad relative to the world's position and orientation.
      1. Set **VelocityConstraint** to **Line** to constrain the force along a line from the attachment.
      1. Set **LineDirection** to `-1, 0, 0` to move the lily pad along the world's negative X axis. Note that if you were to set this property to `1, 0, 0` the lily pad would move along the world's positive X axis.
      1. Set **LineVelocity** to `15` to move the lily pad 15 studs per second.

   <Alert severity="info">
      If you were to set **RelativeTo** to **Attachment**, the constraint would move the lily pad in relation to its attachment's orientation. However, as soon as the lily pad collides with objects, the attachment would rotate too and move the lily pad along a new orientation.
   </Alert>

   <img width="80%" img src="../../../assets/tutorials/creating-moving-objects/LV-3.jpg" alt="A close up view of a lily pad and its constraint visual aid arrow that points to the right, or the world's negative X axis." />

1. Verify the amount of force you set moves the mesh 15 studs per second along the world's negative X axis.

   - Select the **Run** simulation mode from the mezzanine's dropdown menu and click the **Play** button to begin. Studio simulates the experience at the current camera position without your avatar in the 3D space.

     <img src="../../../assets/studio/general/Mezzanine-Testing-Mode-Run.png" width="800" alt="Run option in the testing modes dropdown of Studio's mezzanine." />

     <video controls src="../../../assets/tutorials/creating-moving-objects/LV-4.mp4" width="80%" alt="A lily pad floats from the left to the right of the screen across a river." ></video>

### Use PrismaticConstraint constraints

`Class.PrismaticConstraint` objects are a type of [mechanical constraint](../../../physics/mechanical-constraints.md) that create a rigid joint between two attachments, allowing their parent assemblies to move along one axis **relative to each other**. By locking both assemblies' position to a single axis, each assembly is only able to rotate if they rotate together in the same direction.

<video controls src="../../../assets/physics/constraints/Prismatic-Demo.mp4" width="90%" alt="Demo video of PrismaticConstraint"></video>

This type of movement leads to stable gameplay scenarios that are easier for players to predict. For example, the sample [Moving Objects](https://www.roblox.com/games/17560154079/UCT-Linear-Movement) experience uses `Class.PrismaticConstraint` objects to move log platforms that players can use to carefully cross a giant river.

<video controls src="../../../assets/tutorials/creating-moving-objects/PC-Intro.mp4" width="90%" alt="An angled side view of logs floating in lanes across a river. Some rows float from the top to the bottom of the screen, and one row floats from the bottom to the top of the screen." ></video>

When you set `Class.PrismaticConstraint.ActuatorType` to **Motor**, this constraint applies force on the two attachments with the goal of the attachments reaching and maintaining a constant linear velocity. If you anchor one of the attachments' parent assemblies, the force continues to move the unanchored assembly at a constant linear velocity while the anchored assembly remains stationary.

To begin moving the assembly, the `Class.PrismaticConstraint` constraint needs to know:

- The point and positive or negative direction to apply a force.
- The amount of studs you want the attachments to move per second.
- The maximum amount of force the engine can apply for the attachments and their parent assemblies to reach a constant linear velocity.

To demonstrate this process, you will configure a log assembly with two objects that have child attachments that a `Class.PrismaticConstraint` references to move the log 40 studs per second along the world's negative X axis at a constant linear velocity.

<img width="90%" img src="../../../assets/tutorials/creating-moving-objects/PC-3.jpg" alt="A close up view of a brown log on top of a river. The log's constraint visual aid is visible and points to the right, or the world's negative X axis." />

#### Configure attachments

You can specify the direction to move a particular object within an assembly by adding two `Class.Attachment` objects to the assembly, then configuring their alignment and orientation in the 3D space. The sample [Moving Objects](https://www.roblox.com/games/17560154079/UCT-Linear-Movement) experience aligns two attachments along the world's X axis near the position of where the unanchored log overlaps with the anchored part, and orients each attachment's primary axis to face the world's negative X axis.

When you configure your PrismaticConstraint constraint in the next section, it will move the log **in relation** to the anchor part. In other words, the log will move away from the stationary part that cannot move because it's anchored in the 3D space.

To configure attachments for the prismatic constraint:

1. In the **Explorer** window, expand the **PrismaticConstraintExample** folder, then expand its child **Log_DIY** model.
1. Insert an attachment into the **Log** mesh.

   1. Hover over the mesh and click the ⊕ button. A contextual menu displays.
   1. From the menu, insert an **Attachment**. The attachment displays in the center of the part.
   1. Rename the attachment to **LogAttachment**.

   <img src="../../../assets/tutorials/creating-moving-objects/PC-Attachment-2.jpg" width="80%" alt="A close up view of a log and its attachment visual aid. The primary axis points toward the camera, and the secondary axis points upward." />

1. Using the same process, insert an attachment into the **Anchor** part, then rename the attachment **AnchorAttachment**.

   <img src="../../../assets/tutorials/creating-moving-objects/PC-Attachment-3.jpg" width="80%" alt="A close up view of a log and two attachment visual aids. The primary axis of the new attachment visual aid points to the right, and the secondary axis points upward." />

1. Using the **View Selector** tool as a reference for the world's coordinates, rotate **LogAttachment** and **AnchorAttachment** until each attachment's primary axis faces the world's negative X axis

   <img src="../../../assets/tutorials/creating-moving-objects/PC-Attachment-4.jpg" width="80%" alt="A close up view of a log and its attachment visual aid. Both attachments have a primary axis that points to the right, and a secondary axis that points upward." />

1. Reposition **AnchorAttachment** so that both attachments are aligned on the world's X axis.

   <img src="../../../assets/tutorials/creating-moving-objects/PC-Attachment-5.jpg" width="80%" alt="A close up view of a log and its attachment visual aids that are now positioned horizontally. Both attachments have a primary axis that points to the right, and a secondary axis that points upward." />

#### Configure constraint

Now that your attachments are aligned on the same axis and face the same direction you want the log to move, you can configure the properties of a `Class.PrismaticConstraint` constraint to specify whether to apply the target constant linear velocity in the positive or negative direction of each attachment's' primary axis, the amount of studs you want the attachments to move per second, and the maximum amount of force the engine can apply for the log to reach a constant linear velocity.

While you can choose different values for your own use cases, the sample [Moving Objects](https://www.roblox.com/games/17560154079/UCT-Linear-Movement) experience applies up to 50000 Rowtons of constant force to move the attachments 40 radians per second along the world's negative X axis at a constant linear velocity. However, because the anchor attachment is in an anchored object, only the log's attachment can move.

To configure a prismatic constraint:

1. Insert a `Class.PrismaticConstraint` object into the **Log** mesh.
   1. In the **Explorer** window, hover over the mesh, then click the ⊕ icon. A contextual menu displays.
   1. From the contextual menu, insert a **PrismaticConstraint**.
1. Assign the log's attachments to the new constraint so that the log moves in **relation to** the anchored block part.

   1. In the **Explorer** window, select the constraint.
   1. In the **Properties** window,
      1. Set **Attachment0** to **AnchorAttachment**.
      1. Set **Attachment1** to **LogAttachment**. The constraint displays in the viewport.

   <img width="80%" img src="../../../assets/tutorials/creating-moving-objects/PC-2.jpg" alt="A close up view of a log and its constraint visual aid. It doesn't have a arrow visual aid because it doesn't yet have a set velocity." />

1. In the **Explorer** window, select the constraint, then in the **Properties** window:

   1. Set **ActuatorType** to **Motor**. New property fields display.
   1. Set **MotorMaxForce** to `50000` to apply up to 50000 Rowtons of constant force to achieve the target linear velocity.
   1. Set **Velocity** to `40` to move the log 40 studs per second.

   <img width="80%" img src="../../../assets/tutorials/creating-moving-objects/PC-3.jpg" alt="A close up view of a log and its constraint visual aid arrow that points to the right, or the world's negative X axis." />

1. Verify the amount of force you set moves the log 40 studs per second along the world's negative X axis.

   - Select the **Run** simulation mode from the mezzanine's dropdown menu and click the **Play** button to begin. Studio simulates the experience at the current camera position without your avatar in the 3D space.

     <img src="../../../assets/studio/general/Mezzanine-Testing-Mode-Run.png" width="800" alt="Run option in the testing modes dropdown of Studio's mezzanine." />

     <video controls src="../../../assets/tutorials/creating-moving-objects/PC-4.mp4" width="90%" alt="A log floats on a river from the left to the right of the screen." ></video>

## Apply an initial linear force

Another way of changing an object's linear velocity is by applying an impulse of force. After the impulse of force, the object either decelerates until it becomes stationary if there is an oppositional force such as friction, or remains in motion with constant linear velocity if there aren't any oppositional forces.

This technique is useful to move objects after a significant gameplay event, such as an explosion or impactful collision, because it provides players instantaneous feedback. To demonstrate, the following subsection teaches you how to launch a player's character upward toward the sky when they collide with a jump pad with an initial impulse that you can adapt with new values to meet your own gameplay requirements.

### Use ApplyImpulse

The `Class.BasePart.ApplyImpulse|ApplyImpulse` method applies force on an entire assembly to obtain an initial linear velocity before slowing to a stop when there are oppositional forces. To begin moving the assembly, the method needs to know:

- The assembly to move.
- The axis to apply force to reach an initial linear velocity.
- The amount of force to apply to each axis.

You can define all of these values in a script. For example, the sample script defines the assembly to move as the player character's `Class.Humanoid` object, then it applies an impulse of force that's 2500 Rowton-seconds to launch the player upwards on the world's positive Y axis. Note that player characters have different amounts of mass, so you may need to increase and balance this force to launch every player without launching player characters with smaller amounts of mass too high.

To move an assembly using `Class.BasePart.ApplyImpulse|ApplyImpulse`:

1. In the **Explorer** window, expand the **ApplyImpulseExample** folder, then expand its child **JumpPad_DIY** model.
1. Insert a script into the **JumpPad** part.
   1. Hover over the part and click the ⊕ button. A contextual menu displays.
   1. From the menu, insert a **Script**. The attachment displays in the center of the part.
   1. Rename the script to **JumpScript**.
1. Replace the default code with the following code:

   ```lua
   local volume = script.Parent

   local function onTouched(other)
     local impulse = Vector3.new(0, 2500, 0)
     local character = other.Parent
     local humanoid = character:FindFirstChildWhichIsA("Humanoid")
     if humanoid and other.Name == "LeftFoot" then
       other:ApplyImpulse(impulse)
     end
   end

   volume.Touched:Connect(onTouched)
   ```

   <video controls src="../../../assets/tutorials/creating-moving-objects/Impulse-3.mp4" width="90%" alt="A bee character runs up to the jump pad. When the bee touches the jump pad, they are launched up into the air."></video>
