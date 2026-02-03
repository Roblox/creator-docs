---
title: Style Editor
description: Explore the built-in Style Editor, a comprehensive tool that allows you to create, manage, and apply UI styles for Roblox experiences.
---

The built-in **Style Editor** is a comprehensive tool that allows you to create, manage, and apply UI styles for Roblox experiences through a combination of [tokens](#style-tokens), [design sheets](#design-sheets), [style rules](#style-rules), and [themes](#style-themes).

<figure>
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/_k1ea0OIKaU?si=A9mdnnG95qdaZbB_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
</figure>

Access the **Style Editor** via the **UI** tab.

<img src="../../assets/studio/general/Toolbar-Style-Editor.png" width="800" alt="Style Editor tool indicated in UI tab of Studio toolbar" />

Once open, click the **Create Design** button to generate a base style set.

<img src="../../assets/ui/ui-styling/SE-Create-Design-Entry.png" width="350" alt="Create Design button in opening dialog of Style Editor." />

<Alert severity="warning">
Creating a design style set through the Style Editor generates a **BaseStyleSheet** inside a **Design** folder within `Class.ReplicatedStorage`. This base sheet syncs specific engine‑level defaults like the `Datatype.Color3` default of <Typography noWrap>`[163, 162, 165]`</Typography> with defaults that come from insertion workflows in Studio. It's highly recommended that you do **not** delete or attempt to modify the base style sheet&nbsp;— instead, build tokens and style rules around a design sheet to match your UI goals.

Additionally, a **StyleSheet** sheet is generated in the **Design** folder which contains a `Class.StyleDerive` to the base style sheet. If you choose to remove that `Class.StyleDerive`, unstyled values for `Class.GuiObject|GuiObjects` may become unexpected values, for example a default `Class.GuiObject.Size|Size` of <Typography noWrap>`0, 0, 0, 0`</Typography>.
</Alert>

## Style tokens

Style **tokens**, defined through [attributes](../../studio/properties.md#instance-attributes) of a token `Class.StyleSheet`, represent UI property variables that can be used across styles and components; for example, there could be a common color for a `Class.Frame.BackgroundColor3`, `Class.TextLabel.TextColor3`, and `Class.UIStroke.Color`. Tokens are comparable to [CSS variables](./css-comparisons.md#variables).

<Alert severity="success">
Although not required for UI styling, tokens are highly recommended for extensible UI design and style updates over time. You should begin by creating the following tokens to understand how they tie into other aspects of universal styling.
</Alert>

1. Create a new token style sheet:

   1. In the left column of the Style Editor, hover over **Tokens**, click the **&CirclePlus;**, and select **New&nbsp;Token&nbsp;StyleSheet**.
   2. Rename the new sheet to `TokenSheet`.

   <img src="../../assets/ui/ui-styling/SE-TokenSheet-New.png" width="640" alt="New token sheet created in Style Editor." />

2. With the new token sheet selected, create several tokens by clicking **Add&nbsp;a&nbsp;Token…** in the main panel. These tokens will be used throughout this guide for both [rules](#style-rules) and [themes](#style-themes).

   <table size="small">
	 <thead>
	   <tr>
	   <th>Token Name</th>
	   <th>Type</th>
	   <th>Value</th>
	   </tr>
   </thead>
	 <tbody>
	   <tr>
       <td>`Gold`</td>
       <td>`Datatype.Color3`</td>
       <td>`#ffcc00`</td>
     </tr>
	   <tr>
       <td>`Magenta`</td>
       <td>`Datatype.Color3`</td>
       <td>`#ff0099`</td>
     </tr>
	   <tr>
       <td>`Orange`</td>
       <td>`Datatype.Color3`</td>
       <td>`#dd6030`</td>
     </tr>
	   <tr>
       <td>`Oswald`</td>
       <td>`Datatype.Font`</td>
       <td>`Oswald`</td>
     </tr>
     <tr>
       <td>`Rad20`</td>
       <td>`Datatype.UDim`</td>
       <td>`0, 20`</td>
     </tr>
     <tr>
       <td>`RectL`</td>
       <td>`Datatype.UDim2`</td>
       <td><Typography noWrap>`0, 300, 0, 160`</Typography></td>
     </tr>
     <tr>
       <td>`SquareL`</td>
       <td>`Datatype.UDim2`</td>
       <td>`0, 200, 0, 200`</td>
     </tr>
     <tr>
       <td>`Text24`</td>
       <td>number</td>
       <td>`24`</td>
     </tr>
     <tr>
       <td>`Text32`</td>
       <td>number</td>
       <td>`32`</td>
     </tr>
   </tbody>
   </table>

   <img src="../../assets/ui/ui-styling/SE-TokenSheet-Tokens.png" width="400" alt="Tokens added to TokenSheet in Style Editor." />

## Design sheets

A design style sheet aggregates [style rules](#style-rules) and can be linked to `Class.DataModel` trees to apply style properties to UI instances. Only one `Class.StyleSheet` can apply to a given tree, although you can use [themes](#style-themes) to swap related styles across your UI, a concept covered later in this guide.

A prepopulated design sheet named **StyleSheet** is created via the **Create&nbsp;Design** button. It contains class rules for common UI objects such as `Class.Frame` and `Class.TextLabel`. It also contains two `Class.StyleDerive` instances which derive (inherit) [tokens](#style-tokens) and styles from the base style sheet for use in your custom styling configurations.

<img src="../../assets/ui/ui-styling/SE-Initial-Config.png" width="640" alt="Initial configuration of design sheet in Style Editor." />

Once you have a design sheet, you can set up a test [on‑screen container](../on-screen-containers.md) to use with the Style Editor, or an [in‑experience container](../in-experience-containers.md) if desired.

1. Hover over `Class.StarterGui` in the **Explorer** and insert a `Class.ScreenGui`.
2. Confirm that a new `Class.StyleLink` instance appears under the `Class.ScreenGui` with its `Class.StyleLink.StyleSheet|StyleSheet` property set to the **StyleSheet** design sheet.

   <Grid container spacing={3}>
   <Grid item>
   <img src="../../assets/studio/explorer/StarterGui-ScreenGui-StyleLink.png" width="320" />
   </Grid>
   <Grid item>
   <img src="../../assets/studio/properties/StyleLink-StyleSheet.png" width="320" />
   </Grid>
   </Grid>

   <Alert severity="success">
   If the `Class.StyleLink` is not created, you can quickly create one by selecting the `Class.ScreenGui` in the **Explorer** as well as the **StyleSheet** design sheet in the left column of the Style Editor. Then, click the **Insert&nbsp;StyleLink** button in the upper‑right section of the editor's main panel.
	 </Alert>

## Style rules

Style **rules** apply to every instance that matches the rule's `Class.StyleRule.Selector|Selector` definition to match characteristics such as class name, instance tag, and hierarchy relationships. At a high level, instance matching and modification via a rule's `Class.StyleRule.Selector|Selector` definition operates through:

- Roblox [class](#class-rule) selectors which target all instances of a given UI class, for example `Class.Frame`, `Class.ImageLabel`, `Class.TextButton`, etc.
- Instance [tag](#tag-rule) selectors that target specific UI objects [tagged](../../studio/properties.md#instance-tags) through `Class.CollectionService`.
- Instance [modifiers](#ui-modifier) applied through phantom `Class.UIComponent|UIComponents` such as `Class.UICorner` or `Class.UIStroke`.
- `Class.GuiObject` [state](#state-rule) selectors which correspond to one of the four `Enum.GuiState` enum values such as `Enum.GuiState.Hover|Hover`.
- Instance name selection according to the value of the UI object's `Class.Instance.Name`.

### Class rule

A style **class** selector targets all instances of a given UI class. The following rule setup styles all `Class.Frame|Frames` with a uniform background color and size.

1. In the left column of the Style Editor, select **Frame** in the **UI&nbsp;Elements** branch.

   <img src="../../assets/ui/ui-styling/SE-Class-Rule-New-Class.png" width="640" alt="Default class style in the Style Editor." />

2. Link two previously created [style tokens](#style-tokens) to two `Class.Frame` properties:

   <table size="small" style={{width: '60%;'}}>
	 <thead>
	   <tr>
	   <th>Property</th>
	   <th>Style Token</th>
	   </tr>
   </thead>
	 <tbody>
	   <tr>
       <td>`Class.Frame.BackgroundColor3|BackgroundColor3`</td>
       <td>`$Magenta`</td>
     </tr>
     <tr>
       <td>`Class.Frame.Size|Size`</td>
       <td>`$SquareL`</td>
     </tr>
   </tbody>
   </table>

   1. Click **Add a Property…** in the main panel and select the necessary property. Note that you can type keywords to more quickly find properties in the dropdown menu.
   2. Instead of entering a static value, click the **⋮** button and select **Link&nbsp;Token**.
   3. Click the `$` which appears in the value field and select the proper associated token.

	 <figure>
	 <br /><img src="../../assets/ui/ui-styling/SE-Class-Rule-Configure.png" width="526" alt="Token linking workflow diagrammed in the Style Editor." />
	 </figure>

	 <img src="../../assets/ui/ui-styling/SE-Class-Rule-Tokens.png" width="400" alt="Class rule configured with tokens in the Style Editor." />

3. Insert a new `Class.Frame` into the `Class.ScreenGui` you previously [created and linked](#design-sheets). The styles you defined should automatically apply to it.

   <img src="../../assets/ui/ui-styling/SE-Class-Rule-Result.png" width="840" alt="Final styled class rule in the Style Editor." />

### Tag rule

Instance **tag** selectors target specific UI objects [tagged](../../studio/properties.md#instance-tags) through `Class.CollectionService`. The following rule setup styles a `Class.TextButton` tagged as `ButtonPrimary` with a custom background color, font, and text size.

1. In the left column of the Style Editor, hover over the **StyleSheet** sheet, click the **⋮** button, and navigate through to **New**&nbsp;⟩ **Tag**.

   <img src="../../assets/ui/ui-styling/SE-Tag-Rule-New.png" width="600" alt="Creation of tag rule in the Style Editor." />

2. Rename the new tag rule `.ButtonPrimary` (note the leading `.`).

   <img src="../../assets/ui/ui-styling/SE-Tag-Rule-Renamed.png" width="240" alt="Tag rule renamed in the Style Editor." />

3. Link three previously created [style tokens](#style-tokens) to three `Class.TextButton` properties:

   <table size="small" style={{width: '60%;'}}>
	 <thead>
	   <tr>
	   <th>Property</th>
	   <th>Style Token</th>
	   </tr>
   </thead>
	 <tbody>
	   <tr>
       <td>`Class.TextButton.BackgroundColor3|BackgroundColor3`</td>
       <td>`$Gold`</td>
     </tr>
     <tr>
       <td>`Class.TextButton.FontFace|FontFace`</td>
       <td>`$Oswald`</td>
     </tr>
     <tr>
       <td>`Class.TextButton.TextSize|TextSize`</td>
       <td>`$Text32`</td>
     </tr>
   </tbody>
   </table>

   1. Click **Add a Property…** in the main panel and select the necessary property. Remember that you can type keywords to more quickly find properties in the dropdown menu.
   2. Instead of entering a static value, click the **⋮** button and select **Link&nbsp;Token**.
   3. Click the `$` which appears in the value field and select the proper associated token.

   <figure>
	 <br /><img src="../../assets/ui/ui-styling/SE-Tag-Rule-Configure.png" width="526" alt="Token linking workflow diagrammed in the Style Editor." />
	 </figure>

	 <img src="../../assets/ui/ui-styling/SE-Tag-Rule-Tokens.png" width="400" alt="Tag rule configured with tokens in the Style Editor." />

4. Insert a new `Class.TextButton` into the `Class.ScreenGui` you previously [created and linked](#design-sheets) and [tag](../../studio/properties.md#instance-tags) it as `ButtonPrimary`. A convenient shortcut is as follows:

   1. Make sure the new `Class.TextButton` is selected in the **Explorer**.
   2. With the **.ButtonPrimary** tag rule selected in the left column of the Style Editor, click **Apply&nbsp;Tag** in the main panel. The styles you defined should automatically apply to the button.

   <figure>
	 <br /><img src="../../assets/ui/ui-styling/SE-Tag-Rule-Apply-Tag.png" width="640" alt="Tag linking workflow diagrammed in the Style Editor." />
	 </figure>

	 <img src="../../assets/ui/ui-styling/SE-Tag-Rule-Result.png" width="840" alt="Final styled tag rule in the Style Editor." />

### UI modifier

Instance modifier selectors apply phantom `Class.UIComponent|UIComponents` such as `Class.UICorner` or `Class.UIStroke` to further style an object. The following rule setup styles a `Class.TextLabel` with a custom text size and rounded corners.

1. In the left column of the Style Editor, select **TextLabel** in the **UI&nbsp;Elements** branch.

   <img src="../../assets/ui/ui-styling/SE-Modifier-Rule-New-Class.png" width="640" alt="Default class style in the Style Editor." />

2. Link a previously created [style token](#style-tokens) to the `Class.TextLabel.TextSize|TextSize` property:

   1. Click **Add a Property…** in the main panel and select the `Class.TextLabel.TextSize|TextSize` property. Remember that you can type keywords to more quickly find properties in the dropdown menu.
   2. Instead of entering a static value, click the **⋮** button and select **Link&nbsp;Token**.
   3. Click the `$` which appears in the value field and select the `$Text32` token.

   <figure>
	 <br /><img src="../../assets/ui/ui-styling/SE-Modifier-Rule-Configure.png" width="526" alt="Token linking workflow diagrammed in the Style Editor." />
	 </figure>

	 <img src="../../assets/ui/ui-styling/SE-Modifier-Rule-Tokens.png" width="400" alt="Class rule configured with tokens in the Style Editor." />

A **pseudo instance** is required to configure and apply rounded corners to other elements. To create one:

1. In the left column, hover over **TextLabel**, click the **⋮** button, and navigate through to **New**&nbsp;⟩ **Pseudo&nbsp;Instance**&nbsp;⟩ **UICorner**.

   <img src="../../assets/ui/ui-styling/SE-Modifier-Rule-Pseudo-Instance-New.png" width="760" alt="Creation of a pseudo instance in the Style Editor." />

   A new **UICorner** pseudo instance appears under the **TextLabel** element in the left column.

	 <img src="../../assets/ui/ui-styling/SE-Modifier-Rule-Pseudo-Instance-Created.png" width="240" alt="Resulting pseudo instance in the Style Editor." />

2. With the new **UICorner** instance selected in the left column, link a previously created [style token](#style-tokens) to the `Class.UICorner.CornerRadius|CornerRadius` property:

   1. Click **Add a Property…** in the main panel and select the `Class.UICorner.CornerRadius|CornerRadius` property.
   2. Instead of entering a static value, click the **⋮** button and select **Link&nbsp;Token**.
   3. Click the `$` which appears in the value field and select the `$Rad20` token.

	 <img src="../../assets/ui/ui-styling/SE-Modifier-Rule-Pseudo-Instance-Tokens.png" width="400" alt="Pseudo instance configured with tokens in the Style Editor." />

3. Insert a new `Class.TextLabel` into the `Class.ScreenGui` you previously [created and linked](#design-sheets). The styles you defined should automatically apply to it.

   <img src="../../assets/ui/ui-styling/SE-Modifier-Rule-Result.png" width="840" alt="Final styled modifier rule in the Style Editor." />

### State rule

`Class.GuiObject` **state** selectors correspond to one of the four `Enum.GuiState|GuiState` enum values such as `Enum.GuiState|Hover`, letting you automatically configure style changes for interactive states. The following rule setup creates a hover state of `-4` degrees rotation for all `Class.ImageButton|ImageButtons`.

1. In the left column of the Style Editor, select **ImageButton** in the **UI&nbsp;Elements** branch.

   <img src="../../assets/ui/ui-styling/SE-State-Rule-New-Class.png" width="640" alt="Default class style in the Style Editor." />

2. Click the **⋮** button and navigate through to **New**&nbsp;⟩ **GuiState**&nbsp;⟩ **Hover**.

   <img src="../../assets/ui/ui-styling/SE-State-Rule-New.png" width="760" alt="Creation of state rule in the Style Editor." />

	 A new **Hover** state modifier instance appears under the **ImageButton** element in the left column.

	 <img src="../../assets/ui/ui-styling/SE-State-Rule-Created.png" width="240" alt="Resulting state rule in the Style Editor." />

3. With the new **Hover** modifier selected in the left column, click **Add&nbsp;a&nbsp;Property…** in the main panel and select `Class.ImageButton.Rotation|Rotation`. Remember that you can type keywords to more quickly find properties in the dropdown menu.
4. Enter `-4` in the property's value field.

   <img src="../../assets/ui/ui-styling/SE-State-Rule-Tokens.png" width="400" alt="State rule configured with tokens in the Style Editor." />

5. Insert a new `Class.ImageButton` into the `Class.ScreenGui` you previously [created and linked](#design-sheets). When you hover over the button in the viewport, it should rotate 4 degrees counterclockwise.

   <img src="../../assets/ui/ui-styling/SE-State-Rule-Result.png" width="840" alt="Final styled state rule in the Style Editor." />

## Style themes

Style **themes** consist of sets of specific tokens that can be swapped, for example color tokens that define a "light" and "dark" theme.

### Theme creation

For extensibility, themes are organized into folders. While a single folder may suffice for most purposes, you're free to organize themes in folders like "colors" or "fonts" if desired.

1. Create a new theme folder:

   1. In the left column of the Style Editor, hover over **Themes**, click the **&CirclePlus;**, and select **New&nbsp;Theme**.
   2. Rename the new **Folder** item to **General**.

   <img src="../../assets/ui/ui-styling/SE-Themes-New-Folder.png" width="240" alt="New themes folder created in the Style Editor." />

2. Create a new theme style sheet:

   1. Hover over the new **General** folder, click the **⋮** button, and select **New&nbsp;Theme&nbsp;StyleSheet**.
   2. Rename it to **ThemeA**.

   <img src="../../assets/ui/ui-styling/SE-Themes-New-Theme.png" width="240" alt="New theme created in the Style Editor." />

### Theme tokens

Once a theme is constructed, you can link its tokens to various UI object properties such as the `Class.TextButton.BackgroundColor3|BackgroundColor3` of a `Class.TextButton`. Theme sheets must use a common set of tokens to work correctly.

With **ThemeA** selected in the left column of the Style Editor:

1. Link three previously created [style tokens](#style-tokens) to three new theme tokens:

   <table size="small" style={{width: '60%;'}}>
	 <thead>
	   <tr>
	   <th>Theme Token</th>
	   <th>Style Token</th>
	   </tr>
   </thead>
	 <tbody>
	   <tr>
       <td>`BackColor`</td>
       <td>`$Gold`</td>
     </tr>
     <tr>
       <td>`ButtonFont`</td>
       <td>`$Oswald`</td>
     </tr>
     <tr>
       <td>`ButtonTextSize`</td>
       <td>`$Text32`</td>
     </tr>
   </tbody>
   </table>

   1. Click **Add a Token…** in the main panel and enter the theme token's name.
   2. Click the `$` which appears in the value field and select the associated style token.

	 <img src="../../assets/ui/ui-styling/SE-Themes-ThemeA-Tokens.png" width="400" alt="Theme configured with tokens in the Style Editor." />

2. In the left column of the Style Editor, select **TextButton** in the **UI&nbsp;Elements** branch.

   <img src="../../assets/ui/ui-styling/SE-Themes-New-Class.png" width="640" alt="Default class style in the Style Editor." />

3. Link the theme's tokens to three new `Class.TextButton` properties:

   <table size="small" style={{width: '60%;'}}>
	 <thead>
	   <tr>
	   <th>Property</th>
	   <th>Theme Token</th>
	   </tr>
   </thead>
	 <tbody>
	   <tr>
       <td>`Class.TextButton.BackgroundColor3|BackgroundColor3`</td>
       <td>`$BackColor`</td>
     </tr>
     <tr>
       <td>`Class.TextButton.FontFace|FontFace`</td>
       <td>`$ButtonFont`</td>
     </tr>
     <tr>
       <td>`Class.TextButton.TextSize|TextSize`</td>
       <td>`$ButtonTextSize`</td>
     </tr>
   </tbody>
   </table>

   1. Click **Add a Property…** in the main panel and select the necessary property.
   2. Instead of entering a static value, click the **⋮** button and select **Link&nbsp;Token**.
   3. Click the `$` which appears in the value field and select the proper theme token.

   <figure>
	 <br /><img src="../../assets/ui/ui-styling/SE-Themes-Theme-Configure.png" width="526" alt="Token linking workflow diagrammed in the Style Editor." />
	 <Alert severity="warning">
	 When linking the theme's tokens, look for **\$\[Token\] in ThemeA** in the hover‑over to know the token is coming from the **theme** and not from the global token sheet (remember that the theme already derives the global tokens).
	 </Alert>
   </figure>

	 <img src="../../assets/ui/ui-styling/SE-Themes-Class-Tokens.png" width="400" alt="Class rule configured with theme tokens in the Style Editor." />

### Theme duplication

Once you have a theme generally established, you can **duplicate** it and change various tokens to define a unique theme style.

1. In the left column of the Style Editor, hover over the **ThemeA** theme, click the **⋮** button, and select **Duplicate**.
2. Rename the duplicated theme to **ThemeB**.

   <img src="../../assets/ui/ui-styling/SE-Themes-Duplicated-Theme.png" width="240" alt="Theme duplicated in the Style Editor." />

3. Link two of the theme's tokens to two different style tokens:

   <table size="small" style={{width: '60%;'}}>
	 <thead>
	   <tr>
	   <th>Theme Token</th>
	   <th>Style Token</th>
	   </tr>
   </thead>
	 <tbody>
	   <tr>
       <td>`BackColor`</td>
       <td>`$Magenta`</td>
     </tr>
     <tr>
       <td>`ButtonTextSize`</td>
       <td>`$Text24`</td>
     </tr>
   </tbody>
   </table>

   1. To the right of the property's value field, click the **⋮** button and select **Unlink&nbsp;Token**.
   2. Click **⋮** again and select **Link Token**.
   3. In its value field, click the `$` and select the new associated style token.

   <img src="../../assets/ui/ui-styling/SE-Themes-ThemeB-Tokens.png" width="400" alt="Theme configured with tokens in the Style Editor." />

### Theme swapping

Once you have [multiple themes](#theme-duplication), you can swap between them via the theme's folder, or via a script as outlined in `Class.StyleSheet:SetDerives()|SetDerives()`.

1. In the left column of the Style Editor, select the **General** folder in the **Themes** branch.
2. In the main panel, swap between the themes using the radio buttons.

   <Tabs>
   <TabItem label="ThemeA">
   <img src="../../assets/ui/ui-styling/SE-Themes-Swapping-ThemeA.png" width="640" height="216" alt="ThemeA swapped in the Style Editor." />
   <img src="../../assets/ui/ui-styling/SE-Themes-ThemeA-Result.png" width="800" height="403" />
   </TabItem>
   <TabItem label="ThemeB">
	 <img src="../../assets/ui/ui-styling/SE-Themes-Swapping-ThemeB.png" width="640" height="216" alt="ThemeB swapped in the Style Editor." />
   <img src="../../assets/ui/ui-styling/SE-Themes-ThemeB-Result.png" width="800" height="403" />
   </TabItem>
   </Tabs>
