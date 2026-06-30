---
title: UGC validation system
description: Explains Roblox's technical mechanism that checks if avatar assets meet platform specifications before you can upload and publish them to the Marketplace.
---

The **UGC validation system** is Roblox's technical mechanism that checks if avatar assets meet platform specifications before you can upload and publish them to the Marketplace. This process ensures that avatar bodies, cosmetics, clothing, and accessories behave consistently across the platform.

The UGC validation system runs each time you:

- Try to upload an avatar asset to the Marketplace through Studio.
- Call `Class.AvatarCreationService` APIs for in-experience avatar asset creation.

During this process, the UGC validation system looks at your asset to see if it meets the requirements in validation categories that are specific to its asset type. For a comprehensive list of these requirements, see [Body specifications](../avatar/character-bodies/specifications.md), [Dynamic head specifications](../avatar/dynamic-heads/specifications.md), [Makeup specifications](../avatar/makeup/specifications.md), [Rigid accessory specifications](../avatar/rigid-accessories/specifications.md), and [Layered accessory specifications](../avatar/layered-accessories/specifications.md).

When an avatar asset passes validation, you can proceed with the Studio upload process by paying the upload fee, submitting the asset for moderation, and selling it on the Marketplace, or the player can proceed to purchase the avatar asset they created within an experience.

<br></br>

<img src="../assets/avatar/validation-system/Validation-Success.png" width="100%" alt="Chart of validation system success workflows." />

<br></br>

When an avatar asset fails validation, you or the player receive error messages with information on why the avatar asset didn't pass validation. For troubleshooting assistance, the UGC validation has visualization tools with checks that provide asset-specific visual guides on how to fix or improve your asset so that it can pass validation.

<img src="../assets/avatar/validation-system/Blocky-Validation.png" width="100%" alt="" />

<Alert severity = 'info'>
Assets that you don't intend to use for the Marketplace, such as those for in-game use only, do **not** need to pass the validation process. Regardless, the validation process can still be useful for troubleshooting and debugging custom bodies and accessories.
</Alert>

## Validation categories

The UGC validation system organizes validation into several high-level categories. For information on these categories and some areas that they validate, review the following table.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Category</th>
    <th>What it validates</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>**Schema**</td>
    <td><ul><li>The asset's object hierarchy</li><li>If child types, tags, and attributes are configured correctly</li><li>If the asset includes any banned scripts</li></ul></td>
  </tr>
  <tr>
    <td>**Mesh geometry**</td>
    <td><ul><li>Triangle budgets</li><li>Bounding box sizes</li><li>Total surface area limits</li><li>If the asset is centered at origin and not too thin along any particular axis</li><li>If the asset's geometry is watertight and without N-gons, vertex colors, or zero-area triangles</li></ul></td>
  </tr>
  <tr>
    <td>**Texture / materials**</td>
    <td><ul><li>Max resolution</li><li>Valid UV maps</li><li>PBR texture validation for `Class.SurfaceAppearance` objects</li><li>If the asset contains any invalid vertex colors</li></ul></td>
  </tr>
  <tr>
    <td>**Rigging / skinning**</td>
    <td><ul><li>Bodies and layered accessories must include skinning data</li><li>Rigid accessories must not include skinning data</li><li>Skin weight count must match vertex count</li></ul></td>
  </tr>
  <tr>
    <td>**Inner and outer cages**</td>
    <td><ul><li>All body parts must include cages for full-body validation</li><li>Cages must be watertight</li><li>Cage mesh must closely match the render mesh</li><li>Render mesh must be inside outer cage</li><li>Cage UVs must match Roblox's provided [cage templates](../avatar/resources.md)</li></ul></td>
  </tr>
  <tr>
    <td>**Attachments**</td>
    <td><ul><li>All attachments must have correct naming for their attachment point</li><li>Position and orientation checks</li></ul></td>
  </tr>
  <tr>
    <td>**Dynamic head**</td>
    <td><ul><li>At least 17 FACS poses</li><li>Cage landmark projection onto the head mesh</li><li>Facial animation detection: landmarks must move for blink, mouth opening, and happy/sad expressions</li></ul></td>
  </tr>
  <tr>
    <td>**Security / moderation**</td>
    <td><ul><li>Asset creator validation, banned class names, proxy attribute anti-spoofing</li></ul></td>
  </tr>
</tbody>
</table>

## Visualization checks

The UGC validation system includes optional visualization tools with checks to help you identify, understand, diagnose, and fix avatar assets that aren't yet ready to be on the Marketplace. When active, the visualization checks provide information on validation errors for non-compliant assets, and quality assessments for compliant assets that could use improvement.

<GridContainer numColumns="2">
  <figure>
    <img src="../assets/avatar/validation-system/Validation-Icons.png" width="85%" />
    <figcaption>Red icons provide information on what areas are failing validation and yellow warnings indicate areas of improvement.</figcaption>
  </figure>
  <figure>
    <img src="../assets/avatar/validation-system/Goblin-Validation.png" width="100%" />
    <figcaption>When you select an error or warning, visual elements display in the viewport to help you understand the error or warning.</figcaption>
  </figure>
