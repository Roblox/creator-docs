---
title: Collaboration
description: Studio's built-in collaboration tools let creators contribute independently, or work together with a team.
---

Creating a high-quality experience demands many skills such as modeling, scripting, user interface design, and audio production. It's unlikely that one person has all of these skills, which makes collaboration between different roles an essential part of the development workflow.

With Studio's **built-in** **collaboration tools**, creators can contribute to experiences independently on their own time, or work together with their team all at the same time.

<img src="../assets/studio/collaboration/Collaborative-Session.jpg" alt="Three creators working together in a collaborative session, each with different color markers to demonstrate what objects they're currently editing in the environment." />

## Manage collaborators

Collaborators you add to an experience have permission settings that correspond to their level of access to the experience. As follows are the different user permission settings:

<table>
  <thead>
    <tr>
      <th>Permission</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>**Owner**</td>
      <td>User is the owner of the experience and has permission to configure other users' permissions.</td>
    </tr>
		<tr>
      <td>**Edit**</td>
      <td>User has permission to edit the experience. This also grants the user **Play** permission.</td>
    </tr>
		<tr>
      <td>**Play**</td>
      <td>User has permission to play the experience privately.</td>
    </tr>
		<tr>
      <td>**No&nbsp;Access**</td>
      <td>User does not have either **Edit** or **Play** permissions.</td>
    </tr>
	</tbody>
</table>

