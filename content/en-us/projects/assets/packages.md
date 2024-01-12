---
title: Packages
description: Packages allow you to reuse single assets or asset hierarchies across experiences.
id: packages
---

To optimize asset management across your entire team or across multiple projects, you can convert single assets or asset hierarchies into **packages** and reuse them in multiple experiences. When a package is updated, you or your team members can [update specific copies](#updating-outdated-copies) to the most current version, [update all copies](#mass-updates) across an experience, or set specific copies to [auto update](#automatic-updates). Packages also include a [configuration](#adding-or-updating-configurations) mechanism that lets package creators and editors include options to customize a package's behavior.

## Creating Packages

You can create a package from any single object or any single parent and children branch of objects. When you create a package for a single object, it's recommended to add that object to a `Class.Model` grouping first so that you can add, remove, or scale objects within the package later without breaking the package.

1. In the **Explorer** window, right-click the desired object or parent of object, then select **Convert to Package** from the contextual menu.

   <img src="../../assets/studio/packages/Contextual-Menu-Convert.png" width="300" />

1. In the contextual window, fill in the requested details. In particular, if you're working in a [group](../../projects/groups.md), set **Ownership** to the desired group in which you have permission to create/edit group experiences.

   <Alert severity="warning">
   Ownership transfers are **not** supported by the asset system, so carefully consider the owner when creating a package.
   </Alert>

1. Click the **Submit** button.
1. Once complete, a "chain link" symbol over the object's icon identifies it as a package. Additionally, you'll see a new **PackageLink** object parented to the object.

   <Grid container spacing={5}>
     <Grid item>
       <center><img src="../../assets/studio/packages/Model-Icon-Standard.png" width="72" /></center>
       <figcaption><center>Standard `Class.Model`</center></figcaption>
     </Grid>
     <Grid item>
       <center><img src="../../assets/studio/packages/Model-Icon-Package.png" width="72" /></center>
       <figcaption><center>Packaged `Class.Model`</center></figcaption>
     </Grid>
     <Grid item>
       <img src="../../assets/studio/packages/PackageLink-Explorer.png" width="320" />
       <figcaption><b>PackageLink</b> child on package</figcaption>
      </Grid>
   </Grid>
   <br />

   <Alert severity="error">
   The **PackageLink** object should not be deleted or reparented. Doing so for any package copy breaks the association with the published version and converts the copy back into a normal object.
   </Alert>

## Inserting Packages

To insert a package which doesn't already exist in the current place, you must **initially** insert it from the **Inventory**&nbsp;&rarr; **My&nbsp;Packages** sort.

<img src="../../assets/studio/toolbox/Inventory-My-Packages.png" width="360" />

Once you've inserted a package into a place's data model, it appears in the **Packages** folder of the [Asset Manager](../../projects/assets/manager.md) and remains there even if you later delete all copies of it. However, when you publish the place, the folder will update to reflect only packages used within the place.

<figure>
  <img src="../../assets/studio/asset-manager/Packages-Example.png" width="360" />
  <figcaption>Packages in Asset Manager</figcaption>
</figure>

<Alert severity="warning">
Take caution when inserting packages that you didn't create into your experiences, as they may contain malicious scripts that can impact your experience's performance. Malicious packages can be difficult to troubleshoot without reverting to an older version of your experience, so it's recommended to always save your experience and investigate any scripts within unfamiliar packages before bringing them into your place file.
</Alert>

## Modifying Packages

You can edit packages and their children just like other objects. On the **first** edit that modifies a package instance, an alert dialog appears, providing advanced notice that a modified package cannot be [updated](#updating-outdated-copies) through any means and must be [reverted](#reverting-package-changes) to undo a series of edits.

<img src="../../assets/studio/packages/Modify-Notification.png" width="470" />

Most edits will flag the package as modified, although the following changes are **not** considered package modifications:

<table>
  <thead>
    <tr>
      <th>Edit</th>
	  <th>Modifies&nbsp;Package</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Changing the **name** of the root node.</td>
	  <td>no</td>
    </tr>
    <tr>
      <td>Changing the **position** or **rotation** of the root node of a package that is a `Class.BasePart`, `Class.Model`, or `Class.GuiObject`.</td>
	  <td>no</td>
    </tr>
    <tr>
      <td>Changing the **Enabled** property of a root node `Class.GuiObject` such as a `Class.ScreenGui`, `Class.SurfaceGui`, or `Class.BillboardGui`.</td>
	  <td>no</td>
    </tr>
	<tr>
      <td>Changing a part reference of a `Class.Weld` inside the package that references an instance outside of the package.</td>
	  <td>no</td>
    </tr>
  </tbody>
</table>

Once modified, packages with unpublished changes are marked with a **yellow dot** in the [Explorer](../../studio/explorer.md) hierarchy.

<img src="../../assets/studio/packages/Package-Modified.png" width="320" />

### Adding or Updating Configurations

You can include [instance attributes](../../studio/properties.md#instance-attributes) at the root of a package to customize its behavior, for example the max speed of a packaged vehicle or the debounce time for a packaged button.

When you publish a package, the current set of attributes/values will become the package's **default configurations**. On any given copy of a package, configurations are shown in **bold&nbsp;italics** and those attribute values can be changed on a per-instance basis. When package copies are [updated](#updating-outdated-copies), modified configuration values will be preserved, while other attributes will be updated to the latest default value.

<img src="../../assets/studio/packages/Package-Configured-Attributes.png" width="506" alt="Configurable attributes on a package shown in bold italics" />

<Alert severity="info">
Currently the only way to handle configuration values is to add scripts in the package which read and apply behavior based on the configuration at runtime.
</Alert>

<Alert severity="info">
If you simply want to update the default **values** for configurations, you can change those attribute values and republish the package (the package will **not** be flagged as modified in this case). If you want to publish other modifications but not change the default configuration values, you should publish on a package without any value changes, or revert the configurations to their defaults before you publish.
</Alert>

### Nested Packages

You can nest packages inside of other packages to maintain and collaborate on complex hierarchies, such as a series of vehicle mechanics which can be modified independently of the vehicle's parent package.

<img src="../../assets/studio/packages/Nested-Packages.png" width="520" />

<Alert severity="warning">
If you modify a nested package, both the nested package **and** the parent package are considered as modified. You must [publish changes](#publishing-package-changes) to any **nested** package before you're allowed to publish changes to its **parent** package, since publishing the parent would mark it as current/unmodified and conflict with the nested package's modifications.
</Alert>

### Package Scripts

Each script within an **unmodified** package is read-only and shows a notification on the top with a hyperlink to unlock the script.

<img src="../../assets/studio/packages/Script-Unlock-Link.png" width="800" />

Clicking the hyperlink:

- Flags the package as modified regardless of whether you edit the script.
- Removes the notification/hyperlink from **other** scripts within the package.

Once the package is published and moved to an **unmodified** state, the scripts under it become read-only with a hyperlink to modify.

## Publishing Package Changes

You can publish a [modified](#modifying-packages) package (marked with a yellow dot) to make those modifications available to other copies of the package throughout the place and across all experiences. Note that it's **not** required to publish a modified package before publishing a place (the modified version will be saved along with the place for future iteration).

To publish changes to a package:

1. In the [Explorer](../../studio/explorer.md) window, right-click the modified copy (marked with a yellow dot) and select **Publish to Package**.

   <img src="../../assets/studio/packages/Contextual-Menu-Publish.png" width="300" />

1. For package copies set to [automatically update](#automatic-updates), Studio will immediately pull in the updated version. Other copies will be marked with a **green sync icon** next to the name and you can [individually update](#updating-outdated-copies) or [mass-update](#mass-updates) them as needed.

   <img src="../../assets/studio/packages/Package-Out-Of-Sync.png" width="320" />

## Updating Outdated Copies

You can update outdated package copies to the most recent version, or you can continue to use the older version.

To update one or more package copies to the latest version:

1. In the [Explorer](../../studio/explorer.md) window, locate outdated copies by the **green sync icon** next to their name.

   <img src="../../assets/studio/packages/Package-Out-Of-Sync.png" width="320" />

1. Right-click a single outdated copy and select **Get Latest Package** from the contextual menu, or select multiple copies (at least one of them modified), right-click, and select **Get Latest For Selected Packages**.

<Alert severity="info">
The **Get Latest []** menu option is disabled if any of the package copies have been modified. If you're working on a series of unpublished changes, you'll need to [revert the changes](#reverting-package-changes) before you can fetch the latest version.
</Alert>

### Mass Updates

Extensive use of packages may result in many package copies across multiple places in an experience. In addition to [individual syncing](#updating-outdated-copies) and [automatic updates](#automatic-updates), you can update all copies of a package through **mass updating**.

1. **(Recommended)** Close other Studio instances with any of the experience's places open; this prevents another unsaved instance of a place from potentially overwriting your updates.
1. In the [Explorer](../../studio/explorer.md) window, right-click the desired package and select **Update All** from the contextual menu.

   <img src="../../assets/studio/packages/Contextual-Menu-Update-All.png" width="300" />

1. In the popup window, below the version/date details, check **All** to select all places in the experience, or select only the specific places to apply the mass update.

   <img src="../../assets/studio/packages/Mass-Update.png" width="800" />

1. Click the **Update** button.

<Alert severity="info">
Mass updating packages automatically **saves** the selected places but does not **publish** them, so you'll need to publish separately to see the changes.
</Alert>

<Alert severity="warning">
In order to prevent unintended overwrites, mass updating does not affect [modified](#modifying-packages) versions of a package, but Studio will alert you of the number of packages **not** updated through the process.
</Alert>

### Automatic Updates

To make syncing easier, you can enable a package copy to update automatically whenever a newer version is published and when it exists inside an open Studio session.

1. In the [Explorer](../../studio/explorer.md) window, expand the package's hierarchy tree and select its **PackageLink** object.

   <img src="../../assets/studio/packages/PackageLink-Explorer.png" width="320" />

1. In the [Properties](../../studio/properties.md) window, enable the **AutoUpdate** property. This property only applies to the highest level parent package in a hierarchy of [nested packages](#nested-packages), meaning automatic updates will only occur when the **parent** package is updated.

   <img src="../../assets/studio/packages/PackageLink-AutoUpdate.png" width="320" />

<Alert severity="warning">
Automatic updating does not apply to [modified](#modifying-packages) package copies. Once you modify a package instance, its **AutoUpdate** property becomes disabled and is ignored.
</Alert>

## Sharing and Access Levels

If desired, you can share packages with friends or grant access to specific user roles within your group.

1. In the [Explorer](../../studio/explorer.md), [Toolbox](../../projects/assets/toolbox.md), or [Asset Manager](../../projects/assets/manager.md), right-click the desired package and select **Package Details** from the contextual menu.
1. In the popup window, select **Permissions** in the left column to reveal sharing/access options for either group-owned or user-owned packages.

   - For a **group-owned** package, expand the roles tree by clicking the <span style={{fontWeight:"500", fontSize:"140%"}}>›</span> next to the group's icon, then choose a permission level for each role. Selection boxes that are faded/disabled indicate that the permission is already [configured](../../projects/groups.md#roles-and-permissions) for that role and it cannot be changed from this window.

      <img src="../../assets/studio/packages/Permissions-Group.png" width="700" />

     <table>
     <thead>
     	<tr>
     	<th>Permission</th>
     	<th>Description</th>
     	</tr>
     </thead>
     <tbody>
     	<tr>
     	<td>**Edit**</td>
     	<td>Members of the role will be able to use, view, and edit the current and previous package versions, including publishing changes to it. Granting edit access to a role from this window only grants access to the **specific package**.</td>
     	</tr>
     	<tr>
     	<td>**No&nbsp;Access**</td>
     	<td>Members of the role will not have access to any new versions of the package, although they will retain access to the current and previous versions.</td>
     	</tr>
     </tbody>
     </table>

   - For a **user-owned** package, search for a friend through the search field, click their avatar/username, and choose a permission level.

      <img src="../../assets/studio/collaboration/Collaborators-User-Permission-Edit.png" width="700" />

     <table>
     <thead>
     	<tr>
     	<th>Permission</th>
     	<th>Description</th>
     	</tr>
     </thead>
     <tbody>
     	<tr>
     	<td>**Use&nbsp;&&nbsp;View**</td>
     	<td>The user will be able to use and view (but not edit) the current and previous package versions. Once you provide a user with this ability, you cannot revoke access to a copy they already inserted into their experience; revoking access will prevent re-insertion or package updates, but package copies in their data model will remain intact.</td>
     	</tr>
     	<tr>
     	<td>**Edit**</td>
     	<td>The user will be able to use, view, and edit the current and previous package versions, including publishing changes to it.</td>
     	</tr>
     </tbody>
     </table>

## Reverting Package Changes

Instead of undoing an entire series of package changes one by one, you can [revert unpublished changes](#reverting-unpublished-changes) in one action, restore a package to a previous [version](#restoring-to-version), or revert changes to specific [configurations](#reverting-configurations).

### Reverting Unpublished Changes

To undo an entire series of **unpublished** changes:

1. In the [Explorer](../../studio/explorer.md) window, locate modified copies by the yellow dot next to their name.

   <img src="../../assets/studio/packages/Package-Modified.png" width="320" />

1. Right-click a single modified copy and select **Undo Changes to Package** from the contextual menu, or select multiple copies (at least one of them modified), right-click, and select **Undo Changes to Selected Packages**.

   <img src="../../assets/studio/packages/Contextual-Menu-Undo-Changes.png" width="300" />

### Restoring to Version

To restore a package to a **previously published** version:

1. In the [Explorer](../../studio/explorer.md), [Toolbox](../../projects/assets/toolbox.md), or [Asset Manager](../../projects/assets/manager.md), right-click the desired package and select **Package Details** from the contextual menu.
1. In the popup window, select **Versions** in the left column. The currently published version and previously published versions appear (**V1**, **V2**, &hellip;) along with the date/time they were published.
1. Click the checkmark next to the version you want to restore and click **Submit**.

   <img src="../../assets/studio/packages/Versions.png" width="800" />

<Alert severity="warning">
Reverting changes to a package does not reset the configuration to the default. See [Reverting Configuration](#reverting-configuration).
</Alert>

### Reverting Configurations

To revert any [configuration](#adding-or-updating-configurations) attribute to its default, select the **Reset** option from the gear menu in the **Attributes** section of the [Properties](../../studio/properties.md) window.

<img src="../../assets/studio/packages/Package-Configured-Attributes-Reset.png" width="346" />

## Comparing Package Versions

When a package has multiple versions, you can compare changes between versions using the diff viewer, which is helpful for reviewing package updates, comparing your local changes against the latest version, and checking the content of past versions before restoring.

The tool has a package hierarchy menu that indicates all added, removed, or modified instances between versions using corresponding icons, with the following tabs available:

- **Visual Overview** shows the visual differences of the 3D rendering under different camera positions. It's the default view for packages with a 3D object (models, parts) as the root object, and it's currently only available for the root object.

   <img src="../../assets/studio/packages/visual-diff.png" width="100%" />

- **Properties** shows changes of properties and attributes. It's the default view for packages with a non-3D object (scripts, lights, 2D objects) as the root object, and it's available for all instances in a package.

   <img src="../../assets/studio/packages/properties-diff.png" width="100%" />

- **Script** shows line-by-line script differences. It's available for packages containing scripts, regardless of whether the script is the root object or not.

   <img src="../../assets/studio/packages/script-diff.png" width="100%" />

To compare package versions:

1. In the [Explorer](../../studio/explorer.md) window, right-click the target package.
1. Select **Compare Package Versions** from the context menu.
1. On the **Diff Viewer** window, by default, you can compare changes between your local copy and the latest version. You can also select any two versions to compare using the dropdown menu.

   <img src="../../assets/studio/packages/version-selector.png" width="80%" />

   <Alert severity="warning">
   Some older versions might be incompatible with the package diff tool. When detecting an incompatible version selected, the system prompts you to select another version.
   </Alert>

1. After selecting versions:

   - To compare the visual renderings of the root model, if applicable, select the **Visual Overview** tab and adjust the camera control for your desired angle. Controls are synchronized across views:

     - Pan the camera using left mouse clicks.
     - Rotate the camera using right mouse clicks.
     - Zoom in and out the camera with the mouse wheel.
     - Recenter using the keyboard shortcut `-F`.

   - To compare properties and attributes of an instance, select the instance and the **Properties** tab.

   - To compare script differences, if applicable, select any script to open the **Script** tab for line-by-line changes between your selected versions, similar to source control applications.

Alternatively, you can open the script diff tool directly in the [Explorer](../../studio/explorer.md) window.

<Alert severity="warning">
This only allows you to compare script changes between the current version and the latest published or local version, without indicating the collaborators who made the change.
</Alert>

1. Right-click the target package, which must either be a script or contain scripts.
1. Select **View Script Changes** from the context menu.
1. In the **Diff Result** tab that opens, compare all changes of the selected script between the current package copy and the latest published or local version.