</GridContainer>

To access the UGC validation system's visualization tools, you must first enable the beta feature. To enable and use the optional visualization checks:

1. In Studio, navigate to **File** > **Beta Features**.
1. Enable **Visualizing UGC Validation**.
1. Restart Studio, then in the mezzanine, click the plus icon to add a custom tab. A new tab displays.

   <img src="../assets/studio/general/Toolbar-Add-Custom-Tab.png" width="800" alt="Button to add custom tab indicated in Studio's mezzanine." />

1. In your custom tab, click the **Add tools** button. The **Add Tools** pop-up window displays.

   <img src="../assets/studio/general/Toolbar-Custom-Tab-Add-Tool.png" width="800" alt="Button to add new tool to a custom tab in Studio's toolbar." />

1. Enable **UGC Validation** to add it to your toolbar, then close the window.
1. Navigate back to your custom tab and select the **UGC Validation** button to run the plugin. A **UGC Validation** window displays.
1. In the **Explorer** window, select a character body, dynamic head, rigid accessory, or layered accessory, then navigate back to the **UGC Validation** window and click the **Run validation** button. A pop-up window displays.
1. In the pop-up window:

   1. Confirm the asset type of the avatar asset that you selected. For example, if you selected a `Enum.AccessoryType.Pants` layered accessory, use the drop-down menu to select **PantsAccessory**.

      <img src="../assets/avatar/validation-system/Validation-Popup.png" width="70%" alt="" />

   1. Click the **Run validation** button.

The validation service will run in the background and report back results in the **UGC Validation** window as a combination of errors and/or warnings depending on the state of your asset. For information on each visual validation check, review the following subsections.

### Measure_Cage_Distance_Head

`Measure_Cage_Distance_Head` is a validation check that scores how closely the avatar head's outer cage hugs the head mesh, checking that the cage neither floats too far from the mesh nor sinks inside it.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Head cage intersects wit the head mesh. `{negativeSDFPercent}%` of head cage vertices are inside the head mesh.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Head cage is too far from the head mesh. Maximum distance between head cage and mesh is `{max_sdf}`, which is above allowed threshold `{max_sdf_threshold}`</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Head cage distance score is `{score}`. Max distance between head cage and mesh is `{max_distance}`, `{negative_sdf_percent}%` of head cage vertices are inside the head mesh.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Cage_Mesh_Distance

`Measure_Cage_Mesh_Distance` is a validation check that scores how closely the layered clothing's outer cage tracks the rendered mesh, flagging when a cage drifts too far away or pushes inside the mesh.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Outer cage intersects with the render mesh. `{negativeSDFPercent}%` of outer cage vertices are inside render mesh.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Outer cage is too far from the render mesh. Maximum distance between outer cage and mesh is `{max_sdf}`, which is above allowed threshold `{max_sdf_threshold}`.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Cage-to-mesh distance score is `{score}`. Max distance between outer cage and mesh is `{max_distance}`, `{negative_sdf_percent}%` of outer cage vertices are inside the render mesh.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Cage_Mesh_Distance_Avatar

`Measure_Cage_Mesh_Distance_Avatar` is a validation check that scores how closely the full body outer cage follows the body mesh, flagging when a cage floats too far off the surface or intersects it.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Body cage intersects with the body mesh. `{negativeSDFPercent}%` of body cage vertices are inside the body mesh.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Body cage is too far from the body mesh. Maximum distance between body cage and mesh is `{max_sdf}`, which is above allowed threshold `{max_sdf_threshold}`.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Body cage distance score is `{score}`. Max distance between body cage and mesh is `{max_distance}`, `{negative_sdf_percent}%` of body cage vertices are inside the body mesh.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Cage_Relevancy

`Measure_Cage_Relevancy` is a validation check that scores how much of the outer cage you moved actually sits over the accessory, so cage edits stay where the garment needs them.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>`{outer_cage_face_irrelevant_percent}%` of the modified outer cage vertices do not cover the accessory. Make sure you are moving the outer cage only where needed.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Cage relevancy score is `{score}`. `{irrelevant_percent}%` of the modified outer cage vertices do not cover the accessory.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Cage_UV

`Measure_Cage_UV` is a validation check that checks if the inner and outer cage UVs match the layered clothing template; UVs that don't match the layered clothing template break how the asset wraps over the body.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>There are `{incorrect_uv_count}` UV values in cage `{cage_name}` that are incorrect or do not belong to the template. Please correct the cage UV.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Cage UV score is `{score}` for `{cage_name}`. Incorrect UV count: `{incorrect_uv_count}`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Cage_UV_Avatar

