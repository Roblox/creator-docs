---
title: UI styling compatibility
description: Outlines all of the classes and associated properties which can be styled.
---

The following tables outline all of the classes and associated properties which can be styled. Additional support may be added over time, so please bookmark this page for reference.

## UI objects

### GuiObject

`Class.GuiObject` is an abstract class from which most UI classes inherit, including [frames](../frames.md), [labels](../labels.md), [buttons](../buttons.md), and more.

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.GuiObject.Active`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.AnchorPoint`</td>
    <td>`Datatype.Vector2`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.AutomaticSize`</td>
    <td>`Enum.AutomaticSize`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.BackgroundColor`</td>
    <td>`Datatype.BrickColor`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.BackgroundColor3`</td>
    <td>`Datatype.Color3`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.BackgroundTransparency`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.BorderColor3`</td>
    <td>`Datatype.Color3`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.BorderMode`</td>
    <td>`Enum.BorderMode`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.BorderSizePixel`</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.ClipsDescendants`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Interactable`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.LayoutOrder`</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Position`</td>
    <td>`Datatype.UDim2`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Rotation`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Selectable`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.SelectionOrder`</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Size`</td>
    <td>`Datatype.UDim2`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.SizeConstraint`</td>
    <td>`Enum.SizeConstraint`</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Transparency`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.Visible`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.GuiObject.ZIndex`</td>
    <td>integer</td>
  </tr>
</tbody>
</table>

### GuiButton

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.GuiButton.AutoButtonColor`</td>
    <td>boolean</td>
  </tr>
</tbody>
</table>

### TextLabel

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.TextLabel.Font`</td>
    <td>`Enum.Font`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.FontFace`</td>
    <td>`Datatype.Font`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.LineHeight`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.MaxVisibleGraphemes`</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.OpenTypeFeatures`</td>
    <td>string</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.RichText`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.Text`</td>
    <td>string</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextColor3`</td>
    <td>`Datatype.Color3`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextDirection`</td>
    <td>`Enum.TextDirection`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextScaled`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextSize`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextStrokeColor3`</td>
    <td>`Datatype.Color3`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextStrokeTransparency`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextTransparency`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextTruncate`</td>
    <td>`Enum.TextTruncate`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextWrapped`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextXAlignment`</td>
    <td>`Enum.TextXAlignment`</td>
  </tr>
  <tr>
    <td>`Class.TextLabel.TextYAlignment`</td>
    <td>`Enum.TextYAlignment`</td>
  </tr>
</tbody>
</table>

### TextButton

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.TextButton.Font`</td>
    <td>`Enum.Font`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.FontFace`</td>
    <td>`Datatype.Font`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.LineHeight`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextButton.MaxVisibleGraphemes`</td>
    <td>integer</td>
  </tr>
  <tr>
    <td>`Class.TextButton.OpenTypeFeatures`</td>
    <td>string</td>
  </tr>
  <tr>
    <td>`Class.TextButton.RichText`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.TextButton.Text`</td>
    <td>string</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextColor3`</td>
    <td>`Datatype.Color3`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextDirection`</td>
    <td>`Enum.TextDirection`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextScaled`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextSize`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextStrokeColor3`</td>
    <td>`Datatype.Color3`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextStrokeTransparency`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextTransparency`</td>
    <td>float</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextTruncate`</td>
    <td>`Enum.TextTruncate`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextWrapped`</td>
    <td>boolean</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextXAlignment`</td>
    <td>`Enum.TextXAlignment`</td>
  </tr>
  <tr>
    <td>`Class.TextButton.TextYAlignment`</td>
    <td>`Enum.TextYAlignment`</td>
  </tr>
</tbody>
</table>

