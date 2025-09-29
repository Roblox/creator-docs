---
title: Build a ferris wheel
description: The process for creating a ferris wheel using a motor.
---

Many contraptions in Roblox will use multiple constraints to build more complicated mechanisms. In particular, you can configure several constraints to be **actuated**, meaning they will move under their own power. This tutorial will show you how to actuate a `Class.HingeConstraint` to be a **motor** in order to make a ferris wheel.

<video controls loop muted>
    <source src="../../../assets/tutorials/building-a-ferris-wheel/ferrisWheel-inContext.mp4" />
</video>

## Ferris wheel setup

1. Add a ferris wheel into a place using either [this model](https://www.roblox.com/library/6448931648/FerrisWheel) or this [pre-built place](https://www.roblox.com/games/6448937909/Ferris-Wheel).

   <img src="../../../assets/tutorials/building-a-ferris-wheel/Ferris-Wheel-Edit-Place.png" width="780" alt="Edit in Studio option from the experience's main page" />

2. To view constraints and attachments, toggle on **Show Constraint Details** from Studio's **View** menu.

## Add attachments

You will need to add attachments to the ferris wheel to determine where it will rotate. When working with attachments, it helps to move the pieces you are working with apart so you can clearly see the position and orientation of the attachments.

1. In the **Explorer**, expand **FerrisWheel**, select the **MainSupport** model, and move it so you can see the side of the wheel axle as well as the side of the support axle.

   ![alt](../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_moveMainSupport.jpg)

2. Expand MainSupport and select **SupportAxle**. Insert an attachment and rename it **SupportAttachment**.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_supportAttachment.png" width="60%" />

3. Move **SupportAttachment** so that it is on the inside edge of the **SupportAxle**.

   ![alt](../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_movedSupportAttachment.jpg)

4. In the FerrisWheel, select **WheelAxle** and add a new attachment named **WheelAttachment**.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_wheelAttachment.png" width="60%" />

5. Move the **WheelAttachment** to the edge of the axle. Make sure this is the side facing the support where you placed the **SupportAttachment**.

   ![alt](../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_movedWheelAttachment.jpg)

6. If you hover over the attachments, you'll see yellow and orange arrows appear. Make sure the yellow arrows for both attachments are pointing in the same direction. If they aren't, use the **Rotate** tool to make sure they are pointed the same way.

   ![alt](../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_rotateWheelAttachment.jpg)

## Create a HingeConstraint

Now that both attachments are in place, it's time to add a `Class.HingeConstraint` to act as the motor for the wheel.

1. In the SupportAxle, create a new **HingeConstraint** and name it **MainMotor**.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_mainMotor.png" width="60%" />

2. In the properties of **MainMotor**, set Attachment0 to SupportAttachment, and Attachment1 to WheelAttachment.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_mainMotorAttachments.png" width="60%" />

3. Select the **MainSupport** model and return it to its original position.

   ![alt](../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_originalPosition.jpg)

## Change to motor

By default, `Class.HingeConstraint|HingeConstraints` will only turn if an outside force acts on them, such as a user character pushing in the connected parts. To make a `Class.HingeConstraint` turn on its own, we have to configure it to be a **Motor**, set our desired turn rate, and make sure the hinge has enough torque.

1. Select **MainMotor** and, in the properties, change **ActuatorType** to **Motor**.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_actuatorType.png" width="60%" />

2. Change **AngularVelocity** to 0.314.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_angularVelocity.png" width="60%" />

   <Alert severity="info">

   The **AngularVelocity** property uses **radians per second** to set how fast its motor turns. Radians are a unit used to measure angles. Most radian values are based on pi, which is approximately 3.14. If you want to precisely configure how quickly or slowly your hinge turns, trying some values related to pi is a good starting point.

   - 1 revolution per second = 2 \* pi = 6.28
   - ½ revolution per second = pi = 3.14
   - ¼ revolution per second = pi / 2 = 1.57
   - 1/10 revolution per second = pi / 10 = .314

   </Alert>

3. Copy the `inf` value from **MotorMaxAcceleration** to **MotorMaxTorque** so that the wheel can handle any amount of weight.

   <img src="../../../assets/tutorials/building-a-ferris-wheel/makingAFerrisWheel_motorMaxTorque.png" width="60%" />

4. [Initiate a playtest](../../../studio/testing-modes.md#playtesting) to test your wheel turning behavior.

<video controls loop muted>
    <source src="../../../assets/tutorials/building-a-ferris-wheel/ferrisWheel-finalExample.mp4" />
</video>

Notice that you only need the motor on one side of the wheel; you do not need motors on both sides. When building with contraptions, try using as few constraints as possible. This ensures that your contraptions are stable and reliable.

Now that you have the ferris wheel fully built, try experimenting with more constraints. You can add more cars to the ferris wheel, or you can try building an original contraption.
