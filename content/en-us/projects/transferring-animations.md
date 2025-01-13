---
title: Transferring Roblox Animations
description: Transfer animations when you transfer your experience to a new group owner.
---

<Alert severity="warning">
The instructions on this page make use of a third-party tool. Roblox does not officially support this tool and is not responsible for its availability, updates, or functionality.
</Alert>

In Roblox, animations are locked to experiences owned by users who also own those animations. To prevent animations from breaking when you transfer your experience to a group, you must publish your animation assets to the new experience group owner.

If you have a large number of animations to upload, you can use the community-supported tool [Roblox Animation Transfer](https://github.com/evaera/roblox-animation-transfer) to re-upload the animations and map their old `Class.Animation.AnimationId|AnimationIds` to their new corresponding `Class.Animation.AnimationId|AnimationIds`.

## Prerequisites

Before transferring your animations, you must have `npx` installed. `npx` lets you run commands from packages without having to install those packages on your system. To check for `npx`, install `node.js` and run `npx –version` in a terminal window.

For more information about prerequisites, see the [Roblox Animation Transfer README](https://github.com/evaera/roblox-animation-transfer?tab=readme-ov-file#roblosecurity).

## Mapping AnimationIds to Names

If your animations are stored as Animation instances under pre-prepared Character models in your experience, you can generate a text file to map the `Class.Animation.AnimationId|AnimationIds` to their corresponding names.

1. In Roblox Studio, run the following script. Studio outputs the result as a single long string.

	```lua
	local Workspace = game:GetService("Workspace")
	
	local ANIMSTRING = ""
	
	for _, character in Workspace:GetChildren() do
		  if not character:IsA("Model") then
			  continue
		  end
	
		  local animations = character:FindFirstChild("Animations")
		  if not animations then
			  continue
		  end
	
		  for _, animation in animations:GetChildren() do
			  local animationId = string.match(animation.AnimationId, "%d+")
			  if animationId then
				  ANIMSTRING ..= (animationId .. " " .. character.Name .. "_" .. string.gsub(animation.Name, " ", "_") .. "\n")
			  end
		  end
	end
	
	print(ANIMSTRING)
	```

2. Create a new text file on your computer.
3. Paste the string output by Studio into the text file.
4. Clean up any discrepancies like extra `-Edit` and `-Studio` strings that have been automatically added to the file content.
5. Replace all spaces with underscores to limit the number of moderated names overall.

## (Optional) Preparing Text Files

Roblox has an internal rate limit for animation uploads. The Roblox Animation Transfer tool doesn't respect this rate limit, which can cause issues during the transfer process and break your final text file. For example, you might transfer 1200 animations but end up with only 900 of them and no way of determining which ones failed to transfer.

To make sure the final file doesn't break, you can:

1. Split your text file into multiple files with up to 200 animations in each.
2. Use the Roblox Animation Transfer tool on each individual file. To prevent any major rate-limit problems, wait a few minutes in-between each batch.

## Transferring Animations

After your text files are ready, start the transfer process:

1. Open a terminal window.
2. Run `npx roblox-animation-transfer --inFile animations.txt --group YOUR_GROUP_ID --outFile newAnimations.txt`.
   - `--inFile` must point to the file with the animations you want to upload. This file can be either the large text file you initially created, or the first of several smaller files if you chose to break the larger file down.
   - `--group` must point to the `GroupId` of the group receiving the animation transfer. You can find the group ID in the URL of the group on the Roblox website.
   - `--outFile` must point to the file you want to put the new animations in.

If the transfer process is successful, the animations in the `outFile` are listed in the same order they were provided in the `inFile`. If a number of animations fail to transfer, the tool attempts to transfer them again; if this second attempt is successful, these animations are appended to the end of the list in the `outFile`.

## Loading Animations at Runtime

After transferring your animations to the new group owner, you must swap the old animations for the new animations.

1. In Studio, create an `Animations` module.
2. Create two child modules, one corresponding to the user, or the original owner, and the other corresponding to the group, or the new owner.
3. To prevent the experience from breaking if you choose to publish it to another location, run the following script. By default, the script returns the user's animations.

	```lua
	local module = {}
	local GROUP_ID = 12345678
	local gameContext = {
		["User"] = require(script:WaitForChild("Animations_User")),
		["Group"] = require(script:WaitForChild("Animations_Group"))
	}
	
	local function getAnimationMapForGameContext()
		if game.CreatorType == Enum.CreatorType.Group and game.CreatorId == GROUP_ID then
			return gameContext.Group
		end
		return gameContext.User
	end
	
	local animationMap = getAnimationMapForGameContext()
	function module.getAnimation(animName: string)
		return animationMap[animName]
	end
	
	return module
	```

4. Turn the generated text files into animation maps in Studio.
   1. Replace the animation list inside the `animFileText` variable with the contents of the text file that you want to change into an animation map.
   2. Run the following script to return a string:

	```lua
	local animFileText = [[
	4215167 Animation_Name_1
	6171235 Animation_Name_2
	1251267 Animation_Name_3
	]]
	
	local function convertFileToAnimationMap(animFileText: string)
		local NEW_ANIMATION_MAP = ""
	
		local lines = string.split(animFileText, "\n")
		for _, line in lines do
			local components = string.split(line, " ")
			if #components ~= 2 then
				continue
			end
	
			local animationId = components[1]
			local animationName = components[2]
	
			NEW_ANIMATION_MAP = string.format("%s\t[\"%s\"] = \"rbxassetid://%s\",\n", NEW_ANIMATION_MAP, animationName, animationId)
		end
	
		return string.format("return {\n%s}", NEW_ANIMATION_MAP)
	end
	
	print(convertFileToAnimationMap(animFileText))
	```

5. Create a new `Class.ModuleScript` parented to your `Animations` module.
6. Place the returned `animFileText` string inside the `Class.ModuleScript`.
7. Update the experience to source all animations through the `Animations` module by running the following script:

	```lua
	local Animations = require(PATH.TO.ANIMATIONS)
	local warriorWalk = Instance.new("Animation")
	warriorWalk.AnimationId = Animations.getAnimation("Warrior_Walk")
	```
