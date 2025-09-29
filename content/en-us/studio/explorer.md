---
title: Explorer window
description: The Explorer window shows a hierarchical list of every instance inside an experience.
---

The **Explorer** window, accessible from Studio's **Window** menu or **Home** tab toolbar, shows a hierarchical list of every instance inside an experience. At the highest level of the hierarchy are the services; `Class.Workspace`, for example, is where visible 3D content such as [parts](../parts/index.md) are stored.

<img src="../assets/studio/general/Toolbar-Explorer.png" width="800" alt="Explorer highlighted in Studio's toolbar." />

## Parent-child hierarchy

All children of a parent object appear under its branch when expanded. Click the arrow next to a parent branch&nbsp;— or press the <kbd>&rarr;</kbd>/<kbd>&larr;</kbd> arrow keys when a parent is selected&nbsp;— to expand/collapse only that branch.

<Grid container spacing={3}>
<Grid item>
<figure>
<img src="../assets/studio/explorer/Parent-Child-Hierarchy.png" width="320" alt="Explorer hierarchy showing Camera, Terrain, and SignModel as children of Workspace; Board and Post as children of SignModel" />
</figure>
</Grid>
<Grid item>
<figure>
<img src="../assets/studio/explorer/Branch-Expanded.png" width="320" alt="Only the topmost parent expanded with click" />
</figure>
</Grid>
</Grid>

<Alert severity="info">
To expand or collapse **all** branches within a multi‑nested hierarchy, hold <kbd>Shift</kbd> when clicking the expand/collapse arrow.
</Alert>

To change the parent of one or more children (reparent), simply drag and drop them onto the new parent.

<img src="../assets/studio/explorer/Reparent-Object.png" width="320" alt="Dragging one object over another to reparent it" />

## Object insertion