### ImageLabel

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ImageLabel.Image`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ImageColor3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ImageRectOffset`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ImageRectSize`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ImageTransparency`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ResampleMode`</td>
    <td>`Enum.ResamplerMode`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.ScaleType`</td>
    <td>`Enum.ScaleType`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.SliceCenter`</td>
    <td>`Datatype.Rect`</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.SliceScale`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.ImageLabel.TileSize`</td>
    <td>`Datatype.UDim2`</td>
	</tr>
</tbody>
</table>

### ImageButton

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ImageButton.HoverImage`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.HoverImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.Image`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ImageColor3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ImageRectOffset`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ImageRectSize`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ImageTransparency`</td>
    <td>float</td>
	</tr>
	<tr>
    <td>`Class.ImageButton.PressedImage`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.PressedImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ResampleMode`</td>
    <td>`Enum.ResamplerMode`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.ScaleType`</td>
    <td>`Enum.ScaleType`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.SliceCenter`</td>
    <td>`Datatype.Rect`</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.SliceScale`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.ImageButton.TileSize`</td>
    <td>`Datatype.UDim2`</td>
	</tr>
</tbody>
</table>

### TextBox

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.TextBox.ClearTextOnFocus`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.TextBox.MultiLine`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.TextBox.PlaceholderColor3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.TextBox.PlaceholderText`</td>
    <td>string</td>
	</tr>
  <tr>
    <td>`Class.TextBox.ShowNativeInput`</td>
    <td>string</td>
	</tr>
  <tr>
    <td>`Class.TextBox.TextEditable`</td>
    <td>boolean</td>
	</tr>
</tbody>
</table>

### ScrollingFrame

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ScrollingFrame.AutomaticCanvasSize`</td>
    <td>`Enum.AutomaticSize`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.BottomImage`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.BottomImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.CanvasSize`</td>
    <td>`Datatype.UDim2`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.ElasticBehavior`</td>
    <td>`Enum.ElasticBehavior`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.HorizontalScrollBarInset`</td>
    <td>`Enum.ScrollBarInset`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.MidImage`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.MidImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.ScrollBarImageColor3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.ScrollBarImageTransparency`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.ScrollBarThickness`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.ScrollingDirection`</td>
    <td>`Enum.ScrollingDirection`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.ScrollingEnabled`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.TopImage`</td>
    <td>`ContentId`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.TopImageContent`</td>
    <td>`Datatype.Content`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.VerticalScrollBarInset`</td>
    <td>`Enum.ScrollBarInset`</td>
	</tr>
  <tr>
    <td>`Class.ScrollingFrame.VerticalScrollBarPosition`</td>
    <td>`Enum.VerticalScrollBarPosition`</td>
	</tr>
</tbody>
</table>

### ViewportFrame

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.ViewportFrame.Ambient`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.ViewportFrame.ImageColor3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.ViewportFrame.ImageTransparency`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.ViewportFrame.LightColor`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.ViewportFrame.LightDirection`</td>
    <td>`Datatype.Vector3`</td>
	</tr>
</tbody>
</table>

### Path2D

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.Path2D.Closed`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.Path2D.Color3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.Path2D.Thickness`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.Path2D.Visible`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.Path2D.ZIndex`</td>
    <td>integer</td>
	</tr>
</tbody>
</table>

### CanvasGroup

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.CanvasGroup.GroupColor3`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.CanvasGroup.GroupTransparency`</td>
    <td>float</td>
	</tr>
</tbody>
</table>

## Appearance modifiers

### UICorner

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UICorner.CornerRadius`</td>
    <td>`Datatype.UDim`</td>
	</tr>
</tbody>
</table>

### UIGradient

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIGradient.Color`</td>
    <td>`Datatype.ColorSequence`</td>
	</tr>
  <tr>
    <td>`Class.UIGradient.Enabled`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIGradient.Offset`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
  <tr>
    <td>`Class.UIGradient.Rotation`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.UIGradient.Transparency`</td>
    <td>`Datatype.NumberSequence`</td>
	</tr>
</tbody>
</table>

### UIPadding

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIPadding.PaddingBottom`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIPadding.PaddingLeft`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIPadding.PaddingRight`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIPadding.PaddingTop`</td>
    <td>`Datatype.UDim`</td>
	</tr>
</tbody>
</table>

### UIStroke

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIStroke.ApplyStrokeMode`</td>
    <td>`Enum.ApplyStrokeMode`</td>
	</tr>
  <tr>
    <td>`Class.UIStroke.Color`</td>
    <td>`Datatype.Color3`</td>
	</tr>
  <tr>
    <td>`Class.UIStroke.Enabled`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIStroke.LineJoinMode`</td>
    <td>`Enum.LineJoinMode`</td>
	</tr>
  <tr>
    <td>`Class.UIStroke.Thickness`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.UIStroke.Transparency`</td>
    <td>float</td>
	</tr>
</tbody>
</table>

