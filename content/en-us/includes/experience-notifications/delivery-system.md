---
title: include
---

A spam prevention system exists to ensure the quality of notifications for users and protect the shared notification channel for all developers. Because of this, delivery of notifications is not guaranteed. This spam prevention system is directly informed by user engagement: the more users engage with your notifications, the more reach they'll receive. You can transparently track engagement metrics in the analytics dashboard, as explained below.

Experience notifications have a static throttle limit; each user can receive one notification per day from a given experience, and you receive transparent feedback when a user's throttle limit is reached.

Additionally, the following list outlines some of the special cases which may result in **non‑delivery** of a notification:

- Experience **eligibility requirements** are not met.
- Recipient is not opted in to notifications from your experience.
- Recipient's throttle limit for your experience has been reached.
- Recipient's aggregate daily throttle limit has been reached.
- Missing or invalid request parameters.
- Notification string was moderated.
- For notifications with user mentions, non-delivery occurs if either of these conditions are met:
  - The receiver and mentioned user are not connections.
  - The mentioned user has **No** selected for "Update connections about my activity?" under **Privacy**&nbsp;&rarr; **Other&nbsp;Settings** in their Roblox account settings.
