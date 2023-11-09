---
title: Text Input
description: Text input objects allow users to input text like fields on a form.
---

A `Class.TextBox` is a rectangle that allows a user to provide text input while it's in focus. When you [script](#scripting-text-inputs) a `Class.TextBox`, you can use it as a search bar or an input field on a form. To help users know what type of text they should input, you can also provide a prompt through the `Class.TextBox.PlaceholderText|PlaceholderText` property, such as "**Search...**" or "**Enter Name...**".

<img src="../assets/ui/button-text-input/TextBox-Example.jpg" width="800" />

Because these objects are `Class.GuiObject|GuiObjects`, you can customize
properties such as `Class.GuiObject.BackgroundColor3|BackgroundColor3`,
`Class.GuiObject.BorderMode|BorderMode`,
`Class.GuiObject.Transparency|Transparency`, and
`Class.GuiObject.Rotation|Rotation` to fit the aesthetics of your experience.

## Creating Text Inputs on the Screen

A `Class.TextBox` on a screen is useful for
things like an input field for a form.

To add a `Class.TextBox` to a screen:

1. In the **Explorer** window, select **StarterGui** and add a **ScreenGui**.

   1. Hover over StarterGui and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **ScreenGui**.

2. Select the new **ScreenGui** and add a **TextBox**.

   1. Hover over **ScreenGui** and click the &CirclePlus; button. A contextual menu displays.

   1. Insert a **TextBox**.

## Creating Text Inputs on Part Faces

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
  If you don't see the `Class.TextBox`, try [choosing a different face](../parts/textures-decals.md#choosing-a-face) in the <b>Face</b> property of the <b>SurfaceGui</b>.
</Alert>

## Scripting Text Inputs

Like buttons, you can script any action for a `Class.TextBox` object to perform when a user interacts with it. For example, the following script connects to the `Class.TextBox.FocusLost|FocusLost` event, which fires when the user presses the Enter button or clicks outside the `Class.TextBox`. The script prints the contents of the box to the Output window when the event fires:

```lua
local textBox = script.Parent
local function onFocusLost(enterPressed, inputObject)
	if enterPressed then
		print(textBox.Text)
	end
end
textBox.FocusLost:Connect(onFocusLost)
```

As another example, you might want to only allow numbers in a `Class.TextBox`. The following code uses the `Class.TextBox.GetPropertyChangedSignal` event to detect when the `Class.TextBox.Text` changes, such as when a user starts typing. Then it uses the `Library.string.gsub()` function to disallow non-numbers:

```lua
local textBox = script.Parent
local function onlyAllowNumbers()
	textBox.Text = string.gsub(textBox.Text, "%D", "")
end
textBox:GetPropertyChangedSignal("Text"):Connect(onlyAllowNumbers)
```
