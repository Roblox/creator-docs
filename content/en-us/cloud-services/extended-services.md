---
title: Extended Services
description: Extended Services is a platform that lets you manage your free and paid services.
---

Extended Services is a solution that lets you manage service usage and payment beyond Roblox's default limits.

## Eligibility requirements

To use Extended Services, your Roblox account must:

- Be [ID-verified](../production/publishing/account-verification.md#verify-through-government-id) and 18+ years old.
- Be located in a [supported country](#supported-countries).
- Have a valid email address associated with it.
- Not currently be banned or moderated.
- Accept and comply with the [terms of service](https://en.help.roblox.com/hc/articles/37967848292500).

<Alert severity="info">
  For group accounts, only the group owner needs to meet the eligibility requirements.
</Alert>

## Unlock Extended Services

If you meet all of the [eligibility requirements](#eligibility-requirements), you can finish setting up Extended Services by entering your account details and payment information. For group-owned experiences, only the group owner can unlock Extended Services and onboard the experience onto it.

To unlock and use Extended Services:

1. In the [Creator Dashboard](https://create.roblox.com/dashboard/creations), go to **Creations** and select an experience.
2. Go to **Extended Services**.
3. If you haven't entered your account details and payment information yet, click **Add missing information** on the top banner.
    1. Enter your account information. The **Account type**, **Tax ID type**, and **Tax ID** fields are optional.
        - You can also go to **Finances** ⟩ **Account Information** under the **Extended Services** section to manage your account information. You don't need to update anything else on this page.
    2. Click **Next**.
    3. Enter a payment method. You can enter a new payment method or select from the available payment options already associated with your Roblox account.
        - You can also go to **Finances** ⟩ **Payments** to add new payment methods, or go to **Finances** ⟩ **Billing** to set a new default payment method.
    4. Click **Save**.

<h5>Account status</h5>

Your Extended Services account can be in one of the following statuses:

<table>
<thead>
  <th width="15%">**Status**</th>
  <th width="40%">**Description**</th>
  <th width="80%">**Required action**</th>
</thead>
<tbody>
  <tr>
    <td>**Normal**</td>
    <td>You can use all Extended Services features.</td>
    <td>No action is required.</td>
  </tr>
  <tr>
    <td>**Overdue**</td>
    <td>Your account is overdue because your automatic payment method failed. Roblox offers a grace period of **seven days** before suspending your Extended Services account.</td>
    <td>Change your payment method and retry a manual payment, or wait until Roblox attempts to charge your payment method again after the grace period has ended.</td>
  </tr>
  <tr>
    <td>**Suspended**</td>
    <td>You can't use any paid Extended Services. You can, however, still use services with default limits.</td>
    <td>Fix your eligibility requirements, add a valid payment method, or manually pay the overdue balance on your account.</td>
  </tr>
</tbody>
</table>

## Enable a service

To enable a service:

1. Go to **Extended Services**.
2. Toggle on the service you want to enable.
3. Enter a monthly budget for each applicable resource under the service. The minimum monthly budget you can set is $0.50 USD.

Your payment method is charged either at the end of the month when a bill is generated, or when your usage reaches $10 USD, whichever comes first.

You can increase or decrease a service's monthly budget any time. Your service is automatically throttled if you decrease your budget to an amount below your current month-to-date usage, or if you exceed the budget you have set.

Roblox notifies you by email when your usage reaches 80% of your budget, and then again when it reaches 100%.

## Manage billing

To access the Extended Services billing dashboard:

1. Go to **Finances** ⟩ **Billing**.
2. Select the **Cloud services** tab to display the following:
    - Your pending balance, including month-to-date cost
    - Your billing history, including all Extended Services billing activity across your experiences

For a detailed breakdown of your current pending balance costs, click **View Details** next to your payment method. For a detailed invoice of a previous bill, click **View Bill** under **Billing history**.

## Service pricing

See the following table for Extended Services pricing.

<table>
<thead>
  <th>**Service**</th>
  <th>**Default**</th>
  <th>**Extended**</th>
</thead>
<tbody>
  <tr>
    <td style={{border: 'none'}}><a href="https://create.roblox.com/docs/cloud-services/memory-stores" style={{color: 'inherit', textDecoration: 'underline'}}><strong>Memory stores</strong></a></td>
  </tr>
  <tr>
    <td style={{border: 'none'}}>Request units</td>
    <td style={{border: 'none'}}>1000 + (CCU x 120) request units per minute</td>
    <td style={{border: 'none'}}>$0.003 / 1M request units</td>
  </tr>
  <tr>
    <td style={{paddingBottom: '24px'}}>Storage</td>
    <td style={{paddingBottom: '24px'}}>64KB + (CCU x 1.2KB)</td>
    <td style={{paddingBottom: '24px'}}>$0.10 / GB per Hour&sup1;</td>
  </tr>
    <tr>
    <td style={{border: 'none'}}><a href="https://create.roblox.com/docs/audio/objects#text-to-speech" style={{color: 'inherit', textDecoration: 'underline'}}><strong>Text-to-speech</strong></a></td>
  </tr>
  <tr>
    <td style={{paddingBottom: '24px'}}>Requests</td>
    <td style={{paddingBottom: '24px'}}>1 + (CCU x 6) requests per minute</td>
    <td style={{paddingBottom: '24px'}}>$5.00 / 1M requests</td>
  </tr>
    <tr>
    <td style={{border: 'none'}}><a href="https://create.roblox.com/docs/cloud-services/data-stores" style={{color: 'inherit', textDecoration: 'underline'}}><strong>Access to standard data stores</strong> (coming soon)</a></td>
  </tr>
  <tr>
    <td style={{border: 'none'}}>Get</td>
    <td style={{border: 'none'}}>250 + (CCU * 40) requests per minute</td>
    <td style={{border: 'none'}}>$0.08 / 1M requests</td>
  </tr>
  <tr>
    <td style={{border: 'none'}}>Set</td>
    <td style={{border: 'none'}}>250 + (CCU * 20) requests per minute</td>
    <td style={{border: 'none'}}>$0.80 / 1M requests</td>
  </tr>
    <tr>
    <td style={{border: 'none'}}>List</td>
    <td style={{border: 'none'}}>10 + (CCU * 2) requests per minute</td>
    <td style={{border: 'none'}}>$0.60 / 1M requests</td>
  </tr>
    <tr>
    <td style={{border: 'none'}}>Remove</td>
    <td style={{border: 'none'}}>100 + (CCU * 40) requests per minute</td>
    <td style={{border: 'none'}}>$0.80 / 1M requests</td>
  </tr>
  <tr>
    <td style={{border: 'none'}}><a href="https://create.roblox.com/docs/cloud-services/data-stores" style={{color: 'inherit', textDecoration: 'underline'}}><strong>Access to ordered data stores</strong> (coming soon)</a></td>
  </tr>
  <tr>
    <td style={{border: 'none'}}>Get</td>
    <td style={{border: 'none'}}>250 + (CCU * 40) requests per minute</td>
    <td style={{border: 'none'}}>$0.08 / 1M requests</td>
  </tr>
  <tr>
    <td style={{border: 'none'}}>Set</td>
    <td style={{border: 'none'}}>250 + (CCU * 20) requests per minute</td>
    <td style={{border: 'none'}}>$0.25 / 1M requests</td>
  </tr>
    <tr>
    <td style={{border: 'none'}}>GetSorted</td>
    <td style={{border: 'none'}}>100 + (CCU * 2) requests per minute</td>
    <td style={{border: 'none'}}>$0.32 / 1M requests</td>
  </tr>
    <tr>
    <td style={{border: 'none'}}>Remove</td>
    <td style={{border: 'none'}}>100 + (CCU * 40) requests per minute</td>
    <td style={{border: 'none'}}>$0.25 / 1M requests</td>
  </tr>
  <tr>
    <td style={{border: 'none'}}><a href="https://create.roblox.com/docs/cloud-services/data-stores" style={{color: 'inherit', textDecoration: 'underline'}}><strong>Data store storage</strong> (coming soon)</a></td>
  </tr>
  <tr>
    <td style={{paddingBottom: '24px'}}>Storage</td>
    <td style={{paddingBottom: '24px'}}>100 MB + (1MB * Lifetime Players) GB per Month</td>
    <td style={{paddingBottom: '24px'}}>$0.12 / GB per Month</td>
  </tr>
</tbody>
</table>

<figcaption>&sup1; GB per Hour = the storage consumption multiplied by the amount of time. For example, 100GB Hours might equate to "100GB x 1 hour" or "200GB x 0.5 hours".</figcaption>

## Supported countries

Extended Services is available in the following countries.

<table>
  <thead>
    <tr>
      <th colspan="3">Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Australia</td>
      <td>Germany</td>
      <td>Poland</td>
    </tr>
    <tr>
      <td>Austria</td>
      <td>Hong Kong</td>
      <td>Portugal</td>
    </tr>
    <tr>
      <td>Belgium</td>
      <td>Hungary</td>
      <td>Romania</td>
    </tr>
    <tr>
      <td>Brazil</td>
      <td>Ireland</td>
      <td>Singapore</td>
    </tr>
    <tr>
      <td>Bulgaria</td>
      <td>Italy</td>
      <td>Slovakia</td>
    </tr>
    <tr>
      <td>Croatia</td>
      <td>Latvia</td>
      <td>Slovenia</td>
    </tr>
    <tr>
      <td>Cyprus</td>
      <td>Lithuania</td>
      <td>South Africa</td>
    </tr>
    <tr>
      <td>Czechia</td>
      <td>Malta</td>
      <td>Spain</td>
    </tr>
    <tr>
      <td>Denmark</td>
      <td>Mexico</td>
      <td>Sweden</td>
    </tr>
    <tr>
      <td>Estonia</td>
      <td>Netherlands</td>
      <td>Switzerland</td>
    </tr>
    <tr>
      <td>Finland</td>
      <td>New Zealand</td>
      <td>Thailand</td>
    </tr>
    <tr>
      <td>France</td>
      <td>Norway</td>
      <td>United States</td>
    </tr>
  </tbody>
</table>
