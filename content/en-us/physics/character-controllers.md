---
title: Character controllers
description: Controller instances can be used as a component in a custom character implementation.
---

The `Class.ControllerManager` instance manages simulated motion control for its assigned `Class.ControllerManager.RootPart|RootPart`. Along with `Class.ControllerPartSensor|ControllerPartSensors`, it can be used to build a physics‑based character controller.

## Core setup

`Class.ControllerManager` requires a `Class.BasePart` to use as its root. Movement forces and part sensing will be on this part.

1. Choose a `Class.Part` or `Class.MeshPart` and name it **RootPart**.
2. Group the part as a `Class.Model` instance for organization along with the other components.
3. Add a `Class.ControllerManager` instance to the model. If **ControllerManager** doesn't initially appear in the object insertion menu, **uncheck** "Show only recommended objects" in the menu's [insertion settings](../studio/explorer.md#insert-and-parent).

	 <img src="../assets/physics/character-controller/Explorer-Core-Setup.png" width="320" alt="ControllerManager and RootPart inside a model." />

### Sensor setup

A `Class.ControllerPartSensor` detects parts with the same code the `Class.Humanoid` uses for detecting floors and ladders.

1. Insert a `Class.ControllerPartSensor` as a child of **RootPart** and rename it **GroundSensor** for easier identification of its purpose. Then, in the [Properties](../studio/properties.md) window, set its `Class.ControllerPartSensor.SearchDistance|SearchDistance` property to **2** but leave its `Class.ControllerPartSensor.SensorMode|SensorMode` as **Floor**.

   <img src="../assets/physics/character-controller/Explorer-RootPart-GroundSensor.png" width="320" alt="GroundSensor as child of RootPart" /><br />
	 <img src="../assets/physics/character-controller/Properties-GroundSensor.png" width="320" alt="" />

2. Insert another `Class.ControllerPartSensor` as a child of **RootPart** and rename it **ClimbSensor**. Then, in the [Properties](../studio/properties.md) window, set its `Class.ControllerPartSensor.SearchDistance|SearchDistance` property to **1** and its `Class.ControllerPartSensor.SensorMode|SensorMode` to **Ladder**.

   <img src="../assets/physics/character-controller/Explorer-RootPart-ClimbSensor.png" width="320" alt="ClimbSensor as child of RootPart" /><br />
	 <img src="../assets/physics/character-controller/Properties-ClimbSensor.png" width="320" alt="" />

### Controller setup

Controller instances like `Class.GroundController` and `Class.ClimbController` tell the managed part how to interact with the world, working alongside the sensors you configured during the [sensor setup](#sensor-setup).

1. Insert both a `Class.GroundController` and `Class.ClimbController` as children of the `Class.ControllerManager`.

   <img src="../assets/physics/character-controller/Explorer-Controllers.png" width="320" alt="GroundController and ClimbController as children of ControllerManager." />

2. Select the new `Class.GroundController` instance and then, in the [Properties](../studio/properties.md) window, set its `Class.GroundController.GroundOffset|GroundOffset` property to a value at which the managed part should "levitate" above the ground. It's important that this value is **less** than the value of `Class.ControllerPartSensor.SearchDistance|SearchDistance` for the [GroundSensor](#sensor-setup), since that sensor will deactivate if it loses sense of the ground and effectively stop its forces on the part.

   <img src="../assets/physics/character-controller/Properties-GroundController.png" width="320" alt="" />

### Link references

To complete the core setup, you'll need to link various properties of the `Class.ControllerManager` instance to objects within the main `Class.Model`.

1. Select the `Class.ControllerManager` instance.

   <img src="../assets/physics/character-controller/Explorer-ControllerManager.png" width="320" alt="ControllerManager selected in Explorer window." />

1. In the [Properties](../studio/properties.md) window, click each of the following properties and then, back in the [Explorer](../studio/explorer.md) window, click the respective instance to complete the link.

   1. Link the `Class.ControllerManager.ActiveController|ActiveController` property to the **GroundController** instance.
   1. Link the `Class.ControllerManager.RootPart|RootPart` property to the part you named **RootPart**.
   1. Link the `Class.ControllerManager.ClimbSensor|ClimbSensor` property to the **ClimbSensor** instance.
   1. Link the `Class.ControllerManager.GroundSensor|GroundSensor` property to the **GroundSensor** instance.

   <img src="../assets/physics/character-controller/Linking-References.png" width="680" alt="ControllerManager properties linked to instances within overall model" />

### Test

With [sensors](#sensor-setup) and [controllers](#controller-setup) in place, and with [references linked](#link-references), you can test the controller in Studio.

1. [Initiate a playtest](../studio/testing-modes.md#playtesting) using the **Run** mode (<kbd>F8</kbd>) since you don't need to insert your avatar character in this scenario.
2. **RootPart** should levitate above the ground at the `Class.GroundController.GroundOffset` value you set in [Adding Controllers](#controller-setup). It should also rotate to align with the `Class.ControllerManager.FacingDirection` vector.

   <img src="../assets/physics/character-controller/Testing-Labeled.jpg" width="800" alt="Character levitating above ground at GroundOffset, facing in direction of FacingDirection vector." />

3. Experiment with different movement and facing directions by changing the `Class.ControllerManager.MovingDirection|MovingDirection` and `Class.ControllerManager.FacingDirection|FacingDirection` vectors of the `Class.ControllerManager` during runtime. Also experiment with different properties of the `Class.GroundController` instance such as `Class.GroundController.AccelerationTime|AccelerationTime`, `Class.GroundController.DecelerationTime|DecelerationTime`, and `Class.GroundController.GroundOffset|GroundOffset`.

   <Grid container spacing={4}>
   <Grid item>
	 <figure>
	 <img src="../assets/physics/character-controller/Properties-Testing-ControllerManager.png" width="320" alt="ControllerManager properties for moving and facing direction are highlighted." />
   <figcaption>ControllerManager</figcaption>
	 </figure>
	 </Grid>
   <Grid item>
	 <figure>
	 <img src="../assets/physics/character-controller/Properties-Testing-GroundController.png" width="320" alt="GroundController properties for acceleration, deceleration, and ground offset are highlighted." />
	 <figcaption>GroundController</figcaption>
	 </figure>
	 </Grid>
   </Grid>

	 <Alert severity="warning">
   Remember that `Class.GroundController.GroundOffset|GroundOffset` must be **less** than the value of `Class.ControllerPartSensor.SearchDistance|SearchDistance` for the [GroundSensor](#sensor-setup), since that sensor will deactivate if it loses sense of the ground and effectively stop its forces on the part. This will cause a bouncing effect as gravity and the `Class.GroundController` repeatedly swap control of the part.
	 </Alert>

## Custom sensors

The `Class.ControllerPartSensor.SensorMode` options of `Enum.SensorMode|Floor` and `Enum.SensorMode|Ladder` run the exact `Class.Humanoid` sensor code, letting you use them for backwards compatibility. However, you can also customize how and when walkable and climbable parts are detected, ultimately changing when the managed part walks/climbs.

1. Switch the `Class.ControllerPartSensor.UpdateType` from **OnRead** to **Manual**.

   - **OnRead** triggers the output properties to update corresponding to your `Class.ControllerPartSensor.SensorMode|SensorMode` every time you read them. It essentially puts the sensor in a "read‑only" mode where anything you write to these properties becomes overwritten by its internal sensing behavior.
   - **Manual** turns off the internal sensing behavior. The output properties are free for you to write however you like and the `Class.ControllerPartSensor.SensorMode|SensorMode` does nothing.

2. Create a script that performs your own sensing logic and writes the outputs to your sensor output properties. Typically you'll use a spatial query such as `Class.WorldRoot:Raycast()` or `Class.WorldRoot:Blockcast()` which returns a `Datatype.RaycastResult`. Your script can then take the result properties and set them on the sensor equivalents:

   - `Datatype.RaycastResult.Instance` &rarr; `Class.ControllerPartSensor.SensedPart`
   - `Datatype.RaycastResult.Normal` &rarr; `Class.ControllerPartSensor.HitNormal`
  
   Note that you'll need to manage how often your queries run and update their sensor instance.

3. The `Class.ControllerManager` will continue to use the sensors it has been assigned, taking the data you pass to it.
