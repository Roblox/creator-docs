---
title: Experience configs
description: Configs let you update in-game values without restarting your servers.
---

**Experience configs** let you update in-game values in real time without restarting servers:

- Turn features on and off, such as enabling or disabling a new onboarding dungeon.
- Tune in-game values like boss health, experience gain, or item prices.
- Launch timed content, such as a Halloween event that starts at midnight.

Configs take the form of keys and values. Rather than using hard-coded constants in your code, you can use the key to get a value (string, number, boolean, or JSON object) and then update that value whenever you'd like without publishing a new version of your experience. The required code changes are minimal:

```lua
local ConfigService = game:GetService("ConfigService")
local configSnapshot = ConfigService:GetConfigAsync()
local myValue = configSnapshot:GetValue("my_key_name")
```

You can have up to 1,000 active configs at any given time and manage them on Creator Hub or in Roblox Studio.

![Overview of the Configs page on Creator Hub](../assets/analytics/configs/configs-overview.png)

## Create and edit configs

1. On the [Creator Hub](https://create.roblox.com/dashboard/creations) **Configs** page for your experience, click **Create config**.
1. Specify a key, a type, a value, and optionally, a description to help you or your team later identify the purpose of the config. Supported types are string, number, boolean, and JSON object.

1. Copy the generated code snippet into a server script in your experience, likely in `Class.ServerScriptService`. The code should look something like this:

   ```lua
   local ConfigService = game:GetService("ConfigService")

   local configSnapshot = ConfigService:GetConfigAsync()
   local MY_KEY = "my_key" -- optional, store the config key as a constant
   local myValue = configSnapshot:GetValue(MY_KEY)
   ```

1. Use the value like you would any other variable. Configs **do nothing** unless you use them within your code.

For more information about working with configs in your scripts, see [Add configs to your code](#add-configs-to-your-code).

Editing a config is no different from creating one. Click the **Edit** button and update the value and description as-desired.

### Limits

Config values have the following limits by type.

Type | Maximum size
:--- | :---
String | 100,000 characters
Number | ±1.7976931348623157e+308, ±2^53 for exact integer representations
Boolean | N/A
JSON | 100,000 characters

## Publish configs

After you create a config, it moves to a **staged** state so that you can test it before it becomes publicly available. Staged changes are available to you and your team in Studio play sessions, not to players in live experiences. The **Configs** page on Creator Hub shows all active and staged changes.

<img src="../assets/analytics/configs/configs-publish.png" width="800" alt="The Configs page showing unpublished changes" />

1. After you test your staged changes, click **Publish now** to publish to all players within five minutes. You can also choose **Publish over 15 min** if you prefer a longer rollout period.
1. (Recommended) Add a descriptive publish message that indicates what you updated. This message appears on the **History** page and can help you and your team later identify the purpose of the change.

## Create and edit configs in Studio

If you prefer, you can create, edit, stage, and publish configs in Roblox Studio. Click **File** > **Open Configs**. The Studio interface is particularly convenient for staging and testing new values.

<img src="../assets/analytics/configs/configs-studio.png" width="600" alt="Studio window for working with configs" />

## View history and restore configs

On the **Configs** page, click **History** to see past updates. Each update has the time and date of the change, who made the change, and the publish message.

![The history page with diff expanded for a config value](../assets/analytics/configs/configs-history.png)

- Expand each row to see the key, the value before the change, and the value after it.
- Use the **Search Key** box to search for keys—not descriptions or values, just keys.

The **History** page also lets you restore configs to a previous state:

1. Click **Restore** next to the change to stage the "before" value. Note that restoring a config discards any existing staged changes.
1. Return to the **Configs** page and [publish the config](#publish-configs).

## Add configs to your code

The main class for working with configs is `Class.ConfigService`, which fetches the latest keys and values for your experience. `ConfigService` is only available to server scripts. Attempting to call its methods from a client script results in an error.

The first step to working with configs is to retrieve a `Class.ConfigSnapshot`, the latest values for all configs at the current point in time. There are two methods for getting a snapshot:

- `Class.ConfigService:GetConfigAsync()` is for global configs that you want to apply to all players in the experience:

  ```lua
  local ConfigService = game:GetService("ConfigService")
  local configSnapshot = ConfigService:GetConfigAsync()
  local bossHealth = configSnapshot:GetValue("bossHealth")
  ```

- `Class.ConfigService:GetConfigForPlayerAsync()` is for [experiments](experiments.md). It fetches player-specific configs so that different players can get different values.

  ```lua
  local ConfigService = game:GetService("ConfigService")
  local Players = game:GetService("Players")

  local function onPlayerAdded(player)
      local playerConfigSnapshot = ConfigService:GetConfigForPlayerAsync(player)
      local bossHealth = playerConfigSnapshot:GetValue("bossHealth")
  end

  Players.PlayerAdded:Connect(onPlayerAdded)
  ```

In either case, if the key doesn't exist, `Class.ConfigSnapshot:GetValue()` returns nil.

### Refresh snapshots

`Class.ConfigSnapshot|ConfigSnapshots` represent a point in time, the state of the config when you requested the snapshot. To avoid disrupting gameplay, updates to a config do **not** automatically propagate to snapshots. In a competitive shooter, for example, you might only want new config values between rounds so that weapon attributes don't fluctuate mid-match.

To get the latest values manually, use the `Class.ConfigSnapshot:Refresh()` method. Optionally, connect a function to the `Class.ConfigSnapshot.UpdateAvailable` event to automatically refresh:

```lua
configSnapshot.UpdateAvailable:Connect(function()
    configSnapshot:Refresh()
end)
```

After you refresh a snapshot, you can use `Class.ConfigSnapshot:GetValueChangedSignal()` to listen for changes to a specific key so that you can update your experience's code:

```lua
configSnapshot:GetValueChangedSignal("bossHealth"):Connect(function(newHealthValue)
    spawnNewBoss(newHealthValue)
end)
```

### Error handling

In rare cases when the config fails to load and has never been loaded before, `Class.ConfigService:GetConfigAsync()` throws an error.

If `Class.ConfigService` loses connection to the Roblox servers after it was previously loaded, `Class.ConfigService:GetConfigAsync()` returns a snapshot with the latest available values. These snapshots attempt to reconnect and fire the `UpdateAvailable` event when they successfully load new updates.

How you handle these uncommon situations is up to you. You can wrap the call in a `Global.LuaGlobals.pcall()` and have fallback values in your code, show the player an error and wait for the snapshot to reconnect, or some other solution.

## Test configs

`Class.ConfigService` has built-in methods for temporarily testing config changes both in Studio and on live servers without impacting the entire experience.

To set a local test value, call `Class.ConfigService:SetTestingValue()` from a server script or through the [Developer Console](../studio/developer-console.md). Changes to test values trigger a config update along with the `Class.ConfigSnapshot.UpdateAvailable` signal. Just like a production update, you must refresh existing snapshots to get the test value:

```lua
local ConfigService = game:GetService("ConfigService")
ConfigService:SetTestingValue("bossHealth", 200)

local configSnapshot = ConfigService:GetConfigAsync()
local bossHealth = configSnapshot:GetValue("bossHealth") -- Now 200!
```

Test changes apply for the lifetime of the current server and do not propagate to other servers. In Studio, they apply to the current play session and do not affect live servers. You can manually clear test changes with `Class.ConfigService:ClearTestingValue()`.
