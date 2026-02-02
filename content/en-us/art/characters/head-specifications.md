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

To pass Marketplace validation, a dynamic head requires:

1. A configured [head cage](#head-cage), with distinct eye and mouth landmarks.
2. [FACS controls](#facs-animation) to enable basic facial movements.

Validation verifies that landmarks on the head mesh, denoted by the cage projections, must deform correctly when facial animation is applied for the basic movement tests.

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
