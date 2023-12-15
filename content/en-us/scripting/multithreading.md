---
title: Parallel Luau
description: Parallel Luau runs code on multiple threads simultaneously.
---

With the **Parallel Luau** programming model, you can run code on multiple threads simultaneously, which can improve the performance of your experience. As you expand your experience with more content, you can adopt this model to help maintain the performance and safety of your Luau scripts.

<video controls width="100%" src="../assets/scripting/parallel-luau.mp4"></video>

## Parallel Programming Model

By default, scripts execute sequentially. If your experience has complex logic or content, such as non-player characters (NPCs), raycasting validation, and procedural generation, then sequential execution might cause lag for your users. With the parallel programming model, you can [split tasks into multiple scripts](#splitting-code-into-multiple-threads) and run them in parallel. This makes your experience code run faster, which improves the user experience.

The parallel programming model also adds safety benefits to your code. By splitting code into multiple threads, when you edit code in one thread, it doesn't affect other code running in parallel. This reduces the risk of having one bug in your code corrupting the entire experience, and minimizes the delay for users in live servers when you push an update.

Adopting the parallel programming model doesn't mean to put everything in multiple threads. For example, the [Server-side Raycasting Validation](#server-side-raycasting-validation) sets each individual user a remote event in parallel but still requires the initial code to run serially to change global properties, which is a common pattern for parallel execution.

Most times you need to combine serial and parallel phases to achieve your desired output, since currently there are some operations not supported in parallel that can prevent scripts from running, such as modifying instances in parallel phases. For more information on the level of usage of APIs in parallel, see [Thread Safety](#thread-safety).

## Splitting Code Into Multiple Threads

To run your experience's scripts in multiple threads concurrently, you need to split them into logical chunks under different **actors** in the [data model](../projects/data-model.md). Actors are represented by `Class.Actor` instances inheriting from `Class.DataModel`. They work as units of execution isolation that distribute the load across multiple cores running simultaneously.

### Placing Actor Instances

You can put actors in proper containers or use them to replace the top-level instance types of your 3D entities such as NPCs and raycasters, then add corresponding [scripts](../scripting/scripts.md).

<img
  alt="An example of a Script under an Actor"
  src="../assets/scripting/scripts/actor-example.png"
  width="320" />

For most situations, you shouldn't put an actor as a child of another actor in the data model. However, if you decide to place a script nested within multiple actors for your specific use case, the script is owned by its closest ancestor actor.
<img
  alt="A tree of actors and scripts that shows how a script is owned by its closest actor"
  src="../assets/scripting/scripts/ActorScreenshot.png"
  width="320" />

### Desynchronizing Threads

Though putting scripts under actors grants them the capability for parallel execution, by default the code still runs on the single thread serially, which doesn't improve the runtime performance. You need to call the `Library.task.desynchronize()`, a yieldable function that suspends the execution of the current coroutine for running code in parallel and resumes it at the next parallel execution opportunity. To switch a script back to serial execution, call `Library.task.synchronize()`.

Alternatively, you can use `Datatype.RBXScriptSignal:ConnectParallel()` method when you want to schedule a signal callback to immediately run your code in parallel upon triggering. You don't need to call `Library.task.desynchronize()` inside the signal callback.

```lua title='Desynchronize a Thread'
local RunService = game:GetService("RunService")

RunService.Heartbeat:ConnectParallel(function()
	...  -- Some parallel code that computes a state update

	task.synchronize()

	...  -- Some serial code that changes the state of instances
end)
```

<Alert severity="warning">
You can't use `require()` in a desynchronized parallel phase. Require scripts you want to use first in a serial context.
</Alert>

Scripts that are part of the same actor always execute sequentially with respect to each other, so you need multiple actors. For example, if you put all parallel-enabled behavior scripts for your NPC in one actor, they still run serially on a single thread, but if you have multiple actors for different NPC logic, each of them runs in parallel on its own thread. For more information, see [Best Practices](#best-practices).

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/scripting/scripts/single-thread.png" />
    <figcaption>Parallel code in Actors running serially in a single thread</figcaption>
  </figure>
  <figure>
    <img src="../assets/scripting/scripts/multi-thread.png" />
    <figcaption>Parallel code in Actors running simultaneously in multiple threads</figcaption>
  </figure>
</GridContainer>

### Thread Safety

During the parallel execution, you can access most instances of the `DataModel` hierarchy as usual, but some API properties and functions aren't safe to read or write. If you use them in your parallel code, Roblox engine can automatically detect and prevent these accesses from occurring.

API members have a thread safety level that indicates whether and how you can use them in your parallel code, as the following table shows:

<table>
	<thead>
		<tr>
			<th>Safety Level</th>
			<th>For Properties</th>
			<th>For Functions</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>**Unsafe**</td>
			<td>Cannot be read or written in parallel.</td>
			<td>Cannot be called in parallel.</td>
		</tr>
		<tr>
			<td>**Read Parallel**</td>
			<td>Can be read but not written in parallel.</td>
			<td>N/A</td>
		</tr>
		<tr>
			<td>**Local Safe**</td>
			<td>Can be used within the same Actor; can be read but not written to by other `Class.Actor|Actors` in parallel.</td>
			<td>Can be called within the same Actor; cannot be called by other `Class.Actor|Actors` in parallel.</td>
		</tr>
		<tr>
			<td>**Safe**</td>
			<td>Can be read and written.</td>
			<td>Can be called.</td>
		</tr>
	</tbody>
</table>

You can find thread safety tags for API members on the [API reference](/reference/engine). When using them, you should also consider how API calls or property changes might interact between parallel threads. Usually it's safe for multiple actors to read the same data as other actors but not modify the state of other actors.

<Alert severity="info">
If an API member doesn't specify a thread safety level, by default its thread safety level is **Unsafe**.
</Alert>

## Cross-Thread Communication

Under the multithreading context, you can still allow scripts in different actors to communicate with each other to exchange data, coordinate tasks, and synchronize activities. The engine supports the following mechanisms for cross-thread communication:

- [Actor Messaging](#actor-messaging) API for sending messages to an actor using scripts.
- [Shared Table](#shared-table) data structure for efficiently sharing a large amount of data between multiple actors on a shared state.
- [Direct Data Model Communication](#direct-data-model-communication) for simple communication with restrictions.

You can support multiple mechanisms to accommodate your cross-thread communication needs. For example, you can send a shared table through the Actor Messaging API.

### Actor Messaging

The **Actor Messaging** API allows a script, either in a serial or parallel context, to send data to an actor in the same data model. Communication through this API is asynchronous, in which the sender doesn't block until the receiver receives the message.

When sending messages using this API, you need to define a **topic** for categorizing the message. Each message can only be sent to a single actor, but that actor can internally have multiple callbacks bound to a message. Only scripts that are descendants of an actor can receive messages.

The API has the following methods:

- `Class.Actor:SendMessage()` for sending a message to an actor.
- `Class.Actor:BindToMessage()` for binding a Luau callback to a message with the specified topic in a serial context.
- `Class.Actor:BindToMessageParallel()` for binding a Luau callback to a message with the specified topic in a parallel context.

The following example shows how to use `Class.Actor:SendMessage()` to define a topic and send a message on the sender's end:

```lua title="Example Message Sender"
-- Send two messages to the worker actor with a topic of "Greeting"
local workerActor = workspace.WorkerActor
workerActor:SendMessage("Greeting", "Hello World!")
workerActor:SendMessage("Greeting", "Welcome")

print("Sent messages")
```

The following example shows how to use `Class.Actor:BindToMessageParallel()` to bind a callback for certain topic in a parallel context on the receiver's end:

```lua title="Example Message Receiver"
-- Get the actor this script is parented to
local actor = script:GetActor()

-- Bind a callback for the "Greeting" message topic
actor:BindToMessageParallel("Greeting", function(greetingString)
	print(actor.Name, "-", greetingString)
end)

print("Bound to messages")
```

### Shared Table

`Datatype.SharedTable` is a table-like data structure accessible from scripts running under multiple actors. It's useful for situations that involve a large amount of data and require a common shared state between multiple threads. For example, when multiple actors work on a common world state that is not stored in the data model.

Sending a shared table to another actor doesn't make a copy of the data. Instead, shared tables allow safe and atomic updates by multiple scripts simultaneously. Every update to a shared table by one actor is immediately visible to all actors. Shared tables can also be cloned in a resource-efficient process that utilizes structural sharing instead of copying the underlying data.

### Direct Data Model Communication

You can also facilitate communication between multiple threads directly using the data model, in which different actors can write and subsequently read properties or attributes. However, to maintain the thread-safety, scripts running in parallel generally can't write to the data model. So directly using the data model for communication comes with restrictions and may force scripts to synchronize frequently, which can impact performance of your scripts.

## Examples

### Server-Side Raycasting Validation

For a fighting and battle experience, you need to enable [raycasting](../workspace/raycasting.md) for your users' weapons. With the client simulating the weapons to achieve good latency, the server has to confirm the hit, which involves doing raycasts and some amount of heuristics that compute expected character velocity, and look at past behavior.

Instead of using a single centralized script that connects to a remote event that clients use to communicate hit information, you can run each hit validation process on the server side in parallel with every user character having a separate remote event.

The server-side script that runs under that character's `Class.Actor` connects to this remote event using a parallel connection to run the relevant logic for confirming the hit. If the logic finds a confirmation of a hit, the damage is deducted, which involves changing properties, so it runs serially initially.

```lua
local tool = script.Parent.Parent

local remoteEvent = Instance.new("RemoteEvent")  -- Create new remote event and parent it to the tool
remoteEvent.Parent = tool
remoteEvent.Name = "RemoteMouseEvent"  -- Rename it so that the local script can look for it
local remoteEventConnection  -- Create a reference for the remote event connection

-- Function which listens for a remote event
local function onRemoteMouseEvent(player: Player, clickLocation: CFrame)
	-- SERIAL: Execute setup code in serial
	local character = player.Character
	-- Ignore the user's character while raycasting
	local params = RaycastParams.new()
	params.FilterType = Enum.RaycastFilterType.Exclude
	params.FilterDescendantsInstances = { character }

	-- PARALLEL: Perform the raycast in parallel
	task.desynchronize()
	local origin = tool.Handle.CFrame.Position
	local epsilon = 0.01  -- Used to extend the ray slightly since the click location might be slightly offset from the object
	local lookDirection = (1 + epsilon) * (clickLocation.Position - origin)
	local raycastResult = workspace:Raycast(origin, lookDirection, params)
	if raycastResult then
		local hitPart = raycastResult.Instance
		if hitPart and hitPart.Name == "block" then
			local explosion = Instance.new("Explosion")

			-- SERIAL: The code below modifies state outside of the actor
			task.synchronize()
			explosion.DestroyJointRadiusPercent = 0  -- Make the explosion non-deadly
			explosion.Position = clickLocation.Position

			-- Multiple actors could get the same part in a raycast and decide to destroy it
			-- This is perfectly safe but it would result in two explosions at once instead of one
			-- The following double checks that execution got to this part first
			if hitPart.Parent then
				explosion.Parent = workspace
				hitPart:Destroy()  -- Destroy it
			end
		end
	end
end

-- Connect the signal in serial initially since some setup code is not able to run in parallel
remoteEventConnection = remoteEvent.OnServerEvent:Connect(onRemoteMouseEvent)
```

### Server-Side Procedural Terrain Generation

To create a vast world for your experience, you can populate the world dynamically. Procedural generation typically creates independent terrain chunks, with the generator performing relatively intricate calculations for object placement, material usage, and voxel filling. Running generation code in parallel can enhance efficiency of the process. The following code sample serves as an example.

```lua
-- Parallel execution requires the use of actors
-- This script clones itself; the original initiates the process, while the clones act as workers

local actor = script:GetActor()
if actor == nil then
	local workers = {}
	for i = 1, 32 do
		local actor = Instance.new("Actor")
		script:Clone().Parent = actor
		table.insert(workers, actor)
	end
	
	-- Parent all actors under self
	for _, actor in workers do
		actor.Parent = script
	end
	
	-- Instruct the actors to generate terrain by sending messages
	-- In this example, actors are chosen randomly
	task.defer(function()
		local rand = Random.new()
		local seed = rand:NextNumber()
		
		local sz = 10
		for x = -sz, sz do
			for y = -sz, sz do
				for z = -sz, sz do
					workers[rand:NextInteger(1, #workers)]:SendMessage("GenerateChunk", x, y, z, seed)
				end
			end
		end
	end)
	
	-- Exit from the original script; the rest of the code runs in each actor
	return
end

function makeNdArray(numDim, size, elemValue)
	if numDim == 0 then
		return elemValue
	end
	local result = {}
	for i = 1, size do
		result[i] = makeNdArray(numDim - 1, size, elemValue)
	end
	return result
end

function generateVoxelsWithSeed(xd, yd, zd, seed)
	local matEnums = {Enum.Material.CrackedLava, Enum.Material.Basalt, Enum.Material.Asphalt}
	local materials = makeNdArray(3, 4, Enum.Material.CrackedLava)
	local occupancy = makeNdArray(3, 4, 1)
	
	local rand = Random.new()
	
	for x = 0, 3 do
		for y = 0, 3 do
			for z = 0, 3 do
				occupancy[x + 1][y + 1][z + 1] = math.noise(xd + 0.25 * x, yd + 0.25 * y, zd + 0.25 * z)
				materials[x + 1][y + 1][z + 1] = matEnums[rand:NextInteger(1, #matEnums)]
			end
		end
	end
	
	return {materials = materials, occupancy = occupancy}
end

-- Bind the callback to be called in parallel execution context
actor:BindToMessageParallel("GenerateChunk", function(x, y, z, seed)
	local voxels = generateVoxelsWithSeed(x, y, z, seed)
	local corner = Vector3.new(x * 16, y * 16, z * 16)
	
	-- Currently, WriteVoxels() must be called in the serial phase
	task.synchronize()
	workspace.Terrain:WriteVoxels(
		Region3.new(corner, corner + Vector3.new(16, 16, 16)),
		4,
		voxels.materials,
		voxels.occupancy
	)
end)
```

## Best Practices

To apply the maximum benefits of parallel programming, refer to the following best practices when adding your Lua code:

- **Avoid Long Computations** — Even in parallel, long computations can block execution of other scripts and cause lag. Avoid using parallel programming to handle a large volume of long, unyielding calculations.

   <img src="../assets/scripting/scripts/ParallelExecutionDark.png" width="100%" alt="Diagram demonstrating how overloading the parallel execution phase can still cause lag" />

- **Use the Right Number of Actors** — For the best performance, use more `Class.Actor|Actors`. Even if the device has fewer cores than `Class.Actor|Actors`, the granularity allows for more efficient load balancing between the cores.

   <img src="../assets/scripting/scripts/FewerVsMoreActorsDark.png" width="100%" alt="Demonstration of how using more actors balances the load across cores" />

   This doesn't mean you should use as many `Class.Actor|Actors` as possible. You should still divide code into `Class.Actor|Actors` based on logic units rather than breaking code with connected logic to different `Class.Actor|Actors`. For example, if you want to enable [raycasting validation](#server-side-raycasting-validation) in parallel, it's reasonable to use 64 `Class.Actor|Actors` and more instead of just 4, even if you're targeting 4-core systems. This is valuable for scalability of the system and allows it to distribute the work based on the capability of the underlying hardware. However, you also shouldn't use too many `Class.Actor|Actors`, which are hard to maintain.
