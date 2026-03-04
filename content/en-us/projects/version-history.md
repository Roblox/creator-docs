---
title: Version History
description: Manage saved and published versions of a place with Version History.
---

**Version History** lets you track, manage, and restore saved and published versions of a place. You can use it to create and find development checkpoints, collaborate with other creators, and quickly roll back to a known good state when needed.

With Version History, you have access to the following:

- **Version notes**: Descriptive notes you can add to your saved and published places to create clear checkpoints for development milestones.
- **Search**: Search across version notes to more easily find the place version you're looking for.
- **Advanced filtering**: Filter by date range, save type (auto or manual), published saves, collaborator, and whether a save has version notes attached to it.
- **Tracking collaborators**: Track who was in a place edit session and who saved the place.
- **Dockable widget**: A Version History widget you can position anywhere in your Studio layout for easier access. You can access this widget by going to **Window** &rang; **Version History**.

   <img src="../assets/studio/general/Version-History.png" width="80%" alt="A view of the Version History window." />

<Alert severity="info">
Place versions created before Version History was introduced do not include the new metadata fields and cannot be searched or filtered by them. Add notes to older versions to make them searchable.
</Alert>

## Create a save with version notes

1. Go to **File** &rang; **Save to Roblox with Notes**.
2. Enter a version name and any notes you might have.
3. Click **Save**.

  <img src="../assets/studio/general/Version-History-Notes.png" width="60%" alt="Version History save dialog." />

You can also use the following keyboard shortcuts to save your current place version with version notes:

- Windows: <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>S</kbd>
- macOS: <kbd>Cmd</kbd> + <kbd>Option</kbd> + <kbd>S</kbd>

## Publish with version notes

Version notes are required when publishing so you can clearly track what changes were released to your players. To publish with version notes:

1. Go to **File** &rang; **Publish**.
2. Select **Publish**.
3. Enter a version name and any notes you might have.
4. Click **Publish**.

## Restore to a previous version

You can restore to a previous place version through Studio or the Creator Dashboard. This action creates a new version of the place.

<Alert severity="info">
Restoring a place to a previous version does **not** automatically publish the changes. If the place is [public](../production/publishing/publish-experiences-and-places.md#make-experience-public) and you want the restored version to replace the live version, open the place in Studio, publish it, and [restart your servers](./update-experiences.md#restart-servers).
</Alert>

Through Studio:

1. Go to **Window** &rang; **Version History** to open the Version History window.
2. Click **&vellip;** next to the version you want to restore to.
3. Click **Open Local Copy** to open a copy of the place in a new Studio session.
4. In the new Studio session, go to **File** &rang; **Save to Roblox As**.
5. Select the experience and place you want to overwrite.
6. Confirm the action to restore to that version.

Through the Creator Dashboard:

1. Go to [Creations](https://create.roblox.com/dashboard/creations) and select an experience.
2. Go to **Configure** &rang; **Places**.
3. Select the place you want to restore to a previous version.
4. Go to **Version History**.
5. Click **Restore** next to the version you want to restore to.
6. Confirm the action to restore to that version.
