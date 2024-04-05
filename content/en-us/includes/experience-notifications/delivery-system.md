---
title: include
---

A spam prevention system exists to ensure the quality of notifications for users and protect the shared notification channel for all developers. Because of this, delivery of notifications is not guaranteed. This spam prevention system is directly informed by user engagement: the more users engage with your notifications, the more reach they'll receive. You can transparently track engagement metrics in the [analytics](#analytics) dashboard, as explained below.

To start, Experience Notifications are subject to the same static throttle limit of [experience update](../../production/promotion/audience-engagement.md#announcing-updates) notifications. Each user can receive one notification every three days from a given experience and you'll receive transparent feedback when a user's throttle limit is reached. The limit will be relaxed over time.

Additionally, the following list outlines some of the special cases which may result in **non‑delivery** of a notification:

- Experience [eligibility requirements](#experience-eligibility-requirements) are not met.
- Recipient is not opted in to notifications from your experience.
- Recipient's throttle limit for your experience has been reached.
- Recipient's aggregate daily throttle limit has been reached.
- Missing or invalid request parameters.
- Notification string was moderated.
