---
title: Search ads
description: Search ads promote experiences in the search results of Roblox's experience catalog.
---

**Search ads** enable creators and brands to promote their experiences to users searching for specific keywords on Roblox. This form of advertising allows developers to target their ads to users using search, increasing the likelihood of engagement.

When creating a search ad, advertisers select up to 10 keywords within an Ad Set relevant to their experiences. Once a successful search ad is applied and launched, your experience displays as a search result if a user submits a search with an exact keyword match.

Search results populate in the following ways:

<GridContainer numColumns="2">
<figure>
<center><img src="../../assets/promotion/search-ads/Search-Example-1.png" width="60%" alt=""/></center>
<figcaption>
<center>Search ads display at the top of search results.</center>
</figcaption>
</figure>

<figure>
<center><img src="../../assets/promotion/search-ads/Search-Example-2.png" width="60%" alt=""/></center>
<figcaption>
<center>For queries that directly match an experience name, such as "Driving Empire", the exact match appears as the primary enlarged tile, and search ads display immediately after.</center>
</figcaption>
</figure>
</GridContainer>

<br />

<figure>
<center><img src="../../assets/promotion/search-ads/Search-Example-3.png" width="65%" alt=""/></center>
<figcaption>
<center>Search ads on desktop.</center>
</figcaption>
</figure>

<br />

<Alert severity ='warning'>
All Roblox advertisers of experiences must abide by our [Community Standards](https://en.help.roblox.com/hc/en-us/articles/203313410-Roblox-Community-Standards). Roblox prevents surfacing experiences identified as clickbait or spam.
</Alert>

## Create search ads

Search ads are managed in the [Ads Manager](./ads-manager.md) as a Visits campaign objective. Search ads also use a [modified bidding and auction](#bidding-and-auction) process to determine pricing and availability of individual keywords.

<Alert severity = 'warning'>
Unlike other ad types, you can't modify brand suitability and audience targeting for search ads. Search ads reach audiences in all regions, all genders, ages 13 and over, and all eligible devices.
</Alert>

To create search ads:

1. Navigate to the [Ads Manager](https://advertise.roblox.com/landing). If it's your first time creating an ad campaign, you must first [create an account](./ads-manager.md#create-an-ad-account) and [add a payment method](./ads-manager.md#add-a-payment-method).
2. In **Manage Ads**, click **CREATE**.

   <img src="../../assets/promotion/ads-manager/Campaign-Create.png" width="80%" alt=""/>

3. In the Campaign page:
   1. Select your **Payment Method**.
   2. Set **Campaign Objective** to **Visits**.
   3. Set the **budget type**, **date range**, and **campaign name**.
   4. Click **NEXT**.
4. In the Ad Set page:

   1. Select **Search Experience**. The audience estimation shows the approximate number of Roblox user accounts your search ad might reach over a month. This number is based on the keywords you choose and the budget and bids you set when creating your ad.

      <img src="../../assets/promotion/search-ads/Ad-Set-Search.png" width="80%" alt=""/>

   2. In **Keyword(s)**, choose up to 10 keywords for each Ad Set. Keywords populate after typing in the text field. You should group relevant keywords together within each Ad Set for clearer reporting on campaign performance.
      <img src="../../assets/promotion/search-ads/Select-Keywords.png" width="70%" alt=""/>
   3. Click **NEXT**.

5. In the Ad page:

   1. Set your **Destination Experience**. This is the experience that users are directed to after clicking on the search ad.

      <img src="../../assets/promotion/search-ads/Edit-Ad-Creative.png" width="70%" alt=""/>

   2. Enter a name for this specific ad.
   3. Click **NEXT**.

6. In the Review Campaign page, review the final details of your advertisement and click **SUBMIT** to launch your campaign.

After launching your campaign, you can monitor the campaign's performance with [ads reporting](#reporting) and [billing](./ads-manager.md#billing).

## Bidding and auction

Ads on Roblox work in a bidding system, where advertisers bid to have their ads shown to users through the available ad units placed in an experience. Search ads differ from other ads in that they also calculate the relevance of the experience to the user's query. **This means that experiences that are more relevant to a search query have a greater chance of displaying as ads**.

To maximize user experience and make the most of your ad spend, **you should bid on keywords that are most relevant to your experience**. For instance, if you have a horror experience and you bid on the keyword "obby", you could get some initial traffic from this ad, but the ad system will ultimately optimize for ads that are most relevant for your experience.

The following is the [same bidding and auction information](./ads-manager.md#bidding-and-auction) provided for other advertising formats with the specific differences for search ads bolded:

> All eligible ads participate in a second price auction. The ad with the highest bid wins the ad slot, but only charges the price of the second highest price, plus one cent. In principle, this looks like:
> <br />
>
> 1. Advertisers submit their bids for ad space.
> 2. Roblox calculates an adjusted eCPM value for each Ad, based on the player, ad, **and query information. The adjusted eCPM accounts for the relevance of the Ad to the chosen keyword.**
> 3. The ads are then placed into an auction.
> 4. The ad with the **highest adjusted eCPM** value wins the auction.
> 5. The winning ad is then displayed to the player.
> 6. The advertiser is charged its bid amount of the second highest price, plus one cent ($0.01).
> 7. The advertiser is charged the bid amount of the **second highest ranked ad, adjusted by how much better the ad scored in the auction relative to the next highest ranked ad**, plus one cent ($0.01).
>
> <br /> <br />
>
> As an example:
>
> 1.  An advertiser wants to display their ad.
> 2.  The advertiser submits a bid of $10.
> 3.  Another advertiser submits a bid of $12.
> 4.  The second advertiser wins the auction and is charged $10.01, the price of the second highest bid, plus one cent.

## Reporting

You can review your ad campaign's performance using the Ad Manager's [ads reporting tool](./ads-manager.md#reporting). At this time, you can't filter reports by keywords, but you can create ad sets with a single keyword to compare how an individual keyword performs for your campaign.

Search ad metrics also populate in the [Analytics Dashboard](../analytics/acquisition.md#acquisition-sources) acquisition metrics. At this time, search ad and sponsored ad results are combined as a single Sponsored Ad metric on acquisition reports.
