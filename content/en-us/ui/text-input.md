---
title: Text input fields
description: Text input fields allow users to input text from their physical or on-screen keyboard.
---

import TextFiltering from '../includes/text-filtering/text-filtering.md'

A `Class.TextBox` is a rectangle that allows a user to provide text input while it's in focus. When you [script](#script-text-inputs) a `Class.TextBox`, you can use it as a search bar or an input field on a form. To help users know what type of text they should input, you can also provide a prompt through the `Class.TextBox.PlaceholderText|PlaceholderText` property.

<img src="../assets/ui/ui-objects/TextBox-Example.jpg" width="840" />

Because these objects are `Class.GuiObject|GuiObjects`, you can customize
properties such as `Class.GuiObject.BackgroundColor3|BackgroundColor3`,
`Class.GuiObject.BorderMode|BorderMode`,
`Class.GuiObject.Transparency|Transparency`, and
`Class.GuiObject.Rotation|Rotation` to fit the aesthetics of your experience.

## Create text inputs on the screen

A `Class.TextBox` on a screen is useful for
things like an input field for a form.

To add a `Class.TextBox` to a screen:

1. In the **Explorer** window, select **StarterGui** and add a **ScreenGui**.

   1. Hover over StarterGui and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **ScreenGui**.

2. Select the new **ScreenGui** and add a **TextBox**.

   1. Hover over **ScreenGui** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **TextBox**.

## Create text inputs on part faces

To add a `Class.TextBox` to the face of a part:

1. In the **Explorer** window, select **StarterGui** and add a **SurfaceGui**.

   1. Hover over StarterGui and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **ScreenGui**.

2. Select the new **SurfaceGui** and add a **TextBox**.

   1. Hover over **SurfaceGui** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **TextBox**.

3. Adorn the **SurfaceGui** to the **part** on which you want to display the **TextBox**.

   1. In the **Properties** window, select the **Adornee** property. Your cursor changes.

   1. In the **Explorer** window, select the part.

<Alert severity="warning">
  If you don't see the `Class.TextBox`, try [choosing a different face](../parts/textures-decals.md#choose-a-face) in the <b>Face</b> property of the <b>SurfaceGui</b>.
</Alert>

## Script text inputs

Like [buttons](../ui/buttons.md), you can script any action for a `Class.TextBox` object when a user interacts with it. For example, the following script connects the `Class.TextBox.FocusLost|FocusLost` event which fires when the user presses the <kbd>Enter</kbd> button or clicks outside the box. If `enterPressed` is `true`, meaning the user submitted the input instead of merely clicking outside the box, the script prints the contents of the entry to the [Output](../studio/output.md) window.

```lua title="Basic Text Input Handling"
local textBox = script.Parent

local function onFocusLost(enterPressed, inputObject)
	if enterPressed then
		print(textBox.Text)
	end
end

textBox.FocusLost:Connect(onFocusLost)
```

As another example, you might want to allow only numbers in a `Class.TextBox`. The following code uses the `Class.TextBox.GetPropertyChangedSignal` event to detect when the `Class.TextBox.Text` changes, such as when a user starts typing, then it uses the `Library.string.gsub()` function to disallow non‑numbers.

```lua title="Restricting Text Input to Numbers"
local textBox = script.Parent

local function allowOnlyNumbers()
	textBox.Text = string.gsub(textBox.Text, "%D", "")
end

textBox:GetPropertyChangedSignal("Text"):Connect(allowOnlyNumbers)
```

## Text filtering

<TextFiltering components={props.components} context="characters/strings that users input through text inputs" />
