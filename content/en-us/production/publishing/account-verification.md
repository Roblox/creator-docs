---
title: Account verification
description: Explains how to verify your Roblox account.
---

**Account verification** is the process of connecting your identity on Roblox to your real world identity, either through a government ID or through your phone number. When you verify your account, you can distribute more of each asset type and maximize their discoverability within the [Creator Store](../../production/creator-store.md), distribute audio assets under 10 seconds, monetize your [plugins](../../studio/plugins.md), and access age-restricted Studio features such as [voice chat](../../chat/voice-chat.md).

<Alert severity="warning">
**Phone number verification is not sufficient** to sell priced assets on the Creator Store. To sell priced assets, you need to verify with a [government ID](account-verification.md#verify-through-government-id) and create a seller account. For more information, see [Sell on the Creator Store](../sell-on-creator-store.md).
</Alert>

## Verify through government ID

In order to verify your account with this method, you must:

- Be at least 13 years of age.
- Have a government-issued photo ID with your picture on it, such as a driver's license, passport, or residency permit.
- Have a mobile device with a camera that can take photos of your face and ID.

Roblox uses advanced image processing technology to ensure your documents are legitimate. For more information on the account verification process, see [Age ID Verification FAQs](https://en.help.roblox.com/hc/en-us/articles/4407276151188). To learn how Roblox processes your personal and biometric data, refer to the [Roblox Privacy Policy](https://en.help.roblox.com/hc/en-us/articles/115004630823-Roblox-Privacy-and-Cookie-Policy) and [Roblox Facial Media Capture Notice](https://en.help.roblox.com/hc/en-us/articles/4412863575316-Roblox-Facial-Media-Capture-Privacy-Notice).

To verify your account with a government-issued ID:

1. Navigate to **Settings**, either on the [roblox.com](https://www.roblox.com/home) or on the Roblox app.
   1. **On web browser:** In the top-right corner, click the gear icon to display a contextual dropdown menu, then select [**Settings**](https://www.roblox.com/my/account#!/info).

   <img src="../../assets/publishing/account-verification/Account-Settings.png" width="720" alt="Account settings menu on roblox.com" />
   2. **On Roblox app:** In the bottom-right corner, click the **⋯ More** icon and select **Settings**.
2. Select the **Account Info** tab.
3. Underneath your birthday, click **Continue with ID**.
   <img src="../../assets/publishing/account-verification/Verify-Birthday.png" width="400" alt="Option to verify age with selfie or ID" />
4. Follow the instructions to complete the ID verification flow.
      <img src="../../assets/publishing/account-verification/Verify-With-ID.png" width="400" alt="Option to verify age with selfie or ID" />
   1. Allow camera access.
   2. Scan your ID document. Roblox detects what type of document you have.
      1. If there is a barcode on the back, scan and capture an image of the back of your ID.
   3. Capture a photo of yourself. This photo will be used to verify that you are the same person as the one on your photo ID.

5. When verification is complete, your verified birthday displays in **Settings** > **Account info**. Verification can take a few minutes.

## Verify through phone number

In order to verify your account with this method, you must be at least 13 years of age and have a phone number that can receive text messages. You can only use your phone number with a **single** Roblox account.

To verify your account with your phone number:

1. Navigate to [roblox.com](https://www.roblox.com/home).
1. In the top-right corner, click the gear icon to display a contextual dropdown menu, then select **Settings**.

   <img src="../../assets/publishing/account-verification/Account-Settings.png" width="720" alt="Account settings menu on roblox.com" />

1. In the **Account Info** section, click the **Add Phone** button. The **Add Phone** dialog displays.

   <img src="../../assets/publishing/account-verification/Add-Phone.png" width="780" />

1. Click the **Country Code** dropdown menu, then select your applicable country code.
1. Fill in the following fields:
   - **Phone Number** — The phone number for your personal mobile device.
   - **Verify Account Password** — Your active account's password.
1. Click the **Add Phone** button. The system texts your phone a 6-digit code, and the **Verify Your Phone** dialog displays.

   <img src="../../assets/publishing/account-verification/Verify-Phone-Dialog.png" width="678" />

1. Enter the 6-digit verification code, then click the **Continue** button. After a moment, the **Phone Number** field changes to include your phone number and a **Verified** status.

   <img src="../../assets/publishing/account-verification/Phone-Verified.png" width="780" />

1. **(Optional)** Restart Studio to validate your new age verification status.

## Check verification status by script

Within a `Class.Script`, the `Class.Player:IsVerified()` method lets you check the verification status of users accessing your experiences, allowing you to limit access to specific content, ranked queues, or even the experience itself. Because users that verify their accounts connect their Roblox identity to their real-world identity, it's much less likely they will cheat, spam, or otherwise risk being blocked from your experience, making this method especially useful for competitive and ranked experiences.

The following script checks the verification status of each player as they join the experience. If they have verified their account, the console prints `true`.

```lua
local Players = game:GetService("Players")

local function onPlayerAdded(player)
	print(player:IsVerified())
end

for _, player in Players:GetPlayers() do
	onPlayerAdded(player)
end

Players.PlayerAdded:Connect(onPlayerAdded)
```
