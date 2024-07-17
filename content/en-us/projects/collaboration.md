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

### Group-Owned Experiences

For [group](../projects/groups.md) experiences, only the group owner or members with sufficient permissions can manage the group's roles, either across **all group experiences** or on a **per‑experience** basis. Such users can also add individual collaborators to group‑owned experiences in the same workflow as [user‑owned](#user-owned-experiences) experiences, but only for **Play** access.

<Tabs>
<TabItem label="All Group Experiences">
If you're the group owner or a member with sufficient permissions, you can configure collaboration across **all** group experiences, for example grant **Edit** permission to an "Audio&nbsp;Artist" group role so they can fine-tune audio playback across multiple group experiences.

1. From the [Creator Dashboard](https://create.roblox.com/dashboard/creations), select the group from the **View&nbsp;As** dropdown menu and navigate to **Collaboration**&nbsp;&rang; **Roles**.

   <img src="../assets/creator-dashboard/Nav-Collaboration-Roles.png" width="280" alt="Roles option indicated in the Collaboration section on the Creator Dashboard." />

1. Enable [Edit all group experiences](../projects/groups.md#roles-and-permissions) for roles that should have editing permission. Remember to click **Save&nbsp;Changes** for each role that you change.

In Studio's **Manage Collaborators** window for any group-owned experience, eligible roles display **Edit** permission but are muted to indicate that you can't change the permission level from Studio.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

   <img src="../assets/studio/collaboration/Edit-Permission-All-Group-Experiences.png" width="780" alt="Manage Collaborators window showing permission level selection for each group role." />

</TabItem>
<TabItem label="Per-Experience">
If you're the group's owner, you can grant **Edit** permission on a per-experience basis to roles that do **not** have permission to edit all group experiences. For example, you can temporarily grant **Edit** permission to an "FX&nbsp;Artist" group role so they can fine-tune visual effects before an experience's public release.

1. With the experience open in Studio, click the **Collaborate** button in the upper-right corner.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

1. Select **Edit** from the permissions dropdown for the desired roles. Remember that you can only modify roles that do **not** already have edit permission across all group experiences.

   <img src="../assets/studio/collaboration/Edit-Permission-Per-Experience.png" width="780" alt="Manage Collaborators window showing permission level selection for each group role." />

1. Click **Save** for your collaboration settings to take effect. All group members within the modified roles should now have **Edit** permission for this experience only; this action won't grant them equal permission to other group experiences.

</TabItem>
</Tabs>

### User-Owned Experiences

For user-owned experiences, you can grant **Play** access to any user or [group](../projects/groups.md), but you can only grant **Edit** permission to Roblox friends.

To give **Edit** permission to a friend for an experience that you own:

1. With the experience open in Studio, click the **Collaborate** button in the upper-right corner.

   <img src="../assets/studio/general/Toolbar-Collaborate-Button-From-Off.png" width="754" alt="Studio's menu bar with the Collaborate button highlighted." />

1. Type into the search bar at the top to search for a collaborator to add. A dropdown appears listing matching collaborators, with friends indicated by the **Friend** label below their name. Select the collaborator to add.

   <img src="../assets/studio/collaboration/Collaborator-Search.png" width="780" alt="Manage Collaborators window showing search query for a Roblox friend." />

1. Select **Edit** from the permissions dropdown for the friend.

   <img src="../assets/studio/collaboration/Edit-Permission-Per-User.png" width="700" alt="A close up view of a collaborator's tile with the permission dropdown menu highlighted." />

1. Click **Save** for your collaboration settings to take effect.

## Accessing a Session

Those who have permission to edit an experience can join a collaborative session as follows:

1. Navigate to the [Creator Dashboard](https://create.roblox.com/dashboard/creations).
1. Locate the experience depending on whether it's [group-owned](#group-owned-experiences) or [user-owned](#user-owned-experiences).

   <Tabs>
   <TabItem label="Group-Owned Experience">
   Select the group from the upper‑left selector menu. Then, make sure **Creations** is selected on the left and **My&nbsp;Experiences** in the main panel.

   <img src="../assets/studio/collaboration/Access-Session-Group.png" width="710" alt="A close up view of the Creator Dashboard with the group selected, as well as Creations and My Experiences." />

   </TabItem>
   <TabItem label="User-Owned Experience">
   Select your personal account from the upper‑left selector menu. Then, make sure **Creations** is selected on the left and **Shared&nbsp;With&nbsp;Me** in the main panel.

   <img src="../assets/studio/collaboration/Access-Session-User.png" width="710" alt="A close up view of the Creator Dashboard with the group selected, as well as Creations and My Experiences." />

   </TabItem>
   </Tabs>

1. Hover over the experience to collaborate on and click the **Edit&nbsp;in&nbsp;Studio** button.

   <img src="../assets/creator-dashboard/Experience-Context-Menu-Edit.png" width="184" alt="A close up view of an experience icon with the Edit in Studio button highlighted." />

### Viewing Collaborators

While working in a collaborative session, you can see the current collaborators in the upper-right corner of Studio, each with a unique assigned color that's consistent across all collaborators' devices.

<img src="../assets/studio/general/Toolbar-Current-Collaborators.png" width="754" alt="Studio's menu bar with icons of the current collaborators highlighted." />

To view more details on the current collaborators, click on any of the icons to open the **Live&nbsp;Collaborators** window. In this window, you can see whether a user is active or inactive inside Studio, as well as an indication of where the user is working. Users become inactive if they do not use Studio for more than 5 minutes.

<img src="../assets/studio/collaboration/Live-Collaborators-Status.png" width="280" alt="Live Collaborators window with icons of current collaborators, as well as their activity status." />

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

In a collaborative session, you can code together in real-time through [live scripting](#live-scripting), or you can [draft](#drafts-mode) scripts in a more focused environment before committing them to a collaborator‑shared repository.

### Live Scripting

**Live Scripting** lets collaborators code together in real time. In the [Script Editor](../studio/script-editor.md), each collaborator's cursor color matches their assigned color in the [Live Collaborators](#viewing-collaborators) window.

<Grid container spacing={2}>
<Grid item>
<img src="../assets/studio/collaboration/Live-Scripting-Cursors.png" width="520" alt="Script Editor window showing cursors for two collaborators, colored according to their assigned color in the Live Collaborators window." />
</Grid>
<Grid item>
<img src="../assets/studio/collaboration/Live-Collaborators-Status.png" width="280" alt="Live Collaborators window with icons of current collaborators, as well as their activity status." />
</Grid>
</Grid>

While live scripting, edits are auto‑saved every 5 minutes just like place edits, and a collaborator can manually save a script at any time with <kbd>Ctrl</kbd><kbd>S</kbd> (<kbd>⌘</kbd><kbd>S</kbd>). Saved or auto‑saved versions are logged in the [Script History](#viewing-script-history) window.

<Alert severity="info">
Live Scripting is **enabled** by default. If you and your team prefer to collaborate on scripts in an environment similar to source control, explore [Drafts](#drafts-mode) mode.
</Alert>

### Drafts Mode

Through **Drafts** mode, you can independently edit and test scripts without affecting the experience for others. After you finish drafting a script, you can [commit](#committing-drafts) it to the shared repository and [Team Test](../studio/home-tab.md#team-test) the committed version with collaborators.

<Alert severity="warning">
Drafts Mode is **disabled** by default. To enable it, open the [Game Settings](../studio/game-settings.md) window, select the **Other** tab, and turn on **Enable&nbsp;Drafts&nbsp;Mode**.

Note that all collaborators will need to exit the session for the change to take effect. Alternatively, you can [disable collaboration](#disabling-collaboration) and then reenable it to restart the session.
</Alert>

#### Committing Drafts

Once you've edited a script, it appears in the **Drafts** window, accessible from the [View](../studio/view-tab.md) tab. Drafts are saved to your local file system and persist between Studio sessions on the same machine.

<img src="../assets/studio/general/View-Tab-Drafts.png" alt="Studio's View tab with the Drafts button highlighted." width="776" />

<img src="../assets/studio/collaboration/Drafts-Window.png" alt="The Drafts window with two drafted script instances." width="360" />

To commit your local edits to the repository, left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts. Then click **Commit** to commit all selected scripts.

<img src="../assets/studio/collaboration/Drafts-Commit.png" alt="The Drafts window with the Commit button highlighted." width="360" />

#### Comparing and Merging Changes

If another collaborator commits changes to the same script that you're editing, an icon with a green **&CirclePlus;** symbol appears in the **Drafts** window. To view their changes, right‑click the script and select **Compare&nbsp;With&nbsp;Server**.

<img src="../assets/studio/collaboration/Drafts-Compare.png" alt="The Drafts window with the green plus icon highlighted to the left of a changed script, and the right-click popup window showing with the Compare With Server option highlighted." width="360" />

In the **(Diff)** tab that opens in the [Script Editor](../studio/script-editor.md), code that other collaborators changed or deleted appears in red, while code that you updated appears in green.

<img src="../assets/studio/collaboration/Drafts-Diff-Result.png" alt="A close up view of lines that were edited by different collaborators." width="800" />

To merge their changes into your script:

1. In the **Drafts** window, right‑click the script and select **Merge&nbsp;From&nbsp;Server**.

   <img src="../assets/studio/collaboration/Drafts-Merge.png" alt="The Drafts window right-click popup window showing with the Merge From Server option highlighted." width="360" />

1. In the merge window, you can pick which code to keep, or make manual edits.

   - Check **Draft** to keep your changes, or leave it unchecked to discard them.
   - Check **Server** to merge the committed changes into your draft, or leave it unchecked to ignore them.
   - Check **Other** to manually edit the script and save the changes to your draft.

1. Once you've previewed the merge resolution, click **Merge&nbsp;All** to update your local script.

#### Restoring Deleted Scripts

If a collaborator deletes a script that you're editing, an icon with a red **&#8856;** symbol appears in the **Drafts** window. To restore the script, right‑click it and select **Restore&nbsp;Script**. Scripts are restored to the place's **Workspace** tree, so you may need to manually re‑parent them back to their original location.

<img src="../assets/studio/collaboration/Drafts-Restore.png" alt="The Drafts window with the red cross icon highlighted to the left of a deleted script, and the right-click popup window showing with the Restore Script option highlighted." width="360" />

### Viewing Script History

All script changes, whether saved by a collaborator, auto-saved, or committed by a collaborator through [Drafts](#drafts-mode) mode, are logged in the **Version&nbsp;History** window. To access it:

1. Right-click the script in the [Explorer](../studio/explorer.md) window and select **View Script History**.
2. In the **Version History** window that opens, you'll see all committed versions of the script, the commit date, which collaborator committed, and more. From this window, the following actions are possible:

   <Tabs>
   <TabItem label="Compare With Previous">
   To compare any version (except the oldest) with its previous version, select it and click **Compare&nbsp;With&nbsp;Previous&nbsp;Version**. In the **(Diff)** tab that opens in the [Script Editor](../studio/script-editor.md), code from the newer version appears in green while code from the older version appears in red.
   </TabItem>
   <TabItem label="Compare Selected">
	 To compare any **two** versions, hold <kbd>Ctrl</kbd> or <kbd>⌘</kbd> and select both, then click **Compare&nbsp;Selected&nbsp;Versions**. In the **(Diff)** tab that opens in the [Script Editor](../studio/script-editor.md), code from the newer version appears in green while code from the older version appears in red.
   </TabItem>
	 <TabItem label="Open">
	 If the version **Comment** indicates just one script was committed, select it and click **Open&nbsp;Script** to open it in the [Script Editor](../studio/script-editor.md).

	 If the version **Comment** indicates more than one script was committed&nbsp;— commonly the result of an auto‑save on multiple unsaved scripts&nbsp;— you can click **Show** within the version's row to open a popup displaying the script(s) and their respective version. Then, from the version history window, click **Open&nbsp;All&nbsp;Scripts&nbsp;From&nbsp;Batch** to open them in the [Script Editor](../studio/script-editor.md).
   </TabItem>
   </Tabs>

## Saving and Publishing

During a collaborative session, Studio automatically saves the project to the cloud every five minutes. The [Output](../studio/output.md) window shows the place name and save location after the save is successful.

<img src="../assets/studio/general/Output-Window-Auto-Saved.png" alt="The Output window with an auto-save message." width="800" />

## Reverting to Previous Versions

The owner of an experience can revert changes made by other editors. See [here](../production/publishing/publishing-experiences-and-places.md#reverting-to-previous-versions) for instructions.

<Alert severity="error">
Be careful when reverting changes. If anyone is currently editing the experience in a collaborative session, their changes may still auto‑save and overwrite the revert action. To ensure that nobody else is editing the place when you revert, [disable collaboration](#disabling-collaboration).
</Alert>

## Disabling Collaboration

**Team Create** is the core Studio feature that enables collaboration. Workflows that involve the [Manage Collaborators](#managing-collaborators) dialog will automatically enable the feature, but you can manually disable it if necessary.

1. If the [Live Collaborators](#viewing-collaborators) window isn't already open, click on any of the collaborator icons to open it.

   <img src="../assets/studio/general/Toolbar-Current-Collaborators.png" width="754" />

2. In the bottom-right corner of the window, click the **&ctdot;** button and select **Disable Team Create**.

   <img src="../assets/studio/collaboration/Live-Collaborators-Disable.png" width="280" />

3. When prompted, confirm ending the session to reload the place in a non‑collaborative state.