While primitive [parts](../parts/index.md) can be [inserted](../parts/index.md#insert-parts) from the **Home** or **Model** tab toolbars, you can select from a full array of objects by hovering over the intended parent and clicking the &CirclePlus; button (shortcut of <kbd>Ctrl</kbd><kbd>I</kbd> on Windows or <kbd>⌘</kbd><kbd>I</kbd> on Mac).

<img src="../assets/studio/explorer/Workspace-Add-Object.png" width="320" alt="Hovering over Workspace object to reveal insertion button" />

You can further customize insertion behavior by clicking the **&ctdot;** button to the right of the search field:

<img src="../assets/studio/explorer/Insert-Object-Options.png" width="320" alt="Additional customization options for insertion workflow" />

<table>
	<thead>
	<tr>
		<th>Option</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>**Increment names for new instances**</td>
		<td>When enabled, inserted/pasted/duplicated instances of the same type will have numbered names for differentiation.</td>
	</tr>
	<tr>
		<td>**Expand hierarchy when selecting**</td>
		<td>When enabled, inserting/pasting an instance or selecting an object in the [3D&nbsp;viewport](../studio/ui-overview.md#3d-viewport) will expand the **Explorer** hierarchy to reveal that instance. When disabled, the top‑level parent within the hierarchy will be highlighted, but it won't expand to reveal the selected instance.</td>
	</tr>
	</tbody>
</table>

<Alert severity="success">
To keep the hierarchy cleaner, services such as `Class.VoiceChatService` are hidden by default. You can show hidden services by right‑clicking in the window and selecting **Show&nbsp;Services&hellip;** from the context menu. Similarly, you can hide a visible service by right‑clicking it and selecting **Hide&nbsp;Service&nbsp;in&nbsp;Explorer**.
</Alert>

## Duplicate and paste

Objects can be quickly duplicated into the same branch, while items copied to the clipboard can be pasted into the top‑level `Class.Workspace` or directly into one or more existing parents.

<table>
<thead>
	<tr>
		<th>Action</th>
		<th>Windows</th>
		<th>Mac</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>**Duplicate**</td>
		<td><kbd>Ctrl</kbd><kbd>D</kbd></td>
		<td><kbd>⌘</kbd><kbd>D</kbd></td>
		<td>Duplicates the selected objects into the same branch.</td>
	</tr>
	<tr>
		<td>**Paste**</td>
		<td><kbd>Ctrl</kbd><kbd>V</kbd></td>
		<td><kbd>⌘</kbd><kbd>V</kbd></td>
		<td>Pastes the clipboard contents into the top‑level `Class.Workspace` branch.</td>
	</tr>
	<tr>
		<td>**Paste&nbsp;Into**</td>
		<td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>V</kbd></td>
		<td><kbd>⌘</kbd><kbd>Shift</kbd><kbd>V</kbd></td>
		<td>Pastes the clipboard contents into the selected object(s). Using this action on multiple selected objects is a convenient way to paste the same clipboard items into multiple parents, such as a common `Class.Texture` into several different `Class.Part|Parts`.</td>
	</tr>
</tbody>
</table>

<Alert severity="info">
When pasting 3D objects copied to the clipboard, you can maintain their original `Datatype.CFrame` position by right‑clicking the target parent instance in the hierarchy and selecting **Paste&nbsp;Options**&nbsp;&rang; **Paste&nbsp;Into&nbsp;At&nbsp;Original&nbsp;Location**.
</Alert>

## Contextual options

Right-clicking on an instance opens the options menu, contextually adjusted for the object type. For example, right‑clicking a `Class.Model` reveals standard options like **Copy** and **Duplicate**, and also options specific to `Class.Model|Models` like **Ungroup**. In contrast, right‑clicking a service like `Class.Lighting` reveals a more concise menu of actions valid for services.

<Grid container spacing={3}>
<Grid item>
<figure>
<img src="../assets/studio/explorer/Context-Menu-Model.png" width="320" />
</figure>
</Grid>
<Grid item>
<figure>
<img src="../assets/studio/explorer/Context-Menu-Service.png" width="320" />
</figure>
</Grid>
</Grid>

## Folder organization

Like directories/folders on a computer, the `Class.Folder` object is a useful way to organize objects. For instance, if you want to store all environmental audio assets in a logical place, you can create a folder and place multiple `Class.AudioPlayer` objects within it.

<img src="../assets/studio/explorer/Folder-Children.png" width="320" alt="Multiple Sound objects grouped inside a Folder object" />

You can organize objects into folders as follows:

- Create a `Class.Folder` instance through a standard [insertion](#object-insertion) method, then drag and drop existing objects into it.

- Select multiple objects, right-click them, and then select **Group&nbsp;As&nbsp;a&nbsp;Folder** from the context menu (shortcut of <kbd>Alt</kbd><kbd>Ctrl</kbd><kbd>G</kbd> on Windows or <kbd>⌥</kbd><kbd>⌘</kbd><kbd>G</kbd> on Mac).

## Search methods

Through the **search** input near the top of the window, you can find instances by [name](#name-search), [property](#property-search), class/subclass/tag [bespoke](#bespoke-search) queries, and [ancestry](#ancestry-search) queries. You can also [combine parameters](#combined) for advanced logical searches. Quickly access this input by pressing <kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>X</kbd> (Windows) or <kbd>⌘</kbd><kbd>Shift</kbd><kbd>X</kbd> (Mac).

<img src="../assets/studio/explorer/Search-Diagram.png" width="360" alt="Example search query and search options" />

<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-A.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Navigate up and down through search results
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-B.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Select all search results (<kbd>Ctrl</kbd><kbd>A</kbd> on Windows or <kbd>⌘</kbd><kbd>A</kbd> on Mac)
	</Grid>
</Grid>
<Grid container spacing={2}>
	<Grid item XSmall={2} Medium={1} Large={1} XLarge={1}><img src="../assets/misc/Box-Label-C.png" width="40" style={{float:"right"}} /></Grid>
	<Grid item XSmall={10} Medium={11} Large={11} XLarge={11} style={{marginTop:"4px"}}>
	Refresh search results
	</Grid>
</Grid>

<Alert severity="success">
A name is a sequence of characters that are alphanumeric, `_`, `-`, or `.`.
In all of the following search methods, exercise caution when searching for instances whose names contain spaces, as the search logic may confuse spaces for a [combined search](#combined). When searching for names with spaces, you should surround the full name with double quotes, for example <Typography noWrap>`tag:"Light Source"`</Typography> to search by the full [tag](../studio/properties.md#instance-tags) name of <Typography noWrap>`Light Source`</Typography>.
</Alert>

### Name search

Typing in a basic string yields **name** matched instances, case‑insensitive. For example, searching by the keyword `script` finds all instances containing it, such as `ServerScriptService` and `LocalScript`.

<img src="../assets/studio/explorer/Search-By-Name.png" width="320" alt="Objects filtered by query of 'script'" />

### Property search

You can filter by property equality or value comparisons. Most properties are supported, it works with partial matches, ignores spacing, and is case‑insensitive.

<Tabs>
<TabItem label="Equality">
Property **equality** is searched through the operators `=` or `==`.
<table>
<thead>
<tr>
	<th>Example</th>
	<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
	<td>`ClassName = Decal`</td>
	<td>All instances of class `Class.Decal`.</td>
</tr>
<tr>
	<td>`Locked = true`</td>
	<td>`Class.BasePart|BaseParts` with `Class.BasePart.Locked|Locked` set to `true`.</td>
</tr>
<tr>
	<td>`Material == plas`</td>
	<td>`Class.BasePart|BaseParts` with `Class.BasePart.Material|Material` of either `Enum.Material|Plastic` or `Enum.Material|SmoothPlastic`.</td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Value Comparisons">
Property **value comparisons** are searched through the operators `~=`, `>`, `<`, `<=`, or `>=`.
<table>
<thead>
<tr>
	<th>Example</th>
	<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
	<td>`Health > 50`</td>
	<td>Every `Class.Humanoid` with `Class.Humanoid.Health|Health` more than `50`.</td>
</tr>
<tr>
	<td>`Transparency ~= 0.5`</td>
	<td>`Class.BasePart|BaseParts` with `Class.BasePart.Transparency|Transparency` **not** equal to `0.5`.</td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Individual Fields">
Property types such as `Datatype.Vector3` and `Datatype.Color3` support searching by **individual fields**. This works either for exact equality or for value comparisons.
<table>
<thead>
<tr>
	<th>Example</th>
	<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
	<td>`Position.X = 1`</td>
	<td>Objects with an `X` position of exactly `1`.</td>
</tr>
<tr>
	<td>`Color.R > 120`</td>
	<td>Objects with a red (`R`) color channel value greater than `120`.</td>
</tr>
</tbody>
</table>

</TabItem>
<TabItem label="Complete Units">
Property types such as `Datatype.Vector3` and `Datatype.Color3` support searching as a **complete unit**, with the unit surrounded by quotes. This works either for exact equality, or with comparison operators in which every value is compared against the comparator.
<table>
<thead>
<tr>
	<th>Example</th>
	<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
	<td>`Size > "20, 5, 20"`</td>
	<td>Objects with an `X`, `Y`, and `Z` size greater than `20`,&nbsp;`5`,&nbsp;`20`, respectively.</td>
</tr>
<tr>
	<td>`Color = "255, 0, 0"`</td>
	<td>Objects with an RGB color value of exactly <Typography noWrap>`[255, 0, 0]`</Typography>.</td>
</tr>
</tbody>
</table>

</TabItem>
</Tabs>

### Bespoke search

Classes, and subclasses, and tags are searched through various **bespoke** queries, including:

- `is:[Class]` finds everything that is of **class** `[Class]`. For example, `is:Part` finds everything that is a `Class.Part`.
- `is:[SubClass]` finds everything that is a **subclass** of `[SubClass]`. For example, `is:BasePart` finds everything that is a subclass of `Class.BasePart`, such as `Class.Part` and `Class.MeshPart`.
- `tag:[TagName]` finds everything with a `Class.CollectionService` tag of `[TagName]`. For example, `tag:LightSource` finds everything that is tagged `LightSource`. You can add tags using the [Tags](../studio/properties.md#instance-tags) section of an instance's properties and tag names will autocomplete.

### Ancestry search

You can search within a specific scope using the `.` operator, chain operators together for highly specific searches, or use `*` as a wildcard.

- `[Parent].[Child]` finds named children inside a named parent. For example, `workspace.Model` finds instances named `Model` inside instances named `workspace`, similar to scripting.
- Chaining `.` operators adds specificity. For instance, `Animals.Dog.Tail` finds objects named `Tail` inside `Dog` inside `Animals`.
- `*` acts as a wildcard, for instance:

   <table size="small">
   <thead>
   <tr>
     <th>Example</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Cart.*`</td>
     <td>All children of an object named `Cart`.</td>
   </tr>
   <tr>
     <td>`Cart.Barrier.*`</td>
     <td>All children of `Barrier`, itself a child of `Cart`.</td>
   </tr>
   <tr>
     <td>`Cart.*.*`</td>
     <td>All grandchildren of `Cart`, excluding direct children of `Cart`.</td>
   </tr>
   <tr>
     <td>`Cart.*.Trim`</td>
     <td>All grandchildren of `Cart` that are named `Trim`.</td>
   </tr>
   </tbody>
   </table>

- `[Parent].**` finds all descendants of a parent. For example, `CarModel.**` finds all descendants of `CarModel`.

### Combined

For advanced logical searches, you can combine queries through unions and grouping.

- Multiple queries separated by spaces or `and` operate on **all** of the conditions.

   <table size="small">
   <thead>
   <tr>
     <th>Example</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Anchored=true CanCollide=true`</td>
     <td>Every `Class.BasePart` that is anchored and can collide.</td>
   </tr>
   <tr>
     <td>`Cart.*.* Transparency < 1`</td>
     <td>All grandchildren of `Cart` that are not fully transparent.</td>
   </tr>
   <tr>
     <td>`Anchored=false and CanCollide=false`</td>
     <td>Every `Class.BasePart` that isn't anchored and can't collide.</td>
   </tr>
   </tbody>
   </table>

- The `or` conjunction operates just like the `or` operator in code. Groups within parentheses, conjoined by `or`, find everything within multiple combined queries.

   <table size="small">
   <thead>
   <tr>
     <th>Example</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Cat or Dog`</td>
     <td>Everything that has `Cat` or `Dog` in its name.</td>
   </tr>
   <tr>
     <td>`(Anchored=true CanCollide=true) or (Anchored=false CanCollide=false)`</td>
     <td>Every `Class.BasePart` that either is anchored and can collide, **or** isn't anchored and can't collide.</td>
   </tr>
   </tbody>
   </table>

## Selection methods

Within a [searched](#search-methods) hierarchy, certain key shortcuts and mouse operations behave differently than they do within a non‑searched hierarchy.

### Select all

Within a non‑searched hierarchy, pressing <kbd>Ctrl</kbd><kbd>A</kbd> on Windows or <kbd>⌘</kbd><kbd>A</kbd> on Mac selects all instances. Within a [searched](#search-methods) hierarchy, the same shortcut or the **select&nbsp;all** button selects only the query‑matching objects, for example all objects matching **Board** in a hierarchy searched for `board`.

<img src="../assets/studio/explorer/Select-All-Searched.png" width="320" alt="Image showing how only matching objects are selected in a searched hierarchy using the Select All shortcut" />

### Shift-select

Clicking an object and <kbd>Shift</kbd>-clicking another object behaves differently within a non‑searched hierarchy versus a [searched](#search-methods) hierarchy.

<Tabs>
<TabItem label="Non-Searched Hierarchy">
Within a non-searched hierarchy, <kbd>Shift</kbd>-clicking two objects at the same hierarchy level selects both of them and every object between which is also at the same hierarchy level, as shown in image **🅰** where **LeftFoot** is initially clicked, **LeftLowerArm** is <kbd>Shift</kbd>‑clicked, and **LeftHand** at same hierarchy level is also selected. Duplicating, copying, or pasting the selected objects will result in a deep copy of those objects **and** all children.

If the first <kbd>Shift</kbd>-clicked object and the second <kbd>Shift</kbd>-clicked object are at **different** hierarchy levels, all objects in between them will be selected, as shown in image **🅱** where **LeftFoot** is initially clicked, **LeftHand** is <kbd>Shift</kbd>‑clicked, and everything between is also selected.

<Grid container spacing={3}>
<Grid item>
<figure>
<img src="../assets/studio/explorer/Shift-Click-Non-Searched-A.png" width="320" />
<figcaption><kbd>Shift</kbd>-click at same hierarchy level</figcaption>
</figure>
</Grid>
<Grid item>
<figure>
<img src="../assets/studio/explorer/Shift-Click-Non-Searched-B.png" width="320" />
<figcaption><kbd>Shift</kbd>-click at different hierarchy level</figcaption>
</figure>
</Grid>
</Grid>
</TabItem>
<TabItem label="Searched Hierarchy">
Within a searched hierarchy, if both the initially‑clicked object and the <kbd>Shift</kbd>‑clicked object match the query, only query‑matching objects between are selected. For example, in the following image with a hierarchy searched for `anim`, **FallAnim** is initially clicked, **RunAnim** is <kbd>Shift</kbd>‑clicked, and every object matching `anim` between is also selected.

<img src="../assets/studio/explorer/Shift-Click-Searched.png" width="320" alt="Image showing how only matching objects in range are selected within a searched hierarchy" />
</TabItem>
</Tabs>

### Drag select

Clicking and dragging from an empty region of the window initiates a selection box. Within a non‑searched hierarchy, everything inside the box is selected. Within a [searched](#search-methods) hierarchy, only query‑matching objects inside the box are selected.

<figure>
<img src="../assets/studio/explorer/Drag-Select-Searched.png" width="320" alt="Image showing how only matching objects inside the selection box are selected within a searched hierarchy" />
</figure>

## Key shortcuts

<table>
  <thead>
    <tr>
      <th>Shortcut</th>
      <th>Description</th>
    </tr>
   </thead>
   <tbody>
    <tr>
      <td><kbd>&rarr;</kbd></td>
      <td>With a collapsed branch selected, expands that branch. When pressed again, selects the **first child** immediately under the parent node.</td>
    </tr>
    <tr>
      <td><kbd>&larr;</kbd></td>
      <td>With any child of a branch selected, moves selection back to the parent node. When pressed again, collapses the entire branch.</td>
    </tr>
		<tr>
      <td><kbd>Home</kbd></td>
      <td>Selects the topmost object in the hierarchy (`Class.Workspace`).</td>
    </tr>
    <tr>
      <td><kbd>End</kbd></td>
      <td>Selects the bottommost object in the hierarchy.</td>
    </tr>
		<tr>
      <td><kbd>PageUp</kbd></td>
      <td>Selects the object in the hierarchy that's above the topmost **visible** hierarchy item.</td>
    </tr>
		<tr>
      <td><kbd>PageDown</kbd></td>
      <td>Selects the object in the hierarchy that's below the bottommost **visible** hierarchy item.</td>
    </tr>
		<tr>
      <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>X</kbd><br /><kbd>⌘</kbd><kbd>Shift</kbd><kbd>X</kbd></td>
      <td>Jump to the [search input](#search-methods) near the top of the window.</td>
    </tr>
  </tbody>
</table>
