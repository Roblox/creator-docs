---
title: Ad integrations
description: Ad integrations are advertisements that aren't part of Roblox's built-in ad products and that promote products or services outside of a game or off Roblox.
---

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
    2. Enter the IDs for all individual assets or models included in the ad campaign. If you haven't created them yet, you can register the campaign without assets and [add them later](#asset-submission-and-moderation).
    3. Click **Save**.
6. Click **Register**.

<img src="../../assets/promotion/ad-integrations/AdIntegrations-Registration.png" width="80%" />

As you fill out the form, the **Your revenue share** box updates with an estimated revenue share cost for the campaign. For more details, see [Revenue share](#revenue-share).

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

Ad labels indicate which parts of your game are advertisements, and allow users to identify the advertiser or report the ad.

`Class.AdService.RegisterDisclosureButton|RegisterDisclosureButton` enables interactive disclosure when a user clicks or taps the ad label, providing additional information about the ad. You can find the placement ID from Ads Manager in the **Manage Assets** section. For example:

```lua
AdService:RegisterDisclosureButton(yourDisclosureButton, "your-placement-id")
```

Choose the right label type based on how your ad content appears in your game and how users interact with it. Different label types work better for different contexts.

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
    <td>Appears above, beside, or near an interactive 3D object in your game. <br/><br/> Use it for freestanding, movable, or standalone sponsored objects, like branded vehicles, product displays, or charaacters within the environment.</td>
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

When placing ad labels in your game, make sure to:

- Keep the ad label distinct and readable. The label should not be covered, distorted, or blended into surrounding visuals.
- Avoid letting nearby branding or decorative elements visually overpower the ad label. The disclosure should be the primary focus in its immediate area.
- Any aesthetic adjustments, like size or opacity, should not reduce clarity or make the label harder to recognize, interact with, or understand.
- When using subtle or highly stylized branding, make the ad label especially clear and visible on first encounter.

### Asset submission and moderation

To submit additional assets or models to an existing ad integration campaign:

1. In Ads Manager, go to **Ad integrations**.
2. Click **&vellip;** ⟩ **Manage assets** next to the relevant campaign.
3. Enter the IDs of the individual assets or models you want to add to the campaign.
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

## Revenue share

<Alert severity="info">
Starting January 1, 2027, ad integration campaigns will be subject to a revenue share based on qualified visits. This revenue share applies to all campaigns that begin on or after January 1, 2027.

Revenue share costs do not apply to:

- Brands labeling their own assets as ads within games they own.
- Other aspects of a partnership outside the ad integration itself, such as influencer arrangements.
</Alert>

### Qualified visits

For active ad integration campaigns, revenue share costs are calculated based on qualified visits.

A **qualified visit** is a session in which a user engages with one or more branded assets from your campaign. Qualified visits match what Roblox reports to brands as ad engagements, based on Interactive Advertising Bureau (IAB) standards for time-in-view, occlusion, and size.

If a user engages with multiple branded assets during the same session, that session counts as a **single qualified visit**.

If the same user returns in a separate session and engages with a branded asset again, that session counts as a **new qualified visit**.

<Alert severity="info">
Reporting capabilities for ad integration campaigns will be available later this year.
</Alert>

### Cost per 1,000 visits (CPTV)

Cost per 1,000 visits (CPTV) represents the amount Roblox charges you for qualified visits.

Rates vary by region and align with common advertising industry pricing models. As a general guideline, creators typically charge brands an average CPTV of \$4 to \$5 globally. Integrations that deliver higher engagement, longer time spent, or stronger outcomes may charge higher rates.

The following table shows CPTV rates for the first 28 days of a campaign:

<table>
  <thead>
    <tr>
      <th>**Tier**</th>
      <th>**Markets**</th>
      <th>**CPTV (first 28 days)**</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**US**</td>
      <td>United States</td>
      <td>$1.50</td>
    </tr>
    <tr>
      <td>**Tier 1**</td>
      <td>United Kingdom, Canada, Australia, New Zealand, Nordics</td>
      <td>$0.75</td>
    </tr>
    <tr>
      <td>**Tier 2**</td>
      <td>Western Europe, Japan, South Korea</td>
      <td>$0.20</td>
    </tr>
    <tr>
      <td>**Tier 3**</td>
      <td>Global floor</td>
      <td>$0.05</td>
    </tr>
  </tbody>
</table>

After the first 28 days, all qualified visits are billed at a flat CPTV rate of \$0.10 for the rest of the campaign, up to a maximum campaign duration of 12 months.

For the complete list of countries in each tier, see [Markets](#markets).

### Markets

The following markets are grouped into tiers for CPTV pricing. The United States has its own tier and isn't listed below.

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Tier 1 markets</Typography>
</AccordionSummary>
<AccordionDetails>

<table>
  <thead>
    <tr>
      <th>**Region**</th>
      <th>**Country code**</th>
      <th>**Country**</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>APAC</td><td>AU</td><td>Australia</td></tr>
    <tr><td>APAC</td><td>NZ</td><td>New Zealand</td></tr>
    <tr><td>EMEA</td><td>DK</td><td>Denmark</td></tr>
    <tr><td>EMEA</td><td>FI</td><td>Finland</td></tr>
    <tr><td>EMEA</td><td>IS</td><td>Iceland</td></tr>
    <tr><td>EMEA</td><td>IE</td><td>Ireland</td></tr>
    <tr><td>EMEA</td><td>IM</td><td>Isle of Man</td></tr>
    <tr><td>EMEA</td><td>MT</td><td>Malta</td></tr>
    <tr><td>EMEA</td><td>NL</td><td>Netherlands</td></tr>
    <tr><td>EMEA</td><td>NO</td><td>Norway</td></tr>
    <tr><td>EMEA</td><td>SJ</td><td>Svalbard and Jan Mayen</td></tr>
    <tr><td>EMEA</td><td>SE</td><td>Sweden</td></tr>
    <tr><td>EMEA</td><td>CH</td><td>Switzerland</td></tr>
    <tr><td>EMEA</td><td>GB</td><td>United Kingdom</td></tr>
    <tr><td>US & Canada</td><td>AS</td><td>American Samoa</td></tr>
    <tr><td>US & Canada</td><td>CA</td><td>Canada</td></tr>
    <tr><td>US & Canada</td><td>NU</td><td>Niue</td></tr>
  </tbody>
</table>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Tier 2 markets</Typography>
</AccordionSummary>
<AccordionDetails>

<table>
  <thead>
    <tr>
      <th>**Region**</th>
      <th>**Country code**</th>
      <th>**Country**</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>EMEA</td><td>AD</td><td>Andorra</td></tr>
    <tr><td>EMEA</td><td>AT</td><td>Austria</td></tr>
    <tr><td>EMEA</td><td>BE</td><td>Belgium</td></tr>
    <tr><td>EMEA</td><td>HR</td><td>Croatia</td></tr>
    <tr><td>EMEA</td><td>CY</td><td>Cyprus</td></tr>
    <tr><td>EMEA</td><td>FO</td><td>Faroe Islands</td></tr>
    <tr><td>EMEA</td><td>FR</td><td>France</td></tr>
    <tr><td>EMEA</td><td>DE</td><td>Germany</td></tr>
    <tr><td>EMEA</td><td>GI</td><td>Gibraltar</td></tr>
    <tr><td>EMEA</td><td>GR</td><td>Greece</td></tr>
    <tr><td>EMEA</td><td>GL</td><td>Greenland</td></tr>
    <tr><td>EMEA</td><td>GG</td><td>Guernsey</td></tr>
    <tr><td>EMEA</td><td>HK</td><td>Hong Kong</td></tr>
    <tr><td>EMEA</td><td>IT</td><td>Italy</td></tr>
    <tr><td>EMEA</td><td>JP</td><td>Japan</td></tr>
    <tr><td>EMEA</td><td>JE</td><td>Jersey</td></tr>
    <tr><td>EMEA</td><td>LI</td><td>Liechtenstein</td></tr>
    <tr><td>EMEA</td><td>LU</td><td>Luxembourg</td></tr>
    <tr><td>EMEA</td><td>MC</td><td>Monaco</td></tr>
    <tr><td>EMEA</td><td>PT</td><td>Portugal</td></tr>
    <tr><td>EMEA</td><td>SM</td><td>San Marino</td></tr>
    <tr><td>EMEA</td><td>KR</td><td>South Korea</td></tr>
    <tr><td>EMEA</td><td>ES</td><td>Spain</td></tr>
    <tr><td>EMEA</td><td>TW</td><td>Taiwan</td></tr>
  </tbody>
</table>

</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
  <Typography variant="h4">Tier 3 markets</Typography>
</AccordionSummary>
<AccordionDetails>

<table>
  <thead>
    <tr>
      <th>**Region**</th>
      <th>**Country code**</th>
      <th>**Country**</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>APAC</td><td>BN</td><td>Brunei</td></tr>
    <tr><td>APAC</td><td>KH</td><td>Cambodia</td></tr>
    <tr><td>APAC</td><td>CN</td><td>China</td></tr>
    <tr><td>APAC</td><td>FJ</td><td>Fiji</td></tr>
    <tr><td>APAC</td><td>ID</td><td>Indonesia</td></tr>
    <tr><td>APAC</td><td>LA</td><td>Laos</td></tr>
    <tr><td>APAC</td><td>MO</td><td>Macao</td></tr>
    <tr><td>APAC</td><td>MY</td><td>Malaysia</td></tr>
    <tr><td>APAC</td><td>MV</td><td>Maldives</td></tr>
    <tr><td>APAC</td><td>FM</td><td>Micronesia</td></tr>
    <tr><td>APAC</td><td>MM</td><td>Myanmar (Burma)</td></tr>
    <tr><td>APAC</td><td>PH</td><td>Philippines</td></tr>
    <tr><td>APAC</td><td>SG</td><td>Singapore</td></tr>
    <tr><td>APAC</td><td>TH</td><td>Thailand</td></tr>
    <tr><td>APAC</td><td>TL</td><td>Timor-Leste</td></tr>
    <tr><td>APAC</td><td>VN</td><td>Vietnam</td></tr>
    <tr><td>EMEA</td><td>AF</td><td>Afghanistan</td></tr>
    <tr><td>EMEA</td><td>AL</td><td>Albania</td></tr>
    <tr><td>EMEA</td><td>DZ</td><td>Algeria</td></tr>
    <tr><td>EMEA</td><td>AO</td><td>Angola</td></tr>
    <tr><td>EMEA</td><td>AM</td><td>Armenia</td></tr>
    <tr><td>EMEA</td><td>AZ</td><td>Azerbaijan</td></tr>
    <tr><td>EMEA</td><td>BH</td><td>Bahrain</td></tr>
    <tr><td>EMEA</td><td>BD</td><td>Bangladesh</td></tr>
    <tr><td>EMEA</td><td>BY</td><td>Belarus</td></tr>
    <tr><td>EMEA</td><td>BJ</td><td>Benin</td></tr>
    <tr><td>EMEA</td><td>BT</td><td>Bhutan</td></tr>
    <tr><td>EMEA</td><td>BA</td><td>Bosnia and Herzegovina</td></tr>
    <tr><td>EMEA</td><td>BW</td><td>Botswana</td></tr>
    <tr><td>EMEA</td><td>BG</td><td>Bulgaria</td></tr>
    <tr><td>EMEA</td><td>BF</td><td>Burkina Faso</td></tr>
    <tr><td>EMEA</td><td>BI</td><td>Burundi</td></tr>
    <tr><td>EMEA</td><td>CV</td><td>Cabo Verde</td></tr>
    <tr><td>EMEA</td><td>CM</td><td>Cameroon</td></tr>
    <tr><td>EMEA</td><td>TD</td><td>Chad</td></tr>
    <tr><td>EMEA</td><td>KM</td><td>Comoros</td></tr>
    <tr><td>EMEA</td><td>CI</td><td>Cote d'Ivoire</td></tr>
    <tr><td>EMEA</td><td>CZ</td><td>Czechia</td></tr>
    <tr><td>EMEA</td><td>CD</td><td>Democratic Republic of the Congo</td></tr>
    <tr><td>EMEA</td><td>DJ</td><td>Djibouti</td></tr>
    <tr><td>EMEA</td><td>EG</td><td>Egypt</td></tr>
    <tr><td>EMEA</td><td>GQ</td><td>Equatorial Guinea</td></tr>
    <tr><td>EMEA</td><td>EE</td><td>Estonia</td></tr>
    <tr><td>EMEA</td><td>SZ</td><td>Eswatini</td></tr>
    <tr><td>EMEA</td><td>ET</td><td>Ethiopia</td></tr>
    <tr><td>EMEA</td><td>PF</td><td>French Polynesia</td></tr>
    <tr><td>EMEA</td><td>GA</td><td>Gabon</td></tr>
    <tr><td>EMEA</td><td>GE</td><td>Georgia</td></tr>
    <tr><td>EMEA</td><td>GH</td><td>Ghana</td></tr>
    <tr><td>EMEA</td><td>GU</td><td>Guam</td></tr>
    <tr><td>EMEA</td><td>GN</td><td>Guinea</td></tr>
    <tr><td>EMEA</td><td>GW</td><td>Guinea-Bissau</td></tr>
    <tr><td>EMEA</td><td>HU</td><td>Hungary</td></tr>
    <tr><td>EMEA</td><td>IN</td><td>India</td></tr>
    <tr><td>EMEA</td><td>IQ</td><td>Iraq</td></tr>
    <tr><td>EMEA</td><td>IL</td><td>Israel</td></tr>
    <tr><td>EMEA</td><td>JO</td><td>Jordan</td></tr>
    <tr><td>EMEA</td><td>KZ</td><td>Kazakhstan</td></tr>
    <tr><td>EMEA</td><td>KE</td><td>Kenya</td></tr>
    <tr><td>EMEA</td><td>KI</td><td>Kiribati</td></tr>
    <tr><td>EMEA</td><td>XK</td><td>Kosovo</td></tr>
    <tr><td>EMEA</td><td>KW</td><td>Kuwait</td></tr>
    <tr><td>EMEA</td><td>KG</td><td>Kyrgyzstan</td></tr>
    <tr><td>EMEA</td><td>LV</td><td>Latvia</td></tr>
    <tr><td>EMEA</td><td>LB</td><td>Lebanon</td></tr>
    <tr><td>EMEA</td><td>LS</td><td>Lesotho</td></tr>
    <tr><td>EMEA</td><td>LR</td><td>Liberia</td></tr>
    <tr><td>EMEA</td><td>LY</td><td>Libya</td></tr>
    <tr><td>EMEA</td><td>LT</td><td>Lithuania</td></tr>
    <tr><td>EMEA</td><td>MG</td><td>Madagascar</td></tr>
    <tr><td>EMEA</td><td>MW</td><td>Malawi</td></tr>
    <tr><td>EMEA</td><td>ML</td><td>Mali</td></tr>
    <tr><td>EMEA</td><td>MH</td><td>Marshall Islands</td></tr>
    <tr><td>EMEA</td><td>MR</td><td>Mauritania</td></tr>
    <tr><td>EMEA</td><td>MU</td><td>Mauritius</td></tr>
    <tr><td>EMEA</td><td>YT</td><td>Mayotte</td></tr>
    <tr><td>EMEA</td><td>MD</td><td>Moldova</td></tr>
    <tr><td>EMEA</td><td>MN</td><td>Mongolia</td></tr>
    <tr><td>EMEA</td><td>ME</td><td>Montenegro</td></tr>
    <tr><td>EMEA</td><td>MA</td><td>Morocco</td></tr>
    <tr><td>EMEA</td><td>MZ</td><td>Mozambique</td></tr>
    <tr><td>EMEA</td><td>NA</td><td>Namibia</td></tr>
    <tr><td>EMEA</td><td>NR</td><td>Nauru</td></tr>
    <tr><td>EMEA</td><td>NP</td><td>Nepal</td></tr>
    <tr><td>EMEA</td><td>NC</td><td>New Caledonia</td></tr>
    <tr><td>EMEA</td><td>NE</td><td>Niger</td></tr>
    <tr><td>EMEA</td><td>NG</td><td>Nigeria</td></tr>
    <tr><td>EMEA</td><td>MK</td><td>North Macedonia</td></tr>
    <tr><td>EMEA</td><td>MP</td><td>Northern Mariana Islands</td></tr>
    <tr><td>EMEA</td><td>OM</td><td>Oman</td></tr>
    <tr><td>EMEA</td><td>PK</td><td>Pakistan</td></tr>
    <tr><td>EMEA</td><td>PW</td><td>Palau</td></tr>
    <tr><td>EMEA</td><td>PS</td><td>Palestine</td></tr>
    <tr><td>EMEA</td><td>PG</td><td>Papua New Guinea</td></tr>
    <tr><td>EMEA</td><td>PL</td><td>Poland</td></tr>
    <tr><td>EMEA</td><td>QA</td><td>Qatar</td></tr>
    <tr><td>EMEA</td><td>CG</td><td>Republic of the Congo</td></tr>
    <tr><td>EMEA</td><td>RE</td><td>Reunion</td></tr>
    <tr><td>EMEA</td><td>RO</td><td>Romania</td></tr>
    <tr><td>EMEA</td><td>RW</td><td>Rwanda</td></tr>
    <tr><td>EMEA</td><td>WS</td><td>Samoa</td></tr>
    <tr><td>EMEA</td><td>ST</td><td>Sao Tome and Principe</td></tr>
    <tr><td>EMEA</td><td>SA</td><td>Saudi Arabia</td></tr>
    <tr><td>EMEA</td><td>SN</td><td>Senegal</td></tr>
    <tr><td>EMEA</td><td>RS</td><td>Serbia</td></tr>
    <tr><td>EMEA</td><td>SC</td><td>Seychelles</td></tr>
    <tr><td>EMEA</td><td>SL</td><td>Sierra Leone</td></tr>
    <tr><td>EMEA</td><td>SK</td><td>Slovakia</td></tr>
    <tr><td>EMEA</td><td>SI</td><td>Slovenia</td></tr>
    <tr><td>EMEA</td><td>SB</td><td>Solomon Islands</td></tr>
    <tr><td>EMEA</td><td>SO</td><td>Somalia</td></tr>
    <tr><td>EMEA</td><td>ZA</td><td>South Africa</td></tr>
    <tr><td>EMEA</td><td>SS</td><td>South Sudan</td></tr>
    <tr><td>EMEA</td><td>LK</td><td>Sri Lanka</td></tr>
    <tr><td>EMEA</td><td>SD</td><td>Sudan</td></tr>
    <tr><td>EMEA</td><td>TJ</td><td>Tajikistan</td></tr>
    <tr><td>EMEA</td><td>TZ</td><td>Tanzania</td></tr>
    <tr><td>EMEA</td><td>GM</td><td>The Gambia</td></tr>
    <tr><td>EMEA</td><td>TG</td><td>Togo</td></tr>
    <tr><td>EMEA</td><td>TO</td><td>Tonga</td></tr>
    <tr><td>EMEA</td><td>TN</td><td>Tunisia</td></tr>
    <tr><td>EMEA</td><td>TR</td><td>Turkiye</td></tr>
    <tr><td>EMEA</td><td>TM</td><td>Turkmenistan</td></tr>
    <tr><td>EMEA</td><td>TV</td><td>Tuvalu</td></tr>
    <tr><td>EMEA</td><td>UG</td><td>Uganda</td></tr>
    <tr><td>EMEA</td><td>UA</td><td>Ukraine</td></tr>
    <tr><td>EMEA</td><td>AE</td><td>United Arab Emirates</td></tr>
    <tr><td>EMEA</td><td>UZ</td><td>Uzbekistan</td></tr>
    <tr><td>EMEA</td><td>VU</td><td>Vanuatu</td></tr>
    <tr><td>EMEA</td><td>WF</td><td>Wallis and Futuna</td></tr>
    <tr><td>EMEA</td><td>EH</td><td>Western Sahara</td></tr>
    <tr><td>EMEA</td><td>YE</td><td>Yemen</td></tr>
    <tr><td>EMEA</td><td>ZM</td><td>Zambia</td></tr>
    <tr><td>EMEA</td><td>ZW</td><td>Zimbabwe</td></tr>
    <tr><td>LATAM</td><td>AI</td><td>Anguilla</td></tr>
    <tr><td>LATAM</td><td>AG</td><td>Antigua and Barbuda</td></tr>
    <tr><td>LATAM</td><td>AR</td><td>Argentina</td></tr>
    <tr><td>LATAM</td><td>AW</td><td>Aruba</td></tr>
    <tr><td>LATAM</td><td>BB</td><td>Barbados</td></tr>
    <tr><td>LATAM</td><td>BZ</td><td>Belize</td></tr>
    <tr><td>LATAM</td><td>BM</td><td>Bermuda</td></tr>
    <tr><td>LATAM</td><td>BO</td><td>Bolivia</td></tr>
    <tr><td>LATAM</td><td>BR</td><td>Brazil</td></tr>
    <tr><td>LATAM</td><td>VG</td><td>British Virgin Islands</td></tr>
    <tr><td>LATAM</td><td>BQ</td><td>Caribbean Netherlands</td></tr>
    <tr><td>LATAM</td><td>KY</td><td>Cayman Islands</td></tr>
    <tr><td>LATAM</td><td>CL</td><td>Chile</td></tr>
    <tr><td>LATAM</td><td>CO</td><td>Colombia</td></tr>
    <tr><td>LATAM</td><td>CK</td><td>Cook Islands</td></tr>
    <tr><td>LATAM</td><td>CR</td><td>Costa Rica</td></tr>
    <tr><td>LATAM</td><td>CW</td><td>Curacao</td></tr>
    <tr><td>LATAM</td><td>DM</td><td>Dominica</td></tr>
    <tr><td>LATAM</td><td>DO</td><td>Dominican Republic</td></tr>
    <tr><td>LATAM</td><td>EC</td><td>Ecuador</td></tr>
    <tr><td>LATAM</td><td>SV</td><td>El Salvador</td></tr>
    <tr><td>LATAM</td><td>GF</td><td>French Guiana</td></tr>
    <tr><td>LATAM</td><td>GD</td><td>Grenada</td></tr>
    <tr><td>LATAM</td><td>GP</td><td>Guadeloupe</td></tr>
    <tr><td>LATAM</td><td>GT</td><td>Guatemala</td></tr>
    <tr><td>LATAM</td><td>GY</td><td>Guyana</td></tr>
    <tr><td>LATAM</td><td>HT</td><td>Haiti</td></tr>
    <tr><td>LATAM</td><td>HN</td><td>Honduras</td></tr>
    <tr><td>LATAM</td><td>JM</td><td>Jamaica</td></tr>
    <tr><td>LATAM</td><td>MQ</td><td>Martinique</td></tr>
    <tr><td>LATAM</td><td>MX</td><td>Mexico</td></tr>
    <tr><td>LATAM</td><td>MS</td><td>Montserrat</td></tr>
    <tr><td>LATAM</td><td>NI</td><td>Nicaragua</td></tr>
    <tr><td>LATAM</td><td>PA</td><td>Panama</td></tr>
    <tr><td>LATAM</td><td>PY</td><td>Paraguay</td></tr>
    <tr><td>LATAM</td><td>PE</td><td>Peru</td></tr>
    <tr><td>LATAM</td><td>PR</td><td>Puerto Rico</td></tr>
    <tr><td>LATAM</td><td>BL</td><td>Saint Barthelemy</td></tr>
    <tr><td>LATAM</td><td>KN</td><td>Saint Kitts and Nevis</td></tr>
    <tr><td>LATAM</td><td>LC</td><td>Saint Lucia</td></tr>
    <tr><td>LATAM</td><td>MF</td><td>Saint Martin</td></tr>
    <tr><td>LATAM</td><td>PM</td><td>Saint Pierre and Miquelon</td></tr>
    <tr><td>LATAM</td><td>VC</td><td>Saint Vincent and the Grenadines</td></tr>
    <tr><td>LATAM</td><td>SX</td><td>Sint Maarten</td></tr>
    <tr><td>LATAM</td><td>SR</td><td>Suriname</td></tr>
    <tr><td>LATAM</td><td>BS</td><td>The Bahamas</td></tr>
    <tr><td>LATAM</td><td>TT</td><td>Trinidad and Tobago</td></tr>
    <tr><td>LATAM</td><td>TC</td><td>Turks and Caicos Islands</td></tr>
    <tr><td>LATAM</td><td>VI</td><td>U.S. Virgin Islands</td></tr>
    <tr><td>LATAM</td><td>UY</td><td>Uruguay</td></tr>
    <tr><td>LATAM</td><td>VE</td><td>Venezuela</td></tr>
  </tbody>
</table>

</AccordionDetails>
</BaseAccordion>

### FAQ

**Will I be billed for every visit to a branded integration?**

Each qualified visit is billed once per session. If a user engages with 10 branded assets during a single session, it counts as 1 qualified visit. If the same user returns across 10 separate sessions and engages with a branded asset each time, it counts as 10 qualified visits.

This approach is consistent with other advertising formats, where the same user can generate multiple engagements over time.

<br /><br />

**Will I always be charged the maximum cost?**

No. You're charged the lower of:

- The actual cost calculated from your branded visits.
- Your locked-in maximum cost.

<br />

**What are the invoicing and payment terms?**

Roblox issues invoices at the end of each quarter for campaigns that ended during that quarter. Payment is due within 90 days of the invoice date, giving you time to receive payment from the brand before paying Roblox.

<br /><br />

**What happens if I change the dates of my campaign?**

If you change your campaign dates, the additional cost is calculated using the same rate as your original locked-in maximum cost.

For example, if you lock in a maximum cost of \$5,000 for a 7-day campaign and then extend the campaign to 14 days, your maximum cost increases to \$10,000.

For campaign days beyond the initial 28-day pricing period, qualified visits are billed at the flat CPTV rate of \$0.10.

<br /><br />

**What are some options for reducing the actual cost of my planned campaign?**

If your estimated campaign cost is higher than the amount you're able to charge the brand, consider adjusting the campaign configuration to reduce costs:

- **Reduce the number of campaign days.** Shortening the campaign duration is the simplest way to reduce costs.
- **End the campaign after reaching a target number of impressions.** You can toggle the campaign off in Ads Manager at any time. While a campaign is off, `Class.AdService.GetCampaignEligibilityAsync|GetCampaignEligibilityAsync` returns `false` for all users.

<br />

**Is there a maximum cost for deals?**

Yes. All campaigns in 2027 have a hard cap of $400,000.
