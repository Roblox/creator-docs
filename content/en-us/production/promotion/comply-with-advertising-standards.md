---
title: Advertising standards
comment: Changes to this article require additional review
description: Explains ad content, disclosure, data privacy, user safety, and ad system integrity requirements.
---

Roblox's **advertising standards** aim to foster a more transparent, safe, and civil experience for users, advertisers, and publishers of advertising content. Together, each standard works to create a positive experience on the platform, whether that applies to what type of ad content users can interact with, how they can identify it as an ad, or if they're even able to see ads at all.

Roblox's advertising standards apply to every ad on Roblox, regardless if it's a [Roblox-served ad or independent ad](../../production/promotion/advertise-on-roblox.md), but when you choose to independently publish advertising content outside of Roblox's advertising products, it's your responsibility as the ad publisher to ensure that your ad content adheres to these policies, including Roblox's [Terms of Use](https://en.help.roblox.com/hc/articles/115004647846), [Community Standards](https://en.help.roblox.com/hc/articles/203313410), [Independent Advertising Policy](https://en.help.roblox.com/hc/articles/203313410#independent-advertisement-publishing), and [Advertising Standards](https://en.help.roblox.com/hc/articles/13722260778260), as well as any applicable laws or regulations across jurisdictions.

This guide outlines the content, disclosure, data privacy, user safety, and overall ad system integrity requirements you must meet in order for your ads to serve on Roblox, such as:

- Ensuring your advertising only includes policy-compliant content.
- Clearly disclosing that your content is advertising.
- Hiding, replacing, or blocking ads from users who are ineligible to receive ads.
- Engaging the ad system with integrity, both as a publisher and advertiser.
- Not using third-party advertising services.

<Alert severity="warning">
   If you fail to comply with any of these advertising standards, Roblox may suspend your experience and/or account.
</Alert>

## Content requirements

For the safety and well-being of all Roblox users, you must ensure that your ads only contain content that doesn't expose them to dangerous, illegal, fraudulent, or otherwise harmful products, services, or messaging. For example, ad content must not contain any hint of child endangerment, violence, or personally identifiable information, otherwise you are in direct violation of Roblox's advertising standards.

For a full list of what types of content ads cannot include, see Advertising Standards' [Prohibited Advertising Practices and Content](https://en.help.roblox.com/hc/articles/203313410#prohibited-advertising-practices-and-content) section.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/promotion/misc/GoodContent.jpg" />
    <figcaption>
      <Alert severity="success">This ad includes content that complies with Roblox policies, and it clearly discloses that it's an ad.</Alert>
    </figcaption>
  </figure>
  <figure>
    <img src="../../assets/promotion/misc/BadContent.jpg" />
    <figcaption>
      <Alert severity="error">This ad includes content that doesn't comply with Roblox policies because it leads users off platform with a phone number, and the phone number could potentially be personally identifiable information.</Alert>
    </figcaption>
  </figure>
</GridContainer>

## Disclosure requirements

If you believe your content is advertising, you must clearly disclose it as advertising in a way that Roblox users will understand in their language. In addition, you must ensure that your disclosures don't replicate ad disclosures from official Roblox advertising products because it might confuse users on which ads are from independent advertising campaigns rather than [official Roblox-served ads](../../production/promotion/advertise-on-roblox.md#roblox-served-ads).

For example, the following disclosure is sufficiently different from Roblox's disclosures because it includes a different font and color.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/promotion/misc/GoodDisclosure.jpg" />
    <figcaption>
      <Alert severity="success">This ad's disclosure is clear, legible, and doesn't replicate Roblox's official ad disclosure.</Alert>
    </figcaption>
  </figure>
  <figure>
    <img src="../../assets/promotion/misc/BadDisclosure.jpg" />
    <figcaption>
      <Alert severity="error">This ad's disclosure doesn't state that it's an ad, it's difficult to read, and it replicates Roblox's official ad disclosure.</Alert>
    </figcaption>
  </figure>
</GridContainer>

<Alert severity="info">
   Roblox's [localization tools](../../production/localization/index.md) are a great starting point to making sure users can read your ad disclosures in many languages.
</Alert>

## Data privacy requirements

To protect user privacy and their experience on the platform, it's of the utmost importance that you retain complete control of independent ad content within your experiences. This means that you cannot serve ad content that you didn't directly upload within your own Roblox experiences, and you cannot insert any code within your experiences that makes programmatic calls to third-party ad servers, even for analytics.

## User safety requirements

By maintaining complete control over your independent ad content, you can also take the mandatory precautions to protect users from ad content that they shouldn't have access to. To determine when these precautions are necessary, you must use `Class.PolicyService.GetPolicyInfoForPlayerAsync`, which returns a dictionary of values that determine whether certain aspects of the experience need to change for that unique user. One entry within the policy information is `AreAdsAllowed`, a boolean that represents whether a user is eligible to see ads. Ads can remain visible if `AreAdsAllowed` returns true, but if `AreAdsAllowed` returns false, you must include additional logic to hide, replace, or block the ads so those users cannot interact with the ad content.

To demonstrate what this can look like, the following images take place in an experience where the non-playable character's dialog text is an ad. The first image displays the ad text that displays to users who are eligible to see ads, and the second displays replacement text that displays to users who aren't eligible to see ads. By using the `AreAdsAllowed` boolean, the creator of the experience can programmatically verify user eligibility to see ads, then change the ad content context accordingly to align with each user's requirements.

<GridContainer numColumns="2">
  <figure>
    <img src="../../assets/promotion/misc/User-Safety-O13.jpg" />
    <figcaption>The character's ad dialog text displays to users who are eligible to see ads.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/promotion/misc/User-Safety-U13.jpg" />
    <figcaption>The character's ad dialog text switches to generic content for users who aren't eligible to see ads.</figcaption>
  </figure>
</GridContainer>

If you believe all the content in your experience collectively constitutes an ad, you must prevent users ineligible to receive ads from viewing the content. For example, the following `Class.Script` checks every user's eligibility to see ads as they enter the experience using `Class.PolicyService.GetPolicyInfoForPlayerAsync`. If `AreAdsAllowed` returns false, the experience disconnects the user from the experience and provides a message informing the user that they are ineligible to access the experience.

```lua
local Players = game:GetService("Players")
local PolicyService = game:GetService("PolicyService")
local Workspace = game:GetService("Workspace")

local player = Players.LocalPlayer


-- Get the policy info for the user
	local success, result = pcall(PolicyService.GetPolicyInfoForPlayerAsync, PolicyService, player)
	if success and result then
		if not result.AreAdsAllowed then

			-- Remove ineligible user from accessing the experience
			player:Kick("You are ineligible to access the experience.")
		end
	else
		print("Failed to get policy for player", player.Name, "Exception:", result)
	end
```

## Ad system integrity requirements

If you have advertising content in your experience, whether it's Roblox-served or independent ad content, you are an ad publisher, and as an ad publisher, you must engage the ad system with integrity. This means that you cannot abuse the ad system, such as:

- Leveraging bots or large scale ad engagement campaigns in order to create fraudulent impressions for ads.
- Misclassifying experience metadata in order to deceptively increase ad delivery to users.
- Obscuring disclosures in a way that makes users believe they are engaging with non-advertising content.

Any of the previous actions may result in Roblox suspending your experience and/or account, as well as revoking any ad payout related to fraudulent impressions or traffic to your experience. For more information, see Advertising Standards' [Publisher Integrity](https://en.help.roblox.com/hc/articles/13722260778260#publisher-integrity) section.
