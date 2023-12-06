---
title: Balancing Virtual Economies
description: Balancing Virtual Economies
---

Virtual economies on Roblox are intricate systems that mimic real-world economies, where players trade, earn, and spend virtual currency and resources. Balancing these virtual economies is vital to ensuring a fair and engaging experience that keeps players motivated without over or under-valuing the virtual goods. Balanced virtual economies have the following best practices:

- Data-driven content
- Resource planning
- Impact estimation
- Resource sinks

## Data-Driven Content

Using data to understand how players interact with and consume your experience's content is key to maintaining a balanced economy. When building your experience's database, be sure to track:

- Who is buying what item.
- What actions yield currency.
- What amount of currency is earned vs. purchased.
- Whether earned or purchased currency is used for item purchases.
- When and what items are used.
- How frequently players interact with specific features and the timing of those interactions.

These data points are crucial considerations when planning events. While running events can help keep players engaged between major content updates, it's essential to prioritize data tracking for in-game actions, content consumption, item sales and item usage.

To learn more about planning and creating events, see [Content Updates](content-updates.md) and [LiveOps Essentials](liveops-essentials.md).

## Resource Planning

**Resource planning** involves balancing how virtual resources are created and how they're spent. This concept is best illustrated in the fictitious experience _Feline Fishing Fun_, where players fish for their resources. _Feline Fishing Fun_ has the following characteristics:

- The currency used to purchase items in the shop is called Gold `(G)`.
- Gold is earned by catching fish of various rarities and values and selling them to vendors.
- Gold packs can also be purchased in the Shop.
- There are three types of fish of differing rarity and value that players have a chance to catch in the river:
  - Catfish: `70% chance to catch, 10G`
  - Trout: `20% chance to catch, 20G`
  - Salmon: `10% chance to catch, 30G`

_Feline Fishing Fun_ developers are planning an event where a special Golden Salmon will become available for 24 hours, with 0.1% chance of being caught, and be worth 1000 Gold. This type of event entices players to fish for a chance to acquire it and integrates smoothly with the experience's [Core Loop](core-loops.md) of fishing.

If the developers launch the event without estimating the economic impact of increased fishing, data visualization reveals that the quantity of Gold purchased from the store remains flat, while spending surges. This underestimation of increased fishing leads to a significant surplus of Gold in the virtual economy. As a result, players with abundant Gold spend freely, leaving little incentive to purchase more, which causes a decline in revenue after the event ends.

<figure>
  <img src="../../assets/game-design/balancing-virtual-economies/balancing-virtual-economies-1.png" width="70%"/>
    <figcaption>An unbalanced event in *Feline Fishing Fun*. </figcaption>
  </figure>

## Impact Estimation

Estimating the potential impact of an event on an experience's economy is paramount to ensuring balance. A common method to gauge potential impact is through **Expected Value** (EV) calculations.

An item's EV is defined as a predicted value of a variable, calculated as the sum of all possible values, each multiplied by the probability of its occurrence. Understanding Expected Value is critical to maintaining a balanced economy any time there is value to be gained from a probabilistically based system, such as _Feline Fishing Fun_'s fishing system.

Below are images of a simple EV calculator set up in a spreadsheet. This is a standard format that can be applied to conceptually similar situations.

<figure>
  <img src="../../assets/game-design/balancing-virtual-economies/balancing-virtual-economies-2.png" width="100%"/>
    <figcaption>Non-event EV calculator spreadsheet. </figcaption>
  </figure>

If there are a group of valuable items a player has a chance of obtaining, multiply the value of that item by the percent chance of acquiring it. For _Feline Fishing Fun_'s fishing system, this looks like:

- Catfish = `10 Gold x 70% = 7G`
- Trout = `20 Gold x 20% = 4G`
- Salmon = `30 Gold x 30% = 3G`

Adding up the results, the EV of a single fishing attempt is `7G + 4G + 3G` = `14G`. By multiplying 14G by 1,000 fishing attempts per day, you get 14,000 Gold earned from fishing on a normal non-event day.

<figure>
  <img src="../../assets/game-design/balancing-virtual-economies/balancing-virtual-economies-3.png" width="100%"/>
    <figcaption>Event modified EV calculator spreadsheet. </figcaption>
  </figure>

While it's impossible to know exactly how many players will participate on a given day of an event, each successive event aids in future estimations. For _Feline Fishing Fun_'s fishing event, when determining the appropriate Gold Salmon value, add it to the EV calculator and compare the resulting EV to the EV of a non-event day. By understanding normal item purchasing pace and the time it takes players to buy useful items, you can determine how much currency is too much.

## Resource Sinks

A **resource sink** is an economic system designed to remove resources from circulation. When designing new sources of currency, it's imperative to have plans for how to "sink" different quantities of excess currency. Common examples include:

- Special event cosmetic items, like limited time golden accessories.
- A sequential event that requires the spending of currency earned in the event prior.
- An **event shop** that appears during events that grant a small benefit to players who spend currency while the event is ongoing.

The safest solution to safeguard an experience's economy is to have an event generate a unique event currency that is only used to purchase items from a special event shop. This ensures that the experience's main economy remains untouched.

Resource sinks ensure that players have a fun and rewarding time during the event, while also maintaining the value and integrity of the existing currency. A balanced Golden Salmon event in _Feline Fishing Fun_ will look like the chart below, with Gold sources and sinks relatively elevated during the event, but moving close together.

<figure>
  <img src="../../assets/game-design/balancing-virtual-economies/balancing-virtual-economies-4.png" width="70%"/>
    <figcaption>A balanced event in *Feline Fishing Fun*. </figcaption>
  </figure>
