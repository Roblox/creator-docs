---
title: Explorer Window
description: The Explorer window shows a hierarchical list of every instance inside an experience.
---

The **Explorer** window shows a hierarchical list of every instance inside an experience. At the highest level of the hierarchy are the services; **Workspace**, for example, is where visible 3D content such as [parts](../parts/index.md) are stored.

<img src="../assets/studio/general/View-Tab-Explorer.png" width="876" alt="Explorer toggle button in Studio" />

## Parent-Child Hierarchy

Roblox uses the concept of **parenting** to organize objects. All children of a parent object appear under its branch when [expanded](#expanding-and-collapsing-branches).

<figure>
<img src="../assets/studio/explorer/Parent-Child-Hierarchy.jpg" width="800" alt="Explorer hierarchy showing Camera, Terrain, Block, and SignModel as children of Workspace; Board and Post as children of SignModel" />
<figcaption>Camera, Terrain, Block, and SignModel as children of Workspace; Board and Post as children of SignModel</figcaption>
</figure>

## Expanding and Collapsing Branches

Clicking the arrow next to a parent branch, or pressing <kbd>&rarr;</kbd> or <kbd>&larr;</kbd> when a parent is selected, expands or collapses only that branch (nested child branches remain in their current state). To expand or collapse **all** branches within a multi-nested hierarchy, hold <kbd>Shift</kbd> when clicking the arrow.

<Tabs>
  <TabItem label="Collapsed">
    <img src="../assets/studio/explorer/Branch-Collapsed.jpg" width="800" height="242" alt="Branch entirely collapsed" />
  </TabItem>
  <TabItem label="Expand/Collapse">
    <img src="../assets/studio/explorer/Expand-Collapse.jpg" width="800" height="242" alt="Only the topmost parent expanded with click" />
  </TabItem>
  <TabItem label="Expand/Collapse All">
    <img src="../assets/studio/explorer/Expand-Collapse-All.jpg" width="800" height="242" alt="All branches of parent expanded with Shift-click" />
  </TabItem>
</Tabs>

## Inserting and Parenting

### Insert New Object

Some objects like primitive [parts](../parts/index.md) can be inserted from the [Model](../studio/model-tab.md) tab, but a full array of objects can be inserted through any of the following methods:

- Hover over the object's parent and click the &CirclePlus; button.

   <img src="../assets/studio/explorer/Workspace-Add-Object.png" width="400" alt="Hovering over Workspace object to reveal insertion button" />

- Right-click the object's parent and select **Insert&nbsp;Object**.
- Select the object's parent and press <kbd>Ctrl</kbd><kbd>I</kbd> on Windows or <kbd>⌘</kbd><kbd>I</kbd> on Mac.

Each method opens an **insertion window** which contains a list of objects, sorted by category. You can quickly locate familiar objects by typing a search query in the input field:

<img src="../assets/studio/explorer/Insert-Object-Popup-Searched.png" width="320" alt="Search query entered into search field to filter objects" />

You can further customize the behavior of the insertion workflow as follows:

<img src="../assets/studio/explorer/Insert-Object-Popup-Options.png" width="320" alt="Additional customization buttons for insertion workflow" />

- **Expanded View** shows a much wider window to select objects from.
- **Insertion Settings** contains the following toggles:
  - **Select object after insert** automatically selects new objects after you insert them.
  - **Show only recommended objects** limits the list of objects to those which are logical or functional within the parent.

### Paste From Clipboard

For an object copied to the clipboard, you can paste it as a new child to the `Class.Workspace`, or into one or more existing parents.

- Press <kbd>Ctrl</kbd><kbd>V</kbd> on Windows or <kbd>⌘</kbd><kbd>V</kbd> on Mac to paste the object into the top-level `Class.Workspace`.
- Right-click specific parent(s) and choose one of the following options from the context menu:

   <table>
   <tbody>
   <tr>
   <td>**Paste Into**</td>
   <td>Pastes the child geometrically on top of the original.</td>
   <td><kbd>Ctrl</kbd><kbd>Shift</kbd><kbd>V</kbd>&nbsp;(Windows)<br /><kbd>⌘</kbd><kbd>Shift</kbd><kbd>V</kbd>&nbsp;(Mac)</td>
   </tr>
   <tr>
   <td>**Paste Into at Original Location**</td>
   <td>Pastes the child at the same `Datatype.CFrame` it was authored at.</td>
   <td></td>
   </tr>
   </tbody>
   </table>

   <Alert severity="success">
   If you select multiple objects and right-click, the options above will appear as **Paste&nbsp;Into&nbsp;Selected&nbsp;\[\]**, and completing the operation will paste the clipboard item(s) into **all** of the selected parents. This is a convenient way to paste the same child into multiple parents, such as a common `Class.Texture` into several different `Class.Part|Parts`.
   </Alert>

### Changing Parents

To change the parent of one or more children (reparent), simply drag and drop them onto the new parent.

<figure>
<img src="../assets/studio/explorer/Reparent-Object.png" width="320" alt="Dragging one object over another to reparent it" />
<figcaption>Reparent BlockB from Workspace to SignModel</figcaption>
</figure>

## Organizing by Folders

Like directories/folders on a computer, the `Class.Folder` object is a useful way to organize objects. For instance, if you want to store all environmental sounds in a logical place, you can create a folder and place multiple `Class.Sound` objects within it.

<img src="../assets/studio/explorer/Folder-Children.png" width="320" alt="Multiple Sound objects grouped inside a Folder object" />

You can organize objects into folders as follows:

- Create a **Folder** instance through a standard [insertion](#insert-new-object) method, then drag and drop existing objects into it.

- Select multiple objects, right-click them, and then select **Group&nbsp;as&nbsp;a&nbsp;Folder** from the context menu or press <kbd>Alt</kbd><kbd>Ctrl</kbd><kbd>G</kbd> on Windows or <kbd>⌥</kbd><kbd>⌘</kbd><kbd>G</kbd> on Mac.

## Filtering Instances

Through the **Filter Workspace** input near the top of the window, You can filter instances by [name](#name-filter), [property](#property-filters), class/subclass/tag [bespoke](#bespoke-filters) queries, and [ancestry](#ancestry-filters) queries. You can also [combine parameters](#combining-parameters) for advanced logical filtering.

<img src="../assets/studio/explorer/Filter-Diagram.png" width="372" alt="Objects filtered by query in Filter Workspace field" />

<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-A.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Common filter selector</figcaption></p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-B.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Clear filter query</figcaption></p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-C.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Navigate up and down through filtered results</figcaption></p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-D.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Select all filtered results</figcaption></p></Grid>
</Grid>
<Grid container spacing={2} alignItems="center">
	<Grid item><img src="../assets/misc/Box-Label-E.png" width="40" /></Grid>
	<Grid item xs={10} sm={11} md={11} lg={11}><p><figcaption>Refresh filtered results</figcaption></p></Grid>
</Grid>

### Name Filter

Typing in a basic string yields **name** matched instances. For example, filtering by the keyword "script" finds all instances containing it, such as **Server<u>Script</u>Service** and **StarterPlayer<u>Script</u>s**.

<img src="../assets/studio/explorer/Filter-Name-Type.png" width="320" alt="Objects filtered by query of 'script'" />

<Alert severity="warning">
A name is a sequence of characters that are alphanumeric, `_`, `-`, or `.`.
In all of the following filtering methods, exercise caution when filtering for instances whose names contain spaces, as the filter logic may confuse spaces for a [combined filter](#combining-parameters). When filtering for names with spaces, you should surround the full name with double quotes, for example `tag:"Light Source"` to filter by the full tag name of **Light&nbsp;Source**.
</Alert>

### Property Filters

You can filter by property equality or value comparisons. Most properties are supported, and the filter works with partial matches, ignores spacing, and is non-case-sensitive.

- Property **equality** is filtered through the operators `=` or `==`.

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Locked = true`</td>
     <td>`Class.BasePart|BaseParts` with `Class.BasePart.Locked|Locked` set to true.</td>
   </tr>
   <tr>
     <td>`Material == plas`</td>
     <td>`Class.BasePart|BaseParts` with `Class.BasePart.Material|Material` of either `Enum.Material|Plastic` or `Enum.Material|SmoothPlastic`.</td>
   </tr>
   </tbody>
   </table>

- Property **value comparisons** are filtered through the operators `~=`, `>`, `<`, `<=`, or `>=`.

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Health > 50`</td>
     <td>Every `Class.Humanoid` with more than 50 `Class.Humanoid.Health|Health`.</td>
   </tr>
   <tr>
     <td>`Transparency ~= 0.5`</td>
     <td>`Class.BasePart|BaseParts` with `Class.BasePart.Transparency|Transparency` **not** equal to 0.5.</td>
   </tr>
   </tbody>
   </table>

- Property types such as `Datatype.Vector3` and `Datatype.Color3` support filtering on **individual fields**. This works either for exact equality or for value comparisons.

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Position.X = 1`</td>
     <td>Objects with an **X** position of exactly 1.</td>
   </tr>
   <tr>
     <td>`Color.R > 120`</td>
     <td>Objects with a red (**R**) color channel value greater than 120.</td>
   </tr>
   </tbody>
   </table>

- Property types such as `Datatype.Vector3` and `Datatype.Color3` support filtering as a **complete unit**, with the unit surrounded by quotes. This works either for exact equality, or with comparison operators in which every value is compared against the comparator.

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Size > "20, 5, 20"`</td>
     <td>Objects with an **X**, **Y**, and **Z** size greater than 20,&nbsp;5,&nbsp;20, respectively.</td>
   </tr>
   <tr>
     <td>`Color = "255, 0, 0"`</td>
     <td>Objects with an **RGB** color value of exactly [255,&nbsp;0,&nbsp;0].</td>
   </tr>
   </tbody>
   </table>

### Bespoke Filters

Classes, and subclasses, and tags are filtered through various bespoke queries, including:

- `classname:[Class]` and `c:[Class]` both find everything that is of **class** `[Class]`. For example, `classname:Part` finds everything that is a `Class.Part`.
- `is:[SubClass]` finds everything that is a **subclass** of `[SubClass]`. For example, `is:BasePart` finds everything that is a subclass of `Class.BasePart`, such as `Class.Part` and `Class.MeshPart`.
- `tag:[TagName]` finds everything with a `Class.CollectionService` tag of `[TagName]`. For example, `tag:LightSource` finds everything that is tagged **LightSource**. You can add tags using the [Tags](../studio/properties.md#instance-tags) section of an instance's properties, or Studio's [Tag&nbsp;Editor](../studio/view-tab.md#windows-and-tools), and tag names will autocomplete.

### Ancestry Filters

You can filter within a specific scope using the `.` operator, chain operators together for highly specific filters, or use `*` as a wildcard.

- `[Parent].[Child]` finds named children inside a named parent. For example, `workspace.Model` finds instances named **Model** inside instances named **workspace**, similar to scripting.
- Chaining `.` operators adds specificity. For instance, `Animals.Dog.Tail` finds objects named `Tail` inside `Dog` inside `Animals`.
- `*` acts as a wildcard, for instance:

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Cart.*`</td>
     <td>All children of an object named **Cart**.</td>
   </tr>
   <tr>
     <td>`Cart.Barrier.*`</td>
     <td>All children of **Barrier**, itself a child of **Cart**.</td>
   </tr>
   <tr>
     <td>`Cart.*.*`</td>
     <td>All grandchildren of **Cart**, excluding direct children of **Cart**.</td>
   </tr>
   <tr>
     <td>`Cart.*.Trim`</td>
     <td>All grandchildren of **Cart** that are named **Trim**.</td>
   </tr>
   </tbody>
   </table>

- `[Parent].**` finds all descendants of a parent. For example, `CarModel.**` finds all descendants of **CarModel**.

### Combining Parameters

For advanced logical searches, you can combine filters through unions and grouping.

- Multiple filters separated by spaces or `and` operate on **all** of the conditions.

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
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
     <td>All grandchildren of **Cart** that are not fully transparent.</td>
   </tr>
   <tr>
     <td>`Anchored=false and CanCollide=false`</td>
     <td>Every `Class.BasePart` that isn't anchored and can't collide.</td>
   </tr>
   </tbody>
   </table>

- The `or` conjunction operates just like the `or` operator in code. Groups within parentheses, conjoined by `or`, find everything within multiple combined filters.

   <table size="small">
   <thead>
   <tr>
     <th>Example Filter</th>
     <th>Result</th>
   </tr>
   </thead>
   <tbody>
   <tr>
     <td>`Cat or Dog`</td>
     <td>Everything that has **Cat** or **Dog** in its name.</td>
   </tr>
   <tr>
     <td>`(Anchored=true CanCollide=true) or (Anchored=false CanCollide=false)`</td>
     <td>Every `Class.BasePart` that either is anchored and can collide, **or** isn't anchored and can't collide.</td>
   </tr>
   </tbody>
   </table>

## Selecting Filtered Results

Within a [filtered](#filtering-instances) hierarchy, certain key shortcuts and mouse operations behave differently than they do within a non-filtered hierarchy.

### Select All

Within a non-filtered hierarchy, pressing <kbd>Ctrl</kbd><kbd>A</kbd> on Windows or <kbd>⌘</kbd><kbd>A</kbd> on Mac selects all objects. Within a [filtered](#filtering-instances) hierarchy, the same shortcut or the "select&nbsp;all" button selects only the **filter-matching** objects.

<Tabs>
  <TabItem label="Non-Filtered">
    <figure>
    <img src="../assets/studio/explorer/Select-All-Default.jpg" width="740" height="264" alt="All objects selected with Select All shortcut" />
	<figcaption>All objects selected</figcaption>
    </figure>
  </TabItem>
  <TabItem label="Filtered">
    <figure>
    <img src="../assets/studio/explorer/Select-All-Filtered.jpg" width="740" height="264" alt="Only filtered objects selected with Select All shortcut" />
	<figcaption>Only filter-matching objects selected</figcaption>
    </figure>
  </TabItem>
</Tabs>

### Shift-Select

Within a non-filtered hierarchy, clicking an object and then <kbd>Shift</kbd>-clicking another object selects everything within the range.

Within a [filtered](#filtering-instances) hierarchy, if both the initially clicked object **and** the <kbd>Shift</kbd>-clicked object match the filter query, only filter-matching objects within the range are selected.

<Tabs>
  <TabItem label="Non-Filtered">
    <figure>
    <img src="../assets/studio/explorer/Shift-Click-Default.jpg" width="740" height="264" alt="All objects selected with Shift-select key combo" />
	<figcaption>All objects in range selected</figcaption>
    </figure>
  </TabItem>
  <TabItem label="Filtered">
    <figure>
    <img src="../assets/studio/explorer/Shift-Click-Filtered.jpg" width="740" height="264" alt="Only filtered objects selected with Shift-select key combo" />
	<figcaption>Only filter-matching objects in range selected</figcaption>
    </figure>
  </TabItem>
</Tabs>

### Drag Select

Clicking and dragging from the right side of the window initiates a selection box. Within a non-filtered hierarchy, everything within the box is selected.

Within a [filtered](#filtering-instances) hierarchy, only filter-matching objects within the selection box are selected.

<Tabs>
  <TabItem label="Non-Filtered">
    <figure>
    <img src="../assets/studio/explorer/Drag-Select-Default.jpg" width="740" height="264" alt="All objects selected with mouse drag-select" />
	<figcaption>All objects within selection box selected</figcaption>
    </figure>
  </TabItem>
  <TabItem label="Filtered">
    <figure>
    <img src="../assets/studio/explorer/Drag-Select-Filtered.jpg" width="740" height="264" alt="Only filtered objects selected with mouse drag-select" />
	<figcaption>Only filter-matching objects within selection box selected</figcaption>
    </figure>
  </TabItem>
</Tabs>

## Additional Key Shortcuts

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
      <td><kbd>home</kbd></td>
      <td>Selects the topmost object in the hierarchy (`Class.Workspace`).</td>
    </tr>
    <tr>
      <td><kbd>end</kbd></td>
      <td>Selects the bottommost object in the hierarchy.</td>
    </tr>
	<tr>
      <td><kbd>page&nbsp;up</kbd></td>
      <td>Selects the object in the hierarchy that's above the topmost **visible** hierarchy item.</td>
    </tr>
	<tr>
      <td><kbd>page&nbsp;down</kbd></td>
      <td>Selects the object in the hierarchy that's below the bottommost **visible** hierarchy item.</td>
    </tr>
  </tbody>
</table>