There are some small differences when managing collaborators in [group‑owned experiences](#group-owned-experiences) vs. [user‑owned experiences](#user-owned-experiences).

### Group-owned experiences

For [group](../projects/groups.md) experiences, only the group owner or members with sufficient permissions can manage the group's roles, either across **all group experiences** or on a **per‑experience** basis. Such users can also add individual collaborators to group‑owned experiences in the same workflow as [user‑owned](#user-owned-experiences) experiences, but only for **Play** access.

<Tabs>
<TabItem label="All group experiences">
If you're the group owner or a member with sufficient permissions, you can configure collaboration across **all** group experiences, for example grant **Edit** permission to an "Audio&nbsp;Artist" group role so they can fine-tune audio playback across multiple group experiences.

1. From the [Creator Dashboard](https://create.roblox.com/dashboard/creations), expand the account switcher in the upper‑left and select the group.
1. Expand the account switcher again, select **Settings** under the group's name, then select **Roles**.
1. Enable [Edit all group experiences](../projects/groups.md#roles-and-permissions) for roles that should have editing permission. Remember to click **Save Changes** for each role that you change.

   In Studio's **Manage Collaborators** window for any group-owned experience, eligible roles display **Edit** permission but are muted to indicate that you can't change the permission level from Studio.

   <img src="../assets/studio/general/Toolbar-Manage-Collaborators.png" width="800" alt="Studio's mezzanine bar with the Collaborate button highlighted." />

   <img src="../assets/studio/collaboration/Edit-Permission-All-Group-Experiences.png" width="760" alt="Manage Collaborators window showing permission level selection for each group role." />

</TabItem>
<TabItem label="Per-experience">
If you're the group's owner, you can grant permissions on a per-experience basis to roles that do not have those permissions across all group experiences. For example, you can temporarily grant **Edit** permission to an "FX&nbsp;Artist" group role so they can fine-tune visual effects before an experience's public release.

1. In Studio's **Manage Collaborators** window for any group-owned experience, select **Edit** from the permissions dropdown for the desired roles. Remember that you can only modify roles that do **not** already have edit permission across all group experiences.

   <img src="../assets/studio/general/Toolbar-Manage-Collaborators.png" width="800" alt="Studio's mezzanine bar with the Collaborate button highlighted." />

   <img src="../assets/studio/collaboration/Edit-Permission-Per-Experience.png" width="760" alt="Manage Collaborators window showing permission level selection for each group role." />

2. Click **Save** for your collaboration settings to take effect. All group members within the modified roles should now have **Edit** permission for this experience only; this action won't grant them equal permission to other group experiences.

</TabItem>
</Tabs>

### User-owned experiences

For user-owned experiences, you can grant **Play** access to any user or [group](../projects/groups.md), but you can only grant **Edit** permission to Roblox connections.

To give **Edit** permission to a connection for an experience that you own:

1. With the experience open in Studio, click the **Collaborate** button on the right side of the mezzanine bar.

   <img src="../assets/studio/general/Toolbar-Collaborate.png" width="800" alt="Studio's mezzanine bar with the Collaborate button highlighted." />

1. Type into the search bar at the top to search for a collaborator to add. A dropdown appears listing matching collaborators, with connections indicated by the **Connection** label. Select the collaborator to add.

   <img src="../assets/studio/collaboration/Collaborator-Search.png" width="760" alt="Manage Collaborators window showing search query for a Roblox connection." />

1. Select **Edit** from the permissions dropdown for the connection, then click **Save** for your collaboration settings to take effect.

## Access a session

Those who have permission to edit an experience can join a collaborative session as follows:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Locate the experience depending on whether it's [group-owned](#group-owned-experiences) or [user-owned](#user-owned-experiences).

   <Tabs>
   <TabItem label="Group-Owned Experience">

   1. Select the group from the upper‑left selector menu.
   2. Make sure **Creations** is selected on the left and **My Experiences** in the main panel.

      <Grid container spacing={1} alignItems="center">
        <Grid item><Chip label="My Experiences" color="primary" size="medium" /></Grid>
        <Grid item><Chip label="Shared With Me" color="secondary" size="medium" /></Grid>
      </Grid>

   </TabItem>
   <TabItem label="User-Owned Experience">

   1. Select your personal account from the upper‑left selector menu.
   2. Make sure **Creations** is selected on the left and **Shared With Me** in the main panel.

      <Grid container spacing={1} alignItems="center">
        <Grid item><Chip label="My Experiences" color="secondary" size="medium" /></Grid>
        <Grid item><Chip label="Shared With Me" color="primary" size="medium" /></Grid>
      </Grid>

   </TabItem>
   </Tabs>

1. Hover over the experience's tile and click the **Edit in Studio** button to collaborate.

   <img src="../assets/creator-dashboard/Edit-Button-Experience.png" width="200" alt="A close up view of an experience tile with the Edit in Studio button highlighted." />

### View collaborators

While working in a collaborative session, you can see the current collaborators in the upper-right corner of Studio, each with a unique assigned color that's consistent across all collaborators' devices.

<img src="../assets/studio/general/Toolbar-Current-Collaborators.png" width="800" alt="Studio's menu bar with icons of the current collaborators highlighted." />

To view more details on the current collaborators, click on any of the icons to open the **Live Collaborators** window. In this window, you can see whether a user is active or inactive inside Studio, as well as an indication of where the user is working. Users become inactive if they do not use Studio for more than 5 minutes.

<img src="../assets/studio/collaboration/Live-Collaborators-Status.png" width="280" alt="Live Collaborators window with icons of current collaborators, as well as their activity status." />

### Selection visualization

By default, selected code in the [Script Editor](../studio/script-editor.md) and selected objects in the 3D viewport are highlighted with the unique color assigned to each collaborator. Additionally, the [Explorer](../studio/explorer.md) window marks selected objects with dots in these assigned colors to indicate selection by other collaborators.

<Grid container spacing={2}>
<Grid item>
<img src="../assets/studio/collaboration/User-Color-Parts.jpg" width="420" alt="A viewport view of a block part pyramid. The parts near the top of the pyramid are highlighted in green to signify that the collaborator with the green color has the parts selected in their Studio instance." />
</Grid>
<Grid item>
<img src="../assets/studio/collaboration/User-Color-Explorer.png" width="320" alt="A close up view of the three block part objects in the Explorer window. There is a green circle near the objects to signify that the collaborator with the green color has the parts selected in their Studio instance." />
</Grid>
</Grid>

To make all collaborators' selections invisible to only you while still seeing their work, uncheck **Show collaborator selections** at the bottom of the [Live Collaborators](#view-collaborators) window.

<img src="../assets/studio/collaboration/Live-Collaborators-Toggle-Selections.png" width="280" />

### Join collaborators

To quickly jump to a location in the workspace or to the exact line in a script that a collaborator is editing, hover over their name in the [Live Collaborators](#view-collaborators) window and click **Join**.

<img src="../assets/studio/collaboration/Live-Collaborators-Join.png" width="280" />

## Comments

Roblox Studio has a **comments** feature that lets you pinpoint an object in the 3D viewport and start a conversation with your collaborators, leave to-do notes, and more. Comments update in real time which lets you and your team receive and respond to feedback without disrupting your workflow in Studio. You can also receive personalized [notifications](#notifications) to help you stay on top of feedback, even when you're not using Studio.

### Workflow

To create a comment, click the **Comment** button on the right side of Studio's mezzanine (keyboard shortcut <kbd>C</kbd>).

<img src="../assets/studio/general/Toolbar-Comments.png" alt="Studio's mezzanine bar with the Comments button highlighted." width="800" />

In the viewport, your cursor turns blue. Click on any object that inherits from `Class.BasePart` (most do, including `Class.Terrain`), type your comment, and click **Submit**.

<img src="../assets/studio/collaboration/Comments-Cursor.jpg" alt="Blue comment cursor in the viewport." width="800" />

<Alert severity="info">
To **tag** a collaborator in your comment, use the `@username` syntax. You can tag any collaborator in the group for a [group‑owned](#group-owned-experiences) experience or any user with **Play** or **Edit** permissions in a [user‑owned](#user-owned-experiences) experience.
</Alert>

Comments appear in the **Comments** window, accessible from Studio's **Window**&nbsp;⟩ **Collaboration** menu, with the most recent comments at the top. From within the **Comments** window, you can:

- Single-click on a comment to show the full conversation in the 3D viewport.
- Double-click on a comment to zoom in on it in the viewport.
- Use the **&ctdot;** menu in the upper-right corner to show resolved comments, filter for only the comments that you've been tagged in, or hide comments in the viewport.
- Resolve comments as you and your team address them. After you resolve a comment, it disappears from both the viewport and the main list, but it isn't completely gone; you can always un‑resolve it later.

<img src="../assets/studio/collaboration/Comments-Window.png" width="360" />

### Notifications

To help you stay on top of feedback even when you're not using Studio, you'll receive an **email digest** that recaps all recent activity. Each email digest provides a simple overview of comment activity per place, including:

- When someone mentions (tags) you in a comment, for example `@username`.
- When someone comments in a thread that you previously replied to or were mentioned in.
- When someone resolves a thread that you previously replied to or were mentioned in.

From within the email overview, simply click **View in Studio** to go directly to the conversation in Roblox Studio.

<Alert severity="info">
You're always in control of both the type and source of comments which make up email digests. Mentions and reply notifications are on by default, while resolution notifications are off. You can also unsubscribe from a specific place or thread if you don't need updates.
</Alert>

## Collaborative scripting

In a collaborative session, you can code together in real time through [live scripting](#live-scripting), or you can [draft](#drafts-mode) scripts in a more focused environment before committing them to a collaborator-shared repository.

### Live scripting

**Live Scripting** lets collaborators code together in real time. In the [Script Editor](../studio/script-editor.md), each collaborator's cursor color matches their assigned color in the [Live Collaborators](#view-collaborators) window.

<Grid container spacing={2}>
<Grid item>
<img src="../assets/studio/collaboration/Live-Scripting-Cursors.png" width="520" alt="Script Editor window showing cursors for two collaborators, colored according to their assigned color in the Live Collaborators window." />
</Grid>
<Grid item>
<img src="../assets/studio/collaboration/Live-Collaborators-Status.png" width="280" alt="Live Collaborators window with icons of current collaborators, as well as their activity status." />
</Grid>
</Grid>

While live scripting, edits are auto‑saved every 5 minutes just like place edits, and a collaborator can manually save a script at any time with <kbd>Ctrl</kbd><kbd>S</kbd> (<kbd>⌘</kbd><kbd>S</kbd>). Saved or auto‑saved versions are logged in the [Script History](#view-script-history) window.

<Alert severity="info">
Live Scripting is **enabled** by default. If you and your team prefer to collaborate on scripts in an environment similar to source control, explore [Drafts](#drafts-mode) mode.
</Alert>

### Drafts mode

Through **Drafts** mode, you can independently edit and test scripts without affecting the experience for others. After you finish drafting a script, you can [commit](#commit-drafts) it to the shared repository and use [collaborative testing](../studio/testing-modes.md#collaborative-testing) to test the committed version with others.

<Alert severity="warning">
Drafts Mode is **disabled** by default. To enable it, open Studio's **File**&nbsp;⟩ **Experience Settings** window, select the **Other** tab, and turn on **Enable Drafts Mode**.

Note that all collaborators will need to exit the session for the change to take effect. Alternatively, you can [disable collaboration](#disable-collaboration) and then reenable it to restart the session.
</Alert>

#### Commit drafts

Once you've edited a script, it appears in the **Drafts** window, a non‑default window which you must add to a [custom tab](../studio/ui-overview.md#custom-tabs) in Studio's toolbar.

<img src="../assets/studio/collaboration/Drafts-Window.png" alt="The Drafts window with two drafted script instances." width="360" />

Drafts are saved to your local file system and persist between Studio sessions on the same machine. To commit your local edits to the repository, left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts. Then click **Commit** to commit all selected scripts.

<img src="../assets/studio/collaboration/Drafts-Commit.png" alt="The Drafts window with the Commit button highlighted." width="360" />

#### Compare and merge changes

If another collaborator commits changes to the same script that you're editing, an icon with a green **&CirclePlus;** symbol appears in the **Drafts** window. To view their changes, right‑click the script and select **Compare With Server**.

<img src="../assets/studio/collaboration/Drafts-Compare.png" alt="The Drafts window with the green plus icon highlighted to the left of a changed script, and the right-click popup window showing with the Compare With Server option highlighted." width="360" />

In the **(Diff)** tab that opens in the [Script Editor](../studio/script-editor.md), code that other collaborators changed or deleted appears in red, while code that you updated appears in green.

<img src="../assets/studio/collaboration/Drafts-Diff-Result.png" alt="A close up view of lines that were edited by different collaborators." width="800" />

To merge their changes into your script:

1. In the **Drafts** window, right‑click the script and select **Merge From Server**.

   <img src="../assets/studio/collaboration/Drafts-Merge.png" alt="The Drafts window right-click popup window showing with the Merge From Server option highlighted." width="360" />

1. In the merge window, you can pick which code to keep, or make manual edits.

   - Check **Draft** to keep your changes, or leave it unchecked to discard them.
   - Check **Server** to merge the committed changes into your draft, or leave it unchecked to ignore them.
   - Check **Other** to manually edit the script and save the changes to your draft.

1. Once you've previewed the merge resolution, click **Merge All** to update your local script.

#### Restore deleted scripts

If a collaborator deletes a script that you're editing, an icon with a red **&#8856;** symbol appears in the **Drafts** window. To restore the script, right‑click it and select **Restore Script**. Scripts are restored to the place's **Workspace** tree, so you may need to manually re‑parent them back to their original location.

<img src="../assets/studio/collaboration/Drafts-Restore.png" alt="The Drafts window with the red cross icon highlighted to the left of a deleted script, and the right-click popup window showing with the Restore Script option highlighted." width="360" />

### View script history

All script changes, whether saved by a collaborator, auto-saved, or committed by a collaborator through [Drafts](#drafts-mode) mode, are logged in the **Version History** window. To access it:

1. Right-click the script in the [Explorer](../studio/explorer.md) window and select **View Script History**.
2. In the **Version History** window that opens, you'll see all committed versions of the script, the commit date, which collaborator committed, and more. From this window, the following actions are possible:

   <Tabs>
   <TabItem label="Compare With Previous">
   To compare any version (except the oldest) with its previous version, select it and click **Compare With Previous Version**. In the **(Diff)** tab that opens in the [Script Editor](../studio/script-editor.md), code from the newer version appears in green while code from the older version appears in red.
   </TabItem>
   <TabItem label="Compare Selected">
   To compare any **two** versions, hold <kbd>Ctrl</kbd> or <kbd>⌘</kbd> and select both, then click **Compare Selected Versions**. In the **(Diff)** tab that opens in the [Script Editor](../studio/script-editor.md), code from the newer version appears in green while code from the older version appears in red.
   </TabItem>
   <TabItem label="Open">
   If the version **Comment** indicates just one script was committed, select it and click **Open Script** to open it in the [Script Editor](../studio/script-editor.md).

   If the version **Comment** indicates more than one script was committed (commonly the result of an auto‑save on multiple unsaved scripts), you can click **Show** within the version's row to open a popup displaying the script(s) and their respective version. Then, from the version history window, click **Open All Scripts From Batch** to open them in the [Script Editor](../studio/script-editor.md).
   </TabItem>
   </Tabs>

## Save and publish

During a collaborative session, Studio automatically saves the project to the cloud every four minutes.

## Revert to previous versions

The owner of an experience can revert changes made by other editors. See [here](../projects/configure-experiences.md#access-version-history) for instructions.

<Alert severity="error">
Be careful when reverting changes. If anyone is currently editing the experience in a collaborative session, their changes may still auto‑save and overwrite the revert action. To ensure that nobody else is editing the place when you revert, [disable collaboration](#disable-collaboration).
</Alert>

You might also want to check [Activity History](activity-history.md). This view provides a chronological event log that improves team visibility into key experience settings.

## Disable collaboration

**Team Create** is the core Studio feature that enables collaboration. Workflows that involve the [Manage Collaborators](#manage-collaborators) dialog will automatically enable the feature, but you can manually disable it if necessary.

1. If the [Live Collaborators](#view-collaborators) window isn't already open, click on any of the collaborator icons to open it.

   <img src="../assets/studio/general/Toolbar-Current-Collaborators.png" width="800" />

2. In the bottom-right corner of the window, click the **&ctdot;** button and select **Disable Team Create**.

   <img src="../assets/studio/collaboration/Live-Collaborators-Disable.png" width="280" />

3. When prompted, confirm ending the session to reload the place in a non‑collaborative state.
