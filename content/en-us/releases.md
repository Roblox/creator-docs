---
title: Release notes overview
description: Learn how version notes, weekly updates, and pending updates describe changes to Roblox.
---

Release notes track improvements, fixes, and changes to Roblox. Start with the current version to find where changes were introduced, current updates to review completed changes, or pending updates to see changes awaiting availability.

## Find the right page

| Navigation item     | What it shows                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| **Current updates** | The latest weekly summary of completed changes.                                                |
| **Current version** | Changes introduced in the latest documented version, including changes that are still pending. |
| **Pending updates** | Recently introduced changes that are not yet complete.                                         |
| **Recent updates**  | Previous weekly summaries.                                                                     |
| **Recent versions** | Previous numbered version pages.                                                               |

## Introduction and availability

**Introduced in version N** identifies the first version associated with a change. Introduction and availability can happen at different times: a version can introduce a change before Roblox enables it.

Numbered pages include both complete and pending changes. An entry on a version page does not, by itself, mean that the change is available yet. To see where it's available, check the change's [status](#statuses) in weekly updates or pending updates.

Each change belongs to its earliest introduction version. For example, a change introduced in version 736 and carried forward into versions 737 and 738 belongs on the version 736 page. Its presence in later versions does not make it a new introduction.

### How flags control availability

Roblox can ship code for a change with a **flag**, a setting that controls whether that code is active. The flag acts as a gate: while it is off, the new behavior remains inactive even though the code is included in the version. Enabling the flag makes that behavior available without requiring another code release.

This separates shipping code from enabling a change. Flags let Roblox roll out changes gradually and turn off the new behavior if an issue appears. As a result, a change can appear on a version page while it is still pending, and availability can vary during a rollout.

Roblox also experiments with features before making them broadly available. A feature might be enabled for a limited group while Roblox evaluates its behavior and gathers feedback. These experiments can take time, so a change can remain pending after its introduction or be available to some creators before others. An introduction version does not promise an availability date.

## Statuses

Weekly updates and pending updates show each change's status. Version pages don't show statuses.

| Status           | What it means                                                                                             | How it's determined                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Live**         | The change is available to everyone.                                                                      | The change is complete and no flags control it.                                                                                                                                           |
| **Experimental** | The change is available in Studio and other Roblox apps, but Roblox can still turn it off or change it.   | Every flag that controls the change is on in Studio and other Roblox apps. When the flags are removed, the status switches to **Live**.                                                   |
| **Studio**       | The change is available in Studio but not yet in other Roblox apps. It might be a Studio-specific change. | Every flag that controls the change is on in Studio, but not in other Roblox apps.                                                                                                        |
| **Pending**      | The change isn't available for everyone yet.                                                              | At least one flag that controls the change is off in Studio or isn't in every Studio build yet, Roblox can't determine where the change's flags are on, or work on the change is ongoing. |

A flag counts as on only when it's on for everyone in Studio or in an app, not when it's on for some users during a rollout. Mobile apps can take longer to update than Studio and desktop apps, so a change can reach mobile devices after its status shows that it's available. Statuses are only checked for recent changes. On older weekly pages, an entry's status shows whether Roblox marked it complete, not where its flags are on.

Engine API reference pages show the same statuses on the APIs that recent changes add.

## Weekly updates

Weekly updates collect items that Roblox has marked complete: features, improvements, and fixes. A flag can still control a complete item, so check its [status](#statuses) to see where it's available.

Items are grouped under **Improvements**, **Fixes**, and **Changes**, in that order. Within each group, entries follow the order of their numbered version pages, with newer introduction versions first.

A weekly page can include changes from multiple versions. A change introduced in an earlier version can be completed later, so its introduction version can differ from the current version when it appears in weekly updates.

Click an entry's **Introduced in version N** link to open its numbered page and highlight the matching entry.

## Pending updates

Pending updates lists changes awaiting availability. By default, it shows changes introduced within the last 30 days. Click **Show all** at the bottom of the list to include pending changes introduced within the last six months. To see only changes with a particular [status](#statuses), select it above the list.

The window is based on when a change was introduced, using the recorded release week.

The list excludes items already recorded as complete. An entry can also leave the list when its introduction falls outside the time window, so disappearing from pending updates does not necessarily mean that it was completed. Check weekly updates to see whether it was.
