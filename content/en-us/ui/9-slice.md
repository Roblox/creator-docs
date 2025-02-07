---
title: UI 9-slice design
description: UI 9-slice design lets you create UI elements of varying sizes without distorting the borders or corners.
---

When creating UI with custom borders and corners, you'll often need to render elements at different aspect ratios and visually surround [localized text](../production/localization/index.md) or other contents of unknown dimensions.
This lets you create UI elements of varying sizes without distorting the borders or corners.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/9-slice/9-Slice-Comparison-Without.png" />
    <figcaption>Without 9-Slice</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/9-slice/9-Slice-Comparison-With.png" />
    <figcaption>With 9-Slice</figcaption>
  </figure>
</GridContainer>

Under the **9-slice** approach, one image (a single Roblox image asset) is
internally divided into nine sub-images, each with different scaling rules.
<img src="../assets/ui/9-slice/9-Slice-Concept-Diagram.png" width="412" />

<table>
    <thead>
        <tr>
            <th>Sub-image</th>
            <th>Scaling</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>1</strong> <strong>3</strong> <strong>7</strong> <strong>9</strong> (corners)</td>
            <td>none</td>
        </tr>
        <tr>
            <td><strong>2</strong> <strong>8</strong> (top/bottom edges)</td>
            <td>horizontal</td>
        </tr>
        <tr>
            <td><strong>4</strong> <strong>6</strong> (left/right edges)</td>
            <td>vertical</td>
        </tr>
        <tr>
            <td><strong>5</strong> (center)</td>
            <td>horizontal + vertical</td>
        </tr>
    </tbody>
</table>

## Studio editor

Slice configuration is possible by directly setting the `Enum.ScaleType` and slice properties on an image label or button, but Studio's built-in **9-Slice Editor** is more intuitive.

### Opening the editor

To open the visual **9-Slice Editor** in Studio:

1. Select an `Class.ImageLabel` or `Class.ImageButton` with a valid asset ID entered into its **Image** field.

  <img src="../assets/ui/9-slice/9-Slice-Properties-Image.png" width="320" />

1. Set the **ScaleType** property to **Slice**.

  <img src="../assets/ui/9-slice/9-Slice-Properties-ScaleType.png" width="320" />

1. Click on the **SliceCenter** property that appears, then click on the **&hellip;** within the row.

  <img src="../assets/ui/9-slice/9-Slice-Properties-SliceCenter.png" width="320" />

1. In the window that opens, 4 red lines overlay the image, representing the edges of the slices. The source image size is also displayed.

  <img src="../assets/ui/9-slice/9-Slice-Editor-View.png" width="327" />

### Set offsets

In Studio, drag the red lines to set the **offsets** from the left, right, top,
and bottom edges of the image.

<Alert severity="info">
If you need better precision, enter offset values
in the fields on the right side of the editor window.
</Alert>

<img src="../assets/ui/9-slice/9-Slice-Offset-Diagram.png" width="412" />

As you reposition the dragger lines, the UI element automatically updates to show the result.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/9-slice/9-Slice-Example-A-Editor.png" />
    <figcaption>Slice setup</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/9-slice/9-Slice-Example-A-ImageLabel.png" />
    <figcaption>Result on 500×200 ImageLabel</figcaption>
  </figure>
</GridContainer>

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/ui/9-slice/9-Slice-Example-B-Editor.png" />
    <figcaption>Slice setup</figcaption>
  </figure>
  <figure>
    <img src="../assets/ui/9-slice/9-Slice-Example-B-ImageLabel.png" />
    <figcaption>Result on 500×200 ImageLabel</figcaption>
  </figure>
</GridContainer>

<Alert severity="warning">
The offset values are different from the UI object's <strong>SliceCenter</strong> property values and represent the number of pixels between an edge of the source image and the dragger associated with that side.
</Alert>
