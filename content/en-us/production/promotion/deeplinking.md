---
title: Deep Linking
description: Deep linking lets you launch experiences and send users directly to a specific place with custom launch data.
---

Deep links let you send users to a specific place in an experience, which can
make the process of joining more seamless, help users find their friends, and
provide traffic attribution. The optional launch data in these links lets you
customize the user experience when someone joins.

## Constructing a Deep Link

A deep link URL consists of a URL format along with parameters that you specify.
The following sections describe how to construct each format.

### Requirements and Guidelines

When constructing deep links, consider the following requirements and
guidelines:

- You must URL encode special characters, such as spaces. These characters are
  automatically decoded when the user joins your experience.
- The decoded launch data can't exceed 200 bytes.
- You can store more complex data as a JSON string and decode it with
  `Class.HttpService:JSONDecode()` on the server.
- Don't send confidential information in the `launchData` parameter; it's fully
  visible in the URL. Further, users can modify the URL, so the data might not
  be authentic.

### Web Listing to App

This format sends users to the Roblox experience page on the web and then
launches the Roblox app. The provided example provides a place ID and a URL
encoded launch data string.

<table>
  <tr>
    <th scope="row">**Format**</th>
    <td>`https://www.roblox.com/games/start?placeId=<id>&launchData=<string>`</td>
  </tr>
  <tr>
    <th scope="row">**Example**</th>
    <td><a href="https://www.roblox.com/games/start?placeId=6900305353&launchData=%7B%22roomId%22%3A%202%7D">Example Link</a></td>
  </tr>
</table>

### Direct to App

This format sends users directly to the Roblox app. The provided example
provides a place ID and a URL encoded launch data string.

<table>
  <tr>
    <th scope="row">**Format**</th>
    <td>`roblox://placeId=<id>&launchData=<string>`</td>
  </tr>
  <tr>
    <th scope="row">**Example**</th>
    <td><a href="roblox://placeId=6900305353&launchData=%7B%22roomId%22%3A%202%7D">Example Link</a></td>
  </tr>
</table>

### Deferred

For users who don't have Roblox installed on their mobile devices, use the
AppsFlyer version of a deep link to let users download the Roblox app and then
follow the deep link. To construct this type of deep link, specify the
`https://ro.blox.com/Ebh5?` prefix. Provide the "direct to app" deep link with
the `af_dp` parameter and the "web listing to app" deep link with the
`af_web_dp` parameter, which are described in the previous sections.

<table>
  <tr>
    <th scope="row">**Format**</th>
    <td>`ro.blox.com/Ebh5?af_dp=<direct_to_app_link>&af_web_dp=<web_listing_to_app_link>`</td>
  </tr>
  <tr>
    <th scope="row">**Example**</th>
    <td>`ro.blox.com/Ebh5?af_dp=roblox%3A%2F%2FplaceId%3D6900305353%26launchData%3D%257B%2522roomId%2522%253A%25202%257D&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2Fstart%3FplaceId%3D6900305353%26launchData%3D%257B%2522roomId%2522%253A%25202%257D`</td>
  </tr>
</table>

## Processing a Deep Link

In your experience, obtain the launch data with the `Class.Player:GetJoinData()`
method, which returns a [dictionary](../../luau/tables.md). In that dictionary,
the `LaunchData` key contains the string that you specified in the `launchData`
parameter of your deep link.

See the `Class.Player:GetJoinData()` reference documentation for code samples on
how to process launch data.
