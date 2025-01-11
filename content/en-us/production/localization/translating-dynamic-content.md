---
title: Translating Dynamic Content
description: Explains how to use Parameters in localization tables to translate specific parts of content.
---

You can use **Parameters** in your [localization table](../../production/localization/manual-translations.md#cloud-localization-table) when only
part of the displayed string requires translation, such as localizing a
unit of measurement after a number value, referencing a username, or
displaying time and date.

<GridContainer numColumns="3">
  <figure>
    <img src="../../assets/localization/Dynamic-Content-Example-A.jpg" />
    <figcaption>Displaying an amount of in-game items.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Dynamic-Content-Example-B.jpg" />
    <figcaption>Showing a player's Roblox username in a message.</figcaption>
  </figure>
  <figure>
    <img src="../../assets/localization/Dynamic-Content-Example-C.jpg" />
    <figcaption>Displaying a high score using localized separators.</figcaption>
  </figure>
</GridContainer>

Parameters consist of a **parameter value** and an optional **format specifier** enclosed in braces.

<img src="../../assets/localization/Parameter-Diagram.png" width="80%" />

In the following example, an experience has the following entries in its localization table:

<table>
<thead>
  <tr>
    <th>Source</th>
    <th>es</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Hello &#123;Player_Name}!</td>
    <td>Hola &#123;Player_Name}!</td>
  </tr>
  <tr>
    <td>My name is &#123;NPC_Name}</td>
    <td>Me llamo &#123;NPC_Name}</td>
  </tr>
</tbody>
</table>

If a user has their locale set to **es**, the translation output would be as follows:

<table>
<thead>
  <tr>
    <th>Original In-Game Text</th>
    <th>Spanish Translation</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Hello new_storm!</td>
    <td>Hola new_storm!</td>
  </tr>
  <tr>
    <td>My name is Diva Dragonslayer</td>
    <td>Me llamo Diva Dragonslayer</td>
  </tr>
</tbody>
</table>

In some cases, you may want to use format specifiers to control how the parameter value is formatted in the localized string.

The available format specifiers are as follows:

<table>
<thead>
  <tr>
    <th>Specifier</th>
    <th>Type</th>
    <th>Description</th>
    <th>Example Output</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>int</td>
    <td>number</td>
    <td>Integer with optional negative sign; no thousand separators.	</td>
    <td>1234</td>
  </tr>
  <tr>
    <td>fixed</td>
    <td>number</td>
    <td>Two decimals with decimal indicator, optional negative sign, and no thousand separators.	</td>
    <td>1234.50<br />1234,50</td>
  </tr>
  <tr>
    <td>num</td>
    <td>number</td>
    <td>Two decimals with decimal indicator, optional negative sign, and thousand separators.</td>
    <td>1,234.50<br />1234,50 </td>
  </tr>
  <tr>
    <td>HEX</td>
    <td>number</td>
    <td>Integer converted to hex; negative is converted to 64-bit two's complement.	</td>
    <td>3FF</td>
  </tr>
  <tr>
    <td>hex</td>
    <td>number</td>
    <td>Same as HEX, but lowercase.</td>
    <td>3ff</td>
  </tr>
  <tr>
    <td>datetime</td>
    <td>number</td>
    <td>UTC timestamp as a number to universal user-readable format.</td>
    <td>2017-10-10 13:38:10</td>
  </tr>
  <tr>
    <td>iso8601</td>
    <td>number</td>
    <td>UTC timestamp as a number to ISO-8601 format UTC time.</td>
    <td>2017-10-12T22:02:38Z</td>
  </tr>
  <tr>
    <td>shorttime</td>
    <td>number</td>
    <td>UTC timestamp to local "hour:minute" format.	</td>
    <td>1:45 PM<br />13:45</td>
  </tr>
  <tr>
    <td>shortdatetime</td>
    <td>number</td>
    <td>UTC timestamp to general date+time pattern with short time.</td>
    <td>10/10/2017 1:45 PM</td>
  </tr>
  <tr>
    <td>shortdate</td>
    <td>number</td>
    <td>UTC timestamp to short date pattern.</td>
    <td>10/10/2017<br />2017-10-10</td>
  </tr>
  <tr>
    <td>translate</td>
    <td>string</td>
    <td>Looks for a literal <b>Source</b> string match in the localization table and uses available locale translation.</td>
    <td></td>
  </tr>
</tbody>
</table>

## Translating Substrings

Use the **translate** specifier when requiring a direct translation from your localization table. The localization will search for an exact match of the parameter in the Source column of your localization table.

In the following example, an experience has the following rows in its localization table:

<table>
<thead>
  <tr>
    <th>Source</th>
    <th>es</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>I am from &#123;Place_Name:translate}.</td>
    <td>Soy de &#123;Place_Name:translate}.</td>
  </tr>
  <tr>
    <td>Brazil</td>
    <td>Brasil</td>
  </tr>
  <tr>
    <td>London</td>
    <td>Londres</td>
  </tr>
  <tr>
    <td>Germany</td>
    <td>Alemania</td>
  </tr>
</tbody>
</table>

If a user has their locale set to 'es', the translation output displays as follows:

<table>
<thead>
  <tr>
    <th>Original In-Game Text</th>
    <th>Spanish Translation</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>I am from Brazil.</td>
    <td>Soy de Brasil.</td>
  </tr>
  <tr>
    <td>I am from London.</td>
    <td>Soy de Londres.</td>
  </tr>
  <tr>
    <td>I am from Germany.</td>
    <td>Soy de Alemania.</td>
  </tr>
</tbody>
</table>

## Translating With Numbers

You can use a specifier to format your numerical values to match the context within your experience.

In the following example, an experience has the following number related entries in their localization table:

<table>
<thead>
  <tr>
    <th>Source</th>
    <th>es</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>&#123;race_time:fixed} seconds	</td>
    <td>&#123;race_time:fixed} segundos	</td>
  </tr>
  <tr>
    <td>$&#123;1:num} cash and &#123;2:int} jewels	</td>
    <td>$&#123;1:num} dinero y &#123;2:int} joyas	</td>
  </tr>
</tbody>
</table>

If a user has their locale set to **es**, the translation output displays as follows:

<table>
<thead>
  <tr>
    <th>Original In-Game Text</th>
    <th>Spanish Translation</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>75.202844 seconds</td>
    <td>75,20 segundos</td>
  </tr>
  <tr>
    <td>$2500.5 cash and 99.8 jewels</td>
    <td>$2.500,50 dinero y 100 joyas</td>
  </tr>
</tbody>
</table>

<Alert severity="warning">
When using multiple parameters on a single entry, you must use either all strings or all numbers for parameter specifiers.
</Alert>
