---
title: Head specifications
description: In-depth details on expected head schemas for Marketplace
---

<Alert severity = 'info'>
This content is for creators who intend to create character heads designated for the Marketplace, or any character heads that support assets from the Marketplace.
</Alert>

Character models designed to be sold on the Marketplace require a specific set of components and configuration standards to ensure all avatar features work as expected. The following guidance applies to character model heads to ensure universal support for head accessories and facial animations.

<Alert severity = 'warning'>
For information on character body requirements, see [character specifications](./specifications.md).
</Alert>

## How validation works

Roblox runs a rigorous validation to ensure the asset being uploaded to the Marketplace is compatible with all other assets on the Marketplace. For heads, validation primarily ensures that the head asset includes:

- A correctly **configured cage** — to wear clothing and accessories.
- Correctly configured **facial animation poses** — to perform basic universal expressions, such as blinking and smiling.

The primary validation check for heads **uses the cage to validate facial animation**. See below for a reference of how validation processes, as well as common [invalid examples](#invalid-examples).

<Alert severity = 'warning'>
Validation also checks for other issues, such as poor caging or missing required FACS poses.
</Alert>

### Landmark projection

Validation uses the head cage to project landmarks onto the head mesh. This helps Roblox establish where the eyes and mouth are and helps guide the facial animation test.

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

### Test face animations

Now that the validation system knows where to check for the eyes and mouth, the validation checks for facial animations to ensure that the following basic actions are possible:

- Left and right eyes can close
- Mouth can open and close
- Basic happy and sad expressions
  - For a full list of basic action units and poses, see [FACS animations](#facs-animation).

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

### Invalid examples

The following are common issues that cause validation failures.

#### Unable to project landmarks

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

#### Animations not displacing landmarks

In the case where landmarks are correctly applied to the base mesh, it's possible that the facial animations do not displace the landmarks enough. See the following example:

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

#### Animation data missing

Heads require [17 specific FACS poses](#facs-animation) that are used to test the 5 basic actions. Regardless of landmarks or other FACS animations, validation immediately fails if the minimum 17 poses were not detected.

For information on how to pose and map dynamic heads, see [Creating basic heads](../characters/facial-animation/create-basic-heads.md).

## Auto-setup recommendation

[Avatar auto-setup](../../avatar-setup/auto-setup.md) is an automated tool that automatically generates components for your avatar character, **including the head cage and facial animation** required for Marketplace character models. You can save time by submitting character models without avatar components into the auto-setup tool and modifying the output.

You can test and refine your auto-setup output by using the Avatar setup tool previews. You can even download your output as a `.gltf` and adjust the FACS or cage data in your DCC tools.

You can alternatively manually modify your own cages and FACS animations within your DCC tools, which may require more time or additional iteration in your workflow, such as weight-painting adjustments, to ensure it meets Marketplace policies.

To submit issues or feedback regarding the avatar auto setup tool, submit a [bug report](https://devforum.roblox.com/c/bug-reports/10).

## Head cage

Similar to other avatar body parts, an outer cage is required for the head. [High-quality cages](#caging-quality) ensure accessories and clothing items fit properly over the head. Head cages also serves to establish [facial landmarks](#facial-landmarks) for the eyes and mouth of the face for animation validation.

### Caging quality

For details on improving the quality of your head cage, see [Face cage optimizations](../characters/face-caging-best-practices.md).

### Facial landmarks

During validation, Roblox projects the cage eye/mouth regions to the base mesh to identify the eyes and mouth regions of your character head. These landmarks on the base mesh are used to track the correct deformations of your head when testing for the [minimum FACS poses](#facs-animation).

Roblox expects the following 3 distinct landmarks in your cages:

- Left eye landmark
- Right eye landmark
- Mouth landmark

<GridContainer numColumns ='3'>
<figure><img src="../../assets/art/avatar/Cage-Landmark-A.png"/>

<figcaption><center>Example face cage UV</center></figcaption>

</figure>

<figure><img src="../../assets/art/avatar/Cage-Landmark-B.png"/>

<figcaption><center>Highlighted vertices of cage are used to track eyes/mouth on base mesh</center></figcaption>
</figure>

<figure>
<img src="../../assets/art/avatar/Cage-Landmark-C.png"/>

<figcaption><center>Landmarks from cage applied to base mesh, used as an indicator for basic animation support during validation</center></figcaption>
</figure>
</GridContainer>

<Alert severity = 'error'>
Even for non-humanoid faces that don't include visual eyes or mouths, it's important to ensure that these landmarks still exist and can be projected over your base mesh.
</Alert>

## FACS animation

Roblox supports facial animation on character heads and can support more than 50 base poses. If you are creating an avatar character, it must, at minimum, include the following 17 [FACS reference poses](../../art/characters/facial-animation/facs-poses-reference.md) to support avatar chat:

- LeftEyeClosed
- RightEyeClosed
- EyesLookDown
- JawDrop
- Pucker
- LeftLipCornerPuller
- RightLipCornerPuller
- ChinRaiser
- ChinRaiserUpperLip
- LeftCheekRaiser
- RightCheekRaiser
- LeftInnerBrowRaiser
- RightInnerBrowRaiser
- LeftLipCornerDown
- RightLipCornerDown
- LeftLowerLipDepressor
- RightLowerLipDepressor

While the 17 poses are a minimum requirement, it's recommended to include as many facial poses as possible in your asset to improve expressiveness and facial animation fidelity for facial animation and avatar chat.

To pass validation, the character head must successfully perform the following 5 facial actions. If the head can't deform at the points of the [cage landmarks](#head-cage) for these facial actions, validation fails for the asset.

<table>
<thead>
  <tr>
    <th>Action Unit Test</th>
    <th>Non-Zero Control Values</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Left eye blink</td>
    <td>LeftEyeClosed = `1`<br />EyesLookDown = `1`</td>
  </tr>
  <tr>
    <td>Right eye blink</td>
    <td>RightEyeClosed = `1`<br />EyesLookDown = `1`</td>
  </tr>
  <tr>
    <td>Mouth opens</td>
    <td>JawDrop = `1`</td>
  </tr>
  <tr>
    <td>Happy expression </td>
    <td>Pucker = `1`<br />LeftLipCornerPuller = `1`<br />RightLipCornerPuller = `1`</td>
  </tr>
  <tr>
    <td>Sad expression</td>
    <td>ChinRaiser = `1`<br />ChinRaiserUpperLip = `1`<br />LeftCheekRaiser = `0.85`<br />RightCheekRaiser = `0.85`<br />LeftInnerBrowRaiser = `1`<br />RightInnerBrowRaiser = `1`<br />LeftLipCornerDown = `1`<br />RightLipCornerDown = `1`<br />LeftLowerLipDepressor = `1`<br />RightLowerLipDepressor = `1`</td>
  </tr>
</tbody>
</table>

## Marketplace requirements

Along with the other technical requirements listed, your items must meet the following additional specifications before uploading them to the Marketplace to sell:

- Ensure that your items adhere to the [Marketplace program guidelines](../../marketplace/marketplace-policy.md).
- Whenever possible, ensure that your items adhere to the following modeling requirements:
  - [Custom mesh specifications](../../art/modeling/specifications.md)
  - Any applicable [avatar specifications](../../art/characters/specifications.md)
- Object `Class.MeshPart.Material|Material` is set to `Plastic`.
- Object `Class.MeshPart.Transparency|Transparency` is set to `0`.
- Object `Class.MeshPart.VertexColor|VertexColor` is the default `1, 1, 1`.
- If your head includes separate eyelash and eyebrow assets, you must add them to your character model as `Class.Accessory` objects.
  - See [accessory specifications](../../art/accessories/specifications.md) for additional technical requirements.
- Your `Class.Model` instance doesn't contain extraneous objects, like `Class.Script` or additional `Class.Part` instances.
