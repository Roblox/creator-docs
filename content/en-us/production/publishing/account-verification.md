---
title: Account Verification
description: Explains how to verify your Roblox account.
---

**Account Verification** is the process of connecting your identity on Roblox to your real world identity, either through a government ID or through your phone number. When you verify your acccount, you can publish more of each asset type and maximize their discoverability within the [Creator Marketplace](../../production/publishing/creator-marketplace.md), monetize your [plugins](../../studio/plugins.md), and access age-restricted Studio features, such as [chat with spatial voice](../../chat/spatial-voice.md).

<img src="../../assets/publishing/account-verification/Identity-Verification-Overview.jpg" width="100%" />

## Verifying through Government ID

In order to verify your account with this method, you must:

- Be at least 13 years of age.
- Have a government-issued photo ID with your picture on it, such as a driver's license, passport, or residency permit.
- Have a mobile device with a camera that can take photos of your face and ID.

**Roblox doesn't store the raw ID document nor the selfie data**. When you scan your government-issued ID for verification, the system generates an anonymized value, which allows Roblox to safely verify your identity without risking the exposure of your identity to others. For more information on the account verification process, see [Age ID Verification FAQs](https://en.help.roblox.com/hc/en-us/articles/4407276151188).

To verify your account with a government-issued ID:

1. Navigate to [Roblox.com](https://www.roblox.com/home).
1. In the top-right corner, click the **gear icon** to display a contextual dropdown menu, then select **Settings**.
1. In the **Personal** section, click the **Verify My Age** button. The **Identity Verification** dialog displays.

   <img src="../../assets/publishing/account-verification/Verify-My-Age-Button.jpg" width="80%" />

1. Scan the QR code with your mobile device, which prompts you to begin the age verification process through the third-party verification service.
1. Click the **Start Session** button. A prompt displays to request your consent to access your camera.
1. Click **Allow**.
1. As the different prompts display, use your phone to take pictures of your government-issued ID and your face. The verification service begins to process your verification data. If the service is unable to process your verification data, it prompts you to re-capture the necessary images, otherwise a success message displays and the **Verify My Age** button changes to **Age Verified**.

   <img src="../../assets/publishing/account-verification/ID-Verification-Complete.jpg" width="240" />

1. **(Optional)** Restart Studio to validate your new age verification status.

## Verifying through Phone Number

In order to verify your account with this method, you must be at least 13 years of age and have a phone number that can receive text messages. You can only use your phone number with a **single** Roblox account.

To verify your account with your phone number:

1. Navigate to [Roblox.com](https://www.roblox.com/home).
1. In the top-right corner, click the **gear icon** to display a contextual dropdown menu, then select **Settings**.
1. In the **Account Info** section, click the **Add Phone** button. The **Add Phone** dialog displays.

   <img src="../../assets/publishing/account-verification/Add-Phone-Button.jpg" width="800" />

   <img src="../../assets/publishing/account-verification/Add-Phone-Dialog.jpg" width="529" />

1. Click the **Country Code** dropdown menu, then select your applicable country code.
1. Fill in the following fields:
   - **Phone Number** – The phone number for your personal mobile device.
   - **Verify Account Password** – Your active account's password.
1. Click the **Add Phone** button. The system texts your phone a 6-digit code, and the **Verify Phone** dialog displays.

   <img src="../../assets/publishing/account-verification/Verify-Phone-Dialog.jpg" width="529" />

1. Enter the 6-digit verification code, then click the **Verify** button. After a moment, the **Phone Number** field changes to include your phone number and a **Verified** status.

   <img src="../../assets/publishing/account-verification/Phone-Verification-Complete.jpg" width="800" />

1. **(Optional)** Restart Studio to validate your new age verification status.

## Checking Account Verification Status

The `Class.Player.IsVerified` method lets you check the verification status of users accessing your experiences, allowing you to limit access to specific content, ranked queues, or even the experience itself. Because users that verify their accounts connect their Roblox identity to their real-world identity, it's much less likely they will cheat, spam, or otherwise risk being blocked from your experience, making this method especially useful for competitive and ranked experiences.

The following script checks the verification status of each player as they join the experience. If they have verified their account, the console prints **true**.

```lua
  local Players = game:GetService("Players")
  local function onPlayerAdded(player)
    print(player:IsVerified())
  end
  for _, player in pairs(Players:GetPlayers()) do
    onPlayerAdded(player)
  end
  Players.PlayerAdded:Connect(onPlayerAdded)
```
