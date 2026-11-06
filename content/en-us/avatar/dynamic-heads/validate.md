---
title: Dynamic head validation
description: In-depth details on how Roblox validates head assets
---

<Alert severity = 'info'>
This content is for creators who intend to create dynamic heads designated for the Marketplace, or any character heads that support assets from the Marketplace.
</Alert>

<iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/OwhkWzSBnf0" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

Roblox runs a rigorous validation to ensure each asset that you upload to the Marketplace is compatible with all other assets on the Marketplace. For dynamic heads, validation primarily ensures that the head asset includes:

- **Visibly discernible facial features**, such as eyes and a mouth.
- A correctly **configured outer cage** to wear clothing and accessories.
- Correctly configured **facial animation poses** to perform basic universal expressions, such as blinking and smiling.

Validation for dynamic heads happens in three steps: [facial feature detection](#step-1-facial-feature-detection), [landmark projection](#step-2-landmark-projection), and [meaningful animation assessment](#step-3-meaningful-animation-assessment). See below for a reference of how validation processes, as well as [common issues](#common-issues).

<img src="../../assets/avatar/dynamic-heads/Dynamic-Head-Validation-Steps.png" alt="Diagram of the three dynamic head validation steps: facial feature detection, landmark projection, and meaningful animation assessment." />

<Alert severity = 'warning'>
Validation also checks for other issues, such as poor caging or missing required FACS poses. For more information, see [common issues](#common-issues).
</Alert>

<Alert severity = 'info'>
[Avatar Setup](../../avatar-setup/index.md) automatically generates components for your avatar characters, **including the head cage and facial animation** required for the Marketplace. You can save time by submitting character models without avatar components into Avatar Setup, then modifying the output. If necessary, you can download your output as a `.gltf`, then adjust the FACS or cage data in your third-party modeling tool.

For issues or feedback regarding Avatar Setup, submit a [bug report](https://devforum.roblox.com/c/bug-reports/10).
</Alert>

## Step 1: Facial feature detection

Before checking facial animation, validation checks that the head has readable eyes and a mouth. It renders the head from multiple angles to assess the features: validation checks the eyes in the neutral expression, and checks the mouth in the mouth-open expression so that a mouth that isn't clearly visible at rest can still be detected.

If the eyes or mouth are missing, the head doesn't pass this check and validation stops before the animation checks. This prevents a head from passing based only on movement in its cage or mesh when the head doesn't have the required facial features.

## Step 2: Landmark projection

Validation uses the head cage to project landmarks onto the head mesh. This helps Roblox establish where the eyes and mouth are and helps guide the facial animation test.

In the UGC Validation Visualization tool, red landmarks indicate the left eye caged region on the mesh and respond to the avatar's right eye FACS. Blue landmarks indicate the right eye caged region on the mesh and respond to the avatar's left eye FACS. Green landmarks indicate the avatar's discernible mouth, mouth FACS, and mouth caged region on the mesh.

<GridContainer numColumns="2">

<figure>

<img src="../../assets/art/avatar/Cage-With-Landmarks.png"/>
<figcaption>Cage mesh: Specific vertices of the cage mark eyes and mouth.</figcaption>
</figure>

<figure>

<img src="../../assets/art/avatar/Projection-Side.png"/>
<figcaption>Roblox validation projects these points onto the head mesh.</figcaption>
</figure>
</GridContainer>

<center><figure>

<img src="../../assets/art/avatar/Face-Landmarks.png" width = "60%"/>
<figcaption><center>Head mesh: All landmarks projected from cage mesh to head mesh.</center></figcaption>
</figure>
</center>

<Alert severity = "success">
Once validation verifies that projection is successful and all landmarks established onto the head mesh, it can move onto testing facial animations.
</Alert>

## Step 3: Meaningful animation assessment

After the earlier validation checks pass, validation renders a short sequence of expressions, including blinks, mouth movement, a smile, and a frown, from multiple angles. Validation evaluates whether the face performs the expressions, rather than simply detecting that pixels or geometry changed.

The head must show the required expressions clearly. Rigid movement, geometry swaps, random stretching, or other changes that don't read as facial expressions might not be sufficient to pass.

<GridContainer numColumns="3">

<figure>
<img src="../../assets/avatar/dynamic-heads/Meaningful-Animation-Neutral.png"/>
<figcaption>Neutral: both eyes open, mouth closed<br /><br />All FACS poses = `0`</figcaption>
</figure>

<figure>
<img src="../../assets/avatar/dynamic-heads/Meaningful-Animation-Right-Eye-Closed.png"/>
<figcaption>Right eye blink<br /><br />`RightEyeClosed` = `1`<br />`EyesLookDown` = `1`.</figcaption>
</figure>

<figure>
<img src="../../assets/avatar/dynamic-heads/Meaningful-Animation-Left-Eye-Closed.png"/>
<figcaption>Left eye blink<br /><br />`LeftEyeClosed` = `1`<br />`EyesLookDown` = `1`.</figcaption>
</figure>

<figure>
<img src="../../assets/avatar/dynamic-heads/Meaningful-Animation-Mouth-Open.png"/>
<figcaption>Mouth open<br /><br />`JawDrop` = `1`</figcaption>
</figure>

<figure>
<img src="../../assets/avatar/dynamic-heads/Meaningful-Animation-Happy.png"/>
<figcaption>Happiness: mouth corners curve upward into a smile<br /><br />`Pucker` = `1`<br />`LeftLipCornerPuller` = `1`.<br />`RightLipCornerPuller` = `1`</figcaption>
</figure>

<figure>
<img src="../../assets/avatar/dynamic-heads/Meaningful-Animation-Sad.png"/>
<figcaption>Sadness: mouth corners curve downward into a frown<br /><br />`ChinRaiser` = `1`<br />`ChinRaiserUpperLip` = `1`<br />`LeftCheekRaiser` = `0.85`<br />`RightCheekRaiser` = `0.85`<br />`LeftInnerBrowRaiser` = `1`<br />`RightInnerBrowRaiser` = `1`<br />`LeftLipCornerDown` = `1`<br />`RightLipCornerDown` = `1`<br />`LeftLowerLipDepressor` = `1`<br />`RightLowerLipDepressor` = `1`</figcaption>
</figure>

</GridContainer>

## Test face animations

Now that the validation system knows where to check for the eyes and mouth, the validation checks for facial animations to ensure that the following basic actions are possible:

- Left and right eyes can close
- Mouth can open and close
- Basic happy and sad expressions

<Alert severity = "info">
For a full list of the minimum FACS poses your dynamic heads need to pass validation, see [Dynamic head specifications - FACS poses](./specifications.md#facs-poses).
</Alert>

The validation looks for the **relative change in the landmarks**. For example, when testing for right eye closing (FACS pose: `RightEyeClosed`), validation checks if the landmarks move from their original neutral state accordingly.

<GridContainer numColumns="2">

<figure>

<img src="../../assets/art/avatar/Face-Landmarks.png"/>
<figcaption><Alert severity = "success">Face mesh with all projected landmarks applied from cage.</Alert></figcaption>
</figure>

<figure>

<img src="../../assets/art/avatar/Eye-Closed-Success.png"/>
<figcaption><Alert severity = "success">
Validation verifies that the right eye can close based off of displacement of landmarks.
</Alert></figcaption>
</figure>
</GridContainer>

## Common issues

Validation checks for several aspects of your head asset. If you are receiving an error related to dynamic head animation, use the following table for potential culprits:

<table><thead>
  <tr>
    <th>Issue</th>
    <th>Potential fixes</th>
  </tr></thead>
<tbody>
  <tr>
    <td>The validation tool is **unable to recognize facial features**.<br /><br />See [Facial feature detection](#step-1-facial-feature-detection) and the related [validation errors](../../marketplace/validation-system.md#validation-checks).</td>
    <td>- Verify that the **eyes are visible** in the default mood and from multiple angles, and that the **mouth is visible** during the mouth-open animation and from multiple angles.<br /><br />- Verify that there is **high contrast between the facial features and the rest of the head**.</td>
  </tr>
  <tr>
    <td>The validation tool is **unable to successfully apply landmarks**.<br /><br />See [Unable to project landmarks](#unable-to-project-landmarks).</td>
    <td>- Verify that the **cage landmark vertices are positioned directly over the corresponding areas of the face**.<br /><br />- Verify that the **cage is not intersecting with the head mesh**. Landmark projection expects the cage to be over the head mesh.<br /><br />- **Check for any gaps, holes, or difficult surfaces** of the face where landmarks can fail to project.</td>
  </tr>
  <tr>
    <td>The validation tool is able to apply landmarks, but **can not detect animation**.<br /><br />See [Animations not displacing landmarks](#animations-not-displacing-landmarks).</td>
    <td>- Verify that **landmarks are on the areas of the eyes and mouth that move during animation**.<br /><br />- Verify that the **cage is not intersecting with the head mesh**. Landmark projection expects the cage to be over the head mesh.<br /><br />- **If using separate meshes for eyeballs and mouthbags**, ensure that your landmarks are applied to the head mesh, not the eyeballs or mouthbag. This can be achieved by slightly widening the area where your cages project landmarks.</td>
  </tr>
  <tr>
    <td>The validation tool doesn't detect [FACS animations](#animation-data-missing).</td>
    <td>- Your head doesn't include FACS animation. Verify that your head includes FACS poses and mapping.</td>
  </tr>
  <tr>
    <td>The validation tool is **unable to recognize one or more expressions**.<br /><br />See [Meaningful animation assessment](#step-3-meaningful-animation-assessment) and the related [validation errors](../../marketplace/validation-system.md#validation-checks).</td>
    <td>- Verify that the **animation for each expression matches the motion of its FACS poses** from multiple angles.<br /><br />- For the **left and right blink** animations, make sure the correct eye flattens vertically.<br /><br />- For the **mouth open and close** animations, make sure the mouth region of the mesh opens noticeably in the vertical direction, and that the close animation does the reverse.<br /><br />- For the **happy and sad** expressions, curl the mouth corners up into a smile and down into a frown.</td>
  </tr>
</tbody></table>

### Unable to project landmarks

If validation is unable to apply the projection correctly onto the surface of the head, the validation fails. This often occurs if your **cage extends beyond your head mesh**, or if your head mesh has a **hole or gap** that prevents the application of the landmark. See the following examples:

<GridContainer numColumns="2">

<figure>

<img src="../../assets/art/avatar/Missing-Landmarks-A.png"/>
<figcaption><Alert severity = "error">Cage **extends too far beyond the mesh** and the validation is unable to apply 3 landmarks to the base mesh.</Alert></figcaption>
</figure>

<figure>

<img src="../../assets/art/avatar/Missing-Landmarks-B.png"/>
<figcaption><Alert severity = "error">
Base mesh has a **hollow gap** in the design, preventing validation from applying 3 landmarks to denote the eye area.
</Alert></figcaption>
</figure>
</GridContainer>

<Alert severity = 'success'>
In both cases, adjusting the cage to allow the proper projection of landmarks to the base mesh would resolve this issue.
</Alert>

### Animations not displacing landmarks

In the case where landmarks are correctly applied to the base mesh and the base mesh includes FACS data, it's possible that the facial animations do not displace the landmarks enough to pass validation. See the following example:

<GridContainer numColumns="2">
<figure>
<img src="../../assets/art/avatar/Face-Landmarks-Poor.png" />
<figcaption><Alert severity ='warning'>Landmarks successfully established on base mesh, but are not near the expected regions.</Alert></figcaption>
</figure>

<figure>
<img src="../../assets/art/avatar/Landmarks-Fail-B.png"/>
<figcaption><Alert severity = "error">When testing animations, validation doesn't detect the expected change to the landmark regions.</Alert></figcaption>
</figure>
</GridContainer>

<Alert severity = 'success'>
In the example case, adjusting the cage to allow the proper projection of landmarks at the appropriate areas would resolve this issue.
</Alert>

There may also be cases where the landmarks are correct, but the animation itself does not alter the projected landscapes enough to pass validation. In these cases, fixing the animation and/or optimizing the cage could help the validation properly identify the facial animation.

### Animation data missing

Heads require [17 specific FACS poses](./specifications.md#facs-poses) that are used to test the 5 basic actions. Regardless of landmarks or other FACS animations, validation immediately fails if the minimum 17 poses were not detected.

For information on how to pose and map dynamic heads, see [Create basic dynamic heads](../../art/characters/facial-animation/create-basic-heads.md).

## Working with non-humanoids

Some character models, typically non-humanoids, have unnatural or missing eyes and mouths. The most common case of this is the classic blocky features.

In this case, the cage still applies the expected landscapes to the head surface, and Roblox validates if facial animations correctly displace the facial animations.

<GridContainer numColumns="3">
<figure>
<img src="../../assets/art/avatar/Blocky-Cage.png"/>
<figcaption>The cage for a blocky character applies landmarks to the surface of the head.</figcaption>
</figure>

<figure>
<img src="../../assets/art/avatar/Blocky-All.png"/>
<figcaption>Ensure that the landmarks are applied in areas where animation can effectively move the landmarks.</figcaption>
</figure>

<figure>
<img src="../../assets/art/avatar/Blocky-Head.png"/>
<figcaption>Validation checks the displacement of the landmarks to verify facial animation. <br /><br />Make sure that your [FACS animations](./specifications.md#facs-poses) properly affect the region where landmarks are applied.</figcaption>
</figure>

</GridContainer>

In cases where eyes and mouths might be missing, the validation still projects landmarks and expects facial animation in those areas.

<GridContainer numColumns="3">
<figure>
<img src="../../assets/art/avatar/Horn-Cage.png"/>
<figcaption>Although this character doesn't have eyes or mouth, the cage still attempts to project landmarks for those features.</figcaption>
</figure>

<figure>
<img src="../../assets/art/avatar/Horn-All.png"/>
<figcaption>In this example, the cage landmarks apply to the surface of this eye-less character head.</figcaption>
</figure>

<figure>
<img src="../../assets/art/avatar/Horn-Head.png"/>
<figcaption>Validation checks the displacement of the landmarks to verify facial animation. <br /><br />Make sure that your [FACS animations](./specifications.md#facs-poses) properly affect the regions where the landmarks are applied.</figcaption>
</figure>

</GridContainer>
