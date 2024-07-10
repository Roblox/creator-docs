---
title: Tuples
description: Tuples are lists of values.
---

A **tuple** is a list of values. Many [methods](./functions.md#methods) and [callbacks](./functions.md#callbacks) in the [Roblox Engine API](/reference/engine) accept and return multiple values, but the API Reference says "Tuple" instead of those values.

## Parameters

If a [method](./functions.md#methods) or [callback](./functions.md#callbacks) accepts a tuple as a parameter, then it accepts multiple values. For example, the API Reference shows that the `Class.BindableFunction:Invoke()` method accepts a "Tuple" as a parameter, so it accepts multiple arguments.

```lua
BindableFunction:Invoke(1, true, "string", Vector3.new(0, 0, 0))
```

## Returns

If a [method](./functions.md#methods) or [callback](./functions.md#callbacks) returns a tuple, then it returns multiple values. For example, the API Reference shows that the `Class.Players:GetUserThumbnailAsync()` method returns a "Tuple", so it returns multiple values. The first return value is a Content URL, and the second is a [boolean](./booleans.md).

```lua
local Players = game:GetService("Players")

local userId = 156 -- builderman
local thumbType = Enum.ThumbnailType.HeadShot
local thumbSize = Enum.ThumbnailSize.Size420x420
local content, isReady = Players:GetUserThumbnailAsync(userId, thumbType, thumbSize)
print(content, isReady) -- rbxthumb://type=AvatarHeadShot&id=156&w=420&h=420 true
```
