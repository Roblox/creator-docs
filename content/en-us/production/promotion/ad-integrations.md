---
title: Ad integrations
description: Ad integrations are advertisements that aren't part of Roblox's built-in ad products and that promote products or services outside of an game or off Roblox.
---

<Alert severity="info">
This policy will go into effect on May 4, 2026.
</Alert>

**Ad integrations** are ads that you incorporate into your game, whether through custom content or branded assets. These can include:

- **Custom ad content** that doesn't use Roblox ad formats, like immersive billboards, portals, or rewarded video.
- **In-game self-promotional assets that count as advertising**, like brand partnerships or promoting your own off-platform products and services. This includes creator-owned merchandise related to your game (for example, apparel or physical items featuring your game or characters).

## Is your content advertising?

Roblox classifies content as an ad if the content:

- Is published in exchange for any form of compensation to promote a brand, product, service, event, or persona.
- Includes calls to action or promotes demand, attributes, information, or availability for specific off-platform products, services, events, or personas.

If any of your assets meet either of these criteria, you must register, label, and submit them through the ad integration registration process, even if you're promoting your own content inside your game.

For more information on what counts as advertising, see the Advertising section in the [Roblox Community Standards](https://about.roblox.com/community-standards).

## Requirements

To run ad integrations in your game, you must:

- Make sure all ad integrations comply with the [Community Standards](https://about.roblox.com/community-standards) and [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards).
- Submit all assets associated with your ad integration campaign to Roblox for review and approval before exposing them to users.
- Clearly and prominently disclose when content is an ad using simple, easy-to-understand language.
- Not include misleading or deceptive content to encourage user engagement (for example, offering free Robux).
- Only show [rewarded video ads](./rewarded-video-ads.md) to users 13 and older.

<Alert severity="warning">
Any violation of these requirements may lead to moderation actions, including (but not limited to) account suspension, removal of content, or loss of eligibility to publish ads.
</Alert>

## Submit your ad integration

Running an ad integration is simple and involves four key steps:

- [Campaign registration in Ads Manager](#campaign-registration)
- [Asset creation](#asset-creation)
- [Asset deployment](#asset-deployment)
- [Asset submission and moderation](#asset-submission-and-moderation)

This process helps make sure that your users receive clear and appropriate disclosures about what content is an ad, why they're seeing it, and who is responsible for it.

### Campaign registration

To register your ad integration campaign:

1. Go to the [Ads Manager](https://ads.roblox.com) portal while signed into your Roblox account.
2. Go to **Ad integrations**.
3. Click **Register**.
4. Under **Integration details**:
    1. Select the game you want to add the integration to.
    2. Enter the name of the advertiser. This is the name users see in ad disclosures within your game.
    3. Select an advertiser category from the drop-down options. If your advertiser doesn't fit into any of the available categories, select **None of the above**. The moderation team will review your submission and may update the category if needed.
    4. Select a start and end to the campaign.
    5. Enter a name for the campaign.
5. Under **Assets**:
    1. Click **Manage assets**.
    2. Enter the asset IDs for all assets included in the ad campaign. If you haven't created them yet, you can register the campaign without assets and [add them later](#asset-submission-and-moderation).
    3. Click **Save**.
6. Click **Register**.

<img src="../../assets/promotion/ad-integrations/AdIntegrations-Registration.png" width="80%" />

Before the campaign begins, you can edit the start date, end date, campaign name, and advertiser name. Once the campaign starts, only the end date can be updated.

We recommend registering campaigns as early as possible and submitting them at least 5 days before the campaign start date.

### Asset creation

You can create ad integration assets before or after registering a campaign. To associate assets with a campaign, [create them in Studio](../../projects/assets/index.md) and use their asset ID during the campaign registration.

If you register a campaign without assets, make sure to edit the campaign and associate the assets before the campaign goes live.

### Asset deployment

Before an ad integration campaign can go live, make sure all registered and moderated assets are implemented in your game. You must check user eligibility and add the required ad labeling and disclosure.

#### User eligibility

Check whether users are eligible to see the ad assets using `Class.AdService.GetCampaignEligibilityAsync|GetCampaignEligibilityAsync`.

```lua
local success, result = pcall(function()
    return AdService:GetCampaignEligibilityAsync("your-campaign-id")
end)

if success and result.IsEligible then
    print("The local player is eligible to see your campaign!")
else
    print("The local player is not eligible— your campaign may not be shown to this player.")
end
```

If you update your game with ad assets before the campaign start date, `Class.AdService.GetCampaignEligibilityAsync|GetCampaignEligibilityAsync` will return a rejection until the campaign begins.

#### Labeling and disclosure

All ad assets have to include clear and accessible disclosure for users. To support this, Roblox provides standardized ad labels that are automatically rendered in games for assets associated with the ad integration campaign.

Ad labels indicate which parts of your experience are advertisements, and allow users to identify the advertiser or report the ad.

`Class.AdService.RegisterDisclosureButton|RegisterDisclosureButton` enables interactive disclosure when a user clicks or taps the ad label, providing additional information about the ad. You can find the placement ID from Ads Manager in the **Manage Assets** section. For example:

```lua
AdService:RegisterDisclosureButton(yourDisclosureButton, "your-placement-id")
```

Choose the right label type based on how your ad content appears in your experience and how users interact with it. Different label types work better for different contexts.

<table>
<thead>
  <tr>
    <th>**Label type**</th>
    <th>**Description**</th>
    <th>**Example**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Floating ad label**</td>
    <td>Appears above, beside, or near an interactive 3D object in your experience. <br/><br/> Use it for freestanding, movable, or standalone sponsored objects, like branded vehicles, product displays, or charaacters within the environment.</td>
    <td><img src="../../assets/promotion/ad-integrations/AdIntegrations-FloatingLabel.png" /></td>
  </tr>
  <tr>
    <td>**HUD-style ad label**</td>
    <td>A 2D label placed on the user's screen overlay or control layer. <br/><br/> Use it for environments or areas where the entire location makes up the ad, like a branded store, a sponsored zone, or a virtual exhibition.</td>
    <td><img src="../../assets/promotion/ad-integrations/AdIntegrations-HUDLabel.png" /></td>
  </tr>
  <tr>
    <td>**Sticker-style ad label**</td>
    <td>Directly attached or embedded into the surface texture of a 3D object. <br/><br/> Use it for flat or stationary surfaces featuring branded content, like sponsored billboards, branded wall murals, columns, or architectural elements.</td>
    <td><img src="../../assets/promotion/ad-integrations/AdIntegrations-StickerLabel.png" /></td>
  </tr>
</tbody>
</table>

When placing ad labels in your experience, make sure to:

- Keep the ad label distinct and readable. The label should not be covered, distorted, or blended into surrounding visuals.
- Avoid letting nearby branding or decorative elements visually overpower the ad label. The disclosure should be the primary focus in its immediate area.
- Any aesthetic adjustments, like size or opacity, should not reduce clarity or make the label harder to recognize, interact with, or understand.
- When using subtle or highly stylized branding, make the ad label especially clear and visible on first encounter.

### Asset submission and moderation

To submit additional assets to an existing ad integration campaign:

1. In Ads Manager, go to **Ad integrations**.
2. Click **&vellip;** ⟩ **Manage assets** next to the relevant campaign.
3. Enter the IDs of the assets you want to add to the campaign.
4. Click **Save**.

Roblox reviews and moderates all submitted assets, and [their status](#asset-status) directly affects your [campaign status](#campaign-status). Moderation is typically completed within 48 hours.

<Alert severity="info">
If you add assets to an active campaign, the entire campaign will only be served to users aged 18 and over while the new assets are under review. To avoid this, create separate campaigns with fixed start and end dates for each asset drop.
</Alert>

#### Campaign status

To check your campaign status, go to the **Ad integrations** page.

<table>
<thead>
  <tr>
    <th>**Status**</th>
    <th>**Description**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Approved**</td>
    <td>The campaign has been approved for all audiences.</td>
  </tr>
  <tr>
    <td>**Completed**</td>
    <td>The campaign has reached its end date.</td>
  </tr>
  <tr>
    <td>**In review**</td>
    <td>The campaign is under review by the moderation team. While it's under review, the campaign is only shown to users aged 18 and over.</td>
  </tr>
  <tr>
    <td>**Limited**</td>
    <td>The campaign or an asset associated with the campaign has been approved for certain countries and age groups.</td>
  </tr>
  <tr>
    <td>**Paused**</td>
    <td>The campaign has been manually stopped from serving ads.</td>
  </tr>
  <tr>
    <td>**Rejected**</td>
    <td>The campaign has failed moderation review. This means that at least one registered asset violates the Roblox advertising standards.</td>
  </tr>
</tbody>
</table>

#### Asset status

Roblox also reviews and moderates all assets associated with a campaign. To check the status of your assets, go to the **Ad integrations** page and click **&vellip;** ⟩ **Manage assets** next to the relevant campaign.

<table>
<thead>
  <tr>
    <th>**Status**</th>
    <th>**Description**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**In review**</td>
    <td>The asset is under review by the moderation team.</td>
  </tr>
  <tr>
    <td>**Limited**</td>
    <td>The asset has been partially approved for certain countries and age groups. You can appeal this status.</td>
  </tr>
  <tr>
    <td>**Rejected**</td>
    <td>The asset has failed moderation review. You can appeal this status.</td>
  </tr>
</tbody>
</table>

To view the reason an asset was assigned a **Rejected** or **Limited** status, click **&vellip;** ⟩ **Appeal status** next to the asset. You can appeal the status and resubmit the asset for moderation by clicking **Appeal**.

## Ad integration tags

Ad integration tags categorize content based on compliance with [Community](https://about.roblox.com/community-standards) and [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards). During the moderation process, each ad asset is assigned one or more tags that determine the eligible audience for the campaign.

Tags have one of the following serving outcomes:

- **Rejected**: The entire campaign is prohibited under the Advertising Standards or contains content that violates the Community Standards, and can't be served to users.
- **Limited serving**: The entire campaign can only be served to specific users, and might be restricted by region or age.
- **Full serving (Approved)**: The entire campaign is approved and can be served to all relevant users.

**Campaign eligibility is determined by the most restrictive asset label applied to any of your registered assets.** If one asset is rejected, `Class.AdService.GetCampaignEligibilityAsync|GetCampaignEligibilityAsync` returns `false` for all users.

For a full list of prohibited, regulated, and restricted advertising content, see the [Advertising Standards](https://en.help.roblox.com/hc/en-us/articles/13722260778260-Advertising-Standards#prohibited-advertising-content).
