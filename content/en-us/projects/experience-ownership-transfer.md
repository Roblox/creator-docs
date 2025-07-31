---
title: Experience ownership transfer
description: Transfer ownership of an experience to other Roblox users or groups.
---

With **experience ownership transfer**, you can transfer your experiences to [groups](./groups.md) you have publish access to. This unlocks all of the features available to groups, including permissions and revenue management, and allows you to efficiently manage your content as your team scales and your priorities shift.

## Prerequisites

Before making a transfer or accepting a transfer, you must first:

- Verify your email address.
- Upload your private `Class.ModuleScript|ModuleScripts` and `Class.InsertService|InsertService` asset usages to the group you're transferring the experience to. If the experience uses packages where the package owner is a user and not a group, you might have to recreate those packages or replace them with packages that are already owned by a group.

<Alert severity="info">
As a best practice, if you're using Open Cloud API keys for the experience, create an API key as the new owner with the name `RobloxTransferApiKey`. During the transfer, the relevant scopes are added to this new key and removed from the original key. You can then use a feature flag to allow your backend services to start using the new key after the transfer is complete.
</Alert>

## Transfer an experience

To transfer an experience to a group:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and choose the experience you want to transfer.
2. Go to **Configure** ⟩ **Settings**.
3. Click **Initiate ownership transfer**.
4. In the **Transfer Details** dialog, carefully read and acknowledge the implications of the transfer. Then, click **Next**.
5. Select a group to transfer the experience to. You must be able to publish experiences to this group.
6. Verify the transfer by entering the experience name.
7. Click **Initiate transfer**. The **Content Settings** page updates to include the pending group's username.

   <Alert severity="warning">
   Once the group accepts the transfer, Roblox makes your experience private and closes all servers associated with it. The transfer process typically completes in a few minutes but may take longer for complex experiences.
   </Alert>

   <Alert severity="info">
   To cancel a pending transfer, click **Cancel transfer request** in the **Content Settings** page.
   </Alert>

## Receive a transferred experience

To receive a transferred experience:

1. Go to the experience page of the experience you're receiving. You can navigate to this page by clicking the transfer request notification you received when the experience's current owner initiated the transfer, or by directly getting the overview page link from the current owner.
2. In the **Transfer Details** dialog, carefully read and acknowledge the implications of the transfer. Then, click **Next**.
3. Verify the transfer by entering the experience name.
4. Click **Accept transfer**.

   <Alert severity="warning">
   Once your group accepts the transfer, Roblox makes the experience private and closes all servers associated with it. The transfer process typically completes in a few minutes but may take longer for complex experiences.
   </Alert>

5. After the transfer to your group is complete, set up any new permissions you need and make the experience public again.

## Frequently asked questions

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">What kind of information does the transferred experience retain?</Typography>
</AccordionSummary>
<AccordionDetails>
The transferred experience retains its old experience ID, place ID, and URL.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Do transfer requests expire?</Typography>
</AccordionSummary>
<AccordionDetails>
Yes, transfer requests expire after 7 days.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">How often can the same experience be transferred?</Typography>
</AccordionSummary>
<AccordionDetails>
After receiving a transferred experience, you must wait 30 days to transfer that experience again.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Can changes be made to an experience that's transferring?</Typography>
</AccordionSummary>
<AccordionDetails>
You can continue making changes to the experience until the new group owner accepts the transfer and the transfer process begins. Changes you make during the active transfer process specifically aren't carried over.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">What happens to credit card information when an experience is transferred?</Typography>
</AccordionSummary>
<AccordionDetails>
Roblox removes credit card information when you transfer an experience.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">What happens to revenue from private server subscriptions when an experience is transferred?</Typography>
</AccordionSummary>
<AccordionDetails>
The group you transferred your experience to receives the revenue from any existing private server subscriptions. This revenue does not respect any group or experience revenue splitting.

New private server subscriptions respect revenue splitting.
</AccordionDetails>
</BaseAccordion>

<BaseAccordion>
<AccordionSummary>
<Typography variant="subtitle2">Does transferring an experience impact discovery?</Typography>
</AccordionSummary>
<AccordionDetails>
Transferring an experience doesn't impact search as long as the experience title remains the same, the new group owner is not a moderated account, and the experience is made public again after the transfer.

Note that transferring an experience can impact discovery for up to 24 hours after the new group owner makes the experience public again.
</AccordionDetails>
</BaseAccordion>
