---
title: License Manager
description: How to use IP licensing as a rights holder.
---

**License Manager** is an intellectual property (IP) management tool that lets you grant permission to creators to use your established IP in their experiences. With the License Manager, you can define licenses, specify content standards and revenue share requirements, and set eligibility criteria that experiences must meet in order to use your IP.

Before using the License Manager, you must [register as a rights holder](./get-started.md#register-as-a-rights-holder) and [create an IP family](./get-started.md#create-an-ip-family).

<Alert severity="warning">
  To use the License Manager, you must have exclusive, worldwide rights to an IP that includes either copyright or trademark registrations. You will be required to provide verifiable documentation to prove your intellectual property rights. Any false claims of ownership can result in the termination of your License Manager access or your Roblox account.
</Alert>

## Create a license listing

After you [create and set up your IP family](./get-started.md#create-an-ip-family), you can create a **license listing** to help promote your IP to creators and to encourage them to request to use it in their experiences.

License listings are made up of:

- A listing that represents your IP family to creators and allows them to request to use your IP in their experiences through the [Licenses catalog](./creators.md#explore-licenses). A listing can have one or more licenses under it.
- One or more licenses that represent the set of terms and conditions that define how creators can use your IP to build those experiences.

To create your license listing:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Licenses**.
2. Select the **My Licenses** tab.
3. Click **Create license listing**.
4. In the **Create listing** step, set up the listing.

   1. Under **IP family**, select an IP family that you have previously created.
   2. Under **Listing details**, enter a title and a description for the listing.
   3. Under **Thumbnails**, enter up to 5 images that relate to the listing. The first image you upload is shown to creators on the listing tile of the Licenses page. Make sure these images have an aspect ratio of 16:9, and are in PNG or JPG formats.
   4. Click **Next**.

   <img src="../assets/ip-licensing/CreateListingStep.png" width="50%" />

5. In the **Add license** step, configure a license to add to your listing. To skip this step and add a license to your listing later, click **Skip license**.

   1. Under **License details**, enter a title and a description. If you make your license public, the title and description will become public-facing and be visible to creators.
   2. Under **Duration**:

      1. Set a **Duration type**, either **Time-limited** or **Perpetual**:
         - **Time-limited** licenses grant the use of your IP within defined date boundaries and will auto-terminate an active agreement on the end date.
         - **Perpetual** licenses grant the use of your IP from the date an agreement is active until termination of that agreement is actively sought.

      <Alert severity="warning">
      Rights holders can only [offer licenses to matching experiences](#review-matches-and-send-a-license-offer) if the license's duration is set to **perpetual**. <br /> <br />If the duration is set to **time-limited**, [creators must request for your license](../ip-licensing/creators.md#request-to-use-a-license) directly. Creators can request licenses for either time-limited or perpetual licenses.
      </Alert>

      <Alert severity="info">
      Once a license has been created, the duration type cannot be changed. A perpetual license cannot be updated to a time-limited license, and vice versa.
      </Alert>
      2. Set a **Duration range** (Time-limited only), a defined date boundary you expect your IP usage to be active for. The creator will specify a start and end date within this boundary. Start and end times for time-limited licenses are based on midnight UTC.

   3. Under **Monetization**:

      1. Set a **revenue share rate** between 0% and 95%. This is the revenue percentage you want to receive from experiences using your IP, and is shown to creators when they request to use your IP through a license listing.
      2. Select one of the following for the **default revenue share timing**:
         - **Monetize on activation**, which means the revenue share is applied beginning at the moment the agreement between the rights holder and the creator of the experience becomes active.
         - **Monetize later**, which allows you to turn on revenue share at a later date of your choosing.
      3. Set a **Default revenue share timing**. This option only displays if **Revenue share rate** is not 0%.

      <Alert severity="info">
      Time-limited licenses are set to monetize on activation by default, and this preference cannot be changed. Time-limited licenses will begin monetizing on the day the agreement is active, which will be the start date designated by the creator.
      </Alert>

   4. Under **Experience eligibility**, select the criteria you want experiences to meet in order to request to use the license. Creators whose experiences don't meet these requirements aren't eligible to request to use your IP. To allow all creators to request, leave the default values.
      - For **Minimum average last 7 daily active users (DAU)**, choose between no requirement, greater than 1,000 DAU, or greater than 25,000 DAU.
      - For **Maximum maturity rating**, choose between minimal, mild, moderate, and restricted. See [Maturity labels](../production/promotion/content-maturity.md#questionnaire-categories) for more information about different maturity ratings.
   5. Under **Guidelines and restrictions**:
      1. Enter the scope of your IP license. Include general background about the IP and clarify if any parts of the IP can or cannot be referenced by creators in their experience.
      2. Under **Content standards**, set the rules that creators must follow when using your IP.
      3. (Optional) Under **Brand guidelines**, upload a file to provide creators with creative direction.
   6. Under **Privacy**, select one of the following:

      - **Public** to make the license listing public and visible to all creators. This option also allows all eligible creators to request to use the license.
      - **Private** to make the license only available to creators that you reach out to directly and that have experiences that match your IP.

      <Alert severity="info">
      Because time-limited licenses cannot be used in license offers, they should be marked as **Public** once ready so that creators can request the license with proposed dates.
      </Alert>

   7. Click **Next**.

   <img src="../assets/ip-licensing/AddLicenseStep.png" width="50%" />

6. Review the details of the license listing and click **Create**.

After you have created a license listing, you can go to **My licenses** ⟩ **[IP license listing]** to make changes to both the listing and its associated licenses:

- To edit details of the listing, like its IP family and thumbnails, click **Edit listing**.
- To edit details of a specific license, click the edit icon next to that license. You can edit any field except for the revenue share rate.
- To add new licenses to the listing, click **Add license**.
- To copy an existing license, click the copy icon next to that license. The copied license will undergo moderation review.

<Alert severity="info">
  Both listings and licenses undergo moderation review when they are first created. Subsequent edits only go through moderation review if sensitive fields are updated, specifically name, description, images, or documents. Rejected licenses can no longer be edited; however, they can be copied and the copy will undergo moderation review again.
</Alert>

<Alert severity="warning">
  Once your license has been used in any agreement, you **cannot** change the revenue share rate or experience eligibility requirements.
</Alert>

<Alert severity="info">
  Items purchased outside of the experience on the Marketplace are not subject to the revenue share rate.
</Alert>

## Review matches and send a license offer

<Alert severity="warning">
  To receive matches:
  <ul>
    <li>**You must have a minimum of 10 approved images** when you create an IP family. If you have fewer than 10 approved images, Roblox won't generate experience matches for your IP.</li>
    <li>**Your license duration must be set to Perpetual.** Licenses set to time-limited durations require a [creator license request](#review-license-requests-from-creators).</li>
  </ul>
</Alert>

<Alert severity="info">
  Matches are refreshed daily. If you have just created a new IP family, it might take some time before matches appear for that IP.
</Alert>

Matches are experiences that use a significant amount of content related to your IP library. Roblox uses the primary and secondary keywords and the media added to your IP family to find experiences that include content that matches your IP. Matches are limited to public experiences that are actively played and only apply to licenses with a perpetual duration.

You can review the experiences matched to your IP and send them a license offer in order to enter an agreement with an experience's creator, earn a share of their revenue, and set guidelines for the creator to follow.

To review your matches and send a creator a license offer:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Matches**.
2. Select the experience you want to send an offer to.
3. Click **Offer license**.
4. In the **New license offer** panel:
   1. Select an IP family and a license.
   2. Select the revenue share timing. You can choose to **Monetize on activation** and apply the revenue share rate of the license you selected the moment the creator accepts your offer, or **Monetize later** and activate the revenue share rate later.
   3. Click **Send offer**.

If you believe an experience is using a significant amount of content related to your IP but you don't see that experience on your Matches page, you can send that experience a [match request](#request-a-match).

<Alert severity="warning">
  You can't send an offer to an experience that is already associated with a pending license offer, accepted license agreement, or active license agreement.
</Alert>

<Alert severity="warning">
  After you send a license offer, the creator gets access to the license agreement details. The activation date for the license agreement is **14 days from when the creator has received the offer**.

If the creator doesn't dispute the offer by the activation date, **the agreement automatically becomes active**.
</Alert>

## Request a match

If an experience using your IP doesn't appear on your **Matches** page, you can manually request to add it. You can submit up to 3 match requests per day.

To request a match:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Matches**.
2. Click **Request match**.
3. Under **Request an experience as a match**:
   1. Enter the URL for the experience using your IP.
   2. Select an IP family and a license.
   3. Select the revenue share timing. You can choose to **Monetize on activation** and apply the revenue share rate of the license you selected the moment the creator accepts your offer, or **Monetize later** and activate the revenue share rate later.
   4. Click **Confirm**.

<Alert severity="warning">
  Roblox reviews the submitted experience to verify that it matches your IP. **If approved, a license offer is automatically sent to the creator of the experience.**
</Alert>

## Review license requests from creators

Creators can browse the **Licenses** catalog and directly request to use your IP in their experiences without first being matched to your IP. After receiving a license request, you can choose to accept or reject it.

Unlike [license matches](#review-matches-and-send-a-license-offer), creators can request licenses with either perpetual or time-limited durations.

<Alert severity="warning">
  If early IP usage is detected in a creator's experience, the license request or accepted license agreement may be activated early.
</Alert>

To review a license request from a creator:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Licenses**.
2. Select the **License agreements** tab.
3. Filter by **Requests**.
4. Select the license request you want to review.
5. Accept or reject the license request.
   - To accept the license request and enter a license agreement with the creator, click **Accept**.
   - To reject the license request, click **Reject**. You can also provide them with a reason for the rejection. This feedback can help the creator make any necessary changes to their experience and successfully request again in the future.

<Alert severity="info">
  We recommend that you play the creator's experience before accepting or rejecting their license request.
</Alert>

## View license agreements

To view all of your offers and license agreements:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Licenses**.
2. Select the **License agreements** tab. You can filter all license agreements by:

<table>
<thead>
  <tr>
    <th>**Filter**</th>
    <th>**Description**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**Requests**</td>
    <td>All license requests from creators to use one of your licenses.</td>
  </tr>
  <tr>
    <td>**Offers**</td>
    <td>All license offers that you have sent to creators.</td>
  </tr>
  <tr>
    <td>**Active**</td>
    <td>All active license agreements between you and creators.</td>
  </tr>
  <tr>
    <td>**Archived**</td>
    <td>All archived offers or license agreements between you and creators.</td>
  </tr>
</tbody>
</table>

## Review an offer dispute from a creator

After you send a license offer to a creator, they can choose to dispute that offer. If a creator disputes your offer, you can either accept the dispute and archive the offer you sent, or reject the dispute and send the offer to the creator again.

To review an offer dispute from a creator:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Licenses**.
2. Select the license agreement that the creator has disputed. The reason for the creator's dispute displays at the top of the page.
3. Accept or reject the dispute.
   - To accept the dispute and archive the offer, click **Accept dispute**.
   - To reject the dispute and send the license offer to the creator again, click **Reject dispute**.

If the creator disputes the offer a second time, the offer is automatically archived and the agreement does not take place.

## Make changes to active agreements

If you have an active agreement with a creator and you believe their implementation of your IP has deviated from the defined scope of the license and its content standards, you can request that they make changes to their experience by clicking the **Change request** button and supplying details about which content standard this experience is violating and the specific change you want to request.

## Analytics

Use analytics to analyze the impact of your individual licenses. To view a license's metrics:

1. Go to **Intellectual Property** ⟩ **License Manager** ⟩ **Licenses**.
2. Select the **My licenses** tab.
3. Select a license.
4. Select the **Analytics** tab to see the following:

<table>
<thead>
  <tr>
    <th>**Metric**</th>
    <th>**Description**</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>**DAU**</td>
    <td>The number of daily active users (DAU) over 7 days.</td>
  </tr>
  <tr>
    <td>**Visits**</td>
    <td>The number of lifetime visits to the experience.</td>
  </tr>
  <tr>
    <td>**Transactions**</td>
    <td>The Robux you have earned from the experience. <br /><br /> Click **View transactions** and select **License payments** to see the revenue earned from agreements with creators.</td>
  </tr>
</tbody>
</table>
