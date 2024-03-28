---
title: Collaboration
description: Studio's built-in collaboration tools let creators contribute independently, or work together with a team.
---

Creating a high-quality experience demands many skills such as modeling, scripting, user interface design, and audio production. It's unlikely that one person has all of these skills, which makes collaboration between different roles an essential part of the development workflow.

With Studio's **built-in** **collaboration tools**, creators can contribute to experiences independently on their own time, or work together with their team all at the same time.

<img src="../assets/studio/collaboration/Collaborative-Session.jpg" alt="Three creators working together in a collaborative session, each with differnt color markers to demonstrate what objects they're currently editing in the environment." />

## Managing Collaborators

Collaborators you add to an experience have permission settings that correspond to their level of access to the experience. As follows are the different user permission settings:

<table>
    <thead>
        <tr>
            <th>**Permission**</th>
            <th>**Description**</th>
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

There are some small differences when managing collaborators in [user-owned experiences](#user-owned-experiences) vs. [group-owned experiences](#group-owned-experiences).

### User-Owned Experiences

For user-owned experiences, you can grant **Play** access to any user or [group](../projects/groups.md), but you can only grant **Edit** permission to Roblox friends.

To give **Edit** permission to a friend for an experience that you own:

1. With the experience open in Studio, click the **Collaborate** button in the upper-right corner.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

1. Type into the search bar at the top to search for a collaborator to add. A dropdown appears listing matching collaborators, with friends indicated by the **Friend** label below their name. Select the collaborator to add.

   <img src="../assets/studio/collaboration/Collaborator-Search.png" width="780" />

1. Select **Edit** from the permissions dropdown for the friend.

   <img src="../assets/studio/collaboration/Edit-Permission-Per-User.png" width="700" alt="A close up view of a collaborator's tile with the permission dropdown menu highlighted." />

1. Click **Save** for your collaboration settings to take effect.

### Group-Owned Experiences

For [group](../projects/groups.md) experiences, only the group **owner** can manage permissions through the group's [roles](../projects/groups.md#roles-and-permissions), either across **all group experiences** or on a **per‑experience** basis. Group owners can also add individual collaborators to group-owned experiences in the same workflow as [user-owned](#user-owned-experiences) experiences, but only for **Play** access.

<Tabs>
<TabItem label="All Group Experiences">
If you're the group's owner, you can set permissions across **all** group experiences, for example to grant **Edit** permission to an "Audio&nbsp;Artist" group role so they can fine-tune audio playback across all of your experiences.

1. Navigate to the [Groups](https://www.roblox.com/groups) page and select the group.
1. Click the **&ctdot;** button in the upper-right corner and select **Configure&nbsp;Group**.

   <img src="../assets/publishing/groups/Configure-Group.png" alt="A close up view of an experience tile with both the ellipis button and Configure Group menu item highlighted." width="800" />

1. In the left column of the group configuration page, select the **Roles** tab.
1. Select each group role that you want to give editing permission to and enable **Create and edit group experiences**.

   <img src="../assets/publishing/groups/Create-Edit-Group-Experiences.png" alt="A close up view of an group role settings. The Create and edit group experiences setting are highlighted." width="800" />

   In Studio's **Manage Collaborators** window for any group-owned experience, these roles display **Edit** permission but are muted to indicate that you can't change the permission level from Studio.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

   <img src="../assets/studio/collaboration/Edit-Permission-All-Group-Experiences.png" width="780" />

</TabItem>
<TabItem label="Per-Experience">
If you're the group's owner, you can grant **Edit** permission on a per-experience basis to roles that do **not** have permission to edit all group experiences. For example, you can temporarily grant **Edit** permission to an "FX&nbsp;Artist" group role so they can fine-tune visual effects before an experience's public release.

1. With the experience open in Studio, click the **Collaborate** button in the upper-right corner.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

1. Select **Edit** from the permissions dropdown for the desired roles. Remember that you can only modify roles that do **not** already have edit permission across all group experiences.

   <img src="../assets/studio/collaboration/Edit-Permission-Per-Experience.png" width="780" />

1. Click **Save** for your collaboration settings to take effect. All group members within the modified roles should now have **Edit** permission for this experience only; this action won't grant them equal permission to other group experiences.

</TabItem>
</Tabs>

## Accessing a Session

Those who have permission to edit an experience can join a collaborative session as follows:

1. Close all currently open places in Studio, or restart Studio.
1. Select the **Group Games** tab if it's a [group-owned](../projects/groups.md) experience, or the **Shared&nbsp;With&nbsp;Me** tab for a user-owned experience.

   <img src="../assets/studio/collaboration/Access-Session-Options.png" width="780" alt="A close up view of Studio's landing page with the Shared With Me tab highlighted." />

1. Click the desired tile to begin editing.

### Viewing Collaborators

While working in a collaborative session, you can see the current collaborators in the upper-right corner of Studio, each with a unique assigned color that's consistent across all collaborators' devices.

<img src="../assets/studio/general/Toolbar-Current-Collaborators.png" width="754" />

To view more details on the current collaborators, click on any of the icons to open the **Live&nbsp;Collaborators** window. In this window, you can see:

- **Collaborator Status** — Whether a collaborator is active or inactive inside Studio. Users become inactive if they do not use Studio for more than 5 minutes.
- **Collaborator Location** — Short description of where the user is working, such as in the 3D workspace or inside a specific script file.

<img src="../assets/studio/collaboration/Live-Collaborators-Status.png" width="280" />

### Selection Visualization

By default, selected code in the [Script Editor](../studio/script-editor.md) and selected objects in the 3D viewport are highlighted with the unique color assigned to each collaborator. Additionally, the [Explorer](../studio/explorer.md) window marks selected objects with dots in these assigned colors to indicate selection by other collaborators.

<Grid container spacing={2}>
<Grid item>
<img src="../assets/studio/collaboration/User-Color-Parts.jpg" width="420" alt="A viewport view of a block part pyramid. The parts near the top of the pyramid are highlighted in green to signify that the collaborator with the green color has the parts selected in their Studio instance." />
</Grid>
<Grid item>
<img src="../assets/studio/collaboration/User-Color-Explorer.png" width="320" alt="A close up view of the three block part objects in the Explorer window. There is a green circle near the objects to signify that the collaborator with the green color has the parts selected in their Studio instance." />
</Grid>
</Grid>

To make all collaborators' selections invisible to only you while still seeing their work, uncheck **Show collaborator selections** at the bottom of the [Live&nbsp;Collaborators](#viewing-collaborators) window.

<img src="../assets/studio/collaboration/Live-Collaborators-Toggle-Selections.png" width="280" />

### Joining Collaborators

To quickly jump to a location in the workspace or to the exact line in a script that a collaborator is editing, hover over their name in the [Live&nbsp;Collaborators](#viewing-collaborators) window and click **Join**.

<img src="../assets/studio/collaboration/Live-Collaborators-Join.png" width="280" />

### Chatting with Collaborators

To chat with collaborators during a session:

1. In the [View](../studio/view-tab.md) tab, click **Team Chat**.

   <img src="../assets/studio/general/View-Tab-Team-Chat.png" width="776" alt="Studio's View tab with the Team Chat button highlighted." />

1. Click in the input text field, type your message, and press <kbd>Enter</kbd> to send it.

## Collaborative Scripting

If a collaborative session, Roblox stores scripts in a central cloud-based repository that all collaborators can access. This allows them to:

- Work on the same script that others are editing using drafts.
- Test changes locally before committing them to the cloud.
- Compare and commit script changes to the cloud when ready.

<Alert severity="info">
Drafts mode is **enabled** by default. If you want to **disable** it but continue to collaborate with others, open the [Game Settings](../studio/game-settings.md) window, select the **Other** tab, and turn off **Enable&nbsp;Drafts&nbsp;Mode**.

Note that all collaborators will need to exit the session for the change to take effect. Alternatively, you can [disable Team Create](#team-create) and then reenable it to restart the session.
</Alert>

### Drafting Scripts

You can edit scripts while collaborators edit them and playtest scripts locally without affecting the experience for others. After you finish drafting a script, you can [commit](#committing-scripts-to-the-cloud) it to the cloud and [Team Test](../studio/home-tab.md#team-test) the cloud version with collaborators.

When editing a script, it appears in the **Drafts** window, accessible from the [View](../studio/view-tab.md) tab. Drafts are saved to your local file system and persist between Studio sessions on the same machine.

<img src="../assets/studio/general/View-Tab-Drafts.png" alt="Studio's View tab with the Drafts button highlighted." width="776" />

<img src="../assets/studio/collaboration/Drafts-Window.png" alt="The Drafts window with two draft script instances." width="360" />

### Comparing Local and Cloud Scripts

To compare a local draft of a script with the version saved to the cloud:

1. Right-click the local draft.
1. Select **Compare with server** to open the **Diff Result** window.

   <img src="../assets/studio/collaboration/Drafts-Compare.png" alt="The Drafts window displays a pop-up window when you right-click a local draft. The Compare with server menu item is highlighted." width="360" />

1. Compare the line numbers to help determine which to keep. Code that collaborators changed or deleted appears in red. Code that you updated appears in green.

   <img src="../assets/studio/collaboration/Script-Diff-Result.png" alt="A close up view of a couple of lines that were edited by different collaborators." width="600" />

### Committing Scripts to the Cloud

To commit your local edits to the cloud:

1. Left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts.
1. Click **Commit** to commit all selected scripts to the cloud.

   <img src="../assets/studio/collaboration/Drafts-Commit.png" alt="The Drafts window with the Commit button highlighted." width="360" />

### Merging Changes

If a collaborator commits to the same script that you're editing, an icon with a green &CirclePlus; symbol appears in the **Drafts** window.

<img src="../assets/studio/collaboration/Script-Updated.png" alt="The Drafts window with the green plus icon highlighted to the left of a draft script." width="360" />

To merge their changes into your script:

1. Identify which scripts you need to merge.
1. Left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts.
1. Right-click any selected script.
1. Click **Merge from server** to open the **Merge Tools** window. This window shows you how the latest edits relate to your own. If there are conflicting changes, you can pick which code to keep, or make manual edits.

   - Select **Draft** to keep your changes or leave it unchecked to discard them.
   - Select **Server** to merge the changes into your draft or leave it unchecked to ignore them.
   - Select **Other** to manually edit the script and save the changes to your draft.

1. Once you check the desired options, toggle the **Preview Resolution** switch to preview how the script will look.

   <img src="../assets/studio/collaboration/Script-Merge-Preview.png" alt="The Merge Tools window with the Preview Resolution toggle highlighted." width="750" />

### Restoring Deleted Scripts

If a collaborator deletes a script that you're editing, an icon with a red &#8856; symbol appears in the **Drafts** window:

<img src="../assets/studio/collaboration/Script-Deleted.png" alt="The Drafts window with the red plus icon highlighted to the left of a draft script." width="360" />

To restore deleted scripts:

1. Left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts.
1. Right-click any selected script.
1. Click **Restore Script**. Scripts restore to the place's **Workspace** and you may need to manually re-parent them back to their original location.

## Saving and Publishing

During a collaborative session, Studio automatically saves the project to the cloud every five minutes. The [Output](../studio/output.md) window shows the place name and save location after the save is successful.

<img src="../assets/studio/general/Output-Window-Auto-Saved.png" alt="The Output window with an auto-save message." width="800" />

## Reverting to Previous Versions

The owners of an experience can revert changes made by other editors. See [here](../production/publishing/publishing-experiences-and-places.md#reverting-to-previous-versions) for instructions.

<Alert severity="error">
Be careful when reverting changes. If anyone is currently editing the experience in a collaborative session, their changes may still auto‑save and overwrite the revert action. To ensure that nobody else is editing the place when you revert, [disable Team Create](#team-create).
</Alert>

## Team Create

**Team Create** is the core Studio feature that enables collaboration. Workflows that involve the [Manage Collaborators](#managing-collaborators) dialog will automatically enable the feature, but you can still enable or disable it manually if necessary.

<Tabs>
<TabItem label="Enabling Team Create">

1. Click the **Collaborate** button in the toolbar.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

2. Set up who can collaborate in the session as outlined in [Managing Collaborators](#managing-collaborators). When you click **Save**, Studio will reload the place in a collaborative session.

</TabItem>
<TabItem label="Disabling Team Create">

1. If the [Live Collaborators](#viewing-collaborators) window isn't already open, click on any of the collaborator icons to open it.

   <img src="../assets/studio/general/Toolbar-Current-Collaborators.png" width="754" />

2. In the bottom-right corner of the window, click the **&ctdot;** button and select **Disable Team Create**.

   <img src="../assets/studio/collaboration/Live-Collaborators-Disable.png" width="280" />

3. When prompted, confirm ending the session to reload the place in a non‑collaborative state.

</TabItem>
</Tabs>
