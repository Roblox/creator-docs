---
title: Experience configs
description: Configs let you update in-game values without restarting your servers.
---

**Experience configs** let you update in-game values in real time without restarting servers:

- Turn features on and off, such as enabling or disabling a new onboarding dungeon.
- Tune in-game values like boss health, experience gain, or item prices.
- Launch timed content, such as a Halloween event that starts at midnight.
- Give different values to different players, such as giving newer players extra armor.

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
1. Specify a key, a type, a value, and optionally, a description to help you or your team later identify the purpose of the config. Supported types are string, number, boolean, and JSON object. Click **Next**.
1. (Optional) Add targeting conditions and values. Conditions let you apply config values to users who match (or don't match) certain criteria, such as users who have never played your game or ones who speak Portuguese. To learn more, see [Target configs to specific players](#target-configs-to-specific-players).
1. Copy the generated code snippet into a server script in your experience, likely in `Class.ServerScriptService`. For "global" configs that don't differ by player, the code might look something like this:

   ```lua
   local ConfigService = game:GetService("ConfigService")

   local configSnapshot = ConfigService:GetConfigAsync()
   local MY_KEY = "my_key" -- optional, store the config key as a constant
   local myValue = configSnapshot:GetValue(MY_KEY)
   ```

   For [conditional configs](#target-configs-to-specific-players) and [experiments](experiments.md), the code is slightly different:

   ```lua
   local ConfigService = game:GetService("ConfigService")
   local Players = game:GetService("Players")
   local MY_KEY = "my_key" -- optional, store the config key as a constant

   local function onPlayerAdded(player)
       local playerConfigSnapshot = ConfigService:GetConfigForPlayerAsync(player)
       local myValue = playerConfigSnapshot:GetValue(MY_KEY)
   end

   Players.PlayerAdded:Connect(onPlayerAdded)
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

1. After you test your staged changes, click **Publish now** to publish to all players almost instantly (roughly between 15 seconds and 1 minute). You can also choose **Publish over 15 min** if you prefer a longer, more gradual rollout period. In some cases, clients may take a few minutes to reflect the changes after publishing.
1. (Recommended) Add a descriptive publish message that indicates what you updated. This message appears on the **History** page and can help you and your team later identify the purpose of the change.

## Target configs to specific players

By default, a config delivers the same value to everyone. **Conditional configs** let you deliver different values to different players based on player attributes (country, tenure, language, payer status, etc.).

Conditional configs have three parts that determine what value a player receives:

- **Conditional rules** define who matches. Each rule is a logical expression, such as "active payers in their first 30 days," that evaluates player attributes.
- **Rule ordering** defines how to pick when a player matches more than one rule. Roblox evaluates rules from top to bottom and applies the first matching branch. Rules are ordered globally, regardless of the order in which you add conditional values to an individual key.
- **Conditional values** define what a matching player gets. For each condition, you attach a value. If a player matches a rule within that condition, they receive the associated value; otherwise, they receive the config's default value.

### Supported attributes

Conditional configs support the following attributes. These attributes share the same definitions as the equivalent [filters](./analytics/analytics-dashboard.md#filter-by-metrics) and [breakdowns](./analytics/analytics-dashboard.md#view-kpi-breakdowns) in the analytics dashboards.

Attribute | Description
:--- | :---
Country | The player's geographic location.
Language | The player's language setting.
When user first played | How long ago the player first played your experience, such as 0-30 days ago or 31-90 days ago. Calculated daily.
In-experience active payer status | The player's payment activity within your experience, which lets you target different segments of paying users. Calculated daily.
Platform spender status | Whether the player is a Roblox platform-wide active spender. Calculated daily.

### Create conditional values

You add conditions when you create or edit a config. On the **Add targeting** step, add a condition:

1. Choose an existing condition or click **Create a new one**.
1. Add one or more rules.
1. Set the value that matching players receive.

For example, to give a harder experience to top active payers who started playing within the last 30 days, you might increase their `dynamicBossHealth` value.

![The Add targeting step showing conditional rules for a config](../assets/analytics/configs/configs-targeting-conditions.png)

### Access targeted values in code

To retrieve targeted values, use `Class.ConfigService:GetConfigForPlayerAsync()`, which evaluates the rules and ordering for an individual player. `Class.ConfigService:GetConfigAsync()` does **not** apply targeting because it isn't specific to a single player. For more information, see [Add configs to your code](#add-configs-to-your-code).

### Best practices and limits

- Every conditional value must match the data type (boolean, string, number, or JSON) of the config's default value.
- You can have up to **100 conditions per game**.
- Each config key supports up to **20 conditions**.
- Verify rule ordering before you publish. Because rules are ordered globally, confirm that your evaluation order is prioritized correctly. To review the order, click the **Conditions** tab.

## Create and edit configs in Studio

If you prefer, you can create, edit, stage, and publish configs in Roblox Studio. Click **File** > **Open Configs** to open the widget. The Studio interface is particularly convenient for staging and testing new values.

<img src="../assets/analytics/configs/configs-widget-staged.png" width="600" alt="Studio window for working with configs" />

### Publish configs to another experience

In Studio, you can publish your configs to another experience, which completely overwrites the configs for that experience. This can be especially useful for syncing configs from a staging or development experience to the live experience.

1. In Roblox Studio, go to the top menu and select **File** > **Open Configs**.
2. In the **Published** tab of the Configs widget, click the &vellip; icon and select **Publish As**.

    <img src="../assets/analytics/configs/configs-widget-publish-as.png" width="600" alt="Studio window for working with configs" />

3. In the dialog that appears, find and select the target experience from the list of groups where you have edit permissions.
    <img src="../assets/analytics/configs/configs-widget-target-experience.png" width="300" alt="Publish configs to experiences" />

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

- `Class.ConfigService:GetConfigForPlayerAsync()` fetches player-specific configs so that different players can get different values. Use it for [conditional configs](#target-configs-to-specific-players) and [experiments](experiments.md).

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

### Autocomplete

Configs are integrated into the Script Editor's autocomplete. When you call `Class.ConfigSnapshot:GetValue()`, the editor suggests your config key names and displays each config's type when you hover over the variable name.

If your script uses `--!strict` mode, the linter can pick up and verify the type for you.

<video controls width="80%" src="../assets/analytics/configs/configs-autocomplete.mp4" />

Autocomplete also works with configs that use complex nested JSON types.

<video controls width="80%" src="../assets/analytics/configs/configs-autocomplete2.mp4" />

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
