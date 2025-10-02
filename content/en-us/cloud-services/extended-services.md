---
title: Extended Services
description: Extended Services is a platform that lets you manage your free and paid services.
---

Extended Services is a solution that lets you manage service usage and payment beyond Roblox's default limits.

## Eligibility requirements

To use Extended Services, your Roblox account must:

- Be [ID-verified](../production/publishing/account-verification.md#verify-through-government-id).
- Be located in the United States.
- Have a valid email address associated with it.
- Not currently be banned or moderated.
- Accept and comply with the [terms of service](https://en.help.roblox.com/hc/articles/37967848292500).

<Alert severity="info">
  For group accounts, only the group owner needs to meet the eligibility requirements.
</Alert>

## Unlock Extended Services

If you meet all of the [eligibility requirements](#eligibility-requirements), you can finish setting up Extended Services by entering your account details and payment information. For group-owned experiences, only the group owner can unlock Extended Services and onboard the experience onto it.

To unlock and use Extended Services:

1. In the Creator Dashboard, go to Creations and select an experience.
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

<Alert severity="warning">
  Extended Services is currently only available for the [Memory stores service](./memory-stores/index.md).
</Alert>

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
    <td style={{border: 'none'}}>1000 + (CCU x 120) request units</td>
    <td style={{border: 'none'}}>$0.003 / 1M request units</td>
  </tr>
  <tr>
    <td style={{paddingBottom: '24px'}}>Storage</td>
    <td style={{paddingBottom: '24px'}}>64KB + (CCU x 1.2KB)</td>
    <td style={{paddingBottom: '24px'}}>$0.10 / GB Hours&sup1;</td>
  </tr>
</tbody>
</table>

<figcaption>&sup1; GB Hours = the storage consumption multiplied by the amount of time. For example, 100GB Hours might equate to "100GB x 1 hour" or "200GB x 0.5 hours".</figcaption>