## Layout structures

### UIListLayout

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIListLayout.HorizontalFlex`</td>
    <td>`Enum.UIFlexAlignment`</td>
	</tr>
  <tr>
    <td>`Class.UIListLayout.HorizontalPadding`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIListLayout.ItemLineAlignment`</td>
    <td>`Enum.ItemLineAlignment`</td>
	</tr>
  <tr>
    <td>`Class.UIListLayout.Padding`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIListLayout.VerticalFlex`</td>
    <td>`Enum.UIFlexAlignment`</td>
	</tr>
  <tr>
    <td>`Class.UIListLayout.VerticalPadding`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIListLayout.Wraps`</td>
    <td>boolean</td>
	</tr>
</tbody>
</table>

### UIGridStyleLayout

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIGridStyleLayout.FillDirection`</td>
    <td>`Enum.FillDirection`</td>
	</tr>
  <tr>
    <td>`Class.UIGridStyleLayout.HorizontalAlignment`</td>
    <td>`Enum.HorizontalAlignment`</td>
	</tr>
  <tr>
    <td>`Class.UIGridStyleLayout.SortOrder`</td>
    <td>`Enum.SortOrder`</td>
	</tr>
  <tr>
    <td>`Class.UIGridStyleLayout.VerticalAlignment`</td>
    <td>`Enum.VerticalAlignment`</td>
	</tr>
</tbody>
</table>

### UIGridLayout

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIGridLayout.CellPadding`</td>
    <td>`Datatype.UDim2`</td>
	</tr>
  <tr>
    <td>`Class.UIGridLayout.CellSize`</td>
    <td>`Datatype.UDim2`</td>
	</tr>
  <tr>
    <td>`Class.UIGridLayout.FillDirectionMaxCells`</td>
    <td>integer</td>
	</tr>
  <tr>
    <td>`Class.UIGridLayout.StartCorner`</td>
    <td>`Enum.StartCorner`</td>
	</tr>
</tbody>
</table>

### UIPageLayout

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIPageLayout.Animated`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.Circular`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.EasingDirection`</td>
    <td>`Enum.EasingDirection`</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.EasingStyle`</td>
    <td>`Enum.EasingStyle`</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.GamepadInputEnabled`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.Padding`</td>
    <td>`Datatype.UDim`</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.ScrollWheelInputEnabled`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.TouchInputEnabled`</td>
    <td>boolean</td>
	</tr>
  <tr>
    <td>`Class.UIPageLayout.TweenTime`</td>
    <td>float</td>
	</tr>
</tbody>
</table>

## Size modifiers and constraints

### UIAspectRatioConstraint

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIAspectRatioConstraint.AspectRatio`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.UIAspectRatioConstraint.AspectType`</td>
    <td>`Enum.AspectType`</td>
	</tr>
  <tr>
    <td>`Class.UIAspectRatioConstraint.DominantAxis`</td>
    <td>`Enum.DominantAxis`</td>
	</tr>
</tbody>
</table>

### UISizeConstraint

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UISizeConstraint.MaxSize`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
  <tr>
    <td>`Class.UISizeConstraint.MinSize`</td>
    <td>`Datatype.Vector2`</td>
	</tr>
</tbody>
</table>

### UITextSizeConstraint

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UITextSizeConstraint.MaxTextSize`</td>
    <td>integer</td>
	</tr>
  <tr>
    <td>`Class.UITextSizeConstraint.MinTextSize`</td>
    <td>integer</td>
	</tr>
</tbody>
</table>

### UIScale

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIScale.Scale`</td>
    <td>float</td>
	</tr>
</tbody>
</table>

### UIFlexItem

<table size="small">
<thead>
  <tr>
    <th>Property</th>
    <th width="40%">Type</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`Class.UIFlexItem.FlexMode`</td>
    <td>`Enum.UIFlexMode`</td>
	</tr>
  <tr>
    <td>`Class.UIFlexItem.GrowRatio`</td>
    <td>float</td>
	</tr>
  <tr>
    <td>`Class.UIFlexItem.ItemLineAlignment`</td>
    <td>`Enum.ItemLineAlignment`</td>
	</tr>
  <tr>
    <td>`Class.UIFlexItem.ShrinkRatio`</td>
    <td>float</td>
	</tr>
</tbody>
</table>
