---
title: Third-Party Analytics Services
description: Explains how to use third-party analytics services to monitor and create custom events for your experience.
---

In addition to the built-in [Analytics Dashboard](../../production/analytics/analytics-dashboard.md), you can also monitor analytical data for an experience through third-party analytics services, such as **Google Analytics** and **Microsoft Azure Playfab**.

## Google Analytics

[**Google Analytics**](https://analytics.google.com) is a third-party platform that you can use to monitor experience-related data post-launch, including finding bugs in your code, discovering pain points for users, and tracking user satisfaction with updates. For in-depth information on in-app usage, refer to the [documentation](https://developers.google.com/analytics) of Google Analytics.

<Alert severity="info">
For in-depth information on in-app usage, refer to Google Analytics' <a href="https://developers.google.com/analytics">documentation</a>.
</Alert>

### Monitoring Experience Data Using Google Analytics

To use Google Analytics to monitor analytics metrics of your experience, you need to [enable HTTP Requests](#enabling-http-requests) in Studio, [getting tracking IDs](#getting-tracking-ids) from Google Analytics, and adding custom events to [track your Roblox places](#tracking-places).

#### Enabling HTTP Requests

Before you can use Google Analytics to monitor an experience's data, you must first enable `Class.HttpService` within Studio. This service allows experiences to integrate with off-Roblox web services, and permits HTTP requests to be sent from experience servers.

<Alert severity="warning">
You should only send HTTP requests to trusted third-party platforms to avoid making your experience vulnerable to security risks.
</Alert>

To enable HTTP requests:

1. In the **Home** tab of the menu bar, navigate to the **Settings** section and click **Game Settings**. The **Game Settings** menu displays.

   <img src="../../assets/studio/general/Home-Tab-Game-Settings.png" width="800" alt="Game Settings button indicated in Home tab" />

2. In the left-hand navigation of the **Game Settings** menu, click **Security**.
3. Enable the **Allow HTTP Requests** toggle.
4. Click the **Save** button.

#### Getting Tracking IDs

After you [enable HTTP requests](#enabling-http-requests) within Studio, you'll need a **tracking ID** from Google Analytics that allows you to analyze aspects of your experience. You only need one tracking ID per experience, as it is shared between all places within an experience. To generate a tracking ID, you must first sign up for a [Google Analytics](https://analytics.google.com) account.

<Alert severity="warning">
By default, Google Analytics assigns your account a measurement ID instead of a tracking ID. To ensure your account has a tracking ID, you must enable the <strong>Create a Universal Analytics property</strong> toggle under <strong>Advanced Options</strong> in the <strong>Property Setup</strong> stage of the sign-up process.
</Alert>

Aside from the following fields, most of the Google Analytics set-up information is not relevant to using Google Analytics to monitor your experience on Roblox, so only enter or enable additional fields or toggles if they are specifically relevant to you.

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Guidelines</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Account Name</td>
      <td>A <strong>non-specific</strong> name for your account, such as "Roblox Experiences". Note that one account can hold multiple tracking IDs.</td>
    </tr>
    <tr>
      <td>Property Name</td>
      <td>A <strong>specific</strong> name for what you want to analyze. For example, if you only want to track one place in your experience, you should name this property the place's name. You can change this name at any time, as well as add additional properties.</td>
    </tr>
    <tr>
      <td>Create a Universal Analytics property</td>
      <td>Google Analytics's term for a <strong>tracking ID</strong>. You can find this item by selecting <strong>Advanced Options</strong> in the <strong>Property Setup</strong> stage.</td>
    </tr>
    <tr>
      <td>Website URL</td>
      <td>A valid web address. You can enter anything here as the site itself will not be tracked.</td>
    </tr>
    <tr>
      <td>Industry Category</td>
      <td>The account type that Google analytics should track. Select <strong>Games</strong> or the type matching your experience content.</td>
    </tr>
  </tbody>
</table>

Once you create your account with the previous settings, your tracking ID generates. To get the tracking ID:

1. In the bottom left-hand corner, click the icon. The **Admin** page displays.
2. In the **Property** column, select **Property Settings**. Under **Basic Settings**, the tracking ID displays in the format of `UA-#########-#`.

### Tracking Places

Now that you have a tracking ID, you can track actions and events in a place within Studio. To track a place:

1. Create a new `Class.Script` within **ServerScriptService**.
2. Paste the following lines into the script:

   ```lua
   local GA = require(153590792)
   GA.Init("UA-#########-#")
   ```

3. Replace the `UA-#########-#` with your Google Analytics' [tracking ID](#getting-tracking-ids).
4. [Publish the experience](../../production/publishing/publishing-experiences-and-places.md).

If you want a more fine-tuned approach, you can also pass a **`config`** table to the **`GA.Init()`** function:

```lua
local config = {
	-- Report or omit script errors (set as 'true' to omit)
	DoNotReportScriptErrors = false,
	-- Report or omit a 'ServerStartup' action when a server starts (set as 'true' to omit)
	DoNotTrackServerStart = false,
	-- Report or omit user visits under the 'Visit' action (set as 'true' to omit)
	DoNotTrackVisits = false
}

local GA = require(153590792)
GA.Init("UA-#########-#", config)
```

### Adding Custom Events

Once you have the tracking ID set up for a place, you can add custom in-experience events, including anything from users finding a secret area of the map to how often they use a [Developer Product](../../production/monetization/developer-products.md) or [Game Pass](../../production/monetization/game-passes.md) over another.

To report custom events to Google Analytics, use the **`ReportEvent()`** function of the **`GA`** module that you initialized in the sample `Class.Script` to [track places](#tracking-places):

```lua
local GA = require(153590792)
GA.Init("UA-#########-#")

local category = "PlaceId-" .. game.PlaceId
local action = "Category-Action"
local label = "none"
local value = 1

GA.ReportEvent(category, action, label, value)
```

The `GA.ReportEvent()` call requires four parameters:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>category</td>
      <td>Defines a group with similar characteristics. The default value is <InlineCode>"PlaceId-" .. game.PlaceId</InlineCode>, yielding a string like <InlineCode>PlaceId-5432167890</InlineCode>, but you can specify a more descriptive category like <InlineCode>"GameItemActions"</InlineCode>.</td>
    </tr>
    <tr>
      <td>action</td>
      <td>Defines a specific action related to a category. For example, the category <InlineCode>"GameItemActions"</InlineCode> might have an <InlineCode>action</InlineCode> value of <InlineCode>"Equipped"</InlineCode>. This value displays in Google Analytics as Event Action.</td>
    </tr>
    <tr>
      <td>label</td>
      <td>Defines a specific detail about a category or action. For example, the category <InlineCode>"GameItemActions"</InlineCode> with an <InlineCode>action</InlineCode> value of <InlineCode>"Equipped"</InlineCode> might label the item that was equipped as "Ice Wand". This value displays in Google Analytics as Event Label.</td>
    </tr>
    <tr>
      <td>action</td>
      <td>Defines a specific value associated with the event. For example, you can keep count of how many times a user who <strong>equips</strong> an item actually <strong>uses</strong> it, then report that value to Google Analytics with an <InlineCode>action</InlineCode> value of <InlineCode>"TimesUsed"</InlineCode>, helping you understand if users enjoy using the item.</td>
    </tr>
  </tbody>
</table>

After you add your custom events to Google Analytics, you can create and manage custom reports to see real-time statistics as users access your experience and trigger those events. You can also monitor user behavior over a period of time to analyze data trends. For more information, see the [Google Analytics Documentation](https://developers.google.com/analytics).

After setting up a custom report, it generates a graph displaying events that update as they happen within your experience. By default, displayed Lua error indicators and **Event Actions**, including server starts actions, and user `Class.Visit|Visits` in charts and tables, but you can customize the display settings using the `config` table in your script for [tracking places](#tracking-places).

<img src="../../assets/analytics/third-party-analytics/google-analytics-event-action.png" width= "100%" />

## PlayFab

[**Microsoft Azure PlayFab**](https://playfab.com/) is a third-party platform that you can use to leverage data analytics to attract users, generate revenue, and improve engagement. You can create custom events, metrics, reports, and segmentation using PlayFab by referring to its <a href="https://docs.microsoft.com/en-us/gaming/playfab/features/analytics/reports/quickstart">documentation</a>.

### Legacy PlayFab

<Alert severity="error">
Legacy PlayFab program is no longer onboarding new users.
</Alert>

If you have enrolled in the Legacy PlayFab program, an analytics service for experiences on Roblox that is different from the retail version of PlayFab, you can monitor real-time analytical data of your experience on the PlayFab dashboard and use `Class.AnalyticsService` to write custom queries and send custom events to monitor and improve your experiences.

When you click on an experience's module on the Legacy PlayFab dashboard, the **Overview** page displays analytical data unique to your experience by the following categories:

- Unique Users
- API Calls
- Logins
- New Users
- Reports

<img src="../../assets/analytics/third-party-analytics/playfab-summary.png" width= "80%" />

#### Sending Custom Events

`Class.AnalyticsService` allows you to report custom in-experience events, such as users choosing their favorite battlefield and using a [Developer Product](../../production/monetization/developer-products.md) or [Game Pass](../../production/monetization/game-passes.md) over another. By default, some basic user lifecycle data automatically reports to PlayFab, such as when a new user joins the experience.

To report a custom event to PlayFab Analytics, use the `Class.AnalyticsService:FireEvent()|FireEvent()` method from a `Class.Script` or `Class.ModuleScript`, specifying both a category and value, which can be a string, number, or a table of values.

`Class.AnalyticsService` has the following four standard events methods:

- `Class.AnalyticsService:FireInGameEconomyEvent()|FireInGameEconomyEvent()` - Fires an event to track user actions pertaining to the in-experience economy.
- `Class.AnalyticsService|FirePlayerProgressionEvent()` - Fires an event to track user progression through the experience.
- `Class.AnalyticsService:FireLogEvent()|FireLogEvent()` - Fires a log event to track errors and warnings experienced by users.
- `Class.AnalyticsService:FireCustomEvent()|FireCustomEvent()` - Fires a custom event with a custom event name and data.

The following example uses `Class.AnalyticsService:FireInGameEconomyEvent()|FireInGameEconomyEvent()` to invoke an analytics economy event when a user touches a `gold` `Class.Part`:

```lua
local gold = script.Parent
local AnalyticsService = game:GetService("AnalyticsService")

gold.Touched:Connect(function (otherPart)
	local player = game.Players:GetPlayerFromCharacter(otherPart.Parent)
	if player == nil then return end

	local location = {
		["Map"] = "someMap",
		["Position"] = tostring(gold.Position)
	}

	AnalyticsService:FireInGameEconomyEvent(
		player,
		"Sword", -- item name
		Enum.AnalyticsEconomyAction.Spend,
		"Weapon", -- itemCategory
		2020, -- amount of Gold
		"Gold", -- currency
		location,
		{ SomeCustomKey = "SomeCustomValue"}) -- optional customData
end)

```

If the built-in event types don't fit your needs, use `Class.AnalyticsService:FireCustomEvent()` and monitor your experience's activity with custom events and custom data.

<Alert severity="warning">
Generating a custom chart requires writing a custom query.
</Alert>

#### Adding Users

You can add additional trusted users to your Legacy PlayFab dashboard to monitor your experiences' analytical data through the following steps:

1. Navigate to the PlayFab dashboard.
2. To the right of your studio's name, click on the icon. A contextual menu displays.
3. Select **Users**. The **All Users** page displays.
4. Click the **Add user** button to navigate to the **Add New User** page.

   <img src="../../assets/analytics/third-party-analytics/playfab-add-user-button.png" width= "85%" />

5. In the **Settings** section, enter the new user's email address, then enable any applicable checkboxes.
6. In the **Game Roles** section, click the Assign roles button, then select **Admin** and/or **Dashboard**. You can also add custom roles for more granular permissions.
7. Click the **Add user** button to add the new user.
