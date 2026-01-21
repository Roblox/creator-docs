---
title: Rich text markup
description: Rich Text Markup are simple markup tags to style sections of a string.
comments: |
  1. Replace numbered footnotes with dedicated style.
---

UI **rich text** utilizes simple markup tags to style sections of a string in bold, italics, underline, fill color, stroke variations, and more. You can apply styling tags to `Class.TextLabel`, `Class.TextButton`, and `Class.TextBox` objects.

## Enable rich text

You must enable rich text on a per-object basis through its **RichText** property in the [Properties](../studio/properties.md) window, or by setting the property to `true` in a `Class.LocalScript`.

<img src="../assets/ui/rich-text/Enable-Rich-Text.png"
   width="320" />

```lua highlight="2"
local title = Instance.new("TextLabel")
title.RichText = true

title.Text = "Use a <b>bold title</b>"
```

<Alert severity="info">
When editing an object's **Text** property in Studio, toggling the **RichText** checkbox in the [Properties](../studio/properties.md) window displays the text string as a final render. This is useful for identifying and correcting mistakes in any [supported tags](#supported-tags).
</Alert>

<Alert severity="warning">
<a href="../production/localization/index.md">Localizing</a> an experience to support other languages removes rich text formatting tags. To ensure formatting appears in other languages, re-apply the tags manually to your localized strings.
</Alert>

## Supported tags

Rich text tags are similar to XML/HTML tags and you must include both an opening and closing tag around the formatted text.

`<b>Formatted text</b>`

You can also nest tags inside each other as long as you close them in the reverse order of how you opened them.

`<b><i><u>Formatted text</u></i></b>`

### Font color

`<font color=""> </font>`

<blockquote>
`I want the <font color="#FF7800">orange</font> candy.`<br />
`I want the <font color="rgb(255,125,0)">orange</font> candy.`
<img src="../assets/ui/rich-text/Example-Color.png" width="600" />
</blockquote>

### Font size

`<font size=""> </font>`

<blockquote>
`<font size="40">This is big.</font> <font size="20">This is small.</font>`
<img src="../assets/ui/rich-text/Example-Size.png" width="600" />
</blockquote>

### Font face

`<font face=""> </font>`

<blockquote>
`<font face="Michroma">This is Michroma face.</font>`
<img src="../assets/ui/rich-text/Example-Font-Face.png" width="600" />
</blockquote>
<Alert severity="info">
Font face/family names are listed on the `Datatype.Font` enum reference page.
</Alert>

### Font family

`<font family=""> </font>`

<blockquote>
`<font family="rbxasset://fonts/families/Michroma.json">This is Michroma face.</font>`
<img src="../assets/ui/rich-text/Example-Font-Face.png" width="600" />
</blockquote>
<Alert severity="info">
Font face/family names are listed on the `Datatype.Font` enum reference page.
</Alert>

### Font weight

`<font weight=""> </font>`

<blockquote>
`This is normal. <font weight="heavy">This is heavy.</font>`<br />
`This is normal. <font weight="900">This is heavy.</font>`
<img src="../assets/ui/rich-text/Example-Weight.png" width="600" />
</blockquote>
<Alert severity="info">
Font weight can be a case-insensitive string name including `Thin`, `ExtraLight`, `Light`, `Regular`, `Medium`, `SemiBold`, `Bold`, `ExtraBold`, or `Heavy`; it can also be a number in factors of 100 between `100` and `900`.
</Alert>

### Font transparency

`<font transparency=""> </font>`

<blockquote>
`Text at <font transparency="0.5">50% transparency</font>.`
<img src="../assets/ui/rich-text/Example-Transparency.png" width="600" />
</blockquote>

### Stroke

`<stroke> </stroke>`

<table size="small">
<thead>
	<tr>
		<th>Parameter</th>
		<th>Equivalent Property</th>
		<th>Example Values</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>`color`</td>
		<td>`Class.UIStroke.Color`</td>
		<td>`"rgb(255,125,0)"`, `"#FF7800"`</td>
	</tr>
	<tr>
		<td>`thickness` or `th`</td>
		<td>`Class.UIStroke.Thickness`</td>
		<td>`"1"`, `"4"`, `"0.5"`</td>
	</tr>
	<tr>
		<td>`transparency` or `tr`</td>
		<td>`Class.UIStroke.Transparency`</td>
		<td>`"0"`, `"0.5"`, `"1"`</td>
	</tr>
	<tr>
		<td>`joins`</td>
		<td>`Class.UIStroke.LineJoinMode`</td>
		<td>`"round"`, `"bevel"`, `"miter"`</td>
	</tr>
	<tr>
		<td>`sizing`</td>
		<td>`Class.UIStroke.StrokeSizingMode`</td>
		<td>`"fixed"`, `"scaled"`</td>
	</tr>
