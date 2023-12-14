---
title: Collaboration
description: Studio's built-in collaboration tools let creators contribute independently, or work together with a team.
---

Creating a high-quality experience demands many skills such as modeling, scripting, user interface design, and audio production. It's unlikely that one person has all of these skills, which makes collaboration between different roles an essential part of the development workflow.

With Studio's **built-in** **collaboration tools**, creators can contribute to experiences independently on their own time, or work together with their team all at the same time.

<img src="../assets/studio/collaboration/Collaborative-Session.jpg" alt="Creators working together in a collaborative session" />

## Managing Collaborators

To collaborate with others, you first need to [add collaborators](#adding-collaborators) to your experience. You can then [edit their permission settings](#editing-permissions) which correspond to their level of access to the experience.

### Adding Collaborators

When you're ready to collaborate on an experience, click the **Collaborate** button in the upper-right corner of Studio:

<img src="../assets/studio/collaboration/Collaborate-Button.png" width="745" />

<Alert severity="info">
In order to manage collaborators, the place must be saved to Roblox. If not saved to Roblox, a **Save to Roblox** button is shown in the dialog. Click this button, save your place to Roblox, and then click the **Collaborate** button to return to the Manage Collaborators dialog.
</Alert>

Type into the search bar at the top to search for a collaborator to add. A dropdown will appear listing any collaborators that match your entry. Select the collaborator to add them and click Save for your collaboration settings to take effect.

   <img src="../assets/studio/collaboration/Collaborator-Search.png" width="800" />

In user-owned experiences, the search bar shows both users and groups to add as a collaborator. If a user is your friend, you see a friend icon to the right of their username. In group-owned experiences, you can only add users, not groups, as collaborators.

<Alert severity="info">
 Adding collaborators to your place automatically turns on [Team Create](#team-create).
</Alert>

### Editing Permissions

Collaborators you add to an experience have permission settings that correspond to their level of access to the experience. Here's a complete list of the different permission settings a user can have and a description of the permissions they have:

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

#### User-Owned Experiences

For user-owned experiences you can grant **Play** access to any user or group, but you can only grant **Edit** access to users that are friends with you. To give **Edit** permissions to individual collaborators for an experience that you own:

1. With the experience open in Studio, click the **Collaborate** button in the upper right corner of Studio.

   <img src="../assets/studio/collaboration/Collaborate-Button.png" width="745" />

1. Select **Edit** from the permissions dropdown for the individual.

   <img src="../assets/studio/collaboration/Collaborators-User-Permission-Edit.png" width="800" />

#### Group-Owned Experiences

For group-owned experiences, only the owner of the [group](../projects/groups.md) can manage which roles have **Edit** permissions. You can add individual collaborators to group-owned experiences, however they can only have **Play** access, not **Edit** access. There are two ways a group role can have **Edit** access: changing the permissions for [all group experiences](#all-group-experiences), and changing the role for a [specific group experience](#specific-group-experiences).

##### All Group Experiences

To manage which roles in a group have editing permissions for **all** group experiences:

1. Navigate to the [Groups](https://www.roblox.com/groups) page and select the group.
1. Click the **&hellip;** button in the upper-right corner and select **Configure&nbsp;Group**.

   <img src="../assets/publishing/groups/Configure-Group.png" width="800" />

1. In the left column, select the **Roles** tab.
1. For each group role that you want to give editing permissions to, enable **Create and edit group experiences**.

   <img src="../assets/publishing/groups/Create-Edit-Group-Experiences.png" width="800" />

In the **Manage Collaborators** dialog, these roles display **Edit** access but are grayed out to indicate that you can't change the access level from Studio.

   <img src="../assets/studio/collaboration/Collaborators-Group-Permission-Edit.png" width="800" />

##### Specific Group Experiences

Group owners can grant **Edit** access to specific experiences to roles without the **Create and edit group experiences** permission enabled. With a group-owned experience open, click on the **Collaborate** button. Then select the role, which is **No Access** by default, and set the access level to **Edit**. All users within this role should now have **Edit** access for this experience only; this won't grant them access to other group experiences.

   <img src="../assets/studio/collaboration/Collaborate-Edit-Access-This-Game-Only.png" width="70%" />

Users outside of a group can't have **Edit** access to the group's experiences, but you can grant them **Play** access.

   <img src="../assets/studio/collaboration/Collaborators-Out-Of-Group-Play-Access.png" width="70%" />

## Accessing a Session

Those who have permission to edit an experience can join a [Team Create](#team-create) session as follows:

1. Close all currently open places in Studio, or restart Studio.
1. Select the **Shared With Me** tab for user-owned experiences, or the **Group&nbsp;Games** tab if it's a [group-owned](../projects/groups.md) experience.

   <img src="../assets/studio/collaboration/Access-Session-Options.png" width="70%" />

1. Click the desired tile to begin editing.

## Collaborative Building

All collaborators can manipulate objects, and the changes automatically appear for other collaborators.

### User Color

Each collaborator in a session has a color behind their avatar in the **Team Create** window.

<img src="../assets/studio/collaboration/Collaborators-List.png" width="50%" />

When a collaborator selects an object, a selection box in their color appears around the object in the 3D view. The [Explorer](../studio/explorer.md) window also indicates when a collaborator selects an object.

<GridContainer numColumns="2">
  <img src="../assets/studio/collaboration/User-Color-Parts.jpg" />
  <img src="../assets/studio/collaboration/User-Color-Explorer.png" />
</GridContainer>

### Undo and Redo

If multiple creators have made edits to a part or instance, pressing **Undo** for that object reverts it to the state before you made a change **and** revert all changes that other editors might have made following your latest edit.

## Scripting Using Drafts Mode

If [Team Create](#team-create) is on, Roblox stores scripts in a central cloud-based repository that all collaborators can access. This allows creators to:

- Work on the same script that others are editing using Drafts.
- Test changes locally before committing them to the cloud.
- Compare and commit script changes to the cloud when ready.

<Alert severity="warning">
Drafts Mode is **disabled** by default. To enable it, select **Game Settings** > **Options** and turn on **Enable Drafts Mode**. Note that all collaborators need to exit the place—it must be completely empty—and then reenter it for this setting to take effect.

You can also [disable Team Create](#disabling-team-create) and then reenable it to restart the session.
</Alert>

### Drafting Scripts

You can edit scripts while collaborators edit them and playtest scripts locally without affecting the experience for others. After you finish drafting a script, you can [commit](#committing-scripts-to-the-cloud) it to the cloud and [Team Test](../studio/home-tab.md#team-test) the cloud version with collaborators.

When editing a script, it appears in the **Drafts** window, accessible from the **View** tab. Drafts are saved to your local file system and persist between Studio sessions on the same machine.

<img src="../assets/studio/collaboration/View-Tab-Drafts.png" width="80%" />

<img src="../assets/studio/collaboration/Drafts-Window.png" width="50%" />

### Comparing Local and Cloud Scripts

To compare a local draft of a script with the version saved to the cloud:

1. Right-click the local draft.
1. Select **Compare with server** to open the **Diff Result** window.

   <img src="../assets/studio/collaboration/Drafts-Compare.png" width="50%" />

1. Compare the line numbers to help determine which to keep. Code that collaborators changed or deleted appears in red. Code that you updated appears in green.

   <img src="../assets/studio/collaboration/Script-Diff-Result.png" width="70%" />

### Committing Scripts to the Cloud

To commit your local edits to the cloud:

1. Left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts.
1. Click **Commit** to commit all selected scripts to the cloud.

   <img src="../assets/studio/collaboration/Drafts-Commit.png" width="50%" />

### Merging Changes

If a collaborator commits to the same script that you're editing, an icon with a green &CirclePlus; symbol appears in the **Drafts** window.

<img src="../assets/studio/collaboration/Script-Updated.png" width="50%" />

To merge their changes into your script:

1. Identify which scripts you need to merge.
1. Left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts.
1. Right-click any selected script.
1. Click **Merge from server** to open the **Merge Tools** window. This window shows you how the latest edits relate to your own. If there are conflicting changes, you can pick which code to keep, or make manual edits.

   - Select **Draft** to keep your changes or leave it unchecked to discard them.
   - Select **Server** to merge the changes into your draft or leave it unchecked to ignore them.
   - Select **Other** to manually edit the script and save the changes to your draft.

1. Once you check the desired options, toggle the **Preview Resolution** switch to preview how the script will look.

   <img src="../assets/studio/collaboration/Script-Merge-Preview.png" width="70%" />

### Restoring Deleted Scripts

If a collaborator deletes a script that you're editing, an icon with a red &#8856; symbol appears in the **Drafts** window:

<img src="../assets/studio/collaboration/Script-Deleted.png" width="50%" />

To restore deleted scripts:

1. Left-click a script, or hold <kbd>Shift</kbd> and left-click to select multiple scripts.
1. Right-click any selected script.
1. Click **Restore Script**. Scripts restore to the place's **Workspace** and you may need to manually re-parent them back to their original location.

## Chatting with Collaborators

To chat with collaborators:

1. In the **View** tab, click **Chat**.

   <img src="../assets/studio/collaboration/View-Tab-Chat.png" width="80%" />

1. Click on the text box and type your message.
1. Press <kbd>Enter</kbd> to send the message.

## Saving and Publishing

If [Team Create](#team-create) is on, Studio automatically saves the project to the cloud every five minutes. The [Output](../studio/output.md) window shows the place name and save location after the save is successful. Additionally, the status bar at the bottom of the Studio window shows when a save is in progress and when it's done.

<img src="../assets/studio/collaboration/Save-Messages.png" width="80%" />

<Alert severity="info">
Changes made between auto-saves aren't published, so updating a live game still requires explicit publishing via <b>Publish&nbsp;to&nbsp;Roblox</b>.
</Alert>

## Reverting to Previous Versions

The owners of an experience can revert changes made by other editors. See [here](../production/publishing/publishing-experiences-and-places.md#reverting-to-previous-versions) for instructions.

<Alert severity="error">
Be careful when reverting changes. If anyone is currently editing the experience with [Team Create](#team-create), their session could still auto-save and overwrite the revert action. To ensure that nobody else is editing the place when you revert the changes, [disable Team Create](#disabling-team-create).
</Alert>

## Team Create

**Team Create** is the Studio feature that enables collaboration for your place. Teams of all sizes, including solo creators, can benefit from features such as script version control and place autosaving by enabling collaboration. Workflows that involve the [Manage Collaborators](#managing-collaborators) dialog will automatically enable Team Create for you when necessary so the collaborative experience is seamless. However, you can still manually enable or disable Team Create if necessary.

### Enabling Team Create

Owners of an experience can enable Team Create. There are two ways to enable Team Create manually:

- Toggle Team Create on when you save or publish to Roblox for the first time.

  <img src="../assets/studio/collaboration/Toggle-Team-Create-Save-Or-Publish.png" width="70%" />

- Open the Team Create widget in the View tab and click the **Turn On** button.

  <img src="../assets/studio/collaboration/Team-Create-Widget-Open.png" width="70%" />

<Alert severity="info">
If you haven't saved or published the place to Roblox, the <b>Turn On</b> button appears as <b>Save to Roblox</b>. When you click the button, the <b>Save Game</b> dialog opens, and you can enable Team Create as shown in the first method.
</Alert>

### Disabling Team Create

Owners of an experience can disable Team Create. When disabled, Studio forces all other collaborators to exit the session.

To disable Team Create:

1. At the bottom of the **Team Create** window, click the **&hellip;** button.

   <img src="../assets/studio/collaboration/Disable-Button.png" width="50%" />

1. Select **Disable Team Create**.
1. When prompted, click **Yes** to end the session.
