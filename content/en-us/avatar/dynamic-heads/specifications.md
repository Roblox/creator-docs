---
title: Dynamic head specifications
description: Dynamic head specifications list the specific technical requirements for Studio compatibility.
---

Character body models with dynamic heads require a specific set of components and configuration standards so that the entire model works as expected across the platform, including universal support for head accessories and facial animation, and so that the characters can be sold on the Marketplace.

Before you start the export process, verify that your model meets the following modeling specifications and guidelines for proper Studio compatibility.

<Alert severity = 'warning'>
Validation for dynamic heads uses a specialized process that may require you to adjust your existing dynamic head asset. For more information, see [Dynamic head validation](./validate.md).
</Alert>

<Alert severity = 'info'>
[Avatar Setup](../../avatar-setup/index.md) automatically generates components for your avatar characters, **including the head cage and facial animation** required for the Marketplace. You can save time by submitting character models without avatar components into Avatar Setup, then modifying the output. If necessary, you can download your output as a `.gltf`, then adjust the FACS or cage data in your third-party modeling tool.

For issues or feedback regarding Avatar Setup, submit a [bug report](https://devforum.roblox.com/c/bug-reports/10).
</Alert>

## Outer cage

Like all avatar character [body parts](../character-bodies/specifications.md#body-parts), dynamic heads require an outer cage to ensure layered accessories work properly. In addition, dynamic head outer cages serve to establish **facial landmarks** for the eyes and mouth of the face for the validation process.

For information on how to improve or resolve errors with your dynamic head's outer cage, see [Dynamic head caging best practices](./caging-best-practices.md).

### Facial landmarks

During validation, Roblox projects the cage eye/mouth regions to the base mesh to identify the eyes and mouth regions of your character head. Roblox expects the following 3 distinct landmarks in your cages:

- Left eye landmark
- Right eye landmark
- Mouth landmark

Even for non-humanoid faces that don't include visual eyes or mouths, it's important to ensure that these landmarks still exist and can be projected over your base mesh. For more information on this process, see [Dynamic head validation](./validate.md).

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
The mouth landmark vertices are on the **second loop** of vertices from the mouth opening. This precision can help prevent issues with [landmark validation](./validate.md#landmark-projection).

<img src="../../assets/art/avatar/Mouth-Vertices-Warning.png"/>
</Alert>

## FACS poses

Dynamic heads support facial animation and can include many different base poses to meet the needs of your character design. That being said, avatar character bodies require at least the following 17 [FACS poses](./facs-poses-reference.md) to support avatar chat:

- `LeftEyeClosed`
- `RightEyeClosed`
- `EyesLookDown`
- `JawDrop`
- `Pucker`
- `LeftLipCornerPuller`
- `RightLipCornerPuller`
- `ChinRaiser`
- `ChinRaiserUpperLip`
- `LeftCheekRaiser`
- `RightCheekRaiser`
- `LeftInnerBrowRaiser`
- `RightInnerBrowRaiser`
- `LeftLipCornerDown`
- `RightLipCornerDown`
- `LeftLowerLipDepressor`
- `RightLowerLipDepressor`

<Alert severity = 'info'>
While these 17 poses are a requirement, it's recommended to include as many facial poses as possible in your asset to improve expressiveness and facial animation fidelity for facial animations.
</Alert>

To pass the dynamic head [validation process](./validate.md), your character's head must successfully perform the following 5 facial actions. If the dynamic head can't deform at the points of the cage's [facial landmarks](#facial-landmarks) for these actions, validation fails for the asset.

<table>
<thead>
  <tr>
    <th>Action Unit Test</th>
    <th>Non-Zero Control Values</th>
  </tr></thead>
<tbody>
  <tr>
    <td>Left eye blink</td>
    <td>`LeftEyeClosed` = `1`<br />`EyesLookDown` = `1`</td>
  </tr>
  <tr>
    <td>Right eye blink</td>
    <td>`RightEyeClosed` = `1`<br />`EyesLookDown` = `1`</td>
  </tr>
  <tr>
    <td>Mouth opens</td>
    <td>`JawDrop` = `1`</td>
  </tr>
  <tr>
    <td>Happy expression </td>
    <td>`Pucker` = `1`<br />`LeftLipCornerPuller` = `1`<br />`RightLipCornerPuller` = `1`</td>
  </tr>
  <tr>
    <td>Sad expression</td>
    <td>`ChinRaiser` = `1`<br />`ChinRaiserUpperLip` = `1`<br />`LeftCheekRaiser` = `0.85`<br />`RightCheekRaiser` = `0.85`<br />`LeftInnerBrowRaiser` = `1`<br />`RightInnerBrowRaiser` = `1`<br />`LeftLipCornerDown` = `1`<br />`RightLipCornerDown` = `1`<br />`LeftLowerLipDepressor` = `1`<br />`RightLowerLipDepressor` = `1`</td>
  </tr>
</tbody>
</table>

## Marketplace requirements

Along with the other technical requirements listed, your character bodies with dynamic heads must meet the following additional specifications before uploading them to the Marketplace to sell:

- Ensure that your character bodies adhere to [Marketplace policies](../../marketplace/marketplace-policy.md).
- Whenever applicable, ensure that your character bodies adhere to Roblox's [custom mesh specifications](../../art/modeling/specifications.md) and [character body specifications](../character-bodies/specifications.md).
- Object `Class.MeshPart.Material|Material` is set to `Plastic`.
- Object `Class.MeshPart.Transparency|Transparency` is set to `0`.
- Object `Class.MeshPart.VertexColor|VertexColor` is the default `1, 1, 1`.
- If your character's head includes separate eyelash and eyebrow assets, you must add them to your character body model as `Class.Accessory` objects. For more information, see [Publish bodies with eyelashes and eyebrows](../../art/accessories/publish-eyebrows-eyelashes.md).
- Your `Class.Model` instance doesn't contain extraneous objects, like `Class.Script` or additional `Class.Part` instances.