`Measure_Cage_UV_Avatar` is a validation check that checks that each [body part](../avatar/character-bodies/specifications.md#body-parts) has a cage that keeps its UVs on the standard template; wrong cage UVs distort how layered clothing wraps over the body.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>There are `{incorrect_uv_count}` UV values in cage `{cage_name}` that are incorrect or do not belong to the template. Please correct the cage UV.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Cage UV score is `{score}` for `{cage_name}`. Incorrect UV count: `{incorrect_uv_count}`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Degen_Triangles

`Measure_Degen_Triangles` is a validation check that scores each mesh part for degenerate triangles (faces with zero or near-zero area); degenerate triangles add no surface and can break rendering.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality: `{partName}` has `{degenerate_triangle_percent}%` degenerate triangles `(score: {score})`.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Dynamic_Head

`Measure_Dynamic_Head` is a validation check that verifies if a [dynamic head](../avatar/dynamic-heads/index.md) is animatable. Dynamic heads that are animatable have a head cage, FACS data, aligned landmarks, and can close their eyes, open their mouth, and express emotions.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Dynamic heads on the Marketplace must be properly caged so that the eyes and mouth vertices on the cage line up with the mesh vertices. Please improve your caging and its alignment with the mesh.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Cannot detect smile expression for the Dynamic head. Please adjust cage landmarks for the mouth to match where the mouth is on the head and make sure it can show a smile expression.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Cannot detect left eye close expression for the dynamic head. Please adjust cage landmarks for the left eye to match where the left eye is on the head and make sure it can be closed.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Dynamic heads on the Marketplace have no head cages. Please create a head cage for the dynamic head.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Cannot detect mouth open expression for the dynamic head. Please adjust cage landmarks for mouth to match where the mouth is on the head and make sure it can open.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Dynamic heads on the Marketplace must be animated, but this head has no FACS data.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Cannot detect right eye close expression for the dynamic head. Please adjust cage landmarks for the right eye to match where the right eye is on the head and make sure it can be closed.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Cannot detect frown expression for the dynamic head. Please adjust cage landmarks for the mouth to match where the mouth is on the head and make sure it can show a frown expression.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: dynamic head expression score is `{score}`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Joint_Number

`Measure_Joint_Number` is a validation check that scores the body rig's [joint setup](../avatar/character-bodies/specifications.md#rigging) against the expected configuration. The body rig's joint setup includes the joint counts in the left and right hands for [higher-fidelity](../avatar/character-bodies/specifications.md#higher-fidelity-rigs) rigs.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality: joint configuration scored `{score} (joints: {joint_number}, left hand: {left_hand_joint_number}, right hand: {right_hand_joint_number})`.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Mesh_Manifold

`Measure_Mesh_Manifold` is a validation check that scores each mesh part for manifold integrity, catching holes, non-manifold edges, and similar topology problems in the geometry.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality: `{partName}` has mesh manifold issues `(score: {score})`.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Mesh_Outside_OuterCage

`Measure_Mesh_Outside_OuterCage` is a validation check that scores how much of an accessory's render mesh stays between its cages; a mesh that pokes outside the outer cage deforms badly when worn.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Quality score cannot be properly computed due to the input data being incorrect or incomplete. Please check your model or file a bug report.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>`{mesh_outside_outer_cage_percent}%` of mesh vertices for the accessory are outside its outer cage. Make adjustments to have more of the accessory placed between the cages.</td>
    <td>Blocks validation</td>
  </tr>
  <tr>
    <td>Asset quality warning: Mesh containment score is `{score}`. `{mesh_outside_outer_cage_percent}%` of mesh vertices are outside the outer cage.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Texture_Complexity

`Measure_Texture_Complexity` is a validation check that scores each texture for visual complexity, flagging flat or near-empty textures that add little detail to the asset.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality: texture `{textureName}` has low complexity `(score: {score})`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Texture_Resolution

`Measure_Texture_Resolution` is a validation check that scores each texture by its pixel dimensions, rewarding resolution high enough to keep the asset sharp on the body.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality: texture `{textureName}` has resolution `{texture_width}x{texture_height} (score: {score})`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Triangle_Intersection

`Measure_Triangle_Intersection` is a validation check that scores each mesh part for self-intersecting triangles in which faces pass through one another and create messy, overlapping geometry.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality: `{partName}` has `{intersecting_tri_face_percent}%` intersecting triangle faces `(score: {score})`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_UV_Bound

`Measure_UV_Bound` is a validation check that measures how many of a mesh's UV vertices fall outside the 0-1 texture space; it reports a score but never blocks upload.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality: `{partName}` has `{uv_outside_bound_vert_percent}%` UV vertices outside bounds `(score: {score})`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>

### Measure_Vertex_Similarity

`Measure_Vertex_Similarity` is a validation check that measures the share of near-duplicate vertices in a mesh; it reports a score but never blocks upload.

<table>
  <thead>
    <tr>
    <th style={{width:"50%"}}>Error code</th>
    <th>Severity</th>
    </tr>
  </thead>
<tbody>
  <tr>
    <td>Asset quality score for `{measureName}` could not be computed because the input data was incomplete or invalid. This does not block your upload.</td>
    <td>Warning</td>
  </tr>
  <tr>
    <td>Asset quality: `{partName}` has `{similar_vertex_percent}%` similar vertices `(score: {score})`.</td>
    <td>Warning</td>
  </tr>
</tbody>
</table>
