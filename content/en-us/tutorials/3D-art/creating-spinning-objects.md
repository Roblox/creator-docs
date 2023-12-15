---
title: Creating Spinning Objects
description: Explains the process of creating dynamic motion by spinning objects.
---

**Spinning objects** instantly create dynamic motion within your experience, helping your environment feel more immersive and realistic to everyday objects that constantly spin, such as windmills and propellers. Studio has various methods to create rotating motion, such as using a script to continually change an object's rotation, or adding constraints that ensure only a portion of an object spins while the rest remains static.

<video controls src="../../assets/tutorials/creating-spinning-objects/Overview.mp4" width="80%"></video>

As with all 3D creation, there are many ways to achieve any particular goal. In this guide, you can quickly make objects spin indefinitely by using tools and methods available within Studio. Follow each of the following methods to learn how to:

- Make an entire object constantly spin with a `Class.Script`.
- Allow a portion of an object to remain stationary while the rest of the object constantly spins using a `Class.HingeConstraint`.

<Alert severity="info">
   This guide uses two downloadable `.fbx` files of a propeller prop: one keeps the entire propeller as a single object while the other separates the propeller's head from its base. You can use these components to understand the basic principles of each method, then apply them to your own components that you want to spin in your experiences.
</Alert>

## Using Scripts

`Class.Script|Scripts` provide a fine level of control over the behavior of objects, allowing you to adjust properties to create new behavior for objects within your experiences. Using scripts to implement rotation is useful when you want to calibrate the behavior using a single object, then later scale the behavior to influence a group of objects while only needing to make adjustments to the script itself.

To use a script to make a propeller spin indefinitely:

1. Import the [Propeller-Scripting-Method](../../assets/tutorials/creating-spinning-objects/Propeller-Scripting-Method.fbx) `.fbx` file.

   1. In the menu bar, navigate to the **Home** tab, then click **Import 3D**. A file browser displays.

      <img src="../../assets/studio/general/Home-Tab-Import-3D.png" width="780" alt="Import 3D button indicated in Home tab" />

   1. Select the **Propeller-Scripting-Method** `.fbx` file, then click the **Open** button. The **Import Preview** window displays.
   1. In the hierarchy panel, select **Propeller_Geo**.
   1. In the **Object General** section,

      1. Rename the mesh **Propeller**.
      1. Enable the **Anchored** property to ensure the propeller doesn't change position when its blades begin to move.

   1. Click the **Import** button. The propeller displays within the viewport.

      <img width="80%" img src="../../assets/tutorials/creating-spinning-objects/Importing-Propeller-Scripting-Method.jpg" />

1. In the **Explorer** window, insert a script into the propeller.

   1. Hover over **Propeller** and click the **⊕** button. A contextual menu displays.
   1. From the menu, insert a **Script**.

1. In the new script, enter the following:

```lua
local RunService = game:GetService("RunService")

local propeller = script.Parent
local ROTATE_SPEED = 100

-- PostSimulation fires every frame, after the physics simulation has completed.
-- step is the amount of time that has elapsed since the previous frame.

RunService.PostSimulation:Connect(function(step)
	-- The amount to rotate is a function of ROTATE_SPEED and step.
	local rotationAmount = math.rad(ROTATE_SPEED * step)

	-- Apply rotationAmount to the propeller's current CFrame.
	propeller.CFrame = propeller.CFrame * CFrame.Angles(0, rotationAmount, 0)
end)
```

When you [playtest your experience](../../studio/test-tab.md), the script quickly rotates the propeller along the Y axis. If you want the propeller to move more quickly or slowly, you can adjust the speed to be higher or lower, respectively.

<video controls src="../../assets/tutorials/creating-spinning-objects/Using-Scripts.mp4" width="80%"></video>

## Using HingeConstraints

`Class.Constraint|Constraints` provide the ability to emulate realistic behavior of objects under physical forces, such as gravity, wind, and friction. Using a `Class.HingeConstraint`, you can create a relationship between the head and base of a propeller, then implement realistic motion in which the base of the propeller remains stationary while the head and its blades continuously spin. When accuracy is important, constraints allow you to simulate how objects spin in real world conditions.

### Configuring the Propeller Components

Before you create a `Class.HingeConstraint`, it's important to configure each of the propeller's components to make sure they have clear naming, the base remains anchored when the blades are in motion, and that you can easily see what's happening as you configure your constraint. This initial setup allows for the entire process to run more smoothly.

To configure the propeller components:

1. Import the [Propeller-HingeConstraint-Method](../../assets/tutorials/creating-spinning-objects/Propeller-HingeConstraint-Method.fbx) `.fbx` file.

   1. In the menu bar, navigate to the **Home** tab, then click **Import 3D**. A file browser displays.

      <img src="../../assets/studio/general/Home-Tab-Import-3D.png" width="780" alt="Import 3D button indicated in Home tab" />

   1. Select the **Propeller-HingeConstraint-Method** `.fbx` file, then click the **Open** button. The **Import Preview** window displays.
   1. In the **Object General** section, rename the model **Propeller**.
   1. In the hierarchy panel, select **PropellerHead_Geo**, then in the **Object General** section, rename the mesh **Head**.
   1. In the hierarchy panel, select **PropellerBase_Geo**, then in the **Object General** section,

      1. Rename the object **Base**.
      1. Enable the **Anchored** property to ensure the propeller doesn't change position when its blades begin to move.

   1. Click the **Import** button. The propeller displays within the viewport.

      <img width="80%" img src="../../assets/tutorials/creating-spinning-objects/Importing-Propeller-HingeConstraint-Method.jpg" />