</tbody>
</table>

<blockquote>
`You won <stroke color="#00A2FF" thickness="2" transparency="0.25" joins="miter">25 gems</stroke>.`
<img src="../assets/ui/rich-text/Example-Stroke.png" width="600" />
</blockquote>

<Alert severity="info">
See [UI appearance modifiers](../ui/appearance-modifiers.md#stroke) for details on `<stroke>` tag parameters such as `thickness` and `joins`.
</Alert>

### Bold

`<b> </b>`

<blockquote>
`Text in <b>bold</b>.`
<img src="../assets/ui/rich-text/Example-Bold.png" width="600" />
</blockquote>

### Italic

`<i> </i>`

<blockquote>
`Text <i>italicized</i>.`
<img src="../assets/ui/rich-text/Example-Italic.png" width="600" />
</blockquote>

### Underline

`<u> </u>`

<blockquote>
`Text <u>underlined</u>.`
<img src="../assets/ui/rich-text/Example-Underline.png" width="600" />
</blockquote>

### Strikethrough

`<s> </s>`

<blockquote>
`Text with <s>strikethrough</s> applied.`
<img src="../assets/ui/rich-text/Example-Strikethrough.png" width="600" />
</blockquote>

### Line break

`<br/>`

<blockquote>
`New line occurs after this sentence.<br/>Next sentence...`
<img src="../assets/ui/rich-text/Example-Line-Break.png" width="600" />
</blockquote>

### Uppercase

`<uppercase> </uppercase>`<br/>`<uc> </uc>`

<blockquote>
`<uppercase>Uppercase</uppercase> makes words read loudly!`<br />
`<uc>Uppercase</uc> makes words read loudly!`
<img src="../assets/ui/rich-text/Example-Uppercase.png" width="600" />
</blockquote>

### Small caps

`<smallcaps> </smallcaps>`<br/>`<sc> </sc>`

<blockquote>
`My name is <smallcaps>Diva Dragonslayer</smallcaps>.`<br />
`My name is <sc>Diva Dragonslayer</sc>.`
<img src="../assets/ui/rich-text/Example-Small-Caps.png" width="600" />
</blockquote>

### Mark

`<mark> </mark>`

<blockquote>
`Text <mark color="#009966" transparency="0">highlighted</mark>.`
<img src="../assets/ui/rich-text/Example-Highlighted.png" width="600" />
</blockquote>

### Comment

`<!-- -->`

<blockquote>
`After this is a comment...<!--This does not appear in the final text--> and now more text...`
<img src="../assets/ui/rich-text/Example-Comment.png" width="600" />
</blockquote>

## Escape forms

If you want to render certain characters like `<` or `>` and exempt them from consideration as part of rich text tags, you can write them in their **escape form**.

<table>
<thead>
  <tr>
    <th>Character</th>
    <th>Escape</th>
    <th>Example</th>
    <th>Result</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`<`</td>
    <td>`&lt;`</td>
    <td>`10 &lt; 100`</td>
    <td>10 &lt; 100</td>
  </tr>
  <tr>
    <td>`>`</td>
    <td>`&gt;`</td>
    <td>`100 &gt; 10`</td>
    <td>100 &gt; 10</td>
  </tr>
  <tr>
    <td>`"`</td>
    <td>`&quot;`</td>
    <td>`Meet &quot;Diva Dragonslayer&quot;`</td>
    <td>Meet "Diva Dragonslayer"</td>
  </tr>
  <tr>
    <td>`'`</td>
    <td>`&apos;`</td>
    <td>`Diva&apos;s pet is a falcon!`</td>
    <td>Diva's pet is a falcon!</td>
  </tr>
  <tr>
    <td>`&`</td>
    <td>`&amp;`</td>
    <td>`Render another escape form <b>&amp;lt;</b> by escaping an ampersand`</td>
    <td>Render another escape form **&amp;lt;** by escaping an ampersand</td>
  </tr>
</tbody>
</table>