1. In the menu bar, select the **Move** tool, then use the green Y axis arrow to create a gap between both parts to make it easier to visualize the HingeConstraint configuration.

### Configuring the HingeConstraint

Now that you have two components that make up the foundation of your propeller, you can create a `Class.HingeConstraint`, reorient the associated attachments so the propeller's head is able to spin on the Y axis without breaking the hinge, and set the constraint's values to enable the propeller to spin against any physical force within the experience.

#### Creating the HingeConstraint and Attachments

A `Class.HingeConstraint` allows two `Class.Attachment|Attachments` to rotate about one axis. This type of [constraint](../../physics/mechanical-constraints.md) is ideal for spinning objects with multiple components because it allows you to specify which component you want to spin while keeping the other stationary.

To create a HingeConstraint and its attachments:

1. In the **Explorer** window, insert a HingeConstraint into **Head**.

   1. Hover over **Head** and click the **⊕** button. A contextual menu displays.
   1. From the menu, insert a **HingeConstraint**.

1. Insert an attachment into **Head** and **Base**.

   1. Hover over **Head** and click the **⊕** button. A contextual menu displays.
   1. From the menu, insert an **Attachment**.
   1. Repeat this process for **Base**.
   1. Rename both attachments **HeadAttachment** and **BaseAttachment**, respectively.

      <img width="50%" img src="../../assets/tutorials/creating-spinning-objects/Creating-HingeConstraint.jpg" />

1. Select the **HingeConstraint**.
1. In the **Properties** window, assign the attachments to the HingeConstraint.

   1. Select the `Class.HingeConstraint.Attachment0` property. Your cursor changes.
   1. In the **Explorer** window, select **HeadAttachment**.
   1. Select the `Class.HingeConstraint.Attachment1` property. Your cursor changes.
   1. In the **Explorer** window, select **BaseAttachment**.

      <img width="60%" img src="../../assets/tutorials/creating-spinning-objects/Assigning-Attachments.jpg" />

#### Rotating and Moving the Attachments

If you keep both attachments at their default orientations and positions, the propeller's head tries to spin on the Z axis through the base instead of on the Y axis on top of the base. To ensure this doesn't happen, you must rotate the attachments until both Y axis arrows are pointing down, then move the hinge to the top of the base so the blades spin in the correct location.

<figure>
  <video controls src="../../assets/tutorials/creating-spinning-objects/Broken-Propeller.mp4" width="80%"></video>
  <figcaption>If you don't reorient and reposition the attachments, the propeller's head spins on the wrong axis in the middle of the base.</figcaption>
</figure>

Before you begin to reorient your attachments, make sure you are able to view them within the viewport by enabling constraint details:

1. In the menu bar, navigate to the **Model** tab, then the **Constraints** section.
1. If it's not currently enabled, click **Constraint Details** and **Draw On Top** to display constraint and attachment visual aids.

   <img width="60%" img src="../../assets/tutorials/creating-elevators/Constraint-Details.jpg" />

1. If you want to make the visualization of each attachment larger, increase **Scale**.

   <img width="60%" img src="../../assets/tutorials/creating-elevators/Constraint-Details-Scale.jpg" />

It's important to view attachments so that you can visualize how the constraint is using both attachments to connect the rotating object to the stationary object and see what axis the attachments are rotating on.

To rotate and move the constraint's attachments so the blades spin correctly:

1. In the menu bar, select the **Rotate** tool and rotate the **HeadAttachment** and **BaseAttachment** so that the yellow arrow of each attachment points downwards on the Y axis.

   <img width="60%" img src="../../assets/tutorials/creating-spinning-objects/Rotating-Attachments.jpg" />

1. Select the **Move** tool and use the green Y Axis arrow to reposition the **BaseAttachment** until it's at the top of the base. This tells Studio where to connect the hinge itself.

   <img width="60%" img src="../../assets/tutorials/creating-spinning-objects/Repositioning-BaseAttachment.jpg" />

1. In the **Explorer** window, select **Head**, then continue using the **Move** tool to close the gap between the propeller's head and base. This step is technically optional because Studio connects the hinge at runtime, but it's ideal to see the object as it reflects to users.

   <img width="60%" img src="../../assets/tutorials/creating-spinning-objects/Repositioning-PropellerHead.jpg" />

#### Setting HingeConstraint Values

Now that you have a `Class.HingeConstraint` and have aligned its associated `Class.Attachment|Attachments`, it's time to set the constraint's values to tell Studio's engine how quickly the blades need to rotate, and how strong the blade's motion must push against any physical force within the experience. To ensure that the propeller rotates under all physical conditions, this technique uses the highest strength value possible.

To set values for your constraint to enable elevator movement within a set range of motion:

1. In the **Explorer** window, select **HingeConstraint**.
1. In the **Properties** window, navigate to the **Hinge** section, then set **ActuatorType** to **Motor**. New property fields display.
1. Navigate to the **Motor** section, then ensure the propeller head has plenty of strength to handle any physical load, and that they rotate quickly per second.

   1. Set **MotorMaxTorque** to **9999999999999999999999999999999999999999**. The field displays inf.
   1. Set **AngularVelocity** to **50**.

When you [playtest your experience](../../studio/test-tab.md), the `Class.HingeConstraint` moves the propeller at a speed of 50 frames per second along the Y axis. If you want the propeller to move more quickly or slowly, you can adjust the AngularVelocity value to be higher or lower, respectively.

<video controls src="../../assets/tutorials/creating-spinning-objects/Using-HingeConstraints.mp4" width="80%"></video>
